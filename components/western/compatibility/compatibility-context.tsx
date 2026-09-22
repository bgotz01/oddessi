//components/western/compatibility/compatibility-context.tsx
"use client";

import { useEffect } from "react";
import { useChat } from "@/components/chat-provider";
import { CELL, EASE_BAND_LABEL, type Synastry } from "@/lib/synastry";

/**
 * What the chat can see on the Compatibility page.
 *
 * `components/western/love/love-context.tsx` has the longest guard in the app
 * and explains why: a reader who is unhappy will ask whether their partner is
 * the right one, and a model handed a natal profile and a date range will
 * assemble an answer a person may act on and will certainly remember. That
 * guard leaned on one fact in particular — that the Love page has no second
 * chart, no synastry, nothing about the other person at all — and used it to
 * refuse the question outright.
 *
 * This page removes that defence. There IS a second chart here, and the model
 * is about to be handed a measured, confident-looking account of two people
 * against each other. So the guard has to be rebuilt without the fact that was
 * carrying it, and it is longer rather than shorter for that.
 *
 * The three failure modes it is written against, in order of how likely they
 * are to do harm:
 *
 *   THE VERDICT. "You two are 82% compatible", or its literary cousin, "this is
 *   a karmic connection". Nothing here measures compatibility. It measures
 *   contact between two birth charts, which is a much smaller claim, and the
 *   two-axis design exists specifically so that no single number can be quoted.
 *
 *   THE COUNSEL. "This relationship will not survive", "you should leave", "he
 *   is not capable of intimacy". The instrument has no access to how either
 *   person was raised, what they want, what they have already survived
 *   together, or whether either is kind — which is most of what decides the
 *   question. A model that answers it anyway is inventing, and the person on
 *   the other end may act on it.
 *
 *   THE VERDICT ON THE ABSENT PARTY. This page is very often read by one of the
 *   two people about the other, who has not asked to be read and is not there
 *   to answer. Descriptions of what the other person is like, what they are
 *   hiding, or what they will do are the worst thing this surface can produce.
 */
export function useCompatibilityContext(reading: Synastry) {
  const { setPageContext } = useChat();

  useEffect(() => {
    const { a, b, lens, signature, areas, tension, activation } = reading;

    setPageContext({
      _description: `Western · Compatibility — two natal charts read against each other, under the ${lens.label} lens`,

      /**
       * Which question the reader is asking. This is the first thing the model
       * needs, because the same contacts mean different things depending on it
       * and the wrong framing is the failure mode that does harm.
       */
      _readAs: {
        lens: lens.label,
        forWhom: lens.forWhom,
        framing: lens.framing,
        notAsked: lens.omits,
        _note:
          "Synastry cannot tell what kind of relationship it is looking at — two charts contact each other identically whether the people are lovers, co-founders, friends or siblings. The reader chose this lens; honour it. Do not read a partnership as a romance, and never suggest that two people under a non-romantic lens are secretly attracted to each other.",
      },

      _whatThisMeasures: [
        "Contact between two birth charts: cross-chart aspects, and where each",
        "person's bodies fall in the other's houses. That is the whole of it.",
        "It is NOT a measure of compatibility, of the quality of a relationship,",
        "of its future, or of whether two people should be together. Nothing",
        "here knows how either person was raised, what either wants, how either",
        "behaves under pressure, what they have already been through, or whether",
        "they are kind to each other — and those decide the question this page",
        "gets asked. Say so when it is asked.",
      ].join(" "),

      _task: [
        lens.framing,
        "",
        "Read the two axes separately and never average them. CHEMISTRY is how",
        "much the two charts activate an area and carries no opinion about",
        "whether that is welcome; EASE is whether the activation flows or",
        "grinds. High chemistry with low ease is a real and common combination",
        "and must never be resolved into a middling score — the tension is part",
        "of the pull, not a deduction from it.",
        "",
        "Both numbers are PERCENTILES against unrelated pairings of the same",
        "charts, not percentages of anything. A chemistry of 70 means more",
        "contact than 70% of pairings with no relationship to each other. 50 is",
        "typical. Quote them that way or not at all.",
        "",
        "The seven areas OVERLAP — one contact is evidence for more than one —",
        "so never sum them, average them, or rank this pair against another by",
        "their total.",
        "",
        "The seven-or-so areas shown are the ones THIS LENS asks for. Others",
        "exist and were deliberately not asked. Do not reach for an area that",
        "is not in the list below, and do not tell the reader what it would",
        "have said.",
        "",
        "The cell, the chemistry and the ease are computed from the contacts",
        "and are IDENTICAL under every lens. Only the areas and the framing",
        "change. If asked, say that plainly rather than implying the lens",
        "re-measured anything.",
        "",
        "Never predict. Never describe the absent person's character, motives",
        "or intentions: this page is usually read by one of the two people",
        "about the other, who has not asked to be read and is not there to",
        "answer. Speak about the contact between two charts, and about what",
        "such a contact tends to ask of two people — not about who these two",
        "are.",
      ].join("\n"),

      charts: { first: a.name, second: b.name },

      signature: {
        cell: CELL[signature.cell].label,
        cellMeans: CELL[signature.cell].points,
        axes: CELL[signature.cell].coords,
        chemistryPercentile: signature.chemistry,
        easePoints: signature.ease,
        phrase: signature.phrase,
        summary: signature.summary,
        countedContacts: signature.contactCount,
        limits: signature.caveats,
      },

      areas: areas.map((area) => ({
        area: area.label,
        measuring: area.question,
        chemistryPercentile: area.chemistry,
        easePoints: area.ease,
        reads: EASE_BAND_LABEL[area.band],
        contacts: area.contactCount,
        shareFromHousesPercent: area.fromHouses,
        drivers: area.contributors.map(
          (c) =>
            `${a.name}'s ${c.aBody} ${c.type} ${b.name}'s ${c.bBody} (orb ${c.orb}°)`,
        ),
      })),

      tension: {
        _note:
          "Not an eighth area. These contacts have already lowered the ease of the areas they belong to; this is the same evidence grouped by which two functions are pressing on each other. Friction is not a fault and not a reason to leave a relationship.",
        axes: tension.strains.map((strain) => ({
          pair: strain.pair,
          reading: strain.reading,
          geometry: strain.geometry,
          contacts: strain.contacts.map(
            (c) =>
              `${a.name}'s ${c.aBody} ${c.type} ${b.name}'s ${c.bBody} (orb ${c.orb}°)`,
          ),
        })),
      },

      whatEachActivates: {
        _note: [
          "The only asymmetric part of the reading, and usually the most useful.",
          "Aspects are symmetric, so every area above scores the same for both",
          "people; houses are not. When the two directions name different fields,",
          "the two people are in different relationships with each other. Neither",
          "direction corrects the other and neither is the real one.",
          "Needs an exact birth time in the RECEIVING chart — A→B depends on B's",
          "time, not A's. A direction reported unavailable has not been estimated.",
        ].join(" "),
        [`${a.name} → ${b.name}`]: activation.aIntoB.available
          ? {
              phrase: activation.aIntoB.phrase,
              fields: activation.aIntoB.fields.slice(0, 4).map((f) => ({
                field: f.name,
                house: f.house,
                sharePercent: f.share,
                bodies: f.visitors.map((v) => v.body),
              })),
            }
          : { unavailable: activation.aIntoB.unavailable },
        [`${b.name} → ${a.name}`]: activation.bIntoA.available
          ? {
              phrase: activation.bIntoA.phrase,
              fields: activation.bIntoA.fields.slice(0, 4).map((f) => ({
                field: f.name,
                house: f.house,
                sharePercent: f.share,
                bodies: f.visitors.map((v) => v.body),
              })),
            }
          : { unavailable: activation.bIntoA.unavailable },
      },

      heldBack: {
        _note:
          "Contacts between two slow bodies, computed and then excluded from every score. Jupiter outward moves slowly enough that these are decided by the gap between two birthdays and are shared with everyone born around the same time. If asked about one, explain that rather than reading it.",
        contacts: reading.excluded.map(
          (c) => `${a.name}'s ${c.aBody} ${c.type} ${b.name}'s ${c.bBody}`,
        ),
      },
    });

    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reading]);
}
