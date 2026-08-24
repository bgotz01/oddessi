/**
 * lib/scoring.ts
 * Scoring — every number the house models argue from, in one place.
 *
 * Weight and ease used to keep their own constants, which meant the tables that
 * decide a reading were scattered across two modules and hand-copied a third
 * time into the explainer modal. They are conventions, not facts about the sky,
 * and conventions belong somewhere a person can read end to end and change.
 *
 * Nothing here computes. `lib/dominance` and `lib/ease` take a config and apply
 * it; this file only says what the numbers are and offers a few coherent sets
 * of them. That split is what makes the presets meaningful — swapping a preset
 * cannot change the arithmetic, only its inputs.
 */

import type { Dignity } from "@/lib/interpretation";
import type { Rulership } from "@/lib/rulership";

export interface WeightConfig {
  /** Weight by body. Nodes and Chiron are reference points, not actors — zero. */
  body: Record<string, number>;
  aspect: Record<string, number>;
  /** Any aspect type not named above. */
  aspectDefault: number;
  /** Multiplier for the nth heaviest body in a house. */
  diminishing: number[];
  /** Every body past the end of that list. */
  diminishingTail: number;
  /** Weighted-body count → bonus, heaviest threshold first. */
  stelliumBonus: ReadonlyArray<readonly [count: number, bonus: number]>;
  /** What a ruler is worth for sitting in each kind of house. */
  placement: { angular: number; succedent: number; cadent: number };
  /** On top of placement when the ruler is near one of the four angles. */
  angleBonus: ReadonlyArray<{ within: number; angular: number; otherwise: number }>;
  /** Aspects wider than this are ignored entirely. */
  orbLimit: number;
  /** Added per degree the orb falls inside the limit. */
  orbTightness: number;
  /** Extra for an aspect to the Sun or Moon inside this orb. */
  luminary: { within: number; bonus: number };
  /** Activity alone cannot run away with the total. */
  activityCap: number;
  /** Two components within this fraction of each other is a blend, not a winner. */
  mixedMargin: number;
}

export interface EaseConfig {
  /** Aspect character, −1 (hardest) to +1 (easiest). */
  aspect: Record<string, number>;
  /** Benefic / malefic. Drives conjunctions and, now, tenancy. */
  nature: Record<string, number>;
  /** How much a sign helps or hinders the body standing in it. */
  dignity: Record<Dignity, number>;
  /**
   * How the three components divide the score. They need not sum to 1 — the
   * result is normalised — but keeping them close to it makes the numbers
   * comparable with earlier readings.
   */
  share: { aspects: number; dignity: number; tenancy: number };
  /**
   * How much good dignity blunts a malefic, 0–1.
   *
   * Only applies to bodies whose nature is negative and whose sign helps them.
   * A well-placed malefic is the classical case the flat model could not say
   * anything about: an exalted Mars is still Mars, but far less of its harm
   * lands than a Mars in fall. Benefics are left alone here — a fallen Venus is
   * handled by the dignity component, which already docks it.
   */
  temperMalefics: number;
  /**
   * A ruler that also occupies the house it rules, as a multiplier.
   *
   * This used to be an implicit 2×, produced by the ruler being pushed into
   * the same array it was already in. The reinforcement is real — ruling a
   * room you also live in is a genuine doubling of say — but a magnitude that
   * emerges from array duplication is an assumption nobody can see or test.
   */
  rulerIsTenantReinforcement: number;
  /** Beyond ±this a house is called one way or the other. */
  band: number;
  /**
   * Below this much *evidence* there is nothing to read.
   *
   * Evidence counts every enabled component, not aspects alone. An exalted
   * planet physically sitting in a house is a reading even if nothing aspects
   * it, and calling that "sparse" was the model refusing to look at what it
   * could see.
   *
   * Carried over at 6 from when it meant aspect mass alone, which is a
   * different quantity — a single Mars tenant now contributes 8 on its own, so
   * any house holding a personal planet is effectively never sparse. That is
   * probably right, but it is an untested new calibration rather than an
   * inherited one, and wants a few dozen charts behind it before it is trusted.
   */
  sparseBelow: number;
}

/**
 * The weight axis, as an absolute scale rather than a per-chart one.
 *
 * Plotting a chart against its own min and max meant the axis rescaled every
 * time a preset changed the scores, so a house could appear to move right while
 * its score had actually fallen — the others had simply fallen further. Nothing
 * could be compared to anything. A fixed ceiling costs a little horizontal
 * range and buys comparability between presets and between charts.
 *
 * 50 is a practical ceiling, not a theoretical one: the arithmetic can reach
 * about 67 for a five-planet house with an angular, heavily aspected ruler, but
 * nothing near that occurs in an ordinary chart. Anything above is pinned to
 * the end rather than allowed to stretch the axis for everyone else.
 */
export const WEIGHT_AXIS_MAX = 50;

/**
 * At or above this, a house carries a lot in absolute terms.
 *
 * Half of the axis, and deliberately not a rank cut. Rank guarantees that every
 * chart has a heaviest three houses whether or not any of them carries much;
 * an absolute line lets a flat chart honestly show none, and lets two charts be
 * held against each other.
 */
export const WEIGHT_HEAVY_ABOVE = 25;

export interface ScoringConfig {
  id: string;
  label: string;
  /** Two or three words for a switcher tile, where the full note will not fit. */
  summary: string;
  note: string;
  /**
   * Which table answers for a cusp. Not a detail: swapping it changes a
   * house's ruler, and with it both ruler strength and ruler activity — two
   * thirds of that house's weight. Worth far more testing than any single
   * coefficient.
   */
  rulership: Rulership;
  weight: WeightConfig;
  ease: EaseConfig;
}

// ── The baseline ────────────────────────────────────────────────────────────

const BASE_WEIGHT: WeightConfig = {
  body: {
    Sun: 10,
    Moon: 10,
    Mercury: 8,
    Venus: 8,
    Mars: 8,
    Jupiter: 6,
    Saturn: 6,
    Uranus: 4,
    Neptune: 4,
    Pluto: 4,
    "North Node": 0,
    "South Node": 0,
    Chiron: 0,
    Lilith: 0,
  },
  aspect: {
    conjunction: 3,
    opposition: 2.5,
    square: 2.5,
    trine: 2,
    sextile: 1.5,
    // Named so they stop falling through to the default, where a semisextile
    // outscored a sextile.
    quincunx: 1.25,
    semisquare: 1,
    sesquisquare: 1,
    semisextile: 0.75,
  },
  aspectDefault: 1,
  /**
   * Gentler than the first calibration, which suppressed multi-planet houses
   * hard and then handed much of the weight back through a categorical bonus.
   * Letting the planets themselves carry it means a five-body house outranks a
   * three-body one without needing a patch to say so.
   */
  diminishing: [1.0, 0.85, 0.7, 0.55, 0.45, 0.35],
  diminishingTail: 0.3,
  /** Small now that diminishing does the work it was compensating for. */
  stelliumBonus: [
    [5, 4],
    [4, 2],
    [3, 1],
  ],
  placement: { angular: 8, succedent: 5, cadent: 3 },
  angleBonus: [
    { within: 5, angular: 4, otherwise: 5 },
    { within: 8, angular: 2, otherwise: 3 },
  ],
  orbLimit: 6,
  orbTightness: 0.3,
  luminary: { within: 4, bonus: 2 },
  /**
   * Raised, because the point of a "networked" house is that its ruler is
   * unusually wired in — and at 15 several rulers in an ordinary chart already
   * flattened against the ceiling, so the component stopped telling them apart.
   */
  activityCap: 18,
  mixedMargin: 0.15,
};

const BASE_EASE: EaseConfig = {
  aspect: {
    trine: 1,
    sextile: 0.6,
    semisextile: 0.2,
    // Stays 0: the engine derives a conjunction's character from the nature of
    // the body being joined, which is the only honest reading of one.
    conjunction: 0,
    quincunx: -0.4,
    semisquare: -0.35,
    sesquisquare: -0.4,
    opposition: -0.9,
    square: -1,
  },
  /**
   * The moderns are neutral by default. Tradition rates four bodies and stops;
   * giving Uranus, Neptune and Pluto a negative valence is an interpretive
   * addition, and an addition does not belong in the baseline. It lives in the
   * "Modern psychological" preset instead, where it can be argued with.
   *
   * The classical four are also pulled in from ±1. Tenancy carries 30 % of ease
   * on its own; a planet's generic nature should not rival its entire aspect
   * structure.
   */
  nature: {
    Venus: 0.8,
    Jupiter: 0.9,
    Sun: 0.3,
    Moon: 0.3,
    Mercury: 0,
    Mars: -0.65,
    Saturn: -0.8,
    Uranus: 0,
    Neptune: 0,
    Pluto: 0,
    Chiron: 0,
    "North Node": 0,
    "South Node": 0,
    Lilith: 0,
  },
  dignity: {
    Ruling: 1,
    Exaltation: 0.75,
    Neutral: 0,
    Detriment: -0.75,
    Fall: -1,
  },
  share: { aspects: 0.45, dignity: 0.25, tenancy: 0.3 },
  temperMalefics: 0.5,
  rulerIsTenantReinforcement: 1.5,
  band: 0.15,
  sparseBelow: 6,
};

/** Structured clone, so a preset can never hand out a shared mutable table. */
function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

export const PRESETS: ScoringConfig[] = [
  {
    id: "tenancy",
    label: "Baseline",
    summary: "modern · tenancy on",
    note:
      "Modern rulership, neutral outer planets, and tenancy counted: who lives " +
      "in a house registers even when unaspected, tempered by how well the sign " +
      "treats them.",
    rulership: "modern",
    weight: clone(BASE_WEIGHT),
    ease: clone(BASE_EASE),
  },
  {
    id: "traditional",
    label: "Traditional",
    summary: "traditional rulership",
    note:
      "Scorpio answers to Mars, Aquarius to Saturn, Pisces to Jupiter. Changes " +
      "which body carries a house and so moves two thirds of its weight — by " +
      "far the largest swing available, and the one worth testing before any " +
      "coefficient.",
    rulership: "traditional",
    weight: clone(BASE_WEIGHT),
    ease: clone(BASE_EASE),
  },
  {
    id: "psychological",
    label: "Modern Psychological",
    summary: "outers given valence",
    note:
      "Gives Uranus, Neptune and Pluto a disruptive valence rather than none. " +
      "An interpretive addition tradition never made, so it sits here instead " +
      "of in the baseline — it is an argument, not an inheritance.",
    rulership: "modern",
    weight: clone(BASE_WEIGHT),
    ease: {
      ...clone(BASE_EASE),
      nature: {
        ...clone(BASE_EASE.nature),
        Uranus: -0.4,
        Neptune: -0.3,
        Pluto: -0.6,
        Chiron: -0.4,
      },
    },
  },
  {
    id: "no-tenancy",
    label: "No Tenancy",
    summary: "aspects + dignity only",
    note:
      "Ease from aspects and dignity only, as before tenancy existed. An " +
      "unaspected Saturn in a neutral sign reads as nothing at all. Kept as the " +
      "control: it is what every reading before today was made against.",
    rulership: "modern",
    weight: clone(BASE_WEIGHT),
    ease: {
      ...clone(BASE_EASE),
      share: { aspects: 0.65, dignity: 0.35, tenancy: 0 },
      temperMalefics: 0,
    },
  },
  {
    id: "tenancy-heavy",
    label: "Tenancy First",
    summary: "tenancy 50 %",
    note:
      "Who lives in a house outweighs what they are wired to. The least " +
      "forgiving of a badly placed malefic, and the sharpest test of whether a " +
      "house that reads hard in life reads hard here.",
    rulership: "modern",
    weight: clone(BASE_WEIGHT),
    ease: {
      ...clone(BASE_EASE),
      share: { aspects: 0.3, dignity: 0.2, tenancy: 0.5 },
    },
  },
];

export const DEFAULT_SCORING: ScoringConfig = PRESETS[0];

export function presetById(id: string): ScoringConfig | undefined {
  return PRESETS.find((p) => p.id === id);
}

/** A deep copy, so an editor can mutate freely without touching a preset. */
export function copyScoring(config: ScoringConfig): ScoringConfig {
  return clone(config);
}

/**
 * A stringify that sorts keys, so two identical configs compare equal whatever
 * order their keys happen to be in.
 *
 * Plain `JSON.stringify` is order-sensitive and the config makes a round trip
 * through a Postgres `jsonb` column, which normalises key order on write. A
 * config that had merely been saved and reloaded therefore compared unequal to
 * the preset it was an exact copy of, and every stored config reported itself
 * as hand-edited.
 */
function canonical(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(",")}}`;
}

/**
 * Whether a config still matches the preset it claims to be.
 *
 * `rulership` has to be in the comparison: it is not a display field, it picks
 * which body answers for every cusp, and leaving it out let a config switched
 * from modern to traditional keep reporting itself as unmodified. `label` and
 * `note` stay out — they are prose about the preset, not part of it.
 */
export function matchesPreset(config: ScoringConfig): boolean {
  const preset = presetById(config.id);
  if (!preset) return false;
  const shape = (c: ScoringConfig) => ({
    rulership: c.rulership,
    weight: c.weight,
    ease: c.ease,
  });
  return canonical(shape(preset)) === canonical(shape(config));
}
