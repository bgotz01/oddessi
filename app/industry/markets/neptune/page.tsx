import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/primitives";
import MarketsNeptuneTimeline from "@/components/industry/markets-neptune-timeline";

export const metadata: Metadata = {
  title: "Neptune Eras in Markets | Oddessi",
  description: "What capital is seeking: five Neptune eras from expansion to initiation, 1970–2039.",
};

export default function MarketsNeptunePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-8">
      <div className="pt-6">
        <Link href="/industry/markets" className="datum text-xs text-bone-faint hover:text-patina">← Markets</Link>
        <div className="mt-4">
          <PageTitle eyebrow="Industry · Markets · Neptune" title="What capital is seeking." lede="" />
        </div>
      </div>
      <MarketsNeptuneTimeline />
    </div>
  );
}
