/**
 * The two systems, asked the same four questions.
 *
 * This module is the whole argument for the Comparison page, so it is worth
 * stating plainly. `app/chinese/page.tsx` refuses to cross-reference the
 * Western pages, on the grounds that a page which keeps translating one system
 * into the other ("your Metal is like your Saturn") teaches neither. That
 * refusal still stands and this file does not break it: nothing here maps a
 * phase to a planet, an element to an element, or a pillar to a house.
 *
 * What it does instead is put two *conclusions* beside each other. Both systems
 * independently answer "where is the weight", "what is missing", "what does it
 * lean on", "how does it move" — and they answer from measurements that have
 * nothing to do with each other. Where the answers agree, that is worth
 * knowing. Where they disagree, the disagreement is the content, and it is left
 * standing rather than resolved.
 *
 * The rows carry measurements only. Nothing here interprets, for two reasons:
 * the combinations run to thousands and would have to be a table nobody could
 * maintain, and interpretation is what the council is for. Each row hands the
 * model an `ask` — the question, with both readings already in it.
 */

import type { Chart } from "@/lib/charts";
import type { Reading } from "@/lib/chinese/pillars";
import { balance, type Balance } from "@/lib/balance";
import { dominanceMode, houseDominance, MODE_NOTE } from "@/lib/dominance";
import { BRANCHES, STEMS, generatedBy } from "@/lib/chinese/almanac";

/**
 * The caution the page prints and the model is handed. The single most likely
 * misreading of this page is that the two element columns are the same
 * measurement in different clothes, because three of the names collide.
 */
export const NOT_THE_SAME_SCALE = [
  "The two element columns are not the same measurement and must never be",
  "subtracted from each other. The four Western elements are qualities of",
  "temperament, fixed to each sign. The five Chinese phases are stages of",
  "transformation in a generating and controlling cycle, and their shares are",
  "read relative to the Day Master — the same 40 % Fire means opposite things",
  "depending on whether Fire feeds or drains it. Earth, Fire and Water appear in",
  "both lists and mean different things in each.",
].join(" ");

/** One system's answer to one question. */
export interface Side {
  /** The measured answer, short enough to sit in a column. */
  answer: string;
  /** How it was measured. Never what it means. */
  basis: string;
}

export interface ComparisonRow {
  id: "weight" | "composition" | "absence" | "tempo";
  question: string;
  western: Side;
  chinese: Side;
  /** The question this row hands the council, both readings already in it. */
  ask: string;
}

function list(items: string[], empty: string): string {
  if (items.length === 0) return empty;
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/**
 * "Fire 38.5%", or "Fire and Earth, level at 38.5%" when the top is shared.
 * Both systems can tie, and on a page about disagreement an evenly split chart
 * is exactly the sort of thing that must not be rounded into a single winner.
 */
function leadLabel(keys: string[], share: number): string {
  if (keys.length === 0) return "Nothing counted";
  if (keys.length === 1) return `${keys[0]} ${share}%`;
  return `${list(keys, "")}, level at ${share}%`;
}

/** The ten-year pillar the chart is standing in today, if it can be known. */
export function currentLuck(reading: Reading) {
  if (!reading.luck) return null;
  const now = Date.now();
  return (
    reading.luck.find(
      (p) => Date.parse(p.startDate) <= now && now < Date.parse(p.endDate),
    ) ?? null
  );
}

function stemLabel(index: number): string {
  const stem = STEMS[index];
  return `${stem.polarity} ${stem.element} (${stem.han} ${stem.pinyin})`;
}

export function compare(chart: Chart, reading: Reading): ComparisonRow[] {
  const west = balance(chart);
  const houses = houseDominance(chart);
  const top = [...houses].sort((a, b) => b.score - a.score)[0];

  const master = STEMS[reading.dayMaster];
  const resource = generatedBy(master.element);
  const monthBranch = BRANCHES[reading.pillars.month.branch];
  const luck = currentLuck(reading);

  const elementShare = west.elements.find((e) => e.key === west.leadElements[0])?.share ?? 0;
  const modalityShare =
    west.modalities.find((m) => m.key === west.leadModalities[0])?.share ?? 0;
  const westElement = leadLabel(west.leadElements, elementShare);
  const westModality = leadLabel(west.leadModalities, modalityShare);

  const topShare = Math.max(...reading.elements.map((e) => e.share));
  const topPhases = reading.elements
    .filter((e) => e.share === topShare)
    .map((e) => e.element);
  const eastPhase = leadLabel(topPhases, topShare);

  // ── Where the weight sits ───────────────────────────────────────────────────
  const weight: ComparisonRow = {
    id: "weight",
    question: "Where the weight sits",
    western: {
      answer: top ? `House ${top.house}` : "Not enough chart to say",
      basis: top
        ? `${MODE_NOTE[dominanceMode(top)]} Ruled by ${top.ruler}; score ${top.score} of the twelve.`
        : "No house cusps stored for this chart.",
    },
    chinese: {
      answer: reading.strength.verdict,
      basis: `Day Master ${stemLabel(reading.dayMaster)}. ${reading.strength.supportive}% of the chart is its own phase or ${resource}, its resource, and it is born ${
        reading.strength.inSeason ? "in" : "out of"
      } season in the ${monthBranch.season} month.`,
    },
    ask: top
      ? `On the comparison page: the Western chart concentrates on house ${top.house} (${MODE_NOTE[dominanceMode(top)].toLowerCase()} ruler ${top.ruler}), while the BaZi calls the Day Master ${reading.strength.verdict.toLowerCase()} at ${reading.strength.supportive}% supportive, born ${reading.strength.inSeason ? "in" : "out of"} season. Read each on its own terms first, then say whether they are pointing at the same thing or at two different things.`
      : `On the comparison page: the BaZi calls the Day Master ${reading.strength.verdict.toLowerCase()}. What does that mean for this chart?`,
  };

  // ── What it is made of ──────────────────────────────────────────────────────
  const composition: ComparisonRow = {
    id: "composition",
    question: "What it is made of",
    western: {
      answer: westElement,
      basis:
        "Ten bodies and the Ascendant, weighted by role — lights heaviest, outers lightest because a whole cohort shares them.",
    },
    chinese: {
      answer: eastPhase,
      basis:
        "The eight characters with their hidden stems, weighted. Read against the Day Master, not on its own.",
    },
    ask: `On the comparison page: the Western balance leads with ${westElement.toLowerCase()}, and the BaZi leads with ${eastPhase.toLowerCase()}. These are different measurements on different scales — do not treat one as confirming or contradicting the other, and do not equate the elements that share a name. Explain what each is actually saying about this person, and what it is like to be both at once.`,
  };

  // ── What is absent ──────────────────────────────────────────────────────────
  const westMissing = [...west.missingElements, ...west.missingModalities];
  const absence: ComparisonRow = {
    id: "absence",
    question: "What is absent",
    western: {
      answer: list(westMissing, "Nothing empty"),
      basis: westMissing.length
        ? "No counted body sits in a sign of these."
        : "Every element and modality carries at least one body.",
    },
    chinese: {
      answer: list(reading.missing, "Nothing empty"),
      basis: reading.missing.length
        ? "Absent from all eight characters, hidden stems included — traditionally the loudest thing on a chart."
        : "All five phases are present somewhere in the eight characters.",
    },
    ask: `On the comparison page: the Western chart is missing ${list(westMissing, "nothing")}, and the BaZi is missing ${list(reading.missing, "nothing")}. An absence means something different in each system. Take them one at a time, and say what a life actually has to do about each.`,
  };

  // ── How it moves ────────────────────────────────────────────────────────────
  const tempo: ComparisonRow = {
    id: "tempo",
    question: "How it moves",
    western: {
      answer: westModality,
      basis: west.modalities.map((m) => `${m.key} ${m.share}%`).join(" · "),
    },
    chinese: {
      answer: luck
        ? `${STEMS[luck.stem].element} over ${BRANCHES[luck.branch].animal}`
        : reading.luck
          ? "Between pillars"
          : "Unknown",
      basis: luck
        ? `The ten-year luck pillar now running, ages ${Math.floor(luck.startAge)}–${Math.floor(luck.endAge)}. The chart's tempo is not fixed: it is re-set every decade.`
        : reading.luck
          ? "No luck pillar covers today's date."
          : "Luck pillars need a recorded birth sex — the direction of the sequence depends on it.",
    },
    ask: `On the comparison page: the Western chart is ${westModality.toLowerCase()} (${west.modalities.map((m) => `${m.key} ${m.share}%`).join(", ")}), which does not change over a life. ${
      luck
        ? `The BaZi has this person in a ${STEMS[luck.stem].element}-over-${BRANCHES[luck.branch].animal} luck pillar until age ${Math.floor(luck.endAge)}, which does change.`
        : "The BaZi luck pillars are not available for this chart."
    } What is the difference between a fixed tempo and a ten-year one, and how do they interact right now?`,
  };

  return [weight, composition, absence, tempo];
}

/**
 * Everything on screen, shaped for the council's system message.
 *
 * Deliberately more than the rows carry — the model should be able to answer a
 * follow-up about the third-heaviest element without another round trip. The
 * two `_` fields are instructions rather than data; they are the only defence
 * against the model producing exactly the false-cognate reading this page
 * exists to avoid.
 */
export function comparisonContext(chart: Chart, reading: Reading) {
  const west: Balance = balance(chart);
  const houses = houseDominance(chart);
  const luck = currentLuck(reading);

  return {
    _description: "Comparison — the Western chart and the Four Pillars side by side",
    _caution: NOT_THE_SAME_SCALE,
    _task:
      "Read each system on its own terms and in its own vocabulary. Never translate one into the other — no 'your Metal is like your Saturn', no equating elements that share a name, no averaging the two into one verdict. Where the two readings disagree, name the disagreement and leave it standing; a person can be one thing by one measure and another by another, and that tension is usually the interesting part.",
    western: {
      elements: west.elements.map((e) => ({ element: e.key, sharePercent: e.share })),
      modalities: west.modalities.map((m) => ({ modality: m.key, sharePercent: m.share })),
      missing: [...west.missingElements, ...west.missingModalities],
      weighting:
        "Ten bodies plus the Ascendant. Sun, Moon, Ascendant 10; Mercury, Venus, Mars 8; Jupiter, Saturn 6; Uranus, Neptune, Pluto 4 (generational); nodes, Chiron and the Midheaven 0.",
      counted: west.counted.map((c) => `${c.body} in ${c.sign} (${c.weight})`),
      dominantHouses: [...houses]
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((h) => ({
          house: h.house,
          score: h.score,
          ruler: h.ruler,
          mode: dominanceMode(h),
          reasons: h.reasons,
        })),
    },
    chinese: {
      dayMaster: stemLabel(reading.dayMaster),
      resource: generatedBy(STEMS[reading.dayMaster].element),
      strength: {
        verdict: reading.strength.verdict,
        supportivePercent: reading.strength.supportive,
        inSeason: reading.strength.inSeason,
        season: BRANCHES[reading.pillars.month.branch].season,
      },
      elements: reading.elements.map((e) => ({
        phase: e.element,
        sharePercent: e.share,
      })),
      missing: reading.missing,
      currentLuckPillar: luck
        ? `${stemLabel(luck.stem)} over ${BRANCHES[luck.branch].animal} (${BRANCHES[luck.branch].element}), ages ${Math.floor(luck.startAge)}–${Math.floor(luck.endAge)}`
        : null,
    },
  };
}
