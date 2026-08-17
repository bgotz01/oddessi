import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { COUNCIL_DEFAULT_MODELS } from "@/lib/models";
import { interfaceMemorySystem } from "@/lib/prompts/interface";
import {
  parseSystems,
  scopeOf,
  readableScopes,
  writableCategories,
  type ActiveSystems,
} from "@/lib/memory-scope";

/**
 * POST /api/chat/summarize
 *
 * Distils an Interface chat transcript into memory categories scoped to the
 * active chart by its real chartId. Both the Interface and the Council now
 * write to the same rows — no more name-prefix scheme.
 *
 * Body: { transcript, chartId?, chartName?, model?, systems? }
 *
 * `chartId` is the canonical key. `chartName` is kept for the prompt so the
 * model sees a human-readable label; it is never used as a storage key.
 *
 * Returns: { ok: true, categoriesUpdated: string[] }
 */

const FALLBACK_MODEL = COUNCIL_DEFAULT_MODELS[0];

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    "X-Title": "Oddessi",
  },
});

interface Route {
  category: string;
  lessons: string[];
}

function parseRoutes(raw: string): Route[] | null {
  if (!raw.trim()) return null;
  const unfenced = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  const candidates = [unfenced];
  const firstBrace = unfenced.indexOf("{");
  const lastBrace = unfenced.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    candidates.push(unfenced.slice(firstBrace, lastBrace + 1));
  }
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate) as { routes?: Route[] };
      if (Array.isArray(parsed?.routes)) return parsed.routes;
    } catch {
      /* try next */
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { transcript, chartId, chartName, model, systems } = (await req.json()) as {
      transcript?: string;
      /** The chart's real DB id — the canonical storage key. */
      chartId?: string | null;
      /** Human-readable name for the prompt only. */
      chartName?: string;
      model?: string;
      systems?: ActiveSystems | string;
    };

    const active = parseSystems(systems);
    const allowedNames = new Set(
      writableCategories(active).map((c) => c.name.toLowerCase()),
    );

    if (!transcript?.trim()) {
      return NextResponse.json({ error: "Missing transcript" }, { status: 400 });
    }

    // Resolve the actual chartId to use for storage. Prefer the explicit id;
    // fall back to null (Shared) when no chart was active.
    const resolvedChartId = chartId?.trim() || null;

    // Load existing rows for this chart so the model can reconcile.
    const existingRows = await prisma.councilMemory.findMany({
      where: { chartId: resolvedChartId },
      orderBy: { category: "asc" },
    });

    // Only show the distiller categories it may write into given the active systems.
    const readable = readableScopes(active);
    const visible = existingRows.filter((c) =>
      readable.includes(scopeOf(c.category)),
    );

    const catBlock =
      visible.length > 0
        ? visible
          .map((c) => `### ${c.category}\n${c.content.trim() || "(empty)"}`)
          .join("\n\n")
        : "(no categories yet)";

    const userContent = [
      "─── ACTIVE PROJECT ───",
      chartName?.trim()
        ? `Chart: ${chartName.trim()}`
        : "(none — this is an Interface chat with no chart active)",
      "",
      "─── EXISTING CATEGORIES ───",
      catBlock,
      "",
      "─── SESSION TRANSCRIPT ───",
      transcript.trim(),
    ].join("\n");

    const completion = await openai.chat.completions.create({
      model: model?.trim() || FALLBACK_MODEL,
      messages: [
        { role: "system", content: interfaceMemorySystem(active) },
        { role: "user", content: userContent },
      ],
      max_tokens: 4000,
      temperature: 0.4,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    const parsed = parseRoutes(raw);

    if (!parsed) {
      return NextResponse.json(
        { error: "Model did not return usable JSON." },
        { status: 502 },
      );
    }

    const routes = parsed
      .filter((r) => r && typeof r.category === "string" && Array.isArray(r.lessons))
      .map((r) => ({
        category: r.category.trim(),
        lessons: r.lessons
          .filter((l) => typeof l === "string" && l.trim())
          .map((l) => l.trim()),
      }))
      .filter((r) => r.category && r.lessons.length > 0)
      .filter((r) => !resolvedChartId || allowedNames.has(r.category.toLowerCase()));

    if (routes.length === 0) {
      return NextResponse.json({ ok: true, categoriesUpdated: [] });
    }

    const updated: string[] = [];

    for (const route of routes) {
      const existing = existingRows.find(
        (c) => c.category.toLowerCase() === route.category.toLowerCase(),
      );

      const currentContent = existing?.content ?? "";
      const newBullets = route.lessons.map((l) => `- ${l}`).join("\n");
      const merged = currentContent.trim()
        ? `${currentContent.trim()}\n${newBullets}`
        : newBullets;

      if (existing) {
        await prisma.councilMemory.update({
          where: { id: existing.id },
          data: { content: merged },
        });
      } else {
        await prisma.councilMemory.create({
          data: { chartId: resolvedChartId, category: route.category, content: merged },
        });
      }

      updated.push(route.category);
    }

    return NextResponse.json({ ok: true, categoriesUpdated: updated });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
