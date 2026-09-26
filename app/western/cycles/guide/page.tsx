"use client";

import { useEffect, useMemo, useState } from "react";
import DevelopmentalArcGuide, { type ArcPosition, type HouseDates } from "@/components/western/cycles/developmental-arc";
import type { CycleRowData } from "@/components/western/cycles/cycle-row";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useJson } from "@/lib/use-json";
import { ARCS } from "@/lib/cycles/arcs-data";

interface ActiveResponse {
  cycles: CycleRowData[];
}

/**
 * The cycles guide — the slow house transits explained as processes.
 *
 * Reads without a chart. With one, each arc opens on the house the planet is
 * actually in and marks how far through it the reader is.
 */
export default function CyclesGuidePage() {
  const { chart } = useChart();
  const { setPageContext } = useChat();
  const state = useJson<ActiveResponse>(
    chart ? `/api/cycles?chartId=${encodeURIComponent(chart.id)}` : null,
  );

  const [now] = useState(() => Date.now());

  // Where each planet the guide covers sits in the reader's chart, if anywhere.
  const positions = useMemo(() => {
    const out: Record<string, ArcPosition> = {};
    if (state.status !== "ready") return out;
    for (const c of state.data.cycles) {
      if (c.upcoming || !c.houseNumber) continue;
      const start = Date.parse(c.start);
      const end = Date.parse(c.end);
      if (!(end > start)) continue;
      out[c.planet] = {
        house: c.houseNumber,
        progress: Math.min(0.999, Math.max(0, (now - start) / (end - start))),
      };
    }
    return out;
  }, [state, now]);

  /**
   * Real dates for the houses the cache can date, per planet: the one in
   * force (with its retrograde segments) and the ones coming up. Houses
   * already passed are not in this response and stay on the nominal years.
   */
  const dates = useMemo(() => {
    const out: Record<string, Record<number, HouseDates>> = {};
    if (state.status !== "ready") return out;
    for (const c of state.data.cycles) {
      const byHouse: Record<number, HouseDates> = {};
      if (c.houseNumber) {
        byHouse[c.houseNumber] = { start: c.start, end: c.end, segments: c.band.segments };
      }
      for (const n of c.next ?? []) {
        if (n.houseNumber && n.end && !byHouse[n.houseNumber]) {
          byHouse[n.houseNumber] = { start: n.start, end: n.end };
        }
      }
      out[c.planet] = byHouse;
    }
    return out;
  }, [state]);

  useEffect(() => {
    setPageContext({
      _description: "Cycles Guide — slow house transits as developmental arcs",
      _note:
        "Each transit is modelled as phases across the time the planet spends in a " +
        "house. The phase boundaries are proportions of the transit and the curves " +
        "are illustrative — a model to reason with, not a measurement. When the " +
        "reader asks about their own transit, use `you` for house and progress.",
      arcs: ARCS.map((arc) => ({
        planet: arc.planet,
        typicalYears: arc.years,
        yearsNote: arc.yearsNote,
        phases: arc.phases.map((p) => ({ name: p.name, action: p.action, span: p.span })),
        you: positions[arc.planet] ?? null,
        datedHouses: dates[arc.planet] ?? {},
        houses: arc.houses,
      })),
    });
    return () => setPageContext(null);
  }, [positions, dates, setPageContext]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      {ARCS.map((arc) => {
        const you = positions[arc.planet] ?? null;
        return (
          <DevelopmentalArcGuide
            // Remount when the chart's position arrives, so the arc opens on it.
            key={`${arc.planet}:${you ? you.house : "none"}`}
            arc={arc}
            you={you}
            dates={dates[arc.planet]}
            now={now}
          />
        );
      })}
    </div>
  );
}
