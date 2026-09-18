// components/industry/uranus-era-drawer.tsx
"use client";

import { useEffect } from "react";
import { ELEMENT_COLOR, signGlyph, signMeta } from "@/lib/symbols";
import {
  URANUS_MUSIC_ERAS,
  forwardLine,
  getEraReading,
  uranusEraStatus,
  type UranusEraOverview,
  type UranusEraStatus,
} from "@/lib/industry/uranus-music-eras-data";
import { useReadingYear } from "@/lib/industry/use-reading-year";
import MusicConcurrent from "@/components/industry/music-concurrent";
import type { MusicCycleConcurrency } from "@/lib/industry/music-cycles";

/** The vocabulary the macro era drawers already use for the same question. */
const STATUS_LABEL: Record<UranusEraStatus, string> = {
  completed: "Closed",
  active: "Active",
  upcoming: "Ahead",
};

/**
 * One Uranus era, at reading length.
 *
 * Built to the same pattern as the Neptune drawer rather than as a modal
 * `<dialog>`, which is what the standalone Uranus table used to open. On the
 * combined chart the two drawers are the same drawer with different content,
 * and two different opening behaviours on one page reads as two different
 * components — the reader learns the interaction twice.
 *
 * `concurrent` is optional because this drawer has two call sites: the
 * combined chart, where the other clock is the point, and the Uranus-only
 * table, where there is no other clock on the page to point at.
 */
export default function UranusEraDrawer({
  era,
  concurrent,
  onNavigate,
  onSelectSegment,
  onClose,
}: {
  era: UranusEraOverview;
  concurrent?: MusicCycleConcurrency[];
  onNavigate: (sign: string) => void;
  onSelectSegment?: (segmentId: string) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const index = URANUS_MUSIC_ERAS.findIndex((e) => e.sign === era.sign);
  const previous = index > 0 ? URANUS_MUSIC_ERAS[index - 1] : null;
  const next = index < URANUS_MUSIC_ERAS.length - 1 ? URANUS_MUSIC_ERAS[index + 1] : null;

  const meta = signMeta(era.sign);
  const color = meta ? ELEMENT_COLOR[meta.element] : "var(--color-patina)";
  const detail = getEraReading(era.sign);

  // Two separate facts, deliberately not collapsed into one. Where the era sits
  // relative to the reader is arithmetic on its dates; whether it has been
  // written up is editorial. Gemini is both the era running now AND the unread
  // one, and a single badge could only say one of those.
  const year = useReadingYear();
  const status = year === null ? null : uranusEraStatus(era, year);
  const unobserved = detail === null;

  // The reading's own line, which is a claim about the era. `manifestation` is
  // the label the table column carries, and repeating it here would make the
  // drawer the widest possible restatement of the cell that opened it.
  const title = detail?.headline ?? era.manifestation ?? "To be observed";

  return (
    <>
      <div className="fixed inset-0 z-40 bg-void/50" onClick={onClose} aria-hidden="true" />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Uranus in ${era.sign} — Music`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-rule bg-surface"
      >
        <header className="shrink-0 border-b border-rule px-7 py-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className="datum text-[0.6875rem] tracking-[0.2em] uppercase"
                  style={{ color }}
                >
                  Uranus in {era.sign}
                </span>
                {status && (
                  <>
                    <span className="h-3 w-px bg-rule" />
                    <span className="datum text-[0.6875rem] tracking-[0.18em] text-bone-faint uppercase">
                      {STATUS_LABEL[status]}
                    </span>
                  </>
                )}
                {unobserved && (
                  <>
                    <span className="h-3 w-px bg-rule" />
                    <span className="datum text-[0.6875rem] tracking-[0.18em] text-bone-faint uppercase">
                      Not yet read
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="glyph text-[2rem] leading-none" style={{ color }}>
                  {signGlyph(era.sign)}
                </span>
                <h2 className="inscription text-[1.375rem] leading-tight text-bone">
                  {title}
                </h2>
              </div>
              <p className="datum mt-2.5 text-[0.75rem] text-bone-faint">
                {era.dates}
                {era.manifestation && era.manifestation !== title && (
                  <span> · {era.manifestation}</span>
                )}
              </p>

              {era.axis && (
                <p className="datum mt-2 text-[0.6875rem] uppercase tracking-[0.12em] text-bone-faint">
                  {era.axisDetail ?? era.axis}
                  {era.axisNote && (
                    <span className="normal-case tracking-normal"> — {era.axisNote}</span>
                  )}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 cursor-pointer text-[0.6875rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>

          <div className="mt-5 border-l-[3px] py-1 pl-4" style={{ borderColor: color }}>
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft italic">
              {era.principle}
            </p>
          </div>
        </header>

        <div className="space-y-7 px-7 py-7">
          {(() => {
            if (!detail) {
              // No reading of its own. What it does have is what the readings
              // either side of it say it is for, plus the principle in the
              // header — enough that the era running now is not a dead end.
              const expected = forwardLine(era.sign);

              return (
                <>
                  {era.disruption && (
                    <section>
                      <p className="eyebrow mb-2 text-[0.6875rem]">What gets disrupted</p>
                      <p className="text-[1.0625rem] leading-relaxed" style={{ color }}>
                        {era.disruption}
                      </p>
                    </section>
                  )}

                  {era.description && (
                    <section className={era.disruption ? "border-t border-rule-faint pt-6" : ""}>
                      <p className="eyebrow mb-2 text-[0.6875rem]">The hypothesis</p>
                      <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
                        {era.description}
                      </p>
                      <p className="datum mt-3 text-[0.6875rem] leading-relaxed text-bone-faint">
                        A reading of an era still running. No full reading has
                        been written from it yet.
                      </p>
                    </section>
                  )}

                  {expected && !era.description && (
                    <section className={era.disruption ? "border-t border-rule-faint pt-6" : ""}>
                      <p className="eyebrow mb-3 text-[0.6875rem]">What the cycle expects</p>
                      <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
                        {expected}
                      </p>
                      <p className="datum mt-3 text-[0.6875rem] leading-relaxed text-bone-faint">
                        Read off the neighbouring eras. Nothing has been written
                        from this one yet.
                      </p>
                    </section>
                  )}
                </>
              );
            }

            // Full reading
            return (
              <>
                {era.disruption && (
                  <section>
                    <p className="eyebrow mb-2 text-[0.6875rem]">What gets disrupted</p>
                    <p className="text-[1.125rem] leading-snug" style={{ color }}>
                      {era.disruption}
                    </p>
                  </section>
                )}

                {era.description && (
                  <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
                    {era.description}
                  </p>
                )}

                {/* Key shifts */}
                <section>
                  <p className="eyebrow mb-3 text-[0.6875rem]">Key shifts</p>
                  <ul className="space-y-2">
                    {detail.keyShifts.map((shift) => (
                      <li key={shift} className="flex gap-3">
                        <span
                          className="mt-[0.55em] h-[3px] w-[3px] shrink-0 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[1.0625rem] leading-snug text-bone-soft">{shift}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Before → After */}
                <section className="border-t border-rule-faint pt-6">
                  <p className="eyebrow mb-4 text-[0.6875rem]">Before → After</p>
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr>
                        <th className="w-[120px] pb-2 pr-4">
                          <span className="datum text-[0.5625rem] uppercase tracking-[0.14em] text-bone-faint/50">Axis</span>
                        </th>
                        <th className="pb-2 pr-4">
                          <span className="datum text-[0.5625rem] uppercase tracking-[0.14em] text-bone-faint">{detail.beforeSign}</span>
                        </th>
                        <th className="pb-2">
                          <span className="datum text-[0.5625rem] uppercase tracking-[0.14em]" style={{ color }}>{detail.afterSign}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.beforeAfter.map((row, i) => (
                        <tr key={row.axis} className={i % 2 === 0 ? "bg-surface-alt/40" : ""}>
                          <td className="py-2 pr-4 align-top">
                            <span className="datum text-[0.6875rem] uppercase tracking-[0.1em] text-bone-faint">{row.axis}</span>
                          </td>
                          <td className="py-2 pr-4 align-top">
                            <span className="text-[0.9375rem] text-bone-soft">{row.before}</span>
                          </td>
                          <td className="py-2 align-top">
                            <span className="text-[0.9375rem] text-bone">{row.after}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>

                {/* Key technologies */}
                <section className="border-t border-rule-faint pt-6">
                  <p className="eyebrow mb-3 text-[0.6875rem]">Key technologies</p>
                  <ul className="space-y-2">
                    {detail.keyTechnologies.map((tech) => (
                      <li key={tech} className="flex gap-3">
                        <span
                          className="mt-[0.55em] h-[3px] w-[3px] shrink-0 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[1.0625rem] leading-snug text-bone-soft">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Industry impact */}
                <section className="border-t border-rule-faint pt-6">
                  <p className="eyebrow mb-3 text-[0.6875rem]">Industry impact</p>
                  <ul className="space-y-2">
                    {detail.industryImpact.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          className="mt-[0.55em] h-[3px] w-[3px] shrink-0 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[1.0625rem] leading-snug text-bone-soft">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Era logic — the sequence this era sits in the middle of */}
                <section className="border-t border-rule-faint pt-6">
                  <p className="eyebrow mb-4 text-[0.6875rem]">Era logic</p>
                  <ol className="space-y-0">
                    {detail.eraLogic.map((step, i) => {
                      const here = step.sign === era.sign;
                      return (
                        <li key={step.sign} className="flex gap-4">
                          {/* The spine: a rail through all three beats, swelling at this one. */}
                          <div
                            className="relative flex w-[9px] shrink-0 justify-center"
                            aria-hidden="true"
                          >
                            <span
                              className="absolute inset-y-0 w-px bg-rule"
                              style={{
                                top: i === 0 ? "0.7em" : 0,
                                bottom: i === detail.eraLogic.length - 1 ? "auto" : 0,
                                height: i === detail.eraLogic.length - 1 ? "0.7em" : undefined,
                              }}
                            />
                            <span
                              className="absolute top-[0.55em] rounded-full"
                              style={{
                                backgroundColor: here ? color : "var(--color-rule)",
                                height: here ? 9 : 5,
                                width: here ? 9 : 5,
                              }}
                            />
                          </div>
                          <div className={i === detail.eraLogic.length - 1 ? "pb-0" : "pb-5"}>
                            <p
                              className="datum text-[0.625rem] uppercase tracking-[0.14em]"
                              style={{ color: here ? color : "var(--color-bone-faint)" }}
                            >
                              {step.sign}
                              {here && (
                                <span className="text-bone-faint"> · This era</span>
                              )}
                            </p>
                            <p
                              className={`mt-1 text-[1.0625rem] leading-snug ${here ? "text-bone" : "text-bone-soft"}`}
                            >
                              {step.line}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              </>
            );
          })()}

          {concurrent && concurrent.length > 0 && onSelectSegment && (
            <section className="border-t border-rule-faint pt-6">
              <MusicConcurrent links={concurrent} onSelect={onSelectSegment} />
            </section>
          )}
        </div>

        <footer className="mt-auto flex shrink-0 items-center justify-between gap-4 border-t border-rule px-7 py-5">
          {previous ? (
            <button
              type="button"
              onClick={() => onNavigate(previous.sign)}
              className="datum cursor-pointer text-[0.6875rem] tracking-[0.16em] text-bone-faint uppercase transition-colors hover:text-patina"
            >
              ← {previous.sign}
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button
              type="button"
              onClick={() => onNavigate(next.sign)}
              className="datum cursor-pointer text-[0.6875rem] tracking-[0.16em] text-bone-faint uppercase transition-colors hover:text-patina"
            >
              {next.sign} →
            </button>
          ) : (
            <span />
          )}
        </footer>

        <div className="h-[3px] w-full shrink-0" style={{ backgroundColor: color }} />
      </aside>
    </>
  );
}
