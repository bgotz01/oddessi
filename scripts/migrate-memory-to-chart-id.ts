/**
 * One-time migration: move CouncilMemory rows that use the old
 * "ChartName — Category" prefix scheme (chartId = null) into the new
 * per-chartId scheme (chartId = real UUID, category = bare name).
 *
 * Run with:
 *   npx tsx scripts/migrate-memory-to-chart-id.ts
 *
 * Safe to re-run: rows that have already been migrated have their old
 * prefixed counterpart deleted, so a second run finds nothing to do.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // All rows that are in the old format: chartId = null AND category contains " — "
  const oldRows = await prisma.councilMemory.findMany({
    where: {
      chartId: null,
      category: { contains: " — " },
    },
  });

  if (oldRows.length === 0) {
    console.log("Nothing to migrate — no old-format rows found.");
    return;
  }

  console.log(`Found ${oldRows.length} row(s) to migrate.`);

  // Cache chart lookups so we only hit the DB once per unique name.
  const chartCache = new Map<string, string | null>(); // name → id | null

  async function resolveChartId(name: string): Promise<string | null> {
    if (chartCache.has(name)) return chartCache.get(name)!;
    const chart = await prisma.birthChartData.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
      select: { id: true },
    });
    const id = chart?.id ?? null;
    chartCache.set(name, id);
    return id;
  }

  let migrated = 0;
  let skipped = 0;

  for (const row of oldRows) {
    // Split on the first " — " only — category names can contain " — " too.
    const sepIdx = row.category.indexOf(" — ");
    const chartName = row.category.slice(0, sepIdx).trim();
    const bareCategory = row.category.slice(sepIdx + 3).trim();

    if (!chartName || !bareCategory) {
      console.warn(`  Skipping malformed row: "${row.category}"`);
      skipped++;
      continue;
    }

    const chartId = await resolveChartId(chartName);

    if (!chartId) {
      console.warn(`  No chart found for name "${chartName}" — skipping row: "${row.category}"`);
      skipped++;
      continue;
    }

    // Check if a row already exists at the target (chartId, bareCategory).
    const existing = await prisma.councilMemory.findFirst({
      where: { chartId, category: bareCategory },
    });

    if (existing) {
      // Merge: append any content from the old row that isn't already there.
      const oldLines = row.content.split("\n").map((l) => l.trim()).filter(Boolean);
      const existingLines = new Set(
        existing.content.split("\n").map((l) => l.trim()).filter(Boolean)
      );
      const newLines = oldLines.filter((l) => !existingLines.has(l));

      if (newLines.length > 0) {
        const merged = [existing.content.trim(), ...newLines].join("\n");
        await prisma.councilMemory.update({
          where: { id: existing.id },
          data: { content: merged },
        });
        console.log(`  Merged ${newLines.length} line(s) into "${chartName}" / "${bareCategory}"`);
      } else {
        console.log(`  "${chartName}" / "${bareCategory}" already up to date — deleting duplicate`);
      }
    } else {
      // Create the new scoped row.
      await prisma.councilMemory.create({
        data: { chartId, category: bareCategory, content: row.content },
      });
      console.log(`  Moved "${chartName}" / "${bareCategory}" → chartId ${chartId}`);
    }

    // Remove the old prefixed row regardless.
    await prisma.councilMemory.delete({ where: { id: row.id } });
    migrated++;
  }

  console.log(`\nDone. ${migrated} row(s) migrated, ${skipped} skipped.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
