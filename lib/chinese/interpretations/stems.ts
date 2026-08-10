// Heavenly Stems (天干) — Base archetypes and keywords
// 10 stems: reusable essence that adapts to pillar position

import type { HeavenlyStem } from "./types";
import type { ChineseElement, YinYang } from "./types";

export interface StemArchetype {
    id: HeavenlyStem;
    name: string;
    chineseName: string;
    element: ChineseElement;
    polarity: YinYang;
    emoji: string;
    metaphor: string;
    essence: string;           // core nature (1 line)
    keywords: string[];        // 3-5 scannable traits
    voice: string;             // "I am..." statement
}

/**
 * Base stem meanings — reusable across all pillar positions
 * These are the raw archetypes before position lens is applied
 */
export const STEM_ARCHETYPES: Record<HeavenlyStem, StemArchetype> = {
    0: { // Jia (甲) - Yang Wood
        id: 0,
        name: "Yang Wood",
        chineseName: "甲 (Jiǎ)",
        element: "Wood",
        polarity: "Yang",
        emoji: "🌳",
        metaphor: "Tree",
        essence: "Expands, leads, and pushes through obstacles",
        keywords: ["growth", "leadership", "directional", "pioneering", "resilient"],
        voice: "I grow upward and forward"
    },
    1: { // Yi (乙) - Yin Wood
        id: 1,
        name: "Yin Wood",
        chineseName: "乙 (Yǐ)",
        element: "Wood",
        polarity: "Yin",
        emoji: "🌿",
        metaphor: "Vine",
        essence: "Adapts, weaves, and advances through finesse",
        keywords: ["adaptable", "diplomatic", "strategic", "flexible", "subtle"],
        voice: "I grow around and through"
    },
    2: { // Bing (丙) - Yang Fire
        id: 2,
        name: "Yang Fire",
        chineseName: "丙 (Bǐng)",
        element: "Fire",
        polarity: "Yang",
        emoji: "☀️",
        metaphor: "Sun",
        essence: "Radiates outward and leads through visibility",
        keywords: ["radiant", "inspiring", "visible", "energizing", "expressive"],
        voice: "I shine and illuminate"
    },
    3: { // Ding (丁) - Yin Fire
        id: 3,
        name: "Yin Fire",
        chineseName: "丁 (Dīng)",
        element: "Fire",
        polarity: "Yin",
        emoji: "🕯️",
        metaphor: "Candle",
        essence: "Focuses, refines, and guides with precision",
        keywords: ["focused", "refined", "insightful", "precise", "transformative"],
        voice: "I concentrate and perfect"
    },
    4: { // Wu (戊) - Yang Earth
        id: 4,
        name: "Yang Earth",
        chineseName: "戊 (Wù)",
        element: "Earth",
        polarity: "Yang",
        emoji: "⛰️",
        metaphor: "Mountain",
        essence: "Stabilizes, protects, and holds the line",
        keywords: ["stable", "protective", "authoritative", "grounded", "dependable"],
        voice: "I stand firm and provide foundation"
    },
    5: { // Ji (己) - Yin Earth
        id: 5,
        name: "Yin Earth",
        chineseName: "己 (Jǐ)",
        element: "Earth",
        polarity: "Yin",
        emoji: "🌱",
        metaphor: "Soil",
        essence: "Supports, cultivates, and improves what exists",
        keywords: ["nurturing", "practical", "supportive", "cultivating", "refining"],
        voice: "I nourish and sustain growth"
    },
    6: { // Geng (庚) - Yang Metal
        id: 6,
        name: "Yang Metal",
        chineseName: "庚 (Gēng)",
        element: "Metal",
        polarity: "Yang",
        emoji: "⚔️",
        metaphor: "Blade",
        essence: "Cuts through, decides, and reforms",
        keywords: ["decisive", "courageous", "reforming", "sharp", "principled"],
        voice: "I cut through and forge truth"
    },
    7: { // Xin (辛) - Yin Metal
        id: 7,
        name: "Yin Metal",
        chineseName: "辛 (Xīn)",
        element: "Metal",
        polarity: "Yin",
        emoji: "💎",
        metaphor: "Jewel",
        essence: "Distills value and perfects quality",
        keywords: ["discerning", "refined", "quality-focused", "selective", "precious"],
        voice: "I refine and reveal value"
    },
    8: { // Ren (壬) - Yang Water
        id: 8,
        name: "Yang Water",
        chineseName: "壬 (Rén)",
        element: "Water",
        polarity: "Yang",
        emoji: "🌊",
        metaphor: "Ocean",
        essence: "Strategizes, scales, and reshapes the landscape",
        keywords: ["strategic", "adaptable", "far-seeing", "powerful", "systemic"],
        voice: "I flow and reshape at scale"
    },
    9: { // Gui (癸) - Yin Water
        id: 9,
        name: "Yin Water",
        chineseName: "癸 (Guǐ)",
        element: "Water",
        polarity: "Yin",
        emoji: "🌧️",
        metaphor: "Rain",
        essence: "Acts through timing, subtlety, and precision",
        keywords: ["perceptive", "intelligent", "timely", "subtle", "precise"],
        voice: "I act at the perfect moment"
    },
};

/**
 * Get stem archetype by ID
 */
export function getStemArchetype(stem: HeavenlyStem): StemArchetype {
    return STEM_ARCHETYPES[stem];
}

/**
 * Get all stem archetypes
 */
export function getAllStemArchetypes(): StemArchetype[] {
    return Object.values(STEM_ARCHETYPES);
}
