/**
 * lib/love/profile.ts
 *
 * WHICH PARTS THIS CHART HAS, and the assembly of them. Its counterpart,
 * `natal.ts`, holds what the parts mean.
 *
 * Five sections, one per arena, each a handful of resolved fragments and a
 * list of the placements it read. The list is not decoration: it is the
 * answer to "why does it say that", and the reason the page can put the
 * technical machinery behind a disclosure instead of leading with it. A
 * reading whose sources cannot be produced on request is an assertion.
 *
 * A slot that cannot resolve is DROPPED, never printed empty and never
 * defaulted. A chart saved without a birth time has no cusps, which removes
 * the 5th, the 7th, the 8th and every house field — most of three sections —
 * and the honest rendering of that is a short section plus a note saying what
 * is missing, not a full one silently built on fallbacks.
 */

import type { Chart, Placement } from "@/lib/charts";
import type { Rulership } from "@/lib/rulership";
import {
  loveArchitecture,
  LOVE_ARENA_LABEL,
  LOVE_ARENA_QUESTION,
  type LoveArchitecture,
  type LoveArena,
} from "./architecture";
import {
  LOVE_ARENA,
  LOVE_BODY,
  LOVE_HOUSE,
  LOVE_PROFILE_CAVEAT,
  LOVE_ROLE_LABEL,
  LOVE_SIGN,
  type LoveRole,
  type LoveSlotSource,
} from "./natal";

export interface LoveBullet {
  key: string;
  value: string;
}

/** One placement a section read, named so the reading can be audited. */
export interface LoveSource {
  role: LoveRole;
  label: string;
  /** "Venus in Taurus · 11th house", or "Aquarius" for a bodiless cusp. */
  placement: string;
}

export interface LoveSection {
  arena: LoveArena;
  label: string;
  question: string;
  bullets: LoveBullet[];
  sources: LoveSource[];
  /** Roles this section wanted and the chart could not supply. */
  unreadable: string[];
}

export interface LoveProfile {
  sections: LoveSection[];
  architecture: LoveArchitecture;
  /** The chart was saved with a birth time, so it has cusps and angles. */
  housed: boolean;
  caveat: string;
}

/** What a role resolves to. Any of the three may be absent. */
interface Resolved {
  sign: string | null;
  body: string | null;
  house: number | null;
  /** For the sources list. */
  placement: string | null;
}

function ordinal(n: number): string {
  const suffix =
    n % 10 === 1 && n !== 11 ? "st"
    : n % 10 === 2 && n !== 12 ? "nd"
    : n % 10 === 3 && n !== 13 ? "rd"
    : "th";
  return `${n}${suffix}`;
}

function fromPlacement(placement: Placement | null): Resolved {
  if (!placement) return { sign: null, body: null, house: null, placement: null };
  const house = placement.houseNumber;
  return {
    sign: placement.sign || null,
    body: placement.body,
    house,
    placement: `${placement.body} in ${placement.sign}${
      house ? ` · ${ordinal(house)} house` : ""
    }`,
  };
}

/** A cusp: a sign with no body standing on it and no house of its own. */
function fromSign(sign: string | null): Resolved {
  return { sign, body: null, house: null, placement: sign };
}

function resolveRole(
  role: LoveRole,
  chart: Chart,
  architecture: LoveArchitecture,
): Resolved {
  const ruler = (name: string | null) =>
    fromPlacement(
      name ? (chart.placements.find((p) => p.body === name) ?? null) : null,
    );

  switch (role) {
    case "venus": return fromPlacement(architecture.venus);
    case "mars": return fromPlacement(architecture.mars);
    case "moon": return fromPlacement(architecture.moon);
    case "saturn": return fromPlacement(architecture.saturn);
    case "descendant": return fromSign(architecture.descendantSign);
    case "fifthCusp": return fromSign(architecture.fifth.sign);
    case "eighthCusp": return fromSign(architecture.eighth.sign);
    case "fifthRuler": return ruler(architecture.fifth.ruler);
    case "seventhRuler": return ruler(architecture.seventh.ruler);
    case "eighthRuler": return ruler(architecture.eighth.ruler);
  }
}

/**
 * One slot, or null.
 *
 * The source string is `role.table.field`, parsed rather than switched on, so
 * a new field on `LoveSignEntry` is usable from a slot the moment it exists —
 * the type union in `natal.ts` is what keeps that from being a way to
 * reference a field that is not there.
 */
function resolveSlot(source: LoveSlotSource, resolved: Resolved): string | null {
  const [, table, field] = source.split(".") as [
    LoveRole,
    "sign" | "body" | "house",
    string,
  ];

  if (table === "sign") {
    const entry = resolved.sign ? LOVE_SIGN[resolved.sign] : undefined;
    return entry?.[field as keyof typeof entry] ?? null;
  }
  if (table === "body") {
    const entry = resolved.body ? LOVE_BODY[resolved.body] : undefined;
    return entry?.[field as keyof typeof entry] ?? null;
  }
  const entry = resolved.house ? LOVE_HOUSE[resolved.house] : undefined;
  return entry?.[field as keyof typeof entry] ?? null;
}

const ORDER: LoveArena[] = [
  "attraction",
  "romance",
  "partnership",
  "intimacy",
  "commitment",
];

export function loveProfile(chart: Chart, rulership: Rulership): LoveProfile {
  const architecture = loveArchitecture(chart, rulership);
  const cache = new Map<LoveRole, Resolved>();
  const resolve = (role: LoveRole) => {
    const hit = cache.get(role);
    if (hit) return hit;
    const value = resolveRole(role, chart, architecture);
    cache.set(role, value);
    return value;
  };

  const sections = ORDER.map<LoveSection>((arena) => {
    const bullets: LoveBullet[] = [];
    const sources = new Map<LoveRole, LoveSource>();
    const unreadable = new Set<string>();

    for (const slot of LOVE_ARENA[arena].slots) {
      const [rolePart, table] = slot.from.split(".") as [
        LoveRole,
        "sign" | "body" | "house",
      ];
      const role = rolePart;
      const resolved = resolve(role);
      const value = resolveSlot(slot.from, resolved);
      if (!value) {
        // WHICH PART is missing, not merely which role.
        //
        // A chart with no birth time has Venus — its sign, its degree, every
        // reading built on them — and no house for it to stand in. Reporting
        // that as "Read without Venus" is false in the way that matters: it
        // says the section could not see the most important thing in it, when
        // what it could not see was one arena field. The row this produces is
        // read by someone deciding whether to trust the section, so the
        // difference between "without Venus" and "without Venus's house" is
        // the difference between discarding a reading and discounting a line
        // of it.
        unreadable.add(
          table === "house" && resolved.sign
            ? `${LOVE_ROLE_LABEL[role]}’s house`
            : LOVE_ROLE_LABEL[role],
        );
        continue;
      }
      bullets.push({ key: slot.key, value });
      if (resolved.placement) {
        sources.set(role, {
          role,
          label: LOVE_ROLE_LABEL[role],
          placement: resolved.placement,
        });
      }
    }

    return {
      arena,
      label: LOVE_ARENA_LABEL[arena],
      question: LOVE_ARENA_QUESTION[arena],
      bullets,
      sources: [...sources.values()],
      unreadable: [...unreadable],
    };
  });

  return {
    sections,
    architecture,
    housed: architecture.housed,
    caveat: LOVE_PROFILE_CAVEAT,
  };
}
