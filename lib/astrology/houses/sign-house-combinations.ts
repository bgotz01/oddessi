import { ZodiacSign } from '@/types/astrology';

// Interface for sign-house combination interpretations
export interface SignHouseInterpretation {
    combination: string; // e.g., "Aries on 1st House"
    essence: string; // 2-4 word core meaning
    description: string; // Detailed explanation of how this sign influences this house
    approach: string; // How you approach this life area
    strengths: string[]; // 3-4 strengths this combination brings
    challenges: string[]; // 3-4 potential challenges
    keywords: string[]; // 5-8 relevant keywords
    lifeExpression: string; // How this shows up in daily life
}

// Service to get sign-house interpretations
export class SignHouseInterpretationService {
    static getSignHouseInterpretation(sign: string, house: number): SignHouseInterpretation | null {
        // We have Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, and Scorpio interpretations
        // We'll expand this as we add more signs
        switch (sign) {
            case 'Aries':
                return ARIES_HOUSE_INTERPRETATIONS[house] || null;
            case 'Taurus':
                return TAURUS_HOUSE_INTERPRETATIONS[house] || null;
            case 'Gemini':
                return GEMINI_HOUSE_INTERPRETATIONS[house] || null;
            case 'Cancer':
                return CANCER_HOUSE_INTERPRETATIONS[house] || null;
            case 'Leo':
                return LEO_HOUSE_INTERPRETATIONS[house] || null;
            case 'Virgo':
                return VIRGO_HOUSE_INTERPRETATIONS[house] || null;
            case 'Libra':
                return LIBRA_HOUSE_INTERPRETATIONS[house] || null;
            case 'Scorpio':
                return SCORPIO_HOUSE_INTERPRETATIONS[house] || null;
            case 'Sagittarius':
                return SAGITTARIUS_HOUSE_INTERPRETATIONS[house] || null;
            case 'Capricorn':
                return CAPRICORN_HOUSE_INTERPRETATIONS[house] || null;
            case 'Aquarius':
                return AQUARIUS_HOUSE_INTERPRETATIONS[house] || null;
            case 'Pisces':
                return PISCES_HOUSE_INTERPRETATIONS[house] || null;
            default:
                // Return a generic interpretation for other signs
                return {
                    combination: `${sign} on ${house}${this.getOrdinalSuffix(house)} House`,
                    essence: "Unique Expression",
                    description: `With ${sign} on your ${house}${this.getOrdinalSuffix(house)} house cusp, the energy of ${sign} influences how you approach this life area. This combination brings the qualities of ${sign} - such as its element, modality, and ruling planet - into the themes governed by the ${house}${this.getOrdinalSuffix(house)} house.`,
                    approach: `You approach this life area with the characteristic energy and style of ${sign}.`,
                    strengths: [
                        `${sign} energy enhances your natural abilities in this area`,
                        "Unique perspective on this life domain",
                        "Authentic expression of your true nature",
                        "Natural alignment with your cosmic blueprint"
                    ],
                    challenges: [
                        "May need to balance different energies and approaches",
                        "Learning to integrate sign qualities with house themes",
                        "Developing awareness of unconscious patterns",
                        "Finding the right expression for this combination"
                    ],
                    keywords: [sign, "House Cusp", "Life Area", "Expression", "Energy", "Approach", "Natural Style", "Cosmic Influence"],
                    lifeExpression: `The energy of ${sign} colors how you naturally approach and express yourself in this important life area.`
                };
        }
    }

    private static getOrdinalSuffix(num: number): string {
        const j = num % 10;
        const k = num % 100;
        if (j === 1 && k !== 11) return "st";
        if (j === 2 && k !== 12) return "nd";
        if (j === 3 && k !== 13) return "rd";
        return "th";
    }
}

// Aries on House Cusps
export const ARIES_HOUSE_INTERPRETATIONS: Record<number, SignHouseInterpretation> = {
    1: {
        combination: "Aries on 1st House",
        essence: "Dynamic Pioneer",
        description: "With Aries on your 1st house cusp (Ascendant), you project an image of confidence, energy, and leadership. You approach life head-on with enthusiasm and courage. Others see you as someone who takes initiative and isn't afraid to start new ventures. Your natural impulse is to act first and think later, which gives you a reputation for being spontaneous and direct.",
        approach: "You tackle life with boldness and immediate action, preferring to lead rather than follow.",
        strengths: [
            "Natural leadership abilities and pioneering spirit",
            "High energy and enthusiasm for new beginnings",
            "Courage to take risks and face challenges head-on",
            "Authentic, direct communication style"
        ],
        challenges: [
            "May act impulsively without considering consequences",
            "Tendency to be impatient with slower-moving people or processes",
            "Can come across as aggressive or pushy",
            "Difficulty with long-term planning and patience"
        ],
        keywords: ["Leadership", "Initiative", "Energy", "Courage", "Directness", "Independence", "Action", "Pioneering"],
        lifeExpression: "You're known for your dynamic presence and ability to get things started, often being the first to volunteer or take charge in new situations."
    },
    2: {
        combination: "Aries on 2nd House",
        essence: "Aggressive Earner",
        description: "With Aries on your 2nd house cusp, you approach money and possessions with the same energy and directness you bring to everything else. You're motivated to earn through your own efforts and may be drawn to competitive or pioneering ways of making money. You value independence in financial matters and prefer to build your resources through active, hands-on approaches rather than passive investments.",
        approach: "You pursue financial security through bold action and competitive advantage.",
        strengths: [
            "Strong drive to earn and achieve financial independence",
            "Willingness to take calculated risks for financial gain",
            "Entrepreneurial instincts for new money-making opportunities",
            "Quick decision-making in financial matters"
        ],
        challenges: [
            "May be impulsive with spending or investment decisions",
            "Tendency to prioritize quick gains over long-term stability",
            "Can be overly competitive about money and possessions",
            "Impatience with slow, steady wealth-building strategies"
        ],
        keywords: ["Financial Independence", "Entrepreneurship", "Risk-Taking", "Competition", "Self-Reliance", "Quick Gains", "Active Earning", "Bold Investments"],
        lifeExpression: "You actively pursue financial opportunities and aren't afraid to take risks to build your wealth, often preferring to earn through your own initiative rather than traditional methods."
    },
    3: {
        combination: "Aries on 3rd House",
        essence: "Direct Communicator",
        description: "With Aries on your 3rd house cusp, your communication style is direct, energetic, and often pioneering. You speak your mind without hesitation and prefer straightforward conversations over diplomatic subtleties. Your thinking is quick and decisive, and you may be drawn to new forms of communication or technology. You approach learning with enthusiasm but may prefer hands-on experience over theoretical study.",
        approach: "You communicate with directness and energy, preferring action-oriented conversations.",
        strengths: [
            "Clear, honest communication that cuts through confusion",
            "Quick thinking and rapid information processing",
            "Enthusiasm for learning new skills and technologies",
            "Natural ability to motivate others through words"
        ],
        challenges: [
            "May speak before thinking, leading to misunderstandings",
            "Tendency to be impatient with detailed explanations",
            "Can come across as blunt or insensitive in communication",
            "Difficulty with subjects requiring sustained concentration"
        ],
        keywords: ["Direct Communication", "Quick Thinking", "Honesty", "Innovation", "Motivation", "Technology", "Action-Oriented", "Pioneering Ideas"],
        lifeExpression: "You're known for your straightforward communication style and ability to quickly grasp and share new concepts, often being the first to try new communication methods or technologies."
    },
    4: {
        combination: "Aries on 4th House",
        essence: "Independent Foundation",
        description: "With Aries on your 4th house cusp, you approach home and family matters with independence and leadership. You may have grown up in a household that valued self-reliance and initiative, or you naturally took on a leadership role within your family. Your concept of home involves freedom and the ability to do things your own way. You prefer to create your own family traditions rather than simply following inherited ones.",
        approach: "You build your emotional foundation through independence and self-determination.",
        strengths: [
            "Strong sense of personal independence within family relationships",
            "Ability to create new family traditions and break old patterns",
            "Leadership qualities that benefit family and household management",
            "Courage to establish boundaries and protect your personal space"
        ],
        challenges: [
            "May struggle with traditional family expectations or roles",
            "Tendency to be impatient with family members who move more slowly",
            "Can be too independent, missing opportunities for family bonding",
            "Difficulty accepting help or support from family members"
        ],
        keywords: ["Independence", "Leadership", "New Traditions", "Self-Reliance", "Innovation", "Personal Space", "Family Pioneer", "Emotional Courage"],
        lifeExpression: "You create a home environment that supports independence and innovation, often being the family member who initiates changes or breaks new ground in family dynamics."
    },
    5: {
        combination: "Aries on 5th House",
        essence: "Passionate Creator",
        description: "With Aries on your 5th house cusp, you approach creativity, romance, and self-expression with passion and boldness. Your creative projects tend to be energetic and pioneering, often breaking new ground or trying innovative approaches. In romance, you're direct and enthusiastic, preferring passionate connections over subtle courtship. You may be drawn to competitive sports or activities that allow you to express your dynamic nature.",
        approach: "You express yourself creatively through bold, passionate, and pioneering endeavors.",
        strengths: [
            "Passionate, energetic approach to creative projects",
            "Natural leadership in recreational and creative activities",
            "Honest, direct approach to romantic relationships",
            "Willingness to take creative risks and try new forms of expression"
        ],
        challenges: [
            "May start many creative projects but struggle to finish them",
            "Tendency to be impatient with the slow development of skills",
            "Can be too intense or overwhelming in romantic situations",
            "Difficulty with creative activities that require patience and refinement"
        ],
        keywords: ["Creative Passion", "Romantic Boldness", "Artistic Innovation", "Competitive Spirit", "Self-Expression", "Creative Leadership", "Passionate Love", "Dynamic Recreation"],
        lifeExpression: "You pursue creative and romantic endeavors with enthusiasm and courage, often being the first to try new forms of artistic expression or recreational activities."
    },
    6: {
        combination: "Aries on 6th House",
        essence: "Dynamic Worker",
        description: "With Aries on your 6th house cusp, you approach work, health, and daily routines with energy and leadership. You prefer jobs that allow you to take initiative and see immediate results. Your work style is direct and efficient, though you may struggle with routine tasks that don't challenge you. In health matters, you prefer active, physical approaches to wellness and may be drawn to competitive sports or high-energy fitness routines.",
        approach: "You tackle work and health with energy, preferring active and challenging approaches.",
        strengths: [
            "High energy and enthusiasm for work projects",
            "Natural leadership abilities in workplace settings",
            "Preference for physical, active approaches to health and fitness",
            "Ability to motivate others and initiate workplace improvements"
        ],
        challenges: [
            "May become impatient with routine or repetitive tasks",
            "Tendency to take on too much work or burn out from overexertion",
            "Can be impatient with coworkers who work at a different pace",
            "May neglect health maintenance in favor of intense, sporadic efforts"
        ],
        keywords: ["Work Leadership", "High Energy", "Physical Fitness", "Initiative", "Efficiency", "Active Health", "Workplace Innovation", "Dynamic Service"],
        lifeExpression: "You bring energy and leadership to your work environment and prefer active, challenging approaches to maintaining your health and daily routines."
    },
    7: {
        combination: "Aries on 7th House",
        essence: "Independent Partner",
        description: "With Aries on your 7th house cusp, you're attracted to partners who are independent, confident, and dynamic. You may seek relationships that allow both partners to maintain their individuality while supporting each other's goals. In business partnerships, you prefer arrangements where you can take initiative and lead. You're drawn to partners who challenge you and aren't afraid to engage in healthy competition or debate.",
        approach: "You seek partnerships that honor independence while fostering mutual growth and challenge.",
        strengths: [
            "Attraction to strong, independent partners who complement your energy",
            "Ability to maintain individuality within committed relationships",
            "Natural leadership in partnership dynamics and shared goals",
            "Honest, direct communication in relationship conflicts"
        ],
        challenges: [
            "May be too competitive or dominating in partnerships",
            "Tendency to attract partners who are equally strong-willed, leading to conflicts",
            "Difficulty compromising or sharing decision-making authority",
            "Impatience with partners who need more time to make decisions"
        ],
        keywords: ["Independent Partnership", "Strong Attraction", "Mutual Challenge", "Leadership", "Honest Communication", "Individual Growth", "Dynamic Relationships", "Competitive Love"],
        lifeExpression: "You form partnerships with strong, independent individuals and work to balance your need for leadership with the requirements of cooperation and mutual respect."
    },
    8: {
        combination: "Aries on 8th House",
        essence: "Transformational Pioneer",
        description: "With Aries on your 8th house cusp, you approach transformation, shared resources, and deep psychological work with courage and directness. You're not afraid to confront difficult truths or undergo major life changes. In matters of shared finances or resources, you prefer to take an active role rather than being passive. You may be drawn to pioneering work in psychology, healing, or other transformational fields.",
        approach: "You face transformation and deep change with courage and direct action.",
        strengths: [
            "Courage to face difficult truths and undergo major transformations",
            "Direct, honest approach to psychological and emotional healing",
            "Leadership in managing shared resources and joint finances",
            "Pioneering spirit in exploring taboo or hidden subjects"
        ],
        challenges: [
            "May be too forceful or impatient with the natural pace of transformation",
            "Tendency to rush through emotional processing or healing work",
            "Can be overly direct about sensitive or taboo subjects",
            "Difficulty accepting help or support during vulnerable times"
        ],
        keywords: ["Transformational Courage", "Direct Healing", "Resource Leadership", "Psychological Pioneering", "Honest Confrontation", "Active Change", "Fearless Exploration", "Independent Transformation"],
        lifeExpression: "You courageously face life's deeper challenges and transformations, often pioneering new approaches to healing and personal growth while maintaining your independence through change."
    },
    9: {
        combination: "Aries on 9th House",
        essence: "Philosophical Pioneer",
        description: "With Aries on your 9th house cusp, you approach higher learning, philosophy, and spiritual matters with enthusiasm and independence. You prefer to form your own beliefs rather than accepting traditional teachings without question. Your approach to education is hands-on and experiential, and you may be drawn to travel or adventures that expand your worldview. You're likely to be a pioneer in philosophical or spiritual thinking.",
        approach: "You pursue wisdom and higher knowledge through independent exploration and direct experience.",
        strengths: [
            "Independent thinking and willingness to challenge traditional beliefs",
            "Enthusiastic approach to learning and expanding your worldview",
            "Courage to explore new philosophical or spiritual territories",
            "Natural teaching ability that inspires others to think for themselves"
        ],
        challenges: [
            "May be too quick to dismiss traditional wisdom or established teachings",
            "Tendency to be impatient with formal educational structures",
            "Can be overly confident in your own philosophical conclusions",
            "Difficulty accepting guidance from teachers or mentors"
        ],
        keywords: ["Independent Philosophy", "Educational Pioneer", "Spiritual Courage", "Experiential Learning", "Travel Adventure", "Teaching Innovation", "Belief Leadership", "Wisdom Seeking"],
        lifeExpression: "You actively seek wisdom through direct experience and independent study, often developing unique philosophical perspectives that you share with enthusiasm and conviction."
    },
    10: {
        combination: "Aries on 10th House",
        essence: "Career Pioneer",
        description: "With Aries on your 10th house cusp (Midheaven), you're drawn to careers that allow you to lead, innovate, and take initiative. Your professional reputation is built on your ability to start new projects and take decisive action. You prefer to be your own boss or work in positions where you have significant autonomy. Your career path may involve pioneering new fields or approaches within your chosen profession.",
        approach: "You build your career through leadership, innovation, and pioneering new professional territories.",
        strengths: [
            "Natural leadership abilities that advance your professional standing",
            "Courage to take career risks and pursue innovative opportunities",
            "High energy and enthusiasm that drives professional success",
            "Ability to initiate new projects and lead teams effectively"
        ],
        challenges: [
            "May be impatient with the slow pace of career advancement",
            "Tendency to take on too many professional responsibilities",
            "Can be overly competitive with colleagues or superiors",
            "Difficulty working under micromanagement or restrictive authority"
        ],
        keywords: ["Career Leadership", "Professional Innovation", "Executive Energy", "Pioneering Success", "Independent Authority", "Competitive Advantage", "Initiative Taking", "Professional Courage"],
        lifeExpression: "You build a professional reputation based on your ability to lead, innovate, and take decisive action, often becoming known as a pioneer or trailblazer in your field."
    },
    11: {
        combination: "Aries on 11th House",
        essence: "Group Leader",
        description: "With Aries on your 11th house cusp, you approach friendships and group activities with leadership and enthusiasm. You're often the one who initiates group activities or takes charge in social organizations. Your hopes and dreams are bold and ambitious, and you prefer to take active steps toward achieving them rather than waiting for opportunities to come to you. You may be drawn to groups focused on innovation or social change.",
        approach: "You lead and energize your social groups while pursuing ambitious dreams through direct action.",
        strengths: [
            "Natural leadership in group settings and social organizations",
            "Ability to inspire friends and groups toward common goals",
            "Bold, ambitious dreams and the courage to pursue them",
            "Enthusiasm that energizes social networks and communities"
        ],
        challenges: [
            "May be too dominating in group dynamics or friendships",
            "Tendency to be impatient with group consensus-building processes",
            "Can be overly competitive within social circles",
            "Difficulty accepting that some dreams require long-term patience"
        ],
        keywords: ["Social Leadership", "Group Innovation", "Ambitious Dreams", "Friendship Initiative", "Community Energy", "Goal Achievement", "Social Pioneering", "Network Building"],
        lifeExpression: "You naturally take leadership roles in your social circles and work actively toward achieving your ambitious dreams, often inspiring others to join you in pursuing bold goals."
    },
    12: {
        combination: "Aries on 12th House",
        essence: "Hidden Warrior",
        description: "With Aries on your 12th house cusp, your spiritual and subconscious life is characterized by a hidden warrior energy. You may have unconscious patterns of aggression or impatience that need to be understood and integrated. Your spiritual path involves learning to channel your natural leadership and initiative in service to something greater than yourself. You may be drawn to behind-the-scenes leadership or anonymous service work.",
        approach: "You explore your spiritual and subconscious life through courageous self-examination and service.",
        strengths: [
            "Courage to face and integrate shadow aspects of personality",
            "Hidden leadership abilities that emerge in times of crisis",
            "Spiritual warrior energy that fights for justice and truth",
            "Ability to serve others without need for recognition or credit"
        ],
        challenges: [
            "Unconscious patterns of aggression or impatience may create problems",
            "Tendency to suppress natural leadership instincts inappropriately",
            "May struggle with anger or frustration that has no clear outlet",
            "Difficulty accepting the need for patience in spiritual development"
        ],
        keywords: ["Hidden Leadership", "Spiritual Warrior", "Unconscious Patterns", "Anonymous Service", "Shadow Integration", "Spiritual Courage", "Behind-the-Scenes", "Selfless Action"],
        lifeExpression: "You work to understand and integrate your unconscious patterns while channeling your natural leadership energy in service to spiritual growth and helping others from behind the scenes."
    }
};
// Scorpio on House Cusps
export const SCORPIO_HOUSE_INTERPRETATIONS: Record<number, SignHouseInterpretation> = {
    1: {
        combination: "Scorpio on 1st House",
        essence: "Intense Transformer",
        description: "With Scorpio on your 1st house cusp (Ascendant), you project an image of intensity, power, and magnetic depth. Others see you as someone who is penetrating, mysterious, and emotionally powerful. You approach life with passionate intensity and a desire to understand the deeper truths beneath surface appearances. Your presence is commanding and transformative, and you have a natural ability to see through pretense and get to the heart of matters. People are either drawn to or intimidated by your powerful energy.",
        approach: "You tackle life with intensity, depth, and a transformative power that seeks truth beneath surface appearances.",
        strengths: [
            "Powerful presence and magnetic personality that commands attention",
            "Deep emotional intelligence and ability to understand hidden motivations",
            "Transformative energy that helps you overcome any obstacle",
            "Penetrating insight that sees through deception and pretense"
        ],
        challenges: [
            "May be too intense or overwhelming for some people",
            "Tendency to be suspicious or distrustful of others' motives",
            "Can be controlling or manipulative when feeling threatened",
            "Difficulty with vulnerability or showing emotional weakness"
        ],
        keywords: ["Intensity", "Transformation", "Power", "Depth", "Mystery", "Penetration", "Magnetism", "Emotional Strength"],
        lifeExpression: "You're known for your intense, powerful presence and ability to transform yourself and situations, often being the person others turn to when they need deep understanding or powerful change."
    },
    2: {
        combination: "Scorpio on 2nd House",
        essence: "Resource Investigator",
        description: "With Scorpio on your 2nd house cusp, you approach money and possessions with intensity and a desire for control and transformation. You're naturally drawn to understanding the deeper dynamics of wealth and may be skilled at managing investments, taxes, or other people's money. Your relationship with resources is passionate and sometimes extreme - you may experience significant financial transformations throughout your life. You value power and control that money can provide.",
        approach: "You build wealth through intense focus, strategic investment, and understanding the hidden dynamics of money and power.",
        strengths: [
            "Natural ability to understand and manage complex financial situations",
            "Intense focus that helps you build substantial wealth over time",
            "Skill at uncovering hidden financial opportunities or problems",
            "Transformative approach that can recover from financial setbacks"
        ],
        challenges: [
            "May be obsessive or controlling about money and possessions",
            "Tendency to experience extreme financial ups and downs",
            "Can be secretive about financial matters or resources",
            "Difficulty trusting others with financial decisions or shared resources"
        ],
        keywords: ["Financial Intensity", "Resource Control", "Investment Power", "Money Transformation", "Hidden Wealth", "Strategic Finance", "Deep Value", "Financial Investigation"],
        lifeExpression: "You approach finances with intensity and strategic thinking, often becoming skilled at managing complex financial situations and helping others transform their relationship with money."
    },
    3: {
        combination: "Scorpio on 3rd House",
        essence: "Penetrating Communicator",
        description: "With Scorpio on your 3rd house cusp, your communication style is intense, penetrating, and focused on uncovering hidden truths. You prefer deep, meaningful conversations over superficial small talk and have a gift for getting people to reveal their secrets. Your learning style is investigative and thorough, and you excel at research that requires digging beneath surface information. You may have a talent for psychology, investigation, or any field that involves uncovering hidden information.",
        approach: "You communicate with intensity and depth, seeking to uncover and share hidden truths and deeper meanings.",
        strengths: [
            "Exceptional ability to uncover hidden information and deeper truths",
            "Penetrating communication style that gets to the heart of matters",
            "Investigative learning approach that leads to thorough understanding",
            "Natural talent for psychology and understanding human motivations"
        ],
        challenges: [
            "May be too intense or probing in casual conversations",
            "Tendency to be suspicious of surface information or explanations",
            "Can be secretive about your own thoughts and information",
            "Difficulty with light, superficial communication when depth is needed"
        ],
        keywords: ["Deep Communication", "Investigative Learning", "Hidden Truth", "Penetrating Insight", "Psychological Understanding", "Secret Knowledge", "Intense Discussion", "Transformative Information"],
        lifeExpression: "You communicate with penetrating insight and uncover hidden truths, often being valued for your ability to understand and reveal the deeper meanings behind surface information."
    },
    4: {
        combination: "Scorpio on 4th House",
        essence: "Deep Foundation",
        description: "With Scorpio on your 4th house cusp, your emotional foundation is built on intensity, transformation, and deep psychological understanding. Your family background may have involved secrets, power dynamics, or transformative experiences that shaped your emotional depth. You need a private, secure home base where you can retreat and regenerate your powerful energy. Your connection to family and roots may be complex but profoundly transformative.",
        approach: "You build your emotional foundation through deep psychological work and creating secure, private spaces for transformation and regeneration.",
        strengths: [
            "Deep emotional resilience and ability to transform through family experiences",
            "Natural understanding of family psychology and hidden dynamics",
            "Ability to create powerful, transformative home environments",
            "Strong connection to ancestral wisdom and family secrets"
        ],
        challenges: [
            "May carry family secrets or emotional burdens that need healing",
            "Tendency to be controlling or possessive about home and family",
            "Can be secretive about family matters or personal history",
            "Difficulty trusting others with your deepest emotional needs"
        ],
        keywords: ["Deep Roots", "Family Transformation", "Emotional Intensity", "Private Foundation", "Ancestral Secrets", "Psychological Home", "Regenerative Space", "Hidden Heritage"],
        lifeExpression: "You create deep, transformative emotional foundations and may serve as the family member who understands and helps heal hidden psychological patterns and family secrets."
    },
    5: {
        combination: "Scorpio on 5th House",
        essence: "Passionate Creator",
        description: "With Scorpio on your 5th house cusp, your creative expression is intense, transformative, and emotionally powerful. You're drawn to creative activities that explore deep themes, psychological complexity, or transformative experiences. In romance, you seek passionate, soul-deep connections and may experience intense, transformative relationships. Your creative work often deals with taboo subjects, psychological depths, or themes of death and rebirth.",
        approach: "You express creativity through intense passion and seek romantic relationships that offer deep, transformative emotional connection.",
        strengths: [
            "Powerful creative expression that transforms and moves others deeply",
            "Passionate romantic nature that creates intense, meaningful connections",
            "Ability to explore and express complex psychological and emotional themes",
            "Natural talent for creative work that deals with transformation and healing"
        ],
        challenges: [
            "May be too intense or overwhelming in romantic relationships",
            "Tendency to be possessive or jealous in love and creative partnerships",
            "Can be secretive about creative work or romantic feelings",
            "Difficulty with light, casual creative expression or romantic encounters"
        ],
        keywords: ["Passionate Creation", "Intense Romance", "Transformative Art", "Deep Love", "Emotional Power", "Creative Depth", "Soul Connection", "Regenerative Expression"],
        lifeExpression: "You create with passionate intensity and love with deep emotional power, often producing transformative art and relationships that touch the soul and promote healing."
    },
    6: {
        combination: "Scorpio on 6th House",
        essence: "Intense Worker",
        description: "With Scorpio on your 6th house cusp, you approach work with intensity, focus, and a desire to transform and improve systems. You're drawn to careers that involve investigation, healing, psychology, or working with crisis situations. Your work style is thorough and penetrating, and you excel at uncovering problems and creating powerful solutions. In health matters, you understand the deep connection between emotions and physical wellbeing and may be drawn to transformative healing approaches.",
        approach: "You approach work and health with intensity and focus, seeking to transform and heal through your dedicated service.",
        strengths: [
            "Exceptional focus and intensity that leads to thorough, transformative work",
            "Natural ability to diagnose and solve complex problems",
            "Understanding of the deep connections between emotional and physical health",
            "Skill at working in crisis situations or with difficult, transformative cases"
        ],
        challenges: [
            "May become obsessed with work projects or health concerns",
            "Tendency to be controlling or critical of coworkers' methods",
            "Can be secretive about work processes or health issues",
            "Difficulty with routine work that doesn't offer depth or transformation"
        ],
        keywords: ["Intense Work", "Transformative Service", "Deep Healing", "Crisis Management", "Investigative Labor", "Emotional Health", "Powerful Focus", "Regenerative Work"],
        lifeExpression: "You work with intense focus and dedication, often excelling in fields that require deep investigation, crisis management, or transformative healing of complex problems."
    },
    7: {
        combination: "Scorpio on 7th House",
        essence: "Transformative Partner",
        description: "With Scorpio on your 7th house cusp, you're attracted to partners who are intense, powerful, and capable of deep transformation. You seek relationships that offer profound emotional and psychological connection, and you're drawn to partners who can match your intensity and depth. In business partnerships, you prefer working with people who are committed, trustworthy, and capable of handling complex or challenging situations. Your relationships tend to be transformative experiences that change you at a deep level.",
        approach: "You seek partnerships that offer deep transformation, intense connection, and the potential for profound mutual growth.",
        strengths: [
            "Ability to create deeply transformative, soul-level partnerships",
            "Natural attraction to powerful, committed partners",
            "Skill at working through complex relationship dynamics and challenges",
            "Capacity for profound loyalty and emotional depth in partnerships"
        ],
        challenges: [
            "May be too intense or demanding in relationships",
            "Tendency to be possessive, jealous, or controlling with partners",
            "Can be suspicious or distrustful of partners' motives",
            "Difficulty with casual or superficial relationship dynamics"
        ],
        keywords: ["Transformative Partnership", "Intense Connection", "Deep Commitment", "Powerful Attraction", "Soul Bonding", "Emotional Depth", "Loyal Devotion", "Psychological Union"],
        lifeExpression: "You form intense, transformative partnerships that involve deep emotional and psychological connection, often experiencing relationships that fundamentally change and evolve both partners."
    },
    8: {
        combination: "Scorpio on 8th House",
        essence: "Natural Investigator",
        description: "With Scorpio on your 8th house cusp, you have a natural affinity for the themes of this house - transformation, shared resources, psychology, and life's deeper mysteries. You're drawn to understanding the hidden workings of life and may excel in fields like psychology, investigation, finance, or healing work. Your transformations are profound and complete, and you have a natural ability to help others through their own transformative processes. You understand power dynamics and the psychology of human behavior at a deep level.",
        approach: "You navigate transformation and deep mysteries with natural skill, serving as a guide for others through life's most profound changes.",
        strengths: [
            "Natural understanding of transformation, psychology, and hidden dynamics",
            "Exceptional ability to help others through crisis and transformative experiences",
            "Skill at managing shared resources, investments, and complex financial matters",
            "Deep insight into human nature and the mysteries of life and death"
        ],
        challenges: [
            "May become obsessed with control or power in transformative situations",
            "Tendency to be secretive about your own transformative processes",
            "Can be manipulative or controlling when dealing with shared resources",
            "Difficulty trusting others with your deepest vulnerabilities"
        ],
        keywords: ["Natural Transformation", "Deep Investigation", "Psychological Mastery", "Hidden Power", "Crisis Navigation", "Shared Resources", "Life Mysteries", "Regenerative Healing"],
        lifeExpression: "You naturally understand and navigate life's deepest mysteries and transformations, often serving as a guide and healer for others going through profound changes."
    },
    9: {
        combination: "Scorpio on 9th House",
        essence: "Deep Seeker",
        description: "With Scorpio on your 9th house cusp, you approach higher learning, philosophy, and spiritual matters with intensity and a desire to uncover ultimate truths. You're drawn to belief systems that address the deeper mysteries of existence and may be interested in occult studies, depth psychology, or transformative spiritual practices. Your approach to education is investigative and thorough, and you seek wisdom that can transform your understanding of life at the deepest level.",
        approach: "You pursue wisdom and higher knowledge through intense investigation and seek truths that can transform your understanding of existence.",
        strengths: [
            "Deep, investigative approach to philosophical and spiritual questions",
            "Natural ability to understand and teach transformative wisdom",
            "Attraction to profound, life-changing educational experiences",
            "Skill at uncovering hidden spiritual or philosophical truths"
        ],
        challenges: [
            "May be obsessive about finding ultimate truth or perfect belief system",
            "Tendency to be dogmatic or intense about philosophical or spiritual beliefs",
            "Can be secretive about your spiritual practices or beliefs",
            "Difficulty with superficial or purely intellectual approaches to wisdom"
        ],
        keywords: ["Deep Wisdom", "Transformative Learning", "Spiritual Investigation", "Hidden Truth", "Intense Study", "Profound Philosophy", "Occult Knowledge", "Regenerative Beliefs"],
        lifeExpression: "You seek and share profound wisdom that transforms understanding, often being drawn to deep spiritual or philosophical studies that reveal life's hidden mysteries."
    },
    10: {
        combination: "Scorpio on 10th House",
        essence: "Powerful Leader",
        description: "With Scorpio on your 10th house cusp (Midheaven), you build your career and reputation through powerful leadership and transformative work. You're drawn to professions that involve investigation, healing, crisis management, or working with power and transformation. Your professional reputation is built on your ability to handle difficult situations, uncover hidden problems, and create powerful solutions. You may be drawn to careers in psychology, medicine, investigation, or any field that involves transformation and regeneration.",
        approach: "You build your career through powerful leadership and transformative work that addresses deep problems and creates lasting change.",
        strengths: [
            "Powerful leadership presence that commands respect and authority",
            "Natural ability to handle crisis situations and complex problems",
            "Skill at uncovering hidden issues and creating transformative solutions",
            "Reputation for integrity and ability to work with sensitive or difficult matters"
        ],
        challenges: [
            "May be seen as too intense or controlling in professional settings",
            "Tendency to be secretive about professional methods or strategies",
            "Can be ruthless or manipulative in pursuit of professional goals",
            "Difficulty with careers that require superficial or purely social skills"
        ],
        keywords: ["Powerful Leadership", "Transformative Career", "Crisis Management", "Professional Intensity", "Hidden Solutions", "Regenerative Work", "Authority Presence", "Deep Impact"],
        lifeExpression: "You build a powerful professional reputation through transformative leadership and your ability to handle complex, difficult situations that others cannot manage."
    },
    11: {
        combination: "Scorpio on 11th House",
        essence: "Loyal Ally",
        description: "With Scorpio on your 11th house cusp, you approach friendships and group activities with intensity and deep loyalty. Your hopes and dreams are transformative and may involve healing, empowering, or regenerating your community or society. You're drawn to groups that work for deep change or that address hidden problems in society. Your social network tends to be smaller but intensely loyal, and you may serve as the person who helps groups navigate crisis or transformation.",
        approach: "You build friendships and pursue dreams through deep loyalty and commitment to transformative goals that heal and empower others.",
        strengths: [
            "Exceptionally loyal friendships that last through any crisis",
            "Natural ability to help groups navigate transformation and change",
            "Dreams and goals that focus on deep healing and empowerment",
            "Skill at uncovering and addressing hidden problems in group dynamics"
        ],
        challenges: [
            "May be too intense or demanding in friendships",
            "Tendency to be suspicious of new group members or social connections",
            "Can be controlling or manipulative in group situations",
            "Difficulty with superficial social activities or casual friendships"
        ],
        keywords: ["Loyal Friendship", "Transformative Goals", "Group Healing", "Deep Commitment", "Social Investigation", "Powerful Alliances", "Community Regeneration", "Intense Networks"],
        lifeExpression: "You form intensely loyal friendships and work toward transformative goals that heal and empower your community, often serving as the person who helps groups through crisis and change."
    },
    12: {
        combination: "Scorpio on 12th House",
        essence: "Hidden Mystic",
        description: "With Scorpio on your 12th house cusp, your spiritual and subconscious life is characterized by deep mystical understanding and hidden transformative power. You may have unconscious patterns related to control, power, or intensity that need to be understood and integrated. Your spiritual path involves deep inner transformation and may include work with the shadow, death and rebirth experiences, or mystical practices that transform consciousness. You may be drawn to behind-the-scenes healing work or serving as a hidden source of transformation for others.",
        approach: "You explore your spiritual and subconscious life through deep mystical practices and serve as a hidden source of transformation and healing.",
        strengths: [
            "Deep mystical understanding and connection to hidden spiritual realms",
            "Natural ability to work with shadow material and unconscious patterns",
            "Hidden transformative power that can heal and regenerate others",
            "Understanding of death, rebirth, and the deeper mysteries of existence"
        ],
        challenges: [
            "Unconscious patterns of control or manipulation that need healing",
            "Tendency to suppress or hide your spiritual gifts and insights",
            "May struggle with dark night of the soul experiences",
            "Difficulty trusting others with your deepest spiritual experiences"
        ],
        keywords: ["Hidden Mysticism", "Deep Transformation", "Shadow Work", "Spiritual Power", "Unconscious Healing", "Mystical Death-Rebirth", "Secret Wisdom", "Regenerative Spirituality"],
        lifeExpression: "You serve as a hidden mystic and transformer, working with deep spiritual forces to heal and regenerate while integrating your own shadow material and unconscious patterns."
    }
};
// Placeholder constants for signs not yet implemented
export const TAURUS_HOUSE_INTERPRETATIONS: Record<number, SignHouseInterpretation> = {
    1: {
        combination: "Taurus on 1st House",
        essence: "Steady Presence",
        description: "With Taurus on your 1st house cusp (Ascendant), you project an image of stability, reliability, and natural grace. Others see you as someone who is grounded, practical, and pleasantly determined. You approach life with patience and persistence, preferring steady progress over rushed action. Your presence is calming and reassuring, and you have a natural appreciation for beauty, comfort, and the finer things in life. People are drawn to your dependable, down-to-earth nature.",
        approach: "You tackle life with patience, persistence, and a focus on building lasting, beautiful foundations.",
        strengths: [
            "Natural stability and reliability that others can depend on",
            "Strong appreciation for beauty, comfort, and quality in all things",
            "Patient, persistent approach that achieves lasting results",
            "Calming, grounding presence that soothes others"
        ],
        challenges: [
            "May be seen as stubborn or resistant to change",
            "Tendency to move too slowly or miss time-sensitive opportunities",
            "Can be overly focused on material comfort and security",
            "May struggle with flexibility or adapting to new situations"
        ],
        keywords: ["Stable", "Reliable", "Patient", "Beautiful", "Grounded", "Persistent", "Practical", "Sensual"],
        lifeExpression: "You're known for your steady, reliable nature and ability to create beauty and comfort wherever you go."
    },
    2: {
        combination: "Taurus on 2nd House",
        essence: "Natural Builder",
        description: "With Taurus on your 2nd house cusp, you have a natural affinity for building wealth and accumulating beautiful possessions. This is a powerful placement that enhances your ability to attract and maintain material resources. You approach money with patience and practical wisdom, preferring steady, long-term investments over risky ventures. Your values are deeply rooted in security, beauty, and quality, and you're willing to work hard to afford the finer things in life.",
        approach: "You build wealth steadily through practical investments and appreciation for lasting value and quality.",
        strengths: [
            "Exceptional ability to build and maintain wealth over time",
            "Natural instinct for investments that appreciate in value",
            "Strong appreciation for quality and beauty in possessions",
            "Patient, practical approach to financial planning and security"
        ],
        challenges: [
            "May be overly attached to material possessions or money",
            "Tendency to be too conservative or miss growth opportunities",
            "Can be stubborn about spending or financial decisions",
            "May equate self-worth too closely with material wealth"
        ],
        keywords: ["Wealth", "Security", "Quality", "Patient", "Practical", "Beautiful", "Steady", "Valuable"],
        lifeExpression: "You have a natural talent for creating financial security and surrounding yourself with beautiful, valuable possessions."
    },
    3: {
        combination: "Taurus on 3rd House",
        essence: "Thoughtful Communicator",
        description: "With Taurus on your 3rd house cusp, you communicate with deliberation, practicality, and a focus on concrete, useful information. Your speaking and writing style is steady, reliable, and often focused on practical matters. You prefer to think things through carefully before speaking and have a talent for explaining complex concepts in simple, understandable terms. Your relationships with siblings and neighbors are likely to be stable and enduring.",
        approach: "You share information thoughtfully and practically, focusing on what is useful and enduring.",
        strengths: [
            "Thoughtful, deliberate communication that is reliable and trustworthy",
            "Ability to explain complex concepts in simple, practical terms",
            "Stable, enduring relationships with siblings and local community",
            "Patient approach to learning that leads to deep understanding"
        ],
        challenges: [
            "May be too slow or deliberate in communication for some situations",
            "Tendency to be stubborn about ideas or resistant to new information",
            "Can be overly focused on practical matters and miss abstract concepts",
            "May struggle with quick decision-making or spontaneous communication"
        ],
        keywords: ["Thoughtful", "Practical", "Steady", "Reliable", "Patient", "Concrete", "Enduring", "Simple"],
        lifeExpression: "You're known for your thoughtful, reliable communication and ability to make complex ideas accessible and practical."
    },
    4: {
        combination: "Taurus on 4th House",
        essence: "Comfort Creator",
        description: "With Taurus on your 4th house cusp, you approach home and family with a deep need for comfort, beauty, and stability. Your home is likely to be a beautiful, comfortable sanctuary filled with quality furnishings and natural elements. You take great pride in creating a secure, nurturing environment for yourself and your loved ones. Family traditions and heritage are important to you, and you may be the one who maintains family stability and continuity.",
        approach: "You create beautiful, comfortable homes that serve as stable foundations for yourself and your family.",
        strengths: [
            "Natural ability to create beautiful, comfortable living spaces",
            "Strong commitment to family stability and security",
            "Appreciation for family traditions and heritage",
            "Talent for making others feel welcome and nurtured in your home"
        ],
        challenges: [
            "May be overly attached to home or resistant to moving",
            "Tendency to be stubborn about family traditions or ways of doing things",
            "Can be possessive about home or family members",
            "May struggle with change in family dynamics or living situations"
        ],
        keywords: ["Comfortable", "Beautiful", "Stable", "Nurturing", "Traditional", "Secure", "Quality", "Grounded"],
        lifeExpression: "Your home is your sanctuary, and you're known for creating beautiful, stable environments where family feels secure and nurtured."
    },
    5: {
        combination: "Taurus on 5th House",
        essence: "Sensual Creator",
        description: "With Taurus on your 5th house cusp, you approach creativity, romance, and self-expression with sensuality, patience, and an appreciation for beauty. Your creative works are likely to be beautiful, enduring, and crafted with attention to quality and detail. In romance, you're steady, loyal, and appreciate physical affection and sensual pleasures. You may have a natural talent for arts and crafts, music, or any creative pursuit that involves working with your hands.",
        approach: "You express creativity through beautiful, sensual works and seek romance that is steady, loyal, and physically affectionate.",
        strengths: [
            "Natural talent for creating beautiful, enduring works of art",
            "Steady, loyal approach to romance and relationships",
            "Appreciation for sensual pleasures and physical beauty",
            "Patient, methodical approach to creative projects that ensures quality"
        ],
        challenges: [
            "May be too slow or methodical in creative expression",
            "Tendency to be possessive or jealous in romantic relationships",
            "Can be stubborn about creative vision or resistant to feedback",
            "May struggle with spontaneity or experimental approaches to creativity"
        ],
        keywords: ["Sensual", "Beautiful", "Patient", "Loyal", "Creative", "Quality", "Steady", "Crafted"],
        lifeExpression: "You create beautiful, lasting works of art and seek romantic relationships that are steady, loyal, and deeply satisfying."
    },
    6: {
        combination: "Taurus on 6th House",
        essence: "Steady Server",
        description: "With Taurus on your 6th house cusp, you approach work, health, and service with patience, reliability, and a focus on practical results. You prefer work environments that are stable and comfortable, and you excel at tasks that require persistence and attention to detail. Your approach to health is practical and may involve natural remedies, good nutrition, and regular, gentle exercise. You're a reliable team member who others can count on to get the job done.",
        approach: "You serve others through steady, reliable work and maintain health through practical, natural approaches.",
        strengths: [
            "Exceptional reliability and persistence in work and service",
            "Practical approach to health that focuses on natural, sustainable methods",
            "Ability to create comfortable, efficient work environments",
            "Patient, methodical approach that produces high-quality results"
        ],
        challenges: [
            "May be resistant to change in work routines or methods",
            "Tendency to be stubborn about health practices or work approaches",
            "Can be slow to adapt to new technologies or procedures",
            "May struggle with high-pressure or rapidly changing work environments"
        ],
        keywords: ["Reliable", "Patient", "Practical", "Steady", "Natural", "Comfortable", "Persistent", "Quality"],
        lifeExpression: "You're known for your reliability and ability to create stable, comfortable work environments while maintaining excellent health through natural methods."
    },
    7: {
        combination: "Taurus on 7th House",
        essence: "Loyal Partner",
        description: "With Taurus on your 7th house cusp, you seek partnerships that are stable, loyal, and built on mutual appreciation for beauty and comfort. You're attracted to partners who are reliable, practical, and share your values regarding security and quality of life. Your approach to relationships is patient and enduring, and you prefer to build partnerships slowly and steadily rather than rushing into commitments. You value loyalty and consistency above all else in partnerships.",
        approach: "You build partnerships slowly and steadily, seeking loyal, reliable partners who share your values and appreciation for beauty.",
        strengths: [
            "Natural ability to build stable, enduring partnerships",
            "Loyal, reliable approach to relationships that creates security",
            "Appreciation for partners who value beauty, comfort, and quality",
            "Patient approach to relationship building that creates strong foundations"
        ],
        challenges: [
            "May be too slow or cautious in forming new partnerships",
            "Tendency to be possessive or jealous in relationships",
            "Can be stubborn about relationship expectations or unwilling to compromise",
            "May attract partners who are overly dependent or resistant to change"
        ],
        keywords: ["Loyal", "Stable", "Patient", "Reliable", "Beautiful", "Secure", "Enduring", "Practical"],
        lifeExpression: "Your partnerships are characterized by loyalty, stability, and mutual appreciation for the beautiful, comfortable life you build together."
    },
    8: {
        combination: "Taurus on 8th House",
        essence: "Resource Guardian",
        description: "With Taurus on your 8th house cusp, you approach shared resources, transformation, and deep psychology with patience and a focus on building lasting security. You may have a natural talent for managing investments, insurance, or other people's money with steady, conservative approaches. Your transformations tend to be gradual and thorough, and you prefer to build psychological understanding slowly and methodically. You value stability even in times of change.",
        approach: "You manage shared resources conservatively and approach transformation with patience and practical wisdom.",
        strengths: [
            "Excellent ability to manage and grow shared financial resources",
            "Patient, thorough approach to psychological transformation",
            "Natural talent for conservative investments and long-term planning",
            "Ability to provide stability and security during times of change"
        ],
        challenges: [
            "May be too conservative or resistant to necessary changes",
            "Tendency to be possessive about shared resources or control",
            "Can be stubborn about transformation or psychological growth",
            "May struggle with sudden changes or crisis situations"
        ],
        keywords: ["Conservative", "Patient", "Stable", "Secure", "Gradual", "Thorough", "Practical", "Enduring"],
        lifeExpression: "You provide stability and security in shared resources and help others through gradual, thorough transformation processes."
    },
    9: {
        combination: "Taurus on 9th House",
        essence: "Practical Philosopher",
        description: "With Taurus on your 9th house cusp, you approach higher learning, philosophy, and wisdom with practicality and a focus on what can be applied in real life. Your philosophical beliefs are likely to be grounded in common sense and practical experience rather than abstract theory. You prefer educational approaches that are hands-on and applicable, and you may be drawn to travel that involves comfort and beauty rather than adventure for its own sake.",
        approach: "You seek wisdom that is practical and applicable, building philosophical understanding through real-world experience.",
        strengths: [
            "Ability to ground abstract concepts in practical, applicable wisdom",
            "Patient, thorough approach to higher learning and education",
            "Natural talent for teaching practical skills and common-sense wisdom",
            "Appreciation for travel and experiences that combine beauty with learning"
        ],
        challenges: [
            "May be too practical or resistant to abstract philosophical concepts",
            "Tendency to be stubborn about beliefs or unwilling to consider new ideas",
            "Can be slow to embrace new educational methods or technologies",
            "May struggle with purely theoretical or speculative thinking"
        ],
        keywords: ["Practical", "Grounded", "Patient", "Applicable", "Common-sense", "Thorough", "Beautiful", "Experienced"],
        lifeExpression: "You're known for your practical wisdom and ability to make abstract concepts applicable and useful in everyday life."
    },
    10: {
        combination: "Taurus on 10th House",
        essence: "Steady Achiever",
        description: "With Taurus on your 10th house cusp (Midheaven), you build your career and reputation through patience, reliability, and consistent quality work. You're drawn to careers that offer stability, security, and the opportunity to work with beautiful or valuable things. Your professional reputation is built on your dependability and ability to produce lasting, high-quality results. You prefer to advance slowly and steadily rather than seeking rapid promotion or dramatic career changes.",
        approach: "You build your career steadily through reliable, high-quality work and patient advancement toward long-term goals.",
        strengths: [
            "Exceptional reliability and consistency in professional performance",
            "Natural ability to build lasting professional reputation and success",
            "Talent for working with valuable, beautiful, or luxury goods and services",
            "Patient approach to career advancement that creates solid foundations"
        ],
        challenges: [
            "May be too slow or conservative in career advancement",
            "Tendency to be resistant to change in professional methods or goals",
            "Can be stubborn about career path or unwilling to take calculated risks",
            "May struggle with rapidly changing industries or high-pressure environments"
        ],
        keywords: ["Reliable", "Patient", "Quality", "Stable", "Valuable", "Consistent", "Steady", "Enduring"],
        lifeExpression: "You're known for your professional reliability and ability to build lasting success through patient, high-quality work."
    },
    11: {
        combination: "Taurus on 11th House",
        essence: "Loyal Friend",
        description: "With Taurus on your 11th house cusp, you approach friendships and group activities with loyalty, stability, and a focus on shared values regarding comfort and security. Your friendships tend to be long-lasting and built on mutual appreciation for the good things in life. You're drawn to groups that share your practical values and may be involved in organizations focused on beauty, nature, or financial security. Your hopes and dreams are practical and achievable.",
        approach: "You build lasting friendships based on shared values and pursue practical, achievable goals with loyal group support.",
        strengths: [
            "Natural ability to build lasting, loyal friendships",
            "Practical approach to group goals that ensures achievable results",
            "Appreciation for friends who share your values regarding beauty and comfort",
            "Steady, reliable contribution to group activities and causes"
        ],
        challenges: [
            "May be too selective or slow in forming new friendships",
            "Tendency to be stubborn about group decisions or resistant to change",
            "Can be possessive about friendships or group loyalties",
            "May struggle with groups that are too abstract or idealistic in their goals"
        ],
        keywords: ["Loyal", "Stable", "Practical", "Lasting", "Valuable", "Comfortable", "Reliable", "Achievable"],
        lifeExpression: "You're the friend who provides stability and practical support, helping groups achieve realistic goals through patient, loyal effort."
    },
    12: {
        combination: "Taurus on 12th House",
        essence: "Hidden Builder",
        description: "With Taurus on your 12th house cusp, your spiritual and subconscious life is characterized by a need for inner stability and connection to natural, earthy wisdom. You may find spiritual fulfillment through nature, gardening, or other earth-based practices. Your service to others is likely to be practical and grounded, perhaps involving providing comfort, beauty, or material support to those in need. You may have hidden talents for creating beauty or managing resources.",
        approach: "You serve others through practical, grounded support and find spiritual connection through nature and earthly wisdom.",
        strengths: [
            "Natural ability to provide practical, material support to those in need",
            "Deep connection to earth-based spirituality and natural wisdom",
            "Hidden talents for creating beauty and comfort in service to others",
            "Patient, steady approach to spiritual growth and inner development"
        ],
        challenges: [
            "May be too attached to material comfort even in spiritual matters",
            "Tendency to be stubborn about spiritual beliefs or practices",
            "Can be resistant to transcendent or non-material spiritual experiences",
            "May struggle with letting go of control or material attachments"
        ],
        keywords: ["Grounded", "Natural", "Practical", "Comfortable", "Patient", "Earthy", "Stable", "Nurturing"],
        lifeExpression: "Your greatest service comes through providing practical comfort and beauty to others while maintaining deep connection to natural, earthly wisdom."
    }
};
export const GEMINI_HOUSE_INTERPRETATIONS: Record<number, SignHouseInterpretation> = {
    1: {
        combination: "Gemini on 1st House",
        essence: "Curious Communicator",
        description: "With Gemini on your 1st house cusp (Ascendant), you project an image of intelligence, curiosity, and adaptability. Others see you as someone who is quick-witted, communicative, and always interested in learning something new. You approach life with mental agility and a desire to gather and share information. Your presence is lively and engaging, and you have a natural ability to connect with people from all walks of life through your versatile communication style.",
        approach: "You tackle life with curiosity, mental agility, and a desire to learn and share information with others.",
        strengths: [
            "Natural communication skills and ability to connect with diverse people",
            "Quick mental agility and adaptability to changing situations",
            "Genuine curiosity and enthusiasm for learning new things",
            "Versatile approach that allows you to handle multiple interests and projects"
        ],
        challenges: [
            "May appear scattered or inconsistent to others",
            "Tendency to be superficial or lack depth in some areas",
            "Can be restless or impatient with routine or slow-moving situations",
            "May struggle with follow-through or completing long-term projects"
        ],
        keywords: ["Curious", "Communicative", "Adaptable", "Quick", "Versatile", "Intelligent", "Social", "Lively"],
        lifeExpression: "You're known for your quick wit, curiosity, and ability to make connections between ideas and people."
    },
    2: {
        combination: "Gemini on 2nd House",
        essence: "Versatile Earner",
        description: "With Gemini on your 2nd house cusp, you approach money and possessions with versatility and mental agility. You may have multiple income streams or earn money through communication, writing, teaching, or technology. Your financial situation may fluctuate as you explore different ways of generating income. You value intellectual possessions like books, technology, and information, and you may be skilled at finding good deals through research and networking.",
        approach: "You build wealth through diverse income streams and value possessions that enhance your learning and communication.",
        strengths: [
            "Ability to generate income through multiple, diverse sources",
            "Natural talent for finding good deals and financial opportunities through networking",
            "Appreciation for intellectual and technological possessions",
            "Flexible approach to money that adapts to changing circumstances"
        ],
        challenges: [
            "May have inconsistent or fluctuating income patterns",
            "Tendency to scatter financial energy across too many ventures",
            "Can be impulsive with purchases, especially technology or books",
            "May struggle with long-term financial planning or patience with investments"
        ],
        keywords: ["Versatile", "Multiple", "Intellectual", "Flexible", "Communicative", "Technological", "Networked", "Adaptable"],
        lifeExpression: "You create financial security through diverse income streams and value possessions that enhance your ability to learn and communicate."
    },
    3: {
        combination: "Gemini on 3rd House",
        essence: "Natural Networker",
        description: "With Gemini on your 3rd house cusp, you have exceptional communication abilities and a natural talent for networking and information sharing. This is a powerful placement that enhances your mental agility, curiosity, and ability to connect with others. Your relationships with siblings and neighbors are likely to be important and intellectually stimulating. You excel at learning, teaching, and any activity that involves gathering and disseminating information.",
        approach: "You communicate with natural ease and build networks through your genuine curiosity and information-sharing abilities.",
        strengths: [
            "Exceptional communication skills and natural networking abilities",
            "Quick learning ability and talent for teaching or explaining concepts",
            "Strong, intellectually stimulating relationships with siblings and community",
            "Natural ability to gather, process, and share information effectively"
        ],
        challenges: [
            "May be prone to gossip or sharing information inappropriately",
            "Tendency to be scattered or superficial in communication",
            "Can be restless or impatient with deep, focused conversations",
            "May struggle with keeping confidences or maintaining privacy"
        ],
        keywords: ["Communicative", "Networked", "Quick", "Curious", "Versatile", "Social", "Intellectual", "Connected"],
        lifeExpression: "You're the natural connector who brings people and ideas together through your exceptional communication and networking skills."
    },
    4: {
        combination: "Gemini on 4th House",
        essence: "Intellectual Foundation",
        description: "With Gemini on your 4th house cusp, you approach home and family with curiosity, communication, and intellectual stimulation. Your home may be filled with books, technology, and spaces for learning and communication. Family discussions are likely to be lively and intellectually engaging, and you may have grown up in a household that valued education and communication. You need mental stimulation and variety in your domestic environment.",
        approach: "You create homes that are intellectually stimulating and foster communication and learning among family members.",
        strengths: [
            "Ability to create intellectually stimulating home environments",
            "Natural talent for facilitating family communication and discussion",
            "Appreciation for learning and education within the family context",
            "Flexible, adaptable approach to family traditions and domestic arrangements"
        ],
        challenges: [
            "May struggle with emotional depth or intimacy in family relationships",
            "Tendency to intellectualize family problems rather than addressing emotions",
            "Can be restless or need frequent changes in living arrangements",
            "May have difficulty with family members who prefer routine or tradition"
        ],
        keywords: ["Intellectual", "Communicative", "Stimulating", "Flexible", "Educational", "Curious", "Adaptable", "Lively"],
        lifeExpression: "Your home is a hub of intellectual activity and communication, where family members are encouraged to learn and share ideas."
    },
    5: {
        combination: "Gemini on 5th House",
        essence: "Playful Communicator",
        description: "With Gemini on your 5th house cusp, you approach creativity, romance, and self-expression with wit, versatility, and intellectual playfulness. Your creative works may involve writing, speaking, or other forms of communication, and you enjoy experimenting with different styles and mediums. In romance, you're attracted to partners who can engage you intellectually and keep up with your quick wit. You may have a natural talent for entertaining others through humor and storytelling.",
        approach: "You express creativity through communication and seek romantic partners who can match your intellectual curiosity and wit.",
        strengths: [
            "Natural talent for creative communication, writing, and storytelling",
            "Ability to entertain others through wit, humor, and intellectual playfulness",
            "Attraction to intellectually stimulating romantic relationships",
            "Versatile creative expression that adapts to different mediums and styles"
        ],
        challenges: [
            "May be inconsistent or scattered in creative pursuits",
            "Tendency to intellectualize romance rather than experiencing deep emotion",
            "Can be restless or easily bored in relationships or creative projects",
            "May struggle with completing creative works or maintaining romantic focus"
        ],
        keywords: ["Witty", "Versatile", "Intellectual", "Playful", "Communicative", "Entertaining", "Curious", "Adaptable"],
        lifeExpression: "You bring joy and entertainment to others through your creative communication and seek relationships that stimulate your mind."
    },
    6: {
        combination: "Gemini on 6th House",
        essence: "Versatile Helper",
        description: "With Gemini on your 6th house cusp, you approach work, health, and service with versatility, communication skills, and mental agility. You prefer jobs that involve variety, learning, and interaction with others rather than routine, repetitive tasks. Your approach to health may involve staying mentally active and may benefit from variety in exercise routines. You excel at multitasking and can handle multiple responsibilities simultaneously.",
        approach: "You serve others through communication and versatile skills while maintaining health through mental stimulation and variety.",
        strengths: [
            "Exceptional multitasking abilities and versatility in work situations",
            "Natural communication skills that enhance teamwork and collaboration",
            "Ability to learn quickly and adapt to new work methods or technologies",
            "Talent for finding efficient solutions through mental agility and networking"
        ],
        challenges: [
            "May be scattered or inconsistent in work performance",
            "Tendency to become bored with routine tasks or repetitive work",
            "Can be nervous or anxious, which may affect health and work performance",
            "May struggle with deep focus or completing detailed, long-term projects"
        ],
        keywords: ["Versatile", "Communicative", "Adaptable", "Quick", "Multitasking", "Social", "Efficient", "Flexible"],
        lifeExpression: "You're known for your versatility and communication skills, making you an invaluable team member who can adapt to any situation."
    },
    7: {
        combination: "Gemini on 7th House",
        essence: "Intellectual Partner",
        description: "With Gemini on your 7th house cusp, you seek partnerships that are intellectually stimulating and based on good communication. You're attracted to partners who are intelligent, curious, and can engage you in interesting conversations. Your approach to relationships is flexible and adaptable, and you may prefer partnerships that allow for variety and mental stimulation. Communication is the key to all your successful relationships.",
        approach: "You build partnerships through intellectual connection and excellent communication, seeking variety and mental stimulation.",
        strengths: [
            "Natural ability to communicate effectively in partnerships",
            "Attraction to intelligent, intellectually stimulating partners",
            "Flexible, adaptable approach to relationships that prevents stagnation",
            "Talent for keeping relationships interesting through variety and communication"
        ],
        challenges: [
            "May intellectualize relationships and avoid emotional depth",
            "Tendency to be restless or seek variety that can destabilize partnerships",
            "Can be inconsistent or changeable in relationship commitments",
            "May attract partners who are superficial or uncommitted"
        ],
        keywords: ["Intellectual", "Communicative", "Flexible", "Curious", "Adaptable", "Stimulating", "Versatile", "Social"],
        lifeExpression: "Your partnerships thrive on intellectual connection and communication, with both parties learning and growing together."
    },
    8: {
        combination: "Gemini on 8th House",
        essence: "Investigative Mind",
        description: "With Gemini on your 8th house cusp, you approach transformation, shared resources, and deep psychology with curiosity and analytical thinking. You may have a talent for research, investigation, or understanding complex financial or psychological matters through mental analysis. Your transformations often come through learning and gaining new perspectives, and you may help others through crisis by providing information and communication.",
        approach: "You navigate transformation and shared resources through research, analysis, and clear communication of complex matters.",
        strengths: [
            "Natural talent for research and investigation of complex matters",
            "Ability to understand and communicate about psychological or financial topics",
            "Mental agility that helps navigate crisis and transformation",
            "Skill at gathering and analyzing information about shared resources"
        ],
        challenges: [
            "May intellectualize deep emotions or avoid psychological depth",
            "Tendency to be scattered or superficial in transformational work",
            "Can be nervous or anxious about shared resources or deep commitments",
            "May struggle with the emotional intensity required for true transformation"
        ],
        keywords: ["Investigative", "Analytical", "Curious", "Communicative", "Research", "Mental", "Flexible", "Informative"],
        lifeExpression: "You help others navigate complex transformations and shared resources through your research abilities and clear communication."
    },
    9: {
        combination: "Gemini on 9th House",
        essence: "Curious Scholar",
        description: "With Gemini on your 9th house cusp, you approach higher learning, philosophy, and wisdom with curiosity, versatility, and a desire to gather information from many sources. You may be drawn to multiple fields of study and enjoy comparing different philosophical or cultural perspectives. Your approach to education is flexible and may involve various methods of learning. You may have a talent for teaching or sharing knowledge in accessible ways.",
        approach: "You seek wisdom through diverse learning experiences and share knowledge through clear, accessible communication.",
        strengths: [
            "Natural curiosity that drives continuous learning and exploration",
            "Ability to synthesize information from multiple sources and perspectives",
            "Talent for making complex philosophical concepts accessible to others",
            "Flexible approach to education that adapts to different learning styles"
        ],
        challenges: [
            "May be scattered or superficial in philosophical or educational pursuits",
            "Tendency to collect information without developing deep wisdom",
            "Can be restless or impatient with traditional educational methods",
            "May struggle with committing to one philosophical or spiritual path"
        ],
        keywords: ["Curious", "Versatile", "Educational", "Communicative", "Flexible", "Diverse", "Accessible", "Exploratory"],
        lifeExpression: "You're a lifelong learner who gathers wisdom from many sources and shares knowledge in ways that others can easily understand."
    },
    10: {
        combination: "Gemini on 10th House",
        essence: "Communicative Professional",
        description: "With Gemini on your 10th house cusp (Midheaven), you build your career and reputation through communication, versatility, and intellectual abilities. You're drawn to careers that involve writing, speaking, teaching, media, or technology. Your professional reputation is built on your ability to gather, process, and share information effectively. You may have multiple career interests or change career directions several times throughout your life.",
        approach: "You build your career through communication skills and intellectual versatility, often pursuing multiple professional interests.",
        strengths: [
            "Exceptional communication skills that enhance professional reputation",
            "Versatility that allows success in multiple career fields",
            "Natural networking abilities that create professional opportunities",
            "Ability to adapt quickly to changing professional environments"
        ],
        challenges: [
            "May be scattered or inconsistent in career focus",
            "Tendency to change career directions frequently without building expertise",
            "Can be superficial or lack depth in professional specialization",
            "May struggle with long-term career planning or patience with advancement"
        ],
        keywords: ["Communicative", "Versatile", "Intellectual", "Networked", "Adaptable", "Multiple", "Quick", "Professional"],
        lifeExpression: "You're known for your communication skills and versatility, building a reputation as someone who can adapt to any professional challenge."
    },
    11: {
        combination: "Gemini on 11th House",
        essence: "Social Connector",
        description: "With Gemini on your 11th house cusp, you approach friendships and group activities with curiosity, communication, and a desire to connect diverse people and ideas. You're naturally social and may have many acquaintances from different backgrounds. Your hopes and dreams often involve communication, learning, or bringing people together. You excel at facilitating group discussions and helping groups share information effectively.",
        approach: "You build diverse social networks and pursue goals that involve communication, learning, and connecting people.",
        strengths: [
            "Natural ability to connect diverse people and facilitate group communication",
            "Extensive social network with friends from many different backgrounds",
            "Talent for organizing group learning or information-sharing activities",
            "Flexible approach to group goals that adapts to changing circumstances"
        ],
        challenges: [
            "May have many acquaintances but struggle with deep friendships",
            "Tendency to be scattered or inconsistent in group commitments",
            "Can be superficial in social interactions or group involvement",
            "May struggle with groups that require emotional depth or long-term commitment"
        ],
        keywords: ["Social", "Connecting", "Diverse", "Communicative", "Networked", "Flexible", "Curious", "Facilitating"],
        lifeExpression: "You're the social connector who brings diverse people together and helps groups communicate and share information effectively."
    },
    12: {
        combination: "Gemini on 12th House",
        essence: "Hidden Messenger",
        description: "With Gemini on your 12th house cusp, your spiritual and subconscious life is characterized by a need to process and understand information on a deeper level. You may have intuitive communication abilities or receive insights through dreams, meditation, or quiet reflection. Your service to others may involve behind-the-scenes communication, research, or helping others process information and ideas. You may have hidden talents for writing or teaching.",
        approach: "You serve others through behind-the-scenes communication and help process information on spiritual and subconscious levels.",
        strengths: [
            "Intuitive communication abilities and talent for receiving insights",
            "Natural ability to help others process complex information or ideas",
            "Hidden talents for writing, research, or spiritual communication",
            "Flexible approach to spirituality that incorporates learning and curiosity"
        ],
        challenges: [
            "May be scattered or confused in spiritual or subconscious matters",
            "Tendency to intellectualize spiritual experiences rather than feeling them",
            "Can be nervous or anxious about hidden or subconscious material",
            "May struggle with the silence and stillness required for deep spiritual work"
        ],
        keywords: ["Intuitive", "Hidden", "Communicative", "Processing", "Spiritual", "Curious", "Flexible", "Insightful"],
        lifeExpression: "Your greatest service comes through helping others understand and process complex information on spiritual and subconscious levels."
    }
};
export const CANCER_HOUSE_INTERPRETATIONS: Record<number, SignHouseInterpretation> = {
    1: {
        combination: "Cancer on 1st House",
        essence: "Nurturing Protector",
        description: "With Cancer on your 1st house cusp (Ascendant), you project an image of warmth, sensitivity, and nurturing care. Others see you as someone who is emotionally intuitive, protective, and deeply caring. You approach life with emotional awareness and a strong need for security and belonging. Your presence is comforting and maternal/paternal, and you have a natural ability to make others feel safe and cared for. Your moods and emotions are easily visible to others.",
        approach: "You tackle life with emotional intuition, nurturing care, and a strong need for security and belonging.",
        strengths: [
            "Natural nurturing abilities and protective instincts toward others",
            "Strong emotional intuition and empathy that helps you understand people",
            "Ability to create safe, comfortable environments where others feel cared for",
            "Deep loyalty and commitment to those you consider family"
        ],
        challenges: [
            "May be overly sensitive or take things too personally",
            "Tendency to be moody or emotionally reactive in public",
            "Can be overly protective or clingy with others",
            "May struggle with boundaries or become too emotionally involved"
        ],
        keywords: ["Nurturing", "Protective", "Sensitive", "Intuitive", "Caring", "Emotional", "Loyal", "Comforting"],
        lifeExpression: "You're known for your nurturing nature and ability to make others feel safe, cared for, and emotionally understood."
    },
    2: {
        combination: "Cancer on 2nd House",
        essence: "Security Builder",
        description: "With Cancer on your 2nd house cusp, you approach money and possessions with a strong need for emotional and financial security. You may be very protective of your resources and prefer to save money for future security rather than spend impulsively. Your relationship with possessions is emotional, and you may keep items for their sentimental value. You value things that provide comfort, security, and connection to family or home.",
        approach: "You build wealth and security through careful saving and emotional attachment to possessions that provide comfort.",
        strengths: [
            "Natural instinct for saving money and building long-term financial security",
            "Emotional intelligence about what truly provides comfort and security",
            "Ability to find value in possessions that have sentimental or family significance",
            "Protective approach to resources that ensures family security"
        ],
        challenges: [
            "May be overly cautious or fearful about spending money",
            "Tendency to hoard possessions for emotional rather than practical reasons",
            "Can be too emotionally attached to material things",
            "May struggle with financial decisions based on fear rather than logic"
        ],
        keywords: ["Secure", "Protective", "Emotional", "Saving", "Sentimental", "Cautious", "Family-oriented", "Comforting"],
        lifeExpression: "You create financial security through careful saving and value possessions that provide emotional comfort and family connection."
    },
    3: {
        combination: "Cancer on 3rd House",
        essence: "Emotional Communicator",
        description: "With Cancer on your 3rd house cusp, you communicate with emotional depth, intuition, and a focus on creating emotional connections. Your speaking and writing style is warm, personal, and often focuses on feelings and relationships. You have strong emotional bonds with siblings and neighbors, and you may be the one who keeps family communication flowing. Your learning style is intuitive and you remember information that has emotional significance.",
        approach: "You communicate with emotional warmth and build learning experiences around feelings and personal connections.",
        strengths: [
            "Natural ability to communicate with emotional depth and warmth",
            "Strong, caring relationships with siblings and local community",
            "Intuitive learning style that remembers emotionally significant information",
            "Talent for creating emotional safety in communication and learning environments"
        ],
        challenges: [
            "May be overly emotional or subjective in communication",
            "Tendency to take communication personally or become defensive",
            "Can be moody or inconsistent in sharing information",
            "May struggle with objective or impersonal communication styles"
        ],
        keywords: ["Emotional", "Intuitive", "Warm", "Personal", "Caring", "Protective", "Subjective", "Nurturing"],
        lifeExpression: "You communicate with emotional warmth and create learning environments where people feel safe to share and grow."
    },
    4: {
        combination: "Cancer on 4th House",
        essence: "Home Guardian",
        description: "With Cancer on your 4th house cusp, you have an exceptionally strong connection to home, family, and emotional roots. This is a powerful placement that amplifies your need for a secure, nurturing home environment. Your home is likely to be your sanctuary, filled with family photos, comfortable furnishings, and items that have emotional significance. You may be deeply connected to your ancestry and family traditions, and you're likely the emotional center of your family.",
        approach: "You create deeply nurturing home environments and serve as the emotional foundation for your family.",
        strengths: [
            "Exceptional ability to create warm, nurturing home environments",
            "Deep connection to family heritage, traditions, and emotional roots",
            "Natural talent for providing emotional security and comfort to family",
            "Strong protective instincts and loyalty to family members"
        ],
        challenges: [
            "May be overly attached to home or resistant to moving",
            "Tendency to be overly protective or controlling of family members",
            "Can be moody or emotionally demanding within the family",
            "May struggle with family members who are less emotionally expressive"
        ],
        keywords: ["Nurturing", "Protective", "Traditional", "Emotional", "Secure", "Family-centered", "Caring", "Rooted"],
        lifeExpression: "Your home is your sanctuary, and you're the emotional heart of your family, providing security and nurturing care to all."
    },
    5: {
        combination: "Cancer on 5th House",
        essence: "Nurturing Creator",
        description: "With Cancer on your 5th house cusp, you approach creativity, romance, and self-expression with emotional depth and nurturing care. Your creative works often reflect your emotional experiences and may focus on themes of family, home, or emotional healing. In romance, you're deeply caring and seek partners who can provide emotional security. You have a natural affinity for children and may express your creativity through caring for or teaching young people.",
        approach: "You express creativity through emotional depth and seek romantic relationships that provide mutual nurturing and security.",
        strengths: [
            "Natural ability to create emotionally meaningful and healing works of art",
            "Deep, nurturing approach to romance that creates emotional security",
            "Exceptional connection with children and ability to inspire their creativity",
            "Talent for expressing emotions through creative and artistic mediums"
        ],
        challenges: [
            "May be overly emotional or moody in creative expression",
            "Tendency to be clingy or possessive in romantic relationships",
            "Can be overly protective of children or creative works",
            "May struggle with criticism of creative or emotional expression"
        ],
        keywords: ["Nurturing", "Emotional", "Creative", "Caring", "Protective", "Intuitive", "Healing", "Expressive"],
        lifeExpression: "You create emotionally meaningful art and seek relationships that provide deep emotional connection and mutual nurturing."
    },
    6: {
        combination: "Cancer on 6th House",
        essence: "Caring Helper",
        description: "With Cancer on your 6th house cusp, you approach work, health, and service with emotional care and nurturing instincts. You're drawn to careers that involve caring for others, such as healthcare, social work, or education. Your approach to health is intuitive and may involve emotional healing as well as physical wellness. You create emotionally supportive work environments and are deeply committed to helping others feel cared for and secure.",
        approach: "You serve others through emotional care and maintain health through intuitive, nurturing approaches to wellness.",
        strengths: [
            "Natural talent for careers involving care, healing, and emotional support",
            "Intuitive approach to health that addresses emotional as well as physical needs",
            "Ability to create emotionally supportive and nurturing work environments",
            "Deep commitment to service that comes from genuine care for others"
        ],
        challenges: [
            "May be overly emotional or take work problems too personally",
            "Tendency to become too emotionally involved with clients or coworkers",
            "Can be moody or inconsistent in work performance based on emotions",
            "May neglect own needs while caring for others"
        ],
        keywords: ["Caring", "Nurturing", "Intuitive", "Healing", "Supportive", "Emotional", "Service", "Protective"],
        lifeExpression: "You're known for your caring approach to work and ability to create emotionally supportive environments where others feel nurtured."
    },
    7: {
        combination: "Cancer on 7th House",
        essence: "Devoted Partner",
        description: "With Cancer on your 7th house cusp, you seek partnerships that provide emotional security, nurturing, and a sense of family. You're attracted to partners who are caring, protective, and can create a sense of home and belonging with you. Your approach to relationships is deeply emotional and committed, and you prefer partnerships that feel like family bonds. You need partners who understand and appreciate your emotional depth and sensitivity.",
        approach: "You build partnerships based on emotional security, mutual nurturing, and creating a sense of family together.",
        strengths: [
            "Natural ability to create emotionally secure and nurturing partnerships",
            "Deep loyalty and commitment to partners that creates lasting bonds",
            "Intuitive understanding of partners' emotional needs and feelings",
            "Talent for making partnerships feel like safe, loving family relationships"
        ],
        challenges: [
            "May be overly dependent on partners for emotional security",
            "Tendency to be clingy, possessive, or emotionally demanding",
            "Can be moody or take relationship issues too personally",
            "May attract partners who are emotionally needy or dependent"
        ],
        keywords: ["Devoted", "Nurturing", "Emotional", "Secure", "Loyal", "Caring", "Protective", "Family-like"],
        lifeExpression: "Your partnerships are characterized by deep emotional connection, mutual nurturing, and the creation of a loving family bond."
    },
    8: {
        combination: "Cancer on 8th House",
        essence: "Emotional Transformer",
        description: "With Cancer on your 8th house cusp, you approach transformation, shared resources, and deep psychology with emotional intuition and protective instincts. You may have a natural talent for emotional healing and helping others through psychological transformation. Your approach to shared resources is protective and security-focused, and you may be skilled at managing family finances or inheritance. Your transformations are often triggered by emotional experiences.",
        approach: "You navigate transformation through emotional healing and manage shared resources with protective, family-focused care.",
        strengths: [
            "Natural talent for emotional healing and psychological transformation",
            "Protective, caring approach to managing shared resources and family finances",
            "Intuitive understanding of deep emotional and psychological processes",
            "Ability to help others feel safe during times of crisis and change"
        ],
        challenges: [
            "May be overly emotional or reactive during transformational periods",
            "Tendency to be possessive or controlling about shared resources",
            "Can be moody or unpredictable during psychological work",
            "May struggle with letting go or releasing emotional attachments"
        ],
        keywords: ["Emotional", "Healing", "Protective", "Intuitive", "Transformative", "Caring", "Secure", "Deep"],
        lifeExpression: "You help others through emotional transformation and manage shared resources with protective care and family-focused wisdom."
    },
    9: {
        combination: "Cancer on 9th House",
        essence: "Intuitive Seeker",
        description: "With Cancer on your 9th house cusp, you approach higher learning, philosophy, and wisdom with emotional intuition and a focus on what feels personally meaningful. Your philosophical beliefs are likely to be based on emotional truth and personal experience rather than abstract theory. You may be drawn to spiritual or educational traditions that emphasize nurturing, healing, and emotional growth. Your approach to travel and foreign cultures is cautious but emotionally enriching.",
        approach: "You seek wisdom through emotional experience and build philosophical understanding based on personal, heartfelt truth.",
        strengths: [
            "Intuitive approach to learning that integrates emotional and intellectual understanding",
            "Natural ability to find personal meaning in philosophical and spiritual teachings",
            "Talent for teaching or sharing wisdom in nurturing, emotionally supportive ways",
            "Deep appreciation for traditions and cultures that emphasize family and emotional connection"
        ],
        challenges: [
            "May be too subjective or emotional in philosophical thinking",
            "Tendency to reject ideas that don't feel personally meaningful",
            "Can be cautious or fearful about exploring new philosophical territories",
            "May struggle with abstract or impersonal philosophical concepts"
        ],
        keywords: ["Intuitive", "Emotional", "Personal", "Meaningful", "Nurturing", "Traditional", "Heartfelt", "Protective"],
        lifeExpression: "You seek wisdom that feels personally meaningful and share knowledge in ways that nurture and emotionally support others."
    },
    10: {
        combination: "Cancer on 10th House",
        essence: "Nurturing Leader",
        description: "With Cancer on your 10th house cusp (Midheaven), you build your career and reputation through nurturing leadership and emotional intelligence. You're drawn to careers that involve caring for others, such as healthcare, education, social work, or family-oriented businesses. Your professional reputation is built on your ability to create emotionally supportive environments and your genuine care for others. You may work in fields related to home, family, or emotional healing.",
        approach: "You build your career through nurturing leadership and create professional environments where people feel cared for and secure.",
        strengths: [
            "Natural leadership abilities based on emotional intelligence and caring",
            "Talent for careers involving nurturing, healing, and emotional support",
            "Ability to create emotionally supportive and family-like work environments",
            "Professional reputation built on genuine care and protective instincts"
        ],
        challenges: [
            "May be overly emotional or take professional criticism too personally",
            "Tendency to become too emotionally involved with professional responsibilities",
            "Can be moody or inconsistent in professional performance",
            "May struggle with impersonal or highly competitive professional environments"
        ],
        keywords: ["Nurturing", "Caring", "Emotional", "Protective", "Supportive", "Family-oriented", "Healing", "Intuitive"],
        lifeExpression: "You're known for your nurturing leadership style and ability to create professional environments where people feel valued and cared for."
    },
    11: {
        combination: "Cancer on 11th House",
        essence: "Caring Community",
        description: "With Cancer on your 11th house cusp, you approach friendships and group activities with emotional warmth and a desire to create family-like bonds. Your friendships are likely to be deep, loyal, and long-lasting, based on emotional connection and mutual care. You're drawn to groups that feel like extended family and may be involved in organizations focused on nurturing, healing, or supporting others. Your hopes and dreams often involve creating emotional security for yourself and others.",
        approach: "You build friendships based on emotional connection and pursue goals that involve nurturing and caring for your community.",
        strengths: [
            "Natural ability to create deep, family-like bonds with friends",
            "Loyal, caring approach to group activities that creates emotional security",
            "Talent for organizing groups around nurturing and supportive causes",
            "Intuitive understanding of group emotional dynamics and needs"
        ],
        challenges: [
            "May be overly emotional or take group dynamics too personally",
            "Tendency to be clingy or possessive with friends",
            "Can be moody or withdraw from groups when feeling hurt",
            "May struggle with groups that are impersonal or competitive"
        ],
        keywords: ["Caring", "Loyal", "Emotional", "Nurturing", "Family-like", "Supportive", "Protective", "Intuitive"],
        lifeExpression: "You create family-like bonds with friends and work toward goals that provide emotional security and nurturing for your community."
    },
    12: {
        combination: "Cancer on 12th House",
        essence: "Hidden Healer",
        description: "With Cancer on your 12th house cusp, your spiritual and subconscious life is characterized by deep emotional sensitivity and intuitive healing abilities. You may have psychic or empathic gifts that allow you to sense others' emotional needs. Your service to others is likely to be deeply caring and may involve emotional healing, counseling, or providing comfort to those who are suffering. You may find spiritual fulfillment through nurturing and caring for others anonymously.",
        approach: "You serve others through emotional healing and find spiritual connection through nurturing care and intuitive sensitivity.",
        strengths: [
            "Natural psychic or empathic abilities that help you understand others' needs",
            "Deep capacity for emotional healing and providing comfort to those in pain",
            "Intuitive understanding of spiritual and emotional processes",
            "Ability to provide anonymous, selfless service through caring and nurturing"
        ],
        challenges: [
            "May be overwhelmed by others' emotions or psychic sensitivity",
            "Tendency to absorb negative emotions or become emotionally drained",
            "Can be overly self-sacrificing or neglect own emotional needs",
            "May struggle with boundaries between self and others emotionally"
        ],
        keywords: ["Healing", "Intuitive", "Empathic", "Caring", "Sensitive", "Nurturing", "Spiritual", "Compassionate"],
        lifeExpression: "Your greatest service comes through emotional healing and providing intuitive, nurturing care to those who need comfort and support."
    }
};
export const LEO_HOUSE_INTERPRETATIONS: Record<number, SignHouseInterpretation> = {
    1: {
        combination: "Leo on 1st House",
        essence: "Radiant Leader",
        description: "With Leo on your 1st house cusp (Ascendant), you project an image of confidence, warmth, and natural leadership. You approach life with dramatic flair and generous spirit. Others see you as someone who commands attention and respect, with a regal bearing and magnetic personality. Your natural impulse is to shine and inspire others, making you a natural performer and leader who isn't afraid to take center stage.",
        approach: "You tackle life with confidence, creativity, and a desire to make a lasting impression on the world.",
        strengths: [
            "Natural charisma and magnetic personality that draws others",
            "Strong leadership abilities and confidence in taking charge",
            "Creative self-expression and dramatic flair in presentation",
            "Generous, warm-hearted approach that inspires loyalty in others"
        ],
        challenges: [
            "May come across as overly dramatic or attention-seeking",
            "Tendency to be prideful or struggle with criticism",
            "Can be demanding of admiration and recognition from others",
            "May overshadow others or dominate social situations"
        ],
        keywords: ["Charismatic", "Dramatic", "Leadership", "Creative", "Confident", "Generous", "Regal", "Inspiring"],
        lifeExpression: "You're known for your vibrant presence and ability to light up any room, often being the person others look to for inspiration and leadership."
    },
    2: {
        combination: "Leo on 2nd House",
        essence: "Luxury Creator",
        description: "With Leo on your 2nd house cusp, you approach money, possessions, and values with creativity and flair. You're drawn to luxury, quality, and beautiful things that reflect your refined taste. Your self-worth is tied to your ability to live well and surround yourself with beauty. You may earn money through creative endeavors, entertainment, or luxury goods, and you're generous with your resources when you feel appreciated.",
        approach: "You build wealth and security through creative expression and by investing in quality, beautiful possessions.",
        strengths: [
            "Natural talent for creating wealth through creative or artistic pursuits",
            "Excellent taste in luxury goods and investments in beauty",
            "Generous spirit that attracts abundance through giving",
            "Confidence in your worth and ability to command good compensation"
        ],
        challenges: [
            "May overspend on luxury items or status symbols",
            "Tendency to tie self-worth too closely to material possessions",
            "Can be extravagant or dramatic in financial decisions",
            "May struggle with practical budgeting or saving money"
        ],
        keywords: ["Luxury", "Creative", "Generous", "Quality", "Dramatic", "Artistic", "Abundant", "Refined"],
        lifeExpression: "You express your values through beautiful, high-quality possessions and are known for your generous spirit and refined taste."
    },
    3: {
        combination: "Leo on 3rd House",
        essence: "Dramatic Communicator",
        description: "With Leo on your 3rd house cusp, you communicate with warmth, creativity, and dramatic flair. Your speaking and writing style is engaging and entertaining, making you a natural storyteller and teacher. You have strong, loyal relationships with siblings and neighbors, often taking a protective or leadership role. Your learning style is creative and you prefer subjects that allow for self-expression and recognition.",
        approach: "You share information and ideas with enthusiasm, creativity, and a desire to inspire and entertain others.",
        strengths: [
            "Engaging, entertaining communication style that captivates audiences",
            "Natural teaching ability and talent for making learning fun",
            "Strong, loyal relationships with siblings and local community",
            "Creative approach to learning and sharing information"
        ],
        challenges: [
            "May be overly dramatic or attention-seeking in communication",
            "Tendency to dominate conversations or overshadow others",
            "Can be prideful about ideas or resistant to criticism",
            "May exaggerate stories for dramatic effect"
        ],
        keywords: ["Dramatic", "Entertaining", "Creative", "Warm", "Storytelling", "Inspiring", "Loyal", "Expressive"],
        lifeExpression: "You're known for your captivating communication style and ability to make any topic interesting and engaging."
    },
    4: {
        combination: "Leo on 4th House",
        essence: "Proud Homemaker",
        description: "With Leo on your 4th house cusp, you approach home and family with warmth, pride, and creativity. Your home is likely to be beautiful, dramatic, and a reflection of your personality - a place where you can truly shine. You take great pride in your family heritage and may be the central figure who brings everyone together. Your emotional security comes from being appreciated and admired by those closest to you.",
        approach: "You create a warm, beautiful home environment where you and your loved ones can express yourselves freely.",
        strengths: [
            "Natural ability to create warm, welcoming home environments",
            "Strong pride in family heritage and traditions",
            "Generous, protective instincts toward family members",
            "Creative approach to home decoration and family gatherings"
        ],
        challenges: [
            "May be overly dramatic about family issues or conflicts",
            "Tendency to be controlling or demanding within the family",
            "Can be prideful about family status or achievements",
            "May struggle with family members who don't appreciate your efforts"
        ],
        keywords: ["Proud", "Creative", "Warm", "Protective", "Dramatic", "Generous", "Central", "Expressive"],
        lifeExpression: "Your home is your castle, and you're known for creating beautiful, warm spaces where family and friends feel celebrated and appreciated."
    },
    5: {
        combination: "Leo on 5th House",
        essence: "Natural Performer",
        description: "With Leo on your 5th house cusp, you approach creativity, romance, and self-expression with natural confidence and flair. This is a powerful placement that amplifies your creative talents and desire for recognition. You're drawn to the arts, entertainment, and any activity that allows you to shine. In romance, you're generous, dramatic, and seek partners who appreciate your unique qualities. Children and young people are drawn to your playful, inspiring energy.",
        approach: "You express your creativity boldly and seek recognition for your unique talents and artistic abilities.",
        strengths: [
            "Exceptional creative talents and natural performance abilities",
            "Magnetic, generous approach to romance and relationships",
            "Natural ability to inspire and entertain children and young people",
            "Confidence in self-expression and willingness to take creative risks"
        ],
        challenges: [
            "May be overly dramatic or attention-seeking in creative expression",
            "Tendency to be demanding of applause and recognition",
            "Can be prideful about creative work or resistant to feedback",
            "May struggle with creative blocks when not feeling appreciated"
        ],
        keywords: ["Creative", "Dramatic", "Confident", "Generous", "Artistic", "Romantic", "Inspiring", "Expressive"],
        lifeExpression: "You're a natural performer who brings joy and creativity to everything you do, inspiring others through your artistic expression."
    },
    6: {
        combination: "Leo on 6th House",
        essence: "Inspiring Server",
        description: "With Leo on your 6th house cusp, you approach work, health, and service with creativity and leadership. You prefer work that allows you to express your personality and receive recognition for your contributions. Your health routines may be dramatic or creative, and you inspire others through your approach to wellness. You're generous in service to others but need appreciation for your efforts.",
        approach: "You serve others with warmth and creativity, seeking work that allows for self-expression and recognition.",
        strengths: [
            "Natural leadership abilities in work and service environments",
            "Creative, inspiring approach to health and wellness routines",
            "Generous spirit in helping others and contributing to causes",
            "Ability to make routine work more engaging and enjoyable"
        ],
        challenges: [
            "May be dramatic about health issues or work problems",
            "Tendency to need excessive recognition for service and contributions",
            "Can be prideful or resistant to feedback about work performance",
            "May struggle with routine tasks that don't allow for creativity"
        ],
        keywords: ["Inspiring", "Creative", "Generous", "Leadership", "Dramatic", "Recognition", "Service", "Expressive"],
        lifeExpression: "You bring creativity and inspiration to your work and service, making even routine tasks more engaging and meaningful."
    },
    7: {
        combination: "Leo on 7th House",
        essence: "Dramatic Partner",
        description: "With Leo on your 7th house cusp, you approach partnerships and relationships with warmth, generosity, and a desire for mutual admiration. You're attracted to confident, creative partners who can match your energy and appreciate your unique qualities. Your partnerships tend to be dramatic and passionate, with both parties playing important roles. You seek relationships that enhance your sense of self and allow both partners to shine.",
        approach: "You seek partnerships that are mutually inspiring and allow both you and your partner to express your best qualities.",
        strengths: [
            "Generous, warm-hearted approach to partnerships and relationships",
            "Natural ability to inspire and support partners' growth and success",
            "Attraction to confident, creative partners who complement your energy",
            "Dramatic, passionate approach that keeps relationships exciting"
        ],
        challenges: [
            "May be overly dramatic or demanding in relationships",
            "Tendency to compete with partners for attention or recognition",
            "Can be prideful or struggle with compromise in partnerships",
            "May attract partners who are equally dramatic or attention-seeking"
        ],
        keywords: ["Generous", "Dramatic", "Passionate", "Inspiring", "Warm", "Creative", "Confident", "Mutual"],
        lifeExpression: "Your partnerships are characterized by mutual admiration, creativity, and a shared desire to shine together in the world."
    },
    8: {
        combination: "Leo on 8th House",
        essence: "Transformative Creator",
        description: "With Leo on your 8th house cusp, you approach transformation, shared resources, and deep psychology with creativity and dramatic flair. You may have a talent for helping others through major life changes, using your natural warmth and confidence to guide them. Your approach to joint finances and investments may be bold and creative, and you're not afraid to take calculated risks for greater rewards.",
        approach: "You transform yourself and others through creative expression and confident leadership during times of change.",
        strengths: [
            "Natural ability to inspire others through major life transformations",
            "Creative, confident approach to investments and shared resources",
            "Dramatic healing presence that helps others feel empowered",
            "Bold willingness to face deep psychological work and change"
        ],
        challenges: [
            "May be overly dramatic about crises or transformational experiences",
            "Tendency to be controlling or dominating in shared financial matters",
            "Can be prideful about psychological insights or healing abilities",
            "May struggle with subtle or gradual transformation processes"
        ],
        keywords: ["Transformative", "Creative", "Bold", "Inspiring", "Dramatic", "Confident", "Healing", "Empowering"],
        lifeExpression: "You help others transform their lives through your creative, confident approach to change and your natural healing presence."
    },
    9: {
        combination: "Leo on 9th House",
        essence: "Inspiring Teacher",
        description: "With Leo on your 9th house cusp, you approach higher learning, philosophy, and wisdom with creativity and enthusiasm. You're a natural teacher who can make complex subjects engaging and inspiring. Your philosophical beliefs are likely to be optimistic and centered on human potential and creativity. Travel and foreign cultures inspire your creative expression, and you may be drawn to publishing or sharing your wisdom with a wider audience.",
        approach: "You seek and share wisdom through creative expression and inspiring teaching that uplifts others.",
        strengths: [
            "Natural teaching ability that makes learning engaging and inspiring",
            "Creative, optimistic philosophical outlook that empowers others",
            "Generous sharing of knowledge and wisdom with broader audiences",
            "Dramatic, memorable presentation style that makes lasting impressions"
        ],
        challenges: [
            "May be overly dramatic or preachy when sharing beliefs",
            "Tendency to be prideful about knowledge or philosophical insights",
            "Can be dogmatic or resistant to other philosophical viewpoints",
            "May seek excessive recognition for teaching or wisdom-sharing"
        ],
        keywords: ["Inspiring", "Teaching", "Creative", "Optimistic", "Generous", "Dramatic", "Wisdom", "Uplifting"],
        lifeExpression: "You're known for your ability to make learning exciting and inspiring, sharing wisdom that empowers others to reach their potential."
    },
    10: {
        combination: "Leo on 10th House",
        essence: "Natural Authority",
        description: "With Leo on your 10th house cusp (Midheaven), you're destined for leadership roles and public recognition. Your career path likely involves creativity, entertainment, leadership, or any field where you can express your personality and receive appreciation. You have a natural authority and regal bearing that commands respect. Your public image is warm, confident, and inspiring, making you a natural role model or public figure.",
        approach: "You build your career and reputation through confident leadership and creative self-expression that inspires others.",
        strengths: [
            "Natural leadership abilities and commanding presence in professional settings",
            "Creative, inspiring approach to career that attracts recognition",
            "Generous, warm public image that builds loyal following",
            "Confidence in taking on high-profile roles and responsibilities"
        ],
        challenges: [
            "May be overly dramatic or attention-seeking in professional settings",
            "Tendency to be prideful or struggle with professional criticism",
            "Can be demanding of recognition and appreciation from superiors",
            "May struggle with behind-the-scenes work or supporting roles"
        ],
        keywords: ["Leadership", "Authority", "Creative", "Recognition", "Inspiring", "Confident", "Public", "Regal"],
        lifeExpression: "You're destined for leadership roles where your natural authority and creative vision can inspire others and make a lasting impact."
    },
    11: {
        combination: "Leo on 11th House",
        essence: "Inspiring Friend",
        description: "With Leo on your 11th house cusp, you approach friendships and group activities with warmth, generosity, and natural leadership. You're often the central figure in your social circles, bringing people together and inspiring group activities. Your hopes and dreams are likely to be grand and creative, involving ways to express yourself and make a positive impact on the world. You're drawn to groups that appreciate your unique contributions.",
        approach: "You build friendships and pursue goals through generous leadership and creative inspiration of others.",
        strengths: [
            "Natural ability to bring people together and inspire group activities",
            "Generous, loyal friendships that provide mutual support and inspiration",
            "Creative, ambitious hopes and dreams that inspire others",
            "Leadership skills that help groups achieve their collective goals"
        ],
        challenges: [
            "May be overly dramatic or attention-seeking in group settings",
            "Tendency to dominate group activities or overshadow friends",
            "Can be prideful about social status or group leadership roles",
            "May struggle with friends who don't appreciate your contributions"
        ],
        keywords: ["Inspiring", "Generous", "Leadership", "Creative", "Loyal", "Dramatic", "Central", "Ambitious"],
        lifeExpression: "You're the friend who brings excitement and inspiration to any group, helping others pursue their dreams with confidence and creativity."
    },
    12: {
        combination: "Leo on 12th House",
        essence: "Hidden Creator",
        description: "With Leo on your 12th house cusp, your creative and leadership abilities may be expressed in more subtle or behind-the-scenes ways. You may find fulfillment in anonymous service or creative work that doesn't seek recognition. Your spiritual path likely involves developing humility while maintaining your natural confidence. You may have hidden talents for healing or inspiring others through your compassionate, generous spirit.",
        approach: "You serve and create from behind the scenes, finding fulfillment in anonymous contribution and spiritual growth.",
        strengths: [
            "Generous, compassionate service that doesn't seek recognition",
            "Hidden creative talents that emerge through spiritual practice",
            "Natural ability to inspire others through humble, authentic presence",
            "Confident approach to spiritual growth and transcendent experiences"
        ],
        challenges: [
            "May struggle with ego dissolution or loss of individual recognition",
            "Tendency to be dramatic about spiritual experiences or sacrifices",
            "Can be prideful about spiritual insights or service contributions",
            "May resist the humble, anonymous nature of 12th house expression"
        ],
        keywords: ["Hidden", "Compassionate", "Service", "Spiritual", "Humble", "Creative", "Transcendent", "Anonymous"],
        lifeExpression: "Your greatest contributions may come through humble service and behind-the-scenes creativity that uplifts others without seeking recognition."
    }
};
export const VIRGO_HOUSE_INTERPRETATIONS: Record<number, SignHouseInterpretation> = {
    1: {
        combination: "Virgo on 1st House",
        essence: "Precise Perfectionist",
        description: "With Virgo on your 1st house cusp (Ascendant), you project an image of precision, reliability, and thoughtful analysis. Others see you as someone who is detail-oriented, helpful, and naturally organized. You approach life with careful consideration and a desire to improve and perfect whatever you encounter. Your presence is modest yet competent, and you have a natural ability to notice what needs to be fixed or improved. People often turn to you for practical advice and assistance.",
        approach: "You tackle life with careful analysis, attention to detail, and a desire to be helpful and improve situations.",
        strengths: [
            "Exceptional attention to detail and ability to spot what needs improvement",
            "Natural helpfulness and desire to be of service to others",
            "Practical, analytical approach that finds efficient solutions",
            "Modest, reliable presence that others can depend on for accuracy"
        ],
        challenges: [
            "May be overly critical of self and others, focusing on flaws",
            "Tendency to worry excessively or be anxious about imperfections",
            "Can be too modest or self-effacing, undervaluing contributions",
            "May struggle with perfectionism that prevents action or completion"
        ],
        keywords: ["Precise", "Analytical", "Helpful", "Organized", "Modest", "Reliable", "Perfectionist", "Practical"],
        lifeExpression: "You're known for your precision, helpfulness, and ability to improve any situation through careful analysis and practical solutions."
    },
    2: {
        combination: "Virgo on 2nd House",
        essence: "Practical Saver",
        description: "With Virgo on your 2nd house cusp, you approach money and possessions with careful analysis, practical planning, and attention to value and utility. You're naturally frugal and prefer to research purchases thoroughly before buying. Your financial approach is conservative and methodical, focusing on building security through careful budgeting and practical investments. You value possessions that are useful, well-made, and serve a practical purpose.",
        approach: "You build wealth through careful analysis, practical planning, and focus on utility and long-term value.",
        strengths: [
            "Exceptional budgeting skills and ability to find the best value for money",
            "Practical approach to investments that focuses on steady, reliable growth",
            "Natural ability to organize finances and track expenses meticulously",
            "Preference for quality, useful possessions that serve practical purposes"
        ],
        challenges: [
            "May be overly frugal or anxious about spending money",
            "Tendency to over-analyze financial decisions and miss opportunities",
            "Can be too critical of others' spending habits or financial choices",
            "May struggle with enjoying money or purchasing non-essential items"
        ],
        keywords: ["Practical", "Frugal", "Analytical", "Organized", "Conservative", "Useful", "Methodical", "Value-focused"],
        lifeExpression: "You create financial security through careful planning and practical choices, always seeking the best value and utility."
    },
    3: {
        combination: "Virgo on 3rd House",
        essence: "Analytical Communicator",
        description: "With Virgo on your 3rd house cusp, you communicate with precision, attention to detail, and a focus on practical, useful information. Your speaking and writing style is clear, organized, and often aimed at helping others understand complex topics. You have excellent analytical abilities and can break down complicated subjects into manageable parts. Your relationships with siblings and neighbors are helpful and supportive, often involving practical assistance.",
        approach: "You communicate with precision and clarity, focusing on sharing practical, useful information that helps others.",
        strengths: [
            "Exceptional ability to explain complex topics clearly and systematically",
            "Natural talent for editing, proofreading, and improving written communication",
            "Helpful, supportive relationships with siblings and local community",
            "Analytical thinking that can solve practical communication problems"
        ],
        challenges: [
            "May be overly critical or nitpicky in communication",
            "Tendency to focus on details and miss the bigger picture in conversations",
            "Can be anxious or worried about making communication mistakes",
            "May struggle with spontaneous or emotional forms of communication"
        ],
        keywords: ["Precise", "Clear", "Analytical", "Helpful", "Organized", "Detailed", "Practical", "Systematic"],
        lifeExpression: "You're known for your clear, helpful communication and ability to make complex information accessible and practical."
    },
    4: {
        combination: "Virgo on 4th House",
        essence: "Organized Homemaker",
        description: "With Virgo on your 4th house cusp, you approach home and family with organization, practical care, and attention to health and cleanliness. Your home is likely to be well-organized, clean, and efficiently arranged for maximum functionality. You may be the family member who takes care of practical matters, health concerns, and daily routines. Your emotional security comes from having an orderly, well-functioning home environment.",
        approach: "You create organized, healthy home environments and provide practical care and support to family members.",
        strengths: [
            "Exceptional ability to organize and maintain efficient home environments",
            "Natural talent for managing family health, nutrition, and daily routines",
            "Practical approach to family problems that finds workable solutions",
            "Attention to detail that ensures home comfort and functionality"
        ],
        challenges: [
            "May be overly critical or demanding about home organization and cleanliness",
            "Tendency to worry excessively about family health and practical matters",
            "Can be too focused on perfection and miss emotional family needs",
            "May struggle with family members who are less organized or detail-oriented"
        ],
        keywords: ["Organized", "Clean", "Practical", "Healthy", "Efficient", "Detailed", "Caring", "Systematic"],
        lifeExpression: "Your home is a model of organization and efficiency, and you're the family member who ensures everyone's practical needs are met."
    },
    5: {
        combination: "Virgo on 5th House",
        essence: "Crafted Creator",
        description: "With Virgo on your 5th house cusp, you approach creativity, romance, and self-expression with precision, skill, and attention to craft. Your creative works are likely to be well-executed, detailed, and demonstrate technical mastery. In romance, you show love through practical acts of service and attention to your partner's needs. You may have a talent for teaching children or helping them develop practical skills and good habits.",
        approach: "You express creativity through skilled craftsmanship and show love through practical service and attention to detail.",
        strengths: [
            "Exceptional technical skill and attention to craft in creative pursuits",
            "Practical, caring approach to romance that focuses on partner's real needs",
            "Natural ability to teach children practical skills and good habits",
            "Dedication to perfecting creative abilities through practice and study"
        ],
        challenges: [
            "May be overly critical of creative work or struggle with perfectionism",
            "Tendency to focus on technique rather than emotional expression in creativity",
            "Can be too practical or analytical in romantic relationships",
            "May struggle with spontaneous or playful forms of self-expression"
        ],
        keywords: ["Skilled", "Precise", "Crafted", "Practical", "Caring", "Technical", "Detailed", "Perfected"],
        lifeExpression: "You create beautiful, skillfully crafted works and show love through practical care and attention to others' needs."
    },
    6: {
        combination: "Virgo on 6th House",
        essence: "Perfect Server",
        description: "With Virgo on your 6th house cusp, you have an exceptional affinity for work, health, and service. This is a powerful placement that amplifies your natural abilities in organization, analysis, and practical problem-solving. You excel in work environments that require attention to detail, and you have a natural understanding of health, nutrition, and wellness practices. Your approach to service is thorough, reliable, and focused on genuine improvement.",
        approach: "You serve others through meticulous work and maintain optimal health through careful attention to wellness practices.",
        strengths: [
            "Exceptional work ethic and ability to handle detailed, complex tasks",
            "Natural understanding of health, nutrition, and holistic wellness practices",
            "Talent for organizing systems and improving efficiency in any environment",
            "Genuine desire to help others through practical, useful service"
        ],
        challenges: [
            "May be overly perfectionist or critical about work performance",
            "Tendency to worry excessively about health or become hypochondriacal",
            "Can be too focused on details and miss opportunities for advancement",
            "May struggle with delegation or trusting others to meet your standards"
        ],
        keywords: ["Meticulous", "Healthy", "Organized", "Efficient", "Analytical", "Reliable", "Perfectionist", "Service-oriented"],
        lifeExpression: "You're known for your exceptional work quality and comprehensive approach to health and service that truly helps others."
    },
    7: {
        combination: "Virgo on 7th House",
        essence: "Helpful Partner",
        description: "With Virgo on your 7th house cusp, you seek partnerships that are practical, supportive, and based on mutual helpfulness. You're attracted to partners who are reliable, organized, and share your values regarding service and improvement. Your approach to relationships is thoughtful and analytical, and you show love through practical acts of service. You prefer partnerships that function efficiently and support both parties' growth and well-being.",
        approach: "You build partnerships based on mutual helpfulness, practical support, and shared commitment to improvement.",
        strengths: [
            "Natural ability to support partners through practical help and service",
            "Analytical approach to relationships that identifies and solves problems",
            "Attraction to reliable, organized partners who share your values",
            "Talent for creating efficient, well-functioning partnership dynamics"
        ],
        challenges: [
            "May be overly critical or analytical about partners and relationships",
            "Tendency to focus on fixing partners rather than accepting them",
            "Can be too practical or miss the emotional aspects of relationships",
            "May attract partners who are overly dependent or need constant help"
        ],
        keywords: ["Helpful", "Practical", "Analytical", "Supportive", "Reliable", "Organized", "Improving", "Efficient"],
        lifeExpression: "Your partnerships are characterized by mutual support, practical helpfulness, and shared commitment to growth and improvement."
    },
    8: {
        combination: "Virgo on 8th House",
        essence: "Analytical Transformer",
        description: "With Virgo on your 8th house cusp, you approach transformation, shared resources, and deep psychology with careful analysis and practical methodology. You may have a talent for managing complex financial matters, taxes, or investments with meticulous attention to detail. Your approach to psychological transformation is systematic and thorough, and you may help others through crisis by providing practical analysis and organized support.",
        approach: "You navigate transformation through systematic analysis and manage shared resources with meticulous care and organization.",
        strengths: [
            "Exceptional ability to analyze and manage complex financial or shared resources",
            "Systematic approach to psychological transformation that creates lasting change",
            "Natural talent for research and investigation that uncovers important details",
            "Practical support during crisis that helps others organize and cope"
        ],
        challenges: [
            "May over-analyze transformational experiences and miss emotional depth",
            "Tendency to be overly critical or perfectionist about psychological work",
            "Can be anxious or worried about shared resources or financial security",
            "May struggle with the messy, non-linear nature of deep transformation"
        ],
        keywords: ["Analytical", "Systematic", "Detailed", "Organized", "Practical", "Thorough", "Methodical", "Investigative"],
        lifeExpression: "You help others navigate complex transformations and shared resources through careful analysis and practical organization."
    },
    9: {
        combination: "Virgo on 9th House",
        essence: "Practical Scholar",
        description: "With Virgo on your 9th house cusp, you approach higher learning, philosophy, and wisdom with analytical thinking and practical application. You prefer educational approaches that are systematic, well-organized, and have clear practical benefits. Your philosophical beliefs are likely to be grounded in logic and real-world experience rather than abstract theory. You may have a talent for teaching or sharing knowledge in clear, organized ways.",
        approach: "You seek wisdom through systematic study and practical application, sharing knowledge in organized, accessible ways.",
        strengths: [
            "Ability to organize complex philosophical or educational material systematically",
            "Natural talent for teaching that makes difficult subjects accessible",
            "Practical approach to wisdom that focuses on real-world application",
            "Analytical thinking that can evaluate and improve educational methods"
        ],
        challenges: [
            "May be too analytical or critical of philosophical or spiritual concepts",
            "Tendency to focus on details and miss the broader philosophical picture",
            "Can be skeptical of abstract or non-practical forms of wisdom",
            "May struggle with educational approaches that are unstructured or intuitive"
        ],
        keywords: ["Analytical", "Systematic", "Practical", "Organized", "Educational", "Logical", "Detailed", "Methodical"],
        lifeExpression: "You're known for your ability to organize and teach complex subjects in practical, accessible ways that truly help others learn."
    },
    10: {
        combination: "Virgo on 10th House",
        essence: "Meticulous Professional",
        description: "With Virgo on your 10th house cusp (Midheaven), you build your career and reputation through meticulous work, attention to detail, and genuine service to others. You're drawn to careers that involve analysis, organization, health, or helping others improve their lives. Your professional reputation is built on your reliability, precision, and ability to handle complex tasks with accuracy. You prefer to advance through demonstrated competence rather than self-promotion.",
        approach: "You build your career through exceptional work quality, attention to detail, and genuine service that helps others.",
        strengths: [
            "Exceptional professional reputation based on reliability and precision",
            "Natural talent for careers involving analysis, organization, or health services",
            "Ability to handle complex professional responsibilities with accuracy",
            "Genuine commitment to service that creates lasting professional relationships"
        ],
        challenges: [
            "May be overly modest or fail to promote achievements and capabilities",
            "Tendency to be perfectionist or overly critical of professional performance",
            "Can be anxious or worried about professional competence and recognition",
            "May struggle with self-promotion or taking credit for accomplishments"
        ],
        keywords: ["Meticulous", "Reliable", "Precise", "Analytical", "Service-oriented", "Competent", "Organized", "Professional"],
        lifeExpression: "You're known for your exceptional professional competence and genuine commitment to service that makes a real difference."
    },
    11: {
        combination: "Virgo on 11th House",
        essence: "Helpful Friend",
        description: "With Virgo on your 11th house cusp, you approach friendships and group activities with helpfulness, practical support, and attention to what truly serves the group's needs. Your friendships are based on mutual assistance and shared commitment to improvement and service. You're drawn to groups that have practical goals and make real improvements in people's lives. Your hopes and dreams are realistic and focused on genuine service to others.",
        approach: "You build friendships through practical helpfulness and pursue group goals that create real, measurable improvements.",
        strengths: [
            "Natural ability to provide practical help and support to friends",
            "Talent for organizing group activities and ensuring they run efficiently",
            "Realistic approach to group goals that ensures achievable, useful outcomes",
            "Genuine commitment to friendships based on mutual service and support"
        ],
        challenges: [
            "May be overly critical of friends or group performance",
            "Tendency to focus on practical matters and miss social or emotional aspects",
            "Can be too modest or self-effacing in group settings",
            "May struggle with groups that are disorganized or lack clear practical goals"
        ],
        keywords: ["Helpful", "Practical", "Organized", "Supportive", "Realistic", "Service-oriented", "Efficient", "Reliable"],
        lifeExpression: "You're the friend who provides practical support and helps groups achieve realistic goals that make a real difference."
    },
    12: {
        combination: "Virgo on 12th House",
        essence: "Humble Healer",
        description: "With Virgo on your 12th house cusp, your spiritual and subconscious life is characterized by humble service and practical healing abilities. You may have hidden talents for health and healing work, and you find spiritual fulfillment through anonymous service that genuinely helps others. Your approach to spirituality is practical and grounded, and you may be drawn to healing modalities that combine spiritual and physical wellness. You serve others through careful, detailed attention to their real needs.",
        approach: "You serve others through humble, practical healing work and find spiritual connection through anonymous, genuine service.",
        strengths: [
            "Natural healing abilities that combine practical and spiritual approaches",
            "Humble, selfless service that focuses on others' genuine needs",
            "Hidden talents for detailed work that supports healing and wellness",
            "Practical approach to spirituality that creates real, measurable benefits"
        ],
        challenges: [
            "May be overly self-critical or struggle with perfectionism in spiritual work",
            "Tendency to worry or be anxious about spiritual or healing abilities",
            "Can be too modest or fail to recognize the value of spiritual contributions",
            "May struggle with non-practical or purely mystical spiritual approaches"
        ],
        keywords: ["Humble", "Healing", "Practical", "Service", "Detailed", "Selfless", "Grounded", "Caring"],
        lifeExpression: "Your greatest service comes through humble, practical healing work that addresses others' real needs with careful attention and genuine care."
    }
};
export const LIBRA_HOUSE_INTERPRETATIONS: Record<number, SignHouseInterpretation> = {
    1: {
        combination: "Libra on 1st House",
        essence: "Harmonious Diplomat",
        description: "With Libra on your 1st house cusp (Ascendant), you project an image of grace, charm, and natural diplomacy. Others see you as someone who is fair-minded, aesthetically aware, and naturally cooperative. You approach life with a desire for harmony and balance, often serving as a mediator in conflicts. Your presence is pleasant and refined, and you have a natural ability to make others feel comfortable and appreciated. People are drawn to your sense of fairness and your appreciation for beauty.",
        approach: "You tackle life with diplomacy, seeking harmony and balance while maintaining fairness and aesthetic appreciation.",
        strengths: [
            "Natural charm and diplomatic skills that help resolve conflicts",
            "Strong sense of fairness and justice that others respect and trust",
            "Aesthetic awareness and appreciation for beauty in all forms",
            "Cooperative approach that brings people together and builds consensus"
        ],
        challenges: [
            "May avoid conflict or difficult decisions to maintain harmony",
            "Tendency to be indecisive or overly dependent on others' opinions",
            "Can be people-pleasing or lose personal identity in relationships",
            "May struggle with taking strong stands or asserting individual needs"
        ],
        keywords: ["Diplomatic", "Harmonious", "Fair", "Charming", "Balanced", "Aesthetic", "Cooperative", "Graceful"],
        lifeExpression: "You're known for your diplomatic nature and ability to bring harmony and beauty to any situation while treating everyone fairly."
    },
    2: {
        combination: "Libra on 2nd House",
        essence: "Aesthetic Investor",
        description: "With Libra on your 2nd house cusp, you approach money and possessions with an appreciation for beauty, balance, and shared values. You're drawn to beautiful, harmonious possessions and may invest in art, luxury items, or things that enhance your aesthetic environment. Your financial decisions are often influenced by partnerships, and you prefer to make money through cooperative ventures or beauty-related fields. You value fairness in financial dealings.",
        approach: "You build wealth through aesthetic investments and cooperative ventures while maintaining fairness in all financial dealings.",
        strengths: [
            "Natural eye for beautiful investments that appreciate in value over time",
            "Ability to create wealth through partnerships and cooperative ventures",
            "Fair, balanced approach to money that builds trust with others",
            "Appreciation for quality and beauty that guides wise purchasing decisions"
        ],
        challenges: [
            "May overspend on beautiful or luxury items beyond practical needs",
            "Tendency to be indecisive about financial choices or investments",
            "Can be too dependent on partners for financial security or decisions",
            "May struggle with asserting financial needs or negotiating aggressively"
        ],
        keywords: ["Aesthetic", "Balanced", "Cooperative", "Beautiful", "Fair", "Harmonious", "Shared", "Refined"],
        lifeExpression: "You create financial security through aesthetic investments and fair partnerships, always seeking beauty and balance in your possessions."
    },
    3: {
        combination: "Libra on 3rd House",
        essence: "Diplomatic Communicator",
        description: "With Libra on your 3rd house cusp, you communicate with charm, diplomacy, and a natural ability to see multiple perspectives. Your speaking and writing style is balanced, fair, and often focused on bringing people together. You excel at mediation and can help others find common ground in disagreements. Your relationships with siblings and neighbors are harmonious and cooperative, and you may serve as the peacemaker in your local community.",
        approach: "You communicate with diplomatic grace, seeking to understand all perspectives and create harmony through balanced dialogue.",
        strengths: [
            "Exceptional diplomatic communication skills that resolve conflicts peacefully",
            "Natural ability to see and present multiple perspectives fairly",
            "Charming, pleasant communication style that puts others at ease",
            "Talent for bringing people together through balanced, inclusive dialogue"
        ],
        challenges: [
            "May avoid expressing strong opinions to maintain conversational harmony",
            "Tendency to be indecisive in communication or change positions frequently",
            "Can be overly diplomatic and fail to address important issues directly",
            "May struggle with confrontational or emotionally intense conversations"
        ],
        keywords: ["Diplomatic", "Balanced", "Charming", "Fair", "Harmonious", "Cooperative", "Peaceful", "Inclusive"],
        lifeExpression: "You're known for your diplomatic communication and ability to bring people together through fair, balanced dialogue."
    },
    4: {
        combination: "Libra on 4th House",
        essence: "Harmonious Home",
        description: "With Libra on your 4th house cusp, you approach home and family with a desire for harmony, beauty, and balanced relationships. Your home is likely to be aesthetically pleasing, well-decorated, and designed to promote peace and cooperation among family members. You may serve as the family diplomat, helping to resolve conflicts and maintain harmonious relationships. Your emotional security comes from balanced, fair family dynamics.",
        approach: "You create beautiful, harmonious home environments where family members feel balanced, appreciated, and fairly treated.",
        strengths: [
            "Natural ability to create aesthetically beautiful and harmonious homes",
            "Talent for mediating family conflicts and maintaining peaceful relationships",
            "Fair, balanced approach to family dynamics that ensures everyone feels heard",
            "Appreciation for family traditions that bring beauty and harmony to gatherings"
        ],
        challenges: [
            "May avoid addressing serious family problems to maintain surface harmony",
            "Tendency to be indecisive about home decisions or family matters",
            "Can be overly focused on appearances and miss deeper family needs",
            "May struggle with family members who are confrontational or uncooperative"
        ],
        keywords: ["Harmonious", "Beautiful", "Balanced", "Peaceful", "Fair", "Aesthetic", "Cooperative", "Diplomatic"],
        lifeExpression: "Your home is a haven of beauty and harmony where family members feel balanced, appreciated, and fairly treated."
    },
    5: {
        combination: "Libra on 5th House",
        essence: "Romantic Artist",
        description: "With Libra on your 5th house cusp, you approach creativity, romance, and self-expression with grace, beauty, and a desire for harmonious partnerships. Your creative works are likely to be aesthetically pleasing and may focus on themes of love, beauty, or social harmony. In romance, you're charming, considerate, and seek partnerships that are balanced and mutually appreciative. You may have a natural talent for arts that involve collaboration or partnership.",
        approach: "You express creativity through beautiful, harmonious works and seek romantic relationships that are balanced and mutually fulfilling.",
        strengths: [
            "Natural talent for creating beautiful, aesthetically pleasing works of art",
            "Charming, romantic approach that creates harmonious love relationships",
            "Ability to collaborate creatively and bring out the best in creative partners",
            "Appreciation for beauty and harmony that enhances all creative expression"
        ],
        challenges: [
            "May be indecisive about creative direction or romantic choices",
            "Tendency to avoid creative risks or controversial artistic expression",
            "Can be overly dependent on others' approval for creative validation",
            "May struggle with creative or romantic situations that involve conflict"
        ],
        keywords: ["Romantic", "Beautiful", "Harmonious", "Collaborative", "Aesthetic", "Charming", "Balanced", "Graceful"],
        lifeExpression: "You create beautiful, harmonious art and seek romantic relationships that are balanced, charming, and mutually appreciative."
    },
    6: {
        combination: "Libra on 6th House",
        essence: "Cooperative Helper",
        description: "With Libra on your 6th house cusp, you approach work, health, and service with cooperation, fairness, and aesthetic awareness. You prefer work environments that are harmonious and collaborative, and you excel at jobs that involve working with others or creating beauty. Your approach to health may involve balance, moderation, and activities that promote both physical and emotional well-being. You serve others through creating harmony and fairness.",
        approach: "You serve others through cooperative teamwork and maintain health through balanced, harmonious lifestyle choices.",
        strengths: [
            "Exceptional teamwork skills and ability to create harmonious work environments",
            "Natural talent for jobs involving beauty, aesthetics, or interpersonal cooperation",
            "Balanced approach to health that considers both physical and emotional well-being",
            "Fair, diplomatic approach to workplace conflicts and service relationships"
        ],
        challenges: [
            "May avoid necessary workplace confrontations to maintain harmony",
            "Tendency to be indecisive about work choices or health decisions",
            "Can be overly dependent on others' cooperation for work effectiveness",
            "May struggle with competitive or highly individualistic work environments"
        ],
        keywords: ["Cooperative", "Harmonious", "Fair", "Balanced", "Aesthetic", "Diplomatic", "Collaborative", "Peaceful"],
        lifeExpression: "You're known for your cooperative work style and ability to create harmonious, fair environments where everyone can contribute effectively."
    },
    7: {
        combination: "Libra on 7th House",
        essence: "Perfect Partner",
        description: "With Libra on your 7th house cusp, you have an exceptional affinity for partnerships and relationships. This is a powerful placement that amplifies your natural abilities in cooperation, diplomacy, and creating harmonious partnerships. You seek relationships that are balanced, fair, and mutually supportive. Your approach to partnerships is gracious and considerate, and you have a natural talent for bringing out the best in others through cooperative interaction.",
        approach: "You build partnerships based on mutual respect, fairness, and shared appreciation for harmony and beauty.",
        strengths: [
            "Exceptional partnership skills and natural ability to create harmonious relationships",
            "Strong sense of fairness and justice that creates trust in partnerships",
            "Diplomatic approach to relationship conflicts that finds win-win solutions",
            "Natural charm and grace that attracts compatible, balanced partners"
        ],
        challenges: [
            "May be overly dependent on partnerships for identity and decision-making",
            "Tendency to avoid necessary relationship confrontations to maintain peace",
            "Can be indecisive about partnership choices or relationship directions",
            "May lose individual identity or needs in the desire to please partners"
        ],
        keywords: ["Harmonious", "Balanced", "Fair", "Diplomatic", "Cooperative", "Gracious", "Mutual", "Partnership-focused"],
        lifeExpression: "Your partnerships are characterized by mutual respect, fairness, and shared commitment to creating harmony and beauty together."
    },
    8: {
        combination: "Libra on 8th House",
        essence: "Balanced Transformer",
        description: "With Libra on your 8th house cusp, you approach transformation, shared resources, and deep psychology with a desire for balance, fairness, and harmonious resolution. You may have a talent for mediating complex financial or emotional situations and helping others find balance during times of crisis. Your approach to shared resources is fair and cooperative, and you seek transformational experiences that restore harmony and justice.",
        approach: "You navigate transformation through diplomatic balance and manage shared resources with fairness and cooperative spirit.",
        strengths: [
            "Natural ability to mediate complex financial or emotional situations fairly",
            "Diplomatic approach to crisis that helps restore balance and harmony",
            "Talent for managing shared resources in ways that benefit all parties",
            "Ability to find beauty and meaning in transformational experiences"
        ],
        challenges: [
            "May avoid necessary confrontations about shared resources or deep issues",
            "Tendency to be indecisive during crisis or transformational periods",
            "Can be overly focused on fairness and miss opportunities for necessary change",
            "May struggle with the messy, unbalanced nature of deep transformation"
        ],
        keywords: ["Balanced", "Fair", "Diplomatic", "Harmonious", "Cooperative", "Mediating", "Just", "Aesthetic"],
        lifeExpression: "You help others navigate transformation and shared resources through diplomatic balance and fair, harmonious solutions."
    },
    9: {
        combination: "Libra on 9th House",
        essence: "Diplomatic Scholar",
        description: "With Libra on your 9th house cusp, you approach higher learning, philosophy, and wisdom with a desire for balance, fairness, and multiple perspectives. Your philosophical beliefs likely emphasize justice, harmony, and the importance of considering all viewpoints. You may be drawn to legal studies, diplomatic fields, or educational approaches that promote understanding between different cultures and perspectives. Your approach to travel and foreign cultures is gracious and appreciative.",
        approach: "You seek wisdom through balanced consideration of multiple perspectives and share knowledge that promotes harmony and justice.",
        strengths: [
            "Natural ability to understand and appreciate diverse philosophical perspectives",
            "Talent for teaching or sharing knowledge in balanced, fair ways",
            "Diplomatic approach to cultural differences that builds bridges between groups",
            "Appreciation for beauty and harmony in different wisdom traditions"
        ],
        challenges: [
            "May be indecisive about philosophical beliefs or avoid taking strong positions",
            "Tendency to be overly diplomatic and fail to address important philosophical issues",
            "Can be too focused on balance and miss the need for decisive action",
            "May struggle with philosophical systems that are confrontational or absolute"
        ],
        keywords: ["Balanced", "Fair", "Diplomatic", "Harmonious", "Just", "Appreciative", "Cultural", "Perspective-rich"],
        lifeExpression: "You're known for your ability to appreciate diverse perspectives and share wisdom that promotes understanding and harmony between different groups."
    },
    10: {
        combination: "Libra on 10th House",
        essence: "Diplomatic Leader",
        description: "With Libra on your 10th house cusp (Midheaven), you build your career and reputation through diplomacy, fairness, and aesthetic sensibility. You're drawn to careers that involve working with others, creating beauty, or promoting justice and harmony. Your professional reputation is built on your ability to bring people together, mediate conflicts, and create balanced solutions. You prefer to lead through cooperation and consensus rather than authoritarian control.",
        approach: "You build your career through diplomatic leadership and create professional environments based on fairness and aesthetic excellence.",
        strengths: [
            "Exceptional diplomatic leadership skills that build consensus and cooperation",
            "Natural talent for careers involving beauty, justice, or interpersonal harmony",
            "Ability to create aesthetically pleasing and harmonious work environments",
            "Professional reputation built on fairness, grace, and collaborative success"
        ],
        challenges: [
            "May be indecisive about career direction or avoid necessary professional confrontations",
            "Tendency to be overly dependent on others' approval for professional validation",
            "Can be too focused on maintaining harmony and miss opportunities for advancement",
            "May struggle with highly competitive or individualistic professional environments"
        ],
        keywords: ["Diplomatic", "Fair", "Aesthetic", "Harmonious", "Cooperative", "Graceful", "Balanced", "Collaborative"],
        lifeExpression: "You're known for your diplomatic leadership style and ability to create professional environments where beauty, fairness, and cooperation thrive."
    },
    11: {
        combination: "Libra on 11th House",
        essence: "Social Harmonizer",
        description: "With Libra on your 11th house cusp, you approach friendships and group activities with charm, diplomacy, and a desire to create social harmony. Your friendships are likely to be balanced, mutually supportive, and based on shared aesthetic or social values. You're drawn to groups that promote fairness, beauty, or social justice, and you may serve as the diplomatic liaison who helps groups work together cooperatively. Your hopes and dreams often involve creating a more harmonious, beautiful world.",
        approach: "You build friendships through charm and cooperation and pursue group goals that promote harmony, beauty, and social justice.",
        strengths: [
            "Natural ability to create harmonious, balanced friendships and social connections",
            "Talent for bringing diverse groups together around shared values and goals",
            "Diplomatic skills that help groups resolve conflicts and work cooperatively",
            "Appreciation for beauty and harmony that enhances all social activities"
        ],
        challenges: [
            "May avoid addressing serious group conflicts to maintain surface harmony",
            "Tendency to be indecisive about group commitments or social choices",
            "Can be overly dependent on social approval or group consensus",
            "May struggle with groups that are confrontational or highly competitive"
        ],
        keywords: ["Harmonious", "Diplomatic", "Social", "Balanced", "Cooperative", "Charming", "Fair", "Aesthetic"],
        lifeExpression: "You're the social harmonizer who brings people together and helps groups achieve goals that create beauty and fairness in the world."
    },
    12: {
        combination: "Libra on 12th House",
        essence: "Hidden Peacemaker",
        description: "With Libra on your 12th house cusp, your spiritual and subconscious life is characterized by a deep need for harmony, balance, and aesthetic beauty. You may have hidden talents for mediation, healing, or creating beauty that serves others. Your service to others is likely to be gracious and diplomatic, often working behind the scenes to create harmony and resolve conflicts. You may find spiritual fulfillment through art, music, or other beautiful expressions of divine harmony.",
        approach: "You serve others through hidden peacemaking and find spiritual connection through beauty, harmony, and balanced service.",
        strengths: [
            "Natural ability to create harmony and resolve conflicts through behind-the-scenes work",
            "Hidden talents for creating beauty that heals and uplifts others spiritually",
            "Diplomatic approach to spiritual service that helps others find balance",
            "Appreciation for divine beauty and harmony that enhances spiritual practice"
        ],
        challenges: [
            "May avoid addressing serious spiritual or psychological conflicts",
            "Tendency to be indecisive about spiritual path or service commitments",
            "Can be overly focused on spiritual aesthetics and miss deeper truths",
            "May struggle with spiritual practices that require confrontation or intensity"
        ],
        keywords: ["Harmonious", "Beautiful", "Diplomatic", "Balanced", "Peaceful", "Aesthetic", "Graceful", "Healing"],
        lifeExpression: "Your greatest service comes through creating hidden harmony and beauty that heals others and brings divine balance to the world."
    }
};
// Sagittarius on House Cusps
export const SAGITTARIUS_HOUSE_INTERPRETATIONS: Record<number, SignHouseInterpretation> = {
    1: {
        combination: "Sagittarius on 1st House",
        essence: "Adventurous Explorer",
        description: "With Sagittarius on your 1st house cusp (Ascendant), you project an image of optimism, adventure, and philosophical wisdom. Others see you as someone who is enthusiastic, freedom-loving, and naturally curious about the world. You approach life with a sense of adventure and a desire to explore new horizons, both literally and metaphorically. Your jovial nature and broad perspective make you naturally inspiring to others, and you have an innate ability to see the bigger picture in any situation.",
        approach: "You tackle life with optimism, adventure, and a quest for meaning and expansion in all experiences.",
        strengths: [
            "Natural optimism and enthusiasm that inspires others",
            "Broad perspective and philosophical wisdom that guides decisions",
            "Adventurous spirit that embraces new experiences and challenges",
            "Honest, direct communication style that builds trust"
        ],
        challenges: [
            "May be too blunt or tactless in communication",
            "Tendency to be restless or impatient with routine situations",
            "Can be overly optimistic, overlooking practical details",
            "Difficulty with commitment or staying focused on one path"
        ],
        keywords: ["Adventure", "Optimism", "Philosophy", "Freedom", "Exploration", "Wisdom", "Enthusiasm", "Expansion"],
        lifeExpression: "You're known for your adventurous spirit and philosophical outlook, often being the person who encourages others to think bigger and explore new possibilities."
    },
    2: {
        combination: "Sagittarius on 2nd House",
        essence: "Optimistic Accumulator",
        description: "With Sagittarius on your 2nd house cusp, you approach money and possessions with optimism and a desire for freedom and expansion. You're naturally drawn to investments that offer growth potential and may be interested in international markets or foreign currencies. Your relationship with resources is philosophical - you see money as a tool for adventure and learning rather than security. You may earn through teaching, travel, publishing, or international business.",
        approach: "You build wealth through optimistic investment and see money as a means to freedom and adventure.",
        strengths: [
            "Optimistic approach to financial opportunities and growth",
            "Natural ability to see big-picture investment potential",
            "International perspective that opens diverse earning opportunities",
            "Generous nature that attracts abundance through giving"
        ],
        challenges: [
            "May be overly optimistic about financial risks or investments",
            "Tendency to spend impulsively on travel or educational experiences",
            "Can be careless with details in financial planning",
            "Difficulty saving money when adventure opportunities arise"
        ],
        keywords: ["Financial Optimism", "International Investment", "Generous Spending", "Adventure Fund", "Educational Investment", "Growth Potential", "Freedom Money", "Philosophical Value"],
        lifeExpression: "You approach finances with optimism and see money as a passport to adventure and learning, often investing in experiences and education over material possessions."
    },
    3: {
        combination: "Sagittarius on 3rd House",
        essence: "Inspiring Communicator",
        description: "With Sagittarius on your 3rd house cusp, your communication style is enthusiastic, inspiring, and focused on sharing wisdom and big-picture perspectives. You prefer conversations that explore meaning, philosophy, or future possibilities over mundane details. Your learning style is experiential and broad-ranging, and you excel when you can connect ideas to larger themes or real-world applications. You may have a talent for teaching, writing, or any form of communication that inspires others to think bigger.",
        approach: "You communicate with enthusiasm and inspiration, seeking to share wisdom and expand others' perspectives.",
        strengths: [
            "Natural ability to inspire and motivate others through communication",
            "Broad knowledge base and philosophical perspective on information",
            "Enthusiastic learning style that makes education enjoyable",
            "Talent for connecting diverse ideas and seeing patterns"
        ],
        challenges: [
            "May be too blunt or direct, lacking diplomatic sensitivity",
            "Tendency to generalize or overlook important details",
            "Can be impatient with people who think more slowly or narrowly",
            "Difficulty focusing on mundane or routine communication tasks"
        ],
        keywords: ["Inspiring Communication", "Philosophical Discussion", "Enthusiastic Learning", "Big Picture Thinking", "Motivational Speaking", "Wisdom Sharing", "Broad Knowledge", "Educational Enthusiasm"],
        lifeExpression: "You communicate with natural enthusiasm and wisdom, often being valued for your ability to inspire others and help them see the bigger picture in any situation."
    },
    4: {
        combination: "Sagittarius on 4th House",
        essence: "Expansive Foundation",
        description: "With Sagittarius on your 4th house cusp, you approach home and family matters with a desire for freedom, growth, and cultural expansion. Your family background may have emphasized education, travel, or philosophical exploration, and you likely learned the value of independence and adventure early in life. You want your home to feel spacious and welcoming to people from diverse backgrounds, and you may prefer living in different places or cultures throughout your life.",
        approach: "You build your emotional foundation through exploration, learning, and maintaining freedom within family relationships.",
        strengths: [
            "Natural ability to create welcoming, multicultural home environments",
            "Philosophical approach to family problems that seeks higher meaning",
            "Freedom-loving nature that respects family members' independence",
            "Optimistic outlook that helps family weather challenges"
        ],
        challenges: [
            "May be restless or dissatisfied with traditional family structures",
            "Tendency to avoid family responsibilities in favor of personal adventures",
            "Can be too blunt or honest about family issues",
            "Difficulty with family members who are more conventional or security-focused"
        ],
        keywords: ["Expansive Home", "Cultural Family", "Freedom Foundation", "Philosophical Roots", "International Heritage", "Educational Environment", "Adventurous Upbringing", "Optimistic Family"],
        lifeExpression: "You create homes that celebrate diversity and learning while maintaining family relationships that honor everyone's need for freedom and growth."
    },
    5: {
        combination: "Sagittarius on 5th House",
        essence: "Adventurous Creator",
        description: "With Sagittarius on your 5th house cusp, your creative expression is adventurous, philosophical, and focused on exploring new territories of experience. You're drawn to creative activities that involve travel, learning, or cultural exchange. In romance, you seek partners who share your love of adventure and learning, and you prefer relationships that offer growth and exploration. You may be drawn to sports, outdoor activities, or creative pursuits that involve risk and excitement.",
        approach: "You express creativity through adventure and exploration, seeking romantic relationships that offer growth and shared adventures.",
        strengths: [
            "Adventurous creative spirit that explores new artistic territories",
            "Optimistic romantic nature that sees potential in relationships",
            "Natural teaching ability that makes creative activities educational",
            "Enthusiasm for sports and outdoor recreational activities"
        ],
        challenges: [
            "May start many creative projects without finishing them",
            "Tendency to be restless in romantic relationships",
            "Can be too blunt or honest in romantic communication",
            "Difficulty with creative activities that require detailed focus"
        ],
        keywords: ["Adventurous Creativity", "Philosophical Romance", "Educational Art", "Outdoor Recreation", "Cultural Expression", "Optimistic Love", "Exploratory Art", "Freedom Romance"],
        lifeExpression: "You create and love with adventurous enthusiasm, often being drawn to artistic and romantic experiences that expand your horizons and teach you about different cultures or philosophies."
    },
    6: {
        combination: "Sagittarius on 6th House",
        essence: "Enthusiastic Worker",
        description: "With Sagittarius on your 6th house cusp, you approach work with enthusiasm and a desire for variety and meaning in your daily activities. You're drawn to careers that involve teaching, travel, publishing, or working with diverse groups of people. Your work style is optimistic and big-picture focused, though you may struggle with routine details. In health matters, you prefer active, outdoor approaches to wellness and may be interested in alternative or holistic health practices from different cultures.",
        approach: "You approach work and health with enthusiasm and seek meaning and variety in your daily routines.",
        strengths: [
            "Natural enthusiasm and optimism that energizes work environments",
            "Ability to see the bigger purpose and meaning in work tasks",
            "International perspective that benefits diverse workplace situations",
            "Active approach to health that emphasizes outdoor activities and adventure"
        ],
        challenges: [
            "May become bored or restless with routine or detailed work",
            "Tendency to be impatient with coworkers who work more slowly",
            "Can be careless with details or administrative tasks",
            "Difficulty maintaining consistent health routines or medical care"
        ],
        keywords: ["Enthusiastic Work", "Meaningful Service", "International Career", "Active Health", "Educational Work", "Diverse Environment", "Optimistic Labor", "Adventure Wellness"],
        lifeExpression: "You bring enthusiasm and a sense of higher purpose to your work while maintaining health through active, adventurous approaches to wellness."
    },
    7: {
        combination: "Sagittarius on 7th House",
        essence: "Freedom-Loving Partner",
        description: "With Sagittarius on your 7th house cusp, you're attracted to partners who are adventurous, independent, and share your love of learning and exploration. You seek relationships that offer freedom, growth, and the opportunity to explore life together. In business partnerships, you prefer working with people who are optimistic, honest, and willing to take risks for growth. You may be drawn to partners from different cultural backgrounds or who share your philosophical interests.",
        approach: "You seek partnerships that offer freedom, adventure, and mutual growth through shared exploration and learning.",
        strengths: [
            "Natural attraction to independent, adventurous partners",
            "Honest, direct communication that builds trust in relationships",
            "Optimistic approach to partnership challenges and growth",
            "Ability to maintain individual freedom within committed relationships"
        ],
        challenges: [
            "May be too blunt or tactless in relationship communication",
            "Tendency to avoid commitment or feel trapped in relationships",
            "Can be restless or seek adventure outside the partnership",
            "Difficulty with partners who are more security-focused or conventional"
        ],
        keywords: ["Freedom Partnership", "Adventurous Love", "Honest Relationships", "Cultural Exchange", "Growth Together", "Independent Union", "Philosophical Connection", "Optimistic Commitment"],
        lifeExpression: "You form partnerships based on mutual freedom and shared adventures, often attracting relationships that involve travel, learning, or cultural exchange."
    },
    8: {
        combination: "Sagittarius on 8th House",
        essence: "Philosophical Transformer",
        description: "With Sagittarius on your 8th house cusp, you approach transformation, shared resources, and life's deeper mysteries with optimism and a search for meaning. Your transformations often come through travel, education, or exposure to different philosophies and cultures. You may be drawn to studying comparative religion, philosophy, or the deeper meanings behind life's challenges. Your approach to shared resources is generous and trusting, though sometimes overly optimistic.",
        approach: "You navigate transformation and deep change through philosophical exploration and the search for higher meaning in all experiences.",
        strengths: [
            "Optimistic approach to life's challenges and transformative experiences",
            "Natural ability to find meaning and wisdom in difficult situations",
            "Generous, trusting approach to shared resources and joint finances",
            "Philosophical understanding of death, rebirth, and life's mysteries"
        ],
        challenges: [
            "May be overly optimistic about financial risks or shared investments",
            "Tendency to avoid dealing with practical details of transformation",
            "Can be too trusting with shared resources or other people's money",
            "Difficulty facing the darker aspects of transformation without seeking escape"
        ],
        keywords: ["Philosophical Transformation", "Optimistic Change", "Meaningful Crisis", "Generous Sharing", "Cultural Healing", "Educational Growth", "Spiritual Adventure", "Wisdom Through Challenge"],
        lifeExpression: "You approach life's deepest challenges with optimism and a search for meaning, often finding wisdom and growth through transformative experiences that expand your worldview."
    },
    9: {
        combination: "Sagittarius on 9th House",
        essence: "Natural Explorer",
        description: "With Sagittarius on your 9th house cusp, higher learning, philosophy, and spiritual matters are absolutely central to your identity. You have a natural gift for teaching, exploring different belief systems, and sharing wisdom with others. This is Sagittarius's natural house, so you're particularly powerful in areas of education, travel, publishing, and philosophical exploration. You may be drawn to careers in academia, international relations, or any field that involves expanding minds and horizons.",
        approach: "You pursue wisdom and higher knowledge with natural enthusiasm and share your discoveries with infectious optimism.",
        strengths: [
            "Natural teaching abilities and love of sharing knowledge",
            "Enthusiastic approach to higher education and philosophical exploration",
            "International perspective and appreciation for diverse cultures",
            "Optimistic faith and belief in the goodness of life and learning"
        ],
        challenges: [
            "May be dogmatic or overly confident about your beliefs",
            "Tendency to generalize or oversimplify complex philosophical issues",
            "Can be impatient with people who don't share your enthusiasm for learning",
            "Difficulty with educational systems that are too rigid or narrow"
        ],
        keywords: ["Natural Teaching", "Philosophical Exploration", "International Wisdom", "Educational Enthusiasm", "Cultural Adventure", "Spiritual Optimism", "Higher Learning", "Belief Expansion"],
        lifeExpression: "You naturally seek and share wisdom through teaching, travel, and philosophical exploration, often becoming known as someone who can inspire others to expand their minds and horizons."
    },
    10: {
        combination: "Sagittarius on 10th House",
        essence: "Visionary Leader",
        description: "With Sagittarius on your 10th house cusp (Midheaven), you build your career and reputation through visionary leadership and inspirational work. You're drawn to professions that involve education, publishing, international business, or any field that allows you to share wisdom and expand horizons. Your professional reputation is built on your ability to inspire others, see the big picture, and lead with optimism and vision. You may be drawn to careers that involve travel or working with diverse, international groups.",
        approach: "You build your career through visionary leadership and work that inspires others to think bigger and reach higher.",
        strengths: [
            "Natural visionary leadership that inspires teams and organizations",
            "International perspective that benefits global business or education",
            "Optimistic approach to professional challenges that motivates others",
            "Ability to see long-term potential and communicate compelling visions"
        ],
        challenges: [
            "May be impatient with the slow pace of organizational change",
            "Tendency to overlook practical details in favor of big-picture vision",
            "Can be too blunt or direct in professional communication",
            "Difficulty with careers that require detailed focus or routine tasks"
        ],
        keywords: ["Visionary Leadership", "International Career", "Educational Authority", "Inspirational Management", "Big Picture Success", "Cultural Bridge", "Optimistic Professional", "Wisdom Sharing"],
        lifeExpression: "You build a professional reputation based on your ability to inspire and lead with vision, often becoming known as someone who can see possibilities others miss and motivate teams toward ambitious goals."
    },
    11: {
        combination: "Sagittarius on 11th House",
        essence: "Inspiring Friend",
        description: "With Sagittarius on your 11th house cusp, you approach friendships and group activities with enthusiasm and a desire to inspire others toward higher goals. Your hopes and dreams are expansive and often involve making the world a better place through education, cultural exchange, or philosophical advancement. You're drawn to groups that share your optimistic vision and work toward meaningful social change. Your social network likely includes people from diverse cultural and educational backgrounds.",
        approach: "You build friendships and pursue dreams through inspiring others and working toward expansive goals that benefit humanity.",
        strengths: [
            "Natural ability to inspire friends and groups toward higher purposes",
            "Optimistic dreams and goals that motivate social progress",
            "International social network that bridges different cultures",
            "Enthusiastic support of friends' growth and educational pursuits"
        ],
        challenges: [
            "May be impatient with friends who don't share your enthusiasm",
            "Tendency to be preachy or overly philosophical in social situations",
            "Can be disappointed when groups don't live up to your idealistic expectations",
            "Difficulty with social activities that seem meaningless or superficial"
        ],
        keywords: ["Inspiring Friendship", "Expansive Dreams", "Cultural Networks", "Educational Goals", "Optimistic Community", "International Friends", "Philosophical Groups", "Visionary Hopes"],
        lifeExpression: "You inspire your social networks toward meaningful goals and maintain friendships that span cultures and continents, often being the person who brings diverse groups together around shared ideals."
    },
    12: {
        combination: "Sagittarius on 12th House",
        essence: "Hidden Sage",
        description: "With Sagittarius on your 12th house cusp, your spiritual and subconscious life is characterized by a hidden wisdom and connection to universal truths. You may have unconscious patterns related to restlessness or the need to escape that require understanding and integration. Your spiritual path involves finding meaning in surrender and service, and you may be drawn to meditation practices, spiritual study, or behind-the-scenes teaching that helps others find their own truth and wisdom.",
        approach: "You explore your spiritual and subconscious life through the search for universal wisdom and service to higher truths.",
        strengths: [
            "Hidden wisdom and connection to universal spiritual truths",
            "Natural understanding of the importance of faith and optimism",
            "Ability to find meaning and purpose in spiritual service",
            "Intuitive teaching gifts that help others find their own path"
        ],
        challenges: [
            "Unconscious restlessness or need to escape reality through fantasy",
            "Tendency to be overly optimistic about spiritual progress",
            "May avoid dealing with practical spiritual disciplines",
            "Difficulty accepting that some spiritual truths can't be intellectually understood"
        ],
        keywords: ["Hidden Wisdom", "Spiritual Adventure", "Universal Truth", "Anonymous Teaching", "Faith Journey", "Mystical Optimism", "Unconscious Wandering", "Sacred Service"],
        lifeExpression: "You serve as a hidden source of wisdom and inspiration while working to integrate your restless spirit with deeper spiritual understanding and service to universal truths."
    }
};
// Capricorn on House Cusps
export const CAPRICORN_HOUSE_INTERPRETATIONS: Record<number, SignHouseInterpretation> = {
    1: {
        combination: "Capricorn on 1st House",
        essence: "Ambitious Achiever",
        description: "With Capricorn on your 1st house cusp (Ascendant), you project an image of competence, responsibility, and natural authority. Others see you as someone who is mature, reliable, and goal-oriented. You approach life with patience, discipline, and a long-term perspective, preferring to build success slowly and steadily rather than seeking quick wins. Your serious demeanor and practical wisdom make you naturally respected, though you may seem older or more mature than your years.",
        approach: "You tackle life with discipline, patience, and a strategic focus on long-term achievement and building lasting success.",
        strengths: [
            "Natural authority and leadership presence that commands respect",
            "Disciplined, patient approach that builds lasting success",
            "Practical wisdom and mature perspective on life challenges",
            "Strong sense of responsibility and reliability that others depend on"
        ],
        challenges: [
            "May be too serious or pessimistic, missing opportunities for joy",
            "Tendency to be overly critical of yourself and others",
            "Can be rigid or inflexible when change is needed",
            "Difficulty expressing emotions or showing vulnerability"
        ],
        keywords: ["Ambition", "Discipline", "Authority", "Responsibility", "Achievement", "Maturity", "Structure", "Persistence"],
        lifeExpression: "You're known for your mature, responsible approach to life and ability to achieve long-term goals through patient, disciplined effort."
    },
    2: {
        combination: "Capricorn on 2nd House",
        essence: "Strategic Accumulator",
        description: "With Capricorn on your 2nd house cusp, you approach money and possessions with discipline, patience, and a long-term strategic perspective. You're naturally conservative with resources and prefer to build wealth slowly through careful planning and wise investments. Your relationship with money is practical and goal-oriented - you see financial security as essential for achieving your ambitions. You may be drawn to traditional investments or building assets that appreciate over time.",
        approach: "You build wealth through disciplined saving, strategic planning, and patient long-term investment strategies.",
        strengths: [
            "Exceptional discipline and patience in building long-term wealth",
            "Strategic thinking that guides wise investment decisions",
            "Conservative approach that protects against financial losses",
            "Natural understanding of the connection between money and achievement"
        ],
        challenges: [
            "May be overly cautious, missing profitable opportunities",
            "Tendency to be too focused on security at the expense of growth",
            "Can be miserly or overly frugal with spending",
            "Difficulty enjoying money or spending on non-essential items"
        ],
        keywords: ["Strategic Wealth", "Disciplined Saving", "Long-term Investment", "Financial Security", "Conservative Planning", "Asset Building", "Practical Value", "Achievement Fund"],
        lifeExpression: "You build substantial wealth through patient, disciplined financial planning and strategic investments that support your long-term goals and ambitions."
    },
    3: {
        combination: "Capricorn on 3rd House",
        essence: "Authoritative Communicator",
        description: "With Capricorn on your 3rd house cusp, your communication style is serious, authoritative, and focused on practical, useful information. You prefer structured conversations and may have a talent for teaching or explaining complex concepts in organized ways. Your learning style is methodical and goal-oriented, and you excel at subjects that have clear practical applications. You may be drawn to writing, speaking, or communication work that establishes your expertise and authority.",
        approach: "You communicate with authority and structure, focusing on practical information that serves clear purposes and goals.",
        strengths: [
            "Authoritative communication style that commands respect and attention",
            "Methodical learning approach that leads to deep expertise",
            "Natural ability to organize and structure complex information",
            "Practical focus that makes communication useful and applicable"
        ],
        challenges: [
            "May be too serious or formal in casual communication",
            "Tendency to be pessimistic or overly critical in discussions",
            "Can be rigid about communication methods or learning styles",
            "Difficulty with spontaneous or emotional communication"
        ],
        keywords: ["Authoritative Communication", "Structured Learning", "Practical Information", "Expert Knowledge", "Methodical Study", "Professional Speech", "Goal-Oriented Education", "Serious Discussion"],
        lifeExpression: "You communicate with natural authority and focus on sharing practical knowledge that helps others achieve their goals and build expertise."
    },
    4: {
        combination: "Capricorn on 4th House",
        essence: "Traditional Foundation",
        description: "With Capricorn on your 4th house cusp, you approach home and family matters with respect for tradition, structure, and long-term stability. Your family background likely emphasized responsibility, achievement, and traditional values, and you may have learned early about the importance of hard work and discipline. You want your home to be a solid foundation that supports your ambitions, and you may take on significant family responsibilities or become the family's source of stability and structure.",
        approach: "You build your emotional foundation through creating stable, traditional structures that support long-term family security and success.",
        strengths: [
            "Natural ability to create stable, secure home environments",
            "Strong sense of family responsibility and commitment to tradition",
            "Practical approach to family problems that creates lasting solutions",
            "Respect for family heritage and wisdom that guides decisions"
        ],
        challenges: [
            "May be too rigid about family traditions or expectations",
            "Tendency to take on too much family responsibility",
            "Can be overly serious or formal in family relationships",
            "Difficulty expressing emotions or showing affection openly"
        ],
        keywords: ["Traditional Home", "Family Responsibility", "Stable Foundation", "Structured Environment", "Heritage Respect", "Long-term Security", "Disciplined Family", "Achievement Support"],
        lifeExpression: "You create stable, traditional home environments and often serve as the family's foundation of responsibility and long-term planning."
    },
    5: {
        combination: "Capricorn on 5th House",
        essence: "Disciplined Creator",
        description: "With Capricorn on your 5th house cusp, your creative expression is disciplined, structured, and focused on achieving mastery and recognition. You're drawn to creative activities that require skill development and may prefer traditional or classical forms of art. In romance, you're serious and committed, seeking partners who share your values about responsibility and long-term goals. You approach creativity and recreation with the same discipline you bring to work, often producing high-quality, lasting results.",
        approach: "You express creativity through disciplined practice and seek romantic relationships that offer stability and long-term potential.",
        strengths: [
            "Disciplined approach to creativity that leads to mastery and recognition",
            "Serious, committed approach to romantic relationships",
            "Natural ability to teach creative skills and mentor others",
            "Focus on quality and lasting value in creative work"
        ],
        challenges: [
            "May be too serious or rigid in creative expression",
            "Tendency to be overly critical of your own creative work",
            "Can be too practical or goal-oriented in romantic relationships",
            "Difficulty with spontaneous or playful creative activities"
        ],
        keywords: ["Disciplined Creativity", "Serious Romance", "Masterful Art", "Committed Love", "Structured Expression", "Quality Creation", "Traditional Arts", "Achievement-Oriented"],
        lifeExpression: "You create with discipline and commitment while seeking romantic relationships that offer stability and support for your long-term goals and ambitions."
    },
    6: {
        combination: "Capricorn on 6th House",
        essence: "Responsible Worker",
        description: "With Capricorn on your 6th house cusp, work and responsibility are central to your identity and sense of purpose. You have a natural gift for organization, management, and creating efficient systems. Your work style is disciplined, reliable, and focused on achieving concrete results. In health matters, you prefer structured, traditional approaches to wellness and may be interested in preventive care that supports long-term health goals. You may be drawn to careers in management, administration, or fields that require expertise and authority.",
        approach: "You approach work and health with discipline and responsibility, focusing on building systems that support long-term success and wellbeing.",
        strengths: [
            "Exceptional organizational and management abilities",
            "Disciplined work ethic that produces consistent, high-quality results",
            "Natural authority that makes you effective in leadership roles",
            "Practical approach to health that emphasizes prevention and structure"
        ],
        challenges: [
            "May become overly focused on work at the expense of other life areas",
            "Tendency to be too critical of coworkers or work processes",
            "Can be rigid about work methods or resistant to change",
            "Difficulty delegating or trusting others with important responsibilities"
        ],
        keywords: ["Responsible Work", "Management Excellence", "Disciplined Service", "Systematic Health", "Authority Leadership", "Efficient Organization", "Professional Mastery", "Structured Wellness"],
        lifeExpression: "You excel in management and organizational roles while maintaining health through disciplined, structured approaches that support your professional ambitions."
    },
    7: {
        combination: "Capricorn on 7th House",
        essence: "Committed Partner",
        description: "With Capricorn on your 7th house cusp, you're attracted to partners who are mature, responsible, and share your values about commitment and achievement. You seek relationships that offer stability, mutual support for goals, and the potential for building something lasting together. In business partnerships, you prefer working with people who are reliable, experienced, and committed to long-term success. You may be drawn to partners who are older, more established, or who have achieved recognition in their field.",
        approach: "You seek partnerships that offer stability, mutual commitment, and support for achieving long-term goals and building lasting success together.",
        strengths: [
            "Natural attraction to mature, responsible partners",
            "Strong commitment and loyalty that creates stable relationships",
            "Practical approach to partnership that focuses on mutual goals",
            "Ability to build partnerships that support long-term achievement"
        ],
        challenges: [
            "May be too serious or formal in relationship dynamics",
            "Tendency to prioritize practical considerations over emotional connection",
            "Can be overly critical or demanding of partners",
            "Difficulty with partners who are more spontaneous or less goal-oriented"
        ],
        keywords: ["Committed Partnership", "Mature Love", "Stable Relationships", "Goal-Oriented Union", "Responsible Commitment", "Long-term Building", "Achievement Support", "Practical Partnership"],
        lifeExpression: "You form stable, committed partnerships based on mutual respect and shared goals, often attracting relationships that support your ambitions and provide lasting security."
    },
    8: {
        combination: "Capricorn on 8th House",
        essence: "Strategic Transformer",
        description: "With Capricorn on your 8th house cusp, you approach transformation, shared resources, and life's deeper challenges with patience, strategy, and a focus on building lasting change. Your transformations happen slowly but thoroughly, and you prefer to have control over the process. You may be skilled at managing investments, taxes, or other people's resources, and you approach shared finances with the same discipline you bring to personal wealth building. You understand that real transformation requires time and sustained effort.",
        approach: "You navigate transformation and deep change through strategic planning and patient, disciplined effort that creates lasting results.",
        strengths: [
            "Strategic approach to managing shared resources and investments",
            "Patient, disciplined method of working through transformative experiences",
            "Natural ability to build lasting change through sustained effort",
            "Practical understanding of the connection between resources and power"
        ],
        challenges: [
            "May be too controlling or rigid during transformative processes",
            "Tendency to resist change or transformation that can't be controlled",
            "Can be overly cautious with shared resources or investments",
            "Difficulty accepting that some transformations require emotional surrender"
        ],
        keywords: ["Strategic Transformation", "Controlled Change", "Resource Management", "Patient Growth", "Disciplined Healing", "Structured Regeneration", "Investment Mastery", "Practical Depth"],
        lifeExpression: "You approach life's deeper challenges with strategic thinking and patient effort, often becoming skilled at managing complex resources and guiding others through structured transformation."
    },
    9: {
        combination: "Capricorn on 9th House",
        essence: "Traditional Seeker",
        description: "With Capricorn on your 9th house cusp, you approach higher learning, philosophy, and spiritual matters with respect for tradition, established wisdom, and practical application. You're drawn to educational systems that have proven track records and may prefer classical or traditional approaches to philosophy and spirituality. Your beliefs are grounded in experience and practical results, and you may be interested in teaching or sharing wisdom that has stood the test of time. You approach learning with discipline and a focus on achieving expertise.",
        approach: "You pursue wisdom and higher knowledge through traditional methods and focus on teachings that have practical applications and proven results.",
        strengths: [
            "Respect for traditional wisdom and established educational methods",
            "Disciplined approach to higher learning that leads to expertise",
            "Practical application of philosophical and spiritual teachings",
            "Natural teaching ability that emphasizes proven methods and results"
        ],
        challenges: [
            "May be too rigid about traditional approaches to learning",
            "Tendency to dismiss new or unconventional wisdom",
            "Can be overly focused on credentials or formal recognition",
            "Difficulty with spiritual or philosophical concepts that can't be proven"
        ],
        keywords: ["Traditional Wisdom", "Disciplined Learning", "Practical Philosophy", "Educational Authority", "Proven Methods", "Classical Study", "Structured Beliefs", "Expert Teaching"],
        lifeExpression: "You seek and share wisdom through traditional, proven methods and often become recognized as an authority in your chosen field of study or expertise."
    },
    10: {
        combination: "Capricorn on 10th House",
        essence: "Natural Executive",
        description: "With Capricorn on your 10th house cusp (Midheaven), you build your career and reputation through disciplined leadership and steady achievement. You're drawn to professions that offer clear hierarchies, opportunities for advancement, and the potential to build lasting authority. This is Capricorn's natural house, so you're particularly powerful in areas of management, administration, and executive leadership. Your professional reputation is built on reliability, competence, and the ability to achieve long-term goals through patient, strategic effort.",
        approach: "You build your career through disciplined leadership and strategic advancement, focusing on achieving lasting authority and recognition.",
        strengths: [
            "Natural executive abilities and understanding of organizational hierarchy",
            "Disciplined approach to career building that leads to lasting success",
            "Strategic thinking that guides long-term professional planning",
            "Reputation for reliability and competence that attracts opportunities"
        ],
        challenges: [
            "May be overly focused on status or external recognition",
            "Tendency to be too serious or formal in professional relationships",
            "Can be rigid about traditional career paths or methods",
            "Difficulty with careers that don't offer clear advancement opportunities"
        ],
        keywords: ["Executive Leadership", "Career Authority", "Strategic Advancement", "Professional Discipline", "Management Excellence", "Status Achievement", "Organizational Mastery", "Long-term Success"],
        lifeExpression: "You build a powerful professional reputation through disciplined leadership and strategic career advancement, often achieving positions of significant authority and responsibility."
    },
    11: {
        combination: "Capricorn on 11th House",
        essence: "Responsible Friend",
        description: "With Capricorn on your 11th house cusp, you approach friendships and group activities with seriousness and a focus on achieving meaningful goals. Your hopes and dreams are practical and achievable, often involving building something lasting that benefits your community or profession. You're drawn to groups that have clear purposes and structured approaches to achieving their objectives. Your social network likely includes people who are accomplished, responsible, and share your values about achievement and contribution.",
        approach: "You build friendships and pursue dreams through responsible commitment and focus on achieving practical goals that create lasting value.",
        strengths: [
            "Loyal, responsible friendships that provide mutual support for goals",
            "Practical, achievable dreams that create lasting positive change",
            "Natural leadership in groups that need structure and organization",
            "Network of accomplished individuals who support professional growth"
        ],
        challenges: [
            "May be too serious or formal in social situations",
            "Tendency to judge friends by their achievements or status",
            "Can be overly focused on practical goals at expense of social enjoyment",
            "Difficulty with groups that are disorganized or lack clear purpose"
        ],
        keywords: ["Responsible Friendship", "Practical Dreams", "Structured Groups", "Achievement Networks", "Goal-Oriented Community", "Professional Connections", "Serious Commitment", "Lasting Contribution"],
        lifeExpression: "You form responsible friendships and work toward practical dreams that create lasting value, often serving as the organizing force that helps groups achieve their objectives."
    },
    12: {
        combination: "Capricorn on 12th House",
        essence: "Hidden Authority",
        description: "With Capricorn on your 12th house cusp, your spiritual and subconscious life is characterized by hidden strength and a connection to traditional wisdom. You may have unconscious patterns related to authority, control, or the need for recognition that require understanding and integration. Your spiritual path involves learning to serve without need for external validation and finding ways to use your natural leadership abilities in humble, behind-the-scenes ways. You may be drawn to traditional spiritual practices or serving as a hidden source of structure and stability for others.",
        approach: "You explore your spiritual and subconscious life through traditional practices and learn to serve with authority while remaining humble.",
        strengths: [
            "Hidden strength and natural authority that emerges when needed",
            "Connection to traditional spiritual wisdom and practices",
            "Ability to provide structure and stability for others without recognition",
            "Disciplined approach to spiritual development and self-understanding"
        ],
        challenges: [
            "Unconscious need for control or authority that may create problems",
            "Tendency to suppress emotions or spiritual needs for practical concerns",
            "May struggle with accepting help or showing vulnerability",
            "Difficulty with spiritual practices that require emotional openness"
        ],
        keywords: ["Hidden Authority", "Traditional Spirituality", "Unconscious Structure", "Humble Service", "Spiritual Discipline", "Behind-the-Scenes Leadership", "Inner Strength", "Sacred Responsibility"],
        lifeExpression: "You serve as a hidden source of strength and structure while working to integrate your need for authority with spiritual humility and service to others."
    }
};
// Aquarius on House Cusps
export const AQUARIUS_HOUSE_INTERPRETATIONS: Record<number, SignHouseInterpretation> = {
    1: {
        combination: "Aquarius on 1st House",
        essence: "Unique Individual",
        description: "With Aquarius on your 1st house cusp (Ascendant), you project an image of uniqueness, innovation, and humanitarian ideals. Others see you as someone who is independent, progressive, and marches to the beat of your own drum. You approach life with originality and a desire to make the world a better place through your unique contributions. Your unconventional nature and forward-thinking perspective make you naturally inspiring to others, though you may sometimes seem detached or aloof.",
        approach: "You tackle life with originality, independence, and a focus on innovation and humanitarian progress.",
        strengths: [
            "Unique perspective and innovative approach that brings fresh solutions",
            "Strong humanitarian ideals and desire to help society progress",
            "Independent nature that isn't swayed by conventional expectations",
            "Natural ability to see future possibilities and trends"
        ],
        challenges: [
            "May be too detached or aloof in personal relationships",
            "Tendency to be rebellious or contrary just for the sake of being different",
            "Can be unpredictable or inconsistent in behavior",
            "Difficulty with emotional expression or intimate connections"
        ],
        keywords: ["Uniqueness", "Innovation", "Independence", "Humanitarian", "Progressive", "Unconventional", "Future-Oriented", "Detached"],
        lifeExpression: "You're known for your unique, innovative approach to life and your commitment to humanitarian ideals, often being the person who introduces new ideas and progressive thinking."
    },
    2: {
        combination: "Aquarius on 2nd House",
        essence: "Innovative Accumulator",
        description: "With Aquarius on your 2nd house cusp, you approach money and possessions with innovation and a focus on future possibilities. You're naturally drawn to unconventional investments, new technologies, or humanitarian causes that align with your values. Your relationship with resources is progressive - you see money as a tool for creating positive change rather than just personal security. You may earn through technology, innovation, or work that benefits society.",
        approach: "You build wealth through innovative methods and see money as a means to support humanitarian causes and future progress.",
        strengths: [
            "Innovative approach to earning and investing that spots future trends",
            "Values-based relationship with money that supports humanitarian causes",
            "Independence from traditional financial expectations or pressures",
            "Natural understanding of technology and its financial potential"
        ],
        challenges: [
            "May be too experimental or risky with financial decisions",
            "Tendency to be detached from practical financial planning",
            "Can be unpredictable with spending or earning patterns",
            "Difficulty with traditional investment approaches or financial advice"
        ],
        keywords: ["Innovative Finance", "Technology Investment", "Humanitarian Money", "Future Wealth", "Unconventional Earning", "Progressive Values", "Independent Resources", "Social Impact"],
        lifeExpression: "You approach finances with innovation and independence, often investing in technology or causes that align with your humanitarian values and vision for the future."
    },
    3: {
        combination: "Aquarius on 3rd House",
        essence: "Revolutionary Communicator",
        description: "With Aquarius on your 3rd house cusp, your communication style is innovative, progressive, and focused on sharing ideas that can change the world. You prefer conversations about future possibilities, social issues, or revolutionary concepts over mundane topics. Your learning style is experimental and independent, and you excel when you can explore subjects in unconventional ways. You may have a talent for technology, social media, or any form of communication that connects people and spreads progressive ideas.",
        approach: "You communicate with innovation and independence, focusing on sharing progressive ideas and connecting people around humanitarian causes.",
        strengths: [
            "Innovative communication style that introduces new ideas and perspectives",
            "Natural ability to use technology and social media effectively",
            "Independent learning approach that discovers unique insights",
            "Talent for connecting diverse groups of people around shared ideals"
        ],
        challenges: [
            "May be too detached or impersonal in communication",
            "Tendency to be rebellious or contrary in discussions",
            "Can be unpredictable or inconsistent in communication patterns",
            "Difficulty with traditional educational methods or structured learning"
        ],
        keywords: ["Revolutionary Communication", "Progressive Ideas", "Technology Savvy", "Independent Learning", "Social Networking", "Future Thinking", "Humanitarian Discussion", "Innovative Expression"],
        lifeExpression: "You communicate with innovative flair and use technology to connect people around progressive ideas, often being valued for your ability to see and share future possibilities."
    },
    4: {
        combination: "Aquarius on 4th House",
        essence: "Unconventional Foundation",
        description: "With Aquarius on your 4th house cusp, you approach home and family matters with independence and a desire for unconventional arrangements. Your family background may have been progressive, unusual, or emphasized individual freedom and humanitarian values. You want your home to be a space that supports innovation and welcomes diverse groups of people. You may prefer non-traditional living situations or create family structures that break conventional molds.",
        approach: "You build your emotional foundation through creating unconventional, progressive home environments that support individual freedom and humanitarian ideals.",
        strengths: [
            "Natural ability to create innovative, welcoming home environments",
            "Progressive approach to family that respects individual uniqueness",
            "Independence that allows family members freedom to be themselves",
            "Humanitarian values that create inclusive family dynamics"
        ],
        challenges: [
            "May be too detached or emotionally distant in family relationships",
            "Tendency to rebel against traditional family expectations",
            "Can be unpredictable or inconsistent in family commitments",
            "Difficulty with family members who are more conventional or emotional"
        ],
        keywords: ["Unconventional Home", "Progressive Family", "Independent Foundation", "Humanitarian Values", "Innovative Living", "Freedom-Based", "Diverse Environment", "Future-Oriented Roots"],
        lifeExpression: "You create unconventional home environments that celebrate individual uniqueness and humanitarian values, often serving as a gathering place for diverse, progressive-minded people."
    },
    5: {
        combination: "Aquarius on 5th House",
        essence: "Original Creator",
        description: "With Aquarius on your 5th house cusp, your creative expression is innovative, experimental, and focused on breaking new ground or addressing social issues. You're drawn to creative activities that involve technology, social causes, or unconventional artistic forms. In romance, you seek partners who are independent, intellectually stimulating, and share your progressive values. You approach creativity and recreation with the same innovative spirit you bring to other areas of life, often producing original, thought-provoking work.",
        approach: "You express creativity through innovation and experimentation, seeking romantic relationships that offer intellectual stimulation and shared humanitarian ideals.",
        strengths: [
            "Original creative vision that produces innovative, groundbreaking work",
            "Independent romantic style that attracts unique, interesting partners",
            "Natural ability to use creativity for social causes and humanitarian purposes",
            "Experimental approach that discovers new forms of artistic expression"
        ],
        challenges: [
            "May be too detached or intellectual in romantic relationships",
            "Tendency to be unpredictable or inconsistent in creative output",
            "Can be rebellious against traditional creative forms or romantic expectations",
            "Difficulty with emotional intimacy or conventional expressions of love"
        ],
        keywords: ["Original Creativity", "Independent Romance", "Innovative Art", "Progressive Love", "Experimental Expression", "Social Creativity", "Intellectual Attraction", "Unconventional Recreation"],
        lifeExpression: "You create innovative, socially conscious art and seek romantic relationships that offer intellectual stimulation and shared commitment to progressive ideals."
    },
    6: {
        combination: "Aquarius on 6th House",
        essence: "Humanitarian Worker",
        description: "With Aquarius on your 6th house cusp, you approach work with a focus on humanitarian causes and innovative solutions to social problems. You're drawn to careers that involve technology, social reform, or working for the betterment of humanity. Your work style is independent and experimental, and you prefer jobs that allow you to implement new ideas and methods. In health matters, you're interested in alternative approaches and may be drawn to cutting-edge treatments or holistic methods that address the whole person.",
        approach: "You approach work and health with innovation and independence, focusing on humanitarian service and progressive solutions.",
        strengths: [
            "Natural ability to innovate and improve work processes and systems",
            "Humanitarian focus that brings meaning and purpose to work",
            "Independent work style that produces original solutions",
            "Progressive approach to health that explores alternative methods"
        ],
        challenges: [
            "May be too detached or impersonal in work relationships",
            "Tendency to be rebellious against traditional work structures",
            "Can be unpredictable or inconsistent in work habits",
            "Difficulty with routine tasks or conventional health approaches"
        ],
        keywords: ["Humanitarian Work", "Innovative Service", "Progressive Health", "Independent Labor", "Social Reform", "Technology Work", "Alternative Wellness", "Future-Oriented Service"],
        lifeExpression: "You bring innovation and humanitarian ideals to your work while exploring progressive approaches to health that benefit both yourself and society."
    },
    7: {
        combination: "Aquarius on 7th House",
        essence: "Independent Partner",
        description: "With Aquarius on your 7th house cusp, you're attracted to partners who are independent, innovative, and share your progressive ideals. You seek relationships that offer intellectual stimulation, freedom, and the opportunity to work together on humanitarian causes. In business partnerships, you prefer working with people who are forward-thinking, technologically savvy, and committed to making positive social change. You may be drawn to partners who are unconventional or from different cultural backgrounds.",
        approach: "You seek partnerships that offer intellectual connection, mutual independence, and shared commitment to progressive ideals and humanitarian causes.",
        strengths: [
            "Natural attraction to independent, intellectually stimulating partners",
            "Ability to maintain individual identity within committed relationships",
            "Progressive approach to partnership that breaks traditional molds",
            "Shared humanitarian values that strengthen relationship bonds"
        ],
        challenges: [
            "May be too detached or emotionally distant in relationships",
            "Tendency to prioritize intellectual connection over emotional intimacy",
            "Can be unpredictable or inconsistent in relationship commitments",
            "Difficulty with partners who need more emotional closeness or tradition"
        ],
        keywords: ["Independent Partnership", "Intellectual Love", "Progressive Relationships", "Humanitarian Union", "Unconventional Commitment", "Future-Oriented Partnership", "Freedom-Based Love", "Innovative Cooperation"],
        lifeExpression: "You form partnerships based on intellectual connection and shared humanitarian ideals, often attracting relationships that support progressive causes and maintain individual freedom."
    },
    8: {
        combination: "Aquarius on 8th House",
        essence: "Revolutionary Transformer",
        description: "With Aquarius on your 8th house cusp, you approach transformation, shared resources, and life's deeper mysteries with innovation and a focus on humanitarian progress. Your transformations often come through exposure to new ideas, technologies, or progressive social movements. You may be drawn to studying alternative approaches to psychology, healing, or resource management. Your approach to shared resources is progressive and may involve innovative investment strategies or supporting causes that benefit humanity.",
        approach: "You navigate transformation and deep change through innovative thinking and commitment to humanitarian progress and social reform.",
        strengths: [
            "Innovative approach to transformation that creates positive social change",
            "Progressive understanding of shared resources and their potential impact",
            "Natural ability to help others through unconventional healing methods",
            "Forward-thinking perspective on life's mysteries and deeper meanings"
        ],
        challenges: [
            "May be too detached during emotional or transformative experiences",
            "Tendency to intellectualize rather than feel deep emotional processes",
            "Can be unpredictable with shared resources or joint investments",
            "Difficulty with traditional approaches to healing or transformation"
        ],
        keywords: ["Revolutionary Transformation", "Progressive Change", "Innovative Healing", "Humanitarian Resources", "Alternative Psychology", "Social Reform", "Future Transformation", "Collective Evolution"],
        lifeExpression: "You approach life's deeper challenges with innovative thinking and humanitarian ideals, often helping others transform through progressive methods and social consciousness."
    },
    9: {
        combination: "Aquarius on 9th House",
        essence: "Progressive Seeker",
        description: "With Aquarius on your 9th house cusp, you approach higher learning, philosophy, and spiritual matters with innovation and a focus on future possibilities. You're drawn to progressive belief systems, alternative educational methods, and philosophies that emphasize human potential and social evolution. Your approach to education is experimental and independent, and you may be interested in distance learning, online education, or unconventional teaching methods. You seek wisdom that can help humanity progress and evolve.",
        approach: "You pursue wisdom and higher knowledge through progressive methods and seek beliefs that support human evolution and social progress.",
        strengths: [
            "Progressive approach to education and philosophy that embraces new ideas",
            "Natural ability to see future possibilities in learning and belief systems",
            "Independent thinking that challenges traditional educational or spiritual methods",
            "Humanitarian focus that seeks wisdom for the benefit of all humanity"
        ],
        challenges: [
            "May be too rebellious against traditional educational or spiritual authorities",
            "Tendency to be detached from emotional or mystical aspects of spirituality",
            "Can be unpredictable or inconsistent in philosophical commitments",
            "Difficulty with belief systems that don't emphasize social progress"
        ],
        keywords: ["Progressive Philosophy", "Innovative Education", "Future Wisdom", "Humanitarian Beliefs", "Alternative Learning", "Social Evolution", "Independent Study", "Collective Consciousness"],
        lifeExpression: "You seek and share progressive wisdom that supports human evolution and social progress, often being drawn to innovative educational methods and future-oriented philosophies."
    },
    10: {
        combination: "Aquarius on 10th House",
        essence: "Innovative Leader",
        description: "With Aquarius on your 10th house cusp (Midheaven), you build your career and reputation through innovative leadership and humanitarian work. You're drawn to professions that involve technology, social reform, or working for the betterment of humanity. Your professional reputation is built on your ability to see future trends, implement innovative solutions, and lead progressive change. You may be drawn to careers in technology, social activism, or any field that allows you to make a positive impact on society.",
        approach: "You build your career through innovative leadership and work that contributes to humanitarian progress and social evolution.",
        strengths: [
            "Natural ability to see and implement future trends in your profession",
            "Innovative leadership style that inspires progressive change",
            "Humanitarian focus that brings meaning and purpose to career goals",
            "Independent approach that creates unique professional opportunities"
        ],
        challenges: [
            "May be too detached or impersonal in professional relationships",
            "Tendency to be rebellious against traditional career structures",
            "Can be unpredictable or inconsistent in professional commitments",
            "Difficulty with careers that don't offer opportunities for innovation or social impact"
        ],
        keywords: ["Innovative Leadership", "Humanitarian Career", "Progressive Professional", "Technology Mastery", "Social Reform", "Future-Oriented Success", "Independent Authority", "Collective Service"],
        lifeExpression: "You build a professional reputation based on innovative leadership and humanitarian service, often becoming known as someone who can see and create positive future possibilities."
    },
    11: {
        combination: "Aquarius on 11th House",
        essence: "Natural Humanitarian",
        description: "With Aquarius on your 11th house cusp, friendships and group activities are absolutely central to your identity and life purpose. You have a natural gift for bringing people together around humanitarian causes and progressive ideals. This is Aquarius's natural house, so you're particularly powerful in areas of social networking, group leadership, and working for collective goals. Your hopes and dreams focus on making the world a better place through innovation, technology, and social reform.",
        approach: "You build friendships and pursue dreams through humanitarian service and work toward progressive goals that benefit all of humanity.",
        strengths: [
            "Natural ability to network and connect diverse groups of people",
            "Humanitarian dreams and goals that inspire collective action",
            "Progressive leadership that guides groups toward positive social change",
            "Innovative approach to friendship that transcends traditional boundaries"
        ],
        challenges: [
            "May be too detached or impersonal in friendships",
            "Tendency to prioritize group causes over individual friendship needs",
            "Can be unpredictable or inconsistent in social commitments",
            "Difficulty with friends who don't share progressive or humanitarian values"
        ],
        keywords: ["Natural Humanitarian", "Progressive Friendship", "Social Innovation", "Collective Dreams", "Group Leadership", "Humanitarian Networks", "Future Society", "Universal Brotherhood"],
        lifeExpression: "You naturally bring people together around humanitarian causes and work toward progressive dreams that benefit all of humanity, often serving as a catalyst for positive social change."
    },
    12: {
        combination: "Aquarius on 12th House",
        essence: "Hidden Rebel",
        description: "With Aquarius on your 12th house cusp, your spiritual and subconscious life is characterized by hidden humanitarian ideals and a connection to collective consciousness. You may have unconscious patterns related to detachment or rebellion that need to be understood and integrated. Your spiritual path involves learning to serve humanity while maintaining your unique individuality, and you may be drawn to meditation practices, spiritual technologies, or serving as a hidden source of innovation and progress for others.",
        approach: "You explore your spiritual and subconscious life through connection to collective consciousness and service to humanitarian ideals.",
        strengths: [
            "Hidden connection to collective consciousness and universal humanitarian ideals",
            "Natural understanding of the importance of serving humanity",
            "Innovative approach to spirituality that embraces new methods and technologies",
            "Ability to channel progressive ideas and insights from higher consciousness"
        ],
        challenges: [
            "Unconscious patterns of detachment or emotional distance",
            "Tendency to rebel against spiritual authority or traditional practices",
            "May suppress individual needs in favor of collective service",
            "Difficulty integrating innovative spiritual insights with practical application"
        ],
        keywords: ["Hidden Innovation", "Collective Consciousness", "Spiritual Technology", "Universal Service", "Unconscious Rebellion", "Humanitarian Spirituality", "Progressive Mysticism", "Future Consciousness"],
        lifeExpression: "You serve as a hidden channel for progressive spiritual insights and humanitarian ideals while working to integrate your need for individual uniqueness with service to collective consciousness."
    }
};
// Pisces on House Cusps
export const PISCES_HOUSE_INTERPRETATIONS: Record<number, SignHouseInterpretation> = {
    1: {
        combination: "Pisces on 1st House",
        essence: "Compassionate Dreamer",
        description: "With Pisces on your 1st house cusp (Ascendant), you project an image of compassion, sensitivity, and spiritual depth. Others see you as someone who is intuitive, empathetic, and naturally attuned to the emotional undercurrents around you. You approach life with imagination and a desire to help and heal others. Your gentle, dreamy nature and psychic sensitivity make you naturally inspiring to others, though you may sometimes seem elusive or hard to pin down.",
        approach: "You tackle life with compassion, intuition, and a focus on spiritual growth and service to others through healing and creativity.",
        strengths: [
            "Deep empathy and compassion that naturally helps and heals others",
            "Strong intuitive abilities and psychic sensitivity",
            "Imaginative, creative approach that brings beauty and inspiration to life",
            "Spiritual depth and connection to higher consciousness"
        ],
        challenges: [
            "May be too sensitive or easily overwhelmed by others' emotions",
            "Tendency to be vague, indecisive, or lacking clear boundaries",
            "Can be escapist or avoid dealing with practical realities",
            "Difficulty asserting yourself or standing up for your needs"
        ],
        keywords: ["Compassion", "Intuition", "Sensitivity", "Spirituality", "Imagination", "Empathy", "Healing", "Mysticism"],
        lifeExpression: "You're known for your compassionate, intuitive nature and ability to understand and heal others' emotional pain, often being the person others turn to for spiritual guidance and emotional support."
    },
    2: {
        combination: "Pisces on 2nd House",
        essence: "Intuitive Accumulator",
        description: "With Pisces on your 2nd house cusp, you approach money and possessions with intuition and a focus on spiritual rather than material values. You're naturally drawn to earning through creative, healing, or spiritual work, and your relationship with resources is fluid and changeable. You may have psychic insights about financial opportunities, but you also need to be careful about being too trusting or impractical with money. You value possessions that have emotional or spiritual significance over purely material worth.",
        approach: "You build wealth through intuitive guidance and see money as a tool for spiritual growth and helping others rather than personal security.",
        strengths: [
            "Intuitive understanding of financial opportunities and timing",
            "Natural ability to earn through creative, healing, or spiritual work",
            "Generous, compassionate approach to sharing resources with others",
            "Values-based relationship with money that prioritizes spiritual over material wealth"
        ],
        challenges: [
            "May be too trusting or impractical with financial decisions",
            "Tendency to be vague or disorganized about money management",
            "Can be overly generous or easily taken advantage of financially",
            "Difficulty maintaining consistent earning patterns or financial discipline"
        ],
        keywords: ["Intuitive Finance", "Spiritual Wealth", "Creative Earning", "Compassionate Sharing", "Fluid Resources", "Psychic Money", "Healing Income", "Emotional Value"],
        lifeExpression: "You approach finances with intuition and compassion, often earning through creative or healing work while learning to balance spiritual values with practical money management."
    },
    3: {
        combination: "Pisces on 3rd House",
        essence: "Empathetic Communicator",
        description: "With Pisces on your 3rd house cusp, your communication style is intuitive, empathetic, and focused on emotional and spiritual connection. You prefer conversations that touch the heart and soul over purely intellectual discussions. Your learning style is imaginative and holistic, and you excel when you can absorb information through feeling and intuition rather than just logic. You may have a talent for poetry, music, or any form of communication that conveys emotion and spiritual meaning.",
        approach: "You communicate with empathy and intuition, seeking to create emotional and spiritual connections through your words and ideas.",
        strengths: [
            "Natural ability to understand and communicate emotions and spiritual concepts",
            "Empathetic communication style that makes others feel heard and understood",
            "Imaginative learning approach that grasps subtle meanings and connections",
            "Talent for creative communication through art, music, or poetry"
        ],
        challenges: [
            "May be too vague or indirect in communication",
            "Tendency to absorb others' thoughts and emotions without clear boundaries",
            "Can be overwhelmed by too much information or harsh communication",
            "Difficulty with purely logical or technical subjects"
        ],
        keywords: ["Empathetic Communication", "Intuitive Learning", "Emotional Expression", "Spiritual Discussion", "Creative Writing", "Psychic Reception", "Compassionate Listening", "Imaginative Ideas"],
        lifeExpression: "You communicate with natural empathy and intuition, often being valued for your ability to understand and express the emotional and spiritual dimensions of any topic."
    },
    4: {
        combination: "Pisces on 4th House",
        essence: "Spiritual Foundation",
        description: "With Pisces on your 4th house cusp, you approach home and family matters with compassion, intuition, and a desire for spiritual connection. Your family background may have emphasized spirituality, creativity, or service to others, and you likely learned early about the importance of emotional sensitivity and compassion. You want your home to be a sanctuary that supports spiritual growth and emotional healing, and you may serve as the family's source of comfort and spiritual guidance.",
        approach: "You build your emotional foundation through creating spiritually nurturing environments that support healing and compassionate connection.",
        strengths: [
            "Natural ability to create peaceful, spiritually nurturing home environments",
            "Deep emotional sensitivity that helps family members feel understood",
            "Compassionate approach to family problems that promotes healing",
            "Intuitive understanding of family emotional dynamics and needs"
        ],
        challenges: [
            "May absorb family emotions without proper boundaries",
            "Tendency to be overly sacrificing or martyring in family relationships",
            "Can be vague or indirect about family needs and boundaries",
            "Difficulty dealing with practical family responsibilities"
        ],
        keywords: ["Spiritual Home", "Compassionate Family", "Emotional Sanctuary", "Healing Environment", "Intuitive Care", "Psychic Sensitivity", "Nurturing Foundation", "Sacred Space"],
        lifeExpression: "You create homes that serve as spiritual sanctuaries and emotional healing spaces, often being the family member who provides comfort and spiritual guidance during difficult times."
    },
    5: {
        combination: "Pisces on 5th House",
        essence: "Imaginative Creator",
        description: "With Pisces on your 5th house cusp, your creative expression is imaginative, spiritual, and focused on touching hearts and souls. You're drawn to creative activities that involve emotion, spirituality, or healing - music, dance, visual arts, or any medium that conveys feeling and meaning. In romance, you're idealistic and seek soul-mate connections that transcend the physical realm. You approach creativity and recreation with the same spiritual sensitivity you bring to other areas of life, often producing deeply moving, inspirational work.",
        approach: "You express creativity through imagination and spiritual inspiration, seeking romantic relationships that offer deep emotional and spiritual connection.",
        strengths: [
            "Deeply imaginative creative abilities that touch hearts and inspire others",
            "Romantic idealism that seeks and creates beautiful, meaningful connections",
            "Natural ability to channel spiritual inspiration into creative work",
            "Compassionate approach to children and creative collaboration"
        ],
        challenges: [
            "May be too idealistic or unrealistic in romantic expectations",
            "Tendency to be vague or unfocused in creative projects",
            "Can be overly sensitive to criticism of creative work",
            "Difficulty with practical aspects of creative or romantic endeavors"
        ],
        keywords: ["Imaginative Creativity", "Spiritual Romance", "Inspirational Art", "Soul-Mate Love", "Emotional Expression", "Mystical Creation", "Compassionate Play", "Transcendent Beauty"],
        lifeExpression: "You create with deep imagination and spiritual inspiration while seeking romantic relationships that offer soul-level connection and mutual spiritual growth."
    },
    6: {
        combination: "Pisces on 6th House",
        essence: "Compassionate Worker",
        description: "With Pisces on your 6th house cusp, you approach work with compassion and a desire to serve and heal others. You're drawn to careers in healthcare, social work, spiritual counseling, or any field that allows you to help people in need. Your work style is intuitive and empathetic, and you excel when you can work in supportive, understanding environments. In health matters, you're sensitive to emotional and spiritual influences on physical wellbeing and may be drawn to holistic or alternative healing approaches.",
        approach: "You approach work and health with compassion and intuition, focusing on service and healing that addresses both physical and spiritual needs.",
        strengths: [
            "Natural compassion and empathy that makes you excellent in helping professions",
            "Intuitive understanding of others' needs and how to provide healing support",
            "Holistic approach to health that addresses emotional and spiritual wellbeing",
            "Ability to create supportive, healing work environments"
        ],
        challenges: [
            "May absorb others' problems and emotions without proper boundaries",
            "Tendency to be overly sacrificing or martyring in service to others",
            "Can be vague or disorganized about practical work responsibilities",
            "Difficulty maintaining consistent work schedules or health routines"
        ],
        keywords: ["Compassionate Service", "Healing Work", "Intuitive Care", "Holistic Health", "Empathetic Labor", "Spiritual Wellness", "Sacrificial Service", "Emotional Healing"],
        lifeExpression: "You serve others with natural compassion and healing abilities while learning to maintain healthy boundaries and care for your own physical and emotional wellbeing."
    },
    7: {
        combination: "Pisces on 7th House",
        essence: "Devoted Partner",
        description: "With Pisces on your 7th house cusp, you're attracted to partners who are compassionate, spiritual, and emotionally sensitive. You seek relationships that offer deep emotional and spiritual connection, and you're drawn to partners who need healing or who can help you grow spiritually. In business partnerships, you prefer working with people who are intuitive, creative, and share your values about service and compassion. You may idealize partners or be drawn to relationships that involve sacrifice and devotion.",
        approach: "You seek partnerships that offer deep spiritual and emotional connection, often involving mutual healing and compassionate service.",
        strengths: [
            "Natural ability to create deeply compassionate, healing partnerships",
            "Intuitive understanding of partners' emotional and spiritual needs",
            "Devotional approach to relationships that creates strong emotional bonds",
            "Capacity for unconditional love and acceptance in partnerships"
        ],
        challenges: [
            "May be too idealistic or unrealistic about partners",
            "Tendency to attract partners who need healing or who are emotionally unavailable",
            "Can be overly sacrificing or lose yourself in relationships",
            "Difficulty maintaining boundaries or dealing with practical relationship issues"
        ],
        keywords: ["Devoted Partnership", "Spiritual Love", "Compassionate Union", "Healing Relationships", "Emotional Depth", "Sacrificial Love", "Intuitive Connection", "Soul-Mate Seeking"],
        lifeExpression: "You form deeply compassionate partnerships based on spiritual connection and mutual healing, often being drawn to relationships that involve service and emotional growth."
    },
    8: {
        combination: "Pisces on 8th House",
        essence: "Mystical Transformer",
        description: "With Pisces on your 8th house cusp, you approach transformation, shared resources, and life's deeper mysteries with intuition and spiritual understanding. Your transformations often come through spiritual experiences, emotional healing, or psychic insights. You may be drawn to studying mysticism, alternative healing, or the spiritual dimensions of psychology. Your approach to shared resources is trusting and compassionate, though you need to be careful about being too naive or easily deceived.",
        approach: "You navigate transformation and deep change through spiritual understanding and intuitive guidance that reveals hidden emotional and psychic truths.",
        strengths: [
            "Deep spiritual understanding of transformation and life's mysteries",
            "Natural psychic abilities and intuitive insights into hidden dynamics",
            "Compassionate approach to helping others through transformative experiences",
            "Ability to find spiritual meaning and healing in difficult situations"
        ],
        challenges: [
            "May be too trusting or naive about shared resources or hidden motives",
            "Tendency to be overwhelmed by psychic sensitivity or others' emotions",
            "Can be vague or confused about practical aspects of transformation",
            "Difficulty distinguishing between genuine spiritual insights and wishful thinking"
        ],
        keywords: ["Mystical Transformation", "Psychic Insight", "Spiritual Healing", "Emotional Depth", "Intuitive Understanding", "Compassionate Change", "Hidden Wisdom", "Transcendent Growth"],
        lifeExpression: "You approach life's deeper mysteries with spiritual understanding and psychic sensitivity, often helping others find healing and meaning through transformative experiences."
    },
    9: {
        combination: "Pisces on 9th House",
        essence: "Spiritual Seeker",
        description: "With Pisces on your 9th house cusp, you approach higher learning, philosophy, and spiritual matters with intuition and a desire for transcendent understanding. You're drawn to mystical traditions, comparative religion, and philosophies that emphasize compassion and universal love. Your approach to education is holistic and experiential, and you may be interested in pilgrimage, spiritual retreat, or learning through meditation and contemplation. You seek wisdom that connects you to the divine and helps you serve others.",
        approach: "You pursue wisdom and higher knowledge through spiritual experience and seek teachings that promote compassion and universal understanding.",
        strengths: [
            "Deep spiritual understanding and connection to mystical wisdom traditions",
            "Natural ability to grasp and teach compassionate, universal philosophies",
            "Intuitive approach to learning that transcends purely intellectual understanding",
            "Capacity for spiritual teaching that touches hearts and inspires devotion"
        ],
        challenges: [
            "May be too idealistic or impractical about spiritual or philosophical beliefs",
            "Tendency to be vague or confused about concrete educational goals",
            "Can be overly trusting of spiritual teachers or belief systems",
            "Difficulty with purely academic or logical approaches to learning"
        ],
        keywords: ["Spiritual Wisdom", "Mystical Learning", "Compassionate Philosophy", "Universal Love", "Intuitive Education", "Transcendent Understanding", "Sacred Teaching", "Divine Connection"],
        lifeExpression: "You seek and share spiritual wisdom that promotes compassion and universal understanding, often being drawn to mystical traditions and experiential approaches to learning."
    },
    10: {
        combination: "Pisces on 10th House",
        essence: "Inspirational Leader",
        description: "With Pisces on your 10th house cusp (Midheaven), you build your career and reputation through compassionate service and inspirational work. You're drawn to professions that involve healing, creativity, spirituality, or helping those in need. Your professional reputation is built on your ability to inspire others, provide emotional and spiritual support, and create beauty or healing in the world. You may be drawn to careers in healthcare, arts, social work, or spiritual counseling.",
        approach: "You build your career through compassionate service and inspirational work that heals, helps, and uplifts others.",
        strengths: [
            "Natural ability to inspire and uplift others through your work",
            "Compassionate leadership style that creates supportive work environments",
            "Intuitive understanding of what people need for healing and growth",
            "Reputation for integrity, compassion, and spiritual depth"
        ],
        challenges: [
            "May be too idealistic or impractical about career goals",
            "Tendency to be vague or unfocused about professional direction",
            "Can be overly sacrificing or undervalue your professional contributions",
            "Difficulty with competitive or purely profit-driven career environments"
        ],
        keywords: ["Inspirational Leadership", "Compassionate Career", "Healing Profession", "Spiritual Service", "Creative Authority", "Empathetic Management", "Sacrificial Work", "Transcendent Success"],
        lifeExpression: "You build a professional reputation based on compassionate service and inspirational leadership, often becoming known as someone who heals, helps, and uplifts others through your work."
    },
    11: {
        combination: "Pisces on 11th House",
        essence: "Compassionate Friend",
        description: "With Pisces on your 11th house cusp, you approach friendships and group activities with compassion and a desire to help and heal others. Your hopes and dreams are idealistic and often involve making the world a more compassionate, peaceful place. You're drawn to groups that focus on healing, spirituality, or service to those in need. Your social network likely includes sensitive, creative, and spiritually-minded people who share your values about compassion and service.",
        approach: "You build friendships and pursue dreams through compassionate service and work toward idealistic goals that promote healing and spiritual growth.",
        strengths: [
            "Natural ability to create compassionate, supportive friendships",
            "Idealistic dreams and goals that inspire others toward higher purposes",
            "Empathetic understanding of friends' emotional and spiritual needs",
            "Talent for bringing healing and peace to group dynamics"
        ],
        challenges: [
            "May be too trusting or naive about friends' motives",
            "Tendency to absorb group emotions without proper boundaries",
            "Can be overly idealistic about what groups or friends can achieve",
            "Difficulty with competitive or conflict-oriented social situations"
        ],
        keywords: ["Compassionate Friendship", "Idealistic Dreams", "Healing Groups", "Spiritual Community", "Empathetic Networks", "Peaceful Goals", "Sacrificial Service", "Universal Love"],
        lifeExpression: "You create compassionate friendships and work toward idealistic dreams that promote healing and spiritual growth, often serving as the heart and conscience of your social groups."
    },
    12: {
        combination: "Pisces on 12th House",
        essence: "Natural Mystic",
        description: "With Pisces on your 12th house cusp, your spiritual and subconscious life is characterized by deep mystical understanding and natural connection to the divine. This is Pisces's natural house, so you're particularly powerful in areas of spirituality, psychic ability, and connection to the collective unconscious. You may have unconscious patterns related to sacrifice or martyrdom that need understanding and integration. Your spiritual path involves learning to serve the divine while maintaining healthy boundaries and self-care.",
        approach: "You explore your spiritual and subconscious life through mystical experience and serve as a natural channel for divine love and healing.",
        strengths: [
            "Deep natural connection to spiritual realms and divine consciousness",
            "Powerful psychic abilities and intuitive understanding of hidden truths",
            "Natural capacity for selfless service and spiritual healing",
            "Ability to channel divine love and compassion for others' benefit"
        ],
        challenges: [
            "Unconscious patterns of martyrdom or excessive sacrifice",
            "Tendency to lose boundaries between self and others or divine consciousness",
            "May be overwhelmed by psychic sensitivity or spiritual experiences",
            "Difficulty distinguishing between genuine spiritual guidance and illusion"
        ],
        keywords: ["Natural Mysticism", "Divine Connection", "Psychic Sensitivity", "Spiritual Healing", "Unconscious Sacrifice", "Transcendent Love", "Collective Consciousness", "Sacred Service"],
        lifeExpression: "You serve as a natural mystic and channel for divine love while learning to balance spiritual service with healthy self-care and clear boundaries."
    }
};