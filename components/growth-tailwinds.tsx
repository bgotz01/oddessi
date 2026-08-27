//components/growth-tailwinds.tsx

"use client";

import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import type { Trajectory } from "@/lib/growth";
import { Band, Expand, Placement, Row, SectionHead } from "@/components/growth-field";
import {
  resourceReadings,
  type ResourceReading,
} from "@/components/growth-readings";
import { T, type ChapterKey } from "@/components/growth-ui";

/**
 * 04 · Resources — what the chart can recruit.
 *
 * Every early version of this page covered what the chart is leaving, what it
 * is reaching for and what resists, and nothing at all about what helps. That
 * left the reading lopsided in a way no chart deserves.
 *
 * ─── Why there are no sentences in it ───────────────────────────────────────
 *
 * The model composes a `detail` line per entry and this section used to print
 * all of them: five placements, each with a two-clause sentence underneath.
 * The sentences are written per KIND, not per body, so two bodies holding a
 * soft contact got the same words twice and the reader had to compare
 * paragraphs to find that out. And a sentence is the wrong shape for the
 * claim: the label already says what the relation is, the placement already
 * says where it stands, and the rest was the model explaining its own
 * vocabulary. Three words carry it, and the long form is one click away.
 *
 * ─── Why it is built like Resistance ────────────────────────────────────────
 *
 * The two are halves of one question, and for a while they only looked alike:
 * the same header, the same band grammar, the same four type roles. The rows
 * were still arranged the other way round — the placement at value size with a
 * three-word gloss beside it, keyed by kind and identical on every chart that
 * had that kind. That is the exact arrangement Resistance was pulled up for:
 * "Mars in Capricorn, house 5" is not an answer to what you can recruit, it is
 * the citation for one.
 *
 * So the reading takes the value slot here too, the placement takes the
 * citation column, and the readings themselves are derived from the same two
 * sources the resistance anchors use. See `resourceReadings` for which source
 * applies to which kind and why.
 *
 * ─── The split ──────────────────────────────────────────────────────────────
 *
 * Only a soft aspect to the axis is evidence the move is EASIER. Being the
 * node's ruler is a route, being conjunct the node is alignment, sharing the
 * node's house is proximity, and Jupiter existing is barely a relation at all.
 * That caution used to be a paragraph above one undifferentiated list — the
 * weakest possible place for it, since the reader had to hold it in mind
 * across five entries that all looked identical. It is the structure now: two
 * bands, and a header that counts them honestly.
 *
 * The length of the list still measures nothing. The node's ruler and Jupiter
 * are in every chart, so this section is never empty and never has to
 * apologise for itself.
 *
 * Built from the same four roles and the same row as Resistance — a label, a
 * placement, and what it amounts to — because the two sections are halves of
 * one question and should not look like two different products.
 */
export default function GrowthTailwinds({
  t,
  onOpen,
}: {
  t: Trajectory;
  onOpen: (chapter: ChapterKey) => void;
}) {
  const open = () => onOpen("tailwinds");

  const readings = resourceReadings(t);
  const helps = readings.filter((w) => w.assists);
  const relations = readings.filter((w) => !w.assists);

  return (
    <section className="@container">
      {/* The arriving pole, where Resistance names the departing one. These
          are relations to the NORTH node, and a header that said "2 with a
          stake in it" was counting the section instead of placing it — and
          counting is the one thing this layer has always said not to do. The
          honest half of that count, how many are evidence of ease, is what the
          Support band is for. */}
      <SectionHead
        index="04"
        name="Resources"
        title="What you can recruit"
        onOpen={open}
        aside={`${t.to.sign}${t.to.house ? ` · house ${t.to.house}` : ""}`}
        detail={
          t.to.house ? (
            <span className="text-bone-faint/70">
              {getHouseTitle(t.to.house as House)}
            </span>
          ) : null
        }
      />

      <Band label="Support">
        {helps.length ? (
          <Rows rows={helps} />
        ) : (
          // The one sentence this section gets, and only on the charts that
          // need it. "Nothing holds a soft contact" is a real finding, and far
          // better than folding those charts into a single list that implies
          // five helpers.
          <p className={`mt-6 max-w-xl ${T.lead}`}>
            Nothing holds a trine or a sextile to the axis. What follows is
            relevance, not ease.
          </p>
        )}
      </Band>

      {relations.length ? (
        <Band label="Relations">
          <Rows rows={relations} />
        </Band>
      ) : null}

      <Expand onClick={open} />
    </section>
  );
}

/**
 * The same row as the Resistance placements, and for the same reason.
 *
 * This section asks what the chart can recruit, and the answer is not "Mars" —
 * it is what having Mars where it stands does for the move. So the reading
 * takes the value slot and the placement shrinks to the citation column, which
 * is where evidence belongs.
 */
function Rows({ rows }: { rows: ResourceReading[] }) {
  return (
    <ul>
      {rows.map((w) => (
        <Row
          key={w.body}
          label={w.label}
          accent={w.assists ? "patina" : "quiet"}
          reading={w.reading}
        >
          <Placement
            body={w.body}
            sign={w.sign}
            degree={w.degree}
            house={w.house}
          />
        </Row>
      ))}
    </ul>
  );
}
