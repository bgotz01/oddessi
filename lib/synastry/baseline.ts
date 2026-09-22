/**
 * lib/synastry/baseline.ts
 *
 * WHAT "92" MEANS.
 *
 * The first version of this engine scored chemistry as a share of a stated
 * maximum, and `scripts/check-synastry.ts` found that every pair of stored
 * charts came out between 43 and 51. That was not a bad choice of constant. It
 * is a property of the geometry: thirteen bodies against thirteen bodies throw
 * up roughly the same number of cross-aspects whoever the two people are, so
 * the total contact mass mostly measures the size of the grid. Any score built
 * directly on it says the same thing about everybody, and the fact that it
 * arrives as a two-digit number makes it look like it doesn't.
 *
 * So both axes are reported against a reference: what two charts with no
 * particular relationship to each other produce. A chemistry of 92 means this
 * pair has more contact in this area than 92% of unrelated pairings. That is a
 * claim somebody can check, and re-derive, which is more than most numbers in
 * astrology offer.
 *
 * WHERE THE REFERENCE COMES FROM
 * `scripts/calibrate-synastry.ts`, which takes the real stored charts and
 * rotates one of each pair by a random angle — a permutation null. Rotation
 * keeps everything inside a chart intact and destroys only the alignment
 * between the two, which is exactly the thing being tested. Synthetic charts
 * would have been easier and wrong: Mercury is never more than 28° from its own
 * Sun, and a randomly generated chart produces Sun–Mercury contacts at a rate
 * no real pair of people can.
 *
 * THE NUMBERS BELOW ARE MEASURED, NOT CHOSEN, AND THEY GO STALE
 * They were derived from 8,160 sampled pairings over the charts stored at the
 * time, and cover EVERY area the engine can compute rather than the ones any
 * one lens shows — a baseline has to exist before a lens can display an area at
 * all. They will drift as charts are added, though not quickly — the null is
 * dominated by the geometry rather than by which charts are in it. Re-run the
 * script and paste the output back if the check script starts reporting a
 * median chemistry far from 50, which is what a stale reference looks like.
 */

import type { DimensionId } from "./dimensions";
import type { LensId } from "./lenses";

export interface Baseline {
  mean: number;
  sd: number;
}

/**
 * Top-eight contact mass within one lens's own areas, per lens.
 *
 * Replaces a single baseline taken over every counted contact. The headline is
 * scored from the lens's contacts now — see `contactsFor` in dimensions.ts for
 * why — and those sets are much smaller and differently sized from each other,
 * so one reference would have made Friendship structurally quiet and Romantic
 * structurally loud for every pair who ever used the page.
 */
export const LENS_BASELINE: Record<LensId, Baseline> = {
  romantic: { mean: 90.6, sd: 19.8 },
  partnership: { mean: 83.1, sd: 19.3 },
  friendship: { mean: 83.7, sd: 20.9 },
  family: { mean: 81.1, sd: 20.5 },
};

/** Total evidence mass per area, aspects and houses together. */
export const AREA_BASELINE: Record<DimensionId, Baseline> = {
  attraction: { mean: 26.5, sd: 16.6 },
  emotional: { mean: 26.6, sd: 17.8 },
  communication: { mean: 22.6, sd: 14.9 },
  identity: { mean: 24, sd: 16.5 },
  lifestyle: { mean: 30.7, sd: 14.1 },
  commitment: { mean: 16.6, sd: 12.7 },
  growth: { mean: 32.4, sd: 16 },
  drive: { mean: 22.3, sd: 12.5 },
  power: { mean: 17.7, sd: 11.5 },
  rapport: { mean: 21.2, sd: 14.5 },
  obligation: { mean: 18, sd: 12.5 },
};

/**
 * The ease an unrelated pairing averages, and the spread around it.
 *
 * The mean is a bias in the aspect and orb tables rather than a fact about
 * people, and it is subtracted so that an ease of 0 means "no easier or harder
 * than two charts picked at random". The first calibration had this at roughly
 * −20, because the hard angles had been given wider orbs than the soft ones and
 * so turned up more often by chance — which put four fifths of all stored pairs
 * in a single cell. Matching the orb windows in `contacts.ts` brought it to
 * +5.8, and this correction takes out what is left.
 *
 * The sd is what the band edges are set from. A band drawn at a round number
 * would be a band drawn at whatever this file's author found tidy.
 */
export const EASE_BASELINE: Baseline = { mean: 6, sd: 17.8 };

/**
 * The same thing measured over each lens's own contacts, which is the set the
 * signature's ease is now computed from.
 *
 * The means land within a point of the whole-grid figure, so the earlier worry
 * — that naming the hard pairs would drag a lens's null downward — turns out to
 * be unfounded. The SPREAD is the finding: 25 to 27 against the grid's 17.8,
 * because a lens set is a fraction of the size and a single tight square moves
 * its average much further. That is what the signature's band edge is set from,
 * and a band drawn for the grid's spread would have called almost every pair
 * flowing or charged.
 */
export const LENS_EASE_BASELINE: Record<LensId, Baseline> = {
  romantic: { mean: 6.3, sd: 24.8 },
  partnership: { mean: 5.5, sd: 26.1 },
  friendship: { mean: 7.2, sd: 26.9 },
  family: { mean: 6.8, sd: 27 },
};

/**
 * Abramowitz & Stegun 7.1.26, the standard cheap error function.
 *
 * Accurate to about 1.5 × 10⁻⁷, which is six orders of magnitude better than a
 * percentile rounded to a whole number needs. Written out rather than pulled
 * from a dependency: it is nine lines and the alternative is a package.
 */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const z = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * z);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-z * z);
  return sign * y;
}

/**
 * Where a value sits in its reference distribution, 1–99.
 *
 * Clamped away from 0 and 100 deliberately. A pair that scored higher than
 * every sampled pairing has not scored higher than every possible one, and a
 * page that prints 100 is claiming a certainty the sample cannot support.
 */
export function percentile(value: number, baseline: Baseline): number {
  const z = (value - baseline.mean) / baseline.sd;
  const share = 0.5 * (1 + erf(z / Math.SQRT2));
  return Math.min(99, Math.max(1, Math.round(share * 100)));
}

/**
 * Raw ease, with the reference bias taken out, held inside −100 … +100.
 *
 * The clamp is not cosmetic. An area carrying a single square reads a raw −100,
 * and subtracting the bias took it to −106 — a number outside the range the
 * type promises, printed in a drawer beside a track that cannot draw it. The
 * correction is a shift of the whole axis and the ends of an axis do not move,
 * so it is the shift that gives way at the boundary rather than the boundary.
 */
export function correctedEase(
  ease: number,
  baseline: Baseline = EASE_BASELINE,
): number {
  return Math.max(-100, Math.min(100, Math.round(ease - baseline.mean)));
}
