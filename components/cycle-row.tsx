import type { Band } from "@/lib/band";
import { hasRetrograde } from "@/lib/band";
import { planetMeta } from "@/lib/planets";
import { HOUSE_NAMES } from "@/lib/astrology/standard-definitions";

/**
 * One planet, one row, on its own time scale.
 *
 * Scaled to its own envelope so retrograde passes are always legible.
 * Every segment boundary gets a date label; adjacent ones only get suppressed
 * if they are truly within 2 % of each other (i.e. actually overlapping text).
 */

const TRACK_TOP = 20; // px from top of track to bar centre-line
const BAR_H = 8; // px — height of the solid segment bars
const MIN_LABEL_GAP = 2; // % — only suppress labels that would literally overlap

function monthLabel(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "short",
    timeZone: "UTC",
  });
}

/**
 * Every segment boundary (start + end of each segment), de-duped at the
 * junction between adjacent segments, thinned only when truly overlapping.
 */
function labelPoints(band: Band, pos: (iso: string) => number) {
  // Collect all boundary dates, deduping adjacent-segment junctions.
  const dates: string[] = [];
  for (let i = 0; i < band.segments.length; i++) {
    const s = band.segments[i];
    if (i === 0 || s.start !== band.segments[i - 1].end) {
      dates.push(s.start);
    }
    dates.push(s.end);
  }

  // Map to positions and thin only truly-overlapping neighbours.
  const points = dates.map((iso) => ({ iso, x: pos(iso) }));
  const kept: typeof points = [];
  for (const p of points) {
    if (kept.length && p.x - kept[kept.length - 1].x < MIN_LABEL_GAP) continue;
    kept.push(p);
  }
  return kept;
}

export interface CycleRowData {
  band: Band;
  planet: string;
  house: string;
  houseNumber: number | null;
  significance: string;
  start: string;
  end: string;
}

export default function CycleRow({
  cycle,
  now,
}: {
  cycle: CycleRowData;
  now: Date;
}) {
  const { band } = cycle;
  const meta = planetMeta(cycle.planet);
  const color = meta?.color ?? "var(--color-patina)";

  // e.g. "Growth in Spirituality & Service"
  const planetWord = meta?.description?.split(" & ")[0] ?? meta?.description ?? cycle.planet;
  const houseName = cycle.houseNumber ? HOUSE_NAMES[cycle.houseNumber] : null;
  const subtitle = houseName
    ? `${planetWord} in ${houseName}`
    : meta?.description ?? null;

  const start = Date.parse(band.start);
  const span = Date.parse(band.end) - start;
  const pos = (iso: string) =>
    Math.min(100, Math.max(0, ((Date.parse(iso) - start) / span) * 100));

  const nowX = ((now.getTime() - start) / span) * 100;
  const nowVisible = nowX >= 0 && nowX <= 100;
  const elapsed = Math.min(1, Math.max(0, (now.getTime() - start) / span));
  const labels = labelPoints(band, pos);
  const retro = hasRetrograde(band);

  // Extra height when we have labels below the bar
  const trackH = TRACK_TOP + BAR_H + (labels.length ? 22 : 4);

  return (
    <div className="border-b border-rule-faint py-8">
      {/* Heading */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
        {/* Left: glyph · planet · house */}
        <div className="flex items-center gap-3">
          <span className="glyph text-2xl leading-none" style={{ color }}>
            {meta?.glyph}
          </span>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="inscription text-[0.9375rem]" style={{ color }}>
                {cycle.planet}
              </span>
              <span className="inscription text-[0.9375rem] text-bone">
                {cycle.house}
              </span>
            </div>
            {subtitle && (
              <p className="mt-0.5 inscription text-[0.75rem] text-bone-soft leading-tight">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: elapsed */}
        <div>
          <span className="datum text-[1rem]" style={{ color }}>
            {Math.round(elapsed * 100)}%
          </span>
          <span className="datum text-[0.6875rem] text-bone-faint ml-1">elapsed</span>
        </div>
      </div>

      {/* Track */}
      <div className="relative w-full" style={{ height: `${trackH}px` }}>

        {/* Year labels — only at the very start and end of the envelope */}
        <div
          className="datum absolute text-[0.5rem] whitespace-nowrap"
          style={{ left: "0%", top: "2px", color, opacity: 0.45 }}
        >
          {new Date(`${band.start}T00:00:00Z`).getUTCFullYear()}
        </div>
        <div
          className="datum absolute text-[0.5rem] whitespace-nowrap"
          style={{ right: "0%", top: "2px", color, opacity: 0.45, transform: "translateX(0)" }}
        >
          {new Date(`${band.end}T00:00:00Z`).getUTCFullYear()}
        </div>

        {/* Envelope hairline — full span */}
        <div
          className="absolute inset-x-0"
          style={{
            top: `${TRACK_TOP + BAR_H / 2}px`,
            height: "1px",
            backgroundColor: color,
            opacity: 0.2,
          }}
        />

        {/* Envelope fill — same width, very dim, gives the "container" feel */}
        <div
          className="absolute"
          style={{
            top: `${TRACK_TOP}px`,
            left: "0%",
            width: "100%",
            height: `${BAR_H}px`,
            backgroundColor: color,
            opacity: 0.06,
            borderRadius: "1px",
          }}
        />

        {/* In-effect segments — bright elapsed half, dim remaining half */}
        {band.segments.map((seg) => {
          const left = pos(seg.start);
          const width = Math.max(0.3, pos(seg.end) - left);
          const right = left + width;

          // Where "now" falls within this segment (0–100% of the segment width)
          const nowWithinSeg =
            nowVisible && nowX > left && nowX < right
              ? ((nowX - left) / width) * 100
              : null;

          // Fully elapsed segment
          const fullyElapsed = nowVisible && nowX >= right;
          // Fully upcoming segment
          const fullyAhead = !nowVisible || nowX <= left;

          return (
            <div
              key={`${seg.start}-${seg.end}`}
              className="absolute overflow-hidden"
              style={{
                top: `${TRACK_TOP}px`,
                left: `${left}%`,
                width: `${width}%`,
                height: `${BAR_H}px`,
                borderRadius: "1px",
              }}
              title={`${monthLabel(seg.start)} — ${monthLabel(seg.end)}`}
            >
              {/* Elapsed portion — bright */}
              <div
                className="absolute inset-y-0 left-0"
                style={{
                  width: nowWithinSeg != null ? `${nowWithinSeg}%` : fullyElapsed ? "100%" : "0%",
                  backgroundColor: color,
                  opacity: 0.9,
                }}
              />
              {/* Remaining portion — dim */}
              <div
                className="absolute inset-y-0 right-0"
                style={{
                  width: nowWithinSeg != null ? `${100 - nowWithinSeg}%` : fullyAhead ? "100%" : "0%",
                  backgroundColor: color,
                  opacity: 0.25,
                }}
              />
            </div>
          );
        })}


        {/* Boundary date labels */}
        {labels.map((l) => {
          const fullDate = new Date(`${l.iso}T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
          return (
            <div
              key={l.iso}
              data-tooltip={fullDate}
              className="absolute"
              style={{ left: `${l.x}%`, top: `${TRACK_TOP + BAR_H + 3}px` }}
            >
              <div
                style={{
                  width: "1px",
                  height: "5px",
                  backgroundColor: color,
                  opacity: 0.7,
                  marginLeft: "-0.5px",
                }}
              />
              <span
                className="datum block text-[0.5rem] whitespace-nowrap"
                style={{
                  color,
                  opacity: 0.9,
                  transform:
                    l.x < 3
                      ? "translateX(0)"
                      : l.x > 97
                        ? "translateX(-100%)"
                        : "translateX(-50%)",
                  marginTop: "2px",
                }}
              >
                {monthLabel(l.iso)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
