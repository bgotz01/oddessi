/**
 * What the drawer says.
 *
 * The almanac holds what a character *is*; this holds what it *means*, kept
 * apart so the calculation never has to import prose. Every passage is written
 * to be read cold, by someone who has just clicked a character they have never
 * seen before — no entry assumes another has been read first.
 */

import type { Element } from "./almanac";

export interface Passage {
  note: string;
  terms?: string[];
}

/** The ten stems as characters. Indexed like `STEMS`. */
export const STEM_NOTES: Record<number, Passage> = {
  0: {
    note: "The standing tree. Wood in its upright form: it grows one way, which is up, and it does not negotiate about the direction. Straightforward to deal with and hard to redirect — principle arrives before strategy, and bending feels like defeat rather than technique.",
    terms: ["Upright", "Principled", "Unbending"],
  },
  1: {
    note: "The vine, grass bending. The same growth as the tree, but around obstacles rather than through them. Reaches its height by using what is already standing, and outlasts a great deal by declining to meet it head-on.",
    terms: ["Adaptable", "Persistent", "Indirect"],
  },
  2: {
    note: "The sun. Impartial and impossible to hide: it warms everyone in range whether or not that was the plan. Generous and visible by nature, and constitutionally bad at discretion — what it knows tends to be lit for everyone.",
    terms: ["Radiant", "Generous", "Unconcealed"],
  },
  3: {
    note: "The lamp, the candle. Fire kept to a purpose: a smaller light, aimed, and warm to the few inside its circle. Needs fuel and tending in a way the sun does not, and gives in return an attention nothing else in the cycle offers.",
    terms: ["Focused", "Intimate", "Ceremonial"],
  },
  4: {
    note: "The mountain. Earth as boundary and shelter — the thing other things are built against. Slow, immovable, and the reason a good deal around it holds; the same slowness is why it is still considering a question everyone else has finished with.",
    terms: ["Steadfast", "Sheltering", "Immovable"],
  },
  5: {
    note: "Tilled field soil. Earth turned toward use: receptive, cultivating, quietly making conditions in which other things grow. Takes on whatever is put in it, which is both the gift and the difficulty.",
    terms: ["Nurturing", "Receptive", "Self-effacing"],
  },
  6: {
    note: "Raw ore, the axe. Metal before refinement — force, edge, and a strong instinct for what should be cut away. Decisive to the point of bluntness, and more comfortable with a hard truth than with a managed one.",
    terms: ["Decisive", "Forceful", "Blunt"],
  },
  7: {
    note: "The blade, the ornament. Metal after refinement: the same edge, brought to a finish. Exacting about quality and about form, sensitive to what is shoddy, and capable of a precision in speech that cuts whether or not it meant to.",
    terms: ["Refined", "Exacting", "Sharp"],
  },
  8: {
    note: "The ocean, the river in flood. Water at scale: moving, carrying, finding the route around anything fixed. Strategic by temperament and restless by construction — a still year is a hard year for it.",
    terms: ["Expansive", "Strategic", "Restless"],
  },
  9: {
    note: "Mist and dew. Water in its quiet form, arriving without announcing itself and getting into everything. Perceptive, indirect, and easy to underestimate right up until you notice how much it has already reached.",
    terms: ["Subtle", "Perceptive", "Pervasive"],
  },
};

export const ELEMENT_NOTES: Record<Element, Passage & { excess: string; absence: string }> = {
  Wood: {
    note: "Beginning and expansion — the push of a thing toward its own growth. Wood is the element of plans, of spring, and of the conviction that there is somewhere further to get to.",
    excess: "Too much and the chart is all initiative: projects begun, directions taken, and not much finished.",
    absence: "Without it, starting is the hard part. What already exists gets maintained beautifully; what does not exist stays that way.",
    terms: ["Growth", "Initiative", "Spring"],
  },
  Fire: {
    note: "Visibility and warmth — the element of expression, ceremony and being seen. Fire is what turns something held privately into something performed.",
    excess: "Too much burns through its own fuel: brilliant in view, depleted out of it.",
    absence: "Without it, the work is real and nobody hears about it. Recognition has to be arranged deliberately, because it will not arrive on its own.",
    terms: ["Expression", "Warmth", "Summer"],
  },
  Earth: {
    note: "Holding and mediating — the element of ground, storage and trust. Earth is what everything else is kept in, and the reason a chart stays coherent under pressure.",
    excess: "Too much and it silts up: loyal past the point of usefulness, slow to let anything go.",
    absence: "Without it, nothing settles. Plenty happens; very little accumulates.",
    terms: ["Stability", "Trust", "Between seasons"],
  },
  Metal: {
    note: "Refinement and cutting — the element of judgement, order and letting go. Metal is what removes, and what insists that the remainder be exact.",
    excess: "Too much and the cutting outruns the growing: standards no one can meet, including its own.",
    absence: "Without it, discrimination is effortful. Everything is kept, and the difference between good and nearly good has to be worked out consciously.",
    terms: ["Judgement", "Order", "Autumn"],
  },
  Water: {
    note: "Depth and movement — the element of knowing, of fear, and of finding a way around. Water is the chart's intelligence and its capacity to be somewhere else by morning.",
    excess: "Too much and it never sets: constant motion, constant reconsidering, no bank to stand on.",
    absence: "Without it, depth has to be dug for. Adaptability is a decision rather than an instinct.",
    terms: ["Depth", "Adaptation", "Winter"],
  },
};

/** What each of the four pillars is a reading of. */
export const PILLAR_NOTES: Record<"year" | "month" | "day" | "hour", Passage> = {
  year: {
    note: "The ground you were handed: ancestry, family standing, the country and the era. It is the pillar furthest from the self, which is exactly why the animal everyone knows themselves by — the year branch — is the weakest description of a person in the whole chart. Conventionally it also colours the first thirty years, when inherited conditions are still doing most of the work.",
    terms: ["Ancestry", "Inheritance", "Early life"],
  },
  month: {
    note: "The season you were born into, and with it the pillar that carries the most weight in a reading. It describes parents and formation, and it governs working life. Because the month branch sets the season, it is also the single strongest voice in whether the Day Master is supported or outnumbered.",
    terms: ["Formation", "Parents", "Career"],
  },
  day: {
    note: "The self. The stem here is the Day Master — the character the whole chart is read around — and the branch beneath it is traditionally read as the partner and the marriage. This is the pillar to look at first, and the one the year animal is usually standing in front of.",
    terms: ["The self", "Partnership", "Middle life"],
  },
  hour: {
    note: "What is made after the public part is done: children, late life, private work, whatever is built when nobody is commissioning it. It is also the pillar most often wrong, because it is the only one that depends on the birth time being recorded accurately — two hours out and this character changes.",
    terms: ["Children", "Late life", "Private work"],
  },
};

export type ConceptKey =
  | "eight-characters"
  | "stems-and-branches"
  | "hidden-stems"
  | "solar-boundaries"
  | "day-master"
  | "strength"
  | "luck-pillars"
  | "ten-gods"
  | "elements";

export const CONCEPTS: Record<ConceptKey, { title: string } & Passage> = {
  "eight-characters": {
    title: "The Eight Characters",
    note: "八字 — eight characters, two for each of the four pillars. A birth is written as the year, month, day and hour it fell in, each of them named by one Heavenly Stem and one Earthly Branch. That is the entire chart: no wheel, no degrees, no houses. Everything a reading says comes from those eight characters, what they are made of, and how they get on with each other.",
    terms: ["八字", "Bāzì", "Four pillars"],
  },
  "stems-and-branches": {
    title: "Stems and Branches",
    note: "Two old counting cycles, run together. The ten Heavenly Stems are the five elements in Yang and Yin form; the twelve Earthly Branches are the twelve animals, and also the twelve two-hour watches, the twelve months and the twelve years. Pair them and they do not return to the start until sixty steps have passed — the sexagenary cycle, which is what a pillar is one step of.",
    terms: ["天干", "地支", "Sixty steps"],
  },
  "hidden-stems": {
    title: "Hidden Stems",
    note: "藏干 — a branch is not one element. Each holds one to three stems inside it, with the tradition assigning them shares of its weight: 丑 reads as Earth on the surface but carries Water and Metal underneath, and a chart counted without them is counted wrong. The element bars on this page are weighed with the hidden stems included, which is why they rarely land on round numbers.",
    terms: ["藏干", "Concealed", "Weighted"],
  },
  "solar-boundaries": {
    title: "Where the Year Turns",
    note: "Not at the lunar New Year, and not on 1 January. The BaZi year begins at 立春 (Lìchūn, the start of spring) — the instant the sun reaches 315° of ecliptic longitude, around 4 February. The months begin at the eleven solar terms after it, one every 30°. Both boundaries are astronomical, so this app asks Swiss Ephemeris for them rather than reading them off a table: a birth in late January belongs to the previous year's animal, and a birth a few hours either side of Lìchūn belongs to whichever year the sun says.",
    terms: ["立春", "節氣", "315°"],
  },
  "day-master": {
    title: "The Day Master",
    note: "日主 — the stem of the day pillar, and the chart's subject. Every other character is read in relation to it: what feeds it, what it produces, what it controls, what controls it. Two people with identical charts but different Day Masters are reading two different documents. This is the single character to know if you only learn one.",
    terms: ["日主", "The self", "Day stem"],
  },
  strength: {
    title: "Whether the Self is Supported",
    note: "The oldest question in a reading, and the one that decides what the rest of it means. A Day Master surrounded by its own element and by the element that generates it is well fed and can take on what comes; one outnumbered by what controls and drains it needs the chart's help rather than more challenge. The percentage here is the share of all eight characters held by those two supportive elements — a blunt instrument, stated plainly so you can see what it counted. Under 30% reads as unsupported, over 45% as well supported. The season, set by the month branch, is the older and coarser version of the same test.",
    terms: ["身強", "身弱", "Resource"],
  },
  "luck-pillars": {
    title: "The Luck Pillars",
    note: "大運 — the closest thing this system has to a transit, and still not one: nothing is moving overhead. The chart simply hands over to the next pillar of the sexagenary cycle every ten years. It steps forwards for a man born under a Yang year stem and for a woman born under a Yin one, backwards for the other two, and it starts at whatever age the birth sat from the neighbouring solar term — counted at three days to the year, which is why the first decade opens on a fraction rather than on a birthday.",
    terms: ["大運", "Ten years", "起運"],
  },
  "ten-gods": {
    title: "The Ten Gods",
    note: "十神 — the grammar of the whole system, and the step where a chart stops being a list of characters. On its own a stem is only an element; it becomes a reading when it is placed in relation to the Day Master, and a five-phase cycle allows exactly five relations: it is your own kind, it feeds you, you feed it, you control it, or it controls you. Each then splits in two by polarity — ten in all. That split is not a technicality: authority at the opposite polarity is an office you can hold, authority at the same polarity is a threat that does not negotiate, and a life lived under one is not the life lived under the other. Three of the five pairs mark the difference with 正 and 偏 in their names; Companion and Output are named for what they do instead, so the rule to remember is the polarity rather than the character.",
    terms: ["十神", "正 direct", "偏 indirect"],
  },
  elements: {
    title: "The Five Elements",
    note: "五行 — five phases, not five substances. Each generates the next round the circle (Wood feeds Fire, Fire makes Earth, Earth bears Metal, Metal carries Water, Water grows Wood) and each controls the one two along (Wood breaks Earth, Earth dams Water, Water quenches Fire, Fire melts Metal, Metal cuts Wood). A reading is mostly an account of which of those relations a chart is short of and which it has too much of.",
    terms: ["五行", "生 generates", "克 controls"],
  },
};
