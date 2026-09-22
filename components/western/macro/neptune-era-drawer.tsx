"use client";

import { useEffect } from "react";
import type { NeptuneEra } from "@/lib/astrology/macro/neptune-eras-data";

const STATUS_LABEL: Record<NeptuneEra["status"], string> = {
  completed: "Closed",
  active: "Active",
  upcoming: "Ahead",
};

export default function NeptuneEraDrawer({
  era,
  color,
  previous,
  next,
  onNavigate,
  onClose,
}: {
  era: NeptuneEra;
  color: string;
  previous: NeptuneEra | null;
  next: NeptuneEra | null;
  onNavigate: (sign: string) => void;
  onClose: () => void;
}) {
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
        aria-label={`Neptune in ${era.sign}`}
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
                  {era.domain}
                </span>
                {era.status !== "completed" ? (
                  <>
                    <span className="h-3 w-px bg-rule" />
                    <span className="datum text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint">
                      {STATUS_LABEL[era.status]}
                    </span>
                  </>
                ) : null}
              </div>

              <div className="flex items-center gap-4">
                <span
                  className="glyph text-[2.125rem] leading-none"
                  style={{ color }}
                >
                  {era.glyph}
                </span>
                <h2 className="inscription text-[1.375rem] leading-tight text-bone">
                  Neptune in {era.sign}
                </h2>
              </div>
              <p className="mt-3 text-[0.75rem] italic leading-none text-bone-faint">
                rules House {era.house}
              </p>
              <p className="datum mt-3 text-[0.75rem] text-bone-faint">
                {era.years}
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

          <div className="mt-6 border-l-[3px] py-1 pl-4" style={{ borderColor: color }}>
            <p className="inscription text-[1.1875rem] text-bone">
              &ldquo;{era.mantra}&rdquo;
            </p>
          </div>
        </header>

        <div className="space-y-7 px-7 py-7">
          <section>
            <p className="eyebrow mb-2 text-[0.6875rem]">Collective ideal</p>
            <p className="text-[1.125rem] leading-relaxed text-bone">
              {era.ideal}
            </p>
            <p className="mt-1 text-[1.0625rem] leading-relaxed text-bone-soft">
              Idealization of {era.domain.toLowerCase()}
            </p>
          </section>

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-2 text-[0.6875rem]">Question</p>
            <p className="text-[1.0625rem] leading-relaxed text-bone">
              {era.question}
            </p>
          </section>

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-3 text-[0.6875rem]">Defining event</p>
            <div className="flex gap-2.5">
              <span
                className="mt-[0.65em] h-[3px] w-[3px] shrink-0"
                style={{ backgroundColor: color }}
              />
              <p className="datum text-[0.875rem] leading-relaxed text-bone-soft">
                <span className="text-bone">{era.majorEvent.date}</span>
                {" · "}
                {era.majorEvent.label}
              </p>
            </div>
          </section>

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-3 text-[0.6875rem]">Trigger</p>
            <div className="flex gap-2.5">
              <span
                className="mt-[0.65em] h-[3px] w-[3px] shrink-0"
                style={{ backgroundColor: color }}
              />
              <div>
                <p className="datum text-[0.875rem] leading-relaxed text-bone-soft">
                  <span className="text-bone">{era.trigger.date}</span>
                  {" · "}
                  {era.trigger.label}
                </p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-bone-soft">
                  {era.trigger.unlocks}
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-2 text-[0.6875rem]">Cultural archetype</p>
            <p className="inscription text-[1.0625rem] text-bone">
              {era.archetype}
            </p>
            <p className="mt-2 text-[1.0625rem] leading-relaxed text-bone-soft">
              {era.archetypeNote}
            </p>
          </section>

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-2 text-[0.6875rem]">Representative manifestation</p>
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {era.representative}
            </p>
          </section>

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-2 text-[0.6875rem]">Neptune&apos;s lens</p>
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {era.idealNote}
            </p>
          </section>

          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-4 text-[0.6875rem]">Era reading</p>
            {era.expanded
              .trim()
              .split(/\n\s*\n/)
              .map((paragraph) => (
                <p
                  key={paragraph}
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
