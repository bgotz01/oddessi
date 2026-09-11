// lib/astrology/macro/jupiter-saturn-cycles-data.ts

// Canonical phase vocabulary
export type CyclePhase = 'Conjunction' | 'Early' | 'Mid' | 'Late';

export type JupiterSaturnCycleData = {
    year: number;
    sign: string;
    symbol: string;
    element: 'Fire' | 'Earth' | 'Air' | 'Water';
    isCurrent?: boolean;
    economicTheme: string;
    coreArchetype: string[];
    expansionFocus: string[];
    structuralShift: string[];
    marketCharacter: string[];
    distortionRisk: string[];
    historicalContext: string[];
};

export const JUPITER_SATURN_CYCLES: JupiterSaturnCycleData[] = [
    {
        year: 2020,
        sign: 'Aquarius',
        symbol: '♒',
        element: 'Air',
        isCurrent: true,
        economicTheme: 'Digital Infrastructure & Network Power',

        coreArchetype: [
            'Economic coordination increasingly occurs through networks rather than traditional institutions',
            'Control of digital infrastructure becomes a primary source of power',
            'Information, data, and algorithms reshape how value is created and distributed',
            'Societies reorganize around technological systems that operate at global scale',
        ],

        expansionFocus: [
            'Artificial intelligence and large-scale model infrastructure',
            'Cloud computing, automation, and digital logistics systems',
            'Digital payment rails, cryptocurrency experimentation, and programmable finance',
            'Online labor, commerce, and creator networks coordinating economic activity',
        ],

        structuralShift: [
            'Economic power shifts toward operators of digital infrastructure and distribution platforms',
            'Authority increasingly derives from technological capability rather than institutional legacy',
            'Global coordination happens through software networks rather than geographic hierarchies',
            'Standards and protocols become strategic battlegrounds for economic influence',
        ],

        marketCharacter: [
            'Extreme concentration of capital in dominant technology platforms',
            'Narratives around technological transformation drive major capital allocation cycles',
            'Rapid sector rotations as new technologies redefine economic leadership',
            'Network effects create winner-take-most dynamics across many industries',
        ],

        distortionRisk: [
            'Speculative excess surrounding emerging technological narratives',
            'New forms of centralization emerging beneath rhetoric of decentralization',
            'Digital infrastructure concentrating informational and economic power',
            'Asset valuations increasingly tied to technological potential rather than current production',
        ],

        historicalContext: [
            'The 2020 conjunction begins a new Air-sign era after two centuries dominated by Earth-sign cycles',
            'Global digital infrastructure rapidly expands during the pandemic period',
            'Artificial intelligence, cloud platforms, and digital networks become foundational economic systems',
            'Economic and social coordination increasingly occurs through technology platforms',
        ],
    },

    {
        year: 2000,
        sign: 'Taurus',
        symbol: '♉',
        element: 'Earth',
        isCurrent: false,
        economicTheme: 'Asset Expansion & Material Wealth Accumulation',

        coreArchetype: [
            'Expansion of wealth through ownership of tangible assets',
            'Material security and asset appreciation dominate economic thinking',
            'Capital accumulates through property, commodities, and physical resources',
            'Stability and growth are associated with ownership rather than innovation',
        ],

        expansionFocus: [
            'Global housing expansion and real estate speculation',
            'Commodity demand driven by emerging market industrialization',
            'Infrastructure and construction booms',
            'Consumer wealth built through asset ownership',
        ],

        structuralShift: [
            'Global supply chains expand through manufacturing globalization',
            'Asset prices become central to economic confidence',
            'Monetary policy increasingly stabilizes financial markets',
            'Debt becomes a common tool for asset accumulation',
        ],

        marketCharacter: [
            'Strong belief in long-term asset appreciation',
            'Credit expansion supporting real estate and investment growth',
            'Institutional capital flowing into physical and commodity assets',
            'Markets favor stability and tangible collateral',
        ],

        distortionRisk: [
            'Asset bubbles forming in real estate and credit markets',
            'Household balance sheets overexposed to property values',
            'Wealth inequality rising through asset ownership concentration',
            'Economic stability becoming dependent on rising asset prices',
        ],

        historicalContext: [
            'Dot-com bubble peak followed by technology crash',
            'China’s WTO entry accelerates global manufacturing expansion',
            'Global housing boom develops across major economies',
            'Financial leverage expands across households and institutions',
        ],
    },

    {
        year: 1980,
        sign: 'Libra',
        symbol: '♎',
        element: 'Air',
        isCurrent: false,
        economicTheme: 'Financial Markets & Contract-Based Economies',

        coreArchetype: [
            'Economic relationships increasingly structured through markets and contracts',
            'Expansion of financial systems mediating global capital flows',
            'Markets become central mechanisms of economic coordination',
            'Partnerships, agreements, and institutional alliances reshape economies',
        ],

        expansionFocus: [
            'Financial sector growth and capital market expansion',
            'Mergers, acquisitions, and corporate restructuring',
            'Global trade agreements and international economic integration',
            'Expansion of professional service and knowledge industries',
        ],

        structuralShift: [
            'Deregulation reshapes financial and capital markets',
            'Market mechanisms replace many forms of state economic control',
            'Global capital flows accelerate through financial institutions',
            'Economic influence increasingly mediated through financial markets',
        ],

        marketCharacter: [
            'Equities and financial assets become primary wealth vehicles',
            'Corporate restructuring and leveraged transactions expand',
            'Volatility increases as markets absorb deregulation',
            'Financial markets gain central influence over economic activity',
        ],

        distortionRisk: [
            'Excess leverage within financial systems',
            'Speculative capital dominating productive investment',
            'Growing inequality through financial asset ownership',
            'Short-term financial incentives overriding long-term stability',
        ],

        historicalContext: [
            'Volcker interest rate shock breaks the inflationary cycle',
            'Reagan and Thatcher introduce major market liberalization policies',
            'Financialization accelerates across Western economies',
            'Personal computer revolution begins reshaping productivity',
        ],
    },

    {
        year: 1961,
        sign: 'Capricorn',
        symbol: '♑',
        element: 'Earth',
        isCurrent: false,
        economicTheme: 'Institutional Expansion & Industrial Organization',

        coreArchetype: [
            'Expansion of large institutions organizing economic activity',
            'Government and corporate hierarchies coordinate industrial growth',
            'Long-term planning and institutional authority dominate decision making',
            'Large-scale infrastructure and industrial systems shape prosperity',
        ],

        expansionFocus: [
            'Mass infrastructure construction and national development',
            'Expansion of multinational corporations',
            'Industrial manufacturing and global trade',
            'Strategic technological development through government programs',
        ],

        structuralShift: [
            'Bretton Woods monetary system stabilizes global finance',
            'Institutional investing and pension systems expand',
            'Governments play central roles in economic planning',
            'Industrial economies scale through corporate and state institutions',
        ],

        marketCharacter: [
            'Stable growth in large industrial corporations',
            'Long investment horizons supported by institutional capital',
            'Predictable economic expansion across developed economies',
            'Large organizations dominate production and employment',
        ],

        distortionRisk: [
            'Overconfidence in centralized planning and institutional control',
            'Bureaucratic inefficiencies accumulating within large systems',
            'Environmental costs ignored in pursuit of industrial expansion',
            'Structural imbalances eventually contributing to 1970s stagflation',
        ],

        historicalContext: [
            'Cold War geopolitical rivalry drives technological development',
            'Space race accelerates innovation and industrial capacity',
            'Suburbanization and mass homeownership expand',
            'Post-war economic institutions reach peak influence',
        ],
    },

    {
        year: 1940,
        sign: 'Taurus',
        symbol: '♉',
        element: 'Earth',
        isCurrent: false,
        economicTheme: 'Resource Mobilization & Wartime Production',

        coreArchetype: [
            'Economic survival organized around control of physical resources',
            'National economies mobilize material production for strategic objectives',
            'Security and stability override expansion and innovation',
            'Food, energy, and industrial capacity become central strategic assets',
        ],

        expansionFocus: [
            'Mass industrial production for wartime needs',
            'Strategic control of natural resources',
            'Agricultural output supporting wartime populations',
            'Transportation and logistics infrastructure expansion',
        ],

        structuralShift: [
            'Governments assume dominant control over industrial production',
            'War spending revives economic activity after the Great Depression',
            'National economies reorganize around strategic resource management',
            'Industrial capacity becomes central to geopolitical power',
        ],

        marketCharacter: [
            'Private markets constrained by wartime planning',
            'Government bonds become major savings instruments',
            'Production priorities set by state policy rather than market demand',
            'Economic activity concentrated in essential industries',
        ],

        distortionRisk: [
            'Massive destruction of capital and infrastructure',
            'Economic distortions from prolonged price controls',
            'Post-war economic restructuring challenges',
            'Authoritarian economic models gaining influence during crisis',
        ],

        historicalContext: [
            'World War II restructures global production systems',
            'Great Depression recovery accelerated through wartime spending',
            'Technological innovation driven by military necessity',
            'Post-war economic order begins forming through Allied coordination',
        ],
    },
];

// Helper function to get current cycle
export function getCurrentJupiterSaturnCycle(): JupiterSaturnCycleData | undefined {
    return JUPITER_SATURN_CYCLES.find(c => c.isCurrent);
}

// Helper function to get next conjunction year
export function getJupiterSaturnNextConjunctionYear(): number {
    const current = getCurrentJupiterSaturnCycle();
    return current ? current.year + 20 : 2040;
}

// Helper function to calculate years into current cycle (clamped to cycle length)
export function getJupiterSaturnYearsIntoCycle(): number {
    const current = getCurrentJupiterSaturnCycle();
    if (!current) return 0;

    // Jupiter-Saturn conjunction in Aquarius: December 21, 2020
    const conjunctionDate = new Date('December 21, 2020');
    const now = new Date();
    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const yearsIn = (now.getTime() - conjunctionDate.getTime()) / msPerYear;

    // Round to 4 decimal places to avoid hydration mismatches
    return Math.min(Math.max(Math.round(yearsIn * 10000) / 10000, 0), 20);
}

// Helper function to get cycle phase
export function getJupiterSaturnCyclePhase(): CyclePhase {
    const yearsIn = getJupiterSaturnYearsIntoCycle();
    if (yearsIn === 0) return 'Conjunction';
    if (yearsIn < 7) return 'Early';
    if (yearsIn < 14) return 'Mid';
    return 'Late';
}
