//components/activation-context.tsx

"use client";

import { useEffect } from "react";
import { useChat } from "@/components/chat-provider";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import type { Chart } from "@/lib/charts";
import {
  beatLabel,
  gradeLabel,
  interpretActivationWindow,
  kindLabel,
  orientationLabel,
  type GrowthActivation,
  type Trajectory,
} from "@/lib/growth";

/**
 * What the chat can see on the Activation page.
 *
 * Split out of the page because it is long, entirely prose, and changes for
 * reasons that have nothing to do with layout — the page reads as a table of
 * contents when this is not sitting in the middle of it.
 *
 * The `_note` does most of the work. Everything on this page is a coincidence
 * of independent pressures, and a model that has not been told that will reach
 * for the two things it must not do: turn a grade into a magnitude, and turn a
 * window into a prediction. Both are easy to write and impossible to justify,
 * so the contract states the mechanism rather than trusting the field names.
 */
export function useActivationContext(
  chart: Chart,
  t: Trajectory,
  model: GrowthActivation,
  status: string,
) {
  const { setPageContext } = useChat();

  useEffect(() => {
    if (status !== "ready") return;

    setPageContext({
      _description:
        "Growth · Activation — when the natal trajectory is unusually active",
      _note:
        "This page does NOT interpret the natal axis; /western/growth does " +
        "that, and the axis is summarised here only so windows can be read " +
        "against it. What this page computes is WHEN. Keep two things apart. " +
        "The NODAL RHYTHM is developmental: the transiting nodes returning " +
        "to, reversing onto, or squaring the natal axis on a fixed 18.6-year " +
        "grid. It is the only other genuine CYCLE in the model, it is " +
        "arithmetic, and its AGES are the same for every person alive — never " +
        "present a beat age as specific to this chart; only what it lands on " +
        "is. The slow planets are not more clocks, they are independent " +
        "PRESSURES: their positions are collective, and what is personal is " +
        "where they strike this axis. A window is a stretch where several " +
        "pressures converge. `grade` is a structural classification and NOT a " +
        "magnitude — never say a turning-point window will be bigger, harder " +
        "or more important than an active one, and never convert a grade to a " +
        "number or a percentage. A TURNING POINT is a different SHAPE, not a " +
        "higher total: it requires something landing on the axis itself while " +
        "other pressures are already in play, which is what reorganises a " +
        "trajectory rather than merely loading it — a window with four " +
        "structural activations and no direct hit is a large convergence and " +
        "still not a turning point. `orientation` is the window's own claim " +
        "and the link back to the trajectory: forward means the pressure is " +
        "on where they are going, return means it is on where they came from " +
        "(NOT regression — that is the material being converted), crossroads " +
        "means it sits across both ends. Lead with it. Every window carries a " +
        "composed `reading` — title, thesis, the move, opening, trap, arenas. " +
        "That reading is ODDESSI\u2019S, derived from the trajectory, the part " +
        "of it being touched and the transiting planet\u2019s mechanism. Expand " +
        "it into prose for this person; never substitute a different " +
        "interpretation or re-derive one from the raw placements, or the " +
        "product says something different every time it is asked. `trap` is " +
        "the most useful field and the least obvious: it is how the old " +
        "strategy absorbs the event and leaves the trajectory unchanged, and " +
        "it is not a warning about the transit being bad. `arenas` and " +
        "`mayBecomeConcreteThrough` say which parts of a life a period tends " +
        "to arrive THROUGH \u2014 never what will happen in them. Do not " +
        "predict events. Activations " +
        "come in two strengths that must not be blurred: `direct` means the " +
        "transit hits the node degree, which is the strongest claim " +
        "available; everything else hits the axis's MACHINERY — its rulers, " +
        "the bodies embedded in the nodal ground, the nodal houses — and can " +
        "activate the trajectory with the planet nowhere near a node. Say " +
        "which kind you are reasoning from. The three geometries reverse the " +
        "meaning of a hit: conjunction lands on the North Node (pull " +
        "forward), opposition lands on the South (past returns — the old " +
        "competence becomes consequential, which is NOT regression and NOT a " +
        "fault), square sits across both (crossroads). Planets are functions, " +
        "not weights: Pluto is not a stronger Saturn, it is transformation " +
        "where Saturn is commitment — never rank them. Nothing here is fate; " +
        "a window says the trajectory is being worked on, never what will " +
        "happen. Two kinds of date appear below and they are not " +
        "equally precise: a window's `dates` and every `age` come from the " +
        "beat grid, which uses the MEAN node and is month-precision at best, " +
        "so give those as months or ages and never as days. An activation's " +
        "`contact`, `exact` and `retrogradePasses` come straight off the " +
        "ephemeris and are exact to the day — quote them as they stand. " +
        "Aspects are computed against the Sun, Moon, Mercury, Venus, Mars, the " +
        "North Node, the Ascendant and the Midheaven; the Descendant and Imum " +
        "Coeli are the far ends of those same two axes and are not listed " +
        "twice. The two angles lean on the birth TIME far harder than anything " +
        "else here \u2014 the Midheaven moves about a degree every four " +
        "minutes \u2014 so if this chart's time was rounded or remembered, its " +
        "angle dates are wrong by months while still looking exact. Data " +
        "exists only inside `feedCovers`.",
      chart: chart.name,
      asOf: new Date().toISOString().slice(0, 10),
      age: Math.round(model.age),
      feedCovers: `${model.feed.start.slice(0, 4)}–${model.feed.end.slice(0, 4)}`,
      axis: {
        from: `South Node ${t.from.sign} ${t.from.degree}, house ${t.from.house}${
          t.from.house ? ` (${getHouseTitle(t.from.house as House)})` : ""
        }`,
        to: `North Node ${t.to.sign} ${t.to.degree}, house ${t.to.house}${
          t.to.house ? ` (${getHouseTitle(t.to.house as House)})` : ""
        }`,
        arc: `${t.arc.from} → ${t.arc.into}`,
        rulers: `North Node ruled by ${t.to.ruler}, South Node by ${t.from.ruler}`,
      },
      // Absent for charts cached before the nodes became a natal target. When
      // false, every window below is structural by omission rather than
      // because nothing hits the axis — a completely different statement.
      nodeAspectsAvailable: model.hasNodeAspects,
      windows: model.windows
        .filter((w) => w.grade !== "background")
        .map((w) => {
          // The composed reading travels with the window. Oddessi has already
          // decided what the period means; the model's job is to write it for
          // this person, never to work it out again — which is the whole
          // difference between a product with a position and a fresh
          // horoscope on every visit.
          const r = interpretActivationWindow(w, t);
          return {
            age: `${Math.round(w.ageStart)}–${Math.round(w.ageEnd)}`,
            dates: `${w.start.slice(0, 7)} → ${w.end.slice(0, 7)}`,
            grade: gradeLabel(w.grade),
            status: w.status,
            independentPressures: w.pressures,
            orientation: orientationLabel(w.orientation),
            reading: {
              title: r.title,
              thesis: r.thesis,
              activated: r.activated,
              mechanism: r.mechanism,
              theMove: r.growthMove,
              opening: r.opening,
              trap: r.trap,
              arenas: r.arenas,
              mayBecomeConcreteThrough: r.eventPossibilities,
              convergence: r.convergence ?? null,
            },
            why: w.why,
            activations: w.activations.map((a) => ({
              planet: a.planet,
              strength: a.direct ? "direct — on the node degree" : "structural",
              hits: kindLabel(a.kind),
              target: a.target,
              // The contact's own dates, which are precise where the window's
              // are not. The window is a season built by grouping overlapping
              // transits, so its edges are a property of the grouping; these
              // came off the ephemeris.
              contact: `${a.start} → ${a.end}`,
              exact: a.peak ?? null,
              retrogradePasses:
                a.segments.length > 1
                  ? a.segments
                      .slice(1)
                      .map((seg) => `${seg.start} → ${seg.end}`)
                  : null,
              transitingThrough: a.through
                ? `House ${a.through.house} — ${a.through.title}`
                : null,
              reading: a.headline,
              manner: a.modeGloss,
            })),
            nodalBeats: w.beats.map(
              (b) => `${beatLabel(b.kind)} at age ${Math.round(b.age)}`,
            ),
          };
        }),
      // The full beat grid, so the model can answer "when is my next nodal
      // return" without it having to appear in a window first.
      nodalBeats: model.beats.map((b) => ({
        beat: beatLabel(b.kind),
        age: Math.round(b.age),
        season: `${b.windowStart.slice(0, 7)} → ${b.windowEnd.slice(0, 7)}`,
        status: b.status,
      })),
    });

    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart.id, t, model, status]);
}
