"use client";

import { SectionHeading } from "@/components/primitives";
import { ExplainMark } from "@/components/chinese/drawer";
import { GodBar } from "@/components/chinese/pillar";
import {
  FivePhaseWheel,
  RelationKey,
} from "@/components/chinese/five-phase-wheel";
import { STEMS, type StemIndex } from "@/lib/chinese/almanac";
import { weighGods, type GodFamily } from "@/lib/chinese/ten-gods";
import type { FourPillars } from "@/lib/chinese/pillars";

/**
 * 十神 — the whole section, so the page can ask for it in one line.
 *
 * Everything it needs is derivable from the Day Master and the four pillars, so
 * that is the entire prop surface: no shares to thread through, no state, and
 * the same call renders it for any chart.
 *
 * It explains itself twice on purpose. The wheel shows *why* there are five
 * relations — they are the two rings of the five-phase cycle seen from one
 * point — and the list beside it names them in words. The bars underneath are
 * the only part that is about this particular chart.
 */
export function TenGodsSection({
  dayMaster,
  pillars,
}: {
  dayMaster: StemIndex;
  pillars: FourPillars;
}) {
  const master = STEMS[dayMaster];
  const gods = weighGods(dayMaster, [
    pillars.year,
    pillars.month,
    pillars.day,
    pillars.hour,
  ]);

  const largest = Math.max(...gods.map((g) => g.share));
  const dominant = gods.reduce((a, b) => (b.share > a.share ? b : a));
  const absent = gods.filter((g) => g.share === 0).map((g) => g.family);
  const shares = Object.fromEntries(
    gods.map((g) => [g.family, g.share]),
  ) as Partial<Record<GodFamily, number>>;

  return (
    <section className="mb-16">
      <SectionHeading
        aside={
          <span className="flex items-baseline gap-5">
            <span
              className={`datum text-[0.6875rem] ${absent.length ? "text-ember" : "text-bone-faint"}`}
            >
              {absent.length
                ? `No ${absent.join(", ").toLowerCase()}`
                : `${dominant.family} strongest`}
            </span>
            <ExplainMark subject={{ kind: "concept", concept: "ten-gods" }} />
          </span>
        }
      >
        The Ten Gods
      </SectionHeading>

      <p className="mb-8 max-w-3xl text-[1.0625rem] leading-relaxed text-bone">
        Every other character in the chart is read as a relation <em>to</em>{" "}
        {master.polarity} {master.element} — that is what makes it the Day
        Master, and why these five names change completely if the day pillar
        does. There are only five relations available, because there are only
        five ways one phase can stand to another.
      </p>

      <div className="grid items-center gap-10 border-y border-rule-faint py-8 md:grid-cols-[1fr_18rem]">
        <FivePhaseWheel dayMaster={dayMaster} shares={shares} />
        <RelationKey dayMaster={dayMaster} />
      </div>

      <div className="mt-8">
        {gods.map((g) => (
          <GodBar
            key={g.family}
            family={g.family}
            share={g.share}
            largest={largest}
            emphasis={
              g.share === 0
                ? "absent"
                : g.family === dominant.family
                  ? "dominant"
                  : "none"
            }
          />
        ))}
      </div>

      <p className="datum mt-4 max-w-3xl text-[0.6875rem] leading-relaxed text-bone-faint">
        Weighed like the elements, hidden stems included, with the Day Master
        left out — it is the thing being related to, not one of the relations.
      </p>
    </section>
  );
}
