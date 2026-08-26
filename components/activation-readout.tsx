//components/activation-readout.tsx

"use client";

import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import {
  bandLabel,
  beatLabel,
  classificationOf,
  windowLabel,
  INGREDIENT_LABEL,
  SHARES,
  type Activation,
  type ActivationWindow,
  type Ingredient,
  type IntensityPoint,
} from "@/lib/growth";
import { GRADE_TINT } from "@/components/activation-map";
import { T } from "@/components/growth-ui";

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
        <span
          className="text-[1.0625rem] leading-tight font-light"
          style={{ color: w ? GRADE_TINT[w.grade] : "var(--color-bone-faint)" }}
        >
          {w ? windowLabel(w).label : "No active season"}
        </span>
        <span className={`${T.tiny} text-bone-faint`}>
          {point ? bandLabel(point.value) : "—"}
          {w ? ` · ${classificationOf(w.grade).toLowerCase()}` : ""}
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
 * One row per planet: where it is, and what it is touching.
 *
 * Compressed hard, twice over. The house carried its full title — "in H8
 * TRANSFORMATION & SHARED RESOURCES" — which is four words of chart furniture
 * per row before the row says anything; the number is the part a reader
 * navigates by. And a house transit was printing its target too, so Saturn
 * crossing the ninth read "H9 → House 9 — Belief & Meaning", the same fact
 * twice with an arrow between.
 *
 * A house transit IS its target, so those rows stop at the house. Everything
 * else names what it touches, because for a ruler or a node contact that is
 * the only part explaining why the planet is on this page at all.
 */
export function Contributors({ point }: { point: IntensityPoint | null }) {
  const byPlanet = new Map<string, Activation>();
  for (const a of point?.activations ?? []) {
    const held = byPlanet.get(a.planet);
    if (!held || (a.direct && !held.direct)) byPlanet.set(a.planet, a);
  }
  const rows = [...byPlanet.values()];

  return (
    // One flowing row, wrapping to a second when there are many, and reserving
    // the height of both either way. Reserving it is what lets this sit ABOVE
    // the chart: the rows change with every hover, and anything that resizes
    // above the chart drags the chart with it.
    <ul className="mt-5 flex min-h-[3.5rem] flex-wrap items-baseline gap-x-7 gap-y-2">
      {rows.map((a) => (
        <li key={a.planet} className="flex items-baseline gap-x-2">
          <span
            className="glyph text-[1.0625rem]"
            style={{ color: a.color ?? bodyColor(a.planet) }}
          >
            {bodyGlyph(a.planet)}
          </span>
          <span className="text-[0.9375rem] text-bone">{a.planet}</span>
          {a.through ? (
            <span className={`${T.tiny} text-bone-faint`}>
              H{a.through.house}
            </span>
          ) : null}
          {a.kind === "house" ? null : (
            <span className="text-[0.875rem] text-bone-soft">
              → {a.targetShort}
            </span>
          )}
        </li>
      ))}
      {point?.beats.map((b) => (
        <li key={b.date} className={`${T.tiny} text-patina`}>
          nodal rhythm · {beatLabel(b.kind).toLowerCase()}
        </li>
      ))}
      {rows.length === 0 && !point?.beats.length ? (
        <li className={T.note}>
          Nothing is pressing on the axis here. The trajectory is still in
          force; the timing is quiet.
        </li>
      ) : null}
    </ul>
  );
}

/**
 * The ingredients behind one value.
 *
 * Bars rather than numbers, because the question is "what is carrying this"
 * and proportion answers it faster than six figures. Each bar is drawn against
 * its own maximum share, so a full directness bar means directness is doing
 * everything it can — not that it is 30% of anything.
 */
export function Breakdown({ point }: { point: IntensityPoint }) {
  const keys = Object.keys(SHARES) as Ingredient[];
  return (
    <div className="mt-5 flex flex-wrap items-stretch gap-x-8 gap-y-4">
      {keys.map((k) => (
        // Each cell is a column with the bar pinned to the bottom. Laid out
        // top-down, "Independent pressures" wrapped to two lines while its
        // neighbours took one, and its bar sat a line lower than the rest —
        // which is exactly the comparison the bars exist to make. Pinning
        // costs one line of empty space and buys a straight baseline.
        <div
          key={k}
          className="flex min-w-[7.5rem] grow basis-0 flex-col justify-between"
        >
          <p className={`${T.tiny} text-bone-faint`}>{INGREDIENT_LABEL[k]}</p>
          <div className="mt-2 h-1 w-full bg-rule">
            <div
              className="h-1 bg-patina-dim"
              style={{ width: `${(point.parts[k] / SHARES[k]) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
