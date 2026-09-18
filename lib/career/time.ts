/**
 * Career's date helpers, which stopped being Career's.
 *
 * These were written here when Career was the only page measuring a life in
 * ages. Love measures one too, and a second copy of `YEAR_MS` is precisely the
 * drift this file was created to prevent — so the definitions moved up to
 * `@/lib/chart-time` and this re-exports them.
 *
 * Kept as a file rather than deleted so the dozen imports of `./time` across
 * `lib/career` do not all have to change to prove a point about where a
 * constant lives.
 */
export { YEAR_MS, ageAtISO, birthMsOf, isoAtAge } from "@/lib/chart-time";
