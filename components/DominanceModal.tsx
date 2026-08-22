"use client";

import { useEffect } from "react";
import { MODE_GLOSS, type DominanceMode } from "@/lib/dominance";
import { QUADRANT } from "@/lib/ease";
import { useScoring } from "@/components/scoring-context";

interface Props {
  onClose: () => void;
}

export default function DominanceModal({ onClose }: Props) {
  // The tables are editable at runtime, so this has to show what is actually
  // in force. An explainer quoting the shipped defaults while the page scores
  // by something else would be worse than no explainer.
  const { config, preset, edited } = useScoring();
  const w = config.weight;
  const e = config.ease;

  const bodyWeights = Object.entries(w.body);
  const aspectWeights = Object.entries(w.aspect);
  const placementWeights: [string, string][] = [
    ["Angular house (1, 4, 7, 10)", `${w.placement.angular}`],
    ["Succedent house (2, 5, 8, 11)", `${w.placement.succedent}`],
    ["Cadent house (3, 6, 9, 12)", `${w.placement.cadent}`],
    ...w.angleBonus.map(
      (b) =>
        [
          `+ within ${b.within}° of an angle`,
          `+${b.angular} – ${b.otherwise}`,
        ] as [string, string],
    ),
  ];
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
        className="fixed inset-0 z-[60] bg-void/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Dominance Calculation"
        className="fixed left-1/2 top-1/2 z-[70] flex max-h-[82vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col border border-rule bg-surface shadow-2xl"
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
            {/* The tables below are editable, so name the convention in force —
                an explainer that looks identical under every preset would be
                worse than none. */}
            <p className="datum mt-1 text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase">
              {preset ? preset.label : config.label}
              {edited ? " · modified" : ""}
            </p>
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
              appears in. Bodies beyond the sixth contribute 20 % of face value.
            </p>

            <div className="mb-4">
              <p className="datum mb-2 text-[0.5625rem] uppercase tracking-[0.2em] text-bone-faint">Body weights</p>
              <div className="divide-y divide-rule-faint border border-rule">
                {bodyWeights.map(([body, weight]) => (
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
                {["100 %", "70 %", "50 %", "30 %", "30 %", "30 %", "20 %"].map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="datum text-[0.75rem] text-bone">{v}</span>
                    <span className="datum text-[0.5625rem] text-bone-faint">{i + 1}{i === 6 ? "+" : ""}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[0.875rem] leading-relaxed text-bone-soft italic">
              Stellium bonus: {w.stelliumBonus.map(([c, b]) => `+${b} for ${c}`).reverse().join(", ")} or more weighted bodies.
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
              A ruler that is not in the chart at all scores nothing here.
            </p>

            <div className="border border-rule divide-y divide-rule-faint">
              {placementWeights.map(([location, weight]) => (
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
              <span className="datum text-[0.625rem] text-bone-faint">how wired-in the ruler is · capped at {w.activityCap}</span>
            </div>
            <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
              A ruler in constant dialogue with the rest of the chart makes its
              house constantly present. Every aspect within {w.orbLimit}° of orb counts;
              tighter orbs and heavier aspect types score more.
            </p>

            <div className="mb-4 border border-rule divide-y divide-rule-faint">
              {aspectWeights.map(([type, weight]) => (
                <div key={type} className="flex items-baseline justify-between px-4 py-2">
                  <span className="text-[0.875rem] capitalize text-bone-soft">{type}</span>
                  <span className="datum text-[0.75rem] text-bone">{weight}</span>
                </div>
              ))}
            </div>

            <p className="text-[0.875rem] leading-relaxed text-bone-soft italic">
              Orb refinement: each degree inside {w.orbLimit}° adds {w.orbTightness}. Aspects to the
              Sun or Moon within {w.luminary.within}° add a further +{w.luminary.bonus}. Anything outside these
              five types counts as {w.aspectDefault}.
            </p>
          </section>

          {/* Modes */}
          <section>
            <div className="mb-3 flex items-baseline justify-between border-b border-rule-faint pb-2">
              <h3 className="eyebrow">Dominance Mode</h3>
              <span className="datum text-[0.625rem] text-bone-faint">how the score was earned</span>
            </div>
            <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
              When the highest component leads by more than {(w.mixedMargin * 100).toFixed(0)} % of its own
              value, it names the mode. If two components are within that
              margin, the house is called mixed — no one of them is carrying it.
            </p>
            <div className="border border-rule divide-y divide-rule-faint">
              {(Object.keys(MODE_GLOSS) as DominanceMode[]).map((mode) => (
                <div key={mode} className="flex flex-col gap-0.5 px-4 py-2.5">
                  <span className="datum text-[0.625rem] uppercase tracking-[0.18em] text-patina-dim">{mode}</span>
                  <span className="text-[0.875rem] text-bone-soft">{MODE_GLOSS[mode]}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[0.875rem] leading-relaxed text-bone-soft italic">
              The mode names which component led — never how prominent the house
              is. A house can be last of the twelve and still be led by its
              ruler&rsquo;s placement, so the wording on each card is set by the
              house&rsquo;s rank as well as its mode.
            </p>
          </section>

          {/* Ease — the second axis */}
          <section>
            <div className="mb-3 flex items-baseline justify-between border-b border-rule-faint pb-2">
              <h3 className="eyebrow text-patina">Ease</h3>
              <span className="datum text-[0.625rem] text-bone-faint">the second axis · −1 to +1</span>
            </div>
            <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
              Weight is deliberately valence-free: it counts how much of the
              chart runs through a house and never asks whether that is
              pleasant. Occupancy is raw body weight, and ruler strength never
              inspects the ruler&rsquo;s sign at all — a ruler in fall scores
              exactly what a ruler in domicile scores. Ease answers only the
              question weight refuses, and is kept separate so neither can
              contaminate the other.
            </p>
            <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
              It reads a house through the bodies standing in it and the body
              that rules it, from three sources: the character of their aspects
              ({(e.share.aspects * 100).toFixed(0)} %), the dignity of their
              signs ({(e.share.dignity * 100).toFixed(0)} %), and tenancy
              ({(e.share.tenancy * 100).toFixed(0)} %) — who actually lives
              there, by nature, with malefics blunted when the sign treats them
              well. Only the components a house can supply are counted, so an
              empty house is not docked for a tenancy it cannot have. Past
              ±{e.band} a house is called one way or the other.
            </p>

            <div className="mb-4">
              <p className="datum mb-2 text-[0.5625rem] uppercase tracking-[0.2em] text-bone-faint">Aspect character</p>
              <div className="divide-y divide-rule-faint border border-rule">
                {Object.entries(e.aspect).map(([type, v]) => (
                  <div key={type} className="flex items-baseline justify-between px-4 py-2">
                    <span className="text-[0.875rem] capitalize text-bone-soft">{type}</span>
                    <span className={`datum text-[0.75rem] ${v > 0 ? "text-patina" : v < 0 ? "text-ember" : "text-bone-faint"}`}>
                      {v > 0 ? "+" : ""}{v.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-bone-soft italic">
                A conjunction is 0 because it has no character of its own — it
                takes it from the body it joins, through the benefic/malefic
                table. Unlike the weight table, every type the ephemeris emits
                is named here rather than falling through to a default.
              </p>
            </div>

            <div className="mb-4 grid gap-px bg-rule sm:grid-cols-2">
              <div className="bg-void px-4 py-3">
                <p className="datum mb-2 text-[0.5625rem] uppercase tracking-[0.2em] text-bone-faint">Dignity</p>
                {Object.entries(e.dignity).map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between py-1">
                    <span className="text-[0.875rem] text-bone-soft">{k}</span>
                    <span className="datum text-[0.75rem] text-bone">{v > 0 ? "+" : ""}{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-void px-4 py-3">
                <p className="datum mb-2 text-[0.5625rem] uppercase tracking-[0.2em] text-bone-faint">Benefic / malefic</p>
                {Object.entries(e.nature).filter(([, v]) => v !== 0).map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between py-1">
                    <span className="text-[0.875rem] text-bone-soft">{k}</span>
                    <span className="datum text-[0.75rem] text-bone">{v > 0 ? "+" : ""}{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mb-3 text-[0.9375rem] leading-relaxed text-bone-soft">
              Crossed with weight, the two axes give four corners worth naming.
              The opposites are the diagonals: Millstone against Clear, Engine
              against Snag. Millstone and Snag sit at the same end of Ease and
              differ only in how much rides on them — Snag is the one no single
              ranking can show.
            </p>
            <div className="border border-rule divide-y divide-rule-faint">
              {(["engine", "millstone", "clear", "snag"] as const).map((q) => (
                <div key={q} className="flex flex-col gap-0.5 px-4 py-2.5">
                  <span className="datum text-[0.625rem] uppercase tracking-[0.18em] text-patina-dim">
                    {QUADRANT[q].label} <span className="text-bone-faint">· {QUADRANT[q].coords}</span>
                  </span>
                  <span className="text-[0.875rem] text-bone-soft">{QUADRANT[q].gloss}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-bone-soft italic">
              A house with too little to go on is called sparse rather than
              balanced: a mean near zero can mean a house is pulled hard in both
              directions at once or that almost nothing touches it, and those
              are opposite readings. Evidence counts all three components, not
              aspects alone — a domiciled planet sitting in a house is a reading
              even if nothing aspects it.
            </p>
          </section>

          {/* Reading the rank */}
          <section>
            <div className="mb-3 flex items-baseline justify-between border-b border-rule-faint pb-2">
              <h3 className="eyebrow">Reading The Rank</h3>
              <span className="datum text-[0.625rem] text-bone-faint">an ordinal over a continuous score</span>
            </div>
            <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
              Rank is just the twelve scores in order, so it hides how far apart
              they are. Charts usually separate into a few clear leaders and
              then a pack within a point or two of each other — and inside that
              pack the difference between 7th and 11th is noise, not a finding.
              The scale under each house&rsquo;s weight plots all twelve, so the
              gaps are visible rather than implied.
            </p>
          </section>

          <p className="text-[0.75rem] leading-relaxed text-bone-faint">
            Ported from arc&rsquo;s house-dominance calculator. Same weights and
            arithmetic — scores match between the two apps.
          </p>

        </div>
      </div>
    </>
  );
}
