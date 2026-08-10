import type { Element } from "./almanac";

/**
 * Identity colour for the five elements.
 *
 * The same licence `lib/bodies.ts` and `lib/house-types.ts` take: this sits
 * *alongside* the two-accent palette rather than inside it. Patina still means
 * "the self, the thing in force" and ember still means "exactitude, the thing
 * to look at" — neither is used as an element colour, so a patina marker on a
 * green row still reads as a marker.
 *
 * Colour is not decoration here. 五色, the five colours, are part of the system
 * being drawn: green Wood, red Fire, yellow Earth, white Metal, black Water are
 * named in the same breath as the phases themselves. Refusing them would be
 * like drawing a Western chart without letting Mars be red.
 *
 * Two adjustments for this ground. Black Water is invisible on a near-black
 * page, so it takes 玄 — the dark blue-black the classical texts use when they
 * mean the colour of deep water — rendered light enough to read. And Wood is
 * pulled toward yellow-green, away from patina's blue-green, so an element
 * never gets mistaken for a state.
 *
 * Every colour is applied inline: Tailwind cannot see class names built at
 * runtime.
 */

export interface ElementStyle {
  /** Full strength — glyphs, bars, labels. */
  color: string;
  /** The same hue at rule strength — hairlines, markers, tracks. */
  dim: string;
  /** The traditional colour name, for the drawer. */
  gloss: string;
}

/**
 * Lightness is the constraint, not hue. On a #07080b ground a mid-tone colour
 * that looks correct on a swatch reads as murky at 12px, and the first pass
 * here was pitched a stop too low across the board — the greens especially.
 * Every value is now light enough to hold at label size, which means each is
 * paler and less saturated than the colour it names. That is the tax for
 * putting colour on near-black at all.
 *
 * `dim` is not "the same colour, darker" — that lands back in the murk. It is
 * the same colour at rule strength, used only behind or beside something, never
 * for a character that has to be read.
 */
export const ELEMENT_STYLE: Record<Element, ElementStyle> = {
  Wood: { color: "#86c46a", dim: "#4e7a41", gloss: "青 green" },
  Fire: { color: "#e0705c", dim: "#8c3a2d", gloss: "赤 red" },
  Earth: { color: "#d6ad64", dim: "#856a34", gloss: "黄 yellow" },
  // White Metal has to stay off bone, or every Metal character reads as
  // untinted default text. Cooled until it is plainly silver, and still nowhere
  // near Water's saturation.
  Metal: { color: "#a9bad0", dim: "#6b7a8e", gloss: "白 white" },
  Water: { color: "#79a8e4", dim: "#3f6ea8", gloss: "玄 dark" },
};

export function elementColor(element: Element): string {
  return ELEMENT_STYLE[element].color;
}

export function elementDim(element: Element): string {
  return ELEMENT_STYLE[element].dim;
}
