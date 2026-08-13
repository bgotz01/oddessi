"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PageTitle, SectionHeading } from "@/components/primitives";
import { LetterRun } from "@/components/numerology/parts";
import FixedNumbers from "@/components/numerology/fixed-numbers";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useNumerologyReading } from "@/lib/numerology/use-reading";
import { NUMBERS } from "@/lib/numerology/lexicon";
import type { CoreNumber, NumerologyReading } from "@/lib/numerology/numbers";

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

  return (
    <>
      <FixedNumbers reading={reading} birthDate={birthDate} />

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
    </>
  );
}
