"use client";

import { useEffect } from "react";
import { Block, ListColumn, Pair } from "@/components/study-panel";
import { PLANETS } from "@/lib/planets";
import {
  getCycleInterpretation,
  type TransitInterpretation,
} from "@/lib/cycle-interpretations";

/**
 * The planet × house the drawer is open on.
 * `planet` is the display name ("Jupiter"), `house` is 1–12.
 */
export interface CycleTarget {
  planet: string;
  house: number;
}

const HOUSES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ROMAN = [
  "I", "II", "III", "IV", "V", "VI",
  "VII", "VIII", "IX", "X", "XI", "XII",
];

const PROCESS_COLOR: Record<TransitInterpretation["coreProcess"], string> = {
  Expand: "var(--color-patina)",
  Structure: "var(--color-ember)",
  Disrupt: "#a78bfa",   // violet
  Dissolve: "#67e8f9",  // cyan
  Transform: "#f87171", // red
};

function longDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function WesternCycleDrawer({
  target,
  /** The actual transit band for this planet in the loaded data, if any. */
  transitInfo,
  onNavigate,
  onClose,
}: {
  target: CycleTarget;
  /** Start / end dates when the planet has a known transit through this house. */
  transitInfo?: { start: string; end: string; significance?: string };
  onNavigate: (next: CycleTarget) => void;
  onClose: () => void;
}) {
  // Keyboard close
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const planet = PLANETS.find((p) => p.name === target.planet) ?? PLANETS[0];
  const interp = getCycleInterpretation(planet.name, target.house);
  const roman = ROMAN[target.house - 1] ?? String(target.house);

  // Navigate to an adjacent house (wraps around)
  function moveHouse(delta: -1 | 1) {
    const next = ((target.house - 1 + delta + 12) % 12) + 1;
    onNavigate({ planet: target.planet, house: next });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-void/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${planet.name} in House ${target.house}`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-rule bg-surface shadow-2xl"
      >
        {/* ── Header ── */}
        <div className="shrink-0 border-b border-rule px-8 py-6">
          <div className="flex items-start justify-between gap-6">
            {/* Planet glyph + house number */}
            <div className="flex items-center gap-5">
              <span
                className="glyph shrink-0 text-[2.5rem] leading-none"
                style={{ color: planet.color }}
              >
                {planet.glyph}
              </span>
              <div>
                <p
                  className="inscription text-[0.8125rem]"
                  style={{ color: planet.color }}
                >
                  {planet.name}
                </p>
                <p className="mt-1 text-[1.75rem] leading-none text-bone">
                  House {roman}
                </p>
                {interp ? (
                  <p className="mt-1.5 text-[0.9375rem] font-light text-bone-soft">
                    {interp.headline}
                  </p>
                ) : null}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>

          {/* Transit dates, if known */}
          {transitInfo ? (
            <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-rule-faint pt-4">
              <span className="datum text-[0.6875rem] text-bone-faint">
                {longDate(transitInfo.start)} → {longDate(transitInfo.end)}
              </span>
              {interp ? (
                <span
                  className="datum border-l pl-2 text-[0.625rem] tracking-[0.2em] uppercase"
                  style={{
                    color: PROCESS_COLOR[interp.coreProcess],
                    borderColor: PROCESS_COLOR[interp.coreProcess],
                  }}
                >
                  {interp.coreProcess}
                </span>
              ) : null}
            </div>
          ) : interp ? (
            <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-rule-faint pt-4">
              <span className="datum text-[0.6875rem] text-bone-faint">
                {interp.typicalDuration}
              </span>
              <span
                className="datum border-l pl-2 text-[0.625rem] tracking-[0.2em] uppercase"
                style={{
                  color: PROCESS_COLOR[interp.coreProcess],
                  borderColor: PROCESS_COLOR[interp.coreProcess],
                }}
              >
                {interp.coreProcess}
              </span>
            </div>
          ) : null}
        </div>

        {/* ── Selectors ── */}
        <div className="shrink-0 border-b border-rule px-8 py-4 space-y-4">
          {/* Planet row */}
          <div>
            <p className="eyebrow mb-2 text-[0.5625rem]">Planet</p>
            <div className="flex flex-wrap gap-2">
              {PLANETS.map((p) => {
                const on = p.name === target.planet;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => onNavigate({ planet: p.name, house: target.house })}
                    aria-pressed={on}
                    className={`flex items-center gap-1.5 border px-2.5 py-1.5 text-[0.625rem] tracking-[0.16em] uppercase transition-colors ${
                      on
                        ? "border-[var(--tint)] bg-[color-mix(in_srgb,var(--tint)_18%,transparent)] text-bone"
                        : "border-rule-faint text-bone-faint hover:border-rule hover:text-bone-soft"
                    }`}
                    style={{ "--tint": p.color } as React.CSSProperties}
                  >
                    <span className="glyph text-[0.9rem]" style={{ color: on ? p.color : undefined }}>
                      {p.glyph}
                    </span>
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* House row */}
          <div>
            <p className="eyebrow mb-2 text-[0.5625rem]">House</p>
            <div className="flex flex-wrap gap-1.5">
              {HOUSES.map((h) => {
                const on = h === target.house;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => onNavigate({ planet: target.planet, house: h })}
                    aria-pressed={on}
                    className={`datum w-8 border py-1.5 text-center text-[0.625rem] tracking-[0.12em] transition-colors ${
                      on
                        ? "border-patina bg-[color-mix(in_srgb,var(--color-patina)_18%,transparent)] text-bone"
                        : "border-rule-faint text-bone-faint hover:border-rule hover:text-bone-soft"
                    }`}
                  >
                    {ROMAN[h - 1]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        {interp ? (
          <div className="space-y-8 px-8 py-8">
            <Block title="Overview">
              <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
                {interp.overview}
              </p>
            </Block>

            {interp.themes.length > 0 ? (
              <Block title="Themes">
                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {interp.themes.map((t) => (
                    <span
                      key={t}
                      className="datum text-[0.625rem] tracking-[0.22em] uppercase text-bone-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Block>
            ) : null}

            <Block title="What it brings / what it costs">
              <Pair>
                <ListColumn label="What opens" items={interp.gifts} tone="patina" />
                <ListColumn label="What it demands" items={interp.challenges} tone="ember" />
              </Pair>
            </Block>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center px-8 py-12">
            <p className="font-light text-bone-faint">
              No interpretation for {planet.name} in House {target.house}.
            </p>
          </div>
        )}

        {/* ── House nav footer ── */}
        <div className="mt-auto shrink-0 flex items-center justify-between border-t border-rule px-8 py-4">
          <button
            type="button"
            onClick={() => moveHouse(-1)}
            className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-patina"
          >
            ← House {ROMAN[((target.house - 2 + 12) % 12)]}
          </button>
          <span className="datum text-[0.5625rem] tracking-[0.18em] text-bone-faint uppercase">
            {planet.name}
          </span>
          <button
            type="button"
            onClick={() => moveHouse(1)}
            className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-patina"
          >
            House {ROMAN[(target.house % 12)]} →
          </button>
        </div>

        {/* Colour bar */}
        <div
          className="h-[3px] w-full shrink-0 opacity-60"
          style={{ backgroundColor: planet.color }}
        />
      </div>
    </>
  );
}
