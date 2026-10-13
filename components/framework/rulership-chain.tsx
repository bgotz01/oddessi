// components/framework/rulership-chain.tsx

"use client";

import { useState } from "react";
import { HOUSE_CATEGORIES, type House } from "@/lib/astrology/house-categories";
import { signByLabel } from "@/lib/astrology/macro/zodiac-framework-data";
import { SIGN_MANNER } from "@/lib/house-reading";
import { BODY, PRINCIPLES } from "@/lib/bodies";
import {
  MODERN_RULER,
  SIGNS,
  TRADITIONAL_RULER,
  rulerOfSign,
  type Rulership,
} from "@/lib/rulership";
import { rulerLine, selfRuledLine } from "@/lib/astrology/circuit-interpretations";

/**
 * The four layers that connect a chart: a house (where), the sign on its cusp
 * (how), that sign's ruler (which planet answers for it), and the house the
 * ruler sits in (where the area leads). Three choices, everything else
 * derived — the same derivation the Houses page runs on a real chart, and the
 * same sentence its circuits print.
 */

const HOUSES = Array.from({ length: 12 }, (_, i) => i + 1);
const ordinal = (n: number) =>
  `${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}`;

function Picker({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="datum border border-rule bg-surface px-2 py-1 text-[0.75rem] text-bone"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Layer({
  step,
  role,
  children,
}: {
  step: string;
  role: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-surface px-4 pt-4 pb-5">
      <span className="datum text-[0.5625rem] tracking-[0.2em] text-bone-faint uppercase">
        {step}
      </span>
      <div className="mt-3 flex-1">{children}</div>
      <span className="mt-4 border-t border-rule-faint pt-3 text-[0.8125rem] text-bone-faint italic">
        {role}
      </span>
    </div>
  );
}

export default function RulershipChain() {
  const [house, setHouse] = useState(7);
  const [sign, setSign] = useState("Capricorn");
  const [rulerHouse, setRulerHouse] = useState(5);
  const [rulership, setRulership] = useState<Rulership>("modern");

  const h = HOUSE_CATEGORIES[house as House];
  const to = HOUSE_CATEGORIES[rulerHouse as House];
  const s = signByLabel(sign)!;
  const ruler = rulerOfSign(sign, rulership);
  const other = rulership === "modern" ? TRADITIONAL_RULER[sign] : MODERN_RULER[sign];
  const r = BODY[ruler];
  const p = PRINCIPLES[ruler];

  const houseOptions = HOUSES.map((n) => ({
    value: String(n),
    label: `${ordinal(n)} — ${HOUSE_CATEGORIES[n as House].title}`,
  }));

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Picker label="House" value={String(house)} options={houseOptions} onChange={(v) => setHouse(Number(v))} />
        <Picker
          label="Cusp"
          value={sign}
          options={SIGNS.map((x) => ({ value: x, label: x }))}
          onChange={setSign}
        />
        <Picker
          label="Ruler in"
          value={String(rulerHouse)}
          options={houseOptions}
          onChange={(v) => setRulerHouse(Number(v))}
        />
        <div role="radiogroup" aria-label="Rulership" className="flex gap-2">
          {(["modern", "traditional"] as Rulership[]).map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={rulership === k}
              onClick={() => setRulership(k)}
              className={`datum border px-3 py-1.5 text-[0.625rem] tracking-[0.18em] uppercase transition-colors ${
                rulership === k
                  ? "border-patina-dim text-patina"
                  : "border-rule text-bone-faint hover:text-bone-soft"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        <Layer step="1 · House" role="The area of life">
          <p className="inscription text-[1.5rem] leading-none text-bone">{house}</p>
          <p className="mt-2 text-[1rem] text-bone">{h.title}</p>
        </Layer>

        <Layer step="2 · Cusp sign" role="How that area is approached">
          <p className="flex items-baseline gap-2">
            <span className="glyph text-[1.25rem] text-patina" aria-hidden>
              {s.glyph}
            </span>
            <span className="text-[1rem] text-bone">{sign}</span>
            <span className="text-[0.9375rem] text-bone-soft italic">{s.domain}</span>
          </p>
          <p className="mt-2 text-[0.9375rem] leading-snug text-bone-soft">
            {SIGN_MANNER[sign]?.manner[0]}
          </p>
        </Layer>

        <Layer step="3 · House ruler" role="The planet answering for it">
          <p className="flex items-baseline gap-2">
            <span className="glyph text-[1.25rem]" style={{ color: r.color }} aria-hidden>
              {r.glyph}
            </span>
            <span className="text-[1rem]" style={{ color: r.color }}>
              {ruler}
            </span>
          </p>
          <p className="mt-2 text-[0.9375rem] text-bone-soft">
            {p.principle} — <span className="italic">{p.function.toLowerCase()}</span>
          </p>
        </Layer>

        <Layer step="4 · Ruler placement" role="Where the area connects">
          <p className="inscription text-[1.5rem] leading-none text-bone">{rulerHouse}</p>
          <p className="mt-2 text-[1rem] text-bone">{to.title}</p>
        </Layer>
      </div>

      <p className="mt-5 max-w-3xl text-[1.0625rem] leading-relaxed text-bone">
        {h.title} ({ordinal(house)}) is approached through {sign}&rsquo;s{" "}
        {s.domain.toLowerCase()}.{" "}
        <span className="text-patina italic">
          {rulerHouse === house ? selfRuledLine(house, ruler) : rulerLine(house, rulerHouse, ruler)}
        </span>
      </p>
      {other !== ruler ? (
        <p className="mt-2 max-w-3xl text-[0.875rem] text-bone-faint">
          {sign} has a second ruler:{" "}
          {other} under {rulership === "modern" ? "traditional" : "modern"} rulership. Switching
          changes which planet carries the {ordinal(house)} house — and so where it leads.
        </p>
      ) : null}
    </div>
  );
}
