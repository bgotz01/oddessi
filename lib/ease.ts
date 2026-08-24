/** lib/ease.ts
 * Ease — the second axis.
 *
 * `lib/dominance` measures how *much* of the chart runs through a house. It is
 * deliberately valence-free: three bodies in a house score the same whether
 * they are comfortable there or not, and `rulerStrength` never inspects a
 * ruler's sign at all. That is the right design for an amplitude measure and
 * the wrong one for the question people actually ask, which is whether a heavy
 * house is heavy like an engine or heavy under pressure.
 *
 * This module answers only the second question, and answers it separately so
 * neither axis can contaminate the other. Crossing them is the whole point: a
 * *light* house with a bad ease is the cell no single ranking can show, and it
 * is usually the most useful thing on the page.
 *
 * Everything below is a stated convention, not a fact about the sky. The
 * tables are exported so the modal and the chat quote the real numbers instead
 * of a hand-copied second set that drifts.
 */

import type { Chart, Placement } from "@/lib/charts";
import {
  WEIGHT_HEAVY_ABOVE,
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

/**
 * Ease is computed as a normalised mean in −1 … +1, and shown multiplied by
 * this.
 *
 * Two decimals of a fraction sitting beside a weight of 38.0 reads as a
 * rounding error rather than as the other half of the reading — the numbers
 * are equally important and looked nothing alike. On a −100 … +100 scale the
 * two columns are siblings, and the unit explains itself: 100 is entirely one
 * way. The maths is untouched; this is presentation only.
 */
export const EASE_DISPLAY_SCALE = 100;

/** Ease as it is shown: a whole number on the −100 … +100 scale. */
export function easePoints(ease: number): number {
  return Math.round(ease * EASE_DISPLAY_SCALE);
}

/** With its sign always written, so a positive value cannot be misread. */
export function easeLabel(ease: number): string {
  const n = easePoints(ease);
  return n > 0 ? `+${n}` : `${n}`;
}

export type EaseBand = "flowing" | "balanced" | "grinding" | "sparse";

export interface HouseEase {
  house: number;
  /** −1 (grinding) … +1 (flowing). */
  ease: number;
  band: EaseBand;
  /**
   * What each component actually contributed, share applied and normalised, so
   * the three sum to `ease` exactly — the same relationship weight's occupancy,
   * ruler strength and ruler activity have to its score.
   *
   * Showing the raw component instead was misleading: a tenancy of +80 sat
   * above a total of +19 and looked like it could not be right, when the
   * component was simply about to be multiplied by its 0.30 share.
   */
  fromAspects: number;
  fromDignity: number;
  fromTenancy: number;
  /**
   * The unweighted character of each component, −1 … +1: how flowing this
   * house's aspects are regardless of how much aspects count for. Useful for
   * asking why a contribution is what it is, so kept alongside it.
   */
  characterAspects: number;
  characterDignity: number;
  characterTenancy: number;
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
  /**
   * True when the ruler also occupies the house and takes the reinforcement.
   *
   * The boost lands on its aspect and dignity contribution, never on its
   * tenancy nature: ruling the room you live in makes your condition and your
   * network more relevant to it, it does not make you more Mars-like.
   */
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

    // Each component's share of the finished number, so the parts add up to
    // the whole on screen instead of the reader having to apply the shares.
    const contribution = (share: number, value: number) =>
      applied === 0 ? 0 : (share * value) / applied;

    const partAspects = contribution(e.share.aspects, fromAspects);
    const partDignity = contribution(e.share.dignity, fromDignity);
    const partTenancy = contribution(e.share.tenancy, fromTenancy);

    const ease = partAspects + partDignity + partTenancy;


    if (rulerIsTenant) {
      notes.push(`${ruler} both rules and occupies it`);
    }

    if (hard > 0 || soft > 0) {
      notes.push(`${soft} easy / ${hard} hard contact${hard + soft === 1 ? "" : "s"}`);
    }

    /**
     * Confidence is evidence, not agreement. Every component contributes: a
     * house whose tenants are heavy and well- or badly-dignified has plenty to
     * go on even if none of them is aspected. Reading confidence off aspect
     * mass alone let an exalted planet sitting in a house be called "no
     * reading", which was the model declining to look at what it could see.
     *
     * Only components the config actually enables count, so a preset that
     * switches tenancy off is a true control: tenants stop deciding the score
     * *and* stop lending it the confidence to escape "sparse".
     */
    const confidence = round2(
      (e.share.aspects > 0 ? aspectMass : 0) +
        (e.share.tenancy > 0 ? tenancyMass : 0) +
        (e.share.dignity > 0 ? dignityEvidence : 0),
    );

    return {
      house: cusp.number,
      ease: round2(ease),
      band: easeBand(ease, confidence, e),
      fromAspects: round2(partAspects),
      fromDignity: round2(partDignity),
      fromTenancy: round2(partTenancy),
      characterAspects: round2(fromAspects),
      characterDignity: round2(fromDignity),
      characterTenancy: round2(fromTenancy),
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
 * The names encode the *ease* axis, not the weight one: High Pressure and
 * Friction are plainly the same character at different volumes, as are Engine
 * and Comfort. "High" carries the weight axis on the harder pair, so the two
 * resistance words cannot be mistaken for each other at a glance. An earlier set paired them the other way — Engine and Millstone as
 * heavy machinery, Clear and Snag as small things — which left nothing in the
 * words to say that Millstone and Snag were the same tone, and that is exactly
 * what people got wrong about them.
 *
 * The opposites are still the diagonals. High Pressure and Comfort are opposed
 * on both axes, as are Engine and Friction.
 *
 * Only the corners are named. The middle of either axis is genuinely
 * unremarkable and inventing a label for it would dress up a non-finding.
 */
export type Quadrant =
  | "engine"
  | "pressure"
  | "comfort"
  | "friction"
  | "steady"
  | "background"
  | "untouched";

export const QUADRANT: Record<
  Quadrant,
  { label: string; coords: string; gloss: string; opposite: Quadrant }
> = {
  engine: {
    label: "Engine",
    coords: "heavy · flow",
    gloss: "Carries a lot, and works smoothly.",
    opposite: "friction",
  },
  pressure: {
    label: "High Pressure",
    coords: "heavy · grind",
    gloss: "Carries a lot, but takes effort.",
    opposite: "comfort",
  },
  comfort: {
    label: "Comfort",
    coords: "light · flow",
    gloss: "Not central, but works easily.",
    opposite: "pressure",
  },
  friction: {
    label: "Friction",
    coords: "light · grind",
    gloss: "Not central, but tends to be difficult.",
    opposite: "engine",
  },
  /**
   * The two cells on the centre line, and the one off the reading entirely.
   *
   * A house sitting at ease zero was showing a dash, which read as missing data
   * rather than as a finding — and it is a finding: a heavy house pulling
   * neither way is doing a great deal of work without any of it being
   * characteristic. That is worth a name.
   */
  steady: {
    label: "Steady",
    coords: "heavy · baseline",
    gloss:
      "A major theme, but tilted toward neither flow nor struggle.",
    opposite: "background",
  },
  background: {
    label: "Background",
    coords: "light · baseline",
    gloss: "Stays in the background and does not demand much.",
    opposite: "steady",
  },
  untouched: {
    label: "Untouched",
    coords: "too little to read",
    gloss: "Almost nothing aspects or dignifies what is here.",
    opposite: "untouched",
  },
};

export function quadrantOf(score: number, band: EaseBand): Quadrant {
  const heavy = score >= WEIGHT_HEAVY_ABOVE;
  // Sparse first: with too little evidence, which side of the weight line a
  // house falls on is the only thing that can be said, and it is not the
  // question the corner is answering.
  if (band === "sparse") return "untouched";
  if (band === "flowing") return heavy ? "engine" : "comfort";
  if (band === "grinding") return heavy ? "pressure" : "friction";
  return heavy ? "steady" : "background";
}
