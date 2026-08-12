/**
 * What the numbers mean.
 *
 * Two tables and no third. A number has a character, and a position asks a
 * question; a reading is one put through the other. Arc had a separate block of
 * prose for every number in every position — twelve numbers across eight places
 * is nearly a hundred passages, written once and then never reconciled, so the
 * same 7 was solitary in one file and studious in another.
 *
 * Here the character is written once and the position frames it. Thirteen
 * entries plus eight, rather than a hundred and four, and nothing can drift out
 * of agreement with itself. Where a reading wants more than the frame gives,
 * that is a question for the council, which has the whole reading in front of
 * it — not for another table.
 */

import type { CoreNumber } from "./numbers";

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
    note: "A 2 under load. The same attunement, turned up until it stops being a social skill and becomes something closer to reception — accurate, unbidden, and hard on the nerves that carry it.",
    terms: ["Reception", "Intensity", "Strain"],
  },
  22: {
    title: "The Works",
    note: "A 4 at scale. The building instinct pointed at something too large to finish alone, which makes the ordinary competence of the 4 into either a body of work or a lifetime of foundations with nothing on them.",
    terms: ["Scale", "Construction", "Overload"],
  },
  33: {
    title: "The Charge",
    note: "A 6 without a boundary. Care extended past the household to whoever is in front of it, which is either service or a slow disappearance depending entirely on whether anything is left over.",
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
    asks: "The one number that cannot be changed, since the date cannot. Read it as the terrain rather than the traveller: the kind of problem this life keeps being handed, whatever is done about it.",
    fixed: true,
  },
  expression: {
    label: "Expression",
    from: "Every letter of the name",
    asks: "What the person is equipped with, as against what they are here to learn. Taken from the whole name because it is the whole apparatus — the abilities that are available whether or not they are wanted.",
    fixed: true,
  },
  soulUrge: {
    label: "Soul Urge",
    from: "The vowels",
    asks: "What is actually wanted, underneath what is pursued. The vowels are the sounded part of a name, which is the argument for reading them as the part that is not on display.",
    fixed: true,
  },
  personality: {
    label: "Personality",
    from: "The consonants",
    asks: "What arrives in the room before anything is said. Not a mask exactly — it is made of the same name — but the edge of it, and the part strangers take for the whole.",
    fixed: true,
  },
  personalYear: {
    label: "Personal Year",
    from: "Birth month and day, plus the calendar year",
    asks: "What this particular year is for. It turns on 1 January rather than on a birthday, runs one to nine and starts again, so it is a position in a cycle before it is a description of a mood.",
    fixed: false,
  },
  pinnacle: {
    label: "Pinnacle",
    from: "Pairs of the birth date",
    asks: "The standing condition of a whole chapter — decades, not seasons. What is available during it, and what the years inside it keep being about.",
    fixed: false,
  },
  challenge: {
    label: "Challenge",
    from: "Differences within the birth date",
    asks: "The obstacle inside the chapter, taken as a difference rather than a sum. Not the opposite of the pinnacle — the price of it, and usually the same trait viewed from underneath.",
    fixed: false,
  },
  essence: {
    label: "Essence",
    from: "The letters of the name, in order, a year each per value",
    asks: "The name read as a clock. Each letter rules for as many years as it is worth, so the name spells itself out across a life and the essence is whichever letters are sounding at once.",
    fixed: false,
  },
};

/** True for the three numbers that are never reduced past themselves. */
export function isMaster(n: CoreNumber): boolean {
  return n === 11 || n === 22 || n === 33;
}

/** What a master reduces to, for the note that says so. Null for the rest. */
export function reducesTo(n: CoreNumber): CoreNumber | null {
  if (n === 11) return 2;
  if (n === 22) return 4;
  if (n === 33) return 6;
  return null;
}
