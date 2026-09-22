// lib/astrology/macro/uranus-eras-data.ts

export type UranusEraElement = "earth" | "air" | "water" | "fire";
export type UranusEraStatus = "completed" | "active" | "upcoming";

export type UranusEraData = {
    id: string;
    sign: string;
    symbol: string;
    house: number;
    timeframe: string;
    startYear: number;
    endYear: number;
    element: UranusEraElement;
    status: UranusEraStatus;
    isCurrent: boolean;
    domain: string;
    oldOrder: string;
    shock: string;
    reorganization: string;
    question: string;
    consequences: string[];
    distortionRisk: string[];
    historicalParallel: {
        previousOccurrence: string;
        historicalThemes: string[];
    };
    extendedHistoricalPeriods?: {
        period: string;
        note: string;
    }[];
};

export const URANUS_ERAS: UranusEraData[] = [
    {
        id: 'taurus-1934',
        sign: 'Taurus',
        symbol: '♉',
        house: 2,
        timeframe: '1934–1942',
        startYear: 1934,
        endYear: 1942,
        element: 'earth',
        status: 'completed',
        isCurrent: false,
        domain: 'Stability',
        oldOrder: 'Depression / idle capacity',
        shock: 'War mobilization',
        reorganization: 'State-directed mass production',
        question: 'How much can we actually produce?',
        consequences: [
            'Idle factories and labor are redirected into armaments and strategic infrastructure',
            'Governments organize raw materials, prices, and industrial output at national scale',
            'Mass production proves that scarcity can coexist with enormous latent capacity',
        ],
        distortionRisk: [
            'Economic recovery becomes dependent on militarization and coercive extraction',
            'Central planning capacity is fused with surveillance, rationing, and total war',
        ],
        historicalParallel: {
            previousOccurrence: '1850–1858',
            historicalThemes: [
                'Gold discoveries reset monetary supply and global commodity flows',
                'Railway and industrial expansion opened new resource frontiers',
                'Land, labor, and raw materials became the base of intensified national competition',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1767–1775', note: 'Taxation, trade controls, and material scarcity turned imperial production into a revolutionary fault line.' },
            { period: '1683–1691', note: 'War finance and expanding commodity systems tied state power more tightly to material supply.' },
        ],
    },
    {
        id: 'gemini-1941',
        sign: 'Gemini',
        symbol: '♊',
        house: 3,
        timeframe: '1941–1949',
        startYear: 1941,
        endYear: 1949,
        element: 'air',
        status: 'completed',
        isCurrent: false,
        domain: 'Exchange',
        oldOrder: 'Information processing is human-speed',
        shock: 'Electronic computing',
        reorganization: 'Machines begin processing information',
        question: 'Can machines process information?',
        consequences: [
            'Electronic computers turn codebreaking and ballistic calculation into machine work',
            'Radar makes remote detection an operational layer of warfare',
            'Wartime information systems establish machine-speed command and control',
        ],
        distortionRisk: [
            'Information advantage concentrates inside secret military and state systems',
            'Faster communication expands the reach of propaganda and automated warfare',
        ],
        historicalParallel: {
            previousOccurrence: '1858–1866',
            historicalThemes: [
                'Telegraph networks compressed the time of news, markets, and command',
                'The transatlantic cable made intercontinental communication nearly immediate',
                'Rail and telegraph coordination transformed the conduct of the US Civil War',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1774–1782', note: 'Pamphlets, postal routes, and diplomatic networks accelerated revolutionary coordination across the Atlantic.' },
            { period: '1690–1698', note: 'Postal systems and newspapers created a faster, more regular infrastructure for political information.' },
        ],
    },
    {
        id: 'cancer-1948',
        sign: 'Cancer',
        symbol: '♋',
        house: 4,
        timeframe: '1948–1956',
        startYear: 1948,
        endYear: 1956,
        element: 'water',
        status: 'completed',
        isCurrent: false,
        domain: 'Security',
        oldOrder: 'Prewar domestic order',
        shock: 'Suburbanization',
        reorganization: 'Mass homeownership / suburban life',
        question: 'Where will everyone live?',
        consequences: [
            'Mass housing and suburbanization reorganize family life around the home and automobile',
            'Welfare states and veterans\u2019 benefits make domestic security a public project',
            'Decolonization and population displacement redraw national belonging',
        ],
        distortionRisk: [
            'Domestic security is built through exclusion, segregation, and rigid family roles',
            'Suburban expansion locks daily life into resource-intensive settlement patterns',
        ],
        historicalParallel: {
            previousOccurrence: '1865–1872',
            historicalThemes: [
                'Reconstruction attempted to rebuild citizenship and domestic order after civil war',
                'Railways and migration reordered settlement across national territories',
                'New housing and welfare institutions responded to rapid urban growth',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1781–1789', note: 'New republics converted revolution into constitutions, settlement policy, and a durable national home.' },
            { period: '1697–1705', note: 'Postwar demobilization redirected state capacity toward trade, settlement, and domestic consolidation.' },
        ],
    },
    {
        id: 'leo-1955',
        sign: 'Leo',
        symbol: '♌',
        house: 5,
        timeframe: '1955–1962',
        startYear: 1955,
        endYear: 1962,
        element: 'fire',
        status: 'completed',
        isCurrent: false,
        domain: 'Expression',
        oldOrder: 'Public visibility controlled by established elites',
        shock: 'Television',
        reorganization: 'Mass-mediated celebrity and authority',
        question: 'Who gets to be seen?',
        consequences: [
            'Television turns political presence and personal image into instruments of authority',
            'Advertising synchronizes consumer desire across a national mass audience',
            'Youth, celebrity, and live spectacle challenge older cultural gatekeepers',
        ],
        distortionRisk: [
            'Performance displaces competence as the basis of public authority',
            'A small broadcast system homogenizes culture while appearing universal',
        ],
        historicalParallel: {
            previousOccurrence: '1871–1878',
            historicalThemes: [
                'The mass press expanded the scale and speed of public reputation',
                'National exhibitions turned technology and empire into public spectacle',
                'Political leadership adapted to a larger and more visual mass audience',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1787–1794', note: 'Revolutionary festivals, pamphlets, and charismatic leaders remade the theater of public authority.' },
            { period: '1703–1710', note: 'A growing periodical press widened the public stage beyond court and pulpit.' },
        ],
    },
    {
        id: 'virgo-1961',
        sign: 'Virgo',
        symbol: '♍',
        house: 6,
        timeframe: '1961–1969',
        startYear: 1961,
        endYear: 1969,
        element: 'earth',
        status: 'completed',
        isCurrent: false,
        domain: 'Systems',
        oldOrder: 'Industrial work depends on human labor',
        shock: 'Automation',
        reorganization: 'Machines enter production',
        question: 'Do humans have to do the work?',
        consequences: [
            'Numerical control and industrial robots move repetitive judgment into machinery',
            'Operations research and systems management make efficiency an organizational doctrine',
            'Service and knowledge work expand as factory employment begins to lose primacy',
        ],
        distortionRisk: [
            'Productivity gains detach from job security and bargaining power',
            'Optimization treats workers and communities as disposable inputs',
        ],
        historicalParallel: {
            previousOccurrence: '1878–1884',
            historicalThemes: [
                'Scientific management emerged from the drive to standardize industrial work',
                'Electric motors and mechanized production altered the factory floor',
                'New corporations coordinated labor and output at unprecedented scale',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1794–1800', note: 'Mechanized textile production accelerated the shift from skilled domestic labor to the factory system.' },
            { period: '1710–1716', note: 'Early industrial organization standardized tools, tasks, and skilled labor inside larger workshops.' },
        ],
    },
    {
        id: 'libra-1968',
        sign: 'Libra',
        symbol: '♎',
        house: 7,
        timeframe: '1968–1975',
        startYear: 1968,
        endYear: 1975,
        element: 'air',
        status: 'completed',
        isCurrent: false,
        domain: 'Relationships',
        oldOrder: 'Inherited social / legal roles',
        shock: 'Rights revolution',
        reorganization: 'Relationships reorganize around individual rights',
        question: 'Who gets to define the relationship?',
        consequences: [
            'Civil-rights, feminist, and gay-liberation movements widen the claim to equal citizenship',
            'Courts and legislatures recast discrimination as a structural public issue',
            'Workplaces, families, and cultural institutions renegotiate inherited roles',
        ],
        distortionRisk: [
            'Symbolic inclusion substitutes for material redistribution',
            'Backlash reframes equal rights as a threat to social cohesion',
        ],
        historicalParallel: {
            previousOccurrence: '1884–1890',
            historicalThemes: [
                'Labor organization challenged the legal terms of industrial power',
                "Women’s suffrage and social-reform movements expanded public claims to equality",
                'Mass migration forced cities to renegotiate belonging and civic participation',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1800–1807', note: 'Emancipation, constitutional reform, and revolutionary law unsettled inherited status across the Atlantic world.' },
            { period: '1716–1723', note: 'Commercial society and new public institutions shifted relationships among crown, creditor, and citizen.' },
        ],
    },
    {
        id: 'scorpio-1974',
        sign: 'Scorpio',
        symbol: '♏',
        house: 8,
        timeframe: '1974–1981',
        startYear: 1974,
        endYear: 1981,
        element: 'water',
        status: 'completed',
        isCurrent: false,
        domain: 'Power',
        oldOrder: 'Stable postwar monetary and energy order',
        shock: 'Oil & inflation',
        reorganization: 'Money and energy become geopolitical instruments',
        question: 'What is money really worth?',
        consequences: [
            'Oil shocks expose the dependence of industrial growth on cheap energy',
            'Inflation and floating exchange rates replace postwar monetary predictability',
            'Central banks, commodity producers, and financial markets gain new structural power',
        ],
        distortionRisk: [
            'Scarcity and inflation become self-reinforcing political expectations',
            'Financial responses suppress demand without resolving energy dependence',
        ],
        historicalParallel: {
            previousOccurrence: '1890–1897',
            historicalThemes: [
                'Industrial consolidation concentrated control over capital and resources',
                'Electric power and petroleum began remaking the energy system',
                'Financial panics exposed the fragility beneath rapid industrial expansion',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1806–1814', note: 'Blockade, war finance, and commodity scarcity turned trade and money into weapons of state power.' },
            { period: '1722–1730', note: 'Governments rebuilt public credit after speculative collapse and sharpened control over fiscal systems.' },
        ],
    },
    {
        id: 'sagittarius-1981',
        sign: 'Sagittarius',
        symbol: '♐',
        house: 9,
        timeframe: '1981–1988',
        startYear: 1981,
        endYear: 1988,
        element: 'fire',
        status: 'completed',
        isCurrent: false,
        domain: 'Expansion',
        oldOrder: 'Postwar managed capitalism',
        shock: 'Market liberalization',
        reorganization: 'Markets become governing doctrine',
        question: 'What if markets governed instead?',
        consequences: [
            'Reagan and Thatcher make market liberalization a governing program',
            'Volcker-era disinflation resets the balance between labor, capital, and central banks',
            'Finance and global trade become the primary engines of expansion',
        ],
        distortionRisk: [
            'Deregulation allows leverage and inequality to accumulate beneath growth',
            'Market doctrine is treated as universal rather than contingent',
        ],
        historicalParallel: {
            previousOccurrence: '1891–1898',
            historicalThemes: [
                'Global trade and imperial expansion carried economic ideology abroad',
                'Gold-standard disputes challenged the accepted monetary order',
                'Competitive markets fused with nationalist power',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1807–1814', note: 'Napoleonic expansion spread revolutionary legal and economic doctrines across Europe.' },
            { period: '1723–1731', note: 'The South Sea Bubble aftermath forced a reassessment of speculative markets and public finance.' },
        ],
    },
    {
        id: 'capricorn-1988',
        sign: 'Capricorn',
        symbol: '♑',
        house: 10,
        timeframe: '1988–1995',
        startYear: 1988,
        endYear: 1995,
        element: 'earth',
        status: 'completed',
        isCurrent: false,
        domain: 'Structure',
        oldOrder: 'Bipolar superpower system',
        shock: 'Soviet collapse',
        reorganization: 'Unipolar order',
        question: 'What happens when one pole disappears?',
        consequences: [
            'Privatization rapidly redistributes state assets and power',
            'European integration accelerates as the continent\u2019s structure changes',
            'A unipolar order replaces superpower balance as the organizing premise',
        ],
        distortionRisk: [
            'Institutional victory is mistaken for permanent consensus',
            'Rapid transition hollows out states and concentrates wealth',
        ],
        historicalParallel: {
            previousOccurrence: '1904–1912',
            historicalThemes: [
                'Rigid alliances reorganized the European balance of power',
                'Revolution destabilized imperial authority in Russia',
                'Institutional order concealed growing structural fragility',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1820–1828', note: 'The Concert of Europe imposed a new institutional order after Napoleonic collapse.' },
            { period: '1736–1744', note: 'Bureaucratic consolidation under enlightened despots reshaped European states.' },
        ],
    },
    {
        id: 'aquarius-1995',
        sign: 'Aquarius',
        symbol: '♒',
        house: 11,
        timeframe: '1995–2003',
        startYear: 1995,
        endYear: 2003,
        element: 'air',
        status: 'completed',
        isCurrent: false,
        domain: 'Networks',
        oldOrder: 'Information controlled by gatekeepers',
        shock: 'Internet',
        reorganization: 'Open networks',
        question: 'What if everyone could connect directly?',
        consequences: [
            'Search, email, and e-commerce reorganize communication and exchange',
            'Capital floods the infrastructure of a connected economy',
            'Communities coordinate across borders without traditional intermediaries',
        ],
        distortionRisk: [
            'Open networks consolidate into winner-take-most platforms',
            'Speculation outruns viable business models and digital security',
        ],
        historicalParallel: {
            previousOccurrence: '1912–1919',
            historicalThemes: [
                'Radio and electrification expanded the reach of mass communication',
                'Technical networks transformed coordination during World War I',
                'Information infrastructure became a new form of power',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1828–1836', note: 'Abolitionist networks and reform societies pioneered decentralized mass coordination.' },
            { period: '1744–1752', note: 'Learned societies created transnational networks that bypassed traditional hierarchies.' },
        ],
    },
    {
        id: 'pisces-2003',
        sign: 'Pisces',
        symbol: '♓',
        house: 12,
        timeframe: '2003–2010',
        startYear: 2003,
        endYear: 2010,
        element: 'water',
        status: 'completed',
        isCurrent: false,
        domain: 'Unity',
        oldOrder: 'Financial risk is measurable and contained',
        shock: 'Financial crisis',
        reorganization: 'Hidden systemic risk becomes public liability',
        question: "What if the risk isn't actually contained?",
        consequences: [
            'The financial crisis exposes leverage and counterparty risk hidden throughout the global system',
            'Bailouts and quantitative easing transfer private financial risk onto public institutions',
            'Financial stability becomes inseparable from government and central-bank intervention',
        ],
        distortionRisk: [
            'Emergency support protects a system whose underlying risks remain difficult to see',
            'Recovered asset prices conceal unresolved fragility and lost public trust',
        ],
        historicalParallel: {
            previousOccurrence: '1919–1927',
            historicalThemes: [
                'Credit expansion concealed growing leverage beneath apparent prosperity',
                'Speculative markets obscured the fragility accumulating inside the financial system',
                'A narrative of restored normality masked risks that would surface after Uranus left Pisces',
            ],
        },
        extendedHistoricalPeriods: [
            {
                period: '1835–1843',
                note: 'Credit expansion and the Panic of 1837 exposed financial fragility hidden beneath speculative growth.',
            },
            {
                period: '1751–1759',
                note: 'Expanding trade and credit networks made distant financial risks harder to see and easier to transmit.',
            },
        ],
    },
    {
        id: 'aries-2010',
        sign: 'Aries',
        symbol: '♈',
        house: 1,
        timeframe: '2010–2018',
        startYear: 2010,
        endYear: 2018,
        element: 'fire',
        status: 'completed',
        isCurrent: false,
        domain: 'Initiation',
        oldOrder: 'Institutions organize political action',
        shock: 'Social media',
        reorganization: 'Individuals mobilize directly',
        question: 'What if anyone could mobilize a movement?',
        consequences: [
            'The Arab Spring demonstrated networked mass mobilization',
            'Populist movements bypassed traditional media and party structures',
            'Identity and outrage became tools for rapid political coordination',
        ],
        distortionRisk: [
            'Mobilization outruns organization, producing volatility without durable reform',
            'Platforms amplify polarization while accumulating unelected power',
        ],
        historicalParallel: {
            previousOccurrence: '1927–1934',
            historicalThemes: [
                'Mass movements challenged weakened political institutions',
                'The 1929 crash accelerated demands for radical action',
                'New media enabled leaders to mobilize populations directly',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1843–1851', note: 'The revolutions of 1848 used popular mobilization to challenge monarchies across Europe.' },
            { period: '1759–1767', note: 'Wilkite radicalism and colonial assertiveness challenged British imperial authority.' },
        ],
    },
    {
        id: 'taurus-2018',
        sign: 'Taurus',
        symbol: '♉',
        house: 2,
        timeframe: '2018–2026',
        startYear: 2018,
        endYear: 2026,
        element: 'earth',
        status: 'completed',
        isCurrent: false,
        domain: 'Stability',
        oldOrder: 'Global abundance / stable supply',
        shock: 'COVID / inflation',
        reorganization: 'Resilience replaces pure efficiency',
        question: "What if abundance isn't guaranteed?",
        consequences: [
            'Supply shocks and inflation repriced material and financial risk',
            'Energy security and industrial policy returned to the center of state strategy',
            'Crypto and digital payments challenged assumptions about money and settlement',
        ],
        distortionRisk: [
            'Scarcity politics hardens into protectionism and resource conflict',
            'Financial markets underprice physical limits until supply fails again',
        ],
        historicalParallel: {
            previousOccurrence: '1934–1942',
            historicalThemes: [
                'Depression-era monetary systems were rebuilt under pressure',
                'Resources and industrial capacity became matters of national security',
                'Material mobilization prepared economies for total war',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1850–1858', note: 'The California Gold Rush reshaped monetary flows, labor, land, and commodity speculation.' },
            { period: '1766–1774', note: 'Colonial currency crises and British taxation disputes destabilized established systems of material value.' },
        ],
    },
    {
        id: 'gemini-2026',
        sign: 'Gemini',
        symbol: '♊',
        house: 3,
        timeframe: 'Apr 25, 2026 – 2033',
        startYear: 2026,
        endYear: 2033,
        element: 'air',
        status: 'active',
        isCurrent: true,
        domain: 'Exchange',
        oldOrder: 'Knowledge production requires humans',
        shock: 'AI',
        reorganization: 'Machines begin processing knowledge',
        question: 'Does knowledge production require humans?',
        consequences: [
            'AI models begin generating and reasoning across language, code, images, and research',
            'Synthetic communication makes identity and authorship harder to verify',
            'Judgment becomes more valuable as generating information becomes cheaper',
        ],
        distortionRisk: [
            'Trust collapses under synthetic media and automated persuasion',
            'Cognitive authority concentrates inside opaque models and platforms',
        ],
        historicalParallel: {
            previousOccurrence: '1941–1949',
            historicalThemes: [
                'Radar and codebreaking transformed how information was processed',
                'Wartime computing moved cognition into machines',
                'New information systems reorganized war and state power',
            ],
        },
        extendedHistoricalPeriods: [
            { period: '1857–1865', note: 'Telegraph networks transformed war strategy and news distribution during the US Civil War.' },
            { period: '1773–1781', note: 'Pamphlet warfare and revolutionary communication networks accelerated the American Revolution.' },
        ],
    },
];
