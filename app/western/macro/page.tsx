"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageTitle, SectionHeading } from "@/components/primitives";
import MacroSky from "@/components/western/macro/macro-sky";
import CycleTimeline from "@/components/western/macro/cycle-timeline";
import MacroDrawer from "@/components/western/macro/macro-drawer";
import MacroSkyDrawer from "@/components/western/macro/macro-sky-drawer";
import MacroJupiterCycle, {
  jupiterElementColor,
} from "@/components/western/macro/macro-jupiter-cycle";
import JupiterEraDrawer from "@/components/western/macro/jupiter-era-drawer";
import { useChat } from "@/components/chat-provider";
import { useJson } from "@/lib/use-json";
import type { MacroReading } from "@/lib/macro";
import {
  JUPITER_ERAS,
  activeJupiterEraIndex,
  jupiterCycleYears,
  jupiterEraStatus,
  type JupiterEra,
} from "@/lib/astrology/macro/jupiter-eras-data";

const JUPITER: readonly JupiterEra[] = JUPITER_ERAS;

/**
 * The macro layer — the one Western page with no chart behind it.
 *
 * Every other page here reads a birth. This one reads the sky, which is the
 * same sky for everyone, so there is no chart selector on it and no empty
 * state when none is chosen.
 *
 * The page carries two things and nothing else: where the slow bodies are, and
 * which long cycles are in force. The interpretation — six sections of it per
 * cycle — is one click away in the drawer rather than laid out down the page,
 * because a page that shows everything at once stops being readable at exactly
 * the point it becomes complete.
 */
export default function MacroPage() {
  const { setPageContext } = useChat();
  const state = useJson<MacroReading>("/api/macro");
  const [selection, setSelection] = useState<
    { kind: "sky" | "cycle" | "jupiter"; id: string } | null
  >(null);

  const selectedCycle =
    state.status === "ready" && selection?.kind === "cycle"
      ? (state.data.cycles.find((cycle) => cycle.id === selection.id) ?? null)
      : null;
  const selectedSkyBody =
    state.status === "ready" && selection?.kind === "sky"
      ? (state.data.sky.find((body) => body.planet === selection.id) ?? null)
      : null;
  const jupiterIndex =
    selection?.kind === "jupiter"
      ? JUPITER.findIndex((era) => era.sign === selection.id)
      : -1;
  const asOfTime = state.status === "ready" ? Date.parse(state.data.asOf) : 0;

  // What is on screen, handed to the conversation. The sections are stripped
  // out — they are long, and the model has the same archetypal material.
  useEffect(() => {
    if (state.status !== "ready") return;

    setPageContext({
      _description: "Macro Cycles (Western)",
      asOf: state.data.asOf,
      _note:
        "This page has no birth chart behind it. Positions are the real " +
        "current longitudes of the five slow bodies, and the cycles are the " +
        "long collective ones — civilizational, structural, and conjunction " +
        "turning points — with how far through each one we are now. Nothing " +
        "here is personal to the reader's chart; /western/cycles is where " +
        "their own transits are.",
      sky: state.data.sky.map((b) => ({
        planet: b.planet,
        sign: b.sign,
        degree: b.degree,
        retrograde: b.retrograde,
        dailyMotion: b.dailyMotion,
        signSpan: b.timeframe,
        collectiveMeaning: b.meaning.theme,
      })),
      cycles: state.data.cycles.map((c) => ({
        cycle: c.name,
        layer: c.layer,
        sign: c.sign,
        theme: c.theme,
        timeframe: c.timeframe,
        yearsIn: c.yearsIn,
        totalYears: c.totalYears,
        phase: c.phase,
      })),
      jupiterCycle: (() => {
        const now = Date.parse(state.data.asOf);
        const era = JUPITER[activeJupiterEraIndex(now)];
        const { yearsIn, totalYears } = jupiterCycleYears(now);
        return {
          loop: `${JUPITER[0].years.split(" – ")[0]} – ${JUPITER[JUPITER.length - 1].years.split(" – ")[1]}`,
          yearsIn: Number(yearsIn.toFixed(1)),
          totalYears: Number(totalYears.toFixed(1)),
          currentSign: era?.sign ?? null,
          signSpan: era?.years ?? null,
          growth: era?.growth ?? null,
          question: era?.question ?? null,
        };
      })(),
    });

    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, state.status === "ready" ? state.data : null]);

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow="Collective"
        title="Macro"
        lede=""
      />

      {state.status === "loading" ? (
        <p className="datum text-[0.75rem] text-bone-faint">Reading the sky…</p>
      ) : state.status === "error" ? (
        <p className="datum text-[0.75rem] text-ember">{state.error}</p>
      ) : (
        <>
          <section className="mb-16">
            <SectionHeading
              aside={new Date(state.data.asOf).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            >
              Current Macro Sky
            </SectionHeading>
            <p className="mb-5 max-w-3xl text-[0.9375rem] leading-relaxed text-bone-faint">
              Live positions, motion, and sign-passage windows. Select a
              placement for its collective meaning; the timeline below shows
              the longer cycles those placements participate in.
            </p>
            <MacroSky
              sky={state.data.sky}
              onSelect={(planet) => setSelection({ kind: "sky", id: planet })}
              selectedPlanet={
                selection?.kind === "sky" ? selection.id : null
              }
            />
          </section>

          <section className="mb-16">
            <SectionHeading
              aside={
                <Link
                  href="/western/macro/jupiter"
                  className="transition-colors hover:text-patina"
                >
                  Full sequence →
                </Link>
              }
            >
              Jupiter Long Cycle
            </SectionHeading>
            <p className="mb-1 max-w-3xl text-[0.9375rem] leading-relaxed text-bone-faint">
              Where collective growth is flowing. The bar is Jupiter&apos;s
              whole twelve-year loop through the signs; select a sign for its
              reading.
            </p>
            <MacroJupiterCycle
              asOf={state.data.asOf}
              onSelect={(sign) => setSelection({ kind: "jupiter", id: sign })}
              selectedSign={
                selection?.kind === "jupiter" ? selection.id : null
              }
            />
          </section>

          <section>
            <SectionHeading aside={`${state.data.cycles.length} in force`}>
              Current Cycle Timeline
            </SectionHeading>
            <CycleTimeline
              cycles={state.data.cycles}
              onSelect={(cycleId) =>
                setSelection({ kind: "cycle", id: cycleId })
              }
              selectedId={
                selection?.kind === "cycle" ? selection.id : null
              }
            />
          </section>
        </>
      )}

      {/* Right drawer */}
      {selectedSkyBody && (
        <MacroSkyDrawer
          body={selectedSkyBody}
          onClose={() => setSelection(null)}
        />
      )}
      {jupiterIndex >= 0 && (
        <JupiterEraDrawer
          era={JUPITER[jupiterIndex]}
          status={jupiterEraStatus(jupiterIndex, asOfTime)}
          color={jupiterElementColor(JUPITER[jupiterIndex].element)}
          previous={jupiterIndex > 0 ? JUPITER[jupiterIndex - 1] : null}
          next={jupiterIndex < JUPITER.length - 1 ? JUPITER[jupiterIndex + 1] : null}
          onNavigate={(sign) => setSelection({ kind: "jupiter", id: sign })}
          onClose={() => setSelection(null)}
        />
      )}
      {selectedCycle && (
        <MacroDrawer
          cycle={selectedCycle}
          onClose={() => setSelection(null)}
        />
      )}

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <div className="mt-16 grid gap-3 border-t border-rule pt-12 md:grid-cols-2">
        <Link
          href="/western/macro/jupiter"
          className="inscription block border border-patina-dim px-8 py-7 text-center text-[1rem] leading-none text-patina transition-colors hover:border-patina hover:bg-patina-deep"
        >
          Jupiter — The Growth Sequence →
        </Link>
        <Link
          href="/western/macro/neptune"
          className="inscription block border border-patina-dim px-8 py-7 text-center text-[1rem] leading-none text-patina transition-colors hover:border-patina hover:bg-patina-deep"
        >
          Neptune — The Era Sequence →
        </Link>
        <Link
          href="/western/macro/uranus"
          className="inscription block border border-patina-dim px-8 py-7 text-center text-[1rem] leading-none text-patina transition-colors hover:border-patina hover:bg-patina-deep"
        >
          Uranus — The Shock Sequence →
        </Link>
        <Link
          href="/western/macro/pluto"
          className="inscription block border border-patina-dim px-8 py-7 text-center text-[1rem] leading-none text-patina transition-colors hover:border-patina hover:bg-patina-deep"
        >
          Pluto — The Power Sequence →
        </Link>
      </div>
    </div>
  );
}
