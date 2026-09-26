//western/macro/neptune/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { PageTitle, SectionHeading } from "@/components/primitives";
import NeptuneEraDrawer from "@/components/western/macro/neptune-era-drawer";
import MacroPlanetNav from "@/components/western/macro/macro-planet-nav";
import NeptunePiscesAries from "@/components/western/macro/neptune-pisces-aries";
import { NEPTUNE_ERAS } from "@/lib/astrology/macro/neptune-eras-data";
import type { NeptuneEra, NeptuneEraElement } from "@/lib/astrology/macro/neptune-eras-data";

const ERAS: readonly NeptuneEra[] = NEPTUNE_ERAS;
type Era = NeptuneEra;

const ELEMENT_COLOR: Record<NeptuneEraElement, string> = {
  earth: "#8ebf7a",
  air: "#a8b4c0",
  water: "#7899d4",
  fire: "#e07a50",
};


// ── Sub-components ────────────────────────────────────────────────────────────

// Same comparative matrix as the markets Neptune timeline: row labels once on
// the left, eras as columns sized by their length, rows aligned by subgrid.

function NeptuneTimeline({
  selectedSign,
  onSelect,
}: {
  selectedSign: string | null;
  onSelect: (sign: string) => void;
}) {
  // The arc rows (opening, inflection, disillusionment) collapse together.
  const [arcOpen, setArcOpen] = useState(true);
  const [manifestationsOpen, setManifestationsOpen] = useState(false);
  // header, dream, archetype, arc heading, [opening, inflection, disillusionment], manifestations
  const rows = arcOpen ? 8 : 5;
  return (
    <div
      className="grid min-w-[1010px]"
      style={{
        gridTemplateColumns: `128px ${ERAS.map((era) => `${era.endYear - era.startYear}fr`).join(" ")}`,
        gridTemplateRows: `repeat(${rows}, auto)`,
      }}
    >
      {/* Row labels, once for all eras */}
      <div className="sticky left-0 z-10 grid grid-rows-subgrid border-r border-rule bg-void" style={{ gridRow: `span ${rows}` }}>
        <span />
        <span className="border-t border-rule px-3 py-3 text-left"><span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">The dream</span></span>
        <span className="border-t border-rule px-3 py-3 text-left"><span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">Archetype</span></span>
        {/* The arc is one group: its heading toggles its three stages */}
        <button type="button" aria-expanded={arcOpen} onClick={() => setArcOpen((open) => !open)}
          className="border-t border-rule px-3 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-patina">
          <span className="datum block text-[0.625rem] uppercase tracking-widest cursor-pointer text-patina hover:text-bone">The arc <span aria-hidden="true" className="ml-1">{arcOpen ? "▾" : "▸"}</span></span>
        </button>
        {arcOpen && (
          <>
        <span className="border-t border-rule-faint py-2.5 pl-6 pr-3 text-left"><span className="datum block text-[0.5625rem] uppercase tracking-widest text-bone-faint">Opening</span></span>
        <span className="border-t border-rule-faint py-2.5 pl-6 pr-3 text-left"><span className="datum block text-[0.5625rem] uppercase tracking-widest text-bone-faint">Inflection</span></span>
        <span className="border-t border-dashed border-rule py-3 pl-6 pr-3 text-left"><span className="datum block text-[0.5625rem] uppercase tracking-widest text-bone-faint">Disillusionment</span></span>
          </>
        )}
        <button type="button" aria-expanded={manifestationsOpen} onClick={() => setManifestationsOpen((open) => !open)}
          className="self-start border-t border-rule px-3 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-patina">
          <span className="datum block cursor-pointer text-[0.625rem] uppercase tracking-widest text-patina hover:text-bone">
            <span aria-hidden="true" className="mr-1">{manifestationsOpen ? "▾" : "▸"}</span>Manifestations
          </span>
        </button>
      </div>
      {ERAS.map((era) => {
        const color = ELEMENT_COLOR[era.element];
        const active = selectedSign === era.sign;
        return (
          <div
            key={era.sign}
            className="grid min-w-0 grid-rows-subgrid border-r border-rule text-center transition-colors last:border-r-0"
            style={{ gridRow: `span ${rows}`, backgroundColor: `${color}${active ? "20" : "08"}` }}
          >
            {/* Only the header opens the reading */}
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={active}
              aria-label={`Neptune in ${era.sign}, ${era.years}: ${era.ideal}. Open the reading.`}
              onClick={() => onSelect(era.sign)}
              className="group flex cursor-pointer flex-col justify-start pb-3 transition-colors hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-patina"
            >
              {/* Solid for the dream, hatched after the inflection */}
              <span className="mb-3 flex h-2 transition-[filter] group-hover:brightness-125" title={era.inflection ? `Inflection ${era.inflection.date}: ${era.inflection.label}` : undefined}>
                <span style={{ backgroundColor: color, flex: (era.inflection?.year ?? era.endYear) - era.startYear }} />
                {era.inflection && <span style={{ flex: era.endYear - era.inflection.year, background: `repeating-linear-gradient(135deg, ${color} 0 3px, ${color}55 3px 6px)` }} />}
              </span>
              <span className="datum block text-[0.625rem] uppercase tracking-widest text-bone"><span className="glyph mr-1.5 text-base normal-case" style={{ color }} aria-hidden="true">{era.glyph}</span>{era.sign}</span>
              <span className="datum mt-1 block text-[0.625rem] text-bone-faint">{era.startYear}–{era.endYear}</span>
              <span className="datum block text-[0.625rem] uppercase tracking-widest mt-1.5 px-3" style={{ color }}>{era.domain}</span>
            </button>
            <span className="block border-t border-rule px-3 py-3">
              <span className="block text-lg font-semibold leading-tight" style={{ color }}>{era.ideal}</span>
            </span>
            <span className="block border-t border-rule px-3 py-3 text-sm leading-snug text-bone-soft">{era.archetype}</span>
            <span aria-hidden="true" className="border-t border-rule" />
            {arcOpen && (
              <>
            <span className="block border-t border-rule px-3 py-2.5">
              <span className="datum block text-[0.625rem] uppercase tracking-widest" style={{ color }}>{era.trigger.date}</span>
              <span className="mt-0.5 block text-sm leading-snug text-bone">{era.trigger.label}</span>
            </span>
            <span className="block border-t border-rule px-3 py-2.5">
              {era.inflection && <span className="datum block text-[0.625rem] uppercase tracking-widest" style={{ color }}>{era.inflection.date}</span>}
              <span className={`mt-0.5 block text-sm leading-snug ${era.inflection ? "text-bone" : "italic text-bone-faint"}`}>{era.inflection?.label ?? "Not yet"}</span>
            </span>
            <span className="block border-t border-dashed border-rule px-3 py-3">
              <span className={`block text-[0.9375rem] leading-snug ${era.disillusionment ? "font-semibold text-bone" : "italic text-bone-faint"}`}>{era.disillusionment ?? "Not yet identified"}</span>
            </span>
              </>
            )}
            <span className="block self-start border-t border-rule px-3 py-3">
              {era.manifestations.length === 0
                ? <span className="block text-sm italic text-bone-faint">Not yet</span>
                : manifestationsOpen
                  ? era.manifestations.map((item) => (
                      <span key={item} className="block text-sm leading-snug text-bone-soft [&:not(:first-child)]:mt-1">{item}</span>
                    ))
                  : <span className="datum block text-[0.625rem] uppercase tracking-widest text-bone-faint">{era.manifestations.length} examples</span>}
            </span>
          </div>
        );
      })}
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
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[1.0625rem] italic text-bone-soft">What does society increasingly believe in, desire, or mythologize?</p>
        <span className="datum text-xs text-bone-faint">{ERAS[0].startYear}–{ERAS[ERAS.length - 1].endYear} · {ERAS.length} eras · Select an era to read it</span>
      </div>
      <div role="region" aria-label="Explore the Neptune eras" tabIndex={0} className="overflow-x-auto pb-3">
        <NeptuneTimeline selectedSign={selectedSign} onSelect={onSelect} />
      </div>
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
          lede="Neptune represents the collective dream. Each sign names a canonical domain; each era shows how society dreams about, desires, and mythologizes that domain as a collective ideal."
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
            <span className="text-patina">Dream</span>
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
