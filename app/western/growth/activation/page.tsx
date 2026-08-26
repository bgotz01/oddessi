//app/western/growth/activation/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageTitle } from "@/components/primitives";
import ActivationCurve from "@/components/activation-curve";
import ActivationMap from "@/components/activation-map";
import ActivationWindows from "@/components/activation-windows";
import ActivationDrawer from "@/components/activation-drawer";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useScoring } from "@/components/scoring-context";
import { useJson } from "@/lib/use-json";
import type { Band } from "@/lib/band";
import type { Chart } from "@/lib/charts";
import {
  classificationOf,
  growthActivation,
  windowLabel,
  growthTiming,
  trajectory,
  type ActivationWindow,
  type Trajectory,
} from "@/lib/growth";
import { T } from "@/components/growth-ui";
import { useActivationContext } from "@/components/activation-context";

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
 *   THE CURVE     how strongly the trajectory is implicated, across a life
 *   THE TIMELINE  the same life in words — where the reader stands on it now,
 *                 what each loud stretch is, and the transits underneath as
 *                 evidence that can be opened rather than an interface to
 *                 decode
 *   THE WINDOWS   the stretches that rise above quiet, graded
 *   THE DRAWER    one period, read — what it is asking of the trajectory
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
  const [picked, setPicked] = useState<ActivationWindow | null>(null);

  const state = useJson<AllResponse>(
    `/api/cycles?${FEED}&chartId=${encodeURIComponent(chart.id)}`,
  );
  const bands = state.status === "ready" ? state.data.bands : null;

  const model = useMemo(
    () =>
      growthActivation(growthTiming(chart.birth.date, t, bands ?? [], today())),
    // The beats need only a birth date, so the map draws before the feed lands.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chart.id, chart.birth.date, t, bands],
  );

  useActivationContext(chart, t, model, state.status);

  const ask = (text: string) => {
    setOpen(true);
    send(text, pathname);
  };

  // Background stretches are drawn on the map but not listed. There are dozens
  // of them — one slow planet grinding through a nodal house for a decade — and
  // listing them would rebuild the transit calendar this page exists instead of.
  const listed = model.windows.filter((w) => w.grade !== "background");
  const hidden = model.windows.length - listed.length;
  const next = model.ahead[0] ?? null;

  // The axis, restated on the map so nothing on it floats free of what is
  // being activated.
  const axis = {
    line: `${t.from.sign} H${t.from.house} → ${t.to.sign} H${t.to.house}`,
    arc: `${t.arc.from} → ${t.arc.into}`,
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-32">
      <PageTitle
        eyebrow={chart.name}
        title="Activation"
        lede=""
      />


      {/* The headline answer, so the page opens on a finding rather than a
          diagram. Falls back to the peak when nothing notable is ahead. */}
      {next ? (
        <p className={`${T.read} mt-8 max-w-2xl border-l-2 border-ember pl-5`}>
          Next worth reading:{" "}
          <span className="text-bone">{windowLabel(next).label}</span> at age{" "}
          {Math.round(next.ageStart)}
          {Math.round(next.ageEnd) > Math.round(next.ageStart)
            ? `–${Math.round(next.ageEnd)}`
            : ""}{" "}
          ({next.start.slice(0, 4)}–{next.end.slice(0, 4)}), in{" "}
          {Math.max(0, Math.round(next.ageStart - model.age))} years —{" "}
          intensity {next.activation} / 100,{" "}
          {classificationOf(next.grade).toLowerCase()}.
        </p>
      ) : null}

      {state.status === "loading" ? (
        <p className={`${T.micro} mt-16 text-bone-faint`}>Reading cycles…</p>
      ) : state.status === "error" ? (
        <p className={`${T.micro} mt-16 text-ember`}>{state.error}</p>
      ) : (
        <>
          {/* The curve is the answer; the map below is the evidence for it.
              Order matters here — a reader who sees the lanes first spends
              their attention working out which stretch is loud, which is the
              one thing the line already says. */}
          <ActivationCurve
            curve={model.curve}
            windows={model.windows}
            age={model.age}
            lifespan={model.lifespan}
            dataUntilAge={model.dataUntilAge}
            feedEndYear={model.feed.end.slice(0, 4)}
            birth={chart.birth.date}
            selected={picked}
            onSelect={setPicked}
          />

          {/* The same life, read as a story rather than as a measurement.
              The curve above answers HOW MUCH, quarter by quarter; this
              answers WHAT KIND and WHEN, in words, and keeps the transits
              underneath it as evidence a reader can open rather than as the
              interface they have to decode first. */}
          <div className="mt-24">
            <p className={`${T.tiny} text-bone-faint`}>Your growth timeline</p>
            <p className="inscription mt-4 text-[1.5rem] leading-tight text-bone">
              When life pushes hardest
            </p>
            <p className={`${T.body} mt-4 max-w-2xl`}>
              The stretches when circumstances press most strongly on your
              longer-term direction — where you are on that timeline now, and
              what each period is asking. The astrology behind it is kept
              underneath, as evidence.
            </p>
          </div>

          <ActivationMap
            axis={axis}
            planets={model.planets}
            activations={model.activations}
            beats={model.beats}
            windows={model.windows}
            age={model.age}
            lifespan={model.lifespan}
            selected={picked}
            onSelect={setPicked}
          />

          {!model.hasNodeAspects ? (
            <p className={`${T.note} mt-10 max-w-2xl border-l-2 border-ember pl-5`}>
              This chart&rsquo;s cycles were cached before aspects to the nodes
              were computed, so nothing here can land on the axis itself and
              every window is structural. Re-run the cycle cache for this chart.
            </p>
          ) : null}

          <div className="mt-24">
            <p className={`${T.tiny} text-bone-faint`}>The windows</p>
            <p className="inscription mt-4 text-[1.5rem] leading-tight text-bone">
              When the axis gets loud
            </p>
            <ActivationWindows
              windows={listed}
              hidden={hidden}
              onOpen={setPicked}
              selected={picked}
            />
          </div>

          <p className={`${T.note} mt-16 max-w-2xl border-l-2 border-rule pl-5`}>
            Beats use the mean node, about a month off the true one — read them
            as seasons, never as dates. Transits come from the cached ephemeris,
            which covers {model.feed.start.slice(0, 4)}–
            {model.feed.end.slice(0, 4)}; there is nothing outside those years
            whatever the sky is doing, so a quiet stretch at the edges is the
            data ending rather than the life. Nothing here is scored: a window
            is graded by how many independent pressures converge and whether
            one of them lands on the axis itself, which is a fact about the
            chart, not a measure of how big the years will feel.
          </p>
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
