// Planetary Return Interpretations - Legacy format (not yet updated to new field structure)
import { LifeCycleInterpretation } from './life-cycles';

// Legacy interface for backward compatibility with old interpretations
interface LegacyLifeCycleInterpretation {
    title: string;
    description?: string;
    keyThemes?: string[];
    opportunities?: string[];
    challenges?: string[];
    guidance?: string[];
    spiritualSignificance?: string;
    practicalManifestations?: string[];
}

export const PLANETARY_RETURN_INTERPRETATIONS: Record<string, LegacyLifeCycleInterpretation> = {
    'Saturn-Return': {
        title: 'Saturn Return: Life Mastery Initiation',
        description: 'The most significant astrological milestone, occurring around ages 29 and 58. This cycle represents a complete life restructuring where you must take full responsibility for your choices and build authentic foundations for your future.',
        keyThemes: ['Life Mastery', 'Responsibility', 'Authentic Foundation', 'Maturity', 'Life Direction'],
        opportunities: [
            'Establish your authentic life path and career direction',
            'Build lasting foundations for long-term success',
            'Develop genuine self-confidence and personal authority',
            'Create meaningful relationships based on mutual respect',
            'Become a responsible, contributing member of society'
        ],
        challenges: [
            'Major life crises that force complete restructuring',
            'Increased responsibilities that feel overwhelming',
            'Need to let go of immature patterns and relationships',
            'Confronting fears about your capabilities and worth',
            'Pressure to make major life decisions'
        ],
        guidance: [
            'Embrace this as a sacred initiation into adulthood and mastery',
            'Take full responsibility for your choices and their consequences',
            'Build foundations based on your authentic values and purpose',
            'Seek mentorship from those who embody mature wisdom',
            'Be patient with the slow but steady process of building your life'
        ],
        spiritualSignificance: 'This is the ultimate initiation into spiritual maturity and authentic selfhood. You are learning to embody your highest potential and serve as a responsible steward of your gifts.',
        practicalManifestations: [
            'Major career decisions or professional direction changes',
            'Marriage, divorce, or significant relationship changes',
            'Geographic moves or major lifestyle adjustments',
            'Taking on significant responsibilities or leadership roles',
            'Health challenges that require lifestyle changes'
        ]
    },

    'Jupiter-Return': {
        title: 'Jupiter Return: Growth & Expansion Cycle',
        description: 'A cycle of growth, expansion, and new opportunities. This period brings optimism, adventure, and the chance to broaden your horizons through education, travel, or spiritual exploration.',
        keyThemes: ['Growth & Expansion', 'New Opportunities', 'Optimism', 'Adventure', 'Wisdom Seeking'],
        opportunities: [
            'Expand your horizons through education, travel, or new experiences',
            'Develop your philosophical and spiritual understanding',
            'Take advantage of new opportunities for growth and success',
            'Share your wisdom and knowledge with others through teaching',
            'Develop a more optimistic and abundant mindset'
        ],
        challenges: [
            'Overconfidence or unrealistic expectations',
            'Tendency to overextend yourself or take on too much',
            'Scattered energy and difficulty focusing on priorities',
            'Risk of becoming preachy or dogmatic about your beliefs',
            'Potential for excess in spending, eating, or other indulgences'
        ],
        guidance: [
            'Embrace opportunities for growth while maintaining practical wisdom',
            'Share your knowledge and enthusiasm in ways that inspire others',
            'Balance optimism with realistic planning and preparation',
            'Use this expansive energy to serve others and contribute to society',
            'Stay humble and continue learning even as you teach others'
        ],
        spiritualSignificance: 'This cycle expands your consciousness and connects you with higher wisdom, teaching you to share your gifts generously while remaining humble and teachable.',
        practicalManifestations: [
            'Educational opportunities, degrees, or specialized training',
            'International travel or cultural exchange experiences',
            'Teaching, publishing, or sharing knowledge with others',
            'Legal matters or involvement with foreign cultures',
            'Spiritual or philosophical studies and exploration'
        ]
    }
};