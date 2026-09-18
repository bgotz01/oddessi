// components/industry/neptune-fire-signs-table.tsx
import {
  FIRE_SIGN_COLUMNS,
  FIRE_SIGN_ROWS,
} from "@/lib/industry/neptune-fire-signs-data";

export default function NeptuneFireSignsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="w-[160px] border-b border-rule pb-4 pr-6 sm:w-[200px]">
              <span className="datum text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">
                Axis
              </span>
            </th>
            {FIRE_SIGN_COLUMNS.map((col) => (
              <th
                key={col.sign}
                scope="col"
                className="border-b pb-4 pr-4 last:pr-0"
                style={{ borderBottomColor: col.color }}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className="glyph text-[1.5rem] leading-none"
                    style={{ color: col.color }}
                    aria-hidden="true"
                  >
                    {col.symbol}
                  </span>
                  <span
                    className="inscription text-[1.0625rem] leading-tight"
                    style={{ color: col.color }}
                  >
                    {col.sign}
                  </span>
                  <span
                    className="datum text-[0.625rem] uppercase tracking-[0.16em]"
                    style={{ color: col.color }}
                  >
                    {col.archetype}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FIRE_SIGN_ROWS.map((row, i) => (
            <tr key={row.axis} className={i % 2 === 0 ? "bg-surface-alt/30" : ""}>
              <td className="py-3 pr-6 align-top">
                <span className="datum text-[0.6875rem] uppercase tracking-[0.1em] text-bone-faint">
                  {row.axis}
                </span>
              </td>
              <td className="py-3 pr-4 align-top text-[1rem] leading-snug text-bone-soft">
                {row.sagittarius}
              </td>
              <td className="py-3 align-top text-[1rem] leading-snug text-bone-soft">
                {row.aries}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
