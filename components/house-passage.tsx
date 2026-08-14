"use client";

import { useState } from "react";
import type { Band, BandStatus } from "@/lib/band";
import {
  LABEL_W,
  NowLine,
  YearAxis,
  YearGrid,
  pct,
  type Scale,
} from "@/components/timeline-scale";

/**
 * The other way to read the same data: one row per planet, and on that row the
 * unbroken sequence of houses it walks through.
 *
 * The Axis answers "what is in effect, and when" — every transit on its own
 * row, overlapping freely. This answers "where has this planet been, and where
 * is it going" — a single continuous ribbon per planet, so a whole life of
 * Jupiter's twelve-year circuit reads in one line.
 *
 * Tone alternates on every house change (odd houses light, even houses dark,
 * in the planet's own colour) because a run of identical blocks would hide the
 * very thing the chart is for: the moment it crosses into the next house.
 */

interface Stint {
  house: number;
  start: string;
  end: string;
}

interface Interval {
  house: number;
  start: number;
  end: number;
}

function isoOf(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/**
 * Flatten one planet's house transits into a gapless sequence.
 *
 * The source overlaps: a planet that stations retrograde re-enters the house
 * behind it while the house ahead is still open, so at a given instant two
 * transits can claim it. The one that started most recently wins — that is the
 * house it actually moved into — which is what makes a retrograde show up here
 * as a step backwards rather than as two bars fighting over the same pixels.
 */
function stintsFor(bands: Band[]): Stint[] {
  const intervals: Interval[] = [];

  for (const band of bands) {
    const match = /^House (\d+)$/.exec(band.subtitle);
    if (!match) continue;
    const house = Number(match[1]);
    for (const segment of band.segments) {
      const start = Date.parse(segment.start);
      const end = Date.parse(segment.end);
      if (end > start) intervals.push({ house, start, end });
    }
  }

  if (intervals.length === 0) return [];

  const edges = [...new Set(intervals.flatMap((i) => [i.start, i.end]))].sort(
    (a, b) => a - b,
  );

  const stints: Stint[] = [];

  for (let i = 0; i < edges.length - 1; i++) {
    const from = edges[i];
    const to = edges[i + 1];

    let winner: Interval | undefined;
    for (const interval of intervals) {
      if (interval.start > from || interval.end < to) continue;
      if (!winner || interval.start > winner.start) winner = interval;
    }
    if (!winner) continue;

    // Slices of the same house that meet edge to edge are one stint.
    const last = stints[stints.length - 1];
    if (last && last.house === winner.house && Date.parse(last.end) === from) {
      last.end = isoOf(to);
    } else {
      stints.push({ house: winner.house, start: isoOf(from), end: isoOf(to) });
    }
  }

  // Bridge gaps between consecutive stints. The DB can store a day or two of
  // void between one house ending and the next beginning (rounding artefacts
  // or a one-day retrograde cusp). A gap of 1 day is acceptable; anything
  // larger is a rendering hole and we close it by stretching the earlier
  // stint's end date forward to meet the next one's start.
  for (let i = 0; i < stints.length - 1; i++) {
    const gap =
      Date.parse(stints[i + 1].start) - Date.parse(stints[i].end);
    if (gap > 86_400_000) {
      stints[i].end = stints[i + 1].start;
    }
  }

  return stints;
}

function longDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** How long a stint ran, in the largest unit that stays honest. */
function duration(start: string, end: string): string {
  const days = Math.round((Date.parse(end) - Date.parse(start)) / 86_400_000);
  if (days < 60) return `${days} days`;
  const months = Math.round(days / 30.44);
  if (months < 24) return `${months} months`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest ? `${years} yr ${rest} mo` : `${years} yr`;
}

/** What the pointer is over, already resolved to viewport coordinates. */
interface Hover {
  house: number;
  start: string;
  end: string;
  tint: string;
  x: number;
  y: number;
}

/**
 * Follows the pointer as a fixed layer rather than living inside the stint it
 * describes: the stints clip their own labels and the narrow ones are a couple
 * of pixels wide, so a tooltip parented to one would be cut to nothing.
 */
function Tooltip({ hover }: { hover: Hover }) {
  return (
    <div
      className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full border border-rule bg-surface-alt px-3 py-2"
      style={{ left: hover.x, top: hover.y - 10 }}
    >
      <p
        className="datum text-[0.5625rem] tracking-[0.2em] uppercase"
        style={{ color: hover.tint }}
      >
        House {hover.house}
      </p>
      <p className="datum mt-1.5 text-[0.6875rem] whitespace-nowrap text-bone">
        {longDate(hover.start)} → {longDate(hover.end)}
      </p>
      <p className="datum mt-0.5 text-[0.5625rem] text-bone-faint">
        {duration(hover.start, hover.end)}
      </p>
    </div>
  );
}

/** Same three states the bands use, asked of a single house stint. */
function statusOfStint(stint: Stint, now: Date): BandStatus {
  const t = now.getTime();
  if (t < Date.parse(stint.start)) return "upcoming";
  if (t >= Date.parse(stint.end)) return "completed";
  return "active";
}

function PassageRow({
  planet,
  glyph,
  tint,
  stints,
  now,
  scale,
  onHover,
  onStintClick,
}: {
  planet: string;
  glyph: string;
  tint: string;
  stints: Stint[];
  now: Date;
  scale: Scale;
  onHover: (hover: Hover | null) => void;
  onStintClick: (house: number, start: string, end: string) => void;
}) {
  const current = stints.find((s) => statusOfStint(s, now) === "active");

  return (
    <div
      className="grid items-center border-b border-rule-faint"
      style={{ gridTemplateColumns: `${LABEL_W} 1fr` }}
    >
      <div className="flex items-center gap-3 py-3 pr-4">
        <span
          className="glyph w-5 shrink-0 text-lg leading-none"
          style={{ color: tint }}
        >
          {glyph}
        </span>
        <span className="min-w-0 flex-1">
          <span className="inscription block truncate text-[0.8125rem] text-bone">
            {planet}
          </span>
          <span className="block truncate text-[0.8125rem] font-light text-bone-faint italic">
            {current ? `House ${current.house} now` : `${stints.length} houses`}
          </span>
        </span>
      </div>

      <div className="relative h-12">
        {/* The ribbon sits on the same rule the other chart draws its bars on */}
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-rule-faint" />

        {stints.map((stint) => {
          const left = pct(stint.start, scale);
          const width = pct(stint.end, scale) - left;
          if (width <= 0) return null;

          const status = statusOfStint(stint, now);
          const odd = stint.house % 2 === 1;

          // Active: full-brightness tint. Upcoming: medium. Completed: muted.
          // Odd/even alternation nudges adjacent blocks apart within each tier
          // but is kept narrow so the state contrast always dominates.
          const bgOpacity =
            status === "active"
              ? odd ? 90 : 72
              : status === "upcoming"
                ? odd ? 44 : 30
                : odd ? 20 : 12;

          const labelClass =
            status === "active"
              ? "text-bone"
              : status === "upcoming"
                ? "text-bone-soft"
                : "text-bone-faint";

          return (
            <div
              key={`${stint.house}-${stint.start}`}
              onMouseEnter={(event) => {
                const box = event.currentTarget.getBoundingClientRect();
                onHover({
                  house: stint.house,
                  start: stint.start,
                  end: stint.end,
                  tint,
                  // Centred on the stint, then kept clear of either edge so a
                  // transit at the end of the window stays readable.
                  x: Math.min(
                    Math.max(box.left + box.width / 2, 120),
                    window.innerWidth - 120,
                  ),
                  y: box.top,
                });
              }}
              onMouseLeave={() => onHover(null)}
              onClick={() => onStintClick(stint.house, stint.start, stint.end)}
              className="absolute top-1/2 flex h-5 -translate-y-1/2 cursor-pointer items-center justify-center overflow-hidden transition-opacity hover:opacity-80"
              style={{
                left: `${left}%`,
                width: `${width}%`,
                backgroundColor: `color-mix(in srgb, ${tint} ${bgOpacity}%, transparent)`,
              }}
            >
              {width > 1.8 ? (
                <span className={`datum text-[0.625rem] leading-none ${labelClass}`}>
                  {stint.house}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HousePassage({
  bands,
  planets,
  statuses,
  now,
  windowStart,
  windowEnd,
  onStintClick,
}: {
  bands: Band[];
  /** Which planets to draw, in the order they should appear. */
  planets: { name: string; glyph: string; color: string }[];
  /** Which of past / present / future to keep. */
  statuses: Set<BandStatus>;
  now: Date;
  windowStart: string;
  windowEnd: string;
  /** Called when the user clicks a house block. */
  onStintClick?: (planet: string, house: number, start: string, end: string) => void;
}) {
  const [hover, setHover] = useState<Hover | null>(null);

  const scale = { windowStart, windowEnd };
  const from = Date.parse(windowStart);
  const to = Date.parse(windowEnd);

  const rows = planets
    .map((p) => ({
      ...p,
      // Stints are cut from the whole history, then narrowed — the sequence
      // has to be resolved before it can be filtered, or a hidden stint would
      // leave a hole its neighbours silently grew into.
      stints: stintsFor(bands.filter((b) => b.title === p.name)).filter(
        (s) =>
          statuses.has(statusOfStint(s, now)) &&
          Date.parse(s.end) > from &&
          Date.parse(s.start) < to,
      ),
    }))
    .filter((r) => r.stints.length > 0);

  if (rows.length === 0) {
    return (
      <p className="font-light text-bone-soft">
        Nothing matches those filters.
      </p>
    );
  }

  return (
    <div className="relative pt-6">
      <YearAxis scale={scale} />

      <div className="relative border-t border-rule">
        <YearGrid scale={scale} />
        {rows.map((r) => (
          <PassageRow
            key={r.name}
            planet={r.name}
            glyph={r.glyph}
            tint={r.color}
            stints={r.stints}
            now={now}
            scale={scale}
            onHover={setHover}
            onStintClick={(house, start, end) =>
              onStintClick?.(r.name, house, start, end)
            }
          />
        ))}
      </div>

      <NowLine now={now} scale={scale} />

      {hover ? <Tooltip hover={hover} /> : null}
    </div>
  );
}
