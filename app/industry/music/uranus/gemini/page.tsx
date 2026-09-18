// app/industry/music/uranus/gemini/page.tsx
import { PageTitle, SectionHeading } from "@/components/primitives";
import { GEMINI_PRINCIPLES } from "@/lib/industry/uranus-gemini-data";

const GEMINI_COLOR = "#7dc0d8"; // air · same palette as Aquarius era

export default function UranusGeminiPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <div className="pt-12">
        <PageTitle
          eyebrow="Industry · Music · Uranus · Gemini"
          title="Uranus in Gemini"
          lede="Uranus enters Gemini in 2026. Gemini multiplies, exchanges and fragments. What the previous era built as infrastructure, this era fills with signal — more creators, more formats, more circulation."
        />
      </div>

      <section className="mb-20">
        <SectionHeading aside="2026–2033 · Hypothesis">
          <span className="inline-flex items-center text-[1.1875rem] tracking-[0.16em]">
            <span className="glyph mr-3 text-[1.5rem] leading-none" style={{ color: GEMINI_COLOR }} aria-hidden="true">♊</span>
            <span>Gemini</span>
            <span aria-hidden="true" className="mx-3 h-px w-8 bg-patina-dim" />
            <span className="text-patina">Principles</span>
          </span>
        </SectionHeading>

        <p className="mb-6 text-bone-soft">
          What does each Gemini principle suggest for how music is made, distributed and experienced?
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                <th className="w-[160px] pb-3 pr-6 sm:w-[200px]">
                  <span className="datum text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">
                    Gemini principle
                  </span>
                </th>
                <th className="pb-3">
                  <span className="datum text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">
                    Possible music manifestation
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {GEMINI_PRINCIPLES.map((row, i) => (
                <tr key={row.principle} className={i % 2 === 0 ? "bg-surface-alt/30" : ""}>
                  <td className="py-3 pr-6 align-top">
                    <span
                      className="datum text-[0.75rem] uppercase tracking-[0.12em]"
                      style={{ color: GEMINI_COLOR }}
                    >
                      {row.principle}
                    </span>
                  </td>
                  <td className="py-3 align-top text-[1.0625rem] leading-snug text-bone-soft">
                    {row.manifestation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
