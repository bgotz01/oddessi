"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useChart } from "@/components/chart-context";
import { formatBirth } from "@/lib/charts";
import { BODY_GLYPH, signGlyph } from "@/lib/symbols";

/**
 * The chart under study, docked at the top of the rail.
 * Everything below it in the app is read through whatever is selected here.
 */
export default function ChartSelector() {
  const { chart, charts, selectChart } = useChart();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  if (!chart) {
    return (
      <div className="border-y border-rule-faint px-6 py-5">
        <p className="eyebrow">Chart</p>
        <p className="datum mt-2 text-[0.75rem] text-ember">No chart</p>
        <Link
          href="/birth-chart"
          className="datum mt-3 inline-flex items-center gap-1.5 text-[0.625rem] uppercase tracking-[0.22em] text-patina transition-colors hover:text-bone"
        >
          <span aria-hidden>+</span> Add new
        </Link>
      </div>
    );
  }

  const big3 = [
    { glyph: BODY_GLYPH.Sun, sign: chart.big3.sun },
    { glyph: BODY_GLYPH.Moon, sign: chart.big3.moon },
    { glyph: BODY_GLYPH.Ascendant, sign: chart.big3.rising },
  ];

  return (
    <div className="border-y border-rule-faint px-6 py-5">
      <p className="eyebrow mb-2">Chart</p>

      {/* Custom dropdown — matches sidebar nav style */}
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          onBlur={(e) => {
            // Close when focus leaves the whole dropdown area
            if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
              setOpen(false);
            }
          }}
          className="datum flex w-full items-center justify-between border border-rule bg-surface px-2 py-1.5 text-[0.6875rem] text-bone-soft transition-colors hover:border-patina-dim hover:text-bone focus:outline-none focus:ring-1 focus:ring-patina"
        >
          <span className="truncate">{chart.name}</span>
          {/* Chevron */}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
            className={`ml-2 shrink-0 text-bone-faint transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path
              d="M2 3.5l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <div
            role="listbox"
            aria-label="Select chart"
            className="absolute left-0 right-0 top-full z-50 border border-rule bg-surface"
          >
            {charts.map((c) => {
              const active = c.id === chart.id;
              return (
                <button
                  key={c.id}
                  role="option"
                  aria-selected={active}
                  type="button"
                  onClick={() => {
                    selectChart(c.id);
                    setOpen(false);
                  }}
                  className={`datum flex w-full items-center border-l-2 px-3 py-2 text-left text-[0.6875rem] transition-colors ${active
                      ? "border-patina bg-surface-alt text-patina"
                      : "border-transparent text-bone-soft hover:border-rule hover:bg-surface-alt hover:text-bone"
                    }`}
                >
                  {c.name}
                </button>
              );
            })}

            {/* Divider + Add New */}
            <div className="border-t border-rule">
              <Link
                href="/birth-chart"
                onClick={() => setOpen(false)}
                className="datum flex w-full items-center gap-1.5 border-l-2 border-transparent px-3 py-2 text-[0.6875rem] text-bone-faint transition-colors hover:border-patina-dim hover:bg-surface-alt hover:text-patina"
              >
                <span aria-hidden className="text-[0.75rem] leading-none">+</span>
                Add new
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* The big three, as glyphs. */}
      <div className="mt-3 flex items-center gap-3">
        {big3.map((b) => (
          <span key={b.glyph} className="flex items-baseline gap-1">
            <span className="glyph text-[0.9375rem] text-bone-faint">
              {b.glyph}
            </span>
            <span className="glyph text-[0.9375rem] text-patina">
              {signGlyph(b.sign)}
            </span>
          </span>
        ))}
      </div>

      <p className="datum mt-3 text-[0.625rem] leading-relaxed text-bone-faint">
        {formatBirth(chart.birth)}
        <br />
        {chart.birth.location}
      </p>
    </div>
  );
}
