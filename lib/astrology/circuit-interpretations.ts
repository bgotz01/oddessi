/** lib/astrology/circuit-interpretations.ts
 * What the house circuits mean. `lib/dominance` says what connects (the ruler
 * graph); this file says what the connection means; the component decides how
 * to show it.
 *
 * Every reading has the same three layers:
 *
 *   theme        Names the relationship. The card's title.
 *   dynamic      The exchange, one line per direction, each carried by its
 *                actual ruler. The main interpretation.
 *   integration  A possible synthesis of the areas involved. Chat only — and
 *                descriptive, never advice: it says what the areas can become
 *                together, not what the reader should do.
 *
 * Only the six opposite-house axes have hand-written themes — the classical
 * polarities, the same six the axes section shows. Everything else is composed
 * from the house meanings in `house-categories`: 66 pairs and hundreds of
 * longer loops are a table nobody would keep consistent. The planets' and
 * signs' particulars are evidence shown beside the reading, and the chat's
 * to deepen.
 */

import { HOUSE_CATEGORIES, type House } from "@/lib/astrology/house-categories";
import { bodyRole } from "@/lib/bodies";
import type { Circuit, RulerLink, SelfRuled } from "@/lib/dominance";
import { rulerOfSign } from "@/lib/rulership";
import {
  DEFAULT_SCORING as DEFAULTS,
  type ScoringConfig as Config,
} from "@/lib/scoring";

export interface CircuitDirection {
  from: number;
  to: number;
  ruler: string;
  /** The ruler's role, from `lib/bodies` — "Growth & Expansion". */
  energy?: string;
  /** "Creativity and pleasure reach for more through intimacy and shared resources." */
  line: string;
}

export interface CircuitReading {
  theme: string;
  /** In loop order: house 1 → 2, 2 → 3, …, last → first. */
  dynamic: CircuitDirection[];
  integration: string;
}

export interface SelfRuledReading {
  theme: string;
  /** Concentration within one area — one sentence. */
  dynamic: string;
  integration: string;
  /** Whether the ruler sits in a sign it rules. Chat only. */
  dignity: string;
  /** Houses whose rulers sit here directly. */
  direct: number[];
  /** Houses that reach here only through another house's ruler. */
  indirect: number[];
}

// ─── Themes ──────────────────────────────────────────────────────────────────

/**
 * The six axes, keyed lowest house first. Each names the polarity, not a
 * verdict on it — the same pair reads as tension in one chart and as balance
 * in another.
 */
const AXIS_THEMES: Record<string, string> = {
  "1-7": "Self & Other",
  "2-8": "Mine & Ours",
  "3-9": "Facts & Meaning",
  "4-10": "Private Roots & Public Standing",
  "5-11": "Personal Joy & Shared Ideals",
  "6-12": "Daily Order & Surrender",
};

/** A house's leading keyword — "Creativity", "Intimacy". */
export const keyword = (h: number) => HOUSE_CATEGORIES[h as House].keywords[0];

const joinTitle = (items: string[]) =>
  items.length <= 2
    ? items.join(" & ")
    : `${items.slice(0, -1).join(", ")} & ${items[items.length - 1]}`;

function circuitTheme(houses: number[]): string {
  if (houses.length === 2) {
    const [a, b] = [...houses].sort((x, y) => x - y);
    const axis = AXIS_THEMES[`${a}-${b}`];
    if (axis) return axis;
  }
  return joinTitle(houses.map(keyword));
}

// ─── Dynamic ─────────────────────────────────────────────────────────────────

/**
 * Each house as the thing a ruler carries — short, singular, and in the second
 * person, so "Jupiter carries ___ into ___" reads as a sentence rather than
 * two category titles. Twelve phrases, not a combination table.
 */
const HOUSE_PHRASE: Record<House, string> = {
  1: "your sense of self",
  2: "your relationship with money",
  // Not "the way you think and talk" — Mercury, which rules the 3rd whenever
  // Gemini or Virgo is on its cusp, would then repeat it in its own clause.
  3: "your learning",
  4: "your home life",
  5: "your creative life",
  6: "your daily work",
  7: "partnership",
  8: "intimacy",
  9: "your search for meaning",
  10: "your career",
  11: "your social life",
  12: "your inner life",
};
const phrase = (h: number) => HOUSE_PHRASE[h as House];

/**
 * What happens to the house once its ruler has carried it — the clause after
 * "where it …". One per body rather than per house pair, so the planet's
 * symbolism colours each direction without a combination table.
 *
 * Every clause is a manner, not a verdict: none says whether the exchange goes
 * well. Saturn gives shape, it does not block; Neptune softens, it does not
 * deceive. Whether a given link works is the rest of the chart's question.
 * Anything a rulership table can hand back that is not here falls through to
 * the neutral clause.
 */
const MANNER: Record<string, string> = {
  Sun: "where it looks for purpose and recognition",
  Moon: "where it looks for emotional security",
  Mercury: "where it gets examined and put into words",
  Venus: "where it looks for harmony and pleasure",
  Mars: "where it is pursued with drive",
  Jupiter: "where it reaches for more",
  Saturn: "where it takes shape slowly",
  Uranus: "where it looks for change and freedom",
  Neptune: "where its edges soften",
  Pluto: "where it goes through deep change",
};
const NEUTRAL = "where it is pursued";

/** "Sun" → "The Sun" at the head of a sentence; planets take no article. */
const subject = (body: string) =>
  body === "Sun" || body === "Moon" ? `The ${body}` : body;

/** ["Joy", "Self-Expression"] → "joy and self-expression". */
const need = (h: number) =>
  listOf(HOUSE_CATEGORIES[h as House].internalThemes).toLowerCase();

const upperFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const listOf = (items: string[]) =>
  items.length <= 2
    ? items.join(" and ")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
const roleOf = (body: string) =>
  bodyRole(body)?.replace(" & ", " and ").toLowerCase();

// ─── Readings ────────────────────────────────────────────────────────────────

/**
 * One house's ruler carrying it into another — the sentence every circuit is
 * built from, and the one the Framework guide shows for its worked example.
 */
export function rulerLine(from: number, to: number, ruler: string): string {
  return `${subject(ruler)} carries ${phrase(from)} into ${phrase(to)}, ${MANNER[ruler] ?? NEUTRAL}.`;
}

/** A ruler sitting in the house it rules — ruler and resident at once. */
export function selfRuledLine(house: number, ruler: string): string {
  return `${subject(ruler)} rules house ${house} and sits there, concentrating ${
    roleOf(ruler) ?? "its influence"
  } on ${phrase(house)}.`;
}

export function readCircuit(circuit: Circuit): CircuitReading {
  const { houses, rulers } = circuit;
  return {
    theme: circuitTheme(houses),
    // Each direction keeps its own ruler — 5 → 8 by Jupiter reads differently
    // from 8 → 5 by Neptune, and that difference is the reading.
    dynamic: houses.map((from, i) => {
      const to = houses[(i + 1) % houses.length];
      return {
        from,
        to,
        ruler: rulers[i],
        energy: bodyRole(rulers[i]),
        // The ruler is the subject: it is always singular, and it is the
        // mechanism — the house does not act, its ruler carries it.
        line: rulerLine(from, to, rulers[i]),
      };
    }),
    integration:
      houses.length === 2
        ? `A possible synthesis: ${need(houses[0])} and ${need(houses[1])} developing together rather than in turns, each area giving the other something it cannot supply itself.`
        : `A possible synthesis: ${listOf(houses.map(need))} as one cycle, each building on the one before it.`,
  };
}

export function readSelfRuled(
  self: SelfRuled,
  links: RulerLink[],
  config: Config = DEFAULTS,
): SelfRuledReading {
  const { link, feeders } = self;
  const atHome = rulerOfSign(link.rulerSign, config.rulership) === link.ruler;
  const livesIn = (h: number) => links.find((l) => l.house === h)?.livesIn;
  const direct = feeders.filter((h) => livesIn(h) === link.house);
  const indirect = feeders.filter((h) => livesIn(h) !== link.house);

  return {
    theme: `${keyword(link.house)} on Its Own Terms`,
    // Says what self-rulership is — ruler and resident at once — before what
    // it does.
    dynamic: selfRuledLine(link.house, link.ruler),
    // Self-ruled is concentrated, not sealed off — the house still meets the
    // rest of the chart through aspects and through whatever leads into it.
    integration: `A possible synthesis: ${need(link.house)} reinforcing their own priorities — a concentrated focus that can shape other parts of life.`,
    // "A sign it rules" by the rulership table in use, not classical dignity:
    // under modern rulership Pluto in Scorpio counts, traditionally it does not.
    dignity: atHome
      ? `${subject(link.ruler)} is in ${link.rulerSign}, a sign it rules under the ${config.rulership} rulership in use — at home in the sign as well as the house.`
      : `${subject(link.ruler)} has moved on into ${link.rulerSign} while still inside the house, so the area runs in a ${link.rulerSign} manner rather than a ${link.cuspSign} one.`,
    direct,
    indirect,
  };
}
