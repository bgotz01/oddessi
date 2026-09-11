// Canonical phase vocabulary
export type CyclePhase = 'Conjunction' | 'Early' | 'Mid' | 'Late';

export interface SaturnPlutoCycle {
    year: number;
    sign: string;
    symbol: string;
    element: 'Fire' | 'Earth' | 'Air' | 'Water';
    isCurrent?: boolean;
    phase?: CyclePhase;

    structuralTheme: string;

    coreArchetype: string[];
    powerDynamics: string[];
    institutionalPressure: string[];
    crisisCharacter: string[];
    reconstructionFocus: string[];
    historicalEvents: string[];
}

export const SATURN_PLUTO_CONJUNCTIONS: SaturnPlutoCycle[] = [
    {
        year: 2020,
        sign: 'Capricorn',
        symbol: '♑',
        element: 'Earth',
        isCurrent: true,
        phase: 'Early',
        structuralTheme: 'System Stress Test & Institutional Rebuild',

        coreArchetype: [
            'Hard constraints expose structural weaknesses within complex systems',
            'Institutions face pressure to enforce order and maintain continuity under crisis conditions',
            'Crisis compresses timelines, forcing rapid structural adaptation',
            'Authority reorganizes around resilience, enforcement, and system stability',
        ],

        powerDynamics: [
            'States expand operational authority in the name of stability and crisis management',
            'Central banks and fiscal authorities increasingly act together to stabilize financial systems',
            'Operators of critical infrastructure gain strategic importance',
            'Geopolitical competition intensifies around supply chains and strategic industries',
        ],

        institutionalPressure: [
            'Public systems reach capacity limits under simultaneous economic and social stress',
            'Global supply chains reveal fragility and concentration risks',
            'Institutional legitimacy is challenged by crisis governance and polarized narratives',
            'Financial markets become dependent on extraordinary policy support',
        ],

        crisisCharacter: [
            'System-wide shocks cascade across health, labor, finance, and logistics',
            'Governments expand compliance and enforcement systems during emergency periods',
            'Public trust fractures as competing narratives challenge institutional authority',
            'Resilience becomes a central measure of system strength',
        ],

        reconstructionFocus: [
            'Economic systems prioritize resilience over efficiency',
            'Strategic industries and domestic capacity become policy priorities',
            'Digital infrastructure becomes foundational to economic coordination',
            'Institutions redesign risk frameworks to prepare for systemic disruptions',
        ],

        historicalEvents: [
            'COVID-19 triggers global emergency governance and economic shutdowns',
            'Massive fiscal and monetary interventions stabilize financial systems',
            'Supply chain disruptions elevate resilience and security as policy priorities',
            'Digital coordination systems expand rapidly across economic activity',
        ],
    },

    {
        year: 1982,
        sign: 'Libra',
        symbol: '♎',
        element: 'Air',
        isCurrent: false,
        phase: 'Conjunction',
        structuralTheme: 'Financialization & Market-Law Governance',

        coreArchetype: [
            'Economic coordination shifts toward markets, pricing, and contracts as primary “truth machines”',
            'Power migrates from production capacity toward capital allocation, deal-making, and financial structure',
            'A new legitimacy emerges: valuation, discipline, and market access determine authority',
            'The economy becomes increasingly mediated by financial instruments and institutional investors',
        ],

        powerDynamics: [
            'Capital markets expand in influence over firms, labor, and national policy constraints',
            'Central banks rise as regime-defining institutions through rate policy and credibility',
            'Corporate governance pivots toward shareholder alignment and market metrics',
            'Legal/contract frameworks (Libra) scale—compliance, arbitration, financial plumbing, deal architecture',
        ],

        institutionalPressure: [
            'High rates and disinflation pressures restructure debtors, banks, and sovereign borrowers',
            'Industrial labor and legacy business models lose bargaining power in the new regime',
            'Policy credibility becomes the institution: inflation control outranks other objectives',
            'International financial institutions and creditor structures gain leverage over national policy',
        ],

        crisisCharacter: [
            'Disinflation shock produces recession and a reset of credit conditions',
            'Sovereign and emerging-market debt strains reveal fragility of prior lending structures',
            'A new “market discipline” ideology hardens: austerity, liberalization, privatization debates',
            'Leverage innovations begin scaling—setting up later fragility as complexity grows',
        ],

        reconstructionFocus: [
            'Institutionalization of finance as the core wealth engine (pensions, funds, market participation)',
            'Rapid expansion of securitization, derivatives, and structured products',
            'Corporate restructuring becomes normal: M&A waves, buybacks, financial engineering',
            'Globalization becomes increasingly mediated through financial flows and cross-border capital markets',
        ],

        historicalEvents: [
            'Volcker-era disinflation peaks; credit conditions reset globally',
            'Latin American debt crisis erupts (symptom of the regime shift)',
            'Deregulation and liberalization momentum accelerates in key economies',
            'Institutional investing expands; modern finance grows in scope and influence',
        ],
    },

    {
        year: 1947,
        sign: 'Leo',
        symbol: '♌',
        element: 'Fire',
        isCurrent: false,
        phase: 'Conjunction',
        structuralTheme: 'Post-War Sovereignty & Superpower Order',

        coreArchetype: [
            'A new global hierarchy forms: legitimacy rooted in sovereign power and national story (Leo)',
            'Security and ideology fuse into long-run statecraft',
            'The public narrative becomes strategic infrastructure (propaganda, media, prestige)',
            'Institutions are rebuilt around the demands of a new era of power projection',
        ],

        powerDynamics: [
            'Superpowers define global alignment, security, and economic reconstruction pathways',
            'Intelligence apparatus expands as a permanent arm of the state',
            'Military-industrial capacity becomes a structural pillar of national power',
            'Decolonization shifts sovereignty outward as empires lose legitimacy',
        ],

        institutionalPressure: [
            'Europe rebuilds under new dependence on superpower frameworks',
            'Colonial institutions unravel under independence movements',
            'Diplomatic order reorganizes into ideological blocs and alliance systems',
            'Economic systems become subordinated to strategic competition and reconstruction needs',
        ],

        crisisCharacter: [
            'Transition from world war to Cold War produces permanent strategic tension',
            'Nuclear weapons redefine conflict thresholds and deterrence logic',
            'Rapid sovereignty churn creates instability and new borders',
            'Reconstruction demands large-scale institutional and financial coordination',
        ],

        reconstructionFocus: [
            'International institutions and alliance structures scale rapidly',
            'Reconstruction funding and industrial rebuilding become central priorities',
            'Security frameworks formalize: alliances, doctrines, intelligence networks',
            'National development models expand across newly independent states',
        ],

        historicalEvents: [
            'Truman Doctrine and early containment architecture',
            'Marshall Plan reconstruction begins',
            'Permanent intelligence/security institutions expand (e.g., CIA formation era)',
            'India and Pakistan independence; partition upheaval',
        ],
    },

    {
        year: 1914,
        sign: 'Cancer',
        symbol: '♋',
        element: 'Water',
        isCurrent: false,
        phase: 'Conjunction',
        structuralTheme: 'Imperial Collapse & Total Mobilization',

        coreArchetype: [
            'Old imperial legitimacy breaks under industrial war pressure',
            'Nation, homeland, and mass identity (Cancer) become primary mobilization engines',
            'State capacity expands through emergency governance and total war planning',
            'Collective trauma reshapes political expectations and the social contract',
        ],

        powerDynamics: [
            'Empires and monarchies face existential legitimacy crises',
            'Total war demands unprecedented state authority over production and populations',
            'Revolutionary movements challenge collapsed legitimacy structures',
            'Colonial subjects and nationalist movements accelerate challenges to imperial control',
        ],

        institutionalPressure: [
            'Pre-war financial order and cross-border stability mechanisms fracture under war finance',
            'Traditional diplomacy fails; alliance commitments lock into escalation',
            'Wartime planning replaces market coordination in essential domains',
            'Social hierarchies strain under mass mobilization and casualty pressure',
        ],

        crisisCharacter: [
            'Industrial-scale warfare introduces mass casualty and total mobilization',
            'Cascading escalation as alliances activate under shock conditions',
            'Internal cohesion becomes strategic: propaganda, censorship, security apparatus growth',
            'Economic and political systems reorganize to survive extreme constraint',
        ],

        reconstructionFocus: [
            'Nation-state order expands as empires weaken and borders shift',
            'New attempts at international coordination emerge after collapse (proto global governance)',
            'Mass politics accelerates: labor, women’s roles, and citizenship claims expand',
            'Alternative ideologies gain traction where old legitimacy fails',
        ],

        historicalEvents: [
            'Assassination of Archduke Franz Ferdinand triggers alliance escalation',
            'World War I begins and expands into total industrial conflict',
            'Imperial structures weaken and later collapse across multiple empires',
            'Emergency war governments centralize authority and planning',
        ],
    },
];

export const CYCLE_PHASES = [
    {
        phase: 'Conjunction',
        meaning: 'Systemic pressure / structural reset point',
        characteristics: [
            'Institutional stress peaks and weak points become visible',
            'Power structures consolidate, fracture, or reorganize',
            'High-stakes governance decisions set new constraints',
            'Crisis-response logic can dominate public life',
        ],
        coincidesWith: [
            'Emergency governance',
            'Economic contraction or dislocation',
            'Institutional restructuring and new rules',
        ],
    },
    {
        phase: 'Early Cycle',
        meaning: 'Rebuilding and stabilization under new constraints',
        characteristics: [
            'New institutions and rule-sets begin forming',
            'Systems adapt to the post-crisis environment',
            'Power arrangements stabilize',
        ],
        examples: [
            'Post-crisis policy frameworks',
            'New regulatory regimes',
            'Infrastructure modernization cycles',
        ],
    },
    {
        phase: 'Mid Cycle',
        meaning: 'Consolidation and operational maturity',
        characteristics: [
            'Institutions operate with relative stability',
            'The new regime becomes “normal”',
            'Growth and consolidation tend to dominate',
        ],
        examples: [
            'Institutional confidence periods',
            'Stable geopolitical structures',
            'Expansion inside the new rule-set',
        ],
    },
    {
        phase: 'Late Cycle',
        meaning: 'Tension accumulation and legitimacy strain',
        characteristics: [
            'Imbalances build inside the regime',
            'Institutional legitimacy weakens',
            'Stress tests emerge more frequently',
        ],
        examples: [
            'Debt or leverage accumulation',
            'Rising inequality or polarization',
            'Pre-crisis warning signals',
        ],
    },
];

export const CURRENT_CYCLE = {
    conjunction: 2020,
    nextConjunction: 2053,
    totalCycleLength: 33,
};

// Helper function to get current cycle
export function getCurrentSaturnPlutoCycle(): SaturnPlutoCycle | undefined {
    return SATURN_PLUTO_CONJUNCTIONS.find((c) => c.isCurrent);
}

// Helper function to get next conjunction year
export function getSaturnPlutoNextConjunctionYear(): number {
    const current = getCurrentSaturnPlutoCycle();
    return current ? current.year + 33 : 2053;
}

// Helper function to calculate years into current cycle (clamped to cycle length)
export function getSaturnPlutoYearsIntoCycle(): number {
    const current = getCurrentSaturnPlutoCycle();
    if (!current) return 0;

    // Saturn-Pluto conjunction in Capricorn: January 12, 2020
    const conjunctionDate = new Date('January 12, 2020');
    const now = new Date();
    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const yearsIn = (now.getTime() - conjunctionDate.getTime()) / msPerYear;

    // Round to 4 decimal places to avoid hydration mismatches
    return Math.min(Math.max(Math.round(yearsIn * 10000) / 10000, 0), 33);
}

// Helper function to get cycle phase
export function getSaturnPlutoCyclePhase(): CyclePhase {
    const yearsIn = getSaturnPlutoYearsIntoCycle();
    if (yearsIn === 0) return 'Conjunction';
    if (yearsIn < 11) return 'Early';
    if (yearsIn < 22) return 'Mid';
    return 'Late';
}
