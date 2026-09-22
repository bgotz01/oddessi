//western/macro/uranus/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { PageTitle, SectionHeading } from "@/components/primitives";
import UranusEraDrawer from "@/components/western/macro/uranus-era-drawer";
import MacroPlanetNav from "@/components/western/macro/macro-planet-nav";
import UranusSociety from "@/components/western/macro/uranus-society";
import UranusTech from "@/components/western/macro/uranus-tech";
import { URANUS_FRAMEWORK, NEPTUNE_FRAMEWORK, PLUTO_FRAMEWORK } from "@/lib/astrology/macro/zodiac-framework-data";
import { URANUS_ERAS } from "@/lib/astrology/macro/uranus-eras-data";
import type { UranusEraElement } from "@/lib/astrology/macro/uranus-eras-data";

const ERAS = URANUS_ERAS;

const ELEMENT_COLOR: Record<UranusEraElement, string> = {
  earth: "#8ebf7a",
  air: "#a8b4c0",
  water: "#7899d4",
  fire: "#e07a50",
};

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
          <UranusSociety selectedEraId={selectedEraId} onSelect={onSelect} />
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
      <MacroPlanetNav />
      <div className="-mt-8">
        <PageTitle
          eyebrow="Collective · Uranus"
          title="The Uranus Sequence"
          lede=""
        />
      </div>

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

      <section className="mb-20">
        <SectionHeading aside="9 eras · 1968 – 2033">
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
            <span className="text-ember">Tech Disruption</span>
          </span>
        </SectionHeading>
        <UranusTech />
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
