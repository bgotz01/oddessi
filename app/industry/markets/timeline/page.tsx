import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/primitives";
import MarketsTimeline from "@/components/industry/markets-timeline";
import MarketsThemeTable from "@/components/industry/markets-theme-table";

export const metadata: Metadata = {
  title: "Markets Timeline | Oddessi",
  description: "Six decades of investment themes, by decade and half-decade, aligned with the Neptune, Uranus, and Pluto market cycles.",
};

export default function MarketsTimelinePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <div className="pt-6">
        <Link href="/industry/markets" className="datum text-xs text-bone-faint hover:text-patina">← Markets</Link>
        <div className="mt-4">
          <PageTitle eyebrow="Industry · Markets · 1970s–2020s" title="The Markets Timeline" lede="" />
        </div>
      </div>
      <MarketsTimeline />
      <MarketsThemeTable />
    </div>
  );
}
