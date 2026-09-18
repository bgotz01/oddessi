/**
 * lib/love/natal.ts
 *
 * WHAT THE NATAL RELATIONSHIP PARTS MEAN. Its counterpart, `profile.ts`,
 * decides WHICH PARTS THIS CHART HAS and assembles them.
 *
 * The same division Career draws between `natal.ts` and `snapshot.ts`, and the
 * same reason: the meanings are a fixed vocabulary and the assembly is a
 * function of one chart, so keeping them apart is what lets a new arena be a
 * few entries rather than a rewrite.
 *
 * COMPOSITIONAL, NEVER ENUMERATED
 * Five arenas across twelve signs, twelve houses and ten bodies is a hundred
 * thousand written readings if they are written. There are thirty-four entries
 * below. An arena is a list of SLOTS, each naming a field on one of the three
 * tables and a role in the chart to resolve it against; a reading is those
 * fields read off this chart's own placements. Adding the 11th-house ruler
 * tomorrow is one line, not twelve hundred.
 *
 * FRAGMENTS, NOT SENTENCES
 * Every string here completes a printed label — "Drawn to …", "Costs …" — and
 * none of them is a sentence. The moment a profile becomes prose it becomes a
 * horoscope, and this page has a chat behind it for the reader who wants the
 * paragraph. The fragments are also what makes the tables composable: a
 * sentence cannot be slotted under four different labels, and a noun phrase
 * can.
 *
 * NO GENDER, NO ORIENTATION, NO PRESUMED SHAPE
 * Nothing below says "he", "she", "husband", "wife", "marriage" or "children".
 * A chart does not carry any of that, so a reading that assumes one is adding
 * an assumption and presenting it as a finding. "Partner" throughout, and the
 * 5th is courtship and play rather than offspring — the traditional reading of
 * the 5th includes children and that belongs on a page about children.
 */

/* -------------------------------------------------------------------------
 * SIGNS — the manner. HOW a relational function operates.
 * ---------------------------------------------------------------------- */

export interface LoveSignEntry {
  /** What pulls. Completes "Drawn to …". */
  drawn: string;
  /** What it brings. Completes "Offers …". */
  offers: string;
  /** The mechanism, as a gerund clause. Completes "Relates by …". */
  relates: string;
  /** What it requires from the other person. Completes "Needs …". */
  needs: string;
  /** This sign's own relational failure mode. Completes "Costs …". */
  cost: string;
}

export const LOVE_SIGN: Record<string, LoveSignEntry> = {
  Aries: {
    drawn: "directness, heat, someone who moves first",
    offers: "appetite, nerve, a decision made quickly",
    relates: "pursuing, and saying so before it is safe to",
    needs: "someone who will not be managed or waited for",
    cost: "the chase mattering more than what is caught",
  },
  Taurus: {
    drawn: "steadiness, physical ease, someone who stays put",
    offers: "constancy, comfort, a presence that does not flicker",
    relates: "showing up in the same way for a long time",
    needs: "reliability, and touch that is not rationed",
    cost: "staying long past the point of wanting to",
  },
  Gemini: {
    drawn: "quickness, talk, someone who is interesting to think near",
    offers: "curiosity, lightness, a mind that keeps moving",
    relates: "talking — constantly, and about everything",
    needs: "conversation that does not run out, and room to move",
    cost: "keeping it light so it never has to be decided",
  },
  Cancer: {
    drawn: "warmth, safety, someone who can be let in",
    offers: "care, memory, a place to come back to",
    relates: "looking after, and remembering what mattered",
    needs: "to be needed, and not to be startled",
    cost: "holding on well past the point of being held",
  },
  Leo: {
    drawn: "presence, generosity, someone worth being seen with",
    offers: "warmth, loyalty, attention that is not divided",
    relates: "giving generously and expecting to be delighted in",
    needs: "to be chosen visibly rather than merely kept",
    cost: "withdrawing the warmth the moment it is not returned",
  },
  Virgo: {
    drawn: "competence, care taken, someone who does things properly",
    offers: "attention, usefulness, the small things done without asking",
    relates: "noticing what is needed and quietly doing it",
    needs: "to be useful, and not to be found wanting",
    cost: "improving a person who wanted to be liked",
  },
  Libra: {
    drawn: "grace, fairness, someone who makes the room easier",
    offers: "attentiveness, diplomacy, a genuine interest in the other side",
    relates: "meeting halfway, often before being asked to",
    needs: "harmony, and a partner rather than an audience",
    cost: "agreeing so long that nobody knows what you wanted",
  },
  Scorpio: {
    drawn: "intensity, privacy, someone with something held back",
    offers: "depth, loyalty, a refusal to be shocked",
    relates: "going all the way in, or not going in at all",
    needs: "the truth, and nothing kept in reserve",
    cost: "testing what was already given",
  },
  Sagittarius: {
    drawn: "freedom, conviction, someone going somewhere",
    offers: "optimism, honesty, appetite for what is next",
    relates: "going places together and telling the truth bluntly",
    needs: "room, and a partner who is also a companion",
    cost: "leaving before it can become ordinary",
  },
  Capricorn: {
    drawn: "substance, seriousness, someone building something",
    offers: "reliability, patience, a commitment that is meant",
    relates: "showing up, providing, and proving it over years",
    needs: "to be taken seriously, and for the thing to be real",
    cost: "duty outliving the affection underneath it",
  },
  Aquarius: {
    drawn: "originality, independence, someone hard to categorise",
    offers: "acceptance, loyalty, room to be strange",
    relates: "being friends first and never quite conventionally",
    needs: "freedom, and not to be absorbed",
    cost: "standing far enough back to stay unreachable",
  },
  Pisces: {
    drawn: "tenderness, imagination, someone who feels things",
    offers: "compassion, devotion, a willingness to meet you where you are",
    relates: "merging, and giving more than was asked",
    needs: "gentleness, and somewhere for the feeling to go",
    cost: "loving the version of them you assembled",
  },
};

/* -------------------------------------------------------------------------
 * BODIES — the function. WHAT a planet wants when it answers for a house.
 * ---------------------------------------------------------------------- */

export interface LoveBodyEntry {
  /** Completes "Runs on …". */
  wants: string;
  /** What it contributes to something lasting. Completes "Holds through …". */
  gives: string;
  /** Completes "Stalls on …". */
  cost: string;
}

export const LOVE_BODY: Record<string, LoveBodyEntry> = {
  Sun: {
    wants: "being known as yourself rather than as half of something",
    gives: "a centre that does not move when the relationship is tested",
    cost: "needing the relationship to confirm who you are",
  },
  Moon: {
    wants: "safety, familiarity, the daily texture of being close",
    gives: "the habit of tending, which outlasts most feeling",
    cost: "reading a mood as a verdict",
  },
  Mercury: {
    wants: "to be understood in words, and to keep talking",
    gives: "the ability to repair by discussing it",
    cost: "explaining a feeling instead of having it",
  },
  Venus: {
    wants: "pleasure, beauty, ease, and to be delighted in",
    gives: "genuine enjoyment of the other person",
    cost: "avoiding the ugly conversation to keep things pleasant",
  },
  Mars: {
    wants: "wanting and being wanted, plainly",
    gives: "the willingness to fight for it rather than drift",
    cost: "heat that arrives as friction when it has nowhere else to go",
  },
  Jupiter: {
    wants: "expansion — somewhere further to go together",
    gives: "generosity, and a long view of what this could be",
    cost: "promising more than is delivered",
  },
  Saturn: {
    wants: "something real, defined, and survivable",
    gives: "the structure a relationship can actually be built on",
    cost: "waiting for certainty that never quite arrives",
  },
  Uranus: {
    wants: "freedom inside it, and no prescribed shape",
    gives: "permission to be odd without being corrected",
    cost: "leaving to prove it was never a cage",
  },
  Neptune: {
    wants: "devotion, and the dissolving of the distance",
    gives: "compassion that survives seeing the whole person",
    cost: "an image held in place of the person",
  },
  Pluto: {
    wants: "total involvement, or nothing worth the name",
    gives: "the capacity to go through something and remain",
    cost: "control mistaken for closeness",
  },
};

/* -------------------------------------------------------------------------
 * HOUSES — the arena. WHERE a relational function plays out.
 * ---------------------------------------------------------------------- */

export interface LoveHouseEntry {
  /** Completes "Plays out through …". */
  through: string;
  /** Completes "Meets people through …". */
  meets: string;
}

export const LOVE_HOUSE: Record<number, LoveHouseEntry> = {
  1: {
    through: "how you come across — the relationship shows on you first",
    meets: "being visible, and being approached",
  },
  2: {
    through: "what is built and held in common — money, comfort, the material",
    meets: "steady proximity, and shared appetites",
  },
  3: {
    through: "talk, siblings, neighbours, the daily traffic of a life",
    meets: "conversation, the local, the person already nearby",
  },
  4: {
    through: "home, family, the private life behind the door",
    meets: "home, family, and whoever is already inside the circle",
  },
  5: {
    through: "play, courtship, making things, the enjoyable part",
    meets: "what you do for pleasure — the game, the stage, the studio",
  },
  6: {
    through: "the daily routine, the work, the practical care of each other",
    meets: "work, colleagues, and the ordinary weekday",
  },
  7: {
    through: "the partnership itself — one-to-one, and on the record",
    meets: "introductions, formal settings, being matched by others",
  },
  8: {
    through: "what is merged — money, secrets, the parts not shown to others",
    meets: "intensity, crisis, and circumstances that skip the small talk",
  },
  9: {
    through: "travel, belief, study — the search for a larger frame",
    meets: "abroad, at university, through what you believe",
  },
  10: {
    through: "the public life — standing, reputation, what is seen",
    meets: "work, ambition, and the room where the career happens",
  },
  11: {
    through: "friendship, the group, the shared cause",
    meets: "friends, networks, and whatever you belong to",
  },
  12: {
    through: "the private, the unspoken, what is only known in solitude",
    meets: "quietly, obliquely, often before it is admitted",
  },
};

/* -------------------------------------------------------------------------
 * ARENAS — which fields answer which question.
 * ---------------------------------------------------------------------- */

/**
 * A place in the chart a slot can point at.
 *
 * `descendant` and the cusps are SIGNS with no body, so only `sign.*` resolves
 * against them. The resolver returns null rather than guessing, and a slot
 * that cannot resolve is dropped instead of printing an empty row.
 */
export type LoveRole =
  | "venus"
  | "mars"
  | "moon"
  | "saturn"
  | "descendant"
  | "fifthCusp"
  | "eighthCusp"
  | "fifthRuler"
  | "seventhRuler"
  | "eighthRuler";

export const LOVE_ROLE_LABEL: Record<LoveRole, string> = {
  venus: "Venus",
  mars: "Mars",
  moon: "Moon",
  saturn: "Saturn",
  descendant: "Descendant",
  fifthCusp: "5th cusp",
  eighthCusp: "8th cusp",
  fifthRuler: "Ruler of the 5th",
  seventhRuler: "Ruler of the 7th",
  eighthRuler: "Ruler of the 8th",
};

export type LoveSlotSource =
  | `${LoveRole}.sign.${keyof LoveSignEntry}`
  | `${LoveRole}.body.${keyof LoveBodyEntry}`
  | `${LoveRole}.house.${keyof LoveHouseEntry}`;

export interface LoveSlot {
  /** The bullet's label. Two or three words, always the same for this arena. */
  key: string;
  from: LoveSlotSource;
}

export interface LoveArenaEntry {
  /**
   * Ordered, and the order is the reading.
   *
   * The first bullet is what a reader who reads nothing else gets, which is
   * why `cost` is always last. A profile that opens on the failure mode is a
   * horoscope with bad manners.
   */
  slots: LoveSlot[];
}

export const LOVE_ARENA: Record<string, LoveArenaEntry> = {
  attraction: {
    slots: [
      { key: "Drawn to", from: "venus.sign.drawn" },
      { key: "Offers", from: "venus.sign.offers" },
      { key: "Plays out through", from: "venus.house.through" },
      { key: "Meets people through", from: "venus.house.meets" },
      { key: "Costs", from: "venus.sign.cost" },
    ],
  },
  romance: {
    slots: [
      { key: "Courtship reads as", from: "fifthCusp.sign.relates" },
      { key: "Wants", from: "mars.sign.drawn" },
      { key: "Runs on", from: "fifthRuler.body.wants" },
      { key: "Plays out through", from: "fifthRuler.house.through" },
      { key: "Costs", from: "fifthCusp.sign.cost" },
    ],
  },
  partnership: {
    slots: [
      { key: "Seeks", from: "descendant.sign.drawn" },
      { key: "Needs", from: "descendant.sign.needs" },
      { key: "Runs on", from: "seventhRuler.body.wants" },
      { key: "Plays out through", from: "seventhRuler.house.through" },
      { key: "Costs", from: "descendant.sign.cost" },
    ],
  },
  intimacy: {
    slots: [
      { key: "Bonds by", from: "moon.sign.relates" },
      { key: "Needs", from: "moon.sign.needs" },
      { key: "Opens through", from: "moon.house.through" },
      { key: "Exposure runs on", from: "eighthRuler.body.wants" },
      { key: "Costs", from: "moon.sign.cost" },
    ],
  },
  commitment: {
    slots: [
      { key: "Commits given", from: "saturn.sign.needs" },
      { key: "Tested by", from: "saturn.sign.cost" },
      { key: "Held through", from: "saturn.house.through" },
      { key: "Lasts on", from: "seventhRuler.body.gives" },
    ],
  },
};

/**
 * What the profile cannot claim, printed on the page rather than assumed.
 *
 * The natal half of this page describes a disposition and is routinely read as
 * a prediction about a relationship. It is not one, and the difference is not
 * a nuance: a chart can say what someone is drawn to and has no way of knowing
 * who they met.
 */
export const LOVE_PROFILE_CAVEAT =
  "This describes a disposition, not a history and not a forecast. It is read from the birth chart alone — no transit is in it and no date is attached — so it says what someone tends to want and offer, never who they met, whether it worked, or whether it will.";
