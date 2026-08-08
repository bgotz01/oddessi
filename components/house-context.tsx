"use client";

import type { Chart } from "@/lib/charts";
import { houseCircuits } from "@/lib/dominance";
import { HOUSE_TYPE_EXPLANATIONS } from "@/lib/astrology/houses/houses";
import { HOUSE_TYPES, houseTypeStyle } from "@/lib/house-types";
import { bodyGlyph } from "@/lib/symbols";

/**
 * The three explanatory sections that sit between the grid and the readings:
 * what each body does to a house, which houses are wired to each other, and
 * what angular / succedent / cadent actually means.
 *
 * These are constants, not readings — nothing here depends on the chart except
 * the circuits. They exist so the grid above is legible to someone who has not
 * already memorised the system.
 */

/** One verb per body. The whole point is that they are not interchangeable. */
const VERBS: Array<[string, string]> = [
  ["Sun", "centralises"],
  ["Moon", "sensitises"],
  ["Mercury", "interprets"],
  ["Venus", "softens"],
  ["Mars", "energises"],
  ["Jupiter", "expands"],
  ["Saturn", "hardens"],
  ["Uranus", "disrupts"],
  ["Neptune", "dissolves"],
  ["Pluto", "transforms"],
];

export function PlanetaryInfluences() {
  return (
    <div className="grid grid-cols-2 gap-px bg-rule-faint sm:grid-cols-3 lg:grid-cols-5">
      {VERBS.map(([body, verb]) => (
        <div key={body} className="bg-surface px-4 py-3">
          <div className="flex items-baseline gap-2">
            <span className="glyph text-[1.0625rem] text-patina">
              {bodyGlyph(body)}
            </span>
            <span className="inscription text-[0.625rem] text-bone">{body}</span>
          </div>
          <p className="mt-1 text-[0.9375rem] font-light text-bone-faint italic">
            {verb}
          </p>
        </div>
      ))}
    </div>
  );
}

export function HouseCircuits({ chart }: { chart: Chart }) {
  const circuits = houseCircuits(chart);
  if (circuits.length === 0) return null;

  return (
    <div className="border-t border-rule">
      <p className="py-4 text-[0.9375rem] font-light text-bone-soft">
        Where the rulers chase each other in a closed ring. These life areas do
        not move independently — pull on one and the others follow.
      </p>

      {circuits.map((circuit) => (
        <div
          key={circuit.houses.join("-")}
          className="border-t border-rule-faint py-6"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
            <span className="datum border border-rule px-2 py-0.5 text-[0.625rem] tracking-[0.16em] text-bone-faint uppercase">
              {circuit.houses.length}-house
            </span>

            {circuit.houses.map((house, i) => (
              <span key={house} className="flex items-center gap-3">
                <span className="flex flex-col items-center">
                  <span className="inscription text-[1.0625rem] text-patina">
                    {house}
                  </span>
                  <span className="datum mt-0.5 flex items-baseline gap-1 text-[0.5625rem] tracking-[0.12em] text-bone-faint uppercase">
                    <span className="glyph text-[0.75rem]">
                      {bodyGlyph(circuit.rulers[i])}
                    </span>
                    {circuit.rulers[i]}
                  </span>
                </span>
                <span className="datum text-[0.75rem] text-rule">──→</span>
              </span>
            ))}

            {/* The ring closing back on where it started. */}
            <span className="flex flex-col items-center">
              <span className="inscription text-[1.0625rem] text-bone-faint">
                {circuit.houses[0]}
              </span>
              <span className="datum mt-0.5 text-[0.5625rem] tracking-[0.12em] text-bone-faint uppercase">
                closes
              </span>
            </span>
          </div>

          <p className="mt-4 max-w-3xl text-[1.0625rem] leading-relaxed font-light text-bone-soft">
            {circuit.houses.length === 2
              ? `${circuit.rulers[0]} runs house ${circuit.houses[0]} but lives in
                 house ${circuit.houses[1]}, and ${circuit.rulers[1]} runs house
                 ${circuit.houses[1]} but lives in house ${circuit.houses[0]}.
                 Each is a guest in the other's rooms, so neither area can be
                 settled without settling both.`
              : `${circuit.rulers[0]} runs house ${circuit.houses[0]} from house
                 ${circuit.houses[1]}, whose ruler ${circuit.rulers[1]} sits in
                 house ${circuit.houses[2]}, whose ruler ${circuit.rulers[2]}
                 sits back in house ${circuit.houses[0]}. A closed three-step
                 circuit.`}
          </p>
        </div>
      ))}
    </div>
  );
}

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
