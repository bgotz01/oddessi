/**
 * lib/synastry/signature.ts
 *
 * THE TOP OF THE PAGE: where these two charts sit on the two axes, in one
 * phrase and one cell.
 *
 * WHY THIS AGGREGATES CONTACTS AND NOT THE SEVEN AREA SCORES
 * The areas in `dimensions.ts` overlap on purpose — Sun–Moon is evidence for
 * Emotional and for Identity — so averaging the seven numbers would count the
 * shared contacts twice and would weight a contact by how many areas happened
 * to claim it. This file goes back to the contacts themselves and reads each
 * one once. The two numbers below are therefore NOT derivable from the seven
 * above, which is correct and occasionally surprising: a pair can be flowing in
 * five areas and still land in a charged cell if the contacts carrying the
 * friction are the heavy ones.
 *
 * THE TWO AXES ARE NOT INDEPENDENT, AND THE GRID SHOULD BE READ KNOWING IT
 * Across the stored charts, `scripts/check-synastry.ts` finds high chemistry
 * arriving with slightly harder ease more often than chance would give. The
 * cause is structural rather than romantic: the conjunction has both the widest
 * orb and the loudest `POWER`, so it dominates the heaviest contacts that carry
 * the chemistry axis — and a conjunction takes its character from the bodies it
 * fuses, which averages near neutral rather than positive. Trines and sextiles,
 * which are what actually lift the ease axis, are quieter. That is a property
 * of the aspect tables, stated here rather than tuned away.
 *
 * THE CELL IS LENS-SCOPED, WHICH IT DID NOT USE TO BE
 * It was once computed from every counted contact and advertised as the same
 * under every lens. The argument was that a question cannot change how much two
 * charts touch, which is true of the total and beside the point: the page shows
 * a lens's areas, and a headline that summarises a different body of evidence
 * than the page shows is simply wrong. `contactsFor` in dimensions.ts carries
 * the full account of how that went — a Cordial cell sitting in the middle of
 * the plot above five charged areas, because half the contacts it averaged were
 * never on screen and the invisible half skewed soft every time.
 *
 * So both axes now read exactly the contacts the lens's areas are built from.
 * The cell moves when the lens moves, which is correct: a romance and a working
 * partnership are built out of different pairs, and how well two charts supply
 * one has no bearing on how well they supply the other. Comparing those answers
 * is what `lensScores` below is for.
 *
 * WHAT THE CELL IS NOT
 * It is not a verdict, a percentage, or a prediction. Six cells and an unread
 * one are a crude instrument by design — crude enough that nobody can mistake
 * it for a measurement of their relationship, while still saying the one thing
 * the page exists to say, which is that chemistry and ease are different
 * questions and a relationship can be high on one and low on the other.
 */

import type { Contact } from "./contacts";
import { housed } from "./contacts";
import type { Chart } from "@/lib/charts";
import type { Activation } from "./activation";
import { SIGNATURE_WORD, type Dimension, type DimensionId } from "./dimensions";
import type { TensionMap } from "./tension";
import { correctedEase, percentile } from "./baseline";
import { LENSES, LENS_IDS, type Lens, type LensId } from "./lenses";
import { LENS_BASELINE, LENS_EASE_BASELINE, type Baseline } from "./baseline";

export type Cell =
  | "bonded"
  | "entangled"
  | "volatile"
  | "easy"
  | "cordial"
  | "distant"
  | "unread";

/**
 * The cells, in the discipline `lib/ease.ts` set for its quadrants: the corners
 * are named, the middle of the ease axis is named rather than left blank, and
 * there is a cell for "not enough to say" so that an unmeasured pair cannot be
 * quietly filed under a measured one.
 *
 * `coords` names the two axis positions so the label can always be checked
 * against what produced it.
 */
export const CELL: Record<
  Cell,
  { label: string; coords: string; points: readonly string[] }
> = {
  bonded: {
    label: "Bonded",
    coords: "high chemistry · flowing",
    points: ["A great deal of contact", "Most of it comes easily"],
  },
  entangled: {
    label: "Entangled",
    coords: "high chemistry · mixed",
    points: [
      "A great deal of contact",
      "Pulling both ways at once",
      "Rarely dull, rarely settled",
    ],
  },
  volatile: {
    label: "Volatile",
    coords: "high chemistry · charged",
    points: [
      "A great deal of contact",
      "Most of it costs something",
      "Strong pull is not easy fit",
    ],
  },
  easy: {
    label: "Easy",
    coords: "low chemistry · flowing",
    points: ["Little friction", "Little pull", "Comfortable company"],
  },
  cordial: {
    label: "Cordial",
    coords: "low chemistry · mixed",
    points: ["The charts touch lightly", "In no particular direction"],
  },
  distant: {
    label: "Distant",
    coords: "low chemistry · charged",
    points: ["Little draws these two together", "What does tends to catch"],
  },
  unread: {
    label: "Unread",
    coords: "too little contact to place",
    points: [
      "Almost nothing in one chart reaches the other",
      "A fact about two charts, not about two people",
    ],
  },
};

export interface Signature {
  cell: Cell;
  /**
   * 1–99. The heaviest contacts, as a percentile against unrelated pairings.
   * See `baseline.ts` for what the number is measured against.
   */
  chemistry: number;
  /** −100 … +100, or null when there is nothing to take a character from. */
  ease: number | null;
  /** "Magnetic × Expansive", or one word when the leaders are tied. */
  phrase: string | null;
  /** Composed points: where the weight is, where the friction is, and who meets whom where. */
  summary: string[];
  /** How many counted contacts the whole reading rests on. */
  contactCount: number;
  /**
   * What the reading could not see. Printed on the page, not buried.
   * Empty when both charts carry a birth time and enough bodies.
   */
  caveats: string[];
  ask: string;
}

/** How many of the heaviest contacts carry the chemistry axis. See below. */
const TOP_CONTACTS = 8;

/**
 * Above this percentile, chemistry counts as high for the purpose of the cell.
 *
 * 55 rather than 50 so that "high" means a little more contact than an
 * unrelated pairing rather than merely not less, and a pair sitting exactly at
 * typical falls on the quiet side of the grid where it belongs.
 *
 * Exported because the plot draws this boundary as a line and has to label it.
 * It kept its own copy of the number for a while, which is the kind of
 * duplication that survives until somebody moves one of them.
 */
export const HIGH_CHEMISTRY = 55;

/**
 * How far from zero ease has to be before the cell is flowing or charged.
 *
 * Three quarters of the standard deviation of an unrelated pairing, measured on
 * the set the ease is actually computed from. It was 14 when the signature
 * averaged every counted contact, whose spread is 17.8; scoring from a lens's
 * own contacts widened that to about 25, so the edge moves with it. Left at 14
 * the page would have called nearly every pair flowing or charged — the number
 * is set from the reference rather than chosen, and the reference changed.
 */
export const EASE_BAND = 19;

/** Below this many counted contacts, the pair is `unread`. */
const UNREAD_BELOW = 4;

/** Second place has to beat third by this much before the phrase names two. */
const PHRASE_MARGIN = 6;

function cellOf(chemistry: number, ease: number | null, count: number): Cell {
  if (count < UNREAD_BELOW || ease === null) return "unread";
  const high = chemistry >= HIGH_CHEMISTRY;
  if (ease >= EASE_BAND) return high ? "bonded" : "easy";
  if (ease <= -EASE_BAND) return high ? "volatile" : "distant";
  return high ? "entangled" : "cordial";
}

function phraseOf(ranked: Dimension[]): string | null {
  const readable = ranked.filter((d) => d.band !== "thin");
  if (readable.length === 0) return null;
  if (readable.length === 1) return SIGNATURE_WORD[readable[0].id];

  const second = readable[1].chemistry;
  const third = readable.length > 2 ? readable[2].chemistry : 0;
  if (second - third < PHRASE_MARGIN) return SIGNATURE_WORD[readable[0].id];

  return `${SIGNATURE_WORD[readable[0].id]} × ${SIGNATURE_WORD[readable[1].id]}`;
}

function list(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/**
 * The summary, composed rather than written, as points rather than a sentence.
 *
 * Three at most: where the contact concentrates, where the friction sits, and —
 * only when it applies — that the two are meeting each other in different
 * places. Anything longer is an interpretation and belongs to the council.
 *
 * These were one comma-spliced line until the page went to points. Splitting
 * them was not only a formatting change: the three clauses are independent
 * findings and reading them joined invited a causal link between them that the
 * measurements do not support.
 */
function summaryOf(
  ranked: Dimension[],
  tension: TensionMap,
  activation: Activation,
): string[] {
  const leaders = ranked
    .filter((d) => d.band !== "thin")
    .slice(0, 2)
    .map((d) => d.label.toLowerCase());

  const points: string[] = [
    leaders.length === 0
      ? "No area carries enough contact to lead"
      : `Strongest in ${list(leaders)}`,
    tension.none
      ? "No contact hard enough to register as friction"
      : `Friction on ${list(tension.strains.slice(0, 2).map((s) => s.pair))}`,
  ];

  const forward = activation.aIntoB.phrase;
  const backward = activation.bIntoA.phrase;
  if (forward && backward && forward !== backward) {
    points.push(`Each meets the other elsewhere — ${forward} against ${backward}`);
  }

  return points;
}

function caveatsOf(a: Chart, b: Chart, count: number): string[] {
  const caveats: string[] = [];

  for (const chart of [a, b]) {
    if (!housed(chart)) {
      caveats.push(
        `${chart.name} has no birth time — no houses, no Ascendant`,
        `Everything resting on those is missing, not approximated`,
      );
    }
  }

  if (count < 8) {
    caveats.push(
      `The whole reading rests on ${count} counted contact${count === 1 ? "" : "s"}`,
      `A thin reading is not a quiet relationship`,
    );
  }

  return caveats;
}

/**
 * Chemistry, ease and the cell they cross at, for one set of contacts.
 *
 * Shared by the signature and by every entry in `lensScores`, so a lens cannot
 * be scored one way in the headline and another way in the comparison.
 */
function scoreOf(
  lensContacts: Contact[],
  baseline: Baseline,
  easeBaseline: Baseline,
) {
  // Chemistry reads the heaviest contacts only. The total across a set is very
  // nearly the same for any two charts — it measures the size of the grid
  // rather than the pair — so concentration is what carries the axis.
  const top = [...lensContacts]
    .sort((x, y) => y.weight - x.weight)
    .slice(0, TOP_CONTACTS);
  const mass = top.reduce((sum, c) => sum + c.weight, 0);

  // Ease reads the whole set, weighted by `easeWeight` — see contacts.ts.
  const easeMass = lensContacts.reduce((sum, c) => sum + c.easeWeight, 0);
  const signed = lensContacts.reduce(
    (sum, c) => sum + c.valence * c.easeWeight,
    0,
  );

  const chemistry = percentile(mass, baseline);
  const ease =
    easeMass === 0
      ? null
      : correctedEase((signed / easeMass) * 100, easeBaseline);

  return {
    chemistry,
    ease,
    cell: cellOf(chemistry, ease, lensContacts.length),
    contactCount: lensContacts.length,
  };
}

/** One lens's headline, for comparing the four against each other. */
export interface LensScore {
  id: LensId;
  label: string;
  chemistry: number;
  ease: number | null;
  cell: Cell;
  contactCount: number;
}

/**
 * Every lens scored over its own contacts, so the four can be read side by
 * side: how much these two charts supply what a romance is built from, against
 * what a friendship is built from, and so on.
 *
 * They are NOT four attempts at one number and the highest is not a
 * recommendation. A pair can be well supplied for partnership and poorly for
 * romance and that says nothing about which two people should choose — it says
 * which pairs of bodies their charts happen to connect.
 */
export function lensScores(
  contactsFor: (areaIds: readonly DimensionId[]) => Contact[],
): LensScore[] {
  return LENS_IDS.map((id) => ({
    id,
    label: LENSES[id].label,
    ...scoreOf(
      contactsFor(LENSES[id].areas),
      LENS_BASELINE[id],
      LENS_EASE_BASELINE[id],
    ),
  }));
}

export function signature(
  lensContacts: Contact[],
  areas: Dimension[],
  tension: TensionMap,
  activation: Activation,
  a: Chart,
  b: Chart,
  lens: Lens,
): Signature {
  const scoring = lensContacts;

  const scored = scoreOf(
    scoring,
    LENS_BASELINE[lens.id],
    LENS_EASE_BASELINE[lens.id],
  );
  const { chemistry, ease, cell } = scored;

  const ranked = [...areas].sort((x, y) => y.chemistry - x.chemistry);
  const phrase = phraseOf(ranked);
  const caveats = caveatsOf(a, b, scoring.length);

  return {
    cell,
    chemistry,
    ease,
    phrase,
    summary: summaryOf(ranked, tension, activation),
    contactCount: scoring.length,
    caveats,
    ask: `On the compatibility page, read under the ${lens.label.toLowerCase()} lens: ${a.name} and ${b.name} land in the ${CELL[cell].label.toLowerCase()} cell — chemistry ${chemistry}, ease ${ease === null ? "unresolved" : ease}, off ${scoring.length} counted contacts. ${phrase ? `The areas carrying most of it are ${phrase.replace(" × ", " and ")}. ` : ""}Chemistry and ease are separate axes and the cell is the crossing of the two, not an average. ${lens.framing} Explain what it is like to be in a relationship of this kind that sits there. Do not say whether they are compatible and do not predict what will happen — the instrument measures contact between two charts and has no access to anything else about them.${caveats.length ? ` State these limits too: ${caveats.join(" ")}` : ""}`,
  };
}
