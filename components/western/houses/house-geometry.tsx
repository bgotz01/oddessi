/**
 * HouseGeometry
 *
 * Renders the six opposing axes as a centred bar chart. The bar length for
 * each house is proportional to the house's span — that is, how many degrees
 * of the ecliptic the house occupies, computed from the cusp longitudes stored
 * on the chart.
 *
 * Layout (one axis per row):
 *   LABEL  house#  degree ────bar────  degree  house#  LABEL
 *
 * The longest house gets the full half-width; all others scale to it so the
 * bars always fill the available space relative to each other.
 */

import type { HouseCusp } from "@/lib/charts";
import {
  getHouseTitle,
  type House,
} from "@/lib/astrology/house-categories";

const AXES: [number, number][] = [
  [1, 7],
  [2, 8],
  [3, 9],
  [4, 10],
  [5, 11],
  [6, 12],
];

/**
 * 50° is effectively the upper end of the geometry we want to visualize.
 * Equal houses would be 30°.
 */
const MAX_GEOMETRY_SPAN = 50;

/** Angular span of a house in degrees, including 360° wrap. */
function houseSpan(cusps: HouseCusp[], index: number): number {
  const current = cusps[index].longitude;
  const next = cusps[(index + 1) % 12].longitude;

  return next > current
    ? next - current
    : next - current + 360;
}

function label(n: number) {
  return getHouseTitle(n as House).toUpperCase();
}

function formatSpan(span: number) {
  let degrees = Math.floor(span);
  let minutes = Math.round((span - degrees) * 60);

  if (minutes === 60) {
    degrees += 1;
    minutes = 0;
  }

  return `${degrees}°${String(minutes).padStart(2, "0")}′`;
}

function AxisRow({
  left,
  right,
  span,
}: {
  left: HouseCusp;
  right: HouseCusp;
  span: number;
}) {
  const widthPct = Math.min(
    (span / MAX_GEOMETRY_SPAN) * 100,
    100,
  );

  const halfWidthPct = widthPct / 2;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(14rem,2fr)_minmax(0,1fr)] items-center gap-4 py-3">
      {/* Left house */}
      <div className="flex min-w-0 items-baseline gap-2">
        <span className="datum shrink-0 text-[0.5625rem] text-bone-faint">
          {left.roman}
        </span>

        <span className="datum truncate text-[0.6875rem] tracking-[0.12em] text-bone-soft uppercase">
          {label(left.number)}
        </span>
      </div>

      {/* Geometry */}
      <div className="flex h-6 items-center justify-center">
        <div
          className="grid items-center"
          style={{
            width: `${widthPct}%`,
            gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr)",
          }}
        >
          {/* Left half */}
          <div className="relative h-[2px]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  linear-gradient(
                    90deg,
                    #9e5048 0%,
                    #b9784e 36%,
                    #c2aa55 72%,
                    #5f8f68 100%
                  )
                `,
              }}
            />

            <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone-soft" />
          </div>

          {/* Span value */}
          <span className="datum mx-3 shrink-0 whitespace-nowrap text-[0.625rem] text-bone-soft">
            {formatSpan(span)}
          </span>

          {/* Right half */}
          <div className="relative h-[2px]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  linear-gradient(
                    90deg,
                    #5f8f68 0%,
                    #c2aa55 28%,
                    #b9784e 64%,
                    #9e5048 100%
                  )
                `,
              }}
            />

            <span className="absolute right-0 top-1/2 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-bone-soft" />
          </div>
        </div>
      </div>

      {/* Right house */}
      <div className="flex min-w-0 items-baseline justify-end gap-2 text-right">
        <span className="datum truncate text-[0.6875rem] tracking-[0.12em] text-bone-soft uppercase">
          {label(right.number)}
        </span>

        <span className="datum shrink-0 text-[0.5625rem] text-bone-faint">
          {right.roman}
        </span>
      </div>
    </div>
  );
}

export default function HouseGeometry({
  houses,
}: {
  houses: HouseCusp[];
}) {
  if (houses.length !== 12) return null;

  /**
   * Don't assume the incoming array is already in house order.
   */
  const ordered = [...houses].sort(
    (a, b) => a.number - b.number,
  );

  const byNumber = new Map(
    ordered.map((house) => [house.number, house]),
  );

  const spans = new Map<number, number>(
    ordered.map((_, index) => [
      index + 1,
      houseSpan(ordered, index),
    ]),
  );

  return (
    <div className="w-full">
      <p className="mb-6 text-[1.1rem] text-bone-soft italic">
        How much zodiacal space each house axis occupies.
      </p>
      {AXES.map(([leftNumber, rightNumber]) => {
        const left = byNumber.get(leftNumber);
        const right = byNumber.get(rightNumber);
        const span = spans.get(leftNumber);

        if (!left || !right || span == null) return null;

        return (
          <AxisRow
            key={leftNumber}
            left={left}
            right={right}
            span={span}
          />
        );
      })}

      {/* Scale */}
      <div className="mt-2 flex items-center justify-between border-t border-white/[0.05] pt-3">
        <span className="datum text-[0.46rem] tracking-[0.16em] text-bone-faint uppercase">
          Compressed
        </span>

        <span className="datum text-[0.46rem] tracking-[0.16em] text-bone-faint uppercase">
          30° baseline
        </span>

        <span className="datum text-[0.46rem] tracking-[0.16em] text-bone-faint uppercase">
          Expansive
        </span>
      </div>
    </div>
  );
}