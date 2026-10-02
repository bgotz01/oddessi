// Standard astrological definitions that can be reused across the app

// House definitions live in house-categories.ts — titles, essence, the
// external / internal pair and core themes — so there is one table to edit.

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