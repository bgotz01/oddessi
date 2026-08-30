/**
 * lib/career/reading.ts
 *
 * HOW THE MEANINGS COMBINE. Its counterpart, `interpretations.ts`, decides
 * WHAT THEY MEAN.
 *
 * Nothing here chooses a word. Every noun, verb and sentence comes out of the
 * tables or off the chart; this file decides which entry applies, in what
 * order, and how the halves are joined. A reading that says something untrue
 * is wrong in the tables. A reading that says something true in the wrong
 * place is wrong here.
 *
 * THE LEAD CONTACT
 * A window can hold six contacts, and a reading that describes all six equally
 * is an inventory rather than a reading. One contact leads, chosen by the
 * strength the model already computes — target relevance × aspect relevance —
 * and the rest are named as company. That is a claim about which contact is
 * most ABOUT the career, never about which planet matters more.
 */

import { getHouseCoreThemes, getHouseTitle, type House } from "@/lib/astrology/house-categories";
import {
  addressOf,
  classificationOf,
  geometryOf,
  GEOMETRY,
  processOf,
  type Geometry,
} from "./interpretations";
import type { CareerArchitecture, CareerContact } from "./model";
import type { CareerWindow } from "./windows";

export interface CareerReading {
  /** "Reinvention · Public Standing" — the whole period in two ordinary words. */
  title: string;
  /** "Reinvention". What kind of process. */
  process: string;
  /** "Standing". Which part of the structure. */
  address: string;
  /** The model's own classification, hedged and never leading. */
  classification: string;
  /** The evocative composition — "A stripping of the public role". */
  phrase: string;
  /** The astrology underneath. Evidence, not vocabulary. */
  technical: string;
  /** The period's claim, in a paragraph. */
  thesis: string;
  /** Which part of the career structure is under contact. */
  activated: string;
  /** How the pressure works — the process's mechanism. */
  mechanism: string;
  /** The vocational instruction. The centrepiece. */
  theMove: string;
  /** What the period makes possible, and how it gets wasted — as sentences. */
  opening: string;
  trap: string;
  /** The same two as noun phrases, for reading rather than parsing. */
  openings: string[];
  traps: string[];
  /** Life areas the period tends to arrive THROUGH. Never predictions. */
  arenas: string[];
  arenasSummary: string;
  /** Concrete domains from those houses. Still never predictions. */
  mayArriveThrough: string[];
  /** Present only when several independent bodies are in play. */
  convergence?: { thesis: string; tensions: string[] };
}

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

function list(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/**
 * The contact the reading is written about.
 *
 * Strength, not recency and not duration. A fourteen-year Neptune crossing of
 * the tenth would win any contest decided by span, and it is the weakest claim
 * in the model — so the window would be titled after the one contact that says
 * least about it.
 */
function leadOf(w: CareerWindow): CareerContact | null {
  return w.contacts.reduce<CareerContact | null>(
    (best, contact) =>
      !best ||
      contact.targetRelevance * contact.aspectRelevance >
        best.targetRelevance * best.aspectRelevance
        ? contact
        : best,
    null,
  );
}

/**
 * Which parts of the life the period tends to arrive through.
 *
 * The tenth always, because that is the house the whole page is about, plus
 * the house the ruler of the tenth actually occupies — which is where a career
 * concretely happens rather than where it is theorised. A tenth ruler in the
 * eleventh means this person's standing arrives through networks and groups;
 * in the sixth, through the daily practice. That is chart-specific and could
 * not have come from any other chart, which is the test every arena has to
 * pass to be worth printing.
 */
function arenaHouses(architecture: CareerArchitecture): House[] {
  const houses = new Set<House>([10]);
  const rulerHouse = architecture.rulerPlacement?.houseNumber;
  if (rulerHouse && rulerHouse >= 1 && rulerHouse <= 12) {
    houses.add(rulerHouse as House);
  }
  return [...houses].sort((a, b) => a - b);
}

/**
 * What several independent bodies at once actually claims.
 *
 * Only composed for convergence and turning points, because on a single contact
 * it would be one planet described twice.
 */
function convergenceOf(w: CareerWindow): { thesis: string; tensions: string[] } {
  const planets = [...new Set(w.contacts.map((c) => c.planet))];
  const processes = planets.map((p) => processOf(p));
  return {
    thesis:
      `${list(planets)} are working on the career structure at the same time and by different means — ` +
      `${list(processes.map((fn) => lower(fn.shortGloss)))}. ` +
      `They are independent: none of them is causing the others, and the period is a coincidence of ` +
      `separate pressures rather than one event with several names. That is what makes it hard to ` +
      `address with a single decision.`,
    // ONE LINE PER BODY, on its strongest address.
    //
    // Mapping every contact produced "Pluto strips the instrument in the
    // career / Pluto strips the public standing / Saturn tests the career
    // season / Saturn tests the instrument…" — nine lines for four planets,
    // which is an inventory of the ephemeris rather than a reading of a
    // tension. A body working on three addresses at once is one pressure with
    // three points of contact, and the strongest of them is the one worth
    // naming.
    tensions: planets.map((planet) => {
      const fn = processOf(planet);
      const strongest = w.contacts
        .filter((c) => c.planet === planet)
        .reduce((best, c) =>
          c.targetRelevance * c.aspectRelevance >
          best.targetRelevance * best.aspectRelevance
            ? c
            : best,
        );
      return `${planet} ${fn.verb} ${lower(addressOf(strongest.targetKind).label)}`;
    }),
  };
}

/**
 * Compose the reading for one window.
 *
 * The order below is the argument the panel makes, and it is deliberate:
 * WHAT KIND of period, WHAT IS TOUCHED, HOW it works, WHAT TO DO, and only
 * then what it could cost. A reading that opens with the trap is a warning,
 * and a warning is not what someone came to a career page for.
 */
export function interpretCareerWindow(
  w: CareerWindow,
  architecture: CareerArchitecture,
): CareerReading {
  const lead = leadOf(w);
  const fn = processOf(lead?.planet ?? "");
  const at = addressOf(lead?.targetKind ?? "tenthHouse");
  const geometry: Geometry = geometryOf(lead?.aspect ?? null);
  const shape = GEOMETRY[geometry];

  const planets = [...new Set(w.contacts.map((c) => c.planet))];
  const others = planets.filter((p) => p !== lead?.planet);
  const converging = w.grade !== "active";

  const houses = arenaHouses(architecture);
  const arenas = houses.map((h) => `${getHouseTitle(h)} (H${h})`);
  // Two per house rather than three, and lowercased for use in a list. The
  // themes carry their own commas, so a dozen joined into a sentence is
  // unreadable — the display renders them as separate items for that reason.
  const mayArriveThrough = houses.flatMap((h) =>
    getHouseCoreThemes(h).slice(0, 2).map(lower),
  );

  const mechanism = lead
    ? `${lead.planet} ${fn.verb} ${lower(at.label)} — ${fn.how}. The contact arrives as ${shape.shape} — ${shape.asks}.` +
      (others.length
        ? ` ${list(others)} ${others.length === 1 ? "works" : "work"} on the structure at the same time, by other means.`
        : "")
    : "The structure is between contacts.";

  const thesis =
    `${at.activated}\n\n` +
    (lead
      ? `${lead.planet} ${fn.gloss} Here that lands on ${lower(at.object)}, as ${shape.shape}.`
      : "Nothing is addressing the structure.") +
    `\n\nThe period is not the outcome. What the contact supplies is a window in which ` +
    `${lower(at.object)} can be changed at a cost that will be higher outside it — and a window ` +
    `is only worth having to someone who uses it.`;

  return {
    title: `${fn.label} · ${at.short}`,
    process: fn.label,
    address: at.short,
    classification: classificationOf(w.grade),
    phrase: `${fn.noun} ${at.titleTail}`,
    // Plain observation, in the grammar each kind of contact takes. A house
    // transit is not "conjunct" anything and an aspect is not "through"
    // anything; one sentence covering both would be wrong on each.
    technical:
      (lead
        ? lead.aspect
          ? `${lead.planet} ${lower(lead.aspect)} natal ${lead.target}. `
          : `${lead.planet} transiting ${lead.target}. `
        : "") +
      (others.length
        ? `${list(others)} ${others.length === 1 ? "is" : "are"} in contact at the same time. `
        : "") +
      `${planets.length} independent ${planets.length === 1 ? "body bears" : "bodies bear"} on the structure, ` +
      `which the model classifies as ${lower(classificationOf(w.grade))}.`,
    thesis,
    activated: at.activated,
    mechanism,
    theMove: at.move,
    // Process first, then the address — each half written to stand alone, so
    // the join reads as two sentences rather than as a filled-in template.
    opening: `The opening is to ${fn.opening}. ${at.opening}`,
    trap: `${fn.trap} ${at.trap}`,
    openings: [fn.openingNoun, ...at.openingNouns],
    traps: [fn.trapNoun, ...at.trapNouns],
    arenas,
    arenasSummary: `In these areas, the period ${fn.pressure}.`,
    mayArriveThrough,
    convergence: converging ? convergenceOf(w) : undefined,
  };
}
