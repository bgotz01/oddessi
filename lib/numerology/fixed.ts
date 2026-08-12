/**
 * Re-exports for the four fixed number positions.
 *
 * Each position lives in its own file so it can be edited independently.
 * Import from here when you need more than one, or import directly from the
 * individual file when you only need one.
 */

export type { LifePathReading } from "./life-path";
export type { ExpressionReading } from "./expression";
export type { SoulUrgeReading } from "./soul-urge";
export type { PersonalityReading } from "./personality";

export { LIFE_PATH_READINGS } from "./life-path";
export { EXPRESSION_READINGS } from "./expression";
export { SOUL_URGE_READINGS } from "./soul-urge";
export { PERSONALITY_READINGS } from "./personality";
