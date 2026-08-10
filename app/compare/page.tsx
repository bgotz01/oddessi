"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PageTitle, SectionHeading } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useJson } from "@/lib/use-json";
import { balance } from "@/lib/balance";
import {
  NOT_THE_SAME_SCALE,
  compare,
  comparisonContext,
  type ComparisonRow,
} from "@/lib/comparison";
import { ELEMENT_COLOR } from "@/lib/symbols";
import { elementColor } from "@/lib/chinese/palette";
import type { Chart } from "@/lib/charts";
import type { Reading } from "@/lib/chinese/pillars";

/**
 * The two systems asked the same four questions.
 *
 * The rule this page is built on is in `lib/comparison.ts`: it compares
 * conclusions, never vocabularies. So the two columns never touch — no arrows
 * between them, no combined verdict, no shared axis on the two sets of element
 * bars, which are drawn each against its own largest so that neither can be
 * read off against the other. Where the two answers disagree the page simply
 * prints both and hands the pair to the council, which is the only thing here
 * equipped to say something about a specific combination.
 *
 * Nothing on this page is interpreted in code. That is deliberate: four
 * questions across two systems is thousands of combinations, and a lookup table
 * that size would be stale the day it was written.
 */

/** One measured share. Drawn against the largest bar in its own column only. */
function Bar({
  label,
  share,
  largest,
  color,
  absent,
}: {
  label: string;
  share: number;
  largest: number;
  color: string;
  absent: boolean;
}) {
  return (
    <div className="flex w-full items-center gap-4 py-2">
      <span
        className="datum w-16 text-[0.6875rem] tracking-[0.14em] uppercase"
        style={{ color }}
      >
        {label}
      </span>
      <span className="h-[3px] flex-1 bg-rule-faint">
        <span
          className="block h-full"
          style={{
            width: `${largest > 0 ? (share / largest) * 100 : 0}%`,
            backgroundColor: color,
          }}
        />
      </span>
      <span
        className="datum w-12 text-right text-[0.6875rem]"
        style={{ color: absent ? undefined : color }}
      >
        {absent ? "—" : `${share}%`}
      </span>
    </div>
  );
}

/** A column head: which system is speaking. */
function SideLabel({ children }: { children: string }) {
  return <p className="eyebrow mb-3">{children}</p>;
}

function QuestionRow({
  row,
  onAsk,
}: {
  row: ComparisonRow;
  onAsk: (row: ComparisonRow) => void;
}) {
  return (
    <div className="border-b border-rule py-8">
      <div className="mb-6 flex items-baseline justify-between gap-6">
        <h3 className="inscription text-[0.9375rem] text-bone">
          {row.question}
        </h3>
        <button
          type="button"
          onClick={() => onAsk(row)}
          className="datum shrink-0 cursor-pointer text-[0.6875rem] text-bone-faint transition-colors hover:text-patina"
        >
          Ask ›
        </button>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="border-l-2 border-patina-dim pl-5">
          <SideLabel>Western</SideLabel>
          <p className="mb-2 text-[1.1875rem] leading-snug text-bone">
            {row.western.answer}
          </p>
          <p className="datum text-[0.6875rem] leading-relaxed text-bone-faint">
            {row.western.basis}
          </p>
        </div>

        <div className="border-l-2 border-ember-dim pl-5">
          <SideLabel>Chinese</SideLabel>
          <p className="mb-2 text-[1.1875rem] leading-snug text-bone">
            {row.chinese.answer}
          </p>
          <p className="datum text-[0.6875rem] leading-relaxed text-bone-faint">
            {row.chinese.basis}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const { chart } = useChart();
  const { setPageContext } = useChat();
  const state = useJson<Reading>(
    chart ? `/api/chinese?chartId=${encodeURIComponent(chart.id)}` : null,
  );

  const reading = state.status === "ready" ? state.data : null;

  // Both readings, plus the two instructions that keep the model from
  // producing the false-cognate answer this page exists to avoid.
  useEffect(() => {
    if (!chart || !reading) return;
    setPageContext(comparisonContext(chart, reading));
    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, reading]);

  return (
    <div className="mx-auto w-full max-w-5xl px-8 pb-24">
      <PageTitle
        eyebrow={chart ? chart.name : "No chart"}
        title="Comparison"
        lede="One birth, read twice. The two systems divide a life along
              different seams, so nothing here is translated from one into the
              other — they are simply asked the same four questions, and both
              answers are left standing even when they disagree."
      />

      {!chart ? (
        <p className="text-bone-soft">No chart selected.</p>
      ) : state.status === "loading" ? (
        <p className="datum text-[0.75rem] text-bone-faint">
          Casting the second reading…
        </p>
      ) : state.status === "error" ? (
        <p className="datum text-[0.75rem] text-ember">{state.error}</p>
      ) : (
        <ComparisonView chart={chart} reading={state.data} />
      )}
    </div>
  );
}

function ComparisonView({ chart, reading }: { chart: Chart; reading: Reading }) {
  const { send, setOpen } = useChat();
  const pathname = usePathname();

  const rows = compare(chart, reading);
  const west = balance(chart);

  // Each column is scaled to its own largest, never to a shared maximum. A
  // shared axis would be the first step toward reading one off against the
  // other, which is the one thing this page must not invite.
  const westLargest = Math.max(...west.elements.map((e) => e.share));
  const eastLargest = Math.max(...reading.elements.map((e) => e.share));

  const ask = (row: ComparisonRow) => {
    setOpen(true);
    send(row.ask, pathname);
  };

  return (
    <>
      <section className="mb-16">
        <SectionHeading
          aside={
            <span className="datum text-[0.6875rem] text-bone-faint">
              Two readings · no translation
            </span>
          }
        >
          The Four Questions
        </SectionHeading>

        <div className="border-t border-rule">
          {rows.map((row) => (
            <QuestionRow key={row.id} row={row} onAsk={ask} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <SectionHeading
          aside={
            <span className="datum text-[0.6875rem] text-bone-faint">
              Separate scales
            </span>
          }
        >
          What Each One Counts
        </SectionHeading>

        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <SideLabel>Western · four elements</SideLabel>
            {west.elements.map((e) => (
              <Bar
                key={e.key}
                label={e.key}
                share={e.share}
                largest={westLargest}
                color={ELEMENT_COLOR[e.key]}
                absent={e.weight === 0}
              />
            ))}
            <p className="datum mt-4 text-[0.6875rem] leading-relaxed text-bone-faint">
              Ten bodies and the Ascendant, weighted by role — the lights
              heaviest, the outers lightest because a whole generation shares
              them. Qualities of temperament, fixed to each sign.
            </p>
          </div>

          <div>
            <SideLabel>Chinese · five phases</SideLabel>
            {reading.elements.map((e) => (
              <Bar
                key={e.element}
                label={e.element}
                share={e.share}
                largest={eastLargest}
                color={elementColor(e.element)}
                absent={e.share === 0}
              />
            ))}
            <p className="datum mt-4 text-[0.6875rem] leading-relaxed text-bone-faint">
              The eight characters with their hidden stems, weighted. Stages of
              transformation, read against the Day Master rather than on their
              own.
            </p>
          </div>
        </div>

        <p className="mt-10 border-l-2 border-ember-dim py-1 pl-5 text-[1.0625rem] leading-relaxed text-bone-soft">
          {NOT_THE_SAME_SCALE}
        </p>
      </section>
    </>
  );
}
