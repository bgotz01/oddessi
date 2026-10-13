"use client";

import { useEffect } from "react";
import { BODY } from "@/lib/bodies";
import { signGlyph } from "@/lib/symbols";
import { STAGE_COLOR } from "@/components/western/cycles/sun-stage-bar";
import { Bullets } from "@/components/western/cycles/cycle-drawer";
import { stagesOf, type SunPhase } from "@/lib/cycles/sun-progression";
import {
  bandNamed,
  chapterFor,
  dossierFor,
} from "@/lib/cycles/sun-progression-data";

const SUN = BODY.Sun.color;

/** "14 Mar 2028" from an ISO day, read in UTC so it never slips a day. */
function longDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * One sign of the progressed Sun's walk, explained.
 *
 * Chapter → its three stages, dated → what entering it trades.
 * Everything else arc carries for the sign goes to the chat, not here.
 */
export default function SunDrawer({
  phase,
  previous,
  degree,
  age,
  onClose,
}: {
  phase: SunPhase;
  /** The sign before this one; null for the natal sign, which nothing enters. */
  previous: string | null;
  /** The progressed Sun's degree in the sign — only for the one in force. */
  degree: number | null;
  /** The chart's age now, to light the stage in force. */
  age: number;
  onClose: () => void;
}) {
  const chapter = chapterFor(phase.sign);
  const dossier = previous ? dossierFor(previous, phase.sign) : undefined;
  const stages = stagesOf(phase, age);
  const current = phase.state === "current";

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-void/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Progressed Sun in ${phase.sign}`}
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-rule bg-surface shadow-2xl"
      >
        {/* Header */}
        <div className="shrink-0 border-b border-rule px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className="glyph text-[2rem] leading-none"
                style={{ color: SUN }}
              >
                {signGlyph(phase.sign)}
              </span>
              <div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="inscription text-[1.25rem]"
                    style={{ color: SUN }}
                  >
                    Sun
                  </span>
                  <span className="inscription text-[1.25rem] text-bone">
                    {phase.sign}
                  </span>
                </div>
                {chapter && (
                  <p className="datum mt-0.5 text-[0.75rem] tracking-[0.14em] text-bone-soft uppercase">
                    {chapter.chapterTheme}
                  </p>
                )}
                <p className="datum mt-2 text-[0.75rem] text-bone-faint">
                  {previous ? `Age ${Math.round(phase.entryAge)}` : "Born"}–
                  {Math.round(phase.exitAge)}
                  {" · "}
                  {longDate(phase.start)} – {longDate(phase.end)}
                  {current ? (
                    <span
                      className="ml-2 tracking-[0.22em] uppercase"
                      style={{ color: SUN }}
                    >
                      Now
                    </span>
                  ) : null}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 text-[0.75rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>
        </div>

        <div className="space-y-7 px-6 py-7">
          {chapter && (
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {chapter.description}
            </p>
          )}

          {/* The sign in thirds, each dated. The one in force is lit. */}
          <section>
            <p className="eyebrow mb-3 text-[0.75rem] text-bone">Stages</p>
            <ol className="border-t border-rule-faint">
              {stages.map((st) => {
                const band = bandNamed(st.phase, phase.sign);
                const now = st.state === "current";
                return (
                  <li
                    key={st.phase}
                    className="border-b border-rule-faint px-3 py-3"
                    style={{
                      background: now
                        ? `color-mix(in srgb, ${SUN} 12%, transparent)`
                        : undefined,
                      opacity: st.state === "ahead" ? 0.6 : 1,
                    }}
                  >
                    <p className="flex items-baseline gap-3">
                      <span
                        className="inscription text-[0.9375rem]"
                        style={{
                          color: now
                            ? STAGE_COLOR[st.phase]
                            : "var(--color-bone)",
                        }}
                      >
                        {st.phase}
                      </span>
                      <span className="datum text-[0.6875rem] text-bone-faint">
                        {band.degrees}
                      </span>
                      {now && degree != null ? (
                        <span
                          className="datum text-[0.625rem] tracking-[0.22em] uppercase"
                          style={{ color: SUN }}
                        >
                          Now · {Math.floor(degree)}°
                        </span>
                      ) : null}
                      <span className="datum ml-auto text-[0.75rem] text-bone-faint">
                        {st.entryAge === 0
                          ? "Born"
                          : `Age ${Math.round(st.entryAge)}`}
                        –{Math.round(st.exitAge)}
                      </span>
                    </p>
                    <p className="mt-1.5 text-[1rem] leading-relaxed text-bone-soft">
                      {band.signOverlay ?? band.genericMeaning}
                    </p>
                  </li>
                );
              })}
            </ol>
          </section>

          {chapter && (
            <div className="grid gap-6 sm:grid-cols-2">
              <Bullets
                label="What works"
                items={chapter.whatWorksHere.slice(0, 4)}
                labelClass="text-patina"
                markClass="text-patina"
              />
              <Bullets
                label="What doesn't"
                items={chapter.whatDoesntWork.slice(0, 4)}
                labelClass="text-ember"
                markClass="text-ember"
              />
            </div>
          )}

          {/* The crossing into this sign. The natal sign was never entered. */}
          {dossier && (
            <section className="border-t border-rule-faint pt-7">
              <p className="mb-1 text-[0.9375rem] text-bone-faint italic">
                from {dossier.fromSign}
              </p>
              <h3 className="mb-5 text-[1.125rem] text-bone">
                {dossier.summary}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <Bullets label="Leaving behind" items={dossier.leavingBehind} />
                <Bullets
                  label="Coming online"
                  items={dossier.comingOnline}
                  mark="+"
                />
              </div>
              <p className="mt-6 text-[1.0625rem] text-bone-soft italic">
                “{dossier.mantra}”
              </p>
            </section>
          )}
        </div>

        <div className="mt-auto">
          <div
            className="h-[3px] w-full"
            style={{ background: SUN, opacity: 0.35 }}
          />
        </div>
      </div>
    </>
  );
}
