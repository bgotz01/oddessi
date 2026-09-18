"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/primitives";
import type { LoveArena, LoveProfile } from "@/lib/love";
import {
  ROMANCE_T as T,
  bulletValue,
  sectionOf,
  sourceLine,
} from "./romance-ui";

const ORDER: LoveArena[] = [
  "attraction",
  "romance",
  "partnership",
  "intimacy",
  "commitment",
];

const STEP: Record<
  LoveArena,
  { label: string; finding: string; pressure: string; role: string }
> = {
  attraction: {
    label: "Interest",
    finding: "Drawn to",
    pressure: "Costs",
    role: "Venus · taste and affection",
  },
  romance: {
    label: "Courtship",
    finding: "Courtship reads as",
    pressure: "Costs",
    role: "Mars + 5th · pursuit and play",
  },
  partnership: {
    label: "Partnership",
    finding: "Needs",
    pressure: "Costs",
    role: "Descendant + 7th · equal relationship",
  },
  intimacy: {
    label: "Intimacy",
    finding: "Needs",
    pressure: "Costs",
    role: "Moon + 8th · safety and exposure",
  },
  commitment: {
    label: "Commitment",
    finding: "Commits given",
    pressure: "Tested by",
    role: "Saturn + 7th ruler · structure and endurance",
  },
};

function Tension({
  label,
  left,
  right,
}: {
  label: string;
  left: string;
  right: string;
}) {
  return (
    <article className="border-t border-rule pt-5">
      <p className={`${T.micro} text-bone-faint`}>{label}</p>
      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <p className={T.read}>{left}</p>
        <span aria-hidden className="text-patina">↔</span>
        <p className={`${T.read} text-right`}>{right}</p>
      </div>
    </article>
  );
}

export default function RelationshipMap({ profile }: { profile: LoveProfile }) {
  const [showDetails, setShowDetails] = useState(false);
  const attraction = sectionOf(profile, "attraction");
  const romance = sectionOf(profile, "romance");
  const partnership = sectionOf(profile, "partnership");
  const intimacy = sectionOf(profile, "intimacy");
  const commitment = sectionOf(profile, "commitment");
  const stages = ORDER.map((arena) => {
    const section = sectionOf(profile, arena);
    const step = STEP[arena];
    return {
      arena,
      section,
      step,
      details: section.bullets.filter(
        (bullet) => bullet.key !== step.finding && bullet.key !== step.pressure,
      ),
    };
  });
  const detailRows = Math.max(...stages.map((stage) => stage.details.length));

  return (
    <section>
      <SectionHeading compact>The path into relationship</SectionHeading>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[1100px] border-y border-rule-faint">
          <ol className="grid list-none grid-cols-5 divide-x divide-rule-faint">
            {stages.map(({ arena, section, step }, index) => (
              <li key={arena} className="px-5 py-5">
                <span className={`${T.micro} text-bone-faint`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="inscription mt-2 text-[1.125rem] tracking-[0.08em] text-bone">
                  {step.label}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-snug text-bone-faint">
                  {section.question}
                </p>
              </li>
            ))}
          </ol>

          <div className="grid grid-cols-5 divide-x divide-rule-faint border-t border-rule-faint bg-surface/35">
            {stages.map(({ arena, section, step }) => (
              <div key={arena} className="px-5 py-5">
                <p className={`${T.micro} text-patina`}>Core</p>
                <p className="mt-3 text-[1.0625rem] leading-snug text-bone">
                  {bulletValue(section, step.finding)}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 divide-x divide-rule-faint border-t border-rule-faint">
            {stages.map(({ arena, section, step }) => (
              <div key={arena} className="px-5 py-5">
                <p className={`${T.micro} text-ember`}>Under pressure</p>
                <p className="mt-3 text-[1.0625rem] leading-snug text-bone">
                  {bulletValue(section, step.pressure)}
                </p>
              </div>
            ))}
          </div>

          {showDetails ? (
            <>
              {Array.from({ length: detailRows }, (_, rowIndex) => (
                <dl
                  key={rowIndex}
                  className="grid grid-cols-5 divide-x divide-rule-faint border-t border-rule-faint bg-surface/20"
                >
                  {stages.map(({ arena, details }) => {
                    const detail = details[rowIndex];
                    return (
                      <div key={arena} className="min-h-28 px-6 py-5">
                        {detail ? (
                          <>
                            <dt className={`${T.micro} text-bone-faint`}>{detail.key}</dt>
                            <dd className="mt-3 text-[1rem] leading-snug text-bone-soft">
                              {detail.value}
                            </dd>
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </dl>
              ))}

              <dl className="grid grid-cols-5 divide-x divide-rule-faint border-t border-rule-faint">
                {stages.map(({ arena, section, step }) => (
                  <div key={arena} className="px-6 py-5">
                    <dt className={`${T.micro} text-patina`}>Chart basis</dt>
                    <dd className="mt-3 text-[0.9375rem] leading-snug text-bone-soft">
                      {step.role}
                    </dd>
                    <dd className="mt-3 text-[0.875rem] leading-relaxed text-bone-faint">
                      {sourceLine(section)}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          ) : null}

          <button
            type="button"
            onClick={() => setShowDetails((value) => !value)}
            aria-expanded={showDetails}
            className={`${T.micro} w-full border-t border-rule-faint px-6 py-4 text-left text-bone-faint transition-colors hover:bg-surface-alt hover:text-bone`}
          >
            {showDetails ? "Less detail −" : "More detail across all stages +"}
          </button>
        </div>
      </div>

      <div className="mt-12">
        <SectionHeading compact>Key tensions</SectionHeading>
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-3">
          <Tension
            label="Interest / decision"
            left={bulletValue(attraction, "Drawn to")}
            right={bulletValue(attraction, "Costs")}
          />
          <Tension
            label="Closeness / space"
            left={bulletValue(intimacy, "Needs")}
            right={bulletValue(partnership, "Needs")}
          />
          <Tension
            label="Momentum / staying"
            left={bulletValue(romance, "Runs on")}
            right={bulletValue(commitment, "Tested by")}
          />
        </div>
      </div>

    </section>
  );
}
