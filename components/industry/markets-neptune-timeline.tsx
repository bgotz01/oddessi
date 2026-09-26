//components/industry/markets-neptune-timeline.tsx
"use client";

import { useState } from "react";
import { MARKETS_NEPTUNE_ERAS as eras } from "@/lib/industry/markets-neptune-eras-data";
import MarketsNeptuneDrawer from "@/components/industry/markets-neptune-drawer";

const ROWS = 6;

export default function MarketsNeptuneTimeline() {
  const START = eras[0].startYear;
  const END = eras[eras.length - 1].endYear;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="mt-8 space-y-6">
      <section aria-label={`Neptune market eras, ${START} to ${END}`}>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="inscription text-lg text-bone">♆ Neptune · The narrative capital believes in</h2>
          <span className="datum text-xs text-bone-faint">{START}–{END} · {eras.length} eras · Select an era to read it</span>
        </div>
        <div role="region" aria-label="Explore the Neptune eras" tabIndex={0} className="overflow-x-auto pb-3">
          {/* Subgrid keeps each row aligned across eras, sized to its tallest cell */}
          <div
            className="grid min-w-[1010px]"
            style={{
              gridTemplateColumns: `128px ${eras.map((era) => `${era.endYear - era.startYear}fr`).join(" ")}`,
              gridTemplateRows: `repeat(${ROWS}, auto)`,
            }}
          >
            {/* Row labels, once for all eras */}
            <div className="sticky left-0 z-10 row-span-6 grid grid-rows-subgrid border-r border-rule bg-void">
              <span />
              <span className="border-t border-rule px-3 py-3 text-left"><span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">The dream</span></span>
              <span className="border-t border-rule px-3 py-2.5 text-left"><span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">Opening</span></span>
              <span className="border-t border-rule px-3 py-2.5 text-left"><span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">Inflection</span></span>
              <span className="border-t border-dashed border-rule px-3 py-3 text-left"><span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">Disillusionment</span></span>
              <span className="border-t border-rule px-3 py-3 text-left"><span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">Manifestations</span></span>
            </div>
            {eras.map((era, i) => {
              const active = selectedIndex === i;
              return (
                <div
                  key={era.sign}
                  className="row-span-6 grid min-w-0 grid-rows-subgrid border-r border-rule text-center transition-colors last:border-r-0"
                  style={{ backgroundColor: `${era.color}${active ? "20" : "08"}` }}
                >
                  {/* Only the header opens the reading */}
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={active}
                    aria-label={`Neptune in ${era.sign}, ${era.startYear}–${era.endYear}: ${era.headline}. Open the reading.`}
                    onClick={() => setSelectedIndex(i)}
                    className="group flex cursor-pointer flex-col justify-start pb-3 transition-colors hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-patina"
                  >
                    {/* Solid for the dream, hatched after the inflection */}
                    <span className="mb-3 flex h-2 transition-[filter] group-hover:brightness-125" title={era.inflection ? `Inflection ${era.inflection.year}: ${era.inflection.title}` : undefined}>
                      <span style={{ backgroundColor: era.color, flex: (era.inflection?.year ?? era.endYear) - era.startYear }} />
                      {era.inflection && <span style={{ flex: era.endYear - era.inflection.year, background: `repeating-linear-gradient(135deg, ${era.color} 0 3px, ${era.color}55 3px 6px)` }} />}
                    </span>
                    <span className="datum block text-[0.625rem] uppercase tracking-widest text-bone"><span className="glyph mr-1.5 text-base normal-case" style={{ color: era.color }} aria-hidden="true">{era.symbol}</span>{era.sign} · {era.startYear}–{era.endYear}</span>
                    <span className="datum block text-[0.625rem] uppercase tracking-widest mt-1.5 px-3 text-bone-faint">{era.domain} · <span className="normal-case tracking-normal">{era.theme}</span></span>
                  </button>
                  <span className="block border-t border-rule px-3 py-3">
                    <span className="block text-lg font-semibold leading-tight" style={{ color: era.color }}>{era.headline}</span>
                    <span className="mt-1 block text-sm leading-snug text-bone-soft">{era.dream}</span>
                  </span>
                  <span className="block border-t border-rule px-3 py-2.5">
                    <span className="datum block text-[0.625rem] uppercase tracking-widest" style={{ color: era.color }}>{era.opening.period}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-bone">{era.opening.title}</span>
                  </span>
                  <span className="block border-t border-rule px-3 py-2.5">
                    {era.inflection && <span className="datum block text-[0.625rem] uppercase tracking-widest" style={{ color: era.color }}>{era.inflection.year}</span>}
                    <span className={`mt-0.5 block text-sm leading-snug ${era.inflection ? "text-bone" : "italic text-bone-faint"}`}>{era.inflection?.title ?? "Not yet"}</span>
                  </span>
                  <span className="block border-t border-dashed border-rule px-3 py-3">
                    <span className={`block text-[0.9375rem] leading-snug ${era.disillusionment ? "font-semibold text-bone" : "italic text-bone-faint"}`}>{era.disillusionment?.title ?? "Not yet identified"}</span>
                  </span>
                  <span className="block self-start border-t border-rule px-3 py-3">
                    {era.manifestations.map((item) => <span key={item} className="block text-sm leading-snug text-bone-soft [&:not(:first-child)]:mt-1">{item}</span>)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedIndex !== null && (
        <MarketsNeptuneDrawer
          index={selectedIndex}
          onNavigate={setSelectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
}
