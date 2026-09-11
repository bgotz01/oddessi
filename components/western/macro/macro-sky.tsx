// components/western/macro/macro-sky.tsx

"use client";

import { ELEMENT_COLOR } from "@/lib/symbols";
import type { SkyBody } from "@/lib/macro";

/**
 * Where the five slow bodies actually are, right now.
 *
 * Five columns on one rule, read slowest-first. Nothing here is an
 * interpretation — a longitude is a measurement — so the only colour is the
 * body's own and its sign's element, and everything measured is set in `datum`.
 *
 * Every cell opens a reading of that planet's current sign placement. This is
 * separate from the timeline below: a sky cell answers "what does this
 * placement mean now?", while a timeline row answers "where are we inside the
 * longer cycle?".
 */

/** 3.42 → "3°25′". Minutes floored, which is how an ephemeris reads. */
function degreeLabel(degree: number): string {
  const whole = Math.floor(degree);
  const minutes = Math.floor((degree - whole) * 60);
  return `${whole}°${String(minutes).padStart(2, "0")}′`;
}

function motionLabel(dailyMotion: number): string {
  const arcMinutes = Math.abs(dailyMotion) * 60;
  return `${arcMinutes.toFixed(2)}′ / day`;
}

function SkyCell({
  body,
  onOpen,
  selected,
}: {
  body: SkyBody;
  onOpen: () => void;
  selected: boolean;
}) {
  const content = (
    <>
      <div className="flex items-baseline gap-2">
        <span
          className="glyph text-[1.375rem] leading-none"
          style={{ color: body.color }}
        >
          {body.glyph}
        </span>
        <span
          className="inscription text-[0.75rem]"
          style={{ color: body.color }}
        >
          {body.planet}
        </span>
        {body.retrograde ? (
          <span
            className="datum text-[0.625rem] text-ember"
            title="Retrograde"
          >
            ℞
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="glyph text-[1rem] leading-none text-bone-soft">
          {body.signGlyph}
        </span>
        <span
          className="text-[1.25rem] leading-none text-bone"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {body.sign}
        </span>
      </div>

      <div className="mt-2 flex items-baseline gap-3">
        <span className="datum text-[0.6875rem] text-bone-faint">
          {degreeLabel(body.degree)}
        </span>
        {body.element ? (
          <span
            className="datum text-[0.5625rem] tracking-[0.22em] uppercase"
            style={{ color: ELEMENT_COLOR[body.element] }}
          >
            {body.element}
          </span>
        ) : null}
      </div>

      <div className="datum mt-2 text-[0.5625rem] tracking-[0.1em] text-bone-faint/70">
        {body.retrograde ? "Retrograde" : "Direct"} · {motionLabel(body.dailyMotion)}
      </div>

      {body.timeframe ? (
        <div className="datum mt-2 text-[0.5625rem] tracking-[0.1em] text-bone-faint/70">
          {body.timeframe}
        </div>
      ) : null}

      <p className="mt-4 border-t border-rule-faint pt-3 text-[0.8125rem] leading-snug text-bone-soft">
        {body.meaning.theme}
      </p>
    </>
  );

  const shell = `flex h-full w-full flex-col px-5 py-5 text-left ${selected ? "bg-surface" : ""
    }`;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`${shell} cursor-pointer outline-none transition-colors hover:bg-surface focus-visible:bg-surface`}
      aria-label={`${body.planet} in ${body.sign} — open detail`}
    >
      {content}
    </button>
  );
}

export default function MacroSky({
  sky,
  onSelect,
  selectedPlanet,
}: {
  sky: SkyBody[];
  onSelect: (planet: string) => void;
  selectedPlanet: string | null;
}) {
  return (
    <div className="grid grid-cols-1 border-y border-rule sm:grid-cols-2 lg:grid-cols-5">
      {/*
        Hairlines run between the columns only once the five actually sit in a
        row. Below that the cells stack, and a vertical rule between stacked
        blocks would be drawing a division that is not there — so it becomes a
        rule underneath instead, and the last cell drops it against the
        section's own bottom edge.
      */}
      {sky.map((body) => (
        <div
          key={body.planet}
          className="border-b border-rule-faint last:border-b-0 lg:border-b-0 lg:border-l lg:border-rule-faint lg:first:border-l-0"
        >
          <SkyCell
            body={body}
            selected={selectedPlanet === body.planet}
            onOpen={() => onSelect(body.planet)}
          />
        </div>
      ))}
    </div>
  );
}
