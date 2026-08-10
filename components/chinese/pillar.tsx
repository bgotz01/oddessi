"use client";

import { Explains } from "@/components/chinese/drawer";
import {
  BRANCHES,
  PILLAR_ROLE,
  STEMS,
  type BranchIndex,
  type Element,
  type StemIndex,
} from "@/lib/chinese/almanac";
import { ELEMENT_STYLE, elementColor } from "@/lib/chinese/palette";
import { GOD_FAMILIES, godOf, type GodFamily } from "@/lib/chinese/ten-gods";

/**
 * A pillar, drawn the way it is written: the stem above, the branch below.
 *
 * The vertical stack is the whole point. A Western placement is a body at a
 * degree of a sign — a horizontal reading. A pillar is two characters standing
 * one on the other, and stacking them keeps the two systems from looking like
 * the same thing in different words.
 *
 * Every character is drawn in its own element's colour, including the ones
 * hidden in the branch. That is the fastest way to see what a chart is made of:
 * four red characters in a row is a reading before a single word is read.
 *
 * The type scale is deliberately not the obvious one. The han are the *name* of
 * the pillar, not the reading of it — set large they are decoration for anyone
 * who does not read Chinese, and the words that actually carry meaning end up
 * as captions underneath. So the characters are set small, at the size of a
 * label, and the English is set at reading size: the animal largest, since that
 * is the name most people already know the pillar by, then the stem, then the
 * branch's element.
 */
export function PillarColumn({
  role,
  stem,
  branch,
  dayMaster,
  isDayMaster = false,
}: {
  role: "year" | "month" | "day" | "hour";
  stem: StemIndex;
  branch: BranchIndex;
  /** Every character is read against this one, so the column needs it. */
  dayMaster: StemIndex;
  isDayMaster?: boolean;
}) {
  const s = STEMS[stem];
  const b = BRANCHES[branch];
  const { title, governs } = PILLAR_ROLE[role];
  // The day pillar's own stem is the Day Master; it stands in no relation to
  // itself, so that column carries its marker instead of a god.
  const god = isDayMaster ? null : godOf(dayMaster, stem);

  return (
    <Explains
      subject={{ kind: "pillar", role, stem, branch, dayMaster }}
      label={`the ${title.toLowerCase()} pillar`}
      className="flex flex-col items-center border-l border-rule-faint px-4 py-8 first:border-l-0"
    >
      <p className="eyebrow mb-6" data-tooltip={governs}>
        {title}
      </p>

      {/* The pillar's name in its own script, set at label size. */}
      <p className="han flex flex-col items-center gap-1 text-[1.25rem]">
        <span style={{ color: elementColor(s.element) }}>{s.han}</span>
        <span style={{ color: elementColor(b.element) }}>{b.han}</span>
      </p>

      <p
        className="inscription mt-6 text-[0.9375rem] leading-tight"
        style={{ color: elementColor(s.element) }}
      >
        {s.polarity} {s.element}
      </p>

      {/* What that stem is *to you* — the reading, as opposed to the label. */}
      {god ? (
        <p className="datum mt-1.5 text-[0.6875rem] text-bone-soft">
          {god.name}
        </p>
      ) : null}

      {/*
        The animal and the element it is made of are one fact, so they are one
        colour. Splitting them — a green Tiger over a grey "Wood" — reads as two
        unrelated things and invites the question of why only half of it is lit.

        The branch's hidden stems used to sit below this. They are real and the
        element percentages are counted from them, but three more characters per
        column turned the row into a wall; they live in the drawer now, where
        there is room to say what they are.
      */}
      <p
        className="inscription mt-2 text-[1.25rem] leading-tight"
        style={{ color: elementColor(b.element) }}
      >
        {b.animal}
      </p>
      <p
        className="datum mt-1.5 text-[0.75rem]"
        style={{ color: elementColor(b.element) }}
      >
        {b.element}
      </p>

      {isDayMaster ? (
        <p className="datum mt-4 border-t border-patina-dim pt-2 text-[0.5625rem] tracking-[0.2em] text-patina uppercase">
          Day Master
        </p>
      ) : null}
    </Explains>
  );
}

/**
 * One relation's share of the chart.
 *
 * Deliberately built like `ElementBar` but drawn without colour: the elements
 * own the palette on this page, and a second coloured bar chart directly under
 * the first would read as the same measurement taken twice. Here the bar is
 * bone, and the two accents mark the same two things they always do — patina
 * for the largest share, which is what the chart is *about*, ember for a
 * relation the chart does not contain at all.
 */
export function GodBar({
  family,
  share,
  largest,
  emphasis,
}: {
  family: GodFamily;
  share: number;
  largest: number;
  emphasis: "dominant" | "absent" | "none";
}) {
  const tone =
    emphasis === "dominant"
      ? { text: "text-patina", fill: "bg-patina" }
      : emphasis === "absent"
        ? { text: "text-ember", fill: "bg-ember" }
        : { text: "text-bone-soft", fill: "bg-bone-faint" };

  return (
    <Explains
      subject={{ kind: "god", family, share }}
      label={family}
      className="flex w-full items-center gap-4 px-2 py-2.5"
    >
      <span
        className={`datum w-24 text-[0.6875rem] tracking-[0.14em] uppercase ${tone.text}`}
      >
        {family}
      </span>

      <span className="han w-10 text-[0.8125rem] text-bone-faint">
        {GOD_FAMILIES[family].han}
      </span>

      <span className="h-[3px] flex-1 bg-rule-faint">
        <span
          className={`block h-full ${tone.fill}`}
          style={{ width: `${largest > 0 ? (share / largest) * 100 : 0}%` }}
        />
      </span>

      <span className={`datum w-12 text-right text-[0.6875rem] ${tone.text}`}>
        {share}%
      </span>

      <span className="datum w-16 text-right text-[0.5625rem] tracking-[0.2em] uppercase">
        {emphasis === "absent" ? <span className="text-ember">None</span> : null}
      </span>
    </Explains>
  );
}

/**
 * One element's share of the eight characters.
 *
 * The bar carries the element's own colour, so the row is identifiable without
 * reading its label. The two accents keep doing their own work on top of that
 * and are never used as an element colour: patina marks the row the Day Master
 * stands in, ember marks an element the chart does not have at all — which is
 * the one absence a reading always remarks on.
 */
export function ElementBar({
  element,
  share,
  largest,
  emphasis,
}: {
  element: Element;
  share: number;
  /** The biggest share on this chart — the bars are drawn relative to it. */
  largest: number;
  emphasis: "self" | "absent" | "none";
}) {
  const { color } = ELEMENT_STYLE[element];

  return (
    <Explains
      subject={{ kind: "element", element, share }}
      label={element}
      className="flex w-full items-center gap-4 px-2 py-2.5"
    >
      <span
        className="datum w-16 text-[0.6875rem] tracking-[0.14em] uppercase"
        style={{ color }}
      >
        {element}
      </span>

      <span className="h-[3px] flex-1 bg-rule-faint">
        <span
          className="block h-full"
          style={{
            width: `${largest > 0 ? (share / largest) * 100 : 0}%`,
            backgroundColor: color,
          }}
        />
      </span>

      <span className="datum w-12 text-right text-[0.6875rem]" style={{ color }}>
        {share}%
      </span>

      <span className="datum w-16 text-right text-[0.5625rem] tracking-[0.2em] uppercase">
        {emphasis === "self" ? (
          <span className="text-patina">Self</span>
        ) : emphasis === "absent" ? (
          <span className="text-ember">Absent</span>
        ) : null}
      </span>
    </Explains>
  );
}
