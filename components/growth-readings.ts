//components/growth-readings.ts

/**
 * Composed readings shared by a section and the drawer that answers it.
 *
 * `growth-ui.ts` holds the vocabulary — the type scale, the tab keys — and
 * says why it exists: two definitions of the same thing drift apart. This is
 * the same argument one level up. The Resistance section and the drawer's
 * Resistance tab are two views of one set of facts, and the moment they each
 * compose their own sentence about the South Node's ruler they start telling a
 * reader two different things about it. The drawer had "fused to the old way
 * — on the South Node itself, so a whole part of the psyche is invested in
 * staying" hand-written into it while the page derived a line per body, and it
 * omitted the departing house's tenants altogether.
 *
 * Nothing here imports a component, and nothing here returns JSX. It composes
 * strings and hands back plain data, so a caller can render it as a row, a
 * block, or a sentence in a prompt.
 */

import { BODY_VERBS, HOUSE, type Tailwind, type Trajectory } from "@/lib/growth";
import type { House } from "@/lib/astrology/house-categories";

export interface ResistanceAnchor {
  /** The plain category — what kind of astrological fact this is. */
  label: string;
  /** What it means for the resistance. The finding. */
  reading: string;
  body: string;
  sign: string | null;
  degree?: string;
  house: number | null;
}

/**
 * The chart-specific reasons the old way is easy to reach — each one read.
 *
 * ─── Why these are not provenance ───────────────────────────────────────────
 *
 * The obvious guess about this band is that it lists the placements the text
 * above was derived from, in which case it belongs in a thin citation bar at
 * the top of the section rather than in a band of its own. It is worth writing
 * down that this is not what they are. The behaviours and the response are read
 * off the departing SIGN — every Libra South Node gets those three tells — and
 * none of these placements touches them. Pluto in the departing house does
 * determine something, but it is `conversionArc.from` and `groundReading`, both
 * of which are section 02. The ruler determines nothing else on the page at
 * all.
 *
 * So they are additional facts, and additional facts have to earn their place
 * by saying something. "Venus in Gemini, house 11" on its own does not: a
 * reader is entitled to ask what that has to do with retreating, and the band
 * had no answer.
 *
 * ─── What each one now says ─────────────────────────────────────────────────
 *
 * The readings are derived, not written. The ruler's is the departing sign's
 * ruler read through the house it stands in — that house's territory is the
 * arena the retreat is actually conducted in, which is the whole reason the
 * ruler is worth naming. The other two come from `BODY_VERBS[body].charge`,
 * the model's own line for what a body does to ground it stands on, which is
 * exactly the question being asked here and was already being used one section
 * up to explain the departing ground.
 *
 * Angles carry no charge — they are not bodies and the table rightly has no
 * entry for them — so the two that can land on a node have a line each.
 *
 * ─── The two overlapping claims ─────────────────────────────────────────────
 *
 * A body conjunct the South Node is nearly always also standing in the
 * departing house, so on four of the fourteen charts on hand the same body
 * appeared under both headings. The stronger claim contains the weaker —
 * something the old strategy cannot be separated from is obviously also in its
 * ground — so the node row wins the body and the house row keeps what is left.
 */
export function resistanceAnchors(t: Trajectory): ResistanceAnchor[] {
  const out: ResistanceAnchor[] = [];
  const { ruler, anchored, reinforcing } = t.resistance;

  if (ruler) {
    out.push({
      label: "Ruler",
      // Where the ruler stands is the arena the retreat is conducted in.
      //
      // The frame is "the old way", not "the retreat", because house 12's
      // territory IS "Retreat and the unlit" — a chart with the departing
      // ruler there read "The retreat runs through retreat and the unlit".
      // Checked against all twelve territories; this frame carries every one,
      // including the two that read least naturally (1 "self and first move",
      // 7 "the other person").
      //
      // Without a house there is no arena to name, which is the one case this
      // falls back to stating the mechanism's owner and nothing more.
      reading: ruler.house
        ? `The old way is reached through ${HOUSE[ruler.house as House].territory.toLowerCase()}`
        : `The old strategy answers to ${ruler.body}`,
      body: ruler.body,
      sign: ruler.sign,
      degree: ruler.degree,
      house: ruler.house,
    });
  }

  for (const body of anchored) {
    // `anchored` is names only — the model just needs to know WHICH bodies sit
    // on the node. The placement is already to hand: a body conjunct the South
    // Node stands in the departing house.
    const p = t.from.tenants.find((x) => x.body === body);
    out.push({
      label: "On the South Node",
      reading: charge(body, "Built into the old strategy itself"),
      body,
      sign: p?.sign ?? null,
      degree: p?.degree,
      house: p?.houseNumber ?? null,
    });
  }

  for (const d of reinforcing) {
    if (anchored.includes(d.body)) continue;
    out.push({
      label: "In the departing house",
      reading: sentence(d.charge),
      body: d.body,
      sign: d.sign,
      degree: d.degree,
      house: d.house,
    });
  }

  return out;
}

/** What this body does to the ground it stands on, as a line. */
function charge(body: string, fallback: string): string {
  const known = BODY_VERBS[body]?.charge;
  if (known) return sentence(known);
  return ANGLE_CHARGE[body] ?? fallback;
}

/**
 * The two angles that can sit on a node.
 *
 * BODY_VERBS is a table of what a PLANET does to ground it stands on, and an
 * angle does not do anything to ground — it is a direction the chart faces. So
 * rather than force an entry into that table and have it read as a planet,
 * the two cases that actually occur get a line here.
 */
const ANGLE_CHARGE: Record<string, string> = {
  Ascendant: "The old way is how you arrive",
  Midheaven: "The old way is how you are known",
};

/** The charges are written as clauses. On the page they open a line. */
function sentence(clause: string): string {
  return clause.charAt(0).toUpperCase() + clause.slice(1);
}


/* ════════════════════════════════════════════════════════════════════════════
   04 · Resources
   ════════════════════════════════════════════════════════════════════════════ */

export interface ResourceReading {
  /** The kind of relation, from the model. "Guides", "Supports", "Opens". */
  label: string;
  /** What having it means for the move. The finding. */
  reading: string;
  assists: boolean;
  body: string;
  sign: string;
  degree: string;
  house: number | null;
}

/**
 * What each relation actually means for the move.
 *
 * This layer used to print `AMOUNTS_TO[kind]` — "the route through", "makes it
 * easier" — three words keyed by kind and identical on every chart that has
 * that kind. It sat at label size beside a placement at value size, which is
 * precisely the arrangement Resistance was called out for: the citation
 * dressed as the finding, and the finding reduced to a caption.
 *
 * These are derived instead, and from the same two sources the resistance
 * anchors use — a house's territory and a body's own noun — so the two
 * sections are not merely laid out alike, they are reasoning alike. Which
 * source applies depends on what kind of relation it is, and that is not
 * arbitrary:
 *
 *   guide / expansion           are claims about WHERE. The node's ruler is a
 *                               route, and a route runs through the arena the
 *                               ruler stands in; Jupiter enlarges whatever it
 *                               is standing in. Both read the house, and both
 *                               are unique per chart, so neither can repeat.
 *
 *   fused / support             are claims about WHAT. A body conjunct the
 *                               node is part of the direction, and a body
 *                               holding a soft aspect is a capacity the move
 *                               can call on — in both cases the answer is the
 *                               body itself, so both read its noun.
 *
 *   arena                       is both, and has to be: several bodies can
 *                               share the destination house, so a reading
 *                               taken from the house alone repeats verbatim
 *                               down the band.
 *
 * The guide line deliberately rhymes with the resistance ruler's. "The old way
 * is reached through mind and exchange" and "The direction is reached through
 * the collective" are the same sentence about the two ends of the axis, and a
 * reader who has both on one page should be able to see that.
 */
export function resourceReadings(t: Trajectory): ResourceReading[] {
  return t.tailwinds.map((w) => ({
    label: w.label,
    reading: readingFor(w),
    assists: w.assists,
    body: w.body,
    sign: w.sign,
    degree: w.degree,
    house: w.house,
  }));
}

function readingFor(w: Tailwind): string {
  const where = w.house ? HOUSE[w.house as House].territory.toLowerCase() : null;

  switch (w.kind) {
    case "guide":
      return where
        ? `The direction is reached through ${where}`
        : `The direction answers to ${w.body}`;

    case "fused":
      return `${nounOf(w.body)} is part of the direction`;

    case "support":
      return `${nounOf(w.body)} is available to the move`;

    // Names the body as well as the house. Read from the house alone this
    // printed "Already working the public record" twice on any chart with two
    // bodies in the destination — a stutter, and a wasted row: the claim is
    // that a PARTICULAR capacity is already at work on the ground the move
    // needs, and dropping the body threw away the half that varies.
    case "arena":
      return where
        ? `${nounOf(w.body)} already works ${where}`
        : `${nounOf(w.body)} already stands on the ground the move needs`;

    case "expansion":
      return where
        ? `Enlargement through ${where}`
        : "Growth by enlargement rather than by effort";
  }
}

/**
 * What a body brings, as a noun.
 *
 * `BODY_VERBS[x].noun` is the model's own word for it and is already used to
 * name the departing ground one section up. The two angles that can hold a
 * relation to the axis are not bodies and have no entry, so they carry a
 * phrase each — the same arrangement, and for the same reason, as the angles
 * in the resistance anchors above.
 */
function nounOf(body: string): string {
  const known = BODY_VERBS[body]?.noun;
  if (known) return sentence(known);
  return ANGLE_NOUN[body] ?? body;
}

const ANGLE_NOUN: Record<string, string> = {
  Ascendant: "How you arrive",
  Midheaven: "How you are known",
};
