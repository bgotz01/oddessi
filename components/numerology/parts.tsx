"use client";

import type { ReactNode } from "react";
import {
  Block,
  OpenMark,
  Panel,
  Prose,
  Terms,
} from "@/components/study-panel";
import {
  NUMBERS,
  POSITIONS,
  isMaster,
  reducesTo,
  type Position,
} from "@/lib/numerology/lexicon";
import { getMoniker } from "@/lib/numerology/monikers";
import type { CoreNumber, NamePart, Pinnacle } from "@/lib/numerology/numbers";

/**
 * The furniture shared by the two numerology pages.
 *
 * There is no colour system here and there should not be: the Western pages
 * colour by element and the Eastern by phase because those systems assign one,
 * and numerology assigns nothing. The only distinction a number carries is
 * whether it is a master, so that is the only thing marked — patina for the
 * three that survive reduction, bone for the rest.
 */

/** The numeral itself, set large. Masters take the accent. */
export function Figure({
  n,
  size = "1.75rem",
}: {
  n: CoreNumber;
  size?: string;
}) {
  return (
    <span
      className={`inscription tabular-nums ${isMaster(n) ? "text-patina" : "text-bone"}`}
      style={{ fontSize: size, letterSpacing: "0.06em", lineHeight: 1 }}
    >
      {n}
    </span>
  );
}

/** The note that a master is a doubled digit, wherever one turns up. */
export function MasterNote({ n }: { n: CoreNumber }) {
  const under = reducesTo(n);
  if (under === null) return null;
  const base = NUMBERS[under];
  return (
    <p className="datum mt-4 text-[0.6875rem] leading-relaxed text-bone-faint">
      A master number. Its base is {under} — {base.title}: {base.note.split(".")[0].toLowerCase()}.
      Everything that applies there applies here, at a pitch that is harder to
      sustain and harder to put down.
    </p>
  );
}

/** The span of a chapter, in the two units the pages print it in. */
export function pinnacleAges(pinnacle: Pinnacle): string {
  return pinnacle.endAge === null
    ? `Ages ${pinnacle.startAge}+`
    : `Ages ${pinnacle.startAge}–${pinnacle.endAge}`;
}

export function pinnacleYears(pinnacle: Pinnacle): string {
  return pinnacle.endYear === null
    ? `${pinnacle.startYear} onward`
    : `${pinnacle.startYear}–${pinnacle.endYear}`;
}

/**
 * One number in one place, as a row that opens onto the reading.
 *
 * The panel is in two blocks and always in this order: what the position asks,
 * then what the number is. Reversing them reads as a horoscope — a character
 * sketch with a label attached — where this way round the frame is established
 * before anything is claimed inside it.
 *
 * `inline: false` keeps the row and drops the panel, for the pages that hand
 * the reading to the drawer instead. `open` then means "this is the one the
 * drawer is showing", which is the same highlight and a different promise — so
 * the button announces a dialog rather than an expanded region.
 */
export function NumberRow({
  position,
  n,
  aside,
  open,
  onToggle,
  anchorRef,
  inline = true,
}: {
  position: Position;
  n: CoreNumber;
  aside?: ReactNode;
  open: boolean;
  onToggle: () => void;
  anchorRef?: (el: HTMLElement | null) => void;
  inline?: boolean;
}) {
  const place = POSITIONS[position];
  const entry = NUMBERS[n];

  return (
    <div ref={anchorRef} className="scroll-mt-4 border-b border-rule-faint">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={inline ? open : undefined}
        aria-haspopup={inline ? undefined : "dialog"}
        className={`grid w-full grid-cols-[3rem_1fr_auto_1rem] items-center gap-x-6 py-3.5 text-left transition-colors ${open ? "bg-surface" : "hover:bg-surface-alt"
          }`}
      >
        <span className="pl-2">
          <Figure n={n} />
        </span>

        <span className="min-w-0">
          <span className="inscription block text-[0.9375rem] text-bone-faint">
            {place.label}
          </span>
          <span className="mt-1 flex items-baseline gap-3 flex-wrap">
            <span className="text-[1.25rem] leading-tight text-bone">
              {entry.title}
            </span>
            <span className="text-[1rem] text-bone-faint">
              {entry.verbs}
            </span>
          </span>
          <span className="mt-1 block text-[1.1875rem] italic text-patina">
            {getMoniker(n, position)}
          </span>
        </span>

        <span className="datum text-right text-[0.625rem] text-bone-faint">
          {aside ?? place.from}
        </span>

        <span className="justify-self-end">
          <OpenMark open={open} />
        </span>
      </button>

      {inline && open ? (
        <Panel>
          <Block title="The place" aside={place.from}>
            <Prose>{place.asks}</Prose>
          </Block>
          <Block title={`${n} · ${entry.title}`}>
            <Prose>{entry.note}</Prose>
            <div className="mt-4">
              <Terms terms={entry.terms} />
            </div>
            <MasterNote n={n} />
          </Block>
        </Panel>
      ) : null}
    </div>
  );
}

/**
 * The name spelled out, letter by letter, with the value of each.
 *
 * This is the page's evidence. Which letters count as vowels is the one genuinely
 * contested step in the whole calculation — every tradition treats Y differently
 * — so rather than defend a rule in a footnote, the letters are printed and the
 * ones that were counted as vowels are marked. A reader who disagrees can see
 * exactly where, and by how much.
 */
export function LetterRun({ parts }: { parts: NamePart[] }) {
  return (
    <div className="space-y-6">
      {parts.map((part) => {
        const all = part.letters.reduce((n, l) => n + l.value, 0);
        const vowels = part.letters.reduce(
          (n, l) => (l.vowel ? n + l.value : n),
          0,
        );

        return (
          <div key={part.raw} className="border-b border-rule-faint pb-5">
            <div className="mb-3 flex items-baseline justify-between gap-6">
              <p className="inscription text-[0.8125rem] text-bone">
                {part.raw}
              </p>
              <p className="datum text-[0.625rem] text-bone-faint">
                {all} total · {vowels} vowel · {all - vowels} consonant
              </p>
            </div>

            <div className="flex flex-wrap gap-x-1 gap-y-3">
              {part.letters.map((letter, i) => (
                <span
                  key={`${letter.char}-${i}`}
                  className={`flex w-8 flex-col items-center gap-1 border-t-2 pt-1.5 ${letter.vowel ? "border-patina-dim" : "border-rule"
                    }`}
                >
                  <span
                    className={`inscription text-[0.9375rem] ${letter.vowel ? "text-patina" : "text-bone-soft"
                      }`}
                  >
                    {letter.char}
                  </span>
                  <span className="datum text-[0.625rem] text-bone-faint">
                    {letter.value}
                  </span>
                </span>
              ))}
            </div>
          </div>
        );
      })}

      <p className="datum text-[0.6875rem] leading-relaxed text-bone-faint">
        Vowels are marked in patina. A, E, I, O and U always count; Y counts only
        where neither neighbour is a vowel, so it is sounded in Lynn and silent
        in Bryan. W never counts on its own.
      </p>
    </div>
  );
}

/**
 * What is shown in place of the three name numbers when the chart has only one
 * word for a name.
 *
 * Deliberately not a computed answer with a caveat under it. A first name
 * reduces perfectly well and gives a number that means nothing, and a number on
 * this page is indistinguishable from a number that was earned.
 */
export function NeedsFullName({ what }: { what: string }) {
  return (
    <div className="border border-dashed border-rule p-8">
      <p className="max-w-xl font-light text-bone-soft">
        {what} come from the full name given at birth, and this chart is saved
        under one word. A first name on its own would reduce to a number and the
        number would not mean anything.
      </p>
      <p className="mt-4 max-w-xl font-light text-bone-faint">
        Rename the chart to the full birth name — including a middle name, if
        there was one — and these fill in.
      </p>
    </div>
  );
}
