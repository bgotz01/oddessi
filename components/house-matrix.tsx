//components/house-matrix.tsx
"use client";

import { useState } from "react";

import type { HouseDominance } from "@/lib/dominance";
import {
  QUADRANT,
  easeLabel,
  easePoints,
  quadrantOf,
  type HouseEase,
  type EaseBand,
} from "@/lib/ease";
import { WEIGHT_AXIS_MAX, WEIGHT_HEAVY_ABOVE } from "@/lib/scoring";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";

/**
 * Weight against ease, all twelve houses at once.
 *
 * The two measures answer different questions and neither subsumes the other:
 * weight is how much of the chart runs through a house, ease is whether what
 * runs there flows or grinds. Ranked separately they read as two lists; crossed
 * they read as a shape, and the corners are the only cells worth naming.
 *
 * The bottom-left corner is the reason this view exists. A light house with a
 * bad ease is invisible to any single ranking — it is neither heavy enough to
 * be flagged nor pleasant enough to be fine — and it is routinely the most
 * useful thing on the page.
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

/**
 * Ease is plotted on a fixed domain, exactly as weight is, so two charts — or
 * two presets of the same chart — can be laid side by side.
 */
const EASE_DOMAIN = 0.6;
/** Percent of the plot's height one full EASE_DOMAIN either way occupies. */
const EASE_SPAN_PCT = 40;

/** Markers run from this many pixels at the chart's lightest house to its loudest. */
const MARKER_MIN = 22;
const MARKER_MAX = 42;

/**
 * Plot height in pixels rather than a Tailwind class, because the pull bars
 * have to stop at each marker's edge and that means comparing a percentage
 * position against a pixel box. One source for both, so they cannot drift.
 */
const PLOT_PX = 416;

/**
 * Hue says which way a corner leans, strength says how loudly.
 *
 * Engine and High Pressure are the heavy pair and take the accent at full
 * strength; Comfort and Friction say the same thing about a house that little
 * depends on, so they take it softened. Reading down a column gives you the
 * ease direction, reading across a row gives you how much rides on it.
 */
export const QUADRANT_TINT: Record<
  "engine" | "pressure" | "comfort" | "friction",
  { text: string; rule: string }
> = {
  engine: { text: "text-patina", rule: "border-patina" },
  comfort: { text: "text-patina/70", rule: "border-patina/45" },
  pressure: { text: "text-ember", rule: "border-ember" },
  friction: { text: "text-ember/70", rule: "border-ember/45" },
};

/** The band's own colour, for text that is not inside a marker. */
const BAND_TEXT: Record<EaseBand, string> = {
  flowing: "text-patina",
  grinding: "text-ember",
  balanced: "text-bone-soft",
  sparse: "text-bone-faint",
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
      className={`datum pointer-events-none absolute text-[0.6875rem] tracking-[0.2em] uppercase ${QUADRANT_TINT[corner].text} ${className}`}
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
  chartName,
  baseline,
}: {
  dominance: HouseDominance[];
  tones: HouseEase[];
  selected: number | null;
  onSelect: (house: number) => void;
  /**
   * Whose chart this is, set inside the frame.
   *
   * Both axes are absolute, so the plot is meant to be compared against another
   * person's — and a comparison is worthless if a screenshot of one cannot be
   * told from a screenshot of the other. It belongs in the figure, not only in
   * the page heading above it.
   */
  chartName?: string;
  /**
   * Half-width of the baseline band, in ease units — the config's band
   * threshold. Passed rather than read from the store so the plot stays
   * presentational: it draws what it is handed.
   */
  baseline: number;
}) {
  /**
   * The native `title` attribute was doing this job: a second's delay before it
   * appears, no styling, and it cannot show the components that make up either
   * number. Everything a house is scored on fits in a small panel, so show it.
   */
  const [hover, setHover] = useState<number | null>(null);

  const byHouse = new Map(tones.map((t) => [t.house, t]));

  /**
   * Absolute, not per-chart. Both position and marker size read off the same
   * fixed scale, so a preset that lowers every score visibly moves everything
   * left and shrinks it, instead of silently rescaling the frame and looking
   * identical.
   */
  const share = (score: number) =>
    Math.max(0, Math.min(1, score / WEIGHT_AXIS_MAX));

  // Padded so a house at either extreme is not drawn half outside the frame.
  const x = (score: number) => 5 + share(score) * 90;
  const y = (ease: number) => {
    const clamped = Math.max(-EASE_DOMAIN, Math.min(EASE_DOMAIN, ease));
    return 50 - (clamped / EASE_DOMAIN) * EASE_SPAN_PCT;
  };
  const size = (score: number) =>
    MARKER_MIN + share(score) * (MARKER_MAX - MARKER_MIN);

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

  const zero = y(0);
  const hovered = placed.find((m) => m.d.house === hover);

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
          {/* Both ends carry their value, as the weight axis does — without a
              number the reader cannot tell how far a marker has actually
              travelled, only that it has. Stacked rather than inline because
              the gutter is too narrow for label and figure on one line. */}
          <div
            className="flex w-14 shrink-0 flex-col justify-between py-1 text-right sm:w-16"
            style={{ height: `${PLOT_PX}px` }}
          >
            <span className="flex flex-col gap-0.5">
              <span className="datum text-[0.625rem] tracking-[0.16em] text-patina uppercase">
                ↑ Flow
              </span>
              <span className="datum text-[0.5625rem] tracking-[0.12em] text-bone-faint">
                +{easePoints(EASE_DOMAIN)}
              </span>
            </span>

            <span className="datum text-[0.6875rem] tracking-[0.18em] text-bone uppercase">
              Ease
            </span>

            <span className="flex flex-col gap-0.5">
              <span className="datum text-[0.5625rem] tracking-[0.12em] text-bone-faint">
                −{easePoints(EASE_DOMAIN)}
              </span>
              <span className="datum text-[0.625rem] tracking-[0.16em] text-ember uppercase">
                ↓ Grind
              </span>
            </span>
          </div>

          <div className="min-w-0 flex-1">
            {/* The plot clips its own contents so the tinted halves stop at the
              frame; the tooltip must not be clipped with them, so it lives in
              this wrapper instead — same box, no overflow rule. */}
            <div className="relative">
              <div
                className="relative w-full overflow-hidden border border-bone-faint/35 bg-surface"
                style={{ height: `${PLOT_PX}px` }}
              >
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

                {/*
                The baseline band: inside it a house is tilted toward neither
                flow nor struggle. Drawn as a muted strip rather than a pair of
                dashed edges, because what matters is that a marker is *in* the
                neutral zone, not exactly where its edges fall.
              */}
              <span
                aria-hidden
                className="absolute inset-x-0 bg-void/45"
                style={{
                  top: `${y(baseline)}%`,
                  height: `${y(-baseline) - y(baseline)}%`,
                }}
              />

              {/* One line per axis, each marking the boundary its corners are
                  decided by: ease zero across, the heavy threshold down. Band
                  edges and rank cuts were four more dashed lines saying things
                  the marker colours and the corner labels already say. */}
                <span
                  aria-hidden
                  className="absolute right-0 left-0 border-t border-bone-faint/50"
                  style={{ top: `${zero}%` }}
                />
                <span
                  aria-hidden
                  className="absolute top-0 bottom-0 border-l border-bone-faint/50"
                  style={{ left: `${x(WEIGHT_HEAVY_ABOVE)}%` }}
                />

                {chartName ? (
                  <span className="inscription pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 text-[0.6875rem] tracking-[0.1em] text-bone-faint">
                    {chartName}
                  </span>
                ) : null}

                <CornerLabel corner="comfort" className="top-3 left-3" />
                <CornerLabel corner="engine" className="top-3 right-3" />
                <CornerLabel corner="friction" className="bottom-3 left-3" />
                <CornerLabel corner="pressure" className="right-3 bottom-3" />

                {/*
                The two forces behind each net, drawn as a bar the marker sits
                inside. The patina end is where the house would land on its easy
                contacts alone, the ember end on its hard ones alone — so a
                house torn between them shows a long bar across the centre line
                while a house nothing touches shows none. Both read zero.
              */}
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
                      aria-label={`House ${d.house}, ${getHouseTitle(d.house as House)}: weight ${d.score.toFixed(1)}, ease ${easeLabel(ease.ease)}, ${ease.band}`}
                      onMouseEnter={() => setHover(d.house)}
                      onMouseLeave={() =>
                        setHover((h) => (h === d.house ? null : h))
                      }
                      onFocus={() => setHover(d.house)}
                      onBlur={() => setHover((h) => (h === d.house ? null : h))}
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

              {hovered ? (
                <div
                  aria-hidden
                  className="pointer-events-none absolute z-10 w-56 border border-bone-faint/40 bg-void px-4 py-3"
                  style={{
                    /*
                     * Opens away from whichever edge the marker is nearest.
                     * Vertically it only centres on the marker in the middle
                     * band: near the top or bottom it pins its own edge to the
                     * marker's instead, because centring a panel two thirds the
                     * height of the plot on a marker near the rim always hangs
                     * off it.
                     */
                    left:
                      hovered.px > 55 ? undefined : `calc(${hovered.px}% + 30px)`,
                    right:
                      hovered.px > 55
                        ? `calc(${100 - hovered.px}% + 30px)`
                        : undefined,
                    top: hovered.py > 60 ? undefined : `${hovered.py}%`,
                    bottom: hovered.py > 60 ? `${100 - hovered.py}%` : undefined,
                    transform:
                      hovered.py > 60
                        ? "translateY(50%)"
                        : hovered.py < 40
                          ? "translateY(-14px)"
                          : "translateY(-50%)",
                  }}
                >
                  <p className="inscription text-[0.8125rem] leading-tight text-bone">
                    {hovered.d.house} · {getHouseTitle(hovered.d.house as House)}
                  </p>

                  <div className="mt-3 flex items-baseline justify-between border-t border-rule pt-2">
                    <span className="datum text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase">
                      Weight
                    </span>
                    <span className="datum text-[0.8125rem] text-bone">
                      {hovered.d.score.toFixed(1)}
                    </span>
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {(
                      [
                        ["occupancy", hovered.d.occupancy],
                        ["ruler strength", hovered.d.rulerStrength],
                        ["ruler activity", hovered.d.rulerActivity],
                      ] as const
                    ).map(([label, v]) => (
                      <div key={label} className="flex items-baseline justify-between">
                        <span className="datum text-[0.5625rem] tracking-[0.1em] text-bone-faint uppercase">
                          {label}
                        </span>
                        <span className="datum text-[0.625rem] text-bone-soft">
                          {v.toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-baseline justify-between border-t border-rule pt-2">
                    <span className="datum text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase">
                      Ease
                    </span>
                    <span className={`datum text-[0.8125rem] ${BAND_TEXT[hovered.ease.band]}`}>
                      {easeLabel(hovered.ease.ease)}
                    </span>
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {(
                      [
                        ["aspects", hovered.ease.fromAspects],
                        ["dignity", hovered.ease.fromDignity],
                        ["tenancy", hovered.ease.fromTenancy],
                      ] as const
                    ).map(([label, v]) => (
                      <div key={label} className="flex items-baseline justify-between">
                        <span className="datum text-[0.5625rem] tracking-[0.1em] text-bone-faint uppercase">
                          {label}
                        </span>
                        <span className="datum text-[0.625rem] text-bone-soft">
                          {easeLabel(v)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Contact counts, not a derived spread. A net of zero from
                    nine-and-eight is a different house from a net of zero from
                    one-and-one, and the raw counts say so without needing a
                    normalised figure that can invert. */}
                  <div className="mt-2 flex items-baseline justify-between border-t border-rule pt-2">
                    <span className="datum text-[0.5625rem] tracking-[0.1em] text-bone-faint uppercase">
                      contacts
                    </span>
                    <span className="datum text-[0.625rem]">
                      <span className="text-patina">{hovered.ease.soft} easy</span>
                      <span className="text-bone-faint"> / </span>
                      <span className="text-ember">{hovered.ease.hard} hard</span>
                    </span>
                  </div>

                  <p className="datum mt-3 border-t border-rule pt-2 text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase">
                    {hovered.ease.band} ·{" "}
                    {QUADRANT[quadrantOf(hovered.d.score, hovered.ease.band)].label}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Horizontal axis, named the same way as the vertical one. Indented
            past the gutter so it measures the plot and not the whole panel. */}
        <div className="pl-[4.5rem] sm:pl-[5.25rem]">
          <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-rule pt-2">
            <span className="datum text-[0.5625rem] tracking-[0.14em] text-bone-soft uppercase">
              ← Light · 0
            </span>
            <span className="datum text-[0.6875rem] tracking-[0.18em] text-bone uppercase">
              Weight
            </span>
            <span className="datum text-[0.5625rem] tracking-[0.14em] text-bone-soft uppercase">
              Heavy · {WEIGHT_AXIS_MAX} →
            </span>
          </div>
          <p className="datum mt-1 text-center text-[0.5625rem] tracking-[0.14em] text-bone-faint uppercase">
            how much attention does it demand · line at {WEIGHT_HEAVY_ABOVE} ·
            baseline band ±{easePoints(baseline)}
          </p>
        </div>
      </div>

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
