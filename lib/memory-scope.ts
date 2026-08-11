/**
 * The memory categories, and which system each one belongs to.
 *
 * The scope is a property of the CATEGORY, not a label the distiller attaches
 * per lesson. That was the first design and it was wrong twice over: it left
 * "The Chart" as a name that told you nothing about which chart, and it gave the
 * model a second thing to get wrong — a lesson could be filed correctly and
 * scoped incorrectly, and then vanish from the conversation it belonged to.
 *
 * Naming the system in the category collapses both problems. "Eastern Readings"
 * cannot be mis-scoped, because the name *is* the scope. The model's only job
 * is picking a category, which is the job it is good at.
 *
 * So the stored row name stays a simple two-part path, and everything else is
 * derived:
 *
 *     "Boris Gotzev — Eastern Readings"
 *      ^chart          ^category → scope East
 *
 * SHARED is not a fudge. Plenty of what a session teaches is not a reading at
 * all: what the person is like, what happened to them in 2019, how they want to
 * be spoken to. None of that belongs to a system, and hiding it when the switch
 * moves would make the instrument forget the person every time it changed lens.
 */

export type MemoryScope = "West" | "East" | "Shared";

/** Which systems a conversation had attached. Mirrors `Systems` in the provider. */
export type ActiveSystems = "western" | "chinese" | "both";

export interface MemoryCategoryDef {
  name: string;
  scope: MemoryScope;
  /** The line the distiller is given. Also what the category means, for humans. */
  blurb: string;
  /**
   * False for categories only the user writes into.
   *
   * A pinned note and a distilled lesson are different kinds of claim: the note
   * is a paragraph the person chose, kept in their words, and the lesson is the
   * model's paraphrase of what it thinks happened. They belong in the same
   * store — same chart scoping, same West/East scoping, same attach switch, one
   * panel — because the whole value of either is that it reaches the next
   * conversation. But the distiller must never rewrite, merge or "reconcile
   * against" a note, so those categories are simply not offered to it.
   */
  distillable: boolean;
}

/**
 * The canonical set.
 *
 * NOTHING HERE STORES CHART DATA, and that is the main thing to understand
 * about this list. Every request already carries the full measurements —
 * `buildChartBlock` sends every placement, cusp and aspect, and
 * `buildChineseBlock` sends the Day Master, all four pillars, the element
 * shares and the running luck pillar. A memory row repeating "Mars at 19°55′
 * Capricorn" is not merely wasted context: it is a second, hand-copied source
 * of truth that can drift from the computed one, and the model has no way to
 * tell which to believe.
 *
 * So memory holds only what the ephemeris cannot produce — what a reading
 * turned out to MEAN, what the person confirmed about their own life, and how
 * they want to be worked with. An earlier version of this list had "Western
 * Chart" and "Eastern Chart" categories and they filled up with pure
 * measurement, which is what prompted the rewrite.
 */
export const INTERFACE_CATEGORIES: MemoryCategoryDef[] = [
  {
    name: "Character",
    distillable: true,
    scope: "Shared",
    blurb:
      "What this person is actually like, as it emerged in the conversation — how they work, what they avoid, what they keep returning to, how they take a reading. Draw this from what they said and how they said it, never from what their placements are supposed to mean. \"Pushes back on anything that sounds like flattery\" is character; \"has Saturn in the 10th\" is not.",
  },
  {
    name: "Western Readings",
    distillable: true,
    scope: "West",
    blurb:
      "Interpretations of the natal chart that earned their place — what a configuration turned out to MEAN for this person, the placement it rests on, and what in their life confirmed it. Name the placement in passing, never as the content: \"the fifth-house Mars shows up as competitive project work rather than play — he confirmed the pattern across three ventures\" is a reading; \"Mars is at 19°55′ Capricorn in the fifth\" is a measurement the instrument already has. Record readings that FAILED here too, marked \"Ruled out:\", with why — so they are not offered again.",
  },
  {
    name: "Eastern Readings",
    distillable: true,
    scope: "East",
    blurb:
      "The same for BaZi: what a Day Master, phase balance, branch relation or luck pillar turned out to MEAN for this person, and what confirmed it. The pillars and shares themselves are already in front of you every time — only their significance belongs here. Record ruled-out readings the same way.",
  },
  {
    name: "The Record",
    distillable: true,
    scope: "Shared",
    blurb:
      "What actually happened in this person's life, dated where possible, and which transit or pillar it fell inside. Evidence, not interpretation. \"Left the job Mar 2019, inside the Saturn square Sun\" — not \"Saturn squares are about endings.\"",
  },
  {
    name: "Working Notes",
    distillable: true,
    scope: "Shared",
    blurb:
      "How this person wants the instrument to work — standing instructions, formats they prefer, subjects they have ruled out, decisions about the tool.",
  },

  // ── Pinned by hand, never by the distiller ────────────────────────────────
  // Kept verbatim: the point of pinning a paragraph is that the person judged
  // it worth keeping in the words it was written in, which a summariser would
  // immediately undo.
  {
    name: "Notes",
    distillable: false,
    scope: "Shared",
    blurb: "Passages the person pinned by hand. Not about either system.",
  },
  {
    name: "Western Notes",
    distillable: false,
    scope: "West",
    blurb: "Passages the person pinned by hand from a Western reading.",
  },
  {
    name: "Eastern Notes",
    distillable: false,
    scope: "East",
    blurb: "Passages the person pinned by hand from a BaZi reading.",
  },
];

const BY_NAME = new Map(
  INTERFACE_CATEGORIES.map((c) => [c.name.toLowerCase(), c]),
);

/**
 * The scope of a stored category.
 *
 * Anything unrecognised is Shared, which is what makes the older rows behave
 * sensibly: "The Chart", written before the split, is not silently hidden from
 * half the conversations — it stays visible everywhere until it is re-filed.
 */
export function scopeOf(category: string): MemoryScope {
  return BY_NAME.get(category.trim().toLowerCase())?.scope ?? "Shared";
}

/** True for a row whose category is not one of the canonical names. */
export function isLegacy(category: string): boolean {
  return !BY_NAME.has(category.trim().toLowerCase());
}

/** Which scopes a conversation may read, given the switch position. */
export function readableScopes(systems: ActiveSystems): MemoryScope[] {
  if (systems === "western") return ["West", "Shared"];
  if (systems === "chinese") return ["East", "Shared"];
  return ["West", "East", "Shared"];
}

/**
 * The categories a conversation may write into. A chat with only the Western
 * chart attached has no business producing an "Eastern Chart" lesson — it never
 * saw the pillars.
 */
export function writableCategories(systems: ActiveSystems): MemoryCategoryDef[] {
  const readable = readableScopes(systems);
  return INTERFACE_CATEGORIES.filter(
    (c) => c.distillable && readable.includes(c.scope),
  );
}

/** The categories a person may pin into, for the scope they choose. */
export function noteCategories(): MemoryCategoryDef[] {
  return INTERFACE_CATEGORIES.filter((c) => !c.distillable);
}

/** True for a category the distiller must leave alone. */
export function isPinned(category: string): boolean {
  return BY_NAME.get(category.trim().toLowerCase())?.distillable === false;
}

/**
 * Which systems a page implies.
 *
 * The switch is sticky, which is convenient right up until it is dangerous: you
 * read the four pillars with the toggle still on West from an hour ago, and
 * everything the conversation teaches is filed as Western. Nobody notices,
 * because the mistake is invisible until a later reading quotes a Day Master
 * fact as though it were a natal one.
 *
 * So the route sets it on open. Since the split, the prefix IS the system:
 * `/eastern/...` is unambiguously East, `/western/...` and `/birth-chart` are
 * West, and `/compare` and `/transits` are Both — the axis carries an astro
 * transit, a luck pillar and a personal year at once, so scoping it West would
 * file a pillar lesson as a natal one, which is precisely the failure this
 * function exists to prevent.
 *
 * `/numerology` belongs to neither scope. The stored categories are West, East
 * and Shared; there is no numerological one yet, and inventing a scope for a
 * page that computes nothing would create rows nothing can read back. It
 * returns null with the rest — the home page, the council — which leaves the
 * switch where the user last put it, because guessing there would be worse than
 * remembering.
 */
export function systemsForPath(pathname: string): ActiveSystems | null {
  if (pathname.startsWith("/eastern")) return "chinese";
  if (pathname.startsWith("/compare") || pathname.startsWith("/transits")) {
    return "both";
  }
  if (
    pathname.startsWith("/western") ||
    pathname.startsWith("/birth-chart")
  ) {
    return "western";
  }
  return null;
}

/** Stored row name. The chart prefix is what keeps two people's lessons apart. */
export function buildCategory(chartName: string, category: string): string {
  return `${chartName.trim()} — ${category.trim()}`;
}

/** The prefix used to find one chart's rows. */
export function chartPrefix(chartName: string): string {
  return `${chartName.trim()} — `;
}
