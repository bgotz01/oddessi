/**
 * Identity data for every celestial body used in the app.
 *
 * This is the single source of truth for color, role, and glyph. All pages —
 * the Planets page (all bodies), the Cycles pages (slow planets only), and
 * everything in between — read from here.
 */

// ─── All bodies ──────────────────────────────────────────────────────────────

export interface BodyMeta {
  /** Hex, applied inline — Tailwind can't see dynamically built class names. */
  color: string;
  /** What the body governs, in two or three words. */
  role: string;
  /** Unicode glyph. Only defined for the bodies that have one. */
  glyph?: string;
}

export const BODY: Record<string, BodyMeta> = {
  Sun: { color: "#e8b832", role: "Identity & Will", glyph: "☉" },
  Moon: { color: "#bdd4e8", role: "Feeling & Instinct", glyph: "☽" },
  Mercury: { color: "#8fd494", role: "Mind & Exchange", glyph: "☿" },
  Venus: { color: "#e09cc8", role: "Love & Value", glyph: "♀︎" },
  Mars: { color: "#e05040", role: "Drive & Assertion", glyph: "♂︎" },
  Jupiter: { color: "#9b7fd4", role: "Growth & Expansion", glyph: "♃︎" },
  Saturn: { color: "#9daab8", role: "Structure & Discipline", glyph: "♄︎" },
  Uranus: { color: "#55b8f5", role: "Disruption & Awakening", glyph: "♅︎" },
  Neptune: { color: "#7b8fe0", role: "Dream & Dissolution", glyph: "♆︎" },
  Pluto: { color: "#c44060", role: "Fundamental Transformation", glyph: "♇︎" },
  "North Node": { color: "#d4bc6a", role: "The Path Forward" },
  "South Node": { color: "#8c96a8", role: "The Path Behind" },
  Chiron: { color: "#c4945e", role: "Wound & Teaching" },
  Ascendant: { color: "#7bc8b0", role: "The Approach" },
  Midheaven: { color: "#7bc8b0", role: "The Aim" },
};

export function bodyColor(name: string): string {
  return BODY[name]?.color ?? "#6c7383";
}

export function bodyRole(name: string): string | undefined {
  return BODY[name]?.role;
}

export function bodyGlyphFromBodies(name: string): string | undefined {
  return BODY[name]?.glyph;
}

// ─── Slow planets (Cycles pages) ─────────────────────────────────────────────

export interface PlanetMeta {
  name: string;
  glyph: string;
  /** Hex, applied inline. */
  color: string;
  description: string;
}

const SLOW = ["Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"] as const;
export type SlowPlanet = (typeof SLOW)[number];

export const PLANETS: PlanetMeta[] = SLOW.map((name) => ({
  name,
  glyph: BODY[name].glyph ?? "·",
  color: BODY[name].color,
  description: BODY[name].role,
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
