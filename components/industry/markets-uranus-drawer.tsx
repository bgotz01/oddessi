"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { MARKETS_URANUS_ERAS as eras, type MarketsUranusEra } from "@/lib/industry/markets-uranus-eras-data";

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

export function catalystTag(catalyst: MarketsUranusEra["catalysts"][number], era: MarketsUranusEra): string {
  const tag = catalyst.label ?? (catalyst.year < era.startYear ? "Precursor" : null);
  return `${catalyst.period ?? catalyst.year}${tag ? ` · ${tag}` : ""}`;
}

export default function MarketsUranusDrawer({
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
        aria-labelledby="market-uranus-title"
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-rule bg-surface shadow-2xl"
        // Bullet markers pick up the era color
        style={{ "--marker": era.color } as CSSProperties}
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden border-b border-rule px-6 py-5" style={{ borderTop: `2px solid ${era.color}` }}>
          <span aria-hidden="true" className="glyph pointer-events-none absolute -right-2 -top-6 text-[8rem] opacity-[0.07]" style={{ color: era.color }}>{era.symbol}</span>
          <div className="relative flex items-start justify-between gap-4">
            <p className="datum text-xs uppercase tracking-[0.16em]" style={{ color: era.color }}>
              Uranus in {era.sign} · {era.startYear}–{era.endYear}{era.hypothesis ? " · Hypothesis" : ""}
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
          <p className="datum relative mt-4 text-xs uppercase tracking-widest text-bone">{era.domain}</p>
          <p className="relative mt-0.5 text-sm text-bone-faint">{era.disruption}</p>
          <p className="datum relative mt-4 text-[0.625rem] uppercase tracking-widest text-bone-faint">Emerging theme</p>
          <h2 id="market-uranus-title" className="relative mt-1 text-3xl font-semibold leading-tight" style={{ color: era.color }}>{era.headline}</h2>
          <p className="relative mt-3 text-base leading-relaxed text-bone-faint">{era.tagline}</p>
        </div>

        {/* Body */}
        <div className="space-y-7 px-6 py-6">
          <section>
            <h3 className="datum mb-2 text-xs uppercase tracking-widest text-bone-faint">What changes</h3>
            <Bullets items={era.interpretation} className="text-[1.0625rem] leading-relaxed text-bone-soft" />
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

          <section className="border-l-2 pl-5" style={{ borderColor: era.color }}>
            <h3 className="datum mb-3 text-xs uppercase tracking-widest text-bone-faint">Manifestations</h3>
            <dl className="space-y-2">
              {era.manifestations.map((item) => (
                <div key={item.label}>
                  <dt className="text-[1.0625rem] font-semibold leading-snug text-bone">{item.label}</dt>
                  <dd className="leading-relaxed text-bone-soft">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h3 className="datum mb-3 text-xs uppercase tracking-widest text-bone-faint">Enabling catalyst</h3>
            <ol className="space-y-5">
              {era.catalysts.map((catalyst) => (
                <li key={catalyst.title}>
                  <p className="datum text-xs" style={{ color: era.color }}>{catalystTag(catalyst, era)}</p>
                  <h4 className="mt-1 text-lg font-semibold text-bone">{catalyst.title}</h4>
                  <Bullets items={catalyst.description} className="mt-2 leading-relaxed text-bone-soft" />
                  <p className="datum mt-3 text-[0.625rem] uppercase tracking-widest text-bone-faint">What it unlocks</p>
                  <Bullets items={catalyst.unlocks} className="mt-1 leading-relaxed" color={era.color} />
                </li>
              ))}
            </ol>
          </section>

          <section className="border-t border-rule pt-6">
            <h3 className="datum mb-2 text-xs uppercase tracking-widest text-bone-faint">Where the disruption overshoots</h3>
            <Bullets items={era.shadow} className="leading-relaxed text-bone-soft" />
          </section>

          {/* Each Uranus era disrupts what the previous one built, so the hand-off gets the most weight */}
          <section
            className="border border-rule px-5 py-4"
            style={{ borderLeft: `3px solid ${next?.color ?? era.color}`, background: `linear-gradient(90deg, ${era.color}14, ${(next?.color ?? era.color)}14)` }}
          >
            <h3 className="datum text-xs uppercase tracking-widest text-bone-faint">Next disruption →</h3>
            <p className="mt-2 text-xl font-semibold leading-tight">
              <span style={{ color: era.color }}>{era.headline}</span>
              <span className="text-bone-faint"> → </span>
              <span style={{ color: next?.color ?? "var(--color-bone-faint)" }}>{next?.headline ?? "?"}</span>
            </p>
            <Bullets items={era.transition} className="mt-3 leading-relaxed text-bone-soft" />
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
