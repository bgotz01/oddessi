//components/western/love/love-context.tsx
"use client";

import { useEffect } from "react";
import { useChat } from "@/components/chat-provider";
import type { Chart } from "@/lib/charts";
import {
  LOVE_LAYER_LABEL,
  LOVE_PHASE_LABEL,
  LOVE_PHASE_MEANING,
  LOVE_STRENGTH_LABEL,
  LOVE_WINDOW_LABEL,
  interpretLoveWindow,
  type LoveProfile,
  type RelationshipCompass,
  type LoveTimeline,
  type LoveWindow,
} from "@/lib/love";

/**
 * What the chat can see on the Love page.
 *
 * The `_note` is longer here than anywhere else in the app, and it should be.
 * This is the most predictively-abusable surface Oddessi has — more so than
 * Career, which at least concerns a domain where a person can act on a forecast
 * without it being about somebody else. A model handed the words
 * "Major commitment window", a date range and a natal profile will assemble
 * "you will meet someone in 2027" or "this relationship will end", and a reader
 * will remember either sentence for years and may act on it. Nothing in the
 * model supports either. Everything below is written to make those sentences
 * hard to produce.
 *
 * The second-order risk is subtler and is also addressed: a reader who is
 * currently unhappy will ask whether their partner is the right one, and the
 * chart cannot answer that. It has no data about the other person at all.
 * Saying so plainly is more useful than any reading that could be improvised
 * instead.
 *
 * That refusal used to rest on a stronger fact — that Oddessi had no second
 * chart anywhere, and no synastry. `app/western/compatibility` ends that, so
 * the note below was rewritten to stop leaning on it. What is left is narrower
 * and still holds: THIS page is one chart. The compatibility page may be
 * offered when the person being asked about already has stored birth data, and
 * it is not an answer to the same question — it measures contact between two
 * charts, and has its own guard in
 * `components/western/compatibility/compatibility-context.tsx`, written against
 * the failure modes a second chart makes possible.
 */
export function useLoveContext(
  chart: Chart,
  timeline: LoveTimeline,
  profile: LoveProfile,
  ready: boolean,
  compass?: RelationshipCompass,
) {
  const { setPageContext } = useChat();

  useEffect(() => {
    if (!ready) return;

    const window = (w: LoveWindow) => {
      const reading = interpretLoveWindow(w);
      return {
        kind: LOVE_WINDOW_LABEL[w.kind],
        strength: LOVE_STRENGTH_LABEL[w.strength],
        mode: w.mode,
        dates: reading.dates,
        start: w.start,
        end: w.end,
        ages: `${Math.round(w.ageStart)}–${Math.round(w.ageEnd)}`,
        duration: reading.duration,
        status: w.status,
        theme: reading.theme,
        development: reading.development,
        meaning: reading.meaning,
        layers: w.layers.map((layer) => LOVE_LAYER_LABEL[layer]),
        drivers: w.contacts.map((contact) => ({
          contact: contact.label,
          address: contact.address,
          from: contact.start,
          to: contact.end,
          exact: contact.peak,
          core: contact.core,
        })),
      };
    };

    setPageContext({
      _description:
        "Western · Love — the natal relationship pattern, and when it is activated",
      _note:
        "This page has two halves answering two different questions, and they " +
        "must never be blurred. The PROFILE reads the birth chart alone and " +
        "describes a disposition — what this person tends to be drawn to, " +
        "offer, need and fear in relationships. It has no date in it, it is " +
        "not a history, and it is not a forecast. The TIMELINE reads transits " +
        "and progressions and describes periods of EMPHASIS. Neither half " +
        "predicts the other: a chart drawn toward partnership does not get " +
        "more partnership windows. " +
        "NEVER PREDICT AN EVENT. The single most likely mistake here is " +
        "joining a window kind, a strength and a date range into 'you will " +
        "meet someone in 2027' or 'this relationship ends in 2029'. The model " +
        "supports neither and nothing you can say makes it support them. A " +
        "window says a part of the relationship architecture is under " +
        "emphasis for a span, from named contacts. It does NOT say anyone was " +
        "met, that a relationship began, continued or ended, or which way any " +
        "of it resolved. A Commitment window is Saturn asking a relationship " +
        "to take a definite shape, and the same configuration covers " +
        "marrying, formalising, restructuring and ending with equal comfort — " +
        "say so whenever you use the word, and never let it drift into " +
        "meaning a wedding. Romance and Attraction windows say nothing about " +
        "whether anyone is met; an Attraction window with nobody in it is a " +
        "perfectly ordinary reading of one. " +
        "THERE IS NO OUTCOME OR COMPATIBILITY SCORE on this page, and you " +
        "must not invent one. The relationship compass uses hidden relative " +
        "coordinates only to place four bipolar markers. Never quote those " +
        "coordinates as psychological measurements. Do not rate a period, a " +
        "year, a decade or a relationship out of ten or out of a hundred, and " +
        "do not rank windows against each other. `strength` is Minor, Moderate " +
        "or Major and counts INDEPENDENT " +
        "LAYERS OF EVIDENCE — one, two, three or more of the four clocks " +
        "agreeing — not magnitude of consequence. A Major window is a " +
        "statement about how much the model can see, not about how much " +
        "happens. " +
        "THIS PAGE KNOWS NOTHING ABOUT ANYBODY ELSE. It is one chart, and it " +
        "carries no data about any other person. If asked whether a particular " +
        "person is right, compatible, faithful, or the one, say plainly that " +
        "this page has no data about them — do not improvise a reading from " +
        "this chart about a different human being, and do not use the profile " +
        "to describe 'the kind of person you will meet'. It describes the " +
        "reader, not a partner. Western · Compatibility does read two charts " +
        "against each other, and may be offered as the page for a question " +
        "about a specific person WHOSE BIRTH DATA IS ALREADY STORED. That is " +
        "the only thing it changes here. It measures contact between two " +
        "charts and it still cannot say whether two people are right for each " +
        "other, so pointing at it is not a way to answer that question by " +
        "another route. " +
        "Do not assume gender, orientation, monogamy, marriage or children " +
        "anywhere. The chart carries none of that. The 5th house here is " +
        "courtship and play, never offspring. " +
        "The four window kinds are arenas crossed with what a contact does " +
        "there, never a planet: ATTRACTION is Venus under contact (taste and " +
        "pull), ROMANCE is the 5th (courtship, before anything is decided), " +
        "PARTNERSHIP is the 7th and the relationship axis (being one of a " +
        "pair), COMMITMENT is Saturn on that axis specifically. The `mode` is " +
        "what the period does — `opening` is Jupiter, `defining` is Saturn, " +
        "`seasonal` is a progression colouring a stretch rather than " +
        "triggering anything in it. Never rank Jupiter above Saturn or the " +
        "reverse; opening and defining are different in kind. " +
        "`coverage` states which of the four layers this chart can be read on " +
        "AT ALL. An unreachable layer produces nothing forever and looks " +
        "exactly like a quiet one, so never read its silence as a finding " +
        "about this person, and say the reading is partial when layers are " +
        "dark. Progressed dates are symbolic (one day of ephemeris per year " +
        "of life) and are seasons rather than appointments — give them as " +
        "months or years, never as days. If this chart's birth time was " +
        "rounded or remembered, every house-based window is wrong by months " +
        "while still looking exact. " +
        "Each window carries a composed `development` and `meaning`. Those " +
        "are ODDESSI'S readings, derived from the kind and the mode. Expand " +
        "them into prose for this person; never substitute a different " +
        "interpretation and never re-derive one from the raw contacts, or the " +
        "product says something different every time it is asked. The profile " +
        "bullets are fragments by design — expand them, but do not add " +
        "findings that are not in them.",
      chart: chart.name,
      asOf: new Date().toISOString().slice(0, 10),
      age: Math.round(timeline.age),

      profile: {
        caveat: profile.caveat,
        sections: profile.sections.map((section) => ({
          arena: section.label,
          question: section.question,
          reading: Object.fromEntries(
            section.bullets.map((bullet) => [bullet.key, bullet.value]),
          ),
          readFrom: section.sources.map((source) => `${source.label}: ${source.placement}`),
          missing: section.unreadable,
        })),
      },

      relationshipCompass: compass
        ? {
            note:
              "Each marker is a relative balance of capped natal evidence. " +
              "Houses provide context but never move a marker. A centred axis " +
              "is explicitly dual, neutral or uncertain.",
            axes: compass.axes.map((axis) => ({
              poles: `${axis.left} ↔ ${axis.right}`,
              question: axis.question,
              centerState: axis.centerState,
              reading: axis.reading,
              counterpoint: axis.counterReading,
              evidence: axis.contributors.map((entry) => ({
                role: entry.label,
                level:
                  entry.weight === 3
                    ? "structural"
                    : entry.weight === 2
                      ? "modifier"
                      : "supporting",
                placements: entry.placements,
              })),
            })),
            houseContext: compass.context.map((item) => ({
              role: item.label,
              placement: item.placement,
              context: item.note,
            })),
          }
        : undefined,

      now: {
        phase: LOVE_PHASE_LABEL[timeline.phase],
        phaseMeans: LOVE_PHASE_MEANING[timeline.phase],
        open: timeline.open.map(window),
      },
      next: timeline.next ? window(timeline.next) : null,
      later: timeline.later ? window(timeline.later) : null,

      // The whole span, so a question about a particular year is answerable.
      // Ordered as drawn.
      windows: timeline.windows.map(window),

      coverage: {
        layers: timeline.coverage.layers.map((layer) => ({
          layer: LOVE_LAYER_LABEL[layer.layer],
          reachable: layer.reachable,
          // Partial means some of the layer's addresses are dark — normally a
          // missing birth time taking the house half of it. The note above
          // tells the model not to read a dark layer's silence as a finding;
          // this is the field that says which layers are affected.
          partial: layer.partial,
          observed: layer.observed,
          why: layer.why,
        })),
        addressesTheFeedCannotReach: timeline.coverage.darkAddresses,
        hasBirthTime: timeline.coverage.housed,
      },
    });
  }, [chart, timeline, profile, ready, compass, setPageContext]);
}
