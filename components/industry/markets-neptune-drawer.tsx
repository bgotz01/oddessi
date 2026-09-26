//components/industry/markets-neptune-drawer.tsx
"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { MARKETS_NEPTUNE_ERAS as eras, type MarketsNeptuneEvent } from "@/lib/industry/markets-neptune-eras-data";

function Bullets({ items, className, color }: { items: string[]; className: string; color?: string }) {
  return (
    <ul className={`space-y-1 ${className}`} style={{ color }}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--marker)] opacity-70" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// The dated facts under an act, e.g. the opening events.
function Evidence({ label, event }: { label: string; event: MarketsNeptuneEvent }) {
  return (
    <div className="mt-4">
      <p className="datum text-[0.625rem] uppercase tracking-widest text-bone-faint">{label} · {event.period}</p>
      <p className="mt-0.5 font-semibold text-bone">{event.title}</p>
      <Bullets items={event.points} className="mt-1 leading-relaxed text-bone-soft" />
    </div>
  );
}

export default function MarketsNeptuneDrawer({
  index,
  onNavigate,
  onClose,
}: {
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}) {
  const era = eras[index];
  const prev = eras[index - 1];
  const next = eras[index + 1];
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Each era starts reading from the top
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [index]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-void/40" onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="market-neptune-title"
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-rule bg-surface shadow-2xl"
        // Bullet markers pick up the era color
        style={{ "--marker": era.color } as CSSProperties}
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden border-b border-rule px-6 py-5" style={{ borderTop: `2px solid ${era.color}` }}>
          <span aria-hidden="true" className="glyph pointer-events-none absolute -right-2 -top-6 text-[8rem] opacity-[0.07]" style={{ color: era.color }}>{era.symbol}</span>
          <div className="relative flex items-start justify-between gap-4">
            <p className="datum text-xs uppercase tracking-[0.16em]" style={{ color: era.color }}>
              Neptune in {era.sign} · {era.startYear}–{era.endYear}{era.hypothesis ? " · Hypothesis" : ""}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="datum shrink-0 text-[0.625rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>
          <p className="relative mt-2 text-sm text-bone-faint">{era.domain} · {era.theme}</p>
          <h2 id="market-neptune-title" className="relative mt-3 text-3xl font-semibold leading-tight" style={{ color: era.color }}>{era.headline}</h2>
          <p className="relative mt-1 text-lg italic text-bone-soft">{era.narrative}</p>
        </div>

        {/* Body */}
        <div className="space-y-7 px-6 py-6">
          {/* Neptune in two acts: the ideal rises, then its own excess inverts it */}
          <section aria-label="The dream" className="border-l-2 pl-5" style={{ borderColor: era.color }}>
            <p className="datum text-[0.625rem] uppercase tracking-widest" style={{ color: era.color }}>The dream</p>
            <h3 className="mt-1 text-xl font-semibold leading-snug text-bone">{era.dream}</h3>
            <p className="mt-1 leading-relaxed text-bone-soft">{era.interpretation[0]}</p>
            <Evidence label="Opening catalyst" event={era.opening} />
            {era.developments.length > 0 && (
              <div className="mt-4">
                <p className="datum text-[0.625rem] uppercase tracking-widest text-bone-faint">Developments</p>
                <Bullets items={era.developments} className="mt-1 leading-relaxed text-bone-soft" />
              </div>
            )}
          </section>

          {era.inflection && (
            <section aria-label="Inflection" className="flex items-start gap-3 pl-0.5">
              <span aria-hidden="true" className="mt-0.5 text-lg leading-none" style={{ color: era.color }}>↓</span>
              <div>
                <p className="datum text-[0.625rem] uppercase tracking-widest" style={{ color: era.color }}>Inflection · {era.inflection.year}</p>
                <p className="mt-0.5 font-semibold text-bone">{era.inflection.title}</p>
                <p className="mt-0.5 italic leading-relaxed text-bone-soft">{era.inflection.significance}</p>
                {era.inflection.points && <Bullets items={era.inflection.points} className="mt-1 leading-relaxed text-bone-soft" />}
              </div>
            </section>
          )}

          <section aria-label="The disillusionment" className="border-l-2 border-dashed pl-5" style={{ borderColor: era.color }}>
            {era.disillusionment ? (
              <>
                <p className="datum text-[0.625rem] uppercase tracking-widest" style={{ color: era.color }}>The disillusionment · {era.disillusionment.period}</p>
                <h3 className="mt-1 text-xl font-semibold leading-snug text-bone">{era.disillusionment.title}</h3>
                <p className="mt-1 italic leading-relaxed text-bone-soft">{era.disillusionment.realization}</p>
                <Bullets items={era.disillusionment.points} className="mt-3 leading-relaxed text-bone-soft" />
              </>
            ) : (
              <>
                <p className="datum text-[0.625rem] uppercase tracking-widest text-bone-faint">The disillusionment</p>
                <p className="mt-1 italic text-bone-faint">Not yet identified: it should emerge from the evidence, not the symbolism</p>
              </>
            )}
          </section>

          <section>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="datum text-xs uppercase tracking-widest text-bone-faint">Market signature</h3>
              <p className="text-sm text-bone-faint">What investors {era.endYear >= new Date().getFullYear() ? "are" : "were"} rewarding</p>
            </div>
            <ul className="grid grid-cols-2 border-l border-t border-rule sm:grid-cols-4">
              {era.marketSignature.map((signal) => (
                <li key={signal} className="border-b border-r border-rule px-3 py-2.5 text-[0.9375rem] leading-snug text-bone">
                  <span className="mb-1.5 block h-[3px] w-4" style={{ backgroundColor: era.color }} aria-hidden="true" />
                  {signal}
                </li>
              ))}
            </ul>
          </section>


        </div>

        {/* Footer — adjacent eras */}
        <nav aria-label="Browse adjacent eras" className="mt-auto flex justify-between gap-4 border-t border-rule px-6 py-4">
          <button type="button" disabled={!prev} onClick={() => onNavigate(index - 1)} className="datum cursor-pointer text-xs text-bone-soft hover:text-patina disabled:cursor-default disabled:opacity-30">← {prev?.sign ?? "First era"}</button>
          <button type="button" disabled={!next} onClick={() => onNavigate(index + 1)} className="datum cursor-pointer text-xs text-bone-soft hover:text-patina disabled:cursor-default disabled:opacity-30">{next?.sign ?? "Latest era"} →</button>
        </nav>
      </div>
    </>
  );
}
