"use client";

import { useEffect } from "react";
import { Block, ListColumn, Pair } from "@/components/study-panel";
import { NUMBERS, POSITIONS, isMaster, type Position } from "@/lib/numerology/lexicon";
import { getMoniker } from "@/lib/numerology/monikers";
import { PINNACLE_READINGS } from "@/lib/numerology/pinnacles";
import { CHALLENGE_READINGS } from "@/lib/numerology/challenges";
import type { CoreNumber, StandardNumber, ChallengeNumber } from "@/lib/numerology/numbers";

/**
 * A free-browse reference drawer for numerology: pick any position, pick any
 * number, read what it means there.
 *
 * This is not tied to a specific reading — it answers "what does 7 mean as a
 * Pinnacle?" rather than "what is this chart's Pinnacle?". For the
 * chart-specific drawer see NumerologyCycleDrawer.
 */

export interface ReferenceTarget {
  position: Position;
  number: CoreNumber;
}

// Only the four moving positions — the fixed ones have their own drawer.
const CYCLE_POSITIONS: { key: Position; label: string }[] = [
  { key: "personalYear", label: "Personal Year" },
  { key: "pinnacle", label: "Pinnacle" },
  { key: "challenge", label: "Challenge" },
  { key: "essence", label: "Essence" },
];

// Numbers valid per position.
const NUMBERS_FOR: Record<Position, CoreNumber[]> = {
  // Personal year runs 1–9 strictly (masters reduced).
  personalYear: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  // Pinnacles can produce masters.
  pinnacle: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33],
  // Challenges are differences — 0 is valid, no masters.
  challenge: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  // Essence: masters 11 and 22 only (33 unreachable from letter values).
  essence: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  // Fixed positions — included for type completeness, not shown in this drawer.
  lifePath: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33],
  expression: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33],
  soulUrge: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33],
  personality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33],
};

/** What a number means in a specific position — the position-scoped body. */
function InterpretationBody({
  position,
  number,
}: {
  position: Position;
  number: CoreNumber;
}) {
  const entry = NUMBERS[number];

  if (position === "pinnacle" && number > 0) {
    const reading = PINNACLE_READINGS[number as StandardNumber];
    if (reading) {
      return (
        <>
          <Block title="The chapter">
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {reading.chapter}
            </p>
          </Block>
          <Block title="What becomes available">
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {reading.available}
            </p>
          </Block>
          <Block title="The cost">
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {reading.cost}
            </p>
          </Block>
          <div className="border-l-2 border-patina-dim py-1 pl-5">
            <p className="text-[1rem] leading-relaxed text-bone-soft italic">
              {reading.question}
            </p>
          </div>
        </>
      );
    }
  }

  if (position === "challenge") {
    const reading = CHALLENGE_READINGS[number as ChallengeNumber];
    if (reading) {
      return (
        <>
          <Block title="The obstacle">
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {reading.obstacle}
            </p>
          </Block>
          <Block title="Where it appears">
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {reading.terrain}
            </p>
          </Block>
          <Block title="Working with it">
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
              {reading.working}
            </p>
          </Block>
        </>
      );
    }
  }

  // Personal year and essence use the canonical number character with the
  // position's framing question as context.
  return (
    <Block title={`${number} · ${entry.title}`}>
      <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
        {entry.note}
      </p>
      {entry.terms.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
          {entry.terms.map((t) => (
            <span
              key={t}
              className="datum text-[0.625rem] tracking-[0.22em] uppercase text-bone-faint"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </Block>
  );
}

export default function NumerologyReferenceDrawer({
  target,
  onNavigate,
  onClose,
}: {
  target: ReferenceTarget;
  onNavigate: (next: ReferenceTarget) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const posEntry = POSITIONS[target.position];
  const numEntry = NUMBERS[target.number];
  const validNumbers = NUMBERS_FOR[target.position];

  // When navigating to a position that doesn't support the current number,
  // fall back to 1 (or 0 for challenge).
  function navigateTo(position: Position, number?: CoreNumber) {
    const nums = NUMBERS_FOR[position];
    const n = number !== undefined && nums.includes(number)
      ? number
      : (nums[0] ?? 1);
    onNavigate({ position, number: n });
  }

  // Step through numbers within the current position.
  function stepNumber(delta: -1 | 1) {
    const idx = validNumbers.indexOf(target.number);
    const next = validNumbers[(idx + delta + validNumbers.length) % validNumbers.length];
    onNavigate({ position: target.position, number: next });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-void/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${posEntry.label} ${target.number}`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-rule bg-surface shadow-2xl"
      >
        {/* ── Header ── */}
        <div className="shrink-0 border-b border-rule px-8 py-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-baseline gap-5">
              {/* Large number */}
              <span className="inscription text-[2.5rem] leading-none tabular-nums text-patina">
                {target.number}
              </span>
              <div>
                <p className="inscription text-[0.8125rem] text-bone-faint">
                  {posEntry.label}
                </p>
                <p className="mt-1 text-[1.375rem] leading-tight text-bone">
                  {numEntry.title}
                </p>
                <p className="mt-1 text-[1.1875rem] italic text-patina">
                  {getMoniker(target.number, target.position)}
                </p>
                {numEntry.keywords.length > 0 ? (
                  <p className="mt-1.5 text-[0.9375rem] font-light text-bone-faint">
                    {numEntry.keywords.join(" · ")}
                  </p>
                ) : null}
                {isMaster(target.number) ? (
                  <p className="datum mt-1 text-[0.5625rem] tracking-[0.2em] text-patina uppercase">
                    Master
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

          {/* Position framing question */}
          <p className="mt-5 border-t border-rule-faint pt-4 text-[0.875rem] leading-relaxed text-bone-faint italic">
            {posEntry.asks}
          </p>
        </div>

        {/* ── Selectors ── */}
        <div className="shrink-0 border-b border-rule px-8 py-4 space-y-4">
          {/* Position row */}
          <div>
            <p className="eyebrow mb-2 text-[0.5625rem]">Position</p>
            <div className="flex flex-wrap gap-2">
              {CYCLE_POSITIONS.map(({ key, label }) => {
                const on = key === target.position;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => navigateTo(key, target.number)}
                    aria-pressed={on}
                    className={`datum border px-3 py-1.5 text-[0.625rem] tracking-[0.16em] uppercase transition-colors ${on
                      ? "border-patina bg-[color-mix(in_srgb,var(--color-patina)_18%,transparent)] text-bone"
                      : "border-rule-faint text-bone-faint hover:border-rule hover:text-bone-soft"
                      }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Number row */}
          <div>
            <p className="eyebrow mb-2 text-[0.5625rem]">Number</p>
            <div className="flex flex-wrap gap-1.5">
              {validNumbers.map((n) => {
                const on = n === target.number;
                const master = isMaster(n as CoreNumber);
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => onNavigate({ position: target.position, number: n })}
                    aria-pressed={on}
                    className={`datum min-w-[2rem] border px-1.5 py-1.5 text-center text-[0.625rem] tracking-[0.1em] transition-colors ${on
                      ? "border-patina bg-[color-mix(in_srgb,var(--color-patina)_18%,transparent)] text-bone"
                      : master
                        ? "border-rule text-patina-dim hover:border-patina hover:text-patina"
                        : "border-rule-faint text-bone-faint hover:border-rule hover:text-bone-soft"
                      }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="space-y-8 px-8 py-8">
          <InterpretationBody position={target.position} number={target.number} />
        </div>

        {/* ── Number nav footer ── */}
        <div className="mt-auto shrink-0 flex items-center justify-between border-t border-rule px-8 py-4">
          <button
            type="button"
            onClick={() => stepNumber(-1)}
            className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-patina"
          >
            ←{" "}
            {(() => {
              const idx = validNumbers.indexOf(target.number);
              return validNumbers[(idx - 1 + validNumbers.length) % validNumbers.length];
            })()}
          </button>
          <span className="datum text-[0.5625rem] tracking-[0.18em] text-bone-faint uppercase">
            {posEntry.label}
          </span>
          <button
            type="button"
            onClick={() => stepNumber(1)}
            className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-patina"
          >
            {(() => {
              const idx = validNumbers.indexOf(target.number);
              return validNumbers[(idx + 1) % validNumbers.length];
            })()}{" "}
            →
          </button>
        </div>

        {/* Accent bar */}
        <div className="h-[3px] w-full shrink-0 bg-patina-dim opacity-50" />
      </div>
    </>
  );
}
