//components/growth-conversion.tsx

"use client";

import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import type { Conversion, Trajectory } from "@/lib/growth";
import GrowthRoad from "@/components/growth-road";
import { Expand } from "@/components/growth-field";
import { T, shownConversions, type ChapterKey } from "@/components/growth-ui";

/**
 * 02 · Conversion — how existing competence becomes new capacity.
 *
 * The same claim as the Arc, one scale down and in terms of what the person
 * actually does: INTERPRETER → AUTHOR is who, INVESTIGATION → THESIS is what.
 * It is drawn on the same road for exactly that reason — two figures would have
 * made one idea look like two.
 *
 * Beneath it the rows run in two columns aligned with the two terminals, so an
 * existing ability sits under what it is being converted from and its new use
 * under what it becomes.
 *
 * Every row carries the same grammar as the road above it — two nouns and an
 * arrow, with the sentences underneath as the explanation:
 *
 *     INVESTIGATION → THESIS          the macro conversion, on the road
 *     COMPARISON → CONVICTION         the capability, per row
 *     Gathering perspectives → Form a position you can stand behind
 *
 * Before the modes existed a row read "Comparing perspectives → use it to reach
 * an independent conclusion", which is advice: true, forgettable, and the same
 * shape as any other line of advice on the page. The pair is what makes it a
 * conversion, and what lets a reader carry three of them out of the room.
 *
 * A caption sat over the rows reading "What you already know becomes the
 * material for what comes next", which is the section's title said a second
 * time in more words — the road above it already draws that claim and the
 * ground reading already argues it. Deleted; the group heading carries the
 * break it was occupying.
 *
 * The two groups are the section's other claim. CORE comes from the nodal axis
 * and is true of anyone on it; CHART-SPECIFIC exists only because a body stands
 * in the ground being left. Marking that with a glyph alone left the two kinds
 * looking like one list of five, when the difference — this is your axis, this
 * is your chart — is most of what the section knows.
 */
export default function GrowthConversion({
  t,
  onOpen,
}: {
  t: Trajectory;
  onOpen: (chapter: ChapterKey) => void;
}) {
  const { core, specific } = shownConversions(t.conversions);
  const lead = t.deep.find((d) => d.side === "departing") ?? null;

  return (
    <section className="@container">
      <button
        type="button"
        onClick={() => onOpen("conversion")}
        className={`${T.tiny} mb-9 block text-patina-dim`}
      >
        02 · Conversion
      </button>

      <GrowthRoad
        size="medium"
        fromLabel="What you already do"
        toLabel="What it becomes"
        from={
          <span className="flex flex-wrap items-baseline gap-x-3">
            {t.conversionArc.from.toUpperCase()}
            {/* The body that made this specific, marked on the thing it
                changed. Without it the left side would read “comparison”. */}
            {lead ? (
              <span
                className="glyph text-[1rem]"
                style={{ color: bodyColor(lead.body) }}
                title={`${lead.body} deepens the departing ground — why this reads ${t.conversionArc.from}, not ${t.conversionArc.genericFrom}`}
              >
                {bodyGlyph(lead.body)}
              </span>
            ) : null}
          </span>
        }
        to={t.conversionArc.into.toUpperCase()}
        toColor="var(--color-patina)"
        onFrom={() => onOpen("conversion")}
        onTo={() => onOpen("conversion")}
      />

      {/* Centered and given room rather than left-flush at half the section's
          width: at the container's full measure a max-w-2xl paragraph stopped
          well short of the road above it, which reads as an accident rather
          than a stopping point. The extra width and the indent make it read
          as a considered pull-quote instead. */}
      <p className="mx-auto mt-10 max-w-3xl text-[1.0625rem] leading-relaxed text-bone-soft @2xl:pl-10">
        {t.groundReading}
      </p>

      <Rows
        label="Core conversions"
        // Which axis, precisely. A chart whose house pair has a written reading
        // is being told something stronger than one falling back to the sign.
        aside={
          t.conversionsAreAxisSpecific
            ? `${t.from.sign} H${t.from.house} → ${t.to.sign} H${t.to.house}`
            : `${t.from.sign} → ${t.to.sign}`
        }
        rows={core}
        // Rows are capped at three between the two groups, so a chart with
        // more has some it is not showing. That used to be said by the exit
        // button — "+ 1 more conversion" — and when the button went plain the
        // fact had nowhere to live. It belongs on the group anyway: the
        // heading is where this section states what a group IS, and "showing 2
        // of 3" is exactly that.
        showing={`${core.length} of ${t.conversions.filter((c) => !c.from_body).length}`}
      />

      {/* Only when the chart has one. A "chart-specific" heading over an empty
          list would advertise the absence of the most interesting rows. */}
      {specific.length ? (
        <Rows
          label="Chart-specific"
          aside={`${specific.map((c) => c.from_body).join(" · ")} in the departing ground`}
          rows={specific}
        />
      ) : null}

      <Expand onClick={() => onOpen("conversion")} />
    </section>
  );
}

/**
 * One group of conversion rows.
 *
 * The mode pair is the row; the sentences are the gloss, which is why they sit
 * a step down in size and weight. The arrow is its own grid column rather than
 * a prefix on the right-hand text, so it lands on the same axis in every row
 * and the section reads as a column of transformations rather than as prose
 * with arrows in it.
 */
function Rows({
  label,
  aside,
  showing,
  rows,
}: {
  label: string;
  aside: string;
  /** "2 of 3", when the group is showing fewer rows than it has. */
  showing?: string;
  rows: Conversion[];
}) {
  return (
    <>
      <div className="mt-14 flex items-baseline justify-between gap-4 border-b border-rule pb-2">
        <p className={`${T.tiny} text-patina-dim`}>
          {label}
          {showing ? (
            <span className="ml-3 text-bone-faint">{showing}</span>
          ) : null}
        </p>
        <p className={`${T.tiny} text-bone-faint`}>{aside}</p>
      </div>

      <ul>
        {rows.map((c) => (
          <li
            key={c.from}
            className="grid items-baseline gap-x-6 gap-y-1 border-b border-rule-faint py-5 @2xl:grid-cols-[1fr_auto_1fr]"
          >
            <div>
              <p className={`${T.tiny} text-bone-faint`}>
                {c.fromMode}
                {c.from_body ? (
                  <span
                    className="glyph ml-2 text-[0.8125rem]"
                    style={{ color: bodyColor(c.from_body) }}
                    title={`${c.from_body} put this row here`}
                  >
                    {bodyGlyph(c.from_body)}
                  </span>
                ) : null}
              </p>
              <p className="mt-1.5 text-[0.9375rem] leading-snug text-bone-faint">
                {c.from}
              </p>
            </div>

            <span
              aria-hidden
              className="glyph hidden text-[0.875rem] text-patina @2xl:block"
            >
              →
            </span>

            <div>
              <p className={`${T.tiny} text-patina`}>{c.intoMode}</p>
              <p className="mt-1.5 text-[1.0625rem] leading-snug text-bone">
                {c.into}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
