//components/western/houses/house-circuits.tsx
"use client";

import { useId, useMemo } from "react";
import type { Chart } from "@/lib/charts";
import {
  rulerGraph,
  type Circuit,
} from "@/lib/dominance";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import { readCircuit } from "@/lib/astrology/circuit-interpretations";
import { SelfRuledCard } from "@/components/western/houses/self-ruled";
import { AlsoConnected } from "@/components/western/houses/also-connected";
import { useScoring } from "@/components/scoring-context";
import { bodyGlyph } from "@/lib/symbols";

/**
 * Where the house rulers lead. Every house is run by the ruler of its cusp
 * sign, and that ruler sits in some house — so following the rulers always
 * ends in a loop: a circuit of two or more houses, or a house that rules
 * itself.
 *
 * Interpretation only. The graph behind it (cusps, ruler positions, what
 * drains into each loop) goes to the chat through the page context.
 */
export function HouseCircuits({ chart }: { chart: Chart }) {
  // Rulership is configurable, and the graph is made of rulers — reading it by
  // a different table than the rest of the page would put the views in conflict.
  const { config } = useScoring();
  const graph = useMemo(() => rulerGraph(chart, config), [chart, config]);
  if (graph.links.length === 0) return null;

  return (
    <div className="border-t border-rule">
      <p className="max-w-3xl py-4 text-[0.9375rem] font-light text-bone-soft">
        Every house has a planetary ruler. When that ruler occupies another
        house, it creates a connection between them. Sometimes these connections
        form closed circuits, linking two or more areas of life.
      </p>

      {graph.circuits.length ? (
        <div className="flex flex-col gap-6">
          {graph.circuits.map((circuit) => (
            <CircuitCard key={circuit.houses.join("-")} circuit={circuit} />
          ))}
        </div>
      ) : (
        <p className="text-[0.9375rem] font-light text-bone-faint">
          No circuits on this chart — no group of houses has rulers that lead
          back round to one another.
        </p>
      )}

      {graph.selfRuled.length ? (
        <>
          <p className="eyebrow mt-10 mb-4">Self-Ruled</p>
          <div className="grid gap-3 md:grid-cols-2">
            {graph.selfRuled.map((s) => (
              <SelfRuledCard
                key={s.link.house}
                self={s}
                links={graph.links}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function CircuitCard({ circuit }: { circuit: Circuit }) {
  const reading = readCircuit(circuit);
  return (
    <div className="grid items-center gap-8 border border-rule bg-surface px-6 py-8 md:px-8 lg:grid-cols-[minmax(0,45%)_minmax(0,1fr)]">
      {/* The circuit itself on the left; what it means on the right — from
          lg only, so tablets stack rather than squeeze the text. The column is
          a share of the card, so the text lines up from card to card whatever
          the diagram's shape. */}
      <div className="flex justify-center">
        <CircuitDiagram circuit={circuit} />
      </div>

      <div>
        <h3 className="text-[1.375rem] leading-snug font-light text-bone">
          {reading.theme}
        </h3>
        {circuit.signReception && (
          <span
            className="datum mt-3 inline-block border border-rule px-3 py-1 text-[0.5625rem] tracking-[0.2em] text-bone-soft uppercase"
            title="The two rulers also sit in each other's signs — mutual reception in the strict, classical sense."
          >
            + mutual reception
          </span>
        )}

        {/* The dynamic, one direction per line, each with its own ruler. */}
        <ul className="mt-5 space-y-5">
          {reading.dynamic.map((link, i) => (
            <li key={link.from}>
              <span className="datum flex items-center gap-2 text-[0.625rem] tracking-[0.14em] text-bone-faint uppercase">
                {link.from} → {link.to}
                <span className="glyph text-[0.875rem] text-bone-soft">
                  {bodyGlyph(link.ruler)}
                </span>
              </span>
              <p className="mt-1 text-[1.0625rem] leading-relaxed text-bone">
                {link.line}
              </p>
              {/* The evidence for the arrow: which sign picks the ruler, and
                  where that ruler actually is. */}
              <p className="datum mt-1 text-[0.625rem] tracking-[0.12em] text-bone-faint uppercase">
                {circuit.links[i].cuspSign} on the cusp · {link.ruler}{" "}
                {circuit.links[i].rulerDegree} {circuit.links[i].rulerSign}
              </p>
            </li>
          ))}
        </ul>

        {circuit.feeders.length ? (
          <div className="mt-6 border-t border-rule pt-4">
            <AlsoConnected houses={circuit.feeders} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * The loop drawn as a loop. Houses are the primary nodes; each arrow is a ruler, carried
 * from its house to the one it sits in. A pair faces left and right with one
 * arrow bowed over the top and one under; three make a triangle and four a
 * diamond, with straight sides.
 *
 * The viewBox is fitted to what is drawn, and the SVG renders at that size
 * (shrinking on narrow screens) rather than stretching to the card.
 */
const NODE = 38;

type Pt = { x: number; y: number };
const add = (a: Pt, b: Pt, k = 1): Pt => ({
  x: a.x + b.x * k,
  y: a.y + b.y * k,
});
const unit = (a: Pt, b: Pt): Pt => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
};
/** Rough width of a micro label: datum face plus its letter-spacing. */
const textWidth = (text: string, size: number) => text.length * size * 0.76;

function CircuitDiagram({ circuit }: { circuit: Circuit }) {
  // One marker per diagram — several cards share the page, and a repeated id
  // makes every `url(#…)` resolve to whichever came first.
  const markerId = `circuit-arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const n = circuit.houses.length;
  const radius = n === 2 ? 120 : n === 3 ? 122 : 132;
  // A pair faces left and right; anything longer starts at the top, so three
  // make a triangle on its base and four a diamond.
  const start = n === 2 ? Math.PI : -Math.PI / 2;
  // A pair's two arrows bow apart so they do not overlap; from three, the
  // sides of the polygon are straight.
  const curved = n === 2;
  const centre: Pt = { x: 0, y: 0 };

  const nodes = circuit.houses.map((house, i) => {
    const a = start + (2 * Math.PI * i) / n;
    const at: Pt = { x: radius * Math.cos(a), y: radius * Math.sin(a) };
    const lines = getHouseTitle(house as House)
      .toUpperCase()
      .split(/ (?=&)/);
    // Titles sit under the house — except at the top of the ring, where under
    // would be inside the loop, and at the left and right points of a
    // diamond, where the sides leave downward right beside it.
    const place: "above" | "below" | "beside" =
      at.y < -radius / 2
        ? "above"
        : n >= 4 && Math.abs(at.y) < 1
          ? "beside"
          : "below";
    return { house, at, lines, place };
  });

  const edges = circuit.houses.map((house, i) => {
    const p0 = nodes[i].at;
    const p1 = nodes[(i + 1) % n].at;
    const mid: Pt = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
    // Outward from the centre — for a pair, up for the first arrow and down
    // for the second, since their chord runs through the centre.
    const out: Pt = n === 2 ? { x: 0, y: i === 0 ? -1 : 1 } : unit(centre, mid);
    const control = curved ? add(mid, out, 92) : mid;
    const from = add(p0, unit(p0, control), NODE + 6);
    const to = add(p1, unit(p1, control), NODE + 10);
    // The line's midpoint, where the ruler sits.
    const label: Pt = {
      x: 0.25 * from.x + 0.5 * control.x + 0.25 * to.x,
      y: 0.25 * from.y + 0.5 * control.y + 0.25 * to.y,
    };
    const ruler = circuit.rulers[i];
    const name = ruler.toUpperCase();
    const anchor: "start" | "end" | "middle" =
      Math.abs(out.x) > 0.4 ? (out.x > 0 ? "start" : "end") : "middle";
    const namePt = add(label, out, 34);
    return {
      house,
      to: circuit.houses[(i + 1) % n],
      ruler,
      name,
      from,
      control,
      end: to,
      label,
      namePt,
      anchor,
    };
  });

  // Fit the viewBox to every node, label and ruler.
  const box = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
  const take = (x0: number, y0: number, x1: number, y1: number) => {
    box.x0 = Math.min(box.x0, x0);
    box.y0 = Math.min(box.y0, y0);
    box.x1 = Math.max(box.x1, x1);
    box.y1 = Math.max(box.y1, y1);
  };
  const LINE = 14;
  type Node = (typeof nodes)[number];
  const labelY = (node: Node, j: number) =>
    node.place === "above"
      ? node.at.y - NODE - 14 - (node.lines.length - 1 - j) * LINE
      : node.place === "beside"
        ? node.at.y + (j - (node.lines.length - 1) / 2) * LINE
        : node.at.y + NODE + 18 + j * LINE;
  const labelX = (node: Node) =>
    node.place === "beside"
      ? node.at.x + Math.sign(node.at.x) * (NODE + 12)
      : node.at.x;
  const labelAnchor = (node: Node): "start" | "end" | "middle" =>
    node.place === "beside" ? (node.at.x > 0 ? "start" : "end") : "middle";
  for (const node of nodes) {
    take(
      node.at.x - NODE,
      node.at.y - NODE,
      node.at.x + NODE,
      node.at.y + NODE,
    );
    node.lines.forEach((line, j) => {
      const w = textWidth(line, 9.5);
      const x = labelX(node);
      const anchor = labelAnchor(node);
      const x0 = anchor === "start" ? x : anchor === "end" ? x - w : x - w / 2;
      const y = labelY(node, j);
      take(x0, y - 7, x0 + w, y + 7);
    });
  }
  for (const e of edges) {
    take(e.label.x - 20, e.label.y - 20, e.label.x + 20, e.label.y + 20);
    const w = textWidth(e.name, 10);
    const x0 =
      e.anchor === "start"
        ? e.namePt.x
        : e.anchor === "end"
          ? e.namePt.x - w
          : e.namePt.x - w / 2;
    take(x0, e.namePt.y - 7, x0 + w, e.namePt.y + 7);
  }
  const pad = 10;
  const vb = {
    x: box.x0 - pad,
    y: box.y0 - pad,
    w: box.x1 - box.x0 + pad * 2,
    h: box.y1 - box.y0 + pad * 2,
  };

  return (
    <svg
      viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      className="mx-auto block h-auto max-w-full"
      style={{ width: vb.w }}
      role="img"
      aria-label={`Circuit: ${circuit.houses.join(" → ")} → ${circuit.houses[0]}`}
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="var(--color-bone-soft)" />
        </marker>
      </defs>

      {/* Arrows — each one a ruler, carried to the house it sits in. */}
      {edges.map((e) => (
        <g key={`edge-${e.house}`}>
          <title>{`${e.ruler}, ruler of house ${e.house}, sits in house ${e.to}`}</title>
          <path
            d={
              curved
                ? `M${e.from.x},${e.from.y} Q${e.control.x},${e.control.y} ${e.end.x},${e.end.y}`
                : `M${e.from.x},${e.from.y} L${e.end.x},${e.end.y}`
            }
            fill="none"
            stroke="var(--color-bone-soft)"
            strokeOpacity={0.7}
            strokeWidth={1.5}
            markerEnd={`url(#${markerId})`}
          />
          <circle
            cx={e.label.x}
            cy={e.label.y}
            r={19}
            fill="var(--color-surface)"
            stroke="var(--color-bone-faint)"
          />
          <text
            x={e.label.x}
            y={e.label.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="glyph"
            fontSize={19}
            fill="var(--color-bone)"
          >
            {bodyGlyph(e.ruler)}
          </text>
          <text
            x={e.namePt.x}
            y={e.namePt.y}
            textAnchor={e.anchor}
            dominantBaseline="central"
            className="datum"
            fontSize={10}
            letterSpacing="0.14em"
            fill="var(--color-bone-soft)"
          >
            {e.name}
          </text>
        </g>
      ))}

      {/* Houses — the focus, all drawn alike. How much each house weighs is
          the cards' question, not this section's. */}
      {nodes.map((node) => (
        <g key={`node-${node.house}`}>
          <circle
            cx={node.at.x}
            cy={node.at.y}
            r={NODE}
            fill="var(--color-surface-alt)"
            stroke="var(--color-patina)"
            strokeWidth={1.5}
          />
          <text
            x={node.at.x}
            y={node.at.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="inscription"
            fontSize={34}
            fill="var(--color-patina)"
          >
            {node.house}
          </text>
          {node.lines.map((line, j) => (
            <text
              key={line}
              x={labelX(node)}
              y={labelY(node, j)}
              textAnchor={labelAnchor(node)}
              dominantBaseline="central"
              className="datum"
              fontSize={9.5}
              letterSpacing="0.14em"
              fill="var(--color-bone-soft)"
            >
              {line}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}
