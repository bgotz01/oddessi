/**
 * The five slow planets, in the order arc tracks them.
 *
 * Colors follow traditional symbolic associations:
 *   Jupiter  — violet/indigo  expansion, philosophy, kingship
 *   Saturn   — cold grey      limits, structure, time, authority
 *   Uranus   — electric blue  rupture, invention, rebellion
 *   Neptune  — ocean violet   dreams, spirituality, dissolution
 *   Pluto    — burgundy       destruction, hidden power, transformation
 *
 * These sit alongside the app palette rather than inside it — patina still
 * means "now / in effect", and these only ever carry planet identity.
 */

export interface PlanetMeta {
  name: string;
  glyph: string;
  /** Hex, applied inline — Tailwind can't see dynamically built class names. */
  color: string;
  description: string;
}

export const PLANETS: PlanetMeta[] = [
  {
    name: "Jupiter",
    glyph: "♃︎",
    color: "#7c5cbf",   // violet — expansion, belief, kingship
    description: "Growth & Expansion",
  },
  {
    name: "Saturn",
    glyph: "♄︎",
    color: "#7a8199",   // cold grey — limits, structure, authority
    description: "Structure & Maturation",
  },
  {
    name: "Uranus",
    glyph: "♅︎",
    color: "#3b9de0",   // electric blue — rupture, invention, rebellion
    description: "Change & Awakening",
  },
  {
    name: "Neptune",
    glyph: "♆︎",
    color: "#5b6bbf",   // ocean blue/violet — dreams, spirituality, dissolution
    description: "Dissolution & Vision",
  },
  {
    name: "Pluto",
    glyph: "♇︎",
    color: "#8b2f45",   // burgundy — destruction, hidden power, transformation
    description: "Transformation & Power",
  },
];

export const PLANET_NAMES = PLANETS.map((p) => p.name);

const BY_NAME = new Map(PLANETS.map((p) => [p.name, p]));

export function planetMeta(name: string): PlanetMeta | undefined {
  return BY_NAME.get(name);
}

export function planetColor(name: string): string {
  return BY_NAME.get(name)?.color ?? "#6baf9a";
}

export function planetGlyph(name: string): string {
  return BY_NAME.get(name)?.glyph ?? "·";
}
