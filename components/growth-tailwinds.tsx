//components/growth-tailwinds.tsx

"use client";

import { bodyColor } from "@/lib/bodies";
import { bodyGlyph, signGlyph } from "@/lib/symbols";
import type { Trajectory } from "@/lib/growth";
import { T, type ChapterKey } from "@/components/growth-ui";

/**
 * 04 · Tailwinds — what is already on your side.
 *
 * Every earlier version of this page covered what the chart is leaving, what it
 * is reaching for and what resists, and nothing at all about what helps. That
 * left the reading lopsided in a way no chart deserves.
 *
 * One caution the section states out loud: the node's ruler and Jupiter always
 * exist, so this list is never empty — which means its LENGTH measures nothing.
 * What is worth reading is which kinds are present, not how many.
 */
export default function GrowthTailwinds({
  t,
  onOpen,
}: {
  t: Trajectory;
  onOpen: (chapter: ChapterKey) => void;
}) {
  return (
    <section className="@container">
      <button
        type="button"
        onClick={() => onOpen("tailwinds")}
        className="group block text-left"
      >
        <p className={`${T.tiny} text-patina-dim`}>04 · Resources</p>
        <p className="inscription mt-5 text-[1.5rem] leading-tight text-bone">
          What you can recruit
        </p>
      </button>

      <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-bone-soft">
        Parts of the chart with a stake in the direction. They do not all{" "}
        <span className="text-bone">help</span> — only a soft aspect to the axis
        is evidence the move is easier. The rest are routes, shared ground, or a
        body fused with where you are going, which is alignment rather than
        ease. Each one says which it is.
      </p>

      {/* A field, not a grid of cards. Boxing five placements would rebuild
          exactly the dashboard this page spent its whole life escaping — and
          the KIND is the claim here, so it leads each entry. "Jupiter exists"
          and "Venus conjunct the North Node" are not remotely the same
          statement, and a uniform card makes them look like they are. */}
      <ul className="mt-12 space-y-9">
        {t.tailwinds.map((w) => (
          <li key={w.body} className="grid gap-x-10 gap-y-2 @2xl:grid-cols-[8rem_1fr]">
            <p
              className={`${T.tiny} ${w.assists ? "text-patina" : "text-bone-faint"}`}
            >
              {w.label}
              {w.assists ? null : (
                <span className="mt-1 block text-bone-faint/70">relation</span>
              )}
            </p>
            <div>
              <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span
                  className="glyph text-[1.125rem]"
                  style={{ color: bodyColor(w.body) }}
                >
                  {bodyGlyph(w.body)}
                </span>
                <span className="text-[1.0625rem] font-light text-bone">
                  {w.body}
                </span>
                <span className="glyph text-[0.9375rem] text-bone-soft">
                  {signGlyph(w.sign)}
                </span>
                <span className="text-[0.9375rem] text-bone-soft">
                  {w.sign} {w.degree}
                  {w.house ? ` · H${w.house}` : ""}
                </span>
              </p>
              <p className="mt-2 text-[1rem] leading-relaxed text-bone-faint">
                {w.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>

    </section>
  );
}
