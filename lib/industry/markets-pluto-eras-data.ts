//lib/industry/markets-pluto-eras-data.ts
// Bullet fragments only, no prose, no sources.
export type MarketsPlutoEra = {
  sign: string;
  symbol: string;
  startYear: number;
  endYear: number;
  color: string;
  domain: string;
  // Organizing principle, under the domain in the timeline column.
  theme: string;
  // How capital is organized; the column and drawer headline.
  headline: string;
  // The era's representative figure, e.g. "The Central Bank".
  archetype: string;
  tagline: string;
  interpretation: string[];
  // What investors were visibly rewarding: the era's empirical fingerprint.
  marketSignature: string[];
  // Layer is shown in the drawer only, e.g. Protocol / Human / Machine.
  manifestations: { title: string; layer?: string }[];
  catalysts: {
    year: number;
    period?: string;
    // Overrides the automatic "Precursor" tag, e.g. "Emerging".
    label?: string;
    title: string;
    description: string[];
    unlocks: string[];
  }[];
  shadow: string[];
  transition: string[];
  // Forward-looking: the drawer marks it as a proposal, not a finding.
  hypothesis?: boolean;
};

// Pluto = transformation; applied to capital markets, how capital is organized
// into power. Each era is an organizational form of capital with its own causal
// identity, which is why the controller changes:
//   Money-Center Bank → Investment Banker → Consumer → Central Bank → Network
// Bullet fragments only, no prose; no sources, since this is common investor
// knowledge. Aquarius is a proposed form, not a finding: its manifestations are
// listed as candidates.
// Keep chronological: the timeline derives its bounds and widths from this data.
export const MARKETS_PLUTO_ERAS: readonly MarketsPlutoEra[] = [
  {
    sign: "Libra", symbol: "♎", startYear: 1971, endYear: 1983,
    color: "#c78fa0", domain: "Relationships",
    theme: "Capital shifts from hard anchors to financial relationships",
    headline: "Fiat capital",
    archetype: "The Money-Center Bank",
    tagline: "Value becomes a relationship, not a redemption claim",
    interpretation: [
      "Gold anchor disappears",
      "Money becomes fiat",
      "Currencies float",
      "Credit & financial claims become the organizing medium",
      "Money-center banks recycle petrodollars into sovereign loans",
    ],
    marketSignature: ["Gold", "Inflation", "FX volatility", "Eurodollar lending"],
    manifestations: [
      { title: "Fiat dollar & floating currencies" },
      { title: "Eurodollar & petrodollar lending" },
      { title: "Sovereign loans to emerging markets" },
    ],
    catalysts: [
      {
        year: 1971,
        title: "Gold convertibility ends",
        description: ["US closes the gold window", "Dollar no longer redeemable for gold", "Bretton Woods begins to collapse"],
        unlocks: ["Fiat monetary system", "Floating currency relationships", "Capital increasingly organized through credit & financial claims"],
      },
      {
        year: 1973,
        title: "Currencies float",
        description: ["Major currencies abandon fixed dollar pegs", "Exchange rates become market prices"],
        unlocks: ["FX becomes a permanent capital market", "Currency risk becomes something to trade, hedge & manage"],
      },
    ],
    shadow: [
      "Stagflation: oil shocks (1973, 1979)",
      "Double-digit inflation erodes creditors",
      "Volcker shock: rates to record highs",
      "Latin American debt crisis (1982)",
    ],
    transition: [
      "Libra creates the modern financial relationships",
      "Scorpio concentrates power in the specialists who work them",
      "Volcker disinflation → falling rates → leverage",
    ],
  },
  {
    sign: "Scorpio", symbol: "♏", startYear: 1983, endYear: 1995,
    color: "#9a60a8", domain: "Power",
    theme: "Power concentrates among specialists",
    headline: "Financial intermediaries",
    archetype: "The Investment Banker",
    tagline: "Structure the financing, control the company",
    interpretation: [
      "Capital power concentrates among financial specialists",
      "Falling interest rates from the early-1980s peak",
      "Debt expansion: corporate, household, government",
      "US: deal-making power: leverage turns financing skill into corporate control",
      "Japan: bank / institutional power: giant banks, cross-shareholdings, enormous asset valuations",
    ],
    marketSignature: ["Falling rates", "Debt growth", "LBO volume", "Nikkei & Japanese land prices"],
    manifestations: [
      { title: "US: investment banks, junk bonds, LBOs & M&A" },
      { title: "Japan: banks, securities houses & cross-shareholdings" },
    ],
    catalysts: [
      {
        year: 1983, period: "1980s",
        title: "Junk-bond finance",
        description: ["Drexel / Milken high-yield market", "Bidders without balance sheets can buy companies"],
        unlocks: ["Control of almost any company becomes financeable"],
      },
      {
        year: 1985,
        title: "Plaza Accord",
        description: ["Yen appreciation → subsequent Bank of Japan easing", "Cheap credit floods Japanese stocks & land"],
        unlocks: ["Japanese banks & institutions become the world’s largest"],
      },
    ],
    shadow: [
      "Debt serving the deal, not the business",
      "Insider-trading scandals",
      "Drexel bankruptcy (1990)",
      "Savings & loan crisis",
      "Japan’s bubble bursts (1990) → bad loans, lost decade",
    ],
    transition: ["Specialists → consumer capital", "Capital moves beyond Wall Street to the consumer"],
  },
  {
    sign: "Sagittarius", symbol: "♐", startYear: 1995, endYear: 2008,
    color: "#cda36e", domain: "Expansion",
    theme: "Capital expands to the household",
    headline: "Consumer capital",
    archetype: "The Consumer-Investor",
    tagline: "Different asset, same organization: the consumer",
    interpretation: [
      "Households become the market’s driving force",
      "Capital participation expands at both ends: households and alternative funds",
      "Hedge-fund AUM surges during the 2000s",
      "Households owning stocks directly: 15% (1995) → 21% (2001)",
      "1995–2000: household capital → stocks / tech",
      "2001–2008: household capital → housing / mortgages",
      "Not one bubble: one regime, two objects of speculation",
    ],
    marketSignature: ["Retail trading volume", "Tech IPOs", "Mortgage credit", "Home prices"],
    manifestations: [
      { title: "Retail investing & online brokerage" },
      { title: "Hedge funds & alternative capital" },
      { title: "Leveraged housing" },
    ],
    catalysts: [
      {
        year: 1995, period: "Mid-1990s",
        title: "The internet at home",
        description: ["Trade from home instead of phoning a broker", "Online brokerage, real-time quotes, message boards"],
        unlocks: ["Direct, cheap market access for every household"],
      },
      {
        year: 2001, period: "2000s",
        title: "Mortgage credit expansion",
        description: ["Low rates after the dot-com bust", "Subprime lending & securitization"],
        unlocks: ["Leveraged housing for ordinary households"],
      },
    ],
    shadow: [
      "Broad access ≠ broad understanding",
      "Households buy late, absorb both busts",
      "Dot-com crash (2000–02)",
      "Housing crash → 2008 crisis",
    ],
    transition: ["Consumer-led system collapses", "Institutions fail or need rescue", "Central bank steps in at enormous scale"],
  },
  {
    sign: "Capricorn", symbol: "♑", startYear: 2008, endYear: 2024,
    color: "#8ebf7a", domain: "Structure",
    theme: "Capital reorganizes around central-bank policy",
    headline: "Central-bank liquidity",
    archetype: "The Central Bank",
    tagline: "One institution sets the price of money",
    interpretation: [
      "Setting the price and availability of money as the structural power",
      "QE as the signature mechanism",
      "Zero rates, forward guidance, emergency facilities underneath it",
      "Fed balance sheet as the key market variable",
      "Institutional aggregation downstream: ETFs, passive funds, asset managers",
    ],
    marketSignature: ["Fed balance sheet", "Near-zero rates", "Liquidity", "ETF / passive flows"],
    manifestations: [
      { title: "Quantitative easing" },
      { title: "Zero rates & forward guidance" },
      { title: "ETFs, passive funds & asset managers" },
    ],
    catalysts: [
      {
        year: 2008,
        title: "QE begins",
        description: ["Lehman collapse", "Rates to zero, emergency lending", "QE1: ~$1.75T of MBS, agency debt & Treasuries"],
        unlocks: ["Central-bank liquidity as a standing support for asset prices"],
      },
      {
        year: 2020,
        title: "Pandemic QE",
        description: ["Rates back to zero, emergency facilities again", "Fed balance sheet more than doubles"],
        unlocks: ["The Fed as backstop of last resort"],
      },
    ],
    shadow: [
      "Markets price the Fed, not the assets",
      "Asset owners benefit most",
      "2021–22 inflation",
      "Fastest hiking cycle in decades",
    ],
    transition: [
      "Centralized → networked coordination",
      "Institution defines the rules → protocol / community defines the rules",
      "Capital aggregated institutionally → coordinated collectively",
    ],
  },
  {
    sign: "Aquarius", symbol: "♒", startYear: 2024, endYear: 2044, hypothesis: true,
    color: "#a8b4c0", domain: "Networks",
    theme: "Capital organizes through networks",
    headline: "Networked coordination",
    archetype: "The Network",
    tagline: "Coordinate as a network, not an institution",
    interpretation: [
      "Capital power organized through networks rather than central institutions",
      "Participants coordinate through protocols, communities & shared signals",
      "Blockchain provides an early architecture for network-organized capital",
      "Retail communities demonstrate socially coordinated capital (GameStop, 2021)",
      "AI agents emerge as potential new participants",
    ],
    marketSignature: ["On-chain capital", "Network-coordinated flows", "Community-owned assets", "Agent-driven transactions"],
    manifestations: [
      { layer: "Protocol", title: "Blockchain networks" },
      { layer: "Human", title: "Retail tribes & social investing" },
      { layer: "Machine", title: "Candidate: AI-agent networks" },
    ],
    catalysts: [
      {
        year: 2017, period: "2017–21", label: "Precursor",
        title: "Blockchain",
        description: [
          "Bitcoin / crypto becomes a mass capital-market phenomenon",
          "Capital organizes around protocols rather than a central institution",
          "2020–21 expands into DeFi, tokens, DAOs & crypto communities",
        ],
        unlocks: ["Network-organized capital becomes economically relevant"],
      },
      {
        year: 2024, period: "2024–", label: "Emerging",
        title: "AI agents",
        description: [
          "Models move from answering toward acting",
          "Agents can research, transact & execute financial tasks",
          "Potential for machine-to-machine financial coordination",
          "Candidate: agent-to-agent transactions & markets",
        ],
        unlocks: ["Software becomes a potential participant in capital networks"],
      },
    ],
    shadow: [
      "Coordination can become herding",
      "Networks can concentrate around dominant nodes",
      "Platforms, custodians & model providers can recapture control",
      "Machine-speed coordination may amplify correlated behavior",
    ],
    transition: [
      "Open question",
      "The defining catalyst may not have happened yet",
      "Test: does capital organize through networks at meaningful scale?",
      "Test: do networks distribute power or create new centers of control?",
    ],
  },
];
