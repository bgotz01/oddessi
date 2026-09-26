// lib/industry/markets-uranus-eras-data.ts
// Uranus = disruption; applied to capital markets, what gets disrupted
// and the market theme that emerges from that disruption. Uranus does not
// express the sign; it disrupts the sign's domain, and capital flows toward the
// new paradigm the disruption creates (never just a technology matched to a sign).
// The point is forecasting: which themes outperform.
//   Internet → Collective entanglement → Digital entrepreneurship → Digital economy → AI economy
// A catalyst can land just before its era: the shock that makes the theme possible.
// Bullet fragments only, no prose, no sources. Gemini is a proposed theme, not a
// finding. Keep chronological: the timeline derives its bounds and widths from
// this data.

export type MarketsUranusEra = {
  sign: string;
  symbol: string;
  startYear: number;
  endYear: number;
  color: string;
  domain: string;
  // What gets disrupted, under the domain in the timeline column.
  disruption: string;
  // The emerging theme; the column and drawer headline.
  headline: string;
  tagline: string;
  interpretation: string[];
  // What investors were visibly rewarding: the era's empirical fingerprint.
  marketSignature: string[];
  // Label on the timeline; the drawer adds the detail.
  manifestations: { label: string; detail: string }[];
  catalysts: {
    year: number;
    period?: string;
    // Overrides the automatic "Precursor" tag, e.g. "Emerging".
    label?: string;
    title: string;
    description: string[];
    unlocks: string[];
  }[];
  // Where the disruption overshoots: the era's bust.
  shadow: string[];
  transition: string[];
  // Forward-looking: the drawer marks it as a proposal, not a finding.
  hypothesis?: boolean;
};

export const MARKETS_URANUS_ERAS: readonly MarketsUranusEra[] = [
  {
    sign: "Aquarius", symbol: "♒", startYear: 1995, endYear: 2003,
    color: "#a8b4c0", domain: "Networks",
    disruption: "Physical & economic activity becomes networked",
    headline: "Internet",
    tagline: "Put everything on the network",
    interpretation: [
      "Commerce, media & communication move onto the network",
      "New business models: e-commerce, search, portals",
      "Valuations price in the networked future",
      "Capital rewards users & growth over profits",
    ],
    marketSignature: ["Nasdaq", "Tech IPOs", "Internet users", "Telecom capex"],
    manifestations: [
      { label: "Dot-coms", detail: "Dot-com companies & the IPO boom" },
      { label: "E-commerce", detail: "E-commerce & search" },
      { label: "Telecom", detail: "Telecom & fiber build-out" },
    ],
    catalysts: [
      {
        year: 1995, period: "1993–95",
        title: "Web + graphical browser",
        description: ["Mosaic (1993), Netscape Navigator (1994)", "Netscape IPO (1995)"],
        unlocks: ["The internet becomes usable by everyone"],
      },
    ],
    shadow: [
      "Dot-com bust (2000–02)",
      "Nasdaq falls ~78% peak to trough",
      "Telecom overbuild & collapse",
      "WorldCom bankruptcy (2002)",
    ],
    transition: ["The network connects the economy", "Connected markets become financially entangled"],
  },
  {
    sign: "Pisces", symbol: "♓", startYear: 2003, endYear: 2011,
    color: "#7899d4", domain: "Unity",
    disruption: "The collective path to wealth breaks",
    headline: "Collective entanglement",
    tagline: "Separate markets become one system",
    interpretation: [
      "Rates at 1%: cheap credit searches globally for return",
      "Housing, credit, equities, commodities & emerging markets rise together",
      "China becomes the engine of the emerging-market & commodity boom",
      "2003–07: collective wealth inflation",
      "2007–09: collective wealth destruction",
      "2008–11: collective reflation through central-bank intervention",
      "Broken formula: house + stocks + retirement portfolio → wealth",
      "Lesson: following the collective path does not guarantee security",
      "The diversified collective was more interconnected than it appeared",
    ],
    marketSignature: ["Home prices", "Household leverage", "Credit spreads", "Equity prices"],
    manifestations: [
      { label: "Housing & securitization", detail: "US housing boom, MBS, CDOs & global credit" },
      { label: "China & emerging markets", detail: "China, BRICs & emerging-market equities" },
      { label: "Commodities", detail: "China-driven commodity supercycle" },
    ],
    catalysts: [
      {
        year: 2003, label: "Opening catalyst",
        title: "Rates fall to 1%",
        description: ["Fed funds cut to 1% (2003)", "Cheap credit floods housing"],
        unlocks: ["Leveraged speculation spreads across households & banks"],
      },
      {
        year: 2008, label: "Closing catalyst",
        title: "QE begins",
        description: ["Fed begins large-scale asset purchases after the crisis", "Agency debt & MBS first; Treasuries added in 2009"],
        unlocks: ["The central bank becomes the market’s floor"],
      },
    ],
    shadow: [
      "Housing falls → credit breaks → equities collapse",
      "Local losses become global contagion",
      "Collective wealth destruction",
      "2008 global financial crisis",
    ],
    transition: [
      "Entanglement on the way up → contagion on the way down",
      "QE closes Uranus in Pisces & opens Pluto in Capricorn",
      "The collective path to wealth fails → build your own path",
    ],
  },
  {
    sign: "Aries", symbol: "♈", startYear: 2011, endYear: 2019,
    color: "#e07a50", domain: "Initiation",
    disruption: "The traditional path into economic life breaks down",
    headline: "Digital entrepreneurship",
    tagline: "Build your own path",
    interpretation: [
      "Old path: college → degree → job → house → investments",
      "New path: internet → smartphone → profile → audience / online business",
      "New entrants bypass established routes into the economy",
      "Capital rewards disruptors, user growth & network effects",
      "FAANG dominates the index",
    ],
    marketSignature: ["Mobile users", "Startup & VC funding", "Digital ad revenue", "FAANG market cap"],
    manifestations: [
      { label: "FAANG", detail: "Facebook, Apple, Amazon, Netflix, Google" },
      { label: "Social media", detail: "Instagram, Snapchat, Twitter, YouTube" },
      { label: "Platform startups", detail: "Uber, Airbnb & app-native businesses" },
      { label: "Internet business", detail: "E-commerce, SaaS & digital entrepreneurship" },
    ],
    catalysts: [
      {
        year: 2007, period: "2007–08",
        title: "Smartphone + app ecosystem",
        description: ["iPhone (2007), App Store (2008)", "Smartphones go mainstream by the early 2010s"],
        unlocks: ["A new route into the economy for individuals & new companies"],
      },
    ],
    shadow: [
      "Attention economy: engagement over wellbeing",
      "Privacy scandals (Cambridge Analytica, 2018)",
      "Unicorns burn cash for growth",
    ],
    transition: ["The individual becomes digitally native", "Aries: you don’t need the traditional path", "Taurus: the traditional path isn’t even stable anymore"],
  },
  {
    sign: "Taurus", symbol: "♉", startYear: 2019, endYear: 2026,
    color: "#96ad72", domain: "Stability",
    disruption: "Physical & economic stability breaks",
    headline: "Digital economy",
    tagline: "Capital leaves the physical world",
    interpretation: [
      "Lockdowns abruptly disrupt the physical economy",
      "Traditional work, commerce & ownership lose their stability",
      "People forced off traditional paths: remote work, creators & influencers go mainstream",
      "Capital floods toward businesses native to the digital economy",
      "2020–21: SaaS, e-commerce, cloud & crypto",
      "2021–22: digital ownership, NFTs & tokenization",
      "2023–26: AI compute, GPUs & data-center infrastructure",
    ],
    marketSignature: ["SaaS & cloud revenue", "Bitcoin", "GPU demand", "Money supply (M2)"],
    manifestations: [
      { label: "Digital businesses", detail: "SaaS, cloud, e-commerce, remote work & creator platforms" },
      { label: "Crypto", detail: "Bitcoin, crypto, NFTs & tokenized ownership" },
      { label: "AI infrastructure", detail: "GPUs, data centers & compute" },
    ],
    catalysts: [
      {
        year: 2020,
        title: "Lockdowns + massive monetary stimulus",
        description: ["COVID lockdowns (2020)", "Zero rates, QE & stimulus checks"],
        unlocks: ["Money floods digital & speculative assets"],
      },
    ],
    shadow: [
      "Crypto crash (2022)",
      "FTX collapse",
      "Inflation & the fastest hiking cycle in decades",
    ],
    transition: ["The stable physical path breaks → capital goes digital", "Gemini: human information exchange itself isn’t stable anymore"],
  },
  {
    sign: "Gemini", symbol: "♊", startYear: 2026, endYear: 2033, hypothesis: true,
    color: "#b0b072", domain: "Exchange",
    disruption: "Information & intelligence exchange disrupted",
    headline: "AI economy",
    tagline: "Intelligence becomes something to exchange",
    interpretation: [
      "Intelligence becomes an abundant, scalable input",
      "Knowledge work & information exchange repriced",
      "Agents communicate, negotiate & transact",
      "Capital rewards compute, models & AI adoption",
      "Forecast: outperformers disrupt the exchange of information, knowledge, decisions & transactions",
    ],
    marketSignature: ["AI capex", "Compute", "Model capability", "AI revenue"],
    manifestations: [
      { label: "AI models", detail: "Foundation models & AI platforms" },
      { label: "AI agents", detail: "Agents that use tools & execute tasks" },
      { label: "Agent commerce?", detail: "Candidate: agent-to-agent commerce" },
    ],
    catalysts: [
      {
        year: 2022, period: "2022–25", label: "Precursor",
        title: "Generative AI",
        description: ["ChatGPT brings generative AI into mass use", "Models make machine-generated knowledge economically useful"],
        unlocks: ["Intelligence becomes a scalable software input"],
      },
      {
        year: 2026, period: "2026–", label: "Emerging",
        title: "AI agents",
        description: ["Models move from answering toward acting", "Agents use tools, communicate & execute tasks"],
        unlocks: ["Machines become active participants in information exchange"],
      },
    ],
    shadow: [
      "AI capex overbuild risk",
      "White-collar work disrupted",
      "Concentration in a few model & chip providers",
    ],
    transition: ["Open question", "Test: does AI remake exchange, or add a layer to it?"],
  },
];
