// components/western/cycles/long-cycle.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import { useChart } from "@/components/chart-context";
import { useJson } from "@/lib/use-json";
import { planetMeta } from "@/lib/bodies";
import type { Band } from "@/lib/band";
import { buildHouseCycle, type CycleStep } from "@/lib/cycles/house-cycle";
import type { LongCycleSpec } from "@/lib/cycles/long-cycles";

/**
 * One planet's whole loop through the houses, drawn as a wrapped strip.
 *
 * The rows above this answer "which house is each slow planet in". This answers
 * the question a single row cannot: where in the arc that house falls.
 *
 * Twelve boxes at a readable type size do not fit a column, so the loop breaks
 * across rows the way a calendar breaks a year into weeks: each row is its own
 * stretch of the axis, read left to right, top to bottom. How many rows is not
 * fixed — it falls out of the width available and the length of the longest
 * word in the cycle's own vocabulary, which is why Jupiter lands on two and
 * Saturn, carrying "Interdependence", on three.
 *
 * The boxes are equal. An earlier version sized them by how long the planet
 * spends in each house, which is the better chart and needs a width the page
 * does not have: across two rows the slack left over after the type's minimum
 * is about 150 px, so an eleven-month house and a twenty-month one came out
 * three pixels apart. A width that encodes something nobody can see is worse
 * than one that encodes nothing, so the duration is printed on the box
 * instead, where it is legible.
 */

/**
 * Roughly how wide one character of a name is at the strip's type size.
 *
 * An estimate, not a measurement — measuring would mean rendering the strip to
 * find out how to lay the strip out. It is allowed to be an estimate because
 * of which way it fails: too high costs one extra row, too low is caught by
 * the row test below, which re-runs against the column's real width. Neither
 * clips anything. Calibrated against the widest names actually rendered —
 * "Partnership" at 107 px, "Interdependence" at 154.
 */
const NAME_PX = 10.4;
/** "Sept 2008 · 2.1 yr" — the floor under the short names, which is most of them. */
const DATE_LINE = 108;
/** The box's own horizontal padding, both sides. */
const BOX_PADDING = 20;
/** Gap between the last phase and the cap that closes the loop. */
const CAP_GAP = 10;
/** The rebirth cap is a marker, not a phase — fixed and slim. */
const CAP_BOX = 104;
/**
 * The fewest rows is the design, and what every desktop width gives. The rest
 * are the concession to a narrow column — below which the strip scrolls rather
 * than clipping the cap off the end of the loop.
 */
const MAX_ROWS = 4;

/**
 * The name word, tracked in tighter than `.inscription` sets it.
 *
 * 0.18em is right for a section heading with a whole line to itself. Across
 * twelve boxes it is the difference between a readable strip and a row that
 * needs one more break.
 */
const NAME_TYPE = { letterSpacing: "0.06em", overflowWrap: "normal" } as const;

interface AllCyclesResponse {
  bands: Band[];
}

/**
 * The narrowest this ONE box may get — a property of its own longest line, not
 * of the cycle it belongs to.
 *
 * Taking the widest name in the table and applying it to all twelve is what
 * put Saturn on three rows: every name in it fits inside 108 px except
 * "Interdependence", and that single word was raising the floor under the
 * other eleven boxes by fifty pixels each. A row is only as wide as what is
 * actually in it.
 */
function floorFor(step: CycleStep): number {
  return Math.ceil(Math.max(step.name.length * NAME_PX, DATE_LINE)) + BOX_PADDING;
}

function monthYear(iso?: string): string | null {
  if (!iso) return null;
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function fullDate(iso?: string): string | null {
  if (!iso) return null;
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

type Unit = "months" | "years";

/**
 * The unit a whole strip counts in, chosen once from its median transit.
 *
 * Deciding per box instead lets one strip mix the two — Saturn's first house
 * ran 23 months and its second 2.1 years, which are the same size and look
 * nothing alike side by side. Jupiter's houses are months and Saturn's are
 * years, and each cycle says so throughout.
 */
function cycleUnit(steps: CycleStep[]): Unit {
  const days = steps
    .filter((s) => !s.rebirth && s.days)
    .map((s) => s.days as number)
    .sort((a, b) => a - b);
  if (!days.length) return "months";
  return days[Math.floor(days.length / 2)] >= 18 * 30.44 ? "years" : "months";
}

/** How long a transit lasts, spelled out for the readout. */
function spanLabel(days: number | undefined, unit: Unit): string | null {
  if (!days) return null;
  if (unit === "years") return `about ${(days / 365.25).toFixed(1)} years`;
  const months = Math.max(1, Math.round(days / 30.44));
  return months <= 1 ? "about a month" : `about ${months} months`;
}

/** The same length, short enough to print on the box. */
function spanShort(days: number | undefined, unit: Unit): string | null {
  if (!days) return null;
  return unit === "years"
    ? `${(days / 365.25).toFixed(1)} yr`
    : `${Math.max(1, Math.round(days / 30.44))} mo`;
}

/**
 * Break the twelve phases into contiguous rows of equal count.
 *
 * Equal because the boxes are equal: balancing the rows by duration instead
 * would only matter if a row's width stood for the time it covers, and it no
 * longer does. Front-loaded when twelve does not divide evenly, so the last
 * row — the one carrying the rebirth cap — is never the longest.
 */
function splitRows<T>(steps: T[], rows: number): T[][] {
  if (rows <= 1) return [steps];
  const per = Math.ceil(steps.length / rows);
  const out: T[][] = [];
  for (let i = 0; i < steps.length; i += per) out.push(steps.slice(i, i + per));
  return out;
}

export default function LongCycle({ spec }: { spec: LongCycleSpec }) {
  const { chart } = useChart();
  const meta = planetMeta(spec.planet);
  const color = meta?.color ?? "var(--color-patina)";

  const state = useJson<AllCyclesResponse>(
    chart
      ? `/api/cycles?chartId=${encodeURIComponent(chart.id)}&view=all` +
      `&planets=${encodeURIComponent(spec.planet)}&types=house-transit` +
      `&lookback=${spec.lookbackYears}&lookahead=${spec.lookaheadYears}`
      : null,
  );

  const bands = state.status === "ready" ? state.data.bands : null;
  const cycle = useMemo(
    () => (bands ? buildHouseCycle(bands, new Date(), spec.phases, spec.rebirth) : null),
    [bands, spec],
  );

  /**
   * How many rows the loop needs, from the width it actually has.
   *
   * Measured rather than guessed at a breakpoint, because the column this sits
   * in also changes width when the sidebar collapses, which no media query
   * sees. Attached by a ref callback rather than an effect: the strip does not
   * exist until the fetch resolves, so an effect keyed on mount runs while the
   * node is still null, never sees it appear, and leaves the row count pinned
   * to its initial guess — which is right at full width and silently wrong at
   * every narrower one.
   */
  const [width, setWidth] = useState(0);

  const frame = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const layout = useMemo(() => {
    const empty = { rows: [] as CycleStep[][], columns: [] as number[] };
    if (!cycle) return empty;

    // Before the first measurement, a full-width desktop column — so the first
    // paint is already right on the layout this is usually read on.
    const column = width || 976;
    const floors = cycle.phases.map(floorFor);

    /**
     * One width per COLUMN, shared by every row.
     *
     * The widest name in a column sets that column and only that column, so
     * the boxes line up top to bottom instead of each row sizing itself. It
     * costs nothing: the widest column is the widest in whichever row it falls
     * in, so the total is the same either way.
     */
    const columnsFor = (count: number) => {
      const per = Math.ceil(floors.length / count);
      const columns: number[] = [];
      for (let i = 0; i < floors.length; i++) {
        const j = i % per;
        columns[j] = Math.max(columns[j] ?? 0, floors[i]);
      }
      return columns;
    };

    // The cap rides the last row and its column is held open on the others, so
    // it is part of every row's budget. Leaving it out of the count is what put
    // four boxes and a cap into a row with space for four.
    const fits = (count: number) =>
      columnsFor(count).reduce((sum, w) => sum + w, 0) + CAP_BOX + CAP_GAP <= column;

    let needed = MAX_ROWS;
    for (let count = 1; count <= MAX_ROWS; count++) {
      if (fits(count)) {
        needed = count;
        break;
      }
    }
    return { rows: splitRows(cycle.phases, needed), columns: columnsFor(needed) };
  }, [cycle, width]);

  const unit = useMemo(() => (cycle ? cycleUnit(cycle.phases) : "months"), [cycle]);

  // Opened box. Null means "show the phase in force", which is what a reader
  // arriving at the strip is asking about before they click anything.
  const [opened, setOpened] = useState<string | null>(null);
  const shown: CycleStep | null =
    (cycle && (opened ? cycle.steps.find((s) => s.id === opened) ?? null : cycle.current)) ??
    null;

  if (!chart) return null;

  const aside = cycle?.current
    ? `${cycle.current.phase ?? cycle.current.name} · house ${cycle.current.house}`
    : state.status === "loading"
      ? "reading"
      : undefined;

  /** One box. The cap is the same shape, fixed width, and carries no date. */
  const box = (step: CycleStep, minWidth: number) => {
    const active = shown?.id === step.id;
    const current = step.state === "current";
    const ahead = step.state === "ahead";

    return (
      <button
        key={step.id}
        type="button"
        // Clicking the open box again hands the strip back to the phase in
        // force, so there is always a way home from a box the reader opened
        // out of curiosity.
        onClick={() => setOpened((was) => (was === step.id ? null : step.id))}
        aria-pressed={active}
        aria-current={current ? "true" : undefined}
        title={
          step.start ? `${fullDate(step.start)} – ${fullDate(step.end)}` : `House ${step.house}`
        }
        className="relative cursor-pointer overflow-hidden border-t-2 px-2.5 pt-3 pb-3.5 text-left transition-colors hover:bg-surface-alt focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-patina)]"
        style={{
          flex: step.rebirth ? `0 0 ${CAP_BOX}px` : "1 1 0",
          minWidth: step.rebirth ? CAP_BOX : minWidth,
          borderTopColor: current
            ? color
            : ahead
              ? "var(--color-rule-faint)"
              : "var(--color-rule)",
          /**
           * What is spent is not what is faint.
           *
           * The past is the part of the loop the reader has actually lived,
           * and dimming it made the thing they could speak to hardest to
           * read. It carries full colour. What has not happened yet is what
           * steps back, and the house in force is lifted off both by fill,
           * ring and glow rather than by everything else being lowered.
           */
          background: current
            ? `color-mix(in srgb, ${color} 20%, transparent)`
            : active
              ? "var(--color-surface-alt)"
              : undefined,
          boxShadow: current
            ? `inset 0 0 0 1px color-mix(in srgb, ${color} 55%, transparent), 0 0 20px -8px ${color}`
            : undefined,
          opacity: ahead ? 0.5 : 1,
          // A dotted seam before the cap says the loop closes here rather
          // than continuing into a thirteenth house.
          marginLeft: step.rebirth ? CAP_GAP : undefined,
          borderLeft: step.rebirth ? "1px dotted var(--color-rule)" : undefined,
        }}
      >
        <span className="flex items-baseline gap-2">
          <span
            className="datum block text-[0.75rem] leading-none"
            style={{ color: current ? color : "var(--color-bone-faint)" }}
          >
            {step.rebirth ? "→ 1" : step.house}
          </span>
          {current ? (
            <span
              className="datum text-[0.625rem] leading-none uppercase"
              style={{ color, letterSpacing: "0.22em" }}
            >
              Now
            </span>
          ) : null}
        </span>

        <span
          className="inscription mt-2 block text-[0.875rem] leading-[1.3]"
          style={{ ...NAME_TYPE, color: current ? color : "var(--color-bone)" }}
        >
          {step.name}
        </span>

        {step.phase ? (
          <span className="mt-1.5 block text-[0.875rem] leading-tight font-light text-bone-soft">
            {step.phase}
          </span>
        ) : null}

        {step.start && !step.rebirth ? (
          <span className="datum mt-2.5 flex items-baseline justify-between gap-2 text-[0.6875rem] leading-none text-bone-faint">
            <span>{monthYear(step.start)}</span>
            {spanShort(step.days, unit) ? (
              <span style={{ opacity: 0.7 }}>{spanShort(step.days, unit)}</span>
            ) : null}
          </span>
        ) : null}

        {/* How far through the house the planet is, on the box itself. */}
        {current && step.progress != null ? (
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 block h-[3px]"
            style={{
              background: `linear-gradient(to right, ${color} ${step.progress * 100}%, color-mix(in srgb, ${color} 22%, transparent) ${step.progress * 100}%)`,
            }}
          />
        ) : null}
      </button>
    );
  };

  return (
    <details className="group mt-10 border-y border-rule">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-patina [&::-webkit-details-marker]:hidden">
        <span>
          <span className="inscription block text-[1.0625rem] text-bone">{spec.title}</span>
          <span className="datum mt-1 block text-[0.6875rem] text-bone-faint">{aside ?? spec.kind}</span>
        </span>
        <span aria-hidden="true" className="text-xl text-bone-faint transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="border-t border-rule-faint py-6">

      {/*
        What the house progression is, and the question it answers. Two cycles
        stacked on one page are easy to read as the same claim at different
        speeds; this is the line that says they are not.
      */}
      <p className="mb-4 text-[0.9375rem] font-light text-bone-soft">
        <span className="datum mr-2 text-[0.6875rem] uppercase" style={{ color, letterSpacing: "0.22em" }}>
          {spec.kind}
        </span>
        {spec.question}
      </p>

      {state.status === "loading" ? (
        <p className="datum text-[0.8125rem] text-bone-faint">Reading {spec.planet}…</p>
      ) : state.status === "error" ? (
        <p className="datum text-[0.8125rem] text-ember">{state.error}</p>
      ) : !cycle ? null : (
        <>
          {/*
            Span + overall progress — the frame the strip sits in.

            Drawn only when the cache actually holds this chart's planet. With
            nothing behind it the same row reads "— · 0% through the loop · —",
            which states a position rather than admitting it has none; the
            sequence below is still worth showing, so the frame goes and the
            strip stays.
          */}
          {cycle.start ? (
            <div className="mb-3 flex items-baseline justify-between gap-6">
              <span className="datum text-[0.75rem] text-bone-faint">
                {monthYear(cycle.start)}
              </span>
              <span className="datum text-[0.75rem]" style={{ color, opacity: 0.85 }}>
                {Math.round(cycle.progress * 100)}%
                <span className="ml-1.5 text-bone-faint">through the loop</span>
              </span>
              <span className="datum text-[0.75rem] text-bone-faint">
                {monthYear(cycle.end) ?? "—"}
              </span>
            </div>
          ) : (
            <p className="datum mb-3 text-[0.75rem] text-bone-faint">
              No {spec.planet} transits cached for this chart — the sequence, undated.
            </p>
          )}

          {/*
            The rows. `overflow-x-auto` is the floor under the row count, not
            the layout: below roughly a phone's width even four rows cannot hold
            three boxes at the minimum, and scrolling there beats clipping.
          */}
          <div
            ref={frame}
            className="flex flex-col gap-2 overflow-x-auto"
            role="group"
            aria-label={`${spec.planet}'s cycle through the houses`}
          >
            {layout.rows.map((row, i) => (
              <div key={i} className="flex items-stretch gap-px">
                {row.map((step, j) => box(step, layout.columns[j]))}
                {i === layout.rows.length - 1 ? (
                  box(cycle.rebirth, CAP_BOX)
                ) : (
                  // Holds the cap's column open on the rows above it, so the
                  // twelve boxes stay in line instead of the last row's being
                  // squeezed by one the others do not have.
                  <span aria-hidden style={{ flex: `0 0 ${CAP_BOX}px`, marginLeft: CAP_GAP }} />
                )}
              </div>
            ))}
          </div>

          {/* The opened phase, spelled out. Defaults to the one in force. */}
          {shown ? (
            <div className="mt-5 border-t border-rule-faint pt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
                <div className="flex items-baseline gap-3">
                  <span
                    className="glyph text-xl leading-none"
                    style={{ color, opacity: shown.state === "current" ? 1 : 0.5 }}
                  >
                    {meta?.glyph}
                  </span>
                  <span
                    className="inscription text-[1.0625rem]"
                    style={{ color: shown.state === "current" ? color : "var(--color-bone)" }}
                  >
                    {shown.name}
                  </span>
                  <span className="text-[0.9375rem] font-light text-bone-soft">
                    {shown.phase ? `${shown.phase}${shown.rebirth ? "" : " · "}` : ""}
                    {shown.rebirth ? null : `house ${shown.house}`}
                  </span>
                </div>

                <span className="datum text-[0.75rem] text-bone-faint">
                  {shown.start
                    ? `${fullDate(shown.start)}${shown.rebirth ? "" : ` – ${fullDate(shown.end)}`}`
                    : "not in the cached span"}
                  {!shown.rebirth && spanLabel(shown.days, unit)
                    ? ` · ${spanLabel(shown.days, unit)}`
                    : ""}
                </span>
              </div>

              <p className="mt-2 text-[1.0625rem] font-light text-bone-soft">{shown.detail}</p>
            </div>
          ) : null}
        </>
      )}
      </div>
    </details>
  );
}
