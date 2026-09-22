/**
 * lib/synastry/dimensions.ts
 *
 * SEVEN AREAS, EACH MEASURED TWICE.
 *
 * The single number this page refuses to produce is a compatibility score. It
 * would have to average two things that are not the same kind of thing, and the
 * averaging is where the information dies: a Venus–Mars square is enormous
 * attraction and real friction, and any model that resolves it into "55" has
 * thrown away both halves of what it knew.
 *
 * So every area carries two values that are never combined:
 *
 *   CHEMISTRY  how strongly the two charts activate this area. Amplitude, with
 *              no opinion about whether that is pleasant. This is the same
 *              measurement `lib/dominance.ts` makes about a house, and it is
 *              valence-free for the same reason.
 *   EASE       whether that activation flows or grinds, −100 … +100. The same
 *              measurement `lib/ease.ts` makes, and the only one of the two
 *              that has a sign.
 *
 * and a third that is not a measurement of the relationship at all:
 *
 *   EVIDENCE   how much there was to go on. Carried separately because the
 *              alternative is a reader comparing an Attraction of 78 built from
 *              two contacts with an Attraction of 78 built from nine, and
 *              believing the same thing about both. `lib/love/compass.ts` keeps
 *              evidence mass apart from position for exactly this reason.
 *
 * WHAT HOUSES DO AND DO NOT DO HERE
 * House activation feeds CHEMISTRY only, never ease. A planet standing in
 * someone's 7th says that partnership is where the weight lands; it does not
 * say whether that is comfortable, and nothing about the geometry could. Only
 * aspects have a character. This is the same split the app already draws
 * between dominance and ease, held to deliberately.
 *
 * THE DIMENSIONS ARE NOT INDEPENDENT AND MUST NOT BE SUMMED
 * Sun–Moon is evidence for Emotional and for Identity; Mercury–Saturn is
 * evidence for Communication and for Lifestyle. That is correct — one contact
 * genuinely bears on more than one area of a life — but it means the seven
 * numbers are overlapping readings of one body of evidence, not seven slices of
 * a whole. Adding them, averaging them or ranking a couple by their total is
 * meaningless. The signature in `signature.ts` aggregates the CONTACTS, not the
 * dimension scores, precisely to avoid counting the shared ones twice.
 *
 * NO SLOW-TO-SLOW PAIR APPEARS BELOW
 * Saturn–Saturn is the obvious omission from Commitment, and Pluto–Pluto from
 * Attraction. Both are excluded by the cohort rule in `contacts.ts` — they are
 * facts about an age gap — so listing them would be listing pairs that can
 * never score.
 */

import type { Contact } from "./contacts";
import { counted, joins } from "./contacts";
import { shareOf, type Activation } from "./activation";
import { AREA_BASELINE, correctedEase, percentile } from "./baseline";

/**
 * Every area the engine can compute. A LENS selects a subset — see
 * `lenses.ts` — so no single reading shows all of them.
 *
 * The four beyond the original seven exist because the first version answered
 * one question, "are these two good together romantically", and quietly
 * answered it whoever was being read. Two charts contact each other in exactly
 * the same way whether the people are lovers, co-founders or siblings; what
 * changes is which of those contacts you have any business leading with. So
 * `attraction` is not relabelled for a business reading, it is simply not
 * asked, and `drive` is asked instead off a different set of bodies.
 */
export type DimensionId =
  | "attraction"
  | "emotional"
  | "communication"
  | "identity"
  | "lifestyle"
  | "commitment"
  | "growth"
  | "drive"
  | "power"
  | "rapport"
  | "obligation";

/**
 * The character of an area's activation.
 *
 * `quiet` and `thin` are different statements and both had to exist. `quiet`
 * means the two charts do touch here — often through houses, which carry no
 * valence — but not enough aspect sits behind it to call the contact one way or
 * the other. `thin` means there is not enough of anything to say a word about
 * it at all. Collapsing them would let "no evidence" print as "no friction",
 * which is the flattering misreading this page has to work hardest to prevent.
 */
export type EaseBand = "flowing" | "mixed" | "charged" | "quiet" | "thin";

export const EASE_BAND_LABEL: Record<EaseBand, string> = {
  flowing: "Flowing",
  mixed: "Mixed",
  charged: "Charged",
  quiet: "Quiet",
  thin: "Thin",
};

export const EASE_BAND_GLOSS: Record<EaseBand, string> = {
  flowing: "Tends to happen easily",
  charged: "Real contact, and it takes work",
  mixed: "Flowing and difficult contacts, pulling against each other",
  quiet: "Too little aspect behind it to call a direction",
  thin: "Too little contact to say anything",
};

export interface Dimension {
  id: DimensionId;
  label: string;
  /** What this area is measuring, in the words the page prints. */
  question: string;
  /**
   * 1–99. How much contact this area carries, as a percentile against
   * unrelated pairings — see `baseline.ts`. Amplitude, never a verdict.
   */
  chemistry: number;
  /** −100 … +100, or null when no aspect gave it a character. */
  ease: number | null;
  band: EaseBand;
  /** Raw contact mass. The unit is this module's own and means nothing outside it. */
  evidence: number;
  /** How many counted contacts fed it. */
  contactCount: number;
  /** Share of the chemistry that came from houses rather than aspects, 0–100. */
  fromHouses: number;
  /** The contacts that moved it, heaviest first. Capped for the drawer. */
  contributors: Contact[];
  /** The question this area hands the council, with its own numbers already in it. */
  ask: string;
}

interface Definition {
  id: DimensionId;
  label: string;
  question: string;
  /** Unordered body pairs. Both directions of each are collected. */
  pairs: ReadonlyArray<readonly [string, string]>;
  /** Houses of the other chart whose activation feeds this area's chemistry. */
  houses?: readonly number[];
  /** The word this area contributes to the signature when it leads. */
  signature: string;
}

/** How much a fully-activated set of houses is worth, as contact mass. */
const HOUSE_MASS = 40;

/** Below this much mass, an area is `thin` whatever its numbers look like. */
const THIN_BELOW = 12;

/** Aspect mass below this leaves ease with no value at all. */
const EASE_RESOLVED_ABOVE = 6;

/**
 * Aspect mass an area needs before its band is allowed to name a direction.
 *
 * THE BUG THIS FIXES. `thin` was judged on total evidence — aspects plus house
 * activation — while ease was computed from aspects alone. House activation is
 * deliberately valence-free: it says how much weight lands in an area and has
 * no opinion about whether that is pleasant. So houses could lift an area past
 * the `thin` floor while contributing nothing whatever to the number the band
 * was about to characterise, and the area would print a confident direction on
 * the strength of a wisp of aspect evidence.
 *
 * Boris × Jude's Growth was the case that surfaced it: chemistry 21, ease +54,
 * "Flowing" — off three wide sextiles totalling 9.7 mass, with half the
 * evidence coming from houses. Across the stored charts, 272 of 1,698
 * directional readings rested on aspect mass under 12, and 156 of those were
 * propped past `thin` by houses in exactly this way.
 *
 * The floor is 12 because the p25 of aspect mass behind a directional reading
 * is 14.2, and because of what the unit is worth: one tight square between two
 * heavy bodies runs to about 22, and a wide sextile between light ones to under
 * 3. Twelve is roughly "one real contact, or several decent ones" — the least
 * that can carry a word like Flowing.
 *
 * Note this does NOT suppress the ease figure, only the word. An area with mass
 * between the two thresholds still prints its number, in the muted colour the
 * `quiet` band carries, which is the honest presentation: this is what the mean
 * came to, and there is not enough behind it to lean on.
 */
const DIRECTION_ABOVE = 12;

/**
 * How far from zero ease has to be before an area is called flowing or charged.
 *
 * Wider than the same edge in `signature.ts`, which sits at 14, and the two are
 * not meant to match. The signature averages every counted contact, so it is a
 * stable number that rarely strays far from zero; an area averages the two to
 * six contacts that bear on it, so it swings to ±70 routinely. An edge drawn at
 * 14 here would call almost every area flowing or charged and the word would
 * stop carrying information.
 */
const EASE_BAND = 30;

const DEFINITIONS: readonly Definition[] = [
  {
    id: "attraction",
    label: "Attraction",
    question: "What pulls these two toward each other?",
    pairs: [
      ["Venus", "Mars"],
      ["Venus", "Ascendant"],
      ["Mars", "Ascendant"],
      ["Venus", "Pluto"],
      ["Mars", "Pluto"],
      ["Venus", "Venus"],
      ["Mars", "Mars"],
      ["Sun", "Venus"],
      ["Moon", "Mars"],
    ],
    signature: "Magnetic",
  },
  {
    id: "emotional",
    label: "Emotional",
    question: "How safe do they feel with each other?",
    pairs: [
      ["Moon", "Moon"],
      ["Moon", "Venus"],
      ["Moon", "Sun"],
      ["Moon", "Saturn"],
      ["Moon", "Neptune"],
      ["Moon", "Ascendant"],
    ],
    houses: [4],
    signature: "Attuned",
  },
  {
    id: "communication",
    label: "Communication",
    question: "How easily do they understand each other?",
    pairs: [
      ["Mercury", "Mercury"],
      ["Mercury", "Sun"],
      ["Mercury", "Moon"],
      ["Mercury", "Saturn"],
      ["Mercury", "Jupiter"],
      ["Mercury", "Uranus"],
      ["Mercury", "Ascendant"],
    ],
    houses: [3],
    signature: "Articulate",
  },
  {
    id: "identity",
    label: "Identity",
    question: "Do their basic ways of being reinforce each other?",
    pairs: [
      ["Sun", "Sun"],
      ["Sun", "Moon"],
      ["Sun", "Ascendant"],
      ["Sun", "Saturn"],
      ["Sun", "Pluto"],
      ["Ascendant", "Ascendant"],
    ],
    houses: [1],
    signature: "Mirrored",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    question: "Do their days and priorities fit together?",
    pairs: [
      ["Ascendant", "Saturn"],
      ["Ascendant", "Mercury"],
      ["Ascendant", "Mars"],
      ["Ascendant", "Moon"],
      ["Saturn", "Mercury"],
      ["Saturn", "Mars"],
    ],
    houses: [2, 6, 10],
    signature: "Practical",
  },
  {
    id: "commitment",
    label: "Commitment",
    question: "What would make this last?",
    pairs: [
      ["Saturn", "Sun"],
      ["Saturn", "Moon"],
      ["Saturn", "Venus"],
      ["Saturn", "Ascendant"],
    ],
    houses: [7],
    signature: "Binding",
  },
  {
    id: "growth",
    label: "Growth",
    question: "Does the relationship enlarge their lives?",
    pairs: [
      ["Jupiter", "Sun"],
      ["Jupiter", "Moon"],
      ["Jupiter", "Venus"],
      ["Jupiter", "Mars"],
      ["Jupiter", "Mercury"],
      ["Jupiter", "Ascendant"],
      ["North Node", "Sun"],
      ["North Node", "Moon"],
      ["North Node", "Venus"],
    ],
    houses: [9, 11],
    signature: "Expansive",
  },

  // ── Beyond the romantic reading ──────────────────────────────────────────
  // None of these is a relabelling of an area above. Each reads a different set
  // of bodies, because the question it answers is a different question. A lens
  // that shows Drive is not showing Attraction under another name; it is not
  // asking about attraction at all.

  {
    id: "drive",
    label: "Drive",
    question: "How do they push together?",
    pairs: [
      ["Mars", "Mars"],
      ["Sun", "Mars"],
      ["Mars", "Saturn"],
      ["Mars", "Jupiter"],
      ["Mars", "Mercury"],
      ["Sun", "Sun"],
    ],
    houses: [1, 10],
    signature: "Driven",
  },
  {
    // The area a working reading needs most and a romantic one buries. Sun to
    // Pluto sits inside Identity above, where it reads as two selves
    // intensifying each other. Between people who share money or a company it
    // is a question about who can overrule whom, which is not the same subject
    // and does not belong under the same heading.
    id: "power",
    label: "Power & Trust",
    question: "Who holds what, and how safely?",
    pairs: [
      ["Sun", "Pluto"],
      ["Saturn", "Pluto"],
      ["Moon", "Pluto"],
      ["Venus", "Pluto"],
      ["Mars", "Pluto"],
      ["Sun", "Saturn"],
    ],
    houses: [8],
    signature: "Potent",
  },
  {
    // Attraction with the charge taken out — no Mars, no Pluto. What is left is
    // taste and enjoyment, which is what liking somebody is made of.
    id: "rapport",
    label: "Rapport",
    question: "How easily do they enjoy each other?",
    pairs: [
      ["Venus", "Venus"],
      ["Venus", "Sun"],
      ["Venus", "Moon"],
      ["Venus", "Mercury"],
      ["Venus", "Jupiter"],
      ["Moon", "Moon"],
    ],
    houses: [11],
    signature: "Warm",
  },
  {
    // Commitment's bodies, asked the other way round. Commitment is what two
    // people choose to hold each other to; a family tie was never chosen, so
    // the same Saturn contacts become a question about what is owed rather than
    // what was promised. The two are never in one lens, so the shared pairs
    // never appear twice in a single reading.
    id: "obligation",
    label: "Obligation",
    question: "What is owed here, and by whom?",
    pairs: [
      ["Saturn", "Sun"],
      ["Saturn", "Moon"],
      ["Saturn", "Ascendant"],
      ["Moon", "Pluto"],
      ["Moon", "Saturn"],
    ],
    houses: [4],
    signature: "Bound",
  },
];

export const DIMENSION_IDS = DEFINITIONS.map((d) => d.id);

/** The word an area lends the signature when it leads. */
export const SIGNATURE_WORD: Record<DimensionId, string> = Object.fromEntries(
  DEFINITIONS.map((d) => [d.id, d.signature]),
) as Record<DimensionId, string>;

function bandOf(
  evidence: number,
  aspectMass: number,
  ease: number | null,
): EaseBand {
  if (evidence < THIN_BELOW) return "thin";
  if (ease === null) return "quiet";
  // Not enough aspect behind it to name a direction, whatever the mean says.
  if (aspectMass < DIRECTION_ABOVE) return "quiet";
  if (ease >= EASE_BAND) return "flowing";
  if (ease <= -EASE_BAND) return "charged";
  return "mixed";
}

/**
 * The house contribution, averaged across the two directions.
 *
 * Averaged rather than summed because the two directions are two readings of
 * the same area, not two helpings of it — and because one chart having a birth
 * time while the other does not should lower the confidence in this area, which
 * `shareOf` returning 0 for the unavailable direction correctly does.
 */
function houseMass(
  activation: Activation,
  houses: readonly number[] | undefined,
): number {
  if (!houses || houses.length === 0) return 0;
  const list = [...houses];
  const forward = shareOf(activation.aIntoB, list);
  const backward = shareOf(activation.bIntoA, list);
  return ((forward + backward) / 2) * HOUSE_MASS;
}

function askFor(
  definition: Definition,
  dimension: Omit<Dimension, "ask">,
  aName: string,
  bName: string,
): string {
  if (dimension.band === "thin") {
    return `On the compatibility page: ${definition.label.toLowerCase()} between ${aName} and ${bName} has almost nothing behind it — ${dimension.contactCount} counted contact${dimension.contactCount === 1 ? "" : "s"}. Say what an absence of contact in this area does and does not mean, and do not fill it in with generic astrology about their signs.`;
  }

  const drivers = dimension.contributors
    .slice(0, 3)
    .map((c) => `${aName}'s ${c.aBody} ${c.type} ${bName}'s ${c.bBody} (orb ${c.orb}°)`)
    .join("; ");

  const character =
    dimension.ease === null
      ? "no aspect sharp enough to give it a direction"
      : dimension.ease > 0
        ? `ease +${dimension.ease}, so it leans toward flow`
        : `ease ${dimension.ease}, so it leans toward friction`;

  return `On the compatibility page: ${definition.label.toLowerCase()} reads chemistry ${dimension.chemistry} with ${character}, off ${dimension.contactCount} contact${dimension.contactCount === 1 ? "" : "s"}${drivers ? ` — ${drivers}` : ""}. Chemistry and ease are separate measurements and a high one of each is not the same as a high average of both. ${definition.question} Answer from these contacts specifically, name what it would actually feel like between two people, and do not predict what will happen to them.`;
}

const BY_ID = new Map(DEFINITIONS.map((d) => [d.id, d]));

/**
 * Score one area. Exported through `dimensions` and `allAreas` below rather
 * than directly — the two callers differ only in which definitions they ask
 * for, and nothing else should be choosing its own subset.
 */
function scoreArea(
  definition: Definition,
  scoring: Contact[],
  activation: Activation,
  aName: string,
  bName: string,
): Dimension {
  {
    const mine = scoring.filter((contact) =>
      definition.pairs.some(([one, two]) => joins(contact, one, two)),
    );

    const aspectMass = mine.reduce((sum, c) => sum + c.weight, 0);
    const houses = houseMass(activation, definition.houses);
    const evidence = aspectMass + houses;

    // Ease is weighted by `easeWeight`, not `weight` — see the note on the
    // field in contacts.ts. Using the amplitude weight here would let the
    // aspect table decide the sign of the axis.
    const easeMass = mine.reduce((sum, c) => sum + c.easeWeight, 0);
    const signed = mine.reduce((sum, c) => sum + c.valence * c.easeWeight, 0);
    const ease =
      aspectMass < EASE_RESOLVED_ABOVE
        ? null
        : correctedEase((signed / easeMass) * 100);

    const chemistry = percentile(evidence, AREA_BASELINE[definition.id]);
    const band = bandOf(evidence, aspectMass, ease);

    const core: Omit<Dimension, "ask"> = {
      id: definition.id,
      label: definition.label,
      question: definition.question,
      chemistry,
      ease,
      band,
      evidence: Math.round(evidence * 10) / 10,
      contactCount: mine.length,
      fromHouses: evidence === 0 ? 0 : Math.round((houses / evidence) * 100),
      contributors: [...mine].sort((x, y) => y.weight - x.weight).slice(0, 6),
    };

    return { ...core, ask: askFor(definition, core, aName, bName) };
  }
}

/**
 * The areas a lens asks for, in the order it asks for them.
 *
 * Takes the id list rather than a lens so that this module never imports
 * `lenses.ts` — which does need `DimensionId` from here, and a value cycle
 * between the two would be a real one rather than a type-only one.
 */
export function dimensions(
  contacts: Contact[],
  activation: Activation,
  aName: string,
  bName: string,
  areaIds: readonly DimensionId[],
): Dimension[] {
  const scoring = counted(contacts);
  return areaIds.map((id) => {
    const definition = BY_ID.get(id);
    // Loudly, because the alternative is a lens silently rendering six areas
    // where it declares seven — which is indistinguishable on screen from a
    // lens that meant to omit one, and is how the four areas below this
    // function came to be missing for a whole calibration run.
    if (!definition) throw new Error(`No such synastry area: ${id}`);
    return scoreArea(definition, scoring, activation, aName, bName);
  });
}

/**
 * The counted contacts that feed any of these areas, each one once.
 *
 * THE FIX FOR A REAL AND UGLY DEFECT. The signature used to average every
 * counted contact, while the page only ever showed the ones belonging to the
 * lens's areas — and those are not the same set. On Brandon × Ana, 29 contacts
 * counted, 15 of them fell in a shown area and averaged −35 ease, and the other
 * 14 averaged +51. The headline read Cordial, sitting in the middle of the
 * plot, above five areas that all read charged.
 *
 * Worse, the discrepancy is systematic rather than occasional. The area
 * definitions deliberately name the pairs that carry a subject — Saturn to the
 * lights for commitment, Sun to Pluto for identity — which are the pairs that
 * make hard aspects. What falls outside every area is disproportionately the
 * soft leftovers: Neptune trines, Uranus sextiles, angles to the nodes. So the
 * invisible half pulled the headline toward flow on every reading, for every
 * pair.
 *
 * Scoring the signature from this set instead makes the headline a summary of
 * what is on screen. It also makes it lens-dependent, which is a reversal — the
 * page used to say the cell was the same under every lens, on the grounds that
 * a question cannot change how much two charts touch. That is true of the total
 * and false of the thing worth reporting: how much they touch IN THE AREAS THE
 * QUESTION IS ABOUT. A romance and a working partnership read different pairs,
 * so they get different answers, and comparing those answers is the whole point
 * of having lenses at all.
 */
export function contactsFor(
  contacts: Contact[],
  areaIds: readonly DimensionId[],
): Contact[] {
  const pairs = areaIds.flatMap((id) => BY_ID.get(id)?.pairs ?? []);
  const seen = new Set<string>();
  return counted(contacts).filter((contact) => {
    if (seen.has(contact.id)) return false;
    if (!pairs.some(([one, two]) => joins(contact, one, two))) return false;
    seen.add(contact.id);
    return true;
  });
}

/**
 * Every area, whatever the lens. Only `scripts/calibrate-synastry.ts` wants
 * this: a baseline has to exist for an area before any lens can show it, so
 * the reference is built over all of them at once.
 */
export function allAreas(
  contacts: Contact[],
  activation: Activation,
  aName: string,
  bName: string,
): Dimension[] {
  const scoring = counted(contacts);
  return DEFINITIONS.map((d) => scoreArea(d, scoring, activation, aName, bName));
}
