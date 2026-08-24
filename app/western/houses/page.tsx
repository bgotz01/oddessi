"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import HousePositions from "@/components/house-positions";
import HouseRow from "@/components/house-row";
import HouseDrawer from "@/components/house-drawer";
import ScoringDetails from "@/components/scoring-details";
import {
  HouseCircuits,
  PlanetaryInfluences,
  ReadingTheGrid,
} from "@/components/house-context";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import type { Chart } from "@/lib/charts";
import { formatBirth, tenantsOf } from "@/lib/charts";
import { dominanceMode, houseCircuits, houseDominance, prominence } from "@/lib/dominance";
import { useScoring } from "@/components/scoring-context";
import ScoringEditor from "@/components/scoring-editor";
import PresetSwitcher from "@/components/preset-switcher";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import { easePoints, houseEase, quadrantOf } from "@/lib/ease";

/**
 * The twelve houses, following arc's order of operations: what bodies do to a
 * house, then all twelve at a glance with their dominance scores, then the
 * rulership circuits, then the type guide, then the long readings.
 *
 * The grid and the readings share one selection. Clicking a box opens that
 * house's reading in the drawer, so the wall of boxes is a way *into* the text
 * rather than a separate widget sitting above it.
 *
 * Every place a weight is shown offers a way into `ScoringDetails`, which is
 * the only page that explains where the number came from. One modal, owned
 * here, opened from the grid, the column header and each reading's weight
 * block — a score with no route to its arithmetic is just an assertion.
 */

function Houses({ chart }: { chart: Chart }) {
  const [open, setOpen] = useState<number | null>(null);
  const [drawerHouse, setDrawerHouse] = useState<number | null>(null);
  const [dominanceOpen, setDominanceOpen] = useState(false);
  const [scoringOpen, setScoringOpen] = useState(false);
  const { config } = useScoring();
  const { setPageContext } = useChat();
  const anchors = useRef(new Map<number, HTMLDivElement | null>());

  const dominance = useMemo(
    () => houseDominance(chart, config),
    [chart, config],
  );
  const byHouse = useMemo(
    () => new Map(dominance.map((d) => [d.house, d])),
    [dominance],
  );

  const toggle = (house: number) => {
    if (open === house) {
      setOpen(null);
      return;
    }
    setOpen(house);
    requestAnimationFrame(() =>
      anchors.current
        .get(house)
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const heaviest = dominance
    .filter((d) => d.rank <= 3)
    .sort((a, b) => a.rank - b.rank);

  const drawerCusp =
    drawerHouse === null
      ? null
      : (chart.houses.find((h) => h.number === drawerHouse) ?? null);

  const stepDrawer = (delta: 1 | -1) => {
    if (drawerHouse === null) return;
    setDrawerHouse(((drawerHouse - 1 + delta + 12) % 12) + 1);
  };

  const tenanted = chart.houses.filter(
    (h) => tenantsOf(chart.placements, h.number).length > 0,
  ).length;

  const explainWeight = () => setDominanceOpen(true);

  const scores = dominance.map((d) => d.score);
  const tones = useMemo(() => houseEase(chart, config), [chart, config]);
  const easeOf = useMemo(
    () => new Map(tones.map((t) => [t.house, t])),
    [tones],
  );

  /**
   * Hand the chat the weights *and* the table that produced them. Without this
   * the page was the only major one not calling setPageContext, so the chat
   * could see neither the scores on screen nor how they were arrived at, and
   * said so when asked. The constants come from lib/dominance rather than being
   * restated here, so the two cannot drift apart.
   */
  useEffect(() => {
    setPageContext({
      _description: "Houses — the twelve cusps, their tenants and their dominance weights",
      _note:
        "Dominance is this app's own measure, not a standard astrological one, so " +
        "answer from the numbers below rather than from general astrological " +
        "reasoning about which houses matter. score = occupancy + rulerStrength + " +
        "rulerActivity, using the `scoring` tables here; the arithmetic is fully " +
        "reproducible from them, so recompute rather than guess. Two cautions. " +
        "First, `rank` is an ordinal over a continuous score: charts usually have " +
        "a few clear leaders and then a pack separated by less than a point, so " +
        "quote the score gap before treating a rank difference as meaningful. " +
        "Second, `mode` names which component led, not how prominent the house " +
        "is — a last-placed house can still be led by its ruler's placement. " +
        "Rulerships are modern (Pisces→Neptune, Scorpio→Pluto, Aquarius→Uranus); " +
        "under traditional rulership a house's ruler, and so two thirds of its " +
        "score, would often differ. Say so when it changes the reading. " +
        "`ease` is a SEPARATE axis from weight and the two must never be " +
        "conflated: weight is how much of the chart runs through a house, ease " +
        "is whether what runs there flows or grinds, computed from the aspects " +
        "and sign dignity of the house's tenants and its ruler using the " +
        "`easeScoring` tables. A high weight says nothing about ease and vice " +
        "versa — cross them via `quadrant`. A `easeBand` of \"sparse\" means too " +
        "few contacts to judge, which is NOT the same as balanced. Ease and its " +
        "components are on a −100 … +100 scale, where 100 is entirely one way; " +
        "quote them in those units, as the page does. The three `easeFrom*` " +
        "values are contributions and sum to `ease`; the `*Character` values " +
        "are the same components before their shares apply, so they do not sum " +
        "to anything — never add them. Ease has " +
        "three components: aspects, dignity and tenancy (who physically sits " +
        "in the house, by benefic/malefic nature, with malefics blunted when " +
        "well dignified). The whole convention in `scoring` is user-editable " +
        "and may differ from the app's defaults — read it rather than assuming " +
        "any constant, and name the preset when the reading depends on it.",
      chart: chart.name,
      houses: dominance.map((d) => {
        const cusp = chart.houses.find((h) => h.number === d.house)!;
        return {
          house: d.house,
          title: getHouseTitle(d.house as House),
          cuspSign: cusp.sign,
          cuspDegree: cusp.degree,
          tenants: tenantsOf(chart.placements, d.house).map((t) => ({
            body: t.body,
            sign: t.sign,
            degree: t.degree,
            retrograde: t.retrograde,
            bodyWeight: config.weight.body[t.body] ?? 0,
          })),
          score: d.score,
          rank: d.rank,
          prominence: prominence(d.score),
          mode: dominanceMode(d, config),
          occupancy: d.occupancy,
          rulerStrength: d.rulerStrength,
          rulerActivity: d.rulerActivity,
          ruler: d.ruler,
          rulerIn: d.rulerPlacement
            ? `${d.rulerPlacement.sign}, house ${d.rulerPlacement.houseNumber}`
            : null,
          reasons: d.reasons,
          ease: easePoints(easeOf.get(d.house)?.ease ?? 0),
          easeBand: easeOf.get(d.house)?.band ?? "sparse",
          easeFromAspects: easePoints(easeOf.get(d.house)?.fromAspects ?? 0),
          easeFromDignity: easePoints(easeOf.get(d.house)?.fromDignity ?? 0),
          easeFromTenancy: easePoints(easeOf.get(d.house)?.fromTenancy ?? 0),
          // Unweighted character of each component, before its share applies.
          easeAspectCharacter: easePoints(easeOf.get(d.house)?.characterAspects ?? 0),
          easeDignityCharacter: easePoints(easeOf.get(d.house)?.characterDignity ?? 0),
          easeTenancyCharacter: easePoints(easeOf.get(d.house)?.characterTenancy ?? 0),
          easyContacts: easeOf.get(d.house)?.soft ?? 0,
          hardContacts: easeOf.get(d.house)?.hard ?? 0,
          easeNotes: easeOf.get(d.house)?.notes ?? [],
          easeConfidence: easeOf.get(d.house)?.confidence ?? 0,
          easeReadFrom: easeOf.get(d.house)?.constituents ?? [],
          quadrant: quadrantOf(d.score, easeOf.get(d.house)?.band ?? "sparse"),
        };
      }),
      // Mutual reception loops, shown further down the same page.
      circuits: houseCircuits(chart),
      // The convention in force, verbatim. It is user-editable, so the chat
      // must read the live tables rather than assume the shipped defaults.
      scoring: {
        preset: config.id,
        presetLabel: config.label,
        weight: config.weight,
        ease: config.ease,
      },
    });

    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart.id, dominance, tones, config]);

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow={chart.name}
        title="Houses"
        lede="The twelve territories, cut by the moment and the place of birth.
              Every house has a sign on its cusp whether or not anything is
              standing in it — and a weight, which is how much of this particular
              life the house is actually carrying."
      />

      <section className="mb-16">
        <SectionHeading
          aside={
            heaviest.length
              ? `heaviest: ${heaviest.map((d) => `${d.house}`).join(" · ")}`
              : undefined
          }
        >
          House Positions
        </SectionHeading>
        <div className="mb-6">
          <PresetSwitcher onEdit={() => setScoringOpen(true)} />
        </div>
        <HousePositions
          chart={chart}
          dominance={dominance}
          selected={drawerHouse}
          onSelect={(house) =>
            setDrawerHouse(house === drawerHouse ? null : house)
          }
          onExplainWeight={explainWeight}
        />
        <ReadingTheGrid />
      </section>

      <section className="mb-16">
        <SectionHeading aside={formatBirth(chart.birth)}>
          How Bodies Act On A House
        </SectionHeading>
        <PlanetaryInfluences />
      </section>

      <section className="mb-16">
        <SectionHeading aside="mutual reception">House Circuits</SectionHeading>
        <HouseCircuits chart={chart} />
      </section>

      <section>
        <SectionHeading aside={`${tenanted} of 12 tenanted`}>
          The Twelve
        </SectionHeading>
        <div className="border-t border-rule">
          {/* Column headers — mirror the row grid in HouseRow exactly. */}
          <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-rule-faint py-2 md:grid-cols-[2.5rem_11rem_1fr_7rem_4rem_1rem]">
            <span className="datum text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase">
              House
            </span>
            <span className="datum text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase">
              Domain
            </span>
            <span className="datum hidden text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase md:block">
              Sign
            </span>
            <span className="datum text-right text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase">
              Tenants
            </span>
            <button
              type="button"
              onClick={explainWeight}
              title="Scoring details"
              className="datum hidden text-right text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase transition-colors hover:text-patina md:block"
            >
              Weight ?
            </button>
            <span className="hidden md:block" />
          </div>
          {chart.houses.map((cusp) => (
            <HouseRow
              key={cusp.number}
              cusp={cusp}
              tenants={tenantsOf(chart.placements, cusp.number)}
              dominance={byHouse.get(cusp.number)}
              open={open === cusp.number}
              scores={scores}
              ease={easeOf.get(cusp.number)}
              onToggle={() => toggle(cusp.number)}
              anchorRef={(el) => anchors.current.set(cusp.number, el)}
              onExplainWeight={explainWeight}
            />
          ))}
        </div>
      </section>

      {dominanceOpen ? (
        <ScoringDetails onClose={() => setDominanceOpen(false)} />
      ) : null}

      {scoringOpen ? (
        <ScoringEditor onClose={() => setScoringOpen(false)} />
      ) : null}

      {drawerCusp ? (
        <HouseDrawer
          cusp={drawerCusp}
          tenants={tenantsOf(chart.placements, drawerCusp.number)}
          dominance={byHouse.get(drawerCusp.number)}
          scores={scores}
          ease={easeOf.get(drawerCusp.number)}
          onClose={() => setDrawerHouse(null)}
          onPrev={() => stepDrawer(-1)}
          onNext={() => stepDrawer(1)}
          onExplainWeight={explainWeight}
          keysActive={!dominanceOpen}
        />
      ) : null}
    </div>
  );
}

export default function HousesPage() {
  const { chart } = useChart();

  if (!chart) {
    return (
      <div className="mx-auto w-full max-w-6xl px-8">
        <PageTitle
          eyebrow="No chart"
          title="Houses"
          lede="No chart selected. Add birth data to begin the study."
        />
      </div>
    );
  }

  if (chart.houses.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl px-8">
        <PageTitle
          eyebrow={chart.name}
          title="Houses"
          lede="No house system stored for this chart. Recalculating it from the
                birth data would fill the cusps in."
        />
      </div>
    );
  }

  return <Houses chart={chart} />;
}
