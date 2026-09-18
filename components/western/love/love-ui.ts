/**
 * Shared vocabulary for the Love sections.
 *
 * Nothing in this file imports a component, which is what keeps the timeline
 * and the panel it renders from importing each other.
 *
 * THE ENCODING, AND WHY IT IS THIS WAY ROUND
 * Three things have to be legible on one strip — which kind of window, what it
 * does, and how much evidence is behind it — and the house style allows two
 * accent colours. So only one of the three can be colour, and the choice is
 * not arbitrary:
 *
 *   KIND      is a CATEGORY, so it is POSITION. Four lanes, labelled. A
 *             category encoded as a colour ramp reads as a scale, and these
 *             four are a narrative order rather than a magnitude.
 *   MODE      is COLOUR, and it is the semantic use the palette was written
 *             for — patina for what opens, ember for what forces a question,
 *             dim for a season that does neither.
 *   STRENGTH  is HEIGHT. Career refuses to encode its grades as height and
 *             says so at length, because a configuration has no size. Strength
 *             here is different: minor, moderate and major are ordered by
 *             construction — one layer, two, three — so a magnitude encoding
 *             is telling the truth rather than inventing a hierarchy.
 */

import type { LoveMode, LoveStrength, LoveWindowKind } from "@/lib/love";

/** What the period does. The only colour on the strip. */
export const LOVE_MODE_TINT: Record<LoveMode, string> = {
  opening: "var(--color-patina)",
  defining: "var(--color-ember)",
  seasonal: "var(--color-patina-dim)",
};

/** How many independent layers. Ordered, so drawn as size. */
export const LOVE_STRENGTH_HEIGHT: Record<LoveStrength, number> = {
  minor: 6,
  moderate: 10,
  major: 15,
};

/** Lane order. The narrative the four kinds exist to carry. */
export const LOVE_LANES: LoveWindowKind[] = [
  "attraction",
  "romance",
  "partnership",
  "commitment",
];

/** Row pitch, in pixels. Tall enough for the largest bar plus breathing room. */
export const LANE = 26;
