"use client";

import Link from "next/link";
import { useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import {
  ExplainMark,
  ExplainProvider,
  Explains,
} from "@/components/chinese/drawer";
import { useChart } from "@/components/chart-context";
import { useJson } from "@/lib/use-json";
import { BRANCHES, STEMS } from "@/lib/chinese/almanac";
import { elementColor } from "@/lib/chinese/palette";
import type { LuckPillar, Reading } from "@/lib/chinese/pillars";

/**
 * 大運 — the ten-year luck pillars.
 *
 * The closest thing this system has to a transit, and still not one: nothing is
 * moving overhead. The birth chart simply hands over to the next pillar of the
 * sexagenary cycle every ten years, forwards or backwards depending on the year
 * stem and the gender, and the decade takes that pillar's character.
 */

function year(iso: string): string {
  return new Date(iso).getUTCFullYear().toString();
}

function Row({ pillar, current }: { pillar: LuckPillar; current: boolean }) {
  const stem = STEMS[pillar.stem];
  const branch = BRANCHES[pillar.branch];

  return (
    <Explains
      subject={{
        kind: "luck",
        stem: pillar.stem,
        branch: pillar.branch,
        startAge: pillar.startAge,
        endAge: pillar.endAge,
        startDate: pillar.startDate,
        endDate: pillar.endDate,
      }}
      label={`ages ${Math.floor(pillar.startAge)} to ${Math.floor(pillar.endAge)}`}
      className={`grid w-full grid-cols-[5rem_5rem_1fr_auto] items-center gap-6 border-b border-rule-faint py-5 ${current ? "bg-surface" : ""
        }`}
    >
      <span
        className={`datum text-[0.6875rem] ${current ? "text-patina" : "text-bone-faint"}`}
      >
        {Math.floor(pillar.startAge)}–{Math.floor(pillar.endAge)}
      </span>

      <span className="han text-[1.0625rem]">
        <span style={{ color: elementColor(stem.element) }}>{stem.han}</span>
        <span style={{ color: elementColor(branch.element) }}>{branch.han}</span>
      </span>

      <span className="inscription text-[0.9375rem] leading-tight">
        <span style={{ color: elementColor(stem.element) }}>
          {stem.polarity} {stem.element}
        </span>
        <span className="text-bone-faint"> · </span>
        <span style={{ color: elementColor(branch.element) }}>
          {branch.animal}
        </span>
      </span>

      <span className="datum text-right text-[0.625rem] text-bone-faint">
        {year(pillar.startDate)}–{year(pillar.endDate)}
        {current ? (
          <span className="datum ml-4 border-l border-patina pl-2 text-[0.625rem] tracking-[0.2em] text-patina uppercase">
            In force
          </span>
        ) : null}
      </span>
    </Explains>
  );
}

export default function LuckPillarsPage() {
  const { chart } = useChart();
  const state = useJson<Reading>(
    chart ? `/api/chinese?chartId=${encodeURIComponent(chart.id)}` : null,
  );
  // Read once on mount rather than on every render: which decade is in force
  // is not going to change while the page is open, and a pure render cannot
  // ask the clock.
  const [now] = useState(() => Date.now());

  return (
    <div className="mx-auto w-full max-w-4xl px-8 pb-24">
      <PageTitle
        eyebrow={chart ? chart.name : "No chart"}
        title="Luck Pillars"
        lede="Life in ten-year stretches, stepped off the month pillar. Which
              way they step, and how old you are when the first one opens,
              depends on the year stem — and the opening age is a distance to
              the next solar term, counted three days to the year, which is why
              it lands where it does rather than on a birthday."
      />

      <p className="mb-10">
        <Link
          href="/eastern/four-pillars"
          className="datum text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase transition-colors hover:text-patina"
        >
          ← Back to the four pillars
        </Link>
      </p>

      {!chart ? (
        <p className="text-bone-soft">No chart selected.</p>
      ) : state.status === "loading" ? (
        <p className="datum text-[0.75rem] text-bone-faint">Stepping the cycle…</p>
      ) : state.status === "error" ? (
        <p className="datum text-[0.75rem] text-ember">{state.error}</p>
      ) : state.data.luck === null ? (
        // Direction is not a detail that can be defaulted: guessing it would
        // silently produce a plausible, wrong sequence for half of all charts.
        <p className="max-w-3xl text-bone-soft">
          The luck pillars run forwards for a man born in a Yang year and for a
          woman born in a Yin year, and backwards otherwise — so this chart
          needs a recorded gender before the sequence can be stepped. It has
          none.
        </p>
      ) : (
        <ExplainProvider>
          <section>
            <SectionHeading
              aside={
                <span className="flex items-baseline gap-5">
                  <span className="datum text-[0.6875rem] text-bone-faint">
                    {state.data.luck.length} decades ·{" "}
                    {state.data.gender === "male" ? "Male" : "Female"} born in a{" "}
                    {STEMS[state.data.pillars.year.stem].polarity} year
                  </span>
                  <ExplainMark
                    subject={{ kind: "concept", concept: "luck-pillars" }}
                  />
                </span>
              }
            >
              The Sequence
            </SectionHeading>
            <div className="border-t border-rule">
              {state.data.luck.map((pillar) => (
                <Row
                  key={`${pillar.stem}-${pillar.branch}-${pillar.startAge}`}
                  pillar={pillar}
                  current={
                    Date.parse(pillar.startDate) <= now &&
                    now < Date.parse(pillar.endDate)
                  }
                />
              ))}
            </div>
          </section>
        </ExplainProvider>
      )}
    </div>
  );
}
