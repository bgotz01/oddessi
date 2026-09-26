// components/industry/markets-uranus-gemini-table.tsx
import { MARKETS_URANUS_ERAS } from "@/lib/industry/markets-uranus-eras-data";
import { GEMINI_CYCLES, GEMINI_CYCLE_ROWS } from "@/lib/industry/markets-uranus-gemini-data";

const gemini = MARKETS_URANUS_ERAS.find((era) => era.sign === "Gemini")!;

export default function MarketsUranusGeminiTable() {
  return (
    <section aria-labelledby="uranus-gemini-cycles" className="mt-12">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="uranus-gemini-cycles" className="flex items-center gap-2 text-lg text-bone">
          <span className="glyph text-2xl" style={{ color: gemini.color }} aria-hidden="true">{gemini.symbol}</span>
          Uranus in Gemini, one cycle apart
        </h2>
        <span className="datum text-xs text-bone-faint">1941–49 against 2026–33</span>
      </div>
      <div role="region" aria-label="Compare the two Uranus in Gemini cycles" tabIndex={0} className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr>
              <th scope="col" className="w-[170px] border-b border-rule pb-3 pr-6 align-baseline sm:w-[210px]">
                <span className="datum text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">Axis</span>
              </th>
              {GEMINI_CYCLES.map((cycle) => (
                <th
                  key={cycle.key}
                  scope="col"
                  className="border-b pb-3 pr-4 align-baseline last:pr-0"
                  style={{ borderBottomColor: cycle.hypothesis ? gemini.color : "var(--color-rule)" }}
                >
                  <span className="text-[1.0625rem] leading-tight" style={{ color: cycle.hypothesis ? gemini.color : undefined }}>
                    {cycle.period} cycle
                  </span>
                  <span className="datum mt-1 block text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">
                    {cycle.hypothesis ? "Hypothesis" : "Historical"}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GEMINI_CYCLE_ROWS.map((row, i) => (
              <tr key={row.axis} className={i % 2 === 0 ? "bg-surface-alt/30" : ""}>
                <th scope="row" className="py-3 pr-6 align-baseline font-normal">
                  <span className="datum text-[0.6875rem] uppercase tracking-[0.1em] text-bone-faint">{row.axis}</span>
                </th>
                {row.past === row.next ? (
                  <td colSpan={2} className="py-3 align-baseline text-[1rem] leading-snug text-bone-soft">{row.past}</td>
                ) : (
                  GEMINI_CYCLES.map((cycle) => (
                    <td
                      key={cycle.key}
                      className={`py-3 pr-4 align-baseline leading-snug last:pr-0 ${row.emphasis ? "text-lg font-semibold" : "text-[1rem] text-bone-soft"}`}
                      style={row.emphasis ? { color: cycle.hypothesis ? gemini.color : "var(--color-bone)" } : undefined}
                    >
                      {row[cycle.key]}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
