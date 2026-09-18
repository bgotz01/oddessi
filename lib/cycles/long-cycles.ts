import type { CyclePhase } from "@/lib/cycles/house-cycle";

/**
 * The two long cycles the page draws, and the vocabulary each one speaks.
 *
 * Same shape, different speeds and different questions. Jupiter goes round in
 * twelve years and asks where life is opening; Saturn takes thirty and asks
 * where it is being asked to hold weight. Keeping both in one file is what
 * keeps them comparable — the tables sit next to each other, so a phrase that
 * drifts out of register with its opposite number is visible.
 */

export interface LongCycleSpec {
  /** The transiting body. Colour and glyph come from `lib/planets`. */
  planet: string;
  /** Section heading. */
  title: string;
  /** What the house progression IS, in the reader's words. */
  kind: string;
  /** The question the whole strip answers. */
  question: string;
  phases: CyclePhase[];
  /** The cap on the end of the row — the first house again, closing the loop. */
  rebirth: CyclePhase;
  /** Years either side of now to read. Must comfortably hold one whole loop. */
  lookbackYears: number;
  lookaheadYears: number;
}

export const JUPITER_LONG_CYCLE: LongCycleSpec = {
  planet: "Jupiter",
  title: "Jupiter Long Cycle",
  kind: "Growth cycle",
  question: "Where is life expanding?",
  lookbackYears: 14,
  lookaheadYears: 14,
  phases: [
    { house: 1, phase: "Beginning", name: "Emergence", detail: "New identity, direction, confidence." },
    { house: 2, phase: "Building", name: "Resources", detail: "Establish money, skills, values." },
    { house: 3, phase: "Exploring", name: "Learning", detail: "Ideas, connections, local environment." },
    { house: 4, phase: "Rooting", name: "Foundation", detail: "Home, family, inner security." },
    { house: 5, phase: "Expressing", name: "Creation", detail: "Creativity, romance, play, visibility." },
    { house: 6, phase: "Refining", name: "Practice", detail: "Work, routines, competence, health." },
    { house: 7, phase: "Connecting", name: "Partnership", detail: "Relationships, collaboration." },
    { house: 8, phase: "Deepening", name: "Integration", detail: "Shared resources, intimacy, transformation." },
    { house: 9, phase: "Expanding", name: "Horizons", detail: "Travel, philosophy, higher learning." },
    { house: 10, phase: "Achieving", name: "Position", detail: "Career, reputation, public contribution." },
    { house: 11, phase: "Multiplying", name: "Network", detail: "Community, alliances, future ambitions." },
    { house: 12, phase: "Completing", name: "Release", detail: "Withdrawal, closure, reflection." },
  ],
  rebirth: {
    house: 1,
    phase: "Rebirth",
    name: "New cycle",
    detail: "Jupiter re-enters the first house and the arc begins again.",
  },
};

/**
 * Saturn's table is named once per house rather than twice, so these phases
 * carry no `phase` word and the boxes are a line shorter than Jupiter's. The
 * detail is the core question, which is the form the maturation cycle is
 * actually asked in — a demand rather than a description.
 */
export const SATURN_LONG_CYCLE: LongCycleSpec = {
  planet: "Saturn",
  title: "Saturn Long Cycle",
  kind: "Maturation cycle",
  question: "Where is life asking for greater structure and maturity?",
  // Saturn takes about 29½ years, so the window has to be wider than Jupiter's
  // by the same factor or the loop the reader is inside falls out of it.
  lookbackYears: 32,
  lookaheadYears: 32,
  phases: [
    { house: 1, name: "Identity", detail: "Who am I when I have to stand on my own?" },
    { house: 2, name: "Resources", detail: "What can I sustainably support and build?" },
    { house: 3, name: "Mind", detail: "How do I think and communicate with discipline?" },
    { house: 4, name: "Foundation", detail: "What gives my life real stability?" },
    { house: 5, name: "Expression", detail: "What am I serious enough to create or commit to?" },
    { house: 6, name: "Practice", detail: "What routines and skills must I master?" },
    { house: 7, name: "Partnership", detail: "Which relationships can withstand commitment and reality?" },
    { house: 8, name: "Interdependence", detail: "What responsibilities, dependencies, and vulnerabilities must I confront?" },
    { house: 9, name: "Belief", detail: "Which beliefs survive contact with experience?" },
    { house: 10, name: "Authority", detail: "What am I capable of taking responsibility for?" },
    { house: 11, name: "Community", detail: "Which ambitions, groups, and alliances are worth committing to?" },
    { house: 12, name: "Completion", detail: "What structures have run their course and need to be released?" },
  ],
  /**
   * Deliberately NOT called the Saturn return.
   *
   * The return is Saturn meeting its own natal degree, which lands in whatever
   * house it occupied at birth — the fourth on the chart this was written
   * against. This cap is Saturn re-entering the FIRST house, a different event
   * that only coincides with the return for a chart born with Saturn there.
   */
  rebirth: {
    house: 1,
    name: "New cycle",
    detail: "Saturn re-enters the first house and the maturation begins again.",
  },
};
