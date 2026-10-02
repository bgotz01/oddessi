import { NextRequest } from "next/server";
import { MODELS, PARADIGM_DEFAULT_MODEL, CRITIC_DEFAULT_MODEL } from "@/lib/models";
import { MARKETS_PLUTO_ERAS, type MarketsPlutoEra } from "@/lib/industry/markets-pluto-eras-data";
import {
  INVERSION_COLUMNS,
  VERDICTS,
  type InversionColumn,
  type InversionCritique,
  type InversionResult,
  type InversionRow,
} from "@/lib/industry/markets-pluto-inversion";

/**
 * POST /api/industry/pluto-inversion
 *
 * Body: { stage: "invert", model? } | { stage: "critique", model?, rows }
 *
 * Two stages, two models, one route. "invert" takes the paradigm-defining
 * characteristics of Pluto in Capricorn and turns each one over into its
 * Aquarian counterpart. "critique" reads those rows back and grades them —
 * run on a separate model so the judge is not marking its own homework.
 *
 * Both return JSON rather than streamed markdown: the page attaches each
 * critique to its row and applies modifications column by column, which needs
 * structure a markdown table cannot be trusted to keep.
 */

type Stage = "invert" | "critique";

const era = (sign: string) => MARKETS_PLUTO_ERAS.find((e) => e.sign === sign)!;

function eraBlock(e: MarketsPlutoEra): string {
  const list = (items: readonly string[]) => items.map((i) => `  - ${i}`).join("\n");
  return [
    `--- Pluto in ${e.sign} (${e.startYear}–${e.endYear})${e.hypothesis ? " · HYPOTHESIS, not a finding" : ""} ---`,
    `Headline: ${e.headline}`,
    `Archetype: ${e.archetype}`,
    `Theme: ${e.theme}`,
    `Tagline: ${e.tagline}`,
    `Interpretation:\n${list(e.interpretation)}`,
    `Market signature:\n${list(e.marketSignature)}`,
    `Manifestations:\n${list(e.manifestations.map((m) => (m.layer ? `${m.layer}: ${m.title}` : m.title)))}`,
    `Catalysts:\n${list(e.catalysts.map((c) => `${c.period ?? c.year} — ${c.title}: ${c.description.join("; ")}`))}`,
    `Shadow:\n${list(e.shadow)}`,
    `Transition:\n${list(e.transition)}`,
    `--- End ${e.sign} ---`,
  ].join("\n");
}

const FRAME = `Pluto, applied to capital markets, measures how capital is organized into power: who or what controls the price, direction and availability of capital, and through what structure. It does not measure activity, sentiment, distribution technology or asset performance — those belong to other planets.`;

const INVERT_PROMPT = `You are building the Pluto Inversion for a markets research page.

${FRAME}

Task: take the paradigm-defining characteristics of the Capricorn era (2008–2024) and invert each into the form it would take under Aquarius (2024–2044). Capricorn is hierarchy, a single institution, top-down rules, scarcity managed from the centre. Aquarius is networks, peers, protocols, distributed rules, the collective and the unexpected. An inversion is not a synonym swap or an "opposite for its own sake": it is what the same function of power becomes when the organizing principle flips.

Work from the Capricorn data below. Pick the 6–8 characteristics that actually define the paradigm (not incidental events), and for each give the inversion. Then give 3–5 predictions, each testable against 2024–2044 markets.

Respond with JSON only, exactly this shape:
{"rows":[{"capricorn":"short fragment","aquarius":"short fragment","why":"one short fragment"}],"predictions":["fragment"]}

Rules:
- Fragments, not sentences. No hedging filler.
- Every row must answer Pluto's question (organization of power over capital). If an inversion describes activity or technology rather than power, drop it.
- Aquarius is a hypothesis. Do not state any inversion as established fact; the existing Aquarius draft below is a proposal you may agree with or depart from.`;

const CRITIQUE_PROMPT = `You are a sceptical reviewer of an astrological markets thesis.

${FRAME}

You are given the Capricorn era data, the current Aquarius draft, and a numbered list of proposed inversion rows. Each row has three columns: "capricorn" (the trait), "aquarius" (its inversion), "why" (the reasoning). Grade every row.

For each row give:
- verdict: "strong", "promising" or "unconvincing"
- objection: the single strongest objection, one short fragment
- explanation: 1–3 sentences on why the modification fixes the objection
- modification: replacement text for ONLY the columns that should change. Omit columns that are fine. A "strong" row may have an empty modification.

Check especially for category errors: a row that answers the wrong planet's question (activity, sentiment, distribution, technology rather than power over capital) is "unconvincing", and its modification must restate it in terms of power.

Respond with JSON only, exactly this shape:
{"critiques":[{"row":0,"verdict":"promising","objection":"fragment","explanation":"sentences","modification":{"aquarius":"fragment","why":"fragment"}}]}

Keep the same fragment style as the rows. Be specific and unsparing. Do not praise. Do not soften a verdict because the row is plausible-sounding.`;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Models wrap JSON in fences or preamble often enough to strip both. */
function parseJson(text: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("No JSON in model reply");
  return JSON.parse(text.slice(start, end + 1));
}

function readInversion(raw: unknown): InversionResult {
  const obj = raw as { rows?: unknown[]; predictions?: unknown[] };
  const rows = (obj.rows ?? [])
    .map((r) => {
      const row = r as Record<string, unknown>;
      return { capricorn: str(row.capricorn), aquarius: str(row.aquarius), why: str(row.why) };
    })
    .filter((r) => r.capricorn && r.aquarius);
  if (rows.length === 0) throw new Error("Model returned no rows");
  return { rows, predictions: (obj.predictions ?? []).map(str).filter(Boolean) };
}

function readCritiques(raw: unknown, rowCount: number): InversionCritique[] {
  const obj = raw as { critiques?: unknown[] };
  return (obj.critiques ?? []).flatMap((c) => {
    const item = c as Record<string, unknown>;
    const row = Number(item.row);
    const verdict = str(item.verdict).toLowerCase() as InversionCritique["verdict"];
    if (!Number.isInteger(row) || row < 0 || row >= rowCount || !VERDICTS.includes(verdict)) return [];
    const mod = (item.modification ?? {}) as Record<string, unknown>;
    const modification: Partial<Record<InversionColumn, string>> = {};
    for (const col of INVERSION_COLUMNS) if (str(mod[col])) modification[col] = str(mod[col]);
    return [{ row, verdict, objection: str(item.objection), explanation: str(item.explanation), modification }];
  });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API;
  if (!apiKey) {
    return Response.json({ error: "OPENROUTER_API not set" }, { status: 500 });
  }

  const { stage, model: requestedModel, rows } = (await req.json()) as {
    stage?: Stage;
    model?: string;
    rows?: InversionRow[];
  };

  if (stage !== "invert" && stage !== "critique") {
    return Response.json({ error: "stage must be invert or critique" }, { status: 400 });
  }
  if (stage === "critique" && !(Array.isArray(rows) && rows.length > 0)) {
    return Response.json({ error: "critique needs inversion rows" }, { status: 400 });
  }

  // Custom models from ModelSelect are not in the catalogue, so accept any
  // provider/model id, the way /api/council/chat does.
  const model =
    typeof requestedModel === "string" && /^[\w.-]+\/[\w.:-]+$/.test(requestedModel)
      ? requestedModel
      : stage === "invert" ? PARADIGM_DEFAULT_MODEL : CRITIC_DEFAULT_MODEL;
  const maxTokens = MODELS.find((m) => m.id === model)?.maxTokens ?? 4000;

  const data = [eraBlock(era("Capricorn")), eraBlock(era("Aquarius"))].join("\n\n");
  const messages =
    stage === "invert"
      ? [
          { role: "system", content: `${INVERT_PROMPT}\n\n${data}` },
          { role: "user", content: "Invert the Capricorn paradigm into Aquarius." },
        ]
      : [
          { role: "system", content: `${CRITIQUE_PROMPT}\n\n${data}` },
          { role: "user", content: `The proposed inversion rows:\n\n${JSON.stringify(rows!.map((r, i) => ({ row: i, ...r })), null, 2)}` },
        ];

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://oddessi.app",
      "X-Title": "Oddessi",
    },
    body: JSON.stringify({ model, messages, max_tokens: maxTokens, response_format: { type: "json_object" } }),
    signal: req.signal,
  });

  if (!upstream.ok) {
    const detail = await upstream.text();
    return Response.json({ error: `OpenRouter error: ${upstream.status}`, detail }, { status: upstream.status });
  }

  const completion = (await upstream.json()) as { choices?: { message?: { content?: string } }[] };
  const content = completion.choices?.[0]?.message?.content ?? "";

  try {
    const parsed = parseJson(content);
    return stage === "invert"
      ? Response.json(readInversion(parsed))
      : Response.json({ critiques: readCritiques(parsed, rows!.length) });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unreadable model reply", detail: content },
      { status: 502 },
    );
  }
}
