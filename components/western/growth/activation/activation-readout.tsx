//components/activation-readout.tsx

"use client";

import { useState } from "react";
import {
  bandLabel,
  gradeLabel,
  orientationShort,
  INGREDIENT_GLOSS,
  INGREDIENT_LABEL,
  SHARES,
  type ActivationWindow,
  type Ingredient,
  type IntensityPoint,
} from "@/lib/growth";
import { GRADE_TINT } from "@/components/western/growth/activation/activation-seasons";
import { useActivationShares } from "@/components/western/growth/activation/activation-shares";
import { T } from "@/components/western/growth/growth-ui";

/**
 * Everything the curve says in words about the point being read.
 *
 * Split from the chart because they answer different questions and change for
 * different reasons: the chart is geometry, this is the reading. It arrives in
 * three parts, and their ORDER on the page is the argument —
 *
 *   HEADER        the interpretation, left; the measurement, right
 *   CONTRIBUTORS  which planets, where they are standing, what they touch
 *   BREAKDOWN     what the number is made of
 *
 * Contributors vary from none to five entries with every movement of the
 * pointer, so the row reserves the height of two lines whether it needs them
 * or not. That reservation is what lets it sit above the chart at all: without
 * it, every hover resized the block and shoved the chart up and down beneath
 * the cursor trying to read it.
 */

/**
 * The reading and the measurement, on one line, directly above the chart.
 *
 * Reading left, measurement right, because that is the order they are wanted
 * in: what kind of period this is, and then how strongly.
 *
 * WHEN and HOW MUCH used to sit side by side here, and they should not. The
 * index is a property of the whole strip — it belongs in the corner, still,
 * whatever the pointer is doing. The age and year are properties of one point
 * on the line, and reading them here meant looking away from the cursor to a
 * corner and back. They now ride with the cursor inside the plot; see the
 * crosshair in `activation-curve`.
 */
export function ReadoutStrip({
  point,
  window: w,
}: {
  point: IntensityPoint | null;
  window: ActivationWindow | null;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-rule pb-2.5">
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {/* The same five words the panel above uses. It carried a composed
            title and a classification — "Commitment · Pull Forward",
            "locally active" — which was a second vocabulary for the same
            facts, three inches under the first. */}
        <span
          className="text-[1.0625rem] leading-tight font-light"
          style={{ color: w ? GRADE_TINT[w.grade] : "var(--color-bone-faint)" }}
        >
          {w ? gradeLabel(w.grade) : "Quiet"}
        </span>
        {w ? (
          <span className={`${T.tiny} text-bone-soft`}>
            {orientationShort(w.orientation)}
          </span>
        ) : null}
        <span className={`${T.tiny} text-bone-faint`}>
          {point ? bandLabel(point.value).toLowerCase() : "—"}
        </span>
      </p>

      <p className="text-[1.375rem] leading-none font-light text-bone">
        {point ? point.value : "—"}
        <span className="ml-1 text-[0.8125rem] text-bone-faint">/ 100</span>
      </p>
    </div>
  );
}

/**
 * The ingredients behind one value, on request.
 *
 * A score whose composition can be inspected is an argument; one whose
 * composition is hidden is a horoscope with a decimal point — so this cannot
 * be dropped, and it also cannot lead. Six bars under a chart answer a
 * question about the model to a reader still working out what the model is
 * for, and they were the last thing on screen before the reading arrived
 * above it.
 *
 * Bars rather than numbers, because the question is "what is carrying this"
 * and proportion answers it faster than six figures. Each bar is drawn against
 * its own maximum share, so a full directness bar means directness is doing
 * everything it can — not that it is 30% of anything. Each carries the
 * sentence saying what it counts, because "Directness · 24" is only an
 * argument to someone who already knows what directness means here.
 */
export function Breakdown({ point }: { point: IntensityPoint }) {
  const [open, setOpen] = useState(false);
  // The live weights, not the shipped ones: each bar is drawn against its own
  // maximum, and after a tune those maxima are whatever the sliders say.
  const { shares } = useActivationShares();
  const keys = Object.keys(SHARES) as Ingredient[];

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`${T.tiny} text-bone-faint transition-colors hover:text-bone`}
      >
        {open ? "Score details ↑" : "Score details ↓"}
      </button>

      {open ? (
        <div className="mt-5 flex flex-wrap items-stretch gap-x-8 gap-y-6">
          {keys.map((k) => (
            <div key={k} className="min-w-[9rem] grow basis-0">
              <p className={`${T.tiny} text-bone-faint`}>
                {INGREDIENT_LABEL[k]}
              </p>
              <div className="mt-2 h-1 w-full bg-rule">
                <div
                  className="h-1 bg-patina-dim"
                  style={{
                    width: `${Math.min(100, (point.parts[k] / (shares[k] || 1)) * 100)}%`,
                  }}
                />
              </div>
              <p className={`${T.note} mt-2 text-[0.8125rem]`}>
                {INGREDIENT_GLOSS[k]}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
