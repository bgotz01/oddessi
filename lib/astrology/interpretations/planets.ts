import { Planet, ZodiacSign } from '@/types/astrology';

export interface PlanetInfo {
    name: string;
    symbol: string;
    keywords: string[];
    overview: string;
    detailedDescription: string;
    rulerOf: ZodiacSign[];
    exaltedIn?: ZodiacSign;
    detrimentIn?: ZodiacSign[];
    fallIn?: ZodiacSign;
    element: 'Fire' | 'Earth' | 'Air' | 'Water' | 'Transcendental';
    modality: 'Personal' | 'Social' | 'Transpersonal';
    orbitPeriod: string;
    influences: string[];
}

export interface PlanetSignInterpretation {
    meaning: string;
    shortDescription: string;
    detailedDescription: string;
    keywords: string[];
    strengths: string[];
    challenges: string[];
    lifeAreas: string[];
    expression: {
        positive: string[];
        negative: string[];
    };
}

export const PLANET_INFO: Record<Planet, PlanetInfo> = {
    [Planet.Sun]: {
        name: 'Sun',
        symbol: '☉',
        keywords: ['Identity', 'Ego', 'Vitality', 'Purpose', 'Leadership', 'Creativity'],
        overview: 'The Sun represents your core identity, ego, and life purpose. It shows how you express your individuality and what drives your sense of self.',
        detailedDescription: 'The Sun is the center of our solar system and represents the center of your personality. It governs your conscious mind, your will to live, and your creative life force. The Sun shows your basic personality traits, your ego, and how you want to be seen by others. It represents your father, authority figures, and your relationship with power and leadership. The Sun\'s placement reveals your life purpose, your natural talents, and the qualities you need to develop to feel fulfilled.',
        rulerOf: [ZodiacSign.Leo],
        exaltedIn: ZodiacSign.Aries,
        detrimentIn: [ZodiacSign.Aquarius],
        fallIn: ZodiacSign.Libra,
        element: 'Fire',
        modality: 'Personal',
        orbitPeriod: '1 year',
        influences: ['Identity', 'Ego', 'Vitality', 'Leadership', 'Creativity', 'Authority', 'Father figures', 'Life purpose']
    },
    [Planet.Moon]: {
        name: 'Moon',
        symbol: '☽',
        keywords: ['Emotions', 'Intuition', 'Nurturing', 'Security', 'Memory', 'Habits'],
        overview: 'The Moon represents your emotional nature, instincts, and subconscious patterns. It shows how you process feelings and what makes you feel secure.',
        detailedDescription: 'The Moon governs your emotional life, instincts, and subconscious mind. It represents your inner child, your need for security, and how you nurture yourself and others. The Moon shows your automatic responses, habits, and what you need to feel emotionally fulfilled. It rules your relationship with your mother, women in general, and your domestic life. The Moon\'s cycles affect your moods and energy levels, and its placement reveals your deepest emotional needs and how you seek comfort.',
        rulerOf: [ZodiacSign.Cancer],
        exaltedIn: ZodiacSign.Taurus,
        detrimentIn: [ZodiacSign.Capricorn],
        fallIn: ZodiacSign.Scorpio,
        element: 'Water',
        modality: 'Personal',
        orbitPeriod: '28 days',
        influences: ['Emotions', 'Intuition', 'Subconscious', 'Nurturing', 'Security', 'Mother figures', 'Home', 'Habits']
    },
    [Planet.Mercury]: {
        name: 'Mercury',
        symbol: '☿',
        keywords: ['Communication', 'Thinking', 'Learning', 'Logic', 'Information', 'Travel'],
        overview: 'Mercury represents your mind, communication style, and how you process and share information. It governs thinking, learning, and all forms of communication.',
        detailedDescription: 'Mercury is the messenger of the gods and rules all forms of communication, thinking, and information exchange. It governs your intellectual processes, learning style, and how you express your thoughts. Mercury influences your curiosity, adaptability, and ability to connect ideas. It rules short trips, siblings, neighbors, and your immediate environment. Mercury\'s placement shows how you think, learn, communicate, and process information. It also influences your sense of humor, wit, and ability to multitask.',
        rulerOf: [ZodiacSign.Gemini, ZodiacSign.Virgo],
        exaltedIn: ZodiacSign.Virgo,
        detrimentIn: [ZodiacSign.Sagittarius, ZodiacSign.Pisces],
        fallIn: ZodiacSign.Pisces,
        element: 'Air',
        modality: 'Personal',
        orbitPeriod: '88 days',
        influences: ['Communication', 'Thinking', 'Learning', 'Writing', 'Speaking', 'Siblings', 'Short travel', 'Technology']
    },
    [Planet.Venus]: {
        name: 'Venus',
        symbol: '♀',
        keywords: ['Love', 'Beauty', 'Harmony', 'Values', 'Pleasure', 'Relationships'],
        overview: 'Venus represents love, beauty, and what you value. It shows how you express affection, your aesthetic sense, and what brings you pleasure.',
        detailedDescription: 'Venus is the goddess of love and beauty, governing your capacity for love, attraction, and aesthetic appreciation. It shows what you find beautiful, how you express affection, and what you value in relationships. Venus influences your social skills, charm, and ability to create harmony. It rules money, possessions, and material pleasures, as well as artistic talents and creative expression. Venus\'s placement reveals your love style, what attracts you to others, and how you seek pleasure and comfort in life.',
        rulerOf: [ZodiacSign.Taurus, ZodiacSign.Libra],
        exaltedIn: ZodiacSign.Pisces,
        detrimentIn: [ZodiacSign.Scorpio, ZodiacSign.Aries],
        fallIn: ZodiacSign.Virgo,
        element: 'Earth',
        modality: 'Personal',
        orbitPeriod: '225 days',
        influences: ['Love', 'Relationships', 'Beauty', 'Art', 'Money', 'Values', 'Pleasure', 'Social skills']
    },
    [Planet.Mars]: {
        name: 'Mars',
        symbol: '♂',
        keywords: ['Action', 'Energy', 'Desire', 'Courage', 'Competition', 'Anger'],
        overview: 'Mars represents your drive, ambition, and how you take action. It shows your energy, courage, and how you assert yourself.',
        detailedDescription: 'Mars is the warrior planet, governing your drive, ambition, and physical energy. It shows how you take action, assert yourself, and pursue your desires. Mars influences your courage, competitiveness, and ability to fight for what you want. It rules anger, passion, and sexual energy, as well as your capacity for leadership and initiative. Mars\'s placement reveals your motivation style, how you handle conflict, and what energizes you to take action.',
        rulerOf: [ZodiacSign.Aries, ZodiacSign.Scorpio],
        exaltedIn: ZodiacSign.Capricorn,
        detrimentIn: [ZodiacSign.Libra, ZodiacSign.Taurus],
        fallIn: ZodiacSign.Cancer,
        element: 'Fire',
        modality: 'Personal',
        orbitPeriod: '687 days',
        influences: ['Action', 'Energy', 'Desire', 'Courage', 'Competition', 'Sexuality', 'Anger', 'Initiative']
    },
    [Planet.Jupiter]: {
        name: 'Jupiter',
        symbol: '♃',
        keywords: ['Expansion', 'Wisdom', 'Growth', 'Optimism', 'Philosophy', 'Luck'],
        overview: 'Jupiter represents growth, expansion, and wisdom. It shows how you seek meaning, your beliefs, and where you find opportunities for growth.',
        detailedDescription: 'Jupiter is the great benefic, the planet of expansion, growth, and good fortune. It governs your philosophy, beliefs, and quest for meaning. Jupiter influences your optimism, generosity, and ability to see the bigger picture. It rules higher education, foreign cultures, religion, and long-distance travel. Jupiter\'s placement shows where you\'re likely to experience growth, abundance, and good luck, as well as your capacity for wisdom and understanding.',
        rulerOf: [ZodiacSign.Sagittarius, ZodiacSign.Pisces],
        exaltedIn: ZodiacSign.Cancer,
        detrimentIn: [ZodiacSign.Gemini, ZodiacSign.Virgo],
        fallIn: ZodiacSign.Capricorn,
        element: 'Fire',
        modality: 'Social',
        orbitPeriod: '12 years',
        influences: ['Growth', 'Expansion', 'Wisdom', 'Philosophy', 'Religion', 'Higher education', 'Foreign cultures', 'Luck']
    },
    [Planet.Saturn]: {
        name: 'Saturn',
        symbol: '♄',
        keywords: ['Discipline', 'Structure', 'Responsibility', 'Limitations', 'Lessons', 'Authority'],
        overview: 'Saturn represents discipline, structure, and life lessons. It shows where you face challenges and need to develop maturity and responsibility.',
        detailedDescription: 'Saturn is the great teacher, the planet of discipline, structure, and hard-earned wisdom. It governs your sense of responsibility, your relationship with authority, and the lessons you must learn in life. Saturn influences your capacity for hard work, patience, and building lasting structures. It rules time, aging, and the process of maturation. Saturn\'s placement shows where you face your greatest challenges and where you must develop discipline and perseverance to achieve mastery.',
        rulerOf: [ZodiacSign.Capricorn, ZodiacSign.Aquarius],
        exaltedIn: ZodiacSign.Libra,
        detrimentIn: [ZodiacSign.Cancer, ZodiacSign.Leo],
        fallIn: ZodiacSign.Aries,
        element: 'Earth',
        modality: 'Social',
        orbitPeriod: '29 years',
        influences: ['Discipline', 'Structure', 'Responsibility', 'Authority', 'Time', 'Limitations', 'Lessons', 'Maturity']
    },
    [Planet.Uranus]: {
        name: 'Uranus',
        symbol: '♅',
        keywords: ['Innovation', 'Revolution', 'Independence', 'Originality', 'Technology', 'Change'],
        overview: 'Uranus represents innovation, rebellion, and sudden change. It shows where you seek freedom and express your unique individuality.',
        detailedDescription: 'Uranus is the revolutionary, the planet of sudden change, innovation, and liberation. It governs your need for freedom, your originality, and your capacity for invention. Uranus influences your relationship with technology, your humanitarian instincts, and your ability to break free from convention. It rules electricity, computers, and all forms of modern technology. Uranus\'s placement shows where you\'re likely to experience sudden changes and where you express your most unique and innovative qualities.',
        rulerOf: [ZodiacSign.Aquarius],
        exaltedIn: ZodiacSign.Scorpio,
        detrimentIn: [ZodiacSign.Leo],
        fallIn: ZodiacSign.Taurus,
        element: 'Air',
        modality: 'Transpersonal',
        orbitPeriod: '84 years',
        influences: ['Innovation', 'Revolution', 'Technology', 'Freedom', 'Originality', 'Humanitarian causes', 'Sudden change', 'Independence']
    },
    [Planet.Neptune]: {
        name: 'Neptune',
        symbol: '♆',
        keywords: ['Spirituality', 'Imagination', 'Illusion', 'Compassion', 'Dreams', 'Transcendence'],
        overview: 'Neptune represents spirituality, imagination, and transcendence. It shows your connection to the divine and your capacity for compassion and creativity.',
        detailedDescription: 'Neptune is the mystic, the planet of spirituality, imagination, and transcendence. It governs your connection to the divine, your psychic abilities, and your capacity for unconditional love. Neptune influences your dreams, fantasies, and artistic inspiration, as well as your susceptibility to illusion and deception. It rules the ocean, music, film, and all forms of artistic expression. Neptune\'s placement shows where you seek spiritual connection and where you may experience confusion or enlightenment.',
        rulerOf: [ZodiacSign.Pisces],
        exaltedIn: ZodiacSign.Cancer,
        detrimentIn: [ZodiacSign.Virgo],
        fallIn: ZodiacSign.Capricorn,
        element: 'Water',
        modality: 'Transpersonal',
        orbitPeriod: '165 years',
        influences: ['Spirituality', 'Imagination', 'Dreams', 'Compassion', 'Art', 'Music', 'Illusion', 'Transcendence']
    },
    [Planet.Pluto]: {
        name: 'Pluto',
        symbol: '♇',
        keywords: ['Transformation', 'Power', 'Regeneration', 'Death/Rebirth', 'Intensity', 'Hidden'],
        overview: 'Pluto represents transformation, power, and regeneration. It shows where you experience deep change and uncover hidden truths.',
        detailedDescription: 'Pluto is the transformer, the planet of death and rebirth, representing the cycle of destruction and regeneration. It governs your capacity for deep transformation, your relationship with power, and your ability to uncover hidden truths. Pluto influences your psychological depths, your capacity for healing, and your ability to survive and thrive through crisis. It rules the underworld, psychology, and all forms of investigation. Pluto\'s placement shows where you experience your most profound transformations and where you must confront your shadow.',
        rulerOf: [ZodiacSign.Scorpio],
        exaltedIn: ZodiacSign.Leo,
        detrimentIn: [ZodiacSign.Taurus],
        fallIn: ZodiacSign.Aquarius,
        element: 'Water',
        modality: 'Transpersonal',
        orbitPeriod: '248 years',
        influences: ['Transformation', 'Power', 'Psychology', 'Hidden truths', 'Regeneration', 'Crisis', 'Healing', 'Intensity']
    },
    [Planet.NorthNode]: {
        name: 'North Node',
        symbol: '☊',
        keywords: ['Destiny', 'Growth', 'Future', 'Lessons', 'Evolution', 'Purpose'],
        overview: 'The North Node represents your soul\'s purpose and the qualities you\'re developing in this lifetime.',
        detailedDescription: 'The North Node represents your karmic path and the qualities you\'re meant to develop in this lifetime. It shows the direction of your soul\'s growth and the lessons you\'re here to learn. The North Node indicates new experiences, challenges that will help you evolve, and the qualities you need to cultivate for spiritual growth. It represents your future potential and the path toward fulfilling your destiny.',
        rulerOf: [],
        element: 'Transcendental',
        modality: 'Transpersonal',
        orbitPeriod: '18.6 years',
        influences: ['Soul purpose', 'Karmic lessons', 'Future growth', 'Destiny', 'Evolution', 'New experiences', 'Spiritual development']
    },
    [Planet.SouthNode]: {
        name: 'South Node',
        symbol: '☋',
        keywords: ['Past', 'Talents', 'Karma', 'Comfort zone', 'Gifts', 'Release'],
        overview: 'The South Node represents your past-life talents and the qualities you\'re moving away from in this lifetime.',
        detailedDescription: 'The South Node represents your karmic past and the qualities you bring from previous lifetimes. It shows your natural talents, comfort zone, and the patterns you need to release or transform. The South Node indicates what comes easily to you but may no longer serve your growth. It represents gifts from the past that should be used in service of your North Node development.',
        rulerOf: [],
        element: 'Transcendental',
        modality: 'Transpersonal',
        orbitPeriod: '18.6 years',
        influences: ['Past-life talents', 'Karmic patterns', 'Comfort zone', 'Natural gifts', 'What to release', 'Previous experience']
    },
    [Planet.Chiron]: {
        name: 'Chiron',
        symbol: '⚷',
        keywords: ['Healing', 'Wounds', 'Teaching', 'Wisdom', 'Integration', 'Mentoring'],
        overview: 'Chiron represents your deepest wound and your greatest healing gift. It shows where you can help others through your own experience.',
        detailedDescription: 'Chiron is the wounded healer, representing your deepest wound and your capacity to heal others through your own experience of pain and recovery. It shows where you feel most vulnerable but also where you have the greatest wisdom to offer. Chiron influences your ability to integrate different aspects of yourself and to serve as a bridge between different worlds or perspectives. Its placement reveals your core wound and your potential to become a healer, teacher, or mentor.',
        rulerOf: [],
        element: 'Transcendental',
        modality: 'Transpersonal',
        orbitPeriod: '50 years',
        influences: ['Healing', 'Core wounds', 'Teaching', 'Mentoring', 'Integration', 'Wisdom through pain', 'Service to others']
    }
};

export const PLANET_SIGN_INTERPRETATIONS: Record<Planet, Partial<Record<ZodiacSign, PlanetSignInterpretation>>> = {
    [Planet.Sun]: {
        [ZodiacSign.Aries]: {
            meaning: 'Dynamic Leader',
            shortDescription: 'Natural leadership and pioneering spirit with high energy and competitive drive.',
            detailedDescription: 'With the Sun in Aries, you possess a natural leadership quality and pioneering spirit that drives you to be first in everything you do. Your core identity is tied to taking initiative, blazing new trails, and meeting challenges head-on. You have an abundance of energy and a competitive nature that thrives on action and achievement. Your approach to life is direct and straightforward, preferring to lead rather than follow. You\'re naturally courageous and willing to take risks that others might avoid.',
            keywords: ['Leadership', 'Initiative', 'Energy', 'Competition', 'Independence', 'Courage', 'Pioneering'],
            strengths: ['Natural leadership abilities', 'High energy and enthusiasm', 'Courage to take risks', 'Initiative and drive', 'Competitive spirit'],
            challenges: ['Impatience with others', 'Tendency to be impulsive', 'Difficulty with compromise', 'Can be overly aggressive', 'May lack follow-through'],
            lifeAreas: ['Leadership roles', 'Competitive sports', 'Entrepreneurship', 'Military or emergency services', 'Any pioneering field'],
            expression: {
                positive: ['Confident leadership', 'Inspiring others to action', 'Courageous decision-making', 'Energetic pursuit of goals'],
                negative: ['Impatient and demanding', 'Overly competitive', 'Impulsive actions', 'Difficulty with teamwork']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Steady Builder',
            shortDescription: 'Stable, patient, and determined with a focus on building lasting value and enjoying life\'s pleasures.',
            detailedDescription: 'With the Sun in Taurus, your identity is rooted in stability, comfort, and building lasting value. You approach life with patience and determination, preferring quality over quantity in all things. Your nature is steady and reliable, and you have a strong appreciation for beauty, comfort, and sensual pleasures. You\'re naturally practical and have excellent instincts for what will endure and appreciate in value over time. Your strength lies in your ability to persist and build something substantial.',
            keywords: ['Stability', 'Patience', 'Luxury', 'Determination', 'Sensuality', 'Reliability', 'Persistence'],
            strengths: ['Remarkable patience and persistence', 'Practical and reliable nature', 'Appreciation for beauty and quality', 'Strong sense of values', 'Ability to build lasting things'],
            challenges: ['Resistance to change', 'Can be overly stubborn', 'Tendency toward materialism', 'Slow to adapt', 'May become too comfortable'],
            lifeAreas: ['Finance and banking', 'Real estate', 'Art and design', 'Agriculture', 'Luxury goods', 'Construction'],
            expression: {
                positive: ['Steady progress toward goals', 'Creating beautiful environments', 'Reliable and trustworthy', 'Practical wisdom'],
                negative: ['Stubborn resistance to change', 'Overly focused on material things', 'Slow to take action', 'Possessive tendencies']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Curious Communicator',
            shortDescription: 'Intellectually curious and adaptable with excellent communication skills and love of variety.',
            detailedDescription: 'With the Sun in Gemini, your core self is expressed through communication, learning, and mental agility. You\'re naturally curious about everything and everyone, with an insatiable appetite for information and new experiences. Your adaptability is one of your greatest strengths, allowing you to thrive in changing circumstances and connect with people from all walks of life. You have a youthful energy and a quick wit that makes you an engaging conversationalist.',
            keywords: ['Communication', 'Curiosity', 'Adaptability', 'Intelligence', 'Versatility', 'Wit', 'Learning'],
            strengths: ['Excellent communication skills', 'Quick learning ability', 'Adaptability to change', 'Intellectual curiosity', 'Social versatility'],
            challenges: ['Tendency to be scattered', 'Difficulty with commitment', 'Can be superficial', 'Restlessness', 'May lack focus'],
            lifeAreas: ['Media and journalism', 'Education', 'Sales and marketing', 'Writing and publishing', 'Technology', 'Transportation'],
            expression: {
                positive: ['Engaging communication', 'Quick problem-solving', 'Connecting diverse people', 'Sharing knowledge'],
                negative: ['Scattered attention', 'Inconsistent follow-through', 'Gossipy tendencies', 'Nervous energy']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Nurturing Protector',
            shortDescription: 'Deeply intuitive and caring with strong family bonds and emotional sensitivity.',
            detailedDescription: 'With the Sun in Cancer, your identity is rooted in nurturing, protecting, and creating emotional security for yourself and others. You have a natural ability to sense the emotional undercurrents in any situation and respond with compassion and care. Your home and family are central to your sense of self, and you have an instinctive understanding of what others need to feel safe and loved. You possess a rich inner life and strong connection to your past and traditions.',
            keywords: ['Nurturing', 'Intuitive', 'Protective', 'Emotional', 'Family-oriented', 'Caring', 'Traditional'],
            strengths: ['Deep emotional intelligence', 'Natural nurturing abilities', 'Strong intuition', 'Loyalty and devotion', 'Creating safe spaces'],
            challenges: ['Overly sensitive to criticism', 'Tendency to be moody', 'Difficulty letting go', 'Can be overly protective', 'May retreat when hurt'],
            lifeAreas: ['Childcare and education', 'Healthcare and healing', 'Real estate and hospitality', 'Food and nutrition', 'Family counseling'],
            expression: {
                positive: ['Compassionate caregiving', 'Emotional support for others', 'Creating nurturing environments', 'Intuitive guidance'],
                negative: ['Emotional manipulation', 'Clinging behavior', 'Mood swings', 'Passive-aggressive responses']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Radiant Creator',
            shortDescription: 'Confident and generous with natural leadership abilities and a flair for dramatic self-expression.',
            detailedDescription: 'With the Sun in Leo, your identity shines through creative self-expression, leadership, and generous warmth. You have a natural magnetism that draws others to you, and you thrive when you can inspire and entertain. Your confidence and enthusiasm are infectious, and you have an innate understanding of how to make others feel special and appreciated. You need recognition and appreciation for your unique talents and contributions.',
            keywords: ['Confident', 'Creative', 'Generous', 'Dramatic', 'Leadership', 'Warm', 'Expressive'],
            strengths: ['Natural charisma and magnetism', 'Creative talents', 'Generous and warm-hearted', 'Strong leadership abilities', 'Inspiring presence'],
            challenges: ['Need for constant attention', 'Pride and ego sensitivity', 'Can be overly dramatic', 'Difficulty sharing spotlight', 'May become arrogant'],
            lifeAreas: ['Entertainment and performing arts', 'Leadership and management', 'Creative industries', 'Education and mentoring', 'Public speaking'],
            expression: {
                positive: ['Inspiring leadership', 'Creative self-expression', 'Generous encouragement', 'Confident presentation'],
                negative: ['Attention-seeking behavior', 'Domineering attitude', 'Wounded pride', 'Dramatic overreactions']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Practical Perfectionist',
            shortDescription: 'Detail-oriented and service-minded with analytical abilities and desire for improvement.',
            detailedDescription: 'With the Sun in Virgo, your identity is expressed through service, analysis, and the pursuit of perfection. You have an exceptional eye for detail and a natural ability to see how things can be improved or made more efficient. Your practical approach to life and genuine desire to help others makes you invaluable in any situation requiring precision and care. You find fulfillment in being useful and making a tangible difference.',
            keywords: ['Analytical', 'Practical', 'Service-oriented', 'Perfectionist', 'Helpful', 'Precise', 'Efficient'],
            strengths: ['Exceptional attention to detail', 'Strong analytical abilities', 'Reliable and dependable', 'Genuine desire to help', 'Practical problem-solving'],
            challenges: ['Tendency toward perfectionism', 'Overly critical of self and others', 'Worry and anxiety', 'Difficulty delegating', 'May neglect own needs'],
            lifeAreas: ['Healthcare and wellness', 'Research and analysis', 'Quality control', 'Administrative work', 'Environmental services'],
            expression: {
                positive: ['Helpful service to others', 'Precise and thorough work', 'Practical improvements', 'Reliable support'],
                negative: ['Harsh criticism', 'Perfectionist paralysis', 'Nitpicking behavior', 'Anxious overthinking']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Harmonious Diplomat',
            shortDescription: 'Balanced and charming with strong aesthetic sense and natural ability to create harmony.',
            detailedDescription: 'With the Sun in Libra, your identity is expressed through creating balance, beauty, and harmony in all areas of life. You have a natural diplomatic ability and can see multiple perspectives in any situation. Your charm and social grace make you naturally popular, and you have an innate understanding of fairness and justice. You thrive in partnerships and collaborative environments where you can create win-win solutions.',
            keywords: ['Balanced', 'Diplomatic', 'Charming', 'Aesthetic', 'Fair', 'Social', 'Harmonious'],
            strengths: ['Natural diplomacy and tact', 'Strong sense of fairness', 'Aesthetic appreciation', 'Social charm and grace', 'Ability to see all sides'],
            challenges: ['Difficulty making decisions', 'Tendency to avoid conflict', 'Can be indecisive', 'May compromise too much', 'Dependent on others\' approval'],
            lifeAreas: ['Law and mediation', 'Arts and design', 'Public relations', 'Counseling and therapy', 'Fashion and beauty'],
            expression: {
                positive: ['Creating harmony and balance', 'Fair and just decisions', 'Beautiful environments', 'Diplomatic solutions'],
                negative: ['Indecisiveness and procrastination', 'Conflict avoidance', 'People-pleasing', 'Superficial charm']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Intense Transformer',
            shortDescription: 'Passionate and perceptive with deep emotional intensity and transformative power.',
            detailedDescription: 'With the Sun in Scorpio, your identity is forged through intensity, transformation, and the exploration of life\'s deeper mysteries. You have an exceptional ability to see beneath the surface and understand hidden motivations and truths. Your emotional depth and psychological insight make you a powerful force for transformation, both in your own life and in the lives of others. You\'re drawn to experiences that challenge and transform you.',
            keywords: ['Intense', 'Transformative', 'Passionate', 'Perceptive', 'Mysterious', 'Powerful', 'Deep'],
            strengths: ['Deep psychological insight', 'Transformative power', 'Emotional resilience', 'Ability to see hidden truths', 'Passionate commitment'],
            challenges: ['Tendency toward obsession', 'Difficulty trusting others', 'Can be secretive', 'Intense emotional reactions', 'May hold grudges'],
            lifeAreas: ['Psychology and therapy', 'Investigation and research', 'Healing and transformation', 'Finance and investments', 'Crisis management'],
            expression: {
                positive: ['Deep healing and transformation', 'Uncovering hidden truths', 'Passionate dedication', 'Emotional depth'],
                negative: ['Obsessive behavior', 'Manipulative tendencies', 'Vengeful actions', 'Secretive nature']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Adventurous Philosopher',
            shortDescription: 'Optimistic and freedom-loving with philosophical nature and desire for expansion.',
            detailedDescription: 'With the Sun in Sagittarius, your identity is expressed through exploration, learning, and the pursuit of truth and meaning. You have an insatiable curiosity about the world and different cultures, philosophies, and belief systems. Your optimistic outlook and adventurous spirit inspire others to expand their horizons. You need freedom to explore and grow, and you naturally share your discoveries with enthusiasm and humor.',
            keywords: ['Adventurous', 'Philosophical', 'Optimistic', 'Freedom-loving', 'Honest', 'Expansive', 'Enthusiastic'],
            strengths: ['Natural optimism and enthusiasm', 'Love of learning and growth', 'Honest and straightforward', 'Adventurous spirit', 'Philosophical wisdom'],
            challenges: ['Tendency to be restless', 'Can be tactlessly honest', 'Difficulty with commitment', 'May be irresponsible', 'Impatience with details'],
            lifeAreas: ['Education and teaching', 'Travel and tourism', 'Publishing and media', 'Philosophy and religion', 'International business'],
            expression: {
                positive: ['Inspiring others to grow', 'Sharing wisdom and knowledge', 'Adventurous exploration', 'Honest communication'],
                negative: ['Restless wandering', 'Tactless honesty', 'Irresponsible behavior', 'Dogmatic beliefs']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Ambitious Achiever',
            shortDescription: 'Disciplined and goal-oriented with strong sense of responsibility and desire for success.',
            detailedDescription: 'With the Sun in Capricorn, your identity is built through achievement, responsibility, and the steady climb toward your goals. You have exceptional discipline and the ability to work patiently toward long-term objectives. Your natural leadership abilities and practical wisdom make you someone others look to for guidance and stability. You understand that true success comes through persistent effort and taking responsibility.',
            keywords: ['Ambitious', 'Disciplined', 'Responsible', 'Practical', 'Authoritative', 'Patient', 'Goal-oriented'],
            strengths: ['Exceptional discipline and persistence', 'Natural leadership abilities', 'Strong sense of responsibility', 'Practical wisdom', 'Long-term vision'],
            challenges: ['Can be overly serious', 'Tendency toward pessimism', 'May neglect personal life', 'Difficulty relaxing', 'Can be controlling'],
            lifeAreas: ['Business and management', 'Government and politics', 'Finance and banking', 'Construction and engineering', 'Traditional institutions'],
            expression: {
                positive: ['Responsible leadership', 'Steady achievement', 'Practical solutions', 'Reliable guidance'],
                negative: ['Authoritarian control', 'Workaholic tendencies', 'Pessimistic outlook', 'Rigid thinking']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Innovative Humanitarian',
            shortDescription: 'Independent and progressive with humanitarian ideals and innovative thinking.',
            detailedDescription: 'With the Sun in Aquarius, your identity is expressed through innovation, humanitarian causes, and your unique perspective on life. You have a natural ability to see the bigger picture and envision a better future for humanity. Your independence and originality set you apart, and you\'re drawn to causes that promote equality, freedom, and progress. You value friendship and community while maintaining your individual uniqueness.',
            keywords: ['Independent', 'Innovative', 'Humanitarian', 'Progressive', 'Original', 'Friendly', 'Visionary'],
            strengths: ['Innovative and original thinking', 'Strong humanitarian values', 'Independent spirit', 'Friendly and sociable', 'Visionary perspective'],
            challenges: ['Can be emotionally detached', 'Tendency to be rebellious', 'May seem aloof', 'Difficulty with authority', 'Can be unpredictable'],
            lifeAreas: ['Technology and innovation', 'Social causes and activism', 'Science and research', 'Community organizations', 'Alternative healing'],
            expression: {
                positive: ['Innovative solutions', 'Humanitarian service', 'Progressive leadership', 'Friendly cooperation'],
                negative: ['Rebellious defiance', 'Emotional detachment', 'Unpredictable behavior', 'Stubborn independence']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Compassionate Dreamer',
            shortDescription: 'Intuitive and empathetic with artistic sensitivity and spiritual connection.',
            detailedDescription: 'With the Sun in Pisces, your identity flows through compassion, intuition, and creative imagination. You have an exceptional ability to understand and feel what others experience, making you naturally empathetic and healing. Your rich inner world and artistic sensitivity allow you to express beauty and meaning in unique ways. You\'re drawn to spiritual and transcendent experiences that connect you to something greater than yourself.',
            keywords: ['Compassionate', 'Intuitive', 'Artistic', 'Empathetic', 'Spiritual', 'Imaginative', 'Sensitive'],
            strengths: ['Deep empathy and compassion', 'Strong intuitive abilities', 'Artistic and creative talents', 'Spiritual sensitivity', 'Healing presence'],
            challenges: ['Overly sensitive to environment', 'Tendency to escape reality', 'Difficulty with boundaries', 'Can be overly emotional', 'May lack direction'],
            lifeAreas: ['Arts and creative expression', 'Healing and therapy', 'Spiritual and religious work', 'Charity and service', 'Film and photography'],
            expression: {
                positive: ['Compassionate service', 'Artistic creation', 'Intuitive guidance', 'Spiritual inspiration'],
                negative: ['Escapist behavior', 'Emotional overwhelm', 'Victim mentality', 'Boundary confusion']
            }
        }
    },
    [Planet.Moon]: {
        [ZodiacSign.Aries]: {
            meaning: 'Fiery Emotions',
            shortDescription: 'Quick, direct emotional responses with a need for independence and action.',
            detailedDescription: 'With the Moon in Aries, your emotional nature is quick, direct, and passionate. You feel things intensely and immediately, with little filter between your emotions and your reactions. You need independence and freedom to express your feelings, and you can become restless or irritable when constrained. Your emotional security comes from being able to take action and lead, and you may be impulsive when feeling threatened or excited.',
            keywords: ['Impulsive', 'Independent', 'Quick emotions', 'Direct', 'Passionate', 'Reactive', 'Energetic'],
            strengths: ['Emotional honesty', 'Quick recovery from setbacks', 'Passionate responses', 'Independent spirit', 'Courageous feelings'],
            challenges: ['Emotional impulsiveness', 'Impatience with others\' feelings', 'Tendency to anger quickly', 'Difficulty with emotional subtlety'],
            lifeAreas: ['Leadership in emotional situations', 'Crisis response', 'Competitive environments', 'Independent ventures'],
            expression: {
                positive: ['Honest emotional expression', 'Quick emotional healing', 'Inspiring others emotionally', 'Courageous in feelings'],
                negative: ['Emotional outbursts', 'Impatient with emotional process', 'Selfish emotional needs', 'Aggressive responses']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Steady Comfort',
            shortDescription: 'Stable, sensual emotions with need for security and physical comfort.',
            detailedDescription: 'With the Moon in Taurus, your emotional nature seeks stability, comfort, and sensual pleasure. You have a calm, steady approach to feelings and prefer emotional environments that are predictable and secure. Your emotional well-being is closely tied to physical comfort, beautiful surroundings, and material security. You process emotions slowly and thoroughly, and once you feel something, it tends to last.',
            keywords: ['Stable', 'Sensual', 'Comfort-seeking', 'Patient', 'Reliable', 'Practical', 'Persistent'],
            strengths: ['Emotional stability and reliability', 'Patience with emotional process', 'Ability to provide comfort', 'Practical emotional solutions', 'Loyal and devoted'],
            challenges: ['Resistance to emotional change', 'Can be emotionally stubborn', 'Tendency toward possessiveness', 'Difficulty expressing feelings', 'May hold onto grudges'],
            lifeAreas: ['Creating comfortable environments', 'Financial security', 'Cooking and hospitality', 'Art and beauty', 'Nature and gardening'],
            expression: {
                positive: ['Providing emotional stability', 'Creating comfort for others', 'Patient emotional support', 'Reliable presence'],
                negative: ['Emotional stubbornness', 'Possessive behavior', 'Resistance to change', 'Material dependency']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Curious Feelings',
            shortDescription: 'Changeable, communicative emotions with need for mental stimulation and variety.',
            detailedDescription: 'With the Moon in Gemini, your emotional nature is curious, adaptable, and constantly seeking new experiences. You process feelings through talking, thinking, and analyzing, and you need mental stimulation to feel emotionally satisfied. Your moods can change quickly, and you may experience multiple emotions simultaneously. You find emotional security through learning, communicating, and maintaining variety in your emotional life.',
            keywords: ['Curious', 'Changeable', 'Communicative', 'Adaptable', 'Intellectual', 'Restless', 'Versatile'],
            strengths: ['Emotional adaptability', 'Ability to communicate feelings', 'Quick emotional processing', 'Intellectual approach to emotions', 'Versatile emotional responses'],
            challenges: ['Emotional inconsistency', 'Tendency to intellectualize feelings', 'Difficulty with emotional depth', 'Restless emotional needs', 'May avoid intense emotions'],
            lifeAreas: ['Communication and media', 'Education and learning', 'Social networking', 'Writing and journalism', 'Travel and exploration'],
            expression: {
                positive: ['Articulating emotions clearly', 'Emotional flexibility', 'Connecting through communication', 'Learning from feelings'],
                negative: ['Emotional superficiality', 'Inconsistent feelings', 'Gossiping about emotions', 'Nervous emotional energy']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Deep Nurturing',
            shortDescription: 'Deeply intuitive and protective emotions with strong family bonds and memory.',
            detailedDescription: 'With the Moon in Cancer, your emotional nature is deeply intuitive, nurturing, and protective. You have an exceptional ability to sense the emotional needs of others and respond with care and compassion. Your emotions are closely tied to your past, family, and sense of belonging. You need emotional security and a safe haven to retreat to when the world feels overwhelming. Your memory for emotional experiences is particularly strong.',
            keywords: ['Nurturing', 'Intuitive', 'Protective', 'Family-oriented', 'Sensitive', 'Caring', 'Traditional'],
            strengths: ['Deep emotional intuition', 'Natural nurturing abilities', 'Strong emotional memory', 'Protective instincts', 'Ability to create emotional safety'],
            challenges: ['Overly sensitive to criticism', 'Tendency to be moody', 'Difficulty letting go of past hurts', 'Can be overly protective', 'May retreat when hurt'],
            lifeAreas: ['Family and home life', 'Childcare and nurturing', 'Emotional healing', 'Food and hospitality', 'Memory and history'],
            expression: {
                positive: ['Compassionate caregiving', 'Emotional protection', 'Intuitive understanding', 'Creating safe spaces'],
                negative: ['Emotional manipulation', 'Clinging behavior', 'Mood swings', 'Living in the past']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Dramatic Heart',
            shortDescription: 'Warm, generous emotions with a need for recognition and creative self-expression.',
            detailedDescription: 'With the Moon in Leo, your emotional nature is warm, generous, and naturally dramatic. You need to feel special and appreciated, and your emotional security comes from being recognized and admired by others. You express your feelings with flair and creativity, often turning emotional experiences into grand narratives. You have a natural ability to inspire and uplift others with your enthusiasm and warmth. Your inner child is strong and playful, and you need outlets for creative self-expression to feel emotionally fulfilled.',
            keywords: ['Dramatic', 'Generous', 'Creative', 'Warm', 'Proud', 'Playful', 'Expressive'],
            strengths: ['Natural warmth and generosity', 'Creative emotional expression', 'Ability to inspire others', 'Strong sense of loyalty', 'Playful and fun-loving nature'],
            challenges: ['Need for constant attention', 'Tendency toward emotional drama', 'Pride that can be easily wounded', 'Difficulty with criticism', 'Can be overly theatrical'],
            lifeAreas: ['Creative arts', 'Entertainment', 'Working with children', 'Leadership roles', 'Performance and presentation'],
            expression: {
                positive: ['Generous emotional giving', 'Creative self-expression', 'Inspiring leadership', 'Loyal and protective feelings'],
                negative: ['Attention-seeking behavior', 'Emotional melodrama', 'Wounded pride', 'Demanding recognition']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Analytical Care',
            shortDescription: 'Practical, service-oriented emotions with attention to detail and desire to help.',
            detailedDescription: 'With the Moon in Virgo, your emotional nature expresses itself through service, analysis, and practical care for others. You feel most emotionally secure when you can be useful and helpful, and you have a natural ability to see what needs to be improved or organized. Your emotions are processed through careful analysis, and you may worry about the details of emotional situations. You find emotional fulfillment through being of service and creating order.',
            keywords: ['Practical', 'Analytical', 'Service-oriented', 'Helpful', 'Organized', 'Careful', 'Modest'],
            strengths: ['Practical emotional solutions', 'Attention to emotional details', 'Genuine desire to help', 'Organized approach to feelings', 'Reliable emotional support'],
            challenges: ['Tendency to worry and analyze emotions', 'Overly critical of emotional responses', 'Difficulty expressing emotions directly', 'May neglect own emotional needs', 'Perfectionist about feelings'],
            lifeAreas: ['Healthcare and service', 'Organization and efficiency', 'Problem-solving', 'Quality improvement', 'Practical assistance'],
            expression: {
                positive: ['Helpful emotional service', 'Practical care for others', 'Organized emotional support', 'Thoughtful assistance'],
                negative: ['Emotional criticism', 'Worry and anxiety', 'Nitpicking feelings', 'Self-neglect']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Harmonious Balance',
            shortDescription: 'Diplomatic, relationship-focused emotions with need for harmony and partnership.',
            detailedDescription: 'With the Moon in Libra, your emotional nature seeks balance, harmony, and beautiful relationships. You feel most secure when your relationships are peaceful and when you can create harmony in your environment. Your emotions are strongly influenced by others, and you have a natural ability to see multiple perspectives in emotional situations. You need partnership and cooperation to feel emotionally fulfilled, and you may struggle with decisions that could upset the balance.',
            keywords: ['Harmonious', 'Diplomatic', 'Relationship-focused', 'Balanced', 'Cooperative', 'Aesthetic', 'Peace-loving'],
            strengths: ['Natural diplomacy in emotional situations', 'Ability to create harmony', 'Fair and balanced emotional responses', 'Cooperative spirit', 'Aesthetic emotional sensitivity'],
            challenges: ['Difficulty making emotional decisions', 'Tendency to avoid emotional conflict', 'Dependence on others for emotional security', 'May suppress own needs for harmony', 'Indecisiveness in relationships'],
            lifeAreas: ['Relationships and partnerships', 'Mediation and counseling', 'Arts and beauty', 'Social harmony', 'Diplomatic work'],
            expression: {
                positive: ['Creating emotional harmony', 'Fair emotional mediation', 'Cooperative relationships', 'Aesthetic emotional expression'],
                negative: ['Emotional indecision', 'Conflict avoidance', 'People-pleasing', 'Codependent behavior']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Intense Depths',
            shortDescription: 'Deep, transformative emotions with need for emotional truth and intimacy.',
            detailedDescription: 'With the Moon in Scorpio, your emotional nature runs exceptionally deep and intense. You experience emotions with great power and need to understand the hidden psychological motivations behind feelings. Your emotional security comes from deep, transformative connections and the ability to merge completely with trusted others. You have strong intuitive abilities and can sense emotional undercurrents that others miss. You need emotional authenticity and may be suspicious of superficial emotional expressions.',
            keywords: ['Intense', 'Deep', 'Transformative', 'Intuitive', 'Passionate', 'Secretive', 'Powerful'],
            strengths: ['Deep emotional insight', 'Transformative emotional healing', 'Strong intuitive abilities', 'Passionate emotional connections', 'Ability to handle emotional crises'],
            challenges: ['Tendency toward emotional obsession', 'Difficulty trusting emotionally', 'Can be emotionally manipulative', 'Intense emotional reactions', 'May hold emotional grudges'],
            lifeAreas: ['Psychology and therapy', 'Emotional healing', 'Investigation and research', 'Crisis counseling', 'Transformative work'],
            expression: {
                positive: ['Deep emotional healing', 'Transformative emotional insights', 'Passionate emotional connections', 'Intuitive emotional guidance'],
                negative: ['Emotional manipulation', 'Obsessive emotional behavior', 'Vengeful feelings', 'Emotional secrecy']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Adventurous Spirit',
            shortDescription: 'Optimistic, freedom-loving emotions with need for growth and exploration.',
            detailedDescription: 'With the Moon in Sagittarius, your emotional nature is optimistic, adventurous, and always seeking new horizons. You feel most secure when you have the freedom to explore, learn, and grow emotionally. Your emotions are buoyant and philosophical, and you tend to see the bigger picture in emotional situations. You need variety and adventure in your emotional life and may become restless if confined to routine emotional patterns. You process feelings through exploration and understanding.',
            keywords: ['Optimistic', 'Adventurous', 'Freedom-loving', 'Philosophical', 'Enthusiastic', 'Honest', 'Expansive'],
            strengths: ['Natural emotional optimism', 'Adventurous emotional spirit', 'Philosophical approach to feelings', 'Honest emotional expression', 'Ability to inspire emotional growth'],
            challenges: ['Tendency to avoid deep emotions', 'Restlessness in emotional situations', 'May be tactlessly honest about feelings', 'Difficulty with emotional commitment', 'Can be emotionally irresponsible'],
            lifeAreas: ['Travel and exploration', 'Education and teaching', 'Philosophy and religion', 'Adventure and sports', 'Cultural exchange'],
            expression: {
                positive: ['Inspiring emotional optimism', 'Adventurous emotional exploration', 'Honest emotional communication', 'Philosophical emotional wisdom'],
                negative: ['Emotional restlessness', 'Tactless emotional honesty', 'Avoidance of emotional depth', 'Irresponsible emotional behavior']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Controlled Ambition',
            shortDescription: 'Disciplined, goal-oriented emotions with need for structure and achievement.',
            detailedDescription: 'With the Moon in Capricorn, your emotional nature is disciplined, practical, and oriented toward achievement and security. You feel most emotionally secure when you have structure, goals, and a sense of accomplishment. Your emotions are controlled and may be expressed in practical ways rather than through direct emotional display. You have a strong need for respect and recognition, and your emotional well-being is tied to your sense of success and responsibility.',
            keywords: ['Disciplined', 'Practical', 'Ambitious', 'Controlled', 'Responsible', 'Traditional', 'Achievement-oriented'],
            strengths: ['Emotional self-discipline', 'Practical emotional solutions', 'Strong sense of emotional responsibility', 'Ability to achieve emotional goals', 'Reliable emotional presence'],
            challenges: ['Tendency to suppress emotions', 'Difficulty expressing vulnerability', 'May be emotionally rigid', 'Can be overly serious about feelings', 'Difficulty relaxing emotionally'],
            lifeAreas: ['Career and achievement', 'Traditional structures', 'Leadership and authority', 'Long-term planning', 'Practical accomplishments'],
            expression: {
                positive: ['Responsible emotional leadership', 'Practical emotional support', 'Disciplined emotional growth', 'Achievement-oriented feelings'],
                negative: ['Emotional suppression', 'Rigid emotional responses', 'Overly serious emotions', 'Controlling emotional behavior']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Detached Innovation',
            shortDescription: 'Independent, humanitarian emotions with need for freedom and unique expression.',
            detailedDescription: 'With the Moon in Aquarius, your emotional nature is independent, innovative, and somewhat detached from conventional emotional expressions. You feel most secure when you can maintain your emotional freedom and express your feelings in unique, unconventional ways. Your emotions are filtered through your intellect, and you may approach feelings from a humanitarian or universal perspective. You need space and independence in your emotional life and may rebel against traditional emotional expectations.',
            keywords: ['Independent', 'Innovative', 'Detached', 'Humanitarian', 'Unconventional', 'Intellectual', 'Freedom-loving'],
            strengths: ['Emotional independence', 'Innovative emotional solutions', 'Humanitarian emotional perspective', 'Intellectual approach to feelings', 'Unique emotional expression'],
            challenges: ['Tendency toward emotional detachment', 'Difficulty with emotional intimacy', 'May intellectualize feelings', 'Can be emotionally unpredictable', 'Resistance to emotional tradition'],
            lifeAreas: ['Humanitarian causes', 'Innovation and technology', 'Group dynamics', 'Social reform', 'Unconventional relationships'],
            expression: {
                positive: ['Innovative emotional solutions', 'Humanitarian emotional service', 'Independent emotional strength', 'Unique emotional perspective'],
                negative: ['Emotional detachment', 'Rebellious emotional behavior', 'Unpredictable feelings', 'Avoidance of emotional intimacy']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Compassionate Flow',
            shortDescription: 'Intuitive, empathetic emotions with deep sensitivity and spiritual connection.',
            detailedDescription: 'With the Moon in Pisces, your emotional nature is deeply intuitive, compassionate, and spiritually sensitive. You feel emotions not just from yourself but seem to absorb the feelings of everyone around you. Your emotional boundaries are fluid, and you have an exceptional ability to empathize and understand others\' emotional experiences. You need spiritual connection and creative expression to process your rich emotional life, and you may seek escape when emotions become overwhelming.',
            keywords: ['Intuitive', 'Empathetic', 'Compassionate', 'Sensitive', 'Spiritual', 'Imaginative', 'Fluid'],
            strengths: ['Deep emotional empathy', 'Strong intuitive abilities', 'Compassionate emotional responses', 'Spiritual emotional connection', 'Creative emotional expression'],
            challenges: ['Overly sensitive to emotional environment', 'Difficulty with emotional boundaries', 'Tendency to escape overwhelming emotions', 'May absorb others\' emotions', 'Can be emotionally confused'],
            lifeAreas: ['Spiritual and healing work', 'Creative and artistic expression', 'Compassionate service', 'Emotional counseling', 'Mystical and intuitive practices'],
            expression: {
                positive: ['Compassionate emotional healing', 'Intuitive emotional guidance', 'Creative emotional expression', 'Spiritual emotional connection'],
                negative: ['Emotional overwhelm', 'Boundary confusion', 'Escapist emotional behavior', 'Victim mentality']
            }
        }
    },
    [Planet.Mercury]: {
        [ZodiacSign.Aries]: {
            meaning: 'Quick Thinker',
            shortDescription: 'Fast, direct communication style with quick decision-making and pioneering ideas.',
            detailedDescription: 'With Mercury in Aries, your mind works at lightning speed, and you communicate with directness and enthusiasm. You think quickly and decisively, often coming up with innovative solutions and pioneering ideas. Your communication style is straightforward and energetic, and you prefer to get straight to the point rather than engage in lengthy discussions. You learn best through action and hands-on experience.',
            keywords: ['Quick', 'Direct', 'Decisive', 'Pioneering', 'Energetic', 'Impatient', 'Innovative'],
            strengths: ['Lightning-fast thinking', 'Direct communication', 'Quick decision-making', 'Innovative ideas', 'Enthusiastic expression'],
            challenges: ['Impatience with slow thinkers', 'Tendency to interrupt others', 'May speak before thinking', 'Difficulty with details', 'Can be argumentative'],
            lifeAreas: ['Leadership communication', 'Emergency response', 'Competitive debate', 'Innovation and startups', 'Sports commentary'],
            expression: {
                positive: ['Clear, direct communication', 'Quick problem-solving', 'Inspiring ideas', 'Decisive leadership'],
                negative: ['Impatient interrupting', 'Hasty decisions', 'Argumentative behavior', 'Overlooking details']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Steady Communicator',
            shortDescription: 'Practical, deliberate thinking with focus on concrete ideas and sensible communication.',
            detailedDescription: 'With Mercury in Taurus, your mind works methodically and practically, focusing on concrete, tangible ideas that have real-world application. You communicate in a steady, reliable manner and prefer to think things through thoroughly before speaking. Your learning style is hands-on and experiential, and you have excellent retention for practical information. You value common sense and prefer simple, straightforward explanations.',
            keywords: ['Practical', 'Steady', 'Methodical', 'Concrete', 'Reliable', 'Sensible', 'Patient'],
            strengths: ['Practical thinking', 'Reliable communication', 'Good memory for facts', 'Methodical approach', 'Common sense solutions'],
            challenges: ['Resistance to new ideas', 'Slow to process information', 'Can be mentally stubborn', 'Difficulty with abstract concepts', 'May be overly cautious'],
            lifeAreas: ['Business and finance', 'Agriculture and nature', 'Crafts and building', 'Food and cooking', 'Real estate'],
            expression: {
                positive: ['Practical advice', 'Reliable information', 'Steady communication', 'Sensible solutions'],
                negative: ['Mental stubbornness', 'Resistance to change', 'Overly cautious thinking', 'Slow responses']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Versatile Communicator',
            shortDescription: 'Quick, adaptable thinking with excellent communication skills and love of variety.',
            detailedDescription: 'With Mercury in Gemini, your mind is exceptionally quick, versatile, and curious about everything. You have natural communication abilities and can adapt your speaking style to any audience. Your thinking is flexible and multi-faceted, allowing you to see multiple perspectives simultaneously. You learn quickly and enjoy sharing information, making connections between diverse ideas and people.',
            keywords: ['Quick', 'Versatile', 'Curious', 'Adaptable', 'Communicative', 'Clever', 'Restless'],
            strengths: ['Exceptional communication skills', 'Quick learning ability', 'Mental flexibility', 'Networking abilities', 'Wit and humor'],
            challenges: ['Tendency to be scattered', 'Difficulty focusing deeply', 'May be superficial', 'Information overload', 'Restless mind'],
            lifeAreas: ['Media and journalism', 'Education and teaching', 'Sales and marketing', 'Writing and publishing', 'Social networking'],
            expression: {
                positive: ['Engaging conversation', 'Quick wit', 'Information sharing', 'Mental agility'],
                negative: ['Scattered thinking', 'Superficial knowledge', 'Gossipy tendencies', 'Mental restlessness']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Intuitive Communicator',
            shortDescription: 'Emotionally-based thinking with intuitive communication and memory for personal details.',
            detailedDescription: 'With Mercury in Cancer, your thinking is deeply influenced by emotions and intuition. You communicate with sensitivity and have an exceptional memory for personal details and emotional experiences. Your mind works through feeling and association rather than pure logic, and you have a natural ability to understand the emotional subtext in communication. You learn best in supportive, nurturing environments.',
            keywords: ['Intuitive', 'Emotional', 'Sensitive', 'Nurturing', 'Protective', 'Memory-focused', 'Subjective'],
            strengths: ['Strong emotional intelligence', 'Excellent memory for personal details', 'Intuitive understanding', 'Nurturing communication', 'Protective instincts'],
            challenges: ['Overly subjective thinking', 'Difficulty with criticism', 'Tendency to take things personally', 'Moody communication', 'May avoid difficult topics'],
            lifeAreas: ['Counseling and therapy', 'Family and childcare', 'History and genealogy', 'Food and hospitality', 'Emotional support'],
            expression: {
                positive: ['Empathetic communication', 'Intuitive insights', 'Nurturing advice', 'Emotional understanding'],
                negative: ['Subjective bias', 'Emotional reactivity', 'Defensive communication', 'Moody responses']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Dramatic Communicator',
            shortDescription: 'Creative, confident thinking with flair for dramatic expression and leadership communication.',
            detailedDescription: 'With Mercury in Leo, your mind is creative, confident, and naturally dramatic in expression. You communicate with warmth, enthusiasm, and natural authority that draws others\' attention. Your thinking is big-picture oriented and creative, and you have a talent for making even mundane topics interesting and engaging. You learn best when you can be actively involved and when the subject matter captures your imagination.',
            keywords: ['Creative', 'Confident', 'Dramatic', 'Enthusiastic', 'Authoritative', 'Generous', 'Expressive'],
            strengths: ['Natural leadership communication', 'Creative thinking', 'Confident expression', 'Inspiring speech', 'Generous sharing of ideas'],
            challenges: ['Need for attention when speaking', 'Can be overly dramatic', 'May dominate conversations', 'Pride in ideas', 'Difficulty with criticism'],
            lifeAreas: ['Entertainment and performance', 'Leadership and management', 'Creative arts', 'Public speaking', 'Education and mentoring'],
            expression: {
                positive: ['Inspiring communication', 'Creative ideas', 'Confident leadership', 'Generous teaching'],
                negative: ['Attention-seeking speech', 'Dramatic overstatement', 'Dominating conversation', 'Wounded pride']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Analytical Communicator',
            shortDescription: 'Precise, detail-oriented thinking with practical communication and problem-solving focus.',
            detailedDescription: 'With Mercury in Virgo, your mind is exceptionally analytical, precise, and detail-oriented. You communicate with clarity and accuracy, always focusing on practical applications and useful information. Your thinking is systematic and methodical, and you have a natural ability to spot errors and inefficiencies. You learn best through careful study and practical application of knowledge.',
            keywords: ['Analytical', 'Precise', 'Detail-oriented', 'Practical', 'Systematic', 'Critical', 'Helpful'],
            strengths: ['Exceptional analytical abilities', 'Precise communication', 'Attention to detail', 'Practical problem-solving', 'Helpful information sharing'],
            challenges: ['Tendency toward perfectionism', 'Overly critical thinking', 'May focus too much on flaws', 'Difficulty seeing big picture', 'Can be nitpicky'],
            lifeAreas: ['Research and analysis', 'Healthcare and service', 'Quality control', 'Technical writing', 'Problem-solving'],
            expression: {
                positive: ['Clear, precise communication', 'Helpful analysis', 'Practical solutions', 'Accurate information'],
                negative: ['Overly critical comments', 'Perfectionist paralysis', 'Nitpicking details', 'Harsh criticism']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Diplomatic Communicator',
            shortDescription: 'Balanced, harmonious thinking with diplomatic communication and aesthetic appreciation.',
            detailedDescription: 'With Mercury in Libra, your mind seeks balance, harmony, and fairness in all communications. You have a natural diplomatic ability and can see multiple sides of any issue. Your thinking is influenced by aesthetic considerations and social harmony, and you communicate with charm and grace. You learn best in cooperative environments and through discussion and debate.',
            keywords: ['Diplomatic', 'Balanced', 'Harmonious', 'Fair', 'Aesthetic', 'Cooperative', 'Charming'],
            strengths: ['Natural diplomacy', 'Balanced perspective', 'Charming communication', 'Aesthetic appreciation', 'Cooperative thinking'],
            challenges: ['Difficulty making decisions', 'Tendency to avoid difficult topics', 'May be indecisive', 'Can be superficially agreeable', 'Difficulty with confrontation'],
            lifeAreas: ['Law and mediation', 'Arts and design', 'Public relations', 'Counseling and therapy', 'Social coordination'],
            expression: {
                positive: ['Diplomatic communication', 'Fair mediation', 'Harmonious discussion', 'Aesthetic insights'],
                negative: ['Indecisive communication', 'Conflict avoidance', 'Superficial agreement', 'People-pleasing']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Penetrating Communicator',
            shortDescription: 'Deep, investigative thinking with intense communication and psychological insight.',
            detailedDescription: 'With Mercury in Scorpio, your mind penetrates beneath the surface to uncover hidden truths and deeper meanings. You communicate with intensity and psychological insight, and you have a natural ability to understand motivations and hidden agendas. Your thinking is transformative and regenerative, and you\'re drawn to taboo or mysterious subjects. You learn best through deep investigation and personal transformation.',
            keywords: ['Penetrating', 'Intense', 'Investigative', 'Psychological', 'Transformative', 'Secretive', 'Powerful'],
            strengths: ['Deep psychological insight', 'Investigative abilities', 'Transformative thinking', 'Ability to uncover truth', 'Powerful communication'],
            challenges: ['Tendency toward suspicion', 'Can be secretive', 'May be overly intense', 'Difficulty with small talk', 'Can be manipulative'],
            lifeAreas: ['Psychology and therapy', 'Investigation and research', 'Crisis counseling', 'Transformative work', 'Mystery and occult'],
            expression: {
                positive: ['Deep insights', 'Transformative communication', 'Truth-seeking', 'Psychological understanding'],
                negative: ['Suspicious thinking', 'Secretive communication', 'Manipulative speech', 'Overly intense']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Philosophical Communicator',
            shortDescription: 'Broad, optimistic thinking with enthusiastic communication and love of learning.',
            detailedDescription: 'With Mercury in Sagittarius, your mind is broad, optimistic, and always seeking to expand knowledge and understanding. You communicate with enthusiasm and honesty, often sharing your philosophical insights and adventures. Your thinking is big-picture oriented and future-focused, and you have a natural ability to inspire others with your vision and optimism. You learn best through exploration and real-world experience.',
            keywords: ['Philosophical', 'Optimistic', 'Broad-minded', 'Enthusiastic', 'Honest', 'Adventurous', 'Inspiring'],
            strengths: ['Broad perspective', 'Optimistic thinking', 'Inspiring communication', 'Philosophical insights', 'Honest expression'],
            challenges: ['Tendency to exaggerate', 'May be tactlessly honest', 'Difficulty with details', 'Can be preachy', 'Impatience with routine'],
            lifeAreas: ['Education and teaching', 'Philosophy and religion', 'Travel and exploration', 'Publishing and media', 'International relations'],
            expression: {
                positive: ['Inspiring ideas', 'Philosophical wisdom', 'Optimistic communication', 'Broad understanding'],
                negative: ['Exaggerated claims', 'Tactless honesty', 'Preachy communication', 'Overlooking details']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Structured Communicator',
            shortDescription: 'Disciplined, goal-oriented thinking with authoritative communication and practical focus.',
            detailedDescription: 'With Mercury in Capricorn, your mind is disciplined, structured, and focused on practical achievements. You communicate with authority and prefer organized, systematic approaches to information. Your thinking is strategic and long-term oriented, and you have a natural ability to create plans and structures that lead to success. You learn best through structured study and practical application.',
            keywords: ['Disciplined', 'Structured', 'Authoritative', 'Strategic', 'Practical', 'Ambitious', 'Organized'],
            strengths: ['Strategic thinking', 'Organized communication', 'Authoritative presence', 'Practical planning', 'Disciplined learning'],
            challenges: ['Can be overly serious', 'Tendency toward pessimism', 'May be rigid in thinking', 'Difficulty with creativity', 'Can be controlling'],
            lifeAreas: ['Business and management', 'Government and politics', 'Strategic planning', 'Traditional education', 'Organizational leadership'],
            expression: {
                positive: ['Authoritative communication', 'Strategic planning', 'Organized thinking', 'Practical solutions'],
                negative: ['Overly serious tone', 'Rigid thinking', 'Controlling communication', 'Pessimistic outlook']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Innovative Communicator',
            shortDescription: 'Original, humanitarian thinking with progressive communication and technological aptitude.',
            detailedDescription: 'With Mercury in Aquarius, your mind is original, innovative, and focused on humanitarian ideals and future possibilities. You communicate with objectivity and have a natural understanding of technology and progressive concepts. Your thinking is unconventional and group-oriented, and you have a talent for seeing solutions that others miss. You learn best through experimentation and collaborative exploration.',
            keywords: ['Innovative', 'Original', 'Humanitarian', 'Progressive', 'Objective', 'Technological', 'Unconventional'],
            strengths: ['Original thinking', 'Humanitarian perspective', 'Technological aptitude', 'Progressive ideas', 'Objective communication'],
            challenges: ['Can be emotionally detached', 'Tendency to be rebellious', 'May seem aloof', 'Difficulty with tradition', 'Can be unpredictable'],
            lifeAreas: ['Technology and innovation', 'Humanitarian causes', 'Scientific research', 'Social reform', 'Group dynamics'],
            expression: {
                positive: ['Innovative solutions', 'Progressive ideas', 'Objective analysis', 'Humanitarian communication'],
                negative: ['Detached communication', 'Rebellious thinking', 'Unpredictable ideas', 'Aloof responses']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Intuitive Communicator',
            shortDescription: 'Imaginative, empathetic thinking with artistic communication and spiritual insights.',
            detailedDescription: 'With Mercury in Pisces, your mind is imaginative, intuitive, and deeply empathetic. You communicate through imagery, metaphor, and emotional connection rather than pure logic. Your thinking is fluid and creative, and you have a natural ability to understand subtle meanings and spiritual concepts. You learn best through inspiration, creativity, and emotional engagement with the material.',
            keywords: ['Imaginative', 'Intuitive', 'Empathetic', 'Creative', 'Spiritual', 'Artistic', 'Compassionate'],
            strengths: ['Creative imagination', 'Intuitive understanding', 'Empathetic communication', 'Artistic expression', 'Spiritual insights'],
            challenges: ['Difficulty with logic', 'Tendency to be vague', 'May be overly emotional', 'Can be confused', 'Difficulty with facts'],
            lifeAreas: ['Arts and creativity', 'Spiritual and healing work', 'Psychology and counseling', 'Music and poetry', 'Compassionate service'],
            expression: {
                positive: ['Creative communication', 'Intuitive insights', 'Empathetic understanding', 'Artistic expression'],
                negative: ['Vague communication', 'Confused thinking', 'Overly emotional responses', 'Illogical reasoning']
            }
        }
    },
    [Planet.Venus]: {
        [ZodiacSign.Aries]: {
            meaning: 'Passionate Lover',
            shortDescription: 'Direct, passionate approach to love with spontaneous affection and competitive charm.',
            detailedDescription: 'With Venus in Aries, you approach love and relationships with passion, directness, and enthusiasm. You fall in love quickly and express your affections spontaneously and boldly. Your charm is energetic and competitive, and you enjoy the thrill of pursuit in romance. You value independence in relationships and are attracted to confident, dynamic partners who can match your energy.',
            keywords: ['Passionate', 'Direct', 'Spontaneous', 'Independent', 'Competitive', 'Bold', 'Energetic'],
            strengths: ['Passionate expression of love', 'Direct and honest affection', 'Spontaneous romance', 'Courageous in relationships', 'Exciting partner'],
            challenges: ['Impatience in love', 'Tendency to rush relationships', 'May lose interest quickly', 'Can be self-centered', 'Difficulty with compromise'],
            lifeAreas: ['Competitive sports', 'Adventure activities', 'Leadership roles', 'Independent ventures', 'Dynamic partnerships'],
            expression: {
                positive: ['Bold romantic gestures', 'Honest affection', 'Exciting relationships', 'Passionate love'],
                negative: ['Impatient in love', 'Selfish behavior', 'Quick to anger', 'Rushing commitment']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Sensual Lover',
            shortDescription: 'Stable, sensual approach to love with appreciation for beauty and physical pleasure.',
            detailedDescription: 'With Venus in Taurus, you approach love with stability, sensuality, and a deep appreciation for physical beauty and comfort. You express affection through touch, gifts, and creating beautiful, comfortable environments. Your love is steady, loyal, and enduring, and you value security and reliability in relationships. You\'re attracted to partners who appreciate the finer things in life and can provide emotional and material stability.',
            keywords: ['Sensual', 'Stable', 'Loyal', 'Appreciative', 'Comfortable', 'Reliable', 'Possessive'],
            strengths: ['Loyal and devoted love', 'Sensual affection', 'Appreciation for beauty', 'Stable relationships', 'Generous with resources'],
            challenges: ['Tendency toward possessiveness', 'Resistance to change in relationships', 'Can be materialistic', 'Stubborn in love', 'May be overly comfortable'],
            lifeAreas: ['Art and design', 'Food and hospitality', 'Finance and luxury', 'Nature and gardening', 'Physical pleasures'],
            expression: {
                positive: ['Steady, loyal love', 'Sensual affection', 'Creating beauty', 'Reliable partnership'],
                negative: ['Possessive behavior', 'Stubborn in relationships', 'Materialistic values', 'Resistance to change']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Playful Lover',
            shortDescription: 'Curious, communicative approach to love with need for mental stimulation and variety.',
            detailedDescription: 'With Venus in Gemini, you approach love with curiosity, playfulness, and a need for mental connection. You express affection through words, wit, and engaging conversation. Your charm is light, versatile, and intellectually stimulating, and you need variety and mental stimulation in relationships. You\'re attracted to clever, communicative partners who can keep you mentally engaged and entertained.',
            keywords: ['Curious', 'Communicative', 'Playful', 'Versatile', 'Intellectual', 'Flirtatious', 'Changeable'],
            strengths: ['Engaging communication in love', 'Playful affection', 'Mental connection', 'Versatile charm', 'Witty expression'],
            challenges: ['Difficulty with emotional depth', 'Tendency to be flirtatious', 'May be inconsistent', 'Can be superficial', 'Restless in relationships'],
            lifeAreas: ['Communication and media', 'Education and learning', 'Social networking', 'Writing and publishing', 'Travel and exploration'],
            expression: {
                positive: ['Witty romantic communication', 'Playful affection', 'Mental stimulation', 'Versatile love'],
                negative: ['Flirtatious behavior', 'Inconsistent affection', 'Superficial connections', 'Restless in love']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Nurturing Lover',
            shortDescription: 'Caring, protective approach to love with deep emotional bonds and family focus.',
            detailedDescription: 'With Venus in Cancer, you approach love with deep emotional sensitivity, nurturing care, and a desire to create a safe, loving home. You express affection through caring actions, emotional support, and creating a sense of family. Your love is protective and devoted, and you value emotional security and deep emotional bonds in relationships. You\'re attracted to partners who appreciate your nurturing nature and can provide emotional safety.',
            keywords: ['Nurturing', 'Protective', 'Emotional', 'Family-oriented', 'Caring', 'Sensitive', 'Devoted'],
            strengths: ['Deep emotional love', 'Nurturing affection', 'Protective care', 'Creating home and family', 'Devoted partnership'],
            challenges: ['Overly sensitive in love', 'Tendency to be clingy', 'May be moody', 'Can be overly protective', 'Difficulty letting go'],
            lifeAreas: ['Family and home', 'Childcare and nurturing', 'Food and hospitality', 'Emotional support', 'Domestic arts'],
            expression: {
                positive: ['Nurturing love', 'Emotional support', 'Creating safe spaces', 'Devoted care'],
                negative: ['Clingy behavior', 'Emotional manipulation', 'Mood swings', 'Overly protective']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Generous Lover',
            shortDescription: 'Warm, dramatic approach to love with generous affection and need for admiration.',
            detailedDescription: 'With Venus in Leo, you approach love with warmth, generosity, and dramatic flair. You express affection through grand gestures, creative expressions, and generous giving. Your charm is magnetic and confident, and you need to feel special and admired in relationships. You value loyalty and romance, and you\'re attracted to partners who appreciate your generosity and can match your passion and enthusiasm.',
            keywords: ['Generous', 'Dramatic', 'Warm', 'Loyal', 'Creative', 'Proud', 'Romantic'],
            strengths: ['Generous love', 'Warm affection', 'Loyal partnership', 'Creative romance', 'Confident charm'],
            challenges: ['Need for constant admiration', 'Tendency toward drama', 'Can be demanding', 'Pride in relationships', 'May be attention-seeking'],
            lifeAreas: ['Entertainment and arts', 'Creative expression', 'Leadership and performance', 'Luxury and romance', 'Children and play'],
            expression: {
                positive: ['Generous romantic gestures', 'Warm, loyal love', 'Creative affection', 'Confident partnership'],
                negative: ['Demanding attention', 'Dramatic reactions', 'Wounded pride', 'Attention-seeking behavior']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Devoted Lover',
            shortDescription: 'Practical, service-oriented approach to love with attention to detail and helpful care.',
            detailedDescription: 'With Venus in Virgo, you approach love with practical devotion, attention to detail, and a desire to be helpful and useful. You express affection through acts of service, thoughtful gestures, and taking care of practical needs. Your love is modest and discriminating, and you value health, cleanliness, and improvement in relationships. You\'re attracted to partners who appreciate your helpful nature and share your values of self-improvement.',
            keywords: ['Devoted', 'Practical', 'Helpful', 'Modest', 'Discriminating', 'Analytical', 'Service-oriented'],
            strengths: ['Devoted service in love', 'Practical affection', 'Attention to details', 'Helpful partnership', 'Thoughtful care'],
            challenges: ['Tendency to be critical', 'May be overly analytical', 'Difficulty expressing emotions', 'Can be perfectionistic', 'May worry too much'],
            lifeAreas: ['Healthcare and service', 'Organization and efficiency', 'Health and wellness', 'Practical assistance', 'Quality improvement'],
            expression: {
                positive: ['Helpful acts of service', 'Practical love', 'Thoughtful care', 'Devoted partnership'],
                negative: ['Critical behavior', 'Perfectionist demands', 'Analytical coldness', 'Worry and anxiety']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Harmonious Lover',
            shortDescription: 'Balanced, romantic approach to love with appreciation for beauty and partnership.',
            detailedDescription: 'With Venus in Libra, you approach love with grace, charm, and a deep appreciation for harmony and beauty. You express affection through creating balance, beauty, and fairness in relationships. Your charm is refined and diplomatic, and you need partnership and cooperation to feel complete. You value equality and aesthetics in relationships, and you\'re attracted to partners who are charming, fair, and appreciate beauty.',
            keywords: ['Harmonious', 'Romantic', 'Charming', 'Balanced', 'Aesthetic', 'Diplomatic', 'Partnership-oriented'],
            strengths: ['Natural charm and grace', 'Romantic affection', 'Creating harmony', 'Fair partnership', 'Aesthetic appreciation'],
            challenges: ['Difficulty making relationship decisions', 'Tendency to avoid conflict', 'May be indecisive', 'Can be superficial', 'Dependent on partnership'],
            lifeAreas: ['Arts and beauty', 'Fashion and design', 'Social events', 'Mediation and counseling', 'Romantic partnerships'],
            expression: {
                positive: ['Charming romance', 'Harmonious relationships', 'Fair partnership', 'Beautiful expressions'],
                negative: ['Indecisive in love', 'Conflict avoidance', 'Superficial charm', 'Codependent behavior']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Intense Lover',
            shortDescription: 'Deep, passionate approach to love with intense emotions and transformative connections.',
            detailedDescription: 'With Venus in Scorpio, you approach love with intensity, passion, and a desire for deep, transformative connections. You express affection through emotional depth, loyalty, and complete commitment. Your love is all-or-nothing, and you value honesty, intimacy, and psychological depth in relationships. You\'re attracted to partners who can match your intensity and aren\'t afraid of emotional depth and transformation.',
            keywords: ['Intense', 'Passionate', 'Deep', 'Loyal', 'Transformative', 'Magnetic', 'Possessive'],
            strengths: ['Deep, passionate love', 'Loyal commitment', 'Transformative relationships', 'Magnetic attraction', 'Emotional intensity'],
            challenges: ['Tendency toward jealousy', 'Can be possessive', 'May be secretive', 'Difficulty trusting', 'All-or-nothing approach'],
            lifeAreas: ['Psychology and therapy', 'Intimate relationships', 'Transformative work', 'Mystery and investigation', 'Deep healing'],
            expression: {
                positive: ['Deep passionate love', 'Loyal devotion', 'Transformative connection', 'Intense intimacy'],
                negative: ['Jealous behavior', 'Possessive control', 'Secretive actions', 'Manipulative love']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Adventurous Lover',
            shortDescription: 'Free-spirited, optimistic approach to love with need for adventure and growth.',
            detailedDescription: 'With Venus in Sagittarius, you approach love with optimism, adventure, and a need for freedom and growth. You express affection through shared adventures, philosophical discussions, and encouraging growth. Your charm is enthusiastic and honest, and you value freedom, honesty, and expansion in relationships. You\'re attracted to partners who share your love of adventure and can grow with you.',
            keywords: ['Adventurous', 'Optimistic', 'Free-spirited', 'Honest', 'Philosophical', 'Enthusiastic', 'Growth-oriented'],
            strengths: ['Optimistic love', 'Adventurous spirit', 'Honest affection', 'Encouraging growth', 'Enthusiastic partnership'],
            challenges: ['Difficulty with commitment', 'Tendency to be restless', 'May be tactlessly honest', 'Can be irresponsible', 'Fear of being trapped'],
            lifeAreas: ['Travel and adventure', 'Education and philosophy', 'Sports and outdoors', 'Cultural exploration', 'Freedom and growth'],
            expression: {
                positive: ['Adventurous romance', 'Honest communication', 'Encouraging growth', 'Optimistic love'],
                negative: ['Commitment avoidance', 'Restless behavior', 'Tactless honesty', 'Irresponsible actions']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Committed Lover',
            shortDescription: 'Serious, responsible approach to love with focus on long-term commitment and stability.',
            detailedDescription: 'With Venus in Capricorn, you approach love with seriousness, responsibility, and a focus on long-term commitment. You express affection through loyalty, practical support, and building a stable future together. Your love is mature and enduring, and you value respect, status, and achievement in relationships. You\'re attracted to partners who are ambitious, responsible, and can provide stability and security.',
            keywords: ['Committed', 'Responsible', 'Serious', 'Loyal', 'Ambitious', 'Traditional', 'Stable'],
            strengths: ['Long-term commitment', 'Responsible love', 'Loyal partnership', 'Practical support', 'Stable relationships'],
            challenges: ['Difficulty expressing emotions', 'Tendency to be too serious', 'May be status-conscious', 'Can be controlling', 'Slow to open up'],
            lifeAreas: ['Career and achievement', 'Traditional relationships', 'Long-term planning', 'Status and respect', 'Practical partnerships'],
            expression: {
                positive: ['Committed partnership', 'Responsible love', 'Loyal devotion', 'Practical support'],
                negative: ['Emotional coldness', 'Controlling behavior', 'Status-seeking', 'Overly serious']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Unconventional Lover',
            shortDescription: 'Independent, friendly approach to love with need for freedom and intellectual connection.',
            detailedDescription: 'With Venus in Aquarius, you approach love with independence, friendship, and unconventional values. You express affection through intellectual connection, shared ideals, and respecting each other\'s freedom. Your charm is unique and friendly, and you value independence, equality, and progressive thinking in relationships. You\'re attracted to partners who are unique, intelligent, and share your humanitarian values.',
            keywords: ['Independent', 'Unconventional', 'Friendly', 'Intellectual', 'Progressive', 'Detached', 'Humanitarian'],
            strengths: ['Independent love', 'Intellectual connection', 'Friendly affection', 'Progressive values', 'Respecting freedom'],
            challenges: ['Tendency toward emotional detachment', 'Difficulty with intimacy', 'May be unpredictable', 'Can be aloof', 'Resistance to tradition'],
            lifeAreas: ['Humanitarian causes', 'Technology and innovation', 'Friendship networks', 'Progressive movements', 'Unconventional relationships'],
            expression: {
                positive: ['Intellectual partnership', 'Friendly love', 'Respecting freedom', 'Progressive values'],
                negative: ['Emotional detachment', 'Unpredictable behavior', 'Aloof responses', 'Commitment avoidance']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Romantic Dreamer',
            shortDescription: 'Compassionate, idealistic approach to love with deep empathy and spiritual connection.',
            detailedDescription: 'With Venus in Pisces, you approach love with compassion, idealism, and a desire for spiritual and emotional union. You express affection through empathy, sacrifice, and creating romantic, dreamy experiences. Your love is unconditional and transcendent, and you value spiritual connection, compassion, and artistic beauty in relationships. You\'re attracted to partners who appreciate your sensitivity and can share your romantic ideals.',
            keywords: ['Compassionate', 'Romantic', 'Idealistic', 'Empathetic', 'Spiritual', 'Sacrificing', 'Dreamy'],
            strengths: ['Unconditional love', 'Deep empathy', 'Romantic idealism', 'Spiritual connection', 'Compassionate affection'],
            challenges: ['Tendency to idealize partners', 'Difficulty with boundaries', 'May be overly sacrificing', 'Can be escapist', 'Prone to disappointment'],
            lifeAreas: ['Arts and creativity', 'Spiritual practices', 'Healing and compassion', 'Music and poetry', 'Romantic ideals'],
            expression: {
                positive: ['Unconditional love', 'Romantic gestures', 'Empathetic care', 'Spiritual connection'],
                negative: ['Idealizing partners', 'Boundary confusion', 'Excessive sacrifice', 'Escapist behavior']
            }
        }
    },
    [Planet.Mars]: {
        [ZodiacSign.Aries]: {
            meaning: 'Warrior Energy',
            shortDescription: 'Direct, aggressive action with natural leadership and competitive drive.',
            detailedDescription: 'With Mars in Aries, your energy is direct, powerful, and naturally aggressive in the best sense. You take action quickly and decisively, preferring to lead rather than follow. Your drive is competitive and pioneering, and you thrive on challenges that test your courage and initiative. You have abundant physical energy and a natural warrior instinct that makes you fearless in pursuing your goals.',
            keywords: ['Direct', 'Aggressive', 'Competitive', 'Pioneering', 'Courageous', 'Impulsive', 'Energetic'],
            strengths: ['Natural leadership in action', 'Quick decisive responses', 'Courageous initiative', 'Competitive drive', 'Abundant energy'],
            challenges: ['Tendency toward impatience', 'May be overly aggressive', 'Difficulty with teamwork', 'Can be impulsive', 'Quick to anger'],
            lifeAreas: ['Military and emergency services', 'Competitive sports', 'Leadership roles', 'Entrepreneurship', 'Crisis management'],
            expression: {
                positive: ['Courageous leadership', 'Quick action', 'Competitive excellence', 'Pioneering initiatives'],
                negative: ['Aggressive behavior', 'Impatient actions', 'Selfish pursuits', 'Angry outbursts']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Steady Force',
            shortDescription: 'Patient, persistent action with focus on practical goals and material security.',
            detailedDescription: 'With Mars in Taurus, your energy is steady, persistent, and focused on practical, tangible results. You take action methodically and patiently, building toward your goals with determination and endurance. Your drive is motivated by security and comfort, and you have exceptional staying power once you commit to a course of action. You prefer to work at your own pace and can be incredibly stubborn when pushed.',
            keywords: ['Steady', 'Persistent', 'Patient', 'Practical', 'Determined', 'Stubborn', 'Enduring'],
            strengths: ['Exceptional persistence', 'Practical action', 'Steady progress', 'Strong endurance', 'Reliable effort'],
            challenges: ['Resistance to change', 'Can be overly stubborn', 'Slow to take action', 'Difficulty with urgency', 'May be possessive'],
            lifeAreas: ['Agriculture and construction', 'Finance and banking', 'Crafts and building', 'Real estate', 'Physical labor'],
            expression: {
                positive: ['Persistent effort', 'Practical achievements', 'Steady progress', 'Reliable action'],
                negative: ['Stubborn resistance', 'Slow responses', 'Possessive behavior', 'Inflexible approach']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Mental Energy',
            shortDescription: 'Quick, versatile action with focus on communication and intellectual pursuits.',
            detailedDescription: 'With Mars in Gemini, your energy is quick, versatile, and mentally focused. You take action through communication, networking, and intellectual pursuits. Your drive is motivated by curiosity and the need for variety, and you can juggle multiple projects simultaneously. You have quick reflexes and prefer mental challenges to physical ones, though you may struggle with follow-through on long-term projects.',
            keywords: ['Quick', 'Versatile', 'Mental', 'Communicative', 'Curious', 'Restless', 'Adaptable'],
            strengths: ['Quick mental responses', 'Versatile action', 'Excellent communication', 'Adaptable approach', 'Multiple project management'],
            challenges: ['Difficulty with follow-through', 'Tendency to be scattered', 'May lack persistence', 'Can be superficial', 'Restless energy'],
            lifeAreas: ['Media and communication', 'Sales and marketing', 'Education and training', 'Technology', 'Transportation'],
            expression: {
                positive: ['Quick problem-solving', 'Versatile skills', 'Effective communication', 'Adaptable action'],
                negative: ['Scattered efforts', 'Inconsistent follow-through', 'Nervous energy', 'Superficial engagement']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Protective Instinct',
            shortDescription: 'Emotionally-driven action with focus on protection and nurturing goals.',
            detailedDescription: 'With Mars in Cancer, your energy is emotionally driven and focused on protection, nurturing, and creating security. You take action based on your feelings and instincts, and you\'re motivated by the need to protect and care for others. Your drive fluctuates with your moods, and you can be incredibly tenacious when defending what you love. You prefer indirect approaches and may use emotional strategies to achieve your goals.',
            keywords: ['Protective', 'Emotional', 'Nurturing', 'Intuitive', 'Defensive', 'Moody', 'Tenacious'],
            strengths: ['Strong protective instincts', 'Emotionally motivated action', 'Intuitive responses', 'Tenacious defense', 'Nurturing drive'],
            challenges: ['Moody energy levels', 'Tendency to be defensive', 'May take things personally', 'Indirect approach', 'Emotional volatility'],
            lifeAreas: ['Family and childcare', 'Healthcare and nurturing', 'Real estate and home', 'Food and hospitality', 'Emotional support'],
            expression: {
                positive: ['Protective action', 'Nurturing care', 'Intuitive responses', 'Emotional strength'],
                negative: ['Defensive behavior', 'Moody reactions', 'Passive-aggressive actions', 'Emotional manipulation']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Creative Force',
            shortDescription: 'Confident, dramatic action with focus on creative expression and leadership.',
            detailedDescription: 'With Mars in Leo, your energy is confident, creative, and naturally dramatic. You take action with flair and enthusiasm, motivated by the desire for recognition and creative expression. Your drive is fueled by pride and the need to shine, and you have natural leadership abilities that inspire others. You prefer to be in charge and may become frustrated when not given the recognition you feel you deserve.',
            keywords: ['Confident', 'Creative', 'Dramatic', 'Proud', 'Leadership', 'Generous', 'Expressive'],
            strengths: ['Natural leadership energy', 'Creative action', 'Confident approach', 'Inspiring presence', 'Generous effort'],
            challenges: ['Need for recognition', 'Tendency toward drama', 'Can be demanding', 'Pride-driven actions', 'Difficulty sharing spotlight'],
            lifeAreas: ['Entertainment and arts', 'Leadership and management', 'Creative industries', 'Performance and presentation', 'Children and education'],
            expression: {
                positive: ['Inspiring leadership', 'Creative achievements', 'Confident action', 'Generous efforts'],
                negative: ['Attention-seeking behavior', 'Dramatic reactions', 'Wounded pride', 'Dominating actions']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Precise Action',
            shortDescription: 'Methodical, service-oriented action with focus on improvement and efficiency.',
            detailedDescription: 'With Mars in Virgo, your energy is methodical, precise, and focused on service and improvement. You take action systematically and analytically, motivated by the desire to help and perfect. Your drive is channeled through attention to detail and practical problem-solving, and you have exceptional ability to organize and streamline processes. You may be critical of inefficiency and have high standards for yourself and others.',
            keywords: ['Methodical', 'Precise', 'Analytical', 'Service-oriented', 'Efficient', 'Critical', 'Perfectionist'],
            strengths: ['Methodical approach', 'Precise execution', 'Service-oriented action', 'Analytical problem-solving', 'Efficient processes'],
            challenges: ['Tendency toward perfectionism', 'May be overly critical', 'Difficulty with big picture', 'Can be nitpicky', 'Worry and anxiety'],
            lifeAreas: ['Healthcare and service', 'Quality control', 'Research and analysis', 'Organization and efficiency', 'Technical work'],
            expression: {
                positive: ['Helpful service', 'Precise work', 'Efficient action', 'Analytical solutions'],
                negative: ['Critical behavior', 'Perfectionist paralysis', 'Nitpicking actions', 'Anxious energy']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Balanced Action',
            shortDescription: 'Diplomatic, cooperative action with focus on harmony and fairness.',
            detailedDescription: 'With Mars in Libra, your energy is diplomatic, cooperative, and focused on creating balance and harmony. You take action through partnership and collaboration, motivated by the desire for fairness and beauty. Your drive is channeled through relationships and aesthetic pursuits, and you prefer to avoid direct confrontation. You may struggle with decision-making and assertiveness, preferring to seek consensus.',
            keywords: ['Diplomatic', 'Cooperative', 'Balanced', 'Harmonious', 'Aesthetic', 'Indecisive', 'Partnership-oriented'],
            strengths: ['Diplomatic action', 'Cooperative approach', 'Balanced decisions', 'Aesthetic motivation', 'Partnership skills'],
            challenges: ['Difficulty with assertiveness', 'Tendency to be indecisive', 'May avoid confrontation', 'Can be passive-aggressive', 'Dependent on others'],
            lifeAreas: ['Law and mediation', 'Arts and design', 'Public relations', 'Counseling and therapy', 'Partnership ventures'],
            expression: {
                positive: ['Diplomatic solutions', 'Cooperative action', 'Balanced approach', 'Harmonious leadership'],
                negative: ['Indecisive behavior', 'Conflict avoidance', 'Passive-aggressive actions', 'Dependent responses']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Intense Power',
            shortDescription: 'Deep, transformative action with focus on power and regeneration.',
            detailedDescription: 'With Mars in Scorpio, your energy is intense, powerful, and focused on transformation and regeneration. You take action with depth and determination, motivated by the desire for power and control. Your drive is all-or-nothing, and you have exceptional ability to persist through challenges and crises. You prefer to work behind the scenes and may use psychological strategies to achieve your goals.',
            keywords: ['Intense', 'Powerful', 'Transformative', 'Determined', 'Strategic', 'Secretive', 'Regenerative'],
            strengths: ['Intense determination', 'Transformative power', 'Strategic action', 'Crisis management', 'Deep persistence'],
            challenges: ['Tendency toward obsession', 'Can be manipulative', 'May be secretive', 'Difficulty trusting', 'All-or-nothing approach'],
            lifeAreas: ['Psychology and therapy', 'Investigation and research', 'Crisis management', 'Transformative work', 'Power and control'],
            expression: {
                positive: ['Transformative action', 'Strategic power', 'Deep determination', 'Crisis leadership'],
                negative: ['Manipulative behavior', 'Obsessive actions', 'Secretive methods', 'Vengeful responses']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Adventurous Drive',
            shortDescription: 'Optimistic, expansive action with focus on growth and exploration.',
            detailedDescription: 'With Mars in Sagittarius, your energy is optimistic, expansive, and focused on growth and exploration. You take action with enthusiasm and vision, motivated by the desire for adventure and understanding. Your drive is philosophical and future-oriented, and you have natural ability to inspire others with your optimism. You prefer big-picture goals and may struggle with routine or detailed work.',
            keywords: ['Optimistic', 'Adventurous', 'Expansive', 'Philosophical', 'Enthusiastic', 'Restless', 'Visionary'],
            strengths: ['Optimistic energy', 'Adventurous spirit', 'Visionary action', 'Inspiring enthusiasm', 'Philosophical drive'],
            challenges: ['Difficulty with routine', 'Tendency to be restless', 'May be irresponsible', 'Can be tactless', 'Impatience with details'],
            lifeAreas: ['Travel and exploration', 'Education and philosophy', 'Sports and adventure', 'Publishing and media', 'International business'],
            expression: {
                positive: ['Inspiring action', 'Adventurous exploration', 'Optimistic leadership', 'Visionary pursuits'],
                negative: ['Restless behavior', 'Irresponsible actions', 'Tactless approach', 'Impatient responses']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Ambitious Drive',
            shortDescription: 'Disciplined, goal-oriented action with focus on achievement and authority.',
            detailedDescription: 'With Mars in Capricorn, your energy is disciplined, strategic, and focused on long-term achievement and authority. You take action methodically and persistently, motivated by the desire for success and recognition. Your drive is ambitious and practical, and you have exceptional ability to work toward long-term goals. You prefer structured approaches and may be willing to sacrifice immediate gratification for future success.',
            keywords: ['Disciplined', 'Ambitious', 'Strategic', 'Persistent', 'Authoritative', 'Practical', 'Goal-oriented'],
            strengths: ['Disciplined action', 'Strategic planning', 'Persistent effort', 'Ambitious drive', 'Authoritative leadership'],
            challenges: ['Can be overly serious', 'Tendency toward control', 'May be rigid', 'Difficulty relaxing', 'Can be ruthless'],
            lifeAreas: ['Business and management', 'Government and politics', 'Traditional institutions', 'Long-term planning', 'Authority positions'],
            expression: {
                positive: ['Strategic achievement', 'Disciplined effort', 'Authoritative leadership', 'Persistent progress'],
                negative: ['Controlling behavior', 'Rigid approach', 'Ruthless ambition', 'Overly serious actions']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Revolutionary Energy',
            shortDescription: 'Independent, innovative action with focus on progress and humanitarian goals.',
            detailedDescription: 'With Mars in Aquarius, your energy is independent, innovative, and focused on progress and humanitarian causes. You take action through original thinking and group efforts, motivated by the desire for freedom and social change. Your drive is unconventional and future-oriented, and you have natural ability to inspire revolutionary thinking. You prefer to work for causes greater than yourself.',
            keywords: ['Independent', 'Innovative', 'Revolutionary', 'Humanitarian', 'Progressive', 'Unconventional', 'Group-oriented'],
            strengths: ['Independent action', 'Innovative approaches', 'Humanitarian drive', 'Progressive thinking', 'Group leadership'],
            challenges: ['Tendency toward rebellion', 'Can be unpredictable', 'May be emotionally detached', 'Difficulty with authority', 'Can be stubborn'],
            lifeAreas: ['Humanitarian causes', 'Technology and innovation', 'Social reform', 'Group dynamics', 'Progressive movements'],
            expression: {
                positive: ['Innovative solutions', 'Humanitarian action', 'Progressive leadership', 'Independent thinking'],
                negative: ['Rebellious behavior', 'Unpredictable actions', 'Detached responses', 'Stubborn independence']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Compassionate Action',
            shortDescription: 'Intuitive, empathetic action with focus on service and spiritual goals.',
            detailedDescription: 'With Mars in Pisces, your energy is intuitive, compassionate, and focused on service and spiritual pursuits. You take action based on feelings and inspiration, motivated by the desire to help and heal others. Your drive is fluid and adaptable, and you have natural ability to sense what others need. You may struggle with direct assertiveness and prefer to work behind the scenes or through artistic expression.',
            keywords: ['Intuitive', 'Compassionate', 'Empathetic', 'Spiritual', 'Artistic', 'Fluid', 'Service-oriented'],
            strengths: ['Intuitive action', 'Compassionate service', 'Artistic expression', 'Spiritual drive', 'Empathetic responses'],
            challenges: ['Difficulty with assertiveness', 'Tendency to be passive', 'May be overly emotional', 'Can be confused', 'Difficulty with boundaries'],
            lifeAreas: ['Arts and creativity', 'Healing and therapy', 'Spiritual service', 'Compassionate work', 'Behind-the-scenes support'],
            expression: {
                positive: ['Compassionate service', 'Intuitive action', 'Artistic creation', 'Spiritual dedication'],
                negative: ['Passive behavior', 'Emotional confusion', 'Boundary issues', 'Escapist tendencies']
            }
        }
    },
    [Planet.Jupiter]: {
        [ZodiacSign.Aries]: {
            meaning: 'Pioneer Explorer',
            shortDescription: 'Optimistic leadership with enthusiasm for new ventures and pioneering growth.',
            detailedDescription: 'With Jupiter in Aries, your growth comes through leadership, pioneering new territories, and taking bold initiatives. You have natural optimism about new beginnings and the courage to explore uncharted paths. Your philosophical approach is direct and action-oriented, and you inspire others through your enthusiasm and willingness to take risks. You find meaning through being first, leading others, and blazing new trails in whatever field you choose.',
            keywords: ['Pioneering', 'Leadership', 'Optimistic', 'Courageous', 'Initiative', 'Enthusiastic', 'Independent'],
            strengths: ['Natural leadership in growth', 'Optimistic pioneering spirit', 'Courage to explore new paths', 'Inspiring enthusiasm', 'Independent expansion'],
            challenges: ['Impatience with slow progress', 'Tendency to be overly confident', 'May rush into opportunities', 'Difficulty with teamwork', 'Can be self-centered in growth'],
            lifeAreas: ['Entrepreneurship and startups', 'Leadership development', 'Adventure and exploration', 'Competitive fields', 'Innovation and pioneering'],
            expression: {
                positive: ['Inspiring leadership', 'Courageous exploration', 'Optimistic initiatives', 'Pioneering growth'],
                negative: ['Reckless overconfidence', 'Impatient expansion', 'Selfish opportunities', 'Rushed decisions']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Steady Abundance',
            shortDescription: 'Patient growth through practical means with focus on material security and natural wisdom.',
            detailedDescription: 'With Jupiter in Taurus, your growth comes through patience, practical application, and building lasting abundance. You have a natural understanding of how to create material security and appreciate the finer things in life. Your philosophical approach is grounded in common sense and real-world experience, and you find meaning through creating beauty, comfort, and stability. You expand slowly but surely, building solid foundations for long-term prosperity.',
            keywords: ['Patient', 'Practical', 'Abundant', 'Stable', 'Sensual', 'Grounded', 'Persistent'],
            strengths: ['Patient, steady growth', 'Practical wisdom', 'Natural abundance mindset', 'Appreciation for beauty', 'Stable expansion'],
            challenges: ['Resistance to change', 'Can be overly materialistic', 'Tendency toward excess', 'Slow to adapt', 'May become too comfortable'],
            lifeAreas: ['Finance and banking', 'Real estate and property', 'Agriculture and nature', 'Luxury goods and services', 'Art and beauty'],
            expression: {
                positive: ['Steady prosperity', 'Practical wisdom', 'Beautiful abundance', 'Stable growth'],
                negative: ['Materialistic excess', 'Stubborn resistance', 'Overindulgence', 'Complacent comfort']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Curious Teacher',
            shortDescription: 'Expansive learning through communication with diverse interests and intellectual growth.',
            detailedDescription: 'With Jupiter in Gemini, your growth comes through learning, teaching, and connecting diverse ideas and people. You have an insatiable curiosity and the ability to see connections between seemingly unrelated concepts. Your philosophical approach is flexible and multi-faceted, and you find meaning through sharing knowledge and facilitating communication. You expand through variety, travel, and intellectual exploration.',
            keywords: ['Curious', 'Communicative', 'Versatile', 'Intellectual', 'Connecting', 'Teaching', 'Adaptable'],
            strengths: ['Diverse learning abilities', 'Excellent communication skills', 'Connecting people and ideas', 'Intellectual flexibility', 'Teaching talents'],
            challenges: ['Tendency to be scattered', 'Difficulty with depth', 'May be superficial', 'Information overload', 'Restless expansion'],
            lifeAreas: ['Education and teaching', 'Media and communication', 'Writing and publishing', 'Travel and networking', 'Technology and information'],
            expression: {
                positive: ['Inspiring teaching', 'Connecting diverse ideas', 'Intellectual growth', 'Communicative wisdom'],
                negative: ['Scattered knowledge', 'Superficial learning', 'Information overwhelm', 'Restless seeking']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Nurturing Protector',
            shortDescription: 'Emotional growth through family and nurturing with protective wisdom and intuitive understanding.',
            detailedDescription: 'With Jupiter in Cancer, your growth comes through nurturing, protecting, and creating emotional security for yourself and others. You have deep intuitive wisdom and the ability to understand emotional needs. Your philosophical approach is heart-centered and family-oriented, and you find meaning through caring for others and preserving traditions. You expand through emotional connections and creating safe, nurturing environments.',
            keywords: ['Nurturing', 'Protective', 'Intuitive', 'Emotional', 'Family-oriented', 'Traditional', 'Caring'],
            strengths: ['Deep emotional wisdom', 'Natural nurturing abilities', 'Protective instincts', 'Intuitive understanding', 'Family-centered growth'],
            challenges: ['Overly protective nature', 'Tendency to be moody', 'May be too emotional', 'Difficulty letting go', 'Can be clingy'],
            lifeAreas: ['Family and childcare', 'Real estate and home', 'Food and hospitality', 'Healthcare and nurturing', 'Emotional counseling'],
            expression: {
                positive: ['Nurturing wisdom', 'Protective care', 'Emotional growth', 'Family prosperity'],
                negative: ['Overprotective behavior', 'Emotional excess', 'Clinging attachment', 'Moody expansion']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Generous Creator',
            shortDescription: 'Creative expansion through self-expression with generous leadership and dramatic growth.',
            detailedDescription: 'With Jupiter in Leo, your growth comes through creative self-expression, generous leadership, and inspiring others. You have natural confidence and the ability to see the grand potential in yourself and others. Your philosophical approach is optimistic and heart-centered, and you find meaning through creative expression and helping others shine. You expand through drama, creativity, and generous sharing of your talents.',
            keywords: ['Creative', 'Generous', 'Confident', 'Dramatic', 'Leadership', 'Inspiring', 'Expressive'],
            strengths: ['Natural creative leadership', 'Generous sharing of wisdom', 'Inspiring confidence', 'Dramatic expression', 'Heart-centered growth'],
            challenges: ['Need for recognition', 'Tendency toward drama', 'Can be demanding', 'Pride in expansion', 'May be attention-seeking'],
            lifeAreas: ['Entertainment and arts', 'Creative leadership', 'Education and mentoring', 'Performance and presentation', 'Children and youth'],
            expression: {
                positive: ['Inspiring creative leadership', 'Generous wisdom sharing', 'Confident expansion', 'Dramatic growth'],
                negative: ['Attention-seeking behavior', 'Dramatic excess', 'Demanding recognition', 'Prideful expansion']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Practical Healer',
            shortDescription: 'Growth through service and improvement with analytical wisdom and healing focus.',
            detailedDescription: 'With Jupiter in Virgo, your growth comes through service, healing, and practical improvement of yourself and others. You have analytical wisdom and the ability to see how things can be made better. Your philosophical approach is practical and service-oriented, and you find meaning through helping others and perfecting your skills. You expand through attention to detail, health consciousness, and dedicated service.',
            keywords: ['Practical', 'Service-oriented', 'Analytical', 'Healing', 'Improving', 'Detailed', 'Helpful'],
            strengths: ['Practical wisdom', 'Service-oriented growth', 'Analytical abilities', 'Healing focus', 'Attention to improvement'],
            challenges: ['Tendency toward perfectionism', 'May be overly critical', 'Difficulty seeing big picture', 'Can be nitpicky', 'Worry about details'],
            lifeAreas: ['Healthcare and healing', 'Service industries', 'Quality improvement', 'Research and analysis', 'Environmental work'],
            expression: {
                positive: ['Practical service', 'Healing wisdom', 'Analytical improvement', 'Detailed growth'],
                negative: ['Perfectionist criticism', 'Nitpicking analysis', 'Worried expansion', 'Overly detailed focus']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Harmonious Diplomat',
            shortDescription: 'Growth through relationships and balance with diplomatic wisdom and aesthetic appreciation.',
            detailedDescription: 'With Jupiter in Libra, your growth comes through relationships, creating harmony, and appreciating beauty. You have natural diplomatic wisdom and the ability to see multiple perspectives. Your philosophical approach is balanced and relationship-oriented, and you find meaning through partnership, justice, and aesthetic expression. You expand through cooperation, artistic pursuits, and creating balance in all areas of life.',
            keywords: ['Harmonious', 'Diplomatic', 'Balanced', 'Aesthetic', 'Cooperative', 'Fair', 'Relationship-oriented'],
            strengths: ['Natural diplomatic wisdom', 'Balanced perspective', 'Aesthetic appreciation', 'Cooperative growth', 'Fair-minded expansion'],
            challenges: ['Difficulty making decisions', 'Tendency to avoid conflict', 'May be indecisive', 'Can be superficial', 'Dependent on others'],
            lifeAreas: ['Law and mediation', 'Arts and design', 'Relationships and counseling', 'Diplomacy and negotiation', 'Beauty and fashion'],
            expression: {
                positive: ['Diplomatic wisdom', 'Harmonious growth', 'Balanced expansion', 'Aesthetic development'],
                negative: ['Indecisive expansion', 'Conflict avoidance', 'Superficial growth', 'Dependent development']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Transformative Seeker',
            shortDescription: 'Deep growth through transformation with intense wisdom and regenerative power.',
            detailedDescription: 'With Jupiter in Scorpio, your growth comes through deep transformation, psychological insight, and regenerative experiences. You have intense wisdom and the ability to understand hidden truths and motivations. Your philosophical approach is profound and transformative, and you find meaning through crisis, rebirth, and uncovering mysteries. You expand through emotional depth, spiritual transformation, and helping others heal.',
            keywords: ['Transformative', 'Intense', 'Deep', 'Regenerative', 'Psychological', 'Mysterious', 'Powerful'],
            strengths: ['Deep transformative wisdom', 'Psychological insight', 'Regenerative abilities', 'Intense growth', 'Crisis management'],
            challenges: ['Tendency toward obsession', 'Can be secretive', 'May be overly intense', 'Difficulty trusting', 'All-or-nothing approach'],
            lifeAreas: ['Psychology and therapy', 'Transformative healing', 'Investigation and research', 'Crisis counseling', 'Spiritual transformation'],
            expression: {
                positive: ['Transformative wisdom', 'Deep healing', 'Psychological insight', 'Regenerative growth'],
                negative: ['Obsessive seeking', 'Secretive expansion', 'Intense overwhelm', 'Manipulative growth']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Philosophical Explorer',
            shortDescription: 'Expansive growth through exploration with optimistic wisdom and adventurous spirit.',
            detailedDescription: 'With Jupiter in Sagittarius, your growth comes through exploration, higher learning, and philosophical understanding. You have natural optimism and the ability to see the bigger picture in all situations. Your philosophical approach is expansive and truth-seeking, and you find meaning through adventure, education, and sharing wisdom. You expand through travel, teaching, and exploring different cultures and belief systems.',
            keywords: ['Philosophical', 'Expansive', 'Optimistic', 'Adventurous', 'Truth-seeking', 'Educational', 'Cultural'],
            strengths: ['Natural philosophical wisdom', 'Expansive vision', 'Optimistic growth', 'Adventurous spirit', 'Educational abilities'],
            challenges: ['Tendency to exaggerate', 'May be overly optimistic', 'Can be preachy', 'Difficulty with details', 'Restless expansion'],
            lifeAreas: ['Higher education', 'Philosophy and religion', 'Travel and exploration', 'Publishing and media', 'International relations'],
            expression: {
                positive: ['Philosophical wisdom', 'Expansive growth', 'Optimistic teaching', 'Adventurous exploration'],
                negative: ['Exaggerated claims', 'Preachy behavior', 'Restless seeking', 'Overly optimistic']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Ambitious Builder',
            shortDescription: 'Structured growth through achievement with practical wisdom and authoritative leadership.',
            detailedDescription: 'With Jupiter in Capricorn, your growth comes through discipline, achievement, and building lasting structures. You have practical wisdom and the ability to create long-term success through patient effort. Your philosophical approach is traditional and goal-oriented, and you find meaning through accomplishment, responsibility, and earning respect. You expand through careful planning, hard work, and climbing the ladder of success.',
            keywords: ['Ambitious', 'Disciplined', 'Practical', 'Structured', 'Authoritative', 'Traditional', 'Goal-oriented'],
            strengths: ['Practical wisdom', 'Disciplined growth', 'Authoritative leadership', 'Structured expansion', 'Long-term vision'],
            challenges: ['Can be overly serious', 'Tendency toward pessimism', 'May be rigid', 'Difficulty relaxing', 'Can be controlling'],
            lifeAreas: ['Business and management', 'Government and politics', 'Traditional institutions', 'Long-term planning', 'Authority positions'],
            expression: {
                positive: ['Practical wisdom', 'Disciplined achievement', 'Authoritative growth', 'Structured success'],
                negative: ['Rigid expansion', 'Pessimistic outlook', 'Controlling growth', 'Overly serious approach']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Humanitarian Innovator',
            shortDescription: 'Progressive growth through innovation with humanitarian wisdom and group consciousness.',
            detailedDescription: 'With Jupiter in Aquarius, your growth comes through innovation, humanitarian service, and progressive thinking. You have visionary wisdom and the ability to see future possibilities for humanity. Your philosophical approach is humanitarian and group-oriented, and you find meaning through social reform, technological advancement, and serving the greater good. You expand through friendship, community involvement, and revolutionary ideas.',
            keywords: ['Humanitarian', 'Innovative', 'Progressive', 'Visionary', 'Group-oriented', 'Revolutionary', 'Future-focused'],
            strengths: ['Humanitarian wisdom', 'Innovative thinking', 'Progressive vision', 'Group leadership', 'Future-oriented growth'],
            challenges: ['Tendency toward detachment', 'Can be rebellious', 'May be unpredictable', 'Difficulty with tradition', 'Can be stubborn'],
            lifeAreas: ['Humanitarian causes', 'Technology and innovation', 'Social reform', 'Group dynamics', 'Progressive movements'],
            expression: {
                positive: ['Humanitarian service', 'Progressive innovation', 'Visionary leadership', 'Group-oriented growth'],
                negative: ['Detached expansion', 'Rebellious behavior', 'Unpredictable growth', 'Stubborn independence']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Compassionate Mystic',
            shortDescription: 'Spiritual growth through compassion with intuitive wisdom and transcendent understanding.',
            detailedDescription: 'With Jupiter in Pisces, your growth comes through compassion, spiritual understanding, and transcendent experiences. You have intuitive wisdom and the ability to connect with universal truths. Your philosophical approach is mystical and compassionate, and you find meaning through service, artistic expression, and spiritual development. You expand through meditation, creativity, and helping others heal and find peace.',
            keywords: ['Compassionate', 'Spiritual', 'Intuitive', 'Mystical', 'Transcendent', 'Artistic', 'Healing'],
            strengths: ['Intuitive wisdom', 'Compassionate growth', 'Spiritual understanding', 'Artistic inspiration', 'Healing abilities'],
            challenges: ['Tendency to be overly idealistic', 'May lack boundaries', 'Can be escapist', 'Difficulty with reality', 'May be overly emotional'],
            lifeAreas: ['Spiritual practices', 'Arts and creativity', 'Healing and therapy', 'Compassionate service', 'Mystical studies'],
            expression: {
                positive: ['Compassionate wisdom', 'Spiritual growth', 'Intuitive guidance', 'Artistic inspiration'],
                negative: ['Idealistic delusion', 'Boundary confusion', 'Escapist behavior', 'Emotional overwhelm']
            }
        }
    },
    [Planet.Saturn]: {
        [ZodiacSign.Aries]: {
            meaning: 'Disciplined Leader',
            shortDescription: 'Learning patience and self-control while developing authentic leadership and measured action.',
            detailedDescription: 'With Saturn in Aries, your life lessons involve learning to balance your natural impulses with discipline and patience. You must develop authentic leadership by tempering your aggressive tendencies with wisdom and consideration for others. Your challenges center around learning to think before you act and developing the patience to see projects through to completion. Through these lessons, you develop genuine confidence and the ability to lead with both courage and wisdom.',
            keywords: ['Disciplined', 'Patient', 'Authentic', 'Measured', 'Self-controlled', 'Wise', 'Responsible'],
            strengths: ['Developing authentic leadership', 'Learning self-discipline', 'Balanced action', 'Responsible initiative', 'Mature confidence'],
            challenges: ['Impatience with restrictions', 'Tendency to be too aggressive', 'Difficulty with authority', 'May suppress natural impulses', 'Learning to cooperate'],
            lifeAreas: ['Leadership development', 'Self-discipline training', 'Anger management', 'Authority relationships', 'Personal responsibility'],
            expression: {
                positive: ['Disciplined leadership', 'Patient action', 'Responsible initiative', 'Authentic confidence'],
                negative: ['Suppressed anger', 'Overly cautious action', 'Authority conflicts', 'Impatient frustration']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Patient Builder',
            shortDescription: 'Learning persistence and practical wisdom while building lasting security and material stability.',
            detailedDescription: 'With Saturn in Taurus, your life lessons involve learning true patience and the value of persistent effort in building lasting security. You must develop practical wisdom about money, resources, and material stability. Your challenges center around overcoming stubbornness and learning to adapt when necessary while maintaining your core values. Through these lessons, you develop unshakeable stability and the ability to create lasting abundance through disciplined effort.',
            keywords: ['Patient', 'Persistent', 'Practical', 'Stable', 'Disciplined', 'Enduring', 'Resourceful'],
            strengths: ['Exceptional persistence', 'Practical wisdom', 'Building lasting security', 'Disciplined effort', 'Material stability'],
            challenges: ['Resistance to change', 'Can be overly stubborn', 'Fear of financial insecurity', 'Difficulty adapting', 'May be too materialistic'],
            lifeAreas: ['Financial planning', 'Resource management', 'Building and construction', 'Agricultural work', 'Long-term investments'],
            expression: {
                positive: ['Steady progress', 'Practical achievements', 'Lasting security', 'Disciplined building'],
                negative: ['Stubborn resistance', 'Material obsession', 'Fear-based hoarding', 'Inflexible approach']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Focused Communicator',
            shortDescription: 'Learning mental discipline and depth while developing focused communication and structured learning.',
            detailedDescription: 'With Saturn in Gemini, your life lessons involve learning to focus your naturally scattered mental energy and develop depth in your communications. You must overcome superficiality and learn to commit to thorough understanding rather than surface knowledge. Your challenges center around developing patience with detailed study and learning to communicate with authority and precision. Through these lessons, you develop expertise and the ability to teach others with wisdom and clarity.',
            keywords: ['Focused', 'Disciplined', 'Thorough', 'Precise', 'Authoritative', 'Structured', 'Expert'],
            strengths: ['Focused mental discipline', 'Thorough understanding', 'Precise communication', 'Structured learning', 'Teaching abilities'],
            challenges: ['Tendency to be scattered', 'Difficulty with depth', 'May be overly critical', 'Communication blocks', 'Learning difficulties'],
            lifeAreas: ['Education and teaching', 'Writing and research', 'Communication skills', 'Technical training', 'Information management'],
            expression: {
                positive: ['Expert knowledge', 'Precise communication', 'Structured teaching', 'Disciplined learning'],
                negative: ['Mental blocks', 'Overly critical thinking', 'Communication fears', 'Scattered focus']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Responsible Nurturer',
            shortDescription: 'Learning emotional maturity and boundaries while developing responsible care and family leadership.',
            detailedDescription: 'With Saturn in Cancer, your life lessons involve learning emotional maturity and developing healthy boundaries in your nurturing relationships. You must overcome excessive emotional sensitivity and learn to provide care without becoming overly protective or controlling. Your challenges center around balancing your need for security with the necessity of emotional growth and independence. Through these lessons, you develop mature emotional wisdom and the ability to create truly supportive family structures.',
            keywords: ['Responsible', 'Mature', 'Boundaried', 'Protective', 'Structured', 'Emotional', 'Wise'],
            strengths: ['Emotional maturity', 'Responsible nurturing', 'Healthy boundaries', 'Family leadership', 'Protective wisdom'],
            challenges: ['Overly protective nature', 'Emotional insecurity', 'Difficulty with boundaries', 'Fear of abandonment', 'May be too controlling'],
            lifeAreas: ['Family responsibilities', 'Emotional healing', 'Childcare and parenting', 'Home and security', 'Protective services'],
            expression: {
                positive: ['Mature nurturing', 'Responsible care', 'Emotional wisdom', 'Protective leadership'],
                negative: ['Overprotective control', 'Emotional withdrawal', 'Boundary confusion', 'Insecure clinging']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Humble Creator',
            shortDescription: 'Learning humility and authentic self-expression while developing disciplined creativity and mature leadership.',
            detailedDescription: 'With Saturn in Leo, your life lessons involve learning humility and developing authentic self-expression without the need for constant attention or approval. You must overcome ego-driven behavior and learn to create and lead from a place of genuine service rather than personal glory. Your challenges center around balancing your natural desire to shine with the wisdom of knowing when to step back. Through these lessons, you develop true creative mastery and inspiring leadership.',
            keywords: ['Humble', 'Authentic', 'Disciplined', 'Mature', 'Service-oriented', 'Masterful', 'Inspiring'],
            strengths: ['Authentic self-expression', 'Disciplined creativity', 'Humble leadership', 'Mature confidence', 'Service-oriented approach'],
            challenges: ['Need for recognition', 'Ego sensitivity', 'Fear of not being special', 'Creative blocks', 'Authority issues'],
            lifeAreas: ['Creative arts', 'Leadership training', 'Performance and presentation', 'Education and mentoring', 'Entertainment industry'],
            expression: {
                positive: ['Authentic creativity', 'Humble leadership', 'Disciplined expression', 'Inspiring service'],
                negative: ['Ego defensiveness', 'Creative inhibition', 'Attention-seeking', 'Pride-based resistance']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Perfect Servant',
            shortDescription: 'Learning to balance perfectionism with practicality while developing efficient service and analytical mastery.',
            detailedDescription: 'With Saturn in Virgo, your life lessons involve learning to channel your perfectionist tendencies into practical, efficient service. You must overcome excessive self-criticism and learn to accept "good enough" while still maintaining high standards. Your challenges center around balancing attention to detail with the ability to see the bigger picture and complete projects. Through these lessons, you develop true expertise and the ability to serve others with precision and wisdom.',
            keywords: ['Efficient', 'Practical', 'Precise', 'Service-oriented', 'Analytical', 'Systematic', 'Masterful'],
            strengths: ['Analytical mastery', 'Efficient systems', 'Precise work', 'Service excellence', 'Practical solutions'],
            challenges: ['Excessive perfectionism', 'Self-criticism', 'Difficulty completing projects', 'Worry and anxiety', 'Overly critical of others'],
            lifeAreas: ['Healthcare and service', 'Quality control', 'Research and analysis', 'Organizational systems', 'Technical expertise'],
            expression: {
                positive: ['Precise expertise', 'Efficient service', 'Systematic excellence', 'Practical mastery'],
                negative: ['Perfectionist paralysis', 'Critical judgment', 'Anxious worry', 'Nitpicking behavior']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Balanced Judge',
            shortDescription: 'Learning decisive fairness and authentic relationships while developing diplomatic mastery and balanced judgment.',
            detailedDescription: 'With Saturn in Libra, your life lessons involve learning to make fair decisions and develop authentic relationships based on equality rather than people-pleasing. You must overcome indecisiveness and learn to stand up for justice even when it creates conflict. Your challenges center around balancing your desire for harmony with the necessity of making difficult but fair choices. Through these lessons, you develop true diplomatic wisdom and the ability to create lasting, balanced relationships.',
            keywords: ['Balanced', 'Fair', 'Decisive', 'Diplomatic', 'Just', 'Authentic', 'Harmonious'],
            strengths: ['Balanced judgment', 'Diplomatic mastery', 'Fair decision-making', 'Authentic relationships', 'Justice-oriented'],
            challenges: ['Indecisiveness', 'People-pleasing tendencies', 'Conflict avoidance', 'Relationship dependencies', 'Difficulty with confrontation'],
            lifeAreas: ['Law and justice', 'Mediation and counseling', 'Diplomatic relations', 'Partnership development', 'Aesthetic judgment'],
            expression: {
                positive: ['Fair judgment', 'Diplomatic wisdom', 'Balanced relationships', 'Justice advocacy'],
                negative: ['Indecisive paralysis', 'People-pleasing', 'Conflict avoidance', 'Codependent relationships']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Transformed Master',
            shortDescription: 'Learning emotional control and trust while developing transformative power and psychological mastery.',
            detailedDescription: 'With Saturn in Scorpio, your life lessons involve learning emotional self-control and developing the ability to trust others and yourself. You must overcome tendencies toward manipulation and learn to use your intense power for healing and transformation rather than control. Your challenges center around facing your deepest fears and learning to transform them into wisdom. Through these lessons, you develop profound psychological insight and the ability to help others through their darkest moments.',
            keywords: ['Controlled', 'Transformative', 'Trustworthy', 'Powerful', 'Psychological', 'Healing', 'Wise'],
            strengths: ['Emotional self-control', 'Transformative power', 'Psychological insight', 'Crisis management', 'Healing abilities'],
            challenges: ['Trust issues', 'Tendency toward manipulation', 'Emotional intensity', 'Fear of vulnerability', 'Control issues'],
            lifeAreas: ['Psychology and therapy', 'Crisis counseling', 'Transformative healing', 'Investigation and research', 'Power dynamics'],
            expression: {
                positive: ['Transformative healing', 'Psychological mastery', 'Emotional wisdom', 'Crisis leadership'],
                negative: ['Manipulative control', 'Emotional suppression', 'Trust paranoia', 'Power struggles']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Grounded Philosopher',
            shortDescription: 'Learning practical wisdom and focused teaching while developing disciplined exploration and structured beliefs.',
            detailedDescription: 'With Saturn in Sagittarius, your life lessons involve learning to ground your philosophical insights in practical reality and develop focused, disciplined approaches to learning and teaching. You must overcome tendencies toward dogmatism and learn to structure your beliefs based on real experience rather than theory alone. Your challenges center around balancing your desire for freedom with the necessity of commitment and responsibility. Through these lessons, you develop true wisdom and the ability to teach others with authority and depth.',
            keywords: ['Grounded', 'Practical', 'Disciplined', 'Wise', 'Structured', 'Committed', 'Authoritative'],
            strengths: ['Practical wisdom', 'Disciplined learning', 'Structured teaching', 'Grounded philosophy', 'Committed exploration'],
            challenges: ['Tendency toward dogmatism', 'Difficulty with commitment', 'May be overly serious', 'Restricted freedom', 'Learning limitations'],
            lifeAreas: ['Higher education', 'Philosophy and religion', 'Structured learning', 'Teaching and training', 'Legal studies'],
            expression: {
                positive: ['Practical wisdom', 'Disciplined teaching', 'Grounded philosophy', 'Structured exploration'],
                negative: ['Dogmatic beliefs', 'Restricted thinking', 'Overly serious approach', 'Commitment fears']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Authentic Authority',
            shortDescription: 'Learning genuine leadership and responsibility while developing patient achievement and structured success.',
            detailedDescription: 'With Saturn in Capricorn, your life lessons involve learning to develop authentic authority and take genuine responsibility for your achievements. You must overcome tendencies toward ruthless ambition and learn to build success through integrity and service to others. Your challenges center around balancing your drive for achievement with the necessity of maintaining ethical standards and personal relationships. Through these lessons, you develop true leadership and the ability to create lasting, meaningful success.',
            keywords: ['Authentic', 'Responsible', 'Ethical', 'Patient', 'Structured', 'Authoritative', 'Integrity-based'],
            strengths: ['Authentic authority', 'Responsible leadership', 'Ethical achievement', 'Patient progress', 'Structured success'],
            challenges: ['Ruthless ambition', 'Workaholic tendencies', 'Difficulty relaxing', 'May be overly serious', 'Control issues'],
            lifeAreas: ['Business leadership', 'Government and politics', 'Traditional institutions', 'Long-term planning', 'Authority development'],
            expression: {
                positive: ['Ethical leadership', 'Responsible achievement', 'Authentic authority', 'Structured progress'],
                negative: ['Ruthless ambition', 'Workaholic behavior', 'Controlling authority', 'Rigid structure']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Responsible Innovator',
            shortDescription: 'Learning structured innovation and group responsibility while developing disciplined progress and humanitarian leadership.',
            detailedDescription: 'With Saturn in Aquarius, your life lessons involve learning to structure your innovative ideas and take responsibility for group welfare. You must overcome tendencies toward rebellious detachment and learn to work within systems to create meaningful change. Your challenges center around balancing your need for independence with the necessity of cooperation and commitment to others. Through these lessons, you develop the ability to lead progressive movements with wisdom and practical effectiveness.',
            keywords: ['Structured', 'Responsible', 'Innovative', 'Cooperative', 'Progressive', 'Disciplined', 'Humanitarian'],
            strengths: ['Structured innovation', 'Group responsibility', 'Progressive leadership', 'Disciplined change', 'Humanitarian service'],
            challenges: ['Rebellious tendencies', 'Emotional detachment', 'Difficulty with authority', 'May be unpredictable', 'Group conflicts'],
            lifeAreas: ['Social reform', 'Technology development', 'Group leadership', 'Progressive organizations', 'Humanitarian causes'],
            expression: {
                positive: ['Progressive leadership', 'Structured innovation', 'Group responsibility', 'Disciplined reform'],
                negative: ['Rebellious detachment', 'Unpredictable behavior', 'Authority conflicts', 'Group disruption']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Grounded Mystic',
            shortDescription: 'Learning practical compassion and spiritual discipline while developing structured service and realistic idealism.',
            detailedDescription: 'With Saturn in Pisces, your life lessons involve learning to ground your spiritual insights in practical reality and develop disciplined approaches to compassionate service. You must overcome tendencies toward escapism and learn to face reality while maintaining your spiritual ideals. Your challenges center around balancing your sensitivity with the necessity of establishing boundaries and taking concrete action. Through these lessons, you develop the ability to serve others with both compassion and practical effectiveness.',
            keywords: ['Grounded', 'Practical', 'Disciplined', 'Compassionate', 'Realistic', 'Structured', 'Service-oriented'],
            strengths: ['Practical compassion', 'Spiritual discipline', 'Grounded service', 'Realistic idealism', 'Structured healing'],
            challenges: ['Tendency toward escapism', 'Difficulty with boundaries', 'May be overly emotional', 'Confusion about reality', 'Victim mentality'],
            lifeAreas: ['Healing and therapy', 'Spiritual service', 'Compassionate work', 'Arts and creativity', 'Addiction recovery'],
            expression: {
                positive: ['Practical compassion', 'Disciplined service', 'Grounded spirituality', 'Structured healing'],
                negative: ['Escapist behavior', 'Boundary confusion', 'Emotional overwhelm', 'Victim patterns']
            }
        }
    },
    [Planet.Uranus]: {
        [ZodiacSign.Aries]: {
            meaning: 'Revolutionary Pioneer',
            shortDescription: 'Innovative leadership with breakthrough energy and pioneering technological advancement.',
            detailedDescription: 'With Uranus in Aries, your generation brings revolutionary energy to leadership and pioneering new frontiers. You have an innate ability to break through barriers and initiate radical changes in how society approaches action, leadership, and individual expression. Your innovative spirit is direct and immediate, and you\'re drawn to technological advances that enhance personal freedom and independence. You challenge traditional authority structures and create new models of leadership.',
            keywords: ['Revolutionary', 'Pioneering', 'Breakthrough', 'Independent', 'Innovative', 'Direct', 'Liberating'],
            strengths: ['Revolutionary leadership', 'Breakthrough innovations', 'Independent thinking', 'Pioneering spirit', 'Direct action for change'],
            challenges: ['Impatience with slow progress', 'Tendency toward rebellion', 'May be too radical', 'Difficulty with cooperation', 'Unpredictable actions'],
            lifeAreas: ['Technology and innovation', 'Leadership revolution', 'Individual freedom', 'Breakthrough discoveries', 'Social reform'],
            expression: {
                positive: ['Pioneering breakthroughs', 'Revolutionary leadership', 'Independent innovation', 'Direct liberation'],
                negative: ['Reckless rebellion', 'Impatient disruption', 'Selfish revolution', 'Chaotic change']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Practical Revolutionary',
            shortDescription: 'Gradual innovation in material systems with revolutionary approaches to resources and stability.',
            detailedDescription: 'With Uranus in Taurus, your generation brings revolutionary changes to financial systems, material resources, and concepts of security and stability. You have the ability to innovate practical solutions that transform how society handles money, resources, and material comfort. Your revolutionary spirit works through gradual but persistent change, and you\'re drawn to sustainable technologies and alternative economic systems that provide both security and freedom.',
            keywords: ['Practical', 'Revolutionary', 'Sustainable', 'Material', 'Gradual', 'Innovative', 'Stable'],
            strengths: ['Practical innovation', 'Sustainable revolution', 'Material breakthrough', 'Gradual transformation', 'Stable change'],
            challenges: ['Resistance to change', 'May be too slow', 'Difficulty with disruption', 'Material attachment', 'Stubborn innovation'],
            lifeAreas: ['Financial innovation', 'Sustainable technology', 'Resource management', 'Agricultural revolution', 'Material security'],
            expression: {
                positive: ['Sustainable innovation', 'Practical revolution', 'Material liberation', 'Gradual breakthrough'],
                negative: ['Stubborn resistance', 'Material disruption', 'Slow adaptation', 'Security obsession']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Communication Revolutionary',
            shortDescription: 'Innovative communication and information systems with breakthrough networking and mental liberation.',
            detailedDescription: 'With Uranus in Gemini, your generation brings revolutionary changes to communication, information systems, and mental processes. You have an innate ability to innovate new ways of sharing information and connecting people across distances and differences. Your revolutionary spirit works through technology, media, and educational systems, and you\'re drawn to breakthrough discoveries in communication, transportation, and information processing.',
            keywords: ['Communicative', 'Innovative', 'Networking', 'Mental', 'Revolutionary', 'Connecting', 'Information'],
            strengths: ['Communication innovation', 'Information revolution', 'Networking breakthroughs', 'Mental liberation', 'Educational reform'],
            challenges: ['Information overload', 'Scattered innovation', 'Communication chaos', 'Mental restlessness', 'Superficial change'],
            lifeAreas: ['Communication technology', 'Information systems', 'Educational innovation', 'Transportation revolution', 'Media transformation'],
            expression: {
                positive: ['Communication breakthrough', 'Information liberation', 'Educational innovation', 'Networking revolution'],
                negative: ['Information chaos', 'Communication disruption', 'Mental scatter', 'Superficial change']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Emotional Revolutionary',
            shortDescription: 'Innovative approaches to family and emotional security with breakthrough nurturing and home transformation.',
            detailedDescription: 'With Uranus in Cancer, your generation brings revolutionary changes to family structures, emotional expression, and concepts of home and security. You have the ability to innovate new forms of nurturing and create alternative family models that honor both tradition and individual freedom. Your revolutionary spirit works through emotional liberation and creating new definitions of what constitutes home, family, and emotional security.',
            keywords: ['Emotional', 'Revolutionary', 'Nurturing', 'Family', 'Innovative', 'Protective', 'Liberating'],
            strengths: ['Emotional innovation', 'Family revolution', 'Nurturing breakthrough', 'Home transformation', 'Security liberation'],
            challenges: ['Emotional instability', 'Family disruption', 'Security anxiety', 'Protective rebellion', 'Tradition conflict'],
            lifeAreas: ['Family innovation', 'Home technology', 'Emotional healing', 'Childcare revolution', 'Security systems'],
            expression: {
                positive: ['Family liberation', 'Emotional breakthrough', 'Nurturing innovation', 'Home revolution'],
                negative: ['Family disruption', 'Emotional chaos', 'Security rebellion', 'Protective extremes']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Creative Revolutionary',
            shortDescription: 'Innovative self-expression and creative breakthrough with revolutionary approaches to leadership and entertainment.',
            detailedDescription: 'With Uranus in Leo, your generation brings revolutionary changes to creative expression, entertainment, and leadership styles. You have an innate ability to innovate new forms of artistic expression and create breakthrough approaches to personal creativity and self-expression. Your revolutionary spirit works through dramatic transformation of how society views individuality, creativity, and personal power, often through entertainment and artistic mediums.',
            keywords: ['Creative', 'Revolutionary', 'Expressive', 'Dramatic', 'Innovative', 'Individual', 'Artistic'],
            strengths: ['Creative innovation', 'Artistic revolution', 'Individual expression', 'Leadership breakthrough', 'Entertainment transformation'],
            challenges: ['Ego disruption', 'Creative chaos', 'Attention rebellion', 'Dramatic extremes', 'Individual isolation'],
            lifeAreas: ['Creative arts', 'Entertainment industry', 'Individual expression', 'Leadership innovation', 'Youth culture'],
            expression: {
                positive: ['Creative breakthrough', 'Artistic liberation', 'Individual innovation', 'Leadership revolution'],
                negative: ['Creative disruption', 'Ego rebellion', 'Attention chaos', 'Dramatic extremes']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Service Revolutionary',
            shortDescription: 'Innovative approaches to health and service with breakthrough efficiency and work transformation.',
            detailedDescription: 'With Uranus in Virgo, your generation brings revolutionary changes to health care, work systems, and service industries. You have the ability to innovate practical solutions that transform how society approaches health, efficiency, and service to others. Your revolutionary spirit works through technological advances in medicine, work automation, and systems that improve daily life and practical functioning.',
            keywords: ['Service', 'Revolutionary', 'Health', 'Efficient', 'Practical', 'Innovative', 'Systematic'],
            strengths: ['Health innovation', 'Service revolution', 'Efficiency breakthrough', 'Work transformation', 'Practical liberation'],
            challenges: ['Perfectionist disruption', 'Health anxiety', 'Work chaos', 'Service rebellion', 'System breakdown'],
            lifeAreas: ['Healthcare innovation', 'Work automation', 'Service technology', 'Health systems', 'Efficiency improvement'],
            expression: {
                positive: ['Health breakthrough', 'Service innovation', 'Work liberation', 'Efficiency revolution'],
                negative: ['Health disruption', 'Work chaos', 'Service rebellion', 'Perfectionist extremes']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Relationship Revolutionary',
            shortDescription: 'Innovative approaches to relationships and justice with breakthrough diplomacy and social transformation.',
            detailedDescription: 'With Uranus in Libra, your generation brings revolutionary changes to relationships, legal systems, and concepts of justice and equality. You have an innate ability to innovate new forms of partnership and create breakthrough approaches to diplomacy and social harmony. Your revolutionary spirit works through transforming how society views relationships, marriage, and social justice, often challenging traditional partnership models.',
            keywords: ['Relationship', 'Revolutionary', 'Justice', 'Diplomatic', 'Innovative', 'Balanced', 'Social'],
            strengths: ['Relationship innovation', 'Justice revolution', 'Diplomatic breakthrough', 'Social transformation', 'Partnership liberation'],
            challenges: ['Relationship instability', 'Justice disruption', 'Social chaos', 'Partnership rebellion', 'Balance extremes'],
            lifeAreas: ['Relationship innovation', 'Legal reform', 'Social justice', 'Diplomatic revolution', 'Partnership transformation'],
            expression: {
                positive: ['Relationship breakthrough', 'Justice innovation', 'Social liberation', 'Diplomatic revolution'],
                negative: ['Relationship disruption', 'Justice rebellion', 'Social chaos', 'Partnership extremes']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Transformative Revolutionary',
            shortDescription: 'Innovative approaches to power and transformation with breakthrough psychology and regenerative revolution.',
            detailedDescription: 'With Uranus in Scorpio, your generation brings revolutionary changes to psychology, power structures, and transformative processes. You have the ability to innovate breakthrough approaches to healing, transformation, and understanding the deeper mysteries of life and death. Your revolutionary spirit works through exposing hidden truths and creating new methods of psychological and spiritual transformation.',
            keywords: ['Transformative', 'Revolutionary', 'Psychological', 'Powerful', 'Innovative', 'Deep', 'Regenerative'],
            strengths: ['Transformative innovation', 'Psychological revolution', 'Power breakthrough', 'Deep liberation', 'Regenerative change'],
            challenges: ['Power disruption', 'Psychological chaos', 'Transformation extremes', 'Hidden rebellion', 'Destructive change'],
            lifeAreas: ['Psychology innovation', 'Power transformation', 'Healing revolution', 'Spiritual breakthrough', 'Crisis management'],
            expression: {
                positive: ['Transformative breakthrough', 'Psychological liberation', 'Power innovation', 'Deep revolution'],
                negative: ['Power disruption', 'Psychological chaos', 'Destructive transformation', 'Hidden extremes']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Philosophical Revolutionary',
            shortDescription: 'Innovative approaches to education and philosophy with breakthrough exploration and belief transformation.',
            detailedDescription: 'With Uranus in Sagittarius, your generation brings revolutionary changes to education, philosophy, and belief systems. You have an innate ability to innovate new approaches to learning and create breakthrough methods of exploring truth and meaning. Your revolutionary spirit works through transforming how society views education, religion, and cultural exchange, often through technological advances in global communication.',
            keywords: ['Philosophical', 'Revolutionary', 'Educational', 'Exploratory', 'Innovative', 'Global', 'Liberating'],
            strengths: ['Educational innovation', 'Philosophical revolution', 'Global breakthrough', 'Belief liberation', 'Exploratory change'],
            challenges: ['Belief disruption', 'Educational chaos', 'Cultural rebellion', 'Philosophical extremes', 'Freedom excess'],
            lifeAreas: ['Educational innovation', 'Philosophical revolution', 'Global communication', 'Cultural transformation', 'Belief systems'],
            expression: {
                positive: ['Educational breakthrough', 'Philosophical liberation', 'Global innovation', 'Cultural revolution'],
                negative: ['Educational disruption', 'Belief chaos', 'Cultural rebellion', 'Philosophical extremes']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Structural Revolutionary',
            shortDescription: 'Innovative approaches to authority and structure with breakthrough leadership and institutional transformation.',
            detailedDescription: 'With Uranus in Capricorn, your generation brings revolutionary changes to government, business structures, and traditional institutions. You have the ability to innovate new forms of authority and create breakthrough approaches to leadership and organizational structure. Your revolutionary spirit works through transforming established systems from within, creating more efficient and equitable structures of power and governance.',
            keywords: ['Structural', 'Revolutionary', 'Authority', 'Institutional', 'Innovative', 'Leadership', 'Transformative'],
            strengths: ['Structural innovation', 'Authority revolution', 'Leadership breakthrough', 'Institutional transformation', 'Organizational liberation'],
            challenges: ['Authority disruption', 'Structural chaos', 'Leadership rebellion', 'Institutional breakdown', 'Traditional conflict'],
            lifeAreas: ['Government innovation', 'Business transformation', 'Leadership revolution', 'Institutional reform', 'Authority structures'],
            expression: {
                positive: ['Structural breakthrough', 'Authority innovation', 'Leadership liberation', 'Institutional revolution'],
                negative: ['Authority disruption', 'Structural chaos', 'Leadership rebellion', 'Institutional breakdown']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Humanitarian Revolutionary',
            shortDescription: 'Innovative approaches to humanity and technology with breakthrough social consciousness and group transformation.',
            detailedDescription: 'With Uranus in Aquarius, your generation brings revolutionary changes to technology, humanitarian causes, and group consciousness. You have an innate ability to innovate breakthrough technologies and create new forms of social organization based on equality and freedom. Your revolutionary spirit works through advancing human consciousness and creating technological solutions that benefit all of humanity.',
            keywords: ['Humanitarian', 'Revolutionary', 'Technological', 'Social', 'Innovative', 'Progressive', 'Liberating'],
            strengths: ['Technological innovation', 'Humanitarian revolution', 'Social breakthrough', 'Group liberation', 'Progressive change'],
            challenges: ['Social disruption', 'Technological chaos', 'Group rebellion', 'Humanitarian extremes', 'Progressive isolation'],
            lifeAreas: ['Technology innovation', 'Humanitarian causes', 'Social revolution', 'Group dynamics', 'Progressive movements'],
            expression: {
                positive: ['Technological breakthrough', 'Humanitarian liberation', 'Social innovation', 'Progressive revolution'],
                negative: ['Technological disruption', 'Social chaos', 'Group rebellion', 'Humanitarian extremes']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Spiritual Revolutionary',
            shortDescription: 'Innovative approaches to spirituality and compassion with breakthrough healing and transcendent transformation.',
            detailedDescription: 'With Uranus in Pisces, your generation brings revolutionary changes to spirituality, healing, and compassionate service. You have the ability to innovate new forms of spiritual practice and create breakthrough approaches to healing and transcendence. Your revolutionary spirit works through dissolving boundaries between the material and spiritual worlds, often through artistic expression and alternative healing methods.',
            keywords: ['Spiritual', 'Revolutionary', 'Healing', 'Compassionate', 'Innovative', 'Transcendent', 'Artistic'],
            strengths: ['Spiritual innovation', 'Healing revolution', 'Compassionate breakthrough', 'Artistic liberation', 'Transcendent change'],
            challenges: ['Spiritual confusion', 'Healing chaos', 'Compassionate extremes', 'Artistic disruption', 'Boundary dissolution'],
            lifeAreas: ['Spiritual innovation', 'Healing revolution', 'Artistic transformation', 'Compassionate service', 'Transcendent practices'],
            expression: {
                positive: ['Spiritual breakthrough', 'Healing liberation', 'Compassionate innovation', 'Artistic revolution'],
                negative: ['Spiritual disruption', 'Healing chaos', 'Compassionate confusion', 'Artistic extremes']
            }
        }
    },
    [Planet.Neptune]: {
        [ZodiacSign.Aries]: {
            meaning: 'Spiritual Warrior',
            shortDescription: 'Pioneering spiritual action with idealistic leadership and mystical courage.',
            detailedDescription: 'With Neptune in Aries, your generation brings spiritual idealism to leadership and action. You have the ability to channel divine inspiration into pioneering new spiritual movements and idealistic causes. Your mystical nature expresses through direct action and courageous pursuit of spiritual ideals, though you may struggle with the gap between spiritual vision and practical reality. You\'re drawn to spiritual practices that involve action, movement, and individual expression.',
            keywords: ['Spiritual', 'Pioneering', 'Idealistic', 'Courageous', 'Mystical', 'Action-oriented', 'Visionary'],
            strengths: ['Spiritual courage', 'Idealistic leadership', 'Mystical action', 'Pioneering vision', 'Direct inspiration'],
            challenges: ['Spiritual impatience', 'Idealistic delusion', 'Mystical aggression', 'Vision without grounding', 'Spiritual ego'],
            lifeAreas: ['Spiritual leadership', 'Mystical practices', 'Idealistic causes', 'Spiritual activism', 'Divine inspiration'],
            expression: {
                positive: ['Courageous spiritual action', 'Idealistic leadership', 'Mystical pioneering', 'Divine courage'],
                negative: ['Spiritual delusion', 'Idealistic aggression', 'Mystical impatience', 'Ungrounded vision']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Earthly Mystic',
            shortDescription: 'Grounded spirituality with mystical connection to nature and material transcendence.',
            detailedDescription: 'With Neptune in Taurus, your generation brings spiritual idealism to material reality and connection with nature. You have the ability to find the divine in the physical world and create spiritual practices that honor the earth and natural cycles. Your mystical nature expresses through sensual experience and appreciation of beauty, though you may struggle with materialism versus spiritual values. You\'re drawn to earth-based spirituality and finding the sacred in everyday life.',
            keywords: ['Grounded', 'Mystical', 'Natural', 'Sensual', 'Earthly', 'Beautiful', 'Practical'],
            strengths: ['Grounded spirituality', 'Natural mysticism', 'Sensual transcendence', 'Earthly wisdom', 'Practical idealism'],
            challenges: ['Material illusion', 'Sensual escapism', 'Spiritual materialism', 'Natural romanticism', 'Comfort seeking'],
            lifeAreas: ['Earth-based spirituality', 'Natural healing', 'Sacred agriculture', 'Mystical arts', 'Environmental causes'],
            expression: {
                positive: ['Sacred connection to nature', 'Grounded mysticism', 'Sensual spirituality', 'Earthly transcendence'],
                negative: ['Material illusion', 'Sensual addiction', 'Spiritual materialism', 'Natural escapism']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Mystical Communicator',
            shortDescription: 'Spiritual communication and divine inspiration through words and connection.',
            detailedDescription: 'With Neptune in Gemini, your generation brings spiritual idealism to communication and information sharing. You have the ability to channel divine inspiration through words, writing, and connecting diverse spiritual ideas. Your mystical nature expresses through communication and learning, though you may struggle with distinguishing between divine inspiration and mental confusion. You\'re drawn to spiritual teachings, mystical literature, and using communication as a spiritual practice.',
            keywords: ['Mystical', 'Communicative', 'Inspirational', 'Connected', 'Intuitive', 'Versatile', 'Spiritual'],
            strengths: ['Inspired communication', 'Mystical learning', 'Spiritual networking', 'Divine inspiration', 'Intuitive understanding'],
            challenges: ['Mental confusion', 'Spiritual deception', 'Information overwhelm', 'Mystical scatter', 'Communication illusion'],
            lifeAreas: ['Spiritual communication', 'Mystical writing', 'Divine inspiration', 'Spiritual education', 'Sacred networking'],
            expression: {
                positive: ['Inspired teaching', 'Mystical communication', 'Spiritual networking', 'Divine words'],
                negative: ['Mental confusion', 'Spiritual deception', 'Mystical scatter', 'Communication illusion']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Compassionate Mystic',
            shortDescription: 'Emotional spirituality with mystical nurturing and intuitive compassion.',
            detailedDescription: 'With Neptune in Cancer, your generation brings spiritual idealism to family, emotions, and nurturing. You have the ability to channel divine compassion through caring for others and creating emotionally safe spiritual spaces. Your mystical nature expresses through emotional sensitivity and intuitive understanding, though you may struggle with emotional boundaries and taking on others\' pain. You\'re drawn to healing practices that honor the divine feminine and emotional wisdom.',
            keywords: ['Compassionate', 'Nurturing', 'Intuitive', 'Emotional', 'Protective', 'Mystical', 'Caring'],
            strengths: ['Divine compassion', 'Mystical nurturing', 'Intuitive healing', 'Emotional wisdom', 'Spiritual protection'],
            challenges: ['Emotional overwhelm', 'Boundary confusion', 'Mystical codependency', 'Spiritual victimization', 'Emotional illusion'],
            lifeAreas: ['Spiritual healing', 'Mystical nurturing', 'Emotional therapy', 'Divine feminine', 'Compassionate service'],
            expression: {
                positive: ['Divine nurturing', 'Mystical compassion', 'Intuitive healing', 'Spiritual protection'],
                negative: ['Emotional overwhelm', 'Mystical codependency', 'Spiritual victimization', 'Boundary confusion']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Divine Creator',
            shortDescription: 'Creative spirituality with mystical self-expression and divine inspiration.',
            detailedDescription: 'With Neptune in Leo, your generation brings spiritual idealism to creativity and self-expression. You have the ability to channel divine inspiration through artistic creation and dramatic spiritual expression. Your mystical nature expresses through creativity and performance, though you may struggle with spiritual ego and the desire for recognition. You\'re drawn to artistic spiritual practices and expressing the divine through creative mediums.',
            keywords: ['Creative', 'Inspirational', 'Dramatic', 'Artistic', 'Expressive', 'Divine', 'Mystical'],
            strengths: ['Divine creativity', 'Mystical expression', 'Spiritual artistry', 'Inspired performance', 'Creative transcendence'],
            challenges: ['Spiritual ego', 'Creative illusion', 'Mystical drama', 'Artistic escapism', 'Divine grandiosity'],
            lifeAreas: ['Spiritual arts', 'Mystical creativity', 'Divine expression', 'Sacred performance', 'Inspirational leadership'],
            expression: {
                positive: ['Divine artistic expression', 'Mystical creativity', 'Spiritual inspiration', 'Sacred performance'],
                negative: ['Spiritual ego', 'Creative illusion', 'Mystical grandiosity', 'Artistic escapism']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Sacred Servant',
            shortDescription: 'Practical spirituality with mystical service and divine healing.',
            detailedDescription: 'With Neptune in Virgo, your generation brings spiritual idealism to service and healing. You have the ability to channel divine compassion through practical service and attention to others\' needs. Your mystical nature expresses through healing work and humble service, though you may struggle with perfectionist spiritual ideals and self-sacrifice. You\'re drawn to healing practices that combine spiritual wisdom with practical application.',
            keywords: ['Service-oriented', 'Healing', 'Practical', 'Humble', 'Mystical', 'Compassionate', 'Devoted'],
            strengths: ['Sacred service', 'Mystical healing', 'Practical compassion', 'Divine humility', 'Spiritual devotion'],
            challenges: ['Spiritual perfectionism', 'Mystical martyrdom', 'Service addiction', 'Healing codependency', 'Self-sacrifice'],
            lifeAreas: ['Spiritual healing', 'Sacred service', 'Mystical health', 'Divine work', 'Compassionate care'],
            expression: {
                positive: ['Sacred healing service', 'Mystical compassion', 'Practical spirituality', 'Divine humility'],
                negative: ['Spiritual perfectionism', 'Mystical martyrdom', 'Service addiction', 'Healing codependency']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Harmonious Mystic',
            shortDescription: 'Balanced spirituality with mystical relationships and divine harmony.',
            detailedDescription: 'With Neptune in Libra, your generation brings spiritual idealism to relationships and social harmony. You have the ability to channel divine love through partnerships and create spiritual connections based on beauty and balance. Your mystical nature expresses through relationships and aesthetic appreciation, though you may struggle with idealistic expectations and losing yourself in others. You\'re drawn to spiritual practices that emphasize love, beauty, and harmony.',
            keywords: ['Harmonious', 'Balanced', 'Aesthetic', 'Relational', 'Mystical', 'Beautiful', 'Peaceful'],
            strengths: ['Divine harmony', 'Mystical relationships', 'Spiritual beauty', 'Balanced transcendence', 'Peaceful spirituality'],
            challenges: ['Relationship illusion', 'Mystical codependency', 'Spiritual people-pleasing', 'Aesthetic escapism', 'Harmony addiction'],
            lifeAreas: ['Spiritual relationships', 'Mystical arts', 'Divine harmony', 'Sacred partnerships', 'Aesthetic spirituality'],
            expression: {
                positive: ['Divine love in relationships', 'Mystical harmony', 'Spiritual beauty', 'Sacred partnerships'],
                negative: ['Relationship illusion', 'Mystical codependency', 'Spiritual people-pleasing', 'Aesthetic escapism']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Mystical Transformer',
            shortDescription: 'Deep spirituality with mystical transformation and divine regeneration.',
            detailedDescription: 'With Neptune in Scorpio, your generation brings spiritual idealism to transformation and regeneration. You have the ability to channel divine power through deep psychological and spiritual transformation. Your mystical nature expresses through intense spiritual experiences and healing crises, though you may struggle with spiritual obsession and power dynamics. You\'re drawn to transformative spiritual practices that involve death and rebirth themes.',
            keywords: ['Transformative', 'Deep', 'Mystical', 'Regenerative', 'Intense', 'Powerful', 'Healing'],
            strengths: ['Deep spiritual transformation', 'Mystical regeneration', 'Divine healing power', 'Spiritual intensity', 'Transcendent rebirth'],
            challenges: ['Spiritual obsession', 'Mystical manipulation', 'Transformation addiction', 'Spiritual power struggles', 'Occult delusion'],
            lifeAreas: ['Spiritual transformation', 'Mystical healing', 'Divine regeneration', 'Sacred mysteries', 'Transcendent rebirth'],
            expression: {
                positive: ['Deep spiritual healing', 'Mystical transformation', 'Divine regeneration', 'Sacred mysteries'],
                negative: ['Spiritual obsession', 'Mystical manipulation', 'Transformation addiction', 'Occult delusion']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Spiritual Explorer',
            shortDescription: 'Expansive spirituality with mystical wisdom and divine adventure.',
            detailedDescription: 'With Neptune in Sagittarius, your generation brings spiritual idealism to exploration and higher learning. You have the ability to channel divine wisdom through philosophical understanding and spiritual adventure. Your mystical nature expresses through seeking truth and meaning, though you may struggle with spiritual dogma and unrealistic idealism. You\'re drawn to spiritual practices that involve travel, learning, and expanding consciousness.',
            keywords: ['Expansive', 'Philosophical', 'Adventurous', 'Mystical', 'Wise', 'Seeking', 'Inspirational'],
            strengths: ['Spiritual wisdom', 'Mystical exploration', 'Divine adventure', 'Philosophical transcendence', 'Inspirational teaching'],
            challenges: ['Spiritual dogma', 'Mystical fanaticism', 'Philosophical delusion', 'Spiritual escapism', 'Unrealistic idealism'],
            lifeAreas: ['Spiritual exploration', 'Mystical philosophy', 'Divine wisdom', 'Sacred adventure', 'Transcendent learning'],
            expression: {
                positive: ['Spiritual wisdom seeking', 'Mystical exploration', 'Divine adventure', 'Philosophical transcendence'],
                negative: ['Spiritual dogma', 'Mystical fanaticism', 'Philosophical delusion', 'Spiritual escapism']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Structured Mystic',
            shortDescription: 'Disciplined spirituality with mystical authority and divine responsibility.',
            detailedDescription: 'With Neptune in Capricorn, your generation brings spiritual idealism to structure and authority. You have the ability to channel divine wisdom through disciplined spiritual practice and responsible leadership. Your mystical nature expresses through creating spiritual institutions and structures, though you may struggle with spiritual materialism and authoritarian spirituality. You\'re drawn to traditional spiritual practices that emphasize discipline and mastery.',
            keywords: ['Disciplined', 'Structured', 'Authoritative', 'Mystical', 'Responsible', 'Traditional', 'Masterful'],
            strengths: ['Disciplined spirituality', 'Mystical authority', 'Spiritual structure', 'Divine responsibility', 'Traditional wisdom'],
            challenges: ['Spiritual materialism', 'Mystical authoritarianism', 'Religious rigidity', 'Spiritual control', 'Traditional dogma'],
            lifeAreas: ['Spiritual institutions', 'Mystical authority', 'Divine discipline', 'Sacred tradition', 'Spiritual mastery'],
            expression: {
                positive: ['Disciplined spiritual practice', 'Mystical authority', 'Spiritual structure', 'Divine responsibility'],
                negative: ['Spiritual materialism', 'Mystical authoritarianism', 'Religious rigidity', 'Spiritual control']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Universal Mystic',
            shortDescription: 'Progressive spirituality with mystical innovation and divine consciousness.',
            detailedDescription: 'With Neptune in Aquarius, your generation brings spiritual idealism to humanitarian causes and universal consciousness. You have the ability to channel divine inspiration through progressive spiritual movements and innovative mystical practices. Your mystical nature expresses through group consciousness and humanitarian service, though you may struggle with spiritual detachment and utopian idealism. You\'re drawn to futuristic spiritual practices that emphasize unity and universal love.',
            keywords: ['Progressive', 'Universal', 'Humanitarian', 'Mystical', 'Innovative', 'Conscious', 'Unifying'],
            strengths: ['Universal consciousness', 'Mystical innovation', 'Spiritual progress', 'Divine unity', 'Humanitarian spirituality'],
            challenges: ['Spiritual detachment', 'Mystical utopianism', 'Group delusion', 'Spiritual rebellion', 'Universal escapism'],
            lifeAreas: ['Progressive spirituality', 'Mystical innovation', 'Universal consciousness', 'Humanitarian service', 'Divine unity'],
            expression: {
                positive: ['Universal spiritual consciousness', 'Mystical innovation', 'Progressive spirituality', 'Divine unity'],
                negative: ['Spiritual detachment', 'Mystical utopianism', 'Group spiritual delusion', 'Universal escapism']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Pure Mystic',
            shortDescription: 'Transcendent spirituality with mystical compassion and divine unity.',
            detailedDescription: 'With Neptune in Pisces, your generation brings the purest expression of spiritual idealism and mystical consciousness. You have the ability to channel divine love and compassion in its most refined form, dissolving boundaries between self and universal consciousness. Your mystical nature expresses through complete surrender and transcendent love, though you may struggle with reality avoidance and spiritual confusion. You\'re drawn to the highest forms of spiritual practice that emphasize unity and unconditional love.',
            keywords: ['Transcendent', 'Pure', 'Mystical', 'Compassionate', 'Universal', 'Divine', 'Unified'],
            strengths: ['Pure mystical consciousness', 'Divine compassion', 'Transcendent love', 'Spiritual unity', 'Universal empathy'],
            challenges: ['Reality avoidance', 'Spiritual confusion', 'Mystical delusion', 'Boundary dissolution', 'Victim consciousness'],
            lifeAreas: ['Pure spirituality', 'Mystical transcendence', 'Divine compassion', 'Universal love', 'Spiritual unity'],
            expression: {
                positive: ['Pure divine love', 'Mystical transcendence', 'Universal compassion', 'Spiritual unity'],
                negative: ['Reality avoidance', 'Spiritual confusion', 'Mystical delusion', 'Victim consciousness']
            }
        }
    },
    [Planet.Pluto]: {
        [ZodiacSign.Aries]: {
            meaning: 'Power Pioneer',
            shortDescription: 'Transformative leadership with regenerative action and revolutionary personal power.',
            detailedDescription: 'With Pluto in Aries, your generation transforms the concept of individual power and leadership. You have the ability to regenerate through direct action and pioneer new forms of personal empowerment. Your transformative nature expresses through breaking down old authority structures and creating new models of individual strength and courage. You face the shadow of aggression and learn to use power constructively rather than destructively.',
            keywords: ['Transformative', 'Pioneering', 'Powerful', 'Revolutionary', 'Regenerative', 'Individual', 'Courageous'],
            strengths: ['Transformative leadership', 'Regenerative action', 'Personal empowerment', 'Revolutionary courage', 'Individual transformation'],
            challenges: ['Destructive aggression', 'Power struggles', 'Violent transformation', 'Selfish regeneration', 'Ruthless individualism'],
            lifeAreas: ['Personal empowerment', 'Leadership transformation', 'Individual revolution', 'Power dynamics', 'Courage development'],
            expression: {
                positive: ['Constructive personal power', 'Transformative leadership', 'Regenerative courage', 'Revolutionary empowerment'],
                negative: ['Destructive aggression', 'Power obsession', 'Violent transformation', 'Ruthless individualism']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Resource Transformer',
            shortDescription: 'Deep transformation of values and resources with regenerative material power.',
            detailedDescription: 'With Pluto in Taurus, your generation transforms the relationship with material resources, money, and values. You have the ability to regenerate through building lasting security and transforming economic systems. Your transformative nature expresses through revolutionizing how society views wealth, resources, and material stability. You face the shadow of materialism and learn to use resources for regenerative rather than destructive purposes.',
            keywords: ['Transformative', 'Material', 'Resourceful', 'Regenerative', 'Valuable', 'Stable', 'Powerful'],
            strengths: ['Resource transformation', 'Material regeneration', 'Value revolution', 'Economic empowerment', 'Sustainable power'],
            challenges: ['Material obsession', 'Resource hoarding', 'Economic destruction', 'Value corruption', 'Materialistic power'],
            lifeAreas: ['Economic transformation', 'Resource management', 'Value systems', 'Material security', 'Sustainable development'],
            expression: {
                positive: ['Regenerative resource use', 'Transformative economics', 'Sustainable material power', 'Value revolution'],
                negative: ['Material obsession', 'Resource destruction', 'Economic manipulation', 'Materialistic corruption']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Mind Transformer',
            shortDescription: 'Deep transformation of communication and information with regenerative mental power.',
            detailedDescription: 'With Pluto in Gemini, your generation transforms communication, information systems, and mental processes. You have the ability to regenerate through powerful communication and revolutionary information sharing. Your transformative nature expresses through exposing hidden information and transforming how society thinks and communicates. You face the shadow of mental manipulation and learn to use information for healing rather than control.',
            keywords: ['Transformative', 'Mental', 'Communicative', 'Informational', 'Regenerative', 'Powerful', 'Revolutionary'],
            strengths: ['Mental transformation', 'Communication revolution', 'Information regeneration', 'Intellectual empowerment', 'Truth revelation'],
            challenges: ['Mental manipulation', 'Information control', 'Communication destruction', 'Intellectual obsession', 'Truth distortion'],
            lifeAreas: ['Communication transformation', 'Information revolution', 'Mental regeneration', 'Truth revelation', 'Intellectual power'],
            expression: {
                positive: ['Transformative truth-telling', 'Regenerative communication', 'Mental empowerment', 'Information liberation'],
                negative: ['Mental manipulation', 'Information control', 'Communication destruction', 'Truth distortion']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Emotional Transformer',
            shortDescription: 'Deep transformation of family and emotions with regenerative nurturing power.',
            detailedDescription: 'With Pluto in Cancer, your generation transforms family structures, emotional patterns, and nurturing systems. You have the ability to regenerate through deep emotional healing and revolutionary approaches to family and security. Your transformative nature expresses through breaking down dysfunctional family patterns and creating new forms of emotional support. You face the shadow of emotional manipulation and learn to use nurturing power for healing rather than control.',
            keywords: ['Transformative', 'Emotional', 'Nurturing', 'Family-oriented', 'Regenerative', 'Protective', 'Healing'],
            strengths: ['Emotional transformation', 'Family regeneration', 'Nurturing revolution', 'Protective empowerment', 'Healing power'],
            challenges: ['Emotional manipulation', 'Family destruction', 'Nurturing obsession', 'Protective control', 'Emotional extremes'],
            lifeAreas: ['Family transformation', 'Emotional healing', 'Nurturing revolution', 'Security regeneration', 'Protective power'],
            expression: {
                positive: ['Healing family transformation', 'Regenerative nurturing', 'Emotional empowerment', 'Protective healing'],
                negative: ['Emotional manipulation', 'Family destruction', 'Nurturing control', 'Protective obsession']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Creative Transformer',
            shortDescription: 'Deep transformation of creativity and self-expression with regenerative personal power.',
            detailedDescription: 'With Pluto in Leo, your generation transforms creative expression, entertainment, and individual identity. You have the ability to regenerate through powerful self-expression and revolutionary approaches to creativity and leadership. Your transformative nature expresses through breaking down ego-driven patterns and creating authentic forms of creative power. You face the shadow of narcissism and learn to use creative power for collective rather than purely personal benefit.',
            keywords: ['Transformative', 'Creative', 'Expressive', 'Individual', 'Regenerative', 'Powerful', 'Authentic'],
            strengths: ['Creative transformation', 'Expressive regeneration', 'Individual empowerment', 'Authentic power', 'Creative revolution'],
            challenges: ['Narcissistic obsession', 'Creative destruction', 'Ego manipulation', 'Expressive extremes', 'Power drama'],
            lifeAreas: ['Creative transformation', 'Self-expression revolution', 'Individual regeneration', 'Authentic power', 'Creative leadership'],
            expression: {
                positive: ['Authentic creative power', 'Transformative self-expression', 'Regenerative creativity', 'Individual empowerment'],
                negative: ['Narcissistic obsession', 'Creative manipulation', 'Ego destruction', 'Expressive extremes']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Service Transformer',
            shortDescription: 'Deep transformation of work and service with regenerative healing power.',
            detailedDescription: 'With Pluto in Virgo, your generation transforms work systems, health care, and service industries. You have the ability to regenerate through powerful service and revolutionary approaches to health and efficiency. Your transformative nature expresses through exposing corruption in service systems and creating new forms of healing and work. You face the shadow of perfectionist control and learn to use analytical power for genuine healing rather than criticism.',
            keywords: ['Transformative', 'Service-oriented', 'Healing', 'Analytical', 'Regenerative', 'Efficient', 'Powerful'],
            strengths: ['Service transformation', 'Healing regeneration', 'Work revolution', 'Analytical empowerment', 'Health transformation'],
            challenges: ['Perfectionist obsession', 'Service manipulation', 'Health extremes', 'Critical destruction', 'Work addiction'],
            lifeAreas: ['Health transformation', 'Service revolution', 'Work regeneration', 'Healing power', 'Analytical transformation'],
            expression: {
                positive: ['Transformative healing service', 'Regenerative health care', 'Work empowerment', 'Analytical healing'],
                negative: ['Perfectionist obsession', 'Service manipulation', 'Health extremes', 'Critical destruction']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Relationship Transformer',
            shortDescription: 'Deep transformation of relationships and justice with regenerative partnership power.',
            detailedDescription: 'With Pluto in Libra, your generation transforms relationships, legal systems, and concepts of justice and equality. You have the ability to regenerate through powerful partnerships and revolutionary approaches to balance and fairness. Your transformative nature expresses through exposing relationship power dynamics and creating new forms of equal partnership. You face the shadow of codependency and learn to use relationship power for mutual empowerment rather than control.',
            keywords: ['Transformative', 'Relational', 'Just', 'Balanced', 'Regenerative', 'Partnership', 'Equal'],
            strengths: ['Relationship transformation', 'Justice regeneration', 'Partnership empowerment', 'Balance revolution', 'Equal power'],
            challenges: ['Relationship obsession', 'Justice extremes', 'Partnership manipulation', 'Balance destruction', 'Codependent power'],
            lifeAreas: ['Relationship transformation', 'Justice revolution', 'Partnership regeneration', 'Balance empowerment', 'Equal rights'],
            expression: {
                positive: ['Transformative equal partnerships', 'Regenerative justice', 'Relationship empowerment', 'Balanced power'],
                negative: ['Relationship obsession', 'Justice extremes', 'Partnership manipulation', 'Codependent control']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Ultimate Transformer',
            shortDescription: 'Deep transformation of power and regeneration with ultimate healing and rebirth.',
            detailedDescription: 'With Pluto in Scorpio, your generation experiences the most intense and complete transformation possible. You have the ability to regenerate through facing the deepest shadows and revolutionary approaches to power, sexuality, and death. Your transformative nature expresses through complete destruction and rebirth cycles, exposing all hidden corruption and creating new forms of authentic power. You face the ultimate shadow of destruction and learn to use transformative power for healing rather than revenge.',
            keywords: ['Ultimate', 'Transformative', 'Regenerative', 'Powerful', 'Deep', 'Intense', 'Healing'],
            strengths: ['Ultimate transformation', 'Complete regeneration', 'Deep healing power', 'Intense empowerment', 'Total rebirth'],
            challenges: ['Destructive obsession', 'Power extremes', 'Transformation addiction', 'Revenge patterns', 'Control manipulation'],
            lifeAreas: ['Complete transformation', 'Ultimate regeneration', 'Deep healing', 'Power revolution', 'Death and rebirth'],
            expression: {
                positive: ['Ultimate healing transformation', 'Complete regeneration', 'Deep empowerment', 'Total rebirth'],
                negative: ['Destructive obsession', 'Power extremes', 'Transformation addiction', 'Revenge patterns']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Belief Transformer',
            shortDescription: 'Deep transformation of beliefs and philosophy with regenerative wisdom power.',
            detailedDescription: 'With Pluto in Sagittarius, your generation transforms belief systems, education, and philosophical understanding. You have the ability to regenerate through powerful truth-seeking and revolutionary approaches to wisdom and meaning. Your transformative nature expresses through exposing religious and educational corruption and creating new forms of authentic wisdom. You face the shadow of dogmatic extremism and learn to use philosophical power for liberation rather than control.',
            keywords: ['Transformative', 'Philosophical', 'Truth-seeking', 'Educational', 'Regenerative', 'Wise', 'Liberating'],
            strengths: ['Belief transformation', 'Wisdom regeneration', 'Truth revolution', 'Educational empowerment', 'Philosophical power'],
            challenges: ['Dogmatic extremism', 'Belief destruction', 'Truth obsession', 'Educational manipulation', 'Philosophical control'],
            lifeAreas: ['Belief transformation', 'Educational revolution', 'Wisdom regeneration', 'Truth empowerment', 'Philosophical power'],
            expression: {
                positive: ['Transformative truth-seeking', 'Regenerative wisdom', 'Educational empowerment', 'Philosophical liberation'],
                negative: ['Dogmatic extremism', 'Belief destruction', 'Truth obsession', 'Educational manipulation']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Structure Transformer',
            shortDescription: 'Deep transformation of authority and institutions with regenerative structural power.',
            detailedDescription: 'With Pluto in Capricorn, your generation transforms government, business, and institutional structures. You have the ability to regenerate through powerful leadership and revolutionary approaches to authority and organization. Your transformative nature expresses through exposing corruption in power structures and creating new forms of authentic authority. You face the shadow of authoritarian control and learn to use structural power for collective benefit rather than personal dominance.',
            keywords: ['Transformative', 'Structural', 'Authoritative', 'Institutional', 'Regenerative', 'Powerful', 'Revolutionary'],
            strengths: ['Structural transformation', 'Authority regeneration', 'Institutional empowerment', 'Leadership revolution', 'Organizational power'],
            challenges: ['Authoritarian obsession', 'Structural destruction', 'Power corruption', 'Institutional manipulation', 'Control extremes'],
            lifeAreas: ['Government transformation', 'Business regeneration', 'Institutional revolution', 'Authority empowerment', 'Structural power'],
            expression: {
                positive: ['Transformative authentic authority', 'Regenerative institutions', 'Structural empowerment', 'Revolutionary leadership'],
                negative: ['Authoritarian obsession', 'Structural destruction', 'Power corruption', 'Institutional manipulation']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Social Transformer',
            shortDescription: 'Deep transformation of society and technology with regenerative collective power.',
            detailedDescription: 'With Pluto in Aquarius, your generation transforms social systems, technology, and collective consciousness. You have the ability to regenerate through powerful innovation and revolutionary approaches to humanity and progress. Your transformative nature expresses through exposing social corruption and creating new forms of collective empowerment. You face the shadow of technological control and learn to use social power for human liberation rather than manipulation.',
            keywords: ['Transformative', 'Social', 'Technological', 'Collective', 'Regenerative', 'Progressive', 'Humanitarian'],
            strengths: ['Social transformation', 'Technological regeneration', 'Collective empowerment', 'Progressive revolution', 'Humanitarian power'],
            challenges: ['Technological obsession', 'Social destruction', 'Collective manipulation', 'Progressive extremism', 'Humanitarian control'],
            lifeAreas: ['Social transformation', 'Technology regeneration', 'Collective empowerment', 'Progressive revolution', 'Humanitarian power'],
            expression: {
                positive: ['Transformative social progress', 'Regenerative technology', 'Collective empowerment', 'Humanitarian revolution'],
                negative: ['Technological obsession', 'Social destruction', 'Collective manipulation', 'Progressive extremism']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Spiritual Transformer',
            shortDescription: 'Deep transformation of spirituality and compassion with regenerative transcendent power.',
            detailedDescription: 'With Pluto in Pisces, your generation transforms spirituality, compassion, and transcendent consciousness. You have the ability to regenerate through powerful spiritual experiences and revolutionary approaches to unity and healing. Your transformative nature expresses through exposing spiritual corruption and creating new forms of authentic transcendence. You face the shadow of spiritual delusion and learn to use transcendent power for genuine healing rather than escapism.',
            keywords: ['Transformative', 'Spiritual', 'Transcendent', 'Compassionate', 'Regenerative', 'Healing', 'Universal'],
            strengths: ['Spiritual transformation', 'Transcendent regeneration', 'Compassionate empowerment', 'Healing revolution', 'Universal power'],
            challenges: ['Spiritual obsession', 'Transcendent delusion', 'Compassionate extremes', 'Healing addiction', 'Universal escapism'],
            lifeAreas: ['Spiritual transformation', 'Transcendent regeneration', 'Compassionate empowerment', 'Healing revolution', 'Universal consciousness'],
            expression: {
                positive: ['Transformative spiritual healing', 'Regenerative transcendence', 'Compassionate empowerment', 'Universal love'],
                negative: ['Spiritual obsession', 'Transcendent delusion', 'Compassionate extremes', 'Healing addiction']
            }
        }
    },
    [Planet.NorthNode]: {
        [ZodiacSign.Aries]: {
            meaning: 'Independent Pioneer',
            shortDescription: 'Soul growth through developing independence, leadership, and courageous self-assertion.',
            detailedDescription: 'With the North Node in Aries, your soul\'s purpose is to develop independence, courage, and authentic leadership. You\'re learning to trust your instincts, take initiative, and assert yourself confidently. Your karmic path involves moving away from over-dependence on others and developing the courage to be a pioneer in your own life. You\'re meant to cultivate self-reliance, make quick decisions, and lead others through your example of fearless action.',
            keywords: ['Independent', 'Courageous', 'Leadership', 'Initiative', 'Self-reliant', 'Pioneering', 'Assertive'],
            strengths: ['Developing authentic leadership', 'Learning self-reliance', 'Cultivating courage', 'Taking initiative', 'Pioneering new paths'],
            challenges: ['Overcoming dependence on others', 'Learning to act decisively', 'Developing confidence', 'Balancing self with others', 'Managing impatience'],
            lifeAreas: ['Personal leadership', 'Independent ventures', 'Self-assertion', 'Pioneering activities', 'Courage development'],
            expression: {
                positive: ['Confident self-leadership', 'Courageous independence', 'Pioneering initiatives', 'Authentic self-assertion'],
                negative: ['Selfish independence', 'Reckless courage', 'Impatient leadership', 'Aggressive assertion']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Grounded Builder',
            shortDescription: 'Soul growth through developing patience, stability, and practical material wisdom.',
            detailedDescription: 'With the North Node in Taurus, your soul\'s purpose is to develop patience, stability, and a grounded approach to life. You\'re learning to slow down, appreciate simple pleasures, and build lasting security through persistent effort. Your karmic path involves moving away from chaotic or overly intense approaches and developing the wisdom of steady, practical progress. You\'re meant to cultivate patience, enjoy sensual pleasures, and create lasting value.',
            keywords: ['Patient', 'Stable', 'Grounded', 'Practical', 'Persistent', 'Sensual', 'Building'],
            strengths: ['Developing patience', 'Building stability', 'Creating lasting value', 'Enjoying simple pleasures', 'Practical wisdom'],
            challenges: ['Overcoming impatience', 'Learning to slow down', 'Developing persistence', 'Appreciating simplicity', 'Building gradually'],
            lifeAreas: ['Financial stability', 'Practical building', 'Sensual enjoyment', 'Patient development', 'Material security'],
            expression: {
                positive: ['Patient building', 'Stable progress', 'Practical wisdom', 'Sensual appreciation'],
                negative: ['Stubborn resistance', 'Material obsession', 'Slow stagnation', 'Sensual excess']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Curious Communicator',
            shortDescription: 'Soul growth through developing communication, learning, and mental flexibility.',
            detailedDescription: 'With the North Node in Gemini, your soul\'s purpose is to develop communication skills, intellectual curiosity, and mental flexibility. You\'re learning to gather information, share knowledge, and connect with others through words and ideas. Your karmic path involves moving away from rigid thinking or isolated wisdom and developing the ability to learn continuously and communicate effectively. You\'re meant to cultivate curiosity, embrace variety, and become a bridge between different ideas and people.',
            keywords: ['Communicative', 'Curious', 'Flexible', 'Learning', 'Connecting', 'Adaptable', 'Sharing'],
            strengths: ['Developing communication skills', 'Cultivating curiosity', 'Learning continuously', 'Connecting ideas', 'Mental flexibility'],
            challenges: ['Overcoming rigid thinking', 'Learning to listen', 'Developing focus', 'Sharing knowledge', 'Embracing variety'],
            lifeAreas: ['Communication development', 'Continuous learning', 'Information sharing', 'Mental flexibility', 'Social connection'],
            expression: {
                positive: ['Effective communication', 'Curious learning', 'Flexible thinking', 'Knowledge sharing'],
                negative: ['Scattered communication', 'Superficial learning', 'Mental restlessness', 'Information overload']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Nurturing Protector',
            shortDescription: 'Soul growth through developing emotional intelligence, nurturing, and family wisdom.',
            detailedDescription: 'With the North Node in Cancer, your soul\'s purpose is to develop emotional intelligence, nurturing abilities, and deep family connections. You\'re learning to trust your intuition, care for others, and create emotional security. Your karmic path involves moving away from overly ambitious or emotionally detached approaches and developing the wisdom of the heart. You\'re meant to cultivate empathy, create safe spaces, and honor the importance of home and family.',
            keywords: ['Nurturing', 'Emotional', 'Intuitive', 'Protective', 'Family-oriented', 'Caring', 'Empathetic'],
            strengths: ['Developing emotional intelligence', 'Cultivating nurturing abilities', 'Creating security', 'Trusting intuition', 'Family wisdom'],
            challenges: ['Overcoming emotional detachment', 'Learning to nurture', 'Developing empathy', 'Creating boundaries', 'Balancing care'],
            lifeAreas: ['Emotional development', 'Family relationships', 'Nurturing others', 'Home creation', 'Intuitive growth'],
            expression: {
                positive: ['Wise nurturing', 'Emotional intelligence', 'Protective care', 'Intuitive guidance'],
                negative: ['Overprotective control', 'Emotional manipulation', 'Clingy behavior', 'Moody reactions']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Creative Leader',
            shortDescription: 'Soul growth through developing authentic self-expression, creativity, and generous leadership.',
            detailedDescription: 'With the North Node in Leo, your soul\'s purpose is to develop authentic self-expression, creative abilities, and generous leadership. You\'re learning to shine your unique light, express yourself creatively, and lead with heart-centered confidence. Your karmic path involves moving away from hiding in groups or suppressing your individuality and developing the courage to be seen and appreciated. You\'re meant to cultivate creativity, express your authentic self, and inspire others through your example.',
            keywords: ['Creative', 'Expressive', 'Confident', 'Generous', 'Leadership', 'Authentic', 'Inspiring'],
            strengths: ['Developing creativity', 'Authentic self-expression', 'Generous leadership', 'Inspiring others', 'Confident presence'],
            challenges: ['Overcoming fear of attention', 'Learning to lead', 'Developing confidence', 'Expressing authentically', 'Balancing ego'],
            lifeAreas: ['Creative expression', 'Leadership development', 'Authentic self-presentation', 'Inspiring others', 'Generous giving'],
            expression: {
                positive: ['Authentic creative leadership', 'Generous self-expression', 'Inspiring confidence', 'Heart-centered giving'],
                negative: ['Attention-seeking behavior', 'Ego-driven expression', 'Demanding recognition', 'Dramatic excess']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Humble Servant',
            shortDescription: 'Soul growth through developing service, attention to detail, and practical wisdom.',
            detailedDescription: 'With the North Node in Virgo, your soul\'s purpose is to develop service orientation, attention to detail, and practical wisdom. You\'re learning to be helpful, organized, and focused on improvement and healing. Your karmic path involves moving away from scattered or overly idealistic approaches and developing the discipline of practical service. You\'re meant to cultivate humility, pay attention to details, and serve others through your skills and knowledge.',
            keywords: ['Service-oriented', 'Detailed', 'Practical', 'Helpful', 'Organized', 'Humble', 'Healing'],
            strengths: ['Developing service orientation', 'Attention to detail', 'Practical skills', 'Helpful nature', 'Organized approach'],
            challenges: ['Overcoming perfectionism', 'Learning humility', 'Developing focus', 'Serving others', 'Managing criticism'],
            lifeAreas: ['Service development', 'Skill refinement', 'Health and healing', 'Practical organization', 'Humble assistance'],
            expression: {
                positive: ['Humble service', 'Practical help', 'Detailed excellence', 'Healing assistance'],
                negative: ['Perfectionist criticism', 'Nitpicking behavior', 'Self-sacrificing service', 'Anxious worry']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Harmonious Partner',
            shortDescription: 'Soul growth through developing cooperation, balance, and relationship wisdom.',
            detailedDescription: 'With the North Node in Libra, your soul\'s purpose is to develop cooperation, diplomatic skills, and the wisdom of balanced relationships. You\'re learning to consider others\' perspectives, create harmony, and work as part of a team. Your karmic path involves moving away from overly independent or aggressive approaches and developing the art of compromise and collaboration. You\'re meant to cultivate diplomacy, appreciate beauty, and create win-win solutions.',
            keywords: ['Cooperative', 'Diplomatic', 'Balanced', 'Harmonious', 'Partnership', 'Fair', 'Aesthetic'],
            strengths: ['Developing cooperation', 'Diplomatic skills', 'Creating balance', 'Partnership wisdom', 'Aesthetic appreciation'],
            challenges: ['Overcoming independence', 'Learning compromise', 'Developing diplomacy', 'Creating harmony', 'Balancing needs'],
            lifeAreas: ['Relationship development', 'Diplomatic skills', 'Aesthetic appreciation', 'Cooperative ventures', 'Balance creation'],
            expression: {
                positive: ['Wise cooperation', 'Diplomatic harmony', 'Balanced partnerships', 'Fair collaboration'],
                negative: ['Indecisive people-pleasing', 'Conflict avoidance', 'Codependent relationships', 'Superficial harmony']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Deep Transformer',
            shortDescription: 'Soul growth through developing emotional depth, transformation, and psychological wisdom.',
            detailedDescription: 'With the North Node in Scorpio, your soul\'s purpose is to develop emotional depth, transformative abilities, and psychological insight. You\'re learning to face your shadows, embrace change, and understand the deeper mysteries of life. Your karmic path involves moving away from surface-level or overly comfortable approaches and developing the courage to dive deep into emotional and spiritual transformation. You\'re meant to cultivate intensity, embrace regeneration, and help others through crisis.',
            keywords: ['Deep', 'Transformative', 'Intense', 'Psychological', 'Regenerative', 'Mysterious', 'Powerful'],
            strengths: ['Developing emotional depth', 'Transformative abilities', 'Psychological insight', 'Crisis management', 'Regenerative power'],
            challenges: ['Overcoming surface living', 'Embracing intensity', 'Facing shadows', 'Managing power', 'Trusting transformation'],
            lifeAreas: ['Emotional transformation', 'Psychological development', 'Crisis healing', 'Deep relationships', 'Regenerative work'],
            expression: {
                positive: ['Wise transformation', 'Deep healing', 'Psychological insight', 'Regenerative power'],
                negative: ['Obsessive intensity', 'Manipulative power', 'Destructive transformation', 'Emotional extremes']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Wisdom Seeker',
            shortDescription: 'Soul growth through developing philosophical wisdom, exploration, and teaching abilities.',
            detailedDescription: 'With the North Node in Sagittarius, your soul\'s purpose is to develop philosophical wisdom, adventurous spirit, and teaching abilities. You\'re learning to seek truth, expand your horizons, and share your discoveries with others. Your karmic path involves moving away from getting lost in details or local concerns and developing the vision to see the bigger picture. You\'re meant to cultivate optimism, explore new territories, and become a teacher of wisdom.',
            keywords: ['Philosophical', 'Adventurous', 'Optimistic', 'Teaching', 'Exploring', 'Wise', 'Expansive'],
            strengths: ['Developing wisdom', 'Adventurous exploration', 'Teaching abilities', 'Philosophical insight', 'Optimistic vision'],
            challenges: ['Overcoming narrow focus', 'Learning to explore', 'Developing optimism', 'Sharing wisdom', 'Seeing big picture'],
            lifeAreas: ['Philosophical development', 'Adventure and travel', 'Teaching and sharing', 'Wisdom seeking', 'Cultural exploration'],
            expression: {
                positive: ['Wise teaching', 'Adventurous exploration', 'Philosophical insight', 'Optimistic sharing'],
                negative: ['Dogmatic preaching', 'Reckless adventure', 'Philosophical arrogance', 'Unrealistic optimism']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Responsible Leader',
            shortDescription: 'Soul growth through developing discipline, responsibility, and authentic authority.',
            detailedDescription: 'With the North Node in Capricorn, your soul\'s purpose is to develop discipline, responsibility, and authentic authority. You\'re learning to set goals, work persistently, and take on leadership responsibilities. Your karmic path involves moving away from emotional dependency or avoiding responsibility and developing the maturity to lead and achieve. You\'re meant to cultivate patience, build lasting structures, and earn respect through consistent effort.',
            keywords: ['Disciplined', 'Responsible', 'Authoritative', 'Goal-oriented', 'Mature', 'Persistent', 'Structured'],
            strengths: ['Developing discipline', 'Taking responsibility', 'Building authority', 'Goal achievement', 'Mature leadership'],
            challenges: ['Overcoming emotional dependency', 'Learning discipline', 'Taking responsibility', 'Building patience', 'Earning respect'],
            lifeAreas: ['Leadership development', 'Goal achievement', 'Responsibility taking', 'Structure building', 'Authority earning'],
            expression: {
                positive: ['Responsible leadership', 'Disciplined achievement', 'Mature authority', 'Structured progress'],
                negative: ['Authoritarian control', 'Rigid discipline', 'Cold responsibility', 'Ruthless ambition']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Humanitarian Innovator',
            shortDescription: 'Soul growth through developing humanitarian consciousness, innovation, and group service.',
            detailedDescription: 'With the North Node in Aquarius, your soul\'s purpose is to develop humanitarian consciousness, innovative thinking, and service to groups and humanity. You\'re learning to think beyond personal concerns, embrace progressive ideas, and work for the collective good. Your karmic path involves moving away from ego-centered or overly dramatic approaches and developing the wisdom of detached service. You\'re meant to cultivate objectivity, embrace innovation, and serve humanity.',
            keywords: ['Humanitarian', 'Innovative', 'Progressive', 'Objective', 'Group-oriented', 'Detached', 'Service'],
            strengths: ['Developing humanitarian consciousness', 'Innovative thinking', 'Group service', 'Progressive vision', 'Objective perspective'],
            challenges: ['Overcoming ego-centeredness', 'Learning detachment', 'Serving groups', 'Embracing innovation', 'Thinking collectively'],
            lifeAreas: ['Humanitarian service', 'Group involvement', 'Innovation development', 'Progressive causes', 'Collective consciousness'],
            expression: {
                positive: ['Wise humanitarian service', 'Progressive innovation', 'Objective group leadership', 'Collective consciousness'],
                negative: ['Detached coldness', 'Rebellious innovation', 'Group manipulation', 'Utopian idealism']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Compassionate Mystic',
            shortDescription: 'Soul growth through developing compassion, spirituality, and transcendent service.',
            detailedDescription: 'With the North Node in Pisces, your soul\'s purpose is to develop compassion, spiritual understanding, and transcendent service. You\'re learning to trust your intuition, surrender to higher guidance, and serve through love and compassion. Your karmic path involves moving away from overly analytical or critical approaches and developing the wisdom of the heart. You\'re meant to cultivate faith, embrace mystery, and serve through unconditional love.',
            keywords: ['Compassionate', 'Spiritual', 'Intuitive', 'Transcendent', 'Surrendering', 'Mystical', 'Loving'],
            strengths: ['Developing compassion', 'Spiritual growth', 'Intuitive wisdom', 'Transcendent service', 'Unconditional love'],
            challenges: ['Overcoming criticism', 'Learning surrender', 'Trusting intuition', 'Developing faith', 'Serving unconditionally'],
            lifeAreas: ['Spiritual development', 'Compassionate service', 'Intuitive growth', 'Transcendent practices', 'Unconditional love'],
            expression: {
                positive: ['Wise compassion', 'Spiritual service', 'Intuitive guidance', 'Transcendent love'],
                negative: ['Victim consciousness', 'Spiritual escapism', 'Boundary confusion', 'Emotional overwhelm']
            }
        }
    },
    [Planet.SouthNode]: {
        [ZodiacSign.Aries]: {
            meaning: 'Past Independence',
            shortDescription: 'Past-life mastery of independence and leadership, learning to balance with cooperation.',
            detailedDescription: 'With the South Node in Aries, you bring natural independence, courage, and leadership abilities from past lives. You\'re comfortable taking initiative and acting on your own, but your soul\'s growth requires learning to cooperate, consider others, and work in partnership. Your challenge is to release excessive self-focus and develop the ability to share leadership and make decisions collaboratively. You have innate courage but must learn when to compromise.',
            keywords: ['Independent', 'Courageous', 'Self-reliant', 'Pioneering', 'Assertive', 'Individual', 'Direct'],
            strengths: ['Natural independence', 'Innate courage', 'Leadership abilities', 'Quick decision-making', 'Self-reliance'],
            challenges: ['Releasing excessive independence', 'Learning cooperation', 'Developing diplomacy', 'Considering others', 'Sharing leadership'],
            lifeAreas: ['Moving from solo to partnership', 'Balancing self with others', 'Developing cooperation', 'Learning compromise', 'Sharing power'],
            expression: {
                positive: ['Using courage wisely', 'Leading when appropriate', 'Balanced independence', 'Confident cooperation'],
                negative: ['Excessive self-focus', 'Refusing cooperation', 'Aggressive independence', 'Selfish behavior']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Past Stability',
            shortDescription: 'Past-life mastery of material security and patience, learning to embrace transformation.',
            detailedDescription: 'With the South Node in Taurus, you bring natural patience, practical wisdom, and material security from past lives. You\'re comfortable with stability and building lasting value, but your soul\'s growth requires learning to embrace change, transformation, and emotional depth. Your challenge is to release attachment to material comfort and develop the courage to face intensity and crisis. You have innate stability but must learn when to let go.',
            keywords: ['Stable', 'Patient', 'Practical', 'Material', 'Comfortable', 'Persistent', 'Grounded'],
            strengths: ['Natural patience', 'Practical wisdom', 'Material security', 'Stable approach', 'Persistent effort'],
            challenges: ['Releasing material attachment', 'Embracing change', 'Developing emotional depth', 'Facing intensity', 'Letting go'],
            lifeAreas: ['Moving from comfort to transformation', 'Releasing material focus', 'Embracing emotional depth', 'Learning to let go', 'Facing crisis'],
            expression: {
                positive: ['Using stability wisely', 'Practical when needed', 'Balanced materialism', 'Grounded transformation'],
                negative: ['Excessive materialism', 'Stubborn resistance', 'Avoiding change', 'Comfort addiction']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Past Communication',
            shortDescription: 'Past-life mastery of communication and learning, developing philosophical wisdom.',
            detailedDescription: 'With the South Node in Gemini, you bring natural communication skills, intellectual curiosity, and versatility from past lives. You\'re comfortable gathering information and connecting ideas, but your soul\'s growth requires learning to seek deeper meaning, develop philosophical wisdom, and teach from experience. Your challenge is to release scattered thinking and develop the ability to see the bigger picture. You have innate communication skills but must learn when to go deep.',
            keywords: ['Communicative', 'Curious', 'Versatile', 'Intellectual', 'Connecting', 'Adaptable', 'Learning'],
            strengths: ['Natural communication', 'Intellectual curiosity', 'Versatile thinking', 'Information gathering', 'Social connection'],
            challenges: ['Releasing scattered focus', 'Developing depth', 'Seeking meaning', 'Teaching wisdom', 'Seeing big picture'],
            lifeAreas: ['Moving from facts to wisdom', 'Developing philosophical depth', 'Teaching from experience', 'Seeking meaning', 'Big picture thinking'],
            expression: {
                positive: ['Using communication wisely', 'Sharing knowledge', 'Balanced curiosity', 'Meaningful connection'],
                negative: ['Scattered thinking', 'Superficial knowledge', 'Information overload', 'Avoiding depth']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Past Nurturing',
            shortDescription: 'Past-life mastery of nurturing and emotions, learning to develop authority and structure.',
            detailedDescription: 'With the South Node in Cancer, you bring natural nurturing abilities, emotional intelligence, and family wisdom from past lives. You\'re comfortable caring for others and creating emotional security, but your soul\'s growth requires learning to develop authority, take responsibility, and build public achievement. Your challenge is to release emotional dependency and develop the maturity to lead. You have innate empathy but must learn when to be strong.',
            keywords: ['Nurturing', 'Emotional', 'Protective', 'Family-oriented', 'Caring', 'Intuitive', 'Sensitive'],
            strengths: ['Natural nurturing', 'Emotional intelligence', 'Protective instincts', 'Family wisdom', 'Intuitive understanding'],
            challenges: ['Releasing emotional dependency', 'Developing authority', 'Taking responsibility', 'Building achievement', 'Leading maturely'],
            lifeAreas: ['Moving from private to public', 'Developing authority', 'Taking responsibility', 'Building achievement', 'Mature leadership'],
            expression: {
                positive: ['Using empathy wisely', 'Nurturing when appropriate', 'Balanced emotions', 'Responsible care'],
                negative: ['Emotional manipulation', 'Overprotective behavior', 'Avoiding responsibility', 'Clinging to family']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Past Creativity',
            shortDescription: 'Past-life mastery of self-expression and leadership, learning humanitarian service.',
            detailedDescription: 'With the South Node in Leo, you bring natural creativity, confidence, and leadership abilities from past lives. You\'re comfortable being in the spotlight and expressing yourself dramatically, but your soul\'s growth requires learning to serve groups, embrace innovation, and work for collective good. Your challenge is to release ego-driven behavior and develop the wisdom of detached service. You have innate creativity but must learn when to step back.',
            keywords: ['Creative', 'Confident', 'Expressive', 'Dramatic', 'Leadership', 'Individual', 'Attention-seeking'],
            strengths: ['Natural creativity', 'Confident expression', 'Leadership abilities', 'Dramatic flair', 'Individual strength'],
            challenges: ['Releasing ego focus', 'Serving groups', 'Developing detachment', 'Working collectively', 'Embracing innovation'],
            lifeAreas: ['Moving from individual to collective', 'Serving humanity', 'Developing objectivity', 'Group consciousness', 'Progressive thinking'],
            expression: {
                positive: ['Using creativity wisely', 'Leading when needed', 'Balanced confidence', 'Humble service'],
                negative: ['Excessive ego', 'Attention-seeking', 'Dramatic behavior', 'Refusing cooperation']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Past Service',
            shortDescription: 'Past-life mastery of service and details, learning to embrace faith and spirituality.',
            detailedDescription: 'With the South Node in Virgo, you bring natural service orientation, analytical abilities, and attention to detail from past lives. You\'re comfortable being helpful and organized, but your soul\'s growth requires learning to trust intuition, embrace spirituality, and surrender to higher guidance. Your challenge is to release perfectionist control and develop faith in the unseen. You have innate practical skills but must learn when to let go.',
            keywords: ['Service-oriented', 'Analytical', 'Detailed', 'Practical', 'Helpful', 'Organized', 'Critical'],
            strengths: ['Natural service', 'Analytical abilities', 'Attention to detail', 'Practical skills', 'Helpful nature'],
            challenges: ['Releasing perfectionism', 'Developing faith', 'Trusting intuition', 'Embracing spirituality', 'Surrendering control'],
            lifeAreas: ['Moving from analysis to faith', 'Developing spirituality', 'Trusting intuition', 'Embracing mystery', 'Surrendering control'],
            expression: {
                positive: ['Using skills wisely', 'Serving when appropriate', 'Balanced analysis', 'Practical spirituality'],
                negative: ['Excessive criticism', 'Perfectionist control', 'Avoiding faith', 'Analytical paralysis']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Past Partnership',
            shortDescription: 'Past-life mastery of relationships and diplomacy, learning independence and self-assertion.',
            detailedDescription: 'With the South Node in Libra, you bring natural diplomatic abilities, relationship skills, and aesthetic appreciation from past lives. You\'re comfortable in partnerships and creating harmony, but your soul\'s growth requires learning to be independent, assert yourself, and make decisions without constant consultation. Your challenge is to release codependency and develop the courage to stand alone. You have innate diplomacy but must learn when to be direct.',
            keywords: ['Diplomatic', 'Cooperative', 'Harmonious', 'Partnership-oriented', 'Balanced', 'Aesthetic', 'Indecisive'],
            strengths: ['Natural diplomacy', 'Relationship skills', 'Creating harmony', 'Aesthetic sense', 'Cooperative abilities'],
            challenges: ['Releasing codependency', 'Developing independence', 'Asserting self', 'Making decisions', 'Standing alone'],
            lifeAreas: ['Moving from partnership to independence', 'Developing self-assertion', 'Making own decisions', 'Standing alone', 'Direct action'],
            expression: {
                positive: ['Using diplomacy wisely', 'Cooperating when appropriate', 'Balanced relationships', 'Independent cooperation'],
                negative: ['Codependent behavior', 'Indecisiveness', 'People-pleasing', 'Avoiding confrontation']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Past Intensity',
            shortDescription: 'Past-life mastery of transformation and depth, learning simplicity and material wisdom.',
            detailedDescription: 'With the South Node in Scorpio, you bring natural intensity, transformative abilities, and psychological insight from past lives. You\'re comfortable with crisis and emotional depth, but your soul\'s growth requires learning to appreciate simplicity, build stable security, and enjoy life\'s pleasures. Your challenge is to release obsessive intensity and develop the wisdom of peaceful stability. You have innate depth but must learn when to be light.',
            keywords: ['Intense', 'Transformative', 'Deep', 'Psychological', 'Powerful', 'Obsessive', 'Crisis-oriented'],
            strengths: ['Natural intensity', 'Transformative abilities', 'Psychological insight', 'Crisis management', 'Deep understanding'],
            challenges: ['Releasing obsession', 'Developing simplicity', 'Building stability', 'Enjoying pleasures', 'Being peaceful'],
            lifeAreas: ['Moving from crisis to peace', 'Developing simplicity', 'Building stability', 'Enjoying life', 'Material wisdom'],
            expression: {
                positive: ['Using depth wisely', 'Transforming when needed', 'Balanced intensity', 'Peaceful power'],
                negative: ['Obsessive behavior', 'Creating crisis', 'Avoiding simplicity', 'Intensity addiction']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Past Wisdom',
            shortDescription: 'Past-life mastery of philosophy and exploration, learning practical details and service.',
            detailedDescription: 'With the South Node in Sagittarius, you bring natural philosophical wisdom, adventurous spirit, and teaching abilities from past lives. You\'re comfortable with big-picture thinking and exploration, but your soul\'s growth requires learning to pay attention to details, serve practically, and focus on immediate needs. Your challenge is to release dogmatic thinking and develop the humility of practical service. You have innate wisdom but must learn when to be practical.',
            keywords: ['Philosophical', 'Adventurous', 'Wise', 'Teaching', 'Expansive', 'Optimistic', 'Dogmatic'],
            strengths: ['Natural wisdom', 'Philosophical insight', 'Teaching abilities', 'Adventurous spirit', 'Big-picture thinking'],
            challenges: ['Releasing dogmatism', 'Developing practicality', 'Paying attention to details', 'Serving humbly', 'Focusing locally'],
            lifeAreas: ['Moving from theory to practice', 'Developing practical service', 'Attention to details', 'Humble assistance', 'Local focus'],
            expression: {
                positive: ['Using wisdom wisely', 'Teaching when appropriate', 'Balanced philosophy', 'Practical wisdom'],
                negative: ['Dogmatic preaching', 'Avoiding details', 'Impractical idealism', 'Refusing service']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Past Authority',
            shortDescription: 'Past-life mastery of leadership and structure, learning emotional nurturing and family wisdom.',
            detailedDescription: 'With the South Node in Capricorn, you bring natural authority, discipline, and achievement abilities from past lives. You\'re comfortable with responsibility and public success, but your soul\'s growth requires learning to nurture emotionally, create family bonds, and honor feelings. Your challenge is to release rigid control and develop the warmth of emotional connection. You have innate authority but must learn when to be vulnerable.',
            keywords: ['Authoritative', 'Disciplined', 'Responsible', 'Structured', 'Achieving', 'Rigid', 'Controlling'],
            strengths: ['Natural authority', 'Disciplined approach', 'Responsibility taking', 'Achievement abilities', 'Structural thinking'],
            challenges: ['Releasing rigid control', 'Developing emotional warmth', 'Nurturing others', 'Creating family bonds', 'Being vulnerable'],
            lifeAreas: ['Moving from public to private', 'Developing emotional intelligence', 'Nurturing relationships', 'Family creation', 'Emotional vulnerability'],
            expression: {
                positive: ['Using authority wisely', 'Leading when appropriate', 'Balanced responsibility', 'Warm leadership'],
                negative: ['Rigid control', 'Emotional coldness', 'Avoiding vulnerability', 'Authoritarian behavior']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Past Innovation',
            shortDescription: 'Past-life mastery of humanitarian service and innovation, learning personal creativity and leadership.',
            detailedDescription: 'With the South Node in Aquarius, you bring natural humanitarian consciousness, innovative thinking, and group service from past lives. You\'re comfortable with detachment and collective work, but your soul\'s growth requires learning to express yourself creatively, lead from the heart, and honor individual uniqueness. Your challenge is to release emotional detachment and develop the courage of personal expression. You have innate objectivity but must learn when to be personal.',
            keywords: ['Humanitarian', 'Innovative', 'Detached', 'Group-oriented', 'Progressive', 'Objective', 'Impersonal'],
            strengths: ['Natural humanitarian consciousness', 'Innovative thinking', 'Group service', 'Objective perspective', 'Progressive vision'],
            challenges: ['Releasing detachment', 'Developing personal expression', 'Leading from heart', 'Honoring individuality', 'Being creative'],
            lifeAreas: ['Moving from collective to individual', 'Developing creative expression', 'Personal leadership', 'Heart-centered action', 'Individual uniqueness'],
            expression: {
                positive: ['Using innovation wisely', 'Serving when appropriate', 'Balanced objectivity', 'Personal service'],
                negative: ['Emotional detachment', 'Avoiding personal expression', 'Impersonal behavior', 'Refusing leadership']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Past Spirituality',
            shortDescription: 'Past-life mastery of spirituality and compassion, learning practical service and analysis.',
            detailedDescription: 'With the South Node in Pisces, you bring natural spiritual understanding, compassion, and intuitive abilities from past lives. You\'re comfortable with transcendence and mystical experiences, but your soul\'s growth requires learning to be practical, serve in tangible ways, and develop analytical skills. Your challenge is to release escapist tendencies and develop the discipline of practical service. You have innate spirituality but must learn when to be grounded.',
            keywords: ['Spiritual', 'Compassionate', 'Intuitive', 'Transcendent', 'Mystical', 'Escapist', 'Boundary-less'],
            strengths: ['Natural spirituality', 'Compassionate nature', 'Intuitive abilities', 'Transcendent understanding', 'Mystical connection'],
            challenges: ['Releasing escapism', 'Developing practicality', 'Serving tangibly', 'Analytical thinking', 'Creating boundaries'],
            lifeAreas: ['Moving from transcendence to practicality', 'Developing analytical skills', 'Practical service', 'Grounded spirituality', 'Healthy boundaries'],
            expression: {
                positive: ['Using spirituality wisely', 'Compassion when appropriate', 'Balanced transcendence', 'Grounded service'],
                negative: ['Escapist behavior', 'Avoiding practicality', 'Boundary confusion', 'Victim consciousness']
            }
        }
    },
    [Planet.Chiron]: {
        [ZodiacSign.Aries]: {
            meaning: 'Wounded Warrior',
            shortDescription: 'Core wound around identity and self-assertion, healing gift of authentic courage and leadership.',
            detailedDescription: 'With Chiron in Aries, your deepest wound relates to your sense of identity, self-worth, and right to exist as an individual. You may have experienced early rejection, criticism of your natural assertiveness, or trauma around taking action. Your healing journey involves learning to assert yourself authentically without aggression, developing healthy self-confidence, and honoring your unique identity. Your gift to others is helping them find their courage, develop authentic leadership, and heal wounds related to self-assertion and independence.',
            keywords: ['Identity', 'Self-worth', 'Courage', 'Leadership', 'Independence', 'Assertion', 'Authenticity'],
            strengths: ['Healing identity wounds', 'Teaching authentic courage', 'Developing true leadership', 'Inspiring independence', 'Guiding self-assertion'],
            challenges: ['Identity confusion', 'Self-worth issues', 'Fear of assertion', 'Anger management', 'Independence struggles'],
            lifeAreas: ['Identity healing', 'Leadership development', 'Courage building', 'Self-assertion training', 'Independence coaching'],
            expression: {
                positive: ['Authentic leadership healing', 'Courageous self-expression', 'Identity empowerment', 'Assertiveness training'],
                negative: ['Identity crisis', 'Aggressive overcompensation', 'Self-worth destruction', 'Leadership wounds']
            }
        },
        [ZodiacSign.Taurus]: {
            meaning: 'Wounded Builder',
            shortDescription: 'Core wound around security and self-worth, healing gift of grounded stability and material wisdom.',
            detailedDescription: 'With Chiron in Taurus, your deepest wound relates to security, material stability, and physical self-worth. You may have experienced poverty, body shame, or trauma around basic needs and resources. Your healing journey involves learning to create genuine security from within, developing healthy relationship with material resources, and honoring your physical body. Your gift to others is helping them heal financial wounds, develop body acceptance, and create lasting stability through patient, grounded approaches.',
            keywords: ['Security', 'Self-worth', 'Material', 'Body', 'Stability', 'Resources', 'Grounding'],
            strengths: ['Healing security wounds', 'Teaching material wisdom', 'Body acceptance work', 'Stability building', 'Resource management'],
            challenges: ['Security anxiety', 'Material obsession', 'Body shame', 'Self-worth issues', 'Stability fears'],
            lifeAreas: ['Financial healing', 'Body acceptance', 'Security building', 'Material wisdom', 'Grounding practices'],
            expression: {
                positive: ['Grounded security healing', 'Material wisdom sharing', 'Body acceptance teaching', 'Stability guidance'],
                negative: ['Material obsession', 'Security hoarding', 'Body shame', 'Self-worth destruction']
            }
        },
        [ZodiacSign.Gemini]: {
            meaning: 'Wounded Communicator',
            shortDescription: 'Core wound around communication and learning, healing gift of authentic expression and teaching.',
            detailedDescription: 'With Chiron in Gemini, your deepest wound relates to communication, learning, and being heard or understood. You may have experienced ridicule for your ideas, learning difficulties, or trauma around speaking your truth. Your healing journey involves learning to communicate authentically, trusting your intelligence, and finding your unique voice. Your gift to others is helping them heal communication wounds, develop confidence in learning, and find their authentic expression through words, writing, or teaching.',
            keywords: ['Communication', 'Learning', 'Expression', 'Intelligence', 'Voice', 'Understanding', 'Teaching'],
            strengths: ['Healing communication wounds', 'Teaching authentic expression', 'Learning support', 'Voice development', 'Understanding facilitation'],
            challenges: ['Communication anxiety', 'Learning blocks', 'Voice suppression', 'Intelligence doubts', 'Expression fears'],
            lifeAreas: ['Communication healing', 'Learning support', 'Voice development', 'Expression therapy', 'Teaching healing'],
            expression: {
                positive: ['Authentic communication healing', 'Learning empowerment', 'Voice liberation', 'Expression guidance'],
                negative: ['Communication blocks', 'Learning anxiety', 'Voice suppression', 'Expression wounds']
            }
        },
        [ZodiacSign.Cancer]: {
            meaning: 'Wounded Nurturer',
            shortDescription: 'Core wound around nurturing and belonging, healing gift of emotional wisdom and family healing.',
            detailedDescription: 'With Chiron in Cancer, your deepest wound relates to nurturing, family, and emotional belonging. You may have experienced family dysfunction, abandonment, or trauma around receiving or giving care. Your healing journey involves learning to nurture yourself and others in healthy ways, creating chosen family, and healing generational patterns. Your gift to others is helping them heal family wounds, develop emotional intelligence, and create nurturing environments where authentic belonging can flourish.',
            keywords: ['Nurturing', 'Family', 'Belonging', 'Emotions', 'Care', 'Home', 'Generational'],
            strengths: ['Healing family wounds', 'Teaching emotional wisdom', 'Nurturing guidance', 'Belonging creation', 'Generational healing'],
            challenges: ['Family trauma', 'Nurturing wounds', 'Belonging issues', 'Emotional overwhelm', 'Care difficulties'],
            lifeAreas: ['Family healing', 'Emotional therapy', 'Nurturing development', 'Home creation', 'Generational work'],
            expression: {
                positive: ['Family healing wisdom', 'Emotional nurturing', 'Belonging creation', 'Generational healing'],
                negative: ['Family dysfunction', 'Nurturing wounds', 'Emotional overwhelm', 'Belonging desperation']
            }
        },
        [ZodiacSign.Leo]: {
            meaning: 'Wounded Creator',
            shortDescription: 'Core wound around self-expression and recognition, healing gift of authentic creativity and heart-centered leadership.',
            detailedDescription: 'With Chiron in Leo, your deepest wound relates to creative self-expression, recognition, and being seen for who you truly are. You may have experienced shame around your creativity, lack of recognition, or trauma around self-expression. Your healing journey involves learning to express yourself authentically without needing external validation, developing genuine self-love, and honoring your creative gifts. Your gift to others is helping them heal creative wounds, develop authentic self-expression, and find the courage to shine their unique light.',
            keywords: ['Creativity', 'Self-expression', 'Recognition', 'Authenticity', 'Self-love', 'Uniqueness', 'Visibility'],
            strengths: ['Healing creative wounds', 'Teaching authentic expression', 'Self-love development', 'Recognition healing', 'Uniqueness celebration'],
            challenges: ['Creative blocks', 'Recognition wounds', 'Self-expression fears', 'Visibility anxiety', 'Self-love struggles'],
            lifeAreas: ['Creative healing', 'Self-expression therapy', 'Recognition work', 'Authenticity development', 'Self-love practices'],
            expression: {
                positive: ['Creative healing wisdom', 'Authentic self-expression', 'Self-love teaching', 'Recognition healing'],
                negative: ['Creative wounds', 'Expression blocks', 'Recognition desperation', 'Self-love deficiency']
            }
        },
        [ZodiacSign.Virgo]: {
            meaning: 'Wounded Healer',
            shortDescription: 'Core wound around perfectionism and service, healing gift of practical wisdom and holistic healing.',
            detailedDescription: 'With Chiron in Virgo, your deepest wound relates to perfectionism, criticism, and feeling never good enough despite your efforts to serve and improve. You may have experienced harsh criticism, health issues, or trauma around work and service. Your healing journey involves learning to accept imperfection, develop self-compassion, and serve from wholeness rather than woundedness. Your gift to others is helping them heal perfectionist wounds, develop practical wisdom, and find meaning through authentic service and holistic approaches to health and healing.',
            keywords: ['Perfectionism', 'Service', 'Health', 'Criticism', 'Improvement', 'Wholeness', 'Practical'],
            strengths: ['Healing perfectionist wounds', 'Teaching practical wisdom', 'Health and healing work', 'Service guidance', 'Wholeness integration'],
            challenges: ['Perfectionist anxiety', 'Critical self-talk', 'Health obsession', 'Service wounds', 'Improvement compulsion'],
            lifeAreas: ['Perfectionism healing', 'Health and wellness', 'Service development', 'Practical wisdom', 'Holistic healing'],
            expression: {
                positive: ['Practical healing wisdom', 'Holistic health guidance', 'Service from wholeness', 'Perfectionism healing'],
                negative: ['Perfectionist wounds', 'Critical destruction', 'Health anxiety', 'Service martyrdom']
            }
        },
        [ZodiacSign.Libra]: {
            meaning: 'Wounded Peacemaker',
            shortDescription: 'Core wound around relationships and fairness, healing gift of authentic partnership and justice wisdom.',
            detailedDescription: 'With Chiron in Libra, your deepest wound relates to relationships, fairness, and finding balance between self and others. You may have experienced betrayal, injustice, or trauma around partnerships and cooperation. Your healing journey involves learning to create authentic relationships based on mutual respect, developing healthy boundaries, and standing up for true justice. Your gift to others is helping them heal relationship wounds, develop partnership skills, and create balance between individual needs and collective harmony.',
            keywords: ['Relationships', 'Partnership', 'Balance', 'Justice', 'Fairness', 'Cooperation', 'Harmony'],
            strengths: ['Healing relationship wounds', 'Teaching partnership wisdom', 'Justice advocacy', 'Balance creation', 'Cooperation guidance'],
            challenges: ['Relationship trauma', 'Codependency patterns', 'Justice wounds', 'Balance struggles', 'Partnership fears'],
            lifeAreas: ['Relationship healing', 'Partnership development', 'Justice work', 'Balance creation', 'Cooperation training'],
            expression: {
                positive: ['Relationship healing wisdom', 'Authentic partnership', 'Justice advocacy', 'Balance teaching'],
                negative: ['Relationship wounds', 'Codependent patterns', 'Justice obsession', 'Balance destruction']
            }
        },
        [ZodiacSign.Scorpio]: {
            meaning: 'Wounded Transformer',
            shortDescription: 'Core wound around power and transformation, healing gift of deep healing and regenerative wisdom.',
            detailedDescription: 'With Chiron in Scorpio, your deepest wound relates to power, transformation, and experiences of betrayal, abuse, or loss. You may have experienced trauma around trust, sexuality, or death and rebirth processes. Your healing journey involves learning to reclaim your power authentically, trust the transformation process, and use your depth for healing rather than destruction. Your gift to others is helping them navigate their darkest moments, heal from trauma, and emerge transformed with greater wisdom and compassion.',
            keywords: ['Power', 'Transformation', 'Trust', 'Depth', 'Healing', 'Regeneration', 'Wisdom'],
            strengths: ['Deep trauma healing', 'Transformation guidance', 'Power reclamation', 'Trust rebuilding', 'Regenerative wisdom'],
            challenges: ['Power wounds', 'Trust issues', 'Transformation fears', 'Depth overwhelm', 'Healing resistance'],
            lifeAreas: ['Trauma healing', 'Power work', 'Transformation guidance', 'Trust building', 'Deep therapy'],
            expression: {
                positive: ['Deep healing wisdom', 'Transformation mastery', 'Power healing', 'Trust restoration'],
                negative: ['Power wounds', 'Transformation trauma', 'Trust destruction', 'Healing obsession']
            }
        },
        [ZodiacSign.Sagittarius]: {
            meaning: 'Wounded Seeker',
            shortDescription: 'Core wound around meaning and truth, healing gift of wisdom teaching and spiritual guidance.',
            detailedDescription: 'With Chiron in Sagittarius, your deepest wound relates to meaning, truth, and spiritual or philosophical understanding. You may have experienced disillusionment with belief systems, educational trauma, or loss of faith and meaning. Your healing journey involves finding your own truth, developing personal philosophy, and integrating wisdom from your search for meaning. Your gift to others is helping them heal spiritual wounds, find their own truth, and develop a personal relationship with meaning and purpose that transcends dogma.',
            keywords: ['Meaning', 'Truth', 'Wisdom', 'Philosophy', 'Spirituality', 'Teaching', 'Purpose'],
            strengths: ['Spiritual wound healing', 'Wisdom teaching', 'Truth seeking', 'Meaning creation', 'Purpose guidance'],
            challenges: ['Spiritual disillusionment', 'Truth confusion', 'Meaning crisis', 'Faith wounds', 'Purpose struggles'],
            lifeAreas: ['Spiritual healing', 'Wisdom teaching', 'Truth seeking', 'Meaning work', 'Purpose development'],
            expression: {
                positive: ['Wisdom healing teaching', 'Truth integration', 'Meaning creation', 'Spiritual guidance'],
                negative: ['Spiritual wounds', 'Truth obsession', 'Meaning desperation', 'Faith destruction']
            }
        },
        [ZodiacSign.Capricorn]: {
            meaning: 'Wounded Authority',
            shortDescription: 'Core wound around authority and achievement, healing gift of authentic leadership and structural wisdom.',
            detailedDescription: 'With Chiron in Capricorn, your deepest wound relates to authority, achievement, and recognition in the world. You may have experienced failure, criticism from authority figures, or trauma around success and responsibility. Your healing journey involves learning to develop authentic authority, redefine success on your own terms, and take responsibility without carrying the world on your shoulders. Your gift to others is helping them heal authority wounds, develop genuine leadership, and create structures that serve rather than oppress.',
            keywords: ['Authority', 'Achievement', 'Leadership', 'Responsibility', 'Success', 'Structure', 'Recognition'],
            strengths: ['Authority wound healing', 'Leadership development', 'Success redefinition', 'Responsibility guidance', 'Structure creation'],
            challenges: ['Authority trauma', 'Achievement wounds', 'Success fears', 'Responsibility overwhelm', 'Leadership anxiety'],
            lifeAreas: ['Leadership healing', 'Authority development', 'Success work', 'Responsibility training', 'Structure building'],
            expression: {
                positive: ['Authentic authority healing', 'Leadership wisdom', 'Success integration', 'Responsibility mastery'],
                negative: ['Authority wounds', 'Achievement obsession', 'Success destruction', 'Responsibility avoidance']
            }
        },
        [ZodiacSign.Aquarius]: {
            meaning: 'Wounded Innovator',
            shortDescription: 'Core wound around belonging and uniqueness, healing gift of authentic individuality and group healing.',
            detailedDescription: 'With Chiron in Aquarius, your deepest wound relates to belonging, acceptance of your uniqueness, and finding your place in groups or society. You may have experienced rejection for being different, trauma around friendship, or feeling like an outsider. Your healing journey involves learning to honor your uniqueness while finding authentic community, developing healthy detachment, and using your differences to serve humanity. Your gift to others is helping them heal wounds around belonging, embrace their uniqueness, and find their tribe.',
            keywords: ['Belonging', 'Uniqueness', 'Community', 'Innovation', 'Friendship', 'Individuality', 'Acceptance'],
            strengths: ['Belonging wound healing', 'Uniqueness celebration', 'Community building', 'Innovation guidance', 'Friendship healing'],
            challenges: ['Belonging wounds', 'Uniqueness shame', 'Community rejection', 'Innovation fears', 'Friendship trauma'],
            lifeAreas: ['Belonging healing', 'Uniqueness work', 'Community building', 'Innovation development', 'Friendship therapy'],
            expression: {
                positive: ['Uniqueness healing wisdom', 'Community creation', 'Innovation guidance', 'Belonging facilitation'],
                negative: ['Belonging wounds', 'Uniqueness rejection', 'Community isolation', 'Innovation blocks']
            }
        },
        [ZodiacSign.Pisces]: {
            meaning: 'Wounded Mystic',
            shortDescription: 'Core wound around spirituality and boundaries, healing gift of compassionate healing and transcendent wisdom.',
            detailedDescription: 'With Chiron in Pisces, your deepest wound relates to spirituality, boundaries, and connection to the divine or universal consciousness. You may have experienced spiritual abuse, boundary violations, or trauma around sensitivity and empathy. Your healing journey involves learning to maintain healthy boundaries while staying open-hearted, developing discernment in spiritual matters, and using your sensitivity as a gift rather than a burden. Your gift to others is helping them heal spiritual wounds, develop healthy boundaries, and access their innate compassion and intuitive wisdom.',
            keywords: ['Spirituality', 'Boundaries', 'Compassion', 'Sensitivity', 'Intuition', 'Healing', 'Transcendence'],
            strengths: ['Spiritual wound healing', 'Boundary development', 'Compassion teaching', 'Sensitivity guidance', 'Intuitive healing'],
            challenges: ['Spiritual trauma', 'Boundary confusion', 'Sensitivity overwhelm', 'Compassion fatigue', 'Intuitive blocks'],
            lifeAreas: ['Spiritual healing', 'Boundary work', 'Compassion development', 'Sensitivity training', 'Intuitive guidance'],
            expression: {
                positive: ['Spiritual healing wisdom', 'Boundary mastery', 'Compassionate guidance', 'Intuitive teaching'],
                negative: ['Spiritual wounds', 'Boundary violation', 'Sensitivity overwhelm', 'Compassion depletion']
            }
        }
    }
};