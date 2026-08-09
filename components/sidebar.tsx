"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ChartSelector from "@/components/chart-selector";

/**
 * The app rail: chart selector, then ways of looking at whichever chart it has
 * chosen. Stands down on /council, which brings a sessions rail of its own.
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
  const [collapsed, setCollapsed] = useState(false);

  // The council brings its own rail — chart selector on top, saved sessions
  // below — so this one stands down rather than stacking two rails side by side.
  if (pathname.startsWith("/council")) return null;

  if (collapsed) {
    return (
      <aside className="flex w-10 shrink-0 flex-col items-center border-r border-rule py-3 gap-3">
        <button
          onClick={() => setCollapsed(false)}
          aria-label="Expand sidebar"
          className="text-bone-faint hover:text-bone transition-colors"
        >
          {/* chevron-right */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <nav className="flex flex-col items-center gap-1 mt-1">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${active ? "text-patina" : "text-bone-faint hover:text-bone"
                  }`}
              >
                {/* First letter as compact nav hint */}
                <span className="datum text-[0.5rem] uppercase tracking-widest">
                  {item.label.slice(0, 2)}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    );
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col overflow-y-auto border-r border-rule">
      <div className="flex items-center justify-between border-b border-rule-faint px-4 py-2">
        <button
          onClick={() => setCollapsed(true)}
          aria-label="Collapse sidebar"
          className="ml-auto text-bone-faint hover:text-bone transition-colors"
        >
          {/* chevron-left */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

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
