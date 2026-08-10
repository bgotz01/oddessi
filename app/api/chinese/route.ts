import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { computeReading, type Gender } from "@/lib/chinese/pillars";

/**
 * The Chinese reading for one chart. Read-only, computed per request.
 *
 * Nothing is cached: the four pillars are a few ephemeris calls and some
 * arithmetic, so there is no `life_cycle_cache` equivalent here and no
 * staleness to manage. Only the birth moment goes in — the Western
 * calculation this chart also carries is not consulted.
 */

/** The stored value is free text; only the two the luck pillars need are honoured. */
function readGender(value: string | null): Gender | null {
  const normalised = value?.trim().toLowerCase();
  return normalised === "male" || normalised === "female" ? normalised : null;
}

export async function GET(request: Request) {
  const chartId = new URL(request.url).searchParams.get("chartId");

  if (!chartId) {
    return NextResponse.json({ error: "chartId is required" }, { status: 400 });
  }

  const row = await prisma.birthChartData.findUnique({
    where: { id: chartId },
    select: {
      birthDate: true,
      birthTime: true,
      birthTimezone: true,
      gender: true,
    },
  });

  if (!row) {
    return NextResponse.json({ error: "No such chart" }, { status: 404 });
  }

  try {
    return NextResponse.json(
      computeReading({
        date: row.birthDate.toISOString().slice(0, 10),
        time: row.birthTime,
        timezone: row.birthTimezone,
        gender: readGender(row.gender),
      }),
    );
  } catch (error) {
    console.error("Failed to compute the four pillars:", error);
    return NextResponse.json(
      { error: "Failed to compute the four pillars" },
      { status: 500 },
    );
  }
}
