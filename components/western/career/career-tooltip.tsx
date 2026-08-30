"use client";

import { useRef, useState } from "react";
import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import {
  CAREER_TARGET_LABEL,
  careerBandLabel,
  careerWindowLabel,
  careerWindowMeaning,
  processOf,
  type CareerContact,
  type CareerWindow,
  type CareerWindowGrade,
} from "@/lib/career";
import { CAREER_GRADE_TINT } from "@/components/western/career/career-ui";
import { T } from "@/components/western/growth/growth-ui";

/**
 * What the strip says when you point at it.
 *
 * The bars carried a `title` attribute, which is the wrong tool twice over: it
 * waits about a second before appearing, and on a strip you read by sweeping
 * across it the answer arrives after you have moved on — and it renders in the
 * operating system's styling, which on this page looks like a bug. This opens
 * on `mouseenter` with no delay, in the same vocabulary as everything around
 * it.
 *
 * The question it answers is WHAT IS ACTUALLY ACTIVE. A bar reading
 * "Convergence, ages 44–47" says a season exists and nothing about what is in
 * it, which is the first thing anyone asks of a band on a timeline. The
 * contacts are the answer, listed with the part of the architecture each one
 * addresses — the same nouns the reading panel uses, so the tooltip is a
 * shorter version of the panel rather than a second vocabulary for it.
 */

export type CareerTipContent =
  | { kind: "window"; window: CareerWindow }
  | { kind: "grade"; grade: CareerWindowGrade };

export interface CareerTip {
  content: CareerTipContent;
  /** Pixels from the left edge of the frame. */
  x: number;
  /** Pixels from the frame's top — the tooltip sits against this edge. */
  y: number;
  /** Which side of `y` to open on. */
  place: "above" | "below";
}

/** Half the tooltip's width, so it stays off both edges in pure CSS. */
const HALF = 176;

/**
 * Roughly how tall the panel gets, for deciding which way to open.
 *
 * An ESTIMATE, deliberately. Knowing the real height means rendering the
 * tooltip, measuring it and flipping — a layout pass on every hover, which on
 * a strip of two-pixel bars costs a frame and shows as a jump. A constant that
 * is a little generous costs nothing and is wrong only in the safe direction:
 * it opens downward slightly earlier than it strictly must.
 *
 * It is only meaningful because the panel is kept SHORT, and it is CALIBRATED
 * against the rendered article rather than guessed: at five contact rows and
 * four processes wrapped over two lines this reached 376px, which fits neither
 * above nor below a strip sitting mid-screen in a 720px window. A tooltip that
 * has outgrown every position available to it is a panel, and the panel
 * already exists one click away in the chart sidebar. Trimmed to three
 * contacts it measures ~334, and this constant sits just above that.
 *
 * If the content grows a row, re-measure. A number that has drifted below the
 * real height fails in exactly one way — it opens upward when there is no room
 * upward, and the answer to the reader's hover renders off the top of the
 * screen.
 */
const ESTIMATED_HEIGHT = 360;

/**
 * The pointer plumbing, generic over what is being pointed at.
 *
 * Anchored to the ELEMENT under the pointer, never to the pointer itself. A
 * tooltip that tracks the cursor jitters on a strip made of two-pixel bars and
 * makes the reader feel they have to hold still; anchoring to the bar's own
 * centre means it appears in one place and stays there for as long as that bar
 * is the answer.
 *
 * Generic because the Growth strip has a twin of this hook bound to its own
 * content union. Two copies of pointer maths are the kind that drift — one
 * gains an edge case and the other keeps the bug — and typing this one by its
 * content means unifying them later is a move rather than a rewrite.
 */
export function useTip<T>() {
  const frame = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{
    content: T;
    x: number;
    y: number;
    place: "above" | "below";
  } | null>(null);

  // Typed by the one property it reads, so the same opener serves
  // `onMouseEnter` and `onFocus`. Binding it to `React.MouseEvent` meant the
  // strip could only be interrogated with a pointer, and the bars are real
  // buttons that a keyboard can already reach.
  const show =
    (content: T) =>
    (event: { currentTarget: HTMLElement }) => {
      const box = frame.current?.getBoundingClientRect();
      if (!box) return;
      const el = event.currentTarget.getBoundingClientRect();
      // Above where there is room, because the chart is what sits above the
      // strip and covering part of a curve is cheaper than covering the
      // reading — and downward otherwise, because "above" off the top of the
      // window renders the answer to the reader's hover half off-screen.
      //
      // Decided here rather than passed in by the caller. The Growth twin lets
      // each call site name its side, which is a decision made once at the
      // keyboard against a layout that then moves: the key on this strip was
      // given a hardcoded "below" and sits low enough on the page that below
      // was exactly wrong, opening a panel 222px past the bottom of the
      // window. The pointer knows where it is; a call site does not.
      const place = el.top > ESTIMATED_HEIGHT + 16 ? "above" : "below";
      setTip({
        content,
        x: el.left + el.width / 2 - box.left,
        y: (place === "below" ? el.bottom : el.top) - box.top,
        place,
      });
    };

  return { frame, tip, show, clear: () => setTip(null) };
}

export default function CareerTooltip({ tip }: { tip: CareerTip }) {
  return (
    <div
      // Never a hover target itself: the pointer is on the bar, and a tooltip
      // that can take the pointer flickers as it appears under the cursor.
      className={`pointer-events-none absolute z-30 w-[22rem] -translate-x-1/2 border border-rule bg-surface-alt px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.55)] ${
        tip.place === "below" ? "" : "-translate-y-full"
      }`}
      style={{
        // Clamped in CSS rather than measured, so it needs no layout pass and
        // cannot lag a fast pointer by a frame.
        left: `clamp(${HALF}px, ${tip.x}px, calc(100% - ${HALF}px))`,
        top: tip.place === "below" ? tip.y + 10 : tip.y - 10,
      }}
    >
      {tip.content.kind === "window" ? (
        <WindowTip w={tip.content.window} />
      ) : (
        <GradeTip g={tip.content.grade} />
      )}
    </div>
  );
}

/** "age 41–42", collapsing a window that opens and closes inside one year. */
function ages(from: number, to: number): string {
  const a = Math.round(from);
  const b = Math.round(to);
  return a === b ? `age ${a}` : `age ${a}–${b}`;
}

/**
 * How many contacts the tooltip will list before it stops being one.
 *
 * A busy convergence carries eleven, and eleven rows in a hover panel is the
 * reading panel with worse typography. The strongest three, and a count of
 * what was left — the reader who wants all of them clicks.
 */
const SHOWN_CONTACTS = 3;

/** Processes named before the line wraps and the panel grows a row. */
const SHOWN_PROCESSES = 3;

function ContactRow({ contact }: { contact: CareerContact }) {
  return (
    <li className="mt-2 flex items-baseline gap-2.5">
      <span
        className="glyph shrink-0 text-[0.9375rem]"
        style={{ color: contact.color ?? bodyColor(contact.planet) }}
      >
        {bodyGlyph(contact.planet)}
      </span>
      <span className="min-w-0 text-[0.8125rem] leading-snug text-bone-soft">
        <span className="text-bone">
          {contact.planet}{" "}
          {contact.aspect ? contact.aspect.toLowerCase() : "through"}{" "}
          {contact.target}
        </span>
        <span className="text-bone-faint">
          {" "}
          — {CAREER_TARGET_LABEL[contact.targetKind].toLowerCase()}
        </span>
      </span>
    </li>
  );
}

function WindowTip({ w }: { w: CareerWindow }) {
  // Strongest first, which is the order the reading itself is written in: the
  // lead contact is the one the period is named after, so a tooltip that
  // listed them by date would bury it somewhere in the middle.
  const contacts = [...w.contacts].sort(
    (a, b) =>
      b.targetRelevance * b.aspectRelevance -
      a.targetRelevance * a.aspectRelevance,
  );
  const shown = contacts.slice(0, SHOWN_CONTACTS);
  const hidden = contacts.length - shown.length;
  const planets = [...new Set(w.contacts.map((c) => c.planet))];

  return (
    <>
      <p className="flex items-baseline justify-between gap-3">
        <span className={`${T.tiny} text-bone-faint`}>
          {ages(w.ageStart, w.ageEnd)}
        </span>
        <span className={`${T.tiny} text-bone-faint`}>
          {w.start.slice(0, 7)} → {w.end.slice(0, 7)}
        </span>
      </p>

      {/* The panel's vocabulary, not a second one. The grade names the
          configuration; the processes name what is doing the work. Both are
          the facts the reading below the chart leads with. */}
      <p
        className="mt-2 text-[1rem] font-light"
        style={{ color: CAREER_GRADE_TINT[w.grade] }}
      >
        {careerWindowLabel(w.grade)}
      </p>
      <p className={`${T.tiny} mt-1.5 text-bone-soft`}>
        {w.processes.slice(0, SHOWN_PROCESSES).join(" + ")}
        {w.processes.length > SHOWN_PROCESSES
          ? ` +${w.processes.length - SHOWN_PROCESSES}`
          : ""}
      </p>
      <p className={`${T.tiny} mt-1 text-bone-faint`}>
        peaks at {w.activation} · {careerBandLabel(w.activation).toLowerCase()}
        {" · "}
        {planets.length} independent {planets.length === 1 ? "body" : "bodies"}
      </p>

      {/* What is actually active — the reason the tooltip exists. */}
      <ul className="mt-3 border-t border-rule pt-2">
        {shown.map((contact) => (
          <ContactRow key={contact.id} contact={contact} />
        ))}
        {hidden > 0 ? (
          <li className={`${T.tiny} mt-2.5 text-bone-faint/70`}>
            and {hidden} more
          </li>
        ) : null}
      </ul>

      <p className={`${T.tiny} mt-3.5 border-t border-rule pt-3 text-bone-faint`}>
        click to inspect all transits
      </p>
    </>
  );
}

/**
 * What a grade claims, on hover over the key.
 *
 * The three words on the key are the page's loudest vocabulary and the easiest
 * to misread: a turning point invites a reader to hear a promotion, when the
 * same configuration covers a resignation and a collapse.
 * The closing line says what the grades are every time, rather than once in a
 * modal nobody has opened yet.
 */
function GradeTip({ g }: { g: CareerWindowGrade }) {
  return (
    <>
      <p
        className="text-[1rem] font-light"
        style={{ color: CAREER_GRADE_TINT[g] }}
      >
        {careerWindowLabel(g)}
      </p>
      <p className="mt-2.5 text-[0.875rem] leading-snug text-bone-soft">
        {careerWindowMeaning(g)}
      </p>
      <p className={`${T.tiny} mt-4 border-t border-rule pt-3 text-bone-faint`}>
        a configuration of evidence, not a forecast
      </p>
    </>
  );
}

/** Re-exported so the strip can label a process without a second table. */
export { processOf };
