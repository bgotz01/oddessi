"use client";

import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import type { Trajectory } from "@/lib/growth";

import { T, type ChapterKey } from "@/components/western/growth/growth-ui";

/**
 * The Crossing — a flag, and nothing else.
 *
 * A crossing is a body ninety degrees from both ends of the axis at once: it
 * asks for something neither pole resolves, which is a different claim from
 * ordinary resistance and worth knowing about at a glance.
 *
 * Knowing about it is all this does. The interpretation — demand, conflict,
 * interruption, integration — is the Crossing tab of the drawer; on the page it
 * cost most of a screen between the Arc and the Conversion. Naming the bodies
 * is what keeps this from being a badge: "Mars" is already a claim a reader of
 * this chart can recognise, where "this chart has a crossing" is trivia.
 */
export default function GrowthCrossing({
  t,
  onOpen,
}: {
  t: Trajectory;
  onOpen: (chapter: ChapterKey) => void;
}) {
  if (!t.crossing) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => onOpen("crossing")}
      className="group flex w-full flex-wrap items-baseline gap-x-4 gap-y-1.5 rounded-sm border-l-2 border-ember bg-ember-dim/15 px-5 py-3.5 text-left"
    >
      <span className={`${T.micro} text-ember`}>Crossing</span>

      <span className={`flex flex-wrap items-baseline gap-x-3 ${T.read}`}>
        {t.crossing.bodies.map((c) => (
          <span key={c.body} className="flex items-baseline gap-1.5">
            <span className="glyph" style={{ color: bodyColor(c.body) }}>
              {bodyGlyph(c.body)}
            </span>
            {c.body}
          </span>
        ))}
      </span>

      <span className={T.body}>cuts across both ends of the axis</span>

      <span
        className={`${T.micro} ml-auto text-bone-soft transition-colors group-hover:text-patina`}
      >
        Read →
      </span>
    </button>
  );
}
