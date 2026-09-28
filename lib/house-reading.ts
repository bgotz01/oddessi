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

export interface SignManner {
  /** How the sign runs the area it rules — three fragments. */
  manner: string[];
  /** What that manner makes easier. */
  gives: string[];
  /** What it costs. */
  costs: string[];
}

export const SIGN_MANNER: Record<string, SignManner> = {
  Aries: {
    manner: [
      "Met head-on — the first move comes before the plan",
      "Starts fast, tires of upkeep",
      "Wants to run this area outright",
    ],
    gives: ["Initiative where others hesitate", "Nerve to go first"],
    costs: ["Impatience with slow returns", "Friction from pushing too early"],
  },
  Taurus: {
    manner: [
      "Built slowly and kept",
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
    gives: ["Adaptability", "Contacts and ideas on demand"],
    costs: ["Scattered effort", "Slow to settle on one course"],
  },
  Cancer: {
    manner: [
      "Approached through feeling and protection",
      "Tied up with family, memory and safety",
      "Guarded until trust is earned",
    ],
    gives: ["Care and loyalty", "Instinct for what people need"],
    costs: ["Moods steer decisions", "Defensive when exposed"],
  },
  Leo: {
    manner: [
      "Run as self-expression",
      "Wants to be seen doing it",
      "Wholehearted, proud, generous",
    ],
    gives: ["Warmth and presence", "Confidence others follow"],
    costs: ["Needs recognition to stay engaged", "Pride in the way of help"],
  },
  Virgo: {
    manner: [
      "Analysed, refined, put in order",
      "Use over display",
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
    costs: ["Indecision", "Peace kept at its own expense"],
  },
  Scorpio: {
    manner: [
      "Taken deep or not at all",
      "Control, privacy, intensity",
      "Trust given slowly, then completely",
    ],
    gives: ["Focus and endurance", "Sees what is hidden"],
    costs: ["Suspicion", "All-or-nothing swings"],
  },
  Sagittarius: {
    manner: [
      "Treated as an adventure that should mean something",
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
      "Serious early, easier later",
    ],
    gives: ["Discipline and patience", "Builds what lasts"],
    costs: ["Carries too much alone", "Enjoyment postponed for duty"],
  },
  Aquarius: {
    manner: [
      "Run on its own terms, against convention",
      "Ideas and groups ahead of individuals",
      "Detached, experimental",
    ],
    gives: ["Originality", "Sees what could change"],
    costs: ["Emotional distance", "Rebellion for its own sake"],
  },
  Pisces: {
    manner: [
      "Felt more than planned",
      "Soft boundaries, wide imagination",
      "Drawn to what cannot be measured",
    ],
    gives: ["Compassion and intuition", "Creative sensitivity"],
    costs: ["Drift and avoidance", "Easily absorbed by others"],
  },
};

/** What a body puts into whichever house it stands in — two fragments. */
export const BODY_IN_A_HOUSE: Record<string, string[]> = {
  Sun: ["Identity and purpose invested here", "Where the chart wants to be seen"],
  Moon: ["Feeling, habit and the need for safety", "Where comfort is sought and moods rise"],
  Mercury: ["Thought, talk and trade", "Where the mind stays busy"],
  Venus: ["Affection, taste and what is valued", "Where pleasure and ease are sought"],
  Mars: ["Drive, heat and competition", "Where effort goes and fights start"],
  Jupiter: ["Growth, luck and generosity", "Where things expand — sometimes too far"],
  Saturn: ["Limits, duty and slow work", "Where mastery is demanded and comes late"],
  Uranus: ["Disruption and independence", "Where the unexpected keeps arriving"],
  Neptune: ["Ideals, imagination and fog", "Where boundaries blur, for better or worse"],
  Pluto: ["Power, intensity and renewal", "Where things break down to be rebuilt"],
  "North Node": ["The direction of growth", "Unfamiliar ground worth working toward"],
  "South Node": ["Old skills and default habits", "Familiar ground that is easy to fall back on"],
  Chiron: ["An old wound and what it teaches", "Where sensitivity becomes skill"],
};
