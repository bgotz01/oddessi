/**
 * The geometry every timeline chart shares: one horizontal window, the year
 * axis drawn across it, and the line marking the present.
 *
 * Both charts on the explorer read the same `windowStart`/`windowEnd`, so a
 * date sits at the same pixel in each of them and the eye can travel straight
 * down from one to the other. That only holds while they share this module —
 * a chart that computes its own scale will silently drift out of alignment.
 */

export const LABEL_W = "15rem";

export interface Scale {
  windowStart: string;
  windowEnd: string;
}

export function fractionOf(iso: string, scale: Scale): number {
  const start = Date.parse(scale.windowStart);
  const span = Date.parse(scale.windowEnd) - start;
  return (Date.parse(iso) - start) / span;
}

/** Percentage along the axis, clamped to the visible window. */
export function pct(iso: string, scale: Scale): number {
  return Math.min(100, Math.max(0, fractionOf(iso, scale) * 100));
}

export function axisYears(scale: Scale): number[] {
  const first = new Date(scale.windowStart).getUTCFullYear();
  const last = new Date(scale.windowEnd).getUTCFullYear();
  const years: number[] = [];
  const step = last - first > 18 ? 5 : last - first > 10 ? 2 : 1;
  for (let y = Math.ceil(first / step) * step; y <= last; y += step) {
    years.push(y);
  }
  return years;
}

export function YearAxis({ scale }: { scale: Scale }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: `${LABEL_W} 1fr` }}>
      <div />
      <div className="relative h-5">
        {axisYears(scale).map((y) => (
          <span
            key={y}
            className="datum absolute top-0 block -translate-x-1/2 text-[0.625rem] text-bone-faint"
            style={{ left: `${pct(`${y}-01-01`, scale)}%` }}
          >
            {y}
          </span>
        ))}
      </div>
    </div>
  );
}

export function YearGrid({ scale }: { scale: Scale }) {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0"
      style={{ left: LABEL_W }}
    >
      {axisYears(scale).map((y) => (
        <div
          key={y}
          className="absolute inset-y-0 w-px bg-rule-faint"
          style={{ left: `${pct(`${y}-01-01`, scale)}%` }}
        />
      ))}
    </div>
  );
}

/** The present — one line, through everything. Wants a `relative` parent. */
export function NowLine({ now, scale }: { now: Date; scale: Scale }) {
  const fraction = fractionOf(now.toISOString().slice(0, 10), scale);
  if (fraction < 0 || fraction > 1) return null;

  return (
    <div
      className="pointer-events-none absolute top-0 bottom-0 border-l border-patina"
      style={{ left: `calc(${LABEL_W} + (100% - ${LABEL_W}) * ${fraction})` }}
    >
      <span className="datum absolute top-0 left-2 text-[0.5625rem] tracking-[0.2em] whitespace-nowrap text-patina uppercase">
        Now
      </span>
    </div>
  );
}
