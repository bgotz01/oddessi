/**
 * The five slow planets, in the order arc tracks them. This is the set the
 * Cycles pages work with — the ones whose transits last long enough to be worth
 * drawing on a timeline — and it is deliberately not "every body in the chart".
 *
 * Colour and role come from `lib/bodies.ts`, which covers all thirteen, so a
 * planet looks the same here as it does on the Planets page.
 */

import { bodyColor, bodyRole } from "@/lib/bodies";

export interface PlanetMeta {
  name: string;
  glyph: string;
  /** Hex, applied inline — Tailwind can't see dynamically built class names. */
  color: string;
  description: string;
}

const SLOW = ["Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"] as const;

const GLYPH: Record<string, string> = {
  Jupiter: "♃︎",
  Saturn: "♄︎",
  Uranus: "♅︎",
  Neptune: "♆︎",
  Pluto: "♇︎",
};

export const PLANETS: PlanetMeta[] = SLOW.map((name) => ({
  name,
  glyph: GLYPH[name],
  color: bodyColor(name),
  description: bodyRole(name) ?? name,
}));

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
