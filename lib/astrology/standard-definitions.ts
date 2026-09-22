// Standard astrological definitions that can be reused across the app

// Standard house definitions
export const HOUSE_DEFINITIONS: Record<number, string[]> = {
    1: ['Personal identity and self-image', 'Physical appearance and first impressions', 'Personal initiative and leadership style', 'How you present yourself to the world', 'Your basic approach to life'],
    2: ['Money, possessions, and material resources', 'Self-worth and personal values', 'Earning capacity and financial security', 'Talents and natural abilities', 'What you value and find meaningful'],
    3: ['Communication and self-expression', 'Learning and information processing', 'Siblings and local community', 'Short trips and daily movement', 'Mental agility and curiosity'],
    4: ['Family relationships and dynamics', 'Home environment and security', 'Emotional foundations and roots', 'Ancestral patterns and inheritance', 'Private life and inner sanctuary'],
    5: ['Creative expression and artistic talents', 'Romance and love affairs', 'Children and relationship with youth', 'Play, recreation, and joy', 'Self-expression and personal creativity'],
    6: ['Daily work and labor', 'Systems, routines, habits', 'Health, illness, recovery', 'Skill mastery', 'Service, contribution, usefulness'],
    7: ['Partnerships and marriage', 'One-on-one relationships', 'Business partnerships and contracts', 'Open enemies and legal matters', 'Balance and cooperation'],
    8: ['Shared resources and joint finances', 'Intimate relationships and sexuality', 'Psychological depths and transformation', 'Death, rebirth, and regeneration', 'Hidden resources and occult knowledge'],
    9: ['Higher learning and philosophy', 'Spirituality and belief systems', 'Foreign travel and cultures', 'Teaching and publishing', 'Wisdom and meaning-making'],
    10: ['Career and professional reputation', 'Public image and social status', 'Authority and leadership roles', 'Life direction and achievements', 'Contribution to society'],
    11: ['Networks and collective endeavors', 'Groups and organizations', 'Hopes, dreams, and future goals', 'Friendships and social networks', 'Community and humanitarian causes'],
    12: ['Spirituality and transcendence', 'Hidden enemies and self-undoing', 'Service and sacrifice', 'Subconscious patterns and karma', 'Retreat, solitude, and contemplation']
};

// House character descriptions - unique to each house
export const HOUSE_CHARACTERS: Record<number, string> = {
    1: 'The house of self — your personal identity and how you approach life.',
    2: 'The house of resources — what you value and how you build security.',
    3: 'The house of communication — how you think, learn, and connect.',
    4: 'The house of roots — your emotional foundation and family heritage.',
    5: 'The house of creativity — self-expression, romance, and joy.',
    6: 'It\'s not glamorous — it\'s infrastructure.',
    7: 'The house of partnership — how you relate one-on-one.',
    8: 'The house of entanglement — shared resources, intimacy, dependency, and what binds you deeply to others.',
    9: 'The house of meaning — belief, higher learning, distant horizons, and the search for a larger worldview.',
    10: 'The house of achievement — your career and public reputation.',
    11: 'The house of community — friendships and collective dreams.',
    12: 'The house of the unseen — the unconscious, solitude, surrender, spirituality, and what lies beyond ordinary awareness.',
};

// Short house names for titles
export const HOUSE_NAMES: Record<number, string> = {
    1: 'Identity & Self',
    2: 'Resources & Values',
    3: 'Communication & information',
    4: 'Home & Family',
    5: 'Creativity & Romance',
    6: 'Work & Health',
    7: 'Partnerships & Relationships',
    8: 'Shared Resources & Intimacy',
    9: 'Beliefs & Higher Learning',
    10: 'Career & Public Life',
    11: 'Networks & Collective',
    12: 'Inner World & Transcendence',
};

// Standard planet definitions with specific explanatory text
export const PLANET_DEFINITIONS: Record<string, { areas: string[]; character: string }> = {
    'Sun': {
        areas: ['Core identity and ego', 'Life purpose and vitality', 'Creative self-expression', 'Leadership and authority', 'Conscious will and intention'],
        character: 'The Sun illuminates and energizes — it brings consciousness and vitality to everything it touches.'
    },
    'Moon': {
        areas: ['Emotions and instincts', 'Subconscious patterns and habits', 'Nurturing and security needs', 'Intuition and psychic sensitivity', 'Past and family influences'],
        character: 'The Moon reflects and responds — it governs our emotional reactions and instinctive patterns.'
    },
    'Mercury': {
        areas: ['Communication and thinking', 'Learning and information processing', 'Mental agility and curiosity', 'Short trips and daily interactions', 'Adaptability and versatility'],
        character: 'Mercury connects and communicates — it facilitates the exchange of information and ideas.'
    },
    'Venus': {
        areas: ['Love and relationships', 'Beauty and artistic appreciation', 'Values and what you attract', 'Harmony and cooperation', 'Pleasure and enjoyment'],
        character: 'Venus attracts and harmonizes — it draws together what is beautiful, valuable, and pleasurable.'
    },
    'Mars': {
        areas: ['Action and initiative', 'Desire and passion', 'Courage and assertiveness', 'Physical energy and drive', 'Competition and conflict'],
        character: 'Mars initiates and conquers — it provides the drive and courage to take action and overcome obstacles.'
    },
    'Jupiter': {
        areas: ['Growth and expansion', 'Wisdom and understanding', 'Optimism and opportunity', 'Higher learning and philosophy', 'Abundance and generosity'],
        character: 'Jupiter expands and elevates — it seeks growth, meaning, and higher understanding.'
    },
    'Saturn': {
        areas: ['Structure and limitations', 'Discipline and responsibility', 'Time and maturity', 'Lessons through challenge', 'Building lasting foundations'],
        character: 'Saturn structures and tests — it builds lasting foundations through discipline and perseverance.'
    },
    'Uranus': {
        areas: [
            'Disruption and sudden change',
            'Innovation and breakthroughs',
            'Freedom and independence',
            'Originality and experimentation',
            'Breaking established patterns'
        ],
        character:
            'Uranus disrupts and awakens — it breaks established patterns through sudden change, opening space for innovation, freedom, and new forms.'
    },
    'Neptune': {
        areas: [
            'Idealization and longing',
            'Dissolution of boundaries',
            'Dreams and imagination',
            'Spirituality and transcendence',
            'Inspiration, projection, and illusion'
        ],
        character:
            'Neptune idealizes and dissolves — it draws us toward an imagined ideal while softening the boundaries between what is, what is desired, and what is possible.'
    },
    'Pluto': {
        areas: [
            'Transformation and regeneration',
            'Power and control',
            'Compulsion and intensity',
            'Crisis and confrontation',
            'Irreversible change'
        ],
        character:
            'Pluto transforms and intensifies — it exposes underlying power dynamics and drives deep, often irreversible change through breakdown and regeneration.'
    },
};

// Helper functions to get standard definitions
export function getHouseDefinition(houseNumber: number): string[] | null {
    return HOUSE_DEFINITIONS[houseNumber] || null;
}

export function getHouseCharacter(houseNumber: number): string | null {
    return HOUSE_CHARACTERS[houseNumber] || null;
}

export function getHouseName(houseNumber: number): string | null {
    return HOUSE_NAMES[houseNumber] || null;
}

export function getPlanetDefinition(planetName: string): { areas: string[]; character: string } | null {
    return PLANET_DEFINITIONS[planetName] || null;
}

// Helper function to extract house number from cycle title
export function extractHouseNumber(title: string): number | null {
    const houseMatch = title.match(/(\d+)(?:st|nd|rd|th)\s+House/);
    return houseMatch ? parseInt(houseMatch[1]) : null;
}

// Helper function to extract planet name from cycle title
export function extractPlanetName(title: string): string | null {
    const planetMatch = title.match(/^(Sun|Moon|Mercury|Venus|Mars|Jupiter|Saturn|Uranus|Neptune|Pluto)\s+/);
    return planetMatch ? planetMatch[1] : null;
}