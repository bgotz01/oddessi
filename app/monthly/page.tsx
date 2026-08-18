"use client";

import { useEffect, useState } from "react";
import { PageTitle } from "@/components/primitives";
import type { MonthlySummary } from "@/lib/monthly";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ── City → country color ──────────────────────────────────────────────────────
// One dominant flag color per country, muted to suit the dark palette.

const GEO_COLORS: Record<string, string> = {
  // Colombia — yellow from the flag
  "medellín": "#c9a23a",
  // Brazil — green from the flag
  "rio de janeiro": "#4a9e6b",
  "são paulo": "#4a9e6b",
  "sao paulo": "#4a9e6b",
  // Thailand — deep blue stripe
  "thailand": "#5b82b8",
  // UAE — red from the flag
  "dubai": "#b85b5b",
  // Greece — blue from the flag
  "greece": "#4a72a8",
  // Montenegro — gold from the coat of arms
  "montenegro": "#c9a23a",
  // Spain — red from the flag
  "madrid": "#c05a5a",
  // Argentina — sky blue
  "buenos aires": "#6aadd5",
  // Mexico — green from the flag
  "tulum": "#4a9e6b",
  // Indonesia — white (lower half of the flag)
  "bali": "#c8cdd8",
  // USA — blue
  "miami": "#5b82b8",
};

/**
 * Resolves a color for a geography string. The geography field may contain
 * multiple cities separated by " · " — use the first one for the color.
 */
function geoColor(geography: string): string {
  const first = geography.split("·")[0].trim().toLowerCase();
  return GEO_COLORS[first] ?? "#808898"; // bone-faint fallback
}

// ── Quarter row (3 months) ───────────────────────────────────────────────────

function QuarterRow({ summaries }: { summaries: MonthlySummary[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = openId ? (summaries.find((s) => s.id === openId) ?? null) : null;

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="mb-1">
      {/* ── 3-column header strip — always 3 cols, empty cells pad short rows ── */}
      <div className="grid grid-cols-3 border-b border-rule">
        {summaries.map((s) => {
          const label = MONTH_NAMES[(s.month - 1) % 12];
          const isOpen = s.id === openId;
          const secondary = s.projects
            .split(";")
            .slice(1)
            .map((p: string) => p.trim())
            .filter(Boolean);

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggle(s.id)}
              aria-expanded={isOpen}
              className={[
                "group flex flex-col gap-3 border-r border-rule last:border-r-0 px-5 py-5",
                "text-left transition-colors",
                isOpen ? "bg-surface" : "hover:bg-surface/40",
              ].join(" ")}
            >
              {/* Month name + chevron */}
              <div className="flex items-baseline justify-between gap-2">
                <span className="inscription text-[1rem] text-bone">
                  {label}
                </span>
                <span
                  aria-hidden
                  className={[
                    "text-[0.625rem] text-patina-dim transition-transform",
                    "group-hover:text-patina",
                    isOpen ? "rotate-90" : "",
                  ].join(" ")}
                >
                  ▸
                </span>
              </div>

              {/* Geography */}
              {s.geography && (
                <p
                  className="datum text-[0.6875rem]"
                  style={{ color: geoColor(s.geography) }}
                >
                  {s.geography}
                </p>
              )}

              {/* Primary project */}
              <div className="border-l-2 border-patina pl-3">
                <span className="datum block text-[0.625rem] uppercase tracking-[0.18em] text-patina-dim mb-1">
                  Primary
                </span>
                <span className="block text-[1.1875rem] leading-snug text-bone">
                  {s.primaryProject}
                </span>
              </div>

              {/* Secondary projects */}
              {secondary.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                  {secondary.map((p: string) => (
                    <span
                      key={p}
                      className="datum text-[0.625rem] uppercase tracking-[0.12em] text-bone-faint/60"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}

        {/* Pad to always fill 3 columns */}
        {Array.from({ length: 3 - summaries.length }).map((_, i) => (
          <div key={`empty-${i}`} className="border-r border-rule last:border-r-0 px-5 py-5" />
        ))}
      </div>

      {/* ── Full-width expansion panel ── */}
      {active && (
        <div className="border-b border-rule bg-surface px-6 py-6">
          {/* Header */}
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-5">
            <span className="inscription text-[1rem] text-bone">
              {MONTH_NAMES[(active.month - 1) % 12]}
            </span>
            <span className="border-l-2 border-patina pl-3 flex items-baseline gap-2">
              <span className="datum text-[0.625rem] uppercase tracking-[0.18em] text-patina-dim">
                Primary
              </span>
              <span className="text-[1.1875rem] text-bone">
                {active.primaryProject}
              </span>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto]">
            {/* Left — work body */}
            <div>
              <span className="datum block text-[0.5625rem] uppercase tracking-[0.22em] text-bone-faint/50 mb-2">
                Work
              </span>
              <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
                {active.body}
              </p>
            </div>

            {/* Right — meta column */}
            <div className="flex flex-col gap-5 md:w-64 md:border-l md:border-rule md:pl-6">
              {active.geography && (
                <div>
                  <span className="datum block text-[0.5625rem] uppercase tracking-[0.22em] text-bone-faint/50 mb-2">
                    Geography
                  </span>
                  <p
                    className="text-[1rem] leading-relaxed"
                    style={{ color: geoColor(active.geography) }}
                  >
                    {active.geography}
                  </p>
                </div>
              )}

              {active.books && (
                <div>
                  <span className="datum block text-[0.5625rem] uppercase tracking-[0.22em] text-bone-faint/50 mb-2">
                    Books
                  </span>
                  <ul className="space-y-1">
                    {active.books.split("\n").map((b: string) => b.trim()).filter(Boolean).map((b: string) => (
                      <li key={b} className="text-[1rem] leading-snug text-bone-soft">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {active.personalNotes && (
                <div>
                  <span className="datum block text-[0.5625rem] uppercase tracking-[0.22em] text-bone-faint/50 mb-2">
                    Notes
                  </span>
                  <p className="text-[1rem] leading-relaxed text-bone-soft">
                    {active.personalNotes}
                  </p>
                </div>
              )}

              {/* Nothing filled in yet */}
              {!active.geography && !active.books && !active.personalNotes && (
                <p className="datum text-[0.625rem] text-bone-faint/40 uppercase tracking-[0.16em]">
                  No personal data yet
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Year group ───────────────────────────────────────────────────────────────

function YearGroup({
  year,
  summaries,
}: {
  year: number;
  summaries: MonthlySummary[];
}) {
  // Ascending within the year so Jan → Mar reads left to right
  const sorted = [...summaries].sort((a, b) => a.month - b.month);

  // Chunk into quarters (3 per row)
  const rows: MonthlySummary[][] = [];
  for (let i = 0; i < sorted.length; i += 3) {
    rows.push(sorted.slice(i, i + 3));
  }

  return (
    <section className="mb-14">
      <div className="mb-2 flex items-baseline gap-4">
        <span className="inscription text-[1.25rem] text-bone">{year}</span>
        <span className="datum text-[0.625rem] uppercase tracking-[0.22em] text-bone-faint/50">
          {summaries.length} {summaries.length === 1 ? "month" : "months"}
        </span>
      </div>
      <div className="mb-4 h-px bg-rule" />

      <div className="border border-rule">
        {rows.map((row, i) => (
          <QuarterRow key={i} summaries={row} />
        ))}
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MonthlyPage() {
  const [summaries, setSummaries] = useState<MonthlySummary[] | null>(null);
  const [error, setError] = useState(false);
  const [activeYear, setActiveYear] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/monthly")
      .then((r) => r.json())
      .then((data) => setSummaries(data))
      .catch(() => setError(true));
  }, []);

  const byYear = summaries
    ? Object.entries(
      summaries.reduce<Record<number, MonthlySummary[]>>((acc, s) => {
        (acc[s.year] ??= []).push(s);
        return acc;
      }, {}),
    )
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, rows]) => ({ year: Number(year), summaries: rows }))
    : [];

  const years = byYear.map((g) => g.year);
  const visible = activeYear ? byYear.filter((g) => g.year === activeYear) : byYear;

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow="Log"
        title="Monthly"
        lede="What was being built each month, and the thinking behind it."
      />

      {/* ── Year filter ── */}
      {years.length > 0 && (
        <div className="mb-10 flex flex-wrap items-baseline gap-x-0 gap-y-1 border-b border-rule pb-6">
          <span className="datum mr-6 w-12 shrink-0 text-[0.5625rem] tracking-[0.28em] text-bone-faint/50 uppercase">
            Year
          </span>
          <button
            onClick={() => setActiveYear(null)}
            className={[
              "datum mr-5 pb-0.5 text-[0.625rem] tracking-[0.16em] uppercase transition-colors border-b",
              activeYear === null
                ? "border-patina text-patina"
                : "border-transparent text-bone-faint hover:text-bone-soft",
            ].join(" ")}
          >
            All
          </button>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setActiveYear(y)}
              className={[
                "datum mr-5 pb-0.5 text-[0.625rem] tracking-[0.16em] uppercase transition-colors border-b",
                activeYear === y
                  ? "border-patina text-patina"
                  : "border-transparent text-bone-faint hover:text-bone-soft",
              ].join(" ")}
            >
              {y}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="text-bone-faint italic">Could not load summaries.</p>
      )}

      {!summaries && !error && (
        <p className="datum text-[0.75rem] text-bone-faint">Loading…</p>
      )}

      {visible.map(({ year, summaries: rows }) => (
        <YearGroup key={year} year={year} summaries={rows} />
      ))}
    </div>
  );
}
