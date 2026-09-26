// components/western/cycles/developmental-arc.tsx
"use client";

import { useMemo, useState } from "react";
import { Themes } from "@/components/primitives";
import { planetMeta } from "@/lib/bodies";
import { phaseAt, type DevelopmentalArc } from "@/lib/cycles/arcs-data";

/**
 * One planet's house transit drawn as a developmental arc.
 *
 * A single house panel answers "what does this transit mean"; the arc answers
 * the question that panel flattens — what it means NOW, this far in. The
 * reader picks a house and the three periods sit side by side — from
 * fascination, through immersion, to dissolution — with the reader's own
 * period lit when their chart puts the planet there.
 *
 * Everything here is drawn from `lib/cycles/arcs-data.ts`.
 */

/** Where the reader's own chart puts the planet, when a chart is selected. */
export interface ArcPosition {
  house: number;
  /** Fraction of the way through the house transit, 0–1. */
  progress: number;
}

/**
 * The real dates of one house transit, when the reader's chart can date it.
 * `start`/`end` run from first contact to final release; `segments` are the
 * stretches actually inside the house, so the gaps between them are the
 * retrograde passes back across the cusp.
 */
export interface HouseDates {
  start: string;
  end: string;
  segments?: { start: string; end: string }[];
}

const DISPLAY = { fontFamily: "var(--font-display)" } as const;

const MS_YEAR = 365.25 * 864e5;

function monthYear(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The most evidence a column shows. The data can hold more — the chat reads
 * all of it — but the page stays sparse, so order each list best-first.
 */
const MAX_EVIDENCE = 4;

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}

/** What the nominal line says about why it is not dated. */
function chartNote(dates?: Record<number, HouseDates>): string {
  return dates && Object.keys(dates).length
    ? "this house is already behind you or beyond the cached span"
    : "select a chart to see real dates";
}

/** Early / middle / late within a phase, from where t sits inside its span. */
function stageIn(span: [number, number], t: number): string {
  const f = (t - span[0]) / (span[1] - span[0]);
  return f < 1 / 3 ? "early" : f < 2 / 3 ? "middle" : "late";
}

export default function DevelopmentalArcGuide({
  arc,
  you,
  dates,
  now,
}: {
  arc: DevelopmentalArc;
  you?: ArcPosition | null;
  /** Real transit dates by house, for the houses the chart can date. */
  dates?: Record<number, HouseDates>;
  /** Page time, so past and ahead are judged against one clock. */
  now?: number;
}) {
  const meta = planetMeta(arc.planet);
  const color = meta?.color ?? "var(--color-patina)";
  const years = arc.years;

  /** The midpoint of year y (1-based) as a fraction of the transit. */
  const tOf = (y: number) => (y - 0.5) / years;
  const yearOf = (t: number) => Math.min(years, Math.max(1, Math.floor(t * years) + 1));

  const [house, setHouse] = useState<number>(you?.house ?? 8);
  // A period the reader clicked. Null falls back to their own period when the
  // house is theirs, and to nothing lit otherwise.
  const [picked, setPicked] = useState<number | null>(null);

  const houseArc = arc.houses.find((h) => h.house === house) ?? arc.houses[0];
  const youHere = you && you.house === house ? you : null;
  const yourPhase = youHere ? phaseAt(arc, youHere.progress) : null;
  const yourIndex = yourPhase ? arc.phases.indexOf(yourPhase) : null;
  const phaseIndex = picked ?? yourIndex;

  /**
   * The house's real span, when there is one. With it the line reads in
   * calendar years and the columns in dates; without it, in the nominal
   * years of the model.
   */
  const houseDates = dates?.[house] ?? null;
  const real = useMemo(() => {
    if (!houseDates) return null;
    const s = Date.parse(`${houseDates.start}T00:00:00Z`);
    const e = Date.parse(`${houseDates.end}T00:00:00Z`);
    if (!(e > s)) return null;
    const dur = e - s;
    const at = (ms: number) => (ms - s) / dur;
    const firstYear = new Date(s).getUTCFullYear();
    const lastYear = new Date(e).getUTCFullYear();
    const yearCount = lastYear - firstYear;
    // One label per year, or every other year when the transit is long.
    const step = yearCount > 16 ? 2 : 1;
    const ticks: { year: number; pos: number }[] = [];
    for (let y = firstYear + 1; y <= lastYear; y += step) {
      const pos = at(Date.UTC(y, 0, 1));
      if (pos > 0.02 && pos < 0.98) ticks.push({ year: y, pos });
    }
    const segs = houseDates.segments ?? [];
    const gaps = segs.slice(1).map((seg, i) => ({
      from: at(Date.parse(`${segs[i].end}T00:00:00Z`)),
      to: at(Date.parse(`${seg.start}T00:00:00Z`)),
    }));
    return {
      s,
      e,
      years: dur / MS_YEAR,
      yearAt: (t: number) => new Date(s + t * dur).getUTCFullYear(),
      ticks,
      gaps,
      status: now == null ? null : e < now ? "Past" : s > now ? "Ahead" : "Now",
    };
  }, [houseDates, now]);

  /** Which years each phase covers — derived, so changing a span re-labels everything. */
  const phaseYears = useMemo(
    () =>
      arc.phases.map((p) => {
        const ys = Array.from({ length: years }, (_, i) => i + 1).filter(
          (y) => phaseAt(arc, tOf(y)).key === p.key,
        );
        return ys.length ? ([ys[0], ys[ys.length - 1]] as const) : null;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [arc, years],
  );

  const yearsLabel = (i: number) => {
    if (real) {
      const [a, b] = arc.phases[i].span;
      const from = real.yearAt(a);
      const to = real.yearAt(b);
      return from === to ? `${from}` : `${from}–${to}`;
    }
    const r = phaseYears[i];
    if (!r) return "";
    return r[0] === r[1] ? `Year ${r[0]}` : `Years ${r[0]}–${r[1]}`;
  };

  // Clicking the lit period again hands it back to the default.
  const choosePhase = (i: number) => setPicked((was) => (was === i ? null : i));

  return (
    <section className="pt-12">
      {/* ─── House picker ─────────────────────────────────────────────── */}
      <div>
        <p className="eyebrow mb-3">
          {arc.planet} · house <span className="text-bone-faint">· ~{years} years each</span>
        </p>
        <div
          role="tablist"
          aria-label={`${arc.planet} by house`}
          className="grid grid-cols-4 gap-px sm:grid-cols-6 xl:grid-cols-12"
        >
          {arc.houses.map((h) => {
            const active = h.house === house;
            const mine = you?.house === h.house;
            return (
              <button
                key={h.house}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setHouse(h.house);
                  setPicked(null);
                }}
                className="relative cursor-pointer border-t-2 px-2 pt-2.5 pb-3 text-left transition-colors hover:bg-surface-alt"
                style={{
                  borderTopColor: active ? color : "var(--color-rule)",
                  background: active ? `color-mix(in srgb, ${color} 14%, transparent)` : undefined,
                }}
              >
                <span className="flex items-baseline justify-between gap-1">
                  <span
                    className="datum text-[0.75rem] leading-none"
                    style={{ color: active ? color : "var(--color-bone-faint)" }}
                  >
                    {h.house}
                  </span>
                  {mine ? (
                    <span
                      className="datum text-[0.5625rem] leading-none uppercase"
                      style={{ color: "var(--color-signal)", letterSpacing: "0.2em" }}
                    >
                      You
                    </span>
                  ) : null}
                </span>
                <span
                  className="mt-1.5 block truncate text-[0.8125rem]"
                  style={{ ...DISPLAY, color: active ? color : "var(--color-bone)" }}
                >
                  {h.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── The house ─────────────────────────────────────────────────── */}
      <div className="mt-10 border-t border-rule pt-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="glyph text-[1.75rem] leading-none" style={{ color }}>
            {meta?.glyph}
          </span>
          <h3 className="text-[1.5rem] leading-tight text-bone" style={DISPLAY}>
            {arc.planet} in the {ordinal(houseArc.house)}
          </h3>
          <span className="text-[1.0625rem] font-light text-bone-soft">{houseArc.name}</span>
        </div>
        <div className="mt-3">
          <Themes themes={houseArc.territory} />
        </div>
        <blockquote
          className="mt-5 border-l-2 pl-4 text-[1.25rem] italic leading-snug text-bone"
          style={{ borderLeftColor: color }}
        >
          “{houseArc.impulse}”
        </blockquote>

        {/*
          ─── The three periods, side by side ───────────────────────────
          The whole transit at once. Each column is one period; the rows are shared
          through subgrid, so the evidence lines up across all three.
          Three levels only — name, interpretation, evidence. The rest of each
          house (signs, what stays dissolved, the prose) stays in the data for
          the chat.
          The reader's own period is lit; clicking a column lights that one.
        */}
        <div className="mt-10">
          {youHere && yourPhase ? (
            <p className="datum mb-2 text-[0.6875rem] text-bone-faint">
              <span style={{ color: "var(--color-signal)" }}>You</span> · year{" "}
              {real
                ? `${Math.floor(youHere.progress * real.years) + 1} of ${Math.round(real.years)}`
                : `${yearOf(youHere.progress)} of ~${years}`}{" "}
              · {stageIn(yourPhase.span, youHere.progress)} {yourPhase.name.toLowerCase()}
              {houseDates ? (
                <span className="ml-2 text-bone-soft">
                  · {monthYear(houseDates.start)} – {monthYear(houseDates.end)}
                </span>
              ) : null}
            </p>
          ) : houseDates && real ? (
            <p className="datum mb-2 text-[0.6875rem] text-bone-faint">
              {real.status ? <span className="text-bone-soft">{real.status} · </span> : null}
              {monthYear(houseDates.start)} – {monthYear(houseDates.end)} · about{" "}
              {Math.round(real.years)} years
            </p>
          ) : (
            <p className="datum mb-2 text-[0.6875rem] text-bone-faint">
              Nominal years — {chartNote(dates)}
            </p>
          )}

          {/*
            The year line — the transit at its true proportions, so the
            periods show their real lengths and the reader's position shows
            how far through they are. When the chart dates the house, it reads
            in calendar years and dims the retrograde passes back across the
            cusp; otherwise it reads in the model's nominal years. The columns
            below are equal thirds for reading; this is the one place length
            is drawn.
          */}
          <div className="mb-6">
            <div className="relative flex h-1.5 gap-0.5">
              {arc.phases.map((p, i) => (
                <span
                  key={p.key}
                  className="block h-full"
                  style={{
                    width: `${(p.span[1] - p.span[0]) * 100}%`,
                    background: i === phaseIndex ? color : "var(--color-rule)",
                    opacity: i === phaseIndex ? 0.85 : 1,
                  }}
                />
              ))}
              {real?.gaps.map((g, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 block bg-void"
                  style={{
                    left: `${g.from * 100}%`,
                    width: `${(g.to - g.from) * 100}%`,
                    opacity: 0.65,
                  }}
                />
              ))}
              {youHere ? (
                <>
                  <span
                    aria-label={`You are ${Math.round(youHere.progress * 100)}% through`}
                    className="absolute -top-1 block h-3.5 w-0.5 -translate-x-1/2"
                    style={{ left: `${youHere.progress * 100}%`, background: "var(--color-signal)" }}
                  />
                </>
              ) : null}
            </div>
            {real ? (
              <div className="relative mt-1 h-4">
                {real.ticks.map(({ year: y, pos }) => {
                  const current = youHere ? real.yearAt(youHere.progress) === y : false;
                  return (
                    <span
                      key={y}
                      className="datum absolute -translate-x-1/2 text-[0.625rem]"
                      style={{
                        left: `${pos * 100}%`,
                        color: current ? "var(--color-signal)" : "var(--color-bone-faint)",
                        fontWeight: current ? 600 : 400,
                      }}
                    >
                      {y}
                    </span>
                  );
                })}
              </div>
            ) : (
              <div
                className="mt-1 grid"
                style={{ gridTemplateColumns: `repeat(${years}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: years }, (_, i) => i + 1).map((y) => {
                  const current = youHere ? yearOf(youHere.progress) === y : false;
                  return (
                    <span
                      key={y}
                      className="datum text-center text-[0.625rem]"
                      style={{
                        color: current ? "var(--color-signal)" : "var(--color-bone-faint)",
                        fontWeight: current ? 600 : 400,
                      }}
                    >
                      {y}
                    </span>
                  );
                })}
              </div>
            )}
            {real && real.gaps.length ? (
              <p className="datum mt-1 text-[0.625rem] text-bone-faint">
                Dimmed stretches: retrograde back across the cusp
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-x-px gap-y-8 md:grid-cols-3 md:gap-y-0">
            {arc.phases.map((p, i) => {
              const active = i === phaseIndex;
              const mine = yourIndex === i;
              const period = houseArc.phases[p.key];
              return (
                <article
                  key={p.key}
                  aria-current={active ? "step" : undefined}
                  className="row-span-2 grid grid-rows-subgrid gap-0 border-t-2 px-4 pb-6"
                  style={{
                    borderTopColor: active ? color : "var(--color-rule)",
                    background: active
                      ? `color-mix(in srgb, ${color} 8%, transparent)`
                      : "var(--color-surface)",
                  }}
                >
                  {/* Head: which period, when, and the one line */}
                  <button
                    type="button"
                    onClick={() => choosePhase(i)}
                    aria-pressed={active}
                    className="block cursor-pointer self-start pt-3 text-left"
                  >
                    <span className="flex items-baseline justify-between gap-2 whitespace-nowrap">
                      <span
                        className="datum text-[0.625rem] uppercase"
                        style={{ letterSpacing: "0.22em", color: active ? color : "var(--color-bone-faint)" }}
                      >
                        {i + 1} · {p.verb}
                        {mine ? (
                          <span className="ml-2" style={{ color: "var(--color-signal)" }}>
                            You
                          </span>
                        ) : null}
                      </span>
                      <span className="datum text-[0.6875rem] text-bone-faint">{yearsLabel(i)}</span>
                    </span>
                    <span
                      className="mt-2 block text-[1.125rem]"
                      style={{ ...DISPLAY, color: active ? color : "var(--color-bone)" }}
                    >
                      {p.name}
                    </span>
                    <span className="mt-1 block text-[1.0625rem] leading-snug italic text-bone">
                      {period.summary}
                    </span>
                  </button>

                  {/* The evidence, under the question it answers */}
                  <div className="mt-4 border-t border-rule-faint pt-4">
                    <p className="eyebrow mb-3" style={active ? undefined : { color: "var(--color-bone-faint)" }}>
                      {p.question}
                    </p>
                    <PhaseEvidence index={i} houseArc={houseArc} color={active ? color : "var(--color-bone-faint)"} />
                  </div>

                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The evidence for one period, sized for a column.
 *
 * Each period has its own kind: what attracts you, which boundaries blur,
 * which illusion breaks.
 * Indexed by position rather than key so another planet's three-phase model
 * renders without changes here.
 */
function PhaseEvidence({
  index,
  houseArc,
  color,
}: {
  index: number;
  houseArc: DevelopmentalArc["houses"][number];
  color: string;
}) {
  if (index === 0) {
    return (
      <ul className="flex flex-wrap gap-1.5">
        {houseArc.fascinations.slice(0, MAX_EVIDENCE).map((f) => (
          <li key={f} className="border border-rule px-2 py-0.5 text-[0.875rem] text-bone-soft">
            {f}
          </li>
        ))}
      </ul>
    );
  }

  if (index === 1) {
    return (
      <ul className="space-y-1.5">
        {houseArc.blurs.slice(0, MAX_EVIDENCE).map(([a, b]) => (
          <li key={`${a}/${b}`} className="text-[0.9375rem] leading-snug text-bone">
            {a}
            <span aria-hidden className="datum mx-2 text-[0.75rem]" style={{ color }}>
              ⟷
            </span>
            {b}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2">
      {houseArc.revisions.slice(0, MAX_EVIDENCE).map((r) => (
        <li key={r.from} className="text-[0.9375rem] leading-snug">
          <span className="text-bone-faint">{r.from}</span>
          <span aria-hidden className="datum mx-2 text-[0.75rem]" style={{ color }}>
            →
          </span>
          <span className="text-bone">{r.to}</span>
        </li>
      ))}
    </ul>
  );
}
