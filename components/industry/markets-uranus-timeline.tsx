//components/industry/markets-uranus-timeline.tsx
"use client";

import { useState } from "react";
import { MARKETS_URANUS_ERAS as eras } from "@/lib/industry/markets-uranus-eras-data";
import MarketsUranusDrawer, { catalystTag } from "@/components/industry/markets-uranus-drawer";

const ROWS = 6;

export default function MarketsUranusTimeline() {
  const START = eras[0].startYear;
  const END = eras[eras.length - 1].endYear;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="mt-8 space-y-6">
      <section aria-label={`Uranus market eras, ${START} to ${END}`}>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="inscription text-lg text-bone">♅ Uranus · Disruptive investment cycles</h2>
          <span className="datum text-xs text-bone-faint">{START}–{END} · {eras.length} eras · Select an era to read it</span>
        </div>
        <div role="region" aria-label="Explore the Uranus eras" tabIndex={0} className="overflow-x-auto pb-3">
          {/* Subgrid keeps each row aligned across eras, sized to its tallest cell */}
          <div
            className="grid min-w-[880px]"
            style={{
              gridTemplateColumns: eras.map((era) => `${era.endYear - era.startYear}fr`).join(" "),
              gridTemplateRows: `repeat(${ROWS}, auto)`,
            }}
          >
            {eras.map((era, i) => {
              const active = selectedIndex === i;
              return (
                <button
                  key={era.sign}
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={active}
                  onClick={() => setSelectedIndex(i)}
                  className="group row-span-6 grid min-w-0 cursor-pointer grid-rows-subgrid border-r border-rule text-center transition-colors last:border-r-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-patina"
                  style={{ backgroundColor: `${era.color}${active ? "20" : "08"}` }}
                >
                  <span className="block pb-3">
                    <span className="mb-3 block h-2 transition-[filter] group-hover:brightness-125" style={{ backgroundColor: era.color }} />
                    <span className="datum block text-xs text-bone-soft">{era.startYear}–{era.endYear}</span>
                    <span className="mt-2 flex items-center justify-center gap-2 text-lg text-bone"><span className="glyph text-2xl" style={{ color: era.color }} aria-hidden="true">{era.symbol}</span>{era.sign}</span>
                  </span>
                  <span className="block px-3 pb-3">
                    <span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">{era.domain}</span>
                    <span className="mt-1 block text-sm leading-snug text-bone-faint">{era.disruption}</span>
                  </span>
                  <span className="flex flex-col items-center justify-center border-t border-rule px-3 py-3">
                    <span className="datum mb-1 block text-[0.625rem] uppercase tracking-widest text-bone-faint">Emerging theme</span>
                    <span className="text-xl font-semibold leading-tight" style={{ color: era.color }}>{era.headline}</span>
                  </span>
                  <span className="block border-t border-rule px-3 py-3">
                    <span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">Manifestations</span>
                    {era.manifestations.map((item) => <span key={item.label} className="mt-1 block text-sm leading-snug text-bone-soft">{item.label}</span>)}
                  </span>
                  <span className="block border-t border-rule px-3 py-3">
                    <span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">Enabling catalyst</span>
                    {era.catalysts.map((catalyst) => (
                      <span key={catalyst.title} className="mt-2 block text-sm leading-snug text-bone-soft">
                        <span className="datum block text-[0.625rem]" style={{ color: era.color }}>{catalystTag(catalyst, era)}</span>
                        {catalyst.title}
                      </span>
                    ))}
                  </span>
                  <span className="datum block self-end pb-3 pt-1 text-[0.625rem] uppercase tracking-widest" style={{ color: era.color }}>{active ? "Reading →" : "Read era →"}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {selectedIndex !== null && (
        <MarketsUranusDrawer
          index={selectedIndex}
          onNavigate={setSelectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
}
