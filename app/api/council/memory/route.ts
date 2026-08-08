import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// The durable categories every memory starts with. They split along the one
// axis that matters here: what the chart says, what actually happened, and
// which readings the record has since supported or contradicted.
const SEED_CATEGORIES = [
    'The Chart',
    'The Record',
    'Readings That Held',
    'Readings That Failed',
    'Working Notes',
];

// GET /api/council/memory — all memory categories (seeding the kind categories if empty)
export async function GET() {
    let rows = await prisma.councilMemory.findMany({ orderBy: { category: 'asc' } });
    if (rows.length === 0) {
        await prisma.councilMemory.createMany({ data: SEED_CATEGORIES.map((category) => ({ category, content: '' })) });
        rows = await prisma.councilMemory.findMany({ orderBy: { category: 'asc' } });
    }
    return NextResponse.json(rows.map((r) => ({ category: r.category, content: r.content })));
}

// PUT /api/council/memory — upsert a single category's document
export async function PUT(req: NextRequest) {
    const { category, content } = await req.json() as { category?: string; content?: string };
    if (!category || !category.trim()) {
        return NextResponse.json({ error: 'Missing category' }, { status: 400 });
    }
    const row = await prisma.councilMemory.upsert({
        where: { category: category.trim() },
        update: { content: content ?? '' },
        create: { category: category.trim(), content: content ?? '' },
    });
    return NextResponse.json({ category: row.category, content: row.content });
}

// POST /api/council/memory — create a new empty category
export async function POST(req: NextRequest) {
    const { category } = await req.json() as { category?: string };
    const name = category?.trim();
    if (!name) return NextResponse.json({ error: 'Missing category' }, { status: 400 });
    const existing = await prisma.councilMemory.findUnique({ where: { category: name } });
    if (existing) return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
    const row = await prisma.councilMemory.create({ data: { category: name, content: '' } });
    return NextResponse.json({ category: row.category, content: row.content });
}

// PATCH /api/council/memory — rename a category
export async function PATCH(req: NextRequest) {
    const { from, to } = await req.json() as { from?: string; to?: string };
    if (!from?.trim() || !to?.trim()) {
        return NextResponse.json({ error: 'Missing from/to' }, { status: 400 });
    }
    const row = await prisma.councilMemory.update({
        where: { category: from.trim() },
        data: { category: to.trim() },
    });
    return NextResponse.json({ category: row.category, content: row.content });
}

// DELETE /api/council/memory?category=Name — remove a category
export async function DELETE(req: NextRequest) {
    const category = new URL(req.url).searchParams.get('category');
    if (!category) return NextResponse.json({ error: 'Missing category' }, { status: 400 });
    await prisma.councilMemory.deleteMany({ where: { category } });
    return NextResponse.json({ ok: true });
}
