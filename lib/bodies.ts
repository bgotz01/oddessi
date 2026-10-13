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

// ─── Principles (Framework guide) ────────────────────────────────────────────

/**
 * Personal, social and transpersonal are the ten planets by speed and reach —
 * the standard names, kept as keys. The labels are natal: "Growth & Maturity"
 * and "Generational" say what the groups mean in a birth chart.
 * The glosses are written for a natal chart: what each group says about the
 * person, and how much of the placement they share with others born near
 * them — the sign is shared more widely the slower the planet, while the
 * house and aspects stay individual. The collective reading of the slow
 * planets belongs to Macro, not here.
 *
 * `point` is everything else a chart draws that is not a planet — calculated
 * points and minor bodies — kept apart so the guide never counts them as ten
 * plus three.
 */
export type BodyGroup = "personal" | "social" | "transpersonal" | "point";

export const BODY_GROUPS: Record<
  BodyGroup,
  { label: string; gloss: string; alsoCalled?: string }
> = {
  personal: {
    label: "Personal",
    gloss: "Your inner workings — identity, needs, thought, desire and action. Fast-moving, so sign, house and aspects are all yours alone.",
  },
  social: {
    label: "Growth & Maturity",
    gloss: "Where you find opportunity, and where you meet limits and build discipline. The sign is shared with anyone born within a year or two; the house and aspects are yours.",
    // Not rendered: the standard name, so the chat can map other sources' vocabulary.
    alsoCalled: "Social planets",
  },
  transpersonal: {
    label: "Generational",
    gloss: "Change, ideals, power. The sign is shared by your whole generation; what is yours is the house they land in and the planets they touch.",
    alsoCalled: "Transpersonal or outer planets",
  },
  point: {
    label: "Points",
    gloss: "Not planets. Calculated points and a minor body, read alongside them.",
  },
};

export interface BodyPrinciple {
  group: BodyGroup;
  /** The one word the body stands for. */
  principle: string;
  /** What it does, as a verb — the distinction keywords blur. */
  function: string;
  /**
   * Not rendered. The body it is most often confused with, and the
   * difference — for the chat, so two "change" planets stay distinct.
   */
  distinction: string;
  /** What the thing physically is, for the points that are not planets. */
  nature?: string;
}

export const PRINCIPLES: Record<string, BodyPrinciple> = {
  Sun: {
    group: "personal",
    principle: "Identity",
    function: "To become",
    distinction: "The Sun is the self being built; the Moon is the self already there.",
  },
  Moon: {
    group: "personal",
    principle: "Needs",
    function: "To feel",
    distinction: "The Moon needs; Venus wants — comfort rather than attraction.",
  },
  Mercury: {
    group: "personal",
    principle: "Perception",
    function: "To understand",
    distinction: "Mercury perceives and names; Jupiter interprets and believes.",
  },
  Venus: {
    group: "personal",
    principle: "Attraction",
    function: "To value",
    distinction: "Venus draws in what it values; Mars goes out after what it wants.",
  },
  Mars: {
    group: "personal",
    principle: "Action",
    function: "To pursue",
    distinction: "Mars changes things by direct effort from inside the pattern; Uranus by breaking the pattern itself.",
  },
  Jupiter: {
    group: "social",
    principle: "Expansion",
    function: "To grow",
    distinction: "Jupiter enlarges what exists; Neptune dissolves its edges.",
  },
  Saturn: {
    group: "social",
    principle: "Structure",
    function: "To establish",
    distinction: "Saturn matures through time and limits; Pluto transforms through crisis.",
  },
  Uranus: {
    group: "transpersonal",
    principle: "Disruption",
    function: "To liberate",
    distinction: "Uranus breaks suddenly from outside the pattern; Mars pushes from within it.",
  },
  Neptune: {
    group: "transpersonal",
    principle: "Dream",
    function: "To idealize",
    distinction: "Neptune longs for what cannot be held; Venus values what can.",
  },
  Pluto: {
    group: "transpersonal",
    principle: "Transformation",
    function: "To regenerate",
    distinction: "Pluto destroys in order to rebuild; Saturn restricts in order to build.",
  },
  "North Node": {
    group: "point",
    principle: "Direction",
    function: "To grow toward",
    distinction: "The North Node is unfamiliar ground worth working toward; the South Node is familiar ground easy to fall back on.",
    nature: "Where the Moon's orbit crosses the ecliptic, northbound. Calculated, not a body.",
  },
  "South Node": {
    group: "point",
    principle: "Familiarity",
    function: "To fall back on",
    distinction: "The South Node is skill already owned; the North Node is the skill being learned.",
    nature: "The opposite crossing, always 180° from the North Node.",
  },
  Chiron: {
    group: "point",
    principle: "Wound",
    function: "To heal through",
    distinction: "Chiron is a sensitivity that becomes skill; Saturn is a limit that becomes mastery.",
    nature: "A small icy body orbiting between Saturn and Uranus, about 50 years a cycle.",
  },
};

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
