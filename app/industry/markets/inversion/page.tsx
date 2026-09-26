import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/primitives";
import { MarketsInversionPredictions, MarketsInversionTable, MarketsInversionThesis, MarketsNextEra, MarketsPreviousEra } from "@/components/industry/markets-inversion";

export const metadata: Metadata = {
  title: "The Inversion | Oddessi",
  description: "Capital parked, 2008–2025, and its inversion: Pluto, Uranus and Neptune each change sign, and capital turns from parked exposure toward continuously activated capital, emerging from 2026.",
};

export default function MarketsInversionPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <div className="pt-6">
        <Link href="/industry/markets" className="datum text-xs text-bone-faint hover:text-patina">← Markets</Link>
        <div className="mt-4">
          <PageTitle eyebrow="Industry · Markets · Inversion" title="The Inversion" lede="" />
        </div>
      </div>
      <MarketsPreviousEra />
      <MarketsNextEra />
      <MarketsInversionTable />
      <MarketsInversionThesis />
      <MarketsInversionPredictions />
    </div>
  );
}
