/**
 * Pinnacle interpretations — what each number means as a chapter of a life.
 *
 * The lexicon holds the character of each number in the abstract. This file
 * holds what that character feels like when it governs a whole chapter rather
 * than a year or a trait: the questions it keeps raising, the things it makes
 * easier, and what it costs to live inside it for decades.
 *
 * Kept separate from lexicon.ts so the drawer can show a reading that is
 * specific to the pinnacle position without the lexicon needing to know about
 * positions — the dependency runs one way, and the data lives where it belongs.
 */

import type { CoreNumber } from "./numbers";

export interface PinnacleReading {
  /**
   * What the chapter is fundamentally about — one or two sentences, stated as
   * a condition rather than a verdict. This is the standing weather of the
   * decades it covers.
   */
  chapter: string;
  /**
   * What becomes available during this chapter that was not before — abilities,
   * circumstances, or kinds of clarity that the number opens up.
   */
  available: string;
  /**
   * What the chapter keeps costing — not a flaw, but the recurring price of
   * whatever the number makes possible.
   */
  cost: string;
  /**
   * The question the chapter keeps asking — the thing a person in this pinnacle
   * will find themselves returning to, in different forms, across the years.
   */
  question: string;
}

export const PINNACLE_READINGS: Record<CoreNumber, PinnacleReading> = {
  0: {
    chapter:
      "An open chapter — no single condition is imposed, which means no single condition is excused either. The number is only reachable as a challenge, not here.",
    available: "Complete latitude: whatever shape this chapter takes is chosen, not given.",
    cost: "No alibi. The absence of an imposed condition removes the one explanation that requires nothing of the person living through it.",
    question: "What would I do with this if nothing were forcing my hand?",
  },
  1: {
    chapter:
      "A chapter that demands a beginning. Something has to be started from nothing — a direction, a practice, a way of standing in the world — and the chapter does not resolve until it has been.",
    available:
      "The ability to act without waiting for permission or precedent. Original work is possible here in a way it is not in chapters governed by compromise or completion.",
    cost:
      "The same drive that clears a path makes it hard to share one. Partnerships are available but not easy; the chapter favours the person working alone, and it takes effort to remember that is a condition of the number, not a verdict on the people around it.",
    question: "What am I here to start, and what am I holding back from starting?",
  },
  2: {
    chapter:
      "A chapter of relationship — not romance specifically, but the long work of attending to another person or a cause without dissolving into it. The decade is shaped by what is done with a connection, not with an ambition.",
    available:
      "Sensitivity sharpened to the point of usefulness: the ability to read a situation accurately and position oneself inside it without friction. Collaborations and quiet partnerships flourish.",
    cost:
      "The same attunement that makes collaboration easy makes conflict feel catastrophic. The chapter repeatedly asks the person to hold a position rather than defer, and that ask is felt as much more than it is.",
    question: "What am I holding back from saying, and what am I afraid would happen if I said it?",
  },
  3: {
    chapter:
      "A chapter of expression — the years in which whatever has been accumulating finds a form and asks to be shown. Creative work, communication, and the social register all come forward.",
    available:
      "Fluency: things that were difficult to say or make become easier, and audiences appear. The chapter tends to be outwardly pleasant and internally restless for the same reason.",
    cost:
      "Dispersal. The ease of expression makes it hard to finish a single thing; the chapter can produce many starts and few completions, and the pleasantness of the surface can be mistaken for the depth that is not yet there.",
    question: "What am I making, and what am I performing instead of making it?",
  },
  4: {
    chapter:
      "A chapter of construction — decades in which what is built outlasts the effort, and the effort is considerable. The years are rarely glamorous and often durable.",
    available:
      "Staying power and structural clarity. The chapter makes it possible to establish something solid — a practice, a body of work, a livelihood — that could not have been built in a lighter one.",
    cost:
      "Inflexibility. The same qualities that make the structure sound make it hard to dismantle when the structure is the problem. The chapter asks for discipline and then, quietly, asks again whether the discipline has become the point.",
    question: "What am I building, and am I building it because it is needed or because I know how to build?",
  },
  5: {
    chapter:
      "A chapter of movement — years in which the pressure is toward change, variety, and contact with the world rather than away from it. Nothing holds still for long, and that is the condition rather than a disruption of it.",
    available:
      "Range and adaptability. Skills and experiences accumulate quickly; the chapter favours people who can learn by doing and move before they are done.",
    cost:
      "Incompletion. The appetite for new experience makes the familiar feel like a trap, and the chapter can spend decades in motion without arriving anywhere. The freedom it offers is real, and so is the thing it does not offer.",
    question: "What am I moving toward, and what am I moving away from?",
  },
  6: {
    chapter:
      "A chapter of responsibility — years organised around care, duty, and the needs of others. Home, family, and community come to the centre whether or not they were invited.",
    available:
      "The ability to be genuinely useful to people in ways that matter. The chapter provides a context in which care is not performance; the work is real and the relationship to it can be too.",
    cost:
      "Overreach. The chapter makes it easy to confuse responsibility with identity, and to stay responsible long past the point where it is freely chosen. What begins as duty can calcify into obligation, and the difference stops being visible.",
    question: "What am I taking on because I want to, and what am I taking on because I cannot bear not to?",
  },
  7: {
    chapter:
      "A chapter of inwardness — years that ask for depth rather than breadth, and that tend to feel slower than they are. Study, solitude, and the gradual accumulation of a real understanding are the business of the chapter.",
    available:
      "Analytical clarity and the patience to follow a question all the way down. The chapter does not produce much on the surface and produces a great deal underneath.",
    cost:
      "Isolation. The withdrawal that makes thinking possible makes connection difficult, and the chapter can mistake distance for discernment. What arrives as perspective can become suspicion, and the person living through it is often the last to notice.",
    question: "What do I actually know, as against what I have concluded from a distance?",
  },
  8: {
    chapter:
      "A chapter of consequence — years in which what is done has weight, and the weight lands visibly. Power, resources, and the structures that distribute them are the material of the chapter.",
    available:
      "Executive capacity: the ability to move large things, organise effort at scale, and sustain the kind of authority that requires rather than performs confidence.",
    cost:
      "The same capacity for consequence applies to failure as to success, and the chapter amplifies both. The years also tend to measure everything — including things that resist measurement — which is the habit that outlasts its usefulness most reliably.",
    question: "What am I building authority over, and what does that authority cost the people underneath it?",
  },
  9: {
    chapter:
      "A chapter of completion — years that press toward the end of something that has been running for a long time. Old patterns, obligations, and identities are up for release.",
    available:
      "Perspective and generosity. The chapter tends to open a wide view and a genuine capacity to give without keeping score, at least some of the time.",
    cost:
      "Resistance to the release it requires. The chapter's work is to let things end, and the person living through it will find, repeatedly, that they are holding on — to a role, a story, a version of themselves — past the moment the chapter was asking them to put it down.",
    question: "What is this chapter asking me to finish, and what am I refusing to finish?",
  },
  11: {
    chapter:
      "A chapter under heightened signal — years in which the 2's attunement is running at a pitch that makes ordinary social calibration feel insufficient. Something is being received that the everyday world does not quite have a frame for.",
    available:
      "Unusual perceptual clarity and the ability to inspire or transmit something that matters to other people. The chapter is not comfortable, but it is rarely shallow.",
    cost:
      "The nervous system. What arrives as insight also arrives as sensitivity to everything else, and the chapter tends to exhaust the people living through it in ways that look like nothing from the outside.",
    question: "What am I receiving, and what am I doing with it?",
  },
  22: {
    chapter:
      "A chapter at scale — years in which the building instinct of the 4 is pointed at something too large to finish alone. The ambition of the chapter is real, and so is the gap between it and what is actually being done on any given day.",
    available:
      "The capacity to organise sustained effort around a significant goal, and to attract the collaboration that goal requires. The chapter's ambitions are not delusions; they are what the chapter is for.",
    cost:
      "The gap itself. The years of a 22 pinnacle are often spent laying foundations that the person living through them will not see completed, and the discipline required to keep working on something that large — and to tolerate how long it takes — is what the chapter is really asking for.",
    question: "What am I building that is bigger than me, and do I believe it enough to keep going when it is not visible yet?",
  },
  33: {
    chapter:
      "A chapter of unconditional service — years in which care is extended past the household or the self, toward anyone in front of it. The 6's responsibility becomes something closer to a vocation.",
    available:
      "The ability to give without keeping score, and to be genuinely present to other people's suffering without being consumed by it — when the chapter is working well, which it does not always do.",
    cost:
      "Erasure. The chapter makes it possible to disappear into the needs of others, and to mistake that disappearance for virtue. What remains of the person living through it depends entirely on what they insist on keeping.",
    question: "What am I giving freely, and what am I giving because I have forgotten I am allowed to keep it?",
  },
};
