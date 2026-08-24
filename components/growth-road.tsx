"use client";

import type { ReactNode } from "react";
import { T } from "@/components/growth-ui";

/**
 * A road: two terminals with a line between them.
 *
 * Extracted because the Arc and the Conversion are the same claim at two
 * scales — INTERPRETER → AUTHOR and INVESTIGATION → THESIS — and drawing them
 * differently made them look like two unrelated ideas. Sharing the figure makes
 * the rhyme visible, which is the point: the second is the first, told in terms
 * of what the person actually does.
 *
 * The line crosses from the departing end's grey to the arriving end's gold, so
 * direction survives even cropped. On a narrow container it turns vertical, and
 * the terminals stack.
 */
export const ROAD_FROM = "#9aa4b6";

export default function GrowthRoad({
  fromLabel,
  toLabel,
  from,
  to,
  toColor,
  mark,
  onFrom,
  onTo,
  size = "large",
}: {
  /** The micro caption above each terminal. */
  fromLabel: string;
  toLabel: string;
  from: ReactNode;
  to: ReactNode;
  toColor: string;
  /** Optional mark standing on the road — only drawn when it means something. */
  mark?: ReactNode;
  onFrom?: () => void;
  onTo?: () => void;
  /** The Arc is the page's hero; the Conversion is its echo, a step quieter. */
  size?: "large" | "medium";
}) {
  const type =
    size === "large"
      ? "text-[1.5rem] @3xl:text-[1.75rem]"
      : "text-[1.25rem] @3xl:text-[1.375rem]";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-6">
        <span className={`${T.tiny} text-bone-faint`}>{fromLabel}</span>
        <span className={T.tiny} style={{ color: toColor }}>
          {toLabel}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-stretch gap-4 @2xl:flex-row @2xl:items-center @2xl:gap-7">
        <button
          type="button"
          onClick={onFrom}
          disabled={!onFrom}
          className="group shrink-0 text-left disabled:cursor-default"
        >
          <span
            className={`inscription block leading-none text-bone-faint transition-colors ${type} ${
              onFrom ? "group-hover:text-bone-soft" : ""
            }`}
          >
            {from}
          </span>
        </button>

        <div className="relative flex min-h-16 flex-1 items-center justify-center @2xl:min-h-0">
          <span
            aria-hidden
            className="absolute h-16 w-px @2xl:hidden"
            style={{ background: `linear-gradient(to bottom, ${ROAD_FROM}, ${toColor})` }}
          />
          <span
            aria-hidden
            className="absolute hidden h-px w-full @2xl:block"
            style={{
              background: `linear-gradient(to right, ${ROAD_FROM}, #6f6f7e 45%, ${toColor})`,
            }}
          />
          {mark}
        </div>

        <button
          type="button"
          onClick={onTo}
          disabled={!onTo}
          className="group shrink-0 text-left disabled:cursor-default @2xl:text-right"
        >
          <span
            className={`inscription block leading-none text-bone transition-colors ${type} ${
              onTo ? "group-hover:text-patina" : ""
            }`}
          >
            {to}
          </span>
        </button>
      </div>
    </div>
  );
}
