/**
 * lib/growth/trajectory.ts
 * The composer.
 *
 * This file used to be fifteen hundred lines, of which roughly a thousand were
 * vocabulary tables that the algorithm merely read. The computation was correct
 * and nearly invisible, sitting underneath everything it depended on. Splitting
 * it apart was worth doing before adding anything else: the model gets smarter
 * by acquiring new vocabulary, and a god-file grows by exactly that much every
 * time it does.
 *
 * So the tables live in their own modules and this is where the growth reading
 * is assembled from them:
 *
 *     signs.ts       what a sign asks for, and releases
 *     houses.ts      the twelve arenas
 *     bodies.ts      what a body does to the ground it stands on
 *     archetypes.ts  the role a pole is called
 *     crossing.ts    a body standing across the whole movement
 *     tailwinds.ts   what already helps
 *     types.ts       the contract they all agree on
 *
 * The central claim is unchanged and worth restating because every layer
 * depends on it: the South Node is NOT a fault to be corrected. It is the
 * competence already built, and it is the raw material the North Node direction
 * is made out of. The output is therefore a conversion, not a location.
 *
 * Pure arithmetic over a `Chart`. No ephemeris, so it runs on the client.
 */

import type { Chart, Placement } from "@/lib/charts";
import { rulerOfSign, type Rulership } from "@/lib/rulership";
import { signMeta } from "@/lib/symbols";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";

import { SIGN } from "./signs";
import { HOUSE } from "./houses";
import { BODY_VERBS } from "./bodies";
import { archetypeFor } from "./archetypes";
import { archetypeQuestionsFor } from "./archetype-questions";
import { axisConversionsFor } from "./conversions";
import { deriveCrossing } from "./crossing";
import { tailwindsOf } from "./tailwinds";
import type {
  Conversion,
  ConversionArc,
  DeepPattern,
  Pole,
  Trajectory,
} from "./types";

const NODES = ["North Node", "South Node"];

function find(chart: Chart, body: string): Placement | null {
  return chart.placements.find((p) => p.body === body) ?? null;
}

function poleOf(
  chart: Chart,
  node: "North Node" | "South Node",
  rulership: Rulership,
): Pole | null {
  const p = find(chart, node);
  if (!p) return null;
  const meta = signMeta(p.sign);
  const ruler = rulerOfSign(p.sign, rulership);
  return {
    node,
    sign: p.sign,
    degree: p.degree,
    house: p.houseNumber,
    element: meta?.element ?? null,
    modality: meta?.modality ?? null,
    ruler,
    rulerPlacement: find(chart, ruler),
    tenants:
      p.houseNumber === null
        ? []
        : chart.placements.filter(
            (t) =>
              !t.isAngle &&
              !NODES.includes(t.body) &&
              t.houseNumber === p.houseNumber,
          ),
  };
}

function contacts(chart: Chart, types: string[]): string[] {
  const out = new Set<string>();
  for (const a of chart.aspects) {
    const node = NODES.includes(a.planet1)
      ? a.planet1
      : NODES.includes(a.planet2)
        ? a.planet2
        : null;
    if (!node) continue;
    const other = a.planet1 === node ? a.planet2 : a.planet1;
    if (NODES.includes(other)) continue;
    if (types.includes(a.type.toLowerCase())) out.add(other);
  }
  return [...out];
}

/**
 * Bodies conjunct the South Node, which is not the same as bodies in the South
 * Node's house: a planet can sit on the node from the previous house, and one
 * can share the house while being thirty degrees away.
 */
function anchoredToOrigin(chart: Chart): string[] {
  const out = new Set<string>();
  for (const a of chart.aspects) {
    const type = a.type.toLowerCase();
    const isSouth =
      (a.planet1 === "South Node" && type === "conjunction") ||
      (a.planet2 === "South Node" && type === "conjunction") ||
      (a.planet1 === "North Node" && type === "opposition") ||
      (a.planet2 === "North Node" && type === "opposition");
    if (!isSouth) continue;
    const other = NODES.includes(a.planet1) ? a.planet2 : a.planet1;
    if (!NODES.includes(other)) out.add(other);
  }
  return [...out];
}
function deepOf(pole: Pole, side: DeepPattern["side"]): DeepPattern[] {
  return pole.tenants
    .filter((t) => BODY_VERBS[t.body] && t.houseNumber !== null)
    .map((t) => ({
      body: t.body,
      side,
      sign: t.sign,
      degree: t.degree,
      house: t.houseNumber!,
      verbs: BODY_VERBS[t.body].verbs,
      charge: BODY_VERBS[t.body].charge,
    }));
}


export function trajectory(
  chart: Chart,
  rulership: Rulership = "modern",
): Trajectory | null {
  const from = poleOf(chart, "South Node", rulership);
  const to = poleOf(chart, "North Node", rulership);
  if (!from || !to) return null;

  const movement = SIGN[to.sign];
  const arena = to.house ? HOUSE[to.house as House] : null;
  const origin = SIGN[from.sign];
  if (!movement || !origin) return null;

  const departing = deepOf(from, "departing");
  const arriving = deepOf(to, "arriving");

  /**
   * The arc. House nouns rather than sign names, because a role is something a
   * person can picture themselves occupying and "Libra → Aries" is not.
   */
  const arc = {
    from: archetypeFor(from.sign, from.house) ?? origin.quality,
    into: archetypeFor(to.sign, to.house) ?? movement.quality,
  };

  /**
   * Four imperative beats: what the old ground actually does, then forming,
   * then asserting, then putting it out. The first beat prefers the strongest
   * body embedded in the departing ground — that is what makes the line
   * specific to a chart rather than generic to a sign axis.
   */
  const opener =
    departing.length > 0
      ? BODY_VERBS[departing[0].body].beat
      : from.house
        ? HOUSE[from.house as House].originBeat
        : cap(origin.competence[0]);

  const strapline = [
    opener,
    arena?.formBeat ?? "Work out what you think",
    movement.beat,
    arena?.expressBeat ?? "Act on it",
  ];

  /**
   * The core conversions: this axis's own where they have been written, the
   * departing sign's otherwise.
   *
   * The sign layer is never wrong — the nodes are opposite, so a Libra South
   * Node is always converting toward Aries — it is just arena-blind. Libra in
   * the third becoming Aries in the ninth converts gathered perspectives into a
   * worldview; Libra in the eighth becoming Aries in the second converts shared
   * entanglement into something owned outright. Where that reading exists it
   * replaces the generic one outright rather than being appended to it, because
   * both sets say the same thing and the specific one says it better.
   */
  const axisCore = axisConversionsFor(from.sign, from.house, to.sign, to.house);
  const core: Conversion[] = axisCore ?? origin.conversions;

  /**
   * Then one row per body embedded in the departing ground. Each body's row
   * pairs what it characteristically does with a different facet of the
   * destination — the arena's forming move, the sign's assertion, the arena's
   * expression — so two embedded bodies do not both convert into the same
   * phrase.
   *
   * `intoMode` comes from the arriving SIGN rather than the arena's output,
   * which the macro arc above already uses: a Pluto row reading INVESTIGATION →
   * THESIS directly under a road reading INVESTIGATION → THESIS would look like
   * the section had run out of things to say.
   */
  const facets = [
    arena?.formBeat ?? movement.beat,
    movement.beat,
    arena?.expressBeat ?? movement.beat,
  ];
  const bodyConversions: Conversion[] = departing.map((d, i) => ({
    fromMode: cap(BODY_VERBS[d.body].noun),
    intoMode: movement.mode,
    from: BODY_VERBS[d.body].beat,
    into: cap(facets[i % facets.length].toLowerCase()),
    from_body: d.body,
  }));

  const material = from.house
    ? HOUSE[from.house as House].material
    : origin.competence[0];
  const lead = departing[0];
  const conversionArc: ConversionArc = {
    from: lead ? BODY_VERBS[lead.body].noun : material,
    into: to.house ? HOUSE[to.house as House].output : movement.quality,
    specific: Boolean(lead),
    genericFrom: material,
  };

  const territory = from.house
    ? HOUSE[from.house as House].territory.toLowerCase()
    : `${from.sign} competence`;

  const groundReading = lead
    ? `The ground you are leaving is not generic ${territory}. ${lead.body} stands in house ${lead.house}, and ${lead.charge}. Growth does not ask you to stop — it asks you to make ${BODY_VERBS[lead.body].noun} produce ${movement.quality.toLowerCase()}.`
    : `The ground you are leaving is real competence rather than a bad habit: ${territory} is what it supplies. Growth does not ask you to stop — it asks you to make ${material} produce ${movement.quality.toLowerCase()}.`;

  const resistanceTurn = `The ability is real. But once ${lead ? BODY_VERBS[lead.body].noun : material} starts postponing ${movement.quality.toLowerCase()}, the old competence has become the resistance.`;

  return {
    from,
    to,
    arc,
    strapline,
    movement,
    arena,
    questions: [...movement.questions, ...(arena?.questions ?? [])],
    reflexQuestions: origin.reflexQuestions,
    // Sign × house. Null on a chart with no houses, which is why the sign-level
    // tables above stay in the reading rather than being replaced by these.
    practice: {
      departing: archetypeQuestionsFor(from.sign, from.house),
      arriving: archetypeQuestionsFor(to.sign, to.house),
    },
    conversions: [...core, ...bodyConversions],
    conversionsAreAxisSpecific: Boolean(axisCore),
    conversionArc,
    groundReading,
    resistanceTurn,
    deep: [...departing, ...arriving],
    resistance: {
      pullback: origin.pullback,
      tells: origin.tells,
      ruler: from.rulerPlacement
        ? {
            body: from.ruler,
            sign: from.rulerPlacement.sign,
            degree: from.rulerPlacement.degree,
            house: from.rulerPlacement.houseNumber,
          }
        : null,
      reinforcing: departing,
      anchored: anchoredToOrigin(chart),
    },
    tailwinds: tailwindsOf(chart, to),
    // Null for most charts. The derivation resolves each body's interpretation
    // here so the UI never has to know that a nodal square is what makes one.
    crossing: deriveCrossing(
      contacts(chart, ["square"]).map((body) => {
        const p = find(chart, body);
        return {
          body,
          sign: p?.sign ?? "—",
          degree: p?.degree ?? "",
          house: p?.houseNumber ?? null,
        };
      }),
    ),
    // Placidus puts the nodes in opposite houses in every chart we hold, but it
    // is not guaranteed by the geometry, and the conversion model assumes it.
    // Say so rather than quietly reading a pairing the tables were not written
    // for.
    irregularAxis:
      from.house !== null &&
      to.house !== null &&
      ((from.house + 6 - 1) % 12) + 1 !== to.house,
  };
}
function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
/** House number → the title the rest of the app uses for it. */
export function houseTitle(house: number | null): string | null {
  return house ? getHouseTitle(house as House) : null;
}

