import type { ReactNode } from "react";
import type { BandStatus } from "@/lib/band";

/**
 * A carved section heading with a rule beneath it.
 *
 * Pass `onToggle` to make it the handle of a collapsible section: the whole
 * row becomes the control, and the marker turns to face the open body. The
 * aside stays visible either way, so a closed section still reports what is
 * inside it.
 */
export function SectionHeading({
  children,
  aside,
  open,
  onToggle,
}: {
  children: ReactNode;
  aside?: ReactNode;
  open?: boolean;
  onToggle?: () => void;
}) {
  const row = (
    <div className="flex items-baseline justify-between gap-6 pb-3.5">
      <h2 className="inscription flex items-baseline gap-3 text-[1.0625rem] tracking-[0.14em] text-bone">
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
        <span className="datum text-[0.6875rem] text-bone-faint">{aside}</span>
      ) : null}
    </div>
  );

  return (
    <div className="mb-8">
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
      <div className="h-px bg-rule-faint" />
    </div>
  );
}

/**
 * A page title block: eyebrow, name, and a rule.
 *
 * `aside` rides the eyebrow line, right-aligned, for a page-level control that
 * has earned a place at the top without earning a block of its own.
 */
export function PageTitle({
  eyebrow,
  title,
  lede,
  aside,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="pt-16 pb-12">
      <div className="mb-4 flex items-baseline justify-between gap-6">
        <p className="eyebrow">{eyebrow}</p>
        {aside}
      </div>
      <h1 className="inscription text-[2rem] leading-tight text-bone">
        {title}
      </h1>
      <div className="mt-6 h-px w-full bg-patina-dim" />
      {lede ? (
        <p className="mt-6 max-w-3xl text-[1.1875rem] text-bone-soft">
          {lede}
        </p>
      ) : null}
    </div>
  );
}

const STATUS_STYLE: Record<BandStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "text-patina border-patina" },
  completed: { label: "Closed", className: "text-bone-faint border-rule" },
  upcoming: { label: "Ahead", className: "text-ember border-ember-dim" },
};

export function StatusMark({ status }: { status: BandStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <span
      className={`datum inline-block border-l pl-2 text-[0.625rem] uppercase tracking-[0.2em] ${s.className}`}
    >
      {s.label}
    </span>
  );
}

/** Themes rendered as tracked-out micro labels. */
export function Themes({ themes }: { themes: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1">
      {themes.map((t) => (
        <span
          key={t}
          className="datum text-[0.625rem] uppercase tracking-[0.22em] text-patina-dim"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
