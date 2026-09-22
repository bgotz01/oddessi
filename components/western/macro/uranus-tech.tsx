// components/western/macro/uranus-tech.tsx
"use client";

import { useState } from "react";
import { URANUS_TECH_ERAS } from "@/lib/astrology/macro/uranus-tech-eras-data";
import type { TechEraData } from "@/lib/astrology/macro/uranus-tech-eras-data";
import TechDisruptionDrawer from "@/components/western/macro/tech-disruption-drawer";

const ERAS = URANUS_TECH_ERAS;

const ELEMENT_COLOR: Record<TechEraData["element"], string> = {
  earth: "#8ebf7a",
  air: "#a8b4c0",
  water: "#7899d4",
  fire: "#e07a50",
};

const TOTAL_END = ERAS[ERAS.length - 1].endYear;
const NOW = 2026.69;
const COLUMN_WIDTH = 240;
const COLUMN_PCT = 100 / ERAS.length;

// Match the fixed card columns, interpolating time within each era.
function timelinePosition(year: number) {
  if (year <= ERAS[0].startYear) return 0;
  if (year >= TOTAL_END) return 100;
  const index = ERAS.findIndex((era, i) =>
    year >= era.startYear && year < (ERAS[i + 1]?.startYear ?? era.endYear)
  );
  const era = ERAS[index];
  const end = ERAS[index + 1]?.startYear ?? era.endYear;
  return (index + (year - era.startYear) / (end - era.startYear)) * COLUMN_PCT;
}

// ─── Chronology bar ──────────────────────────────────────────────────────────

function ChronologyBar({
  selectedEraId,
  onSelect,
}: {
  selectedEraId: string | null;
  onSelect: (id: string) => void;
}) {
  const nowPct = timelinePosition(NOW);

  return (
    <div>
      <div className="relative h-6">
        <span
          className="datum absolute -translate-x-1/2 text-[0.6875rem] uppercase tracking-[0.12em] text-bone-soft"
          style={{ left: `${nowPct}%` }}
        >
          now
        </span>
      </div>

      <div className="relative flex h-3 overflow-hidden rounded-sm">
        {ERAS.map((era) => (
          <button
            key={era.id}
            type="button"
            onClick={() => onSelect(era.id)}
            aria-label={`${era.sign} ${era.timeframe}`}
            aria-pressed={selectedEraId === era.id}
            className="relative transition-[filter,opacity] hover:brightness-125"
            style={{
              width: `${COLUMN_PCT}%`,
              backgroundColor: ELEMENT_COLOR[era.element],
              opacity: selectedEraId === era.id ? 1 : 0.72,
            }}
          />
        ))}
        <div
          className="pointer-events-none absolute -top-1 h-5 w-px bg-bone"
          style={{ left: `${nowPct}%` }}
        />
      </div>

      <div className="relative mt-2 h-5">
        {ERAS.map((era, index) => {
          const pct = index * COLUMN_PCT;
          return (
            <span
              key={era.id}
              className={`datum absolute text-[0.6875rem] text-bone-faint ${index === 0 ? "" : "-translate-x-1/2"}`}
              style={{ left: `${pct}%` }}
            >
              {era.startYear}
            </span>
          );
        })}
        <span className="datum absolute right-0 text-[0.6875rem] text-bone-faint">
          {TOTAL_END}
        </span>
      </div>
    </div>
  );
}

// ─── Era card ─────────────────────────────────────────────────────────────────

function EraCard({
  era,
  selected,
  onSelect,
}: {
  era: TechEraData;
  selected: boolean;
  onSelect: () => void;
}) {
  const color = ELEMENT_COLOR[era.element];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative row-span-4 grid min-w-0 grid-rows-subgrid gap-5 border-l border-rule-faint px-4 py-5 text-left transition-colors hover:bg-surface-alt ${selected ? "bg-surface-alt" : ""}`}
    >
      {/* Sign + dates */}
      <div>
        <div className="flex items-center gap-2">
          <span className="glyph text-[1.125rem] leading-none" style={{ color }}>
            {era.symbol}
          </span>
          <span className="inscription text-[0.9375rem] uppercase tracking-[0.06em] text-bone">
            {era.sign}
          </span>
          {era.status === "active" && (
            <span className="datum ml-auto text-[0.5625rem] uppercase tracking-[0.14em]" style={{ color }}>
              now
            </span>
          )}
        </div>
        <span className="datum mt-1 block text-[0.625rem] text-bone-faint">
          {era.timeframe}
        </span>
      </div>

      {/* Domain + disruption */}
      <div>
        <p
          className="datum text-[0.6875rem] uppercase tracking-[0.14em]"
          style={{ color }}
        >
          {era.domain}
        </p>
        <p className="datum mt-3 text-[0.5625rem] uppercase tracking-[0.12em] text-bone-faint/60">
          Shock to {era.domain}
        </p>
        <p className="inscription mt-1 text-[1.0625rem] leading-snug text-bone">
          {era.paradigm}
        </p>
      </div>

      {/* Top 3 events */}
      <div className="border-t border-rule-faint pt-3">
        {era.events.length > 0 ? (
          <div className="grid auto-rows-[minmax(2.5rem,auto)] gap-2">
            {era.events.slice(0, 3).map((event) => (
              <div key={`${event.year}-${event.name}`} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-1.5">
                <span className="datum whitespace-nowrap text-[0.625rem] leading-snug text-bone-faint">
                  {event.year}
                </span>
                <span className="text-[0.75rem] leading-snug text-bone-soft">
                  {event.name}
                </span>
              </div>
            ))}
          </div>
        ) : era.earlySignal && era.earlySignal.length > 0 ? (
          <div className="grid auto-rows-[minmax(2.5rem,auto)] gap-2">
            {era.earlySignal.slice(0, 3).map((signal) => {
              const dash = signal.marker.indexOf(" — ");
              const year = dash !== -1 ? signal.marker.slice(0, dash) : "";
              const name = dash !== -1 ? signal.marker.slice(dash + 3) : signal.marker;
              return (
                <div key={signal.marker} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-1.5">
                  <span className="datum whitespace-nowrap text-[0.625rem] leading-snug text-bone-faint">
                    {year}
                  </span>
                  <span className="text-[0.75rem] italic leading-snug text-bone-faint">
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-[0.75rem] italic leading-snug text-bone-faint">
            Forming
          </p>
        )}
      </div>

      {/* Early signal — shown for completed eras that have one */}
      {era.events.length > 0 && era.earlySignal && era.earlySignal.length > 0 ? (
        <div className="border-t border-rule-faint pt-3">
          <p className="datum mb-2 text-[0.5625rem] uppercase tracking-[0.14em] text-bone-faint/60">
            Early signal
          </p>
          <div className="space-y-1.5">
            {era.earlySignal.map((signal) => {
              const dash = signal.marker.indexOf(" — ");
              const year = dash !== -1 ? signal.marker.slice(0, dash) : "";
              const name = dash !== -1 ? signal.marker.slice(dash + 3) : signal.marker;
              return (
                <div key={signal.marker} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-1.5">
                  <span className="datum whitespace-nowrap text-[0.625rem] leading-snug text-bone-faint">
                    {year}
                  </span>
                  <span className="text-[0.75rem] leading-snug" style={{ color }}>
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : <div aria-hidden="true" />}

      {/* Bottom accent on hover / selected */}
      <div
        className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: color }}
      />
    </button>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────

export default function UranusTech() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedIndex = ERAS.findIndex((e) => e.id === selectedId);
  const selectedEra = selectedIndex >= 0 ? ERAS[selectedIndex] : null;

  return (
    <>
      <div className="-mx-2 overflow-x-auto px-2 pb-3">
        <div style={{ width: ERAS.length * COLUMN_WIDTH }}>
          <ChronologyBar selectedEraId={selectedId} onSelect={setSelectedId} />

          <div
            className="mt-8 grid grid-rows-[auto_auto_auto_auto] gap-y-5"
            style={{ gridTemplateColumns: `repeat(${ERAS.length}, ${COLUMN_WIDTH}px)` }}
          >
            {ERAS.map((era) => (
              <EraCard
                key={era.id}
                era={era}
                selected={selectedId === era.id}
                onSelect={() => setSelectedId(era.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="datum mt-3 text-center text-[0.6875rem] uppercase tracking-[0.16em] text-bone-faint">
        Select an era for the full analysis
      </p>

      {selectedEra ? (
        <TechDisruptionDrawer
          era={selectedEra}
          previous={selectedIndex > 0 ? ERAS[selectedIndex - 1] : null}
          next={selectedIndex < ERAS.length - 1 ? ERAS[selectedIndex + 1] : null}
          onNavigate={setSelectedId}
          onClose={() => setSelectedId(null)}
        />
      ) : null}
    </>
  );
}
