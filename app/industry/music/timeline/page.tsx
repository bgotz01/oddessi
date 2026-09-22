import type { Metadata } from "next";
import { PageTitle } from "@/components/primitives";
import PopMusicTimeline from "@/components/industry/pop-music-timeline";
import PopEraTable from "@/components/industry/pop-era-table";

export const metadata: Metadata = {
  title: "Pop Music Timeline | Oddessi",
  description: "Seven decades of pop music: milestone artists, cultural shifts, and career peaks from the 1960s to the 2020s.",
};

export default function PopTimelinePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <div className="pt-12"><PageTitle eyebrow="Industry · Music · 1960s–2020s" title="The Pop Music Timeline" lede="Seven decades of pop, aligned with the cycles of power, disruption, and cultural ideals. Follow the changing sound above; compare Pluto, Uranus, and Neptune on the same axis below." /></div>
      <PopMusicTimeline />
      <PopEraTable />
    </div>
  );
}
