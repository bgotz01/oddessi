/**
 * Soul Urge readings — what each number means as the underlying desire.
 *
 * The Soul Urge is taken from the vowels of the full birth name. It describes
 * what is actually wanted underneath what is pursued — the inward motive that
 * the surface activity may or may not be serving. The distinction between Soul
 * Urge and Expression is the distinction between desire and equipment: a person
 * can be well-equipped for something they do not want, and want something for
 * which they are not particularly equipped.
 *
 * Editorial rule: every entry here must be traceable to the canonical number
 * entry in lexicon.ts applied through the desire frame.
 */

import type { StandardNumber } from "./numbers";

export interface SoulUrgeReading {
  reading: string;
  available: string;
  friction: string;
}

export const SOUL_URGE_READINGS: Record<
  StandardNumber,
  SoulUrgeReading
> = {
  1: {
    reading:
      "Underneath what is pursued is the want for autonomy — the room to act from one's own centre, make the first move, and begin something without waiting for direction or permission.",
    available:
      "A strong sense of direction once external expectations are stripped away, and a genuine appetite for work or choices that can be claimed as one's own.",
    friction:
      "The want for autonomy can make dependence, compromise, or even ordinary collaboration feel like a loss of self when they are not.",
  },

  2: {
    reading:
      "Underneath what is pursued is the want for connection — to be met accurately, understood without having to force the point, and to remain in real relation with another person.",
    available:
      "A deep capacity for attention, patience, and mutuality when the connection feels reciprocal enough to trust.",
    friction:
      "The want for connection can make distance or disagreement feel more threatening than they are, and the desire to remain in relation can slide into deference.",
  },

  3: {
    reading:
      "Underneath what is pursued is the want to express — to take something felt, imagined, or understood and give it a form that can leave the self and reach another person.",
    available:
      "A genuine appetite for making, speaking, showing, and turning inward material into something shareable.",
    friction:
      "The desire to express can outrun the patience required to finish, and the next possibility can become more attractive than carrying the present one into complete form.",
  },

  4: {
    reading:
      "Underneath what is pursued is the want for stability — something solid enough to stand on because it was built carefully and can be trusted to remain.",
    available:
      "Patience, endurance, and a willingness to invest in structures that become more valuable through repetition and time.",
    friction:
      "The want for stability can make change feel like damage even when the existing structure has become the thing preventing further movement.",
  },

  5: {
    reading:
      "Underneath what is pursued is the want for freedom — range, movement, and the ability to encounter something new without feeling fixed by what came before.",
    available:
      "An appetite for experience and a readiness to move toward what is unfamiliar rather than treating change as an interruption.",
    friction:
      "The want for freedom can make continuity feel like confinement, and commitment can be rejected simply because it limits the number of doors still open.",
  },

  6: {
    reading:
      "Underneath what is pursued is the want to care and to matter through that care — to be useful, dependable, and present where responsibility means something.",
    available:
      "A real capacity for sustained care and for finding meaning in responsibility that has been consciously chosen.",
    friction:
      "The desire to matter through care can make usefulness feel too close to worth, and the line between helping, being needed, and taking control can become difficult to see.",
  },

  7: {
    reading:
      "Underneath what is pursued is the want to understand — not merely to know more, but to get beneath the surface far enough that the thing finally makes sense on its own terms.",
    available:
      "The patience to stay with a question, tolerate uncertainty, and keep looking after easier explanations have already become available.",
    friction:
      "The want for understanding can make ordinary participation feel shallow, and the distance required for depth can become a permanent preference for withdrawal.",
  },

  8: {
    reading:
      "Underneath what is pursued is the want for mastery — to know what something is worth, handle consequence competently, and become capable enough that authority rests on substance rather than appearance.",
    available:
      "A strong drive toward competence, material understanding, and forms of achievement that can withstand measurement.",
    friction:
      "The want for mastery can turn competence into a verdict on the self, until everything acquires a value and the person becomes one more thing being measured.",
  },

  9: {
    reading:
      "Underneath what is pursued is the want for breadth — to live beyond the narrow boundary of the immediate self, take in more of the whole, and leave things more complete than they were found.",
    available:
      "A genuine capacity for perspective, generosity, and concern that extends beyond personal advantage.",
    friction:
      "The wide desire can make particular commitments feel too small, while the attachment to what has been gathered can make release harder than the breadth itself would suggest.",
  },

  11: {
    reading:
      "Underneath what is pursued is the want for signal — for an experience, idea, or connection vivid enough to feel received rather than merely chosen. The desire is for meaning that arrives with enough intensity to be unmistakable.",
    available:
      "A heightened sensitivity to what feels significant, and a strong responsiveness to ideas, people, or experiences that carry more than their surface seems to explain.",
    friction:
      "Because the desired signal is difficult to define in advance, ordinary satisfactions can feel insufficient and intensity itself can be mistaken for meaning.",
  },

  22: {
    reading:
      "Underneath what is pursued is the want to build at scale — to make something durable enough, large enough, or useful enough that it cannot remain merely a private achievement.",
    available:
      "The ability to hold a long horizon in mind and remain motivated by work whose full result may stay invisible for years.",
    friction:
      "The scale of the desire can make ordinary progress feel inadequate, and the wish to build something significant can become an excuse for never accepting a beginning small enough to make.",
  },

  33: {
    reading:
      "Underneath what is pursued is the want to give beyond the private circle — to let care become service rather than keeping it confined to reciprocal or personal relationships.",
    available:
      "A genuine capacity for devotion, sustained care, and giving that does not need to be constantly repaid or recognised.",
    friction:
      "The desire to keep giving can make boundaries feel selfish, and service can become a way of disappearing if nothing is deliberately kept back for the self.",
  },
};