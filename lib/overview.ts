import type { Band } from "@/lib/band";
import { BRANCHES, STEMS } from "@/lib/chinese/almanac";
import { elementColor } from "@/lib/chinese/palette";
import type { LuckPillar } from "@/lib/chinese/pillars";
import { NUMBERS } from "@/lib/numerology/lexicon";
import {
  pinnacleInForce,
  type NumerologyReading,
  type Pinnacle,
} from "@/lib/numerology/numbers";

/**
 * The Overview's rows, built from what each system actually computed.
 *
 * This file replaces a hand-written array of six invented cycles. Nothing here
 * holds data: every band is derived from a reading the instrument produced —
 * the house transits from arc's ephemeris cache, the luck pillar from the solar
 * terms, the personal year and pinnacle from the birth date. If a system has
 * nothing to say for this chart, it contributes no rows rather than a plausible
 * placeholder.
 *
 * Which rows, and why so few: the page answers one question — what long seasons
 * is this person inside right now, in each vocabulary, and when does each turn
 * over. That is a different question from "list every cycle", which the Western
 * explorer already answers and which would bury the structural cycles under two
 * dozen Jupiter house changes. One band per instrument, and only the one in
 * force.
 */

export const GROUPS = {
  western: "Western",
  eastern: "Eastern",
  numerology: "Numerology",
} as const;

/** The `/api/cycles` payload, shaped here so this module never touches prisma. */
export interface ActiveCyclesResponse {
  cycles: Array<{ band: Band; planet: string; house: string }>;
}

function iso(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// ─── Western ──────────────────────────────────────────────────────────────────

/**
 * The house each slow planet is moving through, as the Cycles page already
 * computes it. Bands arrive fully formed — glyph, colour, retrograde segments —
 * so this only files them under a system and points them somewhere.
 */
export function westernBands(response: ActiveCyclesResponse | null): Band[] {
  if (!response) return [];
  return response.cycles.map(({ band }) => ({
    ...band,
    group: GROUPS.western,
    href: "/western/cycles",
  }));
}

// ─── Eastern ──────────────────────────────────────────────────────────────────

/**
 * The ten-year pillar in force.
 *
 * Null for a chart with no recorded gender, because the sequence steps forwards
 * or backwards depending on it and there is no defensible default — the same
 * refusal the Luck Pillars page makes, for the same reason.
 */
export function easternBands(
  luck: LuckPillar[] | null,
  now: Date,
): Band[] {
  if (!luck?.length) return [];

  const t = now.getTime();
  const current =
    luck.find(
      (p) => Date.parse(p.startDate) <= t && t < Date.parse(p.endDate),
    ) ?? null;
  if (!current) return [];

  const stem = STEMS[current.stem];
  const branch = BRANCHES[current.branch];

  return [
    {
      id: `luck-${current.startAge}`,
      glyph: stem.han,
      title: `${stem.pinyin} ${branch.pinyin}`,
      subtitle: `${stem.polarity} ${stem.element} over ${branch.animal}`,
      start: current.startDate.slice(0, 10),
      end: current.endDate.slice(0, 10),
      segments: [
        {
          start: current.startDate.slice(0, 10),
          end: current.endDate.slice(0, 10),
        },
      ],
      color: elementColor(stem.element),
      group: GROUPS.eastern,
      href: "/eastern/luck-pillars",
    },
  ];
}

// ─── Numerology ───────────────────────────────────────────────────────────────

/** A pinnacle turns on the birthday, not on 1 January. */
function pinnacleSpan(
  pinnacle: Pinnacle,
  reading: NumerologyReading,
  horizon: string,
): { start: string; end: string } {
  const { month, day } = reading.birth;
  return {
    start: iso(pinnacle.startYear, month, day),
    // The fourth chapter does not close. Rather than invent an age for it, the
    // band runs to the edge of whatever window the other systems set, which is
    // what "does not close" looks like on an axis.
    end:
      pinnacle.endYear === null
        ? horizon
        : iso(pinnacle.endYear + 1, month, day),
  };
}

/**
 * The chapter in force and the year inside it.
 *
 * Two rows at two scales on purpose. The pinnacle is numerology's decade — the
 * counterpart to the luck pillar above it — and the personal year is the only
 * band on the page that turns over within twelve months, which is what makes
 * the others read as slow.
 */
export function numerologyBands(
  reading: NumerologyReading | null,
  horizon: string,
): Band[] {
  if (!reading) return [];

  const bands: Band[] = [];
  const { age, personalYear } = reading;

  const chapter = reading.pinnacles.find((p) => pinnacleInForce(p, age));

  if (chapter) {
    const span = pinnacleSpan(chapter, reading, horizon);
    bands.push({
      id: `pinnacle-${chapter.index}`,
      glyph: String(chapter.number),
      title: `Pinnacle ${chapter.index}`,
      subtitle: `${NUMBERS[chapter.number].title} · challenge ${chapter.challenge}`,
      start: span.start,
      end: span.end,
      segments: [span],
      group: GROUPS.numerology,
      href: "/numerology/pinnacles",
    });
  }

  bands.push({
    id: `personal-year-${personalYear.year}`,
    glyph: String(personalYear.number),
    title: `Personal Year ${personalYear.number}`,
    subtitle: `${NUMBERS[personalYear.number].title} · ${personalYear.number} of 9`,
    start: `${personalYear.year}-01-01`,
    end: `${personalYear.year + 1}-01-01`,
    segments: [
      {
        start: `${personalYear.year}-01-01`,
        end: `${personalYear.year + 1}-01-01`,
      },
    ],
    group: GROUPS.numerology,
    href: "/numerology/cycles",
  });

  return bands;
}

// ─── The axis ─────────────────────────────────────────────────────────────────

const DAY = 86_400_000;

/**
 * The window the bands are drawn in: their own union, with a little air.
 *
 * Derived rather than declared, so the axis always fits what is on it. The old
 * page named its window as a pair of constants, which worked only because the
 * bands under it were invented to fit.
 */
export function windowFor(
  bands: Band[],
  now: Date,
): { windowStart: string; windowEnd: string } {
  const day = (ms: number) => new Date(ms).toISOString().slice(0, 10);

  if (bands.length === 0) {
    return {
      windowStart: day(now.getTime() - 365 * DAY),
      windowEnd: day(now.getTime() + 365 * DAY),
    };
  }

  const starts = bands.map((b) => Date.parse(b.start));
  const ends = bands.map((b) => Date.parse(b.end));
  const first = Math.min(...starts, now.getTime());
  const last = Math.max(...ends, now.getTime());
  const air = Math.max(180 * DAY, (last - first) * 0.03);

  return { windowStart: day(first - air), windowEnd: day(last + air) };
}

/**
 * A first pass at the horizon, before the numerology chapter is built.
 *
 * The fourth pinnacle has no end, so it cannot be part of the union that
 * decides where the axis stops — it would either need an invented closing age
 * or it would run away with the scale. The other two systems set the horizon
 * and the open chapter is drawn out to it.
 */
export function horizonOf(bands: Band[], now: Date): string {
  return windowFor(bands, now).windowEnd;
}
