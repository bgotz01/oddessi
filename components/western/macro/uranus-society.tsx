// components/western/macro/uranus-society.tsx
"use client";

import { URANUS_ERAS } from "@/lib/astrology/macro/uranus-eras-data";
import type { UranusEraElement } from "@/lib/astrology/macro/uranus-eras-data";

const ERAS = URANUS_ERAS;

const ELEMENT_COLOR: Record<UranusEraElement, string> = {
  earth: "#8ebf7a",
  air: "#a8b4c0",
  water: "#7899d4",
  fire: "#e07a50",
};

const TOTAL_START = ERAS[0].startYear;
const TOTAL_END = ERAS[ERAS.length - 1].endYear;
const TOTAL_SPAN = TOTAL_END - TOTAL_START;
const NOW = 2026.69;

function eraWidthPct(index: number) {
  const era = ERAS[index];
  const boundary = ERAS[index + 1]?.startYear ?? era.endYear;
  return ((boundary - era.startYear) / TOTAL_SPAN) * 100;
}

export default function UranusSociety({
  selectedEraId,
  onSelect,
}: {
  selectedEraId: string | null;
  onSelect: (eraId: string) => void;
}) {
  const nowPct = ((NOW - TOTAL_START) / TOTAL_SPAN) * 100;

  return (
    <div className="mb-2">
      <div className="relative mb-1 h-5 w-full">
        <span
          className="datum absolute -translate-x-1/2 text-[0.75rem] text-bone"
          style={{ left: `${nowPct}%` }}
        >
          now
        </span>
      </div>

      <div className="relative flex h-10 w-full overflow-hidden rounded-[2px]">
        {ERAS.map((era, index) => {
          const color = ELEMENT_COLOR[era.element];
          const widthPct = eraWidthPct(index);
          return (
            <button
              type="button"
              key={era.id}
              onClick={() => onSelect(era.id)}
              aria-label={`Open Uranus in ${era.sign}, ${era.timeframe}`}
              aria-pressed={selectedEraId === era.id}
              className="relative cursor-pointer transition-[filter] hover:brightness-110"
              style={{
                width: `${widthPct}%`,
                backgroundColor: color,
                opacity: era.status === "active" ? 0.95 : 0.82,
              }}
            >
              <span className="absolute top-0 right-0 h-full w-px bg-void/30" />
            </button>
          );
        })}

        <div
          className="absolute top-0 h-full w-[2px] bg-bone/80"
          style={{ left: `${nowPct}%` }}
        />
      </div>

      <div className="relative mt-1.5 h-5 w-full">
        {ERAS.map((era, index) => {
          const pct = ((era.startYear - TOTAL_START) / TOTAL_SPAN) * 100;
          return (
            <span
              key={era.id}
              className={`datum absolute text-[0.75rem] text-bone-faint ${index === 0 ? "" : "-translate-x-1/2"}`}
              style={{ left: `${pct}%` }}
            >
              {era.startYear}
            </span>
          );
        })}
        <span className="datum absolute right-0 text-[0.75rem] text-bone-faint">
          {TOTAL_END}
        </span>
      </div>

      <div className="mt-6 flex w-full items-stretch">
        {ERAS.map((era, index) => {
          const color = ELEMENT_COLOR[era.element];
          const widthPct = eraWidthPct(index);
          const selected = selectedEraId === era.id;
          return (
            <button
              type="button"
              key={era.id}
              onClick={() => onSelect(era.id)}
              aria-pressed={selected}
              className={`grid cursor-pointer grid-rows-[4.5rem_3rem_4.5rem] gap-2 px-2 py-3 text-center transition-colors hover:bg-surface-alt ${selected ? "bg-surface-alt" : ""}`}
              style={{
                width: `${widthPct}%`,
                borderLeft: `2px solid ${color}`,
              }}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="flex min-w-0 items-baseline justify-center gap-1.5">
                  <span className="glyph text-[1.0625rem] leading-none" style={{ color }}>
                    {era.symbol}
                  </span>
                  <span className="inscription text-[0.875rem] tracking-[-0.02em] text-bone">
                    {era.sign}
                  </span>
                </span>
                <span className="text-[0.6875rem] italic leading-none text-bone-faint">
                  rules House {era.house}
                </span>
                <span className="datum text-[0.6875rem] leading-snug text-bone-faint">
                  {era.timeframe}
                </span>
              </div>

              <span
                className="datum flex items-start justify-center break-words text-[0.6875rem] leading-relaxed uppercase tracking-[0.14em]"
                style={{ color }}
              >
                {era.domain}
              </span>

              <div className="flex flex-col items-center justify-start gap-1.5">
                <span className="datum text-[0.5625rem] uppercase tracking-[0.14em] text-bone-faint">
                  Shock
                </span>
                <span className="text-[1.0625rem] leading-snug text-bone">
                  {era.shock}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
