/**
 * lib/growth/resources.ts (historically "tailwinds")
 * What the chart can recruit toward the direction.
 *
 * ─── Why this is no longer called Tailwinds ─────────────────────────────────
 *
 * It was, and the name was making a claim the contents could not support. Five
 * different relations were being filed under "already helping", and only one of
 * them is actually evidence of ease:
 *
 *   supports   trine or sextile to the axis   — genuinely a tailwind
 *   carries    conjunct the North Node        — fused with the direction, which
 *                                               is alignment, NOT ease: Saturn
 *                                               conjunct the node makes the move
 *                                               heavier, not lighter
 *   guides     the node's ruler               — a ROUTE. It can be debilitated,
 *                                               afflicted, or itself square the
 *                                               axis and still be the ruler
 *   inhabits   a body in the node's house     — shares the arena. Says nothing
 *                                               about whether it helps
 *   opens      Jupiter, wherever it is        — the weakest claim of the five.
 *                                               Jupiter always exists, and may
 *                                               have no relation to the
 *                                               destination at all
 *
 * So the honest word is `relation`, not `help`: these are the parts of the
 * chart with a stake in the destination, and each one says what KIND of stake
 * it has. `assists` marks the ones that are genuinely easing rather than merely
 * relevant, so the surface can distinguish them instead of implying that five
 * entries means five helpers.
 *
 * Retaining the entries rather than deleting the weak ones is deliberate: a
 * tightened list would be empty on five of the fourteen charts on hand, which
 * would leave resistance always present and support sometimes missing — the
 * exact lopsidedness the section was added to fix. Better to show the whole
 * field and be accurate about what each part of it claims.
 *
 * The node's ruler and Jupiter always exist, so the LENGTH of the result
 * measures nothing. Which kinds are present is the reading; how many there are
 * is not.
 */

import type { Chart, Placement } from "@/lib/charts";
import type { House } from "@/lib/astrology/house-categories";
import { HOUSE } from "./houses";
import type { Pole, Tailwind, TailwindKind } from "./types";

const NODES = ["North Node", "South Node"];

/**
 * What each KIND of relation claims, and does not claim.
 *
 * These were the second half of every `detail` sentence, which meant they were
 * written once and printed once per row. A chart with two soft contacts to the
 * axis printed "available to the move, and easily left unused for a whole life"
 * against Venus and again against Pluto — identical text under two different
 * placements, which reads as padding and buries the half that varies.
 *
 * They are per-kind facts, so they belong in a per-kind table and want printing
 * once per kind. `detail` is still composed from them below, because the chat
 * receives one sentence per relation and a caveat is the part of it worth
 * carrying; this way there is one copy of each caveat rather than two that can
 * drift.
 */
export const RELATION_NOTE: Record<TailwindKind, string> = {
  guide:
    "A route rather than a helper: it can be well or badly placed and still be the way through.",
  fused:
    "Fusion is alignment, not ease — depending on the body it can make the move considerably heavier.",
  support:
    "Available to the move, and easily left unused for a whole life.",
  arena: "Shared arena rather than active support.",
  expansion:
    "The loosest relation here: Jupiter is in every chart and may have no particular bearing on this direction.",
};

function find(chart: Chart, body: string): Placement | null {
  return chart.placements.find((p) => p.body === body) ?? null;
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

/** Bodies conjunct the North Node — already part of the destination. */
function fusedToDestination(chart: Chart): string[] {
  const out = new Set<string>();
  for (const a of chart.aspects) {
    const type = a.type.toLowerCase();
    const isNorth =
      (a.planet1 === "North Node" && type === "conjunction") ||
      (a.planet2 === "North Node" && type === "conjunction") ||
      (a.planet1 === "South Node" && type === "opposition") ||
      (a.planet2 === "South Node" && type === "opposition");
    if (!isNorth) continue;
    const other = NODES.includes(a.planet1) ? a.planet2 : a.planet1;
    if (!NODES.includes(other)) out.add(other);
  }
  return [...out];
}
export function tailwindsOf(chart: Chart, to: Pole): Tailwind[] {
  const found = new Map<string, Tailwind>();
  const place = (body: string) => find(chart, body);
  const where = (p: Placement | null) =>
    p?.houseNumber ? HOUSE[p.houseNumber as House].territory.toLowerCase() : null;

  /** First writer wins, so the priority order below is the ranking. */
  const add = (
    body: string,
    kind: TailwindKind,
    label: string,
    detail: string,
  ) => {
    const p = place(body);
    if (!p || found.has(body)) return;
    found.set(body, {
      body,
      kind,
      // Only a soft aspect to the axis is evidence that the move is EASIER.
      // Everything else here is relevance of one sort or another.
      assists: kind === "support",
      label,
      detail,
      sign: p.sign,
      degree: p.degree,
      house: p.houseNumber,
    });
  };

  // The node's ruler is the most specific help there is: it is the planet that
  // answers for the destination, so where it stands is how the move is made.
  const rulerPlace = to.rulerPlacement;
  add(
    to.ruler,
    "guide",
    "Guides",
    `Answers for ${to.sign}, so the direction is reached through it${
      where(rulerPlace) ? ` — by way of ${where(rulerPlace)}` : ""
    }. ${RELATION_NOTE.guide}`,
  );

  for (const body of fusedToDestination(chart)) {
    add(
      body,
      "fused",
      "Carries",
      `Sitting on the North Node itself, so it is part of the direction rather than an aid to reaching it. ${RELATION_NOTE.fused}`,
    );
  }

  for (const body of contacts(chart, ["trine", "sextile"])) {
    add(
      body,
      "support",
      "Supports",
      `Holds a soft contact with the axis. ${RELATION_NOTE.support}`,
    );
  }

  for (const t of to.tenants) {
    add(
      t.body,
      "arena",
      "Inhabits",
      `Already standing in house ${to.house}, so it works the same ground the growth has to happen on. ${RELATION_NOTE.arena}`,
    );
  }

  const jup = place("Jupiter");
  add(
    "Jupiter",
    "expansion",
    "Opens",
    `Growth by enlargement rather than by effort${
      where(jup) ? ` — through ${where(jup)}` : ""
    }. ${RELATION_NOTE.expansion}`,
  );

  const ORDER: TailwindKind[] = ["guide", "fused", "support", "arena", "expansion"];
  return [...found.values()].sort(
    (a, b) => ORDER.indexOf(a.kind) - ORDER.indexOf(b.kind),
  );
}
