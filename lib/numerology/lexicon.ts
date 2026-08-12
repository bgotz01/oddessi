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
  /** The name it goes by. Kept short enough to sit under a numeral. */
  title: string;
  /** The character, stated flat. Two sentences at most. */
  note: string;
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
    note: "No single obstacle, which is not the same as no obstacle. Nothing is imposed and nothing is excused: whatever is chosen has to be chosen without the alibi of a difficulty that came with the birth.",
    terms: ["Unassigned", "Unexcused", "Chosen"],
  },
  1: {
    title: "The One Who Starts",
    note: "The first move, made without waiting to be asked. Everything it is good at follows from going first, and everything it is bad at follows from not knowing how to be second.",
    terms: ["Initiative", "Autonomy", "Isolation"],
  },
  2: {
    title: "The One Who Holds",
    note: "Two things placed side by side and kept there. Reads a room accurately and at cost, and mistakes the ability to see every side for an obligation to take none.",
    terms: ["Attunement", "Patience", "Deference"],
  },
  3: {
    title: "The One Who Says It",
    note: "Expression as the native act — the thing is not finished until it has been made and shown. Generative and scattering in the same motion; the difficulty is never starting, it is stopping to finish.",
    terms: ["Expression", "Charm", "Dispersal"],
  },
  4: {
    title: "The One Who Builds",
    note: "Work laid down in courses, each on the one beneath it. What it makes holds, and it will keep making it long past the point where the structure was the answer to anything.",
    terms: ["Order", "Endurance", "Rigidity"],
  },
  5: {
    title: "The One Who Moves",
    note: "Appetite, and range. Learns by contact rather than by study, which is the fastest way to learn many things and no way at all to finish one.",
    terms: ["Freedom", "Appetite", "Restlessness"],
  },
  6: {
    title: "The One Who Answers",
    note: "Responsibility taken up before anyone hands it over. Genuinely good at care, and consistently unable to tell the difference between being needed and being loved.",
    terms: ["Care", "Duty", "Overreach"],
  },
  7: {
    title: "The One Who Withdraws",
    note: "Distance kept on purpose, because the thing is not visible from inside the crowd. Sees what the others missed; misses what only the others could have told it.",
    terms: ["Analysis", "Solitude", "Suspicion"],
  },
  8: {
    title: "The One Who Weighs",
    note: "Consequence, in the material sense — what a decision costs, moves and is worth. Competent with power and rarely at ease with it, since every measure it takes applies to itself as well.",
    terms: ["Authority", "Consequence", "Hunger"],
  },
  9: {
    title: "The One Who Lets Go",
    note: "The end of the run, and the wide view that comes with standing at it. Gives generously and holds on privately; the release it teaches is the one it finds hardest.",
    terms: ["Breadth", "Release", "Withholding"],
  },
  11: {
    title: "The Signal",
    note: "Sensitivity running at a pitch where it stops being a social skill and becomes something closer to reception — accurate, unbidden, and hard on the nerves that carry it. What others sense dimly, this number registers clearly and without choosing to.",
    terms: ["Reception", "Intensity", "Strain"],
  },
  22: {
    title: "The Works",
    note: "The instinct to build, pointed at something too large to finish alone. What gets made holds — the same capacity for patient construction as the more ordinary builder — but the scale of what is attempted means the finished thing may remain invisible for most of the work.",
    terms: ["Scale", "Construction", "Overload"],
  },
  33: {
    title: "The Charge",
    note: "Care extended past the household to whoever is in front of it. The impulse to answer what is needed does not stop at the boundary of the personal circle, which makes the giving genuine and the risk of disappearing into it equally real.",
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
    asks: "The name read as a clock. Each part of the name moves through its letters in spelling order, with each letter remaining active for as many years as its value; the Essence is the sum of the letters sounding together at a given time.",
    fixed: false,
  },
};


