import Link from "next/link";

const SECTIONS = [
  {
    href: "/birth-chart",
    label: "Birth Chart",
    description: "The natal positions — a fixed map of where everything stood at the moment of birth.",
  },
  {
    href: "/astro/cycles",
    label: "Cycles",
    description: "Long transits and returns, laid out as bands across time.",
  },
  {
    href: "/astro/cycles-explorer",
    label: "Explorer",
    description: "Browse and filter every active and upcoming cycle.",
  },
  {
    href: "/transits",
    label: "Transits",
    description: "Day-to-day planetary movements against the natal chart.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col justify-between px-10 py-14">
      {/* Hero */}
      <div className="max-w-lg">
        <h1 className="inscription text-[2.25rem] leading-tight text-bone">
          Oddessi
        </h1>
        <p className="inscription mt-1 text-[1rem] italic text-bone-faint">
          journey home
        </p>
        <p className="datum mt-6 text-[0.75rem] leading-relaxed text-bone-soft">
          A study of symbols and timelines. Each section reads the same chart —
          choose a lens below or pick one from the sidebar.
        </p>
      </div>

      {/* Section grid */}
      <nav className="mt-16 grid grid-cols-2 gap-px border border-rule-faint bg-rule-faint">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col gap-3 bg-void px-8 py-8 transition-colors hover:bg-surface-alt"
          >
            <span className="datum text-[0.6875rem] uppercase tracking-[0.22em] text-patina">
              {s.label}
            </span>
            <span className="inscription text-[0.8125rem] leading-relaxed text-bone-soft transition-colors group-hover:text-bone">
              {s.description}
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer line */}
      <p className="mt-14 text-[0.625rem] italic leading-relaxed text-bone-faint opacity-50">
        A study of symbols and timelines.
      </p>
    </div>
  );
}
