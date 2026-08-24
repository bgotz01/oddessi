//components/growth-resistance.tsx

"use client";

import type { Trajectory } from "@/lib/growth";
import { T, type ChapterKey } from "@/components/growth-ui";

/**
 * 03 · Resistance — what pulls you back.
 *
 * This lived as a button on the road for a while, which had two problems. It
 * gave the road a second entry point competing with the ✕, and it made the
 * resistance look like a property of the South Node placement it sat under
 * rather than a movement of its own. It is a movement: the page reads Arc ·
 * Conversion · Resistance · Tailwinds, and resistance and tailwinds are the two
 * halves of the same question — what is working against you, and what for.
 *
 * The tells carry the section. The `pullback` sentence explains the loop, but
 * the tells are how you notice it running, and they are written as behaviours
 * you can catch yourself in rather than as traits you either have or do not.
 */
export default function GrowthResistance({
  t,
  onOpen,
}: {
  t: Trajectory;
  onOpen: (chapter: ChapterKey) => void;
}) {
  return (
    <section className="@container">
      <button
        type="button"
        onClick={() => onOpen("resistance")}
        className="group block text-left"
      >
        <p className={`${T.tiny} text-patina-dim`}>03 · Resistance</p>
        <p className="inscription mt-5 text-[1.5rem] leading-tight text-bone">
          The pull back
        </p>
      </button>

      <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-bone-soft">
        {t.resistance.pullback}
      </p>
      <p className={`mt-4 max-w-2xl ${T.body}`}>{t.resistanceTurn}</p>

      <div className="mt-12 grid gap-12 @2xl:grid-cols-[1fr_1fr] @2xl:gap-16">
        <div>
          <p className={`${T.tiny} text-bone-faint`}>How it shows up</p>
          <ul className="mt-5 space-y-3.5">
            {t.resistance.tells.map((tell) => (
              <li key={tell} className="text-[1.0625rem] leading-snug text-bone">
                {tell}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={`${T.tiny} text-bone-faint`}>The turn</p>
          <div className="mt-5 space-y-5">
            <p>
              <span className={`${T.tiny} block text-bone-faint`}>Less</span>
              <span className="mt-1.5 block text-[1.0625rem] leading-snug text-bone-soft">
                {t.movement.expression.oldPole}
              </span>
            </p>
            <p>
              <span className={`${T.tiny} block text-patina`}>More</span>
              <span className="mt-1.5 block text-[1.0625rem] leading-snug text-bone">
                {t.movement.expression.developedPole}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Two genuinely different kinds of resistance, and the difference is
          worth a reader's attention: something encountered in the crossing has
          to be incorporated, while the origin's gravity only has to be noticed.
          The geometry behind the distinction — ninety degrees from both ends at
          once — is model documentation and belongs in the drawer, not here. */}
      <div className="mt-12 max-w-2xl border-l-2 border-ember/60 pl-5">
        <p className={`${T.tiny} text-ember`}>
          {(t.crossing?.bodies.length ?? 0)
            ? `Hard crossing · ${(t.crossing?.bodies ?? []).map((c) => c.body).join(" · ")}`
            : "No hard crossing"}
        </p>
        <p className="mt-2.5 text-[1.0625rem] leading-snug text-bone-soft">
          {(t.crossing?.bodies.length ?? 0)
            ? "This cannot be bypassed. It has to be taken into the movement rather than got around."
            : "The resistance is habitual rather than confrontational — the old strategy simply stays easier to reach."}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onOpen("resistance")}
        className={`${T.tiny} mt-8 text-bone-faint transition-colors hover:text-patina`}
      >
        Explore →
      </button>
    </section>
  );
}
