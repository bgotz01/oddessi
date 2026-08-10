/**
 * The names arc's Chinese content tables import, pointed at Oddessi's.
 *
 * The four files beside this one are vendored from arc unchanged apart from
 * their import lines — the same arrangement `lib/astrology/interpretations/`
 * uses for the Western tables, so both can be re-synced without a rewrite. This
 * shim is what makes that possible: arc names a stem `HeavenlyStem`, Oddessi
 * names it `StemIndex`, and the underlying type is identical.
 */

import type {
  BranchIndex,
  Element,
  Polarity,
  StemIndex,
} from "@/lib/chinese/almanac";

export type HeavenlyStem = StemIndex;
export type EarthlyBranch = BranchIndex;
export type ChineseElement = Element;
export type YinYang = Polarity;
