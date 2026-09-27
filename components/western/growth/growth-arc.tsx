"use client";

import { bodyColor } from "@/lib/bodies";
import { bodyGlyph, signGlyph } from "@/lib/symbols";
import {
  getHouseTitle,
  type House,
} from "@/lib/astrology/house-categories";
import type { Pole, Trajectory } from "@/lib/growth";

import GrowthRoad from "@/components/western/growth/growth-road";
import GrowthCrossing from "@/components/western/growth/growth-crossing";
import { Panel, SectionHead } from "@/components/western/growth/growth-field";

import {
  SHOWN,
  T,
  prime,
  type ChapterKey,
} from "@/components/western/growth/growth-ui";

/**
 * 01 · Arc — where you are going.
 *
 * The page's hero and the one thing a reader should still have a week later:
 *
 *     Listener / Interpreter  ─────▸─────  Explorer / Author
 *
 * Every other view of the nodes lists them, and a list has no direction in it —
 * which is the one thing about the nodes that is not true of an ordinary
 * placement. So the axis is drawn as a road and read left to right, inside one
 * panel with everything that belongs to it: the placement under each archetype,
 * the four moves along the bottom, and the crossing flag when there is one.
 *
 * The placements used to sit in a row of their own above the road at 10px,
 * which put the provenance first and made it unreadable. Each pole is now one
 * container — archetype, then placement, house arena and ruler — with the node
 * label above it, and the road runs between the two containers. The ruler is
 * where each pole's mechanism lives and the page never said so.
 *
 * A square to the axis is different from ordinary resistance:
 *
 *     RESISTANCE  pulls backward toward the developed strategy.
 *     CROSSING    cuts sideways across both ends of the axis.
 *
 * The road draws a ✕ only when a genuine square exists, and GrowthCrossing
 * names the bodies behind it. The reading itself is a drawer tab.
 *
 * Beneath the panel the axis turns into something recognisable in ordinary
 * life: the old move with questions that catch it, the new move with questions
 * that open it. This was a collapsed "Questions" disclosure, which hid the most
 * usable text on the page behind a 10px label. Both moves are written for the
 * sign IN THAT HOUSE, from the 144-entry table; the old side's questions stay
 * sign-level on purpose, because `reflexQuestions` is the only table that
 * catches a move in the act — the combo table asks every role to grow, and
 * pointed at the departing pole it would urge the reader to develop the
 * competence the page says they are converting.
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
      <SectionHead
        index="01"
        name="Arc"
        title="Where you are going"
        onOpen={() => onOpen("arc")}
      />

      <Panel className="mt-8">
        <div className="p-6 @2xl:p-9">
          <GrowthRoad
            fromLabel="South Node · The competence"
            toLabel="North Node · The direction"
            from={t.arc.from}
            to={t.arc.into}
            fromDetail={<PoleDetail pole={t.from} />}
            toDetail={<PoleDetail pole={t.to} />}
            boxed
            toColor={toColor}
            onFrom={() => onOpen("arc")}
            onTo={() => onOpen("arc")}
            mark={
              t.crossing ? (
                <span
                  aria-hidden
                  title="A part of the chart cuts across both ends of the nodal axis"
                  className="relative z-10 flex items-center bg-surface px-3.5"
                >
                  <span className="glyph text-[1.125rem] leading-none text-ember">
                    ✕
                  </span>
                </span>
              ) : undefined
            }
          />

          {t.crossing ? (
            <div className="mt-8">
              <GrowthCrossing t={t} onOpen={onOpen} />
            </div>
          ) : null}
        </div>

        {/* ── The arc in four moves ──────────────────────────────────────────
            Numbered steps across the foot of the panel. They were four pill
            buttons centred under a 10px caption, which read as tags — filters
            to click — rather than as a sequence. */}
        <div className="border-t border-rule">
          <p className={`${T.micro} px-6 pt-6 text-patina @2xl:px-9`}>
            The arc in four moves
          </p>
          <ol className="grid @2xl:grid-cols-4">
            {t.strapline.map((beat, index) => (
              <li
                key={beat}
                className="flex items-baseline gap-3 border-rule px-6 py-5 @2xl:flex-col @2xl:gap-2 @2xl:border-l @2xl:px-9 @2xl:py-6 @2xl:first:border-l-0"
              >
                <span className={`${T.micro} text-patina-dim`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={T.read}>{beat}</span>
              </li>
            ))}
          </ol>
        </div>
      </Panel>

      {/* ── The two moves ──────────────────────────────────────────────────
          Two cards, old against new, with the questions that test each one. */}
      <div className="mt-6 grid gap-6 @3xl:grid-cols-2">
        <Move
          label="The old move · catch it"
          move={t.practice.departing?.move ?? null}
          questions={t.reflexQuestions.slice(0, SHOWN)}
        />
        <Move
          label="The new move · open it"
          move={t.practice.arriving?.move ?? null}
          questions={opening.slice(0, SHOWN)}
          arriving
        />
      </div>
    </section>
  );
}

/**
 * Where one end of the axis stands: sign, degree and house on the first line,
 * the house's arena under it, and the pole's ruler — which is where that end's
 * mechanism actually lives in the chart.
 *
 * Set a size up from the rest of the page's rows. It shares a container with
 * the archetype now, and at row size it read as a caption under the title
 * rather than as the placement the title was derived from.
 */
function PoleDetail({ pole }: { pole: Pole }) {
  const ruler = pole.rulerPlacement;

  return (
    <div className="space-y-2.5">
      <p className={`flex flex-wrap items-baseline gap-x-2.5 ${T.phrase}`}>
        <span className="glyph text-bone-soft">{signGlyph(pole.sign)}</span>
        <span>{pole.sign}</span>
        <span className={`${T.micro} text-bone-faint`}>{prime(pole.degree)}</span>
        {pole.house ? (
          <span className={`${T.micro} text-bone-soft`}>house {pole.house}</span>
        ) : null}
      </p>

      {pole.house ? (
        <p className={`${T.read} text-bone-soft`}>
          {getHouseTitle(pole.house as House)}
        </p>
      ) : null}

      <p className={`flex flex-wrap items-baseline gap-x-2.5 ${T.read}`}>
        <span className={`${T.micro} text-bone-faint`}>Ruler</span>
        <span className="glyph" style={{ color: bodyColor(pole.ruler) }}>
          {bodyGlyph(pole.ruler)}
        </span>
        <span className="text-bone-soft">
          {pole.ruler}
          {ruler
            ? ` in ${ruler.sign}${ruler.houseNumber ? `, house ${ruler.houseNumber}` : ""}`
            : ""}
        </span>
      </p>
    </div>
  );
}

function Move({
  label,
  move,
  questions,
  arriving = false,
}: {
  label: string;
  move: string | null;
  questions: string[];
  arriving?: boolean;
}) {
  return (
    <div
      className={`rounded-sm border p-6 @2xl:p-8 ${arriving ? "border-patina-dim bg-patina-deep/25" : "border-rule"}`}
    >
      <p className={`${T.micro} ${arriving ? "text-patina" : "text-bone-soft"}`}>
        {label}
      </p>

      {move ? (
        <p className={`mt-3 ${T.phrase} ${arriving ? "" : "text-bone-soft"}`}>
          {move}
        </p>
      ) : null}

      <ul
        className={`mt-5 space-y-3 border-l pl-5 ${arriving ? "border-patina-dim" : "border-rule"}`}
      >
        {questions.map((question) => (
          <li key={question} className={T.body}>
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
}
