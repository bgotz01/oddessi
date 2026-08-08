import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface IncomingUsage {
    promptTokens?: number;
    completionTokens?: number;
    cost?: number;
}

interface IncomingResponse {
    agentIndex: number;
    model: string;
    content: string;
    /** Absent when the provider reported no usage for the call. */
    usage?: IncomingUsage;
}

// POST /api/council/turns — save a completed turn with all agent responses
export async function POST(req: NextRequest) {
    const { sessionId, question, order, responses } = await req.json();

    const turn = await prisma.councilTurn.create({
        data: {
            sessionId,
            question,
            order,
            responses: {
                create: (responses as IncomingResponse[]).map((r) => ({
                    agentIndex: r.agentIndex,
                    model: r.model,
                    content: r.content,
                    promptTokens: r.usage?.promptTokens ?? null,
                    completionTokens: r.usage?.completionTokens ?? null,
                    cost: r.usage?.cost ?? null,
                })),
            },
        },
        include: { responses: true },
    });
    return NextResponse.json(turn);
}
