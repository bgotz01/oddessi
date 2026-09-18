//components/western/romance/romance-ui.ts
import type {
  LoveArena,
  LoveProfile,
  LoveSection,
  LoveWindowKind,
} from "@/lib/love";

export const ROMANCE_T = {
  lead: "text-[1.125rem] leading-relaxed text-bone-soft",
  phrase: "text-[1.375rem] leading-snug text-bone",
  read: "text-[1.0625rem] leading-snug text-bone",
  body: "text-[0.9375rem] leading-relaxed text-bone-soft",
  note: "text-[0.875rem] leading-relaxed text-bone-faint",
  micro: "datum text-[0.6875rem] tracking-[0.16em] uppercase",
  tiny: "datum text-[0.625rem] tracking-[0.14em] uppercase",
} as const;

export const WINDOW_QUESTION: Record<LoveWindowKind, string> = {
  attraction: "What is changing in what catches your attention?",
  romance: "Where do play, pursuit and possibility need more room?",
  partnership: "What does real mutuality require from you?",
  commitment: "What needs a clearer shape, boundary or decision?",
};

export function sectionOf(
  profile: LoveProfile,
  arena: LoveArena,
): LoveSection {
  const section = profile.sections.find((entry) => entry.arena === arena);
  if (!section) throw new Error(`Missing love profile section: ${arena}`);
  return section;
}

export function bulletValue(
  section: LoveSection,
  key: string,
  fallback = "this part of the pattern is unavailable without complete birth data",
): string {
  return section.bullets.find((bullet) => bullet.key === key)?.value ?? fallback;
}

export function lowerFirst(value: string): string {
  return value.length ? value[0].toLowerCase() + value.slice(1) : value;
}

export function sourceLine(section: LoveSection): string {
  return section.sources
    .map((source) =>
      source.label === source.placement.split(" in ")[0]
        ? source.placement
        : `${source.label}: ${source.placement}`,
    )
    .join(" · ");
}
