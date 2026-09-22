"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SectionHeading } from "@/components/primitives";
import { POP_ERAS, POP_ERA_COLORS as COLORS, POP_ERA_SOUNDS as SOUNDS, peakLabel, type PopArtist } from "@/lib/industry/pop-timeline-data";

const entries = POP_ERAS.flatMap((era, eraIndex) => era.artists.map((artist) => ({
  id: `${era.decade}-${artist.name}`, artist, era, eraIndex,
})));
type Entry = (typeof entries)[number];

function Reading({ entry, onClose, onSelect }: { entry: Entry; onClose: () => void; onSelect: (entry: Entry) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const color = COLORS[entry.eraIndex];
  useEffect(() => {
    const node = dialog.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    node?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node?.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, []);

  return (
    <dialog ref={dialog} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      aria-labelledby="pop-reading-title"
      className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-dvh w-full max-w-xl border-l border-rule bg-surface p-0 text-bone backdrop:bg-black/65">
      <div className="min-h-full p-6 sm:p-10">
        <div className="flex items-center justify-between border-b border-rule pb-5">
          <p className="datum text-[0.625rem] uppercase tracking-[0.2em]" style={{ color }}>Music · {entry.era.decade}s</p>
          <button type="button" onClick={onClose} autoFocus className="datum cursor-pointer p-2 text-xs text-bone-faint hover:text-bone">Close ×</button>
        </div>
        <p className="eyebrow mt-10" style={{ color }}>The artist</p>
        <h2 id="pop-reading-title" className="mt-3 text-4xl leading-tight">{entry.artist.name}</h2>
        <p className="datum mt-4 text-xs" style={{ color }}>Peak · {peakLabel(entry.artist)}</p>
        <p className="mt-6 text-xl leading-relaxed text-bone-soft">{entry.artist.description}</p>
        <div className="mt-10 border-t border-rule pt-7">
          <p className="eyebrow" style={{ color }}>The era</p>
          <h3 className="mt-3 text-2xl leading-snug">{entry.era.title}</h3>
          <p className="mt-4 text-bone-soft">{entry.era.description}</p>
          <p className="datum mt-6 text-[0.625rem] uppercase tracking-[0.14em] text-bone-faint">The measure of success</p>
          <p className="mt-2" style={{ color }}>{entry.era.metric}</p>
        </div>
        <div className="mt-10 border-t border-rule pt-6">
          <p className="eyebrow mb-4" style={{ color }}>Also in this era</p>
          {entries.filter((item) => item.eraIndex === entry.eraIndex && item.id !== entry.id).map((item) => (
            <button type="button" key={item.id} onClick={() => onSelect(item)} className="flex w-full cursor-pointer items-baseline justify-between gap-3 border-b border-rule-faint py-3 text-left text-bone-soft hover:text-bone">
              <span>{item.artist.name}</span><span className="datum text-[0.625rem] text-bone-faint">{peakLabel(item.artist)} →</span>
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
}

export default function PopEraTable() {
  const [artistsExpanded, setArtistsExpanded] = useState(false);
  const artistsId = useId();
  const [selected, setSelected] = useState<Entry | null>(null);
  const colorFor = (index: number) => COLORS[index];
  const openArtist = (decade: number, artist: PopArtist) => setSelected(entries.find((entry) => entry.era.decade === decade && entry.artist === artist)!);
  const rowLabel = "sticky left-0 z-10 w-[110px] border-r border-rule bg-void px-3 py-4 align-middle datum text-[0.625rem] font-normal uppercase tracking-[0.08em] text-bone-faint";
  return (
    <>
      <section>
        <SectionHeading aside="7 eras · 5 artists each"><span>The eras</span><span className="mx-1 h-px w-8 self-center bg-patina-dim" /><span className="text-patina">At a glance</span></SectionHeading>
        <p className="mb-5 text-bone-soft">The sound, the artists, and the changing measure of success.</p>
        <div role="region" aria-label="Pop music era comparison" tabIndex={0} className="overflow-x-auto border-y border-rule">
          <table className="w-full min-w-[1260px] table-fixed border-separate border-spacing-0 text-center">
            <caption className="sr-only">Seven decades of pop compared by sound, popular genres, artists, and industry metrics. Genres are representative mainstream and crossover styles, not a ranking. Select an artist for their full reading.</caption>
            <thead><tr><th scope="col" className={rowLabel}>Pop culture</th>{POP_ERAS.map((era, index) => <th scope="col" key={era.decade} className="border-l border-t-[3px] border-l-rule-faint px-3 py-5 font-normal" style={{ borderTopColor: colorFor(index), backgroundColor: `${colorFor(index)}12` }}><span className="inscription text-base" style={{ color: colorFor(index) }}>{era.decade}s</span><span className="mt-2 block text-base leading-snug text-bone-soft">{SOUNDS[index]}</span></th>)}</tr></thead>
            <tbody>
              <tr><th scope="row" className={rowLabel}>Catalyst</th>{POP_ERAS.map((era, index) => <td key={era.decade} className="border-l border-t border-rule-faint px-3 py-4 text-base leading-snug" style={{ color: colorFor(index), backgroundColor: `${colorFor(index)}09` }}>{era.catalyst}</td>)}</tr>
              <tr>
                <th scope="row" className={rowLabel}>Popular genres</th>
                {POP_ERAS.map((era, index) => (
                  <td key={era.decade} className="border-l border-t border-rule-faint px-3 py-4 align-top" style={{ backgroundColor: `${colorFor(index)}09` }}>
                    <ul className="space-y-2 text-base leading-snug text-bone-soft">
                      {era.genres.map((genre) => <li key={genre}>{genre}</li>)}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className={rowLabel}>
                  <button type="button" aria-expanded={artistsExpanded}
                    aria-controls={POP_ERAS.map((era) => `${artistsId}-${era.decade}`).join(" ")}
                    onClick={() => setArtistsExpanded((expanded) => !expanded)}
                    className="w-full cursor-pointer text-patina hover:text-bone">
                    <span aria-hidden="true" className="mr-1">{artistsExpanded ? "▾" : "▸"}</span>
                    The artists
                    <span className="mt-1 block text-[0.5625rem] normal-case tracking-normal text-bone-faint">{artistsExpanded ? "Collapse" : "Expand"}</span>
                  </button>
                </th>
                {POP_ERAS.map((era, index) => (
                  <td key={era.decade} className="border-l border-t border-rule-faint px-3 py-3 align-top" style={{ backgroundColor: `${colorFor(index)}09` }}>
                    {!artistsExpanded && <span className="datum text-[0.625rem] text-bone-faint">{era.artists.length} artists</span>}
                    <ul id={`${artistsId}-${era.decade}`} hidden={!artistsExpanded}>
                      {era.artists.map((artist) => (
                        <li key={artist.name}>
                          <button type="button" onClick={() => openArtist(era.decade, artist)} aria-haspopup="dialog" className="group w-full cursor-pointer py-2 text-center">
                            <span className="block text-[1.0625rem] leading-snug text-bone-soft group-hover:text-bone">{artist.name}</span>
                            <span className="datum mt-1 block text-[0.5625rem] text-bone-faint">{peakLabel(artist)}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr><th scope="row" className={rowLabel}>Success<br />measured in</th>{POP_ERAS.map((era, index) => <td key={era.decade} className="border-l border-t border-rule-faint px-3 py-4 text-base leading-snug text-bone-soft" style={{ backgroundColor: `${colorFor(index)}09` }}>{era.metric}</td>)}</tr>
            </tbody>
          </table>
        </div>
      </section>
      {selected && <Reading entry={selected} onClose={() => setSelected(null)} onSelect={setSelected} />}
    </>
  );
}
