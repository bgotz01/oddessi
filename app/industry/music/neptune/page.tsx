// app/industry/music/neptune/page.tsx
"use client";

import { useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import { MUSIC_ERAS } from "@/lib/industry/music-eras-data";
import NeptuneEraTable from "@/components/industry/neptune-era-table";
import MusicEraDrawer from "@/components/industry/music-era-drawer";
import MusicNeptuneTimeline from "@/components/industry/music-neptune-timeline";

export default function MusicNeptunePage() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);

  const selectedIndex = MUSIC_ERAS.findIndex((e) => e.sign === selectedSign);
  const selectedEra = selectedIndex >= 0 ? MUSIC_ERAS[selectedIndex] : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <div className="pt-12">
        <PageTitle
          eyebrow="Industry · Music · Neptune"
          title="Neptune Eras in Music"
          lede="What music sounds like, means, and culturally represents"
        />
      </div>

      <section className="mb-20">
        <SectionHeading aside={`${MUSIC_ERAS.length} eras · ~14 years each`}>
          <span className="inline-flex items-center text-[1.1875rem] tracking-[0.16em]">
            <span aria-hidden="true" className="glyph mr-3 text-[1.5rem] leading-none text-patina">
              ♆
            </span>
            <span>Neptune</span>
            <span aria-hidden="true" className="mx-3 h-px w-8 bg-patina-dim" />
            <span className="text-patina">Cultural Ideal</span>
          </span>
        </SectionHeading>

        <p className="mb-5 text-bone-soft">What does music culture idealize?</p>
        <NeptuneEraTable selectedSign={selectedSign} onSelect={setSelectedSign} />
      </section>

      <section className="mb-20">
        <SectionHeading aside="Defining sounds, with pop alongside">
          <span className="inline-flex items-center text-[1.1875rem] tracking-[0.16em]">
            <span aria-hidden="true" className="glyph mr-3 text-[1.5rem] leading-none text-patina">
              ♆
            </span>
            <span>Neptune</span>
            <span aria-hidden="true" className="mx-3 h-px w-8 bg-patina-dim" />
            <span className="text-patina">Artists by Phase</span>
          </span>
        </SectionHeading>

        <p className="mb-5 text-bone-soft">Who embodied the ideal as it opened, turned, and wore out?</p>
        <MusicNeptuneTimeline selectedSign={selectedSign} onSelect={setSelectedSign} />
      </section>

      {selectedEra && (
        <MusicEraDrawer
          era={selectedEra}
          previous={selectedIndex > 0 ? MUSIC_ERAS[selectedIndex - 1] : null}
          next={
            selectedIndex < MUSIC_ERAS.length - 1
              ? MUSIC_ERAS[selectedIndex + 1]
              : null
          }
          onNavigate={setSelectedSign}
          onClose={() => setSelectedSign(null)}
        />
      )}
    </div>
  );
}
