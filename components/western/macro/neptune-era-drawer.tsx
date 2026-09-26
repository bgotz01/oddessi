//components/western/macro/neptune-era-drawer.tsx
"use client";

import { useEffect } from "react";
import type { NeptuneEra } from "@/lib/astrology/macro/neptune-eras-data";
import { SIGNS, type SignKey } from "@/lib/astrology/macro/zodiac-framework-data";

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
  // The sign's canonical territory and how it expresses its element
  const sign = SIGNS[era.sign.toLowerCase() as SignKey];

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
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-rule bg-surface"
      >
        <header className="shrink-0 border-b border-rule px-7 py-6" style={{ borderTop: `2px solid ${color}` }}>
          <div className="flex items-start justify-between gap-6">
            <p className="datum text-[0.6875rem] uppercase tracking-[0.18em]" style={{ color }}>
              House {era.house} · {era.years.replace("~", "")}
              {era.status !== "completed" ? <span className="text-bone-faint"> · {STATUS_LABEL[era.status]}</span> : null}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="datum shrink-0 cursor-pointer text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="glyph text-[1.75rem] leading-none" style={{ color }}>{era.glyph}</span>
            <h2 className="inscription text-[1.25rem] leading-tight text-bone">Neptune in {era.sign}</h2>
          </div>
          {/* The dream beside the sign's canonical domain it idealizes */}
          <div className="mt-5 grid grid-cols-2 gap-6">
            <div>
              <p className="eyebrow text-[0.6875rem]">The dream</p>
              <p className="mt-1 text-[1.75rem] font-semibold leading-tight" style={{ color }}>{era.ideal}</p>
            </div>
            <div>
              <p className="eyebrow text-[0.6875rem]">Sign domain</p>
              <p className="mt-1 text-[1.75rem] leading-tight text-bone-soft">{sign.domain}</p>
              <p className="mt-1 text-[0.9375rem] italic text-bone-faint">{sign.mode}</p>
            </div>
          </div>
          <div className="mt-5 border-t border-rule-faint pt-4">
            <p className="eyebrow text-[0.6875rem]">Cultural archetype</p>
            <p className="inscription mt-1 text-[1.0625rem] text-bone">{era.archetype}</p>
            <p className="mt-1 text-[0.9375rem] leading-relaxed text-bone-soft">{era.archetypeNote}</p>
          </div>
        </header>

        <div className="space-y-7 px-7 py-7">
          <section>
            <p className="eyebrow mb-4 text-[0.6875rem]">The arc</p>
            {/* Dream → opening → inflection → disillusionment */}
            <div className="border-l-2 pl-4" style={{ borderColor: color }}>
              <p className="datum text-[0.625rem] uppercase tracking-[0.16em]" style={{ color }}>Opening · {era.trigger.date}</p>
              <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-bone">{era.trigger.label}</p>
              <p className="text-[0.9375rem] leading-relaxed text-bone-soft">{era.trigger.unlocks}</p>
            </div>
            <div className="py-3 pl-4">
              <p className="datum text-[0.625rem] uppercase tracking-[0.16em]" style={{ color: era.inflection ? color : undefined }}>
                Inflection{era.inflection ? ` · ${era.inflection.date}` : ""}
              </p>
              <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-bone">{era.inflection?.label ?? <span className="italic text-bone-faint">Not yet</span>}</p>
            </div>
            <div className="border-l-2 border-dashed pl-4" style={{ borderColor: color }}>
              <p className="datum text-[0.625rem] uppercase tracking-[0.16em]" style={{ color }}>The disillusionment</p>
              <p className={`mt-1 text-[1.0625rem] leading-snug ${era.disillusionment ? "font-semibold text-bone" : "italic text-bone-faint"}`}>
                {era.disillusionment ?? "Not yet identified: it should emerge from the evidence, not the symbolism"}
              </p>
            </div>
          </section>

          <section className="border-t border-rule-faint pt-6">
            <div>
              <p className="eyebrow mb-2 text-[0.6875rem]">Manifestations</p>
              {era.manifestations.length === 0 && <p className="italic text-bone-faint">Not yet: the era has just begun</p>}
              <ul className="space-y-1">
                {era.manifestations.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-bone-soft">
                    <span className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full opacity-70" style={{ backgroundColor: color }} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>


          <section className="border-t border-rule-faint pt-6">
            <p className="eyebrow mb-4 text-[0.6875rem]">Era reading</p>
            {[era.idealNote, ...era.expanded.trim().split(/\n\s*\n/)]
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
