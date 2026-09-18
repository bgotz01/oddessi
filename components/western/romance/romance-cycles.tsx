//components/western/romance/romance-cycles.tsx
"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { SectionHeading } from "@/components/primitives";
import {
  LOVE_LAYER_LABEL,
  LOVE_WINDOW_LABEL,
  interpretLoveWindow,
  type LoveLayer,
  type LoveMode,
  type LoveTimeline,
  type LoveWindow,
  type LoveWindowKind,
} from "@/lib/love";
import { LOVE_MODE_TINT } from "@/components/western/love/love-ui";
import { ROMANCE_T as T } from "./romance-ui";

const LANES: LoveWindowKind[] = [
  "attraction",
  "romance",
  "partnership",
  "commitment",
];

const GRAPH_MODE_LABEL: Record<LoveMode, string> = {
  opening: "Opening",
  defining: "Defining",
  seasonal: "Long cycle",
};

const MODE_EXPLANATION: Record<LoveMode, string> = {
  opening: "Jupiter increases availability or expansion around this arena. It does not mean something happened.",
  defining: "Saturn increases pressure for clarity or structure around this arena. This can affect standards, boundaries, or willingness to partner.",
  seasonal: "A progression changes the background orientation toward this arena. No external event is required.",
};

const MODE_DRAWER_SUMMARY: Record<LoveMode, string> = {
  opening: "Jupiter-led",
  defining: "Saturn-led",
  seasonal: "Progression-led",
};

const CATEGORY_DEFINITION: Record<
  LoveWindowKind,
  { question: string; notTheSameAs: string }
> = {
  attraction: {
    question: "Who or what pulls me?",
    notTheSameAs: "dating",
  },
  romance: {
    question: "How are courtship, desire, and play expressed?",
    notTheSameAs: "partnership",
  },
  partnership: {
    question: "How do I pair with another person?",
    notTheSameAs: "permanence",
  },
  commitment: {
    question: "What takes durable or defined form?",
    notTheSameAs: "simply being partnered",
  },
};

const HISTORY_START_YEAR = 2010;
const FUTURE_YEARS = 14;

function modeVisual(mode: LoveMode): CSSProperties {
  if (mode === "seasonal") {
    return {
      background:
        "repeating-linear-gradient(135deg, var(--color-patina-dim) 0 1px, transparent 1px 4px)",
      border: "1px solid var(--color-patina-dim)",
    };
  }
  return { background: LOVE_MODE_TINT[mode] };
}

const SHORT: Record<LoveWindowKind, Record<LoveMode, string>> = {
  attraction: {
    opening: "Your field of attraction widens. New tastes, people, or possibilities may register more readily.",
    defining: "Attraction is being filtered. Some preferences sharpen while others lose their pull.",
    seasonal: "Your attraction pattern is shifting gradually. The change may be clearer in retrospect.",
  },
  romance: {
    opening: "There is more room for courtship, experimentation, play, and connections that have not yet been defined.",
    defining: "Romance meets questions of pace, intention, and responsibility. What remains casual becomes easier to see.",
    seasonal: "Courtship, pleasure, and expression form the background of this longer phase.",
  },
  partnership: {
    opening: "Partnership is more available as a live area of life. This can mean a new connection, movement in an existing relationship, or more attention directed here.",
    defining: "Reciprocity, expectations, and the structure of partnership become harder to leave implicit.",
    seasonal: "Pairing and mutuality hold more emotional attention across this longer phase.",
  },
  commitment: {
    opening: "Definition and continuity are easier to consider. The structure is available if it is wanted.",
    defining: "A relationship is being asked to take a clearer shape. Formalizing, restructuring, and ending are all possible expressions.",
    seasonal: "Questions of endurance and definition gather weight gradually. What is undefined becomes harder to ignore.",
  },
};

const HOW_THIS_CAN_SHOW_UP: Record<
  LoveWindowKind,
  Record<LoveMode, { single: string; partnered: string }>
> = {
  attraction: {
    opening: {
      single: "Wider attraction; new tastes or people register more readily.",
      partnered: "Attraction and desire within or beyond the relationship become more noticeable.",
    },
    defining: {
      single: "Preferences sharpen; weaker attractions lose their pull.",
      partnered: "Desire, compatibility, or changing preferences need clearer recognition.",
    },
    seasonal: {
      single: "Attraction patterns shift gradually; changing tastes become easier to notice.",
      partnered: "The background pattern of desire changes within the relationship.",
    },
  },
  romance: {
    opening: {
      single: "More openness to dating, play, pursuit, or experimentation.",
      partnered: "More room for play, courtship, or renewed romantic expression.",
    },
    defining: {
      single: "Dating pace, intentions, and limits become clearer.",
      partnered: "Romantic effort, play, and responsibility need clearer terms.",
    },
    seasonal: {
      single: "Dating, play, and romantic expression hold more attention over time.",
      partnered: "Romantic expression becomes a longer-running relationship theme.",
    },
  },
  partnership: {
    opening: {
      single: "Pairing becomes a more available possibility.",
      partnered: "More room for development, mutuality, or shared direction.",
    },
    defining: {
      single: "Standards and requirements for partnership sharpen.",
      partnered: "Terms, expectations, and sustainability need greater clarity.",
    },
    seasonal: {
      single: "Pairing, mutuality, and what you seek from a partner become more salient.",
      partnered: "The relationship holds more emotional attention over this longer phase.",
    },
  },
  commitment: {
    opening: {
      single: "Continuity and what could support commitment become easier to consider.",
      partnered: "More room appears for shared plans, continuity, or deeper structure.",
    },
    defining: {
      single: "What you would actually commit to becomes clearer.",
      partnered: "Formalization, restructuring, or continuation needs a clearer answer.",
    },
    seasonal: {
      single: "What could endure or deserve commitment gains weight gradually.",
      partnered: "Long-term structure and continuity become a stronger background concern.",
    },
  },
};

function convergenceMeaning(window: LoveWindow): string {
  const count = window.layers.length;
  if (window.strength === "major") {
    return `${count} independent timing layers coincide in this relationship area.`;
  }
  if (window.strength === "moderate") {
    return count > 1
      ? `${count} independent timing layers point to the same relationship area.`
      : "One timing layer reaches the relationship core.";
  }
  return "One timing layer touches the relationship architecture at its edge.";
}

function convergenceLabel(window: LoveWindow): string {
  const count = window.layers.length;
  if (count >= 3) return "Multi-layer convergence";
  if (count === 2) return "Two-layer convergence";
  return window.contacts.some((contact) => contact.core)
    ? "Core contact"
    : "Single timing layer";
}

function contactDates(start: string, end: string): string {
  const format = new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${format.format(new Date(`${start}T12:00:00Z`))} – ${format.format(new Date(`${end}T12:00:00Z`))}`;
}

function layerLine(window: LoveWindow): string {
  const order: LoveLayer[] =
    window.mode === "defining"
      ? ["saturn", "jupiter", "progressedMoon", "progressedVenus"]
      : window.mode === "opening"
        ? ["jupiter", "progressedMoon", "progressedVenus", "saturn"]
        : ["progressedMoon", "progressedVenus", "jupiter", "saturn"];
  return [...window.layers]
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .map((layer) => LOVE_LAYER_LABEL[layer])
    .join(" + ");
}

function decimalYear(iso: string): number {
  const date = new Date(`${iso}T12:00:00Z`);
  const year = date.getUTCFullYear();
  const start = Date.UTC(year, 0, 1);
  const end = Date.UTC(year + 1, 0, 1);
  return year + (date.getTime() - start) / (end - start);
}

function currentYear(): number {
  const now = new Date();
  const day = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const start = Date.UTC(day.getUTCFullYear(), 0, 1);
  const end = Date.UTC(day.getUTCFullYear() + 1, 0, 1);
  return day.getUTCFullYear() + (day.getTime() - start) / (end - start);
}

function timelineTicks(
  fromYear: number,
  toYear: number,
  allYears: boolean,
): number[] {
  const span = toYear - fromYear;
  const step = allYears ? 5 : span <= 10 ? 1 : 2;
  const ticks: number[] = [];
  for (let year = fromYear; year <= toYear; year += step) ticks.push(year);
  return ticks;
}

function inRange(window: LoveWindow, fromYear: number, toYear: number): boolean {
  return decimalYear(window.end) > fromYear && decimalYear(window.start) < toYear + 1;
}

function ModeLegend() {
  const [selectedMode, setSelectedMode] = useState<LoveMode | null>(null);

  return (
    <div className="mt-4 lg:pl-[96px]">
      <div className={`${T.tiny} flex flex-wrap gap-3 text-bone-faint`}>
        {(["opening", "defining", "seasonal"] as LoveMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            aria-expanded={selectedMode === mode}
            onClick={() => setSelectedMode(selectedMode === mode ? null : mode)}
            className={`inline-flex items-center gap-2 transition-colors hover:text-bone ${
              selectedMode === mode ? "text-bone" : ""
            }`}
          >
            <span className="inline-block h-2 w-4" style={modeVisual(mode)} />
            {GRAPH_MODE_LABEL[mode]}
          </button>
        ))}
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-px bg-signal" />
          Now
        </span>
      </div>
      {selectedMode ? (
        <p className={`${T.note} mt-3 text-bone-soft`}>
          <span className="text-bone">{GRAPH_MODE_LABEL[selectedMode]} · </span>
          {MODE_EXPLANATION[selectedMode]}
        </p>
      ) : null}
    </div>
  );
}

function CycleTooltip({
  window,
  left,
  top,
  placement,
  maxHeight,
  onMouseEnter,
  onMouseLeave,
}: {
  window: LoveWindow;
  left: number;
  top: number;
  placement: "above" | "below";
  maxHeight: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const reading = interpretLoveWindow(window);
  return createPortal(
    <div
      role="tooltip"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed z-[70] w-[19rem] max-w-[calc(100vw-2rem)] overflow-y-auto border border-rule bg-surface p-4 text-left shadow-2xl"
      style={{
        left,
        top,
        maxHeight,
        transform: placement === "above" ? "translate(-50%, -100%)" : "translateX(-50%)",
      }}
    >
      <p className={`${T.micro} text-patina`}>
        {LOVE_WINDOW_LABEL[window.kind]} · {GRAPH_MODE_LABEL[window.mode]}
      </p>
      <p className={`${T.note} mt-1 text-bone`}>{reading.dates}</p>
      <p className={`${T.note} mt-3 text-bone-soft`}>{layerLine(window)}</p>
      <p className={`${T.tiny} mt-1 text-bone-faint`}>{convergenceLabel(window)}</p>
    </div>,
    document.body,
  );
}

function DateRangeModal({
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
        aria-labelledby="custom-cycle-range-title"
        className="relative w-full max-w-sm border border-rule bg-surface p-7 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-5">
          <h3
            id="custom-cycle-range-title"
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

        <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <label className={`${T.tiny} grid gap-2 text-bone-faint`}>
            From
            <select
              aria-label="Custom timeline start year"
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
              aria-label="Custom timeline end year"
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

function CycleDrawer({
  window,
  overlaps,
  onClose,
}: {
  window: LoveWindow;
  overlaps: LoveWindow[];
  onClose: () => void;
}) {
  const reading = interpretLoveWindow(window);
  const layers = layerLine(window);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cycle details"
        onClick={onClose}
        className="absolute inset-0 bg-void/80"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={`cycle-window-${window.id}-title`}
        className="absolute top-0 right-0 h-full w-full max-w-xl overflow-y-auto border-l border-rule bg-surface px-8 py-9 shadow-2xl sm:px-10"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3
              id={`cycle-window-${window.id}-title`}
              className="inscription text-[1.625rem] tracking-[0.07em] text-bone"
            >
              {LOVE_WINDOW_LABEL[window.kind]}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`${T.micro} shrink-0 text-bone-faint transition-colors hover:text-bone`}
          >
            Close ✕
          </button>
        </div>

        <div className="mt-7">
          <p className={`${T.note} text-bone-soft`}>
            <span className={`${T.micro} text-patina`}>{GRAPH_MODE_LABEL[window.mode]}</span>
            <span> — {MODE_DRAWER_SUMMARY[window.mode]}</span>
          </p>
          <p className={`${T.body} mt-2 text-bone`}>{layers}</p>
          <p className={`${T.note} mt-2`}>{reading.dates}</p>
          <p className={`${T.read} mt-6 text-bone`}>{SHORT[window.kind][window.mode]}</p>
        </div>

        <div className="mt-8 border-t border-rule pt-6">
          <p className={`${T.micro} text-patina`}>How this can show up</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="border border-rule-faint p-4">
              <p className={`${T.tiny} text-bone-faint`}>If single</p>
              <p className={`${T.note} mt-2 text-bone-soft`}>
                {HOW_THIS_CAN_SHOW_UP[window.kind][window.mode].single}
              </p>
            </div>
            <div className="border border-rule-faint p-4">
              <p className={`${T.tiny} text-bone-faint`}>If partnered</p>
              <p className={`${T.note} mt-2 text-bone-soft`}>
                {HOW_THIS_CAN_SHOW_UP[window.kind][window.mode].partnered}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-rule pt-6">
          <p className={`${T.micro} text-patina`}>{convergenceLabel(window)}</p>
          <p className={`${T.body} mt-2`}>{convergenceMeaning(window)}</p>
        </div>

        <div className="mt-8 border-t border-rule pt-6">
          <p className={`${T.micro} text-patina`}>Astrological basis</p>
          <ul className="mt-3 list-none space-y-3">
            {window.contacts.map((contact) => (
              <li key={contact.id} className="flex flex-wrap justify-between gap-x-5 border-t border-rule-faint pt-3">
                <span className={T.body}>{contact.label}</span>
                <span className={T.note}>{contactDates(contact.start, contact.end)}</span>
              </li>
            ))}
          </ul>
        </div>

        {overlaps.length ? (
          <div className="mt-10 border-t border-rule pt-6">
            <p className={`${T.micro} text-patina`}>Overlapping {LOVE_WINDOW_LABEL[window.kind].toLowerCase()} cycles</p>
            <ul className="mt-4 list-none space-y-3">
              {overlaps.map((other) => (
                <li key={other.id} className="flex flex-wrap justify-between gap-x-5 border-t border-rule-faint pt-3">
                  <span className={T.body}>{GRAPH_MODE_LABEL[other.mode]}</span>
                  <span className={T.note}>{interpretLoveWindow(other).dates}</span>
                </li>
              ))}
            </ul>
            <p className={`${T.note} mt-4`}>Both timing tones are active during the shared dates.</p>
          </div>
        ) : null}

      </aside>
    </div>
  );
}

function TimingGraphic({
  timeline,
  selected,
  onSelect,
  fromYear,
  toYear,
  allYears,
}: {
  timeline: LoveTimeline;
  selected: LoveWindow | null;
  onSelect: (window: LoveWindow) => void;
  fromYear: number;
  toYear: number;
  allYears: boolean;
}) {
  const now = useMemo(() => currentYear(), []);
  const [tooltip, setTooltip] = useState<{
    window: LoveWindow;
    left: number;
    top: number;
    placement: "above" | "below";
    maxHeight: number;
  } | null>(null);
  const [selectedKind, setSelectedKind] = useState<LoveWindowKind | null>(null);
  const tooltipHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const from = fromYear;
  const to = toYear + 1;
  const ticks = timelineTicks(fromYear, toYear, allYears);
  const at = (year: number) => `${((year - from) / (to - from)) * 100}%`;
  const drawn = timeline.windows
    .map((window) => ({
      window,
      start: Math.max(decimalYear(window.start), from),
      end: Math.min(decimalYear(window.end), to),
    }))
    .filter((entry) => entry.end > entry.start);
  const keepTooltip = () => {
    if (tooltipHideTimer.current) clearTimeout(tooltipHideTimer.current);
    tooltipHideTimer.current = null;
  };
  const hideTooltip = () => {
    keepTooltip();
    tooltipHideTimer.current = setTimeout(() => setTooltip(null), 120);
  };
  const showTooltip = (window: LoveWindow, element: HTMLButtonElement) => {
    keepTooltip();
    const bounds = element.getBoundingClientRect();
    const viewportWidth = globalThis.innerWidth;
    const viewportHeight = globalThis.innerHeight;
    const tooltipHalfWidth = Math.min(152, Math.max(0, (viewportWidth - 32) / 2));
    const left = Math.min(
      Math.max(bounds.left + bounds.width / 2, 16 + tooltipHalfWidth),
      viewportWidth - 16 - tooltipHalfWidth,
    );
    const roomAbove = bounds.top - 16;
    const roomBelow = viewportHeight - bounds.bottom - 16;
    const placement = roomAbove >= 230 || roomAbove >= roomBelow ? "above" : "below";
    const availableHeight = placement === "above" ? roomAbove : roomBelow;
    setTooltip({
      window,
      left,
      top: placement === "above" ? bounds.top - 10 : bounds.bottom + 10,
      placement,
      maxHeight: Math.max(48, availableHeight - 10),
    });
  };

  useEffect(() => () => {
    if (tooltipHideTimer.current) clearTimeout(tooltipHideTimer.current);
  }, []);

  return (
    <div className="overflow-x-auto pb-2">
      <div className="min-w-[760px]">
        <div className="relative ml-[96px] h-7 border-b border-rule-faint">
          {ticks.map((year) => (
            <span
              key={year}
              className={`${T.tiny} absolute top-0 -translate-x-1/2 text-bone-faint`}
              style={{ left: at(year) }}
            >
              {year}
            </span>
          ))}
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-[96px]">
            {ticks.map((year) => (
              <span
                key={year}
                className="absolute top-0 bottom-0 w-px bg-rule-faint"
                style={{ left: at(year) }}
              />
            ))}
            {now >= from && now <= to ? (
              <span
                className="absolute top-0 bottom-0 w-[2px] bg-signal"
                style={{ left: at(now) }}
              />
            ) : null}
          </div>

          {LANES.map((kind) => (
            <div key={kind} className="flex h-11 items-center border-b border-rule-faint/50">
              <button
                type="button"
                aria-expanded={selectedKind === kind}
                onClick={() => setSelectedKind(selectedKind === kind ? null : kind)}
                className={`${T.tiny} w-[96px] shrink-0 pr-4 text-right underline decoration-rule underline-offset-4 transition-colors hover:text-bone ${
                  selectedKind === kind ? "text-bone" : "text-bone-faint"
                }`}
              >
                {LOVE_WINDOW_LABEL[kind]}
              </button>
              <div className="relative h-full flex-1">
                <span className="pointer-events-none absolute top-1/2 right-0 left-0 h-px bg-rule-faint" />
                {drawn
                  .filter((entry) => entry.window.kind === kind)
                  .map(({ window, start, end }) => {
                    const active = selected?.id === window.id;
                    return (
                      <button
                        key={window.id}
                        type="button"
                        aria-pressed={active}
                        aria-label={`${LOVE_WINDOW_LABEL[kind]}, ${window.start} to ${window.end}`}
                        onMouseEnter={(event) => showTooltip(window, event.currentTarget)}
                        onMouseLeave={hideTooltip}
                        onFocus={(event) => showTooltip(window, event.currentTarget)}
                        onBlur={hideTooltip}
                        onClick={() => {
                          keepTooltip();
                          setTooltip(null);
                          onSelect(window);
                        }}
                        className="absolute inset-y-0 px-0.5"
                        style={{
                          left: at(start),
                          width: `${Math.max(((end - start) / (to - from)) * 100, 0.8)}%`,
                        }}
                      >
                        <span
                          className="absolute top-1/2 right-0.5 left-0.5 block h-2.5 -translate-y-1/2 overflow-hidden transition-opacity hover:opacity-70"
                          style={{
                            ...modeVisual(window.mode),
                            outline: active ? "1px solid var(--color-bone)" : undefined,
                            outlineOffset: active ? 2 : undefined,
                            opacity: window.status === "completed" && !active ? 0.35 : 1,
                          }}
                        />
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {selectedKind ? (
          <p className={`${T.note} mt-4 ml-[96px] border-y border-rule-faint py-3 text-bone-soft`}>
            <span className="text-bone">{LOVE_WINDOW_LABEL[selectedKind]} · </span>
            {CATEGORY_DEFINITION[selectedKind].question}
            <span className="text-bone-faint">
              {` · Not the same as ${CATEGORY_DEFINITION[selectedKind].notTheSameAs}.`}
            </span>
          </p>
        ) : null}
      </div>
      {tooltip ? (
        <CycleTooltip
          window={tooltip.window}
          left={tooltip.left}
          top={tooltip.top}
          placement={tooltip.placement}
          maxHeight={tooltip.maxHeight}
          onMouseEnter={keepTooltip}
          onMouseLeave={hideTooltip}
        />
      ) : null}
    </div>
  );
}

export function RomanceCyclesLoading() {
  return (
    <section className="mt-16">
      <SectionHeading compact>Cycles</SectionHeading>
      <p className={`${T.micro} text-bone-faint`}>Reading cycles…</p>
    </section>
  );
}

export default function RomanceCycles({ timeline }: { timeline: LoveTimeline }) {
  const thisYear = useMemo(() => Math.floor(currentYear()), []);
  const lastYear = thisYear + FUTURE_YEARS;
  const [fromYear, setFromYear] = useState(Math.max(HISTORY_START_YEAR, thisYear - 2));
  const [toYear, setToYear] = useState(Math.min(lastYear, thisYear + 12));
  const [customOpen, setCustomOpen] = useState(false);
  const [draftFromYear, setDraftFromYear] = useState(fromYear);
  const [draftToYear, setDraftToYear] = useState(toYear);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const visible = timeline.windows.filter((window) => inRange(window, fromYear, toYear));
  const selected = visible.find((window) => window.id === selectedId) ?? null;
  const overlapping = selected
    ? timeline.windows.filter(
        (window) =>
          window.id !== selected.id
          && window.kind === selected.kind
          && window.start < selected.end
          && window.end > selected.start,
      )
    : [];
  const yearOptions = Array.from(
    { length: lastYear - HISTORY_START_YEAR + 1 },
    (_, index) => HISTORY_START_YEAR + index,
  );
  const decades = yearOptions
    .filter((year) => year % 10 === 0 && year + 9 <= lastYear)
    .map((year) => ({ label: `${year}s`, from: year, to: year + 9 }));
  const allYearsActive = fromYear === HISTORY_START_YEAR && toYear === lastYear;
  const presetActive = allYearsActive || decades.some(
    (decade) => fromYear === decade.from && toYear === decade.to,
  );

  return (
    <section className="mt-16">
      <SectionHeading compact>Cycles</SectionHeading>

      <div className="mb-5 flex justify-end">
        <div className="flex flex-wrap justify-end gap-1" role="group" aria-label="Timeline range">
          {decades.map((decade) => {
            const active = fromYear === decade.from && toYear === decade.to;
            return (
              <button
                key={decade.from}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFromYear(decade.from);
                  setToYear(decade.to);
                  setSelectedId(null);
                  setCustomOpen(false);
                }}
                className={`${T.tiny} border px-2.5 py-1.5 ${
                  active
                    ? "border-patina bg-patina-deep text-bone"
                    : "border-rule text-bone-faint hover:text-bone"
                }`}
              >
                {decade.label}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={allYearsActive}
            onClick={() => {
              setFromYear(HISTORY_START_YEAR);
              setToYear(lastYear);
              setSelectedId(null);
              setCustomOpen(false);
            }}
            className={`${T.tiny} border px-2.5 py-1.5 ${
              allYearsActive
                ? "border-patina bg-patina-deep text-bone"
                : "border-rule text-bone-faint hover:text-bone"
            }`}
          >
            All
          </button>
          <button
            type="button"
            aria-pressed={!presetActive}
            onClick={() => {
              setDraftFromYear(fromYear);
              setDraftToYear(toYear);
              setSelectedId(null);
              setCustomOpen(true);
            }}
            className={`${T.tiny} border px-2.5 py-1.5 ${
              !presetActive
                ? "border-patina bg-patina-deep text-bone"
                : "border-rule text-bone-faint hover:text-bone"
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      <TimingGraphic
        timeline={timeline}
        selected={selected}
        onSelect={(window) => setSelectedId(window.id)}
        fromYear={fromYear}
        toYear={toYear}
        allYears={allYearsActive}
      />
      <ModeLegend />
      <p className={`${T.note} mt-3 lg:pl-[96px]`}>
        Cycles show periods of relationship emphasis, not predicted events or outcomes.
      </p>

      {visible.length === 0 ? (
        <p className={`${T.note} mt-8`}>No relationship window in this span.</p>
      ) : null}

      {selected ? (
        <CycleDrawer
          window={selected}
          overlaps={overlapping}
          onClose={() => setSelectedId(null)}
        />
      ) : null}

      {customOpen ? (
        <DateRangeModal
          fromYear={draftFromYear}
          toYear={draftToYear}
          years={yearOptions}
          onFromYearChange={(year) => {
            setDraftFromYear(year);
            if (year >= draftToYear) setDraftToYear(Math.min(lastYear, year + 1));
          }}
          onToYearChange={setDraftToYear}
          onApply={() => {
            setFromYear(draftFromYear);
            setToYear(draftToYear);
            setSelectedId(null);
            setCustomOpen(false);
          }}
          onClose={() => setCustomOpen(false)}
        />
      ) : null}
    </section>
  );
}
