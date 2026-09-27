"use client";

import { bodyGlyph } from "@/lib/symbols";

/**
 * What each body does to whatever house it stands in — one verb apiece.
 *
 * Lived on the Houses page as "How Bodies Act On A House". It is a standing
 * fact about the system rather than a reading of any chart, so it sits at the
 * foot of the Planets page as the key to the table above it — and renders even
 * when no chart is selected. Its partner, House Basics, does the same job on
 * the Houses page, with the same cell.
 */

/** One verb per body. The whole point is that they are not interchangeable. */
const VERBS: Array<[string, string]> = [
  ["Sun", "centralises"],
  ["Moon", "sensitises"],
  ["Mercury", "interprets"],
  ["Venus", "softens"],
  ["Mars", "energises"],
  ["Jupiter", "expands"],
  ["Saturn", "hardens"],
  ["Uranus", "disrupts"],
  ["Neptune", "dissolves"],
  ["Pluto", "transforms"],
];

export default function PlanetaryInfluences() {
  return (
    <div className="grid grid-cols-2 gap-px bg-rule-faint sm:grid-cols-3 lg:grid-cols-5">
      {VERBS.map(([body, verb]) => (
        <div key={body} className="bg-surface px-4 py-3 flex flex-col items-center text-center">
          <div className="flex items-baseline gap-2">
            <span className="glyph text-[1.25rem] text-patina">
              {bodyGlyph(body)}
            </span>
            <span className="inscription text-[0.75rem] text-bone">{body}</span>
          </div>
          <p className="mt-1 text-[1.0625rem] font-light text-bone-faint italic">
            {verb}
          </p>
        </div>
      ))}
    </div>
  );
}
