// lib/astrology/house-systems.ts

/**
 * How the twelve houses are drawn, and the four angles they hang from. Read by
 * the Framework guide; the chart itself is cast in `APP_HOUSE_SYSTEM`.
 *
 * The systems disagree about where cusps fall, not about what a house means.
 * That still matters: a planet near a cusp can change house, and a cusp that
 * moves into the next sign changes that house's ruler.
 */

export type HouseSystemKey = "placidus" | "whole-sign" | "equal" | "porphyry";

export interface HouseSystem {
  key: HouseSystemKey;
  name: string;
  /** How the cusps are drawn, in one line. */
  method: string;
  /** Where the Ascendant sits relative to the 1st house. */
  ascendant: string;
  /** Whether the Midheaven is the 10th cusp. */
  midheaven: string;
  /** Not rendered. Lineage and trade-offs, for the chat. */
  note: string;
}

/** What every chart in the app is cast in (`'P'` in `real-calculator`). */
export const APP_HOUSE_SYSTEM: HouseSystemKey = "placidus";

export const HOUSE_SYSTEMS: HouseSystem[] = [
  {
    key: "placidus",
    name: "Placidus",
    method: "Divides the time each degree takes to climb from horizon to meridian — houses of unequal size",
    ascendant: "1st cusp",
    midheaven: "Always the 10th cusp",
    note: "The modern default, used by most software since the 20th century. A quadrant system: the four angles are the 1st, 4th, 7th and 10th cusps. At high latitudes houses stretch badly, and above the polar circles some degrees never rise, so the system breaks down.",
  },
  {
    key: "whole-sign",
    name: "Whole Sign",
    method: "The rising sign is the whole 1st house; each following sign is the next house",
    ascendant: "Somewhere inside the 1st",
    midheaven: "Floats — 9th, 10th or 11th house",
    note: "The oldest system, standard in Hellenistic and much Indian astrology, revived in modern traditional practice. Every house is exactly one sign, so each house has exactly one ruler and no house is intercepted.",
  },
  {
    key: "equal",
    name: "Equal",
    method: "Twelve 30° houses measured from the Ascendant degree",
    ascendant: "1st cusp",
    midheaven: "Floats — usually 9th or 10th house",
    note: "Keeps the Ascendant as the 1st cusp while avoiding quadrant distortion. Works at any latitude. Treats the Midheaven as a point to read in whatever house it falls.",
  },
  {
    key: "porphyry",
    name: "Porphyry",
    method: "Each quadrant between two angles is split into three equal parts",
    ascendant: "1st cusp",
    midheaven: "Always the 10th cusp",
    note: "The simplest quadrant system, attested in late antiquity. Keeps all four angles as cusps like Placidus but divides space rather than time, so it distorts less at high latitudes.",
  },
];

/**
 * The four angles — the horizon and the meridian. Under any quadrant system
 * they are the 1st, 4th, 7th and 10th cusps.
 */
export const ANGLES = [
  { name: "Ascendant", abbr: "ASC", house: 1, gloss: "The eastern horizon. How a life approaches the world." },
  { name: "Imum Coeli", abbr: "IC", house: 4, gloss: "The lowest point. Roots, home, what is private." },
  { name: "Descendant", abbr: "DSC", house: 7, gloss: "The western horizon. The other — partners and opponents." },
  { name: "Midheaven", abbr: "MC", house: 10, gloss: "The highest point. Aim, vocation, public standing." },
] as const;
