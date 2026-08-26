//components/activation-curve.tsx

"use client";

import { useMemo, useState } from "react";
import {
  windowLabel,
  type ActivationWindow,
  type IntensityCurve,
  type IntensityPoint,
} from "@/lib/growth";
import { GRADE_TINT } from "@/components/activation-map";
import {
  CurveGrid,
  YearTicks,
  H,
  PAD,
  TICK_STEP,
  VIEW_FROM_YEAR,
  W,
} from "@/components/activation-axis";
import {
  Breakdown,
  Contributors,
  ReadoutStrip,
} from "@/components/activation-readout";
import {
  GradeKey,
  SeasonBand,
  SeasonGradient,
} from "@/components/activation-seasons";
import { T } from "@/components/growth-ui";

/**
 * The Activation Index across a life, as one line.
 *
 * An INDEX, and never a percentage. "74%" reads as a probability or a
 * proportion — 74% likely, 74% of something — and neither is a claim this or
 * any chart can support. "74 / 100" reads as what it is: a constructed
 * composite of real observations, in the sense a financial index is. The
 * weighting is ours; the underlying facts are not.
 *
 * Two things it is worth being explicit about, because a reader will otherwise
 * infer the wrong one:
 *
 *   TRAJECTORY RELEVANCE is lifelong and always total. The nodal axis does not
 *   stop being the person's developmental direction between transits.
 *
 *   THE ACTIVATION INDEX is the additional timing pressure on it, and zero is
 *   a perfectly ordinary value. Age 32 scoring 4 does not mean the North Node
 *   barely matters at 32; it means nothing in the sky is pressing on it then.
 *
 * The graded bands underneath answer a categorical question — is this period a
 * convergence or a turning point — and answer a comparative one badly. A long
 * dense convergence can implicate the trajectory more than a narrowly-defined
 * turning point, and four labelled boxes cannot say so. The index and the
 * grade are independent axes: one says HOW MUCH, the other says WHAT
 * CONFIGURATION, and neither ranks the other. The curve sits above the map
 * because of the order the reading wants:
 *
 *   THE CURVE   how strongly the trajectory is implicated
 *   THE SEASONS which stretches are named periods, and what kind — carried by
 *               the colour of the line itself and banded beneath it, because
 *               a season is a span of years and a caption over a dot said it
 *               was a moment
 *   THE LANES   which transits are responsible
 *   THE DRAWER  what the period is asking
 *
 * The labels stop competing with each other and become annotations of the
 * line, which is the hierarchy the page was missing.
 *
 * The breakdown is always visible for whatever point is being read. A score
 * whose composition can be inspected is an argument; one whose composition is
 * hidden is a horoscope with a decimal point.
 */


export default function ActivationCurve({
  curve,
  windows,
  age,
  lifespan,
  dataUntilAge,
  feedEndYear,
  birth,
  selected,
  onSelect,
}: {
  curve: IntensityCurve;
  windows: ActivationWindow[];
  age: number;
  lifespan: number;
  /** Age at which the cached ephemeris runs out. */
  dataUntilAge: number;
  feedEndYear: string;
  /** Birth date, ISO. Ages are the frame; years are what a diary uses. */
  birth: string;
  selected: ActivationWindow | null;
  onSelect: (w: ActivationWindow) => void;
}) {
  const [hover, setHover] = useState<IntensityPoint | null>(null);

  /**
   * Age → calendar year.
   *
   * Both belong on the axis and neither replaces the other. Age is the frame
   * the page argues in — "when in my life" — and a year is what a person
   * actually plans against; a reader told "your next convergence is at 47"
   * should not have to do the arithmetic to find out that means 2033. A toggle
   * was the alternative and it is the worse one: it hides half the answer
   * behind a click to save a row of small text.
   */
  const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;
  const birthMs = Date.parse(`${birth.slice(0, 10)}T12:00:00Z`);
  const yearAt = (a: number) =>
    new Date(birthMs + a * YEAR_MS).getUTCFullYear();
  /** Age at 1 January of a calendar year — the axis ticks on round years. */
  const ageOfYear = (y: number) => (Date.UTC(y, 0, 1) - birthMs) / YEAR_MS;

  // The drawn span, in age units. Clamped to birth, so a chart whose owner was
  // born after VIEW_FROM_YEAR simply starts at their birth instead of before it.
  const viewFrom = Math.max(0, ageOfYear(VIEW_FROM_YEAR));
  const viewTo = lifespan;

  const x = (a: number) =>
    PAD.left + ((a - viewFrom) / (viewTo - viewFrom)) * (W - PAD.left - PAD.right);
  const y = (v: number) =>
    PAD.top + (1 - v / 100) * (H - PAD.top - PAD.bottom);

  const visible = curve.points.filter(
    (p) => p.age >= viewFrom && p.age <= viewTo,
  );

  const { line, area } = useMemo(() => {
    const pts = visible.map((p) => `${x(p.age).toFixed(1)},${y(p.value).toFixed(1)}`);
    if (pts.length === 0) return { line: "", area: "" };
    return {
      line: `M${pts.join("L")}`,
      area: `M${x(viewFrom).toFixed(1)},${y(0).toFixed(1)}L${pts.join("L")}L${x(viewTo).toFixed(1)},${y(0).toFixed(1)}Z`,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curve, viewFrom, viewTo]);

  /** The window a peak sits inside, so the annotation can name its kind. */
  const windowAt = (a: number) =>
    windows.find((w) => a >= w.ageStart && a <= w.ageEnd) ?? null;

  /**
   * Nearest sample to the pointer, via the SVG's own transform.
   *
   * The obvious version — take the fraction of the bounding box the pointer
   * sits at and scale it by the viewBox width — is wrong whenever the element's
   * aspect ratio differs from the viewBox's, which here it always does: the
   * height is set independently by a clamp. Under the default
   * `preserveAspectRatio` the drawing is scaled to fit and CENTRED, so there is
   * dead space at both ends that the box-fraction maths knows nothing about.
   * The error is zero at the centre and grows toward both edges with opposite
   * signs, which is exactly how it looked: the marker lagged the cursor in the
   * left half and led it in the right.
   *
   * `getScreenCTM()` is the transform the browser actually used, so inverting
   * it converts a client point to user space exactly, whatever the sizing.
   */
  const sampleAt = (
    e: React.MouseEvent<SVGSVGElement>,
  ): IntensityPoint | null => {
    const svg = e.currentTarget;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const local = pt.matrixTransform(ctm.inverse());
    const a =
      viewFrom +
      ((local.x - PAD.left) / (W - PAD.left - PAD.right)) * (viewTo - viewFrom);
    if (a < viewFrom || a > viewTo || visible.length === 0) return null;
    return visible.reduce((best, p) =>
      Math.abs(p.age - a) < Math.abs(best.age - a) ? p : best,
    );
  };

  // Round years inside the drawn span, at the tick interval.
  const years: number[] = [];
  for (
    let yr = Math.ceil(yearAt(viewFrom) / TICK_STEP) * TICK_STEP;
    yr <= yearAt(viewTo);
    yr += TICK_STEP
  ) {
    years.push(yr);
  }

  const shown = hover ?? curve.now;
  const shownWindow = shown ? windowAt(shown.age) : null;

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
        <p className={`${T.tiny} text-bone-faint`}>Growth intensity · 0–100</p>
        <GradeKey />
      </div>

      {/* The reading, then who is causing it, then the chart. The planets were
          above the reading, which put the evidence before the claim. */}
      <ReadoutStrip point={shown} window={shownWindow} />

      <Contributors point={shown} />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 w-full"
        style={{ height: "clamp(210px, 28vw, 300px)" }}
        onMouseMove={(e) => setHover(sampleAt(e))}
        onMouseLeave={() => setHover(null)}
        onClick={() => {
          if (shownWindow) onSelect(shownWindow);
        }}
      >
        <defs>
          <pattern
            id="no-data"
            width={6}
            height={6}
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={6}
              stroke="var(--color-rule)"
              strokeWidth={1}
            />
          </pattern>

          {/* The seasons, as paint for the line and the area under it. */}
          <SeasonGradient
            id="seasons"
            windows={windows}
            x={x}
            viewFrom={viewFrom}
            viewTo={viewTo}
          />
        </defs>

        <CurveGrid y={y} />

        <YearTicks years={years} x={x} ageOfYear={ageOfYear} />

        <SeasonBand
          windows={windows}
          x={x}
          viewFrom={viewFrom}
          viewTo={viewTo}
          selected={selected}
          hovered={shownWindow}
          onSelect={onSelect}
        />

        {/* Past the ephemeris there is nothing to compute from, and the line
            falls to almost nothing — which reads as a quiet old age rather
            than as an absent cache. A curve is far more suggestive than the
            lanes were about this, so the region is struck out rather than
            merely footnoted. */}
        {dataUntilAge < viewTo ? (
          <>
            <rect
              x={x(Math.max(dataUntilAge, viewFrom))}
              width={Math.max(x(viewTo) - x(Math.max(dataUntilAge, viewFrom)), 0)}
              y={PAD.top}
              height={H - PAD.top - PAD.bottom}
              fill="url(#no-data)"
            />
            <line
              x1={x(dataUntilAge)}
              x2={x(dataUntilAge)}
              y1={PAD.top}
              y2={H - PAD.bottom}
              stroke="var(--color-ember-dim)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text
              x={x(dataUntilAge) + 6}
              y={PAD.top + 10}
              fill="var(--color-ember-dim)"
              className="datum"
              fontSize={8.5}
              letterSpacing={1.4}
            >
              NO TRANSIT DATA AFTER {feedEndYear}
            </text>
          </>
        ) : null}

        {/* The area takes the same paint at a tenth of its weight, so a
            season's colour reaches the axis under its own stretch of line
            without a second encoding being invented for it. */}
        <path d={area} fill="url(#seasons)" opacity={0.1} />
        <path
          d={line}
          fill="none"
          stroke="url(#seasons)"
          strokeWidth={1.75}
          strokeLinejoin="round"
        />

        {/* Peaks, captioning the season they fall in. The peak is where the
            words FIT — the extent they are true of is the wash beneath them
            and the segment in the band below, which is what stops a two-line
            label over a dot from reading as a claim about one afternoon. */}
        {/* Peaks are labelled in ordinary English and nothing else.
            "TURNING POINT" used to sit here and it should not have: a turning
            point is an interpretation of a life, not an observation of a sky,
            and printing it on a chart asserts an event nobody can see from a
            chart. What the model can say is what kind of process is running
            and which way it points — Transformation · Pull Forward — with the
            index beneath it. The classification survives, hedged, in the
            readout and the drawer, where there is room to say it carefully. */}
        {curve.peaks
          .filter((pk) => pk.age >= viewFrom && pk.age <= viewTo)
          .map((pk) => {
          const w = windowAt(pk.age);
          const tint = w ? GRADE_TINT[w.grade] : "var(--color-bone-faint)";
          const label = w ? windowLabel(w) : null;
          // Centred labels run off both ends of the plot — the span reaches
          // birth and age ninety now, so peaks genuinely sit at the edges and
          // "TRANSFORMATION" was being cut in half at the right. Anchoring
          // turns the label inward instead of clipping it.
          const px = x(pk.age);
          const anchor =
            px > W - 90 ? "end" : px < PAD.left + 90 ? "start" : "middle";
          return (
            <g key={pk.age}>
              <circle cx={px} cy={y(pk.value)} r={3} fill={tint} />
              <text
                x={px}
                y={y(pk.value) - 19}
                textAnchor={anchor}
                fill={tint}
                className="datum"
                fontSize={9}
                letterSpacing={1.3}
              >
                {(label?.process ?? "PEAK").toUpperCase()}
              </text>
              <text
                x={px}
                y={y(pk.value) - 9}
                textAnchor={anchor}
                fill="var(--color-bone-faint)"
                className="datum"
                fontSize={8}
                letterSpacing={1.1}
              >
                {label ? label.direction.toLowerCase() : pk.value}
              </text>
            </g>
          );
        })}

        {age > viewFrom && age < viewTo ? (
          <>
            <line
              x1={x(age)}
              x2={x(age)}
              y1={PAD.top - 8}
              y2={H - PAD.bottom}
              stroke="var(--color-bone-faint)"
              strokeWidth={1}
              opacity={0.5}
            />
            <text
              x={x(age)}
              y={PAD.top - 12}
              textAnchor="middle"
              fill="var(--color-bone-faint)"
              className="datum"
              fontSize={8.5}
              letterSpacing={1.4}
            >
              NOW
            </text>
          </>
        ) : null}

        {/* The selected window, shaded so the curve and the list agree about
            which period is being read. */}
        {selected ? (
          <rect
            x={x(selected.ageStart)}
            width={Math.max(x(selected.ageEnd) - x(selected.ageStart), 2)}
            y={PAD.top}
            height={H - PAD.top - PAD.bottom}
            fill="var(--color-bone)"
            opacity={0.07}
          />
        ) : null}

        {/* The crosshair, painted last so nothing overlaps it.
            Age and year ride with the cursor rather than sitting in a corner
            of the strip above: they describe the one point being pointed at,
            and reading them anywhere else means looking away from the line and
            back. The backing rectangle is what keeps them legible where the
            label crosses a peak annotation or the curve itself. */}
        {shown ? (
          <g>
            <line
              x1={x(shown.age)}
              x2={x(shown.age)}
              y1={y(shown.value)}
              y2={H - PAD.bottom}
              stroke="var(--color-bone-faint)"
              strokeWidth={1}
              opacity={0.35}
            />
            <rect
              x={Math.min(
                Math.max(x(shown.age) - 34, PAD.left),
                W - PAD.right - 68,
              )}
              y={y(shown.value) - 26}
              width={68}
              height={15}
              fill="var(--color-surface-alt)"
              stroke="var(--color-rule)"
              strokeWidth={1}
            />
            <text
              x={Math.min(
                Math.max(x(shown.age), PAD.left + 34),
                W - PAD.right - 34,
              )}
              y={y(shown.value) - 15}
              textAnchor="middle"
              fill="var(--color-bone)"
              className="datum"
              fontSize={8.5}
              letterSpacing={0.8}
            >
              age {Math.round(shown.age)} · {yearAt(shown.age)}
            </text>
            <circle
              cx={x(shown.age)}
              cy={y(shown.value)}
              r={4}
              fill="var(--color-void)"
              stroke="var(--color-bone)"
              strokeWidth={1.5}
            />
          </g>
        ) : null}
      </svg>

      {/* What the number is made of, directly under the chart and at a fixed
          height. It sat below the contributor rows, which grow and shrink with
          the hover, so the six bars slid up and down the page while a reader
          was trying to compare them. The variable-height list goes last. */}
      {shown ? <Breakdown point={shown} /> : null}

      {shownWindow ? (
        <button
          type="button"
          onClick={() => onSelect(shownWindow)}
          className={`${T.micro} mt-7 border border-patina-dim px-5 py-3 text-patina transition-colors hover:border-patina hover:bg-patina-deep`}
        >
          Read age {Math.round(shownWindow.ageStart)}
          {Math.round(shownWindow.ageEnd) > Math.round(shownWindow.ageStart)
            ? `–${Math.round(shownWindow.ageEnd)}`
            : ""}{" "}
          →
        </button>
      ) : null}

      <p className={`${T.note} mt-6 max-w-2xl`}>
        Measures how densely the natal growth axis is being activated — not how
        good, bad or eventful a period will be. It is built from the directness
        of each contact, how many independent pressures overlap, whether the
        nodal rhythm is in season, how much of the axis is implicated and
        whether contacts repeat. No planet is worth more than another.{" "}
        {dataUntilAge < viewTo ? (
          <>
            Past {feedEndYear} the cache holds no transits, so the line there is
            missing data rather than a quiet life.
          </>
        ) : null}
      </p>
    </div>
  );
}

