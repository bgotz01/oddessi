"use client";

import { useState } from "react";
import { Block, Bullets, ListColumn, OpenMark, Pair, Panel } from "@/components/study-panel";
import { getHouseCategory, getHouseTitle, type House } from "@/lib/astrology/house-categories";
import { BODY_IN_A_HOUSE, SIGN_MANNER } from "@/lib/house-reading";
import { signByLabel } from "@/lib/astrology/macro/zodiac-framework-data";
import type { Aspect, HouseCusp, Placement } from "@/lib/charts";
import { copyText } from "@/lib/clipboard";
import type { HouseDominance } from "@/lib/dominance";
import { easeLabel, type HouseEase } from "@/lib/ease";
import { useScoring } from "@/components/scoring-context";
import { bodyInHouse, houseInfo } from "@/lib/interpretation";
import { bodyGlyph, signGlyph } from "@/lib/symbols";
import { HouseTags, ThemeColumn } from "@/components/western/houses/meaning-label";
import { houseTypeStyle } from "@/lib/house-types";

/**
 * The full reading for one house: what the house is, what it weighs, the sign
 * on its cusp, and who is standing in it.
 *
 * There are two ways into this on the houses page — the accordion row in "The
 * Twelve" and the drawer that a grid card opens — and they were carrying two
 * copies of the same markup, which is how the drawer ended up with the mode
 * note and the accordion without it. One panel, two frames.
 */

/**
 * All twelve scores on one axis, with this house marked.
 *
 * "Rank 10 of 12" reads as a verdict, but the ranks in the middle of a chart
 * are routinely separated by less than a point — an ordinal printed over a
 * continuous score invents a precision the arithmetic does not have. Plotting
 * the whole set shows the clusters, so a house in the pack looks like what it
 * is instead of looking beaten.
 */
function WeightScale({
  score,
  scores,
}: {
  score: number;
  scores: number[];
}) {
  const low = Math.min(...scores);
  const high = Math.max(...scores);
  const span = high - low || 1;
  const at = (n: number) => ((n - low) / span) * 100;

  const sorted = [...scores].sort((a, b) => b - a);
  const above = sorted.filter((s) => s > score).pop();
  const gap = above === undefined ? null : round1(above - score);

  return (
    <div className="mt-4">
      <div className="relative h-6 border-b border-rule">
        {scores.map((s, i) => (
          <span
            key={i}
            aria-hidden
            className={`absolute bottom-0 w-px ${s === score ? "h-6 bg-ember" : "h-2.5 bg-rule"
              }`}
            style={{ left: `${at(s)}%` }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex items-baseline justify-between">
        <span className="datum text-[0.5625rem] text-bone-faint">
          {low.toFixed(1)}
        </span>
        <span className="datum text-[0.5625rem] tracking-[0.06em] text-bone-faint">
          {gap === null
            ? "highest in the chart"
            : `${gap.toFixed(1)} behind the house above it`}
        </span>
        <span className="datum text-[0.5625rem] text-bone-faint">
          {high.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Weight, broken into the three components that produced it. */
function WeightBlock({
  dominance,
  scores,
  onExplain,
}: {
  dominance: HouseDominance;
  /** Every house's score, so the rank can be shown against its spread. */
  scores?: number[];
  /** Opens the calculation modal. Omitted where there is nothing to open. */
  onExplain?: () => void;
}) {
  const summary = `rank ${dominance.rank} of 12 · ${dominance.score.toFixed(1)}`;

  return (
    <Block
      title="Weight"
      aside={
        onExplain ? (
          <button
            type="button"
            onClick={onExplain}
            title="How weight is calculated"
            className="datum text-[0.625rem] text-bone-faint transition-colors hover:text-patina"
          >
            {summary} <span aria-hidden>?</span>
          </button>
        ) : (
          summary
        )
      }
    >
      <div className="grid gap-px bg-rule sm:grid-cols-3">
        {(
          [
            ["Occupancy", dominance.occupancy],
            ["Ruler strength", dominance.rulerStrength],
            ["Ruler activity", dominance.rulerActivity],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="bg-void px-4 py-3">
            <p className="eyebrow">{label}</p>
            <p className="datum mt-1 text-[0.9375rem] text-bone">
              {value.toFixed(1)}
            </p>
          </div>
        ))}
      </div>

      {scores && scores.length > 1 ? (
        <WeightScale score={dominance.score} scores={scores} />
      ) : null}

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
  );
}

/**
 * Ease, on a diverging scale so the direction is legible before the number is.
 *
 * Weight's own scale is a ranking; this one is not, because ease has a true
 * zero. A house sitting on the centre line is balanced, not average.
 */
function EaseBlock({ ease }: { ease: HouseEase }) {
  const EASE_BAND = useScoring().config.ease.band;
  const domain = 0.6;
  const clamped = Math.max(-domain, Math.min(domain, ease.ease));
  const half = (Math.abs(clamped) / domain) * 50;

  const colour =
    ease.band === "flowing"
      ? "bg-patina"
      : ease.band === "grinding"
        ? "bg-ember"
        : "bg-rule";

  return (
    <Block title="Ease" aside={`${ease.band} · ${easeLabel(ease.ease)}`}>
      {ease.band === "sparse" ? (
        <Bullets
          items={[
            "Too few contacts to call either way",
            "A fact about the chart, not a verdict on the house",
          ]}
        />
      ) : (
        <>
          <div className="relative h-7 border-b border-rule">
            {/* Band edges, matching the matrix. */}
            {[EASE_BAND, -EASE_BAND].map((t) => (
              <span
                key={t}
                aria-hidden
                className="absolute top-0 bottom-0 border-l border-dashed border-rule"
                style={{ left: `${50 + (t / domain) * 50}%` }}
              />
            ))}
            <span
              aria-hidden
              className="absolute top-0 bottom-0 left-1/2 border-l border-rule-faint"
            />
            <span
              aria-hidden
              className={`absolute bottom-0 h-4 ${colour}`}
              style={{
                left: clamped >= 0 ? "50%" : `${50 - half}%`,
                width: `${half}%`,
              }}
            />
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="datum text-[0.5625rem] tracking-[0.14em] text-ember uppercase">
              Grind
            </span>
            <span className="datum text-[0.625rem] text-bone-soft">
              {ease.soft} easy / {ease.hard} hard
            </span>
            <span className="datum text-[0.5625rem] tracking-[0.14em] text-patina uppercase">
              Flow
            </span>
          </div>

          {/* All three, and they sum to the score above — tenancy was missing
              here, left over from when the model had only two components. */}
          <div className="mt-4 grid gap-px bg-rule sm:grid-cols-3">
            {(
              [
                ["From aspects", ease.fromAspects],
                ["From dignity", ease.fromDignity],
                ["From tenancy", ease.fromTenancy],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="bg-void px-4 py-3">
                <p className="eyebrow">{label}</p>
                <p className="datum mt-1 text-[0.9375rem] text-bone">
                  {easeLabel(value)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {ease.notes.length > 0 ? (
        <div className="mt-4">
          <ListColumn label="Reading" items={ease.notes} />
        </div>
      ) : null}

      <p className="datum mt-4 text-[0.625rem] text-bone-faint">
        Read from {ease.constituents.join(", ") || "nothing in this house"}.
      </p>
    </Block>
  );
}

/** One tenant with its interpretation. */
function Tenant({ placement, house }: { placement: Placement; house: number }) {
  // The vendored table supplies only the 2–4 word label; the body is ours.
  const inHouse = bodyInHouse(placement.body, house);
  const brings = BODY_IN_A_HOUSE[placement.body];

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="glyph text-lg text-patina">
          {bodyGlyph(placement.body)}
        </span>
        <span className="inscription text-[0.6875rem] text-bone">
          {placement.body}
        </span>
        <span className="glyph text-bone-faint">{signGlyph(placement.sign)}</span>
        <span className="text-[0.9375rem] font-light text-bone-soft italic">
          {placement.sign}
        </span>
        <span className="datum text-[0.6875rem] text-bone-faint">
          {placement.degree}
        </span>
        {placement.retrograde ? (
          <span className="datum text-[0.625rem] text-ember">℞</span>
        ) : null}
      </div>

      {brings ? (
        <div className="border-l border-rule pl-4">
          {inHouse ? (
            <p className="inscription mb-2 text-[0.6875rem] text-patina-dim">
              {inHouse.meaning}
            </p>
          ) : null}
          <Bullets items={brings} />
        </div>
      ) : null}
    </div>
  );
}

/** One placement as a copyable line. */
function placementLine(p: Placement): string {
  return `${p.body}: ${p.sign} ${p.degree}${p.retrograde ? " ℞" : ""}${
    p.houseNumber ? ` (house ${p.houseNumber})` : ""
  }`;
}

/**
 * The house's essentials as plain lines: the cusp, its ruler and where it
 * landed, and the tenants. Text first so it can be pasted into a chat or a
 * note without reformatting.
 */
function housePlacementLines(
  cusp: HouseCusp,
  tenants: Placement[],
  dominance: HouseDominance | undefined,
): string[] {
  const lines = [`Cusp: ${cusp.sign} ${cusp.degree}`];

  if (dominance) {
    lines.push(
      dominance.rulerPlacement
        ? `Ruler: ${placementLine(dominance.rulerPlacement)}`
        : `Ruler: ${dominance.ruler} (not in this chart)`,
    );
  }

  lines.push(
    ...(tenants.length === 0
      ? ["Tenants: none"]
      : tenants.map((t) => `Tenant — ${placementLine(t)}`)),
  );

  return lines;
}

/** Every aspect made by a tenant or by the house's ruler, tightest first. */
function houseAspectLines(
  tenants: Placement[],
  dominance: HouseDominance | undefined,
  aspects: Aspect[],
): string[] {
  const involved = new Set(tenants.map((t) => t.body));
  if (dominance?.rulerPlacement) involved.add(dominance.ruler);
  return aspects
    .filter((a) => involved.has(a.planet1) || involved.has(a.planet2))
    .sort((a, b) => a.orb - b.orb)
    .map(
      (a) =>
        `${a.planet1} ${a.type.toLowerCase()} ${a.planet2} (orb ${a.orb.toFixed(1)}°)`,
    );
}

/** Copies `text()` on click and says so for two seconds. */
function CopyButton({ label, text }: { label: string; text: () => string }) {
  const [copied, setCopied] = useState(false);

  const copy = () =>
    copyText(text(), () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="datum flex items-center gap-1 text-[0.625rem] tracking-[0.12em] text-bone-faint uppercase transition-colors hover:text-bone"
    >
      {copied ? (
        "Copied ✓"
      ) : (
        <>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <rect x="3.5" y="3.5" width="6" height="6" rx="0.75" stroke="currentColor" strokeWidth="1" />
            <path d="M2.5 7.5H1.5a.75.75 0 0 1-.75-.75v-6A.75.75 0 0 1 1.5 0h6a.75.75 0 0 1 .75.75v1" stroke="currentColor" strokeWidth="1" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function Lines({ lines }: { lines: string[] }) {
  return (
    <ul className="space-y-1">
      {lines.map((line) => (
        <li key={line} className="datum text-[0.75rem] text-bone-soft">
          {line}
        </li>
      ))}
    </ul>
  );
}

/**
 * The house's placements, copyable. The aspects those placements make sit
 * underneath, closed by default — they run long once the ruler is counted, and
 * the cusp, ruler and tenants are what you usually want.
 */
function PlacementsBlock({
  cusp,
  tenants,
  dominance,
  aspects,
}: {
  cusp: HouseCusp;
  tenants: Placement[];
  dominance: HouseDominance | undefined;
  aspects: Aspect[];
}) {
  const [aspectsOpen, setAspectsOpen] = useState(false);
  const lines = housePlacementLines(cusp, tenants, dominance);
  const aspectLines = houseAspectLines(tenants, dominance, aspects);
  const title = `House ${cusp.number} — ${getHouseTitle(cusp.number as House)}`;

  return (
    <>
      <Block
        title="Placements"
        aside={
          <CopyButton
            label="Copy placements"
            text={() => `${title}\n\n${lines.join("\n")}`}
          />
        }
      >
        <Lines lines={lines} />
      </Block>

      {aspectLines.length > 0 ? (
        <section>
          <div className="mb-3 flex items-baseline justify-between gap-6 border-b border-rule-faint pb-2">
            <button
              type="button"
              onClick={() => setAspectsOpen((v) => !v)}
              aria-expanded={aspectsOpen}
              className="group flex items-baseline gap-1.5 text-left"
            >
              <h4 className="eyebrow transition-colors group-hover:text-bone-soft">
                Aspects
              </h4>
              <OpenMark open={aspectsOpen} />
            </button>
            {aspectsOpen ? (
              <CopyButton
                label="Copy aspects"
                text={() => `${title} — aspects\n\n${aspectLines.join("\n")}`}
              />
            ) : (
              <span className="datum text-[0.625rem] text-bone-faint">
                {aspectLines.length}
              </span>
            )}
          </div>
          {aspectsOpen ? <Lines lines={aspectLines} /> : null}
        </section>
      ) : null}
    </>
  );
}

export default function HouseReading({
  cusp,
  tenants,
  dominance,
  scores,
  ease,
  aspects,
  onExplainWeight,
}: {
  cusp: HouseCusp;
  tenants: Placement[];
  dominance: HouseDominance | undefined;
  /** Every house's score, for the spread under the weight block. */
  scores?: number[];
  /** The second axis. Optional so the panel still renders without it. */
  ease?: HouseEase;
  /** The chart's aspects. When given, a copyable Placements block opens the panel. */
  aspects?: Aspect[];
  onExplainWeight?: () => void;
}) {
  const house = getHouseCategory(cusp.number as House);
  const manner = SIGN_MANNER[cusp.sign];
  const sign = signByLabel(cusp.sign);

  return (
    <Panel>
      {aspects ? (
        <PlacementsBlock
          cusp={cusp}
          tenants={tenants}
          dominance={dominance}
          aspects={aspects}
        />
      ) : null}

      <div>
        <p className="mb-3 text-[1.1875rem] leading-relaxed text-patina italic">
          {house.essence}
        </p>
        {/* The keywords span both sides; the core themes beneath are split
            like the wall's cards — the house in the world, and inwardly. */}
        <HouseTags
          tags={house.keywords}
          color={houseTypeStyle(houseInfo(cusp.number)?.element).color}
        />
        <div className="mt-6">
          <Pair>
            <ThemeColumn label="External" items={house.coreThemes.external} tone="patina" />
            <ThemeColumn label="Internal" items={house.coreThemes.internal} tone="ember" />
          </Pair>
        </div>
      </div>

      {dominance ? (
        <WeightBlock
          dominance={dominance}
          scores={scores}
          onExplain={onExplainWeight}
        />
      ) : null}

      {ease ? <EaseBlock ease={ease} /> : null}

      {manner ? (
        <Block
          title={`${cusp.sign} on the cusp`}
          aside={`${cusp.degree} ${cusp.sign}`}
        >
          {sign ? (
            <p className="mb-4 text-[1.0625rem] text-patina italic">
              {sign.domain}
              <span className="text-bone-faint not-italic"> — {sign.keywords.join(", ")}</span>
            </p>
          ) : null}
          <Bullets items={manner.manner} />
          <div className="mt-6">
            <Pair>
              <ListColumn label="Gives" items={manner.gives} />
              <ListColumn label="Costs" items={manner.costs} tone="ember" />
            </Pair>
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
          <Bullets
            items={[
              "Empty — the ordinary case, with more houses than bodies",
              "Run by the cusp sign and wherever its ruler landed",
            ]}
          />
        ) : (
          <div className="space-y-8">
            {tenants.map((t) => (
              <Tenant key={t.body} placement={t} house={cusp.number} />
            ))}
          </div>
        )}
      </Block>
    </Panel>
  );
}
