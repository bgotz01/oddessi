/**
 * lib/career/natal.ts
 *
 * WHAT THE NATAL CAREER PARTS MEAN. Its counterpart, `snapshot.ts`, decides
 * WHICH PARTS THIS CHART HAS and assembles them.
 *
 * The same division as `interpretations.ts` / `reading.ts`, for the other half
 * of the page. That file answers WHEN the vocational structure is being worked
 * on; this one answers WHAT THE STRUCTURE IS — the standing chart, with no
 * transit in it and no date attached.
 *
 * WHY THESE FACTORS AND IN THIS ORDER
 * The order is a claim and it is stated rather than implied. The Midheaven and
 * the ruler of the tenth are the vocation; planets in the tenth are machinery
 * already installed in it; Saturn and the Sun are the two bodies every career
 * runs through whatever else is true — authority and visibility; the sixth and
 * second rulers describe the work and the money, which are adjacent to a
 * vocation without being one; Jupiter modifies. A reader who takes the fifth
 * item as seriously as the first has been handed a list, not a reading.
 *
 * WHY THIS CONTRADICTS `model.ts`, AND WHY THAT IS CORRECT
 * The index deliberately excludes generic Saturn, generic Sun, the sixth and
 * the second — see CAREER_MODEL.deferred. That exclusion is about TRANSITS:
 * a transit to the ruler of the sixth is a transit to daily work, and counting
 * it would turn every busy season into a vocational peak. It says nothing
 * about the natal chart, where Saturn is part of the career structure at all
 * times whether or not anything is currently touching it. The two files are
 * answering different questions and are allowed to hold different lists.
 *
 * BULLETS, NOT PROSE
 * Everything here is a fragment. A snapshot is read in a scan — the reader is
 * looking for their own chart, not for an essay about it — and the moment
 * these become sentences the page turns into the horoscope this product is
 * trying not to be. The expansion into prose happens in the chat, from the
 * same fragments, for a person who asked.
 *
 * COMPOSITIONAL, NEVER ENUMERATED
 * Eight factors, thirteen bodies, twelve signs and twelve houses would be tens
 * of thousands of written readings. There are forty-five entries below. A
 * factor is a set of SLOTS, each naming a field on one of the three tables,
 * and a reading is those fields resolved against this chart's own placements.
 * Adding the eleventh-house ruler tomorrow is one entry, not twelve hundred.
 */

/* -------------------------------------------------------------------------
 * SIGNS — the manner. HOW a career function operates.
 * ---------------------------------------------------------------------- */

export interface SignEntry {
  /**
   * What this sign wants to be KNOWN for. Used only where a factor is about
   * reputation — the Midheaven, the Sun — because "known for" and "operates
   * by" are genuinely different questions and one phrase cannot answer both.
   */
  standing: string;
  /** The manner, as a noun phrase. Completes "reads as …". */
  mode: string;
  /** The mechanism, as a gerund clause. Completes "recognised by …". */
  via: string;
  /** This sign's own career failure mode. Completes "costs …". */
  cost: string;
}

export const CAREER_SIGN: Record<string, SignEntry> = {
  Aries: {
    standing: "first, fast, willing to go alone",
    mode: "initiative, speed, appetite for the unproven",
    via: "starting before the plan is finished",
    cost: "starts outnumbering finishes",
  },
  Taurus: {
    standing: "steady, solid, worth keeping",
    mode: "durability, patience, tangible output",
    via: "building one thing slowly enough that it lasts",
    cost: "staying long after it stopped paying",
  },
  Gemini: {
    standing: "quick, fluent, the one who can explain it",
    mode: "range, language, fast switching",
    via: "talking, writing, moving between rooms",
    cost: "range with no specialty under it",
  },
  Cancer: {
    standing: "trusted, protective, close to the people",
    mode: "loyalty, memory, care for whoever is inside the work",
    via: "becoming the person others come to",
    cost: "loyalty to a role that stopped fitting",
  },
  Leo: {
    standing: "distinctive, credited, out in front",
    mode: "presence, authorship, appetite for the visible seat",
    via: "putting your name on the work",
    cost: "needing the credit more than the work",
  },
  Virgo: {
    standing: "precise, competent, the one who catches it",
    mode: "craft, correction, standards held privately",
    via: "being reliably better at the actual task",
    cost: "refining what should already have shipped",
  },
  Libra: {
    standing: "fair, well-placed, good in the room",
    mode: "judgement, relationship, sense of proportion",
    via: "who you work with and how the deal is shaped",
    cost: "deciding late to keep everyone in",
  },
  Scorpio: {
    standing: "serious, unbluffable, holding something others do not",
    mode: "depth, leverage, tolerance for what others avoid",
    via: "controlling what matters rather than what is seen",
    cost: "power kept private until it is contested",
  },
  Sagittarius: {
    standing: "expansive, convinced, pointed further out",
    mode: "reach, conviction, appetite for the bigger frame",
    via: "going wider — new territory, new claim",
    cost: "promises outrunning delivery",
  },
  Capricorn: {
    standing: "credible, senior, in charge of something real",
    mode: "structure, patience, appetite for responsibility",
    via: "carrying weight before being offered it",
    cost: "the climb continuing after the reason for it ran out",
  },
  Aquarius: {
    standing: "independent, ahead of it, hard to place",
    mode: "detachment, system thinking, refusal of the standard track",
    via: "solving it differently and on your own terms",
    cost: "a principle held past its usefulness",
  },
  Pisces: {
    standing: "gifted, generous, hard to pin down",
    mode: "imagination, permeability, no fixed edge",
    via: "following the pull rather than the ladder",
    cost: "a talent with no container",
  },
};

/* -------------------------------------------------------------------------
 * HOUSES — the arena. WHERE a career function plays out.
 * ---------------------------------------------------------------------- */

export interface HouseEntry {
  /** Bare noun phrase. Completes "lands in …". */
  arena: string;
  /** The channel, as a clause. Completes "plays out through …". */
  through: string;
}

export const CAREER_HOUSE: Record<number, HouseEntry> = {
  1: {
    arena: "self, body, first impression",
    through: "your own presence — being the instrument yourself",
  },
  2: {
    arena: "money, assets, what you own",
    through: "what you can build, hold and charge for",
  },
  3: {
    arena: "language, local networks, siblings",
    through: "writing, speaking and the people immediately around you",
  },
  4: {
    arena: "home, family, private ground",
    through: "the base you work from, and what you inherited",
  },
  5: {
    arena: "creation, play, authorship",
    through: "what you make and sign your name to",
  },
  6: {
    arena: "daily work, routine, service",
    through: "the day-to-day craft and the people you do it beside",
  },
  7: {
    arena: "partners, clients, the one-to-one",
    through: "other people — the client, the partner, the deal",
  },
  8: {
    arena: "shared resources, other people's money, power",
    through: "leverage, other people's capital and what is not on show",
  },
  9: {
    arena: "belief, study, distance",
    through: "teaching, travel and the larger frame",
  },
  10: {
    arena: "public life, career, standing",
    through: "the visible position itself",
  },
  11: {
    arena: "networks, groups, the long horizon",
    through: "who you are connected to and where it is all going",
  },
  12: {
    arena: "solitude, the unseen, the institutional back room",
    through: "work done out of sight of the people it reaches",
  },
};

/* -------------------------------------------------------------------------
 * BODIES — the function. WHAT a planet contributes to a career.
 * ---------------------------------------------------------------------- */

export interface BodyEntry {
  /** The bare function. Completes "brings …". */
  function: string;
  /** The engine, as a clause. Completes "the career runs on …". */
  runs: string;
  /** This body's career failure mode. Completes "stalls on …". */
  cost: string;
}

export const CAREER_BODY: Record<string, BodyEntry> = {
  Sun: {
    function: "identity, visibility, authorship",
    runs: "being personally the point — your name, your call, your face on it",
    cost: "waiting for recognition instead of doing what earns it",
  },
  Moon: {
    function: "instinct, care, the felt need",
    runs: "responsiveness — reading a room and meeting what it needs",
    cost: "mood deciding what should be decided by design",
  },
  Mercury: {
    function: "language, analysis, the transaction",
    runs: "explaining, writing, negotiating, moving information",
    cost: "activity mistaken for progress",
  },
  Venus: {
    function: "value, relationship, taste",
    runs: "being wanted — relationship, taste, and what it is worth",
    cost: "waiting to be chosen",
  },
  Mars: {
    function: "drive, contest, execution",
    runs: "push — going at it directly and finishing by force",
    cost: "burning the relationship the work was standing on",
  },
  Jupiter: {
    function: "expansion, opportunity, the wider frame",
    runs: "opportunity — offers, reach and scale rather than grind",
    cost: "the offer enjoyed and not taken",
  },
  Saturn: {
    function: "structure, limits, earned authority",
    runs: "time and weight — standing accumulated slowly enough to defend",
    cost: "waiting for a permission that is not coming",
  },
  Uranus: {
    function: "independence, disruption, the non-standard route",
    runs: "doing it your own way, outside the track everyone else is on",
    cost: "leaving before the thing was finished being built",
  },
  Neptune: {
    function: "imagination, calling, no fixed edge",
    runs: "a pull with no job title — image, art, service, faith",
    cost: "a plausible role taken to end the fog",
  },
  Pluto: {
    function: "power, depth, reinvention",
    runs: "control of what actually matters, rebuilt from scratch periodically",
    cost: "a finished position defended",
  },
  "North Node": {
    function: "the direction of growth",
    runs: "moving toward what is not yet comfortable",
    cost: "retreating into the competence you already have",
  },
  "South Node": {
    function: "the competence already owned",
    runs: "what you can already do without being taught",
    cost: "a career spent on the easy half of your ability",
  },
  Chiron: {
    function: "the sore place that becomes the skill",
    runs: "the thing you got wrong first and now understand better than anyone",
    cost: "teaching what you have not yet done for yourself",
  },
};

/**
 * Read a body that has no entry — an asteroid someone added, a point a future
 * calculator emits. Deliberately says nothing rather than guessing, because a
 * plausible fabricated function is worse than a visible gap.
 */
export const UNKNOWN_BODY: BodyEntry = {
  function: "an unnamed factor",
  runs: "something these tables do not answer for",
  cost: "a factor read as though it were understood",
};

export function careerBody(body: string): BodyEntry {
  return CAREER_BODY[body] ?? UNKNOWN_BODY;
}

/* -------------------------------------------------------------------------
 * FACTORS — the frame. WHICH QUESTION each part of the chart answers.
 * ---------------------------------------------------------------------- */

export type CareerFactorKind =
  | "midheaven"
  | "tenthRuler"
  | "tenthTenant"
  | "saturn"
  | "sun"
  | "sixthRuler"
  | "secondRuler"
  | "jupiter";

export type CareerTier = "highest" | "high" | "medium" | "lower" | "modifier";

/** Reading order, and the only place it is decided. */
export const CAREER_TIERS: CareerTier[] = [
  "highest",
  "high",
  "medium",
  "lower",
  "modifier",
];

export const CAREER_TIER_LABEL: Record<CareerTier, string> = {
  highest: "Highest",
  high: "High",
  medium: "Medium",
  lower: "Lower",
  modifier: "Modifier",
};

/**
 * Where a slot's words come from.
 *
 * The whole compositional mechanism is this union. A factor does not own any
 * prose — it names the fields of the three tables above that answer its
 * question, and `snapshot.ts` resolves them against a chart. A slot whose
 * source is unavailable (a house on a chart with no birth time, a body on the
 * bodiless Midheaven) is dropped rather than filled with a placeholder.
 */
export type CareerSlotSource =
  | "sign.standing"
  | "sign.mode"
  | "sign.via"
  | "sign.cost"
  | "body.function"
  | "body.runs"
  | "body.cost"
  | "house.arena"
  | "house.through";

export interface CareerSlot {
  /** The bullet's label. Two or three words, always the same for this factor. */
  key: string;
  from: CareerSlotSource;
}

export interface CareerFactorEntry {
  label: string;
  /** What this factor represents, in the fewest words that survive alone. */
  represents: string;
  tier: CareerTier;
  /**
   * Ordered. The first bullet is what a reader who reads nothing else gets,
   * which is why the cost slot is always last and never first — a snapshot
   * that opens on the failure mode is a horoscope with bad manners.
   */
  slots: CareerSlot[];
}

export const CAREER_FACTOR: Record<CareerFactorKind, CareerFactorEntry> = {
  midheaven: {
    label: "Midheaven",
    represents: "public direction, vocation, status",
    tier: "highest",
    slots: [
      { key: "Known for", from: "sign.standing" },
      { key: "Reads as", from: "sign.mode" },
      { key: "Recognised by", from: "sign.via" },
      { key: "Costs", from: "sign.cost" },
    ],
  },
  tenthRuler: {
    label: "Ruler of the 10th",
    represents: "how the career actually operates",
    tier: "highest",
    slots: [
      { key: "Runs on", from: "body.runs" },
      { key: "Operating style", from: "sign.mode" },
      { key: "Plays out through", from: "house.through" },
      { key: "Stalls on", from: "body.cost" },
    ],
  },
  tenthTenant: {
    label: "In the 10th",
    represents: "machinery already installed in the career",
    tier: "high",
    slots: [
      { key: "Brings", from: "body.function" },
      { key: "Expressed as", from: "sign.mode" },
      { key: "Stalls on", from: "body.cost" },
    ],
  },
  saturn: {
    label: "Saturn",
    represents: "responsibility, authority, professional structure",
    tier: "high",
    slots: [
      { key: "Responsibility lands in", from: "house.arena" },
      { key: "Authority built by", from: "sign.via" },
      { key: "Slows on", from: "sign.cost" },
    ],
  },
  sun: {
    label: "Sun",
    represents: "visibility, identity, recognition",
    tier: "medium",
    slots: [
      { key: "Visible in", from: "house.arena" },
      { key: "Wants to be seen as", from: "sign.standing" },
      { key: "Dims on", from: "sign.cost" },
    ],
  },
  sixthRuler: {
    label: "Ruler of the 6th",
    represents: "work, labour, daily professional life",
    tier: "medium",
    slots: [
      { key: "Daily work runs on", from: "body.runs" },
      { key: "Working conditions", from: "house.arena" },
      { key: "Work style", from: "sign.mode" },
    ],
  },
  secondRuler: {
    label: "Ruler of the 2nd",
    represents: "earnings and resources",
    tier: "lower",
    slots: [
      { key: "Earnings come through", from: "house.through" },
      { key: "Paid for", from: "body.function" },
    ],
  },
  jupiter: {
    label: "Jupiter",
    represents: "expansion and opportunity",
    tier: "modifier",
    slots: [
      { key: "Opportunity arrives via", from: "house.through" },
      { key: "Grows by", from: "sign.via" },
      { key: "Overextends on", from: "sign.cost" },
    ],
  },
};

/* -------------------------------------------------------------------------
 * EMPHASIS — what is true of the CONFIGURATION rather than of one factor.
 * ---------------------------------------------------------------------- */

export type CareerEmphasisKey =
  | "rulerInTenth"
  | "rulerAngular"
  | "rulerRetrograde"
  | "rulerIsSaturn"
  | "rulerIsJupiter"
  | "sunInTenth"
  | "saturnInTenth"
  | "jupiterInTenth"
  | "emptyTenth"
  | "doubledRole";

/**
 * The words only. `snapshot.ts` owns every predicate that fires one.
 *
 * These are the findings a factor list cannot produce, because each is a
 * relation BETWEEN factors — a body holding two offices, a ruler standing in
 * the house it rules. They are the part of a natal reading an astrologer
 * notices first and a table never shows.
 *
 * `emptyTenth` is here for the opposite reason: it is the most common
 * misreading in the whole subject. An empty tenth house looks like an absence
 * and is not one, and a snapshot that silently prints nothing where the
 * machinery would go has confirmed the misreading by omission.
 */
export const CAREER_EMPHASIS: Record<CareerEmphasisKey, { key: string; value: string }> = {
  rulerInTenth: {
    key: "Ruler in its own house",
    value: "the career is self-contained — one function carries it, with little outside itself to lean on",
  },
  rulerAngular: {
    key: "Ruler on an angle",
    value: "the vocational engine sits where it shows — this career is not a private one",
  },
  rulerRetrograde: {
    key: "Ruler retrograde",
    value: "the function matures late and inward — early external versions of it tend not to hold",
  },
  rulerIsSaturn: {
    key: "Saturn rules the career",
    value: "structure and vocation are the same function — slow, defensible, and rarely early",
  },
  rulerIsJupiter: {
    key: "Jupiter rules the career",
    value: "opportunity is the machinery rather than a bonus — the career moves in offers, not increments",
  },
  sunInTenth: {
    key: "Sun in the 10th",
    value: "identity and public role are one thing — the work is not separable from the person",
  },
  saturnInTenth: {
    key: "Saturn in the 10th",
    value: "authority is the job itself, not a support to it — and it arrives on Saturn's schedule",
  },
  jupiterInTenth: {
    key: "Jupiter in the 10th",
    value: "the public position enlarges easily — the constraint is rarely opportunity",
  },
  emptyTenth: {
    key: "Nothing in the 10th",
    value: "not an absence of career — an empty house is ordinary, and the cusp sign and its ruler carry the reading in full",
  },
  doubledRole: {
    key: "One body, two offices",
    value: "the same function answers for more than one part of the working life — weight concentrated rather than spread",
  },
};

/** The sentence a snapshot is qualified by, in the register the page uses. */
export const CAREER_SNAPSHOT_CAVEAT =
  "The natal chart describes the STRUCTURE of a working life — what the career is built out of and how it operates. It does not name a job, predict a level, or say whether any of it goes well. Two people with the same Midheaven do different work for the same reasons.";
