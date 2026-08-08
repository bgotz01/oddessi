"use client";

import Link from "next/link";
import { PageTitle, SectionHeading } from "@/components/primitives";
import CycleRow, { type CycleRowData } from "@/components/cycle-row";
import { useChart } from "@/components/chart-context";
import { useJson } from "@/lib/use-json";

interface ActiveResponse {
  cycles: CycleRowData[];
  windowStart: string;
  windowEnd: string;
}

export default function CyclesPage() {
  const { chart } = useChart();
  const state = useJson<ActiveResponse>(
    chart ? `/api/cycles?chartId=${encodeURIComponent(chart.id)}` : null,
  );
  const now = new Date();

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow={chart ? chart.name : "No chart"}
        title="Cycles"
        lede="The house each slow planet is currently moving through — one long
              season per planet. Each row runs on its own scale, so every
              retrograde pass is legible: solid where the transit is in effect,
              gapped where the planet stations and backs off."
      />

      <p className="mb-10">
        <Link
          href="/astro/cycles/explorer"
          className="datum text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase transition-colors hover:text-patina"
        >
          Explore all cycles →
        </Link>
      </p>

      {!chart ? (
        <p className="font-light text-bone-soft">No chart selected.</p>
      ) : state.status === "loading" ? (
        <p className="datum text-[0.75rem] text-bone-faint">Reading cycles…</p>
      ) : state.status === "error" ? (
        <p className="datum text-[0.75rem] text-ember">{state.error}</p>
      ) : state.data.cycles.length === 0 ? (
        <p className="font-light text-bone-soft">
          No active house transits cached for this chart.
        </p>
      ) : (
        <section>
          <SectionHeading aside={`${state.data.cycles.length} in force`}>
            In Force
          </SectionHeading>
          <div className="border-t border-rule">
            {state.data.cycles.map((c) => (
              <CycleRow key={c.planet} cycle={c} now={now} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
