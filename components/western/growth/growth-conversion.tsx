//components/growth-conversion.tsx

"use client";

import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import type { Conversion, Trajectory } from "@/lib/growth";
import GrowthRoad from "@/components/western/growth/growth-road";
import { Band, Panel, SectionHead } from "@/components/western/growth/growth-field";
import { T, groundNote, shownConversions, type ChapterKey } from "@/components/western/growth/growth-ui";

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
 * Road and ground reading share one panel: the paragraph is the argument for
 * why the left end of the road reads the way it does, and printed forty pixels
 * below it, centred, at the width of a pull-quote, it read as an aside. The
 * rows run full width, a hairline between each, with the modes as labels at a
 * size that can be read rather than deciphered.
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
  const ground = groundNote(t);

  return (
    <section className="@container">
      <SectionHead
        index="02"
        name="Conversion"
        title="How competence converts"
        onOpen={() => onOpen("conversion")}
      />

      <Panel className="mt-8">
        <div className="p-6 @2xl:p-9">
          <GrowthRoad
            size="medium"
            fromLabel="What you already do"
            toLabel="What it becomes"
            from={
              <span className="inline-flex flex-wrap items-baseline gap-x-3">
                {word(t.conversionArc.from)}
                {/* The body that made this specific, marked on the thing it
                    changed. Without it the left side would read “comparison”. */}
                {lead ? (
                  <span
                    className="glyph text-[1.25rem]"
                    style={{ color: bodyColor(lead.body) }}
                    title={`${lead.body} deepens the departing ground — why this reads ${t.conversionArc.from}, not ${t.conversionArc.genericFrom}`}
                  >
                    {bodyGlyph(lead.body)}
                  </span>
                ) : null}
              </span>
            }
            to={word(t.conversionArc.into)}
            toColor="var(--color-patina)"
            onFrom={() => onOpen("conversion")}
            onTo={() => onOpen("conversion")}
          />
        </div>

        {/* Two sentences where `groundReading` has three. The one that went is
            the road drawn above it and every row beneath it; what is left is
            the pair the road cannot draw — why this ground is not the textbook
            version of its house, and what the body standing in it does there.
            The full paragraph still goes to the chat. */}
        <p className={`border-t border-rule px-6 py-6 @2xl:px-9 ${T.lead}`}>
          {ground.correction}
          {ground.charge ? ` ${ground.charge}` : ""}
        </p>
      </Panel>

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
        // Rows are capped between the two groups, so a chart may have some it
        // is not showing; the heading is where the section says what a group
        // is, and "showing 2 of 3" is exactly that.
        showing={`${core.length} of ${t.conversions.filter((c) => !c.from_body).length}`}
      />

      {/* Only when the chart has one. A "chart-specific" heading over an empty
          list would advertise the absence of the most interesting rows. */}
      {specific.length ? (
        <Rows
          label="Chart-specific"
          accent="ember"
          aside={`${specific.map((c) => c.from_body).join(" · ")} in the departing ground`}
          rows={specific}
        />
      ) : null}
    </section>
  );
}

/**
 * The arc's two nouns arrive in capitals from the model, which set them for the
 * old `inscription` road. Mixed case in the display face reads as a word
 * rather than as a label.
 */
function word(noun: string): string {
  return noun.charAt(0).toUpperCase() + noun.slice(1).toLowerCase();
}

/**
 * One group of conversion rows.
 *
 * The mode pair names the row; the sentences say what it means, at reading
 * size on both sides. The arrow is its own grid column rather than a prefix on
 * the right-hand text, so it lands on the same axis in every row and the
 * section reads as a column of transformations rather than as prose with
 * arrows in it.
 */
function Rows({
  label,
  aside,
  showing,
  accent = "patina",
  rows,
}: {
  label: string;
  aside: string;
  /** "2 of 3", when the group is showing fewer rows than it has. */
  showing?: string;
  accent?: "patina" | "ember";
  rows: Conversion[];
}) {
  return (
    <Band
      label={showing ? `${label} · ${showing}` : label}
      aside={aside}
      accent={accent}
    >
      <ul>
        {rows.map((c) => (
          <li
            key={c.from}
            className="grid gap-4 border-b border-rule py-6 @2xl:grid-cols-[1fr_auto_1fr] @2xl:items-start @2xl:gap-10"
          >
            <div>
              <p className={`${T.micro} flex items-baseline gap-2 text-bone-soft`}>
                {c.fromMode}
                {c.from_body ? (
                  <span
                    className="glyph text-[0.9375rem] normal-case"
                    style={{ color: bodyColor(c.from_body) }}
                    title={`${c.from_body} put this row here`}
                  >
                    {bodyGlyph(c.from_body)}
                  </span>
                ) : null}
              </p>
              <p className={`mt-2 ${T.read} text-bone-soft`}>{c.from}</p>
            </div>

            <span
              aria-hidden
              className="glyph hidden pt-6 text-[1.125rem] text-patina @2xl:block"
            >
              →
            </span>

            <div>
              <p className={`${T.micro} text-patina`}>{c.intoMode}</p>
              <p className={`mt-2 ${T.read}`}>{c.into}</p>
            </div>
          </li>
        ))}
      </ul>
    </Band>
  );
}
