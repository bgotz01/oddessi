// House Categories with Core Themes
// Revised for tighter language, clearer engines, and consistent tone
//
// THE source for house titles. Every page that names a house — Growth, Houses,
// Cycles, Flow & Grind, the birth chart — reads `getHouseTitle` from here, and
// the older table (`HOUSE_INFO.name` in houses/houses) is derived from it
// rather than written out again. There were
// four copies, and the ninth house was called four different things. Rename a
// house here and nowhere else.
//
// The same goes for what a house *means* at the top level — type, essence,
// keywords, the external / internal pair, and the core themes all live here.
// Every drawer, card and tooltip that tags a house reads `keywords` from here. Purpose-built
// tables elsewhere (growth arenas, synastry, the vendored prose in
// houses/houses.ts) write a house for one job and say why they differ.

export type House = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** Angular / Succedent / Cadent — positional, so computed rather than tabled. */
export type HouseType = "Angular" | "Succedent" | "Cadent";

export function getHouseType(house: House): HouseType {
    return (["Angular", "Succedent", "Cadent"] as const)[(house - 1) % 3];
}

export interface HouseCategory {
    house: House;
    title: string; // Short title for UI display
    essence: string; // The house in one first-person line — "Who I am."
    keywords: string[]; // Five one-word tags spanning both readings — the general layer
    // Every house reads two ways: literally, as the people, money, places and
    // events of the outer world, and inwardly, as the need or attitude those
    // things stand for. Shown side by side on Houses and Cycles.
    external: string;
    internal: string;
    // The detailed breakdown, split along the same external / internal line.
    coreThemes: { external: string[]; internal: string[] };
}

export const HOUSE_CATEGORIES: Record<House, HouseCategory> = {
    1: {
        house: 1,
        title: "Self & Identity",
        essence: "Who I am.",
        keywords: ["Self", "Body", "Identity", "Initiative", "Presence"],
        external: "Body, appearance, physical presence, first impressions",
        internal: "Identity, self-concept, instinctive approach to life",
        coreThemes: {
            external: [
                "Physical body & appearance",
                "First impressions & presentation",
                "How you initiate action"
            ],
            internal: [
                "Instinctive approach to life",
                "Autonomy, agency, and self-direction",
                "Identity style: how you take up space"
            ]
        }
    },
    2: {
        house: 2,
        title: "Money & Values",
        essence: "What is mine.",
        keywords: ["Money", "Possessions", "Values", "Self-Worth", "Security"],
        external: "Money, possessions, income, material resources",
        internal: "Self-worth, values, what feels valuable or “mine”",
        coreThemes: {
            external: [
                "Money, possessions, and assets",
                "Talents you can monetize",
                "Earning power & security needs"
            ],
            internal: [
                "Personal values & priorities",
                "Self-worth & valuation",
                "Relationship with stability and scarcity"
            ]
        }
    },
    3: {
        house: 3,
        title: "Mind & Communication",
        essence: "What I think.",
        keywords: ["Mind", "Communication", "Learning", "Siblings", "Neighborhood"],
        external: "Siblings, neighbors, local environment, short trips, writing and speaking",
        internal: "Thinking patterns, curiosity, perception, how you process information",
        coreThemes: {
            external: [
                "Communication: speaking, writing, messaging",
                "Siblings, peers, and early environment",
                "Local community & daily context",
                "Short trips, movement, logistics"
            ],
            internal: [
                "Thinking style & mental processing",
                "Curiosity, skills, and information exchange"
            ]
        }
    },
    4: {
        house: 4,
        title: "Home & Family",
        essence: "Where I belong.",
        keywords: ["Home", "Family", "Roots", "Ancestry", "Belonging"],
        external: "Home, family, ancestry, property, private life",
        internal: "Emotional security, roots, inherited belonging, inner foundation",
        coreThemes: {
            external: [
                "Home, household, and private life",
                "Family, ancestry, and lineage",
                "Property, land, and rootedness"
            ],
            internal: [
                "Emotional foundation & safety",
                "Early conditioning & caregiver imprints",
                "Belonging: where you restore yourself"
            ]
        }
    },
    5: {
        house: 5,
        title: "Creativity & Pleasure",
        essence: "What I create.",
        keywords: ["Creativity", "Romance", "Children", "Play", "Self-Expression"],
        external: "Children, dating, hobbies, art, entertainment",
        internal: "Joy, self-expression, play, the desire to create and be seen",
        coreThemes: {
            external: [
                "Romance & courtship (expressive, not contractual)",
                "Children (literal or symbolic creations)",
                "Risk, speculation, and bold bets",
                "Performance & visibility (being seen by choice)"
            ],
            internal: [
                "Creative authorship (making something new)",
                "Play as life-force (for its own sake)"
            ]
        }
    },
    6: {
        house: 6,
        title: "Work & Health",
        essence: "How I live each day.",
        keywords: ["Work", "Health", "Routine", "Service", "Duty"],
        external: "Daily work, service, routines, health and illness",
        internal: "Discipline, usefulness, self-improvement, relationship to duty",
        coreThemes: {
            external: [
                "Daily work, routines, and practical duties",
                "Health, illness, habits, and maintenance",
                "Coworkers, employees, and pets"
            ],
            internal: [
                "Service, contribution, and usefulness",
                "Responsibility, repair, and problem-solving",
                "Skill-building and continuous improvement"
            ]
        }
    },
    7: {
        house: 7,
        title: "Relationships & Partnership",
        essence: "Who I join with.",
        keywords: ["Partnership", "Marriage", "Contracts", "Rivals", "Projection"],
        external: "Marriage, partners, contracts, rivals and adversaries",
        internal: "Relationship to others, projection, reciprocity, qualities sought in others",
        coreThemes: {
            external: [
                "Committed partnership and marriage",
                "Business partners and collaborators",
                "Conflict, opposition, and open rivals",
                "Contracts, negotiation, and legal matters"
            ],
            internal: [
                "One-on-one relational dynamics",
                "Projection: what you seek (or avoid) in others"
            ]
        }
    },
    8: {
        house: 8,
        title: "Intimacy & Shared Resources",
        essence: "What is ours.",
        keywords: ["Intimacy", "Shared Money", "Death", "Power", "Transformation"],
        external: "Shared money, debt, taxes, inheritance, sex, death",
        internal: "Trust, vulnerability, merging, loss, psychological transformation",
        coreThemes: {
            external: [
                "Death, mortality, and material endings",
                "Shared resources, debt, and inheritance",
                "Taxes, obligations, and financial entanglements"
            ],
            internal: [
                "Power, control, and trust",
                "Intimacy & soul-bonding",
                "Trauma, shadow, and taboo knowledge",
                "Loss, surrender, and psychological rebirth"
            ]
        }
    },
    9: {
        house: 9,
        title: "Beliefs & Exploration",
        essence: "What I believe.",
        keywords: ["Belief", "Travel", "Higher Education", "Philosophy", "Truth"],
        external: "Foreign travel, higher education, publishing, law and religion",
        internal: "Meaning, worldview, faith, philosophy, the search for truth",
        coreThemes: {
            external: [
                "Higher education & advanced study",
                "Long-distance travel & foreign cultures",
                "Publishing, teaching, broadcasting"
            ],
            internal: [
                "Philosophy, ethics, and worldview",
                "Religion, spirituality, belief systems",
                "Meaning-making and truth seeking"
            ]
        }
    },
    10: {
        house: 10,
        title: "Career & Public Life",
        essence: "What I become known for.",
        keywords: ["Career", "Status", "Reputation", "Authority", "Ambition"],
        external: "Career, status, authority, reputation, public achievements",
        internal: "Ambition, responsibility, vocation, what you want to become known for",
        coreThemes: {
            external: [
                "Career, vocation, and life direction",
                "Reputation, status, and visibility",
                "Authority, governance, and institutions"
            ],
            internal: [
                "Ambition, milestones, and responsibility",
                "Achievement and accountability",
                "Legacy: what you are known for"
            ]
        }
    },
    11: {
        house: 11,
        title: "Friends & Networks",
        essence: "Who I connect with.",
        keywords: ["Friends", "Groups", "Networks", "Ideals", "Future"],
        external: "Friends, groups, organizations, networks, gains",
        internal: "Chosen belonging, ideals, aspirations, vision of the future",
        coreThemes: {
            external: [
                "Friends, allies, and supporters",
                "Groups, organizations, and communities",
                "Networks: access, introductions, social capital",
                "Gains, support, and opportunities through others"
            ],
            internal: [
                "Shared missions and collective goals",
                "Future orientation: plans and trajectories"
            ]
        }
    },
    12: {
        house: 12,
        title: "Inner World & Retreat",
        essence: "What exists beneath the surface.",
        keywords: ["Solitude", "Retreat", "Unconscious", "Surrender", "Transcendence"],
        external: "Retreat, institutions, isolation, seclusion, things occurring out of sight",
        internal: "Unconscious patterns, self-undoing, surrender, solitude, transcendence",
        coreThemes: {
            external: [
                "Solitude, retreat, and restoration",
                "Behind-the-scenes work and invisible labor",
                "Hidden enemies: internal and external"
            ],
            internal: [
                "Subconscious patterns and hidden motivations",
                "Dreams, intuition, and liminal states",
                "Compassion, surrender, and acceptance",
                "Sacrifice and self-undoing (when unconscious)"
            ]
        }
    }
};

// Helper functions
export function getHouseCategory(house: House): HouseCategory {
    return HOUSE_CATEGORIES[house];
}

export function getHouseTitle(house: House): string {
    return HOUSE_CATEGORIES[house].title;
}

export function getHouseEssence(house: House): string {
    return HOUSE_CATEGORIES[house].essence;
}

export function getHouseMeanings(house: House): { external: string; internal: string } {
    const { external, internal } = HOUSE_CATEGORIES[house];
    return { external, internal };
}

/** Every core theme, external first — for callers that want one flat list. */
export function getHouseCoreThemes(house: House): string[] {
    const { external, internal } = HOUSE_CATEGORIES[house].coreThemes;
    return [...external, ...internal];
}
