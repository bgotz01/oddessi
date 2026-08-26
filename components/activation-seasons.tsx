//components/activation-seasons.tsx

"use client";

import {
  gradeLabel,
  windowLabel,
  type ActivationWindow,
  type Grade,
} from "@/lib/growth";
import { GRADE_TINT } from "@/components/activation-map";
import { BAND, H, PAD, W } from "@/components/activation-axis";
import { T } from "@/components/growth-ui";

/**
 * The seasons, drawn as the spans they actually are.
 *
 * A window is a stretch of years. The curve used to say so with a single dot
 * at the peak and a two-line caption above it — "TRANSFORMATION / pressure to
 * change" — which named the season correctly and located it wrongly: a dot is
 * a moment, and a reader looking at one has no way to see that the label is
 * true of 2017–2025 rather than of the afternoon the line happened to top out.
 * The peak is where the label FITS, not where the season is.
 *
 * So the extent is drawn twice, in the two places it is wanted:
 *
 *   THE LINE  the curve is painted in its season's colour and changes colour
 *             where the season does. The strongest statement of extent
 *             available, because it is made in the one thing the reader is
 *             already looking at — no legend hop, no second glance downward.
 *   THE BAND  a lane under the axis carrying one segment per season. A line
 *             changing hue mid-slope says that something changed; it cannot
 *             say which year, and a boundary is a year.
 *
 * A full-height wash behind the curve was the first attempt at the first of
 * those and is not here any more. It worked, and it cost the plot: a life is
 * mostly inside some season or other, so the background became a set of
 * alternating columns with the line drawn over them — the reading was in the
 * furniture instead of in the line.
 *
 * Windows never overlap: they come out of a single sweep along the life, so
 * nothing here has to resolve collisions.
 */

/**
 * The line's own colours.
 *
 * The same tints the band, the readout strip and the window list use, plus one
 * the grade table has no answer for: a stretch belonging to no named season
 * still has to be drawn, and `background`'s near-invisible rule tint would
 * break the curve into disconnected pieces wherever a life is quiet.
 * The quiet colour is bone-faint knocked back into the page — desaturated, so
 * it recedes against two accents that are not, and dark enough that it stays
 * behind them. Bone-faint at full strength was the first try and it inverted
 * the chart: it is BRIGHTER than patina, so the stretches where nothing is
 * happening became the loudest line on the plot.
 *
 * Three hues carrying four grades, and the flattening is deliberate. Hue is
 * the only variable a 1.75px line has here, and four steps of it on a ground
 * this dark would be four steps of legibility rather than four of meaning —
 * patina-dim, which is right for a 7px bar in the band, is a line you have to
 * hunt for. Active and convergence both mean "a named season is running";
 * which of the two stays where there is room to say it, in the band, the strip
 * above the chart and the list below it.
 */
export const LINE_TINT: Record<Grade, string> = {
  background: "color-mix(in srgb, var(--color-bone-faint) 55%, var(--color-void))",
  active: "var(--color-patina)",
  convergence: "var(--color-patina)",
  "turning-point": "var(--color-ember)",
};

/**
 * The life as a run of spans, with the gaps between seasons filled in.
 *
 * A gradient cannot have holes in it and neither can a line: every point
 * between the first year drawn and the last belongs to exactly one span, which
 * is either a window or the quiet between two.
 */
function spans(
  windows: ActivationWindow[],
  viewFrom: number,
  viewTo: number,
): { from: number; to: number; grade: Grade }[] {
  const out: { from: number; to: number; grade: Grade }[] = [];
  let at = viewFrom;

  for (const w of [...windows].sort((a, b) => a.ageStart - b.ageStart)) {
    const from = Math.max(w.ageStart, viewFrom, at);
    const to = Math.min(w.ageEnd, viewTo);
    if (to <= from) continue;
    if (from > at) out.push({ from: at, to: from, grade: "background" });
    out.push({ from, to, grade: w.grade });
    at = to;
  }
  if (at < viewTo) out.push({ from: at, to: viewTo, grade: "background" });
  return out;
}

/**
 * The curve's paint: the seasons, laid along the x axis.
 *
 * A gradient rather than one path per season, because a line cut into pieces
 * is a line with seams in it. Every join lands mid-slope, where two stroked
 * ends meeting at an angle leave a visible notch, and the pieces only abut at
 * all if the geometry is kept in step with the sampling — a season boundary
 * falls between two samples far more often than on one. Two stops at each
 * boundary change the colour exactly at the year the season does, and the line
 * stays one line.
 *
 * Painted in user space, so the stops are ages rather than fractions of
 * whatever the path's bounding box happens to be — a box that changes shape
 * with the data, and would slide the colours around as it did.
 */
export function SeasonGradient({
  id,
  windows,
  x,
  viewFrom,
  viewTo,
}: {
  id: string;
  windows: ActivationWindow[];
  x: (age: number) => number;
  viewFrom: number;
  viewTo: number;
}) {
  const at = (age: number) =>
    Math.min(Math.max((age - viewFrom) / (viewTo - viewFrom), 0), 1);

  return (
    <linearGradient
      id={id}
      gradientUnits="userSpaceOnUse"
      x1={x(viewFrom)}
      y1={0}
      x2={x(viewTo)}
      y2={0}
    >
      {spans(windows, viewFrom, viewTo).flatMap((s, i) => [
        // Two stops per span at one colour, so the ramp between them is flat
        // and the whole change happens in the zero distance between this
        // span's last stop and the next span's first.
        <stop key={`${i}a`} offset={at(s.from)} stopColor={LINE_TINT[s.grade]} />,
        <stop key={`${i}b`} offset={at(s.to)} stopColor={LINE_TINT[s.grade]} />,
      ])}
    </linearGradient>
  );
}

/** The clipped span of a window in the drawn view, or null if it is outside. */
function span(
  w: ActivationWindow,
  x: (age: number) => number,
  viewFrom: number,
  viewTo: number,
): { left: number; width: number } | null {
  const from = Math.max(w.ageStart, viewFrom);
  const to = Math.min(w.ageEnd, viewTo);
  if (to <= from) return null;
  const left = x(from);
  // A season can be shorter than the pixel it lands on — a turning point IS
  // sometimes a single quarter — and one that rounds away to nothing would be
  // the one the page most wants seen.
  return { left, width: Math.max(x(to) - left, 1.5) };
}

/**
 * The band under the axis: every season, end to end.
 *
 * Graded at full resolution, unlike the line: a bar has the weight to carry
 * patina-dim, so active and convergence are told apart here even though the
 * curve paints both patina.
 *
 * Background segments are drawn too, at the near-invisible rule tint, because
 * the lane is then continuous and a notable season reads as a thickening of
 * something ongoing rather than as an isolated event in a void. The trajectory
 * does not switch off between windows.
 *
 * Clicking a segment opens it. That is the same thing clicking the plot at
 * that x already does, but a segment is a target a person can actually hit and
 * can see the edges of.
 */
export function SeasonBand({
  windows,
  x,
  viewFrom,
  viewTo,
  selected,
  hovered,
  onSelect,
}: {
  windows: ActivationWindow[];
  x: (age: number) => number;
  viewFrom: number;
  viewTo: number;
  selected: ActivationWindow | null;
  /** The season under the pointer, so the lane answers the crosshair. */
  hovered: ActivationWindow | null;
  onSelect: (w: ActivationWindow) => void;
}) {
  const top = H - PAD.bottom + BAND.top;

  return (
    <g>
      {/* The lane itself, so its extent is legible where a life is quiet. */}
      <line
        x1={PAD.left}
        x2={W - PAD.right}
        y1={top + BAND.height / 2}
        y2={top + BAND.height / 2}
        stroke="var(--color-rule-faint)"
        strokeWidth={1}
      />

      {windows.map((w) => {
        const s = span(w, x, viewFrom, viewTo);
        if (!s) return null;
        const on = selected?.id === w.id;
        const lit = on || hovered?.id === w.id;
        const quiet = w.grade === "background";
        // The lived past is stated once, here, by weight — the same fact the
        // window list carries as a collapsed group. Dimming it costs nothing
        // and stops a decade already behind the reader from competing with
        // the one ahead of them.
        const opacity = (w.status === "completed" ? 0.4 : 1) * (quiet ? 0.5 : 1);
        const height = quiet ? 2 : lit ? BAND.height : BAND.height - 3;
        return (
          <rect
            key={w.id}
            x={s.left}
            // Seasons abut: one ends at the quarter the next begins, so two
            // neighbours drawn edge to edge are one segment on the screen and
            // the boundary this lane exists to show is what disappears.
            width={Math.max(s.width - 1, 1.5)}
            y={top + (BAND.height - height) / 2}
            height={height}
            fill={GRADE_TINT[w.grade]}
            opacity={opacity}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(w);
            }}
          >
            <title>
              {`${windowLabel(w).label} · age ${Math.round(w.ageStart)}${
                Math.round(w.ageEnd) > Math.round(w.ageStart)
                  ? `–${Math.round(w.ageEnd)}`
                  : ""
              }`}
            </title>
          </rect>
        );
      })}

      {/* The selected season, bracketed. The band is one row of small colour
          and a reader who has clicked something needs to see which. */}
      {selected
        ? (() => {
            const s = span(selected, x, viewFrom, viewTo);
            if (!s) return null;
            return (
              <>
                {[s.left, s.left + s.width].map((px) => (
                  <line
                    key={px}
                    x1={px}
                    x2={px}
                    y1={top - 4}
                    y2={top + BAND.height + 4}
                    stroke="var(--color-bone-faint)"
                    strokeWidth={1}
                  />
                ))}
              </>
            );
          })()
        : null}
    </g>
  );
}

/**
 * What the colours mean, on the header row rather than under the chart.
 *
 * Under the chart is where the breakdown lives, and the breakdown has to sit
 * directly beneath the line it decomposes. A key is read once and then not
 * again, so it takes the leftover space at the top.
 *
 * It keys the LINE, which is the thing carrying colour across most of the
 * plot, so it names the three hues the curve actually takes rather than the
 * four grades the band distinguishes. A key with a swatch in it that the line
 * never uses is a key that has to be reconciled instead of read.
 */
const KEYED: { tint: string; label: string }[] = [
  { tint: LINE_TINT.background, label: "Quiet" },
  { tint: LINE_TINT.active, label: gradeLabel("active") },
  { tint: LINE_TINT["turning-point"], label: gradeLabel("turning-point") },
];

export function GradeKey() {
  return (
    <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
      {KEYED.map((k) => (
        <span
          key={k.label}
          className={`${T.tiny} flex items-center gap-1.5 text-bone-faint`}
        >
          <span className="block h-[3px] w-4" style={{ background: k.tint }} />
          {k.label}
        </span>
      ))}
    </span>
  );
}
