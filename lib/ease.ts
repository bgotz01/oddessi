/** lib/ease.ts
 * Ease — the second axis.
 *
 * `lib/dominance` measures how *much* of the chart runs through a house. It is
 * deliberately valence-free: three bodies in a house score the same whether
 * they are comfortable there or not, and `rulerStrength` never inspects a
 * ruler's sign at all. That is the right design for an amplitude measure and
 * the wrong one for the question people actually ask, which is whether a loud
 * house is loud like an engine or loud like a grinding gear.
 *
 * This module answers only the second question, and answers it separately so
 * neither axis can contaminate the other. Crossing them is the whole point: a
 * *quiet* house with a bad ease is the cell no single ranking can show, and it
 * is usually the most useful thing on the page.
 *
 * Everything below is a stated convention, not a fact about the sky. The
 * tables are exported so the modal and the chat quote the real numbers instead
 * of a hand-copied second set that drifts.
 */

import type { Chart, Placement } from "@/lib/charts";
import {
  DEFAULT_SCORING as DEFAULTS,
  type EaseConfig as E,
  type ScoringConfig as Config,
  type WeightConfig as W,
} from "@/lib/scoring";
import { dignityOf, type Dignity } from "@/lib/interpretation";
import { rulerOfSign, signOfLongitude } from "@/lib/rulership";

/**
 * The tables live in `lib/scoring` now — one editable source for both models.
 * Re-exported because the explainer modal reads them to show its working.
 */
export { DEFAULT_SCORING, type EaseConfig, type ScoringConfig } from "@/lib/scoring";

export type EaseBand = "flowing" | "balanced" | "grinding" | "sparse";

export interface HouseEase {
  house: number;
  /** −1 (grinding) … +1 (flowing). */
  ease: number;
  band: EaseBand;
  /** The three contributions, each already normalised to −1 … +1. */
  fromAspects: number;
  fromDignity: number;
  fromTenancy: number;
  /** Counts, for showing the working. */
  hard: number;
  soft: number;
  /**
   * How much there is to go on, in body-weight units, across all three
   * components — not aspect mass alone. A domiciled planet sitting in a house
   * is evidence even if nothing aspects it.
   */
  confidence: number;
  /** The bodies this reading is built from, named once each. */
  constituents: string[];
  /** True when the ruler also occupies the house, and so counted twice. */
  rulerIsTenant: boolean;
  notes: string[];
}

/** Tighter aspects speak louder, but a wide one still counts for something. */
function tightness(orb: number, orbLimit: number): number {
  return 0.4 + 0.6 * Math.max(0, 1 - Math.abs(orb) / orbLimit);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function easeBand(
  ease: number,
  confidence: number,
  e: E = DEFAULTS.ease,
): EaseBand {
  if (confidence < e.sparseBelow) return "sparse";
  if (ease >= e.band) return "flowing";
  if (ease <= -e.band) return "grinding";
  return "balanced";
}

/**
 * What a body actually brings to the house it sits in.
 *
 * Its raw nature, blunted when the sign treats it well. Only malefics are
 * tempered: an exalted Mars is still Mars but lands far softer than a Mars in
 * fall, which is the distinction a flat sum of nature and dignity could not
 * express. Benefics need no such rule — a fallen Venus is already docked by the
 * dignity component, and blunting it here would charge it twice.
 */
export function effectiveNature(
  body: string,
  dignity: Dignity,
  e: E,
): number {
  const nature = e.nature[body] ?? 0;
  const help = e.dignity[dignity] ?? 0;
  if (nature < 0 && help > 0) return nature * (1 - e.temperMalefics * help);
  return nature;
}

/**
 * Every aspect to one body, as a signed pool rather than a mean.
 *
 * The first version averaged each body's aspects and then averaged those
 * averages, which regressed to zero twice and made almost every house read
 * "mixed". Contributions are pooled once, weighted by how tight the aspect is
 * and by how much the body itself carries, and normalised at the end.
 */
function aspectPoolOf(
  chart: Chart,
  body: string,
  bodyWeight: number,
  e: E,
  orbLimit: number,
) {
  let signed = 0;
  let mass = 0;
  let hard = 0;
  let soft = 0;

  for (const aspect of chart.aspects) {
    if (aspect.planet1 !== body && aspect.planet2 !== body) continue;
    if (Math.abs(aspect.orb) > orbLimit) continue;

    const other = aspect.planet1 === body ? aspect.planet2 : aspect.planet1;
    // The nodes are a geometric certainty, not a contact — dominance already
    // treats them as non-actors and it would be incoherent to score them here.
    if (other === "North Node" || other === "South Node") continue;

    const type = aspect.type.toLowerCase();
    const character =
      type === "conjunction" ? (e.nature[other] ?? 0) : (e.aspect[type] ?? 0);

    const w = tightness(aspect.orb, orbLimit) * bodyWeight;
    signed += character * w;
    mass += w;

    if (character <= -0.4) hard += 1;
    else if (character >= 0.4) soft += 1;
  }

  return { signed, mass, hard, soft };
}

export function houseEase(
  chart: Chart,
  config: Config = DEFAULTS,
): HouseEase[] {
  const e = config.ease;
  const bodyWeight: W["body"] = config.weight.body;
  const orbLimit = config.weight.orbLimit;

  return chart.houses.map((cusp) => {
    const tenants = chart.placements.filter(
      (p) =>
        !p.isAngle &&
        p.houseNumber === cusp.number &&
        (bodyWeight[p.body] ?? 0) > 0,
    );
    const ruler = rulerOfSign(signOfLongitude(cusp.longitude), config.rulership);
    const rulerPlacement =
      chart.placements.find((p) => p.body === ruler && !p.isAngle) ?? null;

    /**
     * A house is read through what stands in it and through who runs it.
     *
     * A ruler that also occupies its own house counts for more — that much is
     * real — but the magnitude used to come from pushing the same placement
     * into the array twice, an implicit 2× nobody could see or test. It is a
     * stated multiplier now.
     */
    const rulerIsTenant =
      rulerPlacement !== null &&
      tenants.some((t) => t.body === rulerPlacement.body);

    const parts: Array<{ p: Placement; boost: number }> = tenants.map((t) => ({
      p: t,
      boost:
        rulerPlacement !== null && t.body === rulerPlacement.body
          ? e.rulerIsTenantReinforcement
          : 1,
    }));
    if (rulerPlacement && !rulerIsTenant) {
      parts.push({ p: rulerPlacement, boost: 1 });
    }

    let aspectSigned = 0;
    let aspectMass = 0;
    let dignitySigned = 0;
    let dignityMass = 0;
    let hard = 0;
    let soft = 0;
    const notes: string[] = [];

    // Evidence that is not an aspect: a body standing somewhere, and a sign
    // that has an opinion about it. Tracked separately so confidence can count
    // what the aspect pool cannot see.
    let dignityEvidence = 0;

    for (const { p, boost } of parts) {
      const w = (bodyWeight[p.body] ?? 0) * boost;
      if (w === 0) continue;

      const a = aspectPoolOf(chart, p.body, w, e, orbLimit);
      aspectSigned += a.signed;
      aspectMass += a.mass;
      hard += a.hard;
      soft += a.soft;

      const dignity = dignityOf(p.body, p.sign);
      dignitySigned += (e.dignity[dignity] ?? 0) * w;
      dignityMass += w;
      if (dignity !== "Neutral") {
        dignityEvidence += w;
        notes.push(`${p.body} in ${dignity.toLowerCase()} (${p.sign})`);
      }
    }

    /**
     * Tenancy — who lives here, which is a different question from what they
     * are wired to (aspects) or what shape they are in (dignity). It reads
     * tenants only: the ruler already speaks through the other two components,
     * and counting it here would make an absent ruler govern the room.
     */
    let tenancySigned = 0;
    let tenancyMass = 0;
    for (const t of tenants) {
      const w = bodyWeight[t.body] ?? 0;
      if (w === 0) continue;
      const dignity = dignityOf(t.body, t.sign);
      tenancySigned += effectiveNature(t.body, dignity, e) * w;
      tenancyMass += w;
    }

    const fromAspects = aspectMass === 0 ? 0 : aspectSigned / aspectMass;
    const fromDignity = dignityMass === 0 ? 0 : dignitySigned / dignityMass;
    const fromTenancy = tenancyMass === 0 ? 0 : tenancySigned / tenancyMass;

    // Normalised by the shares that actually applied, so a house with no
    // tenants is not quietly docked for the tenancy share it cannot use.
    const applied =
      e.share.aspects * (aspectMass > 0 ? 1 : 0) +
      e.share.dignity * (dignityMass > 0 ? 1 : 0) +
      e.share.tenancy * (tenancyMass > 0 ? 1 : 0);

    const ease =
      applied === 0
        ? 0
        : (e.share.aspects * fromAspects +
          e.share.dignity * fromDignity +
          e.share.tenancy * fromTenancy) /
        applied;

    if (rulerIsTenant) {
      notes.push(`${ruler} both rules and occupies it`);
    }

    if (hard > 0 || soft > 0) {
      notes.push(`${soft} easy / ${hard} hard contact${hard + soft === 1 ? "" : "s"}`);
    }

    /**
     * Confidence is evidence, not agreement. All three components contribute:
     * a house whose tenants are heavy and well- or badly-dignified has plenty
     * to go on even if none of them is aspected. Reading confidence off aspect
     * mass alone let an exalted planet sitting in a house be called "no
     * reading", which was the model declining to look at what it could see.
     */
    const confidence = round2(aspectMass + tenancyMass + dignityEvidence);

    return {
      house: cusp.number,
      ease: round2(ease),
      band: easeBand(ease, confidence, e),
      fromAspects: round2(fromAspects),
      fromDignity: round2(fromDignity),
      fromTenancy: round2(fromTenancy),
      hard,
      soft,
      confidence,
      constituents: [...new Set(parts.map(({ p }) => p.body))],
      rulerIsTenant,
      notes: notes.slice(0, 3),
    };
  });
}

/**
 * The four corners of weight × ease.
 *
 * Two matched pairs, because an earlier set ("Grind" against "Sore spot") read
 * as though those were opposites when they are the same ease at different
 * volumes. The opposites are the *diagonals*. Engine and Millstone are the
 * heavy pair, Clear and Snag the light one, so the weight axis is legible from
 * the names alone.
 *
 * "Grind" is now the low end of the ease axis rather than a corner name — a
 * corner and an axis end sharing a word made the chart unreadable.
 *
 * Only the corners are named. The middle of either axis is genuinely
 * unremarkable and inventing a label for it would dress up a non-finding.
 */
export type Quadrant = "engine" | "millstone" | "clear" | "snag" | "middle";

export const QUADRANT: Record<
  Quadrant,
  { label: string; coords: string; gloss: string; opposite: Quadrant }
> = {
  engine: {
    label: "Engine",
    coords: "heavy · flow",
    gloss: "Does a lot of the work, and does it well.",
    opposite: "snag",
  },
  millstone: {
    label: "Millstone",
    coords: "heavy · grind",
    gloss: "Does a lot of the work, and it is hard going.",
    opposite: "clear",
  },
  clear: {
    label: "Clear",
    coords: "light · flow",
    gloss: "Not much happens here, and it goes fine.",
    opposite: "millstone",
  },
  snag: {
    label: "Snag",
    coords: "light · grind",
    gloss: "Not much happens here, but it still nags.",
    opposite: "engine",
  },
  middle: {
    label: "Middle",
    coords: "neither end of either axis",
    gloss: "Neither prominent enough nor sharp enough to call either way.",
    opposite: "middle",
  },
};

export function quadrantOf(rank: number, band: EaseBand): Quadrant {
  const heavy = rank <= 3;
  const light = rank >= 9;
  if (heavy && band === "flowing") return "engine";
  if (heavy && band === "grinding") return "millstone";
  if (light && band === "flowing") return "clear";
  if (light && band === "grinding") return "snag";
  return "middle";
}
