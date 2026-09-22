/**
 * lib/synastry/contacts.ts
 *
 * WHERE TWO CHARTS TOUCH. Everything else in `lib/synastry` reads this file:
 * the dimensions score these contacts, the tension map groups the negative
 * ones, and the signature is an aggregate of both.
 *
 * WHY THE ASPECTS ARE COMPUTED HERE RATHER THAN READ
 * `Chart.aspects` is what arc stored, and arc computed it for one chart against
 * itself. There is no second set. So the contacts below are calculated from
 * `Placement.longitude` under the conventions stated in this file, which are
 * NOT the conventions the natal aspects were computed under. The two lists must
 * never be merged or compared by orb: a 6° natal square and a 6° cross-chart
 * square came out of different instruments.
 *
 * THE COHORT PROBLEM, WHICH IS THE WHOLE REASON THIS FILE IS CAREFUL
 * Two people born six years apart have Pluto trine Pluto, and so does everyone
 * else born in those two years. The outer planets move so slowly that a contact
 * between one person's outer and another's outer is a statement about the gap
 * between their birthdays and nothing else — it is true of their entire cohort
 * and says nothing about them. `lib/balance.ts` already docks the outers for a
 * gentler version of this ("a whole cohort shares them"); synastry needs the
 * hard form, because here the cohort effect does not dilute a score, it
 * manufactures one. Left in, every pair of near-contemporaries reads as deeply
 * connected and the instrument is worthless.
 *
 * The rule: a slow body (Jupiter outward) counts only when it reaches the other
 * chart's PERSONAL points. Slow-to-slow contacts are computed, marked
 * `cohort`, excluded from every score, and still returned — the page shows them
 * under their own heading with the reason. Deleting them silently would leave a
 * reader who knows their Pluto trine is there wondering why the instrument
 * cannot see it.
 */

import type { Chart, Placement } from "@/lib/charts";

export type AspectType =
  | "conjunction"
  | "opposition"
  | "trine"
  | "square"
  | "sextile"
  | "quincunx";

/** Which chart a body belongs to. `a` and `b` are positional, never ranked. */
export type Side = "a" | "b";

/**
 * The bodies synastry reads, and what kind of thing each one is.
 *
 * Chiron and the South Node are absent on purpose: both carry weight 0 in
 * `lib/scoring.ts`, and a body the rest of the app declines to score should not
 * acquire a vote by being in a second chart.
 */
export type BodyClass = "luminary" | "personal" | "angle" | "slow" | "node";

export const BODY_CLASS: Record<string, BodyClass> = {
  Sun: "luminary",
  Moon: "luminary",
  Mercury: "personal",
  Venus: "personal",
  Mars: "personal",
  Ascendant: "angle",
  Midheaven: "angle",
  Jupiter: "slow",
  Saturn: "slow",
  Uranus: "slow",
  Neptune: "slow",
  Pluto: "slow",
  "North Node": "node",
};

export const SYNASTRY_BODIES = Object.keys(BODY_CLASS);

/** A personal point: what a slow body has to reach in order to count. */
const PERSONAL = new Set<BodyClass>(["luminary", "personal", "angle"]);

/** The loud points, which are allowed the full orb. See `ORB` below. */
const LOUD = new Set<BodyClass>(["luminary", "angle"]);

/**
 * How much each body is worth in a contact.
 *
 * Deliberately NOT `DEFAULT_SCORING.weight.body`. That table is editable from
 * the scoring panel so a reader can argue with how houses are weighted, and it
 * would be incoherent for a change to house scoring to silently move a
 * compatibility reading on another page. These are this module's own stated
 * conventions and only this module's.
 *
 * The Ascendant sits just under the lights because in synastry it is a genuine
 * contact point rather than a derived one — a planet on someone's Ascendant is
 * felt in the body. The Midheaven is lower: it is a direction, not a doorway.
 */
export const BODY_WEIGHT: Record<string, number> = {
  Sun: 10,
  Moon: 10,
  Ascendant: 9,
  Venus: 8,
  Mars: 8,
  Mercury: 7,
  Saturn: 6,
  Midheaven: 6,
  Jupiter: 5,
  Pluto: 4,
  Uranus: 3,
  Neptune: 3,
  "North Node": 3,
};

const ANGLE_OF: Record<AspectType, number> = {
  conjunction: 0,
  sextile: 60,
  square: 90,
  trine: 120,
  quincunx: 150,
  opposition: 180,
};

/**
 * The orb each aspect is allowed, in degrees, when a light or an angle is
 * involved.
 *
 * Tighter than the natal convention on purpose. Two charts offer roughly twice
 * as many pairs as one chart offers itself, so an orb set that produces a
 * readable natal chart produces a cross-chart list in which everything touches
 * everything and no dimension can score low. Narrow orbs are the only thing
 * standing between this page and a universal "you two are extraordinary".
 *
 * THE TRINE MATCHES THE OPPOSITION AND THE SEXTILE MATCHES THE SQUARE, exactly.
 * This is not a classical convention and it is here for an arithmetic reason
 * that turned out to matter more than the tradition. An orb is a window, and
 * the width of the window decides how often that aspect turns up by chance
 * across 169 body pairings. Give the hard angles wider windows than the soft
 * ones and the average of every pair of charts ever compared comes out
 * negative — not because people are difficult, but because the table said so.
 * `scripts/check-synastry.ts` measured that bias at roughly −20 points of ease
 * on the first calibration, which put four fifths of all stored pairs in the
 * same cell. Matching the windows removes it. What remains is about −3 points,
 * which is small enough to leave standing rather than paper over with a
 * correction term nobody could audit.
 */
const ORB: Record<AspectType, number> = {
  conjunction: 7,
  opposition: 6,
  trine: 6,
  square: 5,
  sextile: 5,
  quincunx: 2.5,
};

/**
 * Applied to the orb when neither body is a light or an angle.
 *
 * The classical reason, which happens also to be the practical one: the Sun,
 * the Moon and the angles are the loudest things in a chart and a wide contact
 * to one of them is still felt, while a wide Mercury–Jupiter is not felt by
 * anybody.
 */
const MINOR_ORB_FACTOR = 0.75;

/**
 * Aspect power — how much a contact of each kind carries, before the bodies and
 * the orb are applied. Matches the ranking in `lib/scoring.ts`, which is the
 * app's standing opinion about which aspects are loud.
 */
const POWER: Record<AspectType, number> = {
  conjunction: 3,
  opposition: 2.5,
  square: 2.5,
  trine: 2,
  sextile: 1.5,
  quincunx: 1,
};

/**
 * Below this, a contact is dropped rather than listed.
 *
 * With the decay curve above, a contact sitting on its orb limit is worth
 * nothing at all, and the rows just short of the limit are worth so little that
 * they cannot move a score — they can only bury the contacts that can. Roughly
 * one body-weight unit at full power.
 */
const MIN_WEIGHT = 1.5;

/**
 * Aspect character, −1 (hardest) to +1 (easiest). A conjunction is 0 because
 * its character is not a property of the angle: it is whatever the two bodies
 * being fused actually are, which is resolved from `NATURE` below.
 */
const VALENCE: Record<AspectType, number> = {
  trine: 1,
  sextile: 0.6,
  conjunction: 0,
  quincunx: -0.4,
  opposition: -0.6,
  square: -1,
};

/**
 * What a body brings to a conjunction.
 *
 * Same shape as `EaseConfig.nature`, and again a local copy rather than an
 * import, for the reason given at `BODY_WEIGHT`. The moderns are neutral: this
 * file will not be the place where Pluto is quietly declared bad. The angles
 * are 0 because they are geometry — a planet conjunct an Ascendant takes its
 * character entirely from the planet.
 *
 * The opposition is softer here than in the natal table (−0.6 against −0.9). In
 * one chart an opposition is a split inside a single person and has to be
 * carried alone. Between two people it is the classic relationship angle: each
 * one stands at an end the other cannot reach. It is still friction, and it is
 * not the same friction as a square.
 */
const NATURE: Record<string, number> = {
  Venus: 0.8,
  Jupiter: 0.9,
  Sun: 0.3,
  Moon: 0.3,
  Mercury: 0,
  Ascendant: 0,
  Midheaven: 0,
  "North Node": 0.2,
  Mars: -0.65,
  Saturn: -0.8,
  Uranus: 0,
  Neptune: 0,
  Pluto: 0,
};

/** Why a computed contact was kept out of the scoring. Null when it counts. */
export type Exclusion = "cohort";

export interface Contact {
  id: string;
  /** The body in chart A, and the body in chart B. Never reordered. */
  aBody: string;
  bBody: string;
  type: AspectType;
  /** Degrees from exact. Always positive. */
  orb: number;
  /** The orb this pairing was allowed, so a reader can see how tight 3° was. */
  orbLimit: number;
  /** How much this contact carries: power × bodies × tightness. Amplitude. */
  weight: number;
  /**
   * The same contact's say in the EASE axis: bodies × tightness, with `POWER`
   * deliberately left out.
   *
   * `POWER` encodes how loud an angle is, and it rates the hard angles above
   * the soft ones — which is a true statement about amplitude and the reason it
   * belongs in `weight`. Carrying it into the valence average would mean a
   * square votes on the ease axis with two and a half times the force of a
   * sextile purely for being a square, so a chart with equal numbers of each
   * reads as friction. That is the aspect table having an opinion, not the
   * charts.
   */
  easeWeight: number;
  /** −1 … +1. Friction to flow. */
  valence: number;
  /** False when `excluded` says why it does not score. */
  counts: boolean;
  excluded: Exclusion | null;
  /** "A's Venus square B's Mars", already written out. */
  label: string;
}

/** A body's ecliptic longitude, or null when the chart does not carry it. */
function longitudeOf(chart: Chart, body: string): number | null {
  const placement: Placement | undefined = chart.placements.find(
    (p) => p.body === body,
  );
  return typeof placement?.longitude === "number" ? placement.longitude : null;
}

/** Shortest arc between two ecliptic longitudes, 0–180. */
function separation(one: number, two: number): number {
  const raw = (((one - two) % 360) + 360) % 360;
  return raw > 180 ? 360 - raw : raw;
}

/**
 * How much of its full strength a contact keeps at a given orb.
 *
 * Steeper than the natal convention in `lib/ease.ts`, which floors at 0.4 so a
 * wide aspect still counts for something. That floor is right for one chart and
 * badly wrong for two: a cross-chart grid throws up thirty-odd contacts, most
 * of them wide, and with a floor the wide majority simply outvotes the few
 * tight ones by turning up in numbers. Every pair of charts then scores the
 * same, which is what the first calibration run found.
 *
 * Here strength decays to nothing at the orb limit, so the boundary is a fade
 * rather than a cliff and only genuinely close contacts carry weight. The
 * exponent is a stated convention: 1 would be a straight line, and 1.4 pulls
 * the middle of the range down far enough that a half-orb contact is worth
 * about a third of an exact one.
 */
function tightness(orb: number, limit: number): number {
  return Math.pow(Math.max(0, 1 - orb / limit), 1.4);
}

function orbLimitFor(type: AspectType, one: string, two: string): number {
  const loud = LOUD.has(BODY_CLASS[one]) || LOUD.has(BODY_CLASS[two]);
  return loud ? ORB[type] : ORB[type] * MINOR_ORB_FACTOR;
}

/**
 * The contact two bodies make, or null when they make none.
 *
 * Only the tightest matching aspect is returned. Two angles cannot both be
 * within orb at these widths, but the guard costs nothing and the alternative
 * — a pair scoring twice — is the kind of bug that shows up as one dimension
 * being mysteriously high.
 */
function contactBetween(
  aBody: string,
  aLongitude: number,
  bBody: string,
  bLongitude: number,
): Contact | null {
  const gap = separation(aLongitude, bLongitude);

  let best: { type: AspectType; orb: number; limit: number } | null = null;
  for (const type of Object.keys(ANGLE_OF) as AspectType[]) {
    const orb = Math.abs(gap - ANGLE_OF[type]);
    const limit = orbLimitFor(type, aBody, bBody);
    if (orb > limit) continue;
    if (!best || orb < best.orb) best = { type, orb, limit };
  }
  if (!best) return null;

  // The cohort rule. A slow body counts only when it reaches a personal point
  // in the other chart; slow-to-slow says nothing about these two people, only
  // about the gap between their birthdays.
  const cohort =
    !PERSONAL.has(BODY_CLASS[aBody]) && !PERSONAL.has(BODY_CLASS[bBody]);

  const valence =
    best.type === "conjunction"
      ? ((NATURE[aBody] ?? 0) + (NATURE[bBody] ?? 0)) / 2
      : VALENCE[best.type];

  const pairWeight = ((BODY_WEIGHT[aBody] ?? 0) + (BODY_WEIGHT[bBody] ?? 0)) / 2;
  const close = tightness(best.orb, best.limit);
  const easeWeight = pairWeight * close;
  const weight = POWER[best.type] * easeWeight;

  // At the very edge of orb a contact is worth almost nothing, and a list of
  // forty near-zero rows is noise that makes the real contacts hard to find.
  if (weight < MIN_WEIGHT) return null;

  return {
    id: `${aBody}-${best.type}-${bBody}`,
    aBody,
    bBody,
    type: best.type,
    orb: Math.round(best.orb * 100) / 100,
    orbLimit: best.limit,
    weight: Math.round(weight * 100) / 100,
    easeWeight: Math.round(easeWeight * 100) / 100,
    valence: Math.round(valence * 100) / 100,
    counts: !cohort,
    excluded: cohort ? "cohort" : null,
    label: `${aBody} ${best.type} ${bBody}`,
  };
}

/**
 * Every contact between the two charts, heaviest first.
 *
 * Both directions of the grid are walked, so A's Venus to B's Mars and B's
 * Venus to A's Mars are two separate rows. That is not redundancy — the two say
 * different things about who is doing what, which is the same asymmetry the
 * house activation in `activation.ts` is built on.
 */
export function crossContacts(a: Chart, b: Chart): Contact[] {
  const contacts: Contact[] = [];

  for (const aBody of SYNASTRY_BODIES) {
    const aLongitude = longitudeOf(a, aBody);
    if (aLongitude === null) continue;

    for (const bBody of SYNASTRY_BODIES) {
      const bLongitude = longitudeOf(b, bBody);
      if (bLongitude === null) continue;

      const contact = contactBetween(aBody, aLongitude, bBody, bLongitude);
      if (contact) contacts.push(contact);
    }
  }

  return contacts.sort((x, y) => y.weight - x.weight);
}

/** The contacts that actually score. */
export function counted(contacts: Contact[]): Contact[] {
  return contacts.filter((c) => c.counts);
}

/** The ones held back, for the section that shows its working. */
export function excluded(contacts: Contact[]): Contact[] {
  return contacts.filter((c) => !c.counts);
}

/**
 * Does a contact join these two bodies, in either direction?
 *
 * Dimension membership is stated as unordered pairs — Venus with Mars — and
 * both A's-Venus-to-B's-Mars and A's-Mars-to-B's-Venus belong to Attraction.
 */
export function joins(contact: Contact, one: string, two: string): boolean {
  return (
    (contact.aBody === one && contact.bBody === two) ||
    (contact.aBody === two && contact.bBody === one)
  );
}

/** Whether both charts carry enough to be read against each other at all. */
export function readable(chart: Chart): boolean {
  return chart.placements.some(
    (p) => p.body === "Sun" && typeof p.longitude === "number",
  );
}

/** Whether a chart was saved with a birth time, and so has angles and cusps. */
export function housed(chart: Chart): boolean {
  return chart.houses.length === 12 && typeof chart.angles.ascendant === "number";
}
