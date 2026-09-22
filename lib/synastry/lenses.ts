/**
 * lib/synastry/lenses.ts
 *
 * WHICH QUESTION IS BEING ASKED OF THE SAME TWO CHARTS.
 *
 * Synastry has no idea what kind of relationship it is looking at. Two charts
 * make exactly the same contacts whether the people are lovers, co-founders,
 * friends or siblings — Venus square Mars is strong mutual activation with
 * friction in every one of those, and only the reader knows whether that lands
 * as charge or as the colleague who keeps redoing your work.
 *
 * The first version of this page did not say so. It computed Attraction off
 * Venus, Mars and Pluto for everybody, which quietly answered "are these two
 * good together romantically" whoever was being read, and put the answer under
 * a heading that made the romantic reading look like the only available one.
 *
 * A lens fixes that by changing the QUESTION and nothing underneath it.
 *
 * WHAT A LENS CHANGES
 *   which areas are read, and in what order
 *   the signature phrase, since that is drawn from the leading areas
 *   what the council is told this reading is for
 *
 * WHAT A LENS MUST NEVER CHANGE
 *   the contacts, the orbs, the cohort rule, the baselines
 *   the signature's cell, chemistry and ease
 *
 * That second list is the important one. The cell is computed from the contacts
 * directly, so it is identical under every lens, and it has to be: chemistry
 * means "more contact than N% of unrelated pairings", and a number that moved
 * when somebody pressed a toggle would not mean that any more. Two charts touch
 * each other as much as they touch each other. Asking a different question of
 * it cannot make there be more of it.
 *
 * So the page changes a great deal when a lens changes, and the measurement
 * changes not at all. That is the honest arrangement, and the page says so out
 * loud rather than leaving a reader to notice the top block never moves.
 */

import type { DimensionId } from "./dimensions";

export type LensId = "romantic" | "partnership" | "friendship" | "family";

export interface Lens {
  id: LensId;
  /** The toggle's label. */
  label: string;
  /**
   * Who this lens is for. A fragment, not a sentence — everything printed on
   * this page is points now, and a type that invites prose gets prose.
   */
  forWhom: string;
  /** The areas it reads, in the order it reads them. */
  areas: readonly DimensionId[];
  /**
   * What is deliberately not asked, as points, so the omission is visible.
   *
   * A filter that silently drops a heading is indistinguishable from a bug, and
   * a reader who saw Attraction under one toggle and not another will assume
   * the page is hiding a bad result rather than declining to ask an irrelevant
   * question.
   */
  omits: readonly string[];
  /**
   * Handed to the council so it frames the whole reading correctly.
   *
   * The one field here that is still prose, and deliberately. It is never
   * printed — it is a system-prompt fragment, and a model reading terse points
   * will fill the gaps between them itself, which is exactly what this text
   * exists to stop it doing.
   */
  framing: string;
}

export const LENSES: Record<LensId, Lens> = {
  romantic: {
    id: "romantic",
    label: "Romantic",
    forWhom: "Involved, or might be",
    areas: [
      "attraction",
      "emotional",
      "communication",
      "identity",
      "lifestyle",
      "commitment",
      "growth",
    ],
    omits: ["Nothing omitted — the widest reading the engine offers"],
    framing:
      "This is being read as a romantic pairing. Attraction here means physical and romantic pull, and Commitment means what two people would choose to hold each other to. Never advise either of them to stay in or leave a relationship, and never describe the absent person's character or intentions.",
  },

  partnership: {
    id: "partnership",
    label: "Partnership",
    forWhom: "Co-founders, collaborators, working equals",
    areas: [
      "drive",
      "communication",
      "lifestyle",
      "power",
      "commitment",
      "identity",
      "growth",
    ],
    omits: [
      "Not read: Attraction, Emotional",
      "Their Venus and Mars contacts still count toward the pair above",
      "Not a heading to be led by when the question is whether two people can build something",
    ],
    framing:
      "This is being read as a WORKING relationship — business partners, co-founders or collaborators. Do not romanticise it and do not read Venus or Mars contacts as attraction: between colleagues the same contacts are rapport, rivalry, or a clash of pace. The 7th house here is the classical one, meaning any formal one-to-one agreement, not marriage. Power & Trust is about who can overrule whom and how safely resources are shared. The failure mode to refuse is 'should I go into business with this person' — that is as unanswerable from two charts as whether they should marry, and for the same reason: nothing here knows either person's track record, competence or honesty.",
  },

  friendship: {
    id: "friendship",
    label: "Friendship",
    forWhom: "Chosen company, nothing being built",
    areas: [
      "rapport",
      "communication",
      "emotional",
      "growth",
      "identity",
      "lifestyle",
    ],
    omits: [
      "Not read: Attraction, Commitment",
      "A friendship is held together by neither",
      "Asking what would make it last imports an obligation nobody agreed to",
    ],
    framing:
      "This is being read as a FRIENDSHIP. Rapport is enjoyment and ease, not attraction — it is computed without Mars or Pluto for exactly that reason. Do not treat the absence of Commitment as a weakness in the bond; a friendship is not supposed to be a contract. Do not suggest either person is secretly attracted to the other.",
  },

  family: {
    id: "family",
    label: "Family",
    forWhom: "Parent, child, sibling — neither chose the other",
    areas: [
      "emotional",
      "identity",
      "obligation",
      "communication",
      "growth",
      "lifestyle",
    ],
    omits: [
      "Not read: Attraction",
      "Commitment becomes Obligation",
      "Same Saturn contacts, asked as what is owed rather than what was promised",
    ],
    framing:
      "This is being read as a FAMILY tie, and it is the only lens where neither person chose the other — so every reading that assumes a relationship can be renegotiated or left is wrong here by construction. Hard Saturn and Pluto contacts between family members are ordinary and are not evidence of abuse; do not diagnose a family, do not assign blame to the absent person, and do not suggest estrangement. Obligation describes a structural pull, not a duty anyone is under.",
  },
};

export const LENS_IDS = Object.keys(LENSES) as LensId[];

export const DEFAULT_LENS: LensId = "romantic";
