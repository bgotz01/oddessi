//lib/astrology/interpretations/life-cycles.ts

import { Planet } from '@/types/astrology';
import { HOUSE_DEFINITIONS, PLANET_DEFINITIONS, getHouseName } from '../standard-definitions';

export interface LifeCycleInterpretation {
    title: string;

    // Fields that match UI headers exactly
    overview?: string;                    // Overview paragraph (not a header, but the main description)
    coreLesson?: string;                 // "Core Lesson" - center of gravity
    keyThemes?: string[];                // "Key Themes" (Column 1)
    growthOpportunities?: string[];      // "Growth & Opportunities" (Column 2) 
    guidance?: string[];                 // "Guidance" (subsection in Daily Integration)
    watchFor?: string[];                 // "Watch For" (subsection in Daily Integration)
    howThisShowsUp?: string[];          // "How This Tends to Show Up"
    helpfulResources?: string[];         // "Helpful Resources"
    timingPhases?: string;              // "Timing & Phases" - TODO: Consider making this structured: { phase: string; focus: string; markers?: string[] }[]
}

// Helper function to create fallback interpretation when we don't have a bespoke one
function createFallbackInterpretation(planet: Planet, houseNumber: number): LifeCycleInterpretation | null {
    const planetDef = PLANET_DEFINITIONS[planet];
    const houseDef = HOUSE_DEFINITIONS[houseNumber];
    const houseName = getHouseName(houseNumber);

    if (!planetDef || !houseDef || !houseName) return null;

    const ordinalSuffix = (n: number) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    };

    return {
        title: `${planet} in ${houseNumber}${ordinalSuffix(houseNumber)} House: ${planetDef.areas[0]} in ${houseName}`,
        overview: `This cycle brings ${planet}'s energy of ${planetDef.areas.slice(0, 2).join(' and ').toLowerCase()} into the realm of ${houseDef[0].toLowerCase()}. ${planetDef.character}`,
        keyThemes: [
            ...planetDef.areas.slice(0, 3),
            ...houseDef.slice(0, 2)
        ],
        growthOpportunities: [
            `Develop ${planetDef.areas[0].toLowerCase()} through ${houseDef[0].toLowerCase()}`,
            `Use ${planet}'s energy to transform your approach to ${houseDef[1]?.toLowerCase() || houseDef[0].toLowerCase()}`,
            `Build lasting foundations in ${houseName.toLowerCase()}`,
            `Integrate ${planetDef.areas[1]?.toLowerCase() || planetDef.areas[0].toLowerCase()} with practical life changes`
        ],
        guidance: [
            'Track patterns weekly rather than daily',
            'Keep choices simple and consistent during this cycle',
            'Focus on one major area of growth at a time',
            'Seek support from others who understand this type of development'
        ],
        watchFor: [
            'Overwhelm from trying to change too much at once',
            'Resistance to necessary changes',
            'Impatience with the natural timing of growth',
            'Avoiding the deeper work this cycle requires'
        ],
        howThisShowsUp: [
            `Changes in how you handle ${houseDef[0].toLowerCase()}`,
            `New opportunities related to ${houseDef[1]?.toLowerCase() || houseDef[0].toLowerCase()}`,
            `Increased focus on ${planetDef.areas[0].toLowerCase()}`,
            `Shifts in your approach to ${houseDef[2]?.toLowerCase() || houseDef[0].toLowerCase()}`
        ]
    };
}

// House Transit Interpretations - using explicit Planet enum values as keys
export const HOUSE_TRANSIT_INTERPRETATIONS: Record<string, LifeCycleInterpretation> = {
    // SATURN HOUSE TRANSITS
    [`${Planet.Saturn}-1`]: {
        title: 'Saturn in 1st House: Identity Restructuring',
        overview: 'A period of personal restructuring where you rebuild your identity, appearance, and approach to life. This cycle asks for maturity, discipline, and responsibility for who you are becoming.',
        coreLesson: 'Building authentic personal authority through disciplined self-development and taking full responsibility for your direction.',
        keyThemes: [
            'Identity & Self-Definition',
            'Personal Discipline',
            'Authentic Boundaries',
            'Long-Term Maturity',
            'Responsible Leadership'
        ],
        growthOpportunities: [
            'Strengthen self-trust through consistent daily effort',
            'Create a more mature self-image and personal standards',
            'Build durable habits for health, focus, and growth',
            'Commit to longer timelines for meaningful goals',
            'Develop leadership through demonstrated competence'
        ],
        guidance: [
            'Choose one identity upgrade to commit to this week (health, skill, appearance, discipline)',
            'Measure progress weekly, not daily - Saturn rewards consistency over speed',
            'Let discomfort be feedback, not proof you\'re failing',
            'Say no to roles that don\'t match your next chapter',
            'Ask daily: "What would the responsible version of me do right now?"'
        ],
        watchFor: [
            'Harsh self-judgment or imposter feelings',
            'Overwork or rigid perfectionism',
            'Isolation while you rebuild your identity',
            'Health signals you\'ve been ignoring',
            'Comparing your pace to others\' highlight reels'
        ],
        howThisShowsUp: [
            'Career direction shifts or heavier responsibility at work',
            'A serious health or fitness focus with measurable goals',
            'Changes in appearance, posture, or how you present yourself',
            'Ending relationships that don\'t respect your growth',
            'Choosing a more intentional living environment'
        ]
    },

    [`${Planet.Saturn}-2`]: {
        title: 'Saturn in 2nd House: Financial Mastery & Values Clarification',
        overview: 'A transformative period focused on building genuine financial security and clarifying your core values. This cycle teaches you to create sustainable wealth through discipline, skill-building, and aligning money with meaning.',
        coreLesson: 'Learning that true security comes from developing valuable skills and living according to your authentic values, not just accumulating possessions.',
        keyThemes: [
            'Financial Discipline & Planning',
            'Values-Based Decision Making',
            'Skill Development & Mastery',
            'Self-Worth & Money Relationship',
            'Sustainable Resource Management'
        ],
        growthOpportunities: [
            'Build a solid financial foundation through consistent saving and investing',
            'Develop marketable skills that increase your earning potential',
            'Clarify what truly matters to you versus what you think should matter',
            'Create multiple income streams based on your natural talents',
            'Transform your relationship with money from scarcity to abundance thinking'
        ],
        guidance: [
            'Track every expense for at least one month to understand your money patterns',
            'Invest in skills and education that will pay dividends for decades',
            'Make financial decisions based on your values, not social pressure',
            'Build an emergency fund before making any major purchases',
            'Ask before spending: "Does this align with who I\'m becoming?"'
        ],
        watchFor: [
            'Extreme frugality that prevents necessary investments in yourself',
            'Confusing net worth with self-worth',
            'Financial anxiety that paralyzes decision-making',
            'Spending money to fill emotional voids or prove your worth',
            'Avoiding money conversations or financial planning altogether'
        ],
        howThisShowsUp: [
            'Major changes in income, either increases through skill development or temporary decreases',
            'Serious focus on budgeting, debt reduction, or investment planning',
            'Career pivots toward work that better reflects your values',
            'Reassessing what possessions and lifestyle choices truly serve you',
            'Learning new skills that become significant income sources'
        ]
    },

    [`${Planet.Saturn}-3`]: {
        title: 'Saturn in 3rd House: Communication Mastery & Learning Discipline',
        overview: 'A period of developing serious communication skills, structured learning, and building meaningful connections in your immediate environment. This cycle emphasizes quality over quantity in both learning and relationships.',
        coreLesson: 'Mastering the art of clear, purposeful communication while building a solid foundation of knowledge through disciplined study and practice.',
        keyThemes: [
            'Clear & Purposeful Communication',
            'Structured Learning & Education',
            'Local Community & Relationships',
            'Mental Discipline & Focus',
            'Practical Knowledge Application'
        ],
        growthOpportunities: [
            'Develop expertise in subjects that genuinely interest and serve you',
            'Build stronger relationships with siblings, neighbors, and local community',
            'Master new communication skills like writing, speaking, or teaching',
            'Create systems for organizing and retaining information effectively',
            'Turn casual interests into serious skills through consistent practice'
        ],
        guidance: [
            'Choose 1-2 subjects to study deeply rather than sampling everything',
            'Practice explaining complex ideas in simple, clear language',
            'Set up regular communication rhythms with important people in your life',
            'Create a dedicated learning space and schedule for focused study',
            'Measure learning by what you can teach or apply, not just what you consume'
        ],
        watchFor: [
            'Information overwhelm or trying to learn too many things at once',
            'Perfectionism that prevents you from sharing your knowledge',
            'Isolation from local community or neglecting nearby relationships',
            'Mental rigidity or becoming overly critical of others\' communication styles',
            'Procrastination on important conversations or learning commitments'
        ],
        howThisShowsUp: [
            'Returning to school, taking courses, or pursuing certifications',
            'Writing projects, blogging, or other forms of structured communication',
            'Deeper involvement in your local community or neighborhood',
            'Improved relationships with siblings or resolution of old communication patterns',
            'Teaching, mentoring, or sharing your knowledge in formal or informal ways'
        ]
    },

    [`${Planet.Saturn}-4`]: {
        title: 'Saturn in 4th House: Home Foundation & Family Responsibility',
        overview: 'A profound period of restructuring your home life, family relationships, and emotional foundations. This cycle asks you to create genuine security by addressing family patterns and building a home that truly supports your growth.',
        coreLesson: 'Learning to create emotional security from within while taking mature responsibility for your family relationships and living environment.',
        keyThemes: [
            'Home & Living Environment',
            'Family Responsibility & Boundaries',
            'Emotional Security & Stability',
            'Ancestral Patterns & Healing',
            'Private Life & Inner Foundation'
        ],
        growthOpportunities: [
            'Create a home environment that genuinely supports your well-being and goals',
            'Heal family relationships through mature communication and healthy boundaries',
            'Build emotional resilience and inner security independent of external circumstances',
            'Address generational patterns that no longer serve your family line',
            'Develop a strong sense of belonging and rootedness in your chosen community'
        ],
        guidance: [
            'Invest in your living space as an investment in your mental health and productivity',
            'Have honest conversations with family members about roles, expectations, and boundaries',
            'Create daily routines at home that support your physical and emotional well-being',
            'Address family issues directly rather than avoiding or hoping they\'ll resolve themselves',
            'Build traditions and practices that create genuine connection and security'
        ],
        watchFor: [
            'Taking on too much responsibility for family members\' problems or emotions',
            'Avoiding necessary changes to your living situation due to fear or guilt',
            'Emotional withdrawal or becoming overly controlling in family relationships',
            'Neglecting your own needs while trying to fix or support everyone else',
            'Staying in living situations that drain your energy or limit your growth'
        ],
        howThisShowsUp: [
            'Major changes in living situation: moving, renovating, or restructuring your home',
            'Increased responsibility for aging parents or family members needing support',
            'Family therapy, healing work, or addressing long-standing family dynamics',
            'Real estate decisions, property investments, or home ownership changes',
            'Deeper focus on creating emotional stability and security in your private life'
        ]
    },

    [`${Planet.Saturn}-5`]: {
        title: 'Saturn in 5th House: Creative Mastery & Authentic Self-Expression',
        overview: 'A period of developing serious creative skills and learning to express your authentic self with discipline and purpose. This cycle transforms casual hobbies into meaningful creative work and teaches responsible approaches to romance and children.',
        coreLesson: 'Learning that true creative fulfillment comes through disciplined practice and authentic self-expression, not just talent or inspiration alone.',
        keyThemes: [
            'Creative Discipline & Mastery',
            'Authentic Self-Expression',
            'Mature Approach to Romance',
            'Responsibility with Children',
            'Joy Through Structure'
        ],
        growthOpportunities: [
            'Develop a creative skill or artistic practice through consistent, disciplined effort',
            'Build confidence in sharing your authentic creative voice with others',
            'Create more mature, stable romantic relationships based on genuine compatibility',
            'Take on meaningful responsibility in relation to children or young people',
            'Transform your relationship with play and joy from escapism to genuine fulfillment'
        ],
        guidance: [
            'Commit to a regular creative practice, even if it\'s just 15 minutes daily',
            'Focus on developing one creative skill deeply rather than dabbling in many',
            'In romance, prioritize emotional maturity and shared values over excitement alone',
            'If you have children, balance structure with warmth and genuine connection',
            'Let your creative work serve something larger than just personal expression'
        ],
        watchFor: [
            'Creative blocks or harsh self-criticism that stops you from creating',
            'Taking romance too seriously or becoming overly controlling in relationships',
            'Losing touch with playfulness and spontaneous joy',
            'Perfectionism that prevents you from sharing your creative work',
            'Avoiding creative risks or staying in your comfort zone too long'
        ],
        howThisShowsUp: [
            'Serious commitment to artistic training, creative projects, or performance',
            'Long-term romantic relationships that require more maturity and commitment',
            'Increased responsibility for children, either your own or through teaching/mentoring',
            'Creative work that becomes a source of income or professional recognition',
            'Structured approaches to hobbies that transform them into meaningful skills'
        ]
    },

    [`${Planet.Saturn}-6`]: {
        title: 'Saturn in 6th House: Work Mastery & Health Discipline',
        overview: 'A transformative period focused on building excellent work habits, mastering your craft, and creating sustainable health practices. This cycle teaches you to find meaning through service and to treat your body as a temple.',
        coreLesson: 'Understanding that mastery comes through daily discipline, and that serving others excellently is a path to both personal fulfillment and professional success.',
        keyThemes: [
            'Work Excellence & Craftsmanship',
            'Health & Physical Discipline',
            'Service & Meaningful Contribution',
            'Daily Routines & Systems',
            'Practical Skill Development'
        ],
        growthOpportunities: [
            'Develop true expertise in your field through consistent, focused effort',
            'Create sustainable health and fitness routines that support long-term vitality',
            'Find deeper meaning in your work by focusing on how it serves others',
            'Build daily systems and routines that support your highest priorities',
            'Transform your relationship with work from obligation to craftsmanship'
        ],
        guidance: [
            'Focus on becoming excellent at the fundamentals of your work rather than chasing shortcuts',
            'Treat health choices as investments in your future self, not temporary fixes',
            'Create morning and evening routines that set you up for consistent success',
            'Measure progress in your work by the value you create, not just hours worked',
            'Find ways to serve others through your skills, even in small daily interactions'
        ],
        watchFor: [
            'Workaholism or sacrificing health for work achievement',
            'Perfectionism that creates stress and reduces actual productivity',
            'Health anxiety or becoming overly rigid about diet and exercise',
            'Losing sight of the bigger picture while focusing on daily details',
            'Burnout from taking on too much responsibility without adequate support'
        ],
        howThisShowsUp: [
            'Major improvements in work performance, recognition, or professional advancement',
            'Serious commitment to health goals like fitness training, nutrition, or medical care',
            'Restructuring daily routines to be more efficient and health-supporting',
            'Taking on leadership roles or increased responsibility in your work environment',
            'Developing systems and processes that significantly improve your productivity'
        ]
    },

    [`${Planet.Saturn}-7`]: {
        title: 'Saturn in 7th House: Relationship Mastery',
        overview: 'A period that tests and strengthens partnerships through commitment, boundaries, and building relationships based on mutual respect and shared responsibility.',
        coreLesson: 'Learning to balance independence with interdependence—choosing partnerships that support rather than diminish your authentic self.',
        keyThemes: [
            'Commitment & Follow-Through',
            'Healthy Boundaries',
            'Mutual Responsibility',
            'Clear Agreements',
            'Relationship Reality-Testing'
        ],
        growthOpportunities: [
            'Deepen a serious partnership or form one with real potential',
            'Build healthier conflict resolution and repair skills',
            'Create stronger agreements and realistic expectations',
            'Attract partners who are aligned with your values and growth',
            'Develop collaboration skills in both romantic and business contexts'
        ],
        guidance: [
            'Be explicit about needs, limits, and timelines in all partnerships',
            'Choose clarity over chemistry-only when making relationship decisions',
            'Practice repair after conflict rather than avoidance or stonewalling',
            'Invest in your relationship patterns through therapy, coaching, or journaling',
            'Let consistent actions carry more weight than promises or potential'
        ],
        watchFor: [
            'Relationship tests, separations, or endings that force growth',
            'Power imbalances or emotional withholding patterns',
            'Legal or contractual complications requiring patience',
            'Fear of intimacy competing with fear of commitment',
            'Over-compromising your needs to keep the peace'
        ],
        howThisShowsUp: [
            'Engagement, marriage, or redefining what commitment means to you',
            'Business partnerships and formal agreements that require structure',
            'Relationship counseling or structured work on partnership skills',
            'Setting clearer boundaries with all the people in your life',
            'Ending dynamics that lack mutual respect or growth potential'
        ]
    },

    [`${Planet.Saturn}-8`]: {
        title: 'Saturn in 8th House: Transformation Mastery & Resource Wisdom',
        overview: 'A profound period of learning to navigate life\'s deepest transformations with wisdom and strength. This cycle teaches mastery over shared resources, psychological depths, and the cycles of death and rebirth.',
        coreLesson: 'Developing the courage and wisdom to face life\'s inevitable transformations while building genuine security through understanding power, resources, and psychological truth.',
        keyThemes: [
            'Psychological Depth & Healing',
            'Shared Resources & Financial Wisdom',
            'Power Dynamics & Boundaries',
            'Transformation & Regeneration',
            'Legacy & Long-term Impact'
        ],
        growthOpportunities: [
            'Develop psychological resilience and emotional intelligence through deep inner work',
            'Master the complexities of shared finances, investments, and resource management',
            'Transform your relationship with power from fear or manipulation to authentic strength',
            'Build wealth and security that can support multiple generations',
            'Use life\'s challenges as opportunities for profound personal transformation'
        ],
        guidance: [
            'Invest in therapy, coaching, or deep personal development work during this period',
            'Get professional help with complex financial matters like taxes, investments, or estate planning',
            'Practice radical honesty about your motivations and psychological patterns',
            'Build multiple streams of income and focus on long-term wealth building',
            'Use this period to heal generational patterns and create a positive legacy'
        ],
        watchFor: [
            'Avoiding necessary psychological work or staying in denial about deep patterns',
            'Power struggles or manipulation in intimate relationships or business dealings',
            'Financial anxiety that prevents wise investment or resource sharing',
            'Becoming overly controlling or secretive about money and resources',
            'Using transformation as an excuse to avoid stability and commitment'
        ],
        howThisShowsUp: [
            'Major financial decisions involving shared resources, investments, or inheritance',
            'Intensive therapy, healing work, or spiritual transformation practices',
            'Dealing with taxes, insurance, legal matters, or estate planning',
            'Profound personal transformation following major life challenges or losses',
            'Taking on responsibility for managing other people\'s resources or well-being'
        ]
    },

    [`${Planet.Saturn}-9`]: {
        title: 'Saturn in 9th House: Wisdom Mastery & Higher Learning',
        overview: 'A period of developing genuine wisdom through disciplined study, travel, and exploration of life\'s bigger questions. This cycle transforms casual beliefs into tested wisdom and superficial learning into deep understanding.',
        coreLesson: 'Learning that true wisdom comes not from accumulating information, but from integrating knowledge through experience and applying it in service of something greater.',
        keyThemes: [
            'Higher Education & Expertise',
            'Philosophy & Belief Systems',
            'Cultural Expansion & Travel',
            'Teaching & Knowledge Sharing',
            'Legal & Ethical Matters'
        ],
        growthOpportunities: [
            'Pursue advanced education or develop expertise in subjects that genuinely matter to you',
            'Develop a personal philosophy based on experience rather than just theory',
            'Expand your worldview through meaningful travel or cultural immersion',
            'Share your knowledge and wisdom through teaching, writing, or mentoring',
            'Take on leadership roles in educational, legal, or philosophical contexts'
        ],
        guidance: [
            'Choose educational pursuits that align with your long-term goals and values',
            'Test your beliefs against real-world experience rather than just accepting them intellectually',
            'If you travel, focus on deep cultural learning rather than superficial tourism',
            'Find ways to teach or share what you\'re learning, even informally',
            'Approach legal or ethical matters with patience and thorough preparation'
        ],
        watchFor: [
            'Academic perfectionism or getting stuck in perpetual student mode',
            'Dogmatic thinking or becoming overly rigid about your beliefs',
            'Using education or philosophy to avoid practical responsibilities',
            'Cultural superiority or judgment when encountering different worldviews',
            'Legal complications that require careful attention and professional guidance'
        ],
        howThisShowsUp: [
            'Returning to school for advanced degrees or professional certifications',
            'Publishing, teaching, or sharing your expertise in formal or informal settings',
            'Significant travel for education, work, or spiritual development',
            'Legal matters, immigration issues, or dealing with foreign institutions',
            'Developing expertise that positions you as an authority in your field'
        ]
    },

    [`${Planet.Saturn}-10`]: {
        title: 'Saturn in 10th House: Career Mastery & Public Recognition',
        overview: 'A pivotal period for building lasting professional achievement and public reputation. This cycle demands excellence, integrity, and long-term commitment to create a career that truly reflects your values and capabilities.',
        coreLesson: 'Understanding that genuine authority and lasting success come through consistent excellence, ethical leadership, and building something of real value for society.',
        keyThemes: [
            'Career Achievement & Mastery',
            'Public Reputation & Authority',
            'Leadership & Responsibility',
            'Professional Integrity',
            'Long-term Legacy Building'
        ],
        growthOpportunities: [
            'Build a career that genuinely reflects your values and utilizes your best abilities',
            'Develop leadership skills and take on increased responsibility in your field',
            'Create a public reputation based on consistent excellence and ethical behavior',
            'Establish yourself as an authority or expert in your chosen domain',
            'Build professional relationships and networks that support long-term success'
        ],
        guidance: [
            'Focus on building expertise and delivering consistent value rather than chasing quick recognition',
            'Take on leadership roles even when they feel challenging or uncomfortable',
            'Make career decisions based on long-term vision rather than short-term gains',
            'Maintain high ethical standards even when it\'s difficult or costly',
            'Invest in your professional development and stay current in your field'
        ],
        watchFor: [
            'Workaholism or sacrificing personal relationships for career advancement',
            'Imposter syndrome or feeling unworthy of recognition and success',
            'Compromising your values for professional gain or social approval',
            'Becoming overly controlling or rigid in leadership positions',
            'Fear of failure that prevents you from taking necessary career risks'
        ],
        howThisShowsUp: [
            'Major career advancement, promotion, or recognition for your professional achievements',
            'Starting your own business or taking on significant leadership responsibility',
            'Public speaking, media appearances, or increased visibility in your field',
            'Professional awards, certifications, or formal recognition of your expertise',
            'Career changes that better align with your long-term goals and values'
        ]
    },

    [`${Planet.Saturn}-11`]: {
        title: 'Saturn in 11th House: Community Leadership & Future Building',
        overview: 'A period of taking mature responsibility within groups and communities while building toward long-term goals that serve the collective good. This cycle teaches authentic leadership and sustainable progress toward your highest aspirations.',
        coreLesson: 'Learning to balance individual achievement with collective service, building communities and movements that create lasting positive change.',
        keyThemes: [
            'Group Leadership & Organization',
            'Long-term Goals & Vision',
            'Community Service & Social Responsibility',
            'Friendship & Network Building',
            'Humanitarian Work & Reform'
        ],
        growthOpportunities: [
            'Take on leadership roles in organizations or causes that matter to you',
            'Build a network of relationships based on shared values and mutual support',
            'Develop long-term goals that contribute to positive social change',
            'Create or join communities that support both individual and collective growth',
            'Use your skills and resources to address social problems or humanitarian needs'
        ],
        guidance: [
            'Choose group involvements based on alignment with your values, not just social benefits',
            'Take on organizational responsibility even when it requires significant time and effort',
            'Build friendships slowly and deliberately, focusing on quality over quantity',
            'Set goals that extend beyond personal benefit to include service to others',
            'Use your influence and resources to support causes and people you believe in'
        ],
        watchFor: [
            'Taking on too much responsibility for group dynamics or other people\'s problems',
            'Becoming overly rigid or controlling in group leadership positions',
            'Isolating yourself from community due to disappointment or conflict',
            'Compromising your individual needs to maintain group harmony',
            'Getting caught up in group politics or power struggles'
        ],
        howThisShowsUp: [
            'Leadership positions in professional organizations, community groups, or social causes',
            'Long-term commitments to humanitarian work or social reform efforts',
            'Building or joining mastermind groups, professional networks, or learning communities',
            'Organizing events, campaigns, or initiatives that bring people together for positive change',
            'Friendships that become more serious and committed, based on shared growth and values'
        ]
    },

    [`${Planet.Saturn}-12`]: {
        title: 'Saturn in 12th House: Spiritual Mastery & Hidden Service',
        overview: 'A deeply transformative period of spiritual development, healing unconscious patterns, and learning to serve from a place of genuine compassion. This cycle often involves working behind the scenes and developing inner strength.',
        coreLesson: 'Discovering that true spiritual strength comes through facing your shadows, healing unconscious patterns, and serving others without need for recognition.',
        keyThemes: [
            'Spiritual Development & Practice',
            'Unconscious Pattern Healing',
            'Compassionate Service',
            'Solitude & Inner Work',
            'Hidden Strengths & Wisdom'
        ],
        growthOpportunities: [
            'Develop a consistent spiritual practice that supports your growth and service',
            'Heal unconscious patterns, addictions, or self-sabotaging behaviors',
            'Find meaningful ways to serve others, especially those who are suffering or marginalized',
            'Build inner strength and resilience through meditation, therapy, or spiritual study',
            'Discover hidden talents and wisdom that emerge through solitude and reflection'
        ],
        guidance: [
            'Create regular time for solitude, meditation, or spiritual practice',
            'Work with a therapist, spiritual teacher, or healer to address unconscious patterns',
            'Look for opportunities to serve others without expectation of recognition or reward',
            'Pay attention to dreams, intuition, and subtle guidance during this period',
            'Use this time to rest, reflect, and prepare for your next major life chapter'
        ],
        watchFor: [
            'Spiritual bypassing or using spirituality to avoid practical responsibilities',
            'Isolation that becomes unhealthy or prevents necessary human connection',
            'Martyrdom or sacrificing your well-being in the name of service',
            'Avoiding the deep inner work this period is asking of you',
            'Getting lost in fantasy or escapism rather than facing reality'
        ],
        howThisShowsUp: [
            'Intensive therapy, spiritual retreats, or deep healing work',
            'Volunteer work or service to those who are suffering or in need',
            'Time spent in hospitals, institutions, or other places of healing and service',
            'Spiritual awakening experiences or profound shifts in consciousness',
            'Working behind the scenes on projects that serve the greater good'
        ]
    },



    // URANUS HOUSE TRANSITS
    [`${Planet.Uranus}-1`]: {
        title: 'Uranus in 1st House: Identity Revolution & Authentic Liberation',
        overview: 'A revolutionary period of breaking free from old identity patterns and expressing your most authentic self. This cycle brings sudden insights about who you really are and the courage to live according to your unique truth.',
        coreLesson: 'Learning to embrace your authentic individuality while using your uniqueness to contribute something valuable to the world.',
        keyThemes: [
            'Authentic Self-Expression',
            'Personal Freedom & Independence',
            'Revolutionary Identity Changes',
            'Innovative Self-Presentation',
            'Breaking Free from Conformity'
        ],
        growthOpportunities: [
            'Discover and express aspects of yourself that have been hidden or suppressed',
            'Break free from limiting beliefs about who you should be or how you should act',
            'Develop the courage to be different and stand out from the crowd',
            'Use your unique perspective and talents to innovate in your field',
            'Inspire others through your authentic self-expression and independence'
        ],
        guidance: [
            'Trust your instincts about changes you need to make to feel more authentic',
            'Experiment with new ways of presenting yourself to the world',
            'Don\'t rebel just for the sake of rebelling - focus on authentic expression',
            'Use this energy to break free from relationships or situations that limit your growth',
            'Channel your need for freedom into creative or innovative projects'
        ],
        watchFor: [
            'Sudden, impulsive changes that you might regret later',
            'Alienating others through excessive rebelliousness or shock value',
            'Nervous energy or restlessness that prevents focused action',
            'Throwing away valuable things in your rush to change everything',
            'Using freedom as an excuse to avoid commitment or responsibility'
        ],
        howThisShowsUp: [
            'Dramatic changes in appearance, style, or how you present yourself',
            'Sudden career changes or new directions that better reflect your authentic self',
            'Breaking free from relationships or situations that feel restrictive',
            'Developing new interests or talents that surprise yourself and others',
            'Taking on leadership roles in innovative or progressive movements'
        ]
    },

    [`${Planet.Uranus}-2`]: {
        title: 'Uranus in 2nd House: Financial Innovation & Values Revolution',
        overview: 'A period of revolutionizing your relationship with money, possessions, and values. This cycle brings innovative approaches to earning and managing resources while clarifying what truly matters to you.',
        coreLesson: 'Discovering that true security comes from aligning your resources with your authentic values and developing innovative approaches to financial independence.',
        keyThemes: [
            'Financial Innovation & Independence',
            'Values Clarification & Revolution',
            'Alternative Income Streams',
            'Technology & Money',
            'Sustainable Resource Management'
        ],
        growthOpportunities: [
            'Develop innovative income streams that align with your values and interests',
            'Use technology to create new financial opportunities or manage money more effectively',
            'Break free from traditional financial advice that doesn\'t fit your situation',
            'Clarify your authentic values and align your spending with what truly matters',
            'Create financial independence through unconventional but sustainable methods'
        ],
        guidance: [
            'Experiment with new ways of earning money that utilize your unique talents',
            'Use apps, technology, or innovative systems to better manage your finances',
            'Question inherited beliefs about money and develop your own financial philosophy',
            'Invest in things that align with your values, even if they\'re unconventional',
            'Build multiple income streams to create more financial security and freedom'
        ],
        watchFor: [
            'Impulsive financial decisions or get-rich-quick schemes',
            'Completely abandoning financial security in pursuit of freedom',
            'Technology-related financial losses or cryptocurrency volatility',
            'Sudden changes in income that require quick adaptation',
            'Rebelling against all financial advice, even when it\'s sound'
        ],
        howThisShowsUp: [
            'Starting a business or side hustle based on your unique skills or interests',
            'Sudden changes in income, either increases from innovation or temporary instability',
            'Investing in technology, cryptocurrency, or other innovative financial instruments',
            'Major shifts in what you value and how you spend your money',
            'Using technology to revolutionize how you earn, save, or invest money'
        ]
    },

    [`${Planet.Uranus}-3`]: {
        title: 'Uranus in 3rd House: Communication Revolution & Learning Innovation',
        overview: 'A dynamic period of revolutionizing how you communicate, learn, and connect with your immediate environment. This cycle brings breakthrough insights and innovative approaches to sharing information.',
        coreLesson: 'Learning to use your unique voice and perspective to communicate ideas that can genuinely help and inspire others.',
        keyThemes: [
            'Innovative Communication Methods',
            'Revolutionary Ideas & Insights',
            'Technology & Digital Connection',
            'Alternative Learning Approaches',
            'Community Network Building'
        ],
        growthOpportunities: [
            'Develop your unique voice and perspective in writing, speaking, or digital media',
            'Use technology to connect with like-minded people and share your ideas',
            'Learn new subjects through innovative methods that match your learning style',
            'Build networks and communities around shared interests or progressive ideas',
            'Become a bridge between different groups or ways of thinking'
        ],
        guidance: [
            'Experiment with new forms of communication like podcasting, blogging, or video creation',
            'Use social media and technology strategically to build meaningful connections',
            'Trust your intuitive insights and don\'t be afraid to share unconventional ideas',
            'Learn through experimentation and hands-on experience rather than just theory',
            'Connect with your local community in new and innovative ways'
        ],
        watchFor: [
            'Information overwhelm or getting scattered across too many interests',
            'Communication that\'s shocking or rebellious without being constructive',
            'Technology addiction or losing real-world connection skills',
            'Impatience with traditional learning methods that might still be valuable',
            'Sudden conflicts with siblings or neighbors due to changing perspectives'
        ],
        howThisShowsUp: [
            'Starting a blog, podcast, or other platform to share your unique perspective',
            'Learning new technologies or digital skills that open up opportunities',
            'Sudden insights or breakthrough ideas that change your direction',
            'Building online communities or networks around shared interests',
            'Changes in your local environment or relationships with neighbors and siblings'
        ]
    },

    [`${Planet.Uranus}-4`]: {
        title: 'Uranus in 4th House: Home Revolution & Family Liberation',
        overview: 'A transformative period of revolutionizing your home life, family relationships, and emotional foundations. This cycle brings freedom from limiting family patterns and creates a home environment that truly supports your authentic self.',
        coreLesson: 'Learning to create emotional security and belonging on your own terms while honoring your roots without being limited by them.',
        keyThemes: [
            'Home Innovation & Alternative Living',
            'Family Pattern Liberation',
            'Emotional Independence',
            'Ancestral Healing & Breaking Cycles',
            'Community & Chosen Family'
        ],
        growthOpportunities: [
            'Create a living situation that truly reflects your values and supports your growth',
            'Break free from limiting family patterns while maintaining loving connections',
            'Develop emotional independence and security that comes from within',
            'Use technology or innovative approaches to improve your home environment',
            'Build chosen family and community connections that feel more authentic than blood relations'
        ],
        guidance: [
            'Trust your instincts about what kind of home environment you need to thrive',
            'Address family patterns directly but with compassion for everyone involved',
            'Experiment with alternative living arrangements that might work better for you',
            'Use this period to heal generational patterns and create new family traditions',
            'Balance independence with maintaining meaningful family connections'
        ],
        watchFor: [
            'Sudden moves or housing changes that you might regret later',
            'Completely cutting off family relationships in anger or rebellion',
            'Instability in your living situation that affects your emotional well-being',
            'Using independence as an excuse to avoid emotional intimacy',
            'Shocking family members unnecessarily with sudden changes'
        ],
        howThisShowsUp: [
            'Sudden moves, renovations, or major changes to your living situation',
            'Family revelations, reunions, or significant shifts in family dynamics',
            'Alternative living arrangements like co-housing, tiny homes, or communal living',
            'Technology upgrades or smart home innovations that improve your daily life',
            'Healing work that breaks generational patterns and creates new family traditions'
        ]
    },

    [`${Planet.Uranus}-5`]: {
        title: 'Uranus in 5th House: Creative Revolution & Authentic Joy',
        overview: 'An electrifying period of creative breakthrough and rediscovering authentic sources of joy and self-expression. This cycle liberates your creative spirit and transforms your approach to romance, children, and personal fulfillment.',
        coreLesson: 'Learning to express your unique creative gifts authentically while finding joy in ways that truly resonate with your individual spirit.',
        keyThemes: [
            'Creative Innovation & Breakthrough',
            'Authentic Self-Expression',
            'Revolutionary Romance',
            'Alternative Parenting & Child Connection',
            'Technology & Digital Creativity'
        ],
        growthOpportunities: [
            'Discover and develop unique creative talents that set you apart from others',
            'Break free from conventional ideas about romance and create relationships that truly fit you',
            'Use technology and innovation to enhance your creative expression',
            'Find new ways to connect with children that honor their individuality',
            'Transform hobbies and interests into innovative forms of self-expression or income'
        ],
        guidance: [
            'Experiment with new creative mediums, especially those involving technology',
            'Don\'t be afraid to create art or express yourself in unconventional ways',
            'In romance, prioritize authentic connection over traditional relationship models',
            'If you have children, encourage their uniqueness and innovative thinking',
            'Use this period to rediscover what genuinely brings you joy and excitement'
        ],
        watchFor: [
            'Creative restlessness that prevents you from finishing projects',
            'Shocking others with your creative expression just for the sake of rebellion',
            'Unstable romantic relationships due to need for constant excitement',
            'Neglecting practical responsibilities in pursuit of creative freedom',
            'Using creativity as an escape from deeper emotional work'
        ],
        howThisShowsUp: [
            'Breakthrough creative projects that gain unexpected recognition or success',
            'Unconventional romantic relationships or sudden changes in love life',
            'New approaches to parenting or working with children that emphasize freedom and creativity',
            'Using technology, social media, or digital platforms for creative expression',
            'Discovering hidden talents or creative abilities that surprise yourself and others'
        ]
    },

    [`${Planet.Uranus}-6`]: {
        title: 'Uranus in 6th House: Work Revolution & Health Innovation',
        overview: 'A dynamic period of revolutionizing your daily work routines and health practices. This cycle brings innovative approaches to productivity, wellness, and service that align with your authentic values.',
        coreLesson: 'Learning to create work and health routines that support your individual nature while serving others in meaningful, innovative ways.',
        keyThemes: [
            'Work Innovation & Automation',
            'Health Technology & Alternative Wellness',
            'Service Revolution',
            'Routine Disruption & Optimization',
            'Mind-Body Integration'
        ],
        growthOpportunities: [
            'Revolutionize your work methods using technology and innovative systems',
            'Discover alternative health and wellness approaches that work better for your unique body',
            'Find new ways to serve others that utilize your individual talents and interests',
            'Create daily routines that support both productivity and personal freedom',
            'Use data and technology to optimize your health and work performance'
        ],
        guidance: [
            'Experiment with new productivity tools, apps, or work methods that increase efficiency',
            'Try alternative health approaches like biohacking, functional medicine, or innovative fitness',
            'Look for ways to automate routine tasks so you can focus on more meaningful work',
            'Create flexible routines that can adapt to your changing energy and interests',
            'Use this period to align your daily work with your larger purpose and values'
        ],
        watchFor: [
            'Constant changes to routines that prevent building sustainable habits',
            'Over-reliance on technology that disconnects you from your body\'s natural rhythms',
            'Rebellious attitude toward all structure, even when some routine would be helpful',
            'Experimenting with health approaches without proper research or professional guidance',
            'Using innovation as an excuse to avoid necessary but mundane daily tasks'
        ],
        howThisShowsUp: [
            'Major changes in your work environment, methods, or daily schedule',
            'Discovering new health practices or technologies that significantly improve your well-being',
            'Automating or streamlining work processes in ways that free up time and energy',
            'Sudden insights about how to better serve others through your unique skills',
            'Health breakthroughs or discoveries that change your approach to wellness'
        ]
    },

    [`${Planet.Uranus}-7`]: {
        title: 'Uranus in 7th House: Relationship Revolution & Partnership Innovation',
        overview: 'A transformative period of revolutionizing your approach to partnerships and one-on-one relationships. This cycle brings freedom from conventional relationship patterns and creates space for authentic, innovative connections.',
        coreLesson: 'Learning to maintain your individual authenticity within partnerships while creating relationships that support both people\'s growth and freedom.',
        keyThemes: [
            'Relationship Innovation & Freedom',
            'Partnership Equality & Independence',
            'Unconventional Commitments',
            'Collaborative Revolution',
            'Digital Age Relationships'
        ],
        growthOpportunities: [
            'Create relationships that honor both individual freedom and genuine partnership',
            'Break free from traditional relationship models that don\'t serve your authentic self',
            'Develop new forms of commitment and partnership that work for modern life',
            'Use technology to enhance connection and collaboration with partners',
            'Attract partners who support your growth and individual expression'
        ],
        guidance: [
            'Be honest about your need for independence within relationships',
            'Experiment with new relationship structures that might work better for you',
            'Use technology thoughtfully to enhance rather than replace real connection',
            'Look for partners who are also committed to personal growth and authenticity',
            'Create clear agreements about freedom and boundaries in all partnerships'
        ],
        watchFor: [
            'Sudden relationship changes or breakups that happen without proper communication',
            'Using freedom as an excuse to avoid intimacy or commitment altogether',
            'Attracting partners who are unstable or unwilling to commit to growth',
            'Technology interfering with genuine emotional connection',
            'Rebelling against all relationship advice, even when it might be helpful'
        ],
        howThisShowsUp: [
            'Sudden relationship changes, either new partnerships or significant shifts in existing ones',
            'Unconventional relationship arrangements like long-distance, open, or non-traditional partnerships',
            'Meeting partners through technology, online platforms, or progressive communities',
            'Business partnerships or collaborations that involve innovation or technology',
            'Legal matters or contracts that require new approaches or unconventional solutions'
        ]
    },

    [`${Planet.Uranus}-8`]: {
        title: 'Uranus in 8th House: Transformation Revolution & Resource Liberation',
        overview: 'An intense period of revolutionary transformation in your relationship with power, shared resources, and psychological depths. This cycle brings sudden insights and liberation from hidden patterns that have limited your growth.',
        coreLesson: 'Learning to embrace transformation as a path to authentic power while using shared resources in innovative ways that benefit everyone involved.',
        keyThemes: [
            'Psychological Breakthrough & Liberation',
            'Financial Innovation & Cryptocurrency',
            'Power Dynamics Revolution',
            'Death & Rebirth Cycles',
            'Occult & Alternative Healing'
        ],
        growthOpportunities: [
            'Experience profound psychological breakthroughs that free you from limiting patterns',
            'Innovate with shared resources, investments, or alternative financial systems',
            'Transform your relationship with power from control to authentic influence',
            'Use technology and alternative methods for deep healing and transformation',
            'Develop intuitive abilities and interest in metaphysical or occult subjects'
        ],
        guidance: [
            'Embrace sudden insights and psychological breakthroughs, even when they\'re uncomfortable',
            'Experiment with alternative investments or innovative financial instruments carefully',
            'Use this period for intensive therapy, healing work, or spiritual transformation',
            'Be open to unconventional healing methods that address root causes',
            'Trust your intuition about power dynamics and hidden motivations in relationships'
        ],
        watchFor: [
            'Sudden financial losses due to risky investments or cryptocurrency volatility',
            'Psychological instability from too much transformation happening too quickly',
            'Power struggles or manipulation in intimate relationships or business dealings',
            'Obsession with occult or metaphysical subjects that disconnects you from practical reality',
            'Using transformation as an excuse to avoid stability and commitment'
        ],
        howThisShowsUp: [
            'Sudden changes in shared finances, investments, or inheritance matters',
            'Intensive healing work, therapy, or spiritual transformation experiences',
            'Interest in alternative healing, energy work, or metaphysical subjects',
            'Major psychological breakthroughs that change your entire perspective on life',
            'Involvement with cryptocurrency, alternative investments, or innovative financial systems'
        ]
    },

    [`${Planet.Uranus}-9`]: {
        title: 'Uranus in 9th House: Wisdom Revolution & Belief Liberation',
        overview: 'A revolutionary period of expanding your worldview and breaking free from limiting beliefs and dogma. This cycle brings sudden insights about truth, meaning, and your place in the larger world.',
        coreLesson: 'Learning to develop your own authentic philosophy and wisdom while remaining open to revolutionary new ideas and perspectives.',
        keyThemes: [
            'Belief System Revolution',
            'Alternative Education & Learning',
            'Cultural Innovation & Global Perspective',
            'Spiritual Awakening & Freedom',
            'Technology & Distance Learning'
        ],
        growthOpportunities: [
            'Break free from inherited beliefs and develop your own authentic philosophy',
            'Use technology and online platforms to access education and wisdom from around the world',
            'Travel or connect with different cultures in ways that expand your perspective',
            'Develop teaching or publishing abilities that share your unique insights',
            'Integrate spiritual awakening with practical wisdom and social action'
        ],
        guidance: [
            'Question everything you\'ve been taught and develop your own relationship with truth',
            'Use online learning, virtual travel, or digital connections to expand your worldview',
            'Be open to sudden insights or spiritual experiences that change your perspective',
            'Share your unique wisdom and insights through writing, teaching, or digital platforms',
            'Balance revolutionary new ideas with practical wisdom and common sense'
        ],
        watchFor: [
            'Becoming dogmatic about your new beliefs or spiritual insights',
            'Rejecting all traditional wisdom in favor of only new or alternative ideas',
            'Spiritual bypassing or using philosophy to avoid practical responsibilities',
            'Information overwhelm from too many new ideas and perspectives',
            'Alienating others by being too radical or shocking in your beliefs'
        ],
        howThisShowsUp: [
            'Sudden spiritual awakening or major shifts in your belief system',
            'Online education, virtual conferences, or distance learning opportunities',
            'Publishing, blogging, or sharing your ideas through digital platforms',
            'Unexpected travel opportunities or connections with foreign cultures',
            'Legal matters, immigration issues, or dealing with foreign institutions in innovative ways'
        ]
    },

    [`${Planet.Uranus}-10`]: {
        title: 'Uranus in 10th House: Career Revolution & Authority Innovation',
        overview: 'A dynamic period of revolutionizing your career path and public reputation. This cycle brings breakthrough opportunities and the courage to build a professional life that truly reflects your authentic values and innovative vision.',
        coreLesson: 'Learning to build authentic authority and professional success by pioneering new approaches rather than following conventional career paths.',
        keyThemes: [
            'Career Innovation & Entrepreneurship',
            'Professional Independence & Freedom',
            'Technology & Digital Leadership',
            'Alternative Authority & Influence',
            'Social Impact & Progressive Leadership'
        ],
        growthOpportunities: [
            'Pioneer new approaches in your field or create entirely new career paths',
            'Use technology and digital platforms to build your professional reputation',
            'Develop leadership skills that inspire innovation and positive change',
            'Create work that has genuine social impact and serves the greater good',
            'Build professional independence through entrepreneurship or freelancing'
        ],
        guidance: [
            'Trust your vision for how your field or industry could be improved or revolutionized',
            'Use social media and digital platforms strategically to build your professional brand',
            'Don\'t be afraid to take calculated risks that could advance your career significantly',
            'Look for ways to integrate your values and social consciousness into your professional work',
            'Build a reputation for innovation, authenticity, and positive leadership'
        ],
        watchFor: [
            'Sudden career changes that happen without adequate planning or preparation',
            'Rebellious behavior that damages your professional reputation unnecessarily',
            'Over-reliance on technology that disconnects you from human relationships at work',
            'Impatience with the time it takes to build genuine authority and expertise',
            'Using innovation as an excuse to avoid developing fundamental professional skills'
        ],
        howThisShowsUp: [
            'Sudden career opportunities or major changes in your professional direction',
            'Starting your own business or becoming an entrepreneur in an innovative field',
            'Recognition for pioneering work or innovative approaches in your industry',
            'Leadership roles in progressive organizations or social impact initiatives',
            'Using technology to revolutionize how you work or serve your clients/customers'
        ]
    },



    [`${Planet.Uranus}-11`]: {
        title: 'Uranus in 11th House: Revolutionary Community & Future Vision',
        overview: 'A period of radical shifts in friendships, group affiliations, and future aspirations. Your social circle transforms as you align with more authentic communities and progressive causes that match your evolving values.',
        coreLesson: 'Learning to balance individual authenticity with collective belonging—finding your tribe while maintaining your unique contribution to the whole.',
        keyThemes: [
            'Authentic Community Building',
            'Social Innovation & Reform',
            'Future Vision & Technology',
            'Group Leadership & Collaboration',
            'Humanitarian Service & Activism'
        ],
        growthOpportunities: [
            'Connect with forward-thinking communities that share your values and vision',
            'Develop leadership skills in group settings and collaborative projects',
            'Use technology and innovation to create positive social change',
            'Transform your relationship with social media and digital communities',
            'Channel rebellious energy into constructive activism and reform work'
        ],
        guidance: [
            'Trust your instincts about which groups and friendships serve your growth',
            'Be willing to outgrow social circles that no longer match your evolution',
            'Use your unique perspective to contribute something valuable to collective efforts',
            'Balance online community engagement with real-world connection and action',
            'Let your authentic self attract the right people rather than conforming to fit in'
        ],
        watchFor: [
            'Sudden friendship endings or group conflicts that force growth',
            'Feeling like an outsider or struggling to find your authentic community',
            'Getting caught up in online drama or digital overwhelm',
            'Rebellious impulses that create unnecessary conflict in group settings',
            'Idealizing communities or causes without seeing their practical limitations'
        ],
        howThisShowsUp: [
            'Major shifts in your friend group or social circle composition',
            'Joining new organizations, causes, or communities aligned with your values',
            'Leadership roles in progressive movements, tech projects, or social reform',
            'Unexpected opportunities through networking and group connections',
            'A stronger focus on humanitarian work, social justice, or future-oriented projects'
        ]
    },


    [`${Planet.Uranus}-12`]: {
        title: 'Uranus in 12th House: Spiritual Revolution & Unconscious Liberation',
        overview: 'A profound period of spiritual awakening and liberation from unconscious patterns. This cycle brings sudden insights from the depths of your psyche and revolutionary approaches to spirituality and service.',
        coreLesson: 'Learning to integrate spiritual awakening with practical service while freeing yourself from unconscious patterns that have limited your growth.',
        keyThemes: [
            'Spiritual Awakening & Innovation',
            'Unconscious Pattern Liberation',
            'Alternative Healing & Energy Work',
            'Technology & Digital Spirituality',
            'Revolutionary Compassion & Service'
        ],
        growthOpportunities: [
            'Experience sudden spiritual awakenings or breakthrough insights about your life purpose',
            'Use technology and innovative methods for meditation, healing, and spiritual practice',
            'Break free from unconscious patterns and limiting beliefs that have held you back',
            'Develop unique approaches to serving others that combine spirituality with practical action',
            'Integrate alternative healing methods and energy work into your spiritual practice'
        ],
        guidance: [
            'Pay attention to dreams, synchronicities, and sudden insights during this period',
            'Use meditation apps, online spiritual communities, or digital tools for inner work',
            'Be open to unconventional spiritual practices that resonate with your unique path',
            'Find ways to serve others that feel authentic and aligned with your spiritual values',
            'Balance spiritual exploration with grounding practices and practical responsibilities'
        ],
        watchFor: [
            'Spiritual bypassing or using awakening experiences to avoid practical responsibilities',
            'Becoming isolated or disconnected from others during your spiritual journey',
            'Over-reliance on technology for spiritual connection at the expense of inner stillness',
            'Sudden psychological instability from too much spiritual opening too quickly',
            'Using spiritual insights to feel superior to others or avoid human relationships'
        ],
        howThisShowsUp: [
            'Sudden spiritual experiences, awakenings, or major shifts in consciousness',
            'Interest in alternative healing, energy work, or innovative spiritual practices',
            'Using technology for meditation, online spiritual communities, or digital healing work',
            'Breakthrough insights about unconscious patterns that have been limiting your life',
            'Finding new ways to serve others that combine spiritual awareness with practical action'
        ]
    },

    // NEPTUNE HOUSE TRANSITS
    [`${Planet.Neptune}-1`]: {
        title: 'Neptune in 1st House: Identity Dissolution & Spiritual Rebirth',
        overview: 'A deeply transformative period where your sense of self becomes more fluid and spiritually attuned. This cycle dissolves rigid identity patterns and opens you to your more compassionate, intuitive nature.',
        coreLesson: 'Learning to maintain a sense of self while becoming more permeable to spiritual influence and compassionate connection with others.',
        keyThemes: [
            'Identity Fluidity & Spiritual Opening',
            'Compassion & Empathy Development',
            'Intuitive Sensitivity',
            'Creative Self-Expression',
            'Boundary Dissolution & Reformation'
        ],
        growthOpportunities: [
            'Develop your intuitive and psychic abilities through consistent spiritual practice',
            'Express your creativity and imagination in ways that inspire and heal others',
            'Cultivate deep compassion and empathy while maintaining healthy boundaries',
            'Connect with your spiritual purpose and soul mission',
            'Use your sensitivity as a gift for understanding and helping others'
        ],
        guidance: [
            'Create daily spiritual practices that keep you grounded and centered',
            'Trust your intuition but verify important decisions with practical wisdom',
            'Use creative expression as a way to channel and understand your inner experiences',
            'Practice saying no to protect your energy while remaining open-hearted',
            'Seek guidance from trusted spiritual teachers or therapists during this sensitive time'
        ],
        watchFor: [
            'Loss of personal boundaries or taking on others\' emotions as your own',
            'Confusion about your identity or feeling like you\'re dissolving',
            'Escapism through substances, fantasy, or avoiding practical responsibilities',
            'Being taken advantage of due to increased sensitivity and compassion',
            'Spiritual bypassing or using spirituality to avoid dealing with real-world issues'
        ],
        howThisShowsUp: [
            'Increased interest in spirituality, meditation, or mystical experiences',
            'Changes in appearance that reflect your inner spiritual transformation',
            'Heightened sensitivity to environments, people, and subtle energies',
            'Creative breakthroughs in art, music, writing, or other expressive mediums',
            'Feeling called to serve others through healing, counseling, or spiritual work'
        ]
    },

    [`${Planet.Neptune}-2`]: {
        title: 'Neptune in 2nd House: Values Spiritualization & Resource Flow',
        overview: 'A period of spiritualizing your relationship with money, possessions, and values. This cycle teaches you to find security through faith and service rather than material accumulation alone.',
        coreLesson: 'Learning that true abundance comes from aligning your resources with your spiritual values and trusting in the flow of universal provision.',
        keyThemes: [
            'Spiritual Values & Money',
            'Abundance Through Service',
            'Material Detachment',
            'Intuitive Financial Decisions',
            'Generosity & Sharing'
        ],
        growthOpportunities: [
            'Align your earning and spending with your deepest spiritual values',
            'Develop trust in universal abundance and the flow of resources',
            'Use your resources to serve others and support spiritual or creative causes',
            'Find security through faith and spiritual practice rather than material accumulation',
            'Discover your true values by releasing attachment to status symbols'
        ],
        guidance: [
            'Make financial decisions based on your spiritual values and intuitive guidance',
            'Practice generosity while maintaining practical boundaries around money',
            'Avoid get-rich-quick schemes or investments that seem too good to be true',
            'Create multiple income streams that align with your desire to serve others',
            'Use this period to simplify your possessions and focus on what truly matters'
        ],
        watchFor: [
            'Financial confusion or making impractical decisions based on wishful thinking',
            'Being taken advantage of financially due to increased generosity or naivety',
            'Avoiding practical money management in favor of "trusting the universe"',
            'Devaluing money or material resources in an unbalanced way',
            'Escapist spending or using purchases to avoid dealing with deeper issues'
        ],
        howThisShowsUp: [
            'Changes in income related to spiritual, creative, or service-oriented work',
            'Increased generosity and desire to use money for humanitarian causes',
            'Confusion or dissolution of previous financial structures or security',
            'Intuitive insights about investments or financial opportunities',
            'Simplifying possessions and focusing on experiences over material goods'
        ]
    },

    [`${Planet.Neptune}-3`]: {
        title: 'Neptune in 3rd House: Intuitive Communication & Mystical Learning',
        overview: 'A period of developing intuitive communication abilities and learning through inspiration rather than just logic. This cycle opens your mind to subtle information and spiritual wisdom.',
        coreLesson: 'Learning to trust and develop your intuitive knowing while maintaining clear, compassionate communication with others.',
        keyThemes: [
            'Intuitive Communication',
            'Spiritual Learning & Wisdom',
            'Psychic Development',
            'Creative Writing & Expression',
            'Compassionate Listening'
        ],
        growthOpportunities: [
            'Develop your ability to receive and communicate intuitive insights',
            'Learn through meditation, dreams, and other non-linear methods',
            'Use your communication gifts to inspire, heal, and uplift others',
            'Connect with your local community through spiritual or creative activities',
            'Express your spiritual insights through writing, speaking, or teaching'
        ],
        guidance: [
            'Trust your first impressions and intuitive insights about people and situations',
            'Practice active, compassionate listening to truly hear what others are communicating',
            'Use journaling, poetry, or creative writing to explore and express your inner world',
            'Seek learning opportunities that engage your imagination and spiritual curiosity',
            'Be patient with yourself as your communication style becomes more intuitive and less linear'
        ],
        watchFor: [
            'Miscommunication due to assuming others understand your intuitive leaps',
            'Information overwhelm or difficulty distinguishing between intuition and imagination',
            'Avoiding practical learning or communication in favor of only mystical approaches',
            'Being misunderstood because your communication style becomes too abstract',
            'Taking on others\' mental or emotional confusion as your own'
        ],
        howThisShowsUp: [
            'Increased interest in spiritual or metaphysical subjects and learning',
            'Changes in how you communicate, becoming more intuitive and compassionate',
            'Psychic experiences or enhanced sensitivity to subtle information',
            'Creative writing, poetry, or other forms of inspired expression',
            'Deeper, more meaningful connections with siblings, neighbors, or local community'
        ]
    },

    [`${Planet.Neptune}-4`]: {
        title: 'Neptune in 4th House: Home Sanctuary & Family Healing',
        overview: 'A deeply healing period focused on creating a spiritual sanctuary at home and healing family patterns through compassion and forgiveness. This cycle dissolves old emotional wounds.',
        coreLesson: 'Learning to create emotional security through spiritual connection and unconditional love while healing generational patterns with compassion.',
        keyThemes: [
            'Home as Spiritual Sanctuary',
            'Family Healing & Forgiveness',
            'Emotional Sensitivity & Intuition',
            'Ancestral Pattern Healing',
            'Unconditional Love & Acceptance'
        ],
        growthOpportunities: [
            'Transform your home into a peaceful, spiritually nourishing environment',
            'Heal family relationships through compassion, forgiveness, and understanding',
            'Develop your emotional intuition and ability to sense family dynamics',
            'Connect with your ancestral wisdom and heal generational patterns',
            'Create a sense of belonging through spiritual community and chosen family'
        ],
        guidance: [
            'Create sacred space in your home for meditation, prayer, or spiritual practice',
            'Practice forgiveness with family members, starting with yourself',
            'Trust your emotional intuition about family dynamics and home environment',
            'Use this period for deep emotional healing work with a trusted therapist or healer',
            'Honor your need for solitude and retreat while maintaining loving connections'
        ],
        watchFor: [
            'Becoming overly enmeshed in family emotions or taking on others\' pain',
            'Idealizing family members or avoiding necessary boundaries',
            'Escapism through staying home too much or avoiding family responsibilities',
            'Confusion about your emotional needs or what makes you feel secure',
            'Using spirituality to avoid dealing with practical home or family issues'
        ],
        howThisShowsUp: [
            'Major changes in your living situation that create a more peaceful, spiritual environment',
            'Family healing work, therapy, or spiritual practices that address generational patterns',
            'Increased sensitivity to your home environment and need for beauty and peace',
            'Deeper emotional connections with family members through compassion and understanding',
            'Creating or joining spiritual communities that feel like chosen family'
        ]
    },

    [`${Planet.Neptune}-5`]: {
        title: 'Neptune in 5th House: Creative Inspiration & Divine Play',
        overview: 'A magical period of creative inspiration and spiritual play. This cycle opens your heart to divine creativity and teaches you to express your soul through art, romance, and joyful self-expression.',
        coreLesson: 'Learning to channel divine inspiration into creative expression while maintaining healthy boundaries in romance and creative pursuits.',
        keyThemes: [
            'Divine Creative Inspiration',
            'Spiritual Romance & Love',
            'Artistic Expression & Beauty',
            'Inner Child Healing',
            'Compassionate Parenting'
        ],
        growthOpportunities: [
            'Channel divine inspiration into beautiful, meaningful creative works',
            'Experience romance and love as spiritual connection and soul recognition',
            'Heal your inner child through play, creativity, and self-compassion',
            'Use your creative gifts to inspire, heal, and uplift others',
            'Develop a more spiritual, compassionate approach to parenting or working with children'
        ],
        guidance: [
            'Trust your creative inspiration and don\'t overthink the artistic process',
            'In romance, look for soul connection and spiritual compatibility',
            'Make time for play, beauty, and activities that bring you pure joy',
            'Use your creative work as a form of spiritual practice and service',
            'If you have children, nurture their imagination and spiritual sensitivity'
        ],
        watchFor: [
            'Idealizing romantic partners or falling in love with potential rather than reality',
            'Creative blocks due to perfectionism or fear of not being "spiritual enough"',
            'Escapism through entertainment, romance, or creative fantasy',
            'Losing practical boundaries in creative projects or romantic relationships',
            'Using creativity or romance to avoid dealing with deeper emotional issues'
        ],
        howThisShowsUp: [
            'Breakthrough creative projects that feel divinely inspired',
            'Romantic relationships that have a spiritual or karmic quality',
            'Increased sensitivity to beauty and desire to create beautiful things',
            'Healing work with your inner child through therapy, art, or play',
            'If you have children, deeper spiritual connection and more intuitive parenting'
        ]
    },

    [`${Planet.Neptune}-6`]: {
        title: 'Neptune in 6th House: Sacred Service & Holistic Health',
        overview: 'A period of spiritualizing your daily work and health practices. This cycle teaches you to serve others as a spiritual practice and to heal your body through holistic, intuitive approaches.',
        coreLesson: 'Learning to see daily work and health care as forms of spiritual service while maintaining practical boundaries and self-care.',
        keyThemes: [
            'Work as Spiritual Service',
            'Holistic Health & Healing',
            'Intuitive Body Wisdom',
            'Compassionate Service',
            'Sacred Daily Routines'
        ],
        growthOpportunities: [
            'Transform your work into a form of spiritual service and compassionate contribution',
            'Develop intuitive understanding of your body\'s needs and holistic healing approaches',
            'Create daily routines that support both spiritual practice and practical productivity',
            'Use your work to help, heal, or inspire others in meaningful ways',
            'Integrate meditation, prayer, or spiritual practice into your daily work routine'
        ],
        guidance: [
            'Listen to your body\'s subtle signals and trust your intuition about health choices',
            'Look for work opportunities that align with your desire to serve and help others',
            'Create sacred rituals around daily tasks to make routine work more meaningful',
            'Practice self-compassion and avoid perfectionism in both work and health goals',
            'Seek holistic health practitioners who address mind, body, and spirit together'
        ],
        watchFor: [
            'Neglecting practical health care in favor of only spiritual or alternative approaches',
            'Becoming a martyr at work or sacrificing your well-being to help others',
            'Health confusion or susceptibility to unclear diagnoses or treatments',
            'Avoiding necessary work responsibilities in favor of spiritual pursuits',
            'Taking on others\' health problems or work stress as your own'
        ],
        howThisShowsUp: [
            'Career changes toward healing, service, or spiritually meaningful work',
            'Increased interest in holistic health, alternative medicine, or energy healing',
            'Health issues that require a more intuitive, whole-person approach to healing',
            'Daily routines that become more spiritually oriented and less rigidly structured',
            'Opportunities to serve others through your work in more meaningful ways'
        ]
    },

    [`${Planet.Neptune}-7`]: {
        title: 'Neptune in 7th House: Soul Partnerships & Compassionate Relating',
        overview: 'A deeply transformative period in relationships where you learn to love unconditionally while maintaining healthy boundaries. This cycle brings soul-level partnerships and spiritual lessons through relating.',
        coreLesson: 'Learning to love with an open heart while maintaining clear boundaries and realistic expectations in all partnerships.',
        keyThemes: [
            'Unconditional Love & Compassion',
            'Soul Mate Connections',
            'Spiritual Partnership',
            'Boundary Development',
            'Sacrificial Love vs. Healthy Love'
        ],
        growthOpportunities: [
            'Experience deep, soul-level connections that transform your understanding of love',
            'Develop unconditional compassion while maintaining healthy relationship boundaries',
            'Learn to see your partner as a spiritual teacher and mirror for your own growth',
            'Heal relationship patterns through forgiveness and spiritual understanding',
            'Create partnerships that support both people\'s spiritual development and service'
        ],
        guidance: [
            'Trust your intuition about people while also paying attention to their actions',
            'Practice unconditional love without becoming a doormat or losing yourself',
            'Look for partners who share your spiritual values and commitment to growth',
            'Use relationship challenges as opportunities for spiritual development',
            'Maintain your individual spiritual practice even within close partnerships'
        ],
        watchFor: [
            'Idealizing partners or falling in love with their potential rather than reality',
            'Losing yourself in relationships or becoming overly dependent on your partner',
            'Attracting partners who need rescuing or who take advantage of your compassion',
            'Avoiding conflict or difficult conversations in the name of "spiritual love"',
            'Using spirituality to bypass the practical work required in relationships'
        ],
        howThisShowsUp: [
            'Meeting partners through spiritual communities, healing work, or service activities',
            'Existing relationships deepening through shared spiritual practice or healing work',
            'Relationship challenges that require forgiveness, compassion, and spiritual growth',
            'Legal or contractual matters that require patience and spiritual perspective',
            'Business partnerships focused on healing, service, or spiritual work'
        ]
    },

    [`${Planet.Neptune}-8`]: {
        title: 'Neptune in 8th House: Spiritual Transformation & Mystical Depths',
        overview: 'Neptune in the 8th erodes the illusion of control in deep places.',
        coreLesson: 'Developing intuition with protection: staying spiritually open while remaining practically grounded in shared resources and intimate connections.',
        keyThemes: [
            'Intimacy & Energetic Boundaries',
            'Shared Resources & Money',
            'Psychic Sensitivity',
            'Healing & Transformation',
            'Surrender & Spiritual Rebirth'
        ],
        growthOpportunities: [
            'Deepen intuitive awareness through consistent spiritual practices',
            'Heal ancestral and karmic patterns through therapy or somatic work',
            'Transform fear around loss, change, and the unknown',
            'Build healthier emotional and financial agreements with others',
            'Turn heightened sensitivity into wisdom and compassionate service'
        ],
        guidance: [
            'Ground daily: prioritize sleep, hydration, movement, and sunlight',
            'Get all shared financial agreements in writing—clarity protects everyone',
            'Choose trusted spiritual guides; avoid "too good to be true" promises',
            'Use boundaries as acts of love, not walls of fear',
            'Channel sensitivity into structured practice: meditation, therapy, or creative expression'
        ],
        watchFor: [
            'Financial fog around shared resources, debts, or inheritances',
            'Idealizing partners or blurred lines in intimate relationships',
            'Escapism through substances, fantasy, or spiritual bypassing',
            'Overwhelm from absorbing others\' emotions or psychic energy',
            'Getting pulled into secrecy, manipulation, or unclear agreements'
        ],
        howThisShowsUp: [
            'Deeper interest in mysticism, dreams, symbolism, or healing arts',
            'Intensive therapy, trauma healing, or spiritual initiation experiences',
            'Shifts in shared assets, insurance, taxes, or inheritance matters',
            'Major endings and beginnings that completely rewire your trust patterns',
            'A stronger pull toward service work or compassion-based careers'
        ]
    },

    [`${Planet.Neptune}-9`]: {
        title: 'Neptune in 9th House: Spiritual Wisdom & Mystical Truth',
        overview: 'A profound period of spiritual seeking and mystical learning. This cycle dissolves rigid beliefs and opens you to universal wisdom and transcendent truth.',
        coreLesson: 'Learning to distinguish between genuine spiritual wisdom and illusion while developing your own direct relationship with divine truth.',
        keyThemes: [
            'Spiritual Seeking & Mystical Experience',
            'Universal Wisdom & Truth',
            'Intuitive Learning & Teaching',
            'Compassionate Philosophy',
            'Transcendent Understanding'
        ],
        growthOpportunities: [
            'Develop your own direct relationship with spiritual truth through meditation and contemplation',
            'Learn from spiritual teachers and wisdom traditions while maintaining discernment',
            'Share your spiritual insights through teaching, writing, or other forms of expression',
            'Travel or study other cultures to expand your spiritual understanding',
            'Integrate mystical experiences with practical wisdom and compassionate action'
        ],
        guidance: [
            'Trust your direct spiritual experiences while maintaining healthy skepticism',
            'Study with qualified spiritual teachers but avoid giving away your power',
            'Use meditation, prayer, or contemplation to develop your own inner knowing',
            'Share your spiritual insights in ways that inspire rather than preach',
            'Balance mystical exploration with practical responsibilities and relationships'
        ],
        watchFor: [
            'Spiritual bypassing or using mystical experiences to avoid practical life',
            'Following spiritual teachers or gurus without maintaining discernment',
            'Becoming dogmatic about your spiritual beliefs or looking down on others',
            'Getting lost in spiritual fantasy or losing touch with practical reality',
            'Using spirituality to feel superior or special rather than to serve others'
        ],
        howThisShowsUp: [
            'Profound spiritual experiences or mystical insights that change your worldview',
            'Study with spiritual teachers or involvement in wisdom traditions',
            'Travel to sacred places or cultures that expand your spiritual understanding',
            'Teaching, writing, or sharing your spiritual insights with others',
            'Legal or educational matters that require patience and spiritual perspective'
        ]
    },

    [`${Planet.Neptune}-10`]: {
        title: 'Neptune in 10th House: Spiritual Calling & Compassionate Leadership',
        overview: 'A transformative period where your career becomes a spiritual calling. This cycle dissolves ego-driven ambition and guides you toward work that serves the greater good.',
        coreLesson: 'Learning to build a career and public reputation based on spiritual service and compassionate contribution rather than ego or material success alone.',
        keyThemes: [
            'Career as Spiritual Calling',
            'Compassionate Leadership',
            'Service-Oriented Success',
            'Artistic or Healing Professions',
            'Reputation Through Service'
        ],
        growthOpportunities: [
            'Align your career with your spiritual values and desire to serve others',
            'Develop leadership skills based on compassion, inspiration, and service',
            'Use your public platform or professional influence to help and inspire others',
            'Create work that contributes to healing, beauty, or spiritual upliftment',
            'Build a reputation based on integrity, service, and genuine contribution'
        ],
        guidance: [
            'Follow your heart and intuition when making career decisions',
            'Look for work opportunities that allow you to serve others and make a positive impact',
            'Use your professional skills and platform to contribute to causes you believe in',
            'Practice humility and avoid ego-driven ambition in favor of service-oriented goals',
            'Trust that following your spiritual calling will lead to the right kind of success'
        ],
        watchFor: [
            'Career confusion or difficulty finding practical ways to express your spiritual calling',
            'Sacrificing financial security or practical needs in pursuit of spiritual ideals',
            'Being taken advantage of professionally due to your desire to help others',
            'Avoiding leadership responsibilities or professional development',
            'Using spirituality to avoid the practical work required for career success'
        ],
        howThisShowsUp: [
            'Career changes toward healing, service, arts, or spiritually meaningful work',
            'Recognition for your compassionate leadership or service to others',
            'Professional opportunities that allow you to express your spiritual values',
            'Public speaking, teaching, or sharing your spiritual insights professionally',
            'Building a reputation based on integrity, service, and genuine contribution to society'
        ]
    },

    [`${Planet.Neptune}-11`]: {
        title: 'Neptune in 11th House: Spiritual Community & Compassionate Idealism',
        overview: 'A period of connecting with spiritual communities and working toward compassionate ideals. This cycle dissolves ego-driven social ambitions and guides you toward service-oriented friendships and causes.',
        coreLesson: 'Learning to contribute to collective healing and spiritual evolution while maintaining discernment about groups and causes.',
        keyThemes: [
            'Spiritual Community & Friendship',
            'Humanitarian Service & Idealism',
            'Collective Healing & Compassion',
            'Intuitive Group Dynamics',
            'Service-Oriented Goals'
        ],
        growthOpportunities: [
            'Connect with spiritual communities and like-minded souls who share your values',
            'Work toward humanitarian causes and ideals that serve the greater good',
            'Use your intuitive abilities to understand and heal group dynamics',
            'Develop friendships based on spiritual connection and mutual service',
            'Contribute your unique gifts to collective healing and spiritual evolution'
        ],
        guidance: [
            'Trust your intuition about which groups and causes truly align with your values',
            'Look for communities that balance spiritual idealism with practical action',
            'Use your empathic abilities to help heal conflicts and misunderstandings in groups',
            'Maintain healthy boundaries while remaining open-hearted in friendships',
            'Focus on service-oriented goals that contribute to collective well-being'
        ],
        watchFor: [
            'Idealizing groups or causes without seeing their practical limitations',
            'Losing yourself in group dynamics or taking on others\' emotions',
            'Being taken advantage of by friends or groups due to your compassionate nature',
            'Avoiding practical responsibilities in favor of spiritual or humanitarian ideals',
            'Using group involvement to escape from personal development work'
        ],
        howThisShowsUp: [
            'Joining spiritual communities, healing circles, or service-oriented organizations',
            'Friendships that form through shared spiritual interests or humanitarian work',
            'Working toward causes that address suffering and promote healing',
            'Group healing work or collective spiritual practices',
            'Using technology or social media to connect with like-minded souls and promote positive causes'
        ]
    },

    [`${Planet.Neptune}-12`]: {
        title: 'Neptune in 12th House: Spiritual Transcendence & Divine Service',
        overview: 'A profound period of spiritual transcendence and surrender to divine will. This cycle dissolves the ego and opens you to direct experience of universal love and compassion.',
        coreLesson: 'Learning to surrender to divine will while maintaining enough ego structure to function effectively in the world and serve others.',
        keyThemes: [
            'Spiritual Transcendence & Unity',
            'Divine Surrender & Trust',
            'Compassionate Service',
            'Mystical Experience & Vision',
            'Ego Dissolution & Rebirth'
        ],
        growthOpportunities: [
            'Experience direct connection with divine love and universal consciousness',
            'Develop complete trust in divine timing and universal wisdom',
            'Serve others from a place of pure compassion without need for recognition',
            'Integrate mystical experiences with practical service and daily life',
            'Heal deep karmic patterns and ancestral wounds through spiritual practice'
        ],
        guidance: [
            'Surrender to divine will while maintaining enough practical grounding to function',
            'Use meditation, prayer, or contemplation to deepen your spiritual connection',
            'Serve others quietly and humbly without need for recognition or reward',
            'Trust your mystical experiences while maintaining discernment about their meaning',
            'Balance spiritual transcendence with practical responsibilities and relationships'
        ],
        watchFor: [
            'Complete ego dissolution that makes it difficult to function in practical life',
            'Spiritual bypassing or using transcendent experiences to avoid human responsibilities',
            'Martyrdom or sacrificing your well-being in the name of spiritual service',
            'Confusion between genuine spiritual experience and psychological projection',
            'Isolation from others due to feeling too sensitive or spiritually different'
        ],
        howThisShowsUp: [
            'Profound mystical experiences or direct encounters with divine presence',
            'Called to serve in hospitals, prisons, or other places where people are suffering',
            'Deep meditation practice or involvement in contemplative spiritual traditions',
            'Healing work that addresses karmic patterns or ancestral wounds',
            'Complete life transformation through spiritual awakening and surrender'
        ]
    },

    // PLUTO HOUSE TRANSITS
    [`${Planet.Pluto}-1`]: {
        title: 'Pluto in 1st House: Identity Phoenix & Power Reclamation',
        overview: 'The most transformative identity cycle possible. This period completely rebuilds who you are from the ground up, burning away false personas to reveal your authentic power and purpose.',
        coreLesson: 'Learning to wield your authentic personal power responsibly while allowing your true self to emerge from the ashes of who you used to be.',
        keyThemes: [
            'Complete Identity Transformation',
            'Personal Power & Authenticity',
            'Death & Rebirth of Self',
            'Psychological Depth & Truth',
            'Magnetic Presence & Influence'
        ],
        growthOpportunities: [
            'Discover and embody your authentic personal power and magnetic presence',
            'Transform limiting beliefs and patterns that have kept you small',
            'Develop psychological depth and understanding of human nature',
            'Use your transformative experiences to help others through their own changes',
            'Build unshakeable self-trust and inner authority'
        ],
        guidance: [
            'Embrace the death of old identity patterns even when it feels scary',
            'Use therapy or deep inner work to understand your psychological depths',
            'Practice using your power responsibly and for positive influence',
            'Trust the transformation process even when you can\'t see where it\'s leading',
            'Allow your authentic self to emerge naturally without forcing it'
        ],
        watchFor: [
            'Power struggles or trying to control others during your own transformation',
            'Resistance to necessary changes that keeps you stuck in old patterns',
            'Using your intensity or power to intimidate or manipulate others',
            'Identity crisis or feeling like you don\'t know who you are anymore',
            'Obsessive behavior or becoming fixated on control and perfection'
        ],
        howThisShowsUp: [
            'Complete personality transformation that surprises everyone who knows you',
            'Intense psychological work that reveals hidden aspects of yourself',
            'Dramatic changes in appearance, style, or how you present yourself',
            'Developing magnetic charisma and the ability to influence others positively',
            'Career or life direction changes that reflect your authentic power and purpose'
        ]
    },

    [`${Planet.Pluto}-2`]: {
        title: 'Pluto in 2nd House: Resource Transformation & Value Revolution',
        overview: 'A profound transformation of your relationship with money, possessions, and self-worth. This cycle destroys old financial patterns and rebuilds your entire approach to resources and value.',
        coreLesson: 'Learning that true wealth comes from inner resources and authentic self-worth, not external possessions or others\' approval.',
        keyThemes: [
            'Financial Transformation & Power',
            'Self-Worth Revolution',
            'Resource Mastery & Control',
            'Material Detachment & Rebirth',
            'Value System Overhaul'
        ],
        growthOpportunities: [
            'Transform your relationship with money from scarcity to empowered abundance',
            'Discover your true worth independent of material possessions or income',
            'Develop mastery over resources and the ability to create wealth from nothing',
            'Use financial challenges as opportunities for psychological and spiritual growth',
            'Build unshakeable self-worth based on your authentic value and contributions'
        ],
        guidance: [
            'Face financial fears directly and use them as opportunities for growth',
            'Invest in developing your inner resources and authentic talents',
            'Practice detachment from material possessions while still managing them wisely',
            'Use money as a tool for transformation and positive impact, not just accumulation',
            'Build wealth slowly and sustainably rather than seeking quick fixes'
        ],
        watchFor: [
            'Obsessive behavior around money, possessions, or financial security',
            'Power struggles over resources or trying to control others through money',
            'Complete financial destruction that requires rebuilding from scratch',
            'Confusing net worth with self-worth or using possessions to define identity',
            'Extreme swings between materialism and complete rejection of material concerns'
        ],
        howThisShowsUp: [
            'Major financial crises or windfalls that completely change your relationship with money',
            'Career changes that transform your earning potential and financial approach',
            'Discovering hidden talents or resources that become sources of wealth',
            'Intense focus on building financial security and long-term wealth',
            'Complete overhaul of spending habits, values, and relationship with possessions'
        ]
    },

    [`${Planet.Pluto}-3`]: {
        title: 'Pluto in 3rd House: Communication Transformation & Mental Power',
        overview: 'A period of profound transformation in how you think, communicate, and process information. This cycle gives you penetrating insight and the power to influence others through words.',
        coreLesson: 'Learning to use your mental and communication powers responsibly while developing the ability to see and speak truth that others cannot.',
        keyThemes: [
            'Penetrating Communication & Insight',
            'Mental Transformation & Power',
            'Truth-Seeking & Investigation',
            'Influential Writing & Speaking',
            'Psychological Understanding'
        ],
        growthOpportunities: [
            'Develop the ability to see through surface appearances to underlying truth',
            'Use your communication skills to transform and heal others',
            'Master research, investigation, and uncovering hidden information',
            'Transform your relationship with siblings, neighbors, and local community',
            'Become a powerful teacher, writer, or speaker who influences positive change'
        ],
        guidance: [
            'Use your penetrating insights to help rather than manipulate or control others',
            'Practice speaking truth with compassion rather than using words as weapons',
            'Channel your investigative abilities into meaningful research or healing work',
            'Transform conflicts with siblings or neighbors through honest communication',
            'Use your mental power to solve problems and create positive change'
        ],
        watchFor: [
            'Using your insights to manipulate or control others through psychological pressure',
            'Becoming obsessed with uncovering secrets or hidden information',
            'Power struggles through communication or trying to win arguments at all costs',
            'Mental intensity that overwhelms others or prevents clear communication',
            'Using your ability to see others\' shadows to judge or criticize rather than help'
        ],
        howThisShowsUp: [
            'Developing powerful writing, speaking, or teaching abilities that influence others',
            'Intense interest in psychology, investigation, or uncovering hidden truths',
            'Transformative conversations or communications that change relationships',
            'Research or study that leads to breakthrough insights or discoveries',
            'Changes in your local environment or relationships with siblings and neighbors'
        ]
    },

    [`${Planet.Pluto}-4`]: {
        title: 'Pluto in 4th House: Family Transformation & Emotional Rebirth',
        overview: 'The most intense family and emotional transformation possible. This cycle destroys old family patterns and emotional foundations to rebuild them on authentic truth and power.',
        coreLesson: 'Learning to create emotional security from your own inner strength while transforming family patterns that no longer serve anyone.',
        keyThemes: [
            'Family Pattern Transformation',
            'Emotional Depth & Rebirth',
            'Home & Security Revolution',
            'Ancestral Healing & Power',
            'Psychological Foundation Building'
        ],
        growthOpportunities: [
            'Transform deep family patterns and generational wounds through courage and truth',
            'Develop unshakeable emotional security based on your own inner strength',
            'Create a home environment that reflects your authentic power and values',
            'Heal ancestral trauma and break cycles that have affected multiple generations',
            'Use family challenges as opportunities for profound psychological growth'
        ],
        guidance: [
            'Face family truths directly even when they\'re painful or uncomfortable',
            'Use therapy or deep inner work to understand and heal family patterns',
            'Create healthy boundaries with family members while maintaining love',
            'Transform your living space to reflect your authentic self and values',
            'Practice forgiveness while still holding people accountable for their actions'
        ],
        watchFor: [
            'Power struggles with family members or trying to control family dynamics',
            'Becoming obsessed with family secrets or past traumas',
            'Complete destruction of family relationships without attempting healing',
            'Using family issues to avoid dealing with your own psychological work',
            'Emotional intensity that overwhelms family members or prevents healing'
        ],
        howThisShowsUp: [
            'Major family crises or revelations that force everyone to face the truth',
            'Complete transformation of your living situation or home environment',
            'Intensive family therapy or healing work that addresses generational patterns',
            'Taking on responsibility for family healing or becoming the family truth-teller',
            'Real estate transactions or property matters that involve power and transformation'
        ]
    },

    [`${Planet.Pluto}-5`]: {
        title: 'Pluto in 5th House: Creative Power & Authentic Expression',
        overview: 'A transformative period that unleashes your authentic creative power and transforms your approach to self-expression, romance, and children. This cycle burns away creative blocks and false expressions.',
        coreLesson: 'Learning to express your authentic creative power without fear while using your influence to inspire and transform others.',
        keyThemes: [
            'Creative Power & Transformation',
            'Authentic Self-Expression',
            'Intense Romance & Passion',
            'Transformative Parenting',
            'Artistic Depth & Influence'
        ],
        growthOpportunities: [
            'Unleash your authentic creative power and develop your unique artistic voice',
            'Transform your approach to romance and experience deeper, more passionate connections',
            'Use your creative work to heal, transform, and inspire others',
            'Develop a more authentic, empowering approach to parenting or working with children',
            'Channel your intensity and passion into meaningful creative projects'
        ],
        guidance: [
            'Trust your creative instincts even when they lead you into dark or intense territory',
            'Use your creative work as a form of therapy and transformation',
            'In romance, seek deep soul connections rather than superficial attractions',
            'If you have children, help them develop their own authentic power and expression',
            'Channel your passion and intensity into creative projects that serve others'
        ],
        watchFor: [
            'Creative obsessions or becoming so intense that you alienate your audience',
            'Power struggles in romantic relationships or trying to control your partner',
            'Using your creative influence to manipulate or control others',
            'Becoming overly controlling or intense with children',
            'Creative blocks caused by fear of your own power or authentic expression'
        ],
        howThisShowsUp: [
            'Breakthrough creative projects that reveal your authentic power and depth',
            'Intense, transformative romantic relationships that change you profoundly',
            'If you have children, major shifts in your parenting approach or their development',
            'Creative work that deals with deep, psychological, or transformative themes',
            'Recognition for creative work that has the power to heal or transform others'
        ]
    },

    [`${Planet.Pluto}-6`]: {
        title: 'Pluto in 6th House: Work Transformation & Health Mastery',
        overview: 'A period of complete transformation in your approach to work, health, and daily routines. This cycle destroys ineffective patterns and rebuilds your entire approach to productivity and wellness.',
        coreLesson: 'Learning to use work and health as vehicles for personal transformation while serving others through your mastery and expertise.',
        keyThemes: [
            'Work Mastery & Transformation',
            'Health Revolution & Healing',
            'Service Through Power',
            'Routine Optimization & Control',
            'Mind-Body Integration'
        ],
        growthOpportunities: [
            'Transform your work into a powerful vehicle for personal and collective change',
            'Develop mastery over your health through deep understanding of mind-body connection',
            'Use your work skills to heal, transform, or empower others',
            'Create daily routines that support both productivity and personal transformation',
            'Become an expert or authority in your field through intense focus and dedication'
        ],
        guidance: [
            'Approach work and health challenges as opportunities for transformation',
            'Use your growing expertise to serve and empower others',
            'Create sustainable routines that support long-term health and productivity',
            'Address health issues at their root cause rather than just treating symptoms',
            'Channel your intensity into becoming truly excellent at what you do'
        ],
        watchFor: [
            'Becoming obsessive about work, health, or daily routines',
            'Using your expertise or position to control or manipulate others',
            'Workaholic tendencies that destroy your health or relationships',
            'Power struggles with coworkers, employees, or health practitioners',
            'Extreme approaches to health that ignore balance and sustainability'
        ],
        howThisShowsUp: [
            'Complete career transformation or becoming a recognized expert in your field',
            'Major health crises or breakthroughs that transform your approach to wellness',
            'Taking on leadership roles or positions of authority in your work',
            'Developing healing abilities or becoming involved in transformative health practices',
            'Work that involves helping others through crisis, transformation, or healing'
        ]
    },

    [`${Planet.Pluto}-7`]: {
        title: 'Pluto in 7th House: Relationship Transformation & Partnership Power',
        overview: 'The most intense relationship transformation possible. This cycle completely transforms your approach to partnerships, often through powerful, life-changing relationships that force deep growth.',
        coreLesson: 'Learning to maintain your authentic power within partnerships while allowing relationships to transform you at the deepest levels.',
        keyThemes: [
            'Intense Partnership Transformation',
            'Power Dynamics & Balance',
            'Soul-Level Relationships',
            'Legal & Contractual Power',
            'Relationship Death & Rebirth'
        ],
        growthOpportunities: [
            'Experience relationships that transform you at the deepest psychological levels',
            'Learn to balance power and maintain authenticity within partnerships',
            'Develop the ability to see and heal relationship patterns and dynamics',
            'Use relationship challenges as opportunities for profound personal growth',
            'Create partnerships that support both people\'s transformation and empowerment'
        ],
        guidance: [
            'Embrace the transformative power of relationships even when it\'s uncomfortable',
            'Practice maintaining your authentic self while allowing partnership to change you',
            'Address power imbalances directly and honestly in all relationships',
            'Use relationship conflicts as opportunities to understand your own psychology',
            'Seek partners who are also committed to growth and transformation'
        ],
        watchFor: [
            'Power struggles or attempts to control or manipulate your partner',
            'Attracting partners who are controlling, manipulative, or psychologically unhealthy',
            'Becoming obsessed with relationships or unable to function independently',
            'Using relationships to avoid dealing with your own psychological issues',
            'Legal battles or contractual disputes that become consuming and destructive'
        ],
        howThisShowsUp: [
            'Intense, transformative relationships that change your entire approach to partnership',
            'Marriage, divorce, or other major relationship transitions that involve power and transformation',
            'Business partnerships that involve significant power, resources, or transformation',
            'Legal matters or contracts that require deep negotiation and psychological understanding',
            'Becoming a relationship counselor or helping others through relationship transformation'
        ]
    },

    [`${Planet.Pluto}-8`]: {
        title: 'Pluto in 8th House: Ultimate Transformation & Regenerative Power',
        overview: 'Pluto in its natural domain brings the most intense transformation possible. This cycle involves death and rebirth at the deepest levels, often through crisis, shared resources, and psychological depths.',
        coreLesson: 'Learning to embrace the cycles of death and rebirth as natural parts of life while developing mastery over shared resources and psychological power.',
        keyThemes: [
            'Death & Rebirth Mastery',
            'Shared Resource Power',
            'Psychological Depth & Healing',
            'Sexual & Intimate Transformation',
            'Occult & Hidden Knowledge'
        ],
        growthOpportunities: [
            'Master the art of transformation and help others through their own death-rebirth cycles',
            'Develop expertise in managing shared resources, investments, and other people\'s money',
            'Become a powerful healer or therapist who can work with psychological depths',
            'Transform your relationship with sexuality, intimacy, and vulnerability',
            'Develop understanding of hidden or occult knowledge and use it wisely'
        ],
        guidance: [
            'Embrace transformation as a natural and necessary part of life',
            'Use your understanding of psychology to heal rather than manipulate',
            'Approach shared resources and investments with wisdom and integrity',
            'Allow intimate relationships to transform you while maintaining healthy boundaries',
            'Use any occult or hidden knowledge for healing and positive transformation'
        ],
        watchFor: [
            'Becoming obsessed with death, transformation, or occult subjects',
            'Using psychological insights to manipulate or control others',
            'Power struggles over shared resources, inheritance, or investments',
            'Sexual obsessions or using sexuality as a form of power or control',
            'Getting lost in the darkness and forgetting the regenerative purpose of transformation'
        ],
        howThisShowsUp: [
            'Major life crises that force complete transformation and rebirth',
            'Significant involvement with shared resources, investments, or other people\'s money',
            'Developing powerful healing abilities or becoming a therapist or counselor',
            'Intense sexual or intimate relationships that transform your understanding of love',
            'Interest in occult subjects, death and dying, or other hidden aspects of life'
        ]
    },

    [`${Planet.Pluto}-9`]: {
        title: 'Pluto in 9th House: Belief Transformation & Wisdom Power',
        overview: 'A profound transformation of your belief systems, worldview, and relationship with truth. This cycle destroys limiting beliefs and rebuilds your entire philosophical foundation.',
        coreLesson: 'Learning to seek and embody truth with power and integrity while using your wisdom to transform and educate others.',
        keyThemes: [
            'Belief System Transformation',
            'Truth-Seeking & Power',
            'Educational Authority',
            'Cultural & Religious Revolution',
            'Wisdom Through Crisis'
        ],
        growthOpportunities: [
            'Transform limiting beliefs and develop a powerful, authentic philosophy of life',
            'Become a teacher, writer, or speaker who influences others\' worldviews',
            'Use travel or cultural experiences to deepen your understanding of truth',
            'Develop expertise in subjects that help others transform their beliefs',
            'Channel your search for truth into meaningful education or publishing'
        ],
        guidance: [
            'Question all inherited beliefs and develop your own relationship with truth',
            'Use your growing wisdom to educate and empower others',
            'Approach different cultures and belief systems with respect and openness',
            'Channel your intensity into meaningful study or research',
            'Share your insights in ways that inspire rather than intimidate'
        ],
        watchFor: [
            'Becoming dogmatic or fanatical about your beliefs or philosophy',
            'Using your knowledge or wisdom to control or manipulate others',
            'Rejecting all traditional wisdom in favor of only your own insights',
            'Getting into power struggles over religious, philosophical, or educational matters',
            'Using your authority as a teacher or expert to dominate rather than serve'
        ],
        howThisShowsUp: [
            'Complete transformation of your belief system or religious/spiritual orientation',
            'Becoming a powerful teacher, writer, or speaker in your field of expertise',
            'Travel or cultural experiences that profoundly change your worldview',
            'Legal or educational matters that involve significant power and transformation',
            'Publishing or sharing ideas that have the power to transform others\' thinking'
        ]
    },

    [`${Planet.Pluto}-10`]: {
        title: 'Pluto in 10th House: Career Transformation & Authority Power',
        overview: 'The ultimate career and public reputation transformation. This cycle destroys old professional identities and rebuilds your entire approach to success, authority, and public influence.',
        coreLesson: 'Learning to wield professional power and authority responsibly while using your public platform to create positive transformation.',
        keyThemes: [
            'Career Power & Transformation',
            'Public Authority & Influence',
            'Professional Mastery',
            'Reputation Revolution',
            'Leadership Through Crisis'
        ],
        growthOpportunities: [
            'Transform your career into a powerful vehicle for positive change and influence',
            'Develop authentic authority and leadership skills that inspire others',
            'Use your professional platform to address important social or environmental issues',
            'Become a recognized expert or authority in your field',
            'Build a reputation based on integrity, power, and meaningful contribution'
        ],
        guidance: [
            'Use your growing professional power to serve others and create positive change',
            'Build your career slowly and sustainably rather than seeking quick success',
            'Maintain integrity and authenticity even when it\'s professionally challenging',
            'Use your authority to empower others rather than dominate or control',
            'Channel your ambition into work that has lasting positive impact'
        ],
        watchFor: [
            'Becoming obsessed with power, status, or professional success',
            'Using your authority to control or manipulate others',
            'Ruthless ambition that destroys relationships or personal values',
            'Power struggles with authority figures or attempts to overthrow existing systems',
            'Professional scandals or reputation destruction due to misuse of power'
        ],
        howThisShowsUp: [
            'Major career transformation or rise to positions of significant authority',
            'Public recognition or notoriety that completely changes your reputation',
            'Leadership roles that involve managing crisis or transformation',
            'Professional work that deals with power, transformation, or healing',
            'Building a business or career that has significant impact on others\' lives'
        ]
    },

    [`${Planet.Pluto}-11`]: {
        title: 'Pluto in 11th House: Community Transformation & Collective Power',
        overview: 'A period of profound transformation in your relationship with groups, communities, and collective goals. This cycle gives you the power to influence and transform social movements.',
        coreLesson: 'Learning to use your influence within groups responsibly while working toward goals that serve collective transformation and empowerment.',
        keyThemes: [
            'Group Transformation & Leadership',
            'Collective Power & Influence',
            'Social Movement Participation',
            'Friendship Depth & Intensity',
            'Future Vision & Revolution'
        ],
        growthOpportunities: [
            'Become a powerful force for positive change within groups and communities',
            'Develop the ability to influence and transform collective consciousness',
            'Use your network and friendships to create meaningful social change',
            'Work toward goals that serve collective healing and empowerment',
            'Channel your intensity into movements that address important social issues'
        ],
        guidance: [
            'Use your influence within groups to empower others rather than control them',
            'Choose your associations carefully and align with groups that share your values',
            'Channel your passion into causes that serve collective transformation',
            'Practice transparency and integrity in all group interactions',
            'Use your ability to see group dynamics to heal rather than manipulate'
        ],
        watchFor: [
            'Power struggles within groups or attempts to control collective decisions',
            'Becoming obsessed with social causes or losing perspective on practical reality',
            'Using your influence to manipulate group dynamics for personal gain',
            'Attracting or creating drama and intensity within friendships and groups',
            'Rejecting all group involvement due to fear of losing individual power'
        ],
        howThisShowsUp: [
            'Leadership roles in powerful social movements or transformative organizations',
            'Intense friendships that involve mutual transformation and empowerment',
            'Working toward collective goals that address deep social or environmental issues',
            'Using technology or social media to influence collective consciousness',
            'Group experiences that involve crisis, transformation, or healing'
        ]
    },

    [`${Planet.Pluto}-12`]: {
        title: 'Pluto in 12th House: Soul Transformation & Hidden Power',
        overview: 'The deepest possible transformation involving the unconscious, spiritual realms, and hidden aspects of life. This cycle transforms you at the soul level through surrender and service.',
        coreLesson: 'Learning to surrender your ego-will to serve something greater while developing mastery over unconscious patterns and hidden spiritual power.',
        keyThemes: [
            'Soul-Level Transformation',
            'Unconscious Pattern Mastery',
            'Hidden Spiritual Power',
            'Service Through Surrender',
            'Karmic Healing & Release'
        ],
        growthOpportunities: [
            'Transform deep unconscious patterns that have controlled your life',
            'Develop powerful spiritual abilities and connection to universal wisdom',
            'Use your experiences of crisis and transformation to help others heal',
            'Master the art of surrender while maintaining personal power',
            'Heal karmic patterns and ancestral wounds through spiritual practice'
        ],
        guidance: [
            'Surrender to the transformation process even when you can\'t understand it',
            'Use meditation, therapy, or spiritual practice to work with unconscious material',
            'Serve others quietly and humbly without need for recognition',
            'Trust your spiritual experiences while maintaining practical grounding',
            'Use your understanding of hidden dynamics to heal rather than manipulate'
        ],
        watchFor: [
            'Becoming lost in unconscious patterns or spiritual fantasy',
            'Using spiritual or psychic abilities to control or manipulate others',
            'Martyrdom or sacrificing your well-being in the name of service',
            'Avoiding practical responsibilities through spiritual bypassing',
            'Becoming obsessed with hidden knowledge or occult subjects'
        ],
        howThisShowsUp: [
            'Profound spiritual transformation that changes your entire relationship with life',
            'Work in hospitals, prisons, or other institutions serving those in crisis',
            'Developing powerful healing abilities or becoming a spiritual teacher',
            'Experiences of ego death and rebirth through spiritual practice',
            'Healing work that addresses deep karmic patterns or ancestral trauma'
        ]
    }
};

// Helper function to get interpretation
export function getLifeCycleInterpretation(
    type: 'house-transit' | 'aspect-cycle' | 'planetary-return',
    planet: Planet,
    houseNumber?: number,
    natalPlanet?: Planet,
    aspectType?: string
): LifeCycleInterpretation | null {
    if (type !== 'house-transit' || !houseNumber) return null;

    // Use explicit Planet enum value to ensure key matching
    const key = `${planet}-${houseNumber}`;

    // First try to get the bespoke interpretation
    const bespoke = HOUSE_TRANSIT_INTERPRETATIONS[key];
    if (bespoke) return bespoke;

    // Fall back to generated interpretation using standard definitions
    return createFallbackInterpretation(planet, houseNumber);
}