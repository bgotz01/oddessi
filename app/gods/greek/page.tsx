import type { Metadata } from "next";
import { GREEK_GROUPS, type GreekGod, type GreekGroup } from "@/lib/gods/greek";
import { PageTitle, SectionHeading } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Greek Gods — Oddessi",
  description: "A recognition grid of the Greek pantheon, grouped by era and domain.",
};

export default function GreekGodsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow="Gods · Greek"
        title="The Greek Pantheon"
        lede="Primordials, Titans, Olympians, and the forces that took divine form. Organized for recognition, not encyclopedic lookup."
      />

      <div className="space-y-16">
        {GREEK_GROUPS.map((group) => (
          <GroupSection key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

function GroupSection({ group }: { group: GreekGroup }) {
  return (
    <section>
      <SectionHeading aside={`${group.gods.length} deities`}>
        {group.label}
      </SectionHeading>

      <p className="mb-8 text-[1.0625rem] leading-relaxed text-bone-faint">
        {group.description}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {group.gods.map((god) => (
          <GodCard key={god.name} god={god} />
        ))}
      </div>
    </section>
  );
}

function GodCard({ god }: { god: GreekGod }) {
  return (
    <article className="flex flex-col border border-rule bg-surface">
      {/* Top accent bar — patina for all cards, consistent across groups */}
      <span aria-hidden className="block h-[2px] w-full bg-patina-dim" />

      <div className="flex flex-1 flex-col px-5 py-5">
        {/* Zone 1 — Name */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="inscription text-[1.125rem] leading-tight text-bone">
            {god.name}
          </h3>
        </div>

        {/* Zone 2 — Epithets */}
        <div className="mt-2 flex flex-wrap gap-x-2">
          {god.epithets.map((e, i) => (
            <span key={e} className="flex items-center gap-2">
              <span className="datum text-[0.75rem] tracking-[0.18em] text-patina-dim uppercase">
                {e}
              </span>
              {i < god.epithets.length - 1 ? (
                <span aria-hidden className="datum text-[0.5rem] text-rule">
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </div>

        {/* Zone 3 — Definition */}
        <p className="mt-4 border-t border-rule-faint pt-4 text-[1.1875rem] leading-relaxed font-medium text-bone">
          {god.definition}
        </p>

        {/* Zone 4 — Symbols + Roman name */}
        <div className="mt-auto pt-5">
          <div className="border-t border-rule-faint pt-4">
            {/* Symbol list */}
            <div className="flex flex-wrap gap-x-1.5 gap-y-1">
              {god.symbols.map((s, i) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className="datum text-[0.6875rem] tracking-[0.1em] text-bone-faint uppercase">
                    {s}
                  </span>
                  {i < god.symbols.length - 1 ? (
                    <span aria-hidden className="datum text-[0.5rem] text-bone-faint/40">
                      ·
                    </span>
                  ) : null}
                </span>
              ))}
            </div>

            {/* Roman name — only when present */}
            {god.roman ? (
              <div className="mt-3 flex items-baseline gap-2">
                <span className="datum text-[0.625rem] tracking-[0.2em] text-bone-faint/60 uppercase">
                  Roman
                </span>
                <span className="datum text-[0.75rem] tracking-[0.14em] text-bone-faint uppercase">
                  {god.roman}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
