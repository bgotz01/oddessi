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
  Sun: { color: "#d4a12c", role: "Identity & Will" },
  Moon: { color: "#a9bdd4", role: "Feeling & Instinct" },
  Mercury: { color: "#7bc47f", role: "Mind & Exchange" },
  Venus: { color: "#d18bb4", role: "Love & Value" },
  Mars: { color: "#cc4033", role: "Drive & Assertion" },
  Jupiter: { color: "#7c5cbf", role: "Growth & Expansion" },
  Saturn: { color: "#7a8199", role: "Structure & Maturation" },
  Uranus: { color: "#3b9de0", role: "Change & Awakening" },
  Neptune: { color: "#5b6bbf", role: "Dissolution & Vision" },
  Pluto: { color: "#8b2f45", role: "Transformation & Power" },
  "North Node": { color: "#b8a463", role: "The Path Forward" },
  "South Node": { color: "#6c7383", role: "The Path Behind" },
  Chiron: { color: "#a8794e", role: "Wound & Teaching" },
  Ascendant: { color: "#6baf9a", role: "The Approach" },
  Midheaven: { color: "#6baf9a", role: "The Aim" },
};

export function bodyColor(name: string): string {
  return BODY[name]?.color ?? "#6c7383";
}

export function bodyRole(name: string): string | undefined {
  return BODY[name]?.role;
}
