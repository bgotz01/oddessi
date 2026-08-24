/** 
 * lib/dominance.ts
 * House dominance — which life areas the chart actually leans on.
 *
 * A house gets weight from three independent places, and keeping them separate
 * is the point: a house can be heavy because bodies are sitting in it
 * (occupancy), because its ruler is well placed (ruler strength), or because
 * its ruler is heavily aspected and therefore constantly being triggered by
 * everything else (ruler activity). Three houses can reach the same total by
 * three different routes, and they do not feel remotely alike.
 *
 * Ported from arc's `lib/astrology/signal/house-dominance.ts`. Same weights and
 * same arithmetic, so scores match between the two apps; the difference is that
 * this version is typed against `Chart` instead of `any`, returns results in
 * house order with the rank alongside, and drops the node-emphasis and
 * signature-house branches that only the old scorecard page used.
 */

import type { Chart, Placement } from "@/lib/charts";
import { rulerOfSign, signOfLongitude } from "@/lib/rulership";
import {
  WEIGHT_HEAVY_ABOVE,
  DEFAULT_SCORING as DEFAULTS,
  type ScoringConfig as Config,
  type WeightConfig as W,
} from "@/lib/scoring";

/**
 * The tables that used to live here now live in `lib/scoring`, so weight and
 * ease argue from one editable source rather than two hand-kept copies. They
 * are re-exported because several callers still read them directly, and
 * because a constant's home moving is not a reason to churn every import.
 */
export {
  DEFAULT_SCORING,
  type ScoringConfig,
  type WeightConfig,
} from "@/lib/scoring";

export const ANGULAR = [1, 4, 7, 10];
export const SUCCEDENT = [2, 5, 8, 11];

export interface HouseDominance {
  house: number;
  /** 1 is the most dominant house. */
  rank: number;
  score: number;
  occupancy: number;
  rulerStrength: number;
  rulerActivity: number;
  ruler: string;
  /** The ruler's own placement, when it is in the chart. */
  rulerPlacement: Placement | null;
  /** Why this house scored what it did — at most three lines. */
  reasons: string[];
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Shortest angle between two ecliptic longitudes, 0–180. */
function separation(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

/** Bodies in a house, heaviest first, angles excluded. */
function tenants(chart: Chart, house: number, w: W): Placement[] {
  return chart.placements
    .filter((p) => !p.isAngle && p.houseNumber === house)
    .sort((a, b) => (w.body[b.body] ?? 0) - (w.body[a.body] ?? 0));
}

function occupancyScore(occupants: Placement[], w: W): number {
  let score = occupants.reduce(
    (sum, p, i) =>
      sum + (w.body[p.body] ?? 0) * (w.diminishing[i] ?? w.diminishingTail),
    0,
  );

  // Stellium bonus, on top of the diminished sum and deliberately modest.
  const weighted = occupants.filter((p) => (w.body[p.body] ?? 0) > 0).length;
  score += w.stelliumBonus.find(([count]) => weighted >= count)?.[1] ?? 0;

  return round1(score);
}

/** The four directions. DSC and IC are just the opposite points. */
function anglesOf(chart: Chart): number[] {
  const asc = chart.angles.ascendant;
  const mc = chart.angles.midheaven;
  const out: number[] = [];
  if (asc !== null) out.push(asc, (asc + 180) % 360);
  if (mc !== null) out.push(mc, (mc + 180) % 360);
  return out;
}

function rulerStrengthScore(chart: Chart, ruler: Placement | null, w: W): number {
  if (!ruler || ruler.houseNumber === null) return 0;

  const angular = ANGULAR.includes(ruler.houseNumber);
  let score = angular
    ? w.placement.angular
    : SUCCEDENT.includes(ruler.houseNumber)
      ? w.placement.succedent
      : w.placement.cadent;

  // A ruler sitting on any of the four angles is amplified — but less so if it
  // is already drawing the angular-house bonus, or it gets paid twice over.
  if (ruler.longitude !== null) {
    const orbs = anglesOf(chart).map((a) => separation(ruler.longitude!, a));
    const closest = orbs.length ? Math.min(...orbs) : Infinity;
    const bonus = w.angleBonus.find((b) => closest <= b.within);
    if (bonus) score += angular ? bonus.angular : bonus.otherwise;
  }

  return round1(score);
}

function rulerActivityScore(chart: Chart, ruler: string, w: W): number {
  let score = 0;

  for (const aspect of chart.aspects) {
    if (aspect.planet1 !== ruler && aspect.planet2 !== ruler) continue;
    const orb = Math.abs(aspect.orb);
    if (orb > w.orbLimit) continue;

    score += w.aspect[aspect.type.toLowerCase()] ?? w.aspectDefault;
    score += Math.max(0, w.orbLimit - orb) * w.orbTightness; // tighter is stronger
    const other = aspect.planet1 === ruler ? aspect.planet2 : aspect.planet1;
    if ((other === "Sun" || other === "Moon") && orb <= w.luminary.within) {
      score += w.luminary.bonus;
    }
  }

  return Math.min(round1(score), w.activityCap);
}

function reasonsFor(
  house: number,
  occupants: Placement[],
  chart: Chart,
  ruler: string,
  rulerPlacement: Placement | null,
  activity: number,
): string[] {
  const reasons: string[] = [];

  if (occupants.length >= 3) {
    reasons.push(`Stellium — ${occupants.map((p) => p.body).join(", ")}`);
  } else if (occupants.length > 0) {
    reasons.push(`${occupants.map((p) => p.body).join(" + ")} in house ${house}`);
  }

  if (rulerPlacement?.longitude != null) {
    const asc = chart.angles.ascendant;
    const mc = chart.angles.midheaven;
    const lon = rulerPlacement.longitude;
    const named: Array<[string, number | null]> = [
      ["ASC", asc],
      ["MC", mc],
      ["DSC", asc === null ? null : (asc + 180) % 360],
      ["IC", mc === null ? null : (mc + 180) % 360],
    ];
    const hit = named.find(
      ([, lonAngle]) => lonAngle !== null && separation(lon, lonAngle) <= 5,
    );
    if (hit) {
      reasons.push(`Ruler ${ruler} conjunct ${hit[0]}`);
    } else if (
      rulerPlacement.houseNumber !== null &&
      ANGULAR.includes(rulerPlacement.houseNumber)
    ) {
      reasons.push(`Ruler ${ruler} in an angular house`);
    }
  }

  if (activity >= 8) reasons.push(`Ruler ${ruler} heavily aspected`);

  return reasons.slice(0, 3);
}

/** All twelve, in house order, each carrying its rank among the twelve. */
export function houseDominance(
  chart: Chart,
  config: Config = DEFAULTS,
): HouseDominance[] {
  const w = config.weight;
  const rows = chart.houses.map((cusp) => {
    const occupants = tenants(chart, cusp.number, w);
    const ruler = rulerOfSign(signOfLongitude(cusp.longitude), config.rulership);
    const rulerPlacement =
      chart.placements.find((p) => p.body === ruler && !p.isAngle) ?? null;

    const occupancy = occupancyScore(occupants, w);
    const rulerStrength = rulerStrengthScore(chart, rulerPlacement, w);
    const rulerActivity = rulerActivityScore(chart, ruler, w);

    return {
      house: cusp.number,
      rank: 0,
      score: round1(occupancy + rulerStrength + rulerActivity),
      occupancy,
      rulerStrength,
      rulerActivity,
      ruler,
      rulerPlacement,
      reasons: reasonsFor(
        cusp.number,
        occupants,
        chart,
        ruler,
        rulerPlacement,
        rulerActivity,
      ),
    };
  });

  // Rank by score, then write the rank back onto the house-ordered rows.
  [...rows]
    .sort((a, b) => b.score - a.score)
    .forEach((row, i) => {
      row.rank = i + 1;
    });

  return rows;
}

/**
 * Which of the three components carried a house. Two components within 15 % of
 * each other is not a winner, it is a blend — say so rather than picking one.
 */
export type DominanceMode =
  | "concentrated"
  | "anchored"
  | "networked"
  | "mixed";

/**
 * How much of the chart a house actually carries.
 *
 * Read off the score against fixed thresholds, not off the rank. Rank is an
 * ordinal over a continuous score: it guarantees a heaviest three in every
 * chart whether or not any of them carries much, and in the middle of a chart
 * the gaps between adjacent ranks are routinely under a point. The plot's
 * heavy/light line is `WEIGHT_HEAVY_ABOVE`, and this has to agree with it or
 * the prose and the picture say different things about the same house.
 *
 * Heavy and light, not loud and quiet. What is measured is how much of the
 * chart runs through a house, which is not the same as how visible it is — a
 * heavily emphasised twelfth is structurally central and thoroughly private at
 * the same time.
 */
export type Prominence = "heavy" | "present" | "light";

/** Below this a house is carrying very little of the chart. */
export const WEIGHT_LIGHT_BELOW = 15;

export function prominence(score: number): Prominence {
  if (score >= WEIGHT_HEAVY_ABOVE) return "heavy";
  if (score >= WEIGHT_LIGHT_BELOW) return "present";
  return "light";
}

/**
 * What each mode means, with no claim about how much rides on it. This is the
 * wording the calculation modal lists, where the modes are being defined
 * rather than applied to any particular house.
 */
export const MODE_GLOSS: Record<DominanceMode, string> = {
  concentrated: "The bodies sitting in the house carry it.",
  anchored: "Its ruler's placement carries it.",
  networked: "Its ruler's aspect traffic carries it.",
  mixed: "No single component carries it.",
};

/**
 * Mode × prominence. Kept to a similar length on purpose — these sit at the
 * foot of twelve cards in a row, and a note that wraps to four lines where its
 * neighbour takes two drags that card's whole layout out of line with the rest.
 */
export const MODE_NOTE: Record<DominanceMode, Record<Prominence, string>> = {
  concentrated: {
    heavy: "Heavy with the bodies sitting in it.",
    present: "Carried by the bodies sitting in it.",
    light: "Light; what it has comes from its tenants.",
  },
  anchored: {
    heavy: "Heavy because its ruler is strongly placed.",
    present: "Carried by where its ruler is placed.",
    light: "Light; what it has is its ruler's placement.",
  },
  networked: {
    heavy: "Heavy because its ruler is wired to everything.",
    present: "Carried by its ruler's aspect traffic.",
    light: "Light; what it has is its ruler's aspects.",
  },
  mixed: {
    heavy: "Heavy from more than one direction at once.",
    present: "Fed from more than one direction at once.",
    light: "Light, with no one component leading.",
  },
};

export function dominanceMode(
  d: HouseDominance,
  config: Config = DEFAULTS,
): DominanceMode {
  const ranked = [
    ["concentrated", d.occupancy],
    ["anchored", d.rulerStrength],
    ["networked", d.rulerActivity],
  ] as const;
  const [first, second] = [...ranked].sort((a, b) => b[1] - a[1]);
  if (first[1] > 0 && first[1] - second[1] <= first[1] * config.weight.mixedMargin)
    return "mixed";
  return first[0];
}

/** The note as it should be shown for a specific house. */
export function modeNote(d: HouseDominance): string {
  return MODE_NOTE[dominanceMode(d)][prominence(d.score)];
}

/**
 * Mutual reception loops: house A's ruler lives in house B, whose ruler lives
 * back in house A. The two life areas cannot be moved independently.
 */
export interface Circuit {
  houses: number[];
  rulers: string[];
}

export function houseCircuits(
  chart: Chart,
  config: Config = DEFAULTS,
): Circuit[] {
  const map = new Map<number, { ruler: string; livesIn: number }>();
  for (const cusp of chart.houses) {
    const ruler = rulerOfSign(signOfLongitude(cusp.longitude), config.rulership);
    const placement = chart.placements.find(
      (p) => p.body === ruler && !p.isAngle,
    );
    if (placement?.houseNumber != null) {
      map.set(cusp.number, { ruler, livesIn: placement.houseNumber });
    }
  }

  const circuits: Circuit[] = [];
  const seen = new Set<string>();

  const record = (houses: number[]) => {
    const key = [...houses].sort((a, b) => a - b).join("-");
    if (seen.has(key)) return;
    seen.add(key);
    circuits.push({
      houses,
      rulers: houses.map((h) => map.get(h)!.ruler),
    });
  };

  for (const [a, dataA] of map) {
    const b = dataA.livesIn;
    const dataB = map.get(b);
    if (!dataB || a === b) continue;

    // Two-house loop: each ruler is a guest in the other's house.
    if (dataB.livesIn === a) {
      record([a, b]);
      continue;
    }

    // Three-house loop: A → B → C → A.
    const c = dataB.livesIn;
    const dataC = map.get(c);
    if (!dataC || c === a || c === b) continue;
    if (dataC.livesIn === a) record([a, b, c]);
  }

  return circuits;
}
