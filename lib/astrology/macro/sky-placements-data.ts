export interface SkyPlacementSection {
    label: string;
    items: string[];
}

export interface SkyPlacementMeaning {
    theme: string;
    overview: string;
    sections: SkyPlacementSection[];
}

interface PlanetMeaning {
    function: string;
    pace: string;
    signals: string[];
    risks: string[];
}

interface SignMeaning {
    field: string;
    emphasis: string[];
}

const PLANET_MEANINGS: Record<string, PlanetMeaning> = {
    Jupiter: {
        function: 'Expansion, confidence, opportunity, and the stories a culture uses to justify growth',
        pace: 'Jupiter takes about 12 years to orbit the zodiac and usually spends about a year in one sign.',
        signals: [
            'Where appetite, investment, and public optimism are increasing',
            'Which beliefs, institutions, or leaders are being granted more legitimacy',
            'Where abundance can become excess if expansion outruns judgment',
        ],
        risks: ['Overconfidence', 'Speculation', 'Promising more than can be sustained'],
    },
    Saturn: {
        function: 'Constraint, responsibility, standards, and the structures required to make something last',
        pace: 'Saturn takes about 29 years to orbit the zodiac and spends roughly two and a half years in one sign.',
        signals: [
            'Where limits are becoming impossible to ignore',
            'Which systems are being tested, regulated, professionalized, or rebuilt',
            'Where durable progress requires patience, accountability, and skill',
        ],
        risks: ['Rigidity', 'Fear-driven control', 'Treating delay as permanent defeat'],
    },
    Uranus: {
        function: 'Disruption, invention, liberation, and sudden changes in how systems connect and operate',
        pace: 'Uranus takes about 84 years to orbit the zodiac and stays in one sign for roughly seven years.',
        signals: [
            'Where old assumptions are being broken by new tools or behavior',
            'Which networks are decentralizing, accelerating, or becoming unstable',
            'Where experimentation moves faster than institutions can adapt',
        ],
        risks: ['Volatility for its own sake', 'Technological solutionism', 'Fragmentation and nervous overload'],
    },
    Neptune: {
        function: 'Collective imagination, ideals, faith, media, and the boundaries between reality and projection',
        pace: 'Neptune takes about 165 years to orbit the zodiac and remains in one sign for around 14 years.',
        signals: [
            'Which myths and images are organizing collective desire',
            'Where boundaries are dissolving and previously separate things begin to blend',
            'Where inspiration and compassion coexist with confusion, imitation, or denial',
        ],
        risks: ['Mass projection', 'Ideological intoxication', 'Confusing a compelling story with evidence'],
    },
    Pluto: {
        function: 'Power, compulsion, elimination, and the deep transformation of systems that can no longer remain as they are',
        pace: 'Pluto takes about 248 years to orbit the zodiac; its irregular orbit makes each sign passage vary from roughly 12 to 31 years.',
        signals: [
            'Where power is concentrating, changing hands, or being exposed',
            'Which systems are entering irreversible breakdown and reconstruction',
            'Where buried costs, dependencies, and control mechanisms become visible',
        ],
        risks: ['Coercion', 'Purity politics', 'Replacing one hidden hierarchy with another'],
    },
};

const SIGN_MEANINGS: Record<string, SignMeaning> = {
    Aries: {
        field: 'identity, initiative, conflict, and the right to act',
        emphasis: ['Beginnings and first moves', 'Autonomy and leadership', 'Speed, courage, and confrontation'],
    },
    Taurus: {
        field: 'resources, value, material security, and the physical foundations of life',
        emphasis: ['Money, land, food, and energy', 'Stability and ownership', 'Embodied needs and durable value'],
    },
    Gemini: {
        field: 'information, language, learning, mobility, and exchange',
        emphasis: ['Media and communication', 'Education and cognition', 'Transport, trade, and distributed networks'],
    },
    Cancer: {
        field: 'home, belonging, ancestry, protection, and collective memory',
        emphasis: ['Housing and homeland', 'Care and dependency', 'Family systems and emotional security'],
    },
    Leo: {
        field: 'visibility, creativity, leadership, performance, and sovereign self-expression',
        emphasis: ['Public figures and spectacle', 'Creative production and play', 'Recognition, pride, and legitimacy'],
    },
    Virgo: {
        field: 'work, health, craft, maintenance, and the systems that make daily life function',
        emphasis: ['Labor and service', 'Standards and quality control', 'Health, logistics, and operational detail'],
    },
    Libra: {
        field: 'relationships, contracts, justice, diplomacy, and negotiated balance',
        emphasis: ['Alliances and agreements', 'Law and social norms', 'Reciprocity, aesthetics, and public consent'],
    },
    Scorpio: {
        field: 'shared capital, secrecy, leverage, intimacy, and irreversible change',
        emphasis: ['Debt, tax, insurance, and inheritance', 'Hidden power and investigation', 'Trust, risk, and entanglement'],
    },
    Sagittarius: {
        field: 'belief, higher learning, publishing, travel, and the expansion of horizons',
        emphasis: ['Ideology and religion', 'Universities, law, and publishing', 'Global movement and cultural exchange'],
    },
    Capricorn: {
        field: 'institutions, authority, hierarchy, achievement, and long-term consequence',
        emphasis: ['Government and corporate systems', 'Rules, status, and accountability', 'Infrastructure and strategic planning'],
    },
    Aquarius: {
        field: 'networks, technology, collective organization, and competing visions of the future',
        emphasis: ['Platforms and communities', 'Science and systems design', 'Freedom, coordination, and social engineering'],
    },
    Pisces: {
        field: 'imagination, spirituality, sacrifice, dissolution, and what escapes clear boundaries',
        emphasis: ['Images, music, and mass feeling', 'Compassion and collective grief', 'Escapism, ambiguity, and altered realities'],
    },
};

const CURRENT_PLACEMENTS: Record<string, SkyPlacementMeaning> = {
    'Jupiter:Leo': {
        theme: 'Expansion through visibility, creative confidence, and public leadership',
        overview: 'Jupiter magnifies whatever it touches. In Leo, collective appetite moves toward expression, spectacle, leadership, and the need to be seen. This can fund a creative renaissance and bolder public action; it can also inflate personality, prestige, and performance beyond substance.',
        sections: [
            {
                label: 'Collective movement',
                items: [
                    'Creative industries, entertainment, sport, and personality-led ventures attract more attention and capital',
                    'Leadership is judged through confidence, narrative power, and the ability to command an audience',
                    'People seek experiences that feel celebratory, generous, dramatic, and personally meaningful',
                ],
            },
            {
                label: 'Constructive expression',
                items: [
                    'Invest in creators, play, education, and work that restores courage',
                    'Let capable leaders be visible without confusing visibility with competence',
                    'Use optimism to enlarge participation rather than build a cult of personality',
                ],
            },
            {
                label: 'Distortion risk',
                items: ['Status bubbles and vanity spending', 'Overpromising by charismatic leaders', 'Spectacle crowding out quieter but necessary work'],
            },
        ],
    },
    'Saturn:Aries': {
        theme: 'The discipline of beginning: action meets consequence',
        overview: 'Saturn asks for structure and accountability; Aries wants immediate independent action. Together they test whether initiative can survive friction. The collective lesson is not simply to move faster, but to build forms of leadership, defense, entrepreneurship, and self-reliance that remain effective under pressure.',
        sections: [
            {
                label: 'Collective movement',
                items: [
                    'Leadership and executive authority face sharper tests of competence and legitimacy',
                    'New ventures encounter the cost, regulation, and operational discipline required to endure',
                    'Defense, sovereignty, and readiness become structural rather than rhetorical concerns',
                ],
            },
            {
                label: 'Constructive expression',
                items: [
                    'Replace impulsive action with trained initiative',
                    'Make responsibility explicit before a crisis assigns it by force',
                    'Build lean systems that can decide and act without becoming reckless',
                ],
            },
            {
                label: 'Distortion risk',
                items: ['Hardline authority presented as strength', 'Frustration turning into aggression', 'Premature action followed by punitive restriction'],
            },
        ],
    },
    'Uranus:Gemini': {
        theme: 'A revolution in language, intelligence, media, and movement',
        overview: 'Uranus destabilizes established systems and accelerates invention. In Gemini, the disruption runs through communication, education, transport, trade, and cognition itself. New interfaces and machine intelligence can radically widen access while also splintering attention and shared reality.',
        sections: [
            {
                label: 'Collective movement',
                items: [
                    'AI agents, translation, and new interfaces alter how knowledge is produced and exchanged',
                    'Education shifts from fixed curricula toward adaptive, networked, and continuous learning',
                    'Media and transport systems become faster, more distributed, and harder to govern centrally',
                ],
            },
            {
                label: 'Constructive expression',
                items: [
                    'Design open information systems that preserve provenance and context',
                    'Teach discernment and synthesis alongside access to more information',
                    'Use new mobility and communication tools to connect neglected people and places',
                ],
            },
            {
                label: 'Distortion risk',
                items: ['Information shock and chronic distraction', 'Synthetic media overwhelming verification', 'Fragmented networks losing a common language'],
            },
        ],
    },
    'Neptune:Aries': {
        theme: 'Belief becomes identity, image becomes action',
        overview: 'Neptune dissolves boundaries and organizes collective longing; Aries turns experience into identity and action. This passage makes ideals more mobilizing and personal. It can revive courage, spiritual agency, and imaginative leadership, while making it harder to separate conviction from projection or mission from aggression.',
        sections: [
            {
                label: 'Collective movement',
                items: [
                    'Political, spiritual, and cultural identities become more emotionally charged and action-oriented',
                    'Hero narratives and movement leaders carry outsized symbolic power',
                    'Images, myths, and synthetic media can move groups directly from feeling to action',
                ],
            },
            {
                label: 'Constructive expression',
                items: [
                    'Give ideals a practical form without demanding ideological purity',
                    'Channel collective feeling into service, art, and courageous repair',
                    'Create a pause between compelling imagery and irreversible action',
                ],
            },
            {
                label: 'Distortion risk',
                items: ['Militant idealism', 'Identity built around enemies', 'Confusing emotional certainty with truth'],
            },
        ],
    },
    'Pluto:Aquarius': {
        theme: 'Power is being rebuilt through networks, technology, and collective systems',
        overview: 'Pluto exposes and transforms the machinery of power. In Aquarius, that machinery is social and technical: platforms, protocols, communities, infrastructure, and the systems that decide who belongs. The passage can redistribute agency at scale, but decentralized language can conceal new concentrations of control.',
        sections: [
            {
                label: 'Collective movement',
                items: [
                    'AI, compute, energy, identity, and communications infrastructure become direct sources of political power',
                    'Legacy institutions compete with platforms, networks, and new forms of collective coordination',
                    'Governance increasingly turns on access, verification, standards, and control of technical rails',
                ],
            },
            {
                label: 'Constructive expression',
                items: [
                    'Make critical systems legible, contestable, and accountable to the people inside them',
                    'Distribute capability as well as rhetoric about decentralization',
                    'Build institutions able to govern technological power without freezing innovation',
                ],
            },
            {
                label: 'Distortion risk',
                items: ['Technocratic or algorithmic authoritarianism', 'Mass exclusion through invisible system rules', 'Network oligarchies presenting themselves as public infrastructure'],
            },
        ],
    },
};

export function getSkyPlacementMeaning(planet: string, sign: string): SkyPlacementMeaning {
    const specific = CURRENT_PLACEMENTS[`${planet}:${sign}`];
    if (specific) return specific;

    const planetMeaning = PLANET_MEANINGS[planet];
    const signMeaning = SIGN_MEANINGS[sign];

    if (!planetMeaning || !signMeaning) {
        return {
            theme: `${planet} in ${sign}`,
            overview: 'A collective placement in the current macro sky.',
            sections: [],
        };
    }

    return {
        theme: `${planetMeaning.function} — expressed through ${signMeaning.field}`,
        overview: `${planetMeaning.pace} Its current sign shows the collective field in which that planetary function is most visible now. This is a shared background condition, not a personal transit interpretation.`,
        sections: [
            { label: `What ${planet} tracks`, items: planetMeaning.signals },
            { label: `What ${sign} emphasizes`, items: signMeaning.emphasis },
            { label: 'Distortion risk', items: planetMeaning.risks },
        ],
    };
}
