// components/industry/music-era-drawer.tsx
"use client";

import { useEffect } from "react";
import { MUSIC_ERAS, INVERSIONS } from "@/lib/industry/music-eras-data";
import type { MusicEra, Inversion } from "@/lib/industry/music-eras-data";
import MusicConcurrent from "@/components/industry/music-concurrent";
import type { MusicCycleConcurrency } from "@/lib/industry/music-cycles";

// ── Inversion table ───────────────────────────────────────────────────────────

function InversionTable({
  inversion,
  fromColor,
  toColor,
}: {
  inversion: Inversion;
  fromColor: string;
  toColor: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span
          className="datum text-[0.6875rem] uppercase tracking-[0.16em]"
          style={{ color: fromColor }}
        >
          {inversion.fromSign}
        </span>
        <span className="text-bone-faint">→</span>
        <span
          className="datum text-[0.6875rem] uppercase tracking-[0.16em]"
          style={{ color: toColor }}
        >
          {inversion.toSign}
        </span>
      </div>

      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="w-24 pb-2 pr-3">
              <span className="datum text-[0.5625rem] uppercase tracking-[0.14em] text-bone-faint/50">
                Axis
              </span>
            </th>
            <th className="pb-2 pr-3">
              <span
                className="datum text-[0.5625rem] uppercase tracking-[0.14em]"
                style={{ color: fromColor }}
              >
                {inversion.fromSign}
              </span>
            </th>
            <th className="pb-2">
              <span
                className="datum text-[0.5625rem] uppercase tracking-[0.14em]"
                style={{ color: toColor }}
              >
                {inversion.toSign}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {inversion.rows.map((row, i) => (
            <tr key={row.axis} className={i % 2 === 0 ? "bg-surface-alt/40" : ""}>
              <td className="py-2 pr-3 align-top">
                <span className="datum text-[0.6875rem] uppercase tracking-[0.1em] text-bone-faint">
                  {row.axis}
                </span>
              </td>
              <td className="py-2 pr-3 align-top">
                <span className="text-[0.9375rem] text-bone-soft">{row.from}</span>
              </td>
              <td className="py-2 align-top">
                <span className="text-[0.9375rem] text-bone">{row.to}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3 text-[0.8125rem] italic leading-relaxed text-bone-faint">
        {inversion.tagline}
      </p>

      {inversion.contrast && inversion.contrast.length > 0 && (
        <div className="mt-6">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="pb-2 pr-3">
                  <span
                    className="datum text-[0.5625rem] uppercase tracking-[0.14em]"
                    style={{ color: fromColor }}
                  >
                    {inversion.fromSign}
                  </span>
                </th>
                <th className="pb-2">
                  <span
                    className="datum text-[0.5625rem] uppercase tracking-[0.14em]"
                    style={{ color: toColor }}
                  >
                    {inversion.toSign} hypothesis
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {inversion.contrast.map((row, i) => (
                <tr key={row.from} className={i % 2 === 0 ? "bg-surface-alt/40" : ""}>
                  <td className="py-2 pr-3 align-top">
                    <span className="text-[0.9375rem] text-bone-soft">{row.from}</span>
                  </td>
                  <td className="py-2 align-top">
                    <span className="text-[0.9375rem] text-bone">{row.to}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Drawer ────────────────────────────────────────────────────────────────────

export default function MusicEraDrawer({
  era,
  previous,
  next,
  concurrent,
  onNavigate,
  onSelectSegment,
  onClose,
}: {
  era: MusicEra;
  previous: MusicEra | null;
  next: MusicEra | null;
  /**
   * The Uranus eras that ran inside this one — only on the combined chart,
   * which is the one page with the other clock on it. The Neptune page has no
   * Uranus bar to jump back to, and a cross-link out of a reading into a
   * vocabulary the page has not introduced is a dead end with an arrow on it.
   */
  concurrent?: MusicCycleConcurrency[];
  onNavigate: (sign: string) => void;
  onSelectSegment?: (segmentId: string) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isUpcoming = era.status === "upcoming";
  const { color } = era;

  const inversionIn = INVERSIONS.find((inv) => inv.toSign === era.sign);
  const inversionFromEra = inversionIn
    ? MUSIC_ERAS.find((e) => e.sign === inversionIn.fromSign)
    : null;
  const inversionToEra = inversionIn
    ? MUSIC_ERAS.find((e) => e.sign === inversionIn.toSign)
    : null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-void/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Neptune in ${era.sign} — Music`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-rule bg-surface"
      >
        <header className="shrink-0 border-b border-rule px-7 py-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className="datum text-[0.6875rem] uppercase tracking-[0.2em]"
                  style={{ color }}
                >
                  Neptune in {era.sign}
                </span>
                {isUpcoming && (
                  <>
                    <span className="h-3 w-px bg-rule" />
                    <span className="datum text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint">
                      Hypothesis
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="glyph text-[2rem] leading-none" style={{ color }}>
                  {era.symbol}
                </span>
                <h2 className="inscription text-[1.375rem] leading-tight text-bone">
                  {era.archetype}
                </h2>
              </div>
              <p className="datum mt-2.5 text-[0.75rem] text-bone-faint">{era.dates}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 cursor-pointer text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>

          <div className="mt-5 border-l-[3px] py-1 pl-4" style={{ borderColor: color }}>
            <p className="text-[1.0625rem] italic leading-relaxed text-bone-soft">
              {era.archetypeNote}
            </p>
          </div>
        </header>

        <div className="space-y-7 px-7 py-7">
          <section>
            <p className="eyebrow mb-2 text-[0.6875rem]">Music culture</p>
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {era.musicCulture}
            </p>
          </section>

          {concurrent && concurrent.length > 0 && onSelectSegment && (
            <section className="border-t border-rule-faint pt-6">
              <MusicConcurrent links={concurrent} onSelect={onSelectSegment} />
            </section>
          )}

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-3 text-[0.6875rem]">Early signal</p>
            <p className="text-[1.125rem] italic" style={{ color }}>{era.earlySignal.artist}</p>
            <dl className="mt-3 space-y-3">
              <div>
                <dt className="datum text-[0.5625rem] uppercase tracking-[0.08em] text-bone-faint">Defining breakthrough</dt>
                <dd className="mt-1 text-[1rem] italic leading-snug text-bone-soft">{era.earlySignal.breakthrough}</dd>
              </div>
              <div>
                <dt className="datum text-[0.5625rem] uppercase tracking-[0.08em] text-bone-faint">Year</dt>
                <dd className="mt-1 text-[1rem] text-bone-soft">{era.earlySignal.year}</dd>
              </div>
            </dl>
          </section>

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-3 text-[0.6875rem]">Genres</p>
            {era.genres.length > 0 ? (
              <ul className="list-disc space-y-1 pl-5 text-[1.0625rem] text-bone-soft marker:text-bone-faint">
                {era.genres.map((genre) => typeof genre === "string" ? (
                  <li key={genre}>{genre}</li>
                ) : (
                  <li key={genre.name} className="pb-3">
                    <span className="font-semibold" style={{ color }}>{genre.name}</span>
                    <p className="mt-1 text-[1rem] leading-snug text-bone">
                      {genre.artists.join(" · ")}
                    </p>
                    <p className="mt-1 text-[0.9375rem] leading-snug text-bone-faint">
                      {genre.demonstrates}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[1.0625rem] text-bone-faint">To be observed.</p>
            )}
          </section>

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-2 text-[0.6875rem]">Distribution</p>
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {era.distribution}
            </p>
          </section>

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-4 text-[0.6875rem]">
              {isUpcoming ? "Evidence — unknown" : era.evidence.label}
            </p>
            <div className="space-y-3">
              {era.evidence.items.map((item) => (
                <div key={item.name} className="flex gap-3">
                  <span
                    className="mt-[0.55em] h-[3px] w-[3px] shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <div>
                    <span className="inscription text-[0.9375rem] text-bone">
                      {item.name}
                    </span>
                    {item.examples && (
                      <p className="mt-0.5 text-[0.8125rem] leading-snug text-bone-faint">
                        {item.examples}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {inversionIn && inversionFromEra && inversionToEra && (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-4 text-[0.6875rem]">Inversion from previous era</p>
              <InversionTable
                inversion={inversionIn}
                fromColor={inversionFromEra.color}
                toColor={inversionToEra.color}
              />
            </section>
          )}

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-4 text-[0.6875rem]">Era reading</p>
            {era.expanded
              .trim()
              .split(/\n\s*\n/)
              .map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mb-4 text-[1.0625rem] leading-relaxed text-bone-soft last:mb-0"
                >
                  {paragraph.trim()}
                </p>
              ))}
          </section>
        </div>

        <footer className="mt-auto flex shrink-0 items-center justify-between gap-4 border-t border-rule px-7 py-5">
          {previous ? (
            <button
              type="button"
              onClick={() => onNavigate(previous.sign)}
              className="datum text-[0.6875rem] uppercase tracking-[0.16em] text-bone-faint transition-colors hover:text-patina"
            >
              ← {previous.sign}
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button
              type="button"
              onClick={() => onNavigate(next.sign)}
              className="datum text-[0.6875rem] uppercase tracking-[0.16em] text-bone-faint transition-colors hover:text-patina"
            >
              {next.sign} →
            </button>
          ) : (
            <span />
          )}
        </footer>

        <div className="h-[3px] w-full shrink-0" style={{ backgroundColor: color }} />
      </aside>
    </>
  );
}
