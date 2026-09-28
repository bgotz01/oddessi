"use client";

import { Block, Bullets, ListColumn, Pair, Panel } from "@/components/study-panel";
import { getHouseCategory, type House } from "@/lib/astrology/house-categories";
import { BODY_IN_A_HOUSE, SIGN_MANNER } from "@/lib/house-reading";
import type { HouseCusp, Placement } from "@/lib/charts";
import type { HouseDominance } from "@/lib/dominance";
import { easeLabel, type HouseEase } from "@/lib/ease";
import { useScoring } from "@/components/scoring-context";
import { bodyInHouse } from "@/lib/interpretation";
import { bodyGlyph, signGlyph } from "@/lib/symbols";

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

export default function HouseReading({
  cusp,
  tenants,
  dominance,
  scores,
  ease,
  onExplainWeight,
}: {
  cusp: HouseCusp;
  tenants: Placement[];
  dominance: HouseDominance | undefined;
  /** Every house's score, for the spread under the weight block. */
  scores?: number[];
  /** The second axis. Optional so the panel still renders without it. */
  ease?: HouseEase;
  onExplainWeight?: () => void;
}) {
  const house = getHouseCategory(cusp.number as House);
  const manner = SIGN_MANNER[cusp.sign];

  return (
    <Panel>
      <div>
        <p className="mb-3 text-[1.1875rem] leading-relaxed text-patina italic">
          {house.essence}
        </p>
        <Bullets items={house.coreThemes} />
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
