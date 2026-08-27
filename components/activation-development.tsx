//components/activation-development.tsx

"use client";

import type { ActivationNow, ActivationWindow } from "@/lib/growth";
import ActivationVectors from "@/components/activation-vectors";
import { T } from "@/components/growth-ui";

/**
 * Development — what the season is asking for, stated once, in the open.
 *
 * The page had three depths and the answer was at the bottom of all of them.
 * A reader clicked a bar, read five instrument fields in a narrow column,
 * found a disclosure called "Interpretation", opened it, and only then saw
 * what their chart was asking them to develop. Every one of those steps was
 * defensible on its own and together they buried the only part anyone came
 * for. The instrument panel answers "how much and what kind"; this answers
 * "so what", and "so what" does not belong behind a toggle.
 *
 * It sits directly under the chart at full width, which the sidebar could not
 * offer: the vectors want two columns and an arrow between them, and 288px
 * wraps the pair. The drawer still exists for the whole reading — the thesis,
 * the trap, the arenas, the evidence — and this panel is deliberately not a
 * summary of it. It is the three or four things a reader should leave with if
 * they never open anything else.
 *
 * The two arrows at the top are the coarsest honest statement of a season, and
 * they are independent rather than opposed for a reason argued at length in
 * `activation-vectors.ts`: a square sits on both ends at once, and a see-saw
 * would have to draw that as the midpoint, which is the one thing it is not.
 */
export default function ActivationDevelopment({
  reading: r,
  onOpen,
}: {
  reading: ActivationNow;
  onOpen: (w: ActivationWindow) => void;
}) {
  const v = r.vectors;

  return (
    <section className="mt-12 border-t border-rule pt-7">
      {/* The rule spans the page because it divides the page. The panel does
          not: at the full 6xl the two columns are ~520px each holding a single
          noun, and the arrow between them joins two things standing at
          opposite ends of the room. Capped and centred, the table is the
          width of its own content and the page has one column again. */}
      <div className="mx-auto max-w-3xl">
        {/* Centred with the table rather than pushed to the two far corners.
            Justified apart, the kicker and the link were the widest thing in
            the panel and they framed a centred table by sitting outside it,
            which read as a header belonging to the page rather than to what is
            under it. */}
        <div className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-2">
          {/* The reading's own word for the section — "Develop", "Revisit",
              "Your development" — rather than a fixed "Development" with the
              reading's word repeated one line below it. */}
          <p className={`${T.tiny} text-bone-faint`}>
            {v.heading}
            {r.ages ? ` · age ${r.ages}` : ""}
          </p>
          {r.window ? (
            <button
              type="button"
              onClick={() => onOpen(r.window as ActivationWindow)}
              className={`${T.tiny} text-patina-dim transition-colors hover:text-patina`}
            >
              Full reading →
            </button>
          ) : null}
        </div>

        {/* The pull used to be drawn here as two opposed bars. It has moved to
          the meter above the chart, where it belongs: the balance changes date
          by date and this panel only changes when a season is clicked, so the
          one figure that should have followed the cursor was the one holding
          still. */}
        <ActivationVectors v={v} heading={false} />
      </div>
    </section>
  );
}
