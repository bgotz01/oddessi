import Link from "next/link";
import { PageTitle, SectionHeading, Themes } from "@/components/primitives";
import { CYCLES, formatDate, statusOf } from "@/lib/cycles";

/**
 * The third system, scaffolded and not yet computed.
 *
 * It gets a folder of its own now rather than later because the alternative was
 * filing it under Western, and the two share nothing: numerology takes a name
 * and a date and returns integers, where the natal chart takes a moment and a
 * place and returns positions. The only thing they hold in common is the person
 * — which is what /transits is for.
 *
 * Nothing here computes anything. The personal year shown below is the
 * hand-written band already sitting in `lib/cycles.ts` behind the shared axis,
 * surfaced here so this page tells the truth about what the instrument
 * currently knows rather than reserving the space in silence.
 */

/** The numbers a reading is built from, in the order they are usually taken. */
const NUMBERS = [
  {
    name: "Life Path",
    from: "Birth date",
    note: "The whole date reduced to a single digit. The fixed one — it does not move, and everything else is read against it.",
  },
  {
    name: "Expression",
    from: "Full birth name",
    note: "Every letter of the name given at birth. What the person is equipped to do, as distinct from what they are here to learn.",
  },
  {
    name: "Soul Urge",
    from: "Vowels of the name",
    note: "What is wanted rather than what is shown. Rarely visible from the outside, which is the point of computing it.",
  },
  {
    name: "Personality",
    from: "Consonants of the name",
    note: "The half that is visible from the outside. The gap between this and the Soul Urge is usually the reading.",
  },
  {
    name: "Personal Year",
    from: "Birth day, month, current year",
    note: "The only cycling number. Runs one to nine and starts again, which is why it belongs on the axis alongside transits and luck pillars.",
  },
];

export default function NumerologyPage() {
  const now = new Date();
  const personalYears = CYCLES.filter((c) => c.system === "numerology");

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow="Not yet computed"
        title="Numerology"
        lede="A name and a date reduced to integers. The third system, and the one the
              instrument has least of — the cycles page carries a personal year
              already, but nothing here is calculated yet."
      />

      <section className="mb-16">
        <SectionHeading aside={`${NUMBERS.length} numbers · none computed`}>
          The Core
        </SectionHeading>
        <dl className="border-t border-rule-faint">
          {NUMBERS.map((n) => (
            <div
              key={n.name}
              className="grid gap-2 border-b border-rule-faint py-5 md:grid-cols-[10rem_9rem_1fr] md:gap-6"
            >
              <dt className="inscription text-[0.9375rem] text-bone">
                {n.name}
              </dt>
              <dd className="datum text-[0.625rem] uppercase tracking-[0.2em] text-patina-dim">
                {n.from}
              </dd>
              <dd className="max-w-2xl font-light leading-relaxed text-bone-soft">
                {n.note}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-16">
        <SectionHeading aside="placeholder data">On the Axis</SectionHeading>
        {personalYears.length === 0 ? (
          <p className="font-light text-bone-soft">
            No numerological cycle is carried on the axis yet.
          </p>
        ) : (
          <div className="border-t border-rule-faint">
            {personalYears.map((cycle) => (
              <Link
                key={cycle.id}
                href={`/transits/${cycle.id}`}
                className="flex items-baseline gap-6 border-b border-rule-faint py-5 transition-colors hover:bg-surface-alt"
              >
                <span className="glyph w-8 text-[1.5rem] text-bone-soft">
                  {cycle.glyph}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="inscription block text-[0.9375rem] text-bone">
                    {cycle.title} · {cycle.subtitle}
                  </span>
                  <span className="mt-2 block">
                    <Themes themes={cycle.themes} />
                  </span>
                </span>
                <span className="datum shrink-0 text-[0.6875rem] text-bone-faint">
                  {formatDate(cycle.start)} — {formatDate(cycle.end)} ·{" "}
                  {statusOf(cycle, now).toUpperCase()}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mb-16">
        <SectionHeading aside="not yet wired">Reading</SectionHeading>
        <div className="border border-dashed border-rule p-8">
          <p className="max-w-xl font-light text-bone-soft">
            Nothing on this page is derived from the selected chart. The core
            numbers need a full birth name, which the chart record does not
            currently store, and the personal year above is hand-written rather
            than calculated.
          </p>
          <p className="mt-4 max-w-xl font-light text-bone-faint">
            Until that lands, the numerological band on{" "}
            <Link
              href="/transits"
              className="text-bone-soft underline-offset-4 transition-colors hover:text-patina hover:underline"
            >
              the axis
            </Link>{" "}
            is placeholder data and should be read as one.
          </p>
        </div>
      </section>
    </div>
  );
}
