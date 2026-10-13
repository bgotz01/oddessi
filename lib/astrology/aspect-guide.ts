// lib/astrology/aspect-guide.ts

import { ASPECT_DEFINITIONS, ASPECT_SYMBOLS, PLANET_ORB_MODIFIERS } from "./constants";
import { AspectType } from "@/types/astrology";

/**
 * What the aspects mean, for the Framework guide. Angles, orbs and symbols are
 * read from `constants.ts` — the same table `real-calculator` finds aspects
 * with — so the guide states the orbs the charts actually use.
 *
 * `quality` is the one semantic split the page colours: aspects that let two
 * principles cooperate, and aspects that make them negotiate. Neither is a
 * verdict; friction is where most of the work in a chart gets done.
 */

export type AspectQuality = "fusion" | "flowing" | "friction";

export interface AspectEntry {
  type: AspectType;
  name: string;
  symbol: string;
  angle: number;
  /** Base orb before the two bodies' modifiers are applied. */
  orb: number;
  quality: AspectQuality;
  /** One word. */
  principle: string;
  /** One line — what the two planets do with each other. */
  line: string;
  /** Not rendered. How the two signs usually relate, for the chat. */
  signs?: string;
}

const def = (t: AspectType) => ({
  angle: ASPECT_DEFINITIONS[t].angle,
  orb: ASPECT_DEFINITIONS[t].orb,
  symbol: ASPECT_SYMBOLS[t],
});

export const MAJOR_ASPECTS: AspectEntry[] = [
  {
    type: AspectType.Conjunction,
    name: "Conjunction",
    ...def(AspectType.Conjunction),
    quality: "fusion",
    principle: "Fusion",
    line: "Two principles act as one — hard to tell apart, and hard to use separately.",
    signs: "Usually the same sign: one element, one modality, so nothing translates between them.",
  },
  {
    type: AspectType.Sextile,
    name: "Sextile",
    ...def(AspectType.Sextile),
    quality: "flowing",
    principle: "Opportunity",
    line: "A compatible link that pays off when it is used — easy, but not automatic.",
    signs: "Two signs apart: complementary elements (fire with air, earth with water).",
  },
  {
    type: AspectType.Square,
    name: "Square",
    ...def(AspectType.Square),
    quality: "friction",
    principle: "Friction",
    line: "Two principles cut across each other — tension that forces action.",
    signs: "Three signs apart: same modality, incompatible elements, so both want to act and in different ways.",
  },
  {
    type: AspectType.Trine,
    name: "Trine",
    ...def(AspectType.Trine),
    quality: "flowing",
    principle: "Flow",
    line: "Two principles support each other without effort — talent, sometimes taken for granted.",
    signs: "Four signs apart: the same element, so the two speak one language.",
  },
  {
    type: AspectType.Opposition,
    name: "Opposition",
    ...def(AspectType.Opposition),
    quality: "friction",
    principle: "Polarity",
    line: "Two principles face each other — awareness through contrast, often met through other people.",
    signs: "Six signs apart: the opposite sign, one of the six axes — the same theme from its two ends.",
  },
];

/** Narrow orbs, read as colouring rather than structure. */
export const MINOR_ASPECTS: AspectEntry[] = [
  {
    type: AspectType.Semisextile,
    name: "Semisextile",
    ...def(AspectType.Semisextile),
    quality: "flowing",
    principle: "Adjustment",
    line: "Neighbouring signs with nothing in common — a small, steady adjustment.",
  },
  {
    type: AspectType.Semisquare,
    name: "Semisquare",
    ...def(AspectType.Semisquare),
    quality: "friction",
    principle: "Irritation",
    line: "Half a square — low-grade friction that nags rather than forces.",
  },
  {
    type: AspectType.Sesquisquare,
    name: "Sesquisquare",
    ...def(AspectType.Sesquisquare),
    quality: "friction",
    principle: "Agitation",
    line: "A square and a half — restless pressure looking for release.",
  },
  {
    type: AspectType.Quincunx,
    name: "Quincunx",
    ...def(AspectType.Quincunx),
    quality: "friction",
    principle: "Adjustment",
    line: "Two principles with nothing in common that must keep accommodating each other.",
  },
];

/**
 * Per-body orb multipliers, in planet order. The orb of an aspect is the base
 * orb times the average of the two bodies' multipliers.
 */
export const ORB_MODIFIERS = Object.entries(PLANET_ORB_MODIFIERS).map(([body, m]) => ({
  body,
  modifier: m,
}));

/** The effective orb for an aspect between two bodies, as the calculator applies it. */
export function effectiveOrb(type: AspectType, a: string, b: string): number {
  const mods = PLANET_ORB_MODIFIERS as Record<string, number>;
  return ASPECT_DEFINITIONS[type].orb * (((mods[a] ?? 1) + (mods[b] ?? 1)) / 2);
}

/**
 * How an aspect is read beyond its type. `inApp` says honestly whether charts
 * here measure it, so the guide never implies a reading the data cannot give.
 */
export const ASPECT_CONCEPTS = [
  {
    term: "Orb",
    def: "How far from exact an aspect is. The tighter the orb, the stronger and more constant the link.",
    inApp: "Recorded on every aspect.",
  },
  {
    term: "Exact and wide",
    def: "Within a degree or two an aspect is felt as structure; near the edge of its orb it is a background influence.",
    inApp: "Recorded as orb and exactness.",
  },
  {
    term: "Applying and separating",
    def: "Applying: the faster planet is still closing on exact, and the theme is building. Separating: it has passed, and the theme is already known.",
    inApp: "Not measured — charts here store positions, not speeds.",
  },
  {
    term: "Out of sign",
    def: "An aspect within orb across the 'wrong' signs — 29° Aries square 1° Leo is 92°, but between two fire signs. The geometry holds; the sign relationship does not.",
    inApp: "Counted by orb alone, like most software.",
  },
];

/** Aspect patterns. The points are degrees on a circle, the edges indices into them. */
export interface AspectPattern {
  name: string;
  principle: string;
  line: string;
  points: number[];
  edges: [number, number][];
  quality: AspectQuality;
}

export const PATTERNS: AspectPattern[] = [
  {
    name: "Stellium",
    principle: "Concentration",
    line: "Three or more planets in one sign or house — a life gathered in one place.",
    points: [-24, -8, 8, 24],
    edges: [],
    quality: "fusion",
  },
  {
    name: "T-square",
    principle: "Drive",
    line: "An opposition with a planet squaring both ends. The apex planet is where the tension is worked out.",
    points: [-90, 90, 180],
    edges: [[0, 1], [0, 2], [1, 2]],
    quality: "friction",
  },
  {
    name: "Grand trine",
    principle: "Ease",
    line: "Three trines in one element — a closed circuit of talent that can run without asking for anything.",
    points: [0, 120, 240],
    edges: [[0, 1], [1, 2], [2, 0]],
    quality: "flowing",
  },
  {
    name: "Grand cross",
    principle: "Tension",
    line: "Two oppositions squaring each other in one modality — pressure from four sides at once.",
    points: [0, 90, 180, 270],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2], [1, 3]],
    quality: "friction",
  },
  {
    name: "Yod",
    principle: "Adjustment",
    line: "Two planets in sextile, both quincunx a third. The apex has to keep adapting to serve them.",
    points: [0, 150, 210],
    edges: [[0, 1], [0, 2], [1, 2]],
    quality: "friction",
  },
];

/** Charts here list aspects; they do not detect patterns among them. */
export const PATTERNS_IN_APP =
  "Patterns are not detected automatically here — the chat can find them in a chart's aspect list.";
