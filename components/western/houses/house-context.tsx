"use client";

import { useState } from "react";
import { HOUSE_TYPE_EXPLANATIONS } from "@/lib/astrology/houses/houses";
import { HOUSE_TYPES, houseTypeStyle } from "@/lib/house-types";

/**
 * The explanatory section beside the grid: what angular / succedent / cadent
 * actually means. (The rulership circuits live in `house-circuits`; what each
 * body does to a house is on the Planets page, as
 * `components/western/planets/planetary-influences`.)
 *
 * These are constants, not readings — nothing here depends on the chart. They
 * exist so the grid above is legible to someone who has not already memorised
 * the system.
 */

export function HouseTypeGuide() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {HOUSE_TYPES.map((type) => {
        const t = HOUSE_TYPE_EXPLANATIONS[type];
        const tone = houseTypeStyle(type);
        return (
          <div key={type} className="border border-rule bg-surface">
            {/* The same bar the cards carry — this panel is the key to it. */}
            <div
              aria-hidden
              className="h-[3px] w-full"
              style={{ background: tone.color }}
            />
            <div className="p-6">
              <p
                className="inscription text-[0.6875rem]"
                style={{ color: tone.color }}
              >
                {t.name}
              </p>
              <p className="datum mt-1 text-[0.625rem] text-bone-faint">
                Houses {t.houses.join(" · ")}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed font-light text-bone-soft">
                {t.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                {t.characteristics.map((c) => (
                  <span
                    key={c}
                    className="datum text-[0.5625rem] tracking-[0.18em] text-bone-faint uppercase"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * The type guide, folded away behind its own heading. It explains a standing
 * fact about every chart ever cast rather than anything about this one, so it
 * sits next to the grid it explains but stays shut until asked for.
 */
export function ReadingTheGrid() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6 border-t border-rule-faint">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-baseline justify-between py-4 text-left transition-colors hover:text-bone"
      >
        <span className="datum text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase">
          Reading The Grid
        </span>
        <span className="flex items-center gap-3">
          <span className="datum text-[0.625rem] tracking-[0.14em] text-bone-faint uppercase">
            angular · succedent · cadent
          </span>
          <span
            className={`datum text-[0.875rem] text-bone-faint transition-transform ${open ? "rotate-90" : ""}`}
          >
            ›
          </span>
        </span>
      </button>
      {open ? (
        <div className="pb-8">
          <HouseTypeGuide />
        </div>
      ) : null}
    </div>
  );
}
