/**
 * The tables the Chinese section is read from: ten Heavenly Stems, twelve
 * Earthly Branches, and what each one is made of.
 *
 * Data only — no ephemeris, no Node built-ins — so client components can render
 * a pillar without the calculation coming with it.
 *
 * The vocabulary here is deliberately not the Western one. There are no signs,
 * no houses and no degrees in this file; a pillar is a stem over a branch, and
 * everything else is derived from those two characters.
 */

export type Element = "Wood" | "Fire" | "Earth" | "Metal" | "Water";
export type Polarity = "Yang" | "Yin";

/** 0–9. Indexes into `STEMS`, and half of every pillar. */
export type StemIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
/** 0–11, starting at 子. Indexes into `BRANCHES`. */
export type BranchIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface Stem {
  han: string;
  pinyin: string;
  element: Element;
  polarity: Polarity;
  /** The traditional image for this stem — what the element is *like* here. */
  image: string;
}

export interface Branch {
  han: string;
  pinyin: string;
  animal: string;
  element: Element;
  polarity: Polarity;
  season: "Spring" | "Summer" | "Autumn" | "Winter";
  /** The two-hour watch this branch owns, in local time. */
  hours: string;
}

/** 天干 — the ten stems. Two per element, Yang then Yin. */
export const STEMS: readonly Stem[] = [
  { han: "甲", pinyin: "Jiǎ", element: "Wood", polarity: "Yang", image: "the standing tree" },
  { han: "乙", pinyin: "Yǐ", element: "Wood", polarity: "Yin", image: "the vine, grass bending" },
  { han: "丙", pinyin: "Bǐng", element: "Fire", polarity: "Yang", image: "the sun" },
  { han: "丁", pinyin: "Dīng", element: "Fire", polarity: "Yin", image: "the lamp, the candle" },
  { han: "戊", pinyin: "Wù", element: "Earth", polarity: "Yang", image: "the mountain" },
  { han: "己", pinyin: "Jǐ", element: "Earth", polarity: "Yin", image: "tilled field soil" },
  { han: "庚", pinyin: "Gēng", element: "Metal", polarity: "Yang", image: "raw ore, the axe" },
  { han: "辛", pinyin: "Xīn", element: "Metal", polarity: "Yin", image: "the blade, the ornament" },
  { han: "壬", pinyin: "Rén", element: "Water", polarity: "Yang", image: "the ocean, the river in flood" },
  { han: "癸", pinyin: "Guǐ", element: "Water", polarity: "Yin", image: "mist and dew" },
];

/** 地支 — the twelve branches, from 子. The animals live here, not in the year. */
export const BRANCHES: readonly Branch[] = [
  { han: "子", pinyin: "Zǐ", animal: "Rat", element: "Water", polarity: "Yang", season: "Winter", hours: "23–01" },
  { han: "丑", pinyin: "Chǒu", animal: "Ox", element: "Earth", polarity: "Yin", season: "Winter", hours: "01–03" },
  { han: "寅", pinyin: "Yín", animal: "Tiger", element: "Wood", polarity: "Yang", season: "Spring", hours: "03–05" },
  { han: "卯", pinyin: "Mǎo", animal: "Rabbit", element: "Wood", polarity: "Yin", season: "Spring", hours: "05–07" },
  { han: "辰", pinyin: "Chén", animal: "Dragon", element: "Earth", polarity: "Yang", season: "Spring", hours: "07–09" },
  { han: "巳", pinyin: "Sì", animal: "Snake", element: "Fire", polarity: "Yin", season: "Summer", hours: "09–11" },
  { han: "午", pinyin: "Wǔ", animal: "Horse", element: "Fire", polarity: "Yang", season: "Summer", hours: "11–13" },
  { han: "未", pinyin: "Wèi", animal: "Goat", element: "Earth", polarity: "Yin", season: "Summer", hours: "13–15" },
  { han: "申", pinyin: "Shēn", animal: "Monkey", element: "Metal", polarity: "Yang", season: "Autumn", hours: "15–17" },
  { han: "酉", pinyin: "Yǒu", animal: "Rooster", element: "Metal", polarity: "Yin", season: "Autumn", hours: "17–19" },
  { han: "戌", pinyin: "Xū", animal: "Dog", element: "Earth", polarity: "Yang", season: "Autumn", hours: "19–21" },
  { han: "亥", pinyin: "Hài", animal: "Pig", element: "Water", polarity: "Yin", season: "Winter", hours: "21–23" },
];

/**
 * 藏干 — the stems hidden inside each branch, with the weight tradition gives
 * them. A branch is not one element: 丑 reads as Earth, but there is Water and
 * Metal buried in it, and the element count on the chart page is wrong without
 * them. Weights are out of 100 per branch.
 */
export const HIDDEN_STEMS: Record<BranchIndex, { stem: StemIndex; weight: number }[]> = {
  0: [{ stem: 9, weight: 100 }],
  1: [{ stem: 5, weight: 60 }, { stem: 9, weight: 30 }, { stem: 7, weight: 10 }],
  2: [{ stem: 0, weight: 60 }, { stem: 2, weight: 30 }, { stem: 4, weight: 10 }],
  3: [{ stem: 1, weight: 100 }],
  4: [{ stem: 4, weight: 60 }, { stem: 1, weight: 30 }, { stem: 9, weight: 10 }],
  5: [{ stem: 2, weight: 60 }, { stem: 4, weight: 30 }, { stem: 6, weight: 10 }],
  6: [{ stem: 3, weight: 70 }, { stem: 5, weight: 30 }],
  7: [{ stem: 5, weight: 60 }, { stem: 3, weight: 30 }, { stem: 1, weight: 10 }],
  8: [{ stem: 6, weight: 60 }, { stem: 8, weight: 30 }, { stem: 4, weight: 10 }],
  9: [{ stem: 7, weight: 100 }],
  10: [{ stem: 4, weight: 60 }, { stem: 7, weight: 30 }, { stem: 3, weight: 10 }],
  11: [{ stem: 8, weight: 70 }, { stem: 0, weight: 30 }],
};

export const ELEMENTS: readonly Element[] = ["Wood", "Fire", "Earth", "Metal", "Water"];

/** 生 — each element feeds the next. Wood → Fire → Earth → Metal → Water → Wood. */
export const GENERATES: Record<Element, Element> = {
  Wood: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Wood",
};

/** 克 — and each element checks the one two along. */
export const CONTROLS: Record<Element, Element> = {
  Wood: "Earth",
  Earth: "Water",
  Water: "Fire",
  Fire: "Metal",
  Metal: "Wood",
};

/** What generates this one — the element that supports it. */
export function generatedBy(element: Element): Element {
  return ELEMENTS.find((e) => GENERATES[e] === element)!;
}

/**
 * The twelve animals as characters rather than as horoscope copy. Read against
 * the *branch*, so the same twelve describe a year, a month, a day or an hour
 * depending on which pillar they turn up in.
 */
export const ANIMALS: Record<
  string,
  { note: string; traits: string[] }
> = {
  Rat: {
    note: "First through the gate, and by cunning rather than by speed. Reads a room quickly, keeps a reserve back, and rarely spends the whole of what it knows.",
    traits: ["Quick", "Resourceful", "Private"],
  },
  Ox: {
    note: "Moves at one pace and does not negotiate about it. What the Ox takes on gets finished, which is why it is trusted with the long unglamorous work.",
    traits: ["Steady", "Enduring", "Unhurried"],
  },
  Tiger: {
    note: "Goes first and asks afterwards. Courage arrives before the plan does, which wins ground the careful never reach and loses some that patience would have kept.",
    traits: ["Bold", "Restless", "Commanding"],
  },
  Rabbit: {
    note: "Prefers the oblique approach. Avoids the collision entirely rather than winning it, and keeps its own counsel behind good manners.",
    traits: ["Tactful", "Watchful", "Refined"],
  },
  Dragon: {
    note: "Occupies more space than its size accounts for. Works in large gestures and finds ordinary maintenance harder than the grand undertaking.",
    traits: ["Magnetic", "Ambitious", "Proud"],
  },
  Snake: {
    note: "Thinks a long way ahead in silence. Acts once, precisely, at the moment already chosen — and gives no warning that the choosing was happening.",
    traits: ["Discerning", "Contained", "Strategic"],
  },
  Horse: {
    note: "Needs the open road more than the destination. Generous, quick to enthusiasm, and quick to be gone when the ground turns to routine.",
    traits: ["Free", "Ardent", "Impatient"],
  },
  Goat: {
    note: "Reads what a room feels before it hears what it says. Yielding on the surface and immovable underneath about the few things that matter.",
    traits: ["Gentle", "Perceptive", "Stubborn"],
  },
  Monkey: {
    note: "Solves it a way nobody proposed. Delighted by its own ingenuity, bored the moment the problem stops resisting.",
    traits: ["Inventive", "Adaptable", "Mischievous"],
  },
  Rooster: {
    note: "Notices the detail everyone agreed to overlook, and says so. Exacting about surfaces because it is exacting about everything.",
    traits: ["Precise", "Candid", "Diligent"],
  },
  Dog: {
    note: "Loyal to people rather than to positions. Keeps watch by temperament, and its judgement of character is the last thing to be argued out of.",
    traits: ["Faithful", "Just", "Guarded"],
  },
  Pig: {
    note: "Takes the world as offered and enjoys it plainly. Generous to a fault, slow to suspect, and harder to knock off course than it looks.",
    traits: ["Sincere", "Generous", "Even"],
  },
};

/** Which of the four pillars a reading is standing on. */
export const PILLAR_ROLE: Record<string, { title: string; governs: string }> = {
  year: { title: "Year", governs: "Ancestry, the inherited ground, the first thirty years" },
  month: { title: "Month", governs: "Parents and formation, the working life, the season you were born into" },
  day: { title: "Day", governs: "The self and the partner — the stem here is the Day Master" },
  hour: { title: "Hour", governs: "Children, late life, what is made when the public part is done" },
};

export function stemOf(index: StemIndex): Stem {
  return STEMS[index];
}

export function branchOf(index: BranchIndex): Branch {
  return BRANCHES[index];
}

/** e.g. "Yang Metal" — how a stem is said aloud in English. */
export function stemName(index: StemIndex): string {
  const s = STEMS[index];
  return `${s.polarity} ${s.element}`;
}
