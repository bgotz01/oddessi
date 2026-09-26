import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/primitives";
import MarketsUranusTimeline from "@/components/industry/markets-uranus-timeline";
import MarketsUranusGeminiTable from "@/components/industry/markets-uranus-gemini-table";

export const metadata: Metadata = {
  title: "Uranus Eras in Markets | Oddessi",
  description: "What changes how capital operates: five Uranus disruptions from the internet to the AI economy, 1995–2033.",
};

export default function MarketsUranusPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-8">
      <div className="pt-6">
        <Link href="/industry/markets" className="datum text-xs text-bone-faint hover:text-patina">← Markets</Link>
        <div className="mt-4">
          <PageTitle eyebrow="Industry · Markets · Uranus" title="What changes how capital operates." lede="" />
        </div>
      </div>
      <MarketsUranusTimeline />
      <MarketsUranusGeminiTable />
    </div>
  );
}
