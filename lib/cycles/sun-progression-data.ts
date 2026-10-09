/**
 * Progressed Sun interpretations, ported verbatim from arc
 * (`src/lib/astrology/sun-progressions.ts`) — content only; the timeline math
 * lives in `sun-progression.ts`.
 *
 * Four shelves:
 *   chapters   — the progressed Sun in each sign, ~30 years of it
 *   ingress    — what crossing into a sign tends to feel like
 *   bands      — early / middle / late degrees within any sign
 *   dossiers   — one per consecutive pair: what leaves, what comes online
 *
 * The drawer renders a small slice of each. The rest (signals, flags, do
 * more/less, micro-shifts…) is not rendered and reaches the chat through the
 * page context — simple UI, rich data.
 */

// Canonical sign enum to prevent typos and enable localization
export enum ZodiacSign {
  ARIES = "Aries",
  TAURUS = "Taurus",
  GEMINI = "Gemini",
  CANCER = "Cancer",
  LEO = "Leo",
  VIRGO = "Virgo",
  LIBRA = "Libra",
  SCORPIO = "Scorpio",
  SAGITTARIUS = "Sagittarius",
  CAPRICORN = "Capricorn",
  AQUARIUS = "Aquarius",
  PISCES = "Pisces",
}

// Shelf A: The Chapter (Progressed Sun in Sign)
export interface ProgressedSunChapter {
  sign: ZodiacSign;
  chapterTheme: string;
  description: string;
  whatWorksHere: string[];
  whatDoesntWork: string[];
  signalsInDailyLife: string[];
  growthEdge: string;
  bestUse: string;
}

// Shelf B: The Threshold (Sign Change Experience)
export interface ProgressionIngress {
  type: "sign-specific";
  toSign: ZodiacSign;
  themes: string[];
  description: string;
  adjustmentWindow: string;
  commonExperiences: string[];
}

// Shelf C: Degree Bands (Early/Middle/Late phases)
export interface DegreeBand {
  phase: "early" | "middle" | "late";
  degrees: string;
  genericMeaning: string;
  themes: string[];
  signSpecificOverlay?: { [key in ZodiacSign]?: string };
  // Separate fields for UI composition
  signOverlay?: string;
}

// Shelf D: Transition Dossier (pair-specific friction and guidance)
export interface ProgressedSunTransitionDossier {
  fromSign: ZodiacSign;
  toSign: ZodiacSign;
  title: string;
  summary: string;
  leavingBehind: string[];
  comingOnline: string[];
  tradeoffs: string[];
  friction: string[];
  greenFlags: string[];
  redFlags: string[];
  doMore: string[];
  doLess: string[];
  keepStable: string[];
  microShifts: string[];
  mantra: string;
}

// SHELF A: Progressed Sun Chapters (one per sign)
export const progressedSunChapters: ProgressedSunChapter[] = [
  {
    sign: ZodiacSign.ARIES,
    chapterTheme: "Identity Pioneer",
    description:
      "A chapter of bold self-discovery and independent action. You're learning to trust your instincts and lead with courage.",
    whatWorksHere: [
      "Taking initiative on new projects",
      "Making quick decisions",
      "Physical activity and competition",
      "Standing up for yourself and others",
      "Starting fresh in any area of life",
    ],
    whatDoesntWork: [
      "Waiting for others to make the first move",
      "Over-analyzing before acting",
      "Avoiding conflict at all costs",
      "Following others' lead exclusively",
      "Staying in comfort zones",
    ],
    signalsInDailyLife: [
      "Feeling impatient with slow progress",
      "Natural leadership emerging in groups",
      "Increased physical energy and restlessness",
      "Direct communication style developing",
      "Attraction to competitive activities",
    ],
    growthEdge:
      "Learning to balance assertiveness with consideration for others",
    bestUse:
      "Channel pioneering energy into meaningful new beginnings that serve both self and others",
  },
  {
    sign: ZodiacSign.TAURUS,
    chapterTheme: "Stability Builder",
    description:
      "A chapter of grounding and building lasting foundations. You're learning the value of patience, persistence, and material security.",
    whatWorksHere: [
      "Building long-term financial security",
      "Creating beautiful, comfortable environments",
      "Developing practical skills and crafts",
      "Establishing routines that support wellbeing",
      "Investing in quality over quantity",
    ],
    whatDoesntWork: [
      "Rushing major decisions",
      "Constantly changing direction",
      "Ignoring physical comfort and needs",
      "Pursuing get-rich-quick schemes",
      "Avoiding commitment to people or projects",
    ],
    signalsInDailyLife: [
      "Craving stability and predictability",
      "Increased appreciation for sensory pleasures",
      "Focus on home, food, and comfort",
      "Methodical approach to tasks",
      "Resistance to unnecessary change",
    ],
    growthEdge:
      "Learning when to embrace necessary change while maintaining core stability",
    bestUse:
      "Build something of lasting value that provides security and beauty for yourself and others",
  },
  {
    sign: ZodiacSign.GEMINI,
    chapterTheme: "Mental Explorer",
    description:
      "A chapter of intellectual curiosity and communication mastery. You're learning to connect ideas, people, and possibilities.",
    whatWorksHere: [
      "Learning new subjects and skills",
      "Networking and building connections",
      "Writing, teaching, or communicating",
      "Staying mentally stimulated and curious",
      "Adapting quickly to changing circumstances",
    ],
    whatDoesntWork: [
      "Sticking to one narrow focus",
      "Avoiding social interaction",
      "Ignoring the need for mental stimulation",
      "Being overly serious or rigid",
      "Suppressing natural curiosity",
    ],
    signalsInDailyLife: [
      "Constant desire to learn something new",
      "Increased social activity and networking",
      "Mental restlessness with routine tasks",
      "Improved communication and writing skills",
      "Interest in current events and trends",
    ],
    growthEdge:
      "Learning to go deeper rather than just broader in knowledge and relationships",
    bestUse:
      "Become a bridge-builder who connects people, ideas, and communities meaningfully",
  },
  {
    sign: ZodiacSign.CANCER,
    chapterTheme: "Emotional Nurturer",
    description:
      "A chapter of emotional deepening and nurturing wisdom. You're learning to trust your intuition and create emotional security.",
    whatWorksHere: [
      "Creating a secure, nurturing home base",
      "Developing emotional intelligence and empathy",
      "Caring for family, children, or community",
      "Trusting intuitive guidance",
      "Building traditions and emotional connections",
    ],
    whatDoesntWork: [
      "Ignoring emotional needs (yours and others')",
      "Avoiding vulnerability and intimacy",
      "Constantly moving without establishing roots",
      "Suppressing intuitive insights",
      "Neglecting the need for emotional security",
    ],
    signalsInDailyLife: [
      "Increased sensitivity to emotional atmospheres",
      "Strong nesting instincts and home focus",
      "Protective feelings toward loved ones",
      "Intuitive insights becoming more frequent",
      "Interest in family history and traditions",
    ],
    growthEdge:
      "Learning to nurture without becoming overly protective or possessive",
    bestUse:
      "Create emotional safety and wisdom that helps others feel secure and valued",
  },
  {
    sign: ZodiacSign.LEO,
    chapterTheme: "Creative Leader",
    description:
      "A chapter of creative self-expression and confident leadership. You're learning to shine your unique light in the world.",
    whatWorksHere: [
      "Expressing creativity and unique talents",
      "Taking leadership roles with confidence",
      "Inspiring and encouraging others",
      "Pursuing recognition for meaningful contributions",
      "Working with children or creative projects",
    ],
    whatDoesntWork: [
      "Hiding your talents and avoiding the spotlight",
      "Following others without contributing your vision",
      "Suppressing creative impulses",
      "Seeking attention for shallow reasons",
      "Avoiding responsibility for leadership",
    ],
    signalsInDailyLife: [
      "Natural confidence and charisma emerging",
      "Desire to create something meaningful",
      "Increased interest in performance or presentation",
      "Generous spirit and desire to inspire others",
      "Need for appreciation and recognition",
    ],
    growthEdge:
      "Learning to lead with humility while maintaining authentic self-expression",
    bestUse:
      "Use your creative gifts and leadership abilities to inspire and uplift others",
  },
  {
    sign: ZodiacSign.VIRGO,
    chapterTheme: "Skillful Server",
    description:
      "A chapter of practical mastery and meaningful service. You're learning to perfect your skills and serve others effectively.",
    whatWorksHere: [
      "Developing expertise and practical skills",
      "Serving others in meaningful, helpful ways",
      "Focusing on health, wellness, and improvement",
      "Paying attention to details and quality",
      "Creating systems that work efficiently",
    ],
    whatDoesntWork: [
      "Pursuing recognition over substance",
      "Ignoring the need for practical skills",
      "Being sloppy or careless with details",
      "Avoiding service to others",
      "Perfectionism that prevents completion",
    ],
    signalsInDailyLife: [
      "Increased focus on health and daily routines",
      "Desire to be genuinely useful and helpful",
      "Attention to detail and quality improvement",
      "Interest in learning practical skills",
      "Critical thinking and analytical abilities",
    ],
    growthEdge:
      "Learning to serve without losing sight of the bigger picture and relationships",
    bestUse: "Perfect your skills in service of something larger than yourself",
  },
  {
    sign: ZodiacSign.LIBRA,
    chapterTheme: "Harmony Creator",
    description:
      "A chapter of relationship mastery and aesthetic refinement. You're learning to create balance and beauty in all areas of life.",
    whatWorksHere: [
      "Building harmonious relationships and partnerships",
      "Creating beauty and aesthetic environments",
      "Mediating conflicts and finding fair solutions",
      "Developing diplomatic and social skills",
      "Pursuing justice and equality",
    ],
    whatDoesntWork: [
      "Avoiding conflict even when necessary",
      "Making decisions without considering others",
      "Ignoring aesthetic and relationship needs",
      "Being overly independent or isolated",
      "Accepting unfairness to keep peace",
    ],
    signalsInDailyLife: [
      "Strong focus on relationships and partnerships",
      "Increased appreciation for beauty and art",
      "Natural diplomatic abilities emerging",
      "Desire for fairness and justice",
      "Need for harmony in environment and relationships",
    ],
    growthEdge:
      "Learning to maintain your own identity while creating harmony with others",
    bestUse:
      "Create beauty and balance that enhances life for yourself and your community",
  },
  {
    sign: ZodiacSign.SCORPIO,
    chapterTheme: "Depth Transformer",
    description:
      "A chapter of psychological transformation and emotional mastery. You're learning to navigate deep waters and emerge renewed.",
    whatWorksHere: [
      "Exploring psychological depths and hidden truths",
      "Transforming challenges into wisdom",
      "Developing emotional resilience and intensity",
      "Investigating mysteries and uncovering secrets",
      "Healing yourself and others through deep work",
    ],
    whatDoesntWork: [
      "Staying on the surface of experiences",
      "Avoiding emotional intensity or conflict",
      "Ignoring intuitive insights about people",
      "Being overly controlling or possessive",
      "Refusing to let go of what no longer serves",
    ],
    signalsInDailyLife: [
      "Attraction to psychology, healing, or investigative work",
      "Increased emotional intensity and depth",
      "Interest in transformation and renewal",
      "Strong intuitive abilities about others' motivations",
      "Desire for authentic, meaningful connections",
    ],
    growthEdge:
      "Learning to transform without destroying, and to trust without controlling",
    bestUse:
      "Use your transformative power to heal and renew yourself and others",
  },
  {
    sign: ZodiacSign.SAGITTARIUS,
    chapterTheme: "Wisdom Seeker",
    description:
      "A chapter of philosophical expansion and adventurous learning. You're discovering your personal truth and sharing it with the world.",
    whatWorksHere: [
      "Exploring different philosophies and belief systems",
      "Teaching, publishing, or sharing knowledge",
      "Traveling and experiencing different cultures",
      "Pursuing higher education or spiritual studies",
      "Inspiring others with optimism and vision",
    ],
    whatDoesntWork: [
      "Staying in narrow, limiting environments",
      "Avoiding intellectual or spiritual challenges",
      "Being dogmatic or preachy about beliefs",
      "Ignoring practical details and responsibilities",
      "Settling for superficial understanding",
    ],
    signalsInDailyLife: [
      "Strong desire for freedom and adventure",
      "Interest in foreign cultures and philosophies",
      "Natural teaching and inspiring abilities",
      "Optimistic outlook and big-picture thinking",
      "Restlessness with routine and limitations",
    ],
    growthEdge:
      "Learning to ground your vision in practical wisdom and respect others' paths",
    bestUse: "Share your expanded perspective to inspire and educate others",
  },
  {
    sign: ZodiacSign.CAPRICORN,
    chapterTheme: "Authority Builder",
    description:
      "A chapter of mastery, responsibility, and lasting achievement. You're learning to build something significant that stands the test of time.",
    whatWorksHere: [
      "Taking on leadership and management roles",
      "Building long-term career success and reputation",
      "Developing discipline and organizational skills",
      "Creating structures and systems that work",
      "Mentoring others and sharing hard-won wisdom",
    ],
    whatDoesntWork: [
      "Avoiding responsibility and commitment",
      "Seeking quick fixes or shortcuts to success",
      "Ignoring the need for structure and planning",
      "Being overly rigid or controlling",
      "Neglecting personal relationships for achievement",
    ],
    signalsInDailyLife: [
      "Natural authority and leadership abilities",
      "Focus on long-term goals and achievements",
      "Increased discipline and organizational skills",
      "Respect for tradition and proven methods",
      "Desire to build something lasting and meaningful",
    ],
    growthEdge:
      "Learning to achieve without sacrificing compassion and personal connections",
    bestUse:
      "Build lasting structures and achievements that benefit both yourself and society",
  },
  {
    sign: ZodiacSign.AQUARIUS,
    chapterTheme: "Innovation Catalyst",
    description:
      "A chapter of humanitarian vision and progressive thinking. You're learning to contribute to collective evolution and social change.",
    whatWorksHere: [
      "Working for humanitarian causes and social progress",
      "Developing innovative solutions to collective problems",
      "Building networks and communities of like-minded people",
      "Embracing technology and progressive ideas",
      "Maintaining independence while serving the group",
    ],
    whatDoesntWork: [
      "Conforming to outdated social expectations",
      "Ignoring the needs of the collective",
      "Being overly detached or emotionally distant",
      "Rejecting all tradition without discrimination",
      "Isolating yourself from community involvement",
    ],
    signalsInDailyLife: [
      "Strong interest in social causes and reform",
      "Attraction to innovative technologies and ideas",
      "Desire for intellectual freedom and independence",
      "Natural networking and community-building abilities",
      "Vision for a better future for humanity",
    ],
    growthEdge:
      "Learning to balance individual freedom with collective responsibility",
    bestUse:
      "Channel your innovative vision to create positive change for humanity",
  },
  {
    sign: ZodiacSign.PISCES,
    chapterTheme: "Compassionate Mystic",
    description:
      "A chapter of spiritual integration and universal compassion. You're learning to dissolve boundaries and serve from a place of deep wisdom.",
    whatWorksHere: [
      "Developing spiritual practices and intuitive abilities",
      "Serving others through compassion and healing",
      "Creating art, music, or other inspired works",
      "Practicing forgiveness and unconditional love",
      "Connecting with the divine through meditation or prayer",
    ],
    whatDoesntWork: [
      "Avoiding spiritual development and inner work",
      "Being overly rigid or materialistic",
      "Ignoring intuitive guidance and dreams",
      "Holding onto resentments and judgments",
      "Escaping reality through unhealthy means",
    ],
    signalsInDailyLife: [
      "Increased sensitivity to spiritual and emotional energies",
      "Strong compassion and desire to help others",
      "Interest in mysticism, dreams, and the unconscious",
      "Natural healing and artistic abilities",
      "Sense of connection to something greater than yourself",
    ],
    growthEdge:
      "Learning to serve with wisdom while maintaining healthy boundaries",
    bestUse:
      "Use your spiritual gifts to heal, inspire, and bring more love into the world",
  },
];

// SHELF B: Threshold Experiences (Sign Changes)
export const progressionIngress: ProgressionIngress[] = [
  {
    type: "sign-specific",
    toSign: ZodiacSign.TAURUS,
    themes: ["Slowing down", "Seeking stability", "Practical focus"],
    description:
      "Entering Taurus feels like wanting to slow down and build something lasting.",
    adjustmentWindow: "1-3 years",
    commonExperiences: [
      "Desire to settle down and create stability",
      "Less tolerance for constant change and chaos",
      "Increased focus on financial and material security",
      "Appreciation for simple, sensory pleasures",
      "Need to build rather than just start things",
    ],
  },
  {
    type: "sign-specific",
    toSign: ZodiacSign.GEMINI,
    themes: ["Mental awakening", "Communication focus", "Variety seeking"],
    description:
      "Entering Gemini feels like your mind is waking up and craving stimulation.",
    adjustmentWindow: "1-3 years",
    commonExperiences: [
      "Sudden interest in learning and communication",
      "Mental restlessness with routine activities",
      "Desire to connect with more people and ideas",
      "Interest in writing, teaching, or sharing knowledge",
      "Need for variety and mental stimulation",
    ],
  },
  {
    type: "sign-specific",
    toSign: ZodiacSign.CANCER,
    themes: ["Emotional deepening", "Home focus", "Nurturing development"],
    description:
      "Entering Cancer feels like your emotional world is becoming more important than external achievements.",
    adjustmentWindow: "1-3 years",
    commonExperiences: [
      "Increased sensitivity to emotional atmospheres",
      "Strong desire to create a secure home base",
      "Interest in family, caregiving, or nurturing roles",
      'Feeling "done" with purely intellectual pursuits',
      "Need for emotional security and belonging",
    ],
  },
  {
    type: "sign-specific",
    toSign: ZodiacSign.LEO,
    themes: [
      "Creative expression",
      "Leadership emergence",
      "Confidence building",
    ],
    description:
      "Entering Leo feels like you're ready to share your gifts with the world.",
    adjustmentWindow: "1-3 years",
    commonExperiences: [
      "Desire to express creativity and unique talents",
      "Natural leadership abilities emerging",
      "Increased confidence in self-expression",
      "Interest in working with children or creative arts",
      "Need for recognition and appreciation",
    ],
  },
  {
    type: "sign-specific",
    toSign: ZodiacSign.VIRGO,
    themes: [
      "Service orientation",
      "Skill refinement",
      "Practical application",
    ],
    description:
      "Entering Virgo feels like you want to perfect your skills and be genuinely useful.",
    adjustmentWindow: "1-3 years",
    commonExperiences: [
      "Focus on developing practical expertise",
      "Desire to serve others in meaningful ways",
      "Interest in health, wellness, and improvement",
      "Attention to detail and quality becoming important",
      "Need to be genuinely helpful and competent",
    ],
  },
  {
    type: "sign-specific",
    toSign: ZodiacSign.LIBRA,
    themes: ["Relationship focus", "Balance seeking", "Aesthetic development"],
    description:
      "Entering Libra feels like relationships and beauty become central to your identity.",
    adjustmentWindow: "1-3 years",
    commonExperiences: [
      "Strong focus on creating harmonious relationships",
      "Increased appreciation for beauty and aesthetics",
      "Desire to bring balance and fairness to situations",
      "Interest in partnership and collaboration",
      "Need for harmony in environment and relationships",
    ],
  },
  {
    type: "sign-specific",
    toSign: ZodiacSign.SCORPIO,
    themes: [
      "Psychological deepening",
      "Transformation focus",
      "Intensity embrace",
    ],
    description:
      "Entering Scorpio feels like you're ready to go deeper and transform what no longer serves.",
    adjustmentWindow: "1-3 years",
    commonExperiences: [
      "Attraction to psychology, healing, or investigative work",
      "Increased emotional intensity and depth",
      "Desire to uncover hidden truths and motivations",
      "Interest in transformation and renewal processes",
      "Need for authentic, meaningful connections",
    ],
  },
  {
    type: "sign-specific",
    toSign: ZodiacSign.SAGITTARIUS,
    themes: [
      "Philosophical expansion",
      "Adventure seeking",
      "Truth exploration",
    ],
    description:
      "Entering Sagittarius feels like your horizons are expanding and you're seeking greater meaning.",
    adjustmentWindow: "1-3 years",
    commonExperiences: [
      "Strong desire for freedom and adventure",
      "Interest in different philosophies and belief systems",
      "Urge to travel or experience different cultures",
      "Natural teaching and inspiring abilities emerging",
      "Restlessness with limitations and routine",
    ],
  },
  {
    type: "sign-specific",
    toSign: ZodiacSign.CAPRICORN,
    themes: ["Authority building", "Responsibility embrace", "Mastery focus"],
    description:
      "Entering Capricorn feels like you're ready to take on serious responsibility and build something lasting.",
    adjustmentWindow: "1-3 years",
    commonExperiences: [
      "Increased focus on career and long-term goals",
      "Natural authority and leadership abilities emerging",
      "Desire to build something significant and lasting",
      "Interest in developing discipline and organizational skills",
      "Respect for tradition and proven methods",
    ],
  },
  {
    type: "sign-specific",
    toSign: ZodiacSign.AQUARIUS,
    themes: [
      "Innovation catalyst",
      "Humanitarian focus",
      "Progressive thinking",
    ],
    description:
      "Entering Aquarius feels like you're connecting with your role in collective evolution.",
    adjustmentWindow: "1-3 years",
    commonExperiences: [
      "Strong interest in social causes and reform",
      "Attraction to innovative technologies and ideas",
      "Desire for intellectual freedom and independence",
      "Natural networking and community-building abilities",
      "Vision for a better future for humanity",
    ],
  },
  {
    type: "sign-specific",
    toSign: ZodiacSign.PISCES,
    themes: [
      "Spiritual integration",
      "Compassion development",
      "Boundary dissolution",
    ],
    description:
      "Entering Pisces feels like you're connecting with universal compassion and spiritual wisdom.",
    adjustmentWindow: "1-3 years",
    commonExperiences: [
      "Increased sensitivity to spiritual and emotional energies",
      "Strong compassion and desire to help others",
      "Interest in mysticism, dreams, and the unconscious",
      "Natural healing and artistic abilities emerging",
      "Sense of connection to something greater than yourself",
    ],
  },
];

// SHELF C: Degree Bands (Early/Middle/Late phases)
export const degreeBands: DegreeBand[] = [
  {
    phase: "early",
    degrees: "0-10°",
    genericMeaning:
      "Learning phase - experimenting with new energy, developing basic competency",
    themes: [
      "Exploration",
      "Learning",
      "Adjustment",
      "New beginnings",
      "Experimentation",
    ],
    signSpecificOverlay: {
      [ZodiacSign.TAURUS]:
        "Learning patience and practical skills, developing appreciation for stability",
      [ZodiacSign.GEMINI]:
        "Exploring new ideas and communication styles, building mental connections",
      [ZodiacSign.CANCER]:
        "Learning to trust emotions and intuition, seeking emotional security",
      [ZodiacSign.LEO]:
        "Building confidence in creative self-expression, developing leadership skills",
      [ZodiacSign.VIRGO]:
        "Learning precision and practical application, developing service orientation",
      [ZodiacSign.LIBRA]:
        "Learning diplomacy and aesthetic appreciation, developing relationship skills",
      [ZodiacSign.SCORPIO]:
        "Learning to navigate emotional depths, developing transformative abilities",
      [ZodiacSign.SAGITTARIUS]:
        "Exploring new philosophies and expanding horizons, developing teaching abilities",
      [ZodiacSign.CAPRICORN]:
        "Learning discipline and responsibility, developing leadership authority",
      [ZodiacSign.AQUARIUS]:
        "Exploring innovative ideas and humanitarian causes, developing group consciousness",
      [ZodiacSign.PISCES]:
        "Learning spiritual sensitivity and compassion, developing intuitive abilities",
    },
  },
  {
    phase: "middle",
    degrees: "10-20°",
    genericMeaning:
      "Mastery phase - full expression and confidence in the sign's qualities",
    themes: [
      "Confidence",
      "Mastery",
      "Full expression",
      "Peak performance",
      "Natural flow",
    ],
    signSpecificOverlay: {
      [ZodiacSign.TAURUS]:
        "Mastering the art of building and maintaining, peak stability and security",
      [ZodiacSign.GEMINI]:
        "Becoming a skilled communicator and connector, peak mental agility",
      [ZodiacSign.CANCER]:
        "Becoming a wise nurturer and emotional guide, peak emotional intelligence",
      [ZodiacSign.LEO]:
        "Becoming a confident leader and creative force, peak self-expression",
      [ZodiacSign.VIRGO]:
        "Becoming a skilled craftsperson and healer, peak practical competency",
      [ZodiacSign.LIBRA]:
        "Becoming a skilled mediator and creator of beauty, peak relationship harmony",
      [ZodiacSign.SCORPIO]:
        "Becoming a master of transformation and psychological insight, peak emotional power",
      [ZodiacSign.SAGITTARIUS]:
        "Becoming a wise teacher and philosophical guide, peak inspirational ability",
      [ZodiacSign.CAPRICORN]:
        "Becoming a respected authority and master builder, peak achievement capacity",
      [ZodiacSign.AQUARIUS]:
        "Becoming an innovative leader and humanitarian catalyst, peak group influence",
      [ZodiacSign.PISCES]:
        "Becoming a compassionate healer and spiritual guide, peak intuitive wisdom",
    },
  },
  {
    phase: "late",
    degrees: "20-30°",
    genericMeaning:
      "Integration phase - preparing for transition, integrating lessons learned",
    themes: [
      "Integration",
      "Preparation",
      "Wisdom",
      "Transition readiness",
      "Restlessness",
    ],
    signSpecificOverlay: {
      [ZodiacSign.TAURUS]:
        "Feeling bored with routine, craving mental stimulation and variety",
      [ZodiacSign.GEMINI]:
        "Feeling intellectually saturated, craving emotional depth and meaning",
      [ZodiacSign.CANCER]:
        "Ready to express emotional wisdom creatively and confidently",
      [ZodiacSign.LEO]:
        "Wanting to use creative gifts for practical service and improvement",
      [ZodiacSign.VIRGO]:
        "Realizing the importance of relationships and beauty beyond pure function",
      [ZodiacSign.LIBRA]:
        "Craving deeper, more transformative experiences beyond surface harmony",
      [ZodiacSign.SCORPIO]:
        "Ready to share transformative wisdom and expand beyond personal healing",
      [ZodiacSign.SAGITTARIUS]:
        "Wanting to ground philosophical insights in practical, structured achievement",
      [ZodiacSign.CAPRICORN]:
        "Feeling ready to innovate and contribute to collective progress",
      [ZodiacSign.AQUARIUS]:
        "Craving spiritual connection and compassionate service beyond intellectual ideals",
      [ZodiacSign.PISCES]:
        "Ready to begin a new cycle with renewed energy and pioneering spirit",
    },
  },
];

// SHELF D: Transition Dossiers (pair-specific friction and guidance)
export const transitionDossiers: ProgressedSunTransitionDossier[] = [
  {
    fromSign: ZodiacSign.ARIES,
    toSign: ZodiacSign.TAURUS,
    title: "From Fire to Earth: From Action to Building",
    summary:
      "Trading the rush of starting for the satisfaction of building something that lasts.",
    leavingBehind: [
      "Constant action and urgency",
      "Quick wins and instant gratification",
      "Competitive edge as primary motivation",
      "Impatience with slow progress",
    ],
    comingOnline: [
      "Patience with gradual development",
      "Appreciation for quality and craftsmanship",
      "Focus on material security and comfort",
      "Methodical approach to goals",
    ],
    tradeoffs: [
      "Less speed, more thoroughness",
      "Less variety, more depth",
      "Less excitement, more stability",
      "Less independence, more commitment",
    ],
    friction: [
      "Feeling bored or restless with routine",
      "Impatience with the pace of building",
      "Missing the adrenaline of constant action",
      "Frustration with having to slow down",
    ],
    greenFlags: [
      "Finding satisfaction in completing projects",
      "Enjoying sensory pleasures and comfort",
      "Building financial security feels important",
      "Appreciating quality over quantity",
    ],
    redFlags: [
      "Constantly starting new things without finishing",
      "Avoiding commitment to long-term projects",
      "Feeling trapped by routine or responsibility",
      "Impatience leading to poor quality work",
    ],
    doMore: [
      "Focus on one project at a time",
      "Invest in quality tools and materials",
      "Create comfortable, beautiful environments",
      "Practice patience with gradual progress",
    ],
    doLess: [
      "Rush through important decisions",
      "Start new projects before finishing current ones",
      "Sacrifice quality for speed",
      "Avoid long-term commitments",
    ],
    keepStable: [
      "Your natural leadership abilities",
      "Courage to take initiative",
      "Direct communication style",
      "Ability to inspire others",
    ],
    microShifts: [
      "Taking time to enjoy meals instead of rushing",
      "Investing in comfortable furniture or clothing",
      "Choosing quality items that will last",
      "Creating daily routines that support wellbeing",
    ],
    mantra: "I build something beautiful that lasts.",
  },
  {
    fromSign: ZodiacSign.TAURUS,
    toSign: ZodiacSign.GEMINI,
    title: "From Earth to Air: From Building to Connecting",
    summary:
      "Trading the comfort of routine for the excitement of learning and mental stimulation.",
    leavingBehind: [
      "Comfort with predictable routines",
      "Focus on material accumulation",
      "Resistance to change and variety",
      "Preference for physical over mental activities",
    ],
    comingOnline: [
      "Curiosity about ideas and information",
      "Desire for variety and mental stimulation",
      "Interest in communication and networking",
      "Adaptability to changing circumstances",
    ],
    tradeoffs: [
      "Less stability, more variety",
      "Less depth, more breadth",
      "Less comfort, more stimulation",
      "Less routine, more spontaneity",
    ],
    friction: [
      "Feeling scattered or unfocused",
      "Missing the comfort of familiar routines",
      "Overwhelm from too many options",
      "Difficulty committing to one path",
    ],
    greenFlags: [
      "Excitement about learning new subjects",
      "Enjoying conversations and networking",
      "Feeling energized by variety and change",
      "Natural communication skills emerging",
    ],
    redFlags: [
      "Avoiding new learning opportunities",
      "Staying isolated from social connections",
      "Clinging to outdated routines",
      "Refusing to adapt to changing circumstances",
    ],
    doMore: [
      "Engage in learning and education",
      "Network and build social connections",
      "Embrace variety in daily activities",
      "Practice flexible thinking",
    ],
    doLess: [
      "Stick rigidly to old routines",
      "Avoid new people or ideas",
      "Focus only on material concerns",
      "Resist necessary changes",
    ],
    keepStable: [
      "Your practical wisdom and common sense",
      "Ability to build lasting foundations",
      "Appreciation for quality and beauty",
      "Reliable and trustworthy nature",
    ],
    microShifts: [
      "Reading news or articles during breaks",
      "Starting conversations with new people",
      "Trying different routes to familiar places",
      "Learning a new skill or hobby",
    ],
    mantra: "I connect ideas and people with wisdom.",
  },
  {
    fromSign: ZodiacSign.GEMINI,
    toSign: ZodiacSign.CANCER,
    title: "From Air to Water: From Information to Meaning",
    summary:
      "Trading intellectual curiosity for emotional depth and the search for belonging.",
    leavingBehind: [
      "Information gathering for its own sake",
      "Surface-level social connections",
      "Constant mental stimulation needs",
      "Detachment from emotional depth",
    ],
    comingOnline: [
      "Emotional intelligence and empathy",
      "Desire for meaningful connections",
      "Intuitive wisdom and gut feelings",
      "Need for emotional security and belonging",
    ],
    tradeoffs: [
      "Less breadth, more emotional depth",
      "Less detachment, more involvement",
      "Less variety, more meaning",
      "Less logic, more intuition",
    ],
    friction: [
      "Feeling overwhelmed by emotional intensity",
      "Missing the lightness of intellectual pursuits",
      "Confusion about trusting feelings over facts",
      "Difficulty with increased sensitivity",
    ],
    greenFlags: [
      "Deeper, more meaningful relationships",
      "Trusting intuitive insights",
      "Feeling emotionally nourished and secure",
      "Interest in family, home, or caregiving",
    ],
    redFlags: [
      "Avoiding emotional conversations",
      "Staying stuck in intellectual analysis",
      "Refusing to trust gut feelings",
      "Isolating when emotions feel intense",
    ],
    doMore: [
      "Trust your emotional instincts",
      "Create a nurturing home environment",
      "Deepen existing relationships",
      "Practice emotional self-care",
    ],
    doLess: [
      "Over-analyze emotional situations",
      "Avoid vulnerability in relationships",
      "Dismiss feelings as 'irrational'",
      "Stay constantly busy to avoid emotions",
    ],
    keepStable: [
      "Your communication and networking skills",
      "Ability to see multiple perspectives",
      "Intellectual curiosity and learning ability",
      "Adaptability and mental agility",
    ],
    microShifts: [
      "Checking in with how you feel, not just what you think",
      "Creating cozy, comfortable spaces at home",
      "Cooking nourishing meals for yourself or others",
      "Spending quality time with close family or friends",
    ],
    mantra: "I trust my heart to guide me home.",
  },
  {
    fromSign: ZodiacSign.CANCER,
    toSign: ZodiacSign.LEO,
    title: "From Water to Fire: From Nurturing to Shining",
    summary:
      "Trading private emotional wisdom for confident creative self-expression in the world.",
    leavingBehind: [
      "Preference for private, intimate settings",
      "Focus on others' needs over self-expression",
      "Emotional caution and protective instincts",
      "Behind-the-scenes supportive roles",
    ],
    comingOnline: [
      "Confidence in creative self-expression",
      "Natural leadership and inspiring abilities",
      "Desire for recognition and appreciation",
      "Generous sharing of talents and gifts",
    ],
    tradeoffs: [
      "Less privacy, more public presence",
      "Less caution, more confidence",
      "Less supporting, more leading",
      "Less emotional protection, more creative risk",
    ],
    friction: [
      "Fear of being too visible or exposed",
      "Guilt about focusing on self-expression",
      "Discomfort with attention and recognition",
      "Worry about appearing selfish or egotistical",
    ],
    greenFlags: [
      "Feeling confident sharing your talents",
      "Enjoying positive attention and feedback",
      "Natural leadership opportunities arising",
      "Creative projects bringing joy and fulfillment",
    ],
    redFlags: [
      "Hiding talents or avoiding the spotlight",
      "Always putting others' needs first",
      "Dismissing compliments or recognition",
      "Staying in purely supportive roles",
    ],
    doMore: [
      "Share your creative gifts openly",
      "Take on leadership opportunities",
      "Accept compliments and recognition gracefully",
      "Express yourself authentically and boldly",
    ],
    doLess: [
      "Hide your talents or downplay abilities",
      "Always defer to others' preferences",
      "Avoid situations where you might stand out",
      "Suppress creative impulses for others' comfort",
    ],
    keepStable: [
      "Your emotional wisdom and empathy",
      "Nurturing and protective instincts",
      "Ability to create emotional safety",
      "Deep intuitive understanding of others",
    ],
    microShifts: [
      "Speaking up with your ideas in meetings",
      "Wearing colors or styles that express your personality",
      "Sharing your creative work with others",
      "Taking credit for your contributions",
    ],
    mantra: "I shine my light to inspire and uplift others.",
  },
  {
    fromSign: ZodiacSign.LEO,
    toSign: ZodiacSign.VIRGO,
    title: "From Fire to Earth: From Expression to Service",
    summary:
      "Trading creative self-expression for practical mastery and meaningful service to others.",
    leavingBehind: [
      "Focus on personal recognition and applause",
      "Creative expression for its own sake",
      "Dramatic flair and grand gestures",
      "Center-stage positioning and attention",
    ],
    comingOnline: [
      "Desire to be genuinely useful and helpful",
      "Focus on skill development and mastery",
      "Attention to detail and quality improvement",
      "Service-oriented approach to work and relationships",
    ],
    tradeoffs: [
      "Less spotlight, more behind-the-scenes contribution",
      "Less drama, more practical effectiveness",
      "Less recognition, more competence",
      "Less creative freedom, more structured skill-building",
    ],
    friction: [
      "Missing the excitement of creative expression",
      "Feeling unappreciated for detailed work",
      "Impatience with perfectionism and analysis",
      "Resistance to criticism or feedback",
    ],
    greenFlags: [
      "Finding satisfaction in helping others practically",
      "Enjoying the process of skill refinement",
      "Feeling valued for competence and reliability",
      "Interest in health, wellness, or improvement",
    ],
    redFlags: [
      "Avoiding detailed work or skill development",
      "Seeking attention through drama rather than competence",
      "Dismissing feedback as unnecessary criticism",
      "Refusing to serve others or contribute practically",
    ],
    doMore: [
      "Develop expertise in areas that serve others",
      "Pay attention to details and quality",
      "Offer practical help and support",
      "Focus on continuous improvement",
    ],
    doLess: [
      "Seek attention through dramatic gestures",
      "Avoid constructive feedback or criticism",
      "Rush through work without attention to quality",
      "Focus only on personal recognition",
    ],
    keepStable: [
      "Your creative abilities and artistic sense",
      "Natural leadership and inspiring qualities",
      "Generous spirit and desire to uplift others",
      "Confidence and charismatic presence",
    ],
    microShifts: [
      "Offering to help with practical tasks",
      "Taking time to perfect your work quality",
      "Learning new skills that benefit others",
      "Organizing and improving your daily routines",
    ],
    mantra: "I serve others through skilled excellence.",
  },
  {
    fromSign: ZodiacSign.VIRGO,
    toSign: ZodiacSign.LIBRA,
    title: "From Earth to Air: From Perfection to Harmony",
    summary:
      "Trading individual mastery for collaborative beauty and relationship-centered living.",
    leavingBehind: [
      "Focus on individual skill and perfection",
      "Critical analysis and problem-solving",
      "Independence in work and decision-making",
      "Emphasis on practical function over aesthetics",
    ],
    comingOnline: [
      "Desire for harmony and balance in relationships",
      "Appreciation for beauty and aesthetic refinement",
      "Collaborative approach to projects and decisions",
      "Diplomatic skills and social grace",
    ],
    tradeoffs: [
      "Less individual control, more collaborative input",
      "Less criticism, more diplomacy",
      "Less function-focus, more beauty-focus",
      "Less perfectionism, more balance",
    ],
    friction: [
      "Frustration with others' different standards",
      "Difficulty making decisions without consensus",
      "Impatience with social niceties and diplomacy",
      "Struggle between efficiency and relationship harmony",
    ],
    greenFlags: [
      "Enjoying collaborative projects and partnerships",
      "Appreciating beauty in environment and relationships",
      "Natural diplomatic abilities emerging",
      "Finding fulfillment in creating harmony",
    ],
    redFlags: [
      "Avoiding collaboration or partnership",
      "Being overly critical of others' contributions",
      "Ignoring aesthetic and relationship needs",
      "Making decisions without considering others' input",
    ],
    doMore: [
      "Seek input and collaboration from others",
      "Create beautiful, harmonious environments",
      "Practice diplomacy and social grace",
      "Focus on win-win solutions",
    ],
    doLess: [
      "Criticize others' methods or standards",
      "Make unilateral decisions",
      "Ignore the importance of aesthetics",
      "Prioritize efficiency over relationship harmony",
    ],
    keepStable: [
      "Your analytical abilities and attention to detail",
      "Commitment to quality and excellence",
      "Practical skills and problem-solving abilities",
      "Desire to be genuinely helpful",
    ],
    microShifts: [
      "Asking for others' opinions before deciding",
      "Adding beautiful elements to your workspace",
      "Practicing diplomatic language in conversations",
      "Seeking compromise rather than perfect solutions",
    ],
    mantra: "I create beauty through balanced collaboration.",
  },
  {
    fromSign: ZodiacSign.LIBRA,
    toSign: ZodiacSign.SCORPIO,
    title: "From Air to Water: From Harmony to Truth",
    summary:
      "Trading surface harmony for deep psychological truth and transformative power.",
    leavingBehind: [
      "Need for constant harmony and agreement",
      "Avoiding conflict and difficult conversations",
      "Focus on surface beauty over depth",
      "People-pleasing and diplomatic compromise",
    ],
    comingOnline: [
      "Courage to face difficult truths",
      "Psychological depth and insight",
      "Transformative healing abilities",
      "Authentic power and intensity",
    ],
    tradeoffs: [
      "Less surface harmony, more authentic truth",
      "Less diplomacy, more direct honesty",
      "Less aesthetic focus, more psychological depth",
      "Less consensus-seeking, more individual power",
    ],
    friction: [
      "Discomfort with increased emotional intensity",
      "Missing the ease of surface-level interactions",
      "Fear of losing relationships through honesty",
      "Overwhelm from psychological insights",
    ],
    greenFlags: [
      "Feeling comfortable with deeper conversations",
      "Interest in psychology, healing, or transformation",
      "Ability to see through surface appearances",
      "Attraction to authentic, intense experiences",
    ],
    redFlags: [
      "Avoiding all conflict or difficult emotions",
      "Staying only in surface-level relationships",
      "Fear of your own psychological depths",
      "Using charm to manipulate rather than transform",
    ],
    doMore: [
      "Explore psychological and spiritual depths",
      "Practice honest, direct communication",
      "Embrace transformative experiences",
      "Trust your intuitive insights about others",
    ],
    doLess: [
      "Avoid conflict at all costs",
      "Stay only on the surface of relationships",
      "Use charm to manipulate situations",
      "Fear your own emotional intensity",
    ],
    keepStable: [
      "Your diplomatic skills and social grace",
      "Appreciation for beauty and aesthetics",
      "Ability to see multiple perspectives",
      "Natural sense of fairness and justice",
    ],
    microShifts: [
      "Having deeper, more honest conversations",
      "Exploring psychology, mysteries, or healing arts",
      "Trusting gut feelings about people's motivations",
      "Choosing authentic experiences over pretty ones",
    ],
    mantra: "I transform through truth and authentic power.",
  },
  {
    fromSign: ZodiacSign.SCORPIO,
    toSign: ZodiacSign.SAGITTARIUS,
    title: "From Water to Fire: From Depth to Expansion",
    summary:
      "Trading psychological intensity for philosophical freedom and adventurous exploration.",

    leavingBehind: [
      "Living in constant psychological analysis (reading between every line)",
      "Fixation on hidden motives, power dynamics, and “what’s really going on”",
      "Emotional heaviness: looping the same wound until it’s solved",
      "Control-through-intensity (testing, probing, withholding, gripping)",
    ],

    comingOnline: [
      "Big-picture meaning: turning hard lessons into principles",
      "Freedom and exploration: new places, new people, new ideas",
      "Lightness and humor that releases pressure (not denial)",
      "Teaching / sharing: speaking truth plainly and moving forward",
    ],

    tradeoffs: [
      "Less obsession with motives, more trust in trajectory",
      "Less intensity-as-default, more spaciousness and perspective",
      "Less secrecy, more direct honesty",
      "Less control, more freedom (for you and others)",
    ],

    friction: [
      "Boredom or restlessness when life isn’t intense (withdrawal from intensity)",
      "Suspicion that optimism is naïve or that people are shallow",
      "Wanting to escape the feeling by moving fast (travel, plans, distractions)",
      "Swinging between cynicism (Scorpio) and preaching (shadow Sag)",
    ],

    greenFlags: [
      "You feel curious again — learning feels energizing, not defensive",
      "You can talk about the past without reliving it",
      "You’re drawn to travel/study/community that expands your worldview",
      "You’re more honest and less controlling in relationships",
    ],

    redFlags: [
      "Spiritual bypass: using “meaning” to avoid grief/anger/intimacy",
      "Dogma: turning your truth into a rigid belief or moral superiority",
      "Escapism: constant movement to outrun emotional residue",
      "Dismissing depth as ‘drama’ (a rebound from Scorpio intensity)",
    ],

    doMore: [
      "Study something that genuinely expands you (philosophy, culture, language, religion, history)",
      "Move your body + move your mind (travel, nature, adventure, new environments)",
      "Tell the truth cleanly (one direct sentence instead of a complex signal)",
      "Share what you’ve learned in a helpful way (teach, mentor, write)",
    ],

    doLess: [
      "Interrogate people to feel safe",
      "Assume there’s always a hidden agenda",
      "Re-open old wounds just to feel intensity",
      "Use certainty as armor (being right > being wise)",
    ],

    keepStable: [
      "Your ability to see what’s real beneath the surface",
      "Your emotional courage and loyalty",
      "Your resilience through hard chapters",
      "Your instinct for truth and transformation",
    ],

    microShifts: [
      "Replace “Why did this happen?” with “What does this teach me?”",
      "Plan one horizon-expander per quarter (trip, course, new community, new subject)",
      "When you want to investigate, ask: “What action would actually help?”",
      "Practice humor after honesty (don’t use humor instead of honesty)",
    ],

    mantra:
      "I carry my truth into the world — with freedom, humor, and direction.",
  },

  {
    fromSign: ZodiacSign.SAGITTARIUS,
    toSign: ZodiacSign.CAPRICORN,
    title: "From Fire to Earth: From Vision to Achievement",
    summary:
      "Trading philosophical exploration for practical mastery and lasting accomplishment.",
    leavingBehind: [
      "Constant seeking and philosophical wandering",
      "Resistance to structure and long-term commitment",
      "Focus on ideas over practical implementation",
      "Impatience with detailed planning and execution",
    ],
    comingOnline: [
      "Disciplined approach to achieving goals",
      "Natural authority and leadership abilities",
      "Focus on building lasting structures and systems",
      "Mastery through patient, persistent effort",
    ],
    tradeoffs: [
      "Less freedom, more responsibility and structure",
      "Less exploration, more focused achievement",
      "Less idealism, more practical realism",
      "Less variety, more sustained commitment",
    ],
    friction: [
      "Feeling constrained by structure and responsibility",
      "Missing the excitement of constant exploration",
      "Impatience with slow, methodical progress",
      "Resistance to long-term commitments",
    ],
    greenFlags: [
      "Finding satisfaction in achieving concrete goals",
      "Natural leadership opportunities arising",
      "Appreciation for structure and organization",
      "Interest in building something lasting and significant",
    ],
    redFlags: [
      "Avoiding all responsibility and commitment",
      "Constantly changing direction without follow-through",
      "Dismissing the need for structure and planning",
      "Escaping into philosophical idealism",
    ],
    doMore: [
      "Set long-term goals and create structured plans",
      "Take on leadership and management responsibilities",
      "Build systems and structures that last",
      "Practice discipline and persistent effort",
    ],
    doLess: [
      "Avoid commitment and long-term planning",
      "Change direction constantly without completion",
      "Dismiss practical concerns for idealistic visions",
      "Resist structure and organizational systems",
    ],
    keepStable: [
      "Your philosophical wisdom and big-picture vision",
      "Natural teaching and inspiring abilities",
      "Optimistic outlook and adventurous spirit",
      "Ability to see possibilities and potential",
    ],
    microShifts: [
      "Creating detailed plans for long-term goals",
      "Taking on leadership roles in organizations",
      "Building daily routines that support achievement",
      "Focusing on quality and lasting results over quick wins",
    ],
    mantra: "I build lasting achievement through disciplined wisdom.",
  },
  {
    fromSign: ZodiacSign.CAPRICORN,
    toSign: ZodiacSign.AQUARIUS,
    title: "From Earth to Air: From Authority to Innovation",
    summary:
      "Trading individual achievement for collective progress and humanitarian innovation.",
    leavingBehind: [
      "Focus on personal status and individual achievement",
      "Rigid adherence to traditional structures",
      "Hierarchical thinking and authority-based power",
      "Conservative approach to change and innovation",
    ],
    comingOnline: [
      "Humanitarian vision and social consciousness",
      "Innovative thinking and progressive ideas",
      "Collaborative approach to solving problems",
      "Freedom from conventional limitations",
    ],
    tradeoffs: [
      "Less individual control, more collective collaboration",
      "Less traditional authority, more innovative influence",
      "Less conservative stability, more progressive change",
      "Less personal achievement, more humanitarian impact",
    ],
    friction: [
      "Discomfort with losing individual control",
      "Resistance to unconventional or progressive ideas",
      "Missing the security of traditional structures",
      "Difficulty trusting group processes over hierarchy",
    ],
    greenFlags: [
      "Interest in social causes and humanitarian work",
      "Excitement about innovative technologies and ideas",
      "Natural networking and community-building abilities",
      "Vision for a better future for humanity",
    ],
    redFlags: [
      "Clinging to outdated hierarchical structures",
      "Avoiding all progressive or innovative ideas",
      "Focusing only on personal achievement and status",
      "Dismissing the importance of collective needs",
    ],
    doMore: [
      "Engage with humanitarian causes and social progress",
      "Embrace innovative technologies and progressive ideas",
      "Build networks and collaborative communities",
      "Use your achievements to benefit the collective",
    ],
    doLess: [
      "Focus solely on personal status and achievement",
      "Resist all change and innovation",
      "Maintain rigid hierarchical thinking",
      "Dismiss the needs and ideas of the collective",
    ],
    keepStable: [
      "Your leadership abilities and organizational skills",
      "Discipline and ability to achieve long-term goals",
      "Practical wisdom and strategic thinking",
      "Respect for quality and lasting results",
    ],
    microShifts: [
      "Joining groups focused on social or humanitarian causes",
      "Exploring new technologies and innovative solutions",
      "Collaborating rather than directing in group settings",
      "Considering the collective impact of your decisions",
    ],
    mantra: "I innovate for humanity's collective progress.",
  },
  {
    fromSign: ZodiacSign.AQUARIUS,
    toSign: ZodiacSign.PISCES,
    title: "From Air to Water: From Innovation to Compassion",
    summary:
      "Trading intellectual detachment for universal compassion and spiritual connection.",
    leavingBehind: [
      "Intellectual detachment and emotional distance",
      "Focus on ideas over feelings and intuition",
      "Rigid adherence to progressive ideologies",
      "Independence that avoids deep emotional connection",
    ],
    comingOnline: [
      "Universal compassion and empathy",
      "Spiritual wisdom and intuitive guidance",
      "Artistic and creative inspiration",
      "Service through love and healing",
    ],
    tradeoffs: [
      "Less intellectual detachment, more emotional connection",
      "Less ideological thinking, more intuitive wisdom",
      "Less independence, more universal oneness",
      "Less progressive activism, more compassionate service",
    ],
    friction: [
      "Overwhelm from increased emotional sensitivity",
      "Difficulty trusting feelings over logical analysis",
      "Missing the clarity of intellectual detachment",
      "Confusion about boundaries and individual identity",
    ],
    greenFlags: [
      "Increased sensitivity to others' emotions and needs",
      "Interest in spirituality, art, or healing practices",
      "Natural compassion and desire to help others",
      "Intuitive insights and creative inspiration",
    ],
    redFlags: [
      "Avoiding all emotional depth and sensitivity",
      "Staying rigidly attached to intellectual analysis",
      "Dismissing spiritual or intuitive experiences",
      "Maintaining emotional distance from others' suffering",
    ],
    doMore: [
      "Develop spiritual practices and intuitive abilities",
      "Express compassion and empathy in daily life",
      "Engage in artistic or creative pursuits",
      "Serve others through healing and love",
    ],
    doLess: [
      "Rely solely on intellectual analysis",
      "Maintain emotional detachment from others",
      "Dismiss feelings and intuitive insights",
      "Avoid spiritual or transcendent experiences",
    ],
    keepStable: [
      "Your innovative thinking and progressive vision",
      "Ability to see the big picture and future possibilities",
      "Humanitarian values and social consciousness",
      "Independence and freedom-loving nature",
    ],
    microShifts: [
      "Practicing meditation or other spiritual disciplines",
      "Creating art, music, or other inspired works",
      "Volunteering for compassionate causes",
      "Trusting intuitive feelings alongside logical analysis",
    ],
    mantra: "I serve through universal love and compassion.",
  },
  {
    fromSign: ZodiacSign.PISCES,
    toSign: ZodiacSign.ARIES,
    title: "From Water to Fire: From Dissolution to Rebirth",
    summary:
      "Trading universal compassion for individual courage and pioneering new beginnings.",
    leavingBehind: [
      "Emotional overwhelm and boundary confusion",
      "Tendency to merge and lose individual identity",
      "Passive acceptance and martyrdom patterns",
      "Escapism and avoidance of direct action",
    ],
    comingOnline: [
      "Individual courage and pioneering spirit",
      "Clear personal boundaries and identity",
      "Direct action and decisive leadership",
      "Fresh energy and new beginnings",
    ],
    tradeoffs: [
      "Less universal compassion, more individual focus",
      "Less emotional sensitivity, more direct action",
      "Less spiritual transcendence, more earthly engagement",
      "Less passive flow, more active initiative",
    ],
    friction: [
      "Missing the spiritual connection and transcendence",
      "Discomfort with increased assertiveness",
      "Guilt about focusing on individual needs",
      "Overwhelm from taking direct action after passivity",
    ],
    greenFlags: [
      "Feeling energized by new projects and initiatives",
      "Clear sense of personal identity and boundaries",
      "Confidence in making decisions and taking action",
      "Excitement about pioneering new directions",
    ],
    redFlags: [
      "Avoiding all individual responsibility and action",
      "Staying lost in spiritual bypassing or escapism",
      "Maintaining victim or martyr patterns",
      "Fear of asserting personal needs and boundaries",
    ],
    doMore: [
      "Take initiative on projects that excite you",
      "Assert your individual needs and boundaries",
      "Make quick decisions and take direct action",
      "Pioneer new directions with courage and confidence",
    ],
    doLess: [
      "Lose yourself in others' needs and emotions",
      "Avoid taking action or making decisions",
      "Escape into fantasy or spiritual bypassing",
      "Accept victim or martyr roles passively",
    ],
    keepStable: [
      "Your spiritual wisdom and compassionate nature",
      "Intuitive abilities and creative inspiration",
      "Understanding of universal connection",
      "Healing and artistic gifts",
    ],
    microShifts: [
      "Starting new projects with enthusiasm and energy",
      "Speaking up for your needs in relationships",
      "Making quick decisions without endless deliberation",
      "Taking leadership roles in areas you care about",
    ],
    mantra: "I courageously pioneer my authentic path.",
  },
];

export function chapterFor(sign: string): ProgressedSunChapter | undefined {
  return progressedSunChapters.find((c) => c.sign === sign);
}

export function ingressFor(sign: string): ProgressionIngress | undefined {
  return progressionIngress.find((i) => i.toSign === sign);
}

export function dossierFor(
  from: string,
  to: string,
): ProgressedSunTransitionDossier | undefined {
  return transitionDossiers.find((d) => d.fromSign === from && d.toSign === to);
}

/** The band for a degree within a sign, with that sign's overlay drawn out. */
export function bandFor(degree: number, sign: string): DegreeBand {
  const phase = degree < 10 ? "early" : degree < 20 ? "middle" : "late";
  const band = degreeBands.find((b) => b.phase === phase)!;
  return {
    ...band,
    signOverlay: band.signSpecificOverlay?.[sign as ZodiacSign],
  };
}

/** The named band, with the sign's overlay drawn out. */
export function bandNamed(phase: DegreeBand["phase"], sign: string): DegreeBand {
  const band = degreeBands.find((b) => b.phase === phase)!;
  return { ...band, signOverlay: band.signSpecificOverlay?.[sign as ZodiacSign] };
}
