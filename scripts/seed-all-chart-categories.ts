import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SEED_CATEGORIES = [
  "Character",
  "Western Readings",
  "Eastern Readings",
  "Numerology Readings",
  "The Record",
  "Working Notes",
  "Questions Asked",
  "Notes",
  "Western Notes",
  "Eastern Notes",
  "Numerology Notes",
];

async function main() {
  const charts = await prisma.birthChartData.findMany({
    select: { id: true, name: true },
  });

  console.log(`Found ${charts.length} chart(s): ${charts.map((c) => c.name).join(", ")}\n`);

  for (const chart of charts) {
    const existing = await prisma.councilMemory.findMany({
      where: { chartId: chart.id },
      select: { category: true },
    });
    const existingNames = new Set(existing.map((r) => r.category));
    const missing = SEED_CATEGORIES.filter((c) => !existingNames.has(c));

    if (missing.length > 0) {
      await prisma.councilMemory.createMany({
        data: missing.map((category) => ({ chartId: chart.id, category, content: "" })),
      });
      console.log(`${chart.name}: added ${missing.length} category/ies — ${missing.join(", ")}`);
    } else {
      console.log(`${chart.name}: already complete (${existing.length} categories)`);
    }
  }

  console.log("\nDone.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
