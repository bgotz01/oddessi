// components/outer-planet-framework.tsx
"use client";

import { useState } from "react";
import {
  ELEMENT_COLOR,
  ELEMENTS,
  SIGNS,
  SIGNS_BY_ELEMENT,
} from "@/lib/astrology/macro/zodiac-framework-data";
import type { ElementKey, PlanetFramework } from "@/lib/astrology/macro/zodiac-framework-data";

export default function OuterPlanetFramework({
  planets,
  title = "Outer Planets",
}: {
  planets: PlanetFramework[];
  title?: string;
}) {
  const [active, setActive] = useState(0);
  const framework = planets[active];
  const planetColor = framework.color;

  return (
    <div
      className="overflow-hidden border border-rule transition-[box-shadow] duration-300"
      style={{ boxShadow: `0 0 0 1px ${planetColor}` }}
    >
      {/* Header: title + planet toggles */}
      <div className="border-b border-rule bg-surface-alt">
        {/* Title row */}
        <div className="flex items-baseline justify-between px-6 py-4">
          <span className="datum text-[0.5625rem] uppercase tracking-[0.2em] text-bone-faint">
            {title}
          </span>
          <span
            className="datum text-[0.5625rem] uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: planetColor }}
          >
            {framework.principle}
          </span>
        </div>

        {/* Planet toggles */}
        <div className="grid grid-cols-3 gap-px border-t border-rule">
          {planets.map((fw, i) => {
            const isActive = i === active;
            return (
              <button
                key={fw.planet}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`relative px-5 py-4 text-left transition-colors ${isActive ? "" : "hover:bg-surface/60"
                  }`}
                style={
                  isActive
                    ? { backgroundColor: `color-mix(in srgb, ${fw.color} 8%, transparent)` }
                    : undefined
                }
              >
                {/* Active indicator: top border in planet color */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] transition-opacity duration-300"
                  style={{
                    backgroundColor: fw.color,
                    opacity: isActive ? 1 : 0,
                  }}
                />

                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-1.5 w-1.5 shrink-0 rounded-full transition-opacity duration-300"
                    style={{
                      backgroundColor: fw.color,
                      opacity: isActive ? 1 : 0.35,
                    }}
                  />
                  <span
                    className={`datum text-[0.625rem] uppercase tracking-[0.2em] transition-colors duration-200 ${isActive ? "" : "text-bone-faint"
                      }`}
                    style={isActive ? { color: fw.color } : undefined}
                  >
                    {fw.planet}
                  </span>
                </div>

                <p
                  className={`inscription mt-1 text-[1.0625rem] transition-colors duration-200 ${isActive ? "text-bone" : "text-bone-soft"
                    }`}
                >
                  {fw.principle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Element grid */}
      <div className="grid grid-cols-4">
        {(Object.keys(SIGNS_BY_ELEMENT) as ElementKey[]).map((element) => {
          const color = ELEMENT_COLOR[element];
          const signKeys = SIGNS_BY_ELEMENT[element];

          return (
            <div key={element} className="min-w-0 border-r border-rule last:border-r-0">
              {/* Element header */}
              <div className="relative border-b border-rule bg-surface-alt px-5 py-3">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ backgroundColor: color }}
                />
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className="datum text-[0.6875rem] uppercase tracking-[0.16em]"
                    style={{ color }}
                  >
                    {element}
                  </span>
                  <span className="text-[0.75rem] text-bone-faint">
                    {ELEMENTS[element].theme}
                  </span>
                </div>
              </div>

              {/* Sign cards — fixed min-height so layout doesn't shift on planet change */}
              {signKeys.map((key) => {
                const sign = SIGNS[key];
                return (
                  <div
                    key={key}
                    className="flex h-[9rem] flex-col border-b border-rule-faint px-5 py-4 last:border-b-0"
                  >
                    {/* Sign identifier */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className="glyph text-[0.875rem] leading-none"
                        style={{ color, opacity: 0.7 }}
                      >
                        {sign.glyph}
                      </span>
                      <span className="datum text-[0.5625rem] uppercase tracking-[0.16em] text-bone-faint">
                        {sign.label}
                      </span>
                    </div>

                    {/* Domain */}
                    <p className="inscription mt-2.5 text-[0.9375rem] leading-none text-bone-soft">
                      {sign.domain}
                    </p>

                    {/* Planet description */}
                    <p className="mt-3 max-w-[15rem] text-[1rem] leading-[1.45] text-bone">
                      {framework.signs[key].description}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
