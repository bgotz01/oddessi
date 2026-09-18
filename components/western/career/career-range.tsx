//components/western/career/career-range.tsx
"use client";

import { useEffect, useState } from "react";
import { YEAR_MS } from "@/lib/career";
import { T } from "@/components/western/growth/growth-ui";

/**
 * Which slice of the life the curve is drawn over.
 *
 * The curve is computed in AGES — the model samples a lifespan from birth, and
 * every window, peak and floor on it is an age. A reader does not think in
 * ages. "Where was I in 2008" is the question people actually bring to a
 * vocational timeline, and answering it by first working out how old they were
 * is the kind of arithmetic an instrument should be doing for them.
 *
 * So the control is stated in calendar years and converted here, once. Nothing
 * downstream of `careerView` knows that a year was ever mentioned.
 */
export type CareerRangeMode = "default" | "all" | "custom";

export interface CareerRangeState {
  mode: CareerRangeMode;
  /** The custom span, in calendar years. Null until one is chosen. */
  custom: { from: number; to: number } | null;
}

export const CAREER_RANGE_INITIAL: CareerRangeState = { mode: "default", custom: null };

/**
 * The default window — the half-century most charts on this app are living
 * through.
 *
 * A full lifespan drawn across a thousand pixels gives each year eleven of
 * them, which is enough to see the shape of a life and not enough to read a
 * decade of it. The default is the span a reader is most likely to be asking
 * about; ALL is one click away for the shape.
 */
export const CAREER_DEFAULT_YEARS = { from: 2000, to: 2050 } as const;

/**
 * How little of a life a range may show before it stops being worth drawing.
 *
 * A chart born in 2046 overlaps the default window by four years, all of them
 * pre-vocational — a legal range that would render as a near-empty plot and
 * look broken rather than look empty. Below this, the range falls back to the
 * whole life, which is the honest thing to show when the default has nothing
 * to say about this chart.
 */
const MINIMUM_SPAN_YEARS = 8;

export interface CareerView {
  /** Age at the left edge. */
  from: number;
  /** Age at the right edge. */
  to: number;
  /** What the control should say is showing. */
  label: string;
}

/** The calendar year an age falls in, for this chart. */
export function yearOfAge(birthMs: number, age: number): number {
  return new Date(birthMs + age * YEAR_MS).getUTCFullYear();
}

/** How old this chart is on the 1st of January of a year. */
export function ageOfYear(birthMs: number, year: number): number {
  return (Date.UTC(year, 0, 1) - birthMs) / YEAR_MS;
}

/**
 * A calendar span as ages, clipped to the life the model computed.
 *
 * Returns null when the overlap is too thin to draw — see MINIMUM_SPAN_YEARS.
 */
function viewOfYears(
  birthMs: number,
  lifespan: number,
  fromYear: number,
  toYear: number,
): CareerView | null {
  const clamp = (age: number) => Math.min(Math.max(age, 0), lifespan);
  const from = clamp(ageOfYear(birthMs, fromYear));
  const to = clamp(ageOfYear(birthMs, toYear));
  if (to - from < MINIMUM_SPAN_YEARS) return null;
  return { from, to, label: `${yearOfAge(birthMs, from)}–${yearOfAge(birthMs, to)}` };
}

/** The whole modelled life. */
function allView(birthMs: number, lifespan: number): CareerView {
  return {
    from: 0,
    to: lifespan,
    label: `${yearOfAge(birthMs, 0)}–${yearOfAge(birthMs, lifespan)}`,
  };
}

/**
 * The ages the curve should be drawn between, for a given control state.
 *
 * Every fallback lands on the whole life rather than on nothing: a range that
 * cannot be honoured is a reason to widen the view, never a reason to leave
 * the reader with an empty plot.
 */
export function careerView(
  state: CareerRangeState,
  birthMs: number,
  lifespan: number,
): CareerView {
  if (state.mode === "all") return allView(birthMs, lifespan);
  if (state.mode === "custom" && state.custom) {
    return (
      viewOfYears(birthMs, lifespan, state.custom.from, state.custom.to)
      ?? allView(birthMs, lifespan)
    );
  }
  return (
    viewOfYears(birthMs, lifespan, CAREER_DEFAULT_YEARS.from, CAREER_DEFAULT_YEARS.to)
    ?? allView(birthMs, lifespan)
  );
}

/**
 * Whether the default window says anything about this chart.
 *
 * A chart born in 1890 or in 2049 has no meaningful overlap with 2000–2050,
 * and offering a button that silently shows the whole life instead is a
 * control that lies about what it does. The button is dropped for those
 * charts and ALL carries the default.
 */
export function hasDefaultRange(birthMs: number, lifespan: number): boolean {
  return Boolean(
    viewOfYears(birthMs, lifespan, CAREER_DEFAULT_YEARS.from, CAREER_DEFAULT_YEARS.to),
  );
}

function RangeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`${T.tiny} border px-2.5 py-1.5 transition-colors ${
        active
          ? "border-patina bg-patina-deep text-bone"
          : "border-rule text-bone-faint hover:text-bone"
      }`}
    >
      {children}
    </button>
  );
}

function CareerRangeModal({
  fromYear,
  toYear,
  years,
  onFromYearChange,
  onToYearChange,
  onApply,
  onClose,
}: {
  fromYear: number;
  toYear: number;
  years: number[];
  onFromYearChange: (year: number) => void;
  onToYearChange: (year: number) => void;
  onApply: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <button
        type="button"
        aria-label="Close custom date range"
        onClick={onClose}
        className="absolute inset-0 bg-void/80"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="career-range-title"
        className="relative w-full max-w-sm border border-rule bg-surface p-7 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-5">
          <h3
            id="career-range-title"
            className="inscription text-[1.25rem] tracking-[0.07em] text-bone"
          >
            Custom range
          </h3>
          <button
            type="button"
            onClick={onClose}
            className={`${T.micro} text-bone-faint transition-colors hover:text-bone`}
          >
            Close ✕
          </button>
        </div>

        {/* The years offered are the years this chart has — the curve is a
            life, and a range outside it would draw a blank plot with a
            confident axis on it. */}
        <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <label className={`${T.tiny} grid gap-2 text-bone-faint`}>
            From
            <select
              aria-label="Custom range start year"
              value={fromYear}
              onChange={(event) => onFromYearChange(Number(event.target.value))}
              className="border border-rule bg-void px-3 py-2 text-bone outline-none focus:border-patina"
            >
              {years.filter((year) => year < toYear).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </label>
          <span className="pb-2 text-bone-faint">—</span>
          <label className={`${T.tiny} grid gap-2 text-bone-faint`}>
            To
            <select
              aria-label="Custom range end year"
              value={toYear}
              onChange={(event) => onToYearChange(Number(event.target.value))}
              className="border border-rule bg-void px-3 py-2 text-bone outline-none focus:border-patina"
            >
              {years.filter((year) => year > fromYear).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-7 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className={`${T.tiny} border border-rule px-4 py-2 text-bone-faint hover:text-bone`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onApply}
            className={`${T.tiny} border border-patina bg-patina-deep px-4 py-2 text-bone`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * The three ways to frame the curve: the default half-century, the whole life,
 * and a span the reader names.
 */
export default function CareerRangeControls({
  state,
  onChange,
  birthMs,
  lifespan,
}: {
  state: CareerRangeState;
  onChange: (next: CareerRangeState) => void;
  birthMs: number;
  lifespan: number;
}) {
  const birthYear = yearOfAge(birthMs, 0);
  const lastYear = yearOfAge(birthMs, lifespan);
  const years = Array.from({ length: lastYear - birthYear + 1 }, (_, i) => birthYear + i);
  const current = careerView(state, birthMs, lifespan);

  const [open, setOpen] = useState(false);
  // Opened rather than initialised: the modal seeds itself from whatever is
  // on screen when the button is pressed.
  const [draftFrom, setDraftFrom] = useState(birthYear);
  const [draftTo, setDraftTo] = useState(lastYear);

  const offerDefault = hasDefaultRange(birthMs, lifespan);

  return (
    <div className="flex flex-wrap justify-end gap-1" role="group" aria-label="Chart date range">
      {offerDefault ? (
        <RangeButton
          active={state.mode === "default"}
          onClick={() => onChange({ ...state, mode: "default" })}
        >
          {CAREER_DEFAULT_YEARS.from}–{CAREER_DEFAULT_YEARS.to}
        </RangeButton>
      ) : null}

      {/* Named for what it is rather than for how long it is: the model's
          lifespan is a constant, and a button reading "100 years" would
          quietly become wrong the day that constant changes. */}
      <RangeButton
        active={state.mode === "all" || (!offerDefault && state.mode === "default")}
        onClick={() => onChange({ ...state, mode: "all" })}
      >
        All · {birthYear}–{lastYear}
      </RangeButton>

      <RangeButton
        active={state.mode === "custom"}
        onClick={() => {
          const from = state.custom?.from ?? Math.max(birthYear, yearOfAge(birthMs, current.from));
          const to = state.custom?.to ?? Math.min(lastYear, yearOfAge(birthMs, current.to));
          setDraftFrom(from);
          setDraftTo(to > from ? to : Math.min(lastYear, from + 1));
          setOpen(true);
        }}
      >
        {state.mode === "custom" && state.custom
          ? `${state.custom.from}–${state.custom.to}`
          : "Custom"}
      </RangeButton>

      {open ? (
        <CareerRangeModal
          fromYear={draftFrom}
          toYear={draftTo}
          years={years}
          onFromYearChange={(year) => {
            setDraftFrom(year);
            if (year >= draftTo) setDraftTo(Math.min(lastYear, year + 1));
          }}
          onToYearChange={setDraftTo}
          onApply={() => {
            onChange({ mode: "custom", custom: { from: draftFrom, to: draftTo } });
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}
