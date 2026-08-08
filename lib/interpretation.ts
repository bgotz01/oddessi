/**
 * The reading layer: a thin, typed façade over the vendored interpretation
 * tables in `lib/astrology/`.
 *
 * Arc reached these through a 700-line `AstrologyInterpretationService` that
 * also carried transits, aspects, north-node detail and money-engine lookups.
 * Oddessi only needs bodies-in-signs, bodies-in-houses and signs-on-cusps, so
 * this file is the whole surface — everything else stays unimported, and the
 * tables underneath remain byte-identical to arc so they can be re-synced with
 * `cp`.
 *
 * Nothing here interprets anything itself. It looks things up, and returns null
 * when a combination isn't in the tables rather than inventing prose.
 */

import { Planet, ZodiacSign } from "@/types/astrology";
import {
  PLANET_INFO,
  PLANET_SIGN_INTERPRETATIONS,
  type PlanetInfo,
  type PlanetSignInterpretation,
} from "@/lib/astrology/interpretations/planets";
import {
  HOUSE_INFO,
  HOUSE_TYPE_EXPLANATIONS,
  PLANET_HOUSE_INTERPRETATIONS,
  House,
  type HouseInfo,
  type PlanetHouseInterpretation,
} from "@/lib/astrology/houses/houses";
import {
  SignHouseInterpretationService,
  type SignHouseInterpretation,
} from "@/lib/astrology/houses/sign-house-combinations";

export type {
  HouseInfo,
  PlanetHouseInterpretation,
  PlanetInfo,
  PlanetSignInterpretation,
  SignHouseInterpretation,
};

/** The tables are keyed by enum, but chart JSON carries plain strings. */
const PLANETS = new Set<string>(Object.values(Planet));
const SIGNS = new Set<string>(Object.values(ZodiacSign));

function asPlanet(body: string): Planet | null {
  return PLANETS.has(body) ? (body as Planet) : null;
}

function asSign(sign: string): ZodiacSign | null {
  return SIGNS.has(sign) ? (sign as ZodiacSign) : null;
}

function asHouse(house: number | null): House | null {
  return house !== null && house >= 1 && house <= 12 ? (house as House) : null;
}

export function bodyInfo(body: string): PlanetInfo | null {
  const p = asPlanet(body);
  return p ? (PLANET_INFO[p] ?? null) : null;
}

export function bodyInSign(
  body: string,
  sign: string,
): PlanetSignInterpretation | null {
  const p = asPlanet(body);
  const s = asSign(sign);
  if (!p || !s) return null;
  return PLANET_SIGN_INTERPRETATIONS[p]?.[s] ?? null;
}

export function bodyInHouse(
  body: string,
  house: number | null,
): PlanetHouseInterpretation | null {
  const p = asPlanet(body);
  const h = asHouse(house);
  if (!p || !h) return null;
  return PLANET_HOUSE_INTERPRETATIONS[p]?.[h] ?? null;
}

export function houseInfo(house: number): HouseInfo | null {
  const h = asHouse(house);
  return h ? (HOUSE_INFO[h] ?? null) : null;
}

export function signOnCusp(
  sign: string,
  house: number,
): SignHouseInterpretation | null {
  return SignHouseInterpretationService.getSignHouseInterpretation(sign, house);
}

/** Angular / Succedent / Cadent — the placement's leverage, not its meaning. */
export function houseTypeNote(type: string): string | null {
  const entry =
    HOUSE_TYPE_EXPLANATIONS[type as keyof typeof HOUSE_TYPE_EXPLANATIONS];
  return entry?.description ?? null;
}

/*
 * Dignity.
 *
 * Derived rather than tabulated: PLANET_INFO already records rulership,
 * exaltation, detriment and fall, so a second table would only be a chance to
 * disagree with the first. Order matters — rulership outranks exaltation, and a
 * planet can be both (Mercury rules Virgo and is exalted there).
 */

export type Dignity =
  | "Ruling"
  | "Exaltation"
  | "Detriment"
  | "Fall"
  | "Neutral";

export function dignityOf(body: string, sign: string): Dignity {
  const info = bodyInfo(body);
  const s = asSign(sign);
  if (!info || !s) return "Neutral";
  if (info.rulerOf.includes(s)) return "Ruling";
  if (info.exaltedIn === s) return "Exaltation";
  if (info.detrimentIn?.includes(s)) return "Detriment";
  if (info.fallIn === s) return "Fall";
  return "Neutral";
}

export const DIGNITY_NOTE: Record<Dignity, string> = {
  Ruling:
    "In its own sign. The planet expresses its nature directly, with nothing to translate through.",
  Exaltation:
    "Exalted. The sign flatters the planet — it shows its most refined face here, sometimes past what the situation asks for.",
  Detriment:
    "Opposite its rulership. The planet has to work in a register that is not its own, and the effort shows.",
  Fall: "Opposite its exaltation. The planet's usual strengths carry least weight here; whatever it achieves is built rather than given.",
  Neutral:
    "Neither strengthened nor undercut by the sign. The placement is read on its own terms.",
};
