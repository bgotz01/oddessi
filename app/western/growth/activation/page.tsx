//app/western/growth/activation/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageTitle } from "@/components/primitives";
import ActivationCurve from "@/components/activation-curve";
import ActivationReading from "@/components/activation-reading";
import ActivationMethod from "@/components/activation-method";
import ActivationDrawer from "@/components/activation-drawer";
import ActivationDevelopment from "@/components/activation-development";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useScoring } from "@/components/scoring-context";
import { useJson } from "@/lib/use-json";
import type { Band } from "@/lib/band";
import type { Chart } from "@/lib/charts";
import {
  growthActivation,
  growthTiming,
  readActivationNow,
  trajectory,
  type ActivationWindow,
  type Trajectory,
} from "@/lib/growth";
import { T } from "@/components/growth-ui";
import { useActivationContext } from "@/components/activation-context";
import { useActivationShares } from "@/components/activation-shares";

/**
 * Growth · Activation — when the trajectory becomes unusually loud.
 *
 * Its own page rather than a fifth section on Growth, because it answers a
 * different kind of question and was making the parent page incoherent. Growth
 * is a reading of a natal axis: static, true for a life, no dates anywhere in
 * it by design. This is a reading of the future against that axis. Both are
 * worth having; interleaving them meant a reader who wanted "who am I becoming"
 * got a transit calendar halfway down, and a reader who wanted "when" had to
 * scroll past four sections of archetype to reach it.
 *
 * The argument the page makes, in order:
 *
 *   THE CHART     one object: the index as a line, the graded seasons hung
 *                 beneath it on the same axis — how much, and what kind
 *   THE PANEL     five values for whichever season is in focus: pressure,
 *                 movement, season, window, peak. It defaults to the one
 *                 running now and follows a click on any bar, which is what
 *                 makes the chart interrogable rather than decorative
 *   THE EVIDENCE  which planets are responsible, and on what — read off the
 *                 chart at whatever moment is being pointed at, with the
 *                 contact itself one click further down. There were five
 *                 planetary lanes across the life here for a while and they
 *                 were a display of the ephemeris: everything a reader could
 *                 take from them is said better by the contributors, the
 *                 tooltip and the drawer, each at the moment it is asked for.
 *   THE DRAWER    one period, read — what it is asking of the trajectory
 *
 * The graded spans are drawn ONCE. They were washed behind the curve, banded
 * under its axis and stripped above it at various points, and three statements
 * of one fact on one page is how a reader ends up hunting for the difference
 * between them.
 *
 * Interpretation is deliberately thin on the page itself and lives in the
 * tooltip and the drawer. A paragraph of reading above a chart is read once
 * and scrolled past forever; the same sentence under a pointer is read every
 * time it is wanted.
 *
 * Two claims the page is careful about. The nodal beat row is the SAME for
 * every human being — 18.6 years is a property of the Moon's orbit, not of a
 * person — so it is drawn as context rather than as a finding. And a window's
 * grade counts independent pressures and asks whether one lands on the axis
 * itself; it never scores, weights or ranks planets, because a direction has no
 * size and neither does a season.
 */

/** How much cache to ask for. A life, not the explorer's opening decade. */
const FEED = "view=all&lookback=90&lookahead=90";

interface AllResponse {
  bands: Band[];
  windowStart: string;
  windowEnd: string;
}

/**
 * Now, quantised to the UTC day.
 *
 * A bare `new Date()` in render is read once on the server and again on the
 * client, and the two disagree by milliseconds — invisible in prose, fatal on
 * a bar whose `left` is a percentage of a lifetime. Nothing here resolves finer
 * than a month, so a value that ticks is precision the model does not have.
 */
function today(): Date {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function Activation({ chart, t }: { chart: Chart; t: Trajectory }) {
  const { send, setOpen } = useChat();
  const pathname = usePathname();
  /**
   * Two selections, because they answer to different clicks.
   *
   * FOCUS is which season the panel under the chart is reading. Clicking a bar
   * moves it and nothing else happens — the reader is comparing periods, not
   * committing to one, and a modal panel that took over the screen every time
   * they pointed at their forties made that impossible.
   *
   * PICKED is the drawer: the long reading, opened deliberately.
   */
  const [focus, setFocus] = useState<ActivationWindow | null>(null);
  const [picked, setPicked] = useState<ActivationWindow | null>(null);
  const [panel, setPanel] = useState(true);

  /** Selecting a season always shows the reading of it. */
  const select = (w: ActivationWindow) => {
    setFocus(w);
    setPanel(true);
  };

  const state = useJson<AllResponse>(
    `/api/cycles?${FEED}&chartId=${encodeURIComponent(chart.id)}`,
  );
  const bands = state.status === "ready" ? state.data.bands : null;

  const { shares } = useActivationShares();

  const model = useMemo(
    () =>
      growthActivation(
        growthTiming(chart.birth.date, t, bands ?? [], today()),
        shares,
      ),
    // The beats need only a birth date, so the chart draws before the feed
    // lands. `shares` is in the list because the tuner has to repaint the
    // curve as it moves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chart.id, chart.birth.date, t, bands, shares],
  );

  useActivationContext(chart, t, model, state.status);

  const ask = (text: string) => {
    setOpen(true);
    send(text, pathname);
  };

  /**
   * The reading above the chart.
   *
   * Composed in `lib/growth` and handed to the component whole. Derived here
   * rather than inside `ActivationReading` so that the component stays
   * presentational — it chooses no words, and a reading that looks wrong is
   * wrong in the model.
   */
  const read = focus ?? model.now;
  const reading = useMemo(
    () =>
      readActivationNow({
        window: read,
        isNow: !focus || focus.id === model.now?.id,
        points: model.curve.points,
        beats: model.beats,
        age: model.age,
        ahead: model.ahead,
        trajectory: t,
        yearOfAge: (a) =>
          new Date(
            Date.parse(`${chart.birth.date.slice(0, 10)}T12:00:00Z`) +
            a * 365.2425 * 24 * 60 * 60 * 1000,
          ).getUTCFullYear(),
      }),
    [model, read, focus, chart.birth.date, t],
  );

  // The arc the axis describes, in the chart's own nouns. The signs and
  // houses are rendered by the heading itself, which needs their parts.
  const axis = { arc: `${t.arc.from} → ${t.arc.into}` };

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-32">
      <PageTitle
        eyebrow={chart.name}
        title="Activation"
        lede=""
      />


      {state.status === "loading" ? (
        <p className={`${T.micro} mt-16 text-bone-faint`}>Reading cycles…</p>
      ) : state.status === "error" ? (
        <p className={`${T.micro} mt-16 text-ember`}>{state.error}</p>
      ) : (
        <>
          {/* One chart: the index as a line, the seasons hung underneath on
              the same axis. The prose that used to introduce it is gone on
              purpose — the interpretation is above it now, and the detail is
              in the tooltip and the drawer where it is asked for. */}
          {/* The axis, stated as the heading it always was.
              It sat in the corner at legend size, which is where a chart puts
              its furniture — and this is not furniture. Everything below is a
              measurement OF this movement, and a reader who never registers
              which two points the whole page is about has been given a graph
              of nothing in particular. */}
          <div className="mt-16 flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
            <div>
              <p className={`${T.tiny} text-bone-faint`}>North Node Axis</p>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="inscription text-[1.5rem] leading-tight text-bone">
                  {t.from.sign} H{t.from.house}
                </span>
                <span className="text-[1.25rem] text-bone-faint">→</span>
                <span className="inscription text-[1.5rem] leading-tight text-bone">
                  {t.to.sign} H{t.to.house}
                </span>
              </p>
              <p className={`${T.tiny} mt-2.5 text-bone-faint`}>

                <span className="text-bone-faint/60"> {axis.arc}</span>
              </p>
            </div>

            <ActivationMethod feed={model.feed} />
          </div>

          {/* The chart and its reading, side by side. The panel was a row
              under the chart and the pair could never be looked at together —
              a click on a bar changed something below the fold, and the reader
              scrolled back up to see which bar they had clicked. */}
          <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            <div className="min-w-0 flex-1">
              <ActivationCurve
                curve={model.curve}
                windows={model.windows}
                beats={model.beats}
                age={model.age}
                lifespan={model.lifespan}
                dataUntilAge={model.dataUntilAge}
                feedEndYear={model.feed.end.slice(0, 4)}
                birth={chart.birth.date}
                selected={focus}
                onSelect={select}
              />
            </div>

            {/* Reads whatever bar was last clicked, and defaults to the season
              in force. */}
            <ActivationReading
              reading={reading}
              year={today().getUTCFullYear()}
              onOpen={setPicked}
              onNow={() => setFocus(null)}
              open={panel}
              onToggle={setPanel}
            />
          </div>

          {/* The answer, in the open, directly under the chart it belongs to.
              It used to be three clicks down — bar, sidebar, disclosure — and
              the depth was the problem rather than the wording at the bottom
              of it. */}
          <ActivationDevelopment reading={reading} onOpen={setPicked} />

          {!model.hasNodeAspects ? (
            <p className={`${T.note} mt-10 max-w-2xl border-l-2 border-ember pl-5`}>
              This chart&rsquo;s cycles were cached before aspects to the nodes
              were computed, so nothing here can land on the axis itself and
              every window is structural. Re-run the cycle cache for this chart.
            </p>
          ) : null}

        </>
      )}

      {picked ? (
        <ActivationDrawer
          window={picked}
          trajectory={t}
          chartName={chart.name}
          onClose={() => setPicked(null)}
          onAsk={(text) => {
            setPicked(null);
            ask(text);
          }}
        />
      ) : null}
    </div>
  );
}

export default function ActivationPage() {
  const { chart } = useChart();
  const { config } = useScoring();
  const t = useMemo(
    () => (chart ? trajectory(chart, config.rulership) : null),
    [chart, config.rulership],
  );

  if (!chart || !t) {
    return (
      <div className="mx-auto w-full max-w-4xl px-8">
        <PageTitle
          eyebrow={chart ? chart.name : "No chart"}
          title="Activation"
          lede={
            chart
              ? "This chart was stored without the lunar nodes. Activation is read against the nodal axis, so there is nothing to time until they are calculated."
              : "No chart selected. Add birth data to begin the study."
          }
        />
      </div>
    );
  }

  return <Activation chart={chart} t={t} />;
}
