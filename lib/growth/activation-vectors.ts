/**
 * lib/growth/activation-vectors.ts
 *
 * What the chart is asking you to develop, and what to rely on less.
 *
 * The reading one module over answers "what is this period doing" in prose,
 * and prose is the right shape for a claim with a caveat in it. It is the
 * wrong shape for the question a reader actually arrives with, which is not
 * "what is happening to me" but "what am I supposed to practise, and what am I
 * supposed to lean on less". That question wants two columns of nouns, not a
 * paragraph, and it wants the same two columns every time so a reader can
 * recognise their own trajectory across a dozen periods.
 *
 * Two rules hold this together, and both are refusals.
 *
 * NOTHING HERE IS INVENTED. Every noun on both sides was authored — in the
 * 144-key axis table, in the sign fallback beneath it, or in the body verbs
 * that add a row for whatever stands in the departing ground. This module
 * selects, deduplicates and orders; it never composes a pair. A vector engine
 * that could write "Others' perspective → Personal judgment" out of generic
 * word lists would produce something plausible for every chart and true of
 * none, and the plausibility is what makes it dangerous.
 *
 * THE ACTIVATION DOES NOT SET THE DIRECTION. The trajectory decides what the
 * vectors are — they are the same at nineteen and at sixty-two. A period only
 * decides which end of them is under pressure right now and how hard. Letting
 * a transit reorder a person's developmental direction would make the
 * direction a function of the sky rather than of the chart, which is precisely
 * the horoscope logic the Growth model exists to replace.
 *
 * What the period does contribute is emphasis. Forward pressure puts the
 * arriving column in front; a return puts the departing column in front,
 * because that is the material arriving back in quantity; a crossroads shows
 * both with the arrow between them, since neither column answers it alone.
 *
 * The left column is never a fault. The whole nodal model treats the departing
 * side as competence being converted — it is the raw material, and the reader
 * is good at it — so the labels say RELY LESS and never REDUCE, and certainly
 * never anything with a moral in it.
 */

import { PROCESS, UNKNOWN_PROCESS, type Orientation } from "./activation-interpretations";
import type { ActivationWindow } from "./activation-windows";
import { beatLabel } from "./timing";
import type { Conversion, Trajectory } from "./types";

/** How many vectors a panel shows. */
const VECTOR_LIMIT = 3;

/**
 * Which column the period puts in front.
 *
 * Three values for four orientations: `mixed` reads as a polarity like
 * `crossroads` does, because when both ends are under pressure from different
 * directions there is no single column to lead with either.
 */
export type VectorEmphasis = "develop" | "revisit" | "polarity";

export interface DevelopmentVector {
  /** The practised capacity — one noun. "Certainty". */
  from: string;
  /** The developmental capacity — one noun. "Exploration". */
  into: string;
  /** What the person already does. One sentence. */
  fromDetail: string;
  /** What doing it in the new arena looks like. Imperative. */
  intoDetail: string;
  /**
   * The body that put this vector on the chart, when one did.
   *
   * Rows carrying a body are the ones that could only have come from this
   * chart, which is why they are ranked above the axis rows and why the
   * display marks them with the glyph.
   */
  body?: string;
  /**
   * True when this vector's own body is under pressure in this window.
   *
   * The strongest signal available and the only one the period contributes to
   * ordering: a chart whose Pluto row reads INVESTIGATION → THESIS, in a
   * season where Pluto is the thing making contact, is being asked about that
   * exact conversion rather than about the axis in general. It reorders the
   * list; it never changes what is in it.
   */
  activated: boolean;
  /**
   * True when the vector was written for this axis in these houses, rather
   * than for the sign pair alone.
   *
   * Displayed rather than merely tracked, for the same reason the trajectory
   * exposes `conversionsAreAxisSpecific`: "true of every Libra South Node" and
   * "written for Libra in the third becoming Aries in the ninth" are different
   * strengths of claim and the weaker one should not borrow the stronger one's
   * credit.
   */
  axisSpecific: boolean;
}

/** One pressure, named by what it does rather than by where it is. */
export interface VectorPressure {
  /** "Saturn", or "" for a nodal beat, which has no body. */
  planet: string;
  /** "Commitment", "Transformation", "Cycle checkpoint". */
  process: string;
  /** Direct contact with the axis, as opposed to structural. */
  direct: boolean;
}

export interface VectorReading {
  emphasis: VectorEmphasis;
  /** "Develop", "Revisit", "Your development". The section's heading. */
  heading: string;
  /** Column head for the departing side. Never "Reduce". */
  fromLabel: string;
  /** Column head for the arriving side. */
  intoLabel: string;
  /** One line saying why this period emphasises this column. */
  note: string;
  /** Three at most, strongest first. Never empty. */
  vectors: DevelopmentVector[];
  /**
   * What is pressing on them, as glyph-and-noun rather than as astrology.
   *
   * The planet changes the QUALITY of the push — commitment, transformation,
   * liberation — and that is a thing a noun can carry. Spending a sentence on
   * "Pluto is creating a transformative period in which…" says no more and
   * costs a paragraph.
   */
  pressures: VectorPressure[];
}

const EMPHASIS: Record<
  VectorEmphasis,
  { heading: string; fromLabel: string; intoLabel: string; note: string }
> = {
  develop: {
    heading: "Develop",
    fromLabel: "Rely less",
    intoLabel: "Develop more",
    note: "The period pushes toward the right-hand column. These are the capacities to practise badly for a while rather than admire from inside what you are already good at.",
  },
  revisit: {
    heading: "Revisit",
    fromLabel: "Resurfacing",
    intoLabel: "Convert toward",
    note: "The left-hand column is what comes back round in this period, in usable quantity. It is material to convert, not a direction to move back into.",
  },
  polarity: {
    heading: "Your development",
    fromLabel: "Rely less",
    intoLabel: "Develop more",
    note: "Both ends are under pressure at once, so the whole vector is live rather than either column on its own.",
  },
};

/**
 * A quiet stretch has no season and still has a direction.
 *
 * The vectors are natal — they are the same at nineteen and at sixty-two — so
 * a reader who clicks into a period with nothing converging on it must still
 * be shown what their chart is asking them to develop. Only the emphasis is
 * missing, and with no orientation to lean on, the full polarity is the
 * honest reading: neither column is being pressed harder than the other.
 */
function emphasisOf(o: Orientation | null): VectorEmphasis {
  if (o === "forward") return "develop";
  if (o === "return") return "revisit";
  return "polarity";
}

const QUIET_NOTE =
  "Nothing unusual is pressing on the trajectory just now. These are what it asks for regardless — the direction runs whether or not anything is amplifying it.";

const norm = (s: string) => s.trim().toLowerCase();

/**
 * Whether two rows are making the same claim.
 *
 * Any shared noun on either side counts, and it is checked across the full
 * authored sets rather than the headline words alone — which is the entire
 * reason those sets are carried through composition. The axis table's
 * ["Autonomy", "Independence"] and a body row's "Independence" are one vector
 * written twice, and a panel of three that spends two of them on the same idea
 * has wasted the format.
 */
function collides(a: DevelopmentVector, b: DevelopmentVector, sets: Map<DevelopmentVector, { from: Set<string>; into: Set<string> }>): boolean {
  const x = sets.get(a);
  const y = sets.get(b);
  if (!x || !y) return false;
  for (const n of x.from) if (y.from.has(n)) return true;
  for (const n of x.into) if (y.into.has(n)) return true;
  return false;
}

/**
 * The developmental vectors, ordered and cut to three.
 *
 * The ordering is a claim about evidence, strongest first:
 *
 *   1  a body row whose body is under pressure right now — this chart's own
 *      conversion, and the one the period is actually asking about
 *   2  a body row — this chart's own, whatever the sky is doing
 *   3  an axis row — written for these signs in these houses
 *   4  a sign row — true of the axis, arena-blind
 *
 * Ties keep the authored order, because the tables are written with their
 * strongest row first and a stable sort preserves that judgment.
 */
export function developmentVectors(
  t: Trajectory,
  w: ActivationWindow | null,
): VectorReading {
  const pressed = new Set((w?.activations ?? []).map((a) => a.planet));

  const all: DevelopmentVector[] = t.conversions.map((c: Conversion) => ({
    from: c.fromMode,
    into: c.intoMode,
    fromDetail: c.from,
    intoDetail: c.into,
    body: c.from_body,
    activated: Boolean(c.from_body && pressed.has(c.from_body)),
    axisSpecific: c.from_body ? false : t.conversionsAreAxisSpecific,
  }));

  // The synonym sets, built once. A vector's own headline is included so a row
  // from the sign layer — which authored only one noun per side — still
  // collides with an axis row that happens to use that same word.
  const sets = new Map(
    all.map((v, i) => {
      const c = t.conversions[i];
      return [
        v,
        {
          from: new Set([v.from, ...c.fromModes].map(norm)),
          into: new Set([v.into, ...c.intoModes].map(norm)),
        },
      ] as const;
    }),
  );

  const rank = (v: DevelopmentVector) =>
    v.activated ? 0 : v.body ? 1 : v.axisSpecific ? 2 : 3;

  const ordered = all
    .map((v, i) => ({ v, i }))
    .sort((a, b) => rank(a.v) - rank(b.v) || a.i - b.i)
    .map(({ v }) => v);

  const chosen: DevelopmentVector[] = [];
  for (const v of ordered) {
    if (chosen.length >= VECTOR_LIMIT) break;
    if (chosen.some((c) => collides(c, v, sets))) continue;
    chosen.push(v);
  }

  // Deduplication can starve the list on a chart whose rows genuinely overlap.
  // Three distinct vectors are better than three, but two real ones beat two
  // real ones plus a restatement — so the shortfall is accepted rather than
  // backfilled, and only a completely empty list falls back to the ordered
  // rows, which cannot happen while a trajectory always has conversions.
  const vectors = chosen.length ? chosen : ordered.slice(0, VECTOR_LIMIT);

  const pressures: VectorPressure[] = [
    ...new Map(
      (w?.activations ?? []).map((a) => [
        a.planet,
        {
          planet: a.planet,
          process: (PROCESS[a.planet] ?? UNKNOWN_PROCESS).label,
          direct: a.direct,
        },
      ]),
    ).values(),
  ].sort((a, b) => Number(b.direct) - Number(a.direct));

  for (const b of w?.beats ?? []) {
    pressures.push({ planet: "", process: beatLabel(b.kind), direct: true });
  }

  const emphasis = emphasisOf(w?.orientation ?? null);

  return {
    emphasis,
    ...EMPHASIS[emphasis],
    ...(w ? null : { note: QUIET_NOTE }),
    vectors,
    pressures,
  };
}

/**
 * How much of the season lands on each end.
 *
 * A direct hit counts double. That is the same judgment `orientationOf` makes
 * when it lets direct contacts decide alone — a transit on the node degree
 * outranks a transit through a nodal house — expressed as a weight rather than
 * as a veto, because a bar has room to show a minority that a categorical
 * label has to discard.
 *
 * A crossroads contributes to BOTH sides rather than to a third bar. It is a
 * pressure on the whole axis, and splitting it off into its own quantity would
 * leave two arrows that understate every season containing a square.
 */
