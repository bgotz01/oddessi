import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  isLegacy,
  isPinned,
  noteCategories,
  scopeOf,
  type MemoryScope,
} from "@/lib/memory-scope";

/**
 * GET /api/chat/memory?chartId=<id>
 *
 * Returns all memory rows for the given chart, for the Interface's memory panel.
 * Category names are returned bare (no prefix) — they are already scoped by chartId.
 */
export async function GET(req: NextRequest) {
  const chartId = new URL(req.url).searchParams.get("chartId")?.trim();
  if (!chartId) return NextResponse.json([]);

  const rows = await prisma.councilMemory.findMany({
    where: { chartId },
    orderBy: { category: "asc" },
  });

  return NextResponse.json(
    rows
      .filter((row) => row.content.trim())
      .map((row) => {
        const scope = scopeOf(row.category);
        const legacy = isLegacy(row.category);
        return {
          category: row.category,
          scope,
          legacy,
          content: row.content.trim(),
          lessons: row.content
            .split("\n")
            .map((line) => line.replace(/^-\s*/, "").trim())
            .filter(Boolean),
        };
      }),
  );
}

/**
 * POST /api/chat/memory — pin a passage by hand.
 *
 * Body: { chartId, scope, text }
 */
export async function POST(req: NextRequest) {
  const { chartId, scope, text } = (await req.json()) as {
    chartId?: string;
    scope?: MemoryScope;
    text?: string;
  };

  const passage = text?.replace(/\s+/g, " ").trim();
  if (!chartId?.trim() || !passage) {
    return NextResponse.json(
      { error: "chartId and text are required" },
      { status: 400 },
    );
  }

  const target = noteCategories().find((c) => c.scope === scope);
  if (!target) {
    return NextResponse.json({ error: "Unknown scope" }, { status: 400 });
  }

  const existing = await prisma.councilMemory.findFirst({
    where: { chartId, category: target.name },
  });

  const line = `- ${passage}`;
  const merged = existing?.content.trim()
    ? `${existing.content.trim()}\n${line}`
    : line;

  if (existing) {
    await prisma.councilMemory.update({
      where: { id: existing.id },
      data: { content: merged },
    });
  } else {
    await prisma.councilMemory.create({
      data: { chartId, category: target.name, content: merged },
    });
  }

  return NextResponse.json({ ok: true, category: target.name });
}

/**
 * DELETE /api/chat/memory?chartId=…&category=…&index=…
 *
 * Removes one pinned passage by index within the category's bullet list.
 */
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const chartId = url.searchParams.get("chartId")?.trim();
  const category = url.searchParams.get("category")?.trim();
  const index = Number(url.searchParams.get("index"));

  if (!chartId || !category || !Number.isInteger(index)) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (!isPinned(category)) {
    return NextResponse.json(
      { error: "Only pinned passages can be removed here" },
      { status: 400 },
    );
  }

  const row = await prisma.councilMemory.findFirst({ where: { chartId, category } });
  if (!row) return NextResponse.json({ ok: true });

  const lines = row.content.split("\n").filter((l) => l.trim());
  if (index < 0 || index >= lines.length) {
    return NextResponse.json({ error: "No such passage" }, { status: 404 });
  }
  lines.splice(index, 1);

  if (lines.length === 0) {
    await prisma.councilMemory.delete({ where: { id: row.id } });
  } else {
    await prisma.councilMemory.update({
      where: { id: row.id },
      data: { content: lines.join("\n") },
    });
  }

  return NextResponse.json({ ok: true });
}
