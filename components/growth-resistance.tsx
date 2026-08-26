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
 *
 * The Hard crossing block that used to close this section is gone. A square to
 * the axis now has its own reading inside the Arc's crossing tab, and repeating
 * it here — flattened to "cannot be bypassed" — duplicated that reading while
 * undoing the distinction the Arc just drew between a crossing (cuts sideways,
 * has to be incorporated) and resistance (pulls backward, only has to be
 * noticed). This section answers one question only: when growth gets
 * uncomfortable, what familiar strategy do you retreat into? The loop below is
 * that question drawn as a mechanism — uncertainty resolving into the same
 * developed competence every time, which relieves the discomfort without ever
 * converting it, so growth stalls exactly where it started.
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

      {/* ════════════════════════════════════════════════════════════════
          THE LOOP
          ════════════════════════════════════════════════════════════════

          Sign-generic on purpose, for now — this names the mechanism every
          South Node retreat shares, not the sign × house specific version of
          it. That specificity is real and worth building (a Libra Third loop
          runs through "another source"; a Libra Tenth loop runs through
          "widening consultation"), but it wants its own table, the way the
          developmental questions got one, rather than being sketched inline
          here first.
      */}
      <div className="mt-12">
        <p className={`${T.tiny} text-bone-faint`}>The loop</p>
        <div className="mt-5 flex flex-col items-start gap-1.5 @2xl:flex-row @2xl:flex-wrap @2xl:items-center @2xl:gap-x-3 @2xl:gap-y-2">
          {LOOP_STEPS.map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-3"
            >
              {index > 0 ? (
                <span
                  aria-hidden
                  className="glyph text-[0.6875rem] text-patina-dim @2xl:hidden"
                >
                  ↓
                </span>
              ) : null}
              {index > 0 ? (
                <span
                  aria-hidden
                  className="glyph hidden text-[0.6875rem] text-patina-dim @2xl:block"
                >
                  →
                </span>
              ) : null}
              <span className="text-[0.9375rem] leading-snug text-bone-soft">
                {step}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="glyph text-[0.6875rem] text-ember"
            >
              ↺
            </span>
            <span className="text-[0.9375rem] leading-snug text-bone-faint">
              back to uncertainty
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-12 @2xl:grid-cols-[1fr_1fr] @2xl:gap-16">
        <div>
          <p className={`${T.tiny} text-bone-faint`}>Catch it happening</p>
          <ul className="mt-5 space-y-3.5">
            {t.resistance.tells.map((tell) => (
              <li key={tell} className="text-[1.0625rem] leading-snug text-bone">
                {tell}
              </li>
            ))}
          </ul>
        </div>

        {/* ── The interrupt ──────────────────────────────────────────────
            Matches the Arc's Old move / New move grammar, and the data
            model's own naming — oldPole / developedPole — rather than the
            Less/More labels that used to sit over the same two sentences. */}
        <div>
          <p className={`${T.tiny} text-bone-faint`}>The interrupt</p>

          <div className="mt-5 grid gap-4 @2xl:grid-cols-[1fr_auto_1fr] @2xl:items-center">
            <div>
              <p className={`${T.tiny} text-bone-faint`}>Old reflex</p>
              <p className="mt-2 text-[1.0625rem] leading-snug text-bone-soft">
                {t.movement.expression.oldPole}
              </p>
            </div>

            <span
              aria-hidden
              className="glyph hidden text-patina @2xl:block"
            >
              →
            </span>

            <div>
              <p className={`${T.tiny} text-patina`}>New move</p>
              <p className="mt-2 text-[1.0625rem] leading-snug text-bone">
                {t.movement.expression.developedPole}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpen("resistance")}
        className={`${T.tiny} mt-8 text-bone-faint transition-colors hover:text-patina`}
      >
        Understand why the old strategy still wins →
      </button>
    </section>
  );
}

const LOOP_STEPS = [
  "Uncertainty",
  "Familiar competence",
  "Temporary relief",
  "Stalled growth",
];
