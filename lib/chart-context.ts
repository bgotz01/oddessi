import type { Chart } from "@/lib/charts";
import { fetchCyclesForPrompt, type PromptCycle } from "@/lib/astro-cycles";

/**
 * The chart under study, rendered as a system-prompt block for the council.
 *
 * Deliberately not the same builder as `/api/chat`'s `buildChartContext`. That
 * one is a whole persona — "answer as though speaking directly to this person"
 * — because the Interface has no voice of its own. Each council seat already
 * has a persona, so this block is data and nothing else: measurements, framed
 * the same way page references and memory are, and left for the seats to read.
 */
export function buildChartBlock(chart: Chart): string {
  const lines: string[] = [
    "─── THE CHART UNDER STUDY ──────────────────────────────────────────────────",
    `These are the measurements for ${chart.name}. Every question in this session is`,
    "about this chart. Cite placements exactly — body, sign, degree, house, orb —",
    "and never answer with generic astrology when the chart itself can be read.",
    "",
    `Born: ${chart.birth.date} at ${chart.birth.time} (${chart.birth.timezone})`,
    `Location: ${chart.birth.location} (${chart.birth.latitude.toFixed(4)}°, ${chart.birth.longitude.toFixed(4)}°)`,
    "",
    `Sun: ${chart.big3.sun}  ·  Moon: ${chart.big3.moon}  ·  Rising: ${chart.big3.rising}`,
    "",
  ];

  if (chart.placements.length > 0) {
    lines.push("Placements:");
    for (const p of chart.placements) {
      lines.push(
        `  ${p.body}: ${p.sign} ${p.degree} — House ${p.house}${p.retrograde ? " ℞" : ""}`,
      );
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

  lines.push(
    "─── END OF CHART ───────────────────────────────────────────────────────────",
  );

  return lines.join("\n");
}

// ─── Transits ────────────────────────────────────────────────────────────────

/**
 * Whole years elapsed between two ISO dates. The reader thinks in ages, not in
 * calendar years, and a date twenty years out is unreadable without one.
 */
function ageAt(birthISO: string, dateISO: string): number | null {
  const birth = Date.parse(birthISO.slice(0, 10));
  const at = Date.parse(dateISO);
  if (!Number.isFinite(birth) || !Number.isFinite(at)) return null;
  return Math.floor((at - birth) / (365.2425 * 24 * 60 * 60 * 1000));
}

/**
 * The transits, as a system-prompt block.
 *
 * Shared by both chat surfaces, unlike `buildChartBlock` above — that one is
 * split in two because the Interface has to speak in a voice and the council
 * seats already have their own. This block has no voice to differ over. It is
 * dates.
 *
 * It exists because for a long time neither surface had it. The natal block is
 * everything frozen at birth, so a model asked when Saturn next reaches a
 * placement had no dates in front of it at all and correctly said it could not
 * answer — while the exact dates and every retrograde pass sat in
 * `life_cycle_cache`, already computed, two pages away.
 *
 * Rows are grouped by planet and chronological inside each group, which serves
 * both readings: a planet's arc across the life, and the ordinary "when does
 * this one happen" that only needs the line.
 */
export async function buildTransitBlock(
  chartId: string,
  birthISO: string,
): Promise<string> {
  // No id, no claim. An empty string drops the block entirely, which is not
  // the same statement as the one below — "this chart has no cached transits"
  // is a fact about the chart, and asserting it because a caller forgot to
  // send an id would be a lie the model then repeats.
  if (!chartId) return "";

  const cycles = await fetchCyclesForPrompt(chartId);
  const asOf = new Date().toISOString().slice(0, 10);

  if (cycles.length === 0) {
    return [
      "--- Transits ---",
      "NOT AVAILABLE. This chart has no cached transits — the Swiss Ephemeris",
      "pass has never been run for it, or was run and failed. This is an absence",
      "of data and not an absence of transits. Say the dates have not been",
      "calculated for this chart; never estimate one to fill the gap.",
      "--- End Transits ---",
    ].join("\n");
  }

  const byPlanet = new Map<string, PromptCycle[]>();
  for (const c of cycles) {
    const list = byPlanet.get(c.planet);
    if (list) list.push(c);
    else byPlanet.set(c.planet, [c]);
  }

  // Widest label in the whole block, so every planet's column lines up with
  // every other planet's and a scan down the dates never has to re-find them.
  const pad = Math.max(...cycles.map((c) => c.what.length));

  const lines: string[] = [
    "--- Transits ---",
    "Transiting positions against this natal chart, computed with Swiss",
    "Ephemeris and cached. These are REAL DATES. Quote them; never estimate a",
    "date, never round one to its year, and never reason from a planet's orbital",
    "period about when a contact ought to fall — a retrograde routinely moves a",
    "contact by the better part of a year, which is exactly what the re-entries",
    "below record.",
    "",
    "A window is the whole stretch a transit spends inside orb. `exact` is the",
    "moment of exactness within it. A `re-entry` is a retrograde pass back into",
    "orb after the planet had already left: the first direct pass runs from the",
    "window's start, the planet moves off, turns, and returns. Two- and",
    "three-pass transits are ordinary, and the re-entries ARE those later",
    "contacts — not a restatement of the window.",
    "",
    "Aspects are computed against the Sun, Moon, Mercury, Venus, Mars, the North",
    "Node, the Ascendant and the Midheaven. Nothing else is a target: no other",
    "body, no house ruler, no midpoint. Asked about one of those, say it has not",
    "been computed rather than working it out.",
    "",
    "ALL FOUR ANGLES ARE COVERED, by two rows instead of four. An angle is one",
    "end of an axis, so a contact to one end is the same instant as the mirror",
    "contact to the other — the Descendant and Imum Coeli are not missing, they",
    "are the rows below read from the far side. Translate, do not estimate:",
    "",
    "  conjunction Midheaven  = opposition Imum Coeli   → public standing, vocation",
    "  opposition  Midheaven  = conjunction Imum Coeli  → home, roots, private life",
    "  square      Midheaven  = square Imum Coeli       → across both; neither end alone",
    "  conjunction Ascendant  = opposition Descendant   → self-presentation, bearing",
    "  opposition  Ascendant  = conjunction Descendant  → partnership, the other",
    "  square      Ascendant  = square Descendant       → across both",
    "",
    "So a question about home, family or private life is answered from the",
    "OPPOSITION rows to the Midheaven, and one about partnership from the",
    "opposition rows to the Ascendant — same dates, other end. Name the end you",
    "are reading, because the two ends of an axis mean opposite things and the",
    "dates cannot tell them apart.",
    "",
    "The two angles depend on the birth TIME in a way nothing else here does —",
    "the Midheaven moves about a degree every four minutes. If the time on this",
    "chart was rounded, remembered or guessed, its angles are wrong by degrees",
    "and these dates are wrong by months, while still looking exact. Quote angle",
    "dates as confidently as the rest ONLY if the birth time is exact; otherwise",
    "say what they depend on.",
    "",
    "Jupiter is carried for the near term only — roughly two years back and five",
    "ahead. The four slow planets are carried for the whole cached span. A",
    "Jupiter contact missing from this list is outside that window, not absent",
    "from the life.",
    "",
    "`significance` is the calculator's own label. It is not a magnitude and not",
    "a ranking: never say one transit will be bigger, harder or more important",
    "than another because its label reads higher.",
    "",
    `Ages are this chart's own. ▸ marks a transit in force as of ${asOf}.`,
    "",
  ];

  for (const [planet, rows] of byPlanet) {
    const span = `${rows[0].start.slice(0, 4)}–${rows
      .map((r) => r.end)
      .sort()
      .at(-1)!
      .slice(0, 4)}`;
    lines.push(`${planet} — ${rows.length} contacts, ${span}`);

    for (const r of rows) {
      const age = ageAt(birthISO, r.start);
      // Re-entries ride on the transit's own line rather than under it. Given
      // one line each they outnumbered the transits roughly two to one and
      // spent most of their width on indentation — the same facts at three
      // times the size, in the one block that pays for its width on every
      // message.
      const passes = r.reentries
        .map((re) => `${re.start}→${re.end}`)
        .join(", ");
      lines.push(
        [
          r.status === "active" ? "  ▸ " : "    ",
          r.what.padEnd(pad),
          `  ${r.start} → ${r.end}`,
          r.peak ? `  exact ${r.peak}` : "",
          age === null ? "" : `  age ${age}`,
          `  ${r.significance}`,
          passes ? `  re-entry ${passes}` : "",
        ].join(""),
      );
    }
    lines.push("");
  }

  lines.push("--- End Transits ---");
  return lines.join("\n");
}
