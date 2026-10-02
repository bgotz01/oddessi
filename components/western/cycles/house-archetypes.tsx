// components/western/cycles/house-archetypes.tsx

"use client";

import { useState } from "react";
import { HOUSE_CATEGORIES, type HouseCategory } from "@/lib/astrology/house-categories";
import { HOUSE_TYPES, houseTypeStyle } from "@/lib/house-types";
import { houseInfo } from "@/lib/interpretation";
import MeaningLabel from "@/components/western/houses/meaning-label";

/**
 * A static reference panel for the twelve houses — the companion to
 * `PlanetArchetypes`. Where a planet says *what* is moving, the house says
 * *where* in a life it lands, and every house can land in two places: the
 * literal, external world (people, money, buildings, events) or the inner,
 * symbolic one (the attitude or need those things stand for).
 *
 * Both readings sit on every card so the duality is visible at a glance; the
 * lens control dims one side to read the twelve straight down a single axis.
 *
 * The cards are cut from the same cloth as the wall on /western/houses — type
 * bar and numeral in the house type's hue, canonical titles from
 * `getHouseTitle` — so a house looks like the same object on both pages.
 */


type Lens = "both" | "external" | "inner";

const LENSES: { id: Lens; label: string }[] = [
  { id: "both", label: "Both" },
  { id: "external", label: "External" },
  { id: "inner", label: "Internal" },
];

/**
 * One house, styled as on the houses wall: the type bar as the top border, the
 * numeral and title, then External and Internal on tracks of their own. The
 * card is a subgrid of the wall, so every External starts on one line across
 * the row and every Internal on the next.
 */
function HouseCard({ house, lens }: { house: HouseCategory; lens: Lens }) {
  const tone = houseTypeStyle(houseInfo(house.house)?.element);
  const fade = (dimmed: boolean) =>
    `transition-opacity duration-300 ${dimmed ? "opacity-20" : ""}`;

  return (
    <div
      className="row-span-3 grid grid-rows-subgrid border border-rule bg-surface px-4 pt-5 pb-6 text-center"
      style={{ borderTopWidth: 3, borderTopColor: tone.color }}
    >
      <span className="flex flex-col">
        <span className="inscription text-[1.5rem] leading-none" style={{ color: tone.color }}>
          {house.house}
        </span>
        <span className="inscription mt-3 text-[0.625rem] leading-snug tracking-[0.04em] text-bone">
          {house.title}
        </span>
      </span>

      <span
        className={`mt-2 flex flex-col items-center border-t border-rule pt-5 ${fade(lens === "inner")}`}
      >
        <MeaningLabel tone="text-patina">External</MeaningLabel>
        <span className="mt-2.5 block text-[1rem] leading-[1.35] text-balance text-bone">
          {house.external}
        </span>
      </span>

      <span className={`flex flex-col items-center pt-2 ${fade(lens === "external")}`}>
        <MeaningLabel tone="text-ember">Internal</MeaningLabel>
        <span className="mt-2.5 block text-[1rem] leading-[1.35] text-balance text-bone-soft italic">
          {house.internal}
        </span>
      </span>
    </div>
  );
}

export default function HouseReadings() {
  const [lens, setLens] = useState<Lens>("both");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
        <p className="max-w-2xl text-[0.9375rem] font-light text-bone-soft">
          Every house lands twice — <span className="text-patina">externally</span>, in the world
          of people, money and places, and <span className="text-ember">internally</span>, as the
          need those things stand for.
        </p>
        <div role="radiogroup" aria-label="Reading" className="flex gap-2">
          {LENSES.map((l) => (
            <button
              key={l.id}
              type="button"
              role="radio"
              aria-checked={lens === l.id}
              onClick={() => setLens(l.id)}
              className={`datum border px-3 py-1.5 text-[0.625rem] tracking-[0.18em] uppercase transition-colors ${
                lens === l.id
                  ? l.id === "external"
                    ? "border-patina-dim text-patina"
                    : l.id === "inner"
                      ? "border-ember-dim text-ember"
                      : "border-rule text-bone"
                  : "border-rule text-bone-faint hover:text-bone-soft"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {Object.values(HOUSE_CATEGORIES).map((house) => (
          <HouseCard key={house.house} house={house} lens={lens} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-rule-faint pt-4">
        {HOUSE_TYPES.map((t) => {
          const tone = houseTypeStyle(t);
          return (
            <span key={t} className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5" style={{ background: tone.color }} />
              <span
                className="datum text-[0.625rem] tracking-[0.16em] uppercase"
                style={{ color: tone.color }}
              >
                {t} — {tone.gloss}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
