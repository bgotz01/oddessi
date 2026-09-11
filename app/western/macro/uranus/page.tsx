//western/macro/uranus/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { PageTitle, SectionHeading } from "@/components/primitives";
import UranusEraDrawer from "@/components/western/macro/uranus-era-drawer";
import { URANUS_ERAS } from "@/lib/astrology/macro/uranus-eras-data";
import type { UranusEraElement } from "@/lib/astrology/macro/uranus-eras-data";

const ERAS = URANUS_ERAS;

const ELEMENT_COLOR: Record<UranusEraElement, string> = {
  earth: "#8ebf7a",
  air: "#7dc0d8",
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


function UranusTimeline({
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
              className={`grid cursor-pointer grid-rows-[4.5rem_3rem_4.5rem_minmax(4.5rem,1fr)] gap-2 px-2 py-3 text-center transition-colors hover:bg-surface-alt ${selected ? "bg-surface-alt" : ""}`}
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

              <span className="flex flex-col items-center justify-start gap-1 break-words text-[1.0625rem] leading-snug text-bone">
                <span className="datum text-[0.5625rem] uppercase tracking-[0.12em] text-bone-faint/60">
                  Shock
                </span>
                {era.shock}
              </span>

              <span className="flex flex-col items-center justify-start gap-1 break-words border-t border-rule-faint pt-2.5 text-[1.0625rem] leading-snug text-bone">
                <span className="datum text-[0.5625rem] uppercase tracking-[0.12em] text-bone-faint/60">
                  Question
                </span>
                {era.question}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ShockProgression({
  selectedEraId,
  onSelect,
}: {
  selectedEraId: string | null;
  onSelect: (eraId: string) => void;
}) {
  return (
    <div className="mb-12">
      <p className="mx-auto mb-8 max-w-3xl text-center text-[1.25rem] italic leading-relaxed text-bone-soft">
        What assumption gets broken—and what reorganizes around its failure?
      </p>

      <div className="-mx-2 overflow-x-auto px-2 pb-3">
        <div className="min-w-[2380px]">
          <UranusTimeline selectedEraId={selectedEraId} onSelect={onSelect} />
        </div>
      </div>
      <p className="datum mt-3 text-center text-[0.6875rem] uppercase tracking-[0.16em] text-bone-faint">
        Select an era to open its full reading
      </p>

      <div className="mx-auto mt-12 max-w-3xl border-y border-rule py-6 text-center">
        <p className="datum text-[0.6875rem] uppercase tracking-[0.2em] text-patina">
          The Gemini recurrence · Gemini rules House 3 · Information
        </p>
        <div className="mt-5 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div>
            <p className="datum text-[0.6875rem] text-bone-faint">1941–1949 · Electronic computing</p>
            <p className="inscription mt-2 text-[1.0625rem] leading-snug text-bone">
              Computation leaves the human mind.
            </p>
          </div>
          <span aria-hidden="true" className="text-bone-faint">→</span>
          <div>
            <p className="datum text-[0.6875rem] text-bone-faint">2026–2033 · AI</p>
            <p className="inscription mt-2 text-[1.0625rem] leading-snug text-bone">
              Intelligence leaves the human mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function UranusPage() {
  const [selectedEraId, setSelectedEraId] = useState<string | null>(null);
  const selectedIndex = ERAS.findIndex((era) => era.id === selectedEraId);
  const selectedEra = selectedIndex >= 0 ? ERAS[selectedIndex] : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow="Collective · Uranus"
        title="The Uranus Sequence"
        lede="Uranus marks the shock that disrupts an established domain. Each sign identifies where the disruption occurs, what assumption breaks, and the new order that forms around its failure."
      />

      <section className="mb-20">
        <SectionHeading aside="14 eras · ~99 years">
          <span className="inline-flex items-center text-[1.1875rem] tracking-[0.16em]">
            <span
              aria-hidden="true"
              className="glyph mr-3 text-[1.5rem] leading-none text-patina"
            >
              ♅
            </span>
            <span>Uranus</span>
            <span
              aria-hidden="true"
              className="mx-3 h-px w-8 bg-ember-dim"
            />
            <span className="text-ember">Shock</span>
          </span>
        </SectionHeading>
        <ShockProgression
          selectedEraId={selectedEraId}
          onSelect={setSelectedEraId}
        />
      </section>

      <div className="mt-16 grid gap-3 border-t border-rule pt-12 md:grid-cols-2">
        <Link
          href="/western/macro"
          className="inscription block border border-patina-dim px-8 py-7 text-center text-[1rem] leading-none text-patina transition-colors hover:border-patina hover:bg-patina-deep"
        >
          ← Macro Sky &amp; Cycles
        </Link>
        <Link
          href="/western/macro/pluto"
          className="inscription block border border-rule px-8 py-7 text-center text-[1rem] leading-none text-bone-soft transition-colors hover:border-patina-dim hover:bg-surface-alt hover:text-patina"
        >
          Pluto Sequence →
        </Link>
      </div>

      {selectedEra ? (
        <UranusEraDrawer
          era={selectedEra}
          color={ELEMENT_COLOR[selectedEra.element]}
          previous={selectedIndex > 0 ? ERAS[selectedIndex - 1] : null}
          next={selectedIndex < ERAS.length - 1 ? ERAS[selectedIndex + 1] : null}
          onNavigate={setSelectedEraId}
          onClose={() => setSelectedEraId(null)}
        />
      ) : null}
    </div>
  );
}
