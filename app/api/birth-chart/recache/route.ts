import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateBirthChart } from "@/lib/astrology/server-calculator";
import { cacheLifeCyclesForChart } from "@/lib/astrology/cache-life-cycles";
import type { BirthData } from "@/types/astrology";

/**
 * Re-run cycle caching for an already-saved chart.
 * POST /api/birth-chart/recache  { chartId: string }
 *
 * Useful after a cache wipe or when cycle calculation logic changes.
 */
export async function POST(request: Request) {
  try {
    const { chartId } = (await request.json()) as { chartId?: string };
    if (!chartId) {
      return NextResponse.json({ error: "chartId required" }, { status: 400 });
    }

    const row = await prisma.birthChartData.findUnique({ where: { id: chartId } });
    if (!row) {
      return NextResponse.json({ error: "chart not found" }, { status: 404 });
    }

    const birthData: BirthData = {
      date: row.birthDate.toISOString().slice(0, 10),
      time: row.birthTime,
      timezone: row.birthTimezone,
      latitude: row.birthLatitude,
      longitude: row.birthLongitude,
      location: row.birthLocation ?? "",
    };

    const chart = await calculateBirthChart(birthData);

    const result = await cacheLifeCyclesForChart(row.id, chart, {
      lookbackYears: 20,
      lookaheadYears: 25,
      includeJupiter: true,
      includeMinorAspects: false,
    });

    return NextResponse.json({ success: true, chartId, result });
  } catch (error) {
    console.error("Recache failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
