"use client";

import { PageTitle, SectionHeading } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import { NatalWheel } from "@/components/western/planets/natal-wheel";
import { BodiesTable } from "@/components/western/planets/bodies-table";

export default function PlanetsPage() {
  const { chart } = useChart();

  if (!chart) {
    return (
      <div className="mx-auto w-full max-w-6xl px-8">
        <PageTitle
          eyebrow="No chart"
          title="Planets"
          lede="No chart selected. Add birth data to begin the study."
        />
      </div>
    );
  }

  const bodies = chart.placements.filter((p) => !p.isAngle);
  const retrogrades = bodies.filter((p) => p.retrograde).length;

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

      <section>
        <SectionHeading aside={`${bodies.length} bodies · ${retrogrades} ℞`}>
          The Bodies
        </SectionHeading>
        <BodiesTable placements={chart.placements} />
      </section>
    </div>
  );
}
