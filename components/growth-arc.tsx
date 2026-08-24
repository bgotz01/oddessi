"use client";

import { bodyColor } from "@/lib/bodies";
import { bodyGlyph, signGlyph } from "@/lib/symbols";
import {
  getHouseTitle,
  type House,
} from "@/lib/astrology/house-categories";
import type { Trajectory } from "@/lib/growth";

import GrowthRoad, {
  ROAD_FROM,
} from "@/components/growth-road";
import GrowthCrossing from "@/components/growth-crossing";

import {
  SHOWN,
  T,
  type ChapterKey,
} from "@/components/growth-ui";

/**
 * 01 · Arc — where you are going.
 *
 * The page's hero and the one thing a reader should still have a week later:
 *
 *     INTERPRETER  ─────✕─────▶  AUTHOR
 *
 * Every other view of the nodes lists them, and a list has no direction in it —
 * which is the one thing about the nodes that is not true of an ordinary
 * placement. So the axis is drawn as a road and read left to right.
 *
 * The archetypes sit above their placements because the derived reading is the
 * product. "Interpreter → Author" answers the question; "Libra H3 → Aries H9"
 * is provenance beneath it.
 *
 * THE COMPETENCE and THE DIRECTION name the poles deliberately. The South Node
 * is developed capacity rather than territory to discard. It is the material
 * the new direction has to convert.
 *
 * A square to the axis is different from ordinary resistance:
 *
 *     RESISTANCE  pulls backward toward the developed strategy.
 *     CROSSING    cuts sideways across both ends of the axis.
 *
 * GrowthRoad therefore draws a ✕ only when a genuine square exists, and
 * GrowthCrossing names the bodies behind it in a single line beneath. The
 * reading itself is a drawer tab: it modifies the Arc rather than being another
 * chapter, but it is also two paragraphs of interpretation, and two paragraphs
 * standing between the Arc and the Conversion break the sequence they are
 * supposed to belong to.
 *
 * The final part turns the axis into something recognisable in ordinary life:
 *
 *     the old move   ·  questions that catch it
 *     the new move   ·  questions that open it
 *
 * Both moves and the developmental questions come from the sign × house table,
 * so they are written for Aries IN THE NINTH rather than for Aries and for the
 * ninth separately. The difference is the whole point: "Stake your worldview"
 * and "Act on the problem" are both Aries, and a reader who got the generic
 * sentence would have to do that specialisation in their head.
 *
 * The questions on the OLD side stay sign-level on purpose. The combo table is
 * developmental throughout — every entry asks its role to grow — and pointing
 * that at the departing pole would have the page urging the reader to develop
 * the competence it just said they are converting. `reflexQuestions` is the
 * only table that catches a move in the act, which is what this column is for.
 * The move above them is specialised, so the generic questions land against a
 * sentence that is true of this chart alone.
 */

export default function GrowthArc({
  t,
  onOpen,
}: {
  t: Trajectory;
  onOpen: (chapter: ChapterKey) => void;
}) {
  const toColor = bodyColor("North Node");

  // A chart stored without houses has no combo to look up, and falls back to
  // the sign-level questions the page has always had.
  const opening = t.practice.arriving?.questions ?? t.questions;

  return (
    <section className="@container">
      {/* ── Section label ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => onOpen("arc")}
        className={`${T.tiny} mb-9 block text-patina-dim transition-colors hover:text-patina`}
      >
        01 · Arc
      </button>

      {/* ════════════════════════════════════════════════════════════════
          THE ROAD
          ════════════════════════════════════════════════════════════════ */}

      <GrowthRoad
        fromLabel="The competence"
        toLabel="The direction"
        from={t.arc.from}
        to={t.arc.into}
        toColor={toColor}
        onFrom={() => onOpen("arc")}
        onTo={() => onOpen("arc")}
        mark={
          t.crossing ? (
            <span
              aria-hidden
              title="A part of the chart cuts across both ends of the nodal axis"
              className="relative z-10 flex items-center bg-void px-3.5"
            >
              <span className="glyph text-[1.125rem] leading-none text-ember">
                ✕
              </span>
            </span>
          ) : undefined
        }
      />

      {/* ── Astrological provenance ──────────────────────────────────── */}
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 @2xl:grid-cols-2">
        <p className={`${T.tiny} text-bone-faint`}>
          <span
            className="glyph mr-1.5 text-[0.8125rem]"
            style={{
              color: ROAD_FROM,
            }}
          >
            {bodyGlyph(t.from.node)}
          </span>

          <span className="glyph mr-1 text-[0.75rem]">
            {signGlyph(t.from.sign)}
          </span>

          {t.from.sign} {t.from.degree}

          {t.from.house
            ? ` · H${t.from.house}`
            : ""}

          <span className="mt-1 block">
            {t.from.house
              ? getHouseTitle(
                t.from.house as House,
              )
              : ""}
          </span>
        </p>

        <p className={`${T.tiny} text-bone-faint @2xl:text-right`}>
          <span className="glyph mr-1 text-[0.75rem]">
            {signGlyph(t.to.sign)}
          </span>

          {t.to.sign} {t.to.degree}

          {t.to.house
            ? ` · H${t.to.house}`
            : ""}

          <span
            className="glyph ml-1.5 text-[0.8125rem]"
            style={{
              color: toColor,
            }}
          >
            {bodyGlyph(t.to.node)}
          </span>

          <span className="mt-1 block">
            {t.to.house
              ? getHouseTitle(
                t.to.house as House,
              )
              : ""}
          </span>
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          THE CROSSING
          ════════════════════════════════════════════════════════════════

          Conditional, and one line. The road carries the ✕; this names the
          bodies behind it and opens the Crossing tab, where the reading is.
      */}
      {t.crossing ? (
        <div className="mt-7">
          <GrowthCrossing
            t={t}
            onOpen={onOpen}
          />
        </div>
      ) : null}

      {/* ════════════════════════════════════════════════════════════════
    THE ARC IN PRACTICE
    ════════════════════════════════════════════════════════════════ */}

      <div className="mt-14">
        <p className={`${T.tiny} text-bone-faint @2xl:text-center`}>
          The arc in four moves
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5 @2xl:justify-center">
          {t.strapline.map((beat, index) => (
            <div
              key={beat}
              className="flex items-center gap-2.5"
            >
              {index > 0 ? (
                <span
                  aria-hidden
                  className="glyph text-[0.6875rem] text-patina-dim"
                >
                  →
                </span>
              ) : null}

              <span className="rounded-sm border border-rule px-4 py-2.5 text-[1.0625rem] leading-none text-bone-soft">
                {beat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          QUESTIONS ACROSS THE AXIS
          ════════════════════════════════════════════════════════════════

          Two poles, two columns, and as little air between them as the
          reading survives. The earlier version stacked four label lines and
          six questions at reading size down a half-width column, which spent
          most of a screen on eight short sentences and made a dense reading
          look like a landing page.

          Three things pay for that: the label carries both jobs at once (THE
          OLD MOVE · CATCH IT), so the second row of labels is gone; the
          questions drop to supporting size, because the move above them is
          the finding and they are how you test it; and each list hangs off a
          hairline rule, which groups it without needing whitespace to do the
          same work. The rule is also what keeps the ragged column — three
          short questions beside three long ones — reading as two lists rather
          than as a gap.
      */}

      <button
        type="button"
        onClick={() => onOpen("arc")}
        className="group mt-12 block w-full border-t border-rule pt-6 text-left"
      >
        <div className="grid gap-x-14 gap-y-8 @2xl:grid-cols-2">
          {/* Old / practised reflex */}
          <div>
            <p className={`${T.tiny} text-bone-faint`}>
              The old move · catch it
            </p>

            {t.practice.departing ? (
              <p className="mt-2 text-[1.0625rem] leading-snug text-bone-soft">
                {t.practice.departing.move}
              </p>
            ) : null}

            <ul className="mt-3.5 space-y-2 border-l border-rule pl-4">
              {t.reflexQuestions
                .slice(0, SHOWN)
                .map((question) => (
                  <li
                    key={question}
                    className="text-[0.9375rem] leading-snug text-bone-faint"
                  >
                    {question}
                  </li>
                ))}
            </ul>
          </div>

          {/* New / developmental opening */}
          <div>
            <p
              className={T.tiny}
              style={{
                color: toColor,
              }}
            >
              The new move · open it
            </p>

            {t.practice.arriving ? (
              <p className="mt-2 text-[1.0625rem] leading-snug text-bone">
                {t.practice.arriving.move}
              </p>
            ) : null}

            <ul className="mt-3.5 space-y-2 border-l border-patina-dim pl-4">
              {opening
                .slice(0, SHOWN)
                .map((question) => (
                  <li
                    key={question}
                    className="text-[0.9375rem] leading-snug text-bone-soft"
                  >
                    {question}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <span className={`${T.tiny} mt-7 block text-bone-faint transition-colors group-hover:text-patina`}>
          Explore the full axis →
        </span>
      </button>
    </section>
  );
}