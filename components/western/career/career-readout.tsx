//components/western/career/career-readout.tsx
"use client";

import { useMemo, useState } from "react";
import {
  CAREER_CAVEAT,
  CAREER_MODEL,
  CAREER_TARGET_LABEL,
  careerBandLabel,
  careerWindowLabel,
  interpretCareerWindow,
  type CareerArchitecture,
  type CareerParts,
  type CareerPoint,
  type CareerWindow,
} from "@/lib/career";
import { CAREER_GRADE_TINT } from "@/components/western/career/career-ui";
import { T } from "@/components/western/growth/growth-ui";

/**
 * Everything the curve says in words, in three parts that hold still.
 *
 * The chart used to shift under the cursor. Two lists sat above it — one of
 * them gaining and losing a line depending on whether the hovered moment fell
 * inside a window — and a two-column evidence block sat below, rebuilt from
 * the instantaneous contact set on every pointer movement. Between them the
 * plot slid up and down the page while a reader was trying to point at it,
 * which makes the one interaction the page has almost unusable.
 *
 * The fix is the same one the Activation curve arrived at, and it is a rule
 * about WHICH INPUT each block answers to rather than a layout trick:
 *
 *   READOUT    one line, fixed height, follows the POINTER. Never wraps to a
 *              second line at any width the chart is drawn at.
 *   CROSSHAIR  the age and the month ride with the cursor inside the plot —
 *              see `career-curve`. They describe the one point being pointed
 *              at, so reading them from a corner meant looking away from the
 *              line and back, and putting them in the corner is what made the
 *              corner resize.
 *   BREAKDOWN  what the number is made of. Fixed height while closed.
 *   EVIDENCE   which contacts are responsible. Answers to SELECTION, not to
 *              hover: it is the one variable-height block left, and a list
 *              that grows from one row to five as the pointer moves is the
 *              thing that was pushing the page around. It also asks a question
 *              — which planets, on what — that only means something about a
 *              period someone has chosen to read.
 */

/**
 * The reading and the measurement, on one line, directly above the chart.
 *
 * Reading left, measurement right: what kind of moment this is, then how
 * strongly. The window's grade is stated even when there is none ("Quiet"), so
 * the line is present at every position of the pointer and the row below it
 * never moves.
 */
export function CareerReadout({
  point,
  window: w,
}: {
  point: CareerPoint | null;
  window: CareerWindow | null;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-rule pb-2.5">
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className="text-[1.0625rem] leading-tight font-light"
          style={{
            color: w ? CAREER_GRADE_TINT[w.grade] : "var(--color-bone-faint)",
          }}
        >
          {w ? careerWindowLabel(w.grade) : "Quiet"}
        </span>
        {w ? (
          <span className={`${T.tiny} text-bone-soft`}>
            {w.processes.join(" + ")}
          </span>
        ) : null}
        <span className={`${T.tiny} text-bone-faint`}>
          {point ? careerBandLabel(point.value).toLowerCase() : "—"}
        </span>
      </p>

      <p className="text-[1.375rem] leading-none font-light text-bone">
        {point ? point.value : "—"}
        <span className="ml-1 text-[0.8125rem] text-bone-faint">/ 100</span>
      </p>
    </div>
  );
}

/**
 * Where a window sits in time, in words that do not collide with the grades.
 *
 * `status` is completed / active / upcoming and `grade` is active /
 * convergence / turningPoint — so a window rendered raw read "Convergence …
 * active", with "active" meaning two different things four words apart. One of
 * the two vocabularies had to move, and this is the one nobody is attached to.
 */
const WHEN: Record<CareerWindow["status"], string> = {
  completed: "past",
  active: "in force",
  upcoming: "ahead",
};

const PART_LABEL: Record<keyof CareerParts, string> = {
  strongestContact: "Strongest contact",
  convergence: "Convergence",
  coverage: "Architecture coverage",
  persistence: "Persistence",
  multiplicity: "Contacts at once",
};

const PART_GLOSS: Record<keyof CareerParts, string> = {
  strongestContact: "The closest single contact on the architecture.",
  convergence: "How many independent bodies are in contact.",
  coverage: "How many layers of the architecture are lit at once.",
  persistence: "Retrograde returns over the same contact.",
  multiplicity: "The raw count of simultaneous contacts.",
};

/**
 * What the number is made of, on request.
 *
 * A score whose composition can be inspected is an argument; one whose
 * composition is hidden is a horoscope with a decimal point. So it cannot be
 * dropped, and it also cannot lead — five bars answer a question about the
 * model to a reader still working out what the model is for.
 *
 * Bars rather than figures, because the question is "what is carrying this"
 * and proportion answers it faster than five numbers. Each is drawn against
 * its own maximum, so a full persistence bar means persistence is doing
 * everything it can rather than that it is 20% of anything.
 */
export function CareerBreakdown({ point }: { point: CareerPoint }) {
  const [open, setOpen] = useState(false);
  const keys = Object.keys(CAREER_MODEL.parts) as (keyof CareerParts)[];

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`${T.tiny} text-bone-faint transition-colors hover:text-bone`}
      >
        {open ? "Score details ↑" : "Score details ↓"}
      </button>

      {open ? (
        <div className="mt-5 flex flex-wrap items-stretch gap-x-8 gap-y-6">
          {keys.map((key) => (
            <div key={key} className="min-w-[9rem] grow basis-0">
              <p className={`${T.tiny} flex justify-between gap-2 text-bone-faint`}>
                {PART_LABEL[key]}
                <span className="text-bone-soft">
                  {Math.round(point.parts[key])}
                </span>
              </p>
              <div className="mt-2 h-1 w-full bg-rule">
                <div
                  className="h-1 bg-patina-dim"
                  style={{
                    width: `${Math.min(
                      100,
                      (point.parts[key] / CAREER_MODEL.parts[key]) * 100,
                    )}%`,
                  }}
                />
              </div>
              <p className={`${T.note} mt-2 text-[0.8125rem]`}>
                {PART_GLOSS[key]}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * The reading of the period being read, and the evidence under it.
 *
 * Answers to SELECTION, not to hover — see the note at the top of this file.
 * A reading that recomposed itself on every pixel of pointer movement would be
 * unreadable even if the layout held still, and "what is this period asking"
 * is a question about a season someone chose, not about a sample.
 *
 * The order is the argument: what kind of period, what it is asking, how it
 * works, and only then what it could cost. A panel that opens with the trap is
 * a warning, and a warning is not what someone came to a career page for. The
 * long form — the thesis, the arenas, the raw contacts — sits behind a
 * disclosure, because a wall of prose under a chart is read once and scrolled
 * past forever.
 */
export function CareerReadingPanel({
  window: w,
  architecture,
  onClear,
}: {
  window: CareerWindow | null;
  architecture: CareerArchitecture;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const reading = useMemo(
    () => (w ? interpretCareerWindow(w, architecture) : null),
    [w, architecture],
  );

  if (!w || !reading) {
    return (
      <p className={`${T.note} mt-8 border-t border-rule pt-6`}>
        No career window in force. Click any bar under the chart to read one.
      </p>
    );
  }

  return (
    <section className="mt-8 border-t border-rule pt-6">
      <p className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <span className="flex flex-wrap items-baseline gap-x-3">
          <span className={`${T.micro} text-bone-faint`}>
            Ages {Math.round(w.ageStart)}–{Math.round(w.ageEnd)}
          </span>
          <span className={`${T.tiny} text-bone-faint/70`}>
            {w.start.slice(0, 7)} → {w.end.slice(0, 7)} · {WHEN[w.status]}
          </span>
        </span>
        <button
          type="button"
          onClick={onClear}
          className={`${T.tiny} text-bone-faint transition-colors hover:text-bone`}
        >
          Back to now →
        </button>
      </p>

      {/* The period named, with the model's own classification demoted to a
          supporting line. "Potential turning point" is an interpretation, not
          an observation, and leading with it implies an event nobody can see
          from a chart. */}
      <p className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className={`${T.phrase}`}>{reading.title}</span>
        <span
          className={`${T.tiny}`}
          style={{ color: CAREER_GRADE_TINT[w.grade] }}
        >
          {reading.classification}
        </span>
      </p>
      <p className={`${T.note} mt-1.5 text-bone-faint/80`}>{reading.phrase}</p>

      <div className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
        <div>
          <p className={`${T.tiny} text-bone-faint`}>What it is asking</p>
          <p className={`${T.lead} mt-2.5`}>{reading.theMove}</p>
        </div>
        <div>
          <p className={`${T.tiny} text-bone-faint`}>How it works</p>
          <p className={`${T.body} mt-2.5`}>{reading.mechanism}</p>
        </div>
      </div>

      {/* Noun phrases rather than the sentences, which the chat gets instead.
          A stack of four things to recognise is carried out of the room; four
          sentences saying the same are read once. */}
      <div className="mt-7 grid gap-x-10 gap-y-6 md:grid-cols-2">
        <div>
          <p className={`${T.tiny} text-patina-dim`}>The opening</p>
          <ul className={`${T.note} mt-2.5 space-y-1.5 text-bone-soft`}>
            {reading.openings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className={`${T.tiny} text-ember`}>The trap</p>
          <ul className={`${T.note} mt-2.5 space-y-1.5 text-bone-soft`}>
            {reading.traps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`${T.tiny} mt-7 text-bone-faint transition-colors hover:text-bone`}
      >
        {open ? "The full reading ↑" : "The full reading ↓"}
      </button>

      {open ? (
        <div className="mt-6 space-y-7">
          <div>
            <p className={`${T.tiny} text-bone-faint`}>The period</p>
            {reading.thesis.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className={`${T.body} mt-2.5`}>
                {paragraph}
              </p>
            ))}
          </div>

          {reading.convergence ? (
            <div>
              <p className={`${T.tiny} text-bone-faint`}>
                Several pressures at once
              </p>
              <p className={`${T.body} mt-2.5`}>
                {reading.convergence.thesis}
              </p>
              <ul className={`${T.note} mt-3 space-y-1.5 text-bone-soft`}>
                {reading.convergence.tensions.map((tension) => (
                  <li key={tension}>{tension}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Where a period tends to arrive THROUGH — never what happens in
              it. The tenth because that is the house the page is about, and
              the house the ruler of the tenth occupies because that is where
              this particular career concretely happens. */}
          <div>
            <p className={`${T.tiny} text-bone-faint`}>
              Where it tends to arrive through
            </p>
            <p className={`${T.body} mt-2.5`}>
              {reading.arenas.join(" · ")}. {reading.arenasSummary}
            </p>
            <p className={`${T.note} mt-2`}>
              {reading.mayArriveThrough.join(" · ")}
            </p>
          </div>

          <div>
            <p className={`${T.tiny} text-bone-faint`}>The contacts</p>
            <p className={`${T.note} mt-2 text-bone-faint/80`}>
              {reading.technical}
            </p>
            <ul className={`${T.note} mt-3 space-y-2 text-bone-soft`}>
              {w.contacts.map((contact) => (
                <li
                  key={contact.id}
                  className="flex flex-wrap items-baseline gap-x-3"
                >
                  <span className="text-bone">
                    {contact.planet}{" "}
                    {contact.aspect ? contact.aspect.toLowerCase() : "through"}{" "}
                    {contact.target}
                  </span>
                  <span className={`${T.tiny} text-bone-faint`}>
                    {CAREER_TARGET_LABEL[contact.targetKind]}
                  </span>
                  <span className={`${T.tiny} text-bone-faint/60`}>
                    {contact.start.slice(0, 7)} → {contact.end.slice(0, 7)}
                    {contact.segments.length > 1
                      ? ` · ${contact.segments.length} passes`
                      : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className={`${T.note} border-l-2 border-rule pl-4`}>
            {CAREER_CAVEAT}
          </p>
        </div>
      ) : null}
    </section>
  );
}
