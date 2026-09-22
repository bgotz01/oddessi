//components/industry/pluto-era-table.tsx
"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/primitives";
import { ELEMENT_COLOR, signMeta } from "@/lib/symbols";
import {
  PLUTO_MUSIC_ERAS,
  plutoEraLabel,
  plutoEraState,
  type PlutoEra,
} from "@/lib/industry/pluto-music-eras-data";
import { eraStatus, type EraStatus } from "@/lib/industry/era-years";
import { useReadingYear } from "@/lib/industry/use-reading-year";
import PlutoEraDrawer from "@/components/industry/pluto-era-drawer";

/**
 * Controlled when a caller passes `onSelect`, and self-contained otherwise —
 * the same contract the Uranus grid has, so a future combined chart can drive
 * this lane without the component changing.
 *
 * A grid rather than a comparison table, for the reason the Uranus grid is one:
 * a table wide enough to hold every era puts most of them off-screen, and the
 * page is read era after era rather than dimension across. The seven dimensions
 * live in the drawer, where a definition list can give each one a full line.
 */
export default function PlutoEraTable({
  selectedSign: controlledSign,
  onSelect,
}: {
  selectedSign?: string | null;
  onSelect?: (sign: string) => void;
} = {}) {
  const [ownSign, setOwnSign] = useState<string | null>(null);
  const selectedSign = onSelect ? (controlledSign ?? null) : ownSign;
  const select = onSelect ?? setOwnSign;
  // The caller that drives the selection also draws the drawer.
  const selectedEra = onSelect
    ? undefined
    : PLUTO_MUSIC_ERAS.find((era) => era.sign === selectedSign);

  const year = useReadingYear();

  return (
    <section className="mb-20">
      <SectionHeading aside={`${PLUTO_MUSIC_ERAS.length} eras · Pluto`}>
        <span className="glyph text-patina" aria-hidden="true">♇</span> Pluto Eras
      </SectionHeading>
      <p className="mb-2 text-bone-soft">
        Where does structural power concentrate in the music industry?
      </p>
      <p className="mb-6 max-w-2xl text-[0.9375rem] leading-relaxed text-bone-faint">
        Found by naming the bottleneck: the scarce function no one could route
        around, and the position holding it.
      </p>

      <ul className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3 lg:grid-cols-3 xl:grid-cols-4">
        {PLUTO_MUSIC_ERAS.map((era) => (
          <EraCard
            key={era.sign}
            era={era}
            status={year === null ? null : eraStatus(era.dates, year)}
            selected={selectedSign === era.sign}
            onSelect={() => select(era.sign)}
          />
        ))}
      </ul>

      {selectedEra && (
        <PlutoEraDrawer
          era={selectedEra}
          onNavigate={setOwnSign}
          onClose={() => setOwnSign(null)}
        />
      )}
    </section>
  );
}

/**
 * Which shared row each part of a card sits on.
 *
 * The cards are subgrids of the era grid, so every card's holder, artists and
 * confidence line up with its neighbours' no matter how differently the text
 * above them wraps. Rows are assigned explicitly rather than by auto-placement
 * because most cards are missing something — Aquarius has no verb, no holder
 * and no acts — and auto-placement would pull everything below the gap up a
 * row, which is the misalignment this exists to prevent.
 */
const ROW = {
  sign: 1,
  dates: 2,
  rule: 3,
  verb: 4,
  model: 5,
  leverage: 6,
  artistsRule: 7,
  artists: 8,
  state: 9,
} as const;

const ROW_COUNT = 9;

function EraCard({
  era,
  status,
  selected,
  onSelect,
}: {
  era: PlutoEra;
  status: EraStatus | null;
  selected: boolean;
  onSelect: () => void;
}) {
  const meta = signMeta(era.sign);
  const color = meta ? ELEMENT_COLOR[meta.element] : "var(--color-patina)";
  const state = plutoEraState(era);

  return (
    <li className="sm:grid sm:grid-rows-subgrid" style={{ gridRow: `span ${ROW_COUNT}` }}>
      <button
        type="button"
        onClick={onSelect}
        aria-haspopup="dialog"
        aria-expanded={selected}
        aria-label={`Explore Pluto in ${era.sign}, ${era.dates}${status === "active" ? ", the era running now" : ""}`}
        className="group flex h-full w-full cursor-pointer flex-col items-center gap-3 border sm:grid sm:grid-rows-subgrid sm:justify-items-center border-rule-faint border-t-[3px] px-5 pt-5 pb-5 text-center transition-colors hover:border-rule focus-visible:outline-offset-[-3px]"
        style={{
          gridRow: `span ${ROW_COUNT}`,
          borderTopColor: color,
          backgroundColor: `${color}${selected ? "1A" : "08"}`,
        }}
      >
        <span className="text-[1.1875rem] leading-none" style={{ gridRow: ROW.sign, color }}>
          <span className="glyph" aria-hidden="true">{era.symbol}</span> {era.sign}
        </span>

        <span className="datum text-[0.75rem] text-bone-faint" style={{ gridRow: ROW.dates }}>
          {era.dates}
          {status === "active" && <span style={{ color }}> · Now</span>}
        </span>

        <span
          className="h-px w-8 self-center"
          style={{ gridRow: ROW.rule, backgroundColor: `${color}55` }}
          aria-hidden="true"
        />

        {/* One word, read down the grid: distribute, develop, concentrate,
            manufacture, platform. The structural sequence, before any of the
            market names that used to stand in for it. */}
        {era.verb && (
          <span
            className="datum text-[0.625rem] uppercase tracking-[0.18em]"
            style={{ gridRow: ROW.verb, color }}
          >
            {era.verb}
          </span>
        )}

        <span
          className="text-[1.3125rem] leading-tight font-semibold text-balance text-bone"
          style={{ gridRow: ROW.model }}
        >
          {era.model ?? (
            <span className="font-normal italic text-bone-faint">To be identified</span>
          )}
        </span>

        {/* The answer to the question the section asks. It was cut in an
            earlier pass on the grounds that the model implies it — but only
            loosely: "mass distribution" could be held by radio or by
            retailers, and which one it is IS the claim. */}
        {era.holder && (
          <span className="flex flex-col items-center gap-1" style={{ gridRow: ROW.leverage }}>
            <span className="datum text-[0.5625rem] uppercase tracking-[0.14em] text-bone-faint">
              Leverage
            </span>
            <span className="text-[1rem] leading-snug text-bone-soft">{era.holder}</span>
          </span>
        )}

        {/* The acts, on the card rather than in the drawer: an era is quicker
            to place by who was in it than by what it is called. */}
        {era.artists.length > 0 && (
          <>
            <span
              className="h-px w-8 self-end"
              style={{ gridRow: ROW.artistsRule, backgroundColor: `${color}55` }}
              aria-hidden="true"
            />
            <span
              className="text-[0.9375rem] leading-relaxed text-bone-soft"
              style={{ gridRow: ROW.artists }}
            >
              {era.artists.map((artist) => artist.name).join(" · ")}
            </span>
          </>
        )}

        <span
          className="datum self-end text-[0.625rem] uppercase leading-relaxed tracking-[0.12em]"
          style={{ gridRow: ROW.state, color: state === "tested" ? color : "var(--color-bone-faint)" }}
        >
          {plutoEraLabel(era)}
        </span>

      </button>
    </li>
  );
}
