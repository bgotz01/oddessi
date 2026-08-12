/**
 * Pinnacle readings — what each number means as the standing condition of a
 * chapter of life.
 *
 * A Pinnacle is calculated from pairs of the birth date and governs a long
 * chapter rather than a single year. It describes what becomes especially
 * available, important, or difficult during that span — the kind of work the
 * chapter repeatedly brings forward.
 *
 * Unlike the Life Path, which remains the terrain of the whole life, a
 * Pinnacle eventually gives way to another. Unlike the Challenge, it describes
 * the condition of the chapter rather than the recurring friction within it.
 *
 * Pinnacles cannot produce zero. Master numbers are preserved when they occur.
 *
 * Editorial rule: every entry here must be traceable to the canonical number
 * entry in lexicon.ts applied through the chapter frame.
 */

import type { StandardNumber } from "./numbers";

export interface PinnacleReading {
  /** What the chapter is fundamentally about. */
  chapter: string;

  /** What becomes especially available while this number governs the chapter. */
  available: string;

  /** The recurring cost or difficulty contained in the same condition. */
  cost: string;

  /** The question the chapter keeps returning to in different forms. */
  question: string;
}

export const PINNACLE_READINGS: Record<StandardNumber, PinnacleReading> = {
  1: {
    chapter:
      "A chapter of beginnings — a period in which initiative, independence, and the need to establish a direction repeatedly come forward. The condition favours what can be started from one's own centre rather than inherited from somewhere else.",
    available:
      "The freedom to initiate, establish direction, and act without waiting for permission or precedent.",
    cost:
      "Isolation. The same independence that makes a beginning possible can make following, sharing direction, or accepting dependence feel harder than it needs to.",
    question:
      "What needs to begin here, and what am I still waiting for permission to start?",
  },

  2: {
    chapter:
      "A chapter of attunement — a period shaped by what has to be held between one position and another. Patience, relationship, and responsiveness matter more here than the ability to force a direction.",
    available:
      "The ability to notice what others miss, work through relation rather than opposition, and allow something to develop without forcing its timing.",
    cost:
      "Deference. The same sensitivity that makes cooperation possible can make disagreement disproportionately difficult and another person's position easier to hold than one's own.",
    question:
      "What requires patience here, and where am I accommodating what I should actually be saying?",
  },

  3: {
    chapter:
      "A chapter of expression — a period in which what has been felt, imagined, or accumulated asks to be made communicable. Making, speaking, showing, and contact with other people become especially fertile forms of movement.",
    available:
      "Fluency, generative energy, and the ability to give an idea or feeling a form that can reach beyond the person carrying it.",
    cost:
      "Dispersal. Possibilities multiply more quickly than they can be completed, and the ease of beginning or communicating can substitute for carrying one thing far enough.",
    question:
      "What wants to be expressed here, and what needs to be finished rather than merely begun?",
  },

  4: {
    chapter:
      "A chapter of construction — a period in which progress comes through order, repetition, and work laid carefully on what came before. What matters here is less the beginning than whether something can be made durable.",
    available:
      "Endurance, structural clarity, and the ability to turn repeated effort into something that holds.",
    cost:
      "Rigidity. The structure that makes accumulation possible can become difficult to question, and persistence can continue after the thing being persisted with has stopped being useful.",
    question:
      "What am I building here, and does the structure still serve what it was built for?",
  },

  5: {
    chapter:
      "A chapter of movement — a period in which change, range, and direct contact with the world repeatedly open the next possibility. The condition favours experience over preservation and adaptation over remaining fixed.",
    available:
      "Freedom to explore, adaptability in changing conditions, and rapid learning through direct experience.",
    cost:
      "Restlessness. The next possibility can become compelling before the present one has run its course, leaving breadth without enough completion to give it shape.",
    question:
      "What am I moving toward, and when is movement becoming an end in itself?",
  },

  6: {
    chapter:
      "A chapter of responsibility — a period in which care, duty, and sustained attention to what depends on the person repeatedly come forward. The condition asks what is worth answering for and how long that responsibility should be carried.",
    available:
      "The ability to sustain care, become genuinely useful, and take responsibility for something that requires continued presence rather than a single act.",
    cost:
      "Overreach. What begins as freely chosen care can become identity, and responsibility can continue long after anyone consciously chose to keep carrying it.",
    question:
      "What am I responsible for here, and which responsibilities have I taken on simply because I could?",
  },

  7: {
    chapter:
      "A chapter of depth — a period in which distance, analysis, and sustained attention to difficult questions become more important than breadth or outward movement. The condition favours understanding that takes time to acquire.",
    available:
      "Analytical clarity, independence of thought, and the patience to remain with a question after easier explanations have been exhausted.",
    cost:
      "Isolation. The distance that makes understanding possible can become habitual, excluding information that only participation or contact could have supplied.",
    question:
      "What am I trying to understand here, and when has the distance stopped helping me understand it?",
  },

  8: {
    chapter:
      "A chapter of consequence — a period in which resources, authority, value, and the material results of decisions carry unusual weight. The condition repeatedly asks what power is for and what happens when it is exercised.",
    available:
      "Executive capacity, material judgment, and the ability to organise resources and effort around consequential outcomes.",
    cost:
      "Measurement. The habit of weighing value and consequence can spread until results, relationships, and the self are all being judged by measures that were only useful for some of them.",
    question:
      "What am I being given the power to move here, and what am I using as the measure of whether it matters?",
  },

  9: {
    chapter:
      "A chapter of completion — a period in which the wide view makes it increasingly clear what has run its course. The condition favours release, integration, and the ability to stop carrying what belongs to an earlier part of the life.",
    available:
      "Perspective, generosity, and the ability to see an ending as part of the whole rather than only as a loss.",
    cost:
      "Withholding. Recognising that something is complete does not make releasing it easy, and what has already ended can continue to be carried privately long after the fact is understood.",
    question:
      "What has completed its work here, and what am I still carrying after its time has ended?",
  },

  11: {
    chapter:
      "A chapter under heightened signal — the 2's attunement intensified until what is implicit can register as strongly as what has actually been said. The condition is one of unusual reception, with all the intensity that reception carries.",
    available:
      "Heightened perception and the ability to notice, receive, and give form to signals that would ordinarily remain below the threshold of attention.",
    cost:
      "Strain. Increased sensitivity does not distinguish automatically between what matters and what does not, so the signal arrives with the surrounding noise.",
    question:
      "What am I receiving here, and what deserves to be carried forward rather than merely felt?",
  },

  22: {
    chapter:
      "A chapter of construction at scale — the 4's building instinct applied to something too large to be completed through individual effort or short-term work. The condition asks for structure that can survive both time and scale.",
    available:
      "The capacity to organise sustained effort around something significant and to build structures capable of carrying work beyond the individual.",
    cost:
      "Overload. The scale of what could be built can make ordinary progress feel insignificant, producing ever more foundation when the harder task is to keep constructing on top of it.",
    question:
      "What is large enough to deserve this much construction, and what would count as actual progress toward it?",
  },

  33: {
    chapter:
      "A chapter of service — the 6's responsibility extended beyond the private circle and toward needs that do not necessarily belong to one relationship or household. The condition asks how widely care can extend without losing the person providing it.",
    available:
      "The capacity for sustained service, devotion, and care that does not depend on personal reciprocity.",
    cost:
      "Erasure. With no natural boundary on what can be cared for, giving can expand until nothing has been deliberately kept for the person doing it.",
    question:
      "What am I here to give during this chapter, and what must remain mine in order for the giving to continue?",
  },
};