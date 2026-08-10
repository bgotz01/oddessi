/**
 * The memory categories, and which system each one belongs to.
 *
 * The scope is a property of the CATEGORY, not a label the distiller attaches
 * per lesson. That was the first design and it was wrong twice over: it left
 * "The Chart" as a name that told you nothing about which chart, and it gave the
 * model a second thing to get wrong — a lesson could be filed correctly and
 * scoped incorrectly, and then vanish from the conversation it belonged to.
 *
 * Naming the system in the category collapses both problems. "Eastern Chart"
 * cannot be mis-scoped, because the name *is* the scope. The model's only job
 * is picking a category, which is the job it is good at.
 *
 * So the stored row name stays a simple two-part path, and everything else is
 * derived:
 *
 *     "Boris Gotzev — Eastern Chart"
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
}

/**
 * The canonical set. Order is the order they read in the panel: who the person
 * is, then each chart, then each system's timing, then the life and the
 * standing instructions.
 */
export const INTERFACE_CATEGORIES: MemoryCategoryDef[] = [
  {
    name: "Character",
    scope: "Shared",
    blurb:
      "What this person is actually like, as it emerged in the conversation — how they work, what they avoid, what they keep returning to, how they take a reading. Draw this from what they said and how they said it, never from what their placements are supposed to mean. \"Pushes back on anything that sounds like flattery\" is character; \"has Saturn in the 10th\" is not.",
  },
  {
    name: "Western Chart",
    scope: "West",
    blurb:
      "Durable structural facts of the natal chart — placements, rulerships, dominances, tight aspects, element and modality balance, and which conventions this reading uses (house system, orbs). Measurements, not meanings.",
  },
  {
    name: "Eastern Chart",
    scope: "East",
    blurb:
      "Durable structural facts of the BaZi chart — Day Master, the four pillars, stems and branches, hidden stems, the five phases and their shares, strength and season, Ten Gods. Measurements, not meanings.",
  },
  {
    name: "Western Cycles",
    scope: "West",
    blurb:
      "Western timing: transits, returns, progressions — what is running now, what is coming, what has just closed. Keep the dates exact; a cycle without a date is nearly useless.",
  },
  {
    name: "Eastern Cycles",
    scope: "East",
    blurb:
      "BaZi timing: luck pillars, annual pillars, solar terms — which pillar is running, its ages and dates, and what it changes. Keep the dates exact.",
  },
  {
    name: "The Record",
    scope: "Shared",
    blurb:
      "What actually happened in this person's life, dated where possible, and which transit or pillar it fell inside. Evidence, not interpretation. \"Left the job Mar 2019, inside the Saturn square Sun\" — not \"Saturn squares are about endings.\"",
  },
  {
    name: "Working Notes",
    scope: "Shared",
    blurb:
      "How this person wants the instrument to work — standing instructions, formats they prefer, subjects they have ruled out, decisions about the tool.",
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
  return INTERFACE_CATEGORIES.filter((c) => readable.includes(c.scope));
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
 * So the route sets it on open. `/chinese/...` is unambiguously East,
 * `/compare` is unambiguously Both, and the Western section is West. Pages that
 * are not about either — the home page, the council — return null and leave the
 * switch where the user last put it, because guessing there would be worse than
 * remembering.
 */
export function systemsForPath(pathname: string): ActiveSystems | null {
  if (pathname.startsWith("/chinese")) return "chinese";
  if (pathname.startsWith("/compare")) return "both";
  if (
    pathname.startsWith("/astro") ||
    pathname.startsWith("/transits") ||
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
