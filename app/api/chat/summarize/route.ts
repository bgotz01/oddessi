import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { COUNCIL_DEFAULT_MODELS } from "@/lib/models";
import { interfaceMemorySystem } from "@/lib/prompts/interface";
import {
  buildCategory,
  chartPrefix,
  scopeOf,
  readableScopes,
  writableCategories,
  type ActiveSystems,
} from "@/lib/memory-scope";

/**
 * POST /api/chat/summarize
 *
 * Distils an Interface chat transcript into CouncilMemory categories scoped to
 * the active chart, then automatically persists any new lessons back to the DB.
 * Called by the client when the user clears the chat (i.e. ends a session).
 *
 * When `chartName` is supplied, memory categories are namespaced as
 * "<chartName> — <Category>", e.g. "Boris — The Chart". This keeps each
 * person's lessons separate while still living in the same CouncilMemory table
 * (and appearing in the Council memory panel, labelled by person).
 *
 * Body: { transcript: string, chartName?: string, model?: string }
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

/**
 * Full stored name for a route. Without a chart there is nobody to attribute
 * the lesson to, so it falls back to the bare category the council uses.
 */
function storedName(category: string, chartName: string | null | undefined): string {
  if (!chartName?.trim()) return category;
  return buildCategory(chartName, category);
}

export async function POST(req: NextRequest) {
  try {
    const { transcript, chartName, model, systems } = (await req.json()) as {
      transcript?: string;
      chartName?: string;
      model?: string;
      /** Which systems were attached while this conversation happened. */
      systems?: ActiveSystems;
    };

    const active: ActiveSystems =
      systems === "western" || systems === "chinese" ? systems : "both";
    const allowedNames = new Set(
      writableCategories(active).map((c) => c.name.toLowerCase()),
    );

    if (!transcript?.trim()) {
      return NextResponse.json({ error: "Missing transcript" }, { status: 400 });
    }

    // Load existing memory rows scoped to this chart (prefix match) so the
    // model can reconcile against what's already been distilled for this person.
    const prefix = chartName?.trim() ? chartPrefix(chartName) : null;
    const allMemory = await prisma.councilMemory.findMany({
      orderBy: { category: "asc" },
    });
    const scopedMemory = prefix
      ? allMemory.filter((c) => c.category.startsWith(prefix))
      : allMemory.filter((c) => !c.category.includes(" — ")); // unscoped rows only

    // Only the categories this conversation may write into. Showing it the
    // Eastern rows during a Western-only session would invite it to "reconcile"
    // against material it never saw.
    const readable = readableScopes(active);
    const visible = scopedMemory.filter((c) => {
      if (!prefix) return true;
      return readable.includes(scopeOf(c.category.slice(prefix.length)));
    });

    const catBlock =
      visible.length > 0
        ? visible
          .map((c) => {
            const bare = prefix ? c.category.slice(prefix.length) : c.category;
            return `### ${bare}\n${c.content.trim() || "(empty)"}`;
          })
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
      // A category this conversation could not see is dropped, not rewritten.
      // There is no honest home for an "Eastern Chart" lesson from a session
      // that never had the pillars in front of it — the lesson is about
      // something the model did not read.
      .filter((r) => !chartName?.trim() || allowedNames.has(r.category.toLowerCase()));

    if (routes.length === 0) {
      return NextResponse.json({ ok: true, categoriesUpdated: [] });
    }

    const updated: string[] = [];

    for (const route of routes) {
      // The model returns bare category names — attribute and scope them.
      const fullCategory = storedName(route.category, chartName);

      // Find the existing row by the full scoped name.
      const existing = allMemory.find(
        (c) => c.category.toLowerCase() === fullCategory.toLowerCase(),
      );

      const currentContent = existing?.content ?? "";
      const newBullets = route.lessons.map((l) => `- ${l}`).join("\n");
      const merged = currentContent.trim()
        ? `${currentContent.trim()}\n${newBullets}`
        : newBullets;

      await prisma.councilMemory.upsert({
        where: { category: existing?.category ?? fullCategory },
        update: { content: merged },
        create: { category: fullCategory, content: merged },
      });

      updated.push(fullCategory);
    }

    return NextResponse.json({ ok: true, categoriesUpdated: updated });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
