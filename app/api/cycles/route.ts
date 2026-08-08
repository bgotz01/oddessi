import { NextResponse } from "next/server";
import {
  fetchActiveHouseTransits,
  fetchAllCycles,
  type CycleType,
} from "@/lib/astro-cycles";

/**
 * Cycles for one chart. Read-only.
 *
 * The selected chart lives in client state (localStorage via ChartContext), so
 * callers pass it by id rather than the server guessing.
 *
 *   ?chartId=…              → the five active house transits
 *   ?chartId=…&view=all     → everything, for the explorer
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const chartId = params.get("chartId");
  const view = params.get("view");

  if (!chartId) {
    return NextResponse.json({ error: "chartId is required" }, { status: 400 });
  }

  try {
    if (view === "all") {
      const planets = params.get("planets")?.split(",").filter(Boolean);
      const types = params.get("types")?.split(",").filter(Boolean) as
        | CycleType[]
        | undefined;
      return NextResponse.json(
        await fetchAllCycles(chartId, {
          planets: planets?.length ? planets : undefined,
          types: types?.length ? types : undefined,
        }),
      );
    }

    return NextResponse.json(await fetchActiveHouseTransits(chartId));
  } catch (error) {
    console.error("Failed to load cycles:", error);
    return NextResponse.json(
      { error: "Failed to load cycles" },
      { status: 500 },
    );
  }
}
