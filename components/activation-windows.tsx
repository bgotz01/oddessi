//components/activation-windows.tsx

"use client";

import { useState } from "react";
import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import {
  classificationOf,
  kindLabel,
  orientationGloss,
  windowLabel,
  type ActivationWindow,
} from "@/lib/growth";
import { GRADE_TINT } from "@/components/activation-map";
import { T } from "@/components/growth-ui";

/**
 * The windows, in the order they happen.
 *
 * Chronological, and split only into what is still ahead and what has already
 * been lived. An earlier version sorted globally by grade, which put an
 * age-73 turning point above an age-45 convergence and quietly asserted that
 * the louder season was the more relevant one — a ranking, and this page does
 * not rank. It also broke the only reading order that matches the question:
 * the user is asking WHEN IN MY LIFE, and a life runs forwards.
 *
 * The past is kept, collapsed. A trajectory that has been worked on four times
 * already is a different thing to look at than one whose first season is still
 * ahead, and deleting the record would hide that.
 *
 * Deliberately not every window. A life graded quarter by quarter produces
 * dozens, most of them background — one slow planet grinding through a nodal
 * house for a decade with nothing else present — and printing them all would
 * rebuild the transit calendar this page exists instead of.
 *
 * Each row leads with the AGE RANGE rather than the dates, because the
 * question the page answers is "when in my life", and 2036–2039 does not
 * answer that without arithmetic the reader should not have to do.
 */
export default function ActivationWindows({
  windows,
  hidden,
  onOpen,
  selected,
}: {
  windows: ActivationWindow[];
  hidden: number;
  onOpen: (w: ActivationWindow) => void;
  selected: ActivationWindow | null;
}) {
  const [showPast, setShowPast] = useState(false);

  const ordered = [...windows].sort((a, b) => a.ageStart - b.ageStart);
  const ahead = ordered.filter((w) => w.status !== "completed");
  const past = ordered.filter((w) => w.status === "completed");

  if (windows.length === 0) {
    return (
      <p className={`${T.body} mt-10`}>
        Nothing in the cached span rises above background. The trajectory is
        running — it always is — but no two pressures converge on a stretch of
        it.
      </p>
    );
  }

  return (
    <>
      {past.length ? (
        <button
          type="button"
          onClick={() => setShowPast((v) => !v)}
          className={`${T.tiny} mt-10 text-patina-dim transition-colors hover:text-patina`}
        >
          {showPast
            ? "Hide the seasons already lived"
            : `${past.length} season${past.length === 1 ? "" : "s"} already lived — show →`}
        </button>
      ) : null}

      {showPast ? <Group label="Already lived" /> : null}
      {showPast ? <WindowList windows={past} onOpen={onOpen} selected={selected} /> : null}

      <Group label={past.length ? "Now and ahead" : "Ahead"} />
      <WindowList windows={ahead} onOpen={onOpen} selected={selected} />

      {hidden > 0 ? (
        <p className={`${T.note} mt-10`}>
          {hidden} further {hidden === 1 ? "stretch" : "stretches"} graded
          quiet are not listed — one slow planet working on the machinery
          with nothing else present. The map above still draws them.
        </p>
      ) : null}
    </>
  );
}

function Group({ label }: { label: string }) {
  return (
    <p className={`${T.tiny} mt-12 mb-2 border-b border-rule pb-3 text-bone-faint`}>
      {label}
    </p>
  );
}

function WindowList({
  windows,
  onOpen,
  selected,
}: {
  windows: ActivationWindow[];
  onOpen: (w: ActivationWindow) => void;
  selected: ActivationWindow | null;
}) {
  return (
    <>
      <ul className="space-y-px">
        {windows.map((w) => {
          const on = selected?.id === w.id;
          const planets = [...new Set(w.activations.map((a) => a.planet))];
          return (
            <li key={w.id}>
              <button
                type="button"
                onClick={() => onOpen(w)}
                className={`group grid w-full gap-x-8 gap-y-3 border-l-2 py-6 pl-6 text-left transition-colors @2xl:grid-cols-[10rem_1fr] ${
                  on ? "bg-surface-alt" : "hover:bg-surface-alt/50"
                }`}
                style={{ borderColor: GRADE_TINT[w.grade] }}
              >
                <div>
                  <p className="text-[1.375rem] leading-none font-light text-bone">
                    {Math.round(w.ageStart)}
                    {Math.round(w.ageEnd) > Math.round(w.ageStart)
                      ? `–${Math.round(w.ageEnd)}`
                      : ""}
                  </p>
                  <p className={`${T.tiny} mt-2 text-bone-faint`}>
                    {w.start.slice(0, 4)}–{w.end.slice(0, 4)}
                  </p>
                  {/* The index and the grade, in that order and as separate
                      claims. How much is happening, then what configuration
                      is happening. Neither ranks the other. */}
                  <p className={`${T.tiny} mt-3 text-bone-soft`}>
                    Intensity{" "}
                    <span className="text-bone">{w.activation}</span> / 100
                  </p>
                  <p
                    className={`${T.tiny} mt-1.5`}
                    style={{ color: GRADE_TINT[w.grade] }}
                  >
                    {classificationOf(w.grade)}
                  </p>
                  {w.status === "active" ? (
                    <p className={`${T.tiny} mt-1.5 text-bone`}>in force now</p>
                  ) : null}
                </div>

                <div>
                  {/* The season's own claim, above the mechanics.
                      Without it a row says "Pluto and Saturn are active" and
                      leaves the reader to work out which way that points —
                      which is the only thing they came to find out, and the
                      one step that connects this page back to the trajectory
                      rather than leaving it a display of astrology parts. */}
                  <p className="text-[1.25rem] leading-tight font-light text-bone">
                    {windowLabel(w).label}
                  </p>
                  <p className={`${T.note} mt-1.5`}>
                    {orientationGloss(w.orientation)}
                  </p>

                  {/* What is activating it, and what each one is doing. */}
                  <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {planets.map((p) => (
                      <span
                        key={p}
                        className="flex items-baseline gap-1.5 text-[0.9375rem] text-bone-soft"
                      >
                        <span
                          className="glyph text-[1rem]"
                          style={{ color: bodyColor(p) }}
                        >
                          {bodyGlyph(p)}
                        </span>
                        {p}
                      </span>
                    ))}
                    {w.beats.map((b) => (
                      <span
                        key={b.date}
                        className={`${T.tiny} text-patina`}
                      >
                        nodal beat
                      </span>
                    ))}
                  </p>

                  {/* The headline claims, direct ones first — the model has
                      already ranked addresses, so a direct hit leads. */}
                  <ul className="mt-4 space-y-1.5">
                    {w.activations
                      .slice()
                      .sort((a, b) => Number(b.direct) - Number(a.direct))
                      .slice(0, 3)
                      .map((a) => (
                        <li
                          key={a.id}
                          className="flex flex-wrap items-baseline gap-x-3 text-[1rem] text-bone"
                        >
                          <span
                            className={`${T.tiny} w-16 shrink-0 ${
                              a.direct ? "text-ember" : "text-bone-faint"
                            }`}
                          >
                            {kindLabel(a.kind)}
                          </span>
                          {a.headline}
                        </li>
                      ))}
                    {w.activations.length > 3 ? (
                      <li className={`${T.tiny} pl-[4.75rem] text-bone-faint`}>
                        + {w.activations.length - 3} more
                      </li>
                    ) : null}
                  </ul>

                  <p
                    className={`${T.tiny} mt-4 text-patina-dim transition-colors group-hover:text-patina`}
                  >
                    Why this window →
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
