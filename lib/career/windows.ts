/**
 * Career windows — categorical configurations beneath the numeric curve.
 *
 * The index and the windows answer different questions:
 *
 *   INDEX    how much of the career architecture is activated
 *   WINDOW   what configuration of evidence is present
 *
 * No score threshold promotes a window. The grades are structural:
 *
 *   ACTIVE        at least one career contact
 *   CONVERGENCE   at least two independent transiting planets
 *   TURNING POINT at least two independent planets aspecting the core itself —
 *                 the MC or the ruler of the 10th — at the same time
 *
 * The top grade is “turning point” and was once “breakthrough”, which is the
 * one word here a chart cannot support. A chart can observe intensity,
 * convergence, coverage, persistence and simultaneity; it cannot observe a
 * breakthrough. An enormous Saturn–Pluto–Uranus configuration on the Midheaven
 * is as consistent with a resignation, a restructuring, a demotion or a
 * collapse as with a promotion — all of them turning points, only some of them
 * breakthroughs. The grade names the SHAPE and never guesses which way it
 * resolves.
 *
 * These rules and the process vocabulary are exported so the method modal can
 * expose or adjust them without parsing prose.
 */

import { birthMsOf, isoAtAge } from "./time";
import type { CareerContact, CareerPoint } from "./model";

export const CAREER_WINDOW_MODEL = {
  version: 2,
  independentPlanetsForConvergence: 2,
  /**
   * Two independent bodies ON THE CORE, by aspect.
   *
   * Version 1 asked for convergence anywhere plus one core contact plus either
   * a direct MC hit or two layers. On a real chart that is the DEFAULT state:
   * five slow bodies are always in contact with something, a fourteen-year
   * Neptune transit of the tenth supplies a second layer for a seventh of a
   * life, and the result was 129 turning points in ninety years — one every
   * eight months, which is not what the word can mean.
   *
   * The rule is now the claim itself: two INDEPENDENT slow bodies addressing
   * the MC or the ruler of the tenth AT THE SAME TIME, by aspect. A house
   * transit does not qualify a body for this — spending years crossing the
   * tenth is a colour on a period, not an address on the axis.
   */
  independentCorePlanetsForTurningPoint: 2,
  /**
   * Below this a run is a sampling artefact, not a season.
   *
   * Contacts open and close between two quarterly samples, which produced
   * dozens of one-sample windows too thin to click and meaningless to read.
   */
  minimumWindowYears: 0.5,
  processes: {
    Jupiter: "Opportunity",
    Saturn: "Consolidation",
    Uranus: "Reorientation",
    Neptune: "Calling",
    Pluto: "Reinvention",
  },
} as const;

export type CareerWindowGrade = "active" | "convergence" | "turningPoint";
export type CareerProcess =
  (typeof CAREER_WINDOW_MODEL.processes)[keyof typeof CAREER_WINDOW_MODEL.processes];

export interface CareerWindow {
  id: string;
  grade: CareerWindowGrade;
  ageStart: number;
  ageEnd: number;
  start: string;
  end: string;
  activation: number;
  peak: CareerPoint;
  contacts: CareerContact[];
  processes: CareerProcess[];
  status: "completed" | "active" | "upcoming";
}

export const CAREER_WINDOW_LABEL: Record<CareerWindowGrade, string> = {
  active: "Active",
  convergence: "Convergence",
  turningPoint: "Turning point",
};

/**
 * What each grade claims, in the words the modal and the chat both read from.
 *
 * Written here rather than in a component so a reference describing a rule the
 * code no longer applies is not possible — these sit next to the rule itself.
 */
export const CAREER_WINDOW_MEANING: Record<CareerWindowGrade, string> = {
  active:
    "At least one slow body is in contact with the vocational architecture. One address, one process — the ordinary state of a working life rather than a turning point.",
  convergence:
    "Two or more independent bodies are in contact at once. Independence is the whole claim: one planet making three contacts is not a convergence, because it is one process wearing three hats.",
  turningPoint:
    "Two or more INDEPENDENT bodies aspecting the core — the MC or the ruler of the 10th — at the same time. A SHAPE, not a total and not a direction: a window with four contacts on the machinery and nothing on the core never reaches it however loud the index goes, and a body merely transiting the 10th does not qualify. It says the vocational structure is being reorganised, never which way it resolves — the same configuration covers a resignation, a restructuring, a relocation, a launch and a collapse.",
};

export function careerWindowLabel(grade: CareerWindowGrade): string {
  return CAREER_WINDOW_LABEL[grade];
}

export function careerWindowMeaning(grade: CareerWindowGrade): string {
  return CAREER_WINDOW_MEANING[grade];
}

/** An aspect contact on the MC or the ruler of the 10th. The core addresses. */
function onCore(contact: CareerContact): boolean {
  return (
    contact.aspect !== null &&
    (contact.targetKind === "midheaven" || contact.targetKind === "tenthRuler")
  );
}

function configurationOf(point: CareerPoint): {
  grade: CareerWindowGrade | null;
  planets: string[];
} {
  if (point.contacts.length === 0) return { grade: null, planets: [] };
  const planets = [...new Set(point.contacts.map((contact) => contact.planet))].sort();
  const corePlanets = new Set(
    point.contacts.filter(onCore).map((contact) => contact.planet),
  );
  const converging =
    planets.length >= CAREER_WINDOW_MODEL.independentPlanetsForConvergence;
  const turningPoint =
    corePlanets.size >= CAREER_WINDOW_MODEL.independentCorePlanetsForTurningPoint;
  return {
    grade: turningPoint ? "turningPoint" : converging ? "convergence" : "active",
    planets,
  };
}

function statusOf(start: string, end: string, now: Date): CareerWindow["status"] {
  const iso = now.toISOString().slice(0, 10);
  if (iso < start) return "upcoming";
  if (iso > end) return "completed";
  return "active";
}

/**
 * Build contiguous runs of one configuration.
 *
 * A run continues while the grade holds AND the sample still shares at least
 * one contact with the sample before it. The continuity test is what keeps the
 * two failure modes apart.
 *
 * Requiring an IDENTICAL planet set — version 1's rule — broke the run every
 * time any of five slow bodies entered or left any contact, which shattered a
 * life into 188 windows averaging six months each. Requiring nothing at all
 * would thread a fourteen-year Neptune transit of the tenth through unrelated
 * Saturn and Jupiter contacts into one window spanning most of a working life.
 * Shared-contact overlap is the middle: a season persists while something in it
 * persists, and ends when the whole cast has turned over.
 */
export function careerWindows(
  points: CareerPoint[],
  birthISO: string,
  now: Date,
  /**
   * Ages below this are dropped rather than graded.
   *
   * A run of Neptune through the 10th that opens at age four and closes at
   * eleven is a real transit and not a career window, and calling it one puts
   * "Convergence, ages 4–11" in a list a reader is meant to plan against. A
   * run that STRADDLES the floor is kept whole — a season that begins at
   * twelve and runs to nineteen is the first vocational one, and clipping its
   * start would misdate it.
   */
  floorAge = 0,
): CareerWindow[] {
  const birthMs = birthMsOf(birthISO);
  const step = points[1]?.age - points[0]?.age || 0.25;
  const runs: { points: CareerPoint[]; grade: CareerWindowGrade; signature: string }[] = [];

  for (const point of points) {
    const configuration = configurationOf(point);
    if (!configuration.grade) continue;
    const previous = runs[runs.length - 1];
    const last = previous?.points[previous.points.length - 1];
    const adjacent = last !== undefined && point.age - last.age <= step * 1.1;
    const overlaps =
      last !== undefined &&
      point.contacts.some((contact) =>
        last.contacts.some((earlier) => earlier.id === contact.id),
      );
    if (previous && adjacent && overlaps && previous.grade === configuration.grade) {
      previous.points.push(point);
    } else {
      runs.push({
        points: [point],
        grade: configuration.grade,
        signature: configuration.planets.join(","),
      });
    }
  }

  const vocational = runs.filter(
    (run) =>
      run.points[run.points.length - 1].age >= floorAge &&
      run.points[run.points.length - 1].age - run.points[0].age + step >=
        CAREER_WINDOW_MODEL.minimumWindowYears,
  );

  return vocational.map((run, index) => {
    const first = run.points[0];
    const last = run.points[run.points.length - 1];
    const ageStart = Math.max(0, first.age - step / 2);
    const ageEnd = last.age + step / 2;
    const peak = run.points.reduce((best, point) => point.value > best.value ? point : best);
    const contacts = [...new Map(
      run.points.flatMap((point) => point.contacts).map((contact) => [contact.id, contact]),
    ).values()];
    const processes = [...new Set(
      contacts.flatMap((contact) => {
        const process = CAREER_WINDOW_MODEL.processes[
          contact.planet as keyof typeof CAREER_WINDOW_MODEL.processes
        ];
        return process ? [process] : [];
      }),
    )];
    const start = isoAtAge(birthMs, ageStart);
    const end = isoAtAge(birthMs, ageEnd);
    return {
      id: `career-window-${index}-${start}`,
      grade: run.grade,
      ageStart,
      ageEnd,
      start,
      end,
      activation: peak.value,
      peak,
      contacts,
      processes,
      status: statusOf(start, end, now),
    };
  });
}
