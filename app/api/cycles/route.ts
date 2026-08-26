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
 *
 * `lookback` and `lookahead` widen the `view=all` window, in years. The
 * defaults frame the explorer's opening decade; Growth's timing section reads
 * a whole life and asks for the lot, which is still only a few hundred rows.
 */

/** Years either side of now. Generous, but the cache is the real limit. */
function years(raw: string | null, fallback: number): number {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 120) : fallback;
}
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
          lookbackYears: years(params.get("lookback"), 20),
          lookaheadYears: years(params.get("lookahead"), 25),
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
