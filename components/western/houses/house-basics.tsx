"use client";

import {
  HOUSE_CATEGORIES,
  type House,
} from "@/lib/astrology/house-categories";

/**
 * The twelve houses as six axes, each house facing its opposite:
 *
 *     1  Self & Identity   Who I am   ↔   Who I join with   Relationships & Partnership  7
 *
 * A grid of twelve cells named every house and said nothing about how they
 * relate, when the most useful single fact about a house is what sits across
 * from it — "what is mine" only means something next to "what is ours". So the
 * key is read down the axes, one per row, each side leaning toward the arrow.
 *
 * Titles and lines both come from `house-categories`, the one place houses are
 * named, so this can never disagree with the Houses or Growth pages. The cell
 * treatment is Planetary Influences', so the two keys read as a set.
 */
const AXES: [House, House][] = [
  [1, 7],
  [2, 8],
  [3, 9],
  [4, 10],
  [5, 11],
  [6, 12],
];

/** The stored line is a sentence; on either side of an arrow it reads as a phrase. */
function phrase(house: House): string {
  return HOUSE_CATEGORIES[house].essence.replace(/\.$/, "");
}

function Side({ house, align }: { house: House; align: "left" | "right" }) {
  const toward = align === "right" ? "items-end text-right" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-1 bg-surface px-5 py-4 ${toward}`}>
      <div
        className={`flex items-baseline gap-2 ${align === "right" ? "flex-row-reverse" : ""}`}
      >
        <span className="datum text-[1.125rem] text-patina">{house}</span>
        <span className="inscription text-[0.75rem] text-bone">
          {HOUSE_CATEGORIES[house].title}
        </span>
      </div>
      <p className="text-[1.0625rem] font-light text-bone-soft italic">
        {phrase(house)}
      </p>
    </div>
  );
}

export default function HouseBasics() {
  return (
    <div className="flex flex-col gap-px bg-rule-faint">
      {AXES.map(([self, other]) => (
        <div
          key={self}
          className="grid grid-cols-[1fr_auto_1fr] gap-px bg-rule-faint"
        >
          <Side house={self} align="right" />
          <span
            aria-hidden
            className="glyph flex items-center bg-surface px-4 text-[1rem] text-patina-dim"
          >
            ↔
          </span>
          <Side house={other} align="left" />
        </div>
      ))}
    </div>
  );
}
