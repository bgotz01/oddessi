"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import {
  Figure,
  NeedsFullName,
  NumberRow,
  pinnacleAges,
  pinnacleYears,
} from "@/components/numerology/parts";
import NumerologyCycleDrawer, {
  isShowing,
  type CycleSubject,
} from "@/components/numerology/cycle-drawer";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useNumerologyReading } from "@/lib/numerology/use-reading";
import { NUMBERS } from "@/lib/numerology/lexicon";
import {
  pinnacleInForce,
  type EssenceYear,
  type NumerologyReading,
  type Pinnacle,
} from "@/lib/numerology/numbers";

/**
 * The numbers that move.
 *
 * Three clocks at three speeds, and the reason they are on one page is that
 * they are only legible against each other: a personal year lands differently
 * inside one pinnacle than another, and the essence is the thing that explains
 * why two runs of the same personal year felt nothing alike.
 *
 * None of them is a transit. Nothing is overhead and nothing is measured — the
 * date and the spelling of a name were fixed at birth, so every date on this
 * page was knowable from the first day. That is the whole difference between
 * this section and the Western one, and it is worth keeping in view.
 *
 * The four chapters have their own page. They are the slowest clock here by an
 * order of magnitude — decades against a year against a letter — and printing
 * all four in full on a page about what is *running* put three chapters that
 * are over or not yet begun in the middle of it. What stays is the one in
 * force, which is the only part of the pinnacles this page's argument needs.
 */

export default function NumerologyCyclesPage() {
  const { chart } = useChart();
  const { setPageContext } = useChat();
  const reading = useNumerologyReading(chart);
  const [subject, setSubject] = useState<CycleSubject | null>(null);

  useEffect(() => {
    if (!reading) return;

    const current = reading.pinnacles.find((p) =>
      pinnacleInForce(p, reading.age),
    );
    const essence = reading.essence?.find((y) => y.age === reading.age);

    setPageContext({
      _description: "Numerology — the moving numbers",
      age: reading.age,
      personalYear: {
        year: reading.personalYear.year,
        number: `${reading.personalYear.number} — ${NUMBERS[reading.personalYear.number].title}`,
        placeInRun: `${reading.personalYear.number} of 9, run opened ${reading.personalYear.run[0].year}`,
      },
      currentPinnacle: current
        ? {
          chapter: current.index,
          ages: `${current.startAge}–${current.endAge ?? "on"}`,
          pinnacle: `${current.number} — ${NUMBERS[current.number].title}`,
          challenge: `${current.challenge} — ${NUMBERS[current.challenge].title}`,
          _note:
            "The other three chapters are on /numerology/pinnacles, which the page links to.",
        }
        : null,
      currentEssence: essence
        ? {
          number: `${essence.number} — ${NUMBERS[essence.number].title}`,
          transitLetters: essence.transits.map(
            (t) => `${t.letter} (${t.value}) from ${t.part}, ages ${t.startAge}–${t.endAge}`,
          ),
        }
        : "Withheld — needs the full birth name.",
    });

    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reading]);

  return (
    <div className="mx-auto w-full max-w-5xl px-8 pb-24">
      <PageTitle
        eyebrow={chart ? chart.name : "No chart"}
        title="Numerological Cycles"
        lede="Three clocks: the year, which turns on 1 January and runs one to
              nine; the pinnacle, which holds for a chapter of decades; and the
              essence, which spells the name out one letter at a time. All three
              were fixed at birth — nothing here is a forecast, only a position."
      />

      <p className="mb-10">
        <Link
          href="/numerology"
          className="datum text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase transition-colors hover:text-patina"
        >
          ← Back to the fixed numbers
        </Link>
      </p>

      {!chart ? (
        <p className="text-bone-soft">No chart selected.</p>
      ) : !reading ? (
        <p className="datum text-[0.75rem] text-ember">
          This chart has no readable birth date.
        </p>
      ) : (
        <>
          <Cycles reading={reading} subject={subject} onOpen={setSubject} />

          {subject ? (
            <NumerologyCycleDrawer
              reading={reading}
              subject={subject}
              onSelect={setSubject}
              onClose={() => setSubject(null)}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

function Cycles({
  reading,
  subject,
  onOpen,
}: {
  reading: NumerologyReading;
  subject: CycleSubject | null;
  onOpen: (subject: CycleSubject) => void;
}) {
  const { personalYear, pinnacles, essence, age } = reading;
  const chapter = pinnacles.find((p) => pinnacleInForce(p, age));

  return (
    <>
      {/* ── The year ──────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeading
          aside={`${personalYear.number} of 9 · run opened ${personalYear.run[0].year}`}
        >
          The Personal Year
        </SectionHeading>

        {/* The whole run, so the current year reads as a position rather than
            as a verdict — the point being what comes next, and what it follows.
            Every year in it opens, since "what is 2029 going to be" is the
            question the strip provokes and it costs nothing to answer. */}
        <div className="mb-8 grid grid-cols-9 border-y border-rule">
          {personalYear.run.map((entry) => {
            const now = entry.year === personalYear.year;
            const past = entry.year < personalYear.year;
            const open = isShowing(subject, {
              kind: "personalYear",
              year: entry.year,
            });
            return (
              <button
                key={entry.year}
                type="button"
                aria-haspopup="dialog"
                onClick={() =>
                  onOpen({ kind: "personalYear", year: entry.year })
                }
                className={`flex flex-col items-center gap-2 border-l border-rule-faint py-4 transition-colors first:border-l-0 ${now
                  ? "bg-patina-deep"
                  : open
                    ? "bg-surface"
                    : past
                      ? "hover:bg-surface-alt"
                      : "hover:bg-surface"
                  }`}
              >
                <span
                  className={`inscription text-[1.125rem] tabular-nums ${now
                    ? "text-patina"
                    : past
                      ? "text-bone-faint/60"
                      : "text-bone-soft"
                    }`}
                >
                  {entry.number}
                </span>
                <span
                  className={`datum text-[0.625rem] ${now
                    ? "text-patina"
                    : past
                      ? "text-bone-faint/40"
                      : "text-bone-faint"
                    }`}
                >
                  {entry.year}
                </span>
              </button>
            );
          })}
        </div>

        <div className="border-t border-rule">
          <NumberRow
            position="personalYear"
            n={personalYear.number}
            aside={`${personalYear.year} · age ${age}`}
            inline={false}
            open={isShowing(subject, {
              kind: "personalYear",
              year: personalYear.year,
            })}
            onToggle={() =>
              onOpen({ kind: "personalYear", year: personalYear.year })
            }
          />
        </div>

        <p className="datum mt-6 max-w-3xl text-[0.6875rem] leading-relaxed text-bone-faint">
          Master numbers are not kept here. The personal year is a place in a
          nine-year run before it is a character, and an 11 would be a run of ten
          — so the sum is reduced all the way, and this is one of only two
          numbers in the section that is.
        </p>
      </section>

      {/* ── The chapter in force ──────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeading
          aside={chapter ? `chapter ${chapter.index} of 4 · age ${age}` : "—"}
        >
          The Pinnacle
        </SectionHeading>

        {chapter ? (
          <ChapterInForce
            pinnacle={chapter}
            subject={subject}
            onOpen={onOpen}
          />
        ) : (
          <p className="text-bone-soft">
            No chapter covers this age, which should not be possible — the
            fourth never closes.
          </p>
        )}

        <p className="mt-6">
          <Link
            href="/numerology/pinnacles"
            className="datum text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase transition-colors hover:text-patina"
          >
            All four chapters →
          </Link>
        </p>
      </section>

      {/* ── The letters, as a clock ───────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeading
          aside={essence ? `ages ${essence[0].age}–${essence[essence.length - 1].age}` : "withheld"}
        >
          The Essence
        </SectionHeading>

        {essence ? (
          <EssenceTable
            years={essence}
            age={age}
            subject={subject}
            onOpen={onOpen}
          />
        ) : (
          <NeedsFullName what="The essence cycles" />
        )}
      </section>
    </>
  );
}

/**
 * The one chapter that is running, as two rows: what it offers and what it
 * costs. They are separate rows rather than one row with two numbers because
 * they are separate claims, and stacking them under a shared span is what makes
 * that legible.
 */
function ChapterInForce({
  pinnacle,
  subject,
  onOpen,
}: {
  pinnacle: Pinnacle;
  subject: CycleSubject | null;
  onOpen: (subject: CycleSubject) => void;
}) {
  return (
    <div className="border-t border-rule bg-surface">
      <div className="flex items-baseline justify-between gap-6 border-b border-rule-faint px-2 py-3">
        <span className="datum flex items-baseline gap-4 text-[0.6875rem] text-bone-faint">
          <span className="text-patina">{pinnacleAges(pinnacle)}</span>
          <span>{pinnacleYears(pinnacle)}</span>
        </span>
        <span className="datum border-l border-patina pl-2 text-[0.625rem] tracking-[0.2em] text-patina uppercase">
          In force
        </span>
      </div>

      <NumberRow
        position="pinnacle"
        n={pinnacle.number}
        aside={`Chapter ${pinnacle.index}`}
        inline={false}
        open={isShowing(subject, { kind: "pinnacle", index: pinnacle.index })}
        onToggle={() => onOpen({ kind: "pinnacle", index: pinnacle.index })}
      />
      <NumberRow
        position="challenge"
        n={pinnacle.challenge}
        aside={`Inside chapter ${pinnacle.index}`}
        inline={false}
        open={isShowing(subject, { kind: "challenge", index: pinnacle.index })}
        onToggle={() => onOpen({ kind: "challenge", index: pinnacle.index })}
      />
    </div>
  );
}

/** The transit letters year by year, with the year now marked. */
function EssenceTable({
  years,
  age,
  subject,
  onOpen,
}: {
  years: EssenceYear[];
  age: number;
  subject: CycleSubject | null;
  onOpen: (subject: CycleSubject) => void;
}) {
  const parts = years[0]?.transits.map((t) => t.part) ?? [];

  return (
    <>
      <div className="border-t border-rule">
        <div className="grid grid-cols-[4rem_4rem_1fr_3rem] items-baseline gap-x-6 border-b border-rule px-2 py-2">
          <span className="eyebrow">Year</span>
          <span className="eyebrow">Age</span>
          <span className="eyebrow">{parts.join(" · ")}</span>
          <span className="eyebrow text-right">Essence</span>
        </div>

        {years.map((year) => {
          const now = year.age === age;
          const past = year.age < age;
          const open = isShowing(subject, { kind: "essence", age: year.age });
          return (
            <button
              key={year.year}
              type="button"
              aria-haspopup="dialog"
              onClick={() => onOpen({ kind: "essence", age: year.age })}
              className={`grid w-full grid-cols-[4rem_4rem_1fr_3rem] items-baseline gap-x-6 border-b border-rule-faint px-2 py-3 text-left transition-colors ${now
                  ? "bg-patina-deep"
                  : open
                    ? "bg-surface"
                    : past
                      ? "opacity-50 hover:opacity-100 hover:bg-surface-alt"
                      : "hover:bg-surface-alt"
                }`}
            >
              <span
                className={`datum text-[0.6875rem] ${now ? "text-patina" : past ? "text-bone-faint/50" : "text-bone-faint"}`}
              >
                {year.year}
              </span>
              <span className={`datum text-[0.6875rem] ${past && !now ? "text-bone-faint/50" : "text-bone-faint"}`}>
                {year.age}
              </span>
              <span className="flex flex-wrap items-baseline gap-x-5">
                {year.transits.map((transit, i) => (
                  <span
                    key={`${transit.part}-${i}`}
                    className="flex items-baseline gap-2"
                    title={`${transit.letter} rules ages ${transit.startAge}–${transit.endAge}`}
                  >
                    <span
                      className={`inscription text-[0.9375rem] ${now ? "text-bone" : past ? "text-bone-faint/60" : "text-bone-soft"}`}
                    >
                      {transit.letter}
                    </span>
                    <span className="datum text-[0.625rem] text-bone-faint">
                      {transit.value}
                      {transit.endAge === year.age ? " · last" : ""}
                    </span>
                  </span>
                ))}
              </span>
              <span className="text-right">
                <Figure n={year.number} size="1rem" />
              </span>
            </button>
          );
        })}
      </div>

      <p className="datum mt-6 max-w-3xl text-[0.6875rem] leading-relaxed text-bone-faint">
        Each letter rules for as many years as it is worth, in spelling order,
        and each part of the name runs its own loop — so the parts fall out of
        step and the combination rarely repeats. A year marked{" "}
        <span className="text-bone-soft">last</span> is the final year of that
        letter: the following one hands over to the next.
      </p>
    </>
  );
}
