// lib/industry/music-cycles.ts

import { ELEMENT_COLOR, signGlyph, signMeta } from "@/lib/symbols";
import { MUSIC_ERAS } from "@/lib/industry/music-eras-data";
import { URANUS_MUSIC_ERAS } from "@/lib/industry/uranus-music-eras-data";
import { eraYears } from "@/lib/industry/era-years";

/**
 * The two music clocks reduced to one shape, so they can share an axis.
 *
 * Neptune and Uranus are written up separately and in different vocabularies —
 * one names an archetype and an expression, the other a disruption and the
 * innovation it produced. Nothing about either table says how the two run
 * against each other, because a table has no axis: six equal columns and
 * eleven equal columns cannot be laid over one another at all.
 *
 * What this file adds is the only thing the separate readings cannot carry:
 * WHEN. Once both lanes are on real years, the arithmetic falls out — each
 * ~14-year ideal contains about two ~7-year disruptions, and three windows
 * between 1981 and 2003 have both planets holding the same sign at once. That
 * last one is not an editorial claim; it is what the two date lists say when
 * you intersect them, which is why it is computed here rather than written
 * into the data by hand.
 */

export type MusicCyclePlanet = "Neptune" | "Uranus";

export interface MusicCycleSegment {
  /** Stable across lanes — the sign alone collides (both lanes hold Capricorn). */
  id: string;
  planet: MusicCyclePlanet;
  sign: string;
  glyph: string;
  /** Boundaries are half-open: an era owns [startYear, endYear). */
  startYear: number;
  endYear: number;
  color: string;
  /**
   * Editorial, not temporal. An era can have begun and still be a hypothesis —
   * Neptune in Aries opened in 2026 and has no evidence behind it yet — so
   * "not yet observed" and "not yet arrived" are kept apart. The chart draws
   * the first as a dashed edge and the second from the `now` rule.
   */
  speculative: boolean;
  /** The noun the era is remembered by: an archetype, or an innovation. */
  headline: string;
  /** The line under it, in that lane's own vocabulary. */
  note: string;
}

export interface MusicCycleLane {
  planet: MusicCyclePlanet;
  glyph: string;
  role: string;
  question: string;
  /** Rounded from the lane's own span, so adding an era cannot make it lie. */
  cadenceYears: number;
  segments: MusicCycleSegment[];
}

/** The element colour, which is the palette both existing music tables use. */
function signColor(sign: string): string {
  const meta = signMeta(sign);
  return meta ? ELEMENT_COLOR[meta.element] : "var(--color-patina)";
}

const NEPTUNE_SEGMENTS: MusicCycleSegment[] = MUSIC_ERAS.map((era) => ({
  id: `neptune-${era.sign}`,
  planet: "Neptune",
  sign: era.sign,
  glyph: signGlyph(era.sign),
  startYear: era.startYear,
  endYear: era.endYear,
  // The era table's own colour, not the element's. Aries is deliberately off
  // the element palette there to mark it as the unobserved one, and the chart
  // should not quietly correct that.
  color: era.color,
  speculative: era.status === "upcoming",
  headline: era.archetype,
  note: era.comparison.expression,
}));

const URANUS_SEGMENTS: MusicCycleSegment[] = URANUS_MUSIC_ERAS.map((era) => {
  const { startYear, endYear } = eraYears(era.dates);
  return {
    id: `uranus-${era.sign}`,
    planet: "Uranus" as const,
    sign: era.sign,
    glyph: signGlyph(era.sign),
    startYear,
    endYear,
    color: signColor(era.sign),
    speculative: era.manifestation === null,
    headline: era.manifestation ?? "To be observed",
    note: era.disruption ?? era.principle,
  };
});

function cadence(segments: MusicCycleSegment[]): number {
  const span = segments[segments.length - 1].endYear - segments[0].startYear;
  return Math.round(span / segments.length);
}

export const MUSIC_CYCLE_LANES: MusicCycleLane[] = [
  {
    planet: "Neptune",
    glyph: "♆︎",
    role: "Cultural ideal",
    question: "What does music culture idealize?",
    cadenceYears: cadence(NEPTUNE_SEGMENTS),
    segments: NEPTUNE_SEGMENTS,
  },
  {
    planet: "Uranus",
    glyph: "♅︎",
    role: "Disruption",
    question: "What breaks the existing model?",
    cadenceYears: cadence(URANUS_SEGMENTS),
    segments: URANUS_SEGMENTS,
  },
];

const ALL_SEGMENTS = MUSIC_CYCLE_LANES.flatMap((lane) => lane.segments);

/**
 * The window the axis covers: the union of both lanes, not the overlap.
 *
 * Both lanes open in 1956 and neither closes there: Uranus is read to 2033 and
 * Neptune to 2040, so the last seven years carry one bar rather than two. That
 * tail is a fact about the readings — the ideal is guessed further ahead than
 * the disruption — and cropping the axis to where both lanes have something to
 * say would hide it.
 */
export const MUSIC_CYCLE_START = Math.min(...ALL_SEGMENTS.map((s) => s.startYear));
export const MUSIC_CYCLE_END = Math.max(...ALL_SEGMENTS.map((s) => s.endYear));
const SPAN = MUSIC_CYCLE_END - MUSIC_CYCLE_START;

/** Where a year sits on the axis, 0–100, clamped to the window. */
export function pctOfYear(year: number): number {
  return (Math.min(Math.max(year, MUSIC_CYCLE_START), MUSIC_CYCLE_END) - MUSIC_CYCLE_START) / SPAN * 100;
}

/**
 * A timestamp as a fractional year.
 *
 * The data is year-granular and the axis is 84 years wide, so this exists for
 * one mark only: the `now` rule, which would otherwise snap to January and sit
 * up to a year away from where the reader actually is.
 */
export function fractionalYear(time: number): number {
  const year = new Date(time).getUTCFullYear();
  const opens = Date.UTC(year, 0, 1);
  const closes = Date.UTC(year + 1, 0, 1);
  return year + (time - opens) / (closes - opens);
}

export function musicCycleSegment(id: string): MusicCycleSegment | null {
  return ALL_SEGMENTS.find((segment) => segment.id === id) ?? null;
}

export function musicCycleLane(planet: MusicCyclePlanet): MusicCycleLane {
  return MUSIC_CYCLE_LANES.find((lane) => lane.planet === planet)!;
}

/** The era either side of this one in its own lane, for drawer navigation. */
export function musicCycleNeighbours(segment: MusicCycleSegment): {
  previous: MusicCycleSegment | null;
  next: MusicCycleSegment | null;
} {
  const lane = musicCycleLane(segment.planet).segments;
  const index = lane.findIndex((s) => s.id === segment.id);
  return {
    previous: index > 0 ? lane[index - 1] : null,
    next: index >= 0 && index < lane.length - 1 ? lane[index + 1] : null,
  };
}

export interface MusicCycleConcurrency {
  segment: MusicCycleSegment;
  fromYear: number;
  toYear: number;
  years: number;
  /**
   * Why the pairing is more than coincidence, when it is.
   *
   * Same sign is the strong one and it is rare — three windows in the whole
   * axis. Same element is common enough to be worth naming and weak enough
   * that it must not be dressed up as the same thing.
   */
  resonance: "same sign" | "same element" | null;
}

/**
 * What the other clock was doing while this era ran.
 *
 * The whole reason for one chart rather than two. Ordered by date rather than
 * by how much they overlap, because the reader is looking at a timeline and
 * expects the list under it to run the same way.
 */
export function concurrentWith(segment: MusicCycleSegment): MusicCycleConcurrency[] {
  const other = segment.planet === "Neptune" ? URANUS_SEGMENTS : NEPTUNE_SEGMENTS;
  return other
    .map((candidate) => {
      const fromYear = Math.max(segment.startYear, candidate.startYear);
      const toYear = Math.min(segment.endYear, candidate.endYear);
      const years = toYear - fromYear;
      if (years <= 0) return null;
      const resonance =
        candidate.sign === segment.sign
          ? ("same sign" as const)
          : signMeta(candidate.sign)?.element === signMeta(segment.sign)?.element
            ? ("same element" as const)
            : null;
      return { segment: candidate, fromYear, toYear, years, resonance };
    })
    .filter((link): link is MusicCycleConcurrency => link !== null);
}

export interface MusicCycleResonance {
  sign: string;
  glyph: string;
  color: string;
  fromYear: number;
  toYear: number;
  neptuneId: string;
  uranusId: string;
}

/**
 * The years both planets held the same sign.
 *
 * Three windows, 1981–84, 1988–96 and 1998–2003 — the approach to and drift
 * from the Uranus–Neptune conjunction of 1993. Derived rather than written
 * down: the two date lists already contain it, and a hand-kept copy would be
 * one editorial revision away from disagreeing with the bars above it.
 */
export const MUSIC_CYCLE_RESONANCES: MusicCycleResonance[] = NEPTUNE_SEGMENTS.flatMap(
  (neptune) =>
    concurrentWith(neptune)
      .filter((link) => link.resonance === "same sign")
      .map((link) => ({
        sign: neptune.sign,
        glyph: neptune.glyph,
        color: signColor(neptune.sign),
        fromYear: link.fromYear,
        toYear: link.toYear,
        neptuneId: neptune.id,
        uranusId: link.segment.id,
      })),
);
