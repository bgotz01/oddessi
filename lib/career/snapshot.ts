/**
 * lib/career/snapshot.ts
 *
 * WHICH CAREER PARTS THIS CHART HAS, and what they resolve to. Its
 * counterpart, `natal.ts`, holds every word.
 *
 * Nothing here chooses a phrase. The composer's entire job is:
 *
 *   FIND      the eight factors in this chart — an angle, four rulers, the
 *             tenants of the tenth, and the three named bodies
 *   RESOLVE   each factor's declared slots against the sign, body and house
 *             tables, dropping any slot this chart cannot answer
 *   NOTICE    the relations BETWEEN factors, which no single factor can see
 *
 * DROPPING, NOT FILLING
 * A chart with no birth time has no houses, so half the slots below have no
 * source. They are dropped. The alternative — a placeholder, an "unknown", a
 * softened generic line — produces a page that looks complete and is not, and
 * a reader cannot tell the difference between a chart that said little and a
 * reading that could not see.
 *
 * ONE ROW PER TENANT
 * Planets in the tenth are the one factor that can occur more than once, and
 * each gets its own row rather than being summarised into a shared one. A
 * tenth holding Mars and Neptune is not "Mars-and-Neptune in the tenth"; it is
 * two different instruments that happen to share a house, and the reading that
 * merges them describes neither.
 */

import type { Chart, Placement } from "@/lib/charts";
import { rulerOfSign, type Rulership } from "@/lib/rulership";
import {
  CAREER_EMPHASIS,
  CAREER_FACTOR,
  CAREER_HOUSE,
  CAREER_SIGN,
  CAREER_SNAPSHOT_CAVEAT,
  CAREER_TIER_LABEL,
  careerBody,
  type CareerEmphasisKey,
  type CareerFactorKind,
  type CareerSlotSource,
  type CareerTier,
} from "./natal";

export interface CareerBullet {
  key: string;
  value: string;
}

export interface CareerFactorReading {
  /** Unique across the list — the kind alone repeats for tenants. */
  id: string;
  kind: CareerFactorKind;
  label: string;
  represents: string;
  tier: CareerTier;
  tierLabel: string;
  body: string | null;
  sign: string | null;
  house: number | null;
  degree: string | null;
  retrograde: boolean;
  /** The placement itself: "Saturn in Leo · 3rd house". The row's heading. */
  placement: string;
  /** Other career offices this same body holds in this chart. */
  alsoHolds: string[];
  bullets: CareerBullet[];
}

/**
 * One PLACEMENT, with every career office it holds.
 *
 * The factor list is the honest answer to "which questions did we ask"; it is
 * not the honest answer to "what is in this chart". A chart whose Mercury sits
 * in the tenth and rules the second produces two factors and has one Mercury,
 * and a page that draws it twice — same sign, same degree, half the same
 * findings — reads as a bug and spends two cards saying one thing.
 *
 * So the page groups by placement. `labels` carries every office, ordered by
 * weight, and `tier` is the strongest of them: a body that runs the career and
 * also collects the rent is filed under the career.
 */
export interface CareerCard {
  /** The body, or the factor kind for the bodiless Midheaven. */
  id: string;
  /** Every office this placement holds — "In the 10th", "Ruler of the 2nd". */
  labels: string[];
  /** What the strongest of those offices represents. The others would repeat. */
  represents: string;
  tier: CareerTier;
  tierLabel: string;
  placement: string;
  retrograde: boolean;
  bullets: CareerBullet[];
  kinds: CareerFactorKind[];
}

/** Developmental context kept outside the vocational factor model. */
export interface CareerDevelopment {
  northNode: {
    sign: string | null;
    house: number | null;
    degree: string | null;
  } | null;
}

export interface CareerSnapshot {
  factors: CareerFactorReading[];
  /** Findings about the configuration rather than about any one factor. */
  emphasis: CareerBullet[];
  /** Factors this chart has but this data cannot read. Usually a missing time. */
  unreadable: string[];
  /** The chart has angles and houses at all. */
  housed: boolean;
  caveat: string;
  /** Contextual placements that never enter career factor scoring. */
  development: CareerDevelopment;
}

/**
 * Assembly order, which is also reading order.
 *
 * Tier lives on the factor entry and this list agrees with it; the list is
 * what runs, so a factor moved here moves on the page. Sorting by tier instead
 * would leave the order inside a tier to whatever the object literal happened
 * to say, which is not a decision anyone would have made on purpose.
 */
const ORDER: CareerFactorKind[] = [
  "midheaven",
  "tenthRuler",
  "tenthTenant",
  "saturn",
  "sun",
  "sixthRuler",
  "secondRuler",
  "jupiter",
];

/** The three ruler offices, for the doubled-role finding. */
const OFFICES: { kind: CareerFactorKind; house: number }[] = [
  { kind: "tenthRuler", house: 10 },
  { kind: "sixthRuler", house: 6 },
  { kind: "secondRuler", house: 2 },
];

const ANGULAR = new Set([1, 4, 7, 10]);

function ordinal(n: number): string {
  const suffix = n % 10 === 1 && n !== 11
    ? "st"
    : n % 10 === 2 && n !== 12
      ? "nd"
      : n % 10 === 3 && n !== 13
        ? "rd"
        : "th";
  return `${n}${suffix}`;
}

interface Parts {
  body: string | null;
  sign: string | null;
  house: number | null;
}

/**
 * One slot's words, or nothing.
 *
 * The switch is exhaustive over `CareerSlotSource` on purpose: adding a field
 * to one of the tables without teaching the resolver to reach it is a silent
 * hole, and TypeScript catching it here is the cheapest place to find out.
 */
function resolve(source: CareerSlotSource, parts: Parts): string | null {
  const sign = parts.sign ? CAREER_SIGN[parts.sign] : undefined;
  const house = parts.house != null ? CAREER_HOUSE[parts.house] : undefined;
  const body = parts.body ? careerBody(parts.body) : undefined;

  switch (source) {
    case "sign.standing":
      return sign?.standing ?? null;
    case "sign.mode":
      return sign?.mode ?? null;
    case "sign.via":
      return sign?.via ?? null;
    case "sign.cost":
      return sign?.cost ?? null;
    case "body.function":
      return body?.function ?? null;
    case "body.runs":
      return body?.runs ?? null;
    case "body.cost":
      return body?.cost ?? null;
    case "house.arena":
      return house?.arena ?? null;
    case "house.through":
      return house?.through ?? null;
  }
}

/**
 * The placement, as the row's heading.
 *
 * The Midheaven drops its house, and only the Midheaven: it is assigned the
 * tenth here for shape, and under whole-sign houses that is frequently untrue.
 * A row that prints it is not being redundant, it is being wrong.
 *
 * Everything else is stated in full. What a card shows is the card's decision
 * — see `careerCards`, which knows which words its own heading has already
 * said and is the only thing that can know that.
 */
function placementLabel(
  parts: Parts,
  degree: string | null,
  showBody: boolean,
  showHouse: boolean,
): string {
  const where = parts.sign
    ? `${parts.sign}${degree ? ` ${degree}` : ""}`
    : "unplaced";
  const house = showHouse && parts.house != null
    ? ` · ${ordinal(parts.house)} house`
    : "";
  return parts.body && showBody
    ? `${parts.body} in ${where}${house}`
    : `${where}${house}`;
}

function reading(
  kind: CareerFactorKind,
  id: string,
  parts: Parts,
  degree: string | null,
  retrograde: boolean,
  alsoHolds: string[],
): CareerFactorReading {
  const entry = CAREER_FACTOR[kind];
  return {
    id,
    kind,
    label: entry.label,
    represents: entry.represents,
    tier: entry.tier,
    tierLabel: CAREER_TIER_LABEL[entry.tier],
    body: parts.body,
    sign: parts.sign,
    house: parts.house,
    degree,
    retrograde,
    placement: placementLabel(parts, degree, true, kind !== "midheaven"),
    alsoHolds,
    bullets: entry.slots.flatMap((slot) => {
      const value = resolve(slot.from, parts);
      return value ? [{ key: slot.key, value }] : [];
    }),
  };
}

export function careerSnapshot(
  chart: Chart,
  rulership: Rulership,
): CareerSnapshot {
  const placementOf = (body: string): Placement | null =>
    chart.placements.find((p) => p.body === body) ?? null;
  const cuspSign = (n: number): string | null =>
    chart.houses.find((h) => h.number === n)?.sign ?? null;
  const rulerOf = (n: number): string | null => {
    const sign = cuspSign(n);
    return sign ? rulerOfSign(sign, rulership) : null;
  };

  const mc = placementOf("Midheaven");
  // The tenth cusp, with the MC as the fallback the rest of the module already
  // uses — whole-sign and quadrant systems disagree about whether those are the
  // same point, and `careerArchitecture` resolves it the same way.
  const tenthSign = cuspSign(10) ?? mc?.sign ?? null;
  const housed = Boolean(mc && chart.houses.length);

  const tenants = chart.placements.filter(
    (p) => !p.isAngle && p.houseNumber === 10,
  );

  /** Which offices each body holds, for `alsoHolds` and the doubled finding. */
  const offices = new Map<string, string[]>();
  for (const office of OFFICES) {
    const body = office.kind === "tenthRuler" && tenthSign
      ? rulerOfSign(tenthSign, rulership)
      : rulerOf(office.house);
    if (!body) continue;
    offices.set(body, [...(offices.get(body) ?? []), CAREER_FACTOR[office.kind].label]);
  }

  /**
   * The other hats a body wears, for the row that is not about that hat.
   *
   * Kept apart from `offices` because the two answer different questions.
   * Standing in the tenth is not an office — it does not concentrate rulership
   * the way holding two cusps does — so it is disclosed on a row and never
   * counted toward the doubled-role finding. Without it the Sun can appear
   * twice on this page, once as machinery and once as visibility, with nothing
   * saying they are the same Sun.
   */
  const tenancyLabel = CAREER_FACTOR.tenthTenant.label;
  const hats = (body: string, self: string): string[] => {
    const held = (offices.get(body) ?? []).filter((label) => label !== self);
    return tenants.some((t) => t.body === body) && self !== tenancyLabel
      ? [...held, tenancyLabel]
      : held;
  };

  const factors: CareerFactorReading[] = [];
  const unreadable: string[] = [];

  const fromBody = (kind: CareerFactorKind, body: string | null) => {
    if (!body) {
      unreadable.push(CAREER_FACTOR[kind].label);
      return;
    }
    const placement = placementOf(body);
    if (!placement) {
      unreadable.push(`${CAREER_FACTOR[kind].label} (${body})`);
      return;
    }
    factors.push(
      reading(
        kind,
        `${kind}:${body}`,
        { body, sign: placement.sign, house: placement.houseNumber },
        placement.degree,
        placement.retrograde,
        hats(body, CAREER_FACTOR[kind].label),
      ),
    );
  };

  for (const kind of ORDER) {
    switch (kind) {
      case "midheaven":
        if (mc) {
          // The Midheaven is the one factor with no body — it is a point, and
          // its sign is the whole of what it says.
          factors.push(
            reading(kind, kind, { body: null, sign: mc.sign, house: 10 }, mc.degree, false, []),
          );
        } else {
          unreadable.push(CAREER_FACTOR[kind].label);
        }
        break;
      case "tenthRuler":
        fromBody(kind, tenthSign ? rulerOfSign(tenthSign, rulership) : null);
        break;
      case "tenthTenant":
        for (const tenant of tenants) {
          factors.push(
            reading(
              kind,
              `${kind}:${tenant.body}`,
              { body: tenant.body, sign: tenant.sign, house: 10 },
              tenant.degree,
              tenant.retrograde,
              hats(tenant.body, tenancyLabel),
            ),
          );
        }
        break;
      case "sixthRuler":
        fromBody(kind, rulerOf(6));
        break;
      case "secondRuler":
        fromBody(kind, rulerOf(2));
        break;
      default:
        // Saturn, Sun and Jupiter answer for themselves, whatever they rule.
        fromBody(kind, kind === "saturn" ? "Saturn" : kind === "sun" ? "Sun" : "Jupiter");
    }
  }

  /* --- the relations between factors ----------------------------------- */

  const tenthRuler = tenthSign ? rulerOfSign(tenthSign, rulership) : null;
  const rulerPlacement = tenthRuler ? placementOf(tenthRuler) : null;
  const tenantBodies = new Set(tenants.map((t) => t.body));
  const emphasis: CareerBullet[] = [];
  const note = (key: CareerEmphasisKey, lead?: string) => {
    const entry = CAREER_EMPHASIS[key];
    emphasis.push({
      key: entry.key,
      value: lead ? `${lead} — ${entry.value}` : entry.value,
    });
  };

  if (rulerPlacement?.houseNumber === 10) note("rulerInTenth");
  else if (rulerPlacement?.houseNumber && ANGULAR.has(rulerPlacement.houseNumber)) {
    note("rulerAngular");
  }
  if (rulerPlacement?.retrograde) note("rulerRetrograde");
  if (tenthRuler === "Saturn") note("rulerIsSaturn");
  if (tenthRuler === "Jupiter") note("rulerIsJupiter");
  if (tenantBodies.has("Sun")) note("sunInTenth");
  if (tenantBodies.has("Saturn")) note("saturnInTenth");
  if (tenantBodies.has("Jupiter")) note("jupiterInTenth");
  if (housed && tenants.length === 0) note("emptyTenth");
  for (const [body, held] of offices) {
    if (held.length > 1) note("doubledRole", `${body} is ${held.join(" and ").toLowerCase()}`);
  }

  return {
    factors,
    emphasis,
    unreadable,
    housed,
    caveat: CAREER_SNAPSHOT_CAVEAT,
    development: {
      northNode: (() => {
        const node = placementOf("North Node");
        return node
          ? {
              sign: node.sign,
              house: node.houseNumber,
              degree: node.degree,
            }
          : null;
      })(),
    },
  };
}

/**
 * The factor list, grouped into one card per placement.
 *
 * Kept out of `careerSnapshot` rather than replacing its output, because the
 * two surfaces want different shapes and neither is wrong. The chat is handed
 * `factors` — eight questions with eight answers, which is what it needs to
 * write about one of them. The page is handed cards, because a reader is
 * looking at a chart and a chart has one Saturn.
 *
 * TWO KEYS, ONE FINDING
 * Merging exposes a duplication the split layout hid: Saturn's house answers
 * both "where does responsibility land" and "what are the working conditions",
 * and after grouping those sit four lines apart with identical text. Printing
 * it twice looks like a fault; dropping one silently loses a question the
 * model actually asked. The keys are joined instead — "Responsibility lands in
 * · Working conditions" — so the finding appears once and still says both
 * things it was asked.
 */
export function careerCards(snapshot: CareerSnapshot): CareerCard[] {
  const order: string[] = [];
  const grouped = new Map<string, CareerFactorReading[]>();

  for (const factor of snapshot.factors) {
    const key = factor.body ?? factor.kind;
    if (!grouped.has(key)) {
      grouped.set(key, []);
      order.push(key);
    }
    grouped.get(key)!.push(factor);
  }

  return order.map((key) => {
    // `factors` arrives in weight order, so the first office is the strongest
    // and its tier, its wording and its heading lead the card.
    const held = grouped.get(key)!;
    const lead = held[0];
    const labels = held.map((factor) => factor.label);

    const bullets: CareerBullet[] = [];
    const byValue = new Map<string, CareerBullet>();
    for (const bullet of held.flatMap((factor) => factor.bullets)) {
      const seen = byValue.get(bullet.value);
      if (seen) {
        seen.key = `${seen.key} · ${bullet.key}`;
        continue;
      }
      const fresh = { ...bullet };
      byValue.set(bullet.value, fresh);
      bullets.push(fresh);
    }

    return {
      id: key,
      labels,
      represents: lead.represents,
      tier: lead.tier,
      tierLabel: lead.tierLabel,
      // A card headed "In the 10th" has already said the house — including
      // when it holds a second office and is headed "In the 10th · Ruler of
      // the 2nd" — and a card headed "Saturn" has already said the body. Only
      // the heading knows what it has said.
      placement: placementLabel(
        { body: lead.body, sign: lead.sign, house: lead.house },
        lead.degree,
        !labels.includes(lead.body ?? ""),
        lead.kind !== "midheaven" &&
          !held.some((factor) => factor.kind === "tenthTenant"),
      ),
      retrograde: lead.retrograde,
      bullets,
      kinds: held.map((factor) => factor.kind),
    };
  });
}
