"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

/**
 * The reading furniture shared by Planets and Houses.
 *
 * Both pages are the same object: a list of rows you open one at a time to read
 * a long passage underneath. Arc did this twice with cards, gradients and drop
 * shadows; here it is one rule-and-indent system, defined once.
 *
 * The open row is tracked by the *page*, not by each row, so opening one closes
 * the last — the whole point of a study list is that you are reading one thing.
 */

/** Which row is open, plus the scroll-into-view that makes a long panel usable. */
export function useOneOpen<K extends string | number>() {
  const [open, setOpen] = useState<K | null>(null);
  const anchors = useRef(new Map<K, HTMLElement | null>());

  const register = useCallback(
    (key: K) => (el: HTMLElement | null) => {
      anchors.current.set(key, el);
    },
    [],
  );

  const toggle = useCallback((key: K) => {
    setOpen((current) => {
      if (current === key) return null;
      // After paint, bring the row we just opened to the top of the pane.
      requestAnimationFrame(() =>
        anchors.current
          .get(key)
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
      return key;
    });
  }, []);

  return { open, toggle, register };
}

/**
 * The expanded body of a row. Indented behind a hairline so the eye can always
 * find where the passage begins and where it stops. Pass `color` to draw that
 * edge in the subject's own colour — the Planets page uses it so an open panel
 * is still visibly tied to the body it belongs to.
 */
export function Panel({
  children,
  color,
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <div
      className={`border-l-2 bg-surface px-6 py-8 md:px-10 ${
        color ? "" : "border-patina-dim"
      }`}
      style={color ? { borderColor: color } : undefined}
    >
      <div className="max-w-3xl space-y-8">{children}</div>
    </div>
  );
}

/** A titled passage inside a panel. */
export function Block({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between gap-6 border-b border-rule-faint pb-2">
        <h4 className="eyebrow">{title}</h4>
        {aside ? (
          <span className="datum text-[0.625rem] text-bone-faint">{aside}</span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

/** Body copy. The long descriptions in the tables are all prose. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <p className="text-[1.0625rem] leading-relaxed font-light text-bone-soft">
      {children}
    </p>
  );
}

/**
 * One of the paired lists the tables come in — strengths against challenges,
 * opportunities against tips. `tone` is the only place a list gets colour:
 * patina for what the placement gives, ember for what it costs.
 */
export function ListColumn({
  label,
  items,
  tone = "patina",
}: {
  label: string;
  items: string[];
  tone?: "patina" | "ember";
}) {
  if (items.length === 0) return null;
  const mark = tone === "patina" ? "text-patina-dim" : "text-ember-dim";
  return (
    <div>
      <p className={`eyebrow mb-2 ${tone === "ember" ? "text-ember-dim" : ""}`}>
        {label}
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className={`datum text-[0.625rem] leading-6 ${mark}`}>—</span>
            <span className="text-[0.9375rem] leading-relaxed font-light text-bone-soft">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Two lists side by side. Collapses to one column when there is no room. */
export function Pair({ children }: { children: ReactNode }) {
  return <div className="grid gap-8 sm:grid-cols-2">{children}</div>;
}

/** Keywords and life areas — tracked-out micro labels, never pills. */
export function Terms({ terms }: { terms: string[] }) {
  if (terms.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1">
      {terms.map((t) => (
        <span
          key={t}
          className="datum text-[0.625rem] tracking-[0.22em] text-bone-faint uppercase"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/** The open/closed marker at the end of a row. A rotated hairline chevron. */
export function OpenMark({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={`datum text-[0.75rem] text-bone-faint transition-transform duration-200 ${
        open ? "rotate-90 text-patina" : ""
      }`}
    >
      ›
    </span>
  );
}
