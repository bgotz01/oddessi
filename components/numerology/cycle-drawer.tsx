"use client";

import { Fragment, useEffect, type ReactNode } from "react";
import { Block, Prose, Terms } from "@/components/study-panel";
import {
  Figure,
  MasterNote,
  pinnacleAges,
  pinnacleYears,
} from "@/components/numerology/parts";
import { NUMBERS, POSITIONS, type Position } from "@/lib/numerology/lexicon";
import { PINNACLE_READINGS } from "@/lib/numerology/pinnacles";
import { CHALLENGE_READINGS } from "@/lib/numerology/challenges";
import type { StandardNumber, ChallengeNumber } from "@/lib/numerology/numbers";
import {
  challengeWorking,
  essenceWorking,
  personalYearWorking,
  pinnacleInForce,
  pinnacleWorking,
  type CoreNumber,
  type NumerologyReading,
  type Working,
} from "@/lib/numerology/numbers";

/**
 * The reading for one moving number, in the right-hand drawer.
 *
 * The fixed numbers open inline, because four rows on a short page can each
 * unfold in place and the reader never loses the list. The moving numbers
 * cannot: a personal year is only legible against the other eight in its run, a
 * pinnacle against the other three chapters, an essence year against the years
 * either side — so every one of these panels wants to show a table beside the
 * passage, and a table shoved between two rows of the table it belongs to is
 * unreadable. The drawer gives it a column of its own and leaves the page
 * standing behind it.
 *
 * Everything below the passage is COMPUTED. There is no third table of prose
 * here and there should not be: the character of a number is written once in
 * the lexicon, the position frames it, and what this drawer adds is arithmetic
 * and neighbours — the sum that produced the number, and what it follows.
 */

export type CycleSubject =
  | { kind: "personalYear"; year: number }
  | { kind: "pinnacle"; index: 1 | 2 | 3 | 4 }
  | { kind: "challenge"; index: 1 | 2 | 3 | 4 }
  | { kind: "essence"; age: number };

/**
 * A subject as one comparable string, so a page can ask "is the drawer showing
 * this row?" without destructuring a union at every call site.
 */
export function subjectKey(subject: CycleSubject): string {
  if (subject.kind === "personalYear") return `year-${subject.year}`;
  if (subject.kind === "essence") return `essence-${subject.age}`;
  return `${subject.kind}-${subject.index}`;
}

/** True when the drawer is open on exactly this subject. */
export function isShowing(
  open: CycleSubject | null,
  subject: CycleSubject,
): boolean {
  return open !== null && subjectKey(open) === subjectKey(subject);
}

/** Where a subject is a number in a position, with its span and its working. */
interface Resolved {
  position: Position;
  n: CoreNumber;
  /** The years it holds for, printed under the title. */
  span: string;
  inForce: boolean;
  working: Working;
  /** The convention that governs the last step, said in one sentence. */
  convention: string;
}

function resolve(
  reading: NumerologyReading,
  subject: CycleSubject,
): Resolved | null {
  const { birth, age } = reading;

  if (subject.kind === "personalYear") {
    const entry = reading.personalYear.run.find((r) => r.year === subject.year);
    if (!entry) return null;
    return {
      position: "personalYear",
      n: entry.number,
      span: `1 January – 31 December ${entry.year}`,
      inForce: entry.year === reading.personalYear.year,
      working: personalYearWorking(birth, entry.year),
      convention:
        "Reduced all the way. A run of nine has no room for an 11, so this is one of only two numbers in the section that gives up its masters.",
    };
  }

  if (subject.kind === "essence") {
    const year = reading.essence?.find((y) => y.age === subject.age);
    if (!year) return null;
    return {
      position: "essence",
      n: year.number,
      span: `${year.year} · age ${year.age}`,
      inForce: year.age === age,
      working: essenceWorking(year),
      convention:
        "11 and 22 are kept. 33 is not reachable from letters, since no combination of transit values sums to it after reduction.",
    };
  }

  const pinnacle = reading.pinnacles.find((p) => p.index === subject.index);
  if (!pinnacle) return null;

  const span = `${pinnacleAges(pinnacle)} · ${pinnacleYears(pinnacle)}`;
  const inForce = pinnacleInForce(pinnacle, age);

  if (subject.kind === "pinnacle") {
    return {
      position: "pinnacle",
      n: pinnacle.number,
      span,
      inForce,
      working: pinnacleWorking(birth, pinnacle.index),
      convention:
        "Masters are kept. The one place a master is flattened is the length of the first chapter, or a Life Path 33 would close it before birth.",
    };
  }

  return {
    position: "challenge",
    n: pinnacle.challenge,
    span,
    inForce,
    working: challengeWorking(birth, pinnacle.index),
    convention:
      "A difference rather than a sum, so 0 is a real answer, and never a master — a challenge of 11 would be an obstacle of 2 wearing a costume.",
  };
}

export default function NumerologyCycleDrawer({
  reading,
  subject,
  onSelect,
  onClose,
}: {
  reading: NumerologyReading;
  subject: CycleSubject;
  /** Retargets the drawer, so the tables inside it are navigable. */
  onSelect: (next: CycleSubject) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const resolved = resolve(reading, subject);
  if (!resolved) return null;

  const place = POSITIONS[resolved.position];
  const entry = NUMBERS[resolved.n];

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-void/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${place.label} ${resolved.n}`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-rule bg-surface shadow-2xl"
      >
        {/* Header — the number, where it sits, and how long it holds. */}
        <div className="shrink-0 border-b border-rule px-8 py-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-baseline gap-5">
              <Figure n={resolved.n} size="2.5rem" />
              <div>
                <p className="inscription text-[0.8125rem] text-bone">
                  {place.label}
                </p>
                <p className="mt-1.5 text-[1.25rem] leading-tight text-bone-soft">
                  {entry.title}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>

          <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-rule-faint pt-4">
            <span className="datum text-[0.6875rem] text-bone-faint">
              {resolved.span}
            </span>
            {resolved.inForce ? (
              <span className="datum border-l border-patina pl-2 text-[0.625rem] tracking-[0.2em] text-patina uppercase">
                In force
              </span>
            ) : null}
          </div>
        </div>

        {/* Body — the reading first, then the evidence. */}
        <div className="space-y-8 px-8 py-8">
          {subject.kind === "pinnacle" ? (
            <PinnacleBody n={resolved.n} />
          ) : subject.kind === "challenge" ? (
            <ChallengeBody n={resolved.n} />
          ) : (
            <>
              <Block title={`${resolved.n} · ${entry.title}`}>
                <Prose>{entry.note}</Prose>
                <div className="mt-4">
                  <Terms terms={entry.terms} />
                </div>
                <MasterNote n={resolved.n} />
              </Block>
            </>
          )}

          <Block title="How it was taken">
            <WorkingLine working={resolved.working} />
            <p className="datum mt-5 text-[0.6875rem] leading-relaxed text-bone-faint">
              {resolved.convention}
            </p>
          </Block>

          <Block title="Where it sits">
            {subject.kind === "personalYear" ? (
              <TheRun reading={reading} year={subject.year} onSelect={onSelect} />
            ) : subject.kind === "essence" ? (
              <TheLetters reading={reading} age={subject.age} onSelect={onSelect} />
            ) : (
              <TheChapters
                reading={reading}
                subject={subject}
                onSelect={onSelect}
              />
            )}
          </Block>
        </div>

        <div className="mt-auto h-[3px] w-full bg-patina-dim opacity-50" />
      </div>
    </>
  );
}

/**
 * The sum, printed rather than asserted.
 *
 * Differences are shown larger operand first. The value is an absolute one, so
 * either order is arithmetically true and only one of them reads as arithmetic.
 */
function WorkingLine({ working }: { working: Working }) {
  const { operator, total, result, keepsMasters } = working;
  const operands =
    operator === "−"
      ? [...working.operands].sort((a, b) => b.value - a.value)
      : working.operands;

  return (
    <div>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-5">
        {operands.map((operand, i) => (
          <Fragment key={`${operand.label}-${i}`}>
            {i > 0 ? <Sign>{operator}</Sign> : null}
            <Term value={operand.value} label={operand.label} />
          </Fragment>
        ))}

        <Sign>=</Sign>
        {total === result ? (
          <span className="flex flex-col items-center gap-1.5">
            <Figure n={result} size="1.375rem" />
            <span className="datum text-[0.625rem] text-bone-faint">
              {keepsMasters && result > 9 ? "kept whole" : "the number"}
            </span>
          </span>
        ) : (
          <>
            <Term value={total} label="sum" />
            <Sign>→</Sign>
            <span className="flex flex-col items-center gap-1.5">
              <Figure n={result} size="1.375rem" />
              <span className="datum text-[0.625rem] text-bone-faint">
                reduced
              </span>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function Sign({ children }: { children: string }) {
  return (
    <span className="datum pb-5 text-[0.8125rem] text-bone-faint">
      {children}
    </span>
  );
}

function Term({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex flex-col items-center gap-1.5">
      <span className="inscription text-[1.375rem] tabular-nums text-bone-soft">
        {value}
      </span>
      <span className="datum text-[0.625rem] whitespace-nowrap text-bone-faint">
        {label}
      </span>
    </span>
  );
}

/** A row in one of the drawer's tables. Clicking it retargets the drawer. */
function PickerRow({
  now,
  onClick,
  children,
}: {
  now: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-rule-faint px-2 py-3 text-left transition-colors ${now ? "bg-surface-alt" : "hover:bg-surface-alt"
        }`}
    >
      {children}
    </button>
  );
}

/** The nine years of the run, with the one being read marked. */
function TheRun({
  reading,
  year,
  onSelect,
}: {
  reading: NumerologyReading;
  year: number;
  onSelect: (next: CycleSubject) => void;
}) {
  return (
    <>
      <div className="border-t border-rule">
        {reading.personalYear.run.map((entry) => {
          const here = entry.year === year;
          const past = entry.year < reading.personalYear.year;
          return (
            <PickerRow
              key={entry.year}
              now={here}
              onClick={() => onSelect({ kind: "personalYear", year: entry.year })}
            >
              <span
                className={`inscription text-[1.0625rem] tabular-nums ${here ? "text-patina" : past ? "text-bone-faint" : "text-bone-soft"
                  }`}
              >
                {entry.number}
              </span>
              <span
                className={`text-[0.9375rem] ${here ? "text-bone" : "text-bone-soft"}`}
              >
                {NUMBERS[entry.number].title}
              </span>
              <span className="datum text-[0.625rem] text-bone-faint">
                {entry.year}
                {entry.year === reading.personalYear.year ? " · now" : ""}
              </span>
            </PickerRow>
          );
        })}
      </div>
      <p className="datum mt-4 text-[0.6875rem] leading-relaxed text-bone-faint">
        The run opened in {reading.personalYear.run[0].year} and closes at the
        end of {reading.personalYear.run[8].year}. Every year in it was knowable
        on the day of birth — the sequence is fixed and only the position moves.
      </p>
    </>
  );
}

/** The four chapters, and the cross-link between what one offers and costs. */
function TheChapters({
  reading,
  subject,
  onSelect,
}: {
  reading: NumerologyReading;
  subject: Extract<CycleSubject, { kind: "pinnacle" | "challenge" }>;
  onSelect: (next: CycleSubject) => void;
}) {
  const other = subject.kind === "pinnacle" ? "challenge" : "pinnacle";
  const chapter = reading.pinnacles.find((p) => p.index === subject.index);

  return (
    <>
      <div className="border-t border-rule">
        {reading.pinnacles.map((pinnacle) => {
          const here = pinnacle.index === subject.index;
          const n =
            subject.kind === "pinnacle" ? pinnacle.number : pinnacle.challenge;
          return (
            <PickerRow
              key={pinnacle.index}
              now={here}
              onClick={() => onSelect({ ...subject, index: pinnacle.index })}
            >
              <span
                className={`inscription text-[1.0625rem] tabular-nums ${here ? "text-patina" : "text-bone-soft"
                  }`}
              >
                {n}
              </span>
              <span
                className={`text-[0.9375rem] ${here ? "text-bone" : "text-bone-soft"}`}
              >
                {NUMBERS[n].title}
              </span>
              <span className="datum text-[0.625rem] text-bone-faint">
                {pinnacleAges(pinnacle)}
                {pinnacleInForce(pinnacle, reading.age) ? " · now" : ""}
              </span>
            </PickerRow>
          );
        })}
      </div>

      {chapter ? (
        <button
          type="button"
          onClick={() => onSelect({ kind: other, index: chapter.index })}
          className="datum mt-5 text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase transition-colors hover:text-patina"
        >
          {subject.kind === "pinnacle"
            ? `The challenge inside chapter ${chapter.index} — ${chapter.challenge} →`
            : `The pinnacle it sits under — ${chapter.number} →`}
        </button>
      ) : null}

      <p className="datum mt-4 text-[0.6875rem] leading-relaxed text-bone-faint">
        The chapters are read in pairs: what is available during one and what it
        costs are taken from the same two components of the birth date, one added
        and one subtracted, which is why the challenge so often reads as the
        pinnacle seen from underneath.
      </p>
    </>
  );
}

/** The letters ruling this year, when each hands over, and the years either side. */
function TheLetters({
  reading,
  age,
  onSelect,
}: {
  reading: NumerologyReading;
  age: number;
  onSelect: (next: CycleSubject) => void;
}) {
  const years = reading.essence ?? [];
  const year = years.find((y) => y.age === age);
  if (!year) return null;

  return (
    <>
      <div className="mb-8 space-y-3">
        {year.transits.map((transit, i) => {
          const left = transit.endAge - age;
          return (
            <div
              key={`${transit.part}-${i}`}
              className="flex items-baseline justify-between gap-4 border-b border-rule-faint pb-3"
            >
              <span className="flex items-baseline gap-3">
                <span className="inscription text-[1.0625rem] text-bone">
                  {transit.letter}
                </span>
                <span className="datum text-[0.625rem] text-bone-faint">
                  worth {transit.value}
                </span>
                <span className="text-[0.9375rem] text-bone-soft">
                  {transit.part}
                </span>
              </span>
              <span className="datum text-right text-[0.625rem] text-bone-faint">
                ages {transit.startAge}–{transit.endAge}
                {left === 0
                  ? " · hands over next year"
                  : ` · ${left} more year${left === 1 ? "" : "s"}`}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-rule">
        {years.map((entry) => (
          <PickerRow
            key={entry.age}
            now={entry.age === age}
            onClick={() => onSelect({ kind: "essence", age: entry.age })}
          >
            <span
              className={`inscription text-[1.0625rem] tabular-nums ${entry.age === age ? "text-patina" : "text-bone-soft"
                }`}
            >
              {entry.number}
            </span>
            <span className="flex flex-wrap gap-x-3 text-[0.9375rem] text-bone-soft">
              {entry.transits.map((t, i) => (
                <span key={`${t.part}-${i}`} className="inscription">
                  {t.letter}
                </span>
              ))}
            </span>
            <span className="datum text-[0.625rem] text-bone-faint">
              {entry.year}
              {entry.age === reading.age ? " · now" : ""}
            </span>
          </PickerRow>
        ))}
      </div>

      <p className="datum mt-4 text-[0.6875rem] leading-relaxed text-bone-faint">
        Each part of the name runs its own loop, of as many years as the part is
        worth in total, so the parts fall out of step and the combination rarely
        repeats. A year changes when any one letter hands over, not all of them.
      </p>
    </>
  );
}

/**
 * The body for a pinnacle subject — position-specific interpretation, no
 * generic "the place" preamble.
 */
function PinnacleBody({ n }: { n: CoreNumber }) {
  const entry = NUMBERS[n];
  const reading = PINNACLE_READINGS[n as StandardNumber];

  return (
    <>
      {/* The number's name, brief character, and terms — compressed to a header */}
      <div className="border-b border-rule-faint pb-6">
        <p className="inscription text-[0.8125rem] text-bone-faint mb-3">
          {entry.title}
        </p>
        <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
          {entry.note}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {entry.terms.map((term) => (
            <span
              key={term}
              className="datum border border-rule px-2 py-0.5 text-[0.5625rem] tracking-[0.18em] uppercase text-bone-faint"
            >
              {term}
            </span>
          ))}
        </div>
        <MasterNote n={n} />
      </div>

      {/* What the chapter is */}
      <Block title="The chapter">
        <Prose>{reading.chapter}</Prose>
      </Block>

      {/* What it opens up */}
      <Block title="What becomes available">
        <Prose>{reading.available}</Prose>
      </Block>

      {/* What it costs */}
      <Block title="The cost">
        <Prose>{reading.cost}</Prose>
      </Block>

      {/* The recurring question */}
      <div className="border-l-2 border-patina-dim pl-5 py-1">
        <p className="text-[1.0rem] leading-relaxed text-bone-soft italic">
          {reading.question}
        </p>
      </div>
    </>
  );
}

/**
 * The body for a challenge subject — obstacle-focused interpretation, no
 * generic "the place" preamble.
 */
function ChallengeBody({ n }: { n: CoreNumber }) {
  const entry = NUMBERS[n];
  const reading = CHALLENGE_READINGS[n as ChallengeNumber];

  return (
    <>
      {/* The number's name and brief character */}
      <div className="border-b border-rule-faint pb-6">
        <p className="inscription text-[0.8125rem] text-bone-faint mb-3">
          {entry.title}
        </p>
        <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
          {entry.note}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {entry.terms.map((term) => (
            <span
              key={term}
              className="datum border border-rule px-2 py-0.5 text-[0.5625rem] tracking-[0.18em] uppercase text-bone-faint"
            >
              {term}
            </span>
          ))}
        </div>
        <MasterNote n={n} />
      </div>

      {/* What the obstacle is */}
      <Block title="The obstacle">
        <Prose>{reading.obstacle}</Prose>
      </Block>

      {/* Where it shows up */}
      <Block title="Where it appears">
        <Prose>{reading.terrain}</Prose>
      </Block>

      {/* Working with it */}
      <Block title="Working with it">
        <Prose>{reading.working}</Prose>
      </Block>
    </>
  );
}
