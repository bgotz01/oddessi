import type { Band } from "@/lib/band";

/**
 * A planet's whole walk through the houses, read as one arc.
 *
 * The Cycles page already says which house a planet is in. What it cannot say
 * is where that house sits in the loop — whether this is the stretch where
 * something is being started, built, or let go of — because a single row has
 * no before and after. This module supplies the loop: a fixed sequence of
 * phases, and the real ingress dates from the cache hung on it.
 *
 * The sequence is fixed because it is structural. Houses are contiguous
 * sectors in order, so a planet always travels 1 → 12 → 1, and no chart
 * changes that. The DATES are what differ per chart, and those are never
 * guessed — a box with no cached transit behind it simply carries no dates.
 *
 * Nothing here knows which planet it is reading. Jupiter's twelve years and
 * Saturn's thirty are the same shape at different speeds, and the vocabularies
 * that name their phases live in `long-cycles.ts`.
 */

export interface CyclePhase {
  /** Which house the phase belongs to. */
  house: number;
  /** The word the box carries. */
  name: string;
  /**
   * The verb under it, where the system has one.
   *
   * Jupiter's phases are a doing and a thing done to — "Beginning /
   * Emergence". Saturn's are named once. Optional rather than invented,
   * because a second word made up to fill the slot would read exactly like
   * the twelve that were given.
   */
  phase?: string;
  /** The long tail, shown when a box is opened rather than in the box. */
  detail: string;
}

export type CycleStepState = "past" | "current" | "ahead";

export interface CycleStep extends CyclePhase {
  /** Stable key — house number alone repeats across the rebirth cap. */
  id: string;
  /** Ingress, where the cache has one for this cycle. */
  start?: string;
  end?: string;
  /** Days the transit lasts. Absent with the dates. */
  days?: number;
  state: CycleStepState;
  /** 0–1 through this house. Only on the current step. */
  progress?: number;
  /** The closing cap, not one of the twelve. */
  rebirth?: boolean;
}

export interface HouseCycle {
  /** Twelve houses in order, plus the cap that closes the loop. */
  steps: CycleStep[];
  /** The twelve, without the cap — for anything counting phases. */
  phases: CycleStep[];
  rebirth: CycleStep;
  current: CycleStep | null;
  /** Cycle envelope, where the cache reaches far enough to have one. */
  start?: string;
  end?: string;
  /** 0–1 through the whole loop. */
  progress: number;
}

interface Pass {
  house: number;
  start: string;
  end: string;
}

function ms(iso: string): number {
  return Date.parse(`${iso}T00:00:00Z`);
}

const DAY = 24 * 60 * 60 * 1000;

/**
 * One entry per ingress.
 *
 * The cache stores a retrograde re-crossing as a second row for the same
 * house, so a naive read sees the planet enter the fifth twice and the
 * sequence stops being a sequence. Consecutive rows for one house are the same
 * visit and get merged to their outer envelope.
 */
function passes(bands: Band[]): Pass[] {
  const rows = bands
    .filter((b) => b.kind === "house-transit" && typeof b.houseNumber === "number")
    .map((b) => ({ house: b.houseNumber as number, start: b.start, end: b.end }))
    .sort((a, b) => ms(a.start) - ms(b.start));

  const merged: Pass[] = [];
  for (const row of rows) {
    const previous = merged[merged.length - 1];
    if (previous && previous.house === row.house) {
      if (ms(row.end) > ms(previous.end)) previous.end = row.end;
      continue;
    }
    merged.push({ ...row });
  }
  return merged;
}

/** Index of the visit the planet is on now — the last one it has entered. */
function currentIndex(rows: Pass[], now: number): number {
  let index = -1;
  for (let i = 0; i < rows.length; i++) {
    if (ms(rows[i].start) <= now) index = i;
  }
  return index === -1 ? 0 : index;
}

/**
 * Build the strip.
 *
 * Anchored on the most recent first-house ingress at or before the house the
 * planet is in now, so the row shown is the cycle the reader is inside rather
 * than an arbitrary span. When the cached window does not reach back far
 * enough to hold that ingress — a chart too young to have completed a loop,
 * most of all with Saturn — the earliest visit anchors it instead and the
 * boxes it cannot date carry no dates, which is the honest answer and still
 * leaves the sequence readable.
 */
export function buildHouseCycle(
  bands: Band[],
  now: Date,
  phaseTable: CyclePhase[],
  rebirthPhase: CyclePhase,
): HouseCycle {
  const rows = passes(bands);
  const t = now.getTime();

  let anchor = 0;
  const cycleRows: Pass[] = [];
  let rebirthRow: Pass | undefined;

  if (rows.length) {
    const here = currentIndex(rows, t);
    anchor = here;
    while (anchor > 0 && rows[anchor].house !== 1) anchor--;

    for (let i = anchor; i < rows.length && cycleRows.length < 12; i++) {
      if (i > anchor && rows[i].house === 1) break;
      cycleRows.push(rows[i]);
    }
    rebirthRow = rows[anchor + cycleRows.length];
    if (rebirthRow && rebirthRow.house !== 1) rebirthRow = undefined;
  }

  const byHouse = new Map(cycleRows.map((row) => [row.house, row]));

  /**
   * Which house is in force, so boxes with no cached transit can still be
   * placed before or after the reader rather than defaulting to "ahead".
   *
   * Read from the passes first. The last-entered envelope is wrong for the
   * whole stretch a retrograde carries the planet back over a cusp — Jupiter
   * enters the 1st, backs into the 12th for four months, and the envelope
   * still says 1st. The passes tile, so one contains today.
   */
  const inPass = bands.find(
    (b) =>
      b.kind === "house-transit" &&
      typeof b.houseNumber === "number" &&
      b.segments.some((s) => ms(s.start) <= t && t < ms(s.end)),
  );
  const currentHouse =
    (inPass?.houseNumber as number | undefined) ??
    (rows.length ? rows[currentIndex(rows, t)].house : null);

  const step = (phase: CyclePhase, row: Pass | undefined, rebirth: boolean): CycleStep => {
    const id = rebirth ? "rebirth" : `h${phase.house}`;

    /**
     * Exactly one house is in force, and it is the one most recently entered.
     *
     * Asking each row whether it contains today instead marks TWO houses
     * current wherever a retrograde makes consecutive transits overlap —
     * Saturn's eighth and ninth overlap by eight months on the chart this was
     * written against — so the strip said "now" twice and its readout defaulted
     * to the earlier of them, which is the one the rows above this have already
     * moved past. The pass containing today decides, which is also how
     * `fetchActiveHouseTransits` resolves the same overlap.
     */
    let state: CycleStepState;
    if (rebirth || currentHouse == null) {
      state = "ahead";
    } else {
      state =
        phase.house < currentHouse ? "past" : phase.house > currentHouse ? "ahead" : "current";
    }

    const span = row ? ms(row.end) - ms(row.start) : 0;
    return {
      ...phase,
      id,
      start: row?.start,
      end: row?.end,
      days: row ? Math.max(1, Math.round(span / DAY)) : undefined,
      state,
      progress:
        state === "current" && row && span > 0
          ? Math.min(1, Math.max(0, (t - ms(row.start)) / span))
          : undefined,
      rebirth: rebirth || undefined,
    };
  };

  const phases = phaseTable.map((phase) => step(phase, byHouse.get(phase.house), false));
  const rebirth = step(rebirthPhase, rebirthRow, true);

  const start = cycleRows[0]?.start;
  const end = rebirthRow?.start ?? cycleRows[cycleRows.length - 1]?.end;
  const progress =
    start && end && ms(end) > ms(start)
      ? Math.min(1, Math.max(0, (t - ms(start)) / (ms(end) - ms(start))))
      : 0;

  return {
    steps: [...phases, rebirth],
    phases,
    rebirth,
    current: phases.find((s) => s.state === "current") ?? null,
    start,
    end,
    progress,
  };
}
