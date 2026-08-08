import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Chart } from "@/lib/charts";
import { MODELS, DEFAULT_MODEL } from "@/lib/models";
import { DEFAULT_INTERFACE_PROMPT } from "@/lib/interface-prefs";

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
 */

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

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "OPENROUTER_API not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json();
  const { messages = [], model: requestedModel, chart, pathname } = body as {
    messages: { role: string; content: string }[];
    model?: string;
    chart?: Chart;
    pathname?: string;
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

  // Assemble the system message.
  const parts: string[] = [savedPrompt];
  if (chart) parts.push("\n\n" + buildChartBlock(chart));
  if (pathname) parts.push(`\nThe user is currently viewing: ${pathname}`);

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
      max_tokens: 1024,
    }),
  });

  if (!upstream.ok) {
    const text = await upstream.text();
    return new Response(
      JSON.stringify({ error: `OpenRouter error: ${upstream.status}`, detail: text }),
      { status: upstream.status, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
