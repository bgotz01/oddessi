//components/activation-reading.tsx

"use client";

import { useState } from "react";
import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import type { ActivationCell, ActivationNow, ActivationWindow } from "@/lib/growth";
import { GRADE_TINT, pressureTint } from "@/components/western/growth/activation/activation-seasons";
import { T } from "@/components/western/growth/growth-ui";

/**
 * The instrument panel, standing beside the chart.
 *
 * Five values for whichever season is in focus, read top to bottom in a column
 * narrow enough to sit next to the line it describes. It was a horizontal row
 * under the chart, which meant the answer and the evidence for it could never
 * be looked at together — the reader clicked a bar, the panel changed
 * somewhere below the fold, and they scrolled back up to see which bar they
 * had clicked.
 *
 *   PRESSURE   how hard the direction is pressed, with a meter. The note
 *              says WHICH number it is — today's value for the season in
 *              force, the season's own peak for any other
 *   DIRECTION  which way it points — Forward, Return, Crossroads
 *   TREND      where the pressure is going, and where its peak falls
 *   SEASON     what configuration those signals form
 *   WINDOW     how long it stays relevant
 *
 * PRESSURE and DIRECTION are independent and the panel never joins them. A
 * high number says a great deal is converging on the growth direction; it says
 * nothing whatever about whether the reader is travelling it. The astrology
 * cannot see a biography, so the panel does not imply one — see the caveat
 * under "Why this reading".
 *
 * PURELY PRESENTATIONAL. Every word except the five field labels comes out of
 * `readActivationNow` in `lib/growth`; this file chooses no vocabulary, applies
 * no rule and looks nothing up.
 */

/**
 * One reading: label, value, and the evidence for it in small type.
 *
 * Four of the five are the same weight on purpose. They are four different
 * KINDS of statement — a direction, a slope, a configuration, a duration — and
 * none is larger than another, so ranking them by size would invent a
 * hierarchy the model does not have.
 */
function Row({
  label,
  cell,
  tint,
}: {
  label: string;
  cell: ActivationCell;
  tint?: string;
}) {
  return (
    <div>
      <p className={`${T.tiny} text-bone-faint`}>{label}</p>
      <p
        className="mt-1 text-[1.0625rem] leading-tight font-light text-bone"
        style={tint ? { color: tint } : undefined}
      >
        {cell.value}
      </p>
      <p className={`${T.tiny} mt-1 text-bone-faint/70`}>{cell.note}</p>
    </div>
  );
}

/**
 * Pressure, which is the only magnitude on the panel and reads as one.
 *
 * The other four are categories: they have no size, no scale and no zero.
 * This one is a number out of a hundred, so it gets the largest type and the
 * only bar on the panel — and the hierarchy that produces is the correct one,
 * because "how hard is this being pressed" is the question a reader arrives
 * with and the other four qualify the answer.
 */
function Pressure({ cell }: { cell: ActivationCell }) {
  return (
    <div>
      <p className={`${T.tiny} text-bone-faint`}>Pressure</p>
      <p className="mt-1.5 text-[1.75rem] leading-none font-light text-bone">
        {cell.value}
      </p>
      {cell.meter !== undefined ? (
        <span className="mt-3 block h-1.5 w-full bg-rule">
          <span
            className="block h-1.5 transition-[width]"
            style={{
              width: `${cell.meter}%`,
              background: pressureTint(cell.meter),
            }}
          />
        </span>
      ) : null}
      <p className={`${T.tiny} mt-2 text-bone-faint/70`}>{cell.note}</p>
    </div>
  );
}

export default function ActivationReading({
  reading: r,
  year,
  onOpen,
  onNow,
  open,
  onToggle,
}: {
  reading: ActivationNow;
  /** The calendar year of the present. The chart carries the ages. */
  year: number;
  onOpen: (w: ActivationWindow) => void;
  /** Return the panel to the season in force. */
  onNow: () => void;
  /**
   * Collapsed or not — held by the page, not here.
   *
   * Because a click on a bar has to be able to open it. Selecting a season
   * while the panel is shut used to change a reading nobody could see, which
   * is the one state a collapsible panel must never be in.
   */
  open: boolean;
  onToggle: (open: boolean) => void;
}) {
  /** Which driver has been opened onto its evidence. One at a time. */
  const [shown, setShown] = useState<string | null>(null);

  /**
   * The season's colour, on the cells that carry a season's identity.
   *
   * Not on Pressure, which is a different scale and would imply the two move
   * together. The two quiet grades keep bone for their values — those tints
   * are chosen to sit almost invisibly behind a line and read as greyed-out
   * text at this size — but the panel's edge takes the tint whatever the
   * grade, so the column is always visibly tied to the bar that fed it.
   */
  const loud = r.grade === "convergence" || r.grade === "turning-point";
  const tint = GRADE_TINT[r.grade];
  const value = loud ? tint : undefined;

  if (!open) {
    return (
      <aside className="shrink-0 lg:w-10">
        <button
          type="button"
          onClick={() => onToggle(true)}
          className={`${T.tiny} flex w-full items-center justify-center gap-3 border border-rule px-2 py-3 text-bone-faint transition-colors hover:border-bone-faint hover:text-bone lg:h-auto lg:w-10 lg:flex-col lg:py-5`}
          style={{ borderLeftWidth: 2, borderLeftColor: tint }}
        >
          <span aria-hidden>‹</span>
          <span className="lg:[writing-mode:vertical-rl]">
            The reading · {r.pressure.value}
          </span>
        </button>
      </aside>
    );
  }

  return (
    <aside
      className="shrink-0 border-t-2 pt-5 lg:w-72 lg:border-t-0 lg:border-l-2 lg:pt-0 lg:pl-6"
      style={{ borderColor: tint }}
    >
      <div className="flex items-baseline justify-between gap-3">
        {/* The calendar leads and the age follows it. A panel headed "age
            47–54" makes a reader do arithmetic before they know whether the
            period is near; the chart carries both scales anyway. */}
        <p className={`${T.tiny} text-bone-soft`}>
          {r.isNow ? <>Now · {year}</> : <>{r.years}</>}
        </p>
        {/* Visibly a control. It was a single dim character, which is a
            hairline on a page made of hairlines — nobody found it. */}
        <button
          type="button"
          onClick={() => onToggle(false)}
          className={`${T.tiny} shrink-0 border border-rule px-2 py-1 text-bone-faint transition-colors hover:border-bone-faint hover:text-bone`}
          aria-label="Collapse the reading"
        >
          Hide ›
        </button>
      </div>
      <p className={`${T.tiny} mt-1 text-bone-faint/70`}>
        {r.isNow ? "click a bar to read another" : `age ${r.ages}`}
      </p>

      <div className="mt-7">
        <Pressure cell={r.pressure} />

        {/* The four categories, two by two.
            A single column of five made the panel taller than the chart it
            annotates — the reader had to scroll to see a set of one-word
            values — while the right half of it sat empty. These four have
            short values by construction, so they pair. */}
        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6">
          <Row label="Direction" cell={r.direction} tint={value} />
          <Row label="Season" cell={r.season} tint={value} />
          <Row label="Peak" cell={r.peak} />
          {r.span ? <Row label="Window" cell={r.span} /> : null}
        </div>
      </div>

      {/* What is causing it. Each row opens onto its own evidence.
          This is the bottom of the ladder — process word, then what the
          process does, then the contact itself — and it is here rather than
          over the chart because a reader cannot inspect something that moves
          when they reach for it. */}
      {r.drivers.length ? (
        <div className="mt-7 border-t border-rule-faint pt-3">
          <p className={`${T.tiny} text-bone-faint`}>Driven by</p>
          <ul className="mt-1.5">
            {r.drivers.map((d) => {
              // The technical string carries the age, which is what separates
              // two checkpoints of the same kind inside one long season.
              const key = `${d.planet ?? "rhythm"}-${d.label}-${d.technical}`;
              const on = shown === key;
              return (
                <li key={key} className="border-b border-rule-faint/60 last:border-0">
                  <button
                    type="button"
                    onClick={() => setShown(on ? null : key)}
                    className="flex w-full items-baseline justify-between gap-2 py-2 text-left transition-colors hover:text-bone"
                  >
                    <span className="flex items-baseline gap-2">
                      {d.planet ? (
                        <span
                          className="glyph text-[0.9375rem]"
                          style={{ color: bodyColor(d.planet) }}
                        >
                          {bodyGlyph(d.planet)}
                        </span>
                      ) : (
                        <span className="glyph text-[0.9375rem] text-patina">
                          ☊
                        </span>
                      )}
                      <span className="text-[0.875rem] text-bone">
                        {d.label}
                      </span>
                      {d.house ? (
                        <span className={`${T.tiny} text-bone-soft`}>
                          H{d.house}
                        </span>
                      ) : null}
                    </span>
                    {/* Closed, a row is a process and a place. The strength
                        of the evidence is part of the evidence, so it waits
                        with the rest of it. */}
                    <span className={`${T.tiny} shrink-0 text-bone-faint/50`}>
                      {on ? "–" : "+"}
                    </span>
                  </button>
                  {on ? (
                    <div className="pb-3">
                      <p className={`${T.note} text-[0.8125rem]`}>{d.gloss}</p>
                      <p className={`${T.tiny} mt-2 text-bone-faint/70`}>
                        {d.note} · {d.technical}
                      </p>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule-faint pt-4">
        {r.window ? (
          <button
            type="button"
            onClick={() => onOpen(r.window as ActivationWindow)}
            className={`${T.tiny} text-patina-dim transition-colors hover:text-patina`}
          >
            Full reading →
          </button>
        ) : null}
        {r.isNow ? (
          r.next ? (
            <button
              type="button"
              onClick={() => onOpen(r.next!.window)}
              className={`${T.tiny} text-bone-faint transition-colors hover:text-bone`}
            >
              Next · age {r.next.ages}
              {r.next.inYears > 0 ? `, in ${r.next.inYears} years` : ""} →
            </button>
          ) : null
        ) : (
          <button
            type="button"
            onClick={onNow}
            className={`${T.tiny} text-patina-dim transition-colors hover:text-patina`}
          >
            ← back to now
          </button>
        )}
      </div>

      {/* The caveat, stated once and never behind a toggle.
          The disclosure that used to live here held three sentences about the
          reader's situation, then briefly held the vectors. Both are gone: the
          sentences because they described a period without saying what to do
          in it, and the vectors because they now sit under the chart at full
          width, where the pair actually fits on one line. A panel offering to
          expand into the thing already visible below it is a step that exists
          only to be clicked through. */}
      <p className={`${T.tiny} mt-6 leading-relaxed text-bone-faint/70`}>
        {r.detail.caveat}
      </p>
    </aside>
  );
}
