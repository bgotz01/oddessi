//lib/astrology/interpretations/houses.ts

import { Planet } from '@/types/astrology';

// House enum for type safety
export enum House {
    First = 1,
    Second = 2,
    Third = 3,
    Fourth = 4,
    Fifth = 5,
    Sixth = 6,
    Seventh = 7,
    Eighth = 8,
    Ninth = 9,
    Tenth = 10,
    Eleventh = 11,
    Twelfth = 12
}

// Planet-House interpretation interface
export interface PlanetHouseInterpretation {
    meaning: string;              // 2-4 word essence (e.g., "Career-Focused Identity")
    shortDescription: string;     // 1-2 sentences, 50-100 words
    detailedDescription: string;  // 3-5 sentences, 150-300 words
    lifeAreaFocus: string;       // Primary life area where planet expresses
    manifestation: string[];     // 3-4 ways this shows up in that house
    opportunities: string[];     // 3-4 positive potentials
    challenges: string[];        // 3-4 potential difficulties
    keywords: string[];          // 5-8 relevant keywords
    developmentTips: string[];   // 3-4 practical suggestions
}

// House information interface
export interface HouseInfo {
    number: number;
    name: string;
    description: string;
    lifeAreas: string[];
    keywords: string[];
    element: string; // Angular, Succedent, Cadent
    modality: string; // Personal, Interpersonal, Universal
}

// House type explanations
export const HOUSE_TYPE_EXPLANATIONS = {
    Angular: {
        name: "Angular Houses",
        description: "The most powerful and dynamic houses (1st, 4th, 7th, 10th). These houses represent the four cardinal points of your chart and are associated with action, initiation, and major life themes. Planets in angular houses have strong influence and are highly active in your life.",
        characteristics: ["Action-oriented", "Dynamic", "Influential", "Cardinal energy", "Life-shaping"],
        houses: [1, 4, 7, 10]
    },
    Succedent: {
        name: "Succedent Houses",
        description: "The stabilizing houses (2nd, 5th, 8th, 11th). These houses follow the angular houses and represent consolidation, building, and maintaining what was initiated. They deal with resources, values, and sustaining power.",
        characteristics: ["Stabilizing", "Building", "Resource-focused", "Fixed energy", "Sustaining"],
        houses: [2, 5, 8, 11]
    },
    Cadent: {
        name: "Cadent Houses",
        description: "The adaptable and transitional houses (3rd, 6th, 9th, 12th). These houses represent learning, adaptation, and preparation for the next cycle. They deal with communication, service, wisdom, and spiritual growth.",
        characteristics: ["Adaptable", "Learning-focused", "Transitional", "Mutable energy", "Preparatory"],
        houses: [3, 6, 9, 12]
    }
};

// House basic information
export const HOUSE_INFO: Record<House, HouseInfo> = {
    [House.First]: {
        number: 1,
        name: "Self & Identity",
        description: "Your core identity, physical appearance, first impressions, and how you instinctively approach life. This is your 'mask' to the world and your natural way of being. The Ascendant (rising sign) is the cusp of this house and represents your outer personality and life approach.",
        lifeAreas: ["Identity", "Appearance", "First Impressions", "Self-Expression", "Personal Style", "Physical Body", "Life Approach", "Personality Mask"],
        keywords: ["Self", "Identity", "Appearance", "Personality", "First Impressions", "Approach to Life", "Ascendant", "Physical Presence"],
        element: "Angular",
        modality: "Personal"
    },
    [House.Second]: {
        number: 2,
        name: "Values & Resources",
        description: "Your personal values, money, possessions, self-worth, and material resources. This house governs what you value most, how you earn and spend money, your relationship with material security, and your sense of self-worth. It also relates to your talents and natural abilities that can generate income.",
        lifeAreas: ["Money", "Possessions", "Self-Worth", "Values", "Resources", "Material Security", "Talents", "Earning Ability", "Personal Assets"],
        keywords: ["Money", "Possessions", "Values", "Self-Worth", "Resources", "Material World", "Security", "Talents", "Assets"],
        element: "Succedent",
        modality: "Personal"
    },
    [House.Third]: {
        number: 3,
        name: "Mind & Communication",
        description: "Communication, learning, siblings, neighbors, short trips, and your immediate environment. This house governs how you think, learn, and share information. It includes your relationship with siblings, your local community, short-distance travel, and all forms of communication including writing, speaking, and digital media.",
        lifeAreas: ["Communication", "Learning", "Siblings", "Local Environment", "Short Trips", "Daily Interactions", "Writing", "Teaching", "Neighbors", "Mental Processes"],
        keywords: ["Communication", "Learning", "Siblings", "Local Travel", "Information", "Daily Life", "Writing", "Teaching", "Neighbors", "Mental Activity"],
        element: "Cadent",
        modality: "Personal"
    },
    [House.Fourth]: {
        number: 4,
        name: "Home & Roots",
        description: "Home, family, roots, emotional foundation, and your private life. This house represents your deepest emotional needs, your relationship with family (especially mother/maternal figures), your home environment, and your sense of belonging. The IC (Imum Coeli) is the cusp of this house and represents your emotional foundation and ancestral roots.",
        lifeAreas: ["Home", "Family", "Roots", "Emotional Security", "Private Life", "Foundation", "Ancestry", "Mother", "Real Estate", "Inner Self"],
        keywords: ["Home", "Family", "Roots", "Foundation", "Private Life", "Emotional Security", "Ancestry", "IC", "Inner World", "Belonging"],
        element: "Angular",
        modality: "Personal"
    },
    [House.Fifth]: {
        number: 5,
        name: "Creativity & Expression",
        description: "Creativity, romance, children, fun, self-expression, and what brings you joy. This house governs your creative talents, romantic relationships, connection with children (your own or others'), recreational activities, hobbies, and all forms of self-expression that bring pleasure and fulfillment to your life.",
        lifeAreas: ["Creativity", "Romance", "Children", "Fun", "Self-Expression", "Joy", "Entertainment", "Hobbies", "Recreation", "Artistic Talents"],
        keywords: ["Creativity", "Romance", "Children", "Fun", "Joy", "Self-Expression", "Play", "Art", "Entertainment", "Pleasure"],
        element: "Succedent",
        modality: "Personal"
    },
    [House.Sixth]: {
        number: 6,
        name: "Work & Health",
        description: "Daily work, health, service, routines, and practical responsibilities. This house governs your work environment, health and wellness practices, daily routines, service to others, and your approach to practical matters. It also relates to pets, employees, and your general attitude toward duty and responsibility.",
        lifeAreas: ["Work", "Health", "Service", "Daily Routines", "Responsibilities", "Practical Matters", "Pets", "Employees", "Wellness", "Duty"],
        keywords: ["Work", "Health", "Service", "Routine", "Responsibility", "Practical Life", "Wellness", "Daily Tasks", "Duty", "Efficiency"],
        element: "Cadent",
        modality: "Personal"
    },
    [House.Seventh]: {
        number: 7,
        name: "Partnership & Exchange",
        description: "Marriage, business partnerships, open enemies, and one-on-one relationships. This house represents your approach to committed partnerships, how you relate to others as equals, legal matters, and what you seek in a life partner. The Descendant is the cusp of this house and represents your ideal partner and how you relate to others.",
        lifeAreas: ["Marriage", "Partnerships", "Relationships", "Cooperation", "Open Enemies", "Others", "Legal Matters", "Contracts", "Equality", "Balance"],
        keywords: ["Partnerships", "Marriage", "Relationships", "Others", "Cooperation", "Balance", "Descendant", "Legal", "Contracts", "Equality"],
        element: "Angular",
        modality: "Interpersonal"
    },
    [House.Eighth]: {
        number: 8,
        name: "Transformation & Shared Resources",
        description: "Shared money, taxes, death, rebirth, transformation, and deep psychology. This house governs joint finances, investments, insurance, taxes, inheritance, and other people's money. It also represents psychological transformation, sexuality, occult interests, and profound life changes that lead to personal rebirth and regeneration. Forced transformation rather than chosen growth—you don't opt in to 8th-house cycles. They arrive.",
        lifeAreas: ["Shared Resources", "Transformation", "Psychology", "Death/Rebirth", "Taxes", "Intimacy", "Investments", "Insurance", "Inheritance", "Occult"],
        keywords: ["Transformation", "Shared Resources", "Psychology", "Rebirth", "Intimacy", "Hidden", "Investments", "Taxes", "Regeneration", "Deep Change"],
        element: "Succedent",
        modality: "Interpersonal"
    },
    [House.Ninth]: {
        number: 9,
        name: "Belief & Meaning",
        description: "Higher education, philosophy, religion, long-distance travel, and wisdom. This house represents your quest for meaning, higher learning, spiritual beliefs, foreign cultures, publishing, legal matters, and your personal philosophy of life. It governs universities, teachers, mentors, and your relationship with wisdom and truth.",
        lifeAreas: ["Higher Education", "Philosophy", "Religion", "Travel", "Wisdom", "Publishing", "Legal Matters", "Foreign Cultures", "Teaching", "Spirituality"],
        keywords: ["Philosophy", "Higher Learning", "Travel", "Wisdom", "Religion", "Expansion", "Foreign", "Publishing", "Teaching", "Meaning"],
        element: "Cadent",
        modality: "Interpersonal"
    },
    [House.Tenth]: {
        number: 10,
        name: "Career & Status",
        description: "Career, public image, reputation, authority, and life direction. This house represents your professional life, public reputation, relationship with authority figures, and your contribution to society. The Midheaven (MC) is the cusp of this house and represents your career path, public image, and life goals.",
        lifeAreas: ["Career", "Reputation", "Authority", "Public Image", "Life Direction", "Achievement", "Status", "Professional Goals", "Social Standing", "Legacy"],
        keywords: ["Career", "Reputation", "Authority", "Public Image", "Achievement", "Status", "MC", "Professional", "Goals", "Recognition"],
        element: "Angular",
        modality: "Universal"
    },
    [House.Eleventh]: {
        number: 11,
        name: "Networks & Collective",
        description: "Friends, groups, hopes, dreams, social networks, and future goals. This house represents your friendships, group associations, social causes, hopes and wishes for the future, and your role in the larger community. It governs social networks, humanitarian interests, and collective endeavors.",
        lifeAreas: ["Friends", "Groups", "Hopes", "Dreams", "Social Networks", "Future Goals", "Community", "Humanitarian Causes", "Collective Endeavors", "Wishes"],
        keywords: ["Friends", "Groups", "Hopes", "Dreams", "Social Networks", "Future", "Community", "Humanitarian", "Collective", "Wishes"],
        element: "Succedent",
        modality: "Universal"
    },
    [House.Twelfth]: {
        number: 12,
        name: "Inner World & Retreat",
        description: "Spirituality, subconscious, hidden things, sacrifice, and transcendence. This house represents your connection to the divine, subconscious patterns, hidden enemies, self-undoing, charitable service, and spiritual growth. It governs meditation, dreams, psychic abilities, and your relationship with the collective unconscious.",
        lifeAreas: ["Spirituality", "Subconscious", "Hidden", "Sacrifice", "Transcendence", "Service", "Dreams", "Meditation", "Psychic Abilities", "Collective Unconscious"],
        keywords: ["Spirituality", "Subconscious", "Hidden", "Sacrifice", "Transcendence", "Mystical", "Dreams", "Service", "Psychic", "Divine"],
        element: "Cadent",
        modality: "Universal"
    }
};

// Function to get house type explanation
export function getHouseTypeExplanation(houseType: string) {
    return HOUSE_TYPE_EXPLANATIONS[houseType as keyof typeof HOUSE_TYPE_EXPLANATIONS] || null;
}

// Function to get all house type explanations
export function getAllHouseTypeExplanations() {
    return HOUSE_TYPE_EXPLANATIONS;
}

// Sun in Houses interpretations
export const SUN_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Natural Leader",
        shortDescription: "Your identity is front and center. You're naturally confident, self-focused, and make strong first impressions.",
        detailedDescription: "With the Sun in the 1st House, your core identity shines through your personality and appearance. You're naturally confident, charismatic, and tend to be the center of attention wherever you go. Your sense of self is strong and well-developed, and you express your individuality boldly. People notice you immediately, and you have a natural leadership quality that draws others to you. Your life purpose is closely tied to developing and expressing your authentic self.",
        lifeAreaFocus: "Personal identity and self-expression",
        manifestation: [
            "Strong, confident personality that others notice immediately",
            "Natural leadership abilities and charismatic presence",
            "Clear sense of personal identity and individual style",
            "Tendency to be the center of attention in social situations"
        ],
        opportunities: [
            "Develop natural leadership and inspire others",
            "Build strong personal brand and authentic self-expression",
            "Use charisma to achieve personal and professional goals",
            "Become a role model or influential figure in your field"
        ],
        challenges: [
            "May come across as self-centered or egotistical",
            "Tendency to dominate conversations or situations",
            "Difficulty sharing spotlight or working in supporting roles",
            "May struggle with criticism or not being the focus"
        ],
        keywords: ["Leadership", "Confidence", "Charisma", "Self-Expression", "Identity", "Presence", "Individuality", "Authenticity"],
        developmentTips: [
            "Practice active listening to balance your natural tendency to lead conversations",
            "Develop your leadership skills through formal training or mentorship",
            "Use your natural confidence to help others build their self-esteem",
            "Find healthy outlets for your need to be seen and recognized"
        ]
    },
    [House.Second]: {
        meaning: "Value Builder",
        shortDescription: "Your identity is tied to what you value and own. You focus on building security, wealth, and material stability.",
        detailedDescription: "With the Sun in the 2nd House, your core identity is closely connected to your values, possessions, and sense of material security. You have a natural talent for building wealth and creating stability in your life. Your self-worth is often tied to your financial success and the quality of your possessions. You're practical, reliable, and have good business instincts. Your life purpose involves learning to value yourself beyond material possessions while still honoring your need for security and comfort.",
        lifeAreaFocus: "Money, possessions, and personal values",
        manifestation: [
            "Strong focus on building financial security and wealth",
            "Natural business instincts and practical money management",
            "Identity closely tied to possessions and material success",
            "Appreciation for quality, beauty, and luxury items"
        ],
        opportunities: [
            "Build substantial wealth through practical business ventures",
            "Develop expertise in finance, real estate, or luxury goods",
            "Create beautiful, comfortable living spaces that reflect your values",
            "Help others achieve financial stability and security"
        ],
        challenges: [
            "Self-worth may be too dependent on material possessions",
            "Tendency to be materialistic or overly focused on money",
            "May struggle with generosity or sharing resources",
            "Difficulty finding value in non-material aspects of life"
        ],
        keywords: ["Values", "Security", "Wealth", "Possessions", "Stability", "Practical", "Material", "Self-Worth"],
        developmentTips: [
            "Develop a healthy relationship with money as a tool, not identity",
            "Practice generosity and sharing your resources with others",
            "Explore what you truly value beyond material possessions",
            "Use your practical skills to help others achieve financial stability"
        ]
    },
    [House.Third]: {
        meaning: "Natural Communicator",
        shortDescription: "Your identity shines through communication, learning, and connecting with your immediate environment.",
        detailedDescription: "With the Sun in the 3rd House, your core identity is expressed through communication, learning, and your interactions with the immediate world around you. You're naturally curious, articulate, and have a gift for sharing information and ideas. Your relationships with siblings, neighbors, and your local community are important to your sense of self. You're a lifelong learner who thrives on mental stimulation and variety. Your life purpose involves using your communication skills to educate, inform, or connect people.",
        lifeAreaFocus: "Communication, learning, and local connections",
        manifestation: [
            "Excellent communication skills and natural way with words",
            "Strong curiosity and love of learning new things",
            "Important relationships with siblings, neighbors, or local community",
            "Talent for teaching, writing, or sharing information"
        ],
        opportunities: [
            "Excel in careers involving communication, writing, or teaching",
            "Build strong networks within your local community",
            "Become a bridge between different groups or ideas",
            "Use your communication skills to educate and inspire others"
        ],
        challenges: [
            "May scatter energy across too many interests or projects",
            "Tendency to be superficial rather than going deep",
            "Difficulty focusing on one thing for extended periods",
            "May gossip or share information inappropriately"
        ],
        keywords: ["Communication", "Learning", "Curiosity", "Teaching", "Writing", "Local", "Siblings", "Information"],
        developmentTips: [
            "Focus your diverse interests into a few key areas of expertise",
            "Practice deep listening to complement your natural speaking ability",
            "Use your communication gifts to educate and uplift others",
            "Develop patience for long-term projects that require sustained focus"
        ]
    },
    [House.Fourth]: {
        meaning: "Family Foundation",
        shortDescription: "Your identity is rooted in home, family, and emotional security. You're the foundation for others.",
        detailedDescription: "With the Sun in the 4th House, your core identity is deeply connected to your home, family, and emotional roots. You have a strong need for security and belonging, and you often serve as the emotional foundation for others. Your family background and heritage play a significant role in shaping who you are. You're naturally nurturing, protective, and have strong instincts about creating safe, comfortable spaces. Your life purpose involves creating emotional security for yourself and others, often through building strong family connections or home-based endeavors.",
        lifeAreaFocus: "Home, family, and emotional foundation",
        manifestation: [
            "Strong connection to family, heritage, and personal roots",
            "Natural ability to create warm, welcoming home environments",
            "Protective instincts and nurturing approach to relationships",
            "Identity closely tied to family role or domestic achievements"
        ],
        opportunities: [
            "Excel in real estate, interior design, or home-based businesses",
            "Become the emotional anchor and support system for family",
            "Create beautiful, nurturing spaces that heal and comfort others",
            "Preserve family traditions and pass them on to future generations"
        ],
        challenges: [
            "May be overly dependent on family approval or support",
            "Tendency to be moody or emotionally reactive",
            "Difficulty leaving comfort zone or family environment",
            "May struggle with boundaries between personal and family identity"
        ],
        keywords: ["Home", "Family", "Roots", "Security", "Nurturing", "Foundation", "Heritage", "Emotional"],
        developmentTips: [
            "Develop independence while maintaining strong family connections",
            "Create healthy boundaries between your needs and family expectations",
            "Use your nurturing gifts to support others beyond your immediate family",
            "Build emotional security from within rather than external validation"
        ]
    },
    [House.Fifth]: {
        meaning: "Creative Self-Expression",
        shortDescription: "Your identity shines through creativity, romance, and joyful self-expression. You bring light and fun to life.",
        detailedDescription: "With the Sun in the 5th House, your core identity is expressed through creativity, romance, and joyful self-expression. You have a natural flair for drama, entertainment, and bringing joy to others. Children, whether your own or others', play an important role in your life. You're playful, generous, and have a strong need to create and be appreciated for your unique talents. Your life purpose involves sharing your creative gifts with the world and helping others find their own joy and self-expression.",
        lifeAreaFocus: "Creativity, romance, and joyful expression",
        manifestation: [
            "Strong creative talents and artistic self-expression",
            "Natural ability to entertain, perform, or bring joy to others",
            "Important relationships with children or childlike wonder",
            "Romantic nature and appreciation for love and beauty"
        ],
        opportunities: [
            "Excel in creative fields like arts, entertainment, or design",
            "Inspire others through your joyful, enthusiastic approach to life",
            "Build meaningful relationships with children or through teaching",
            "Create works of art or entertainment that bring joy to many"
        ],
        challenges: [
            "May be overly dramatic or attention-seeking",
            "Tendency to be self-centered or demanding of admiration",
            "Difficulty with criticism of creative work or personal expression",
            "May struggle with routine work or non-creative responsibilities"
        ],
        keywords: ["Creativity", "Romance", "Joy", "Children", "Entertainment", "Drama", "Self-Expression", "Play"],
        developmentTips: [
            "Channel your creative energy into meaningful projects that serve others",
            "Practice humility and accept constructive feedback on your work",
            "Balance your need for attention with genuine care for others",
            "Find ways to bring creativity and joy into everyday responsibilities"
        ]
    },
    [House.Sixth]: {
        meaning: "Service-Oriented Leader",
        shortDescription: "Your identity is built through work, service, and daily responsibilities. You lead through practical contribution.",
        detailedDescription: "With the Sun in the 6th House, your core identity is expressed through your work, service to others, and attention to daily responsibilities. You have a strong work ethic and take pride in being useful and productive. Health and wellness are important to you, both personally and in helping others. You're detail-oriented, reliable, and have a natural ability to organize and improve systems. Your life purpose involves serving others through your skills and expertise while maintaining your own health and well-being.",
        lifeAreaFocus: "Work, health, and service to others",
        manifestation: [
            "Strong work ethic and pride in practical accomplishments",
            "Natural ability to organize, improve systems, and solve problems",
            "Focus on health, wellness, and maintaining good daily routines",
            "Identity tied to being useful, helpful, and of service to others"
        ],
        opportunities: [
            "Excel in healthcare, service industries, or organizational roles",
            "Become an expert in efficiency, wellness, or practical skills",
            "Help others improve their health, work habits, or daily routines",
            "Build reputation through consistent, high-quality work and service"
        ],
        challenges: [
            "May become overly critical of self and others",
            "Tendency to worry excessively about health or work performance",
            "Difficulty relaxing or taking time off from responsibilities",
            "May undervalue contributions or struggle with perfectionism"
        ],
        keywords: ["Service", "Work", "Health", "Organization", "Practical", "Helpful", "Routine", "Improvement"],
        developmentTips: [
            "Practice self-compassion and avoid excessive self-criticism",
            "Set boundaries between work time and personal time",
            "Recognize and celebrate your valuable contributions to others",
            "Focus on progress rather than perfection in your work and health"
        ]
    },
    [House.Seventh]: {
        meaning: "Partnership-Focused Identity",
        shortDescription: "Your identity develops through relationships and partnerships. You shine when collaborating with others.",
        detailedDescription: "With the Sun in the 7th House, your core identity is developed and expressed through your relationships and partnerships. You have a natural ability to cooperate, collaborate, and bring out the best in others. Marriage and close partnerships are central to your life purpose and personal growth. You're diplomatic, fair-minded, and skilled at seeing multiple perspectives. Your sense of self is often defined in relation to others, and you thrive when you have a significant partner or collaborator to work with.",
        lifeAreaFocus: "Partnerships, marriage, and one-on-one relationships",
        manifestation: [
            "Strong focus on marriage, partnerships, and close relationships",
            "Natural diplomatic skills and ability to mediate conflicts",
            "Identity often defined in relation to significant others",
            "Talent for collaboration and bringing out the best in partners"
        ],
        opportunities: [
            "Excel in careers involving partnerships, law, or diplomacy",
            "Build strong, lasting marriages and business partnerships",
            "Become a skilled mediator or relationship counselor",
            "Use collaborative approach to achieve greater success than alone"
        ],
        challenges: [
            "May lose sense of individual identity in relationships",
            "Tendency to be overly dependent on others for validation",
            "Difficulty making decisions without consulting partners",
            "May attract partners who are overly dominant or controlling"
        ],
        keywords: ["Partnership", "Marriage", "Cooperation", "Diplomacy", "Balance", "Relationships", "Collaboration", "Others"],
        developmentTips: [
            "Develop a strong sense of individual identity alongside partnerships",
            "Practice making independent decisions and trusting your judgment",
            "Choose partners who support your individual growth and goals",
            "Use your diplomatic skills to help others resolve conflicts"
        ]
    },
    [House.Eighth]: {
        meaning: "Transformational Leader",
        shortDescription: "Your identity is forged through transformation, shared resources, and deep psychological work.",
        detailedDescription: "With the Sun in the 8th House, your core identity is developed through intense experiences of transformation, shared resources, and deep psychological exploration. You have a natural ability to help others through crisis and change. You're drawn to the mysteries of life, death, and rebirth, and you're not afraid to explore the darker or hidden aspects of existence. Your life purpose involves transformation - both personal and helping others transform their lives. You may work with other people's money, resources, or psychological healing.",
        lifeAreaFocus: "Transformation, shared resources, and deep psychology",
        manifestation: [
            "Natural ability to handle crisis, change, and transformation",
            "Interest in psychology, healing, or working with shared resources",
            "Comfortable with intense, deep, or taboo subjects",
            "Identity forged through overcoming challenges and personal transformation"
        ],
        opportunities: [
            "Excel in psychology, therapy, finance, or crisis management",
            "Help others through major life transitions and transformations",
            "Develop expertise in investments, taxes, or shared financial resources",
            "Become a powerful agent of healing and positive change"
        ],
        challenges: [
            "May be drawn to drama, intensity, or crisis situations",
            "Tendency to be secretive or overly private about personal matters",
            "Difficulty with surface-level relationships or small talk",
            "May struggle with trust issues or fear of vulnerability"
        ],
        keywords: ["Transformation", "Intensity", "Psychology", "Shared Resources", "Crisis", "Healing", "Deep", "Rebirth"],
        developmentTips: [
            "Channel your intensity into positive transformation for yourself and others",
            "Practice healthy vulnerability and trust-building in relationships",
            "Use your crisis management skills to help others in need",
            "Balance deep work with lighter, more playful activities"
        ]
    },
    [House.Ninth]: {
        meaning: "Wisdom Seeker",
        shortDescription: "Your identity is expressed through higher learning, philosophy, and expanding horizons through travel and wisdom.",
        detailedDescription: "With the Sun in the 9th House, your core identity is expressed through your quest for higher knowledge, wisdom, and expanded understanding of the world. You're naturally philosophical, optimistic, and drawn to explore different cultures, beliefs, and ways of thinking. Travel, higher education, and spiritual or religious pursuits are important to your personal development. You have a gift for teaching, publishing, or sharing your knowledge with others. Your life purpose involves expanding your own horizons and helping others broaden their perspectives.",
        lifeAreaFocus: "Higher education, philosophy, travel, and wisdom",
        manifestation: [
            "Strong drive for higher education and philosophical understanding",
            "Love of travel, foreign cultures, and expanding horizons",
            "Natural teaching ability and desire to share knowledge",
            "Optimistic, adventurous approach to life and learning"
        ],
        opportunities: [
            "Excel in education, publishing, law, or international business",
            "Become a teacher, professor, or wisdom keeper in your field",
            "Travel extensively and learn from diverse cultures and perspectives",
            "Write, speak, or share your knowledge to inspire others"
        ],
        challenges: [
            "May be overly dogmatic or preachy about beliefs",
            "Tendency to be restless or always seeking the next adventure",
            "Difficulty with practical details or mundane responsibilities",
            "May struggle with narrow-minded or provincial thinking"
        ],
        keywords: ["Wisdom", "Philosophy", "Travel", "Teaching", "Higher Learning", "Adventure", "Optimism", "Expansion"],
        developmentTips: [
            "Balance your love of learning with practical application of knowledge",
            "Practice humility and remain open to different perspectives",
            "Use your teaching gifts to inspire rather than preach to others",
            "Ground your philosophical insights in real-world service"
        ]
    },
    [House.Tenth]: {
        meaning: "Natural Authority",
        shortDescription: "Your identity shines through career, public recognition, and leadership roles. You're meant to be seen and respected.",
        detailedDescription: "With the Sun in the 10th House, your core identity is expressed through your career, public image, and position of authority. You have natural leadership abilities and a strong drive for achievement and recognition. Your reputation and professional success are central to your sense of self. You're ambitious, responsible, and have the ability to inspire respect from others. Your life purpose involves achieving a position of influence where you can make a meaningful impact on the world and serve as a role model for others.",
        lifeAreaFocus: "Career, reputation, and public achievement",
        manifestation: [
            "Strong ambition and drive for professional success and recognition",
            "Natural leadership abilities and capacity for positions of authority",
            "Public image and reputation are important to sense of identity",
            "Ability to inspire respect and admiration from others"
        ],
        opportunities: [
            "Achieve high levels of success in chosen career or profession",
            "Become a respected leader, authority figure, or public personality",
            "Build a lasting legacy through professional achievements",
            "Use position of influence to make positive impact on society"
        ],
        challenges: [
            "May be overly focused on status, image, or external validation",
            "Tendency to be workaholic or neglect personal relationships",
            "Difficulty handling criticism or damage to reputation",
            "May struggle with work-life balance or personal fulfillment"
        ],
        keywords: ["Career", "Authority", "Achievement", "Recognition", "Leadership", "Reputation", "Success", "Public"],
        developmentTips: [
            "Balance professional ambition with personal relationships and self-care",
            "Use your leadership position to lift others up and create positive change",
            "Define success by your positive impact, not just external recognition",
            "Stay grounded and remember your values as you achieve greater success"
        ]
    },
    [House.Eleventh]: {
        meaning: "Visionary Friend",
        shortDescription: "Your identity is expressed through friendships, groups, and working toward future hopes and humanitarian goals.",
        detailedDescription: "With the Sun in the 11th House, your core identity is expressed through your friendships, group associations, and your vision for the future. You're naturally drawn to humanitarian causes and have a gift for bringing people together around shared ideals. Your friends and social networks are central to your sense of self and personal development. You're progressive, idealistic, and have the ability to inspire others to work toward a better future. Your life purpose involves using your social influence to create positive change in the world.",
        lifeAreaFocus: "Friendships, groups, hopes, and humanitarian goals",
        manifestation: [
            "Strong network of friends and involvement in group activities",
            "Natural ability to bring people together around shared causes",
            "Progressive, humanitarian outlook and concern for social issues",
            "Identity tied to hopes, dreams, and vision for the future"
        ],
        opportunities: [
            "Excel in social causes, community organizing, or group leadership",
            "Build influential networks that can create positive social change",
            "Inspire others to work toward humanitarian or progressive goals",
            "Use technology or innovation to connect people and spread ideas"
        ],
        challenges: [
            "May be overly idealistic or unrealistic about human nature",
            "Tendency to be more comfortable in groups than intimate relationships",
            "Difficulty with authority or traditional hierarchical structures",
            "May scatter energy across too many causes or social activities"
        ],
        keywords: ["Friends", "Groups", "Humanitarian", "Progressive", "Idealistic", "Future", "Social", "Innovation"],
        developmentTips: [
            "Balance group involvement with intimate, one-on-one relationships",
            "Focus your humanitarian efforts on a few key causes for greater impact",
            "Practice patience with those who don't share your progressive ideals",
            "Use your social influence responsibly to create positive change"
        ]
    },
    [House.Twelfth]: {
        meaning: "Spiritual Servant",
        shortDescription: "Your identity is developed through spirituality, service, and working behind the scenes to help others.",
        detailedDescription: "With the Sun in the 12th House, your core identity is developed through spiritual pursuits, selfless service, and working behind the scenes. You have a natural connection to the unconscious, spiritual realms, and the collective human experience. You're compassionate, intuitive, and drawn to help those who are suffering or marginalized. Your ego development may be delayed, but you have the potential for profound spiritual growth and service to humanity. Your life purpose involves transcending personal desires to serve something greater than yourself.",
        lifeAreaFocus: "Spirituality, service, and transcendence",
        manifestation: [
            "Strong spiritual or mystical inclinations and intuitive abilities",
            "Natural compassion and desire to help those who are suffering",
            "Comfortable working behind the scenes or in service roles",
            "Identity developed through spiritual growth and selfless service"
        ],
        opportunities: [
            "Excel in healing professions, spiritual counseling, or charitable work",
            "Develop profound spiritual wisdom and connection to the divine",
            "Help others through crisis, addiction, or spiritual awakening",
            "Create art, music, or writing that touches the soul"
        ],
        challenges: [
            "May struggle with low self-esteem or unclear sense of identity",
            "Tendency to be overly self-sacrificing or martyrlike",
            "Difficulty asserting personal needs or setting boundaries",
            "May be prone to escapism, addiction, or victim mentality"
        ],
        keywords: ["Spirituality", "Service", "Compassion", "Transcendence", "Intuition", "Sacrifice", "Hidden", "Mystical"],
        developmentTips: [
            "Develop healthy boundaries while maintaining your compassionate nature",
            "Practice self-care and avoid excessive self-sacrifice",
            "Use your spiritual gifts to help others while honoring your own needs",
            "Find healthy outlets for your mystical and creative inclinations"
        ]
    }
};

// Moon in Houses interpretations
export const MOON_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Emotionally Expressive",
        shortDescription: "Your emotions are visible and immediate. You wear your heart on your sleeve and have strong emotional reactions.",
        detailedDescription: "With the Moon in the 1st House, your emotions are front and center in your personality. You're naturally empathetic, intuitive, and your moods are easily visible to others. Your emotional state directly affects how you present yourself to the world. You have strong maternal or nurturing instincts and may appear younger than your age. Your emotional needs for security and comfort are tied to how others perceive and accept you. You're highly sensitive to your environment and the people around you.",
        lifeAreaFocus: "Emotional expression through personality and appearance",
        manifestation: [
            "Moods and emotions are clearly visible in facial expressions and demeanor",
            "Strong intuitive abilities and psychic sensitivity",
            "Nurturing, caring personality that others find comforting",
            "Emotional reactions are immediate and authentic"
        ],
        opportunities: [
            "Excel in counseling, caregiving, or healing professions",
            "Use emotional intelligence to connect deeply with others",
            "Develop strong intuitive abilities for guidance and insight",
            "Become a source of emotional support and comfort for others"
        ],
        challenges: [
            "May be overly emotional or moody in public situations",
            "Tendency to take things too personally or be oversensitive",
            "Difficulty maintaining emotional boundaries with others",
            "May struggle with emotional volatility or unpredictable moods"
        ],
        keywords: ["Emotional", "Intuitive", "Nurturing", "Sensitive", "Moody", "Caring", "Empathetic", "Visible"],
        developmentTips: [
            "Practice emotional regulation techniques like meditation or breathing exercises",
            "Learn to create healthy boundaries while maintaining your caring nature",
            "Use your emotional sensitivity as a strength in helping professions",
            "Develop self-awareness about your emotional triggers and patterns"
        ]
    },
    [House.Second]: {
        meaning: "Security Seeker",
        shortDescription: "Your emotional security comes through material stability, possessions, and financial comfort.",
        detailedDescription: "With the Moon in the 2nd House, your emotional well-being is closely tied to material security and financial stability. You have a strong need to accumulate possessions and resources that make you feel safe and comfortable. Food, money, and beautiful objects provide emotional comfort. You may have fluctuating income or emotional spending patterns. Your self-worth is connected to what you own and your ability to provide for yourself and loved ones. You have good instincts about investments and what will hold value over time.",
        lifeAreaFocus: "Emotional security through material possessions and financial stability",
        manifestation: [
            "Strong emotional connection to money, possessions, and material security",
            "Tendency to seek comfort through shopping, eating, or acquiring things",
            "Fluctuating income or emotional relationship with money",
            "Good instincts about investments and what has lasting value"
        ],
        opportunities: [
            "Excel in real estate, banking, or investment management",
            "Develop expertise in luxury goods, food, or comfort industries",
            "Build substantial wealth through emotional intelligence about markets",
            "Help others achieve financial security and material comfort"
        ],
        challenges: [
            "May be overly materialistic or possessive about belongings",
            "Tendency to emotional spending or hoarding behaviors",
            "Self-worth too dependent on financial status or possessions",
            "Difficulty sharing resources or being generous with money"
        ],
        keywords: ["Security", "Material", "Possessions", "Comfort", "Stability", "Value", "Resources", "Accumulation"],
        developmentTips: [
            "Develop a healthy relationship with money as security, not identity",
            "Practice gratitude for what you have rather than focusing on what you lack",
            "Learn to find emotional security from within rather than external possessions",
            "Use your material instincts to help others achieve financial stability"
        ]
    },
    [House.Third]: {
        meaning: "Emotional Communicator",
        shortDescription: "Your emotional needs are met through communication, learning, and connections with siblings and neighbors.",
        detailedDescription: "With the Moon in the 3rd House, your emotional well-being depends on communication, mental stimulation, and connections with your immediate environment. You have a strong need to share your feelings and thoughts with others. Siblings, neighbors, and your local community play an important role in your emotional life. You're naturally curious and emotionally invested in learning new things. Your moods may change frequently, and you process emotions through talking, writing, or other forms of communication.",
        lifeAreaFocus: "Emotional fulfillment through communication and local connections",
        manifestation: [
            "Strong emotional need to communicate feelings and thoughts",
            "Important relationships with siblings, neighbors, or local community",
            "Moods that change frequently based on conversations and interactions",
            "Emotional investment in learning, teaching, or sharing information"
        ],
        opportunities: [
            "Excel in writing, journalism, teaching, or communication fields",
            "Build strong networks within your local community",
            "Use emotional intelligence to facilitate understanding between people",
            "Become a counselor or therapist who helps others process emotions"
        ],
        challenges: [
            "May be overly talkative or share emotions inappropriately",
            "Tendency to be moody or emotionally scattered",
            "Difficulty keeping emotional information private or confidential",
            "May gossip or become emotionally involved in others' business"
        ],
        keywords: ["Communication", "Emotional", "Siblings", "Learning", "Local", "Sharing", "Moody", "Curious"],
        developmentTips: [
            "Practice active listening to balance your need to share emotions",
            "Learn appropriate boundaries for emotional sharing and privacy",
            "Use your communication gifts to help others process their feelings",
            "Develop emotional stability through regular journaling or writing"
        ]
    },
    [House.Fourth]: {
        meaning: "Home-Centered Emotions",
        shortDescription: "Your emotional security is deeply rooted in home, family, and creating a safe, nurturing environment.",
        detailedDescription: "With the Moon in the 4th House, your emotional well-being is fundamentally connected to your home, family, and sense of belonging. You have a powerful need for a secure, comfortable home base and strong family connections. Your relationship with your mother or maternal figures is especially significant. You're naturally nurturing and protective, with strong instincts about creating safe spaces for yourself and others. Your emotions run deep, and you may be quite private about your inner feelings. Tradition, heritage, and family history are emotionally important to you.",
        lifeAreaFocus: "Emotional security through home, family, and roots",
        manifestation: [
            "Deep emotional connection to home, family, and personal roots",
            "Strong nurturing instincts and protective feelings toward loved ones",
            "Significant relationship with mother or maternal figures",
            "Need for privacy and emotional security in personal spaces"
        ],
        opportunities: [
            "Excel in real estate, interior design, or family-oriented businesses",
            "Become the emotional foundation and support system for family",
            "Create healing, nurturing environments that comfort others",
            "Preserve and pass on family traditions and emotional wisdom"
        ],
        challenges: [
            "May be overly dependent on family or resistant to leaving home",
            "Tendency to be moody, clingy, or emotionally possessive",
            "Difficulty establishing independence from family expectations",
            "May struggle with emotional boundaries within family relationships"
        ],
        keywords: ["Home", "Family", "Nurturing", "Security", "Roots", "Private", "Protective", "Traditional"],
        developmentTips: [
            "Balance family loyalty with personal independence and growth",
            "Create healthy emotional boundaries while maintaining close family ties",
            "Use your nurturing gifts to support others beyond your immediate family",
            "Build emotional security from within while honoring your need for home"
        ]
    },
    [House.Fifth]: {
        meaning: "Joyful Heart",
        shortDescription: "Your emotional fulfillment comes through creativity, romance, children, and joyful self-expression.",
        detailedDescription: "With the Moon in the 5th House, your emotional well-being is tied to creativity, romance, and joyful self-expression. You have a playful, childlike heart and strong emotional connections to children, whether your own or others'. Creative pursuits provide emotional outlet and fulfillment. You're naturally dramatic and expressive with your emotions, and you need appreciation and recognition for your unique qualities. Romance and love affairs are emotionally significant, and you may have fluctuating experiences in love. You find emotional security through being seen and appreciated for who you truly are.",
        lifeAreaFocus: "Emotional fulfillment through creativity, romance, and joy",
        manifestation: [
            "Strong emotional connection to creative pursuits and artistic expression",
            "Important relationships with children or childlike wonder and playfulness",
            "Dramatic, expressive emotional nature that seeks appreciation",
            "Fluctuating but intense experiences in romance and love"
        ],
        opportunities: [
            "Excel in creative fields, entertainment, or working with children",
            "Use emotional expressiveness to inspire and entertain others",
            "Develop artistic talents that bring joy and beauty to the world",
            "Become a teacher or mentor who nurtures others' creative potential"
        ],
        challenges: [
            "May be overly dramatic or attention-seeking with emotions",
            "Tendency to be emotionally demanding or needy in relationships",
            "Difficulty handling criticism of creative work or personal expression",
            "May struggle with emotional maturity or taking responsibility"
        ],
        keywords: ["Creative", "Joyful", "Dramatic", "Children", "Romance", "Playful", "Expressive", "Appreciation"],
        developmentTips: [
            "Channel emotional expressiveness into creative projects that serve others",
            "Practice emotional maturity while maintaining your playful, joyful nature",
            "Balance your need for attention with genuine care and appreciation for others",
            "Use your connection with children to teach and inspire the next generation"
        ]
    },
    [House.Sixth]: {
        meaning: "Service-Oriented Care",
        shortDescription: "Your emotional security comes through daily routines, health practices, and serving others in practical ways.",
        detailedDescription: "With the Moon in the 6th House, your emotional well-being is connected to your daily routines, work environment, and service to others. You find emotional satisfaction in being useful and helpful in practical ways. Your health and daily habits are closely tied to your emotional state - stress affects your physical well-being directly. You may work in caregiving or service professions, and you have strong instincts about health and healing. Your emotions are expressed through practical care and attention to details that make life better for others.",
        lifeAreaFocus: "Emotional security through service, health, and daily routines",
        manifestation: [
            "Emotional satisfaction from being useful and helpful in practical ways",
            "Strong connection between emotional state and physical health",
            "Natural instincts about health, healing, and caring for others",
            "Emotional investment in work environment and daily routines"
        ],
        opportunities: [
            "Excel in healthcare, social services, or caregiving professions",
            "Develop expertise in nutrition, wellness, or holistic health",
            "Create organized, efficient systems that help others improve their lives",
            "Become a healer or helper who provides practical emotional support"
        ],
        challenges: [
            "May be overly critical or worried about health and daily matters",
            "Tendency to neglect own emotional needs while serving others",
            "Difficulty relaxing or taking breaks from service and responsibility",
            "May develop psychosomatic health issues from emotional stress"
        ],
        keywords: ["Service", "Health", "Practical", "Helpful", "Routine", "Caring", "Organized", "Healing"],
        developmentTips: [
            "Practice self-care and emotional nurturing while serving others",
            "Set healthy boundaries between work responsibilities and personal time",
            "Use your healing instincts to help others while maintaining your own wellness",
            "Find emotional fulfillment in small, practical acts of service and care"
        ]
    },
    [House.Seventh]: {
        meaning: "Relationship-Centered Emotions",
        shortDescription: "Your emotional security and identity are developed through partnerships, marriage, and close relationships.",
        detailedDescription: "With the Moon in the 7th House, your emotional well-being is fundamentally tied to your relationships and partnerships. You have a strong need for companionship and may feel incomplete without a significant other. Your emotions are often reflected through your partner, and you're highly sensitive to the emotional climate of your relationships. You're naturally diplomatic and skilled at understanding others' emotional needs. Marriage and close partnerships are central to your emotional development and sense of security. You may attract partners who are nurturing or emotionally expressive.",
        lifeAreaFocus: "Emotional fulfillment through partnerships and relationships",
        manifestation: [
            "Strong emotional need for partnership and close relationships",
            "Emotions often reflected or influenced by partner's emotional state",
            "Natural diplomatic skills and sensitivity to others' emotional needs",
            "Identity and security closely tied to relationship status and quality"
        ],
        opportunities: [
            "Excel in counseling, mediation, or relationship-focused careers",
            "Build deep, emotionally satisfying partnerships and marriages",
            "Use emotional intelligence to help others improve their relationships",
            "Become a bridge between people, helping them understand each other"
        ],
        challenges: [
            "May be overly dependent on others for emotional security and identity",
            "Tendency to lose individual emotional needs in relationships",
            "Difficulty being alone or making independent emotional decisions",
            "May attract emotionally needy or unstable partners"
        ],
        keywords: ["Partnership", "Relationships", "Emotional", "Dependent", "Diplomatic", "Marriage", "Others", "Reflection"],
        developmentTips: [
            "Develop emotional independence while maintaining capacity for partnership",
            "Practice identifying and expressing your own emotional needs in relationships",
            "Choose partners who support your individual emotional growth",
            "Use your relationship skills to help others build healthy connections"
        ]
    },
    [House.Eighth]: {
        meaning: "Deep Emotional Transformation",
        shortDescription: "Your emotional security comes through transformation, shared resources, and exploring life's deeper mysteries.",
        detailedDescription: "With the Moon in the 8th House, your emotional nature is intense, deep, and transformative. You're drawn to explore the hidden, mysterious, or taboo aspects of life and emotions. Your emotional security may be tied to shared resources, investments, or other people's money. You have powerful instincts about psychology, healing, and transformation. Your emotions run very deep, and you may experience intense emotional crises that lead to profound personal growth. You're naturally psychic and may have strong intuitive abilities about hidden or unconscious matters.",
        lifeAreaFocus: "Emotional transformation through intensity and shared resources",
        manifestation: [
            "Intense, deep emotional nature that seeks transformation and growth",
            "Strong intuitive abilities and interest in psychology or hidden matters",
            "Emotional connection to shared resources, investments, or others' money",
            "Powerful experiences of emotional death and rebirth throughout life"
        ],
        opportunities: [
            "Excel in psychology, therapy, finance, or crisis counseling",
            "Develop powerful healing abilities and help others through transformation",
            "Build wealth through investments, shared resources, or financial planning",
            "Become a guide for others through major life transitions and crises"
        ],
        challenges: [
            "May be overly intense or emotionally overwhelming to others",
            "Tendency to be secretive, possessive, or emotionally manipulative",
            "Difficulty with emotional vulnerability or trusting others completely",
            "May experience emotional extremes or destructive emotional patterns"
        ],
        keywords: ["Intense", "Transformation", "Deep", "Shared", "Psychology", "Hidden", "Powerful", "Regeneration"],
        developmentTips: [
            "Channel emotional intensity into healing and transformation work",
            "Practice healthy emotional vulnerability and trust-building",
            "Use your psychological insights to help others heal and grow",
            "Balance emotional depth with lighter, more playful experiences"
        ]
    },
    [House.Ninth]: {
        meaning: "Philosophical Heart",
        shortDescription: "Your emotional security comes through higher learning, travel, philosophy, and expanding your worldview.",
        detailedDescription: "With the Moon in the 9th House, your emotional well-being is tied to expanding your horizons through higher education, travel, and philosophical exploration. You have a deep emotional need to understand the meaning of life and your place in the larger scheme of things. Foreign cultures, spiritual teachings, and higher learning provide emotional nourishment. You may have strong emotional connections to teachers, mentors, or spiritual guides. Your emotions are optimistic and adventurous, and you find security through growing your understanding of the world.",
        lifeAreaFocus: "Emotional fulfillment through wisdom, travel, and higher understanding",
        manifestation: [
            "Emotional need for higher learning, philosophy, and spiritual growth",
            "Strong connections to foreign cultures, travel, and diverse perspectives",
            "Optimistic, adventurous emotional nature that seeks meaning and truth",
            "Important relationships with teachers, mentors, or spiritual guides"
        ],
        opportunities: [
            "Excel in education, publishing, law, or international relations",
            "Become a teacher, philosopher, or spiritual guide for others",
            "Travel extensively and learn from diverse cultures and wisdom traditions",
            "Write, speak, or share wisdom that inspires others' emotional and spiritual growth"
        ],
        challenges: [
            "May be emotionally restless or always seeking the next adventure",
            "Tendency to be preachy or dogmatic about beliefs and philosophies",
            "Difficulty with emotional commitment to one place or belief system",
            "May escape into philosophy or travel to avoid emotional intimacy"
        ],
        keywords: ["Philosophical", "Adventurous", "Learning", "Travel", "Optimistic", "Meaning", "Wisdom", "Expansion"],
        developmentTips: [
            "Balance your love of learning with emotional presence and commitment",
            "Use your philosophical insights to provide emotional wisdom to others",
            "Practice emotional grounding while maintaining your adventurous spirit",
            "Share your cultural and spiritual experiences to help others grow"
        ]
    },
    [House.Tenth]: {
        meaning: "Public Emotional Expression",
        shortDescription: "Your emotional security is tied to career success, public recognition, and your reputation in the world.",
        detailedDescription: "With the Moon in the 10th House, your emotional well-being is connected to your career, public image, and professional achievements. You may work in fields that involve caring for others or the public, such as healthcare, education, or public service. Your emotions are somewhat public, and your reputation may be tied to your emotional nature or nurturing qualities. You have strong instincts about what the public needs and wants. Your relationship with authority figures, especially your mother or maternal figures, significantly influences your career path and public image.",
        lifeAreaFocus: "Emotional security through career success and public recognition",
        manifestation: [
            "Career often involves caring for others or serving the public's emotional needs",
            "Public image and reputation connected to nurturing or emotional qualities",
            "Strong instincts about public opinion and what people need emotionally",
            "Significant influence from mother or maternal figures on career choices"
        ],
        opportunities: [
            "Excel in public service, healthcare, education, or caregiving professions",
            "Build a reputation as a caring, nurturing leader or authority figure",
            "Use emotional intelligence to understand and serve public needs",
            "Become a respected figure who provides emotional guidance to many"
        ],
        challenges: [
            "May be overly concerned with public opinion or emotional approval",
            "Tendency to neglect personal emotional needs for professional success",
            "Difficulty separating personal emotions from professional responsibilities",
            "May experience public scrutiny or criticism of emotional expression"
        ],
        keywords: ["Career", "Public", "Recognition", "Authority", "Nurturing", "Reputation", "Service", "Professional"],
        developmentTips: [
            "Balance professional success with personal emotional fulfillment",
            "Use your public platform to provide genuine care and emotional support",
            "Maintain healthy boundaries between public and private emotional life",
            "Honor your nurturing nature while building professional competence"
        ]
    },
    [House.Eleventh]: {
        meaning: "Friendship-Focused Emotions",
        shortDescription: "Your emotional security comes through friendships, group connections, and working toward shared hopes and dreams.",
        detailedDescription: "With the Moon in the 11th House, your emotional well-being is tied to your friendships, group associations, and shared hopes for the future. You have a strong need to belong to groups or communities that share your emotional values and dreams. Friends are like family to you, and you may have many acquaintances but form deep emotional bonds with your chosen circle. You're emotionally invested in humanitarian causes and social progress. Your emotions are progressive and future-oriented, and you find security through working with others toward common goals.",
        lifeAreaFocus: "Emotional fulfillment through friendships and group connections",
        manifestation: [
            "Strong emotional bonds with friends and group communities",
            "Emotional investment in humanitarian causes and social progress",
            "Progressive, future-oriented emotional outlook and values",
            "Need to belong to groups that share your emotional ideals and dreams"
        ],
        opportunities: [
            "Excel in social work, community organizing, or group leadership",
            "Build influential networks of friends who support your emotional growth",
            "Use emotional intelligence to bring people together around shared causes",
            "Become a catalyst for positive social change through emotional connection"
        ],
        challenges: [
            "May be more comfortable in groups than in intimate one-on-one relationships",
            "Tendency to scatter emotional energy across too many friendships or causes",
            "Difficulty with emotional commitment or traditional relationship structures",
            "May idealize friends or groups and be disappointed by human limitations"
        ],
        keywords: ["Friends", "Groups", "Progressive", "Humanitarian", "Future", "Community", "Idealistic", "Social"],
        developmentTips: [
            "Balance group involvement with intimate, personal emotional relationships",
            "Focus your humanitarian efforts on causes that truly resonate emotionally",
            "Practice emotional depth and commitment within your friendships",
            "Use your social influence to create positive emotional change in communities"
        ]
    },
    [House.Twelfth]: {
        meaning: "Hidden Emotional Depths",
        shortDescription: "Your emotional security comes through spirituality, solitude, and serving others from behind the scenes.",
        detailedDescription: "With the Moon in the 12th House, your emotional nature is deeply private, spiritual, and connected to the collective unconscious. You have powerful intuitive and psychic abilities, and your emotions are influenced by subtle, unseen forces. You may feel emotionally different from others or struggle to understand your own emotional needs. Solitude and spiritual practices provide emotional nourishment and security. You're naturally compassionate and drawn to help those who are suffering, often working behind the scenes or in service roles. Your emotional development involves learning to trust your intuition and inner guidance.",
        lifeAreaFocus: "Emotional security through spirituality and hidden service",
        manifestation: [
            "Deep, private emotional nature with strong intuitive and psychic abilities",
            "Emotional connection to spirituality, meditation, and inner exploration",
            "Natural compassion for those who are suffering or marginalized",
            "Tendency to work behind the scenes or in hidden service to others"
        ],
        opportunities: [
            "Excel in healing professions, spiritual counseling, or charitable work",
            "Develop profound psychic and intuitive abilities for guidance",
            "Help others through emotional crisis, addiction, or spiritual awakening",
            "Create art, music, or healing work that touches the collective soul"
        ],
        challenges: [
            "May struggle with unclear emotional boundaries or psychic overwhelm",
            "Tendency to be overly self-sacrificing or emotionally martyrlike",
            "Difficulty understanding or expressing personal emotional needs",
            "May be prone to emotional escapism, depression, or victim mentality"
        ],
        keywords: ["Spiritual", "Intuitive", "Hidden", "Compassionate", "Private", "Psychic", "Service", "Transcendent"],
        developmentTips: [
            "Develop healthy emotional boundaries while maintaining your compassionate nature",
            "Practice regular spiritual or meditative practices for emotional grounding",
            "Use your psychic abilities to help others while protecting your own energy",
            "Honor your need for solitude and privacy while staying connected to others"
        ]
    }
};

// Mercury in Houses interpretations
export const MERCURY_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Direct Communicator",
        shortDescription: "Your communication style is immediate, personal, and direct. You think quickly and express yourself spontaneously.",
        detailedDescription: "With Mercury in the 1st House, your communication style is an integral part of your personality and identity. You're naturally articulate, quick-thinking, and express yourself with immediacy and authenticity. Your mind is active and curious, and you tend to think out loud or process information verbally. Others see you as intelligent, witty, and mentally agile. You may talk with your hands, have expressive facial features, or be known for your quick comebacks and clever observations. Your thinking style is personal and subjective, filtering information through your own experiences and perspective.",
        lifeAreaFocus: "Communication as core identity and self-expression",
        manifestation: [
            "Quick, spontaneous communication style that reflects personality",
            "Tendency to think out loud and process information verbally",
            "Expressive body language, gestures, and animated speaking style",
            "Identity closely tied to intellectual abilities and communication skills"
        ],
        opportunities: [
            "Excel in public speaking, media, journalism, or communication fields",
            "Use natural charisma and wit to influence and inspire others",
            "Develop expertise in areas requiring quick thinking and verbal agility",
            "Become a spokesperson, presenter, or public intellectual"
        ],
        challenges: [
            "May speak impulsively without thinking through consequences",
            "Tendency to dominate conversations or interrupt others",
            "Difficulty listening deeply or considering other perspectives",
            "May be perceived as superficial or overly talkative"
        ],
        keywords: ["Direct", "Quick", "Expressive", "Spontaneous", "Articulate", "Personal", "Immediate", "Witty"],
        developmentTips: [
            "Practice active listening to balance your natural tendency to speak",
            "Think before speaking in important or sensitive situations",
            "Use your communication gifts to help others express themselves",
            "Develop depth in your thinking and avoid superficial judgments"
        ]
    },
    [House.Second]: {
        meaning: "Practical Thinker",
        shortDescription: "Your communication focuses on practical matters, values, and building security through knowledge and skills.",
        detailedDescription: "With Mercury in the 2nd House, your thinking and communication are focused on practical, tangible matters that build security and value. You have a methodical, deliberate way of processing information and prefer concrete facts over abstract theories. Your communication style is steady, reliable, and often centers around money, possessions, resources, or practical skills. You may have a talent for explaining complex financial or material concepts in simple terms. Your learning style is hands-on and experiential, and you retain information best when you can see its practical application.",
        lifeAreaFocus: "Communication about practical matters and building value",
        manifestation: [
            "Methodical, deliberate thinking style focused on practical applications",
            "Communication often centers around money, resources, and material security",
            "Talent for explaining financial or practical concepts clearly",
            "Learning style that requires hands-on experience and tangible results"
        ],
        opportunities: [
            "Excel in finance, business, real estate, or practical skill instruction",
            "Develop expertise in areas that build wealth or material security",
            "Become a trusted advisor for financial or practical decision-making",
            "Use communication skills to help others achieve material stability"
        ],
        challenges: [
            "May be overly focused on material concerns in communication",
            "Tendency to be slow to process new or abstract information",
            "Difficulty with theoretical or philosophical discussions",
            "May resist change or new ideas that threaten security"
        ],
        keywords: ["Practical", "Methodical", "Material", "Steady", "Concrete", "Financial", "Tangible", "Reliable"],
        developmentTips: [
            "Balance practical focus with openness to new ideas and perspectives",
            "Use your practical wisdom to help others make sound decisions",
            "Develop patience with those who think more abstractly or quickly",
            "Apply your methodical thinking to long-term planning and goal achievement"
        ]
    },
    [House.Third]: {
        meaning: "Natural Networker",
        shortDescription: "Your communication thrives in your immediate environment through siblings, neighbors, and local connections.",
        detailedDescription: "With Mercury in the 3rd House, your communication abilities are at their strongest and most natural. You're an excellent communicator who thrives on daily interactions, learning, and sharing information. Your relationship with siblings, neighbors, and your local community is central to your intellectual development. You have a curious, versatile mind that enjoys variety and mental stimulation. You may be involved in writing, teaching, or media, and you have a gift for making complex information accessible to others. Short trips and local travel stimulate your mind and provide new perspectives.",
        lifeAreaFocus: "Communication through local connections and daily interactions",
        manifestation: [
            "Excellent, natural communication abilities and love of conversation",
            "Important intellectual relationships with siblings and local community",
            "Curious, versatile mind that enjoys variety and mental stimulation",
            "Talent for writing, teaching, or making information accessible to others"
        ],
        opportunities: [
            "Excel in journalism, writing, teaching, or local media",
            "Build strong networks within your community and immediate environment",
            "Become a bridge between different groups or sources of information",
            "Use communication skills to educate and inform others effectively"
        ],
        challenges: [
            "May scatter mental energy across too many interests or projects",
            "Tendency to be superficial rather than developing deep expertise",
            "Difficulty focusing on one topic for extended periods",
            "May gossip or share information without considering consequences"
        ],
        keywords: ["Natural", "Versatile", "Curious", "Local", "Networking", "Teaching", "Accessible", "Stimulating"],
        developmentTips: [
            "Focus your diverse interests into a few key areas of expertise",
            "Use your communication gifts responsibly and ethically",
            "Develop depth alongside your natural breadth of knowledge",
            "Practice discretion and confidentiality when handling information"
        ]
    },
    [House.Fourth]: {
        meaning: "Family Communicator",
        shortDescription: "Your communication is rooted in family, home, and emotional foundations. You think with your heart.",
        detailedDescription: "With Mercury in the 4th House, your thinking and communication are deeply influenced by your family background, emotional roots, and need for security. You may have learned important communication patterns from your family, and your home environment significantly affects your ability to think clearly. You have a retentive memory, especially for emotional experiences and family history. Your communication style is nurturing, protective, and often focuses on creating emotional safety for others. You may work from home or in family-related businesses, and you think best in comfortable, familiar environments.",
        lifeAreaFocus: "Communication rooted in family, home, and emotional security",
        manifestation: [
            "Communication style influenced by family patterns and emotional roots",
            "Excellent memory for family history, traditions, and emotional experiences",
            "Nurturing, protective approach to sharing information and ideas",
            "Need for comfortable, secure environment to think and communicate clearly"
        ],
        opportunities: [
            "Excel in family counseling, real estate, or home-based businesses",
            "Become the family historian or keeper of traditions and stories",
            "Use nurturing communication style to help others feel safe and understood",
            "Develop expertise in areas related to home, family, or emotional security"
        ],
        challenges: [
            "May be overly influenced by family opinions or emotional reactions",
            "Tendency to be moody or subjective in thinking and communication",
            "Difficulty separating personal emotions from objective information",
            "May be resistant to ideas that challenge family beliefs or traditions"
        ],
        keywords: ["Family", "Emotional", "Nurturing", "Protective", "Traditional", "Secure", "Retentive", "Rooted"],
        developmentTips: [
            "Balance family loyalty with independent thinking and communication",
            "Use your emotional intelligence to help others process difficult information",
            "Create safe spaces for open, honest communication within your family",
            "Honor your roots while remaining open to new ideas and perspectives"
        ]
    },
    [House.Fifth]: {
        meaning: "Creative Communicator",
        shortDescription: "Your communication is creative, dramatic, and joyful. You express ideas with flair and entertainment value.",
        detailedDescription: "With Mercury in the 5th House, your communication style is creative, expressive, and entertaining. You have a natural flair for drama and storytelling, and you can make even mundane topics interesting and engaging. Your thinking is playful, optimistic, and often focused on creative projects, romance, or activities involving children. You may have talents in creative writing, performing, or teaching children. Your communication brings joy and inspiration to others, and you have a gift for making learning fun and memorable. You think best when you're enjoying yourself and feel appreciated for your unique perspective.",
        lifeAreaFocus: "Creative and entertaining communication that brings joy",
        manifestation: [
            "Creative, dramatic communication style that entertains and inspires",
            "Natural storytelling ability and flair for making topics engaging",
            "Playful, optimistic thinking focused on creative and joyful pursuits",
            "Talent for teaching children or communicating in fun, memorable ways"
        ],
        opportunities: [
            "Excel in creative writing, entertainment, or children's education",
            "Use dramatic flair to make presentations memorable and engaging",
            "Develop expertise in areas related to creativity, entertainment, or joy",
            "Become a teacher or communicator who makes learning fun and inspiring"
        ],
        challenges: [
            "May be overly dramatic or attention-seeking in communication",
            "Tendency to exaggerate or embellish stories for entertainment value",
            "Difficulty with serious, technical, or mundane communication tasks",
            "May struggle with criticism of creative ideas or communication style"
        ],
        keywords: ["Creative", "Dramatic", "Entertaining", "Joyful", "Playful", "Inspiring", "Expressive", "Memorable"],
        developmentTips: [
            "Balance entertainment value with accuracy and responsibility in communication",
            "Use your creative gifts to make important information accessible and engaging",
            "Practice humility and accept constructive feedback on your communication style",
            "Channel your dramatic flair into positive, uplifting messages"
        ]
    },
    [House.Sixth]: {
        meaning: "Analytical Communicator",
        shortDescription: "Your communication is precise, helpful, and focused on practical problem-solving and improvement.",
        detailedDescription: "With Mercury in the 6th House, your thinking and communication are analytical, precise, and focused on practical problem-solving. You have an excellent eye for detail and can spot errors or inefficiencies that others miss. Your communication style is helpful, service-oriented, and often focused on health, work, or daily routines. You may work in fields that require careful analysis, such as healthcare, research, or quality control. You think systematically and prefer step-by-step approaches to complex problems. Your communication helps others improve their lives in practical, measurable ways.",
        lifeAreaFocus: "Analytical communication focused on service and improvement",
        manifestation: [
            "Precise, analytical thinking with excellent attention to detail",
            "Communication focused on helping others solve practical problems",
            "Systematic approach to processing and organizing information",
            "Natural ability to spot errors, inefficiencies, or areas for improvement"
        ],
        opportunities: [
            "Excel in healthcare, research, quality control, or analytical fields",
            "Become an expert in efficiency, organization, or systematic improvement",
            "Use analytical skills to help others optimize their health or work",
            "Develop expertise in areas requiring precision and attention to detail"
        ],
        challenges: [
            "May be overly critical or nitpicky in communication",
            "Tendency to focus on problems rather than solutions or positives",
            "Difficulty with big-picture thinking or abstract concepts",
            "May overwhelm others with too much detail or analysis"
        ],
        keywords: ["Analytical", "Precise", "Helpful", "Systematic", "Detail-oriented", "Practical", "Improving", "Service"],
        developmentTips: [
            "Balance attention to detail with big-picture perspective",
            "Use your analytical gifts constructively to help rather than criticize",
            "Practice positive communication that highlights solutions and improvements",
            "Develop patience with those who think less systematically"
        ]
    },
    [House.Seventh]: {
        meaning: "Diplomatic Communicator",
        shortDescription: "Your communication shines in partnerships and one-on-one relationships. You're naturally diplomatic and fair.",
        detailedDescription: "With Mercury in the 7th House, your communication abilities are strongest in partnerships and one-on-one relationships. You're naturally diplomatic, fair-minded, and skilled at seeing multiple perspectives in any situation. Your thinking is often influenced by your partners or close relationships, and you may need to bounce ideas off others to clarify your own thoughts. You have a gift for mediation, negotiation, and helping others find common ground. Your communication style is cooperative, balanced, and focused on creating harmony and understanding between people.",
        lifeAreaFocus: "Communication through partnerships and diplomatic relationships",
        manifestation: [
            "Diplomatic, fair-minded communication that seeks balance and harmony",
            "Thinking often influenced by partners or developed through relationships",
            "Natural ability to mediate conflicts and find common ground",
            "Communication skills strongest in one-on-one or partnership settings"
        ],
        opportunities: [
            "Excel in law, mediation, counseling, or diplomatic fields",
            "Build strong partnerships through excellent communication and understanding",
            "Become a skilled negotiator or relationship counselor",
            "Use diplomatic skills to help others resolve conflicts and misunderstandings"
        ],
        challenges: [
            "May be overly dependent on others' opinions or validation",
            "Tendency to avoid difficult conversations or controversial topics",
            "Difficulty making independent decisions without consulting others",
            "May lose own perspective while trying to please everyone"
        ],
        keywords: ["Diplomatic", "Fair", "Balanced", "Cooperative", "Harmonious", "Partnership", "Mediation", "Understanding"],
        developmentTips: [
            "Develop independent thinking while maintaining your diplomatic nature",
            "Practice expressing your own opinions clearly and confidently",
            "Use your mediation skills to help others while honoring your own needs",
            "Balance cooperation with healthy assertiveness in communication"
        ]
    },
    [House.Eighth]: {
        meaning: "Deep Investigative Mind",
        shortDescription: "Your communication explores hidden depths, psychology, and transformational topics. You think intensely.",
        detailedDescription: "With Mercury in the 8th House, your thinking and communication are drawn to deep, hidden, or taboo subjects. You have a penetrating, investigative mind that wants to understand the underlying psychology and motivations behind surface appearances. Your communication style is intense, probing, and transformational. You may be interested in research, psychology, occult studies, or financial analysis. You have the ability to help others through crisis or major life transitions through your insightful communication. Your thinking processes are thorough and you're not satisfied with superficial explanations.",
        lifeAreaFocus: "Deep, transformational communication about hidden or psychological matters",
        manifestation: [
            "Penetrating, investigative mind that explores hidden depths and motivations",
            "Communication focused on psychology, transformation, and taboo subjects",
            "Ability to help others through crisis with insightful, healing words",
            "Thorough thinking process that seeks underlying truth and meaning"
        ],
        opportunities: [
            "Excel in psychology, research, investigation, or crisis counseling",
            "Develop expertise in areas requiring deep analysis and insight",
            "Use penetrating communication to help others heal and transform",
            "Become a researcher or investigator who uncovers hidden truths"
        ],
        challenges: [
            "May be overly intense or probing in casual communication",
            "Tendency to be secretive or suspicious about sharing information",
            "Difficulty with light, superficial, or social conversation",
            "May overwhelm others with psychological analysis or deep insights"
        ],
        keywords: ["Deep", "Investigative", "Intense", "Transformational", "Psychological", "Hidden", "Probing", "Insightful"],
        developmentTips: [
            "Balance deep insights with appropriate social communication",
            "Use your investigative abilities ethically and with respect for privacy",
            "Practice lighter conversation while honoring your need for depth",
            "Channel your intensity into healing and helping others transform"
        ]
    },
    [House.Ninth]: {
        meaning: "Philosophical Teacher",
        shortDescription: "Your communication explores big ideas, philosophy, and higher learning. You think expansively and teach others.",
        detailedDescription: "With Mercury in the 9th House, your thinking and communication are focused on big ideas, philosophy, and higher learning. You have an expansive, optimistic mind that seeks to understand the broader meaning and context of information. Your communication style is educational, inspirational, and often involves sharing wisdom or teaching others. You may be drawn to foreign languages, cultures, or international communication. Travel and exposure to different perspectives stimulate your thinking and broaden your communication abilities. You have a gift for making complex philosophical or spiritual concepts accessible to others.",
        lifeAreaFocus: "Expansive communication about philosophy, higher learning, and wisdom",
        manifestation: [
            "Expansive, optimistic thinking focused on big ideas and higher meaning",
            "Natural teaching ability and gift for sharing wisdom with others",
            "Interest in foreign cultures, languages, and international perspectives",
            "Communication that inspires others to expand their horizons and understanding"
        ],
        opportunities: [
            "Excel in education, publishing, law, or international communication",
            "Become a teacher, professor, or wisdom keeper in your field",
            "Use communication skills to bridge cultural or philosophical differences",
            "Write, speak, or teach about subjects that expand others' perspectives"
        ],
        challenges: [
            "May be overly preachy or dogmatic about beliefs and ideas",
            "Tendency to be impatient with details or practical applications",
            "Difficulty communicating with those who think more concretely",
            "May overlook important facts while focusing on big picture"
        ],
        keywords: ["Philosophical", "Expansive", "Teaching", "Wisdom", "International", "Inspirational", "Optimistic", "Broad"],
        developmentTips: [
            "Balance big-picture thinking with attention to practical details",
            "Practice humility and remain open to learning from others",
            "Use your teaching gifts to inspire rather than preach to others",
            "Ground your philosophical insights in real-world applications"
        ]
    },
    [House.Tenth]: {
        meaning: "Authoritative Communicator",
        shortDescription: "Your communication builds authority and reputation. You're known for your expertise and professional voice.",
        detailedDescription: "With Mercury in the 10th House, your communication abilities are central to your career and public reputation. You have a natural authority in your communication style and are often seen as an expert or spokesperson in your field. Your thinking is strategic, goal-oriented, and focused on achievement and recognition. You may work in fields that require public communication, such as politics, media, or corporate leadership. Your communication helps build your professional reputation and you're often called upon to represent organizations or causes. You think in terms of long-term impact and legacy.",
        lifeAreaFocus: "Authoritative communication that builds career and reputation",
        manifestation: [
            "Natural authority and expertise in professional communication",
            "Strategic thinking focused on career goals and public recognition",
            "Reputation built through communication skills and thought leadership",
            "Often called upon to represent organizations or speak publicly"
        ],
        opportunities: [
            "Excel in leadership, politics, media, or corporate communication",
            "Build a strong professional reputation through thought leadership",
            "Become a respected expert or spokesperson in your field",
            "Use communication platform to influence positive change in society"
        ],
        challenges: [
            "May be overly concerned with image or public perception",
            "Tendency to be formal or distant in personal communication",
            "Difficulty separating personal thoughts from professional persona",
            "May sacrifice authenticity for professional advancement"
        ],
        keywords: ["Authoritative", "Professional", "Strategic", "Reputation", "Expert", "Public", "Goal-oriented", "Leadership"],
        developmentTips: [
            "Balance professional authority with authentic, personal communication",
            "Use your platform responsibly to serve others, not just advance yourself",
            "Maintain integrity and authenticity while building your reputation",
            "Remember to communicate with warmth and humanity alongside authority"
        ]
    },
    [House.Eleventh]: {
        meaning: "Progressive Networker",
        shortDescription: "Your communication thrives in groups and focuses on future possibilities and humanitarian ideals.",
        detailedDescription: "With Mercury in the 11th House, your thinking and communication are progressive, future-oriented, and focused on group dynamics and humanitarian ideals. You have excellent networking abilities and can bring people together around shared visions and goals. Your communication style is friendly, innovative, and often involves technology or social media. You're drawn to groups, organizations, and causes that align with your ideals. Your thinking is original and you often come up with unique solutions to social problems. You communicate best when you feel part of a community or movement.",
        lifeAreaFocus: "Progressive communication through groups and social networks",
        manifestation: [
            "Progressive, future-oriented thinking focused on social improvement",
            "Excellent networking abilities and skill at bringing people together",
            "Communication often involves technology, social media, or group platforms",
            "Original thinking that generates innovative solutions to social problems"
        ],
        opportunities: [
            "Excel in social media, technology, community organizing, or group leadership",
            "Build influential networks that create positive social change",
            "Use communication skills to advance humanitarian causes and ideals",
            "Become a thought leader in progressive or innovative fields"
        ],
        challenges: [
            "May be more comfortable in groups than intimate one-on-one communication",
            "Tendency to be idealistic or unrealistic about human nature",
            "Difficulty with traditional or hierarchical communication structures",
            "May scatter communication energy across too many groups or causes"
        ],
        keywords: ["Progressive", "Networking", "Innovative", "Humanitarian", "Group", "Future", "Social", "Original"],
        developmentTips: [
            "Balance group involvement with intimate, personal communication",
            "Focus your humanitarian efforts on causes where you can make real impact",
            "Practice patience with those who don't share your progressive ideals",
            "Use your networking skills to create meaningful, lasting connections"
        ]
    },
    [House.Twelfth]: {
        meaning: "Intuitive Communicator",
        shortDescription: "Your communication is intuitive, spiritual, and often works behind the scenes to heal and inspire others.",
        detailedDescription: "With Mercury in the 12th House, your thinking and communication are deeply intuitive, spiritual, and connected to the unconscious realm. You may have psychic or telepathic abilities, and you often understand things without being able to explain how you know them. Your communication style is subtle, compassionate, and healing. You may work behind the scenes or in service roles where you help others through your words and insights. Your thinking is non-linear and you may receive inspiration through dreams, meditation, or quiet reflection. You have a gift for understanding and communicating about spiritual or psychological matters.",
        lifeAreaFocus: "Intuitive, spiritual communication that heals and serves others",
        manifestation: [
            "Intuitive, psychic communication abilities and non-linear thinking",
            "Subtle, compassionate communication style that heals and comforts",
            "Work behind the scenes using words and insights to help others",
            "Inspiration received through dreams, meditation, or spiritual practices"
        ],
        opportunities: [
            "Excel in healing professions, spiritual counseling, or creative writing",
            "Develop psychic or intuitive communication abilities for guidance",
            "Use compassionate communication to help others through crisis or healing",
            "Create art, poetry, or writing that touches the collective soul"
        ],
        challenges: [
            "May struggle with clear, direct communication or logical thinking",
            "Tendency to be vague, confused, or overwhelmed by too much information",
            "Difficulty with practical, mundane, or technical communication",
            "May be misunderstood or have trouble expressing intuitive insights"
        ],
        keywords: ["Intuitive", "Spiritual", "Healing", "Compassionate", "Subtle", "Psychic", "Service", "Transcendent"],
        developmentTips: [
            "Practice grounding your intuitive insights in clear, practical communication",
            "Develop healthy boundaries to avoid being overwhelmed by others' thoughts",
            "Use your healing communication gifts while maintaining your own mental clarity",
            "Trust your intuition while also developing logical thinking skills"
        ]
    }
};
// Venus in Houses interpretations
export const VENUS_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Natural Charmer",
        shortDescription: "Your charm and attractiveness are immediately visible. You express love and beauty through your personality and appearance.",
        detailedDescription: "With Venus in the 1st House, your natural charm, beauty, and grace are central to your identity and how others perceive you. You have an attractive personality and may be physically beautiful or have a strong sense of style. You express love and affection easily and naturally, and others are drawn to your warm, pleasant demeanor. Your values and aesthetic preferences are clearly visible in how you present yourself to the world. You may work in beauty, fashion, or relationship-related fields, and you have a natural ability to make others feel comfortable and appreciated.",
        lifeAreaFocus: "Love and beauty expressed through personal identity and appearance",
        manifestation: [
            "Natural charm, grace, and attractiveness that draws others to you",
            "Strong sense of personal style and aesthetic preferences",
            "Easy, natural expression of love, affection, and appreciation",
            "Identity closely tied to relationships, beauty, and harmonious interactions"
        ],
        opportunities: [
            "Excel in beauty, fashion, entertainment, or relationship counseling",
            "Use natural charm to build strong personal and professional relationships",
            "Become a style icon or influencer who inspires others' aesthetic choices",
            "Help others feel beautiful, valued, and appreciated through your presence"
        ],
        challenges: [
            "May be overly concerned with appearance or others' approval",
            "Tendency to avoid conflict or difficult conversations to maintain harmony",
            "Difficulty asserting yourself when it might displease others",
            "May rely too heavily on charm rather than developing other skills"
        ],
        keywords: ["Charming", "Attractive", "Graceful", "Harmonious", "Stylish", "Loving", "Pleasant", "Aesthetic"],
        developmentTips: [
            "Balance your desire for harmony with healthy assertiveness",
            "Develop inner beauty and values alongside external attractiveness",
            "Use your charm to genuinely help others rather than just please them",
            "Practice expressing disagreement or difficult truths with grace"
        ]
    },
    [House.Second]: {
        meaning: "Luxury Lover",
        shortDescription: "You find love and beauty through material possessions, luxury, and building financial security for comfort.",
        detailedDescription: "With Venus in the 2nd House, your values and sense of beauty are closely tied to material possessions, luxury, and financial security. You appreciate quality, comfort, and beautiful objects, and you may express love through gift-giving or providing material comfort to others. Your self-worth is connected to your ability to afford beautiful things and create a comfortable lifestyle. You have good instincts about investments in art, beauty, or luxury items that hold their value. You find emotional security through financial stability and may work in fields related to luxury goods, finance, or material beauty.",
        lifeAreaFocus: "Love and beauty expressed through material possessions and luxury",
        manifestation: [
            "Strong appreciation for luxury, quality, and beautiful material possessions",
            "Expression of love through gift-giving and providing material comfort",
            "Self-worth connected to financial ability to afford beautiful things",
            "Good instincts about investments in art, beauty, or luxury items"
        ],
        opportunities: [
            "Excel in luxury goods, jewelry, art dealing, or high-end retail",
            "Build wealth through investments in beauty, art, or comfort industries",
            "Create beautiful, comfortable environments that others value",
            "Help others appreciate quality and invest in lasting beauty"
        ],
        challenges: [
            "May be overly materialistic or focused on expensive possessions",
            "Tendency to equate love with material gifts or financial support",
            "Difficulty appreciating non-material forms of beauty or love",
            "May struggle with financial boundaries or overspending on luxury"
        ],
        keywords: ["Luxury", "Material", "Quality", "Comfort", "Valuable", "Possessions", "Security", "Indulgent"],
        developmentTips: [
            "Balance appreciation for material beauty with non-material values",
            "Learn to express and receive love in ways beyond material gifts",
            "Use your aesthetic sense to help others create beautiful, comfortable lives",
            "Practice gratitude for simple pleasures alongside luxury appreciation"
        ]
    },
    [House.Third]: {
        meaning: "Charming Communicator",
        shortDescription: "You express love and beauty through communication, learning, and connections with siblings and neighbors.",
        detailedDescription: "With Venus in the 3rd House, you express love and appreciation through communication, and you have a naturally charming, pleasant way of speaking and interacting with others. Your relationships with siblings, neighbors, and your local community are important sources of joy and beauty in your life. You may have a talent for writing, teaching, or other forms of communication that bring beauty and harmony to others. You appreciate intellectual beauty and may be drawn to poetry, literature, or artistic forms of communication. Short trips and local adventures bring you pleasure and may lead to romantic encounters.",
        lifeAreaFocus: "Love and beauty expressed through communication and local connections",
        manifestation: [
            "Charming, pleasant communication style that brings harmony to interactions",
            "Important, loving relationships with siblings, neighbors, and local community",
            "Talent for beautiful communication through writing, speaking, or teaching",
            "Appreciation for intellectual beauty, poetry, and artistic expression"
        ],
        opportunities: [
            "Excel in writing, journalism, teaching, or artistic communication",
            "Build beautiful relationships within your local community and environment",
            "Use charming communication to mediate conflicts and create harmony",
            "Become a voice for beauty, love, and positive values in your community"
        ],
        challenges: [
            "May avoid difficult conversations or hard truths to maintain pleasantness",
            "Tendency to be superficial in communication to avoid conflict",
            "Difficulty expressing strong opinions that might displease others",
            "May gossip or share information to maintain social connections"
        ],
        keywords: ["Charming", "Pleasant", "Communicative", "Harmonious", "Local", "Artistic", "Intellectual", "Social"],
        developmentTips: [
            "Balance pleasant communication with honest, authentic expression",
            "Use your communication gifts to address important issues with grace",
            "Develop depth in your relationships beyond surface-level pleasantries",
            "Practice expressing disagreement or difficult topics with love and respect"
        ]
    },
    [House.Fourth]: {
        meaning: "Home Beautifier",
        shortDescription: "You find love and beauty through home, family, and creating a beautiful, harmonious domestic environment.",
        detailedDescription: "With Venus in the 4th House, your sense of love and beauty is deeply connected to your home, family, and domestic environment. You have a natural talent for creating beautiful, comfortable, harmonious living spaces that nurture and comfort others. Your family relationships are central to your happiness, and you may be the peacemaker or the one who brings beauty and harmony to family gatherings. You appreciate tradition, heritage, and family heirlooms that carry emotional and aesthetic value. Your mother or maternal figures may have been particularly beautiful, artistic, or influential in developing your aesthetic sense.",
        lifeAreaFocus: "Love and beauty expressed through home, family, and domestic harmony",
        manifestation: [
            "Natural talent for creating beautiful, comfortable, harmonious home environments",
            "Deep appreciation for family relationships and domestic harmony",
            "Role as family peacemaker who brings beauty and love to gatherings",
            "Connection to family traditions, heritage, and emotionally valuable objects"
        ],
        opportunities: [
            "Excel in interior design, real estate, hospitality, or family counseling",
            "Create beautiful homes that become gathering places for family and friends",
            "Help others heal family relationships and create domestic harmony",
            "Preserve and share family traditions and aesthetic heritage"
        ],
        challenges: [
            "May be overly dependent on family approval or domestic harmony",
            "Tendency to avoid family conflicts even when resolution is needed",
            "Difficulty leaving home or family environment for personal growth",
            "May sacrifice personal desires to maintain family peace"
        ],
        keywords: ["Domestic", "Harmonious", "Beautiful", "Family", "Nurturing", "Traditional", "Comfortable", "Peaceful"],
        developmentTips: [
            "Balance family harmony with healthy boundaries and personal needs",
            "Use your gift for creating beauty to help others feel at home",
            "Address family conflicts with love while maintaining your own values",
            "Create beautiful spaces that honor both tradition and personal expression"
        ]
    },
    [House.Fifth]: {
        meaning: "Romantic Creative",
        shortDescription: "You express love and beauty through creativity, romance, children, and joyful self-expression.",
        detailedDescription: "With Venus in the 5th House, your expression of love and beauty is naturally creative, romantic, and joyful. You have a strong appreciation for art, entertainment, and creative self-expression, and you may have significant artistic talents. Romance and love affairs are central to your happiness, and you approach relationships with playfulness, generosity, and dramatic flair. Children, whether your own or others', bring you great joy and may be a source of creative inspiration. You have a natural ability to create beauty and joy for others through entertainment, art, or celebration.",
        lifeAreaFocus: "Love and beauty expressed through creativity, romance, and joyful expression",
        manifestation: [
            "Strong artistic talents and appreciation for creative beauty and expression",
            "Romantic, playful approach to love with dramatic flair and generosity",
            "Deep joy and connection with children and childlike wonder",
            "Natural ability to create beauty and entertainment that brings joy to others"
        ],
        opportunities: [
            "Excel in arts, entertainment, fashion, or creative industries",
            "Build beautiful, inspiring romantic relationships based on mutual creativity",
            "Use artistic talents to bring beauty and joy to many people",
            "Become a teacher or mentor who inspires others' creative expression"
        ],
        challenges: [
            "May be overly dramatic or demanding in romantic relationships",
            "Tendency to seek constant admiration and appreciation for creative work",
            "Difficulty with practical responsibilities that interfere with creative time",
            "May have unrealistic expectations about romance and love"
        ],
        keywords: ["Creative", "Romantic", "Artistic", "Joyful", "Dramatic", "Playful", "Entertaining", "Expressive"],
        developmentTips: [
            "Balance romantic idealism with realistic relationship expectations",
            "Use your creative gifts to serve others and create meaningful beauty",
            "Practice humility and accept constructive feedback on your artistic work",
            "Channel dramatic flair into positive, uplifting creative expression"
        ]
    },
    [House.Sixth]: {
        meaning: "Service-Oriented Beauty",
        shortDescription: "You express love and beauty through service, health, work, and creating harmony in daily routines.",
        detailedDescription: "With Venus in the 6th House, you express love and appreciation through practical service and creating beauty in everyday life and work environments. You may work in beauty, health, or service industries, and you have a talent for making work environments more pleasant and harmonious. Your approach to health and wellness includes attention to beauty and aesthetics - you may be drawn to beautiful, natural health practices. You show love through practical acts of service and attention to others' daily needs and comfort. You appreciate the beauty in simple, well-organized, efficient systems and routines.",
        lifeAreaFocus: "Love and beauty expressed through service, health, and daily work",
        manifestation: [
            "Expression of love through practical service and attention to daily needs",
            "Talent for creating beautiful, harmonious work environments",
            "Approach to health that includes beauty, aesthetics, and natural practices",
            "Appreciation for the beauty in well-organized systems and efficient routines"
        ],
        opportunities: [
            "Excel in beauty, health, wellness, or service industries",
            "Create beautiful, efficient work environments that inspire others",
            "Help others improve their health and daily routines with aesthetic appeal",
            "Become a healer or service provider who brings beauty to practical care"
        ],
        challenges: [
            "May be overly critical about aesthetic details in work or health",
            "Tendency to neglect own needs while serving others beautifully",
            "Difficulty with messy or chaotic work environments",
            "May become perfectionist about daily routines and appearance"
        ],
        keywords: ["Service", "Practical", "Health", "Beauty", "Harmonious", "Organized", "Caring", "Efficient"],
        developmentTips: [
            "Balance attention to aesthetic details with acceptance of imperfection",
            "Use your service orientation to help others while maintaining your own well-being",
            "Find beauty in simple, practical acts of care and service",
            "Create sustainable routines that honor both efficiency and aesthetic pleasure"
        ]
    },
    [House.Seventh]: {
        meaning: "Partnership Lover",
        shortDescription: "You express love and beauty through partnerships, marriage, and creating harmony in relationships.",
        detailedDescription: "With Venus in the 7th House, your expression of love and beauty is fundamentally focused on partnerships and relationships. You have a natural gift for creating harmony, balance, and beauty in your relationships, and you may be skilled at mediation and diplomacy. Marriage and close partnerships are central to your happiness and sense of completeness. You're attracted to partners who are beautiful, artistic, or harmonious, and you may meet romantic partners through art, beauty, or social events. Your sense of aesthetics is often influenced by your partners, and you enjoy creating beauty together with others.",
        lifeAreaFocus: "Love and beauty expressed through partnerships and harmonious relationships",
        manifestation: [
            "Natural gift for creating harmony, balance, and beauty in relationships",
            "Marriage and partnerships central to happiness and sense of completeness",
            "Attraction to beautiful, artistic, or harmonious partners",
            "Aesthetic sense influenced by partners and collaborative beauty creation"
        ],
        opportunities: [
            "Excel in relationship counseling, mediation, or partnership-based businesses",
            "Build beautiful, harmonious marriages and business partnerships",
            "Use diplomatic skills to help others resolve relationship conflicts",
            "Create collaborative art or beauty projects with partners"
        ],
        challenges: [
            "May be overly dependent on relationships for happiness and identity",
            "Tendency to avoid conflict even when it's necessary for relationship health",
            "Difficulty maintaining individual aesthetic preferences in partnerships",
            "May attract partners who are beautiful but not emotionally available"
        ],
        keywords: ["Partnership", "Harmonious", "Diplomatic", "Balanced", "Collaborative", "Beautiful", "Cooperative", "Romantic"],
        developmentTips: [
            "Develop individual identity and aesthetic sense alongside partnership focus",
            "Practice healthy conflict resolution while maintaining harmony",
            "Choose partners who support your individual growth and beauty expression",
            "Use your relationship skills to help others while honoring your own needs"
        ]
    },
    [House.Eighth]: {
        meaning: "Intense Passionate Love",
        shortDescription: "You express love and beauty through intensity, transformation, and deep, passionate connections.",
        detailedDescription: "With Venus in the 8th House, your expression of love and beauty is intense, transformative, and deeply passionate. You're drawn to relationships that involve psychological depth, shared resources, and profound emotional transformation. Your aesthetic preferences may include darker, more mysterious, or taboo forms of beauty. You may be attracted to partners who are wealthy, powerful, or psychologically complex. Your relationships often involve themes of death and rebirth, and you have the ability to help others transform through the power of love and beauty. You may work with other people's money or resources in beautiful, luxurious ways.",
        lifeAreaFocus: "Love and beauty expressed through intensity, transformation, and shared resources",
        manifestation: [
            "Intense, transformative approach to love with deep psychological connections",
            "Attraction to mysterious, powerful, or psychologically complex partners",
            "Aesthetic preferences that include darker, more mysterious forms of beauty",
            "Ability to help others transform through the healing power of love and beauty"
        ],
        opportunities: [
            "Excel in psychology, therapy, luxury finance, or transformational healing",
            "Build deep, transformative relationships that heal and empower both partners",
            "Use understanding of beauty and psychology to help others heal trauma",
            "Work with investments, luxury goods, or other people's resources beautifully"
        ],
        challenges: [
            "May be attracted to destructive or overly intense relationships",
            "Tendency to be possessive, jealous, or controlling in love",
            "Difficulty with light, casual, or surface-level romantic connections",
            "May use beauty or sexuality manipulatively to gain power or resources"
        ],
        keywords: ["Intense", "Transformative", "Passionate", "Deep", "Mysterious", "Powerful", "Psychological", "Healing"],
        developmentTips: [
            "Channel intensity into healing and transformative love rather than control",
            "Practice healthy boundaries while maintaining deep emotional connections",
            "Use your understanding of psychology to help others heal through beauty",
            "Balance intense relationships with lighter, more playful connections"
        ]
    },
    [House.Ninth]: {
        meaning: "Philosophical Beauty Seeker",
        shortDescription: "You find love and beauty through higher learning, travel, philosophy, and expanding cultural horizons.",
        detailedDescription: "With Venus in the 9th House, your expression of love and beauty is connected to higher learning, philosophy, travel, and cultural expansion. You're attracted to foreign cultures, exotic beauty, and partners from different backgrounds or belief systems. Your aesthetic preferences are broad and inclusive, appreciating beauty from many different cultures and traditions. You may find love through travel, higher education, or spiritual pursuits. You have a gift for teaching others about beauty, love, and aesthetic appreciation from a philosophical or cultural perspective. Your relationships often involve sharing beliefs, ideals, and adventures.",
        lifeAreaFocus: "Love and beauty expressed through philosophy, travel, and cultural expansion",
        manifestation: [
            "Attraction to foreign cultures, exotic beauty, and diverse aesthetic traditions",
            "Romantic connections often formed through travel, education, or spiritual pursuits",
            "Broad, inclusive aesthetic preferences that appreciate multicultural beauty",
            "Gift for teaching others about love and beauty from philosophical perspectives"
        ],
        opportunities: [
            "Excel in international relations, cultural arts, education, or travel industries",
            "Build relationships that bridge cultural or philosophical differences",
            "Use appreciation for diverse beauty to promote cultural understanding",
            "Become a teacher or guide who helps others expand their aesthetic horizons"
        ],
        challenges: [
            "May idealize foreign or exotic partners and relationships",
            "Tendency to be restless or always seeking new aesthetic experiences",
            "Difficulty with commitment to one aesthetic style or relationship approach",
            "May be preachy or dogmatic about aesthetic or relationship philosophies"
        ],
        keywords: ["Philosophical", "Cultural", "Exotic", "Expansive", "Educational", "Adventurous", "Diverse", "Idealistic"],
        developmentTips: [
            "Balance appreciation for diverse beauty with commitment to specific relationships",
            "Use your cultural knowledge to help others appreciate different forms of beauty",
            "Practice grounding your aesthetic ideals in practical, everyday applications",
            "Share your love of diverse beauty without imposing your preferences on others"
        ]
    },
    [House.Tenth]: {
        meaning: "Public Beauty Icon",
        shortDescription: "You express love and beauty through career, public image, and becoming known for aesthetic excellence.",
        detailedDescription: "With Venus in the 10th House, your expression of love and beauty is central to your career and public reputation. You may work in beauty, fashion, entertainment, or luxury industries, and you're known for your aesthetic sense and ability to create or appreciate beauty. Your public image is closely tied to your attractiveness, charm, or artistic abilities. You may become a public figure who represents beauty, love, or aesthetic values to society. Your career success often depends on your ability to create harmony, beauty, or pleasant experiences for others. You may marry someone prominent or build your reputation through relationships.",
        lifeAreaFocus: "Love and beauty expressed through career success and public recognition",
        manifestation: [
            "Career closely tied to beauty, aesthetics, or creating pleasant experiences",
            "Public reputation built on attractiveness, charm, or artistic abilities",
            "Role as public figure who represents beauty or aesthetic values to society",
            "Professional success through ability to create harmony and beauty for others"
        ],
        opportunities: [
            "Excel in beauty, fashion, entertainment, luxury, or public relations industries",
            "Build a reputation as an aesthetic authority or style icon",
            "Use public platform to promote beauty, love, and positive values",
            "Become a successful entrepreneur in beauty or luxury markets"
        ],
        challenges: [
            "May be overly concerned with public image or aesthetic reputation",
            "Tendency to sacrifice personal relationships for professional beauty success",
            "Difficulty separating personal worth from public aesthetic approval",
            "May face public scrutiny or criticism of appearance or aesthetic choices"
        ],
        keywords: ["Professional", "Public", "Aesthetic", "Successful", "Reputation", "Luxury", "Prominent", "Influential"],
        developmentTips: [
            "Balance professional aesthetic success with authentic personal relationships",
            "Use your public platform to promote genuine beauty and positive values",
            "Maintain inner beauty and values alongside external aesthetic success",
            "Remember that true beauty comes from character as well as appearance"
        ]
    },
    [House.Eleventh]: {
        meaning: "Friendship Beauty Creator",
        shortDescription: "You express love and beauty through friendships, groups, and working toward beautiful future ideals.",
        detailedDescription: "With Venus in the 11th House, your expression of love and beauty is focused on friendships, group activities, and working toward beautiful future ideals. You have many friends and are often the one who brings beauty, harmony, and social grace to group situations. Your aesthetic preferences are progressive and future-oriented, and you may be drawn to innovative or unconventional forms of beauty. You find love and appreciation through your social networks and may meet romantic partners through friends or group activities. You're motivated by idealistic visions of a more beautiful, harmonious world.",
        lifeAreaFocus: "Love and beauty expressed through friendships and progressive social ideals",
        manifestation: [
            "Large social network with role as harmony-bringer in group situations",
            "Progressive, future-oriented aesthetic preferences and innovative beauty appreciation",
            "Romantic connections often formed through friendships or group activities",
            "Motivation by idealistic visions of creating a more beautiful, harmonious world"
        ],
        opportunities: [
            "Excel in social media, community organizing, or group aesthetic projects",
            "Build influential networks that promote beauty and positive social change",
            "Use aesthetic sense to help groups create beautiful, harmonious environments",
            "Become a leader in progressive beauty or social harmony movements"
        ],
        challenges: [
            "May be more comfortable with group harmony than intimate relationships",
            "Tendency to idealize friends or have unrealistic expectations of social groups",
            "Difficulty with traditional or conventional approaches to beauty and relationships",
            "May scatter aesthetic energy across too many social causes or friendships"
        ],
        keywords: ["Social", "Progressive", "Idealistic", "Friendly", "Innovative", "Harmonious", "Future-oriented", "Group"],
        developmentTips: [
            "Balance group involvement with intimate, personal relationships",
            "Focus your aesthetic idealism on causes where you can make real impact",
            "Practice depth in friendships alongside your natural social breadth",
            "Use your social influence to create lasting beauty and positive change"
        ]
    },
    [House.Twelfth]: {
        meaning: "Hidden Beauty Healer",
        shortDescription: "You express love and beauty through spirituality, service, and healing others from behind the scenes.",
        detailedDescription: "With Venus in the 12th House, your expression of love and beauty is deeply spiritual, compassionate, and often hidden from public view. You have a natural ability to find beauty in suffering, transcendence, and spiritual experiences. Your love is unconditional and self-sacrificing, and you may work behind the scenes to bring beauty and healing to those who are marginalized or suffering. You're drawn to mystical, ethereal, or transcendent forms of beauty, and you may have psychic or intuitive abilities related to aesthetic appreciation. Your relationships may involve themes of sacrifice, service, or spiritual connection.",
        lifeAreaFocus: "Love and beauty expressed through spirituality and hidden service to others",
        manifestation: [
            "Spiritual, transcendent approach to love with unconditional compassion",
            "Ability to find beauty in suffering, healing, and mystical experiences",
            "Work behind the scenes to bring beauty and healing to marginalized people",
            "Attraction to ethereal, mystical, or transcendent forms of beauty"
        ],
        opportunities: [
            "Excel in healing arts, spiritual counseling, or charitable beauty work",
            "Use aesthetic gifts to help others heal trauma and find inner beauty",
            "Create art or beauty that touches the collective soul and promotes healing",
            "Become a behind-the-scenes force for beauty and love in the world"
        ],
        challenges: [
            "May be overly self-sacrificing or martyrlike in relationships",
            "Tendency to idealize partners or have unrealistic expectations about love",
            "Difficulty receiving love or appreciation for your aesthetic contributions",
            "May be drawn to relationships that involve suffering or victimization"
        ],
        keywords: ["Spiritual", "Compassionate", "Healing", "Transcendent", "Self-sacrificing", "Mystical", "Hidden", "Unconditional"],
        developmentTips: [
            "Balance self-sacrifice with healthy boundaries and self-care",
            "Use your healing gifts while maintaining your own emotional and aesthetic well-being",
            "Practice receiving love and appreciation alongside your natural giving",
            "Ground your spiritual aesthetic sense in practical service to others"
        ]
    }
};
// Mars in Houses interpretations
export const MARS_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Dynamic Leader",
        shortDescription: "Your energy and drive are immediately visible. You're naturally assertive, competitive, and take direct action.",
        detailedDescription: "With Mars in the 1st House, your energy, drive, and assertiveness are central to your identity and how others perceive you. You have a naturally competitive, pioneering spirit and tend to take immediate, direct action when you want something. Your physical energy is high, and you may be athletic or have a strong, muscular build. You're not afraid of confrontation and can be quite bold in pursuing your goals. Others see you as a natural leader who isn't afraid to take risks or fight for what you believe in. Your approach to life is direct, honest, and sometimes impulsive.",
        lifeAreaFocus: "Energy and action expressed through personal identity and leadership",
        manifestation: [
            "High physical energy and naturally competitive, assertive personality",
            "Direct, immediate action-taking and bold pursuit of personal goals",
            "Natural leadership abilities and willingness to take risks",
            "Strong, possibly athletic physical presence and high energy levels"
        ],
        opportunities: [
            "Excel in leadership roles, athletics, military, or entrepreneurship",
            "Use natural courage and initiative to pioneer new ventures",
            "Become a motivational force who inspires others to take action",
            "Lead by example in competitive or challenging situations"
        ],
        challenges: [
            "May be overly aggressive, impatient, or confrontational",
            "Tendency to act impulsively without considering consequences",
            "Difficulty with cooperation or following others' leadership",
            "May intimidate others or come across as too forceful"
        ],
        keywords: ["Assertive", "Competitive", "Direct", "Energetic", "Bold", "Leadership", "Pioneering", "Courageous"],
        developmentTips: [
            "Channel your natural leadership into positive, constructive directions",
            "Practice patience and strategic thinking alongside your natural initiative",
            "Use your courage to help others overcome their fears and limitations",
            "Balance assertiveness with consideration for others' needs and feelings"
        ]
    },
    [House.Second]: {
        meaning: "Resource Builder",
        shortDescription: "You direct your energy toward building wealth, security, and material resources through determined effort.",
        detailedDescription: "With Mars in the 2nd House, your drive and energy are focused on building material security, wealth, and resources. You work hard and persistently to achieve financial stability and may be quite competitive about money and possessions. Your approach to earning and spending is direct and determined - you're willing to fight for what you believe you deserve financially. You may have strong opinions about money and values, and you're not afraid to work physically hard to achieve material goals. Your energy is steady and enduring rather than quick and impulsive.",
        lifeAreaFocus: "Energy directed toward building wealth and material security",
        manifestation: [
            "Determined, persistent effort toward building wealth and financial security",
            "Competitive approach to earning money and acquiring possessions",
            "Willingness to work physically hard for material goals",
            "Strong opinions about money, values, and what constitutes fair compensation"
        ],
        opportunities: [
            "Excel in business, finance, real estate, or physical labor industries",
            "Build substantial wealth through determined effort and smart investments",
            "Become an expert in areas requiring persistence and material focus",
            "Help others achieve financial security through your practical drive"
        ],
        challenges: [
            "May be overly materialistic or aggressive about money matters",
            "Tendency to be stubborn or inflexible about financial decisions",
            "Difficulty sharing resources or being generous with money",
            "May work so hard for money that other life areas suffer"
        ],
        keywords: ["Determined", "Persistent", "Material", "Competitive", "Hardworking", "Stubborn", "Practical", "Acquisitive"],
        developmentTips: [
            "Balance material drive with generosity and sharing with others",
            "Use your persistence to build long-term wealth rather than quick gains",
            "Practice flexibility in financial decisions while maintaining determination",
            "Remember that security comes from inner strength as well as material resources"
        ]
    },
    [House.Third]: {
        meaning: "Communicative Fighter",
        shortDescription: "You direct your energy through communication, learning, and assertive interactions with your immediate environment.",
        detailedDescription: "With Mars in the 3rd House, your drive and energy are expressed through communication, learning, and interactions with your immediate environment. You're a forceful, direct communicator who isn't afraid to speak your mind or engage in intellectual debates. Your relationship with siblings may be competitive or combative, and you may be the one who fights for family causes. You learn quickly and aggressively, diving into new subjects with enthusiasm. Your mental energy is high, and you may be involved in writing, teaching, or media that has an activist or competitive edge.",
        lifeAreaFocus: "Energy expressed through communication and local interactions",
        manifestation: [
            "Forceful, direct communication style and willingness to engage in debates",
            "Competitive or combative relationships with siblings and neighbors",
            "Aggressive, enthusiastic approach to learning and acquiring new skills",
            "High mental energy and involvement in activist or competitive communication"
        ],
        opportunities: [
            "Excel in journalism, debate, teaching, or activist communication",
            "Use communication skills to fight for important causes and social justice",
            "Become a powerful advocate or spokesperson for those who need a voice",
            "Channel mental energy into writing or media that creates positive change"
        ],
        challenges: [
            "May be overly argumentative or aggressive in communication",
            "Tendency to create conflicts with siblings, neighbors, or local community",
            "Difficulty listening to others or considering different perspectives",
            "May use words as weapons rather than tools for understanding"
        ],
        keywords: ["Forceful", "Direct", "Argumentative", "Quick", "Competitive", "Activist", "Energetic", "Combative"],
        developmentTips: [
            "Channel your communication energy into constructive advocacy and positive change",
            "Practice active listening to balance your natural tendency to speak forcefully",
            "Use your mental energy to help others find their voice and express themselves",
            "Learn to disagree respectfully while maintaining your passionate convictions"
        ]
    },
    [House.Fourth]: {
        meaning: "Family Protector",
        shortDescription: "You direct your energy toward protecting home, family, and creating a secure emotional foundation.",
        detailedDescription: "With Mars in the 4th House, your drive and energy are focused on protecting and defending your home, family, and emotional security. You may be the family fighter who stands up for family members or family values. Your energy can be quite emotional and reactive, especially when it comes to matters of home and family security. You may work from home or in family businesses, and you're willing to fight fiercely to protect your loved ones. Your relationship with your mother or family of origin may have been competitive or conflicted, but also deeply motivating.",
        lifeAreaFocus: "Energy directed toward protecting home, family, and emotional security",
        manifestation: [
            "Fierce protection of home, family, and emotional security",
            "Role as family fighter who defends family members and values",
            "Emotional, reactive energy especially regarding home and family matters",
            "Willingness to work from home or fight for family-related causes"
        ],
        opportunities: [
            "Excel in real estate, home security, family counseling, or protective services",
            "Become the family anchor who provides security and protection for loved ones",
            "Use protective instincts to help others create safe, secure home environments",
            "Channel emotional energy into building strong family foundations"
        ],
        challenges: [
            "May be overly emotional or reactive about family and home matters",
            "Tendency to be controlling or overprotective of family members",
            "Difficulty leaving home or family environment for personal growth",
            "May carry family conflicts or emotional wounds that fuel anger"
        ],
        keywords: ["Protective", "Emotional", "Reactive", "Family-focused", "Defensive", "Territorial", "Nurturing", "Fierce"],
        developmentTips: [
            "Channel protective instincts into positive family leadership and support",
            "Practice emotional regulation while maintaining your caring, protective nature",
            "Use your family loyalty to create healing and strength for all family members",
            "Balance family protection with allowing loved ones to grow and be independent"
        ]
    },
    [House.Fifth]: {
        meaning: "Creative Competitor",
        shortDescription: "You direct your energy through creativity, competition, romance, and joyful self-expression.",
        detailedDescription: "With Mars in the 5th House, your drive and energy are expressed through creativity, competition, romance, and playful self-expression. You approach creative projects with passion and determination, and you may be quite competitive in sports, games, or artistic endeavors. Your romantic style is bold, passionate, and direct - you pursue love interests with enthusiasm and aren't afraid to take risks in romance. You may have a strong drive to have children or work with children, and you bring energy and excitement to entertainment and fun activities.",
        lifeAreaFocus: "Energy expressed through creativity, competition, and passionate romance",
        manifestation: [
            "Passionate, determined approach to creative projects and artistic expression",
            "Competitive spirit in sports, games, and recreational activities",
            "Bold, direct romantic style with enthusiastic pursuit of love interests",
            "Strong energy and excitement brought to entertainment and fun activities"
        ],
        opportunities: [
            "Excel in competitive sports, entertainment, creative arts, or working with children",
            "Use creative energy to inspire and entertain others through passionate expression",
            "Become a dynamic teacher or coach who motivates others to excel",
            "Channel competitive drive into positive creative or recreational achievements"
        ],
        challenges: [
            "May be overly competitive or aggressive in recreational activities",
            "Tendency to be dramatic or demanding in romantic relationships",
            "Difficulty handling creative criticism or losing in competitive situations",
            "May take unnecessary risks in pursuit of excitement or recognition"
        ],
        keywords: ["Creative", "Competitive", "Passionate", "Bold", "Dramatic", "Playful", "Energetic", "Risk-taking"],
        developmentTips: [
            "Channel competitive energy into positive creative expression and healthy competition",
            "Balance passionate romance with respect and consideration for partners",
            "Use your creative drive to inspire and uplift others rather than just win",
            "Practice good sportsmanship and gracious handling of both victory and defeat"
        ]
    },
    [House.Sixth]: {
        meaning: "Dedicated Worker",
        shortDescription: "You direct your energy through work, service, health, and improving daily routines and systems.",
        detailedDescription: "With Mars in the 6th House, your drive and energy are focused on work, service, health, and improving daily routines and systems. You're a dedicated, hardworking individual who takes pride in doing quality work and serving others effectively. You may be quite competitive in work environments and have strong opinions about efficiency and proper procedures. Your approach to health and fitness is disciplined and determined, and you may work in healthcare, service industries, or fields that require attention to detail and systematic effort.",
        lifeAreaFocus: "Energy directed toward work excellence, service, and health improvement",
        manifestation: [
            "Dedicated, hardworking approach with pride in quality work and service",
            "Competitive attitude in work environments and strong opinions about efficiency",
            "Disciplined, determined approach to health, fitness, and daily routines",
            "Focus on improving systems, procedures, and helping others through practical service"
        ],
        opportunities: [
            "Excel in healthcare, service industries, quality control, or systematic improvement",
            "Become an expert in efficiency, organization, and practical problem-solving",
            "Use work ethic and service orientation to help others improve their lives",
            "Build reputation for reliability, quality, and dedicated service"
        ],
        challenges: [
            "May be overly critical or perfectionist about work and health matters",
            "Tendency to overwork or become stressed about job performance",
            "Difficulty relaxing or taking breaks from work and service responsibilities",
            "May be impatient with others who don't share your work ethic"
        ],
        keywords: ["Dedicated", "Hardworking", "Service-oriented", "Systematic", "Health-focused", "Efficient", "Critical", "Perfectionist"],
        developmentTips: [
            "Balance dedication to work with self-care and relaxation",
            "Use your service orientation to help others while maintaining healthy boundaries",
            "Practice patience with those who work differently while maintaining your standards",
            "Channel perfectionist tendencies into continuous improvement rather than criticism"
        ]
    },
    [House.Seventh]: {
        meaning: "Partnership Fighter",
        shortDescription: "You direct your energy through partnerships, relationships, and fighting for fairness and justice.",
        detailedDescription: "With Mars in the 7th House, your drive and energy are expressed through partnerships, relationships, and your fight for fairness and justice. You may be attracted to partners who are strong, assertive, or competitive, and your relationships often involve some degree of conflict or challenge that ultimately strengthens the bond. You're willing to fight for your relationships and for what you believe is fair and just. You may work in law, mediation, or other fields that involve advocacy and fighting for others' rights.",
        lifeAreaFocus: "Energy expressed through partnerships and fighting for justice",
        manifestation: [
            "Attraction to strong, assertive partners and relationships that involve challenge",
            "Willingness to fight for relationships and what you believe is fair",
            "Energy expressed through advocacy, mediation, and fighting for others' rights",
            "Partnerships that involve some degree of healthy conflict and competition"
        ],
        opportunities: [
            "Excel in law, mediation, advocacy, or partnership-based businesses",
            "Build strong relationships through healthy conflict resolution and mutual challenge",
            "Use fighting spirit to advocate for justice and fairness in society",
            "Become a powerful ally who fights for others' rights and interests"
        ],
        challenges: [
            "May be overly confrontational or argumentative in relationships",
            "Tendency to attract partners who are aggressive or create conflict",
            "Difficulty compromising or backing down from relationship disputes",
            "May project your own fighting energy onto partners or blame them for conflicts"
        ],
        keywords: ["Partnership-focused", "Justice-seeking", "Confrontational", "Advocacy", "Competitive", "Fair", "Challenging", "Assertive"],
        developmentTips: [
            "Channel fighting energy into constructive advocacy and positive change",
            "Practice healthy conflict resolution while maintaining your passion for justice",
            "Choose partners who challenge you positively rather than destructively",
            "Use your energy to fight for others while maintaining harmony in personal relationships"
        ]
    },
    [House.Eighth]: {
        meaning: "Transformational Warrior",
        shortDescription: "You direct your energy through transformation, shared resources, and intense, life-changing experiences.",
        detailedDescription: "With Mars in the 8th House, your drive and energy are focused on transformation, shared resources, and intense, life-changing experiences. You're not afraid of crisis, conflict, or challenging situations - in fact, you may thrive in them. Your energy is deep, intense, and regenerative, and you have the ability to help others through major life transitions. You may work with other people's money, resources, or psychological healing, and you're willing to fight for what you believe is rightfully yours or others'. Your approach to sexuality and intimacy is passionate and transformative.",
        lifeAreaFocus: "Energy directed toward transformation and managing shared resources",
        manifestation: [
            "Thriving in crisis situations and intense, life-changing experiences",
            "Deep, regenerative energy focused on transformation and renewal",
            "Work involving other people's money, resources, or psychological healing",
            "Passionate, transformative approach to sexuality and intimate relationships"
        ],
        opportunities: [
            "Excel in psychology, crisis management, finance, or transformational healing",
            "Help others through major life transitions and psychological transformation",
            "Build expertise in managing shared resources, investments, or crisis situations",
            "Use intense energy to create profound positive change in yourself and others"
        ],
        challenges: [
            "May be drawn to destructive or overly intense situations",
            "Tendency to be controlling, manipulative, or power-hungry",
            "Difficulty with surface-level interactions or casual relationships",
            "May use sexuality or psychological insight manipulatively"
        ],
        keywords: ["Intense", "Transformational", "Deep", "Regenerative", "Crisis-oriented", "Powerful", "Psychological", "Passionate"],
        developmentTips: [
            "Channel intense energy into positive transformation and healing work",
            "Use your crisis management skills to help others while maintaining healthy boundaries",
            "Practice healthy power dynamics in relationships and avoid manipulation",
            "Balance intensity with lighter, more playful interactions"
        ]
    },
    [House.Ninth]: {
        meaning: "Philosophical Crusader",
        shortDescription: "You direct your energy through higher learning, travel, philosophy, and fighting for your beliefs.",
        detailedDescription: "With Mars in the 9th House, your drive and energy are focused on higher learning, philosophy, travel, and fighting for your beliefs and ideals. You're passionate about expanding your horizons and may be quite aggressive in pursuing education, travel, or spiritual growth. You're willing to fight for your philosophical or religious beliefs and may be involved in activism, teaching, or spreading your ideas to others. Your energy is optimistic and adventurous, and you're not afraid to take risks in pursuit of truth and meaning.",
        lifeAreaFocus: "Energy directed toward higher learning and fighting for beliefs",
        manifestation: [
            "Passionate pursuit of higher education, philosophy, and spiritual growth",
            "Aggressive advocacy for philosophical, religious, or educational beliefs",
            "Adventurous energy focused on travel, exploration, and expanding horizons",
            "Willingness to fight for truth, justice, and meaningful causes"
        ],
        opportunities: [
            "Excel in education, law, publishing, or international advocacy",
            "Become a passionate teacher or advocate who fights for important causes",
            "Use adventurous energy to explore and share different cultures and philosophies",
            "Channel fighting spirit into positive social change and educational reform"
        ],
        challenges: [
            "May be overly dogmatic or aggressive about beliefs and philosophies",
            "Tendency to be preachy or intolerant of different viewpoints",
            "Difficulty with practical details or staying focused on one belief system",
            "May take unnecessary risks in pursuit of adventure or idealistic causes"
        ],
        keywords: ["Philosophical", "Adventurous", "Idealistic", "Educational", "Crusading", "Optimistic", "Risk-taking", "Expansive"],
        developmentTips: [
            "Balance passionate beliefs with openness to other perspectives and learning",
            "Use your crusading energy to create positive change while respecting others' views",
            "Practice grounding your idealistic energy in practical, achievable actions",
            "Channel adventurous spirit into meaningful exploration and cultural understanding"
        ]
    },
    [House.Tenth]: {
        meaning: "Ambitious Achiever",
        shortDescription: "You direct your energy toward career success, public recognition, and building authority and reputation.",
        detailedDescription: "With Mars in the 10th House, your drive and energy are focused on career success, public recognition, and building your authority and reputation. You're naturally ambitious and competitive in professional settings, and you're willing to fight for advancement and recognition. Your public image may be associated with strength, leadership, or pioneering achievements. You work hard to build your reputation and may be known for your determination, courage, or ability to take on challenging projects. Your career may involve leadership, competition, or fields that require courage and initiative.",
        lifeAreaFocus: "Energy directed toward career success and public achievement",
        manifestation: [
            "Natural ambition and competitive drive in professional settings",
            "Willingness to fight for career advancement and public recognition",
            "Public image associated with strength, leadership, and pioneering achievements",
            "Hard work focused on building reputation and professional authority"
        ],
        opportunities: [
            "Excel in leadership roles, competitive industries, or pioneering fields",
            "Build a strong professional reputation through determination and courage",
            "Use ambitious energy to create positive change in your industry or society",
            "Become a respected authority who inspires others to achieve their goals"
        ],
        challenges: [
            "May be overly aggressive or ruthless in pursuit of career success",
            "Tendency to sacrifice personal relationships for professional advancement",
            "Difficulty with authority figures or following others' leadership",
            "May become workaholic or overly focused on public image and status"
        ],
        keywords: ["Ambitious", "Competitive", "Leadership", "Authority", "Determined", "Public", "Pioneering", "Achievement-focused"],
        developmentTips: [
            "Balance career ambition with personal relationships and self-care",
            "Use your leadership position to lift others up and create positive change",
            "Practice collaboration and teamwork alongside your natural competitive drive",
            "Remember that true success includes personal fulfillment, not just public recognition"
        ]
    },
    [House.Eleventh]: {
        meaning: "Social Justice Warrior",
        shortDescription: "You direct your energy through friendships, groups, and fighting for progressive causes and future ideals.",
        detailedDescription: "With Mars in the 11th House, your drive and energy are focused on friendships, group activities, and fighting for progressive causes and future ideals. You're passionate about social justice and may be involved in activism, community organizing, or fighting for humanitarian causes. Your friendships may be competitive or involve shared battles for common goals. You're willing to fight for your hopes and dreams for the future, and you may use technology or innovative methods to advance your causes. Your energy is future-oriented and focused on creating positive change for society.",
        lifeAreaFocus: "Energy directed toward social causes and progressive group activities",
        manifestation: [
            "Passionate involvement in social justice and humanitarian causes",
            "Competitive or battle-focused friendships united by common goals",
            "Use of technology and innovative methods to advance progressive causes",
            "Future-oriented energy focused on creating positive societal change"
        ],
        opportunities: [
            "Excel in activism, community organizing, technology, or social innovation",
            "Build powerful networks of friends and allies who fight for common causes",
            "Use energy to create positive social change and advance humanitarian ideals",
            "Become a leader in progressive movements or technological innovation"
        ],
        challenges: [
            "May be overly aggressive or confrontational in group settings",
            "Tendency to be impatient with those who don't share progressive ideals",
            "Difficulty with traditional authority or conventional approaches",
            "May scatter energy across too many causes or social battles"
        ],
        keywords: ["Progressive", "Activist", "Social", "Innovative", "Future-oriented", "Humanitarian", "Group-focused", "Revolutionary"],
        developmentTips: [
            "Focus your activist energy on causes where you can make real, lasting impact",
            "Practice patience and diplomacy while maintaining your passion for justice",
            "Use your social influence to unite people rather than create division",
            "Balance group involvement with personal relationships and self-care"
        ]
    },
    [House.Twelfth]: {
        meaning: "Hidden Warrior",
        shortDescription: "You direct your energy through spirituality, service, and fighting for those who cannot fight for themselves.",
        detailedDescription: "With Mars in the 12th House, your drive and energy are often hidden, working behind the scenes or in service to others who cannot fight for themselves. You may struggle with asserting yourself directly, but you have great strength when fighting for spiritual causes or helping those who are marginalized or suffering. Your energy may be expressed through dreams, meditation, or spiritual practices, and you may work in healing, charitable, or institutional settings. You have the ability to sacrifice your own desires to serve a higher purpose or help those in need.",
        lifeAreaFocus: "Energy directed toward spiritual service and helping the marginalized",
        manifestation: [
            "Hidden strength that works behind the scenes for spiritual or charitable causes",
            "Difficulty with direct self-assertion but great power when helping others",
            "Energy expressed through dreams, meditation, and spiritual practices",
            "Work in healing, charitable, or institutional settings serving those in need"
        ],
        opportunities: [
            "Excel in healing professions, charitable work, or spiritual service",
            "Use hidden strength to help those who are marginalized or suffering",
            "Develop spiritual practices that channel energy into positive service",
            "Become a behind-the-scenes force for healing and positive change"
        ],
        challenges: [
            "May struggle with healthy self-assertion and setting boundaries",
            "Tendency to be overly self-sacrificing or martyrlike in service",
            "Difficulty expressing anger or fighting for personal needs",
            "May be prone to hidden resentments or passive-aggressive behavior"
        ],
        keywords: ["Hidden", "Spiritual", "Service-oriented", "Self-sacrificing", "Healing", "Compassionate", "Behind-the-scenes", "Transcendent"],
        developmentTips: [
            "Practice healthy self-assertion while maintaining your compassionate service",
            "Use your spiritual strength to help others while honoring your own needs",
            "Develop healthy outlets for anger and frustration through spiritual practices",
            "Balance self-sacrifice with self-care and personal boundary-setting"
        ]
    }
};
// Jupiter in Houses interpretations
export const JUPITER_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Natural Optimist",
        shortDescription: "Your growth and expansion come through personal development and an optimistic, generous personality.",
        detailedDescription: "With Jupiter in the 1st House, your natural optimism, generosity, and enthusiasm are central to your identity and how others perceive you. You have a larger-than-life personality and tend to see the best in people and situations. Your physical presence may be impressive or commanding, and you naturally inspire confidence in others. You're a lifelong learner who grows through personal experiences and self-development. Your philosophical outlook and positive attitude attract opportunities and good fortune throughout your life.",
        lifeAreaFocus: "Growth and expansion through personal development and optimistic presence",
        manifestation: [
            "Naturally optimistic, generous personality that inspires confidence in others",
            "Larger-than-life presence and tendency to see the best in people and situations",
            "Lifelong learning approach with growth through personal experiences",
            "Philosophical outlook and positive attitude that attracts opportunities"
        ],
        opportunities: [
            "Excel in teaching, counseling, motivational speaking, or leadership roles",
            "Use natural optimism to inspire and uplift others during difficult times",
            "Develop expertise in personal development, philosophy, or spiritual growth",
            "Become a mentor or guide who helps others expand their potential"
        ],
        challenges: [
            "May be overly optimistic or unrealistic about personal capabilities",
            "Tendency to overindulge in food, spending, or other pleasures",
            "Difficulty with moderation or accepting limitations",
            "May promise more than you can deliver or take on too many commitments"
        ],
        keywords: ["Optimistic", "Generous", "Expansive", "Inspiring", "Philosophical", "Confident", "Growth-oriented", "Enthusiastic"],
        developmentTips: [
            "Balance optimism with realistic assessment of situations and capabilities",
            "Practice moderation in all areas while maintaining your generous spirit",
            "Use your inspiring presence to help others grow and expand their horizons",
            "Channel your enthusiasm into meaningful projects that serve others"
        ]
    },
    [House.Second]: {
        meaning: "Wealth Expander",
        shortDescription: "Your growth comes through building wealth, expanding resources, and generous financial abundance.",
        detailedDescription: "With Jupiter in the 2nd House, your expansion and good fortune are closely tied to money, possessions, and material resources. You have natural business instincts and the ability to attract wealth and abundance. Your generous nature may lead you to spend freely or give generously to others. You appreciate quality and luxury, and you may work in fields related to finance, luxury goods, or resource management. Your values are expansive and you believe in abundance rather than scarcity.",
        lifeAreaFocus: "Growth and expansion through wealth building and resource management",
        manifestation: [
            "Natural business instincts and ability to attract wealth and material abundance",
            "Generous spending habits and tendency to give freely to others",
            "Appreciation for quality, luxury, and the finer things in life",
            "Expansive values and belief in abundance rather than scarcity"
        ],
        opportunities: [
            "Excel in finance, banking, luxury goods, or resource management",
            "Build substantial wealth through wise investments and business ventures",
            "Use financial abundance to support charitable causes and help others",
            "Become an expert in wealth building and financial abundance strategies"
        ],
        challenges: [
            "May be overly generous or careless with money and resources",
            "Tendency to overspend on luxury items or overindulge in material pleasures",
            "Difficulty with budgeting or financial discipline",
            "May take financial good fortune for granted or become materialistic"
        ],
        keywords: ["Abundant", "Generous", "Wealthy", "Luxurious", "Business-minded", "Expansive", "Optimistic", "Resource-rich"],
        developmentTips: [
            "Balance generosity with wise financial planning and budgeting",
            "Use your wealth-building abilities to create security for yourself and others",
            "Practice gratitude for financial blessings while helping those less fortunate",
            "Develop financial discipline while maintaining your abundant mindset"
        ]
    },
    [House.Third]: {
        meaning: "Wisdom Communicator",
        shortDescription: "Your growth comes through communication, learning, and sharing wisdom with your immediate environment.",
        detailedDescription: "With Jupiter in the 3rd House, your expansion and growth come through communication, learning, and sharing knowledge with others. You have a natural gift for teaching and may be known for your wisdom, humor, or philosophical insights in everyday conversations. Your relationships with siblings and neighbors are important sources of growth and learning. You're curious about many subjects and may be involved in writing, publishing, or media that spreads knowledge and positive ideas.",
        lifeAreaFocus: "Growth through communication, learning, and sharing wisdom locally",
        manifestation: [
            "Natural teaching ability and gift for sharing wisdom through communication",
            "Important growth experiences through relationships with siblings and neighbors",
            "Curiosity about many subjects and involvement in educational communication",
            "Humor and philosophical insights that enrich everyday conversations"
        ],
        opportunities: [
            "Excel in teaching, writing, journalism, or educational media",
            "Build strong networks within your community through wisdom sharing",
            "Use communication skills to spread positive ideas and inspire learning",
            "Become a local authority or go-to person for advice and guidance"
        ],
        challenges: [
            "May be overly talkative or preachy in communication",
            "Tendency to exaggerate stories or embellish facts for effect",
            "Difficulty focusing on one subject or completing detailed projects",
            "May scatter energy across too many learning interests"
        ],
        keywords: ["Wise", "Communicative", "Teaching", "Curious", "Philosophical", "Humorous", "Educational", "Expansive"],
        developmentTips: [
            "Focus your diverse learning interests into areas where you can develop expertise",
            "Practice active listening to balance your natural tendency to teach and share",
            "Use your communication gifts to genuinely help others learn and grow",
            "Develop depth alongside your natural breadth of knowledge"
        ]
    },
    [House.Fourth]: {
        meaning: "Family Expander",
        shortDescription: "Your growth comes through home, family, and creating an abundant, nurturing domestic foundation.",
        detailedDescription: "With Jupiter in the 4th House, your expansion and good fortune are connected to your home, family, and emotional foundation. You may come from a large or prosperous family, or you create abundance within your own family life. Your home is likely spacious, comfortable, and welcoming to others. You have strong family values and may be the one who brings wisdom, optimism, and abundance to family gatherings. Your emotional security comes through creating a generous, nurturing home environment.",
        lifeAreaFocus: "Growth through family abundance and nurturing home environment",
        manifestation: [
            "Large, prosperous family background or creation of abundant family life",
            "Spacious, comfortable home that welcomes and nurtures others",
            "Role as family wisdom keeper who brings optimism and abundance",
            "Emotional security through generous, nurturing domestic environment"
        ],
        opportunities: [
            "Excel in real estate, hospitality, family counseling, or home-based businesses",
            "Create a family legacy of wisdom, abundance, and positive values",
            "Use your home as a gathering place that nurtures and inspires others",
            "Become a source of emotional wisdom and support for family members"
        ],
        challenges: [
            "May be overly indulgent or permissive with family members",
            "Tendency to overspend on home improvements or family luxuries",
            "Difficulty setting boundaries within family relationships",
            "May take family blessings for granted or become complacent"
        ],
        keywords: ["Family-oriented", "Nurturing", "Abundant", "Welcoming", "Wise", "Generous", "Comfortable", "Traditional"],
        developmentTips: [
            "Balance family generosity with healthy boundaries and expectations",
            "Use your nurturing gifts to support family growth while encouraging independence",
            "Create family traditions that pass on wisdom and positive values",
            "Share your abundant home environment with those who need support"
        ]
    },
    [House.Fifth]: {
        meaning: "Joyful Creator",
        shortDescription: "Your growth comes through creativity, children, romance, and joyful self-expression.",
        detailedDescription: "With Jupiter in the 5th House, your expansion and good fortune come through creativity, children, romance, and joyful self-expression. You have natural artistic talents and a generous, playful spirit that brings joy to others. Children play an important role in your growth - whether your own children or working with young people. Your romantic relationships are expansive and optimistic, and you approach love with generosity and enthusiasm. You find wisdom through play, creativity, and following your heart.",
        lifeAreaFocus: "Growth through creativity, children, and joyful self-expression",
        manifestation: [
            "Natural artistic talents and generous, playful spirit that brings joy",
            "Important growth experiences through children and young people",
            "Expansive, optimistic approach to romance and love relationships",
            "Wisdom gained through play, creativity, and following your heart"
        ],
        opportunities: [
            "Excel in creative arts, entertainment, education, or working with children",
            "Use artistic talents to inspire and bring joy to many people",
            "Build meaningful relationships with children that foster mutual growth",
            "Become a teacher or mentor who helps others discover their creative potential"
        ],
        challenges: [
            "May be overly indulgent or permissive with children",
            "Tendency to take creative risks that don't pay off financially",
            "Difficulty with practical responsibilities that interfere with creative time",
            "May have unrealistic expectations about romance or creative success"
        ],
        keywords: ["Creative", "Joyful", "Generous", "Playful", "Artistic", "Optimistic", "Child-loving", "Expressive"],
        developmentTips: [
            "Balance creative pursuits with practical responsibilities and financial planning",
            "Use your joyful energy to create meaningful art that serves others",
            "Practice wise guidance with children while maintaining playful connection",
            "Channel romantic optimism into building lasting, meaningful relationships"
        ]
    },
    [House.Sixth]: {
        meaning: "Service Expander",
        shortDescription: "Your growth comes through work, service, health, and expanding your ability to help others practically.",
        detailedDescription: "With Jupiter in the 6th House, your expansion and good fortune come through work, service, and health-related activities. You may work in large organizations or have jobs that involve helping many people. Your approach to health and wellness is holistic and optimistic, and you may be drawn to natural healing or wellness practices. You find meaning and growth through being of service to others, and your work often has a teaching or mentoring component.",
        lifeAreaFocus: "Growth through meaningful work, service, and health expansion",
        manifestation: [
            "Work in large organizations or jobs that help many people",
            "Holistic, optimistic approach to health and wellness practices",
            "Growth and meaning found through service and helping others",
            "Work that includes teaching, mentoring, or wisdom-sharing components"
        ],
        opportunities: [
            "Excel in healthcare, education, social services, or large organizations",
            "Develop expertise in holistic health and wellness practices",
            "Use work platform to teach, mentor, and inspire others",
            "Create systems and services that help many people improve their lives"
        ],
        challenges: [
            "May take on too many work responsibilities or overcommit to service",
            "Tendency to be overly optimistic about health issues or ignore symptoms",
            "Difficulty with detailed work or mundane daily responsibilities",
            "May promise more service than you can realistically deliver"
        ],
        keywords: ["Service-oriented", "Helpful", "Health-focused", "Optimistic", "Teaching", "Holistic", "Meaningful", "Expansive"],
        developmentTips: [
            "Balance service to others with self-care and personal boundaries",
            "Use your optimistic approach to health while staying realistic about medical needs",
            "Focus your service efforts on areas where you can make the greatest impact",
            "Develop systems that allow you to help many people efficiently"
        ]
    },
    [House.Seventh]: {
        meaning: "Partnership Expander",
        shortDescription: "Your growth comes through partnerships, marriage, and expanding your understanding through relationships.",
        detailedDescription: "With Jupiter in the 7th House, your expansion and good fortune come through partnerships, marriage, and relationships with others. You're likely to attract generous, optimistic partners who support your growth and expansion. Your marriage or business partnerships may be particularly blessed or successful. You learn and grow through cooperation with others, and you may work in fields that involve counseling, mediation, or helping others with their relationships. Your approach to partnerships is generous and philosophical.",
        lifeAreaFocus: "Growth through partnerships and expanding understanding via relationships",
        manifestation: [
            "Attraction of generous, optimistic partners who support growth and expansion",
            "Blessed or particularly successful marriages and business partnerships",
            "Learning and growth through cooperation and collaboration with others",
            "Work involving relationship counseling, mediation, or partnership facilitation"
        ],
        opportunities: [
            "Excel in counseling, mediation, law, or partnership-based businesses",
            "Build successful marriages and business partnerships based on mutual growth",
            "Use relationship skills to help others improve their partnerships",
            "Become a wise counselor or advisor for relationship matters"
        ],
        challenges: [
            "May be overly optimistic about partners or ignore relationship red flags",
            "Tendency to be too generous or giving in relationships",
            "Difficulty maintaining individual identity within partnerships",
            "May attract partners who take advantage of your generosity"
        ],
        keywords: ["Partnership-focused", "Generous", "Optimistic", "Cooperative", "Wise", "Supportive", "Relationship-oriented", "Harmonious"],
        developmentTips: [
            "Balance generosity in relationships with healthy boundaries and expectations",
            "Choose partners who support your individual growth alongside partnership goals",
            "Use your relationship wisdom to help others while maintaining your own needs",
            "Practice discernment in partnerships while maintaining your generous spirit"
        ]
    },
    [House.Eighth]: {
        meaning: "Transformation Expander",
        shortDescription: "Your growth comes through transformation, shared resources, and expanding through life's deeper mysteries.",
        detailedDescription: "With Jupiter in the 8th House, your expansion and good fortune come through transformation, shared resources, and exploring life's deeper mysteries. You may benefit from other people's money, investments, or inheritances. Your approach to psychology, spirituality, and transformation is optimistic and growth-oriented. You have the ability to help others through major life transitions and crises. Your wisdom comes through experiencing and facilitating profound personal transformation.",
        lifeAreaFocus: "Growth through transformation and shared resource expansion",
        manifestation: [
            "Benefits from other people's money, investments, or inheritances",
            "Optimistic, growth-oriented approach to psychology and transformation",
            "Ability to help others through major life transitions and crises",
            "Wisdom gained through experiencing profound personal transformation"
        ],
        opportunities: [
            "Excel in psychology, finance, investment management, or crisis counseling",
            "Build wealth through shared resources, investments, or transformational work",
            "Use transformational wisdom to help others heal and grow",
            "Become an expert in managing crisis situations and facilitating growth"
        ],
        challenges: [
            "May be overly optimistic about risky investments or shared resources",
            "Tendency to avoid dealing with practical details of shared finances",
            "Difficulty with the darker aspects of transformation or crisis",
            "May take financial or transformational good fortune for granted"
        ],
        keywords: ["Transformational", "Optimistic", "Resource-expanding", "Wise", "Crisis-managing", "Deep", "Regenerative", "Beneficial"],
        developmentTips: [
            "Balance optimism about investments with careful financial planning",
            "Use your transformational gifts to help others while maintaining healthy boundaries",
            "Develop practical skills alongside your natural wisdom about transformation",
            "Practice gratitude for shared resources while being responsible with them"
        ]
    },
    [House.Ninth]: {
        meaning: "Wisdom Seeker",
        shortDescription: "Your growth comes through higher learning, travel, philosophy, and expanding your worldview.",
        detailedDescription: "With Jupiter in the 9th House, your expansion and good fortune come through higher education, travel, philosophy, and broadening your worldview. This is Jupiter's natural house, so its beneficial qualities are strongly expressed here. You're a natural teacher, philosopher, or wisdom keeper who loves to learn and share knowledge. Travel and exposure to different cultures bring you great joy and growth. You may work in education, publishing, law, or international fields.",
        lifeAreaFocus: "Growth through higher learning, travel, and philosophical expansion",
        manifestation: [
            "Natural teaching, philosophical, or wisdom-keeping abilities",
            "Great joy and growth through travel and exposure to different cultures",
            "Strong connection to higher education and lifelong learning",
            "Work in education, publishing, law, or international fields"
        ],
        opportunities: [
            "Excel in higher education, publishing, law, or international business",
            "Become a respected teacher, professor, or wisdom keeper",
            "Use travel experiences to build cultural understanding and wisdom",
            "Write, speak, or teach about subjects that expand others' horizons"
        ],
        challenges: [
            "May be overly dogmatic or preachy about beliefs and philosophies",
            "Tendency to be restless or always seeking the next learning adventure",
            "Difficulty with practical application of philosophical knowledge",
            "May overlook local opportunities while focusing on distant horizons"
        ],
        keywords: ["Wise", "Philosophical", "Educational", "Traveling", "Optimistic", "Expansive", "Cultural", "Teaching"],
        developmentTips: [
            "Balance love of learning with practical application of knowledge",
            "Use your teaching gifts to inspire rather than preach to others",
            "Ground your philosophical insights in real-world service and application",
            "Share your cultural experiences to promote understanding and growth"
        ]
    },
    [House.Tenth]: {
        meaning: "Success Expander",
        shortDescription: "Your growth comes through career success, public recognition, and expanding your authority and influence.",
        detailedDescription: "With Jupiter in the 10th House, your expansion and good fortune come through career success, public recognition, and building your reputation and authority. You're likely to achieve significant professional success and may become well-known in your field. Your career often involves teaching, mentoring, or sharing wisdom with others. You have natural leadership abilities and the capacity to inspire others through your professional achievements. Your public image is associated with wisdom, generosity, and success.",
        lifeAreaFocus: "Growth through career success and expanding public influence",
        manifestation: [
            "Significant professional success and potential for becoming well-known",
            "Career involving teaching, mentoring, or sharing wisdom with others",
            "Natural leadership abilities and capacity to inspire through achievements",
            "Public image associated with wisdom, generosity, and success"
        ],
        opportunities: [
            "Excel in leadership roles, education, consulting, or public service",
            "Build a successful career that allows you to teach and inspire others",
            "Use professional platform to create positive change in your industry",
            "Become a respected authority who mentors the next generation"
        ],
        challenges: [
            "May be overly ambitious or take professional success for granted",
            "Tendency to promise more than you can deliver in professional settings",
            "Difficulty with humility or accepting criticism from authority figures",
            "May neglect personal relationships in pursuit of professional success"
        ],
        keywords: ["Successful", "Authoritative", "Inspiring", "Professional", "Wise", "Leadership", "Recognized", "Influential"],
        developmentTips: [
            "Balance professional ambition with humility and service to others",
            "Use your success to lift others up and create opportunities for them",
            "Maintain integrity and authenticity as you achieve greater recognition",
            "Remember that true success includes personal fulfillment and relationships"
        ]
    },
    [House.Eleventh]: {
        meaning: "Social Expander",
        shortDescription: "Your growth comes through friendships, groups, and expanding your social influence for humanitarian causes.",
        detailedDescription: "With Jupiter in the 11th House, your expansion and good fortune come through friendships, group activities, and working toward humanitarian ideals. You have many friends and are often involved in organizations or causes that aim to improve society. Your social network is diverse and may include influential or successful people who support your goals. You're optimistic about the future and believe in the power of collective action to create positive change.",
        lifeAreaFocus: "Growth through social expansion and humanitarian group activities",
        manifestation: [
            "Large, diverse social network including influential and successful people",
            "Involvement in organizations or causes aimed at improving society",
            "Optimistic outlook about the future and belief in collective action",
            "Growth and opportunities that come through friendships and group activities"
        ],
        opportunities: [
            "Excel in social work, community organizing, or humanitarian causes",
            "Build influential networks that create positive social change",
            "Use social influence to advance important causes and help others",
            "Become a leader in movements that improve society and expand opportunities"
        ],
        challenges: [
            "May be overly idealistic about human nature or social causes",
            "Tendency to scatter energy across too many friendships or causes",
            "Difficulty with intimate relationships due to focus on group activities",
            "May take social privileges or friendships for granted"
        ],
        keywords: ["Social", "Humanitarian", "Optimistic", "Influential", "Group-oriented", "Idealistic", "Networking", "Future-focused"],
        developmentTips: [
            "Focus your humanitarian efforts on causes where you can make real impact",
            "Balance group involvement with intimate, personal relationships",
            "Use your social influence responsibly to create lasting positive change",
            "Practice gratitude for your social privileges while helping those less fortunate"
        ]
    },
    [House.Twelfth]: {
        meaning: "Spiritual Expander",
        shortDescription: "Your growth comes through spirituality, service, and expanding your connection to the divine and collective.",
        detailedDescription: "With Jupiter in the 12th House, your expansion and good fortune come through spirituality, service to others, and connection to the collective unconscious. You may work behind the scenes or in institutional settings, helping those who are marginalized or suffering. Your spiritual life is rich and expansive, and you may have natural psychic or intuitive abilities. You find meaning through self-sacrifice and service to something greater than yourself. Your wisdom comes through transcending personal desires.",
        lifeAreaFocus: "Growth through spiritual expansion and selfless service to others",
        manifestation: [
            "Rich, expansive spiritual life with natural psychic or intuitive abilities",
            "Work behind the scenes helping marginalized or suffering people",
            "Meaning found through self-sacrifice and service to higher purposes",
            "Wisdom gained through transcending personal desires and ego"
        ],
        opportunities: [
            "Excel in healing professions, spiritual counseling, or charitable work",
            "Develop profound spiritual wisdom and connection to the divine",
            "Use intuitive abilities to help others heal and find meaning",
            "Create art, music, or healing work that touches the collective soul"
        ],
        challenges: [
            "May be overly self-sacrificing or martyrlike in service to others",
            "Tendency to escape into spirituality to avoid practical responsibilities",
            "Difficulty receiving recognition or appreciation for your contributions",
            "May struggle with boundaries between self and others"
        ],
        keywords: ["Spiritual", "Service-oriented", "Intuitive", "Self-sacrificing", "Transcendent", "Healing", "Compassionate", "Mystical"],
        developmentTips: [
            "Balance spiritual service with practical self-care and boundaries",
            "Use your spiritual gifts to help others while maintaining your own well-being",
            "Ground your mystical experiences in practical service to others",
            "Practice receiving as well as giving in your spiritual and service work"
        ]
    }
};
// Saturn in Houses interpretations
export const SATURN_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Self-Disciplined Leader",
        shortDescription: "Your life lessons focus on developing self-discipline, responsibility, and authentic leadership through personal challenges.",
        detailedDescription: "With Saturn in the 1st House, your major life lessons revolve around developing self-discipline, taking responsibility for your actions, and building authentic leadership through overcoming personal challenges. You may have faced early restrictions or responsibilities that forced you to mature quickly. Your approach to life is serious, methodical, and goal-oriented. Others see you as reliable, responsible, and someone who has earned their authority through hard work and perseverance. Your greatest achievements come through sustained effort and learning from setbacks.",
        lifeAreaFocus: "Life lessons in self-discipline and responsible leadership",
        manifestation: [
            "Serious, methodical approach to life with early maturity and responsibility",
            "Authority and respect earned through hard work, perseverance, and overcoming challenges",
            "Life lessons focused on self-discipline, personal responsibility, and authentic leadership",
            "Reputation for reliability, dependability, and methodical achievement"
        ],
        opportunities: [
            "Excel in leadership roles that require discipline, responsibility, and long-term planning",
            "Build lasting authority and respect through consistent, reliable performance",
            "Use your hard-earned wisdom to mentor others facing similar challenges",
            "Become a role model for perseverance, discipline, and authentic achievement"
        ],
        challenges: [
            "May be overly serious, rigid, or critical of yourself and others",
            "Tendency to take on too much responsibility or feel burdened by expectations",
            "Difficulty with spontaneity, playfulness, or accepting help from others",
            "May struggle with self-doubt or feeling like you have to prove yourself constantly"
        ],
        keywords: ["Disciplined", "Responsible", "Serious", "Methodical", "Reliable", "Authoritative", "Persevering", "Mature"],
        developmentTips: [
            "Balance discipline and responsibility with self-compassion and playfulness",
            "Learn to delegate and accept help while maintaining your high standards",
            "Use your hard-earned wisdom to help others without being overly critical",
            "Practice celebrating your achievements and recognizing your progress"
        ]
    },
    [House.Second]: {
        meaning: "Resource Builder",
        shortDescription: "Your life lessons focus on building lasting financial security and learning the true value of resources through discipline.",
        detailedDescription: "With Saturn in the 2nd House, your major life lessons involve learning to build lasting financial security and understanding the true value of money and resources. You may have experienced financial limitations or insecurity early in life, which taught you the importance of careful planning and conservative spending. Your approach to money is cautious, disciplined, and focused on long-term security rather than immediate gratification. You build wealth slowly but surely through hard work, careful saving, and wise investments.",
        lifeAreaFocus: "Life lessons in financial discipline and resource management",
        manifestation: [
            "Cautious, disciplined approach to money focused on long-term security",
            "Wealth built slowly through hard work, careful saving, and wise investments",
            "Life lessons about the true value of money and resources through early limitations",
            "Conservative spending habits and focus on practical, lasting value"
        ],
        opportunities: [
            "Excel in finance, banking, investment management, or resource conservation",
            "Build substantial long-term wealth through disciplined saving and investing",
            "Become an expert in financial planning and helping others achieve security",
            "Use your understanding of value to make wise, lasting financial decisions"
        ],
        challenges: [
            "May be overly cautious or fearful about spending money, even when appropriate",
            "Tendency to be stingy or overly focused on material security",
            "Difficulty enjoying the fruits of your labor or spending on pleasures",
            "May struggle with feelings of scarcity or never having 'enough'"
        ],
        keywords: ["Cautious", "Disciplined", "Conservative", "Security-focused", "Practical", "Value-conscious", "Methodical", "Frugal"],
        developmentTips: [
            "Balance financial caution with appropriate enjoyment of your resources",
            "Learn to spend on experiences and relationships that bring lasting value",
            "Use your financial wisdom to help others achieve security without being judgmental",
            "Practice gratitude for what you have while continuing to build for the future"
        ]
    },
    [House.Third]: {
        meaning: "Disciplined Communicator",
        shortDescription: "Your life lessons focus on developing disciplined communication and learning through structured, methodical study.",
        detailedDescription: "With Saturn in the 3rd House, your major life lessons involve developing disciplined, structured communication and learning through methodical study and practice. You may have faced early challenges with learning, communication, or relationships with siblings that taught you the value of persistence and careful preparation. Your communication style is serious, well-prepared, and authoritative. You prefer depth over breadth in learning and may become an expert in specific subjects through years of dedicated study.",
        lifeAreaFocus: "Life lessons in disciplined communication and structured learning",
        manifestation: [
            "Serious, well-prepared communication style with authoritative knowledge",
            "Learning approach that favors depth over breadth through methodical study",
            "Life lessons about persistence and preparation through early communication challenges",
            "Expertise developed in specific subjects through years of dedicated study"
        ],
        opportunities: [
            "Excel in teaching, writing, research, or fields requiring detailed knowledge",
            "Become a respected authority in your area of expertise through disciplined study",
            "Use your methodical communication to help others learn complex subjects",
            "Build lasting knowledge and skills through persistent, structured learning"
        ],
        challenges: [
            "May be overly serious or rigid in communication, lacking spontaneity",
            "Tendency to be overly critical of your own or others' communication abilities",
            "Difficulty with casual conversation or light, playful communication",
            "May struggle with learning disabilities or feel like a 'slow learner'"
        ],
        keywords: ["Methodical", "Serious", "Authoritative", "Structured", "Persistent", "Expert", "Disciplined", "Thorough"],
        developmentTips: [
            "Balance serious communication with humor and lightness when appropriate",
            "Use your expertise to teach and help others without being overly critical",
            "Practice patience with your own learning process and celebrate progress",
            "Develop confidence in your communication abilities through preparation and practice"
        ]
    },
    [House.Fourth]: {
        meaning: "Foundation Builder",
        shortDescription: "Your life lessons focus on building emotional security and creating lasting family foundations through responsibility.",
        detailedDescription: "With Saturn in the 4th House, your major life lessons involve building emotional security and creating lasting foundations for yourself and your family. You may have experienced a restrictive or challenging home environment that taught you the importance of creating your own security and stability. Your approach to family and home is responsible, traditional, and focused on building something that will last. You may become the family patriarch or matriarch who provides structure and stability for others.",
        lifeAreaFocus: "Life lessons in building emotional security and family foundations",
        manifestation: [
            "Responsible, traditional approach to family and home focused on lasting stability",
            "Role as family patriarch or matriarch who provides structure for others",
            "Life lessons about creating security through challenging early home experiences",
            "Focus on building emotional foundations that will support future generations"
        ],
        opportunities: [
            "Excel in real estate, family counseling, or building lasting family legacies",
            "Create a stable, secure home environment that nurtures and supports others",
            "Use your understanding of family dynamics to help others heal and grow",
            "Become a source of wisdom and stability for your family and community"
        ],
        challenges: [
            "May be overly controlling or rigid about family traditions and expectations",
            "Tendency to carry family burdens or feel responsible for everyone's problems",
            "Difficulty expressing emotions or being vulnerable with family members",
            "May struggle with depression or feelings of emotional isolation"
        ],
        keywords: ["Responsible", "Traditional", "Stable", "Foundational", "Protective", "Structured", "Enduring", "Patriarchal"],
        developmentTips: [
            "Balance family responsibility with allowing others to grow and make mistakes",
            "Practice emotional vulnerability and openness with trusted family members",
            "Use your stability to support others without trying to control their choices",
            "Create family traditions that honor both structure and individual expression"
        ]
    },
    [House.Fifth]: {
        meaning: "Disciplined Creator",
        shortDescription: "Your life lessons focus on developing disciplined creativity and learning responsible approaches to joy and self-expression.",
        detailedDescription: "With Saturn in the 5th House, your major life lessons involve learning to express creativity and joy through discipline and structure. You may have faced restrictions or criticism around creative expression or play in early life, which taught you to approach these areas more seriously and methodically. Your creative work is often technically excellent and built to last. You may have a serious approach to romance and children, taking these responsibilities very seriously and learning important lessons through them.",
        lifeAreaFocus: "Life lessons in disciplined creativity and responsible joy",
        manifestation: [
            "Disciplined, methodical approach to creativity that produces lasting, excellent work",
            "Serious attitude toward romance and children with strong sense of responsibility",
            "Life lessons about expressing joy and creativity through early restrictions or criticism",
            "Technical excellence in creative pursuits developed through persistent practice"
        ],
        opportunities: [
            "Excel in creative fields that require technical skill and disciplined practice",
            "Build lasting creative works that stand the test of time",
            "Use your serious approach to help others develop their creative skills",
            "Become a master craftsperson or artist through years of dedicated practice"
        ],
        challenges: [
            "May be overly serious or critical about creative expression and play",
            "Tendency to restrict your own or others' joy and spontaneous expression",
            "Difficulty with playfulness, fun, or letting go of control in creative work",
            "May struggle with fertility issues or challenges related to children"
        ],
        keywords: ["Disciplined", "Technical", "Serious", "Masterful", "Responsible", "Structured", "Excellent", "Methodical"],
        developmentTips: [
            "Balance discipline in creativity with playfulness and spontaneous expression",
            "Allow yourself and others to make mistakes and learn through creative experimentation",
            "Use your technical skills to help others develop their creative abilities",
            "Practice finding joy in the process of creation, not just the final result"
        ]
    },
    [House.Sixth]: {
        meaning: "Master Craftsperson",
        shortDescription: "Your life lessons focus on developing mastery through work, service, and disciplined attention to health and daily routines.",
        detailedDescription: "With Saturn in the 6th House, your major life lessons involve developing mastery through work, service, and disciplined attention to health and daily routines. You approach work with great seriousness and dedication, often becoming an expert in your field through years of careful practice and attention to detail. You may face health challenges that teach you the importance of discipline in diet, exercise, and self-care. Your service to others is reliable, thorough, and built on genuine expertise.",
        lifeAreaFocus: "Life lessons in work mastery and disciplined health practices",
        manifestation: [
            "Serious dedication to work with expertise developed through careful practice",
            "Health challenges that teach importance of disciplined self-care routines",
            "Reliable, thorough service to others built on genuine expertise and skill",
            "Mastery achieved through attention to detail and persistent effort"
        ],
        opportunities: [
            "Excel in fields requiring expertise, precision, and long-term dedication",
            "Become a master craftsperson or expert who others turn to for reliable service",
            "Use your health experiences to help others develop better self-care practices",
            "Build a reputation for excellence and reliability in your chosen field"
        ],
        challenges: [
            "May be overly critical or perfectionist about work and health matters",
            "Tendency to overwork or neglect other life areas in pursuit of mastery",
            "Difficulty delegating or trusting others to maintain your standards",
            "May struggle with chronic health issues or excessive worry about health"
        ],
        keywords: ["Masterful", "Dedicated", "Precise", "Reliable", "Expert", "Disciplined", "Thorough", "Health-conscious"],
        developmentTips: [
            "Balance dedication to excellence with acceptance of 'good enough' in some areas",
            "Use your expertise to mentor others without being overly critical",
            "Practice self-compassion and patience with your own learning and health journey",
            "Remember that true mastery includes knowing when to rest and recharge"
        ]
    },
    [House.Seventh]: {
        meaning: "Committed Partner",
        shortDescription: "Your life lessons focus on learning commitment, responsibility, and building lasting partnerships through challenges.",
        detailedDescription: "With Saturn in the 7th House, your major life lessons involve learning commitment, responsibility, and how to build lasting partnerships through working through challenges together. You may face delays or obstacles in marriage and partnerships, but these experiences teach you the value of commitment and working through difficulties. Your approach to relationships is serious, loyal, and focused on building something that will endure. You often attract older or more mature partners, or partners who teach you important life lessons.",
        lifeAreaFocus: "Life lessons in commitment and building lasting partnerships",
        manifestation: [
            "Serious, loyal approach to relationships focused on building lasting partnerships",
            "Delays or obstacles in marriage that teach the value of commitment and perseverance",
            "Attraction to older, mature partners or those who provide important life lessons",
            "Relationships that involve working through challenges and growing together"
        ],
        opportunities: [
            "Excel in counseling, mediation, or helping others build strong relationships",
            "Build deeply committed, lasting partnerships based on mutual growth and respect",
            "Use your relationship experiences to help others navigate partnership challenges",
            "Become a model of commitment and loyalty in your personal and professional relationships"
        ],
        challenges: [
            "May be overly serious or demanding in relationships, lacking spontaneity",
            "Tendency to stay in relationships too long out of duty rather than love",
            "Difficulty with emotional vulnerability or expressing affection freely",
            "May attract partners who are cold, distant, or overly critical"
        ],
        keywords: ["Committed", "Loyal", "Serious", "Enduring", "Responsible", "Mature", "Challenging", "Growth-oriented"],
        developmentTips: [
            "Balance commitment and loyalty with healthy boundaries and self-care",
            "Practice emotional vulnerability and warmth alongside your natural loyalty",
            "Choose partners who support your growth rather than just providing lessons",
            "Use your understanding of commitment to help others build healthy relationships"
        ]
    },
    [House.Eighth]: {
        meaning: "Transformation Master",
        shortDescription: "Your life lessons focus on mastering transformation, shared resources, and learning deep psychological wisdom through challenges.",
        detailedDescription: "With Saturn in the 8th House, your major life lessons involve mastering transformation, managing shared resources responsibly, and developing deep psychological wisdom through intense life experiences. You may face significant challenges related to death, taxes, shared money, or psychological crises that force you to develop inner strength and resilience. Your approach to transformation is methodical and thorough, and you often help others navigate their own deep changes and crises.",
        lifeAreaFocus: "Life lessons in transformation mastery and psychological wisdom",
        manifestation: [
            "Methodical, thorough approach to transformation and deep psychological work",
            "Challenges with shared resources that teach responsible financial management",
            "Development of inner strength and resilience through intense life experiences",
            "Ability to help others navigate transformation and crisis with wisdom"
        ],
        opportunities: [
            "Excel in psychology, crisis counseling, finance, or transformational healing work",
            "Develop expertise in managing shared resources, investments, or estate planning",
            "Use your transformational experiences to help others heal and grow",
            "Become a trusted guide for others facing major life transitions"
        ],
        challenges: [
            "May be overly controlling or fearful about shared resources and transformation",
            "Tendency to be secretive or overly private about personal struggles",
            "Difficulty trusting others with emotional or financial vulnerability",
            "May experience depression or become overly focused on life's darker aspects"
        ],
        keywords: ["Transformational", "Resilient", "Deep", "Methodical", "Wise", "Intense", "Responsible", "Healing"],
        developmentTips: [
            "Balance control with trust and healthy vulnerability in shared resources",
            "Use your transformational wisdom to help others while maintaining healthy boundaries",
            "Practice sharing your struggles and insights to help others feel less alone",
            "Remember that transformation includes both death and rebirth - embrace both aspects"
        ]
    },
    [House.Ninth]: {
        meaning: "Wisdom Builder",
        shortDescription: "Your life lessons focus on building genuine wisdom through disciplined study and testing your beliefs against reality.",
        detailedDescription: "With Saturn in the 9th House, your major life lessons involve building genuine wisdom through disciplined study, travel, and testing your beliefs and philosophies against real-world experience. You may face challenges or delays in higher education, but these experiences teach you to value knowledge that is practical and applicable. Your approach to philosophy and spirituality is serious, methodical, and based on personal experience rather than blind faith. You often become a respected teacher or authority in your field.",
        lifeAreaFocus: "Life lessons in building practical wisdom through disciplined study",
        manifestation: [
            "Serious, methodical approach to philosophy and spirituality based on experience",
            "Challenges in higher education that teach the value of practical, applicable knowledge",
            "Development of genuine wisdom through testing beliefs against real-world experience",
            "Respected authority status achieved through disciplined study and practical application"
        ],
        opportunities: [
            "Excel in higher education, law, publishing, or fields requiring deep expertise",
            "Become a respected teacher or authority who helps others develop practical wisdom",
            "Use your philosophical insights to help others navigate life's challenges",
            "Build expertise that combines theoretical knowledge with practical application"
        ],
        challenges: [
            "May be overly rigid or dogmatic about beliefs and philosophical systems",
            "Tendency to be overly critical of others' beliefs or educational achievements",
            "Difficulty with faith or trusting in things that can't be proven empirically",
            "May struggle with narrow-mindedness or resistance to new ideas"
        ],
        keywords: ["Wise", "Methodical", "Practical", "Experienced", "Authoritative", "Disciplined", "Realistic", "Grounded"],
        developmentTips: [
            "Balance practical wisdom with openness to new ideas and perspectives",
            "Use your knowledge to teach and help others without being dogmatic",
            "Practice humility and continue learning even as you develop expertise",
            "Ground your philosophical insights in compassionate service to others"
        ]
    },
    [House.Tenth]: {
        meaning: "Authority Builder",
        shortDescription: "Your life lessons focus on building lasting authority and reputation through disciplined effort and overcoming career challenges.",
        detailedDescription: "With Saturn in the 10th House, your major life lessons involve building lasting authority and reputation through disciplined effort, persistence, and overcoming significant career challenges. You may face delays, obstacles, or criticism in your professional life, but these experiences teach you to build success on solid foundations. Your approach to career is methodical, responsible, and focused on long-term achievement rather than quick success. You often achieve significant recognition later in life through sustained effort.",
        lifeAreaFocus: "Life lessons in building lasting professional authority and reputation",
        manifestation: [
            "Methodical, responsible approach to career focused on long-term achievement",
            "Delays and obstacles in professional life that teach persistence and solid foundation-building",
            "Authority and reputation built through disciplined effort and overcoming challenges",
            "Recognition and success achieved later in life through sustained, consistent effort"
        ],
        opportunities: [
            "Excel in leadership roles that require long-term planning and steady management",
            "Build a lasting professional legacy based on solid achievements and integrity",
            "Use your hard-earned authority to mentor others and create positive change",
            "Become a respected elder or authority figure in your field or community"
        ],
        challenges: [
            "May be overly ambitious or sacrifice personal relationships for career success",
            "Tendency to be overly critical of your own achievements or never feel 'successful enough'",
            "Difficulty with work-life balance or taking time for personal enjoyment",
            "May struggle with authority figures or feel burdened by leadership responsibilities"
        ],
        keywords: ["Authoritative", "Disciplined", "Persistent", "Responsible", "Ambitious", "Methodical", "Respected", "Enduring"],
        developmentTips: [
            "Balance career ambition with personal relationships and self-care",
            "Use your authority to lift others up and create opportunities for them",
            "Practice celebrating your achievements and recognizing your progress",
            "Remember that true leadership includes compassion and service to others"
        ]
    },
    [House.Eleventh]: {
        meaning: "Loyal Friend Builder",
        shortDescription: "Your life lessons focus on building lasting friendships and learning to work effectively within groups and organizations.",
        detailedDescription: "With Saturn in the 11th House, your major life lessons involve learning to build lasting friendships and work effectively within groups and organizations. You may have fewer friends than others, but the friendships you do build are deep, loyal, and enduring. You approach group activities and social causes with seriousness and dedication, often taking on leadership roles or organizational responsibilities. Your hopes and dreams are realistic and achieved through persistent effort rather than luck.",
        lifeAreaFocus: "Life lessons in building lasting friendships and effective group participation",
        manifestation: [
            "Fewer but deeper, more loyal and enduring friendships",
            "Serious, dedicated approach to group activities and social causes",
            "Leadership roles and organizational responsibilities within groups",
            "Realistic hopes and dreams achieved through persistent effort rather than luck"
        ],
        opportunities: [
            "Excel in organizational leadership, community building, or long-term social projects",
            "Build a network of loyal, reliable friends who support each other through challenges",
            "Use your organizational skills to help groups achieve their goals effectively",
            "Become a respected leader in causes or organizations that matter to you"
        ],
        challenges: [
            "May be overly serious or rigid in group settings, lacking social spontaneity",
            "Tendency to take on too much responsibility for group success or failure",
            "Difficulty with casual friendships or light social interactions",
            "May feel isolated or different from others in social situations"
        ],
        keywords: ["Loyal", "Organized", "Responsible", "Serious", "Dedicated", "Reliable", "Leadership", "Enduring"],
        developmentTips: [
            "Balance serious group commitment with lighter, more playful social interactions",
            "Practice sharing leadership responsibilities rather than carrying all the burden",
            "Use your loyalty and reliability to help others feel supported and valued",
            "Allow yourself to enjoy friendships without always feeling responsible for them"
        ]
    },
    [House.Twelfth]: {
        meaning: "Spiritual Disciplinarian",
        shortDescription: "Your life lessons focus on developing spiritual discipline and learning to serve others through structured, behind-the-scenes work.",
        detailedDescription: "With Saturn in the 12th House, your major life lessons involve developing spiritual discipline and learning to serve others through structured, methodical work that often goes unrecognized. You may face hidden challenges, chronic health issues, or periods of isolation that force you to develop inner strength and spiritual resources. Your approach to spirituality is practical and disciplined, and you often work behind the scenes to help institutions or causes that serve those in need.",
        lifeAreaFocus: "Life lessons in spiritual discipline and structured service to others",
        manifestation: [
            "Practical, disciplined approach to spirituality and inner development",
            "Hidden challenges that force development of inner strength and spiritual resources",
            "Behind-the-scenes work helping institutions or causes that serve those in need",
            "Service to others that is structured, methodical, and often unrecognized"
        ],
        opportunities: [
            "Excel in healing professions, institutional work, or spiritual service organizations",
            "Develop deep spiritual wisdom through disciplined practice and inner work",
            "Use your understanding of suffering to help others heal and find meaning",
            "Become a behind-the-scenes force for positive change in institutions or communities"
        ],
        challenges: [
            "May struggle with depression, isolation, or feelings of being misunderstood",
            "Tendency to be overly self-sacrificing or martyrlike in service to others",
            "Difficulty receiving recognition or appreciation for your contributions",
            "May carry hidden guilt, shame, or unresolved psychological issues"
        ],
        keywords: ["Spiritual", "Disciplined", "Service-oriented", "Hidden", "Methodical", "Healing", "Institutional", "Self-sacrificing"],
        developmentTips: [
            "Balance spiritual service with healthy self-care and boundary-setting",
            "Use your spiritual discipline to help others while honoring your own needs",
            "Practice accepting recognition and appreciation when it's offered",
            "Remember that healing yourself is also a form of service to the collective"
        ]
    }
};
// Uranus in Houses interpretations
export const URANUS_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Revolutionary Individual",
        shortDescription: "Your innovation and rebellion are central to your identity. You're naturally unique, independent, and ahead of your time.",
        detailedDescription: "With Uranus in the 1st House, your need for freedom, innovation, and rebellion is central to your identity and how others perceive you. You're naturally unique, independent, and often ahead of your time in your thinking and approach to life. Others see you as eccentric, original, or unconventional, and you may have an unusual appearance or style that sets you apart. You experience sudden changes in your personal direction and identity throughout life, constantly reinventing yourself and breaking free from others' expectations.",
        lifeAreaFocus: "Innovation and rebellion expressed through personal identity and independence",
        manifestation: [
            "Naturally unique, independent identity that others see as eccentric or original",
            "Unusual appearance or style that sets you apart from conventional norms",
            "Sudden changes in personal direction and constant self-reinvention throughout life",
            "Ahead-of-your-time thinking and approach to life that challenges expectations"
        ],
        opportunities: [
            "Excel in technology, innovation, social reform, or cutting-edge fields",
            "Use your unique perspective to pioneer new approaches and inspire change",
            "Become a leader in progressive movements or technological advancement",
            "Help others break free from limitations and embrace their authentic selves"
        ],
        challenges: [
            "May be seen as too radical, unpredictable, or difficult to understand",
            "Tendency to rebel against authority or reject helpful guidance",
            "Difficulty with consistency or following through on commitments",
            "May feel isolated or misunderstood due to your unconventional nature"
        ],
        keywords: ["Unique", "Independent", "Revolutionary", "Eccentric", "Original", "Unpredictable", "Progressive", "Innovative"],
        developmentTips: [
            "Balance your need for independence with meaningful connections to others",
            "Use your innovative gifts to create positive change rather than just rebel",
            "Practice patience with those who don't understand your unique perspective",
            "Channel your revolutionary energy into causes that serve the greater good"
        ]
    },
    [House.Second]: {
        meaning: "Financial Revolutionary",
        shortDescription: "Your innovation focuses on money and resources. You experience sudden financial changes and unconventional approaches to wealth.",
        detailedDescription: "With Uranus in the 2nd House, your approach to money, possessions, and values is innovative, unconventional, and subject to sudden changes. You may experience unexpected financial gains or losses throughout life, and your income sources are likely to be unusual or technology-related. Your values are progressive and you may reject traditional materialistic approaches in favor of more humanitarian or innovative ideals. You're drawn to new forms of currency, investment, or resource sharing.",
        lifeAreaFocus: "Innovation in financial matters and unconventional approaches to resources",
        manifestation: [
            "Unconventional, innovative approach to money and resource management",
            "Sudden, unexpected financial changes and unusual income sources throughout life",
            "Progressive values that reject traditional materialistic approaches",
            "Interest in new forms of currency, investment, or collaborative resource sharing"
        ],
        opportunities: [
            "Excel in cryptocurrency, technology investments, or innovative financial services",
            "Develop new approaches to wealth building that benefit communities",
            "Use financial innovation to support progressive causes and social change",
            "Pioneer new economic models or resource-sharing systems"
        ],
        challenges: [
            "May experience financial instability or unpredictable income patterns",
            "Tendency to make impulsive financial decisions or reject practical advice",
            "Difficulty with traditional budgeting or conservative financial planning",
            "May lose money through risky investments or technological speculation"
        ],
        keywords: ["Innovative", "Unpredictable", "Progressive", "Technological", "Unconventional", "Sudden", "Revolutionary", "Alternative"],
        developmentTips: [
            "Balance financial innovation with some traditional security measures",
            "Use your progressive values to create sustainable wealth-building strategies",
            "Practice patience and research before making major financial changes",
            "Channel your financial creativity into projects that benefit others"
        ]
    },
    [House.Third]: {
        meaning: "Communication Innovator",
        shortDescription: "Your innovation focuses on communication and learning. You have unique ideas and unconventional ways of sharing knowledge.",
        detailedDescription: "With Uranus in the 3rd House, your approach to communication, learning, and sharing information is innovative, unconventional, and often ahead of its time. You may have unique ideas that challenge conventional thinking, and you're drawn to new technologies or methods of communication. Your relationships with siblings and neighbors may be unusual or involve sudden changes. You learn in non-traditional ways and may be involved in revolutionary educational approaches or cutting-edge media.",
        lifeAreaFocus: "Innovation in communication, learning, and information sharing",
        manifestation: [
            "Innovative, unconventional approach to communication and information sharing",
            "Unique ideas that challenge conventional thinking and educational approaches",
            "Attraction to new communication technologies and revolutionary media methods",
            "Unusual relationships with siblings and neighbors involving sudden changes"
        ],
        opportunities: [
            "Excel in new media, technology communication, or innovative education",
            "Pioneer new methods of learning and information sharing",
            "Use communication skills to spread progressive ideas and inspire change",
            "Become a thought leader in emerging communication technologies"
        ],
        challenges: [
            "May be too radical or ahead of your time for others to understand",
            "Tendency to be impatient with traditional learning methods or slow thinkers",
            "Difficulty with routine communication tasks or conventional writing",
            "May experience sudden disruptions in local relationships or communication"
        ],
        keywords: ["Innovative", "Progressive", "Technological", "Unconventional", "Revolutionary", "Ahead-of-time", "Unique", "Disruptive"],
        developmentTips: [
            "Balance innovative communication with accessibility for your audience",
            "Use your unique ideas to help others expand their thinking gradually",
            "Practice patience with traditional learners while maintaining your progressive edge",
            "Channel your communication innovation into educational or social reform"
        ]
    },
    [House.Fourth]: {
        meaning: "Family Revolutionary",
        shortDescription: "Your innovation focuses on home and family. You create unconventional domestic arrangements and challenge family traditions.",
        detailedDescription: "With Uranus in the 4th House, your approach to home, family, and emotional security is unconventional and subject to sudden changes. You may come from an unusual family background or create non-traditional family arrangements yourself. Your home environment is likely to be unique, technologically advanced, or frequently changing. You challenge family traditions and may experience sudden moves, family disruptions, or unexpected changes in your living situation throughout life.",
        lifeAreaFocus: "Innovation in home life and revolutionary approaches to family",
        manifestation: [
            "Unconventional family background or creation of non-traditional family arrangements",
            "Unique, technologically advanced, or frequently changing home environment",
            "Challenge to family traditions and conventional domestic expectations",
            "Sudden moves, family disruptions, or unexpected changes in living situations"
        ],
        opportunities: [
            "Excel in alternative housing, smart home technology, or family counseling",
            "Create innovative family structures that serve as models for others",
            "Use your unique family experiences to help others embrace change",
            "Pioneer new approaches to domestic life and emotional security"
        ],
        challenges: [
            "May experience family instability or difficulty creating lasting roots",
            "Tendency to rebel against family expectations even when they're supportive",
            "Difficulty with traditional domestic responsibilities or routine home life",
            "May feel emotionally detached or struggle with conventional intimacy"
        ],
        keywords: ["Unconventional", "Changing", "Innovative", "Disruptive", "Progressive", "Technological", "Alternative", "Revolutionary"],
        developmentTips: [
            "Balance your need for change with some stability in family relationships",
            "Use your innovative family approaches to help others embrace diversity",
            "Practice emotional connection while maintaining your independence",
            "Create family traditions that honor both innovation and continuity"
        ]
    },
    [House.Fifth]: {
        meaning: "Creative Revolutionary",
        shortDescription: "Your innovation focuses on creativity and self-expression. You have unique artistic vision and unconventional approaches to joy.",
        detailedDescription: "With Uranus in the 5th House, your approach to creativity, romance, and self-expression is innovative, unconventional, and often shocking or surprising to others. Your artistic vision is unique and ahead of its time, and you may work with new technologies or experimental forms of creative expression. Your romantic relationships are likely to be unusual, sudden, or involve people from different backgrounds. You approach fun and entertainment in non-traditional ways and may inspire others to break free from conventional forms of joy.",
        lifeAreaFocus: "Innovation in creativity, romance, and joyful self-expression",
        manifestation: [
            "Unique, ahead-of-its-time artistic vision using new technologies or experimental forms",
            "Unusual, sudden romantic relationships often involving people from different backgrounds",
            "Non-traditional approaches to fun and entertainment that inspire others",
            "Creative expression that shocks, surprises, or challenges conventional artistic norms"
        ],
        opportunities: [
            "Excel in cutting-edge arts, digital creativity, or experimental entertainment",
            "Pioneer new forms of artistic expression that inspire social change",
            "Use creative platform to promote progressive values and innovation",
            "Become a trendsetter who helps others discover new forms of joy and expression"
        ],
        challenges: [
            "May be too avant-garde or shocking for mainstream acceptance",
            "Tendency to have unstable or unpredictable romantic relationships",
            "Difficulty with traditional creative disciplines or conventional artistic training",
            "May struggle with commitment in creative projects or romantic partnerships"
        ],
        keywords: ["Innovative", "Experimental", "Avant-garde", "Shocking", "Unique", "Progressive", "Unconventional", "Trendsetting"],
        developmentTips: [
            "Balance artistic innovation with accessibility to reach broader audiences",
            "Use your creative gifts to inspire positive change rather than just shock",
            "Practice commitment in relationships while maintaining your independence",
            "Channel your experimental nature into meaningful artistic or social projects"
        ]
    },
    [House.Sixth]: {
        meaning: "Work Revolutionary",
        shortDescription: "Your innovation focuses on work and health. You pioneer new approaches to service and unconventional wellness practices.",
        detailedDescription: "With Uranus in the 6th House, your approach to work, health, and daily routines is innovative, unconventional, and subject to sudden changes. You may work in technology, alternative healing, or cutting-edge fields, and your work environment is likely to be unusual or frequently changing. Your approach to health and wellness is progressive, and you may be drawn to alternative therapies, new technologies, or experimental treatments. You challenge traditional work structures and may pioneer new forms of service or employment.",
        lifeAreaFocus: "Innovation in work practices and revolutionary approaches to health",
        manifestation: [
            "Work in technology, alternative healing, or cutting-edge fields with unusual environments",
            "Progressive approach to health using alternative therapies and new technologies",
            "Challenge to traditional work structures and pioneering of new employment forms",
            "Sudden changes in work situations and experimental approaches to daily routines"
        ],
        opportunities: [
            "Excel in technology, alternative medicine, or innovative service industries",
            "Pioneer new work structures that benefit employees and society",
            "Use your health innovations to help others discover alternative wellness approaches",
            "Become a leader in workplace reform or progressive employment practices"
        ],
        challenges: [
            "May experience job instability or difficulty with traditional employment",
            "Tendency to rebel against workplace authority or reject helpful health advice",
            "Difficulty with routine work tasks or conventional health practices",
            "May experiment with health approaches that are risky or unproven"
        ],
        keywords: ["Innovative", "Progressive", "Alternative", "Technological", "Experimental", "Revolutionary", "Unconventional", "Cutting-edge"],
        developmentTips: [
            "Balance work innovation with some stability and practical considerations",
            "Use your progressive health approaches responsibly and with proper research",
            "Practice cooperation with traditional systems while maintaining your innovative edge",
            "Channel your work revolution into creating positive change for many people"
        ]
    },
    [House.Seventh]: {
        meaning: "Relationship Revolutionary",
        shortDescription: "Your innovation focuses on partnerships. You seek freedom in relationships and challenge conventional partnership models.",
        detailedDescription: "With Uranus in the 7th House, your approach to partnerships, marriage, and relationships is unconventional and focused on freedom and equality. You may attract unusual partners or have relationships that challenge social norms. Your partnerships are likely to involve sudden beginnings or endings, and you need significant independence within committed relationships. You may pioneer new forms of partnership or marriage that serve as models for others seeking more progressive relationship structures.",
        lifeAreaFocus: "Innovation in partnerships and revolutionary relationship structures",
        manifestation: [
            "Unconventional partnerships that challenge social norms and traditional expectations",
            "Attraction to unusual partners and relationships with sudden beginnings or endings",
            "Need for significant independence and equality within committed relationships",
            "Pioneering of new partnership forms that serve as models for progressive relationships"
        ],
        opportunities: [
            "Excel in relationship counseling, alternative partnership models, or social reform",
            "Build innovative partnerships that demonstrate new possibilities for relationships",
            "Use your relationship experiences to help others embrace more authentic connections",
            "Become a leader in promoting equality and freedom within partnerships"
        ],
        challenges: [
            "May have difficulty with commitment or traditional relationship expectations",
            "Tendency to attract partners who are unstable or emotionally unavailable",
            "Difficulty balancing independence with the intimacy required for partnership",
            "May experience sudden relationship changes or unexpected partnership endings"
        ],
        keywords: ["Unconventional", "Independent", "Equal", "Progressive", "Revolutionary", "Sudden", "Innovative", "Free"],
        developmentTips: [
            "Balance your need for freedom with the commitment required for lasting partnerships",
            "Choose partners who support your independence while sharing your progressive values",
            "Use your relationship innovations to help others create more authentic connections",
            "Practice patience and communication to work through partnership challenges"
        ]
    },
    [House.Eighth]: {
        meaning: "Transformation Revolutionary",
        shortDescription: "Your innovation focuses on transformation and shared resources. You pioneer new approaches to psychology and regeneration.",
        detailedDescription: "With Uranus in the 8th House, your approach to transformation, shared resources, and deep psychological work is innovative and revolutionary. You may experience sudden, unexpected changes in shared finances or inheritances, and your approach to sexuality and intimacy is unconventional. You're drawn to cutting-edge psychology, alternative healing, or new technologies for transformation. You may pioneer new approaches to death, rebirth, and regeneration that help others navigate major life transitions.",
        lifeAreaFocus: "Innovation in transformation and revolutionary approaches to shared resources",
        manifestation: [
            "Sudden, unexpected changes in shared finances, inheritances, or joint resources",
            "Unconventional approach to sexuality, intimacy, and deep psychological work",
            "Attraction to cutting-edge psychology, alternative healing, and transformation technologies",
            "Pioneering of new approaches to death, rebirth, and major life transitions"
        ],
        opportunities: [
            "Excel in psychology, alternative healing, financial innovation, or crisis management",
            "Pioneer new therapeutic approaches that help others heal and transform",
            "Use your transformation experiences to guide others through major life changes",
            "Become a leader in innovative approaches to shared resources and regeneration"
        ],
        challenges: [
            "May experience financial instability or sudden losses in shared resources",
            "Tendency to be too experimental or risky in intimate or financial matters",
            "Difficulty with traditional approaches to psychology or transformation",
            "May attract unstable partners or experience sudden relationship crises"
        ],
        keywords: ["Revolutionary", "Transformational", "Innovative", "Sudden", "Experimental", "Progressive", "Regenerative", "Cutting-edge"],
        developmentTips: [
            "Balance experimental approaches with proven methods for transformation",
            "Use your innovative insights to help others while maintaining healthy boundaries",
            "Practice financial responsibility while exploring new resource-sharing models",
            "Channel your transformational gifts into healing work that serves others"
        ]
    },
    [House.Ninth]: {
        meaning: "Philosophical Revolutionary",
        shortDescription: "Your innovation focuses on beliefs and higher learning. You challenge conventional wisdom and pioneer new philosophies.",
        detailedDescription: "With Uranus in the 9th House, your approach to philosophy, higher learning, and spiritual beliefs is innovative and revolutionary. You challenge conventional wisdom and may develop unique philosophical or spiritual systems that are ahead of their time. Your approach to education is non-traditional, and you may be involved in alternative learning methods or cutting-edge academic fields. Travel and exposure to different cultures inspire sudden insights and revolutionary changes in your worldview.",
        lifeAreaFocus: "Innovation in philosophy and revolutionary approaches to higher learning",
        manifestation: [
            "Challenge to conventional wisdom and development of unique philosophical systems",
            "Non-traditional approach to education and involvement in cutting-edge academic fields",
            "Revolutionary changes in worldview inspired by travel and cultural exposure",
            "Pioneering of new spiritual or philosophical approaches that are ahead of their time"
        ],
        opportunities: [
            "Excel in alternative education, progressive philosophy, or innovative spiritual teaching",
            "Pioneer new approaches to higher learning that serve diverse populations",
            "Use your philosophical innovations to inspire social and spiritual reform",
            "Become a thought leader who helps others expand their consciousness and beliefs"
        ],
        challenges: [
            "May be too radical or ahead of your time for others to accept your ideas",
            "Tendency to reject all traditional wisdom in favor of untested new approaches",
            "Difficulty with conventional educational systems or traditional spiritual practices",
            "May experience sudden changes in beliefs that disrupt your sense of meaning"
        ],
        keywords: ["Revolutionary", "Innovative", "Progressive", "Unconventional", "Ahead-of-time", "Philosophical", "Experimental", "Visionary"],
        developmentTips: [
            "Balance innovative thinking with respect for valuable traditional wisdom",
            "Use your philosophical gifts to bridge old and new approaches to learning",
            "Practice patience when sharing revolutionary ideas with more conservative thinkers",
            "Ground your philosophical innovations in practical applications that help others"
        ]
    },
    [House.Tenth]: {
        meaning: "Career Revolutionary",
        shortDescription: "Your innovation focuses on career and public image. You pioneer new professional approaches and challenge authority structures.",
        detailedDescription: "With Uranus in the 10th House, your approach to career, public image, and authority is innovative and revolutionary. You may work in cutting-edge fields, technology, or social reform, and your professional path is likely to involve sudden changes and unconventional choices. You challenge traditional authority structures and may become known for your progressive ideas or rebellious stance. Your public reputation is associated with innovation, independence, and being ahead of your time.",
        lifeAreaFocus: "Innovation in career and revolutionary approaches to authority and public image",
        manifestation: [
            "Work in cutting-edge fields with sudden career changes and unconventional professional choices",
            "Challenge to traditional authority structures and reputation for progressive ideas",
            "Public image associated with innovation, independence, and being ahead of your time",
            "Revolutionary approach to leadership that inspires others to embrace change"
        ],
        opportunities: [
            "Excel in technology, social reform, innovation, or progressive leadership roles",
            "Pioneer new professional approaches that benefit society and future generations",
            "Use your public platform to promote positive change and social progress",
            "Become a respected authority in emerging fields or revolutionary movements"
        ],
        challenges: [
            "May experience career instability or difficulty with traditional employment",
            "Tendency to rebel against authority even when cooperation would be beneficial",
            "Difficulty with conventional professional expectations or corporate structures",
            "May be seen as too radical or unpredictable for traditional leadership roles"
        ],
        keywords: ["Revolutionary", "Innovative", "Progressive", "Independent", "Unconventional", "Cutting-edge", "Rebellious", "Visionary"],
        developmentTips: [
            "Balance revolutionary ideals with practical strategies for creating change",
            "Use your innovative leadership to inspire others while building sustainable systems",
            "Practice working within existing structures while maintaining your progressive vision",
            "Channel your rebellious energy into positive reform rather than destructive opposition"
        ]
    },
    [House.Eleventh]: {
        meaning: "Social Revolutionary",
        shortDescription: "Your innovation focuses on friendships and social causes. You pioneer progressive movements and challenge social norms.",
        detailedDescription: "With Uranus in the 11th House, your approach to friendships, groups, and social causes is innovative and revolutionary. You're drawn to progressive movements and may be involved in social reform or humanitarian causes that are ahead of their time. Your friendships are likely to be unusual, diverse, or involve people from cutting-edge fields. You challenge social norms and may pioneer new forms of community or social organization that serve as models for future society.",
        lifeAreaFocus: "Innovation in social causes and revolutionary approaches to community",
        manifestation: [
            "Involvement in progressive movements and social reform that are ahead of their time",
            "Unusual, diverse friendships often involving people from cutting-edge fields",
            "Challenge to social norms and pioneering of new forms of community organization",
            "Revolutionary approach to humanitarian causes that inspires widespread change"
        ],
        opportunities: [
            "Excel in social reform, technology, humanitarian causes, or progressive community building",
            "Pioneer new forms of social organization that benefit future generations",
            "Use your social influence to promote equality, innovation, and positive change",
            "Become a leader in movements that transform society for the better"
        ],
        challenges: [
            "May be too radical or ahead of your time for mainstream social acceptance",
            "Tendency to reject all traditional social structures in favor of untested alternatives",
            "Difficulty maintaining stable friendships due to constantly changing social circles",
            "May become isolated due to your unconventional social and political views"
        ],
        keywords: ["Revolutionary", "Progressive", "Humanitarian", "Innovative", "Social", "Unconventional", "Reformist", "Visionary"],
        developmentTips: [
            "Balance revolutionary social ideals with practical strategies for creating change",
            "Use your progressive vision to build bridges between different social groups",
            "Practice patience when working with others who don't share your advanced thinking",
            "Channel your social innovation into movements that create lasting positive impact"
        ]
    },
    [House.Twelfth]: {
        meaning: "Spiritual Revolutionary",
        shortDescription: "Your innovation focuses on spirituality and service. You pioneer new approaches to transcendence and collective healing.",
        detailedDescription: "With Uranus in the 12th House, your approach to spirituality, service, and connection to the collective unconscious is innovative and revolutionary. You may have sudden spiritual awakenings or insights that change your understanding of reality. Your service to others is unconventional and may involve new technologies, alternative healing, or progressive approaches to helping those in need. You pioneer new forms of spiritual practice or collective healing that serve the evolution of human consciousness.",
        lifeAreaFocus: "Innovation in spirituality and revolutionary approaches to collective service",
        manifestation: [
            "Sudden spiritual awakenings or insights that revolutionize understanding of reality",
            "Unconventional service involving new technologies or alternative healing approaches",
            "Pioneering of new spiritual practices or collective healing methods",
            "Revolutionary contribution to the evolution of human consciousness and collective healing"
        ],
        opportunities: [
            "Excel in alternative healing, spiritual innovation, or progressive service organizations",
            "Pioneer new approaches to spirituality that help others awaken and evolve",
            "Use your spiritual insights to create healing technologies or methods",
            "Become a bridge between ancient wisdom and future spiritual evolution"
        ],
        challenges: [
            "May experience spiritual confusion or difficulty grounding mystical insights",
            "Tendency to reject all traditional spiritual practices in favor of untested methods",
            "Difficulty with conventional service work or traditional charitable organizations",
            "May feel isolated or misunderstood due to your advanced spiritual insights"
        ],
        keywords: ["Revolutionary", "Spiritual", "Innovative", "Mystical", "Progressive", "Healing", "Collective", "Transcendent"],
        developmentTips: [
            "Balance spiritual innovation with grounding in practical service to others",
            "Use your mystical insights to help others while maintaining healthy boundaries",
            "Practice integrating ancient wisdom with your revolutionary spiritual approaches",
            "Channel your spiritual gifts into healing work that serves the collective evolution"
        ]
    }
};
// Neptune in Houses interpretations
export const NEPTUNE_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Mystical Dreamer",
        shortDescription: "Your spiritual and creative nature is central to your identity. You're naturally intuitive, compassionate, and otherworldly.",
        detailedDescription: "With Neptune in the 1st House, your spiritual, intuitive, and creative nature is central to your identity and how others perceive you. You have a naturally compassionate, empathetic personality and may appear ethereal, mystical, or otherworldly to others. Your identity is fluid and may change like the tides, and you're highly sensitive to your environment and the emotions of others. You may have psychic abilities or a strong connection to the spiritual realm, but you might also struggle with boundaries and knowing where you end and others begin.",
        lifeAreaFocus: "Spiritual and creative identity with intuitive, compassionate self-expression",
        manifestation: [
            "Naturally compassionate, empathetic personality that appears ethereal or mystical",
            "Fluid identity that changes like tides with high sensitivity to environment",
            "Psychic abilities or strong spiritual connection affecting personal expression",
            "Struggle with boundaries and difficulty distinguishing self from others"
        ],
        opportunities: [
            "Excel in healing arts, spiritual counseling, creative arts, or compassionate service",
            "Use your intuitive gifts to help others heal and find spiritual connection",
            "Develop artistic or creative talents that inspire and uplift others",
            "Become a channel for divine love and healing energy in the world"
        ],
        challenges: [
            "May struggle with unclear identity or difficulty asserting personal boundaries",
            "Tendency to be overly impressionable or influenced by others' emotions",
            "Difficulty with practical matters or grounding spiritual insights in reality",
            "May escape into fantasy or avoid dealing with harsh realities"
        ],
        keywords: ["Mystical", "Intuitive", "Compassionate", "Ethereal", "Sensitive", "Spiritual", "Fluid", "Empathetic"],
        developmentTips: [
            "Practice grounding techniques to balance your spiritual sensitivity with practical life",
            "Develop healthy boundaries while maintaining your compassionate, open nature",
            "Use your intuitive gifts in service to others while protecting your own energy",
            "Channel your mystical nature into creative or healing work that serves others"
        ]
    },
    [House.Second]: {
        meaning: "Spiritual Values",
        shortDescription: "Your approach to money and possessions is idealistic and spiritual. You value compassion over material wealth.",
        detailedDescription: "With Neptune in the 2nd House, your approach to money, possessions, and values is idealistic, spiritual, and often impractical. You may have difficulty with money management or be prone to financial deception or confusion. Your values are based on compassion, spirituality, and service rather than material accumulation. You may give away money or possessions freely, sometimes to your own detriment. Your relationship with material resources is complex and may involve learning to balance spiritual ideals with practical needs.",
        lifeAreaFocus: "Spiritual approach to resources with idealistic values over material wealth",
        manifestation: [
            "Idealistic, spiritual approach to money often lacking practical management skills",
            "Values based on compassion and service rather than material accumulation",
            "Tendency to give away resources freely, sometimes to personal detriment",
            "Complex relationship with material wealth involving spiritual vs. practical balance"
        ],
        opportunities: [
            "Excel in charitable work, spiritual counseling, or service-oriented businesses",
            "Use your generous nature to help others while learning practical money management",
            "Develop businesses or work that aligns with your spiritual values",
            "Become a model of how to live abundantly while serving others"
        ],
        challenges: [
            "May struggle with financial confusion, deception, or impractical money decisions",
            "Tendency to be overly generous or naive about financial matters",
            "Difficulty valuing your own worth or charging appropriately for services",
            "May attract financial situations that involve confusion or deception"
        ],
        keywords: ["Idealistic", "Spiritual", "Generous", "Impractical", "Compassionate", "Confused", "Service-oriented", "Selfless"],
        developmentTips: [
            "Learn practical money management skills while maintaining your generous spirit",
            "Set healthy financial boundaries and learn to value your own worth",
            "Seek advice from trusted, practical people about financial decisions",
            "Channel your spiritual values into sustainable ways of earning and giving"
        ]
    },
    [House.Third]: {
        meaning: "Intuitive Communicator",
        shortDescription: "Your communication is intuitive and inspired. You share wisdom through creative, spiritual, or artistic expression.",
        detailedDescription: "With Neptune in the 3rd House, your communication style is intuitive, inspired, and often poetic or artistic. You may receive information through dreams, meditation, or psychic impressions, and you have a gift for communicating spiritual or creative concepts. Your relationships with siblings and neighbors may be idealized or involve some confusion or sacrifice. You learn through inspiration and intuition rather than logical analysis, and you may be drawn to mystical or spiritual studies.",
        lifeAreaFocus: "Intuitive communication and inspired learning through spiritual channels",
        manifestation: [
            "Intuitive, inspired communication style that is often poetic or artistic",
            "Reception of information through dreams, meditation, or psychic impressions",
            "Idealized or confusing relationships with siblings and neighbors",
            "Learning through inspiration and intuition rather than logical analysis"
        ],
        opportunities: [
            "Excel in creative writing, spiritual teaching, poetry, or inspired communication",
            "Use your intuitive gifts to help others understand spiritual or creative concepts",
            "Develop your psychic or mediumistic abilities for healing and guidance",
            "Become a bridge between the spiritual and material worlds through communication"
        ],
        challenges: [
            "May struggle with unclear communication or difficulty expressing practical ideas",
            "Tendency to be vague, confused, or overly idealistic in daily interactions",
            "Difficulty with factual learning or subjects requiring logical analysis",
            "May experience deception or confusion in local relationships or communication"
        ],
        keywords: ["Intuitive", "Inspired", "Poetic", "Mystical", "Vague", "Psychic", "Creative", "Spiritual"],
        developmentTips: [
            "Practice grounding your intuitive insights in clear, practical communication",
            "Use your inspired communication gifts to teach and heal others",
            "Balance mystical learning with practical skills and factual knowledge",
            "Develop discernment to distinguish between true inspiration and wishful thinking"
        ]
    },
    [House.Fourth]: {
        meaning: "Spiritual Sanctuary",
        shortDescription: "Your home and family life are deeply spiritual. You create a sanctuary of peace, healing, and emotional refuge.",
        detailedDescription: "With Neptune in the 4th House, your home and family life are deeply spiritual, emotional, and may involve some idealization or confusion. Your home is likely to be a sanctuary of peace and healing, and you may be drawn to living near water or in places with spiritual significance. Your family background may include spiritual or artistic influences, or there may be some mystery or confusion about family history. You have strong psychic connections to your ancestors and may serve as the family healer or spiritual guide.",
        lifeAreaFocus: "Spiritual home environment and deeply emotional family connections",
        manifestation: [
            "Home as sanctuary of peace and healing, often near water or spiritually significant places",
            "Family background with spiritual or artistic influences, possibly mysterious elements",
            "Strong psychic connections to ancestors and role as family healer",
            "Deep emotional and spiritual approach to creating domestic security"
        ],
        opportunities: [
            "Excel in creating healing home environments, family counseling, or ancestral work",
            "Use your home as a place of refuge and healing for family and friends",
            "Develop your connection to ancestral wisdom and family healing traditions",
            "Become a source of spiritual guidance and emotional support for your family"
        ],
        challenges: [
            "May idealize family members or have unrealistic expectations about home life",
            "Tendency to absorb family emotions or carry ancestral wounds",
            "Difficulty with practical home management or clear family boundaries",
            "May experience confusion or deception related to family or property matters"
        ],
        keywords: ["Spiritual", "Healing", "Sanctuary", "Emotional", "Psychic", "Ancestral", "Idealized", "Mystical"],
        developmentTips: [
            "Create healthy emotional boundaries while maintaining your healing presence",
            "Use your spiritual gifts to help family heal while protecting your own energy",
            "Balance idealistic family expectations with acceptance of human imperfections",
            "Ground your ancestral connections in practical family service and support"
        ]
    },
    [House.Fifth]: {
        meaning: "Divine Creative",
        shortDescription: "Your creativity and self-expression are divinely inspired. You channel spiritual energy through art, romance, and joy.",
        detailedDescription: "With Neptune in the 5th House, your creativity and self-expression are divinely inspired and deeply spiritual. You may have exceptional artistic talents and the ability to channel spiritual energy through creative work. Your approach to romance is idealistic and you may seek a soulmate connection or spiritual union. Children play an important spiritual role in your life, and you may have a special gift for working with or understanding children. Your creative work often serves to heal, inspire, or uplift others.",
        lifeAreaFocus: "Divinely inspired creativity and spiritual approach to romance and joy",
        manifestation: [
            "Exceptional artistic talents with ability to channel spiritual energy through creativity",
            "Idealistic approach to romance seeking soulmate or spiritual union",
            "Special spiritual connection with children and gift for understanding them",
            "Creative work that serves to heal, inspire, and uplift others"
        ],
        opportunities: [
            "Excel in inspired arts, spiritual creativity, or working with children in healing ways",
            "Use your creative gifts to channel divine energy and inspire others",
            "Develop romantic relationships based on spiritual connection and mutual growth",
            "Become an artist or creative whose work touches souls and promotes healing"
        ],
        challenges: [
            "May have unrealistic expectations about romance or idealize partners",
            "Tendency to sacrifice practical considerations for creative or romantic ideals",
            "Difficulty with creative criticism or commercializing your artistic gifts",
            "May experience deception or confusion in romantic relationships"
        ],
        keywords: ["Inspired", "Artistic", "Idealistic", "Spiritual", "Romantic", "Healing", "Divine", "Creative"],
        developmentTips: [
            "Balance romantic idealism with realistic relationship expectations",
            "Use your creative gifts in service to others while maintaining practical considerations",
            "Practice discernment in romantic relationships to avoid deception or projection",
            "Channel your divine creativity into work that genuinely helps and heals others"
        ]
    },
    [House.Sixth]: {
        meaning: "Compassionate Healer",
        shortDescription: "Your work and service are deeply compassionate. You're drawn to healing, helping, and serving those in need.",
        detailedDescription: "With Neptune in the 6th House, your approach to work, health, and service is deeply compassionate and spiritually motivated. You're naturally drawn to healing professions or work that involves helping those who are suffering or marginalized. Your health may be sensitive and responsive to emotional and spiritual factors, and you may benefit from holistic or alternative healing approaches. You serve others with selfless devotion, but you need to be careful not to sacrifice your own well-being in the process.",
        lifeAreaFocus: "Compassionate service and holistic approach to work and health",
        manifestation: [
            "Natural attraction to healing professions or work helping suffering people",
            "Sensitive health that responds to emotional and spiritual factors",
            "Selfless devotion to serving others, sometimes at personal expense",
            "Benefit from holistic or alternative healing approaches to wellness"
        ],
        opportunities: [
            "Excel in healing arts, social work, spiritual counseling, or compassionate service",
            "Use your sensitivity to help others heal on emotional and spiritual levels",
            "Develop expertise in holistic health and alternative healing modalities",
            "Become a channel for healing energy and divine compassion in your work"
        ],
        challenges: [
            "May sacrifice your own health and well-being while serving others",
            "Tendency to absorb others' illnesses or emotional problems",
            "Difficulty with practical work tasks or maintaining professional boundaries",
            "May be prone to mysterious health issues or psychosomatic conditions"
        ],
        keywords: ["Compassionate", "Healing", "Sensitive", "Selfless", "Holistic", "Service-oriented", "Empathetic", "Spiritual"],
        developmentTips: [
            "Practice self-care and healthy boundaries while maintaining your compassionate service",
            "Use your healing sensitivity to help others while protecting your own energy",
            "Develop practical skills alongside your natural healing and spiritual gifts",
            "Remember that taking care of yourself is also a form of service to others"
        ]
    },
    [House.Seventh]: {
        meaning: "Soulmate Seeker",
        shortDescription: "Your partnerships are deeply spiritual and idealistic. You seek divine love and spiritual union with others.",
        detailedDescription: "With Neptune in the 7th House, your approach to partnerships and relationships is deeply spiritual, idealistic, and focused on finding divine love or spiritual union. You may idealize partners or seek relationships that transcend the ordinary, and you're drawn to compassionate, artistic, or spiritually-minded partners. Your relationships often involve some element of sacrifice, service, or spiritual growth. You may attract partners who need healing or who serve as spiritual teachers, but you need to be careful not to lose yourself in the relationship.",
        lifeAreaFocus: "Spiritual partnerships and idealistic approach to divine love",
        manifestation: [
            "Deeply spiritual, idealistic approach to relationships seeking divine love",
            "Attraction to compassionate, artistic, or spiritually-minded partners",
            "Relationships involving sacrifice, service, or mutual spiritual growth",
            "Tendency to idealize partners or seek transcendent romantic connections"
        ],
        opportunities: [
            "Excel in relationship counseling, spiritual partnerships, or healing relationships",
            "Build relationships based on mutual spiritual growth and divine love",
            "Use your compassionate nature to help others heal through relationship",
            "Become a model of how love can be a spiritual practice and path to growth"
        ],
        challenges: [
            "May idealize partners or have unrealistic expectations about relationships",
            "Tendency to attract partners who need healing or who are unavailable",
            "Difficulty maintaining individual identity within spiritual partnerships",
            "May experience deception, confusion, or sacrifice in relationships"
        ],
        keywords: ["Spiritual", "Idealistic", "Compassionate", "Sacrificing", "Divine", "Transcendent", "Healing", "Soulmate"],
        developmentTips: [
            "Balance spiritual idealism with realistic relationship expectations",
            "Choose partners who support your spiritual growth while maintaining healthy boundaries",
            "Practice discernment to avoid relationships based on projection or fantasy",
            "Use your capacity for divine love to heal and serve while honoring your own needs"
        ]
    },
    [House.Eighth]: {
        meaning: "Mystical Transformer",
        shortDescription: "Your transformation is deeply spiritual. You experience mystical death and rebirth through spiritual awakening.",
        detailedDescription: "With Neptune in the 8th House, your approach to transformation, shared resources, and deep psychological work is mystical and spiritually oriented. You may experience profound spiritual awakenings through crisis or loss, and you have natural psychic abilities related to death, rebirth, and the afterlife. Your relationship with shared resources may be confusing or involve spiritual or charitable purposes. You're drawn to mystical studies, meditation, and exploring the deeper mysteries of life and death.",
        lifeAreaFocus: "Mystical transformation and spiritual approach to death and rebirth",
        manifestation: [
            "Profound spiritual awakenings through crisis, loss, or transformational experiences",
            "Natural psychic abilities related to death, rebirth, and afterlife communication",
            "Confusing relationship with shared resources, often involving spiritual purposes",
            "Deep attraction to mystical studies and exploration of life's deeper mysteries"
        ],
        opportunities: [
            "Excel in spiritual counseling, mediumship, hospice work, or transformational healing",
            "Use your psychic gifts to help others navigate death, loss, and transformation",
            "Develop expertise in mystical studies and spiritual approaches to healing",
            "Become a guide for others through spiritual awakening and transformation"
        ],
        challenges: [
            "May experience confusion or deception related to shared finances or resources",
            "Tendency to be overly idealistic about transformation or spiritual awakening",
            "Difficulty grounding mystical experiences in practical reality",
            "May be prone to spiritual bypassing or avoiding necessary psychological work"
        ],
        keywords: ["Mystical", "Transformational", "Psychic", "Spiritual", "Mysterious", "Transcendent", "Healing", "Otherworldly"],
        developmentTips: [
            "Ground your mystical experiences in practical service and healing work",
            "Use your psychic gifts responsibly to help others while maintaining healthy boundaries",
            "Balance spiritual transformation with necessary psychological and practical work",
            "Practice discernment to distinguish between genuine spiritual insight and fantasy"
        ]
    },
    [House.Ninth]: {
        meaning: "Spiritual Seeker",
        shortDescription: "Your philosophy and beliefs are deeply spiritual. You seek divine wisdom through mystical and transcendent experiences.",
        detailedDescription: "With Neptune in the 9th House, your approach to philosophy, higher learning, and spiritual beliefs is mystical, transcendent, and focused on direct spiritual experience. You may be drawn to Eastern philosophies, mystical traditions, or spiritual practices that emphasize meditation and inner knowing. Your search for truth is intuitive rather than intellectual, and you may receive spiritual teachings through dreams, visions, or mystical experiences. Travel may have spiritual significance and lead to profound insights about the nature of reality.",
        lifeAreaFocus: "Mystical philosophy and spiritual seeking through transcendent experiences",
        manifestation: [
            "Mystical, transcendent approach to philosophy emphasizing direct spiritual experience",
            "Attraction to Eastern philosophies, mystical traditions, and meditative practices",
            "Intuitive search for truth through dreams, visions, and mystical experiences",
            "Spiritually significant travel that leads to profound insights about reality"
        ],
        opportunities: [
            "Excel in spiritual teaching, mystical studies, or transcendent philosophy",
            "Use your spiritual insights to help others find meaning and connection to the divine",
            "Develop expertise in meditation, mystical practices, or spiritual counseling",
            "Become a bridge between different spiritual traditions and mystical experiences"
        ],
        challenges: [
            "May be overly idealistic or impractical about spiritual beliefs",
            "Tendency to reject intellectual learning in favor of only mystical experience",
            "Difficulty distinguishing between genuine spiritual insight and wishful thinking",
            "May be prone to spiritual confusion or following false teachers"
        ],
        keywords: ["Mystical", "Transcendent", "Spiritual", "Intuitive", "Visionary", "Idealistic", "Seeking", "Divine"],
        developmentTips: [
            "Balance mystical experience with practical application of spiritual wisdom",
            "Use discernment when choosing spiritual teachers and practices",
            "Ground your spiritual insights in service to others and practical wisdom",
            "Practice integrating mystical experiences with intellectual understanding"
        ]
    },
    [House.Tenth]: {
        meaning: "Spiritual Leader",
        shortDescription: "Your career and public image are spiritually oriented. You're known for your compassion, creativity, or spiritual service.",
        detailedDescription: "With Neptune in the 10th House, your career and public reputation are connected to spirituality, creativity, compassion, or service to others. You may work in healing arts, entertainment, spiritual counseling, or charitable organizations, and your public image is associated with inspiration, compassion, or artistic talent. Your career path may be unclear or involve several changes as you seek work that aligns with your spiritual values. You're called to serve the collective through your professional life.",
        lifeAreaFocus: "Spiritual career and compassionate public service",
        manifestation: [
            "Career in healing arts, entertainment, spiritual counseling, or charitable work",
            "Public image associated with inspiration, compassion, and artistic talent",
            "Unclear career path with changes as you seek spiritually aligned work",
            "Professional calling to serve the collective through compassionate leadership"
        ],
        opportunities: [
            "Excel in spiritual leadership, healing professions, or inspirational public service",
            "Use your public platform to promote compassion, healing, and spiritual values",
            "Develop a career that serves the collective good and promotes healing",
            "Become a respected spiritual leader or healer who inspires others"
        ],
        challenges: [
            "May struggle with unclear career direction or impractical professional goals",
            "Tendency to sacrifice material success for spiritual ideals",
            "Difficulty with professional boundaries or business aspects of spiritual work",
            "May experience confusion or deception in professional relationships"
        ],
        keywords: ["Spiritual", "Compassionate", "Inspirational", "Service-oriented", "Healing", "Artistic", "Idealistic", "Collective"],
        developmentTips: [
            "Balance spiritual ideals with practical career planning and business skills",
            "Use your compassionate leadership to create positive change in your field",
            "Develop professional boundaries while maintaining your service orientation",
            "Ground your spiritual calling in concrete ways to help and heal others"
        ]
    },
    [House.Eleventh]: {
        meaning: "Compassionate Visionary",
        shortDescription: "Your friendships and social causes are spiritually motivated. You work for humanitarian ideals and collective healing.",
        detailedDescription: "With Neptune in the 11th House, your approach to friendships, groups, and social causes is deeply compassionate and spiritually motivated. You're drawn to humanitarian causes and may work for the healing and upliftment of humanity as a whole. Your friendships are often based on spiritual connection or shared ideals, and you may attract friends who are artists, healers, or spiritually-minded people. Your hopes and dreams are focused on creating a more compassionate and spiritually-aware world.",
        lifeAreaFocus: "Compassionate social causes and spiritually motivated friendships",
        manifestation: [
            "Deep attraction to humanitarian causes and work for collective healing",
            "Friendships based on spiritual connection and shared compassionate ideals",
            "Social circles including artists, healers, and spiritually-minded people",
            "Hopes and dreams focused on creating a more compassionate world"
        ],
        opportunities: [
            "Excel in humanitarian work, spiritual community building, or collective healing",
            "Use your compassionate vision to inspire others to work for positive change",
            "Build networks of spiritually-minded people who support collective healing",
            "Become a leader in movements that promote compassion and spiritual awareness"
        ],
        challenges: [
            "May be overly idealistic about human nature or social causes",
            "Tendency to be disappointed when friends or groups don't live up to ideals",
            "Difficulty with practical aspects of organizing or leading social movements",
            "May attract friends who take advantage of your compassionate nature"
        ],
        keywords: ["Compassionate", "Humanitarian", "Idealistic", "Spiritual", "Collective", "Healing", "Visionary", "Service-oriented"],
        developmentTips: [
            "Balance compassionate idealism with realistic expectations about human nature",
            "Use your visionary gifts to inspire practical action for positive change",
            "Practice discernment in friendships while maintaining your open, loving nature",
            "Channel your humanitarian vision into concrete projects that help others"
        ]
    },
    [House.Twelfth]: {
        meaning: "Divine Channel",
        shortDescription: "Your spirituality is profound and mystical. You serve as a channel for divine love and healing energy.",
        detailedDescription: "With Neptune in the 12th House, your connection to spirituality, the unconscious, and the divine is profound and natural. This is Neptune's natural house, so its spiritual qualities are strongly expressed here. You may have exceptional psychic abilities, prophetic dreams, or the ability to channel divine energy for healing. Your service to others is often hidden or behind-the-scenes, and you may work in institutions or with those who are suffering. You're called to dissolve the boundaries between self and divine, serving as a channel for universal love and compassion.",
        lifeAreaFocus: "Profound spirituality and service as channel for divine love",
        manifestation: [
            "Exceptional psychic abilities, prophetic dreams, and divine channeling capacity",
            "Hidden or behind-the-scenes service often in institutions or with suffering people",
            "Natural dissolution of boundaries between self and divine consciousness",
            "Role as channel for universal love, compassion, and healing energy"
        ],
        opportunities: [
            "Excel in spiritual healing, psychic work, institutional service, or divine channeling",
            "Use your profound spiritual gifts to help others connect with the divine",
            "Develop your psychic abilities to serve as a healer and spiritual guide",
            "Become a pure channel for divine love and healing in the world"
        ],
        challenges: [
            "May struggle with boundaries between self and others or reality and fantasy",
            "Tendency to be overly self-sacrificing or lose yourself in service to others",
            "Difficulty grounding spiritual experiences in practical reality",
            "May be prone to spiritual confusion, escapism, or victim consciousness"
        ],
        keywords: ["Divine", "Mystical", "Psychic", "Channeling", "Selfless", "Transcendent", "Healing", "Boundaryless"],
        developmentTips: [
            "Practice grounding techniques to balance spiritual openness with practical life",
            "Use your divine connection to serve others while maintaining healthy boundaries",
            "Develop discernment to distinguish between genuine spiritual guidance and illusion",
            "Channel your mystical gifts into concrete healing work that serves the collective"
        ]
    }
};

// Pluto in Houses interpretations
export const PLUTO_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Powerful Transformer",
        shortDescription: "Your identity is intensely powerful and transformative. You have a magnetic presence that can deeply influence others.",
        detailedDescription: "With Pluto in the 1st House, your identity is intensely powerful, magnetic, and transformative. You have a penetrating gaze and presence that others find both compelling and intimidating. Your personality undergoes profound transformations throughout life, and you're not afraid to reinvent yourself completely when necessary. You have natural psychological insight and the ability to see through facades and pretenses. Your life purpose involves using your personal power to transform yourself and help others through their own metamorphoses.",
        lifeAreaFocus: "Powerful personal transformation and magnetic identity expression",
        manifestation: [
            "Intensely magnetic presence with penetrating gaze that compels and intimidates",
            "Profound personality transformations and complete self-reinvention throughout life",
            "Natural psychological insight with ability to see through facades",
            "Personal power used to transform self and help others through metamorphosis"
        ],
        opportunities: [
            "Excel in psychology, investigation, crisis counseling, or transformational leadership",
            "Use your magnetic presence to inspire deep change and healing in others",
            "Develop expertise in helping others through major life transitions",
            "Become a powerful agent of transformation and regeneration in your field"
        ],
        challenges: [
            "May come across as too intense, intimidating, or controlling",
            "Tendency to be obsessive about personal image or identity",
            "Difficulty with superficial relationships or small talk",
            "May struggle with power dynamics or being seen as threatening"
        ],
        keywords: ["Powerful", "Magnetic", "Transformative", "Intense", "Penetrating", "Regenerative", "Psychological", "Compelling"],
        developmentTips: [
            "Learn to modulate your intensity to make others more comfortable",
            "Use your transformative power to help rather than control others",
            "Practice vulnerability and openness to balance your natural intensity",
            "Channel your psychological insights into healing and helping professions"
        ]
    },
    [House.Second]: {
        meaning: "Resource Transformer",
        shortDescription: "Your approach to money and values involves deep transformation. You have power to create or destroy wealth.",
        detailedDescription: "With Pluto in the 2nd House, your relationship with money, possessions, and values undergoes profound transformations throughout life. You may experience extreme swings between wealth and poverty, learning important lessons about the true nature of security and value. You have the power to completely transform your financial situation and may be drawn to investments, shared resources, or regenerative business practices. Your values are deep and non-negotiable, and you're willing to sacrifice material comfort for what you believe in.",
        lifeAreaFocus: "Transformative approach to resources and deep, non-negotiable values",
        manifestation: [
            "Extreme swings between wealth and poverty with transformative financial lessons",
            "Power to completely transform financial situation through regenerative practices",
            "Attraction to investments, shared resources, and transformative business models",
            "Deep, non-negotiable values with willingness to sacrifice for beliefs"
        ],
        opportunities: [
            "Excel in investment banking, resource management, or transformative business ventures",
            "Use your understanding of value transformation to help others build wealth",
            "Develop expertise in crisis financial management or debt transformation",
            "Become a powerful force for economic regeneration and sustainable practices"
        ],
        challenges: [
            "May be obsessive about money or experience financial extremes",
            "Tendency to be all-or-nothing about possessions and material security",
            "Difficulty with moderate approaches to spending or saving",
            "May attract financial crises that force transformation"
        ],
        keywords: ["Transformative", "Extreme", "Powerful", "Regenerative", "Deep", "Obsessive", "Crisis", "Valuable"],
        developmentTips: [
            "Learn to find balance between financial extremes and develop steady practices",
            "Use your transformative power to help others overcome financial difficulties",
            "Practice moderation while honoring your deep values and beliefs",
            "Channel your intensity into sustainable wealth-building strategies"
        ]
    },
    [House.Third]: {
        meaning: "Mind Transformer",
        shortDescription: "Your communication and thinking are intensely powerful. You can transform minds and reveal hidden truths.",
        detailedDescription: "With Pluto in the 3rd House, your communication style is intensely powerful, penetrating, and transformative. You have the ability to get to the heart of any matter and reveal hidden truths through your words. Your relationships with siblings and neighbors may involve power dynamics or transformative experiences. You're drawn to deep, psychological subjects and may have a talent for research, investigation, or uncovering secrets. Your learning style is obsessive and thorough - you don't just learn subjects, you master them completely.",
        lifeAreaFocus: "Transformative communication and penetrating mental investigation",
        manifestation: [
            "Intensely powerful communication that penetrates to heart of matters",
            "Ability to reveal hidden truths and transform minds through words",
            "Relationships with siblings/neighbors involving power dynamics or transformation",
            "Obsessive, thorough learning style that achieves complete mastery"
        ],
        opportunities: [
            "Excel in investigative journalism, research, psychology, or transformative teaching",
            "Use your penetrating communication to help others understand deep truths",
            "Develop expertise in uncovering hidden information or solving mysteries",
            "Become a powerful voice for truth and transformation in your community"
        ],
        challenges: [
            "May be too intense or probing in everyday communication",
            "Tendency to be obsessive about information or become fixated on secrets",
            "Difficulty with light conversation or superficial social interactions",
            "May create power struggles through overly forceful communication"
        ],
        keywords: ["Penetrating", "Transformative", "Intense", "Investigative", "Powerful", "Obsessive", "Truth-revealing", "Deep"],
        developmentTips: [
            "Learn to balance intense communication with lighter social interaction",
            "Use your investigative gifts to serve truth and help others heal",
            "Practice listening as much as speaking to avoid overwhelming others",
            "Channel your mental intensity into research or teaching that serves others"
        ]
    },
    [House.Fourth]: {
        meaning: "Family Transformer",
        shortDescription: "Your home and family life involve deep transformation. You heal ancestral patterns and create powerful foundations.",
        detailedDescription: "With Pluto in the 4th House, your home and family life are areas of intense transformation and regeneration. You may come from a family with secrets, power dynamics, or traumatic experiences that require healing. Your relationship with your roots is complex and transformative, and you have the power to heal ancestral patterns and create a completely new family legacy. Your home is your sanctuary and power base, and you may be drawn to homes with history or that need complete renovation.",
        lifeAreaFocus: "Transformative family healing and powerful home foundation creation",
        manifestation: [
            "Family background with secrets, power dynamics, or traumatic experiences requiring healing",
            "Complex, transformative relationship with roots and ancestral patterns",
            "Power to heal family legacy and create completely new foundations",
            "Home as sanctuary and power base, often with history or needing renovation"
        ],
        opportunities: [
            "Excel in family therapy, ancestral healing, real estate transformation, or home renovation",
            "Use your understanding of family dynamics to help others heal generational trauma",
            "Develop expertise in creating powerful, healing home environments",
            "Become a force for family regeneration and breaking negative cycles"
        ],
        challenges: [
            "May be obsessed with family secrets or past traumas",
            "Tendency to be controlling about home environment or family dynamics",
            "Difficulty letting go of past hurts or family patterns",
            "May experience power struggles within family or about property"
        ],
        keywords: ["Transformative", "Healing", "Powerful", "Ancestral", "Regenerative", "Intense", "Foundational", "Secretive"],
        developmentTips: [
            "Focus on healing rather than dwelling on family trauma or secrets",
            "Use your transformative power to create positive family change",
            "Practice forgiveness while maintaining healthy boundaries with family",
            "Channel your intensity into creating a nurturing, powerful home environment"
        ]
    },
    [House.Fifth]: {
        meaning: "Creative Powerhouse",
        shortDescription: "Your creativity and self-expression are intensely powerful. You create transformative art and passionate relationships.",
        detailedDescription: "With Pluto in the 5th House, your creativity and self-expression are intensely powerful and transformative. Your artistic work has the ability to deeply move and transform others, often dealing with themes of death, rebirth, and psychological transformation. Your approach to romance is passionate and all-consuming, and you may experience intense love affairs that completely change you. Children play a transformative role in your life, and you may have a special gift for helping young people through difficult transitions.",
        lifeAreaFocus: "Powerful creative transformation and intense romantic expression",
        manifestation: [
            "Intensely powerful artistic work dealing with transformation and psychological themes",
            "Passionate, all-consuming approach to romance with transformative love affairs",
            "Children playing transformative role with gift for helping youth through transitions",
            "Creative expression that deeply moves and transforms others"
        ],
        opportunities: [
            "Excel in transformative arts, intense creative expression, or working with at-risk youth",
            "Use your creative power to help others process deep emotions and transformation",
            "Develop artistic work that addresses taboo subjects or promotes healing",
            "Become a powerful creative force that inspires regeneration and renewal"
        ],
        challenges: [
            "May be obsessive about creative projects or romantic relationships",
            "Tendency to be all-or-nothing about self-expression and artistic pursuits",
            "Difficulty with casual romance or light-hearted creative expression",
            "May experience intense creative blocks or romantic power struggles"
        ],
        keywords: ["Powerful", "Transformative", "Passionate", "Intense", "Creative", "Regenerative", "All-consuming", "Deep"],
        developmentTips: [
            "Balance intense creative passion with sustainable artistic practices",
            "Use your transformative creative gifts to heal and inspire others",
            "Practice healthy boundaries in romantic relationships while honoring passion",
            "Channel your creative intensity into work that serves transformation and healing"
        ]
    },
    [House.Sixth]: {
        meaning: "Work Transformer",
        shortDescription: "Your approach to work and health involves deep transformation. You heal through service and regenerate systems.",
        detailedDescription: "With Pluto in the 6th House, your approach to work, health, and service involves profound transformation and regeneration. You may be drawn to healing professions or work that involves helping others through crisis and transformation. Your health may undergo dramatic changes, teaching you important lessons about the mind-body connection and the power of regeneration. You have the ability to completely transform work environments and systems, often by addressing underlying problems that others prefer to ignore.",
        lifeAreaFocus: "Transformative work service and regenerative approach to health",
        manifestation: [
            "Attraction to healing professions or crisis intervention work",
            "Dramatic health changes teaching mind-body connection and regeneration",
            "Ability to transform work environments by addressing underlying problems",
            "Service approach that helps others through profound transformation"
        ],
        opportunities: [
            "Excel in crisis counseling, transformative healing, or system regeneration work",
            "Use your understanding of transformation to help others heal completely",
            "Develop expertise in addressing root causes rather than surface symptoms",
            "Become a powerful force for workplace transformation and healing"
        ],
        challenges: [
            "May be obsessive about work or health routines",
            "Tendency to be all-or-nothing about service or healing approaches",
            "Difficulty with moderate approaches to work-life balance",
            "May attract health or work crises that force transformation"
        ],
        keywords: ["Transformative", "Healing", "Regenerative", "Intense", "Crisis-oriented", "Powerful", "Systematic", "Deep"],
        developmentTips: [
            "Balance intense work dedication with self-care and regeneration",
            "Use your transformative gifts to help others heal at the deepest levels",
            "Practice moderation while maintaining your commitment to thorough healing",
            "Channel your intensity into sustainable service that creates lasting change"
        ]
    },
    [House.Seventh]: {
        meaning: "Relationship Transformer",
        shortDescription: "Your partnerships are intensely transformative. You experience powerful relationships that completely change you.",
        detailedDescription: "With Pluto in the 7th House, your partnerships and relationships are areas of intense transformation and regeneration. You attract powerful, magnetic partners who challenge you to grow and transform. Your relationships may involve power dynamics, jealousy, or control issues that require deep psychological work. You have the ability to help others transform through relationship, but you must learn to balance power and avoid becoming controlling or possessive. Your partnerships serve as mirrors for your own shadow work and personal transformation.",
        lifeAreaFocus: "Transformative partnerships and powerful relationship dynamics",
        manifestation: [
            "Attraction to powerful, magnetic partners who challenge growth and transformation",
            "Relationships involving power dynamics, jealousy, or control requiring psychological work",
            "Ability to help others transform through relationship while balancing power",
            "Partnerships serving as mirrors for shadow work and personal transformation"
        ],
        opportunities: [
            "Excel in relationship counseling, couples therapy, or transformative partnership work",
            "Use your understanding of relationship dynamics to help others heal",
            "Develop deep, transformative partnerships that promote mutual growth",
            "Become a powerful force for relationship healing and regeneration"
        ],
        challenges: [
            "May be controlling, possessive, or jealous in relationships",
            "Tendency to attract or create power struggles with partners",
            "Difficulty with casual or superficial relationships",
            "May experience intense relationship crises that force transformation"
        ],
        keywords: ["Transformative", "Powerful", "Intense", "Magnetic", "Controlling", "Regenerative", "Deep", "Challenging"],
        developmentTips: [
            "Practice healthy power sharing and avoid controlling behaviors in relationships",
            "Use relationship challenges as opportunities for mutual growth and healing",
            "Work on your own shadow issues to create healthier partnership dynamics",
            "Channel your transformative relationship gifts into helping others heal"
        ]
    },
    [House.Eighth]: {
        meaning: "Death-Rebirth Master",
        shortDescription: "Your transformation is profound and complete. You master the mysteries of death, rebirth, and regeneration.",
        detailedDescription: "With Pluto in the 8th House, you are a natural master of transformation, death, rebirth, and regeneration. This is Pluto's natural house, so its transformative powers are strongly expressed here. You may have profound experiences with death, crisis, or loss that completely transform your understanding of life. You have natural psychic abilities and may be drawn to occult studies, psychology, or work with shared resources. Your ability to help others through major life transitions and transformations is exceptional.",
        lifeAreaFocus: "Mastery of death-rebirth cycles and profound transformation",
        manifestation: [
            "Natural mastery of transformation with profound death-rebirth experiences",
            "Exceptional ability to help others through major life transitions",
            "Natural psychic abilities with attraction to occult studies and psychology",
            "Deep understanding of crisis, loss, and regeneration processes"
        ],
        opportunities: [
            "Excel in crisis counseling, hospice work, psychology, or occult studies",
            "Use your transformative mastery to guide others through profound change",
            "Develop expertise in shared resources, investments, or regenerative practices",
            "Become a powerful healer and guide for others' transformation processes"
        ],
        challenges: [
            "May be obsessed with death, crisis, or transformation",
            "Tendency to create or attract intense, dramatic situations",
            "Difficulty with surface-level interactions or avoiding deep work",
            "May struggle with the intensity of your own transformative experiences"
        ],
        keywords: ["Transformative", "Profound", "Regenerative", "Psychic", "Crisis-mastery", "Death-rebirth", "Intense", "Powerful"],
        developmentTips: [
            "Use your transformative mastery to serve others' healing and growth",
            "Balance intense transformation work with lighter, regenerative activities",
            "Practice grounding techniques to handle the intensity of your experiences",
            "Channel your crisis mastery into professional helping and healing work"
        ]
    },
    [House.Ninth]: {
        meaning: "Truth Transformer",
        shortDescription: "Your philosophy and beliefs undergo deep transformation. You seek ultimate truth and transformative wisdom.",
        detailedDescription: "With Pluto in the 9th House, your approach to philosophy, higher learning, and spiritual beliefs involves profound transformation and the search for ultimate truth. You may experience complete philosophical overhauls throughout life, abandoning old belief systems for deeper, more transformative understanding. Your search for truth is intense and uncompromising, and you're drawn to subjects that others find taboo or frightening. You may travel to places that transform your worldview or study with teachers who challenge your deepest assumptions.",
        lifeAreaFocus: "Transformative philosophy and intense search for ultimate truth",
        manifestation: [
            "Complete philosophical overhauls abandoning old beliefs for deeper understanding",
            "Intense, uncompromising search for truth drawn to taboo subjects",
            "Transformative travel experiences that completely change worldview",
            "Study with challenging teachers who transform deepest assumptions"
        ],
        opportunities: [
            "Excel in transformative teaching, philosophical research, or spiritual counseling",
            "Use your truth-seeking intensity to help others question limiting beliefs",
            "Develop expertise in subjects that promote deep transformation and healing",
            "Become a powerful teacher who helps others find their own truth"
        ],
        challenges: [
            "May be dogmatic or fanatical about beliefs and philosophical positions",
            "Tendency to be all-or-nothing about spiritual or educational pursuits",
            "Difficulty accepting different viewpoints or moderate positions",
            "May experience philosophical crises that completely upend worldview"
        ],
        keywords: ["Transformative", "Truth-seeking", "Intense", "Uncompromising", "Philosophical", "Deep", "Challenging", "Revolutionary"],
        developmentTips: [
            "Balance intense truth-seeking with openness to different perspectives",
            "Use your philosophical transformation to help others expand their understanding",
            "Practice humility while maintaining your commitment to deep truth",
            "Channel your transformative wisdom into teaching that serves others' growth"
        ]
    },
    [House.Tenth]: {
        meaning: "Power Leader",
        shortDescription: "Your career involves wielding significant power and authority. You transform systems and lead regeneration.",
        detailedDescription: "With Pluto in the 10th House, your career and public reputation involve wielding significant power and authority to transform systems and lead regeneration. You're drawn to positions where you can make profound changes and may work in fields involving crisis management, transformation, or regeneration. Your public image is powerful and magnetic, but you may also face public controversies or power struggles. Your professional purpose involves using your authority to create positive transformation in society.",
        lifeAreaFocus: "Powerful leadership and systematic transformation through career",
        manifestation: [
            "Career positions involving significant power to transform systems and lead regeneration",
            "Work in crisis management, transformation, or regenerative fields",
            "Powerful, magnetic public image with potential for controversies or power struggles",
            "Professional purpose using authority to create positive societal transformation"
        ],
        opportunities: [
            "Excel in executive leadership, crisis management, or transformative organizational work",
            "Use your positional power to create positive change and regeneration",
            "Develop expertise in leading others through major organizational transformations",
            "Become a powerful force for positive change in your industry or society"
        ],
        challenges: [
            "May be seen as too controlling, intimidating, or power-hungry",
            "Tendency to create or attract professional controversies or power struggles",
            "Difficulty with collaborative leadership or sharing authority",
            "May face public scandals or challenges to your reputation"
        ],
        keywords: ["Powerful", "Authoritative", "Transformative", "Magnetic", "Controversial", "Regenerative", "Systematic", "Influential"],
        developmentTips: [
            "Use your power responsibly to serve others rather than personal ambition",
            "Practice collaborative leadership while maintaining your transformative vision",
            "Stay grounded in ethical principles as you wield increasing authority",
            "Channel your powerful presence into creating positive systemic change"
        ]
    },
    [House.Eleventh]: {
        meaning: "Group Transformer",
        shortDescription: "Your friendships and social causes involve deep transformation. You revolutionize groups and collective consciousness.",
        detailedDescription: "With Pluto in the 11th House, your approach to friendships, groups, and social causes involves profound transformation and regeneration of collective consciousness. You're drawn to revolutionary causes and may work to transform society through group action. Your friendships are intense and transformative, and you may attract powerful allies who share your vision for change. Your hopes and dreams involve creating fundamental transformation in how humanity operates and relates to each other.",
        lifeAreaFocus: "Transformative group dynamics and revolutionary social change",
        manifestation: [
            "Attraction to revolutionary causes and transformation of society through group action",
            "Intense, transformative friendships with powerful allies sharing vision for change",
            "Hopes and dreams involving fundamental transformation of human consciousness",
            "Work to regenerate collective consciousness and social systems"
        ],
        opportunities: [
            "Excel in social activism, group transformation, or revolutionary leadership",
            "Use your transformative vision to inspire collective change and regeneration",
            "Develop powerful networks of change agents and transformative allies",
            "Become a force for positive revolution and collective consciousness evolution"
        ],
        challenges: [
            "May be too intense or radical for mainstream groups or friendships",
            "Tendency to be all-or-nothing about social causes or group involvement",
            "Difficulty with casual friendships or non-transformative social activities",
            "May create power struggles within groups or social movements"
        ],
        keywords: ["Revolutionary", "Transformative", "Intense", "Collective", "Powerful", "Regenerative", "Radical", "Visionary"],
        developmentTips: [
            "Balance revolutionary intensity with practical approaches to social change",
            "Use your transformative vision to unite rather than divide groups",
            "Practice patience while working for long-term collective transformation",
            "Channel your group transformation gifts into sustainable social change work"
        ]
    },
    [House.Twelfth]: {
        meaning: "Soul Transformer",
        shortDescription: "Your spirituality involves profound transformation of consciousness. You heal collective wounds and transform suffering.",
        detailedDescription: "With Pluto in the 12th House, your spiritual life and connection to the unconscious involve profound transformation and regeneration of consciousness itself. You may have powerful experiences with the collective unconscious and feel called to heal collective wounds and transform suffering. Your service to others is often hidden or behind-the-scenes, and you may work in institutions or with those who are marginalized. You have the power to transform consciousness itself and help others transcend their deepest fears and limitations.",
        lifeAreaFocus: "Profound consciousness transformation and healing of collective wounds",
        manifestation: [
            "Powerful experiences with collective unconscious and calling to heal collective wounds",
            "Hidden or behind-the-scenes service often in institutions or with marginalized people",
            "Power to transform consciousness itself and help others transcend limitations",
            "Deep spiritual transformation involving regeneration of consciousness"
        ],
        opportunities: [
            "Excel in depth psychology, spiritual healing, institutional transformation, or consciousness work",
            "Use your transformative spiritual gifts to heal collective trauma and suffering",
            "Develop expertise in helping others transcend their deepest fears and limitations",
            "Become a powerful agent of consciousness transformation and spiritual regeneration"
        ],
        challenges: [
            "May be overwhelmed by collective suffering or unconscious material",
            "Tendency to be self-sacrificing or lose yourself in service to others",
            "Difficulty grounding spiritual transformation in practical reality",
            "May struggle with your own shadow material or unconscious fears"
        ],
        keywords: ["Transformative", "Consciousness-changing", "Healing", "Collective", "Hidden", "Regenerative", "Spiritual", "Transcendent"],
        developmentTips: [
            "Practice self-care and boundaries while serving collective transformation",
            "Use your consciousness transformation gifts to help others heal and transcend",
            "Ground your spiritual work in practical service that creates real change",
            "Work with your own shadow material to become a clearer channel for transformation"
        ]
    }
};

// North Node in Houses interpretations
export const NORTH_NODE_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Soul Identity Development",
        shortDescription: "Your soul's growth involves developing authentic self-expression and leadership. You're learning to be confidently yourself.",
        detailedDescription: "With the North Node in the 1st House, your soul's evolutionary path involves developing authentic self-expression, personal confidence, and leadership abilities. You're learning to step into your own power and express your unique identity without depending on others for validation. This lifetime is about developing independence, self-reliance, and the courage to be authentically yourself. You may have spent past lives focusing on others' needs, and now you're called to prioritize your own growth and self-development.",
        lifeAreaFocus: "Authentic self-development and confident personal expression",
        manifestation: [
            "Learning to express authentic identity without seeking others' approval",
            "Developing personal confidence and natural leadership abilities",
            "Growing into independence and self-reliance in all life areas",
            "Stepping into personal power while maintaining healthy relationships"
        ],
        opportunities: [
            "Excel in leadership roles that require authentic self-expression",
            "Develop strong personal brand and confident public presence",
            "Use your growing self-awareness to inspire others' authenticity",
            "Become a role model for healthy independence and self-development"
        ],
        challenges: [
            "May struggle with over-dependence on others' opinions or approval",
            "Tendency to put others' needs before your own growth and development",
            "Difficulty asserting yourself or taking leadership when needed",
            "May fear being seen as selfish when prioritizing personal development"
        ],
        keywords: ["Authentic", "Independent", "Leadership", "Self-expression", "Confident", "Personal", "Growth", "Identity"],
        developmentTips: [
            "Practice making decisions based on your own values and intuition",
            "Develop daily habits that strengthen your sense of personal identity",
            "Take on leadership roles that challenge you to express your authentic self",
            "Balance self-development with healthy consideration for others"
        ]
    },
    [House.Second]: {
        meaning: "Soul Value Building",
        shortDescription: "Your soul's growth involves developing self-worth and practical resources. You're learning to value yourself and build security.",
        detailedDescription: "With the North Node in the 2nd House, your soul's evolutionary path involves developing healthy self-worth, practical skills, and material security. You're learning to value yourself and your talents, and to build stable resources through your own efforts. This lifetime is about developing a healthy relationship with money, possessions, and your own inherent worth. You may have spent past lives focused on shared resources or others' values, and now you're called to establish your own sense of value and security.",
        lifeAreaFocus: "Self-worth development and practical resource building",
        manifestation: [
            "Learning to value your own talents and charge appropriately for services",
            "Developing practical skills and steady approaches to building wealth",
            "Growing sense of inherent self-worth independent of others' opinions",
            "Building material security through consistent, grounded effort"
        ],
        opportunities: [
            "Excel in building sustainable businesses or developing valuable skills",
            "Create financial stability through practical, steady approaches",
            "Use your growing self-worth to help others value themselves",
            "Become an expert in areas that provide both meaning and material security"
        ],
        challenges: [
            "May struggle with undervaluing yourself or your contributions",
            "Tendency to depend on others for financial or emotional security",
            "Difficulty charging fair prices or asking for what you're worth",
            "May avoid practical responsibilities or material world concerns"
        ],
        keywords: ["Self-worth", "Practical", "Security", "Values", "Resources", "Stability", "Grounded", "Valuable"],
        developmentTips: [
            "Practice recognizing and articulating your unique value and talents",
            "Develop practical money management and resource-building skills",
            "Set fair prices for your work and stick to your worth",
            "Build security through consistent, practical actions rather than depending on others"
        ]
    },
    [House.Third]: {
        meaning: "Soul Communication Growth",
        shortDescription: "Your soul's growth involves developing communication skills and local connections. You're learning to share knowledge effectively.",
        detailedDescription: "With the North Node in the 3rd House, your soul's evolutionary path involves developing effective communication skills, building local connections, and sharing knowledge with others. You're learning to express your ideas clearly, listen actively, and engage meaningfully with your immediate environment. This lifetime is about developing curiosity, learning practical skills, and becoming a bridge between different people and ideas. You may have spent past lives focused on abstract wisdom, and now you're called to ground your knowledge in practical communication.",
        lifeAreaFocus: "Communication development and practical knowledge sharing",
        manifestation: [
            "Learning to communicate ideas clearly and listen actively to others",
            "Developing curiosity about immediate environment and local community",
            "Growing ability to bridge different perspectives and facilitate understanding",
            "Building meaningful connections with siblings, neighbors, and local networks"
        ],
        opportunities: [
            "Excel in teaching, writing, or any field requiring clear communication",
            "Build strong local networks and community connections",
            "Use your communication skills to help others understand complex ideas",
            "Become a valuable connector and facilitator in your community"
        ],
        challenges: [
            "May struggle with being too abstract or philosophical in communication",
            "Tendency to avoid practical details or everyday interactions",
            "Difficulty staying focused on immediate tasks or local concerns",
            "May prefer grand theories over practical, applicable knowledge"
        ],
        keywords: ["Communication", "Learning", "Local", "Practical", "Curious", "Teaching", "Connecting", "Immediate"],
        developmentTips: [
            "Practice explaining complex ideas in simple, practical terms",
            "Engage actively with your local community and immediate environment",
            "Develop listening skills and genuine curiosity about others' perspectives",
            "Focus on practical learning that can be immediately applied and shared"
        ]
    },
    [House.Fourth]: {
        meaning: "Soul Foundation Building",
        shortDescription: "Your soul's growth involves creating emotional security and nurturing foundations. You're learning to build a true home base.",
        detailedDescription: "With the North Node in the 4th House, your soul's evolutionary path involves developing emotional security, creating nurturing foundations, and building a true sense of home and belonging. You're learning to honor your emotional needs, create safe spaces, and develop your nurturing abilities. This lifetime is about establishing deep roots, healing family patterns, and becoming a source of emotional support for others. You may have spent past lives focused on public achievement, and now you're called to develop your private, emotional, and nurturing side.",
        lifeAreaFocus: "Emotional foundation building and nurturing development",
        manifestation: [
            "Learning to honor emotional needs and create genuinely safe spaces",
            "Developing nurturing abilities and becoming emotionally supportive to others",
            "Building deep sense of home and belonging through authentic connections",
            "Healing family patterns and creating healthier emotional foundations"
        ],
        opportunities: [
            "Excel in creating healing home environments or family-centered work",
            "Develop expertise in emotional support, counseling, or nurturing professions",
            "Use your growing emotional wisdom to help others heal family wounds",
            "Become a source of stability and emotional security for your community"
        ],
        challenges: [
            "May struggle with prioritizing public image over emotional authenticity",
            "Tendency to avoid dealing with deep emotions or family issues",
            "Difficulty creating genuine intimacy or emotional vulnerability",
            "May resist slowing down to build real foundations and roots"
        ],
        keywords: ["Emotional", "Nurturing", "Foundation", "Home", "Security", "Family", "Roots", "Healing"],
        developmentTips: [
            "Practice honoring your emotional needs and creating safe spaces for feelings",
            "Develop your nurturing abilities through caring for others or yourself",
            "Work on healing family patterns and creating healthier emotional foundations",
            "Balance public responsibilities with private emotional development"
        ]
    },
    [House.Fifth]: {
        meaning: "Soul Creative Expression",
        shortDescription: "Your soul's growth involves developing creativity and joyful self-expression. You're learning to play and create authentically.",
        detailedDescription: "With the North Node in the 5th House, your soul's evolutionary path involves developing creativity, joyful self-expression, and the ability to play and have fun. You're learning to express your unique creative gifts, take healthy risks, and approach life with more spontaneity and joy. This lifetime is about developing your artistic talents, connecting with your inner child, and sharing your creative light with the world. You may have spent past lives focused on group conformity, and now you're called to develop your individual creative expression.",
        lifeAreaFocus: "Creative development and joyful authentic self-expression",
        manifestation: [
            "Learning to express unique creative gifts without fear of judgment",
            "Developing ability to play, have fun, and approach life with spontaneity",
            "Growing confidence in taking creative risks and sharing artistic work",
            "Connecting with inner child and bringing more joy into daily life"
        ],
        opportunities: [
            "Excel in creative fields that allow authentic artistic expression",
            "Develop talents that bring joy to yourself and others",
            "Use your creative gifts to inspire others to express themselves",
            "Become a source of joy, creativity, and positive energy in your community"
        ],
        challenges: [
            "May struggle with fear of creative judgment or artistic criticism",
            "Tendency to conform to group expectations rather than express individuality",
            "Difficulty taking creative risks or putting artistic work into the world",
            "May resist playfulness or see creativity as impractical or selfish"
        ],
        keywords: ["Creative", "Joyful", "Playful", "Artistic", "Self-expression", "Spontaneous", "Individual", "Fun"],
        developmentTips: [
            "Practice expressing your creativity regularly without worrying about perfection",
            "Develop your artistic talents through classes, practice, or creative projects",
            "Allow yourself to play and have fun without feeling guilty or unproductive",
            "Share your creative work with others to inspire their own self-expression"
        ]
    },
    [House.Sixth]: {
        meaning: "Soul Service Development",
        shortDescription: "Your soul's growth involves developing practical service and healthy routines. You're learning to serve through skilled work.",
        detailedDescription: "With the North Node in the 6th House, your soul's evolutionary path involves developing practical service skills, healthy daily routines, and the ability to help others through competent work. You're learning to focus on details, develop expertise, and serve others through your skills and dedication. This lifetime is about developing discipline, improving your health habits, and finding meaning through practical contribution. You may have spent past lives focused on grand visions, and now you're called to ground your service in practical, everyday helpfulness.",
        lifeAreaFocus: "Practical service development and skilled contribution",
        manifestation: [
            "Learning to serve others through developing practical skills and expertise",
            "Developing healthy daily routines and disciplined approaches to work",
            "Growing ability to focus on details and provide competent, reliable service",
            "Finding meaning through practical contribution rather than grand gestures"
        ],
        opportunities: [
            "Excel in service professions that require skill, dedication, and attention to detail",
            "Develop expertise that genuinely helps others solve practical problems",
            "Use your growing skills to improve others' daily lives and well-being",
            "Become known for reliable, competent service and practical wisdom"
        ],
        challenges: [
            "May struggle with focusing on practical details rather than big picture",
            "Tendency to avoid routine work or resist developing specific skills",
            "Difficulty with discipline or maintaining healthy daily habits",
            "May prefer grand visions over practical, step-by-step service"
        ],
        keywords: ["Service", "Practical", "Skilled", "Disciplined", "Helpful", "Detailed", "Competent", "Healthy"],
        developmentTips: [
            "Practice developing specific skills that allow you to serve others effectively",
            "Create healthy daily routines that support your physical and mental well-being",
            "Focus on practical details and step-by-step approaches to helping others",
            "Find meaning in everyday service rather than waiting for grand opportunities"
        ]
    },
    [House.Seventh]: {
        meaning: "Soul Partnership Growth",
        shortDescription: "Your soul's growth involves developing cooperation and balanced relationships. You're learning to truly partner with others.",
        detailedDescription: "With the North Node in the 7th House, your soul's evolutionary path involves developing cooperation, diplomacy, and the ability to create balanced, mutually supportive relationships. You're learning to consider others' perspectives, compromise when appropriate, and build partnerships based on equality and mutual respect. This lifetime is about developing your relational skills and learning to achieve goals through collaboration rather than solo effort. You may have spent past lives focused on independence, and now you're called to develop your partnership abilities.",
        lifeAreaFocus: "Partnership development and cooperative relationship building",
        manifestation: [
            "Learning to cooperate effectively and consider others' perspectives genuinely",
            "Developing diplomatic skills and ability to find mutually beneficial solutions",
            "Growing capacity for balanced relationships based on equality and respect",
            "Building partnerships that enhance both individuals' growth and success"
        ],
        opportunities: [
            "Excel in careers requiring partnership, diplomacy, or collaborative skills",
            "Build strong, lasting relationships that support mutual growth and success",
            "Use your developing relational skills to help others resolve conflicts",
            "Become known for fairness, cooperation, and ability to bring people together"
        ],
        challenges: [
            "May struggle with being too independent or resistant to compromise",
            "Tendency to dominate relationships or insist on having things your way",
            "Difficulty considering others' perspectives or sharing decision-making",
            "May avoid commitment or deep partnership due to fear of losing independence"
        ],
        keywords: ["Partnership", "Cooperation", "Diplomatic", "Balanced", "Collaborative", "Fair", "Mutual", "Relational"],
        developmentTips: [
            "Practice actively listening to others' perspectives before asserting your own",
            "Develop compromise skills and look for win-win solutions in conflicts",
            "Build relationships based on equality rather than dominance or submission",
            "Learn to achieve goals through collaboration rather than solo effort"
        ]
    },
    [House.Eighth]: {
        meaning: "Soul Transformation Mastery",
        shortDescription: "Your soul's growth involves mastering deep transformation and shared resources. You're learning to navigate life's mysteries.",
        detailedDescription: "With the North Node in the 8th House, your soul's evolutionary path involves mastering deep transformation, working with shared resources, and developing comfort with life's mysteries and intense experiences. You're learning to embrace change, work with others' resources responsibly, and develop psychological depth and insight. This lifetime is about developing resilience through crisis, learning to share power appropriately, and helping others through transformational experiences. You may have spent past lives focused on material security, and now you're called to develop spiritual and psychological depth.",
        lifeAreaFocus: "Transformation mastery and deep psychological development",
        manifestation: [
            "Learning to embrace and navigate deep transformation and life changes",
            "Developing comfort with shared resources and collaborative financial arrangements",
            "Growing psychological insight and ability to help others through crisis",
            "Building resilience and wisdom through intense life experiences"
        ],
        opportunities: [
            "Excel in fields involving transformation, psychology, or crisis management",
            "Develop expertise in shared resources, investments, or collaborative finance",
            "Use your transformational experiences to help others navigate change",
            "Become a guide for others through life's deepest challenges and mysteries"
        ],
        challenges: [
            "May struggle with resistance to change or fear of transformation",
            "Tendency to avoid deep emotional or psychological work",
            "Difficulty trusting others with shared resources or collaborative power",
            "May prefer surface-level security over deep transformational growth"
        ],
        keywords: ["Transformation", "Deep", "Shared", "Psychological", "Resilient", "Mysterious", "Intense", "Regenerative"],
        developmentTips: [
            "Practice embracing change and transformation as opportunities for growth",
            "Develop comfort with shared resources and collaborative financial arrangements",
            "Work on psychological depth through therapy, meditation, or self-reflection",
            "Use your transformational experiences to help others navigate life changes"
        ]
    },
    [House.Ninth]: {
        meaning: "Soul Wisdom Expansion",
        shortDescription: "Your soul's growth involves developing higher wisdom and expanded perspectives. You're learning to teach and inspire others.",
        detailedDescription: "With the North Node in the 9th House, your soul's evolutionary path involves developing higher wisdom, expanded perspectives, and the ability to teach and inspire others. You're learning to think beyond immediate concerns, explore different philosophies and cultures, and share your growing wisdom with others. This lifetime is about developing faith, optimism, and the ability to see the bigger picture. You may have spent past lives focused on practical details, and now you're called to develop your philosophical and spiritual understanding.",
        lifeAreaFocus: "Wisdom expansion and inspirational teaching development",
        manifestation: [
            "Learning to think beyond immediate concerns and see larger patterns",
            "Developing philosophical understanding and spiritual perspective on life",
            "Growing ability to teach, inspire, and share wisdom with others",
            "Expanding horizons through travel, education, or cultural exploration"
        ],
        opportunities: [
            "Excel in teaching, publishing, or fields requiring broad perspective and wisdom",
            "Develop expertise in philosophy, spirituality, or cross-cultural understanding",
            "Use your expanding wisdom to inspire others and broaden their perspectives",
            "Become a bridge between different cultures, beliefs, or ways of thinking"
        ],
        challenges: [
            "May struggle with getting lost in details rather than seeing big picture",
            "Tendency to be overly practical or skeptical about philosophical matters",
            "Difficulty sharing knowledge or stepping into teaching roles",
            "May resist expanding beyond familiar, local, or practical concerns"
        ],
        keywords: ["Wisdom", "Expansive", "Teaching", "Philosophical", "Inspirational", "Broad", "Cultural", "Spiritual"],
        developmentTips: [
            "Practice looking at situations from broader, more philosophical perspectives",
            "Develop your teaching abilities by sharing knowledge and wisdom with others",
            "Expand your horizons through travel, education, or cultural exploration",
            "Focus on developing faith and optimism rather than getting stuck in details"
        ]
    },
    [House.Tenth]: {
        meaning: "Soul Authority Development",
        shortDescription: "Your soul's growth involves developing public authority and professional mastery. You're learning to lead and achieve recognition.",
        detailedDescription: "With the North Node in the 10th House, your soul's evolutionary path involves developing public authority, professional mastery, and the ability to achieve recognition for your contributions. You're learning to step into leadership roles, build a respected reputation, and make a meaningful impact in your chosen field. This lifetime is about developing discipline, ambition, and the ability to achieve long-term goals. You may have spent past lives focused on private, family concerns, and now you're called to develop your public, professional capabilities.",
        lifeAreaFocus: "Professional mastery and public authority development",
        manifestation: [
            "Learning to step into leadership roles and accept public responsibility",
            "Developing professional expertise and building respected reputation",
            "Growing ability to achieve long-term goals through disciplined effort",
            "Building authority and influence that serves the greater good"
        ],
        opportunities: [
            "Excel in leadership positions that allow you to make meaningful public impact",
            "Develop professional expertise that earns respect and recognition",
            "Use your growing authority to create positive change in your field",
            "Become a role model and leader who inspires others to achieve their goals"
        ],
        challenges: [
            "May struggle with stepping into public roles or accepting responsibility",
            "Tendency to prioritize private, family concerns over professional development",
            "Difficulty with ambition or working toward long-term professional goals",
            "May resist authority or avoid positions of public leadership"
        ],
        keywords: ["Authority", "Professional", "Leadership", "Recognition", "Disciplined", "Ambitious", "Public", "Masterful"],
        developmentTips: [
            "Practice stepping into leadership roles and accepting public responsibility",
            "Develop professional skills and work toward building a respected reputation",
            "Set long-term career goals and work disciplined toward achieving them",
            "Balance family concerns with professional development and public service"
        ]
    },
    [House.Eleventh]: {
        meaning: "Soul Community Building",
        shortDescription: "Your soul's growth involves building community and working for collective goals. You're learning to serve the greater good.",
        detailedDescription: "With the North Node in the 11th House, your soul's evolutionary path involves building community, working for collective goals, and developing your ability to serve the greater good. You're learning to think beyond personal interests, build networks of like-minded people, and work toward humanitarian ideals. This lifetime is about developing your social consciousness and learning to achieve goals through group effort and community support. You may have spent past lives focused on personal achievement, and now you're called to develop your collective and humanitarian consciousness.",
        lifeAreaFocus: "Community building and collective service development",
        manifestation: [
            "Learning to think beyond personal interests and consider collective good",
            "Developing ability to build networks and work effectively in groups",
            "Growing commitment to humanitarian ideals and social causes",
            "Building friendships and alliances that support mutual growth and service"
        ],
        opportunities: [
            "Excel in community organizing, social causes, or humanitarian work",
            "Build networks that support both personal growth and collective service",
            "Use your developing social consciousness to create positive change",
            "Become a bridge-builder who brings people together for common causes"
        ],
        challenges: [
            "May struggle with focusing too much on personal achievement or recognition",
            "Tendency to avoid group work or resist collaborative approaches",
            "Difficulty subordinating personal interests to collective good",
            "May resist networking or building the social connections needed for impact"
        ],
        keywords: ["Community", "Collective", "Humanitarian", "Social", "Networking", "Idealistic", "Group-oriented", "Service"],
        developmentTips: [
            "Practice thinking about how your actions affect the collective good",
            "Develop networking skills and build relationships that support mutual service",
            "Get involved in social causes or humanitarian work that inspires you",
            "Learn to achieve goals through group effort rather than solo achievement"
        ]
    },
    [House.Twelfth]: {
        meaning: "Soul Spiritual Service",
        shortDescription: "Your soul's growth involves developing spiritual service and compassionate surrender. You're learning to serve the divine.",
        detailedDescription: "With the North Node in the 12th House, your soul's evolutionary path involves developing spiritual service, compassionate surrender, and the ability to serve something greater than yourself. You're learning to let go of ego-driven goals, develop spiritual practices, and serve others through compassion and selfless action. This lifetime is about developing faith, intuition, and the ability to work behind the scenes for the greater good. You may have spent past lives focused on practical achievement, and now you're called to develop your spiritual and compassionate nature.",
        lifeAreaFocus: "Spiritual service development and compassionate surrender",
        manifestation: [
            "Learning to serve others through compassion and selfless action",
            "Developing spiritual practices and connection to something greater than self",
            "Growing ability to work behind the scenes without need for recognition",
            "Surrendering ego-driven goals in favor of spiritual service and growth"
        ],
        opportunities: [
            "Excel in spiritual service, healing work, or behind-the-scenes support roles",
            "Develop spiritual practices that connect you to divine guidance and wisdom",
            "Use your growing compassion to help others heal and find peace",
            "Become a channel for divine love and service in the world"
        ],
        challenges: [
            "May struggle with letting go of ego-driven goals or need for recognition",
            "Tendency to be overly practical or skeptical about spiritual matters",
            "Difficulty surrendering control or trusting in divine guidance",
            "May resist working behind the scenes or serving without recognition"
        ],
        keywords: ["Spiritual", "Compassionate", "Selfless", "Surrendering", "Intuitive", "Service-oriented", "Behind-the-scenes", "Divine"],
        developmentTips: [
            "Practice spiritual disciplines like meditation, prayer, or contemplation",
            "Develop compassion through service to others, especially those who are suffering",
            "Learn to work behind the scenes without needing recognition or credit",
            "Surrender ego-driven goals and trust in divine guidance for your path"
        ]
    }
};

// South Node in Houses interpretations
export const SOUTH_NODE_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Past Life Independence",
        shortDescription: "You've mastered self-reliance and independence in past lives. Now you're learning to balance this with cooperation.",
        detailedDescription: "With the South Node in the 1st House, you come into this lifetime with well-developed independence, self-reliance, and leadership abilities from past lives. You're naturally confident and comfortable taking charge, but your soul's growth now requires learning to balance this with cooperation and consideration for others. While your independence is a strength, you may need to avoid being overly self-focused or dominating. Your challenge is to use your natural leadership while developing partnership skills and genuine care for others' needs.",
        lifeAreaFocus: "Balancing past-life independence with cooperative partnership development",
        manifestation: [
            "Natural confidence and leadership abilities that come easily",
            "Comfortable with independence and taking charge of situations",
            "Strong sense of personal identity and self-reliance",
            "Tendency to default to solo action rather than collaboration"
        ],
        opportunities: [
            "Use your natural leadership to inspire and guide others effectively",
            "Balance independence with genuine partnership and cooperation",
            "Develop diplomatic skills while maintaining your authentic self-expression",
            "Become a leader who empowers others rather than dominating them"
        ],
        challenges: [
            "May be overly self-focused or insensitive to others' needs",
            "Tendency to dominate relationships or resist compromise",
            "Difficulty asking for help or accepting others' input",
            "May struggle with genuine partnership or collaborative decision-making"
        ],
        keywords: ["Independent", "Self-reliant", "Leadership", "Confident", "Dominating", "Solo", "Strong-willed", "Assertive"],
        developmentTips: [
            "Practice considering others' perspectives before making decisions",
            "Develop genuine interest in others' needs and contributions",
            "Learn to ask for help and accept input from partners and collaborators",
            "Use your leadership skills to empower others rather than control them"
        ]
    },
    [House.Second]: {
        meaning: "Past Life Material Mastery",
        shortDescription: "You've mastered material security and self-worth in past lives. Now you're learning to share resources and transform.",
        detailedDescription: "With the South Node in the 2nd House, you come into this lifetime with well-developed abilities to create material security, manage resources, and maintain stable values from past lives. You're naturally practical and good with money, but your soul's growth now requires learning to work with shared resources and embrace transformation. While your material skills are a strength, you may need to avoid being overly possessive or resistant to change. Your challenge is to use your practical abilities while developing comfort with shared resources and deep transformation.",
        lifeAreaFocus: "Balancing past-life material mastery with transformational resource sharing",
        manifestation: [
            "Natural ability to create material security and manage resources effectively",
            "Strong, stable values and practical approach to money and possessions",
            "Comfortable with personal ownership and individual resource control",
            "Tendency to prefer familiar, stable approaches over transformational change"
        ],
        opportunities: [
            "Use your practical skills to help others build financial stability",
            "Balance personal security with generous sharing of resources",
            "Develop expertise in shared investments or collaborative financial ventures",
            "Become a bridge between practical stability and transformational growth"
        ],
        challenges: [
            "May be overly possessive or resistant to sharing resources",
            "Tendency to avoid transformation or stick to familiar financial patterns",
            "Difficulty trusting others with shared resources or investments",
            "May struggle with letting go of material attachments when growth requires it"
        ],
        keywords: ["Practical", "Stable", "Possessive", "Security-focused", "Traditional", "Conservative", "Material", "Steady"],
        developmentTips: [
            "Practice sharing resources and collaborating on financial ventures",
            "Develop comfort with transformation and change in your material life",
            "Learn to trust others with shared resources while maintaining practical wisdom",
            "Use your stability to support others through transformational experiences"
        ]
    },
    [House.Third]: {
        meaning: "Past Life Communication Mastery",
        shortDescription: "You've mastered practical communication and local knowledge in past lives. Now you're learning to seek higher wisdom.",
        detailedDescription: "With the South Node in the 3rd House, you come into this lifetime with well-developed communication skills, practical knowledge, and local connections from past lives. You're naturally articulate and good at sharing information, but your soul's growth now requires learning to seek higher wisdom and broader perspectives. While your communication abilities are a strength, you may need to avoid getting stuck in details or local concerns. Your challenge is to use your practical knowledge while developing philosophical understanding and expanded vision.",
        lifeAreaFocus: "Balancing past-life practical communication with higher wisdom seeking",
        manifestation: [
            "Natural communication skills and ability to share practical information effectively",
            "Strong connections to local community and immediate environment",
            "Comfortable with details, facts, and practical learning approaches",
            "Tendency to focus on immediate concerns rather than broader perspectives"
        ],
        opportunities: [
            "Use your communication skills to teach and share higher wisdom with others",
            "Balance practical knowledge with philosophical and spiritual understanding",
            "Develop expertise in bridging local concerns with universal principles",
            "Become a teacher who makes complex wisdom accessible and practical"
        ],
        challenges: [
            "May get stuck in details and miss the bigger picture or deeper meaning",
            "Tendency to be overly practical or skeptical about philosophical matters",
            "Difficulty expanding beyond familiar, local, or immediate concerns",
            "May resist abstract learning or spiritual/philosophical exploration"
        ],
        keywords: ["Practical", "Local", "Detailed", "Factual", "Immediate", "Familiar", "Concrete", "Specific"],
        developmentTips: [
            "Practice looking at situations from broader, more philosophical perspectives",
            "Develop interest in abstract learning and spiritual/philosophical subjects",
            "Use your communication skills to share wisdom rather than just information",
            "Expand beyond local concerns to embrace universal principles and higher learning"
        ]
    },
    [House.Fourth]: {
        meaning: "Past Life Emotional Mastery",
        shortDescription: "You've mastered emotional nurturing and family foundations in past lives. Now you're learning to achieve public recognition.",
        detailedDescription: "With the South Node in the 4th House, you come into this lifetime with well-developed nurturing abilities, emotional wisdom, and strong family foundations from past lives. You're naturally caring and good at creating emotional security, but your soul's growth now requires learning to step into public roles and achieve recognition. While your nurturing skills are a strength, you may need to avoid hiding in private life or avoiding public responsibility. Your challenge is to use your emotional wisdom while developing professional authority and public leadership.",
        lifeAreaFocus: "Balancing past-life emotional nurturing with public authority development",
        manifestation: [
            "Natural nurturing abilities and skill at creating emotional security for others",
            "Strong connection to family, home, and private emotional life",
            "Comfortable with behind-the-scenes support and emotional caretaking",
            "Tendency to avoid public roles or professional leadership responsibilities"
        ],
        opportunities: [
            "Use your emotional wisdom to become a compassionate public leader",
            "Balance family responsibilities with professional achievement and recognition",
            "Develop expertise in fields that combine nurturing with public service",
            "Become a leader who brings emotional intelligence to professional settings"
        ],
        challenges: [
            "May avoid public roles or resist stepping into positions of authority",
            "Tendency to prioritize family/private concerns over professional development",
            "Difficulty with ambition or working toward public recognition and achievement",
            "May struggle with the demands and visibility of professional leadership"
        ],
        keywords: ["Nurturing", "Private", "Family-focused", "Emotional", "Behind-the-scenes", "Supportive", "Caring", "Protective"],
        developmentTips: [
            "Practice stepping into public roles and accepting professional responsibility",
            "Develop professional ambition while maintaining your caring, nurturing nature",
            "Use your emotional intelligence to become a more effective public leader",
            "Balance family commitments with career development and public service"
        ]
    },
    [House.Fifth]: {
        meaning: "Past Life Creative Mastery",
        shortDescription: "You've mastered individual creative expression and joy in past lives. Now you're learning to serve collective ideals.",
        detailedDescription: "With the South Node in the 5th House, you come into this lifetime with well-developed creative abilities, joyful self-expression, and natural charisma from past lives. You're naturally artistic and good at bringing joy to others, but your soul's growth now requires learning to serve collective ideals and work for the greater good. While your creativity is a strength, you may need to avoid being overly self-focused or attention-seeking. Your challenge is to use your creative gifts while developing social consciousness and humanitarian service.",
        lifeAreaFocus: "Balancing past-life individual creativity with collective service development",
        manifestation: [
            "Natural creative talents and ability to express yourself joyfully and authentically",
            "Comfortable with being the center of attention and receiving recognition",
            "Strong connection to play, fun, and bringing joy to others",
            "Tendency to focus on personal creative expression rather than collective service"
        ],
        opportunities: [
            "Use your creative gifts to serve humanitarian causes and collective ideals",
            "Balance individual expression with group collaboration and social service",
            "Develop expertise in using creativity for social change and community building",
            "Become an artist or creative whose work serves the greater good"
        ],
        challenges: [
            "May be overly focused on personal recognition or individual creative expression",
            "Tendency to resist group work or collaborative creative projects",
            "Difficulty subordinating personal creative vision to collective needs",
            "May struggle with sharing creative spotlight or working for causes larger than self"
        ],
        keywords: ["Creative", "Individual", "Attention-seeking", "Joyful", "Playful", "Self-focused", "Artistic", "Expressive"],
        developmentTips: [
            "Practice using your creative gifts to serve others and collective causes",
            "Develop interest in group creative projects and collaborative artistic work",
            "Learn to share creative recognition and support others' artistic expression",
            "Channel your creativity into work that serves humanitarian ideals and social change"
        ]
    },
    [House.Sixth]: {
        meaning: "Past Life Service Mastery",
        shortDescription: "You've mastered practical service and detailed work in past lives. Now you're learning to embrace faith and spiritual vision.",
        detailedDescription: "With the South Node in the 6th House, you come into this lifetime with well-developed service skills, attention to detail, and practical work abilities from past lives. You're naturally helpful and good at organizing systems, but your soul's growth now requires learning to embrace faith, spiritual vision, and broader perspectives. While your service orientation is a strength, you may need to avoid getting stuck in perfectionism or practical limitations. Your challenge is to use your practical skills while developing spiritual understanding and visionary thinking.",
        lifeAreaFocus: "Balancing past-life practical service with spiritual vision development",
        manifestation: [
            "Natural ability to serve others through practical skills and detailed work",
            "Comfortable with routine, organization, and systematic approaches to helping",
            "Strong focus on health, efficiency, and practical problem-solving",
            "Tendency to get caught up in details and miss broader spiritual meaning"
        ],
        opportunities: [
            "Use your service skills to support spiritual and visionary work",
            "Balance practical helpfulness with faith-based and inspirational service",
            "Develop expertise in grounding spiritual vision in practical, helpful action",
            "Become a bridge between practical service and spiritual/philosophical understanding"
        ],
        challenges: [
            "May be overly critical, perfectionist, or focused on practical limitations",
            "Tendency to resist spiritual or philosophical approaches to service",
            "Difficulty with faith, optimism, or visionary thinking about possibilities",
            "May struggle with big-picture thinking or abstract spiritual concepts"
        ],
        keywords: ["Practical", "Detailed", "Perfectionist", "Critical", "Systematic", "Routine", "Analytical", "Helpful"],
        developmentTips: [
            "Practice developing faith and optimism alongside your practical service skills",
            "Learn to see the bigger spiritual picture while maintaining attention to helpful details",
            "Develop interest in philosophical and spiritual approaches to service",
            "Use your practical abilities to ground and support visionary, spiritual work"
        ]
    },
    [House.Seventh]: {
        meaning: "Past Life Partnership Mastery",
        shortDescription: "You've mastered cooperation and relationships in past lives. Now you're learning to develop authentic independence.",
        detailedDescription: "With the South Node in the 7th House, you come into this lifetime with well-developed partnership skills, diplomacy, and ability to cooperate from past lives. You're naturally good at relationships and considering others' needs, but your soul's growth now requires learning to develop authentic independence and self-reliance. While your relational abilities are a strength, you may need to avoid over-dependence on others or losing yourself in relationships. Your challenge is to use your partnership skills while developing strong individual identity and leadership.",
        lifeAreaFocus: "Balancing past-life partnership mastery with authentic independence development",
        manifestation: [
            "Natural ability to cooperate, compromise, and maintain harmonious relationships",
            "Comfortable with considering others' needs and finding mutually beneficial solutions",
            "Strong diplomatic skills and ability to see multiple perspectives",
            "Tendency to depend on others for decision-making or identity validation"
        ],
        opportunities: [
            "Use your relational skills to support others while maintaining strong individual identity",
            "Balance cooperation with healthy independence and self-reliance",
            "Develop leadership abilities that incorporate your natural diplomatic skills",
            "Become a leader who empowers both individual growth and collaborative success"
        ],
        challenges: [
            "May be overly dependent on others for decisions or identity validation",
            "Tendency to lose individual identity or authentic self in relationships",
            "Difficulty with independent action or leadership when collaboration isn't possible",
            "May struggle with asserting individual needs or making solo decisions"
        ],
        keywords: ["Cooperative", "Diplomatic", "Dependent", "Harmonious", "Other-focused", "Compromising", "Relational", "Accommodating"],
        developmentTips: [
            "Practice making independent decisions and trusting your individual judgment",
            "Develop strong sense of personal identity alongside your relational skills",
            "Learn to lead and take independent action when situations require it",
            "Balance consideration for others with healthy assertion of your own needs"
        ]
    },
    [House.Eighth]: {
        meaning: "Past Life Transformation Mastery",
        shortDescription: "You've mastered deep transformation and shared resources in past lives. Now you're learning to build stable, personal security.",
        detailedDescription: "With the South Node in the 8th House, you come into this lifetime with well-developed abilities to handle transformation, crisis, and shared resources from past lives. You're naturally comfortable with intensity and change, but your soul's growth now requires learning to build stable, personal security and develop practical values. While your transformational abilities are a strength, you may need to avoid creating unnecessary drama or depending on others' resources. Your challenge is to use your depth while developing steady, practical approaches to security and self-worth.",
        lifeAreaFocus: "Balancing past-life transformation mastery with stable security building",
        manifestation: [
            "Natural comfort with intensity, crisis, transformation, and deep psychological work",
            "Skilled at working with shared resources and navigating complex financial arrangements",
            "Comfortable with life's mysteries, taboo subjects, and transformational experiences",
            "Tendency to create or attract drama rather than building steady, practical security"
        ],
        opportunities: [
            "Use your transformational skills to help others while building personal stability",
            "Balance deep psychological work with practical security and resource building",
            "Develop expertise in combining transformational wisdom with practical financial skills",
            "Become a guide who helps others transform while maintaining grounded stability"
        ],
        challenges: [
            "May create unnecessary drama or crisis instead of building steady security",
            "Tendency to depend on others' resources rather than developing personal wealth",
            "Difficulty with practical, steady approaches to building material security",
            "May struggle with surface-level stability or routine financial management"
        ],
        keywords: ["Intense", "Transformational", "Crisis-oriented", "Deep", "Dramatic", "Shared-resource focused", "Psychological", "Complex"],
        developmentTips: [
            "Practice building steady, practical security alongside your transformational abilities",
            "Develop personal resources and financial independence rather than depending on others",
            "Learn to appreciate stability and routine as foundations for deeper work",
            "Use your transformational wisdom to help others build practical security"
        ]
    },
    [House.Ninth]: {
        meaning: "Past Life Wisdom Mastery",
        shortDescription: "You've mastered higher wisdom and broad perspectives in past lives. Now you're learning to communicate practically.",
        detailedDescription: "With the South Node in the 9th House, you come into this lifetime with well-developed philosophical understanding, spiritual wisdom, and broad perspectives from past lives. You're naturally wise and good at seeing the big picture, but your soul's growth now requires learning to communicate practically and engage with immediate, local concerns. While your wisdom is a strength, you may need to avoid being overly abstract or disconnected from practical reality. Your challenge is to use your philosophical understanding while developing practical communication and local engagement.",
        lifeAreaFocus: "Balancing past-life philosophical wisdom with practical communication development",
        manifestation: [
            "Natural philosophical understanding and ability to see broad, universal patterns",
            "Comfortable with abstract thinking, spiritual concepts, and cross-cultural perspectives",
            "Strong connection to higher learning, teaching, and sharing wisdom",
            "Tendency to be overly abstract or disconnected from practical, immediate concerns"
        ],
        opportunities: [
            "Use your wisdom to make complex concepts accessible through practical communication",
            "Balance philosophical understanding with engagement in local, immediate concerns",
            "Develop expertise in translating abstract wisdom into practical, applicable knowledge",
            "Become a teacher who bridges higher wisdom with everyday practical application"
        ],
        challenges: [
            "May be overly abstract, preachy, or disconnected from practical reality",
            "Tendency to avoid dealing with immediate, local, or practical concerns",
            "Difficulty with detailed communication or step-by-step practical instruction",
            "May struggle with listening to others or engaging in everyday conversation"
        ],
        keywords: ["Abstract", "Philosophical", "Broad", "Wise", "Preachy", "Disconnected", "Universal", "Theoretical"],
        developmentTips: [
            "Practice translating your wisdom into practical, immediately applicable guidance",
            "Develop genuine interest in local concerns and everyday practical matters",
            "Learn to listen actively and engage in detailed, practical communication",
            "Use your philosophical understanding to enhance rather than escape from practical life"
        ]
    },
    [House.Tenth]: {
        meaning: "Past Life Authority Mastery",
        shortDescription: "You've mastered public authority and professional achievement in past lives. Now you're learning to nurture emotional foundations.",
        detailedDescription: "With the South Node in the 10th House, you come into this lifetime with well-developed leadership abilities, professional skills, and public authority from past lives. You're naturally good at achieving recognition and building reputation, but your soul's growth now requires learning to nurture emotional foundations and create genuine security. While your leadership abilities are a strength, you may need to avoid being overly focused on status or neglecting emotional needs. Your challenge is to use your authority while developing emotional intelligence and nurturing capabilities.",
        lifeAreaFocus: "Balancing past-life professional authority with emotional foundation building",
        manifestation: [
            "Natural leadership abilities and comfort with public authority and recognition",
            "Skilled at professional achievement and building respected reputation",
            "Comfortable with responsibility, ambition, and working toward long-term goals",
            "Tendency to prioritize professional success over emotional needs and family connections"
        ],
        opportunities: [
            "Use your leadership skills to create emotionally supportive environments",
            "Balance professional achievement with genuine emotional connection and nurturing",
            "Develop expertise in combining authority with emotional intelligence and care",
            "Become a leader who creates both professional success and emotional security"
        ],
        challenges: [
            "May be overly focused on status, achievement, or public image",
            "Tendency to neglect emotional needs, family relationships, or personal foundations",
            "Difficulty with vulnerability, emotional expression, or intimate connections",
            "May struggle with slowing down to build genuine emotional security and roots"
        ],
        keywords: ["Authoritative", "Achievement-focused", "Status-oriented", "Professional", "Ambitious", "Public", "Goal-driven", "Responsible"],
        developmentTips: [
            "Practice prioritizing emotional needs and family relationships alongside career goals",
            "Develop vulnerability and emotional expression to complement your leadership skills",
            "Learn to create emotional security and nurturing environments for yourself and others",
            "Use your authority to support others' emotional growth and family well-being"
        ]
    },
    [House.Eleventh]: {
        meaning: "Past Life Community Mastery",
        shortDescription: "You've mastered group work and collective ideals in past lives. Now you're learning to express individual creativity.",
        detailedDescription: "With the South Node in the 11th House, you come into this lifetime with well-developed abilities to work in groups, serve collective ideals, and build community from past lives. You're naturally good at networking and humanitarian service, but your soul's growth now requires learning to express individual creativity and develop personal artistic vision. While your group skills are a strength, you may need to avoid losing individual identity in collective causes. Your challenge is to use your social consciousness while developing authentic creative self-expression.",
        lifeAreaFocus: "Balancing past-life collective service with individual creative development",
        manifestation: [
            "Natural ability to work in groups and serve humanitarian causes effectively",
            "Comfortable with networking, community building, and collective ideals",
            "Strong social consciousness and commitment to serving the greater good",
            "Tendency to suppress individual creativity or personal expression for group harmony"
        ],
        opportunities: [
            "Use your group skills to support and promote individual creative expression",
            "Balance collective service with authentic personal artistic development",
            "Develop expertise in helping groups support individual members' creative growth",
            "Become a leader who serves collective ideals through individual creative contribution"
        ],
        challenges: [
            "May suppress individual creativity or personal expression for group acceptance",
            "Tendency to lose personal identity or artistic vision in collective causes",
            "Difficulty with individual recognition or stepping into creative spotlight",
            "May struggle with expressing unique personal vision that differs from group ideals"
        ],
        keywords: ["Group-oriented", "Collective", "Humanitarian", "Social", "Conforming", "Idealistic", "Community-focused", "Selfless"],
        developmentTips: [
            "Practice expressing your individual creativity and unique artistic vision",
            "Develop confidence in your personal creative gifts and willingness to be seen",
            "Learn to balance group service with authentic individual self-expression",
            "Use your social skills to create platforms for individual creative expression"
        ]
    },
    [House.Twelfth]: {
        meaning: "Past Life Spiritual Mastery",
        shortDescription: "You've mastered spiritual service and surrender in past lives. Now you're learning to develop practical skills and competence.",
        detailedDescription: "With the South Node in the 12th House, you come into this lifetime with well-developed spiritual abilities, compassionate service, and connection to the divine from past lives. You're naturally intuitive and good at selfless service, but your soul's growth now requires learning to develop practical skills and competent service in the material world. While your spiritual gifts are a strength, you may need to avoid escapism or impractical approaches to helping others. Your challenge is to use your spiritual wisdom while developing practical competence and grounded service.",
        lifeAreaFocus: "Balancing past-life spiritual mastery with practical skill development",
        manifestation: [
            "Natural spiritual abilities and comfort with meditation, prayer, and divine connection",
            "Skilled at compassionate service and working behind the scenes to help others",
            "Comfortable with surrender, faith, and trusting in divine guidance",
            "Tendency to be impractical, escapist, or avoid developing concrete skills"
        ],
        opportunities: [
            "Use your spiritual wisdom to enhance practical service and skill development",
            "Balance spiritual practice with competent, grounded service in the material world",
            "Develop expertise in combining spiritual insight with practical problem-solving",
            "Become a healer or helper who grounds spiritual wisdom in practical, effective service"
        ],
        challenges: [
            "May be impractical, escapist, or avoid developing concrete skills and competence",
            "Tendency to rely on spiritual bypassing rather than practical problem-solving",
            "Difficulty with routine work, detailed tasks, or systematic skill development",
            "May struggle with grounding spiritual insights in practical, effective action"
        ],
        keywords: ["Spiritual", "Impractical", "Escapist", "Compassionate", "Surrendering", "Intuitive", "Selfless", "Otherworldly"],
        developmentTips: [
            "Practice developing practical skills and competence alongside spiritual practice",
            "Learn to ground spiritual insights in concrete, helpful action and service",
            "Develop discipline and attention to detail to complement your spiritual gifts",
            "Use your spiritual wisdom to enhance rather than escape from practical responsibilities"
        ]
    }
};

// Chiron in Houses interpretations
export const CHIRON_HOUSE_INTERPRETATIONS: Record<House, PlanetHouseInterpretation> = {
    [House.First]: {
        meaning: "Identity Wound Healer",
        shortDescription: "Your deepest wound involves identity and self-worth, but through healing this, you become a powerful guide for others' self-acceptance.",
        detailedDescription: "With Chiron in the 1st House, your core wound involves issues with identity, self-worth, and feeling fundamentally flawed or different. You may struggle with confidence, body image, or feeling like you don't belong. However, through your journey of healing these deep identity wounds, you develop profound wisdom about self-acceptance and authentic self-expression. Your personal healing journey becomes a source of strength that allows you to help others embrace their own uniqueness and heal their identity wounds.",
        lifeAreaFocus: "Healing identity wounds and developing authentic self-acceptance",
        manifestation: [
            "Deep wounds around identity, self-worth, and feeling fundamentally different or flawed",
            "Struggles with confidence, body image, or sense of belonging",
            "Journey of healing that develops profound wisdom about self-acceptance",
            "Ability to help others embrace uniqueness and heal identity wounds"
        ],
        opportunities: [
            "Excel in counseling, coaching, or healing work focused on self-esteem and identity",
            "Use your healing journey to inspire others to accept and love themselves",
            "Develop expertise in helping others overcome identity crises and self-doubt",
            "Become a powerful advocate for authenticity and self-acceptance"
        ],
        challenges: [
            "May struggle with chronic self-doubt or feeling fundamentally flawed",
            "Tendency to be overly self-critical or compare yourself negatively to others",
            "Difficulty accepting compliments or recognizing your own worth and beauty",
            "May project your identity wounds onto others or become overly focused on appearance"
        ],
        keywords: ["Identity-wounded", "Self-doubting", "Healing", "Authentic", "Self-accepting", "Wounded-healer", "Different", "Transformative"],
        developmentTips: [
            "Practice self-compassion and challenge negative self-talk about your identity",
            "Embrace your differences as gifts rather than flaws that need to be hidden",
            "Use your healing journey to help others who struggle with similar identity issues",
            "Develop a strong sense of self-worth based on your inner qualities rather than external validation"
        ]
    },
    [House.Second]: {
        meaning: "Worth Wound Healer",
        shortDescription: "Your deepest wound involves self-worth and resources, but through healing this, you help others discover their true value.",
        detailedDescription: "With Chiron in the 2nd House, your core wound involves issues with self-worth, value, and material security. You may struggle with feeling valuable, managing money, or believing you deserve abundance. There may be deep wounds around poverty, financial instability, or feeling like you're not worth investing in. However, through your journey of healing these worth wounds, you develop profound wisdom about true value and abundance. Your healing allows you to help others recognize their inherent worth and develop healthy relationships with money and resources.",
        lifeAreaFocus: "Healing worth wounds and developing healthy relationship with value and resources",
        manifestation: [
            "Deep wounds around self-worth, value, and deserving abundance or security",
            "Struggles with money management, financial stability, or feeling worthy of investment",
            "Journey of healing that develops wisdom about true value beyond material possessions",
            "Ability to help others recognize inherent worth and develop healthy money relationships"
        ],
        opportunities: [
            "Excel in financial counseling, value-based coaching, or helping others with money wounds",
            "Use your healing journey to teach others about true worth and abundance mindset",
            "Develop expertise in helping people overcome financial trauma or scarcity thinking",
            "Become a guide for others in developing healthy relationships with money and self-worth"
        ],
        challenges: [
            "May struggle with chronic financial insecurity or feeling unworthy of abundance",
            "Tendency to undervalue yourself or have difficulty charging appropriately for services",
            "Difficulty accepting financial help or believing you deserve material comfort",
            "May swing between extremes of hoarding resources or giving everything away"
        ],
        keywords: ["Worth-wounded", "Financially-insecure", "Undervaluing", "Healing", "Abundant", "Value-teaching", "Deserving", "Transformative"],
        developmentTips: [
            "Practice recognizing and affirming your inherent worth independent of material possessions",
            "Work on healing financial trauma and developing a healthy abundance mindset",
            "Use your worth healing journey to help others overcome similar financial and value wounds",
            "Learn to charge appropriately for your services and accept the abundance you deserve"
        ]
    },
    [House.Third]: {
        meaning: "Communication Wound Healer",
        shortDescription: "Your deepest wound involves communication and learning, but through healing this, you become a powerful teacher and communicator.",
        detailedDescription: "With Chiron in the 3rd House, your core wound involves issues with communication, learning, and being heard or understood. You may have experienced early wounds around speaking up, learning difficulties, or feeling like your voice doesn't matter. There may be painful experiences with siblings, school, or local community that affected your confidence in communication. However, through your journey of healing these communication wounds, you develop profound wisdom about authentic expression and effective teaching. Your healing allows you to help others find their voice and overcome learning or communication challenges.",
        lifeAreaFocus: "Healing communication wounds and developing authentic voice and teaching abilities",
        manifestation: [
            "Deep wounds around communication, learning, and feeling heard or understood",
            "Struggles with speaking up, learning challenges, or confidence in expressing ideas",
            "Painful experiences with siblings, school, or community affecting communication confidence",
            "Journey of healing that develops wisdom about authentic expression and effective teaching"
        ],
        opportunities: [
            "Excel in teaching, speech therapy, or helping others overcome communication challenges",
            "Use your healing journey to help others find their voice and express themselves authentically",
            "Develop expertise in alternative learning methods or communication healing techniques",
            "Become a powerful advocate for those who struggle to be heard or understood"
        ],
        challenges: [
            "May struggle with chronic communication anxiety or fear of not being understood",
            "Tendency to either over-communicate or withdraw from communication entirely",
            "Difficulty trusting that your ideas and voice have value and deserve to be heard",
            "May project communication wounds onto others or become overly critical of others' expression"
        ],
        keywords: ["Communication-wounded", "Silenced", "Misunderstood", "Healing", "Voice-finding", "Teaching", "Expressive", "Transformative"],
        developmentTips: [
            "Practice expressing yourself authentically without fear of judgment or misunderstanding",
            "Work on healing early communication wounds through therapy or supportive relationships",
            "Use your communication healing journey to help others who struggle to find their voice",
            "Develop confidence in your ideas and trust that your perspective has value"
        ]
    },
    [House.Fourth]: {
        meaning: "Family Wound Healer",
        shortDescription: "Your deepest wound involves family and emotional security, but through healing this, you create profound emotional healing for others.",
        detailedDescription: "With Chiron in the 4th House, your core wound involves issues with family, home, and emotional security. You may have experienced deep wounds in your family of origin, abandonment, or lack of emotional nurturing. There may be generational trauma or family secrets that have affected your sense of belonging and emotional safety. However, through your journey of healing these family wounds, you develop profound wisdom about creating emotional security and healing family patterns. Your healing allows you to help others heal their family wounds and create the nurturing they never received.",
        lifeAreaFocus: "Healing family wounds and creating emotional security and nurturing for others",
        manifestation: [
            "Deep wounds around family, home, and emotional security from early experiences",
            "Struggles with abandonment, lack of nurturing, or generational family trauma",
            "Journey of healing that develops wisdom about creating emotional safety and belonging",
            "Ability to help others heal family wounds and create the nurturing they never received"
        ],
        opportunities: [
            "Excel in family therapy, emotional healing work, or creating healing home environments",
            "Use your healing journey to help others overcome family trauma and abandonment wounds",
            "Develop expertise in breaking generational patterns and creating healthy family dynamics",
            "Become a source of nurturing and emotional security for those who lack family support"
        ],
        challenges: [
            "May struggle with chronic feelings of not belonging or emotional insecurity",
            "Tendency to either avoid family connections or become overly dependent on them",
            "Difficulty trusting that you can create the emotional security you never had",
            "May project family wounds onto current relationships or repeat unhealthy patterns"
        ],
        keywords: ["Family-wounded", "Abandoned", "Emotionally-insecure", "Healing", "Nurturing", "Belonging-creating", "Generational-healing", "Transformative"],
        developmentTips: [
            "Practice creating the emotional security and nurturing you never received",
            "Work on healing family wounds through therapy, inner child work, or family constellation healing",
            "Use your family healing journey to help others who have experienced similar wounds",
            "Learn to create chosen family and healthy emotional bonds with supportive people"
        ]
    },
    [House.Fifth]: {
        meaning: "Creative Wound Healer",
        shortDescription: "Your deepest wound involves creativity and self-expression, but through healing this, you help others reclaim their creative joy.",
        detailedDescription: "With Chiron in the 5th House, your core wound involves issues with creativity, self-expression, and joy. You may have experienced wounds around your creative abilities being criticized, rejected, or not valued. There may be deep pain around children, romance, or your ability to play and have fun. However, through your journey of healing these creative wounds, you develop profound wisdom about authentic self-expression and the healing power of creativity. Your healing allows you to help others reclaim their creative gifts and find joy in self-expression.",
        lifeAreaFocus: "Healing creative wounds and helping others reclaim joy and authentic self-expression",
        manifestation: [
            "Deep wounds around creativity, self-expression, and ability to experience joy",
            "Struggles with creative confidence, fear of artistic rejection, or inability to play",
            "Painful experiences around children, romance, or creative expression being devalued",
            "Journey of healing that develops wisdom about authentic expression and creative healing"
        ],
        opportunities: [
            "Excel in creative therapy, art healing, or helping others overcome creative blocks",
            "Use your healing journey to help others reclaim their creative gifts and find joy",
            "Develop expertise in using creativity as a healing modality for trauma and wounds",
            "Become a guide for others in expressing their authentic creative self without fear"
        ],
        challenges: [
            "May struggle with chronic creative blocks or fear of creative expression",
            "Tendency to either avoid creative pursuits or become obsessed with creative perfection",
            "Difficulty believing that your creative gifts have value or deserve to be shared",
            "May project creative wounds onto others or become overly critical of creative expression"
        ],
        keywords: ["Creatively-wounded", "Blocked", "Joy-deprived", "Healing", "Expressive", "Creative-healing", "Playful", "Transformative"],
        developmentTips: [
            "Practice expressing your creativity without fear of judgment or rejection",
            "Work on healing creative wounds through art therapy or supportive creative communities",
            "Use your creative healing journey to help others overcome similar blocks and fears",
            "Learn to value your creative gifts and share them as a form of healing service"
        ]
    },
    [House.Sixth]: {
        meaning: "Service Wound Healer",
        shortDescription: "Your deepest wound involves health and service, but through healing this, you become a powerful healer and guide for others' wellness.",
        detailedDescription: "With Chiron in the 6th House, your core wound involves issues with health, service, and daily routines. You may struggle with chronic health issues, perfectionism, or feeling like your service is never good enough. There may be deep wounds around being criticized for your work or feeling like you can't maintain healthy habits. However, through your journey of healing these service and health wounds, you develop profound wisdom about holistic wellness and meaningful service. Your healing allows you to help others overcome health challenges and find purpose through service.",
        lifeAreaFocus: "Healing health and service wounds while developing holistic wellness wisdom",
        manifestation: [
            "Deep wounds around health, service, and maintaining healthy daily routines",
            "Struggles with chronic health issues, perfectionism, or feeling inadequate in service",
            "Painful experiences with work criticism or inability to maintain wellness habits",
            "Journey of healing that develops wisdom about holistic health and meaningful service"
        ],
        opportunities: [
            "Excel in holistic healing, health coaching, or helping others overcome chronic conditions",
            "Use your healing journey to guide others in developing sustainable wellness practices",
            "Develop expertise in the mind-body connection and alternative healing approaches",
            "Become a wounded healer who helps others find purpose through service and wellness"
        ],
        challenges: [
            "May struggle with chronic health issues or obsessive perfectionism about wellness",
            "Tendency to either neglect self-care or become obsessed with health routines",
            "Difficulty believing that you can maintain health or provide valuable service",
            "May project health anxiety onto others or become overly critical of others' habits"
        ],
        keywords: ["Health-wounded", "Perfectionist", "Service-inadequate", "Healing", "Holistic", "Wellness-guiding", "Chronic", "Transformative"],
        developmentTips: [
            "Practice self-compassion around health challenges and imperfect service",
            "Work on healing the root causes of health issues through holistic approaches",
            "Use your health healing journey to help others who struggle with similar challenges",
            "Learn to provide service from a place of wholeness rather than wounded obligation"
        ]
    },
    [House.Seventh]: {
        meaning: "Relationship Wound Healer",
        shortDescription: "Your deepest wound involves partnerships and relationships, but through healing this, you become a powerful guide for healthy relating.",
        detailedDescription: "With Chiron in the 7th House, your core wound involves issues with partnerships, relationships, and one-on-one connections. You may struggle with feeling unlovable, attracting unhealthy partners, or repeating painful relationship patterns. There may be deep wounds around betrayal, abandonment, or feeling like you can't maintain healthy partnerships. However, through your journey of healing these relationship wounds, you develop profound wisdom about healthy relating and authentic partnership. Your healing allows you to help others create the loving relationships they deserve.",
        lifeAreaFocus: "Healing relationship wounds and developing wisdom about healthy partnership",
        manifestation: [
            "Deep wounds around partnerships, feeling unlovable, or attracting unhealthy relationships",
            "Struggles with betrayal, abandonment, or repeating painful relationship patterns",
            "Journey of healing that develops wisdom about healthy relating and authentic partnership",
            "Ability to help others create loving relationships and heal relationship trauma"
        ],
        opportunities: [
            "Excel in relationship counseling, couples therapy, or helping others heal relationship wounds",
            "Use your healing journey to guide others in creating healthy partnership dynamics",
            "Develop expertise in breaking relationship patterns and attracting healthy love",
            "Become a wounded healer who helps others learn to love and be loved authentically"
        ],
        challenges: [
            "May struggle with chronic relationship anxiety or fear of intimacy",
            "Tendency to either avoid relationships or become overly dependent on partners",
            "Difficulty trusting that you deserve healthy love and can maintain good relationships",
            "May project relationship wounds onto partners or repeat unhealthy patterns unconsciously"
        ],
        keywords: ["Relationship-wounded", "Unlovable-feeling", "Pattern-repeating", "Healing", "Partnership-wise", "Love-guiding", "Betrayed", "Transformative"],
        developmentTips: [
            "Practice self-love and healing your relationship with yourself first",
            "Work on healing relationship wounds through therapy or conscious relationship work",
            "Use your relationship healing journey to help others who struggle with similar patterns",
            "Learn to attract and maintain healthy partnerships based on mutual respect and growth"
        ]
    },
    [House.Eighth]: {
        meaning: "Transformation Wound Healer",
        shortDescription: "Your deepest wound involves transformation and shared resources, but through healing this, you master the art of deep healing.",
        detailedDescription: "With Chiron in the 8th House, your core wound involves issues with transformation, shared resources, and deep psychological material. You may struggle with trauma, loss, or feeling overwhelmed by life's intensity. There may be deep wounds around sexual abuse, financial betrayal, or feeling like you can't handle transformation. However, through your journey of healing these deep wounds, you develop profound wisdom about transformation and regeneration. Your healing allows you to help others navigate their darkest moments and emerge transformed.",
        lifeAreaFocus: "Healing deep transformation wounds and mastering regenerative healing wisdom",
        manifestation: [
            "Deep wounds around trauma, loss, and feeling overwhelmed by life's intensity",
            "Struggles with sexual abuse, financial betrayal, or fear of transformation",
            "Journey of healing that develops mastery of transformation and regeneration processes",
            "Ability to help others navigate dark nights of the soul and emerge transformed"
        ],
        opportunities: [
            "Excel in trauma therapy, crisis counseling, or deep transformational healing work",
            "Use your healing journey to guide others through their most challenging transformations",
            "Develop expertise in working with shared resources and healing financial trauma",
            "Become a master wounded healer who helps others transform their deepest wounds into wisdom"
        ],
        challenges: [
            "May struggle with chronic trauma symptoms or fear of deep transformation",
            "Tendency to either avoid intensity or become addicted to crisis and drama",
            "Difficulty trusting the transformation process or believing healing is possible",
            "May project transformation fears onto others or resist necessary changes"
        ],
        keywords: ["Trauma-wounded", "Transformation-fearful", "Intensity-overwhelmed", "Healing", "Regenerative", "Crisis-mastering", "Deep", "Transformative"],
        developmentTips: [
            "Practice working with trauma and transformation in safe, supported environments",
            "Work on healing deep wounds through specialized trauma therapy or somatic healing",
            "Use your transformation healing journey to help others who face similar challenges",
            "Learn to trust the regenerative power of transformation and your ability to heal"
        ]
    },
    [House.Ninth]: {
        meaning: "Wisdom Wound Healer",
        shortDescription: "Your deepest wound involves beliefs and higher learning, but through healing this, you become a wise teacher and guide.",
        detailedDescription: "With Chiron in the 9th House, your core wound involves issues with beliefs, higher learning, and spiritual understanding. You may struggle with feeling intellectually inadequate, having your beliefs criticized, or feeling disconnected from spiritual meaning. There may be deep wounds around religious trauma, educational failures, or feeling like you can't access higher wisdom. However, through your journey of healing these wisdom wounds, you develop profound understanding about authentic spirituality and learning. Your healing allows you to help others find their own path to wisdom and meaning.",
        lifeAreaFocus: "Healing wisdom wounds and developing authentic spiritual and intellectual understanding",
        manifestation: [
            "Deep wounds around beliefs, higher learning, and feeling intellectually or spiritually inadequate",
            "Struggles with religious trauma, educational failures, or disconnection from meaning",
            "Journey of healing that develops authentic spirituality and wisdom-seeking approaches",
            "Ability to help others find their own path to wisdom and spiritual understanding"
        ],
        opportunities: [
            "Excel in spiritual counseling, alternative education, or helping others heal religious trauma",
            "Use your healing journey to guide others in finding authentic spiritual and intellectual paths",
            "Develop expertise in bridging different wisdom traditions and learning approaches",
            "Become a wise teacher who helps others access higher understanding through healing"
        ],
        challenges: [
            "May struggle with chronic spiritual doubt or feeling intellectually inferior",
            "Tendency to either reject all beliefs or become fanatically attached to one system",
            "Difficulty trusting your own wisdom or believing you have something valuable to teach",
            "May project wisdom wounds onto others or become overly critical of others' beliefs"
        ],
        keywords: ["Wisdom-wounded", "Spiritually-doubtful", "Intellectually-inadequate", "Healing", "Truth-seeking", "Wisdom-teaching", "Meaning-making", "Transformative"],
        developmentTips: [
            "Practice developing your own authentic relationship with wisdom and spirituality",
            "Work on healing religious or educational trauma through supportive spiritual communities",
            "Use your wisdom healing journey to help others who struggle with similar spiritual wounds",
            "Learn to trust your own inner wisdom and share it as a form of healing service"
        ]
    },
    [House.Tenth]: {
        meaning: "Authority Wound Healer",
        shortDescription: "Your deepest wound involves authority and public recognition, but through healing this, you become an authentic leader.",
        detailedDescription: "With Chiron in the 10th House, your core wound involves issues with authority, career, and public recognition. You may struggle with feeling inadequate as a leader, having your authority challenged, or feeling like you can't achieve your goals. There may be deep wounds around public humiliation, career failures, or feeling like you don't deserve success. However, through your journey of healing these authority wounds, you develop profound wisdom about authentic leadership and meaningful achievement. Your healing allows you to help others step into their own authority and achieve their goals.",
        lifeAreaFocus: "Healing authority wounds and developing authentic leadership and achievement wisdom",
        manifestation: [
            "Deep wounds around authority, leadership, and feeling inadequate in public roles",
            "Struggles with public humiliation, career failures, or feeling undeserving of success",
            "Journey of healing that develops authentic leadership and meaningful achievement approaches",
            "Ability to help others step into their authority and achieve their meaningful goals"
        ],
        opportunities: [
            "Excel in leadership coaching, career counseling, or helping others overcome authority wounds",
            "Use your healing journey to guide others in developing authentic leadership styles",
            "Develop expertise in helping people achieve goals while maintaining integrity and authenticity",
            "Become an authentic leader who helps others heal their relationship with power and success"
        ],
        challenges: [
            "May struggle with chronic imposter syndrome or fear of public visibility",
            "Tendency to either avoid leadership roles or become overly controlling when in authority",
            "Difficulty believing you deserve success or can handle the responsibilities of leadership",
            "May project authority wounds onto others or become overly critical of leaders"
        ],
        keywords: ["Authority-wounded", "Leadership-inadequate", "Success-undeserving", "Healing", "Authentic-leading", "Achievement-guiding", "Public", "Transformative"],
        developmentTips: [
            "Practice stepping into leadership roles with authenticity and humility",
            "Work on healing authority wounds through mentorship or leadership development programs",
            "Use your authority healing journey to help others who struggle with similar leadership fears",
            "Learn to achieve success in ways that align with your values and serve others"
        ]
    },
    [House.Eleventh]: {
        meaning: "Community Wound Healer",
        shortDescription: "Your deepest wound involves friendship and belonging, but through healing this, you create healing communities for others.",
        detailedDescription: "With Chiron in the 11th House, your core wound involves issues with friendship, groups, and feeling like you belong. You may struggle with feeling like an outsider, being rejected by groups, or feeling like you can't maintain friendships. There may be deep wounds around social rejection, feeling different, or not fitting into collective ideals. However, through your journey of healing these community wounds, you develop profound wisdom about authentic belonging and inclusive community. Your healing allows you to help others find their tribe and create spaces where everyone belongs.",
        lifeAreaFocus: "Healing community wounds and creating inclusive spaces where everyone belongs",
        manifestation: [
            "Deep wounds around friendship, groups, and feeling like an outsider or different",
            "Struggles with social rejection, group exclusion, or inability to maintain friendships",
            "Journey of healing that develops wisdom about authentic belonging and inclusive community",
            "Ability to help others find their tribe and create healing communities"
        ],
        opportunities: [
            "Excel in community building, group therapy, or helping others heal social wounds",
            "Use your healing journey to create inclusive spaces where outsiders can find belonging",
            "Develop expertise in helping people build authentic friendships and social connections",
            "Become a community healer who helps others overcome social anxiety and rejection wounds"
        ],
        challenges: [
            "May struggle with chronic social anxiety or fear of group rejection",
            "Tendency to either isolate completely or become overly dependent on group approval",
            "Difficulty trusting that you can find authentic friendship and belonging",
            "May project social wounds onto others or become overly critical of group dynamics"
        ],
        keywords: ["Socially-wounded", "Outsider", "Rejection-fearful", "Healing", "Community-building", "Belonging-creating", "Inclusive", "Transformative"],
        developmentTips: [
            "Practice building authentic friendships based on mutual acceptance and understanding",
            "Work on healing social wounds through supportive group therapy or community involvement",
            "Use your community healing journey to help others who feel like outsiders find belonging",
            "Learn to create inclusive communities where differences are celebrated rather than rejected"
        ]
    },
    [House.Twelfth]: {
        meaning: "Spiritual Wound Healer",
        shortDescription: "Your deepest wound involves spirituality and surrender, but through healing this, you become a channel for divine healing.",
        detailedDescription: "With Chiron in the 12th House, your core wound involves issues with spirituality, surrender, and connection to the divine. You may struggle with feeling spiritually abandoned, having difficulty with faith, or feeling overwhelmed by psychic sensitivity. There may be deep wounds around spiritual abuse, feeling disconnected from the divine, or being unable to surrender control. However, through your journey of healing these spiritual wounds, you develop profound wisdom about authentic spirituality and divine connection. Your healing allows you to help others heal their relationship with the divine and find peace through surrender.",
        lifeAreaFocus: "Healing spiritual wounds and developing authentic divine connection and surrender",
        manifestation: [
            "Deep wounds around spirituality, feeling abandoned by the divine, or overwhelmed by sensitivity",
            "Struggles with spiritual abuse, loss of faith, or inability to surrender control",
            "Journey of healing that develops authentic spirituality and divine connection",
            "Ability to help others heal their relationship with the divine and find peace through surrender"
        ],
        opportunities: [
            "Excel in spiritual healing, pastoral counseling, or helping others overcome spiritual trauma",
            "Use your healing journey to guide others in developing authentic spiritual practices",
            "Develop expertise in working with psychic sensitivity and spiritual boundaries",
            "Become a spiritual wounded healer who helps others find their own divine connection"
        ],
        challenges: [
            "May struggle with chronic spiritual doubt or feeling abandoned by the divine",
            "Tendency to either reject spirituality completely or become lost in spiritual bypassing",
            "Difficulty trusting the divine or believing you deserve spiritual connection and guidance",
            "May project spiritual wounds onto others or become overly critical of spiritual practices"
        ],
        keywords: ["Spiritually-wounded", "Divinely-abandoned", "Faith-struggling", "Healing", "Surrender-learning", "Divine-connecting", "Sensitive", "Transformative"],
        developmentTips: [
            "Practice developing your own authentic relationship with the divine through personal experience",
            "Work on healing spiritual wounds through compassionate spiritual direction or therapy",
            "Use your spiritual healing journey to help others who struggle with similar spiritual wounds",
            "Learn to surrender control while maintaining healthy spiritual boundaries and discernment"
        ]
    }
};
export const PLANET_HOUSE_INTERPRETATIONS: Record<Planet, Partial<Record<House, PlanetHouseInterpretation>>> = {
    [Planet.Sun]: SUN_HOUSE_INTERPRETATIONS,
    [Planet.Moon]: MOON_HOUSE_INTERPRETATIONS,
    [Planet.Mercury]: MERCURY_HOUSE_INTERPRETATIONS,
    [Planet.Venus]: VENUS_HOUSE_INTERPRETATIONS,
    [Planet.Mars]: MARS_HOUSE_INTERPRETATIONS,
    [Planet.Jupiter]: JUPITER_HOUSE_INTERPRETATIONS,
    [Planet.Saturn]: SATURN_HOUSE_INTERPRETATIONS,
    [Planet.Uranus]: URANUS_HOUSE_INTERPRETATIONS,
    [Planet.Neptune]: NEPTUNE_HOUSE_INTERPRETATIONS,
    [Planet.Pluto]: PLUTO_HOUSE_INTERPRETATIONS,
    [Planet.NorthNode]: NORTH_NODE_HOUSE_INTERPRETATIONS,
    [Planet.SouthNode]: SOUTH_NODE_HOUSE_INTERPRETATIONS,
    [Planet.Chiron]: CHIRON_HOUSE_INTERPRETATIONS
};