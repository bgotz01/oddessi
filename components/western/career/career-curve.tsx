//components/western/career/career-curve.tsx
"use client";

import { useMemo, useState } from "react";
import {
  birthMsOf,
  YEAR_MS,
  type CareerCurveModel,
  type CareerPoint,
  type CareerWindow,
  type CareerWindowGrade,
} from "@/lib/career";
import { T } from "@/components/western/growth/growth-ui";
import CareerStrip from "@/components/western/career/career-strip";
import CareerTransitSidebar from "@/components/western/career/career-transit-sidebar";
import {
  CareerBreakdown,
  CareerReadingPanel,
  CareerReadout,
} from "@/components/western/career/career-readout";
import CareerRangeControls, {
  careerView,
  CAREER_RANGE_INITIAL,
  type CareerRangeState,
} from "@/components/western/career/career-range";

/**
 * What colour each career grade takes on the curve line.
 *
 * Matches the logic in activation-seasons: named seasons use their grade
 * colour, quiet gaps use a muted bone so the line stays continuous without
 * competing with the coloured stretches.
 */
const CAREER_LINE_TINT: Record<CareerWindowGrade | "quiet", string> = {
  quiet: "color-mix(in srgb, var(--color-bone-faint) 55%, var(--color-void))",
  active: "var(--color-patina)",
  convergence: "var(--color-patina)",
  turningPoint: "var(--color-ember)",
};

/**
 * The career seasons as a horizontal linear gradient for the curve stroke.
 *
 * Two stops per window (flat colour across its span), so the hue changes
 * exactly at the season boundary rather than ramping between them.
 * Same technique as SeasonGradient in activation-seasons.tsx.
 */
function CareerSeasonGradient({
  id,
  windows,
  x,
  viewFrom,
  viewTo,
}: {
  id: string;
  windows: CareerWindow[];
  x: (age: number) => number;
  viewFrom: number;
  viewTo: number;
}) {
  type Span = { from: number; to: number; grade: CareerWindowGrade | "quiet" };
  const segs: Span[] = [];
  let at = viewFrom;
  for (const w of [...windows].sort((a, b) => a.ageStart - b.ageStart)) {
    const from = Math.max(w.ageStart, viewFrom, at);
    const to = Math.min(w.ageEnd, viewTo);
    if (to <= from) continue;
    if (from > at) segs.push({ from: at, to: from, grade: "quiet" });
    segs.push({ from, to, grade: w.grade });
    at = to;
  }
  if (at < viewTo) segs.push({ from: at, to: viewTo, grade: "quiet" });

  const span = viewTo - viewFrom;
  const pct = (age: number) =>
    Math.min(Math.max((age - viewFrom) / span, 0), 1);

  return (
    <linearGradient
      id={id}
      gradientUnits="userSpaceOnUse"
      x1={x(viewFrom)}
      y1={0}
      x2={x(viewTo)}
      y2={0}
    >
      {segs.flatMap((s, i) => [
        <stop key={`${i}a`} offset={pct(s.from)} stopColor={CAREER_LINE_TINT[s.grade]} />,
        <stop key={`${i}b`} offset={pct(s.to)} stopColor={CAREER_LINE_TINT[s.grade]} />,
      ])}
    </linearGradient>
  );
}

/**
 * The tick spacings the year axis is allowed to use, coarsest last.
 *
 * A decade was hard-coded when the curve only ever drew a whole life. Under a
 * twelve-year custom range that axis carries one label and names nothing, and
 * under a five-year one it carries none at all.
 */
const TICK_STEPS = [1, 2, 5, 10, 20, 25, 50];

/** How many year labels the two-line tick can carry across the plot. */
const MAX_TICKS = 11;

/**
 * The curve between two ages, with both edges interpolated onto the line.
 *
 * Filtering the samples alone would leave up to a sample-step of line missing
 * at each end — a quarter of a year, invisible across a whole life and a
 * visible gap against the axis once the view is a few decades wide.
 */
function clipToView(
  points: CareerPoint[],
  from: number,
  to: number,
): { age: number; value: number }[] {
  const at = (a: CareerPoint, b: CareerPoint, age: number) => ({
    age,
    value: a.value + ((b.value - a.value) * (age - a.age)) / (b.age - a.age),
  });
  const out: { age: number; value: number }[] = [];
  for (let index = 0; index < points.length; index += 1) {
    const point = points[index];
    const previous = points[index - 1];
    if (point.age >= from && point.age <= to) {
      if (previous && previous.age < from) out.push(at(previous, point, from));
      out.push({ age: point.age, value: point.value });
    } else if (previous && previous.age >= from && previous.age <= to && point.age > to) {
      out.push(at(previous, point, to));
    }
  }
  return out;
}

const W = 1000;
const H = 300;
const PAD = { top: 32, right: 12, bottom: 40, left: 36 };
const GRID = [0, 20, 40, 60, 80, 100];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function CareerCurve({
  model,
  birth,
}: {
  model: CareerCurveModel;
  birth: string;
}) {
  const [hover, setHover] = useState<CareerPoint | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [range, setRange] = useState<CareerRangeState>(CAREER_RANGE_INITIAL);
  const birthMs = birthMsOf(birth);
  // The curve is computed in ages; the control is stated in calendar years.
  // This is the one place the two meet.
  const view = careerView(range, birthMs, model.lifespan);
  const viewFrom = view.from;
  const viewTo = view.to;
  const x = (age: number) =>
    PAD.left + ((age - viewFrom) / (viewTo - viewFrom)) * (W - PAD.left - PAD.right);
  const y = (value: number) =>
    PAD.top + (1 - value / 100) * (H - PAD.top - PAD.bottom);
  const yearAt = (age: number) => new Date(birthMs + age * YEAR_MS).getUTCFullYear();
  const monthAt = (age: number) => {
    const date = new Date(birthMs + age * YEAR_MS);
    return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  };
  const ageOfYear = (year: number) => (Date.UTC(year, 0, 1) - birthMs) / YEAR_MS;

  /**
   * Where the year labels fall — chosen from the width of the view rather than
   * fixed at a decade, so a fifty-year default and a six-year custom range
   * both come out with an axis that names things.
   */
  const tickStep =
    TICK_STEPS.find((step) => (viewTo - viewFrom) / step <= MAX_TICKS) ?? 50;
  const years: number[] = [];
  for (
    let year = Math.ceil(yearAt(viewFrom) / tickStep) * tickStep;
    year <= yearAt(viewTo);
    year += tickStep
  ) {
    // The first multiple of the step can land before the left edge — the view
    // starts mid-year. Dropping it is better than drawing a tick outside the
    // plot.
    if (ageOfYear(year) >= viewFrom) years.push(year);
  }

  /** The samples the view actually contains, for hover and for the plot. */
  const inView = useMemo(
    () => model.points.filter((point) => point.age >= viewFrom && point.age <= viewTo),
    [model.points, viewFrom, viewTo],
  );
  const drawn = useMemo(
    () => clipToView(model.points, viewFrom, viewTo),
    [model.points, viewFrom, viewTo],
  );

  const line = useMemo(
    () =>
      drawn.length
        ? `M${drawn.map((point) => `${x(point.age).toFixed(1)},${y(point.value).toFixed(1)}`).join("L")}`
        : "",
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drawn],
  );
  const area = line
    ? `${line}L${x(drawn[drawn.length - 1].age)},${y(0)}L${x(drawn[0].age)},${y(0)}Z`
    : "";
  const selected = model.windows.find((window) => window.id === selectedId) ?? null;
  const current = model.windows.find((window) => window.status === "active") ?? null;
  const windowAt = (age: number) =>
    model.windows.find((window) => age >= window.ageStart && age <= window.ageEnd) ?? null;
  const shownWindow = hover ? windowAt(hover.age) : selected ?? current;
  const shown = hover ?? shownWindow?.peak ?? model.now;

  const sampleAt = (event: React.MouseEvent<SVGSVGElement>): CareerPoint | null => {
    const svg = event.currentTarget;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const local = point.matrixTransform(ctm.inverse());
    const age =
      viewFrom +
      ((local.x - PAD.left) / (W - PAD.left - PAD.right)) * (viewTo - viewFrom);
    if (age < viewFrom || age > viewTo || !inView.length) return null;
    return inView.reduce((best, candidate) =>
      Math.abs(candidate.age - age) < Math.abs(best.age - age) ? candidate : best,
    );
  };

  return (
    <section className="mt-12">
      {/* Fixed above the chart, whatever the pointer is doing. Two bulleted
          lists used to sit here, one of them gaining a line whenever the
          hovered moment fell inside a window — which resized the block and
          shoved the plot up and down under the cursor trying to read it. */}
      {/* Parallel to Growth, and stated as what the instrument measures.
          It read "Career Activation Index · activation, not guaranteed
          success", which is defensive copy in the one place that should be a
          definition: the index is not trying and failing to predict success,
          it is measuring vocational activation, and saying so plainly is a
          stronger disclaimer than the disclaimer was. The caveat itself is
          not gone — it is in the scoring modal, the grade tooltip and the
          full reading, where someone asking the question will meet it. */}
      {/* The same grid template as the plot below, so the range buttons sit
          flush with the right edge of the CURVE rather than over the transit
          sidebar — a control floating above a panel it does not govern reads
          as that panel's control. */}
      <div className="grid gap-x-8 xl:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p className={`${T.tiny} text-bone-faint`}>
              Career Activation Index · 0–100
            </p>
            <p className={`${T.note} mt-1.5`}>
              How strongly each period activates career.
            </p>
          </div>

          {/* Changing the range clears the pinned window: a sidebar still
              reading a period that has just left the plot is a panel about
              something the reader can no longer see or click away from. */}
          <CareerRangeControls
            state={range}
            onChange={(next) => {
              setRange(next);
              setSelectedId(null);
              setHover(null);
            }}
            birthMs={birthMs}
            lifespan={model.lifespan}
          />
        </div>
      </div>

      <div className="mt-3 grid items-start gap-x-8 gap-y-8 xl:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="min-w-0">
          <CareerReadout point={shown} window={shownWindow} />

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="mt-6 w-full"
            style={{ height: "clamp(220px, 30vw, 320px)" }}
            onMouseMove={(event) => setHover(sampleAt(event))}
            onMouseLeave={() => setHover(null)}
            onClick={() => {
              if (hover) {
                const under = windowAt(hover.age);
                if (under) setSelectedId(under.id);
              }
            }}
            aria-label="Career activation across the life"
          >
            <defs>
              <linearGradient id="career-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--color-patina)" stopOpacity="0.24" />
                <stop offset="1" stopColor="var(--color-patina)" stopOpacity="0.01" />
              </linearGradient>
              <CareerSeasonGradient
                id="career-seasons"
                windows={model.windows}
                x={x}
                viewFrom={viewFrom}
                viewTo={viewTo}
              />
            </defs>

            {GRID.map((value) => (
              <g key={value}>
                <line x1={PAD.left} x2={W - PAD.right} y1={y(value)} y2={y(value)} stroke="var(--color-rule-faint)" />
                <text x={PAD.left - 8} y={y(value) + 3} textAnchor="end" fill="var(--color-bone-faint)" className="datum" fontSize={9}>{value}</text>
              </g>
            ))}

            {years.map((year) => {
              const age = ageOfYear(year);
              return (
                <g key={year}>
                  <line x1={x(age)} x2={x(age)} y1={H - PAD.bottom} y2={H - PAD.bottom + 4} stroke="var(--color-rule)" />
                  <text x={x(age)} y={H - PAD.bottom + 15} textAnchor="middle" fill="var(--color-bone-soft)" className="datum" fontSize={9}>{year}</text>
                  <text x={x(age)} y={H - PAD.bottom + 25} textAnchor="middle" fill="var(--color-bone-faint)" className="datum" fontSize={8}>age {Math.round(age)}</text>
                </g>
              );
            })}

            {/* Before the vocational floor.
            The line is continuous because the architecture is genuinely being
            contacted from birth — a Pluto square to the Midheaven at seven is
            the same transit whenever it lands. What is not true that early is
            the noun, so the span is greyed and named rather than cut, and no
            peak or window is drawn inside it. */}
            {model.floorAge > viewFrom ? (
              <g>
                <rect
                  x={x(viewFrom)}
                  width={Math.max(x(Math.min(model.floorAge, viewTo)) - x(viewFrom), 0)}
                  y={PAD.top}
                  height={H - PAD.top - PAD.bottom}
                  fill="var(--color-void)"
                  opacity={0.45}
                />
                {model.floorAge <= viewTo ? (
                  <line
                    x1={x(model.floorAge)}
                    x2={x(model.floorAge)}
                    y1={PAD.top}
                    y2={H - PAD.bottom}
                    stroke="var(--color-rule)"
                    strokeDasharray="2 3"
                  />
                ) : null}
                <text
                  x={x(viewFrom) + 6}
                  y={PAD.top + 11}
                  fill="var(--color-bone-faint)"
                  className="datum"
                  fontSize={8}
                >
                  pre-vocational
                </text>
              </g>
            ) : null}

            <path d={area} fill="url(#career-area)" />
            <path d={line} fill="none" stroke="url(#career-seasons)" strokeWidth={2} strokeLinejoin="round" />

            {model.peaks
              .filter((peak) => peak.age >= viewFrom && peak.age <= viewTo)
              .map((peak) => (
              <g key={peak.age}>
                <circle cx={x(peak.age)} cy={y(peak.value)} r={3} fill="var(--color-ember)" />
                <text x={x(peak.age)} y={y(peak.value) - 9} textAnchor="middle" fill="var(--color-bone-faint)" className="datum" fontSize={8.5}>{yearAt(peak.age)}</text>
              </g>
            ))}

            {model.age > viewFrom && model.age < viewTo ? (
              <g>
                <line x1={x(model.age)} x2={x(model.age)} y1={PAD.top - 8} y2={H - PAD.bottom} stroke="var(--color-signal)" strokeWidth={2} />
                <text x={x(model.age)} y={PAD.top - 13} textAnchor="middle" fill="var(--color-signal)" className="datum" fontSize={8.5}>NOW</text>
              </g>
            ) : null}

            {selected && selected.ageEnd > viewFrom && selected.ageStart < viewTo ? (
              <rect
                x={x(Math.max(selected.ageStart, viewFrom))}
                width={Math.max(
                  x(Math.min(selected.ageEnd, viewTo)) - x(Math.max(selected.ageStart, viewFrom)),
                  2,
                )}
                y={PAD.top}
                height={H - PAD.top - PAD.bottom}
                fill="var(--color-bone)"
                opacity={0.07}
              />
            ) : null}

            {/* The crosshair, painted last so nothing overlaps it.
            Age and month ride with the cursor rather than sitting in a corner
            of the strip above: they describe the one point being pointed at,
            and reading them anywhere else means looking away from the line and
            back — which is also what made the corner resize. The backing plate
            keeps them legible where the label crosses a peak or the curve.

            Gated on `hover` alone and not on `shown`. The readout falls back
            to today when the pointer leaves, which is right for a line that
            has to say something; a crosshair is a statement about where the
            CURSOR is, and with no cursor it would park on today claiming to
            point at something nobody is pointing at. NOW already has its own
            labelled rule. */}
            {hover ? (
              <g>
                <line
                  x1={x(hover.age)}
                  x2={x(hover.age)}
                  y1={y(hover.value)}
                  y2={H - PAD.bottom}
                  stroke="var(--color-bone-faint)"
                  strokeWidth={1}
                  opacity={0.35}
                />
                <rect
                  x={Math.min(Math.max(x(hover.age) - 40, PAD.left), W - PAD.right - 80)}
                  y={y(hover.value) - 26}
                  width={80}
                  height={15}
                  fill="var(--color-surface-alt)"
                  stroke="var(--color-rule)"
                  strokeWidth={1}
                />
                <text
                  x={Math.min(Math.max(x(hover.age), PAD.left + 40), W - PAD.right - 40)}
                  y={y(hover.value) - 15}
                  textAnchor="middle"
                  fill="var(--color-bone)"
                  className="datum"
                  fontSize={8.5}
                  letterSpacing={0.8}
                >
                  age {Math.round(hover.age)} · {monthAt(hover.age)}
                </text>
                <circle
                  cx={x(hover.age)}
                  cy={y(hover.value)}
                  r={4}
                  fill="var(--color-void)"
                  stroke="var(--color-bone)"
                  strokeWidth={1.5}
                />
              </g>
            ) : null}
          </svg>

          <CareerStrip
            windows={model.windows}
            age={model.age}
            viewFrom={viewFrom}
            viewTo={viewTo}
            selected={selected}
            onSelect={(window) => setSelectedId(window.id)}
          />
        </div>

        <CareerTransitSidebar
          window={selected ?? current}
          pinned={Boolean(selected)}
          onClear={() => setSelectedId(null)}
        />
      </div>

      {/* Fixed height while closed, so opening it is the only thing that ever
          moves the block below. */}
      {shown ? <CareerBreakdown point={shown} /> : null}

      {/* The one variable-height block, and therefore last. It reads the
          SELECTED window rather than the hovered sample — a list that grows
          from one row to five as the pointer moves is what was pushing the
          page around, and "which planets, on what" is a question about a
          period someone chose, not about a pixel. */}
      <CareerReadingPanel
        window={selected ?? current}
        architecture={model.architecture}
        onClear={() => setSelectedId(null)}
      />
    </section>
  );
}
