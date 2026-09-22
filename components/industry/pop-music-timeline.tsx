"use client";

import { useCallback, useRef, useState } from "react";
import { SectionHeading } from "@/components/primitives";
import MusicEraDrawer from "@/components/industry/music-era-drawer";
import UranusEraDrawer from "@/components/industry/uranus-era-drawer";
import MusicTechnologyRow from "@/components/industry/music-technology-row";
import type { MusicTechnology } from "@/lib/industry/music-technologies-data";
import PlutoEraDrawer from "@/components/industry/pluto-era-drawer";
import { POP_ERAS, POP_ERA_COLORS, POP_ERA_SOUNDS, peakLabel } from "@/lib/industry/pop-timeline-data";
import { POP_TIMELINE_CYCLES, type PopCyclePlanet, type PopCycleSegment } from "@/lib/industry/pop-timeline-cycles";
import { MUSIC_ERAS } from "@/lib/industry/music-eras-data";
import { URANUS_MUSIC_ERAS } from "@/lib/industry/uranus-music-eras-data";
import { PLUTO_MUSIC_ERAS } from "@/lib/industry/pluto-music-eras-data";

const START = 1960;
const END = 2030;
const pct = (year: number) => ((Math.min(END, Math.max(START, year)) - START) / (END - START)) * 100;
type Preview = { kind: "decade"; index: number } | { kind: "cycle"; segment: PopCycleSegment } | { kind: "technology"; technology: MusicTechnology };

// Use the incoming era's start as the visual boundary. Preserve the source
// dates for readings and shade their overlap as an approximate transition,
// not as a precise retrograde interval.
const lanes = POP_TIMELINE_CYCLES.map((lane) => {
  const segments = lane.segments.map((segment, index) => ({
    ...segment,
    displayEndYear: Math.min(segment.endYear, lane.segments[index + 1]?.startYear ?? segment.endYear),
    transitionEndYear: Math.min(segment.endYear, lane.segments[index - 1]?.endYear ?? segment.startYear),
  })).filter((segment) => segment.startYear < END && segment.displayEndYear > START);
  return { ...lane, segments };
});

export default function PopMusicTimeline() {
  const [visible, setVisible] = useState<Record<PopCyclePlanet, boolean>>({ Pluto: true, Uranus: true, Neptune: true });
  const [hovered, setHovered] = useState<Preview | null>(null);
  const [pinnedDecade, setPinnedDecade] = useState<number | null>(null);
  const [pinnedTechnology, setPinnedTechnology] = useState<MusicTechnology | null>(null);
  const [showTechnology, setShowTechnology] = useState(true);
  const [selected, setSelected] = useState<PopCycleSegment | null>(null);
  const [tipX, setTipX] = useState(0);
  const [tipY, setTipY] = useState(0);
  const [plotWidth, setPlotWidth] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const plot = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setPlotWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const preview: Preview | null = hovered ?? (pinnedTechnology ? { kind: "technology", technology: pinnedTechnology } : pinnedDecade === null ? null : { kind: "decade", index: pinnedDecade });
  const previewTechnology = preview?.kind === "technology" ? preview.technology : null;
  const previewEra = preview?.kind === "decade" ? POP_ERAS[preview.index] : null;
  const previewSegment = preview?.kind === "cycle" ? preview.segment : null;
  const transition = previewSegment
    ? lanes.flatMap((lane) => lane.segments).find((segment) => segment.id === previewSegment.id && segment.transitionEndYear > segment.startYear)
    : null;
  const previewColor = preview?.kind === "decade" ? POP_ERA_COLORS[preview.index] : previewSegment?.color;
  const showPreview = (value: Preview, target: HTMLElement) => {
    const bounds = frame.current?.getBoundingClientRect();
    const item = target.getBoundingClientRect();
    if (bounds) {
      setTipX(item.left + item.width / 2 - bounds.left);
      setTipY(item.bottom - bounds.top);
    }
    setHovered(value);
  };
  const navigate = (planet: PopCyclePlanet, sign: string) => {
    setSelected(POP_TIMELINE_CYCLES.find((lane) => lane.planet === planet)?.segments.find((segment) => segment.sign === sign) ?? null);
  };
  const closeReading = () => { setSelected(null); setHovered(null); };
  const neptuneIndex = selected?.planet === "Neptune" ? MUSIC_ERAS.findIndex((era) => era.sign === selected.sign) : -1;
  const uranus = selected?.planet === "Uranus" ? URANUS_MUSIC_ERAS.find((era) => era.sign === selected.sign) : null;
  const pluto = selected?.planet === "Pluto" ? PLUTO_MUSIC_ERAS.find((era) => era.sign === selected.sign) : null;

  return (
    <section className="mb-16">
      <SectionHeading aside="1960–2030 · seven decades">
        <span>Pop music</span><span className="mx-1 h-px w-8 self-center bg-patina-dim" /><span className="text-patina">One axis</span>
      </SectionHeading>
      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-rule-faint py-3" role="group" aria-label="Visible timeline rows">
        <span className="datum text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">Show rows</span>
        {lanes.map((lane) => (
          <button key={lane.planet} type="button" aria-pressed={visible[lane.planet]} aria-controls={`pop-cycle-${lane.planet}`} onClick={() => {
            setVisible((current) => ({ ...current, [lane.planet]: !current[lane.planet] }));
            setHovered(null);
          }} className={`flex cursor-pointer items-center gap-2 py-1 text-base transition-colors ${visible[lane.planet] ? "text-bone" : "text-bone-faint"}`}>
            <span aria-hidden="true" className={`flex h-3 w-3 items-center justify-center border text-[9px] leading-none ${visible[lane.planet] ? "border-patina bg-patina-deep text-patina" : "border-rule"}`}>{visible[lane.planet] ? "✓" : ""}</span>
            <span className="glyph text-patina" aria-hidden="true">{lane.glyph}</span>{lane.planet}
          </button>
        ))}
        <button type="button" aria-pressed={showTechnology} aria-controls="pop-technology-row" onClick={() => {
          setShowTechnology((current) => !current);
          setPinnedTechnology(null);
          setHovered(null);
        }} className={`flex cursor-pointer items-center gap-2 py-1 text-base ${showTechnology ? "text-bone" : "text-bone-faint"}`}>
          <span aria-hidden="true" className={`flex h-3 w-3 items-center justify-center border text-[9px] leading-none ${showTechnology ? "border-patina bg-patina-deep text-patina" : "border-rule"}`}>{showTechnology ? "✓" : ""}</span>
          Tech influences
        </button>
      </div>
      <p id="pop-axis-hint" className="datum mb-4 text-[0.625rem] text-bone-faint">Hover or tap decades and technologies for details · click a planetary era for the reading</p>
      <div ref={frame} className="relative" onKeyDown={(event) => { if (event.key === "Escape") { setPinnedDecade(null); setPinnedTechnology(null); setHovered(null); } }}>
        <div role="region" aria-label="Pop decades and planetary cycles, 1960 to 2030" aria-describedby="pop-axis-hint" tabIndex={0} className="overflow-x-auto pb-2" onMouseLeave={() => setHovered(null)} onScroll={() => { setHovered(null); setPinnedDecade(null); setPinnedTechnology(null); }}>
          <div className="min-w-[960px] pr-1">
            <div className="ml-[88px] relative h-6" aria-hidden="true">
              {[...POP_ERAS.map((era) => era.decade), END].map((year) => <span key={year} className={`datum absolute bottom-0 flex flex-col text-[0.625rem] leading-none text-bone-faint ${year === END ? "-translate-x-full items-end" : ""}`} style={{ left: `${pct(year)}%` }}>{year}<span className="mt-1 h-1 w-px bg-rule" /></span>)}
            </div>
            <div className="flex items-center">
              <span className="datum w-[88px] shrink-0 text-[0.625rem] uppercase tracking-[0.12em] text-bone-faint">Pop decades</span>
              <div ref={plot} className="grid flex-1 grid-cols-7 gap-px">
                {POP_ERAS.map((era, index) => (
                  <button key={era.decade} type="button" aria-label={`${era.decade}s: ${POP_ERA_SOUNDS[index]}. Show milestone artists.`} aria-pressed={pinnedDecade === index}
                    aria-describedby={preview?.kind === "decade" && preview.index === index ? "pop-timeline-tooltip" : undefined}
                    onMouseEnter={(event) => showPreview({ kind: "decade", index }, event.currentTarget)} onFocus={(event) => showPreview({ kind: "decade", index }, event.currentTarget)} onBlur={() => setHovered(null)}
                    onClick={(event) => {
                      showPreview({ kind: "decade", index }, event.currentTarget);
                      setPinnedTechnology(null);
                      setPinnedDecade(pinnedDecade === index ? null : index);
                      if (pinnedDecade === index) setHovered(null);
                    }}
                    className="min-h-[74px] cursor-pointer border-t-[3px] px-2 py-3 text-center focus-visible:outline-offset-[-3px]"
                    style={{ borderColor: POP_ERA_COLORS[index], backgroundColor: `${POP_ERA_COLORS[index]}${preview?.kind === "decade" && preview.index === index ? "30" : "15"}` }}>
                    <span className="inscription block text-[0.6875rem] tracking-[0.1em]" style={{ color: POP_ERA_COLORS[index] }}>{era.decade}s</span>
                    <span className="mt-1 block text-[0.9375rem] leading-snug text-bone-soft">{POP_ERA_SOUNDS[index]}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-5">
              <div id="pop-technology-row" hidden={!showTechnology}>
                <MusicTechnologyRow active={previewTechnology} pinned={pinnedTechnology}
                  onPreview={(technology, target) => showPreview({ kind: "technology", technology }, target)}
                  onLeave={() => setHovered(null)}
                  onSelect={(technology, target) => {
                    showPreview({ kind: "technology", technology }, target);
                    setPinnedDecade(null);
                    setPinnedTechnology(pinnedTechnology?.name === technology.name ? null : technology);
                    if (pinnedTechnology?.name === technology.name) setHovered(null);
                  }} />
              </div>
              {lanes.map((lane) => (
                <div id={`pop-cycle-${lane.planet}`} key={lane.planet} hidden={!visible[lane.planet]}>
                  <div className="flex items-center">
                    <span className="flex w-[88px] shrink-0 flex-col gap-2"><span className="glyph text-base text-patina" aria-hidden="true">{lane.glyph}</span><span className="datum text-[0.625rem] text-bone-soft">{lane.planet}</span></span>
                    <div className="relative h-14 flex-1 border-b border-rule-faint">
                      {POP_ERAS.map((era) => <span key={era.decade} aria-hidden="true" className="pointer-events-none absolute inset-y-0 border-l border-rule-faint" style={{ left: `${pct(era.decade)}%` }} />)}
                      {/* Only where a lane is read less far back than the axis runs — which is no
                          longer Neptune, now that its first era opens before 1960. */}
                      {lane.segments[0] && lane.segments[0].startYear > START && <span className="datum absolute top-5 text-[0.5625rem] text-bone-faint" style={{ left: "1%" }}>No era data</span>}
                      {lane.segments.map((segment) => {
                        const width = pct(segment.displayEndYear) - pct(segment.startYear);
                        const pixels = width / 100 * plotWidth;
                        const named = pixels > segment.sign.length * 7 + 24;
                        const focused = previewSegment?.id === segment.id;
                        const overlaps = previewEra === null || (segment.startYear < previewEra.decade + 10 && segment.displayEndYear > previewEra.decade);
                        return (
                          <button key={segment.id} type="button" onClick={() => { setPinnedDecade(null); setPinnedTechnology(null); setHovered(null); setSelected(segment); }}
                            onMouseEnter={(event) => showPreview({ kind: "cycle", segment }, event.currentTarget)} onFocus={(event) => showPreview({ kind: "cycle", segment }, event.currentTarget)} onBlur={() => setHovered(null)}
                            aria-label={`${lane.planet} in ${segment.sign}, ${segment.startYear}–${segment.endYear}. ${segment.headline}. Open the reading.`} aria-haspopup="dialog" aria-expanded={selected?.id === segment.id}
                            aria-describedby={focused ? "pop-timeline-tooltip" : undefined}
                            className={`absolute h-[50px] cursor-pointer overflow-hidden border-t-[3px] px-0.5 text-center transition-opacity focus-visible:outline-offset-[-3px] ${segment.speculative ? "border-t-dashed" : ""}`}
                            style={{ left: `${pct(segment.startYear)}%`, width: `${width}%`, top: 0, borderTopColor: segment.color, opacity: overlaps ? 1 : 0.35 }}>
                            <span aria-hidden="true" className="absolute inset-0 border-r border-void/70" style={{ backgroundColor: segment.color, opacity: focused ? 0.3 : 0.12 }} />
                            <span className="relative flex h-full flex-col items-center justify-center gap-1 leading-none">
                              <span className="flex items-center gap-1" style={{ color: segment.color }}><span className="glyph text-base" aria-hidden="true">{segment.glyph}</span>{named && <span className="inscription text-[0.625rem] tracking-[0.06em]">{segment.sign}</span>}</span>
                              {segment.shortLabel ? (
                                <span className={`whitespace-nowrap text-bone-soft ${pixels < 75 ? "text-[0.75rem]" : "text-[0.875rem]"}`}>{segment.shortLabel}</span>
                              ) : pixels > segment.headline.length * 7 + 12 && <span className="text-[0.875rem] text-bone-soft">{segment.headline}</span>}
                            </span>
                          </button>
                        );
                      })}
                      {lane.segments.filter((segment) => segment.transitionEndYear > segment.startYear).map((segment) => (
                        <span key={`transition-${segment.id}`} aria-hidden="true"
                          className="pointer-events-none absolute top-0 h-[50px] border-x border-bone-soft/30"
                          style={{
                            left: `${pct(segment.startYear)}%`,
                            width: `${pct(segment.transitionEndYear) - pct(segment.startYear)}%`,
                            background: "repeating-linear-gradient(135deg, transparent 0 3px, rgb(184 192 207 / 25%) 3px 5px)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="datum ml-[88px] mt-1 text-[0.5625rem] text-bone-faint">{lane.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {preview && !selected && (
          <div id="pop-timeline-tooltip" role="tooltip" className="pointer-events-none absolute z-30 w-[23rem] max-w-full -translate-x-1/2 border border-rule bg-surface-alt px-5 py-4"
            style={{ top: tipY + 8, left: `clamp(min(11.5rem, 50%), ${tipX}px, max(50%, calc(100% - 11.5rem)))` }}>
            {previewTechnology ? <>
              <p className="datum text-[0.625rem] uppercase tracking-[0.16em] text-patina">Tech influence · {previewTechnology.era}</p>
              <p className="mt-2 text-lg leading-snug text-bone">{previewTechnology.name}</p>
              <p className="mt-2 text-base leading-snug text-bone-soft">{previewTechnology.disruption}</p>
              {previewTechnology.emerging && <p className="datum mt-3 text-[0.5625rem] uppercase text-ember">Emerging technology</p>}
            </> : previewEra ? <>
              <p className="datum text-[0.625rem] uppercase tracking-[0.16em]" style={{ color: previewColor }}>{previewEra.decade}s · Milestone artists</p>
              <p className="mt-2 text-lg leading-snug text-bone">{previewEra.title}</p>
              <ul className="mt-3 space-y-2">{previewEra.artists.map((artist) => <li key={artist.name} className="flex items-baseline justify-between gap-3"><span className="text-base leading-snug text-bone-soft">{artist.name}</span><span className="datum shrink-0 text-[0.5625rem] text-bone-faint">{peakLabel(artist)}</span></li>)}</ul>
            </> : previewSegment && <>
              <p className="flex items-baseline justify-between gap-3"><span className="datum text-[0.625rem] uppercase tracking-[0.12em]" style={{ color: previewColor }}>{previewSegment.planet} in {previewSegment.sign}</span><span className="datum text-[0.625rem] text-bone-faint">{previewSegment.startYear}–{previewSegment.endYear}</span></p>
              <p className="mt-3 text-lg leading-snug" style={{ color: previewColor }}>{previewSegment.headline}</p>
              <p className="mt-2 text-base leading-snug text-bone-soft">{previewSegment.note}</p>
              {transition && <p className="mt-3 border-t border-rule pt-3 text-sm leading-snug text-bone-faint">Shaded transition: {transition.startYear}–{transition.transitionEndYear}. Approximate retrograde re-entry window from the rounded era dates.</p>}
              <p className="datum mt-3 text-[0.5625rem] uppercase tracking-[0.12em] text-bone-faint">Click to open the reading</p>
            </>}
          </div>
        )}
      </div>
      <p className="datum mt-4 text-[0.625rem] leading-relaxed text-bone-faint">All lanes share the same year scale; longer cycles continue beyond the view. Dashed tops mark open or speculative readings.{visible.Pluto ? " Hatched shading marks approximate retrograde transitions from rounded era dates, not exact retrograde durations." : ""}</p>
      {neptuneIndex >= 0 && <MusicEraDrawer era={MUSIC_ERAS[neptuneIndex]} previous={MUSIC_ERAS[neptuneIndex - 1] ?? null} next={MUSIC_ERAS[neptuneIndex + 1] ?? null} onNavigate={(sign) => navigate("Neptune", sign)} onClose={closeReading} />}
      {uranus && <UranusEraDrawer era={uranus} onNavigate={(sign) => navigate("Uranus", sign)} onClose={closeReading} />}
      {pluto && <PlutoEraDrawer era={pluto} onNavigate={(sign) => navigate("Pluto", sign)} onClose={closeReading} />}
    </section>
  );
}
