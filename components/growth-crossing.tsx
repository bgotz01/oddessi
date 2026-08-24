"use client";

import type { Trajectory } from "@/lib/growth";

import { T, type ChapterKey } from "@/components/growth-ui";

/**
 * The Crossing — a flag, and nothing else.
 *
 * A crossing is a body ninety degrees from both ends of the axis at once: it
 * asks for something neither pole resolves, which is a different claim from
 * ordinary resistance and worth knowing about at a glance.
 *
 * Knowing about it is all this does. It used to expand in place into demand,
 * conflict, interruption, integration and provenance, which cost most of a
 * screen between the Arc and the Conversion — and for a chart with more than
 * one crossing body it opened on "Several demands cut across the move", a
 * sentence with no chart in it at all. The interpretation is the same length
 * whether it sits here or in a panel, and in a panel it is not standing between
 * two sections that are trying to be read in sequence.
 *
 * So the page states the fact and names the bodies, and the Crossing tab of the
 * drawer holds the reading. Naming the bodies is what keeps this from being a
 * badge: "Mars" is already a claim a reader of this chart can recognise, where
 * "this chart has a crossing" is trivia.
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

  const bodies = t.crossing.bodies;

  return (
    <button
      type="button"
      onClick={() => onOpen("crossing")}
      className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 border-l-2 border-ember/60 py-0.5 pl-4 text-left"
    >
      <span className={`${T.tiny} text-ember`}>The crossing</span>

      <span className={`${T.tiny} text-bone-soft`}>
        {bodies.map((c) => c.body).join(" · ")}
      </span>

      {/* The demand only when there is one body to attribute it to. Two bodies
          make two demands, and the honest summary of two demands is their
          names — which are already above. */}
      {t.crossing.single ? (
        <span className={`${T.tiny} text-bone-faint`}>
          {bodies[0].interpretation.demand}
        </span>
      ) : null}

      <span
        className={`${T.tiny} text-bone-faint transition-colors group-hover:text-patina`}
      >
        →
      </span>
    </button>
  );
}
