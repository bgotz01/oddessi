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
  PROCESS,
  UNKNOWN_PROCESS,
  orientationFrame,
  orientationLabel,
  type Orientation,
} from "./activation-interpretations";
import type { Activation } from "./activation";
import type { ActivationWindow } from "./activation-windows";
import { beatLabel } from "./timing";
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
  const direction = orientationLabel(w.orientation);
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
