"use client";

import { useEffect } from "react";
import { Block, Prose, Terms } from "@/components/study-panel";
import { Figure, MasterNote } from "@/components/numerology/parts";
import { NUMBERS, POSITIONS, type Position } from "@/lib/numerology/lexicon";
import { getMoniker } from "@/lib/numerology/monikers";
import type { CoreNumber, StandardNumber } from "@/lib/numerology/numbers";
import {
  LIFE_PATH_READINGS,
  EXPRESSION_READINGS,
  SOUL_URGE_READINGS,
  PERSONALITY_READINGS,
  type LifePathReading,
  type ExpressionReading,
  type SoulUrgeReading,
  type PersonalityReading,
} from "@/lib/numerology/fixed";

/**
 * The reading for one fixed number, in the right-hand drawer.
 *
 * Fixed numbers open in a drawer rather than inline for the same reason the
 * moving numbers do: a panel shoved between two rows of the list it belongs to
 * collapses the list's legibility. The drawer gives the reading a column of its
 * own and leaves the four-row table standing behind it.
 *
 * Unlike the moving-number drawer, there is no arithmetic section here — the
 * fixed numbers are taken once and never again, and the arithmetic for the life
 * path is already explained on the page. The drawer's job is the interpretation.
 */

export type FixedSubject = {
  position: Extract<Position, "lifePath" | "expression" | "soulUrge" | "personality">;
  n: StandardNumber;
  aside?: string;
};

function getReading(
  position: FixedSubject["position"],
  n: StandardNumber,
): LifePathReading | ExpressionReading | SoulUrgeReading | PersonalityReading {
  switch (position) {
    case "lifePath": return LIFE_PATH_READINGS[n];
    case "expression": return EXPRESSION_READINGS[n];
    case "soulUrge": return SOUL_URGE_READINGS[n];
    case "personality": return PERSONALITY_READINGS[n];
  }
}

export default function FixedNumberDrawer({
  subject,
  onClose,
}: {
  subject: FixedSubject;
  onClose: () => void;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const { position, n, aside } = subject;
  const place = POSITIONS[position];
  const entry = NUMBERS[n];
  const interpretation = getReading(position, n);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-void/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${place.label} ${n}`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-rule bg-surface shadow-2xl"
      >
        {/* Header */}
        <div className="shrink-0 border-b border-rule px-8 py-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-baseline gap-5">
              <Figure n={n} size="2.5rem" />
              <div>
                <p className="inscription text-[0.8125rem] text-bone">
                  {place.label}
                </p>
                <p className="mt-1.5 text-[1.25rem] leading-tight text-bone-soft">
                  {entry.title}
                </p>
                <p className="mt-1 text-[1.1875rem] italic text-patina">
                  {getMoniker(n, position)}
                </p>
                {entry.keywords.length > 0 ? (
                  <p className="mt-1.5 text-[0.9375rem] font-light text-bone-faint">
                    {entry.keywords.join(" · ")}
                  </p>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>

          {aside ? (
            <div className="mt-5 border-t border-rule-faint pt-4">
              <span className="datum text-[0.6875rem] text-bone-faint">{aside}</span>
            </div>
          ) : null}
        </div>

        {/* Body */}
        <div className="space-y-8 px-8 py-8">
          {/* Number character — compact header, not a full block */}
          <div className="border-b border-rule-faint pb-6">
            <p className="inscription text-[0.8125rem] text-bone-faint mb-3">
              {entry.title}
            </p>
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {entry.note}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.terms.map((term) => (
                <span
                  key={term}
                  className="datum border border-rule px-2 py-0.5 text-[0.5625rem] tracking-[0.18em] uppercase text-bone-faint"
                >
                  {term}
                </span>
              ))}
            </div>
            <MasterNote n={n} />
          </div>

          {/* Position-specific interpretation */}
          <Block title="The reading">
            <Prose>{interpretation.reading}</Prose>
          </Block>

          <Block title="What is available">
            <Prose>{interpretation.available}</Prose>
          </Block>

          <Block title="The friction">
            <Prose>{interpretation.friction}</Prose>
          </Block>

          {/* What the position asks — kept as a closing frame */}
          <div className="border-l-2 border-patina-dim pl-5 py-1">
            <p className="text-[1.0rem] leading-relaxed text-bone-soft italic">
              {place.asks}
            </p>
          </div>
        </div>

        <div className="mt-auto h-[3px] w-full bg-patina-dim opacity-50" />
      </div>
    </>
  );
}
