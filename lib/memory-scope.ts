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
 *      ^chart          ^category → scope eastern
 *
 * SHARED is not a fudge. Plenty of what a session teaches is not a reading at
 * all: what the person is like, what happened to them in 2019, how they want to
 * be spoken to. None of that belongs to a system, and hiding it when the switch
 * moves would make the instrument forget the person every time it changed lens.
 *
 * Adding numerology cost two rows in the list below and nothing else, which is
 * the whole argument for this design: the scopes are derived from the names, so
 * a new system is a naming decision rather than a migration.
 */

/** The three instruments. The route prefixes use these exact words. */
export type System = "western" | "eastern" | "numerology";

export const SYSTEMS: readonly System[] = ["western", "eastern", "numerology"];

export const SYSTEM_LABEL: Record<System, string> = {
  western: "Western",
  eastern: "Eastern",
  numerology: "Numerology",
};

/**
 * Which systems a conversation has attached — a SET, not a choice.
 *
 * This was a three-valued enum ("western" | "chinese" | "both") for as long as
 * there were two systems, which worked because two systems have exactly three
 * useful states. Three systems have seven, and a fourth would have fifteen;
 * enumerating them produces names like "westernAndNumerology" that no one can
 * read and that every consumer has to destructure by hand anyway.
 *
 * So the switch is now three independent toggles and this is the set they
 * produce. Empty is allowed and means something real: the person and the
 * conversation, with no chart attached at all.
 */
export type ActiveSystems = readonly System[];

/**
 * Read whatever a client sent into a set.
 *
 * The old enum is still in people's localStorage and in older request bodies,
 * so its three values are translated rather than rejected. "both" becomes all
 * three: it meant "everything this app has", and what the app has has changed.
 */
export function parseSystems(value: unknown): ActiveSystems {
  if (Array.isArray(value)) {
    const kept = value.filter((v): v is System =>
      SYSTEMS.includes(v as System),
    );
    // An array is taken at its word, empty included — that is a real state.
    return Array.from(new Set(kept));
  }
  if (value === "western") return ["western"];
  if (value === "chinese" || value === "eastern") return ["eastern"];
  return SYSTEMS;
}

/** True when exactly this system is attached and nothing else. */
export function isOnly(systems: ActiveSystems, system: System): boolean {
  return systems.length === 1 && systems[0] === system;
}

/**
 * The scope a memory row belongs to.
 *
 * A scope is a system, or Shared for what belongs to no system — what the
 * person is like, what happened to them, how they want to be worked with. None
 * of that is a reading, and hiding it when the switch moves would make the
 * instrument forget the person every time it changed lens.
 */
export type MemoryScope = System | "Shared";

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
    scope: "western",
    blurb:
      "Interpretations of the natal chart that earned their place — what a configuration turned out to MEAN for this person, the placement it rests on, and what in their life confirmed it. Name the placement in passing, never as the content: \"the fifth-house Mars shows up as competitive project work rather than play — he confirmed the pattern across three ventures\" is a reading; \"Mars is at 19°55′ Capricorn in the fifth\" is a measurement the instrument already has. Record readings that FAILED here too, marked \"Ruled out:\", with why — so they are not offered again.",
  },
  {
    name: "Eastern Readings",
    distillable: true,
    scope: "eastern",
    blurb:
      "The same for BaZi: what a Day Master, phase balance, branch relation or luck pillar turned out to MEAN for this person, and what confirmed it. The pillars and shares themselves are already in front of you every time — only their significance belongs here. Record ruled-out readings the same way.",
  },
  {
    name: "Numerology Readings",
    distillable: true,
    scope: "numerology",
    blurb:
      "The same for the numbers: what a Life Path, Expression, Soul Urge, pinnacle or personal year turned out to MEAN for this person, and what in their life confirmed it. Be harder on yourself here than in the other two. Numerology gives twelve numbers and a handful of positions, so its readings are broad by construction and the temptation is to record the number's stock character back as though the person had confirmed it — \"his Life Path 9 is about release\" is the lexicon talking, not a lesson. Only what THIS person recognised, dated or argued with belongs here. Record ruled-out readings the same way.",
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
    blurb: "Passages the person pinned by hand. Not about any one system.",
  },
  {
    name: "Western Notes",
    distillable: false,
    scope: "western",
    blurb: "Passages the person pinned by hand from a Western reading.",
  },
  {
    name: "Eastern Notes",
    distillable: false,
    scope: "eastern",
    blurb: "Passages the person pinned by hand from a BaZi reading.",
  },
  {
    name: "Numerology Notes",
    distillable: false,
    scope: "numerology",
    blurb: "Passages the person pinned by hand from a reading of the numbers.",
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

/**
 * Which scopes a conversation may read, given the switch.
 *
 * Shared is always in, including when nothing is attached: what the person is
 * like and what happened to them does not stop being true because the chart was
 * put away.
 */
export function readableScopes(systems: ActiveSystems): MemoryScope[] {
  return [...systems, "Shared"];
}

/**
 * The categories a conversation may write into. A chat with only the Western
 * chart attached has no business producing an "Eastern Readings" lesson — it
 * never saw the pillars.
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
 * So the route sets it on open, and since the section split the prefix IS the
 * system — `/eastern/...` narrows to Eastern and nothing else. `/compare` and
 * `/overview` open everything, because the axis carries a house transit, a luck
 * pillar and a personal year at once and scoping it to one would file a pillar
 * lesson as a natal one — precisely the failure this function exists to
 * prevent.
 *
 * Pages that belong to no system — the home page, the council — return null and
 * leave the switch where the user last put it, because guessing there would be
 * worse than remembering.
 */
export function systemsForPath(pathname: string): ActiveSystems | null {
  for (const system of SYSTEMS) {
    if (pathname.startsWith(`/${system}`)) return [system];
  }
  if (pathname.startsWith("/birth-chart")) return ["western"];
  if (pathname.startsWith("/compare") || pathname.startsWith("/overview")) {
    return SYSTEMS;
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
