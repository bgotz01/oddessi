import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/chat/sessions?chartId=<id> — list sessions for a chart, newest first
// Omitting chartId returns sessions that have no chart attached.
export async function GET(req: NextRequest) {
  const chartId = new URL(req.url).searchParams.get("chartId") ?? null;

  const sessions = await prisma.interfaceChatSession.findMany({
    where: { chartId },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: { orderBy: { order: "asc" } },
    },
  });

  return NextResponse.json(
    sessions.map((s) => ({
      id: s.id,
      title: s.title,
      chartId: s.chartId,
      chartName: s.chartName,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
      messages: s.messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        order: m.order,
      })),
    })),
  );
}

// POST /api/chat/sessions — create a new session
export async function POST(req: NextRequest) {
  const body = await req.json() as {
    title?: string;
    chartId?: string;
    chartName?: string;
  };

  const session = await prisma.interfaceChatSession.create({
    data: {
      title: body.title?.trim().slice(0, 80) || null,
      chartId: body.chartId?.trim() || null,
      chartName: body.chartName?.trim() || null,
    },
  });

  return NextResponse.json({ id: session.id }, { status: 201 });
}
