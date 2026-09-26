// lib/industry/markets-uranus-gemini-data.ts
// Uranus in Gemini, one cycle apart: the 1941–49 transit read against the
// 2026–33 one. Same domain (exchange), a different thing disrupted. The
// 2026–33 column is a proposal, not a finding: see hypothesis on the Gemini era.

export const GEMINI_CYCLES = [
  { key: "past", period: "1941–49", hypothesis: false },
  { key: "next", period: "2026–33", hypothesis: true },
] as const;

export type GeminiCycleRow = {
  axis: string;
  past: string;
  next: string;
  // The row the comparison turns on; set in the era colour.
  emphasis?: boolean;
};

export const GEMINI_CYCLE_ROWS: readonly GeminiCycleRow[] = [
  { axis: "Gemini domain", past: "Exchange", next: "Exchange" },
  { axis: "What gets disrupted", past: "Human calculation & information processing", next: "Human reasoning & intelligence processing" },
  { axis: "Emerging theme", past: "Electronic computing", next: "AI economy", emphasis: true },
  { axis: "Old system", past: "Humans calculate/process information", next: "Humans analyze/reason/execute knowledge work" },
  { axis: "New system", past: "Machines process information", next: "Machines process intelligence" },
  { axis: "Catalyst", past: "WWII information/calculation demands", next: "Generative AI + agents" },
  { axis: "Breakthrough interface", past: "Stored programs", next: "Agents + tools" },
  { axis: "Infrastructure", past: "Vacuum tubes → transistor", next: "GPUs → AI compute/data centers" },
  { axis: "Economic unit", past: "Computation", next: "Intelligence" },
  { axis: "Potential endpoint", past: "Computer industry", next: "Agentic economy" },
];
