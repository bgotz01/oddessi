import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { COUNCIL_DEFAULT_MODELS } from '@/lib/models';
import { CHART_READ_SYSTEM } from '@/lib/prompts/council';
import { buildChartBlock } from '@/lib/chart-context';
import type { Chart } from '@/lib/charts';

const FALLBACK_MODEL = COUNCIL_DEFAULT_MODELS[0];

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
        'X-Title': 'Oddessi',
    },
});

export async function POST(req: NextRequest) {
    try {
        const { chart, model } = await req.json() as { chart?: Chart; model?: string };

        if (!chart || typeof chart !== 'object') {
            return new Response(
                JSON.stringify({ error: 'Missing chart' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } },
            );
        }

        const chartBlock = buildChartBlock(chart);

        const stream = await openai.chat.completions.create({
            model: model?.trim() || FALLBACK_MODEL,
            messages: [
                { role: 'system', content: CHART_READ_SYSTEM },
                { role: 'user', content: chartBlock },
            ],
            max_tokens: 1200,
            temperature: 0.4,
            stream: true,
        });

        const readable = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try {
                    for await (const chunk of stream) {
                        const delta = chunk.choices[0]?.delta?.content;
                        if (delta) {
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
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
                Connection: 'keep-alive',
            },
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: String(err) }),
            { status: 500, headers: { 'Content-Type': 'application/json' } },
        );
    }
}
