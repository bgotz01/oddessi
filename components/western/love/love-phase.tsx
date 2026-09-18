//components/western/love/love-phase.tsx
"use client";

import {
  LOVE_PHASES,
  LOVE_PHASE_LABEL,
  LOVE_PHASE_MEANING,
  LOVE_STRENGTH_LABEL,
  LOVE_WINDOW_LABEL,
  interpretLoveWindow,
  type LovePhase,
  type LoveTimeline,
  type LoveWindow,
} from "@/lib/love";
import { T } from "@/components/western/growth/growth-ui";
import { LOVE_MODE_TINT } from "@/components/western/love/love-ui";

/**
 * Where the chart stands, and what is next.
 *
 * The phase scale is drawn as a scale even though the five phases are not
 * ordered by size, and that needs saying rather than defending later: they ARE
 * ordered, by how much of the architecture is under contact — nothing, nothing
 * yet, one window, several, and a commitment window specifically. Reading left
 * to right is reading from less to more. What the position does NOT say is
 * whether more is better, which is what the meaning underneath is for.
 *
 * NOW / NEXT / LATER is three columns because the question is comparative.
 * "Your next window is a Romance one" means very little on its own and a great
 * deal beside "and the one after it is a Commitment one" — the shape of the
 * sequence is the reading, which is the whole argument for a timeline rather
 * than a horoscope.
 */

function Slot({
  kicker,
  window,
  empty,
}: {
  kicker: string;
  window: LoveWindow | null;
  empty: string;
}) {
  if (!window) {
    return (
      <div>
        <p className={`${T.micro} text-bone-faint`}>{kicker}</p>
        <p className={`${T.note} mt-3`}>{empty}</p>
      </div>
    );
  }

  const reading = interpretLoveWindow(window);

  return (
    <div>
      <p className={`${T.micro} text-bone-faint`}>{kicker}</p>
      <p className={`${T.phrase} mt-3 flex items-baseline gap-3`}>
        <span
          aria-hidden
          className="inline-block h-2.5 w-2.5 shrink-0"
          style={{ background: LOVE_MODE_TINT[window.mode] }}
        />
        {LOVE_WINDOW_LABEL[window.kind]}
      </p>
      <p className={`${T.note} mt-1.5`}>
        {reading.dates} · {reading.duration} ·{" "}
        {LOVE_STRENGTH_LABEL[window.strength].toLowerCase()}
      </p>
      <p className={`${T.body} mt-3`}>{reading.development}</p>
    </div>
  );
}

export default function LovePhase({ timeline }: { timeline: LoveTimeline }) {
  const { phase, open, next, later } = timeline;

  return (
    <section>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
        <p className={`${T.micro} text-bone-faint`}>Current phase</p>
        <ul className="flex list-none flex-wrap items-baseline gap-x-5 gap-y-2">
          {/* LOVE_PHASES is ordered most-specific-first because that is the
              order `phaseOf` tests in. Displayed it has to run the other way:
              a scale that reads Defining → Quiet is a scale that descends, and
              a reader takes the leftmost position as the starting point. */}
          {[...LOVE_PHASES].reverse().map((entry: LovePhase) => {
            const active = entry === phase;
            return (
              <li
                key={entry}
                className={
                  active
                    ? "inscription text-[1.0625rem] tracking-[0.12em] text-patina"
                    : `${T.tiny} text-bone-faint/50`
                }
              >
                {LOVE_PHASE_LABEL[entry]}
              </li>
            );
          })}
        </ul>
      </div>
      <p className={`${T.lead} mt-5 max-w-3xl`}>{LOVE_PHASE_MEANING[phase]}</p>

      <div className="mt-14 grid gap-12 md:grid-cols-3">
        <Slot
          kicker="Now"
          // The open window, or the loudest of them where several overlap. The
          // phase line above already says how many there are, so this column
          // does not repeat the count.
          window={open[0] ?? null}
          empty="No window is open. The architecture is not being worked on, which is a description of the sky and not of a life."
        />
        <Slot
          kicker="Next"
          window={next}
          empty="Nothing further ahead inside the computed span."
        />
        <Slot
          kicker="Later"
          window={later}
          empty="—"
        />
      </div>
    </section>
  );
}
