/**
 * lib/growth
 *
 * The Growth model's public surface. Components import from here rather than
 * reaching into individual modules, so the internal split can change without
 * touching the UI — which is the whole reason for having split it.
 */

export { trajectory, houseTitle } from "./trajectory";
export { SIGN, type SignEntry } from "./signs";
export { HOUSE, type HouseEntry } from "./houses";
export { BODY_VERBS } from "./bodies";
export { ARCHETYPE, archetypeFor } from "./archetypes";
export {
  ARCHETYPE_QUESTIONS,
  archetypeQuestionsFor,
  type ArchetypeQuestionsEntry,
} from "./archetype-questions";
export {
  crossingArena,
  crossingInterpretation,
  deriveCrossing,
  type CrossingArena,
  type Crossing,
  type CrossingBody,
  type CrossingInterpretation,
  type CrossingPlacement,
} from "./crossing";
export { tailwindsOf } from "./tailwinds";
export {
  beatLabel,
  growthTiming,
  nodalBeats,
  axisTriggers,
  LIFESPAN_YEARS,
  NODAL_PERIOD_YEARS,
  type AddressKind,
  type AxisAddress,
  type AxisTrigger,
  type BeatKind,
  type GrowthTiming,
  type NodalBeat,
} from "./timing";
export {
  activationCurve,
  activationWindows,
  bandLabel,
  classificationOf,
  geometryLabel,
  gradeLabel,
  gradeMeaning,
  growthActivation,
  interpretActivationWindow,
  kindLabel,
  orientationFrame,
  orientationGloss,
  orientationLabel,
  orientationOf,
  orientationShort,
  processOf,
  windowLabel,
  type Activation,
  type ActivationKind,
  type ActivationReading,
  type ActivationWindow,
  type Geometry,
  type Grade,
  type GrowthActivation,
  type Ingredient,
  type IntensityCurve,
  type IntensityPeak,
  type IntensityPoint,
  type Orientation,
  type OrientationEntry,
  type ProcessEntry,
  INGREDIENT_LABEL,
  PRIMARY_ORIENTATIONS,
  SHARES,
} from "./activation";
export type {
  Conversion,
  ConversionArc,
  DeepPattern,
  Pole,
  Resistance,
  Tailwind,
  TailwindKind,
  Trajectory,
} from "./types";
