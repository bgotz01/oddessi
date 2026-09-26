//components/industry/pluto-era-table.tsx
"use client";

import { useState, type ReactNode } from "react";
import { ELEMENT_COLOR, signMeta } from "@/lib/symbols";
import {
  PLUTO_MUSIC_ERAS,
  plutoEraLabel,
  type PlutoEra,
} from "@/lib/industry/pluto-music-eras-data";
import { eraStatus } from "@/lib/industry/era-years";
import { useReadingYear } from "@/lib/industry/use-reading-year";

/**
 * The Pluto eras as a comparison table, built to the Neptune table's pattern —
 * sticky row labels, one column per era, the column lit on hover — so the two
 * music pages read the same way. The seven dimensions stay in the drawer.
 */
const ROWS: { key: string; label: string; italic?: boolean; cell: (era: PlutoEra, color: string) => ReactNode }[] = [
  {
    key: "model",
    label: "Model",
    cell: (era, color) =>
      era.model ? (
        <span style={{ color }} className="block text-[1.0625rem] font-semibold leading-snug">{era.model}</span>
      ) : (
        <Unknown />
      ),
  },
  {
    key: "leverage",
    label: "Leverage",
    cell: (era) =>
      era.holder ? <span className="block text-[1.0625rem] leading-snug text-bone-soft">{era.holder}</span> : <Unknown />,
  },
  {
    key: "artists",
    label: "Artists",
    cell: (era) =>
      era.artists.length > 0 ? (
        <ul className="space-y-1">
          {era.artists.map((artist) => (
            <li key={artist.name}><span className="block text-[0.9375rem] leading-snug text-bone-soft">{artist.name}</span></li>
          ))}
        </ul>
      ) : (
        <Unknown />
      ),
  },
  {
    key: "earlySignal",
    label: "Early signal",
    italic: true,
    cell: (era) =>
      era.earlySignal ? (
        <span className="text-[0.9375rem] italic leading-snug text-bone-soft">
          {era.earlySignal.name}
          <span className="ml-1 not-italic text-bone-faint">[{era.earlySignal.year}]</span>
        </span>
      ) : (
        <Unknown />
      ),
  },
];

function Unknown() {
  return <span className="text-[0.9375rem] italic text-bone-faint">To be identified</span>;
}

export default function PlutoEraTable({ selectedSign, onSelect }: {
  selectedSign: string | null;
  onSelect: (sign: string) => void;
}) {
  const [hoveredSign, setHoveredSign] = useState<string | null>(null);
  const [focusedSign, setFocusedSign] = useState<string | null>(null);
  const activeSign = hoveredSign ?? focusedSign ?? selectedSign;
  const year = useReadingYear();

  const colorOf = (era: PlutoEra) => {
    const meta = signMeta(era.sign);
    return meta ? ELEMENT_COLOR[meta.element] : "var(--color-patina)";
  };
  const columnStyle = (sign: string, color: string) => ({
    backgroundColor: `${color}${activeSign === sign ? "20" : "0B"}`,
  });
  const rowLabel = "sticky left-0 z-10 border-r border-rule bg-void px-3 py-3 text-center align-middle datum text-[0.625rem] font-normal uppercase leading-relaxed tracking-[0.08em] text-bone-faint sm:px-4";

  return (
    <div>
      <p id="pluto-scroll-hint" className="datum mb-3 text-[0.625rem] text-bone-faint xl:hidden">
        Scroll sideways to compare all {PLUTO_MUSIC_ERAS.length} eras →
      </p>
      <div
        role="region"
        aria-label="Pluto music era comparison"
        aria-describedby="pluto-scroll-hint"
        tabIndex={0}
        className="overflow-x-auto border-y border-rule pb-1"
        onMouseLeave={() => setHoveredSign(null)}
      >
        <table className="w-full min-w-[1000px] table-fixed border-separate border-spacing-0 text-center">
          <caption className="sr-only">{PLUTO_MUSIC_ERAS.length} Pluto eras compared by power model, leverage, artists, and early signal. Aquarius is an open question.</caption>
          <thead>
            <tr>
              <th scope="col" className={`${rowLabel} w-[120px] sm:w-[150px]`}>
                <span className="block">Power<br />at a glance</span>
              </th>
              {PLUTO_MUSIC_ERAS.map((era) => {
                const color = colorOf(era);
                const element = signMeta(era.sign)?.element;
                const status = year === null ? null : eraStatus(era.dates, year);
                return (
                  <th
                    key={era.sign} scope="col"
                    onMouseEnter={() => setHoveredSign(era.sign)}
                    style={{ ...columnStyle(era.sign, color), borderTopColor: color }}
                    className={`border-l border-rule-faint border-t-[3px] align-top font-normal transition-colors ${era.model ? "" : "border-t-dashed"}`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(era.sign)}
                      onFocus={() => setFocusedSign(era.sign)}
                      onBlur={() => setFocusedSign(null)}
                      aria-label={`Explore Pluto in ${era.sign}, ${era.dates}${status === "active" ? ", the era running now" : ""}`}
                      aria-haspopup="dialog"
                      aria-expanded={selectedSign === era.sign}
                      className="group w-full cursor-pointer px-4 py-4 text-center focus-visible:outline-offset-[-3px]"
                    >
                      <span className="flex items-center justify-center gap-2 text-[1rem]" style={{ color }}>
                        <span className="glyph" aria-hidden="true">{era.symbol}</span>
                        {era.sign}
                        <span aria-hidden="true" className="text-bone-faint group-hover:text-bone">→</span>
                      </span>
                      {element && <span className="datum mt-2 block text-[0.5625rem] uppercase tracking-[0.08em] text-bone-faint">{element}</span>}
                      <span className="datum mt-1 block text-[0.625rem] text-bone-soft">
                        {era.dates}
                        {status === "active" && <span style={{ color }}> · Now</span>}
                      </span>
                      <span className="datum mt-2 block text-[0.5625rem] uppercase tracking-[0.08em] text-bone-faint">{plutoEraLabel(era)}</span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key}>
                <th scope="row" className={`${rowLabel} border-t border-rule ${row.italic ? "italic" : ""}`}>{row.label}</th>
                {PLUTO_MUSIC_ERAS.map((era) => {
                  const color = colorOf(era);
                  return (
                    <td key={era.sign} onMouseEnter={() => setHoveredSign(era.sign)} style={columnStyle(era.sign, color)} className="border-l border-t border-rule-faint px-4 py-3 align-middle transition-colors">
                      {row.cell(era, color)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
