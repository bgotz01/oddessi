//components/industry/markets-timeline.tsx
"use client";

import { useRef, useState } from "react";
import { SectionHeading } from "@/components/primitives";
import { MARKETS_CYCLES, MARKETS_CYCLE_LENGTH, MARKETS_DECADES, halfLabel, type MarketsHalfDecade } from "@/lib/industry/markets-timeline-data";
import { MARKETS_NEPTUNE_ERAS } from "@/lib/industry/markets-neptune-eras-data";
import { MARKETS_URANUS_ERAS } from "@/lib/industry/markets-uranus-eras-data";
import { MARKETS_PLUTO_ERAS } from "@/lib/industry/markets-pluto-eras-data";
import MarketsNeptuneDrawer from "@/components/industry/markets-neptune-drawer";
import MarketsUranusDrawer from "@/components/industry/markets-uranus-drawer";
import MarketsPlutoDrawer from "@/components/industry/markets-pluto-drawer";

const START = MARKETS_DECADES[0].decade;
const END = MARKETS_DECADES[MARKETS_DECADES.length - 1].decade + 10;
const pct = (year: number) => ((Math.min(END, Math.max(START, year)) - START) / (END - START)) * 100;

// 12-year cycles, an alternative axis to the decades. Each cycle takes the
// color of the decade it starts in.
const CYCLES = MARKETS_CYCLES.map((cycle) => {
  const decade = MARKETS_DECADES.find((item) => cycle.start >= item.decade && cycle.start < item.decade + 10) ?? MARKETS_DECADES[MARKETS_DECADES.length - 1];
  return { ...cycle, end: cycle.start + MARKETS_CYCLE_LENGTH, color: decade.color };
});

type Axis = "decades" | "halves" | "cycle";
const AXES: { value: Axis; label: string }[] = [
  { value: "decades", label: "Decades" },
  { value: "halves", label: "Half-decades" },
  { value: "cycle", label: "12-year cycle" },
];

type Planet = "Neptune" | "Uranus" | "Pluto";
type Segment = { sign: string; symbol: string; startYear: number; endYear: number; color: string; headline: string; note: string; speculative: boolean };

// Each lane reuses its planet page's data; clicking a segment opens that page's drawer.
const LANES: { planet: Planet; glyph: string; role: string; segments: Segment[] }[] = [
  {
    planet: "Neptune", glyph: "♆", role: "The narrative capital believes in",
    segments: MARKETS_NEPTUNE_ERAS.map((era) => ({ ...era, note: era.narrative, speculative: !!era.hypothesis })),
  },
  {
    planet: "Uranus", glyph: "♅", role: "What gets disrupted",
    segments: MARKETS_URANUS_ERAS.map((era) => ({ ...era, note: era.disruption, speculative: !!era.hypothesis })),
  },
  {
    planet: "Pluto", glyph: "♇", role: "Where capital power comes from",
    segments: MARKETS_PLUTO_ERAS.map((era) => ({ ...era, note: era.archetype, speculative: !!era.hypothesis })),
  },
];

type Cell = { key: string; label: string; short: string; start: number; end: number; color: string; decadeIndex: number; half?: MarketsHalfDecade };
type Preview = { kind: "cell"; cell: Cell } | { kind: "segment"; planet: Planet; index: number };

const DECADE_CELLS: Cell[] = MARKETS_DECADES.map((decade, decadeIndex) => ({
  key: `${decade.decade}`, label: `${decade.decade}s`, short: decade.title,
  start: decade.decade, end: decade.decade + 10, color: decade.color, decadeIndex,
}));
const HALF_CELLS: Cell[] = MARKETS_DECADES.flatMap((decade, decadeIndex) => decade.halves.map((half) => ({
  key: `${half.start}`, label: halfLabel(half), short: half.short,
  start: half.start, end: half.start + 5, color: decade.color, decadeIndex, half,
})));

export default function MarketsTimeline() {
  const [axis, setAxis] = useState<Axis>("decades");
  const halves = axis === "halves";
  const cycle = axis === "cycle";
  const [visible, setVisible] = useState<Record<Planet, boolean>>({ Neptune: true, Uranus: true, Pluto: true });
  const [hovered, setHovered] = useState<Preview | null>(null);
  const [pinned, setPinned] = useState<Cell | null>(null);
  const [selected, setSelected] = useState<{ planet: Planet; index: number } | null>(null);
  const [tip, setTip] = useState({ x: 0, y: 0 });
  const frame = useRef<HTMLDivElement>(null);
  const cells = halves ? HALF_CELLS : DECADE_CELLS;
  const TICKS = cycle ? CYCLES.map((item) => item.start) : MARKETS_DECADES.map((decade) => decade.decade);

  const preview: Preview | null = hovered ?? (pinned ? { kind: "cell", cell: pinned } : null);
  const previewCell = preview?.kind === "cell" ? preview.cell : null;
  const previewSegment = preview?.kind === "segment" ? LANES.find((lane) => lane.planet === preview.planet)!.segments[preview.index] : null;

  const showPreview = (value: Preview, target: HTMLElement) => {
    const bounds = frame.current?.getBoundingClientRect();
    const item = target.getBoundingClientRect();
    if (bounds) setTip({ x: item.left + item.width / 2 - bounds.left, y: item.bottom - bounds.top });
    setHovered(value);
  };
  const closeReading = () => { setSelected(null); setHovered(null); };

  return (
    <section className="mb-16">
      <SectionHeading aside={`${START}–${END} · ${MARKETS_DECADES.length} decades`}>
        <span>Markets</span><span className="mx-1 h-px w-8 self-center bg-patina-dim" /><span className="text-patina">One axis</span>
      </SectionHeading>

      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-rule-faint py-3">
        <div role="group" aria-label="Timeline axis" className="flex items-center gap-1">
          {AXES.map(({ value, label }) => (
            <button key={value} type="button" aria-pressed={axis === value} onClick={() => { setAxis(value); setPinned(null); setHovered(null); }}
              className={`datum cursor-pointer border px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.12em] transition-colors ${axis === value ? "border-patina bg-patina-deep text-patina" : "border-rule text-bone-faint hover:text-bone"}`}>
              {label}
            </button>
          ))}
        </div>
        <span className="h-4 w-px bg-rule" aria-hidden="true" />
        <div role="group" aria-label="Visible timeline rows" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="datum text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">Show rows</span>
          {LANES.map((lane) => (
            <button key={lane.planet} type="button" aria-pressed={visible[lane.planet]} aria-controls={`markets-cycle-${lane.planet}`}
              onClick={() => { setVisible((current) => ({ ...current, [lane.planet]: !current[lane.planet] })); setHovered(null); }}
              className={`flex cursor-pointer items-center gap-2 py-1 text-base transition-colors ${visible[lane.planet] ? "text-bone" : "text-bone-faint"}`}>
              <span aria-hidden="true" className={`flex h-3 w-3 items-center justify-center border text-[9px] leading-none ${visible[lane.planet] ? "border-patina bg-patina-deep text-patina" : "border-rule"}`}>{visible[lane.planet] ? "✓" : ""}</span>
              <span className="glyph text-patina" aria-hidden="true">{lane.glyph}</span>{lane.planet}
            </button>
          ))}
        </div>
      </div>
      <ul aria-label="Legend" className="mb-3 flex flex-wrap gap-x-6 gap-y-1">
        {LANES.map((lane) => (
          <li key={lane.planet} className="text-sm text-bone-soft">
            <span className="glyph mr-1.5 text-patina" aria-hidden="true">{lane.glyph}</span>{lane.planet}<span className="text-bone-faint"> — {lane.role}</span>
          </li>
        ))}
      </ul>

      <div ref={frame} className="relative" onKeyDown={(event) => { if (event.key === "Escape") { setPinned(null); setHovered(null); } }}>
        <div role="region" aria-label={`Investment themes and planetary cycles, ${START} to ${END}`} tabIndex={0}
          className="overflow-x-auto pb-2" onMouseLeave={() => setHovered(null)} onScroll={() => { setHovered(null); setPinned(null); }}>
          <div className={`${halves ? "min-w-[980px]" : "min-w-[900px]"} pr-1`}>
            <div className="relative ml-[88px] h-6" aria-hidden="true">
              {[...TICKS, END].map((year) => (
                <span key={year} className={`datum absolute bottom-0 flex flex-col text-[0.625rem] leading-none text-bone-faint ${year === END ? "-translate-x-full items-end" : ""}`} style={{ left: `${pct(year)}%` }}>
                  {year}<span className="mt-1 h-1 w-px bg-rule" />
                </span>
              ))}
            </div>

            {cycle ? (
              <div className="flex items-center">
                <span className="datum w-[88px] shrink-0 text-[0.625rem] uppercase tracking-[0.12em] text-bone-faint">12-year cycle</span>
                <div role="list" aria-label={`12-year cycles from ${CYCLES[0].start}`} className="flex min-h-[74px] flex-1">
                  {CYCLES.map((item, index) => (
                    <div key={item.start} role="listitem" className={`shrink-0 border-t-[3px] border-r border-r-void px-1.5 py-3 text-center ${item.speculative ? "border-dashed" : ""}`}
                      style={{ marginLeft: index === 0 ? `${pct(item.start)}%` : undefined, width: `${pct(item.end) - pct(item.start)}%`, borderTopColor: item.color, backgroundColor: `${item.color}15` }}>
                      <span className="inscription block text-[0.6875rem] tracking-[0.1em]" style={{ color: item.color }}>{item.start}–{item.end}{item.end > END ? " →" : ""}</span>
                      <span className="mt-1 block text-[0.9375rem] leading-snug text-bone-soft">{item.title}</span>
                      {item.detail && <span className="mt-0.5 block text-[0.8125rem] leading-snug text-bone-faint">{item.detail}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
            <div className="flex items-center">
              <span className="datum w-[88px] shrink-0 text-[0.625rem] uppercase tracking-[0.12em] text-bone-faint">Market leadership</span>
              <div className="grid flex-1 gap-px" style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}>
                {cells.map((cell) => {
                  const active = previewCell?.key === cell.key;
                  const open = cell.half?.speculative;
                  return (
                    <button key={cell.key} type="button" aria-pressed={pinned?.key === cell.key}
                      aria-label={`${cell.label}: ${cell.short} (show leaders and laggards)`}
                      aria-describedby={active ? "markets-timeline-tooltip" : undefined}
                      onMouseEnter={(event) => showPreview({ kind: "cell", cell }, event.currentTarget)}
                      onFocus={(event) => showPreview({ kind: "cell", cell }, event.currentTarget)}
                      onBlur={() => setHovered(null)}
                      onClick={(event) => {
                        showPreview({ kind: "cell", cell }, event.currentTarget);
                        setPinned(pinned?.key === cell.key ? null : cell);
                        if (pinned?.key === cell.key) setHovered(null);
                      }}
                      className={`min-h-[74px] cursor-pointer border-t-[3px] px-1.5 py-3 text-center focus-visible:outline-offset-[-3px] ${open ? "border-dashed" : ""}`}
                      style={{ borderTopColor: cell.color, backgroundColor: `${cell.color}${active ? "30" : "15"}` }}>
                      <span className="inscription block text-[0.6875rem] tracking-[0.1em]" style={{ color: cell.color }}>{cell.label}</span>
                      <span className={`mt-1 block leading-snug text-bone-soft ${halves ? "text-[0.8125rem]" : "text-[0.9375rem]"}`}>{cell.short}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            )}

            <div className="mt-6 space-y-5">
              {LANES.map((lane) => (
                <div id={`markets-cycle-${lane.planet}`} key={lane.planet} hidden={!visible[lane.planet]}>
                  <div className="flex items-center">
                    <span className="flex w-[88px] shrink-0 flex-col gap-2"><span className="glyph text-base text-patina" aria-hidden="true">{lane.glyph}</span><span className="datum text-[0.625rem] text-bone-soft">{lane.planet}</span></span>
                    <div className="relative h-14 flex-1 border-b border-rule-faint">
                      {TICKS.map((year) => <span key={year} aria-hidden="true" className="pointer-events-none absolute inset-y-0 border-l border-rule-faint" style={{ left: `${pct(year)}%` }} />)}
                      {lane.segments[0] && lane.segments[0].startYear > START && <span className="datum absolute top-5 text-[0.5625rem] text-bone-faint" style={{ left: "1%" }}>No era data</span>}
                      {lane.segments.map((segment, index) => {
                        if (segment.startYear >= END || segment.endYear <= START) return null;
                        const width = pct(segment.endYear) - pct(segment.startYear);
                        const focused = previewSegment === segment;
                        const overlaps = !previewCell || (segment.startYear < previewCell.end && segment.endYear > previewCell.start);
                        return (
                          <button key={segment.sign} type="button"
                            onClick={() => { setPinned(null); setHovered(null); setSelected({ planet: lane.planet, index }); }}
                            onMouseEnter={(event) => showPreview({ kind: "segment", planet: lane.planet, index }, event.currentTarget)}
                            onFocus={(event) => showPreview({ kind: "segment", planet: lane.planet, index }, event.currentTarget)}
                            onBlur={() => setHovered(null)}
                            aria-label={`${lane.planet} in ${segment.sign}, ${segment.startYear}–${segment.endYear}. ${segment.headline}. Open the reading.`}
                            aria-haspopup="dialog"
                            aria-describedby={focused ? "markets-timeline-tooltip" : undefined}
                            className={`absolute h-[50px] cursor-pointer overflow-hidden border-t-[3px] px-1 text-center transition-opacity focus-visible:outline-offset-[-3px] ${segment.speculative ? "border-dashed" : ""}`}
                            style={{ left: `${pct(segment.startYear)}%`, width: `${width}%`, top: 0, borderTopColor: segment.color, opacity: overlaps ? 1 : 0.35 }}>
                            <span aria-hidden="true" className="absolute inset-0 border-r border-void/70" style={{ backgroundColor: segment.color, opacity: focused ? 0.3 : 0.12 }} />
                            <span className="relative flex h-full flex-col items-center justify-center gap-1 leading-none">
                              <span className="flex items-center gap-1" style={{ color: segment.color }}>
                                <span className="glyph text-base" aria-hidden="true">{segment.symbol}</span>
                                <span className="inscription truncate text-[0.625rem] tracking-[0.06em]">{segment.sign}</span>
                              </span>
                              <span className="block w-full truncate text-[0.8125rem] text-bone-soft">{segment.headline}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <p className="datum ml-[88px] mt-1 text-[0.5625rem] text-bone-faint">{lane.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {preview && !selected && (
          <div id="markets-timeline-tooltip" role="tooltip" className="pointer-events-none absolute z-30 w-[23rem] max-w-full -translate-x-1/2 border border-rule bg-surface-alt px-5 py-4"
            style={{ top: tip.y + 8, left: `clamp(min(11.5rem, 50%), ${tip.x}px, max(50%, calc(100% - 11.5rem)))` }}>
            {previewCell ? (
              previewCell.half ? <HalfPreview half={previewCell.half} color={previewCell.color} /> : (
                <>
                  <p className="datum text-[0.625rem] uppercase tracking-[0.16em]" style={{ color: previewCell.color }}>{previewCell.label}</p>
                  <p className="mt-2 text-lg leading-snug text-bone">{previewCell.short}</p>
                  <ul className="mt-3 space-y-3">
                    {MARKETS_DECADES[previewCell.decadeIndex].halves.map((half) => (
                      <li key={half.start}>
                        <p className="flex items-baseline justify-between gap-3"><span className="text-base leading-snug text-bone-soft">{half.short}</span><span className="datum shrink-0 text-[0.5625rem] text-bone-faint">{halfLabel(half)}</span></p>
                        <p className="mt-0.5 text-sm leading-snug text-bone-faint">{half.leaders.slice(0, 3).join(" · ")}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )
            ) : previewSegment && preview?.kind === "segment" && (
              <>
                <p className="flex items-baseline justify-between gap-3"><span className="datum text-[0.625rem] uppercase tracking-[0.12em]" style={{ color: previewSegment.color }}>{preview.planet} in {previewSegment.sign}</span><span className="datum text-[0.625rem] text-bone-faint">{previewSegment.startYear}–{previewSegment.endYear}</span></p>
                <p className="mt-3 text-lg leading-snug" style={{ color: previewSegment.color }}>{previewSegment.headline}</p>
                <p className="mt-2 text-base leading-snug text-bone-soft">{previewSegment.note}</p>
                {previewSegment.speculative && <p className="datum mt-3 text-[0.5625rem] uppercase text-ember">Hypothesis</p>}
                <p className="datum mt-3 text-[0.5625rem] uppercase tracking-[0.12em] text-bone-faint">Click to open the reading</p>
              </>
            )}
          </div>
        )}
      </div>

      {selected?.planet === "Neptune" && <MarketsNeptuneDrawer index={selected.index} onNavigate={(index) => setSelected({ planet: "Neptune", index })} onClose={closeReading} />}
      {selected?.planet === "Uranus" && <MarketsUranusDrawer index={selected.index} onNavigate={(index) => setSelected({ planet: "Uranus", index })} onClose={closeReading} />}
      {selected?.planet === "Pluto" && <MarketsPlutoDrawer index={selected.index} onNavigate={(index) => setSelected({ planet: "Pluto", index })} onClose={closeReading} />}
    </section>
  );
}

function HalfPreview({ half, color }: { half: MarketsHalfDecade; color: string }) {
  return (
    <>
      <p className="datum text-[0.625rem] uppercase tracking-[0.16em]" style={{ color }}>{halfLabel(half)}{half.speculative ? " · In progress" : ""}</p>
      <p className="mt-2 text-lg leading-snug text-bone">{half.short}</p>
      <p className="mt-1 text-sm leading-snug text-bone-faint">{half.theme}</p>
      <p className="datum mt-3 text-[0.5625rem] uppercase tracking-[0.14em] text-bone-faint">Led</p>
      <ul className="mt-1 space-y-0.5 text-base leading-snug text-bone-soft">{half.leaders.map((item) => <li key={item}>{item}</li>)}</ul>
      <p className="datum mt-3 text-[0.5625rem] uppercase tracking-[0.14em] text-bone-faint">Lagged</p>
      <ul className="mt-1 space-y-0.5 text-base leading-snug text-bone-faint">{half.lagged.map((item) => <li key={item}>{item}</li>)}</ul>
      <p className="mt-3 border-t border-rule pt-2 text-sm leading-snug" style={{ color }}>{half.event}</p>
    </>
  );
}
