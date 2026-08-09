import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { calculateBirthChart } from "@/lib/astrology/server-calculator";
import { cacheLifeCyclesForChart } from "@/lib/astrology/cache-life-cycles";
import { longitudeToSign } from "@/lib/astrology/utils";
import type { BirthData } from "@/types/astrology";

/**
 * Create a birth chart — the same path arc uses.
 *
 * `calculateBirthChart` delegates to ASTRO_SERVICE_URL when set and otherwise
 * runs swisseph-v2 locally, so this behaves identically to arc in development
 * and can point at the same droplet in production.
 *
 * Oddessi has no auth yet, so the chart is attached to an existing
 * PersonalDevelopmentProfile rather than the session user's. Once auth lands,
 * `resolveProfileId` is the single place that needs to change.
 */

interface CreateChartBody {
  birthData: BirthData & { gender?: string };
  name?: string;
  description?: string;
  setAsDefault?: boolean;
  profileId?: string;
}

async function resolveProfileId(explicit?: string): Promise<string | null> {
  if (explicit) return explicit;

  // Fall back to whichever profile owns the current default chart.
  const defaultChart = await prisma.birthChartData.findFirst({
    where: { isDefault: true },
    orderBy: { createdAt: "desc" },
    select: { profileId: true },
  });
  if (defaultChart) return defaultChart.profileId;

  const anyProfile = await prisma.personalDevelopmentProfile.findFirst({
    select: { id: true },
  });
  return anyProfile?.id ?? null;
}

/** Build the UTC date object the way arc does, avoiding a timezone shift. */
function toBirthDate(date: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }
  return new Date(`${date}T00:00:00.000Z`);
}

export async function DELETE(request: Request) {
  try {
    const { chartId } = (await request.json()) as { chartId?: string };
    if (!chartId) {
      return NextResponse.json({ error: "chartId required" }, { status: 400 });
    }

    const row = await prisma.birthChartData.findUnique({ where: { id: chartId } });
    if (!row) {
      return NextResponse.json({ error: "chart not found" }, { status: 404 });
    }

    // Delete cached cycles first (FK constraint), then the chart itself.
    await prisma.lifeCycleCache.deleteMany({ where: { chartId } });
    await prisma.birthChartData.delete({ where: { id: chartId } });

    // If the deleted chart was the default, promote the next-oldest chart.
    if (row.isDefault) {
      const next = await prisma.birthChartData.findFirst({
        orderBy: { createdAt: "asc" },
        select: { id: true },
      });
      if (next) {
        await prisma.birthChartData.update({
          where: { id: next.id },
          data: { isDefault: true },
        });
      }
    }

    return NextResponse.json({ success: true, chartId });
  } catch (error) {
    console.error("Chart deletion failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateChartBody;
    const { birthData, name, description, setAsDefault } = body;

    if (
      !birthData?.date ||
      !birthData?.time ||
      !birthData?.timezone ||
      typeof birthData.latitude !== "number" ||
      typeof birthData.longitude !== "number"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "date, time, timezone, latitude and longitude are required",
        },
        { status: 400 },
      );
    }

    const profileId = await resolveProfileId(body.profileId);
    if (!profileId) {
      return NextResponse.json(
        { success: false, error: "No profile available to attach the chart to" },
        { status: 400 },
      );
    }

    // Swiss Ephemeris — throws on invalid input, caught below.
    const chart = await calculateBirthChart(birthData);

    const sun = chart.planets.find((p) => p.planet === "Sun");
    const moon = chart.planets.find((p) => p.planet === "Moon");
    const rising = chart.angles
      ? longitudeToSign(chart.angles.ascendant).sign
      : null;

    const existingCount = await prisma.birthChartData.count({
      where: { profileId },
    });
    const shouldBeDefault = setAsDefault ?? existingCount === 0;

    if (shouldBeDefault) {
      await prisma.birthChartData.updateMany({
        where: { profileId },
        data: { isDefault: false },
      });
    }

    const saved = await prisma.birthChartData.create({
      data: {
        profileId,
        name: name?.trim() || `Chart ${existingCount + 1}`,
        description: description?.trim() || null,
        birthDate: toBirthDate(birthData.date),
        birthTime: birthData.time,
        birthTimezone: birthData.timezone,
        birthLatitude: birthData.latitude,
        birthLongitude: birthData.longitude,
        birthCity: birthData.city?.trim() || null,
        birthLocation:
          birthData.location?.trim() ||
          `${birthData.latitude}, ${birthData.longitude}`,
        gender: birthData.gender || null,
        sunSign: sun?.sign ?? null,
        moonSign: moon?.sign ?? null,
        risingSign: rising,
        // Prisma's Json input type won't accept our interfaces directly —
        // they're structurally JSON but lack an index signature.
        planetPositions: chart.planets as unknown as Prisma.InputJsonValue,
        housePositions: chart.houses as unknown as Prisma.InputJsonValue,
        angles: chart.angles as unknown as Prisma.InputJsonValue,
        aspects: chart.aspects as unknown as Prisma.InputJsonValue,
        isDefault: shouldBeDefault,
      },
    });

    // Populate the cycles cache so /astro/cycles has data for this chart.
    // Awaited deliberately — a chart whose Cycles page is empty for the first
    // minute reads as broken, and the calculation takes a few seconds.
    let cyclesCached = true;
    try {
      await cacheLifeCyclesForChart(saved.id, chart, {
        lookbackYears: 20,
        lookaheadYears: 25,
        includeJupiter: true,
        includeMinorAspects: false,
      });
    } catch (error) {
      console.error("Life-cycle caching failed:", error);
      cyclesCached = false;
    }

    return NextResponse.json({
      success: true,
      chartId: saved.id,
      name: saved.name,
      summary: {
        sunSign: saved.sunSign,
        moonSign: saved.moonSign,
        risingSign: saved.risingSign,
      },
      cyclesCached,
    });
  } catch (error) {
    console.error("Birth chart creation failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
