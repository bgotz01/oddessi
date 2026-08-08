// House Categories with Core Themes
// Revised for tighter language, clearer engines, and consistent tone

export type House = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface HouseCategory {
    house: House;
    title: string; // Short title for UI display
    coreThemes: string[]; // Detailed thematic breakdown
}

export const HOUSE_CATEGORIES: Record<House, HouseCategory> = {
    1: {
        house: 1,
        title: "Self & Identity",
        coreThemes: [
            "Physical body & appearance",
            "First impressions & presentation",
            "Instinctive approach to life",
            "Autonomy, agency, and self-direction",
            "How you initiate action",
            "Identity style: how you take up space"
        ]
    },
    2: {
        house: 2,
        title: "Values & Resources",
        coreThemes: [
            "Personal values & priorities",
            "Money, possessions, and assets",
            "Self-worth & valuation",
            "Talents you can monetize",
            "Earning power & security needs",
            "Relationship with stability and scarcity"
        ]
    },
    3: {
        house: 3,
        title: "Mind & Communication",
        coreThemes: [
            "Thinking style & mental processing",
            "Communication: speaking, writing, messaging",
            "Siblings, peers, and early environment",
            "Local community & daily context",
            "Short trips, movement, logistics",
            "Curiosity, skills, and information exchange"
        ]
    },
    4: {
        house: 4,
        title: "Home & Roots",
        coreThemes: [
            "Home, privacy, and inner life",
            "Family, ancestry, and lineage",
            "Emotional foundation & safety",
            "Early conditioning & caregiver imprints",
            "Property, land, and rootedness",
            "Belonging: where you restore yourself"
        ]
    },
    5: {
        house: 5,
        title: "Creativity & Expression",
        coreThemes: [
            "Creative authorship (making something new)",
            "Play as life-force (for its own sake)",
            "Romance & courtship (expressive, not contractual)",
            "Children (literal or symbolic creations)",
            "Risk, speculation, and bold bets",
            "Performance & visibility (being seen by choice)"
        ]
    },
    6: {
        house: 6,
        title: "Work & Health",
        coreThemes: [
            "Daily work, routines, and discipline",
            "Health, habits, and optimization",
            "Service, contribution, and usefulness",
            "Responsibility, repair, and problem-solving",
            "Coworkers, employees, and pets",
            "Skill-building and continuous improvement"
        ]
    },
    7: {
        house: 7,
        title: "Partnership & Exchange",
        coreThemes: [
            "Committed partnership and marriage",
            "Business partners and collaborators",
            "One-on-one relational dynamics",
            "Conflict, opposition, and open rivals",
            "Contracts, negotiation, and legal matters",
            "Projection: what you seek (or avoid) in others"
        ]
    },
    8: {
        house: 8,
        title: "Transformation & Shared Resources",
        coreThemes: [
            "Death & rebirth (psychological)",
            "Power, control, trust",
            "Intimacy & soul-bonding",
            "Shared resources, debt, inheritance",
            "Trauma, shadow, taboo knowledge"
        ]
    },
    9: {
        house: 9,
        title: "Belief & Meaning",
        coreThemes: [
            "Higher education & advanced study",
            "Philosophy, ethics, and worldview",
            "Religion, spirituality, belief systems",
            "Long-distance travel & foreign cultures",
            "Publishing, teaching, broadcasting",
            "Meaning-making and truth seeking"
        ]
    },
    10: {
        house: 10,
        title: "Career & Status",
        coreThemes: [
            "Career, vocation, and life direction",
            "Reputation, status, and visibility",
            "Authority, governance, and institutions",
            "Ambition, milestones, and responsibility",
            "Achievement and accountability",
            "Legacy: what you are known for"
        ]
    },
    11: {
        house: 11,
        title: "Networks & Collective",
        coreThemes: [
            "Friends, allies, and supporters",
            "Groups, organizations, and communities",
            "Networks: access, introductions, social capital",
            "Shared missions and collective goals",
            "Future orientation: plans and trajectories",
            "Impact and contribution through people"
        ]
    },
    12: {
        house: 12,
        title: "Inner World & Retreat",
        coreThemes: [
            "Solitude, retreat, and restoration",
            "Subconscious patterns and hidden motivations",
            "Dreams, intuition, and liminal states",
            "Compassion, surrender, and acceptance",
            "Sacrifice and self-undoing (when unconscious)",
            "Behind-the-scenes work and invisible labor",
            "Hidden enemies: internal and external"
        ]
    }
};

// Helper functions
export function getHouseCategory(house: House): HouseCategory {
    return HOUSE_CATEGORIES[house];
}

export function getHouseTitle(house: House): string {
    return HOUSE_CATEGORIES[house].title;
}

export function getHouseCoreThemes(house: House): string[] {
    return HOUSE_CATEGORIES[house].coreThemes;
}
