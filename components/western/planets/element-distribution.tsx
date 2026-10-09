"use client";

import { useState } from "react";
import type { Chart } from "@/lib/charts";
import { balance, type BalanceMode } from "@/lib/balance";
import { bodyGlyph, signMeta, ELEMENT_COLOR } from "@/lib/symbols";
import { SectionHeading } from "@/components/primitives";

const MODES: { id: BalanceMode; label: string; note: string }[] = [
  {
    id: "equal",
    label: "Equal",
    note: "The ten planets, one vote each.",
  },
  {
    id: "weighted",
    label: "Weighted",
    note:
      "The ten planets weighted by role — Sun and Moon 10; Mercury, Venus, Mars 8; Jupiter, Saturn 6; Uranus, Neptune, Pluto 4, because a whole generation shares them.",
  },
  {
    id: "points",
    label: "+ Asc & Nodes",
    note: "The ten planets plus the Ascendant and both nodes, one vote each.",
  },
];

/**
 * How the chart falls across Fire, Earth, Air and Water.
 *
 * The arithmetic is `balance()`, under whichever counting the toggle picks. A
 * stacked strip gives the whole at a glance; the rows beneath give each
 * element's share and the bodies that put it there, so the percentage never
 * has to be taken on trust.
 */
export function ElementDistribution({ chart }: { chart: Chart }) {
  const [mode, setMode] = useState<BalanceMode>("equal");
  const west = balance(chart, mode);
  const largest = Math.max(...west.elements.map((e) => e.share));
  const note = MODES.find((m) => m.id === mode)!.note;

  const bodiesIn = (element: string) =>
    west.counted.filter((c) => signMeta(c.sign)?.element === element);

  return (
    <>
      <SectionHeading
        aside={
          west.leadElements.length > 0
            ? `led by ${west.leadElements.join(" & ")}`
            : undefined
        }
      >
        Elements
      </SectionHeading>

      <div className="mb-6 inline-grid grid-cols-3 gap-px border border-rule bg-rule">
        {MODES.map((m) => {
          const active = m.id === mode;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              aria-pressed={active}
              className={`datum px-4 py-2 text-[0.625rem] tracking-[0.14em] uppercase transition-colors ${
                active
                  ? "bg-surface-alt text-patina"
                  : "bg-void text-bone-soft hover:bg-surface"
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      <div className="mb-8 flex h-2 w-full overflow-hidden bg-rule-faint">
        {west.elements.map((e) =>
          e.share > 0 ? (
            <span
              key={e.key}
              title={`${e.key} ${e.share}%`}
              className="block h-full"
              style={{ width: `${e.share}%`, backgroundColor: ELEMENT_COLOR[e.key] }}
            />
          ) : null,
        )}
      </div>

      {west.elements.map((e) => {
        const color = ELEMENT_COLOR[e.key];
        const absent = e.weight === 0;
        const bodies = bodiesIn(e.key);
        return (
          <div key={e.key} className="flex w-full items-center gap-4 py-2">
            <span
              className="datum w-16 text-[0.6875rem] tracking-[0.14em] uppercase"
              style={{ color }}
            >
              {e.key}
            </span>
            <span className="h-[3px] flex-1 bg-rule-faint">
              <span
                className="block h-full"
                style={{
                  width: `${largest > 0 ? (e.share / largest) * 100 : 0}%`,
                  backgroundColor: color,
                }}
              />
            </span>
            <span
              className="datum w-12 text-right text-[0.6875rem]"
              style={{ color: absent ? undefined : color }}
            >
              {absent ? "—" : `${e.share}%`}
            </span>
            <span className="glyph flex w-28 justify-end gap-1.5 text-[0.875rem] text-bone-soft sm:w-44">
              {bodies.map((b) => (
                <span
                  key={b.body}
                  title={`${b.body} in ${b.sign}${mode === "weighted" ? ` · ${b.weight}` : ""}`}
                >
                  {bodyGlyph(b.body)}
                </span>
              ))}
            </span>
          </div>
        );
      })}

      <p className="datum mt-4 text-[0.6875rem] leading-relaxed text-bone-faint">
        {note}
        {west.missingElements.length > 0
          ? ` No ${west.missingElements.join(" or ")} at all.`
          : ""}
      </p>
    </>
  );
}
