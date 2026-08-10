// 60 Pillar Combinations (Stem + Branch pairs)
// Each combination has a unique interpretation based on how stem and branch interact

import type { HeavenlyStem, EarthlyBranch } from "./types";

export interface PillarCombination {
    stem: HeavenlyStem;
    branch: EarthlyBranch;
    name: string;              // e.g., "Yang Metal Monkey"
    chineseName: string;       // e.g., "庚申 (Gēng Shēn)"

    // Core interpretation
    essence: string;           // What this combination IS (1-2 sentences)
    howItWorks: string;        // How stem and branch interact (2-3 sentences)

    // Position-specific interpretations
    asYear: string;            // What this means in Year Pillar
    asMonth: string;           // What this means in Month Pillar
    asDay: string;             // What this means in Day Pillar (Day Master)
    asHour: string;            // What this means in Hour Pillar

    // Practical insights
    strengths: string[];       // 3-4 key strengths
    challenges: string[];      // 3-4 key challenges
    lifeTheme: string;         // Overarching theme
}

/**
 * 60 Pillar Combinations
 * Format: [stem][branch] = combination
 * 
 * PHASE 1: Start with a few examples to establish the pattern
 * TODO: Complete all 60 combinations
 */
export const PILLAR_COMBINATIONS: Partial<Record<string, PillarCombination>> = {
    // 1) Jia Zi (甲子) - Yang Wood Rat
    '0-0': {
        stem: 0,
        branch: 0,
        name: "Yang Wood Rat",
        chineseName: "甲子 (Jiǎ Zǐ)",

        essence:
            "The visionary seed in motion. Upright growth rides a current of intelligence and timing. This pillar is about beginnings that spread fast when the moment is right.",

        howItWorks:
            "Yang Wood (initiative, direction, leadership) sits on Rat (Water, strategy, hidden opportunity). Water nourishes Wood, so the environment feeds the stem: ideas, learning, and networks accelerate growth. Rat adds shrewd timing—progress comes through information, alliances, and moving early rather than moving loudly.",

        asYear:
            "You came from a lineage or early environment shaped by survival intelligence and adaptability. Early life emphasized learning the system, reading signals, and finding openings. Others sense you as quietly capable and future-oriented.",

        asMonth:
            "Your career engine thrives where information becomes leverage: strategy, research, trading, tech, negotiation, systems. You do best when you can act early, iterate fast, and let compounding do the heavy lifting.",

        asDay:
            "You ARE the initiating tree on a fast current. Your identity is directional and principled, but you win through timing and intelligence. In relationships you value mental sharpness and momentum. Under pressure you look for the hidden path forward.",

        asHour:
            "Your legacy grows from seeds planted early—ideas, ventures, or networks that compound over time. Later life favors mentorship, building platforms, or creating systems that keep generating value long after the first move.",

        strengths: [
            "Strong initiation + strategic timing",
            "Learns fast and adapts intelligently",
            "Builds leverage through networks and information",
            "Compounds results over time"
        ],

        challenges: [
            "Can overthink or delay action waiting for the perfect opening",
            "May keep plans too hidden and miss support",
            "Restlessness—starting more than finishing",
            "Can become overly strategic in emotional situations"
        ],

        lifeTheme: "Plant early, move smart, and let compounding turn vision into reality"
    },

    // 2) Yi Chou (乙丑) - Yin Wood Ox
    '1-1': {
        stem: 1,
        branch: 1,
        name: "Yin Wood Ox",
        chineseName: "乙丑 (Yǐ Chǒu)",

        essence:
            "The cultivated vine in winter soil. Gentle growth meets endurance and responsibility. This pillar is slow mastery—quiet strength built through consistency.",

        howItWorks:
            "Yin Wood (flexibility, refinement, relationship intelligence) sits on Ox (Earth, labor, structure, persistence). Earth can contain Water and slow movement, so growth here is deliberate: progress through routine, craft, and reliability. Ox adds duty and stamina—success comes from steady cultivation, not sudden bursts.",

        asYear:
            "You came from an environment that valued practicality, responsibility, and stability. Early influences emphasized work ethic, keeping commitments, and building something real. Others see you as grounded and dependable.",

        asMonth:
            "Your career engine is craft + consistency. You thrive in roles requiring steady improvement, operations, stewardship, design systems, or long-term client trust. Prime years reward patience, competence, and execution.",

        asDay:
            "You ARE the steady cultivator. Your identity is subtle and adaptive, but anchored by endurance. In relationships you’re loyal and supportive, preferring reliability over drama. Under pressure you simplify, stabilize, and keep going.",

        asHour:
            "Your legacy is built through what you maintained and improved: a business, a family line, a craft, a community role. Later life emphasizes stewardship—teaching others how to build quietly and last.",

        strengths: [
            "Exceptional consistency and stamina",
            "Practical intelligence and reliability",
            "Builds trust over time",
            "Patient refinement of skills"
        ],

        challenges: [
            "May grow too slowly due to caution or duty",
            "Can over-accommodate responsibilities",
            "Difficulty changing direction once committed",
            "Can underestimate your own ambition"
        ],

        lifeTheme: "Quiet growth becomes undeniable through consistency and stewardship"
    },

    // 3) Bing Yin (丙寅) - Yang Fire Tiger
    '2-2': {
        stem: 2,
        branch: 2,
        name: "Yang Fire Tiger",
        chineseName: "丙寅 (Bǐng Yín)",

        essence:
            "The torchbearer of the frontier. Radiant purpose meets courageous momentum. This pillar is bold leadership—lighting the way by moving first.",

        howItWorks:
            "Yang Fire (sun/torch, inspiration, visibility) sits on Tiger (Wood, drive, ambition, exploration). Wood feeds Fire, so the base fuels the flame: confidence grows when you act. Tiger adds daring and a pioneering spirit—this is fire that advances, not fire that waits.",

        asYear:
            "You came from an environment where boldness, independence, or leadership mattered. Early life taught you to be strong, to stand out, or to protect what matters. Others perceive intensity and courage in your presence.",

        asMonth:
            "Your career engine runs on initiative and inspiration. You thrive in leadership, entrepreneurship, performance, mission-driven work, or roles that require motivating others. Prime years favor decisive action and visible impact.",

        asDay:
            "You ARE the advancing flame. Your identity is passionate, direct, and driven by meaning. In relationships you want honesty, loyalty, and shared purpose. Under pressure you push forward—sometimes too hard, too fast.",

        asHour:
            "Your legacy is built through what you dared to start: movements, ventures, causes, or teams you energized. Later life emphasizes leadership-by-example and passing the torch to others.",

        strengths: [
            "Natural leadership and motivational power",
            "Courage to start what others avoid",
            "High drive and decisive momentum",
            "Strong sense of mission"
        ],

        challenges: [
            "Can burn out or become impatient",
            "May dominate spaces unintentionally",
            "Tendency toward all-or-nothing intensity",
            "Difficulty slowing down for nuance"
        ],

        lifeTheme: "Lead from the front—ignite purpose through action"
    },

    // 4) Ding Mao (丁卯) - Yin Fire Rabbit
    '3-3': {
        stem: 3,
        branch: 3,
        name: "Yin Fire Rabbit",
        chineseName: "丁卯 (Dīng Mǎo)",

        essence:
            "The lantern in the garden. Refined insight meets gentle artistry. This pillar is influence through beauty—soft power that shapes outcomes quietly.",

        howItWorks:
            "Yin Fire (lamp, refinement, perception) sits on Rabbit (Wood, diplomacy, aesthetics). Wood supports Fire, so creativity and relational intelligence feed the light. Rabbit adds taste and harmony—this is fire expressed as elegance, timing, and emotional intelligence rather than raw display.",

        asYear:
            "You came from an environment that valued sensitivity, culture, or diplomacy. Early life emphasized reading people, keeping harmony, and presenting well. Others see you as tasteful and perceptive.",

        asMonth:
            "Your career engine thrives in design, branding, writing, teaching, counseling, diplomacy, or any role where nuance matters. Prime years reward you for refined judgment and the ability to guide situations without force.",

        asDay:
            "You ARE the refined flame. Your identity is subtle, discerning, and emotionally intelligent. In relationships you’re attentive and often protective of harmony. Under pressure you become sharper internally—more observational, more selective.",

        asHour:
            "Your legacy is the light you left in people: taste, wisdom, mentorship, and the ability to create calm clarity. Later life favors teaching, artistry, and creating environments that heal or inspire.",

        strengths: [
            "Strong aesthetic and intuitive intelligence",
            "Diplomatic influence and social finesse",
            "Refined communication and discernment",
            "Creates harmony without losing direction"
        ],

        challenges: [
            "May avoid direct conflict too long",
            "Can internalize stress and become anxious",
            "Risk of being underestimated due to softness",
            "Can become overly perfectionistic"
        ],

        lifeTheme: "Win through refinement—soft power, strong clarity"
    },

    // 5) Wu Chen (戊辰) - Yang Earth Dragon
    '4-4': {
        stem: 4,
        branch: 4,
        name: "Yang Earth Dragon",
        chineseName: "戊辰 (Wù Chén)",

        essence:
            "The mountain over the reservoir. Massive stability meets hidden depth and transformation. This pillar is builder energy with a mysterious undertow—structure that can reinvent itself.",

        howItWorks:
            "Yang Earth (mountain, containment, responsibility) sits on Dragon (Earth with Water/Wood hidden—change, storage, latent power). This often feels like Earth reinforcing Earth: strong presence, strong boundaries, strong impact. Dragon adds complexity—behind the solid exterior are cycles of reinvention, strategic timing, and hidden reserves.",

        asYear:
            "You came from an environment shaped by duty, legacy, or big structural forces. Early life emphasized resilience and carrying weight. Others see you as formidable, grounded, and not easily moved.",

        asMonth:
            "Your career engine is systems-building: infrastructure, management, finance, governance, operations, architecture—anything that requires holding complexity. Prime years reward you for taking responsibility and mastering long time horizons.",

        asDay:
            "You ARE the mountain with hidden depth. Your identity is stable and commanding, but you’re not simple—you’re strategic. In relationships you value loyalty and respect. Under pressure you become more controlled, more selective, and more determined.",

        asHour:
            "Your legacy is what you built that lasts: structures, institutions, wealth systems, land, or frameworks. Later life emphasizes stewardship and strategic transformation—knowing when to hold and when to reshape.",

        strengths: [
            "Exceptional stability under pressure",
            "Strong ability to build durable systems",
            "Strategic depth beneath a calm exterior",
            "Long-horizon thinking and responsibility"
        ],

        challenges: [
            "Can be rigid or slow to pivot",
            "May carry too much alone",
            "Difficulty showing vulnerability",
            "Can become controlling when insecure"
        ],

        lifeTheme: "Build what lasts—and master the art of strategic reinvention"
    },
    // 6) Ji Si (己巳) - Yin Earth Snake
    '5-5': {
        stem: 5,
        branch: 5,
        name: "Yin Earth Snake",
        chineseName: "己巳 (Jǐ Sì)",

        essence:
            "The cultivated strategist. Practical earth meets penetrating fire. This pillar is quiet mastery—turning insight into usable advantage through patience and precision.",

        howItWorks:
            "Yin Earth (soil, refinement, pragmatism) sits on Snake (Fire, strategy, depth, focused intelligence). Snake carries strong fire and metal qualities, heating and sharpening the soil into something intentional rather than passive. This creates a mind that studies patterns, finds leverage, and executes carefully—often behind the scenes. Progress comes through specialization and timing, not brute force.",

        asYear:
            "You came from an environment where competence, discretion, or strategy mattered. Early influences emphasized reading situations, protecting resources, and being smart with what you reveal. Others sense you are composed and hard to fool.",

        asMonth:
            "Your career engine thrives where deep focus wins: strategy, finance, research, product, law, medicine, design systems, negotiation. Prime years favor roles that reward precision, confidentiality, and long-game thinking.",

        asDay:
            "You ARE the cultivated strategist. Your identity is practical, observant, and quietly ambitious. You prefer to understand the whole board before moving. In relationships you value loyalty, intelligence, and trust. Under pressure you become more calculating and selective.",

        asHour:
            "Your legacy is built through specialized mastery and well-timed moves—systems, investments, or methods that outthink the obvious. Later life often emphasizes mentorship, advisory roles, or building durable advantage through knowledge.",

        strengths: [
            "Strategic pattern recognition and timing",
            "Practical execution with high precision",
            "Discreet power and strong self-control",
            "Ability to specialize and master complex domains"
        ],

        challenges: [
            "Can become overly guarded or suspicious",
            "May overthink and delay decisive action",
            "Risk of manipulation—using insight without warmth",
            "Difficulty showing needs or vulnerability"
        ],

        lifeTheme: "Quiet mastery: learn the pattern, then move with precision"
    },

    // 7) Geng Wu (庚午) - Yang Metal Horse
    '6-6': {
        stem: 6,
        branch: 6,
        name: "Yang Metal Horse",
        chineseName: "庚午 (Gēng Wǔ)",

        essence:
            "The crusader blade. Standards meet speed. This pillar is decisive reform—cutting through inertia with bold movement and visible conviction.",

        howItWorks:
            "Yang Metal (blade, reform, truth through standards) sits on Horse (strong Fire, motion, independence). Fire controls metal by melting and forging it—so this combination brings pressure that strengthens you through challenge. The Horse adds urgency and expression: you don’t just see what’s wrong; you move to fix it. When balanced, it’s heroic clarity; when unbalanced, it’s sharp heat.",

        asYear:
            "You came from an environment that pushed you toward toughness, independence, or high expectations. Early life may have demanded you grow strong fast. Others see you as bold, no-nonsense, and capable under heat.",

        asMonth:
            "Your career engine thrives in turnaround environments: leadership, operations, reform, crisis response, military/police, entrepreneurship, high-stakes execution. Prime years reward you for decisive action, especially where systems need correction.",

        asDay:
            "You ARE the forged blade in motion. Your identity is direct, principled, and action-oriented. In relationships you respect strength and honesty, and you dislike ambiguity. Under pressure you become even more decisive—sometimes too cutting.",

        asHour:
            "Your legacy is built through reforms, standards, and visible accomplishments—projects that required courage and speed. Later life can emphasize mentoring others in discipline and decisive execution.",

        strengths: [
            "Decisive leadership under pressure",
            "Strong standards and integrity",
            "Ability to execute quickly and correct course",
            "Courage to confront hard truths"
        ],

        challenges: [
            "Can run hot—impatient, sharp, or confrontational",
            "Risk of burnout from constant urgency",
            "May alienate others with blunt delivery",
            "Difficulty softening when softness is needed"
        ],

        lifeTheme: "Forge standards in the fire—reform through bold action"
    },

    // 8) Xin Wei (辛未) - Yin Metal Goat
    '7-7': {
        stem: 7,
        branch: 7,
        name: "Yin Metal Goat",
        chineseName: "辛未 (Xīn Wèi)",

        essence:
            "The jeweled craftsman. Refined metal meets gentle earth. This pillar is elegance with backbone—beauty, taste, and precision anchored in steadiness.",

        howItWorks:
            "Yin Metal (jewelry, refinement, discernment) sits on Goat (Earth, care, cultivation, harmony). Earth supports metal by providing ore and stability, giving the refined metal a grounded base. Goat adds sensitivity and human warmth to metal’s sharp discernment—making this combination capable of tasteful judgment that still protects standards. Progress comes through craft, quality, and trust.",

        asYear:
            "You came from an environment that valued propriety, aesthetics, or doing things the right way. Early influences emphasized taste, manners, and careful choices. Others see you as composed, selective, and quietly strong.",

        asMonth:
            "Your career engine thrives in quality-driven domains: design, branding, finance/asset selection, editorial, law, product, hospitality, curation. Prime years reward you for discernment and building reputation through excellence.",

        asDay:
            "You ARE refined discernment. Your identity is tasteful, precise, and boundary-aware. In relationships you want respect, consistency, and emotional steadiness. Under pressure you become more selective—cutting out what doesn’t meet your standard.",

        asHour:
            "Your legacy is built through craft, curation, and the standards you upheld—work that remains valuable because it was made well. Later life emphasizes mentorship in taste, ethics, and long-lasting quality.",

        strengths: [
            "Excellent discernment and taste",
            "Builds reputation through quality",
            "Quiet resilience and self-respect",
            "Balances refinement with stability"
        ],

        challenges: [
            "Can be too picky or hard to please",
            "May withdraw when disappointed",
            "Difficulty tolerating chaos or low standards",
            "Can over-invest in appearances"
        ],

        lifeTheme: "Refinement that lasts: build beauty, uphold standards, earn trust"
    },

    // 9) Ren Shen (壬申) - Yang Water Monkey
    '8-8': {
        stem: 8,
        branch: 8,
        name: "Yang Water Monkey",
        chineseName: "壬申 (Rén Shēn)",

        essence:
            "The strategic river. Powerful movement meets tactical intelligence. This pillar is adaptive force—using speed, systems, and timing to reshape outcomes.",

        howItWorks:
            "Yang Water (river/ocean, momentum, reach) sits on Monkey (Metal, strategy, systems). Metal generates water, so the base fuels the current—intelligence and structure empower movement. Monkey adds cleverness, modular thinking, and opportunism: you navigate complexity by changing angles fast, using tools, data, and networks to create leverage.",

        asYear:
            "You came from an environment where adaptability and clever problem-solving mattered. Early life taught you to read systems and move with timing. Others see you as sharp, resourceful, and hard to contain.",

        asMonth:
            "Your career engine thrives in dynamic systems: tech, trading, operations, logistics, security, consulting, product strategy. Prime years reward rapid learning, systemic thinking, and exploiting timing advantages.",

        asDay:
            "You ARE adaptive force. Your identity is flexible, strategic, and momentum-driven. In relationships you value intelligence and freedom; you dislike stagnation. Under pressure you become even more tactical—finding the quickest route through.",

        asHour:
            "Your legacy is built through networks, platforms, or methods that move information and value efficiently. Later life often emphasizes building systems that keep flowing—teaching others strategy and timing.",

        strengths: [
            "Exceptional adaptability and learning speed",
            "Strategic systems thinking",
            "Strong timing instincts and opportunism",
            "Turns complexity into leverage"
        ],

        challenges: [
            "Can become restless or scattered",
            "May outsmart feelings and miss emotional depth",
            "Risk of being perceived as slippery or too tactical",
            "Over-optimization—always gaming the system"
        ],

        lifeTheme: "Master timing and systems—turn flow into leverage"
    },

    // 10) Gui You (癸酉) - Yin Water Rooster
    '9-9': {
        stem: 9,
        branch: 9,
        name: "Yin Water Rooster",
        chineseName: "癸酉 (Guǐ Yǒu)",

        essence:
            "The crystalline mind. Subtle intelligence meets precision and critique. This pillar is clarity—seeing fine distinctions and refining truth into clean form.",

        howItWorks:
            "Yin Water (mist, insight, nuance, intuition) sits on Rooster (Metal, precision, discernment). Metal generates water, feeding the subtle mind with structure and definition. Rooster sharpens perception—this is water that becomes articulate: noticing what’s off, naming it, and polishing it into coherence. When balanced, it’s elegant truth; when imbalanced, it’s anxious critique.",

        asYear:
            "You came from an environment that valued correctness, performance, or sharp standards. Early influences emphasized being precise and noticing details. Others see you as perceptive, composed, and hard to fool.",

        asMonth:
            "Your career engine thrives in analysis and refinement: writing/editing, research, data, QA, law, medicine, design critique, finance. Prime years reward your ability to improve systems and elevate quality through precision.",

        asDay:
            "You ARE refined perception. Your identity is nuanced, observant, and truth-oriented. In relationships you value honesty and competence, but you can be sensitive to flaws. Under pressure you become more analytic—sometimes overly self-critical.",

        asHour:
            "Your legacy is built through precision—work that endures because it was clarified, corrected, and refined. Later life emphasizes teaching discernment and leaving behind clean frameworks and standards.",

        strengths: [
            "Exceptional nuance and observational skill",
            "High standards and quality improvement",
            "Strong articulation and analytical clarity",
            "Refines messy reality into coherent insight"
        ],

        challenges: [
            "Can become overly critical (self or others)",
            "Risk of anxiety from perfectionism",
            "May intellectualize emotions",
            "Can get stuck polishing instead of shipping"
        ],

        lifeTheme: "Refine truth into form—clarity, precision, and clean standards"
    },

    // 11) Jia Xu (甲戌) - Yang Wood Dog
    '0-10': {
        stem: 0,
        branch: 10,
        name: "Yang Wood Dog",
        chineseName: "甲戌 (Jiǎ Xū)",

        essence:
            "The principled guardian. Upright growth meets loyal protection and moral fire. This pillar is integrity with backbone—building what’s right and defending it.",

        howItWorks:
            "Yang Wood (direction, leadership, principle) sits on Dog (Earth with hidden Fire/Metal: loyalty, duty, judgment). The Dog stabilizes Wood by demanding responsibility and ethical clarity—growth must be earned and aligned. Hidden fire adds conviction, while hidden metal adds standards: you tend to build with purpose, then enforce the line.",

        asYear:
            "You came from an environment shaped by duty, loyalty, or a strong sense of right and wrong. Early influences emphasized standing up for something and carrying responsibility. Others see you as solid, reliable, and principled.",

        asMonth:
            "Your career engine thrives where values and structure matter: leadership, law, operations, governance, security, compliance, coaching. Prime years reward you for building durable systems and enforcing standards with fairness.",

        asDay:
            "You ARE principled growth. Your identity is directional and protective—someone who builds and defends. In relationships you value loyalty and shared values. Under pressure you become firm, decisive, and unwilling to compromise your integrity.",

        asHour:
            "Your legacy is built through what you protected and improved—institutions, communities, people, or principles. Later life emphasizes mentorship, stewardship, and leaving behind a code others can follow.",

        strengths: [
            "Strong integrity and moral clarity",
            "Protective leadership and loyalty",
            "Builds durable structures and standards",
            "Reliable under pressure"
        ],

        challenges: [
            "Can become rigid or judgmental",
            "May carry too much responsibility alone",
            "Difficulty relaxing or being vulnerable",
            "Can hold grudges when trust is broken"
        ],

        lifeTheme: "Build with principle—protect what matters, enforce the line with fairness"
    },

    // 12) Yi Hai (乙亥) - Yin Wood Pig
    '1-11': {
        stem: 1,
        branch: 11,
        name: "Yin Wood Pig",
        chineseName: "乙亥 (Yǐ Hài)",

        essence:
            "The compassionate vine in deep water. Gentle growth meets vast intuition and generosity. This pillar is healing expansion—growing through empathy, imagination, and spiritual depth.",

        howItWorks:
            "Yin Wood (adaptation, finesse, connection) sits on Pig (Water, depth, openness). Water nourishes Wood strongly here, giving the vine abundant emotional and intuitive fuel. Pig adds sincerity and big-feeling generosity—growth often comes through learning, travel of the mind, and relationships that deepen your heart.",

        asYear:
            "You came from an environment that emphasized kindness, openness, or big emotional tides. Early life taught you sensitivity and the importance of compassion. Others see you as warm, intuitive, and approachable.",

        asMonth:
            "Your career engine thrives in people-centered and meaning-driven domains: counseling, teaching, writing, art, healing, community building, hospitality, spiritual work. Prime years reward your ability to create safe spaces and connect deeply.",

        asDay:
            "You ARE soft power through empathy. Your identity is flexible and emotionally intelligent, with strong intuition. In relationships you’re loyal and giving, but you need boundaries. Under pressure you retreat into reflection, imagination, or quiet repair.",

        asHour:
            "Your legacy is built through care—people you helped, art you created, or wisdom you transmitted. Later life emphasizes mentorship, healing, and leaving behind a gentler culture around you.",

        strengths: [
            "High empathy and intuitive intelligence",
            "Natural healer / connector",
            "Adaptable and relationship-oriented",
            "Creates psychological safety"
        ],

        challenges: [
            "Boundary issues—overgiving or absorbing others",
            "Can drift without structure",
            "Escapism when overwhelmed",
            "Difficulty with harsh confrontation"
        ],

        lifeTheme: "Grow through compassion—heal, connect, and cultivate depth with boundaries"
    },

    // 13) Bing Zi (丙子) - Yang Fire Rat
    '2-0': {
        stem: 2,
        branch: 0,
        name: "Yang Fire Rat",
        chineseName: "丙子 (Bǐng Zǐ)",

        essence:
            "The torch on fast water. Radiant ambition meets clever timing. This pillar is bright strategy—using visibility and intelligence to move ahead of the curve.",

        howItWorks:
            "Yang Fire (radiance, inspiration, leadership) sits on Rat (Water, strategy, opportunity). Water can challenge Fire by cooling it, so this combination learns to manage intensity through intelligence and timing. Rat makes the fire tactical: you succeed by choosing moments, using information, and staying mentally agile rather than forcing constant output.",

        asYear:
            "You came from an environment where quick thinking and adaptability were necessary. Early life may have involved change, movement, or learning to read the room fast. Others see you as bright, alert, and ambitious.",

        asMonth:
            "Your career engine thrives in fast-moving arenas: media, sales, leadership, startups, trading, product launches, negotiation. Prime years reward you when you combine charisma with strategy instead of pure intensity.",

        asDay:
            "You ARE visible intelligence. Your identity is expressive and driven, but you’re also tactical—you want momentum with advantage. In relationships you need mental stimulation and honesty. Under pressure you oscillate between pushing and recalibrating; your best move is strategic timing.",

        asHour:
            "Your legacy comes from ideas launched at the right moment—messages, brands, ventures, or leadership that shaped a trend. Later life emphasizes mentoring others in timing, persuasion, and smart visibility.",

        strengths: [
            "Charisma paired with strategic timing",
            "Fast learning and mental agility",
            "Ability to inspire while staying tactical",
            "Strong opportunistic instincts"
        ],

        challenges: [
            "Energy can spike and crash (burn/ cool cycle)",
            "Can become anxious or over-alert",
            "May chase attention instead of depth",
            "Difficulty resting—always scanning"
        ],

        lifeTheme: "Win with bright timing—be seen, be smart, and strike the moment"
    },

    // 14) Ding Chou (丁丑) - Yin Fire Ox
    '3-1': {
        stem: 3,
        branch: 1,
        name: "Yin Fire Ox",
        chineseName: "丁丑 (Dīng Chǒu)",

        essence:
            "The steady lantern. Refined insight meets endurance and duty. This pillar is quiet excellence—consistent light that outlasts trends.",

        howItWorks:
            "Yin Fire (lamp, detail, subtle influence) sits on Ox (Earth, persistence, responsibility). Earth can dampen fire, so your light strengthens through discipline, routine, and mastery. Ox gives stamina and seriousness—this becomes a patient mind that improves systems, maintains quality, and earns trust through consistency rather than spectacle.",

        asYear:
            "You came from an environment where reliability and doing things properly mattered. Early life emphasized responsibility, restraint, and earning respect. Others see you as composed, dependable, and quietly capable.",

        asMonth:
            "Your career engine thrives in craft and stewardship: teaching, design refinement, operations, healthcare, research, editorial, quality control, long-term client work. Prime years reward competence, patience, and sustained output.",

        asDay:
            "You ARE the steady light. Your identity is perceptive and refined, but grounded and responsible. In relationships you’re loyal and practical, showing care through consistency. Under pressure you tighten focus and keep going—sometimes suppressing your needs.",

        asHour:
            "Your legacy is built through mastery and care: work that remains valuable because it was maintained and refined. Later life emphasizes mentorship, teaching craft, and leaving behind standards of quality.",

        strengths: [
            "Reliable discipline and endurance",
            "Refined judgment and attention to detail",
            "Strong responsibility and trustworthiness",
            "Quiet influence through consistency"
        ],

        challenges: [
            "Can suppress emotions or needs",
            "May become overly cautious or rigid",
            "Perfectionism slows momentum",
            "Risk of feeling unrecognized"
        ],

        lifeTheme: "Quiet excellence: steady light, long mastery, earned trust"
    },

    // 15) Wu Yin (戊寅) - Yang Earth Tiger
    '4-2': {
        stem: 4,
        branch: 2,
        name: "Yang Earth Tiger",
        chineseName: "戊寅 (Wù Yín)",

        essence:
            "The commanding mountain on the march. Massive stability meets fearless initiative. This pillar is leadership with momentum—building big while moving forward.",

        howItWorks:
            "Yang Earth (mountain, containment, responsibility) sits on Tiger (Wood, drive, ambition). Wood challenges Earth by pushing upward and outward, so this combination learns to lead growth rather than resist it. Tiger supplies courage and expansion; Earth supplies structure and authority. When aligned, you build big and move decisively.",

        asYear:
            "You came from an environment that demanded strength, independence, or taking charge early. Early life emphasized resilience and carrying weight. Others see you as formidable, protective, and hard to intimidate.",

        asMonth:
            "Your career engine thrives in building and leading: management, entrepreneurship, infrastructure, real assets, strategy, operations, governance. Prime years reward you for taking responsibility and directing ambitious growth with structure.",

        asDay:
            "You ARE authoritative momentum. Your identity is grounded yet bold—you want results that last. In relationships you value loyalty and respect, and you can be intensely protective. Under pressure you become more commanding and decisive—sometimes too controlling.",

        asHour:
            "Your legacy is built through what you led into existence: organizations, assets, systems, or communities. Later life emphasizes stewardship, legacy planning, and teaching others how to build big without collapsing.",

        strengths: [
            "Strong leadership and executive presence",
            "Ability to build durable systems at scale",
            "Courage to take responsibility",
            "Long-horizon ambition with structure"
        ],

        challenges: [
            "Can become controlling when stressed",
            "Difficulty delegating or trusting others",
            "May resist change until forced",
            "Workaholic tendencies—carrying too much"
        ],

        lifeTheme: "Lead growth with structure—build big, endure, and protect what you create"
    },
    // 16) Ji Mao (己卯) - Yin Earth Rabbit
    '5-3': {
        stem: 5,
        branch: 3,
        name: "Yin Earth Rabbit",
        chineseName: "己卯 (Jǐ Mǎo)",

        essence:
            "The gentle builder. Practical earth meets diplomatic wood. This pillar is nurturing structure—creating stability through care, taste, and human understanding.",

        howItWorks:
            "Yin Earth (soil, support, pragmatism) sits on Rabbit (Wood, harmony, aesthetics). Wood challenges earth by pushing growth, but the Rabbit does it softly—through relationships and timing. This combination builds results through cultivation: improving environments, smoothing friction, and making systems livable. When balanced, it’s quietly powerful stewardship; when imbalanced, it’s over-accommodation.",

        asYear:
            "You came from an environment where harmony, manners, and stability were valued. Early life emphasized keeping the peace and taking care of practical needs. Others see you as kind, grounded, and socially aware.",

        asMonth:
            "Your career engine thrives where people + systems meet: operations, HR, client work, community building, design/brand stewardship, hospitality, education. Prime years reward your ability to stabilize teams and create functional harmony.",

        asDay:
            "You ARE supportive stability with sensitivity. Your identity is practical but relational—you want structure that feels good. In relationships you’re loyal, accommodating, and attentive to tone. Under pressure you try to fix the environment; watch the tendency to take on everyone’s needs.",

        asHour:
            "Your legacy is built through what you nurtured into working order: teams, homes, communities, processes, or long-term relationships. Later life emphasizes mentorship, caretaking leadership, and leaving behind stable spaces.",

        strengths: [
            "Practical support and steady reliability",
            "Strong diplomacy and emotional intelligence",
            "Creates harmony in groups and systems",
            "Nurtures long-term growth patiently"
        ],

        challenges: [
            "May overgive to maintain peace",
            "Difficulty asserting hard boundaries",
            "Can avoid direct conflict too long",
            "Risk of stagnation from excessive comfort"
        ],

        lifeTheme: "Build stability through care—make environments that help people thrive"
    },

    // 17) Geng Chen (庚辰) - Yang Metal Dragon
    '6-4': {
        stem: 6,
        branch: 4,
        name: "Yang Metal Dragon",
        chineseName: "庚辰 (Gēng Chén)",

        essence:
            "The armored reformer. Hard standards meet hidden depth and transformation. This pillar is power with strategy—cutting a new path while holding massive reserves.",

        howItWorks:
            "Yang Metal (blade, reform, truth via standards) sits on Dragon (Earth with hidden Water/Wood—storage, complexity, change). Earth supports metal, giving the blade a solid base; Dragon adds an underground reservoir—strategic depth and long-cycle timing. This is metal that doesn’t just cut; it redesigns structure, often after long observation.",

        asYear:
            "You came from an environment shaped by big structures—institutions, legacy, or heavy responsibilities. Early life emphasized toughness and competence. Others see you as formidable, strategic, and difficult to sway.",

        asMonth:
            "Your career engine thrives in systems reform: operations, restructuring, security, law, engineering, finance, governance, product strategy. Prime years reward you when you take on complex systems and improve them decisively.",

        asDay:
            "You ARE the strategic blade with depth. Your identity is direct, strong-willed, and standards-driven, but you’re also patient—waiting for the right moment. In relationships you value loyalty and respect; you won’t tolerate inconsistency. Under pressure you become more controlled and surgical.",

        asHour:
            "Your legacy is built through reforms and structures you improved—frameworks, institutions, methods, or durable assets. Later life emphasizes stewardship of power and teaching disciplined strategy.",

        strengths: [
            "Decisive standards and strong integrity",
            "Strategic depth and long-horizon timing",
            "Ability to reform complex systems",
            "Resilient under pressure"
        ],

        challenges: [
            "Can become rigid or overly controlling",
            "May intimidate others unintentionally",
            "Difficulty showing vulnerability",
            "Can hold onto battles too long"
        ],

        lifeTheme: "Reform with depth—hold power responsibly and cut what no longer works"
    },

    // 18) Xin Si (辛巳) - Yin Metal Snake
    '7-5': {
        stem: 7,
        branch: 5,
        name: "Yin Metal Snake",
        chineseName: "辛巳 (Xīn Sì)",

        essence:
            "The precision strategist. Refined metal meets penetrating fire. This pillar is elegant calculation—sharp discernment powered by focused intensity.",

        howItWorks:
            "Yin Metal (jewelry, refinement, discernment) sits on Snake (Fire, strategy, depth). Fire controls metal by heating it; in this combo the heat becomes polish—pressure that sharpens judgment. Snake adds focus, secrecy, and tactical intelligence. The result is a mind that sees fine distinctions, plays the long game, and wins through precision and timing.",

        asYear:
            "You came from an environment where appearances, strategy, or high standards mattered. Early life emphasized being careful, reading motives, and staying sharp. Others see you as composed, incisive, and hard to deceive.",

        asMonth:
            "Your career engine thrives in domains that reward discernment: finance, law, negotiation, research, security, design critique, branding, product strategy. Prime years reward you for making clean choices under complexity.",

        asDay:
            "You ARE refined discernment with heat. Your identity is selective, strategic, and privacy-protective. In relationships you want loyalty and competence; you may test for trust. Under pressure you become even more focused—and can become cutting if threatened.",

        asHour:
            "Your legacy is built through precision decisions and high-quality output—work that endures because it was chosen well. Later life emphasizes advisory influence, teaching discernment, and leaving behind standards.",

        strengths: [
            "Exceptional discernment and strategic focus",
            "Strong timing instincts and negotiation skill",
            "High-quality output and clean decision-making",
            "Composed under complexity"
        ],

        challenges: [
            "Can become overly suspicious or guarded",
            "May weaponize critique (too sharp)",
            "Perfectionism slows momentum",
            "Difficulty relaxing control"
        ],

        lifeTheme: "Win with precision—discern the signal, move at the right moment"
    },

    // 19) Ren Wu (壬午) - Yang Water Horse
    '8-6': {
        stem: 8,
        branch: 6,
        name: "Yang Water Horse",
        chineseName: "壬午 (Rén Wǔ)",

        essence:
            "The floodlighted current. Massive flow meets visible fire and movement. This pillar is high-speed impact—big energy that needs direction to avoid scattering.",

        howItWorks:
            "Yang Water (river/ocean, momentum, reach) sits on Horse (strong Fire, motion, expression). Fire challenges water through evaporation; water challenges fire through overwhelm—so this combination produces intensity and volatility. When directed, it becomes powerful leadership, storytelling, and momentum-building. When undirected, it can swing between surges and burnout.",

        asYear:
            "You came from an environment with intensity, movement, or strong personalities. Early life taught you to adapt fast and handle big emotional or social waves. Others see you as dynamic, bold, and hard to ignore.",

        asMonth:
            "Your career engine thrives in fast, visible arenas: leadership, media, sales, trading, travel, performance, startups. Prime years reward you when you harness momentum and manage energy deliberately.",

        asDay:
            "You ARE big flow with fire. Your identity is expressive, freedom-loving, and momentum-driven. In relationships you need honesty and space; you dislike stagnation. Under pressure you can surge—then crash—so pacing and containment are key.",

        asHour:
            "Your legacy is built through motion: projects, movements, networks, or messages that traveled far. Later life emphasizes channeling your force into mentorship, building platforms, or directing younger talent.",

        strengths: [
            "High energy and magnetic momentum",
            "Strong ability to move people and ideas",
            "Adaptable and fearless in dynamic environments",
            "Charisma + reach"
        ],

        challenges: [
            "Volatility: surges, overextension, burnout",
            "Can feel scattered without clear direction",
            "Difficulty with routine and containment",
            "May escalate conflict quickly"
        ],

        lifeTheme: "Harness the surge—direct big energy into lasting impact"
    },

    // 20) Gui Wei (癸未) - Yin Water Goat
    '9-7': {
        stem: 9,
        branch: 7,
        name: "Yin Water Goat",
        chineseName: "癸未 (Guǐ Wèi)",

        essence:
            "The gentle rain on a hillside. Subtle intuition meets nurturing earth. This pillar is emotional intelligence made practical—healing, supporting, and sustaining through care.",

        howItWorks:
            "Yin Water (mist/rain, nuance, intuition) sits on Goat (Earth, care, cultivation). Earth can contain water, so feelings become structured: empathy applied in useful ways. Goat adds warmth, artistry, and responsibility—this is water that comforts and improves environments. When balanced, it’s calm healing presence; when imbalanced, it’s worry and emotional absorption.",

        asYear:
            "You came from an environment where care, sensitivity, or family responsibility mattered. Early life emphasized support and emotional awareness. Others see you as gentle, thoughtful, and trustworthy.",

        asMonth:
            "Your career engine thrives in supportive and human-centered roles: counseling, teaching, design, community work, healthcare, hospitality, client stewardship. Prime years reward you for creating stability and psychological safety.",

        asDay:
            "You ARE intuitive care. Your identity is sensitive, perceptive, and service-oriented, with a strong need for emotional steadiness. In relationships you’re loyal and nurturing; boundaries matter. Under pressure you may worry—your best move is grounding the feeling into action.",

        asHour:
            "Your legacy is built through what you nurtured: people, teams, families, communities, or creations that made life gentler. Later life emphasizes mentorship, healing, and leaving behind stable support structures.",

        strengths: [
            "Strong empathy and intuitive perception",
            "Practical support and steady care",
            "Creates calm, safe environments",
            "Good taste and gentle influence"
        ],

        challenges: [
            "Can absorb others’ emotions and overgive",
            "Worry loops / rumination",
            "Difficulty asserting boundaries",
            "May avoid necessary confrontation"
        ],

        lifeTheme: "Turn sensitivity into stewardship—heal through grounded care"
    },

    // 21) Jia Shen (甲申) - Yang Wood Monkey
    '0-8': {
        stem: 0,
        branch: 8,
        name: "Yang Wood Monkey",
        chineseName: "甲申 (Jiǎ Shēn)",

        essence:
            "The inventive strategist. Upright growth meets sharp systems thinking. This pillar is directional intelligence—building momentum through clever structure and timing.",

        howItWorks:
            "Yang Wood (initiative, leadership, principle) sits on Monkey (Metal, strategy, tools). Metal challenges Wood by cutting and refining it, forcing clarity and efficiency. Monkey adds cleverness and modular thinking—growth here comes by learning systems, leveraging tools, and choosing angles wisely rather than pushing blindly.",

        asYear:
            "You came from an environment that rewarded cleverness and adaptability. Early life emphasized learning how systems work and how to maneuver within them. Others see you as smart, capable, and forward-thinking.",

        asMonth:
            "Your career engine thrives in strategic domains: tech, consulting, product, engineering, operations, trading, design systems. Prime years reward you for leading growth through intelligence and structure.",

        asDay:
            "You ARE strategic growth. Your identity is principled but flexible—you want progress that makes sense. In relationships you value intelligence and competence. Under pressure you analyze, reframe, and move tactically.",

        asHour:
            "Your legacy is built through ideas and systems that enabled others to grow efficiently. Later life emphasizes mentorship, platform-building, and teaching strategic thinking.",

        strengths: [
            "Strong systems intelligence",
            "Strategic adaptability",
            "Ability to lead growth through structure",
            "Quick learning and problem-solving"
        ],

        challenges: [
            "Can over-intellectualize instead of acting",
            "May appear calculating or distant",
            "Difficulty tolerating inefficiency",
            "Risk of changing direction too often"
        ],

        lifeTheme: "Grow intelligently—lead with structure, timing, and insight"
    },

    // 22) Yi You (乙酉) - Yin Wood Rooster
    '1-9': {
        stem: 1,
        branch: 9,
        name: "Yin Wood Rooster",
        chineseName: "乙酉 (Yǐ Yǒu)",

        essence:
            "The cultivated editor. Adaptive growth meets precision and critique. This pillar is refinement through feedback—improving life by pruning wisely.",

        howItWorks:
            "Yin Wood (vine, adaptation, finesse) sits on Rooster (Metal, precision, judgment). Metal cuts wood, forcing selectivity and refinement. Rooster sharpens perception, teaching the vine where to grow and where to let go. Progress comes through iteration, critique, and continuous improvement.",

        asYear:
            "You came from an environment where correctness, feedback, or standards mattered. Early life emphasized improvement and attention to detail. Others see you as thoughtful, precise, and discerning.",

        asMonth:
            "Your career engine thrives in roles involving refinement: editing, QA, research, design critique, analysis, product iteration, education. Prime years reward your ability to improve quality steadily.",

        asDay:
            "You ARE adaptive refinement. Your identity is sensitive yet selective—you grow by learning what to cut. In relationships you value honesty and competence. Under pressure you become more analytical and self-correcting.",

        asHour:
            "Your legacy is built through improvements you made—systems clarified, work refined, standards elevated. Later life emphasizes teaching discernment and thoughtful iteration.",

        strengths: [
            "Strong discernment and refinement skills",
            "Ability to learn from feedback",
            "Improves quality over time",
            "Balances adaptability with standards"
        ],

        challenges: [
            "Can become overly self-critical",
            "May prune too aggressively",
            "Sensitivity to judgment",
            "Risk of perfectionism"
        ],

        lifeTheme: "Refine growth—prune wisely to let quality flourish"
    },

    // 23) Bing Xu (丙戌) - Yang Fire Dog
    '2-10': {
        stem: 2,
        branch: 10,
        name: "Yang Fire Dog",
        chineseName: "丙戌 (Bǐng Xū)",

        essence:
            "The vigilant beacon. Radiant purpose meets loyal protection. This pillar is principled leadership—standing watch and lighting the way.",

        howItWorks:
            "Yang Fire (sun, inspiration, visibility) sits on Dog (Earth with hidden Fire/Metal—duty, judgment). Fire is reinforced by the Dog’s hidden flame, while Earth grounds expression in responsibility. This creates leadership driven by values: visibility tied to protection and moral clarity.",

        asYear:
            "You came from an environment shaped by duty, loyalty, or defending what’s right. Early life emphasized standing up for values. Others see you as warm, principled, and dependable.",

        asMonth:
            "Your career engine thrives in values-driven leadership: management, coaching, advocacy, security, education, public service. Prime years reward you for leading visibly with integrity.",

        asDay:
            "You ARE principled fire. Your identity is expressive and value-oriented. In relationships you’re loyal and protective. Under pressure you become firm and morally decisive.",

        asHour:
            "Your legacy is built through guidance and protection—causes you defended, people you mentored, values you upheld. Later life emphasizes stewardship and ethical leadership.",

        strengths: [
            "Warm, principled leadership",
            "Strong loyalty and protection",
            "Inspires trust through values",
            "Reliable under pressure"
        ],

        challenges: [
            "Can become moralistic or rigid",
            "May carry responsibility too personally",
            "Difficulty disengaging from conflict",
            "Risk of burnout from constant vigilance"
        ],

        lifeTheme: "Lead with warmth and principle—protect what you illuminate"
    },

    // 24) Ding Hai (丁亥) - Yin Fire Pig
    '3-11': {
        stem: 3,
        branch: 11,
        name: "Yin Fire Pig",
        chineseName: "丁亥 (Dīng Hài)",

        essence:
            "The gentle lantern in deep water. Refined insight meets compassion and imagination. This pillar is subtle illumination—healing through understanding.",

        howItWorks:
            "Yin Fire (lamp, sensitivity, perception) sits on Pig (Water, depth, openness). Water challenges fire by softening it, turning brightness into subtle glow. Pig adds empathy and spiritual depth—this combination illuminates through listening, imagination, and emotional intelligence.",

        asYear:
            "You came from an environment rich in feeling, imagination, or compassion. Early life emphasized sensitivity and understanding. Others see you as gentle, intuitive, and thoughtful.",

        asMonth:
            "Your career engine thrives in empathetic domains: counseling, writing, art, healing, education, spiritual or creative work. Prime years reward your ability to bring clarity to emotional depth.",

        asDay:
            "You ARE subtle illumination. Your identity is perceptive and caring, with strong intuition. In relationships you value emotional honesty and safety. Under pressure you retreat inward to process and restore clarity.",

        asHour:
            "Your legacy is built through the understanding you offered—ideas, art, or care that helped others see more gently. Later life emphasizes teaching, healing, and creative transmission.",

        strengths: [
            "Deep emotional and intuitive intelligence",
            "Gentle clarity and insight",
            "Strong imagination and creativity",
            "Creates safe emotional space"
        ],

        challenges: [
            "Can become emotionally overwhelmed",
            "Difficulty asserting boundaries",
            "May avoid harsh realities",
            "Energy can dissipate without structure"
        ],

        lifeTheme: "Illuminate gently—heal and inspire through understanding"
    },

    // 25) Wu Zi (戊子) - Yang Earth Rat
    '4-0': {
        stem: 4,
        branch: 0,
        name: "Yang Earth Rat",
        chineseName: "戊子 (Wù Zǐ)",

        essence:
            "The levee on fast water. Massive stability meets strategic flow. This pillar is containment with intelligence—holding power while navigating change.",

        howItWorks:
            "Yang Earth (mountain, containment, responsibility) sits on Rat (Water, strategy, opportunity). Water challenges earth by eroding it, teaching the mountain to channel rather than block flow. Rat adds tactical intelligence—success comes from directing movement, managing resources, and building structures that work with change.",

        asYear:
            "You came from an environment that required resilience and strategic thinking. Early life emphasized managing instability and protecting resources. Others see you as solid, thoughtful, and hard to destabilize.",

        asMonth:
            "Your career engine thrives in risk management and systems control: finance, operations, infrastructure, logistics, governance, strategy. Prime years reward you for channeling volatility into stable outcomes.",

        asDay:
            "You ARE intelligent containment. Your identity is grounded and responsible, but mentally agile. In relationships you value security and trust. Under pressure you focus on control, planning, and resource management.",

        asHour:
            "Your legacy is built through structures that held against chaos—systems, assets, policies, or organizations that stabilized movement. Later life emphasizes stewardship and teaching strategic containment.",

        strengths: [
            "Strong stability under uncertainty",
            "Strategic resource management",
            "Ability to channel volatility",
            "Long-term resilience"
        ],

        challenges: [
            "Can become overly controlling",
            "Difficulty relaxing vigilance",
            "May suppress emotion to maintain order",
            "Risk of rigidity under stress"
        ],

        lifeTheme: "Stabilize the flow—contain change through intelligent structure"
    },


    // 26) Ji Chou (己丑) - Yin Earth Ox
    '5-1': {
        stem: 5,
        branch: 1,
        name: "Yin Earth Ox",
        chineseName: "己丑 (Jǐ Chǒu)",

        essence:
            "The patient builder of real things. Refined earth meets disciplined endurance. This pillar is steady consolidation—turning effort into durable security.",

        howItWorks:
            "Yin Earth (soil, pragmatism, cultivation) sits on Ox (Earth, duty, persistence). Earth-on-Earth reinforces stability: you naturally focus on what’s workable, sustainable, and repeatable. The Ox adds long-range stamina and responsibility—results come through routine, containment, and gradual compounding rather than sudden leaps.",

        asYear:
            "You came from an environment that emphasized responsibility, work ethic, or practical stability. Early life taught you to be reliable and to earn outcomes. Others experience you as grounded, steady, and difficult to shake.",

        asMonth:
            "Your career engine thrives in operations, stewardship, finance, infrastructure, craft, and any role requiring consistency. Prime years reward you for system maintenance, dependable execution, and building stable platforms.",

        asDay:
            "You ARE structured endurance. Your identity is practical, patient, and quietly ambitious. In relationships you show love through reliability and follow-through. Under pressure you become even more disciplined—sometimes to the point of emotional suppression.",

        asHour:
            "Your legacy is what you maintained and made real: assets, institutions, family stability, or methods that outlast trends. Later life favors mentorship, stewardship, and teaching others how to build slowly and win permanently.",

        strengths: [
            "Exceptional endurance and discipline",
            "Practical execution and reliability",
            "Strong containment and long-term thinking",
            "Builds durable security over time"
        ],

        challenges: [
            "Can be overly cautious or slow to pivot",
            "May over-identify with duty and responsibility",
            "Difficulty expressing emotional needs",
            "Can become rigid once committed"
        ],

        lifeTheme: "Consolidate and compound—build what lasts through discipline and care"
    },

    // 27) Geng Yin (庚寅) - Yang Metal Tiger
    '6-2': {
        stem: 6,
        branch: 2,
        name: "Yang Metal Tiger",
        chineseName: "庚寅 (Gēng Yín)",

        essence:
            "The warrior-reformer. Hard standards meet fearless momentum. This pillar is decisive correction—bold action guided by uncompromising truth.",

        howItWorks:
            "Yang Metal (blade, standards, reform) sits on Tiger (Wood, drive, ambition). Wood challenges metal by pushing growth and expansion; metal challenges wood by cutting what’s inefficient or false. The result is powerful will: you move forward aggressively, but with a strong impulse to correct, enforce, and refine as you go.",

        asYear:
            "You came from an environment that demanded strength, courage, or self-reliance. Early life may have rewarded toughness and directness. Others see you as bold, intense, and hard to intimidate.",

        asMonth:
            "Your career engine thrives in high-stakes execution: turnarounds, leadership, enforcement, restructuring, crisis operations, entrepreneurship, competitive arenas. Prime years reward decisive action and standards-driven leadership.",

        asDay:
            "You ARE forward-driving reform. Your identity is principled, direct, and unwilling to tolerate incompetence. In relationships you respect strength and honesty. Under pressure you can become cutting or combative—best used as surgical clarity, not constant conflict.",

        asHour:
            "Your legacy is built through battles you fought well: reforms, organizations corrected, systems upgraded, standards established. Later life emphasizes mentoring others in courage, discipline, and clean decision-making.",

        strengths: [
            "Decisive, courageous leadership",
            "Strong integrity and standards",
            "High drive and competitive force",
            "Ability to correct failing systems"
        ],

        challenges: [
            "Can become overly harsh or confrontational",
            "Impatience with slower people/systems",
            "Risk of burnout from constant intensity",
            "Difficulty softening or compromising"
        ],

        lifeTheme: "Move forward with standards—reform through courage and clean cuts"
    },

    // 28) Xin Mao (辛卯) - Yin Metal Rabbit
    '7-3': {
        stem: 7,
        branch: 3,
        name: "Yin Metal Rabbit",
        chineseName: "辛卯 (Xīn Mǎo)",

        essence:
            "The elegant blade. Refined discernment meets diplomatic artistry. This pillar is soft precision—high standards expressed through grace, taste, and timing.",

        howItWorks:
            "Yin Metal (jewelry, refinement, discernment) sits on Rabbit (Wood, harmony, aesthetics). Wood can clash with metal (metal cuts wood), but Rabbit’s style is subtle: instead of blunt cutting, you prune with finesse. This combination excels at tasteful critique, aesthetic judgment, and improving quality without creating unnecessary conflict.",

        asYear:
            "You came from an environment that valued manners, aesthetics, or social intelligence. Early life emphasized presentation, propriety, and reading people. Others perceive you as classy, composed, and quietly strong.",

        asMonth:
            "Your career engine thrives in curation and refinement: design, branding, editorial, product polish, client work, law/negotiation, hospitality, quality-driven leadership. Prime years reward you for elevating standards with tact.",

        asDay:
            "You ARE refined taste with boundaries. Your identity is selective and perceptive; you notice what’s off immediately. In relationships you need respect and steadiness. Under pressure you can become cool or withdrawn—your best move is clear standards delivered gently.",

        asHour:
            "Your legacy is built through beauty and correctness: work that endures because it was done with taste and precision. Later life emphasizes mentorship in discernment, ethics, and craft.",

        strengths: [
            "Excellent taste and discernment",
            "Diplomatic critique and refinement skill",
            "Strong boundary awareness without harshness",
            "Improves quality in people and systems"
        ],

        challenges: [
            "Can become overly picky or hard to please",
            "May avoid direct conflict until it stacks",
            "Sensitivity to disrespect or low standards",
            "Risk of appearing distant or cold"
        ],

        lifeTheme: "Refine with grace—hold standards without losing harmony"
    },

    // 29) Ren Chen (壬辰) - Yang Water Dragon
    '8-4': {
        stem: 8,
        branch: 4,
        name: "Yang Water Dragon",
        chineseName: "壬辰 (Rén Chén)",

        essence:
            "The deep reservoir in motion. Massive flow meets hidden power and transformation. This pillar is strategic magnitude—quietly storing force, then moving at the right moment.",

        howItWorks:
            "Yang Water (river/ocean, reach, momentum) sits on Dragon (Earth with hidden Water/Wood—storage, change, latent power). Dragon acts like a dam-and-vault: it holds complexity and reserves beneath the surface. This produces water with timing—less constant rushing, more strategic release, reinvention cycles, and long-horizon influence.",

        asYear:
            "You came from an environment shaped by complex forces—family legacy, institutions, or major transitions. Early life taught you to read depth and manage power. Others sense intensity under your calm.",

        asMonth:
            "Your career engine thrives in big systems: finance, strategy, macro, infrastructure, data platforms, governance, security, restructuring. Prime years reward you for managing complexity and moving capital/information with timing.",

        asDay:
            "You ARE controlled magnitude. Your identity is strong, adaptable, and difficult to predict—because you’re always storing information. In relationships you value loyalty and depth. Under pressure you become even more strategic: less talk, more timing.",

        asHour:
            "Your legacy is built through systems and moves that changed outcomes at scale—platforms, capital structures, institutions, or frameworks. Later life emphasizes stewardship of influence and teaching timing mastery.",

        strengths: [
            "Strategic depth and long-horizon timing",
            "Strong capacity to hold complexity",
            "Influence that operates at scale",
            "Resilient through change cycles"
        ],

        challenges: [
            "Can become secretive or emotionally guarded",
            "May wait too long to release momentum",
            "Risk of control issues under stress",
            "Difficulty being understood by others"
        ],

        lifeTheme: "Store power, then move—master timing to reshape systems"
    },

    // 30) Gui Si (癸巳) - Yin Water Snake
    '9-5': {
        stem: 9,
        branch: 5,
        name: "Yin Water Snake",
        chineseName: "癸巳 (Guǐ Sì)",

        essence:
            "The hidden analyst. Subtle intuition meets focused strategic fire. This pillar is quiet leverage—insight sharpened into precision and influence.",

        howItWorks:
            "Yin Water (mist, nuance, intuition) sits on Snake (Fire, strategy, depth). Fire challenges water through heat—forcing clarity, selection, and sharper edges. Snake adds secrecy, patience, and tactical intelligence. The result is perception that becomes actionable: you sense motives, map systems, and win through timing and precision.",

        asYear:
            "You came from an environment where reading between the lines mattered. Early life emphasized discretion, pattern recognition, or staying alert. Others see you as perceptive, composed, and hard to fool.",

        asMonth:
            "Your career engine thrives in domains where subtle advantage wins: research, intelligence, finance, negotiation, design critique, security, product strategy, medicine/law. Prime years reward your ability to see the hidden lever.",

        asDay:
            "You ARE intuitive precision. Your identity is subtle, strategic, and privacy-protective. In relationships you need trust, loyalty, and competence. Under pressure you become more focused and selective—watch the tendency toward suspicion.",

        asHour:
            "Your legacy is built through methods and decisions that outthought the obvious—quiet systems, investments, or teachings that compound. Later life emphasizes advisory influence and teaching discernment.",

        strengths: [
            "Strong intuition + strategic intelligence",
            "Excellent timing and leverage instincts",
            "Composed under complexity",
            "High precision in decisions"
        ],

        challenges: [
            "Can become overly guarded or suspicious",
            "May overthink and delay action",
            "Risk of emotional distance",
            "Can weaponize subtle critique"
        ],

        lifeTheme: "Quiet leverage—sense the truth, sharpen the move, strike with timing"
    },

    // 31) Jia Wu (甲午) - Yang Wood Horse
    '0-6': {
        stem: 0,
        branch: 6,
        name: "Yang Wood Horse",
        chineseName: "甲午 (Jiǎ Wǔ)",

        essence:
            "The banner in motion. Upright growth meets fire-driven independence. This pillar is pioneering leadership—moving fast with purpose and bold direction.",

        howItWorks:
            "Yang Wood (initiative, principle, leadership) sits on Horse (strong Fire, movement, expression). Wood feeds Fire, so your direction naturally creates momentum and visibility. The Horse adds speed and freedom—this is growth that prefers open roads: expansion through action, risk, and forward motion.",

        asYear:
            "You came from an environment that encouraged independence, boldness, or standing out. Early life emphasized moving forward and being strong. Others see you as energetic, confident, and direct.",

        asMonth:
            "Your career engine thrives in leadership, entrepreneurship, sales, evangelism, performance, travel, and building momentum around a mission. Prime years reward decisive action and inspiring forward movement.",

        asDay:
            "You ARE directional firepower. Your identity is principled and growth-oriented, but impatient with stagnation. In relationships you need honesty and room to move. Under pressure you push forward—best when you also pace yourself.",

        asHour:
            "Your legacy is built through what you started and mobilized—teams, ventures, movements, or platforms that gained speed. Later life emphasizes mentorship, leadership-by-example, and passing the torch.",

        strengths: [
            "Strong initiative and leadership",
            "High energy and momentum-building ability",
            "Clear direction and mission focus",
            "Inspires others through action"
        ],

        challenges: [
            "Impatience and restlessness",
            "Can burn out from constant motion",
            "Difficulty with routine and containment",
            "May push too hard when stressed"
        ],

        lifeTheme: "Lead in motion—build momentum around a clear mission"
    },

    // 32) Yi Wei (乙未) - Yin Wood Goat
    '1-7': {
        stem: 1,
        branch: 7,
        name: "Yin Wood Goat",
        chineseName: "乙未 (Yǐ Wèi)",

        essence:
            "The garden cultivator. Gentle growth meets nurturing earth and artistry. This pillar is soft mastery—creating beauty and stability through care.",

        howItWorks:
            "Yin Wood (vine, adaptability, relational intelligence) sits on Goat (Earth, care, cultivation). Earth can slow wood, but Goat supports growth through nourishment and steadiness. This creates a builder of environments: progress through consistency, taste, and emotional intelligence rather than force.",

        asYear:
            "You came from an environment where care, harmony, or aesthetics mattered. Early life emphasized sensitivity and steady support. Others see you as kind, tasteful, and quietly resilient.",

        asMonth:
            "Your career engine thrives in design, community, education, counseling, hospitality, client stewardship, and roles where people and environments need cultivation. Prime years reward you for making things livable and beautiful.",

        asDay:
            "You ARE gentle growth with backbone. Your identity is adaptive and relational, but you value stability. In relationships you’re loyal and nurturing; boundaries matter. Under pressure you may overgive—best to ground your care into clear structure.",

        asHour:
            "Your legacy is what you nurtured into thriving—people, teams, homes, communities, or a body of work with warmth. Later life emphasizes mentorship and stewarding culture.",

        strengths: [
            "Strong empathy and relational intelligence",
            "Creates supportive, stable environments",
            "Good taste and gentle influence",
            "Patient, consistent cultivation"
        ],

        challenges: [
            "Boundary issues—overgiving or absorbing others",
            "Can avoid conflict too long",
            "May drift without external structure",
            "Risk of stagnation from excessive comfort"
        ],

        lifeTheme: "Cultivate what thrives—build stability through care and taste"
    },

    // 33) Bing Shen (丙申) - Yang Fire Monkey
    '2-8': {
        stem: 2,
        branch: 8,
        name: "Yang Fire Monkey",
        chineseName: "丙申 (Bǐng Shēn)",

        essence:
            "The charismatic tactician. Radiant fire meets clever systems. This pillar is persuasive momentum—winning through visibility, intelligence, and timing.",

        howItWorks:
            "Yang Fire (sun/torch, inspiration, presence) sits on Monkey (Metal, tools, strategy). Metal challenges fire by demanding structure and precision; fire energizes metal by giving it purpose and motion. Monkey makes the fire tactical—charisma plus systems thinking: you sell ideas, launch moves, and use tools/networks to amplify reach.",

        asYear:
            "You came from an environment where quick thinking and adaptability were rewarded. Early life emphasized learning how things work and how to maneuver. Others see you as bright, witty, and effective.",

        asMonth:
            "Your career engine thrives in fast, strategic arenas: startups, product, media, sales, trading, consulting, ops strategy. Prime years reward you for combining persuasion with systems execution.",

        asDay:
            "You ARE tactical charisma. Your identity is expressive, confident, and mentally agile. In relationships you need stimulation and respect; boredom kills interest. Under pressure you become even more strategic—watch the urge to over-optimize or manipulate.",

        asHour:
            "Your legacy is built through platforms and launches—ideas that spread, systems that scale, networks that compound. Later life emphasizes mentorship in strategy, persuasion, and leverage.",

        strengths: [
            "Charisma + sharp systems thinking",
            "Fast learning and strategic adaptability",
            "Strong persuasion and launch energy",
            "Builds leverage through tools/networks"
        ],

        challenges: [
            "Can become restless or scattered",
            "May prioritize cleverness over depth",
            "Risk of being seen as slippery or too tactical",
            "Difficulty slowing down for intimacy"
        ],

        lifeTheme: "Make it spread—pair visibility with strategy to build leverage"
    },

    // 34) Ding You (丁酉) - Yin Fire Rooster
    '3-9': {
        stem: 3,
        branch: 9,
        name: "Yin Fire Rooster",
        chineseName: "丁酉 (Dīng Yǒu)",

        essence:
            "The polished lantern. Refined insight meets precision and standards. This pillar is elegant clarity—light that edits, corrects, and improves quality.",

        howItWorks:
            "Yin Fire (lamp, subtle perception, refinement) sits on Rooster (Metal, precision, discernment). Metal supports structure but can feel cold; the lamp brings warmth and meaning to critique. This produces a gifted editor: you see what’s off, name it cleanly, and refine it into something better—when balanced, it’s tasteful mastery; when imbalanced, it’s anxious perfectionism.",

        asYear:
            "You came from an environment that valued correctness, presentation, or sharp standards. Early life emphasized improving, polishing, and noticing details. Others see you as composed, observant, and discerning.",

        asMonth:
            "Your career engine thrives in refinement roles: editing, design critique, QA, research, medicine, law, analytics, product polish. Prime years reward your ability to elevate quality and clarity.",

        asDay:
            "You ARE refined illumination. Your identity is perceptive and selective; you notice subtleties others miss. In relationships you value honesty and competence, but you’re sensitive to flaws. Under pressure you may become overly critical—best to prioritize the few changes that matter most.",

        asHour:
            "Your legacy is built through what you clarified and improved—work that lasts because it was refined. Later life emphasizes teaching standards, discernment, and clean craft.",

        strengths: [
            "Strong discernment and detail perception",
            "Excellent refinement and quality control",
            "Clear articulation and tasteful critique",
            "Turns mess into coherent form"
        ],

        challenges: [
            "Perfectionism and anxiety loops",
            "Over-critique (self or others)",
            "Can intellectualize emotions",
            "May over-polish instead of shipping"
        ],

        lifeTheme: "Polish what matters—refine truth into elegant, usable form"
    },

    // 35) Wu Xu (戊戌) - Yang Earth Dog
    '4-10': {
        stem: 4,
        branch: 10,
        name: "Yang Earth Dog",
        chineseName: "戊戌 (Wù Xū)",

        essence:
            "The fortress of values. Massive earth meets loyal duty and judgment. This pillar is protective stability—holding the line and building what’s right.",

        howItWorks:
            "Yang Earth (mountain, containment, authority) sits on Dog (Earth with hidden Fire/Metal—duty, conviction, standards). Earth reinforces earth: powerful stability and seriousness. The Dog adds moral fire and metal judgment—this becomes a guardian-builder: you create structure, then defend it with principle.",

        asYear:
            "You came from an environment shaped by duty, loyalty, or strong moral expectations. Early life emphasized responsibility and protection. Others perceive you as solid, serious, and trustworthy.",

        asMonth:
            "Your career engine thrives in stewardship and enforcement: leadership, governance, compliance, security, operations, infrastructure, coaching. Prime years reward you for building durable systems and holding standards.",

        asDay:
            "You ARE principled stability. Your identity is grounded and protective; you don’t move unless it’s justified. In relationships you value loyalty and respect. Under pressure you become more firm and controlling—best when you stay fair, not rigid.",

        asHour:
            "Your legacy is built through what you protected and stabilized—family, community, institutions, assets, or ethical codes. Later life emphasizes mentorship, stewardship, and leaving behind a clear line others can follow.",

        strengths: [
            "Exceptional stability and reliability",
            "Strong loyalty and protective leadership",
            "Clear standards and moral backbone",
            "Builds durable structures"
        ],

        challenges: [
            "Can become rigid or judgmental",
            "May carry burdens alone",
            "Difficulty showing vulnerability",
            "Can hold grudges when trust breaks"
        ],

        lifeTheme: "Hold the line—build stability, protect values, lead with fairness"
    },

    // 36) Ji Hai (己亥) - Yin Earth Pig
    '5-11': {
        stem: 5,
        branch: 11,
        name: "Yin Earth Pig",
        chineseName: "己亥 (Jǐ Hài)",

        essence:
            "The gentle ground over deep water. Practical care meets vast feeling and intuition. This pillar is nurturing stability—support that heals and grows quietly.",

        howItWorks:
            "Yin Earth (soil, support, pragmatism) sits on Pig (Water, depth, openness). Water nourishes wood, but here it meets earth first—so emotions and intuition want structure and safety. Pig adds generosity and spiritual depth; Yin Earth turns that softness into usable support: steady care, practical compassion, and patient cultivation. When balanced, it’s healing stewardship; when imbalanced, it’s overgiving and worry.",

        asYear:
            "You came from an environment where care, sensitivity, or emotional tides were present. Early life may have taught you to support others or carry quiet responsibility. Others see you as gentle, grounded, and trustworthy.",

        asMonth:
            "Your career engine thrives where care becomes systems: counseling, healthcare, education, hospitality, community work, client stewardship, design of supportive environments. Prime years reward you for stabilizing people and processes.",

        asDay:
            "You ARE practical compassion. Your identity is steady, receptive, and protective of emotional safety. In relationships you’re loyal and nurturing, but you need boundaries. Under pressure you may absorb too much—your power is grounding feelings into action.",

        asHour:
            "Your legacy is built through what you nurtured into stability—people, families, teams, or communities that felt safer because of you. Later life emphasizes mentorship, healing roles, and creating lasting support structures.",

        strengths: [
            "Grounded empathy and emotional intelligence",
            "Creates stability and psychological safety",
            "Patient, reliable support",
            "Strong intuitive sense for what people need"
        ],

        challenges: [
            "Overgiving or absorbing others’ burdens",
            "Worry loops / rumination",
            "Difficulty asserting boundaries",
            "Can drift without clear structure"
        ],

        lifeTheme: "Heal through stability—turn compassion into grounded stewardship"
    },

    // 37) Geng Zi (庚子) - Yang Metal Rat
    '6-0': {
        stem: 6,
        branch: 0,
        name: "Yang Metal Rat",
        chineseName: "庚子 (Gēng Zǐ)",

        essence:
            "The strategic blade on fast water. Hard standards meet cunning timing. This pillar is surgical advantage—cutting through noise with intelligence and speed.",

        howItWorks:
            "Yang Metal (blade, reform, standards) sits on Rat (Water, strategy, hidden opportunity). Metal generates water, so structure fuels flow—your standards become leverage, and your thinking becomes faster under pressure. Rat adds tactical timing: you win by moving early, using information, and making precise corrections rather than dramatic displays.",

        asYear:
            "You came from an environment where sharp thinking and survival intelligence mattered. Early life emphasized reading systems and making smart moves. Others see you as decisive, perceptive, and hard to outmaneuver.",

        asMonth:
            "Your career engine thrives in strategy and high-signal domains: finance, trading, security, law, ops, product strategy, engineering, negotiation. Prime years reward you for precision decisions and early positioning.",

        asDay:
            "You ARE tactical standards. Your identity is direct, clear, and mentally agile. In relationships you value honesty and competence; you dislike ambiguity. Under pressure you get sharper and faster—watch the tendency to become cutting or overly controlling.",

        asHour:
            "Your legacy is built through reforms and decisions that changed outcomes—systems improved, risks managed, and advantages created through timing. Later life emphasizes teaching strategy, standards, and clean execution.",

        strengths: [
            "Sharp strategic mind and timing",
            "Decisive standards and integrity",
            "Ability to cut through complexity",
            "Strong crisis competence"
        ],

        challenges: [
            "Can become suspicious or overly guarded",
            "May over-optimize and miss human nuance",
            "Bluntness can alienate allies",
            "Difficulty relaxing vigilance"
        ],

        lifeTheme: "Win by precision and timing—cut the noise, move early, reform cleanly"
    },

    // 38) Xin Chou (辛丑) - Yin Metal Ox
    '7-1': {
        stem: 7,
        branch: 1,
        name: "Yin Metal Ox",
        chineseName: "辛丑 (Xīn Chǒu)",

        essence:
            "The enduring jewel. Refined standards meet disciplined endurance. This pillar is quiet excellence—quality built through patience, consistency, and self-respect.",

        howItWorks:
            "Yin Metal (jewelry, refinement, discernment) sits on Ox (Earth, persistence, duty). Earth supports metal by providing ore and stability, making refinement sustainable. Ox adds seriousness and stamina—this becomes craftsmanship over time: careful choices, steady improvement, and reputation built through reliability and standards.",

        asYear:
            "You came from an environment that valued propriety, responsibility, and doing things correctly. Early life emphasized discipline and earning respect. Others see you as composed, selective, and solid.",

        asMonth:
            "Your career engine thrives in quality-driven and trust-based roles: finance, curation, law, design, editorial, operations, product polish, stewardship. Prime years reward consistency and clean standards.",

        asDay:
            "You ARE refined endurance. Your identity is precise, steady, and boundary-aware. In relationships you prefer reliability and respect over intensity. Under pressure you become even more selective—sometimes withdrawing rather than negotiating standards.",

        asHour:
            "Your legacy is built through work that lasts because it was done well—craft, systems, assets, and standards you upheld. Later life emphasizes mentorship in excellence, ethics, and long-term quality.",

        strengths: [
            "Strong discernment and taste",
            "Exceptional reliability and stamina",
            "Builds trust through consistency",
            "High-quality output over time"
        ],

        challenges: [
            "Can be too rigid or hard to please",
            "May suppress emotions for stability",
            "Slow to pivot once committed",
            "Risk of isolation when disappointed"
        ],

        lifeTheme: "Quiet excellence endures—build quality patiently, uphold standards, earn trust"
    },

    // 39) Ren Yin (壬寅) - Yang Water Tiger
    '8-2': {
        stem: 8,
        branch: 2,
        name: "Yang Water Tiger",
        chineseName: "壬寅 (Rén Yín)",

        essence:
            "The storm on the frontier. Massive flow meets fearless drive. This pillar is bold expansion—big momentum that wants new terrain.",

        howItWorks:
            "Yang Water (river/ocean, momentum, reach) sits on Tiger (Wood, ambition, exploration). Water nourishes wood, powering growth and daring—your energy naturally expands into new spaces. Tiger adds courage and initiation, making the flow assertive and pioneering. When balanced, it’s unstoppable growth; when imbalanced, it’s restless volatility.",

        asYear:
            "You came from an environment that encouraged independence, risk, or strong will. Early life may have involved movement or needing to be brave. Others see you as dynamic, adventurous, and forceful.",

        asMonth:
            "Your career engine thrives in expansion arenas: entrepreneurship, leadership, sales, trading, media, exploration, new markets, frontier tech. Prime years reward you for taking bold initiative and riding momentum early.",

        asDay:
            "You ARE expanding force. Your identity is freedom-loving, ambitious, and momentum-driven. In relationships you need honesty and room to breathe. Under pressure you surge—best when you add pacing and a clear channel for your energy.",

        asHour:
            "Your legacy is built through ventures and movements that opened new territory—platforms, networks, or missions that spread widely. Later life emphasizes mentorship and directing big energy into sustainable structures.",

        strengths: [
            "Powerful momentum and courage",
            "Fast expansion and opportunity instincts",
            "Strong leadership in dynamic environments",
            "Resilience and adaptability"
        ],

        challenges: [
            "Restlessness and impatience",
            "Overextension / burnout risk",
            "Difficulty with routine and containment",
            "Can escalate conflict quickly"
        ],

        lifeTheme: "Expand with courage—ride momentum into new territory, but build a channel"
    },

    // 40) Gui Mao (癸卯) - Yin Water Rabbit
    '9-3': {
        stem: 9,
        branch: 3,
        name: "Yin Water Rabbit",
        chineseName: "癸卯 (Guǐ Mǎo)",

        essence:
            "The mist in the garden. Subtle intuition meets diplomacy and beauty. This pillar is soft influence—guiding outcomes through nuance, timing, and taste.",

        howItWorks:
            "Yin Water (mist, perception, emotional nuance) sits on Rabbit (Wood, harmony, aesthetics). Water nourishes wood, so your sensitivity fuels growth and connection. Rabbit makes the water elegant: influence through tone, timing, and relational intelligence. When balanced, it’s graceful persuasion; when imbalanced, it’s avoidance and emotional diffusion.",

        asYear:
            "You came from an environment that valued harmony, manners, or emotional sensitivity. Early life emphasized reading people and keeping peace. Others experience you as gentle, perceptive, and refined.",

        asMonth:
            "Your career engine thrives in roles where nuance wins: design, writing, counseling, diplomacy, client work, branding, teaching, community building. Prime years reward your ability to create harmony without losing direction.",

        asDay:
            "You ARE subtle influence. Your identity is intuitive and socially intelligent, with strong taste and perception. In relationships you seek emotional safety and sincerity. Under pressure you may withdraw or soften too much—boundaries keep your gifts effective.",

        asHour:
            "Your legacy is built through the environments and relationships you improved—beauty, calm, and emotional clarity you brought into the world. Later life emphasizes mentorship, artistry, and healing through gentleness.",

        strengths: [
            "High emotional and intuitive intelligence",
            "Diplomacy and social finesse",
            "Strong aesthetic sensitivity",
            "Creates calm, safe environments"
        ],

        challenges: [
            "Conflict avoidance",
            "Boundary issues and over-accommodation",
            "Can drift or diffuse energy",
            "Sensitivity to criticism or harshness"
        ],

        lifeTheme: "Guide with gentleness—use nuance and taste to create harmony with boundaries"
    },

    // 41) Jia Chen (甲辰) - Yang Wood Dragon
    '0-4': {
        stem: 0,
        branch: 4,
        name: "Yang Wood Dragon",
        chineseName: "甲辰 (Jiǎ Chén)",

        essence:
            "The great tree over hidden reservoirs. Upright growth meets latent power and transformation. This pillar is visionary building—expansion guided by long-cycle strategy.",

        howItWorks:
            "Yang Wood (initiative, leadership, principle) sits on Dragon (Earth with hidden Water/Wood—storage, change, potential). Dragon provides a deep vault of resources and timing, giving Wood a strategic base rather than a purely impulsive one. This produces growth with reinvention cycles: you build, consolidate, then transform and expand again—often at larger scale each time.",

        asYear:
            "You came from an environment shaped by big forces—legacy, institutions, or major transitions. Early life taught you resilience and long-horizon thinking. Others see you as strong, future-oriented, and hard to derail.",

        asMonth:
            "Your career engine thrives in building systems and platforms: entrepreneurship, leadership, product, infrastructure, finance, governance, strategy. Prime years reward you for scale-building and mastering timing.",

        asDay:
            "You ARE strategic growth. Your identity is principled and expansive, but you move in cycles—waiting, then surging. In relationships you value loyalty and respect. Under pressure you become more controlled and determined, focusing on the long game.",

        asHour:
            "Your legacy is built through frameworks and structures that outlast you—institutions, assets, platforms, or teachings. Later life emphasizes stewardship of power and teaching others how to build through cycles.",

        strengths: [
            "Vision + long-horizon strategy",
            "Ability to build at scale",
            "Resilient through transformation cycles",
            "Strong leadership and presence"
        ],

        challenges: [
            "Can become controlling or overly strategic",
            "May delay action waiting for perfect timing",
            "Difficulty showing vulnerability",
            "Risk of rigidity once a structure is built"
        ],

        lifeTheme: "Build in cycles—grow with strategy, store power, transform at the right moment"
    },

    // 42) Yi Si (乙巳) - Yin Wood Snake
    '1-5': {
        stem: 1,
        branch: 5,
        name: "Yin Wood Snake",
        chineseName: "乙巳 (Yǐ Sì)",

        essence:
            "The vine with a hidden edge. Gentle growth meets focused strategic fire. This pillar is subtle ambition—winning through timing, intelligence, and quiet leverage.",

        howItWorks:
            "Yin Wood (adaptation, finesse, relational intelligence) sits on Snake (Fire, strategy, depth). Fire challenges wood by drying it, forcing selectivity and sharper growth. Snake adds patience and tactical calculation—this becomes a refined strategist: you grow through well-timed moves, specialized mastery, and reading motives rather than brute force.",

        asYear:
            "You came from an environment where discretion and intelligence mattered. Early life emphasized reading people and protecting resources. Others see you as subtle, sharp, and hard to predict.",

        asMonth:
            "Your career engine thrives in strategy-heavy domains: finance, negotiation, research, product, design systems, law, medicine, security. Prime years reward specialization, precision, and long-game thinking.",

        asDay:
            "You ARE strategic refinement. Your identity is gentle on the surface but highly intentional underneath. In relationships you need trust and loyalty; you may test for sincerity. Under pressure you become more private and calculating—best when you keep warmth alongside strategy.",

        asHour:
            "Your legacy is built through mastery and leverage—methods, investments, or systems that compound because they were designed intelligently. Later life emphasizes advisory influence and teaching discernment.",

        strengths: [
            "Subtle strategy and pattern recognition",
            "Adaptable, refined execution",
            "Strong timing instincts",
            "Specialization and mastery potential"
        ],

        challenges: [
            "Can become overly guarded or suspicious",
            "May overthink and hesitate",
            "Risk of manipulation without warmth",
            "Difficulty being emotionally transparent"
        ],

        lifeTheme: "Grow with quiet leverage—refine your path, move with timing, master the pattern"
    },

    // 43) Bing Wu (丙午) - Yang Fire Horse
    '2-6': {
        stem: 2,
        branch: 6,
        name: "Yang Fire Horse",
        chineseName: "丙午 (Bǐng Wǔ)",

        essence:
            "The blazing standard. Radiant fire meets pure motion and independence. This pillar is unstoppable momentum—leadership through courage, speed, and visible passion.",

        howItWorks:
            "Yang Fire (sun, inspiration, visibility) sits on Horse (strong Fire, movement, freedom). Fire-on-Fire amplifies intensity: confidence, charisma, and a powerful need to move. This is maximum expression—when directed, it becomes leadership, performance, and rapid progress; when undirected, it becomes burnout, ego flare, or chaos.",

        asYear:
            "You came from an environment with strong energy—movement, high expectations, or big personalities. Early life taught you to be bold and self-propelled. Others see you as magnetic, intense, and hard to ignore.",

        asMonth:
            "Your career engine thrives in visible, fast arenas: entrepreneurship, leadership, media, sales, performance, campaigning, high-growth roles. Prime years reward decisive action and inspirational presence.",

        asDay:
            "You ARE blazing momentum. Your identity is expressive, confident, and freedom-driven. In relationships you need honesty and admiration, but also space. Under pressure you can intensify quickly—pacing and humility keep your fire usable.",

        asHour:
            "Your legacy is built through what you energized—ventures, movements, teams, messages that spread fast. Later life emphasizes mentoring others in leadership and channeling passion into durable structures.",

        strengths: [
            "High charisma and leadership presence",
            "Strong momentum and courage",
            "Inspires and mobilizes others quickly",
            "Resilient, self-propelled energy"
        ],

        challenges: [
            "Burnout risk from constant intensity",
            "Impatience and impulsivity",
            "Can dominate spaces unintentionally",
            "Difficulty with routine and containment"
        ],

        lifeTheme: "Channel the blaze—lead with passion, but build pacing and structure"
    },

    // 44) Ding Wei (丁未) - Yin Fire Goat
    '3-7': {
        stem: 3,
        branch: 7,
        name: "Yin Fire Goat",
        chineseName: "丁未 (Dīng Wèi)",

        essence:
            "The warm lantern of the hearth. Refined insight meets nurturing earth and artistry. This pillar is gentle illumination—healing, beautifying, and sustaining through care.",

        howItWorks:
            "Yin Fire (lamp, subtle influence, perception) sits on Goat (Earth, care, cultivation). Earth can contain fire, making the light steady and domestic—less flare, more warmth. Goat adds taste and tenderness, turning fire into supportive presence: guiding through reassurance, aesthetics, and emotional steadiness. When balanced, it’s calming leadership; when imbalanced, it’s worry and over-responsibility.",

        asYear:
            "You came from an environment that valued care, family responsibility, or creating harmony. Early life emphasized sensitivity and support. Others see you as warm, thoughtful, and gentle.",

        asMonth:
            "Your career engine thrives in supportive and aesthetic domains: counseling, education, design, hospitality, community work, client stewardship, healing arts. Prime years reward your ability to create stable, uplifting environments.",

        asDay:
            "You ARE warm clarity. Your identity is perceptive, caring, and protective of emotional tone. In relationships you’re loyal and nurturing, but you need appreciation. Under pressure you may internalize stress—your best move is grounding feelings into simple actions.",

        asHour:
            "Your legacy is built through the spaces and people you warmed—homes, teams, communities, or creative works that made life gentler. Later life emphasizes mentorship and healing through presence.",

        strengths: [
            "Warm, supportive influence",
            "Strong emotional intelligence and taste",
            "Creates stable, uplifting environments",
            "Patient care and steady guidance"
        ],

        challenges: [
            "Overgiving and emotional absorption",
            "Worry and rumination",
            "Conflict avoidance",
            "Can feel unrecognized or under-appreciated"
        ],

        lifeTheme: "Illuminate gently—heal and sustain through warmth, care, and steady presence"
    },

    // 45) Wu Shen (戊申) - Yang Earth Monkey
    '4-8': {
        stem: 4,
        branch: 8,
        name: "Yang Earth Monkey",
        chineseName: "戊申 (Wù Shēn)",

        essence:
            "The strategist-builder. Massive earth meets clever systems and tools. This pillar is structured leverage—turning complexity into stable advantage.",

        howItWorks:
            "Yang Earth (mountain, containment, authority) sits on Monkey (Metal, strategy, modular thinking). Earth supports metal by holding ore; Monkey gives the mountain tools and tactics. This creates a builder who thinks in systems: you stabilize chaos by designing frameworks, processes, and structures that make outcomes repeatable. When balanced, it’s elegant operations power; when imbalanced, it’s control and over-engineering.",

        asYear:
            "You came from an environment where practicality and clever problem-solving were necessary. Early life emphasized navigating systems and carrying responsibility. Others see you as capable, strategic, and hard to overwhelm.",

        asMonth:
            "Your career engine thrives in systems leadership: operations, product/platform, finance, logistics, governance, engineering management, risk control. Prime years reward you for building durable leverage through structure and tools.",

        asDay:
            "You ARE structured strategy. Your identity is grounded and commanding, but mentally agile. In relationships you value competence and reliability. Under pressure you tighten control and optimize—best when you keep flexibility and delegate.",

        asHour:
            "Your legacy is built through frameworks that made things work—systems, institutions, platforms, or methods others can reuse. Later life emphasizes mentorship and teaching systems thinking.",

        strengths: [
            "Strong systems intelligence and strategy",
            "Stabilizes complexity into structure",
            "Excellent operational leverage",
            "Resilient, authoritative presence"
        ],

        challenges: [
            "Can become controlling or overly rigid",
            "Over-engineering and perfectionism",
            "Difficulty trusting others to execute",
            "May intellectualize emotions"
        ],

        lifeTheme: "Build leverage through structure—turn complexity into stable, repeatable advantage"
    },

    // 46) Ji You (己酉) - Yin Earth Rooster
    '5-9': {
        stem: 5,
        branch: 9,
        name: "Yin Earth Rooster",
        chineseName: "己酉 (Jǐ Yǒu)",

        essence:
            "The careful curator. Practical earth meets precision and critique. This pillar is grounded refinement—turning messy reality into clean, usable order.",

        howItWorks:
            "Yin Earth (soil, support, pragmatism) sits on Rooster (Metal, precision, standards). Earth supports metal by providing the material for refinement, making critique practical rather than harsh. Rooster brings discernment and quality control; Yin Earth makes it applied—improving systems through small corrections, consistency, and taste. When balanced, it’s trusted stewardship; when imbalanced, it’s worry and nitpicking.",

        asYear:
            "You came from an environment where correctness, responsibility, or presentation mattered. Early life emphasized doing things properly and noticing details. Others see you as composed, thoughtful, and quality-oriented.",

        asMonth:
            "Your career engine thrives in refinement roles: operations, QA, editorial, research, compliance, design polish, finance stewardship. Prime years reward you for elevating standards steadily.",

        asDay:
            "You ARE practical discernment. Your identity is grounded, selective, and improvement-driven. In relationships you value reliability and competence, and you may notice flaws quickly. Under pressure you can become overly self-critical—best to prioritize the few changes that truly matter.",

        asHour:
            "Your legacy is built through what you improved and maintained—work that endures because it was clarified and kept clean. Later life emphasizes mentorship in standards, craft, and steady refinement.",

        strengths: [
            "Strong practical discernment",
            "Excellent quality control and polish",
            "Reliable stewardship and follow-through",
            "Improves systems through steady iteration"
        ],

        challenges: [
            "Can become nitpicky or anxious",
            "Over-correction slows momentum",
            "May internalize criticism",
            "Difficulty tolerating chaos or low standards"
        ],

        lifeTheme: "Refine the real—apply standards patiently and make quality sustainable"
    },

    // 47) Geng Xu (庚戌) - Yang Metal Dog
    '6-10': {
        stem: 6,
        branch: 10,
        name: "Yang Metal Dog",
        chineseName: "庚戌 (Gēng Xū)",

        essence:
            "The iron guardian. Hard standards meet loyal duty and judgment. This pillar is uncompromising integrity—protecting what’s right with strength and discipline.",

        howItWorks:
            "Yang Metal (blade, reform, standards) sits on Dog (Earth with hidden Fire/Metal—duty, conviction, judgment). Earth supports metal, giving the blade a stable base; the Dog reinforces metal’s ethics and adds protective fire. This creates a principled enforcer: you build rules, hold the line, and will endure pressure to uphold what you believe is right.",

        asYear:
            "You came from an environment shaped by duty, loyalty, or strong moral expectations. Early life emphasized toughness and responsibility. Others see you as solid, principled, and not easily swayed.",

        asMonth:
            "Your career engine thrives where standards matter: leadership, law, security, compliance, operations, governance, crisis management. Prime years reward you for enforcing structure fairly and decisively.",

        asDay:
            "You ARE integrity with backbone. Your identity is direct, disciplined, and protective. In relationships you value loyalty and shared values; betrayal is a hard line. Under pressure you become even more firm—best when you stay fair rather than rigid.",

        asHour:
            "Your legacy is built through the line you held—systems corrected, people protected, standards upheld. Later life emphasizes mentorship, stewardship, and teaching others disciplined ethics.",

        strengths: [
            "Exceptional integrity and moral clarity",
            "Strong protective leadership",
            "Resilient under pressure and conflict",
            "Clear standards and decisive enforcement"
        ],

        challenges: [
            "Can become rigid or judgmental",
            "May carry burdens alone",
            "Difficulty showing vulnerability",
            "Can hold grudges when trust breaks"
        ],

        lifeTheme: "Hold the line—protect what matters and enforce standards with fairness"
    },

    // 48) Xin Hai (辛亥) - Yin Metal Pig
    '7-11': {
        stem: 7,
        branch: 11,
        name: "Yin Metal Pig",
        chineseName: "辛亥 (Xīn Hài)",

        essence:
            "The compassionate standard. Refined discernment meets deep feeling and openness. This pillar is gentle precision—high taste guided by empathy and sincerity.",

        howItWorks:
            "Yin Metal (jewelry, refinement, discernment) sits on Pig (Water, depth, generosity). Metal generates water, so your standards feed sensitivity—discernment that becomes emotionally intelligent. Pig adds sincerity and warmth, softening metal’s sharpness into humane taste: you refine without cruelty, and you care about what’s true and kind. When imbalanced, it can become overly sensitive to disappointment.",

        asYear:
            "You came from an environment where sensitivity, kindness, or emotional depth was present. Early life emphasized compassion and sincerity. Others see you as tasteful, gentle, and quietly strong.",

        asMonth:
            "Your career engine thrives in quality + care roles: design, editorial, counseling, brand, hospitality, medicine, client stewardship, ethical finance. Prime years reward you for combining standards with warmth.",

        asDay:
            "You ARE humane discernment. Your identity is selective, refined, and emotionally perceptive. In relationships you value sincerity and respect, and you need trust. Under pressure you may withdraw when disappointed—boundaries and honest communication keep the heart open.",

        asHour:
            "Your legacy is built through refined care—work and relationships that improved life without losing humanity. Later life emphasizes mentorship, healing influence, and teaching taste with ethics.",

        strengths: [
            "High discernment with empathy",
            "Strong taste and refinement",
            "Creates trust through sincerity",
            "Balances standards with kindness"
        ],

        challenges: [
            "Can become overly sensitive or disappointed",
            "May avoid harsh confrontation",
            "Boundary issues—overgiving emotionally",
            "Risk of withdrawing instead of addressing issues"
        ],

        lifeTheme: "Refine with heart—uphold standards without losing compassion"
    },

    // 49) Ren Zi (壬子) - Yang Water Rat
    '8-0': {
        stem: 8,
        branch: 0,
        name: "Yang Water Rat",
        chineseName: "壬子 (Rén Zǐ)",

        essence:
            "The pure strategist current. Massive flow meets peak timing intelligence. This pillar is acceleration—momentum guided by information and opportunity.",

        howItWorks:
            "Yang Water (river/ocean, reach, momentum) sits on Rat (Water, strategy, openings). Water-on-Water amplifies flow: speed, adaptability, and strong instinct for timing. Rat adds tactical cleverness and network intelligence—this is maximum mobility of mind and resources. When balanced, it’s powerful compounding; when imbalanced, it’s restlessness and emotional turbulence.",

        asYear:
            "You came from an environment where adaptability and survival intelligence were key. Early life emphasized reading signals and moving with timing. Others see you as sharp, resourceful, and always in motion.",

        asMonth:
            "Your career engine thrives in fast systems: trading, tech, media, logistics, consulting, intelligence, negotiations. Prime years reward you for riding momentum early and turning information into leverage.",

        asDay:
            "You ARE pure flow with timing. Your identity is flexible, strategic, and momentum-driven. In relationships you need mental stimulation and freedom; stagnation feels suffocating. Under pressure you can become anxious or scattered—containment and priorities create power.",

        asHour:
            "Your legacy is built through networks and platforms—systems that move information and value efficiently. Later life emphasizes mentoring others in strategy, timing, and building compounding flow.",

        strengths: [
            "Exceptional adaptability and timing",
            "Fast learning and strategic movement",
            "Builds leverage through networks",
            "Strong momentum and resilience"
        ],

        challenges: [
            "Restlessness and scattered focus",
            "Emotional turbulence if ungrounded",
            "Over-optimization / always gaming systems",
            "Difficulty committing to slow routines"
        ],

        lifeTheme: "Master the current—focus flow into compounding advantage"
    },

    // 50) Gui Chou (癸丑) - Yin Water Ox
    '9-1': {
        stem: 9,
        branch: 1,
        name: "Yin Water Ox",
        chineseName: "癸丑 (Guǐ Chǒu)",

        essence:
            "The steady rain on winter soil. Subtle intuition meets endurance and duty. This pillar is quiet resilience—feelings made practical through discipline and care.",

        howItWorks:
            "Yin Water (mist/rain, nuance, intuition) sits on Ox (Earth, persistence, responsibility). Earth contains water, shaping emotion into structure—intuition becomes practical support and steady service. Ox adds stamina and long-range effort: progress through routine, reliability, and patient mastery. When balanced, it’s calm strength; when imbalanced, it’s worry and emotional suppression.",

        asYear:
            "You came from an environment that emphasized responsibility and steadiness. Early life taught you to carry weight quietly and be dependable. Others see you as calm, thoughtful, and reliable.",

        asMonth:
            "Your career engine thrives in steady, trust-based roles: operations, healthcare, education, research, finance stewardship, client work, long-term building. Prime years reward patience, competence, and consistency.",

        asDay:
            "You ARE grounded sensitivity. Your identity is intuitive but disciplined; you prefer stability over drama. In relationships you’re loyal and supportive, but you may not show your needs easily. Under pressure you become more contained—best when you communicate rather than quietly endure.",

        asHour:
            "Your legacy is built through what you maintained: people supported, systems stabilized, craft refined over time. Later life emphasizes mentorship, caregiving leadership, and teaching quiet resilience.",

        strengths: [
            "Quiet resilience and endurance",
            "Practical intuition and emotional steadiness",
            "Reliable support and stewardship",
            "Patient mastery over time"
        ],

        challenges: [
            "Emotional suppression or stoicism",
            "Worry loops beneath calm exterior",
            "Difficulty changing direction quickly",
            "Can over-shoulder responsibility"
        ],

        lifeTheme: "Make sensitivity sustainable—ground intuition in discipline and steady care"
    },

    // 51) Jia Yin (甲寅) - Yang Wood Tiger
    '0-2': {
        stem: 0,
        branch: 2,
        name: "Yang Wood Tiger",
        chineseName: "甲寅 (Jiǎ Yín)",

        essence:
            "The pioneer tree. Upright growth meets fearless drive. This pillar is bold initiation—expansion through courage, leadership, and first-mover momentum.",

        howItWorks:
            "Yang Wood (initiative, principle, leadership) sits on Tiger (Wood, ambition, exploration). Wood-on-Wood amplifies growth: strong life force, strong will, strong upward momentum. Tiger adds daring and independence—this is the archetype of starting big and pushing into new territory. When balanced, it’s heroic leadership; when imbalanced, it’s impatience and stubborn force.",

        asYear:
            "You came from an environment that encouraged strength, independence, or leadership. Early life emphasized courage and standing on your own. Others see you as bold, assertive, and hard to contain.",

        asMonth:
            "Your career engine thrives in leadership and frontier work: entrepreneurship, building new markets, mission-driven roles, competitive fields, exploration, high-growth execution. Prime years reward decisive action and pioneering moves.",

        asDay:
            "You ARE raw initiative. Your identity is direct, principled, and growth-oriented—built to lead. In relationships you want honesty, loyalty, and momentum. Under pressure you push harder; pacing and listening prevent unnecessary battles.",

        asHour:
            "Your legacy is built through what you dared to begin—ventures, movements, teams, and paths others later follow. Later life emphasizes mentorship and passing on courage.",

        strengths: [
            "Powerful initiative and leadership",
            "High courage and independence",
            "Strong growth drive and resilience",
            "First-mover momentum"
        ],

        challenges: [
            "Impatience and stubbornness",
            "Can over-force outcomes",
            "Difficulty tolerating slow systems",
            "Risk of burnout from constant drive"
        ],

        lifeTheme: "Lead the charge—expand boldly, but master pacing and restraint"
    },

    // 52) Yi Mao (乙卯) - Yin Wood Rabbit
    '1-3': {
        stem: 1,
        branch: 3,
        name: "Yin Wood Rabbit",
        chineseName: "乙卯 (Yǐ Mǎo)",

        essence:
            "The pure cultivator. Gentle growth meets harmony and beauty. This pillar is graceful development—winning through relationships, taste, and steady refinement.",

        howItWorks:
            "Yin Wood (vine, flexibility, connection) sits on Rabbit (Wood, diplomacy, aesthetics). Wood-on-Wood supports organic growth—natural creativity, social intelligence, and gentle persistence. Rabbit adds timing and harmony: progress comes through collaboration, culture, and refinement rather than confrontation. When balanced, it’s elegant influence; when imbalanced, it’s avoidance and indecision.",

        asYear:
            "You came from an environment that valued harmony, manners, or culture. Early life emphasized sensitivity and social awareness. Others see you as kind, tasteful, and approachable.",

        asMonth:
            "Your career engine thrives in relational and aesthetic domains: design, branding, writing, counseling, teaching, community building, hospitality, client work. Prime years reward you for creating harmony and refinement.",

        asDay:
            "You ARE gentle growth. Your identity is adaptable, relationship-oriented, and tasteful. In relationships you want kindness, emotional safety, and sincerity. Under pressure you may avoid conflict—clear boundaries and directness keep growth healthy.",

        asHour:
            "Your legacy is built through what you nurtured—people, communities, and creations that became more beautiful and livable. Later life emphasizes mentorship and cultivating culture.",

        strengths: [
            "Strong diplomacy and social intelligence",
            "Natural taste and refinement",
            "Gentle persistence and adaptability",
            "Creates harmony and supportive environments"
        ],

        challenges: [
            "Conflict avoidance and indecision",
            "Boundary issues—over-accommodation",
            "Sensitivity to criticism",
            "Can drift without structure"
        ],

        lifeTheme: "Grow gracefully—cultivate harmony, refine beauty, and protect your boundaries"
    },

    // 53) Bing Chen (丙辰) - Yang Fire Dragon
    '2-4': {
        stem: 2,
        branch: 4,
        name: "Yang Fire Dragon",
        chineseName: "丙辰 (Bǐng Chén)",

        essence:
            "The beacon over deep vaults. Radiant purpose meets hidden power and transformation. This pillar is visible leadership with strategic depth—light backed by reserves.",

        howItWorks:
            "Yang Fire (sun/torch, inspiration, visibility) sits on Dragon (Earth with hidden Water/Wood—storage, change, latent power). Dragon grounds the fire and gives it long-cycle fuel: you don’t just shine; you build influence that can endure and reinvent. This creates leadership that is both charismatic and strategic—able to wait, then surge at the right moment.",

        asYear:
            "You came from an environment shaped by big forces—legacy, institutions, or major changes. Early life emphasized resilience and bearing responsibility. Others see you as powerful, ambitious, and commanding.",

        asMonth:
            "Your career engine thrives in leadership and systems-building: entrepreneurship, governance, finance, product/platform, operations at scale, advocacy. Prime years reward you for visible leadership backed by real structure.",

        asDay:
            "You ARE strategic radiance. Your identity is expressive and mission-driven, but not naive—you think in cycles and reserves. In relationships you value loyalty and respect. Under pressure you become more controlled and determined—using visibility as a tool, not a need.",

        asHour:
            "Your legacy is built through institutions, platforms, or movements you energized and stabilized. Later life emphasizes stewardship of influence and teaching others leadership with depth.",

        strengths: [
            "Charismatic leadership with strategic depth",
            "Strong resilience and long-horizon thinking",
            "Ability to build influence that lasts",
            "Powerful presence under pressure"
        ],

        challenges: [
            "Can become controlling or image-protective",
            "May delay action waiting for perfect timing",
            "Difficulty showing vulnerability",
            "Risk of intensity turning into domination"
        ],

        lifeTheme: "Lead with depth—shine, build reserves, and transform at the right moment"
    },

    // 54) Ding Si (丁巳) - Yin Fire Snake
    '3-5': {
        stem: 3,
        branch: 5,
        name: "Yin Fire Snake",
        chineseName: "丁巳 (Dīng Sì)",

        essence:
            "The focused lantern. Refined insight meets strategic fire and depth. This pillar is precision influence—quiet power that wins through timing and discernment.",

        howItWorks:
            "Yin Fire (lamp, subtle perception, refinement) sits on Snake (Fire, strategy, focus). Fire-on-Fire intensifies perception and intent: you see what matters and concentrate your light there. Snake adds secrecy and tactical intelligence—this becomes a precise strategist: influence through selective exposure, careful moves, and mastery rather than noise.",

        asYear:
            "You came from an environment where discretion, strategy, or strong instincts mattered. Early life emphasized reading motives and protecting what’s important. Others see you as sharp, composed, and hard to mislead.",

        asMonth:
            "Your career engine thrives in strategy and refinement: research, finance, negotiation, security, product strategy, design critique, medicine/law, advisory work. Prime years reward your ability to choose well and move quietly.",

        asDay:
            "You ARE refined intensity. Your identity is perceptive, selective, and quietly ambitious. In relationships you need loyalty and competence; you may test for trust. Under pressure you become more private and exacting—warmth and transparency keep your power clean.",

        asHour:
            "Your legacy is built through precise decisions and mastery—methods, systems, and teachings that compound because they were designed intelligently. Later life emphasizes mentorship and advisory influence.",

        strengths: [
            "Exceptional focus and discernment",
            "Strong timing instincts and strategy",
            "Composed, precise influence",
            "High potential for mastery and specialization"
        ],

        challenges: [
            "Can become overly guarded or suspicious",
            "May weaponize critique or control",
            "Perfectionism slows momentum",
            "Difficulty relaxing or being emotionally open"
        ],

        lifeTheme: "Win quietly—focus the light, master the pattern, move with timing"
    },

    // 55) Wu Wu (戊午) - Yang Earth Horse
    '4-6': {
        stem: 4,
        branch: 6,
        name: "Yang Earth Horse",
        chineseName: "戊午 (Wù Wǔ)",

        essence:
            "The charging mountain. Massive stability meets pure motion and fire. This pillar is forceful leadership—big presence that must learn pacing and direction.",

        howItWorks:
            "Yang Earth (mountain, authority, containment) sits on Horse (strong Fire, motion, independence). Fire energizes earth by baking it into solidity, but it also pushes movement—this combination produces high drive with strong will. When balanced, it’s executive force and rapid building; when imbalanced, it’s stubborn momentum, impatience, and burnout from carrying too much at speed.",

        asYear:
            "You came from an environment that demanded strength, independence, or rapid maturity. Early life emphasized carrying responsibility while staying mobile. Others see you as powerful, determined, and hard to stop.",

        asMonth:
            "Your career engine thrives in leadership and execution: entrepreneurship, operations, infrastructure, real assets, crisis management, scale-building. Prime years reward decisive building and commanding presence—especially when you delegate well.",

        asDay:
            "You ARE force in motion. Your identity is grounded, strong-willed, and action-oriented. In relationships you value loyalty and respect, and you dislike being controlled. Under pressure you push harder—your key is pacing, flexibility, and letting others help carry the load.",

        asHour:
            "Your legacy is built through big structures you moved into existence—organizations, assets, systems that required willpower and speed. Later life emphasizes stewardship, mentorship, and teaching disciplined execution.",

        strengths: [
            "Strong executive presence and will",
            "High drive and decisive execution",
            "Ability to build at scale under pressure",
            "Resilient, self-propelled leadership"
        ],

        challenges: [
            "Impatience and stubborn momentum",
            "Burnout risk from carrying too much",
            "Difficulty delegating or slowing down",
            "Can become controlling when stressed"
        ],

        lifeTheme: "Move the mountain—lead with force, but master pacing, flexibility, and delegation"
    },

    // 56) Ji Wei (己未) - Yin Earth Goat
    '5-7': {
        stem: 5,
        branch: 7,
        name: "Yin Earth Goat",
        chineseName: "己未 (Jǐ Wèi)",

        essence:
            "The gentle steward. Practical earth meets nurturing cultivation. This pillar is supportive stability—building calm, beauty, and security through care.",

        howItWorks:
            "Yin Earth (soil, support, pragmatism) sits on Goat (Earth, care, cultivation, harmony). Earth-on-Earth reinforces steadiness, but Goat adds warmth and artistry—this becomes a builder of livable systems. Progress comes from patient maintenance, thoughtful improvement, and creating environments where people can thrive. When balanced, it’s healing stewardship; when imbalanced, it’s over-responsibility and worry.",

        asYear:
            "You came from an environment where caretaking, family responsibility, or harmony mattered. Early life emphasized support and practical stability. Others see you as kind, grounded, and reliable.",

        asMonth:
            "Your career engine thrives in stewardship roles: operations, HR, community work, education, healthcare, hospitality, design of supportive environments. Prime years reward you for stabilizing teams and systems through care.",

        asDay:
            "You ARE supportive stability. Your identity is practical and nurturing—you build security through consistency and presence. In relationships you’re loyal and giving, but you need appreciation and boundaries. Under pressure you may overgive—simplify and delegate.",

        asHour:
            "Your legacy is built through what you nurtured into stability—homes, teams, communities, or long-term creations. Later life emphasizes mentorship, caretaking leadership, and leaving behind safe structures.",

        strengths: [
            "Strong stewardship and reliability",
            "Creates calm, supportive environments",
            "Patient, consistent cultivation",
            "Practical empathy and care"
        ],

        challenges: [
            "Overgiving and boundary issues",
            "Worry loops / rumination",
            "Conflict avoidance",
            "Can stagnate in comfort zones"
        ],

        lifeTheme: "Steward what matters—build stability through care, patience, and grounded support"
    },

    // 57) Geng Shen (庚申) - Yang Metal Monkey
    '6-8': {
        stem: 6,
        branch: 8,
        name: "Yang Metal Monkey",
        chineseName: "庚申 (Gēng Shēn)",

        essence:
            "The systems blade. Hard standards meet clever strategy. This pillar is tactical reform—cutting through complexity with tools, timing, and precision.",

        howItWorks:
            "Yang Metal (blade, reform, standards) sits on Monkey (Metal, strategy, tools). Metal-on-Metal amplifies sharpness: strong discernment, strong enforcement, strong capacity to redesign systems. Monkey adds modular thinking and opportunistic timing—this is metal that doesn’t just judge; it engineers. When balanced, it’s brilliant optimization; when imbalanced, it’s cold critique and control.",

        asYear:
            "You came from an environment where competence and clever maneuvering mattered. Early life emphasized sharp thinking and adapting within systems. Others see you as incisive, capable, and difficult to outplay.",

        asMonth:
            "Your career engine thrives in strategy + structure: engineering, security, finance, trading, operations, product systems, law, restructuring. Prime years reward you for improving systems decisively and efficiently.",

        asDay:
            "You ARE tactical standards. Your identity is direct, intelligent, and optimization-driven. In relationships you value competence and honesty; you dislike inefficiency and vagueness. Under pressure you become more surgical—watch the tendency to become cutting or emotionally distant.",

        asHour:
            "Your legacy is built through systems you refined—frameworks, platforms, and methods that made outcomes repeatable. Later life emphasizes mentorship in strategy, standards, and engineering clean solutions.",

        strengths: [
            "Exceptional strategic systems thinking",
            "Strong standards and decisive reform ability",
            "High precision and tool-based leverage",
            "Composed under complexity"
        ],

        challenges: [
            "Can become overly critical or cold",
            "Control/optimization obsession",
            "Difficulty tolerating slower people/systems",
            "May neglect emotional nuance"
        ],

        lifeTheme: "Engineer the clean cut—reform systems with precision, timing, and discipline"
    },

    // 58) Xin You (辛酉) - Yin Metal Rooster
    '7-9': {
        stem: 7,
        branch: 9,
        name: "Yin Metal Rooster",
        chineseName: "辛酉 (Xīn Yǒu)",

        essence:
            "The pure diamond edge. Refined metal meets precision at peak. This pillar is immaculate discernment—truth, taste, and standards expressed with sharp clarity.",

        howItWorks:
            "Yin Metal (jewelry, refinement, discernment) sits on Rooster (Metal, precision, critique). Metal-on-Metal doubles refinement: heightened standards, strong eye for detail, and an instinct to correct what’s off. Rooster adds performance and exactness—this is a master polisher. When balanced, it’s elite quality; when imbalanced, it’s perfectionism and anxious critique.",

        asYear:
            "You came from an environment that valued correctness, presentation, or high standards. Early life emphasized being precise and improving performance. Others see you as composed, discerning, and hard to fool.",

        asMonth:
            "Your career engine thrives in refinement-heavy roles: editorial, design critique, QA, research, law, medicine, finance selection, product polish. Prime years reward you for elevating quality and enforcing standards cleanly.",

        asDay:
            "You ARE immaculate discernment. Your identity is selective, precise, and standards-driven. In relationships you want respect, honesty, and competence; you notice flaws immediately. Under pressure you can become overly critical—best to choose the few standards that matter most and release the rest.",

        asHour:
            "Your legacy is built through excellence—work that endures because it was done perfectly enough to last. Later life emphasizes teaching taste, craft, and the discipline of quality.",

        strengths: [
            "Exceptional precision and taste",
            "High standards and quality mastery",
            "Strong analytical clarity and articulation",
            "Improves systems and work through refinement"
        ],

        challenges: [
            "Perfectionism and anxiety loops",
            "Over-critique (self or others)",
            "Can be hard to please or overly selective",
            "May delay shipping due to polishing"
        ],

        lifeTheme: "Excellence through refinement—hold clean standards, polish what truly matters"
    },

    // 59) Ren Xu (壬戌) - Yang Water Dog
    '8-10': {
        stem: 8,
        branch: 10,
        name: "Yang Water Dog",
        chineseName: "壬戌 (Rén Xū)",

        essence:
            "The protective tide. Massive flow meets loyal duty and judgment. This pillar is principled power—deep feeling guided by ethics and responsibility.",

        howItWorks:
            "Yang Water (river/ocean, momentum, emotion, reach) sits on Dog (Earth with hidden Fire/Metal—duty, conviction, standards). Earth contains water, giving big emotion a code and a boundary. Dog adds loyalty and moral judgment—this becomes water that protects: advocacy, guardianship, and leadership driven by values. When imbalanced, it can become emotional rigidity or righteous intensity.",

        asYear:
            "You came from an environment shaped by duty, protection, or strong moral expectations. Early life emphasized responsibility and loyalty. Others see you as strong, trustworthy, and value-driven.",

        asMonth:
            "Your career engine thrives where values and protection matter: leadership, law, security, governance, advocacy, crisis management, coaching. Prime years reward you for guiding people through turbulence with integrity.",

        asDay:
            "You ARE principled emotion. Your identity is powerful, loyal, and protective—someone who feels deeply and acts on values. In relationships you require trust and respect. Under pressure you can become morally rigid or reactive—best to channel intensity into steady guardianship.",

        asHour:
            "Your legacy is built through what you defended—people, communities, principles, and systems you stabilized. Later life emphasizes mentorship, stewardship, and passing on an ethical code.",

        strengths: [
            "Strong moral clarity and loyalty",
            "Protective leadership and advocacy power",
            "Resilient under emotional pressure",
            "Ability to stabilize turbulence with principle"
        ],

        challenges: [
            "Can become righteous or emotionally rigid",
            "Holds grudges when trust breaks",
            "Difficulty showing vulnerability",
            "May carry burdens alone"
        ],

        lifeTheme: "Protect with principle—channel deep power into steady guardianship"
    },

    // 60) Gui Hai (癸亥) - Yin Water Pig
    '9-11': {
        stem: 9,
        branch: 11,
        name: "Yin Water Pig",
        chineseName: "癸亥 (Guǐ Hài)",

        essence:
            "The ocean of compassion. Subtle intuition meets vast depth and openness. This pillar is spiritual sensitivity—big feeling, big imagination, and profound empathy.",

        howItWorks:
            "Yin Water (mist, intuition, nuance) sits on Pig (Water, depth, generosity). Water-on-Water amplifies receptivity: heightened intuition, emotional depth, and psychic-like sensitivity to atmosphere. Pig adds sincerity and openness—this becomes a healer-poet archetype. When balanced, it’s profound compassion and wisdom; when imbalanced, it’s overwhelm, escapism, and boundary loss.",

        asYear:
            "You came from an environment rich in emotion, imagination, or spiritual undertones. Early life emphasized sensitivity and empathy, sometimes through strong emotional tides. Others see you as gentle, intuitive, and deep.",

        asMonth:
            "Your career engine thrives in meaning-driven and human-centered work: counseling, healing, writing, art, music, spirituality, community building, hospitality. Prime years reward you for translating deep feeling into something that helps others.",

        asDay:
            "You ARE pure sensitivity. Your identity is intuitive, compassionate, and emotionally deep. In relationships you need sincerity and emotional safety, and you must protect your boundaries. Under pressure you can dissolve into overwhelm—structure and grounded routines keep your gifts usable.",

        asHour:
            "Your legacy is built through healing and imagination—people you softened, art you created, wisdom you transmitted. Later life emphasizes mentorship, spiritual depth, and creating safe spaces for others to feel and grow.",

        strengths: [
            "Exceptional intuition and empathy",
            "Deep imagination and creative sensitivity",
            "Natural healing presence",
            "Strong sincerity and emotional openness"
        ],

        challenges: [
            "Boundary loss and emotional overwhelm",
            "Escapism when reality feels harsh",
            "Difficulty with confrontation",
            "Can drift without structure"
        ],

        lifeTheme: "Feel deeply, heal wisely—protect your boundaries so compassion becomes strength"
    },

};

/**
 * Get pillar combination interpretation
 */
export function getPillarCombination(stem: HeavenlyStem, branch: EarthlyBranch): PillarCombination | null {
    const key = `${stem}-${branch}`;
    return PILLAR_COMBINATIONS[key] || null;
}

/**
 * Check if a pillar combination is defined
 */
export function hasPillarCombination(stem: HeavenlyStem, branch: EarthlyBranch): boolean {
    const key = `${stem}-${branch}`;
    return key in PILLAR_COMBINATIONS;
}

/**
 * Get all defined pillar combinations
 */
export function getAllDefinedCombinations(): PillarCombination[] {
    return Object.values(PILLAR_COMBINATIONS).filter((c): c is PillarCombination => c !== undefined);
}
