// components/industry/music-concurrent.tsx
"use client";

import type { MusicCycleConcurrency } from "@/lib/industry/music-cycles";

/**
 * What the other clock was doing, inside a drawer that is about one of them.
 *
 * The same list the chart's readout carries, at reading length rather than
 * hover length. Each row is a way across: an era on one clock is the cheapest
 * route to the era on the other that ran underneath it, and making the reader
 * close the drawer, find the bar and point at it again is the kind of friction
 * that stops a comparison being made at all.
 */
export default function MusicConcurrent({
  links,
  onSelect,
}: {
  links: MusicCycleConcurrency[];
  onSelect: (segmentId: string) => void;
}) {
  if (links.length === 0) return null;
  const other = links[0].segment.planet;

  return (
    <div>
      <p className="eyebrow mb-1 text-[0.6875rem]">Meanwhile — {other}</p>
      <p className="mb-4 text-[0.9375rem] leading-snug text-bone-faint italic">
        The era on the other clock, and the years the two ran together.
      </p>

      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.segment.id}>
            <button
              type="button"
              onClick={() => onSelect(link.segment.id)}
              className="group flex w-full cursor-pointer items-baseline gap-3 border-l-2 py-1.5 pl-3 text-left transition-colors hover:bg-surface-alt"
              style={{ borderColor: link.segment.color }}
            >
              <span
                className="glyph shrink-0 text-[1rem] leading-none"
                style={{ color: link.segment.color }}
                aria-hidden="true"
              >
                {link.segment.glyph}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[1.0625rem] leading-snug text-bone">
                  {link.segment.headline}
                </span>
                <span className="datum mt-1 block text-[0.625rem] text-bone-faint">
                  {link.segment.planet} in {link.segment.sign} · together{" "}
                  {link.fromYear}–{link.toYear} ({link.years}{" "}
                  {link.years === 1 ? "year" : "years"})
                  {/* Named only when there is something to name — every pairing
                      has a duration, and dressing "no relation" up as a row of
                      its own would make the two that matter harder to find. */}
                  {link.resonance ? (
                    <span className="text-patina"> · {link.resonance}</span>
                  ) : null}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="datum shrink-0 text-[0.6875rem] text-bone-faint opacity-0 transition-opacity group-hover:opacity-100"
              >
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
