// components/industry/neptune-pisces-aries-table.tsx
import {
  PISCES_COLUMN,
  ARIES_COLUMN,
  PISCES_ARIES_ROWS,
} from "@/lib/industry/neptune-fire-signs-data";

const ITALIC_AXES = new Set(["Discovery"]);

export default function NeptunePiscesAriesTable() {
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

            {[PISCES_COLUMN, ARIES_COLUMN].map((col) => (
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
          {PISCES_ARIES_ROWS.map((row, i) => (
            <tr key={row.axis} className={i % 2 === 0 ? "bg-surface-alt/30" : ""}>
              <td className="py-3 pr-6 align-top">
                <span className="datum text-[0.6875rem] uppercase tracking-[0.1em] text-bone-faint">
                  {row.axis}
                </span>
              </td>
              <td className="py-3 pr-4 align-top text-[1rem] leading-snug">
                <span
                  className={
                    ITALIC_AXES.has(row.axis)
                      ? "italic text-bone-soft"
                      : "text-bone-soft"
                  }
                  style={
                    ITALIC_AXES.has(row.axis)
                      ? { color: PISCES_COLUMN.color }
                      : undefined
                  }
                >
                  {row.pisces}
                </span>
              </td>
              <td className="py-3 align-top text-[1rem] leading-snug">
                <span
                  className={
                    ITALIC_AXES.has(row.axis)
                      ? "italic text-bone-soft"
                      : "text-bone-soft"
                  }
                  style={
                    ITALIC_AXES.has(row.axis)
                      ? { color: ARIES_COLUMN.color }
                      : undefined
                  }
                >
                  {row.aries}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
