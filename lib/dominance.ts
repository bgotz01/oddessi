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
 * The ruler graph: every house points at exactly one other house — the one its
 * ruler sits in. House A's ruler is the ruler of the sign on A's cusp; follow
 * that planet to wherever it is placed and you arrive at the next house.
 *
 * Because each house has exactly one way out, every chain must end in a loop.
 * A loop of one is a self-ruled house (its ruler is at home in it); a loop of
 * two or more is a circuit. Every other house is a feeder: its chain runs
 * downstream until it reaches one of those loops. So the loops are where the
 * chart's rulership finally comes to rest, and what feeds them says how much of
 * the chart is resting there.
 */
export interface RulerLink {
  house: number;
  /** The sign on the cusp, which picks the ruler. */
  cuspSign: string;
  ruler: string;
  /** Where the ruler actually sits. */
  rulerSign: string;
  rulerDegree: string;
  /** The house the ruler sits in — where this house's affairs are carried. */
  livesIn: number;
}

export function rulerMap(chart: Chart, config: Config = DEFAULTS): RulerLink[] {
  const links: RulerLink[] = [];
  for (const cusp of chart.houses) {
    const cuspSign = signOfLongitude(cusp.longitude);
    const ruler = rulerOfSign(cuspSign, config.rulership);
    const placement = chart.placements.find(
      (p) => p.body === ruler && !p.isAngle,
    );
    if (placement?.houseNumber == null) continue;
    links.push({
      house: cusp.number,
      cuspSign,
      ruler,
      rulerSign: placement.sign,
      rulerDegree: placement.degree,
      livesIn: placement.houseNumber,
    });
  }
  return links;
}

/**
 * A closed loop of rulers: house A's ruler lives in B, B's in C, … and the last
 * one's back in A. The areas cannot be moved independently. Any length — two is
 * the common case, but the graph allows longer.
 */
export interface Circuit {
  houses: number[];
  rulers: string[];
  /** One link per house, in loop order — the evidence for each arrow. */
  links: RulerLink[];
  /**
   * Two-house loops only: the two rulers also sit in each other's *signs*, which
   * is mutual reception in the strict, classical sense. A house circuit alone is
   * the looser, house-level version of the same idea.
   */
  signReception: boolean;
  /** Houses outside the loop whose chains run into it, nearest first. */
  feeders: number[];
}

/** A house whose ruler sits in it — a loop of one. */
export interface SelfRuled {
  link: RulerLink;
  feeders: number[];
}

export interface RulerGraph {
  links: RulerLink[];
  circuits: Circuit[];
  selfRuled: SelfRuled[];
}

export function rulerGraph(chart: Chart, config: Config = DEFAULTS): RulerGraph {
  const links = rulerMap(chart, config);
  const byHouse = new Map(links.map((l) => [l.house, l]));

  // Find every loop. Walk from each house until a house repeats; if the walk
  // closed on itself, the repeated stretch is a loop.
  const loopOf = new Map<number, string>();
  const loops = new Map<string, number[]>();
  for (const start of byHouse.keys()) {
    const path: number[] = [];
    let at: number | undefined = start;
    while (at !== undefined && !path.includes(at) && !loopOf.has(at)) {
      path.push(at);
      at = byHouse.get(at)?.livesIn;
    }
    if (at === undefined || loopOf.has(at)) continue;
    const ring = path.slice(path.indexOf(at));
    // Start each loop at its lowest house, so it reads the same every time.
    const lowest = ring.indexOf(Math.min(...ring));
    const ordered = [...ring.slice(lowest), ...ring.slice(0, lowest)];
    const key = ordered.join("-");
    loops.set(key, ordered);
    for (const h of ordered) loopOf.set(h, key);
  }

  // Every house not on a loop drains into one. Record the distance so feeders
  // can be listed nearest first.
  const feeders = new Map<string, { house: number; steps: number }[]>();
  for (const start of byHouse.keys()) {
    if (loopOf.has(start)) continue;
    let at: number | undefined = start;
    let steps = 0;
    while (at !== undefined && !loopOf.has(at) && steps <= 12) {
      at = byHouse.get(at)?.livesIn;
      steps++;
    }
    const key = at === undefined ? undefined : loopOf.get(at);
    if (!key) continue;
    const list = feeders.get(key) ?? [];
    list.push({ house: start, steps });
    feeders.set(key, list);
  }
  const feedersOf = (key: string) =>
    (feeders.get(key) ?? [])
      .sort((a, b) => a.steps - b.steps || a.house - b.house)
      .map((f) => f.house);

  const circuits: Circuit[] = [];
  const selfRuled: SelfRuled[] = [];
  for (const [key, houses] of loops) {
    // `houses`, `rulers` and `links` share one order — each is read off the
    // same `houses` array here, and the readings index all three together.
    const ringLinks = houses.map((h) => byHouse.get(h)!);
    if (houses.length === 1) {
      selfRuled.push({ link: ringLinks[0], feeders: feedersOf(key) });
      continue;
    }
    const [a, b] = ringLinks;
    circuits.push({
      houses,
      rulers: ringLinks.map((l) => l.ruler),
      links: ringLinks,
      signReception:
        houses.length === 2 &&
        rulerOfSign(a.rulerSign, config.rulership) === b.ruler &&
        rulerOfSign(b.rulerSign, config.rulership) === a.ruler,
      feeders: feedersOf(key),
    });
  }

  circuits.sort((x, y) => x.houses[0] - y.houses[0]);
  selfRuled.sort((x, y) => x.link.house - y.link.house);
  return { links, circuits, selfRuled };
}

/**
 * The loops of two or more houses — kept for callers that only want those.
 * What a loop means is `lib/astrology/circuit-interpretations`; this file only
 * says what connects.
 */
export function houseCircuits(chart: Chart, config: Config = DEFAULTS): Circuit[] {
  return rulerGraph(chart, config).circuits;
}
