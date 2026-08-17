import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { PAGE_REFS, buildContextBlock, buildMemoryBlock } from '@/lib/pageContext';
import { buildChartBlock } from '@/lib/chart-context';
import type { Chart } from '@/lib/charts';
import { MODELS } from '@/lib/models';
import { prisma } from '@/lib/prisma';
import { CHAT_DEFAULT_SYSTEM } from '@/lib/prompts/chat';

// The council's own streaming endpoint. Separate from /api/chat, which the
// Interface modal owns and which pipes OpenRouter's SSE straight through —
// the council needs the {delta} / {usage} envelope its client parses, plus
// server-side resolution of page references and persistent memory.

const DEFAULT_MAX_TOKENS = 4000;

/** OpenRouter's usage object. `cost` is its own extension, absent from the
 *  OpenAI schema the SDK types describe — hence the local shape. */
interface OpenRouterUsage {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    cost?: number;
}

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
        'X-Title': 'Oddessi',
    },
});

const DEFAULT_MODEL = 'deepseek/deepseek-v4-flash';

export async function POST(req: NextRequest) {
    try {
        const { messages, model, systemPrompt, refIds, chart, includeMemory, memoryCategories, memoryChartId } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
        }

        const resolvedModel = model ?? DEFAULT_MODEL;
        const modelMeta = MODELS.find((m) => m.id === resolvedModel);
        const maxTokens = modelMeta?.maxTokens ?? DEFAULT_MAX_TOKENS;
        let resolvedPrompt = (typeof systemPrompt === 'string' && systemPrompt.trim())
            ? systemPrompt.trim()
            : CHAT_DEFAULT_SYSTEM;

        // The chart under study, when the client has it attached. First after the
        // persona, because every other block is read against it.
        if (chart) {
            resolvedPrompt = `${resolvedPrompt}\n\n${buildChartBlock(chart as Chart)}`;
        }

        // Resolve ref IDs server-side — content never needs to be sent from the client
        if (Array.isArray(refIds) && refIds.length > 0) {
            const refs = PAGE_REFS.filter((r) => refIds.includes(r.id));
            if (refs.length > 0) {
                resolvedPrompt = `${resolvedPrompt}\n\n${buildContextBlock(refs)}`;
            }
        }

        // Inject persistent memory (on by default; client sends false for a clean chat).
        // Fetches the active chart's rows + the Shared (null) rows so both are available.
        // memoryCategories, when an array, narrows injection to that subset; otherwise all.
        if (includeMemory !== false) {
            // chartId comes from the client as the currently-attached chart's id.
            // null / absent = only Shared rows are fetched (no chart attached).
            const chartId = (typeof memoryChartId === 'string' && memoryChartId !== 'null')
                ? memoryChartId
                : null;

            let rows = await prisma.councilMemory.findMany({
                where: {
                    OR: [
                        { chartId },
                        { chartId: null },   // Shared is always included
                    ],
                },
            });

            if (Array.isArray(memoryCategories)) {
                const selected = new Set(memoryCategories);
                rows = rows.filter((r) => selected.has(r.category));
            }
            const memoryBlock = buildMemoryBlock(rows.map((r) => ({ category: r.category, content: r.content })));
            if (memoryBlock) {
                resolvedPrompt = `${resolvedPrompt}\n\n${memoryBlock}`;
            }
        }

        const stream = await openai.chat.completions.create({
            model: resolvedModel,
            messages: [
                { role: 'system', content: resolvedPrompt },
                ...messages,
            ],
            max_tokens: maxTokens,
            temperature: 0.7,
            stream: true,
        });

        // Pipe the OpenAI stream as SSE to the client
        const readable = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try {
                    for await (const chunk of stream) {
                        const delta = chunk.choices[0]?.delta?.content;
                        if (delta) {
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
                        }

                        // OpenRouter attaches usage to the final chunk without
                        // being asked. `cost` is what it actually charged, which
                        // is truer than anything derived from lib/models.ts.
                        const usage = chunk.usage as OpenRouterUsage | null | undefined;
                        if (usage) {
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                                usage: {
                                    promptTokens: usage.prompt_tokens ?? 0,
                                    completionTokens: usage.completion_tokens ?? 0,
                                    totalTokens: usage.total_tokens
                                        ?? (usage.prompt_tokens ?? 0) + (usage.completion_tokens ?? 0),
                                    cost: usage.cost ?? 0,
                                    model: resolvedModel,
                                },
                            })}\n\n`));
                        }
                    }
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                } catch (err) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: String(err) })}\n\n`));
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(readable, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (err) {
        console.error('[council/chat/route] error:', err);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
