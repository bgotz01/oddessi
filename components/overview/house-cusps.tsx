// components/overview/house-cusps.tsx

import { SIGN_MANNER } from "@/lib/house-reading";
import {
  ELEMENT_COLOR,
  SIGNS,
  SIGN_ORDER,
} from "@/lib/astrology/macro/zodiac-framework-data";
import MeaningLabel from "@/components/western/houses/meaning-label";

/**
 * The twelve signs as cusp rulers: how each one runs whichever house it sits
 * on. The Signs grid says what a sign *is*; this says what it *does* to an
 * area of life — the same object from the house side.
 *
 * The heading word comes from `SIGNS` and the reading from `SIGN_MANNER`, the
 * table the house drawer reads, so a sign on the cusp is described here exactly
 * as it is when a chart's house is opened.
 */
export default function HouseCusps() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {SIGN_ORDER.map((key) => {
        const sign = SIGNS[key];
        const manner = SIGN_MANNER[sign.label];
        const color = ELEMENT_COLOR[sign.element];
        if (!manner) return null;

        return (
          <div
            key={key}
            className="border border-rule bg-surface px-5 pt-4 pb-5"
            style={{ borderTopWidth: 2, borderTopColor: color }}
          >
            <div className="flex items-baseline gap-2.5">
              <span className="glyph text-[1.25rem] leading-none" style={{ color }} aria-hidden>
                {sign.glyph}
              </span>
              <span className="inscription text-[0.9375rem] tracking-[0.1em]" style={{ color }}>
                {sign.label}
              </span>
              <span className="text-[0.9375rem] text-bone-soft italic">{sign.domain}</span>
            </div>

            <ul className="mt-4 space-y-1.5">
              {manner.manner.map((line) => (
                <li key={line} className="text-[0.9375rem] leading-snug text-bone">
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-rule-faint pt-4">
              <div>
                <MeaningLabel tone="text-patina">Gives</MeaningLabel>
                <ul className="mt-2 space-y-1">
                  {manner.gives.map((g) => (
                    <li key={g} className="text-[0.8125rem] leading-snug text-bone-soft">
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <MeaningLabel tone="text-ember">Costs</MeaningLabel>
                <ul className="mt-2 space-y-1">
                  {manner.costs.map((c) => (
                    <li key={c} className="text-[0.8125rem] leading-snug text-bone-soft italic">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
