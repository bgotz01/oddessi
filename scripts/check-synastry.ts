/**
 * Calibration check for lib/synastry. Run with:  npx tsx scripts/check-synastry.ts
 *
 * There is no test runner in this project, and the constants in the synastry
 * engine are the kind that look reasonable in the source and turn out to put
 * every couple in the same cell. This walks every pair of stored charts and
 * prints the distribution, which is the only way to find that out.
 *
 * It has already earned its keep twice. The first run put 85% of stored pairs
 * in one cell, which turned out to be the hard aspects having been given wider
 * orbs than the soft ones — a bias of about −20 ease points applied to
 * everybody. The second showed chemistry spanning eight points across every
 * pair in the database, which is why both axes are now percentiles against the
 * reference in `lib/synastry/baseline.ts` rather than scores.
 *
 * WHAT TO LOOK FOR
 *   Cells       no cell should hold most of the pairs. `bonded` is genuinely
 *               uncommon for the structural reason given in signature.ts.
 *   Chemistry   the median should sit near 50, which is what the reference
 *               says a pairing with no relationship produces. Far off means
 *               the baseline has gone stale — re-run calibrate-synastry.ts.
 *   Areas       the seven medians should be comparable with each other. One
 *               area sitting far above the rest means its baseline is wrong,
 *               not that everybody is unusually strong there.
 *   Contacts    a mean far above thirty means the orbs have crept wide again.
 */

import { fetchCharts } from "@/lib/charts";
import { synastry, comparable } from "@/lib/synastry";
import { CELL, LENSES, LENS_IDS, type Cell } from "@/lib/synastry";
import type { DimensionId } from "@/lib/synastry";

function pad(value: string | number, width: number): string {
  return String(value).padEnd(width);
}

function lead(value: string | number, width: number): string {
  return String(value).padStart(width);
}

async function main() {
  const charts = await fetchCharts();
  console.log(`${charts.length} charts stored.\n`);

  if (charts.length < 2) {
    console.log("Need at least two charts to check anything.");
    return;
  }

  const cells = new Map<Cell, number>();
  const areaTotals = new Map<DimensionId, number[]>();
  const counts: number[] = [];
  const excludedCounts: number[] = [];
  const chemistries: number[] = [];
  const eases: number[] = [];

  console.log(
    `${pad("pair", 44)}${lead("contacts", 9)}${lead("cohort", 8)}${lead("chem", 6)}${lead("ease", 6)}  cell`,
  );
  console.log("─".repeat(92));

  for (let i = 0; i < charts.length; i++) {
    for (let j = i + 1; j < charts.length; j++) {
      const a = charts[i];
      const b = charts[j];
      if (!comparable(a, b)) continue;

      const reading = synastry(a, b);
      const s = reading.signature;

      cells.set(s.cell, (cells.get(s.cell) ?? 0) + 1);
      counts.push(s.contactCount);
      excludedCounts.push(reading.excluded.length);
      chemistries.push(s.chemistry);
      if (s.ease !== null) eases.push(s.ease);
      // The default lens only; the per-lens check above covers the rest.
      for (const area of reading.areas) {
        areaTotals.set(area.id, [...(areaTotals.get(area.id) ?? []), area.chemistry]);
      }

      console.log(
        pad(`${a.name} × ${b.name}`.slice(0, 43), 44) +
          lead(s.contactCount, 9) +
          lead(reading.excluded.length, 8) +
          lead(s.chemistry, 6) +
          lead(s.ease ?? "—", 6) +
          "  " +
          CELL[s.cell].label,
      );
    }
  }

  const pairs = counts.length;
  if (pairs === 0) {
    console.log("\nNo comparable pairs.");
    return;
  }

  const mean = (xs: number[]) =>
    Math.round((xs.reduce((s, x) => s + x, 0) / xs.length) * 10) / 10;
  const span = (xs: number[]) => `${Math.min(...xs)}–${Math.max(...xs)}`;
  const at = (xs: number[], q: number) =>
    [...xs].sort((x, y) => x - y)[
      Math.min(xs.length - 1, Math.floor(q * xs.length))
    ];
  /** The shape of a distribution, which is what a band edge has to be set from. */
  const quartiles = (xs: number[]) =>
    `p10 ${lead(at(xs, 0.1), 4)}  p25 ${lead(at(xs, 0.25), 4)}  p50 ${lead(at(xs, 0.5), 4)}  p75 ${lead(at(xs, 0.75), 4)}  p90 ${lead(at(xs, 0.9), 4)}`;

  console.log(`\n${pairs} pairs.\n`);
  console.log(
    `Counted contacts per pair: mean ${mean(counts)}, range ${span(counts)}`,
  );
  console.log(
    `Excluded as cohort:        mean ${mean(excludedCounts)}, range ${span(excludedCounts)}`,
  );

  console.log("\nSignature axes — a median chemistry far from 50 means a stale baseline:");
  console.log(`  chemistry   ${quartiles(chemistries)}`);
  console.log(`  ease        ${quartiles(eases)}`);

  console.log("\nCells — flat is bad, one cell holding everything is worse:");
  for (const [cell, n] of [...cells.entries()].sort((x, y) => y[1] - x[1])) {
    console.log(
      `  ${pad(CELL[cell].label, 12)}${lead(n, 4)}  ${Math.round((n / pairs) * 100)}%`,
    );
  }

  console.log(
    "\nLenses — each is scored over its OWN areas' contacts, so these must differ:",
  );
  {
    const [a, b] = charts;
    const reading = synastry(a, b);

    for (const l of reading.lensScores) {
      console.log(
        `  ${pad(l.label, 13)}${pad(CELL[l.cell].label, 11)}chem ${lead(l.chemistry, 3)}  ease ${lead(l.ease ?? "—", 4)}  n=${lead(l.contactCount, 2)}`,
      );
    }

    // The page used to assert the opposite — that the cell held steady across
    // every lens — on the grounds that a question cannot change how much two
    // charts touch. It cannot change the TOTAL, but the headline reads only
    // the contacts the shown areas are built from, and a romance and a working
    // partnership are built from different pairs. A lens set that produced
    // identical scores would mean the lenses are not selecting anything.
    const distinct = new Set(
      reading.lensScores.map((l) => `${l.chemistry}/${l.ease}`),
    );
    console.log(
      distinct.size > 1
        ? `  ✓ the four lenses score differently (${distinct.size} distinct readings)`
        : "  ✗ BROKEN — every lens scored the same; the area sets are not selecting",
    );

    // The headline must summarise the areas on screen, which is the defect this
    // whole arrangement exists to fix: a neutral cell above charged bars.
    for (const id of LENS_IDS) {
      const r = synastry(a, b, id);
      const shown = r.areas.filter((x) => x.ease !== null);
      if (shown.length === 0) continue;
      const areaMean =
        shown.reduce((sum, x) => sum + (x.ease ?? 0), 0) / shown.length;
      const head = r.signature.ease ?? 0;
      const agree = Math.sign(areaMean) === Math.sign(head) || Math.abs(areaMean) < 10;
      if (!agree) {
        console.log(
          `  ✗ ${LENSES[id].label}: headline ease ${head} disagrees in sign with its areas (mean ${areaMean.toFixed(0)})`,
        );
      }
    }
  }

  console.log("\nArea chemistry — the per-area baselines are right if these medians are comparable:");
  for (const [id, values] of areaTotals) {
    console.log(
      `  ${pad(id, 15)}mean ${lead(mean(values), 5)}   range ${lead(span(values), 7)}   ${quartiles(values)}`,
    );
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
