import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/primitives";
import MarketsPlutoTimeline from "@/components/industry/markets-pluto-timeline";

export const metadata: Metadata = {
  title: "Pluto Eras in Markets | Oddessi",
  description: "How capital is organized into power: five Pluto eras from fiat capital to networked coordination, 1971–2044.",
};

export default function MarketsPlutoPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-8">
      <div className="pt-6">
        <Link href="/industry/markets" className="datum text-xs text-bone-faint hover:text-patina">← Markets</Link>
        <div className="mt-4">
          <PageTitle eyebrow="Industry · Markets · Pluto" title="How capital is organized into power." lede="" />
        </div>
      </div>
      <MarketsPlutoTimeline />
    </div>
  );
}
