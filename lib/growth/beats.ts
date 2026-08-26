/**
 * lib/growth/beats.ts
 *
 * The developmental clock: where the transiting nodes lie back on the natal
 * ones, and what each contact means.
 *
 * Split from `timing.ts` because it is a different kind of knowledge. Nothing
 * here reads an ephemeris, a cache or a chart's transits — the lunar nodes
 * retrograde a full circle in 18.6129 years, so the whole grid falls out of a
 * birth date and arithmetic. That also means the AGES are identical for every
 * person alive; what differs is only what they land on, which is why the
 * readings below are composed from the chart's own arc rather than looked up.
 *
 * Its counterpart, `timing.ts`, holds the pressures: real transits with real
 * dates that no amount of arithmetic will give you. Those are not more clocks
 * — the nodal cycle is the only other genuine period in the model — they are
 * independent forces bearing on the trajectory. Keeping the two in
 * separate files is the same distinction the Activation page makes on screen,
 * and it is the distinction the whole model depends on.
 */

import type { BandStatus } from "@/lib/band";
import type { Trajectory } from "./types";

/**
 * The mean nodal period, in years.
 *
 * The MEAN node, not the true one. The true node oscillates about a degree and
 * a half either side of the mean, which at 19.34° a year is roughly a month of
 * slop — so every date this file produces is good to the month and no better,
 * and nothing here should ever be rendered as a day.
 */
export const NODAL_PERIOD_YEARS = 18.6129;

/** Julian year in ms. Month-precision output makes the choice immaterial. */
export const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;

/**
 * How far either side of exact a beat is still in force.
 *
 * Six months. The node covers about 9.7° in that time, which is roughly the
 * reach of an eclipse season on the axis — so the window is the stretch over
 * which eclipses actually fall on the natal nodes rather than an orb invented
 * to make the band look wider.
 */
const BEAT_WINDOW_YEARS = 0.5;

/**
 * The Uranus return, used as the far end of the grid.
 *
 * A bound has to come from somewhere and 84 at least comes from the same
 * system as everything else, rather than from an actuarial table.
 */
export const LIFESPAN_YEARS = 84;

export type BeatKind = "return" | "reversal" | "square";

export interface NodalBeat {
  kind: BeatKind;
  /** Which pass this is — the second nodal return, the third reversal. */
  ordinal: number;
  /** Exact age at the beat. Displayed rounded; kept precise for sorting. */
  age: number;
  /** ISO date of exactitude. Month-precision truth, day-precision format. */
  date: string;
  /** The season either side of exact, which is what is actually lived. */
  windowStart: string;
  windowEnd: string;
  status: BandStatus;
  /** Composed from this chart's own arc. Not a lookup. */
  reading: string;
}

const BEAT_LABEL: Record<BeatKind, string> = {
  return: "Nodal return",
  reversal: "Nodal reversal",
  square: "Nodal square",
};

export function beatLabel(kind: BeatKind): string {
  return BEAT_LABEL[kind];
}

function iso(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/**
 * What each beat means for THIS axis.
 *
 * Composed rather than looked up, because the interesting part is not that a
 * reversal exists — it is that a reversal puts *this* chart's departing ground
 * back in demand. Written as the mechanism only; what a reversal at 46 feels
 * like as against one at 9 is exactly the long tail the agent should write and
 * a table here should not.
 */
function readingFor(kind: BeatKind, t: Trajectory): string {
  const from = role(t.arc.from);
  const into = role(t.arc.into);

  if (kind === "return") {
    return (
      `The transiting nodes are back where you were born with them. The move ` +
      `toward ${into} is re-issued — the same ${t.to.sign} question, put to ` +
      `someone with more built to answer it. Eclipses fall on the axis ` +
      `through this season, so the ask usually arrives as an event rather ` +
      `than as an idea.`
    );
  }

  if (kind === "reversal") {
    return (
      `The transiting nodes are reversed onto the axis — the transiting north ` +
      `node on your ${t.from.sign} south node. What you already do well as ` +
      `${from} is what circumstances ask for and reward, which makes the pull ` +
      `back situational rather than personal. The competence is real; the ` +
      `question is whether taking the work on trades away the direction.`
    );
  }

  return (
    `The transiting nodes stand square the natal axis. Neither ${from} nor ` +
    `${into} answers what is actually in front of you, so this beat tends to ` +
    `surface the demand that belongs to neither pole.`
  );
}

/**
 * The first half of an arc noun — "Mediator" out of "Mediator / Peacemaker".
 *
 * The archetypes are stored as a pair because the Arc section sets them in
 * caps, where both halves fit and the second sharpens the first. Dropped into
 * a sentence they read as a slash-riddled mouthful — "neither mediator /
 * peacemaker nor leader / commander answers" — so prose takes the head noun
 * and leaves the gloss to the section that has room for it.
 */
function role(archetype: string): string {
  return archetype.split("/")[0].trim();
}

/**
 * The whole lifetime grid, chronologically.
 *
 * Returns and reversals are the axis being contacted end-on; squares are it
 * being crossed. They are all included because leaving the squares out makes
 * the grid look sparser than it is — there is a beat of some kind every 4.65
 * years, which is itself the answer to whether the axis is ever quiet.
 */
export function nodalBeats(
  birthISO: string,
  t: Trajectory,
  now: Date,
  lifespan: number = LIFESPAN_YEARS,
): NodalBeat[] {
  const birth = Date.parse(`${birthISO.slice(0, 10)}T12:00:00Z`);
  if (!Number.isFinite(birth)) return [];

  const out: NodalBeat[] = [];

  const push = (kind: BeatKind, ordinal: number, age: number) => {
    if (age > lifespan) return;
    const at = birth + age * YEAR_MS;
    const windowStart = at - BEAT_WINDOW_YEARS * YEAR_MS;
    const windowEnd = at + BEAT_WINDOW_YEARS * YEAR_MS;
    out.push({
      kind,
      ordinal,
      age,
      date: iso(at),
      windowStart: iso(windowStart),
      windowEnd: iso(windowEnd),
      // The season, not the instant: a beat is "active" for the stretch
      // eclipses can still reach the axis, which is what is lived.
      status:
        now.getTime() < windowStart
          ? "upcoming"
          : now.getTime() > windowEnd
            ? "completed"
            : "active",
      reading: readingFor(kind, t),
    });
  };

  for (let n = 1; n * NODAL_PERIOD_YEARS <= lifespan; n++) {
    push("return", n, n * NODAL_PERIOD_YEARS);
  }
  for (let n = 1; (n - 0.5) * NODAL_PERIOD_YEARS <= lifespan; n++) {
    push("reversal", n, (n - 0.5) * NODAL_PERIOD_YEARS);
  }
  // Quarter and three-quarter points of each turn, so two squares per cycle.
  let squares = 0;
  for (let n = 0; n * NODAL_PERIOD_YEARS <= lifespan; n++) {
    for (const f of [0.25, 0.75]) {
      const age = (n + f) * NODAL_PERIOD_YEARS;
      if (age <= lifespan) push("square", ++squares, age);
    }
  }

  return out.sort((a, b) => a.age - b.age);
}

