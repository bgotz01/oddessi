"use client";

import { useEffect } from "react";
import HouseReading from "@/components/house-reading";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import type { HouseCusp, Placement } from "@/lib/charts";
import type { HouseDominance } from "@/lib/dominance";
import type { HouseEase } from "@/lib/ease";
import { houseTypeStyle } from "@/lib/house-types";
import { houseInfo } from "@/lib/interpretation";
import { signGlyph } from "@/lib/symbols";

/**
 * Right-side drawer showing the full reading for a single house. Clicking a
 * grid card opens this instead of scrolling to the accordion below, so the grid
 * can be read all the way through without losing your place.
 */
export default function HouseDrawer({
  cusp,
  tenants,
  dominance,
  scores,
  ease,
  onClose,
  onPrev,
  onNext,
  onExplainWeight,
  keysActive = true,
}: {
  cusp: HouseCusp;
  tenants: Placement[];
  dominance: HouseDominance | undefined;
  /** Every house's score, for the spread under the weight block. */
  scores?: number[];
  /** The second axis, shown beside weight. */
  ease?: HouseEase;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onExplainWeight?: () => void;
  /**
   * False while something is stacked on top of this drawer. Both listen on
   * window, so without it one Escape closes the thing on top *and* the drawer
   * underneath it, and arrow keys step houses the reader cannot see.
   */
  keysActive?: boolean;
}) {
  const typeTone = houseTypeStyle(houseInfo(cusp.number)?.element);
  const top3 = dominance !== undefined && dominance.rank <= 3;

  useEffect(() => {
    if (!keysActive) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [keysActive, onClose, onPrev, onNext]);

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
        aria-label={`House ${cusp.number} — ${getHouseTitle(cusp.number as House)}`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-rule bg-surface shadow-2xl"
      >
        {/* Header */}
        <div className="shrink-0 border-b border-rule px-8 py-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-baseline gap-5">
              <span
                className="inscription text-[2.5rem] leading-none"
                style={{ color: typeTone.color }}
              >
                {cusp.roman}
              </span>
              <div>
                <p className="inscription text-[0.8125rem] text-bone-faint">
                  House {cusp.number}
                </p>
                <p className="mt-1 text-[1.375rem] leading-tight text-bone">
                  {getHouseTitle(cusp.number as House)}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="glyph text-[1.25rem] text-patina">
                    {signGlyph(cusp.sign)}
                  </span>
                  <span className="text-[1.0625rem] font-light text-bone-soft">
                    {cusp.sign}
                  </span>
                  <span className="datum text-[0.6875rem] text-bone-faint">
                    {cusp.degree}
                  </span>
                </div>
                {top3 && dominance ? (
                  <p className="datum mt-1.5 text-[0.5625rem] tracking-[0.2em] text-ember uppercase">
                    Rank {dominance.rank} of 12
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
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <HouseReading
            cusp={cusp}
            tenants={tenants}
            dominance={dominance}
            scores={scores}
            ease={ease}
            onExplainWeight={onExplainWeight}
          />
        </div>

        {/* Footer nav */}
        <div className="mt-auto flex shrink-0 items-center justify-between border-t border-rule px-8 py-4">
          <button
            type="button"
            onClick={onPrev}
            className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-patina"
          >
            ← Prev
          </button>
          <span className="datum text-[0.5625rem] tracking-[0.18em] text-bone-faint uppercase">
            House {cusp.number} of 12
          </span>
          <button
            type="button"
            onClick={onNext}
            className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-patina"
          >
            Next →
          </button>
        </div>

        {/* Accent bar matching the house type colour */}
        <div
          className="h-[3px] w-full shrink-0 opacity-60"
          style={{ background: typeTone.color }}
        />
      </div>
    </>
  );
}
