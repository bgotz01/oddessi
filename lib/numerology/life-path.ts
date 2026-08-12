/**
 * Life Path readings — what each number means as the fixed terrain of a life.
 *
 * The Life Path is taken from the birth date and cannot be changed. It
 * describes what the life keeps asking of the person — the recurring condition
 * or curriculum — rather than who the person is. The distinction matters: the
 * same number reads differently as terrain than as equipment or desire.
 *
 * Editorial rule: every entry here must be traceable to the canonical number
 * entry in lexicon.ts (the character) applied through the terrain frame. Nothing
 * should appear that is not derivable from those two sources.
 */

import type { StandardNumber } from "./numbers";

export interface LifePathReading {
  reading: string;
  available: string;
  friction: string;
}

export const LIFE_PATH_READINGS: Record<StandardNumber, LifePathReading> = {
  1: {
    reading:
      "A life that keeps being handed a blank page and asked to write something on it. The terrain is initiative — not as a talent, but as a recurring demand to act without waiting for direction, permission, or precedent.",
    available:
      "Independence, the capacity for original work, and the ability to act where there is no precedent.",
    friction:
      "The same independence that makes starting easy makes partnership difficult. The life keeps producing situations where collaboration is necessary and the instinct is still to go alone.",
  },

  2: {
    reading:
      "A life organised around relationship — not romance specifically, but the repeated need to account for what exists between one person and another. The terrain is attunement: reading the other position accurately without surrendering one's own.",
    available:
      "Sensitivity to other people that operates as a genuine skill, and the patience to hold a situation without forcing it.",
    friction:
      "The same sensitivity makes conflict feel disproportionately costly. The life keeps asking the person to hold a position while remaining in contact with the person on the other side of it.",
  },

  3: {
    reading:
      "A life in which expression keeps becoming necessary — something felt, understood, or imagined has to be made communicable. The terrain is expression, and the recurring demand is to carry what is started far enough that it becomes whole.",
    available:
      "Fluency, charm, and the ability to reach people through what is made, said, or shown.",
    friction:
      "Dispersal. Expression produces possibilities faster than they can be completed, and the ease of beginning can keep the life crowded with things that never reach their finished form.",
  },

  4: {
    reading:
      "A life built in courses, each on the one beneath it. The terrain is construction — the slow, reliable making of things that hold, and the recurring demand to stay with them long enough for the structure to become real.",
    available:
      "Staying power, structural clarity, and the ability to make something that outlasts the effort required to make it.",
    friction:
      "Rigidity. The same qualities that make the structure sound make it difficult to dismantle when the structure itself has become the problem.",
  },

  5: {
    reading:
      "A life in motion — not as a failing but as the terrain. Change, contact, and new experience keep opening the next part of the road; the question is whether the movement has a direction or only a velocity.",
    available:
      "Range, adaptability, and the ability to learn quickly through direct contact with the world.",
    friction:
      "Incompletion. The appetite for new experience makes the familiar feel like a trap, and the life can remain in motion long after movement has stopped leading anywhere.",
  },

  6: {
    reading:
      "A life organised around responsibility — the kind taken up before anyone assigns it. The terrain is care, and the recurring question is where freely chosen responsibility ends and obligation that has simply become expected begins.",
    available:
      "Genuine usefulness to other people, and the ability to hold responsibilities, relationships, and spaces that require sustained care.",
    friction:
      "Overreach. Responsibility can become identity, and what began as freely given care can harden into an obligation the person no longer knows how to put down.",
  },

  7: {
    reading:
      "A life oriented toward depth rather than breadth, with the distance that depth requires. The terrain is understanding — slow, deliberate understanding reached by stepping far enough away from the crowd to see what cannot be seen from inside it.",
    available:
      "Analytical clarity and the patience to follow a question further than most people are willing to take it.",
    friction:
      "Isolation. The withdrawal that makes understanding possible also removes information that only contact can provide, and perspective can harden into suspicion when the distance becomes permanent.",
  },

  8: {
    reading:
      "A life of consequence — one in which decisions acquire material weight and the weight lands somewhere. The terrain is power in its practical sense: resources, authority, value, and the responsibility of deciding what happens to them.",
    available:
      "Executive capacity and the ability to assess, organise, and move resources or effort at scale.",
    friction:
      "The same instinct that weighs consequences also weighs the person producing them. Success and failure both become measures, and evaluation can continue long after measuring has stopped being useful.",
  },

  9: {
    reading:
      "A life with a wide view and a recurring pressure toward completion. The terrain is release — recognising when something has run its course, taking in what it meant, and allowing it to end rather than carrying it indefinitely.",
    available:
      "Breadth of perspective, the ability to see beyond the immediate position, and a genuine capacity for generosity.",
    friction:
      "Withholding. The wide view makes it possible to recognise an ending before it makes it easy to accept one, and the life repeatedly asks the person to release what they already know has run its course.",
  },

  11: {
    reading:
      "A life under heightened signal — the 2's attunement running at a pitch where it becomes something closer to reception. The terrain is the gap between what is perceived and what can be named, and the recurring demand is to give form to what arrives before it is fully understood.",
    available:
      "Unusual perceptual clarity and the capacity to give form to something that others recognise before they could have named it themselves.",
    friction:
      "Strain. Heightened perception also means heightened sensitivity, and the sheer amount that is noticed, felt, or taken in can become difficult to carry.",
  },

  22: {
    reading:
      "A life at scale — the 4's building instinct pointed at something too large to finish alone. The terrain is sustained construction across a span long enough that the finished thing may remain invisible for much of the work.",
    available:
      "The capacity to organise sustained effort around something significant and to build at a scale that eventually requires other people.",
    friction:
      "Overload. The distance between the scale of the ambition and the work possible on any given day can make ordinary progress feel insufficient, leaving either disciplined construction or foundations that never become a building.",
  },

  33: {
    reading:
      "A life in which care repeatedly expands beyond the personal — the 6's responsibility extended past the private circle to needs that keep appearing outside it. The terrain is service, and the recurring question is how far care can extend without the person carrying it disappearing inside the obligation.",
    available:
      "The capacity to give without keeping score, and to remain genuinely present to needs that extend beyond the private circle.",
    friction:
      "Erasure. With no natural boundary on what can be cared for, service can become a slow disappearance into the needs of others and that disappearance can be mistaken for virtue.",
  },
};