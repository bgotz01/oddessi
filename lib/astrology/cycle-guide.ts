// lib/astrology/cycle-guide.ts

/**
 * Time in astrology, for the Framework guide: the techniques that say *when*,
 * the phases every planetary cycle passes through, and how fast each body
 * moves. Each technique says honestly whether the app computes it, and where,
 * so the guide never implies a reading the charts here do not make.
 */

export type BuildStatus = "computed" | "partial" | "not-built";

export interface TimingTechnique {
  name: string;
  /** What it explains, in one line. */
  explains: string;
  /** How it works, in one line. */
  method: string;
  status: BuildStatus;
  /** Where in the app it can be seen, when it is built. */
  where?: { href: string; label: string };
  /** Not rendered. Fuller note for the chat. */
  note: string;
}

export const TIMING_TECHNIQUES: TimingTechnique[] = [
  {
    name: "Transits",
    explains: "What the sky is doing to the chart now",
    method: "Current planetary positions measured against the natal houses and planets",
    status: "computed",
    where: { href: "/western/cycles", label: "Cycles" },
    note: "House transits, sign ingresses and transit-to-natal aspect cycles are all computed. Slow planets carry most of the weight; fast ones pass too quickly to mark a season.",
  },
  {
    name: "Returns",
    explains: "A cycle closing and beginning again",
    method: "A planet coming back to the degree it held at birth",
    status: "computed",
    where: { href: "/western/cycles", label: "Cycles" },
    note: "Computed alongside transits. The Saturn return (around 29–30 and 58–60) and the Jupiter returns (every twelve years) are the ones most read.",
  },
  {
    name: "Retrogrades",
    explains: "A theme revisited rather than advanced",
    method: "Apparent backward motion as Earth overtakes a planet, or is overtaken by it",
    status: "computed",
    where: { href: "/overview", label: "Overview" },
    note: "Retrograde stations split a transit into its in-effect stretches; the axis on Overview marks them ℞. A retrograde is an appearance from Earth — no planet reverses.",
  },
  {
    name: "Secondary progressions",
    explains: "Inner development over a lifetime",
    method: "Each day after birth stands for a year of life",
    status: "partial",
    where: { href: "/western/cycles/sun", label: "Sun" },
    note: "The progressed Sun (about thirty years per sign) is on Cycles → Sun; the progressed Moon and Venus feed the Love timeline. Other progressed bodies are not computed.",
  },
  {
    name: "Solar arcs",
    explains: "Symbolic directions, everything moving together",
    method: "Every point advanced by the progressed Sun's arc — about a degree a year",
    status: "not-built",
    note: "Not computed. Would reuse the progressed Sun's arc already calculated for Cycles → Sun.",
  },
  {
    name: "Eclipses",
    explains: "Sudden turning points along an axis",
    method: "New and full moons close enough to the lunar nodes to eclipse",
    status: "not-built",
    note: "Not computed. The Love timeline documents them as a deferred fifth layer: four to six eclipses fall in each eighteen-month family, and without a rule for which ones matter they add noise.",
  },
  {
    name: "Annual profections",
    explains: "Which house a year of life is about",
    method: "The 1st house at birth, the 2nd at age one, one house per year — and that house's ruler leads the year",
    status: "not-built",
    note: "Not computed. A traditional whole-sign technique; it would combine the rulership tables with age alone.",
  },
  {
    name: "Planetary eras",
    explains: "Long collective themes",
    method: "The slow planets' passage through the signs, read across a society",
    status: "computed",
    where: { href: "/western/macro", label: "Macro" },
    note: "Uranus, Neptune, Pluto and Jupiter eras live under Macro. Historical events there are facts; their astrological reading is symbolic interpretation, not a causal claim.",
  },
];

/**
 * The phases of any cycle between two bodies — or a body and its natal place.
 * `angle` is how far the faster has moved ahead since the start.
 */
export interface CyclePhase {
  angle: number;
  name: string;
  theme: string;
  line: string;
}

export const CYCLE_PHASES: CyclePhase[] = [
  {
    angle: 0,
    name: "Conjunction",
    theme: "Seed",
    line: "Something starts, felt before it is understood.",
  },
  {
    angle: 90,
    name: "Waxing square",
    theme: "Action",
    line: "The new thing meets resistance and has to be built for real.",
  },
  {
    angle: 180,
    name: "Opposition",
    theme: "Culmination",
    line: "It is fully visible — results, and awareness of what it is for.",
  },
  {
    angle: 270,
    name: "Waning square",
    theme: "Release",
    line: "What no longer serves is let go, clearing ground for the next start.",
  },
  {
    angle: 360,
    name: "Return",
    theme: "Renewal",
    line: "The loop closes on a new level, and the next cycle begins.",
  },
];

/**
 * How fast each body moves. `period` is the mean orbit (or synodic return to
 * the same zodiac degree) in years; `perSign` is time spent in one sign.
 * Retrogrades lengthen stays, and Pluto's eccentric orbit makes its sign
 * stays range from about 12 to 31 years.
 */
export const BODY_PERIODS: { body: string; period: string; periodYears: number; perSign: string }[] = [
  { body: "Moon", period: "27.3 days", periodYears: 27.3 / 365.25, perSign: "About 2½ days" },
  { body: "Sun", period: "1 year", periodYears: 1, perSign: "About a month" },
  { body: "Mercury", period: "1 year", periodYears: 1, perSign: "2 to 9 weeks" },
  { body: "Venus", period: "1 year", periodYears: 1, perSign: "4 weeks to 4 months" },
  { body: "Mars", period: "1.9 years", periodYears: 1.88, perSign: "6 weeks to 7 months" },
  { body: "Jupiter", period: "11.9 years", periodYears: 11.86, perSign: "About a year" },
  { body: "Saturn", period: "29.5 years", periodYears: 29.46, perSign: "About 2½ years" },
  { body: "Uranus", period: "84 years", periodYears: 84.02, perSign: "About 7 years" },
  { body: "Neptune", period: "165 years", periodYears: 164.8, perSign: "About 14 years" },
  { body: "Pluto", period: "248 years", periodYears: 247.9, perSign: "12 to 31 years" },
];

/** Bodies whose phases land within a lifetime at roughly predictable ages. */
export const PHASE_PLANETS = ["Jupiter", "Saturn", "Uranus", "Neptune"] as const;

/**
 * Approximate age at each phase of a planet's cycle to its natal place, from
 * its mean period. Real dates move with retrogrades and orbital eccentricity —
 * the Uranus opposition, for one, usually lands around 40 to 42.
 */
export function phaseAge(body: string, angle: number): number {
  const p = BODY_PERIODS.find((b) => b.body === body)!.periodYears;
  return (p * angle) / 360;
}
