// Uranus-Pluto Revolutionary Cycle Data

export interface CycleMilestone {
    aspect: 'Conjunction' | 'Waxing Sextile' | 'Waxing Square' | 'Opposition' | 'Waning Square' | 'Waning Sextile' | 'Next Conjunction';
    year: number;
    label: string;
    degree: number;
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

export const URANUS_PLUTO_MILESTONES: CycleMilestone[] = [
    { aspect: 'Conjunction', year: 1966, label: 'Conjunction', degree: 0 },
    { aspect: 'Waxing Sextile', year: 1995, label: 'Waxing Sextile', degree: 60 },
    { aspect: 'Waxing Square', year: 2012, label: 'Waxing Square', degree: 90 },
    { aspect: 'Opposition', year: 2046, label: 'Opposition', degree: 180 },
    { aspect: 'Waning Square', year: 2073, label: 'Waning Square', degree: 270 },
    { aspect: 'Waning Sextile', year: 2083, label: 'Waning Sextile', degree: 300 },
    { aspect: 'Next Conjunction', year: 2104, label: 'Next Conjunction', degree: 360 },
];

export const MILESTONE_MEANINGS: MilestoneMeaning[] = [
    {
        aspect: 'Conjunction',
        degree: '0°',
        title: 'Cycle Birth',
        whatHappens: [
            'A new technological paradigm emerges',
            'Revolutionary ideas appear',
            'Existing systems begin to destabilize',
        ],
        typicalSignals: [
            'Scientific breakthroughs',
            'Radical social movements',
            'New tools that challenge old power structures',
        ],
        example: {
            period: '1965–1966',
            events: [
                'Semiconductor revolution',
                'Computing foundations',
                'Civil rights + cultural revolution',
            ],
        },
    },
    {
        aspect: 'Waxing Sextile',
        degree: '60°',
        title: 'Early Adoption',
        whatHappens: [
            'The innovation begins scaling',
            'Institutions experiment with the new technology',
            'Infrastructure begins forming',
        ],
        typicalSignals: [
            'Venture funding',
            'Early commercial products',
            'Research institutions expand',
        ],
        example: {
            period: '1995',
            events: [
                'Commercial internet expansion',
                'The web enters mainstream use',
                'Dot-com investment accelerates',
            ],
        },
    },
    {
        aspect: 'Waxing Square',
        degree: '90°',
        title: 'System Conflict',
        whatHappens: [
            'New technology collides with old systems',
            'Regulation and political conflict intensify',
            'The technology begins reshaping industries',
        ],
        typicalSignals: [
            'Market bubbles or crashes',
            'Institutional resistance',
            'Cultural backlash',
        ],
        example: {
            period: '2012–2015',
            events: [
                'Social media reshapes public life',
                'Crypto challenges established finance',
                'Digital platforms disrupt legacy institutions',
            ],
        },
    },
    {
        aspect: 'Opposition',
        degree: '180°',
        title: 'Global Transformation',
        whatHappens: [
            'The technological paradigm becomes dominant',
            'Society reorganizes around the new system',
            'Geopolitical competition emerges around it',
        ],
        typicalSignals: [
            'Mass adoption',
            'Global infrastructure built',
            'Economic leadership shifts',
        ],
        example: {
            period: '~2046',
            events: [
                'Full expression of the cycle’s technological paradigm',
                'Global systems reorganize around its infrastructure',
                'Geopolitical competition centers on technological power',
            ],
        },
    },
    {
        aspect: 'Waning Square',
        degree: '270°',
        title: 'Structural Strain',
        whatHappens: [
            'The system begins showing limits',
            'Institutions struggle to manage consequences',
            'New tensions appear inside the paradigm',
        ],
        typicalSignals: [
            'Regulation',
            'Inequality or power concentration',
            'Public distrust',
        ],
        example: {
            period: '~2073',
            events: [
                'AI governance conflicts',
                'Technology monopolies',
                'Digital sovereignty battles',
            ],
        },
    },
    {
        aspect: 'Waning Sextile',
        degree: '300°',
        title: 'Preparation for Next Paradigm',
        whatHappens: [
            'Experimentation begins with the next technological wave',
            'Existing system stabilizes but stops evolving',
        ],
        typicalSignals: [
            'New research breakthroughs',
            'Emerging technologies not yet dominant',
            'Early generational shifts',
        ],
        example: {
            period: '~2083',
            events: [
                'Post-AI paradigm emerges',
                'New scientific foundations',
                'Next-generation infrastructure',
            ],
        },
    },
    {
        aspect: 'Next Conjunction',
        degree: '360°',
        title: 'Paradigm Reset',
        whatHappens: [
            'Old technological order breaks down',
            'New system replaces it',
            'Cycle restarts',
        ],
        typicalSignals: [
            'System collapse',
            'Revolutionary transformation',
            'New era begins',
        ],
        example: {
            period: '~2104',
            events: [
                'Unknown paradigm shift',
                'Complete system transformation',
                'New cycle begins',
            ],
        },
    },
];

export const HISTORICAL_CONJUNCTIONS = [
    {
        year: '1850s',
        theme: 'Industrial Revolution peak',
        impact: 'Factory systems, labor movements',
    },
    {
        year: '1965-66',
        theme: 'Counterculture revolution',
        impact: 'Civil rights, computing begins',
    },
];

export const PREVIOUS_CYCLE = {
    period: '1850–1966',
    summary: 'Industrial Revolution, World Wars & Technological Acceleration',
    events: [
        'Industrial production, railways, and telegraph networks expanded across continents',
        'Nation-states and mass political movements consolidated while older imperial orders came under pressure',
        'Electrification, automobiles, aviation, and broadcasting transformed infrastructure and everyday life',
        'Two world wars dismantled empires and accelerated computing, rocketry, and nuclear technology',
    ],
};

export const WAXING_SQUARE_2012 = {
    years: '2012-2015',
    theme: 'Digital revolution crisis',
    impact: 'Social media, crypto, populism',
    note: 'Major square aspect (not conjunction)',
};

// Helper function to get current phase
export function getUranusPlutoCyclePhase(): string {
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < URANUS_PLUTO_MILESTONES.length - 1; i++) {
        const current = URANUS_PLUTO_MILESTONES[i];
        const next = URANUS_PLUTO_MILESTONES[i + 1];

        if (currentYear >= current.year && currentYear < next.year) {
            return `Post-${current.label}`;
        }
    }

    return 'Post-Conjunction';
}

// Helper function to get current interval
export function getCurrentInterval(): { previous: CycleMilestone; next: CycleMilestone } | null {
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < URANUS_PLUTO_MILESTONES.length - 1; i++) {
        const current = URANUS_PLUTO_MILESTONES[i];
        const next = URANUS_PLUTO_MILESTONES[i + 1];

        if (currentYear >= current.year && currentYear < next.year) {
            return { previous: current, next };
        }
    }

    return null;
}

// Helper function to calculate years into cycle
export function getUranusPlutoYearsIntoCycle(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - URANUS_PLUTO_MILESTONES[0].year;
}
