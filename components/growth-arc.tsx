"use client";

import { useState } from "react";

import { bodyColor } from "@/lib/bodies";
import {
  getHouseTitle,
  type House,
} from "@/lib/astrology/house-categories";
import type { Trajectory } from "@/lib/growth";

import GrowthRoad from "@/components/growth-road";
import GrowthCrossing from "@/components/growth-crossing";
import { Expand } from "@/components/growth-field";

import {
  SHOWN,
  T,
  prime,
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

  // Collapsed by default — see the doc comment above the disclosure below.
  const [questionsOpen, setQuestionsOpen] = useState(false);

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
        fromLabel="South Node · The competence"
        toLabel="North Node · The direction"
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

      {/* ── Astrological provenance ──────────────────────────────────────
          House and sign are the two facts a reader actually orients on, so
          they read as one unit at the top of the scale — "H3 Libra", house
          first, because the house is the part of life this is happening in
          and the sign is how it is done. The degree is precision rather than
          something to read at a glance: it sits behind them at the label
          size, raised like an exponent so it attaches to the placement
          without competing for the line. No glyphs — a reader who already
          knows the South Node from a Libra dot has no use for either symbol
          here, and for one who doesn't, an unlabelled glyph teaches nothing
          a word doesn't already say plainer. */}
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 @2xl:grid-cols-2">
        <p className={`${T.tiny} text-bone-faint`}>
          <span className="text-[0.9375rem] text-bone-soft">
            {t.from.house ? `H${t.from.house} ` : ""}
            {t.from.sign}
          </span>
          <span className="ml-1.5 align-super text-[0.625rem] text-bone-faint">
            {prime(t.from.degree)}
          </span>

          <span className="mt-1 block">
            {t.from.house
              ? getHouseTitle(
                t.from.house as House,
              )
              : ""}
          </span>
        </p>

        <p className={`${T.tiny} text-bone-faint @2xl:text-right`}>
          <span className="text-[0.9375rem] text-bone-soft">
            {t.to.house ? `H${t.to.house} ` : ""}
            {t.to.sign}
          </span>
          <span className="ml-1.5 align-super text-[0.625rem] text-bone-faint">
            {prime(t.to.degree)}
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
          reading survives. The label carries both jobs at once (THE OLD MOVE
          · CATCH IT), the questions drop to supporting size because the move
          above them is the finding and they are how you test it, and each
          list hangs off a hairline rule rather than whitespace.

          Collapsed by default and named like the disclosure it is: this is
          the deepest layer the page shows inline, six questions under two
          moves, and a reader scanning the four sections should not have to
          scroll past all of it to reach Conversion. "Questions" says what is
          behind the toggle without repeating "old move" / "new move", which
          are the columns' own labels once it opens.
      */}

      <div className="mt-12 border-t border-rule pt-6">
        <button
          type="button"
          onClick={() => setQuestionsOpen((value) => !value)}
          aria-expanded={questionsOpen}
          className="group flex items-baseline gap-3 text-left"
        >
          <span
            aria-hidden
            className="glyph inline-block shrink-0 text-[0.625rem] text-patina-dim transition-transform group-hover:text-patina"
            style={questionsOpen ? { transform: "rotate(90deg)" } : undefined}
          >
            ▸
          </span>
          <span
            className={`${T.tiny} text-bone-faint transition-colors group-hover:text-bone-soft`}
          >
            Questions
          </span>
        </button>

        {questionsOpen ? (
        <div className="mt-6 grid gap-x-14 gap-y-8 @2xl:grid-cols-2">
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
        ) : null}

        <Expand onClick={() => onOpen("arc")} />
      </div>
    </section>
  );
}