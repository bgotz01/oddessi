// lib/astrology/macro/neptune-cycles-data.ts

export type NeptuneCycleData = {
    sign: string;
    symbol: string;
    timeframe: string;
    isCurrent: boolean;
    domain: string;
    dominantMyth: string[];
    boundaryBeingDissolved: string[];
    capitalPattern: string[];
    politicalExpression: string[];
    culturalTone: string[];
    distortionRisk: string[];
    historicalParallel: {
        previousOccurrence: string;
        historicalThemes: string[];
    };
    archetypalPattern: string[];
};

export const NEPTUNE_CYCLES: NeptuneCycleData[] = [
    {
        sign: 'Aries',
        symbol: '♈',
        timeframe: 'Jan 26, 2026 – 2039',
        isCurrent: true,
        domain: 'Identity layer (self, belief, action)',
        dominantMyth: [
            'Identity is sacred',
            'Belief must be defended',
            'Action validates truth',
            'Purpose justifies risk',
            'Conflict clarifies meaning',
        ],
        boundaryBeingDissolved: [
            'Line between belief and aggression',
            'Distinction between ideology and policy',
            'Separation of individual identity from political identity',
            'Gap between narrative and mobilization',
        ],
        capitalPattern: [
            'Defense & security narratives',
            'Sovereign industrial policy',
            'Mission-driven valuation premiums',
            'Capital mobilized around identity blocks',
        ],
        politicalExpression: [
            'Ideological polarization',
            'National identity consolidation',
            'Policy framed as moral necessity',
            'Expansion of strategic state intervention',
            'Increased geopolitical tension',
        ],
        culturalTone: [
            'Assertiveness & confrontation',
            'Hero narratives',
            'Tribal alignment',
            'Movement-based identity',
            'Rapid collective mobilization',
        ],
        distortionRisk: [
            'Overinvestment in conflict-driven sectors',
            'Ideological bubbles',
            'Escalatory geopolitical miscalculation',
            'Policy justified by belief over data',
            'Conflict shock as volatility trigger',
        ],
        historicalParallel: {
            previousOccurrence: '1862–1875',
            historicalThemes: [
                'US Civil War climax & Reconstruction',
                'National identity solidification',
                'Industrial acceleration',
                'Militarization & state expansion',
                'Rise of modern nation-states',
            ],
        },
        archetypalPattern: [
            'Belief turns into action',
            'Ideology becomes militant',
            'Nation-state reasserts power',
            'Structural reordering after conflict',
        ],
    },
    {
        sign: 'Pisces',
        symbol: '♓',
        timeframe: '2011–2025',
        isCurrent: false,
        domain: 'Boundary layer (reality, constraint, truth)',
        dominantMyth: [
            'Infinite liquidity has no consequence',
            'Digital life is more real than physical life',
            'Narrative can create value',
            'Boundaries (money, identity, truth) are fluid',
        ],
        boundaryBeingDissolved: [
            'Constraint in financial systems',
            'Distinction between story and fundamentals',
            'Line between physical and digital reality',
            'Shared agreement on objective truth',
        ],
        capitalPattern: [
            'Crypto & tokenized assets',
            'Narrative-driven IPOs',
            'Risk perception anesthetized',
            'Belief reinforcing price',
        ],
        politicalExpression: [
            'Technocratic crisis management',
            'Monetary stimulus normalization',
            'Policy via liquidity injection',
            'Information fragmentation',
            'Institutional trust erosion',
        ],
        culturalTone: [
            'Escapism & digital immersion',
            'Algorithm-driven identity formation',
            'Viral meme cycles',
            'Influencer economy dominance',
            'Emotional volatility amplified online',
        ],
        distortionRisk: [
            'Asset bubbles detached from earnings',
            'Narrative-first ventures lacking substance',
            'Fraud in opaque digital markets',
            'Information warfare',
            'Collapse triggered by liquidity tightening',
        ],
        historicalParallel: {
            previousOccurrence: '1848–1862',
            historicalThemes: [
                'Spiritualist movements surge',
                'Civil War buildup in the US',
                'Opium trade & imperial fog politics',
                'Romantic nationalism',
                'Expansion of speculative rail finance',
            ],
        },
        archetypalPattern: [
            'Ideals overtake institutions',
            'Emotional mass movements rise',
            'Financial speculation detaches from hard constraint',
            'Identity tensions intensify beneath the surface',
        ],
    },
    {
        sign: 'Aquarius',
        symbol: '♒',
        timeframe: '1998–2011',
        isCurrent: false,
        domain: 'Network layer (connection, collective, systems)',
        dominantMyth: [
            'The Internet will liberate humanity',
            'Networks are superior to institutions',
            'Information wants to be free',
            'Collective intelligence replaces hierarchy',
            'Technology creates global unity',
        ],
        boundaryBeingDissolved: [
            'National borders in information flow',
            'Gatekeepers of media',
            'Institutional control of communication',
            'Physical community vs digital community',
        ],
        capitalPattern: [
            'Dot-com equities',
            'Telecom infrastructure buildout',
            'Network effects priced as destiny',
            'Speculative internet IPOs',
        ],
        politicalExpression: [
            'Rise of globalism',
            'WTO expansion era',
            'EU integration acceleration',
            'Internet governance debates',
            'Early cyber policy frameworks',
        ],
        culturalTone: [
            'Digital optimism',
            'Open-source idealism',
            'Online identity experimentation',
            'Peer-to-peer collaboration',
            'Early social networking',
        ],
        distortionRisk: [
            'Dot-com bubble',
            'Telecom overbuild',
            'Fraudulent internet ventures',
            'Overconfidence in deregulated finance',
            '2008 financial system fragility',
        ],
        historicalParallel: {
            previousOccurrence: '1834–1848',
            historicalThemes: [
                'Telegraph revolution (new communication network)',
                'Railway expansion (infrastructure mania)',
                'Rise of mass political movements',
                '1848 Revolutions across Europe',
                'Early industrial capitalism acceleration',
            ],
        },
        archetypalPattern: [
            'Networks disrupt hierarchy',
            'Communication tech reshapes power',
            'Collective idealism rises',
            'Ends in systemic stress',
        ],
    },
];
