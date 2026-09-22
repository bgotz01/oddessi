// app/industry/music/page.tsx
import Link from "next/link";
import { PageTitle } from "@/components/primitives";

const SECTIONS = [
  {
    href: "/industry/music/timeline",
    planet: "♫",
    label: "Pop timeline",
    sublabel: "1960s–2020s · Artists & eras",
    description: "Seven decades of milestone artists. Compare their peak years and explore the sounds and industry shifts that shaped global pop.",
    comingSoon: false,
  },
  {
    href: "/industry/music/neptune",
    planet: "♆",
    label: "Neptune",
    sublabel: "Cultural ideal",
    description: "What does music culture idealize? Six eras from 1956 to 2040, each named by the sign Neptune occupied.",
    comingSoon: false,
  },
  {
    href: "/industry/music/uranus",
    planet: "♅",
    label: "Uranus",
    sublabel: "Disruption & innovation",
    description: "What breaks the existing musical model? Eleven eras of structural disruption from 1956 to 2033.",
    comingSoon: false,
  },
  {
    href: "/industry/music/pluto",
    planet: "♇",
    label: "Pluto",
    sublabel: "Power & industry structure",
    description: "Where is power concentrated? Six eras from 1957 to 2044, read on the same seven dimensions.",
    comingSoon: false,
  },
] as const;

export default function MusicIndustryPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <div className="pt-12">
        <PageTitle
          eyebrow="Industry · Music"
          title="Music Culture & Innovation"
          lede="Two planetary lenses on the same industry. Neptune maps the shifting cultural ideal — what music is for. Uranus maps disruption — what breaks the existing model."
        />
      </div>

      <div className="mt-8 mb-10 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-rule">
              <th className="pb-3 pr-6 w-[100px]">
                <span className="datum text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">Planet</span>
              </th>
              <th className="pb-3 pr-6">
                <span className="datum text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">What we’re studying</span>
              </th>
              <th className="pb-3">
                <span className="datum text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">Music question</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                glyph: "♆",
                planet: "Neptune",
                study: "Culture / collective imagination",
                question: "What does music mean to people? How do people experience and identify through it?",
              },
              {
                glyph: "♅",
                planet: "Uranus",
                study: "Technology / economics / disruption",
                question: "How is music created, distributed, discovered, and monetized?",
              },
              {
                glyph: "♇",
                planet: "Pluto",
                study: "Power / industry structure",
                question: "Who controls the music industry, and where is power concentrated?",
              },
            ].map((row, i) => (
              <tr key={row.planet} className={i % 2 === 0 ? "bg-surface-alt/30" : ""}>
                <td className="py-3 pr-6 align-top">
                  <span className="inline-flex items-center gap-2">
                    <span className="glyph text-[1.125rem] leading-none text-patina" aria-hidden="true">{row.glyph}</span>
                    <span className="datum text-[0.6875rem] uppercase tracking-[0.1em] text-bone">{row.planet}</span>
                  </span>
                </td>
                <td className="py-3 pr-6 align-top text-[1.125rem] leading-snug text-bone-soft">
                  {row.study}
                </td>
                <td className="py-3 align-top text-[1.125rem] italic leading-snug text-bone-faint">
                  {row.question}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          s.comingSoon ? (
            <div
              key={s.href}
              className="group flex flex-col gap-5 border border-rule p-8 opacity-50"
            >
              <div className="flex items-center gap-3">
                <span className="glyph text-[2rem] leading-none text-bone-faint">
                  {s.planet}
                </span>
                <div>
                  <p className="inscription text-[1.125rem] leading-none text-bone-faint">
                    {s.label}
                  </p>
                  <p className="datum mt-1 text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">
                    {s.sublabel}
                  </p>
                </div>
                <span className="datum ml-auto text-[0.5625rem] uppercase tracking-[0.16em] text-bone-faint">
                  Coming soon
                </span>
              </div>
              <p className="text-[1rem] leading-relaxed text-bone-faint">
                {s.description}
              </p>
            </div>
          ) : (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col gap-5 border border-rule p-8 transition-colors hover:border-patina-dim hover:bg-surface-alt"
            >
              <div className="flex items-center gap-3">
                <span className="glyph text-[2rem] leading-none text-patina transition-colors group-hover:text-patina">
                  {s.planet}
                </span>
                <div>
                  <p className="inscription text-[1.125rem] leading-none text-bone transition-colors group-hover:text-patina">
                    {s.label}
                  </p>
                  <p className="datum mt-1 text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">
                    {s.sublabel}
                  </p>
                </div>
                <span className="datum ml-auto text-[0.6875rem] uppercase tracking-[0.16em] text-bone-faint opacity-0 transition-opacity group-hover:opacity-100">
                  Explore →
                </span>
              </div>
              <p className="text-[1rem] leading-relaxed text-bone-soft">
                {s.description}
              </p>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}
