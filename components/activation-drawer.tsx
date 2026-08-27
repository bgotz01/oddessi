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
import ActivationVectors from "@/components/activation-vectors";
import { GRADE_TINT } from "@/components/activation-seasons";
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
 * The order is the argument, and the argument changed once already. It used to
 * open on the THESIS — a paragraph saying that the familiar path and the
 * emerging one pull against each other — on the principle that a claim should
 * arrive before its evidence. The principle was right and the claim was in the
 * wrong form. A reader leaves that paragraph knowing the shape of their
 * situation and nothing about what to practise, because prose is what you
 * reach for when a claim needs a caveat, and this one needs nouns.
 *
 * So the DEVELOPMENT vectors lead: two columns saying what to develop and what
 * to rely on less, drawn from the trajectory rather than from the period, with
 * the PRESSURES beneath them naming what is pushing on those columns now. Then
 * the OPENING and the TRAP as a pair — a period is not good or bad, it is a
 * chance and a specific way of wasting it — and the arenas those play out
 * through.
 *
 * Above the disclosure there are now no sentences at all. Not shortened ones:
 * none. Every claim in the open part of this panel is a noun phrase, because
 * the panel's job is recognition rather than instruction — a reader is looking
 * for their own failure mode in the trap column, and recognition happens at a
 * glance or it does not happen. Six paragraphs of well-written prose, each
 * true, added up to a page that had to be read in order and was therefore not
 * read at all.
 *
 * That cost something real and it is worth naming: "the retreat to what you
 * are already good at feels like maturity rather than avoidance" says more
 * than "Difficulty read as verdict". The sentences are not deleted — they are
 * authored alongside the nouns, and they still travel verbatim to the chat,
 * which is the surface where a paragraph is the right unit.
 *
 * THE MOVE went the same way, for a different reason: three pairs of nouns
 * saying what to develop, sitting directly above a sentence saying to develop
 * it, was the same claim twice at two different lengths.
 *
 * The thesis and the rest of the astrology sit in the evidence disclosure, and
 * they stay prose. That is the one place in the panel where the reader has
 * asked a question — why should I believe this — and an argument is not a
 * thing nouns can make.
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
        // The developmental vectors, which are the claim the panel now leads
        // on. Sent as the same two-column pairs a reader sees, with the
        // emphasis named, so the prose elaborates this person's actual
        // conversions instead of restating the orientation in longer words.
        `DEVELOPMENT VECTORS (rely less \u2192 develop more; from the natal ` +
        `trajectory, NOT from the transit):\n` +
        r.vectors.vectors
          .map(
            (x) =>
              `  ${x.from} \u2192 ${x.into} — ${x.fromDetail} \u2192 ${x.into}` +
              `${x.body ? ` (this chart's own, via ${x.body})` : ""}`,
          )
          .join("\n") +
        `\nEMPHASIS: ${r.vectors.emphasis} — ${r.vectors.note}\n` +
        `PRESSURES: ${r.vectors.pressures.map((p) => `${p.planet || "nodal rhythm"} · ${p.process}`).join("; ")}\n` +
        `ARENAS: ${r.arenas.join(", ")}\n` +
        `KIND OF CHANGE IN THEM: ${r.arenasSummary}\n` +
        `MAY BECOME CONCRETE THROUGH: ${r.eventPossibilities.join("; ")}\n` +
        (r.convergence
          ? `CONVERGENCE: ${r.convergence.thesis}\nTENSIONS: ${r.convergence.tensions.join("; ")}\n`
          : "") +
        `\nWrite it as one continuous reading. Build it around the development vectors — they ` +
        `are what the chart is asking this person to develop, and the period only changes which ` +
        `end of them is under pressure. Be concrete about the arenas without predicting ` +
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
      {/* `@container` is what makes the `@md:` rules below live at all. Without
          it the two-column pairings — opening beside trap, label beside
          evidence — silently fell back to stacking at every width, which is
          why the panel read as one long column no matter how wide it got. */}
      <aside className="@container relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-rule bg-surface px-10 py-10">
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

        {/* The answer, in the form the question was asked in. */}
        <ActivationVectors v={r.vectors} terse />

        {/* A period is not good or bad. It is a chance, and a specific way of
            wasting it — which is the more useful half.
            Two stacks of three rather than two paragraphs. The sentences are
            still authored and still travel to the chat; what a reader wants
            from this pair is to recognise their own failure mode in it, and
            recognition happens at a glance or not at all. */}
        <div className="mt-11 grid gap-x-10 gap-y-8 @md:grid-cols-2">
          <div>
            <p className={`${T.tiny} text-patina`}>Opening</p>
            <ul className="mt-4 space-y-2.5">
              {r.openings.map((x) => (
                <li key={x} className="text-[0.9375rem] leading-snug text-bone">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`${T.tiny} text-ember`}>Trap</p>
            <ul className="mt-4 space-y-2.5">
              {r.traps.map((x) => (
                <li
                  key={x}
                  className="text-[0.9375rem] leading-snug text-bone-soft"
                >
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Where. The sentence that used to name the kind of change working in
            these areas has gone: the process is already named three times over
            — in the title, in the pressures, in the opening — and a fourth
            saying it in a clause was the panel explaining itself. */}
        <Block title="Arenas">
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
          <p className={`${T.tiny} mt-4 text-bone-faint/70`}>
            Areas, not events
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
              <Row label="The claim">
                {r.thesis.split("\n\n").map((para, i) => (
                  <p key={i} className={`${T.body} ${i ? "mt-3" : ""}`}>
                    {para}
                  </p>
                ))}
              </Row>

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
