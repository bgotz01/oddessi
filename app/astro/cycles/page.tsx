"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import CycleRow, { type CycleRowData } from "@/components/cycle-row";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useJson } from "@/lib/use-json";

interface ActiveResponse {
  cycles: CycleRowData[];
  windowStart: string;
  windowEnd: string;
}

export default function CyclesPage() {
  const { chart } = useChart();
  const { setPageContext } = useChat();
  const state = useJson<ActiveResponse>(
    chart ? `/api/cycles?chartId=${encodeURIComponent(chart.id)}` : null,
  );
  const now = new Date();

  // Push visible transit data into the chat context so the model can
  // answer questions about what is actually on screen.
  useEffect(() => {
    if (state.status !== "ready") return;

    setPageContext({
      _description: "Active House Transits (Cycles Page)",
      asOf: now.toISOString(),
      cycles: state.data.cycles.map((c) => ({
        planet: c.planet,
        house: c.house,
        houseNumber: c.houseNumber,
        significance: c.significance,
        transitStart: c.start,
        transitEnd: c.end,
      })),
    });

    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, state.status === "ready" ? state.data : null]);

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow={chart ? chart.name : "No chart"}
        title="Cycles"

      />



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

      <p className="mb-10">
        <Link
          href="/astro/cycles/explorer"
          className="datum text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase transition-colors hover:text-patina"
        >
          Explore all cycles →
        </Link>
      </p>

    </div>
  );
}
