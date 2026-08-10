// Day Master (日主) — the core "you" in BaZi
// Centralized Day Master content: types, narratives, and helpers.
//
// Notes:
// - Day Master is ALWAYS the Day Pillar's Heavenly Stem.
// - This file should NOT depend on runtime require() (keeps bundling clean).
// - Pull archetype info from the shared stem content layer (stems.ts).

import type { HeavenlyStem } from "./types";
import type { ChineseElement, YinYang } from "./types";
import { getStemArchetype } from "./stems";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Day Master (日主)
 * The Heavenly Stem of the Day Pillar — your reference point.
 */
export interface DayMaster {
    stem: HeavenlyStem;
    name: string; // e.g. "Yang Metal"
    element: ChineseElement;
    polarity: YinYang;

    // Archetype (from stems content)
    emoji: string;
    metaphor: string;
    description: string; // short one-liner
}

/**
 * Extended narrative (Phase 2)
 * Used for dedicated Day Master deep-dive pages.
 */
export interface DayMasterNarrative {
    strengths: string[];
    challenges: string[];
    coreNeed: string;
    growthPath: string;
    lifeTheme: string;
}

// ============================================================================
// NARRATIVES
// ============================================================================

/**
 * Extended narratives for each Day Master.
 * Keep these universal (not tied to any pillar position).
 */
export const DAY_MASTER_NARRATIVES: Record<HeavenlyStem, DayMasterNarrative> = {
    0: {
        // Jia 甲 — Yang Wood
        strengths: ["Initiates growth and leads from the front", "Strong directional instinct", "Resilient under resistance"],
        challenges: ["Can become rigid or forceful", "Difficulty yielding or delegating", "Risk of growing faster than support allows"],
        coreNeed: "Freedom to grow with a clear direction",
        growthPath: "Learn when to push and when to bend so growth remains sustainable",
        lifeTheme: "The pioneer who opens new paths",
    },
    1: {
        // Yi 乙 — Yin Wood
        strengths: ["Highly adaptable and diplomatic", "Sensitive to nuance and context", "Thrives in complex environments"],
        challenges: ["May yield too much", "Difficulty asserting direction", "Can lose form without structure"],
        coreNeed: "Supportive structure with room to adapt",
        growthPath: "Develop a stronger inner spine while keeping flexibility",
        lifeTheme: "The strategist who advances through subtlety",
    },
    2: {
        // Bing 丙 — Yang Fire
        strengths: ["Natural visibility and presence", "Energizes and inspires others", "Leads by example"],
        challenges: ["Can overexpose or overextend", "Energy may fluctuate", "Risk of burnout"],
        coreNeed: "A mission worthy of sustained attention",
        growthPath: "Balance radiance with rhythm to avoid exhaustion",
        lifeTheme: "The beacon that lights the way",
    },
    3: {
        // Ding 丁 — Yin Fire
        strengths: ["Focused, refined, and insightful", "Strong inner vision", "Transforms through precision"],
        challenges: ["Over-concentration", "Perfectionism", "Difficulty being seen"],
        coreNeed: "Protection for focus and refinement",
        growthPath: "Allow your light to reach beyond controlled spaces",
        lifeTheme: "The artisan who perfects the flame",
    },
    4: {
        // Wu 戊 — Yang Earth
        strengths: ["Stable and dependable", "Commands natural authority", "Provides structure for others"],
        challenges: ["Resistance to change", "Over-control", "Inertia"],
        coreNeed: "Responsibility paired with trust",
        growthPath: "Learn to adapt without losing stability",
        lifeTheme: "The foundation that supports all things",
    },
    5: {
        // Ji 己 — Yin Earth
        strengths: ["Nurturing and practical", "Excellent at refinement and upkeep", "Supports long-term growth"],
        challenges: ["Over-giving", "Blurring self vs others", "Under-recognition"],
        coreNeed: "Appreciation and clear boundaries",
        growthPath: "Value your role while preserving your own resources",
        lifeTheme: "The cultivator who makes growth possible",
    },
    6: {
        // Geng 庚 — Yang Metal
        strengths: ["Decisive and courageous", "Cuts through confusion", "Strong moral compass"],
        challenges: ["Excessive hardness", "Unnecessary conflict", "Isolation through sharpness"],
        coreNeed: "A worthy challenge to refine strength",
        growthPath: "Temper force with discernment and compassion",
        lifeTheme: "The blade that forges truth",
    },
    7: {
        // Xin 辛 — Yin Metal
        strengths: ["Exceptional discernment", "Refined standards", "Sensitivity to quality"],
        challenges: ["Over-selectivity", "Difficulty tolerating imperfection", "Withdrawal from the ordinary"],
        coreNeed: "Quality environments and meaningful craft",
        growthPath: "Engage the world without losing refinement",
        lifeTheme: "The jeweler who reveals hidden value",
    },
    8: {
        // Ren 壬 — Yang Water
        strengths: ["Strategic and far-seeing", "Highly adaptable", "Understands large systems"],
        challenges: ["Diffusion of focus", "Over-extension", "Lack of depth"],
        coreNeed: "Scale with strategic freedom",
        growthPath: "Commit to depth while maintaining breadth",
        lifeTheme: "The force that reshapes landscapes",
    },
    9: {
        // Gui 癸 — Yin Water
        strengths: ["Perceptive and intelligent", "Excellent timing", "Subtle influence"],
        challenges: ["Over-caution", "Invisibility", "Stagnation through delay"],
        coreNeed: "Timing plus access to information",
        growthPath: "Trust your moment and act decisively when it arrives",
        lifeTheme: "The rain that changes outcomes quietly",
    },
};

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Get Day Master narrative.
 * If you ever decide to phase-rollout narratives, change return type to DayMasterNarrative | null.
 */
export function getDayMasterNarrative(stem: HeavenlyStem): DayMasterNarrative {
    return DAY_MASTER_NARRATIVES[stem];
}

/**
 * Create a Day Master object from computed stem info.
 * Archetype fields come from the shared stem content layer (stems.ts).
 */
export function createDayMaster(params: {
    stem: HeavenlyStem;
    stemName: string;
    element: ChineseElement;
    polarity: YinYang;
}): DayMaster {
    const archetype = getStemArchetype(params.stem);

    return {
        stem: params.stem,
        name: params.stemName,
        element: params.element,
        polarity: params.polarity,
        emoji: archetype.emoji,
        metaphor: archetype.metaphor,
        description: archetype.essence,
    };
}
