//components/house-matrix.tsx
"use client";

import type { HouseDominance } from "@/lib/dominance";
import { QUADRANT, type HouseEase, type EaseBand } from "@/lib/ease";
import { useScoring } from "@/components/scoring-context";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";

/**
 * Weight against ease, all twelve houses at once.
 *
 * The two measures answer different questions and neither subsumes the other:
 * weight is how much of the chart runs through a house, ease is whether what
 * runs there flows or grinds. Ranked separately they read as two lists; crossed
 * they read as a shape, and the corners are the only cells worth naming.
 *
 * The bottom-left corner is the reason this view exists. A quiet house with a
 * bad ease is invisible to any single ranking — it is neither loud enough to be
 * flagged nor pleasant enough to be fine — and it is routinely the most useful
 * thing on the page.
 *
 * Every encoding here is pigment, size or contrast, never a glow: the house
 * rule is that light comes from colour, not from blur. Ease therefore drives
 * the hue on both the ground and the markers, and weight drives their size, so
 * the picture is readable before a single number is.
 *
 * Note the one deliberate departure from the twelve-box grid above: there,
 * ember means *rank*. Here it means *grinding*, because the ease axis is
 * labelled in ember at its low end and a marker that contradicted its own axis
 * would be unreadable. Rank needs no colour in this view — it is the x
 * position.
 */

/** Ease is plotted on a fixed domain so two charts can be held side by side. */
const EASE_DOMAIN = 0.6;

/** Markers run from this many pixels at the chart's lightest house to its loudest. */
const MARKER_MIN = 22;
const MARKER_MAX = 42;

/**
 * Hue says which way a corner leans, strength says how loudly.
 *
 * Engine and Millstone are the loud pair and take the accent at full
 * strength; Clear and Snag say the same thing about a house that little
 * depends on, so they take it softened. Reading down a column gives you the
 * ease direction, reading across a row gives you how much rides on it.
 */
const QUADRANT_TINT: Record<
  "engine" | "millstone" | "clear" | "snag",
  { text: string; rule: string }
> = {
  engine: { text: "text-patina", rule: "border-patina" },
  clear: { text: "text-patina/70", rule: "border-patina/45" },
  millstone: { text: "text-ember", rule: "border-ember" },
  snag: { text: "text-ember/70", rule: "border-ember/45" },
};

const BAND_STYLE: Record<EaseBand, { box: string; text: string }> = {
  flowing: { box: "border-patina bg-patina/20", text: "text-bone" },
  grinding: { box: "border-ember bg-ember/20", text: "text-bone" },
  balanced: { box: "border-bone-faint bg-surface-alt", text: "text-bone-soft" },
  sparse: { box: "border-bone-faint/40 bg-void", text: "text-bone-faint" },
};

function CornerLabel({
  corner,
  className,
}: {
  corner: keyof typeof QUADRANT_TINT;
  className: string;
}) {
  return (
    <span
      className={`datum pointer-events-none absolute text-[0.5625rem] tracking-[0.18em] uppercase ${QUADRANT_TINT[corner].text} ${className}`}
    >
      {QUADRANT[corner].label}
    </span>
  );
}

export default function HouseMatrix({
  dominance,
  tones,
  selected,
  onSelect,
}: {
  dominance: HouseDominance[];
  tones: HouseEase[];
  selected: number | null;
  onSelect: (house: number) => void;
}) {
  const { config } = useScoring();
  const EASE_BAND = config.ease.band;
  const byHouse = new Map(tones.map((t) => [t.house, t]));
  const scores = dominance.map((d) => d.score);
  const low = Math.min(...scores);
  const high = Math.max(...scores);
  const span = high - low || 1;

  // Padded so a house at either extreme is not drawn half outside the frame.
  const x = (score: number) => 9 + ((score - low) / span) * 82;
  const y = (ease: number) => {
    const clamped = Math.max(-EASE_DOMAIN, Math.min(EASE_DOMAIN, ease));
    return 50 - (clamped / EASE_DOMAIN) * 40;
  };
  const size = (score: number) =>
    MARKER_MIN + ((score - low) / span) * (MARKER_MAX - MARKER_MIN);

  /**
   * Two houses can land on nearly the same point — a chart with houses at 34.7
   * and 35.0 weight and −0.04 and −0.07 ease draws one marker on top of the
   * other and silently loses a house. A few relaxation passes push overlapping
   * pairs apart along the axis they are closest on. The nudge is deterministic
   * and small enough that a marker never crosses a band line it belongs inside.
   */
  const placed = dominance
    .map((d) => {
      const ease = byHouse.get(d.house);
      return ease ? { d, ease, px: x(d.score), py: y(ease.ease) } : null;
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  const MIN_X = 6.5;
  const MIN_Y = 10;
  for (let pass = 0; pass < 12; pass += 1) {
    let moved = false;
    for (let i = 0; i < placed.length; i += 1) {
      for (let j = i + 1; j < placed.length; j += 1) {
        const a = placed[i];
        const b = placed[j];
        const dx = b.px - a.px;
        const dy = b.py - a.py;
        if (Math.abs(dx) >= MIN_X || Math.abs(dy) >= MIN_Y) continue;

        // Separate on whichever axis needs the smaller correction.
        if (MIN_X - Math.abs(dx) < MIN_Y - Math.abs(dy)) {
          const push = (MIN_X - Math.abs(dx)) / 2 || MIN_X / 2;
          const dir = dx === 0 ? 1 : Math.sign(dx);
          a.px -= push * dir;
          b.px += push * dir;
        } else {
          const push = (MIN_Y - Math.abs(dy)) / 2 || MIN_Y / 2;
          const dir = dy === 0 ? 1 : Math.sign(dy);
          a.py -= push * dir;
          b.py += push * dir;
        }
        moved = true;
      }
    }
    if (!moved) break;
  }

  // The weight axis has no natural midpoint, so the loud/quiet cuts are drawn
  // where the ranking itself puts them rather than at an invented halfway mark.
  const sorted = [...dominance].sort((a, b) => a.rank - b.rank);
  const loudEdge = sorted[2]?.score;
  const quietEdge = sorted[8]?.score;

  const zero = y(0);

  return (
    <div>
      <p className="text-[0.9375rem] font-light text-bone-soft">
        How much of the chart runs through a house, against whether what runs
        there flows or grinds.
      </p>

      {/*
        The plot sits in its own padded panel. Data needs air around it — with
        the frame hard against the section's text the chart read as a table
        cell rather than as a figure.
      */}
      <div className="mt-5 border border-rule bg-void/50 p-5 sm:p-7">
        <div className="flex gap-4 sm:gap-5">
          {/*
            The whole vertical axis on one line: the measure in the middle with
            its two ends above and below it, all horizontal. Naming the ends
            beside the axis rather than above and below the frame keeps them
            from being read as captions on the chart itself.
          */}
          <div className="flex h-[26rem] w-14 shrink-0 flex-col justify-between py-1 text-right sm:w-16">
            <span className="datum text-[0.625rem] tracking-[0.16em] text-patina uppercase">
              ↑ Flow
            </span>
            <span className="datum text-[0.6875rem] tracking-[0.18em] text-bone uppercase">
              Ease
            </span>
            <span className="datum text-[0.625rem] tracking-[0.16em] text-ember uppercase">
              ↓ Grind
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="relative h-[26rem] w-full overflow-hidden border border-bone-faint/35 bg-surface">
              {/* Ground. Ease colours the field itself, so which half a house
                  sits in is legible before its marker is. */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 bg-gradient-to-t from-transparent to-patina/15"
                style={{ height: `${zero}%` }}
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-ember/15"
                style={{ top: `${zero}%` }}
              />

              {/* Band edges. Inside these two lines a house is balanced. */}
              {[EASE_BAND, -EASE_BAND].map((t) => (
                <span
                  key={t}
                  aria-hidden
                  className="absolute right-0 left-0 border-t border-dashed border-bone-faint/30"
                  style={{ top: `${y(t)}%` }}
                />
              ))}

              {/* The zero line, solid because it is the only true axis here. */}
              <span
                aria-hidden
                className="absolute right-0 left-0 border-t border-bone-faint/60"
                style={{ top: `${zero}%` }}
              />

              {/* Loud / quiet cuts. */}
              {[loudEdge, quietEdge].map((s, i) =>
                s === undefined ? null : (
                  <span
                    key={i}
                    aria-hidden
                    className="absolute top-0 bottom-0 border-l border-dashed border-bone-faint/30"
                    style={{ left: `${x(s)}%` }}
                  />
                ),
              )}

              <CornerLabel corner="clear" className="top-3 left-3" />
              <CornerLabel corner="engine" className="top-3 right-3" />
              <CornerLabel corner="snag" className="bottom-3 left-3" />
              <CornerLabel corner="millstone" className="right-3 bottom-3" />

              {placed.map(({ d, ease, px, py }) => {
                const isSelected = selected === d.house;
                const style = BAND_STYLE[ease.band];
                const box = size(d.score);

                return (
                  <button
                    key={d.house}
                    type="button"
                    onClick={() => onSelect(d.house)}
                    aria-pressed={isSelected}
                    title={`House ${d.house} — ${getHouseTitle(d.house as House)} · weight ${d.score.toFixed(1)} (rank ${d.rank}) · ease ${ease.ease.toFixed(2)} (${ease.band})`}
                    className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 transition-colors ${isSelected
                      ? "border-patina bg-patina-deep"
                      : `${style.box} hover:bg-surface-alt`
                      }`}
                    style={{
                      left: `${px}%`,
                      top: `${py}%`,
                      width: `${box}px`,
                      height: `${box}px`,
                    }}
                  >
                    <span
                      className={`inscription leading-none ${isSelected ? "text-bone" : style.text}`}
                      style={{ fontSize: `${Math.round(box * 0.42)}px` }}
                    >
                      {d.house}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Horizontal axis, named the same way as the vertical one. Indented
            past the gutter so it measures the plot and not the whole panel. */}
        <div className="pl-[4.5rem] sm:pl-[5.25rem]">
          <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-rule pt-2">
            <span className="datum text-[0.5625rem] tracking-[0.14em] text-bone-soft uppercase">
              ← Light · {low.toFixed(1)}
            </span>
            <span className="datum text-[0.6875rem] tracking-[0.18em] text-bone uppercase">
              Weight
            </span>
            <span className="datum text-[0.5625rem] tracking-[0.14em] text-bone-soft uppercase">
              Heavy · {high.toFixed(1)} →
            </span>
          </div>
          <p className="datum mt-1 text-center text-[0.5625rem] tracking-[0.14em] text-bone-faint uppercase">
            also the size of each box
          </p>
        </div>
      </div>

      {/* Corners, tinted the same as their labels on the plot. */}
      <div className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {(["engine", "millstone", "clear", "snag"] as const).map((q) => (
          <div
            key={q}
            className={`border-l-2 pl-4 ${QUADRANT_TINT[q].rule}`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p
                className={`datum text-[0.625rem] tracking-[0.18em] uppercase ${QUADRANT_TINT[q].text}`}
              >
                {QUADRANT[q].label}
              </p>
              <p className="datum text-[0.5625rem] tracking-[0.14em] text-bone-faint uppercase">
                {QUADRANT[q].coords}
              </p>
            </div>
            <p className="mt-1 text-[0.875rem] text-bone-soft">
              {QUADRANT[q].gloss}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[0.875rem] leading-relaxed text-bone-faint">
        Green leans easy and orange leans hard; the full-strength pair are the
        houses much of the chart depends on, the softened pair the ones little
        rides on. The opposites are the diagonals, not the neighbours —
        Millstone and Clear sit opposite on both axes, as do Engine and Snag,
        while Millstone and Snag sit at the same end of Ease and differ only in
        how much rides on them.
      </p>

      {/* What the two measures are. Kept to the end deliberately: the chart is
          readable from its own labels, and a definition list above it made the
          reader work through prose before seeing anything. */}
      <dl className="mt-6 grid gap-x-8 gap-y-3 border-t border-rule pt-5 sm:grid-cols-2">
        <div>
          <dt className="datum text-[0.625rem] tracking-[0.16em] text-bone uppercase">
            Weight
          </dt>
          <dd className="mt-1 text-[0.875rem] leading-relaxed text-bone-soft">
            How much of the chart runs through the house — bodies standing in
            it, and where its ruler sits and what it is wired to. Says nothing
            about whether that is pleasant.
          </dd>
        </div>
        <div>
          <dt className="datum text-[0.625rem] tracking-[0.16em] text-bone uppercase">
            Ease
          </dt>
          <dd className="mt-1 text-[0.875rem] leading-relaxed text-bone-soft">
            Whether what sits there has an easy time of it — trines and sextiles
            against squares and oppositions, and whether the signs the bodies
            occupy help or hinder them.
          </dd>
        </div>
      </dl>
    </div>
  );
}
