/**
 * lib/growth/activation-windows.ts
 *
 * Turning a stream of overlapping transits into seasons, and grading them.
 *
 * The grading is STRUCTURAL, never numeric. There is no total, no weighting of
 * Pluto above Saturn, nothing that pretends to a precision the subject does not
 * have — a window is graded by what is true of it, not by how big it is
 * expected to feel.
 *
 * The vocabulary is deliberate, because an earlier draft blurred it and the
 * blur reached the screen. RHYTHM is the nodal cycle — developmental, shared
 * by every chart, the only thing here that is not a transit. PRESSURE is one
 * slow planet bearing on the trajectory, independent of the others and of the
 * rhythm. The slow planets are not five more clocks, and calling them that
 * made "how many independent clocks are running" mean two things at once.
 *
 * Three failure modes shaped this file, and each is worth keeping written down
 * because each produced something that looked plausible on screen:
 *
 *   MERGING OVERLAPS collapses — joining transits whose spans touch is
 *   transitive, and one Neptune chain swallowed most of a life. The sweep asks
 *   a LOCAL question instead: what is running in this quarter.
 *
 *   GRADING THE UNION over-claims. Sentences asserting simultaneity argue only
 *   from the peak quarter, never from everything a run contains.
 *
 *   SPLITTING ONLY ON BACKGROUND produced a fifteen-year turning point, and
 *   bridging without a cap produced a twenty-one-year one. Runs break where
 *   the grade changes, and a bridged season is bounded.
 */

import type { Activation } from "./activation";
import { orientationOf, type Orientation } from "./activation-interpretations";
import type { NodalBeat } from "./timing";
import { beatLabel } from "./timing";

export type Grade = "background" | "active" | "convergence" | "turning-point";

/**
 * What a grade is CALLED on screen.
 *
 * "Background" was the internal word and it reached the interface, where it
 * says the wrong thing twice: to a reader it sounds like the period is
 * irrelevant, and to anyone comparing two stretches it sounds like a verdict
 * on their life rather than a statement about how much evidence there is.
 * "Quiet" says the same thing about the chart and claims nothing about the
 * years. The key stays `background` because that is what the grading rule
 * computes; only the label changed.
 */
const GRADE_LABEL: Record<Grade, string> = {
  background: "Quiet",
  active: "Active",
  convergence: "Convergence",
  "turning-point": "Turning point",
};

export function gradeLabel(g: Grade): string {
  return GRADE_LABEL[g];
}

/**
 * What a grade MEANS, in a sentence, to somebody who knows no astrology.
 *
 * Every one of these describes the evidence and not the life. That is the
 * whole point of writing them down: a grade counts how many independent
 * signals converge and whether one of them lands on the trajectory itself, and
 * a reader who is told "turning point" without being told that will hear a
 * prophecy. Concentration of evidence is an honest claim; consequence is not
 * ours to make.
 */
const GRADE_MEANING: Record<Grade, string> = {
  background:
    "Little emphasis on this part of your chart. The direction is still running — it always is — but nothing unusual is pressing on it.",
  active:
    "One meaningful signal is in play, or several smaller ones, working on the structures around your growth direction.",
  convergence:
    "Several independent signals point at the same developmental theme at once, which is uncommon.",
  "turning-point":
    "A rare concentration: independent signals converge and one of them lands on the growth direction itself rather than around it.",
};

export function gradeMeaning(g: Grade): string {
  return GRADE_MEANING[g];
}

/**
 * Label precedence when two runs merge — NOT a strength scale.
 *
 * When a sliver is absorbed into a neighbour something has to decide which
 * label survives, and "the more specific configuration wins" is the rule for
 * that. It is not a claim that a turning point is bigger than a convergence:
 * how much is happening is the Activation Index's question, and the two
 * answers are independent. A turning point at 63 and a convergence at 91 are
 * both true, and the convergence is the denser period.
 */
export const GRADE_PRECEDENCE: Grade[] = [
  "background",
  "active",
  "convergence",
  "turning-point",
];

export interface ActivationWindow {
  id: string;
  grade: Grade;
  ageStart: number;
  ageEnd: number;
  start: string;
  end: string;
  /** Everything appearing anywhere in the season. What the reader is shown. */
  activations: Activation[];
  beats: NodalBeat[];
  /** Independent pressures at the peak quarter — never across the whole run. */
  pressures: number;
  /**
   * The Activation Index at this season's densest moment, 0–100.
   *
   * Filled in by `growthActivation` from the smoothed curve rather than
   * computed here, so a window and the line above it can never disagree about
   * the same span. It answers HOW MUCH is happening; `grade` answers WHAT
   * configuration. Neither is a rank of the other.
   */
  activation: number;
  /**
   * Which way the season points the trajectory.
   *
   * The field that ties this page back to the Growth reading. Without it a
   * window says "Pluto and Saturn are active" and leaves the reader to work
   * out whether that means they are being pushed forward, handed their past
   * back, or held at a crossroads — which is the only question they came with.
   */
  orientation: Orientation;
  why: string;
  status: "completed" | "active" | "upcoming";
}

/**
 * Jupiter is read and described but never grades.
 *
 * It contacts something on the axis every few months, so it cannot tell a loud
 * season from a quiet one — and letting it vote turned the activation strip
 * into confetti, flipping the grade dozens of times until the row stopped
 * being legible. What Jupiter says, that an opening exists, is worth knowing;
 * a witness who always says yes is just not evidence.
 */
const PROMOTING_PLANETS = new Set(["Saturn", "Uranus", "Neptune", "Pluto"]);

function gradeFor(
  activations: Activation[],
  beats: NodalBeat[],
): { grade: Grade; pressures: number } | null {
  if (activations.length === 0 && beats.length === 0) return null;

  const grading = activations.filter((a) => PROMOTING_PLANETS.has(a.planet));
  const direct = grading.filter((a) => a.direct);
  /** Independent pressures: distinct slow planets, not distinct contacts. */
  const pressures = new Set(grading.map((a) => a.planet)).size;
  /** The developmental rhythm, in season. Not a pressure — see the header. */
  const rhythm = beats.length > 0;

  // TURNING POINT is a shape, not a total.
  //
  // It was a count once, which made it the top of a ladder rather than a
  // different kind of event. Three slow planets working on rulers and houses
  // is a large convergence that leaves the axis pointing where it pointed
  // before. What reorganises a trajectory is something landing on the axis
  // ITSELF while other pressures are already in play — so a window with four
  // structural activations and no direct hit never reaches this, however many
  // it accumulates.
  if (direct.length > 0 && pressures >= 2 && (rhythm || grading.length >= 3)) {
    return { grade: "turning-point", pressures };
  }

  // CONVERGENCE: several independent pressures agreeing on the trajectory.
  // Three of them, or two that are pointing hard — one on the axis itself, or
  // two coinciding with the rhythm.
  if (pressures >= 3 || (pressures >= 2 && (direct.length > 0 || rhythm))) {
    return { grade: "convergence", pressures };
  }

  // ACTIVE: one direct hit, or more than one contact on the machinery.
  if (direct.length > 0 || grading.length >= 2) {
    return { grade: "active", pressures };
  }

  return { grade: "background", pressures };
}

/** "a, b and c" — a list that reads, rather than "a and b and c". */
function list(parts: string[]): string {
  if (parts.length <= 1) return parts[0] ?? "";
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

/**
 * Why the window reads as it does.
 *
 * Two different populations, and which one is used depends on what the
 * sentence CLAIMS.
 *
 * The convergence and turning-point sentences assert simultaneity — that
 * several pressures were running together — so they may only argue from the
 * peak quarter. Built from the whole season they would describe a convergence
 * between pressures that never overlapped.
 *
 * The background and active sentences assert no such thing; they describe the
 * season. Giving them the peak quarter instead produced a flat contradiction
 * on screen: the drawer said "they work on the machinery without touching it
 * directly" directly above a list whose first row was a conjunction to the
 * North Node — true of the peak quarter, false of the season, and the reader
 * can see both at once.
 */
function whyFor(
  grade: Grade,
  peak: Activation[],
  all: Activation[],
  beats: NodalBeat[],
  pressures: number,
): string {
  if (grade === "background") {
    const only = all[0];
    return `One indirect contact — ${only?.planet ?? "a slow planet"} on ${only?.target ?? "the axis machinery"}. The trajectory is running, but nothing is pressing on it.`;
  }

  if (grade === "active") {
    const hit = all.find((a) => a.direct);
    const names = [...new Set(all.map((a) => a.planet))];
    return hit
      ? `${hit.planet} lands on the axis itself. A single pressure, but the most direct kind there is.`
      : `${list(names)} work on the machinery of the axis without any of them touching it directly.`;
  }

  const activations = peak;
  const planets = [...new Set(activations.map((a) => a.planet))];
  const direct = activations.filter((a) => a.direct);
  const indirect = planets.filter((p) => !direct.some((d) => d.planet === p));
  const beatNames = beats.map((b) => beatLabel(b.kind).toLowerCase());

  const parts = [
    direct.length
      ? `${list([...new Set(direct.map((d) => d.planet))])} on the axis itself`
      : null,
    indirect.length ? `${list(indirect)} on its machinery` : null,
    beatNames.length ? `the ${list([...new Set(beatNames)])}` : null,
  ].filter(Boolean) as string[];

  const lead =
    grade === "turning-point"
      ? "Something lands on the axis itself while other pressures are already working on it — the configuration that reorganises a trajectory rather than merely loading it."
      : `${pressures} independent pressures converge on the trajectory at once.`;

  return `${lead} ${parts.join("; ")}. None of them knows about the others, which is what makes the overlap worth reading.`;
}

/** A quarter of a year. The sweep's resolution. */
const STEP = 0.25;

/**
 * The shortest run allowed to stand on its own, in years.
 *
 * Without it the sweep emits slivers: one moment produced "active 32–32",
 * "convergence 32–32" and "turning point 32–33" as three windows, which is one
 * season rendered as three and read as noise. A grade excursion under a year
 * is also below the resolution of the material — the beats are mean-node
 * approximations good to about a month — so absorbing it costs nothing real.
 */
const MIN_WINDOW = 1;

interface Run {
  grade: Grade;
  from: number;
  to: number;
  acts: Set<Activation>;
  bts: Set<NodalBeat>;
  pressures: number;
  peakActs: Activation[];
  peakBts: NodalBeat[];
}

/** Contiguous, allowing for float drift in the sweep's accumulator. */
function touches(a: Run, b: Run): boolean {
  return b.from - a.to <= STEP * 1.5;
}

function absorb(host: Run, other: Run): void {
  host.from = Math.min(host.from, other.from);
  host.to = Math.max(host.to, other.to);
  other.acts.forEach((x) => host.acts.add(x));
  other.bts.forEach((x) => host.bts.add(x));
  // The stronger reading survives, with the peak that justified it — never a
  // recount across the merged span, which would claim a convergence between
  // pressures that were never running together.
  if (
    GRADE_PRECEDENCE.indexOf(other.grade) > GRADE_PRECEDENCE.indexOf(host.grade) ||
    (other.grade === host.grade && other.pressures > host.pressures)
  ) {
    host.grade = other.grade;
    host.pressures = other.pressures;
    host.peakActs = other.peakActs;
    host.peakBts = other.peakBts;
  }
}

/**
 * Fold sub-minimum runs into the stronger of their contiguous neighbours.
 *
 * Walks with a cursor rather than seeking the first short run. The seeking
 * version had a bug no synthetic test reached: an isolated sliver — quiet on
 * both sides, nothing to merge into — ended the loop, so every mergeable
 * sliver after it was left alone. Real charts have one early in life, so the
 * pass did almost nothing while looking correct on a small case.
 */
function coalesce(runs: Run[]): Run[] {
  const out = [...runs];
  let i = 0;
  while (i < out.length) {
    const run = out[i];
    if (run.to - run.from >= MIN_WINDOW) {
      i++;
      continue;
    }

    const prev = i > 0 && touches(out[i - 1], run) ? out[i - 1] : null;
    const next =
      i < out.length - 1 && touches(run, out[i + 1]) ? out[i + 1] : null;
    // An isolated sliver has nowhere to go, so it stands — and the walk
    // carries on past it rather than stopping.
    if (!prev && !next) {
      i++;
      continue;
    }

    const host =
      prev && next
        ? GRADE_PRECEDENCE.indexOf(prev.grade) >= GRADE_PRECEDENCE.indexOf(next.grade)
          ? prev
          : next
        : (prev ?? next)!;

    // A sliver LOUDER than everything around it is a finding, not noise, and
    // it stands however brief it is. Absorbing it would do the opposite of
    // what this pass is for: a three-month turning point folded into a
    // five-year active season either disappears or, worse, relabels the whole
    // five years as a turning point. Both are lies; leaving the moment alone
    // is the truth, and a turning point IS a moment.
    if (GRADE_PRECEDENCE.indexOf(run.grade) > GRADE_PRECEDENCE.indexOf(host.grade)) {
      i++;
      continue;
    }
    absorb(host, run);
    out.splice(i, 1);
    // The host just grew, which may have made it mergeable with its own
    // neighbour, so reconsider from one step back. The list is strictly
    // shorter after every splice, so this terminates.
    i = Math.max(0, i - 1);
  }

  // Neighbours that ended up agreeing are one season, not two.
  const joined: Run[] = [];
  for (const r of out) {
    const last = joined[joined.length - 1];
    if (last && last.grade === r.grade && touches(last, r)) absorb(last, r);
    else joined.push(r);
  }
  return bridge(joined);
}

/**
 * How far apart two notable stretches can be and still be one season.
 *
 * The unit being displayed is a developmental season, not an interval
 * intersection. Pluto squaring the nodes into 2037, Saturn reaching a ruler in
 * 2036, Uranus arriving on a natal placement in 2037 — that is one 2035–2038
 * period to anybody living it, and a strict reading of the arithmetic cuts it
 * into three because the spans do not literally touch.
 *
 * A year is not a threshold astrology supplies; nothing does. It is chosen
 * because the model resolves to months, the beats are mean-node approximations
 * good to about a month, and a gap under a year is therefore inside the
 * material's own error bars. Longer than that and the two stretches really are
 * separate events with a lull between them.
 */
const SEASON_GAP = 1;

/**
 * The longest a bridged season may become.
 *
 * A cap is required, not tidiness. Bridging is transitive — A to B, then B to
 * C — which is the collapse this file's header warns about, and the first
 * version walked straight into it: a chain of stretches separated by short
 * lulls merged into one 21-year span and took the loudest grade in the chain.
 * Whatever a developmental season is, it is not twenty-one years.
 */
const MAX_SEASON = 8;

/**
 * Join notable stretches separated by a short lull.
 *
 * Three restrictions, each of them load-bearing:
 *
 *   SAME GRADE ONLY. Two adjacent stretches of different intensity are not
 *   one fragmented season, they are a season and its shoulder. Bridging across
 *   grades is what let a chain escalate — every join took the louder label
 *   until an entire span read as its single loudest quarter.
 *
 *   NOTABLE ONLY. Bridging background to background would build a season out
 *   of nothing happening.
 *
 *   CAPPED. See MAX_SEASON.
 */
function bridge(runs: Run[]): Run[] {
  const notable = (r: Run) => r.grade !== "background";
  const out: Run[] = [];

  for (const r of runs) {
    const last = out[out.length - 1];
    const joinable =
      last &&
      notable(last) &&
      notable(r) &&
      last.grade === r.grade &&
      r.from - last.to <= SEASON_GAP &&
      r.to - last.from <= MAX_SEASON;

    if (joinable) {
      absorb(last, r);
      continue;
    }

    // A short background lull sandwiched between two stretches of the SAME
    // grade is part of that season rather than a window of its own.
    const prev = out[out.length - 2];
    if (
      last &&
      !notable(last) &&
      notable(r) &&
      prev &&
      notable(prev) &&
      prev.grade === r.grade &&
      r.from - prev.to <= SEASON_GAP &&
      r.to - prev.from <= MAX_SEASON
    ) {
      out.pop();
      absorb(prev, last);
      absorb(prev, r);
      continue;
    }
    out.push(r);
  }
  return out;
}

/**
 * Every stretch of a life where the trajectory is being worked on, graded.
 */
export function activationWindows(
  activations: Activation[],
  beats: NodalBeat[],
  birthISO: string,
  age: number,
  lifespan: number,
): ActivationWindow[] {
  const birthMs = Date.parse(`${birthISO.slice(0, 10)}T12:00:00Z`);

  /**
   * A window's edges, converted from age.
   *
   * Not the extent of the activations inside it, which is what this took at
   * first and which is wrong in a way that looks right: a two-year window
   * containing one fourteen-year Neptune transit reported the Neptune
   * transit's dates, and the page printed "age 45–46 (2029–2045)".
   */
  const dateAt = (a: number) =>
    new Date(birthMs + a * 365.2425 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

  const runs: Run[] = [];
  let open: Run | null = null;

  for (let a = 0; a <= lifespan; a += STEP) {
    const acts = activations.filter((x) => a >= x.ageStart && a <= x.ageEnd);
    const bts = beats.filter((b) => a >= b.age - 0.5 && a <= b.age + 0.5);
    const graded = gradeFor(acts, bts);

    if (!graded) {
      open = null;
      continue;
    }
    if (open && open.grade === graded.grade) {
      open.to = a;
      acts.forEach((x) => open!.acts.add(x));
      bts.forEach((x) => open!.bts.add(x));
      if (graded.pressures > open.pressures) {
        open.pressures = graded.pressures;
        open.peakActs = acts;
        open.peakBts = bts;
      }
      continue;
    }
    open = {
      grade: graded.grade,
      from: a,
      to: a,
      acts: new Set(acts),
      bts: new Set(bts),
      pressures: graded.pressures,
      peakActs: acts,
      peakBts: bts,
    };
    runs.push(open);
  }

  return coalesce(runs).map((r) => ({
    id: `w-${r.from.toFixed(2)}`,
    // Assigned by `growthActivation` once the curve exists — see the field.
    activation: 0,
    grade: r.grade,
    ageStart: r.from,
    ageEnd: r.to,
    start: dateAt(r.from),
    end: dateAt(r.to),
    activations: [...r.acts].sort((a, b) => a.start.localeCompare(b.start)),
    beats: [...r.bts].sort((a, b) => a.age - b.age),
    pressures: r.pressures,
    // From the whole season, not the peak quarter — unlike `why`, which must
    // argue only from pressures that were genuinely running together. This is
    // a description of the season's character rather than a claim about
    // simultaneity, and taking it from the peak let the headline say "past
    // returns" above a list whose visible rows all pointed forward.
    orientation: orientationOf([...r.acts]),
    why: whyFor(r.grade, r.peakActs, [...r.acts], r.peakBts, r.pressures),
    status: age > r.to ? "completed" : age < r.from ? "upcoming" : "active",
  }));
}
