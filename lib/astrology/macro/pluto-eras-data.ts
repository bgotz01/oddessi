// lib/astrology/macro/pluto-eras-data.ts

export type PlutoEraElement = "earth" | "air" | "water" | "fire";
export type PlutoEraStatus = "completed" | "active" | "upcoming";

export type PlutoEraData = {
  sign: string;
  symbol: string;
  house: number;
  timeframe: string;
  startYear: number;
  endYear: number;
  element: PlutoEraElement;
  status: PlutoEraStatus;
  isCurrent: boolean;
  powerSystem: string;
  transformation: string;
  whatDies: string;
  whatConsolidates: string;
  consequences: string[];
  distortionRisk: string[];
  historicalParallel: {
    previousOccurrence: string;
    historicalThemes: string[];
  };
  question: string;
};

export const PLUTO_ERAS: PlutoEraData[] = [
  {
    sign: "Leo",
    symbol: "♌",
    house: 5,
    timeframe: "1939–1957",
    startYear: 1939,
    endYear: 1957,
    element: "fire",
    status: "completed",
    isCurrent: false,
    powerSystem: "Global power",
    transformation: "Superpower",
    whatDies: "European imperial primacy",
    whatConsolidates: "Nuclear superstates with global reach",
    consequences: [
      "Mass armies and industrial war concentrate unprecedented capacity inside states",
      "Nuclear weapons compress ultimate destructive power into a few governments",
      "World War II destroys the old European balance and elevates the United States and Soviet Union into superpowers",
    ],
    distortionRisk: [
      "Personal rule and national grandeur justify totalitarian command",
      "Concentrated military power makes civilizational annihilation possible",
    ],
    historicalParallel: {
      previousOccurrence: "c. 1694–1710",
      historicalThemes: [
        "Absolutist states concentrated military, fiscal, and symbolic authority",
        "The War of the Spanish Succession reorganized European great-power rivalry",
        "Imperial courts projected centralized power across growing global systems",
      ],
    },
    question: "Who is king of the world?",
  },
  {
    sign: "Virgo",
    symbol: "♍",
    house: 6,
    timeframe: "1957–1972",
    startYear: 1957,
    endYear: 1972,
    element: "earth",
    status: "completed",
    isCurrent: false,
    powerSystem: "Production",
    transformation: "Productivity",
    whatDies: "Labor-intensive production as the industrial norm",
    whatConsolidates: "Managerial, engineering, and technical systems",
    consequences: [
      "Mass manufacturing, petrochemicals, electronics, and aerospace expand productive capacity",
      "Containerization and standardized logistics reorganize the global movement of goods",
      "Computers, automation, and scientific management make efficiency a source of power",
    ],
    distortionRisk: [
      "Human judgment is subordinated to efficiency and managerial control",
      "Workers absorb the social cost of productivity gains they do not govern",
    ],
    historicalParallel: {
      previousOccurrence: "c. 1710–1723",
      historicalThemes: [
        "Administrative states expanded measurement, taxation, and technical expertise",
        "Proto-industrial production became more organized and specialized",
        "Scientific management of land, labor, and trade strengthened state capacity",
      ],
    },
    question: "Who can build the world?",
  },
  {
    sign: "Libra",
    symbol: "♎",
    house: 7,
    timeframe: "Oct 1971 – Nov 1983",
    startYear: 1971,
    endYear: 1984,
    element: "air",
    status: "completed",
    isCurrent: false,
    powerSystem: "Social order",
    transformation: "Liberalization",
    whatDies: "Inherited social roles",
    whatConsolidates: "Rights-based individual freedom",
    consequences: [
      "Marriage, gender, sexuality, and family roles become openly renegotiable",
      "Civil rights move power from inherited norms toward individual legal claims",
      "Courts, culture, and personal choice become battlegrounds for social authority",
    ],
    distortionRisk: [
      "Formal equality conceals persistent differences in material power",
      "Freedom becomes individualized while collective capacity weakens",
    ],
    historicalParallel: {
      previousOccurrence: "c. 1723–1735",
      historicalThemes: [
        "Balance-of-power diplomacy constrained dynastic domination",
        "Commercial treaties redistributed influence through negotiated relationships",
        "Enlightenment debate challenged inherited social and legal authority",
      ],
    },
    question: "Who gets to define the rules?",
  },
  {
    sign: "Scorpio",
    symbol: "♏",
    house: 8,
    timeframe: "Nov 1983 – Nov 1995",
    startYear: 1983,
    endYear: 1995,
    element: "water",
    status: "completed",
    isCurrent: false,
    powerSystem: "Capital",
    transformation: "Financialization",
    whatDies: "Industrial capital as the primary source of control",
    whatConsolidates: "Leverage, markets, debt, and ownership",
    consequences: [
      "Financial engineering turns ownership and debt into instruments of control",
      "Leveraged buyouts and consolidation transfer power toward capital markets",
      "Electronic trading and global capital mobility accelerate financial command",
    ],
    distortionRisk: [
      "Hidden leverage concentrates gains while distributing systemic risk",
      "Ownership power becomes opaque, extractive, and difficult to govern",
    ],
    historicalParallel: {
      previousOccurrence: "1735–1748",
      historicalThemes: [
        "War finance deepened the power of creditors and sovereign debt markets",
        "Colonial trade concentrated private fortunes and political influence",
        "Financial claims increasingly controlled distant labor, land, and resources",
      ],
    },
    question: "Who really owns the world?",
  },
  {
    sign: "Sagittarius",
    symbol: "♐",
    house: 9,
    timeframe: "Jan 1995 – Jan 2008",
    startYear: 1995,
    endYear: 2008,
    element: "fire",
    status: "completed",
    isCurrent: false,
    powerSystem: "Global order",
    transformation: "Globalization",
    whatDies: "Nationally bounded capital",
    whatConsolidates: "Borderless capital and a US-led global system",
    consequences: [
      "Trade, capital, and production expand across national borders",
      "Multinational corporations gain leverage over labor, regulation, and states",
      "US-led institutions turn market access into geopolitical power",
    ],
    distortionRisk: [
      "Expansion is treated as neutral while its gains and costs remain unequal",
      "A universal global order becomes a vehicle for ideological and military overreach",
    ],
    historicalParallel: {
      previousOccurrence: "1748–1762",
      historicalThemes: [
        "Imperial competition expanded across global trade routes",
        "Enlightenment ideas crossed borders with commerce and conquest",
        "Overextension turned global reach into fiscal and political strain",
      ],
    },
    question: "Who gets to shape the world?",
  },
  {
    sign: "Capricorn",
    symbol: "♑",
    house: 10,
    timeframe: "Jan 2008 – Nov 2024",
    startYear: 2008,
    endYear: 2024,
    element: "earth",
    status: "completed",
    isCurrent: false,
    powerSystem: "Institutions",
    transformation: "Government intervention",
    whatDies: "Faith in self-regulating markets",
    whatConsolidates: "States and central banks as permanent backstops",
    consequences: [
      "Financial crisis makes governments and central banks decisive economic actors",
      "Quantitative easing and emergency policy expand institutional control over markets",
      "Repeated crises concentrate assets, authority, and survival capacity at the top",
    ],
    distortionRisk: [
      "Emergency powers become permanent institutional machinery",
      "Public guarantees socialize losses while concentrated owners retain gains",
    ],
    historicalParallel: {
      previousOccurrence: "1762–1778",
      historicalThemes: [
        "States tightened taxation and administration to manage imperial debt",
        "Institutional authority hardened as fiscal legitimacy deteriorated",
        "Government finance became inseparable from the survival of the existing order",
      ],
    },
    question: "Who keeps the system alive?",
  },
  {
    sign: "Aquarius",
    symbol: "♒",
    house: 11,
    timeframe: "Nov 19, 2024 – Jan 19, 2044",
    startYear: 2024,
    endYear: 2044,
    element: "air",
    status: "active",
    isCurrent: true,
    powerSystem: "Intelligence",
    transformation: "Artificial Intelligence",
    whatDies: "Human monopoly on intelligence",
    whatConsolidates: "Machine intelligence as infrastructure",
    consequences: [
      "AI turns intelligence from an exclusively human capability into technological infrastructure",
      "Cognitive work shifts from direct human production toward directing, verifying, and coordinating machines",
      "Control of models, compute, data, and autonomous systems becomes a new source of structural power",
    ],
    distortionRisk: [
      "Cognitive power concentrates among actors that control frontier models and compute",
      "Human judgment becomes increasingly subordinate to automated systems people cannot inspect or govern",
    ],
    historicalParallel: {
      previousOccurrence: "1777–1798",
      historicalThemes: [
        "Enlightenment thought challenged inherited authority through reason and systematic knowledge",
        "Revolutionary ideas turned political thought into a force for reorganizing collective institutions",
        "Print culture accelerated the distribution of knowledge beyond traditional authorities",
      ],
    },
    question: "Who controls intelligence?",
  },
];
