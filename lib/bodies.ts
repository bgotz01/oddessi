/**
 * Identity colour for every body in a chart.
 *
 * `lib/planets.ts` already did this for the five slow planets, because that is
 * all the Cycles pages track. The Planets page lists everything, so the set is
 * completed here and `lib/planets.ts` now reads its five out of this table —
 * one source, so a planet is the same colour wherever it appears in the app.
 *
 * Colours follow traditional symbolic associations rather than being picked for
 * contrast. They sit alongside the app palette rather than inside it: patina
 * still means "in effect" and ember still means "exactitude", and neither is
 * used here. Nothing in this table is warm enough to be mistaken for ember
 * except Mars and the Sun, which have owned red and gold for three thousand
 * years and are not negotiable.
 */

export interface BodyMeta {
  /** Hex, applied inline — Tailwind can't see dynamically built class names. */
  color: string;
  /** What the body governs, in two or three words. */
  role: string;
}

export const BODY: Record<string, BodyMeta> = {
  Sun: { color: "#e8b832", role: "Identity & Will" },
  Moon: { color: "#bdd4e8", role: "Feeling & Instinct" },
  Mercury: { color: "#8fd494", role: "Mind & Exchange" },
  Venus: { color: "#e09cc8", role: "Love & Value" },
  Mars: { color: "#e05040", role: "Drive & Assertion" },
  Jupiter: { color: "#9b7fd4", role: "Growth & Expansion" },
  Saturn: { color: "#9daab8", role: "Structure & Maturation" },
  Uranus: { color: "#55b8f5", role: "Disruption & Awakening" },
  Neptune: { color: "#7b8fe0", role: "Dissolution & Vision" },
  Pluto: { color: "#c44060", role: "Transformation & Power" },
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
