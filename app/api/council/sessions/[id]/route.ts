import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH /api/council/sessions/:id — update agentModels, mode, or title
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();
    const session = await prisma.councilSession.update({
        where: { id },
        data: {
            ...(body.agentModels ? { agentModels: body.agentModels } : {}),
            ...(body.mode ? { mode: body.mode } : {}),
            ...('title' in body ? { title: body.title || null } : {}),
        },
    });
    return NextResponse.json(session);
}

// DELETE /api/council/sessions/:id
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await prisma.councilSession.delete({ where: { id } });
    return NextResponse.json({ ok: true });
}
