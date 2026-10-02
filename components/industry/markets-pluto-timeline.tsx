//components/industry/markets-pluto-timeline.tsx
"use client";

import { useState } from "react";
import { MARKETS_PLUTO_ERAS as eras } from "@/lib/industry/markets-pluto-eras-data";
import MarketsPlutoDrawer, { catalystTag } from "@/components/industry/markets-pluto-drawer";

const ROWS = 4;

export default function MarketsPlutoTimeline() {
  const START = eras[0].startYear;
  const END = eras[eras.length - 1].endYear;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="mt-8 space-y-6">
      <section aria-label={`Pluto market eras, ${START} to ${END}`}>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="inscription text-lg text-bone">♇ Pluto · The organization of capital</h2>
          <span className="datum text-xs text-bone-faint">{START}–{END} · {eras.length} eras · Select an era to read it</span>
        </div>
        <div role="region" aria-label="Explore the Pluto eras" tabIndex={0} className="overflow-x-auto pb-3">
          {/* Subgrid keeps each row aligned across eras, sized to its tallest cell */}
          <div
            className="grid min-w-[1010px]"
            style={{
              gridTemplateColumns: `128px ${eras.map((era) => `${era.endYear - era.startYear}fr`).join(" ")}`,
              gridTemplateRows: `repeat(${ROWS}, auto)`,
            }}
          >
            {/* Row labels, once for all eras */}
            <div className="sticky left-0 z-10 row-span-4 grid grid-rows-subgrid border-r border-rule bg-void">
              <span />
              <span className="border-t border-rule px-3 py-3 text-left"><span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">Organized through</span></span>
              <span className="border-t border-rule px-3 py-3 text-left"><span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">Catalysts</span></span>
              <span className="border-t border-rule px-3 py-3 text-left"><span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">Manifestations</span></span>
            </div>
            {eras.map((era, i) => {
              const active = selectedIndex === i;
              return (
                <div
                  key={era.sign}
                  className="row-span-4 grid min-w-0 grid-rows-subgrid border-r border-rule text-center transition-colors last:border-r-0"
                  style={{ backgroundColor: `${era.color}${active ? "20" : "08"}` }}
                >
                  {/* Only the header opens the reading */}
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={active}
                    aria-label={`Pluto in ${era.sign}, ${era.startYear}–${era.endYear}: ${era.headline}. Open the reading.`}
                    onClick={() => setSelectedIndex(i)}
                    className="group flex cursor-pointer flex-col justify-start pb-3 transition-colors hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-patina"
                  >
                    <span className="mb-3 block h-2 transition-[filter] group-hover:brightness-125" style={{ backgroundColor: era.color }} />
                    <span className="datum block text-[0.625rem] uppercase tracking-widest text-bone"><span className="glyph mr-1.5 text-base normal-case" style={{ color: era.color }} aria-hidden="true">{era.symbol}</span>{era.sign} · {era.startYear}–{era.endYear}</span>
                    <span className="datum block text-[0.625rem] uppercase tracking-widest mt-1.5 px-3 text-bone-faint">{era.domain} · <span className="normal-case tracking-normal">{era.theme}</span></span>
                  </button>
                  <span className="block border-t border-rule px-3 py-3">
                    <span className="block text-lg font-semibold leading-tight" style={{ color: era.color }}>{era.headline}</span>
                    <span className="mt-1 block text-sm italic text-bone-soft">{era.archetype}</span>
                  </span>
                  <span className="block border-t border-rule px-3 py-3">
                    {era.catalysts.map((catalyst) => (
                      <span key={catalyst.title} className="block text-sm leading-snug text-bone [&:not(:first-child)]:mt-2">
                        <span className="datum block text-[0.625rem]" style={{ color: era.color }}>{catalystTag(catalyst, era)}</span>
                        {catalyst.title}
                      </span>
                    ))}
                  </span>
                  <span className="block self-start border-t border-rule px-3 py-3">
                    {era.manifestations.map((item) => <span key={item.title} className="block text-sm leading-snug text-bone-soft [&:not(:first-child)]:mt-1">{item.title}</span>)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedIndex !== null && (
        <MarketsPlutoDrawer
          index={selectedIndex}
          onNavigate={setSelectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
}
