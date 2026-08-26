"use client";

import { useEffect, useMemo, useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import HouseMatrix, { QUADRANT_TINT } from "@/components/house-matrix";
import HouseDrawer from "@/components/house-drawer";
import ScoringDetails from "@/components/scoring-details";
import ScoringEditor from "@/components/scoring-editor";
import ChartPresets from "@/components/chart-presets";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useScoring } from "@/components/scoring-context";
import type { Chart } from "@/lib/charts";
import { tenantsOf } from "@/lib/charts";
import { houseDominance } from "@/lib/dominance";
import {
  QUADRANT,
  easeLabel,
  easePoints,
  houseEase,
  quadrantOf,
  type EaseBand,
} from "@/lib/ease";
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
   * Rows for the corner lists, sorted the way each corner is read: the heavy
   * corners by weight, the light ones by how far from neutral their ease is.
   * Friction is interesting for being sharp, not for being big.
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
      quadrant: quadrantOf(d.score, band),
    };
  });

  /** The centre band and the no-reading case, listed under the four corners. */
  const middles = (["steady", "background", "untouched"] as const).map((q) => ({
    key: q,
    houses: rows
      .filter((r) => r.quadrant === q)
      .sort((a, b) => b.score - a.score),
  }));

  const corners = (["engine", "pressure", "comfort", "friction"] as const).map(
    (q) => ({
      key: q,
      houses: rows
        .filter((r) => r.quadrant === q)
        .sort((a, b) =>
          q === "engine" || q === "pressure"
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
        "its ruler. Neither implies the other, and a house can be light and " +
        "grinding (Friction) or heavy and flowing (an Engine). The corners are " +
        "opposed along the diagonals, not between neighbours. The scoring " +
        "convention is user-editable — read `preset` and do not assume the " +
        "app's defaults. An `easeBand` of \"sparse\" means too few contacts to " +
        "judge, which is not the same as balanced. `ease` is on a −100 … +100 " +
        "scale, where 100 is entirely one way; quote it in those units, as the " +
        "page does. Where a component breakdown is given, the `from*` values " +
        "are contributions and sum to `ease`.",
      chart: chart.name,
      preset: `${config.label}${edited ? " (modified)" : ""}`,
      houses: rows.map((r) => ({
        house: r.house,
        title: r.title,
        weight: r.score,
        weightRank: r.rank,
        ease: easePoints(r.ease),
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
              time of it. A heavy house is not a good one, and a light house is
              not a safe one — the corners are where the two disagree."
      />

      <section className="mb-16">
        <SectionHeading
          aside={`${config.label.toLowerCase()}${edited ? " · modified" : ""}`}
        >
          The Two Axes
        </SectionHeading>

        {/* The switcher sits directly above the plot: the comparison only
            works if a chart you know can be flicked between conventions and
            watched, rather than reasoned about one at a time. */}
        <div className="mb-6">
          <ChartPresets onEdit={() => setScoringOpen(true)} />
        </div>

        <div className="mb-5">
          <button
            type="button"
            onClick={() => setDominanceOpen(true)}
            className="datum border border-rule px-3 py-1.5 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:border-rule-faint hover:text-bone-soft"
          >
            Scoring Details
          </button>
        </div>

        <HouseMatrix
          dominance={dominance}
          tones={eases}
          chartName={chart.name}
          baseline={config.ease.band}
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
        <SectionHeading aside="what landed where">The 4 Corners</SectionHeading>
        {/* Tinted exactly as the plot's own corner labels are: hue for which
            way the corner leans, strength for how much rides on it. The two
            have to agree on sight or the list reads as a separate idea. */}
        <div className="grid gap-px bg-rule sm:grid-cols-2">
          {corners.map(({ key, houses }) => (
            <div
              key={key}
              className={`border-l-2 bg-void px-5 py-4 ${QUADRANT_TINT[key].rule}`}
            >
              <div className="flex items-baseline justify-between gap-3 border-b border-rule-faint pb-2">
                <p
                  className={`datum text-[0.625rem] tracking-[0.18em] uppercase ${QUADRANT_TINT[key].text}`}
                >
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
                          {easeLabel(r.ease)}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/*
          The band between the corners, joined to them rather than set apart:
          same hairline grid, same card, a neutral left rule where the corners
          carry a tinted one. It is a continuation of the same reading, not a
          second idea, and most houses in most charts live here.
        */}
        <div className="mt-px bg-rule px-5 py-2">
          <p className="datum text-[0.5625rem] tracking-[0.2em] text-bone-faint uppercase">
            The baseline band
          </p>
        </div>
        <div className="mt-px">
          <div className="grid gap-px bg-rule sm:grid-cols-3">
            {middles.map(({ key, houses }) => (
              <div
                key={key}
                className="border-l-2 border-bone-faint/35 bg-void px-5 py-4"
              >
                <div className="flex items-baseline justify-between gap-3 border-b border-rule-faint pb-2">
                  <p className="datum text-[0.625rem] tracking-[0.18em] text-bone-soft uppercase">
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
                    None in this chart
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
                            {easeLabel(r.ease)}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-[0.875rem] leading-relaxed text-bone-faint">
          Green leans easy and orange leans hard; the full-strength pair are the
          houses much of the chart depends on, the softened pair the ones little
          rides on. The opposites are the diagonals, not the neighbours —
          High Pressure and Comfort sit opposite on both axes, as do Engine and
          Friction, while High Pressure and Friction sit at the same end of Ease
          and differ only in how much rides on them.
        </p>
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
                  {easeLabel(r.ease)}
                </span>
                <span className="datum text-right text-[0.5625rem] tracking-[0.14em] text-bone-faint uppercase">
                  {QUADRANT[r.quadrant].label}
                </span>
              </button>
            ))}
        </div>
        <p className="mt-4 text-[0.875rem] leading-relaxed text-bone-faint">
          Sorted by ease, hardest first — the ordering the weight ranking cannot
          show. Every house is named, including the ones on the centre line:
          sitting at zero is a reading, not a gap. Read by {preset ? preset.label.toLowerCase() : config.id}
          {edited ? ", hand-edited" : ""}.
        </p>
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
