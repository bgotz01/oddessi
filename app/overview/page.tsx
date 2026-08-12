"use client";

import { useEffect, useMemo, useState } from "react";
import Timeline from "@/components/timeline";
import { PageTitle, SectionHeading } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useJson } from "@/lib/use-json";
import { useNumerologyReading } from "@/lib/numerology/use-reading";
import { hasRetrograde, statusOfBand, type Band } from "@/lib/band";
import {
  easternBands,
  horizonOf,
  numerologyBands,
  westernBands,
  windowFor,
  type ActiveCyclesResponse,
} from "@/lib/overview";
import type { Reading } from "@/lib/chinese/pillars";

/**
 * Every system's current season on one axis.
 *
 * The thing no single tradition gives you: a house transit, a luck pillar and a
 * personal year are not competing accounts of the same window — they are three
 * unrelated ways of dividing it, and the only place they can be compared is
 * against a shared calendar. So the page draws the calendar and lets each
 * system speak in its own vocabulary on it. Nothing is translated, and no row
 * is cross-referenced against a row from another group.
 *
 * Every band comes from a real reading. The page this replaced drew six
 * hand-written cycles that happened to make a pleasing shape, which meant the
 * one numerological band on it disagreed with the numerology section by three.
 */

function Legend({ retro }: { retro: boolean }) {
  const items = [
    { mark: <span className="h-2.5 w-8 bg-patina" />, label: "In effect" },
    { mark: <span className="h-2.5 w-8 bg-patina-deep" />, label: "Closed" },
    { mark: <span className="h-px w-8 bg-patina-dim" />, label: "Full span" },
    { mark: <span className="h-4 w-px bg-ember" />, label: "Exact" },
    ...(retro
      ? [
          {
            mark: <span className="datum text-[0.6875rem] text-ember">℞</span>,
            label: "Stations retrograde",
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          {item.mark}
          <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
            {item.label}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Which band turns over next, and when. The one thing the axis cannot show. */
function NextTurn({ bands, now }: { bands: Band[]; now: Date }) {
  const ahead = bands
    .filter((b) => Date.parse(b.end) > now.getTime())
    .sort((a, b) => Date.parse(a.end) - Date.parse(b.end));

  if (ahead.length === 0) return null;

  const next = ahead[0];
  const days = Math.round((Date.parse(next.end) - now.getTime()) / 86_400_000);

  return (
    <p className="datum mt-8 max-w-3xl text-[0.6875rem] leading-relaxed text-bone-faint">
      Next to turn over: {next.title.toLowerCase()} — {next.subtitle.toLowerCase()}{" "}
      — closes{" "}
      <span className="text-bone-soft">
        {new Date(`${next.end}T00:00:00Z`).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        })}
      </span>
      , in {days.toLocaleString()} days.
    </p>
  );
}

export default function OverviewPage() {
  const { chart } = useChart();
  const { setPageContext } = useChat();
  const [now] = useState(() => new Date());

  const cycles = useJson<ActiveCyclesResponse>(
    chart ? `/api/cycles?chartId=${encodeURIComponent(chart.id)}` : null,
  );
  const chinese = useJson<Reading>(
    chart ? `/api/chinese?chartId=${encodeURIComponent(chart.id)}` : null,
  );
  const numerology = useNumerologyReading(chart);

  // Narrowed to the settled payloads before they reach `useMemo`. Depending on
  // the Async wrappers instead would rebuild the bands on every render — a new
  // array each time, which the effect below reads as new data and reports
  // again, which re-renders, which rebuilds.
  const cyclesData = cycles.status === "ready" ? cycles.data : null;
  const chineseData = chinese.status === "ready" ? chinese.data : null;

  const bands = useMemo(() => {
    const western = westernBands(cyclesData);
    const eastern = easternBands(chineseData?.luck ?? null, now);

    // The horizon is set by the systems whose cycles close, so the open-ended
    // fourth pinnacle can be drawn out to it instead of setting it.
    const horizon = horizonOf([...western, ...eastern], now);
    return [...western, ...eastern, ...numerologyBands(numerology, horizon)];
  }, [cyclesData, chineseData, numerology, now]);

  /**
   * A value that changes only when the rows do.
   *
   * The page context is pushed on this rather than on the array itself: the
   * effect's cleanup clears the context, so a dependency that is merely
   * *equal* rather than identical would clear and re-report forever.
   */
  const signature = bands.map((b) => `${b.id}${b.start}${b.end}`).join("|");

  const scale = useMemo(() => windowFor(bands, now), [bands, now]);

  useEffect(() => {
    if (bands.length === 0) return;

    setPageContext({
      _description:
        "Overview — the cycle in force in each system, on one time axis",
      asOf: now.toISOString().slice(0, 10),
      bands: bands.map((b) => ({
        system: b.group,
        cycle: `${b.title} — ${b.subtitle}`,
        opens: b.start,
        closes: b.end,
        status: statusOfBand(b, now),
      })),
      note: "These are three unrelated ways of dividing the same stretch of time. Do not translate one system's band into another's vocabulary.",
    });

    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  const loading =
    chart !== null &&
    (cycles.status === "loading" || chinese.status === "loading");

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow={chart ? chart.name : "No chart"}
        title="Overview"
        lede="Every system on one axis. A house transit, a ten-year pillar and a
              personal year are not separate calendars — they are separate
              vocabularies describing the same stretch of time, and this is the
              only page where they can be seen against each other."
      />

      {!chart ? (
        <p className="text-bone-soft">No chart selected.</p>
      ) : loading ? (
        <p className="datum text-[0.75rem] text-bone-faint">
          Gathering every system…
        </p>
      ) : bands.length === 0 ? (
        <p className="max-w-3xl text-bone-soft">
          No system has a cycle to report for this chart. The Western bands need
          arc&rsquo;s computed cycles, which are cached per chart; the Eastern
          pillar needs a recorded gender.
        </p>
      ) : (
        <section className="mb-16">
          <SectionHeading
            aside={
              <span className="datum text-[0.6875rem] text-bone-faint">
                {bands.length} in force · {scale.windowStart.slice(0, 4)}—
                {scale.windowEnd.slice(0, 4)}
              </span>
            }
          >
            The Axis
          </SectionHeading>

          <Timeline
            bands={bands}
            now={now}
            windowStart={scale.windowStart}
            windowEnd={scale.windowEnd}
          />

          <Legend retro={bands.some(hasRetrograde)} />
          <NextTurn bands={bands} now={now} />

          {chinese.status === "ready" && chinese.data.luck === null ? (
            <p className="datum mt-4 max-w-3xl text-[0.6875rem] leading-relaxed text-bone-faint">
              No Eastern row: the luck pillars run forwards or backwards
              depending on the year stem and the gender, and this chart has no
              recorded gender. Guessing would produce a plausible, wrong decade.
            </p>
          ) : null}
        </section>
      )}
    </div>
  );
}
