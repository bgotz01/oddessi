"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import DominanceModal from "@/components/DominanceModal";
import { MODE_NOTE, dominanceMode } from "@/lib/dominance";

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
        className={`grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-4 text-left transition-colors md:grid-cols-[2.5rem_11rem_1fr_7rem_4rem_1rem] ${open ? "text-bone" : "hover:bg-surface-alt"
          }`}
      >
        {/* Same type hue as the grid above, so a house is recognisable in both. */}
        <span
          className="inscription text-[0.875rem]"
          style={{ color: tone.color }}
        >
          {cusp.roman}
        </span>

        <span className="inscription text-[0.8125rem] text-bone">
          {getHouseTitle(cusp.number as House)}
        </span>

        <span className="hidden md:block">
          <span className="glyph mr-2 text-bone-faint">
            {signGlyph(cusp.sign)}
          </span>
          <span className="text-[0.9375rem] font-light text-bone">
            {cusp.sign}
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
                className="flex items-baseline gap-1"
              >
                <span className="glyph text-[0.9375rem] text-patina">
                  {bodyGlyph(t.body)}
                </span>
                <span className="datum text-[0.5625rem] tracking-[0.1em] text-bone-soft uppercase hidden sm:inline">
                  {t.body}
                </span>
              </span>
            ))
          )}
        </span>

        <span
          className={`datum hidden text-[0.75rem] md:block md:text-right ${dominance && dominance.rank <= 3 ? "text-ember" : "text-bone-faint"
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

/**
 * Right-side drawer that shows the full reading for a single house.
 * Clicking a grid card opens this instead of scrolling/expanding below.
 */
function HouseDrawer({
  cusp,
  tenants,
  dominance,
  onClose,
  onPrev,
  onNext,
}: {
  cusp: HouseCusp;
  tenants: Placement[];
  dominance: HouseDominance | undefined;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const info = houseInfo(cusp.number);
  const onCusp = signOnCusp(cusp.sign, cusp.number);
  const typeNote = info ? houseTypeNote(info.element) : null;
  const tone = houseTypeStyle(info?.element);
  const top3 = dominance !== undefined && dominance.rank <= 3;

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onPrev, onNext]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-void/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`House ${cusp.number} — ${getHouseTitle(cusp.number as House)}`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-rule bg-surface shadow-2xl"
      >
        {/* Header */}
        <div className="shrink-0 border-b border-rule px-8 py-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-baseline gap-5">
              <span
                className="inscription text-[2.5rem] leading-none"
                style={{ color: tone.color }}
              >
                {cusp.roman}
              </span>
              <div>
                <p className="inscription text-[0.8125rem] text-bone-faint">
                  House {cusp.number}
                </p>
                <p className="mt-1 text-[1.375rem] leading-tight text-bone">
                  {getHouseTitle(cusp.number as House)}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="glyph text-[1.25rem] text-patina">
                    {signGlyph(cusp.sign)}
                  </span>
                  <span className="text-[1.0625rem] font-light text-bone-soft">
                    {cusp.sign}
                  </span>
                  <span className="datum text-[0.6875rem] text-bone-faint">
                    {cusp.degree}
                  </span>
                </div>
                {top3 && dominance ? (
                  <p className="datum mt-1.5 text-[0.5625rem] tracking-[0.2em] text-ember uppercase">
                    Rank {dominance.rank} of 12
                  </p>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
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
                {dominance ? (
                  <p className="mt-3 text-[0.9375rem] leading-snug font-light text-bone-faint italic">
                    {MODE_NOTE[dominanceMode(dominance)]}
                  </p>
                ) : null}
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

        {/* Footer nav */}
        <div className="mt-auto shrink-0 flex items-center justify-between border-t border-rule px-8 py-4">
          <button
            type="button"
            onClick={onPrev}
            className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-patina"
          >
            ← Prev
          </button>
          <span className="datum text-[0.5625rem] tracking-[0.18em] text-bone-faint uppercase">
            House {cusp.number} of 12
          </span>
          <button
            type="button"
            onClick={onNext}
            className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-patina"
          >
            Next →
          </button>
        </div>

        {/* Accent bar matching the house type colour */}
        <div
          className="h-[3px] w-full shrink-0 opacity-60"
          style={{ background: tone.color }}
        />
      </div>
    </>
  );
}

function Houses({ chart }: { chart: Chart }) {
  const [open, setOpen] = useState<number | null>(null);
  const [drawerHouse, setDrawerHouse] = useState<number | null>(null);
  const [gridGuideOpen, setGridGuideOpen] = useState(false);
  const [dominanceModalOpen, setDominanceModalOpen] = useState(false);
  const anchors = useRef(new Map<number, HTMLDivElement | null>());

  const dominance = useMemo(() => houseDominance(chart), [chart]);
  const byHouse = new Map(dominance.map((d) => [d.house, d]));

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

  const loudest = dominance.filter((d) => d.rank <= 3).sort((a, b) => a.rank - b.rank);

  const drawerCusp = drawerHouse !== null
    ? chart.houses.find((h) => h.number === drawerHouse) ?? null
    : null;
  const drawerTenants = drawerHouse !== null ? tenantsOf(chart.placements, drawerHouse) : [];
  const drawerDominance = drawerHouse !== null ? byHouse.get(drawerHouse) : undefined;

  const stepDrawer = (delta: 1 | -1) => {
    if (drawerHouse === null) return;
    const next = ((drawerHouse - 1 + delta + 12) % 12) + 1;
    setDrawerHouse(next);
  };

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
          selected={drawerHouse}
          onSelect={(house) => setDrawerHouse(house === drawerHouse ? null : house)}
        />

        {/* Reading The Grid — collapsible, lives close to the grid it explains */}
        <div className="mt-6 border-t border-rule-faint">
          <button
            type="button"
            onClick={() => setGridGuideOpen((v) => !v)}
            aria-expanded={gridGuideOpen}
            className="flex w-full items-baseline justify-between py-4 text-left transition-colors hover:text-bone"
          >
            <span className="datum text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase">
              Reading The Grid
            </span>
            <span className="flex items-center gap-3">
              <span className="datum text-[0.625rem] tracking-[0.14em] text-bone-faint uppercase">
                angular · succedent · cadent
              </span>
              <span className={`datum text-[0.875rem] text-bone-faint transition-transform ${gridGuideOpen ? "rotate-90" : ""}`}>
                ›
              </span>
            </span>
          </button>
          {gridGuideOpen && (
            <div className="pb-8">
              <HouseTypeGuide />
            </div>
          )}
        </div>
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
        <SectionHeading
          aside={`${chart.houses.filter((h) => tenantsOf(chart.placements, h.number).length > 0).length} of 12 tenanted`}
        >
          The Twelve
        </SectionHeading>
        <div className="border-t border-rule">
          {/* Column headers — mirror the row grid exactly */}
          <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-rule-faint py-2 md:grid-cols-[2.5rem_11rem_1fr_7rem_4rem_1rem]">
            <span className="datum text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase">House</span>
            <span className="datum text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase">Domain</span>
            <span className="datum hidden text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase md:block">Sign</span>
            <span className="datum text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase text-right">Tenants</span>
            <button
              type="button"
              onClick={() => setDominanceModalOpen(true)}
              title="How dominance is calculated"
              className="datum hidden text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase text-right transition-colors hover:text-patina md:block"
            >
              Weight ?
            </button>
            <span className="hidden md:block" />
          </div>
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

      {dominanceModalOpen && (
        <DominanceModal onClose={() => setDominanceModalOpen(false)} />
      )}

      {drawerCusp !== null && (
        <HouseDrawer
          cusp={drawerCusp}
          tenants={drawerTenants}
          dominance={drawerDominance}
          onClose={() => setDrawerHouse(null)}
          onPrev={() => stepDrawer(-1)}
          onNext={() => stepDrawer(1)}
        />
      )}
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
