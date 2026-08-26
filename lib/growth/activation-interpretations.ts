/**
 * lib/growth/activation-interpretations.ts
 *
 * WHAT THINGS MEAN. Its counterpart, `activation-reading.ts`, decides HOW
 * THOSE MEANINGS COMBINE for a particular window.
 *
 * That division is the point of the file existing. Nothing here computes
 * anything, imports a component, or knows what a chart is; and nothing in the
 * composer chooses a word. A reading that comes out wrong is wrong in one of
 * those two places, and which one tells you whether the fix is a sentence or a
 * rule.
 *
 * The tables are COMPOSITIONAL, never enumerated against each other. Five
 * processes and four orientations are twenty readings — "Transformation ·
 * Pull Forward", "Commitment · Past Returns" — out of nine entries, and the
 * moment a sixth body or a fifth orientation appears that is one new entry
 * rather than sixty. Writing the twenty out would produce better individual
 * sentences and a model that had quietly stopped deriving anything, which is
 * the trade this project keeps refusing.
 *
 * Two dimensions, deliberately independent:
 *
 *   PROCESS      what kind of change is happening — from the transiting body
 *   ORIENTATION  which end of the trajectory it is happening to
 *
 * Everything a reader sees is a pair of those plus the chart's own nouns. Add
 * a dimension by adding a table, never by multiplying an existing one.
 */

/**
 * What each planet DOES to a trajectory, named in ordinary English.
 *
 * `mode` is user-facing and has to survive being read by someone who does not
 * know what a transit is. That rules out the astrological register entirely —
 * "Dissolution" is precise and nobody says it — and it rules out borrowing an
 * evocative everyday word for a technical meaning, which is worse: a reader
 * who sees "Crossroads" thinks a fork in their life, not a square to the nodal
 * axis, and quietly redefining their word costs their trust when they notice.
 *
 * So the five here are process words a person already owns. The astrology that
 * produced them lives in the tooltip and the drawer, where it is evidence
 * rather than vocabulary.
 *
 * Not a ranking, and the distinction matters more here than anywhere else on
 * the page. Pluto is not "more" than Saturn — it is a different verb, and the
 * difference is the entire reading: Pluto conjunct the North Node is not a
 * stronger Saturn conjunct the North Node, it is transformation where the
 * other is commitment. Ordering these by weight, which is the conventional
 * move, throws away the only interesting thing about them and replaces it with
 * a number nobody can justify.
 */
export interface ProcessEntry {
  /** The abstract noun — Commitment, Breakthrough. Half of a period's name. */
  label: string;
  /**
   * The verb, for a lane label: "Saturn · Commit".
   *
   * A planet name is not a unit of meaning to anyone who has not studied this.
   * A row reading "Saturn" is asking the reader to remember something; a row
   * reading "Saturn · Commit" is telling them what the row is for while they
   * look at it, and the glyph and the name survive beside it for the reader
   * who does know.
   *
   * Imperative rather than the abstract noun above, because the noun names a
   * process and the verb names what the process is DOING to this trajectory,
   * which is the question a lane on a timeline raises.
   */
  role: string;
  /** Three or four words under the verb. What that verb does, no chart nouns. */
  shortGloss: string;
  /** What it does, as a paragraph. */
  gloss: string;
  /** "A break", "A stripping". The subject of a composed title. */
  noun: string;
  /** Third-person verb phrase: what it does TO whatever it touches. */
  verb: string;
  /** "by …" — the mechanism, as a clause completing "it acts …". */
  how: string;
  /** What this planet makes possible. Completes "the opening is to …". */
  opening: string;
  /** This planet's own failure mode. A complete sentence. */
  trap: string;
  /**
   * What it does to whatever it acts on, as a clause.
   *
   * Completes "in these areas, the period …". Distinct from `how`, which
   * explains a mechanism to someone asking why; this names the kind of change
   * inside a sentence about a life.
   */
  pressure: string;
}

export const PROCESS: Record<string, ProcessEntry> = {
  Jupiter: {
    label: "Opening",
    role: "Expand",
    shortGloss: "widens the options",
    gloss:
      "opens, enlarges and offers. The axis becomes possible rather than compulsory — which is why Jupiter alone rarely turns anything: nothing is being forced.",
    noun: "An opening",
    verb: "enlarges",
    how: "widening the range of what is available until the current arrangement looks smaller than it did",
    opening: "take the wider option while it is actually on offer",
    trap: "Nothing is forced, so nothing has to change — the opportunity is admired, discussed, and allowed to pass while everything stays exactly as it was.",
    pressure:
      "opens more room for the trajectory to express itself",
  },
  Saturn: {
    label: "Commitment",
    role: "Commit",
    shortGloss: "tests, makes real",
    gloss:
      "demands form, consequence and time. The trajectory stops being something you understand and becomes something you are answerable for.",
    noun: "A test",
    verb: "tests and hardens",
    how: "imposing limits, consequence and time until something has to take durable form",
    opening: "give the direction a structure that survives contact with reality",
    trap: "Difficulty gets read as a verdict. The friction is taken as proof that the new direction was a mistake, and the retreat to what you are already good at feels like maturity rather than avoidance.",
    pressure:
      "forces the trajectory into concrete commitments and limits",
  },
  Uranus: {
    label: "Breakthrough",
    role: "Break free",
    shortGloss: "breaks continuity",
    gloss:
      "ruptures and frees. The trajectory moves by discontinuity rather than by degrees — arriving as a break with what came before, often from outside.",
    noun: "A break",
    verb: "breaks the continuity of",
    how: "making the existing arrangement suddenly difficult to preserve, usually from outside and usually without warning",
    opening: "let the disruption expose a life you would not have planned deliberately",
    trap: "The circumstances change radically while the underlying pattern is rebuilt intact somewhere else — a new setting, the same arrangement.",
    pressure:
      "breaks continuity with an established pattern",
  },
  Neptune: {
    label: "Release",
    role: "Dissolve",
    shortGloss: "loosens definitions",
    gloss:
      "dissolves the old orientation. The trajectory moves by surrender and loss of outline; what goes is usually the certainty, not the direction.",
    noun: "A dissolving",
    verb: "dissolves the outline of",
    how: "removing the certainty that held the old arrangement in place, so that its edges stop being obvious",
    opening: "let go of a definition you were holding without needing a replacement ready",
    trap: "The loss of outline is treated as a reason to decide nothing at all, and the period is spent waiting for a clarity that this transit does not supply.",
    pressure:
      "weakens the boundaries around the existing direction",
  },
  Pluto: {
    label: "Transformation",
    role: "Transform",
    shortGloss: "strips down, rebuilds",
    gloss:
      "restructures irreversibly. The trajectory moves through power, ending and rebuilding, and does not restore what it takes.",
    noun: "A stripping",
    verb: "strips down and rebuilds",
    how: "intensifying it past the point where it can be kept as it was, and not restoring what it takes",
    opening: "let something end completely rather than managing its decline",
    trap: "The intensity is met with control. Power is defended, the process is fought to a standstill, and what would have transformed is instead endured.",
    pressure:
      "removes structures that can no longer carry the trajectory",
  },
};

/** Anything outside the five slow planets, which the cache does not track. */
export const UNKNOWN_PROCESS: ProcessEntry = {
  label: "Activation",
  role: "Act",
  shortGloss: "not characterised",
  gloss: "moves the trajectory.",
  noun: "A pressure",
  verb: "bears on",
  how: "acting on it in a way this model does not characterise",
  opening: "notice what is being asked",
  trap: "The period passes without the question being put.",
  pressure: "acts on the trajectory in a way this model does not characterise",
};

/**
 * The five processes, keyed by planet, with a safe answer for anything else.
 *
 * Every consumer wants the same fallback, and the two that reached for
 * `PROCESS[planet]` directly both had to remember it. One function, so a body
 * the cache does not track degrades to "Activation" everywhere at once instead
 * of throwing in whichever component forgot.
 */
export function processOf(planet: string): ProcessEntry {
  return PROCESS[planet] ?? UNKNOWN_PROCESS;
}

export type Geometry = "pull-forward" | "past-returns" | "crossroads";

/**
 * The three ways a transit can strike the axis, and what each one means.
 *
 * The nodes are a single axis, so the aspect decides which END is hit — and
 * that reverses the reading completely. An opposition to the North Node IS a
 * conjunction to the South Node. Reporting it as "an aspect to your North
 * Node" would be technically true and mean the opposite of what is happening,
 * which is why the geometry is resolved into a movement here rather than being
 * left as an aspect name for the UI to print.
 */
export const GEOMETRY: Record<
  Geometry,
  { label: string; place: string; movement: string }
> = {
  "pull-forward": {
    label: "Pull forward",
    place: "the destination",
    movement:
      "Something pushes you directly into the emerging side of the trajectory. The direction stops being a plan and starts being a circumstance.",
  },
  "past-returns": {
    label: "Past returns",
    place: "the ground you came from",
    movement:
      "Old competence, old people, old places and unfinished business become unusually consequential. This is not regression — the South Node is the material being converted, and here it is handed back to you in quantity.",
  },
  crossroads: {
    label: "Crossroads",
    place: "the whole axis",
    movement:
      "Neither staying with the old competence nor simply moving toward the new direction resolves what is in front of you. The axis itself has to be reconfigured rather than travelled.",
  },
};

/**
 * Which end of the axis an aspect to the North Node actually lands on.
 *
 * Square is the fallback rather than a fourth case: the cache computes only
 * conjunction, opposition and square, and of those the square is the one that
 * sits across both ends, so an unrecognised aspect defaulting to "crossroads"
 * fails in the direction that claims least.
 */
export function geometryOf(aspect: string | undefined): Geometry {
  if (aspect === "Conjunction") return "pull-forward";
  if (aspect === "Opposition") return "past-returns";
  return "crossroads";
}

export function geometryLabel(g: Geometry): string {
  return GEOMETRY[g].label;
}

/**
 * Which way a pressure points the trajectory.
 *
 * The one field that connects this page back to the Growth reading. Without it
 * the page degenerates into astrology mechanics — a display of which planet is
 * touching which point — and the reader has to do the translation into "so
 * which way am I being pushed" themselves, every time.
 *
 * It is a coarser question than `Geometry` on purpose, because it has to be
 * answerable for STRUCTURAL activations too. A transit through the North
 * Node's house and a conjunction to the North Node itself are wildly different
 * strengths of evidence and point the same way, and orientation is the level
 * at which that sameness is true.
 */
export type Orientation = "forward" | "return" | "crossroads" | "mixed";

/**
 * The frame an orientation puts around a pressure.
 *
 * Four entries, and they multiply with the five planets rather than being
 * enumerated against them. Writing out all twenty — Uranus-forward,
 * Uranus-return, Saturn-forward — would produce better individual sentences
 * and a model that had stopped deriving anything, and the twenty would become
 * sixty the moment a sixth body or a fourth orientation appeared. Each half is
 * written to stand on its own so the join reads as prose rather than as a
 * template.
 *
 * `move` is the centre of the whole interpretation layer. It is the nodal
 * model in one imperative: do not solve the new problem with the old
 * competence — and what "new" and "old" mean comes from the chart, not here.
 */
export interface OrientationEntry {
  /** "Pull Forward". Half of a period's name. */
  label: string;
  /**
   * One word — "Forward", "Return", "Crossroads".
   *
   * The vocabulary the whole Growth section should be teaching, and the reason
   * it is separate from `label`: "Pull Forward" is the name of a period and
   * reads as one, but a legend, a lane and a heading need a word rather than a
   * title. Three words a reader can hold in their head are worth more than any
   * amount of correct astrology they have to decode first.
   */
  short: string;
  /** "New territory". The kind of ground the period puts a person on. */
  territory: string;
  /**
   * The same thing said to someone who knows no astrology at all.
   *
   * No nodes, no chart nouns, no "axis" — this is the sentence that has to
   * work before anything else on the page is legible, and every technical term
   * in it is one more thing standing between a reader and their own life.
   */
  plain: string;
  /** How the period tends to behave, following `plain`. Never an event. */
  experience: string;
  /**
   * The developmental question the period puts, in the second person.
   *
   * The most valuable line on the page and the hardest to keep honest. It is
   * not a prediction and not advice: it is the question this configuration
   * makes it possible to answer, and the reason it belongs to the ORIENTATION
   * rather than to the planet is that the planet says how the pressure arrives
   * while the orientation says what it is pressing on. A question composed per
   * planet as well would be twenty questions maintained by hand and no better
   * than four asked precisely.
   */
  question: string;
  /** What that means, in one clause. */
  gloss: string;
  /** Completes a title: "A break …". */
  titleTail: string;
  /** What is being activated, as a standalone statement. */
  activated: string;
  /**
   * The same thing as a noun phrase, for embedding mid-sentence.
   *
   * `activated` is written to stand alone and does not survive being lowercased
   * into an object slot — "Neptune activates both ends at once — a pressure
   * that answers to neither pole on its own by removing the certainty…" is
   * what that produced. Two forms, because a sentence and a phrase are
   * genuinely different things and deriving one from the other by string
   * surgery never works.
   *
   * Kept to a bare noun phrase with no apposition. A first attempt carried the
   * gloss along — "the destination, the direction still being built" — and the
   * "by …" clause that follows in the thesis then attached itself to the gloss
   * instead of the verb: the direction still being built BY imposing limits.
   * The elaboration lives in `activated`, which has room for it.
   */
  object: string;
  /** The growth move. Imperative. The page's centrepiece. */
  move: string;
  /** How this orientation frames what the period makes possible. */
  opening: string;
  /** The nodal trap, in this orientation. */
  trap: string;
}

export const ORIENTATION: Record<Orientation, OrientationEntry> = {
  forward: {
    label: "Pull Forward",
    short: "Forward",
    territory: "New territory",
    plain:
      "Life pulls you toward qualities, roles or experiences you are still learning to inhabit.",
    experience:
      "The work is to practise the unfamiliar thing badly for a while, rather than to admire it from inside what you are already good at.",
    question:
      "Where are you being asked to tolerate being a beginner?",
    gloss:
      "life is pulling you toward the direction you are growing into",
    titleTail: "toward the emerging path",
    activated:
      "The North Node side of the trajectory — the direction still being built.",
    object: "the destination",
    move: "Practise the emerging capacity, in the arena the period hands you. The point is not to admire the new direction but to be inexpert in it on purpose.",
    opening:
      "Circumstances are doing some of the work of moving you, which is rare — the direction stops being a plan and becomes a situation you are already in.",
    trap: "The new problem gets solved with the old competence. It works, because the old competence is real, and the trajectory ends the period exactly where it started.",
  },
  return: {
    label: "Past Returns",
    short: "Return",
    territory: "Old territory",
    plain:
      "Familiar patterns, people or circumstances come back round and ask to be reconsidered.",
    experience:
      "What comes back is material rather than a destination — being wanted for it again is real, and it is not the same thing as a direction.",
    question:
      "What old pattern is asking to be understood differently rather than repeated?",
    gloss:
      "something from your established way of being becomes relevant again",
    titleTail: "of the ground you came from",
    activated:
      "The South Node side — the competence already built, arriving back in quantity.",
    object: "the ground you came from",
    move: "Recover and repurpose what you already know, without rebuilding your life around it. The old skill is feedstock for the new direction, not a destination to move back into.",
    opening:
      "The material being converted is right in front of you, in usable quantity. This is the easiest period in which to see plainly what you are actually good at.",
    trap: "Being wanted for the old competence is mistaken for evidence that it is the right direction. The reward is real; the direction is backwards.",
  },
  crossroads: {
    label: "Pressure to Change",
    short: "Crossroads",
    territory: "Internal conflict",
    plain:
      "The familiar path and the emerging one pull against each other, and neither settles it alone.",
    experience:
      "This tends to feel less like a clear new beginning than like having to choose what you are willing to leave behind.",
    question:
      "What are you continuing because it is genuinely right for you, and what are you continuing because it is familiar?",
    gloss:
      "your existing way of navigating the growth tension is being challenged",
    titleTail: "across the whole axis",
    activated:
      "Both ends at once — a pressure that answers to neither pole on its own.",
    object: "both ends of the axis at once",
    move: "Stop treating either pole in its existing form as a complete answer. What is being asked for is not on the axis as currently drawn; the question is what a third option would have to contain.",
    opening:
      "The binary you have been working inside is visibly failing, which is the only condition under which it can be redrawn rather than merely swapped.",
    trap: "The period is spent oscillating — advancing, retreating, advancing — and the oscillation is mistaken for progress because both poles keep being visited.",
  },
  mixed: {
    label: "Pulled Both Ways",
    short: "Both ways",
    territory: "Two pressures at once",
    plain:
      "Both the familiar path and the emerging one are under pressure, from different directions and at the same time.",
    experience:
      "The two pressures answer to different things, and averaged into one cautious middle they produce motion without direction.",
    question:
      "Which of these two pressures is actually yours to answer first?",
    gloss:
      "both ends are under pressure, from different directions at once",
    titleTail: "on both ends of the axis",
    activated:
      "Both poles, from different directions and by different means.",
    object: "both poles at once",
    move: "Read the two pressures separately before acting on either. They are not one message and treating them as one produces a compromise that serves neither.",
    opening:
      "Both halves of the conversion are visible at the same time, which is when the relationship between them is easiest to see.",
    trap: "The two pressures are averaged into a single cautious middle, and the period produces motion without direction.",
  },
};

export function orientationFrame(o: Orientation): OrientationEntry {
  return ORIENTATION[o];
}

export function orientationLabel(o: Orientation): string {
  return ORIENTATION[o].label;
}

export function orientationGloss(o: Orientation): string {
  return ORIENTATION[o].gloss;
}

export function orientationShort(o: Orientation): string {
  return ORIENTATION[o].short;
}

/**
 * The three ways growth actually appears, in the order they are taught.
 *
 * `mixed` is deliberately absent. It is a tie-breaker the composer falls back
 * to when a season's pressures genuinely disagree — a statement about the
 * evidence rather than a fourth kind of movement — and putting it in a list
 * headed "three ways growth appears" would teach a reader a category that
 * describes nothing they could recognise in their own life.
 */
export const PRIMARY_ORIENTATIONS: Orientation[] = [
  "forward",
  "return",
  "crossroads",
];

/** An address's side, read as a direction of travel. */
export function orientationOfSide(
  side: "arriving" | "departing" | "both",
): Orientation {
  return side === "arriving"
    ? "forward"
    : side === "departing"
      ? "return"
      : "crossroads";
}

/**
 * The orientation of a whole season.
 *
 * Three rules, applied in order.
 *
 * DIRECT HITS DECIDE ALONE when there are any. A transit on the node degree
 * outranks a transit through a nodal house so completely that letting the
 * house vote would be letting the weakest evidence outnumber the strongest.
 *
 * A CROSSROADS PRESENT WINS. That is a claim rather than a convenience: a
 * square sits across BOTH ends by definition, so a season holding one is
 * already a season in which neither pole resolves, and something else also
 * pulling forward does not undo it.
 *
 * OTHERWISE THE MAJORITY, and `mixed` only on a real tie. Requiring unanimity
 * — which is what this did at first — made half of all seasons read "mixed",
 * because a slow planet working the North Node's house while another works the
 * South Node's ruler is the ordinary condition of a chart rather than a
 * finding. A label that lands on half the windows tells the reader nothing,
 * and worse, it hid the seasons that genuinely do point both ways at once.
 */
export function orientationOf(
  pool: { direct: boolean; orientation: Orientation }[],
): Orientation {
  const direct = pool.filter((p) => p.direct);
  const voting = direct.length ? direct : pool;
  if (voting.length === 0) return "mixed";

  const votes = new Map<Orientation, number>();
  for (const v of voting) {
    votes.set(v.orientation, (votes.get(v.orientation) ?? 0) + 1);
  }
  if (votes.size === 1) return [...votes.keys()][0];
  if (votes.has("crossroads")) return "crossroads";

  const ranked = [...votes.entries()].sort((a, b) => b[1] - a[1]);
  return ranked[0][1] === ranked[1][1] ? "mixed" : ranked[0][0];
}
