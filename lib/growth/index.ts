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
