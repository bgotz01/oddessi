/**
 * lib/love/timeline.ts
 *
 * WHEN THE RELATIONSHIP ARCHITECTURE IS ACTIVATED. Its counterpart,
 * `profile.ts`, answers what the architecture IS.
 *
 * WHY THERE IS NO INDEX ON THIS PAGE
 * Career carries a 0–100 curve and spends a page arguing that the number is a
 * density of contact rather than a forecast. That argument is winnable for a
 * vocation and is not winnable here. "Your love life is at 78" is a sentence
 * with no honest referent — nobody, including the chart, knows whether a dense
 * stretch is a marriage or a divorce — and a reader will take a number as a
 * verdict whatever the caption underneath it says. So the timeline carries
 * SPANS and CATEGORIES and nothing continuous. A window has a kind, a
 * duration, and a strength with three values, and none of those can be added
 * up into a score.
 *
 * THE FOUR LAYERS
 * Deliberately few. Every slow transit touches something, and a model that
 * watches Uranus, Neptune, Pluto, Mars, every Venus transit, solar returns and
 * profections will report that a relationship season is permanently in
 * progress — which is the same as reporting nothing.
 *
 *   JUPITER            transits to Venus, the relationship axis, the 5th and
 *                      7th and their rulers. Opening.
 *   SATURN             the same addresses. Defining.
 *   PROGRESSED MOON    the 5th and 7th it stands in, and its aspects to natal
 *                      Venus. The emotional season, two to three years long.
 *   PROGRESSED VENUS   sign and house changes, and major aspects. The slowest
 *                      layer, and the only one that says a person's romantic
 *                      orientation itself has moved.
 *
 * The nodes and eclipses are the documented fifth layer and are not built. See
 * LOVE_TIMELINE_MODEL.deferred.
 *
 * KIND IS A COMBINATION, NOT A PLANET
 * The window kind is never read off the transiting body. It is the arena the
 * contact lands in, crossed with what the contact does there — so Jupiter in
 * the 5th is a Romance window and Saturn on the Descendant is a Commitment
 * one, and neither is "a Jupiter window" or "a Saturn window". That crossing
 * is the whole reason four kinds are enough.
 */

import type { Band } from "@/lib/band";
import { YEAR_MS, ageAtISO, birthMsOf, isoAtAge } from "@/lib/chart-time";
import type { LoveArchitecture } from "./architecture";
import type { ProgressedEvent } from "./progressions";

export const LOVE_TIMELINE_MODEL = {
  version: 1,
  lifespanYears: 90,
  /**
   * Below this age a contact is real and the noun is not.
   *
   * Jupiter crosses the 7th when a chart is three years old, and the transit
   * is the same transit. Printing "Partnership window, ages 3–4" in a list a
   * person is meant to read about their relationships is a category error, and
   * a louder one than Career's — a vocational window at eleven is merely
   * premature, a partnership window at three is absurd. Sixteen rather than
   * Career's fourteen, on the same reasoning applied to a different subject.
   */
  relationalFloorAge: 16,
  /**
   * How long a progressed Venus ingress stands for.
   *
   * The layer is described as "sign and house CHANGES", and the word is doing
   * work. Progressed Venus occupies a sign for five to thirty years; treating
   * the occupancy as the window would produce an Attraction band covering a
   * third of a life, which is a fact about arithmetic and not about anyone's
   * love life. The change is the event. A year either side of the ingress is
   * the stretch over which a reorientation is actually legible.
   */
  ingressHalfWidthYears: 1,
  /**
   * Windows of the same kind closer together than this are one window.
   *
   * Jupiter stations retrograde inside the 7th and the cache stores the stay
   * as two rows with a gap; so does a progressed body wobbling across a cusp
   * between samples. Without a join the timeline draws one season as two,
   * which reads as two chances rather than one.
   */
  joinGapYears: 0.5,
  /** A window shorter than this is a contact, not a season. */
  minimumWindowYears: 0.25,
  /**
   * And a window longer than this is a sequence of them.
   *
   * Runs are built by overlap, and overlap chains: A meets B, B meets C, and a
   * Saturn transit of the 7th joined to a progressed Venus ingress joined to
   * the next Jupiter return produced a single six-and-a-half-year Commitment
   * window in the first build. That is not a window. Nobody can act on
   * "2034–2040", and drawn on a timeline it swallows the three distinct
   * periods inside it.
   *
   * Three and a half years holds the longest thing the model legitimately
   * calls one season — Saturn's stay in the 7th runs about two and a half,
   * and a progressed Moon house stay two to three — with room for a
   * contemporaneous transit at either end, and breaks the chain after that.
   */
  maximumWindowYears: 3.5,
  /**
   * Strength, which is categorical on purpose.
   *
   * The user-facing words are Minor, Moderate and Major, and the temptation is
   * to derive them from a total. They are derived from SHAPE instead, on the
   * same argument Career's window grades are: independence of evidence is a
   * structural fact a chart can observe, and magnitude of consequence is not.
   *
   *   MAJOR      three or more of the four layers at once
   *   MODERATE   two layers, OR a single layer reaching the core — Venus, the
   *              relationship axis, or the ruler of the 7th
   *   MINOR      one layer, and not on the core
   *
   * Major asks for three rather than two because of what "core" turns out to
   * mean inside an Attraction window. Every contact in that group lands on
   * Venus by construction, so "two layers, one of them core" is satisfied by
   * any two layers at all — and the first build graded thirty of fifty-three
   * windows Major, which is a label that has stopped sorting anything. Three
   * of the four layers converging is a real and uncommon event: it needs a
   * transit and a progression agreeing, which they mostly do not.
   */
  independentLayersForMajor: 3,
  independentLayersForModerate: 2,
  deferred: {
    nodesAndEclipses:
      "The documented fifth layer. An eclipse on the 1st/7th axis or on Venus is the strongest single relationship signature there is — and it is a point event on an axis that receives four to six eclipses per eighteen-month family, so admitting it without a rule for which ones matter would add noise at exactly the volume the other four layers were trimmed to avoid.",
    outerPlanets:
      "Uranus, Neptune and Pluto reach these addresses too, and their transits run for years. They are excluded because they are not ABOUT relationship — Pluto square Venus is as much a reading of power, money or a parent as of a partner — and a layer that cannot be wrong is not evidence.",
    mars: "Fast, frequent, and would mark thirty attraction windows a life.",
    venusTransits:
      "Transiting Venus reaches every address twice a year. At that rate the timeline stops distinguishing anything.",
    eighthHouse:
      "Intimacy has a natal address and no trustworthy transit signature. See architecture.ts.",
  },
} as const;

/** The four window kinds, in narrative order. The order is the claim. */
export const LOVE_WINDOW_KINDS = [
  "attraction",
  "romance",
  "partnership",
  "commitment",
] as const;

export type LoveWindowKind = (typeof LOVE_WINDOW_KINDS)[number];
export type LoveStrength = "minor" | "moderate" | "major";
export type LoveLayer =
  | "jupiter"
  | "saturn"
  | "progressedMoon"
  | "progressedVenus";
/** What a layer DOES where it lands. Crossed with the arena, this is the kind. */
export type LoveMode = "opening" | "defining" | "seasonal";
/** Where a contact lands. Narrower than the profile's arenas — see architecture.ts. */
export type LoveTarget = "venus" | "fifth" | "seventh";

export const LOVE_LAYER_LABEL: Record<LoveLayer, string> = {
  jupiter: "Jupiter",
  saturn: "Saturn",
  progressedMoon: "Progressed Moon",
  progressedVenus: "Progressed Venus",
};

export const LOVE_LAYER_MEANING: Record<LoveLayer, string> = {
  jupiter:
    "Opening. Where Jupiter goes, more of something becomes available — more people, more invitation, more appetite. It is the one layer that says opportunity without saying pressure, and it is not a promise that anything is taken up.",
  saturn:
    "Defining. Saturn asks a relationship to become a specific thing with an actual shape, and the same transit covers committing, formalising, restructuring and ending. It says a question is being forced, never which answer comes back.",
  progressedMoon:
    "The emotional season. Two to three years in a house, once every twenty-seven, so a chart gets three of each in a long life. It colours a stretch rather than triggering an event.",
  progressedVenus:
    "The slowest layer, and the only one about the person rather than the period. A sign change here says what someone is drawn to has moved — over years, and usually only visible afterwards.",
};

export const LOVE_MODE_LABEL: Record<LoveMode, string> = {
  opening: "Opening",
  defining: "Defining",
  seasonal: "Season",
};

export const LOVE_WINDOW_LABEL: Record<LoveWindowKind, string> = {
  attraction: "Attraction",
  romance: "Romance",
  partnership: "Partnership",
  commitment: "Commitment",
};

/** The one line each kind is claiming. Read by the panel, the key and the chat. */
export const LOVE_WINDOW_MEANING: Record<LoveWindowKind, string> = {
  attraction:
    "Venus itself is under contact, or has moved. The emphasis is on taste and pull — what registers as attractive, and how readily. It says nothing about whether anyone is met.",
  romance:
    "The 5th is emphasised: courtship, play, the part that happens before anything is decided. New connections are more strongly marked than continuing ones, and a 5th-house season is as consistent with a run of nothing serious as with the beginning of something.",
  partnership:
    "The 7th and the relationship axis are emphasised. The weight is on the other person and on being one of a pair — forming a partnership, or having an existing one become the thing that is actually at stake.",
  commitment:
    "Saturn on the core — Venus, the axis, or the ruler of the 7th. A relationship is being asked to take a definite shape. The configuration covers marrying, formalising, restructuring and ending with equal comfort: it says the question is live, never which way it resolves.",
};

export const LOVE_STRENGTH_LABEL: Record<LoveStrength, string> = {
  minor: "Minor",
  moderate: "Moderate",
  major: "Major",
};

export const LOVE_STRENGTH_MEANING: Record<LoveStrength, string> = {
  minor:
    "One layer, and not on the core. Something is touching the architecture at its edges.",
  moderate:
    "Two independent layers at once, or a single layer reaching the core — Venus, the relationship axis, or the ruler of the 7th.",
  major:
    "Three or more of the four layers at once. Independence is the whole claim: one body making three contacts is one process wearing three hats, not three pieces of evidence — so what is counted is how many separate clocks agree, and a transit agreeing with a progression is the rarest thing this model can see.",
};

/**
 * The five phases, most specific first — which is also the order they are
 * tested in.
 *
 * "Peak" was the fifth name in the first sketch and is not used. It is a
 * magnitude word on a page that carries no magnitude, and it implies the
 * chart knows a stretch is the best one, which is precisely the claim
 * `LOVE_WINDOW_MEANING.commitment` spends its last sentence refusing.
 * CONVERGING says the same structural thing — more than one window open at
 * once — and claims only what can be observed.
 */
export const LOVE_PHASES = [
  "defining",
  "converging",
  "active",
  "opening",
  "quiet",
] as const;

export type LovePhase = (typeof LOVE_PHASES)[number];

export const LOVE_PHASE_LABEL: Record<LovePhase, string> = {
  defining: "Defining",
  converging: "Converging",
  active: "Active",
  opening: "Opening",
  quiet: "Quiet",
};

export const LOVE_PHASE_MEANING: Record<LovePhase, string> = {
  defining:
    "A Commitment window is open — Saturn is on the core, and a relationship question is being asked for a definite answer.",
  converging:
    "More than one window is open at once. Several layers are addressing the architecture from different directions.",
  active: "One window is open. A single relationship theme is under emphasis.",
  opening: "Nothing is open, and a window begins within the year ahead.",
  quiet:
    "Nothing open and nothing within the year. Not an absence of relationships — the architecture is simply not being worked on, and the quiet is what makes the loud stretches legible.",
};

/** One piece of evidence: one layer, on one address, for one span. */
export interface LoveContact {
  id: string;
  layer: LoveLayer;
  mode: LoveMode;
  target: LoveTarget;
  /** On Venus, the relationship axis, or the ruler of the 7th. */
  core: boolean;
  /** "Jupiter △ Venus", "Saturn through the 7th", "Progressed Venus enters Leo". */
  label: string;
  /** The address in words: "natal Venus", "the 7th house". */
  address: string;
  ageStart: number;
  ageEnd: number;
  start: string;
  end: string;
  peak: string | null;
}

export interface LoveWindow {
  id: string;
  kind: LoveWindowKind;
  strength: LoveStrength;
  /** What the window does, taken from its strongest contact. */
  mode: LoveMode;
  ageStart: number;
  ageEnd: number;
  start: string;
  end: string;
  status: "completed" | "active" | "upcoming";
  contacts: LoveContact[];
  /** The distinct layers behind it. Length is what strength is read from. */
  layers: LoveLayer[];
}

/**
 * Which layers this chart can be read on at all.
 *
 * Same distinction Career draws and for the same reason: a layer that cannot
 * produce a contact scores nothing forever and draws exactly like a layer that
 * is quiet. A chart saved without a birth time has no houses, which silently
 * removes the 5th, the 7th and the entire progressed-Moon layer — three
 * quarters of the model — and every remaining window would still render
 * perfectly.
 */
export interface LoveCoverage {
  layers: {
    layer: LoveLayer;
    /** It can produce a contact at all. */
    reachable: boolean;
    /** It can, but some of its addresses are dark — a fraction of a layer. */
    partial: boolean;
    /** It produced at least one contact in the span. */
    observed: boolean;
    why: string | null;
  }[];
  /** Natal addresses the cached transit feed computes no contacts against. */
  darkAddresses: string[];
  housed: boolean;
}

/** Points the cached cycle feed computes aspect contacts against. */
const FEED_NATAL_POINTS = new Set([
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "North Node",
  "Ascendant",
  "Midheaven",
]);

const ASPECT_GLYPH: Record<string, string> = {
  Conjunction: "☌",
  Opposition: "☍",
  Square: "□",
  Trine: "△",
  Sextile: "✶",
};

function ordinal(n: number): string {
  const suffix =
    n % 10 === 1 && n !== 11 ? "st"
    : n % 10 === 2 && n !== 12 ? "nd"
    : n % 10 === 3 && n !== 13 ? "rd"
    : "th";
  return `${n}${suffix}`;
}

/**
 * What a transit band contributes, or nothing.
 *
 * Returns null far more often than not, which is the point — the feed carries
 * every slow body against every cached natal point, and this admits Jupiter
 * and Saturn on seven addresses.
 */
function contactFromBand(
  band: Band,
  architecture: LoveArchitecture,
  birthMs: number,
): LoveContact | null {
  const layer: LoveLayer | null =
    band.title === "Jupiter" ? "jupiter"
    : band.title === "Saturn" ? "saturn"
    : null;
  if (!layer) return null;

  const mode: LoveMode = layer === "jupiter" ? "opening" : "defining";
  const { fifth, seventh } = architecture;

  let target: LoveTarget | null = null;
  let core = false;
  let label = "";
  let address = "";

  if (band.kind === "house-transit" && band.houseNumber === 5) {
    target = "fifth";
    label = `${band.title} through the 5th`;
    address = "the 5th house";
  } else if (band.kind === "house-transit" && band.houseNumber === 7) {
    target = "seventh";
    core = true;
    label = `${band.title} through the 7th`;
    address = "the 7th house";
  } else if (band.kind === "aspect-cycle" && band.natalPlanet && band.aspectType) {
    const glyph = ASPECT_GLYPH[band.aspectType] ?? "";
    const natal = band.natalPlanet;
    if (natal === "Venus") {
      target = "venus";
      core = true;
      address = "natal Venus";
    } else if (natal === "Ascendant") {
      // An aspect to one end of an axis is an aspect to the other. The feed
      // samples the Ascendant alone for exactly that reason, so this is the
      // only route to the Descendant there is.
      target = "seventh";
      core = true;
      address = "the relationship axis";
    } else if (seventh.ruler && natal === seventh.ruler) {
      target = "seventh";
      core = true;
      address = `the ruler of the 7th (${natal})`;
    } else if (fifth.ruler && natal === fifth.ruler) {
      target = "fifth";
      address = `the ruler of the 5th (${natal})`;
    }
    if (target) label = `${band.title} ${glyph} ${natal}`.trim();
  }

  if (!target) return null;

  return {
    id: `love-${band.id}`,
    layer,
    mode,
    target,
    core,
    label,
    address,
    ageStart: ageAtISO(birthMs, band.start),
    ageEnd: ageAtISO(birthMs, band.end),
    start: band.start,
    end: band.end,
    peak: band.peak ?? null,
  };
}

/** What a progressed event contributes, or nothing. */
function contactFromProgression(
  event: ProgressedEvent,
  birthMs: number,
): LoveContact | null {
  const layer: LoveLayer =
    event.body === "Moon" ? "progressedMoon" : "progressedVenus";
  const body = `Progressed ${event.body}`;

  let target: LoveTarget | null = null;
  let core = false;
  let label = "";
  let address = "";
  let ageStart = event.ageStart;
  let ageEnd = event.ageEnd;

  if (event.kind === "house" && event.body === "Moon") {
    if (event.houseNumber === 5) {
      target = "fifth";
      label = `${body} in the 5th`;
      address = "the 5th house";
    } else if (event.houseNumber === 7) {
      target = "seventh";
      core = true;
      label = `${body} in the 7th`;
      address = "the 7th house";
    }
  } else if (event.kind === "house" && event.body === "Venus") {
    // The ingress, not the stay — see LOVE_TIMELINE_MODEL.ingressHalfWidthYears.
    // A progressed Venus house occupancy runs for twenty years.
    if (event.ageStart <= 0) return null;
    target = "venus";
    core = true;
    label = `${body} enters the ${ordinal(event.houseNumber ?? 0)}`;
    address = "natal Venus";
    ageEnd = event.ageStart + LOVE_TIMELINE_MODEL.ingressHalfWidthYears;
    ageStart = event.ageStart - LOVE_TIMELINE_MODEL.ingressHalfWidthYears;
  } else if (event.kind === "sign") {
    // The first run is where Venus was born, not somewhere it arrived.
    if (event.ageStart <= 0) return null;
    target = "venus";
    core = true;
    label = `${body} enters ${event.sign}`;
    address = "natal Venus";
    ageEnd = event.ageStart + LOVE_TIMELINE_MODEL.ingressHalfWidthYears;
    ageStart = event.ageStart - LOVE_TIMELINE_MODEL.ingressHalfWidthYears;
  } else if (event.kind === "aspect" && event.aspectType && event.natalPoint) {
    const glyph = ASPECT_GLYPH[event.aspectType] ?? "";
    label = `${body} ${glyph} ${event.natalPoint}`.trim();
    if (event.natalPoint === "Ascendant") {
      target = "seventh";
      core = true;
      address = "the relationship axis";
    } else {
      target = "venus";
      core = true;
      address = `natal ${event.natalPoint}`;
    }
  }

  if (!target) return null;

  return {
    id: `love-${event.id}`,
    layer,
    // Progressions do not open or define; they colour a stretch. Calling a
    // progressed Moon season "opening" would put it in the same category as a
    // Jupiter transit, and the two are not the same kind of claim.
    mode: "seasonal",
    target,
    core,
    label,
    address,
    ageStart,
    ageEnd,
    start: isoAtAge(birthMs, ageStart),
    end: isoAtAge(birthMs, ageEnd),
    peak: event.peak,
  };
}

/**
 * The kind, from the combination.
 *
 * Read from the contacts rather than from any one of them, because the
 * combination is the claim: Saturn on the Descendant beside a progressed Moon
 * in the 7th is a Commitment window, and the progressed Moon on its own is a
 * Partnership one.
 */
function kindOf(contacts: LoveContact[], target: LoveTarget): LoveWindowKind {
  /**
   * Commitment is Saturn on the RELATIONSHIP AXIS, and nowhere else.
   *
   * The first rule read "a defining contact on any core address", which put
   * Saturn–Venus into Commitment too — and since Saturn reaches Venus by some
   * major aspect every three or four years, Commitment became the most common
   * kind on the page. A category that fires forty per cent of the time has
   * stopped being a category, and the one it was eating was Attraction: a
   * Jupiter–Venus opening with a Saturn–Venus square somewhere inside it was
   * filed under commitment and its opening never mentioned.
   *
   * Narrowing it to the 7th and the axis costs nothing, because the defining
   * MODE survives on the window either way — a Saturn–Venus period still
   * reads "Attraction · Defining", which is the true description: taste under
   * pressure, not a partnership being decided. And it restores the narrative
   * the four kinds exist for. Attraction, Romance and Partnership are arenas a
   * life moves through repeatedly; Commitment is meant to be the rare one, and
   * Saturn crossing the relationship axis — twice in a long life — is what
   * rare looks like.
   */
  if (target === "seventh" && contacts.some((c) => c.mode === "defining" && c.core)) {
    return "commitment";
  }
  return target === "venus" ? "attraction" : target === "fifth" ? "romance" : "partnership";
}

function strengthOf(contacts: LoveContact[]): LoveStrength {
  const layers = new Set(contacts.map((c) => c.layer)).size;
  const core = contacts.some((c) => c.core);
  if (layers >= LOVE_TIMELINE_MODEL.independentLayersForMajor) return "major";
  if (layers >= LOVE_TIMELINE_MODEL.independentLayersForModerate || core) {
    return "moderate";
  }
  return "minor";
}

function statusOf(start: string, end: string, now: Date): LoveWindow["status"] {
  const iso = now.toISOString().slice(0, 10);
  if (iso < start) return "upcoming";
  if (iso > end) return "completed";
  return "active";
}

/**
 * Merge contacts into windows.
 *
 * Grouped by TARGET first and graded afterwards, which is deliberate and is
 * the one ordering decision in this file worth arguing about. Grouping by kind
 * would mean a Saturn contact and a Jupiter contact on the same 7th house
 * landing in two different buckets — a Commitment window and a Partnership
 * window over the same months, drawn as two rows, describing one situation
 * twice. Grouping by where they land keeps them together and lets the
 * combination decide what the period is called, which is what
 * `kindOf` exists for.
 */
function merge(
  contacts: LoveContact[],
  now: Date,
  floorAge: number,
): LoveWindow[] {
  const { joinGapYears, minimumWindowYears, maximumWindowYears } =
    LOVE_TIMELINE_MODEL;
  const windows: LoveWindow[] = [];

  for (const target of ["venus", "fifth", "seventh"] as LoveTarget[]) {
    const group = contacts
      .filter((c) => c.target === target)
      .sort((a, b) => a.ageStart - b.ageStart);

    // Contiguous runs: a contact joins the open run when it starts before that
    // run has finished, plus the join gap.
    const runs: LoveContact[][] = [];
    let runStart = Infinity;
    let runEnd = -Infinity;
    for (const contact of group) {
      const current = runs[runs.length - 1];
      const joins = current !== undefined && contact.ageStart <= runEnd + joinGapYears;
      // The cap is tested against what the run WOULD become, so a contact that
      // would stretch it past the maximum opens the next window instead of
      // being absorbed. Its own span is untouched either way — only which
      // window it belongs to changes.
      const fits =
        Math.max(runEnd, contact.ageEnd) - Math.min(runStart, contact.ageStart) <=
        maximumWindowYears;
      if (joins && fits) {
        current.push(contact);
        runStart = Math.min(runStart, contact.ageStart);
        runEnd = Math.max(runEnd, contact.ageEnd);
      } else {
        runs.push([contact]);
        runStart = contact.ageStart;
        runEnd = contact.ageEnd;
      }
    }

    for (const members of runs) {
      const ageStart = Math.min(...members.map((c) => c.ageStart));
      const ageEnd = Math.max(...members.map((c) => c.ageEnd));
      // A run that ENDS before the floor is dropped; one that straddles it is
      // kept whole. Clipping the start of the first adult window would misdate
      // it, which is worse than including a few months of adolescence in it.
      if (ageEnd < floorAge) continue;
      if (ageEnd - ageStart < minimumWindowYears) continue;
      windows.push({
        id: "",
        kind: kindOf(members, target),
        strength: strengthOf(members),
        mode: members.some((c) => c.mode === "defining")
          ? "defining"
          : members.some((c) => c.mode === "opening")
            ? "opening"
            : "seasonal",
        ageStart,
        ageEnd,
        start: "",
        end: "",
        status: "upcoming",
        // Core contacts first: the panel prints these in order and the
        // evidence that earned the grade should be the evidence read first.
        contacts: [...members].sort((a, b) => Number(b.core) - Number(a.core)),
        layers: [...new Set(members.map((c) => c.layer))],
      });
    }
  }

  return windows.sort((a, b) => a.ageStart - b.ageStart);
}

export interface LoveTimeline {
  windows: LoveWindow[];
  contacts: LoveContact[];
  coverage: LoveCoverage;
  /** Age today, for positioning the now rule. */
  age: number;
  phase: LovePhase;
  /** Windows open right now. */
  open: LoveWindow[];
  /** The soonest window that has not started. Null at the end of the span. */
  next: LoveWindow | null;
  /** The one after that, which the page prints as LATER. */
  later: LoveWindow | null;
}

function coverageOf(
  architecture: LoveArchitecture,
  contacts: LoveContact[],
): LoveCoverage {
  const observed = new Set(contacts.map((c) => c.layer));
  const { housed, fifth, seventh } = architecture;

  // A cusp ruler that the feed never computes contacts against. Under modern
  // rulership five signs hand a house to Jupiter, Saturn, Uranus, Neptune or
  // Pluto, and for those charts the ruler layer can never produce a row.
  const darkAddresses = [
    fifth.ruler && !FEED_NATAL_POINTS.has(fifth.ruler)
      ? `the ruler of the 5th (${fifth.ruler})`
      : null,
    seventh.ruler && !FEED_NATAL_POINTS.has(seventh.ruler)
      ? `the ruler of the 7th (${seventh.ruler})`
      : null,
  ].filter((x): x is string => Boolean(x));

  /**
   * Every layer reaches natal Venus by aspect, and Venus needs no houses — so
   * no layer is ever wholly unreachable, and the first version's claim that
   * the progressed Moon was unreachable without a birth time was wrong in a
   * way that showed: a chart with no cusps reported that layer as dark and
   * observed in the same breath, because its aspects to Venus had fired
   * anyway.
   *
   * What a missing birth time actually costs is the HOUSE half of three
   * layers. PARTIAL says that, and it is the more useful statement: the
   * progressed Moon's two-to-three-year seasons in the 5th and the 7th are
   * most of what that layer is for, and losing them while keeping its
   * fortnightly Venus aspects is a real degradation that "reachable" would
   * have hidden and "unreachable" overstated.
   */
  const HOUSE_DEPENDENT: LoveLayer[] = ["jupiter", "saturn", "progressedMoon"];

  const layers: LoveCoverage["layers"] = (
    ["jupiter", "saturn", "progressedMoon", "progressedVenus"] as LoveLayer[]
  ).map((layer) => {
    const partial = !housed && HOUSE_DEPENDENT.includes(layer);
    return {
      layer,
      reachable: true,
      partial,
      observed: observed.has(layer),
      why: partial
        ? layer === "progressedMoon"
          ? "Its aspects to natal Venus are read; its stays in the 5th and the 7th — the seasons this layer mostly exists for — are not, because this chart has no houses."
          : "Aspects are read; transits through the 5th and the 7th are not, because this chart has no houses."
        : null,
    };
  });

  return { layers, darkAddresses, housed };
}

function phaseOf(open: LoveWindow[], next: LoveWindow | null, age: number): LovePhase {
  if (open.some((w) => w.kind === "commitment")) return "defining";
  if (open.length > 1) return "converging";
  if (open.length === 1) return "active";
  if (next && next.ageStart - age <= 1) return "opening";
  return "quiet";
}

export function loveTimeline(
  architecture: LoveArchitecture,
  bands: Band[],
  progressed: ProgressedEvent[],
  birthISO: string,
  now: Date,
): LoveTimeline {
  const birthMs = birthMsOf(birthISO);
  const age = (now.getTime() - birthMs) / YEAR_MS;

  const contacts = [
    ...bands.flatMap((band) => {
      const contact = contactFromBand(band, architecture, birthMs);
      return contact ? [contact] : [];
    }),
    ...progressed.flatMap((event) => {
      const contact = contactFromProgression(event, birthMs);
      return contact ? [contact] : [];
    }),
  ].sort((a, b) => a.ageStart - b.ageStart);

  const windows = merge(
    contacts,
    now,
    LOVE_TIMELINE_MODEL.relationalFloorAge,
  ).map((window, index) => {
    const start = isoAtAge(birthMs, window.ageStart);
    const end = isoAtAge(birthMs, window.ageEnd);
    return {
      ...window,
      id: `love-window-${index}-${start}`,
      start,
      end,
      status: statusOf(start, end, now),
    };
  });

  const open = windows.filter((w) => w.status === "active");
  const ahead = windows.filter((w) => w.status === "upcoming");

  return {
    windows,
    contacts,
    coverage: coverageOf(architecture, contacts),
    age,
    phase: phaseOf(open, ahead[0] ?? null, age),
    open,
    next: ahead[0] ?? null,
    later: ahead[1] ?? null,
  };
}
