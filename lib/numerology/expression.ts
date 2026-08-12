/**
 * Expression readings — what each number means as the equipment of a person.
 *
 * The Expression is taken from every letter of the full birth name. It describes
 * what the person is equipped with — the capacities available to them whether
 * or not they are wanted or used. Distinct from the Life Path (terrain) and the
 * Soul Urge (desire): the equipment can be deployed in service of any direction
 * the terrain demands and any want the vowels name.
 *
 * Editorial rule: every entry here must be traceable to the canonical number
 * entry in lexicon.ts applied through the equipment frame.
 */

import type { StandardNumber } from "./numbers";

export interface ExpressionReading {
  reading: string;
  available: string;
  friction: string;
}

export const EXPRESSION_READINGS: Record<StandardNumber, ExpressionReading> = {
  1: {
    reading:
      "The name announces someone equipped to initiate — to begin things, establish direction, and act where there is no precedent. The equipment is strongest at the point where something has to start.",
    available:
      "Initiative, independence, and the ability to move first without waiting for permission or example.",
    friction:
      "The same equipment that makes starting easy makes following or sharing direction harder. The expression tends to move ahead rather than alongside, which can turn autonomy into isolation.",
  },

  2: {
    reading:
      "The name announces someone equipped for attunement — to read what is happening between people, adjust without forcing, and hold more than one position at once. The equipment works through relation rather than separation.",
    available:
      "Diplomacy, patience, and the ability to notice what a situation or another person requires without having it stated directly.",
    friction:
      "The same attunement that makes calibration possible makes a firm position harder to hold. The expression can absorb the room rather than add to it, and accommodation can become deference.",
  },

  3: {
    reading:
      "The name announces someone equipped for expression — to turn what is felt, imagined, or understood into something that can be said, made, or shown. The equipment naturally moves outward.",
    available:
      "Fluency, charm, and the ability to make an idea or feeling communicable to other people.",
    friction:
      "Dispersal. Expression generates possibilities faster than they can be completed, and the ease of making contact can substitute for carrying any one thing far enough.",
  },

  4: {
    reading:
      "The name announces someone equipped to build — to organise work, establish structure, and keep going after the novelty has disappeared. The equipment is orderly, patient, and cumulative.",
    available:
      "Reliability, endurance, and the ability to turn repeated effort into something that holds.",
    friction:
      "Rigidity. The same commitment to structure that makes sustained construction possible makes changing or abandoning the structure difficult when it stops serving its purpose.",
  },

  5: {
    reading:
      "The name announces someone equipped for movement — to enter unfamiliar conditions, learn through contact, and adapt quickly enough to remain useful while the situation changes. The equipment is range.",
    available:
      "Adaptability, appetite, and the ability to learn quickly from direct experience across different contexts.",
    friction:
      "Restlessness. Range produces breadth more readily than completion, and the next possibility can become more compelling than finishing what the last one began.",
  },

  6: {
    reading:
      "The name announces someone equipped for responsibility — to notice what needs care, take it up, and remain with it after others would have put it down. The equipment is sustained usefulness.",
    available:
      "Care, dependability, and the ability to hold responsibilities or relationships that require consistent attention.",
    friction:
      "Overreach. The readiness to answer what is needed makes it easy to take responsibility that was never actually assigned, and care can become control when nothing marks where it should stop.",
  },

  7: {
    reading:
      "The name announces someone equipped for analysis — to step back, examine what others pass over, and follow a question until the structure underneath it becomes visible. The equipment is depth gained through distance.",
    available:
      "Analytical precision, independence of thought, and the patience to understand before concluding.",
    friction:
      "The same distance that makes analysis possible can become habitual withdrawal. Information available through contact gets excluded, and independent judgment can harden into suspicion.",
  },

  8: {
    reading:
      "The name announces someone equipped to weigh consequence — to assess value, organise resources, exercise authority, and understand what decisions cost in material terms. The equipment is practical power.",
    available:
      "Executive capacity, material judgment, and the ability to organise resources and effort around an outcome.",
    friction:
      "The habit of weighing consequence can become a habit of weighing everything. Results, resources, other people, and eventually the self can all become measures rather than means.",
  },

  9: {
    reading:
      "The name announces someone equipped for breadth — to see beyond the immediate position, take in more of the whole, and recognise when something has reached its end. The equipment is perspective with enough distance to release.",
    available:
      "Perspective, generosity, and the ability to include more than one interest without treating every outcome as personal.",
    friction:
      "The wide view can make particular commitments harder to sustain, while the capacity to recognise an ending does not guarantee the willingness to accept one. Breadth can become diffusion and release can become withholding.",
  },

  11: {
    reading:
      "The name announces someone equipped with heightened reception — the 2's attunement intensified until what is implicit can register as strongly as what has actually been said. The equipment is sensitivity operating at unusually high resolution.",
    available:
      "The ability to notice signals other people miss and to give form to something that was present before it became explicit.",
    friction:
      "Strain. Heightened reception is indiscriminate, and the same sensitivity that catches the signal also takes in the surrounding noise.",
  },

  22: {
    reading:
      "The name announces someone equipped to build at scale — the 4's capacity for structure and endurance applied to work too large to complete through individual effort alone. The equipment is construction multiplied by scope.",
    available:
      "The capacity to organise sustained effort, hold a large structure together, and keep working across a span in which the finished result remains distant.",
    friction:
      "Overload. Scale can make ordinary progress feel insignificant, and the instinct to establish foundations can keep expanding the structure faster than anything on top of it gets finished.",
  },

  33: {
    reading:
      "The name announces someone equipped for service — the 6's capacity for care extended beyond the private circle and without an obvious stopping point. The equipment is responsibility with unusually wide reach.",
    available:
      "The capacity to give sustained attention and care without requiring the exchange to remain personal or reciprocal.",
    friction:
      "Erasure. With no natural boundary on where responsibility ends, usefulness can become disappearance and service can consume the person providing it.",
  },
};