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
 * dividing a life and its pages do not interleave: nothing under Eastern takes
 * a sign or a house, nothing under Western takes a stem or a branch, and
 * nothing under Numerology takes either. The chart selector stays above all of
 * them, since the birth being read is the same throughout — one person, three
 * instruments.
 *
 * The route prefixes match the groups exactly — /western, /eastern,
 * /numerology — so a path names its own system and `systemsForPath` can scope
 * the conversation's memory off nothing more than the URL.
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
    items: [
      { href: "/birth-chart", label: "Birth Chart" },
      { href: "/overview", label: "Overview" },
    ],
  },
  {
    label: "Western",
    items: [
      { href: "/western/planets", label: "Planets" },
      { href: "/western/houses", label: "Houses" },
      { href: "/western/flow-grind", label: "Flow & Grind" },
      // Sits with the other natal readings rather than under Cycles, because it
      // reads the birth chart and nothing else. It is the one Western page with
      // no score on it — a direction has no magnitude — which is why it stands
      // as its own entry instead of a section on Houses.
      { href: "/western/growth", label: "Growth" },
      {
        href: "/western/cycles",
        label: "Cycles",
        children: [{ href: "/western/cycles/explorer", label: "Explorer" }],
      },
    ],
  },
  {
    label: "Eastern",
    items: [
      { href: "/eastern/four-pillars", label: "Four Pillars" },
      { href: "/eastern/luck-pillars", label: "Luck Pillars" },
    ],
  },
  {
    label: "Numerology",
    items: [
      { href: "/numerology", label: "Numbers" },
      { href: "/numerology/cycles", label: "Cycles" },
      // A sibling of Cycles rather than a child of it, which is what the route
      // says too. The chapters are one of the three clocks, not a detail view
      // of the other two — the nesting under Western Cycles is an explorer for
      // the same transits, and this is a different reading.
      { href: "/numerology/pinnacles", label: "Pinnacles" },
    ],
  },
  {
    label: "Gods",
    items: [
      { href: "/gods/greek", label: "Greek" },
    ],
  },
  {
    label: "Reference",
    items: [
      { href: "/symbols", label: "Symbols" },
      { href: "/monthly", label: "Monthly" },
    ],
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
 * `/western/cycles/explorer` lights the explorer rather than also lighting
 * `/western/cycles`, while `/numerology/cycles` does not light `/numerology`.
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
            <div key={group.label ?? `unlabelled-${index}`} className="flex flex-col items-center gap-1">
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
      {/* ChartSelector + collapse toggle share the same visual block */}
      <div className="relative">
        <ChartSelector />
        <button
          onClick={() => setCollapsed(true)}
          aria-label="Collapse sidebar"
          className="absolute right-3 top-3 text-bone-faint/50 transition-colors hover:text-bone"
        >
          {/* chevron-left */}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col py-4">
        {NAV.map((group, i) => (
          <div key={group.label ?? `unlabelled-${i}`} className="pb-2">
            {group.label ? (
              <p className="eyebrow px-6 pt-5 pb-2 border-t border-rule-faint mt-1">
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
