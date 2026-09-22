/**
 * lib/synastry/tension.ts
 *
 * WHERE THE FRICTION IS, NAMED BY WHAT IS RUBBING.
 *
 * This is not an eighth area. Every hard contact has already lowered the ease
 * of whichever areas it belongs to in `dimensions.ts`; if friction were also
 * scored as an area of its own, a single Mars–Moon square would appear twice —
 * once as Emotional's friction and once as Conflict's chemistry — and the page
 * would be reporting one measurement as two findings. So this file measures
 * nothing new. It is a second view of contacts that have already been counted,
 * cut a different way.
 *
 * The cut is the point. "Negative aspects" is not a useful category, because
 * every hard contact in it is hard about something specific, and the specific
 * thing is the whole content. Mars to Mercury and Moon to Saturn are both
 * squares and have nothing else in common: one is a speed problem between
 * acting and explaining, the other is a permission problem between needing and
 * withholding. Naming the pair of FUNCTIONS in collision says that, and the
 * aspect's valence does not.
 *
 * WHY THE READINGS ARE COMPOSED AND NOT LOOKED UP
 * Thirteen bodies make seventy-eight unordered pairs, times four hard angles.
 * A table of three hundred sentences would be written once, be wrong in
 * fifteen places, and never be corrected. So each body carries two small pieces
 * of vocabulary — what it governs, and what it does when it meets resistance —
 * and the reading is built from the two. The result is shorter than a
 * hand-written sentence would be and it is right for every pair, including the
 * pairs nobody thought about. Anything longer than a line belongs to the
 * council, which is handed the same contacts through `ask`.
 */

import type { Contact } from "./contacts";
import { counted } from "./contacts";
import { firstName } from "@/lib/charts";

/**
 * A contact is friction at or below this valence.
 *
 * −0.4 is the quincunx, which is the softest thing worth putting on this map.
 * It also catches the conjunctions whose bodies make them hard — Mars with
 * Saturn averages −0.72 and belongs here, while Venus with Jupiter averages
 * +0.85 and plainly does not.
 */
const FRICTION_AT = -0.4;

/**
 * What each body governs, and what it does when something resists it.
 *
 * `does` is written to finish "one ___ where the other ___", so every entry has
 * to be a present-tense verb phrase that survives being read in either slot.
 * The temptation is to write these as character judgements — Saturn "is cold",
 * Pluto "is controlling" — which would be an interpretation smuggled into a
 * vocabulary table, and would make every Saturn contact read as an accusation.
 * They describe a motion, not a fault.
 */
const FUNCTION: Record<string, { name: string; does: string }> = {
  Sun: { name: "Identity", does: "needs to be the author of it" },
  Moon: { name: "Security", does: "needs the ground to hold" },
  Mercury: { name: "Communication", does: "wants it said exactly" },
  Venus: { name: "Affection", does: "wants it pleasant" },
  Mars: { name: "Action", does: "moves first and asks after" },
  Jupiter: { name: "Expansion", does: "wants more of it" },
  Saturn: { name: "Restraint", does: "slows it down and asks what it costs" },
  Uranus: { name: "Freedom", does: "will not be fixed in place" },
  Neptune: { name: "Idealisation", does: "dissolves the edges of it" },
  Pluto: { name: "Power", does: "goes all the way in" },
  Ascendant: { name: "Presence", does: "arrives a particular way" },
  Midheaven: { name: "Direction", does: "aims it at something" },
  "North Node": { name: "Becoming", does: "pulls toward what is unpractised" },
};

/**
 * What the angle itself contributes, independent of the bodies.
 *
 * Only the hard angles appear. A trine is not on this map and a conjunction is
 * here only because two difficult bodies can make one.
 */
const GEOMETRY: Record<string, string> = {
  square: "At cross purposes — neither position leaves the other room",
  opposition: "At opposite ends — each stands where the other cannot reach",
  quincunx: "Misaligned — adjustments never quite land",
  conjunction: "Fused — they arrive as one thing and cannot be dealt with separately",
};

/** One person's half of a collision. */
export interface StrainSide {
  /** Which chart, so a caller can colour or order the two consistently. */
  side: "a" | "b";
  /** First name only — see `firstName` in lib/charts.ts. */
  name: string;
  body: string;
  /** "moves first and asks after". Finishes the name. */
  does: string;
}

export interface Strain {
  id: string;
  /** "Action × Communication". The heading. */
  pair: string;
  /** The two bodies, in the order the pair is named. */
  bodies: [string, string];
  /** Sum of the contributing contacts' weights. */
  weight: number;
  /** Every hard contact on this axis, both directions, heaviest first. */
  contacts: Contact[];
  /**
   * Who is doing what, one entry per person.
   *
   * It used to read "One moves first and asks after · The other wants it said
   * exactly", which is the right observation addressed to nobody: a reader has
   * to work out which half is theirs before the line means anything, and on an
   * axis like Restraint × Security getting it backwards inverts the whole
   * reading. Attribution comes from the HEAVIEST contact on the axis, so the
   * names follow the contact that is actually driving it.
   */
  sides: readonly [StrainSide, StrainSide];
  /**
   * The same thing unattributed, kept for the council prompt, which is handed
   * full names elsewhere in the sentence and does not need them twice.
   */
  reading: readonly string[];
  /**
   * True when the axis carries contacts running BOTH ways — A's Mars to B's
   * Mercury and A's Mercury to B's Mars. Then each person is doing both things
   * and naming one of them to each is only half the picture, so the page says
   * so rather than picking a side.
   */
  mutual: boolean;
  /** What the tightest angle on this axis contributes. */
  geometry: string;
  ask: string;
}

export interface TensionMap {
  strains: Strain[];
  /** Total friction mass, for the signature. */
  total: number;
  /** True when nothing crossed the threshold — a real finding, not an error. */
  none: boolean;
  ask: string;
}

function functionOf(body: string): { name: string; does: string } {
  return FUNCTION[body] ?? { name: body, does: "operates on its own terms" };
}

/**
 * The axis two bodies sit on, as a stable key.
 *
 * Unordered, so A's Mars to B's Mercury and A's Mercury to B's Mars land on the
 * same axis and are read as one strain with two contacts. They are genuinely
 * two different experiences — who is doing the pushing changes — and that is
 * what the contact list under each strain is for. The axis is still one axis.
 */
function axisKey(one: string, two: string): string {
  return [one, two].sort().join("|");
}

function readingFor(one: string, two: string): string[] {
  const first = functionOf(one);
  const second = functionOf(two);
  if (one === two) {
    return [`Each ${first.does}`, "Only one such position is available"];
  }
  return [`One ${first.does}`, `The other ${second.does}`];
}

/**
 * Who is on each side, taken from the heaviest contact on the axis.
 *
 * `aBody` is always the first chart's and `bBody` the second's, so this is a
 * direct read rather than a guess — the only judgement is which contact speaks
 * for the axis when there are several, and that is the one carrying most
 * weight.
 */
function sidesOf(
  tightest: Contact,
  aName: string,
  bName: string,
): [StrainSide, StrainSide] {
  return [
    {
      side: "a",
      name: firstName(aName),
      body: tightest.aBody,
      does: functionOf(tightest.aBody).does,
    },
    {
      side: "b",
      name: firstName(bName),
      body: tightest.bBody,
      does: functionOf(tightest.bBody).does,
    },
  ];
}

export function tensionMap(
  contacts: Contact[],
  aName: string,
  bName: string,
): TensionMap {
  const hard = counted(contacts).filter((c) => c.valence <= FRICTION_AT);

  const axes = new Map<string, Contact[]>();
  for (const contact of hard) {
    const key = axisKey(contact.aBody, contact.bBody);
    axes.set(key, [...(axes.get(key) ?? []), contact]);
  }

  const strains: Strain[] = [...axes.entries()]
    .map(([key, list]) => {
      const sorted = [...list].sort((x, y) => y.weight - x.weight);
      const [one, two] = key.split("|") as [string, string];
      const weight = sorted.reduce((sum, c) => sum + c.weight, 0);
      const tightest = sorted[0];

      const drivers = sorted
        .map(
          (c) =>
            `${aName}'s ${c.aBody} ${c.type} ${bName}'s ${c.bBody} (orb ${c.orb}°)`,
        )
        .join("; ");

      // Both ways round: A's Mars to B's Mercury and also A's Mercury to B's
      // Mars. Each person is then doing both things.
      const mutual =
        one !== two &&
        sorted.some((c) => c.aBody === one) &&
        sorted.some((c) => c.aBody === two);

      return {
        id: key.replace("|", "-"),
        pair: `${functionOf(one).name} × ${functionOf(two).name}`,
        sides: sidesOf(tightest, aName, bName),
        mutual,
        bodies: [one, two] as [string, string],
        weight: Math.round(weight * 10) / 10,
        contacts: sorted,
        reading: readingFor(one, two),
        geometry: GEOMETRY[tightest.type] ?? "",
        ask: `On the compatibility page, under the tension map: ${drivers}. This is filed as ${functionOf(one).name} against ${functionOf(two).name}. Say what that collision is actually like to live with between two people — what each one is doing that the other experiences as the problem, and what it would take from both of them. Friction is not a verdict on the relationship and hard contacts are not a reason to leave one; do not treat it as either.`,
      };
    })
    .sort((x, y) => y.weight - x.weight);

  const total = strains.reduce((sum, s) => sum + s.weight, 0);

  return {
    strains,
    total: Math.round(total * 10) / 10,
    none: strains.length === 0,
    ask:
      strains.length === 0
        ? `On the compatibility page: no contact between ${aName} and ${bName} crossed the friction threshold. Say plainly what that does and does not mean — an absence of hard cross-aspects is not an absence of conflict between two people, it is an absence of it in this measurement, and most of what makes relationships difficult is not in a chart at all.`
        : `On the compatibility page: the friction between ${aName} and ${bName} falls on ${strains.length} ${strains.length === 1 ? "axis" : "axes"} — ${strains.map((s) => s.pair).join(", ")}. Take them in order of weight. Do not add them up into a judgement about whether these two should be together; that is not a question this instrument can answer.`,
  };
}
