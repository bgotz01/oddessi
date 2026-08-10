/**
 * The fixed vocabulary. Real Unicode glyphs only — never emoji.
 *
 * Every glyph carries a trailing U+FE0E (VARIATION SELECTOR-15), which forces
 * *text* presentation. Without it the OS emoji font wins for the zodiac range
 * (U+2648–U+2653) and renders ♓ ♏ ♊ as coloured emoji tiles. VS-15 is inert on
 * codepoints that have no emoji form, so it is safe to apply uniformly.
 */

const TEXT = "︎";

export const SIGN_GLYPH: Record<string, string> = {
  Aries: `♈${TEXT}`,
  Taurus: `♉${TEXT}`,
  Gemini: `♊${TEXT}`,
  Cancer: `♋${TEXT}`,
  Leo: `♌${TEXT}`,
  Virgo: `♍${TEXT}`,
  Libra: `♎${TEXT}`,
  Scorpio: `♏${TEXT}`,
  Sagittarius: `♐${TEXT}`,
  Capricorn: `♑${TEXT}`,
  Aquarius: `♒${TEXT}`,
  Pisces: `♓${TEXT}`,
};

export const BODY_GLYPH: Record<string, string> = {
  Sun: `☉${TEXT}`,
  Moon: `☽${TEXT}`,
  Ascendant: `↑${TEXT}`,
  Mercury: `☿${TEXT}`,
  Venus: `♀${TEXT}`,
  Mars: `♂${TEXT}`,
  Jupiter: `♃${TEXT}`,
  Saturn: `♄${TEXT}`,
  Uranus: `♅${TEXT}`,
  Neptune: `♆${TEXT}`,
  Pluto: `♇${TEXT}`,
  Chiron: `⚷${TEXT}`,
  "North Node": `☊${TEXT}`,
  "South Node": `☋${TEXT}`,
  Midheaven: `⟂${TEXT}`,
};

export function bodyGlyph(body: string): string {
  return BODY_GLYPH[body] ?? "·";
}

export function signGlyph(sign: string): string {
  return SIGN_GLYPH[sign] ?? "·";
}

// ---------------------------------------------------------------------------
// Sign metadata — element, modality, polarity
// ---------------------------------------------------------------------------

export type SignElement = "Fire" | "Earth" | "Air" | "Water";
export type SignModality = "Cardinal" | "Fixed" | "Mutable";
export type SignPolarity = "+" | "−";

export interface SignMeta {
  element: SignElement;
  modality: SignModality;
  polarity: SignPolarity;
}

const SIGN_META: Record<string, SignMeta> = {
  Aries: { element: "Fire", modality: "Cardinal", polarity: "+" },
  Taurus: { element: "Earth", modality: "Fixed", polarity: "−" },
  Gemini: { element: "Air", modality: "Mutable", polarity: "+" },
  Cancer: { element: "Water", modality: "Cardinal", polarity: "−" },
  Leo: { element: "Fire", modality: "Fixed", polarity: "+" },
  Virgo: { element: "Earth", modality: "Mutable", polarity: "−" },
  Libra: { element: "Air", modality: "Cardinal", polarity: "+" },
  Scorpio: { element: "Water", modality: "Fixed", polarity: "−" },
  Sagittarius: { element: "Fire", modality: "Mutable", polarity: "+" },
  Capricorn: { element: "Earth", modality: "Cardinal", polarity: "−" },
  Aquarius: { element: "Air", modality: "Fixed", polarity: "+" },
  Pisces: { element: "Water", modality: "Mutable", polarity: "−" },
};

/** Returns element / modality / polarity for a sign, or null if unknown. */
export function signMeta(sign: string): SignMeta | null {
  return SIGN_META[sign] ?? null;
}

/** Hex colour for a western element. Bright enough to read on the dark void
 *  background, distinct from the house-type blues/violets and the ember accent. */
export const ELEMENT_COLOR: Record<SignElement, string> = {
  Fire: "#e07a50", // warm orange
  Earth: "#8ebf7a", // fresh sage
  Air: "#7dc0d8", // sky
  Water: "#7899d4", // periwinkle
};
