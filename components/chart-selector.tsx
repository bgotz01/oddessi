"use client";

import { useChart } from "@/components/chart-context";
import { formatBirth } from "@/lib/charts";
import { BODY_GLYPH, signGlyph } from "@/lib/symbols";

/**
 * The chart under study, docked at the top of the rail.
 * Everything below it in the app is read through whatever is selected here.
 */
export default function ChartSelector() {
  const { chart, charts, selectChart } = useChart();

  if (!chart) {
    return (
      <div className="border-y border-rule-faint px-6 py-5">
        <p className="eyebrow">Chart</p>
        <p className="datum mt-2 text-[0.75rem] text-ember">No chart</p>
      </div>
    );
  }

  const big3 = [
    { glyph: BODY_GLYPH.Sun, sign: chart.big3.sun },
    { glyph: BODY_GLYPH.Moon, sign: chart.big3.moon },
    { glyph: BODY_GLYPH.Ascendant, sign: chart.big3.rising },
  ];

  return (
    <div className="border-y border-rule-faint px-6 py-5">
      <p className="eyebrow mb-2">Chart</p>

      <select
        value={chart.id}
        onChange={(e) => selectChart(e.target.value)}
        disabled={charts.length <= 1}
        className="w-full rounded border border-rule bg-surface px-2 py-1.5 text-[0.6875rem] text-bone-soft transition-colors hover:border-rule-faint focus:outline-none focus:ring-1 focus:ring-patina disabled:cursor-default disabled:opacity-70"
      >
        {charts.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* The big three, as glyphs. */}
      <div className="mt-3 flex items-center gap-3">
        {big3.map((b) => (
          <span key={b.glyph} className="flex items-baseline gap-1">
            <span className="glyph text-[0.9375rem] text-bone-faint">
              {b.glyph}
            </span>
            <span className="glyph text-[0.9375rem] text-patina">
              {signGlyph(b.sign)}
            </span>
          </span>
        ))}
      </div>

      <p className="datum mt-3 text-[0.625rem] leading-relaxed text-bone-faint">
        {formatBirth(chart.birth)}
        <br />
        {chart.birth.location}
      </p>
    </div>
  );
}
