//components/western/compatibility/lens-toggle.tsx
"use client";

import { CELL, LENSES, type Lens, type LensId, type LensScore } from "@/lib/synastry";
import { AMPLITUDE, T, easeLabel, signColor } from "./compatibility-ui";

/**
 * Which question is being asked, and how well these two charts answer each of
 * the four — as a row of four, side by side.
 *
 * It was a four-row table, which read as data rather than as a control: the
 * whole point is that these are the alternatives, and stacking them put them in
 * the same shape as the areas table below and made them disappear into it. Four
 * across reads as a switch at a glance, and side by side is also the only
 * arrangement in which the scores can actually be compared, which is what they
 * are for.
 *
 * WHAT THE FIGURES ARE NOT. Not a ranking and not a recommendation. A high
 * partnership number against a low romantic one says these two charts supply
 * more of what a working relationship is built from — Mars to Mars, Saturn to
 * the lights, the tenth and the eighth — than of what a romance is built from.
 * It has no view on what anybody should do, and the ease figure sits under it
 * precisely so that "most contact" cannot be read as "best".
 */
export default function LensToggle({
  lens,
  scores,
  onChange,
}: {
  lens: Lens;
  scores: LensScore[];
  onChange: (id: LensId) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4 sm:gap-x-6">
      {scores.map((score) => {
        const active = score.id === lens.id;
        return (
          <button
            key={score.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(score.id)}
            className={`group border-t-2 pt-3 text-left transition-colors ${
              active
                ? "border-patina"
                : "border-rule hover:border-bone-faint"
            }`}
          >
            <span
              className={`inscription block text-[0.75rem] tracking-[0.16em] transition-colors ${
                active
                  ? "text-patina"
                  : "text-bone-faint group-hover:text-bone-soft"
              }`}
            >
              {LENSES[score.id].label}
            </span>

            <span className="mt-3 flex items-baseline gap-2">
              <span
                className={`datum text-[1.5rem] leading-none ${
                  active ? "text-bone" : "text-bone-faint"
                }`}
              >
                {score.chemistry}
              </span>
              <span className={`${T.tiny} text-bone-faint`}>chem</span>
            </span>

            {/* The same bar the tables use, so the four can be compared by
                length as well as by figure. */}
            <span className="mt-2.5 block h-[3px] w-full bg-rule">
              <span
                className="block h-full"
                style={{
                  width: `${score.chemistry}%`,
                  minWidth: "3px",
                  backgroundColor: active ? AMPLITUDE : "var(--color-bone-faint)",
                }}
              />
            </span>

            <span className="mt-2.5 flex items-baseline justify-between gap-2">
              <span
                className="datum text-[0.75rem]"
                style={{ color: signColor(score.ease) }}
              >
                {easeLabel(score.ease)}
              </span>
              <span
                className={`${T.tiny} ${active ? "text-bone-soft" : "text-bone-faint"}`}
              >
                {CELL[score.cell].label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
