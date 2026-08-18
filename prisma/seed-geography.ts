/**
 * Upserts geography for all known months across 2024, 2025, 2026.
 * For 2024 rows that don't exist yet, minimal placeholder work fields are used
 * so the row is valid — fill in real summaries later.
 * Run with: npx tsx prisma/seed-geography.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GEO: { year: number; month: number; geography: string }[] = [
  // 2024
  { year: 2024, month: 2,  geography: "Medellín" },
  { year: 2024, month: 3,  geography: "Medellín" },
  { year: 2024, month: 4,  geography: "Medellín" },
  { year: 2024, month: 5,  geography: "Rio de Janeiro" },
  { year: 2024, month: 6,  geography: "Thailand" },
  { year: 2024, month: 7,  geography: "Dubai · Greece · Montenegro" },
  { year: 2024, month: 8,  geography: "Madrid" },
  { year: 2024, month: 9,  geography: "Madrid" },
  { year: 2024, month: 10, geography: "São Paulo" },
  { year: 2024, month: 11, geography: "Rio de Janeiro" },
  { year: 2024, month: 12, geography: "Buenos Aires" },

  // 2025
  { year: 2025, month: 1,  geography: "São Paulo" },
  { year: 2025, month: 2,  geography: "São Paulo" },
  { year: 2025, month: 3,  geography: "Rio de Janeiro" },
  { year: 2025, month: 4,  geography: "Tulum" },
  { year: 2025, month: 5,  geography: "Tulum" },
  { year: 2025, month: 6,  geography: "Medellín" },
  { year: 2025, month: 7,  geography: "Madrid" },
  { year: 2025, month: 8,  geography: "Madrid" },
  { year: 2025, month: 9,  geography: "Madrid" },
  { year: 2025, month: 10, geography: "Bali" },
  { year: 2025, month: 11, geography: "Bali" },
  { year: 2025, month: 12, geography: "Tulum" },

  // 2026
  { year: 2026, month: 1,  geography: "Miami" },
  { year: 2026, month: 2,  geography: "Miami" },
  { year: 2026, month: 3,  geography: "Medellín" },
  { year: 2026, month: 4,  geography: "Rio de Janeiro" },
  { year: 2026, month: 5,  geography: "Rio de Janeiro" },
  { year: 2026, month: 6,  geography: "Madrid" },
  { year: 2026, month: 7,  geography: "Bali" },
  { year: 2026, month: 8,  geography: "Bali" },
];

async function main() {
  console.log("Seeding geography…");

  for (const { year, month, geography } of GEO) {
    const existing = await prisma.monthlySummary.findUnique({
      where: { year_month: { year, month } },
    });

    if (existing) {
      await prisma.monthlySummary.update({
        where: { year_month: { year, month } },
        data: { geography },
      });
    } else {
      // 2024 rows don't have work summaries yet — create minimal placeholders
      await prisma.monthlySummary.create({
        data: {
          year,
          month,
          primaryProject: "—",
          projects: "—",
          body: "",
          geography,
        },
      });
    }

    console.log(`  ✓ ${year}/${String(month).padStart(2, "0")}  →  ${geography}`);
  }

  console.log("Done.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
