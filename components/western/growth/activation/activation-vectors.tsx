//components/activation-vectors.tsx

"use client";

import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import type { VectorReading } from "@/lib/growth";
import { T } from "@/components/western/growth/growth-ui";

/**
 * What the chart is asking you to develop — the drawer's centrepiece.
 *
 * The panel used to open on a paragraph. "The familiar path and the emerging
 * one pull against each other, and neither settles it alone" is a true and
 * carefully written sentence, and it leaves a reader knowing the shape of their
 * situation and nothing about what to do on Tuesday. Two columns of nouns
 * answer the question people actually arrive with: what am I supposed to
 * develop, and what am I supposed to lean on less.
 *
 * ONE LAYOUT, ALWAYS. This file used to build a different table per emphasis —
 * a two-column vector with an arrow for a crossroads, a single leading column
 * with the other end demoted to a "from …" gloss for a forward period, the
 * mirror of that for a return. Each was defensible in isolation and together
 * they made the panel jump: clicking from one season to the next moved the
 * columns, changed how many sentences a row carried, and relabelled the
 * headings, so a reader comparing two periods had to re-learn the furniture
 * before they could compare anything. The vectors are natal and identical
 * across every period — the layout that shows them has no business changing
 * either.
 *
 * So the frame is fixed: heading, two labelled columns, an arrow between them,
 * one row per vector with its own gloss under each noun, a closing note. The
 * period is expressed inside that frame rather than by rearranging it — it
 * decides the wording of the heading and the column labels, and it decides
 * which side is lit. A forward period lights the arriving column; a return
 * lights the departing one, because that is the material arriving back in
 * quantity; a crossroads lights both, which is the only rendering that says
 * what a square actually says.
 *
 * Nothing here chooses a word. The nouns, the sentences, the ordering and the
 * emphasis all arrive composed from `activation-vectors.ts`; this file decides
 * where they sit. If a vector reads wrong it is wrong in the model, which is
 * the only place it can be argued with.
 */
export default function ActivationVectors({
  v,
  terse = false,
  heading = true,
}: {
  v: VectorReading;
  /**
   * Whether to print `v.heading` above the table.
   *
   * Off in the panel, which already carries it in its own kicker. Three
   * stacked micro-labels — "DEVELOPMENT · AGE 40–42", then "DEVELOP", then
   * "RELY LESS / DEVELOP MORE" — is two rows of furniture before the first
   * word a reader came for, and the middle one is the outer one again. The
   * drawer has no kicker of its own and keeps it.
   *
   * A surface-level switch, not a period-level one: it is the same for every
   * season on a given surface, which is what separates it from the emphasis
   * branching this file used to do.
   */
  heading?: boolean;
  /**
   * Nouns only — no gloss under a noun, no note under the table.
   *
   * For the drawer, which is now read rather than parsed. The authored
   * imperative ("Turn what you have learned into a thesis of your own") is a
   * good sentence and it is the third sentence in a column of three, at which
   * point the pairs above stop being scannable and the panel is prose again
   * with extra steps. Terseness takes text out of the cells; it never takes a
   * cell out of the table, so the drawer and the panel stay the same shape.
   */
  terse?: boolean;
}) {
  // The one thing the period changes about the table. Both sides lit is not a
  // midpoint between the other two — it is a crossroads sitting on both ends
  // at once, which is the reading a see-saw could never draw.
  const fromLit = v.emphasis !== "develop";
  const intoLit = v.emphasis !== "revisit";

  // Every cell is centred on its own column, and the columns are centred on the
  // panel. Left-aligned, the pair put a hundred-odd pixels of nothing between
  // "Sensitivity" and the arrow that is supposed to be joining it to
  // something, and the two nouns stopped reading as one vector; flushed to the
  // spine instead, the table gained a middle but the glosses ended up ragged
  // against the edge they were pushed to. Centring each column settles both —
  // the noun sits over its own gloss, the two blocks balance around the arrow,
  // and nothing is pinned to an edge that means nothing.
  //
  // The spine needs room for two nouns and a gloss under each, and it gives up
  // below roughly 30rem — so under that the same three cells stack instead.
  // Container queries rather than viewport ones because the drawer is 576px of
  // panel inside a window of any width, and a `sm:` rule there would answer a
  // question nobody asked. Same markup either way; only the display changes.
  const cols =
    "grid gap-y-1 text-center @sm:grid-cols-[1fr_auto_1fr] @sm:items-baseline @sm:gap-x-8 @sm:gap-y-0";

  return (
    <section className={`@container ${heading ? "mt-8" : "mt-6"}`}>
      {heading ? (
        <p className={`${T.tiny} text-center text-bone-faint`}>{v.heading}</p>
      ) : null}

      {/* Stacked, two column heads would label nothing, so at narrow widths
          the row collapses to a single legend — "RELY LESS → DEVELOP MORE" —
          and the pairs below inherit it. */}
      <div
        className={`${cols} ${heading ? "mt-5" : ""} border-b border-rule pb-2 @max-sm:flex @max-sm:flex-wrap @max-sm:items-baseline @max-sm:justify-center @max-sm:gap-x-2`}
      >
        <p
          className={`${T.tiny} ${fromLit ? "text-patina" : "text-bone-faint"}`}
        >
          {v.fromLabel}
        </p>
        {/* Held rather than removed. The head row and each vector row are
            separate grids, so the middle `auto` column is only the same width
            in both if both put something the same width in it — drop it here
            and the two labels close up by the width of an arrow and stop
            sitting over their columns. Invisible when the table is a table,
            and the legend's joiner when it is stacked. */}
        <span
          aria-hidden
          className="glyph text-[0.875rem] text-patina @sm:invisible"
        >
          →
        </span>
        <p
          className={`${T.tiny} ${intoLit ? "text-patina" : "text-bone-faint"}`}
        >
          {v.intoLabel}
        </p>
      </div>

      <ul>
        {v.vectors.map((x) => (
          <li
            key={`${x.from}-${x.into}`}
            className={`${cols} border-b border-rule-faint ${terse ? "py-3" : "py-3.5"}`}
          >
            <div>
              <p
                className={`text-[1.0625rem] leading-snug ${fromLit ? "text-bone" : "text-bone-faint"}`}
              >
                {x.from}
              </p>
              {/* The departing side is never a fault — it is competence being
                  converted — so its gloss says what the reader already does
                  rather than what they are doing wrong. */}
              {terse ? null : (
                <p className={`${T.note} mt-1 text-balance`}>{x.fromDetail}</p>
              )}
            </div>

            <span aria-hidden className="glyph text-[0.875rem] text-patina">
              →
            </span>

            <div>
              <p
                className={`text-[1.0625rem] leading-snug ${intoLit ? "text-bone" : "text-bone-faint"}`}
              >
                {x.into}
                <Mark body={x.body} />
              </p>
              {terse ? null : (
                <p className={`${T.note} mt-1 text-balance`}>{x.intoDetail}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {terse ? null : (
        <p
          className={`${T.note} mx-auto mt-5 max-w-xl text-center text-balance`}
        >
          {v.note}
        </p>
      )}

      {/* Kept even when it is empty. A quiet stretch has no pressures and that
          is a finding about the period, not an absence of one — dropping the
          field made the panel shorter on exactly the seasons where a reader
          most needs to be told that nothing is converging on them, and left
          them to infer it from a missing heading. */}
      <div className="mt-7">
        <p className={`${T.tiny} text-center text-bone-faint`}>Pressures</p>
        {v.pressures.length > 0 ? (
          // The planet changes the QUALITY of the push, and a noun carries
          // that as well as a sentence does. "Pluto is creating a
          // transformative period in which…" says no more and costs a
          // paragraph.
          <ul className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {v.pressures.map((p) => (
              <li
                key={`${p.planet}-${p.process}`}
                className="flex items-baseline gap-2"
              >
                <span
                  className="glyph text-[1rem]"
                  style={{ color: p.planet ? bodyColor(p.planet) : undefined }}
                >
                  {p.planet ? bodyGlyph(p.planet) : "☊"}
                </span>
                <span className="text-[0.9375rem] text-bone">{p.process}</span>
                {!p.direct ? (
                  <span className={`${T.tiny} text-bone-faint`}>indirect</span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-center text-[0.9375rem] text-bone-faint">
            None — nothing is converging on the axis in this stretch.
          </p>
        )}
      </div>
    </section>
  );
}

/** The glyph that says a vector came from this chart rather than this axis. */
function Mark({ body }: { body?: string }) {
  if (!body) return null;
  return (
    <span
      className="glyph ml-2 text-[0.8125rem]"
      style={{ color: bodyColor(body) }}
      title={`${body} put this vector here`}
    >
      {bodyGlyph(body)}
    </span>
  );
}
