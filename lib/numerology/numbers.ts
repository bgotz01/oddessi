/**
 * The arithmetic, and nothing else.
 *
 * Numerology is the one system here with no ephemeris behind it: every number
 * on the page comes out of a name and a date by addition. That makes this file
 * short and makes it the only place a reading can be wrong, so the conventions
 * it picks are written down rather than left implied.
 *
 * Ported from arc's `lib/numerology/*`, which had the same formulas spread over
 * five files with four private copies of the reduction helper. The formulas are
 * unchanged; the one deliberate divergence is the vowel rule, noted at
 * `isVowel` below.
 *
 * No prose lives here. What a number *means* is in `lexicon.ts`, kept apart for
 * the same reason the almanac and the drawer are kept apart on the Eastern
 * side: the calculation should never have to import an adjective.
 */

// ─── Number types ─────────────────────────────────────────────────────────────

/**
 * Numbers reachable by sums of positive integers, with masters kept.
 * Life Path, Expression, Soul Urge, Personality, and Pinnacle all land here.
 * Zero is excluded because no sum of positive integers produces it.
 */
export type StandardNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;

/**
 * Numbers reachable by the Challenge position.
 * Challenges are absolute differences of reduced components, so:
 * - 0 is a real output (equal components cancel).
 * - 9 is reachable when one component is a master and the difference lands there
 *   before final reduction (e.g. |22 − 4| = 18 → 9).
 * - 11, 22, 33 are never kept — a challenge of 11 reduces to 2.
 */
export type ChallengeNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Numbers reachable by the Essence position.
 * Transit letter values sum to a number reduced keeping 11 and 22 (33 is not
 * reachable from letter values in the Pythagorean table).
 */
export type EssenceNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22;

/** The personal year runs 1–9 strictly. Masters are reduced here. */
export type YearNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/** The three master numbers. */
export type MasterNumber = 11 | 22 | 33;

/**
 * The full numeric vocabulary: every value that can appear anywhere in a
 * reading. Use a narrower type where the domain is known.
 */
export type CoreNumber = 0 | StandardNumber;

// ─── Reduction ────────────────────────────────────────────────────────────────

const MASTERS: readonly number[] = [11, 22, 33];

/**
 * The Pythagorean square: A–I are 1–9, then J–R and S–Z start over.
 *
 * Note Z=8 rather than 9 — the third row is only eight letters long. This is
 * the standard table and not a typo, though it looks like one every time.
 */
const LETTER_VALUES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

const HARD_VOWELS = new Set(["A", "E", "I", "O", "U"]);

function digitSum(n: number): number {
  let sum = 0;
  for (let rest = Math.abs(n); rest > 0; rest = Math.floor(rest / 10)) {
    sum += rest % 10;
  }
  return sum;
}

/**
 * Add the digits until one is left, stopping early on a master number.
 *
 * Pass `keep: []` for positions that do not honour masters:
 * - Personal Year (must land in 1–9, a run of nine has no room for 11)
 * - Challenges (differences; masters reduced to their base)
 *
 * Pass `keep: [11, 22]` for Essence (33 is not reachable from letter values).
 * Pass `keep: MASTERS` (default) for everything else.
 */
export function reduce(n: number, keep: readonly number[] = MASTERS): number {
  let value = Math.abs(n);
  while (value > 9 && !keep.includes(value)) value = digitSum(value);
  return value;
}

// ─── Names ────────────────────────────────────────────────────────────────────

export interface Letter {
  char: string;
  value: number;
  vowel: boolean;
}

export interface NamePart {
  /**
   * As written, before normalisation. Used only for display — all arithmetic
   * operates on `letters`, which are already stripped and uppercased.
   */
  raw: string;
  letters: Letter[];
}

/**
 * Whether the letter at `index` counts as a vowel, within its own name part.
 *
 * A, E, I, O and U always do. Y is the argument, and this is where the port
 * diverges from arc, which counted Y as a vowel whenever it was not the very
 * first letter of the *whole* name — so the Y in "Yolanda Young" was a
 * consonant in the first name and a vowel in the second, which is not a rule so
 * much as an artefact of joining the parts before testing them.
 *
 * The rule here: Y is a vowel when neither neighbour within the same part is
 * a hard vowel. Lynn → vowel; Yolanda → consonant; Bryan → consonant.
 * W is never a vowel on its own.
 *
 * No rule gets every name right, which is why the page prints the letters and
 * marks which ones counted.
 */
function isVowel(letters: string[], index: number): boolean {
  const char = letters[index];
  if (HARD_VOWELS.has(char)) return true;
  if (char !== "Y") return false;
  const before = letters[index - 1];
  const after = letters[index + 1];
  return !HARD_VOWELS.has(before ?? "") && !HARD_VOWELS.has(after ?? "");
}

/**
 * Normalise and split a written name into parts for arithmetic.
 *
 * Normalisation rules (applied before splitting):
 * - Trimmed and collapsed to single spaces between words.
 * - Case-folded to uppercase.
 * - Non-ASCII letters (accented, diacritics) are not transliterated — they are
 *   stripped. A name like "André" is treated as "ANDR". If the chart owner
 *   wants the accent counted they should save the name as "Andre".
 * - Hyphens join two words into one part: "Mary-Jane" → one part "MARYJANE",
 *   contributing one clock in Essence, not two. This is the most opinionated
 *   rule; it is documented here because it affects Essence most visibly.
 * - Apostrophes and all other non-letter characters are stripped.
 * - Particles ("de", "la", "van", etc.) are treated as full parts with their
 *   own letter values and their own Essence clock. There is no standard
 *   convention for excluding them.
 * - Empty parts (nothing but stripped characters) are discarded.
 */
export function readName(name: string): NamePart[] {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((raw) => {
      const chars = raw.toUpperCase().replace(/[^A-Z]/g, "").split("");
      return {
        raw,
        letters: chars.map((char, index) => ({
          char,
          value: LETTER_VALUES[char] ?? 0,
          vowel: isVowel(chars, index),
        })),
      };
    })
    .filter((part) => part.letters.length > 0);
}

function sumLetters(
  parts: NamePart[],
  include: (letter: Letter) => boolean,
): number {
  return parts.reduce(
    (total, part) =>
      total +
      part.letters.reduce((n, l) => (include(l) ? n + l.value : n), 0),
    0,
  );
}

/** Every letter of the name. Sometimes called the Destiny number. */
export function expression(parts: NamePart[]): StandardNumber {
  return reduce(sumLetters(parts, () => true)) as StandardNumber;
}

/** The vowels only. Sometimes called the Heart's Desire. */
export function soulUrge(parts: NamePart[]): StandardNumber {
  return reduce(sumLetters(parts, (l) => l.vowel)) as StandardNumber;
}

/** The consonants only. What the name shows before anything is said. */
export function personality(parts: NamePart[]): StandardNumber {
  return reduce(sumLetters(parts, (l) => !l.vowel)) as StandardNumber;
}

// ─── Dates ────────────────────────────────────────────────────────────────────

export interface BirthDate {
  year: number;
  /** 1-indexed, as written rather than as `Date` counts them. */
  month: number;
  day: number;
}

/**
 * Month, day and year each reduced first (masters kept), then added and
 * reduced again.
 *
 * The order matters: adding all eight digits straight across gives a different
 * answer for some dates, because reducing each component first can preserve a
 * master that the flat sum would carry away. This is the component-first method
 * and the one most commonly published.
 */
export function lifePath(birth: BirthDate): StandardNumber {
  const sum =
    reduce(birth.month) + reduce(birth.day) + reduce(birth.year);
  return reduce(sum) as StandardNumber;
}

/**
 * The calendar year's personal year number for this birth date.
 *
 * Reduced all the way — no masters. A nine-year run must land in 1–9;
 * an 11 would create a run of ten and break the cycle.
 *
 * In this system the year turns on 1 January rather than on the birthday.
 * Birthday-transition systems exist and give different answers for the months
 * before the birthday in any given year.
 */
export function personalYear(birth: BirthDate, year: number): YearNumber {
  const sum =
    reduce(birth.month, []) + reduce(birth.day, []) + reduce(year, []);
  return reduce(sum, []) as YearNumber;
}

/**
 * The nine calendar years of the run the given year falls in.
 *
 * The sequence is exactly periodic — the digital root of consecutive years
 * climbs by one and wraps at nine — so the year a run opened can be found by
 * stepping back from the current position rather than by searching.
 */
export function personalYearRun(
  birth: BirthDate,
  year: number,
): Array<{ year: number; number: YearNumber }> {
  const opened = year - (personalYear(birth, year) - 1);
  return Array.from({ length: 9 }, (_, i) => ({
    year: opened + i,
    number: personalYear(birth, opened + i),
  }));
}

// ─── Pinnacles and challenges ─────────────────────────────────────────────────

export interface Pinnacle {
  index: 1 | 2 | 3 | 4;
  number: StandardNumber;
  /** The obstacle inside the chapter. ChallengeNumber (0 is a real answer). */
  challenge: ChallengeNumber;
  startAge: number;
  /** Null on the fourth, which does not close. */
  endAge: number | null;
  startYear: number;
  endYear: number | null;
}

/**
 * The four chapters, from the birth date alone.
 *
 * Pinnacle numbers: month+day, day+year, pinnacle1+pinnacle2, month+year.
 * All reductions keep masters — a 22nd of the month enters each sum as 22.
 * The third pinnacle is built from the already-reduced first two, so a master
 * in either is preserved through the intermediate stage.
 *
 * Challenge numbers: the absolute differences of the same four pairs, reduced
 * without masters. A challenge of 11 would be an obstacle of 2 wearing a
 * costume, so it is flattened. Zero is a valid output when the two components
 * are equal.
 *
 * The first chapter closes at 36 minus the Life Path (reduced without masters
 * for this calculation, or a Life Path 33 would close the chapter before birth).
 */
export function pinnacles(birth: BirthDate): Pinnacle[] {
  // Components kept with masters for pinnacle sums.
  const month = reduce(birth.month);
  const day = reduce(birth.day);
  const year = reduce(birth.year);

  // Pinnacle numbers — each is a sum, masters kept throughout.
  const p1 = reduce(month + day);
  const p2 = reduce(day + year);
  const p3 = reduce(p1 + p2);
  const p4 = reduce(month + year);
  const numbers: StandardNumber[] = [p1, p2, p3, p4] as StandardNumber[];

  // Challenge numbers — absolute differences, masters flattened.
  const c1 = reduce(Math.abs(month - day), []);
  const c2 = reduce(Math.abs(day - year), []);
  const c3 = reduce(Math.abs(c1 - c2), []);
  const c4 = reduce(Math.abs(month - year), []);
  const challenges: ChallengeNumber[] = [c1, c2, c3, c4] as ChallengeNumber[];

  // First chapter length: 36 minus the life path, with life path reduced
  // without masters (a Life Path 33 would otherwise close before birth).
  const firstEnds = 36 - reduce(lifePath(birth), []);
  const bounds: Array<[number, number | null]> = [
    [0, firstEnds],
    [firstEnds + 1, firstEnds + 9],
    [firstEnds + 10, firstEnds + 18],
    [firstEnds + 19, null],
  ];

  return bounds.map(([startAge, endAge], i) => ({
    index: (i + 1) as 1 | 2 | 3 | 4,
    number: numbers[i],
    challenge: challenges[i],
    startAge,
    endAge,
    startYear: birth.year + startAge,
    endYear: endAge === null ? null : birth.year + endAge,
  }));
}

/**
 * Whether an age falls inside a chapter.
 *
 * One line, and exported anyway: three pages and the overview axis all ask it,
 * and the fourth chapter's open end is exactly the kind of thing that gets
 * written as `age <= p.endAge` in one of four places and silently drops the
 * chapter everyone is currently living in.
 */
export function pinnacleInForce(pinnacle: Pinnacle, age: number): boolean {
  return (
    age >= pinnacle.startAge &&
    (pinnacle.endAge === null || age <= pinnacle.endAge)
  );
}

// ─── Essence ──────────────────────────────────────────────────────────────────

export interface Transit {
  /** The part of the name this letter came from, for the page to label it. */
  part: string;
  letter: string;
  value: number;
  startAge: number;
  endAge: number;
}

export interface EssenceYear {
  age: number;
  year: number;
  /**
   * The sum of all concurrent transit letters, reduced keeping 11 and 22.
   * 33 is excluded from the keep list because no combination of Pythagorean
   * letter values can sum to 33 after reduction (the maximum single-letter
   * value is 9, and 33 requires a very specific path that is not reachable).
   */
  number: EssenceNumber;
  transits: Transit[];
}

/**
 * Which letter of a name part is ruling at a given age.
 *
 * Each letter holds for as many years as its value, in spelling order, and the
 * part starts over when it runs out — so the whole part repeats every
 * (sum of its values) years. That periodicity is used to jump straight into the
 * right pass rather than walking from birth.
 */
function transitAt(part: NamePart, age: number): Transit {
  const period = part.letters.reduce((n, l) => n + l.value, 0);
  let offset = age % period;
  let start = age - offset;

  for (const letter of part.letters) {
    if (offset < letter.value) {
      return {
        part: part.raw,
        letter: letter.char,
        value: letter.value,
        startAge: start,
        endAge: start + letter.value - 1,
      };
    }
    offset -= letter.value;
    start += letter.value;
  }

  // Unreachable: offset < period, and the loop consumes exactly `period`.
  throw new Error(`No transit letter for age ${age} in "${part.raw}"`);
}

/**
 * The year-by-year transit of the name, over a span of ages.
 *
 * Every part of the name contributes one ruling letter per year (its own clock,
 * running independently). The essence for a given age is the sum of all
 * concurrent transit letters, reduced keeping 11 and 22.
 *
 * Parts are defined by whitespace in the stored name — hyphens join two words
 * into one part (see readName). A three-word name produces three concurrent
 * clocks; a hyphenated name may produce fewer.
 */
export function essence(
  parts: NamePart[],
  birth: BirthDate,
  fromAge: number,
  toAge: number,
): EssenceYear[] {
  const years: EssenceYear[] = [];

  for (let age = Math.max(0, fromAge); age <= toAge; age++) {
    const transits = parts.map((part) => transitAt(part, age));
    years.push({
      age,
      year: birth.year + age,
      number: reduce(
        transits.reduce((n, t) => n + t.value, 0),
        [11, 22],
      ) as EssenceNumber,
      transits,
    });
  }

  return years;
}

// ─── The working ──────────────────────────────────────────────────────────────

/**
 * How one of the moving numbers was arrived at, in enough detail to print.
 *
 * The drawer shows the sum rather than asserting the answer, and the operands
 * have to come from here rather than be re-derived beside the markup — a second
 * copy of "month and day reduced first, then added" is a second place for the
 * convention to drift, and the whole argument of this file is that there is one.
 */
export interface Working {
  /** The operands in the order they were used, each already reduced. */
  operands: Array<{ label: string; value: number }>;
  operator: "+" | "−";
  /** What the operands came to, before the last reduction. */
  total: number;
  result: CoreNumber;
  /** False where the last step reduces past a master on purpose. */
  keepsMasters: boolean;
}

function working(
  operands: Array<{ label: string; value: number }>,
  operator: "+" | "−",
  keep: readonly number[],
): Working {
  const total =
    operator === "+"
      ? operands.reduce((n, o) => n + o.value, 0)
      : Math.abs(operands[0].value - operands[1].value);

  return {
    operands,
    operator,
    total,
    result: reduce(total, keep) as CoreNumber,
    keepsMasters: keep.length > 0,
  };
}

/**
 * The three reduced components every date-derived number here is built from.
 *
 * `keep` matters: pinnacles reduce with masters intact (a 22nd of the month
 * enters as 22); the personal year and challenges reduce all the way (the same
 * day enters as 4). Passing the wrong list produces a working whose arithmetic
 * does not match the number sitting next to it.
 */
function dateOperands(birth: BirthDate, keep: readonly number[]) {
  return {
    month: { label: `Month ${birth.month}`, value: reduce(birth.month, keep) },
    day: { label: `Day ${birth.day}`, value: reduce(birth.day, keep) },
    year: { label: `Year ${birth.year}`, value: reduce(birth.year, keep) },
  };
}

export function personalYearWorking(birth: BirthDate, year: number): Working {
  const { month, day } = dateOperands(birth, []);
  return working(
    [month, day, { label: `${year}`, value: reduce(year, []) }],
    "+",
    [],
  );
}

/**
 * Month+day, day+year, pinnacle1+pinnacle2, month+year — in that order.
 *
 * The third pinnacle's operands are the already-reduced first and second
 * pinnacles, not raw date components — masters present in those intermediate
 * results are preserved when they enter the third sum.
 */
export function pinnacleWorking(birth: BirthDate, index: 1 | 2 | 3 | 4): Working {
  const { month, day, year } = dateOperands(birth, MASTERS);

  if (index === 1) return working([month, day], "+", MASTERS);
  if (index === 2) return working([day, year], "+", MASTERS);
  if (index === 4) return working([month, year], "+", MASTERS);

  // Third: built from the reduced first and second pinnacles.
  return working(
    [
      { label: "First pinnacle", value: reduce(month.value + day.value) },
      { label: "Second pinnacle", value: reduce(day.value + year.value) },
    ],
    "+",
    MASTERS,
  );
}

/**
 * The same pairs as differences. Components are taken with masters kept (same
 * as pinnacles), then the absolute difference is reduced without masters.
 * A challenge of 11 is an obstacle of 2; the difference is what is kept.
 */
export function challengeWorking(birth: BirthDate, index: 1 | 2 | 3 | 4): Working {
  const { month, day, year } = dateOperands(birth, MASTERS);

  if (index === 1) return working([month, day], "−", []);
  if (index === 2) return working([day, year], "−", []);
  if (index === 4) return working([month, year], "−", []);

  return working(
    [
      { label: "First challenge", value: reduce(Math.abs(month.value - day.value), []) },
      { label: "Second challenge", value: reduce(Math.abs(day.value - year.value), []) },
    ],
    "−",
    [],
  );
}

/** The ruling letters of one year, added. 33 is unreachable from letters. */
export function essenceWorking(year: EssenceYear): Working {
  return working(
    year.transits.map((t) => ({
      label: `${t.letter} · ${t.part}`,
      value: t.value,
    })),
    "+",
    [11, 22],
  );
}

// ─── Lexicon helpers ──────────────────────────────────────────────────────────

/** True for the three numbers that are never reduced past themselves. */
export function isMaster(n: CoreNumber): n is MasterNumber {
  return n === 11 || n === 22 || n === 33;
}

/**
 * What a master reduces to. Returns a precise type (2 | 4 | 6) rather than the
 * full CoreNumber, so callers can rely on TypeScript to carry the relationship.
 */
export function reducesTo(n: CoreNumber): 2 | 4 | 6 | null {
  if (n === 11) return 2;
  if (n === 22) return 4;
  if (n === 33) return 6;
  return null;
}

// ─── The whole reading ────────────────────────────────────────────────────────

export interface NumerologyReading {
  /** The name the numbers were taken from, as stored. */
  name: string;
  parts: NamePart[];
  /**
   * False when the stored name is a single word. Every name-derived number
   * needs the whole birth name, and a first name alone produces answers that
   * look computed and are not — so they are withheld rather than shown.
   */
  fullName: boolean;
  birth: BirthDate;
  age: number;
  lifePath: StandardNumber;
  /** Null when `fullName` is false. */
  nameNumbers: {
    expression: StandardNumber;
    soulUrge: StandardNumber;
    personality: StandardNumber;
  } | null;
  personalYear: {
    year: number;
    number: YearNumber;
    run: Array<{ year: number; number: YearNumber }>;
  };
  pinnacles: Pinnacle[];
  /** Null when `fullName` is false. */
  essence: EssenceYear[] | null;
}

/**
 * The stored `YYYY-MM-DD` as the three numbers this file works in.
 *
 * Parsed by hand rather than through `Date`, which would apply a timezone to a
 * date that has none: the birth date is a calendar fact, and shifting it by an
 * hour can move a 1st to a 31st and change every number on the page.
 */
export function birthDateFromISO(iso: string): BirthDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;
  const [, year, month, day] = match;
  return { year: Number(year), month: Number(month), day: Number(day) };
}

/** Whole years lived, as of `on`. */
export function ageOn(birth: BirthDate, on: Date): number {
  const years = on.getUTCFullYear() - birth.year;
  const hadBirthday =
    on.getUTCMonth() + 1 > birth.month ||
    (on.getUTCMonth() + 1 === birth.month && on.getUTCDate() >= birth.day);
  return years - (hadBirthday ? 0 : 1);
}

/** How far either side of today the essence table runs. */
const ESSENCE_SPAN = 6;

export function computeReading(
  input: { name: string; birth: BirthDate },
  now: Date = new Date(),
): NumerologyReading {
  const parts = readName(input.name);
  const fullName = parts.length >= 2;
  const age = ageOn(input.birth, now);
  const year = now.getUTCFullYear();

  return {
    name: input.name,
    parts,
    fullName,
    birth: input.birth,
    age,
    lifePath: lifePath(input.birth),
    nameNumbers: fullName
      ? {
        expression: expression(parts),
        soulUrge: soulUrge(parts),
        personality: personality(parts),
      }
      : null,
    personalYear: {
      year,
      number: personalYear(input.birth, year),
      run: personalYearRun(input.birth, year),
    },
    pinnacles: pinnacles(input.birth),
    essence: fullName
      ? essence(parts, input.birth, age - ESSENCE_SPAN, age + ESSENCE_SPAN)
      : null,
  };
}
