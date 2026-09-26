// Investment themes by decade and half-decade: what led, what lagged, and the
// event that defined each stretch. Bullet fragments only, no sources: common
// investor knowledge. Keep chronological: the timeline derives its axis from
// this data.

export type MarketsHalfDecade = {
  start: number;
  // Short label for the timeline cell.
  short: string;
  theme: string;
  leaders: string[];
  lagged: string[];
  event: string;
  // The stretch is still unfolding: shown as open, not as a finding.
  speculative?: boolean;
};

export type MarketsDecade = {
  decade: number;
  title: string;
  color: string;
  halves: [MarketsHalfDecade, MarketsHalfDecade];
};

export const MARKETS_DECADES: readonly MarketsDecade[] = [
  {
    decade: 1970, title: "Inflation & hard assets", color: "#b1a86b",
    halves: [
      {
        start: 1970, short: "Nifty Fifty", theme: "One-decision growth stocks",
        leaders: ["Nifty Fifty: IBM, Xerox, Polaroid, Avon", "Gold after the gold window closes (1971)"],
        lagged: ["Broad stocks in the 1973–74 bear market", "Bonds as inflation rises"],
        event: "1973 oil shock → 1973–74 bear market",
      },
      {
        start: 1975, short: "Gold & oil", theme: "Hard assets vs. inflation",
        leaders: ["Gold", "Oil & energy stocks", "Small caps", "Real estate"],
        lagged: ["Long bonds", "Nifty Fifty growth stocks"],
        event: "1979 oil shock; gold peaks (Jan 1980)",
      },
    ],
  },
  {
    decade: 1980, title: "Financialization", color: "#7eab91",
    halves: [
      {
        start: 1980, short: "Volcker turn", theme: "Inflation breaks; financial markets are unleashed",
        leaders: ["Bonds from record yields", "US stocks after the 1982 low", "Financials"],
        lagged: ["Gold & commodities after the inflation peak", "Energy stocks"],
        event: "Volcker defeats inflation; financial deregulation (1980–82)",
      },
      {
        start: 1985, short: "Leverage & Japan", theme: "Financial engineering & asset inflation",
        leaders: ["Japanese stocks & land", "Takeover targets & LBOs", "Junk bonds"],
        lagged: ["Gold & commodities", "US dollar after the Plaza Accord"],
        event: "Plaza Accord (1985); Nikkei peak (1989)",
      },
    ],
  },
  {
    decade: 1990, title: "Globalization & tech", color: "#71a5ba",
    halves: [
      {
        start: 1990, short: "Emerging markets", theme: "Post-Cold War globalization",
        leaders: ["Emerging markets: Mexico, Asia", "Biotech & early tech", "US stocks after the 1990 recession"],
        lagged: ["Japan after the bubble", "US real estate & S&L lenders"],
        event: "1994 bond rout & Mexican peso crisis",
      },
      {
        start: 1995, short: "Dot-com", theme: "Internet & large-cap tech",
        leaders: ["Nasdaq & internet stocks", "Telecom & fiber", "Large-cap US growth"],
        lagged: ["Value stocks", "Emerging markets after the Asian crisis", "Commodities"],
        event: "Netscape IPO (1995); Asian crisis (1997); LTCM (1998)",
      },
    ],
  },
  {
    decade: 2000, title: "Commodities & housing", color: "#8b98c3",
    halves: [
      {
        start: 2000, short: "Value & real assets", theme: "After the tech bust",
        leaders: ["Value & small caps", "REITs & homebuilders", "Bonds", "Gold from its 2001 low"],
        lagged: ["Nasdaq & tech", "Large-cap growth"],
        event: "Dot-com bust; 9/11; rates to 1%",
      },
      {
        start: 2005, short: "BRICs & commodities", theme: "China, commodities & housing credit",
        leaders: ["China & BRICs", "Oil, metals & commodities", "Housing & financials until 2007"],
        lagged: ["US large caps (relative)", "Almost everything in 2008"],
        event: "2008 global financial crisis",
      },
    ],
  },
  {
    decade: 2010, title: "QE & Big Tech", color: "#ad8dab",
    halves: [
      {
        start: 2010, short: "QE & US quality", theme: "Central-bank liquidity lifts US assets",
        leaders: ["US large caps", "Apple & mobile", "Bonds & dividend stocks"],
        lagged: ["Europe in the euro crisis", "Gold after 2011", "Emerging markets & commodities"],
        event: "Euro crisis (2011–12); taper tantrum (2013)",
      },
      {
        start: 2015, short: "FAANG & passive", theme: "Platform giants & index investing",
        leaders: ["FAANG", "US growth stocks", "Index funds & ETFs", "Bitcoin (2017)"],
        lagged: ["Energy after the 2014–16 oil crash", "Value stocks", "Emerging markets"],
        event: "Oil crash (2014–16); volatility spike (2018)",
      },
    ],
  },
  {
    decade: 2020, title: "Digital & AI", color: "#c18c96",
    halves: [
      {
        start: 2020, short: "Digital → AI", theme: "Pandemic digital boom, then AI infrastructure",
        leaders: ["SaaS, e-commerce & crypto (2020–21)", "Energy (2022)", "Nvidia & AI infrastructure (2023–24)"],
        lagged: ["Speculative tech in the 2022 bear market", "Bonds in the 2022 rate shock"],
        event: "COVID crash (2020); 2022 bear market; ChatGPT (2022)",
      },
      {
        start: 2025, short: "AI economy?", theme: "AI adoption & agents", speculative: true,
        leaders: ["AI infrastructure, power & utilities", "Gold at record highs"],
        lagged: ["Open question"],
        event: "In progress",
      },
    ],
  },
];

// The 12-year cycle from 1972: an alternative axis to the decades. Each cycle
// has its own theme, since the decade it starts in doesn't always describe it.
export const MARKETS_CYCLE_LENGTH = 12;

export type MarketsCycle = {
  start: number;
  title: string;
  detail?: string;
  // The cycle is still unfolding: shown as open, not as a finding.
  speculative?: boolean;
};

export const MARKETS_CYCLES: readonly MarketsCycle[] = [
  { start: 1972, title: "Inflation & hard assets" },
  { start: 1984, title: "Financialization" },
  { start: 1996, title: "Globalization", detail: "Tech, commodities, emerging markets" },
  { start: 2008, title: "Big Tech" },
  { start: 2020, title: "Digital & AI", speculative: true },
];

export function halfLabel(half: MarketsHalfDecade): string {
  return `${half.start}–${String(half.start + 4).slice(2)}`;
}
