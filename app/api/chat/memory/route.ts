import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  buildCategory,
  chartPrefix,
  isLegacy,
  isPinned,
  noteCategories,
  scopeOf,
  type MemoryScope,
} from "@/lib/memory-scope";

/**
 * GET /api/chat/memory?chartName=<name>
 *
 * What has been distilled about one chart, for the Interface's memory panel.
 *
 * The scoping is the same rule `/api/chat` reads by: rows are namespaced
 * "<chart name> — <Category>" and only that prefix is returned. Filtering here
 * rather than in the browser matters — the alternative is shipping every
 * person's distilled memory to the client so it can hide most of it.
 *
 * Category names come back bare, without the prefix, because the prefix is
 * bookkeeping and repeating the chart's own name on every row in a panel that
 * is already about that chart reads as noise.
 */
export async function GET(req: NextRequest) {
  const chartName = new URL(req.url).searchParams.get("chartName")?.trim();
  if (!chartName) return NextResponse.json([]);

  const prefix = chartPrefix(chartName);
  const rows = await prisma.councilMemory.findMany({
    where: { category: { startsWith: prefix } },
    orderBy: { category: "asc" },
  });

  return NextResponse.json(
    rows
      .filter((row) => row.content.trim())
      .map((row) => {
        const category = row.category.slice(prefix.length);
        const scope = scopeOf(category);
        const legacy = isLegacy(category);
        return {
          category,
          scope,
          /** Written before scoping existed — read as Shared. */
          legacy,
          content: row.content.trim(),
          /** Bullets, as the distiller writes them — one lesson per line. */
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
 * Body: { chartName, scope, text }
 *
 * Stored verbatim. The whole reason a pinned passage is worth more than a
 * distilled one is that the person judged *these words* worth keeping, so
 * nothing here trims, summarises or re-words it. Newlines are collapsed only
 * because the store is one-bullet-per-line and a passage spanning lines would
 * come back as several unrelated notes.
 */
export async function POST(req: NextRequest) {
  const { chartName, scope, text } = (await req.json()) as {
    chartName?: string;
    scope?: MemoryScope;
    text?: string;
  };

  const passage = text?.replace(/\s+/g, " ").trim();
  if (!chartName?.trim() || !passage) {
    return NextResponse.json(
      { error: "chartName and text are required" },
      { status: 400 },
    );
  }

  const target = noteCategories().find((c) => c.scope === scope);
  if (!target) {
    return NextResponse.json({ error: "Unknown scope" }, { status: 400 });
  }

  const category = buildCategory(chartName, target.name);
  const existing = await prisma.councilMemory.findUnique({ where: { category } });

  // Appending rather than upserting a whole body, so two pins in a row cannot
  // silently overwrite each other.
  const line = `- ${passage}`;
  const merged = existing?.content.trim()
    ? `${existing.content.trim()}\n${line}`
    : line;

  await prisma.councilMemory.upsert({
    where: { category },
    update: { content: merged },
    create: { category, content: merged },
  });

  return NextResponse.json({ ok: true, category: target.name });
}

/**
 * DELETE /api/chat/memory?chartName=…&category=…&index=…
 *
 * Removes one pinned passage. Only pinned categories: a distilled lesson is
 * managed by the distiller and edited in the council's panel, and offering a
 * one-click delete for it here would be a second, competing editor.
 */
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const chartName = url.searchParams.get("chartName")?.trim();
  const category = url.searchParams.get("category")?.trim();
  const index = Number(url.searchParams.get("index"));

  if (!chartName || !category || !Number.isInteger(index)) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (!isPinned(category)) {
    return NextResponse.json(
      { error: "Only pinned passages can be removed here" },
      { status: 400 },
    );
  }

  const full = buildCategory(chartName, category);
  const row = await prisma.councilMemory.findUnique({ where: { category: full } });
  if (!row) return NextResponse.json({ ok: true });

  const lines = row.content.split("\n").filter((l) => l.trim());
  if (index < 0 || index >= lines.length) {
    return NextResponse.json({ error: "No such passage" }, { status: 404 });
  }
  lines.splice(index, 1);

  if (lines.length === 0) {
    await prisma.councilMemory.delete({ where: { category: full } });
  } else {
    await prisma.councilMemory.update({
      where: { category: full },
      data: { content: lines.join("\n") },
    });
  }

  return NextResponse.json({ ok: true });
}
