// components/framework/zodiac-grid.tsx

"use client";

import { useState } from "react";
import {
  ELEMENTS,
  ELEMENT_COLOR,
  MODALITIES,
  MODALITY_ORDER,
  SIGNS,
  SIGN_ORDER,
  axisOf,
  type ElementKey,
  type SignKey,
} from "@/lib/astrology/macro/zodiac-framework-data";
import { MODERN_RULER, TRADITIONAL_RULER } from "@/lib/rulership";

/**
 * The zodiac as its own structure: four elements by three modalities, each
 * sign appearing exactly once. Reading across a row keeps the element and
 * changes the operation (Aries starts fire, Leo holds it, Sagittarius spreads
 * it); reading down a column keeps the operation and changes the material.
 *
 * Every word on it comes from `SIGNS`, `ELEMENTS`, `MODALITIES` and the ruler
 * tables, so nothing here can disagree with the pages that use them.
 */

const ELEMENT_ORDER: ElementKey[] = ["fire", "earth", "air", "water"];

/** The one sign at an element × modality crossing. */
function signAt(element: ElementKey, modality: string): SignKey {
  return SIGN_ORDER.find(
    (k) => SIGNS[k].element === element && SIGNS[k].modality === modality,
  )!;
}

function SignDetail({ signKey }: { signKey: SignKey }) {
  const s = SIGNS[signKey];
  const color = ELEMENT_COLOR[s.element];
  const axis = axisOf(signKey);
  const opposite = SIGNS[axis.signs[1]];
  const modern = MODERN_RULER[s.label];
  const traditional = TRADITIONAL_RULER[s.label];

  return (
    <div className="mt-3 border-y border-rule-faint px-4 py-6">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="glyph text-[2rem] leading-none" style={{ color }} aria-hidden>
          {s.glyph}
        </span>
        <span className="inscription text-[1.25rem] tracking-[0.1em]" style={{ color }}>
          {s.label}
        </span>
        <span className="text-[1.0625rem] text-bone">{s.domain}</span>
        <span className="text-[0.9375rem] text-bone-faint">{s.keywords.join(" · ")}</span>
      </div>

      <dl className="mt-5 grid gap-x-8 gap-y-4 text-[0.9375rem] sm:grid-cols-3">
        <div>
          <dt className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
            Operation
          </dt>
          <dd className="mt-1 text-bone">
            <span className="capitalize">{s.modality}</span>{" "}
            <span className="capitalize">{s.element}</span>
            <span className="text-bone-soft"> — {s.expression.toLowerCase()}</span>
          </dd>
        </div>
        <div>
          <dt className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
            Ruler
          </dt>
          <dd className="mt-1 text-bone">
            {modern}
            {traditional !== modern ? (
              <span className="text-bone-soft"> · {traditional} traditionally</span>
            ) : null}
          </dd>
        </div>
        <div>
          <dt className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
            Opposite
          </dt>
          <dd className="mt-1 text-bone">
            {opposite.label}
            <span className="text-bone-soft">
              {" "}
              — {axis.tension[0]} ↔ {axis.tension[1]}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default function ZodiacGrid() {
  const [selected, setSelected] = useState<SignKey | null>(null);

  return (
    <div>
      <div className="grid grid-cols-[4.5rem_repeat(3,minmax(0,1fr))] gap-px border border-rule bg-rule sm:grid-cols-[8rem_repeat(3,minmax(0,1fr))]">
        {/* Header row */}
        <div className="bg-surface-alt" />
        {MODALITY_ORDER.map((m) => (
          <div key={m} className="bg-surface-alt px-3 py-3 sm:px-5">
            <span className="datum text-[0.625rem] tracking-[0.2em] text-bone uppercase">{m}</span>
            <span className="datum block text-[0.625rem] tracking-[0.2em] text-bone-faint uppercase sm:inline">
              <span className="hidden sm:inline"> · </span>
              {MODALITIES[m].principle}
            </span>
          </div>
        ))}

        {ELEMENT_ORDER.map((element) => {
          const color = ELEMENT_COLOR[element];
          return (
            <div key={element} className="contents">
              <div className="flex flex-col justify-center bg-surface-alt px-3 py-3 sm:px-5">
                <span
                  className="datum text-[0.625rem] tracking-[0.2em] uppercase"
                  style={{ color }}
                >
                  {element}
                </span>
                <span className="mt-1 hidden text-[0.875rem] text-bone-faint sm:block">
                  {ELEMENTS[element].theme}
                </span>
              </div>

              {MODALITY_ORDER.map((m) => {
                const key = signAt(element, m);
                const s = SIGNS[key];
                const active = selected === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelected((v) => (v === key ? null : key))}
                    aria-expanded={active}
                    className="flex flex-col items-start bg-surface px-3 py-4 text-left transition-colors hover:bg-surface-alt sm:px-5"
                    style={active ? { backgroundColor: `${color}1f` } : undefined}
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="glyph text-[1.125rem] leading-none" style={{ color }} aria-hidden>
                        {s.glyph}
                      </span>
                      <span className="datum text-[0.625rem] tracking-[0.16em] text-bone-faint uppercase">
                        {s.label}
                      </span>
                    </span>
                    <span className="mt-2 text-[1rem] leading-snug text-bone">{s.domain}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {selected ? <SignDetail signKey={selected} /> : null}
    </div>
  );
}
