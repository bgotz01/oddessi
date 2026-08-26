/**
 * lib/growth/activation-reading.ts
 *
 * What a period is asking of the trajectory.
 *
 * Everything before this answers WHEN. A window says four pressures converge
 * at 45–47 and one of them lands on the axis; all of it true, none of it an
 * answer to the only question a reader actually arrives with — what is this
 * period asking me to become, change, release or act on.
 *
 * The answer is a composition of three things the model already holds, and the
 * whole design of this file is the refusal to write that composition down:
 *
 *   TRAJECTORY  the lifelong movement — what the old competence is, what the
 *               new capacity would be, and which arenas each lives in
 *   ACTIVATION  which part of it is being touched — the destination, the
 *               ground behind, both at once, a ruler, a house
 *   MECHANISM   how the touching happens — Pluto strips, Uranus breaks,
 *               Neptune dissolves, Saturn tests, Jupiter enlarges
 *
 * Five planets by four orientations is twenty readings, and multiplying that
 * by twelve houses and twelve signs is the dictionary this project exists to
 * avoid. So nothing here is enumerated against anything else. The planet says
 * what it does, the orientation says what it does it to, the chart says what
 * those things are for this person, and the sentence is built at read time.
 * Add a sixth body and you write one entry, not sixty.
 *
 * The last two fields are the ones that make this a developmental tool rather
 * than a horoscope. OPENING is what the period makes possible. TRAP is how the
 * old strategy absorbs the event and leaves the trajectory exactly where it
 * was — which is the failure mode the whole nodal model is about, and it is
 * far more useful than calling a transit good or bad.
 *
 * What is deliberately NOT claimed: any event. The arenas say which parts of a
 * life a period is likely to become concrete through, because that is
 * derivable from the houses involved. What happens in them is not, and the
 * copy says so.
 */

import { getHouseCoreThemes, getHouseTitle, type House } from "@/lib/astrology/house-categories";
import {
  bandLabel,
  trendAt,
  type IntensityPoint,
} from "./activation-intensity";
import { gradeLabel, gradeSummary, type Grade } from "./activation-windows";
import {
  PROCESS,
  UNKNOWN_PROCESS,
  orientationFrame,
  orientationShort,
  type Orientation,
} from "./activation-interpretations";
import type { Activation } from "./activation";
import type { ActivationWindow } from "./activation-windows";
import { beatLabel, type NodalBeat } from "./timing";
import type { Trajectory } from "./types";

export interface ActivationReading {
  orientation: Orientation;
  /**
   * "Transformation · Pull Forward" — the whole period in two ordinary words.
   *
   * A process and a direction, and they are different KINDS of claim, which is
   * why they are two fields joined rather than one lookup. The process says
   * what is happening; the direction says which part of the trajectory it is
   * happening to. Neither is astrological vocabulary and neither borrows an
   * everyday word for a technical meaning.
   */
  title: string;
  /** "Transformation". What kind of process. */
  process: string;
  /** "Pull Forward". Where the pressure acts. */
  direction: string;
  /**
   * The model's own classification, demoted to a supporting line.
   *
   * "Turning point" is an interpretation, not an observation, and putting it
   * on a chart implies an event nobody can see from a chart. It is hedged to
   * "Potential turning point" and never leads.
   */
  classification: string;
  /** The astrology underneath, for the tooltip. Evidence, not vocabulary. */
  technical: string;
  /** The evocative composition — "A break toward the emerging path". */
  phrase: string;
  /** The period's claim, in a paragraph. */
  thesis: string;
  /** Which part of the trajectory is under pressure. */
  activated: string;
  /** How the pressure works — the planet's role. */
  mechanism: string;
  /** Life areas the period is likely to become concrete through. */
  arenas: string[];
  /**
   * One sentence saying what KIND of change those areas may see.
   *
   * The arenas name the places; this names the process working in them, so the
   * two do not repeat each other. It replaced a grid of eight possibilities
   * per window, which was the point at which the panel stopped being a reading
   * and started being an inventory — and eight guesses are not eight times as
   * informative as one honest description of the mechanism.
   */
  arenasSummary: string;
  /** The developmental instruction. The centrepiece. */
  growthMove: string;
  /** What the period makes possible. */
  opening: string;
  /** How the old strategy absorbs it and changes nothing. */
  trap: string;
  /** Concrete domains, from the houses involved. Never predictions. */
  eventPossibilities: string[];
  /** Present only when several independent pressures are in play. */
  convergence?: { thesis: string; tensions: string[] };
}

/**
 * How the model classifies a season, in words that do not overclaim.
 *
 * The hedge on the top grade is deliberate. A Pluto-on-the-node configuration
 * is an observation; that it will BE a turning point is a guess about a life,
 * and the difference is the whole credibility of the page.
 */
const CLASSIFICATION: Record<string, string> = {
  background: "Quiet",
  active: "Locally active",
  convergence: "High convergence",
  "turning-point": "Potential turning point",
};

export function classificationOf(grade: string): string {
  return CLASSIFICATION[grade] ?? "Activation";
}

// ─── The reading above the chart ─────────────────────────────────────────────

/**
 * What a caveat has to say every time an index is shown.
 *
 * One constant rather than a sentence per grade, because it is the same
 * disclaimer in every case and a disclaimer that varies reads as part of the
 * finding. The model measures the sky's arrangement over a chart; what a
 * person does inside that arrangement is not in the data, and no amount of
 * convergence makes it so.
 */
export const ACTIVATION_CAVEAT =
  "This does not predict an event, and it is not a verdict on whether you are on the right path. It measures how hard the growth direction is being pressed — the same reading falls on someone already living it and on someone who is not, and only your own history decides which.";

/**
 * The reading above the chart, as an instrument panel rather than as prose.
 *
 * Five values and three reasons. It was four paragraphs once, and paragraphs
 * are the wrong instrument for this job: a reader arriving at a chart of their
 * own life is scanning, not reading, and a sentence that has to be read to
 * yield "mild pressure" yields nothing at a glance. Every field below is a
 * value a reader can take in without a verb, and the prose that used to carry
 * them survives one disclosure down for whoever wants it.
 *
 * Composed here rather than in the component for the reason the whole
 * `lib/growth` split exists — a reading that comes out wrong should be wrong
 * in one place, arguable, and testable without rendering anything. The
 * component that shows this chooses no words at all.
 *
 * The five are chosen not to overlap, which took some doing because three of
 * them sound alike:
 *
 *   PRESSURE   how hard the direction is pressed  — the index, banded
 *   DIRECTION  which way it points               — Forward, Return, Crossroads
 *   TREND      where that pressure is going, and where its peak falls
 *   SEASON     what configuration it is          — Active, Convergence, …
 *   WINDOW     how long it stays relevant
 *
 * PRESSURE and DIRECTION are independent, and keeping them so is the whole
 * honesty of the panel. A 90 says a great deal is converging and NOTHING about
 * whether the person is on their path: 90 · Forward is heavy pressure toward
 * the emerging side, 90 · Return is the familiar side arriving in quantity,
 * 90 · Crossroads is both at once. The astrology cannot see that one reader
 * has spent ten years already living the forward direction and another has
 * not, so it must not claim to — the index measures pressure, never alignment,
 * and the caveat says so wherever the number appears.
 *
 * PRESSURE and SEASON are the pair most likely to be read as one scale, and
 * they are not: a dense convergence can implicate the trajectory more than a
 * narrowly-defined turning point. Two cells, two vocabularies.
 *
 * Deliberately NOT "Growth: high". The growth direction is a fixed feature of
 * the chart and is never more or less present; what varies is the timing
 * pressure on it, and a label reading "growth: low" would say something the
 * model explicitly denies.
 */
export interface ActivationCell {
  /** The value, in one or two words. What a reader takes at a glance. */
  value: string;
  /** The evidence for it, small: "57 / 100", "2026–2028". */
  note: string;
  /** 0–100, when the value has a magnitude worth drawing as a bar. */
  meter?: number;
}

export interface ActivationDriver {
  /** Planet name for a transit, or null for the shared rhythm. */
  planet: string | null;
  /** "Commitment", "Cycle checkpoint". */
  label: string;
  /**
   * The house the planet is transiting while it does this.
   *
   * The sky's own location for the event, and the reason two people with the
   * same nodal axis get different years out of the same transit. Null for the
   * shared rhythm, which is not a body and is nowhere, and for a contact at
   * the edge of the cached house transits — where it has to read as "not
   * known" rather than as "nowhere".
   */
  house: number | null;
  /** How strong the evidence is: direct, or supporting. */
  note: string;
  /** What this process does to a trajectory, in one clause. */
  gloss: string;
  /**
   * The contact itself: what it touches, by what aspect, over which years.
   *
   * Shown only when a reader opens the row. It is the most technical string on
   * the page and it belongs at the bottom of the ladder — but it has to be
   * reachable, and it has to hold still while it is read, which is exactly
   * what it could not do while it followed the cursor across the chart.
   */
  technical: string;
}

export interface ActivationNow {
  /** The season being read, so a click can open it. Null in a quiet stretch. */
  window: ActivationWindow | null;
  /** Whether that season is the one in force at this age. */
  isNow: boolean;
  grade: Grade;
  orientation: Orientation | null;
  /** How hard the direction is being pressed. Says nothing about alignment. */
  pressure: ActivationCell;
  /** Which way the pressure points. Never null: "—" when nothing is running. */
  direction: ActivationCell;
  /** When the season is strongest, as a year, and how far off that is. */
  peak: ActivationCell;
  season: ActivationCell;
  span: ActivationCell | null;
  /** What is causing it. Three at most, direct contacts first. */
  drivers: ActivationDriver[];
  /** The prose, for the disclosure. Never shown by default. */
  detail: {
    summary: string;
    movement: string | null;
    question: string | null;
    caveat: string;
  };
  /** "40–42" and "2026–2028", for the panel's own header. */
  ages: string;
  years: string;
  /** The next season worth reading, whether or not one is running now. */
  next: { window: ActivationWindow; ages: string; inYears: number } | null;
}

/**
 * The contact itself, in the grammar it actually takes.
 *
 * A direct hit IS its target and takes the aspect as a preposition — "square
 * the nodal axis". Everything else ACTIVATES a target and takes "on". A house
 * transit is its own target and stops there, or the row reads "H9 · on H9".
 */
function contact(a: Activation): string {
  const aspect = a.aspect?.split(" ")[1];
  const relation =
    aspect === "Conjunction"
      ? "conjunct"
      : aspect === "Opposition"
        ? "opposite"
        : aspect === "Square"
          ? "square"
          : null;
  if (relation) return `${relation} ${a.targetShort}`;
  return a.kind === "house" ? "house transit" : `on ${a.targetShort}`;
}

/** "41" or "38–41", collapsing a season that opens and closes in one year. */
function ageRange(from: number, to: number): string {
  const a = Math.round(from);
  const b = Math.round(to);
  return a === b ? `${a}` : `${a}–${b}`;
}

/**
 * A duration a person can hold.
 *
 * Months under a year, one decimal up to three, whole years above that. "In
 * 11.0 years" is a false precision on a model that resolves to the quarter and
 * reads as a countdown; "in 11 years" says the same thing and claims what it
 * can support. The exact years travel in the note beside it either way.
 */
function length(years: number): string {
  if (years < 1) return `${Math.max(1, Math.round(years * 12))} months`;
  if (years < 3) return `${years.toFixed(1)} years`;
  return `${Math.round(years)} years`;
}

/** The season's strongest sample, and how far off it is from today. */
function peakPhrase(
  w: ActivationWindow,
  points: IntensityPoint[],
  age: number,
): { age: number; relative: string } | null {
  const inside = points.filter((p) => p.age >= w.ageStart && p.age <= w.ageEnd);
  if (inside.length === 0) return null;
  const top = inside.reduce((best, p) => (p.value > best.value ? p : best));
  const away = top.age - age;
  return {
    age: top.age,
    relative:
      Math.abs(away) < 0.5
        ? "now"
        : away > 0
          ? `in ${length(away)}`
          : `${length(-away)} ago`,
  };
}

export function readActivationNow({
  window: w,
  isNow,
  points,
  beats,
  age,
  ahead,
  yearOfAge,
}: {
  /** The season being read. Null in a quiet stretch with nothing selected. */
  window: ActivationWindow | null;
  /** Whether that season is the one running at this age. */
  isNow: boolean;
  /** The sampled curve, for the peak inside the season and the trend. */
  points: IntensityPoint[];
  beats: NodalBeat[];
  age: number;
  ahead: ActivationWindow[];
  yearOfAge: (age: number) => number;
}): ActivationNow {
  const frame = w ? orientationFrame(w.orientation) : null;

  /**
   * How much pressure to report, which depends on WHEN is being read.
   *
   * For the season in force it is the value at this moment, because that is
   * what the reader is living; for any other season it is the season's own
   * peak, because "the value right now" is meaningless for a stretch of years
   * that has not started. The two are different questions and reporting the
   * first for a future window would print a number from a different decade.
   */
  const here = points.reduce<IntensityPoint | null>(
    (best, p) =>
      !best || Math.abs(p.age - age) < Math.abs(best.age - age) ? p : best,
    null,
  );
  const value = isNow ? (here?.value ?? 0) : (w?.activation ?? 0);

  /**
   * What is causing it: the process, not the planet.
   *
   * "Commitment" is the claim and "Saturn" is the evidence for it, so the
   * planet rides along as a glyph rather than as the label. Direct contacts
   * lead, then the longest-running, because a contact on the axis itself is a
   * different order of claim from one on the machinery around it.
   */
  const seen = new Set<string>();
  const drivers: ActivationDriver[] = [];
  for (const a of [...(w?.activations ?? [])].sort(
    (x, y) =>
      Number(y.direct) - Number(x.direct) ||
      y.ageEnd - y.ageStart - (x.ageEnd - x.ageStart),
  )) {
    if (seen.has(a.planet) || drivers.length === 3) continue;
    seen.add(a.planet);
    const fn = PROCESS[a.planet] ?? UNKNOWN_PROCESS;
    drivers.push({
      planet: a.planet,
      label: fn.label,
      house: a.through?.house ?? null,
      note: a.direct ? "direct" : "supporting",
      gloss: fn.pressure,
      technical: [
        a.through ? `H${a.through.house}` : null,
        // The cache spells an aspect "Saturn Conjunction North Node", so the
        // relation is the SECOND word — taking the last one printed "node".
        contact(a),
        `${a.start.slice(0, 4)}–${a.end.slice(0, 4)}`,
      ]
        .filter(Boolean)
        .join(" · "),
    });
  }

  /** The shared rhythm, when one of its checkpoints falls in the season. */
  const beat = w
    ? beats.find((b) => b.age >= w.ageStart - 0.5 && b.age <= w.ageEnd + 0.5)
    : undefined;
  if (beat) {
    drivers.push({
      planet: null,
      label: "Cycle checkpoint",
      house: null,
      note: "shared",
      gloss:
        "the recurring milestone of the 18.6-year nodal cycle, at the same ages for everybody",
      technical: `${beatLabel(beat.kind).toLowerCase()} · age ${Math.round(beat.age)} · ${beat.windowStart.slice(0, 7)}–${beat.windowEnd.slice(0, 7)}`,
    });
  }

  const upcoming = ahead.find((wnd) => wnd.id !== w?.id) ?? null;
  const grade = w?.grade ?? "background";
  const peak = w ? peakPhrase(w, points, age) : null;

  /**
   * Where the season's strongest moment falls, relative to now.
   *
   * One question, asked the same way of every season, which is what the row
   * before it could not manage: it reported a slope for the season in force
   * and "Ahead" or "Past" for every other, and those are not the same kind of
   * answer. Worse, the second one was not an answer at all — whether a period
   * is before or after today is what its years already say, and dressing that
   * up as a trend made a category out of the reader's position in time.
   *
   * The slope survives where it means something: at today's date, inside the
   * season being lived. Rising and falling are readings of a line and nothing
   * more — an earlier draft called them Approach and Aftermath, which sounds
   * better and claims a developmental shape the model cannot see.
   */
  const peakYear = peak ? yearOfAge(peak.age) : null;
  const slope = isNow ? trendAt(points, age) : null;
  const trend: ActivationCell = {
    // The slope rides on the year as an arrow rather than as a word beneath
    // it: the panel is two columns wide and "6 months ago · falling" wraps,
    // which costs a line on every reading to say what "↓" says in a glyph.
    value: peakYear
      ? `${peakYear}${slope === "rising" ? " ↑" : slope === "easing" ? " ↓" : ""}`
      : "—",
    note: peak?.relative ?? "no peak in the cached span",
  };

  return {
    window: w,
    isNow,
    grade,
    orientation: w?.orientation ?? null,
    pressure: {
      value: bandLabel(value),
      // Which number this is, every time it is shown. The curve reports the
      // index at a moment and this cell reports one of two different things —
      // the value at today's date for the season in force, the season's own
      // highest point for any other — and a bare "85 / 100" beside a line
      // reading 60 looks like one of them is wrong.
      note: `${value} / 100 · ${isNow ? "right now" : "at its peak"}`,
      meter: value,
    },
    direction: frame
      ? { value: frame.short, note: frame.territory }
      : { value: "—", note: "nothing pointing either way" },
    peak: trend,
    season: {
      value: gradeLabel(grade),
      // "independent pressures" is the precise phrase and it wraps to two
      // lines in a half-width column on every single reading. The distinction
      // it carries — distinct slow planets, not distinct contacts — is made in
      // the interpretation, which has room for it.
      note: w
        ? `${w.pressures} pressure${w.pressures === 1 ? "" : "s"}`
        : "nothing converging",
    },
    span: w
      ? {
          value: length(w.ageEnd - w.ageStart),
          note: `${w.start.slice(0, 4)}–${w.end.slice(0, 4)}`,
        }
      : null,
    drivers,
    detail: {
      summary: gradeSummary(grade),
      movement: frame ? `${frame.plain} ${frame.experience}` : null,
      question: frame ? frame.question : null,
      caveat: ACTIVATION_CAVEAT,
    },
    ages: w ? ageRange(w.ageStart, w.ageEnd) : "",
    years: w ? `${w.start.slice(0, 4)}–${w.end.slice(0, 4)}` : "",
    next: upcoming
      ? {
          window: upcoming,
          ages: ageRange(upcoming.ageStart, upcoming.ageEnd),
          inYears: Math.max(0, Math.round(upcoming.ageStart - age)),
        }
      : null,
  };
}

/**
 * The two-word label for a season, without composing a whole reading.
 *
 * Exported because the curve, the list and the drawer must agree on what a
 * period is called, and the curve annotates half a dozen peaks that do not
 * each need house lookups and a thesis.
 */
export function windowLabel(w: ActivationWindow): {
  process: string;
  direction: string;
  label: string;
} {
  const lead = leadOf(w);
  const fn = lead
    ? (PROCESS[lead.planet] ?? UNKNOWN_PROCESS)
    : UNKNOWN_PROCESS;
  // The panel's word, not the long one. "Release · Pressure to Change" in the
  // drawer over "Crossroads" in the panel is two names for one season on one
  // page, and the short form is the one the rest of the interface teaches.
  const direction = orientationShort(w.orientation);
  return { process: fn.label, direction, label: `${fn.label} · ${direction}` };
}

/** "Mediator" out of "Mediator / Peacemaker" — prose takes the head noun. */
function role(archetype: string): string {
  return archetype.split("/")[0].trim();
}

function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/** "a, b and c". */
function list(parts: string[]): string {
  if (parts.length <= 1) return parts[0] ?? "";
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

/**
 * The activation a reading speaks for.
 *
 * A season can hold half a dozen contacts and they do not get equal say. The
 * one that lands on the axis itself leads if there is one, because it is the
 * only kind that can reorganise a trajectory rather than load it; failing
 * that, the longest-running pressure, which is the one shaping the period
 * rather than passing through it.
 */
function leadOf(w: ActivationWindow): Activation | null {
  const direct = w.activations.filter((a) => a.direct);
  const pool = direct.length ? direct : w.activations;
  if (pool.length === 0) return null;
  return pool.reduce((best, a) =>
    a.ageEnd - a.ageStart > best.ageEnd - best.ageStart ? a : best,
  );
}

/**
 * Which houses a period is likely to show up through.
 *
 * The two nodal houses always, because they are what is being activated, plus
 * whatever house each pressure is transiting — the sky's own location for the
 * event. That second part is why two people with the same nodal axis get
 * different arenas out of the same transit.
 */
function housesInvolved(w: ActivationWindow, t: Trajectory): House[] {
  const out = new Set<number>();
  if (t.to.house) out.add(t.to.house);
  if (t.from.house) out.add(t.from.house);
  for (const a of w.activations) if (a.through) out.add(a.through.house);
  return [...out].sort((a, b) => a - b) as House[];
}

/**
 * The paradox of a convergent period, when it has one.
 *
 * Three named configurations and a fallback, chosen because each is a genuine
 * structural tension rather than a summary of what is present. The first is
 * the sharpest thing this model can say: when the nodal rhythm reverses onto
 * the departing pole while a pressure pushes toward the arriving one, the
 * world is actively rewarding the behaviour the trajectory is trying to grow
 * beyond. That is not a mood, it is a computable configuration, and a person
 * living it usually cannot see it from the inside.
 */
function convergenceThesis(
  w: ActivationWindow,
  t: Trajectory,
  orientation: Orientation,
): string {
  const reversal = w.beats.some((b) => b.kind === "reversal");
  const pushesForward = w.activations.some((a) => a.orientation === "forward");
  const from = role(t.arc.from);
  const into = role(t.arc.into);

  if (reversal && pushesForward) {
    return (
      `The paradox of the period: the nodal rhythm has reversed onto your ` +
      `${t.from.sign} south node while a separate pressure pushes toward the ` +
      `${t.to.sign} north. Life may reward you for exactly the behaviour you ` +
      `are meant to be growing beyond. The task is not to refuse the reward — ` +
      `${from} is real competence — but to spend it on ${lower(into)} rather ` +
      `than reinvest it in itself.`
    );
  }

  if (orientation === "crossroads") {
    return (
      `These pressures are not merely overlapping — they are pressing on ` +
      `different parts of one developmental problem, and none of them can be ` +
      `answered from either end of the axis as it currently stands. What is ` +
      `under strain is the choice between ${from} and ${into} itself, not the ` +
      `question of which to pick.`
    );
  }

  if (orientation === "return") {
    return (
      `Several pressures arrive on the departing side at once, which is what ` +
      `makes this more than nostalgia: ${from} does not merely reappear, it ` +
      `arrives with enough force that it cannot be put back the way it was. ` +
      `That is the condition under which competence becomes material rather ` +
      `than habit.`
    );
  }

  return (
    `This period is not loud because several transits happen to overlap. ` +
    `They are pressing different parts of the same developmental problem — ` +
    `the move from ${from} to ${into} — from directions that know nothing ` +
    `about each other, which is why it is harder to explain away than any ` +
    `one of them alone.`
  );
}

/**
 * The whole reading for one window.
 *
 * Deterministic and total: it produces the same skeleton every time for the
 * same window, which is the point. An LLM asked to invent this from scratch on
 * each visit would produce a fresh horoscope every time and the product would
 * have no position of its own. The chat's job is to turn this skeleton into
 * prose for a particular person, not to decide what the period means.
 */
export function interpretActivationWindow(
  w: ActivationWindow,
  t: Trajectory,
): ActivationReading {
  const lead = leadOf(w);
  const fn = lead
    ? (PROCESS[lead.planet] ?? UNKNOWN_PROCESS)
    : UNKNOWN_PROCESS;
  const frame = orientationFrame(w.orientation);

  const from = role(t.arc.from);
  const into = role(t.arc.into);
  const material = lower(t.conversionArc.from);
  const output = lower(t.conversionArc.into);

  const houses = housesInvolved(w, t);
  const arenas = houses.map((h) => `${getHouseTitle(h)} (H${h})`);
  // Two per house rather than three, and lowercased for use in a list. The
  // themes carry their own commas — "communication: speaking, writing,
  // messaging" — so a dozen of them joined into a sentence is unreadable, and
  // the display renders them as separate items for the same reason.
  const eventPossibilities = houses.flatMap((h) =>
    getHouseCoreThemes(h).slice(0, 2).map(lower),
  );

  const planets = [...new Set(w.activations.map((a) => a.planet))];
  const others = planets.filter((p) => p !== lead?.planet);

  const mechanism = lead
    ? `${lead.planet} ${fn.verb} it — ${fn.how}.` +
      (planets.length > 1
        ? ` ${list(planets.filter((p) => p !== lead.planet))} ${planets.length > 2 ? "work" : "works"} on it at the same time, by other means.`
        : "")
    : `The rhythm is in season with no transit on the axis.`;

  const thesis =
    `The trajectory moves from ${material} toward ${output} — ${from} becoming ` +
    `${into}. ${lead ? `${lead.planet} activates ${frame.object} by ${fn.how}` : "The developmental rhythm reaches the axis"}. ` +
    `\n\nThe event is not the growth. The growth is your response: whether you ` +
    `use what happens to move further into ${output}, or rebuild ${material} ` +
    `somewhere else and call the period survived.`;

  const { process, direction, label } = windowLabel(w);

  return {
    orientation: w.orientation,
    title: label,
    process,
    direction,
    classification: classificationOf(w.grade),
    // Plain observations, in the grammar each kind of contact actually takes.
    // Composing this from the headline produced "Neptune release through the
    // destination — conjunct the North Node", which is two descriptions of one
    // fact welded together. A direct hit IS its target; everything else
    // ACTIVATES its target, and that one distinction makes both read.
    technical:
      (lead
        ? `${lead.planet} ${lead.direct ? "is" : "activates"} ${lead.target}. `
        : "") +
      (others.length
        ? `${list(others)} ${others.length === 1 ? "is" : "are"} in contact with the axis at the same time. `
        : "") +
      `${w.pressures} independent pressure${w.pressures === 1 ? "" : "s"} ` +
      `${w.pressures === 1 ? "bears" : "overlap"} on it` +
      (w.beats.length ? " while the nodal rhythm is in season" : "") +
      `, which the model classifies as ${lower(classificationOf(w.grade))}.`,
    phrase: `${fn.noun} ${frame.titleTail}`,
    thesis,
    activated: frame.activated,
    mechanism,
    arenas,
    arenasSummary: `In these areas, the period ${fn.pressure}.`,
    growthMove: frame.move,
    // Planet first, then the orientation's frame — each half written to stand
    // alone, so the join reads as two sentences rather than as a template.
    opening: `The opening is to ${fn.opening}. ${frame.opening}`,
    trap: `${fn.trap} ${frame.trap}`,
    eventPossibilities,
    convergence:
      w.grade === "convergence" || w.grade === "turning-point"
        ? {
            thesis: convergenceThesis(w, t, w.orientation),
            // Deduplicated: a planet often makes the same contact twice in
            // one season — two passes of the same aspect, or the same house
            // entered either side of a retrograde — and the tension it
            // describes is one tension, not two. Repeating the line padded the
            // list and collided as a React key.
            tensions: [
              ...new Set([
                ...w.activations.map((a) => {
                  const f = PROCESS[a.planet] ?? UNKNOWN_PROCESS;
                  return `${a.planet} ${f.verb} ${lower(a.target)}`;
                }),
                ...w.beats.map(
                  (b) =>
                    `the ${beatLabel(b.kind).toLowerCase()} brings the axis itself back into season`,
                ),
              ]),
            ],
          }
        : undefined,
  };
}
