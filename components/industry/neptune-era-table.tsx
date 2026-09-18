//components/industry/music-comparison-table.tsx
"use client";

import { useState } from "react";
import { MUSIC_ERAS } from "@/lib/industry/music-eras-data";

const ROWS = [
  { key: "archetype", label: "Archetype" },
  { key: "expression", label: "Expression" },
] as const;

export default function NeptuneEraTable({ selectedSign, onSelect }: {
  selectedSign: string | null;
  onSelect: (sign: string) => void;
}) {
  const [hoveredSign, setHoveredSign] = useState<string | null>(null);
  const [focusedSign, setFocusedSign] = useState<string | null>(null);
  const activeSign = hoveredSign ?? focusedSign ?? selectedSign;
  const columnStyle = (sign: string, color: string) => ({
    backgroundColor: `${color}${activeSign === sign ? "20" : "0B"}`,
  });
  const rowLabel = "sticky left-0 z-10 border-r border-rule bg-void px-3 py-3 text-center align-middle datum text-[0.625rem] font-normal uppercase leading-relaxed tracking-[0.08em] text-bone-faint sm:px-4";

  return (
    <div>
      <p id="music-scroll-hint" className="datum mb-3 text-[0.625rem] text-bone-faint xl:hidden">
        Scroll sideways to compare all five eras →
      </p>
      <div
        role="region"
        aria-label="Music culture era comparison"
        aria-describedby="music-scroll-hint"
        tabIndex={0}
        className="overflow-x-auto border-y border-rule pb-1"
        onMouseLeave={() => setHoveredSign(null)}
      >
        <table className="w-full min-w-[960px] table-fixed border-separate border-spacing-0 text-center">
          <caption className="sr-only">Five Neptune eras compared by archetype, musical expression and examples. Aries is a hypothesis.</caption>
          <thead>
            <tr>
              <th scope="col" className={`${rowLabel} w-[120px] sm:w-[150px]`}>
                <span className="block">Culture<br />at a glance</span>
              </th>
              {MUSIC_ERAS.map((era) => (
                <th
                  key={era.sign} scope="col"
                  onMouseEnter={() => setHoveredSign(era.sign)}
                  style={{ ...columnStyle(era.sign, era.color), borderTopColor: era.color }}
                  className={`border-l border-rule-faint border-t-[3px] align-top font-normal transition-colors ${era.status === "upcoming" ? "border-t-dashed" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(era.sign)}
                    onFocus={() => setFocusedSign(era.sign)}
                    onBlur={() => setFocusedSign(null)}
                    aria-label={`Explore ${era.sign} era, ${era.dates}`}
                    aria-haspopup="dialog"
                    aria-expanded={selectedSign === era.sign}
                    className="group w-full cursor-pointer px-4 py-4 text-center focus-visible:outline-offset-[-3px]"
                  >
                    <span className="flex items-center justify-center gap-2 text-[1rem]" style={{ color: era.color }}>
                      <span className="glyph" aria-hidden="true">{era.symbol}</span>
                      {era.sign}
                      <span aria-hidden="true" className="text-bone-faint group-hover:text-bone">→</span>
                    </span>
                    <span className="datum mt-2 block text-[0.5625rem] uppercase tracking-[0.08em] text-bone-faint">{era.element}</span>
                    <span className="datum mt-1 block text-[0.625rem] text-bone-soft">{era.dates}</span>
                    {era.status === "upcoming" && <span className="datum mt-2 block text-[0.5625rem] uppercase tracking-[0.08em] text-bone-faint">Hypothesis</span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key}>
                <th scope="row" className={`${rowLabel} border-t border-rule`}>{row.label}</th>
                {MUSIC_ERAS.map((era) => (
                  <td key={era.sign} onMouseEnter={() => setHoveredSign(era.sign)} style={columnStyle(era.sign, era.color)} className="border-l border-t border-rule-faint px-4 py-3 align-middle transition-colors">
                    <span style={row.key === "archetype" ? { color: era.color } : undefined} className={`block text-[1.0625rem] leading-snug ${row.key === "archetype" ? "font-semibold text-bone" : "text-bone-soft"}`}>{row.key === "archetype" ? era.archetype : era.comparison.expression}</span>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className={`${rowLabel} border-t border-rule`}>Examples</th>
              {MUSIC_ERAS.map((era) => (
                <td key={era.sign} onMouseEnter={() => setHoveredSign(era.sign)} style={columnStyle(era.sign, era.color)} className="border-l border-t border-rule px-4 py-3 align-middle transition-colors">
                  <ul className="space-y-1">
                    {era.comparison.examples.map((name) => (
                      <li key={name}><span className="block text-[0.9375rem] leading-snug text-bone-soft">{name}</span></li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className={`${rowLabel} border-t border-rule italic`}>Early signal</th>
              {MUSIC_ERAS.map((era) => (
                <td key={era.sign} onMouseEnter={() => setHoveredSign(era.sign)} style={columnStyle(era.sign, era.color)} className="border-l border-t border-rule px-4 py-3 align-middle transition-colors">
                  <span className="text-[0.9375rem] italic leading-snug text-bone-soft">
                    {era.earlySignal.artist}
                    <span className="ml-1 not-italic text-bone-faint">[{era.earlySignal.year}]</span>
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className={`${rowLabel} border-t border-rule`}>Pivotal moment</th>
              {MUSIC_ERAS.map((era) => (
                <td key={era.sign} onMouseEnter={() => setHoveredSign(era.sign)} style={columnStyle(era.sign, era.color)} className="border-l border-t border-rule px-4 py-3 align-middle transition-colors">
                  <span className="block text-[0.9375rem] leading-snug text-bone-soft">{era.pivotalMoment.shift}</span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
