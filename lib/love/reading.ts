/**
 * lib/love/reading.ts
 *
 * A window, in words. `timeline.ts` decides WHAT a period is; this decides
 * what is said about it, and nothing here computes.
 *
 * Composed from two axes rather than written per window, for the reason
 * `natal.ts` gives at length: four kinds times three modes is twelve
 * developments, and four kinds times three modes times three strengths times
 * however many driver combinations is a number nobody maintains. The theme
 * comes from the kind, the development from the kind crossed with what the
 * period DOES, and the drivers are read off the contacts themselves — so a
 * window that acquires a fourth layer tomorrow says so without anything here
 * changing.
 *
 * EVERY DEVELOPMENT SENTENCE STOPS SHORT OF AN OUTCOME
 * This is the whole discipline of the file and it is worth stating once rather
 * than defending in twelve places. A relationship window is emphasis, not
 * event: the chart can say the 7th is loud and cannot say anyone was met.
 * Every sentence below is therefore about what is EMPHASISED — and where one
 * was tempting to end on a result, it ends on the ambiguity instead, because
 * the ambiguity is the true part.
 */

import {
  LOVE_STRENGTH_LABEL,
  LOVE_WINDOW_LABEL,
  LOVE_WINDOW_MEANING,
  type LoveMode,
  type LoveWindow,
  type LoveWindowKind,
} from "./timeline";

/** The period in three or four words. Sits under the window's title. */
export const LOVE_THEME: Record<LoveWindowKind, string> = {
  attraction: "Taste and pull",
  romance: "Meeting and courtship",
  partnership: "Pairing and the other person",
  commitment: "Definition and what lasts",
};

/**
 * What is emphasised, by kind and by what the period does.
 *
 * Two cells are unreachable as the model currently classifies — every contact
 * in the 7th group counts as core, so a defining one there is always graded
 * Commitment rather than Partnership — and they are written anyway. A table
 * with holes in it is a table that crashes the day the classification is
 * loosened, and these are two sentences.
 */
export const LOVE_DEVELOPMENT: Record<LoveWindowKind, Record<LoveMode, string>> = {
  attraction: {
    opening:
      "What registers as attractive widens. More people read as possible and the appetite is less selective than usual — which is an increase in interest, not in judgement.",
    defining:
      "Taste is under pressure rather than simply being felt. What was attractive is being weighed, and some of it does not hold up to the weighing.",
    seasonal:
      "What draws you is moving on its own — slowly, underneath the transits, and usually clearer in retrospect than at the time.",
  },
  romance: {
    opening:
      "New connections are emphasised more strongly than continuing ones. This is the courtship end of the architecture: the part before anything is decided, and it is as consistent with a run of nothing serious as with a beginning.",
    defining:
      "The enjoyable part is being asked to be serious about something. Play with a question attached to it, and the question does not go away by being ignored.",
    seasonal:
      "A long stretch weighted toward courtship and play. It colours the period rather than marking anything inside it.",
  },
  partnership: {
    opening:
      "The weight moves to the other person. Pairing is more available — being met, being matched, or an existing partnership becoming the thing that is actually at stake.",
    defining:
      "The partnership itself is being asked for a shape. Whichever way it resolves, the ambiguity is what ends.",
    seasonal:
      "A long season with the emphasis on being one of a pair. The progressed Moon colours two to three years here; it does not trigger a day inside them.",
  },
  commitment: {
    opening:
      "Definition is being offered rather than forced — the structure is available if it is wanted.",
    defining:
      "A relationship is being asked to take a definite shape. The configuration covers formalising, restructuring and ending with equal comfort, and the chart cannot tell you which: what it can tell you is that the question is live and that postponing it is itself an answer.",
    seasonal:
      "A slow tightening rather than a demand. What is undefined becomes harder to leave undefined.",
  },
};

export interface LoveReading {
  /** "Major Romance window". */
  title: string;
  /** "March – July 2027", or "March 2027 – January 2029" across a year boundary. */
  dates: string;
  theme: string;
  development: string;
  /** The contacts, shortest label first. Evidence, not decoration. */
  drivers: string[];
  /** What the kind claims, and refuses to. */
  meaning: string;
  /** How long, in the unit that suits it. */
  duration: string;
}

const MONTH = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * A span as a person would say it.
 *
 * "March – July 2027" inside one year and "March 2027 – January 2029" across
 * two. Printing the year twice inside a single year is the kind of thing that
 * reads as machine output; omitting it across two is ambiguous.
 */
function span(start: string, end: string): string {
  const from = new Date(`${start}T12:00:00Z`);
  const to = new Date(`${end}T12:00:00Z`);
  const fromMonth = MONTH[from.getUTCMonth()];
  const toMonth = MONTH[to.getUTCMonth()];
  const fromYear = from.getUTCFullYear();
  const toYear = to.getUTCFullYear();
  if (fromYear === toYear) return `${fromMonth} – ${toMonth} ${toYear}`;
  return `${fromMonth} ${fromYear} – ${toMonth} ${toYear}`;
}

function duration(window: LoveWindow): string {
  const years = window.ageEnd - window.ageStart;
  if (years < 1) {
    const months = Math.max(1, Math.round(years * 12));
    return `${months} month${months === 1 ? "" : "s"}`;
  }
  const rounded = Math.round(years * 2) / 2;
  return `${rounded} year${rounded === 1 ? "" : "s"}`;
}

export function interpretLoveWindow(window: LoveWindow): LoveReading {
  return {
    title: `${LOVE_STRENGTH_LABEL[window.strength]} ${LOVE_WINDOW_LABEL[
      window.kind
    ].toLowerCase()} window`,
    dates: span(window.start, window.end),
    theme: LOVE_THEME[window.kind],
    development: LOVE_DEVELOPMENT[window.kind][window.mode],
    // Core contacts already sort first out of `timeline.ts`; that order is the
    // evidence order and is kept.
    drivers: window.contacts.map((contact) => contact.label),
    meaning: LOVE_WINDOW_MEANING[window.kind],
    duration: duration(window),
  };
}
