/**
 * lib/growth/houses.ts
 * The twelve arenas — where a development actually happens.
 *
 * Deliberately shorter than `HOUSE_CATEGORIES.coreThemes`, which is a six-point
 * definition of a house. Here the house is adverbial: it modifies a direction
 * rather than being the subject, and it has to fit one line at both ends of a
 * figure.
 *
 * `material` and `output` are the pair that make the conversion's own headline
 * — INVESTIGATION → THESIS — so a house has to say both what it supplies when
 * it is the ground being left and what it produces when it is the destination.
 *
 * Pure data.
 */

import type { House } from "@/lib/astrology/house-categories";

export interface HouseEntry {
  /** The territory, as a short name. */
  territory: string;
  /** The directive, when this house is the destination. Imperative. */
  directive: string;
  /** What the arena actually contains. One sentence. */
  contains: string;
  /** Questions the arena adds on top of the sign's. */
  questions: string[];
  /** The role a person occupies here. Used for the headline arc. */
  noun: string;
  /** Imperative beat: what forming something in this arena looks like. */
  formBeat: string;
  /** Imperative beat: what putting it out looks like. */
  expressBeat: string;
  /** Verbs for when this house is the ground being departed. */
  competence: string[];
  /**
   * Imperative beat for the ground being left, used when no body is embedded
   * there to make the line specific. Phrased as something the person already
   * does well, never as a fault — the whole model rests on the old ground being
   * feedstock, and a strapline that opened by disparaging it would contradict
   * every other layer on the page.
   */
  originBeat: string;
  /**
   * What this house supplies as raw material when it is the ground being left,
   * and what it produces when it is the destination. These two make the
   * conversion's own headline — "INVESTIGATION → THESIS" — which is the
   * chapter's whole claim in two words.
   */
  material: string;
  output: string;
}

export const HOUSE: Record<House, HouseEntry> = {
  1: {
    territory: "Self and first move",
    directive: "Become your own starting point",
    contains: "how you begin, how you appear, and the agency you take before anyone asks you to.",
    questions: ["What would I do first if it were entirely up to me?", "How do I want to arrive?"],
    noun: "Initiator",
    formBeat: "Decide who you are in it",
    expressBeat: "Show up as that",
    competence: ["initiate", "front", "embody"],
    originBeat: "Start as you always do",
    material: "initiative",
    output: "stance",
  },
  2: {
    territory: "Worth and resources",
    directive: "Build something that is actually yours",
    contains: "what you own, what you can do, and what you are worth when nobody is valuing you.",
    questions: ["What can I build that would still be mine next year?", "What am I worth without proving it?"],
    noun: "Steward",
    formBeat: "Name what it is worth",
    expressBeat: "Hold it and use it",
    competence: ["hold", "value", "provide"],
    originBeat: "Hold what you have",
    material: "holding",
    output: "asset",
  },
  3: {
    territory: "Mind and exchange",
    directive: "Learn the near thing properly",
    contains: "how you think, ask, and exchange — the local, the immediate, the person actually in the room.",
    questions: ["Who is right here that I have not asked?", "What have I never bothered to learn properly?"],
    noun: "Interpreter",
    formBeat: "Work out what it means",
    expressBeat: "Say it to someone",
    competence: ["investigate", "compare", "explain"],
    originBeat: "Ask around as you do",
    material: "comparison",
    output: "account",
  },
  4: {
    territory: "Home and foundation",
    directive: "Build a base worth returning to",
    contains: "roots, family, privacy, and the emotional ground everything else is standing on.",
    questions: ["What am I standing on?", "Where do I actually restore?"],
    noun: "Keeper",
    formBeat: "Lay the foundation",
    expressBeat: "Live in it",
    competence: ["shelter", "root", "remember"],
    originBeat: "Tend the ground you know",
    material: "tending",
    output: "foundation",
  },
  5: {
    territory: "Making and delight",
    directive: "Make the thing and enjoy it",
    contains: "creation, play, romance, risk — whatever you do because you want to, not because it pays.",
    questions: ["What do I want to make?", "What did I stop doing when it stopped being useful?"],
    noun: "Maker",
    formBeat: "Make the thing",
    expressBeat: "Let it be seen",
    competence: ["create", "play", "risk"],
    originBeat: "Make as you always have",
    material: "making",
    output: "work",
  },
  6: {
    territory: "Work and repair",
    directive: "Get good at the daily thing",
    contains: "the ordinary work, the body, the routine, and the craft that only shows up in repetition.",
    questions: ["What would change if I did this every day?", "What is the actual next task?"],
    noun: "Practitioner",
    formBeat: "Get the method right",
    expressBeat: "Do it daily",
    competence: ["refine", "maintain", "serve"],
    originBeat: "Do the daily work",
    material: "practice",
    output: "craft",
  },
  7: {
    territory: "The other person",
    directive: "Let someone meet you as an equal",
    contains: "partnership, negotiation, open conflict — everything that requires a second person to be real.",
    questions: ["Who is this actually with?", "What have I never asked them for?"],
    noun: "Partner",
    formBeat: "Agree the terms",
    expressBeat: "Keep the agreement",
    competence: ["negotiate", "mirror", "accommodate"],
    originBeat: "Read the other person",
    material: "accommodation",
    output: "agreement",
  },
  8: {
    territory: "What is shared and entangled",
    directive: "Put it in someone else’s hands",
    contains: "shared resources, intimacy, debt, power — what cannot be held by one person alone.",
    questions: ["What am I unwilling to share control of?", "Whom would this cost if it failed?"],
    noun: "Confidant",
    formBeat: "Find what is underneath",
    expressBeat: "Trust someone with it",
    competence: ["excavate", "merge", "withhold"],
    originBeat: "Go under the surface",
    material: "depth",
    output: "bond",
  },
  9: {
    territory: "Belief and the larger frame",
    directive: "Develop your own worldview",
    contains: "philosophy, meaning, teaching, publishing, the foreign — the frame you read everything else through.",
    questions: [
      "What do I actually believe?",
      "Which principles am I willing to stand behind in public?",
      "What have I learned enough about to stop researching and make a claim?",
    ],
    noun: "Author",
    formBeat: "Form the principle",
    expressBeat: "Put it into the world",
    competence: ["frame", "expound", "range"],
    originBeat: "Take the wide view",
    material: "perspective",
    output: "thesis",
  },
  10: {
    territory: "The public record",
    directive: "Be known for it on purpose",
    contains: "vocation, reputation, authority — what you are seen doing and held to.",
    questions: ["What do I want to be known for?", "What am I willing to be held to?"],
    noun: "Builder",
    formBeat: "Build the thing that stands",
    expressBeat: "Stand behind it publicly",
    competence: ["achieve", "govern", "represent"],
    originBeat: "Deliver as you always do",
    material: "delivery",
    output: "record",
  },
  11: {
    territory: "The collective",
    directive: "Put it into a shared effort",
    contains: "friends, networks, movements, the future held in common — what needs more than you.",
    questions: ["Whose project should this be part of?", "Who else needs this to work?"],
    noun: "Ally",
    formBeat: "Find who it is for",
    expressBeat: "Give it to them",
    competence: ["convene", "ally", "project"],
    originBeat: "Work the network",
    material: "connection",
    output: "movement",
  },
  12: {
    territory: "Retreat and the unlit",
    directive: "Do the part nobody sees",
    contains: "solitude, the unconscious, surrender, the work done out of sight.",
    questions: ["What needs doing where nobody is watching?", "What am I refusing to sit with?"],
    noun: "Contemplative",
    formBeat: "Sit with it unresolved",
    expressBeat: "Let it work on you",
    competence: ["retreat", "dissolve", "absorb"],
    originBeat: "Retreat as you do",
    material: "retreat",
    output: "understanding",
  },
};
