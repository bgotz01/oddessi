//components/activation-tooltip.tsx

"use client";

import { useRef, useState } from "react";
import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import {
  beatLabel,
  gradeLabel,
  gradeMeaning,
  kindLabel,
  orientationFrame,
  type Activation,
  type ActivationWindow,
  type Grade,
  type NodalBeat,
} from "@/lib/growth";
import { GRADE_TINT } from "@/components/western/growth/activation/activation-seasons";
import { T } from "@/components/western/growth/growth-ui";

/**
 * What the map says when you point at something.
 *
 * It replaced the browser's `title` attribute, which is the wrong tool twice
 * over: it waits about a second before appearing, which on a chart you scan by
 * sweeping across it means the answer arrives after you have moved on, and it
 * renders in the operating system's styling, which on this page looked like a
 * bug. This opens on `mouseenter` with no delay and is built out of the same
 * vocabulary as everything around it.
 *
 * The content answers one question per row, in the order the eye wants them:
 * WHO is transiting, WHAT it means, WHAT it is striking, WHERE the planet is
 * standing while it strikes, and WHEN. The fourth is the one the map could not
 * previously answer at all — a bar reading "Uranus, conjunct your North Node's
 * ruler" says what is being hit and nothing about where Uranus is, which is
 * the first thing anyone asks of a transit.
 */

export type TipContent =
  | { kind: "activation"; activation: Activation }
  | { kind: "beat"; beat: NodalBeat }
  | { kind: "grade"; grade: Grade }
  | { kind: "window"; window: ActivationWindow };

export interface Tip {
  content: TipContent;
  /** Pixels from the left edge of the map. */
  x: number;
  /** Pixels from the top of the map — the tooltip sits against this edge. */
  y: number;
  /**
   * Which side of `y` to open on. Above, unless there is nothing above.
   *
   * The strip is the first thing in the component now, so a tooltip opening
   * upward from it opens off the top of the scroller and gets clipped — the
   * answer to the reader's hover rendered half off-screen. Anything in the top
   * band of the drawing asks for "below" instead, which is a decision only the
   * caller can make: this component knows the pointer's position and nothing
   * about what is above it.
   */
  place?: "above" | "below";
}

/** Half the tooltip's width, so it can be kept off both edges in pure CSS. */
const HALF = 168;

/**
 * The pointer plumbing, once, for every drawing that wants a tooltip.
 *
 * Both the strip and the evidence lanes need the same four things — a frame to
 * measure against, the current tip, an opener bound to whatever is under the
 * pointer, and a way to close on leaving — and both had their own copy while
 * they were one component. The copies are the kind that drift: one of them
 * gains an edge case and the other keeps the bug.
 *
 * Anchored to the ELEMENT under the pointer, never to the pointer. A tooltip
 * that tracks the cursor jitters on a drawing made of two-pixel bars and makes
 * the reader feel they have to hold still; anchoring to the bar's own centre
 * means it appears in one place and stays there for as long as that bar is the
 * answer.
 */
export function useTip() {
  const frame = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);

  const show =
    (content: TipContent, place: "above" | "below" = "above") =>
      (e: React.MouseEvent<HTMLElement>) => {
        const box = frame.current?.getBoundingClientRect();
        if (!box) return;
        const el = e.currentTarget.getBoundingClientRect();
        setTip({
          content,
          x: el.left + el.width / 2 - box.left,
          y: (place === "below" ? el.bottom : el.top) - box.top,
          place,
        });
      };

  return { frame, tip, show, clear: () => setTip(null) };
}

export default function ActivationTooltip({ tip }: { tip: Tip }) {
  return (
    <div
      // Never a hover target itself: the pointer is on the bar, and a tooltip
      // that can take the pointer flickers as it appears under the cursor.
      className={`pointer-events-none absolute z-30 w-[21rem] -translate-x-1/2 border border-rule bg-surface-alt px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.55)] ${tip.place === "below" ? "" : "-translate-y-full"
        }`}
      style={{
        // Clamped in CSS rather than measured, so it needs no layout pass and
        // cannot lag a fast pointer by a frame.
        left: `clamp(${HALF}px, ${tip.x}px, calc(100% - ${HALF}px))`,
        top: tip.place === "below" ? tip.y + 10 : tip.y - 10,
      }}
    >
      {tip.content.kind === "activation" ? (
        <ActivationTip a={tip.content.activation} />
      ) : tip.content.kind === "beat" ? (
        <BeatTip b={tip.content.beat} />
      ) : tip.content.kind === "grade" ? (
        <GradeTip g={tip.content.grade} />
      ) : (
        <WindowTip w={tip.content.window} />
      )}
    </div>
  );
}

/** "age 41–42", collapsing a contact that opens and closes inside one year. */
function ages(from: number, to: number): string {
  const a = Math.round(from);
  const b = Math.round(to);
  return a === b ? `age ${a}` : `age ${a}–${b}`;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="mt-2.5 flex gap-3">
      <span className={`${T.tiny} w-8 shrink-0 pt-0.5 text-bone-faint/70`}>
        {label}
      </span>
      <span className="text-[0.875rem] leading-snug text-bone-soft">
        {children}
      </span>
    </p>
  );
}

function ActivationTip({ a }: { a: Activation }) {
  return (
    <>
      <p className="flex flex-wrap items-baseline gap-x-2.5">
        <span
          className="glyph text-[1.125rem]"
          style={{ color: a.color ?? bodyColor(a.planet) }}
        >
          {bodyGlyph(a.planet)}
        </span>
        <span className="text-[1rem] font-light text-bone">{a.planet}</span>
        {a.aspect ? (
          <span className={`${T.tiny} text-bone-faint`}>{a.aspect}</span>
        ) : null}
        <span
          className={`${T.tiny} ml-auto ${a.direct ? "text-ember" : "text-bone-faint/70"}`}
        >
          {a.direct ? "on the axis" : kindLabel(a.kind)}
        </span>
      </p>

      <p className="mt-3 text-[1rem] leading-snug text-bone">{a.headline}</p>

      <Row label="on">{a.target}</Row>
      <Row label="in">
        {a.through ? (
          <>
            House {a.through.house}{" "}
            <span className="text-bone-faint">— {a.through.title}</span>
          </>
        ) : (
          <span className="text-bone-faint">
            outside the cached house transits
          </span>
        )}
      </Row>

      <p className={`${T.tiny} mt-4 border-t border-rule pt-3 text-bone-faint`}>
        {ages(a.ageStart, a.ageEnd)} · {a.start.slice(0, 4)}–{a.end.slice(0, 4)}
        {a.segments.length > 1 ? ` · ${a.segments.length - 1}× retrograde` : ""}
      </p>
    </>
  );
}

function BeatTip({ b }: { b: NodalBeat }) {
  return (
    <>
      {/* The plain name leads and the technical one follows it.
          "Nodal square" is precise and means nothing to almost anyone; the
          checkpoint is the part a reader can use, and the two together teach
          the term to whoever wants it. */}
      <p className="flex items-baseline justify-between gap-3">
        <span className="text-[1rem] font-light text-bone">
          Cycle checkpoint
        </span>
        <span className={`${T.tiny} text-bone-faint`}>age {Math.round(b.age)}</span>
      </p>
      <p className={`${T.tiny} mt-1.5 text-bone-faint`}>
        {beatLabel(b.kind).toLowerCase()} · the same ages for everybody
      </p>
      <p className={`${T.tiny} mt-2 text-bone-faint`}>
        season {b.windowStart.slice(0, 7)} → {b.windowEnd.slice(0, 7)}
      </p>
      {/* Trimmed: the beat readings run to several sentences and the full text
          is a paragraph, not a tooltip. The drawer carries the rest.
          The trailing punctuation is normalised rather than appended — a
          reading whose second sentence is also its last already ends in a full
          stop, and adding one produced "belongs to neither pole..". */}
      <p className="mt-3 text-[0.875rem] leading-snug text-bone-soft">
        {b.reading.split(". ").slice(0, 2).join(". ").replace(/\.*$/, ".")}
      </p>
    </>
  );
}

/**
 * What a grade claims, on hover.
 *
 * The four words on the key are the page's loudest vocabulary and the easiest
 * to misread: "Turning point" invites a reader to hear a prophecy, and
 * "Quiet" invites them to hear that a decade of their life did not count.
 * Both are statements about how much independent evidence converges on one
 * stretch, and the closing line says so every time rather than once in a
 * footnote nobody scrolls to.
 */
function GradeTip({ g }: { g: Grade }) {
  return (
    <>
      <p className="text-[1rem] font-light" style={{ color: GRADE_TINT[g] }}>
        {gradeLabel(g)}
      </p>
      <p className="mt-2.5 text-[0.875rem] leading-snug text-bone-soft">
        {gradeMeaning(g)}
      </p>
      <p className={`${T.tiny} mt-4 border-t border-rule pt-3 text-bone-faint`}>
        a count of converging evidence, not a forecast
      </p>
    </>
  );
}

function WindowTip({ w }: { w: ActivationWindow }) {
  const planets = [...new Set(w.activations.map((a) => a.planet))];
  return (
    <>
      <p className="flex items-baseline justify-between gap-3">
        <span className={`${T.tiny} text-bone-faint`}>
          {ages(w.ageStart, w.ageEnd)}
        </span>
        <span className={`${T.tiny} text-bone-faint`}>
          {w.start.slice(0, 4)}–{w.end.slice(0, 4)}
        </span>
      </p>

      {/* The panel's vocabulary, not a second one. This led with a composed
          title and a hedged classification — "Transformation · Pressure to
          Change", "Potential turning point" — which is three names for one
          season across three surfaces of the same page. */}
      <p className="mt-2 flex flex-wrap items-baseline gap-x-2.5">
        <span
          className="text-[1rem] font-light"
          style={{ color: GRADE_TINT[w.grade] }}
        >
          {gradeLabel(w.grade)}
        </span>
        <span className="text-[1rem] font-light text-bone-soft">
          · {orientationFrame(w.orientation).short}
        </span>
      </p>
      <p className={`${T.tiny} mt-1.5 text-bone-faint`}>
        intensity {w.activation} / 100
      </p>

      <p className="mt-3 text-[0.875rem] leading-snug text-bone-soft">
        {orientationFrame(w.orientation).plain}
      </p>

      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        {planets.map((p) => (
          <span
            key={p}
            className="flex items-baseline gap-1.5 text-[0.8125rem] text-bone-soft"
          >
            <span className="glyph text-[0.9375rem]" style={{ color: bodyColor(p) }}>
              {bodyGlyph(p)}
            </span>
            {p}
          </span>
        ))}
        {w.beats.length ? (
          <span className={`${T.tiny} text-patina`}>cycle checkpoint</span>
        ) : null}
      </p>
      <p className={`${T.tiny} mt-4 border-t border-rule pt-3 text-bone-faint`}>
        click to read it below
      </p>
    </>
  );
}
