import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  DEFAULT_SCORING,
  copyScoring,
  presetById,
  type ScoringConfig,
} from "@/lib/scoring";

/**
 * The house-scoring convention, shared across browsers.
 *
 * One row, like the other preference singletons. It was in localStorage first,
 * which meant a reading depended on which machine you opened it from — bad for
 * a number that is meant to be argued over and settled.
 */

const ID = "default";

/**
 * Rebuild a stored config over the preset it names.
 *
 * Anything persisted before a component existed — tenancy did not, a version
 * ago — would otherwise come back missing fields and score as zero for them.
 * Merging over the preset fills the gaps without discarding the edits.
 */
function reconcile(preset: string, stored: unknown): ScoringConfig {
  const base = presetById(preset) ?? DEFAULT_SCORING;
  if (!stored || typeof stored !== "object") return copyScoring(base);

  const saved = stored as Partial<ScoringConfig>;
  return {
    ...copyScoring(base),
    ...saved,
    weight: { ...base.weight, ...(saved.weight ?? {}) },
    ease: { ...base.ease, ...(saved.ease ?? {}) },
  };
}

export async function GET() {
  const row = await prisma.scoringPreferences.findUnique({ where: { id: ID } });
  if (!row) return NextResponse.json(DEFAULT_SCORING);
  return NextResponse.json(reconcile(row.preset, row.config));
}

export async function PUT(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const incoming = body as Partial<ScoringConfig>;
  if (
    typeof incoming?.id !== "string" ||
    typeof incoming.weight !== "object" ||
    typeof incoming.ease !== "object"
  ) {
    return NextResponse.json({ error: "Not a scoring config" }, { status: 400 });
  }

  // Reconciled before storing, so a client that is behind on fields cannot
  // truncate the stored convention for every other client.
  const config = reconcile(incoming.id, incoming);

  // Prisma's Json input wants an index signature; the config is a fixed shape.
  const json = config as unknown as Prisma.InputJsonObject;

  const row = await prisma.scoringPreferences.upsert({
    where: { id: ID },
    create: { id: ID, preset: config.id, config: json },
    update: { preset: config.id, config: json },
  });

  return NextResponse.json(reconcile(row.preset, row.config));
}
