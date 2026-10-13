import type { Chart } from "@/lib/charts";
import { birthMsOf, isoAtAge, YEAR_MS } from "@/lib/chart-time";

/**
 * The progressed Sun's walk through the signs, ported from arc's Sun
 * Progression Timeline.
 *
 * Secondary progression: a day after birth stands for a year of life, so the
 * Sun advances about one degree a year and spends about thirty years in each
 * sign. The real daily motion runs 0.95° in July to 1.02° in January, so a
 * mean rate puts an ingress up to a year off. Ingresses are instead solved
 * against the Sun's true motion in the days after birth (see `solarLongitude`),
 * which dates them to within a few days.
 */

const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

/** Mean solar motion, degrees per day — so degrees per progressed year. */
export const SUN_RATE = 0.9856;

const JD_UNIX_EPOCH = 2440587.5;
const DAY_MS = 86_400_000;
const RAD = Math.PI / 180;

/**
 * Apparent geocentric longitude of the Sun, in degrees, NOT wrapped to 360.
 *
 * Meeus' low-precision theory (Astronomical Algorithms, ch. 25): good to about
 * 0.01°. Swiss Ephemeris is server-only and this runs in the browser; it is
 * only ever used for the Sun's *advance* from the birth instant, where most of
 * the error cancels, and 0.01° of progressed Sun is about four days of life.
 * Left unwrapped so a difference across 0° Aries is still a plain subtraction.
 */
function solarLongitude(jd: number): number {
  const T = (jd - 2451545) / 36525;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * RAD;
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M);
  const omega = (125.04 - 1934.136 * T) * RAD;
  return L0 + C - 0.00569 - 0.00478 * Math.sin(omega);
}

/** How far ahead the timeline runs. */
const HORIZON = 90;

export interface SunPhase {
  sign: string;
  /** Age the progressed Sun enters the sign; 0 for the natal sign. */
  entryAge: number;
  /** Age it leaves; past the horizon for the last one. */
  exitAge: number;
  /** Calendar dates of the same, ISO day. */
  start: string;
  end: string;
  state: "past" | "current" | "ahead";
  /** How far through the sign, 0–1, for the one in force. */
  progress: number | null;
  /** Degree of the sign the Sun is at on entry — the natal degree for the first, else 0. */
  startDegree: number;
}

export type StageName = "early" | "middle" | "late";

/** A ten-degree third of a sign, dated for one phase. */
export interface SunStage {
  phase: StageName;
  entryAge: number;
  exitAge: number;
  state: "past" | "current" | "ahead";
}

const STAGES: [StageName, number, number][] = [
  ["early", 0, 10],
  ["middle", 10, 20],
  ["late", 20, 30],
];

/**
 * Early / middle / late within one phase, as ages.
 *
 * The natal sign starts part-way through, so stages the Sun had already
 * passed at birth are dropped and the one it was born in is cut short.
 * Boundaries are interpolated across the phase's true span — the Sun's speed
 * barely changes inside one sign, and this keeps the last stage ending exactly
 * where the phase does.
 */
export function stagesOf(phase: SunPhase, age: number): SunStage[] {
  const out: SunStage[] = [];
  const perDegree =
    (phase.exitAge - phase.entryAge) / (30 - phase.startDegree);
  for (const [name, lo, hi] of STAGES) {
    if (hi <= phase.startDegree) continue;
    const entryAge =
      phase.entryAge +
      (Math.max(lo, phase.startDegree) - phase.startDegree) * perDegree;
    const exitAge = phase.entryAge + (hi - phase.startDegree) * perDegree;
    out.push({
      phase: name,
      entryAge,
      exitAge,
      state: age >= exitAge ? "past" : age >= entryAge ? "current" : "ahead",
    });
  }
  return out;
}

export interface SunProgression {
  natalSign: string;
  natalDegree: string;
  age: number;
  /** The progressed Sun's position now. */
  progressedSign: string;
  progressedDegree: number;
  phases: SunPhase[];
}

export function sunProgression(
  chart: Chart,
  now: Date = new Date(),
): SunProgression | null {
  const sun = chart.placements.find((p) => p.body === "Sun");
  if (!sun || sun.longitude == null) return null;

  const birthMs = birthMsOf(chart.birth.date);
  const age = (now.getTime() - birthMs) / YEAR_MS;

  // A year of life is a day of ephemeris: the progressed Sun at age `a` is
  // the natal Sun plus however far the real Sun moved in the `a` days after
  // birth. Anchored on the stored natal longitude, so the birth instant only
  // has to be close enough to sit on the right stretch of the Sun's orbit.
  const birthJd = birthMs / DAY_MS + JD_UNIX_EPOCH;
  const birthSun = solarLongitude(birthJd);
  const advance = (a: number) => solarLongitude(birthJd + a) - birthSun;

  /** The age the progressed Sun has advanced `deg` degrees — Newton on a near-line. */
  const ageAt = (deg: number) => {
    let a = deg / SUN_RATE;
    for (let pass = 0; pass < 8; pass++) {
      const step = (deg - advance(a)) / SUN_RATE;
      a += step;
      if (Math.abs(step) < 1e-5) break; // ~5 minutes of life
    }
    return a;
  };

  const natalIndex = Math.floor(sun.longitude / 30);
  const toFirstCusp = 30 - (sun.longitude % 30);

  const phases: SunPhase[] = [];
  let entry = 0;
  let exit = ageAt(toFirstCusp);
  for (let i = 0; entry <= HORIZON; i++) {
    const state = age >= exit ? "past" : age >= entry ? "current" : "ahead";
    phases.push({
      sign: SIGNS[(natalIndex + i) % 12],
      entryAge: entry,
      exitAge: exit,
      start: isoAtAge(birthMs, entry),
      end: isoAtAge(birthMs, exit),
      state,
      progress: state === "current" ? (age - entry) / (exit - entry) : null,
      startDegree: i === 0 ? sun.longitude % 30 : 0,
    });
    entry = exit;
    exit = ageAt(toFirstCusp + 30 * (i + 1));
  }

  const progressed = (sun.longitude + advance(age)) % 360;
  return {
    natalSign: sun.sign,
    natalDegree: sun.degree,
    age,
    progressedSign: SIGNS[Math.floor(progressed / 30)],
    progressedDegree: progressed % 30,
    phases,
  };
}
