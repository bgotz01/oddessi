// lib/industry/markets-inversion-predictions-data.ts
// Capital Activated made falsifiable: concrete 2026–2033 predictions (the
// Uranus in Gemini window), each with how it is measured and what would prove
// it wrong. Conviction is graded, not uniform: a tail prediction can be bold
// without claiming the confidence of the base case. `consensus` marks a
// prediction that could come true for reasons outside the thesis (e.g.
// valuation alone), so it counts as weak evidence for it. All start open.

export const PREDICTION_WINDOW = { start: "Jan 2026", end: "Dec 2033", label: "2026–2033" };

// Why the agent becomes necessary: the environment outgrows Capital Parked.
export const PREDICTION_CHAIN = [
  "Flat beta",
  "High dispersion",
  "Rotation required",
  "Allocation complexity rises",
  "Intelligent routing becomes valuable",
  "Capital Activated",
];

export type PredictionSource = "Synthesis" | "Pluto" | "Uranus" | "Neptune";

export type Prediction = {
  // What the previous era rewarded; the prediction is its inversion.
  previous: string;
  title: string;
  claim: string;
  // Detail below is kept for a future drawer; the section shows the
  // previous-era pattern and the prediction only.
  // The causal steps inside the thesis, where the claim needs one.
  mechanism?: string[];
  measure: string;
  source: PredictionSource;
  // The sign the source planet is in during the window.
  sign?: string;
  conviction: "Base case" | "Tail";
  consensus?: string;
  status: "Open" | "Supported" | "Falsified";
};

export const PREDICTIONS: readonly Prediction[] = [
  {
    previous: "Broad equity beta compounds",
    title: "Broad equity beta disappoints",
    claim: "Broad U.S. equities produce flat-to-negative real returns.",
    mechanism: ["AI boom & concentration", "Extreme valuations", "Returns pulled forward", "Repricing + incumbent disruption", "Weak broad beta"],
    measure: "S&P 500 total return, inflation-adjusted, fixed 2026 start through end of 2033. The AI leaders stay in the index: no carve-out.",
    source: "Synthesis",
    conviction: "Base case",
    consensus: "Also predicted on starting valuations alone",
    status: "Open",
  },
  {
    previous: "Stocks rise together",
    title: "Dispersion rises",
    claim: "Huge winners and losers coexist beneath unimpressive index returns.",
    measure: "Cross-sectional return dispersion of index constituents against its 2010–2025 average.",
    source: "Synthesis",
    conviction: "Base case",
    status: "Open",
  },
  {
    previous: "Buy and hold wins",
    title: "Rotation becomes a requirement",
    claim: "Static broad-market allocations deliver weak returns, while attractive returns stay available but concentrate in particular sectors, assets, geographies or periods.",
    measure: "A rotation rule fixed in advance (e.g. sector momentum, trend) against buy-and-hold S&P 500, risk-adjusted. Ex ante, not hindsight.",
    source: "Synthesis",
    conviction: "Base case",
    status: "Open",
  },
  {
    previous: "Digital assets beat stable physical ones",
    title: "Intelligence-native assets beat knowledge-work incumbents",
    claim: "Uranus in Taurus, one sign on. Then, digital assets outperformed stable physical ones; now assets that disrupt the exchange of information, knowledge, decisions & transactions outperform businesses built on expensive human intelligence. Intelligence becomes cheaper faster than incumbent cost structures can adapt.",
    measure: "Relative return of two baskets fixed at the start date. Underperformers: consulting & IT services, outsourcing / BPO, ad agencies, staffing, information services, legacy SaaS. Outperformers: assets native to machine intelligence & agent exchange. Relative, so it can hold even if the index is flat.",
    source: "Uranus",
    sign: "Gemini",
    conviction: "Base case",
    status: "Open",
  },
  {
    previous: "Physical incumbents are rescued by stimulus",
    title: "Large knowledge-work incumbents go bankrupt",
    claim: "Some large knowledge-work companies go bankrupt, not just draw down.",
    measure: "Bankruptcy or distressed restructuring among the basket above.",
    source: "Uranus",
    sign: "Gemini",
    conviction: "Tail",
    status: "Open",
  },
  {
    previous: "Passive allocation reaches scale",
    title: "Agentic active allocation reaches scale",
    claim: "Software makes active allocation cheap enough to compete with passive. Passive: cheap and dumb. Traditional active: expensive and intelligent. Agentic active: cheap and intelligent.",
    measure: "A meaningful share of flows or assets allocated by agents or network-coordinated capital.",
    source: "Pluto",
    sign: "Aquarius",
    conviction: "Base case",
    status: "Open",
  },
  {
    previous: "Capital joins established platforms",
    title: "Capital backs pioneers",
    claim: "Capital increasingly backs new entrants rather than participating in established systems.",
    measure: "Capital to new ventures and new entrants against passive inflows into incumbents.",
    source: "Neptune",
    sign: "Aries",
    conviction: "Base case",
    status: "Open",
  },
];

export const PREDICTIONS_CLOSING = "The last era rewarded being invested. The next will reward being correctly allocated.";
