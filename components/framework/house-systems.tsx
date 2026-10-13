// components/framework/house-systems.tsx

import {
  ANGLES,
  APP_HOUSE_SYSTEM,
  HOUSE_SYSTEMS,
} from "@/lib/astrology/house-systems";

/**
 * The four angles, then the four common ways of drawing the cusps between
 * them. The app's own system is marked so the guide says which one the
 * charts are actually read in.
 */
export default function HouseSystems() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-4">
        {ANGLES.map((a) => (
          <div key={a.abbr} className="bg-surface px-4 py-4">
            <span className="flex items-baseline gap-2">
              <span className="datum text-[0.75rem] tracking-[0.16em] text-patina">{a.abbr}</span>
              <span className="datum text-[0.625rem] tracking-[0.16em] text-bone-faint uppercase">
                {a.name}
              </span>
            </span>
            <p className="mt-2 text-[0.9375rem] leading-snug text-bone">{a.gloss}</p>
            <p className="datum mt-2 text-[0.625rem] tracking-[0.14em] text-bone-faint uppercase">
              {a.house}
              {a.house === 1 ? "st" : "th"} cusp
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto border-y border-rule">
        <table className="w-full min-w-[40rem] text-left">
          <thead>
            <tr className="border-b border-rule">
              {["System", "How the cusps are drawn", "Ascendant", "Midheaven"].map((h) => (
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
            {HOUSE_SYSTEMS.map((s) => {
              const inUse = s.key === APP_HOUSE_SYSTEM;
              return (
                <tr key={s.key} className="border-b border-rule-faint align-top last:border-b-0">
                  <td className="px-4 py-4">
                    <span className={`text-[1rem] ${inUse ? "text-patina" : "text-bone"}`}>
                      {s.name}
                    </span>
                    {inUse ? (
                      <span className="datum mt-1 block text-[0.5625rem] tracking-[0.18em] text-patina-dim uppercase">
                        Used here
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-4 text-[0.9375rem] leading-snug text-bone-soft">{s.method}</td>
                  <td className="px-4 py-4 text-[0.9375rem] text-bone-soft">{s.ascendant}</td>
                  <td className="px-4 py-4 text-[0.9375rem] text-bone-soft">{s.midheaven}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
