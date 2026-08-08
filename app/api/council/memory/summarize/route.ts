import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { COUNCIL_DEFAULT_MODELS } from '@/lib/models';
import { MEMORY_SUMMARIZE_SYSTEM } from '@/lib/prompts/council';

// Distillation runs on Agent I's model, passed in by the client.
// The default is only a fallback for a request that omits it.
const FALLBACK_MODEL = COUNCIL_DEFAULT_MODELS[0];

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
        'X-Title': 'Oddessi',
    },
});

interface Route { category: string; lessons: string[] }

/**
 * Pull the routes array out of a model reply. Handles the two ways models
 * deviate from plain JSON: wrapping it in markdown fences, or padding it with
 * prose. Returns null when nothing usable is there — including a truncated
 * reply, which parses as neither.
 */
function parseRoutes(raw: string): Route[] | null {
    if (!raw.trim()) return null;
    const unfenced = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    const candidates = [unfenced];
    const firstBrace = unfenced.indexOf('{');
    const lastBrace = unfenced.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
        candidates.push(unfenced.slice(firstBrace, lastBrace + 1));
    }
    for (const candidate of candidates) {
        try {
            const parsed = JSON.parse(candidate) as { routes?: Route[] };
            if (Array.isArray(parsed?.routes)) return parsed.routes;
        } catch { /* try the next candidate */ }
    }
    return null;
}

/** Collapse per-bullet routes into one route per category, preserving order. */
function mergeByCategory(routes: Route[]): Route[] {
    const merged = new Map<string, Route>();
    for (const r of routes) {
        const existing = merged.get(r.category.toLowerCase());
        if (existing) {
            for (const l of r.lessons) {
                if (!existing.lessons.includes(l)) existing.lessons.push(l);
            }
        } else {
            merged.set(r.category.toLowerCase(), { category: r.category, lessons: [...r.lessons] });
        }
    }
    return Array.from(merged.values());
}

export async function POST(req: NextRequest) {
    try {
        const { transcript, categories, projects, model } = await req.json() as {
            transcript?: string;
            categories?: { category: string; content: string }[];
            projects?: string[];
            model?: string;
        };

        if (!transcript || typeof transcript !== 'string' || !transcript.trim()) {
            return NextResponse.json({ error: 'Missing transcript' }, { status: 400 });
        }

        const catBlock = (categories && categories.length > 0)
            ? categories.map((c) => `### ${c.category}\n${c.content.trim() || '(empty)'}`).join('\n\n')
            : '(no categories yet)';

        const activeProjects = (projects ?? []).map((p) => p.trim()).filter(Boolean);
        const projectBlock = activeProjects.length > 0
            ? activeProjects.join(', ')
            : '(none — this is general brainstorming, not work on a specific project)';

        const userContent = [
            '─── ACTIVE PROJECT ───',
            projectBlock,
            '',
            '─── EXISTING CATEGORIES ───',
            catBlock,
            '',
            '─── SESSION TRANSCRIPT ───',
            transcript.trim(),
        ].join('\n');

        const completion = await openai.chat.completions.create({
            model: model?.trim() || FALLBACK_MODEL,
            messages: [
                { role: 'system', content: MEMORY_SUMMARIZE_SYSTEM },
                { role: 'user', content: userContent },
            ],
            // Generous ceiling: a truncated reply is invalid JSON, which loses the whole distillation.
            max_tokens: 4000,
            temperature: 0.4,
            response_format: { type: 'json_object' },
        });

        const raw = completion.choices[0]?.message?.content?.trim() ?? '';
        const parsed = parseRoutes(raw);
        if (!parsed) {
            // Never file unparsed model output as if it were a lesson — report the failure instead.
            return NextResponse.json(
                { error: 'The model did not return usable JSON. Try again, or pick a different global model.' },
                { status: 502 },
            );
        }

        const cleaned = parsed
            .filter((r) => r && typeof r.category === 'string' && Array.isArray(r.lessons))
            .map((r) => ({
                category: r.category.trim(),
                lessons: r.lessons.filter((l) => typeof l === 'string' && l.trim()).map((l) => l.trim()),
            }))
            .filter((r) => r.category && r.lessons.length > 0);

        return NextResponse.json({ routes: mergeByCategory(cleaned) });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
