import type { Chart } from "@/lib/charts";
import { birthMsOf, isoAtAge, YEAR_MS } from "@/lib/chart-time";

/**
 * The progressed Sun's walk through the signs, ported from arc's Sun
 * Progression Timeline.
 *
 * Secondary progression: a day after birth stands for a year of life, so the
 * Sun advances about one degree a year and spends about thirty years in each
 * sign. The rate is the Sun's MEAN daily motion — the real one runs 0.95° in
 * July to 1.02° in January — so an ingress can land a year either side of the
 * age given here. Good enough to name the chapter; not to date its first day.
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
 */
export function stagesOf(phase: SunPhase, age: number): SunStage[] {
  const out: SunStage[] = [];
  for (const [name, lo, hi] of STAGES) {
    if (hi <= phase.startDegree) continue;
    const entryAge =
      phase.entryAge +
      (Math.max(lo, phase.startDegree) - phase.startDegree) / SUN_RATE;
    const exitAge = phase.entryAge + (hi - phase.startDegree) / SUN_RATE;
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

  const natalIndex = Math.floor(sun.longitude / 30);
  const firstExit = (30 - (sun.longitude % 30)) / SUN_RATE;
  const signYears = 30 / SUN_RATE;

  const phases: SunPhase[] = [];
  let entry = 0;
  let exit = firstExit;
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
    exit += signYears;
  }

  const progressed = (sun.longitude + age * SUN_RATE) % 360;
  return {
    natalSign: sun.sign,
    natalDegree: sun.degree,
    age,
    progressedSign: SIGNS[Math.floor(progressed / 30)],
    progressedDegree: progressed % 30,
    phases,
  };
}
