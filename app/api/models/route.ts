import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MODELS } from '@/lib/models';

const KNOWN = new Map(MODELS.map((m) => [m.id, m]));

// GET — persisted model state, as { prices, hidden }.
//   prices — input/output overrides keyed by model id (absent id → code default)
//   hidden — ids of models soft-removed from the catalogue
export async function GET() {
    const rows = await prisma.modelPrice.findMany();
    const prices: Record<string, { inputCost: number; outputCost: number }> = {};
    const hidden: string[] = [];
    for (const r of rows) {
        prices[r.id] = { inputCost: r.inputCost, outputCost: r.outputCost };
        if (r.hidden) hidden.push(r.id);
    }
    return NextResponse.json({ prices, hidden });
}

function validCost(value: unknown): value is number {
    return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

// PATCH — mutate one model's persisted state.
//   { id, inputCost, outputCost } → upsert its price override
//   { id, hidden }                → soft-remove (true) or restore (false)
export async function PATCH(req: NextRequest) {
    const body = await req.json() as {
        id?: unknown; inputCost?: unknown; outputCost?: unknown; hidden?: unknown;
    };
    const { id, inputCost, outputCost, hidden } = body;

    if (typeof id !== 'string' || !KNOWN.has(id)) {
        return NextResponse.json({ error: 'unknown model id' }, { status: 400 });
    }

    // Hidden toggle — carries the current effective price so the row is complete
    // even for a model that was never price-edited.
    if (typeof hidden === 'boolean' && inputCost === undefined && outputCost === undefined) {
        const model = KNOWN.get(id)!;
        const existing = await prisma.modelPrice.findUnique({ where: { id } });
        const saved = await prisma.modelPrice.upsert({
            where: { id },
            create: {
                id,
                inputCost: existing?.inputCost ?? model.inputCost,
                outputCost: existing?.outputCost ?? model.outputCost,
                hidden,
            },
            update: { hidden },
        });
        return NextResponse.json({ id: saved.id, hidden: saved.hidden });
    }

    if (!validCost(inputCost) || !validCost(outputCost)) {
        return NextResponse.json({ error: 'inputCost and outputCost must be non-negative numbers' }, { status: 400 });
    }

    const saved = await prisma.modelPrice.upsert({
        where: { id },
        create: { id, inputCost, outputCost },
        update: { inputCost, outputCost },
    });
    return NextResponse.json({ id: saved.id, inputCost: saved.inputCost, outputCost: saved.outputCost });
}
