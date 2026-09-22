/**
 * lib/synastry/activation.ts
 *
 * WHAT EACH PERSON SWITCHES ON IN THE OTHER — and the argument that this is the
 * part of the reading worth having.
 *
 * Cross-chart aspects are symmetric: a square is a square from both ends, and
 * every dimension in `dimensions.ts` therefore scores the same for both people.
 * That is a true thing to measure and an incomplete one, because a relationship
 * is very rarely the same relationship for the two people in it. Houses are
 * where the asymmetry lives. A's planets fall in some region of B's chart and
 * B's fall in some region of A's, and the two regions have no obligation to
 * match.
 *
 * So: if A's bodies pile into B's 7th and 8th while B's bodies pile into A's
 * 9th and 11th, then A meets B as Partnership × Intimacy and B meets A as
 * Horizon × Belonging. Neither is wrong, and neither is the relationship. Both
 * at once is the relationship.
 *
 * THIS SECTION NEEDS A BIRTH TIME AND CANNOT FAKE ONE
 * Houses come from the cusps, the cusps come from the Ascendant, and the
 * Ascendant moves a degree every four minutes. A chart saved without a time has
 * no cusps at all, and there is no honest degraded version of this reading — a
 * whole-sign fallback would silently answer a different question and look
 * identical on screen. So each direction reports `available: false` and the
 * page says which chart is missing what. This follows the precedent set by the
 * transit block in `lib/chart-context.ts`, which refuses to estimate a date it
 * does not have.
 *
 * Note the direction of the dependency: A→B needs B's birth time, not A's. It
 * is B's houses being fallen into. One exact chart and one approximate one
 * still yields one readable direction, and the page shows it.
 */

import { houseOfLongitude, type Chart } from "@/lib/charts";
import { BODY_WEIGHT, SYNASTRY_BODIES, housed } from "./contacts";

/**
 * The twelve fields, named for what it is like to have someone land in one.
 *
 * Deliberately not `HOUSE_CATEGORIES` from `lib/astrology/house-categories.ts`,
 * whose titles ("Values & Resources", "Work & Health") are written to describe
 * a region of one's own chart. The question here is different and so is the
 * grammar: these names have to finish the sentence "she switches on his ___",
 * which "Work & Health" does not. One word each, so two of them can be crossed
 * into a phrase without the phrase becoming a paragraph.
 */
export interface Field {
  house: number;
  name: string;
  gloss: string;
}

export const FIELDS: Record<number, Field> = {
  1: { house: 1, name: "Presence", gloss: "bearing, first instinct, how one arrives" },
  2: { house: 2, name: "Worth", gloss: "values, resources, what feels solid" },
  3: { house: 3, name: "Exchange", gloss: "talk, daily traffic, thinking aloud" },
  4: { house: 4, name: "Home", gloss: "roots, privacy, emotional ground" },
  // "romance" was the original word here and is now "delight". The field is
  // shown under every lens, and a family reading that told someone their
  // father's Sun lands in their romance field would be both wrong and
  // unpleasant. Delight covers the romantic case without naming it.
  5: { house: 5, name: "Play", gloss: "delight, making things, being enjoyed" },
  6: { house: 6, name: "Routine", gloss: "work, health, the ordinary day" },
  7: { house: 7, name: "Partnership", gloss: "the equal, the agreement, the other" },
  8: { house: 8, name: "Intimacy", gloss: "merging, exposure, what is held jointly" },
  9: { house: 9, name: "Horizon", gloss: "meaning, belief, distance, learning" },
  10: { house: 10, name: "Ambition", gloss: "direction, standing, what is aimed at" },
  11: { house: 11, name: "Belonging", gloss: "friendship, network, the imagined future" },
  12: { house: 12, name: "Retreat", gloss: "the private, the unadmitted, what dissolves" },
};

/** One body of the visiting chart, standing in one field of the host chart. */
export interface Visitor {
  body: string;
  /** The sign it stands in — its own, unchanged by whose houses it falls in. */
  sign: string;
  weight: number;
}

export interface ActivatedField extends Field {
  /** Sum of the visiting bodies' weights. Not a percentage of anything. */
  weight: number;
  /** Share of this direction's total weight, 0–100. */
  share: number;
  visitors: Visitor[];
}

export interface Direction {
  /** "a" when this is A's bodies in B's houses. */
  from: "a" | "b";
  fromName: string;
  toName: string;
  /** False when the receiving chart has no cusps. Everything else is empty. */
  available: boolean;
  /** Why not, in the words the page prints. Null when available. */
  unavailable: string | null;
  /** Every field that received anything, heaviest first. */
  fields: ActivatedField[];
  /**
   * The two heaviest fields as a phrase — "Partnership × Intimacy".
   *
   * Two, never three: the point of the phrase is that it can be held in mind
   * beside the other direction's phrase and compared. Null when the second
   * field is not meaningfully behind the first, in which case the leader is
   * given alone rather than crossed with a tie it does not beat.
   */
  phrase: string | null;
}

export interface Activation {
  aIntoB: Direction;
  bIntoA: Direction;
  /** True when both directions could be read. */
  complete: boolean;
}

/**
 * How far ahead the second field has to be of the third before the phrase is
 * allowed to name two. Below this the top of the list is a three-way tie and
 * crossing the first two would be picking arbitrarily.
 */
const PHRASE_MARGIN = 0.08;

function direction(
  from: "a" | "b",
  visiting: Chart,
  host: Chart,
): Direction {
  const base = {
    from,
    fromName: visiting.name,
    toName: host.name,
  };

  if (!housed(host)) {
    return {
      ...base,
      available: false,
      unavailable: `${host.name} has no house cusps — the chart was saved without a birth time, and houses cannot be derived without one.`,
      fields: [],
      phrase: null,
    };
  }

  const cusps = host.houses.map((h) => h.longitude);
  const byHouse = new Map<number, Visitor[]>();

  for (const body of SYNASTRY_BODIES) {
    const placement = visiting.placements.find((p) => p.body === body);
    if (!placement || typeof placement.longitude !== "number") continue;

    // The visiting chart's own angles are not visitors. An Ascendant is a
    // direction in space defined by where and when its owner was born; asking
    // which of someone else's houses it "falls in" is a category error, and it
    // would put a weight-9 body into a field on the strength of geometry that
    // means nothing across two charts.
    if (placement.isAngle) continue;

    const house = houseOfLongitude(placement.longitude, cusps);
    if (house === null) continue;

    const weight = BODY_WEIGHT[body] ?? 0;
    if (weight === 0) continue;

    const list = byHouse.get(house) ?? [];
    list.push({ body, sign: placement.sign, weight });
    byHouse.set(house, list);
  }

  const total = [...byHouse.values()]
    .flat()
    .reduce((sum, v) => sum + v.weight, 0);

  const fields: ActivatedField[] = [...byHouse.entries()]
    .map(([house, visitors]) => {
      const weight = visitors.reduce((sum, v) => sum + v.weight, 0);
      return {
        ...FIELDS[house],
        weight,
        share: total === 0 ? 0 : Math.round((weight / total) * 100),
        visitors: [...visitors].sort((x, y) => y.weight - x.weight),
      };
    })
    .sort((x, y) => y.weight - x.weight);

  return {
    ...base,
    available: true,
    unavailable: null,
    fields,
    phrase: phraseOf(fields, total),
  };
}

function phraseOf(fields: ActivatedField[], total: number): string | null {
  if (fields.length === 0 || total === 0) return null;
  if (fields.length === 1) return fields[0].name;

  const second = fields[1].weight / total;
  const third = fields.length > 2 ? fields[2].weight / total : 0;
  if (second - third < PHRASE_MARGIN) return fields[0].name;

  return `${fields[0].name} × ${fields[1].name}`;
}

export function activation(a: Chart, b: Chart): Activation {
  const aIntoB = direction("a", a, b);
  const bIntoA = direction("b", b, a);
  return {
    aIntoB,
    bIntoA,
    complete: aIntoB.available && bIntoA.available,
  };
}

/**
 * How much weight a direction put into a given set of houses.
 *
 * `dimensions.ts` asks this three times — Lifestyle wants the 2nd, 6th and
 * 10th, Commitment the 7th, Growth the 9th, 10th and 11th — and it is the only
 * route by which houses touch a dimension score. Returns a share of the
 * direction's own total, 0–1, so the two directions are comparable even when
 * one chart carries more bodies than the other.
 */
export function shareOf(direction: Direction, houses: number[]): number {
  if (!direction.available) return 0;
  const total = direction.fields.reduce((sum, f) => sum + f.weight, 0);
  if (total === 0) return 0;
  const inside = direction.fields
    .filter((f) => houses.includes(f.house))
    .reduce((sum, f) => sum + f.weight, 0);
  return inside / total;
}
