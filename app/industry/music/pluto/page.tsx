// app/industry/music/pluto/page.tsx
import { PageTitle } from "@/components/primitives";
import { ELEMENT_COLOR, signMeta } from "@/lib/symbols";
import {
  PLUTO_ELEMENT_FUNCTION,
  PLUTO_ELEMENT_ORDER,
  PLUTO_MUSIC_ERAS,
} from "@/lib/industry/pluto-music-eras-data";
import PlutoEraTable from "@/components/industry/pluto-era-table";

/**
 * The pattern across eras, which no single card can show.
 *
 * A grid of six eras can say what each one was; it cannot say that the four
 * elements keep doing the same four jobs. That is a claim about the sequence,
 * so it gets its own block rather than a repeated chip on every card.
 *
 * Every cell is derived — the eras from their own element, the examples from
 * their own model — so this table cannot drift out of agreement with the grid
 * below it when an era is rewritten.
 */
function ElementalPattern() {
  return (
    <section className="mt-4">
      <p className="eyebrow mb-1 text-[0.6875rem]">Elemental pattern</p>
      <p className="mb-5 max-w-2xl text-[0.9375rem] leading-relaxed text-bone-faint">
        The same four jobs keep recurring in the same order. Under test, not
        established: six consecutive signs cycle through the elements whether or
        not anything real is happening, so the pattern existing proves nothing.
        What is suggestive is that the functions line up — and that Virgo and
        Capricorn were read separately and both came out as infrastructure eras.
      </p>

      <div className="overflow-x-auto border-y border-rule">
        <table className="w-full border-collapse text-left text-[0.9375rem]">
          <caption className="sr-only">
            What each element appears to do across the Pluto music eras.
          </caption>
          <thead>
            <tr className="border-b border-rule-faint">
              {["Element", "Pluto function emerging in our data", "Examples"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="datum py-3 pr-6 text-[0.625rem] font-normal uppercase tracking-[0.18em] text-bone-faint"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PLUTO_ELEMENT_ORDER.map((element) => {
              const color = ELEMENT_COLOR[element];
              const eras = PLUTO_MUSIC_ERAS.filter(
                (era) => signMeta(era.sign)?.element === element,
              );
              return (
                <tr key={element} className="border-b border-rule-faint last:border-0">
                  <th scope="row" className="py-3 pr-6 align-top">
                    <span
                      className="datum text-[0.75rem] uppercase tracking-[0.14em]"
                      style={{ color }}
                    >
                      {element}
                    </span>
                  </th>
                  <td className="py-3 pr-6 align-top leading-snug font-medium text-bone">
                    {PLUTO_ELEMENT_FUNCTION[element]}
                  </td>
                  <td className="py-3 align-top">
                    <ul className="flex flex-col gap-1">
                      {eras.map((era) => (
                        <li key={era.sign} className="leading-snug text-bone-soft">
                          <span className="glyph mr-1.5" aria-hidden="true" style={{ color }}>
                            {era.symbol}
                          </span>
                          {era.sign}
                          <span className="mx-1.5 text-bone-faint" aria-hidden="true">→</span>
                          {era.model ?? (
                            <span className="text-bone-faint italic">
                              {era.marketExpression?.name ?? "To be identified"}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function MusicPlutoPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <div className="pt-12">
        <PageTitle
          eyebrow="Industry · Music · Pluto"
          title="Pluto Eras in Music"
          lede="Power concentration in the industry."
        />
      </div>

      <PlutoEraTable />

      <ElementalPattern />
    </div>
  );
}
