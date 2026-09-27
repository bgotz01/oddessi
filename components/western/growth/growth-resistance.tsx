//components/growth-resistance.tsx

"use client";

import type { Trajectory } from "@/lib/growth";
import { Band, Panel, Placement, Row, SectionHead } from "@/components/western/growth/growth-field";
import { resistanceAnchors } from "@/components/western/growth/growth-readings";
import { T, type ChapterKey } from "@/components/western/growth/growth-ui";

/**
 * 03 · Resistance — what pulls you back.
 *
 * The page reads Arc · Conversion · Resistance · Resources, and resistance and
 * resources are the two halves of the same question. They were briefly one
 * two-column component and the columns could not balance: this section always
 * has behaviours, a response and a set of placements, while Resources is
 * guaranteed only two entries, so the right column ran out halfway down the
 * left one on every chart. Two sections at the full measure, in sequence,
 * sharing a grammar rather than a grid.
 *
 * ─── What this section is NOT any more ──────────────────────────────────────
 *
 * It carried a four-stage loop figure — uncertainty, familiar competence,
 * temporary relief, stalled growth — and two paragraphs above it. Every word
 * of the loop was true of every chart in the world, which is exactly why it
 * had to go: a reader looking at their own trajectory was spending the top
 * third of the section on a diagram of how retreat works in general. The
 * mechanism is not a finding. Where it stands in THIS chart is.
 *
 * The bands were also named like chapters of an essay — "The tells", "The
 * interrupt", "What holds it". A band heading is scanned, not read: the reader
 * is looking for a KIND of fact, and a heading that has to be interpreted
 * before it can be used is doing the opposite of its job. They are category
 * names now, and whatever a fact MEANS moved to the row's right-hand column
 * where it belongs.
 *
 * There is no prose left at all. `pullback` and `resistanceTurn` — the two
 * composed paragraphs this section used to open on — are in the drawer's
 * Resistance tab, which is now their only home. That is the right place for
 * them: they argue the mechanism, and a section a reader is scanning should
 * hand them the findings and let them ask for the argument.
 */
export default function GrowthResistance({
  t,
  onOpen,
}: {
  t: Trajectory;
  onOpen: (chapter: ChapterKey) => void;
}) {
  const open = () => onOpen("resistance");
  const anchors = resistanceAnchors(t);

  return (
    <section className="@container">
      <SectionHead
        index="03"
        name="Resistance"
        title="The pull back"
        onOpen={open}
      />

      {/* ── Behaviours ───────────────────────────────────────────────────────
          Things you can catch yourself doing, four or five words each, set at
          value size because each one IS the finding. Cards with an ember edge:
          this is the one band on the page describing a loop to interrupt. */}
      <Band label="How it shows up" aside={`${t.from.sign} — going back`} accent="ember">
        <ul className="mt-6 grid gap-4 @3xl:grid-cols-3">
          {t.resistance.tells.map((tell) => (
            <li
              key={tell}
              className={`rounded-sm border border-rule border-l-2 border-l-ember bg-surface px-6 py-5 ${T.phrase}`}
            >
              {tell}
            </li>
          ))}
        </ul>
      </Band>

      {/* ── Response ─────────────────────────────────────────────────────────
          The road's own grammar at sentence scale: two poles and an arrow, in
          the model's naming (oldPole / developedPole). */}
      <Band label="What to say instead">
        <Panel className="mt-6 grid @2xl:grid-cols-[1fr_auto_1fr] @2xl:items-stretch">
          <div className="p-6 @2xl:p-8">
            <p className={`${T.micro} text-bone-soft`}>Old reflex</p>
            <p className={`mt-3 ${T.phrase} text-bone-soft`}>
              {t.movement.expression.oldPole}
            </p>
          </div>

          <span
            aria-hidden
            className="glyph hidden items-center border-x border-rule px-5 text-[1.125rem] text-patina @2xl:flex"
          >
            →
          </span>

          <div className="border-t border-rule p-6 @2xl:border-t-0 @2xl:p-8">
            <p className={`${T.micro} text-patina`}>New move</p>
            <p className={`mt-3 ${T.phrase}`}>
              {t.movement.expression.developedPole}
            </p>
          </div>
        </Panel>
      </Band>

      {/* ── Placements ───────────────────────────────────────────────────────
          Why the pull is this reader's rather than everyone's. Rendered only
          where the chart supplies them: an empty heading here would advertise
          exactly the absence that makes the pull weak. */}
      {anchors.length ? (
        <Band label="Where it lives in the chart">
          <ul>
            {anchors.map((anchor) => (
              <Row
                key={`${anchor.label}-${anchor.body}`}
                label={anchor.label}
                reading={anchor.reading}
              >
                <Placement
                  body={anchor.body}
                  sign={anchor.sign}
                  degree={anchor.degree}
                  house={anchor.house}
                />
              </Row>
            ))}
          </ul>
        </Band>
      ) : null}
    </section>
  );
}
