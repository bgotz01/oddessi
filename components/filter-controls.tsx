"use client";

import React from "react";

/**
 * A filter cell. Selection is carried three ways at once — a filled marker, a
 * tinted edge and fill, and full-brightness text — so it survives being read
 * quickly, in the dark, or by someone who cannot separate the planet colours.
 */
export function Toggle({
  on,
  onClick,
  label,
  glyph,
  tint,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
  glyph?: string;
  tint?: string;
}) {
  const accent = tint ?? "var(--color-patina)";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      style={{ "--tint": accent } as React.CSSProperties}
      className={`group flex items-center gap-2.5 border px-3.5 py-2 transition-colors ${
        on
          ? "border-[var(--tint)] bg-[color-mix(in_srgb,var(--tint)_16%,transparent)] text-bone hover:bg-[color-mix(in_srgb,var(--tint)_26%,transparent)]"
          : "border-rule-faint text-bone-faint hover:border-rule hover:bg-surface hover:text-bone-soft"
      }`}
    >
      <span
        aria-hidden
        className={`h-[7px] w-[7px] shrink-0 border transition-colors ${
          on
            ? "border-[var(--tint)] bg-[var(--tint)]"
            : "border-rule bg-transparent group-hover:border-bone-faint"
        }`}
      />
      {glyph ? (
        <span
          className="glyph shrink-0 text-[0.9375rem]"
          style={on ? { color: accent } : undefined}
        >
          {glyph}
        </span>
      ) : null}
      <span className="datum text-[0.6875rem] tracking-[0.18em] uppercase">
        {label}
      </span>
    </button>
  );
}

/**
 * One line of the filter panel: label and tally on the left, cells on the
 * right. The row is only as wide as its cells — nothing fills the gutter.
 */
export function FilterRow({
  label,
  count,
  total,
  tally,
  onToggleAll,
  children,
}: {
  label: string;
  count: number;
  total: number;
  /** Overrides the `n of m` line when the row measures something else. */
  tally?: string;
  onToggleAll: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-x-8 gap-y-3 border-b border-rule-faint py-4 sm:grid-cols-[8rem_1fr] sm:items-center">
      <div className="flex items-baseline gap-3 sm:flex-col sm:items-start sm:gap-1.5">
        <p className="eyebrow">{label}</p>
        <p className="datum text-[0.625rem] text-bone-faint">
          {tally ?? `${count} of ${total}`}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {children}
        <button
          type="button"
          onClick={onToggleAll}
          className="datum ml-1 px-2 py-2 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-patina"
        >
          {count === total ? "None" : "All"}
        </button>
      </div>
    </div>
  );
}
