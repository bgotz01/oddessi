// Neptune-Pluto Civilizational Cycle Data
export type CyclePhase = 'Conjunction' | 'Waxing Sextile' | 'Waxing Square' | 'Waxing Trine' | 'Opposition' | 'Waning Trine' | 'Waning Square' | 'Waning Sextile';

export interface NeptunePlutoCycle {
    year: number;
    sign: string;
    phase: CyclePhase;
    civilizationalTheme: string;
}

export interface CycleMilestone {
    aspect: 'Conjunction' | 'Sextile' | 'Waxing Sextile' | 'Waxing Square' | 'Opposition' | 'Waning Square' | 'Waning Sextile' | 'Next Conjunction';
    year: number;
    label: string;
    degree: number;
    meaning: string;
}

export interface MilestoneMeaning {
    aspect: string;
    degree: string;
    title: string;
    whatHappens: string[];
    typicalSignals: string[];
    example: {
        period: string;
        events: string[];
    };
}

// Neptune and Pluto linger around the waxing sextile because of their orbital
// resonance: the first exact crossing was in 1950, and the aspect returns near
// exactness in the current 2026–2028 peak window before advancing to the square.
export const NEPTUNE_PLUTO_MILESTONES: CycleMilestone[] = [
    { aspect: 'Conjunction', year: 1891, label: 'Conjunction', degree: 0, meaning: 'Birth of a new civilizational narrative. New ideological, psychological, and media paradigms begin forming.' },
    { aspect: 'Waxing Sextile', year: 1950, label: 'Waxing Sextile', degree: 60, meaning: 'Early expansion of the new paradigm. Institutions and technologies begin scaling the ideas seeded at the conjunction.' },
    { aspect: 'Waxing Square', year: 2062, label: 'Waxing Square', degree: 90, meaning: 'Conflict between the emerging paradigm and existing institutions. The new worldview begins disrupting established systems.' },
    { aspect: 'Opposition', year: 2137, label: 'Opposition', degree: 180, meaning: 'The paradigm becomes fully global. Ideological systems and media structures reach maximum influence.' },
    { aspect: 'Waning Square', year: 2309, label: 'Waning Square', degree: 270, meaning: 'Structural strain appears in the dominant worldview. Institutions struggle with contradictions created by the paradigm.' },
    { aspect: 'Waning Sextile', year: 2337, label: 'Waning Sextile', degree: 300, meaning: 'Preparation for the next civilizational narrative. New philosophies and cultural frameworks begin emerging.' },
    { aspect: 'Next Conjunction', year: 2385, label: 'Next Conjunction', degree: 360, meaning: 'Collapse of the previous worldview and emergence of a new civilizational paradigm.' }
];

export const MILESTONE_MEANINGS: MilestoneMeaning[] = [
    {
        aspect: 'Conjunction',
        degree: '0°',
        title: 'Civilizational Seed',
        whatHappens: [
            'A new civilizational narrative begins forming',
            'New mythologies, ideologies, and symbolic systems emerge',
            'A deeper shift begins in how societies imagine reality itself',
        ],
        typicalSignals: [
            'New media forms',
            'Intellectual and spiritual upheaval',
            'New mass narratives that reshape collective imagination',
        ],
        example: {
            period: '1891–1892',
            events: [
                'Mass media era begins scaling',
                'Modern psychology and depth analysis emerge',
                'Ideological mass politics intensify',
            ],
        },
    },
    {
        aspect: 'Waxing Sextile',
        degree: '60°',
        title: 'Early Dissemination',
        whatHappens: [
            'The new worldview begins spreading through institutions and culture',
            'Media systems scale the ideas seeded at the conjunction',
            'Narratives start shaping education, politics, and identity more deeply',
        ],
        typicalSignals: [
            'Expansion of broadcast and image-based media',
            'Ideological blocs and cultural movements gain coherence',
            'Mass persuasion tools become normalized',
        ],
        example: {
            period: '1950–2032',
            events: [
                'Television becomes a dominant reality engine',
                'Global ideological storytelling intensifies',
                'Mass culture and mediated identity expand',
            ],
        },
    },
    {
        aspect: 'Waxing Square',
        degree: '90°',
        title: 'Narrative Conflict',
        whatHappens: [
            'The emerging worldview collides with inherited institutions',
            'Narrative systems become contested, fragmented, and adversarial',
            'Information itself becomes a battleground',
        ],
        typicalSignals: [
            'Media distrust',
            'Competing ideological realities',
            'Narrative warfare and perception management',
        ],
        example: {
            period: '~2062',
            events: [
                'Emerging narrative systems confront inherited institutions',
                'Competing information orders intensify',
                'Governance adapts to a transformed media environment',
            ],
        },
    },
    {
        aspect: 'Opposition',
        degree: '180°',
        title: 'Total Narrative Dominance',
        whatHappens: [
            'The civilizational paradigm reaches full global expression',
            'Society is fully organized around the dominant narrative infrastructure',
            'Reality becomes deeply mediated through symbolic, digital, and ideological systems',
        ],
        typicalSignals: [
            'Global narrative synchronization',
            'Institutional dependence on mediated reality',
            'Civilizational identity shaped by information systems',
        ],
        example: {
            period: '~2137',
            events: [
                'Fully immersive media systems dominate collective perception',
                'Ideological and symbolic systems structure world order',
                'Narrative power becomes central to governance',
            ],
        },
    },
    {
        aspect: 'Waning Square',
        degree: '270°',
        title: 'Mythic Exhaustion',
        whatHappens: [
            'The dominant worldview begins showing deep contradictions',
            'Institutions lose control of the narratives that once stabilized them',
            'Civilizational meaning systems become strained, cynical, or hollow',
        ],
        typicalSignals: [
            'Mass disillusionment',
            'Collapse of symbolic legitimacy',
            'Crisis of meaning across institutions',
        ],
        example: {
            period: '~2309',
            events: [
                'Institutional narratives lose credibility',
                'Civilizational fragmentation accelerates',
                'New metaphysical and cultural alternatives emerge',
            ],
        },
    },
    {
        aspect: 'Waning Sextile',
        degree: '300°',
        title: 'Preparation for a New Worldview',
        whatHappens: [
            'Early seeds of the next civilizational myth begin appearing',
            'The old symbolic order still exists, but no longer feels alive',
            'New frameworks for meaning begin forming at the edges of culture',
        ],
        typicalSignals: [
            'Emerging philosophies',
            'New symbolic languages',
            'Cultural experiments that point beyond the old paradigm',
        ],
        example: {
            period: '~2337',
            events: [
                'New meaning systems begin to cohere',
                'Alternative civilizational narratives gain attention',
                'Proto-myths of the next era emerge',
            ],
        },
    },
    {
        aspect: 'Next Conjunction',
        degree: '360°',
        title: 'Civilizational Reset',
        whatHappens: [
            'The old worldview collapses as a new one takes root',
            'A new symbolic and ideological era begins',
            'The cycle of collective imagination resets',
        ],
        typicalSignals: [
            'Collapse of prior meaning systems',
            'Birth of a new civilizational myth',
            'Reorganization of reality around a new symbolic core',
        ],
        example: {
            period: '~2385',
            events: [
                'Old worldview fully dissolves',
                'New civilizational narrative emerges',
                'A new Neptune–Pluto cycle begins',
            ],
        },
    },
];


export const NEPTUNE_PLUTO_CONJUNCTIONS: NeptunePlutoCycle[] = [
    {
        year: 1891,
        sign: 'Gemini',
        phase: 'Conjunction',
        civilizationalTheme: 'Narrative technologies reshape power structures',
    },
];

export const PREVIOUS_CYCLE = {
    period: '1398–1891',
    summary: 'Renaissance, Reformation & Industrial Revolution',
    events: [
        'Renaissance humanism and movable-type printing transformed how knowledge circulated',
        'The Protestant Reformation fractured religious authority and reorganized European political identity',
        'The Scientific Revolution and Enlightenment changed shared models of nature, reason, and legitimacy',
        'Oceanic empires and colonial trade connected distant economies, cultures, and information systems',
        'The Industrial Revolution introduced mechanized production, mass urbanization, and new social classes',
    ],
};


export const CURRENT_CYCLE = {
    conjunction: 1891,
    conjunctionSign: 'Gemini',
    nextConjunction: '~2380s',
    totalCycleLength: 494,
    currentPhase: 'Waxing Sextile' as CyclePhase,
    peakAlignmentWindow: '2026–2028',
    eraName: 'The Information Civilization Cycle',
};

export const TECHNOLOGICAL_MILESTONES = [
    { year: '1890s', technology: 'Mass newspapers + telegraph networks', narrativeForm: 'Mass narrative' },
    { year: '1920s', technology: 'Radio', narrativeForm: 'Voice + charisma politics' },
    { year: '1950s', technology: 'Television', narrativeForm: 'Image politics' },
    { year: '1990s', technology: 'Internet', narrativeForm: 'Decentralized narratives' },
    { year: '2020s', technology: 'AI and algorithmic media', narrativeForm: 'Synthetic narratives' },
];

export const PHASE_MEANINGS = [
    {
        phase: 'Conjunction: Seed',
        meaning: 'A new myth or worldview begins',
    },
    {
        phase: 'Waxing Sextile/Trine: Buildout',
        meaning: 'New narrative systems expand and spread',
    },
    {
        phase: 'Waxing Square/Opposition: Contest',
        meaning: 'Competing ideologies battle for dominance',
    },
    {
        phase: 'Waning aspects: Decomposition & re-seeding',
        meaning: 'The narrative loses legitimacy and a new cycle prepares',
    },
];

export const CIVILIZATIONAL_EXPRESSIONS = {
    informationSystems: [
        'Mass newspapers',
        'Radio',
        'Television',
        'Internet',
        'AI',
    ],
    collectiveIdentity: [
        'Nationalism',
        'Ideological movements',
        'Mass political narratives',
        'Online identities',
    ],
    powerStructures: [
        'Propaganda',
        'Narrative warfare',
        'Algorithmic influence',
        'Information control',
    ],
};

export const CYCLE_COMPARISON = [
    { cycle: 'Neptune–Pluto', timescale: '~492 years', role: 'Civilizational narrative' },
    { cycle: 'Pluto sign', timescale: '~20 years', role: 'Power structure' },
    { cycle: 'Uranus sign', timescale: '~7 years', role: 'Technological change' },
    { cycle: 'Saturn–Pluto', timescale: '~33 years', role: 'Structural crisis' },
];

export const MECHANISM_STEPS = [
    { step: 'Compression', description: 'Complex reality → simple myth' },
    { step: 'Distribution', description: 'Media systems spread the myth' },
    { step: 'Incentives', description: 'Institutions reward belief-aligned behavior' },
    { step: 'Enforcement', description: 'Dissent gets punished socially / financially / legally' },
    { step: 'Capture', description: 'Power holders learn to steer the myth-engine' },
];

export const DISTORTION_RISKS = [
    'Mass delusion / mass paranoia',
    'Hyperreality: images replace reality',
    'Memetic warfare / narrative capture',
    'Cult dynamics (political, religious, financial)',
    '"Truth crisis" as a structural condition',
];

export const PEAK_ALIGNMENT_INTERPRETATIONS = [
    'Maximum throughput of narrative tech into institutions',
    'Legibility crisis: what\'s real vs what\'s mediated',
    'Power re-architecture: platforms/compute become sovereignty-adjacent',
];

export const SIGNALS_TO_WATCH = [
    'New identity rails (digital ID, reputation, biometrics, wallets)',
    'AI media normalization (synthetic content becomes default)',
    'Regulation fights over "truth" infrastructure',
    'Platform sovereignty (payments, courts, policing equivalents)',
    'Information war escalation / censorship debates',
];

// Helper function to calculate years into current cycle
export function getNeptunePlutoYearsIntoCycle(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - CURRENT_CYCLE.conjunction;
}

// Helper function to get current phase
export function getNeptunePlutoCyclePhase(): CyclePhase {
    return CURRENT_CYCLE.currentPhase;
}

// Helper function to get current interval
export function getCurrentInterval(): { previous: CycleMilestone; next: CycleMilestone } | null {
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < NEPTUNE_PLUTO_MILESTONES.length - 1; i++) {
        const current = NEPTUNE_PLUTO_MILESTONES[i];
        const next = NEPTUNE_PLUTO_MILESTONES[i + 1];

        if (currentYear >= current.year && currentYear < next.year) {
            return { previous: current, next };
        }
    }

    return null;
}
