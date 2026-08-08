import Link from "next/link";
import { type Band, hasRetrograde, statusOfBand } from "@/lib/band";

/**
 * The spine of the app: many bands over one axis, with a single line marking
 * the present cutting through all of them.
 *
 * Each band draws twice — a faint envelope for the whole span, and solid bars
 * for the stretches actually in effect. When a planet stations retrograde the
 * gap between those bars is the point: you can see it leave and come back
 * without losing the shape of the whole transit. Month labels mark the
 * station-out and station-in dates so the gap is legible at a glance.
 *
 * Rendered entirely on the server; `now` is passed in so bars and the
 * present-line agree with each other.
 */

const LABEL_W = "15rem";

interface Scale {
  windowStart: string;
  windowEnd: string;
}

function fractionOf(iso: string, scale: Scale): number {
  const start = Date.parse(scale.windowStart);
  const span = Date.parse(scale.windowEnd) - start;
  return (Date.parse(iso) - start) / span;
}

/** Percentage along the axis, clamped to the visible window. */
function pct(iso: string, scale: Scale): number {
  return Math.min(100, Math.max(0, fractionOf(iso, scale) * 100));
}

function axisYears(scale: Scale): number[] {
  const first = new Date(scale.windowStart).getUTCFullYear();
  const last = new Date(scale.windowEnd).getUTCFullYear();
  const years: number[] = [];
  const step = last - first > 18 ? 5 : last - first > 10 ? 2 : 1;
  for (let y = Math.ceil(first / step) * step; y <= last; y += step) {
    years.push(y);
  }
  return years;
}

function monthOnly(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "short",
    timeZone: "UTC",
  });
}

function YearAxis({ scale }: { scale: Scale }) {
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

function YearGrid({ scale }: { scale: Scale }) {
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

/** Month labels at each retrograde station edge, min 5% apart to avoid collision. */
function RetroLabels({
  band,
  scale,
  tint,
}: {
  band: Band;
  scale: Scale;
  tint: string;
}) {
  if (band.segments.length < 2) return null;

  // Collect station-out (end of seg n) and station-in (start of seg n+1) pairs.
  const points: Array<{ iso: string; x: number }> = [];
  for (let i = 0; i < band.segments.length - 1; i++) {
    points.push({ iso: band.segments[i].end, x: pct(band.segments[i].end, scale) });
    points.push({ iso: band.segments[i + 1].start, x: pct(band.segments[i + 1].start, scale) });
  }

  // Thin: only suppress labels that would literally overlap (< 2%).
  const kept: typeof points = [];
  for (const p of points) {
    if (!kept.length || p.x - kept[kept.length - 1].x >= 2) kept.push(p);
  }

  return (
    <>
      {kept.map((p) => (
        <div
          key={p.iso}
          className="absolute"
          style={{ left: `${p.x}%`, top: "50%", transform: "translateY(calc(-50% + 14px))" }}
        >
          {/* tick */}
          <div
            className="mx-auto w-px"
            style={{ height: "6px", backgroundColor: tint, opacity: 0.5 }}
          />
          <span
            className="datum block text-[0.5rem] whitespace-nowrap"
            style={{
              color: tint,
              opacity: 0.7,
              transform:
                p.x < 4
                  ? "translateX(0)"
                  : p.x > 96
                    ? "translateX(-100%)"
                    : "translateX(-50%)",
            }}
          >
            {monthOnly(p.iso)}
          </span>
        </div>
      ))}
    </>
  );
}

function BandRow({
  band,
  now,
  scale,
}: {
  band: Band;
  now: Date;
  scale: Scale;
}) {
  const status = statusOfBand(band, now);
  const left = pct(band.start, scale);
  const width = pct(band.end, scale) - left;
  const retro = hasRetrograde(band);

  const tint = band.color ?? "var(--color-patina)";
  const fillOpacity =
    status === "active" ? 1 : status === "completed" ? 0.25 : 0.5;

  // Track height: taller when there are retro labels below the bar.
  const trackH = retro ? "h-16" : "h-12";

  const body = (
    <>
      {/* Label column */}
      <div className="flex items-center gap-3 py-3 pr-4">
        <span className="glyph w-5 shrink-0 text-lg leading-none" style={{ color: tint }}>
          {band.glyph}
        </span>
        <span className="min-w-0 flex-1">
          <span className="inscription block truncate text-[0.6875rem] text-bone">
            {band.title}
          </span>
          <span className="block truncate text-[0.75rem] font-light italic text-bone-faint">
            {band.subtitle}
          </span>
        </span>
        {retro ? (
          <span
            className="datum shrink-0 text-[0.625rem] text-ember"
            title={`${band.segments.length} passes — stations retrograde`}
          >
            ℞
          </span>
        ) : null}
      </div>

      {/* Track column */}
      <div className={`relative ${trackH}`}>
        {/* Background rule */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-[7px] h-px bg-rule-faint" />

        {/* Envelope — the full span, hairline, caps the segments visually */}
        <div
          className="absolute rounded-[1px]"
          style={{
            left: `${left}%`,
            width: `${width}%`,
            top: "calc(50% - 7px - 3px)",
            height: "6px",
            backgroundColor: tint,
            opacity: 0.15,
          }}
        />

        {/* In-effect segments — the solid bars */}
        {band.segments.map((seg) => {
          const segLeft = pct(seg.start, scale);
          const segWidth = Math.max(0.2, pct(seg.end, scale) - segLeft);
          return (
            <div
              key={`${seg.start}-${seg.end}`}
              className="absolute rounded-[1px]"
              style={{
                left: `${segLeft}%`,
                width: `${segWidth}%`,
                top: "calc(50% - 7px - 3px)",
                height: "6px",
                backgroundColor: tint,
                opacity: fillOpacity,
              }}
            />
          );
        })}

        {/* Exactitude — ember tick */}
        {band.peak ? (
          <div
            className="absolute"
            style={{
              left: `${pct(band.peak, scale)}%`,
              top: "calc(50% - 7px - 6px)",
            }}
          >
            <div className="h-4 w-px -translate-x-1/2 bg-ember opacity-80" />
          </div>
        ) : null}

        {/* Retrograde gap labels */}
        <RetroLabels band={band} scale={scale} tint={tint} />
      </div>
    </>
  );

  const className =
    "group grid items-center border-b border-rule-faint transition-colors hover:bg-surface-alt";
  const style = { gridTemplateColumns: `${LABEL_W} 1fr` };

  return band.href ? (
    <Link href={band.href} className={className} style={style}>
      {body}
    </Link>
  ) : (
    <div className={className} style={style}>
      {body}
    </div>
  );
}

export default function Timeline({
  bands,
  now,
  windowStart,
  windowEnd,
}: {
  bands: Band[];
  now: Date;
  windowStart: string;
  windowEnd: string;
}) {
  const scale = { windowStart, windowEnd };
  const nowFraction = fractionOf(now.toISOString().slice(0, 10), scale);
  const nowVisible = nowFraction >= 0 && nowFraction <= 1;

  return (
    <div className="relative pt-6">
      <YearAxis scale={scale} />

      <div className="relative border-t border-rule">
        <YearGrid scale={scale} />
        {bands.map((b) => (
          <BandRow key={b.id} band={b} now={now} scale={scale} />
        ))}
      </div>

      {/* The present — one line, through everything */}
      {nowVisible ? (
        <div
          className="pointer-events-none absolute top-0 bottom-0 border-l border-patina"
          style={{
            left: `calc(${LABEL_W} + (100% - ${LABEL_W}) * ${nowFraction})`,
          }}
        >
          <span className="datum absolute top-0 left-2 text-[0.5625rem] uppercase tracking-[0.2em] whitespace-nowrap text-patina">
            Now
          </span>
        </div>
      ) : null}
    </div>
  );
}
