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
 *
 * The links are grouped by *system*, because a system is a whole way of
 * dividing a life and its pages do not interleave: nothing under Chinese takes
 * a sign or a house, nothing under Western takes a stem or a branch. The chart
 * selector stays above both, since the birth being read is the same either way
 * — one person, two instruments.
 */
type NavItem =
  | { href: string; label: string; children?: never }
  | { href: string; label: string; children: { href: string; label: string }[] };

interface NavGroup {
  /** Null for the group that needs no banner — the chart itself. */
  label: string | null;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    label: null,
    items: [{ href: "/birth-chart", label: "Birth Chart" }],
  },
  {
    label: "Western",
    items: [
      { href: "/astro/planets", label: "Planets" },
      { href: "/astro/houses", label: "Houses" },
      {
        href: "/astro/cycles",
        label: "Cycles",
        children: [{ href: "/astro/cycles/explorer", label: "Explorer" }],
      },
      { href: "/transits", label: "Transits" },
    ],
  },
  {
    label: "Chinese",
    items: [
      { href: "/chinese", label: "Four Pillars" },
      { href: "/chinese/luck-pillars", label: "Luck Pillars" },
    ],
  },
  {
    // Last, and in its own group. It belongs to neither section above, and
    // filing it under either would imply that section owns the reading.
    label: "Both",
    items: [{ href: "/compare", label: "Comparison" }],
  },
];

const ALL_HREFS = NAV.flatMap((group) =>
  group.items.flatMap((item) => [
    item.href,
    ...(item.children?.map((child) => child.href) ?? []),
  ]),
);

/**
 * The one link the current path belongs to — the longest prefix match, so
 * `/chinese/luck-pillars` lights the luck pillars rather than also lighting
 * `/chinese`, while `/transits/abc` still lights Transits.
 */
function matchHref(pathname: string): string | null {
  return (
    ALL_HREFS.filter(
      (href) => pathname === href || pathname.startsWith(`${href}/`),
    ).sort((a, b) => b.length - a.length)[0] ?? null
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const match = matchHref(pathname);

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
          {NAV.map((group, index) => (
            <div key={group.label ?? "chart"} className="flex flex-col items-center gap-1">
              {/* A hairline stands in for the group name at this width. */}
              {index > 0 ? (
                <span aria-hidden className="my-1.5 h-px w-4 bg-rule" />
              ) : null}
              {group.items.map((item) => {
                const active =
                  match === item.href ||
                  (item.children?.some((child) => child.href === match) ?? false);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${active ? "text-patina" : "text-bone-faint hover:text-bone"
                      }`}
                  >
                    {/* First letters as compact nav hint */}
                    <span className="datum text-[0.5rem] uppercase tracking-widest">
                      {item.label.slice(0, 2)}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
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
        {NAV.map((group) => (
          <div key={group.label ?? "chart"} className="pb-2">
            {group.label ? (
              <p className="eyebrow px-6 pt-4 pb-2 text-bone-faint/70">
                {group.label}
              </p>
            ) : null}

            {group.items.map((item) => {
              const active =
                match === item.href ||
                (item.children?.some((child) => child.href === match) ?? false);
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
                      const childActive = match === child.href;
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
          </div>
        ))}
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
