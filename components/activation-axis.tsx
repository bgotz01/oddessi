//components/activation-axis.tsx

"use client";

/**
 * The frame the Activation curve is drawn on: geometry, gridlines, ticks.
 *
 * Split from the curve because it is the part with no opinions — it knows how
 * big the plot is and where a year falls, and nothing about what the line
 * means. The constants live here rather than in the curve so that the axis and
 * the thing drawn on it can never disagree about where the left edge is.
 */

/** SVG user space. Everything is drawn in this and scaled by the viewBox. */
export const W = 1000;
export const H = 268;
/**
 * The plot's margins. The bottom one carries two things now — the season band
 * and then the ticks — which is why it is deeper than the space the year
 * labels need. Widening the margin rather than the viewBox keeps the line's
 * own height where it was; a band stolen from the plot would have flattened
 * the curve to pay for itself.
 */
export const PAD = { top: 26, right: 8, bottom: 48, left: 34 };

/**
 * The season band's lane, measured down from the plot's bottom edge.
 *
 * Here rather than in the band itself so the ticks can be placed below it
 * without the two files having to agree by coincidence.
 */
export const BAND = { top: 6, height: 10 };

/** Where tick text starts: under the band, with air between. */
const TICK_TEXT = BAND.top + BAND.height + 10;

/** Horizontal rules, in index points. */
const GRID = [0, 20, 40, 60, 80, 100];

/** Axis tick spacing, in calendar years. */
export const TICK_STEP = 5;

/**
 * The earliest calendar year the chart draws.
 *
 * A display window, not a data one — the cache still runs from birth, and the
 * windows, peaks and drawer all still know about the years before this. What
 * it buys is resolution: a 1986 chart spread over ninety years gave the two
 * decades anyone can actually act on about a quarter of the width.
 *
 * It costs the childhood. For that same chart it cuts ages 0–14, which is not
 * empty — the first nodal reversal falls at 9.3 and there is a real peak at
 * ten. That is a deliberate trade and a one-line one to reverse.
 */
export const VIEW_FROM_YEAR = 2000;

export interface Scale {
  x: (age: number) => number;
  y: (value: number) => number;
}

/** Horizontal rules with their index values down the left edge. */
export function CurveGrid({ y }: { y: Scale["y"] }) {
  return (
    <>
      {GRID.map((v) => (
        <g key={v}>
          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={y(v)}
            y2={y(v)}
            stroke="var(--color-rule-faint)"
            strokeWidth={1}
          />
          <text
            x={PAD.left - 8}
            y={y(v) + 3}
            textAnchor="end"
            fill="var(--color-bone-faint)"
            className="datum"
            fontSize={9}
          >
            {v}
          </text>
        </g>
      ))}
    </>
  );
}

/**
 * Ticks on round CALENDAR years, with the age beneath.
 *
 * The year leads because it is what a reader plans in — a period at "age 47"
 * needs arithmetic before it can go in a diary — and because ticking on ages
 * put the year labels on arbitrary boundaries like 2031 and 2036. Ticking on
 * years puts them on 2030 and 2035 and lets the age fall where it falls.
 */
export function YearTicks({
  years,
  x,
  ageOfYear,
}: {
  years: number[];
  x: Scale["x"];
  ageOfYear: (year: number) => number;
}) {
  return (
    <>
      {years.map((yr) => (
        <g key={yr}>
          <line
            x1={x(ageOfYear(yr))}
            x2={x(ageOfYear(yr))}
            y1={H - PAD.bottom}
            y2={H - PAD.bottom + 3}
            stroke="var(--color-rule)"
            strokeWidth={1}
          />
          <text
            x={x(ageOfYear(yr))}
            y={H - PAD.bottom + TICK_TEXT}
            textAnchor="middle"
            fill="var(--color-bone-soft)"
            className="datum"
            fontSize={9}
          >
            {yr}
          </text>
          <text
            x={x(ageOfYear(yr))}
            y={H - PAD.bottom + TICK_TEXT + 9}
            textAnchor="middle"
            fill="var(--color-bone-faint)"
            className="datum"
            fontSize={8}
          >
            {Math.round(ageOfYear(yr))}
          </text>
        </g>
      ))}
    </>
  );
}
