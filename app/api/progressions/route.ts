import { NextResponse } from "next/server";
import { fetchChart } from "@/lib/charts";
import { progressions } from "@/lib/love/progressions";

/**
 * Secondary progressions for one chart. Read-only.
 *
 * Behind a route for the same reason the macro sky is: Swiss Ephemeris is a
 * native binary that cannot be bundled for the client, and Love is a client
 * page because its timeline selects. Unlike the macro sky this one takes a
 * `chartId` — a progression is a chart's own clock and has no collective
 * reading.
 *
 * Uncached by default in Next 16, which is the wrong default for this and
 * cheap enough not to matter: the answer is a pure function of a birth
 * instant and does not change for ninety years, but it is about four thousand
 * ephemeris calls and the file cache underneath makes that tens of
 * milliseconds. Worth revisiting only if it shows up in a trace.
 */
export async function GET(request: Request) {
  const chartId = new URL(request.url).searchParams.get("chartId");

  if (!chartId) {
    return NextResponse.json({ error: "chartId is required" }, { status: 400 });
  }

  try {
    const chart = await fetchChart(chartId);
    if (!chart) {
      return NextResponse.json({ error: "No such chart" }, { status: 404 });
    }
    return NextResponse.json(progressions(chart));
  } catch (error) {
    console.error("Failed to compute progressions:", error);
    return NextResponse.json(
      { error: "Failed to compute progressions" },
      { status: 500 },
    );
  }
}
