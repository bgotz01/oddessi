/**
 * The macro layer — the sky nobody owns.
 *
 * Every other Western page reads a birth chart. This one does not: the outer
 * planets are where they are for everyone alive at once, and the cycles they
 * cut are measured in decades and centuries. So there is no `chartId` in here
 * and no cache table behind it. Two things are assembled:
 *
 *   1. The current sky — the five slow bodies' real longitudes, from Swiss
 *      Ephemeris, for right now. Server-only; the native binary cannot be
 *      bundled for the client (see `serverExternalPackages` in next.config).
 *   2. The cycles in force — each one's span, how far through it we are, and
 *      the interpretive record behind it.
 *
 * The *structure* is computed: spans are parsed from the source timeframes,
 * progress from the clock, phase from progress. Only the interpretation is
 * held as data, in `lib/astrology/macro/*`, ported from arc.
 */

import * as swisseph from "swisseph-v2";
import { bodyColor } from "@/lib/bodies";
import { bodyGlyph, signGlyph, signMeta, type SignElement } from "@/lib/symbols";
import {
  getSkyPlacementMeaning,
  type SkyPlacementMeaning,
} from "@/lib/astrology/macro/sky-placements-data";

import { PLUTO_ERAS } from "@/lib/astrology/macro/pluto-eras-data";
import { NEPTUNE_CYCLES } from "@/lib/astrology/macro/neptune-cycles-data";
import { URANUS_ERAS } from "@/lib/astrology/macro/uranus-eras-data";
import {
  JUPITER_SATURN_CYCLES,
  getJupiterSaturnYearsIntoCycle,
} from "@/lib/astrology/macro/jupiter-saturn-cycles-data";
import {
  SATURN_PLUTO_CONJUNCTIONS,
  getSaturnPlutoYearsIntoCycle,
} from "@/lib/astrology/macro/saturn-pluto-cycles-data";
import {
  URANUS_PLUTO_MILESTONES,
  MILESTONE_MEANINGS as URANUS_PLUTO_MEANINGS,
  PREVIOUS_CYCLE as URANUS_PLUTO_PREVIOUS_CYCLE,
} from "@/lib/astrology/macro/uranus-pluto-cycles-data";
import {
  NEPTUNE_PLUTO_MILESTONES,
  MILESTONE_MEANINGS as NEPTUNE_PLUTO_MEANINGS,
  CURRENT_CYCLE as NEPTUNE_PLUTO_CYCLE,
  PREVIOUS_CYCLE as NEPTUNE_PLUTO_PREVIOUS_CYCLE,
} from "@/lib/astrology/macro/neptune-pluto-cycles-data";

// ---------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------

/**
 * How far up the ladder a cycle sits. Not decoration — it is the only thing
 * that says whether a bar means "a mood this decade" or "the shape of the era
 * everyone reading this will live and die inside".
 */
export type MacroLayer = "Civilizational" | "Structural" | "Turning Point";

export type MacroSectionLabel =
  | "Key Themes"
  | "Narrative"
  | "Structural Change"
  | "Pressure & Crisis"
  | "Constructive Direction"
  | "Economy & Capital"
  | "Technology"
  | "Power & Politics"
  | "Culture"
  | "Signals"
  | "Transformation"
  | "What Dies"
  | "What Consolidates"
  | "Old Order"
  | "Reorganization"
  | "Consequences"
  | "Distortion Risk"
  | "Current Evidence";

export interface MacroSection {
  /** Source field names are normalized into this shared drawer vocabulary. */
  label: MacroSectionLabel;
  items: string[];
}

export interface MacroMilestone {
  label: string;
  year: number;
  /** "90°", where the milestone is an aspect. */
  angle?: string;
  meaning?: string;
  /** The interval we are inside now runs from this milestone to the next. */
  current: boolean;
}

/**
 * What the bar is measuring — and the answer to the question the page kept
 * inviting: a turning-point cycle IS an aspect cycle. The two planets meet,
 * and the cycle runs one full 360° of separation until they meet again. A
 * structural cycle is not: it is one body crossing one sign, with no second
 * body and no angle in it.
 */
export type MacroKind = "sign-passage" | "conjunction-cycle";

const READING: Record<MacroKind, string> = {
  "sign-passage":
    "One planet crossing one sign. There is no aspect in this — the span runs " +
    "from the ingress to the egress, and the phase is how far through that " +
    "crossing we are.",
  "conjunction-cycle":
    "An aspect cycle. The two planets meet at 0°, and the cycle runs until " +
    "they meet again — one full 360° of separation. The rungs are the angles " +
    "crossed on the way, dated to the first exact hit of each.",
};

export interface MacroCycle {
  id: string;
  name: string;
  /** One glyph for a planet, two for a pair. Rendered side by side. */
  glyphs: string[];
  color: string;
  layer: MacroLayer;
  kind: MacroKind;
  /** One sentence saying what the bar measures. */
  reading: string;
  /**
   * The sign the cycle is in. For a sign passage that is where the planet is
   * now; for a pair cycle it is where the two of them met, which is the sign
   * the whole cycle is named for and keeps for its entire length.
   */
  sign: string | null;
  /** Degrees into that sign, for a pair cycle's conjunction. */
  signDegree?: number;
  signGlyph: string | null;
  element: SignElement | null;
  /**
   * The short line the row carries — what this cycle is about. For a planet
   * moving through a sign this IS the source's `domain`: the field it acts on
   * and the sentence the row wants are the same string, and carrying it twice
   * only put it on screen twice.
   */
  theme: string;
  catalyst?: string;
  timeframe: string;
  startYear: number;
  endYear: number;
  yearsIn: number;
  totalYears: number;
  /** 0–1, clamped. */
  progress: number;
  phase: string;
  /** Cycle length in round terms — "~20 years". */
  cadence: string;
  sections: MacroSection[];
  /** A dated example of the phase currently in force. */
  phaseContext?: {
    period: string;
    items: string[];
  };
  /** The immediately preceding recurrence of this cycle or sign passage. */
  previousCycle?: {
    period: string;
    /** One compact defining event for the timeline row. */
    summary: string;
    items: string[];
    /** Passages before the most recent one, where the source records them. */
    earlier?: { period: string; note: string }[];
  };
  milestones?: MacroMilestone[];
}

export interface SkyBody {
  planet: string;
  glyph: string;
  color: string;
  sign: string;
  signGlyph: string;
  element: SignElement | null;
  /** Degrees into the sign, 0–30. */
  degree: number;
  retrograde: boolean;
  /** Signed longitudinal motion in degrees per day. */
  dailyMotion: number;
  /** The structural cycle this position belongs to, if one is tracked. */
  cycleId: string | null;
  /** Ingress → egress of the sign it is in, when a cycle covers it. */
  timeframe: string | null;
  /** Collective interpretation of this planet's current sign placement. */
  meaning: SkyPlacementMeaning;
}

export interface MacroReading {
  asOf: string;
  sky: SkyBody[];
  cycles: MacroCycle[];
}

// ---------------------------------------------------------------------------
// Time
// ---------------------------------------------------------------------------

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/** The five slow bodies, and their Swiss Ephemeris ids. */
const SLOW_BODIES: [name: string, sweId: number][] = [
  ["Jupiter", 5],
  ["Saturn", 6],
  ["Uranus", 7],
  ["Neptune", 8],
  ["Pluto", 9],
];

const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Read one end of a source timeframe.
 *
 * These strings come in two shapes — "Nov 19, 2024" and a bare "2039" — because
 * an ingress has a date and a far-future egress does not. A bare year is taken
 * as the start of that year, which is the honest reading: the source does not
 * know the month either.
 */
function parseBoundary(part: string): Date | null {
  const trimmed = part.trim();
  const full = trimmed.match(/([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/);
  if (full) return new Date(Date.UTC(Number(full[3]), monthIndex(full[1]), Number(full[2])));
  const year = trimmed.match(/(\d{4})/);
  if (year) return new Date(Date.UTC(Number(year[1]), 0, 1));
  return null;
}

function monthIndex(name: string): number {
  const i = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec",
  ].indexOf(name.slice(0, 3).toLowerCase());
  return i < 0 ? 0 : i;
}

/** Both ends of a "start – end" timeframe. The dash is an en dash in the data. */
function parseSpan(timeframe: string): { start: Date; end: Date } | null {
  const [rawStart, rawEnd] = timeframe.split(/[–—-]/).map((s) => s.trim());
  if (!rawStart || !rawEnd) return null;
  const start = parseBoundary(rawStart);
  const end = parseBoundary(rawEnd);
  if (!start || !end || end <= start) return null;
  return { start, end };
}

/**
 * Where in its own span a cycle sits, as thirds.
 *
 * arc gave every planet its own hand-set thresholds — Pluto turned "Mid" at
 * five years, Uranus at two — which is the same fraction written out three
 * times with rounding errors in it. One rule, applied to the fraction, says
 * the same thing and cannot drift.
 */
function phaseFromProgress(progress: number): "Early" | "Mid" | "Late" {
  if (progress < 1 / 3) return "Early";
  if (progress < 2 / 3) return "Mid";
  return "Late";
}

/** "~20 years", from a span in years. */
function cadence(years: number): string {
  if (years >= 100) return `~${Math.round(years / 10) * 10} years`;
  return `~${Math.round(years)} years`;
}

function elementOf(sign: string | null | undefined): SignElement | null {
  return sign ? (signMeta(sign)?.element ?? null) : null;
}

/** Round hard, so a server value and a re-render an instant later agree. */
function round(n: number, places = 3): number {
  const f = 10 ** places;
  return Math.round(n * f) / f;
}

// ---------------------------------------------------------------------------
// The sky
// ---------------------------------------------------------------------------

function signIndexAt(julianDay: number, sweId: number): number | null {
  const result = swisseph.swe_calc_ut(julianDay, sweId, 0);
  if (!result || "error" in result || !("longitude" in result)) return null;
  const longitude = ((result.longitude % 360) + 360) % 360;
  return Math.floor(longitude / 30);
}

/**
 * Find the boundary of the uninterrupted sign stay containing `julianDay`.
 *
 * This deliberately finds the nearest crossing in each direction rather than
 * using an average "years per sign". Retrogrades can carry a planet out of a
 * sign and back in, so the dates on the card need to describe the passage the
 * live longitude is actually inside.
 */
function signBoundary(
  julianDay: number,
  sweId: number,
  signIndex: number,
  direction: -1 | 1,
): number | null {
  let inside = julianDay;
  let outside: number | null = null;

  // Five thousand days covers even Saturn's longest uninterrupted sign stay;
  // the slower bodies use the curated passage dates already attached to their
  // structural cycles and do not call this fallback.
  for (let days = 1; days <= 5000; days++) {
    const probe = julianDay + direction * days;
    const probeSign = signIndexAt(probe, sweId);
    if (probeSign === null) return null;
    if (probeSign !== signIndex) {
      outside = probe;
      inside = julianDay + direction * (days - 1);
      break;
    }
  }

  if (outside === null) return null;

  let lower = Math.min(inside, outside);
  let upper = Math.max(inside, outside);
  for (let i = 0; i < 30; i++) {
    const middle = (lower + upper) / 2;
    const middleIsInside = signIndexAt(middle, sweId) === signIndex;

    if (direction < 0) {
      if (middleIsInside) upper = middle;
      else lower = middle;
    } else if (middleIsInside) {
      lower = middle;
    } else {
      upper = middle;
    }
  }

  return upper;
}

function julianDateLabel(julianDay: number): string {
  const date = swisseph.swe_revjul(julianDay, swisseph.SE_GREG_CAL);
  return `${MONTHS[date.month - 1]} ${Math.floor(date.day)}, ${date.year}`;
}

function currentSignTimeframe(
  julianDay: number,
  sweId: number,
  signIndex: number,
): string | null {
  const ingress = signBoundary(julianDay, sweId, signIndex, -1);
  const egress = signBoundary(julianDay, sweId, signIndex, 1);
  if (ingress === null || egress === null) return null;
  return `${julianDateLabel(ingress)} – ${julianDateLabel(egress)}`;
}

/**
 * The five slow bodies' real positions, now.
 *
 * Moshier is the fallback ephemeris when no data path is set, which is what the
 * rest of the app already relies on. Its accuracy is arcseconds over these
 * centuries — far inside the degree this page reports.
 */
export function currentSky(now: Date, cycles: MacroCycle[]): SkyBody[] {
  const julianDay = swisseph.swe_julday(
    now.getUTCFullYear(),
    now.getUTCMonth() + 1,
    now.getUTCDate(),
    now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600,
    swisseph.SE_GREG_CAL,
  );

  const bodies: SkyBody[] = [];

  for (const [planet, sweId] of SLOW_BODIES) {
    const result = swisseph.swe_calc_ut(julianDay, sweId, swisseph.SEFLG_SPEED);
    if (!result || "error" in result || !("longitude" in result)) continue;

    const longitude = ((result.longitude % 360) + 360) % 360;
    const signIndex = Math.floor(longitude / 30);
    const sign = SIGNS[signIndex];
    const cycle = cycles.find((c) => c.id === planet.toLowerCase());

    bodies.push({
      planet,
      glyph: bodyGlyph(planet),
      color: bodyColor(planet),
      sign,
      signGlyph: signGlyph(sign),
      element: elementOf(sign),
      degree: round(longitude % 30, 2),
      retrograde: result.longitudeSpeed < 0,
      dailyMotion: round(result.longitudeSpeed, 5),
      cycleId: cycle?.id ?? null,
      timeframe:
        cycle?.timeframe ?? currentSignTimeframe(julianDay, sweId, signIndex),
      meaning: getSkyPlacementMeaning(planet, sign),
    });
  }

  // Slowest first: the further out the body, the longer the sentence it is in
  // the middle of. Reading down the row goes from era to decade.
  return bodies.reverse();
}

// ---------------------------------------------------------------------------
// Pair geometry — where two planets met, and the angles they cross after
// ---------------------------------------------------------------------------

/**
 * A pair cycle is an aspect cycle, and this is the part of it that is
 * astronomy rather than interpretation.
 *
 * Both apps carried the conjunction's sign as a hand-written string — arc had
 * `sign: 'Virgo'` typed into the timeline component, next to `sign: 'Gemini'`
 * typed in beside it. The ephemeris that draws the rest of the page already
 * knows both: find the moment the two are tightest, read the longitude, and
 * the sign falls out. Checked against what those two strings said, it agrees —
 * Uranus and Pluto met at 16° Virgo in 1966, Neptune and Pluto at 8° Gemini in
 * 1891 — so nothing is asserted here that was not already believed; it is just
 * derived instead of remembered.
 *
 * The rungs are the same computation continued: accumulate the separation
 * forward from the conjunction and note when it first passes 90°, 180°, 270°,
 * 360°. That reproduces the dates the literature gives — Jupiter square Saturn
 * in Aug 2024, the next Saturn–Pluto square in 2028 — which is the check that
 * the unwrapping is right, because a naive `b - a` would wrap and place them
 * anywhere.
 */

const SWE_ID: Record<string, number> = {
  Jupiter: 5,
  Saturn: 6,
  Uranus: 7,
  Neptune: 8,
  Pluto: 9,
};

const RUNGS: { angle: number; label: string; meaning: string }[] = [
  {
    angle: 0,
    label: "Conjunction",
    meaning: "The two meet. Everything the cycle will do starts here.",
  },
  {
    angle: 90,
    label: "Waxing square",
    meaning: "First friction. What was begun meets its first real resistance.",
  },
  {
    angle: 180,
    label: "Opposition",
    meaning: "Peak tension. The cycle is as visible as it will get.",
  },
  {
    angle: 270,
    label: "Waning square",
    meaning: "The structure built at the start begins to come apart.",
  },
  {
    angle: 360,
    label: "Next conjunction",
    meaning: "The cycle closes, and the next one opens in a new sign.",
  },
];

export interface AspectRung {
  angle: number;
  label: string;
  meaning: string;
  year: number;
}

interface PairGeometry {
  /** Where and when the cycle opened. */
  sign: string;
  degree: number;
  year: number;
  /** First exact crossing of each quarter angle. Empty when not walked. */
  rungs: AspectRung[];
}

/** Time-invariant, and ~80ms of ephemeris to derive. Worth holding on to. */
const pairCache = new Map<string, PairGeometry>();

function longitudeAt(julianDay: number, sweId: number): number {
  const r = swisseph.swe_calc_ut(julianDay, sweId, 0);
  return r && "longitude" in r ? r.longitude : 0;
}

/**
 * `fast` and `slow` are not interchangeable: the cycle angle is the faster
 * body's longitude minus the slower one's, so that it runs 0° → 360° once per
 * cycle instead of backwards.
 *
 * `walkYears` of 0 asks only for the conjunction, which is all the
 * civilizational cycles need — their rungs come from their own source data.
 */
function pairGeometry(
  fast: string,
  slow: string,
  nearYear: number,
  walkYears: number,
): PairGeometry {
  const key = `${fast}-${slow}-${nearYear}-${walkYears}`;
  const cached = pairCache.get(key);
  if (cached) return cached;

  const fastId = SWE_ID[fast];
  const slowId = SWE_ID[slow];
  const angle = (jd: number) =>
    (((longitudeAt(jd, fastId) - longitudeAt(jd, slowId)) % 360) + 360) % 360;

  // The conjunction: tightest separation within ~2½ years either side of the
  // year the source names. That window is wide enough to hold all three passes
  // of a retrograde conjunction, and the tightest of them is the one dated.
  const centre = swisseph.swe_julday(nearYear, 1, 1, 0, swisseph.SE_GREG_CAL);
  let best = { jd: centre, separation: 360 };
  for (let day = -900; day <= 900; day += 5) {
    const jd = centre + day;
    const raw = angle(jd);
    const separation = raw > 180 ? 360 - raw : raw;
    if (separation < best.separation) best = { jd, separation };
  }

  const met = swisseph.swe_revjul(best.jd, swisseph.SE_GREG_CAL);
  const longitude = ((longitudeAt(best.jd, slowId) % 360) + 360) % 360;

  const rungs: AspectRung[] = [];
  if (walkYears > 0) {
    rungs.push({ ...RUNGS[0], year: met.year });

    // Accumulate the separation rather than reading it directly: it wraps at
    // 360°, and an eccentric orbit can push it backwards for years at a time.
    let previous = angle(best.jd);
    let travelled = 0;
    let next = 1;

    for (let day = 10; day <= walkYears * 366 && next < RUNGS.length; day += 10) {
      const jd = best.jd + day;
      const current = angle(jd);
      let step = current - previous;
      if (step < -180) step += 360;
      if (step > 180) step -= 360;

      const before = travelled;
      travelled += step;

      while (
        next < RUNGS.length &&
        before < RUNGS[next].angle &&
        travelled >= RUNGS[next].angle
      ) {
        rungs.push({
          ...RUNGS[next],
          year: swisseph.swe_revjul(jd, swisseph.SE_GREG_CAL).year,
        });
        next++;
      }
      previous = current;
    }
  }

  const geometry: PairGeometry = {
    sign: SIGNS[Math.floor(longitude / 30)],
    degree: round(longitude % 30, 1),
    year: met.year,
    rungs,
  };
  pairCache.set(key, geometry);
  return geometry;
}

// ---------------------------------------------------------------------------
// The cycles
// ---------------------------------------------------------------------------

/** A planet moving through one sign — Pluto, Neptune, Uranus. */
function structuralCycle(
  id: string,
  planet: string,
  now: Date,
  source: {
    sign: string;
    timeframe: string;
    domain: string;
    catalyst?: string;
  },
  sections: MacroSection[],
  parallel: { previousOccurrence: string; historicalThemes: string[] },
  previousCycleSummary: string,
  earlier?: { period: string; note: string }[],
): MacroCycle | null {
  const span = parseSpan(source.timeframe);
  if (!span) return null;

  const totalYears = (span.end.getTime() - span.start.getTime()) / MS_PER_YEAR;
  const yearsIn = (now.getTime() - span.start.getTime()) / MS_PER_YEAR;
  const progress = Math.min(1, Math.max(0, yearsIn / totalYears));

  return {
    id,
    name: planet,
    glyphs: [bodyGlyph(planet)],
    color: bodyColor(planet),
    layer: "Structural",
    kind: "sign-passage",
    reading: READING["sign-passage"],
    sign: source.sign,
    signGlyph: signGlyph(source.sign),
    element: elementOf(source.sign),
    theme: source.domain,
    catalyst: source.catalyst,
    timeframe: source.timeframe,
    startYear: span.start.getUTCFullYear(),
    endYear: span.end.getUTCFullYear(),
    yearsIn: round(yearsIn),
    totalYears: round(totalYears),
    progress: round(progress, 4),
    phase: phaseFromProgress(progress),
    cadence: cadence(totalYears),
    sections,
    previousCycle: {
      period: parallel.previousOccurrence,
      summary: previousCycleSummary,
      items: parallel.historicalThemes,
      earlier,
    },
  };
}

/**
 * A conjunction cycle — two planets, one meeting, one full turn of separation
 * until the next.
 *
 * `planets` is ordered fast-then-slow, which is also how these are named, so
 * the cycle angle runs forwards. The rungs are computed rather than spaced
 * evenly across the span: the quarter points of a 20-year cycle are NOT five
 * years apart, because both orbits are elliptical and one of them is Pluto's.
 * Dividing the length by four would have drawn four ticks that look precise
 * and are off by years.
 */
function conjunctionCycle(
  id: string,
  name: string,
  planets: [string, string],
  source: { year: number; sign: string },
  lengthYears: number,
  yearsIn: number,
  theme: string,
  sections: MacroSection[],
  previousCycle?: { period: string; summary: string; items: string[] },
): MacroCycle {
  const progress = Math.min(1, Math.max(0, yearsIn / lengthYears));
  const geometry = pairGeometry(planets[0], planets[1], source.year, lengthYears + 6);
  const thisYear = source.year + yearsIn;

  // The rung just passed — "we are in the stretch that opened at the square".
  const passed = geometry.rungs.reduce(
    (best, rung) => (rung.year <= thisYear ? rung : best),
    geometry.rungs[0],
  );

  return {
    id,
    name,
    glyphs: planets.map(bodyGlyph),
    color: bodyColor(planets[1]),
    layer: "Turning Point",
    kind: "conjunction-cycle",
    reading: READING["conjunction-cycle"],
    sign: geometry.sign,
    signDegree: geometry.degree,
    signGlyph: signGlyph(geometry.sign),
    element: elementOf(geometry.sign),
    theme,
    timeframe: `${source.year} – ${source.year + lengthYears}`,
    startYear: source.year,
    endYear: source.year + lengthYears,
    yearsIn: round(yearsIn),
    totalYears: lengthYears,
    progress: round(progress, 4),
    phase: `Past ${passed.label.toLowerCase()}`,
    cadence: cadence(lengthYears),
    sections,
    previousCycle,
    milestones: geometry.rungs.map((rung) => ({
      label: rung.label,
      year: rung.year,
      angle: `${rung.angle}°`,
      meaning: rung.meaning,
      current: rung.year === passed.year,
    })),
  };
}

/**
 * A cycle read off its milestones — Uranus–Pluto, Neptune–Pluto.
 *
 * Same kind of thing as a conjunction cycle: two planets, one meeting, one
 * turn of separation. The difference is only that these run for centuries and
 * the source supplies its own ladder of aspect years, which is kept rather
 * than recomputed. That ladder is a curated reading — for Neptune and Pluto,
 * locked in a 3:2 resonance with a wildly eccentric orbit, the separation does
 * not advance evenly and a first-crossing scan disagrees with it — so the
 * years stay as the source has them, and only the conjunction's PLACEMENT is
 * derived. The placement was the thing missing: the sign a pair cycle is named
 * for is where the two of them met, and it holds for the cycle's whole length.
 */
function milestoneCycle(
  id: string,
  name: string,
  planets: [string, string],
  layer: MacroLayer,
  theme: string,
  now: Date,
  milestones: { aspect: string; year: number; label: string; degree: number }[],
  meanings: {
    aspect: string;
    title: string;
    whatHappens: string[];
    typicalSignals: string[];
    example: { period: string; events: string[] };
  }[],
  previousCycle: { period: string; summary: string; items: string[] },
): MacroCycle {
  const year = now.getUTCFullYear();
  const startYear = milestones[0].year;
  const endYear = milestones[milestones.length - 1].year;
  const totalYears = endYear - startYear;
  const yearsIn = (now.getTime() - Date.UTC(startYear, 0, 1)) / MS_PER_YEAR;
  const progress = Math.min(1, Math.max(0, yearsIn / totalYears));

  const index = milestones.findIndex(
    (m, i) =>
      year >= m.year &&
      (i === milestones.length - 1 || year < milestones[i + 1].year),
  );
  const passed = milestones[index < 0 ? 0 : index];
  const meaning = meanings.find((m) => m.aspect === passed.aspect);

  // Only the conjunction is wanted here, so the rung walk is skipped.
  const geometry = pairGeometry(planets[0], planets[1], startYear, 0);

  const sections: MacroSection[] = meaning
    ? [
      { label: "Key Themes", items: meaning.whatHappens },
      { label: "Signals", items: meaning.typicalSignals },
    ]
    : [];

  return {
    id,
    name,
    glyphs: planets.map(bodyGlyph),
    color: bodyColor(planets[1]),
    layer,
    kind: "conjunction-cycle",
    reading: READING["conjunction-cycle"],
    sign: geometry.sign,
    signDegree: geometry.degree,
    signGlyph: signGlyph(geometry.sign),
    element: elementOf(geometry.sign),
    theme,
    timeframe: `${startYear} – ${endYear}`,
    startYear,
    endYear,
    yearsIn: round(yearsIn),
    totalYears,
    progress: round(progress, 4),
    phase: meaning ? meaning.title : `Past ${passed.label}`,
    cadence: cadence(totalYears),
    sections,
    phaseContext: meaning
      ? {
        period: meaning.example.period,
        items: meaning.example.events,
      }
      : undefined,
    previousCycle,
    milestones: milestones.map((m) => ({
      label: m.label,
      year: m.year,
      angle: `${m.degree}°`,
      meaning: meanings.find((x) => x.aspect === m.aspect)?.title,
      current: m.year === passed.year,
    })),
  };
}

/**
 * Every cycle in force, slowest first.
 *
 * Order is the argument the page makes: the civilizational bars are nearly
 * flat and nobody alive will see them close, the structural bars move within a
 * career, the turning points inside a decade. Reading down is reading from the
 * unchangeable to the current.
 */
export function currentCycles(now: Date): MacroCycle[] {
  const cycles: MacroCycle[] = [];

  // ── Civilizational ────────────────────────────────────────────────────────
  cycles.push(
    milestoneCycle(
      "neptune-pluto",
      "Neptune–Pluto",
      ["Neptune", "Pluto"],
      "Civilizational",
      // The source names this era; no reason to write a second name for it.
      NEPTUNE_PLUTO_CYCLE.eraName,
      now,
      NEPTUNE_PLUTO_MILESTONES,
      NEPTUNE_PLUTO_MEANINGS,
      {
        period: NEPTUNE_PLUTO_PREVIOUS_CYCLE.period,
        summary: NEPTUNE_PLUTO_PREVIOUS_CYCLE.summary,
        items: NEPTUNE_PLUTO_PREVIOUS_CYCLE.events,
      },
    ),
  );

  cycles.push(
    milestoneCycle(
      "uranus-pluto",
      "Uranus–Pluto",
      ["Uranus", "Pluto"],
      "Civilizational",
      "Revolutionary eras",
      now,
      URANUS_PLUTO_MILESTONES,
      URANUS_PLUTO_MEANINGS,
      {
        period: URANUS_PLUTO_PREVIOUS_CYCLE.period,
        summary: URANUS_PLUTO_PREVIOUS_CYCLE.summary,
        items: URANUS_PLUTO_PREVIOUS_CYCLE.events,
      },
    ),
  );

  // ── Structural ────────────────────────────────────────────────────────────
  const pluto = PLUTO_ERAS.find((c) => c.isCurrent);
  if (pluto) {
    const cycle = structuralCycle(
      "pluto",
      "Pluto",
      now,
      {
        ...pluto,
        domain: pluto.powerSystem,
        catalyst: pluto.transformation,
      },
      [
        { label: "Transformation", items: [pluto.transformation] },
        { label: "What Dies", items: [pluto.whatDies] },
        { label: "What Consolidates", items: [pluto.whatConsolidates] },
        { label: "Consequences", items: pluto.consequences },
        { label: "Distortion Risk", items: pluto.distortionRisk },
      ],
      pluto.historicalParallel,
      "Age of Revolution & the Collapse of Monarchy",
    );
    if (cycle) cycles.push(cycle);
  }

  const neptune = NEPTUNE_CYCLES.find((c) => c.isCurrent);
  if (neptune) {
    const cycle = structuralCycle(
      "neptune",
      "Neptune",
      now,
      neptune,
      [
        /*
          Neptune's source calls this `archetypalPattern` while the other
          records call it `coreArchetype`. Both become Key Themes in the UI.
          `dominantMyth` remains Narrative because it describes what the era
          believes, not the underlying pattern itself.
        */
        { label: "Key Themes", items: neptune.archetypalPattern },
        { label: "Narrative", items: neptune.dominantMyth },
        { label: "Structural Change", items: neptune.boundaryBeingDissolved },
        { label: "Economy & Capital", items: neptune.capitalPattern },
        { label: "Power & Politics", items: neptune.politicalExpression },
        { label: "Culture", items: neptune.culturalTone },
        { label: "Distortion Risk", items: neptune.distortionRisk },
      ],
      neptune.historicalParallel,
      "Civil War & Reconstruction",
    );
    if (cycle) cycles.push(cycle);
  }

  const uranus = URANUS_ERAS.find((c) => c.isCurrent);
  if (uranus) {
    const cycle = structuralCycle(
      "uranus",
      "Uranus",
      now,
      { ...uranus, domain: uranus.system, catalyst: uranus.shock },
      [
        { label: "Old Order", items: [uranus.oldOrder] },
        { label: "Reorganization", items: [uranus.reorganization] },
        { label: "Consequences", items: uranus.consequences },
        { label: "Distortion Risk", items: uranus.distortionRisk },
      ],
      uranus.historicalParallel,
      "World War II & the Birth of Machine Cognition",
      uranus.extendedHistoricalPeriods,
    );
    if (cycle) cycles.push(cycle);
  }

  // ── Turning points ────────────────────────────────────────────────────────
  const saturnPluto = SATURN_PLUTO_CONJUNCTIONS.find((c) => c.isCurrent);
  const previousSaturnPluto = saturnPluto
    ? SATURN_PLUTO_CONJUNCTIONS.find((c) => c.year < saturnPluto.year)
    : undefined;
  if (saturnPluto) {
    cycles.push(
      conjunctionCycle(
        "saturn-pluto",
        "Saturn–Pluto",
        ["Saturn", "Pluto"],
        saturnPluto,
        33,
        getSaturnPlutoYearsIntoCycle(),
        saturnPluto.structuralTheme,
        [
          { label: "Key Themes", items: saturnPluto.coreArchetype },
          { label: "Power & Politics", items: saturnPluto.powerDynamics },
          {
            label: "Pressure & Crisis",
            items: [
              ...saturnPluto.institutionalPressure,
              ...saturnPluto.crisisCharacter,
            ],
          },
          { label: "Constructive Direction", items: saturnPluto.reconstructionFocus },
          { label: "Current Evidence", items: saturnPluto.historicalEvents },
        ],
        previousSaturnPluto
          ? {
            period: `${previousSaturnPluto.year} – ${saturnPluto.year}`,
            summary: "Volcker Shock & Financialization",
            items: previousSaturnPluto.historicalEvents,
          }
          : undefined,
      ),
    );
  }

  const jupiterSaturn = JUPITER_SATURN_CYCLES.find((c) => c.isCurrent);
  const previousJupiterSaturn = jupiterSaturn
    ? JUPITER_SATURN_CYCLES.find((c) => c.year < jupiterSaturn.year)
    : undefined;
  if (jupiterSaturn) {
    cycles.push(
      conjunctionCycle(
        "jupiter-saturn",
        "Jupiter–Saturn",
        ["Jupiter", "Saturn"],
        jupiterSaturn,
        20,
        getJupiterSaturnYearsIntoCycle(),
        jupiterSaturn.economicTheme,
        [
          { label: "Key Themes", items: jupiterSaturn.coreArchetype },
          {
            label: "Economy & Capital",
            items: [
              ...jupiterSaturn.expansionFocus,
              ...jupiterSaturn.marketCharacter,
            ],
          },
          { label: "Structural Change", items: jupiterSaturn.structuralShift },
          { label: "Distortion Risk", items: jupiterSaturn.distortionRisk },
          { label: "Current Evidence", items: jupiterSaturn.historicalContext },
        ],
        previousJupiterSaturn
          ? {
            period: `${previousJupiterSaturn.year} – ${jupiterSaturn.year}`,
            summary: "Dot-com Crash, Globalization & the Housing Boom",
            items: previousJupiterSaturn.historicalContext,
          }
          : undefined,
      ),
    );
  }

  return cycles;
}

/** The whole reading, for one instant. */
export function readMacro(now = new Date()): MacroReading {
  const cycles = currentCycles(now);
  return {
    asOf: now.toISOString(),
    sky: currentSky(now, cycles),
    cycles,
  };
}
