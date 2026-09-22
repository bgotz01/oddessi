//components/western/compatibility/compatibility-ui.ts
import type { EaseBand } from "@/lib/synastry";

export const T = {
  lead: "text-[1.125rem] leading-relaxed text-bone-soft",
  phrase: "text-[1.375rem] leading-snug text-bone",
  read: "text-[1.0625rem] leading-snug text-bone",
  body: "text-[0.9375rem] leading-relaxed text-bone-soft",
  note: "text-[0.875rem] leading-relaxed text-bone-faint",
  micro: "datum text-[0.6875rem] tracking-[0.16em] uppercase",
  tiny: "datum text-[0.625rem] tracking-[0.14em] uppercase",
} as const;

/**
 * The two ends of the ease axis, and the deliberate absence of a colour for
 * the other one.
 *
 * Ease has a sign, so it gets the two accents the system allows: patina for
 * flow, ember for friction. Chemistry does not have a sign — it measures how
 * much contact there is and has no opinion about whether that is welcome — so
 * it is drawn in bone and never in an accent. This is the one rule on the page
 * that carries an argument rather than a preference: colouring a chemistry bar
 * patina would say high contact is good, and colouring it ember would say high
 * contact is dangerous, and the whole point of keeping the two axes apart is
 * that neither of those is true.
 */
export const FLOW = "var(--color-patina)";
export const GRIND = "var(--color-ember)";
export const AMPLITUDE = "var(--color-bone-soft)";

/**
 * Ease as a colour, taken from the band rather than from the number.
 *
 * There is deliberately no `easeColor(value)` helper here. Two places on this
 * page band an ease value and they use different edges on purpose — see the
 * note on `EASE_BAND` in `lib/synastry/dimensions.ts` — so a colour derived
 * from the raw number would agree with whichever of them happened to share its
 * threshold and quietly contradict the other.
 */
export const BAND_COLOR: Record<EaseBand, string> = {
  flowing: FLOW,
  charged: GRIND,
  mixed: "var(--color-bone)",
  quiet: "var(--color-bone-faint)",
  thin: "var(--color-bone-faint)",
};

/** Ease as it is printed: the sign always written, so +9 cannot be misread as 9. */
export function easeLabel(ease: number | null): string {
  if (ease === null) return "—";
  return ease > 0 ? `+${ease}` : `${ease}`;
}

/**
 * Bullet marker.
 *
 * A middle dot rather than a disc, and set in the mono at rule strength, so a
 * list reads as instrument markings rather than as a document. `globals.css`
 * forbids emoji outright and keeps the two accents for meaning, so the marker
 * is patina-dim — a hairline colour, correct for something that carries no
 * information beyond "next point".
 */
export const BULLET = "·";

/**
 * The hairline between the two measurements in a row.
 *
 * Chemistry and ease sit side by side in every table on this page, and a gap
 * alone was not enough to stop them reading as one continuous strip of bar —
 * which is precisely the misreading the whole design exists to prevent, since
 * the two are different questions and must never be scanned as a single
 * quantity. A rule is the app's own device for this (`globals.css` allows
 * hairlines and forbids shadows), and `self-stretch` is what makes it span a
 * baseline-aligned grid row rather than collapsing to the height of nothing.
 */
export const COLUMN_RULE = "hidden w-px self-stretch bg-rule sm:block";

/**
 * A row's name in any of this page's tables.
 *
 * Deliberately NOT `inscription`. Section titles are carved — uppercase Cinzel,
 * tracked out, with a rule under them — and the row labels were set the same
 * way two steps smaller, so a table read as a stack of little headings and the
 * heading above it read as one more row. Setting the rows in the body face and
 * in their own mixed case puts a whole typeface between a title and its
 * contents, which is the distinction doing the work rather than two points of
 * size.
 *
 * It also follows the house rule: caps are for micro labels, and a row name is
 * content.
 */
export const ROW_LABEL = "text-[1.0625rem] leading-snug";

/**
 * Ease coloured by its sign alone.
 *
 * The tables below colour by BAND, which is right there — a band is a claim
 * about magnitude and the word beside it has to agree. The four lens figures
 * are a different case: they sit at the top with nothing else to read them
 * against, and a row of uniformly bone numbers gave no signal that some were
 * negative at all. Sign is not a claim about size — the size is the figure
 * itself, and the cell word under it still carries the band — so colouring by
 * it is a reading aid rather than a second opinion.
 */
export function signColor(ease: number | null): string {
  if (ease === null || ease === 0) return "var(--color-bone-faint)";
  return ease < 0 ? GRIND : FLOW;
}
