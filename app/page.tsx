import Link from "next/link";

const SYSTEMS = [
  {
    href: "/western/cycles",
    label: "Western",
    glyph: "♄",
    sublabel: "Planets · Houses · Transits",
  },
  {
    href: "/eastern/four-pillars",
    label: "Eastern",
    glyph: "天",
    sublabel: "Four Pillars · Luck Cycles",
  },
  {
    href: "/numerology",
    label: "Numerology",
    glyph: "∞",
    sublabel: "Life Path · Cycles · Pinnacles",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col px-10 py-14 gap-16">

      {/* Hero + right column (Birth Chart + Overview) */}
      <div className="flex items-start justify-between gap-8">
        <div>
          <h1 className="inscription text-[2.5rem] leading-none tracking-[0.2em] text-bone">
            Oddessi
          </h1>
          <p className="inscription mt-2 text-[0.9rem] tracking-[0.3em] text-patina">
            journey home
          </p>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <Link
            href="/birth-chart"
            className="group flex items-center gap-2 border border-rule px-4 py-2 transition-colors hover:border-patina-dim hover:bg-surface-alt"
          >
            <span className="glyph text-[1rem] leading-none text-patina-dim transition-colors group-hover:text-patina" aria-hidden="true">◉</span>
            <span className="datum text-[0.625rem] uppercase tracking-[0.22em] text-bone-faint transition-colors group-hover:text-bone">
              Birth Chart
            </span>
          </Link>

          <Link
            href="/overview"
            className="group flex items-center gap-2 border border-rule px-4 py-2 transition-colors hover:border-patina-dim hover:bg-surface-alt"
          >
            <span className="glyph text-[1rem] leading-none text-patina-dim transition-colors group-hover:text-patina" aria-hidden="true">≡</span>
            <span className="datum text-[0.625rem] uppercase tracking-[0.22em] text-bone-faint transition-colors group-hover:text-bone">
              Overview
            </span>
          </Link>
        </div>
      </div>

      {/* Primary — three systems */}
      <section className="flex flex-col gap-4">
        <p className="eyebrow text-bone-faint/60">Systems</p>
        <nav className="grid grid-cols-3 gap-px border border-rule-faint bg-rule-faint">
          {SYSTEMS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative flex flex-col justify-between bg-void px-8 py-10 transition-colors hover:bg-surface-alt min-h-[220px]"
            >
              {/* Large glyph watermark */}
              <span
                className="glyph absolute right-7 top-6 select-none text-[4.5rem] leading-none text-patina-deep/60 transition-colors group-hover:text-patina-dim/40"
                aria-hidden="true"
              >
                {s.glyph}
              </span>

              {/* Title */}
              <span className="inscription text-[1.5rem] leading-none text-bone transition-colors group-hover:text-patina relative z-10">
                {s.label}
              </span>

              {/* Sublabel at bottom */}
              <span className="datum text-[0.6rem] uppercase tracking-[0.25em] text-bone-faint/60 transition-colors group-hover:text-bone-faint relative z-10">
                {s.sublabel}
              </span>
            </Link>
          ))}
        </nav>
      </section>

    </div>
  );
}
