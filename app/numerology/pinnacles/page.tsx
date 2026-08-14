"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import {
  NumberRow,
  pinnacleAges,
  pinnacleYears,
} from "@/components/numerology/parts";
import NumerologyCycleDrawer, {
  isShowing,
  type CycleSubject,
} from "@/components/numerology/cycle-drawer";
import NumerologyReferenceDrawer, {
  type ReferenceTarget,
} from "@/components/numerology/reference-drawer";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useNumerologyReading } from "@/lib/numerology/use-reading";
import { NUMBERS } from "@/lib/numerology/lexicon";
import {
  pinnacleInForce,
  type NumerologyReading,
  type Pinnacle,
} from "@/lib/numerology/numbers";

/**
 * The four chapters, in full.
 *
 * Split off the cycles page for a reason of scale rather than of tidiness. The
 * other two clocks there turn inside a life — a personal year is over in twelve
 * months, a transit letter in a handful — and the pinnacles are the only thing
 * in the section that divides the life itself. Four of them cover the whole
 * span, which means three of the four are always either finished or not yet
 * begun, and a page about what is *running* had three quarters of its longest
 * section describing neither.
 *
 * Here they can be read the way they are meant to be: as one shape, whole, with
 * the position of today marked on it. The cycles page keeps the chapter in
 * force and links across.
 */

export default function PinnaclesPage() {
  const { chart } = useChart();
  const { setPageContext } = useChat();
  const reading = useNumerologyReading(chart);
  const [subject, setSubject] = useState<CycleSubject | null>(null);
  const [refTarget, setRefTarget] = useState<ReferenceTarget | null>(null);

  useEffect(() => {
    if (!reading) return;

    setPageContext({
      _description: "Numerology — the four pinnacles",
      age: reading.age,
      lifePath: `${reading.lifePath} — ${NUMBERS[reading.lifePath].title}`,
      _note:
        "The first chapter closes at 36 minus the Life Path, the next two run " +
        "nine years each, and the fourth does not close. The challenge in each " +
        "is a difference rather than a sum, which is why it can be 0.",
      chapters: reading.pinnacles.map((p) => ({
        chapter: p.index,
        ages: `${p.startAge}–${p.endAge ?? "on"}`,
        years: `${p.startYear}–${p.endYear ?? "on"}`,
        inForce: pinnacleInForce(p, reading.age),
        pinnacle: `${p.number} — ${NUMBERS[p.number].title}`,
        challenge: `${p.challenge} — ${NUMBERS[p.challenge].title}`,
      })),
    });

    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reading]);

  return (
    <div className="mx-auto w-full max-w-5xl px-8 pb-24">
      <PageTitle
        eyebrow={chart ? chart.name : "No chart"}
        title="The Pinnacles"
        lede="A life divided into four chapters."
      />



      {!chart ? (
        <p className="text-bone-soft">No chart selected.</p>
      ) : !reading ? (
        <p className="datum text-[0.75rem] text-ember">
          This chart has no readable birth date.
        </p>
      ) : (
        <>
          <Chapters reading={reading} subject={subject} onOpen={setSubject} onOpenRef={setRefTarget} />

          {subject ? (
            <NumerologyCycleDrawer
              reading={reading}
              subject={subject}
              onSelect={setSubject}
              onClose={() => setSubject(null)}
            />
          ) : null}

          {refTarget ? (
            <NumerologyReferenceDrawer
              target={refTarget}
              onNavigate={setRefTarget}
              onClose={() => setRefTarget(null)}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

function Chapters({
  reading,
  subject,
  onOpen,
  onOpenRef,
}: {
  reading: NumerologyReading;
  subject: CycleSubject | null;
  onOpen: (subject: CycleSubject) => void;
  onOpenRef: (target: ReferenceTarget) => void;
}) {
  const { pinnacles, age, lifePath } = reading;

  return (
    <>
      <section className="mb-16">
        <SectionHeading aside={`age ${age} · Life Path ${lifePath}`}>
          The Whole Span
        </SectionHeading>
        <Spine pinnacles={pinnacles} age={age} onOpen={onOpen} />        <p className="datum mt-6 max-w-3xl text-[0.6875rem] leading-relaxed text-bone-faint">
          The first chapter closes at 36 minus the Life Path — {lifePath} here,
          so it runs to {pinnacles[0].endAge} — and the next two are nine years
          each. The fourth has no end, which is not an oversight: three chapters
          divide the part of a life the method has something to say about, and
          the fourth is the rest of it.
        </p>
      </section>

      <section className="mb-16">
        <SectionHeading
          aside={
            <span className="flex items-baseline gap-5">
              <span className="text-bone-faint">4 chapters · 8 numbers</span>
              <button
                type="button"
                onClick={() => onOpenRef({ position: "pinnacle", number: 1 })}
                className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-patina"
              >
                Browse →
              </button>
            </span>
          }
        >
          Chapter by Chapter
        </SectionHeading>

        <div className="border-t border-rule">
          {pinnacles.map((pinnacle) => (
            <Chapter
              key={pinnacle.index}
              pinnacle={pinnacle}
              current={pinnacleInForce(pinnacle, age)}
              age={age}
              subject={subject}
              onOpen={onOpen}
            />
          ))}
        </div>

        <p className="datum mt-6 max-w-3xl text-[0.6875rem] leading-relaxed text-bone-faint">
          The numbers are month+day, day+year, the first two added, and
          month+year. The challenges are the absolute differences of the same
          pairs, reduced without masters — a challenge of 11 would be an obstacle
          of 2 wearing a costume. Open any row for the sum it came from.
        </p>
      </section>
    </>
  );
}

/**
 * The four chapters as four equal columns, with today marked.
 *
 * Equal widths rather than proportional, because the visual symmetry is easier
 * to read at a glance than accurate length encoding. The fourth is open-ended;
 * the "today" marker is positioned across the full span from birth to horizon.
 */
function Spine({
  pinnacles,
  age,
  onOpen,
}: {
  pinnacles: Pinnacle[];
  age: number;
  onOpen: (subject: CycleSubject) => void;
}) {
  const fourth = pinnacles[3];
  const horizon = Math.max(age, fourth.startAge) + 12;

  return (
    <div>
      <div className="flex h-20 w-full border-y border-rule">
        {pinnacles.map((p) => {
          const current = pinnacleInForce(p, age);
          const done = p.endAge !== null && age > p.endAge;
          return (
            <button
              key={p.index}
              type="button"
              aria-haspopup="dialog"
              aria-label={`Chapter ${p.index}, ${pinnacleAges(p)}`}
              onClick={() => onOpen({ kind: "pinnacle", index: p.index })}
              className={`group flex w-1/4 flex-col items-center justify-center gap-1.5 border-l border-rule-faint transition-colors first:border-l-0 ${current
                ? "bg-patina-deep"
                : done
                  ? "hover:bg-surface-alt"
                  : "hover:bg-surface"
                }`}
            >
              <span
                className={`inscription text-[1.25rem] tabular-nums transition-colors ${current
                  ? "text-patina"
                  : done
                    ? "text-bone-faint group-hover:text-bone-soft"
                    : "text-bone-soft group-hover:text-bone"
                  }`}
              >
                {p.number}
              </span>
              <span
                className={`datum text-[0.5625rem] transition-colors ${current ? "text-patina" : done ? "text-bone-faint/50" : "text-bone-faint"
                  }`}
              >
                {p.startAge}
                {p.endAge === null ? "+" : `–${p.endAge}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Today marker — positioned within the equal-width columns. */}
      <div className="relative h-6">
        {(() => {
          // With equal-width columns each chapter occupies exactly 25% of the
          // bar regardless of its actual age span. To place the marker correctly
          // we find which chapter the current age belongs to, compute how far
          // through that chapter we are (0–1), then convert to bar-percentage:
          //   column_start_pct + progress_within_column * 25
          const idx = pinnacles.findIndex(
            (p) => age >= p.startAge && (p.endAge === null || age <= p.endAge),
          );
          // Fallback: clamp to last column if age is past all chapters.
          const col = idx >= 0 ? idx : pinnacles.length - 1;
          const p = pinnacles[col];
          const colSpan = (p.endAge ?? horizon) - p.startAge;
          const progress = colSpan > 0 ? (age - p.startAge) / colSpan : 0;
          const pct = col * 25 + Math.min(progress, 1) * 25;

          return (
            <div
              className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${pct}%` }}
            >
              <span aria-hidden className="h-3 w-px bg-patina" />
              <span className="datum mt-0.5 text-[0.5625rem] whitespace-nowrap text-patina">
                age {age}
              </span>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

/**
 * One chapter: the span, then what it offers and what it costs.
 *
 * Two rows rather than one row with two numbers, because they are two separate
 * claims and a reader should be able to disagree with one of them.
 */
function Chapter({
  pinnacle,
  current,
  age,
  subject,
  onOpen,
}: {
  pinnacle: Pinnacle;
  current: boolean;
  age: number;
  subject: CycleSubject | null;
  onOpen: (subject: CycleSubject) => void;
}) {
  const done = pinnacle.endAge !== null && age > pinnacle.endAge;

  return (
    <div
      className={`border-l-2 transition-colors ${current ? "border-patina bg-surface" : "border-transparent"
        }`}
    >
      <div className="flex items-baseline justify-between gap-6 border-b border-rule-faint px-2 py-3">
        <span className="datum flex items-baseline gap-4 text-[0.6875rem]">
          <span
            className={`inscription text-[0.75rem] ${current ? "text-patina" : done ? "text-bone-soft" : "text-bone"
              }`}
          >
            Chapter {pinnacle.index}
          </span>
          <span className={current ? "text-patina" : "text-bone-faint"}>
            {pinnacleAges(pinnacle)}
          </span>
          <span className="text-bone-faint">
            {pinnacleYears(pinnacle)}
          </span>
        </span>
        {current ? (
          <span className="datum border-l border-patina pl-2 text-[0.625rem] tracking-[0.2em] text-patina uppercase">
            In force
          </span>
        ) : (
          <span className="datum text-[0.625rem] tracking-[0.2em] text-bone-faint uppercase">
            {done ? "Closed" : "Ahead"}
          </span>
        )}
      </div>

      <NumberRow
        position="pinnacle"
        n={pinnacle.number}
        aside=""
        inline={false}
        open={isShowing(subject, { kind: "pinnacle", index: pinnacle.index })}
        onToggle={() => onOpen({ kind: "pinnacle", index: pinnacle.index })}
      />
      <NumberRow
        position="challenge"
        n={pinnacle.challenge}
        aside=""
        inline={false}
        open={isShowing(subject, { kind: "challenge", index: pinnacle.index })}
        onToggle={() => onOpen({ kind: "challenge", index: pinnacle.index })}
      />
    </div>
  );
}
