"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ChartSelector from "@/components/chart-selector";

/**
 * Chart-scoped navigation. Everything here is a way of looking at whichever
 * chart the selector above has chosen.
 *
 * Kept deliberately short. The previous incarnation reached thirty links across
 * six collapsible groups because nothing said no; this list is the "no".
 */
type NavItem =
  | { href: string; label: string; children?: never }
  | { href: string; label: string; children: { href: string; label: string }[] };

const NAV: NavItem[] = [
  { href: "/birth-chart", label: "Birth Chart" },
  { href: "/astro/planets", label: "Planets" },
  { href: "/astro/houses", label: "Houses" },
  {
    href: "/astro/cycles",
    label: "Cycles",
    children: [{ href: "/astro/cycles/explorer", label: "Explorer" }],
  },
  { href: "/transits", label: "Transits" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col overflow-y-auto border-r border-rule">
      <ChartSelector />

      <nav className="flex flex-col py-4">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <div key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`datum border-l-2 px-6 py-3 text-[0.6875rem] uppercase tracking-[0.22em] transition-colors flex ${active
                    ? "border-patina bg-surface text-patina"
                    : "border-transparent text-bone-soft hover:bg-surface-alt hover:text-bone"
                  }`}
              >
                {item.label}
              </Link>
              {item.children && active &&
                item.children.map((child) => {
                  const childActive = pathname === child.href;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      aria-current={childActive ? "page" : undefined}
                      className={`datum border-l-2 pl-10 pr-6 py-2 text-[0.625rem] uppercase tracking-[0.22em] transition-colors flex ${childActive
                          ? "border-patina text-patina"
                          : "border-transparent text-bone-faint hover:bg-surface-alt hover:text-bone-soft"
                        }`}
                    >
                      {child.label}
                    </Link>
                  );
                })}
            </div>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-rule-faint px-6 py-6">
        <p className="text-[0.875rem] font-light italic leading-relaxed text-bone-faint">
          A study of symbols
          <br />
          and timelines
        </p>
      </div>
    </aside>
  );
}
