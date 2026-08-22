"use client";

import { useEffect, useMemo, useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import HouseMatrix from "@/components/house-matrix";
import HouseDrawer from "@/components/house-drawer";
import DominanceModal from "@/components/DominanceModal";
import ScoringEditor from "@/components/scoring-editor";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useScoring } from "@/components/scoring-context";
import type { Chart } from "@/lib/charts";
import { tenantsOf } from "@/lib/charts";
import { houseDominance } from "@/lib/dominance";
import { QUADRANT, houseEase, quadrantOf, type EaseBand } from "@/lib/ease";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";

/**
 * The two axes on their own page.
 *
 * On /western/houses the matrix is one section among several, competing with
 * twelve boxes and twelve readings. The question it answers — where does this
 * chart work and where does it fight you — is worth asking on its own, with
 * room for the corners to be listed out rather than only plotted.
 *
 * It shares every input with the houses page: the same two scorers, the same
 * live convention, the same drawer. Nothing is computed differently here, so
 * the two views can never disagree.
 */

const BAND_TEXT: Record<EaseBand, string> = {
  flowing: "text-patina",
  grinding: "text-ember",
  balanced: "text-bone-soft",
  sparse: "text-bone-faint",
};

function FlowGrind({ chart }: { chart: Chart }) {
  const [drawerHouse, setDrawerHouse] = useState<number | null>(null);
  const [dominanceOpen, setDominanceOpen] = useState(false);
  const [scoringOpen, setScoringOpen] = useState(false);
  const { setPageContext } = useChat();
  const { config, preset, edited } = useScoring();

  const dominance = useMemo(
    () => houseDominance(chart, config),
    [chart, config],
  );
  const eases = useMemo(() => houseEase(chart, config), [chart, config]);

  const byHouse = useMemo(
    () => new Map(dominance.map((d) => [d.house, d])),
    [dominance],
  );
  const easeOf = useMemo(
    () => new Map(eases.map((e) => [e.house, e])),
    [eases],
  );

  /**
   * Rows for the corner lists, sorted the way each corner is read: the loud
   * corners by weight, the quiet ones by how far from neutral their ease is.
   * A Snag is interesting for being sharp, not for being big.
   */
  const rows = dominance.map((d) => {
    const ease = easeOf.get(d.house);
    const band: EaseBand = ease?.band ?? "sparse";
    return {
      house: d.house,
      title: getHouseTitle(d.house as House),
      score: d.score,
      rank: d.rank,
      ease: ease?.ease ?? 0,
      band,
      quadrant: quadrantOf(d.rank, band),
    };
  });

  const corners = (["engine", "millstone", "clear", "snag"] as const).map(
    (q) => ({
      key: q,
      houses: rows
        .filter((r) => r.quadrant === q)
        .sort((a, b) =>
          q === "engine" || q === "millstone"
            ? b.score - a.score
            : Math.abs(b.ease) - Math.abs(a.ease),
        ),
    }),
  );

  const drawerCusp =
    drawerHouse === null
      ? null
      : (chart.houses.find((h) => h.number === drawerHouse) ?? null);

  const stepDrawer = (delta: 1 | -1) => {
    if (drawerHouse === null) return;
    setDrawerHouse(((drawerHouse - 1 + delta + 12) % 12) + 1);
  };

  useEffect(() => {
    setPageContext({
      _description: "Flow & Grind — the twelve houses on weight against ease",
      _note:
        "Two independent measures. `weight` is how much of the chart runs " +
        "through a house; `ease` is whether what runs there flows or grinds, " +
        "from the aspects, sign dignity and tenancy of the house's bodies and " +
        "its ruler. Neither implies the other, and a house can be quiet and " +
        "grinding (a Snag) or loud and flowing (an Engine). The corners are " +
        "opposed along the diagonals, not between neighbours. The scoring " +
        "convention is user-editable — read `preset` and do not assume the " +
        "app's defaults. An `easeBand` of \"sparse\" means too few contacts to " +
        "judge, which is not the same as balanced.",
      chart: chart.name,
      preset: `${config.label}${edited ? " (modified)" : ""}`,
      houses: rows.map((r) => ({
        house: r.house,
        title: r.title,
        weight: r.score,
        weightRank: r.rank,
        ease: r.ease,
        easeBand: r.band,
        quadrant: r.quadrant,
        quadrantMeans: QUADRANT[r.quadrant].gloss,
      })),
    });
    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart.id, dominance, eases, config]);

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow={chart.name}
        title="Flow & Grind"
        lede="Two questions a single ranking cannot hold at once: how much of the
              chart runs through a house, and whether what runs there has an easy
              time of it. A loud house is not a good one, and a quiet house is
              not a safe one — the corners are where the two disagree."
      />

      <section className="mb-16">
        <SectionHeading
          aside={`${config.label.toLowerCase()}${edited ? " · modified" : ""}`}
        >
          The Two Axes
        </SectionHeading>

        <div className="mb-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setDominanceOpen(true)}
            className="datum border border-rule px-3 py-1.5 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:border-rule-faint hover:text-bone-soft"
          >
            How it is calculated
          </button>
          <button
            type="button"
            onClick={() => setScoringOpen(true)}
            className="datum border border-rule px-3 py-1.5 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:border-rule-faint hover:text-bone-soft"
          >
            Scoring
          </button>
        </div>

        <HouseMatrix
          dominance={dominance}
          tones={eases}
          selected={drawerHouse}
          onSelect={(house) =>
            setDrawerHouse(house === drawerHouse ? null : house)
          }
        />
      </section>

      {/* The corners, listed. The plot shows where a house sits; this says
          which houses actually landed in each cell, including the empty ones —
          a corner with nothing in it is a finding about the chart. */}
      <section className="mb-16">
        <SectionHeading aside="what landed where">The Corners</SectionHeading>
        <div className="grid gap-px bg-rule sm:grid-cols-2">
          {corners.map(({ key, houses }) => (
            <div key={key} className="bg-void px-5 py-4">
              <div className="flex items-baseline justify-between gap-3 border-b border-rule-faint pb-2">
                <p className="datum text-[0.625rem] tracking-[0.18em] text-bone uppercase">
                  {QUADRANT[key].label}
                </p>
                <p className="datum text-[0.5625rem] tracking-[0.14em] text-bone-faint uppercase">
                  {QUADRANT[key].coords}
                </p>
              </div>
              <p className="mt-2 text-[0.875rem] leading-snug text-bone-soft">
                {QUADRANT[key].gloss}
              </p>

              {houses.length === 0 ? (
                <p className="datum mt-3 text-[0.625rem] tracking-[0.14em] text-bone-faint uppercase">
                  Nothing in this chart
                </p>
              ) : (
                <div className="mt-3 space-y-px">
                  {houses.map((r) => (
                    <button
                      key={r.house}
                      type="button"
                      onClick={() => setDrawerHouse(r.house)}
                      className="flex w-full items-baseline justify-between gap-3 py-1.5 text-left transition-colors hover:text-bone"
                    >
                      <span className="flex items-baseline gap-2.5">
                        <span className="inscription text-[0.75rem] text-bone-faint">
                          {r.house}
                        </span>
                        <span className="text-[0.9375rem] font-light text-bone">
                          {r.title}
                        </span>
                      </span>
                      <span className="datum shrink-0 text-[0.625rem] text-bone-faint">
                        {r.score.toFixed(1)} ·{" "}
                        <span className={BAND_TEXT[r.band]}>
                          {r.ease > 0 ? "+" : ""}
                          {r.ease.toFixed(2)}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Everything, so the middle is accounted for too. */}
      <section>
        <SectionHeading aside="all twelve">The Full Spread</SectionHeading>
        <div className="border-t border-rule">
          <div className="grid grid-cols-[2.5rem_1fr_5rem_5rem_6rem] items-baseline gap-3 border-b border-rule-faint py-2">
            {["House", "Domain", "Weight", "Ease", "Corner"].map((h, i) => (
              <span
                key={h}
                className={`datum text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase ${i >= 2 ? "text-right" : ""}`}
              >
                {h}
              </span>
            ))}
          </div>
          {[...rows]
            .sort((a, b) => a.ease - b.ease)
            .map((r) => (
              <button
                key={r.house}
                type="button"
                onClick={() => setDrawerHouse(r.house)}
                className="grid w-full grid-cols-[2.5rem_1fr_5rem_5rem_6rem] items-baseline gap-3 border-b border-rule-faint py-3 text-left transition-colors hover:bg-surface-alt"
              >
                <span className="inscription text-[0.875rem] text-bone-faint">
                  {r.house}
                </span>
                <span className="text-[0.9375rem] font-light text-bone">
                  {r.title}
                </span>
                <span className="datum text-right text-[0.75rem] text-bone-soft">
                  {r.score.toFixed(1)}
                </span>
                <span
                  className={`datum text-right text-[0.75rem] ${BAND_TEXT[r.band]}`}
                >
                  {r.ease > 0 ? "+" : ""}
                  {r.ease.toFixed(2)}
                </span>
                <span className="datum text-right text-[0.5625rem] tracking-[0.14em] text-bone-faint uppercase">
                  {r.quadrant === "middle" ? "—" : QUADRANT[r.quadrant].label}
                </span>
              </button>
            ))}
        </div>
        <p className="mt-4 text-[0.875rem] leading-relaxed text-bone-faint">
          Sorted by ease, hardest first — the ordering the weight ranking cannot
          show. Read by {preset ? preset.label.toLowerCase() : config.id}
          {edited ? ", hand-edited" : ""}.
        </p>
      </section>

      {dominanceOpen ? (
        <DominanceModal onClose={() => setDominanceOpen(false)} />
      ) : null}

      {scoringOpen ? (
        <ScoringEditor onClose={() => setScoringOpen(false)} />
      ) : null}

      {drawerCusp ? (
        <HouseDrawer
          cusp={drawerCusp}
          tenants={tenantsOf(chart.placements, drawerCusp.number)}
          dominance={byHouse.get(drawerCusp.number)}
          scores={dominance.map((d) => d.score)}
          ease={easeOf.get(drawerCusp.number)}
          onClose={() => setDrawerHouse(null)}
          onPrev={() => stepDrawer(-1)}
          onNext={() => stepDrawer(1)}
          keysActive={!dominanceOpen && !scoringOpen}
        />
      ) : null}
    </div>
  );
}

export default function FlowGrindPage() {
  const { chart } = useChart();

  if (!chart) {
    return (
      <div className="mx-auto w-full max-w-6xl px-8">
        <PageTitle
          eyebrow="No chart"
          title="Flow & Grind"
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
          title="Flow & Grind"
          lede="No house system stored for this chart. Both axes are read from
                the twelve cusps, so there is nothing to plot until they are
                calculated."
        />
      </div>
    );
  }

  return <FlowGrind chart={chart} />;
}
