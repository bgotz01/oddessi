"use client";

import { PageTitle, SectionHeading } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import NewChartForm from "@/components/new-chart-form";
import { formatBirth } from "@/lib/charts";
import { BODY_GLYPH, signGlyph } from "@/lib/symbols";

/**
 * The fixed half of the study. Reads whichever chart the rail has selected —
 * switching in the sidebar re-renders this against the new one.
 */
export default function BirthChartPage() {
  const { chart } = useChart();

  if (!chart) {
    return (
      <div className="mx-auto w-full max-w-6xl px-8">
        <PageTitle
          eyebrow="The fixed symbols"
          title="Birth Chart"
          lede="No chart selected. Add birth data to begin the study."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow="The fixed symbols"
        title="Birth Chart"
        lede="The vocabulary. These do not move — everything under Transits is
              something moving across this."
      />

      <section className="mb-16">
        <SectionHeading>The Moment</SectionHeading>
        <dl className="grid gap-px bg-rule sm:grid-cols-3">
          {[
            { label: "Born", value: formatBirth(chart.birth) },
            { label: "Place", value: chart.birth.location },
            { label: "Zone", value: chart.birth.timezone },
          ].map((f) => (
            <div key={f.label} className="bg-void p-6">
              <dt className="eyebrow">{f.label}</dt>
              <dd className="datum mt-2 text-[0.8125rem] text-bone">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="datum mt-3 text-[0.625rem] text-bone-faint">
          {chart.birth.latitude.toFixed(4)}, {chart.birth.longitude.toFixed(4)}
        </p>
      </section>

      <section className="mb-16">
        <SectionHeading aside={`${chart.placements.length} placements`}>
          Placements
        </SectionHeading>
        <div className="border-t border-rule">
          {chart.placements.map((p) => (
            <div
              key={p.body}
              className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-4 border-b border-rule-faint py-3 md:grid-cols-[2rem_10rem_1fr_6rem_4rem]"
            >
              <span
                className={`glyph text-lg ${p.isAngle ? "text-ember" : "text-patina"}`}
              >
                {BODY_GLYPH[p.body] ?? "·"}
              </span>
              <span className="inscription text-[0.6875rem] text-bone">
                {p.body}
              </span>
              <span className="hidden md:block">
                <span className="glyph mr-2 text-bone-faint">
                  {signGlyph(p.sign)}
                </span>
                <span className="text-[0.9375rem] font-light italic text-bone-soft">
                  {p.sign}
                </span>
              </span>
              <span className="datum text-[0.75rem] text-bone-faint md:text-right">
                {p.degree}
              </span>
              <span className="datum hidden text-[0.75rem] text-bone-faint md:block md:text-right">
                {p.house}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading aside="swiss ephemeris">New Chart</SectionHeading>
        <NewChartForm />
      </section>
    </div>
  );
}
