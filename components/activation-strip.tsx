//components/activation-strip.tsx

"use client";

import {
  gradeLabel,
  type ActivationWindow,
  type Grade,
} from "@/lib/growth";
import { plotScale } from "@/components/activation-axis";
import { GRADE_TINT } from "@/components/activation-seasons";
import ActivationTooltip, { useTip } from "@/components/activation-tooltip";
import { T } from "@/components/growth-ui";

/**
 * The graded seasons, hung under the curve on the curve's own axis.
 *
 * Part of the chart rather than a section of its own: the line says how much
 * is converging at any moment, the bars say what configuration that adds up to
 * and exactly which years it covers, and the two are the same drawing read at
 * two resolutions. They were a separate block above the plot for a while and
 * the pair stopped being legible — two rows of the same life at two different
 * scales, and a reader has no way to know they are not contradicting each
 * other.
 *
 * So this is HTML drawn on the SVG's scale. `plotScale` is the whole trick:
 * the same margins, the same domain, so a bar sits in the column of curve
 * above it. Bars hang DOWNWARD from a top edge flush with the plot's axis,
 * which is what makes the join read as one object; grown upward they pointed
 * at the line and fought with it.
 *
 * The grade is height and nothing else. How MUCH is happening is the line's
 * question and it has a hundred points to answer with; these four heights
 * answer WHAT CONFIGURATION, and encoding both here would be two variables
 * fighting over one row of pixels.
 */

/** Bar depths, in pixels: a quiet stretch is a rule, a turning point a block. */
const GRADE_DEPTH: Record<Grade, number> = {
  background: 3,
  active: 12,
  convergence: 20,
  "turning-point": 30,
};

/**
 * How many stretches get a caption, and how far apart they have to be.
 *
 * Labels are what turn a row of bars into a life, and too many turn it back
 * into a chart. The spacing is in years and is what stops two adjacent seasons
 * — which is how the grader often reports one long stretch — from printing two
 * labels on top of each other.
 */
const MAX_LABELS = 6;
/**
 * Minimum gap between two captions, as a FRACTION of the drawn span.
 *
 * It was a number of YEARS, which is the wrong unit: a caption is a fixed 96px
 * whatever the layout does, so how many years it covers depends entirely on
 * how many years the plot is showing. Measured, "TURNING POINT" over its age
 * range is 96px on a 760px row — a shade under 13% — so on a seventy-year view
 * it occupies about nine years, and the old constants of six and then eight
 * were both narrower than the thing they were spacing. Two captions could
 * satisfy the rule and still sit on top of each other, which on two of the
 * charts on file is exactly what they did.
 *
 * As a fraction it scales with the drawn span, so it holds at any width the
 * row is given. 0.16 clears on every chart on file at the wide layout and at
 * the 392px row the sidebar leaves at 1024.
 */
const LABEL_SPACING_FRACTION = 0.16;
/**
 * How long a turning point has to run to earn a caption.
 *
 * A chart holds nine or ten of them and most are short: of Boris's nine, five
 * last under two years. Captioning all of them crowded the row with periods
 * whose bars are a few pixels wide, which is how the labels came to overlap in
 * the first place — and a two-word caption over a two-pixel bar is pointing at
 * nothing anyway.
 *
 * Four years keeps two to five per chart across every chart on file. The rest
 * keep their bar, their colour and their tooltip; only the caption goes.
 */
const MIN_LABEL_YEARS = 4;

/** "41" or "38–41", collapsing a season that opens and closes in one year. */
function ages(from: number, to: number): string {
  const a = Math.round(from);
  const b = Math.round(to);
  return a === b ? `${a}` : `${a}–${b}`;
}

export default function ActivationStrip({
  windows,
  age,
  viewFrom,
  viewTo,
  selected,
  onSelect,
}: {
  windows: ActivationWindow[];
  age: number;
  /** The plot's drawn span. The bars are clipped to it, never rescaled. */
  viewFrom: number;
  viewTo: number;
  selected: ActivationWindow | null;
  onSelect: (w: ActivationWindow) => void;
}) {
  const { x, w, centred, inside } = plotScale(viewFrom, viewTo);
  const { frame, tip, show, clear } = useTip();

  /** Clipped to the drawn window, so a season straddling the edge still shows. */
  const drawn = windows
    .map((win) => ({
      win,
      from: Math.max(win.ageStart, viewFrom),
      to: Math.min(win.ageEnd, viewTo),
    }))
    .filter((d) => d.to > d.from);

  /**
   * The captioned stretches: the loudest few, back in chronological order.
   *
   * Picked by index and then re-sorted, rather than taken in order and cut,
   * because the opening decades are as densely graded as the middle ones and
   * taking the first six would caption a reader's twenties and leave the rest
   * of the row mute. A candidate too close to one already picked is dropped
   * rather than drawn.
   */
  const mid = (d: { from: number; to: number }) => (d.from + d.to) / 2;
  /**
   * A caption needs enough bar under it to point at. A season running from
   * nine to fourteen on a plot that opens at fourteen is a sliver at the left
   * edge, and captioning it prints "TURNING POINT · 9–14" over years the chart
   * does not draw.
   */
  const VISIBLE = (viewTo - viewFrom) * 0.02;
  const spacing = (viewTo - viewFrom) * LABEL_SPACING_FRACTION;
  /**
   * Turning points only, and therefore one row instead of two.
   *
   * Every graded season used to be captioned, which produced six or seven
   * labels across the strip and no room to set them on a single line — so they
   * alternated between two rows, and a reader comparing "TURNING POINT 31–40"
   * with "ACTIVE 43–45" was reading two captions at two different heights that
   * pointed at bars of two different lengths. The stagger was a workaround for
   * having captioned too much.
   *
   * A turning point is the one grade that names a configuration rather than a
   * quantity — independent pressures converging with one of them on the axis
   * itself — and they are the long bars, so a caption has something to sit
   * over. The rest keep their bar, their colour and their tooltip; they simply
   * stop competing for the label row.
   */
  const labelled: typeof drawn = [];
  for (const d of [...drawn]
    .filter(
      (d) =>
        d.win.grade === "turning-point" &&
        // The season's own length, not the drawn one: a long period running
        // off the left edge is still a long period.
        d.win.ageEnd - d.win.ageStart >= MIN_LABEL_YEARS &&
        d.to - d.from >= VISIBLE,
    )
    .sort((a, b) => b.win.activation - a.win.activation)) {
    if (labelled.length === MAX_LABELS) break;
    if (labelled.some((p) => Math.abs(mid(p) - mid(d)) < spacing)) continue;
    labelled.push(d);
  }
  labelled.sort((a, b) => a.from - b.from);

  return (
    <div className="relative" ref={frame} onMouseLeave={clear}>
      {/* The bars, hanging from the plot's axis. */}
      <div className="relative mt-2 h-8">
        {drawn.map(({ win, from, to }) => {
          const on = selected?.id === win.id;
          return (
            <button
              key={win.id}
              type="button"
              onClick={() => onSelect(win)}
              onMouseEnter={show({ kind: "window", window: win }, "below")}
              className="absolute top-0 transition-opacity hover:opacity-80"
              style={{
                left: x(from),
                width: w(from, to),
                height: GRADE_DEPTH[win.grade] + (on ? 4 : 0),
                background: GRADE_TINT[win.grade],
                opacity: win.status === "completed" && !on ? 0.45 : 1,
                outline: on ? "1px solid var(--color-bone)" : undefined,
                outlineOffset: 1,
              }}
            />
          );
        })}
        {/* The cycle checkpoints used to be ticked along this baseline —
            a hairline per return, reversal and square. They are drawn on the
            plot itself now, as full-height rules behind the curve, which is
            where a reader is actually trying to locate a peak against them.
            Down here they were three sizes of speck two rows away from the
            line they qualify, and reading them meant crossing the bars to do
            it. */}

        {/* Now, continued down from the plot's own marker so the two rows are
            visibly one drawing. */}
        {inside(age) ? (
          <span
            className="absolute -top-2 bottom-0 w-[2px] bg-signal/90"
            style={{ left: x(age) }}
          />
        ) : null}
      </div>

      {/* What a stretch is, and when. */}
      <div className="relative h-7">
        {labelled.map((d) => (
          <button
            key={d.win.id}
            type="button"
            onClick={() => onSelect(d.win)}
            onMouseEnter={show({ kind: "window", window: d.win }, "below")}
            className="absolute top-0 -translate-x-1/2 text-center whitespace-nowrap"
            style={{ left: centred(mid(d)) }}
          >
            <span
              className={`${T.tiny} block`}
              style={{
                color: GRADE_TINT[d.win.grade],
                opacity: d.win.status === "completed" ? 0.55 : 1,
              }}
            >
              {gradeLabel(d.win.grade)}
            </span>
            <span className={`${T.tiny} block text-bone-faint`}>
              {ages(d.win.ageStart, d.win.ageEnd)}
            </span>
          </button>
        ))}
      </div>

      {/* The key for both rows: the bars' heights and the line's colour are
          the same four grades. Hoverable, because each definition is a
          sentence and four sentences under a chart is a paragraph nobody
          asked for. */}
      <div
        className={`${T.tiny} mt-3 flex flex-wrap gap-x-7 gap-y-2 text-bone-faint`}
      >
        {(
          ["background", "active", "convergence", "turning-point"] as Grade[]
        ).map((g) => (
          <span
            key={g}
            onMouseEnter={show({ kind: "grade", grade: g })}
            className="flex cursor-default items-center gap-2"
          >
            <span
              className="inline-block w-4"
              style={{
                background: GRADE_TINT[g],
                height: Math.max(2, GRADE_DEPTH[g] / 4),
              }}
            />
            {gradeLabel(g)}
          </span>
        ))}
        {/* Drawn on the plot rather than in this row, and keyed here anyway.
            The legend is the chart's, not the strip's — every other entry
            already explains a colour the row above uses too — and a vertical
            rule appearing four times across a lifetime with nothing naming it
            is the kind of mark a reader either ignores or invents a meaning
            for. The swatch is upright because the thing it stands for is. */}
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-[9px] w-px"
            style={{ background: "var(--color-bone-faint)", opacity: 0.7 }}
          />
          nodal return
        </span>
      </div>

      {tip ? <ActivationTooltip tip={tip} /> : null}
    </div>
  );
}
