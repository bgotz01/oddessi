//components/industry/music-neptune-timeline.tsx
"use client";

import { useState } from "react";
import { MUSIC_ERAS } from "@/lib/industry/music-eras-data";
import {
  NEPTUNE_PHASES,
  NEPTUNE_PHASE_MUSIC,
  neptunePhaseSpans,
  type NeptuneArtist,
} from "@/lib/industry/music-neptune-artists-data";

const yearRange = (start: number, end: number) =>
  start === end ? `${start}` : `${start}–${Math.floor(start / 100) === Math.floor(end / 100) ? String(end).slice(2) : end}`;

// The latest era with a record to read; the running one has no artists yet.
const DEFAULT_SIGN = MUSIC_ERAS.filter((era) => era.status !== "upcoming").at(-1)?.sign ?? MUSIC_ERAS[0].sign;

// Stacked on a phone, each phase's genres sit directly above its pop.
const STACK_ORDER = {
  early: ["order-1", "order-2"],
  inflection: ["order-3", "order-4"],
  late: ["order-5", "order-6"],
} as const;

const rowLabel = "datum text-[0.625rem] uppercase tracking-widest text-bone-faint";

/** One Neptune era at a time, split into its three phases. */
export default function MusicNeptuneTimeline({ selectedSign, onSelect }: {
  selectedSign: string | null;
  onSelect: (sign: string) => void;
}) {
  const [sign, setSign] = useState(DEFAULT_SIGN);
  const era = MUSIC_ERAS.find((item) => item.sign === sign) ?? MUSIC_ERAS[0];
  const spans = neptunePhaseSpans(era);
  const music = NEPTUNE_PHASE_MUSIC[era.sign];

  return (
    <div>
      <div role="tablist" aria-label="Neptune era" className="mb-6 flex flex-wrap gap-2">
        {MUSIC_ERAS.map((item) => {
          const active = item.sign === sign;
          return (
            <button
              key={item.sign}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="neptune-phases"
              onClick={() => setSign(item.sign)}
              className={`cursor-pointer border border-b-[3px] px-3 py-2 text-left transition-colors ${active ? "border-rule" : "border-rule-faint hover:border-rule"}`}
              style={{ borderBottomColor: item.color, backgroundColor: `${item.color}${active ? "20" : "08"}` }}
            >
              <span className="flex items-center gap-1.5 text-[0.9375rem]" style={{ color: item.color }}>
                <span className="glyph" aria-hidden="true">{item.symbol}</span>
                {item.sign}
              </span>
              <span className="datum mt-0.5 block text-[0.625rem] text-bone-faint">{item.dates}</span>
            </button>
          );
        })}
      </div>

      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <p className="text-bone-soft">
          <span className="font-semibold" style={{ color: era.color }}>{era.archetype}</span>
          <span className="mx-2 text-bone-faint" aria-hidden="true">·</span>
          {era.comparison.expression}
        </p>
        <button
          type="button"
          onClick={() => onSelect(era.sign)}
          aria-haspopup="dialog"
          aria-expanded={selectedSign === era.sign}
          className="datum cursor-pointer text-[0.6875rem] uppercase tracking-[0.16em] text-bone-faint transition-colors hover:text-bone"
        >
          Read the {era.sign} era →
        </button>
      </div>

      <div
        id="neptune-phases"
        role="tabpanel"
        aria-label={`Neptune in ${era.sign}, ${era.dates}, by phase`}
        className="grid border-y border-rule sm:grid-cols-[110px_repeat(3,1fr)]"
      >
        {/* Row labels, from sm up */}
        <span className="hidden sm:block" />
        {NEPTUNE_PHASES.map(({ key, label }) => (
          <div
            key={key}
            className="hidden border-l border-rule px-4 py-3 text-center sm:block"
            style={{ backgroundColor: `${era.color}${key === "inflection" ? "18" : "0B"}` }}
          >
            <span className="datum block text-[0.6875rem] uppercase tracking-widest" style={{ color: era.color }}>{label}</span>
            <span className="datum mt-0.5 block text-[0.625rem] text-bone-faint">{yearRange(spans[key].start, spans[key].end - 1)}</span>
          </div>
        ))}

        <span className={`hidden border-t border-rule px-3 py-3 sm:block ${rowLabel}`}>Defining sound</span>
        {NEPTUNE_PHASES.map(({ key, label }) => (
          <div key={key} className={`${STACK_ORDER[key][0]} border-t border-rule px-4 py-3 sm:order-none sm:border-l sm:text-center`}>
            {/* On a phone each phase stacks, so it carries its own heading */}
            <span className="datum mb-2 block text-[0.6875rem] uppercase tracking-widest sm:hidden" style={{ color: era.color }}>
              {label} · {yearRange(spans[key].start, spans[key].end - 1)}
            </span>
            {music[key].genres.length > 0 ? (
              <div className="space-y-4">
                {music[key].genres.map((genre) => (
                  <div key={genre.name}>
                    <span className="inline-block border px-2 py-0.5 text-[0.8125rem] font-semibold" style={{ borderColor: `${era.color}77`, color: era.color }}>
                      {genre.name}
                    </span>
                    <ArtistList artists={genre.artists} />
                  </div>
                ))}
              </div>
            ) : (
              <span className="block text-sm italic text-bone-faint">Not yet</span>
            )}
          </div>
        ))}

        <span className={`hidden border-t border-rule px-3 py-3 sm:block ${rowLabel}`}>General pop</span>
        {NEPTUNE_PHASES.map(({ key }) => (
          <div key={key} className={`${STACK_ORDER[key][1]} border-t border-rule-faint px-4 py-3 sm:order-none sm:border-l sm:border-rule sm:text-center`}>
            <span className={`mb-1 block sm:hidden ${rowLabel}`}>General pop</span>
            {music[key].pop.length > 0 ? (
              <ArtistList artists={music[key].pop} />
            ) : (
              <span className="block text-sm italic text-bone-faint">Not yet</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtistList({ artists }: { artists: NeptuneArtist[] }) {
  return (
    <ul className="mt-2 space-y-1">
      {artists.map((artist) => (
        <li key={artist.name} className="text-[0.9375rem] leading-snug text-bone-soft">
          {artist.name}
          <span className="datum ml-1.5 whitespace-nowrap text-[0.625rem] text-bone-faint">{yearRange(artist.peak[0], artist.peak[1])}</span>
        </li>
      ))}
    </ul>
  );
}
