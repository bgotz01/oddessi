// components/zodiac-framework.tsx
// Canonical zodiac grid — no planets, no toggles.
// components/zodiac-framework.tsx

// Canonical zodiac grid — no planets, no toggles.

import {
  ELEMENT_COLOR,
  ELEMENTS,
  SIGNS,
  SIGN_ORDER,
  SIGNS_BY_ELEMENT,
} from "@/lib/astrology/macro/zodiac-framework-data";

import type { ElementKey } from "@/lib/astrology/macro/zodiac-framework-data";

// ─── Column layout ────────────────────────────────────────────────────────────

function ColumnLayout() {
  return (
    <div className="grid grid-cols-4">
      {(Object.keys(SIGNS_BY_ELEMENT) as ElementKey[]).map((element) => {
        const color = ELEMENT_COLOR[element];
        const signKeys = SIGNS_BY_ELEMENT[element];

        return (
          <div
            key={element}
            className="min-w-0 border-r border-rule last:border-r-0"
          >
            {/* Element header */}
            <div className="relative border-b border-rule bg-surface-alt px-6 pb-5 pt-5">
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ backgroundColor: color }}
              />

              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />

                <span
                  className="datum text-[0.625rem] uppercase tracking-[0.22em]"
                  style={{ color }}
                >
                  {element}
                </span>
              </div>

              <p className="inscription mt-3 text-[1.25rem] leading-none text-bone">
                {ELEMENTS[element].theme}
              </p>
            </div>

            {/* Signs */}
            <div>
              {signKeys.map((key) => {
                const s = SIGNS[key];

                return (
                  <div
                    key={key}
                    className="group border-b border-rule-faint px-6 py-5 last:border-b-0"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className="glyph shrink-0 text-[0.875rem] leading-none opacity-70"
                        style={{ color }}
                      >
                        {s.glyph}
                      </span>

                      <span className="datum text-[0.5625rem] uppercase tracking-[0.16em] text-bone-faint">
                        {s.label}
                      </span>
                    </div>

                    <p className="mt-2.5 pl-[1.7rem] text-[1rem] leading-snug text-bone">
                      {s.domain}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Row layout ───────────────────────────────────────────────────────────────

function RowLayout() {
  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-[10rem_8rem_9rem_1fr] border-b border-rule bg-surface-alt">
        {["Sign", "Element", "Theme", "Domain"].map((heading) => (
          <div key={heading} className="px-5 py-3">
            <span className="datum text-[0.625rem] uppercase tracking-[0.2em] text-bone-faint">
              {heading}
            </span>
          </div>
        ))}
      </div>

      {/* Signs */}
      {SIGN_ORDER.map((key) => {
        const s = SIGNS[key];
        const color = ELEMENT_COLOR[s.element];

        return (
          <div
            key={key}
            className="group grid grid-cols-[10rem_8rem_9rem_1fr] border-b border-rule-faint transition-colors last:border-b-0 hover:bg-surface-alt/30"
          >
            {/* Sign */}
            <div className="flex items-center gap-2.5 px-5 py-4">
              <span
                className="glyph text-[0.875rem] leading-none opacity-70"
                style={{ color }}
              >
                {s.glyph}
              </span>

              <span className="datum text-[0.5625rem] uppercase tracking-[0.16em] text-bone-faint">
                {s.label}
              </span>
            </div>

            {/* Element */}
            <div className="flex items-center gap-2 px-5 py-4">
              <span
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />

              <span
                className="datum text-[0.6875rem] uppercase tracking-[0.16em]"
                style={{ color }}
              >
                {s.element}
              </span>
            </div>

            {/* Theme */}
            <div className="flex items-center px-5 py-4">
              <span className="inscription text-[0.9375rem] text-bone">
                {ELEMENTS[s.element].theme}
              </span>
            </div>

            {/* Domain */}
            <div className="flex items-center px-5 py-4">
              <span className="text-[1rem] text-bone">
                {s.domain}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function ZodiacFramework({
  layout = "columns",
}: {
  layout?: "columns" | "rows";
}) {
  return (
    <div className="overflow-hidden border border-rule">
      {layout === "columns" ? <ColumnLayout /> : <RowLayout />}
    </div>
  );
}