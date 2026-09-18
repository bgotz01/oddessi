// app/industry/music/neptune/aries/page.tsx
import { PageTitle, SectionHeading } from "@/components/primitives";
import NeptuneFireSignsTable from "@/components/industry/neptune-fire-signs-table";
import NeptunePiscesAriesTable from "@/components/industry/neptune-pisces-aries-table";

export default function NeptuneAriesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <div className="pt-12">
        <PageTitle
          eyebrow="Industry · Music · Neptune · Aries"
          title="Neptune in Aries"
          lede="The next era begins in 2026. After a decade of boundaryless collective sound, the question shifts: now that everyone has access to everything, who goes somewhere nobody else has gone?"
        />
      </div>

      <section className="mb-20">
        <SectionHeading aside="Water → Fire · Pisces & Aries">
          <span className="inline-flex items-center text-[1.1875rem] tracking-[0.16em]">
            <span className="inscription mr-3 text-[1.1875rem]" style={{ color: "#7899d4" }}>♓</span>
            <span>Pisces</span>
            <span aria-hidden="true" className="mx-3 h-px w-8 bg-patina-dim" />
            <span className="text-patina">→ Aries</span>
          </span>
        </SectionHeading>
        <div className="mb-8 max-w-3xl space-y-4">

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="border-l-2 py-1 pl-4" style={{ borderColor: "#7899d4" }}>
              <p className="datum mb-1 text-[0.625rem] uppercase tracking-[0.16em]" style={{ color: "#7899d4" }}>Pisces</p>
              <p className="text-[1rem] leading-snug text-bone-soft">We're all part of the same musical environment.</p>
              <p className="datum mt-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">collective</p>
            </div>
            <div className="border-l-2 py-1 pl-4" style={{ borderColor: "#c97fb0" }}>
              <p className="datum mb-1 text-[0.625rem] uppercase tracking-[0.16em]" style={{ color: "#c97fb0" }}>Aries</p>
              <p className="text-[1rem] leading-snug text-bone-soft">Someone goes first; other people gather around them.</p>
              <p className="datum mt-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">pioneering community</p>
            </div>
          </div>
        </div>
        <NeptunePiscesAriesTable />
      </section>

      <section className="mb-20">
        <SectionHeading aside="Sagittarius & Aries · Compared">
          <span className="inline-flex items-center text-[1.1875rem] tracking-[0.16em]">
            <span className="inscription mr-2 text-[1.1875rem]" style={{ color: "#e07a50" }}>♐</span>
            <span>Sagittarius</span>
            <span aria-hidden="true" className="mx-3 h-px w-8 bg-patina-dim" />
            <span className="text-patina">→ Aries</span>
          </span>
        </SectionHeading>
        <p className="mb-6 text-bone-soft">
          Both Sagittarius and Aries are fire signs, but they express it differently. Sagittarius expands outward; Aries originates forward.
        </p>
        <NeptuneFireSignsTable />
      </section>
    </div>
  );
}
