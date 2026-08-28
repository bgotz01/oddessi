"use client";

import { useEffect } from "react";
import { planetMeta } from "@/lib/planets";
import { HOUSE_NAMES } from "@/lib/astrology/standard-definitions";
import { getCycleInterpretation } from "@/lib/cycle-interpretations";
import type { CycleRowData } from "@/components/western/cycles/cycle-row";

const PLANET_ELABORATIONS: Record<string, { action: string; description: string }> = {
  Jupiter: { action: "Expansion", description: "Enlarges, spreads, amplifies" },
  Saturn: { action: "Structure", description: "Constrains, formalizes, institutionalizes" },
  Uranus: { action: "Disruption", description: "Breaks existing patterns and introduces the unexpected" },
  Neptune: { action: "Dissolution", description: "Erodes boundaries, certainty, and established narratives" },
  Pluto: { action: "Transformation", description: "Destroys/reconstitutes something at a fundamental level" },
};

export default function CycleDrawer({
  cycle,
  onClose,
}: {
  cycle: CycleRowData;
  onClose: () => void;
}) {
  const meta = planetMeta(cycle.planet);
  const color = meta?.color ?? "var(--color-patina)";
  const houseName = cycle.houseNumber ? HOUSE_NAMES[cycle.houseNumber] : null;
  const interp = cycle.houseNumber
    ? getCycleInterpretation(cycle.planet, cycle.houseNumber)
    : undefined;
  const elaboration = PLANET_ELABORATIONS[cycle.planet];

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-void/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel — full height, scrolls as one unit */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${cycle.planet} in ${cycle.house}`}
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-rule bg-surface shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="shrink-0 border-b border-rule px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className="glyph text-[2rem] leading-none"
                style={{ color }}
              >
                {meta?.glyph}
              </span>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="inscription text-[1.125rem]" style={{ color }}>
                    {cycle.planet}
                  </span>
                  <span className="inscription text-[1.125rem] text-bone">
                    {cycle.house}
                  </span>
                </div>
                {houseName && (
                  <p className="datum mt-0.5 text-[0.6875rem] tracking-[0.14em] text-bone-soft uppercase">
                    {houseName}
                  </p>
                )}
                {elaboration && (
                  <p className="mt-3 text-[1.25rem] italic leading-snug text-bone-faint">
                    {elaboration.description}
                  </p>
                )}
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

          {/* Core process + duration */}
          {interp && (
            <div className="mt-3 flex items-center gap-2">
              <span
                className="h-[6px] w-[6px] shrink-0"
                style={{ backgroundColor: color, opacity: 0.7 }}
              />
              <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
                {interp.coreProcess} · {interp.typicalDuration}
              </span>
            </div>
          )}

          {/* Significance */}
          {cycle.significance && (
            <div className="mt-4 pt-4 border-t border-rule-faint">
              <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
                {cycle.significance}
              </p>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-7 space-y-6">
          {!interp ? (
            <p className="text-[0.9375rem] text-bone-soft">
              No interpretation available for this transit.
            </p>
          ) : (
            <>
              {/* Headline + overview */}
              <section>
                <h3 className="inscription mb-3 text-[1rem] text-bone">
                  {interp.headline}
                </h3>
                <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
                  {interp.overview}
                </p>
              </section>

              {/* Themes */}
              <section>
                <p className="eyebrow mb-3 text-bone">Themes</p>
                <div className="flex flex-wrap gap-3">
                  {interp.themes.map((t, i) => (
                    <div key={t} className="flex items-center gap-3">
                      <span
                        className="datum text-[0.625rem] tracking-[0.22em] uppercase"
                        style={{ color }}
                      >
                        {t}
                      </span>
                      {i < interp.themes.length - 1 && (
                        <span
                          className="h-1 w-1 rounded-full"
                          style={{ backgroundColor: color, opacity: 0.5 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Growth + Challenges */}
              <section className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="eyebrow mb-3 text-patina">Growth</p>
                  <ul className="space-y-2">
                    {interp.gifts.map((g) => (
                      <li key={g} className="flex gap-2.5">
                        <span className="datum mt-[3px] shrink-0 text-[0.625rem] text-patina leading-5">—</span>
                        <span className="text-[0.9375rem] leading-relaxed text-bone">{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-3 text-ember">Challenges</p>
                  <ul className="space-y-2">
                    {interp.challenges.map((c) => (
                      <li key={c} className="flex gap-2.5">
                        <span className="datum mt-[3px] shrink-0 text-[0.625rem] text-ember leading-5">—</span>
                        <span className="text-[0.9375rem] leading-relaxed text-bone">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </>
          )}
        </div>

        {/* Footer rule — sticks to the bottom of the content */}
        <div className="mt-auto">
          <div
            className="h-[3px] w-full"
            style={{ background: color, opacity: 0.35 }}
          />
        </div>
      </div>
    </>
  );
}
