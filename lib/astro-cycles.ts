import { prisma } from "@/lib/db";
import type { Band, Segment } from "@/lib/band";
import { PLANET_NAMES, planetColor, planetGlyph } from "@/lib/planets";

/**
 * Real planetary cycles, read from the `life_cycle_cache` table that arc
 * already computed with Swiss Ephemeris. No ephemeris port needed — the maths
 * is done, this just reshapes it.
 *
 * Stored `interpretation` looks like:
 *   { initialEnd: ISO, retrogradePeriods: [{ startDate, endDate }, …] }
 * which is what lets the timeline draw the retrograde gaps.
 */

export type CycleType = "house-transit" | "aspect-cycle" | "planetary-return";

const ROMAN = [
  "I", "II", "III", "IV", "V", "VI",
  "VII", "VIII", "IX", "X", "XI", "XII",
];

const ASPECT_GLYPH: Record<string, string> = {
  Conjunction: "☌",
  Opposition: "☍",
  Square: "□",
  Trine: "△",
  Sextile: "✶",
};

interface Interpretation {
  initialEnd?: string;
  retrogradePeriods?: Array<{ startDate?: string; endDate?: string }>;
}

function iso(d: Date | string): string {
  return (typeof d === "string" ? new Date(d) : d).toISOString().slice(0, 10);
}

/**
 * Reconstruct in-effect stretches: the first direct pass runs from `start` to
 * `initialEnd`, then each retrograde period is a re-entry. Falls back to one
 * unbroken segment when the source has no retrograde detail.
 */
function buildSegments(
  start: Date,
  end: Date,
  interpretation: unknown,
): Segment[] {
  const interp = (interpretation ?? {}) as Interpretation;
  const retro = (interp.retrogradePeriods ?? []).filter(
    (r): r is { startDate: string; endDate: string } =>
      Boolean(r?.startDate && r?.endDate),
  );

  if (!interp.initialEnd || retro.length === 0) {
    return [{ start: iso(start), end: iso(end) }];
  }

  const segments: Segment[] = [
    { start: iso(start), end: iso(interp.initialEnd) },
    ...retro.map((r) => ({ start: iso(r.startDate), end: iso(r.endDate) })),
  ];

  return segments
    .filter((s) => Date.parse(s.end) > Date.parse(s.start))
    .sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
}

interface Row {
  id: string;
  planet: string;
  type: string;
  houseNumber: number | null;
  natalPlanet: string | null;
  aspectType: string | null;
  startDate: Date;
  endDate: Date;
  peakDate: Date | null;
  significance: string;
  interpretation: unknown;
}

function subtitleFor(row: Row): string {
  if (row.type === "planetary-return") return "Return";
  if (row.type === "aspect-cycle" && row.natalPlanet && row.aspectType) {
    const glyph = ASPECT_GLYPH[row.aspectType] ?? "";
    return `${glyph} ${row.aspectType} ${row.natalPlanet}`.trim();
  }
  if (row.type === "house-transit" && row.houseNumber) {
    return `House ${row.houseNumber}`;
  }
  return row.type;
}

function toBand(row: Row): Band {
  return {
    id: row.id,
    glyph: planetGlyph(row.planet),
    title: row.planet,
    subtitle: subtitleFor(row),
    start: iso(row.startDate),
    end: iso(row.endDate),
    peak: row.peakDate ? iso(row.peakDate) : undefined,
    segments: buildSegments(row.startDate, row.endDate, row.interpretation),
    significance: row.significance,
    color: planetColor(row.planet),
    // Carried through structurally so a consumer never has to read a band's
    // identity back out of the label it displays.
    kind: row.type as CycleType,
    houseNumber: row.houseNumber ?? undefined,
    natalPlanet: row.natalPlanet ?? undefined,
    aspectType: row.aspectType ?? undefined,
  };
}

/**
 * A house the planet has not reached yet.
 *
 * Houses are contiguous sectors of the ecliptic in order, so the sequence is
 * never in doubt — after the fifth comes the sixth, and the cache bears that
 * out for every planet. What is not derivable is the DATE, because a retrograde
 * can hold a planet at a cusp for the better part of a year and the two
 * transits then overlap in the cache. So the house number is not what this
 * carries; the ingress is.
 */
export interface UpcomingTransit {
  house: string;
  houseNumber: number | null;
  start: string;
  end: string;
  significance: string;
}

export interface ActiveCycle {
  band: Band;
  planet: string;
  house: string;
  houseNumber: number | null;
  significance: string;
  start: string;
  end: string;
  /** True when the planet is between houses and this is the next upcoming transit. */
  upcoming?: boolean;
  /**
   * The houses this planet enters after the one above, soonest first.
   *
   * The page shows the first of them and the rest travel in the page context,
   * so that "which cycle comes next" is answerable from the Cycles page itself
   * rather than only from the explorer.
   */
  next: UpcomingTransit[];
}

/**
 * How far ahead to look per planet. Three is a real horizon for Jupiter (about
 * three years) and an absurd one for Pluto (about three centuries), which is
 * the right asymmetry: the question "what comes next" is asked about the fast
 * planets, and for the slow ones one entry already outlives the asker.
 */
const AHEAD_PER_PLANET = 3;

/**
 * The headline view: the house each slow planet is currently moving through —
 * one per planet, five in total.
 *
 * Aspect cycles are excluded on purpose. They are numerous, short, and answer a
 * different question ("what is being triggered right now") than the one this
 * page asks ("what long season am I in"). They live in the explorer instead.
 *
 * Where retrogrades make two house transits overlap, the later-starting one is
 * the planet's current house.
 *
 * A planet is always in a house. When no row covers now, the calculator
 * recorded a retrograde gap — Jupiter briefly re-crossed a cusp and was stored
 * as two transits with a short void. We fill the gap by showing the
 * just-ended transit (≤ 30 days ago) as still current, falling back to the
 * next upcoming transit only if the gap is longer than that.
 */
export async function fetchActiveHouseTransits(
  chartId: string,
): Promise<{ cycles: ActiveCycle[]; windowStart: string; windowEnd: string }> {
  const now = new Date();

  const rows = (await prisma.lifeCycleCache.findMany({
    where: {
      chartId,
      type: "house-transit",
      planet: { in: PLANET_NAMES },
      startDate: { lte: now },
      endDate: { gte: now },
    },
    orderBy: [{ startDate: "desc" }],
  })) as unknown as Row[];

  // A planet is always in a house. When a planet has no active row it means
  // the calculator recorded a short gap: Jupiter went retrograde, briefly
  // re-crossed a cusp, and was stored as two separate transits with a void
  // between them. Fill the gap by preferring the just-ended transit (the
  // planet is still effectively there) when it ended within 30 days; otherwise
  // show the imminent next transit.
  const missingPlanets = PLANET_NAMES.filter(
    (p) => !rows.some((r) => r.planet === p),
  );

  // Everything still ahead, for every planet — not only the ones with a gap to
  // fill. One query answers both questions: which house a planet caught between
  // two is about to enter, and what follows the house each planet is in now.
  const futureRows = (await prisma.lifeCycleCache.findMany({
    where: {
      chartId,
      type: "house-transit",
      planet: { in: PLANET_NAMES },
      startDate: { gt: now },
    },
    orderBy: [{ startDate: "asc" }],
  })) as unknown as Row[];

  const recentlyEndedRows: Row[] =
    missingPlanets.length > 0
      ? ((await prisma.lifeCycleCache.findMany({
        where: {
          chartId,
          type: "house-transit",
          planet: { in: missingPlanets },
          endDate: { lt: now },
        },
        orderBy: [{ endDate: "desc" }],
      })) as unknown as Row[])
      : [];

  const prevByPlanet = new Map<string, Row>();
  for (const row of recentlyEndedRows) {
    if (!prevByPlanet.has(row.planet)) prevByPlanet.set(row.planet, row);
  }
  const nextByPlanet = new Map<string, Row>();
  for (const row of futureRows) {
    if (!nextByPlanet.has(row.planet)) nextByPlanet.set(row.planet, row);
  }

  const GAP_THRESHOLD_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

  const cycles: ActiveCycle[] = [];

  for (const planet of PLANET_NAMES) {
    const activeRow = rows.find((r) => r.planet === planet);

    let row: Row | undefined = activeRow;
    let upcoming = false;

    if (!row) {
      const prev = prevByPlanet.get(planet);
      const next = nextByPlanet.get(planet);
      const gapFromPrev = prev
        ? now.getTime() - prev.endDate.getTime()
        : Infinity;
      // Prefer the just-ended transit when the gap is short (retrograde gap).
      if (prev && gapFromPrev <= GAP_THRESHOLD_MS) {
        row = prev;
      } else {
        row = next;
        upcoming = !!next;
      }
    }

    if (!row) continue;

    // Anything that begins after the transit shown. Keyed off the shown row's
    // start rather than off `now`, because the two differ in both odd cases:
    // a planet held at a cusp has a later-starting row already running, and a
    // planet in a retrograde gap is being shown a row that has not begun.
    const shownStart = row.startDate.getTime();
    const ahead = futureRows
      .filter(
        (r) => r.planet === planet && r.startDate.getTime() > shownStart,
      )
      .slice(0, AHEAD_PER_PLANET);

    cycles.push({
      band: toBand(row),
      planet,
      house: subtitleFor(row),
      houseNumber: row.houseNumber,
      significance: row.significance,
      start: iso(row.startDate),
      end: iso(row.endDate),
      upcoming: upcoming || undefined,
      next: ahead.map((r) => ({
        house: subtitleFor(r),
        houseNumber: r.houseNumber,
        start: iso(r.startDate),
        end: iso(r.endDate),
        significance: r.significance,
      })),
    });
  }

  // Frame the axis around the cycles actually shown, with a little air.
  const starts = cycles.map((c) => Date.parse(c.start));
  const ends = cycles.map((c) => Date.parse(c.end));
  const windowStart = starts.length
    ? iso(new Date(Math.min(...starts)))
    : iso(now);
  const windowEnd = ends.length ? iso(new Date(Math.max(...ends))) : iso(now);

  return { cycles, windowStart, windowEnd };
}

export interface ExplorerFilters {
  planets?: string[];
  types?: CycleType[];
  lookbackYears?: number;
  lookaheadYears?: number;
}

/** Everything, for the explorer. Filtered server-side to keep payloads sane. */
export async function fetchAllCycles(
  chartId: string,
  filters: ExplorerFilters = {},
): Promise<{ bands: Band[]; windowStart: string; windowEnd: string }> {
  const {
    planets = PLANET_NAMES,
    types = ["house-transit", "aspect-cycle", "planetary-return"],
    lookbackYears = 20,
    lookaheadYears = 25,
  } = filters;

  const now = new Date();
  const windowStart = new Date(now);
  windowStart.setFullYear(windowStart.getFullYear() - lookbackYears);
  const windowEnd = new Date(now);
  windowEnd.setFullYear(windowEnd.getFullYear() + lookaheadYears);

  const rows = (await prisma.lifeCycleCache.findMany({
    where: {
      chartId,
      planet: { in: planets },
      type: { in: types },
      startDate: { lte: windowEnd },
      endDate: { gte: windowStart },
    },
    orderBy: [{ startDate: "asc" }],
  })) as unknown as Row[];

  return {
    bands: rows.map(toBand),
    windowStart: iso(windowStart),
    windowEnd: iso(windowEnd),
  };
}

// ─── The chat's view ─────────────────────────────────────────────────────────
//
// Everything above is read by a page and drawn. This last section is read by
// the language model instead, which changes what "everything" is allowed to
// mean: a page renders what fits on screen and lets the reader scroll, whereas
// a system prompt is rebuilt on every message and pays for each row forever.

/**
 * Jupiter's horizon, in years either side of now.
 *
 * The four slow planets are carried for the whole cached span. Jupiter is not,
 * and this is the same argument `activation-windows.ts` makes when it refuses
 * to let Jupiter grade a season: it touches something every few months, so
 * across a life it accounts for well over half the cache — 277 rows of 477 on
 * the chart this was sized against — while saying almost nothing about which
 * stretches matter. Carried near-term it answers "what is opening this year",
 * which is a real question. Carried for ninety years it is bulk.
 */
const JUPITER_BACK_YEARS = 2;
const JUPITER_AHEAD_YEARS = 5;

const LIFELONG_PLANETS = ["Saturn", "Uranus", "Neptune", "Pluto"];

/**
 * Reading order for the block, which is not the order the query returns.
 *
 * Sorting by first contact makes the sequence an accident of which planet
 * happened to touch something earliest in this particular life, so the same
 * block changes shape from chart to chart for no reason a reader could use.
 * Jupiter sits last because it is the one carried on a window rather than for
 * the whole span, and the section it heads is a different claim from the four
 * above it.
 */
export const PROMPT_PLANET_ORDER = [...LIFELONG_PLANETS, "Jupiter"];

export interface PromptCycle {
  planet: string;
  kind: CycleType;
  /** What is being touched: "☌ Sun", "House 7", "Return". */
  what: string;
  start: string;
  end: string;
  /** The moment of exactness. Absent on house transits, which have no peak. */
  peak?: string;
  /**
   * Retrograde re-entries — the passes back into orb after the planet first
   * left it. The first direct pass is `start`→ the first re-entry's start, so
   * these are the extra contacts and not a restatement of the window.
   */
  reentries: Array<{ start: string; end: string }>;
  significance: string;
  status: "completed" | "active" | "upcoming";
}

/**
 * The label `subtitleFor` builds, minus the glyph.
 *
 * On a timeline the glyph is the fast read and the word beside it is the
 * caption. In a prompt there is no fast read, so "☌ Conjunction Mercury" is
 * just the same word twice — once in a form the model has to decode.
 */
function promptLabel(row: Row): string {
  if (row.type === "planetary-return") return "Return";
  if (row.type === "aspect-cycle" && row.natalPlanet && row.aspectType) {
    return `${row.aspectType} ${row.natalPlanet}`;
  }
  if (row.type === "house-transit" && row.houseNumber) {
    return `House ${row.houseNumber}`;
  }
  return row.type;
}

/** Status from the dates, never from the stored column. */
function statusAt(start: Date, end: Date, now: Date): PromptCycle["status"] {
  if (now < start) return "upcoming";
  if (now > end) return "completed";
  return "active";
}

/**
 * The cached transits for one chart, shaped for a system prompt.
 *
 * Reads the same `life_cycle_cache` rows the Cycles pages draw from, so the
 * chat and the timeline can never disagree about a date. Nothing is computed
 * here; the ephemeris pass already happened.
 */
export async function fetchCyclesForPrompt(
  chartId: string,
): Promise<PromptCycle[]> {
  const now = new Date();
  const jupiterFrom = new Date(now);
  jupiterFrom.setFullYear(jupiterFrom.getFullYear() - JUPITER_BACK_YEARS);
  const jupiterTo = new Date(now);
  jupiterTo.setFullYear(jupiterTo.getFullYear() + JUPITER_AHEAD_YEARS);

  const rows = (await prisma.lifeCycleCache.findMany({
    where: {
      chartId,
      OR: [
        { planet: { in: LIFELONG_PLANETS } },
        {
          planet: "Jupiter",
          startDate: { lte: jupiterTo },
          endDate: { gte: jupiterFrom },
        },
      ],
    },
    orderBy: [{ startDate: "asc" }],
  })) as unknown as Row[];

  const rank = (planet: string) => {
    const i = PROMPT_PLANET_ORDER.indexOf(planet);
    return i === -1 ? PROMPT_PLANET_ORDER.length : i;
  };

  return rows
    .sort(
      (a, b) =>
        rank(a.planet) - rank(b.planet) ||
        a.startDate.getTime() - b.startDate.getTime(),
    )
    .map((row) => {
    const segments = buildSegments(row.startDate, row.endDate, row.interpretation);
    return {
      planet: row.planet,
      kind: row.type as CycleType,
      what: promptLabel(row),
      start: iso(row.startDate),
      end: iso(row.endDate),
      peak: row.peakDate ? iso(row.peakDate) : undefined,
      reentries: segments.slice(1),
      significance: row.significance,
      status: statusAt(row.startDate, row.endDate, now),
    };
  });
}
