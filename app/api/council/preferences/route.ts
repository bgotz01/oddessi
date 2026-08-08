import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { COUNCIL_DEFAULT_MODELS, GLOBAL_DEFAULT_MODEL } from '@/lib/models';

const PREFS_ID = 'default';
const DEFAULT_PROMPTS = ['', '', ''];

// GET /api/council/preferences — return stored preferences, seeding defaults if absent
export async function GET() {
    const prefs = await prisma.councilPreferences.upsert({
        where: { id: PREFS_ID },
        update: {},
        create: {
            id: PREFS_ID,
            agentModels: [...COUNCIL_DEFAULT_MODELS],
            agentPrompts: DEFAULT_PROMPTS,
            globalModel: GLOBAL_DEFAULT_MODEL,
        },
    });
    // Rows created before the global model existed fall back to the default.
    return NextResponse.json({ ...prefs, globalModel: prefs.globalModel ?? GLOBAL_DEFAULT_MODEL });
}

// PUT /api/council/preferences — update models and/or prompts
export async function PUT(req: NextRequest) {
    const body = await req.json() as { agentModels?: string[]; agentPrompts?: string[]; globalModel?: string };
    const prefs = await prisma.councilPreferences.upsert({
        where: { id: PREFS_ID },
        update: {
            ...(body.agentModels && { agentModels: body.agentModels }),
            ...(body.agentPrompts && { agentPrompts: body.agentPrompts }),
            ...(body.globalModel && { globalModel: body.globalModel }),
        },
        create: {
            id: PREFS_ID,
            agentModels: body.agentModels ?? [...COUNCIL_DEFAULT_MODELS],
            agentPrompts: body.agentPrompts ?? DEFAULT_PROMPTS,
            globalModel: body.globalModel ?? GLOBAL_DEFAULT_MODEL,
        },
    });
    return NextResponse.json({ ...prefs, globalModel: prefs.globalModel ?? GLOBAL_DEFAULT_MODEL });
}
