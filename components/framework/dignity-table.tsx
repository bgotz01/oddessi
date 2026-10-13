// components/framework/dignity-table.tsx

import { PLANET_INFO } from "@/lib/astrology/interpretations/planets";
import { DIGNITY_GUIDE, type Dignity } from "@/lib/interpretation";
import { signGlyph } from "@/lib/symbols";
import { BODY } from "@/lib/bodies";

/**
 * Planetary condition by sign: where each planet is at home, exalted, in
 * detriment and in fall. Read from `PLANET_INFO`, the table `dignityOf`
 * judges every chart on, so the guide shows exactly the convention in use.
 */

const PLANETS = [
  "Sun", "Moon", "Mercury", "Venus", "Mars",
  "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto",
] as const;

const COLUMNS: { dignity: Dignity; label: string; tone: string }[] = [
  { dignity: "Ruling", label: "Domicile", tone: "text-patina" },
  { dignity: "Exaltation", label: "Exaltation", tone: "text-patina" },
  { dignity: "Detriment", label: "Detriment", tone: "text-ember" },
  { dignity: "Fall", label: "Fall", tone: "text-ember" },
];

function cell(planet: (typeof PLANETS)[number], dignity: Dignity): string {
  const info = Object.values(PLANET_INFO).find((p) => p.name === planet);
  if (!info) return "—";
  switch (dignity) {
    case "Ruling":
      return info.rulerOf.join(", ") || "—";
    case "Exaltation":
      return info.exaltedIn ?? "—";
    case "Detriment":
      return info.detrimentIn?.join(", ") ?? "—";
    case "Fall":
      return info.fallIn ?? "—";
    default:
      return "—";
  }
}

export default function DignityTable() {
  return (
    <div>
      <div className="mb-10 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {DIGNITY_GUIDE.map((d) => {
          const tone = COLUMNS.find((c) => c.dignity === d.dignity)!.tone;
          const body = BODY[d.example.body];
          return (
            <div key={d.dignity} className="flex flex-col bg-surface px-5 pt-4 pb-5">
              <p className={`datum text-[0.625rem] tracking-[0.2em] uppercase ${tone}`}>{d.name}</p>
              <p className="inscription mt-2 text-[1.0625rem] tracking-[0.06em] text-bone">{d.image}</p>
              <p className="mt-2 flex-1 text-[0.875rem] leading-snug text-bone-soft">{d.meaning}</p>
              <p className="mt-4 flex items-baseline gap-2 border-t border-rule-faint pt-3">
                <span className="glyph text-[1.125rem]" style={{ color: body.color }} aria-hidden>
                  {body.glyph}
                </span>
                <span className="glyph text-[1.125rem] text-bone-soft" aria-hidden>
                  {signGlyph(d.example.sign)}
                </span>
                <span className="ml-1 text-[0.875rem] text-bone-faint italic">
                  {d.example.body} in {d.example.sign}
                </span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="overflow-x-auto border-y border-rule">
        <table className="w-full min-w-[36rem] text-left">
          <thead>
            <tr className="border-b border-rule">
              <th className="datum px-4 py-3 text-[0.625rem] font-normal tracking-[0.2em] text-bone-faint uppercase">
                Planet
              </th>
              {COLUMNS.map((c) => (
                <th
                  key={c.dignity}
                  className={`datum px-4 py-3 text-[0.625rem] font-normal tracking-[0.2em] uppercase ${c.tone}`}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PLANETS.map((p) => (
              <tr key={p} className="border-b border-rule-faint last:border-b-0">
                <td className="px-4 py-2.5">
                  <span className="flex items-baseline gap-2">
                    <span className="glyph w-4 text-[0.9375rem]" style={{ color: BODY[p].color }} aria-hidden>
                      {BODY[p].glyph}
                    </span>
                    <span className="text-[0.9375rem] text-bone">{p}</span>
                  </span>
                </td>
                {COLUMNS.map((c) => (
                  <td key={c.dignity} className="px-4 py-2.5 text-[0.9375rem] text-bone-soft">
                    {cell(p, c.dignity)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
