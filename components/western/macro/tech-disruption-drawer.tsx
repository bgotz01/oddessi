// components/western/macro/tech-disruption-drawer.tsx
"use client";

import { useEffect } from "react";
import type { TechEraData } from "@/lib/astrology/macro/uranus-tech-eras-data";

const ELEMENT_COLOR: Record<TechEraData["element"], string> = {
  earth: "#8ebf7a",
  air: "#a8b4c0",
  water: "#7899d4",
  fire: "#e07a50",
};

const STATUS_LABEL: Record<Exclude<TechEraData["status"], "completed">, string> = {
  active: "Active",
  upcoming: "Ahead",
};

export default function TechDisruptionDrawer({
  era,
  previous,
  next,
  onNavigate,
  onClose,
}: {
  era: TechEraData;
  previous: TechEraData | null;
  next: TechEraData | null;
  onNavigate: (eraId: string) => void;
  onClose: () => void;
}) {
  const color = ELEMENT_COLOR[era.element];
  const statusLabel = era.status === "completed" ? null : STATUS_LABEL[era.status];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-void/40" onClick={onClose} aria-hidden="true" />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Uranus in ${era.sign} — Tech Disruption`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-rule bg-surface"
      >
        {/* ── Header ── */}
        <header className="shrink-0 border-b border-rule px-7 py-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className="datum text-[0.6875rem] uppercase tracking-[0.2em]"
                  style={{ color }}
                >
                  Uranus in {era.sign}
                </span>
                {statusLabel && (
                  <>
                    <span className="h-3 w-px bg-rule" />
                    <span className="datum text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint">
                      {statusLabel}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="glyph text-[2.125rem] leading-none" style={{ color }}>
                  {era.symbol}
                </span>
                <div>
                  <h2 className="inscription text-[1.375rem] leading-tight text-bone">
                    {era.paradigm}
                  </h2>
                  <p className="datum mt-1 text-[0.75rem] text-bone-faint">{era.timeframe}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 cursor-pointer text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>

          {/* Domain + paradigm as centrepiece */}
          <div className="mt-6 border-l-[3px] py-1 pl-4" style={{ borderColor: color }}>
            <p
              className="datum text-[0.6875rem] uppercase tracking-[0.14em]"
              style={{ color }}
            >
              Shock to {era.domain}
            </p>
            <p
              className="inscription mt-2 text-[1.5rem] uppercase tracking-[0.1em]"
              style={{ color }}
            >
              {era.paradigm}
            </p>
            <p className="mt-1 text-[0.9375rem] italic leading-relaxed text-bone-soft">
              {era.thesis}
            </p>
          </div>
        </header>

        {/* ── Body ── */}
        <div className="space-y-8 px-7 py-7">

          {/* Before → After */}
          <section>
            <p className="eyebrow mb-4 text-[0.6875rem]">The shift</p>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="rounded-[2px] border border-rule px-4 py-3 text-center">
                <p className="datum mb-1 text-[0.5625rem] uppercase tracking-[0.14em] text-bone-faint">
                  Before
                </p>
                <p className="text-[0.9375rem] leading-snug text-bone-soft">{era.before}</p>
              </div>
              <span className="text-bone-faint" aria-hidden="true">→</span>
              <div
                className="rounded-[2px] border px-4 py-3 text-center"
                style={{ borderColor: color }}
              >
                <p className="datum mb-1 text-[0.5625rem] uppercase tracking-[0.14em] text-bone-faint">
                  After
                </p>
                <p className="text-[0.9375rem] leading-snug text-bone">{era.after}</p>
              </div>
            </div>
          </section>

          {/* Interpretation */}
          <section className="border-t border-rule-faint pt-6">
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {era.interpretation}
            </p>
          </section>

          {/* Why it matters */}
          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-3 text-[0.6875rem]">Why it matters</p>
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {era.significance}
            </p>
          </section>

          {/* Early signal */}
          {era.earlySignal && era.earlySignal.length > 0 && (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-4 text-[0.6875rem]">Early signal</p>
              <div className="space-y-4">
                {era.earlySignal.map((signal) => (
                  <div key={signal.marker}>
                    <p className="inscription text-[1.0625rem] leading-snug text-bone">
                      {signal.marker}
                    </p>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-bone-soft">
                      {signal.reason}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Landmarks */}          {era.events.length > 0 ? (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-5 text-[0.6875rem]">Landmarks</p>
              <div className="space-y-5">
                {era.events.map((event) => (
                  <div key={`${event.year}-${event.name}`}>
                    <div className="flex items-baseline gap-3">
                      <span className="datum text-[0.6875rem] tabular-nums text-bone-faint">
                        {event.year}
                      </span>
                      <span
                        className="inscription text-[1.0625rem] leading-snug"
                        style={{ color }}
                      >
                        {event.name}
                      </span>
                    </div>
                    <p className="mt-1 pl-[3.25rem] text-[0.9375rem] leading-relaxed text-bone-soft">
                      {event.significance}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-3 text-[0.6875rem]">Landmarks</p>
              <p className="text-[1.0625rem] italic leading-relaxed text-bone-faint">
                Active era — landmark events are still forming.
              </p>
            </section>
          )}

          {/* Transition */}
          {era.transition && era.status !== "active" && (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-3 text-[0.6875rem]">Next</p>
              <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
                {era.transition}
              </p>
            </section>
          )}
        </div>

        {/* ── Footer nav ── */}
        <footer className="mt-auto flex shrink-0 items-center justify-between gap-4 border-t border-rule px-7 py-5">
          {previous ? (
            <button
              type="button"
              onClick={() => onNavigate(previous.id)}
              className="datum text-[0.6875rem] uppercase tracking-[0.16em] text-bone-faint transition-colors hover:text-patina"
            >
              ← {previous.sign}
            </button>
          ) : <span />}
          {next ? (
            <button
              type="button"
              onClick={() => onNavigate(next.id)}
              className="datum text-[0.6875rem] uppercase tracking-[0.16em] text-bone-faint transition-colors hover:text-patina"
            >
              {next.sign} →
            </button>
          ) : <span />}
        </footer>

        <div className="h-[3px] w-full shrink-0" style={{ backgroundColor: color }} />
      </aside>
    </>
  );
}
