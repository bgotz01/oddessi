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
 *
 * MULTIPLICITY IS DELIBERATELY SMALL, and it used to be three times this.
 * Convergence counts distinct slow planets and multiplicity counts contacts,
 * and the two move together nearly always: two planets on the axis raise both,
 * so one underlying fact — several major contacts at once — was being paid for
 * twice. Keeping both is right, because a single planet making four contacts
 * is genuinely different from four planets making one each; paying them
 * equally was not. The share moved to convergence, which is the half of that
 * pair carrying the information.
 *
 * These are judgements, not measurements, and they are stated here as
 * constants so they can be argued with rather than reverse-engineered.
 */
export const SHARES = {
  directness: 35,
  convergence: 30,
  rhythm: 15,
  coverage: 10,
  multiplicity: 5,
  persistence: 5,
} as const;

export type Ingredient = keyof typeof SHARES;

/**
 * Whole theories of what makes a period consequential, as weight sets.
 *
 * Six sliders is an instrument nobody can play blind: a reader who nudges
 * directness from 35 to 38 learns nothing, because the interesting differences
 * between weightings are not small. Each preset below is an argument someone
 * could actually hold about this model, taken to the point where it visibly
 * changes the curve — which is the only way to find out whether you agree with
 * it.
 *
 * They change the LINE and never the BARS. A season's grade counts independent
 * pressures and asks whether one lands on the axis itself; it reads no weights
 * at all, so the same seasons sit in the same years under every preset. That
 * is the model's two axes made visible: turn the sliders and watch magnitude
 * move while configuration stays put.
 */
export const SHARE_PRESETS: {
  id: string;
  label: string;
  /** The claim this weighting makes, in one line. */
  thesis: string;
  shares: Record<Ingredient, number>;
}[] = [
  {
    id: "balanced",
    label: "Balanced",
    thesis:
      "What reorganises a direction is something aimed at it while other pressures are already in play. The shipped weighting.",
    shares: {
      directness: 35,
      convergence: 30,
      rhythm: 15,
      coverage: 10,
      multiplicity: 5,
      persistence: 5,
    },
  },
  {
    id: "contact",
    label: "Contact-led",
    thesis:
      "Only what lands on the axis itself counts. A transit through a nodal house is context, not pressure — so the curve stays flat until something arrives on the degree.",
    shares: {
      directness: 55,
      convergence: 25,
      rhythm: 5,
      coverage: 10,
      multiplicity: 3,
      persistence: 2,
    },
  },
  {
    id: "convergence",
    label: "Convergence-led",
    thesis:
      "A period is made by independent pressures coinciding, not by any one of them aiming well. Rewards pile-ups and reads a lone exact hit as ordinary.",
    shares: {
      directness: 15,
      convergence: 45,
      rhythm: 5,
      coverage: 10,
      multiplicity: 20,
      persistence: 5,
    },
  },
  {
    id: "rhythm",
    label: "Rhythm-led",
    thesis:
      "The nodal cycle is the developmental metronome and transits merely colour the beat. Peaks land near 9, 18, 28, 37, 46 and 56 — the same ages for everybody, which is either the point or the objection.",
    shares: {
      directness: 25,
      convergence: 20,
      rhythm: 45,
      coverage: 5,
      multiplicity: 3,
      persistence: 2,
    },
  },
];

/**
 * A set of shares. The shipped `SHARES` are one of these; the tuner makes others.
 *
 * They do not have to add to a hundred. Every consumer normalises by their own
 * total, so a share is a statement about an ingredient's weight RELATIVE to
 * the others, and the index stays 0–100 whatever the sliders say. Without that
 * the first drag past a hundred would produce a 114 out of 100.
 */
export type Shares = Record<Ingredient, number>;

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

import { PRESSURE_PLANETS } from "./activation-interpretations";

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
  shares: Shares = SHARES,
): { value: number; parts: Parts } {
  /**
   * Only the pressure planets count toward the number.
   *
   * Every ingredient below reads from this list rather than from everything
   * running, because the index measures how hard the trajectory is being
   * PRESSED and Jupiter does not press — see `PRESSURE_PLANETS`. It stays in
   * `activations` on the point, so the interface can still name it as a
   * driver; it simply does not move the number.
   */
  const pressing = activations.filter((a) => PRESSURE_PLANETS.has(a.planet));

  if (pressing.length === 0 && beats.length === 0) {
    const parts = Object.fromEntries(
      Object.keys(shares).map((k) => [k, 0]),
    ) as Parts;
    return { value: 0, parts };
  }

  const directness = pressing.reduce(
    (m, a) => Math.max(m, DIRECTNESS[a.kind]),
    0,
  );

  const independent = new Set(pressing.map((a) => a.planet)).size;

  // Both poles implicated, or one. A crossroads contact carries "both" on its
  // own, which is the whole point of a square to an axis.
  const sides = new Set<string>();
  for (const a of pressing) {
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

  const retrogrades = pressing.reduce(
    (m, a) => Math.max(m, a.segments.length - 1),
    0,
  );

  const parts: Parts = {
    directness: shares.directness * directness,
    convergence: shares.convergence * upTo(independent, 3),
    multiplicity: shares.multiplicity * upTo(pressing.length, 4),
    rhythm: shares.rhythm * rhythm,
    coverage: shares.coverage * upTo(sides.size, 2),
    persistence: shares.persistence * upTo(retrogrades, 3),
  };

  // Normalised by the shares' own total, so the index is out of a hundred
  // whatever the weights are set to. With the shipped shares the divisor is a
  // hundred and this is a no-op.
  const total = Object.values(shares).reduce((a, b) => a + b, 0) || 1;
  const value = (Object.values(parts).reduce((a, b) => a + b, 0) * 100) / total;
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
/**
 * The floor of High pressure.
 *
 * Named because two files reason about it: the bands below, and the rule in
 * `activation.ts` deciding which seasons are worth interpreting. Those were
 * two independently maintained sixties, and the comment on the second one
 * still described the old vocabulary — "the floor of strong convergence" —
 * which is a season word for a magnitude threshold, in a model whose whole
 * point is that the two are different axes.
 */
export const HIGH_PRESSURE = 60;

export const BANDS: { from: number; label: string }[] = [
  { from: 80, label: "Exceptional" },
  { from: HIGH_PRESSURE, label: "High" },
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
  shares: Shares = SHARES,
): IntensityCurve {
  const raw: IntensityPoint[] = [];

  for (let a = 0; a <= lifespan; a += STEP) {
    const acts = activations.filter((x) => a >= x.ageStart && a <= x.ageEnd);
    const bts = beats.filter((b) => a >= b.age - 0.5 && a <= b.age + 0.5);
    const { value, parts } = intensityAt(acts, bts, shares);
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
