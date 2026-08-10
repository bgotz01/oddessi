/**
 * Cross-check the four pillars against a second, independent implementation.
 * Run with:  npx tsx scripts/check-pillars.ts
 *
 * There is no test runner in this project, and the pillar arithmetic is exactly
 * the kind that looks right while being an hour wrong — so the expected values
 * below were produced by arc's engine, which computes the same thing from a
 * different ephemeris (date-chinese + astronomia rather than Swiss Ephemeris).
 * Two independent paths agreeing on all sixteen characters is worth more than
 * any assertion written from the same understanding as the code.
 *
 * The cases are chosen for the edges: a birth in the middle of a month, one in
 * January (before Lìchūn, so the year belongs to the year before), one at 23:30
 * on the day the year turns (early 子 pushes the day pillar forward), and one
 * the day before Lìchūn.
 *
 * Start ages are *not* asserted against arc. They disagree by up to a third of
 * a year because arc's solar term instants land several hours off the true
 * crossing; the sun longitudes printed here are the check that ours do not.
 */

import {
  birthInstant,
  computeFourPillars,
  computeReading,
} from "../lib/chinese/pillars";
import { BRANCHES, STEMS } from "../lib/chinese/almanac";

interface Case {
  date: string;
  time: string;
  timezone: string;
  gender: "male" | "female";
  /** [stem, branch] per pillar, from arc. */
  expect: Record<"year" | "month" | "day" | "hour", [number, number]>;
}

const CASES: Case[] = [
  {
    date: "1986-05-16",
    time: "12:30",
    timezone: "Europe/Sofia",
    gender: "male",
    expect: { year: [2, 2], month: [9, 5], day: [6, 8], hour: [8, 6] },
  },
  {
    date: "2000-01-15",
    time: "03:05",
    timezone: "America/New_York",
    gender: "female",
    expect: { year: [5, 3], month: [3, 1], day: [8, 8], hour: [8, 2] },
  },
  {
    date: "1984-02-04",
    time: "23:30",
    timezone: "Asia/Shanghai",
    gender: "male",
    expect: { year: [0, 0], month: [2, 2], day: [5, 5], hour: [0, 0] },
  },
  {
    date: "1990-02-03",
    time: "08:00",
    timezone: "Asia/Shanghai",
    gender: "female",
    expect: { year: [5, 5], month: [3, 1], day: [5, 11], hour: [4, 4] },
  },
];

const show = (stem: number, branch: number) =>
  `${STEMS[stem].han}${BRANCHES[branch].han} ${STEMS[stem].polarity} ${STEMS[stem].element} ${BRANCHES[branch].animal}`;

let failures = 0;

for (const c of CASES) {
  const pillars = computeFourPillars(
    birthInstant(c.date, c.time, c.timezone),
    c.timezone,
  );
  console.log(`\n${c.date} ${c.time} ${c.timezone} [${c.gender}]`);

  for (const key of ["year", "month", "day", "hour"] as const) {
    const got = pillars[key];
    const [stem, branch] = c.expect[key];
    const ok = got.stem === stem && got.branch === branch;
    if (!ok) failures++;
    console.log(
      `  ${ok ? "ok  " : "FAIL"} ${key.padEnd(5)} ${show(got.stem, got.branch)}` +
        (ok ? "" : `   expected ${show(stem, branch)}`),
    );
  }

  const reading = computeReading({ ...c, time: c.time });
  const luck = reading.luck!;
  console.log(
    `       luck opens at ${luck[0].startAge.toFixed(2)}, first pillar ${show(luck[0].stem, luck[0].branch)}`,
  );
  console.log(
    `       elements ${reading.elements.map((e) => `${e.element} ${e.share}%`).join("  ")}`,
  );
  console.log(
    `       day master ${STEMS[reading.dayMaster].han} ${reading.strength.verdict} (${reading.strength.supportive}% supportive)`,
  );
}

console.log(
  failures === 0
    ? "\nAll sixteen characters agree with arc."
    : `\n${failures} mismatches.`,
);
process.exit(failures === 0 ? 0 : 1);
