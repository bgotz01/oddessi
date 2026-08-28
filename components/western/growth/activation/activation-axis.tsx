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
 * The plot's margins.
 *
 * The bottom one carried a season band as well as the ticks and is shallower
 * now that the band has gone: the graded spans are drawn once, on the
 * whole-life strip above the chart, and the sixteen pixels they were using
 * here go back to the line rather than to white space.
 */
export const PAD = { top: 26, right: 8, bottom: 32, left: 34 };

/** Where tick text starts, measured down from the axis. */
const TICK_TEXT = 12;

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

/**
 * The PLOT's scale, as CSS percentages: the same x the curve draws with.
 *
 * For HTML that has to line up with the SVG chart — the graded bars sit
 * directly beneath the line and share its axis, so a bar and the stretch of
 * curve above it must occupy the same column to within a pixel or the pair
 * stops reading as one drawing and starts reading as two that disagree.
 *
 * The inset is the plot's own margins expressed as a fraction of the viewBox,
 * which works because the SVG fills the width of its box: the drawing is
 * scaled to fit and centred, so it would sit in dead space at both ends if it
 * were ever height-limited, and the height clamp is what keeps it from being
 * so at any width this layout reaches. Widen the chart past its container cap
 * or shrink the clamp and the two would drift apart at the edges.
 */
export function plotScale(viewFrom: number, viewTo: number) {
  const span = W - PAD.left - PAD.right;
  const at = (age: number) =>
    ((PAD.left + ((age - viewFrom) / (viewTo - viewFrom)) * span) / W) * 100;

  const x = (age: number) => `${at(age).toFixed(2)}%`;
  return {
    x,
    /** A span's width, never rounding away to nothing. */
    w: (from: number, to: number) =>
      `${Math.max(at(to) - at(from), 0.3).toFixed(2)}%`,
    /** Captions centred on a span, turned inward at both ends of the plot. */
    centred: (age: number) => `clamp(2.75rem, ${x(age)}, calc(100% - 2.75rem))`,
    /** Whether an age is inside the drawn window at all. */
    inside: (age: number) => age >= viewFrom && age <= viewTo,
  };
}

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
