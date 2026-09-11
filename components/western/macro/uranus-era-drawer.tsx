"use client";

import { useEffect } from "react";
import type { UranusEraData } from "@/lib/astrology/macro/uranus-eras-data";

const STATUS_LABEL: Record<Exclude<UranusEraData["status"], "completed">, string> = {
  active: "Active",
  upcoming: "Ahead",
};

function ReadingList({
  items,
  color,
  risk = false,
}: {
  items: string[];
  color: string;
  risk?: boolean;
}) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span
            className="mt-[0.65em] h-[3px] w-[3px] shrink-0"
            style={{ backgroundColor: risk ? "var(--color-ember)" : color }}
          />
          <span
            className={`text-[1.0625rem] leading-relaxed ${risk ? "text-bone" : "text-bone-soft"
              }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function UranusEraDrawer({
  era,
  color,
  previous,
  next,
  onNavigate,
  onClose,
}: {
  era: UranusEraData;
  color: string;
  previous: UranusEraData | null;
  next: UranusEraData | null;
  onNavigate: (eraId: string) => void;
  onClose: () => void;
}) {
  const statusLabel =
    era.status === "completed" ? null : STATUS_LABEL[era.status];

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-void/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Uranus in ${era.sign}`}
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
                  {era.system}
                </span>
                {statusLabel ? (
                  <>
                    <span className="h-3 w-px bg-rule" />
                    <span className="datum text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint">
                      {statusLabel}
                    </span>
                  </>
                ) : null}
              </div>

              <div className="flex items-center gap-4">
                <span
                  className="glyph text-[2.125rem] leading-none"
                  style={{ color }}
                >
                  {era.symbol}
                </span>
                <h2 className="inscription text-[1.375rem] leading-tight text-bone">
                  Uranus in {era.sign}
                </h2>
              </div>
              <p className="mt-3 text-[0.75rem] italic leading-none text-bone-faint">
                rules House {era.house}
              </p>
              <p className="datum mt-3 text-[0.75rem] text-bone-faint">
                {era.timeframe}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 cursor-pointer text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>

          <div className="mt-6 grid gap-px bg-rule sm:grid-cols-2">
            <div className="bg-surface px-4 py-4 text-center sm:col-span-2">
              <p className="datum text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint">
                Old order
              </p>
              <p className="mt-2 text-[1.0625rem] leading-snug text-bone-soft">
                {era.oldOrder}
              </p>
            </div>
            <div className="bg-surface px-4 py-4 text-center">
              <p className="datum text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint">
                Shock
              </p>
              <p className="inscription mt-2 text-[1.1875rem] leading-snug text-bone">
                {era.shock}
              </p>
            </div>
            <div className="bg-surface px-4 py-4 text-center">
              <p className="datum text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint">
                New order
              </p>
              <p className="mt-2 text-[1.0625rem] leading-snug text-bone-soft">
                {era.reorganization}
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-7 px-7 py-7">
          <section>
            <p className="eyebrow mb-3 text-[0.6875rem]">Consequences</p>
            <ReadingList items={era.consequences} color={color} />
          </section>

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-3 text-[0.6875rem] text-ember">Distortion risk</p>
            <ReadingList items={era.distortionRisk} color={color} risk />
          </section>

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-1 text-[0.6875rem]">Last time</p>
            <p className="datum mb-3 text-[0.75rem] text-bone-faint">
              {era.historicalParallel.previousOccurrence}
            </p>
            <ReadingList
              items={era.historicalParallel.historicalThemes}
              color={color}
            />
          </section>

          {era.extendedHistoricalPeriods?.length ? (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-4 text-[0.6875rem]">Earlier recurrences</p>
              <div className="space-y-5">
                {era.extendedHistoricalPeriods.map((period) => (
                  <div key={period.period}>
                    <p className="datum mb-1 text-[0.75rem] text-bone-faint">
                      {period.period}
                    </p>
                    <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
                      {period.note}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <footer className="mt-auto flex shrink-0 items-center justify-between gap-4 border-t border-rule px-7 py-5">
          {previous ? (
            <button
              type="button"
              onClick={() => onNavigate(previous.id)}
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
              onClick={() => onNavigate(next.id)}
              className="datum text-[0.6875rem] uppercase tracking-[0.16em] text-bone-faint transition-colors hover:text-patina"
            >
              {next.sign} →
            </button>
          ) : (
            <span />
          )}
        </footer>

        <div
          className="h-[3px] w-full shrink-0"
          style={{ backgroundColor: color }}
        />
      </aside>
    </>
  );
}
