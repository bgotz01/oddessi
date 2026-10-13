"use client";

import { useEffect, useMemo, useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { BODY } from "@/lib/bodies";
import { signGlyph } from "@/lib/symbols";
import {
  stagesOf,
  sunProgression,
  SUN_RATE,
} from "@/lib/cycles/sun-progression";
import {
  bandFor,
  bandNamed,
  chapterFor,
  dossierFor,
  ingressFor,
} from "@/lib/cycles/sun-progression-data";
import SunStageBar from "@/components/western/cycles/sun-stage-bar";
import SunDrawer from "@/components/western/cycles/sun-drawer";

const SUN = BODY.Sun.color;

function year(iso: string): string {
  return iso.slice(0, 4);
}

/**
 * The progressed Sun through the signs — roughly thirty years each, one
 * chapter of identity after another. Ported from arc's Sun Progression
 * Timeline; computed in the browser from the natal Sun alone.
 */
export default function SunProgressionPage() {
  const { chart } = useChart();
  const { setPageContext } = useChat();
  const [now] = useState(() => new Date());

  const sp = useMemo(
    () => (chart ? sunProgression(chart, now) : null),
    [chart, now],
  );
  // Index into `sp.phases`, keyed to the chart so switching charts closes it.
  const [opened, setOpened] = useState<{
    chartId: string;
    index: number;
  } | null>(null);
  const openIndex =
    opened && opened.chartId === chart?.id ? opened.index : null;
  const openPhase = sp && openIndex != null ? sp.phases[openIndex] : null;

  useEffect(() => {
    if (!sp) return;
    setPageContext({
      _description: "Sun Progression Timeline",
      _note:
        "Secondary progressed Sun, solved against the Sun's true motion " +
        "(low-precision solar theory), so ingress dates are good to within a " +
        "few days. Birth time is not used — the anchor is the stored natal longitude.",
      natalSun: `${sp.natalDegree} ${sp.natalSign}`,
      age: Number(sp.age.toFixed(1)),
      progressedSun: `${sp.progressedDegree.toFixed(1)}° ${sp.progressedSign}`,
      phases: sp.phases.map((p, i) => ({
        sign: p.sign,
        entryAge: Number(p.entryAge.toFixed(1)),
        exitAge: Number(p.exitAge.toFixed(1)),
        start: p.start,
        end: p.end,
        state: p.state,
        // The full interpretation arc carries for the sign. The drawer shows
        // a slice; the rest is here for the chat.
        chapter: chapterFor(p.sign) ?? null,
        stages: stagesOf(p, sp.age).map((st) => ({
          phase: st.phase,
          entryAge: Number(st.entryAge.toFixed(1)),
          exitAge: Number(st.exitAge.toFixed(1)),
          state: st.state,
          reading:
            bandNamed(st.phase, p.sign).signOverlay ??
            bandNamed(st.phase, p.sign).genericMeaning,
        })),
        enteredFrom: i > 0 ? sp.phases[i - 1].sign : null,
        ingress: i > 0 ? (ingressFor(p.sign) ?? null) : null,
        transition:
          i > 0 ? (dossierFor(sp.phases[i - 1].sign, p.sign) ?? null) : null,
      })),
      // Early / middle / late within the sign in force, read off the degree.
      currentBand: bandFor(sp.progressedDegree, sp.progressedSign),
      openInDrawer: openPhase?.sign ?? null,
    });
    return () => setPageContext(null);
  }, [sp, openPhase, setPageContext]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <PageTitle
        eyebrow={chart ? chart.name : "No chart"}
        title="Sun Progression"
      />

      <SectionHeading
        aside={`~1° a year · ~${Math.round(30 / SUN_RATE)} years a sign`}
      >
        Timeline
      </SectionHeading>

      {!chart ? (
        <p className="font-light text-bone-soft">No chart selected.</p>
      ) : !sp ? (
        <p className="font-light text-bone-soft">
          This chart has no Sun longitude stored.
        </p>
      ) : (
        <>
          <p className="mb-8 text-[1.0625rem] font-light text-bone-soft">
            Natal Sun {sp.natalDegree} {sp.natalSign}. Progressed Sun now{" "}
            <span style={{ color: SUN }}>
              {Math.floor(sp.progressedDegree)}° {sp.progressedSign}
            </span>
            , at age {Math.floor(sp.age)}.
          </p>

          <ol className="border-t border-rule">
            {sp.phases.map((p, i) => {
              const current = p.state === "current";
              return (
                <li
                  key={`${p.sign}-${i}`}
                  className="border-b border-rule-faint"
                >
                  <button
                    type="button"
                    onClick={() =>
                      chart && setOpened({ chartId: chart.id, index: i })
                    }
                    aria-current={current ? "true" : undefined}
                    aria-pressed={openIndex === i}
                    className="block w-full cursor-pointer px-3 py-4 text-left transition-colors hover:bg-surface-alt focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-patina)]"
                    style={{
                      background: current
                        ? `color-mix(in srgb, ${SUN} 12%, transparent)`
                        : undefined,
                      opacity: p.state === "ahead" ? 0.55 : 1,
                    }}
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        className="glyph w-6 text-xl leading-none"
                        style={{
                          color: current ? SUN : "var(--color-bone-faint)",
                        }}
                      >
                        {signGlyph(p.sign)}
                      </span>
                      <span
                        className="inscription min-w-[8rem] text-[1rem]"
                        style={{ color: current ? SUN : "var(--color-bone)" }}
                      >
                        {p.sign}
                      </span>
                      <span className="hidden text-[0.9375rem] font-light text-bone-soft md:inline">
                        {chapterFor(p.sign)?.chapterTheme}
                      </span>
                      {i === 0 ? (
                        <span className="datum text-[0.625rem] tracking-[0.22em] text-bone-faint uppercase">
                          Natal
                        </span>
                      ) : null}
                      {current ? (
                        <span
                          className="datum text-[0.625rem] tracking-[0.22em] uppercase"
                          style={{ color: SUN }}
                        >
                          Now
                        </span>
                      ) : null}
                      <span className="datum ml-auto text-right text-[0.75rem] text-bone-faint">
                        {i === 0 ? "Born" : `Age ${Math.round(p.entryAge)}`}–
                        {Math.round(p.exitAge)}
                        <span
                          className="ml-3 hidden sm:inline"
                          style={{ opacity: 0.7 }}
                        >
                          {year(p.start)}–{year(p.end)}
                        </span>
                      </span>
                    </span>

                    {current ? (
                      <span className="block pl-10">
                        <SunStageBar
                          phase={p}
                          stages={stagesOf(p, sp.age)}
                          age={sp.age}
                        />
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ol>

          <p className="datum mt-4 text-[0.6875rem] text-bone-faint">
            True solar motion — ingress dates are good to within a few days.
          </p>
        </>
      )}

      {sp && openPhase && openIndex != null && (
        <SunDrawer
          phase={openPhase}
          previous={openIndex > 0 ? sp.phases[openIndex - 1].sign : null}
          degree={openPhase.state === "current" ? sp.progressedDegree : null}
          age={sp.age}
          onClose={() => setOpened(null)}
        />
      )}
    </div>
  );
}
