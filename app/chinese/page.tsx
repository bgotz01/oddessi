"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PageTitle, SectionHeading, Themes } from "@/components/primitives";
import { ListColumn, Pair } from "@/components/study-panel";
import { ElementBar, PillarColumn } from "@/components/chinese/pillar";
import { TenGodsSection } from "@/components/chinese/ten-gods-section";
import {
  ExplainMark,
  ExplainProvider,
  Explains,
  useExplain,
} from "@/components/chinese/drawer";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useJson } from "@/lib/use-json";
import {
  ANIMALS,
  BRANCHES,
  STEMS,
  generatedBy,
  type Element,
} from "@/lib/chinese/almanac";
import { elementColor, elementDim } from "@/lib/chinese/palette";
import {
  combinationInPosition,
  dayMasterNarrative,
  pillarCombination,
  stemArchetype,
} from "@/lib/chinese/reading";
import type { Reading } from "@/lib/chinese/pillars";

/**
 * 八字 — the eight characters, read as a chart of its own.
 *
 * Deliberately not cross-referenced against the Western pages. The two systems
 * divide a life along different seams, and a page that kept translating one
 * into the other ("your Metal is like your Saturn") would teach neither. The
 * only thing they share is the birth moment in the rail above.
 */

/** An element named in running prose, in its own colour. */
function Named({ element }: { element: Element }) {
  return <span style={{ color: elementColor(element) }}>{element}</span>;
}

function formatWindow(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function ChinesePage() {
  const { chart } = useChart();
  const { setPageContext } = useChat();
  const state = useJson<Reading>(
    chart ? `/api/chinese?chartId=${encodeURIComponent(chart.id)}` : null,
  );

  // Push the Four Pillars data into chat context so the model can answer
  // questions about what is visible on this page.
  useEffect(() => {
    if (state.status !== "ready") return;

    const { pillars, dayMaster, elements, strength, missing } = state.data;

    const describePillar = (p: { stem: number; branch: number }) => ({
      stem: `${STEMS[p.stem].polarity} ${STEMS[p.stem].element} (${STEMS[p.stem].pinyin})`,
      branch: `${BRANCHES[p.branch].animal} — ${BRANCHES[p.branch].element}`,
    });

    setPageContext({
      _description: "Four Pillars / BaZi Chart",
      dayMaster: `${STEMS[dayMaster].polarity} ${STEMS[dayMaster].element} — ${STEMS[dayMaster].pinyin}`,
      pillars: {
        year: describePillar(pillars.year),
        month: describePillar(pillars.month),
        day: describePillar(pillars.day),
        hour: describePillar(pillars.hour),
      },
      elements: elements.map((e) => ({ element: e.element, sharePercent: e.share })),
      missingElements: missing,
      strength: {
        verdict: strength.verdict,
        inSeason: strength.inSeason,
        supportivePercent: strength.supportive,
      },
    });

    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, state.status === "ready" ? state.data : null]);

  return (
    <div className="mx-auto w-full max-w-5xl px-8 pb-24">
      <PageTitle
        eyebrow={chart ? chart.name : "No chart"}
        title="Four Pillars"
        lede="The birth written as eight characters — a Heavenly Stem over an
              Earthly Branch for the year, the month, the day and the hour. The
              year turns at the start of spring and the month at a solar term,
              so these boundaries are the sun's, not the calendar's."
      />

      {!chart ? (
        <p className="text-bone-soft">No chart selected.</p>
      ) : state.status === "loading" ? (
        <p className="datum text-[0.75rem] text-bone-faint">Casting pillars…</p>
      ) : state.status === "error" ? (
        <p className="datum text-[0.75rem] text-ember">{state.error}</p>
      ) : (
        <ExplainProvider>
          <ReadingView reading={state.data} />
        </ExplainProvider>
      )}
    </div>
  );
}

function ReadingView({ reading }: { reading: Reading }) {
  const { pillars, dayMaster, elements, strength, missing } = reading;
  const explain = useExplain();
  const master = STEMS[dayMaster];
  const archetype = stemArchetype(dayMaster);
  const narrative = dayMasterNarrative(dayMaster);
  const dayCombination = pillarCombination(pillars.day.stem, pillars.day.branch);
  const resource = generatedBy(master.element);
  const largest = Math.max(...elements.map((e) => e.share));

  const yearAnimal = BRANCHES[pillars.year.branch].animal;
  const animal = ANIMALS[yearAnimal];

  const emphasisOf = (element: Element): "self" | "absent" | "none" =>
    element === master.element
      ? "self"
      : missing.includes(element)
        ? "absent"
        : "none";

  return (
    <>
      <section className="mb-16">
        <SectionHeading
          aside={
            <span className="flex items-baseline gap-5">
              <button
                type="button"
                onClick={() =>
                  explain({ kind: "concept", concept: "solar-boundaries" })
                }
                className="datum cursor-pointer text-[0.6875rem] text-bone-faint transition-colors hover:text-patina"
              >
                Solar month {formatWindow(reading.month.startsAt)} –{" "}
                {formatWindow(reading.month.endsAt)}
              </button>
              <ExplainMark
                subject={{ kind: "concept", concept: "eight-characters" }}
              />
            </span>
          }
        >
          The Eight Characters
        </SectionHeading>
        <div className="grid grid-cols-4 border-y border-rule">
          <PillarColumn role="year" {...pillars.year} dayMaster={dayMaster} />
          <PillarColumn role="month" {...pillars.month} dayMaster={dayMaster} />
          <PillarColumn
            role="day"
            {...pillars.day}
            dayMaster={dayMaster}
            isDayMaster
          />
          <PillarColumn role="hour" {...pillars.hour} dayMaster={dayMaster} />
        </div>
      </section>

      <section className="mb-16">
        <SectionHeading
          aside={
            <span className="flex items-baseline gap-5">
              <span className="datum text-[0.6875rem] text-bone-faint">
                {strength.verdict}
              </span>
              <ExplainMark subject={{ kind: "concept", concept: "strength" }} />
            </span>
          }
        >
          The Day Master
        </SectionHeading>
        <div className="flex items-start gap-8 border-b border-rule-faint pb-8">
          <Explains
            subject={{ kind: "stem", stem: dayMaster, asDayMaster: true }}
            label={`the day master ${master.polarity} ${master.element}`}
            className="border-l-2 px-4"
            style={{ borderColor: elementDim(master.element) }}
          >
            <span
              className="han block text-[1.75rem]"
              style={{ color: elementColor(master.element) }}
            >
              {master.han}
            </span>
          </Explains>
          <div className="min-w-0 flex-1">
            <p
              className="inscription text-[1.375rem] leading-tight"
              style={{ color: elementColor(master.element) }}
            >
              {master.polarity} {master.element}
            </p>
            <p className="datum mt-1 text-[0.75rem] text-bone-faint">
              {master.pinyin} · {archetype.metaphor} · {narrative.lifeTheme}
            </p>
            <p className="mt-3 max-w-3xl text-[1.1875rem] text-bone">
              {archetype.essence}. {master.image.charAt(0).toUpperCase()}
              {master.image.slice(1)} — and the chart&rsquo;s subject: everything
              else is read as what surrounds it, feeds it, or wears it down.
            </p>
            <p className="datum mt-4 text-[0.75rem] leading-relaxed text-bone-faint">
              {strength.supportive}% of the chart is{" "}
              <Named element={master.element} /> or <Named element={resource} />,
              the element that generates it. The month is{" "}
              <Named element={BRANCHES[pillars.month.branch].element} />, so the
              season is {strength.inSeason ? "behind it" : "not"}.
            </p>
          </div>
        </div>

        {/* What this Day Master actually is, rather than what it is called. */}
        <div className="mt-8 space-y-8">
          <Pair>
            <ListColumn label="Strengths" items={narrative.strengths} />
            <ListColumn
              label="Costs"
              items={narrative.challenges}
              tone="ember"
            />
          </Pair>

          <div className="grid gap-8 border-t border-rule-faint pt-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-2">Needs</p>
              <p className="text-[1.0625rem] leading-relaxed text-bone">
                {narrative.coreNeed}.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-2">Grows by</p>
              <p className="text-[1.0625rem] leading-relaxed text-bone">
                {narrative.growthPath}.
              </p>
            </div>
          </div>

          {dayCombination ? (
            <div className="border-t border-rule-faint pt-8">
              <p className="eyebrow mb-3">
                Standing on {BRANCHES[pillars.day.branch].animal} —{" "}
                {dayCombination.chineseName}
              </p>
              <p className="max-w-3xl text-[1.1875rem] leading-relaxed text-bone">
                {combinationInPosition(dayCombination, "day")}
              </p>
              <p className="datum mt-4 max-w-3xl text-[0.75rem] leading-relaxed text-bone-faint">
                {dayCombination.howItWorks}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/*
        Straight after the Day Master, because it is unreadable before it: every
        relation it draws is a relation *to* the character above.
      */}
      <TenGodsSection dayMaster={dayMaster} pillars={pillars} />

      <section className="mb-16">
        <SectionHeading
          aside={
            <span className="flex items-baseline gap-5">
              <span
                className={`datum text-[0.6875rem] ${missing.length ? "text-ember" : "text-bone-faint"}`}
              >
                {missing.length
                  ? `${missing.join(", ")} absent`
                  : "All five present"}
              </span>
              <ExplainMark subject={{ kind: "concept", concept: "elements" }} />
            </span>
          }
        >
          The Five Elements
        </SectionHeading>
        <div className="border-b border-rule-faint pb-4">
          {elements.map((e) => (
            <ElementBar
              key={e.element}
              element={e.element}
              share={e.share}
              largest={largest}
              emphasis={emphasisOf(e.element)}
            />
          ))}
        </div>
        <p className="datum mt-4 text-[0.6875rem] leading-relaxed text-bone-faint">
          Weighed over all eight characters, the branches counted by the stems
          hidden inside them rather than by their surface element alone.
        </p>
      </section>

      <section className="mb-16">
        <SectionHeading
          aside={
            <span className="flex items-baseline gap-5">
              {/* The name is set large below, so the aside carries what it
                  does not: where in the year this branch sits. */}
              <span className="datum text-[0.6875rem] text-bone-faint">
                {BRANCHES[pillars.year.branch].season} · the{" "}
                {BRANCHES[pillars.year.branch].hours} watch
              </span>
              <ExplainMark
                subject={{ kind: "branch", branch: pillars.year.branch }}
                label="The branch"
              />
            </span>
          }
        >
          The Year Animal
        </SectionHeading>

        {/* The one name in this section a reader arrives already knowing. */}
        <p className="inscription mb-5 flex items-baseline gap-4 text-[1.75rem] leading-tight">
          <span
            className="han text-[1.5rem]"
            style={{ color: elementColor(BRANCHES[pillars.year.branch].element) }}
          >
            {BRANCHES[pillars.year.branch].han}
          </span>
          <span style={{ color: elementColor(STEMS[pillars.year.stem].element) }}>
            {STEMS[pillars.year.stem].element} {yearAnimal}
          </span>
        </p>

        <p className="max-w-3xl text-[1.1875rem] leading-relaxed text-bone">
          {animal.note}
        </p>
        <div className="mt-6">
          <Themes themes={animal.traits} />
        </div>
        <p className="datum mt-6 text-[0.6875rem] leading-relaxed text-bone-faint">
          The animal everyone knows is only the year branch — one character of
          the eight, and the one furthest from the self. The day pillar above is
          the closer reading.
        </p>
      </section>

      <p>
        <Link
          href="/chinese/luck-pillars"
          className="datum text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase transition-colors hover:text-patina"
        >
          The ten-year luck pillars →
        </Link>
      </p>
    </>
  );
}
