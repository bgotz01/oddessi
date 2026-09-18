export {
  LOVE_ARENA_LABEL,
  LOVE_ARENA_QUESTION,
  loveArchitecture,
  type LoveArchitecture,
  type LoveArena,
  type LoveHouse,
} from "./architecture";
export {
  LOVE_ARENA,
  LOVE_BODY,
  LOVE_HOUSE,
  LOVE_PROFILE_CAVEAT,
  LOVE_ROLE_LABEL,
  LOVE_SIGN,
  type LoveBodyEntry,
  type LoveHouseEntry,
  type LoveRole,
  type LoveSignEntry,
  type LoveSlot,
  type LoveSlotSource,
} from "./natal";
export {
  loveProfile,
  type LoveBullet,
  type LoveProfile,
  type LoveSection,
  type LoveSource,
} from "./profile";
export {
  relationshipCompass,
  type CompassAxis,
  type CompassAxisId,
  type CompassBucket,
  type CompassCenterState,
  type CompassContext,
  type CompassEvidence,
  type CompassPole,
  type CompassPosition,
  type CompassWeight,
  type RelationshipCompass,
} from "./compass";
export {
  LOVE_LAYER_LABEL,
  LOVE_LAYER_MEANING,
  LOVE_MODE_LABEL,
  LOVE_PHASES,
  LOVE_PHASE_LABEL,
  LOVE_PHASE_MEANING,
  LOVE_STRENGTH_LABEL,
  LOVE_STRENGTH_MEANING,
  LOVE_TIMELINE_MODEL,
  LOVE_WINDOW_KINDS,
  LOVE_WINDOW_LABEL,
  LOVE_WINDOW_MEANING,
  loveTimeline,
  type LoveContact,
  type LoveCoverage,
  type LoveLayer,
  type LoveMode,
  type LovePhase,
  type LoveStrength,
  type LoveTarget,
  type LoveTimeline,
  type LoveWindow,
  type LoveWindowKind,
} from "./timeline";
export {
  LOVE_DEVELOPMENT,
  LOVE_THEME,
  interpretLoveWindow,
  type LoveReading,
} from "./reading";
/**
 * `progressions.ts` is deliberately NOT re-exported.
 *
 * It imports Swiss Ephemeris, a native binary that cannot be bundled for the
 * client. Putting it in the barrel would mean every component importing
 * anything from `@/lib/love` pulled it in, and the failure would arrive as a
 * build error about a `.node` file rather than as anything resembling its
 * cause. The route imports it by path; the client imports only the TYPE, from
 * here.
 */
export type { ProgressedEvent, ProgressionsResult } from "./progressions";
