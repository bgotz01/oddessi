/**
 * Career Activation — a documented, adjustable first model.
 *
 * CLAIM
 * The index describes how strongly the natal vocational architecture is being
 * activated at a moment. It does not measure success, income, satisfaction, or
 * the probability of promotion. Jupiter counts: opportunity is activation even
 * when it is not pressure.
 *
 * ARCHITECTURE
 * The first version deliberately stops at the most defensible career addresses:
 * the MC–IC axis, the ruler of the 10th cusp, planets in the 10th, and transits
 * through the 10th. The 6th (work), 2nd (resources), generic Saturn, and generic
 * Sun are excluded until their relationship to the career architecture can be
 * modelled without turning all work or money activity into a career peak.
 *
 * FORMULA
 * Each contact receives a strength:
 *
 *   target relevance × aspect relevance × exactness
 *
 * A moment then combines the strongest contact with convergence, coverage,
 * multiplicity, and persistence. Saturation prevents many weak contacts from
 * automatically outweighing one exact MC contact. Every adjustable judgement
 * is exported in CAREER_MODEL rather than hidden in rendering code.
 *
 * WHAT THE INDEX IS NOT COMPARABLE ACROSS
 * Two charts do not have the same number of career addresses, and the cached
 * feed does not compute contacts against all of them (see `careerCoverage`).
 * A chart whose 10th ruler is Pluto has one fewer layer that can ever light up
 * than a chart whose 10th ruler is Venus — so the coverage term is normalised
 * against the layers this chart can actually reach, and the band labels below
 * describe density of contact rather than quality of career. The curve is read
 * against ITSELF over a life. It is not a score to compare with someone else's.
 */

import type { Band, Segment } from "@/lib/band";
import type { Chart, Placement } from "@/lib/charts";
import { rulerOfSign, type Rulership } from "@/lib/rulership";
import { birthMsOf, isoAtAge, YEAR_MS } from "./time";
import { careerWindows, type CareerWindow } from "./windows";

export const CAREER_MODEL = {
  version: 2,
  lifespanYears: 90,
  sampleStepYears: 0.25,
  smoothingRadiusSamples: 2,
  /**
   * Below this age the curve is drawn but nothing is called a career event.
   *
   * The architecture is genuinely being contacted at seven years old — Pluto
   * square the Midheaven is the same transit whenever it lands. What is false
   * is the noun. A vocational index that labels a first-grader's Saturn return
   * to the 10th a "turning point" has confused an astronomical fact for a
   * biographical one, so peaks and windows both start here while the line
   * itself stays continuous.
   */
  vocationalFloorAge: 14,
  planets: ["Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"],
  targets: {
    midheaven: 1,
    tenthRuler: 0.85,
    tenthTenant: 0.7,
    tenthHouse: 0.45,
  },
  aspects: {
    Conjunction: 1,
    Opposition: 0.95,
    Square: 0.9,
    Trine: 0.72,
    Sextile: 0.58,
  },
  /** Minimum strength retained at the edge of an aspect envelope. */
  exactnessFloor: 0.55,
  parts: {
    strongestContact: 55,
    convergence: 20,
    coverage: 10,
    persistence: 10,
    multiplicity: 5,
  },
  saturation: {
    independentPlanets: 3,
    targetLayers: 3,
    retrogradeReturns: 3,
    simultaneousContacts: 4,
  },
  peak: { floor: 45, spacingYears: 5, maximumLabels: 7 },
  /**
   * Density of contact, not quality of career.
   *
   * These were once Exceptional / High / Moderate / Low / Quiet, which read as
   * a rating of the life rather than a description of the sky and fought the
   * CLAIM at the top of this file. "Saturated" says the architecture is being
   * worked on from several directions at once; it does not say the year goes
   * well, and a person can be promoted in a Sparse decade.
   */
  bands: [
    {
      from: 80,
      label: "Saturated",
      meaning:
        "Several independent bodies on the core architecture at once, at least one of them close to exact.",
    },
    {
      from: 60,
      label: "Dense",
      meaning:
        "More than one address under contact, with something substantial on the axis or its ruler.",
    },
    {
      from: 40,
      label: "Engaged",
      meaning:
        "The architecture is in contact — usually one strong address, or several weaker ones together.",
    },
    {
      from: 20,
      label: "Sparse",
      meaning:
        "Something is touching the structure, at a distance or on its outer edges.",
    },
    {
      from: 0,
      label: "Quiet",
      meaning:
        "Little or nothing addressing the vocational architecture. Not a verdict on the career — the quiet is what makes the loud stretches mean anything.",
    },
  ],
  /** Documented candidates, intentionally inactive in version 1. */
  deferred: {
    sixthRuler: "Work practice; too broad for the first career index.",
    secondRuler: "Earnings; financially relevant but not always vocational.",
    genericSaturn: "Counts only when Saturn is already a ruler or 10th tenant.",
    genericSun: "Counts only when the Sun is already a ruler or 10th tenant.",
    fastPlanets: "Too brief and noisy for a whole-life curve.",
    minorAspects:
      "Trine and sextile are weighted above but the cached feed computes major aspects only. They score nothing until the cycle cache is built with minor aspects on.",
  },
} as const;

export type CareerTargetKind =
  | "midheaven"
  | "tenthRuler"
  | "tenthTenant"
  | "tenthHouse";

export const CAREER_TARGET_LABEL: Record<CareerTargetKind, string> = {
  midheaven: "MC–IC axis",
  tenthRuler: "Ruler of the 10th",
  tenthTenant: "Planets in the 10th",
  tenthHouse: "Transits through the 10th",
};

export interface CareerArchitecture {
  mc: Placement | null;
  tenthSign: string | null;
  ruler: string | null;
  rulerPlacement: Placement | null;
  tenants: Placement[];
}

/**
 * Whether a layer of the architecture can light up at all.
 *
 * The distinction this carries is the one the page was silently getting wrong.
 * A chart's 10th ruler is always PRESENT — every cusp has a ruler — but the
 * cached feed computes aspect contacts against a fixed set of natal points
 * (the personal planets, the north node, and the two angles). Under modern
 * rulership five of the twelve signs hand the 10th to Jupiter, Saturn, Uranus,
 * Neptune or Pluto, and for those charts the 0.85-weight ruler layer can never
 * produce a single contact. The page still printed "10th ruler · Saturn in
 * Leo" as though it were being measured.
 *
 * REACHABLE is read off the feed rather than from a copy of the calculator's
 * target list, so it cannot drift out of date when that list changes.
 * OBSERVED is stronger again: reachable and actually contacted somewhere in
 * the cached span.
 */
export interface CareerTargetCoverage {
  kind: CareerTargetKind;
  label: string;
  relevance: number;
  /** The natal points this layer addresses in this chart. */
  points: string[];
  /** Those the feed computes no contacts against. */
  darkPoints: string[];
  /** The chart has this layer at all. */
  present: boolean;
  /** The feed can produce contacts for it. */
  reachable: boolean;
  /** It produced at least one contact in the cached span. */
  observed: boolean;
}

export interface CareerCoverage {
  targets: CareerTargetCoverage[];
  /** Layers that are both present in the chart and reachable in the feed. */
  reachableLayers: number;
  /** The layer count `coverage` is normalised against for this chart. */
  layerSaturation: number;
  /** Present in the chart but wholly unreachable — a layer that can never light. */
  dark: CareerTargetCoverage[];
  /**
   * Every natal address the feed cannot reach, across all layers.
   *
   * Wider than `dark` on purpose. A chart with the Sun and Jupiter in the
   * tenth has a REACHABLE tenant layer — the Sun is a target — while Jupiter
   * sitting beside it contributes nothing, and a notice driven off `dark`
   * alone would report that chart as fully covered. The gap is per address,
   * not per layer.
   */
  darkPoints: string[];
  /** The feed carries trine and sextile contacts. */
  minorAspects: boolean;
  /** A feed arrived at all. False while loading. */
  feedPresent: boolean;
}

export interface CareerContact {
  id: string;
  planet: string;
  color?: string;
  targetKind: CareerTargetKind;
  target: string;
  orientation: "public" | "foundation" | "reorientation" | "support" | "machinery";
  aspect: string | null;
  start: string;
  end: string;
  peak?: string;
  segments: Segment[];
  ageStart: number;
  ageEnd: number;
  targetRelevance: number;
  aspectRelevance: number;
}

export interface CareerParts {
  strongestContact: number;
  convergence: number;
  coverage: number;
  persistence: number;
  multiplicity: number;
}

export interface CareerPoint {
  age: number;
  /** Smoothed, and always the sum of `parts`. */
  value: number;
  /** The unsmoothed reading at this exact sample. */
  rawValue: number;
  parts: CareerParts;
  contacts: CareerContact[];
  /** Before the vocational floor — real transits, not yet a career. */
  formative: boolean;
}

export interface CareerPeak { age: number; value: number }

export interface CareerCurveModel {
  architecture: CareerArchitecture;
  coverage: CareerCoverage;
  contacts: CareerContact[];
  points: CareerPoint[];
  peaks: CareerPeak[];
  windows: CareerWindow[];
  now: CareerPoint | null;
  age: number;
  lifespan: number;
  floorAge: number;
  feed: { start: string; end: string };
}

export function careerArchitecture(
  chart: Chart,
  rulership: Rulership,
): CareerArchitecture {
  const mc = chart.placements.find((p) => p.body === "Midheaven") ?? null;
  const tenth = chart.houses.find((h) => h.number === 10) ?? null;
  const tenthSign = tenth?.sign ?? mc?.sign ?? null;
  const ruler = tenthSign ? rulerOfSign(tenthSign, rulership) : null;
  return {
    mc,
    tenthSign,
    ruler,
    rulerPlacement: ruler
      ? chart.placements.find((p) => p.body === ruler) ?? null
      : null,
    tenants: chart.placements.filter(
      (p) => !p.isAngle && p.houseNumber === 10,
    ),
  };
}

/**
 * What this chart's feed can and cannot say.
 *
 * Derived from the bands themselves: whichever natal points the cache computed
 * aspects against are the points a contact can exist for, whoever decided that
 * list and whenever they last changed it.
 */
export function careerCoverage(
  architecture: CareerArchitecture,
  bands: Band[],
  contacts: CareerContact[],
): CareerCoverage {
  const targeted = new Set(
    bands.flatMap((band) =>
      band.kind === "aspect-cycle" && band.natalPlanet ? [band.natalPlanet] : [],
    ),
  );
  const houseTransits = bands.some((band) => band.kind === "house-transit");
  const observed = new Set(contacts.map((contact) => contact.targetKind));
  const tenants = architecture.tenants.map((placement) => placement.body);

  const layer = (
    kind: CareerTargetKind,
    points: string[],
    present: boolean,
    reachable: boolean,
    darkPoints: string[],
  ): CareerTargetCoverage => ({
    kind,
    label: CAREER_TARGET_LABEL[kind],
    relevance: CAREER_MODEL.targets[kind],
    points,
    darkPoints,
    present,
    reachable,
    observed: observed.has(kind),
  });

  const targets: CareerTargetCoverage[] = [
    layer(
      "midheaven",
      architecture.mc ? ["Midheaven"] : [],
      Boolean(architecture.mc),
      targeted.has("Midheaven"),
      architecture.mc && !targeted.has("Midheaven") ? ["Midheaven"] : [],
    ),
    layer(
      "tenthRuler",
      architecture.ruler ? [architecture.ruler] : [],
      Boolean(architecture.ruler),
      Boolean(architecture.ruler && targeted.has(architecture.ruler)),
      architecture.ruler && !targeted.has(architecture.ruler)
        ? [architecture.ruler]
        : [],
    ),
    layer(
      "tenthTenant",
      tenants,
      tenants.length > 0,
      tenants.some((body) => targeted.has(body)),
      tenants.filter((body) => !targeted.has(body)),
    ),
    layer("tenthHouse", ["House 10"], true, houseTransits, []),
  ];

  const reachableLayers = targets.filter((t) => t.present && t.reachable).length;

  return {
    targets,
    reachableLayers,
    // Normalising against what this chart can reach is what makes the coverage
    // term mean the same thing on two different charts. Against a fixed 3, a
    // chart with two live layers was capped several points below one with four
    // for a reason that had nothing to do with its sky.
    layerSaturation: Math.max(
      1,
      Math.min(CAREER_MODEL.saturation.targetLayers, reachableLayers),
    ),
    dark: targets.filter((t) => t.present && !t.reachable),
    darkPoints: targets.flatMap((t) => t.darkPoints),
    minorAspects: bands.some(
      (band) => band.aspectType === "Trine" || band.aspectType === "Sextile",
    ),
    feedPresent: bands.length > 0,
  };
}

function orientationOf(aspect: string | null, kind: CareerTargetKind): CareerContact["orientation"] {
  if (kind !== "midheaven") return kind === "tenthHouse" ? "public" : "machinery";
  if (aspect === "Opposition") return "foundation";
  if (aspect === "Square") return "reorientation";
  if (aspect === "Trine" || aspect === "Sextile") return "support";
  return "public";
}

function contactsFor(
  chart: Chart,
  bands: Band[],
  architecture: CareerArchitecture,
): CareerContact[] {
  const birth = birthMsOf(chart.birth.date);
  const ageAt = (iso: string) => (Date.parse(iso) - birth) / YEAR_MS;
  const allowed = new Set<string>(CAREER_MODEL.planets);
  const targets = new Map<string, { kind: CareerTargetKind; relevance: number }[]>();
  const add = (name: string | null, kind: CareerTargetKind, relevance: number) => {
    if (!name) return;
    targets.set(name, [...(targets.get(name) ?? []), { kind, relevance }]);
  };
  add("Midheaven", "midheaven", CAREER_MODEL.targets.midheaven);
  add(architecture.ruler, "tenthRuler", CAREER_MODEL.targets.tenthRuler);
  for (const p of architecture.tenants) {
    add(p.body, "tenthTenant", CAREER_MODEL.targets.tenthTenant);
  }

  const out: CareerContact[] = [];
  for (const band of bands) {
    if (!allowed.has(band.title)) continue;

    if (band.kind === "house-transit" && band.houseNumber === 10) {
      out.push({
        id: `${band.id}:tenthHouse`,
        planet: band.title,
        color: band.color,
        targetKind: "tenthHouse",
        target: "House 10",
        orientation: "public",
        aspect: null,
        start: band.start,
        end: band.end,
        peak: band.peak,
        segments: band.segments,
        ageStart: ageAt(band.start),
        ageEnd: ageAt(band.end),
        targetRelevance: CAREER_MODEL.targets.tenthHouse,
        aspectRelevance: 1,
      });
    }

    if (band.kind !== "aspect-cycle" || !band.natalPlanet || !band.aspectType) continue;
    const aspectRelevance = CAREER_MODEL.aspects[
      band.aspectType as keyof typeof CAREER_MODEL.aspects
    ];
    if (!aspectRelevance) continue;
    // One astronomical contact can address the architecture in several ways —
    // for example, the 10th ruler may also live in the 10th. Count the strongest
    // address once so multiplicity remains a count of contacts, not labels.
    const matched = targets.get(band.natalPlanet) ?? [];
    const strongestTarget = matched.reduce<(typeof matched)[number] | null>(
      (best, candidate) => !best || candidate.relevance > best.relevance ? candidate : best,
      null,
    );
    for (const target of strongestTarget ? [strongestTarget] : []) {
      out.push({
        id: `${band.id}:${target.kind}`,
        planet: band.title,
        color: band.color,
        targetKind: target.kind,
        target: band.natalPlanet,
        orientation: orientationOf(band.aspectType, target.kind),
        aspect: band.aspectType,
        start: band.start,
        end: band.end,
        peak: band.peak,
        segments: band.segments,
        ageStart: ageAt(band.start),
        ageEnd: ageAt(band.end),
        targetRelevance: target.relevance,
        aspectRelevance,
      });
    }
  }
  return out.sort((a, b) => a.start.localeCompare(b.start));
}

function activeAt(contact: CareerContact, iso: string): boolean {
  return contact.segments.some((segment) => iso >= segment.start && iso <= segment.end);
}

function exactnessAt(contact: CareerContact, ms: number): number {
  if (!contact.peak) return 1;
  const peak = Date.parse(contact.peak);
  const radius = Math.max(
    peak - Date.parse(contact.start),
    Date.parse(contact.end) - peak,
    1,
  );
  const proximity = Math.max(0, 1 - Math.abs(ms - peak) / radius);
  return CAREER_MODEL.exactnessFloor + (1 - CAREER_MODEL.exactnessFloor) * proximity;
}

const upTo = (n: number, maximum: number) => Math.min(n, maximum) / maximum;

const totalOf = (parts: CareerParts) =>
  Math.min(100, Object.values(parts).reduce((sum, value) => sum + value, 0));

function pointAt(
  age: number,
  birth: number,
  contacts: CareerContact[],
  layerSaturation: number,
): CareerPoint {
  const ms = birth + age * YEAR_MS;
  const iso = new Date(ms).toISOString().slice(0, 10);
  const active = contacts.filter((contact) => activeAt(contact, iso));
  const strengths = active.map(
    (contact) => contact.targetRelevance * contact.aspectRelevance * exactnessAt(contact, ms),
  );
  const strongest = Math.max(0, ...strengths);
  const planets = new Set(active.map((contact) => contact.planet)).size;
  const layers = new Set(active.map((contact) => contact.targetKind)).size;
  const returns = active.reduce(
    (maximum, contact) => Math.max(maximum, contact.segments.length - 1),
    0,
  );
  const weights = CAREER_MODEL.parts;
  const parts: CareerParts = {
    strongestContact: weights.strongestContact * strongest,
    convergence:
      weights.convergence * upTo(planets, CAREER_MODEL.saturation.independentPlanets) * strongest,
    coverage: weights.coverage * upTo(layers, layerSaturation),
    persistence:
      weights.persistence * upTo(returns, CAREER_MODEL.saturation.retrogradeReturns),
    multiplicity:
      weights.multiplicity * upTo(active.length, CAREER_MODEL.saturation.simultaneousContacts),
  };
  const value = totalOf(parts);
  return {
    age,
    value: Math.round(value),
    rawValue: Math.round(value),
    parts,
    contacts: active,
    formative: age < CAREER_MODEL.vocationalFloorAge,
  };
}

/**
 * Smooth the PARTS, and take the value from them.
 *
 * This used to average `value` alone and carry the raw `parts` through
 * untouched, so the readout printed a breakdown that did not add up to the
 * number directly above it — a reader checking the arithmetic of an instrument
 * finds it wrong on the first try, which costs more than the smoothing gains.
 * Averaging the components and re-totalling keeps the identity that every
 * surface here relies on: value is the sum of its parts.
 */
function smooth(points: CareerPoint[]): CareerPoint[] {
  const radius = CAREER_MODEL.smoothingRadiusSamples;
  const keys = Object.keys(CAREER_MODEL.parts) as (keyof CareerParts)[];
  return points.map((point, index) => {
    const slice = points.slice(Math.max(0, index - radius), index + radius + 1);
    const parts = { ...point.parts };
    for (const key of keys) {
      parts[key] =
        slice.reduce((sum, item) => sum + item.parts[key], 0) / slice.length;
    }
    return { ...point, parts, value: Math.round(totalOf(parts)) };
  });
}

function peaksOf(points: CareerPoint[]): CareerPeak[] {
  const candidates = points
    .filter((point, index) =>
      // A peak before the vocational floor is a true transit and a false
      // finding: nothing that happens to a nine-year-old's Midheaven is the
      // career event the label would make of it.
      !point.formative &&
      point.value >= CAREER_MODEL.peak.floor &&
      point.value >= (points[index - 1]?.value ?? -1) &&
      point.value > (points[index + 1]?.value ?? -1),
    )
    .sort((a, b) => b.value - a.value);
  const kept: CareerPeak[] = [];
  for (const point of candidates) {
    if (kept.every((peak) => Math.abs(peak.age - point.age) >= CAREER_MODEL.peak.spacingYears)) {
      kept.push({ age: point.age, value: point.value });
    }
    if (kept.length === CAREER_MODEL.peak.maximumLabels) break;
  }
  return kept.sort((a, b) => a.age - b.age);
}

export function careerActivation(
  chart: Chart,
  bands: Band[],
  rulership: Rulership,
  now: Date = new Date(),
): CareerCurveModel {
  const architecture = careerArchitecture(chart, rulership);
  const contacts = contactsFor(chart, bands, architecture);
  const coverage = careerCoverage(architecture, bands, contacts);
  const birth = birthMsOf(chart.birth.date);
  const raw: CareerPoint[] = [];
  for (let age = 0; age <= CAREER_MODEL.lifespanYears; age += CAREER_MODEL.sampleStepYears) {
    raw.push(pointAt(age, birth, contacts, coverage.layerSaturation));
  }
  const points = smooth(raw);
  const age = (now.getTime() - birth) / YEAR_MS;
  const nowPoint = age >= 0 && age <= CAREER_MODEL.lifespanYears
    ? points.reduce((best, point) => Math.abs(point.age - age) < Math.abs(best.age - age) ? point : best)
    : null;
  return {
    architecture,
    coverage,
    contacts,
    points,
    peaks: peaksOf(points),
    windows: careerWindows(
      points,
      chart.birth.date,
      now,
      CAREER_MODEL.vocationalFloorAge,
    ),
    now: nowPoint,
    age,
    lifespan: CAREER_MODEL.lifespanYears,
    floorAge: CAREER_MODEL.vocationalFloorAge,
    feed: {
      start: bands.reduce((value, band) => !value || band.start < value ? band.start : value, ""),
      end: bands.reduce((value, band) => band.end > value ? band.end : value, ""),
    },
  };
}

export function careerBandLabel(value: number): string {
  return CAREER_MODEL.bands.find((band) => value >= band.from)?.label ?? "Quiet";
}

export function careerBandMeaning(value: number): string {
  return (
    CAREER_MODEL.bands.find((band) => value >= band.from)?.meaning ??
    CAREER_MODEL.bands[CAREER_MODEL.bands.length - 1].meaning
  );
}

/** Re-exported so surfaces can place an age on the calendar without their own epoch. */
export { isoAtAge, birthMsOf, YEAR_MS };
