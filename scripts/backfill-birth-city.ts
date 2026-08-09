/**
 * Backfill birthCity for charts that have coordinates but no city name.
 * Uses Nominatim reverse geocoding (1 req/sec rate limit).
 *
 * Run with:  npx tsx scripts/backfill-birth-city.ts
 */

import { prisma } from "@/lib/prisma";

const NOMINATIM = "https://nominatim.openstreetmap.org/reverse";
const USER_AGENT = "OddessiBackfill/1.0";

async function reversGeocode(lat: number, lon: number): Promise<string | null> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    format: "json",
    addressdetails: "1",
    "accept-language": "en",
  });

  const res = await fetch(`${NOMINATIM}?${params}`, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!res.ok) return null;

  const data = await res.json();
  const addr = data?.address ?? {};

  return (
    addr.city ||
    addr.town ||
    addr.village ||
    addr.county ||
    data.display_name?.split(",")[0]?.trim() ||
    null
  );
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const charts = await prisma.birthChartData.findMany({
    where: { birthCity: null },
    select: { id: true, name: true, birthLatitude: true, birthLongitude: true, birthLocation: true },
    orderBy: { createdAt: "asc" },
  });

  console.log(`Found ${charts.length} chart(s) without a city.`);

  for (const chart of charts) {
    // If birthLocation already looks like a real name (not raw coords), parse city from it.
    const isRawCoords = /^-?\d+\.\d+\s*,\s*-?\d+\.\d+$/.test(
      chart.birthLocation?.trim() ?? ""
    );

    let city: string | null = null;

    if (!isRawCoords && chart.birthLocation) {
      city = chart.birthLocation.split(",")[0].trim();
      console.log(`  ${chart.name}: using location field → "${city}"`);
    } else {
      console.log(`  ${chart.name}: reverse geocoding ${chart.birthLatitude}, ${chart.birthLongitude}...`);
      city = await reversGeocode(chart.birthLatitude, chart.birthLongitude);
      console.log(`    → "${city ?? "not found"}"`);
      await sleep(1100); // Nominatim: max 1 req/sec
    }

    if (city) {
      await prisma.birthChartData.update({
        where: { id: chart.id },
        data: { birthCity: city },
      });
    }
  }

  console.log("\nDone.");
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
