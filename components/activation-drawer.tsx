//components/activation-drawer.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import {
  beatLabel,
  interpretActivationWindow,
  kindLabel,
  type ActivationWindow,
  type Trajectory,
} from "@/lib/growth";
import { GRADE_TINT } from "@/components/activation-map";
import { T } from "@/components/growth-ui";

/**
 * One period, read.
 *
 * This panel used to answer four questions — what is activated, what is
 * activating it, what movement that implies, why the window is exceptional —
 * and every one of them was about astrology rather than about a life. A reader
 * left knowing that Pluto squared their nodes and no better informed about
 * what the period wanted from them.
 *
 * It now presents an `ActivationReading`, composed in `activation-reading.ts`
 * from the trajectory, the part of it being touched, and the mechanism doing
 * the touching. The component decides nothing: it chooses no words, applies no
 * rules, and reaches for no vocabulary table. If a reading looks wrong it is
 * wrong in the model, which is the only place it can be argued with.
 *
 * The order is the argument. THESIS first, because a claim should arrive
 * before its evidence. Then THE MOVE, the only part anyone can act on,
 * deliberately above the mechanics rather than buried under them. Then the
 * OPENING and the TRAP as a pair — a period is not good or bad, it is a chance
 * and a specific way of wasting it. Only after all of that: what is being
 * activated, by what, in which arenas. A reader who stops halfway down has
 * still got the whole answer.
 */
export default function ActivationDrawer({
  window: w,
  trajectory: t,
  chartName,
  onClose,
  onAsk,
}: {
  window: ActivationWindow;
  trajectory: Trajectory;
  chartName: string;
  onClose: () => void;
  onAsk: (text: string) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const r = useMemo(() => interpretActivationWindow(w, t), [w, t]);
  const [evidence, setEvidence] = useState(false);

  const ages = `${Math.round(w.ageStart)}${
    Math.round(w.ageEnd) > Math.round(w.ageStart)
      ? `–${Math.round(w.ageEnd)}`
      : ""
  }`;

  /**
   * The skeleton, handed over whole.
   *
   * The chat is asked to write prose for this person from a reading that is
   * already decided — never to work out what the period means. That is the
   * difference between a product with a position and a fresh horoscope on
   * every visit, and it is why the composed fields travel verbatim.
   */
  const ask = () =>
    onAsk(
      `Read the activation period at age ${ages} (${w.start.slice(0, 7)} to ${w.end.slice(0, 7)}) ` +
        `for ${chartName}. Oddessi has already composed this reading — expand it into prose for ` +
        `this person, do NOT re-derive it or substitute a different interpretation.\n\n` +
        `TITLE: ${r.title} (${r.phrase})\nCLASSIFICATION: ${r.classification}\n` +
        `ACTIVATION INDEX: ${w.activation}/100\nTHESIS: ${r.thesis}\n` +
        `ACTIVATED: ${r.activated}\nMECHANISM: ${r.mechanism}\n` +
        `THE MOVE: ${r.growthMove}\nOPENING: ${r.opening}\nTRAP: ${r.trap}\n` +
        `ARENAS: ${r.arenas.join(", ")}\n` +
        `MAY BECOME CONCRETE THROUGH: ${r.eventPossibilities.join("; ")}\n` +
        (r.convergence
          ? `CONVERGENCE: ${r.convergence.thesis}\nTENSIONS: ${r.convergence.tensions.join("; ")}\n`
          : "") +
        `\nWrite it as one continuous reading. Be concrete about the arenas without predicting ` +
        `events — you may say what a period is likely to become concrete THROUGH, never what ` +
        `will happen. Treat the South Node as competence being converted, never as fault. End on ` +
        `the move and the trap. No scores, no fate.`,
    );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-void/70"
      />
      <aside className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-rule bg-surface px-10 py-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            {/* One identity, not a title plus a subtitle.
                "Transformation · Pull Forward" IS the period's name — the same
                name the curve annotates its peaks with — and the evocative
                phrase that used to sit beneath it was a second, competing
                title for the same thing. It survives inside the reading the
                chat is handed; it does not need to be read twice here. */}
            <p className="inscription text-[1.75rem] leading-tight text-bone">
              {r.title}
            </p>
            <p className={`${T.note} mt-3`}>
              Age {ages} · {w.start.slice(0, 4)}–{w.end.slice(0, 4)}
            </p>
            <p className={`${T.tiny} mt-2 text-bone-faint`}>
              Intensity {w.activation} / 100 ·{" "}
              <span style={{ color: GRADE_TINT[w.grade] }}>
                {r.classification}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`${T.tiny} shrink-0 text-bone-faint transition-colors hover:text-bone`}
          >
            Close ✕
          </button>
        </div>

        {/* The claim, before any of its evidence. */}
        {r.thesis.split("\n\n").map((para, i) => (
          <p
            key={i}
            className={`${i === 0 ? "mt-8" : "mt-4"} text-[1.0625rem] leading-relaxed ${
              i === 0 ? "text-bone" : "text-bone-soft"
            }`}
          >
            {para}
          </p>
        ))}

        {/* The one part that can be acted on, kept above the mechanics. */}
        <section className="mt-11 border-l-2 border-patina-dim py-1 pl-5">
          <p className={`${T.tiny} text-patina`}>The move</p>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-bone">
            {r.growthMove}
          </p>
        </section>

        {/* A period is not good or bad. It is a chance, and a specific way of
            wasting it — which is the more useful half. */}
        <div className="mt-10 grid gap-8 @md:grid-cols-2">
          <div>
            <p className={`${T.tiny} text-bone-faint`}>The opening</p>
            <p className={`${T.body} mt-3`}>{r.opening}</p>
          </div>
          <div>
            <p className={`${T.tiny} text-ember`}>The trap</p>
            <p className={`${T.body} mt-3`}>{r.trap}</p>
          </div>
        </div>

        {/* Where, and what kind of change — not a list of guesses.
            The arenas name the places; the sentence names the process working
            in them, so the two do not repeat each other. */}
        <Block title="Where it may show up">
          <p className="flex flex-wrap gap-x-3 gap-y-2">
            {r.arenas.map((a) => (
              <span
                key={a}
                className={`${T.tiny} border border-rule px-2.5 py-1.5 text-bone-soft`}
              >
                {a}
              </span>
            ))}
          </p>
          <p className={`${T.body} mt-5`}>{r.arenasSummary}</p>
          <p className={`${T.note} mt-3`}>
            Areas, not events. Nothing here says what will happen in them.
          </p>
        </Block>

        {/* The astrology, behind a disclosure.
            It used to run as three consecutive sections — why these belong
            together, what is being activated, how — and they are all evidence
            for one claim, sitting at the same visual weight as the claim
            itself. A reader who never opens this should still have the whole
            human answer; a reader who wants to audit the model should be able
            to, without either of them wading through the other's half. */}
        <section className="mt-12 border-t border-rule pt-6">
          <button
            type="button"
            onClick={() => setEvidence((v) => !v)}
            className={`${T.tiny} flex w-full items-center justify-between text-bone-faint transition-colors hover:text-bone`}
          >
            Why this reading
            <span className="text-[0.875rem]">{evidence ? "\u2212" : "+"}</span>
          </button>

          {evidence ? (
            <div className="mt-7">
              <Row label="Activated">
                <p className={T.body}>{r.activated}</p>
                <ul className="mt-3 space-y-2">
                  {[...w.activations]
                    .sort((a, b) => Number(b.direct) - Number(a.direct))
                    .filter(
                      (a, i, all) =>
                        all.findIndex((b) => b.target === a.target) === i,
                    )
                    .map((a) => (
                      <li
                        key={a.id}
                        className="flex flex-wrap items-baseline gap-x-3"
                      >
                        <span
                          className={`${T.tiny} w-14 shrink-0 ${a.direct ? "text-ember" : "text-bone-faint"}`}
                        >
                          {kindLabel(a.kind)}
                        </span>
                        <span className="text-[0.9375rem] text-bone">
                          {a.target}
                        </span>
                      </li>
                    ))}
                </ul>
              </Row>

              <Row label="Pressure">
                <ul className="space-y-2">
                  {w.activations.map((a) => (
                    <li
                      key={a.id}
                      className="flex flex-wrap items-baseline gap-x-2.5"
                    >
                      <span
                        className="glyph text-[1rem]"
                        style={{ color: a.color ?? bodyColor(a.planet) }}
                      >
                        {bodyGlyph(a.planet)}
                      </span>
                      <span className="text-[0.9375rem] text-bone">
                        {a.planet}
                      </span>
                      <span className={`${T.tiny} text-bone-faint`}>
                        {a.direct ? "direct" : "structural"}
                        {a.through ? ` · H${a.through.house}` : ""} · age{" "}
                        {Math.round(a.ageStart)}
                        {Math.round(a.ageEnd) > Math.round(a.ageStart)
                          ? `–${Math.round(a.ageEnd)}`
                          : ""}
                      </span>
                    </li>
                  ))}
                  {w.beats.map((b) => (
                    <li key={b.date} className={`${T.tiny} text-patina`}>
                      {beatLabel(b.kind)} · age {Math.round(b.age)}
                    </li>
                  ))}
                </ul>
              </Row>

              {r.convergence ? (
                <Row label="Why they converge">
                  <p className={T.body}>{r.convergence.thesis}</p>
                  <ul className="mt-3 space-y-1.5">
                    {r.convergence.tensions.map((x) => (
                      <li key={x} className={`${T.note} flex gap-2.5`}>
                        <span className="text-bone-faint/50">·</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </Row>
              ) : null}

              <Row label="Observations">
                <p className={T.note}>{r.technical}</p>
                <p className={`${T.note} mt-3`}>{w.why}</p>
              </Row>
            </div>
          ) : null}
        </section>

        <button
          type="button"
          onClick={ask}
          className={`${T.micro} mt-10 self-start border border-patina-dim px-5 py-3 text-patina transition-colors hover:border-patina hover:bg-patina-deep`}
        >
          {/* Not "Read this period" — the drawer above IS the reading, and
              inviting someone to read it elsewhere implies everything they
              just read was preparatory. Chat elaborates; it does not
              complete. */}
          Explore this period →
        </button>
      </aside>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 border-t border-rule pt-7">
      <p className={`${T.tiny} mb-5 text-bone-faint`}>{title}</p>
      {children}
    </section>
  );
}

/** One labelled item of evidence inside the disclosure. */
function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7 grid gap-x-6 gap-y-2 first:mt-0 @md:grid-cols-[7rem_1fr]">
      <p className={`${T.tiny} text-bone-faint`}>{label}</p>
      <div>{children}</div>
    </div>
  );
}
