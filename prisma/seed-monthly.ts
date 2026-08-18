/**
 * One-shot seed for monthly_summaries (2026, January–August).
 * Run with: npx tsx prisma/seed-monthly.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DATA = [
  {
    year: 2026,
    month: 1,
    primaryProject: "Astrology Software / Money Engine",
    projects: "Astrology Software / Money Engine; Mission Control",
    body: "A major technical project was an astrology engine for identifying dominant money houses (2, 6, 8, 10, 11). We were coding planetary weights, rulership, aspects, dignity, house dominance, archetypes, and the UI. You also established Mission Control as a central planning/strategy hub.",
  },
  {
    year: 2026,
    month: 2,
    primaryProject: "Startup Intelligence / Recently Funded Startups",
    projects: "Startup Intelligence / Recently Funded Startups; business analytics",
    body: "You were building a React/TypeScript interface tracking newly funded startups across AI, infrastructure, robotics, developer tools, etc. There was also ongoing commerce/financial-analysis work.",
  },
  {
    year: 2026,
    month: 3,
    primaryProject: "Historical Cycles / Macro Regimes",
    projects: "Historical Cycles / Macro Regimes; startup intelligence",
    body: "The startup database continued, but the more important intellectual direction began becoming historical/macro cycle analysis. By late March we were building decade pages and studying long-run U.S. regimes. This starts looking like the direct precursor to Capital Physics.",
  },
  {
    year: 2026,
    month: 4,
    primaryProject: "Capital Physics",
    projects: "Capital Physics; O³ / I³; AI research",
    body: "Capital Physics became the major project: macro regimes, capital allocation, liquidity, rates, geopolitical change, etc. At the same time we were developing the more abstract Incentives → Inversion → Inflection framework. There was also substantial AI/AGI/alignment research, including Situational Awareness.",
  },
  {
    year: 2026,
    month: 5,
    primaryProject: "Capital Physics",
    projects: "Capital Physics; O³/I³/S³; ODDESSI",
    body: "Capital Physics became more productized and was being considered as an actual company/accelerator project. Crucially, the general theory separated from finance: O³ = Obvious/Opposites/Outliers; I³ = Incentives/Inversion/Inflection; S³ = Signal/Swing/Story. Meanwhile ODDESSI/Arc emerged as a major competing creative/consumer-AI project centered on personal transformation.",
  },
  {
    year: 2026,
    month: 6,
    primaryProject: "Transition: Finance → Ideas/Creation",
    projects: "Capital Physics (winding down); paradigm/systems research",
    body: "This seems to be the bridge month. Capital Physics remained alive, but attention was moving away from finance as the primary object of study. The more general question became how systems, ideas, narratives, and paradigms change. This is the incubation period immediately before Poesis.",
  },
  {
    year: 2026,
    month: 7,
    primaryProject: "Poesis",
    projects: "Poesis",
    body: "This is the huge shift. Poesis gets named around July 1 and rapidly becomes the dominant intellectual project. O³ becomes Opposites / Obvious / Outliers, and we start building the actual derivation engine, knowledge base, protocols, laws, and case studies. Literature becomes the laboratory: Harry Potter, Hunger Games, Fifty Shades, Da Vinci Code, Alchemist, Bible, Catcher, etc.",
  },
  {
    year: 2026,
    month: 8,
    primaryProject: "Poesis",
    projects: "Poesis + literature; Kyros / Capital Physics revival",
    body: "Poesis becomes much deeper: literary history, paradigm references, structural inversions, outlier chains, anchors/influences/creations, historical context. You also begin thinking seriously about writing fiction. At the same time, the old finance framework comes back in a new form: Kyros, essentially 'Poesis for markets,' using I\u00b3 \u2014 Inversion, Incentives, Inflection \u2014 alongside 9Sigma and the Macro Framework under Capital Physics.",
  },
];

async function main() {
  console.log("Seeding monthly summaries…");
  for (const row of DATA) {
    await prisma.monthlySummary.upsert({
      where: { year_month: { year: row.year, month: row.month } },
      update: { primaryProject: row.primaryProject, projects: row.projects, body: row.body },
      create: row,
    });
    console.log(`  ✓ ${row.year}/${String(row.month).padStart(2, "0")}`);
  }
  console.log("Done.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
