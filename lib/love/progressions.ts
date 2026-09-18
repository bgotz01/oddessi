/**
 * Secondary progressions — the slow clock.
 *
 * SERVER ONLY. This imports Swiss Ephemeris, which is a native binary excluded
 * from the bundle (`serverExternalPackages` in next.config), so it is reached
 * through `/api/progressions` and never from a component. Same arrangement as
 * `lib/macro.ts`.
 *
 * WHAT A SECONDARY PROGRESSION IS
 * One day of ephemeris after birth stands for one year of life. It is not a
 * transit: nothing in the sky is at these positions now. It is a symbolic
 * clock, and the reason Love needs one is that transits alone cannot produce a
 * *season*. Jupiter crosses the 7th in a year and leaves; the progressed Moon
 * spends two to three years in a house and the progressed Venus can hold one
 * aspect for the better part of a decade. Those are the durations a
 * relationship timeline is actually made of, and the cached transit feed has
 * none of them in it.
 *
 * WHY ONLY THE MOON AND VENUS
 * Every planet progresses, and almost none of them go anywhere. Progressed
 * Mars covers about twenty-five degrees in a lifetime and progressed Jupiter
 * about seven; a layer whose whole ninety-year output is one sign change is a
 * layer that produces one window and then goes silent. The Moon (a full
 * circuit every 27.3 years) and Venus (roughly a degree a year, with stations)
 * are the two that move enough to cut a life into periods, and they are also
 * the two this page is about.
 *
 * WHAT IS EMITTED
 * Spans, never point events — see `ProgressedEvent`. A progression that
 * arrives as a date is a horoscope entry; the same progression as a span is a
 * season, which is the only thing the timeline can draw.
 */

import * as swisseph from "swisseph-v2";
import { DateTime } from "luxon";
import type { Chart, HouseCusp } from "@/lib/charts";
import { YEAR_MS, birthMsOf } from "@/lib/chart-time";

export const PROGRESSION_MODEL = {
  version: 1,
  /**
   * How far the clock is wound. Ninety years of life is ninety days of
   * ephemeris — the whole computation fits inside the quarter of a year after
   * a birth.
   */
  lifespanYears: 90,
  /**
   * Sample step, in years of life.
   *
   * A week of life per sample. The progressed Moon covers about a quarter of a
   * degree in that time, which is fine resolution against a one-degree orb;
   * anything coarser turns a three-month aspect into a two-sample smear whose
   * start and end dates are rounded to the nearest month and a half.
   */
  stepYears: 1 / 48,
  /**
   * One degree, both sides.
   *
   * Progressed aspects are conventionally read tight, and the reason is
   * arithmetic rather than taste: at a degree a year, a three-degree orb on
   * progressed Venus is a six-year window, which is not a window. One degree
   * gives the Moon about two months and Venus about two years — durations that
   * mean different things and should look different on a timeline.
   */
  orbDegrees: 1,
  /**
   * Below this an OCCUPANCY run is a cusp graze rather than a stay.
   *
   * Applies to house and sign runs only. A progressed body sitting a
   * hundredth of a degree past a cusp for two samples has not entered
   * anything, and a three-week stay in the 7th is not a season.
   */
  minimumOccupancyYears: 0.25,
  /**
   * Below this an ASPECT run is a sampling artefact.
   *
   * Counted in SAMPLES rather than years, and that distinction is the whole
   * point. The first version used one year-based floor for everything, set at
   * a quarter of a year — which silently deleted every progressed Moon aspect
   * in every chart, because the Moon crosses a two-degree orb window in about
   * fifty-five days and fifty-five days is less than a quarter of a year. The
   * layer reported zero contacts and looked like a quiet chart rather than a
   * broken filter.
   *
   * What the floor is actually for is a run so short it might be the grid
   * rather than the sky, and that is a question about samples. Three of them
   * is an orb entered, held and left; the Moon gives about seven and Venus
   * about eighty.
   */
  minimumAspectSamples: 3,
  aspects: {
    Conjunction: 0,
    Sextile: 60,
    Square: 90,
    Trine: 120,
    Opposition: 180,
  },
  /**
   * What the progressed Moon is read against.
   *
   * The houses it occupies — the 5th and the 7th are what Love asks for, but
   * every house is computed and the model filters, because a layer that
   * silently drops ten of twelve houses cannot later be asked what it saw.
   * And its aspects to natal Venus, which is the one contact that makes a
   * lunar season a *romantic* season rather than simply an emotional one.
   */
  moonTargets: ["Venus"],
  /**
   * What progressed Venus is read against.
   *
   * Mars and the Moon are the other two bodies in the attraction picture; the
   * Ascendant–Descendant axis is the relationship axis itself. The Sun is
   * here because progressed Venus conjunct the natal Sun is the single
   * clearest "romantic orientation has changed" signature available, and
   * excluding it to keep the list short would have cost the layer its best
   * evidence.
   */
  venusTargets: ["Venus", "Mars", "Moon", "Sun", "Ascendant"],
} as const;

export type ProgressedBody = "Moon" | "Venus";

export type ProgressedEventKind =
  /** The progressed body stood in this natal house for this span. */
  | "house"
  /** The progressed body stood in this sign for this span. */
  | "sign"
  /** The progressed body held this aspect to a natal point for this span. */
  | "aspect";

/**
 * One progressed span.
 *
 * Deliberately NOT a `Band`. A band is a transit row from the cycle cache and
 * carries that shape's assumptions — retrograde segments reconstructed from a
 * stored interpretation, a significance string, a colour. A progression has
 * none of those, and widening `Band` to admit it would have meant every
 * consumer of the explorer's filters learning about a kind of row that is not
 * a transit at all. The Love model maps both into its own contact type, which
 * is where the two vocabularies are supposed to meet.
 */
export interface ProgressedEvent {
  id: string;
  body: ProgressedBody;
  kind: ProgressedEventKind;
  /** Ages, which is what the timeline positions on. */
  ageStart: number;
  ageEnd: number;
  start: string;
  end: string;
  /** Exactitude, for aspects. The midpoint of the stay, for ingresses. */
  peak: string;
  agePeak: number;
  /** Set on `house`. */
  houseNumber?: number;
  /** Set on `sign`. */
  sign?: string;
  /** Set on `aspect`. */
  aspectType?: string;
  natalPoint?: string;
  /** Closest approach, in degrees. Set on `aspect`. */
  closestOrb?: number;
}

export interface ProgressionsResult {
  chartId: string;
  model: typeof PROGRESSION_MODEL;
  events: ProgressedEvent[];
  /**
   * Targets the chart does not supply, so a silent layer can be told apart
   * from a quiet one. A chart with no birth time has no houses and no
   * Ascendant, and both of those absences produce exactly zero events.
   */
  darkTargets: string[];
  housed: boolean;
}

const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const SWE_ID: Record<ProgressedBody, number> = {
  Moon: swisseph.SE_MOON,
  Venus: swisseph.SE_VENUS,
};

/** Normalise to [0, 360). */
function norm(degrees: number): number {
  return ((degrees % 360) + 360) % 360;
}

/** Shortest separation between two longitudes, 0–180. */
function separation(a: number, b: number): number {
  const d = Math.abs(norm(a) - norm(b));
  return d > 180 ? 360 - d : d;
}

/**
 * Which natal house a longitude falls in.
 *
 * Cusps are contiguous sectors in order, and the twelfth wraps past 0°, which
 * is the only case worth writing down: a house whose start is greater than its
 * end contains everything above the start OR below the end.
 */
function houseOf(longitude: number, cusps: HouseCusp[]): number | null {
  if (cusps.length !== 12) return null;
  const lon = norm(longitude);
  for (let i = 0; i < 12; i += 1) {
    const from = norm(cusps[i].longitude);
    const to = norm(cusps[(i + 1) % 12].longitude);
    const inside = from <= to ? lon >= from && lon < to : lon >= from || lon < to;
    if (inside) return cusps[i].number;
  }
  return null;
}

function signOf(longitude: number): string {
  return SIGNS[Math.floor(norm(longitude) / 30) % 12];
}

/** The natal instant, as a Julian day in UT. */
function natalJulianDay(chart: Chart): number {
  const { date, time, timezone } = chart.birth;
  const local = DateTime.fromISO(`${date.slice(0, 10)}T${(time || "12:00").slice(0, 5)}`, {
    zone: timezone || "UTC",
  });
  const utc = (local.isValid ? local : DateTime.fromISO(`${date.slice(0, 10)}T12:00`, { zone: "UTC" })).toUTC();
  return swisseph.swe_julday(
    utc.year,
    utc.month,
    utc.day,
    utc.hour + utc.minute / 60 + utc.second / 3600,
    swisseph.SE_GREG_CAL,
  );
}

/**
 * The natal longitudes progressions are measured against.
 *
 * Read off the stored chart rather than recomputed, so the aspects here land
 * on the same degrees the rest of the app prints. A point the chart does not
 * carry is reported as dark rather than quietly skipped.
 */
function natalTargets(chart: Chart): {
  points: Map<string, number>;
  dark: string[];
} {
  const points = new Map<string, number>();
  const dark: string[] = [];
  const wanted = new Set<string>([
    ...PROGRESSION_MODEL.moonTargets,
    ...PROGRESSION_MODEL.venusTargets,
  ]);

  for (const name of wanted) {
    if (name === "Ascendant") {
      if (typeof chart.angles.ascendant === "number") {
        points.set(name, chart.angles.ascendant);
      } else {
        dark.push("Ascendant");
      }
      continue;
    }
    const placement = chart.placements.find((p) => p.body === name);
    if (placement && typeof placement.longitude === "number") {
      points.set(name, placement.longitude);
    } else {
      dark.push(name);
    }
  }

  return { points, dark };
}

interface Sample {
  age: number;
  longitude: number;
  house: number | null;
  sign: string;
}

/**
 * Walk the progressed ephemeris once per body.
 *
 * One pass produces every layer: the house it stands in, the sign it stands
 * in, and its separation from each natal target. Splitting that into three
 * scans would mean three sets of ephemeris calls returning the same longitudes
 * and three chances for them to be sampled on different grids.
 */
function walk(body: ProgressedBody, jd: number, cusps: HouseCusp[]): Sample[] {
  const samples: Sample[] = [];
  const { lifespanYears, stepYears } = PROGRESSION_MODEL;
  for (let age = 0; age <= lifespanYears; age += stepYears) {
    // One day per year. The whole ninety-year clock lives in the first ninety
    // days after the birth instant.
    const result = swisseph.swe_calc_ut(jd + age, SWE_ID[body], swisseph.SEFLG_SWIEPH) as {
      longitude?: number;
    };
    if (typeof result?.longitude !== "number") continue;
    const longitude = norm(result.longitude);
    samples.push({
      age,
      longitude,
      house: houseOf(longitude, cusps),
      sign: signOf(longitude),
    });
  }
  return samples;
}

/** Contiguous runs sharing a key. Used for both house and sign occupancy. */
function runs<K>(
  samples: Sample[],
  keyOf: (s: Sample) => K | null,
): { key: K; from: number; to: number }[] {
  const out: { key: K; from: number; to: number }[] = [];
  for (const sample of samples) {
    const key = keyOf(sample);
    if (key === null) continue;
    const last = out[out.length - 1];
    if (last && last.key === key && sample.age - last.to <= PROGRESSION_MODEL.stepYears * 1.5) {
      last.to = sample.age;
    } else {
      out.push({ key, from: sample.age, to: sample.age });
    }
  }
  return out;
}

export function progressions(chart: Chart): ProgressionsResult {
  const jd = natalJulianDay(chart);
  const birthMs = birthMsOf(chart.birth.date);
  const cusps = chart.houses ?? [];
  const { points, dark } = natalTargets(chart);
  const housed = cusps.length === 12;
  if (!housed) dark.push("House cusps");

  const iso = (age: number) =>
    new Date(birthMs + age * YEAR_MS).toISOString().slice(0, 10);

  const events: ProgressedEvent[] = [];
  const {
    minimumOccupancyYears,
    minimumAspectSamples,
    orbDegrees,
    aspects,
    stepYears,
  } = PROGRESSION_MODEL;

  const floorFor = (kind: ProgressedEventKind) =>
    kind === "aspect"
      ? minimumAspectSamples * stepYears
      : minimumOccupancyYears;

  const push = (event: Omit<ProgressedEvent, "start" | "end" | "peak">) => {
    if (event.ageEnd - event.ageStart < floorFor(event.kind)) return;
    events.push({
      ...event,
      start: iso(event.ageStart),
      end: iso(event.ageEnd),
      peak: iso(event.agePeak),
    });
  };

  for (const body of ["Moon", "Venus"] as ProgressedBody[]) {
    const samples = walk(body, jd, cusps);
    if (samples.length === 0) continue;

    // Occupancy — where the body stands, for how long.
    if (housed) {
      for (const run of runs(samples, (s) => s.house)) {
        push({
          id: `prog-${body}-house-${run.key}-${run.from.toFixed(2)}`,
          body,
          kind: "house",
          houseNumber: run.key,
          ageStart: run.from,
          ageEnd: run.to + stepYears,
          agePeak: (run.from + run.to) / 2,
        });
      }
    }

    // Sign is Venus's layer. The progressed Moon changes sign every two and a
    // bit years and its sign is not what the model reads it for — the house is
    // — so emitting thirty-odd lunar sign runs would be thirty rows nothing
    // consumes.
    if (body === "Venus") {
      for (const run of runs(samples, (s) => s.sign)) {
        push({
          id: `prog-${body}-sign-${run.key}-${run.from.toFixed(2)}`,
          body,
          kind: "sign",
          sign: run.key,
          ageStart: run.from,
          ageEnd: run.to + stepYears,
          agePeak: (run.from + run.to) / 2,
        });
      }
    }

    const targets =
      body === "Moon"
        ? PROGRESSION_MODEL.moonTargets
        : PROGRESSION_MODEL.venusTargets;

    for (const target of targets) {
      const natal = points.get(target);
      if (natal === undefined) continue;
      // A body's aspect to its own natal place is only meaningful as the
      // return; the square and trine to itself are the same fact restated
      // about where it happens to have got to.
      const wanted =
        body === "Venus" && target === "Venus"
          ? (["Conjunction"] as const)
          : (Object.keys(aspects) as (keyof typeof aspects)[]);

      for (const aspectType of wanted) {
        const angle = aspects[aspectType as keyof typeof aspects];
        let open: { from: number; to: number; orb: number; ageOrb: number } | null = null;

        for (const sample of samples) {
          const orb = Math.abs(separation(sample.longitude, natal) - angle);
          if (orb <= orbDegrees) {
            if (open && sample.age - open.to <= stepYears * 1.5) {
              open.to = sample.age;
              if (orb < open.orb) {
                open.orb = orb;
                open.ageOrb = sample.age;
              }
            } else {
              if (open) {
                push({
                  id: `prog-${body}-${aspectType}-${target}-${open.from.toFixed(2)}`,
                  body,
                  kind: "aspect",
                  aspectType,
                  natalPoint: target,
                  closestOrb: open.orb,
                  ageStart: open.from,
                  ageEnd: open.to,
                  agePeak: open.ageOrb,
                });
              }
              open = { from: sample.age, to: sample.age, orb, ageOrb: sample.age };
            }
          }
        }
        if (open) {
          push({
            id: `prog-${body}-${aspectType}-${target}-${open.from.toFixed(2)}`,
            body,
            kind: "aspect",
            aspectType,
            natalPoint: target,
            closestOrb: open.orb,
            ageStart: open.from,
            ageEnd: open.to,
            agePeak: open.ageOrb,
          });
        }
      }
    }
  }

  events.sort((a, b) => a.ageStart - b.ageStart);

  return {
    chartId: chart.id,
    model: PROGRESSION_MODEL,
    events,
    darkTargets: [...new Set(dark)],
    housed,
  };
}
