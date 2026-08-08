// Aspect Cycle Interpretations - Legacy format (not yet updated to new field structure)
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

export const ASPECT_CYCLE_INTERPRETATIONS: Record<string, LegacyLifeCycleInterpretation> = {
    // SATURN ASPECTS
    'Saturn-Conjunction-Sun': {
        title: 'Saturn Conjunct Sun: Life Restructuring Cycle',
        description: 'A major life restructuring period where you rebuild your identity, purpose, and life direction from the ground up. This cycle demands maturity, responsibility, and authentic self-expression.',
        keyThemes: ['Identity Restructuring', 'Life Purpose', 'Maturity', 'Authority', 'Authentic Self'],
        opportunities: [
            'Discover and embody your authentic life purpose',
            'Develop real confidence based on genuine accomplishments',
            'Build lasting foundations for your future success',
            'Become a respected authority in your chosen field',
            'Create a legacy that reflects your deepest values'
        ],
        challenges: [
            'Major life crises that force complete restructuring',
            'Increased responsibilities and pressure to perform',
            'Need to let go of immature patterns and relationships',
            'Potential isolation while rebuilding your life',
            'Confronting fears about your capabilities and worth'
        ],
        guidance: [
            'Embrace this as a sacred initiation into your authentic power',
            'Take on challenges that build real confidence and competence',
            'Focus on long-term goals rather than quick fixes',
            'Seek mentorship from those who embody mature leadership',
            'Be patient with the slow but steady process of transformation'
        ],
        spiritualSignificance: 'This is a soul-level initiation into authentic selfhood and personal mastery. You are learning to embody your highest potential with integrity and wisdom.',
        practicalManifestations: [
            'Career changes or new professional direction',
            'Major life decisions about relationships, location, or lifestyle',
            'Taking on leadership roles or increased responsibility',
            'Ending relationships or situations that no longer serve growth',
            'Physical or health challenges that require lifestyle changes'
        ]
    },

    'Saturn-Square-Moon': {
        title: 'Saturn Square Moon: Emotional Maturity Challenge',
        description: 'A challenging but ultimately rewarding cycle that tests and strengthens your emotional foundations, family relationships, and sense of security. This period demands emotional maturity and the creation of authentic security.',
        keyThemes: ['Emotional Maturity', 'Family Responsibility', 'Security Building', 'Inner Strength', 'Emotional Boundaries'],
        opportunities: [
            'Develop genuine emotional maturity and inner strength',
            'Create authentic security that doesn\'t depend on others',
            'Heal family patterns and improve relationships',
            'Build emotional boundaries while maintaining compassion',
            'Become a source of stability and wisdom for others'
        ],
        challenges: [
            'Emotional depression or feelings of being burdened',
            'Family responsibilities that feel overwhelming',
            'Confronting childhood wounds and family patterns',
            'Difficulty balancing emotional needs with responsibilities',
            'Tendency toward pessimism or emotional withdrawal'
        ],
        guidance: [
            'Accept family responsibilities as opportunities for growth',
            'Create healthy boundaries that protect your emotional well-being',
            'Seek therapy or counseling to work through deep emotional patterns',
            'Build inner security through spiritual practice and self-care',
            'Remember that emotional maturity is a gradual, lifelong process'
        ],
        spiritualSignificance: 'This cycle teaches you to find emotional security within yourself and to become a source of stability and wisdom for others through your own healing journey.',
        practicalManifestations: [
            'Caring for aging parents or family members',
            'Family crises that require your emotional leadership',
            'Therapy or counseling to address deep emotional patterns',
            'Changes in living situation or family dynamics',
            'Taking on roles that require emotional maturity and stability'
        ]
    },

    // URANUS ASPECTS
    'Uranus-Conjunction-Sun': {
        title: 'Uranus Conjunct Sun: Personal Revolution',
        description: 'A revolutionary awakening to your authentic self and unique purpose. This cycle brings sudden insights, liberation from limiting patterns, and the courage to express your true individuality.',
        keyThemes: ['Personal Revolution', 'Authentic Self', 'Liberation', 'Innovation', 'Individuality'],
        opportunities: [
            'Discover and express your unique gifts and talents',
            'Break free from limiting beliefs and social expectations',
            'Innovate new approaches to life and work',
            'Attract like-minded, progressive people into your life',
            'Become a catalyst for positive change in your community'
        ],
        challenges: [
            'Sudden, disruptive changes that feel overwhelming',
            'Resistance from others to your authentic self-expression',
            'Impulsive decisions that may have long-term consequences',
            'Feeling like an outsider or misunderstood',
            'Nervous energy and restlessness'
        ],
        guidance: [
            'Embrace change as a pathway to your authentic self',
            'Channel revolutionary energy into constructive innovation',
            'Stay grounded while exploring new aspects of your identity',
            'Be patient with others who may not understand your changes',
            'Use your uniqueness to inspire and help others'
        ],
        spiritualSignificance: 'This is a spiritual awakening to your true nature and unique purpose. You are being called to embody your highest, most authentic self and serve as a catalyst for collective evolution.',
        practicalManifestations: [
            'Dramatic changes in career, lifestyle, or personal presentation',
            'Sudden insights or breakthrough moments about your purpose',
            'New friendships with progressive, like-minded individuals',
            'Involvement in innovative projects or social causes',
            'Technology or social media playing a key role in your self-expression'
        ]
    },

    // NEPTUNE ASPECTS
    'Neptune-Conjunction-Moon': {
        title: 'Neptune Conjunct Moon: Psychic Awakening & Emotional Transcendence',
        description: 'A profound spiritual awakening that opens your psychic abilities and dissolves emotional boundaries. This cycle brings increased sensitivity, intuition, and connection to the divine feminine.',
        keyThemes: ['Psychic Awakening', 'Emotional Transcendence', 'Spiritual Sensitivity', 'Divine Feminine', 'Compassion'],
        opportunities: [
            'Develop profound psychic and intuitive abilities',
            'Experience deep spiritual connection and transcendence',
            'Heal emotional wounds through spiritual understanding',
            'Become a channel for healing and compassionate service',
            'Access deep wisdom through dreams and meditation'
        ],
        challenges: [
            'Overwhelming emotional sensitivity and psychic experiences',
            'Confusion about reality and spiritual experiences',
            'Tendency toward escapism or avoiding difficult emotions',
            'Difficulty maintaining emotional boundaries',
            'Susceptibility to deception or self-delusion'
        ],
        guidance: [
            'Develop strong spiritual practices to ground your sensitivity',
            'Seek guidance from experienced spiritual teachers',
            'Use creative expression to channel spiritual insights',
            'Maintain healthy boundaries while remaining compassionate',
            'Trust your intuition while maintaining practical discernment'
        ],
        spiritualSignificance: 'This cycle opens you to the divine feminine and teaches you to embody unconditional love and compassion while maintaining your spiritual boundaries.',
        practicalManifestations: [
            'Increased involvement in spiritual or healing practices',
            'Psychic experiences, prophetic dreams, or spiritual visions',
            'Changes in family relationships through spiritual understanding',
            'Artistic or creative expression of spiritual insights',
            'Caring for others through healing or compassionate service'
        ]
    },

    // PLUTO ASPECTS
    'Pluto-Square-Sun': {
        title: 'Pluto Square Sun: Power & Identity Transformation',
        description: 'An intense transformational cycle that completely reconstructs your identity, personal power, and life direction. This period involves the death of old self-concepts and the birth of your authentic power.',
        keyThemes: ['Power Transformation', 'Identity Reconstruction', 'Authentic Power', 'Shadow Integration', 'Rebirth'],
        opportunities: [
            'Discover and embody your authentic personal power',
            'Transform limiting beliefs about your capabilities',
            'Integrate shadow aspects of your personality',
            'Become a powerful agent of transformation for others',
            'Develop unshakeable inner strength and resilience'
        ],
        challenges: [
            'Intense psychological crises and identity dissolution',
            'Power struggles with authority figures or institutions',
            'Confronting deep fears about your power and capabilities',
            'Feeling overwhelmed by the intensity of transformation',
            'Tendency toward obsession or compulsive behavior'
        ],
        guidance: [
            'Embrace transformation as a pathway to authentic power',
            'Seek professional help for deep psychological work',
            'Use your experiences to help others through similar challenges',
            'Face your deepest fears with courage and wisdom',
            'Remember that true power serves love and healing'
        ],
        spiritualSignificance: 'This cycle initiates you into authentic personal power and teaches you to use your influence for healing, transformation, and service to the collective good.',
        practicalManifestations: [
            'Major career changes or shifts in life direction',
            'Intensive therapy or psychological healing work',
            'Power struggles in relationships or professional settings',
            'Involvement in transformational work or healing professions',
            'Research into psychology, transformation, or occult subjects'
        ]
    },

    'Saturn-Opposition-Sun': {
        title: 'Saturn Opposition Sun: Life Review & Maturity Test',
        description: 'A major life review period occurring around age 44, where you evaluate your progress and make necessary adjustments to align with your authentic purpose. This cycle tests the foundations you\'ve built.',
        keyThemes: ['Life Review', 'Maturity Test', 'Foundation Evaluation', 'Course Correction', 'Authentic Purpose'],
        opportunities: [
            'Evaluate your life progress with wisdom and objectivity',
            'Make necessary course corrections to align with your purpose',
            'Develop mature perspective on your achievements and failures',
            'Build stronger foundations based on authentic values',
            'Become a mentor or guide for others on similar journeys'
        ],
        challenges: [
            'Confronting the gap between your dreams and reality',
            'Feeling pressure to make major life changes',
            'Dealing with authority figures or institutional challenges',
            'Balancing personal needs with external responsibilities',
            'Fear that you\'ve wasted time or made wrong choices'
        ],
        guidance: [
            'Use this period for honest self-evaluation and course correction',
            'Focus on building authentic foundations rather than external success',
            'Seek wisdom from mentors who have navigated similar challenges',
            'Make gradual, sustainable changes rather than dramatic upheavals',
            'Remember that it\'s never too late to align with your authentic purpose'
        ],
        spiritualSignificance: 'This cycle teaches you to evaluate your life through the lens of spiritual purpose and to make adjustments that align with your soul\'s true calling.',
        practicalManifestations: [
            'Mid-life career changes or professional reevaluation',
            'Relationship changes that reflect your evolved values',
            'Health challenges that require lifestyle adjustments',
            'Financial planning and long-term security considerations',
            'Involvement in mentoring or teaching roles'
        ]
    },

    'Uranus-Square-Sun': {
        title: 'Uranus Square Sun: Mid-Life Awakening & Freedom',
        description: 'A revolutionary awakening period occurring around ages 21 and 42, bringing sudden insights about your authentic self and the courage to break free from limiting patterns and expectations.',
        keyThemes: ['Mid-Life Awakening', 'Personal Freedom', 'Authentic Expression', 'Revolutionary Change', 'Independence'],
        opportunities: [
            'Break free from limiting patterns and social expectations',
            'Discover and express your unique gifts and talents',
            'Create a more authentic and fulfilling life path',
            'Inspire others through your courage to be different',
            'Innovate new approaches to work, relationships, and lifestyle'
        ],
        challenges: [
            'Sudden urges to make dramatic life changes',
            'Conflicts with authority figures or traditional expectations',
            'Feeling restless and dissatisfied with current circumstances',
            'Impulsive decisions that may disrupt stability',
            'Resistance from others to your changing identity'
        ],
        guidance: [
            'Channel revolutionary energy into constructive change',
            'Make gradual adjustments rather than sudden dramatic shifts',
            'Seek balance between freedom and responsibility',
            'Use your awakening to inspire positive change in others',
            'Stay grounded while exploring new aspects of your identity'
        ],
        spiritualSignificance: 'This cycle awakens you to your authentic self and unique purpose, calling you to break free from limiting patterns and express your true individuality.',
        practicalManifestations: [
            'Career changes toward more innovative or unconventional fields',
            'Relationship changes that reflect your evolved identity',
            'Sudden moves, travel, or changes in living situation',
            'New hobbies or interests that express your authentic self',
            'Involvement in progressive causes or social movements'
        ]
    },

    'Neptune-Square-Sun': {
        title: 'Neptune Square Sun: Spiritual Crisis & Dissolution',
        description: 'A profound spiritual crisis that dissolves ego illusions and opens you to higher consciousness. This challenging but ultimately transformative cycle brings confusion followed by spiritual clarity.',
        keyThemes: ['Spiritual Crisis', 'Ego Dissolution', 'Higher Consciousness', 'Spiritual Clarity', 'Transcendence'],
        opportunities: [
            'Dissolve ego illusions and connect with higher consciousness',
            'Develop profound spiritual understanding and compassion',
            'Access creative and artistic inspiration from divine sources',
            'Heal through spiritual practices and transcendent experiences',
            'Become a channel for spiritual wisdom and healing'
        ],
        challenges: [
            'Confusion about identity, purpose, and life direction',
            'Disillusionment with previous goals and achievements',
            'Tendency toward escapism or avoiding reality',
            'Susceptibility to deception or spiritual delusion',
            'Feeling lost or disconnected from practical life'
        ],
        guidance: [
            'Embrace the dissolution as a pathway to spiritual rebirth',
            'Seek guidance from experienced spiritual teachers',
            'Use creative expression to channel spiritual insights',
            'Maintain practical grounding while exploring spiritual realms',
            'Trust the process of spiritual transformation'
        ],
        spiritualSignificance: 'This cycle dissolves the false ego to reveal your true spiritual nature, teaching you to embody divine love and compassion in human form.',
        practicalManifestations: [
            'Career changes toward spiritual, artistic, or healing professions',
            'Increased involvement in spiritual practices or communities',
            'Creative or artistic projects inspired by spiritual insights',
            'Health challenges that lead to spiritual awakening',
            'Service work or charitable involvement'
        ]
    }
};