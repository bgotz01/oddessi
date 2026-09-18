/**
 * The one definition of a year, and the two conversions built on it.
 *
 * Four files were carrying their own `YEAR_MS` and their own
 * `Date.parse(`${birth.slice(0, 10)}T12:00:00Z`)`. Both are easy to write
 * correctly and easy to write *differently* — a curve that samples on a
 * 365.25-day year and a strip that places bars on a 365.2425-day one drift
 * apart by a fortnight over a life, which is invisible in review and wrong on
 * screen.
 *
 * Noon UTC rather than midnight, because a birth date is a calendar day and
 * midnight is the boundary between two of them: parsing at midnight puts a
 * chart born on the 1st into the 31st for every reader west of Greenwich.
 */

export const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;

/** The birth instant every age on the page is measured from. */
export function birthMsOf(birthISO: string): number {
  return Date.parse(`${birthISO.slice(0, 10)}T12:00:00Z`);
}

/** The calendar day an age falls on, in the format the band feed uses. */
export function isoAtAge(birthMs: number, age: number): string {
  return new Date(birthMs + age * YEAR_MS).toISOString().slice(0, 10);
}

/** How old this chart is on a given day. */
export function ageAtISO(birthMs: number, iso: string): number {
  return (Date.parse(iso) - birthMs) / YEAR_MS;
}
