// app/industry/music/cycle/page.tsx
"use client";

import { useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import MusicDualCycle from "@/components/industry/music-dual-cycle";
import NeptuneEraTable from "@/components/industry/neptune-era-table";
import UranusEraTable from "@/components/industry/uranus-era-table";
import MusicEraDrawer from "@/components/industry/music-era-drawer";
import UranusEraDrawer from "@/components/industry/uranus-era-drawer";
import { MUSIC_ERAS } from "@/lib/industry/music-eras-data";
import { URANUS_MUSIC_ERAS } from "@/lib/industry/uranus-music-eras-data";
import { concurrentWith, musicCycleSegment } from "@/lib/industry/music-cycles";

/**
 * The two music clocks read against each other.
 *
 * The Neptune and Uranus pages each hold one clock and are the place to read
 * it: five and eleven eras, in full, with the evidence under each. What
 * neither can say is how they run together, because a page with one clock on
 * it has no second hand to compare against.
 *
 * So this page carries exactly one thing the others do not — the axis — and
 * sends every reading back to the drawers those pages already use. Selection
 * is one id across both lanes rather than a sign per planet: Capricorn is an
 * era on both clocks, and a page that tracked a bare sign would open the wrong
 * drawer for half of them.
 */
export default function MusicCyclesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId ? musicCycleSegment(selectedId) : null;
  const concurrent = selected ? concurrentWith(selected) : [];

  const neptuneIndex = selected?.planet === "Neptune"
    ? MUSIC_ERAS.findIndex((era) => era.sign === selected.sign)
    : -1;
  const neptuneEra = neptuneIndex >= 0 ? MUSIC_ERAS[neptuneIndex] : null;

  const uranusEra = selected?.planet === "Uranus"
    ? (URANUS_MUSIC_ERAS.find((era) => era.sign === selected.sign) ?? null)
    : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <div className="pt-12">
        <PageTitle
          eyebrow="Industry · Music · Both clocks"
          title="The Ideal and the Break"
          lede="Neptune says what music culture wants; Uranus says what breaks the machinery it wanted it on. Drawn on one axis the two stop being separate readings: each ideal spans about two disruptions, and between 1981 and 2003 both planets hold the same sign at once."
        />
      </div>

      <section className="mb-20">
        <SectionHeading aside="1956–2040 · one Uranus return">
          <span className="inline-flex items-center text-[1.1875rem] tracking-[0.16em]">
            <span aria-hidden="true" className="glyph mr-3 text-[1.5rem] leading-none text-patina">
              ♆♅
            </span>
            <span>Two Clocks</span>
            <span aria-hidden="true" className="mx-3 h-px w-8 bg-patina-dim" />
            <span className="text-patina">One Axis</span>
          </span>
        </SectionHeading>

        <MusicDualCycle selectedId={selectedId} onSelect={setSelectedId} />
      </section>

      {/*
        The same two readings the single-planet pages carry, under the axis
        that relates them — and driven by the SAME selection, so a column here
        and a bar above open one drawer rather than two. The chart says when;
        the tables say what, at a length no bar can hold.
      */}
      <section className="mb-20">
        <SectionHeading aside="5 eras · ~14 years each">
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
        <NeptuneEraTable
          selectedSign={selected?.planet === "Neptune" ? selected.sign : null}
          onSelect={(sign) => setSelectedId(`neptune-${sign}`)}
        />
      </section>

      <UranusEraTable
        selectedSign={selected?.planet === "Uranus" ? selected.sign : null}
        onSelect={(sign) => setSelectedId(`uranus-${sign}`)}
      />

      {neptuneEra && (
        <MusicEraDrawer
          era={neptuneEra}
          previous={neptuneIndex > 0 ? MUSIC_ERAS[neptuneIndex - 1] : null}
          next={
            neptuneIndex < MUSIC_ERAS.length - 1
              ? MUSIC_ERAS[neptuneIndex + 1]
              : null
          }
          concurrent={concurrent}
          onNavigate={(sign) => setSelectedId(`neptune-${sign}`)}
          onSelectSegment={setSelectedId}
          onClose={() => setSelectedId(null)}
        />
      )}

      {uranusEra && (
        <UranusEraDrawer
          era={uranusEra}
          concurrent={concurrent}
          onNavigate={(sign) => setSelectedId(`uranus-${sign}`)}
          onSelectSegment={setSelectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
