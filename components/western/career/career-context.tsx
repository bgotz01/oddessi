"use client";

import { useEffect } from "react";
import { useChat } from "@/components/chat-provider";
import type { Chart } from "@/lib/charts";
import {
  CAREER_TARGET_LABEL,
  careerBandLabel,
  careerWindowLabel,
  interpretCareerWindow,
  type CareerCurveModel,
  type CareerSnapshot,
} from "@/lib/career";

/**
 * What the chat can see on the Career page.
 *
 * Split out of the page because it is long, entirely prose, and changes for
 * reasons that have nothing to do with layout.
 *
 * The `_note` carries the weight, and it carries more of it here than on any
 * other page in the app. This is the most predictively-abusable surface
 * Oddessi has: a 0–100 number, a phrase like "turning point", and a set of
 * dates.
 * A model that has not been told otherwise will put those three together into
 * "you will be promoted in 2031", which is a claim nothing in the model
 * supports and which a reader will remember for years. Everything below is
 * written to make that sentence hard to produce.
 */
export function useCareerContext(
  chart: Chart,
  model: CareerCurveModel,
  snapshot: CareerSnapshot,
  status: string,
) {
  const { setPageContext } = useChat();

  useEffect(() => {
    if (status !== "ready") return;

    const architecture = model.architecture;

    setPageContext({
      _description:
        "Western · Career — when the natal vocational architecture is being activated",
      _note:
        "This page answers WHEN the career structure of the chart is under " +
        "contact. It does NOT measure success, income, satisfaction, status, " +
        "or the probability of a promotion, a hire, a raise or a business " +
        "succeeding, and you must never convert it into any of those. Do not " +
        "predict events. The single most likely mistake here is joining the " +
        "index, the phrase 'turning point' and a date range into a forecast; " +
        "the model supports none of that. Two separate readings are below and " +
        "they must not be blurred. The INDEX is a constructed 0-100 number " +
        "for how densely the architecture is being contacted — it is not a " +
        "probability and not a percentage of anything, and its bands " +
        "(Saturated, Dense, Engaged, Sparse, Quiet) describe density of " +
        "contact, never quality of career. A WINDOW is a structural " +
        "classification with no size: `active` is one body in contact, " +
        "`convergence` is two or more INDEPENDENT bodies at once, and " +
        "`turningPoint` is two or more INDEPENDENT bodies ASPECTING THE CORE " +
        "— the MC or the ruler of the 10th — at the same time; a body merely " +
        "transiting the 10th house does not qualify. A turning point is a " +
        "SHAPE and not a DIRECTION: it says the vocational structure is being " +
        "reorganised and never which way it resolves, so the same " +
        "configuration covers a resignation, a restructuring, a demotion, a " +
        "relocation, a launch and a collapse as readily as a promotion. Say " +
        "so whenever you use the phrase, and never let it drift into meaning " +
        "a good outcome. No score promotes a window and no window implies a " +
        "score: a turning point can sit at an ordinary index value, and a " +
        "high index can be one exact contact and nothing else. Never rank the " +
        "grades as magnitudes and never convert one to a number. Planets are functions, not weights: Jupiter is " +
        "opportunity, Saturn consolidation, Uranus reorientation, Neptune " +
        "calling, Pluto reinvention. Pluto is not a stronger Saturn — never " +
        "rank them, and note that opportunity counts as activation exactly as " +
        "much as pressure does. `coverage` below states which layers of this " +
        "chart's architecture the cached feed can reach AT ALL; a layer " +
        "marked unreachable scores zero forever and looks identical to a " +
        "layer that is merely quiet, so never read its silence as a finding " +
        "about this person, and say the reading is partial when layers are " +
        "dark. The index is comparable only against ITSELF over this life — " +
        "different charts have different numbers of reachable addresses and " +
        "therefore different ceilings, so never compare this number with " +
        "another person's. Nothing below age " +
        String(model.floorAge) +
        " is a career event; the transits are real but the noun is not, which " +
        "is why no window or peak starts earlier. Dates: the curve is " +
        "smoothed over months, so give window ages and spans as seasons or " +
        "ages and never as days. An individual contact's `contact` and " +
        "`exact` come straight off the ephemeris and are exact to the day — " +
        "quote those as they stand. The Midheaven moves about a degree every " +
        "four minutes, so if this chart's birth time was rounded or " +
        "remembered, every date here is wrong by months while still looking " +
        "exact. Data exists only inside `feedCovers`. Every window carries a " +
        "composed `reading` — title, what it is asking, the mechanism, the " +
        "opening, the trap, the arenas. That reading is ODDESSI'S, derived " +
        "from which body is in contact, which part of the career structure it " +
        "lands on and what shape the contact takes. Expand it into prose for " +
        "this person; never substitute a different interpretation and never " +
        "re-derive one from the raw placements, or the product says something " +
        "different every time it is asked. `theMove` is the centrepiece and " +
        "should lead. `trap` is the most useful field and the least obvious: " +
        "it is how a period gets spent without changing anything, and it is " +
        "NOT a warning that the transit is bad. `arenas` and " +
        "`mayArriveThrough` say which parts of a life a period tends to " +
        "arrive THROUGH — never what will happen in them.",
      chart: chart.name,
      asOf: new Date().toISOString().slice(0, 10),
      age: Math.round(model.age),
      feedCovers: `${model.feed.start.slice(0, 4)}–${model.feed.end.slice(0, 4)}`,
      vocationalFloorAge: model.floorAge,

      architecture: {
        midheaven: architecture.mc
          ? `${architecture.mc.sign} ${architecture.mc.degree}`
          : null,
        tenthCuspSign: architecture.tenthSign,
        tenthRuler: architecture.ruler
          ? `${architecture.ruler}${
              architecture.rulerPlacement
                ? ` in ${architecture.rulerPlacement.sign}, house ${
                    architecture.rulerPlacement.houseNumber ?? "unknown"
                  }`
                : ""
            }`
          : null,
        planetsInTenth: architecture.tenants.length
          ? architecture.tenants.map((p) => `${p.body} in ${p.sign}`)
          : null,
      },

      // WHAT the career is built out of, as against WHEN it is active.
      //
      // Oddessi has already decided what each placement means; the model's
      // job is to write it for this person. The bullets are deliberately
      // fragments — expand them into prose, never replace them with a
      // different interpretation and never re-derive one from the raw
      // placements, or the product says something different every time it is
      // asked. Weight is ORDERED and the order is the reading: the Midheaven
      // and the ruler of the tenth are the vocation, everything after them
      // modifies it, and a summary that gives the second ruler the same
      // airtime as the Midheaven has flattened the only judgement here.
      natalSignature: {
        _note:
          "The STANDING chart — structure, not timing, and nothing below is " +
          "a transit or a date. It describes how a working life is built and " +
          "how it operates; it does NOT name a job, a title, an industry, a " +
          "salary or a level of success, and you must never convert it into " +
          "one. Never tell this person what they should do for a living. " +
          "`tier` is the weight of each factor and it is ordered — highest, " +
          "high, medium, lower, modifier — so lead with the Midheaven and " +
          "the ruler of the 10th, and never present a modifier as though it " +
          "were the vocation. `costs` fields are the FAILURE MODE of a " +
          "structure, which is how a strength gets spent badly; they are not " +
          "a flaw in the person and not a warning. `configuration` holds the " +
          "findings that are relations between placements rather than " +
          "properties of one, and they outrank single factors when they " +
          "conflict. This is the natal half of the page; the windows above " +
          "are the timed half, and joining a placement to a date is a " +
          "forecast neither half supports.",
        factors: snapshot.factors.map((f) => ({
          factor: f.label,
          represents: f.represents,
          tier: f.tier,
          placement: f.placement,
          retrograde: f.retrograde || null,
          alsoHolds: f.alsoHolds.length ? f.alsoHolds : null,
          reading: Object.fromEntries(f.bullets.map((b) => [b.key, b.value])),
        })),
        configuration: snapshot.emphasis.length
          ? Object.fromEntries(snapshot.emphasis.map((b) => [b.key, b.value]))
          : null,
        unreadable: snapshot.unreadable.length ? snapshot.unreadable : null,
      },

      // The honest limits of this particular reading, stated before any
      // finding derived from it. A dark layer is not a quiet one.
      coverage: {
        _note:
          "`unreachable` layers are present in the chart but absent from the " +
          "cached feed, which computes aspect contacts against the personal " +
          "planets, the north node and the two angles only. They score zero " +
          "on every date below. Treat the reading as partial, say which part " +
          "is missing if asked, and never infer that a dark layer is inactive.",
        reachableLayers: `${model.coverage.reachableLayers} of ${model.coverage.targets.length}`,
        // Per address rather than per layer: a tenth house holding the Sun and
        // Jupiter has a reachable tenant layer with half of it dark.
        unreachableAddresses: model.coverage.darkPoints.length
          ? model.coverage.darkPoints
          : null,
        layers: model.coverage.targets.map((t) => ({
          layer: t.label,
          relevance: t.relevance,
          addresses: t.points.length ? t.points.join(", ") : null,
          state: !t.present
            ? "not in this chart"
            : !t.reachable
              ? "unreachable in the feed — scores zero regardless of the sky"
              : t.darkPoints.length
                ? `partly reachable — ${t.darkPoints.join(", ")} score zero regardless of the sky`
                : t.observed
                  ? "reachable and contacted"
                  : "reachable but never contacted in the cached span",
        })),
        minorAspectsInFeed: model.coverage.minorAspects,
      },

      now: model.now
        ? {
            index: model.now.value,
            band: careerBandLabel(model.now.value),
            activeContacts: model.now.contacts.length,
            window: (() => {
              const current = model.windows.find((w) => w.status === "active");
              return current
                ? `${careerWindowLabel(current.grade)} · ${current.processes.join(" + ")}`
                : "no career window in force";
            })(),
          }
        : null,

      // Peaks are the shape of the life the page is really claiming: where the
      // architecture is most contacted relative to this chart's own quiet.
      peaks: model.peaks.map((peak) => ({
        age: Math.round(peak.age),
        index: peak.value,
        band: careerBandLabel(peak.value),
      })),

      windows: model.windows.map((w) => {
        // Oddessi has already decided what the period means; the model's job
        // is to write it for this person, never to work it out again — which
        // is the whole difference between a product with a position and a
        // fresh horoscope on every visit.
        const r = interpretCareerWindow(w, architecture);
        return {
        age: `${Math.round(w.ageStart)}–${Math.round(w.ageEnd)}`,
        dates: `${w.start.slice(0, 7)} → ${w.end.slice(0, 7)}`,
        grade: careerWindowLabel(w.grade),
        status: w.status,
        peakIndex: w.activation,
        peakBand: careerBandLabel(w.activation),
        processes: w.processes,
        independentBodies: [...new Set(w.contacts.map((c) => c.planet))],
        reading: {
          title: r.title,
          process: r.process,
          address: r.address,
          classification: r.classification,
          phrase: r.phrase,
          activated: r.activated,
          mechanism: r.mechanism,
          theMove: r.theMove,
          thesis: r.thesis,
          opening: r.opening,
          trap: r.trap,
          arenas: r.arenas,
          arenasSummary: r.arenasSummary,
          mayArriveThrough: r.mayArriveThrough,
          convergence: r.convergence ?? null,
        },
        contacts: w.contacts.map((c) => ({
          planet: c.planet,
          hits: c.aspect
            ? `${c.aspect.toLowerCase()} natal ${c.target}`
            : `transiting ${c.target}`,
          layer: CAREER_TARGET_LABEL[c.targetKind],
          // The contact's own dates, which are precise where the window's are
          // not. A window is a season built by grouping overlapping transits,
          // so its edges are a property of the grouping; these came off the
          // ephemeris.
          contact: `${c.start} → ${c.end}`,
          exact: c.peak ?? null,
          retrogradePasses:
            c.segments.length > 1
              ? c.segments.slice(1).map((s) => `${s.start} → ${s.end}`)
              : null,
        })),
        };
      }),
    });

    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart.id, model, snapshot, status]);
}
