import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// The full canonical set — same names the Interface uses, so both surfaces
// read and write the same rows. Order matters: this is the display order in
// council/memory and the order the distiller is shown them.
const SEED_CATEGORIES = [
    // ── Distillable ────────────────────────────────────────────────────────
    'Character',          // Shared  — what this person is actually like
    'Western Readings',   // western — what natal placements turned out to mean
    'Eastern Readings',   // eastern — what BaZi turned out to mean
    'Numerology Readings',// numerology — what the numbers turned out to mean
    'The Record',         // Shared  — dated life events
    'Working Notes',      // Shared  — standing instructions
    'Questions Asked',    // Shared  — what the user keeps returning to
    // ── Pinned by hand ────────────────────────────────────────────────────
    'Notes',              // Shared
    'Western Notes',      // western
    'Eastern Notes',      // eastern
    'Numerology Notes',   // numerology
];

/**
 * Parse chartId from a query-param string.
 * The absent param and the literal "null" string both mean Shared (null).
 * Any other string is taken as a real chart UUID.
 */
function parseChartId(raw: string | null): string | null {
    if (!raw || raw === 'null') return null;
    return raw;
}

/**
 * Ensure every seed category exists for the given bucket.
 * Creates only the missing ones — never touches rows that already exist.
 * This means charts with partial data (e.g. from migration) get the rest
 * filled in without overwriting anything.
 */
async function ensureCategories(chartId: string | null) {
    const existing = await prisma.councilMemory.findMany({
        where: { chartId },
        select: { category: true },
    });
    const existingNames = new Set(existing.map((r) => r.category));
    const missing = SEED_CATEGORIES.filter((c) => !existingNames.has(c));
    if (missing.length > 0) {
        await prisma.councilMemory.createMany({
            data: missing.map((category) => ({ chartId, category, content: '' })),
        });
    }
}

// GET /api/council/memory?chartId=<uuid|null>
// Returns all categories for the requested chart bucket (seeding if empty).
// When chartId is omitted or "null", returns the Shared bucket.
export async function GET(req: NextRequest) {
    const chartId = parseChartId(new URL(req.url).searchParams.get('chartId'));
    await ensureCategories(chartId);
    const rows = await prisma.councilMemory.findMany({
        where: { chartId },
        orderBy: { category: 'asc' },
    });
    return NextResponse.json(rows.map((r) => ({ category: r.category, content: r.content })));
}

// PUT /api/council/memory — upsert a single category's document
// Body: { chartId?: string | null, category: string, content: string }
export async function PUT(req: NextRequest) {
    const body = await req.json() as { chartId?: string | null; category?: string; content?: string };
    const chartId = parseChartId(body.chartId ?? null);
    const category = body.category?.trim();
    if (!category) {
        return NextResponse.json({ error: 'Missing category' }, { status: 400 });
    }
    // Prisma's compound unique key requires non-null values, so we must branch on
    // whether this row is chart-scoped or Shared (chartId = null).
    const row = chartId
        ? await prisma.councilMemory.upsert({
            where: { chartId_category: { chartId, category } },
            update: { content: body.content ?? '' },
            create: { chartId, category, content: body.content ?? '' },
        })
        : await (async () => {
            const existing = await prisma.councilMemory.findFirst({ where: { chartId: null, category } });
            if (existing) {
                return prisma.councilMemory.update({ where: { id: existing.id }, data: { content: body.content ?? '' } });
            }
            return prisma.councilMemory.create({ data: { chartId: null, category, content: body.content ?? '' } });
        })();
    return NextResponse.json({ category: row.category, content: row.content });
}

// POST /api/council/memory — create a new empty category
// Body: { chartId?: string | null, category: string }
export async function POST(req: NextRequest) {
    const body = await req.json() as { chartId?: string | null; category?: string };
    const chartId = parseChartId(body.chartId ?? null);
    const name = body.category?.trim();
    if (!name) return NextResponse.json({ error: 'Missing category' }, { status: 400 });
    const existing = await prisma.councilMemory.findFirst({ where: { chartId, category: name } });
    if (existing) return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
    const row = await prisma.councilMemory.create({ data: { chartId, category: name, content: '' } });
    return NextResponse.json({ category: row.category, content: row.content });
}

// PATCH /api/council/memory — rename a category within the same chart bucket
// Body: { chartId?: string | null, from: string, to: string }
export async function PATCH(req: NextRequest) {
    const body = await req.json() as { chartId?: string | null; from?: string; to?: string };
    const chartId = parseChartId(body.chartId ?? null);
    if (!body.from?.trim() || !body.to?.trim()) {
        return NextResponse.json({ error: 'Missing from/to' }, { status: 400 });
    }
    const existing = await prisma.councilMemory.findFirst({ where: { chartId, category: body.from.trim() } });
    if (!existing) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    const row = await prisma.councilMemory.update({
        where: { id: existing.id },
        data: { category: body.to.trim() },
    });
    return NextResponse.json({ category: row.category, content: row.content });
}

// DELETE /api/council/memory?chartId=<uuid|null>&category=Name
export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const chartId = parseChartId(url.searchParams.get('chartId'));
    const category = url.searchParams.get('category');
    if (!category) return NextResponse.json({ error: 'Missing category' }, { status: 400 });
    await prisma.councilMemory.deleteMany({ where: { chartId, category } });
    return NextResponse.json({ ok: true });
}
