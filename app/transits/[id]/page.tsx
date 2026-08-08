import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTitle, SectionHeading, StatusMark, Themes } from "@/components/primitives";
import {
  CYCLES,
  SYSTEM_LABEL,
  daysBetween,
  elapsedFraction,
  formatDate,
  statusOf,
} from "@/lib/cycles";

export function generateStaticParams() {
  return CYCLES.map((c) => ({ id: c.id }));
}

function Measure({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-rule-faint py-3 first:border-t-0 first:pt-0">
      <dt className="eyebrow">{label}</dt>
      <dd className="datum mt-1 text-[0.8125rem] text-bone">{value}</dd>
    </div>
  );
}

export default async function CyclePage({ params }: PageProps<"/transits/[id]">) {
  const { id } = await params;
  const cycle = CYCLES.find((c) => c.id === id);
  if (!cycle) notFound();

  const now = new Date();
  const status = statusOf(cycle, now);
  const elapsed = elapsedFraction(cycle, now);

  return (
    <div className="mx-auto w-full max-w-6xl px-8">
      <div className="pt-12">
        <Link
          href="/transits"
          className="datum text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint hover:text-patina transition-colors"
        >
          ← Transits
        </Link>
      </div>

      <div className="flex items-start gap-8">
        <div className="glyph pt-16 text-7xl text-bone-soft">{cycle.glyph}</div>
        <div className="flex-1 min-w-0">
          <PageTitle
            eyebrow={SYSTEM_LABEL[cycle.system]}
            title={`${cycle.title} · ${cycle.subtitle}`}
          />
        </div>
      </div>

      <div className="grid gap-16 lg:grid-cols-[1fr_18rem]">
        <div>
          <section className="mb-16">
            <p className="max-w-2xl text-[1.125rem] font-light leading-relaxed text-bone-soft">
              {cycle.note}
            </p>
            <div className="mt-6">
              <Themes themes={cycle.themes} />
            </div>
          </section>

          {/* The loop: what the cycle claims, against what actually happened. */}
          <section className="mb-16">
            <SectionHeading aside="not yet wired">Record</SectionHeading>
            <div className="border border-dashed border-rule p-8">
              <p className="max-w-xl font-light text-bone-soft">
                Journal entries written between{" "}
                <span className="datum text-[0.8125rem] text-bone">
                  {formatDate(cycle.start)}
                </span>{" "}
                and{" "}
                <span className="datum text-[0.8125rem] text-bone">
                  {formatDate(cycle.end)}
                </span>{" "}
                will surface here, so the window can be read against what was
                actually going on inside it.
              </p>
              <p className="mt-4 max-w-xl font-light text-bone-faint">
                When a cycle closes, this is where the retrospective is written —
                which themes landed, which did not, and how accurate the reading
                turned out to be.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <SectionHeading aside="not yet wired">Counsel</SectionHeading>
            <div className="border border-dashed border-rule p-8">
              <p className="max-w-xl font-light text-bone-soft">
                A council convened for this window specifically — advisors given
                the cycle&apos;s themes, its dates, and your entries from inside it.
              </p>
            </div>
          </section>
        </div>

        {/* Measures */}
        <aside>
          <SectionHeading>Measure</SectionHeading>
          <dl>
            <Measure label="Status" value={status.toUpperCase()} />
            <Measure label="Opens" value={formatDate(cycle.start)} />
            {cycle.peak ? (
              <Measure label="Exact" value={formatDate(cycle.peak)} />
            ) : null}
            <Measure label="Closes" value={formatDate(cycle.end)} />
            <Measure
              label="Span"
              value={`${Math.round(
                (new Date(cycle.end).getTime() -
                  new Date(cycle.start).getTime()) /
                  (365.25 * 86_400_000) *
                  10,
              ) / 10} years`}
            />
            <Measure label="Elapsed" value={`${Math.round(elapsed * 100)}%`} />
            {status === "active" ? (
              <Measure
                label="Remaining"
                value={`${daysBetween(now, cycle.end).toLocaleString()} days`}
              />
            ) : null}
          </dl>
          <div className="border-t border-rule pt-4">
            <StatusMark status={status} />
          </div>
        </aside>
      </div>
    </div>
  );
}
