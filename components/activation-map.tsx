//components/activation-map.tsx

"use client";

import { useRef, useState } from "react";
import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import {
  gradeLabel,
  orientationFrame,
  processOf,
  PRIMARY_ORIENTATIONS,
  type Activation,
  type ActivationWindow,
  type Grade,
  type NodalBeat,
} from "@/lib/growth";
import { T } from "@/components/growth-ui";
import ActivationTooltip, {
  type Tip,
  type TipContent,
} from "@/components/activation-tooltip";

/**
 * The whole life on one axis: when the growth direction is loud, and why.
 *
 * The drawing is arranged in three levels, and the order is the argument. It
 * used to be arranged the other way up — five planetary lanes occupying most
 * of the height, with the one row a reader could actually act on reduced to a
 * strip at the bottom — which asked them to reverse-engineer the answer out of
 * Pluto, Saturn, node ticks, bar thickness and a legend before they could
 * learn anything about their own life.
 *
 *   LEVEL 1  NOW. What is running at this age, named in ordinary words, with
 *            a way into the full reading. Almost nobody arrives at a page like
 *            this asking about their fifties.
 *   LEVEL 2  THE PATTERN. The same life end to end, so a reader sees that they
 *            had one of these at eighteen, another at twenty-eight, one now,
 *            and one still ahead. That shape is what makes it a developmental
 *            arc rather than a forecast.
 *   LEVEL 3  THE EVIDENCE, folded away until asked for. Which planet, which
 *            contact, how direct. This is where astrology belongs: as the
 *            support for a claim already made in English, never as the
 *            interface a reader has to learn first.
 *
 * The vocabulary is deliberate at every level. Grades say how much independent
 * evidence converges — they are never a promise about how large the years will
 * feel, and `gradeMeaning` says so wherever one is shown. Planets carry verbs,
 * because "Saturn" is a name a reader has to have studied and "Saturn · Commit"
 * tells them what the row is for while they look at it. And the three
 * orientations — Forward, Return, Crossroads — are stated as their own block
 * rather than buried in a key, because they are the one piece of vocabulary
 * this whole section is trying to teach.
 *
 * Two visual encodings in the evidence, both facts rather than judgements.
 * THICKNESS is the strength of the evidence: a hit on the node degree is drawn
 * heavier than a transit through a nodal house because it is a stronger claim,
 * not because it matters more. SHAPE is direction — forward, returning, or
 * across both — which is the reading itself and was invisible until it was
 * drawn.
 */

/** Grade tints. The quiet grade is deliberately almost invisible. */
export const GRADE_TINT: Record<Grade, string> = {
  background: "var(--color-rule)",
  active: "var(--color-patina-dim)",
  convergence: "var(--color-patina)",
  "turning-point": "var(--color-ember)",
};

/**
 * Bar heights on the hero strip, in pixels.
 *
 * Height carries the grade and nothing else, so the strip can be read at a
 * glance from across a room: quiet stretches are a rule, a turning point is a
 * block. The exact index — how much is happening, as opposed to what
 * configuration — is the curve's question, and putting it here as well would
 * be two encodings of two different things in one row.
 */
const GRADE_HEIGHT: Record<Grade, number> = {
  background: 3,
  active: 13,
  convergence: 23,
  "turning-point": 34,
};

const BEAT_TINT: Record<string, string> = {
  return: "var(--color-patina)",
  reversal: "var(--color-ember)",
  square: "var(--color-bone-faint)",
};

/** Decade ticks, which is as fine as an eighty-year axis can usefully label. */
const DECADES = [0, 10, 20, 30, 40, 50, 60, 70, 80];

/**
 * How many stretches get a caption, and how far apart they have to be.
 *
 * Labels are what turn a row of bars into a life, and too many of them turn it
 * back into a chart. Six is what an eighty-year strip holds before the
 * captions start describing each other's neighbours; the spacing is in years
 * and is what stops two adjacent seasons — which is how the grader often
 * reports one long stretch — from printing two labels on top of each other.
 */
const MAX_LABELS = 6;
const LABEL_SPACING = 6;

/**
 * Lanes drawn at reduced weight.
 *
 * Jupiter contacts the axis every few months, so its lane is by far the
 * busiest on the chart — and busyness reads as importance whether or not it
 * means anything. It is the least consequential of the five and it was
 * shouting loudest, purely as an artefact of orbital period. Dimming it costs
 * nothing (it is still there, still hoverable, still in every window) and
 * stops frequency from impersonating weight.
 */
const QUIET_LANES = new Set(["Jupiter"]);

/** Slowest first, so the eye reads down into the busy Jupiter lane. */
const LANE_ORDER = ["Pluto", "Neptune", "Uranus", "Saturn", "Jupiter"];

/** "41" or "38–41", collapsing a season that opens and closes in one year. */
function ages(from: number, to: number): string {
  const a = Math.round(from);
  const b = Math.round(to);
  return a === b ? `${a}` : `${a}–${b}`;
}

/**
 * One transit, drawn so its DIRECTION is visible without reading anything.
 *
 * Thickness already said whether a contact lands on the axis itself. What it
 * could not say is the thing that matters most — a direct hit can be a pull
 * toward the destination, a return of the ground you came from, or a square
 * standing across both, and those are three different lives. The map showed
 * all three as the same bar, so "Pluto activation, ages 47–49" was as far as
 * anyone could get by looking.
 *
 * Colour is already spent on planet identity, so direction is carried by
 * shape instead:
 *
 *   forward     bar with a notch at its leading (right) end
 *   return      bar with a notch at its trailing (left) end
 *   crossroads  bar with a mark through its centre
 *
 * Structural contacts get the same marks at lower weight, because a transit
 * through the North Node's house points the same way as a conjunction to the
 * North Node — it just says so far more quietly.
 */
function Mark({ a, quiet }: { a: Activation; quiet?: boolean }) {
  const tint = a.color ?? bodyColor(a.planet);
  const h = a.direct ? 8 : 3;
  const top = a.direct ? 6 : 8;
  const opacity = (a.status === "completed" ? 0.35 : 1) * (quiet ? 0.5 : 1);
  const cap = a.direct ? 7 : 5;

  return (
    <span className="absolute inset-x-0 block" style={{ top, opacity }}>
      <span
        className="absolute inset-x-0 block rounded-full"
        style={{ height: h, top: (cap - h) / 2, background: tint }}
      />
      {a.orientation === "forward" ? (
        <span
          className="absolute right-0 block rounded-[1px]"
          style={{ width: 2, height: cap, background: tint }}
        />
      ) : a.orientation === "return" ? (
        <span
          className="absolute left-0 block rounded-[1px]"
          style={{ width: 2, height: cap, background: tint }}
        />
      ) : (
        <span
          className="absolute left-1/2 block -translate-x-1/2 rotate-45"
          style={{ width: cap - 2, height: cap - 2, background: tint }}
        />
      )}
    </span>
  );
}

/** The same three shapes at legend size, so the key and the lanes agree. */
function ShapeKey({ orientation }: { orientation: string }) {
  return (
    <span className="relative inline-block h-2 w-5 bg-bone-faint/30 align-middle">
      {orientation === "forward" ? (
        <span className="absolute inset-y-[-2px] right-0 w-[2px] bg-bone-faint" />
      ) : orientation === "return" ? (
        <span className="absolute inset-y-[-2px] left-0 w-[2px] bg-bone-faint" />
      ) : (
        <span className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-bone-faint" />
      )}
    </span>
  );
}

export default function ActivationMap({
  axis,
  planets,
  activations,
  beats,
  windows,
  age,
  lifespan,
  selected,
  onSelect,
}: {
  /** The trajectory everything here hangs from. Two short lines. */
  axis: { line: string; arc: string };
  planets: string[];
  activations: Activation[];
  beats: NodalBeat[];
  windows: ActivationWindow[];
  age: number;
  lifespan: number;
  selected: ActivationWindow | null;
  onSelect: (w: ActivationWindow) => void;
}) {
  // Fixed precision keeps the server and client strings byte-identical, which
  // a raw float percentage does not — it hydrated mismatched every load.
  const x = (a: number) => `${((a / lifespan) * 100).toFixed(2)}%`;
  const w = (from: number, to: number) =>
    `${Math.max(((to - from) / lifespan) * 100, 0.4).toFixed(2)}%`;
  /** Centred captions run off both ends of an eighty-year strip. */
  const centred = (a: number) =>
    `clamp(2.75rem, ${x(a)}, calc(100% - 2.75rem))`;

  const lanes = LANE_ORDER.filter((p) => planets.includes(p));

  const frame = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const [evidence, setEvidence] = useState(false);

  /** Whatever is running at this age, whatever its grade. */
  const now = windows.find((win) => win.status === "active") ?? null;

  /**
   * The captioned stretches: the loudest few, back in chronological order.
   *
   * Picked by index and then re-sorted, rather than taken in order and cut,
   * because a life's first decades are as densely graded as its middle and
   * taking the first six would caption a reader's childhood and leave the rest
   * of the strip mute. A candidate too close to one already picked is dropped
   * rather than drawn: the grader routinely reports one long loud stretch as
   * two neighbouring seasons, and their captions land on each other.
   */
  const mid = (win: ActivationWindow) => (win.ageStart + win.ageEnd) / 2;
  const labelled: ActivationWindow[] = [];
  for (const win of [...windows]
    .filter((win) => win.grade !== "background")
    .sort((a, b) => b.activation - a.activation)) {
    if (labelled.length === MAX_LABELS) break;
    if (labelled.some((p) => Math.abs(mid(p) - mid(win)) < LABEL_SPACING)) {
      continue;
    }
    labelled.push(win);
  }
  labelled.sort((a, b) => a.ageStart - b.ageStart);

  /**
   * Anchor the tooltip to the element under the pointer, not to the pointer.
   *
   * A tooltip that tracks the cursor jitters on a chart made of two-pixel bars
   * and makes the reader feel they have to hold still. Anchoring to the bar's
   * own centre means it appears in one place and stays there for as long as
   * that bar is the answer.
   */
  const show =
    (content: TipContent, place: "above" | "below" = "above") =>
    (e: React.MouseEvent<HTMLElement>) => {
      const box = frame.current?.getBoundingClientRect();
      if (!box) return;
      const el = e.currentTarget.getBoundingClientRect();
      setTip({
        content,
        x: el.left + el.width / 2 - box.left,
        y: (place === "below" ? el.bottom : el.top) - box.top,
        place,
      });
    };

  return (
    <div className="relative mt-10" ref={frame} onMouseLeave={() => setTip(null)}>
      {/* LEVEL 1 — what is running now.
          The first thing anybody looks for on a timeline of their own life is
          where they are standing on it, and until this block existed the
          answer was a one-pixel rule with "now" written over it. */}
      {now ? (
        <button
          type="button"
          onClick={() => onSelect(now)}
          onMouseEnter={show({ kind: "window", window: now }, "below")}
          className="group block w-full border-l-2 py-1 pl-5 text-left"
          style={{ borderColor: GRADE_TINT[now.grade] }}
        >
          <p className={`${T.tiny} text-bone-faint`}>
            Now · age {Math.round(age)} · intensity {now.activation} / 100
          </p>
          <p
            className="mt-2.5 text-[1.375rem] leading-tight font-light"
            style={{ color: GRADE_TINT[now.grade] }}
          >
            {gradeLabel(now.grade)} ·{" "}
            {orientationFrame(now.orientation).short}
          </p>
          <p className={`${T.body} mt-2 max-w-2xl`}>
            {orientationFrame(now.orientation).plain}
          </p>
          <p
            className={`${T.tiny} mt-3 text-patina-dim transition-colors group-hover:text-patina`}
          >
            Read age {ages(now.ageStart, now.ageEnd)} →
          </p>
        </button>
      ) : (
        <p className={`${T.body} max-w-2xl border-l-2 border-rule pl-5`}>
          Nothing unusual is pressing on your growth direction at age{" "}
          {Math.round(age)}. It is still running — it always is — and the strip
          below shows when it gets loud.
        </p>
      )}

      {/* LEVEL 2 — the whole life, and what is being activated across it.
          The axis line is understated and non-negotiable: without it a reader
          can spend five minutes among ages and grades and lose the only
          question the strip exists to answer — loud TOWARD WHAT. */}
      <div className="mt-14 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
        <p className={`${T.tiny} text-bone-soft`}>Your whole life</p>
        <p className={`${T.tiny} text-bone-faint`}>
          {axis.line} <span className="text-bone-faint/60">· {axis.arc}</span>
        </p>
      </div>

      {/* Age axis */}
      <div className="relative mt-3 h-6 border-b border-rule">
        {DECADES.filter((d) => d <= lifespan).map((d) => (
          <span
            key={d}
            className={`${T.tiny} absolute top-0 -translate-x-1/2 text-bone-faint`}
            style={{ left: x(d) }}
          >
            {d}
          </span>
        ))}
        {age > 0 && age < lifespan ? (
          <span
            className={`${T.tiny} absolute top-0 -translate-x-1/2 text-bone`}
            style={{ left: centred(age) }}
          >
            now
          </span>
        ) : null}
      </div>

      {/* The graded strip: the hero of the whole component.
          Bars sit on the axis and grow upward, so the row reads as terrain
          rather than as a set of blocks floating in a band. */}
      <div className="relative h-9">
        {windows.map((win) => {
          const on = selected?.id === win.id;
          return (
            <button
              key={win.id}
              type="button"
              onClick={() => onSelect(win)}
              onMouseEnter={show({ kind: "window", window: win }, "below")}
              className="absolute bottom-0 transition-opacity hover:opacity-80"
              style={{
                left: x(win.ageStart),
                width: w(win.ageStart, win.ageEnd),
                height: GRADE_HEIGHT[win.grade] + (on ? 4 : 0),
                background: GRADE_TINT[win.grade],
                opacity: win.status === "completed" && !on ? 0.4 : 1,
                outline: on ? "1px solid var(--color-bone)" : undefined,
                outlineOffset: 1,
              }}
            />
          );
        })}
        {age > 0 && age < lifespan ? (
          <span
            className="absolute -top-6 bottom-0 w-px bg-bone-faint/60"
            style={{ left: x(age) }}
          />
        ) : null}
      </div>

      {/* The captions. What a stretch is, and when — which is the pair that
          turns the strip into something a person recognises. */}
      <div className="relative mt-2 h-14 border-t border-rule-faint">
        {labelled.map((win, i) => (
          <button
            key={win.id}
            type="button"
            onClick={() => onSelect(win)}
            onMouseEnter={show({ kind: "window", window: win }, "below")}
            className="absolute -translate-x-1/2 pt-2 text-center whitespace-nowrap"
            style={{
              left: centred((win.ageStart + win.ageEnd) / 2),
              top: i % 2 ? 24 : 0,
            }}
          >
            <span
              className={`${T.tiny} block`}
              style={{
                color: GRADE_TINT[win.grade],
                opacity: win.status === "completed" ? 0.55 : 1,
              }}
            >
              {gradeLabel(win.grade)}
            </span>
            <span className={`${T.tiny} block text-bone-faint`}>
              {ages(win.ageStart, win.ageEnd)}
            </span>
          </button>
        ))}
      </div>

      {/* What the four heights mean. Hoverable, because the definition is a
          sentence and a sentence per grade under the strip is a paragraph
          nobody asked for — but a reader who wonders what "Convergence"
          claims about their life must be one movement away from the answer. */}
      <div className={`${T.tiny} mt-3 flex flex-wrap gap-x-7 gap-y-2 text-bone-faint`}>
        {(
          ["background", "active", "convergence", "turning-point"] as Grade[]
        ).map((g) => (
          <span
            key={g}
            onMouseEnter={show({ kind: "grade", grade: g }, "below")}
            className="flex cursor-default items-center gap-2"
          >
            <span
              className="inline-block w-4"
              style={{
                background: GRADE_TINT[g],
                height: Math.max(2, GRADE_HEIGHT[g] / 4),
              }}
            />
            {gradeLabel(g)}
          </span>
        ))}
        <span className="text-bone-faint/70">
          how much converges here — never how large the years will feel
        </span>
      </div>

      {/* The interpretive vocabulary, stated once and in the open.
          These three were in the legend, at legend size, doing the hardest
          work on the page: they are the difference between "Pluto squares your
          nodes" and something a reader can recognise happening to them. */}
      <div className="mt-16">
        <p className={`${T.tiny} text-bone-soft`}>Three ways growth appears</p>
        <ul className="mt-5 grid gap-x-10 gap-y-7 md:grid-cols-3">
          {PRIMARY_ORIENTATIONS.map((o) => {
            const f = orientationFrame(o);
            return (
              <li key={o}>
                <p className="flex items-baseline gap-3">
                  <ShapeKey orientation={o} />
                  <span className="text-[1.0625rem] font-light text-bone">
                    {f.short}
                  </span>
                  <span className={`${T.tiny} text-bone-faint`}>
                    {f.territory}
                  </span>
                </p>
                <p className={`${T.note} mt-2`}>{f.plain}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* LEVEL 3 — the astrology, on request.
          Folded because five planetary lanes are the largest object on the
          page and mean nothing to a reader who has not been told what Neptune
          is for. Everything above answers the question; this answers "how do
          you know". */}
      <div className="mt-16 border-t border-rule pt-6">
        <button
          type="button"
          onClick={() => setEvidence((v) => !v)}
          className={`${T.micro} text-patina-dim transition-colors hover:text-patina`}
        >
          {evidence
            ? "Hide the signals ↑"
            : `Why these periods stand out · ${lanes.length} planets and the nodal cycle ↓`}
        </button>

        {evidence ? (
          <div className="mt-8">
            {/* The rhythm — the one cycle everybody shares.
                Named for what it does rather than for what it is made of, with
                the technical name kept beneath it: "Nodal cycle" is meaningless
                to almost everyone, and a row nobody can read is a row that
                makes the four beneath it look equally undecodable.

                Every mark is drawn inside a transparent hit area filling the
                lane's height. The marks themselves are one to three pixels,
                which is right for the density and impossible to point at. */}
            <Lane name="Life-direction cycle" gloss="lunar nodes" tint="var(--color-bone-faint)">
              {beats.map((b) => (
                <span
                  key={`${b.kind}-${b.ordinal}`}
                  onMouseEnter={show({ kind: "beat", beat: b })}
                  className="absolute inset-y-0 -translate-x-1/2 cursor-default"
                  style={{ left: x(b.age), width: 11 }}
                >
                  <span
                    className="absolute left-1/2 block -translate-x-1/2"
                    style={{
                      top: b.kind === "square" ? 7 : 3,
                      width: b.kind === "square" ? 1 : 2,
                      height: b.kind === "square" ? 6 : 14,
                      background: BEAT_TINT[b.kind],
                      opacity: b.age < age ? 0.4 : 1,
                    }}
                  />
                </span>
              ))}
            </Lane>

            <p className={`${T.note} mt-3 mb-8 ml-48 max-w-xl`}>
              Recurring checkpoints around ages 9, 18, 28, 37, 46 and 56, when
              the relationship between your familiar path and your growth
              direction tends to become visible. These ages are the same for
              everybody — they come from the Moon&rsquo;s orbit, not from your
              chart — so they are context here rather than a finding.
            </p>

            {/* One lane per planet, carrying only axis-relevant transits.
                A planet's bar is drawn only when it is doing something to the
                trajectory: drawing every transit would be a chart of the
                person's whole ephemeris with the argument buried inside it,
                which is the thing this page exists instead of. */}
            {lanes.map((planet) => {
              const fn = processOf(planet);
              return (
                <Lane
                  key={planet}
                  name={planet}
                  role={fn.role}
                  gloss={fn.shortGloss}
                  tint={bodyColor(planet)}
                  glyph
                  quiet={QUIET_LANES.has(planet)}
                >
                  {activations
                    .filter((a) => a.planet === planet)
                    .map((a) => (
                      <span
                        key={a.id}
                        onMouseEnter={show({ kind: "activation", activation: a })}
                        className="absolute inset-y-0 cursor-default"
                        style={{
                          left: x(a.ageStart),
                          width: w(a.ageStart, a.ageEnd),
                        }}
                      >
                        <Mark a={a} quiet={QUIET_LANES.has(planet)} />
                      </span>
                    ))}
                </Lane>
              );
            })}

            {/* Thickness, explained as what it is FOR rather than as what it
                measures. "Lands on the axis itself" is precise and asks the
                reader to hold a piece of technique before they can use the
                chart; strong and supporting evidence is a distinction they
                already own, and the mechanism follows for whoever wants it. */}
            <div
              className={`${T.tiny} mt-6 ml-48 flex flex-wrap gap-x-7 gap-y-2 text-bone-faint`}
            >
              <span className="flex items-center gap-2">
                <span className="inline-block h-2 w-5 bg-bone-faint" />
                thick = direct signal
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-[3px] w-5 bg-bone-faint" />
                thin = supporting signal
              </span>
            </div>
            <p className={`${T.note} mt-3 ml-48 max-w-xl`}>
              Direct signals contact the nodal axis itself; supporting signals
              activate the structures around it — the houses the nodes sit in,
              the planets that rule them, and anything standing on that ground.
              Both are real evidence; only one of them can reorganise the
              direction rather than load it.
            </p>
          </div>
        ) : null}
      </div>

      {tip ? <ActivationTooltip tip={tip} /> : null}
    </div>
  );
}

/**
 * One labelled row of the evidence. The label column is what aligns the lanes.
 *
 * The label is a planet AND a verb — "Saturn · Commit" — with three words of
 * gloss beneath. A row that says only "Saturn" is asking the reader to
 * remember something they may never have learned, and the five rows together
 * then read as a wall of names to be decoded rather than as five different
 * kinds of pressure.
 */
function Lane({
  name,
  role,
  gloss,
  tint,
  glyph,
  quiet,
  children,
}: {
  name: string;
  role?: string;
  gloss?: string;
  tint: string;
  glyph?: boolean;
  quiet?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-stretch gap-4 border-b border-rule-faint">
      <div className="w-44 shrink-0 py-1.5" style={{ opacity: quiet ? 0.55 : 1 }}>
        <p className={`${T.tiny} flex items-center gap-1.5`} style={{ color: tint }}>
          {glyph ? (
            <span className="glyph text-[0.875rem]">{bodyGlyph(name)}</span>
          ) : null}
          {name}
          {role ? <span className="text-bone-soft">· {role}</span> : null}
        </p>
        {gloss ? (
          <p className="mt-1 text-[0.6875rem] leading-tight text-bone-faint/80">
            {gloss}
          </p>
        ) : null}
      </div>
      <div className="relative grow self-center py-1.5">
        <div className="relative h-5">{children}</div>
      </div>
    </div>
  );
}
