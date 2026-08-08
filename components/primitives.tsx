import type { ReactNode } from "react";
import type { BandStatus } from "@/lib/band";

/** A carved section heading with a rule beneath it. */
export function SectionHeading({
  children,
  aside,
}: {
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between gap-6 pb-3">
        <h2 className="inscription text-[0.8125rem] text-bone">{children}</h2>
        {aside ? (
          <span className="datum text-[0.6875rem] text-bone-faint">{aside}</span>
        ) : null}
      </div>
      <div className="h-px bg-rule" />
    </div>
  );
}

/** A page title block: eyebrow, name, and a rule. */
export function PageTitle({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="pt-16 pb-12">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h1 className="inscription text-[2rem] leading-tight text-bone">
        {title}
      </h1>
      <div className="mt-6 h-px w-full bg-patina-dim" />
      {lede ? (
        <p className="mt-6 max-w-2xl text-[1.0625rem] font-light text-bone-soft">
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
