//components/numerology/fixed-numbers.tsx

"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/primitives";
import { NeedsFullName } from "@/components/numerology/parts";
import FixedNumberDrawer, {
  type FixedSubject,
} from "@/components/numerology/fixed-drawer";
import { getMoniker } from "@/lib/numerology/monikers";
import { NUMBERS, POSITIONS, isMaster } from "@/lib/numerology/lexicon";
import type {
  NumerologyReading,
  StandardNumber,
} from "@/lib/numerology/numbers";

interface FixedNumbersProps {
  reading: NumerologyReading;
  birthDate: string;
}

type FixedPosition =
  | "lifePath"
  | "expression"
  | "soulUrge"
  | "personality";

export default function FixedNumbers({
  reading,
  birthDate,
}: FixedNumbersProps) {
  const { nameNumbers } = reading;
  const [subject, setSubject] = useState<FixedSubject | null>(null);

  const masters = [
    reading.lifePath,
    ...(nameNumbers
      ? [
        nameNumbers.expression,
        nameNumbers.soulUrge,
        nameNumbers.personality,
      ]
      : []),
  ].filter(isMaster).length;

  const toggle = (
    position: FixedSubject["position"],
    n: StandardNumber,
    aside?: string,
  ) => {
    setSubject((current) =>
      current?.position === position
        ? null
        : {
          position,
          n,
          ...(aside ? { aside } : {}),
        },
    );
  };

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
            <FixedNumberItem
              position="lifePath"
              n={reading.lifePath as StandardNumber}
              aside={birthDate}
              onClick={() =>
                toggle(
                  "lifePath",
                  reading.lifePath as StandardNumber,
                  birthDate,
                )
              }
            />
          </div>

          {nameNumbers ? (
            <div className="border-t border-rule px-5 py-3">
              <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
                Full Name
              </span>
              <p className="mt-1 font-display text-sm italic text-bone-soft">
                {reading.name}
              </p>
            </div>
          ) : null}

          {nameNumbers ? (
            <div className="grid grid-cols-1 border-b border-rule md:grid-cols-3">
              <div className="border-t border-rule md:border-r">
                <FixedNumberItem
                  position="expression"
                  n={nameNumbers.expression as StandardNumber}
                  onClick={() =>
                    toggle(
                      "expression",
                      nameNumbers.expression as StandardNumber,
                    )
                  }
                />
              </div>

              <div className="border-t border-rule md:border-r">
                <FixedNumberItem
                  position="soulUrge"
                  n={nameNumbers.soulUrge as StandardNumber}
                  onClick={() =>
                    toggle(
                      "soulUrge",
                      nameNumbers.soulUrge as StandardNumber,
                    )
                  }
                />
              </div>

              <div className="border-t border-rule">
                <FixedNumberItem
                  position="personality"
                  n={nameNumbers.personality as StandardNumber}
                  onClick={() =>
                    toggle(
                      "personality",
                      nameNumbers.personality as StandardNumber,
                    )
                  }
                />
              </div>
            </div>
          ) : null}
        </div>

        {!nameNumbers ? (
          <div className="mt-8">
            <NeedsFullName what="Expression, Soul Urge and Personality" />
          </div>
        ) : null}


      </section>

      {subject ? (
        <FixedNumberDrawer
          subject={subject}
          onClose={() => setSubject(null)}
        />
      ) : null}
    </>
  );
}

function FixedNumberItem({
  position,
  n,
  aside,
  onClick,
}: {
  position: FixedPosition;
  n: StandardNumber;
  aside?: string;
  onClick: () => void;
}) {
  const number = NUMBERS[n];

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group block w-full px-5 py-5 text-left",
        "transition-colors duration-200",
        "hover:bg-patina-deep/20",
        "focus-visible:outline-none",
        "focus-visible:ring-1",
        "focus-visible:ring-inset",
        "focus-visible:ring-patina",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
          {POSITIONS[position].label}
        </span>

        {aside ? (
          <span className="datum text-[0.625rem] tracking-[0.08em] text-bone-faint">
            {aside}
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="font-display text-2xl leading-none text-bone">
          {n}
        </span>

        <span className="font-display text-[0.95rem] text-bone-soft">
          {number.title}
        </span>
      </div>

      <div className="datum mt-3 text-[0.625rem] tracking-[0.14em] text-bone-faint uppercase">
        {number.verbs}
      </div>

      <p className="datum mt-3 text-[0.6875rem] italic leading-relaxed text-patina">
        {getMoniker(n, position)}
      </p>
    </button>
  );
}