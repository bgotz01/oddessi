import { NextResponse } from "next/server";
import { searchLocation } from "@/lib/geocoding/nominatim";
import tzLookup from "tz-lookup";

/**
 * Location search, proxied server-side.
 *
 * Nominatim requires an identifying User-Agent and rate-limits by origin, so
 * the browser must not call it directly. Timezone is resolved here too, from
 * the coordinates, so the form never has to ask for it.
 */
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim();

  if (!query || query.length < 3) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchLocation(query);

    return NextResponse.json({
      results: results.slice(0, 6).map((r) => {
        let timezone = "UTC";
        try {
          timezone = tzLookup(r.latitude, r.longitude);
        } catch {
          // Coordinates outside any tz polygon (mid-ocean) — UTC is a sane
          // fallback and the user can still submit.
        }
        return {
          label: r.displayName,
          city: r.name ?? r.displayName.split(",")[0].trim(),
          latitude: r.latitude,
          longitude: r.longitude,
          timezone,
        };
      }),
    });
  } catch (error) {
    console.error("Geocoding failed:", error);
    return NextResponse.json({ error: "Geocoding failed" }, { status: 502 });
  }
}
