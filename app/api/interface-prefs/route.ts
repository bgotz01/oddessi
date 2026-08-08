import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MODELS, DEFAULT_MODEL } from "@/lib/models";
import { DEFAULT_INTERFACE_PROMPT } from "@/lib/interface-prefs";

const ID = "default";

export async function GET() {
  const row = await prisma.interfacePreferences.findUnique({ where: { id: ID } });
  return NextResponse.json({
    model: row?.model ?? DEFAULT_MODEL,
    systemPrompt: row?.systemPrompt ?? DEFAULT_INTERFACE_PROMPT,
  });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json() as { model?: string; systemPrompt?: string };

  const validIds = new Set(MODELS.map((m) => m.id));
  const model = body.model && validIds.has(body.model) ? body.model : undefined;
  const systemPrompt = typeof body.systemPrompt === "string" ? body.systemPrompt : undefined;

  if (!model && systemPrompt === undefined) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const existing = await prisma.interfacePreferences.findUnique({ where: { id: ID } });

  const row = await prisma.interfacePreferences.upsert({
    where: { id: ID },
    create: {
      id: ID,
      model: model ?? DEFAULT_MODEL,
      systemPrompt: systemPrompt ?? DEFAULT_INTERFACE_PROMPT,
    },
    update: {
      ...(model !== undefined && { model }),
      ...(systemPrompt !== undefined && { systemPrompt }),
    },
  });

  return NextResponse.json({ model: row.model, systemPrompt: row.systemPrompt });
}
