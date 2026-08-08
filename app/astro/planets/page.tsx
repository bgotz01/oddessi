"use client";

import { PageTitle, SectionHeading } from "@/components/primitives";
import {
  Block,
  ListColumn,
  OpenMark,
  Pair,
  Panel,
  Prose,
  Terms,
  useOneOpen,
} from "@/components/study-panel";
import { useChart } from "@/components/chart-context";
import type { Placement } from "@/lib/charts";
import {
  DIGNITY_NOTE,
  bodyInHouse,
  bodyInSign,
  bodyInfo,
  dignityOf,
  houseInfo,
  type Dignity,
} from "@/lib/interpretation";
import { bodyGlyph, signGlyph } from "@/lib/symbols";

/**
 * Every body in the chart, read one at a time.
 *
 * Three tables meet on this page and they answer different questions: what the
 * planet *is* (constant), what the sign does to it, and what the house gives it
 * to work on. They stay separate here rather than being blended into one
 * paragraph, because knowing which layer a statement came from is most of the
 * skill of reading a chart.
 *
 * Angles are excluded — the Ascendant and Midheaven are directions, not bodies,
 * and there is nothing to say about their dignity or their speed. They stay on
 * the Birth Chart page where they belong.
 */

/** Dignity earns colour, but only within the two-accent rule. */
const DIGNITY_TONE: Record<Dignity, string> = {
  Ruling: "text-patina border-patina-dim",
  Exaltation: "text-patina border-patina-dim",
  Detriment: "text-ember border-ember-dim",
  Fall: "text-ember border-ember-dim",
  Neutral: "text-bone-faint border-rule",
};

function DignityMark({ dignity }: { dignity: Dignity }) {
  return (
    <span
      className={`datum border-l pl-2 text-[0.625rem] tracking-[0.2em] uppercase ${DIGNITY_TONE[dignity]}`}
    >
      {dignity}
    </span>
  );
}

function BodyRow({
  placement,
  open,
  onToggle,
  anchorRef,
}: {
  placement: Placement;
  open: boolean;
  onToggle: () => void;
  anchorRef: (el: HTMLElement | null) => void;
}) {
  const { body, sign, degree, house, houseNumber, retrograde } = placement;

  const info = bodyInfo(body);
  const inSign = bodyInSign(body, sign);
  const inHouse = bodyInHouse(body, houseNumber);
  const home = houseNumber !== null ? houseInfo(houseNumber) : null;
  const dignity = dignityOf(body, sign);

  return (
    <div ref={anchorRef} className="scroll-mt-4 border-b border-rule-faint">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`grid w-full grid-cols-[2rem_1fr_auto] items-baseline gap-4 py-4 text-left transition-colors md:grid-cols-[2rem_9rem_1fr_5rem_3rem_7rem_1rem] ${
          open ? "text-bone" : "hover:bg-surface-alt"
        }`}
      >
        <span className="glyph text-lg text-patina">{bodyGlyph(body)}</span>

        <span className="inscription text-[0.6875rem] text-bone">
          {body}
          {retrograde ? (
            <span className="datum ml-2 text-[0.625rem] text-ember" title="Retrograde">
              ℞
            </span>
          ) : null}
        </span>

        <span className="hidden md:block">
          <span className="glyph mr-2 text-bone-faint">{signGlyph(sign)}</span>
          <span className="text-[0.9375rem] font-light text-bone-soft italic">
            {inSign?.meaning ?? sign}
          </span>
        </span>

        <span className="datum text-[0.75rem] text-bone-faint md:text-right">
          {degree}
        </span>

        <span
          className="datum hidden text-[0.75rem] text-bone-faint md:block md:text-right"
          title={home?.name}
        >
          {house}
        </span>

        <span className="hidden md:block md:text-right">
          <DignityMark dignity={dignity} />
        </span>

        <span className="hidden md:block md:text-right">
          <OpenMark open={open} />
        </span>
      </button>

      {open ? (
        <div className="pb-8">
          <Panel>
            {inSign ? (
              <div>
                <p className="inscription mb-3 text-[0.8125rem] text-patina">
                  {inSign.meaning}
                </p>
                <Prose>{inSign.shortDescription}</Prose>
              </div>
            ) : null}

            {info ? (
              <Block title="The Body" aside={info.orbitPeriod}>
                <Prose>{info.overview}</Prose>
                <div className="mt-4">
                  <Terms terms={info.keywords} />
                </div>
              </Block>
            ) : null}

            {inSign ? (
              <Block title={`In ${sign}`} aside={degree}>
                <Prose>{inSign.detailedDescription}</Prose>
                <div className="mt-6">
                  <Pair>
                    <ListColumn label="Strengths" items={inSign.strengths} />
                    <ListColumn
                      label="Costs"
                      items={inSign.challenges}
                      tone="ember"
                    />
                  </Pair>
                </div>
              </Block>
            ) : null}

            <Block title="Dignity" aside={dignity}>
              <Prose>{DIGNITY_NOTE[dignity]}</Prose>
            </Block>

            {retrograde ? (
              <Block title="Retrograde" aside="℞">
                <Prose>
                  {`${body} was moving backwards against the stars at this
                    moment. The function still runs, but it runs inward first —
                    rehearsed, revised, and answerable to a private standard
                    before it is answerable to anyone else's.`}
                </Prose>
              </Block>
            ) : null}

            {inHouse && home ? (
              <Block title={`House ${houseNumber} — ${home.name}`} aside={home.element}>
                <p className="inscription mb-3 text-[0.75rem] text-patina">
                  {inHouse.meaning}
                </p>
                <Prose>{inHouse.detailedDescription}</Prose>
                <div className="mt-6">
                  <Pair>
                    <ListColumn
                      label="Opportunities"
                      items={inHouse.opportunities}
                    />
                    <ListColumn
                      label="Difficulties"
                      items={inHouse.challenges}
                      tone="ember"
                    />
                  </Pair>
                </div>
                <div className="mt-6">
                  <ListColumn label="Practice" items={inHouse.developmentTips} />
                </div>
                <div className="mt-6">
                  <Terms terms={inHouse.manifestation} />
                </div>
              </Block>
            ) : null}

            {inSign ? (
              <Block title="Where it lands">
                <Terms terms={inSign.lifeAreas} />
              </Block>
            ) : null}
          </Panel>
        </div>
      ) : null}
    </div>
  );
}

export default function PlanetsPage() {
  const { chart } = useChart();
  const { open, toggle, register } = useOneOpen<string>();

  if (!chart) {
    return (
      <div className="mx-auto w-full max-w-6xl px-8">
        <PageTitle
          eyebrow="No chart"
          title="Planets"
          lede="No chart selected. Add birth data to begin the study."
        />
      </div>
    );
  }

  const bodies = chart.placements.filter((p) => !p.isAngle);
  const retrogrades = bodies.filter((p) => p.retrograde).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow={chart.name}
        title="Planets"
        lede="One body per row. Each opens onto three separate readings — what the
              planet is, what the sign makes of it, and what the house asks it to
              do — kept apart on purpose, so it stays clear which layer any given
              claim came from."
      />

      <section>
        <SectionHeading
          aside={`${bodies.length} bodies · ${retrogrades} ℞`}
        >
          The Bodies
        </SectionHeading>

        {bodies.length === 0 ? (
          <p className="font-light text-bone-soft">
            No planetary positions stored for this chart.
          </p>
        ) : (
          <div className="border-t border-rule">
            {bodies.map((p) => (
              <BodyRow
                key={p.body}
                placement={p}
                open={open === p.body}
                onToggle={() => toggle(p.body)}
                anchorRef={register(p.body)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
