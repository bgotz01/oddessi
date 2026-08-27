//components/activation-method.tsx

"use client";

import { useEffect, useState } from "react";
import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import {
  gradeLabel,
  gradeMeaning,
  orientationFrame,
  processOf,
  ACTIVATION_CAVEAT,
  GRADE_PRECEDENCE,
  INGREDIENT_GLOSS,
  INGREDIENT_LABEL,
  PRIMARY_ORIENTATIONS,
  SHARE_PRESETS,
  SHARES,
  type Ingredient,
} from "@/lib/growth";
import { GRADE_TINT } from "@/components/activation-seasons";
import { useActivationShares } from "@/components/activation-shares";
import { T } from "@/components/growth-ui";

/**
 * How the number is made, where its weights are argued with, and what every
 * word on the page means.
 *
 * All of this used to be printed under the chart: paragraphs on the mean node,
 * on what the index is and is not, on what the grades count. All of it true,
 * none of it read — it is the small print of an instrument, and small print
 * under a chart is either scrolled past or, worse, skimmed by someone who then
 * believes the opposite of what it says.
 *
 * Four tabs, because it answers four different questions and a reader arrives
 * with one of them:
 *
 *   THE INDEX   what the number measures, and what it refuses to claim
 *   WEIGHTS     what it is built from — and the sliders that change it
 *   SEASONS     the other axis: configuration, which is not a magnitude
 *   VOCABULARY  every word the interface uses, defined once
 *
 * The last two are generated from the model's own tables rather than written
 * out here, so a reference that describes vocabulary the code no longer uses
 * is not possible.
 */

const TABS = [
  { id: "index", label: "The index" },
  { id: "weights", label: "Weights" },
  { id: "seasons", label: "Seasons" },
  { id: "vocabulary", label: "Vocabulary" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** The five processes, slowest first — the order the lanes always used. */
const BODIES = ["Pluto", "Neptune", "Uranus", "Saturn", "Jupiter"];

export default function ActivationMethod({
  feed,
}: {
  /** The cached span, which is the honest bound on everything here. */
  feed: { start: string; end: string };
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabId>("index");
  const { shares, edited, total, presetId, set, apply, reset } =
    useActivationShares();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const ingredients = Object.keys(SHARES) as Ingredient[];

  return (
    <>
      {/* A control rather than a link. It sits beside the axis heading and
          opens the panel that decides the numbers below it, which is a
          different kind of act from following a footnote — and an arrow on a
          thing that opens in place points somewhere it does not go. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${T.tiny} shrink-0 border border-rule px-3.5 py-2 text-bone-soft transition-colors hover:border-bone-faint hover:bg-surface-alt hover:text-bone`}
      >
        Index scoring
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-void/80"
          />
          <div className="relative flex max-h-[82vh] w-full max-w-2xl flex-col border border-rule bg-surface">
            <div className="shrink-0 px-10 pt-9">
              <div className="flex items-start justify-between gap-6">
                <p className="inscription text-[1.75rem] leading-tight text-bone">
                  Index scoring
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`${T.micro} shrink-0 text-bone-faint transition-colors hover:text-bone`}
                >
                  Close ✕
                </button>
              </div>

              {/* The tabs carry the modal's height: the scroll is inside the
                  panel below them, so switching never scrolls the reader back
                  to the top of a page they were halfway down. */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-b border-rule">
                {TABS.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setTab(x.id)}
                    className={`${T.micro} -mb-px border-b pb-3 transition-colors ${
                      tab === x.id
                        ? "border-bone text-bone"
                        : "border-transparent text-bone-faint hover:text-bone-soft"
                    }`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-0 grow overflow-y-auto px-10 pt-1 pb-9">
              {tab === "index" ? (
                <>
                  <Section label="What the number is">
                    A constructed index, 0–100, of how densely your growth
                    direction is being activated at a moment. Not a
                    probability, not a percentage of anything, and not a
                    measure of how good, difficult or eventful a period will
                    be.
                  </Section>

                  <Section label="Pressure, not alignment">
                    {ACTIVATION_CAVEAT}
                  </Section>

                  <Section label="What a low reading means">
                    That little is pressing on your growth direction at that
                    moment — nothing more. The direction does not become less
                    true or less yours in a quiet decade, and a long quiet
                    stretch is not a verdict on it. That is what makes the
                    peaks mean anything.
                  </Section>

                  <Section label="How precise it is">
                    Cycle checkpoints use the mean node, about a month off the
                    true one — read them as seasons, never as dates. Transits
                    come from the cached ephemeris, which covers{" "}
                    {feed.start.slice(0, 4)}–{feed.end.slice(0, 4)}; there is
                    nothing outside those years whatever the sky is doing, so a
                    quiet stretch at the edges is the data ending rather than
                    your life.
                  </Section>
                </>
              ) : null}

              {tab === "weights" ? (
                <>
                  {/* Presets first, sliders second.
                      Six sliders is an instrument nobody can play blind, and
                      the differences that matter between weightings are not
                      small ones. Each of these is an argument taken far enough
                      to visibly move the curve, which is the only way to find
                      out whether you hold it. */}
                  <div className="mt-8">
                    <p className={`${T.micro} text-bone-faint`}>
                      Weightings
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SHARE_PRESETS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => apply(p.shares)}
                          className={`${T.micro} border px-3.5 py-2 transition-colors ${
                            presetId === p.id
                              ? "border-patina-dim bg-patina-deep text-patina"
                              : "border-rule text-bone-faint hover:border-bone-faint hover:text-bone"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                      {presetId === null ? (
                        <span
                          className={`${T.micro} border border-rule-faint px-3.5 py-2 text-bone-faint/70`}
                        >
                          Custom
                        </span>
                      ) : null}
                    </div>
                    <p className={`${T.body} mt-3`}>
                      {SHARE_PRESETS.find((p) => p.id === presetId)?.thesis ??
                        "Your own weighting. Every preset above is one argument about what makes a period consequential; this is yours."}
                    </p>
                  </div>

                  <Section label="What it is built from">
                    Six structural facts about the relationship between a
                    transit and your growth axis. Not one of them asks which
                    planet it is — no planet is worth more than another here.
                    Weights change the LINE and never the BARS: a season counts
                    independent pressures and asks whether one lands on the
                    axis itself, which reads no weights at all.
                  </Section>

                  {/* Printing the weights and not letting anyone move them is
                      the worse half of both options: it invites the argument
                      and offers no way to settle it. */}
                  <ul className="mt-5 space-y-4">
                    {ingredients.map((k) => (
                      <li key={k}>
                        <p className="flex items-baseline justify-between gap-4">
                          <span className="text-[1.0625rem] text-bone">
                            {INGREDIENT_LABEL[k]}
                          </span>
                          <span className={`${T.micro} shrink-0 text-bone-soft`}>
                            up to {shares[k]}
                            {shares[k] !== SHARES[k] ? (
                              <span className="text-bone-faint/70">
                                {" "}
                                · was {SHARES[k]}
                              </span>
                            ) : null}
                          </span>
                        </p>
                        <input
                          type="range"
                          min={0}
                          max={50}
                          step={1}
                          value={shares[k]}
                          onChange={(e) => set(k, Number(e.target.value))}
                          className="mt-2 h-1 w-full cursor-pointer appearance-none bg-rule"
                          style={{ accentColor: "var(--color-patina)" }}
                          aria-label={INGREDIENT_LABEL[k]}
                        />
                        <p className={`${T.note} mt-2`}>{INGREDIENT_GLOSS[k]}</p>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 flex flex-wrap items-baseline justify-between gap-4 border-t border-rule-faint pt-3">
                    <span className={`${T.micro} text-bone-faint`}>
                      Total {total}
                      <span className="text-bone-faint/70">
                        {" "}
                        · the index is normalised to 100 whatever this is
                      </span>
                    </span>
                    {edited ? (
                      <button
                        type="button"
                        onClick={reset}
                        className={`${T.micro} text-patina-dim transition-colors hover:text-patina`}
                      >
                        Reset to the shipped weights →
                      </button>
                    ) : null}
                  </p>

                  <p
                    className={`${T.note} mt-4`}
                  >
                    Changes apply to the chart immediately and are kept in this
                    browser only. They move the index and can move a season in
                    or out of the list worth reading; they never change which
                    transits exist.
                  </p>

                  <Section label="Why those numbers">
                    They are judgements, not measurements — which is why they
                    are yours to move. They follow one argument: directness and
                    independent convergence are what separate a direction being
                    reorganised from one merely being busy, so they carry two
                    thirds of the total between them. Multiplicity is small on
                    purpose — it counts contacts where convergence counts
                    distinct planets, and the two rise together nearly always,
                    so paying them equally charged twice for one fact.
                  </Section>

                  <Section label="Why no planet is weighted">
                    The obvious formula — Pluto 30, Saturn 20, Jupiter 10 — is
                    a number nobody can justify, and it would quietly turn this
                    into a ranking of planetary power rather than a reading of
                    your axis. Pluto is not more than Saturn here; it is a
                    different verb, and that difference is the whole
                    interpretation. Which planet it is decides what KIND of
                    change the period is — see Vocabulary — while the six
                    weights above decide only how much is converging. Planet
                    identity does enter the number in one place, as
                    independence rather than importance: convergence counts
                    distinct slow planets, so Saturn and Pluto together score
                    where Saturn making two contacts does not.
                  </Section>

                  <Section label="What counts as pressure">
                    Saturn, Uranus, Neptune and Pluto. Jupiter is read, named
                    and shown as a driver, but it moves no part of this number:
                    it opens and offers rather than forcing, and a contact that
                    can be admired and declined is a different kind of event.
                    It also arrives every few months, so it cannot tell a loud
                    year from a quiet one.
                  </Section>
                </>
              ) : null}

              {tab === "seasons" ? (
                <>
                  <Section label="A different question from the index">
                    The index says how much is converging. A season says what
                    arrangement exists, which has no size and no scale: a dense
                    convergence can implicate your direction more than a
                    narrowly-defined turning point. The two are independent
                    readings of one set of transits, and neither ranks the
                    other.
                  </Section>

                  <ul className="mt-6 space-y-5">
                    {[...GRADE_PRECEDENCE].reverse().map((g) => (
                      <li key={g} className="flex gap-4">
                        <span
                          className="mt-2 h-2 w-4 shrink-0"
                          style={{ background: GRADE_TINT[g] }}
                        />
                        <span>
                          <span
                            className="text-[1.125rem] font-light"
                            style={{ color: GRADE_TINT[g] }}
                          >
                            {gradeLabel(g)}
                          </span>
                          <p className={`${T.body} mt-1.5`}>{gradeMeaning(g)}</p>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Section label="Classified, not scored">
                    A turning point is a shape rather than a total: something
                    lands on the axis itself while independent pressures are
                    already in play. A window with four structural contacts and
                    no direct hit never reaches it, however many it
                    accumulates.
                  </Section>
                </>
              ) : null}

              {tab === "vocabulary" ? (
                <>
                  <Section label="Three ways growth appears">
                    Which way the pressure points. Coarser than the astrology
                    underneath it on purpose — it has to be answerable for a
                    transit through a nodal house as well as a contact on the
                    node itself.
                  </Section>

                  <ul className="mt-5 space-y-4">
                    {PRIMARY_ORIENTATIONS.map((o) => {
                      const f = orientationFrame(o);
                      return (
                        <li key={o}>
                          <p className="flex items-baseline gap-3">
                            <span className="text-[1.125rem] font-light text-bone">
                              {f.short}
                            </span>
                            <span className={`${T.micro} text-bone-faint`}>
                              {f.territory}
                            </span>
                          </p>
                          <p className={`${T.body} mt-1.5`}>{f.plain}</p>
                        </li>
                      );
                    })}
                  </ul>

                  <Section label="Five kinds of change">
                    What each body does to a direction, in ordinary English.
                    The process is the claim; the planet is the evidence for
                    it.
                  </Section>

                  <ul className="mt-5 space-y-4">
                    {BODIES.map((b) => {
                      const fn = processOf(b);
                      return (
                        <li key={b}>
                          <p className="flex flex-wrap items-baseline gap-x-3">
                            <span
                              className="glyph text-[1.125rem]"
                              style={{ color: bodyColor(b) }}
                            >
                              {bodyGlyph(b)}
                            </span>
                            <span className="text-[1.125rem] font-light text-bone">
                              {fn.label}
                            </span>
                            <span className={`${T.micro} text-bone-faint`}>
                              {b} · {fn.role.toLowerCase()}
                            </span>
                          </p>
                          <p className={`${T.body} mt-1.5`}>
                            {b} {fn.gloss}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <p className={`${T.micro} text-bone-faint`}>{label}</p>
      <p className={`${T.lead} mt-2.5`}>{children}</p>
    </div>
  );
}
