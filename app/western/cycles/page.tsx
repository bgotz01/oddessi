"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import CycleRow, { type CycleRowData } from "@/components/western/cycles/cycle-row";
import CycleDrawer from "@/components/western/cycles/cycle-drawer";
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
  const [selectedCycle, setSelectedCycle] = useState<CycleRowData | null>(null);

  // Push visible transit data into the chat context so the model can
  // answer questions about what is actually on screen.
  useEffect(() => {
    if (state.status !== "ready") return;

    setPageContext({
      _description: "House Transits (Cycles Page)",
      asOf: now.toISOString(),
      _note:
        "Houses are contiguous sectors of the ecliptic in order, so each planet " +
        "crosses them consecutively — the sixth always follows the fifth. What is " +
        "not derivable is the date, because a retrograde can hold a planet at a " +
        "cusp and make two transits overlap, so use the `next` dates below rather " +
        "than reasoning about when an ingress ought to fall. `next` is read from " +
        "the same cache the page draws from; the page names the first entry and " +
        "the rest are here. /western/cycles/explorer shows the whole span.",
      cycles: state.data.cycles.map((c) => ({
        planet: c.planet,
        house: c.house,
        houseNumber: c.houseNumber,
        significance: c.significance,
        transitStart: c.start,
        transitEnd: c.end,
        // Whether the row on screen is in force or still ahead — a planet in a
        // retrograde gap is shown its incoming transit, and calling that
        // "current" would misdate everything downstream of it.
        notYetBegun: c.upcoming ?? false,
        next: c.next ?? [],
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
              <CycleRow
                key={c.planet}
                cycle={c}
                now={now}
                onClick={() => setSelectedCycle(c)}
                selected={selectedCycle?.planet === c.planet}
              />
            ))}
          </div>
        </section>
      )}

      <p className="mb-10">
        <Link
          href="/western/cycles/explorer"
          className="datum text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase transition-colors hover:text-patina"
        >
          Explore all cycles →
        </Link>
      </p>

      {/* Right drawer */}
      {selectedCycle && (
        <CycleDrawer
          cycle={selectedCycle}
          onClose={() => setSelectedCycle(null)}
        />
      )}
    </div>
  );
}
