//lib/career/signature.ts

import type {
  CareerFactorReading,
  CareerSnapshot,
} from "./snapshot";

export interface CareerSignature {
  /** Behind the scenes → Public-facing */
  visibility: number;

  /** Analytical → Creative */
  approach: number;

  /** People → Systems */
  orientation: number;

  /** The strongest chart-specific contributors to each coordinate. */
  reasons: Record<CareerSignatureAxis, string[]>;

  /** Context that is displayed beside, but never included in, the scores. */
  flags: CareerSignatureFlag[];
}

export type CareerSignatureAxis = "visibility" | "approach" | "orientation";

export interface CareerSignatureFlag {
  id: "northNodeTenth";
  label: string;
  text: string;
}

/* -------------------------------------------------------------------------- */
/*  Weighting                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * The 10th ruler carries the most interpretive weight.
 *
 * The MC describes the vocational direction, while planets actually occupying
 * the 10th materially modify it.
 *
 * Supporting factors speak more quietly.
 */
const FACTOR_WEIGHT: Record<CareerFactorReading["kind"], number> = {
  midheaven: 1,
  tenthRuler: 1,
  tenthTenant: 0.75,
  saturn: 0.35,
  sun: 0.35,
  sixthRuler: 0.3,
  secondRuler: 0.25,
  jupiter: 0.25,
};

/* -------------------------------------------------------------------------- */
/*  Math                                                                      */
/* -------------------------------------------------------------------------- */

function clamp(value: number): number {
  return Math.max(-1, Math.min(1, value));
}

function weightedMean(
  factors: CareerFactorReading[],
  score: (factor: CareerFactorReading) => number,
): number {
  let total = 0;
  let weight = 0;

  for (const factor of factors) {
    const value = score(factor);

    if (!Number.isFinite(value)) continue;

    const w = FACTOR_WEIGHT[factor.kind];

    total += value * w;
    weight += w;
  }

  return weight ? clamp(total / weight) : 0;
}

function strongestReasons(
  factors: CareerFactorReading[],
  score: (factor: CareerFactorReading) => number,
  describe: (factor: CareerFactorReading, value: number) => string,
): string[] {
  const seen = new Set<string>();

  const reasons = factors
    .map((factor) => {
      const value = score(factor);
      return {
        text: describe(factor, value),
        strength: Math.abs(value * FACTOR_WEIGHT[factor.kind]),
      };
    })
    .filter(({ text, strength }) => text && strength > 0)
    .sort((a, b) => b.strength - a.strength)
    .flatMap(({ text }) => {
      if (seen.has(text)) return [];
      seen.add(text);
      return [text];
    })
    .slice(0, 3);

  return reasons.length
    ? reasons
    : ["No strong chart factors pull this axis in either direction."];
}

function placementSubject(factor: CareerFactorReading): string {
  return factor.kind === "midheaven"
    ? `Midheaven in ${factor.placement}`
    : factor.placement;
}

/* -------------------------------------------------------------------------- */
/*  Visibility                                                                */
/* -------------------------------------------------------------------------- */

/**
 * BEHIND THE SCENES ←→ PUBLIC-FACING
 *
 * Visibility is primarily a house question.
 *
 * IMPORTANT:
 * The MC itself is neutral here. Every timed chart has an MC, so its mere
 * existence cannot distinguish one person's visibility from another's.
 *
 * Instead we look at where the vocational factors actually operate.
 */
function visibilityOf(
  factor: CareerFactorReading,
): number {
  if (factor.kind === "midheaven") {
    return 0;
  }

  switch (factor.house) {
    case 10:
      return 1;

    case 11:
      return 0.7;

    case 7:
      return 0.6;

    case 1:
      return 0.5;

    case 5:
      return 0.35;

    case 9:
      return 0.3;

    case 3:
      return 0.05;

    case 8:
      return -0.25;

    case 2:
      return -0.4;

    case 6:
      return -0.55;

    case 4:
      return -0.75;

    case 12:
      return -1;

    default:
      return 0;
  }
}

function visibilityReason(
  factor: CareerFactorReading,
  value: number,
): string {
  if (!factor.house || value === 0) return "";

  const direction = value < 0 ? "behind-the-scenes work" : "a public-facing role";
  return `${placementSubject(factor)} favors ${direction}.`;
}

/* -------------------------------------------------------------------------- */
/*  Approach                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * ANALYTICAL ←→ CREATIVE
 *
 * Approach asks what kind of thinking / production is emphasized by the
 * vocational architecture.
 *
 * Planetary symbolism carries most of the meaning.
 * Signs and houses modify rather than determine the result.
 *
 * Negative = analytical.
 * Positive = creative.
 */

const BODY_APPROACH: Partial<Record<string, number>> = {
  Mercury: -0.8,
  Saturn: -0.65,
  Mars: -0.2,

  Jupiter: 0.15,
  Sun: 0.45,
  Venus: 0.7,
  Neptune: 0.85,
};

const SIGN_APPROACH: Partial<Record<string, number>> = {
  Virgo: -0.65,
  Capricorn: -0.45,
  Gemini: -0.35,
  Aquarius: -0.2,

  Sagittarius: 0.15,
  Cancer: 0.2,
  Libra: 0.35,
  Pisces: 0.55,
  Leo: 0.6,
};

const HOUSE_APPROACH: Partial<Record<number, number>> = {
  6: -0.5,
  3: -0.35,
  2: -0.15,

  9: 0.15,
  1: 0.15,
  10: 0.2,
  12: 0.3,
  5: 0.65,
};

function approachOf(
  factor: CareerFactorReading,
): number {
  let total = 0;
  let weight = 0;

  /*
   * Body is the strongest evidence for the faculty being expressed.
   */
  if (factor.body) {
    const body = BODY_APPROACH[factor.body];

    if (body != null) {
      total += body * 0.55;
      weight += 0.55;
    }
  }

  /*
   * Sign describes how that faculty operates.
   */
  if (factor.sign) {
    const sign = SIGN_APPROACH[factor.sign];

    if (sign != null) {
      total += sign * 0.3;
      weight += 0.3;
    }
  }

  /*
   * House provides context for where/how it is expressed.
   */
  if (factor.house != null) {
    const house = HOUSE_APPROACH[factor.house];

    if (house != null) {
      total += house * 0.15;
      weight += 0.15;
    }
  }

  return weight ? clamp(total / weight) : 0;
}

function approachReason(
  factor: CareerFactorReading,
  value: number,
): string {
  if (value === 0) return "";

  const direction = value < 0 ? "an analytical approach" : "a creative approach";

  return `${placementSubject(factor)} favors ${direction}.`;
}

/* -------------------------------------------------------------------------- */
/*  Orientation                                                               */
/* -------------------------------------------------------------------------- */

/**
 * PEOPLE ←→ SYSTEMS
 *
 * Orientation asks what the vocational architecture primarily engages with.
 *
 * Negative = people: relationships, clients, audiences, teams, teaching,
 * negotiation, care, or interpersonal exchange.
 *
 * Positive = systems: data, processes, structures, technology, operations,
 * technical problems, or abstract systems.
 */
const BODY_ORIENTATION: Partial<Record<string, number>> = {
  Moon: -0.8,
  Venus: -0.7,
  Jupiter: -0.35,
  Sun: -0.15,

  Mars: 0.15,
  Mercury: 0.55,
  Uranus: 0.7,
  Saturn: 0.75,
};

const SIGN_ORIENTATION: Partial<Record<string, number>> = {
  Cancer: -0.65,
  Libra: -0.6,
  Leo: -0.25,
  Pisces: -0.2,

  Gemini: 0.15,
  Scorpio: 0.2,
  Aquarius: 0.55,
  Virgo: 0.6,
  Capricorn: 0.65,
};

const HOUSE_ORIENTATION: Partial<Record<number, number>> = {
  7: -0.75,
  11: -0.5,
  5: -0.25,

  2: 0.15,
  3: 0.2,
  8: 0.35,
  6: 0.6,
};

function orientationOf(
  factor: CareerFactorReading,
): number {
  let total = 0;
  let weight = 0;

  if (factor.body) {
    const body = BODY_ORIENTATION[factor.body];

    if (body != null) {
      total += body * 0.55;
      weight += 0.55;
    }
  }

  if (factor.sign) {
    const sign = SIGN_ORIENTATION[factor.sign];

    if (sign != null) {
      total += sign * 0.3;
      weight += 0.3;
    }
  }

  if (factor.house != null) {
    const house = HOUSE_ORIENTATION[factor.house];

    if (house != null) {
      total += house * 0.15;
      weight += 0.15;
    }
  }

  return weight ? clamp(total / weight) : 0;
}

function orientationReason(
  factor: CareerFactorReading,
  value: number,
): string {
  if (value === 0) return "";

  const direction = value < 0
    ? "a people-oriented vocation"
    : "a systems-oriented vocation";

  return `${placementSubject(factor)} favors ${direction}.`;
}

/* -------------------------------------------------------------------------- */
/*  Non-scoring context                                                       */
/* -------------------------------------------------------------------------- */

function careerFlags(
  snapshot: CareerSnapshot,
): CareerSignatureFlag[] {
  const node = snapshot.development.northNode;

  if (node?.house !== 10) return [];

  const position = [node.sign, node.degree]
    .filter((part): part is string => Boolean(part))
    .join(" ");

  return [{
    id: "northNodeTenth",
    label: "Growth direction",
    text: `North Node${position ? ` in ${position}` : ""} in the 10th house points toward greater development through vocation, public contribution, responsibility, or recognition.`,
  }];
}

/* -------------------------------------------------------------------------- */
/*  Signature                                                                 */
/* -------------------------------------------------------------------------- */

export function careerSignature(
  snapshot: CareerSnapshot,
): CareerSignature {
  const factors = snapshot.factors;

  return {
    visibility: weightedMean(
      factors,
      visibilityOf,
    ),

    approach: weightedMean(
      factors,
      approachOf,
    ),

    orientation: weightedMean(
      factors,
      orientationOf,
    ),

    reasons: {
      visibility: strongestReasons(
        factors,
        visibilityOf,
        visibilityReason,
      ),
      approach: strongestReasons(
        factors,
        approachOf,
        approachReason,
      ),
      orientation: strongestReasons(
        factors,
        orientationOf,
        orientationReason,
      ),
    },

    flags: careerFlags(snapshot),
  };
}
