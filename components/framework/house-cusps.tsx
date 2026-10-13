// components/framework/house-cusps.tsx

import { SIGN_MANNER } from "@/lib/house-reading";
import {
  ELEMENT_COLOR,
  SIGNS,
  SIGN_ORDER,
} from "@/lib/astrology/macro/zodiac-framework-data";
import { MODERN_RULER, TRADITIONAL_RULER } from "@/lib/rulership";

/**
 * The twelve signs as cusp signs: how each one approaches whichever area of
 * life it opens. One statement per sign — the first line of `SIGN_MANNER`, the
 * table the house drawer reads. The other two lines, and what the approach
 * gives and costs, stay in the data for the chat.
 */
export default function HouseCusps() {
  return (
    <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {SIGN_ORDER.map((key) => {
        const sign = SIGNS[key];
        const manner = SIGN_MANNER[sign.label];
        const color = ELEMENT_COLOR[sign.element];
        const modern = MODERN_RULER[sign.label];
        const traditional = TRADITIONAL_RULER[sign.label];

        return (
          <div key={key} className="flex flex-col bg-surface px-5 pt-4 pb-4">
            <div className="flex items-baseline gap-2.5">
              <span className="glyph text-[1.25rem] leading-none" style={{ color }} aria-hidden>
                {sign.glyph}
              </span>
              <span className="inscription text-[0.9375rem] tracking-[0.1em]" style={{ color }}>
                {sign.label}
              </span>
              <span className="text-[0.9375rem] text-bone-soft italic">{sign.domain}</span>
            </div>

            <p className="mt-3 flex-1 text-[1rem] leading-snug text-bone">{manner?.manner[0]}</p>

            <p className="datum mt-4 border-t border-rule-faint pt-3 text-[0.625rem] tracking-[0.14em] text-bone-faint uppercase">
              {sign.modality} · {sign.element} · Ruled by {modern}
              {traditional !== modern ? ` (${traditional} trad.)` : ""}
            </p>
          </div>
        );
      })}
    </div>
  );
}
