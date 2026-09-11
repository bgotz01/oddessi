// components/western/macro/macro-drawer.tsx

"use client";

import { useEffect } from "react";
import { ELEMENT_COLOR } from "@/lib/symbols";
import type { MacroCycle } from "@/lib/macro";

/**
 * Everything the page deliberately left out.
 *
 * The timeline answers "which cycles are running and how far through are we".
 * The reading — what the cycle acts on, what it distorts, what happened the
 * last time it came round — is long, and putting it on the page turns a
 * legible instrument into a wall of prose. So it lives here, one cycle at a
 * time, and the page stays a page.
 *
 * Ember is spent on exactly one thing: the risk section. A cycle's distortion
 * risk is the only part of these records that is a warning rather than a
 * description, and it is the part a reader skimming for the downside is
 * looking for.
 */

const RISK_LABELS = new Set(["Distortion Risk"]);

export default function MacroDrawer({
  cycle,
  onClose,
}: {
  cycle: MacroCycle;
  onClose: () => void;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const pct = Math.round(cycle.progress * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-void/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${cycle.name}${cycle.sign ? ` in ${cycle.sign}` : ""}`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-rule bg-surface"
      >
        {/* Header */}
        <div className="shrink-0 border-b border-rule px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">{cycle.layer}</p>

              <div className="flex items-baseline gap-3">
                <span
                  className="glyph flex shrink-0 items-baseline gap-1 text-[1.75rem] leading-none"
                  style={{ color: cycle.color }}
                >
                  {cycle.glyphs.map((g, i) => (
                    <span key={i}>{g}</span>
                  ))}
                </span>
                <span
                  className="text-[1.375rem] leading-tight text-bone"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {cycle.name}
                </span>
              </div>

              {cycle.sign ? (
                <>
                  <p className="mt-2 flex items-baseline gap-2">
                    <span
                      className="text-[1.0625rem] text-bone-soft"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      in {cycle.sign}
                    </span>
                    {cycle.element ? (
                      <span
                        className="datum text-[0.5625rem] tracking-[0.22em] uppercase"
                        style={{ color: ELEMENT_COLOR[cycle.element] }}
                      >
                        {cycle.element}
                      </span>
                    ) : null}
                  </p>
                  {/*
                    A pair cycle's sign is not where either planet is now — it
                    is where the two of them met, which is the one thing that
                    stays fixed for the cycle's whole length. Saying so is the
                    difference between a label and a fact.
                  */}
                  {cycle.kind === "conjunction-cycle" &&
                    cycle.signDegree !== undefined ? (
                    <p className="datum mt-1 text-[0.625rem] text-bone-faint">
                      met at {cycle.signDegree.toFixed(1)}° · {cycle.startYear}
                    </p>
                  ) : null}
                </>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 cursor-pointer text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>

          {/* Position in the cycle */}
          <div className="mt-5">
            <div className="relative h-[6px] w-full">
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: cycle.color,
                  opacity: 0.12,
                  borderRadius: "1px",
                }}
              />
              <div
                className="absolute inset-y-0 left-0"
                style={{
                  width: `${pct}%`,
                  backgroundColor: cycle.color,
                  opacity: 0.8,
                  borderRadius: "1px",
                }}
              />
              <span
                className="absolute"
                style={{
                  left: `${pct}%`,
                  top: "-4px",
                  height: "14px",
                  width: "1px",
                  marginLeft: "-0.5px",
                  backgroundColor: "var(--color-signal)",
                }}
              />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="datum text-[0.625rem] text-bone-faint">
                {cycle.timeframe}
              </span>
              <span className="datum text-[0.625rem] text-bone-faint">
                {pct}% · {cycle.phase}
              </span>
            </div>
          </div>

          <p className="mt-5 text-[1.0625rem] leading-relaxed text-bone">
            {cycle.theme}
          </p>

          {/* What the bar above is actually measuring. */}
          <p className="mt-4 border-t border-rule-faint pt-4 text-[0.9375rem] leading-relaxed text-bone-faint">
            {cycle.reading}
          </p>

          {cycle.catalyst ? (
            <div className="mt-4 border-t border-rule-faint pt-4">
              <span className="datum text-[0.625rem] tracking-[0.14em] text-bone-faint">
                Catalyst ·{" "}
                <span className="text-bone-soft">{cycle.catalyst}</span>
              </span>
            </div>
          ) : null}
        </div>

        {/* Body */}
        <div className="space-y-7 px-6 py-7">
          {cycle.sections.map((section) => {
            const risk = RISK_LABELS.has(section.label);
            const mark = risk ? "var(--color-ember)" : cycle.color;
            return (
              <section key={section.label}>
                <p
                  className={`eyebrow mb-3 ${risk ? "text-ember" : "text-patina"}`}
                >
                  {section.label}
                </p>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span
                        className="mt-[0.6em] h-[3px] w-[3px] shrink-0"
                        style={{ backgroundColor: mark, opacity: 0.8 }}
                      />
                      <span className="text-[0.9375rem] leading-relaxed text-bone">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          {/* A dated example of the phase currently in force. */}
          {cycle.phaseContext ? (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-1 text-patina">Phase Context</p>
              <p className="datum mb-3 text-[0.6875rem] text-bone-faint">
                {cycle.phaseContext.period}
              </p>
              <ul className="space-y-2">
                {cycle.phaseContext.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      className="mt-[0.6em] h-[3px] w-[3px] shrink-0"
                      style={{ backgroundColor: cycle.color, opacity: 0.8 }}
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-bone-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Structural passages retain their existing same-sign historical comparison. */}
          {cycle.layer === "Structural" && cycle.previousCycle ? (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-1 text-patina">Last time</p>
              <p className="datum mb-3 text-[0.6875rem] text-bone-faint">
                {cycle.previousCycle.period}
              </p>
              <ul className="space-y-2">
                {cycle.previousCycle.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      className="mt-[0.6em] h-[3px] w-[3px] shrink-0"
                      style={{ backgroundColor: cycle.color, opacity: 0.8 }}
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-bone-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/*
                The passages before the previous one. Set quieter and dated on
                their own line, because the further back a parallel goes the
                more it is a rhyme and the less it is evidence.
              */}
              {cycle.previousCycle.earlier?.length ? (
                <ul className="mt-5 space-y-3 border-t border-rule-faint pt-4">
                  {cycle.previousCycle.earlier.map((passage) => (
                    <li key={passage.period}>
                      <p className="datum text-[0.625rem] text-bone-faint">
                        {passage.period}
                      </p>
                      <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-bone-faint">
                        {passage.note}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ) : null}

          {/* The aspect ladder, for the cycles read by milestone rather than sign */}
          {cycle.milestones ? (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-3 text-patina">Aspects in this cycle</p>
              <ul>
                {cycle.milestones.map((m) => (
                  <li
                    key={m.year}
                    className="border-b border-rule-faint py-3 last:border-b-0"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="flex items-baseline gap-2">
                        <span
                          className={`text-[0.9375rem] ${m.current ? "text-bone" : "text-bone-faint"
                            }`}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {m.label}
                        </span>
                        {m.angle ? (
                          <span className="datum text-[0.625rem] text-bone-faint">
                            {m.angle}
                          </span>
                        ) : null}
                      </span>
                      <span
                        className="datum shrink-0 text-[0.6875rem]"
                        style={{
                          color: m.current
                            ? "var(--color-signal)"
                            : "var(--color-bone-faint)",
                        }}
                      >
                        {m.year}
                      </span>
                    </div>
                    {m.meaning ? (
                      <p
                        className={`mt-1 text-[0.875rem] leading-snug ${m.current ? "text-bone-soft" : "text-bone-faint"
                          }`}
                      >
                        {m.meaning}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
              <p className="datum mt-3 text-[0.5625rem] tracking-[0.14em] text-bone-faint">
                Marked year is the stretch we are in now
              </p>
            </section>
          ) : null}
        </div>

        {/* Footer rule */}
        <div className="mt-auto">
          <div
            className="h-[3px] w-full"
            style={{ background: cycle.color, opacity: 0.35 }}
          />
        </div>
      </div>
    </>
  );
}
