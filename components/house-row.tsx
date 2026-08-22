"use client";

import HouseReading from "@/components/house-reading";
import { OpenMark } from "@/components/study-panel";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import type { HouseCusp, Placement } from "@/lib/charts";
import type { HouseDominance } from "@/lib/dominance";
import type { HouseEase } from "@/lib/ease";
import { houseTypeStyle } from "@/lib/house-types";
import { houseInfo } from "@/lib/interpretation";
import { bodyGlyph, signGlyph } from "@/lib/symbols";

/**
 * One row of "The Twelve" — a summary line that expands into the full reading.
 *
 * The grid template is repeated in the table's column headers on the page; the
 * two have to stay identical or the headers stop lining up with the rows.
 */
export default function HouseRow({
  cusp,
  tenants,
  dominance,
  scores,
  ease,
  open,
  onToggle,
  anchorRef,
  onExplainWeight,
}: {
  cusp: HouseCusp;
  tenants: Placement[];
  dominance: HouseDominance | undefined;
  /** Every house's score, for the spread under the weight block. */
  scores?: number[];
  /** The second axis, shown beside weight. */
  ease?: HouseEase;
  open: boolean;
  onToggle: () => void;
  anchorRef: (el: HTMLDivElement | null) => void;
  onExplainWeight?: () => void;
}) {
  const typeTone = houseTypeStyle(houseInfo(cusp.number)?.element);

  return (
    <div ref={anchorRef} className="scroll-mt-4 border-b border-rule-faint">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-4 text-left transition-colors md:grid-cols-[2.5rem_11rem_1fr_7rem_4rem_1rem] ${open ? "text-bone" : "hover:bg-surface-alt"
          }`}
      >
        {/* Same type hue as the grid above, so a house is recognisable in both. */}
        <span
          className="inscription text-[0.875rem]"
          style={{ color: typeTone.color }}
        >
          {cusp.roman}
        </span>

        <span className="inscription text-[0.8125rem] text-bone">
          {getHouseTitle(cusp.number as House)}
        </span>

        <span className="hidden md:block">
          <span className="glyph mr-2 text-bone-faint">
            {signGlyph(cusp.sign)}
          </span>
          <span className="text-[0.9375rem] font-light text-bone">
            {cusp.sign}
          </span>
        </span>

        <span className="flex items-baseline justify-end gap-1.5">
          {tenants.length === 0 ? (
            <span className="datum text-[0.625rem] text-bone-faint">—</span>
          ) : (
            tenants.map((t) => (
              <span
                key={t.body}
                title={`${t.body} in ${t.sign}`}
                className="flex items-baseline gap-1"
              >
                <span className="glyph text-[0.9375rem] text-patina">
                  {bodyGlyph(t.body)}
                </span>
                <span className="datum hidden text-[0.5625rem] tracking-[0.1em] text-bone-soft uppercase sm:inline">
                  {t.body}
                </span>
              </span>
            ))
          )}
        </span>

        <span
          className={`datum hidden text-[0.75rem] md:block md:text-right ${dominance && dominance.rank <= 3 ? "text-ember" : "text-bone-faint"
            }`}
          title="Dominance"
        >
          {dominance ? dominance.score.toFixed(1) : "—"}
        </span>

        <span className="hidden md:block md:text-right">
          <OpenMark open={open} />
        </span>
      </button>

      {open ? (
        <div className="pb-8">
          <HouseReading
            cusp={cusp}
            tenants={tenants}
            dominance={dominance}
            scores={scores}
            ease={ease}
            onExplainWeight={onExplainWeight}
          />
        </div>
      ) : null}
    </div>
  );
}
