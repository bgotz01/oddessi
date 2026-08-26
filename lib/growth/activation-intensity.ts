/**
 * lib/growth/activation-intensity.ts
 *
 * How densely the growth axis is being activated, as a continuous curve.
 *
 * The graded bands — background, active, convergence, turning point — answer a
 * categorical question well and a comparative one badly. A long dense
 * convergence can matter more than a narrowly-defined turning point, and the
 * bands cannot say so: they put both in a box and the boxes have no order that
 * survives contact with a real chart. A curve can.
 *
 * WHAT THE NUMBER IS AND IS NOT. It measures how strongly the natal growth
 * trajectory is implicated at a moment. It is NOT a measure of how important,
 * difficult, eventful or good a period will be, and every surface that shows
 * it has to say so — "85" reads as "85% important" unless something stops it.
 * The safety of the metric comes entirely from that restriction: it is a
 * statement about the chart's geometry, which is knowable, rather than about a
 * life, which is not.
 *
 * WHY IT IS NOT PLANET WEIGHTS. The obvious construction — Pluto 30, Saturn
 * 20, Jupiter 10 — is pseudo-precision, and worse, it would make the curve a
 * ranking of planetary power rather than a reading of this axis. The
 * ingredients below are all structural facts about the relationship between a
 * transit and the trajectory, and not one of them asks which planet it is:
 *
 *   DIRECTNESS   is the node degree itself being hit, or its ruler, or the
 *                ground it stands in, or merely its house
 *   MULTIPLICITY how many contacts are running at once
 *   CONVERGENCE  how many INDEPENDENT pressures — distinct slow planets —
 *                rather than one planet making several contacts
 *   RHYTHM       whether the nodal cycle is in season at the same time
 *   COVERAGE     one pole implicated, or the whole axis
 *   PERSISTENCE  whether contacts repeat by retrograde rather than passing once
 *
 * The shares are stated as constants and travel with every point, so the
 * number can be taken apart on screen. A score whose composition is hidden is
 * a horoscope with a decimal point.
 */

import type { Activation } from "./activation";
import type { ActivationKind } from "./activation";
import type { NodalBeat } from "./beats";

/**
 * How much each ingredient can contribute, out of 100.
 *
 * Round numbers, and deliberately few. The two largest are directness and
 * convergence because those are the two that distinguish a trajectory being
 * reorganised from one merely being busy — which is the distinction the bands
 * were already making and the curve has to preserve.
 */
export const SHARES = {
  directness: 30,
  convergence: 25,
  multiplicity: 15,
  rhythm: 15,
  coverage: 10,
  persistence: 5,
} as const;

export type Ingredient = keyof typeof SHARES;

export const INGREDIENT_LABEL: Record<Ingredient, string> = {
  directness: "Directness",
  convergence: "Independent pressures",
  multiplicity: "Contacts at once",
  rhythm: "Nodal rhythm",
  coverage: "Axis coverage",
  persistence: "Persistence",
};

/**
 * What each ingredient is actually counting.
 *
 * The bars are the argument for the number — a score whose composition can be
 * inspected is an argument, one whose composition is hidden is a horoscope
 * with a decimal point — but "Directness · 24" is only an argument to someone
 * who already knows what directness means here. One sentence each, in the
 * register of the rest of the page rather than of this file.
 */
export const INGREDIENT_GLOSS: Record<Ingredient, string> = {
  directness:
    "Whether a planet is contacting the growth axis itself rather than the structures around it.",
  convergence:
    "How many independent slow planets are involved, rather than one planet making several contacts.",
  multiplicity: "How many contacts are running at the same moment.",
  rhythm:
    "Whether the nodal cycle — the same checkpoints for everybody — is in season while this happens.",
  coverage:
    "Whether one end of the axis is implicated or the whole of it.",
  persistence:
    "Whether contacts come back by retrograde rather than passing over once.",
};

/**
 * How direct a claim each kind of contact makes.
 *
 * The same ordering the addresses already carry, expressed as a proportion so
 * it can be scaled. A hit on the node degree is the only kind that can be said
 * to touch the trajectory itself; everything else touches its machinery, at
 * decreasing remove.
 */
const DIRECTNESS: Record<ActivationKind, number> = {
  axis: 1,
  ruler: 0.6,
  ground: 0.5,
  house: 0.35,
};

/** Independence is a property of distinct slow planets — see activation-windows. */
const PROMOTING = new Set(["Saturn", "Uranus", "Neptune", "Pluto"]);

/** Saturating ratio: n of max, never above 1. */
function upTo(n: number, max: number): number {
  return Math.min(n, max) / max;
}

export type Parts = Record<Ingredient, number>;

export interface IntensityPoint {
  age: number;
  /** 0–100, rounded. */
  value: number;
  /** What the value is made of, each already scaled by its share. */
  parts: Parts;
  activations: Activation[];
  beats: NodalBeat[];
}

/**
 * The intensity at one moment, and what it is made of.
 *
 * Exported because the breakdown is shown on screen: a reader can point at a
 * peak and see that it is 30 of directness and 25 of convergence rather than
 * being asked to trust a number.
 */
export function intensityAt(
  activations: Activation[],
  beats: NodalBeat[],
): { value: number; parts: Parts } {
  if (activations.length === 0 && beats.length === 0) {
    const parts = Object.fromEntries(
      Object.keys(SHARES).map((k) => [k, 0]),
    ) as Parts;
    return { value: 0, parts };
  }

  const directness = activations.reduce(
    (m, a) => Math.max(m, DIRECTNESS[a.kind]),
    0,
  );

  const independent = new Set(
    activations.filter((a) => PROMOTING.has(a.planet)).map((a) => a.planet),
  ).size;

  // Both poles implicated, or one. A crossroads contact carries "both" on its
  // own, which is the whole point of a square to an axis.
  const sides = new Set<string>();
  for (const a of activations) {
    if (a.orientation === "crossroads") sides.add("arriving").add("departing");
    else if (a.orientation === "forward") sides.add("arriving");
    else if (a.orientation === "return") sides.add("departing");
  }

  // A return or reversal puts the axis itself back in season; a square is the
  // lesser beat and is scored as such rather than being dropped.
  const rhythm = beats.length
    ? beats.some((b) => b.kind !== "square")
      ? 1
      : 0.6
    : 0;

  const retrogrades = activations.reduce(
    (m, a) => Math.max(m, a.segments.length - 1),
    0,
  );

  const parts: Parts = {
    directness: SHARES.directness * directness,
    convergence: SHARES.convergence * upTo(independent, 3),
    multiplicity: SHARES.multiplicity * upTo(activations.length, 4),
    rhythm: SHARES.rhythm * rhythm,
    coverage: SHARES.coverage * upTo(sides.size, 2),
    persistence: SHARES.persistence * upTo(retrogrades, 3),
  };

  const value = Object.values(parts).reduce((a, b) => a + b, 0);
  return { value: Math.round(value), parts };
}

// ─── The curve ───────────────────────────────────────────────────────────────

/** Quarter-year sampling, matching the window sweep. */
const STEP = 0.25;

/**
 * Smoothing width, in samples either side.
 *
 * Cosmetic and honest at the same time. The raw series steps whenever a
 * contact opens or closes, so it reads as a staircase rather than a curve —
 * and a staircase implies the model can tell March from June, which it cannot:
 * the beats come from the mean node and are good to about a month. Averaging
 * over roughly a year presents the resolution the material actually has.
 */
const SMOOTH = 2;

export interface IntensityPeak {
  age: number;
  value: number;
}

export interface IntensityCurve {
  points: IntensityPoint[];
  /** Local maxima worth annotating, strongest first. */
  peaks: IntensityPeak[];
  /** The highest value anywhere in the life. The curve's own ceiling. */
  max: number;
  /** Where the present sits. Null outside the modelled span. */
  now: IntensityPoint | null;
}

/**
 * Bands, for turning a number back into words.
 *
 * The labels describe how implicated the trajectory is and nothing else. None
 * of them says good, hard, or important, and the ceiling is "exceptional
 * concentration" rather than "exceptional period" for exactly that reason.
 */
/**
 * The index in words. LEVELS, never trends.
 *
 * "Building" and "Stirring" sat at the two middle steps for a while and both
 * are verbs: a reader shown "Pressure · Building" beside a line that has been
 * falling for six months reasonably concludes the label is describing the
 * line's direction, and it was describing its height. Where the line is GOING
 * is a separate reading and is now stated separately — see `trendAt`. Every
 * word here answers only "how much".
 */
export const BANDS: { from: number; label: string }[] = [
  { from: 80, label: "Exceptional" },
  { from: 60, label: "High" },
  { from: 40, label: "Moderate" },
  { from: 20, label: "Low" },
  { from: 0, label: "Quiet" },
];

export function bandLabel(value: number): string {
  return BANDS.find((b) => value >= b.from)?.label ?? BANDS[BANDS.length - 1].label;
}

/**
 * Which way the index is moving, over the last half year.
 *
 * The question the band cannot answer and a reader asks immediately: a
 * moderate reading on the way up and a moderate reading on the way down are
 * the same height and not the same period. Six months back rather than a year,
 * because the curve is sampled quarterly and a year of hindsight smooths away
 * the turn that has just happened.
 *
 * The threshold is three points. Below that the difference is inside the
 * model's own resolution, and reporting it would be inventing a direction out
 * of rounding.
 */
export function trendAt(
  points: IntensityPoint[],
  age: number,
): "rising" | "easing" | "steady" | null {
  const at = (a: number) =>
    points.reduce<IntensityPoint | null>(
      (best, p) =>
        !best || Math.abs(p.age - a) < Math.abs(best.age - a) ? p : best,
      null,
    );
  const now = at(age);
  const before = at(age - 0.5);
  if (!now || !before || Math.abs(now.age - before.age) < 0.2) return null;
  const change = now.value - before.value;
  if (change > 3) return "rising";
  if (change < -3) return "easing";
  return "steady";
}

/**
 * A peak has to clear this to be annotated.
 *
 * Below it the curve is describing an ordinary stretch of a life, and labelling
 * those would put words on noise — the same mistake the activation strip made
 * when every quarter got its own grade.
 */
const PEAK_FLOOR = 45;

/**
 * How far apart two peaks must be, in years, to both be worth naming, and how
 * many may be named at all.
 *
 * Both are about the label, not the maths. Four years looked right against the
 * curve and wrong against the text: "TURNING POINT" is thirteen characters and
 * three of them landed on top of each other between ages 45 and 57, so the
 * annotation that was meant to explain the peaks obscured them instead.
 */
const PEAK_SPACING = 7;
const MAX_PEAKS = 6;

export function activationCurve(
  activations: Activation[],
  beats: NodalBeat[],
  age: number,
  lifespan: number,
): IntensityCurve {
  const raw: IntensityPoint[] = [];

  for (let a = 0; a <= lifespan; a += STEP) {
    const acts = activations.filter((x) => a >= x.ageStart && a <= x.ageEnd);
    const bts = beats.filter((b) => a >= b.age - 0.5 && a <= b.age + 0.5);
    const { value, parts } = intensityAt(acts, bts);
    raw.push({ age: a, value, parts, activations: acts, beats: bts });
  }

  // Smooth the value only. The activations and beats attached to a point stay
  // exactly what was in force at that moment, because they are evidence and
  // averaging evidence would be nonsense.
  const points = raw.map((p, i) => {
    const from = Math.max(0, i - SMOOTH);
    const to = Math.min(raw.length - 1, i + SMOOTH);
    let sum = 0;
    for (let j = from; j <= to; j++) sum += raw[j].value;
    return { ...p, value: Math.round(sum / (to - from + 1)) };
  });

  // Local maxima, thinned so two shoulders of one rise are not named twice.
  const candidates = points.filter((p, i) => {
    if (p.value < PEAK_FLOOR) return false;
    const from = Math.max(0, i - 4);
    const to = Math.min(points.length - 1, i + 4);
    for (let j = from; j <= to; j++) if (points[j].value > p.value) return false;
    return true;
  });

  const peaks: IntensityPeak[] = [];
  for (const c of [...candidates].sort((a, b) => b.value - a.value)) {
    if (peaks.some((p) => Math.abs(p.age - c.age) < PEAK_SPACING)) continue;
    peaks.push({ age: c.age, value: c.value });
  }

  return {
    points,
    peaks: peaks.slice(0, MAX_PEAKS).sort((a, b) => a.age - b.age),
    max: points.reduce((m, p) => Math.max(m, p.value), 0),
    now:
      age >= 0 && age <= lifespan
        ? (points.reduce((best, p) =>
            Math.abs(p.age - age) < Math.abs(best.age - age) ? p : best,
          ) ?? null)
        : null,
  };
}
