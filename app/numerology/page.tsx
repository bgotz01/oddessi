"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import {
  LetterRun,
  NeedsFullName,
  NumberRow,
} from "@/components/numerology/parts";
import FixedNumberDrawer, {
  type FixedSubject,
} from "@/components/numerology/fixed-drawer";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useNumerologyReading } from "@/lib/numerology/use-reading";
import { NUMBERS, POSITIONS, isMaster } from "@/lib/numerology/lexicon";
import type { CoreNumber, NumerologyReading, StandardNumber } from "@/lib/numerology/numbers";

/**
 * The four fixed numbers — the ones that hold still for a whole life.
 *
 * One comes from the date and three from the name, and the page keeps that
 * seam visible rather than presenting four equivalent facts. The date is a
 * matter of record; the name is a matter of spelling, and a chart saved under
 * "Ana" cannot produce the other three at all.
 *
 * The moving numbers — personal year, pinnacles, essence — are next door.
 */

function formatBirthDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function NumerologyPage() {
  const { chart } = useChart();
  const { setPageContext } = useChat();
  const reading = useNumerologyReading(chart);

  useEffect(() => {
    if (!reading) return;

    const name = (n: CoreNumber) => `${n} — ${NUMBERS[n].title}`;

    setPageContext({
      _description: "Numerology — the fixed numbers",
      name: reading.name,
      lifePath: name(reading.lifePath),
      ...(reading.nameNumbers
        ? {
          expression: name(reading.nameNumbers.expression),
          soulUrge: name(reading.nameNumbers.soulUrge),
          personality: name(reading.nameNumbers.personality),
        }
        : {
          nameNumbers:
            "Withheld — the chart is saved under a single word, so Expression, Soul Urge and Personality cannot be taken.",
        }),
    });

    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reading]);

  return (
    <div className="mx-auto w-full max-w-5xl px-8 pb-24">
      <PageTitle
        eyebrow={chart ? chart.name : "No chart"}
        title="Numerology"
        lede="A name and a date, reduced by addition until one figure is left.
              No sky is consulted and nothing is measured — which makes this the
              plainest system here and the one where the conventions do all the
              work, so the page shows its arithmetic."
      />

      {!chart ? (
        <p className="text-bone-soft">No chart selected.</p>
      ) : !reading ? (
        <p className="datum text-[0.75rem] text-ember">
          This chart has no readable birth date.
        </p>
      ) : (
        <Reading
          reading={reading}
          birthDate={formatBirthDate(chart.birth.date)}
        />
      )}
    </div>
  );
}

function Reading({
  reading,
  birthDate,
}: {
  reading: NumerologyReading;
  birthDate: string;
}) {
  const { nameNumbers, parts } = reading;
  const [subject, setSubject] = useState<FixedSubject | null>(null);

  const masters = [
    reading.lifePath,
    ...(nameNumbers
      ? [nameNumbers.expression, nameNumbers.soulUrge, nameNumbers.personality]
      : []),
  ].filter(isMaster).length;

  return (
    <>
      <section className="mb-16">
        <SectionHeading
          aside={
            nameNumbers
              ? `4 fixed · ${masters} master${masters === 1 ? "" : "s"}`
              : "1 of 4 · name incomplete"
          }
        >
          The Fixed Numbers
        </SectionHeading>

        <div className="border-t border-rule">
          <div className="border-l-2 border-patina bg-patina-deep/30">
            <NumberRow
              position="lifePath"
              n={reading.lifePath}
              aside={birthDate}
              open={subject?.position === "lifePath"}
              onToggle={() =>
                setSubject(
                  subject?.position === "lifePath"
                    ? null
                    : { position: "lifePath", n: reading.lifePath as StandardNumber, aside: birthDate },
                )
              }
              inline={false}
            />
          </div>

          {nameNumbers ? (
            <>
              <NumberRow
                position="expression"
                n={nameNumbers.expression}
                open={subject?.position === "expression"}
                onToggle={() =>
                  setSubject(
                    subject?.position === "expression"
                      ? null
                      : { position: "expression", n: nameNumbers.expression as StandardNumber },
                  )
                }
                inline={false}
              />
              <NumberRow
                position="soulUrge"
                n={nameNumbers.soulUrge}
                open={subject?.position === "soulUrge"}
                onToggle={() =>
                  setSubject(
                    subject?.position === "soulUrge"
                      ? null
                      : { position: "soulUrge", n: nameNumbers.soulUrge as StandardNumber },
                  )
                }
                inline={false}
              />
              <NumberRow
                position="personality"
                n={nameNumbers.personality}
                open={subject?.position === "personality"}
                onToggle={() =>
                  setSubject(
                    subject?.position === "personality"
                      ? null
                      : { position: "personality", n: nameNumbers.personality as StandardNumber },
                  )
                }
                inline={false}
              />
            </>
          ) : null}
        </div>

        {!nameNumbers ? (
          <div className="mt-8">
            <NeedsFullName what="Expression, Soul Urge and Personality" />
          </div>
        ) : null}

        <p className="datum mt-6 max-w-3xl text-[0.6875rem] leading-relaxed text-bone-faint">
          {POSITIONS.lifePath.from} is reduced a component at a time — month,
          day and year each on their own, then added and reduced again. Adding
          the eight digits straight across is also in circulation and does not
          always agree; this is the method the readings here assume.
        </p>
      </section>

      {nameNumbers ? (
        <section className="mb-16">
          <SectionHeading
            aside={`${parts.length} parts · ${parts.reduce((n, p) => n + p.letters.length, 0)} letters`}
          >
            The Letters
          </SectionHeading>
          <LetterRun parts={parts} />
        </section>
      ) : null}

      <p>
        <Link
          href="/numerology/cycles"
          className="datum text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase transition-colors hover:text-patina"
        >
          The numbers that move →
        </Link>
      </p>

      {subject ? (
        <FixedNumberDrawer subject={subject} onClose={() => setSubject(null)} />
      ) : null}
    </>
  );
}
