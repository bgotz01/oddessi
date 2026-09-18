// app/industry/music/uranus/page.tsx
import { PageTitle } from "@/components/primitives";
import UranusEraTable from "@/components/industry/uranus-era-table";

export default function MusicUranusPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <div className="pt-12">
        <PageTitle
          eyebrow="Industry · Music · Uranus"
          title="Uranus Eras in Music"
          lede="Disruptions in how music is produced and distributed."
        />
      </div>

      <UranusEraTable />
    </div>
  );
}
