// components/western/macro/cycle-timeline.tsx

"use client";

import { ELEMENT_COLOR } from "@/lib/symbols";
import type { MacroCycle, MacroLayer } from "@/lib/macro";

/**
 * Every macro cycle in force, as one bar each.
 *
 * The bars are drawn to a common rule and NOT to a common scale — a 490-year
 * civilizational cycle and a 20-year conjunction on one shared axis would put
 * the whole turning-point layer inside four pixels. Each bar is its own span,
 * and the layer heading plus the cadence on the right are what say how long
 * that span is. Reading down the section goes from the era to the decade.
 *
 * The one mark not in the cycle's own colour is the position line at the head
 * of the fill. That is `signal`, and it is the reader's own place in time —
 * the one thing on the page that is indexical rather than interpretive.
 */

const LAYER_NOTE: Record<MacroLayer, string> = {
  Civilizational: "Nobody alive sees these close",
  Structural: "One of these turns over within a career",
  "Turning Point": "The clock a decade is measured on",
};

const LAYER_ORDER: MacroLayer[] = [
  "Structural",
  "Turning Point",
  "Civilizational",
];

/**
 * Years elapsed, at the precision the cycle can carry.
 *
 * A whole number is right for a 490-year span and wrong for a 7-year one:
 * Uranus entered Gemini five months ago and rounding said "0 / 7 years in",
 * which reads as an error rather than as a beginning. Anything inside a human
 * span gets a decimal; the centuries do not, because a tenth of a year on a
 * date the source only knows to the year is precision that is not there.
 */
function elapsedLabel(cycle: MacroCycle): string {
  return cycle.totalYears <= 40
    ? cycle.yearsIn.toFixed(1)
    : String(Math.round(cycle.yearsIn));
}

function CycleBar({
  cycle,
  onOpen,
  selected,
}: {
  cycle: MacroCycle;
  onOpen: () => void;
  selected: boolean;
}) {
  const pct = cycle.progress * 100;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${cycle.name}${cycle.sign ? ` in ${cycle.sign}` : ""} — open detail`}
      className={`block w-full cursor-pointer border-b border-rule-faint px-1 py-5 text-left outline-none transition-colors hover:bg-surface focus-visible:bg-surface ${selected ? "bg-surface" : ""
        }`}
    >
      {/* Identity */}
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <div className="flex items-baseline gap-3">
          <span
            className="glyph flex shrink-0 items-baseline gap-1 text-[1.125rem] leading-none"
            style={{ color: cycle.color }}
          >
            {cycle.glyphs.map((g, i) => (
              <span key={i}>{g}</span>
            ))}
          </span>

          <span
            className="text-[1.1875rem] leading-tight text-bone"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {cycle.name}
            {cycle.sign ? (
              <span className="text-bone-soft"> in {cycle.sign}</span>
            ) : null}
          </span>

          {cycle.element ? (
            <span
              className="datum text-[0.5625rem] tracking-[0.22em] uppercase"
              style={{ color: ELEMENT_COLOR[cycle.element] }}
            >
              {cycle.element}
            </span>
          ) : null}
        </div>

        <div className="flex items-baseline gap-4">
          <span className="datum text-[0.5625rem] tracking-[0.2em] text-patina uppercase">
            {cycle.phase}
          </span>
          <span className="datum text-[0.625rem] text-bone-faint">
            {cycle.cadence}
          </span>
        </div>
      </div>

      {/* Theme — a sentence, so mixed case and set in the body face */}
      <p className="mb-4 text-[1.0625rem] leading-snug text-bone-soft">
        {cycle.theme}
      </p>

      {/* Bar */}
      <div className="relative h-[8px] w-full" style={{ borderRadius: "1px" }}>
        {/* Remaining span */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: cycle.color,
            opacity: 0.12,
            borderRadius: "1px",
          }}
        />
        {/* Elapsed */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${pct}%`,
            backgroundColor: cycle.color,
            opacity: 0.8,
            borderRadius: "1px",
          }}
        />

        {/* Milestones the long cycles are read by */}
        {cycle.milestones?.map((m) => {
          const x =
            ((m.year - cycle.startYear) / (cycle.endYear - cycle.startYear)) * 100;
          if (x <= 0 || x >= 100) return null;
          return (
            <span
              key={m.year}
              title={`${m.label} · ${m.year}`}
              className="absolute"
              style={{
                left: `${x}%`,
                top: "-2px",
                height: "12px",
                width: "1px",
                backgroundColor: m.current
                  ? "var(--color-bone)"
                  : "var(--color-bone-faint)",
                opacity: m.current ? 0.9 : 0.35,
              }}
            />
          );
        })}

        {/* Now */}
        <span
          className="absolute"
          style={{
            left: `${pct}%`,
            top: "-4px",
            height: "16px",
            width: "1px",
            marginLeft: "-0.5px",
            backgroundColor: "var(--color-signal)",
          }}
        />
      </div>

      {/* Axis */}
      <div className="mt-2 flex items-baseline justify-between">
        <span className="datum text-[0.625rem] text-bone-faint">
          {cycle.startYear}
        </span>
        <span className="datum text-[0.625rem] text-bone-faint">
          <span style={{ color: "var(--color-signal)" }}>
            {elapsedLabel(cycle)}
          </span>
          {" / "}
          {Math.round(cycle.totalYears)} years in
        </span>
        <span className="datum text-[0.625rem] text-bone-faint">
          {cycle.endYear}
        </span>
      </div>

      {cycle.previousCycle ? (
        <p className="mt-3 text-[0.75rem] leading-relaxed text-bone-faint/65 italic">
          Previous cycle: {cycle.previousCycle.period}.{" "}
          {cycle.previousCycle.summary}
        </p>
      ) : null}
    </button>
  );
}

export default function CycleTimeline({
  cycles,
  onSelect,
  selectedId,
}: {
  cycles: MacroCycle[];
  onSelect: (cycleId: string) => void;
  selectedId: string | null;
}) {
  return (
    <div>
      {LAYER_ORDER.map((layer) => {
        const inLayer = cycles.filter((c) => c.layer === layer);
        if (inLayer.length === 0) return null;

        return (
          <section key={layer} className="mb-10 last:mb-0">
            <div className="mb-4 flex items-baseline justify-between gap-6 border-b border-rule pb-2">
              <p className="eyebrow">{layer}</p>
              <p className="datum text-[0.625rem] text-bone-faint">
                {LAYER_NOTE[layer]}
              </p>
            </div>

            {inLayer.map((cycle) => (
              <CycleBar
                key={cycle.id}
                cycle={cycle}
                selected={selectedId === cycle.id}
                onOpen={() => onSelect(cycle.id)}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}
