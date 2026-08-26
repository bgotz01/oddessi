/**
 * lib/growth/activation.ts
 *
 * When the trajectory becomes unusually loud.
 *
 * `timing.ts` answers a narrower question — where the nodal beat falls and
 * what transits touch the axis — and answers it as a list. A list is the wrong
 * shape for the question people actually ask, because it treats every row as
 * equivalent and leaves the reader to notice that four of them happen to land
 * in the same three years. That noticing IS the finding.
 *
 * So this module sits on top and does three things the list could not:
 *
 *   1. DIRECT vs STRUCTURAL. A transit on the node degree and a transit through
 *      the node's house are not the same claim. The first hits the trajectory;
 *      the second hits its machinery. Both matter, and flattening them lets the
 *      weak evidence borrow the strong evidence's authority.
 *
 *   2. GEOMETRY AND FUNCTION, composed. Conjunction, opposition and square to
 *      the axis mean three different movements — pull forward, past returns,
 *      crossroads — and the five slow planets each supply a different manner of
 *      arriving. Those two small tables multiply into fifteen readings without
 *      fifteen being written down, which is the only way this stays honest as
 *      the vocabulary grows.
 *
 *   3. CONVERGENCE. The real question is not "is the trajectory active" but
 *      "how many independent pressures bear on it at once, and is the
 *      developmental rhythm running while they do". The nodal cycle is the one
 *      genuine second CLOCK in the model — an independent period, shared by
 *      every chart. The slow planets are not five more clocks; they are five
 *      independent PRESSURES, collective in the sky and personal only in where
 *      they strike this axis. Where several coincide is where a life tends to
 *      turn, and that coincidence is computed rather than left to be spotted.
 *
 * What this deliberately does NOT do is score. There is no 0–100, no weighting
 * of Pluto above Neptune, no arithmetic dressed as measurement. Windows are
 * classified STRUCTURALLY, and the top grade is a SHAPE rather than a total:
 * a turning point requires something on the axis itself, because that is what
 * reorganises a trajectory rather than merely loading it.
 */

import type { BandStatus, Segment } from "@/lib/band";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import type { AxisTrigger, GrowthTiming, NodalBeat } from "./timing";
import {
  GEOMETRY,
  PROCESS,
  UNKNOWN_PROCESS,
  geometryOf,
  orientationOfSide,
  type Geometry,
  type Orientation,
} from "./activation-interpretations";

export {
  geometryLabel,
  orientationFrame,
  orientationGloss,
  orientationLabel,
  orientationOf,
  orientationShort,
  processOf,
  PRIMARY_ORIENTATIONS,
  type Geometry,
  type Orientation,
  type OrientationEntry,
  type ProcessEntry,
} from "./activation-interpretations";

// ─── Activations ─────────────────────────────────────────────────────────────

/**
 * What part of the trajectory is being hit.
 *
 * `axis` is the trajectory itself. The other three are its machinery, in
 * descending directness: the bodies that rule the nodes, the bodies embedded
 * in the nodal ground, and the houses the nodes sit in. A ruler hit can
 * activate the trajectory with the transiting planet nowhere near a node —
 * which is exactly why it has to be named as a different kind of evidence
 * rather than folded in beside one.
 */
export type ActivationKind = "axis" | "ruler" | "ground" | "house";

const KIND_LABEL: Record<ActivationKind, string> = {
  axis: "Axis",
  ruler: "Ruler",
  ground: "Ground",
  house: "House",
};

export function kindLabel(kind: ActivationKind): string {
  return KIND_LABEL[kind];
}

export interface Activation {
  id: string;
  planet: string;
  color?: string;
  kind: ActivationKind;
  /** True only for a hit on the node degree — the strongest claim available. */
  direct: boolean;
  /** Which end of the axis, for direct hits. Null for everything else. */
  geometry: Geometry | null;
  /**
   * Which way this pressure points the trajectory.
   *
   * Available for structural activations too, unlike `geometry` — that is the
   * point of having both. A transit through the North Node's house and a
   * conjunction to the North Node are different strengths of the same
   * direction, and orientation is the level at which they agree.
   */
  orientation: Orientation;
  /** "Transformation through the destination." Composed, never looked up. */
  headline: string;
  /** The planet's process word — Opening, Commitment, Breakthrough… */
  mode: string;
  modeGloss: string;
  /** What is being activated, as a phrase. */
  target: string;
  /** The same, in two or three words, for dense rows. */
  targetShort: string;
  /**
   * Where the transiting planet is standing while it does it.
   *
   * Null when the cache has no house transit covering the contact — which
   * happens at the edges of the cached span, and must read as "not known"
   * rather than as "nowhere".
   */
  through: { house: number; title: string } | null;
  /** What kind of movement this implies. Null when not a direct hit. */
  movement: string | null;
  ageStart: number;
  ageEnd: number;
  start: string;
  end: string;
  status: BandStatus;
  segments: Segment[];
  aspect?: string;
}

const KIND_BY_ADDRESS = {
  node: "axis",
  "arriving-ruler": "ruler",
  "departing-ruler": "ruler",
  deep: "ground",
  crossing: "ground",
  "arriving-house": "house",
  "departing-house": "house",
} as const;

/**
 * One trigger, read as an activation.
 *
 * The trigger already knows which parts of the axis it touches and has ranked
 * them, so the leading address decides the kind. Everything else here is
 * composition: the planet supplies the manner, the geometry supplies the
 * direction, and the headline is the two of them put together.
 */
function toActivation(t: AxisTrigger): Activation {
  const address = t.addresses[0];
  const kind = KIND_BY_ADDRESS[address.kind];
  const direct = kind === "axis";
  const geometry = direct ? geometryOf(t.aspect?.split(" ")[1]) : null;

  const fn = PROCESS[t.planet] ?? UNKNOWN_PROCESS;

  return {
    id: t.id,
    planet: t.planet,
    color: t.color,
    kind,
    direct,
    geometry,
    headline: geometry
      ? `${fn.label} through ${GEOMETRY[geometry].place}`
      : `${fn.label} on ${address.label.replace(/^(on|through) /, "")}`,
    mode: fn.label,
    modeGloss: fn.gloss,
    orientation: orientationOfSide(address.side),
    target: address.detail,
    targetShort: address.short,
    through: t.transitingHouse
      ? {
          house: t.transitingHouse,
          title: getHouseTitle(t.transitingHouse as House),
        }
      : null,
    movement: geometry ? GEOMETRY[geometry].movement : null,
    ageStart: t.ageStart,
    ageEnd: t.ageEnd,
    start: t.start,
    end: t.end,
    status: t.status,
    segments: t.segments,
    aspect: t.aspect,
  };
}


// ─── Windows ─────────────────────────────────────────────────────────────────
//
// The season-building lives in `activation-windows.ts`: the sweep that turns
// overlapping transits into runs, the structural grading, and the coalescing
// that keeps a single moment from being rendered as three windows. It is
// re-exported here so consumers have one import for the whole model.

import { activationWindows, type ActivationWindow } from "./activation-windows";
import { activationCurve, type IntensityCurve } from "./activation-intensity";

export {
  activationWindows,
  gradeLabel,
  gradeMeaning,
  gradeSummary,
  GRADE_PRECEDENCE,
  type ActivationWindow,
  type Grade,
} from "./activation-windows";

export {
  classificationOf,
  interpretActivationWindow,
  readActivationNow,
  windowLabel,
  ACTIVATION_CAVEAT,
  type ActivationCell,
  type ActivationDriver,
  type ActivationNow,
  type ActivationReading,
} from "./activation-reading";

export {
  activationCurve,
  bandLabel,
  intensityAt,
  BANDS,
  INGREDIENT_GLOSS,
  INGREDIENT_LABEL,
  SHARES,
  type Ingredient,
  type IntensityCurve,
  type IntensityPeak,
  type IntensityPoint,
  type Parts,
} from "./activation-intensity";

// ─── Composition ─────────────────────────────────────────────────────────────

/**
 * The Activation Index at which a season is worth interpreting.
 *
 * Sixty — the floor of "strong convergence". Below it the trajectory is
 * running, as it always is, without unusual timing pressure on it, and writing
 * a reading for every stretch where a transit happens to exist is how a
 * developmental tool turns back into a horoscope generator. The curve's job is
 * to find what deserves interpretation; this is where it draws the line.
 */
const NOTABLE_INDEX = 60;

export interface GrowthActivation {
  age: number;
  lifespan: number;
  beats: NodalBeat[];
  activations: Activation[];
  windows: ActivationWindow[];
  /**
   * Still ahead and worth interpreting.
   *
   * The curve decides this, not the grade ladder. A season earns a reading by
   * being densely activated or by carrying a configuration that reorganises
   * the axis — never by sitting high on an ordinal scale, because there isn't
   * one. Everything below the bar is a real transit and not a reason to
   * generate prose.
   */
  ahead: ActivationWindow[];
  /** Whatever is running right now, whatever its grade. */
  now: ActivationWindow | null;
  /** The most densely activated season of the life, by index. */
  peak: ActivationWindow | null;
  feed: { start: string; end: string };
  hasNodeAspects: boolean;
  /** The planets that appear at all, for the map's lanes. */
  planets: string[];
  /**
   * Activation intensity across the whole life.
   *
   * Computed from the same activations and beats the windows are built from,
   * so the curve and the bands can never disagree about what is in force —
   * they are two readings of one series rather than two series.
   */
  curve: IntensityCurve;
  /**
   * The age at which the cached ephemeris runs out.
   *
   * The curve needs this far more than the map did. A line falling to nothing
   * reads as a quiet stretch of life, and past this age it means only that
   * there are no transits in the cache to compute from — the opposite claim,
   * and one a reader would have no way to suspect.
   */
  dataUntilAge: number;
}

export function growthActivation(timing: GrowthTiming): GrowthActivation {
  const activations = timing.triggers.map(toActivation);
  const windows = activationWindows(
    activations,
    timing.beats,
    timing.birth,
    timing.age,
    timing.lifespan,
  );

  const curve = activationCurve(
    activations,
    timing.beats,
    timing.age,
    timing.lifespan,
  );

  // The index a window reaches, read off the curve rather than recomputed, so
  // the line and the list can never disagree about the same stretch of life.
  const scored = windows.map((w) => ({
    ...w,
    activation: curve.points
      .filter((p) => p.age >= w.ageStart && p.age <= w.ageEnd)
      .reduce((m, p) => Math.max(m, p.value), 0),
  }));

  // What earns a reading. Density OR a configuration that reorganises the
  // axis — the two are independent, so this is an `or` and not a threshold on
  // a single scale.
  const notable = scored.filter(
    (w) => w.activation >= NOTABLE_INDEX || w.grade === "turning-point",
  );

  return {
    age: timing.age,
    lifespan: timing.lifespan,
    beats: timing.beats,
    activations,
    windows: scored,
    ahead: notable.filter((w) => w.status !== "completed"),
    now: scored.find((w) => w.status === "active") ?? null,
    peak:
      scored.length === 0
        ? null
        : scored.reduce((best, w) =>
            w.activation > best.activation ? w : best,
          ),
    curve,
    dataUntilAge: timing.feed.end
      ? (Date.parse(timing.feed.end) -
          Date.parse(`${timing.birth}T12:00:00Z`)) /
        (365.2425 * 24 * 60 * 60 * 1000)
      : timing.lifespan,
    feed: timing.feed,
    hasNodeAspects: timing.hasNodeAspects,
    planets: [...new Set(activations.map((a) => a.planet))],
  };
}
