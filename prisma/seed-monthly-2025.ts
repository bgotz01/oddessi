/**
 * Seed for monthly_summaries — 2025 (January–December).
 * Run with: npx tsx prisma/seed-monthly-2025.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DATA = [
  {
    year: 2025,
    month: 1,
    primaryProject: "Markets + Pattern Analysis",
    projects: "Markets + Pattern Analysis; Law of Opposites (O1); AI pattern detection",
    body: "A surprisingly busy month. You built a Next.js stock/trading dashboard with Python data processing: ATH drawdowns, 50/200-day moving averages, market-cap filters, watchlists, TradingView integration, etc. You were also experimenting with AI pattern detection, including an SBF/FTX project analyzing language and pre-collapse fraud signals. Separately, the Law of Opposites (O1) was already being used to analyze cultural changes between decades, including popular music.",
  },
  {
    year: 2025,
    month: 2,
    primaryProject: "Startup / Investment Intelligence",
    projects: "Startup / Investment Intelligence",
    body: "The investment-research direction continued, particularly systematic tracking of recently funded startups across AI/software and other emerging sectors. This looks like an early version of the startup-intelligence work that later became much more structured.",
  },
  {
    year: 2025,
    month: 3,
    primaryProject: "Markets / Investment Research",
    projects: "Markets / Investment Research",
    body: "The surviving record is thinner here. Finance, markets and company/startup research appear to have remained the dominant background, but there is not enough evidence to confidently identify a distinct new flagship project for March.",
  },
  {
    year: 2025,
    month: 4,
    primaryProject: "Markets / Research Systems",
    projects: "Markets / Research Systems",
    body: "Again, relatively sparse. It appears to be continued investment/research work rather than the launch of a clearly separate intellectual project. A more specific primary project cannot be assigned without stronger evidence.",
  },
  {
    year: 2025,
    month: 5,
    primaryProject: "Startup Intelligence",
    projects: "Startup Intelligence",
    body: "The startup-financing database was clearly active. You were systematically tracking companies and rounds — including StackAI, Sanity, Recraft and Decagon — suggesting an increasingly structured venture/startup intelligence dataset rather than casual company research.",
  },
  {
    year: 2025,
    month: 6,
    primaryProject: "Startup Intelligence",
    projects: "Startup Intelligence; travel period",
    body: "Startup/funding tracking continued, including Browserbase, Synthflow, Delphi and others. This was also around the period when you were traveling internationally, so the work seems to have been somewhat more distributed rather than centered on a single new major build.",
  },
  {
    year: 2025,
    month: 7,
    primaryProject: "Venture / AI Market Intelligence",
    projects: "Venture / AI Market Intelligence",
    body: "Venture tracking became particularly active: Thinking Machines, Moonvalley, Harmonic, Genesis AI, Lovable, Hadrian, OpenEvidence, etc. The emphasis was heavily toward AI and frontier technology, essentially mapping where venture capital was accumulating.",
  },
  {
    year: 2025,
    month: 8,
    primaryProject: "Markets + Capital Physics Precursors",
    projects: "Markets + Capital Physics precursors; startup intelligence",
    body: "Investment/startup intelligence continued — Cohere, Cognition, Firecrawl, Framer, etc. — but this period also starts looking more like the intellectual precursor to the later Capital Physics / macro-framework work: trying to understand markets through structural forces rather than merely individual securities.",
  },
  {
    year: 2025,
    month: 9,
    primaryProject: "Investment Intelligence",
    projects: "Investment Intelligence",
    body: "Continued company/funding tracking, including companies such as Attio, Eyebot and Copper. Broadly, this still looks like a capital + technology intelligence phase rather than the creative/literary direction that dominates 2026.",
  },
  {
    year: 2025,
    month: 10,
    primaryProject: "Unclear / Transitional",
    projects: "Unclear / Transitional",
    body: "This is currently the weakest month in the recoverable record. There is not enough month-specific evidence to responsibly designate a primary project.",
  },
  {
    year: 2025,
    month: 11,
    primaryProject: "Startup / Financial Research",
    projects: "Startup / Financial Research",
    body: "Startup-financing tracking remained active. The overall pattern is still strongly finance/business-oriented: companies, capital, investments and identifying emerging sectors.",
  },
  {
    year: 2025,
    month: 12,
    primaryProject: "Finance / Business Systems",
    projects: "Finance / Business Systems",
    body: "Investment tracking continued, while there is also evidence of more operational financial analysis — revenue, advertising, payroll, shipping, taxes, refunds, software expenses, etc. So December looks more like finance + business operations/data than a new conceptual framework.",
  },
];

async function main() {
  console.log("Seeding 2025 monthly summaries…");
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
