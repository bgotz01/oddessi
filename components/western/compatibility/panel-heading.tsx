//components/western/compatibility/panel-heading.tsx
"use client";

import type { ReactNode } from "react";

/**
 * A section title for this page, deliberately louder than the app's default.
 *
 * `components/primitives.tsx` has `SectionHeading`, which this page used
 * throughout: Cinzel at 17px over a rule-faint hairline. That is right for a
 * page of prose and wrong for this one, which is almost entirely tables — the
 * titles came out the same size as the row names under them, over a rule so
 * faint it barely separated anything, and the whole page read as one
 * undifferentiated column of small carved text.
 *
 * Three changes, all of them the app's own vocabulary rather than new
 * invention:
 *
 *   SIZE      22px against the rows' 17px, so a title is plainly a title.
 *   TRACKING  0.24em, wider than any label on the page. At display size the
 *             extra air is what makes Cinzel read as carved rather than merely
 *             capitalised.
 *   RULE      patina-dim and full width, which is exactly what `PageTitle`
 *             puts under the page name. The app already uses rule weight to
 *             mark rank; this borrows the device one step down.
 *
 * The shared primitive is untouched, because a dozen other pages are built on
 * it and none of them has this problem.
 */
export default function PanelHeading({
  children,
  aside,
  open,
  onToggle,
}: {
  children: ReactNode;
  aside?: ReactNode;
  /** Present only for a collapsible section; turns the row into its handle. */
  open?: boolean;
  onToggle?: () => void;
}) {
  const row = (
    <div className="flex items-baseline justify-between gap-6 pb-3">
      <h2 className="inscription flex items-baseline gap-3 text-[1.375rem] tracking-[0.24em] text-bone">
        {onToggle ? (
          <span
            aria-hidden
            className="glyph inline-block text-[0.75rem] text-patina-dim transition-transform group-hover:text-patina"
            style={open ? { transform: "rotate(90deg)" } : undefined}
          >
            ▸
          </span>
        ) : null}
        {children}
      </h2>
      {aside ? (
        <span className="datum shrink-0 text-[0.6875rem] text-bone-faint">
          {aside}
        </span>
      ) : null}
    </div>
  );

  return (
    <div className="mb-6">
      {onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="group block w-full cursor-pointer text-left"
        >
          {row}
        </button>
      ) : (
        row
      )}
      <div className="h-px w-full bg-patina-dim" />
    </div>
  );
}
