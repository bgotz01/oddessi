// components/framework/sign-axes.tsx

import { AXES, ELEMENT_COLOR, SIGNS } from "@/lib/astrology/macro/zodiac-framework-data";

/**
 * The six oppositions, one row each: a sign at either end and the theme they
 * share between them. Read from `AXES`, the one place the pairs are defined.
 */
export default function SignAxes() {
  return (
    <div className="border-y border-rule">
      {AXES.map(({ signs: [a, b], tension }) => {
        const left = SIGNS[a];
        const right = SIGNS[b];
        return (
          <div
            key={a}
            className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 border-b border-rule-faint px-2 py-4 last:border-b-0 sm:px-6"
          >
            <div className="flex items-center gap-3">
              <span
                className="glyph text-[1.25rem] leading-none"
                style={{ color: ELEMENT_COLOR[left.element] }}
                aria-hidden
              >
                {left.glyph}
              </span>
              <span className="min-w-0">
                <span className="datum block text-[0.625rem] tracking-[0.16em] text-bone-faint uppercase">
                  {left.label}
                </span>
                <span className="block text-[0.9375rem] leading-snug text-bone">{tension[0]}</span>
              </span>
            </div>

            <span aria-hidden className="text-bone-faint">↔</span>

            <div className="flex items-center justify-end gap-3 text-right">
              <span className="min-w-0">
                <span className="datum block text-[0.625rem] tracking-[0.16em] text-bone-faint uppercase">
                  {right.label}
                </span>
                <span className="block text-[0.9375rem] leading-snug text-bone">{tension[1]}</span>
              </span>
              <span
                className="glyph text-[1.25rem] leading-none"
                style={{ color: ELEMENT_COLOR[right.element] }}
                aria-hidden
              >
                {right.glyph}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
