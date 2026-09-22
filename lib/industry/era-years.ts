// lib/industry/era-years.ts

/**
 * Turning an era's written date range into years, and years into a position
 * relative to the reader.
 *
 * Shared because three clocks now need it and they are written the same way.
 * Each planet's table gives its eras as a historian writes a date range, with
 * the century dropped when it is obvious — obvious to a reader, not to an axis
 * and not to the rule that decides which era is running now.
 */

/**
 * "1956–62" → 1962, "1996–2003" → 2003.
 *
 * A two-digit end takes its start's century and rolls forward one when that
 * would put the end before the beginning.
 */
function expandEndYear(startYear: number, token: string): number {
  const value = Number(token);
  if (token.length === 4) return value;
  const century = Math.floor(startYear / 100) * 100;
  const candidate = century + value;
  return candidate >= startYear ? candidate : candidate + 100;
}

/** Boundaries are half-open: an era owns [startYear, endYear). */
export function eraYears(dates: string): { startYear: number; endYear: number } {
  const [from, to] = dates.split(/[–—-]/).map((part) => part.trim());
  const startYear = Number(from);
  return { startYear, endYear: expandEndYear(startYear, to) };
}

export type EraStatus = "completed" | "active" | "upcoming";

/**
 * Where an era sits relative to the reader, which is not the same question as
 * whether it has been written up. The era you are standing in routinely has no
 * reading yet, and the two facts are reported separately rather than collapsed
 * into one dashed edge.
 */
export function eraStatus(dates: string, year: number): EraStatus {
  const { startYear, endYear } = eraYears(dates);
  if (year >= endYear) return "completed";
  if (year >= startYear) return "active";
  return "upcoming";
}

/** The vocabulary the macro era drawers already use for the same question. */
export const ERA_STATUS_LABEL: Record<EraStatus, string> = {
  completed: "Closed",
  active: "Active",
  upcoming: "Ahead",
};
