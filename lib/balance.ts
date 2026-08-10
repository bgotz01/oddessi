/**
 * Element and modality balance — what the Western chart is made of.
 *
 * The counterpart to `weighElements` in `lib/chinese/pillars.ts`, and
 * deliberately not the same arithmetic, because the two are not counting the
 * same kind of thing. There the five phases are weighed across eight characters
 * with their hidden stems, and the result is read *relative to the Day Master*.
 * Here the four elements are weighed across the bodies, and the result stands on
 * its own — a Western chart has no single reference point that Fire is
 * supportive or draining *of*.
 *
 * So: the percentages this file produces and the percentages `Reading.elements`
 * produces share a unit and nothing else. They must never be subtracted from
 * each other. `lib/comparison.ts` is where that rule is enforced in prose.
 *
 * Pure arithmetic over a `Chart` — no ephemeris, so it runs on the client.
 */

import type { Chart } from "@/lib/charts";
import { signMeta, type SignElement, type SignModality } from "@/lib/symbols";

/**
 * Weight by body, mirroring `BODY_WEIGHT` in `lib/dominance.ts` so the two
 * measurements can't disagree about what a Jupiter is worth. The reasoning is
 * the same there and here: the lights carry a chart, the personal planets are
 * where a life is actually lived, and the outers are generational — everyone
 * born within a few years shares their sign, so a chart that is "60 % Water"
 * because of Neptune and Pluto is really just a cohort being counted.
 *
 * One addition dominance does not make: the Ascendant, at full weight. There it
 * is excluded because angles are not tenants of houses. Here it is the chart's
 * whole orientation and the conventional element tally has always counted it.
 * The Midheaven stays at zero — it is a direction the life points in rather
 * than something the person is made of.
 */
const BODY_WEIGHT: Record<string, number> = {
  Sun: 10,
  Moon: 10,
  Ascendant: 10,
  Mercury: 8,
  Venus: 8,
  Mars: 8,
  Jupiter: 6,
  Saturn: 6,
  Uranus: 4,
  Neptune: 4,
  Pluto: 4,
  Midheaven: 0,
  "North Node": 0,
  "South Node": 0,
  Chiron: 0,
  Lilith: 0,
};

/** Canonical order. Shares are always returned in it, never sorted by size. */
export const ELEMENTS: SignElement[] = ["Fire", "Earth", "Air", "Water"];
export const MODALITIES: SignModality[] = ["Cardinal", "Fixed", "Mutable"];

export interface Share<K extends string> {
  key: K;
  /** Percentage of the counted weight, to one decimal — as on the Chinese side. */
  share: number;
  /** The raw weight behind the percentage, kept so a page can show its working. */
  weight: number;
}

export interface Balance {
  elements: Share<SignElement>[];
  modalities: Share<SignModality>[];
  /** Elements with no weight at all. The Chinese side treats this as the loudest
   *  thing on a chart; the Western tradition is quieter about it, but it is
   *  still the first thing to say about a balance. */
  missingElements: SignElement[];
  missingModalities: SignModality[];
  /**
   * The heaviest of each — plural, because a genuine tie is a finding rather
   * than something to break silently. A chart split evenly between Fire and
   * Earth is not a Fire chart, and reporting it as one because Fire sorts first
   * would be the page quietly lying about its own measurement.
   *
   * Empty only when nothing in the chart carried weight.
   */
  leadElements: SignElement[];
  leadModalities: SignModality[];
  /** What was counted, heaviest first — the page shows this rather than asking
   *  the reader to trust a percentage. */
  counted: { body: string; sign: string; weight: number }[];
  /** Bodies present in the chart that were deliberately given no weight. */
  uncounted: string[];
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Every key holding the top weight, in canonical order. Empty if all are zero. */
function heaviest<K extends string>(shares: Share<K>[]): K[] {
  const top = Math.max(...shares.map((s) => s.weight));
  if (top === 0) return [];
  return shares.filter((s) => s.weight === top).map((s) => s.key);
}

export function balance(chart: Chart): Balance {
  const elementWeight: Record<SignElement, number> = {
    Fire: 0,
    Earth: 0,
    Air: 0,
    Water: 0,
  };
  const modalityWeight: Record<SignModality, number> = {
    Cardinal: 0,
    Fixed: 0,
    Mutable: 0,
  };

  const counted: Balance["counted"] = [];
  const uncounted: string[] = [];
  let total = 0;

  for (const placement of chart.placements) {
    const weight = BODY_WEIGHT[placement.body] ?? 0;
    const meta = signMeta(placement.sign);

    if (weight === 0 || !meta) {
      uncounted.push(placement.body);
      continue;
    }

    elementWeight[meta.element] += weight;
    modalityWeight[meta.modality] += weight;
    total += weight;
    counted.push({ body: placement.body, sign: placement.sign, weight });
  }

  counted.sort((a, b) => b.weight - a.weight);

  const share = (weight: number) => (total > 0 ? round1((weight / total) * 100) : 0);

  const elements = ELEMENTS.map((key) => ({
    key,
    weight: elementWeight[key],
    share: share(elementWeight[key]),
  }));
  const modalities = MODALITIES.map((key) => ({
    key,
    weight: modalityWeight[key],
    share: share(modalityWeight[key]),
  }));

  return {
    elements,
    modalities,
    missingElements: elements.filter((e) => e.weight === 0).map((e) => e.key),
    missingModalities: modalities.filter((m) => m.weight === 0).map((m) => m.key),
    leadElements: heaviest(elements),
    leadModalities: heaviest(modalities),
    counted,
    uncounted,
  };
}
