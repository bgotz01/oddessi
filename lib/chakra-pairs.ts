/** lib/chakra-pairs.ts
 * The seven fold around the Heart into three pairs, each the same distance
 * from it: Root ↔ Crown, Sacral ↔ Third Eye, Solar Plexus ↔ Throat. The lower
 * centre of each pair and the upper one name the two ends of a single axis.
 *
 * Pairs are stored by chakra number only. The partner is always 8 − n, so the
 * folding is checked here rather than trusted.
 */

export interface ChakraPair {
  lower: number;
  upper: number;
  /** Two readings of the axis, primary first: [lower end, upper end]. */
  axes: [[string, string], [string, string]];
}

export const CHAKRA_PAIRS: ChakraPair[] = [
  {
    lower: 1,
    upper: 7,
    axes: [
      ["Ground", "Transcendence"],
      ["Material", "Spiritual"],
    ],
  },
  {
    lower: 2,
    upper: 6,
    axes: [
      ["Desire", "Understanding"],
      ["Experience", "Perception"],
    ],
  },
  {
    lower: 3,
    upper: 5,
    axes: [
      ["Will", "Expression"],
      ["Action", "Communication"],
    ],
  },
];

/** The centre the pairs fold around. */
export const CHAKRA_CENTRE = {
  number: 4,
  axes: ["Connection", "Integration"] as [string, string],
};

for (const p of CHAKRA_PAIRS) {
  if (p.lower + p.upper !== 8) {
    throw new Error(`Chakra pair ${p.lower}↔${p.upper} does not fold around the Heart`);
  }
}
