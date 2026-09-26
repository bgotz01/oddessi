//lib/industry/markets-neptune-eras-data.ts
// Neptune = the narrative capital believes in: the story of the future. Each
// era's fields answer distinct questions:
//   opening         → why did people begin believing the dream?
//   dream           → what the ideal initially promises / creates
//   developments    → how was the imagined world actually built? (construction, not crises)
//   manifestations  → what forms did the dream take? (timeline labels only)
//   inflection      → the first major event exposing the dream's contradiction
//   disillusionment → how the ideal's own excess produces its opposite
//                     ("Expansion creates instability")
// Interpretation lives in the dream, significance and realization lines; event
// points are facts. Dates sit on the structural moments (opening, inflection,
// disillusionment); bullets repeat a date only to order events within a span. Bullet fragments only,
// no sources: common investor knowledge. Keep chronological: the timeline
// derives its bounds and widths from this data.

// An event that symbolizes the beginning or end of an era: historical anchors
// only, one or two. If removing a point doesn't damage the story, remove it; interpretation belongs in the era's narrative bullets.
export type MarketsNeptuneEvent = {
  period: string;
  title: string;
  points: string[];
};

export type MarketsNeptuneEra = {
  sign: string;
  symbol: string;
  startYear: number;
  endYear: number;
  color: string;
  domain: string;
  // Short phrase under the domain in the timeline column.
  theme: string;
  // The idealized world; the column and drawer headline.
  headline: string;
  // The story of the future capital believes in.
  narrative: string;
  // Opening → dream → inflection → disillusionment. The inflection is the first
  // major crack: the dream keeps running, but its contradiction is now visible.
  // Its year splits the timeline column's bar; its significance is the one
  // interpretive line, like the disillusionment's realization.
  dream: string;
  inflection?: { year: number; title: string; significance: string; points?: string[] };
  interpretation: string[];
  // How the imagined world was built: construction, not crises. Four at most.
  developments: string[];
  // What investors were visibly rewarding: the era's empirical fingerprint.
  marketSignature: string[];
  // Short labels for the timeline column; the drawer shows developments instead.
  manifestations: string[];
  opening: MarketsNeptuneEvent;
  // Absent until the evidence identifies it; never forced.
  disillusionment?: MarketsNeptuneEvent & { realization: string };
  shadow: string[];
  transition: string[];
  // Forward-looking: the drawer marks it as a proposal, not a finding.
  hypothesis?: boolean;
};

export const MARKETS_NEPTUNE_ERAS: readonly MarketsNeptuneEra[] = [
  {
    sign: "Sagittarius", symbol: "♐", startYear: 1970, endYear: 1984,
    color: "#cda36e", domain: "Expansion",
    theme: "Growth beyond boundaries",
    headline: "Fiat / monetary expansion",
    narrative: "There are no limits to expansion",
    dream: "Expansion creates possibility",
    inflection: { year: 1979, title: "Second oil shock", significance: "Unbounded expansion collides with inflation & scarcity", points: ["Oil prices more than double"] },
    interpretation: [
      "Expansion becomes the capital ideal",
      "Money, credit & capital move beyond the postwar monetary order",
      "From preserving fixed boundaries → discovering how far capital can expand",
      "Offshore dollars & international lending grow",
    ],
    developments: ["Floating exchange rates formalized", "Eurodollar market grows", "Petrodollars recycled through global banks", "Bank lending to developing countries surges"],
    marketSignature: ["Money supply", "Credit growth", "International lending", "Currency markets"],
    manifestations: [
      "Fiat money",
      "Floating currencies",
      "Eurodollar markets",
    ],
    opening: {
      period: "1971", title: "Nixon closes the gold window",
      points: ["US suspends dollar–gold convertibility", "Bretton Woods fixed exchange rates collapse by 1973"],
    },
    disillusionment: {
      period: "1979–84", title: "Expansion creates instability",
      realization: "Removing limits from money and credit does not remove economic limits",
      points: ["US inflation peaks near 13.5% (1980)", "Mexico announces it cannot service its debt (Aug 1982)"],
    },
    shadow: ["Expansion becomes excess", "Inflation & stagflation", "Oil shocks (1973, 1979)", "Gold peaks at $850 (Jan 1980)"],
    transition: ["Expansion → Structure", "After capital escapes its boundaries, the ideal becomes mastering the enlarged system"],
  },
  {
    sign: "Capricorn", symbol: "♑", startYear: 1984, endYear: 1998,
    color: "#8ebf7a", domain: "Structure",
    theme: "Financial structure",
    headline: "The financialized world",
    narrative: "Financial structure can create prosperity",
    dream: "Financial structure creates prosperity",
    inflection: { year: 1990, title: "Japan’s bubble bursts", significance: "The first major fracture in the financialization dream", points: ["Nikkei begins its collapse", "Land prices follow", "Banks inherit enormous bad loans"] },
    interpretation: [
      "Financial expertise & sophisticated structures become idealized",
      "Redesign the structure → improve the outcome",
      "Leverage, derivatives & private equity carry the same promise",
      "Wall Street professionalizes: the dealmaker, the quant, the fund",
    ],
    developments: ["Bank deregulation", "Japan’s stock & property boom", "Leveraged finance expands", "Hedge funds & quantitative finance expand"],
    marketSignature: ["Leverage", "M&A", "Private equity", "Derivatives"],
    manifestations: [
      "Leveraged finance",
      "Derivatives",
      "Private equity",
    ],
    opening: {
      period: "1982–84", title: "Volcker disinflation",
      points: ["Inflation collapses from its 1980 peak", "The secular decline in interest rates begins"],
    },
    disillusionment: {
      period: "1990–98", title: "Financial structure creates fragility",
      realization: "Risk can be structured, but not eliminated",
      points: ["Asian financial crisis (1997)", "LTCM nearly collapses after the Russian default (1998)"],
    },
    shadow: ["Elaborate structure mistaken for created value", "Leverage magnifies losses", "Redistributed risk is harder to see, not gone", "Savings & loan crisis", "Drexel Burnham bankruptcy (1990)", "Nikkei peaks (Dec 1989), then collapses"],
    transition: ["Structure → Networks", "After structuring capital, the dream becomes connecting the world"],
  },
  {
    sign: "Aquarius", symbol: "♒", startYear: 1998, endYear: 2012,
    color: "#a8b4c0", domain: "Networks",
    theme: "Connectivity",
    headline: "The globalized world",
    narrative: "Everything can be connected into one global system",
    dream: "Connection creates a global system",
    inflection: { year: 2008, title: "Global financial crisis", significance: "The connected system transmits the crisis worldwide", points: ["Lehman collapses"] },
    interpretation: [
      "Borders fade: markets, countries, information & capital become one connected system",
      "Dream: we can connect everything",
      "Reality discovered: connection does not erase structural differences",
    ],
    developments: ["China joins the WTO", "Euro cash enters circulation", "BRIC / emerging-market capital boom", "Global trade & commodity demand surge"],
    marketSignature: ["Internet users", "Global trade", "China & EM growth", "Cross-border capital flows"],
    manifestations: [
      "Internet & telecom",
      "The euro",
      "China & supply chains",
      "BRICs & emerging markets",
      "Commodities",
      "Global finance",
    ],
    opening: {
      period: "1998–2000", title: "Euro + dot-com boom",
      points: ["Euro launches", "Dot-com boom"],
    },
    disillusionment: {
      period: "2008–12", title: "Connection transmits the crisis",
      realization: "A connected world shares its problems too",
      points: ["Euro crisis (2010–12)"],
    },
    shadow: ["A connected world also transmits shocks", "Dot-com bust: Nasdaq peaks (Mar 2000)", "2008 crisis travels through global links: Lehman collapse (Sep 2008)", "Gains concentrate; manufacturing regions hollow out"],
    transition: ["Connection → Dissolution", "Aquarius connects separate entities into one network", "Pisces dissolves the distinction between them"],
  },
  {
    sign: "Pisces", symbol: "♓", startYear: 2012, endYear: 2026,
    color: "#7899d4", domain: "Unity",
    theme: "Collective participation",
    headline: "The platform economy",
    narrative: "Everyone can participate",
    dream: "The collective creates the platform",
    inflection: { year: 2020, title: "COVID", significance: "Dependence on platforms surges as their governing power becomes explicit", points: ["Lockdowns move work, school, commerce & social life online"] },
    interpretation: [
      "Build the platform; let everyone else create the value; scale the network",
      "The collective supplies the assets; the platform coordinates them",
      "Consumers become producers: driver, host, creator, seller",
      "Ownership shifts from operating assets → controlling participation",
      "Asset-light platforms scale without owning the underlying resources",
    ],
    developments: ["FAANG becomes the market’s leadership", "Uber & Airbnb scale globally without owning cars or homes", "Creator memberships: Patreon, Substack", "TikTok & short-form video go global"],
    marketSignature: ["Users", "Gross bookings / GMV", "Take rates", "Big Tech market cap"],
    manifestations: [
      "Big Tech platforms",
      "Sharing economy",
      "Creator economy",
      "Gig economy",
    ],
    opening: {
      period: "2012", title: "Social media monetization",
      points: ["Facebook IPO", "Facebook launches mobile News Feed ads"],
    },
    disillusionment: {
      period: "2020–26", title: "The platform governs the collective",
      realization: "The shared world isn’t necessarily collectively controlled",
      points: ["COVID-era moderation & deplatforming (2020–21)"],
    },
    shadow: ["Participation confused with ownership", "Visibility confused with a durable livelihood", "Gig workers without employee protections"],
    transition: ["Participation → Frontier", "Use the network & the crowd to build what could not exist before"],
  },
  {
    sign: "Aries", symbol: "♈", startYear: 2026, endYear: 2039, hypothesis: true,
    color: "#e07a50", domain: "Initiation",
    theme: "The pioneer / going first",
    headline: "Frontier economy",
    narrative: "The pioneers will own the future",
    dream: "The pioneer creates the future",
    interpretation: [
      "Proposed: the pioneer becomes the capital ideal",
      "Begin where markets have no settled shape",
      "Infrastructure → participation → frontier",
    ],
    developments: ["Frontier AI labs raise multibillion-dollar rounds"],
    marketSignature: ["Compute", "Model capability", "R&D", "Frontier-scale capex"],
    manifestations: [
      "Frontier AI",
      "Space",
      "Robotics",
    ],
    opening: {
      period: "2022–26", title: "ChatGPT / generative AI",
      points: ["ChatGPT launches"],
    },
    shadow: ["Being first confused with building something lasting", "Urgency over execution & demand"],
    transition: ["Open question: which new beginnings become enduring businesses?"],
  },
];
