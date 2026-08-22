"use client";

import { useEffect } from "react";
import { useScoring } from "@/components/scoring-context";
import { PRESETS, copyScoring, type ScoringConfig } from "@/lib/scoring";

/**
 * The scoring constants, editable.
 *
 * Every field writes straight through to the live config, so a chart behind
 * this panel re-scores as the number changes. That immediacy is the point: the
 * arguments these numbers encode — does a malefic tenant count, are the outer
 * planets really mildly harmful — are settled by watching a chart you know
 * well move, not by reasoning about the constant in the abstract.
 *
 * Rows are generated from the config object rather than listed by hand, so a
 * constant added to `lib/scoring` shows up here without a second edit.
 */

function Num({
  label,
  value,
  onChange,
  step = 0.05,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
}) {
  return (
    <label className="flex items-baseline justify-between gap-3 px-4 py-1.5">
      <span className="text-[0.875rem] text-bone-soft">{label}</span>
      <input
        type="number"
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) onChange(n);
        }}
        className="datum w-20 shrink-0 border border-rule bg-void px-2 py-1 text-right text-[0.75rem] text-bone focus:border-patina focus:outline-none"
      />
    </label>
  );
}

function Table({
  title,
  aside,
  entries,
  onChange,
  step,
}: {
  title: string;
  aside?: string;
  entries: [string, number][];
  onChange: (key: string, v: number) => void;
  step?: number;
}) {
  return (
    <section>
      <div className="mb-2 flex items-baseline justify-between border-b border-rule-faint pb-1.5">
        <h4 className="eyebrow">{title}</h4>
        {aside ? (
          <span className="datum text-[0.5625rem] tracking-[0.14em] text-bone-faint uppercase">
            {aside}
          </span>
        ) : null}
      </div>
      <div className="divide-y divide-rule-faint border border-rule">
        {entries.map(([k, v]) => (
          <Num
            key={k}
            label={k}
            value={v}
            step={step}
            onChange={(n) => onChange(k, n)}
          />
        ))}
      </div>
    </section>
  );
}

export default function ScoringEditor({ onClose }: { onClose: () => void }) {
  const { config, preset, edited, applyPreset, update, reset } = useScoring();

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  /** Every edit goes through a copy — the presets must stay pristine. */
  const edit = (fn: (draft: ScoringConfig) => void) => {
    const draft = copyScoring(config);
    fn(draft);
    update(draft);
  };

  const e = config.ease;
  const w = config.weight;
  const shareTotal = e.share.aspects + e.share.dignity + e.share.tenancy;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-void/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Scoring"
        className="fixed top-1/2 left-1/2 z-[70] flex max-h-[86vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col border border-rule bg-surface shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-rule px-6 py-4">
          <div>
            <p className="datum text-[0.5625rem] tracking-[0.3em] text-bone-faint uppercase">
              Houses
            </p>
            <h2 className="inscription mt-0.5 text-[0.9375rem] text-bone">
              Scoring
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {edited ? (
              <button
                type="button"
                onClick={reset}
                className="datum text-[0.625rem] tracking-[0.18em] text-ember uppercase transition-colors hover:text-bone"
              >
                Reset
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
            >
              Done
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
          {/* Presets */}
          <section>
            <div className="mb-3 flex items-baseline justify-between border-b border-rule-faint pb-2">
              <h3 className="eyebrow text-patina">Presets</h3>
              <span className="datum text-[0.5625rem] tracking-[0.14em] text-bone-faint uppercase">
                {edited ? "edited" : "unmodified"}
              </span>
            </div>
            <div className="space-y-px">
              {PRESETS.map((p) => {
                const active = config.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p.id)}
                    aria-pressed={active}
                    className={`block w-full border-l-2 px-4 py-3 text-left transition-colors ${active
                      ? "border-patina bg-surface-alt"
                      : "border-rule hover:bg-surface-alt"
                      }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span
                        className={`datum text-[0.625rem] tracking-[0.18em] uppercase ${active ? "text-patina" : "text-bone-soft"
                          }`}
                      >
                        {p.label}
                      </span>
                      {active && edited ? (
                        <span className="datum text-[0.5625rem] tracking-[0.14em] text-ember uppercase">
                          modified
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-[0.875rem] leading-snug text-bone-faint">
                      {p.note}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Rulership — the largest single swing available */}
          <section>
            <div className="mb-3 flex items-baseline justify-between border-b border-rule-faint pb-2">
              <h3 className="eyebrow text-patina">Rulership</h3>
              <span className="datum text-[0.5625rem] tracking-[0.14em] text-bone-faint uppercase">
                which body answers for a cusp
              </span>
            </div>
            <p className="mb-3 text-[0.875rem] leading-relaxed text-bone-soft">
              Two thirds of a house&rsquo;s weight comes from its ruler, so this
              moves more than any coefficient below. Modern gives Scorpio to
              Pluto, Aquarius to Uranus and Pisces to Neptune; traditional keeps
              all three with the visible bodies — the same table dignity is
              already judged on.
            </p>
            <div className="flex gap-px">
              {(["modern", "traditional"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => edit((d) => void (d.rulership = r))}
                  aria-pressed={config.rulership === r}
                  className={`flex-1 border px-4 py-2.5 transition-colors ${config.rulership === r
                    ? "border-patina bg-surface-alt text-patina"
                    : "border-rule text-bone-soft hover:bg-surface-alt"
                    }`}
                >
                  <span className="datum text-[0.625rem] tracking-[0.18em] uppercase">
                    {r}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Ease shares — the argument that matters most */}
          <section>
            <div className="mb-3 flex items-baseline justify-between border-b border-rule-faint pb-2">
              <h3 className="eyebrow text-patina">Ease · shares</h3>
              <span className="datum text-[0.5625rem] tracking-[0.14em] text-bone-faint uppercase">
                sum {shareTotal.toFixed(2)}
              </span>
            </div>
            <p className="mb-3 text-[0.875rem] leading-relaxed text-bone-soft">
              How the three questions divide a house&rsquo;s ease: what its
              bodies are wired to, what shape their signs leave them in, and who
              lives there. Set tenancy to 0 to remove it entirely. Only the
              shares that apply to a house are counted, so an empty house is not
              docked for a tenancy it cannot have.
            </p>
            <div className="divide-y divide-rule-faint border border-rule">
              <Num
                label="Aspects"
                value={e.share.aspects}
                onChange={(v) => edit((d) => void (d.ease.share.aspects = v))}
              />
              <Num
                label="Dignity"
                value={e.share.dignity}
                onChange={(v) => edit((d) => void (d.ease.share.dignity = v))}
              />
              <Num
                label="Tenancy"
                value={e.share.tenancy}
                onChange={(v) => edit((d) => void (d.ease.share.tenancy = v))}
              />
            </div>

            <div className="mt-4 divide-y divide-rule-faint border border-rule">
              <Num
                label="Temper malefics by dignity"
                value={e.temperMalefics}
                min={0}
                max={1}
                onChange={(v) => edit((d) => void (d.ease.temperMalefics = v))}
              />
              <Num
                label="Ruler that also lives there"
                value={e.rulerIsTenantReinforcement}
                min={1}
                max={3}
                step={0.25}
                onChange={(v) =>
                  edit((d) => void (d.ease.rulerIsTenantReinforcement = v))
                }
              />
              <Num
                label="Band threshold"
                value={e.band}
                onChange={(v) => edit((d) => void (d.ease.band = v))}
              />
              <Num
                label="Sparse below (evidence)"
                value={e.sparseBelow}
                step={1}
                onChange={(v) => edit((d) => void (d.ease.sparseBelow = v))}
              />
            </div>
          </section>

          <Table
            title="Ease · nature"
            aside="benefic / malefic"
            entries={Object.entries(e.nature)}
            onChange={(k, v) => edit((d) => void (d.ease.nature[k] = v))}
          />

          <Table
            title="Ease · aspect character"
            aside="−1 hardest · +1 easiest"
            entries={Object.entries(e.aspect)}
            onChange={(k, v) => edit((d) => void (d.ease.aspect[k] = v))}
          />

          <Table
            title="Ease · dignity"
            entries={Object.entries(e.dignity)}
            onChange={(k, v) =>
              edit(
                (d) =>
                  void (d.ease.dignity[k as keyof typeof d.ease.dignity] = v),
              )
            }
          />

          <Table
            title="Weight · bodies"
            aside="occupancy"
            entries={Object.entries(w.body)}
            step={1}
            onChange={(k, v) => edit((d) => void (d.weight.body[k] = v))}
          />

          <Table
            title="Weight · aspects"
            aside="ruler activity"
            entries={Object.entries(w.aspect)}
            step={0.25}
            onChange={(k, v) => edit((d) => void (d.weight.aspect[k] = v))}
          />

          <section>
            <div className="mb-2 flex items-baseline justify-between border-b border-rule-faint pb-1.5">
              <h4 className="eyebrow">Weight · scalars</h4>
            </div>
            <div className="divide-y divide-rule-faint border border-rule">
              <Num
                label="Unnamed aspect default"
                value={w.aspectDefault}
                step={0.25}
                onChange={(v) => edit((d) => void (d.weight.aspectDefault = v))}
              />
              <Num
                label="Angular house"
                value={w.placement.angular}
                step={1}
                onChange={(v) => edit((d) => void (d.weight.placement.angular = v))}
              />
              <Num
                label="Succedent house"
                value={w.placement.succedent}
                step={1}
                onChange={(v) =>
                  edit((d) => void (d.weight.placement.succedent = v))
                }
              />
              <Num
                label="Cadent house"
                value={w.placement.cadent}
                step={1}
                onChange={(v) => edit((d) => void (d.weight.placement.cadent = v))}
              />
              <Num
                label="Aspect orb limit"
                value={w.orbLimit}
                step={1}
                onChange={(v) => edit((d) => void (d.weight.orbLimit = v))}
              />
              <Num
                label="Ruler activity cap"
                value={w.activityCap}
                step={1}
                onChange={(v) => edit((d) => void (d.weight.activityCap = v))}
              />
              <Num
                label="Mixed-mode margin"
                value={w.mixedMargin}
                onChange={(v) => edit((d) => void (d.weight.mixedMargin = v))}
              />
            </div>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-bone-faint">
              The activity cap is worth watching: when several houses sit
              against it, that component has stopped telling them apart and the
              ranking is really being decided by occupancy and ruler placement.
            </p>
          </section>

          <p className="text-[0.75rem] leading-relaxed text-bone-faint">
            Changes apply immediately and are kept in this browser. They do not
            alter the chart — only the convention it is being read by.
            {preset ? ` Started from “${preset.label}”.` : ""}
          </p>
        </div>
      </div>
    </>
  );
}
