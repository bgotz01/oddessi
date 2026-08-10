// Earthly Branches (地支) — Base archetypes and hidden stems
// 12 branches: reusable essence that adapts to pillar position
//
// Notes:
// - Branch "element" here is the branch's primary Qi (not a full strength model).
// - Hidden stem weights are simplified and intended for UX, not strength scoring.
// - Keep language position-agnostic (no “career/parents/spouse/children” here).

import type { EarthlyBranch, HeavenlyStem } from "./types";
import type { ChineseElement } from "./types";

// ============================================================================
// TYPES
// ============================================================================

export interface HiddenStemInfo {
    stem: HeavenlyStem;
    stemName: string;
    element: ChineseElement;
    weight: number; // 0..1 (relative influence inside this branch)
    role: "primary" | "secondary" | "residual";
}

export interface BranchArchetype {
    id: EarthlyBranch;

    // Labels
    name: string; // Animal label (Rat, Ox...)
    chineseName: string; // 子 (Zǐ)
    zodiacAnimal: string; // Rat (redundant, but useful for UI filters)

    // Core properties
    element: ChineseElement; // primary Qi
    emoji: string;

    // Content
    metaphor: string; // 1–3 words, poetic
    essence: string; // 1 sentence, position-agnostic
    keywords: string[]; // 3–6 scannable traits (avoid duplicates)

    // Structure
    hiddenStems: HiddenStemInfo[]; // typically 1–3
}

// ============================================================================
// DATA
// ============================================================================

/**
 * Base branch meanings — reusable across all pillar positions.
 * These are archetypes BEFORE any position lens is applied.
 */
export const BRANCH_ARCHETYPES: Record<EarthlyBranch, BranchArchetype> = {
    // 0 — 子 Zi — Rat — Water
    0: {
        id: 0,
        name: "Rat",
        chineseName: "子 (Zǐ)",
        zodiacAnimal: "Rat",
        element: "Water",
        emoji: "🐀",
        metaphor: "Midnight signal",
        essence: "Quick-minded and resourceful — senses openings early and moves fast.",
        keywords: ["resourceful", "observant", "quick", "adaptive", "opportunistic"],
        hiddenStems: [{ stem: 9, stemName: "Yin Water", element: "Water", weight: 1.0, role: "primary" }],
    },

    // 1 — 丑 Chou — Ox — Earth (storehouse)
    1: {
        id: 1,
        name: "Ox",
        chineseName: "丑 (Chǒu)",
        zodiacAnimal: "Ox",
        element: "Earth",
        emoji: "🐂",
        metaphor: "Winter storehouse",
        essence: "Patient and enduring — builds slowly, carries weight, and accumulates over time.",
        keywords: ["patient", "enduring", "methodical", "steady", "accumulating"],
        hiddenStems: [
            { stem: 5, stemName: "Yin Earth", element: "Earth", weight: 0.6, role: "primary" },
            { stem: 9, stemName: "Yin Water", element: "Water", weight: 0.3, role: "secondary" },
            { stem: 7, stemName: "Yin Metal", element: "Metal", weight: 0.1, role: "residual" },
        ],
    },

    // 2 — 寅 Yin — Tiger — Wood
    2: {
        id: 2,
        name: "Tiger",
        chineseName: "寅 (Yín)",
        zodiacAnimal: "Tiger",
        element: "Wood",
        emoji: "🐅",
        metaphor: "Spring ignition",
        essence: "Bold and initiating — pushes into new terrain and starts motion.",
        keywords: ["bold", "initiating", "courageous", "driven", "pioneering"],
        hiddenStems: [
            { stem: 0, stemName: "Yang Wood", element: "Wood", weight: 0.6, role: "primary" },
            { stem: 2, stemName: "Yang Fire", element: "Fire", weight: 0.3, role: "secondary" },
            { stem: 4, stemName: "Yang Earth", element: "Earth", weight: 0.1, role: "residual" },
        ],
    },

    // 3 — 卯 Mao — Rabbit — Wood
    3: {
        id: 3,
        name: "Rabbit",
        chineseName: "卯 (Mǎo)",
        zodiacAnimal: "Rabbit",
        element: "Wood",
        emoji: "🐇",
        metaphor: "Spring bloom",
        essence: "Gentle and connective — grows through harmony, taste, and timing.",
        keywords: ["gentle", "diplomatic", "sensitive", "artistic", "harmonizing"],
        hiddenStems: [{ stem: 1, stemName: "Yin Wood", element: "Wood", weight: 1.0, role: "primary" }],
    },

    // 4 — 辰 Chen — Dragon — Earth (reservoir)
    4: {
        id: 4,
        name: "Dragon",
        chineseName: "辰 (Chén)",
        zodiacAnimal: "Dragon",
        element: "Earth",
        emoji: "🐉",
        metaphor: "Reservoir of potential",
        essence: "Transformative and catalytic — holds pressure, stores momentum, and turns cycles.",
        keywords: ["transformative", "visionary", "potent", "ambitious", "mysterious"],
        hiddenStems: [
            { stem: 4, stemName: "Yang Earth", element: "Earth", weight: 0.6, role: "primary" },
            { stem: 1, stemName: "Yin Wood", element: "Wood", weight: 0.3, role: "secondary" },
            { stem: 9, stemName: "Yin Water", element: "Water", weight: 0.1, role: "residual" },
        ],
    },

    // 5 — 巳 Si — Snake — Fire
    5: {
        id: 5,
        name: "Snake",
        chineseName: "巳 (Sì)",
        zodiacAnimal: "Snake",
        element: "Fire",
        emoji: "🐍",
        metaphor: "Focused heat",
        essence: "Perceptive and strategic — sees patterns, concentrates energy, and transforms through insight.",
        keywords: ["perceptive", "strategic", "focused", "intense", "transformative"],
        hiddenStems: [
            { stem: 2, stemName: "Yang Fire", element: "Fire", weight: 0.6, role: "primary" },
            { stem: 4, stemName: "Yang Earth", element: "Earth", weight: 0.3, role: "secondary" },
            { stem: 6, stemName: "Yang Metal", element: "Metal", weight: 0.1, role: "residual" },
        ],
    },

    // 6 — 午 Wu — Horse — Fire
    6: {
        id: 6,
        name: "Horse",
        chineseName: "午 (Wǔ)",
        zodiacAnimal: "Horse",
        element: "Fire",
        emoji: "🐴",
        metaphor: "Solar peak",
        essence: "Dynamic and expressive — moves with conviction, momentum, and visible energy.",
        keywords: ["dynamic", "expressive", "independent", "energetic", "bold"],
        hiddenStems: [
            { stem: 3, stemName: "Yin Fire", element: "Fire", weight: 0.7, role: "primary" },
            { stem: 5, stemName: "Yin Earth", element: "Earth", weight: 0.3, role: "secondary" },
        ],
    },

    // 7 — 未 Wei — Goat — Earth
    7: {
        id: 7,
        name: "Goat",
        chineseName: "未 (Wèi)",
        zodiacAnimal: "Goat",
        element: "Earth",
        emoji: "🐐",
        metaphor: "Cultivated field",
        essence: "Nurturing and aesthetic — cultivates comfort, beauty, and steady improvement.",
        keywords: ["nurturing", "aesthetic", "gentle", "cultivating", "supportive"],
        hiddenStems: [
            { stem: 5, stemName: "Yin Earth", element: "Earth", weight: 0.6, role: "primary" },
            { stem: 3, stemName: "Yin Fire", element: "Fire", weight: 0.3, role: "secondary" },
            { stem: 1, stemName: "Yin Wood", element: "Wood", weight: 0.1, role: "residual" },
        ],
    },

    // 8 — 申 Shen — Monkey — Metal
    8: {
        id: 8,
        name: "Monkey",
        chineseName: "申 (Shēn)",
        zodiacAnimal: "Monkey",
        element: "Metal",
        emoji: "🐵",
        metaphor: "Autumn strategist",
        essence: "Clever and versatile — solves through systems, timing, and inventive pivots.",
        keywords: ["clever", "versatile", "strategic", "inventive", "fast-thinking"],
        hiddenStems: [
            { stem: 6, stemName: "Yang Metal", element: "Metal", weight: 0.6, role: "primary" },
            { stem: 8, stemName: "Yang Water", element: "Water", weight: 0.3, role: "secondary" },
            { stem: 4, stemName: "Yang Earth", element: "Earth", weight: 0.1, role: "residual" },
        ],
    },

    // 9 — 酉 You — Rooster — Metal
    9: {
        id: 9,
        name: "Rooster",
        chineseName: "酉 (Yǒu)",
        zodiacAnimal: "Rooster",
        element: "Metal",
        emoji: "🐓",
        metaphor: "Autumn refinement",
        essence: "Precise and discerning — sharpens quality, spots flaws, and elevates standards.",
        keywords: ["precise", "discerning", "organized", "refining", "direct"],
        hiddenStems: [{ stem: 7, stemName: "Yin Metal", element: "Metal", weight: 1.0, role: "primary" }],
    },

    // 10 — 戌 Xu — Dog — Earth (guard)
    10: {
        id: 10,
        name: "Dog",
        chineseName: "戌 (Xū)",
        zodiacAnimal: "Dog",
        element: "Earth",
        emoji: "🐕",
        metaphor: "Autumn guardian",
        essence: "Loyal and principled — protects what matters and holds the line under pressure.",
        keywords: ["loyal", "principled", "protective", "honest", "vigilant"],
        hiddenStems: [
            { stem: 4, stemName: "Yang Earth", element: "Earth", weight: 0.6, role: "primary" },
            { stem: 7, stemName: "Yin Metal", element: "Metal", weight: 0.3, role: "secondary" },
            { stem: 3, stemName: "Yin Fire", element: "Fire", weight: 0.1, role: "residual" },
        ],
    },

    // 11 — 亥 Hai — Pig — Water
    11: {
        id: 11,
        name: "Pig",
        chineseName: "亥 (Hài)",
        zodiacAnimal: "Pig",
        element: "Water",
        emoji: "🐷",
        metaphor: "Winter abundance",
        essence: "Sincere and expansive — relaxes into trust, generosity, and deep replenishment.",
        keywords: ["sincere", "generous", "replenishing", "peaceful", "open-hearted"],
        hiddenStems: [
            { stem: 8, stemName: "Yang Water", element: "Water", weight: 0.7, role: "primary" },
            { stem: 0, stemName: "Yang Wood", element: "Wood", weight: 0.3, role: "secondary" },
        ],
    },
};

// ============================================================================
// ACCESSORS
// ============================================================================

export function getBranchArchetype(branch: EarthlyBranch): BranchArchetype {
    return BRANCH_ARCHETYPES[branch];
}

export function getAllBranchArchetypes(): BranchArchetype[] {
    return Object.values(BRANCH_ARCHETYPES);
}
