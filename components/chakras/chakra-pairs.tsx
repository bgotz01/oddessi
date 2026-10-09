//components/chakras/chakra-pairs.tsx
"use client";

import { useState } from "react";
import { CHAKRAS } from "@/lib/chakras";
import {
  CHAKRA_CENTRE,
  CHAKRA_PAIRS,
  type ChakraPair,
} from "@/lib/chakra-pairs";

/** A pair by its index, the Heart, or nothing. */
type Focus = number | "heart" | null;

/**
 * The three pairs folded around the Heart.
 *
 * The spine runs left to right, root to crown, with the Heart at its middle.
 * Because each pair sits the same distance either side of it, the pairs draw
 * as three concentric arches over the Heart — outermost Root ↔ Crown,
 * innermost Solar Plexus ↔ Throat — each fading from one centre's colour
 * into its partner's, its two axes written inside it.
 *
 * Under the figure, the same three pairs and the Heart as cards, legible at
 * any width. Arches and cards share one focus: hover or click either and the
 * pair lifts while the rest recede.
 */
export default function ChakraPairs() {
  const [hover, setHover] = useState<Focus>(null);
  const [pinned, setPinned] = useState<Focus>(null);
  const focus = hover ?? pinned;
  const pin = (f: Exclude<Focus, null>) => setPinned(pinned === f ? null : f);

  return (
    <div>
      <p className="mb-8 max-w-2xl text-[1.0625rem] text-bone-soft">
        The seven fold around the Heart into three pairs, each the same
        distance from it. The lower centre of a pair and the upper one are the
        two ends of a single axis.
      </p>

      <Arches focus={focus} onHover={setHover} onPin={pin} />

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CHAKRA_PAIRS.map((p, i) => (
          <PairCard
            key={p.lower}
            pair={p}
            active={focus === i}
            dimmed={focus !== null && focus !== i}
            onHover={(on) => setHover(on ? i : null)}
            onPin={() => pin(i)}
          />
        ))}
        <HeartCard
          active={focus === "heart"}
          dimmed={focus !== null && focus !== "heart"}
          onHover={(on) => setHover(on ? "heart" : null)}
          onPin={() => pin("heart")}
        />
      </div>
    </div>
  );
}

const chakra = (n: number) => CHAKRAS[n - 1];

// Figure geometry, in viewBox units.
const W = 600;
const H = 336;
const BASE = 262; // the spine's height
const STEP = 80; // between neighbouring centres
const X0 = W / 2 - STEP * 3; // root
const x = (n: number) => X0 + (n - 1) * STEP;
const HEART_X = x(4);

function Arches({
  focus,
  onHover,
  onPin,
}: {
  focus: Focus;
  onHover: (f: Focus) => void;
  onPin: (f: Exclude<Focus, null>) => void;
}) {
  const inFocus = (n: number) => {
    if (focus === null) return true;
    if (focus === "heart") return n === 4;
    const p = CHAKRA_PAIRS[focus];
    return n === p.lower || n === p.upper;
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mx-auto block w-full max-w-3xl"
      role="img"
      aria-label="The three chakra pairs as arches folded around the Heart: Root and Crown, Sacral and Third Eye, Solar Plexus and Throat."
    >
      <defs>
        {CHAKRA_PAIRS.map((p) => (
          <linearGradient
            key={p.lower}
            id={`pair-${p.lower}`}
            gradientUnits="userSpaceOnUse"
            x1={x(p.lower)}
            x2={x(p.upper)}
            y1={0}
            y2={0}
          >
            <stop offset="0" stopColor={chakra(p.lower).hue} />
            <stop offset="1" stopColor={chakra(p.upper).hue} />
          </linearGradient>
        ))}
      </defs>

      {/* The spine. */}
      <line
        x1={x(1)}
        x2={x(7)}
        y1={BASE}
        y2={BASE}
        stroke="var(--color-rule)"
        strokeWidth={1}
      />

      {/* The arches, outermost first so the inner ones sit on top. */}
      {CHAKRA_PAIRS.map((p, i) => {
        const r = (4 - p.lower) * STEP;
        const on = focus === i;
        const dim = focus !== null && !on;
        const [primary, secondary] = p.axes;
        return (
          <g
            key={p.lower}
            className="cursor-pointer"
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onPin(i)}
            style={{ opacity: dim ? 0.22 : 1, transition: "opacity 200ms" }}
          >
            {/* A faint wash under the arch, then the arch itself. */}
            <path
              d={`M ${x(p.lower)} ${BASE} A ${r} ${r} 0 0 1 ${x(p.upper)} ${BASE} Z`}
              fill={`url(#pair-${p.lower})`}
              fillOpacity={on ? 0.07 : 0.025}
              style={{ transition: "fill-opacity 200ms" }}
            />
            <path
              d={`M ${x(p.lower)} ${BASE} A ${r} ${r} 0 0 1 ${x(p.upper)} ${BASE}`}
              fill="none"
              stroke={`url(#pair-${p.lower})`}
              strokeWidth={on ? 2.25 : 1.25}
              style={{ transition: "stroke-width 200ms" }}
            />
            {/* Its axes, inside the crown of the arch. */}
            <text
              x={HEART_X}
              y={BASE - r + 30}
              textAnchor="middle"
              fontSize={13.5}
              fill="var(--color-bone)"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {primary[0]}
              <tspan fill="var(--color-bone-faint)"> ↔ </tspan>
              {primary[1]}
            </text>
            <text
              x={HEART_X}
              y={BASE - r + 47}
              textAnchor="middle"
              fontSize={11}
              fontStyle="italic"
              fill="var(--color-bone-soft)"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {secondary[0]} ↔ {secondary[1]}
            </text>
          </g>
        );
      })}

      {/* The centres on the spine, the Heart larger. */}
      {CHAKRAS.map((c) => {
        const heart = c.number === 4;
        const on = inFocus(c.number);
        return (
          <g
            key={c.number}
            style={{ opacity: on ? 1 : 0.3, transition: "opacity 200ms" }}
            className={heart ? "cursor-pointer" : undefined}
            onMouseEnter={heart ? () => onHover("heart") : undefined}
            onMouseLeave={heart ? () => onHover(null) : undefined}
            onClick={heart ? () => onPin("heart") : undefined}
          >
            <circle
              cx={x(c.number)}
              cy={BASE}
              r={heart ? 15 : 9}
              fill={
                heart
                  ? `color-mix(in srgb, ${c.hue} 22%, var(--color-void))`
                  : "var(--color-void)"
              }
              stroke={c.hue}
              strokeWidth={heart ? 1.5 : 1.25}
            />
            <circle cx={x(c.number)} cy={BASE} r={heart ? 4 : 2.75} fill={c.hue} />
            <text
              x={x(c.number)}
              y={BASE + (heart ? 36 : 30)}
              textAnchor="middle"
              fontSize={9.5}
              letterSpacing={1.6}
              fill={heart ? c.hue : "var(--color-bone-soft)"}
              style={{ fontFamily: "var(--font-display)", textTransform: "uppercase" }}
            >
              {c.name}
            </text>
            {heart ? (
              <text
                x={x(4)}
                y={BASE + 54}
                textAnchor="middle"
                fontSize={11}
                fontStyle="italic"
                fill="var(--color-bone-soft)"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {CHAKRA_CENTRE.axes[0]} · {CHAKRA_CENTRE.axes[1]}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

function PairCard({
  pair,
  active,
  dimmed,
  onHover,
  onPin,
}: {
  pair: ChakraPair;
  active: boolean;
  dimmed: boolean;
  onHover: (on: boolean) => void;
  onPin: () => void;
}) {
  const lo = chakra(pair.lower);
  const up = chakra(pair.upper);
  const [primary, secondary] = pair.axes;

  return (
    <button
      type="button"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      onClick={onPin}
      aria-pressed={active}
      className="flex flex-col border bg-surface text-left transition-[opacity,border-color] duration-200"
      style={{
        opacity: dimmed ? 0.45 : 1,
        borderColor: active ? "var(--color-bone-faint)" : "var(--color-rule)",
      }}
    >
      <span
        aria-hidden
        className="block h-[2px] w-full"
        style={{ background: `linear-gradient(to right, ${lo.hue}, ${up.hue})` }}
      />
      <span className="flex flex-1 flex-col px-5 pt-4 pb-5">
        <span className="inscription text-[0.8125rem] tracking-[0.16em]">
          <span style={{ color: lo.hue }}>{lo.name}</span>
          <span className="text-bone-faint"> ↔ </span>
          <span style={{ color: up.hue }}>{up.name}</span>
        </span>
        <span className="mt-3 text-[1.1875rem] leading-snug text-bone">
          {primary[0]} <span className="text-bone-faint">↔</span> {primary[1]}
        </span>
        <span className="mt-1 text-[1rem] text-bone-soft italic">
          {secondary[0]} ↔ {secondary[1]}
        </span>
      </span>
    </button>
  );
}

function HeartCard({
  active,
  dimmed,
  onHover,
  onPin,
}: {
  active: boolean;
  dimmed: boolean;
  onHover: (on: boolean) => void;
  onPin: () => void;
}) {
  const heart = chakra(CHAKRA_CENTRE.number);
  return (
    <button
      type="button"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      onClick={onPin}
      aria-pressed={active}
      className="flex flex-col border text-left transition-[opacity,border-color] duration-200"
      style={{
        opacity: dimmed ? 0.45 : 1,
        borderColor: active ? "var(--color-bone-faint)" : "var(--color-rule)",
        background: `color-mix(in srgb, ${heart.hue} 6%, var(--color-surface))`,
      }}
    >
      <span aria-hidden className="block h-[2px] w-full" style={{ background: heart.hue }} />
      <span className="flex flex-1 flex-col px-5 pt-4 pb-5">
        <span
          className="inscription text-[0.8125rem] tracking-[0.16em]"
          style={{ color: heart.hue }}
        >
          {heart.name}
          <span className="text-bone-faint"> · the centre</span>
        </span>
        <span className="mt-3 text-[1.1875rem] leading-snug text-bone">
          {CHAKRA_CENTRE.axes[0]}
        </span>
        <span className="mt-1 text-[1rem] text-bone-soft italic">
          {CHAKRA_CENTRE.axes[1]}
        </span>
      </span>
    </button>
  );
}
