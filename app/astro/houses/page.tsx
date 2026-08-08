"use client";

import { useMemo, useRef, useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import {
  Block,
  ListColumn,
  OpenMark,
  Pair,
  Panel,
  Prose,
  Terms,
} from "@/components/study-panel";
import HousePositions from "@/components/house-positions";
import {
  HouseCircuits,
  HouseTypeGuide,
  PlanetaryInfluences,
} from "@/components/house-context";
import { useChart } from "@/components/chart-context";
import type { Chart, HouseCusp, Placement } from "@/lib/charts";
import { formatBirth } from "@/lib/charts";
import { houseDominance, type HouseDominance } from "@/lib/dominance";
import {
  bodyInHouse,
  houseInfo,
  houseTypeNote,
  signOnCusp,
} from "@/lib/interpretation";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import { houseTypeStyle } from "@/lib/house-types";
import { bodyGlyph, signGlyph } from "@/lib/symbols";

/**
 * The twelve houses, following arc's order of operations: what bodies do to a
 * house, then all twelve at a glance with their dominance scores, then the
 * rulership circuits, then the type guide, then the long readings.
 *
 * The grid and the readings share one selection. Clicking a box scrolls to that
 * house's reading and opens it, so the wall of boxes is a way *into* the text
 * rather than a separate widget sitting above it.
 */

function tenantsOf(placements: Placement[], house: number): Placement[] {
  return placements
    .filter((p) => !p.isAngle && p.houseNumber === house)
    .sort((a, b) => (a.longitude ?? 0) - (b.longitude ?? 0));
}

function HouseReading({
  cusp,
  tenants,
  dominance,
  open,
  onToggle,
  anchorRef,
}: {
  cusp: HouseCusp;
  tenants: Placement[];
  dominance: HouseDominance | undefined;
  open: boolean;
  onToggle: () => void;
  anchorRef: (el: HTMLDivElement | null) => void;
}) {
  const info = houseInfo(cusp.number);
  const onCusp = signOnCusp(cusp.sign, cusp.number);
  const typeNote = info ? houseTypeNote(info.element) : null;
  const tone = houseTypeStyle(info?.element);

  return (
    <div ref={anchorRef} className="scroll-mt-4 border-b border-rule-faint">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-4 text-left transition-colors md:grid-cols-[2.5rem_11rem_1fr_7rem_4rem_1rem] ${
          open ? "text-bone" : "hover:bg-surface-alt"
        }`}
      >
        {/* Same type hue as the grid above, so a house is recognisable in both. */}
        <span
          className="inscription text-[0.875rem]"
          style={{ color: tone.color }}
        >
          {cusp.roman}
        </span>

        <span className="inscription text-[0.6875rem] text-bone">
          {getHouseTitle(cusp.number as House)}
        </span>

        <span className="hidden md:block">
          <span className="glyph mr-2 text-bone-faint">
            {signGlyph(cusp.sign)}
          </span>
          <span className="text-[0.9375rem] font-light text-bone-soft italic">
            {onCusp?.essence ?? cusp.sign}
          </span>
        </span>

        <span className="flex items-baseline justify-end gap-1.5">
          {tenants.length === 0 ? (
            <span className="datum text-[0.625rem] text-bone-faint">—</span>
          ) : (
            tenants.map((t) => (
              <span
                key={t.body}
                title={`${t.body} in ${t.sign}`}
                className="glyph text-[0.9375rem] text-patina"
              >
                {bodyGlyph(t.body)}
              </span>
            ))
          )}
        </span>

        <span
          className={`datum hidden text-[0.75rem] md:block md:text-right ${
            dominance && dominance.rank <= 3 ? "text-ember" : "text-bone-faint"
          }`}
          title="Dominance"
        >
          {dominance ? dominance.score.toFixed(1) : "—"}
        </span>

        <span className="hidden md:block md:text-right">
          <OpenMark open={open} />
        </span>
      </button>

      {open ? (
        <div className="pb-8">
          <Panel>
            {info ? (
              <div>
                <p className="inscription mb-3 text-[0.8125rem] text-patina">
                  {info.name}
                </p>
                <Prose>{info.description}</Prose>
                <div className="mt-4">
                  <Terms terms={info.lifeAreas} />
                </div>
              </div>
            ) : null}

            {dominance ? (
              <Block
                title="Weight"
                aside={`rank ${dominance.rank} of 12 · ${dominance.score.toFixed(1)}`}
              >
                <div className="grid gap-px bg-rule sm:grid-cols-3">
                  {[
                    ["Occupancy", dominance.occupancy],
                    ["Ruler strength", dominance.rulerStrength],
                    ["Ruler activity", dominance.rulerActivity],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="bg-void px-4 py-3">
                      <p className="eyebrow">{label}</p>
                      <p className="datum mt-1 text-[0.9375rem] text-bone">
                        {(value as number).toFixed(1)}
                      </p>
                    </div>
                  ))}
                </div>
                {dominance.reasons.length > 0 ? (
                  <div className="mt-4">
                    <ListColumn label="Because" items={dominance.reasons} />
                  </div>
                ) : null}
                <p className="datum mt-4 text-[0.625rem] text-bone-faint">
                  Ruled by {dominance.ruler}
                  {dominance.rulerPlacement
                    ? ` — in ${dominance.rulerPlacement.sign}, house ${dominance.rulerPlacement.house}`
                    : ", which is not in this chart"}
                  .
                </p>
              </Block>
            ) : null}

            {onCusp ? (
              <Block
                title={`${cusp.sign} on the cusp`}
                aside={`${cusp.degree} ${cusp.sign}`}
              >
                <Prose>{onCusp.description}</Prose>
                <div className="mt-4">
                  <Prose>{onCusp.approach}</Prose>
                </div>
                <div className="mt-6">
                  <Pair>
                    <ListColumn label="Strengths" items={onCusp.strengths} />
                    <ListColumn
                      label="Costs"
                      items={onCusp.challenges}
                      tone="ember"
                    />
                  </Pair>
                </div>
                <div className="mt-6 border-l border-rule pl-4">
                  <Prose>{onCusp.lifeExpression}</Prose>
                </div>
              </Block>
            ) : null}

            <Block
              title="Tenants"
              aside={
                tenants.length === 0
                  ? "empty"
                  : `${tenants.length} ${tenants.length === 1 ? "body" : "bodies"}`
              }
            >
              {tenants.length === 0 ? (
                <Prose>
                  {`Nothing sits in this house. That is the ordinary case — there
                    are more houses than bodies — and it means the domain is run
                    by its cusp sign and by wherever that sign's ruler has
                    landed, rather than being worked on directly.`}
                </Prose>
              ) : (
                <div className="space-y-8">
                  {tenants.map((t) => {
                    const inHouse = bodyInHouse(t.body, cusp.number);
                    return (
                      <div key={t.body}>
                        <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="glyph text-lg text-patina">
                            {bodyGlyph(t.body)}
                          </span>
                          <span className="inscription text-[0.6875rem] text-bone">
                            {t.body}
                          </span>
                          <span className="glyph text-bone-faint">
                            {signGlyph(t.sign)}
                          </span>
                          <span className="text-[0.9375rem] font-light text-bone-soft italic">
                            {t.sign}
                          </span>
                          <span className="datum text-[0.6875rem] text-bone-faint">
                            {t.degree}
                          </span>
                          {t.retrograde ? (
                            <span className="datum text-[0.625rem] text-ember">
                              ℞
                            </span>
                          ) : null}
                        </div>

                        {inHouse ? (
                          <div className="border-l border-rule pl-4">
                            <p className="inscription mb-2 text-[0.6875rem] text-patina-dim">
                              {inHouse.meaning}
                            </p>
                            <Prose>{inHouse.shortDescription}</Prose>
                            <div className="mt-4">
                              <Terms terms={inHouse.manifestation} />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </Block>

            {info && typeNote ? (
              <Block title={`${info.element} house`} aside={info.modality}>
                <div
                  className="border-l-2 pl-4"
                  style={{ borderColor: tone.color }}
                >
                  <Prose>{typeNote}</Prose>
                </div>
              </Block>
            ) : null}
          </Panel>
        </div>
      ) : null}
    </div>
  );
}

function Houses({ chart }: { chart: Chart }) {
  const [open, setOpen] = useState<number | null>(null);
  const anchors = useRef(new Map<number, HTMLDivElement | null>());

  const dominance = useMemo(() => houseDominance(chart), [chart]);
  const byHouse = new Map(dominance.map((d) => [d.house, d]));

  /** Scrolling is what ties the grid to the readings; both selectors use it. */
  const reveal = (house: number) => {
    requestAnimationFrame(() =>
      anchors.current
        .get(house)
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const select = (house: number) => {
    setOpen(house);
    reveal(house);
  };

  const toggle = (house: number) => {
    if (open === house) {
      setOpen(null);
      return;
    }
    select(house);
  };

  const loudest = dominance.filter((d) => d.rank <= 3).sort((a, b) => a.rank - b.rank);

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
        <SectionHeading aside={formatBirth(chart.birth)}>
          How Bodies Act On A House
        </SectionHeading>
        <PlanetaryInfluences />
      </section>

      <section className="mb-16">
        <SectionHeading
          aside={
            loudest.length
              ? `loudest: ${loudest.map((d) => `${d.house}`).join(" · ")}`
              : undefined
          }
        >
          House Positions
        </SectionHeading>
        <HousePositions
          chart={chart}
          dominance={dominance}
          selected={open}
          onSelect={select}
        />
      </section>

      <section className="mb-16">
        <SectionHeading aside="mutual reception">House Circuits</SectionHeading>
        <HouseCircuits chart={chart} />
      </section>

      <section className="mb-16">
        <SectionHeading aside="angular · succedent · cadent">
          Reading The Grid
        </SectionHeading>
        <HouseTypeGuide />
      </section>

      <section>
        <SectionHeading
          aside={`${chart.houses.filter((h) => tenantsOf(chart.placements, h.number).length > 0).length} of 12 tenanted`}
        >
          The Twelve
        </SectionHeading>
        <div className="border-t border-rule">
          {chart.houses.map((cusp) => (
            <HouseReading
              key={cusp.number}
              cusp={cusp}
              tenants={tenantsOf(chart.placements, cusp.number)}
              dominance={byHouse.get(cusp.number)}
              open={open === cusp.number}
              onToggle={() => toggle(cusp.number)}
              anchorRef={(el) => anchors.current.set(cusp.number, el)}
            />
          ))}
        </div>
      </section>
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
