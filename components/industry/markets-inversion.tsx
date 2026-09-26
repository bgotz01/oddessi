// components/industry/markets-inversion.tsx
import { SectionHeading } from "@/components/primitives";
import { BOUNDARY_NOTE, INVERSION_GROUPS, NEXT_ERA, PREVIOUS_ERA, THESIS, type InversionPlacement } from "@/lib/industry/markets-inversion-data";
import { PREDICTIONS, PREDICTIONS_CLOSING, PREDICTION_WINDOW } from "@/lib/industry/markets-inversion-predictions-data";

const LABEL = "datum text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint";

function Placement({ value, dates = false, className = "" }: { value: InversionPlacement; dates?: boolean; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-1.5 ${className}`}>
      <span className="inline-flex items-baseline gap-1.5" style={{ color: value.color }}>
        <span className="glyph" aria-hidden="true">{value.glyph}</span>
        <span>{value.planet} in {value.sign}</span>
        <span className="glyph" aria-hidden="true">{value.symbol}</span>
      </span>
      {dates && <span className="datum text-[0.625rem] text-bone-faint">{value.startYear}–{value.endYear}</span>}
    </span>
  );
}

function EraLabel({ period, hypothesis }: { period: string; hypothesis?: boolean }) {
  return (
    <span className={`datum text-[0.625rem] uppercase tracking-[0.16em] ${hypothesis ? "text-ember" : "text-bone-faint"}`}>
      {period} · {hypothesis ? "Hypothesis" : "Historical"}
    </span>
  );
}

function Chain({ steps, color }: { steps: readonly string[]; color: string }) {
  return (
    <ol className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[1.0625rem] leading-snug text-bone">
      {steps.map((step, index) => (
        <li key={step} className="flex items-baseline gap-x-2">
          {index > 0 && <span className={color} aria-hidden="true">→</span>}
          {step}
        </li>
      ))}
    </ol>
  );
}

type EraReading = InversionPlacement & { keyword: string; dimension: string; points: readonly string[]; test?: string };
type Era = {
  period: string; name: string; status: string; title: string;
  readings: readonly EraReading[];
  hypothesis?: boolean; objection?: string;
};

function EraSection({ era, id, heading }: { era: Era; id: string; heading: string }) {
  return (
    <section aria-labelledby={id} className="mb-16">
      <SectionHeading aside={era.hypothesis ? <span className="text-ember">{era.period} · Hypothesis</span> : era.period}>
        <span id={id}>{heading}</span>
      </SectionHeading>

      <p className={`datum text-[0.625rem] uppercase tracking-[0.16em] ${era.hypothesis ? "text-ember" : "text-patina"}`}>{era.name}</p>
      <h2 className="mt-2 text-[1.75rem] leading-tight text-bone">{era.title}</h2>
      <p className="mt-1 text-base text-bone-faint">{era.status}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {era.readings.map((item) => (
          <article key={item.planet} className={`flex flex-col border-t-2 bg-surface-alt/40 px-5 py-5 ${era.hypothesis ? "border-dashed" : ""}`} style={{ borderTopColor: item.color }}>
            <Placement value={item} dates className="text-sm" />
            <p className="mt-2 text-xl leading-snug" style={{ color: item.color }}>{item.keyword}</p>
            <p className={`${LABEL} mt-2`}>Dimension · {item.dimension}</p>
            <ul className="mt-4 space-y-2 text-[1.0625rem] leading-snug text-bone-soft">
              {item.points.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0" style={{ backgroundColor: item.color }} />
                  {point}
                </li>
              ))}
            </ul>
            {item.test && (
              <div className="mt-auto pt-5">
                <div className="border-t border-rule pt-3">
                  <p className="datum text-[0.5625rem] uppercase tracking-[0.16em] text-ember">Still to prove</p>
                  <p className="mt-1 text-[0.9375rem] leading-snug text-bone-soft">{item.test}</p>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {era.objection && (
        <p className="mt-6 max-w-3xl text-[1.0625rem] leading-snug text-bone-soft">
          <span className="datum mr-2 text-[0.5625rem] uppercase tracking-[0.16em] text-ember">Open objection</span>
          {era.objection}
        </p>
      )}
    </section>
  );
}

export function MarketsPreviousEra() {
  return <EraSection era={PREVIOUS_ERA} id="inversion-previous-era" heading="The previous era" />;
}

export function MarketsNextEra() {
  return <EraSection era={NEXT_ERA} id="inversion-next-era" heading="The next era" />;
}

export function MarketsInversionTable() {
  return (
    <section aria-labelledby="inversion-table" className="mb-16">
      <SectionHeading aside={`${PREVIOUS_ERA.period} → ${NEXT_ERA.period}`}>
        <span id="inversion-table">The three transitions</span>
      </SectionHeading>

      <p className="mb-6 max-w-3xl text-[1.0625rem] leading-snug text-bone-soft">
        Each planet keeps the logic of its own page; the rows aren’t forced into a neat inversion. {BOUNDARY_NOTE}
      </p>

      <div role="region" aria-label="The three planetary transitions" tabIndex={0} className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr>
              <th scope="col" className="w-1/2 border-b border-rule pb-3 pr-6 align-baseline">
                <span className="block text-[1.0625rem] leading-tight text-bone">{PREVIOUS_ERA.name}</span>
                <span className="mt-1 block"><EraLabel period={PREVIOUS_ERA.period} /></span>
              </th>
              <th scope="col" className="w-1/2 border-b border-ember-dim pb-3 align-baseline">
                <span className="block text-[1.0625rem] leading-tight text-ember">{NEXT_ERA.name}</span>
                <span className="mt-1 block"><EraLabel period={NEXT_ERA.period} hypothesis={NEXT_ERA.hypothesis} /></span>
              </th>
            </tr>
          </thead>
          {INVERSION_GROUPS.map((group) => (
            <tbody key={group.from.planet}>
              <tr>
                <th scope="colgroup" className="pb-2 pr-6 pt-7 align-baseline font-normal"><Placement value={group.from} dates className="text-base" /></th>
                <th scope="colgroup" className="pb-2 pt-7 align-baseline font-normal"><Placement value={group.to} dates className="text-base" /></th>
              </tr>
              {group.pairs.map((pair, index) => {
                const headline = index === 0;
                return (
                  <tr key={pair.from} className={index % 2 === 0 ? "bg-surface-alt/30" : ""}>
                    <td className={`py-2.5 pl-3 pr-6 align-baseline leading-snug ${headline ? "text-xl text-bone" : "text-[1.0625rem] text-bone-soft"}`}>{pair.from}</td>
                    <td className={`py-2.5 pr-3 align-baseline leading-snug ${headline ? "text-xl" : "text-[1.0625rem]"} ${pair.open ? "text-ember" : "text-bone"}`}
                      style={headline ? { color: group.to.color } : undefined}>
                      <span className="mr-2 text-bone-faint" aria-hidden="true">→</span>{pair.to}
                      {pair.open && <span className="datum ml-2 text-[0.5625rem] uppercase tracking-[0.14em]">Open</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
}

export function MarketsInversionThesis() {
  const { mechanism } = THESIS;
  return (
    <section aria-labelledby="inversion-thesis" className="mb-16">
      <SectionHeading aside={<span className="text-ember">Hypothesis</span>}>
        <span id="inversion-thesis">{THESIS.from} → {THESIS.to}</span>
      </SectionHeading>

      <p className="mb-5 max-w-3xl text-[1.0625rem] leading-snug text-bone-soft">
        Parked → Activated isn’t any one planet’s inversion. It is what the three transitions produce together.
      </p>

      <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
        {INVERSION_GROUPS.map((group, index) => (
          <div key={group.to.planet} className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            {index > 0 && <span className="self-center text-2xl text-bone-faint" aria-hidden="true">+</span>}
            <div className="flex-1 border-t-2 bg-surface-alt/40 px-5 py-4" style={{ borderTopColor: group.to.color }}>
              <Placement value={group.to} className="text-sm" />
              <p className="mt-2 text-2xl leading-tight" style={{ color: group.to.color }}>{group.term}</p>
              <p className="mt-1 text-[0.9375rem] leading-snug text-bone-faint">{group.gives}</p>
            </div>
          </div>
        ))}
        <span className="self-center text-2xl text-bone-faint" aria-hidden="true">=</span>
        <div className="border-t-2 border-ember bg-surface-alt/40 px-5 py-4 md:w-[190px]">
          <p className={LABEL}>Capital becomes</p>
          <p className="mt-2 text-2xl leading-tight text-ember">{THESIS.to}</p>
          <p className="mt-1 text-[0.9375rem] leading-snug text-bone-faint">
            {THESIS.behavior[0]} → {THESIS.behavior[1]}
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-x-10 gap-y-4 md:grid-cols-[240px_1fr]">
        <div>
          <p className={LABEL}>The mechanism</p>
          <p className="mt-3 text-xl leading-snug text-bone">{mechanism.claim}</p>
        </div>
        <div className="max-w-3xl">
          <p className="text-[1.125rem] leading-relaxed text-bone-soft">{mechanism.reading}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[mechanism.from, mechanism.to].map((item, index) => (
              <div key={item.name} className={`border-l-2 pl-4 ${index ? "border-ember" : "border-patina"}`}>
                <p className={`text-lg ${index ? "text-ember" : "text-patina"}`}>{item.name}</p>
                <p className={`${LABEL} mt-1`}>{item.kind}</p>
                <p className="mt-2 text-[1.0625rem] italic leading-snug text-bone-soft">{item.example}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <blockquote className="my-12 max-w-4xl border-l-2 border-ember pl-5 text-[1.625rem] leading-snug text-bone">
        {THESIS.line}
      </blockquote>

      <div className="grid gap-4 md:grid-cols-2">
        {THESIS.paradigms.map((paradigm, index) => {
          const next = index === 1;
          const accent = next ? "text-ember" : "text-patina";
          return (
            <article key={paradigm.name} className={`border-t-2 bg-surface-alt/40 px-6 py-6 ${next ? "border-ember" : "border-patina"}`}>
              <EraLabel period={paradigm.period} hypothesis={next} />
              <h3 className={`mt-3 text-2xl leading-tight ${accent}`}>{paradigm.name}</h3>
              <p className="mt-1 text-[0.9375rem] text-bone-faint">{paradigm.status}</p>
              <p className="mt-3 text-[1.0625rem] leading-snug text-bone-soft">{paradigm.shift}</p>
              <p className={`${LABEL} mt-6`}>How capital is deployed</p>
              <Chain steps={paradigm.process} color={accent} />
              <p className={`${LABEL} mt-6`}>The investor’s job</p>
              <Chain steps={paradigm.job} color={accent} />
              <p className="mt-1 text-[0.9375rem] leading-snug text-bone-faint">{paradigm.jobNote}</p>
              <p className={`${LABEL} mt-6`}>Product archetype</p>
              <p className={`mt-1 text-xl ${accent}`}>{paradigm.archetype}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-10 grid gap-x-10 gap-y-2 md:grid-cols-[240px_1fr]">
        <p className={LABEL}>Not the claim</p>
        <ul className="max-w-3xl space-y-3">
          {THESIS.notClaims.map((item) => (
            <li key={item.name} className="text-[1.0625rem] leading-snug text-bone-soft">
              <span className="text-bone line-through decoration-ember/70">{item.name}</span>: {item.reason}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MarketsInversionPredictions() {
  return (
    <section aria-labelledby="inversion-predictions">
      <SectionHeading aside={<span className="text-ember">{PREDICTION_WINDOW.label} · Hypothesis</span>}>
        <span id="inversion-predictions">Predictions</span>
      </SectionHeading>

      <div role="region" aria-label="Previous-era patterns and their predicted inversions" tabIndex={0} className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-rule">
              <th scope="col" className="w-1/2 pb-3 pr-6 align-baseline font-normal">
                <span className="block text-[1.0625rem] leading-tight text-bone">{PREVIOUS_ERA.name}</span>
                <span className="mt-1 block"><EraLabel period={PREVIOUS_ERA.period} /></span>
              </th>
              <th scope="col" className="w-1/2 pb-3 align-baseline font-normal">
                <span className="block text-[1.0625rem] leading-tight text-ember">{NEXT_ERA.name}</span>
                <span className="mt-1 block"><EraLabel period={PREDICTION_WINDOW.label} hypothesis /></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {PREDICTIONS.map((prediction) => {
              const planet = INVERSION_GROUPS.find((group) => group.to.planet === prediction.source)?.to;
              return (
                <tr key={prediction.title} className="border-b border-rule-faint">
                  <td className="py-3.5 pr-6 align-baseline text-[1.0625rem] leading-snug text-bone-soft">
                    {planet && <span className="glyph mr-2 opacity-60" style={{ color: planet.color }} aria-hidden="true">{planet.glyph}</span>}
                    {prediction.previous}
                  </td>
                  <td className="py-3.5 align-baseline text-[1.125rem] leading-snug text-bone">
                    <span className="mr-2 text-bone-faint" aria-hidden="true">→</span>
                    {planet && <span className="glyph mr-2" style={{ color: planet.color }} title={`${planet.planet} in ${planet.sign}`}>{planet.glyph}</span>}
                    {prediction.title}
                    {prediction.conviction === "Tail" && <span className="datum ml-2 text-[0.5625rem] uppercase tracking-[0.14em] text-ember">Tail</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <blockquote className="mt-10 max-w-4xl border-l-2 border-ember pl-5 text-[1.5rem] leading-snug text-bone">
        {PREDICTIONS_CLOSING}
      </blockquote>
    </section>
  );
}
