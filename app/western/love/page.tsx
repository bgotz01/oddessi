//wester/love/page.tsx
"use client";

import { useMemo, useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import { useScoring } from "@/components/scoring-context";
import { T } from "@/components/western/growth/growth-ui";
import LoveMethod from "@/components/western/love/love-method";
import LovePhase from "@/components/western/love/love-phase";
import LoveProfile from "@/components/western/love/love-profile";
import LoveTimeline from "@/components/western/love/love-timeline";
import LoveWindowPanel from "@/components/western/love/love-window-panel";
import { useLoveContext } from "@/components/western/love/love-context";
import {
  loveArchitecture,
  loveProfile,
  loveTimeline,
  type LoveWindow,
  type ProgressionsResult,
} from "@/lib/love";
import type { Band } from "@/lib/band";
import type { Chart } from "@/lib/charts";
import type { Rulership } from "@/lib/rulership";
import { useJson } from "@/lib/use-json";

/**
 * Western · Love — the relationship pattern, and its changing seasons.
 *
 * WHY THIS PAGE IS SHAPED DIFFERENTLY FROM CAREER
 * Career is about activation and carries one argument: a curve, its windows,
 * the transits inside them. Love is about NATURE and TIMING, which are two
 * arguments, and the page says so in its two headings rather than braiding
 * them:
 *
 *   PROFILE    what the relationship pattern is. The birth chart alone,
 *              relatively permanent, no date in it.
 *   TIMELINE   when parts of it are under emphasis. Transits and progressions,
 *              as spans.
 *
 * Neither predicts the other, which is worth being structural about rather
 * than merely saying: they are separate sections, they are computed from
 * different inputs, and the timeline never quotes the profile. A page that
 * blended them would imply a chart disposed toward partnership gets more
 * partnership windows, and it does not.
 *
 * WHY THE TIMELINE COMES FIRST
 * The reverse of the reading order the headings imply, and deliberate. A
 * person arriving here has a question about now. The profile is the better
 * reading and the worse opening — it is permanent, so it will still be true
 * after the timeline has been looked at, and putting it first means scrolling
 * past five sections of disposition to reach the only part that moves.
 */

/** A life, not the explorer's opening decade. */
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
 * a bar whose `left` is a percentage of a span.
 */
function today(): Date {
  const date = new Date();
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}

/**
 * The two views, and why there are only two.
 *
 * AHEAD is the question people arrive with, and its span is chosen so a
 * Saturn transit fits inside it twice over — short enough that a year is a
 * readable unit, long enough that "later" exists. LIFE is the shape, which is
 * what makes AHEAD legible: a stretch with three windows means nothing until
 * it can be seen against a life that averages one every year and a half.
 */
const VIEWS = [
  { id: "ahead", label: "Ahead", back: 2, forward: 12 },
  { id: "life", label: "Life", back: 0, forward: 0 },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

function Love({ chart, rulership }: { chart: Chart; rulership: Rulership }) {
  const cycles = useJson<AllResponse>(
    `/api/cycles?${FEED}&chartId=${encodeURIComponent(chart.id)}`,
  );
  const progressed = useJson<ProgressionsResult>(
    `/api/progressions?chartId=${encodeURIComponent(chart.id)}`,
  );

  const [view, setView] = useState<ViewId>("ahead");
  const [selected, setSelected] = useState<LoveWindow | null>(null);

  // Depending on the payloads rather than on the `Async` wrappers: while
  // loading the hook returns a fresh literal every render, and depending on
  // those rebuilt the whole timeline each time.
  const bands = cycles.status === "ready" ? cycles.data.bands : null;
  const events = progressed.status === "ready" ? progressed.data.events : null;

  const architecture = useMemo(
    () => loveArchitecture(chart, rulership),
    [chart, rulership],
  );

  // The natal half needs no feed — it is the standing chart — so it is
  // computed and drawn whatever the two caches are doing.
  const profile = useMemo(
    () => loveProfile(chart, rulership),
    [chart, rulership],
  );

  const timeline = useMemo(
    () =>
      loveTimeline(
        architecture,
        bands ?? [],
        events ?? [],
        chart.birth.date,
        today(),
      ),
    [architecture, bands, events, chart.birth.date],
  );

  const ready = bands !== null && events !== null;
  useLoveContext(chart, timeline, profile, ready);

  const failed = cycles.status === "error" || progressed.status === "error";

  const [fromYear, toYear] = useMemo(() => {
    const nowYear = new Date().getUTCFullYear();
    const chosen = VIEWS.find((entry) => entry.id === view)!;
    if (chosen.id === "ahead") {
      return [nowYear - chosen.back, nowYear + chosen.forward];
    }
    const birthYear = Number(chart.birth.date.slice(0, 4));
    return [birthYear + 16, birthYear + 90];
  }, [view, chart.birth.date]);

  const nowYear = useMemo(() => {
    const now = today();
    const start = Date.UTC(now.getUTCFullYear(), 0, 1);
    const end = Date.UTC(now.getUTCFullYear() + 1, 0, 1);
    return now.getUTCFullYear() + (now.getTime() - start) / (end - start);
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-32">
      <PageTitle
        eyebrow={chart.name}
        title="Love"
        lede="Your relationship nature, and its changing seasons."
        aside={ready ? <LoveMethod coverage={timeline.coverage} /> : null}
      />

      <section className="mt-4">
        <SectionHeading
          aside={
            <span className="inline-flex gap-4">
              {VIEWS.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setView(entry.id)}
                  className={`transition-colors ${view === entry.id
                      ? "text-bone"
                      : "text-bone-faint hover:text-bone-soft"
                    }`}
                >
                  {entry.label}
                </button>
              ))}
            </span>
          }
        >
          Timeline
        </SectionHeading>

        {failed ? (
          <p className={`${T.micro} mt-12 text-ember`}>
            {cycles.status === "error" ? cycles.error : null}
            {progressed.status === "error" ? ` ${progressed.error}` : null}
          </p>
        ) : !ready ? (
          <p className={`${T.micro} mt-12 text-bone-faint`}>
            Reading cycles and progressions…
          </p>
        ) : (
          <>
            <LovePhase timeline={timeline} />

            <LoveTimeline
              windows={timeline.windows}
              fromYear={fromYear}
              toYear={toYear}
              nowYear={nowYear}
              selected={selected}
              onSelect={(window) =>
                setSelected((current) =>
                  current?.id === window.id ? null : window,
                )
              }
            />

            {selected ? (
              <LoveWindowPanel
                window={selected}
                onClose={() => setSelected(null)}
              />
            ) : (
              <p className={`${T.note} mt-10`}>
                Select a window for what the period is, and which contacts
                identified it.
              </p>
            )}

            {timeline.coverage.darkAddresses.length ? (
              <p className={`${T.note} mt-10 max-w-2xl border-l-2 border-ember pl-5`}>
                This chart&rsquo;s relationship architecture includes{" "}
                {timeline.coverage.darkAddresses.join(" and ")}, which the
                cached cycles never reach — they compute contacts against the
                personal planets, the nodes and the two angles only, so nothing
                touching{" "}
                {timeline.coverage.darkAddresses.length > 1 ? "those" : "that"}{" "}
                appears above. That part of the reading is partial rather than
                quiet. See <span className="text-bone-soft">How this is read →
                  This chart</span>.
              </p>
            ) : null}
          </>
        )}
      </section>

      {/* WHEN is above; WHAT is here. The profile carries its own heading and
          spacing, so moving it above the timeline is moving this one line. */}
      <LoveProfile profile={profile} />
    </div>
  );
}

export default function LovePage() {
  const { chart } = useChart();
  const { config } = useScoring();

  if (!chart) {
    return (
      <div className="mx-auto w-full max-w-4xl px-8">
        <PageTitle
          eyebrow="No chart"
          title="Love"
          lede="No chart selected. Add birth data to begin the study."
        />
      </div>
    );
  }

  return <Love chart={chart} rulership={config.rulership} />;
}
