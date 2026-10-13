// lib/astrology/framework-context.ts

import {
  AXES,
  MODALITIES,
  ELEMENTS,
  SIGNS,
  SIGN_ORDER,
  URANUS_FRAMEWORK,
  NEPTUNE_FRAMEWORK,
  PLUTO_FRAMEWORK,
} from "@/lib/astrology/macro/zodiac-framework-data";
import { MODERN_RULER, TRADITIONAL_RULER } from "@/lib/rulership";
import { BODY_IN_A_HOUSE, SIGN_MANNER } from "@/lib/house-reading";
import { BODY_GROUPS, PRINCIPLES } from "@/lib/bodies";
import { planetArchetype } from "@/lib/astrology/planet-archetypes-data";
import { ANGLES, APP_HOUSE_SYSTEM, HOUSE_SYSTEMS } from "@/lib/astrology/house-systems";
import {
  ASPECT_CONCEPTS,
  MAJOR_ASPECTS,
  MINOR_ASPECTS,
  ORB_MODIFIERS,
  PATTERNS,
  PATTERNS_IN_APP,
} from "@/lib/astrology/aspect-guide";
import { BODY_PERIODS, CYCLE_PHASES, TIMING_TECHNIQUES } from "@/lib/astrology/cycle-guide";

export const OUTER_PLANETS = [URANUS_FRAMEWORK, NEPTUNE_FRAMEWORK, PLUTO_FRAMEWORK];

/**
 * Everything the Framework guide knows, for the chat — including the layers
 * the page deliberately leaves off (strength and shadow, gives and costs,
 * distinctions, system notes). The whole guide is sent whichever tab is open,
 * so a question about one layer can draw on the others; `viewing` says which
 * part is on screen.
 */
export function frameworkContext(viewing: string): Record<string, unknown> {
  return {
    viewing,
    _description:
      "Framework — the astrology guide: how signs, planets, houses, rulerships, aspects and cycles fit together",
    signs: SIGN_ORDER.map((k) => {
      const s = SIGNS[k];
      return {
        sign: s.label,
        element: s.element,
        modality: s.modality,
        domain: s.domain,
        keywords: s.keywords,
        expression: s.expression,
        rulerModern: MODERN_RULER[s.label],
        rulerTraditional: TRADITIONAL_RULER[s.label],
        strength: s.strength,
        shadow: s.shadow,
        development: s.development,
      };
    }),
    elements: ELEMENTS,
    modalities: MODALITIES,
    axes: AXES.map((a) => ({
      signs: a.signs.map((k) => SIGNS[k].label),
      tension: a.tension,
    })),
    bodyGroups: BODY_GROUPS,
    bodies: Object.entries(PRINCIPLES).map(([name, p]) => {
      const a = planetArchetype(name);
      return {
        body: name,
        group: p.group,
        principle: p.principle,
        function: p.function,
        distinction: p.distinction,
        ...(p.nature ? { nature: p.nature } : {}),
        ...(a
          ? {
              tagline: a.tagline,
              naturalHouse: a.house,
              meanings: a.meanings,
            }
          : {}),
      };
    }),
    cuspManner: {
      _note:
        "How each sign approaches whichever house it is on the cusp of. The page shows only manner[0]; gives/costs are what that approach contributes to a house and what it trades away there — distinct from the sign's general strength/shadow.",
      bySign: SIGN_MANNER,
    },
    bodyInAHouse: {
      _note:
        "The role a body plays in whichever house it stands in — not its full meaning. Nodes and Chiron are points, not planets.",
      byBody: BODY_IN_A_HOUSE,
    },
    houseSystemInUse: APP_HOUSE_SYSTEM,
    houseSystems: HOUSE_SYSTEMS,
    angles: ANGLES,
    rulership: {
      layers: [
        "House — the area of life",
        "Cusp sign — how that area is approached",
        "House ruler — the ruler of the cusp sign, the planet answering for the area",
        "Ruler placement — the house the ruler sits in, where the area connects",
      ],
      conventionInUse:
        "Modern rulers for house rulership by default (the Traditional scoring preset switches). Dignity uses a separate table: the seven classical planets keep their traditional signs, and Uranus, Neptune and Pluto carry modern rulerships, exaltations and falls alongside.",
      modern: MODERN_RULER,
      traditional: TRADITIONAL_RULER,
      example:
        "7th cusp in Capricorn, Saturn in the 5th: partnership is approached with structure and commitment, and Saturn carries it into creativity and romance — read further through Saturn's sign and aspects.",
    },
    aspects: {
      major: MAJOR_ASPECTS,
      minor: MINOR_ASPECTS,
      orbRule: "Effective orb = base orb × average of the two bodies' multipliers.",
      orbMultipliers: ORB_MODIFIERS,
      concepts: ASPECT_CONCEPTS,
      patterns: PATTERNS.map(({ name, principle, line }) => ({ name, principle, line })),
      patternsInApp: PATTERNS_IN_APP,
    },
    cycles: {
      techniques: TIMING_TECHNIQUES,
      phases: CYCLE_PHASES,
      periods: BODY_PERIODS.map(({ body, period, perSign }) => ({ body, period, perSign })),
      outerPlanetFrameworks: OUTER_PLANETS.map((f) => ({
        planet: f.planet,
        principle: f.principle,
        signs: f.signs,
      })),
    },
    note: "This is general reference, not a reading of any chart. Strength, shadow and development describe tendencies, never verdicts.",
  };
}
