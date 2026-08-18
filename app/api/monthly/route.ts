import { NextResponse } from "next/server";
import { listMonthlySummaries, upsertMonthlySummary } from "@/lib/monthly";

export async function GET(request: Request) {
  const year = new URL(request.url).searchParams.get("year");
  try {
    const summaries = await listMonthlySummaries(
      year ? parseInt(year, 10) : undefined,
    );
    return NextResponse.json(summaries);
  } catch {
    return NextResponse.json(
      { error: "Failed to load monthly summaries" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { year, month, primaryProject, projects, body: narrativeBody } = body;

    if (
      typeof year !== "number" ||
      typeof month !== "number" ||
      !primaryProject ||
      !projects ||
      !narrativeBody
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const summary = await upsertMonthlySummary({
      year,
      month,
      primaryProject,
      projects,
      body: narrativeBody,
    });
    return NextResponse.json(summary);
  } catch {
    return NextResponse.json(
      { error: "Failed to save monthly summary" },
      { status: 500 },
    );
  }
}
