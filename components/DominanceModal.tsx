"use client";

import { useEffect } from "react";

interface Props {
  onClose: () => void;
}

const BODY_WEIGHTS = [
  { body: "Sun / Moon", weight: "10" },
  { body: "Mercury / Venus / Mars", weight: "8" },
  { body: "Jupiter / Saturn", weight: "6" },
  { body: "Uranus / Neptune / Pluto", weight: "4" },
  { body: "Nodes / Chiron / Lilith", weight: "0" },
];

const ASPECT_WEIGHTS = [
  { type: "Conjunction", weight: "3.0" },
  { type: "Opposition", weight: "2.5" },
  { type: "Square", weight: "2.5" },
  { type: "Trine", weight: "2.0" },
  { type: "Sextile", weight: "1.5" },
];

const PLACEMENT_WEIGHTS = [
  { location: "Angular house (1, 4, 7, 10)", weight: "8" },
  { location: "Succedent house (2, 5, 8, 11)", weight: "5" },
  { location: "Cadent house (3, 6, 9, 12)", weight: "3" },
  { location: "+ conjunct an angle (≤ 5°)", weight: "+4 – 5" },
  { location: "+ close to an angle (≤ 8°)", weight: "+2 – 3" },
];

export default function DominanceModal({ onClose }: Props) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-void/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Dominance Calculation"
        className="fixed left-1/2 top-1/2 z-50 flex max-h-[82vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col border border-rule bg-surface shadow-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-rule px-6 py-4">
          <div>
            <p className="datum text-[0.5625rem] uppercase tracking-[0.3em] text-bone-faint">
              Houses
            </p>
            <h2 className="inscription mt-0.5 text-[0.9375rem] text-bone">
              Dominance Calculation
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="datum text-[0.625rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-bone"
          >
            Done
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* Overview */}
          <p className="text-[1.0625rem] leading-relaxed text-bone">
            Each house gets a single score made of three independent parts.
            Keeping them separate is the point — a house can be loud in three
            entirely different ways, and they do not feel remotely alike.
          </p>

          <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
            Score = <span className="text-patina">Occupancy</span> + <span className="text-patina">Ruler Strength</span> + <span className="text-patina">Ruler Activity</span>.
            Houses are then ranked 1–12; rank 1 is the most dominant.
          </p>

          {/* Occupancy */}
          <section>
            <div className="mb-3 flex items-baseline justify-between border-b border-rule-faint pb-2">
              <h3 className="eyebrow text-patina">Occupancy</h3>
              <span className="datum text-[0.625rem] text-bone-faint">bodies sitting in the house</span>
            </div>
            <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
              Each body in a house adds its weight, but with diminishing
              returns so a stellium does not simply win every chart it
              appears in. Bodies beyond the fifth contribute 20 % of face value.
            </p>

            <div className="mb-4">
              <p className="datum mb-2 text-[0.5625rem] uppercase tracking-[0.2em] text-bone-faint">Body weights</p>
              <div className="divide-y divide-rule-faint border border-rule">
                {BODY_WEIGHTS.map(({ body, weight }) => (
                  <div key={body} className="flex items-baseline justify-between px-4 py-2">
                    <span className="text-[0.875rem] text-bone-soft">{body}</span>
                    <span className="datum text-[0.75rem] text-bone">{weight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="datum mb-2 text-[0.5625rem] uppercase tracking-[0.2em] text-bone-faint">Diminishing multipliers by position</p>
              <div className="flex gap-3">
                {["100 %", "70 %", "50 %", "30 %", "30 %", "20 %…"].map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="datum text-[0.75rem] text-bone">{v}</span>
                    <span className="datum text-[0.5625rem] text-bone-faint">{i + 1}{i === 5 ? "+" : ""}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[0.875rem] leading-relaxed text-bone-soft italic">
              Stellium bonus: +3 for 3 weighted bodies, +5 for 4, +7 for 5 or more.
            </p>
          </section>

          {/* Ruler Strength */}
          <section>
            <div className="mb-3 flex items-baseline justify-between border-b border-rule-faint pb-2">
              <h3 className="eyebrow text-patina">Ruler Strength</h3>
              <span className="datum text-[0.625rem] text-bone-faint">where the ruler is placed</span>
            </div>
            <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
              The ruler of the sign on the cusp carries the house wherever it
              goes. A ruler sitting in an angular house is prominent; one
              sitting on a chart angle (ASC, MC, DSC, IC) is amplified further.
            </p>

            <div className="border border-rule divide-y divide-rule-faint">
              {PLACEMENT_WEIGHTS.map(({ location, weight }) => (
                <div key={location} className="flex items-baseline justify-between px-4 py-2">
                  <span className="text-[0.875rem] text-bone-soft">{location}</span>
                  <span className="datum text-[0.75rem] text-bone">{weight}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Ruler Activity */}
          <section>
            <div className="mb-3 flex items-baseline justify-between border-b border-rule-faint pb-2">
              <h3 className="eyebrow text-patina">Ruler Activity</h3>
              <span className="datum text-[0.625rem] text-bone-faint">how wired-in the ruler is · capped at 15</span>
            </div>
            <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
              A ruler in constant dialogue with the rest of the chart makes its
              house constantly present. Every aspect within 6° of orb counts;
              tighter orbs and heavier aspect types score more.
            </p>

            <div className="mb-4 border border-rule divide-y divide-rule-faint">
              {ASPECT_WEIGHTS.map(({ type, weight }) => (
                <div key={type} className="flex items-baseline justify-between px-4 py-2">
                  <span className="text-[0.875rem] text-bone-soft">{type}</span>
                  <span className="datum text-[0.75rem] text-bone">{weight}</span>
                </div>
              ))}
            </div>

            <p className="text-[0.875rem] leading-relaxed text-bone-soft italic">
              Orb refinement: each degree inside 6° adds 0.3. Aspects to the
              Sun or Moon within 4° add a further +2.
            </p>
          </section>

          {/* Modes */}
          <section>
            <div className="mb-3 flex items-baseline justify-between border-b border-rule-faint pb-2">
              <h3 className="eyebrow">Dominance Mode</h3>
              <span className="datum text-[0.625rem] text-bone-faint">how the score was earned</span>
            </div>
            <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
              When the highest component leads by more than 15 % of its own
              value, it names the mode. If two components are within that
              margin, the house is called mixed — loud from more than one
              direction at once.
            </p>
            <div className="border border-rule divide-y divide-rule-faint">
              {[
                { mode: "Concentrated", note: "Loud because bodies are sitting in it." },
                { mode: "Anchored", note: "Loud because its ruler is strongly placed." },
                { mode: "Networked", note: "Loud because its ruler is wired to everything." },
                { mode: "Mixed", note: "Loud from more than one direction at once." },
              ].map(({ mode, note }) => (
                <div key={mode} className="flex flex-col gap-0.5 px-4 py-2.5">
                  <span className="datum text-[0.625rem] uppercase tracking-[0.18em] text-patina-dim">{mode}</span>
                  <span className="text-[0.875rem] text-bone-soft">{note}</span>
                </div>
              ))}
            </div>
          </section>

          <p className="text-[0.75rem] leading-relaxed text-bone-faint">
            Ported from arc's house-dominance calculator. Same weights and
            arithmetic — scores match between the two apps.
          </p>

        </div>
      </div>
    </>
  );
}
