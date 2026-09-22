//western/macro/neptune/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { PageTitle, SectionHeading } from "@/components/primitives";
import NeptuneEraDrawer from "@/components/western/macro/neptune-era-drawer";
import MacroPlanetNav from "@/components/western/macro/macro-planet-nav";
import NeptunePiscesAries from "@/components/western/macro/neptune-pisces-aries";
import { NEPTUNE_ERAS } from "@/lib/astrology/macro/neptune-eras-data";
import type { NeptuneEraElement } from "@/lib/astrology/macro/neptune-eras-data";

const ERAS = NEPTUNE_ERAS;
type Era = (typeof ERAS)[number];

const ELEMENT_COLOR: Record<NeptuneEraElement, string> = {
  earth: "#8ebf7a",
  air: "#a8b4c0",
  water: "#7899d4",
  fire: "#e07a50",
};


// ── Sub-components ────────────────────────────────────────────────────────────

const TOTAL_START = ERAS[0].startYear;
const TOTAL_END = ERAS[ERAS.length - 1].endYear;
const TOTAL_SPAN = TOTAL_END - TOTAL_START;
const NOW = 2026; // current year for "now" marker

function eraWidthPct(index: number) {
  const era = ERAS[index];
  const boundary = ERAS[index + 1]?.startYear ?? era.endYear;
  return ((boundary - era.startYear) / TOTAL_SPAN) * 100;
}

function NeptuneTimeline({
  selectedSign,
  onSelect,
}: {
  selectedSign: string | null;
  onSelect: (sign: string) => void;
}) {
  const nowPct = ((NOW - TOTAL_START) / TOTAL_SPAN) * 100;

  return (
    <div className="mb-2">
      {/* ── "now" label sits above the bar, aligned to the marker ─────── */}
      <div className="relative mb-1 h-5 w-full">
        <span
          className="datum absolute -translate-x-1/2 text-[0.75rem] text-bone"
          style={{ left: `${nowPct}%` }}
        >
          now
        </span>
      </div>

      {/* ── Colour bar ────────────────────────────────────────────────── */}
      <div className="relative flex h-10 w-full overflow-hidden rounded-[2px]">
        {ERAS.map((era, index) => {
          const color = ELEMENT_COLOR[era.element];
          const widthPct = eraWidthPct(index);
          return (
            <button
              type="button"
              key={era.sign}
              onClick={() => onSelect(era.sign)}
              aria-label={`Open Neptune in ${era.sign}`}
              aria-pressed={selectedSign === era.sign}
              className="relative cursor-pointer transition-[filter] hover:brightness-110"
              style={{
                width: `${widthPct}%`,
                backgroundColor: color,
                opacity: era.status === "active" ? 0.95 : 0.85,
              }}
            >
              <span className="absolute right-0 top-0 h-full w-px bg-void/30" />
            </button>
          );
        })}

        {/* Now marker */}
        <div
          className="absolute top-0 h-full w-[2px] bg-bone/80"
          style={{ left: `${nowPct}%` }}
        />
      </div>

      {/* ── Year ticks ────────────────────────────────────────────────── */}
      <div className="relative mt-1.5 h-5 w-full">
        {ERAS.map((era, index) => {
          const pct = ((era.startYear - TOTAL_START) / TOTAL_SPAN) * 100;
          return (
            <span
              key={era.sign}
              className={`datum absolute text-[0.75rem] text-bone-faint ${index === 0 ? "" : "-translate-x-1/2"
                }`}
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

      {/* ── Per-segment label blocks ───────────────────────────────────── */}
      <div className="mt-6 flex w-full items-stretch">
        {ERAS.map((era, index) => {
          const color = ELEMENT_COLOR[era.element];
          const widthPct = eraWidthPct(index);
          const selected = selectedSign === era.sign;
          return (
            <button
              type="button"
              key={era.sign}
              onClick={() => onSelect(era.sign)}
              aria-pressed={selected}
              className={`grid cursor-pointer grid-rows-[4.5rem_3rem_4.5rem_minmax(4.5rem,1fr)] gap-2 px-2 py-3 text-center transition-colors hover:bg-surface-alt ${selected ? "bg-surface-alt" : ""
                }`}
              style={{
                width: `${widthPct}%`,
                borderLeft: `2px solid ${color}`,
              }}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="flex min-w-0 items-baseline justify-center gap-1.5">
                  <span className="glyph text-[1.125rem] leading-none" style={{ color }}>
                    {era.glyph}
                  </span>
                  <span className="inscription text-[0.9375rem] tracking-[0.03em] text-bone">
                    {era.sign}
                  </span>
                </span>
                <span className="text-[0.6875rem] italic leading-none text-bone-faint">
                  rules House {era.house}
                </span>
                <span className="datum text-[0.6875rem] leading-snug text-bone-faint">
                  {era.years}
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
                  Collective ideal
                </span>
                {era.ideal}
              </span>
              <span className="flex flex-col items-center justify-start gap-1 break-words border-t border-rule-faint pt-2.5 text-[0.9375rem] leading-snug text-bone-soft">
                <span className="datum text-[0.5625rem] uppercase tracking-[0.12em] text-bone-faint/60">
                  Archetype
                </span>
                {era.archetype}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function IdealProgression({
  selectedSign,
  onSelect,
}: {
  selectedSign: string | null;
  onSelect: (sign: string) => void;
}) {
  return (
    <div className="mb-12">
      <p className="mx-auto mb-8 max-w-3xl text-center text-[1.25rem] italic leading-relaxed text-bone-soft">
        What does society increasingly believe in, desire, or mythologize?
      </p>

      <div className="-mx-2 overflow-x-auto px-2 pb-3">
        <div className="min-w-[980px]">
          <NeptuneTimeline selectedSign={selectedSign} onSelect={onSelect} />
        </div>
      </div>
      <p className="datum mt-3 text-center text-[0.6875rem] uppercase tracking-[0.16em] text-bone-faint">
        Select an era to open its full reading
      </p>
    </div>
  );
}


// ── Page ─────────────────────────────────────────────────────────────────────

export default function NeptunePage() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const selectedIndex = ERAS.findIndex((era) => era.sign === selectedSign);
  const selectedEra: Era | null =
    selectedIndex >= 0 ? ERAS[selectedIndex] : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <MacroPlanetNav />
      <div className="-mt-8">
        <PageTitle
          eyebrow="Collective · Neptune"
          title="The Neptune Sequence"
          lede="Neptune represents idealization. Each sign names a canonical domain; each era shows how society dreams about, desires, and mythologizes that domain as a collective ideal."
        />
      </div>

      {/* ── The primary instrument: progression + era index ──────────────── */}
      <section className="mb-20">
        <SectionHeading aside="7 eras · ~97 years">
          <span className="inline-flex items-center text-[1.1875rem] tracking-[0.16em]">
            <span
              aria-hidden="true"
              className="glyph mr-3 text-[1.5rem] leading-none text-patina"
            >
              ♆
            </span>
            <span>Neptune</span>
            <span
              aria-hidden="true"
              className="mx-3 h-px w-8 bg-patina-dim"
            />
            <span className="text-patina">Idealization</span>
          </span>
        </SectionHeading>
        <IdealProgression
          selectedSign={selectedSign}
          onSelect={setSelectedSign}
        />
      </section>

      {/* ── Pisces → Aries Transition ────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeading aside="2026 transition">
          <span className="inline-flex items-center text-[1.1875rem] tracking-[0.16em]">
            <span
              aria-hidden="true"
              className="glyph mr-2 text-[1.25rem] leading-none"
              style={{ color: "#7899d4" }}
            >
              ♓
            </span>
            <span>Pisces</span>
            <span aria-hidden="true" className="mx-3 h-px w-8 bg-patina-dim" />
            <span
              className="glyph mr-2 text-[1.25rem] leading-none"
              style={{ color: "#e07a50" }}
            >
              ♈
            </span>
            <span className="text-patina">Aries</span>
          </span>
        </SectionHeading>
        <NeptunePiscesAries />
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="mt-16 grid gap-3 border-t border-rule pt-12 md:grid-cols-2">
        <Link
          href="/western/macro"
          className="inscription block border border-patina-dim px-8 py-7 text-center text-[1rem] leading-none text-patina transition-colors hover:border-patina hover:bg-patina-deep"
        >
          ← Macro Sky &amp; Cycles
        </Link>
        <Link
          href="/western/macro/uranus"
          className="inscription block border border-rule px-8 py-7 text-center text-[1rem] leading-none text-bone-soft transition-colors hover:border-patina-dim hover:bg-surface-alt hover:text-patina"
        >
          Uranus Sequence →
        </Link>
      </div>

      {selectedEra ? (
        <NeptuneEraDrawer
          era={selectedEra}
          color={ELEMENT_COLOR[selectedEra.element]}
          previous={selectedIndex > 0 ? ERAS[selectedIndex - 1] : null}
          next={selectedIndex < ERAS.length - 1 ? ERAS[selectedIndex + 1] : null}
          onNavigate={setSelectedSign}
          onClose={() => setSelectedSign(null)}
        />
      ) : null}
    </div>
  );
}
