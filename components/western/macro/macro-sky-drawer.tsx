"use client";

import { useEffect } from "react";
import { ELEMENT_COLOR } from "@/lib/symbols";
import type { SkyBody } from "@/lib/macro";

const RISK_LABELS = new Set(["Distortion risk"]);

/** 3.42 → "3°25′". Minutes floored, which is how an ephemeris reads. */
function degreeLabel(degree: number): string {
  const whole = Math.floor(degree);
  const minutes = Math.floor((degree - whole) * 60);
  return `${whole}°${String(minutes).padStart(2, "0")}′`;
}

function motionLabel(dailyMotion: number): string {
  const arcMinutes = Math.abs(dailyMotion) * 60;
  return `${arcMinutes.toFixed(2)}′ per day`;
}

export default function MacroSkyDrawer({
  body,
  onClose,
}: {
  body: SkyBody;
  onClose: () => void;
}) {
  useEffect(() => {
    const fn = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
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
        aria-label={`${body.planet} in ${body.sign}`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-rule bg-surface"
      >
        <div className="shrink-0 border-b border-rule px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">Current sky</p>

              <div className="flex items-baseline gap-3">
                <span
                  className="glyph text-[1.75rem] leading-none"
                  style={{ color: body.color }}
                >
                  {body.glyph}
                </span>
                <span
                  className="text-[1.375rem] leading-tight text-bone"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {body.planet}
                </span>
                {body.retrograde ? (
                  <span className="datum text-[0.6875rem] text-ember" title="Retrograde">
                    ℞
                  </span>
                ) : null}
              </div>

              <p className="mt-2 flex items-baseline gap-2">
                <span className="glyph text-[1rem] leading-none text-bone-soft">
                  {body.signGlyph}
                </span>
                <span
                  className="text-[1.0625rem] text-bone-soft"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  in {body.sign}
                </span>
                {body.element ? (
                  <span
                    className="datum text-[0.5625rem] tracking-[0.22em] uppercase"
                    style={{ color: ELEMENT_COLOR[body.element] }}
                  >
                    {body.element}
                  </span>
                ) : null}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 cursor-pointer text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-rule-faint pt-4">
            <span className="datum text-[0.6875rem] text-bone-soft">
              {degreeLabel(body.degree)} {body.sign}
            </span>
            <span className="datum text-[0.625rem] text-bone-faint">
              {body.retrograde ? "apparent retrograde" : "direct"} ·{" "}
              {motionLabel(body.dailyMotion)}
            </span>
            {body.timeframe ? (
              <span className="datum text-[0.625rem] text-bone-faint">
                {body.timeframe}
              </span>
            ) : null}
          </div>

          <p
            className="mt-5 text-[1.1875rem] leading-snug text-bone"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {body.meaning.theme}
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-bone-soft">
            {body.meaning.overview}
          </p>

          <p className="mt-4 border-t border-rule-faint pt-4 text-[0.8125rem] leading-relaxed text-bone-faint">
            This is a collective placement: it describes the shared background
            climate, not how the planet contacts one person&apos;s birth chart.
          </p>
        </div>

        <div className="space-y-7 px-6 py-7">
          {body.meaning.sections.map((section) => {
            const risk = RISK_LABELS.has(section.label);
            const mark = risk ? "var(--color-ember)" : body.color;

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

          {body.retrograde ? (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-3 text-patina">Retrograde emphasis</p>
              <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
                The planet is retracing recently covered degrees from Earth&apos;s
                point of view. On the macro level, themes already introduced
                tend to be revised, contested, or made to reveal unfinished work
                before forward motion resumes.
              </p>
            </section>
          ) : null}
        </div>

        <div className="mt-auto">
          <div
            className="h-[3px] w-full"
            style={{ background: body.color, opacity: 0.35 }}
          />
        </div>
      </div>
    </>
  );
}
