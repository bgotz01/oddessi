"use client";

import { useEffect } from "react";
import { planetMeta } from "@/lib/bodies";
import { HOUSE_DEFINITIONS, HOUSE_NAMES } from "@/lib/astrology/standard-definitions";
import { getCycleInterpretation } from "@/lib/cycle-interpretations";
import { ARCS } from "@/lib/cycles/arcs-data";
import type { CycleRowData } from "@/components/western/cycles/cycle-row";

/**
 * What each planet does to whatever house it crosses. Fragments, not
 * sentences — the drawer is bullets throughout.
 */
const PLANET_ACTIONS: Record<string, string[]> = {
  Jupiter: ["Enlarges what is already there", "Spreads into new territory", "Amplifies confidence and appetite", "Opens doors, guarantees nothing"],
  Saturn: ["Tests what is already there", "Formalizes and asks for commitment", "Removes what cannot hold weight", "Rewards sustained effort"],
  Uranus: ["Breaks existing patterns", "Brings the unexpected", "Frees what was stuck", "Pushes toward the new"],
  Neptune: ["Softens boundaries", "Draws you toward an ideal", "Blurs fact and hope", "Dissolves certainty"],
  Pluto: ["Exposes what is underneath", "Breaks down what no longer works", "Rebuilds at the root", "Leaves nothing as it was"],
};

/** A labelled bullet list — the drawer's one building block. */
function Bullets({
  label,
  items,
  mark,
  labelClass = "text-bone",
  markClass = "text-bone-faint",
}: {
  label: string;
  items: string[];
  mark?: string;
  labelClass?: string;
  markClass?: string;
}) {
  return (
    <section>
      <p className={`eyebrow mb-3 text-[0.75rem] ${labelClass}`}>{label}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className={`datum mt-[5px] shrink-0 text-[0.75rem] leading-5 ${markClass}`}>
              {mark ?? "—"}
            </span>
            <span className="text-[1.0625rem] leading-relaxed text-bone">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

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
  const actions = PLANET_ACTIONS[cycle.planet];
  const territory = cycle.houseNumber ? HOUSE_DEFINITIONS[cycle.houseNumber] : undefined;
  // The developmental arc for this planet and house, where one is written.
  const houseArc = ARCS.find((a) => a.planet === cycle.planet)?.houses.find(
    (h) => h.house === cycle.houseNumber,
  );

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
        className="fixed right-0 top-0 z-50 h-full w-full max-w-lg overflow-y-auto border-l border-rule bg-surface shadow-2xl flex flex-col"
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
                  <span className="inscription text-[1.25rem]" style={{ color }}>
                    {cycle.planet}
                  </span>
                  <span className="inscription text-[1.25rem] text-bone">
                    {cycle.house}
                  </span>
                </div>
                {houseName && (
                  <p className="datum mt-0.5 text-[0.75rem] tracking-[0.14em] text-bone-soft uppercase">
                    {houseName}
                  </p>
                )}
                {meta && (
                  <p className="mt-2 text-[1.0625rem] text-bone-soft">{meta.description}</p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 text-[0.75rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>

        </div>

        {/* Body — bullets only */}
        <div className="px-6 py-7 space-y-7">
          {interp && (
            <section>
              <h3 className="inscription mb-3 text-[1.125rem] text-bone">{interp.headline}</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {interp.themes.map((t, i) => (
                  <div key={t} className="flex items-center gap-3">
                    <span
                      className="datum text-[0.75rem] tracking-[0.2em] uppercase"
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
          )}

          {actions && <Bullets label={`What ${cycle.planet} does`} items={actions} />}
          {territory && <Bullets label="Where it acts" items={territory} />}

          {houseArc && (
            <>
              <Bullets label="What attracts you" items={houseArc.fascinations.slice(0, 4)} />
              <Bullets
                label="What blurs"
                items={houseArc.blurs.slice(0, 4).map(([a, b]) => `${a} ⟷ ${b}`)}
              />
              <Bullets
                label="What changes"
                items={houseArc.revisions.map((r) => `${r.from} → ${r.to}`)}
              />
            </>
          )}

          {interp ? (
            <div className="grid gap-6 sm:grid-cols-2">
              <Bullets
                label="Growth"
                items={interp.gifts}
                labelClass="text-patina"
                markClass="text-patina"
              />
              <Bullets
                label="Challenges"
                items={interp.challenges}
                labelClass="text-ember"
                markClass="text-ember"
              />
            </div>
          ) : (
            <p className="text-[1.0625rem] text-bone-soft">
              No interpretation available for this transit.
            </p>
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
