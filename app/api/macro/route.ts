import { NextResponse } from "next/server";
import { readMacro } from "@/lib/macro";

/**
 * The macro layer. Read-only, and chart-free — this is the sky over everyone,
 * so there is no `chartId` to pass.
 *
 * It lives behind a route rather than being rendered on the page directly for
 * one reason: Swiss Ephemeris is a native binary that cannot be bundled for the
 * client, and the page is a client component because the drawer needs to be.
 * Route handlers are uncached by default in Next 16, which is what this wants —
 * the whole point is where the planets are right now.
 */
export async function GET() {
  try {
    return NextResponse.json(readMacro());
  } catch (error) {
    console.error("Failed to read the macro sky:", error);
    return NextResponse.json(
      { error: "Failed to read the macro sky" },
      { status: 500 },
    );
  }
}
