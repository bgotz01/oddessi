"use client";

import { useState } from "react";
import type { Chart, HouseCusp, Placement } from "@/lib/charts";
import {
  MODE_NOTE,
  dominanceMode,
  type HouseDominance,
} from "@/lib/dominance";
import { getHouseTitle } from "@/lib/astrology/house-categories";
import type { House } from "@/lib/astrology/house-categories";
import { HOUSE_TYPES, houseTypeStyle } from "@/lib/house-types";
import { houseInfo } from "@/lib/interpretation";
import { bodyGlyph, signGlyph } from "@/lib/symbols";

/**
 * The twelve houses as a wall of boxes — the fastest read of a chart's shape,
 * because it shows all twelve at the same size and lets the eye find the loud
 * ones instead of reading twelve paragraphs to work it out.
 *
 * Exactly one thing on this grid is allowed to be coloured: the three most
 * dominant houses, in ember. An earlier pass also drew the four angular houses
 * in patina, which was read — correctly — as "why are four houses highlighted?".
 * Colour here means rank and nothing else. Angular / succedent / cadent is a
 * standing fact about every chart ever cast, not a finding about this one, so it
 * gets a small neutral marker and a word, and stays out of the way.
 *
 * The rank marking does not depend on the score toggle. Hiding the numbers hides
 * the arithmetic, not the conclusion.
 */

/**
 * Two encodings, kept strictly apart so neither can be mistaken for the other:
 *
 *   house type → hue, on the top bar, the numeral and the marker. Categorical,
 *                always all three, never implies importance.
 *   rank       → ember, on the card border, the flag and the score. The only
 *                warm colour on the page, and the only thing that changes the
 *                card's own frame.
 */

function Score({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="datum text-[0.625rem] tracking-[0.14em] text-bone-faint uppercase">
        {label}
      </span>
      <span className="datum text-[0.6875rem] text-bone-soft">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

function HouseBox({
  cusp,
  tenants,
  dominance,
  showScores,
  selected,
  onSelect,
  openRuler,
  onToggleRuler,
}: {
  cusp: HouseCusp;
  tenants: Placement[];
  dominance: HouseDominance | undefined;
  showScores: boolean;
  selected: boolean;
  onSelect: () => void;
  /** Owned by the parent so one control can open every card at once. */
  openRuler: boolean;
  onToggleRuler: () => void;
}) {
  const info = houseInfo(cusp.number);
  const type = info?.element ?? "Cadent";
  const tone = houseTypeStyle(type);
  // Rank, not the score toggle, decides the highlight.
  const top3 = dominance !== undefined && dominance.rank <= 3;
  const ruler = dominance?.rulerPlacement;

  return (
    <div
      className={`relative flex flex-col bg-surface transition-colors ${
        top3
          ? "border border-ember-dim"
          : selected
            ? "border border-patina-dim"
            : "border border-rule"
      }`}
    >
      {/* Type bar. Runs the full width so the four cards of a type line up as a
          set even when they are scattered across the grid. */}
      <span
        aria-hidden
        className="block h-[3px] w-full"
        style={{ background: tone.color }}
      />

      {/* Rank flag for the three loudest houses. */}
      {top3 ? (
        <span className="datum absolute top-[3px] right-0 border-b border-l border-ember-dim bg-void px-2 py-1 text-[0.6875rem] text-ember">
          {dominance.rank}
        </span>
      ) : null}

      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="flex flex-1 flex-col px-4 py-5 text-center transition-colors hover:bg-surface-alt"
      >
        {/* Zone 1 — which house, in its type's hue. Kept off ember even at the
            top of the ranking: the numeral answers "what kind", the frame and
            the flag answer "how loud".

            Fixed height, with the type row pushed to its foot. House titles run
            to one or two lines, and letting that decide where the rest of the
            card begins is what made the grid look ragged — every zone below
            here now starts on the same line in all twelve cards. */}
        <span className="flex min-h-[6.75rem] flex-col">
          <span
            className="inscription text-[2.25rem] leading-none"
            style={{ color: tone.color }}
          >
            {cusp.roman}
          </span>

          {/* Tracking is pulled well in from the .inscription default: at six
              columns "COMMUNICATION" is a single unbreakable word that has to
              fit the card, and letting it hyphenate reads as a typo. */}
          <span className="inscription mt-3 text-[0.625rem] leading-snug tracking-[0.04em] text-bone">
            {getHouseTitle(cusp.number as House)}
          </span>

          <span className="mt-auto flex items-center justify-center gap-1.5 pt-2">
            <span
              className="inline-block h-2 w-2 shrink-0"
              style={{ background: tone.color }}
            />
            <span
              className="datum text-[0.5625rem] tracking-[0.18em] uppercase"
              style={{ color: tone.color }}
            >
              {type}
            </span>
          </span>
        </span>

        {/* Zone 2 — the sign on the cusp. Patina marks the symbolic layer. */}
        <span className="mt-4 flex min-h-[4.25rem] flex-col justify-center border-t border-rule pt-4">
          <span className="flex items-center justify-center gap-2">
            <span className="glyph text-[1.375rem] text-patina">
              {signGlyph(cusp.sign)}
            </span>
            <span className="text-[1.0625rem] leading-none font-light text-bone">
              {cusp.sign}
            </span>
          </span>
          <span className="datum mt-1.5 block text-[0.6875rem] text-bone-faint">
            {cusp.degree}
          </span>
        </span>

        {/* Zone 3 — tenants, as filled chips so the zone reads as a group. */}
        {tenants.length > 0 ? (
          <span className="mt-4 flex flex-wrap justify-center gap-1.5 border-t border-rule pt-4">
            {tenants.map((t) => (
              <span
                key={t.body}
                title={`${t.body} in ${t.sign} ${t.degree}`}
                className="flex items-center gap-1.5 border border-rule-faint bg-surface-alt px-2 py-1"
              >
                <span className="glyph text-[0.9375rem] text-patina">
                  {bodyGlyph(t.body)}
                </span>
                <span className="datum text-[0.5625rem] tracking-[0.1em] text-bone-soft uppercase">
                  {t.body}
                </span>
              </span>
            ))}
          </span>
        ) : null}

        {/* Zone 4 — the score, stacked so the numeral carries alone. */}
        {showScores && dominance ? (
          <span className="mt-auto block border-t border-rule pt-4">
            <span
              className={`datum block text-[1.25rem] leading-none ${
                top3 ? "text-ember" : "text-bone-soft"
              }`}
            >
              {dominance.score.toFixed(1)}
            </span>
            <span className="datum mt-1.5 block text-[0.5625rem] tracking-[0.18em] text-bone-faint uppercase">
              weight
            </span>
          </span>
        ) : null}
      </button>

      {/* Ruler — the second half of why a house scores what it does.

          Rendered for every house that has one, even when the ruling body is
          not itself in the chart, so all twelve cards finish on the same line.
          Only expandable when there is a placement to expand into. */}
      {dominance ? (
        <div className="border-t border-rule">
          <button
            type="button"
            onClick={onToggleRuler}
            aria-expanded={ruler ? openRuler : undefined}
            disabled={!ruler}
            className="flex w-full items-baseline justify-center gap-1.5 px-3 py-2.5 transition-colors hover:bg-surface-alt disabled:cursor-default disabled:hover:bg-transparent"
          >
            <span className="datum text-[0.5625rem] tracking-[0.06em] text-bone-faint uppercase">
              Ruler
            </span>
            <span className="datum text-[0.5625rem] tracking-[0.06em] text-bone uppercase">
              {dominance.ruler}
            </span>
            <span className="datum text-[0.5625rem] tracking-[0.06em] text-bone-faint uppercase">
              {ruler ? ruler.house : "—"}
            </span>
            {ruler ? (
              <span
                className={`datum text-[0.6875rem] text-bone-faint transition-transform ${
                  openRuler ? "rotate-90 text-patina" : ""
                }`}
              >
                ›
              </span>
            ) : null}
          </button>

          {openRuler && ruler ? (
            <div className="border-t border-rule px-4 py-4 text-center">
              <div className="text-[1.0625rem] font-light text-bone">
                <span className="glyph mr-1.5 text-patina">
                  {signGlyph(ruler.sign)}
                </span>
                {ruler.sign}
              </div>
              <div className="datum mt-1 text-[0.6875rem] text-bone-faint">
                {ruler.degree}
              </div>
              <div className="mt-3 space-y-1.5 border-t border-rule pt-3 text-left">
                <Score label="Occupancy" value={dominance.occupancy} />
                <Score label="Strength" value={dominance.rulerStrength} />
                <Score label="Activity" value={dominance.rulerActivity} />
              </div>
              {/* Floored at three lines so a longer note in one card cannot
                  make its footer taller than its neighbours' — which would
                  drop that card's whole stack out of line when all twelve are
                  expanded at once. */}
              <p className="mt-3 min-h-[3.5rem] text-[0.9375rem] leading-snug font-light text-bone-faint italic">
                {MODE_NOTE[dominanceMode(dominance)]}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default function HousePositions({
  chart,
  dominance,
  selected,
  onSelect,
}: {
  chart: Chart;
  dominance: HouseDominance[];
  /** The house the list below is showing, so the grid can mark it. */
  selected: number | null;
  onSelect: (house: number) => void;
}) {
  const [showScores, setShowScores] = useState(true);
  const [openRulers, setOpenRulers] = useState<ReadonlySet<number>>(new Set());

  const byHouse = new Map(dominance.map((d) => [d.house, d]));
  const tenantsOf = (house: number) =>
    chart.placements
      .filter((p) => !p.isAngle && p.houseNumber === house)
      .sort((a, b) => (a.longitude ?? 0) - (b.longitude ?? 0));

  // Only houses whose ruling body is actually in the chart have anything to
  // open, so they alone decide whether "all" is open.
  const expandable = dominance
    .filter((d) => d.rulerPlacement !== null)
    .map((d) => d.house);
  const allOpen =
    expandable.length > 0 && expandable.every((h) => openRulers.has(h));

  const toggleRuler = (house: number) =>
    setOpenRulers((current) => {
      const next = new Set(current);
      if (!next.delete(house)) next.add(house);
      return next;
    });

  const button =
    "datum border border-rule px-3 py-1.5 text-[0.625rem] tracking-[0.18em] uppercase transition-colors hover:border-rule-faint hover:text-bone-soft";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
        <p className="text-[0.9375rem] font-light text-bone-soft">
          Every house at the same size, so the loud ones have to earn it.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              setOpenRulers(allOpen ? new Set() : new Set(expandable))
            }
            aria-pressed={allOpen}
            disabled={expandable.length === 0}
            className={`${button} ${
              allOpen ? "text-patina" : "text-bone-faint"
            } disabled:cursor-default disabled:opacity-50`}
          >
            {allOpen ? "Collapse rulers" : "Expand rulers"}
          </button>
          <button
            type="button"
            onClick={() => setShowScores((v) => !v)}
            aria-pressed={showScores}
            className={`${button} text-bone-faint`}
          >
            {showScores ? "Hide scores" : "Show scores"}
          </button>
        </div>
      </div>

      {/* Real gutters, not a hairline mesh — each house has to read as its own
          container before anything inside it can. */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {chart.houses.map((cusp) => (
          <HouseBox
            key={cusp.number}
            cusp={cusp}
            tenants={tenantsOf(cusp.number)}
            dominance={byHouse.get(cusp.number)}
            showScores={showScores}
            selected={selected === cusp.number}
            onSelect={() => onSelect(cusp.number)}
            openRuler={openRulers.has(cusp.number)}
            onToggleRuler={() => toggleRuler(cusp.number)}
          />
        ))}
      </div>

      {/* Legend. Rank first, because it is the only thing carrying colour. */}
      <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-rule-faint pt-4">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 border border-ember-dim bg-surface-alt" />
          <span className="datum text-[0.625rem] tracking-[0.16em] text-ember uppercase">
            Three most dominant
          </span>
        </span>

        <span className="datum text-[0.625rem] text-rule">│</span>

        {HOUSE_TYPES.map((t) => {
          const tone = houseTypeStyle(t);
          return (
            <span key={t} className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5"
                style={{ background: tone.color }}
              />
              <span
                className="datum text-[0.625rem] tracking-[0.16em] uppercase"
                style={{ color: tone.color }}
              >
                {t} — {tone.gloss}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
