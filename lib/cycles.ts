import type { Band, Segment } from "@/lib/band";

/**
 * The multi-system placeholder set behind /transits.
 *
 * This exists to show transits, luck pillars and personal years sharing one
 * axis — the thing no single tradition gives you. It is still hand-written;
 * the real, computed outer-planet cycles live under /astro/cycles and come
 * from the database.
 */

export type System = "astro" | "chinese" | "numerology";

export interface Cycle {
  id: string;
  glyph: string;
  title: string;
  subtitle: string;
  system: System;
  start: string;
  end: string;
  peak?: string;
  /** In-effect stretches. Omit when the influence never lifts. */
  segments?: Segment[];
  themes: string[];
  note: string;
}

export const SYSTEM_LABEL: Record<System, string> = {
  astro: "Transit",
  chinese: "Luck Pillar",
  numerology: "Personal Year",
};

export const WINDOW_START = "2022-01-01";
export const WINDOW_END = "2029-01-01";

export const CYCLES: Cycle[] = [
  {
    id: "saturn-h7",
    glyph: "♄︎",
    title: "Saturn",
    subtitle: "House VII",
    system: "astro",
    start: "2023-03-07",
    end: "2025-06-14",
    peak: "2024-02-19",
    // Stations retrograde twice — leaves the house and comes back.
    segments: [
      { start: "2023-03-07", end: "2023-07-17" },
      { start: "2024-01-28", end: "2024-09-02" },
      { start: "2025-02-14", end: "2025-06-14" },
    ],
    themes: ["Commitment", "Weight", "Contract"],
    note: "The long audit of partnership. What was structurally unsound came down; what held was load-bearing.",
  },
  {
    id: "pluto-sq-sun",
    glyph: "♇︎",
    title: "Pluto",
    subtitle: "□ Square Sun",
    system: "astro",
    start: "2022-01-20",
    end: "2026-11-30",
    peak: "2024-08-12",
    segments: [
      { start: "2022-01-20", end: "2022-07-11" },
      { start: "2023-03-04", end: "2023-11-19" },
      { start: "2024-05-01", end: "2025-01-22" },
      { start: "2026-04-18", end: "2026-11-30" },
    ],
    themes: ["Power", "Erosion", "Refusal"],
    note: "A five-year pressure on the identity itself. Not an event — a slow substitution of one self for another.",
  },
  {
    id: "neptune-h10",
    glyph: "♆︎",
    title: "Neptune",
    subtitle: "House X",
    system: "astro",
    start: "2024-09-02",
    end: "2031-02-18",
    themes: ["Dissolution", "Vocation", "Fog"],
    note: "The outline of the work goes soft. Ambition stops answering to the old definitions.",
  },
  {
    id: "uranus-opp",
    glyph: "♅︎",
    title: "Uranus",
    subtitle: "☍ Opposition",
    system: "astro",
    start: "2026-01-14",
    end: "2028-04-30",
    peak: "2027-03-08",
    segments: [
      { start: "2026-01-14", end: "2026-08-20" },
      { start: "2027-01-02", end: "2027-09-11" },
      { start: "2028-01-19", end: "2028-04-30" },
    ],
    themes: ["Rupture", "Latitude", "Revolt"],
    note: "The midpoint break. The part of the life that was borrowed rather than chosen comes due.",
  },
  {
    id: "luck-bing-wu",
    glyph: "丙",
    title: "Bǐng Wǔ",
    subtitle: "Fire over Fire",
    system: "chinese",
    start: "2021-02-04",
    end: "2031-02-04",
    themes: ["Visibility", "Heat", "Output"],
    note: "A decade of yang fire. Exposure is favoured; reserves are not. Burns bright and burns through.",
  },
  {
    id: "personal-year-7",
    glyph: "Ⅶ",
    title: "Personal Year 7",
    subtitle: "Withdrawal",
    system: "numerology",
    start: "2026-01-01",
    end: "2027-01-01",
    themes: ["Study", "Solitude", "Discernment"],
    note: "The introspective year of the nine. Building is discouraged; understanding is not.",
  },
];

export function toBand(cycle: Cycle): Band {
  return {
    id: cycle.id,
    glyph: cycle.glyph,
    title: cycle.title,
    subtitle: cycle.subtitle,
    start: cycle.start,
    end: cycle.end,
    peak: cycle.peak,
    segments: cycle.segments ?? [{ start: cycle.start, end: cycle.end }],
    href: `/transits/${cycle.id}`,
  };
}

const DAY = 86_400_000;

export function statusOf(
  cycle: Cycle,
  now: Date,
): "completed" | "active" | "upcoming" {
  const t = now.getTime();
  if (t < Date.parse(cycle.start)) return "upcoming";
  if (t > Date.parse(cycle.end)) return "completed";
  return "active";
}

export function elapsedFraction(cycle: Cycle, now: Date): number {
  const start = Date.parse(cycle.start);
  const span = Date.parse(cycle.end) - start;
  return Math.min(1, Math.max(0, (now.getTime() - start) / span));
}

export function daysBetween(a: Date, iso: string): number {
  return Math.round((Date.parse(iso) - a.getTime()) / DAY);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatMonthYear(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
