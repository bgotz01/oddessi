// components/western/macro/macro-planet-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PLANETS = [
  { label: "Macro", glyph: "⊕", href: "/western/macro" },
  { label: "Jupiter", glyph: "♃", href: "/western/macro/jupiter" },
  { label: "Neptune", glyph: "♆", href: "/western/macro/neptune" },
  { label: "Uranus", glyph: "♅", href: "/western/macro/uranus" },
  { label: "Pluto", glyph: "♇", href: "/western/macro/pluto" },
] as const;

export default function MacroPlanetNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Macro planets"
      className="mb-4 flex items-center justify-center gap-1 border-b border-rule pt-4 pb-3"
    >
      {PLANETS.map(({ label, glyph, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`inscription inline-flex items-center gap-2 rounded-[2px] px-5 py-2 text-[0.8125rem] tracking-[0.12em] transition-colors ${active
              ? "bg-surface-alt text-bone"
              : "text-bone-faint hover:bg-surface-alt hover:text-bone-soft"
              }`}
          >
            <span aria-hidden="true" className="glyph text-[1rem] leading-none text-patina">
              {glyph}
            </span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
