// components/industry/music-dual-cycle.tsx
"use client";

import { useCallback, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  MUSIC_CYCLE_END,
  MUSIC_CYCLE_LANES,
  MUSIC_CYCLE_RESONANCES,
  MUSIC_CYCLE_START,
  concurrentWith,
  fractionalYear,
  musicCycleSegment,
  pctOfYear,
  type MusicCycleLane,
  type MusicCycleSegment,
} from "@/lib/industry/music-cycles";

/**
 * Both music clocks on one axis.
 *
 * The two comparison tables each give their planet equal columns, which is the
 * right chart for reading one era against the next and the wrong one for
 * reading a Neptune era against a Uranus era: equal columns throw away the
 * duration, and the duration is the entire relationship between these two.
 * Drawn to real years instead, the ratio becomes visible without being stated
 * — one ideal spans roughly two disruptions — and the three windows where both
 * planets hold the same sign line up under each other.
 *
 * Pointing at an era is the second half of it. A bar can show that two spans
 * overlap; only the highlight can say WHICH ones, so hovering a Neptune era
 * lights the Uranus eras inside it and drops everything else back. That is why
 * the readout opens BELOW the axis rather than over the bars: a tooltip in the
 * usual place would cover the other lane, which is the one thing the reader
 * hovered in order to see.
 *
 * `now` is drawn in `signal`, the reader's own place in time, and nothing else
 * on the chart uses it.
 */

/** The lane rows, and the gutter between them that the brackets live in. */
const LANE_HEIGHT: Record<string, number> = { Neptune: 58, Uranus: 42 };
const GUTTER = 26;

/**
 * How wide each sign name sets, in the strip's own face.
 *
 * Measured off the rendered strip, not estimated from the character count.
 * The long-cycle strip gets away with a per-character constant because its
 * labels are body-face words; these are tracked-out Cinzel caps, where
 * "Capricorn" and "Sagittarius" come out 78 and 85 despite two characters
 * between them. A constant generous enough for Capricorn hides Sagittarius at
 * widths it fits in, and one tight enough for Sagittarius clipped Capricorn to
 * "CAPRICOR" — the failure that is not allowed, because a name half set is
 * worse than a glyph: the reader cannot tell it is missing something.
 *
 * Twelve fixed strings at one fixed size. Re-measure if the type changes.
 */
const NAME_WIDTH: Record<string, number> = {
  Aries: 37, Taurus: 50, Gemini: 49, Cancer: 60, Leo: 25, Virgo: 43,
  Libra: 38, Scorpio: 58, Sagittarius: 85, Capricorn: 78, Aquarius: 67, Pisces: 43,
};

/** The glyph, the gap after it, and the box's own padding. */
const NAME_FURNITURE = 29;

/**
 * The headline, which IS a per-character estimate.
 *
 * It is set in the body face, where the ratio holds across everything from
 * "The Tribes" to "Festival culture / mass gatherings", and its strings are
 * editorial rather than a closed vocabulary — a measured table of them would
 * go stale the first time an era is rewritten. Generous by design: too high
 * drops a headline that would have fitted, and the headline is in the readout
 * either way.
 */
const HEADLINE_PX_PER_CHAR = 7.5;
const HEADLINE_FURNITURE = 10;
/** Below this the bracket carries a hairline only; its glyph would not clear the rules. */
const BRACKET_GLYPH_PX = 40;

/**
 * The reading's clock, taken once when the bundle loads.
 *
 * Read during render it would be one value on the server and another in the
 * browser, and the whole `now` rule is positioned off it. Taken in an effect
 * instead it costs a second render pass on every mount for a number that
 * changes the chart by a fraction of a pixel a day. A constant plus a null
 * server snapshot gets the hydration-safe behaviour for free: React renders
 * the chart with no reader position, then swaps the position in once it is
 * the browser's to give. Year-granular data on an 84-year axis does not care
 * that the constant is the page load rather than this instant.
 */
const CLIENT_NOW = Date.now();
const SERVER_NOW = () => null;
const CLIENT_SNAPSHOT = () => CLIENT_NOW;
/** Nothing to subscribe to: the value is fixed for the life of the page. */
const NEVER_CHANGES = () => () => {};

/** The height of one row of dates: the tick, its gap, and the figures. */
const AXIS_ROW = 20;

/**
 * Where a lane's eras begin and end, in its own years.
 *
 * Each lane prints its own, against its own bar, rather than the two sharing
 * one row. A single row would have to carry the union — seventeen figures, two
 * of them a year apart in 1969 and 1970 — which at this width sets them eight
 * pixels from each other and leaves the reader to work out which clock each
 * one belongs to. Split, the only collisions possible are within a lane, and
 * the closest of those is Uranus's six years: about fifty pixels at the
 * narrowest the chart is drawn, against a four-figure label of twenty-eight.
 */
function boundariesOf(lane: MusicCycleLane): number[] {
  return [
    ...lane.segments.map((segment) => segment.startYear),
    lane.segments[lane.segments.length - 1].endYear,
  ];
}

/**
 * One lane's dates, above its bar or below it.
 *
 * Above for the top lane and below for the bottom one, so each row sits
 * against the bar it describes and neither interrupts the plot — which is what
 * lets the `now` rule run unbroken from the top of one bar to the bottom of
 * the other.
 */
function AxisRow({ years, place }: { years: number[]; place: "above" | "below" }) {
  return (
    <div className="relative" style={{ height: AXIS_ROW }}>
      {years.map((year) => {
        const pct = pctOfYear(year);
        // A label centred on the first or last boundary hangs off the plot.
        // Aligned to the edge instead, the tick still lands on the year.
        const edge = pct <= 0 ? "start" : pct >= 100 ? "end" : "center";
        const tick = (
          <span
            aria-hidden="true"
            className={`h-[4px] w-px bg-rule ${place === "above" ? "mt-1" : "mb-1"}`}
          />
        );
        return (
          <span
            key={year}
            className={`absolute inset-y-0 flex flex-col ${
              place === "above" ? "justify-end" : "justify-start"
            } ${edge === "start" ? "items-start" : edge === "end" ? "items-end" : "items-center"}`}
            style={{
              left: `${pct}%`,
              transform:
                edge === "start"
                  ? undefined
                  : edge === "end"
                    ? "translateX(-100%)"
                    : "translateX(-50%)",
            }}
          >
            {place === "below" ? tick : null}
            <span className="datum text-[0.625rem] leading-none text-bone-faint">
              {year}
            </span>
            {place === "above" ? tick : null}
          </span>
        );
      })}
    </div>
  );
}

type SegmentState = "rest" | "focus" | "linked" | "muted";

const FILL: Record<SegmentState, number> = {
  rest: 0.12,
  focus: 0.3,
  linked: 0.22,
  muted: 0.06,
};

function NowRule({ pct }: { pct: number | null }) {
  if (pct === null) return null;
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 z-20 w-px"
      style={{ left: `${pct}%`, marginLeft: "-0.5px", backgroundColor: "var(--color-signal)" }}
    />
  );
}

export default function MusicDualCycle({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (segmentId: string) => void;
}) {
  const now = useSyncExternalStore(NEVER_CHANGES, CLIENT_SNAPSHOT, SERVER_NOW);
  const nowYear = now === null ? null : fractionalYear(now);
  const nowPct = nowYear === null ? null : pctOfYear(nowYear);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tipX, setTipX] = useState(0);

  /**
   * What the readout's x is measured against.
   *
   * The frame, not the scrolling track. The chart scrolls sideways below a
   * 760px column, and an offset taken inside the scroller is correct only
   * until the reader scrolls it; a viewport-relative difference against the
   * frame carries the scroll position for free.
   */
  const frame = useRef<HTMLDivElement>(null);

  /**
   * The plot's own width, for the label thresholds.
   *
   * Observed rather than taken from a breakpoint: this sits in a column that
   * also changes width when the sidebar collapses, which no media query sees.
   * Attached by a ref callback for the same reason the long-cycle strip is —
   * an effect keyed on mount runs before the node it wants exists.
   */
  const [width, setWidth] = useState(0);
  const plot = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const focusId = hoveredId ?? selectedId;
  const focused = focusId ? musicCycleSegment(focusId) : null;
  const links = useMemo(() => (focused ? concurrentWith(focused) : []), [focused]);
  const linkedIds = useMemo(() => new Set(links.map((l) => l.segment.id)), [links]);

  const stateOf = (segment: MusicCycleSegment): SegmentState => {
    if (!focused) return "rest";
    if (segment.id === focused.id) return "focus";
    return linkedIds.has(segment.id) ? "linked" : "muted";
  };

  const pxOf = (segment: MusicCycleSegment) =>
    ((pctOfYear(segment.endYear) - pctOfYear(segment.startYear)) / 100) * width;

  const activeOf = (lane: MusicCycleLane) =>
    nowYear === null
      ? null
      : (lane.segments.find((s) => nowYear >= s.startYear && nowYear < s.endYear) ?? null);

  // Anchored to the era under the pointer rather than to the pointer itself:
  // a readout that tracks the cursor jitters and asks the reader to hold still.
  const show = (segment: MusicCycleSegment) => (event: { currentTarget: HTMLElement }) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    const el = event.currentTarget.getBoundingClientRect();
    setHoveredId(segment.id);
    setTipX(el.left + el.width / 2 - box.left);
  };

  return (
    <div>
      {/* The vocabulary, before the bars that assume it */}
      <div className="mb-5 space-y-2 border-y border-rule-faint py-3">
        {MUSIC_CYCLE_LANES.map((lane) => (
          <div key={lane.planet} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="glyph w-5 shrink-0 text-[1.0625rem] leading-none text-patina">
              {lane.glyph}
            </span>
            <span
              className="text-[1.0625rem] leading-none text-bone"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lane.planet}
            </span>
            <span className="datum text-[0.5625rem] tracking-[0.2em] text-patina uppercase">
              {lane.role}
            </span>
            <span className="text-[1rem] text-bone-soft italic">{lane.question}</span>
            <span className="datum ml-auto text-[0.625rem] text-bone-faint">
              {lane.segments.length} eras · one every ~{lane.cadenceYears} years
            </span>
          </div>
        ))}
      </div>

      <p id="music-dual-hint" className="datum mb-3 text-[0.625rem] text-bone-faint">
        Point at an era to light the other clock across it · click for the reading
      </p>

      <div ref={frame} className="relative">
        <div
          role="group"
          aria-label={`Neptune and Uranus music eras, ${MUSIC_CYCLE_START} to ${MUSIC_CYCLE_END}`}
          aria-describedby="music-dual-hint"
          className="overflow-x-auto pb-1"
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="min-w-[760px]">
            <div className="flex">
              {/* Which lane is which, off the time axis so it costs no era width */}
              <div className="w-9 shrink-0">
                {MUSIC_CYCLE_LANES.map((lane, i) => (
                  <div key={lane.planet}>
                    {/* Keeps the glyph level with its bar past the dates row */}
                    {i === 0 ? <div style={{ height: AXIS_ROW }} /> : null}
                    <div
                      className="flex items-center"
                      style={{ height: LANE_HEIGHT[lane.planet] }}
                    >
                      <span
                        className="glyph text-[1rem] leading-none text-bone-faint"
                        aria-hidden="true"
                      >
                        {lane.glyph}
                      </span>
                    </div>
                    {i === 0 ? <div style={{ height: GUTTER }} /> : null}
                  </div>
                ))}
              </div>

              <div ref={plot} className="relative flex-1">
                {MUSIC_CYCLE_LANES.map((lane, laneIndex) => {
                  const active = activeOf(lane);
                  const boundaries = boundariesOf(lane);
                  return (
                    <div key={lane.planet}>
                      {laneIndex === 0 ? (
                        <AxisRow years={boundaries} place="above" />
                      ) : null}

                      <div
                        className="relative"
                        style={{ height: LANE_HEIGHT[lane.planet] }}
                      >
                        {/* The lane's ground, so an era-less stretch still reads as lane */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-px bg-rule-faint"
                        />

                        {lane.segments.map((segment) => {
                          const left = pctOfYear(segment.startYear);
                          const right = pctOfYear(segment.endYear);
                          const state = stateOf(segment);
                          const px = pxOf(segment);
                          const named = px >= NAME_FURNITURE + (NAME_WIDTH[segment.sign] ?? 90);
                          // Neptune only. The disruption lane is 42px tall and
                          // already carrying a name; a second line in it is
                          // cramped where it fits at all, and that lane is the
                          // punctuation under the ideal rather than a second
                          // body of text.
                          const headlined =
                            named &&
                            segment.planet === "Neptune" &&
                            px >=
                              HEADLINE_FURNITURE +
                                segment.headline.length * HEADLINE_PX_PER_CHAR;

                          return (
                            <button
                              key={segment.id}
                              type="button"
                              onClick={() => onSelect(segment.id)}
                              onMouseEnter={show(segment)}
                              onFocus={show(segment)}
                              onBlur={() => setHoveredId(null)}
                              aria-haspopup="dialog"
                              aria-expanded={selectedId === segment.id}
                              aria-label={`${segment.planet} in ${segment.sign}, ${segment.startYear} to ${segment.endYear} — ${segment.headline}. Open the reading.`}
                              className="absolute inset-y-0 cursor-pointer overflow-hidden px-1 text-center transition-opacity focus-visible:outline-offset-[-3px]"
                              style={{
                                left: `${left}%`,
                                width: `${right - left}%`,
                                borderTop: `3px ${segment.speculative ? "dashed" : "solid"} ${segment.color}`,
                                opacity: state === "muted" ? 0.4 : 1,
                              }}
                            >
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 transition-[background-color,opacity]"
                                style={{ backgroundColor: segment.color, opacity: FILL[state] }}
                              />
                              <span
                                aria-hidden="true"
                                className="absolute inset-y-0 right-0 w-px bg-void/70"
                              />

                              <span className="relative flex h-full flex-col items-center justify-center gap-1 leading-none">
                                <span
                                  className="flex items-baseline gap-1.5"
                                  style={{ color: segment.color }}
                                >
                                  <span className="glyph text-[0.9375rem]" aria-hidden="true">
                                    {segment.glyph}
                                  </span>
                                  {named ? (
                                    <span className="inscription text-[0.6875rem] tracking-[0.1em]">
                                      {segment.sign}
                                    </span>
                                  ) : null}
                                </span>
                                {headlined ? (
                                  <span className="block text-[0.9375rem] leading-none text-bone-soft">
                                    {segment.headline}
                                  </span>
                                ) : null}
                              </span>
                            </button>
                          );
                        })}

                        {/* The era in force, bracketed the way the macro bars do it */}
                        {active ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-[3px] -bottom-[3px] border-x"
                            style={{
                              left: `${pctOfYear(active.startYear)}%`,
                              width: `${pctOfYear(active.endYear) - pctOfYear(active.startYear)}%`,
                              borderColor: active.color,
                            }}
                          />
                        ) : null}

                        <NowRule pct={nowPct} />
                      </div>

                      {/* Same sign in both lanes — the one thing only this chart can show */}
                      {laneIndex === 0 ? (
                        <div className="relative" style={{ height: GUTTER }}>
                          {MUSIC_CYCLE_RESONANCES.map((resonance) => {
                            const left = pctOfYear(resonance.fromYear);
                            const right = pctOfYear(resonance.toYear);
                            const px = ((right - left) / 100) * width;
                            return (
                              <span
                                key={`${resonance.sign}-${resonance.fromYear}`}
                                title={`Uranus and Neptune both in ${resonance.sign} · ${resonance.fromYear}–${resonance.toYear}`}
                                className="absolute inset-y-0 flex items-center justify-center border-x"
                                style={{
                                  left: `${left}%`,
                                  width: `${right - left}%`,
                                  borderColor: resonance.color,
                                  opacity: 0.55,
                                }}
                              >
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-x-0 top-1/2 h-px"
                                  style={{ backgroundColor: resonance.color }}
                                />
                                {px >= BRACKET_GLYPH_PX ? (
                                  <span
                                    className="glyph relative bg-void px-1 text-[0.625rem] leading-none"
                                    style={{ color: resonance.color }}
                                    aria-hidden="true"
                                  >
                                    {resonance.glyph}
                                  </span>
                                ) : null}
                              </span>
                            );
                          })}
                          <NowRule pct={nowPct} />
                        </div>
                      ) : null}

                      {laneIndex === 1 ? (
                        <AxisRow years={boundaries} place="below" />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* The readout, below the axis so it never covers the lane being compared */}
        {focused && hoveredId ? (
          <div
            className="pointer-events-none absolute top-full z-30 mt-2 w-[23rem] -translate-x-1/2 border border-rule bg-surface-alt px-5 py-4"
            style={{
              // Clamped in CSS so it needs no measurement and cannot lag the pointer.
              left: `clamp(11.5rem, ${tipX}px, calc(100% - 11.5rem))`,
            }}
          >
            <p className="flex items-baseline justify-between gap-3">
              <span
                className="datum text-[0.625rem] tracking-[0.16em] uppercase"
                style={{ color: focused.color }}
              >
                {focused.planet} in {focused.sign}
              </span>
              <span className="datum text-[0.625rem] text-bone-faint">
                {focused.startYear}–{focused.endYear}
              </span>
            </p>

            <p className="mt-2 text-[1.0625rem] leading-snug" style={{ color: focused.color }}>
              {focused.headline}
            </p>
            <p className="mt-1 text-[0.9375rem] leading-snug text-bone-soft">{focused.note}</p>

            <p className="datum mt-3.5 border-t border-rule pt-3 text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase">
              Meanwhile
            </p>
            <ul className="mt-2 space-y-1.5">
              {links.map((link) => (
                <li key={link.segment.id} className="flex items-baseline gap-2">
                  <span
                    className="glyph shrink-0 text-[0.8125rem]"
                    style={{ color: link.segment.color }}
                  >
                    {link.segment.glyph}
                  </span>
                  <span className="min-w-0 text-[0.875rem] leading-snug text-bone-soft">
                    <span className="text-bone">{link.segment.headline}</span>
                    <span className="text-bone-faint">
                      {" — "}
                      {link.fromYear}–{link.toYear}
                      {link.resonance ? ` · ${link.resonance}` : ""}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="datum mt-3.5 text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase">
              click to open the reading
            </p>
          </div>
        ) : null}
      </div>

      <p className="datum mt-3 text-[0.625rem] leading-relaxed text-bone-faint">
        Brackets mark the years both planets held the same sign —{" "}
        {MUSIC_CYCLE_RESONANCES.map((r) => `${r.sign} ${r.fromYear}–${r.toYear}`).join(", ")}.
        Dashed edges are eras not yet observed.
      </p>
    </div>
  );
}
