/**
 * Personality readings — what each number means as the outer edge.
 *
 * The Personality is taken from the consonants of the full birth name. It
 * describes what arrives in the room before anything is said — the first
 * impression, the exterior register, the part strangers encounter and may
 * mistake for the whole. It is made of the same name as the Soul Urge, but
 * the consonants are the structural part of a word, the part that carries
 * shape rather than sound, which is the argument for reading them as what
 * is visible before anything inward is shown.
 *
 * Editorial rule: every entry here must be traceable to the canonical number
 * entry in lexicon.ts applied through the outer-edge frame.
 */

import type { StandardNumber } from "./numbers";

export interface PersonalityReading {
  reading: string;
  available: string;
  friction: string;
}

export const PERSONALITY_READINGS: Record<StandardNumber, PersonalityReading> = {
  1: {
    reading:
      "What arrives before anything is said: someone who is going to go first. The edge of the name is decisive, self-contained, and slightly ahead of where everyone else is standing.",
    available:
      "Authority that does not need to announce itself — it is already present in the bearing.",
    friction:
      "The manner can read as indifference to collaboration even when it is not, and people take it personally.",
  },
  2: {
    reading:
      "What arrives before anything is said: someone who is paying attention. The edge of the name is responsive, careful, and calibrated to the room rather than to itself.",
    available:
      "The ability to put people immediately at ease, and to read what is needed before it is asked.",
    friction:
      "The manner can read as without opinion, and people take the diplomacy for agreement when it is not.",
  },
  3: {
    reading:
      "What arrives before anything is said: warmth and fluency. The edge of the name is expressive, engaging, and slightly in motion — it communicates before any content has been offered.",
    available:
      "The ability to make a room receptive before anything real has been said.",
    friction:
      "The manner can read as all surface, and people discount what is underneath because the surface was so easy.",
  },
  4: {
    reading:
      "What arrives before anything is said: solidity. The edge of the name is measured, deliberate, and not in a hurry — it communicates that whatever follows has been thought through.",
    available:
      "Immediate credibility in situations where reliability is what is needed.",
    friction:
      "The manner can read as inflexible, and people sometimes stop asking before the person has had the chance to be otherwise.",
  },
  5: {
    reading:
      "What arrives before anything is said: restlessness and range. The edge of the name is alert, variable, and interested in more than one thing at once — it communicates appetite.",
    available:
      "An immediate liveliness that makes others want to be in the conversation.",
    friction:
      "The manner can read as uncommitted, and people sometimes do not take the depth seriously because the surface moves so fast.",
  },
  6: {
    reading:
      "What arrives before anything is said: warmth and care. The edge of the name is attentive, responsible, and oriented toward the other — it communicates that the person is going to show up.",
    available:
      "An immediate trustworthiness that others feel before they can account for it.",
    friction:
      "The manner invites need, and the person can find themselves responsible for things they did not offer to hold.",
  },
  7: {
    reading:
      "What arrives before anything is said: reserve. The edge of the name is contained, observant, and not immediately available — it communicates that it is watching before it is joining.",
    available:
      "An authority that comes from obvious depth — people sense that there is more being withheld than shown.",
    friction:
      "The manner can read as cold or dismissive before any content has been offered, and people give up before the person has had the chance to open.",
  },
  8: {
    reading:
      "What arrives before anything is said: competence. The edge of the name is assured, direct, and organised around outcome — it communicates that the person has already assessed the situation.",
    available:
      "Immediate credibility in any context where authority is relevant.",
    friction:
      "The manner can read as dominating even when it is not, and people sometimes position themselves in opposition before anything has been asked.",
  },
  9: {
    reading:
      "What arrives before anything is said: spaciousness. The edge of the name is wide, unhurried, and oriented toward the whole rather than the particular — it communicates that the person is not competing.",
    available:
      "An immediate sense of safety that makes others willing to say things they would not elsewhere.",
    friction:
      "The manner can read as diffuse, and people sometimes do not take the particulars seriously because the bearing is so general.",
  },
  11: {
    reading:
      "What arrives before anything is said: intensity. The edge of the name carries a charge that other people feel before they understand it — it communicates that what is underneath is not ordinary.",
    available:
      "An immediate presence that others find difficult to ignore or discount.",
    friction:
      "The intensity can be felt as pressure, and people sometimes pull back from what they cannot account for.",
  },
  22: {
    reading:
      "What arrives before anything is said: scale. The edge of the name communicates that the person is oriented toward something larger than the room — it reads as ambition, even when that is not what is being offered.",
    available:
      "An immediate seriousness that others take at its word.",
    friction:
      "The manner can read as remote or self-important, and people sometimes feel they cannot approach it.",
  },
  33: {
    reading:
      "What arrives before anything is said: generosity. The edge of the name is open, warm, and directed outward — it communicates that the person is going to give something before they are asked.",
    available:
      "An immediate sense of welcome that others feel as unusual.",
    friction:
      "The manner invites disclosure, and the person can find themselves holding more of other people's inner lives than they intended.",
  },
};
