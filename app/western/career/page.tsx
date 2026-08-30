"use client";

import { useMemo } from "react";
import { PageTitle } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import { useScoring } from "@/components/scoring-context";
import CareerCurve from "@/components/western/career/career-curve";
import CareerMethod from "@/components/western/career/career-method";
import CareerSnapshot from "@/components/western/career/career-snapshot";
import { useCareerContext } from "@/components/western/career/career-context";
import { T } from "@/components/western/growth/growth-ui";
import { careerActivation, careerSignature, careerSnapshot } from "@/lib/career";
import type { Band } from "@/lib/band";
import type { Chart } from "@/lib/charts";
import type { Rulership } from "@/lib/rulership";
import { useJson } from "@/lib/use-json";
import CareerSignatureAxes from "@/components/western/career/career-signature-axes";

/**
 * Western · Career — when the vocational architecture is being activated.
 *
 * The page makes one argument, in order:
 *
 *   THE CURVE         how densely those addresses are contacted across a life
 *   THE WINDOWS       what configuration exists, which is a different question
 *                     with a different answer and no size to it
 *   THE TRANSITS      every contact in a chosen window, ordered by how directly
 *                     it addresses the vocational structure
 *
 * What the page will not do is join those into a forecast. The index is a
 * density of contact; the windows are shapes; neither is an outcome, and the
 * scoring modal exists so the terms of that claim can be inspected rather than
 * taken on trust.
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
 * a bar whose `left` is a percentage of a lifetime.
 */
function today(): Date {
  const date = new Date();
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function Career({ chart, rulership }: { chart: Chart; rulership: Rulership }) {
  const state = useJson<AllResponse>(
    `/api/cycles?${FEED}&chartId=${encodeURIComponent(chart.id)}`,
  );
  // Depending on the bands rather than on `state` itself. While loading, the
  // hook returns a fresh `{ status: "loading" }` literal on every render, and
  // depending on the object rebuilt all 361 samples of the curve each time.
  const bands = state.status === "ready" ? state.data.bands : null;

  const model = useMemo(
    () => careerActivation(chart, bands ?? [], rulership, today()),
    // The architecture needs only the chart, so the heading draws before the
    // feed lands.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chart.id, chart, bands, rulership],
  );

  // The natal side needs no feed — it is the standing chart — so it is
  // computed and drawn whatever the cycle cache is doing.
  const snapshot = useMemo(
    () => careerSnapshot(chart, rulership),
    [chart, rulership],
  );
  const signature = useMemo(
    () => careerSignature(snapshot),
    [snapshot],
  );

  useCareerContext(chart, model, snapshot, state.status);

  const { architecture, coverage } = model;

  if (!architecture.mc || !architecture.tenthSign) {
    return (
      <div className="mx-auto w-full max-w-4xl px-8">
        <PageTitle eyebrow={chart.name} title="Career" lede="" />
        <p className={`${T.note} mt-12`}>
          Career is read from the Midheaven and the tenth house, so this page
          needs a birth time. Without one the chart has no angles and there is
          nothing to measure against.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-32">
      <PageTitle
        eyebrow={chart.name}
        title="Career"
        lede=""
        aside={<CareerMethod feed={model.feed} coverage={coverage} />}
      />
      {state.status === "loading" ? (
        <p className={`${T.micro} mt-16 text-bone-faint`}>Reading cycles…</p>
      ) : state.status === "error" ? (
        <p className={`${T.micro} mt-16 text-ember`}>{state.error}</p>
      ) : (
        <>
          <CareerCurve model={model} birth={chart.birth.date} />

          {/* A layer the feed cannot reach scores zero forever and draws
              exactly like a layer that is simply quiet. Saying which is which
              is the difference between a partial reading and a wrong one. */}
          {coverage.darkPoints.length ? (
            <p className={`${T.note} mt-10 max-w-2xl border-l-2 border-ember pl-5`}>
              {coverage.darkPoints.join(", ")}{" "}
              {coverage.darkPoints.length > 1 ? "are" : "is"} part of this
              chart&rsquo;s vocational architecture but absent from its cached
              cycles, which compute contacts against the personal planets, the
              nodes and the two angles only — so nothing reaching{" "}
              {coverage.darkPoints.length > 1 ? "them" : "it"} appears in the
              curve above. That stretch of the reading is partial rather than
              quiet. See <span className="text-bone-soft">Index scoring →
                This chart</span>, or re-run the cycle cache with{" "}
              {coverage.darkPoints.length > 1 ? "them" : "it"} as natal targets.
            </p>
          ) : null}
        </>
      )}

      {/* WHEN is above; WHAT is here. */}
      <section className="mt-24">
        <CareerSignatureAxes signature={signature} />

        <div className="mt-16">
          <CareerSnapshot snapshot={snapshot} />
        </div>
      </section>
    </div>

  );
}

export default function CareerPage() {
  const { chart } = useChart();
  const { config } = useScoring();

  if (!chart) {
    return (
      <div className="mx-auto w-full max-w-4xl px-8">
        <PageTitle
          eyebrow="No chart"
          title="Career"
          lede="No chart selected. Add birth data to begin the study."
        />
      </div>
    );
  }

  return <Career chart={chart} rulership={config.rulership} />;
}
