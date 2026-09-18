/**
 * Four relative relationship preferences, derived from a small set of natal
 * relationship functions.
 *
 * The number on an axis is never presented as a personality score. It only
 * places a marker between two poles:
 *
 *   position = 100 × (right evidence − left evidence) / total evidence
 *
 * Evidence mass is retained separately. A centred axis can therefore mean a
 * real duality, a neutral result, or an incomplete reading. Houses never move
 * a marker; they are returned as contextual overlays.
 */

import type { Chart, Placement } from "@/lib/charts";
import { SIGNS, type Rulership } from "@/lib/rulership";
import { loveArchitecture } from "./architecture";

export type CompassAxisId =
  | "freedom-bonding"
  | "play-seriousness"
  | "mental-emotional"
  | "receptive-expressive";

export type CompassPole = "left" | "right";
export type CompassBucket = "sign" | "rulership" | "aspect";
export type CompassWeight = 1 | 2 | 3;
export type CompassPosition =
  | "strong-left"
  | "left"
  | "center"
  | "right"
  | "strong-right";
export type CompassCenterState = "dual" | "neutral" | "uncertain";

type RelationshipRole =
  | "venus"
  | "moon"
  | "mars"
  | "sun"
  | "fifthCusp"
  | "fifthRuler"
  | "seventhCusp"
  | "seventhRuler"
  | "eighthRuler";

type ZodiacSign = (typeof SIGNS)[number];
type SignDirection = CompassPole | null;
type SignRule = Record<ZodiacSign, SignDirection>;

export interface CompassEvidence {
  id: string;
  pole: CompassPole;
  bucket: CompassBucket;
  weight: CompassWeight;
  label: string;
  placements: string[];
  /** Linked descriptions of one cusp/ruler chain still count once. */
  family?: string;
}

export interface CompassContext {
  id: string;
  label: string;
  placement: string;
  note: string;
}

export interface CompassAxis {
  id: CompassAxisId;
  left: string;
  right: string;
  question: string;
  position: number;
  positionBand: CompassPosition;
  centerState: CompassCenterState | null;
  evidence: number;
  leftEvidence: number;
  rightEvidence: number;
  reading: string;
  counterReading: string | null;
  contributors: CompassEvidence[];
}

export interface RelationshipCompass {
  axes: CompassAxis[];
  context: CompassContext[];
}

const BUCKET_CAP: Record<CompassBucket, number> = {
  sign: 3,
  rulership: 3,
  aspect: 4,
};

const AXIS: Record<
  CompassAxisId,
  {
    left: string;
    right: string;
    question: string;
    readings: [string, string];
  }
> = {
  "freedom-bonding": {
    left: "Freedom",
    right: "Bonding",
    question: "How much autonomy versus attachment does relating seek?",
    readings: [
      "Autonomy needs room inside relationship.",
      "Closeness and shared life carry more weight.",
    ],
  },
  "play-seriousness": {
    left: "Play",
    right: "Seriousness",
    question: "Does romance seek exploration or definition?",
    readings: [
      "Exploration matters before definition.",
      "Structure and intention carry more weight.",
    ],
  },
  "mental-emotional": {
    left: "Mental",
    right: "Emotional",
    question: "What creates the primary sense of connection?",
    readings: [
      "Connection begins through thought and language.",
      "Connection begins through feeling and attunement.",
    ],
  },
  "receptive-expressive": {
    left: "Receptive",
    right: "Expressive",
    question: "Is affection absorbed or outwardly demonstrated?",
    readings: [
      "Affection is more often received and internalized.",
      "Affection needs to be actively and visibly shown.",
    ],
  },
};

function signRule(
  left: readonly ZodiacSign[],
  right: readonly ZodiacSign[],
): SignRule {
  return Object.fromEntries(
    SIGNS.map((sign) => [
      sign,
      left.includes(sign) ? "left" : right.includes(sign) ? "right" : null,
    ]),
  ) as SignRule;
}

const FREEDOM = ["Sagittarius", "Aquarius"] as const;
const BONDING = ["Taurus", "Cancer", "Scorpio", "Pisces"] as const;
const PLAY = ["Aries", "Gemini", "Leo", "Sagittarius"] as const;
const SERIOUS = ["Taurus", "Virgo", "Scorpio", "Capricorn"] as const;
const AIR = ["Gemini", "Libra", "Aquarius"] as const;
const WATER = ["Cancer", "Scorpio", "Pisces"] as const;

/**
 * The auditable role × sign matrix. Every included role has an explicit entry
 * for all twelve signs and neutral is intentional, not a missing fallback.
 */
export const COMPASS_SIGN_MATRIX: Record<
  CompassAxisId,
  Partial<Record<RelationshipRole, SignRule>>
> = {
  "freedom-bonding": {
    venus: signRule(FREEDOM, BONDING),
    moon: signRule(FREEDOM, BONDING),
    sun: signRule(FREEDOM, BONDING),
    seventhCusp: signRule(FREEDOM, BONDING),
    seventhRuler: signRule(FREEDOM, BONDING),
    eighthRuler: signRule(FREEDOM, BONDING),
  },
  "play-seriousness": {
    venus: signRule(PLAY, SERIOUS),
    mars: signRule(PLAY, SERIOUS),
    sun: signRule(PLAY, SERIOUS),
    fifthCusp: signRule(PLAY, ["Taurus", "Virgo", "Capricorn"]),
    fifthRuler: signRule(PLAY, SERIOUS),
    seventhRuler: signRule([], SERIOUS),
  },
  "mental-emotional": {
    venus: signRule(AIR, WATER),
    moon: signRule(AIR, WATER),
    sun: signRule(AIR, WATER),
    seventhCusp: signRule(AIR, WATER),
    seventhRuler: signRule(AIR, WATER),
  },
  "receptive-expressive": {
    venus: signRule(
      ["Taurus", "Cancer", "Virgo", "Scorpio", "Pisces"],
      ["Aries", "Gemini", "Leo", "Libra", "Sagittarius"],
    ),
    moon: signRule(
      ["Taurus", "Cancer", "Virgo", "Scorpio", "Capricorn", "Pisces"],
      ["Aries", "Leo", "Sagittarius"],
    ),
    mars: signRule(
      ["Taurus", "Cancer", "Virgo", "Scorpio", "Pisces"],
      ["Aries", "Gemini", "Leo", "Libra", "Sagittarius", "Aquarius"],
    ),
    sun: signRule(
      ["Taurus", "Cancer", "Virgo", "Scorpio", "Pisces"],
      ["Aries", "Gemini", "Leo", "Libra", "Sagittarius"],
    ),
    fifthRuler: signRule(
      ["Taurus", "Cancer", "Virgo", "Scorpio", "Capricorn", "Pisces"],
      ["Aries", "Gemini", "Leo", "Libra", "Sagittarius", "Aquarius"],
    ),
  },
};

const MAJOR_ASPECTS = new Set([
  "conjunction",
  "opposition",
  "square",
  "trine",
  "sextile",
]);

type Draft = Record<CompassAxisId, CompassEvidence[]>;

function ordinal(n: number): string {
  const suffix =
    n % 10 === 1 && n !== 11 ? "st"
    : n % 10 === 2 && n !== 12 ? "nd"
    : n % 10 === 3 && n !== 13 ? "rd"
    : "th";
  return `${n}${suffix}`;
}

function placement(chart: Chart, body: string | null): Placement | null {
  if (!body) return null;
  return chart.placements.find((entry) => entry.body === body) ?? null;
}

function placementText(value: Placement | null): string | null {
  if (!value) return null;
  return `${value.body} in ${value.sign}${
    value.houseNumber ? ` · ${ordinal(value.houseNumber)} house` : ""
  }`;
}

function add(
  draft: Draft,
  axis: CompassAxisId,
  evidence: CompassEvidence | null,
): void {
  if (!evidence) return;
  if (!draft[axis].some((entry) => entry.id === evidence.id)) {
    draft[axis].push(evidence);
  }
}

function signEvidence(
  axis: CompassAxisId,
  role: RelationshipRole,
  value: { sign: string } | null,
  label: string,
  weight: CompassWeight,
  family?: string,
): CompassEvidence | null {
  if (!value || !SIGNS.includes(value.sign as ZodiacSign)) return null;
  const pole = COMPASS_SIGN_MATRIX[axis][role]?.[value.sign as ZodiacSign] ?? null;
  if (!pole) return null;
  const source = "body" in value
    ? placementText(value as Placement)
    : `${label} in ${value.sign}`;
  return {
    id: `${axis}-sign-${role}`,
    pole,
    bucket: "sign",
    weight,
    label: `${label} in ${value.sign}`,
    placements: source ? [source] : [],
    family,
  };
}

function rulerEvidence(
  axis: CompassAxisId,
  role: "fifthRuler" | "seventhRuler" | "eighthRuler",
  body: string | null,
  value: Placement | null,
  left: readonly string[],
  right: readonly string[],
  family?: string,
): CompassEvidence | null {
  if (!body) return null;
  const pole = left.includes(body) ? "left" : right.includes(body) ? "right" : null;
  if (!pole) return null;
  const roleLabel =
    role === "fifthRuler" ? "5th ruler"
    : role === "seventhRuler" ? "7th ruler"
    : "8th ruler";
  return {
    id: `${axis}-ruler-${role}`,
    pole,
    bucket: "rulership",
    weight: 3,
    label: `${roleLabel} is ${body}`,
    placements: placementText(value) ? [placementText(value)!] : [],
    family,
  };
}

function aspectEvidence(
  chart: Chart,
  targets: Set<string>,
  leftBodies: Set<string>,
  rightBodies: Set<string>,
): CompassEvidence[] {
  return chart.aspects.flatMap((aspect, index) => {
    if (
      Math.abs(aspect.orb) > 4 ||
      !MAJOR_ASPECTS.has(aspect.type.toLowerCase())
    ) return [];

    const other = targets.has(aspect.planet1) &&
      (leftBodies.has(aspect.planet2) || rightBodies.has(aspect.planet2))
      ? aspect.planet2
      : targets.has(aspect.planet2) &&
          (leftBodies.has(aspect.planet1) || rightBodies.has(aspect.planet1))
        ? aspect.planet1
        : null;
    if (!other) return [];

    const pole = leftBodies.has(other) ? "left" : "right";
    const first = placement(chart, aspect.planet1);
    const second = placement(chart, aspect.planet2);
    return [{
      id: `aspect-${index}-${aspect.planet1}-${aspect.planet2}`,
      pole,
      bucket: "aspect" as const,
      weight: 2 as const,
      label: `${aspect.planet1} ${aspect.type.toLowerCase()} ${aspect.planet2} · ${Math.abs(aspect.orb).toFixed(1)}°`,
      placements: [placementText(first), placementText(second)].filter(
        (item): item is string => Boolean(item),
      ),
    }];
  });
}

function capped(evidence: CompassEvidence[]): CompassEvidence[] {
  const bestByFamily = new Map<string, CompassEvidence>();
  const independent: CompassEvidence[] = [];
  for (const entry of evidence) {
    if (!entry.family) {
      independent.push(entry);
      continue;
    }
    const key = `${entry.pole}:${entry.family}`;
    const previous = bestByFamily.get(key);
    if (!previous || entry.weight > previous.weight) bestByFamily.set(key, entry);
  }

  const deduplicated = [...independent, ...bestByFamily.values()];
  const kept: CompassEvidence[] = [];
  for (const pole of ["left", "right"] as const) {
    for (const bucket of ["sign", "rulership", "aspect"] as const) {
      let remaining = BUCKET_CAP[bucket];
      const candidates = deduplicated
        .filter((entry) => entry.pole === pole && entry.bucket === bucket)
        .sort((a, b) => b.weight - a.weight);
      for (const candidate of candidates) {
        if (candidate.weight > remaining) continue;
        kept.push(candidate);
        remaining -= candidate.weight;
      }
    }
  }
  return kept;
}

function bandOf(position: number): CompassPosition {
  if (position <= -60) return "strong-left";
  if (position < -25) return "left";
  if (position <= 25) return "center";
  if (position < 60) return "right";
  return "strong-right";
}

function resolve(
  id: CompassAxisId,
  raw: CompassEvidence[],
  complete: boolean,
): CompassAxis {
  const contributors = capped(raw);
  const leftEvidence = contributors
    .filter((entry) => entry.pole === "left")
    .reduce((sum, entry) => sum + entry.weight, 0);
  const rightEvidence = contributors
    .filter((entry) => entry.pole === "right")
    .reduce((sum, entry) => sum + entry.weight, 0);
  const evidence = leftEvidence + rightEvidence;
  const position = evidence === 0
    ? 0
    : Math.round((100 * (rightEvidence - leftEvidence)) / evidence);
  const positionBand = bandOf(position);
  const structuralLeft = contributors.some(
    (entry) => entry.pole === "left" && entry.weight === 3,
  );
  const structuralRight = contributors.some(
    (entry) => entry.pole === "right" && entry.weight === 3,
  );
  const centerState = positionBand !== "center"
    ? null
    : structuralLeft && structuralRight
      ? "dual"
      : !complete
        ? "uncertain"
        : "neutral";
  const meta = AXIS[id];
  const reading = centerState === "dual"
    ? `Both ${meta.left.toLowerCase()} and ${meta.right.toLowerCase()} are strongly represented.`
    : centerState === "uncertain"
      ? "The available chart does not resolve this axis."
      : centerState === "neutral"
        ? "Neither side clearly dominates."
        : position < 0
          ? meta.readings[0]
          : meta.readings[1];
  const counterReading = positionBand !== "center" && leftEvidence > 0 && rightEvidence > 0
    ? `${position < 0 ? meta.right : meta.left} remains a secondary pull.`
    : null;

  return {
    id,
    left: meta.left,
    right: meta.right,
    question: meta.question,
    position,
    positionBand,
    centerState,
    evidence,
    leftEvidence,
    rightEvidence,
    reading,
    counterReading,
    contributors: [...contributors]
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 5),
  };
}

function contextNote(house: number): string {
  if ([4, 8, 12].includes(house)) return "Privately situated";
  if ([1, 5, 10].includes(house)) return "Visibly situated";
  if (house === 7) return "Partnership situated";
  if ([3, 9, 11].includes(house)) return "Socially situated";
  return "Practically situated";
}

function contexts(
  entries: Array<[string, Placement | null]>,
): CompassContext[] {
  return entries.flatMap(([label, value], index) => {
    if (!value?.houseNumber) return [];
    return [{
      id: `${index}-${label}-${value.body}`,
      label,
      placement: placementText(value)!,
      note: contextNote(value.houseNumber),
    }];
  });
}

export function relationshipCompass(
  chart: Chart,
  rulership: Rulership,
): RelationshipCompass {
  const architecture = loveArchitecture(chart, rulership);
  const venus = architecture.venus;
  const moon = architecture.moon;
  const mars = architecture.mars;
  const saturn = architecture.saturn;
  const sun = placement(chart, "Sun");
  const fifthRuler = placement(chart, architecture.fifth.ruler);
  const seventhRuler = placement(chart, architecture.seventh.ruler);
  const eighthRuler = placement(chart, architecture.eighth.ruler);

  const draft: Draft = {
    "freedom-bonding": [],
    "play-seriousness": [],
    "mental-emotional": [],
    "receptive-expressive": [],
  };

  const addSign = (
    axis: CompassAxisId,
    role: RelationshipRole,
    value: { sign: string } | null,
    label: string,
    weight: CompassWeight = 3,
    family?: string,
  ) => add(draft, axis, signEvidence(axis, role, value, label, weight, family));

  // Freedom ↔ Bonding
  addSign("freedom-bonding", "venus", venus, "Venus");
  addSign("freedom-bonding", "moon", moon, "Moon");
  addSign("freedom-bonding", "seventhCusp", architecture.seventh.cusp, "Descendant", 3, "seventh-chain");
  addSign("freedom-bonding", "seventhRuler", seventhRuler, "7th ruler");
  addSign("freedom-bonding", "eighthRuler", eighthRuler, "8th ruler", 3, "eighth-chain");
  addSign("freedom-bonding", "sun", sun, "Sun", 1);
  add(draft, "freedom-bonding", rulerEvidence(
    "freedom-bonding",
    "seventhRuler",
    architecture.seventh.ruler,
    seventhRuler,
    ["Uranus"],
    ["Moon", "Venus", "Neptune", "Pluto"],
    "seventh-chain",
  ));
  add(draft, "freedom-bonding", rulerEvidence(
    "freedom-bonding",
    "eighthRuler",
    architecture.eighth.ruler,
    eighthRuler,
    ["Uranus"],
    ["Moon", "Venus", "Neptune", "Pluto"],
    "eighth-chain",
  ));
  for (const evidence of aspectEvidence(
    chart,
    new Set(["Venus", "Moon", architecture.seventh.ruler ?? ""]),
    new Set(["Uranus"]),
    new Set(["Pluto", "Neptune"]),
  )) add(draft, "freedom-bonding", { ...evidence, id: `freedom-${evidence.id}` });

  // Play ↔ Seriousness
  addSign("play-seriousness", "venus", venus, "Venus");
  addSign("play-seriousness", "mars", mars, "Mars");
  addSign("play-seriousness", "fifthCusp", architecture.fifth.cusp, "5th cusp", 3, "fifth-chain");
  addSign("play-seriousness", "fifthRuler", fifthRuler, "5th ruler");
  addSign("play-seriousness", "seventhRuler", seventhRuler, "7th ruler");
  addSign("play-seriousness", "sun", sun, "Sun", 1);
  add(draft, "play-seriousness", rulerEvidence(
    "play-seriousness",
    "fifthRuler",
    architecture.fifth.ruler,
    fifthRuler,
    ["Sun", "Mercury", "Venus", "Mars", "Jupiter"],
    ["Saturn"],
    "fifth-chain",
  ));
  add(draft, "play-seriousness", rulerEvidence(
    "play-seriousness",
    "seventhRuler",
    architecture.seventh.ruler,
    seventhRuler,
    [],
    ["Saturn"],
  ));
  for (const evidence of aspectEvidence(
    chart,
    new Set(["Venus", "Mars", architecture.fifth.ruler ?? "", architecture.seventh.ruler ?? ""]),
    new Set(["Jupiter"]),
    new Set(["Saturn"]),
  )) add(draft, "play-seriousness", { ...evidence, id: `play-${evidence.id}` });

  // Mental ↔ Emotional
  addSign("mental-emotional", "venus", venus, "Venus");
  addSign("mental-emotional", "moon", moon, "Moon");
  addSign("mental-emotional", "seventhCusp", architecture.seventh.cusp, "Descendant", 3, "seventh-chain");
  addSign("mental-emotional", "seventhRuler", seventhRuler, "7th ruler");
  addSign("mental-emotional", "sun", sun, "Sun", 1);
  add(draft, "mental-emotional", rulerEvidence(
    "mental-emotional",
    "seventhRuler",
    architecture.seventh.ruler,
    seventhRuler,
    ["Mercury"],
    ["Moon", "Neptune", "Pluto"],
    "seventh-chain",
  ));
  for (const evidence of aspectEvidence(
    chart,
    new Set(["Venus", "Moon", architecture.seventh.ruler ?? ""]),
    new Set(["Mercury"]),
    new Set(["Moon", "Neptune", "Pluto"]),
  )) add(draft, "mental-emotional", { ...evidence, id: `connection-${evidence.id}` });

  // Receptive ↔ Expressive
  addSign("receptive-expressive", "venus", venus, "Venus");
  addSign("receptive-expressive", "moon", moon, "Moon");
  addSign("receptive-expressive", "mars", mars, "Mars");
  addSign("receptive-expressive", "fifthRuler", fifthRuler, "5th ruler");
  addSign("receptive-expressive", "sun", sun, "Sun", 1);
  add(draft, "receptive-expressive", rulerEvidence(
    "receptive-expressive",
    "fifthRuler",
    architecture.fifth.ruler,
    fifthRuler,
    ["Moon", "Neptune", "Pluto"],
    ["Sun", "Mars"],
  ));
  for (const evidence of aspectEvidence(
    chart,
    new Set(["Venus", "Moon", architecture.fifth.ruler ?? ""]),
    new Set(["Moon", "Neptune"]),
    new Set(["Sun", "Mars"]),
  )) add(draft, "receptive-expressive", { ...evidence, id: `expression-${evidence.id}` });

  const complete = {
    "freedom-bonding": architecture.housed && Boolean(venus && moon),
    "play-seriousness": architecture.housed && Boolean(venus && mars && saturn),
    "mental-emotional": architecture.housed && Boolean(venus && moon),
    "receptive-expressive": Boolean(venus && moon),
  } satisfies Record<CompassAxisId, boolean>;

  return {
    axes: (Object.keys(AXIS) as CompassAxisId[]).map((id) =>
      resolve(id, draft[id], complete[id]),
    ),
    context: contexts([
      ["Attraction", venus],
      ["Bonding", moon],
      ["Desire", mars],
      ["Commitment", saturn],
      ["Courtship ruler", fifthRuler],
      ["Partnership ruler", seventhRuler],
      ["Intimacy ruler", eighthRuler],
    ]),
  };
}
