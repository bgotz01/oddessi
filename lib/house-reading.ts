/**
 * The house drawer's own reading layer — short, Oddessi-written fragments.
 *
 * The vendored tables in `lib/astrology/houses/` write one paragraph per
 * combination: 144 signs-on-cusps and ~120 bodies-in-houses, mostly generic
 * praise ("a powerful placement") repeated with the nouns swapped. Rather than
 * rewrite all of them, the drawer composes the reading from two small tables:
 *
 *   - how a sign runs *any* house it sits on the cusp of, and
 *   - what a body brings to *any* house it stands in.
 *
 * The house itself comes from `HOUSE_CATEGORIES` (essence + core themes), which
 * is already Oddessi's. The specific sign × house and body × house detail is
 * left to the chat, which gets the vendored text through page context.
 *
 * Voice: fragments, no "you", no verdicts. Each line is what the sign or body
 * tends to do, never a claim that it is good or bad to have.
 */

import type { SignKey } from "@/lib/astrology/macro/zodiac-framework-data";

/**
 * Not the same as a sign's `strength` / `shadow` in `zodiac-framework-data`.
 * Those describe the sign in general; these describe the sign *as an approach
 * to one area of life* — what that approach contributes to a house, and what
 * it trades away there. Kept as a separate table on purpose.
 */
export interface SignManner {
  /**
   * How the sign runs the area it rules — three fragments. The first is the
   * primary statement, the only one the Framework cards show.
   */
  manner: [string, string, string];
  /** What that approach contributes to the house. */
  gives: [string, string];
  /** The trade-off it makes there. */
  costs: [string, string];
}

/**
 * Keyed by capitalised sign name, so a missing or misspelt sign fails to
 * compile. Exported below under a string index, since cusps arrive as strings.
 */
const MANNER_BY_SIGN = {
  Aries: {
    manner: [
      "Met head-on — the first move comes before the plan",
      "Quick to initiate, less drawn to maintenance",
      "Prefers independence over permission",
    ],
    gives: ["Initiative where others hesitate", "Nerve to go first"],
    costs: ["Impatience with slow returns", "Friction from pushing too early"],
  },
  Taurus: {
    manner: [
      "Built slowly, preserved carefully",
      "Security before novelty",
      "Values what can be touched and held",
    ],
    gives: ["Staying power", "Steady accumulation"],
    costs: ["Resists change that is due", "Holds on past the point of use"],
  },
  Gemini: {
    manner: [
      "Handled through talk, information and options",
      "Several threads at once",
      "Curiosity ahead of commitment",
    ],
    gives: ["Adaptability", "Connects people and ideas"],
    costs: ["Scattered effort", "Slow to settle on one course"],
  },
  Cancer: {
    manner: [
      "Approached through feeling and protection",
      "Guided by memory, belonging and safety",
      "Guarded until trust is earned",
    ],
    gives: ["Care and loyalty", "Instinct for what people need"],
    costs: ["Feelings can override judgment", "Defensive when exposed"],
  },
  Leo: {
    manner: [
      "Run as self-expression",
      "Personal investment seeks recognition",
      "Wholehearted, proud, generous",
    ],
    gives: ["Warmth and presence", "Confidence others follow"],
    costs: ["Needs recognition to stay engaged", "Pride in the way of help"],
  },
  Virgo: {
    manner: [
      "Analysed, refined, put in order",
      "Function before appearance",
      "Improvement as the default setting",
    ],
    gives: ["Precision and craft", "Practical problem-solving"],
    costs: ["Worry and over-checking", "Never quite good enough"],
  },
  Libra: {
    manner: [
      "Worked through other people",
      "Balance, fairness and taste",
      "Decided by weighing both sides",
    ],
    gives: ["Diplomacy", "An eye for proportion"],
    costs: ["Indecision", "Harmony at the expense of honesty"],
  },
  Scorpio: {
    manner: [
      "Taken deep or not at all",
      "Privacy, intensity and guarded trust",
      "Trust built through depth and loyalty",
    ],
    gives: ["Focus and endurance", "Sees what is hidden"],
    costs: ["Suspicion", "All-or-nothing swings"],
  },
  Sagittarius: {
    manner: [
      "Explored in search of meaning",
      "Room to move, room to believe",
      "Big picture before detail",
    ],
    gives: ["Optimism and reach", "Willing to try the unfamiliar"],
    costs: ["Overpromising", "Restless with routine"],
  },
  Capricorn: {
    manner: [
      "Treated as a long climb",
      "Structure, rules and earned standing",
      "Responsibility before reward",
    ],
    gives: ["Discipline and patience", "Builds what lasts"],
    costs: ["Carries too much alone", "Enjoyment postponed for duty"],
  },
  Aquarius: {
    manner: [
      "Approached independently, outside convention",
      "Independent thinking within collective systems",
      "Detached, experimental",
    ],
    gives: ["Originality", "Sees what could change"],
    costs: ["Emotional distance", "Rebellion for its own sake"],
  },
  Pisces: {
    manner: [
      "Guided by intuition and imagination",
      "Porous boundaries, deep empathy",
      "Drawn to what cannot be measured",
    ],
    gives: ["Compassion and intuition", "Creative sensitivity"],
    costs: ["Drift and avoidance", "Easily absorbed by others"],
  },
} satisfies Record<Capitalize<SignKey>, SignManner>;

export const SIGN_MANNER: Record<string, SignManner> = MANNER_BY_SIGN;

/**
 * What a body puts into whichever house it stands in — two fragments. The
 * role the body plays in a house, not its full meaning (that is
 * `PRINCIPLES` and the planet archetypes). The nodes and Chiron are here as
 * points, as `PRINCIPLES` groups them, not as planets.
 */
export const BODY_IN_A_HOUSE: Record<string, string[]> = {
  Sun: ["Identity and purpose invested here", "Where identity seeks expression"],
  Moon: ["Feeling, habit and the need for safety", "Where comfort is sought and moods rise"],
  Mercury: ["Thought, talk and trade", "Where the mind stays busy"],
  Venus: ["Affection, taste and what is valued", "Where pleasure and ease are sought"],
  Mars: ["Drive, heat and competition", "Where energy is directed and conflict arises"],
  Jupiter: ["Growth, opportunity and generosity", "Where things expand — sometimes too far"],
  Saturn: ["Responsibility, limits and discipline", "Where responsibility and mastery develop through effort"],
  Uranus: ["Disruption and independence", "Where established patterns are challenged"],
  Neptune: ["Idealization, imagination and dissolution", "Where boundaries blur, for better or worse"],
  Pluto: ["Power, intensity and renewal", "Where deep change challenges existing foundations"],
  "North Node": ["The direction of growth", "Unfamiliar ground worth working toward"],
  "South Node": ["Old skills and default habits", "Familiar ground that is easy to fall back on"],
  Chiron: ["An old wound and what it teaches", "Where sensitivity becomes skill"],
};
