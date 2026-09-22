/**
 * Derives the reference distributions in lib/synastry/baseline.ts.
 * Run with:  npx tsx scripts/calibrate-synastry.ts
 *
 * WHY THIS EXISTS
 * `scripts/check-synastry.ts` found that raw contact mass hardly varies between
 * pairs of charts: across every stored pair the chemistry axis spanned eight
 * points. That is not a calibration failure, it is a fact about the geometry —
 * thirteen bodies against thirteen bodies throw up roughly the same number of
 * cross-aspects whoever the two people are, so the total is mostly a
 * measurement of the size of the grid. A raw score built on it says the same
 * thing about everybody.
 *
 * What does vary, and is the thing worth reporting, is how a pair compares with
 * what two unrelated charts produce. So the engine reports a percentile against
 * a reference distribution, and this script is where that reference comes from.
 * A chemistry of 92 then has a checkable meaning: more contact in this area
 * than 92% of unrelated pairings.
 *
 * HOW THE REFERENCE IS BUILT — a permutation null, not synthetic charts
 * Random longitudes would be the obvious approach and would be wrong. Real
 * charts are not random: Mercury is never more than 28° from the Sun and Venus
 * never more than 48°, so a synthetic chart produces Sun–Mercury cross-contacts
 * at a rate no real pair of people can. Instead this takes the real stored
 * charts and rotates one of each pair by a random angle. Rotation preserves
 * everything inside a chart — every natal aspect, every ruler, the whole house
 * structure — and destroys only the alignment between the two. That is exactly
 * the null wanted: these two charts, with no particular relationship to each
 * other.
 *
 * The rotated copies are structurally valid for this purpose but their `sign`
 * strings are left stale, since nothing on this path reads them.
 */

import { fetchCharts, type Chart } from "@/lib/charts";
import { crossContacts, counted } from "@/lib/synastry/contacts";
import { activation } from "@/lib/synastry/activation";
import {
  allAreas,
  contactsFor,
  DIMENSION_IDS,
  type DimensionId,
} from "@/lib/synastry/dimensions";
import { LENSES, LENS_IDS, type LensId } from "@/lib/synastry/lenses";

/** How many rotations of each pair. 136 pairs × 60 ≈ 8000 samples. */
const ROTATIONS = 60;

/** Must match TOP_CONTACTS in signature.ts. */
const TOP_CONTACTS = 8;

function rotate(chart: Chart, degrees: number): Chart {
  const turn = (longitude: number) => (((longitude + degrees) % 360) + 360) % 360;
  return {
    ...chart,
    placements: chart.placements.map((p) => ({
      ...p,
      longitude: typeof p.longitude === "number" ? turn(p.longitude) : null,
    })),
    houses: chart.houses.map((h) => ({ ...h, longitude: turn(h.longitude) })),
    angles: {
      ascendant:
        typeof chart.angles.ascendant === "number"
          ? turn(chart.angles.ascendant)
          : null,
      midheaven:
        typeof chart.angles.midheaven === "number"
          ? turn(chart.angles.midheaven)
          : null,
    },
  };
}

function stats(values: number[]): { mean: number; sd: number } {
  const mean = values.reduce((s, x) => s + x, 0) / values.length;
  const variance =
    values.reduce((s, x) => s + (x - mean) ** 2, 0) / (values.length - 1);
  return {
    mean: Math.round(mean * 10) / 10,
    sd: Math.round(Math.sqrt(variance) * 10) / 10,
  };
}

async function main() {
  const charts = await fetchCharts();
  if (charts.length < 2) {
    console.log("Need at least two stored charts to build a reference.");
    return;
  }

  const topMass: number[] = [];
  const easeValues: number[] = [];
  const lensMass = new Map<LensId, number[]>(LENS_IDS.map((id) => [id, []]));
  const lensEase = new Map<LensId, number[]>(LENS_IDS.map((id) => [id, []]));
  const areaMass = new Map<DimensionId, number[]>(
    DIMENSION_IDS.map((id) => [id, []]),
  );

  for (let i = 0; i < charts.length; i++) {
    for (let j = i + 1; j < charts.length; j++) {
      for (let r = 0; r < ROTATIONS; r++) {
        // Never near zero: a small rotation leaves the two charts almost
        // where they were, which is not a sample of "unrelated".
        const degrees = 20 + Math.random() * 320;
        const a = charts[i];
        const b = rotate(charts[j], degrees);

        const contacts = crossContacts(a, b);
        const scoring = counted(contacts);
        if (scoring.length === 0) continue;

        topMass.push(
          [...scoring]
            .sort((x, y) => y.weight - x.weight)
            .slice(0, TOP_CONTACTS)
            .reduce((sum, c) => sum + c.weight, 0),
        );

        // Each lens is scored over its own areas' contacts, so each needs its
        // own reference — the sets are much smaller than the whole grid and
        // differently sized from each other.
        for (const id of LENS_IDS) {
          const mine = contactsFor(contacts, LENSES[id].areas);
          if (mine.length === 0) continue;
          lensMass.get(id)!.push(
            [...mine]
              .sort((x, y) => y.weight - x.weight)
              .slice(0, TOP_CONTACTS)
              .reduce((sum, c) => sum + c.weight, 0),
          );

          // The ease bias has to be measured on the same set the ease is
          // computed from. The whole-grid figure is the wrong correction now:
          // a lens's areas deliberately name the pairs that carry a subject,
          // and those are the pairs that make hard aspects, so the subset's
          // null sits lower than the grid's.
          const em = mine.reduce((sum, c) => sum + c.easeWeight, 0);
          if (em > 0) {
            const sg = mine.reduce((sum, c) => sum + c.valence * c.easeWeight, 0);
            lensEase.get(id)!.push((sg / em) * 100);
          }
        }

        const easeMass = scoring.reduce((sum, c) => sum + c.easeWeight, 0);
        const signed = scoring.reduce(
          (sum, c) => sum + c.valence * c.easeWeight,
          0,
        );
        if (easeMass > 0) easeValues.push((signed / easeMass) * 100);

        // Every area, not just one lens's — a baseline has to exist before a
        // lens can show the area at all.
        for (const area of allAreas(contacts, activation(a, b), "A", "B")) {
          areaMass.get(area.id)!.push(area.evidence);
        }
      }
    }
  }

  const overall = stats(topMass);
  const ease = stats(easeValues);

  console.log(`${topMass.length} unrelated pairings sampled.\n`);
  console.log("Paste into lib/synastry/baseline.ts:\n");
  console.log("export const LENS_BASELINE: Record<LensId, Baseline> = {");
  for (const id of LENS_IDS) {
    const st = stats(lensMass.get(id)!);
    console.log(`  ${id}: { mean: ${st.mean}, sd: ${st.sd} },`);
  }
  console.log("};\n");
  console.log(`// whole-grid top-${TOP_CONTACTS} mass, for reference only: mean ${overall.mean}, sd ${overall.sd}\n`);
  console.log("export const AREA_BASELINE: Record<DimensionId, Baseline> = {");
  for (const id of DIMENSION_IDS) {
    const s = stats(areaMass.get(id)!);
    console.log(`  ${id}: { mean: ${s.mean}, sd: ${s.sd} },`);
  }
  console.log("};\n");

  console.log("export const LENS_EASE_BASELINE: Record<LensId, Baseline> = {");
  for (const id of LENS_IDS) {
    const st = stats(lensEase.get(id)!);
    console.log(`  ${id}: { mean: ${st.mean}, sd: ${st.sd} },`);
  }
  console.log("};\n");

  console.log(
    `Ease over the WHOLE grid, for reference only: mean ${ease.mean}, sd ${ease.sd}.`,
  );
  console.log(
    "  That mean is the systematic bias of the aspect and orb tables. It must",
    "\n  sit near zero, or the page calls the average couple difficult.",
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
