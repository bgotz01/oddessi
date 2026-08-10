import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chartPrefix, isLegacy, scopeOf } from "@/lib/memory-scope";

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
