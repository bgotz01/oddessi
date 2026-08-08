/**
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

export function signOfLongitude(longitude: number): string {
  const normalised = ((longitude % 360) + 360) % 360;
  return SIGNS[Math.floor(normalised / 30)];
}
