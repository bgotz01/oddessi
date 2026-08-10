import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Chart } from "@/lib/charts";
import { MODELS, DEFAULT_MODEL } from "@/lib/models";
import { DEFAULT_INTERFACE_PROMPT } from "@/lib/interface-prefs";
import { buildMemoryBlock } from "@/lib/pageContext";
import { computeReading, type Gender } from "@/lib/chinese/pillars";
import { BRANCHES, STEMS, generatedBy } from "@/lib/chinese/almanac";

/**
 * POST /api/chat
 *
 * Body: { messages, model?, chart?, pathname? }
 *
 * Streams an OpenRouter completion as SSE. The system message is built from:
 *   1. The user's saved system prompt (from interface_preferences, or the
 *      default if none saved yet).
 *   2. The chart's factual data (placements, houses, aspects) — appended as a
 *      separate block so the character prompt and the data stay cleanly split.
 *   3. The current page pathname, so the model knows what the user is looking at.
 *   4. The active chart's distilled memory, when the Chart Memory toggle is on.
 */

/** Which system(s) the Interface is allowed to read from. */
export type Systems = "western" | "chinese" | "both";

/**
 * The Four Pillars for this birth, as a system-prompt block.
 *
 * Computed here rather than fetched from `/api/chinese` — same `computeReading`
 * either way, and a route calling its own sibling over HTTP just to get at a
 * pure function is a round trip for nothing.
 *
 * The closing line is not decoration. With both systems attached the model has
 * two element vocabularies in front of it, three of whose names collide, and
 * the default behaviour is to helpfully merge them. `lib/comparison.ts` carries
 * the same warning for the same reason.
 */
async function buildChineseBlock(chart: Chart): Promise<string> {
  const row = await prisma.birthChartData.findUnique({
    where: { id: chart.id },
    select: { gender: true },
  });
  const g = row?.gender?.trim().toLowerCase();
  const gender: Gender | null = g === "male" || g === "female" ? g : null;

  const reading = computeReading({
    date: chart.birth.date,
    time: chart.birth.time,
    timezone: chart.birth.timezone,
    gender,
  });

  const master = STEMS[reading.dayMaster];
  const pillar = (p: { stem: number; branch: number }) =>
    `${STEMS[p.stem].polarity} ${STEMS[p.stem].element} (${STEMS[p.stem].han}) over ${BRANCHES[p.branch].animal} — ${BRANCHES[p.branch].element}`;

  const now = Date.now();
  const luck =
    reading.luck?.find(
      (p) => Date.parse(p.startDate) <= now && now < Date.parse(p.endDate),
    ) ?? null;

  const lines = [
    "--- Four Pillars (BaZi) ---",
    `Day Master: ${master.polarity} ${master.element} (${master.han} ${master.pinyin}) — the chart's subject.`,
    `Resource (the phase that generates it): ${generatedBy(master.element)}`,
    `Strength: ${reading.strength.verdict} — ${reading.strength.supportive}% supportive, born ${
      reading.strength.inSeason ? "in" : "out of"
    } season in the ${BRANCHES[reading.pillars.month.branch].season} month.`,
    "",
    "Pillars:",
    `  Year:  ${pillar(reading.pillars.year)}`,
    `  Month: ${pillar(reading.pillars.month)}`,
    `  Day:   ${pillar(reading.pillars.day)}`,
    `  Hour:  ${pillar(reading.pillars.hour)}`,
    "",
    `Element shares: ${reading.elements.map((e) => `${e.element} ${e.share}%`).join(", ")}`,
    `Absent: ${reading.missing.length ? reading.missing.join(", ") : "none"}`,
    luck
      ? `Current luck pillar: ${pillar(luck)}, ages ${Math.floor(luck.startAge)}–${Math.floor(luck.endAge)}.`
      : "Luck pillars unavailable (the direction of the sequence depends on birth sex, which is not recorded).",
    "",
    "These five phases are NOT the four Western elements. They are stages of",
    "transformation read relative to the Day Master, not qualities of temperament,",
    "and Earth, Fire and Water mean different things here than they do in the",
    "chart data above. Never translate one system into the other or average them",
    "into a single verdict.",
    "--- End Four Pillars ---",
  ];

  return lines.join("\n");
}

/**
 * Lessons distilled from past sessions about *this* chart, and nothing else.
 *
 * `/api/chat/summarize` writes every row namespaced "<chart name> — <Category>",
 * and this reads back only that prefix. The strictness is the point: several
 * people's charts live in one `council_memory` table, and a reading assembled
 * from the wrong person's lessons would be wrong in a way that is very hard to
 * notice — it would simply sound confidently off. No chart name, no memory.
 *
 * The prefix is stripped on the way out so the model sees the five canonical
 * category names, which is also how the summarizer presents them.
 */
async function loadChartMemory(chartName: string | undefined) {
  const prefix = chartName?.trim() ? `${chartName.trim()} — ` : null;
  if (!prefix) return [];

  const rows = await prisma.councilMemory.findMany({
    where: { category: { startsWith: prefix } },
    orderBy: { category: "asc" },
  });

  return rows
    .filter((row) => row.content.trim())
    .map((row) => ({
      category: row.category.slice(prefix.length),
      content: row.content,
    }));
}

function buildChartBlock(chart: Chart): string {
  const lines: string[] = [
    "--- Chart Data ---",
    `Name: ${chart.name}`,
    `Born: ${chart.birth.date} at ${chart.birth.time} (${chart.birth.timezone})`,
    `Location: ${chart.birth.location} (${chart.birth.latitude.toFixed(4)}°, ${chart.birth.longitude.toFixed(4)}°)`,
    `Sun: ${chart.big3.sun}  ·  Moon: ${chart.big3.moon}  ·  Rising: ${chart.big3.rising}`,
    "",
  ];

  if (chart.placements.length > 0) {
    lines.push("Placements:");
    for (const p of chart.placements) {
      const retro = p.retrograde ? " ℞" : "";
      lines.push(`  ${p.body}: ${p.sign} ${p.degree} — House ${p.house}${retro}`);
    }
    lines.push("");
  }

  if (chart.houses.length > 0) {
    lines.push("House cusps:");
    for (const h of chart.houses) {
      lines.push(`  ${h.roman}: ${h.sign} ${h.degree}`);
    }
    lines.push("");
  }

  if (chart.aspects.length > 0) {
    lines.push("Aspects:");
    for (const a of chart.aspects) {
      lines.push(`  ${a.planet1} ${a.type} ${a.planet2} (orb ${a.orb.toFixed(2)}°)`);
    }
    lines.push("");
  }

  lines.push("--- End Chart Data ---");
  return lines.join("\n");
}

function buildPageContextBlock(ctx: Record<string, unknown>): string {
  // The page supplies a `_description` key for a human-readable label.
  const description = typeof ctx._description === "string" ? ctx._description : "Current page data";
  const data = { ...ctx };
  delete data._description;

  const lines: string[] = [
    `--- ${description} ---`,
    "The following data is exactly what the user can see on the current page.",
    "Use it as the ground truth for any questions about what is displayed.",
    "",
    JSON.stringify(data, null, 2),
    `--- End ${description} ---`,
  ];
  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "OPENROUTER_API not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json();
  const {
    messages = [],
    model: requestedModel,
    chart,
    pathname,
    pageContext,
    includeMemory,
    systems,
    sessionId,
    userMessage,
    messageOrder,
  } = body as {
    messages: { role: string; content: string }[];
    model?: string;
    chart?: Chart;
    pathname?: string;
    pageContext?: Record<string, unknown> | null;
    /** Chart Memory toggle. Off, or no chart, means no memory block at all. */
    includeMemory?: boolean;
    /** Which system(s) to put in front of the model. Defaults to both. */
    systems?: Systems;
    /** DB session id — if provided, the user message and assistant reply are persisted. */
    sessionId?: string;
    /** The raw user message text, saved before streaming begins. */
    userMessage?: string;
    /** Insertion order for the user message row (assistant = order + 1). */
    messageOrder?: number;
  };

  // Load persisted preferences — system prompt and optionally a saved model.
  const prefs = await prisma.interfacePreferences.findUnique({
    where: { id: "default" },
  });
  const savedPrompt = prefs?.systemPrompt ?? DEFAULT_INTERFACE_PROMPT;

  // Model: request body takes priority (user changed it in the modal),
  // then saved pref, then code default.
  const validIds = new Set(MODELS.map((m) => m.id));
  const model =
    requestedModel && validIds.has(requestedModel)
      ? requestedModel
      : (prefs?.model && validIds.has(prefs.model) ? prefs.model : DEFAULT_MODEL);

  // The output ceiling comes from the catalogue, the way /api/council/chat does
  // it, rather than the flat 1024 this route carried since the first build. That
  // number cut answers off mid-sentence as soon as a question needed more than
  // one placement explained. It is a ceiling and not a budget — an answer that
  // wants 300 tokens still costs 300 — so raising it changes nothing except
  // whether long answers are allowed to finish.
  const maxTokens = MODELS.find((m) => m.id === model)?.maxTokens ?? 4000;

  const memory = includeMemory ? await loadChartMemory(chart?.name) : [];

  // Which systems are on the table. Anything unrecognised falls back to both,
  // so an older client that sends nothing keeps the behaviour it had.
  const active: Systems =
    systems === "western" || systems === "chinese" ? systems : "both";
  const wantsWestern = active !== "chinese";
  const wantsChinese = active !== "western";

  // The four pillars need an ephemeris pass, so only compute them when asked.
  // A failure here must not take the whole chat down — the Western half is
  // still perfectly answerable without them.
  let chineseBlock = "";
  if (chart && wantsChinese) {
    try {
      chineseBlock = await buildChineseBlock(chart);
    } catch (error) {
      console.error("Failed to compute the four pillars for chat:", error);
    }
  }

  // Assemble the system message. Memory sits directly after the chart it
  // belongs to, so a lesson is never read apart from the placements it was
  // drawn from.
  const parts: string[] = [savedPrompt];
  if (chart && wantsWestern) parts.push("\n\n" + buildChartBlock(chart));
  if (chineseBlock) parts.push("\n\n" + chineseBlock);
  if (chart && active !== "both") {
    const on = active === "western" ? "Western" : "Chinese";
    const off = active === "western" ? "Chinese" : "Western";
    parts.push(
      [
        `\n\nOnly the ${on} system is attached for this conversation. Read from it alone.`,
        `If a question can only be answered from the ${off} system, say so plainly rather than guessing.`,
        // The page the user is looking at may itself display the other system —
        // /compare shows both by definition — and that data arrives separately,
        // below. Seeing it on screen is not permission to read from it.
        `The page data below may include ${off} material because that is what is on the user's screen. You may acknowledge it is there, but do not build the reading on it.`,
      ].join(" "),
    );
  }
  if (memory.length > 0) parts.push("\n\n" + buildMemoryBlock(memory));
  if (pathname) parts.push(`\nThe user is currently viewing: ${pathname}`);
  if (pageContext) parts.push("\n\n" + buildPageContextBlock(pageContext));

  const openRouterMessages = [
    { role: "system", content: parts.join("") },
    ...messages,
  ];

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://oddessi.app",
      "X-Title": "Oddessi",
    },
    body: JSON.stringify({
      model,
      messages: openRouterMessages,
      stream: true,
      max_tokens: maxTokens,
    }),
  });

  if (!upstream.ok) {
    const text = await upstream.text();
    return new Response(
      JSON.stringify({ error: `OpenRouter error: ${upstream.status}`, detail: text }),
      { status: upstream.status, headers: { "Content-Type": "application/json" } },
    );
  }

  // Persist user message immediately (before streaming so we never lose it).
  if (sessionId && userMessage && messageOrder !== undefined) {
    prisma.interfaceChatMessage
      .create({
        data: {
          sessionId,
          role: "user",
          content: userMessage,
          order: messageOrder,
        },
      })
      .catch(() => {/* non-fatal — streaming must not be blocked */ });
  }

  // Accumulate the full assistant reply so we can persist it after the stream.
  const shouldPersist = Boolean(sessionId && messageOrder !== undefined);
  let assistantContent = "";
  const assistantOrder = (messageOrder ?? 0) + 1;

  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const writer = writable.getWriter();

  // Pipe upstream → client, collecting the text in parallel.
  (async () => {
    const reader = upstream.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        await writer.write(value);

        if (shouldPersist) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") continue;
            try {
              const parsed = JSON.parse(payload) as {
                choices?: { delta?: { content?: string } }[];
              };
              assistantContent += parsed?.choices?.[0]?.delta?.content ?? "";
            } catch {
              /* malformed chunk — skip */
            }
          }
        }
      }
    } finally {
      await writer.close().catch(() => {/* already closed */ });

      if (shouldPersist && assistantContent) {
        prisma.interfaceChatMessage
          .create({
            data: {
              sessionId: sessionId!,
              role: "assistant",
              content: assistantContent,
              order: assistantOrder,
            },
          })
          .catch(() => {/* non-fatal */ });
      }
    }
  })();

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
