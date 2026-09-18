//western/romance/page.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PageTitle } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import { useScoring } from "@/components/scoring-context";
import {
  CurrentSituation,
  RelationshipCompass,
  RelationshipMap,
  RomanceCycles,
  RomanceCyclesLoading,
} from "@/components/western/romance";
import { useLoveContext } from "@/components/western/love/love-context";
import {
  loveArchitecture,
  loveProfile,
  relationshipCompass,
  loveTimeline,
  type ProgressionsResult,
} from "@/lib/love";
import type { Band } from "@/lib/band";
import type { Chart } from "@/lib/charts";
import type { Rulership } from "@/lib/rulership";
import { useJson } from "@/lib/use-json";

const FEED = "view=all&lookback=90&lookahead=90";

interface AllResponse {
  bands: Band[];
  windowStart: string;
  windowEnd: string;
}

function today(): Date {
  const date = new Date();
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}

function Romance({ chart, rulership }: { chart: Chart; rulership: Rulership }) {
  const cycles = useJson<AllResponse>(
    `/api/cycles?${FEED}&chartId=${encodeURIComponent(chart.id)}`,
  );
  const progressed = useJson<ProgressionsResult>(
    `/api/progressions?chartId=${encodeURIComponent(chart.id)}`,
  );

  const bands = cycles.status === "ready" ? cycles.data.bands : null;
  const events = progressed.status === "ready" ? progressed.data.events : null;

  const architecture = useMemo(
    () => loveArchitecture(chart, rulership),
    [chart, rulership],
  );
  const profile = useMemo(
    () => loveProfile(chart, rulership),
    [chart, rulership],
  );
  const compass = useMemo(
    () => relationshipCompass(chart, rulership),
    [chart, rulership],
  );
  const timeline = useMemo(
    () =>
      loveTimeline(
        architecture,
        bands ?? [],
        events ?? [],
        chart.birth.date,
        today(),
      ),
    [architecture, bands, events, chart.birth.date],
  );

  const ready = bands !== null && events !== null;
  const failed = cycles.status === "error" || progressed.status === "error";
  useLoveContext(chart, timeline, profile, ready, compass);

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow={chart.name}
        title="Romance"
        compact
        aside={
          <Link
            href="/western/love"
            className="datum shrink-0 text-[0.625rem] uppercase tracking-[0.14em] text-bone-faint transition-colors hover:text-bone"
          >
            View original Love →
          </Link>
        }
      />

      <RelationshipCompass compass={compass} />
      
      <div className="mt-16">
        <RelationshipMap profile={profile} />
      </div>

      {failed ? (
        <section className="mt-20 border-l-2 border-ember pl-6">
          <p className="datum text-[0.6875rem] uppercase tracking-[0.16em] text-ember">
            The relationship cycles could not be loaded.
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-bone-faint">
            {cycles.status === "error" ? cycles.error : null}
            {progressed.status === "error" ? ` ${progressed.error}` : null}
          </p>
        </section>
      ) : !ready ? (
        <RomanceCyclesLoading />
      ) : (
        <>
          <RomanceCycles timeline={timeline} />
          <CurrentSituation profile={profile} timeline={timeline} />
        </>
      )}
    </div>
  );
}

export default function RomancePage() {
  const { chart } = useChart();
  const { config } = useScoring();

  if (!chart) {
    return (
      <div className="mx-auto w-full max-w-4xl px-8">
        <PageTitle
          eyebrow="No chart"
          title="Romance"
          lede="No chart selected. Add birth data to begin the study."
          compact
        />
      </div>
    );
  }

  return <Romance chart={chart} rulership={config.rulership} />;
}
