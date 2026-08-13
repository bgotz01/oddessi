/**
 * What the numbers mean.
 *
 * The canonical definitions live here: a number has a character, a position
 * asks a question, and a reading is one put through the other. The character
 * is written once; position-specific applications live in the neighbouring
 * files (fixed.ts, pinnacles.ts, challenges.ts), which extend rather than
 * replace these entries. Nothing in those files should be undeducible from
 * the number entry here and the position entry below.
 */

import type { CoreNumber, StandardNumber } from "./numbers";
export type { StandardNumber };
export { isMaster, reducesTo } from "./numbers";

export interface NumberEntry {
  /** The primary label. Kept short enough to sit under a numeral. */
  title: string;
  /** Two action verbs that capture the number's core motion. */
  verbs: string;
  /** An evocative short phrase, e.g. "The one who withdraws". */
  moniker: string;
  /** Additional descriptive keywords shown alongside the title. */
  keywords: string[];
  /** The number's character and the tension inherent in that character. */
  note: string;
  /**
   * Three-part progression:
   * core force → characteristic expression → potential distortion.
   */
  terms: string[];
}

/**
 * The single digits, the three masters, and zero.
 *
 * Zero is reachable only as a challenge — it is a difference, and two equal
 * components cancel — so it is written as one rather than as an identity.
 */
export const NUMBERS: Record<CoreNumber, NumberEntry> = {
  0: {
    title: "The Open Field",
    verbs: "Choose · Define",
    moniker: "The one who defines their own obstacle",
    keywords: ["No fixed obstacle", "Open choice", "Unassigned"],
    note: "No single obstacle assigned — which is not the same as no obstacle. Without a named difficulty to push against, direction must be chosen rather than supplied by the condition itself. Everything is available and nothing is excused.",
    terms: ["Unassigned", "Unexcused", "Chosen"],
  },
  1: {
    title: "Initiation",
    verbs: "Begin · Lead",
    moniker: "The one who goes first",
    keywords: ["Independence", "Leadership", "Initiative", "Individuality", "Originality"],
    note: "The number of initiative and self-direction. It acts from its own centre, begins without waiting to be asked, and finds authority in itself rather than inherited from elsewhere. Its difficulty is the same as its strength: it does not know how to be second.",
    terms: ["Initiative", "Autonomy", "Isolation"],
  },
  2: {
    title: "Cooperation",
    verbs: "Relate · Attune",
    moniker: "The one who holds the middle",
    keywords: ["Partnership", "Sensitivity", "Diplomacy", "Balance"],
    note: "The number of relation and attunement. It reads a room accurately, holds two positions at once without forcing a resolution, and works through connection rather than opposition. Its difficulty is mistaking the ability to see every side for an obligation to take none.",
    terms: ["Attunement", "Patience", "Deference"],
  },
  3: {
    title: "Creativity",
    verbs: "Create · Express",
    moniker: "The one who makes it visible",
    keywords: ["Joy", "Communication", "Self-expression", "Optimism"],
    note: "The number of creative energy, joy, and communication. It is generative, social, and naturally drawn to making things and sharing them. The difficulty is not starting — it is stopping long enough to finish. Energy scatters before it accumulates.",
    terms: ["Creativity", "Communication", "Dispersal"],
  },
  4: {
    title: "Stability",
    verbs: "Build · Stabilize",
    moniker: "The one who builds to last",
    keywords: ["Building", "Discipline", "Hard work", "Practicality"],
    note: "The number of structure, discipline, and patient effort. It builds methodically, values order, and makes things that hold. Its difficulty is persistence past the point of usefulness — continuing to construct the same structure after the need has changed.",
    terms: ["Order", "Endurance", "Rigidity"],
  },
  5: {
    title: "Freedom",
    verbs: "Explore · Adapt",
    moniker: "The one who needs room to move",
    keywords: ["Adventure", "Change", "Versatility", "Curiosity"],
    note: "The number of change, variety, and direct experience. It learns by contact, adapts quickly, and resists anything that limits its range. Its difficulty is that the next possibility becomes compelling before the present one has run its course.",
    terms: ["Freedom", "Appetite", "Restlessness"],
  },
  6: {
    title: "Care",
    verbs: "Nurture · Sustain",
    moniker: "The one who answers before being asked",
    keywords: ["Nurturing", "Family", "Harmony", "Service"],
    note: "The number of care, duty, and domestic harmony. It takes responsibility before being asked, is genuinely good at nurturing and sustaining, and finds purpose in being needed. Its difficulty is not knowing where obligation ends and love begins.",
    terms: ["Care", "Duty", "Overreach"],
  },
  7: {
    title: "Introspection",
    verbs: "Analyze · Understand",
    moniker: "The one who withdraws to see clearly",
    keywords: ["Analysis", "Wisdom", "Spirituality", "Perfectionism"],
    note: "The number of analysis, depth, and the interior life. It observes from a distance, thinks before it speaks, and wants to understand before it commits. Its difficulty is that the same distance that produces insight can become a barrier to participation.",
    terms: ["Analysis", "Solitude", "Suspicion"],
  },
  8: {
    title: "Power",
    verbs: "Direct · Achieve",
    moniker: "The one who makes things happen",
    keywords: ["Ambition", "Authority", "Material mastery", "Achievement"],
    note: "The number of material authority, judgment, and consequence. It is competent with resources and decisions, operates at scale, and understands that actions have weight. Its difficulty is applying the same measuring habit to itself — and to relationships that do not belong in a ledger.",
    terms: ["Authority", "Consequence", "Measurement"],
  },
  9: {
    title: "Completion",
    verbs: "Integrate · Release",
    moniker: "The one who has seen the whole cycle",
    keywords: ["Wisdom", "Compassion", "Breadth", "Release", "Endings"],
    note: "The number of completion, wisdom, and the long view. It has travelled the whole cycle and understands endings. Generous in principle and privately reluctant to let go — the release it teaches is the one it finds hardest to perform.",
    terms: ["Breadth", "Release", "Withholding"],
  },
  11: {
    title: "Intuition",
    verbs: "Receive · Perceive",
    moniker: "The one who registers what others miss",
    keywords: ["Inspiration", "Illumination", "Heightened perception", "Sensitivity"],
    note: "The master of heightened sensitivity and inner knowing. Where 2 attunes to what is in the room, 11 registers what has not yet been said — impressions arrive unbidden and with unusual accuracy. The cost is the nervous strain of operating at that pitch.",
    terms: ["Reception", "Intensity", "Strain"],
  },
  22: {
    title: "Realization",
    verbs: "Envision · Construct",
    moniker: "The one who builds for what outlasts them",
    keywords: ["Master builder", "Large-scale vision", "Practical idealism", "Legacy"],
    note: "The master builder. Where 4 constructs what one person can complete, 22 is drawn to structures that outlast the builder — institutions, systems, things too large for any single effort. The difficulty is that the scale of the vision can make ordinary progress feel insufficient.",
    terms: ["Scale", "Construction", "Overload"],
  },
  33: {
    title: "Devotion",
    verbs: "Serve · Uplift",
    moniker: "The one who serves the whole",
    keywords: ["Selfless giving", "Teaching", "Healing", "Unconditional love"],
    note: "The master of selfless care. Where 6 answers to those it loves, 33 extends that responsibility outward without a natural boundary. The impulse to serve is genuine; the risk is that giving expands to fill every available space, and nothing is kept for the giver.",
    terms: ["Service", "Devotion", "Erasure"],
  },
};

export type Position =
  | "lifePath"
  | "expression"
  | "soulUrge"
  | "personality"
  | "personalYear"
  | "pinnacle"
  | "challenge"
  | "essence";

export interface PositionEntry {
  label: string;
  /** What it is computed from, said plainly. Printed as the row's aside. */
  from: string;
  /** What a number means *here*. The frame the character is read through. */
  asks: string;
  /** Whether the position moves. Fixed numbers are read once; cycles recur. */
  fixed: boolean;
}

export const POSITIONS: Record<Position, PositionEntry> = {
  lifePath: {
    label: "Life Path",
    from: "The birth date",
    asks: "The fixed terrain of the life: the kind of problem or condition that keeps returning, whatever is done about it. It describes what the life keeps asking of the person rather than who the person is.",
    fixed: true,
  },
  expression: {
    label: "Expression",
    from: "Every letter of the name",
    asks: "What the person is equipped with. Taken from the whole name because it describes the whole apparatus — the abilities, capacities, and ways of acting that are available whether or not they are wanted.",
    fixed: true,
  },
  soulUrge: {
    label: "Soul Urge",
    from: "The vowels",
    asks: "What is actually wanted underneath what is pursued. The vowels are the sounded part of the name, and are read here as the inward motive rather than the part most immediately visible to others.",
    fixed: true,
  },
  personality: {
    label: "Personality",
    from: "The consonants",
    asks: "What arrives before anything is said. Not a mask exactly, since it belongs to the same name, but the outer edge of it — the part strangers encounter first and may mistake for the whole.",
    fixed: true,
  },
  personalYear: {
    label: "Personal Year",
    from: "Birth month and day, plus the calendar year",
    asks: "What this particular year is asking for. In this system it turns on 1 January rather than on the birthday — other conventions use the birthday — and moves through a repeating cycle from one to nine. It describes the emphasis of the year, not simply its mood.",
    fixed: false,
  },
  pinnacle: {
    label: "Pinnacle",
    from: "Pairs of the birth date",
    asks: "The standing condition of a long chapter of life. It describes what becomes available during that period, what the period keeps emphasizing, and the kind of development it repeatedly invites.",
    fixed: false,
  },
  challenge: {
    label: "Challenge",
    from: "Differences within the birth date",
    asks: "The recurring friction running through a chapter, taken as a difference rather than a sum. It is not the opposite of the pinnacle, but the particular difficulty the person keeps having to work through while the chapter unfolds.",
    fixed: false,
  },
  essence: {
    label: "Essence",
    from: "All parts of the name running concurrently",
    asks: "What is temporarily active through the name. Each part of the name moves through its letters in spelling order, with each letter remaining active for as many years as its value; the Essence is the sum of the letters sounding together at a given time. Unlike the fixed name numbers, it describes a changing emphasis in what is being expressed now.",
    fixed: false,
  },
};


