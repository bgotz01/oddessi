/**
 * Colour for the three house types.
 *
 * This sits alongside the app palette rather than inside it — the same licence
 * `lib/planets.ts` takes for planet identity. Patina still means "the symbolic
 * layer" and ember still means "the peak"; these only ever carry house type.
 *
 * Why hue and not tone, after an earlier pass tried tone: a categorical
 * distinction has to be *categorical*. When only one of three categories was
 * coloured, that category read as a flag — "why are four houses highlighted?"
 * — which is exactly what it looked like. Colouring all three fixes it: with
 * four cards in each hue, no hue can read as special, and the eye picks up
 * angular/succedent/cadent in one pass instead of parsing twelve small words.
 *
 * All three are cold on purpose. Ember is the only warm colour anywhere on the
 * page, so rank stays unmistakable no matter how many types are in view.
 *
 *   Angular    steel blue    the four pivots — action, initiation
 *   Succedent  cold violet   the holding houses — resource, consolidation
 *   Cadent     cold grey     the quiet houses — learning, adaptation
 */

export interface HouseTypeStyle {
  /** Hex, applied inline — Tailwind can't see dynamically built class names. */
  color: string;
  /** The same hue at rule strength, for hairlines and markers. */
  dim: string;
  gloss: string;
}

export const HOUSE_TYPE: Record<string, HouseTypeStyle> = {
  Angular: {
    color: "#4f9ad4",
    dim: "#2e5c80",
    gloss: "action",
  },
  Succedent: {
    color: "#8c7bc7",
    dim: "#544a78",
    gloss: "holding",
  },
  Cadent: {
    color: "#7a8199",
    dim: "#4a4f5e",
    gloss: "adapting",
  },
};

export const HOUSE_TYPES = ["Angular", "Succedent", "Cadent"] as const;

export function houseTypeStyle(type: string | undefined): HouseTypeStyle {
  return HOUSE_TYPE[type ?? ""] ?? HOUSE_TYPE.Cadent;
}
