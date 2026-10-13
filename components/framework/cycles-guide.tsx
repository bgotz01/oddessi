// components/framework/cycles-guide.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BODY_PERIODS,
  CYCLE_PHASES,
  PHASE_PLANETS,
  TIMING_TECHNIQUES,
  phaseAge,
  type BuildStatus,
} from "@/lib/astrology/cycle-guide";
import { BODY } from "@/lib/bodies";

/**
 * Time in three parts — the techniques that say when (each marked by whether
 * charts here compute it), the phases every cycle passes through with the
 * ages they fall at, and how fast each body moves — each its own export so
 * the Framework page can tab between them.
 */

const STATUS: Record<BuildStatus, { label: string; tone: string }> = {
  computed: { label: "Computed here", tone: "text-patina" },
  partial: { label: "Partly", tone: "text-bone-soft" },
  "not-built": { label: "Not built", tone: "text-bone-faint" },
};

/** The cycle as a circle: start at the top, phases clockwise. */
function PhaseWheel({ color }: { color: string }) {
  const size = 200;
  const c = size / 2;
  const r = 72;
  const xy = (deg: number, rr = r) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [c + rr * Math.cos(a), c + rr * Math.sin(a)] as const;
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0" aria-hidden>
      <circle cx={c} cy={c} r={r} fill="none" stroke="currentColor" className="text-rule" />
      {/* Waxing half, start to opposition, drawn brighter. */}
      <path
        d={`M ${c} ${c - r} A ${r} ${r} 0 0 1 ${c} ${c + r}`}
        fill="none"
        stroke={color}
        strokeOpacity={0.6}
        strokeWidth={2}
      />
      <line x1={c} y1={c - r} x2={c} y2={c + r} stroke="currentColor" className="text-rule-faint" />
      <line x1={c - r} y1={c} x2={c + r} y2={c} stroke="currentColor" className="text-rule-faint" />
      {CYCLE_PHASES.slice(0, 4).map((p) => {
        const [x, y] = xy(p.angle);
        const [lx, ly] = xy(p.angle, r + 16);
        return (
          <g key={p.angle}>
            <circle cx={x} cy={y} r={5} fill={color} />
            <text
              x={lx}
              y={ly + 3}
              textAnchor={p.angle === 90 ? "start" : p.angle === 270 ? "end" : "middle"}
              className="fill-bone-faint"
              style={{ fontSize: 9, letterSpacing: "0.12em" }}
            >
              {p.angle}°
            </text>
          </g>
        );
      })}
      <circle cx={c} cy={c} r={4} fill="currentColor" className="text-bone-faint" />
    </svg>
  );
}

/** Each timing technique, marked by whether charts here compute it. */
export function TimingTechniques() {
  return (
    <div>
      <div className="border-y border-rule">
        {TIMING_TECHNIQUES.map((t) => {
          const st = STATUS[t.status];
          return (
            <div
              key={t.name}
              className="grid gap-x-6 gap-y-1 border-b border-rule-faint px-2 py-4 last:border-b-0 sm:grid-cols-[12rem_minmax(0,1fr)_9rem] sm:px-4"
            >
              <div>
                <p className="text-[1rem] text-bone">{t.name}</p>
                <p className="text-[0.875rem] text-bone-soft italic">{t.explains}</p>
              </div>
              <p className="text-[0.9375rem] leading-snug text-bone-soft">{t.method}</p>
              <p className="datum text-[0.625rem] tracking-[0.18em] uppercase sm:text-right">
                <span className={st.tone}>{st.label}</span>
                {t.where ? (
                  <Link
                    href={t.where.href}
                    className="mt-1 block text-bone-faint transition-colors hover:text-patina"
                  >
                    → {t.where.label}
                  </Link>
                ) : null}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** The five phases on one wheel, with the ages they fall at for a chosen planet. */
export function CycleShape() {
  const [planet, setPlanet] = useState<(typeof PHASE_PLANETS)[number]>("Saturn");
  const color = BODY[planet].color;

  return (
    <div>
      <div role="radiogroup" aria-label="Planet" className="mb-6 flex flex-wrap gap-2">
        {PHASE_PLANETS.map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={planet === p}
            onClick={() => setPlanet(p)}
            className={`datum border px-3 py-1.5 text-[0.625rem] tracking-[0.18em] uppercase transition-colors ${
              planet === p ? "border-rule text-bone" : "border-rule-faint text-bone-faint hover:text-bone-soft"
            }`}
            style={planet === p ? { borderColor: BODY[p].color, color: BODY[p].color } : undefined}
          >
            {BODY[p].glyph} {p}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
        <PhaseWheel color={color} />
        <ol className="grid flex-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {CYCLE_PHASES.map((p) => {
            const age = phaseAge(planet, p.angle);
            return (
              <li key={p.angle} className="border-l-2 pl-4" style={{ borderColor: `${color}66` }}>
                <p className="flex items-baseline gap-3">
                  <span className="text-[1rem] text-bone">{p.name}</span>
                  <span className="datum text-[0.6875rem] text-bone-faint">
                    {p.angle === 0 ? "birth" : age > 120 ? "beyond a lifetime" : `age ~${age < 40 ? Number(age.toFixed(1)) : Math.round(age)}`}
                  </span>
                </p>
                <p className="text-[0.875rem] italic" style={{ color }}>
                  {p.theme}
                </p>
                <p className="mt-1 text-[0.875rem] leading-snug text-bone-soft">{p.line}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/** How fast each body moves — full cycle and time in each sign. */
export function BodySpeeds() {
  return (
    <div>
      <div className="overflow-x-auto border-y border-rule">
        <table className="w-full min-w-[28rem] text-left">
          <thead>
            <tr className="border-b border-rule">
              {["Body", "Full cycle", "In each sign"].map((h) => (
                <th
                  key={h}
                  className="datum px-4 py-3 text-[0.625rem] font-normal tracking-[0.2em] text-bone-faint uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BODY_PERIODS.map((b) => (
              <tr key={b.body} className="border-b border-rule-faint last:border-b-0">
                <td className="px-4 py-2.5">
                  <span className="flex items-baseline gap-2">
                    <span className="glyph w-4 text-[0.9375rem]" style={{ color: BODY[b.body].color }} aria-hidden>
                      {BODY[b.body].glyph}
                    </span>
                    <span className="text-[0.9375rem] text-bone">{b.body}</span>
                  </span>
                </td>
                <td className="px-4 py-2.5 text-[0.9375rem] text-bone-soft">{b.period}</td>
                <td className="px-4 py-2.5 text-[0.9375rem] text-bone-soft">{b.perSign}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
