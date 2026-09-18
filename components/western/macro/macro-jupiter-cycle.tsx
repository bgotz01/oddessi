// components/western/macro/macro-jupiter-cycle.tsx

"use client";

import { bodyColor } from "@/lib/bodies";
import { ELEMENT_COLOR } from "@/lib/symbols";
import {
  JUPITER_BOUNDARIES,
  JUPITER_ERAS,
  activeJupiterEraIndex,
  jupiterCycleYears,
  jupiterEraStatus,
  type JupiterEra,
  type JupiterEraElement,
} from "@/lib/astrology/macro/jupiter-eras-data";

/**
 * Jupiter's whole twelve-year loop as one bar, with the sign it is in now.
 *
 * The identity row is about the present sign; the bar is about the loop. So
 * the bar is drawn in real time, Aries 2022 to the close of Pisces 2034, and
 * each sign is a segment as long as Jupiter actually spent getting through it
 * — which is why Capricorn, cut short by a retrograde, is a sliver. The full
 * sequence page uses equal columns instead, because it has to carry a label
 * in every one; this bar carries only a glyph, and a glyph fits the sliver.
 *
 * The `now` line is `signal`, as on the cycle bars below: the reader's own
 * place in time rather than an interpretation.
 */

const ERAS: readonly JupiterEra[] = JUPITER_ERAS;
const START = JUPITER_BOUNDARIES[0];
const SPAN = JUPITER_BOUNDARIES[JUPITER_BOUNDARIES.length - 1] - START;

const pctAt = (time: number) =>
  (Math.min(Math.max(time - START, 0), SPAN) / SPAN) * 100;

/** The element colours in `lib/symbols`, keyed the way the era data spells them. */
export const jupiterElementColor = (element: JupiterEraElement) =>
  ELEMENT_COLOR[
    (element.charAt(0).toUpperCase() + element.slice(1)) as keyof typeof ELEMENT_COLOR
  ];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayMonthYear = (time: number) => {
  const d = new Date(time);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};
const monthYear = (time: number) => {
  const d = new Date(time);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};

export default function MacroJupiterCycle({
  asOf,
  onSelect,
  selectedSign,
}: {
  /** The reading's own clock, so the bar and the sky above agree on "now". */
  asOf: string;
  onSelect: (sign: string) => void;
  selectedSign: string | null;
}) {
  const now = Date.parse(asOf);
  const activeIndex = activeJupiterEraIndex(now);
  const active = activeIndex >= 0 ? ERAS[activeIndex] : null;
  const nowPct = pctAt(now);
  const { yearsIn, totalYears } = jupiterCycleYears(now);
  const jupiter = bodyColor("Jupiter");

  return (
    <div className="border-b border-rule-faint pb-5">
      {/* Identity — the sign Jupiter is in now */}
      {active ? (
        <button
          type="button"
          onClick={() => onSelect(active.sign)}
          aria-label={`Jupiter in ${active.sign} — open reading`}
          className={`block w-full cursor-pointer px-1 pt-5 pb-4 text-left outline-none transition-colors hover:bg-surface focus-visible:bg-surface ${selectedSign === active.sign ? "bg-surface" : ""}`}
        >
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <div className="flex items-baseline gap-3">
              <span className="glyph flex shrink-0 items-baseline gap-1.5 text-[1.125rem] leading-none">
                <span style={{ color: jupiter }}>♃</span>
                <span style={{ color: jupiterElementColor(active.element) }}>{active.glyph}</span>
              </span>
              <span
                className="text-[1.1875rem] leading-tight text-bone"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Jupiter
                <span className="text-bone-soft"> in {active.sign}</span>
              </span>
              <span
                className="datum text-[0.5625rem] tracking-[0.22em] uppercase"
                style={{ color: jupiterElementColor(active.element) }}
              >
                {active.element}
              </span>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="datum text-[0.5625rem] tracking-[0.2em] text-patina uppercase">
                {active.growth}
              </span>
              <span className="datum text-[0.625rem] text-bone-faint">
                since {dayMonthYear(JUPITER_BOUNDARIES[activeIndex])}
              </span>
            </div>
          </div>

          <p className="text-[1.0625rem] leading-snug text-bone-soft">
            {active.ideal}
            <span className="text-bone-faint"> — </span>
            <span className="italic">{active.question}</span>
          </p>
        </button>
      ) : (
        <p className="px-1 pt-5 pb-4 text-[0.9375rem] text-bone-faint">
          Outside the 2022–2034 loop this page has readings for.
        </p>
      )}

      <div className="px-1">
        {/* Bar — the whole loop, in real time */}
        <div className="relative h-[8px] w-full">
          {ERAS.map((era, index) => {
            const left = pctAt(JUPITER_BOUNDARIES[index]);
            const right = pctAt(JUPITER_BOUNDARIES[index + 1]);
            const status = jupiterEraStatus(index, now);
            const color = jupiterElementColor(era.element);
            const elapsed = Math.min(Math.max(nowPct - left, 0), right - left);
            return (
              <div
                key={era.sign}
                className="absolute inset-y-0"
                style={{ left: `${left}%`, width: `${right - left}%` }}
              >
                {/* Span still to come */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: color, opacity: status === "active" ? 0.3 : 0.12 }}
                />
                {/* Span already travelled */}
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${(elapsed / (right - left)) * 100}%`,
                    backgroundColor: color,
                    opacity: 0.8,
                  }}
                />
                <span className="absolute inset-y-0 right-0 w-px bg-void/60" />
              </div>
            );
          })}

          {/* The sign Jupiter is in, bracketed above and below the bar */}
          {active ? (
            <span
              aria-hidden="true"
              className="absolute -top-[4px] -bottom-[4px] border-x"
              style={{
                left: `${pctAt(JUPITER_BOUNDARIES[activeIndex])}%`,
                width: `${pctAt(JUPITER_BOUNDARIES[activeIndex + 1]) - pctAt(JUPITER_BOUNDARIES[activeIndex])}%`,
                borderColor: jupiterElementColor(active.element),
              }}
            />
          ) : null}

          {/* Now */}
          <span
            className="absolute"
            style={{
              left: `${nowPct}%`,
              top: "-6px",
              height: "20px",
              width: "1px",
              marginLeft: "-0.5px",
              backgroundColor: "var(--color-signal)",
            }}
          />
        </div>

        {/* Signs, each centred under its own stretch of the bar */}
        <div className="relative mt-2 h-6 w-full">
          {ERAS.map((era, index) => {
            const left = pctAt(JUPITER_BOUNDARIES[index]);
            const right = pctAt(JUPITER_BOUNDARIES[index + 1]);
            const isActive = index === activeIndex;
            return (
              <button
                key={era.sign}
                type="button"
                onClick={() => onSelect(era.sign)}
                title={`Jupiter in ${era.sign} · ${era.years}`}
                aria-label={`Jupiter in ${era.sign}, ${era.years} — open reading`}
                className={`glyph absolute -translate-x-1/2 cursor-pointer px-1 leading-none transition-colors hover:text-bone ${isActive ? "text-[1.0625rem]" : "text-[0.875rem] text-bone-faint"}`}
                style={{
                  left: `${(left + right) / 2}%`,
                  color: isActive || selectedSign === era.sign ? jupiterElementColor(era.element) : undefined,
                }}
              >
                {era.glyph}
              </button>
            );
          })}
        </div>

        {/* Axis */}
        <div className="mt-1 flex items-baseline justify-between">
          <span className="datum text-[0.625rem] text-bone-faint">
            {monthYear(JUPITER_BOUNDARIES[0])}
          </span>
          <span className="datum text-[0.625rem] text-bone-faint">
            <span style={{ color: "var(--color-signal)" }}>{yearsIn.toFixed(1)}</span>
            {" / "}
            {Math.round(totalYears)} years in
          </span>
          <span className="datum text-[0.625rem] text-bone-faint">
            {monthYear(JUPITER_BOUNDARIES[JUPITER_BOUNDARIES.length - 1])}
          </span>
        </div>
      </div>
    </div>
  );
}
