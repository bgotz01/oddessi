/**
 * Challenge interpretations — what each number means as the recurring friction
 * inside a pinnacle chapter.
 *
 * A Challenge is calculated by difference rather than addition. It describes
 * the particular capacity that keeps becoming difficult to exercise cleanly
 * while the chapter unfolds. The same number that appears as something
 * available in a Pinnacle appears here as something that must be worked
 * through: 1 as initiative that has to be claimed, 2 as relationship that has
 * to be held without disappearance, 4 as structure that has to be built
 * without becoming rigid.
 *
 * The Challenge is not the opposite of the Pinnacle and is calculated
 * independently from it. The two run concurrently: the Pinnacle describes the
 * standing condition of the chapter; the Challenge describes the recurring
 * friction within it.
 *
 * Zero is reachable only here — two equal components cancel — and does not
 * mean the absence of difficulty. It means that no single kind of difficulty
 * is assigned by the number, leaving the obstacle itself open-ended.
 *
 * Editorial rule: every entry here must be traceable to the canonical number
 * entry in lexicon.ts applied through the challenge frame.
 */

import type { ChallengeNumber } from "./numbers";

export interface ChallengeReading {
  /** The recurring difficulty represented by the number. */
  obstacle: string;

  /** Where or how that difficulty tends to become visible. */
  terrain: string;

  /** What a more workable relationship to the difficulty looks like. */
  working: string;
}

export const CHALLENGE_READINGS: Record<
  ChallengeNumber,
  ChallengeReading
> = {
  0: {
    obstacle:
      "No single obstacle is named, which is the challenge. Without one recurring difficulty to identify and push against, direction has to be chosen rather than supplied by the condition itself.",
    terrain:
      "Choice and commitment. The difficulty appears when the absence of a fixed obstacle becomes an absence of anything definite to work against, making one direction seem no more necessary than another.",
    working:
      "Choosing a difficulty worth accepting rather than waiting for one to impose itself. The challenge is to give shape to an open field without needing the field itself to dictate what belongs there.",
  },

  1: {
    obstacle:
      "Initiative — the repeated demand to act from one's own centre rather than waiting for direction, permission, or someone else to move first. What comes naturally to the 1 as a character becomes here the capacity that repeatedly has to be claimed.",
    terrain:
      "Beginnings, independent decisions, and situations where a position has to be taken without knowing whether anyone else will support it.",
    working:
      "Acting before approval has arrived. The challenge is not to become more forceful, but to distinguish genuine uncertainty from the habit of waiting for someone else to make the first move.",
  },

  2: {
    obstacle:
      "Attunement — remaining responsive to another person without surrendering one's own position to what is being perceived. The difficulty is holding both sides of the relation without disappearing into either one.",
    terrain:
      "Partnership, disagreement, and situations where patience and sensitivity are required without allowing them to become deference.",
    working:
      "Holding a position while remaining in contact — neither forcing the other side nor abandoning one's own. The challenge is to let sensitivity provide information without letting it make the decision.",
  },

  3: {
    obstacle:
      "Expression — getting what is felt, imagined, or understood far enough outside oneself that it becomes something complete. The difficulty is not the absence of material but the distance between having something to express and finishing its expression.",
    terrain:
      "Communication, creative work, and anything that has to move from possibility into a finished form that can be shown to someone else.",
    working:
      "Finishing something smaller than the thing imagined rather than scattering into another beginning. The challenge is to let one expression reach completion before its energy is redirected elsewhere.",
  },

  4: {
    obstacle:
      "Structure — the repeated demand to build steadily when repetition, limitation, or slow progress makes another route more attractive. The difficulty is establishing enough order to make something hold without becoming trapped inside the order itself.",
    terrain:
      "Work, routine, long commitments, and situations where progress depends on doing the necessary thing again after its novelty has disappeared.",
    working:
      "Using structure as support rather than punishment. The challenge is to build enough order for effort to accumulate while remaining willing to alter the structure when it stops serving what was being built.",
  },

  5: {
    obstacle:
      "Movement — the difficulty of allowing change and possibility without letting movement itself become the destination. Appetite keeps opening another possibility before the present one has necessarily run its course.",
    terrain:
      "Change, commitment, novelty, and situations where the attraction of another experience competes with what has already been chosen.",
    working:
      "Asking what the movement is toward, not only what it is away from. The challenge is not to suppress the appetite for change, but to distinguish movement with a direction from movement that has become a habit.",
  },

  6: {
    obstacle:
      "Responsibility — knowing what to answer for and, just as importantly, what not to. The difficulty is that care makes responsibility easy to assume and difficult to put down once another person or situation has begun depending on it.",
    terrain:
      "Care, obligation, and situations where being useful can quietly become being responsible for more than was actually chosen.",
    working:
      "Asking whether the responsibility was chosen rather than merely noticed. The challenge is not to care less, but to let care remain care without turning every need into a duty.",
  },

  7: {
    obstacle:
      "Trust — the repeated difficulty of remaining engaged with what cannot be known completely. Distance helps the 7 see clearly, but the same distance can become a reason to keep withholding participation until certainty arrives.",
    terrain:
      "Uncertainty, solitude, belief, and situations where analysis can continue indefinitely without producing enough certainty to justify the next move.",
    working:
      "Distinguishing the distance that produces understanding from the distance that protects against uncertainty. The challenge is to remain in contact with enough of the world to know when analysis has become withdrawal.",
  },

  8: {
    obstacle:
      "Power — taking authority, weighing consequence, and using material resources without allowing worth itself to become another thing being measured. The difficulty is remaining in relationship with power without either avoiding it or making it the measure of everything.",
    terrain:
      "Authority, resources, ambition, and situations where decisions carry consequences beyond the person making them.",
    working:
      "Treating power as something to use rather than something that proves what the person using it is worth. The challenge is to exercise authority through competence and consequence without turning either into a verdict on the self.",
  },

  9: {
    obstacle:
      "Release — recognising that something has reached its end and allowing that knowledge to become an action. The difficulty is that the wide view can make an ending visible long before attachment is ready to accept it.",
    terrain:
      "Endings, transitions, and situations where something once meaningful has run its course but remains difficult to put down.",
    working:
      "Treating release as an act rather than a feeling. The challenge is not to stop caring about what is ending, but to stop requiring the attachment to disappear before allowing the ending to occur.",
  },
};