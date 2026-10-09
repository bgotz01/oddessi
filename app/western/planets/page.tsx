"use client";

import { useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import { NatalWheel } from "@/components/western/planets/natal-wheel";
import PlanetaryInfluences from "@/components/western/planets/planetary-influences";
import { BodiesTable, bodiesText } from "@/components/western/planets/bodies-table";
import { ElementDistribution } from "@/components/western/planets/element-distribution";
import { copyText } from "@/lib/clipboard";

/**
 * One verb per body — the key to the table above. It depends on no chart, so
 * it renders with or without one.
 */
function PlanetKey() {
  return (
    <section className="mt-16">
      <SectionHeading aside="what each body does to a house">
        Planetary Influences
      </SectionHeading>
      <PlanetaryInfluences />
    </section>
  );
}

export default function PlanetsPage() {
  const { chart } = useChart();
  const [copied, setCopied] = useState(false);

  if (!chart) {
    return (
      <div className="mx-auto w-full max-w-6xl px-8 pb-24">
        <PageTitle
          eyebrow="No chart"
          title="Planets"
          lede="No chart selected. Add birth data to begin the study."
        />
        <PlanetKey />
      </div>
    );
  }

  const bodies = chart.placements.filter((p) => !p.isAngle);
  const retrogrades = bodies.filter((p) => p.retrograde).length;

  function copyBodies() {
    if (!chart) return;
    const text = `${chart.name} — The Bodies\n\n${bodiesText(chart.placements)}`;
    copyText(text, () => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow={chart.name}
        title="Planets"
        lede="One body per row. Each opens onto three separate readings — what the
              planet is, what the sign makes of it, and what the house asks it to
              do — kept apart on purpose, so it stays clear which layer any given
              claim came from."
      />

      <section className="mb-12">
        <SectionHeading>The Wheel</SectionHeading>
        <div className="mx-auto max-w-[540px]">
          <NatalWheel chart={chart} />
        </div>
      </section>

      <section className="mb-12">
        <ElementDistribution chart={chart} />
      </section>

      <section>
        <SectionHeading
          aside={
            <span className="flex items-center gap-3">
              <span>{`${bodies.length} bodies · ${retrogrades} ℞`}</span>
              <button
                onClick={copyBodies}
                className="datum flex items-center gap-1 text-[0.625rem] tracking-[0.12em] text-bone-faint uppercase transition-colors hover:text-bone"
                aria-label="Copy bodies"
              >
                {copied ? (
                  "Copied ✓"
                ) : (
                  <>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                      <rect x="3.5" y="3.5" width="6" height="6" rx="0.75" stroke="currentColor" strokeWidth="1" />
                      <path d="M2.5 7.5H1.5a.75.75 0 0 1-.75-.75v-6A.75.75 0 0 1 1.5 0h6a.75.75 0 0 1 .75.75v1" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </span>
          }
        >
          The Bodies
        </SectionHeading>
        <BodiesTable placements={chart.placements} />
      </section>

      <PlanetKey />
    </div>
  );
}
