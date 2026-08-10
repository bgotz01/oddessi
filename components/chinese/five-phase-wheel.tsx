"use client";

import { Explains } from "@/components/chinese/drawer";
import {
  CONTROLS,
  ELEMENTS,
  GENERATES,
  STEMS,
  type Element,
  type StemIndex,
} from "@/lib/chinese/almanac";
import { elementColor } from "@/lib/chinese/palette";
import { GOD_FAMILIES, type GodFamily } from "@/lib/chinese/ten-gods";

/**
 * 五行 as the diagram it has always been drawn as, with the Ten Gods laid over
 * it.
 *
 * The whole system is two rings on five points. Around the circle each phase
 * generates the next; across it, each controls the one two along — the star
 * inside the pentagon. Every relation in a chart is one of those five arrows
 * seen from where the Day Master stands, which is a sentence that takes a
 * paragraph to write and a second to see.
 *
 * So the labels are relative: put the Day Master's element at the top and the
 * other four name themselves — the one feeding it is Resource, the one it feeds
 * is Output, the one it controls is Wealth, the one controlling it is
 * Authority. Change the Day Master and the same drawing says something else,
 * which is exactly the lesson.
 */

const SIZE = 384;
const CENTRE = SIZE / 2;
const RADIUS = 116;
const NODE = 30;

/** Where each element sits, with the Day Master's own element at twelve. */
function ring(dayMasterElement: Element): Element[] {
  // The generating cycle in order, rotated so the self leads.
  const order: Element[] = [];
  let current = dayMasterElement;
  for (let i = 0; i < 5; i++) {
    order.push(current);
    current = GENERATES[current];
  }
  return order;
}

function point(index: number, radius = RADIUS) {
  const angle = (index * 72 - 90) * (Math.PI / 180);
  return {
    x: CENTRE + radius * Math.cos(angle),
    y: CENTRE + radius * Math.sin(angle),
  };
}

/** A line between two nodes, stopped short of both so it never touches them. */
function edge(from: number, to: number, gap = NODE + 6) {
  const a = point(from);
  const b = point(to);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  return {
    x1: a.x + ux * gap,
    y1: a.y + uy * gap,
    x2: b.x - ux * gap,
    y2: b.y - uy * gap,
    ux,
    uy,
  };
}

/** Arrowheads are drawn rather than markered, so each can take its own colour. */
function head(x: number, y: number, ux: number, uy: number, size = 7) {
  const px = -uy;
  const py = ux;
  return [
    `${x},${y}`,
    `${x - ux * size + px * size * 0.5},${y - uy * size + py * size * 0.5}`,
    `${x - ux * size - px * size * 0.5},${y - uy * size - py * size * 0.5}`,
  ].join(" ");
}

/** Which relation each position on the ring stands in to the Day Master. */
const RELATION_AT: (GodFamily | "Self")[] = [
  "Self",
  "Output",
  "Wealth",
  "Authority",
  "Resource",
];

export function FivePhaseWheel({
  dayMaster,
  shares,
}: {
  dayMaster: StemIndex;
  /** Optional — when given, each node reports how much of the chart it holds. */
  shares?: Partial<Record<GodFamily, number>>;
}) {
  const self = STEMS[dayMaster].element;
  const order = ring(self);

  return (
    <figure className="my-2">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto h-auto w-full max-w-[22rem]"
        role="img"
        aria-label={`The five phases arranged around ${STEMS[dayMaster].polarity} ${self}: each phase generates the next around the circle and controls the one opposite across it.`}
      >
        {/* Controlling — across the circle, the star. Dashed and quiet: it is
            the second reading, and drawn solid it fights the ring. */}
        {order.map((element, index) => {
          const target = (index + 2) % 5;
          const line = edge(index, target);
          return (
            <g key={`controls-${element}`}>
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={elementColor(element)}
                strokeWidth={1}
                strokeDasharray="3 4"
                opacity={0.45}
              />
              <polygon
                points={head(line.x2, line.y2, line.ux, line.uy, 6)}
                fill={elementColor(element)}
                opacity={0.45}
              />
            </g>
          );
        })}

        {/* Generating — around the circle. Solid, in the colour of the phase
            doing the feeding, so an arrow is read from its source. */}
        {order.map((element, index) => {
          const line = edge(index, (index + 1) % 5);
          return (
            <g key={`generates-${element}`}>
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={elementColor(element)}
                strokeWidth={1.5}
              />
              <polygon
                points={head(line.x2, line.y2, line.ux, line.uy)}
                fill={elementColor(element)}
              />
            </g>
          );
        })}

        {order.map((element, index) => {
          const at = point(index);
          const relation = RELATION_AT[index];
          const isSelf = relation === "Self";
          // The self node is also the Companion node — same element — so it
          // reports the Companion share rather than nothing.
          const share = shares?.[isSelf ? "Companion" : relation];
          // Shares sit radially outward, past the node: everything drawn
          // between the nodes lives *inside* the pentagon, so the outside is
          // the only place a label cannot collide with an arrow.
          const label = point(index, RADIUS + NODE + 10);
          // Anchored away from the wheel: a centred label on the left or right
          // node would sit back on top of the circle it belongs to.
          const away = (label.x - CENTRE) / RADIUS;
          const anchor =
            away > 0.3 ? "start" : away < -0.3 ? "end" : "middle";

          return (
            <g key={element}>
              <circle
                cx={at.x}
                cy={at.y}
                r={NODE}
                fill="var(--color-surface)"
                stroke={elementColor(element)}
                strokeWidth={isSelf ? 2 : 1}
              />
              <text
                x={at.x}
                y={at.y - 3}
                textAnchor="middle"
                className="datum"
                fontSize="10"
                letterSpacing="0.1em"
                fill={elementColor(element)}
              >
                {element.toUpperCase()}
              </text>
              <text
                x={at.x}
                y={at.y + 11}
                textAnchor="middle"
                className="datum"
                fontSize="8.5"
                letterSpacing="0.08em"
                fill={
                  isSelf ? "var(--color-patina)" : "var(--color-bone-faint)"
                }
              >
                {isSelf ? "SELF" : relation.toUpperCase()}
              </text>
              {share !== undefined ? (
                <text
                  x={label.x + (anchor === "start" ? 4 : anchor === "end" ? -4 : 0)}
                  y={label.y + 3}
                  textAnchor={anchor}
                  className="datum"
                  fontSize="9"
                  fill="var(--color-bone-faint)"
                >
                  {share}%
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      <figcaption className="datum mt-4 flex items-center justify-center gap-6 text-[0.625rem] tracking-[0.14em] text-bone-faint uppercase">
        <span className="flex items-center gap-2">
          <span aria-hidden className="inline-block h-px w-6 bg-bone-faint" />
          Generates
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-px w-6"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--color-bone-faint) 0 3px, transparent 3px 7px)",
            }}
          />
          Controls
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * The same five relations as a sentence apiece, for readers who would rather be
 * told than shown. Sits beside the wheel; between them the system is explained
 * twice in two registers, which is about right for the thing the whole chart
 * hangs on.
 */
export function RelationKey({ dayMaster }: { dayMaster: StemIndex }) {
  const self = STEMS[dayMaster].element;
  const rows: { family: GodFamily; element: Element; why: string }[] = [
    {
      family: "Resource",
      element: ELEMENTS.find((e) => GENERATES[e] === self)!,
      why: `generates ${self}`,
    },
    {
      family: "Output",
      element: GENERATES[self],
      why: `${self} generates it`,
    },
    {
      family: "Wealth",
      element: CONTROLS[self],
      why: `${self} controls it`,
    },
    {
      family: "Authority",
      element: ELEMENTS.find((e) => CONTROLS[e] === self)!,
      why: `controls ${self}`,
    },
    { family: "Companion", element: self, why: `the same as ${self}` },
  ];

  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.family}>
          <Explains
            subject={{ kind: "god", family: row.family }}
            label={row.family}
            className="block w-full border-b border-rule-faint px-2 pb-2.5"
          >
            <span className="flex items-baseline justify-between gap-4">
              <span
                className="datum text-[0.6875rem] tracking-[0.14em] uppercase"
                style={{ color: elementColor(row.element) }}
              >
                {row.element}
              </span>
              <span className="datum text-[0.6875rem] text-bone-soft">
                {row.family}
              </span>
            </span>
            <span className="datum mt-1 block text-[0.625rem] text-bone-faint">
              {row.why} · {GOD_FAMILIES[row.family].terms.join(", ")}
            </span>
          </Explains>
        </li>
      ))}
    </ul>
  );
}
