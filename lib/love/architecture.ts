/**
 * lib/love/architecture.ts
 *
 * WHICH PLACES IN A CHART ARE ABOUT LOVE. Everything else in `lib/love` reads
 * this: the profile describes these places, the timeline watches them, and the
 * coverage report is a statement about which of them this particular chart and
 * this particular feed can actually reach.
 *
 * THE FIVE ARENAS
 * Love is not one address the way the Midheaven is one address for a career.
 * It is five questions that a chart answers in five different places, and
 * collapsing them into "Venus and the 7th" is what produces a relationship
 * reading that says the same thing about attraction, dating, marriage and
 * intimacy.
 *
 *   ATTRACTION   Venus, by sign and house. What pulls.
 *   ROMANCE      the 5th — its cusp, its ruler, whoever stands in it. Courtship,
 *                play, the part that happens before anything is decided. Mars
 *                joins here because desire is not the same faculty as taste.
 *   PARTNERSHIP  the 7th and the Descendant. What is sought in an equal.
 *   INTIMACY     the 8th and the Moon. Bonding, exposure, what is merged.
 *   COMMITMENT   Saturn, and the condition of the 7th ruler. What lasts.
 *
 * WHY THE 8TH IS IN THE PROFILE AND NOT THE TIMELINE
 * The 8th is the honest address for intimacy and a terrible one for timing.
 * It is also death, inheritance, other people's money, and every kind of
 * shared exposure — so a transit through it is as likely to be a tax
 * investigation as a deepening. The natal chart can say what a person's
 * intimacy is made of; a transit through the 8th cannot say that is what is
 * being activated. So the arena exists in `profile.ts` and is deliberately
 * absent from `windows.ts`. The same asymmetry Career holds between its natal
 * factors and its transit targets, for the same reason.
 */

import { tenantsOf, type Chart, type HouseCusp, type Placement } from "@/lib/charts";
import { rulerOfSign, signOfLongitude, type Rulership } from "@/lib/rulership";

export type LoveArena =
  | "attraction"
  | "romance"
  | "partnership"
  | "intimacy"
  | "commitment";

export const LOVE_ARENA_LABEL: Record<LoveArena, string> = {
  attraction: "Attraction",
  romance: "Romance",
  partnership: "Partnership",
  intimacy: "Intimacy",
  commitment: "Commitment",
};

/** The one question each arena answers, in the words the page prints. */
export const LOVE_ARENA_QUESTION: Record<LoveArena, string> = {
  attraction: "What draws you toward someone?",
  romance: "How do you fall in love?",
  partnership: "What do you seek in a relationship?",
  intimacy: "How do you bond deeply?",
  commitment: "What makes something lasting?",
};

/** One house of the architecture, with everything that answers for it. */
export interface LoveHouse {
  number: number;
  cusp: HouseCusp | null;
  /** The sign on the cusp. Null without a birth time. */
  sign: string | null;
  /** The planet that answers for it. */
  ruler: string | null;
  rulerPlacement: Placement | null;
  tenants: Placement[];
}

export interface LoveArchitecture {
  venus: Placement | null;
  mars: Placement | null;
  moon: Placement | null;
  saturn: Placement | null;
  /** Ecliptic longitude of the Descendant, which the chart stores as the Ascendant + 180. */
  descendant: number | null;
  descendantSign: string | null;
  fifth: LoveHouse;
  seventh: LoveHouse;
  eighth: LoveHouse;
  /** The chart has angles and cusps at all — i.e. it was saved with a birth time. */
  housed: boolean;
  /**
   * Every body holding an office in the love architecture, deduplicated.
   *
   * Used by coverage: these are the natal points a transit would have to reach
   * for this chart's love architecture to light up, and the cached feed
   * computes contacts against only some of them.
   */
  addresses: string[];
}

function placementOf(chart: Chart, body: string): Placement | null {
  return chart.placements.find((p) => p.body === body) ?? null;
}

function houseOf(
  chart: Chart,
  number: number,
  rulership: Rulership,
): LoveHouse {
  const cusp = chart.houses.find((h) => h.number === number) ?? null;
  const sign = cusp?.sign ?? null;
  const ruler = sign ? rulerOfSign(sign, rulership) : null;
  return {
    number,
    cusp,
    sign,
    ruler,
    rulerPlacement: ruler ? placementOf(chart, ruler) : null,
    tenants: tenantsOf(chart.placements, number),
  };
}

/**
 * The Descendant, derived rather than stored.
 *
 * Charts carry the Ascendant and the Midheaven; the other two angles are the
 * opposite points and the database does not repeat them. The 7th cusp is the
 * Descendant under every quadrant system, so the cusp is preferred when it is
 * there and the derivation is the fallback for a chart stored without cusps.
 */
function descendantOf(chart: Chart, seventh: LoveHouse): number | null {
  if (seventh.cusp) return seventh.cusp.longitude;
  const ascendant = chart.angles.ascendant;
  return typeof ascendant === "number" ? (ascendant + 180) % 360 : null;
}

export function loveArchitecture(
  chart: Chart,
  rulership: Rulership,
): LoveArchitecture {
  const fifth = houseOf(chart, 5, rulership);
  const seventh = houseOf(chart, 7, rulership);
  const eighth = houseOf(chart, 8, rulership);
  const descendant = descendantOf(chart, seventh);

  const addresses = [
    ...new Set(
      [
        "Venus",
        "Mars",
        "Moon",
        "Saturn",
        fifth.ruler,
        seventh.ruler,
        eighth.ruler,
        ...fifth.tenants.map((t) => t.body),
        ...seventh.tenants.map((t) => t.body),
      ].filter((x): x is string => Boolean(x)),
    ),
  ];

  return {
    venus: placementOf(chart, "Venus"),
    mars: placementOf(chart, "Mars"),
    moon: placementOf(chart, "Moon"),
    saturn: placementOf(chart, "Saturn"),
    descendant,
    descendantSign:
      seventh.sign ??
      (descendant === null ? null : signOfLongitude(descendant)),
    fifth,
    seventh,
    eighth,
    housed: chart.houses.length === 12 && typeof chart.angles.ascendant === "number",
    addresses,
  };
}
