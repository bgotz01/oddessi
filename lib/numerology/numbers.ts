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

/** 1–9, plus the three master numbers, which are never reduced past themselves. */
export type CoreNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;

/** The personal year runs 1–9 and starts again. Masters are reduced here. */
export type YearNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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
 * Pass `keep: []` for the two places that do not honour masters — the personal
 * year, which is a position in a nine-year run and so must land in 1–9, and the
 * challenges, which are differences and can legitimately be 0.
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
  /** As written, before the letters were stripped out of it. */
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
 * The rule here is the ordinary one: Y is a vowel when it is carrying the
 * sound itself, which in practice means neither neighbour is a vowel. Lynn and
 * Yvette get a vowel; Yolanda and Bryan get a consonant. W is never a vowel on
 * its own — arc declared a set for it and then never consulted it.
 *
 * No rule gets every name right, which is why the page prints the letters and
 * marks which ones counted rather than only showing the totals.
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
 * Split a written name into parts, each spelled out with its values.
 *
 * Anything that is not a letter is dropped — hyphens, apostrophes and accents
 * carry no value in the Pythagorean table — but the part it came from keeps its
 * original spelling in `raw` so the page can print the name as written.
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
export function expression(parts: NamePart[]): CoreNumber {
  return reduce(sumLetters(parts, () => true)) as CoreNumber;
}

/** The vowels only. Sometimes called the Heart's Desire. */
export function soulUrge(parts: NamePart[]): CoreNumber {
  return reduce(sumLetters(parts, (l) => l.vowel)) as CoreNumber;
}

/** The consonants only. What the name shows before anything is said. */
export function personality(parts: NamePart[]): CoreNumber {
  return reduce(sumLetters(parts, (l) => !l.vowel)) as CoreNumber;
}

// ─── Dates ────────────────────────────────────────────────────────────────────

export interface BirthDate {
  year: number;
  /** 1-indexed, as written rather than as `Date` counts them. */
  month: number;
  day: number;
}

/**
 * Month, day and year each reduced first, then added and reduced again.
 *
 * The order matters and is not the only convention in circulation: adding the
 * eight digits straight across gives a different answer for some dates, because
 * reducing first can preserve a master in a component that the flat sum would
 * have carried away. This is the method arc used and the one most commonly
 * published.
 */
export function lifePath(birth: BirthDate): CoreNumber {
  const sum =
    reduce(birth.month) + reduce(birth.day) + reduce(birth.year);
  return reduce(sum) as CoreNumber;
}

/** The same sum with the calendar year swapped in for the birth year. */
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
  number: CoreNumber;
  /** The obstacle inside the chapter. A difference, so 0 is a real answer. */
  challenge: CoreNumber;
  startAge: number;
  /** Null on the fourth, which does not close. */
  endAge: number | null;
  startYear: number;
  endYear: number | null;
}

/**
 * The four chapters, from the birth date alone.
 *
 * Numbers: month+day, day+year, the first two added, month+year. Challenges are
 * the absolute differences of the same pairs, reduced without masters because a
 * challenge of 11 would be an obstacle of 2 wearing a costume.
 *
 * The first chapter closes at 36 minus the Life Path — the one place a master
 * has to be flattened, or a Life Path 33 would end the chapter before birth.
 * Each of the next two runs nine years; the fourth runs out.
 */
export function pinnacles(birth: BirthDate): Pinnacle[] {
  const month = reduce(birth.month);
  const day = reduce(birth.day);
  const year = reduce(birth.year);

  const numbers = [
    reduce(month + day),
    reduce(day + year),
    reduce(reduce(month + day) + reduce(day + year)),
    reduce(month + year),
  ] as CoreNumber[];

  const firstChallenge = reduce(Math.abs(month - day), []);
  const secondChallenge = reduce(Math.abs(day - year), []);
  const challenges = [
    firstChallenge,
    secondChallenge,
    reduce(Math.abs(firstChallenge - secondChallenge), []),
    reduce(Math.abs(month - year), []),
  ] as CoreNumber[];

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
  number: CoreNumber;
  transits: Transit[];
}

/**
 * Which letter of a name part is ruling at a given age.
 *
 * Each letter holds for as many years as its value, in spelling order, and the
 * part starts over when it runs out — so the whole part repeats every
 * (sum of its values) years. That periodicity is used to jump straight into the
 * right pass rather than walking from birth, which is what arc did behind a
 * thousand-iteration guard.
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
 * Every part of the name contributes one ruling letter per year; the essence is
 * their sum. Arc's version used the first and last parts only, dropping middle
 * names its own comment said it would include — with two-part names the two
 * agree, and with three the method here is the one the tradition describes.
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
      ) as CoreNumber,
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
 * `keep` is not a detail. The pinnacles reduce their components with masters
 * intact, so a 22nd of the month enters the sum as 22; the personal year
 * reduces all the way, so the same day enters as 4. Both are what the functions
 * above already do, and a working that assumed one convention for both printed
 * a sum that did not produce the number sitting next to it.
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

/** Month+day, day+year, the first two added, month+year — in that order. */
export function pinnacleWorking(birth: BirthDate, index: 1 | 2 | 3 | 4): Working {
  const { month, day, year } = dateOperands(birth, MASTERS);

  if (index === 1) return working([month, day], "+", MASTERS);
  if (index === 2) return working([day, year], "+", MASTERS);
  if (index === 4) return working([month, year], "+", MASTERS);

  return working(
    [
      { label: "First pinnacle", value: reduce(month.value + day.value) },
      { label: "Second pinnacle", value: reduce(day.value + year.value) },
    ],
    "+",
    MASTERS,
  );
}

/** The same pairs as differences. Never a master, and 0 is a real answer. */
export function challengeWorking(birth: BirthDate, index: 1 | 2 | 3 | 4): Working {
  const { month, day, year } = dateOperands(birth, MASTERS);

  if (index === 1) return working([month, day], "−", []);
  if (index === 2) return working([day, year], "−", []);
  if (index === 4) return working([month, year], "−", []);

  return working(
    [
      {
        label: "First challenge",
        value: reduce(Math.abs(month.value - day.value), []),
      },
      {
        label: "Second challenge",
        value: reduce(Math.abs(day.value - year.value), []),
      },
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
  lifePath: CoreNumber;
  /** Null when `fullName` is false. */
  nameNumbers: {
    expression: CoreNumber;
    soulUrge: CoreNumber;
    personality: CoreNumber;
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
