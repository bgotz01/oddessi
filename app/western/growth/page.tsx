//app/western/growth/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageTitle } from "@/components/primitives";
import GrowthRulership from "@/components/western/growth/growth-rulership";
import GrowthArc from "@/components/western/growth/growth-arc";
import GrowthConversion from "@/components/western/growth/growth-conversion";
import GrowthResistance from "@/components/western/growth/growth-resistance";
import GrowthTailwinds from "@/components/western/growth/growth-tailwinds";
import GrowthDrawer from "@/components/western/growth/growth-drawer";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useScoring } from "@/components/scoring-context";
import type { Chart } from "@/lib/charts";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import { trajectory, type Trajectory } from "@/lib/growth";
import { T, type ChapterKey } from "@/components/western/growth/growth-ui";

/**
 * Growth — the trajectory this chart is on.
 *
 * Three earlier versions of this page failed the same way, and the failures are
 * worth keeping written down because each one looked like progress at the time.
 * The first listed eight indicators; the second listed three; the third put all
 * of it in one bordered frame and called it a figure. Every one was accurate
 * and none was a reading, because a list of placements crosses nothing — you
 * could have got the same facts off the natal wheel.
 *
 * What this page derives instead is a CONVERSION. The South Node is not a fault
 * to be corrected, it is the competence already built, and the claim is that it
 * is the raw material the North Node direction is made out of:
 *
 *     INTERPRETER → AUTHOR
 *     Investigate deeply. Form the principle. Take a position. Put it into the world.
 *
 * Neither line is written down anywhere. The archetypes come from the two nodal
 * houses, the beats from whatever body is embedded in the departing ground plus
 * the arriving sign and house. Change the chart and both change.
 *
 * The page itself owns almost nothing: state, the chat contract, and the two
 * empty states. Each section is its own component, because they are genuinely
 * separate arguments and the file that composes them should read like a table
 * of contents rather than like a UI. Four movements, in the order the reading
 * actually happens — direction, mechanism, friction, support:
 *
 *     01  growth-arc           where you are going
 *     02  growth-conversion    how existing competence becomes new capacity
 *     03  growth-resistance    what pulls you back
 *     04  growth-tailwinds     what the chart can recruit
 *
 * The seven analytical layers the model computes (movement, arena, questions,
 * conversion, deep pattern, resistance, expression) are not deleted by that
 * grouping — they compose these four, and the drawer's tabs carry the same four
 * names in the same order, so a term means one thing whether you are reading
 * the page or the panel.
 *
 * Resistance is a movement here rather than a footnote on the road. It and
 * Resources are the two halves of one question — what works against the
 * conversion and what for it — and having only one of them on the surface made
 * growth look either like a fight or like a gift, depending which half you
 * dropped. They were briefly one two-column component and the columns could
 * not balance: resistance always has tells, an interrupt and a set of anchors,
 * while resources is guaranteed only two entries, so the right column ran out
 * halfway down the left one on every chart. Two sections, full measure, in
 * sequence — sharing a grammar rather than a grid.
 */

/**
 * The two exits at the foot of the page.
 *
 * One is a Link and one is a button that opens the chat, so they are different
 * elements by necessity — which is exactly the situation in which two copies
 * of a class list drift apart. Written once.
 *
 * `inscription` rather than the mono micro label the pair used to carry. At
 * this size a tracked 11px label in a box the width of half the page reads as
 * a caption someone forgot to finish; the carved face is what the app already
 * uses for a destination, in the sidebar and in every section title.
 */
const EXIT =
  "inscription block border border-patina-dim px-8 py-7 text-center " +
  "text-[1rem] leading-none text-patina transition-colors " +
  "hover:border-patina hover:bg-patina-deep";

function Growth({ chart, t }: { chart: Chart; t: Trajectory }) {
  const { config, edited } = useScoring();
  const { setPageContext, send, setOpen } = useChat();
  const pathname = usePathname();
  const [chapter, setChapter] = useState<ChapterKey | null>(null);

  const rulership = config.rulership;

  const ask = (text: string) => {
    setOpen(true);
    send(text, pathname);
  };

  useEffect(() => {
    setPageContext({
      _description:
        "Growth — the trajectory derived from the nodal axis as a conversion",
      _note:
        "This page does NOT list placements and must not be discussed as if it " +
        "did. Its claim is a CONVERSION: the South Node is the competence " +
        "already built, and it is the raw material the North Node direction is " +
        "made out of. Never describe the South Node as a fault, a bad habit or " +
        "a past life to be shed — every layer here depends on it being " +
        "feedstock. The `arc` compresses the whole trajectory into two role " +
        "nouns taken from the two nodal houses; the `strapline` is four " +
        "imperative beats, the first taken from whatever body is embedded in " +
        "the departing house. Neither is written down anywhere — both are " +
        "derived, so explain them from the placements rather than treating them " +
        "as labels. `conversions` are the heart of it: existing abilities " +
        "repurposed, never abandoned. `deep` is the layer that makes a chart " +
        "specific — a third house with Pluto in it is not generic curiosity, it " +
        "is investigation that does not stop, and that changes the whole " +
        "developmental story; when `deep` is empty say so rather than inventing " +
        "a pattern. `resistance` describes the mechanism that returns the " +
        "person to the old strategy under pressure; describe it as a working " +
        "loop, never as a criticism. NOTHING here is scored, ranked or " +
        "measured, and there is no magnitude to invent — a direction has no " +
        "size. Rulership is user-selectable and live in `rulership`; under " +
        "traditional rulership both nodal rulers can change, and with them the " +
        "resistance mechanism. The vocabulary tables are twelve entries per " +
        "sign and per house because the nodes are always opposite — so the " +
        "sign-level text is generic to the axis, and anything genuinely " +
        "specific to THIS chart comes from the house, the tenants and the " +
        "aspects. Lean on those when answering. `moves` and " +
        "`openingQuestions` are the exception and the strongest material here: " +
        "they are keyed by sign AND house together, so they already say what " +
        "this sign does in THIS arena — prefer them over the generic " +
        "`questions` whenever both would do.",
      chart: chart.name,
      rulership: `${rulership}${edited ? " (hand-edited convention)" : ""}`,
      arc: `${t.arc.from} → ${t.arc.into}`,
      strapline: t.strapline,
      axis: {
        from: {
          node: "South Node",
          sign: t.from.sign,
          degree: t.from.degree,
          house: t.from.house,
          houseTitle: t.from.house ? getHouseTitle(t.from.house as House) : null,
          ruler: t.from.ruler,
          rulerIn: t.from.rulerPlacement
            ? `${t.from.rulerPlacement.sign}, house ${t.from.rulerPlacement.houseNumber}`
            : null,
          tenants: t.from.tenants.map((x) => `${x.body} in ${x.sign}`),
        },
        to: {
          node: "North Node",
          sign: t.to.sign,
          degree: t.to.degree,
          house: t.to.house,
          houseTitle: t.to.house ? getHouseTitle(t.to.house as House) : null,
          ruler: t.to.ruler,
          rulerIn: t.to.rulerPlacement
            ? `${t.to.rulerPlacement.sign}, house ${t.to.rulerPlacement.houseNumber}`
            : null,
          tenants: t.to.tenants.map((x) => `${x.body} in ${x.sign}`),
        },
      },
      movement: { headline: t.movement.movement, asks: t.movement.asks },
      arena: t.arena
        ? { directive: t.arena.directive, territory: t.arena.territory, contains: t.arena.contains }
        : null,
      // The two moves the page actually shows, written for the sign IN THAT
      // HOUSE. `questions` below is the sign-level set behind them — wider,
      // true of anyone on this axis, and so the context rather than the claim.
      moves: {
        practised: t.practice.departing?.move ?? null,
        developmental: t.practice.arriving?.move ?? null,
      },
      openingQuestions: t.practice.arriving?.questions ?? t.questions,
      reflexQuestions: t.reflexQuestions,
      questions: t.questions,
      conversionArc: `${t.conversionArc.from} → ${t.conversionArc.into}`,
      conversionArcIsChartSpecific: t.conversionArc.specific,
      // True when the conversions were written for these two houses, not just
      // for the sign pair. When false, do not claim the arena is what makes
      // them specific — it is not in them.
      conversionsAreAxisSpecific: t.conversionsAreAxisSpecific,
      groundReading: t.groundReading,
      conversions: t.conversions.map((c) => ({
        // The pair is the claim; the two sentences explain it. Lead with the
        // pair when writing about a row, the way the page does.
        transformation: `${c.fromMode} → ${c.intoMode}`,
        from: c.from,
        into: c.into,
        // Rows carrying a body are the ones only this chart could produce.
        addedBy: c.from_body ?? null,
      })),
      deepPattern: t.deep.map((d) => ({
        body: d.body,
        side: d.side === "departing" ? "in the ground being left" : "in the ground being entered",
        sign: d.sign,
        degree: d.degree,
        house: d.house,
        does: d.verbs,
        means: d.charge,
      })),
      resistance: {
        pullback: t.resistance.pullback,
        // How the return shows up. From the SOUTH Node sign — these describe
        // going back, not going forward.
        tells: t.resistance.tells,
        theTurn: t.resistanceTurn,
        oldWayAnswersTo: t.resistance.ruler,
        fusedToTheOldWay: t.resistance.anchored,
        squareTheAxis: (t.crossing?.bodies ?? []).map(
          (c) => `${c.body} in ${c.sign} ${c.degree}, house ${c.house}`,
        ),
        deepeningTheOldGround: t.resistance.reinforcing.map((d) => d.body),
      },
      // Named by pole, not by "less"/"more": `oldPole` is the OPPOSITE sign
      // speaking — the competence being moved away from — never this sign's
      // own shadow.
      expression: {
        oldPoleSounds: t.movement.expression.oldPole,
        developedPoleSounds: t.movement.expression.developedPole,
      },
      // What is already pointed the right way. The node's ruler and Jupiter are
      // always here, so the LENGTH of this list is not a measure of anything —
      // read which kinds are present, never how many.
      tailwinds: t.tailwinds.map((w) => ({
        body: w.body,
        kind: w.kind,
        label: w.label,
        sign: w.sign,
        degree: w.degree,
        house: w.house,
        does: w.detail,
      })),
      resistanceSitsMidJourney: Boolean(t.crossing),
      caution: t.irregularAxis
        ? "The nodes are NOT in opposite houses in this chart, which the conversion model assumes. Treat the arena and conversion layers with care."
        : null,
    });
    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart.id, t, rulership]);
  return (
    <div className="@container mx-auto w-full max-w-6xl px-8 pb-32">
      <PageTitle
        eyebrow={chart.name}
        title="Growth"
        lede=""
        aside={<GrowthRulership />}
      />

      {/* The three sections. Spacing lives here rather than inside them, so a
          section can be reordered or reused without carrying a margin that
          only made sense in one arrangement. */}
      <GrowthArc t={t} onOpen={setChapter} />

      <div className="mt-16 border-t border-rule pt-16">
        <GrowthConversion t={t} onOpen={setChapter} />
      </div>

      <div className="mt-16 border-t border-rule pt-16">
        <GrowthResistance t={t} onOpen={setChapter} />
      </div>

      <div className="mt-16 border-t border-rule pt-16">
        <GrowthTailwinds t={t} onOpen={setChapter} />
      </div>

      {t.irregularAxis ? (
        <p className={`mt-20 max-w-2xl border-l-2 border-ember pl-5 ${T.note}`}>
          The nodes are not in opposite houses in this chart. The arena and
          conversion layers assume they are, so read those two with care — the
          rest of the trajectory is unaffected.
        </p>
      ) : null}

      {/* ── Where to go next ─────────────────────────────────────────────────

          Two exits, as two blocks. They were bare inline buttons floating in a
          field of air, then a pair of captioned paragraphs explaining what was
          on the other side of each — which is a lot of apparatus for two
          destinations the reader can already name. The labels are the
          destinations now, at the size a destination deserves at the foot of a
          page this long.

          Timing lives on its own page. It was briefly a fifth section here and
          it made this page incoherent: the four movements above are a reading
          of a static axis with no dates anywhere in them by design, and a
          transit calendar halfway down meant a reader after "who am I
          becoming" got an ephemeris instead. */}
      <div className="mt-16 grid gap-5 border-t border-rule pt-12 @2xl:grid-cols-2">
        <Link href="/western/growth/activation" className={EXIT}>
          Activation Chart
        </Link>

        <button
          type="button"
          onClick={() =>
            ask(
              `Read the whole growth trajectory for ${chart.name}. The nodal axis runs South Node ` +
              `${t.from.sign} house ${t.from.house} → North Node ${t.to.sign} house ${t.to.house}. ` +
              (t.deep.length
                ? `Standing in the nodal territory: ${t.deep.map((d) => `${d.body} in ${d.sign} house ${d.house} (${d.side})`).join("; ")}. `
                : "Nothing stands in either nodal house. ") +
              `Oddessi compresses this to "${t.arc.from} → ${t.arc.into}", and the conversion to ` +
              `"${t.conversionArc.from} → ${t.conversionArc.into}". Write that trajectory out properly, in three ` +
              `movements: where they are going, what they already have that gets them there, and where they get ` +
              `stuck. Treat the South Node as competence and feedstock, never as fault — say what each ability ` +
              `converts INTO. Name the loop that pulls back to the old strategy and the tell that it is running. ` +
              `End with one concrete step for this year. No scores, no generic sign descriptions.`,
            )
          }
          className={EXIT}
        >
          Interface
        </button>
      </div>

      {chapter ? (
        <GrowthDrawer
          chapter={chapter}
          t={t}
          chartName={chart.name}
          onClose={() => setChapter(null)}
          onAsk={(text: string) => {
            setChapter(null);
            ask(text);
          }}
        />
      ) : null}
    </div>
  );
}

export default function GrowthPage() {
  const { chart } = useChart();
  const { config } = useScoring();
  const t = useMemo(
    () => (chart ? trajectory(chart, config.rulership) : null),
    [chart, config.rulership],
  );

  if (!chart) {
    return (
      <div className="mx-auto w-full max-w-4xl px-8">
        <PageTitle
          eyebrow="No chart"
          title="Growth"
          lede="No chart selected. Add birth data to begin the study."
        />
      </div>
    );
  }

  if (!t) {
    return (
      <div className="mx-auto w-full max-w-4xl px-8">
        <PageTitle
          eyebrow={chart.name}
          title="Growth"
          lede="This chart was stored without the lunar nodes. The whole trajectory is
                read from the nodal axis, so there is nothing to derive until they are
                calculated."
        />
      </div>
    );
  }

  return <Growth chart={chart} t={t} />;
}
