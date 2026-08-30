/**
 * lib/career/interpretations.ts
 *
 * WHAT THINGS MEAN. Its counterpart, `reading.ts`, decides HOW THOSE MEANINGS
 * COMBINE for a particular window.
 *
 * That division is the point of the file existing. Nothing here computes
 * anything, imports a component, or knows what a chart is; and nothing in the
 * composer chooses a word. A reading that comes out wrong is wrong in one of
 * those two places, and which one tells you whether the fix is a sentence or a
 * rule.
 *
 * The tables are COMPOSITIONAL, never enumerated against each other. Five
 * processes, four addresses and four geometries are eighty readings out of
 * thirteen entries — and the day a sixth body or a fifth address appears, that
 * is one new entry rather than sixteen. Writing the eighty out would produce
 * better individual sentences and a model that had quietly stopped deriving
 * anything.
 *
 * Three dimensions, deliberately independent:
 *
 *   PROCESS    what kind of change is happening — from the transiting body
 *   ADDRESS    which part of the career structure it is happening to
 *   GEOMETRY   what shape the contact takes — from the aspect
 *
 * Everything a reader sees is those three plus the chart's own nouns. Add a
 * dimension by adding a table, never by multiplying an existing one.
 *
 * THE CLAIM EVERY ENTRY IS WRITTEN UNDER
 * None of this predicts an event, a title, a salary or an outcome. A transit
 * says the vocational structure is being worked on; what a person does with
 * that is not in the sky. Every `trap` below exists because the failure mode
 * of a career reading is not a wrong forecast — it is a reader who waits for
 * the period to deliver something instead of using it.
 */

import type { CareerTargetKind } from "./model";

/**
 * What each planet DOES to a career, named in ordinary English.
 *
 * `label` is user-facing and has to survive being read by someone who does not
 * know what a transit is. That rules out the astrological register — nobody
 * says "dissolution" — and it rules out borrowing an evocative everyday word
 * for a technical meaning, which is worse: a reader who sees "Breakthrough"
 * thinks a promotion, not two bodies on the Midheaven — which is why that word
 * is no longer one of the grades.
 *
 * Not a ranking, and the distinction matters more here than anywhere else in
 * the app. Pluto is not "more" than Saturn — it is a different verb, and the
 * difference is the entire reading: Pluto on the Midheaven is not a stronger
 * Saturn on the Midheaven, it is reinvention where the other is consolidation.
 * Ordering these by weight, which is the conventional move, throws away the
 * only interesting thing about them and replaces it with a number nobody can
 * justify.
 */
export interface ProcessEntry {
  /** The abstract noun — Consolidation, Reinvention. Half of a period's name. */
  label: string;
  /** The verb, for a lane label: "Saturn · Consolidate". */
  role: string;
  /** Three or four words under the verb. No chart nouns. */
  shortGloss: string;
  /** What it does to a career, as a clause completing "Saturn …". */
  gloss: string;
  /** "A stripping", "A widening". The subject of a composed title. */
  noun: string;
  /** Third-person verb: what it does TO whatever it touches. */
  verb: string;
  /** "by …" — the mechanism, as a clause completing "it works …". */
  how: string;
  /** The same mechanism compressed into a scannable bullet fragment. */
  mechanismNoun: string;
  /** What this process makes possible. Completes "the opening is to …". */
  opening: string;
  /** This process's own failure mode, as a complete sentence. */
  trap: string;
  /**
   * The same two as noun phrases — "Structure that survives contact".
   *
   * Not derived from the sentences above and not derivable from them. A
   * sentence explains; a noun phrase is meant to be recognised at a glance and
   * carried out of the room, and the compression is a separate act of writing
   * rather than a truncation. Both forms are kept because both are used: the
   * panel shows the nouns, the chat is handed the sentences, and prose written
   * from prose beats prose reconstructed from labels.
   */
  openingNoun: string;
  trapNoun: string;
  /** Completes "in these areas, the period …". */
  pressure: string;
}

export const PROCESS: Record<string, ProcessEntry> = {
  Jupiter: {
    label: "Opportunity",
    role: "Widen",
    shortGloss: "enlarges the options",
    gloss:
      "opens, enlarges and offers. More becomes possible: greater reach, a wider field, or an option the existing arrangement did not contain. Jupiter creates room; it does not decide what is done with it.",
    noun: "A widening",
    verb: "enlarges",
    how:
      "putting more within reach than the current arrangement was built to hold",
    mechanismNoun: "More options and reach than the current arrangement can hold",
    opening:
      "recognise the larger option and decide whether it is worth taking",
    trap:
      "More becomes available and is mistaken for progress by itself. The opportunity is enjoyed, discussed or accumulated without being converted into a meaningful change.",
    openingNoun: "A wider field actually used",
    trapNoun: "Opportunity mistaken for achievement",
    pressure: "widens what is possible",
  },

  Saturn: {
    label: "Consolidation",
    role: "Consolidate",
    shortGloss: "tests what can hold",
    gloss:
      "tests, defines and consolidates. The career meets limits, obligations or standards that reveal what is structurally sound enough to carry more weight.",
    noun: "A consolidation",
    verb: "tests",
    how:
      "making the structure answer to limits, consequences and sustained responsibility",
    mechanismNoun: "Limits, consequences and sustained responsibility",
    opening:
      "strengthen what deserves to last and accept the responsibility that comes with it",
    trap:
      "Constraint is treated only as obstruction. Energy goes into resisting the limit instead of discovering what the limit is revealing about the structure.",
    openingNoun: "Structure strong enough to carry weight",
    trapNoun: "Constraint resisted instead of used",
    pressure: "tests what can endure",
  },

  Uranus: {
    label: "Reorientation",
    role: "Reorient",
    shortGloss: "breaks the fixed route",
    gloss:
      "disrupts, separates and reorients. An established way of working becomes less binding, making another route, method or degree of independence possible.",
    noun: "A reorientation",
    verb: "disrupts",
    how:
      "loosening an arrangement that had come to feel fixed or inevitable",
    mechanismNoun: "A fixed arrangement loosening",
    opening:
      "use the disruption to discover what needs greater freedom or a different route",
    trap:
      "Freedom becomes an end in itself. What is restrictive is abandoned before there is any distinction between the structure that was obsolete and the structure that was necessary.",
    openingNoun: "A route chosen rather than inherited",
    trapNoun: "Disruption mistaken for direction",
    pressure: "loosens what had become fixed",
  },

  Neptune: {
    label: "Calling",
    role: "Clarify",
    shortGloss: "softens the old definition",
    gloss:
      "dissolves certainty around what the work is for. A role that once had a clear definition can become less convincing while a more imaginative, meaningful or difficult-to-name direction becomes perceptible.",
    noun: "A dissolving",
    verb: "softens",
    how:
      "making the existing definition less convincing before another one is fully formed",
    mechanismNoun: "The old definition fading before a new one forms",
    opening:
      "stay with the uncertainty long enough to distinguish a genuine pull from an attractive projection",
    trap:
      "Ambiguity is ended too quickly. A role, ideal or promise is accepted because it removes uncertainty rather than because it has become clear.",
    openingNoun: "A calling given time to become legible",
    trapNoun: "Certainty chosen to escape ambiguity",
    pressure: "softens the existing definition",
  },

  Pluto: {
    label: "Reinvention",
    role: "Reinvent",
    shortGloss: "exposes what cannot stay",
    gloss:
      "intensifies, strips back and reconstructs. Parts of the career structure that can no longer remain in their existing form become harder to ignore, bringing questions of power, attachment and renewal to the foreground.",
    noun: "A reconstruction",
    verb: "reworks",
    how:
      "exposing what has become too exhausted, rigid or compromised to continue unchanged",
    mechanismNoun: "What is exhausted, rigid or compromised becoming impossible to ignore",
    opening:
      "release the version that can no longer carry the work and build from what remains essential",
    trap:
      "Change is treated only as loss. Energy goes into preserving a position or structure whose limitations are precisely what the period is exposing.",
    openingNoun: "Authority rebuilt around what matters",
    trapNoun: "An exhausted structure defended",
    pressure: "exposes what cannot remain unchanged",
  },
};

/** The five bodies the model counts as processes at all. */
export const PROCESS_PLANETS = Object.keys(PROCESS);

export const UNKNOWN_PROCESS: ProcessEntry = {
  label: "Activation",
  role: "Activate",
  shortGloss: "touches the structure",
  gloss: "contacts the vocational structure without a named process.",
  noun: "An activation",
  verb: "touches",
  how: "contacting the structure",
  mechanismNoun: "Direct contact with the vocational structure",
  opening: "notice what is being asked before deciding what to do about it",
  trap: "The period passes without being used.",
  openingNoun: "Attention on the structure",
  trapNoun: "A season spent waiting",
  pressure: "touches the structure",
};

export function processOf(planet: string): ProcessEntry {
  return PROCESS[planet] ?? UNKNOWN_PROCESS;
}

/**
 * WHICH PART of the career structure is being worked on.
 *
 * The second dimension, and the one that makes two Pluto periods different
 * from each other. Pluto on the Midheaven is a public standing being rebuilt;
 * Pluto on the ruler of the tenth is the machinery that produces the standing
 * being rebuilt, which is a quieter event with a longer tail and frequently no
 * outward sign at all for years.
 *
 * Coarser than the astrology underneath on purpose — it has to be answerable
 * for a planet grinding through the tenth house as well as for a degree-exact
 * contact on the angle.
 */
export interface AddressEntry {
  /** "The public standing". What is being worked on. */
  label: string;
  /** Two or three words, for a tight label. */
  short: string;
  /** Completes "the period acts on …". */
  object: string;
  /** Completes a title: "A stripping OF THE PUBLIC ROLE". */
  titleTail: string;
  /** What is under contact, as a sentence. */
  activated: string;
  /** The instruction this address takes. The centrepiece of a reading. */
  move: string;
  /** The primary instruction compressed into one scannable bullet fragment. */
  moveNoun: string;
  /** What this address makes possible, as a sentence completing the process's. */
  opening: string;
  /** How this address specifically gets wasted. */
  trap: string;
  openingNouns: string[];
  trapNouns: string[];
}

export const ADDRESS: Record<CareerTargetKind, AddressEntry> = {
  midheaven: {
    label: "The public standing",
    short: "Standing",
    object: "the visible position itself",
    titleTail: "of the public role",

    activated:
      "The Midheaven — the visible edge of the career: what you are known for, the position you occupy, and the direction your work presents to the world. Contact here acts directly on public standing, so its effects tend to be more externally legible than contacts elsewhere in the career structure.",

    move:
      "Examine the public position itself. Ask whether what you are becoming known for still represents the work you want to stand behind, and where the visible role needs to change with the substance underneath it.",
    moveNoun: "Alignment between the public position and the work underneath it",

    opening:
      "The visible position is unusually available for reconsideration.",

    trap:
      "The period is managed only as reputation. Attention stays on preserving or improving the visible position while the work underneath it goes unexamined.",

    openingNouns: ["A public position chosen deliberately"],
    trapNouns: ["Reputation defended instead of substance"],
  },

  tenthRuler: {
    label: "The career machinery",
    short: "Machinery",
    object: "the function that runs the career",
    titleTail: "of what drives the career",

    activated:
      "The ruler of the tenth — the natal function through which the career is organised and expressed. Contact here works on the machinery producing the public role rather than on the role alone, so an important period may begin internally before becoming visible externally.",

    move:
      "Look beneath the position at what produces it: the skills, methods, relationships, decisions or capacities through which the career actually operates. Work on the engine before judging the dashboard.",
    moveNoun: "Adjustment of the engine behind the public position",

    opening:
      "The underlying machinery of the career is unusually available for adjustment.",

    trap:
      "Nothing obvious happens externally, so the period is treated as empty. Attention goes looking for a visible career event while the more consequential change is occurring in how the career works.",

    openingNouns: ["The machinery deliberately reworked"],
    trapNouns: ["Internal change dismissed for lacking an event"],
  },

  tenthTenant: {
    label: "The instrument in the career",
    short: "Instrument",
    object: "a natal faculty embedded in the career house",
    titleTail: "of a working instrument",

    activated:
      "A planet placed in the tenth house — a particular natal faculty already involved in public and vocational life. Contact here activates that instrument specifically rather than making a claim about the career as a whole.",

    move:
      "Identify the faculty being contacted and examine how it is currently being used in the work. The value of this address is its specificity: one instrument can change without requiring a verdict on the entire career.",
    moveNoun: "Focused revision of the faculty under contact",

    opening:
      "One identifiable part of the vocational toolkit is unusually available for development or revision.",

    trap:
      "A specific contact is inflated into a judgment about the whole career. The instrument is activated; the entire vocational direction does not necessarily need to change.",

    openingNouns: ["One faculty deliberately reworked"],
    trapNouns: ["A local contact mistaken for a career verdict"],
  },

  tenthHouse: {
    label: "The career season",
    short: "Season",
    object: "the broader vocational field",
    titleTail: "of the career season",

    activated:
      "A slow body moving through the tenth house — a sustained background condition around public and vocational life. Unlike an aspect to the Midheaven or tenth ruler, this describes the climate of a period rather than a concentrated contact on a single career point.",

    move:
      "Read the transit as context rather than as an event. Notice the conditions shaping this stretch of vocational life and how they alter the environment in which more precise contacts occur.",
    moveNoun: "The transit read as career context rather than a single event",

    opening:
      "The broader vocational field is carrying this process for an extended period.",

    trap:
      "A long background transit is treated as though it should produce one identifiable event. The climate is mistaken for the weather on a particular day.",

    openingNouns: ["A long career season consciously used"],
    trapNouns: ["A climate mistaken for an event"],
  },
};

export function addressOf(kind: CareerTargetKind): AddressEntry {
  return ADDRESS[kind];
}

/**
 * WHAT SHAPE the contact takes, from the aspect.
 *
 * The third dimension. It reverses the meaning of an otherwise identical hit:
 * Saturn conjunct the Midheaven is a position being formalised, Saturn
 * opposite it is the private ground under the position being tested instead —
 * same body, same address, opposite arena.
 *
 * Four entries rather than five, because trine and sextile make one claim
 * between them: the contact is available rather than compulsory. The
 * distinction between them is a difference of degree that no reader can act
 * on differently, and inventing two paragraphs for it would be writing to fill
 * a table.
 */
export type Geometry = "arrival" | "counterweight" | "friction" | "offer";

export interface GeometryEntry {
  label: string;
  /** Completes "the contact arrives as …". */
  shape: string;
  /** What this geometry asks, as a clause. */
  asks: string;
}

export const GEOMETRY: Record<Geometry, GeometryEntry> = {
  arrival: {
    label: "Arrival",
    shape: "a conjunction, the body standing on the point itself",
    asks:
      "something new begins here rather than being adjusted; the contact is the start of a period, not the middle of one",
  },
  counterweight: {
    label: "Counterweight",
    shape: "an opposition, the body standing at the far end of the axis",
    asks:
      "the other end of the career axis makes its claim; the private ground the public position rests on becomes the thing under pressure",
  },
  friction: {
    label: "Friction",
    shape: "a square, the body cutting across the axis",
    asks:
      "the structure is asked to change shape rather than to hold; the discomfort is the mechanism and not a sign the direction is wrong",
  },
  offer: {
    label: "Offer",
    shape: "a soft aspect, the body in supportive contact",
    asks:
      "the change is available and not compulsory, which is why it is the geometry most often noticed only afterwards",
  },
};

/**
 * A house transit has no aspect, and it is not a conjunction.
 *
 * Passing `null` yields `arrival` in the naive version of this function, which
 * would say a fourteen-year Neptune crossing of the tenth "begins here" on
 * every one of its five thousand days. A field being crossed is an `offer`:
 * present, available, and never an event.
 */
export function geometryOf(aspect: string | null): Geometry {
  if (aspect === "Conjunction") return "arrival";
  if (aspect === "Opposition") return "counterweight";
  if (aspect === "Square") return "friction";
  return "offer";
}

export function geometryLabel(g: Geometry): string {
  return GEOMETRY[g].label;
}

/**
 * How the model classifies a window, in words that do not overclaim.
 *
 * The hedge on the top grade is the whole credibility of the page. Two bodies
 * on the Midheaven is an OBSERVATION; that a turning point follows is a guess
 * about a life, and the two must not be printed in the same register.
 */
export const CLASSIFICATION: Record<string, string> = {
  active: "Locally active",
  convergence: "High convergence",
  turningPoint: "Potential turning point",
};

export function classificationOf(grade: string): string {
  return CLASSIFICATION[grade] ?? "Activation";
}

/** The sentence every numeric reading on the page is qualified by. */
export const CAREER_CAVEAT =
  "The index measures how densely the vocational structure is being contacted, not how well the career is going. A loud period can be a hard one and a quiet decade can be the most productive of a life — what the number cannot tell you is which, because that depends on what is done with the period rather than on what the sky is doing to it.";
