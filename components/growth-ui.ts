/**
 * Shared vocabulary for the Growth sections.
 *
 * Two things were leaking between files before this existed. The type scale was
 * defined separately in the figure and in the drawer, which is how two
 * definitions of "small" drift apart. And the sections imported `ChapterKey`
 * from the drawer, meaning a section could not be rendered without pulling in
 * the panel it opens — backwards, since the sections are what raise the
 * chapters and the drawer is what answers them.
 *
 * Both now point here, and nothing in this file imports a component.
 */

/**
 * Which tab of the drawer a click is asking for.
 *
 * These were once five separate drawers, one of which — the Edge — held a
 * single idea and had to restate the whole axis before it could say anything.
 * They are one drawer now: the panel is the same object however you got in, so
 * a reader who opened Conversion can look at Resistance without closing
 * anything, and the axis header is stated once instead of four times.
 *
 * A section still says which tab it is raising; that only chooses where the
 * drawer opens, never what it contains.
 *
 * The Crossing IS a key, and was not always. It began as a block inside
 * Resistance, then as an expandable sub-reading on the page — which put two
 * paragraphs of interpretation between the Arc and the Conversion for the
 * minority of charts that have one, and printed "Several demands cut across the
 * move" for the charts with more than one, a sentence that says nothing a
 * reader could act on.
 *
 * It is a tab now, and the page keeps only the flag: which bodies cut across,
 * as one line. That is the part that belongs in a scan of the page — the fact
 * that this chart has a crossing at all — and the interruption, the integration
 * and the arena are what someone opens a panel to read.
 *
 * The tab is conditional, which is why `tabsFor` exists: most charts have no
 * crossing, and a tab that opens onto "no crossing" is a worse answer than no
 * tab.
 */
export type ChapterKey =
  | "arc"
  | "crossing"
  | "conversion"
  | "resistance"
  | "tailwinds";

/**
 * Tab order and labels — and, deliberately, the page's reading order too.
 *
 * The sections on the page carry these exact names in this exact order, so
 * "Resistance" means the same thing and sits in the same place whether you are
 * reading the page or the panel. A drawer whose tabs are named differently from
 * the sections that open it makes the reader re-learn the vocabulary at the
 * moment they asked for more detail.
 *
 * Crossing sits second because that is where its flag sits on the page —
 * under the road, before the Conversion — even though it is the one entry with
 * no section of its own.
 */
export const TABS: { key: ChapterKey; label: string; kicker: string }[] = [
  {
    key: "arc",
    label: "Arc",
    kicker: "where you are going",
  },
  {
    key: "crossing",
    label: "Crossing",
    kicker: "what cuts across it",
  },
  {
    key: "conversion",
    label: "Conversion",
    kicker: "what gets you there",
  },
  {
    key: "resistance",
    label: "Resistance",
    kicker: "what pulls you back",
  },
  {
    key: "tailwinds",
    label: "Resources",
    kicker: "what the chart can recruit",
  },
];

/**
 * The type scale, fixed at seven steps.
 *
 * This page once carried eleven font sizes, its most-used size was nine pixels,
 * and the result read as a wall because nothing announced itself as the thing
 * to read first. Each step below is a *role*, not a size to choose from: if a
 * piece of text does not obviously belong to one, the layout is wrong rather
 * than the scale being short an option. Nothing sits below 10px, and 10px is
 * only for tracked-out micro labels that are glanced at rather than read.
 */
export const T = {
  /** The one sentence a section is answering. */
  lead: "text-[1.0625rem] leading-relaxed text-bone-soft",
  /**
   * A finding in a few words.
   *
   * The seventh step, and the one the page is now mostly made of. It exists
   * because the sections stopped explaining themselves in prose: a tell is
   * "One more perspective before deciding", a relation is a placement, and
   * neither is reading text with a paragraph around it — each is the thing
   * itself, and set at reading size it looked like a fragment of something
   * longer that had been cut off. Big enough to be the object on the page
   * rather than a description of one.
   */
  phrase: "text-[1.375rem] leading-snug text-bone",
  /** Primary reading text — the actual finding. */
  read: "text-[1.0625rem] leading-snug text-bone",
  /** Supporting sentences. */
  body: "text-[0.9375rem] leading-relaxed text-bone-soft",
  /** Asides and glosses. Quiet, still legible. */
  note: "text-[0.875rem] leading-relaxed text-bone-faint",
  /** Tracked micro label. The floor for anything carrying words. */
  micro: "datum text-[0.6875rem] tracking-[0.16em] uppercase",
  /** The smallest label, for section numbers and one-word tags. */
  tiny: "datum text-[0.625rem] tracking-[0.14em] uppercase",
} as const;

/**
 * How many items a section shows before deferring to the drawer.
 *
 * Three is the point at which a list still reads as a list rather than as a
 * page of its own.
 */
export const SHOWN = 3;

/**
 * The conversions a section shows, split into the two kinds it has.
 *
 * They are genuinely different claims and the page says so. The core rows come
 * from the axis — every chart on this South-to-North Node pair converts these,
 * and the curated axis entries make them arena-specific. A row carrying a body
 * exists only because something is standing in the ground being left: Pluto in
 * the third is why this chart's departing ground reads INVESTIGATION rather
 * than EXCHANGE, and that row could not have come from any other chart.
 *
 * The split is also why this is not a `slice`. Body rows are appended last by
 * the model, so taking the first three would drop precisely the rows worth
 * showing; sorting them to the front, which is what this did before, buried the
 * axis reading under them instead. Both survive: at most two chart-specific
 * rows, and the core fills whatever is left, never below one.
 */
export function shownConversions<C extends { from_body?: string }>(
  all: C[],
  limit: number = SHOWN,
): { core: C[]; specific: C[]; hidden: number } {
  const specific = all.filter((c) => c.from_body).slice(0, 2);
  const core = all
    .filter((c) => !c.from_body)
    .slice(0, Math.max(1, limit - specific.length));

  return {
    core,
    specific,
    hidden: all.length - core.length - specific.length,
  };
}

/**
 * The tabs this chart actually has.
 *
 * Called with `Boolean(t.crossing)`. Everything that reads TABS for display has
 * to go through here — a chart with no square to the axis must not be offered a
 * Crossing tab, and the drawer's active-tab lookup runs over the same list, so
 * the two can never disagree about which tabs exist.
 */
export function tabsFor(hasCrossing: boolean) {
  return hasCrossing ? TABS : TABS.filter((x) => x.key !== "crossing");
}

/**
 * `formatDegreeMinute` emits a typewriter apostrophe for arcminutes. That is
 * the right thing for a string that may be copied or parsed; on the page the
 * prime is the correct mark, and at label size the difference between 29°39'
 * and 29°39′ is the difference between a stray tick and a unit.
 *
 * Lived in growth-arc while the Arc was the only section printing a degree.
 * Two sections print one now, and two definitions of the same substitution is
 * how the page ends up with one mark in the hero and another in a footnote.
 */
export function prime(degree: string): string {
  return degree.replace(/'/g, "′");
}
