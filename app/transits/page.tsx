import Timeline from "@/components/timeline";
import { PageTitle, SectionHeading } from "@/components/primitives";
import { CYCLES, WINDOW_END, WINDOW_START, toBand } from "@/lib/cycles";
import { hasRetrograde } from "@/lib/band";

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6">
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-8 bg-patina" />
        <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
          In effect
        </span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-8 bg-patina-deep" />
        <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
          Closed
        </span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-px w-8 bg-patina-dim" />
        <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
          Full span
        </span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-4 w-px bg-ember" />
        <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
          Exact
        </span>
      </span>
      <span className="flex items-center gap-2">
        <span className="datum text-[0.6875rem] text-ember">℞</span>
        <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
          Stations retrograde
        </span>
      </span>
    </div>
  );
}

export default function TransitsPage() {
  const now = new Date();

  // Longest-running first, so the slow cycles form the bed and the short ones
  // read as events against them.
  const bands = CYCLES.map(toBand).sort(
    (a, b) =>
      Date.parse(b.end) -
      Date.parse(b.start) -
      (Date.parse(a.end) - Date.parse(a.start)),
  );

  const retroCount = bands.filter(hasRetrograde).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow={`${WINDOW_START.slice(0, 4)} — ${WINDOW_END.slice(0, 4)}`}
        title="Transits"
        lede="Every system on one axis. Transits, luck pillars and personal years are
              not separate calendars — they are separate vocabularies describing the
              same stretch of time. For the computed outer-planet cycles, see Cycles."
      />

      <section className="mb-16">
        <SectionHeading
          aside={`${bands.length} cycles · ${retroCount} ℞ · placeholder data`}
        >
          The Axis
        </SectionHeading>
        <Timeline
          bands={bands}
          now={now}
          windowStart={WINDOW_START}
          windowEnd={WINDOW_END}
        />
        <Legend />
      </section>
    </div>
  );
}
