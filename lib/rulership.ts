/** lib/rulership.ts
 * Which planet runs which sign — and therefore which planet answers for a house
 * whose cusp falls in that sign.
 *
 * Modern rulership, matching arc: Scorpio to Pluto, Aquarius to Uranus, Pisces
 * to Neptune. The traditional assignments (Mars, Saturn, Jupiter) still live in
 * `PLANET_INFO.rulerOf` and are what dignity is judged on, which is why this is
 * a separate table rather than something derived from that one — the two
 * disagree on purpose.
 */

export const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export const MODERN_RULER: Record<string, string> = {
  Aries: "Mars",
  Taurus: "Venus",
  Gemini: "Mercury",
  Cancer: "Moon",
  Leo: "Sun",
  Virgo: "Mercury",
  Libra: "Venus",
  Scorpio: "Pluto",
  Sagittarius: "Jupiter",
  Capricorn: "Saturn",
  Aquarius: "Uranus",
  Pisces: "Neptune",
};

/**
 * Traditional rulership — the seven visible bodies only, each of the five
 * non-luminaries holding two signs.
 *
 * This is the table dignity has always been judged on (via `PLANET_INFO`), so
 * offering it for cusp rulership too lets the two stop disagreeing. Which one
 * a chart is read by is not a detail: it changes a house's ruler, and with it
 * both ruler strength and ruler activity — two thirds of that house's weight.
 */
export const TRADITIONAL_RULER: Record<string, string> = {
  Aries: "Mars",
  Taurus: "Venus",
  Gemini: "Mercury",
  Cancer: "Moon",
  Leo: "Sun",
  Virgo: "Mercury",
  Libra: "Venus",
  Scorpio: "Mars",
  Sagittarius: "Jupiter",
  Capricorn: "Saturn",
  Aquarius: "Saturn",
  Pisces: "Jupiter",
};

export type Rulership = "modern" | "traditional";

export const RULER_TABLE: Record<Rulership, Record<string, string>> = {
  modern: MODERN_RULER,
  traditional: TRADITIONAL_RULER,
};

/** The body answering for a cusp, under the chosen convention. */
export function rulerOfSign(sign: string, rulership: Rulership): string {
  return RULER_TABLE[rulership][sign] ?? MODERN_RULER[sign] ?? "Sun";
}

export function signOfLongitude(longitude: number): string {
  const normalised = ((longitude % 360) + 360) % 360;
  return SIGNS[Math.floor(normalised / 30)];
}
