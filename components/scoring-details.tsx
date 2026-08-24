"use client";

import { useEffect, useState } from "react";
import { MODE_GLOSS, type DominanceMode } from "@/lib/dominance";
import { QUADRANT, easePoints } from "@/lib/ease";
import { WEIGHT_AXIS_MAX, WEIGHT_HEAVY_ABOVE } from "@/lib/scoring";
import { useScoring } from "@/components/scoring-context";

/**
 * What the two scores are made of, in force right now.
 *
 * Every table here is read from the live config rather than restated, because
 * the constants are editable: an explainer quoting the shipped defaults while
 * the page scores by something else would be worse than no explainer at all.
 *
 * Tabbed because it had grown to six sections and a reader looking up one
 * number had to scroll past five they were not asking about.
 */

type Tab = "weight" | "ease" | "corners" | "reading";

const TABS: { id: Tab; label: string; aside: string }[] = [
  { id: "weight", label: "Weight", aside: "how much runs here" },
  { id: "ease", label: "Ease", aside: "flow or grind" },
  { id: "corners", label: "Corners", aside: "the two crossed" },
  { id: "reading", label: "Reading", aside: "what the numbers are not" },
];

/** Aspect and dignity keys are lower-case in the tables; sentences are not. */
function sentenceCase(v: string): string {
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-4 py-2">
      <span className="text-[0.875rem] text-bone-soft">{label}</span>
      <span className="datum shrink-0 text-[0.75rem] text-bone">{value}</span>
    </div>
  );
}

function Table({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <p className="datum text-[0.5625rem] tracking-[0.2em] text-bone-faint uppercase">
          {title}
        </p>
        {aside ? (
          <p className="datum text-[0.5625rem] tracking-[0.14em] text-bone-faint uppercase">
            {aside}
          </p>
        ) : null}
      </div>
      <div className="divide-y divide-rule-faint border border-rule">
        {children}
      </div>
    </div>
  );
}

function Section({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between gap-4 border-b border-rule-faint pb-2">
        <h3 className="eyebrow text-patina">{title}</h3>
        {aside ? (
          <span className="datum text-[0.625rem] text-bone-faint">{aside}</span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default function ScoringDetails({ onClose }: { onClose: () => void }) {
  const { config, preset, edited } = useScoring();
  const [tab, setTab] = useState<Tab>("weight");

  const w = config.weight;
  const e = config.ease;

  useEffect(() => {
    const fn = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

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
        aria-label="Scoring Details"
        className="fixed top-1/2 left-1/2 z-[70] flex max-h-[90vh] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col border border-rule bg-surface shadow-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-6 border-b border-rule px-6 py-4">
          <div>
            <p className="datum text-[0.5625rem] tracking-[0.3em] text-bone-faint uppercase">
              Houses
            </p>
            <h2 className="inscription mt-0.5 text-[0.9375rem] text-bone">
              Scoring Details
            </h2>
            <p className="datum mt-1 text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase">
              {preset ? preset.label : config.label}
              {edited ? " · modified" : ""} · {config.rulership} rulership
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="datum shrink-0 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
          >
            Done
          </button>
        </div>

        {/* Pinned: the one sentence that makes the tabs make sense. */}
        <div className="shrink-0 border-b border-rule px-6 py-4">
          <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
            Two independent measures. <span className="text-patina">Weight</span>{" "}
            is how much of the chart runs through a house;{" "}
            <span className="text-patina">Ease</span> is whether what runs there
            flows or grinds. Neither implies the other, and a high score in one
            says nothing about the other.
          </p>
        </div>

        <div className="flex shrink-0 gap-px border-b border-rule px-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              className={`flex flex-col gap-0.5 border-b-2 px-5 py-2.5 text-left transition-colors ${tab === t.id
                ? "border-patina text-patina"
                : "border-transparent text-bone-faint hover:text-bone-soft"
                }`}
            >
              <span className="datum text-[0.6875rem] tracking-[0.18em] uppercase">
                {t.label}
              </span>
              <span className="datum text-[0.5625rem] tracking-[0.12em] uppercase opacity-70">
                {t.aside}
              </span>
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
          {tab === "weight" ? (
            <>
              <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
                Score = <span className="text-patina">Occupancy</span> +{" "}
                <span className="text-patina">Ruler Strength</span> +{" "}
                <span className="text-patina">Ruler Activity</span>, on an
                absolute 0 – {WEIGHT_AXIS_MAX} scale so two charts can be held
                side by side. At or above {WEIGHT_HEAVY_ABOVE} a house counts as
                heavy.
              </p>

              <Section title="Occupancy" aside="bodies sitting in the house">
                <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
                  Each body adds its weight, with diminishing returns so a
                  stellium does not simply win every chart it appears in. Bodies
                  past the sixth contribute{" "}
                  {(e.share ? w.diminishingTail : w.diminishingTail) * 100}
                  &nbsp;% of face value.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Table title="Body weights">
                    {Object.entries(w.body).map(([body, v]) => (
                      <Row key={body} label={body} value={`${v}`} />
                    ))}
                  </Table>
                  <div className="space-y-4">
                    <Table title="Diminishing by position">
                      {w.diminishing.map((v, i) => (
                        <Row
                          key={i}
                          label={`${i + 1}${i === w.diminishing.length - 1 ? "" : ""}`}
                          value={`${Math.round(v * 100)} %`}
                        />
                      ))}
                      <Row
                        label={`${w.diminishing.length + 1}+`}
                        value={`${Math.round(w.diminishingTail * 100)} %`}
                      />
                    </Table>
                    <Table title="Stellium bonus" aside="weighted bodies">
                      {[...w.stelliumBonus]
                        .sort((a, b) => a[0] - b[0])
                        .map(([count, bonus]) => (
                          <Row
                            key={count}
                            label={`${count} bodies`}
                            value={`+${bonus}`}
                          />
                        ))}
                    </Table>
                  </div>
                </div>
              </Section>

              <Section title="Ruler Strength" aside="where the ruler is placed">
                <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
                  The ruler of the sign on the cusp carries the house wherever it
                  goes. A ruler in an angular house is prominent; one sitting on
                  a chart angle is amplified further. A ruler not in the chart at
                  all scores nothing here. Note this measures{" "}
                  <em>position only</em> — a ruler in fall scores exactly what a
                  ruler in domicile scores, which is what Ease exists to answer.
                </p>
                <Table title="Placement">
                  <Row label="Angular house (1, 4, 7, 10)" value={`${w.placement.angular}`} />
                  <Row label="Succedent house (2, 5, 8, 11)" value={`${w.placement.succedent}`} />
                  <Row label="Cadent house (3, 6, 9, 12)" value={`${w.placement.cadent}`} />
                  {w.angleBonus.map((b) => (
                    <Row
                      key={b.within}
                      label={`+ within ${b.within}° of an angle`}
                      value={`+${b.angular} – ${b.otherwise}`}
                    />
                  ))}
                </Table>
              </Section>

              <Section
                title="Ruler Activity"
                aside={`how wired-in the ruler is · capped at ${w.activityCap}`}
              >
                <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
                  A ruler in constant dialogue with the rest of the chart makes
                  its house constantly present. Every aspect within{" "}
                  {w.orbLimit}° of orb counts, each degree inside that adding{" "}
                  {w.orbTightness}; aspects to the Sun or Moon within{" "}
                  {w.luminary.within}° add a further +{w.luminary.bonus}.
                </p>
                <Table title="Aspect weights" aside={`unlisted types count ${w.aspectDefault}`}>
                  {Object.entries(w.aspect).map(([type, v]) => (
                    <Row key={type} label={sentenceCase(type)} value={`${v}`} />
                  ))}
                </Table>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-bone-faint">
                  Worth watching: when several houses sit against the cap, this
                  component has stopped telling them apart and the ranking is
                  really being decided by occupancy and ruler placement.
                </p>
              </Section>

              <Section title="Dominance Mode" aside="which component led">
                <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
                  When the highest component leads by more than{" "}
                  {(w.mixedMargin * 100).toFixed(0)} % of its own value, it names
                  the mode. Within that margin no one component is carrying the
                  house. The mode says which part led — never how much rides on
                  the house, which is the score itself.
                </p>
                <Table title="Modes">
                  {(Object.keys(MODE_GLOSS) as DominanceMode[]).map((m) => (
                    <Row key={m} label={sentenceCase(m)} value={MODE_GLOSS[m]} />
                  ))}
                </Table>
              </Section>
            </>
          ) : null}

          {tab === "ease" ? (
            <>
              <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
                Weight is deliberately valence-free: occupancy is raw body
                weight, and ruler strength never inspects the ruler&rsquo;s sign.
                Ease answers only the question weight refuses, and is kept
                separate so neither can contaminate the other. It runs{" "}
                −{easePoints(1)} … +{easePoints(1)}, where {easePoints(1)} is
                entirely one way.
              </p>

              <Section title="The three components" aside="they sum to the score">
                <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
                  A house is read through the bodies standing in it and the body
                  that rules it. Each component is a weighted mean in its own
                  right; what is shown on the pages is each one&rsquo;s{" "}
                  <em>contribution</em>, share already applied, so the three add
                  up to the score exactly as weight&rsquo;s three do. Only the
                  components a house can supply are counted, so an empty house is
                  not docked for a tenancy it cannot have.
                </p>
                <Table title="Shares">
                  <Row label="Aspects — what its bodies are wired to" value={`${(e.share.aspects * 100).toFixed(0)} %`} />
                  <Row label="Dignity — what shape their signs leave them in" value={`${(e.share.dignity * 100).toFixed(0)} %`} />
                  <Row label="Tenancy — who actually lives there" value={`${(e.share.tenancy * 100).toFixed(0)} %`} />
                </Table>
              </Section>

              <Section title="Aspect character" aside="−100 hardest · +100 easiest">
                <Table title="By type">
                  {Object.entries(e.aspect).map(([type, v]) => (
                    <Row key={type} label={sentenceCase(type)} value={easePoints(v) > 0 ? `+${easePoints(v)}` : `${easePoints(v)}`} />
                  ))}
                </Table>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-bone-soft italic">
                  A conjunction is 0 because it has no character of its own — the
                  engine takes it from the nature of the body being joined, which
                  is the only honest reading of one. Unlike the weight table,
                  every type the ephemeris emits is named here rather than
                  falling through to a default.
                </p>
              </Section>

              <Section title="Nature and dignity" aside="who is here, and in what shape">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Table title="Benefic / malefic" aside="tenancy">
                    {Object.entries(e.nature)
                      .filter(([, v]) => v !== 0)
                      .map(([body, v]) => (
                        <Row key={body} label={body} value={easePoints(v) > 0 ? `+${easePoints(v)}` : `${easePoints(v)}`} />
                      ))}
                  </Table>
                  <Table title="Dignity">
                    {Object.entries(e.dignity).map(([k, v]) => (
                      <Row key={k} label={k} value={easePoints(v) > 0 ? `+${easePoints(v)}` : `${easePoints(v)}`} />
                    ))}
                  </Table>
                </div>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-bone-soft italic">
                  A malefic in a sign that suits it has{" "}
                  {(e.temperMalefics * 100).toFixed(0)} % of its harm blunted in
                  proportion to that dignity — an exalted Mars is still Mars, but
                  far less of it lands than a Mars in fall. Benefics are left
                  alone, since the dignity component already docks a fallen one.
                  Bodies the tradition never rated are 0 by default; the Modern
                  Psychological preset is where that argument lives.
                </p>
              </Section>

              <Section title="Bands and confidence" aside="when a reading can be given">
                <Table title="Thresholds">
                  <Row label="Called flowing or grinding beyond" value={`±${easePoints(e.band)}`} />
                  <Row label="Called sparse below this much evidence" value={`${e.sparseBelow}`} />
                  <Row label="Ruler that also lives in the house" value={`×${e.rulerIsTenantReinforcement}`} />
                </Table>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-bone-soft italic">
                  Evidence counts all three components, not aspects alone: a
                  domiciled planet sitting in a house is a reading even if
                  nothing aspects it. Sparse and balanced are kept apart because
                  a score near zero can mean a house is pulled hard both ways or
                  that almost nothing touches it, and those are opposite
                  readings. The reinforcement applies to a ruler&rsquo;s aspect
                  and dignity contribution, never to its nature — ruling the room
                  you live in makes your condition more relevant to it, it does
                  not make you more Mars-like.
                </p>
              </Section>

              <Section title="Contact counts" aside="what a net of zero hides">
                <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
                  The score is a net, and a net cannot tell a house nothing
                  touches from a house pulled hard both ways — both land on
                  zero. The easy and hard contact counts separate them without
                  any further arithmetic: nine-and-eight is a house in tension,
                  one-and-one is a house barely spoken to. They are shown on
                  each house&rsquo;s reading and in the plot&rsquo;s tooltip.
                </p>
              </Section>
            </>
          ) : null}

          {tab === "corners" ? (
            <>
              <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
                Crossed, the two axes give four corners worth naming. The names
                encode the ease axis: High Pressure and Friction are plainly the
                same character at different volumes, as are Engine and Comfort.
                The opposites are the <em>diagonals</em> — High Pressure against
                Comfort, Engine against Friction.
              </p>

              <Table title="The four corners">
                {(["engine", "pressure", "comfort", "friction"] as const).map(
                  (q) => (
                    <div key={q} className="flex flex-col gap-0.5 px-4 py-2.5">
                      <span className="datum text-[0.625rem] tracking-[0.18em] text-patina-dim uppercase">
                        {QUADRANT[q].label}{" "}
                        <span className="text-bone-faint">
                          · {QUADRANT[q].coords}
                        </span>
                      </span>
                      <span className="text-[0.875rem] text-bone-soft">
                        {QUADRANT[q].gloss}
                      </span>
                    </div>
                  ),
                )}
              </Table>

              <Table title="The centre line, and no reading">
                {(["steady", "background", "untouched"] as const).map((q) => (
                  <div key={q} className="flex flex-col gap-0.5 px-4 py-2.5">
                    <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-soft uppercase">
                      {QUADRANT[q].label}{" "}
                      <span className="text-bone-faint">
                        · {QUADRANT[q].coords}
                      </span>
                    </span>
                    <span className="text-[0.875rem] text-bone-soft">
                      {QUADRANT[q].gloss}
                    </span>
                  </div>
                ))}
              </Table>
              <p className="text-[0.875rem] leading-relaxed text-bone-soft italic">
                These three are not corners — they are the centre line and the
                cases with too little behind them. A house at ease zero is still
                saying something: a heavy one is doing a great deal of work
                without any of it being characteristic.
              </p>
            </>
          ) : null}

          {tab === "reading" ? (
            <>
              <Section title="Rank is a label, not a finding" aside="an ordinal over a continuous score">
                <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
                  Rank is the twelve scores in order, so it hides how far apart
                  they are. Charts usually separate into a few clear leaders and
                  then a pack within a point or two of each other — and inside
                  that pack the difference between 7th and 11th is noise. Nothing
                  is decided by rank: heavy and light are read off the score
                  against {WEIGHT_HEAVY_ABOVE} on a fixed scale, so a flat chart
                  can honestly show no heavy houses instead of being made to
                  nominate three.
                </p>
              </Section>

              <Section title="Heavy is not loud" aside="what the axis measures">
                <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
                  Weight measures how much of the chart runs through a house, not
                  how visible that is. A heavily emphasised twelfth is
                  structurally central and thoroughly private at the same time,
                  which is why the axis reads light to heavy rather than quiet to
                  loud.
                </p>
              </Section>

              <Section title="A high score is not a good one" aside="neither axis is a verdict">
                <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
                  Weight is silent on whether any of it is pleasant — that is the
                  whole reason Ease exists as a separate axis. And Ease is a
                  qualifier on a question weight has already answered: a house
                  at +45 that carries very little is pleasant and marginal, which
                  is why Comfort&rsquo;s gloss leads with &ldquo;not
                  central&rdquo;.
                </p>
              </Section>

              <p className="text-[0.75rem] leading-relaxed text-bone-faint">
                Every table above is read from the convention in force, not from
                the shipped defaults. Weight is ported from arc&rsquo;s
                house-dominance calculator; ease, tenancy and the corners are
                this app&rsquo;s own.
              </p>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
