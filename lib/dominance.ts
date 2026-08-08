/**
 * House dominance — which life areas the chart actually leans on.
 *
 * A house gets weight from three independent places, and keeping them separate
 * is the point: a house can be loud because bodies are sitting in it
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
import { MODERN_RULER, signOfLongitude } from "@/lib/rulership";

/** Weight by body. Nodes and Chiron are reference points, not actors — zero. */
const BODY_WEIGHT: Record<string, number> = {
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
};

const ASPECT_WEIGHT: Record<string, number> = {
  conjunction: 3,
  opposition: 2.5,
  square: 2.5,
  trine: 2,
  sextile: 1.5,
};

/**
 * Each extra body in a house counts for less. Without this a five-planet
 * stellium wins every chart it appears in, which tells you nothing.
 */
const DIMINISHING = [1.0, 0.7, 0.5, 0.3, 0.3, 0.3];

const ANGULAR = [1, 4, 7, 10];
const SUCCEDENT = [2, 5, 8, 11];

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
function tenants(chart: Chart, house: number): Placement[] {
  return chart.placements
    .filter((p) => !p.isAngle && p.houseNumber === house)
    .sort((a, b) => (BODY_WEIGHT[b.body] ?? 0) - (BODY_WEIGHT[a.body] ?? 0));
}

function occupancyScore(occupants: Placement[]): number {
  let score = occupants.reduce(
    (sum, p, i) => sum + (BODY_WEIGHT[p.body] ?? 0) * (DIMINISHING[i] ?? 0.2),
    0,
  );

  // Stellium bonus, on top of the diminished sum and deliberately modest.
  const weighted = occupants.filter((p) => (BODY_WEIGHT[p.body] ?? 0) > 0).length;
  if (weighted >= 5) score += 7;
  else if (weighted >= 4) score += 5;
  else if (weighted >= 3) score += 3;

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

function rulerStrengthScore(chart: Chart, ruler: Placement | null): number {
  if (!ruler || ruler.houseNumber === null) return 0;

  const angular = ANGULAR.includes(ruler.houseNumber);
  let score = angular ? 8 : SUCCEDENT.includes(ruler.houseNumber) ? 5 : 3;

  // A ruler sitting on any of the four angles is amplified — but less so if it
  // is already drawing the angular-house bonus, or it gets paid twice over.
  if (ruler.longitude !== null) {
    const orbs = anglesOf(chart).map((a) => separation(ruler.longitude!, a));
    const closest = orbs.length ? Math.min(...orbs) : Infinity;
    if (closest <= 5) score += angular ? 4 : 5;
    else if (closest <= 8) score += angular ? 2 : 3;
  }

  return round1(score);
}

function rulerActivityScore(chart: Chart, ruler: string): number {
  let score = 0;

  for (const aspect of chart.aspects) {
    if (aspect.planet1 !== ruler && aspect.planet2 !== ruler) continue;
    const orb = Math.abs(aspect.orb);
    if (orb > 6) continue;

    score += ASPECT_WEIGHT[aspect.type.toLowerCase()] ?? 2;
    score += Math.max(0, 6 - orb) * 0.3; // tighter is stronger
    const other = aspect.planet1 === ruler ? aspect.planet2 : aspect.planet1;
    if ((other === "Sun" || other === "Moon") && orb <= 4) score += 2;
  }

  return Math.min(round1(score), 15);
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
export function houseDominance(chart: Chart): HouseDominance[] {
  const rows = chart.houses.map((cusp) => {
    const occupants = tenants(chart, cusp.number);
    const ruler = MODERN_RULER[signOfLongitude(cusp.longitude)] ?? "Sun";
    const rulerPlacement =
      chart.placements.find((p) => p.body === ruler && !p.isAngle) ?? null;

    const occupancy = occupancyScore(occupants);
    const rulerStrength = rulerStrengthScore(chart, rulerPlacement);
    const rulerActivity = rulerActivityScore(chart, ruler);

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
 * Kept to a similar length on purpose — these sit at the foot of twelve cards
 * in a row, and a note that wraps to four lines where its neighbour takes two
 * drags that card's whole layout out of line with the rest.
 */
export const MODE_NOTE: Record<DominanceMode, string> = {
  concentrated: "Loud because bodies are sitting in it.",
  anchored: "Loud because its ruler is strongly placed.",
  networked: "Loud because its ruler is wired to everything.",
  mixed: "Loud from more than one direction at once.",
};

export function dominanceMode(d: HouseDominance): DominanceMode {
  const ranked = [
    ["concentrated", d.occupancy],
    ["anchored", d.rulerStrength],
    ["networked", d.rulerActivity],
  ] as const;
  const [first, second] = [...ranked].sort((a, b) => b[1] - a[1]);
  if (first[1] > 0 && first[1] - second[1] <= first[1] * 0.15) return "mixed";
  return first[0];
}

/**
 * Mutual reception loops: house A's ruler lives in house B, whose ruler lives
 * back in house A. The two life areas cannot be moved independently.
 */
export interface Circuit {
  houses: number[];
  rulers: string[];
}

export function houseCircuits(chart: Chart): Circuit[] {
  const map = new Map<number, { ruler: string; livesIn: number }>();
  for (const cusp of chart.houses) {
    const ruler = MODERN_RULER[signOfLongitude(cusp.longitude)] ?? "Sun";
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
