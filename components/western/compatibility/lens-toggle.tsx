//components/western/compatibility/lens-toggle.tsx
"use client";

import { CELL, LENSES, type Lens, type LensId, type LensScore } from "@/lib/synastry";
import { AMPLITUDE, FLOW, GRIND, T, easeLabel, signColor } from "./compatibility-ui";

/** The ease span the tracks draw — the matrix's own, so a marker sits where the plot puts it. */
const EASE_LIMIT = 60;

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
    <div
      role="radiogroup"
      aria-label="Relationship type"
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {scores.map((score) => {
        const active = score.id === lens.id;
        return (
          <button
            key={score.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(score.id)}
            className={`group cursor-pointer border px-3.5 pt-3 pb-3.5 text-left transition-colors ${
              active
                ? "border-patina bg-patina/[0.07]"
                : "border-rule hover:border-bone-faint hover:bg-bone/[0.03]"
            }`}
          >
            {/* A radio mark, so the four read as options to pick between
                rather than as four more figures. */}
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden
                className={`flex size-3 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  active
                    ? "border-patina"
                    : "border-bone-faint group-hover:border-bone-soft"
                }`}
              >
                {active ? <span className="size-1.5 rounded-full bg-patina" /> : null}
              </span>
              <span
                className={`inscription block text-[0.75rem] tracking-[0.16em] transition-colors ${
                  active
                    ? "text-patina"
                    : "text-bone-soft group-hover:text-bone"
                }`}
              >
                {LENSES[score.id].label}
              </span>
            </span>

            {/* Intensity and ease at the same size, each with its own track.
                Intensity used to be the big figure with ease a footnote under
                it, which ranked the four by amount of contact alone — the one
                reading the page exists to refuse. The two tracks are the same
                ones the Metrics table uses. */}
            <span className="mt-3 grid grid-cols-2 gap-3">
              <span className="min-w-0">
                <span className="flex items-baseline gap-1.5">
                  <span
                    className={`datum text-[1.25rem] leading-none ${
                      active ? "text-bone" : "text-bone-faint"
                    }`}
                  >
                    {score.chemistry}
                  </span>
                  <span className={`${T.tiny} text-bone-faint`}>int</span>
                </span>
                <span className="mt-2 block h-[3px] w-full bg-rule">
                  <span
                    className="block h-full"
                    style={{
                      width: `${score.chemistry}%`,
                      minWidth: "3px",
                      backgroundColor: active ? AMPLITUDE : "var(--color-bone-faint)",
                    }}
                  />
                </span>
              </span>

              <span className="min-w-0">
                <span className="flex items-baseline gap-1.5">
                  <span
                    className="datum text-[1.25rem] leading-none"
                    style={{
                      color: signColor(score.ease),
                      opacity: active ? 1 : 0.7,
                    }}
                  >
                    {easeLabel(score.ease)}
                  </span>
                  <span className={`${T.tiny} text-bone-faint`}>ease</span>
                </span>
                <span
                  className="relative mt-2 block h-[3px] w-full"
                  style={{
                    background: `linear-gradient(90deg, ${GRIND}, var(--color-rule) 50%, ${FLOW})`,
                    opacity: score.ease === null ? 0.25 : active ? 1 : 0.6,
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute top-1/2 left-1/2 block h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-bone-faint"
                  />
                  {score.ease === null ? null : (
                    <span
                      className="absolute top-1/2 block size-2 -translate-x-1/2 -translate-y-1/2 border border-void"
                      style={{
                        left: `${(Math.max(-EASE_LIMIT, Math.min(EASE_LIMIT, score.ease)) + EASE_LIMIT) / (2 * EASE_LIMIT) * 100}%`,
                        backgroundColor: signColor(score.ease),
                      }}
                    />
                  )}
                </span>
              </span>
            </span>

            <span
              className={`${T.tiny} mt-3 block ${active ? "text-bone-soft" : "text-bone-faint"}`}
            >
              {CELL[score.cell].label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
