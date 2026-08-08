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
