import * as swisseph from "swisseph-v2";
import { DateTime } from "luxon";
import {
  BRANCHES,
  ELEMENTS,
  HIDDEN_STEMS,
  STEMS,
  generatedBy,
  type BranchIndex,
  type Element,
  type StemIndex,
} from "./almanac";

/**
 * 四柱 — the four pillars of a birth, computed from the sun rather than from
 * the calendar.
 *
 * The thing to understand about this file: a BaZi year does not begin on 1
 * January, and a BaZi month does not begin on the 1st. Both begin at 節 (jié)
 * solar terms — the instants when the sun's apparent ecliptic longitude crosses
 * 315°, 345°, 15°, and so on every 30°. 立春 (Lìchūn, 315°) starts both the year
 * and the Tiger month, somewhere around 4 February.
 *
 * So the boundaries are astronomical, and this module asks Swiss Ephemeris for
 * them — the same library the Western side of the app is calculated with. A
 * lookup table of Chinese New Year dates would be close but wrong twice over:
 * wrong by up to a fortnight (the zodiac year turns at Lìchūn, not at the lunar
 * New Year), and silently useless outside the years it happens to list.
 *
 * Server only. `swisseph-v2` is a native module — see `serverExternalPackages`
 * in next.config.ts.
 */

export interface Pillar {
  stem: StemIndex;
  branch: BranchIndex;
}

export interface FourPillars {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
}

export type Gender = "male" | "female";

export interface LuckPillar extends Pillar {
  /** Age at which this ten-year pillar takes over. Fractional by construction. */
  startAge: number;
  endAge: number;
  startDate: string;
  endDate: string;
}

export interface ElementShare {
  element: Element;
  /** Percentage of the chart's eight characters, hidden stems included. */
  share: number;
}

export interface Reading {
  pillars: FourPillars;
  /** The Day Master: the stem of the day pillar, which is the chart's subject. */
  dayMaster: StemIndex;
  /** How much of the chart supports the Day Master — see `weighDayMaster`. */
  strength: {
    supportive: number;
    verdict: "Unsupported" | "Balanced" | "Well supported";
    inSeason: boolean;
  };
  elements: ElementShare[];
  /** Elements with no presence at all. Traditionally the loudest thing on a chart. */
  missing: Element[];
  /** The jié window the birth fell inside — the solar month, as instants. */
  month: { startsAt: string; endsAt: string };
  /** Ten-year luck pillars. Null when gender is unknown: the direction depends on it. */
  luck: LuckPillar[] | null;
  gender: Gender | null;
}

const MS_PER_DAY = 86_400_000;
const JD_UNIX_EPOCH = 2440587.5;
/** Mean solar motion, degrees per day. Only ever used as a first guess. */
const DEG_PER_DAY = 0.985_647_3;
/** 1984 was 甲子 — stem 0, branch 0. Every other year is counted from it. */
const SEXAGENARY_EPOCH_YEAR = 1984;
/** Lìchūn: the sun at 315°, where both the year and the Tiger month begin. */
const LICHUN_LONGITUDE = 315;

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

/** Signed difference between two longitudes, in (-180, 180]. */
function delta(target: number, current: number): number {
  return mod(target - current + 180, 360) - 180;
}

function toJulianDay(date: Date): number {
  return date.getTime() / MS_PER_DAY + JD_UNIX_EPOCH;
}

function fromJulianDay(jd: number): Date {
  return new Date((jd - JD_UNIX_EPOCH) * MS_PER_DAY);
}

/**
 * Apparent geocentric ecliptic longitude of the sun, in degrees.
 *
 * `SEFLG_MOSEPH` asks for the Moshier analytic theory, which needs no ephemeris
 * files on disk. It is accurate to well under an arcsecond for the sun, so a
 * solar term instant lands within a second or two of the tabulated one — far
 * inside the tolerance of anything read off it here.
 */
function sunLongitude(jd: number): number {
  const result = swisseph.swe_calc_ut(jd, swisseph.SE_SUN, swisseph.SEFLG_MOSEPH);
  if (!("longitude" in result)) {
    throw new Error(
      `Swiss Ephemeris could not place the sun at JD ${jd}: ${JSON.stringify(result)}`,
    );
  }
  return result.longitude;
}

/**
 * The instant the sun reaches `targetLongitude`, searched from `seedJd`.
 *
 * Newton's method on a function that is very nearly linear — the sun moves
 * about a degree a day — so it converges in three or four passes. The guard is
 * there so a pathological seed cannot spin.
 */
function solarTermJd(targetLongitude: number, seedJd: number): number {
  let jd = seedJd;
  for (let pass = 0; pass < 12; pass++) {
    const step = delta(targetLongitude, sunLongitude(jd)) / DEG_PER_DAY;
    jd += step;
    if (Math.abs(step) < 1e-6) return jd; // ~0.1 seconds
  }
  return jd;
}

/** Julian Day Number for a civil date at midnight — Fliegel–Van Flandern. */
function jdnFromCivilDate(y: number, m: number, d: number): number {
  const a = Math.floor((14 - m) / 12);
  const y2 = y + 4800 - a;
  const m2 = m + 12 * a - 3;
  return (
    d +
    Math.floor((153 * m2 + 2) / 5) +
    365 * y2 +
    Math.floor(y2 / 4) -
    Math.floor(y2 / 100) +
    Math.floor(y2 / 400) -
    32045
  );
}

/**
 * The year pillar, bounded at Lìchūn rather than at 1 January.
 *
 * Someone born on 20 January 1986 belongs to the 乙丑 year of 1985; the Fire
 * Tiger does not arrive until 4 February.
 */
function yearPillar(instant: Date): Pillar {
  const jd = toJulianDay(instant);
  const gregorianYear = instant.getUTCFullYear();
  // Seeded at 4 February, which is never more than a day or so from Lìchūn.
  const lichun = solarTermJd(
    LICHUN_LONGITUDE,
    jdnFromCivilDate(gregorianYear, 2, 4) - 0.5,
  );
  const year = jd >= lichun ? gregorianYear : gregorianYear - 1;
  const since = year - SEXAGENARY_EPOCH_YEAR;
  return { stem: mod(since, 10) as StemIndex, branch: mod(since, 12) as BranchIndex };
}

/**
 * Which solar month the birth fell in, as an offset from the Tiger month.
 * 0 = 寅 (Tiger, from Lìchūn), 1 = 卯, and so on round to 11 = 丑.
 */
function solarMonthIndex(instant: Date): number {
  const longitude = sunLongitude(toJulianDay(instant));
  return Math.floor(mod(longitude - LICHUN_LONGITUDE, 360) / 30);
}

/**
 * The month pillar. The branch follows the solar month directly; the stem comes
 * from the year stem by the Five Tigers rule (年上起月) — a 甲 or 己 year opens
 * its Tiger month on 丙, a 乙 or 庚 year on 戊, and so on.
 */
function monthPillar(instant: Date, yearStem: StemIndex): Pillar {
  const index = solarMonthIndex(instant);
  const tigerStem = ((yearStem % 5) * 2 + 2) % 10;
  return {
    stem: mod(tigerStem + index, 10) as StemIndex,
    branch: mod(index + 2, 12) as BranchIndex,
  };
}

/** Local wall-clock parts of an instant, in the birth timezone. */
function localParts(instant: Date, timezone: string) {
  const local = DateTime.fromJSDate(instant, { zone: timezone });
  if (!local.isValid) throw new Error(`Unknown timezone: ${timezone}`);
  return { year: local.year, month: local.month, day: local.day, hour: local.hour, minute: local.minute };
}

/**
 * The day pillar, counted straight off the Julian Day Number — the sexagenary
 * day count has run unbroken for millennia, so no epoch search is needed.
 *
 * 早子時: the day turns at 23:00, not at midnight. A birth in the late Rat hour
 * belongs to the next day's pillar. Done in JDN space so a DST jump cannot
 * move it.
 */
function dayPillar(instant: Date, timezone: string): Pillar {
  const { year, month, day, hour } = localParts(instant, timezone);
  const jdn = jdnFromCivilDate(year, month, day) + (hour === 23 ? 1 : 0);
  return {
    stem: mod(jdn + 9, 10) as StemIndex,
    branch: mod(jdn + 1, 12) as BranchIndex,
  };
}

/** Which two-hour watch a local time falls in. 子 straddles midnight. */
function hourBranch(hour: number, minute: number): BranchIndex {
  const minutes = hour * 60 + minute;
  if (minutes >= 23 * 60 || minutes < 60) return 0;
  return (Math.floor((minutes - 60) / 120) + 1) as BranchIndex;
}

/**
 * The hour pillar. Its stem is fixed by the day stem: the Rat hour of a 甲 day
 * is 甲, of a 乙 day is 丙, and the rest follow round the cycle.
 */
function hourPillar(instant: Date, timezone: string, dayStem: StemIndex): Pillar {
  const { hour, minute } = localParts(instant, timezone);
  const branch = hourBranch(hour, minute);
  const ziStem = (dayStem % 5) * 2;
  return { stem: mod(ziStem + branch, 10) as StemIndex, branch };
}

/**
 * The eight characters weighed by element.
 *
 * Each of the four stems counts once. Each branch spends its hundred on the
 * stems hidden inside it, so 丑 gives most of its weight to Earth but still
 * reports the Water and Metal it carries.
 */
function weighElements(pillars: FourPillars): ElementShare[] {
  const weight: Record<Element, number> = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };

  for (const pillar of [pillars.year, pillars.month, pillars.day, pillars.hour]) {
    weight[STEMS[pillar.stem].element] += 100;
    for (const hidden of HIDDEN_STEMS[pillar.branch]) {
      weight[STEMS[hidden.stem].element] += hidden.weight;
    }
  }

  const total = ELEMENTS.reduce((sum, e) => sum + weight[e], 0);
  return ELEMENTS.map((element) => ({
    element,
    share: Math.round((weight[element] / total) * 1000) / 10,
  }));
}

/**
 * How well the chart carries its Day Master.
 *
 * "Supportive" is the share held by the Day Master's own element plus the
 * element that generates it — its resource. The thresholds are the conventional
 * rough reading and are stated here rather than hidden: under 30% the self is
 * outnumbered, over 45% it is well fed. `inSeason` is the older and blunter
 * test — whether the month, which sets the season, is of a supportive element.
 */
function weighDayMaster(
  dayMaster: StemIndex,
  monthBranch: BranchIndex,
  elements: ElementShare[],
): Reading["strength"] {
  const own = STEMS[dayMaster].element;
  const resource = generatedBy(own);
  const shareOf = (e: Element) => elements.find((x) => x.element === e)?.share ?? 0;
  const supportive = Math.round((shareOf(own) + shareOf(resource)) * 10) / 10;

  const seasonal = BRANCHES[monthBranch].element;
  return {
    supportive,
    verdict: supportive < 30 ? "Unsupported" : supportive > 45 ? "Well supported" : "Balanced",
    inSeason: seasonal === own || seasonal === resource,
  };
}

/**
 * 大運 — the ten-year luck pillars.
 *
 * They start from the month pillar and step through the sexagenary cycle,
 * forwards for a man born in a Yang year or a woman born in a Yin year, and
 * backwards otherwise. The age they begin at is the distance from the birth to
 * the adjacent solar term, counted at the traditional three days to the year —
 * which is why it lands on a fraction rather than on a birthday.
 */
function luckPillars(
  instant: Date,
  yearStemIndex: StemIndex,
  month: Pillar,
  gender: Gender,
  count = 8,
): LuckPillar[] {
  const yearIsYang = STEMS[yearStemIndex].polarity === "Yang";
  const forward = gender === "male" ? yearIsYang : !yearIsYang;
  const step = forward ? 1 : -1;

  const index = solarMonthIndex(instant);
  const jd = toJulianDay(instant);
  // The jié terms bracketing the birth: this month's opening and the next.
  const opened = solarTermJd(mod(LICHUN_LONGITUDE + index * 30, 360), jd - 20);
  const closes = solarTermJd(mod(LICHUN_LONGITUDE + (index + 1) * 30, 360), jd + 10);
  const startAge = (forward ? closes - jd : jd - opened) / 3;

  const pillars: LuckPillar[] = [];
  let current: Pillar = {
    stem: mod(month.stem + step, 10) as StemIndex,
    branch: mod(month.branch + step, 12) as BranchIndex,
  };

  for (let i = 0; i < count; i++) {
    const from = startAge + i * 10;
    const to = from + 10;
    pillars.push({
      ...current,
      startAge: from,
      endAge: to,
      startDate: addYears(instant, from).toISOString(),
      endDate: addYears(instant, to).toISOString(),
    });
    current = {
      stem: mod(current.stem + step, 10) as StemIndex,
      branch: mod(current.branch + step, 12) as BranchIndex,
    };
  }

  return pillars;
}

/** Tropical years, for dating a luck pillar. Exact to the day is meaningless here. */
function addYears(from: Date, years: number): Date {
  return new Date(from.getTime() + years * 365.2425 * MS_PER_DAY);
}

/**
 * Turn stored birth details into a birth *instant*. The day and hour pillars
 * are wall-clock creatures, so the timezone is not optional — an hour's error
 * moves the hour pillar, and midnight births move the day.
 */
export function birthInstant(date: string, time: string | null, timezone: string): Date {
  const local = DateTime.fromISO(`${date}T${time?.trim() || "00:00"}`, { zone: timezone });
  if (!local.isValid) {
    throw new Error(local.invalidExplanation ?? `Invalid birth moment: ${date} ${time}`);
  }
  return local.toUTC().toJSDate();
}

export function computeFourPillars(instant: Date, timezone: string): FourPillars {
  const year = yearPillar(instant);
  const month = monthPillar(instant, year.stem);
  const day = dayPillar(instant, timezone);
  const hour = hourPillar(instant, timezone, day.stem);
  return { year, month, day, hour };
}

/** Everything the Chinese section reads, from one birth. */
export function computeReading(params: {
  date: string;
  time: string | null;
  timezone: string;
  gender: Gender | null;
}): Reading {
  const instant = birthInstant(params.date, params.time, params.timezone);
  const pillars = computeFourPillars(instant, params.timezone);
  const elements = weighElements(pillars);
  const index = solarMonthIndex(instant);
  const jd = toJulianDay(instant);

  return {
    pillars,
    dayMaster: pillars.day.stem,
    strength: weighDayMaster(pillars.day.stem, pillars.month.branch, elements),
    elements,
    missing: elements.filter((e) => e.share === 0).map((e) => e.element),
    month: {
      startsAt: fromJulianDay(
        solarTermJd(mod(LICHUN_LONGITUDE + index * 30, 360), jd - 20),
      ).toISOString(),
      endsAt: fromJulianDay(
        solarTermJd(mod(LICHUN_LONGITUDE + (index + 1) * 30, 360), jd + 10),
      ).toISOString(),
    },
    luck: params.gender
      ? luckPillars(instant, pillars.year.stem, pillars.month, params.gender)
      : null,
    gender: params.gender,
  };
}
