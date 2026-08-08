import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/council/sessions — list all sessions with their turns + responses
export async function GET() {
    const sessions = await prisma.councilSession.findMany({
        orderBy: { updatedAt: 'desc' },
        include: {
            turns: {
                orderBy: { order: 'asc' },
                include: {
                    responses: { orderBy: { agentIndex: 'asc' } },
                },
            },
        },
    });
    return NextResponse.json(sessions);
}

// POST /api/council/sessions — create a new session, returns { id }
export async function POST(req: NextRequest) {
    const { mode, agentModels } = await req.json();
    const session = await prisma.councilSession.create({
        data: { mode, agentModels },
    });
    return NextResponse.json({ id: session.id });
}
