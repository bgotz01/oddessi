//components/activation-seasons.tsx

"use client";

import { bandLabel, type ActivationWindow, type Grade } from "@/lib/growth";

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
 * A line changing hue mid-slope says that something changed and cannot say
 * which year, and a boundary is a year — so the exact spans are read off the
 * whole-life strip that sits above the plot, in `activation-strip`. They were
 * drawn a second time in a lane under this axis for a while, which put three
 * statements of one fact on one chart.
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
 * What a grade is COLOURED, everywhere it is shown as a solid.
 *
 * The strip, the window list, the drawer's rule and the tooltips all read from
 * here, so the four grades mean one colour across the page. It lived in the
 * map for a while, which meant five files importing a palette out of the
 * largest component on the page and loading it to draw a two-pixel border.
 *
 * Quiet is deliberately almost invisible: it is most of a life, and a colour
 * that reads as a finding would turn the ordinary condition of a chart into
 * one.
 */
export const GRADE_TINT: Record<Grade, string> = {
  background: "var(--color-rule)",
  active: "var(--color-patina-dim)",
  convergence: "var(--color-patina)",
  "turning-point": "var(--color-ember)",
};

/**
 * The pressure meter's colour, by band.
 *
 * The one place on the page where colour tracks a MAGNITUDE rather than a
 * category, and it is keyed off `bandLabel` so it reads the model's own
 * thresholds instead of a second copy of them: whatever the bands are, the
 * meter agrees with the words beside it.
 *
 * Muted green up to moderate, full green for high, ember at exceptional. The
 * ember is deliberately reserved for the top band — it is the same colour a
 * turning point takes on the strip, and spending it lower down would leave
 * nothing for the rare readings to be louder than.
 */
const PRESSURE_TINT: Record<string, string> = {
  Quiet: "color-mix(in srgb, var(--color-patina-dim) 55%, var(--color-void))",
  Low: "var(--color-patina-dim)",
  Moderate: "var(--color-patina-dim)",
  High: "var(--color-patina)",
  Exceptional: "var(--color-ember)",
};

export function pressureTint(value: number): string {
  return PRESSURE_TINT[bandLabel(value)] ?? "var(--color-patina-dim)";
}

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
