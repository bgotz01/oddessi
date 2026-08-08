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
  };
}

export interface ActiveCycle {
  band: Band;
  planet: string;
  house: string;
  houseNumber: number | null;
  significance: string;
  start: string;
  end: string;
}

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

  const cycles: ActiveCycle[] = [];

  for (const planet of PLANET_NAMES) {
    // Rows are start-descending, so the first match is the current house.
    const row = rows.find((r) => r.planet === planet);
    if (!row) continue;
    cycles.push({
      band: toBand(row),
      planet,
      house: subtitleFor(row),
      houseNumber: row.houseNumber,
      significance: row.significance,
      start: iso(row.startDate),
      end: iso(row.endDate),
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
