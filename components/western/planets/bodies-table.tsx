"use client";

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
import { bodyColor, bodyRole } from "@/lib/bodies";
import { houseTypeStyle } from "@/lib/house-types";
import { bodyGlyph, signGlyph, signMeta, ELEMENT_COLOR } from "@/lib/symbols";

/**
 * Column order (desktop):
 *   bar · glyph · Body · Sign · Archetype · Element · Degree · House · Dignity · ›
 *
 * Archetype sits right after Sign so it reads as a qualifier of the sign, not
 * a trailing note. Fixed widths on every column so nothing stretches.
 */
const COLS =
  "md:grid-cols-[0.25rem_2rem_8rem_7rem_12rem_5rem_5rem_4rem_7rem_1rem]";

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
  const color = bodyColor(body);
  const sm = signMeta(sign);

  return (
    <div ref={anchorRef} className="scroll-mt-4 border-b border-rule-faint">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`grid w-full grid-cols-[0.25rem_2rem_1fr_auto] items-baseline gap-x-4 py-4 text-left transition-colors ${COLS} ${open ? "bg-surface" : "hover:bg-surface-alt"
          }`}
      >
        {/* col 1 — identity bar */}
        <span
          aria-hidden
          className="h-6 w-[3px] self-center"
          style={{ background: color }}
        />

        {/* col 2 — glyph */}
        <span className="glyph text-xl" style={{ color }}>
          {bodyGlyph(body)}
        </span>

        {/* col 3 — body name (+ sign fallback on narrow) */}
        <span className="block">
          <span className="inscription text-[0.6875rem] text-bone">
            {body}
            {retrograde ? (
              <span className="datum ml-2 text-[0.625rem] text-ember" title="Retrograde">
                ℞
              </span>
            ) : null}
          </span>
          <span className="mt-1 block text-[1rem] leading-none font-light text-bone-soft md:hidden">
            <span className="glyph mr-1.5" style={{ color }}>
              {signGlyph(sign)}
            </span>
            {sign}
            <span className="datum ml-2 text-[0.625rem] text-bone-faint">
              {house}
            </span>
          </span>
        </span>

        {/* col 4 — sign */}
        <span className="hidden items-baseline gap-2 md:flex">
          <span className="glyph text-[1.0625rem]" style={{ color }}>
            {signGlyph(sign)}
          </span>
          <span className="text-[1.0625rem] leading-none font-light text-bone">
            {sign}
          </span>
        </span>

        {/* col 5 — archetype */}
        <span className="hidden md:block">
          {inSign ? (
            <span className="text-[0.875rem] leading-none font-light text-bone-soft">
              {inSign.meaning}
            </span>
          ) : null}
        </span>

        {/* col 6 — element */}
        <span className="hidden md:block">
          {sm ? (
            <span
              className="datum text-[0.625rem] tracking-[0.12em] uppercase"
              style={{ color: ELEMENT_COLOR[sm.element] }}
            >
              {sm.element}
            </span>
          ) : null}
        </span>

        {/* col 7 — degree */}
        <span className="datum text-[0.75rem] text-bone-soft md:text-right">
          {degree}
        </span>

        {/* col 8 — house */}
        <span
          className="datum hidden text-[0.75rem] text-bone-faint md:block"
          title={home?.name}
        >
          {house}
        </span>

        {/* col 9 — dignity */}
        <span className="hidden md:block">
          <DignityMark dignity={dignity} />
        </span>

        {/* col 10 — chevron */}
        <span className="hidden md:block md:text-right">
          <OpenMark open={open} />
        </span>
      </button>

      {open ? (
        <div className="pb-8">
          <Panel color={color}>
            <div>
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="glyph text-[1.5rem]" style={{ color }}>
                  {bodyGlyph(body)}
                </span>
                <span className="inscription text-[0.9375rem] text-bone">
                  {body} in {sign}
                </span>
                <span className="datum text-[0.6875rem] text-bone-faint">
                  {degree} · house {houseNumber ?? "—"}
                </span>
              </p>
              {inSign ? (
                <>
                  <p className="inscription mt-4 mb-3 text-[0.8125rem]" style={{ color }}>
                    {inSign.meaning}
                  </p>
                  <Prose>{inSign.shortDescription}</Prose>
                </>
              ) : null}
            </div>

            {info ? (
              <Block
                title={bodyRole(body) ?? "The Body"}
                aside={`${info.element} · ${info.orbitPeriod}`}
              >
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
                    <ListColumn label="Costs" items={inSign.challenges} tone="ember" />
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
              <Block
                title={`House ${houseNumber} — ${home.name}`}
                aside={home.element}
              >
                <p
                  className="inscription mb-3 text-[0.75rem]"
                  style={{ color: houseTypeStyle(home.element).color }}
                >
                  {inHouse.meaning}
                </p>
                <Prose>{inHouse.detailedDescription}</Prose>
                <div className="mt-6">
                  <Pair>
                    <ListColumn label="Opportunities" items={inHouse.opportunities} />
                    <ListColumn label="Difficulties" items={inHouse.challenges} tone="ember" />
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

/**
 * The Bodies table — the full list of planetary placements with expandable
 * readings. Extracted so it can be embedded anywhere a chart is in scope.
 */
export function BodiesTable({ placements }: { placements: Placement[] }) {
  const { open, toggle, register } = useOneOpen<string>();
  const bodies = placements.filter((p) => !p.isAngle);

  if (bodies.length === 0) {
    return (
      <p className="font-light text-bone-soft">
        No planetary positions stored for this chart.
      </p>
    );
  }

  return (
    <>
      {/* Column headers */}
      <div className={`mb-3 hidden gap-x-4 ${COLS} md:grid`}>
        <span />
        <span />
        <span className="eyebrow">Body</span>
        <span className="eyebrow">Sign</span>
        <span className="eyebrow">Archetype</span>
        <span className="eyebrow">Element</span>
        <span className="eyebrow md:text-right">Degree</span>
        <span className="eyebrow">House</span>
        <span className="eyebrow">Dignity</span>
        <span />
      </div>
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
    </>
  );
}
