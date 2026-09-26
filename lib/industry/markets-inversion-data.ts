// lib/industry/markets-inversion-data.ts
// The inversion: the 2008–2025 era of parked capital read against the regime
// emerging from 2026. Each outer planet changes sign, and each keeps the logic
// of its own page (Pluto = how capital is organized into power, Uranus = what
// gets disrupted and which type of asset outperforms because of it, Neptune =
// the narrative capital believes in). Owning assets is never the problem: each
// Uranus era changes which kind of asset outperforms. Parked →
// Activated is not any one planet's inversion: it is the synthesis the three
// transitions produce together. The emerging side is a proposal, not a finding:
// every Neptune, Uranus and Pluto era it draws on is still a hypothesis.

import { MARKETS_NEPTUNE_ERAS } from "@/lib/industry/markets-neptune-eras-data";
import { MARKETS_URANUS_ERAS } from "@/lib/industry/markets-uranus-eras-data";
import { MARKETS_PLUTO_ERAS } from "@/lib/industry/markets-pluto-eras-data";

type Planet = "Pluto" | "Uranus" | "Neptune";
type Era = { sign: string; symbol: string; color: string; startYear: number; endYear: number };

const ERAS: Record<Planet, readonly Era[]> = {
  Pluto: MARKETS_PLUTO_ERAS,
  Uranus: MARKETS_URANUS_ERAS,
  Neptune: MARKETS_NEPTUNE_ERAS,
};
const GLYPHS: Record<Planet, string> = { Pluto: "♇", Uranus: "♅", Neptune: "♆" };

// Sign, colour and dates come from the planet's own page.
function placement(planet: Planet, sign: string) {
  const era = ERAS[planet].find((item) => item.sign === sign)!;
  return { planet, glyph: GLYPHS[planet], sign, symbol: era.symbol, color: era.color, startYear: era.startYear, endYear: era.endYear };
}

export type InversionPlacement = ReturnType<typeof placement>;

export const PREVIOUS_ERA = {
  period: "2008–2025",
  name: "Capital Parked",
  status: "Mature expression of the previous capital regime",
  title: "Capital as passive exposure",
  // Bullet fragments only, no prose.
  readings: [
    {
      ...placement("Pluto", "Capricorn"),
      keyword: "Institutional monetary power",
      dimension: "Institution",
      points: [
        "Central-bank policy sets the price of money",
        "Asset managers & index providers turn it into investable exposure",
        "ETFs & passive flows make delegation powerful",
        "Choose an exposure, leave capital parked",
      ],
    },
    {
      ...placement("Uranus", "Taurus"),
      keyword: "Stability disrupted",
      dimension: "Stability",
      points: [
        "Taurus’s domain: physical & economic stability",
        "Lockdowns, supply shocks & shifting monetary conditions",
        "Where economic activity must occur is no longer fixed",
        "Digital assets outperform stable physical ones",
        "Cloud, SaaS, crypto, remote commerce, eventually AI compute",
      ],
    },
    {
      ...placement("Neptune", "Pisces"),
      keyword: "Collective participation",
      dimension: "Participation",
      points: [
        "Platforms dissolve the line between producer & participant",
        "Drivers supply cars, hosts rooms, creators media, users the network",
        "Enter systems you don’t own",
        "Access to audiences, income & markets once held by institutions",
      ],
    },
  ],
} as const;

// No end date: this marks an inflection, not a known span. Every point is
// drawn from the planet's own (hypothesis) era; each reading carries the test
// its page says it still has to pass.
export const NEXT_ERA = {
  period: "2026+",
  name: "Capital Activated",
  status: "Proposed emerging regime",
  hypothesis: true,
  title: "Capital as active mandate",
  // The strongest case against the era as a whole.
  objection: "So far the evidence runs toward concentration: AI capex and frontier capital sit with a few model & chip providers, not with networks.",
  readings: [
    {
      ...placement("Pluto", "Aquarius"),
      keyword: "Networked coordination",
      dimension: "Network",
      points: [
        "Capital power organized through networks, not central institutions",
        "Coordination through protocols, communities & shared signals",
        "Early architectures: blockchain, retail communities",
        "AI agents emerge as potential participants",
      ],
      test: "Do networks distribute power or create new centers of control?",
    },
    {
      ...placement("Uranus", "Gemini"),
      keyword: "Intelligence disrupted",
      dimension: "Intelligence",
      points: [
        "Gemini’s domain: information & exchange",
        "Intelligence becomes an abundant, scalable input",
        "Agents communicate, negotiate & transact",
        "Proposed outperformers: assets that disrupt the exchange of information, knowledge, decisions & transactions",
        "Underperformers: businesses built on expensive human knowledge work",
      ],
      test: "Does AI remake exchange, or add a layer to it?",
    },
    {
      ...placement("Neptune", "Aries"),
      keyword: "Individual initiative",
      dimension: "Initiative",
      points: [
        "The pioneer becomes the capital ideal",
        "Begin where markets have no settled shape",
        "From joining systems → creating them",
        "Frontier AI, space & robotics",
      ],
      test: "Which new beginnings become enduring businesses?",
    },
  ],
} as const;

// The three transitions don't share boundaries; 2026 is when the new
// configuration becomes visible together.
export const BOUNDARY_NOTE = "The three transitions don’t share boundaries. 2026 is interesting because it is when the new configuration becomes visible together.";

export type InversionPair = {
  from: string;
  to: string;
  // The emerging side is an open question, not a claim.
  open?: boolean;
};

export type InversionGroup = {
  from: InversionPlacement;
  to: InversionPlacement;
  // The first pair is the group's headline.
  pairs: InversionPair[];
  // What this transition contributes to the synthesis.
  gives: string;
  term: string;
};

// Deliberately not symmetrical: each row keeps its planet's own logic rather
// than inverting a word for the sake of the pattern.
export const INVERSION_GROUPS: readonly InversionGroup[] = [
  {
    from: placement("Pluto", "Capricorn"),
    to: placement("Pluto", "Aquarius"),
    pairs: [
      { from: "Institution", to: "Network" },
      { from: "Central authority", to: "Network coordination" },
      { from: "Concentrated control", to: "Distributed or concentrated nodes?", open: true },
      { from: "Scale", to: "Coordination" },
    ],
    gives: "A new power architecture",
    term: "Network",
  },
  {
    from: placement("Uranus", "Taurus"),
    to: placement("Uranus", "Gemini"),
    pairs: [
      { from: "Stability disrupted", to: "Intelligence disrupted" },
      { from: "Digital outperforms physical", to: "Machine intelligence outperforms human knowledge work" },
      { from: "Fixed economic structures", to: "Adaptive systems" },
      { from: "Digital migration", to: "Intelligent routing" },
    ],
    gives: "Machine intelligence",
    term: "Intelligence",
  },
  {
    from: placement("Neptune", "Pisces"),
    to: placement("Neptune", "Aries"),
    pairs: [
      { from: "Participation", to: "Initiative" },
      { from: "Collective", to: "Individual" },
      { from: "Passive", to: "Active" },
      { from: "Join", to: "Create" },
    ],
    gives: "An active actor",
    term: "Initiative",
  },
];

// Parked → Activated names a behavior, not a stock of wealth, and it belongs to
// the synthesis, not to any single planet.
export const THESIS = {
  from: "Parked",
  to: "Activated",
  line: "The last era taught us how to park capital. The next era will teach us how to activate it.",
  // The emergent inversion; deliberately not assigned to Uranus.
  behavior: ["Holding", "Moving"],
  // How Uranus in Gemini connects to activation without changing what Gemini means.
  mechanism: {
    claim: "Intelligence enables activation.",
    reading: "Uranus in Gemini doesn’t mean capital moves. It provides the intelligence that allows capital to move continuously.",
    from: { name: "The ETF", kind: "A static instruction", example: "Put 60% here, 30% here, 10% here." },
    to: { name: "The agent", kind: "A dynamic mandate", example: "Maximize X subject to Y risk, liquidity and duration constraints. Then continuously interpret information and alter allocation." },
  },
  paradigms: [
    {
      ...PREVIOUS_ERA,
      shift: "The great innovation was increasingly frictionless exposure.",
      process: ["ETF", "Index", "Passive allocation", "Buy and hold"],
      job: ["Earn capital", "Choose exposure", "Park capital", "Compound"],
      jobNote: "The investor’s job became progressively smaller.",
      archetype: "The ETF",
    },
    {
      ...NEXT_ERA,
      shift: "Capital doesn’t need to remain attached to one asset class, geography, duration, currency, or strategy.",
      process: ["Agent", "Routing", "Active allocation", "Continuous redeployment"],
      job: ["Provide capital", "Define mandate", "Activate capital", "Continuously reallocate"],
      jobNote: "The investor’s job becomes defining the objective.",
      archetype: "The agent",
    },
  ],
  // What the thesis does not claim, and why.
  notClaims: [
    {
      name: "The ETF era is over",
      reason: "ETFs can remain enormous while the dominant capital paradigm changes. The claim is narrower: the era in which simply parking capital in broad risk assets was the defining strategy is ending.",
    },
    {
      name: "Decentralized capital",
      reason: "Too crypto-specific and Aquarius-heavy: it reads one planet’s inversion as the whole era.",
    },
  ],
} as const;
