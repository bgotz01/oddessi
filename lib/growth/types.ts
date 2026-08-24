/**
 * lib/growth/types.ts
 * The public shape of a growth reading.
 *
 * Separated from the composer so that the vocabulary modules, the derivations
 * and the components can all agree on a contract without importing each other's
 * implementations. Nothing here computes anything.
 */

import type { Placement } from "@/lib/charts";
import type { SignEntry } from "./signs";
import type { HouseEntry } from "./houses";
import type { Crossing } from "./crossing";
import type { ArchetypeQuestionsEntry as ArchetypeQuestions } from "./archetype-questions";
import type { SignElement, SignModality } from "@/lib/symbols";

export interface Pole {
  node: "North Node" | "South Node";
  sign: string;
  degree: string;
  house: number | null;
  element: SignElement | null;
  modality: SignModality | null;
  ruler: string;
  rulerPlacement: Placement | null;
  /** Bodies standing in this pole's house. The deep pattern's raw material. */
  tenants: Placement[];
}

export interface Conversion {
  /**
   * The transformation in two words — COMPARISON → CONVICTION.
   *
   * The row's headline, and the reason the section has a grammar rather than a
   * list: the macro arc above it is INVESTIGATION → THESIS, each row is the
   * same shape one scale down, and the sentences beneath are the explanation.
   * Written as one noun each because two nouns and an arrow is a thing a
   * reader remembers; "use it to reach an independent conclusion" is not.
   */
  fromMode: string;
  intoMode: string;
  /** What the person already does. */
  from: string;
  /** What doing it in the new arena looks like. Imperative, no preamble. */
  into: string;
  /**
   * The body that put this row here, when one did.
   *
   * The sign supplies a generic set of conversions — every Libra South Node
   * gets the same four. What makes a chart's conversion specific is whatever is
   * standing in the ground being left: Pluto in the third does not add a
   * footnote about investigation, it adds a row, because it changes what the
   * third house's competence *is*. Rows carrying a body are the ones that could
   * only have come from this chart.
   *
   * It is also the split the section renders: rows without it are the core
   * conversions of the axis, rows with it are this chart's own.
   */
  from_body?: string;
}

export interface DeepPattern {
  body: string;
  /** Which side of the axis this body is embedded in. */
  side: "departing" | "arriving";
  sign: string;
  degree: string;
  house: number;
  verbs: string[];
  charge: string;
}

export interface Resistance {
  /** The habitual return, from the South Node sign. */
  pullback: string;
  /**
   * How the return shows up, also from the SOUTH Node sign.
   *
   * Both of these describe going *back*, so both read off the departing pole.
   * Taking them from `movement` — the arriving sign — would describe the wrong
   * half of the axis and contradict the pullback sentence sitting next to it.
   */
  tells: string[];
  /** Where the old strategy's ruler lives — the mechanism's address. */
  ruler: {
    body: string;
    sign: string;
    degree: string;
    house: number | null;
  } | null;
  /** Bodies reinforcing the departing ground. */
  reinforcing: DeepPattern[];
  /** Bodies conjunct the South Node itself. */
  anchored: string[];
}

/**
 * The conversion, compressed to two nouns — "INVESTIGATION → THESIS".
 *
 * The left side is what the departing ground actually supplies. When a body is
 * embedded there it names the material (Pluto → investigation), because a third
 * house with Pluto in it supplies something quite different from a third house
 * without it; otherwise the house's own material is used. The right side is
 * what the arriving house produces.
 */
export interface ConversionArc {
  from: string;
  into: string;
  /** True when a body embedded in the departing ground named the left side. */
  specific: boolean;
  /**
   * What the left side would have read without that body — the house's own
   * material. Kept so the figure can say what the generic version *would* have
   * been: "investigation, not comparison" is a far better argument for why this
   * chart is specific than "investigation" on its own.
   */
  genericFrom: string;
}

/**
 * Something already working in your favour.
 *
 * The model spent its first several versions on what the chart is leaving, what
 * it is heading toward and what resists — and nothing at all on what helps,
 * which left the reading lopsided in a way no chart deserves. These are the
 * placements that are already pointed the right way.
 *
 * Two of the five kinds are guaranteed to exist in every chart — the node's
 * ruler and Jupiter — so this section never renders empty and never has to
 * apologise for itself.
 */
export type TailwindKind =
  | "guide"
  | "fused"
  | "support"
  | "arena"
  | "expansion";

export interface Tailwind {
  body: string;
  kind: TailwindKind;
  /**
   * True only for relations that are evidence of EASE.
   *
   * A soft aspect to the axis is. Being the node's ruler is a route, being
   * conjunct the node is alignment, sharing the node's house is proximity, and
   * Jupiter existing is barely a relation at all — all four are relevant, none
   * is help. Without this flag the section counted five kinds of relevance and
   * called the total "already on your side".
   */
  assists: boolean;
  /** Two or three words, for the label beside the placement. */
  label: string;
  /** One composed sentence saying what it does for the move. */
  detail: string;
  sign: string;
  degree: string;
  house: number | null;
}
export interface Trajectory {
  from: Pole;
  to: Pole;
  /** "Interpreter → Author". The compressed arc. */
  arc: { from: string; into: string };
  /** Four imperative beats under the arc. */
  strapline: string[];
  movement: SignEntry;
  arena: HouseEntry | null;
  /** The arriving pole's questions — sign first, then the arena's. */
  questions: string[];
  /** The departing pole's, for reading the two sides against each other. */
  reflexQuestions: string[];
  /**
   * The move each pole names, written for the sign IN THAT HOUSE.
   *
   * `questions` and `reflexQuestions` above are keyed by sign alone, which
   * makes them true of the whole axis rather than of this chart — every Libra
   * South Node gets the same three. These are the 144-entry table: Aries in the
   * ninth is "Stake your worldview", Aries in the sixth is "Act on the
   * problem", and neither sentence is available from the sign or the house on
   * its own.
   *
   * Null when a node has no house, which happens on a chart stored without an
   * ascendant. Everything that reads these must have a sign-level fallback.
   */
  practice: {
    /** The practised move — what the questions on the old side are catching. */
    departing: ArchetypeQuestions | null;
    /** The developmental move, and the questions that open it. */
    arriving: ArchetypeQuestions | null;
  };
  conversions: Conversion[];
  /**
   * Whether the core conversions were written for this axis IN THESE HOUSES,
   * rather than for the sign pair alone.
   *
   * Displayed, not just tracked. A reader who is told a conversion comes from
   * the axis is owed the difference between "true of every Libra South Node"
   * and "written for Libra in the third becoming Aries in the ninth" — the
   * second is a much stronger claim and should not borrow the first's credit.
   */
  conversionsAreAxisSpecific: boolean;
  /** The conversion's own two-word headline. */
  conversionArc: ConversionArc;
  /**
   * One composed sentence saying what the departing ground actually is, given
   * what stands in it. This is the claim that Deep Pattern used to make as a
   * separate section — it belongs inside the conversion, because it is about
   * what is being converted.
   */
  groundReading: string;
  /** The moment a competence turns into resistance, composed. */
  resistanceTurn: string;
  deep: DeepPattern[];
  resistance: Resistance;
  /** True when the nodes are not in opposite houses — rare, but possible. */
  irregularAxis: boolean;
  /** What is already working in the move's favour. Never empty. */
  tailwinds: Tailwind[];
  /**
   * A body standing across the whole movement, or null — which is most charts.
   *
   * This replaced a pair of fields, a boolean and a list, that encoded one fact
   * twice and could in principle disagree. `t.crossing` now *is* the question:
   * either the chart has one or it does not.
   *
   * Deliberately not part of `resistance`. Resistance is the South Node's own
   * gravity — the developed strategy staying easier to reach. A crossing is a
   * third party neither end of the axis resolves, and collapsing the two would
   * lose the distinction the reading depends on.
   */
  crossing: Crossing | null;
}
