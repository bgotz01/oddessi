/**
 * Recache life cycles for every chart that has no cached cycles.
 * Run with:  npx tsx scripts/recache-all-cycles.ts
 *
 * Requires the dev server to be running at localhost:3000, OR run directly
 * with Prisma/swisseph available (no server needed via --direct flag).
 *
 * Usage:
 *   npx tsx scripts/recache-all-cycles.ts           # via HTTP (server must be running)
 *   npx tsx scripts/recache-all-cycles.ts --all     # recache ALL charts, not just empty ones
 */

import { prisma } from "@/lib/prisma";
import { calculateBirthChart } from "@/lib/astrology/server-calculator";
import { cacheLifeCyclesForChart, hasCachedLifeCycles } from "@/lib/astrology/cache-life-cycles";

const recacheAll = process.argv.includes("--all");

async function main() {
  const charts = await prisma.birthChartData.findMany({
    select: {
      id: true,
      birthDate: true,
      birthTime: true,
      birthTimezone: true,
      birthLatitude: true,
      birthLongitude: true,
      birthLocation: true,
    },
    orderBy: { createdAt: "asc" },
  });

  console.log(`Found ${charts.length} chart(s) total.`);

  let skipped = 0;
  let succeeded = 0;
  let failed = 0;

  for (const chart of charts) {
    const alreadyCached = await hasCachedLifeCycles(chart.id);

    if (alreadyCached && !recacheAll) {
      console.log(`  ↷ Skipping ${chart.id} (${chart.birthLocation ?? "unknown"}) — already cached`);
      skipped++;
      continue;
    }

    console.log(`  → Caching ${chart.id} (${chart.birthLocation ?? "unknown"}, ${chart.birthDate.toISOString().slice(0, 10)})...`);

    try {
      const birthData = {
        date: chart.birthDate.toISOString().slice(0, 10),
        time: chart.birthTime,
        timezone: chart.birthTimezone,
        latitude: chart.birthLatitude,
        longitude: chart.birthLongitude,
        location: chart.birthLocation ?? "Unknown",
      };

      const natalChart = await calculateBirthChart(birthData);

      const result = await cacheLifeCyclesForChart(chart.id, natalChart, {
        lookbackYears: 20,
        lookaheadYears: 25,
        includeJupiter: true,
        includeMinorAspects: false,
      });

      console.log(`    ✓ Cached ${(result as any).cachedCount ?? "?"} cycles`);
      succeeded++;
    } catch (err) {
      console.error(`    ✗ Failed:`, err instanceof Error ? err.message : err);
      failed++;
    }
  }

  console.log(`\nDone. Succeeded: ${succeeded}, Skipped: ${skipped}, Failed: ${failed}`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
