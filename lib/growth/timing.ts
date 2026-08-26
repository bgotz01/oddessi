/**
 * lib/growth/timing.ts
 *
 * When the axis is live.
 *
 * The rest of `lib/growth` answers *where* — a trajectory is a direction, and a
 * direction has no size and no date. This file adds the other half, which the
 * natal chart cannot answer on its own: a direction true for a whole life still
 * gets *asked for* at particular moments, and the moments are not evenly spaced.
 *
 * Two layers, kept apart because they are known with different confidence:
 *
 *   THE BEAT      Arithmetic, in `beats.ts`. The nodes retrograde a full circle
 *                 in 18.6129 years, so the grid needs no ephemeris — only a
 *                 birth date. Every person gets the same ages; what differs is
 *                 what those ages land on.
 *
 *   THE TRIGGERS  Cached ephemeris. Slow-planet transits touching one of the
 *                 axis's working addresses — the node degrees themselves, the
 *                 two nodal houses, the node rulers, the bodies embedded in the
 *                 nodal ground, and anything square the axis.
 *
 * The node degrees were once absent from that list, and this comment used to
 * say so at length: the cache computed aspects to the seven traditional bodies
 * only, and the strongest claim available was a transit through the nodal
 * HOUSE. They are computed now — see the natal points in
 * `life-cycles-calculator.ts` — and a chart cached before that change still
 * carries none, which is why `hasNodeAspects` exists rather than being assumed.
 *
 * The two layers are computed separately and then intersected. A trigger whose
 * envelope contains a beat is the loud one — not because it scores higher, but
 * because the developmental rhythm and an independent pressure happen to agree,
 * which is a fact about the chart rather than a judgement about it.
 *
 * No React, no vocabulary tables. What is composed here uses the chart's own
 * nouns, so it changes when the chart changes.
 */

import type { Band, BandStatus, Segment } from "@/lib/band";
import { statusOfBand } from "@/lib/band";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import type { Placement } from "@/lib/charts";
import type { Trajectory } from "./types";

import {
  LIFESPAN_YEARS,
  YEAR_MS,
  nodalBeats,
  type NodalBeat,
} from "./beats";

export {
  beatLabel,
  nodalBeats,
  LIFESPAN_YEARS,
  NODAL_PERIOD_YEARS,
  type BeatKind,
  type NodalBeat,
} from "./beats";

/** yyyy-mm-dd from an epoch millisecond count. */
function iso(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

// ─── The triggers ────────────────────────────────────────────────────────────

/**
 * A part of the axis a transit can land on.
 *
 * Four addresses, not one, because "the North Node" is not a thing the cache
 * can see. What it CAN see is the house the node sits in, the body that rules
 * the node's sign, the bodies standing in the nodal ground, and the bodies
 * square the axis — and each of those is a different strength of claim, which
 * is why the kind travels with the match instead of being flattened away.
 */
export type AddressKind =
  | "node"
  | "arriving-house"
  | "departing-house"
  | "arriving-ruler"
  | "departing-ruler"
  | "deep"
  | "crossing";

export interface AxisAddress {
  kind: AddressKind;
  /** What this transit is touching, as a clause. */
  label: string;
  /** The placement it resolves to — "House 9", "Saturn". */
  detail: string;
  /**
   * The same thing in two or three words, for dense rows.
   *
   * Not a truncation of `detail`, which is written for a panel with room:
   * what survives compression is the RELATIONSHIP to the axis, because in a
   * list of contributors that is the only part saying why the planet is on
   * this page at all.
   *
   * The relationship is stated as a VERB in brackets — "Venus (rules S.Node)"
   * — and was an em dash for a while: "Venus — S.Node ruler". A dash reads as
   * apposition, so the row said Venus and the South Node were the same thing
   * rather than that one governs the other, which is the entire content of the
   * claim.
   */
  short: string;
  /**
   * Which end of the axis this address belongs to.
   *
   * The single most meaning-bearing field here, and it is not recoverable from
   * `kind` alone: a body embedded in the nodal ground can be standing in
   * either house, so `deep` says nothing about direction on its own. Carrying
   * the side lets everything downstream ask the question that actually matters
   * — is this pressure on where you are going, on where you came from, or
   * across both — without re-deriving it from labels.
   */
  side: "arriving" | "departing" | "both";
}

export interface AxisTrigger {
  id: string;
  planet: string;
  /**
   * The band's own label, for aspect cycles only — "□ Square Saturn".
   *
   * A house transit's label is "House 9", which is exactly what the address
   * already says and reads as a stutter beside it. An aspect's is not: a
   * square and a conjunction to the same ruler are different transits, and
   * dropping the aspect would leave two rows looking identical.
   */
  aspect?: string;
  start: string;
  end: string;
  peak?: string;
  segments: Segment[];
  significance?: string;
  color?: string;
  status: BandStatus;
  /** Age at first contact and final release. The practical handle. */
  ageStart: number;
  ageEnd: number;
  /**
   * The natal house the transiting planet is crossing while this contact runs.
   *
   * A house transit already says where it is — that IS the contact. An aspect
   * does not: "Uranus conjunct your North Node's ruler" names what is struck
   * and not where Uranus is standing while it strikes, which is the first
   * thing anyone asks. The cache holds the planet's house transits over the
   * same span, so the answer is a lookup rather than a calculation.
   */
  transitingHouse: number | null;
  /**
   * Every part of the axis this one transit touches. Usually one; a body can
   * be both a node's ruler and embedded in the nodal ground, and collapsing
   * that to a single label would throw away the more interesting half.
   */
  addresses: AxisAddress[];
  /**
   * Beats falling inside this transit's envelope — but only for a transit
   * short enough that the overlap is evidence of anything.
   *
   * The intersection is the point of the whole file: the developmental rhythm
   * and an independent pressure land in the same stretch knowing nothing about
   * each other, and the agreement is worth pointing at because neither was
   * tuned to produce it. That argument
   * dies at length. Neptune crosses one house in about fourteen years and a
   * beat falls every 4.65, so a Neptune envelope contains three or four of
   * them *necessarily* — the first draft of this section duly reported "nodal
   * return at 37 and nodal square at 42 and nodal reversal at 47 and nodal
   * square at 51 falls inside this transit", which is arithmetic dressed as a
   * finding. Above the cap the list is left empty rather than padded.
   */
  coincides: NodalBeat[];
}

/**
 * How long a transit can run and still have a meaningful coincidence.
 *
 * Four years is a little over one beat interval, so containing a beat remains
 * a fact about this transit rather than a certainty about its duration.
 */
const COINCIDENCE_MAX_YEARS = 4;

/**
 * Which parts of the axis a band lands on, or an empty list for the great
 * majority of bands, which land on none.
 */
function addressesFor(band: Band, t: Trajectory): AxisAddress[] {
  const out: AxisAddress[] = [];

  // The label already names the relationship, so the detail has to earn its
  // place by saying something the label does not. "House 10" after "through
  // the ground you are moving into" is the same fact twice; the house's own
  // title, and the ruler's placement, are not.
  const houseDetail = (n: number) =>
    `House ${n} — ${getHouseTitle(n as House)}`;

  const at = (body: string, p: Placement | null) =>
    p ? `${body} in ${p.sign}, house ${p.houseNumber ?? "—"}` : body;

  if (band.kind === "house-transit" && band.houseNumber) {
    if (t.to.house && band.houseNumber === t.to.house) {
      out.push({
        kind: "arriving-house",
        label: "through the ground you are moving into",
        detail: houseDetail(band.houseNumber),
        short: `H${band.houseNumber}`,
        side: "arriving",
      });
    }
    if (t.from.house && band.houseNumber === t.from.house) {
      out.push({
        kind: "departing-house",
        label: "through the ground you are leaving",
        detail: houseDetail(band.houseNumber),
        short: `H${band.houseNumber}`,
        side: "departing",
      });
    }
  }

  const target = band.kind === "aspect-cycle" ? band.natalPlanet : undefined;
  if (target) {
    // The node itself — the strongest claim on this list, and for a long time
    // the one the cache could not make. Only the north node is stored, because
    // the nodes are an axis: an opposition to the north IS a conjunction to the
    // south, and a square sits on both at once. So the aspect decides which
    // END is being hit, and that reverses the meaning completely — a body
    // arriving on the south node is pressure on the ground being left, not on
    // the direction. Reporting either as "aspect to your North Node" would be
    // technically true and read as the opposite of what is happening.
    if (target === "North Node") {
      const on =
        band.aspectType === "Conjunction"
          ? {
              label: "onto your North Node — the direction itself",
              detail: `conjunct the North Node in ${t.to.sign} ${t.to.degree}`,
              short: "North Node",
              side: "arriving" as const,
            }
          : band.aspectType === "Opposition"
            ? {
                label: "onto your South Node — the ground you are leaving",
                detail:
                  `opposite the North Node, which is conjunct the South Node in ` +
                  `${t.from.sign} ${t.from.degree}`,
                short: "South Node",
                side: "departing" as const,
              }
            : {
                label: "square the nodal axis — across both ends at once",
                detail:
                  `square the axis, ${t.from.sign} ${t.from.degree} / ` +
                  `${t.to.sign} ${t.to.degree}`,
                short: "the nodal axis",
                side: "both" as const,
              };
      out.push({ kind: "node", ...on });
    }

    if (target === t.to.ruler) {
      out.push({
        kind: "arriving-ruler",
        label: "on the ruler of your North Node",
        detail: at(target, t.to.rulerPlacement),
        short: `${target} (rules N.Node)`,
        side: "arriving",
      });
    }
    if (target === t.from.ruler) {
      out.push({
        kind: "departing-ruler",
        label: "on the ruler of your South Node",
        detail: at(target, t.from.rulerPlacement),
        short: `${target} (rules S.Node)`,
        side: "departing",
      });
    }
    for (const d of t.deep) {
      if (d.body !== target) continue;
      out.push({
        kind: "deep",
        label:
          d.side === "arriving"
            ? "on a body standing in the ground you are entering"
            : "on a body standing in the ground you are leaving",
        detail: `${d.body} in ${d.sign}, house ${d.house}`,
        short: `${d.body} (in nodal ground)`,
        side: d.side,
      });
    }
    for (const c of t.crossing?.bodies ?? []) {
      if (c.body !== target) continue;
      out.push({
        kind: "crossing",
        label: "on the body that cuts across the axis",
        detail: `${c.body} in ${c.sign}${c.house ? `, house ${c.house}` : ""}`,
        short: `${c.body} (cuts the axis)`,
        // A natal square to the axis answers to neither end, which is the
        // whole definition of a crossing.
        side: "both",
      });
    }
  }

  return out;
}

/**
 * Everything in the feed that touches the axis, in date order.
 *
 * Planetary returns are deliberately dropped. A Saturn return is a real and
 * large event and it has nothing to do with the nodal axis, so including it
 * here would let the section borrow its weight for a claim it has not made.
 * The Cycles pages own it.
 */
export function axisTriggers(
  bands: Band[],
  t: Trajectory,
  beats: NodalBeat[],
  birthISO: string,
  now: Date,
): AxisTrigger[] {
  const birth = Date.parse(`${birthISO.slice(0, 10)}T12:00:00Z`);
  const ageAt = (d: string) => (Date.parse(d) - birth) / YEAR_MS;

  /**
   * Where the planet is standing on a given date.
   *
   * Envelopes overlap when a planet stations at a cusp and belongs to two
   * houses at once, so an in-effect segment beats a bare envelope — otherwise
   * a planet in a retrograde gap is reported in the house it backed out of.
   */
  const houseAt = (planet: string, date: string): number | null => {
    let envelope: number | null = null;
    for (const b of bands) {
      if (b.kind !== "house-transit" || b.title !== planet) continue;
      if (!b.houseNumber || date < b.start || date > b.end) continue;
      if (b.segments.some((s) => date >= s.start && date <= s.end)) {
        return b.houseNumber;
      }
      envelope = b.houseNumber;
    }
    return envelope;
  };

  const out: AxisTrigger[] = [];

  for (const band of bands) {
    if (band.kind === "planetary-return") continue;
    const addresses = addressesFor(band, t);
    if (addresses.length === 0) continue;

    const ageStart = ageAt(band.start);
    const ageEnd = ageAt(band.end);

    out.push({
      id: band.id,
      planet: band.title,
      aspect: band.kind === "aspect-cycle" ? band.subtitle : undefined,
      start: band.start,
      end: band.end,
      peak: band.peak,
      segments: band.segments,
      significance: band.significance,
      color: band.color,
      status: statusOfBand(band, now),
      ageStart,
      ageEnd,
      // Sampled at exactitude where the cache gives one, otherwise mid-span:
      // the house the planet occupies at the moment the contact is closest is
      // the one worth naming, not the one it happened to enter on.
      transitingHouse: houseAt(
        band.title,
        band.peak ?? iso((Date.parse(band.start) + Date.parse(band.end)) / 2),
      ),
      addresses: rankAddresses(addresses),
      coincides:
        ageEnd - ageStart > COINCIDENCE_MAX_YEARS
          ? []
          : beats.filter((b) => b.date >= band.start && b.date <= band.end),
    });
  }

  return out.sort((a, b) => a.start.localeCompare(b.start));
}

/**
 * How direct a claim an address makes, strongest first.
 *
 * Used for choosing which of a transit's addresses leads the row, never for
 * ordering the list — the list is chronological, because the section is about
 * when. A transit on the node itself and a transit through the node's house
 * are both real and they are not the same size of statement, and whichever one
 * the loop happened to push first is no basis for deciding which gets said.
 */
const ADDRESS_RANK: Record<AddressKind, number> = {
  node: 0,
  crossing: 1,
  deep: 2,
  "arriving-ruler": 3,
  "departing-ruler": 4,
  "arriving-house": 5,
  "departing-house": 6,
};

export function rankAddresses(addresses: AxisAddress[]): AxisAddress[] {
  return [...addresses].sort(
    (a, b) => ADDRESS_RANK[a.kind] - ADDRESS_RANK[b.kind],
  );
}

// ─── Composition ─────────────────────────────────────────────────────────────
//
// This file briefly carried an `aspectHorizons` helper that reported, per
// planet, how far the cache's aspect rows reached — because they reached very
// unevenly: Jupiter's stopped in 2011, Saturn's in 2028, Pluto's ran to 2051.
// It read like a row cap in the generator and the section duly warned that
// silence after those years was missing data rather than a quiet sky.
//
// It was not a cap. The aspect scan in `life-cycles-calculator.ts` recorded
// only the FIRST pass of each aspect and then stopped looking, so the faster
// the planet the sooner its one row fell. With that fixed every planet spans
// the whole window, the warning fires on nothing but real astronomy — a slow
// planet genuinely making no aspect for a decade — and a caveat that cries
// wolf about the sky is worse than no caveat. The window itself is still
// stated; it is a real bound, and it comes from `feed`.

export interface GrowthTiming {
  /** Birth date, ISO. Carried so consumers can turn an age back into a date. */
  birth: string;
  /** Age today, for the "in N years" arithmetic the page does. */
  age: number;
  beats: NodalBeat[];
  /** The beat in force, if the present sits inside a beat season. */
  current: NodalBeat | null;
  /** The next one after that. Null only past the end of the grid. */
  next: NodalBeat | null;
  triggers: AxisTrigger[];
  /** In force now. What "at the moment" means on this section. */
  active: AxisTrigger[];
  /** Triggers whose envelope contains a beat — rhythm and pressure agreeing. */
  loud: AxisTrigger[];
  /**
   * Whether the cache holds aspects to the nodes for this chart.
   *
   * False for any chart cached before the nodes were added as a natal target,
   * and the section has to say which it is looking at. "No transit hits your
   * node in the next decade" and "this chart has never been scanned for them"
   * look identical on screen and are completely different statements.
   */
  hasNodeAspects: boolean;
  /**
   * What the ephemeris actually holds — the extent of the rows returned, not
   * the window that was asked for.
   *
   * The distinction bit immediately. This section requests ninety years either
   * side of now so the early beats are covered, and the API happily reports
   * that window back; printing it produced "covers 1936–2116" under a list
   * whose real data stops in 2051. The requested window is a question, the
   * rows are the answer, and only the answer may be stated as coverage.
   */
  feed: { start: string; end: string };
  lifespan: number;
}

/**
 * The whole timing reading.
 *
 * `bands` is the raw `/api/cycles?view=all` payload; nothing here fetches. The
 * beats are computed whether or not the feed loaded, because they need only a
 * birth date — so a chart with no cached ephemeris still gets the half of this
 * section that answers "when", and loses only the half that says "and here is
 * what is moving through it".
 */
export function growthTiming(
  birthISO: string,
  t: Trajectory,
  bands: Band[],
  now: Date = new Date(),
  lifespan: number = LIFESPAN_YEARS,
): GrowthTiming {
  const birth = Date.parse(`${birthISO.slice(0, 10)}T12:00:00Z`);
  const beats = nodalBeats(birthISO, t, now, lifespan);
  const triggers = axisTriggers(bands, t, beats, birthISO, now);

  const feed = {
    start: bands.reduce((a, b) => (a && a < b.start ? a : b.start), ""),
    end: bands.reduce((a, b) => (a > b.end ? a : b.end), ""),
  };

  return {
    birth: birthISO.slice(0, 10),
    age: (now.getTime() - birth) / YEAR_MS,
    beats,
    current: beats.find((b) => b.status === "active") ?? null,
    next: beats.find((b) => b.status === "upcoming") ?? null,
    triggers,
    active: triggers.filter((x) => x.status === "active"),
    loud: triggers.filter((x) => x.coincides.length > 0),
    hasNodeAspects: bands.some(
      (b) => b.kind === "aspect-cycle" && b.natalPlanet === "North Node",
    ),
    feed,
    lifespan,
  };
}
