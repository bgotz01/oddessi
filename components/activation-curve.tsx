//components/activation-curve.tsx

"use client";

import { useMemo, useState } from "react";
import {
  NODAL_PERIOD_YEARS,
  type ActivationWindow,
  type IntensityCurve,
  type IntensityPoint,
  type NodalBeat,
} from "@/lib/growth";
import {
  CurveGrid,
  YearTicks,
  H,
  PAD,
  TICK_STEP,
  VIEW_FROM_YEAR,
  W,
} from "@/components/activation-axis";
import { Breakdown, ReadoutStrip } from "@/components/activation-readout";
import { SeasonGradient, GRADE_TINT } from "@/components/activation-seasons";
import ActivationStrip from "@/components/activation-strip";
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
 *               the colour of the line itself, because a season is a span of
 *               years and a caption over a dot said it was a moment. The
 *               boundaries are read off the whole-life strip above the plot,
 *               which is the page's one row of graded bars; a second row under
 *               this axis was the same claim a third time, after the wash and
 *               the line's own hue.
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


/** Short month names for the crosshair. Three letters fit the 68px plate. */
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function ActivationCurve({
  curve,
  windows,
  beats,
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
  /** Passed straight through to the strip, which draws them. */
  beats: NodalBeat[];
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
  const [showPhase, setShowPhase] = useState(false);

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
  /**
   * "Jan 2025" — the crosshair's own date.
   *
   * A year alone is a twelve-month answer to a question asked by pointing at
   * one pixel, and the samples are far denser than that: the curve is read by
   * sliding along it, and three consecutive positions all reading "2025" make
   * the label look stuck. The axis ticks keep bare years, which is what an
   * axis is for.
   */
  const monthAt = (a: number) => {
    const d = new Date(birthMs + a * YEAR_MS);
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  };
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

  /**
   * The nodal cycle as a wave, for the optional second line.
   *
   * `cos(2π · age / 18.6129)` is not a metaphor for the cycle, it IS the
   * cycle: +1 is the transiting north node standing on the natal north node, 0
   * is square the axis, −1 is the transiting north node on the natal south
   * node. The four beats the model already names are this wave's crest, its
   * two zero crossings and its trough, so the line does not add a claim — it
   * fills in the twelve-odd years between checkpoints that were previously
   * drawn as nothing at all.
   *
   * It is the same for everybody alive, which is exactly why it is a TOGGLE
   * and never the default. The index is a reading of one chart; this is a
   * clock. Drawing them together without asking would imply the second was
   * also about the person.
   */
  const phase = useMemo(() => {
    const step = (viewTo - viewFrom) / 600;
    const pts: string[] = [];
    for (let a = viewFrom; a <= viewTo; a += step) {
      const v = Math.cos((2 * Math.PI * a) / NODAL_PERIOD_YEARS);
      // −1…+1 across the plot, inset so the extremes do not sit on the frame.
      const py = PAD.top + ((1 - v) / 2) * (H - PAD.top - PAD.bottom);
      pts.push(`${x(a).toFixed(1)},${py.toFixed(1)}`);
    }
    return `M${pts.join("L")}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewFrom, viewTo]);

  /**
   * The end-on contacts, drawn on the plot itself.
   *
   * Returns and reversals only. Both are the axis being met end-on — the
   * transiting node arriving on one of the natal ones — and they are the two a
   * reader is trying to locate a peak against. The squares are real and are
   * already ticked on the strip below; adding them here would put a line every
   * 4.65 years through the drawing and none of the four would stand out.
   */
  const marks = beats.filter(
    (b) => b.kind !== "square" && b.age >= viewFrom && b.age <= viewTo,
  );

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        {/* Name and meaning, separated.
            It read "Growth intensity", which named the wrong thing twice over:
            "growth" implied the number counts growth, and "intensity" is vague
            enough to be read as either. The page is already titled ACTIVATION,
            the model function is `growthActivation`, and the source has called
            this the Activation Index throughout — INDEX being the load-bearing
            word, since "74%" reads as a probability and "74 / 100" reads as
            what it is, a constructed composite of real observations.
            The subtitle carries the one inference that has to be blocked. A
            reader who takes nothing else from this page should not leave
            thinking a high number means they are growing more: the same
            reading falls on someone living their direction and on someone who
            is not, which is why every period here has a trap as well as an
            opening.
            "Pressure" is exact rather than adversarial, and that is checkable:
            only `PRESSURE_PLANETS` — Saturn, Uranus, Neptune, Pluto — move the
            number. Jupiter is read, named and shown as a driver and cannot
            raise it by a point, so the index never rises on a supportive
            contact and the word is the model's own. */}
        <div>
          <p className={`${T.tiny} text-bone-faint`}>Activation index · 0–100</p>
          <p className={`${T.tiny} mt-1.5 text-bone-faint/60`}>
            How strongly each period activates growth.
          </p>
        </div>
        {/* A control, and it has to look like one.
            Two attempts failed the same way. A bare tracked label opposite the
            section title is the exact shape of a heading on this page, and
            adding a small dot in front of it changed the reading not at all —
            a 9px mark beside upper-case tracked type still parses as a bullet
            on a title rather than as a target.
            What separates a control from a label here is a BOX. Every other
            pressable thing on this page has one, so the border is what says
            "press me" before any of the words are read; the fill and the tick
            then say which way it is set. */}
        <button
          type="button"
          role="switch"
          aria-checked={showPhase}
          onClick={() => setShowPhase((v) => !v)}
          className={`${T.tiny} flex items-center gap-2 border px-3 py-1.5 transition-colors`}
          style={{
            borderColor: showPhase
              ? "var(--color-patina)"
              : "var(--color-rule)",
            background: showPhase ? "var(--color-patina-deep)" : "transparent",
            color: showPhase
              ? "var(--color-patina)"
              : "var(--color-bone-faint)",
          }}
        >
          <span
            aria-hidden
            className="block size-[8px] shrink-0 rounded-full border transition-colors"
            style={{
              borderColor: showPhase
                ? "var(--color-patina)"
                : "var(--color-bone-faint)",
              background: showPhase ? "var(--color-patina)" : "transparent",
            }}
          />
          Nodal phase
        </button>
      </div>

      {/* What the pointer is on, and nothing else.
          A row of planets with their houses and targets used to sit here,
          following the cursor. It was the most technical thing on the page in
          the least stable place: it changed on every movement, could not be
          pointed at, and answered a question — which planet, on what — that
          only makes sense about a period a reader has chosen. That evidence
          now lives in the panel beside the chart, where it holds still and can
          be opened. */}
      <ReadoutStrip point={shown} window={shownWindow} />

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

        {/* The nodal cycle, when asked for. Behind everything, because it is
            the ground the index is being read against and not a second
            finding competing with it. */}
        {showPhase ? (
          <>
            {/* The zero crossing — square the axis, the wave's own midline.
                Without it a cosine is just a wobble; with it the crests and
                troughs have something to be measured from. */}
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={PAD.top + (H - PAD.top - PAD.bottom) / 2}
              y2={PAD.top + (H - PAD.top - PAD.bottom) / 2}
              stroke="var(--color-patina)"
              strokeWidth={0.5}
              strokeDasharray="2 4"
              opacity={0.3}
            />
            <path
              d={phase}
              fill="none"
              stroke="var(--color-patina)"
              strokeWidth={1}
              opacity={0.4}
            />
            {/* Which end is which, stated once rather than inferred. */}
            <text
              x={W - PAD.right}
              y={PAD.top + 8}
              textAnchor="end"
              fill="var(--color-patina)"
              className="datum"
              fontSize={7.5}
              letterSpacing={0.8}
              opacity={0.75}
            >
              ON YOUR NORTH NODE
            </text>
            <text
              x={W - PAD.right}
              y={H - PAD.bottom - 3}
              textAnchor="end"
              fill="var(--color-patina)"
              className="datum"
              fontSize={7.5}
              letterSpacing={0.8}
              opacity={0.75}
            >
              ON YOUR SOUTH NODE
            </text>
          </>
        ) : null}

        {/* The end-on contacts of the nodal cycle, always drawn.
            A peak means something different depending on where in the shared
            rhythm it falls, and until these were here a reader had no way to
            tell — the checkpoints were ticked on the strip below the bars, two
            rows away from the line they qualify. Kept to hairlines behind the
            curve: they are a frame of reference, not an event. */}
        {marks.map((b) => (
          <line
            key={`${b.kind}-${b.ordinal}`}
            x1={x(b.age)}
            x2={x(b.age)}
            y1={PAD.top}
            y2={H - PAD.bottom}
            // Structural, so drawn as structure: a bone hairline, the same
            // family as the gridlines these sit among. They briefly borrowed
            // the Council palette's periwinkle to get clear of the NOW rule,
            // which was reaching into a namespace vendored for another app and
            // documented as opacity-modifiers-only. NOW is signal yellow at
            // double weight now, so the cycle marks no longer need a hue to
            // stay clear of it — being quiet is the whole point of them.
            stroke="var(--color-bone-faint)"
            strokeWidth={b.kind === "return" ? 1 : 0.75}
            strokeDasharray={b.kind === "return" ? undefined : "2 3"}
            opacity={b.kind === "return" ? 0.45 : 0.28}
          />
        ))}

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

        {/* Peaks, marked and DATED.
            Two lines of composed reading used to sit over each dot —
            "TRANSFORMATION / pressure to change" — which is an interpretation
            of a life printed on a drawing of a sky, and the drawer says the
            same at length when a period is opened. Cutting that to the index
            value fixed the overclaiming and left a different problem: "80" over
            a dot is the height of a line a reader can already see is high, and
            it means nothing without the six-ingredient breakdown behind it. A
            number that has to be explained is not an annotation.
            The year is the one fact the drawing cannot show. The x-axis is
            ticked every five years, so reading a peak's date off it means
            interpolating between two ticks, and "when" is the question anybody
            looks at a timeline to answer. The value survives on hover and in
            Score details, where the breakdown that justifies it also lives.
            Year, not month: the series is sampled quarterly and then smoothed,
            so a peak's position is honest to about a season and no better. */}
        {curve.peaks
          .filter((pk) => pk.age >= viewFrom && pk.age <= viewTo)
          .map((pk) => {
            const w = windowAt(pk.age);
            const tint = w ? GRADE_TINT[w.grade] : "var(--color-bone-faint)";
            const px = x(pk.age);
            return (
              <g key={pk.age}>
                <circle cx={px} cy={y(pk.value)} r={3} fill={tint} />
                <text
                  x={px}
                  y={y(pk.value) - 9}
                  textAnchor="middle"
                  fill="var(--color-bone-faint)"
                  className="datum"
                  fontSize={8.5}
                  letterSpacing={0.8}
                >
                  {yearAt(pk.age)}
                </text>
              </g>
            );
          })}

        {age > viewFrom && age < viewTo ? (
          <>
            {/* Signal, and twice the weight of anything else on the plot.
                Three passes to get here. Grey at 1px was the same rule the
                cycle marks are drawn as. Ember fixed the weight and broke the
                meaning — ember IS the turning-point grade, so the NOW rule and
                every turning-point bar on the chart became one colour saying
                two unrelated things. Signal exists for this and nothing else:
                the cycle marks belong to a clock that runs at the same ages
                for everybody, and this is the reader's own position in it. */}
            <line
              x1={x(age)}
              x2={x(age)}
              y1={PAD.top - 8}
              y2={H - PAD.bottom}
              stroke="var(--color-signal)"
              strokeWidth={2}
              opacity={0.9}
            />
            <text
              x={x(age)}
              y={PAD.top - 12}
              textAnchor="middle"
              fill="var(--color-signal)"
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
            label crosses a peak annotation or the curve itself.

            Gated on `hover` alone, not on `shown`. Everything else here falls
            back to today when the pointer leaves, which is right for a readout
            that has to say something — but a crosshair is a statement about
            where the CURSOR is, and with no cursor on the chart it was parked
            on today's date claiming to point at something nobody was pointing
            at. NOW already has its own labelled rule; the crosshair saying the
            same thing in a plate was that mark twice. */}
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
              x={Math.min(
                Math.max(x(hover.age) - 34, PAD.left),
                W - PAD.right - 68,
              )}
              y={y(hover.value) - 26}
              width={68}
              height={15}
              fill="var(--color-surface-alt)"
              stroke="var(--color-rule)"
              strokeWidth={1}
            />
            <text
              x={Math.min(
                Math.max(x(hover.age), PAD.left + 34),
                W - PAD.right - 34,
              )}
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

      {/* The seasons, on the same axis and a couple of pixels beneath it. The
          line says how much; these say what configuration, and where it starts
          and stops. Two readings of one series, drawn as one object. */}
      <ActivationStrip
        windows={windows}
        age={age}
        viewFrom={viewFrom}
        viewTo={viewTo}
        selected={selected}
        onSelect={onSelect}
      />

      {/* What the number is made of, directly under the chart and at a fixed
          height. It sat below the contributor rows, which grow and shrink with
          the hover, so the six bars slid up and down the page while a reader
          was trying to compare them. The variable-height list goes last. */}
      {shown ? <Breakdown point={shown} /> : null}

    </div>
  );
}

