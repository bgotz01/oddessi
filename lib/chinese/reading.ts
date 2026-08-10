import { getStemArchetype, type StemArchetype } from "./interpretations/stems";
import {
  getBranchArchetype,
  type BranchArchetype,
} from "./interpretations/branches";
import {
  getDayMasterNarrative,
  type DayMasterNarrative,
} from "./interpretations/dayMaster";
import {
  getPillarCombination,
  type PillarCombination,
} from "./interpretations/pillarCombinations";
import type { BranchIndex, StemIndex } from "./almanac";

/**
 * The reading layer for the Chinese section — a thin, typed façade over the
 * vendored tables in `lib/chinese/interpretations/`.
 *
 * Exactly the arrangement `lib/interpretation.ts` has on the Western side, and
 * for the same reason: the tables stay as arc wrote them so they can be
 * re-synced, and this file is the only thing the pages import. Nothing here
 * interprets anything itself — it looks things up, and returns null rather than
 * inventing prose when a combination is missing.
 *
 * One thing the façade deliberately drops: every archetype in those tables
 * carries an `emoji` field. This app draws real glyphs and no emoji, so that
 * field is never surfaced. It stays in the data because removing it would break
 * a re-sync for no gain.
 */

export type {
  BranchArchetype,
  DayMasterNarrative,
  PillarCombination,
  StemArchetype,
};

/** The stem's own character, before any pillar position is applied to it. */
export function stemArchetype(stem: StemIndex): StemArchetype {
  return getStemArchetype(stem);
}

/** The branch's character, likewise position-agnostic. */
export function branchArchetype(branch: BranchIndex): BranchArchetype {
  return getBranchArchetype(branch);
}

/**
 * What this stem means when it is the Day Master — strengths, costs, what it
 * needs, and where it grows. Only ever asked of the day pillar's stem.
 */
export function dayMasterNarrative(stem: StemIndex): DayMasterNarrative {
  return getDayMasterNarrative(stem);
}

/**
 * The reading for one of the sixty stem-and-branch pairs, including what it
 * means in each of the four positions. Null if the pair is not in the table.
 */
export function pillarCombination(
  stem: StemIndex,
  branch: BranchIndex,
): PillarCombination | null {
  return getPillarCombination(stem, branch);
}

/**
 * Arc opens all sixty `asDay` passages with "You ARE" — a shout this app does
 * not do. Corrected on the way out rather than in the table, so the vendored
 * file stays re-syncable.
 */
function detypeset(passage: string): string {
  return passage.replace(/\bYou ARE\b/g, "You are");
}

/** The position-specific passage from a combination, by pillar role. */
export function combinationInPosition(
  combination: PillarCombination,
  role: "year" | "month" | "day" | "hour",
): string {
  switch (role) {
    case "year":
      return detypeset(combination.asYear);
    case "month":
      return detypeset(combination.asMonth);
    case "day":
      return detypeset(combination.asDay);
    case "hour":
      return detypeset(combination.asHour);
  }
}
