//components/western/love/love-timeline.tsx
"use client";

import { useMemo } from "react";
import {
  LOVE_MODE_LABEL,
  LOVE_STRENGTH_LABEL,
  LOVE_WINDOW_LABEL,
  type LoveMode,
  type LoveStrength,
  type LoveWindow,
} from "@/lib/love";
import { T } from "@/components/western/growth/growth-ui";
import {
  LANE,
  LOVE_LANES,
  LOVE_MODE_TINT,
  LOVE_STRENGTH_HEIGHT,
} from "@/components/western/love/love-ui";

/**
 * Year ticks at a readable density.
 *
 * A twelve-year view wants every year and a seventy-four-year view wants every
 * decade; the same rule has to produce both, so the step is chosen from the
 * span rather than from which view is selected. Ticks land on round years —
 * 2030 rather than 2029.4 — because a labelled axis whose labels are not round
 * numbers is harder to read than one with fewer of them.
 */
function ticksFor(fromYear: number, toYear: number): number[] {
  const span = toYear - fromYear;
  const step = span <= 6 ? 1 : span <= 15 ? 2 : span <= 40 ? 5 : 10;
  const first = Math.ceil(fromYear / step) * step;
  const ticks: number[] = [];
  for (let year = first; year <= toYear; year += step) ticks.push(year);
  return ticks;
}

export default function LoveTimeline({
  windows,
  fromYear,
  toYear,
  nowYear,
  selected,
  onSelect,
}: {
  windows: LoveWindow[];
  fromYear: number;
  toYear: number;
  nowYear: number;
  selected: LoveWindow | null;
  onSelect: (window: LoveWindow) => void;
}) {
  const at = useMemo(() => {
    const span = toYear - fromYear;
    return (year: number) =>
      `${(((year - fromYear) / span) * 100).toFixed(3)}%`;
  }, [fromYear, toYear]);

  const width = (from: number, to: number) =>
    `${Math.max(((to - from) / (toYear - fromYear)) * 100, 0.35).toFixed(3)}%`;

  /** Decimal year, so a window starting in July sits mid-tick. */
  const yearOf = (iso: string) => {
    const date = new Date(`${iso}T12:00:00Z`);
    const start = Date.UTC(date.getUTCFullYear(), 0, 1);
    const end = Date.UTC(date.getUTCFullYear() + 1, 0, 1);
    return date.getUTCFullYear() + (date.getTime() - start) / (end - start);
  };

  const drawn = windows
    .map((window) => ({
      window,
      from: Math.max(yearOf(window.start), fromYear),
      to: Math.min(yearOf(window.end), toYear),
    }))
    .filter((item) => item.to > item.from);

  const ticks = ticksFor(fromYear, toYear);
  const insideView = nowYear >= fromYear && nowYear <= toYear;

  return (
    <div className="mt-8">
      {/* The axis sits ABOVE the lanes rather than under them. The lanes are
          labelled on the left and read as a list, and a list wants its
          column headings at the top. */}
      <div className="relative ml-[104px] h-6 border-b border-rule-faint">
        {ticks.map((year) => (
          <span
            key={year}
            className={`${T.tiny} absolute top-0 -translate-x-1/2 text-bone-faint`}
            style={{ left: at(year) }}
          >
            {year}
          </span>
        ))}
      </div>

      <div className="relative">
        {/* Year rules, drawn behind every lane so a window can be read off
            the axis without counting across. */}
        <div
          className="pointer-events-none absolute left-[104px] right-0 top-0"
          style={{ height: LOVE_LANES.length * LANE }}
        >
          {ticks.map((year) => (
            <span
              key={year}
              className="absolute top-0 bottom-0 w-px bg-rule-faint"
              style={{ left: at(year) }}
            />
          ))}
          {insideView ? (
            <span
              className="absolute top-0 bottom-0 w-[2px] bg-signal/90"
              style={{ left: at(nowYear) }}
            />
          ) : null}
        </div>

        {LOVE_LANES.map((kind) => {
          const lane = drawn.filter((item) => item.window.kind === kind);
          return (
            <div key={kind} className="relative flex items-center" style={{ height: LANE }}>
              <span
                className={`${T.tiny} w-[104px] shrink-0 pr-4 text-right ${
                  lane.length ? "text-bone-soft" : "text-bone-faint/40"
                }`}
              >
                {LOVE_WINDOW_LABEL[kind]}
              </span>
              <div className="relative h-full flex-1">
                {lane.map(({ window, from, to }) => {
                  const active = selected?.id === window.id;
                  const height = LOVE_STRENGTH_HEIGHT[window.strength];
                  return (
                    <button
                      key={window.id}
                      type="button"
                      onClick={() => onSelect(window)}
                      aria-pressed={active}
                      aria-label={`${LOVE_STRENGTH_LABEL[window.strength]} ${LOVE_WINDOW_LABEL[
                        kind
                      ].toLowerCase()} window, ${window.start} to ${window.end}`}
                      className="absolute top-1/2 -translate-y-1/2 transition-opacity hover:opacity-75"
                      style={{
                        left: at(from),
                        width: width(from, to),
                        height,
                        background: LOVE_MODE_TINT[window.mode],
                        // A closed window is still drawn — the shape of a life
                        // is half of what makes the years ahead legible — but
                        // it is not competing with them.
                        opacity: window.status === "completed" && !active ? 0.4 : 1,
                        outline: active ? "1px solid var(--color-bone)" : undefined,
                        outlineOffset: 2,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* The key. Three encodings, so three groups — a single flat legend
          would imply they are three values of one thing. */}
      <div className={`${T.tiny} mt-6 ml-[104px] flex flex-wrap gap-x-10 gap-y-3 text-bone-faint`}>
        <span className="flex items-center gap-3">
          {(["opening", "defining", "seasonal"] as LoveMode[]).map((mode) => (
            <span key={mode} className="inline-flex items-center gap-2">
              <span
                className="inline-block w-4"
                style={{ height: 8, background: LOVE_MODE_TINT[mode] }}
              />
              {LOVE_MODE_LABEL[mode]}
            </span>
          ))}
        </span>
        <span className="flex items-center gap-3">
          {(["minor", "moderate", "major"] as LoveStrength[]).map((strength) => (
            <span key={strength} className="inline-flex items-center gap-2">
              <span
                className="inline-block w-3 bg-bone-faint"
                style={{ height: LOVE_STRENGTH_HEIGHT[strength] }}
              />
              {LOVE_STRENGTH_LABEL[strength]}
            </span>
          ))}
        </span>
        <span className="text-bone-faint/70">Emphasis, not outcome</span>
      </div>
    </div>
  );
}
