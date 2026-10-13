// components/framework/framework-tabs.tsx

"use client";

/**
 * The Framework page's two levels of navigation. The section tabs name each
 * layer by the question it answers — the guide's whole model in one row — and
 * the part tabs split a section into pieces small enough to read at once.
 *
 * Section tabs use the same top-border language as the developmental-arc
 * house tabs: a hairline at rest, the accent when open.
 */

export interface TabItem {
  id: string;
  label: string;
}

export function SectionTabs({
  sections,
  active,
  onSelect,
}: {
  sections: (TabItem & { question: string })[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Framework sections"
      className="sticky top-0 z-10 -mx-2 mb-10 grid grid-cols-3 gap-px bg-void px-2 pt-2 md:grid-cols-6"
    >
      {sections.map((s, i) => {
        const on = s.id === active;
        return (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={on}
            aria-controls={`panel-${s.id}`}
            onClick={() => onSelect(s.id)}
            className={`flex flex-col items-start border-t-2 px-3 pt-3 pb-3.5 text-left transition-colors ${
              on
                ? "border-patina bg-surface"
                : "border-rule hover:border-patina-dim hover:bg-surface-alt"
            }`}
          >
            <span className="datum text-[0.625rem] text-bone-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`inscription mt-1.5 text-[0.9375rem] tracking-[0.1em] ${
                on ? "text-patina" : "text-bone"
              }`}
            >
              {s.label}
            </span>
            <span className="mt-0.5 text-[0.8125rem] leading-snug text-bone-faint italic">
              {s.question}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function PartTabs({
  parts,
  active,
  onSelect,
}: {
  parts: TabItem[];
  active: string;
  onSelect: (id: string) => void;
}) {
  if (parts.length < 2) return null;
  return (
    <div role="tablist" aria-label="Parts" className="mb-8 flex flex-wrap gap-x-7 gap-y-2 border-b border-rule">
      {parts.map((p) => {
        const on = p.id === active;
        return (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onSelect(p.id)}
            className={`datum -mb-px border-b-2 pt-1 pb-2.5 text-[0.6875rem] tracking-[0.18em] uppercase transition-colors ${
              on
                ? "border-patina text-patina"
                : "border-transparent text-bone-faint hover:text-bone-soft"
            }`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
