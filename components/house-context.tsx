"use client";

import { useState } from "react";
import type { Chart } from "@/lib/charts";
import { houseCircuits } from "@/lib/dominance";
import { useScoring } from "@/components/scoring-context";
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
        <div key={body} className="bg-surface px-4 py-3 flex flex-col items-center text-center">
          <div className="flex items-baseline gap-2">
            <span className="glyph text-[1.25rem] text-patina">
              {bodyGlyph(body)}
            </span>
            <span className="inscription text-[0.75rem] text-bone">{body}</span>
          </div>
          <p className="mt-1 text-[1.0625rem] font-light text-bone-faint italic">
            {verb}
          </p>
        </div>
      ))}
    </div>
  );
}

export function HouseCircuits({ chart }: { chart: Chart }) {
  // Rulership is configurable, and a circuit is made of rulers — reading them
  // by a different table than the scores would put the two views in conflict.
  const { config } = useScoring();
  const circuits = houseCircuits(chart, config);
  if (circuits.length === 0) return null;

  return (
    <div className="border-t border-rule">
      <p className="py-4 text-[0.9375rem] font-light text-bone-soft">
        Where the rulers chase each other in a closed ring. These life areas do
        not move independently — pull on one and the others follow.
      </p>

      <div className="flex flex-col gap-6">
        {circuits.map((circuit) => (
          <div
            key={circuit.houses.join("-")}
            className="border border-rule bg-surface px-8 py-8"
          >
            {/* Badge */}
            <div className="mb-6 flex justify-center">
              <span className="datum border border-rule px-3 py-1 text-[0.5625rem] tracking-[0.2em] text-bone-faint uppercase">
                {circuit.houses.length}-house circuit
              </span>
            </div>

            {/* Circuit diagram — centered */}
            <div className="flex flex-wrap items-center justify-center gap-y-6">
              {circuit.houses.map((house, i) => (
                <span key={house} className="flex items-center">
                  {/* House node */}
                  <span className="flex flex-col items-center gap-1.5 px-2">
                    <span className="inscription text-[2rem] leading-none text-patina">
                      {house}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="glyph text-[1rem] text-bone-soft">
                        {bodyGlyph(circuit.rulers[i])}
                      </span>
                      <span className="datum text-[0.625rem] tracking-[0.14em] text-bone-soft uppercase">
                        {circuit.rulers[i]}
                      </span>
                    </span>
                  </span>

                  {/* Arrow */}
                  <span className="datum mx-3 text-[0.75rem] tracking-tight text-rule select-none">
                    →
                  </span>
                </span>
              ))}

              {/* Closing node — back to start */}
              <span className="flex flex-col items-center gap-1.5 px-2 opacity-40">
                <span className="inscription text-[2rem] leading-none text-patina">
                  {circuit.houses[0]}
                </span>
                <span className="datum text-[0.625rem] tracking-[0.14em] text-bone-faint uppercase">
                  closes
                </span>
              </span>
            </div>

            {/* Description */}
            <p className="mx-auto mt-8 max-w-2xl text-center text-[1.0625rem] leading-relaxed font-light text-bone-soft">
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
