"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? charts.filter((c) => c.name.toLowerCase().includes(q)) : charts;
  }, [charts, query]);

  // On open: clear the filter and put the cursor on the current chart.
  const openList = () => {
    setQuery("");
    setCursor(Math.max(0, charts.findIndex((c) => c.id === chart?.id)));
    setOpen(true);
  };

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  // Keep the cursor row visible inside the scrolling list.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor, open, filtered]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const choose = (id: string) => {
    selectChart(id);
    close();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((i) => Math.max(0, i - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setCursor(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setCursor(filtered.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const c = filtered[cursor];
      if (c) choose(c.id);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

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
      <div
        className="relative"
        onBlur={(e) => {
          // Close when focus leaves the whole dropdown area
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setOpen(false);
          }
        }}
      >
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={(e) => {
            if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
              e.preventDefault();
              openList();
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
            className="absolute left-0 right-0 top-full z-50 border border-rule bg-surface"
            onKeyDown={onKeyDown}
          >
            {/* Filter — the list can run long; typing narrows it. */}
            <div className="border-b border-rule">
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                placeholder={`Search ${charts.length} charts`}
                aria-label="Search charts"
                className="datum w-full bg-transparent px-3 py-2 text-[0.6875rem] text-bone placeholder:text-bone-faint focus:outline-none"
              />
            </div>

            <div
              ref={listRef}
              role="listbox"
              aria-label="Select chart"
              className="max-h-64 overflow-y-auto overscroll-contain"
            >
              {filtered.length === 0 && (
                <p className="datum px-3 py-2 text-[0.6875rem] text-bone-faint">No match</p>
              )}
              {filtered.map((c, i) => {
                const active = c.id === chart.id;
                const cursored = i === cursor;
                return (
                  <button
                    key={c.id}
                    data-index={i}
                    role="option"
                    aria-selected={active}
                    type="button"
                    tabIndex={-1}
                    // Keep focus in the search box so blur doesn't close the list mid-click.
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => choose(c.id)}
                    className={`datum flex w-full items-center border-l-2 px-3 py-2 text-left text-[0.6875rem] transition-colors ${active
                        ? "border-patina bg-surface-alt text-patina"
                        : cursored
                          ? "border-rule bg-surface-alt text-bone"
                          : "border-transparent text-bone-soft"
                      }`}
                  >
                    <span className="truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>

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
