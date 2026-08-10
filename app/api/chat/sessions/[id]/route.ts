import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/chat/sessions/[id] — fetch one session with all messages
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await prisma.interfaceChatSession.findUnique({
    where: { id },
    include: { messages: { orderBy: { order: "asc" } } },
  });
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id: session.id,
    title: session.title,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
    messages: session.messages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      order: m.order,
    })),
  });
}

// PATCH /api/chat/sessions/[id] — append a message, optionally set title
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json() as {
    message?: { role: string; content: string; order: number };
    title?: string;
  };

  const session = await prisma.interfaceChatSession.findUnique({ where: { id } });
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updates: Parameters<typeof prisma.interfaceChatSession.update>[0]["data"] = {
    updatedAt: new Date(),
  };

  if (body.title !== undefined) {
    updates.title = body.title.trim().slice(0, 80) || null;
  }

  if (body.message) {
    updates.messages = {
      create: {
        role: body.message.role,
        content: body.message.content,
        order: body.message.order,
      },
    };
  }

  await prisma.interfaceChatSession.update({ where: { id }, data: updates });
  return NextResponse.json({ ok: true });
}

// DELETE /api/chat/sessions/[id] — remove session and all its messages (cascade)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.interfaceChatSession.delete({ where: { id } }).catch(() => {/* already gone */ });
  return NextResponse.json({ ok: true });
}
