"use client";

import type { ReactNode } from "react";
import { T } from "@/components/western/growth/growth-ui";

/**
 * A road: two terminals with a line between them.
 *
 * Extracted because the Arc and the Conversion are the same claim at two
 * scales — Interpreter → Author and Investigation → Thesis — and drawing them
 * differently made them look like two unrelated ideas. Sharing the figure makes
 * the rhyme visible, which is the point: the second is the first, told in terms
 * of what the person actually does.
 *
 * The terminals are mixed case in the display face. They were `inscription`,
 * which uppercases and tracks to 0.18em, and at hero size that turned a
 * two-word role into something the reader had to spell out.
 *
 * Each end takes an optional `detail` beneath it — the placement behind the
 * Arc's archetypes, for instance — so the provenance sits under the thing it
 * explains instead of in a separate row above the road.
 *
 * The line crosses from the departing end's grey to the arriving end's colour,
 * so direction survives even cropped. On a narrow container it turns vertical
 * and the terminals stack.
 */
export const ROAD_FROM = "#9aa4b6";

export default function GrowthRoad({
  fromLabel,
  toLabel,
  from,
  to,
  fromDetail,
  toDetail,
  fromNotes,
  toNotes,
  toColor,
  mark,
  onFrom,
  onTo,
  size = "large",
  boxed = false,
}: {
  /** The label above each terminal. */
  fromLabel: string;
  toLabel: string;
  from: ReactNode;
  to: ReactNode;
  /** What stands under each terminal — its placement, its provenance. */
  fromDetail?: ReactNode;
  toDetail?: ReactNode;
  /**
   * Boxed only: a second container under each terminal's box, in the same
   * column, so the two read as one stack.
   */
  fromNotes?: ReactNode;
  toNotes?: ReactNode;
  toColor: string;
  /** Optional mark standing on the road — only drawn when it means something. */
  mark?: ReactNode;
  onFrom?: () => void;
  onTo?: () => void;
  /** The Arc is the page's hero; the Conversion is its echo, a step quieter. */
  size?: "large" | "medium";
  /**
   * Put each terminal and its detail in a container of their own, with the
   * label standing above it. The Arc uses this: its terminals carry a full
   * placement underneath, and without an edge around the pair the archetype
   * and its provenance read as two unrelated blocks.
   */
  boxed?: boolean;
}) {
  const type =
    size === "large"
      ? "text-[1.875rem] @3xl:text-[2.25rem]"
      : "text-[1.5rem] @3xl:text-[1.75rem]";

  // Label height + its margin + half the terminal's first line.
  const lineOffset = size === "large" ? "@2xl:mt-[3.4rem]" : "@2xl:mt-[3.05rem]";

  const face = `font-[family-name:var(--font-display)] block leading-tight transition-colors ${type}`;

  const line = (
    <>
      <span
        aria-hidden
        className="absolute top-0 bottom-0 w-px @2xl:hidden"
        style={{ background: `linear-gradient(to bottom, ${ROAD_FROM}, ${toColor})` }}
      />
      <span
        aria-hidden
        className="absolute hidden h-px w-full @2xl:block"
        style={{
          background: `linear-gradient(to right, ${ROAD_FROM}, #6f6f7e 45%, ${toColor})`,
        }}
      />
      {mark ?? (
        <span
          aria-hidden
          className="glyph relative z-10 hidden bg-surface px-2.5 text-[1.125rem] @2xl:block"
          style={{ color: toColor }}
        >
          ▸
        </span>
      )}
    </>
  );

  if (boxed) {
    // One grid, three shared rows — label, terminal, detail — and each
    // container is a subgrid spanning the last two. A terminal that wraps to
    // two lines therefore pushes BOTH details down together, so the archetypes
    // and the placements each begin on one horizontal line across the axis.
    // On a narrow container it is a single column and the rows fall away.
    const box =
      "rounded-sm border bg-surface-alt p-6 @3xl:p-7 @2xl:row-span-2 @2xl:row-start-2 @2xl:grid @2xl:grid-rows-subgrid";

    return (
      <div className="grid grid-cols-1 @2xl:grid-cols-[1fr_minmax(3rem,7rem)_1fr] @2xl:grid-rows-[auto_auto_1fr_auto] @2xl:gap-x-6">
        <p className={`${T.micro} mb-3 text-bone-soft @2xl:col-start-1 @2xl:row-start-1`}>
          {fromLabel}
        </p>
        <div className={`${box} border-rule @2xl:col-start-1`}>
          <button
            type="button"
            onClick={onFrom}
            disabled={!onFrom}
            className="group block w-full self-start text-center disabled:cursor-default"
          >
            <span
              className={`${face} text-bone-soft ${onFrom ? "group-hover:text-bone" : ""}`}
            >
              {from}
            </span>
          </button>
          {fromDetail ? (
            <div className="mt-5 border-t border-rule pt-5">{fromDetail}</div>
          ) : null}
        </div>

        {fromNotes ? (
          <div className="mt-3 rounded-sm border border-rule p-6 @3xl:p-7 @2xl:col-start-1 @2xl:row-start-4">
            {fromNotes}
          </div>
        ) : null}

        <div className="relative flex min-h-14 items-center justify-center @2xl:col-start-2 @2xl:row-span-2 @2xl:row-start-2">
          {line}
        </div>

        <p
          className={`${T.micro} mb-3 @2xl:col-start-3 @2xl:row-start-1`}
          style={{ color: toColor }}
        >
          {toLabel}
        </p>
        <div
          className={`${box} @2xl:col-start-3`}
          style={{ borderColor: `color-mix(in srgb, ${toColor} 45%, transparent)` }}
        >
          <button
            type="button"
            onClick={onTo}
            disabled={!onTo}
            className="group block w-full self-start text-center disabled:cursor-default"
          >
            <span
              className={`${face} text-bone ${onTo ? "group-hover:text-patina" : ""}`}
            >
              {to}
            </span>
          </button>
          {toDetail ? (
            <div className="mt-5 border-t border-rule pt-5">{toDetail}</div>
          ) : null}
        </div>
        {toNotes ? (
          <div
            className="mt-3 rounded-sm border p-6 @3xl:p-7 @2xl:col-start-3 @2xl:row-start-4"
            style={{ borderColor: `color-mix(in srgb, ${toColor} 25%, transparent)` }}
          >
            {toNotes}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-y-5 @2xl:grid-cols-[1fr_minmax(3rem,9rem)_1fr] @2xl:items-start @2xl:gap-x-8">
      <div className="min-w-0">
        <p className={`${T.micro} text-bone-soft`}>{fromLabel}</p>
        <button
          type="button"
          onClick={onFrom}
          disabled={!onFrom}
          className="group mt-3 block text-left disabled:cursor-default"
        >
          <span
            className={`${face} text-bone-soft ${onFrom ? "group-hover:text-bone" : ""}`}
          >
            {from}
          </span>
        </button>
        {fromDetail ? <div className="mt-4">{fromDetail}</div> : null}
      </div>

      {/* Top-aligned rather than centred, so a terminal that wraps to two
          lines does not drag the other one down; the line is pinned to the
          first line of the terminals instead. */}
      <div
        className={`relative flex min-h-14 items-center justify-center self-stretch @2xl:h-px @2xl:min-h-0 @2xl:self-start ${lineOffset}`}
      >
        {line}
      </div>

      <div className="min-w-0 @2xl:text-right">
        <p className={T.micro} style={{ color: toColor }}>
          {toLabel}
        </p>
        <button
          type="button"
          onClick={onTo}
          disabled={!onTo}
          className="group mt-3 block text-left disabled:cursor-default @2xl:ml-auto @2xl:text-right"
        >
          <span
            className={`${face} text-bone ${onTo ? "group-hover:text-patina" : ""}`}
          >
            {to}
          </span>
        </button>
        {toDetail ? <div className="mt-4">{toDetail}</div> : null}
      </div>
    </div>
  );
}
