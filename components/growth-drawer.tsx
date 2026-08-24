"use client";

import { useEffect, useState, type ReactNode } from "react";
import { bodyColor } from "@/lib/bodies";
import { bodyGlyph, signGlyph } from "@/lib/symbols";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import { type Trajectory } from "@/lib/growth";
import { T, tabsFor, type ChapterKey } from "@/components/growth-ui";

/**
 * The evidence, in one panel with four tabs.
 *
 * This used to be five separate drawers. Two problems followed from that. The
 * Edge held a single idea — the loop back to the old strategy — and still had
 * to restate the entire axis before it could say anything, because every drawer
 * needed that frame. And having arrived in one of them you could not look at
 * another without closing and hunting for a different mark on the page.
 *
 * One panel fixes both. The axis is stated once, in the header, where it frames
 * every tab. The tabs are the four questions the model actually answers, and a
 * section click chooses which one opens rather than which panel exists.
 *
 * The surface shows three sections; the model computes seven analytical layers.
 * This is where those layers come back — grouped by the question they serve
 * rather than by the order they happen to be computed in.
 */

function Block({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-rule px-8 py-6">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h4 className={`${T.micro} text-patina`}>{title}</h4>
        {aside ? <span className={`${T.micro} text-bone-faint`}>{aside}</span> : null}
      </div>
      {children}
    </section>
  );
}

function Placement({
  body,
  sign,
  degree,
  house,
}: {
  body: string;
  sign: string;
  /** Omitted only where the model genuinely has none. */
  degree?: string;
  house: number | null;
}) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
      <span className="glyph text-[1.25rem]" style={{ color: bodyColor(body) }}>
        {bodyGlyph(body)}
      </span>
      <span className="text-[1.0625rem] font-light text-bone">{body}</span>
      <span className="glyph text-[1rem] text-bone-soft">{signGlyph(sign)}</span>
      <span className="text-[1.0625rem] font-light text-bone-soft">{sign}</span>
      {degree ? (
        <span className="datum text-[0.75rem] text-bone-faint">{degree}</span>
      ) : null}
      {house ? (
        <span className={T.body}>
          · house {house} · {getHouseTitle(house as House)}
        </span>
      ) : null}
    </p>
  );
}

export default function GrowthDrawer({
  chapter,
  t,
  chartName,
  onClose,
  onAsk,
}: {
  /** Which tab to open on. Not which panel — there is only one. */
  chapter: ChapterKey;
  t: Trajectory;
  chartName: string;
  onClose: () => void;
  onAsk: (text: string) => void;
}) {
  /**
   * Which tab is showing. Seeded from the section that opened the drawer and
   * owned locally thereafter, so switching tabs never reaches back into the
   * page.
   *
   * No effect syncs this to `chapter`, deliberately. The drawer only exists
   * while a chapter is selected, so opening it always mounts a fresh component
   * and this initialiser always runs; and the backdrop makes it impossible to
   * click another section while it is open, so `chapter` cannot change
   * underneath. An effect calling setState here would be dead code that also
   * triggers a cascading render.
   */
  const [tab, setTab] = useState<ChapterKey>(chapter);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  // Never TABS directly: a chart with no square to the axis has no Crossing
  // tab, and the header's kicker is looked up in the same list the bar renders.
  const tabs = tabsFor(Boolean(t.crossing));
  const active = tabs.find((x) => x.key === tab)!;

  /**
   * What sits under the sign × house questions in the Arc tab.
   *
   * The arena's own three are dropped whenever a combo exists, because the
   * combo IS that sign in that house — leaving both in printed "What do I
   * actually believe?" directly under "What do I actually believe after
   * everything I have learned?", which reads as a table repeating itself
   * rather than as a wider frame. The sign's five stay: they are the axis, and
   * the axis is genuinely wider than the chart.
   */
  const wider = t.practice.arriving ? t.movement.questions : t.questions;

  const context =
    `${chartName}'s nodal axis runs South Node ${t.from.sign} house ${t.from.house} ` +
    `(ruled by ${t.from.ruler}${t.resistance.ruler ? ` in ${t.resistance.ruler.sign}, house ${t.resistance.ruler.house}` : ""}) ` +
    `→ North Node ${t.to.sign} house ${t.to.house} (ruled by ${t.to.ruler}` +
    `${t.to.rulerPlacement ? ` in ${t.to.rulerPlacement.sign}, house ${t.to.rulerPlacement.houseNumber}` : ""}). ` +
    (t.deep.length
      ? `Standing in the nodal territory: ${t.deep.map((d) => `${d.body} in ${d.sign}, house ${d.house} (${d.side} side)`).join("; ")}. `
      : "No planets stand in either nodal house. ") +
    (t.resistance.anchored.length
      ? `Conjunct the South Node: ${t.resistance.anchored.join(", ")}. `
      : "") +
    ((t.crossing?.bodies.length ?? 0)
      ? `Square the axis: ${(t.crossing?.bodies ?? []).map((c) => `${c.body} in ${c.sign} ${c.degree}, house ${c.house}`).join("; ")}. `
      : "");

  const ASKS: Record<ChapterKey, string> = {
    arc: `${context}Oddessi compresses this to "${t.arc.from} → ${t.arc.into}". The direction is "${t.movement.quality}", practised in house ${t.to.house} — ${t.arena?.territory}. Write the developmental story that compression stands for, specific to these placements, and say what developing that quality actually requires of someone already good at ${t.from.sign}. Oddessi's instruction for the arriving pole is "${t.practice.arriving?.move ?? t.arena?.directive ?? t.movement.movement}" — read that as the move being asked for, and say what it costs someone practised at ${t.from.sign}. Then take the two or three of these questions that bite hardest for THIS chart and say why: ${[...(t.practice.arriving?.questions ?? []), ...t.questions].join(" / ")}. The old competence is FEEDSTOCK, never fault.`,
    crossing: `${context}${(t.crossing?.bodies ?? []).map((c) => `${c.body} in ${c.sign} house ${c.house} squares the nodal axis, and Oddessi reads that as "${c.interpretation.demand}" — ${c.interpretation.conflict}`).join(" ")} A square to the axis is not the South Node's gravity: it stands ninety degrees from BOTH ends, so neither the old competence nor the new direction resolves it and it cannot be waited out. Say what this actually looks like in a life — where the interruption keeps surfacing, and what taking the demand INTO the movement would mean rather than getting around it. Never write it up as an obstacle to be removed.`,
    conversion: `${context}The conversion is "${t.conversionArc.from} → ${t.conversionArc.into}". ${t.groundReading} Write this out properly: what this person is genuinely good at, and how each ability becomes raw material for the ${t.to.sign} direction. The conversions Oddessi derives are ${t.conversions.map((c) => `${c.fromMode} → ${c.intoMode}${c.from_body ? ` (only because ${c.from_body} stands in the departing ground)` : ""}`).join("; ")} — take those pairs as the spine and say what each one actually costs and produces. ${t.deep.length ? `Pay particular attention to ${t.deep.map((d) => d.body).join(" and ")} in the nodal territory — that is what makes this chart's old ground non-generic.` : ""} Be concrete.`,
    resistance: `${context}Describe the loop that returns this person to the old strategy under pressure — as a working mechanism, not a criticism. ${t.resistanceTurn} Then describe what living the new direction actually looks like: the before-and-after of a real situation in this person's idiom, not generic sign advice.`,
    tailwinds: `${context}These placements already point the way this person is being asked to go: ${t.tailwinds.map((w) => `${w.body} in ${w.sign} house ${w.house} (${w.label})`).join("; ")}. Say concretely how each could be used in service of the move from ${t.from.sign} to ${t.to.sign} — what leaning on it looks like in practice. Be honest that soft contacts and Jupiter are offers rather than guarantees: they go unused for whole lives unless someone reaches for them. No scores.`,
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-void/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${t.arc.from} to ${t.arc.into}`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-rule bg-surface"
      >
        {/* The axis, stated once. It frames every tab, so repeating it inside
            each one — which is what five separate drawers had to do — was three
            wasted restatements and a lot of vertical space. */}
        <div className="shrink-0 border-b border-rule px-8 py-6">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className={`${T.tiny} text-bone-faint`}>{active.kicker}</p>
              <p className="inscription mt-2.5 flex flex-wrap items-baseline gap-x-3 text-[1.375rem] leading-none text-bone">
                <span className="text-bone-faint">{t.arc.from}</span>
                <span className="glyph text-[1rem] text-patina">→</span>
                <span>{t.arc.into}</span>
              </p>
              <p className={`mt-3 ${T.tiny} text-bone-faint`}>
                <span className="glyph mr-1.5 text-[0.8125rem]">
                  {bodyGlyph("South Node")}
                </span>
                {t.from.sign} {t.from.degree} · H{t.from.house}
                <span className="glyph mx-2 text-[0.75rem] text-patina-dim">→</span>
                <span className="glyph mr-1.5 text-[0.8125rem]">
                  {bodyGlyph("North Node")}
                </span>
                {t.to.sign} {t.to.degree} · H{t.to.house}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={`${T.micro} mt-1 shrink-0 text-bone-faint transition-colors hover:text-bone`}
            >
              Close
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          className="flex shrink-0 gap-px border-b border-rule bg-rule"
        >
          {tabs.map((x) => {
            const on = x.key === tab;
            return (
              <button
                key={x.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(x.key)}
                className={`${T.tiny} flex-1 border-b-2 px-2 py-3 transition-colors ${
                  on
                    ? "border-patina bg-surface text-patina"
                    : "border-transparent bg-void text-bone-faint hover:text-bone-soft"
                }`}
              >
                {x.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* ── Trajectory ────────────────────────────────────────────── */}
          {tab === "arc" ? (
            <>
              <Block title="Movement" aside={`${t.to.sign} · the sign`}>
                <p className={T.read}>{t.movement.movement}</p>
                <p className={`mt-3 ${T.body}`}>{t.movement.asks}</p>
              </Block>
              {t.arena ? (
                <Block title="Arena" aside={`house ${t.to.house}`}>
                  <p className={T.read}>{t.arena.directive}</p>
                  <p className={`mt-3 ${T.body}`}>{t.arena.contains}</p>
                </Block>
              ) : null}
              <Block title="Against what you already know" aside="south node">
                <Placement
                  body="South Node"
                  sign={t.from.sign}
                  degree={t.from.degree}
                  house={t.from.house}
                />
                <p className={`mt-3 ${T.note}`}>
                  Ruled by {t.from.ruler}
                  {t.resistance.ruler
                    ? ` · ${t.resistance.ruler.sign} · house ${t.resistance.ruler.house}`
                    : ""}
                  . This is competence, not fault — growth here is learning a
                  second move to reach for, not unlearning the first.
                </p>
              </Block>
              {/* The page shows the sign × house questions; the drawer has to
                  contain them or "explore the full axis" leads away from what
                  was just read. The sign-level set follows as the wider axis —
                  true of every chart on this axis, which is exactly what makes
                  it context rather than the finding. */}
              <Block
                title="Questions"
                aside={`${wider.length + (t.practice.arriving?.questions.length ?? 0)} in full`}
              >
                {t.practice.arriving ? (
                  <ul className="mb-7 space-y-3">
                    {t.practice.arriving.questions.map((q) => (
                      <li key={q} className={T.read}>
                        {q}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {t.practice.arriving ? (
                  <p className={`${T.tiny} mb-4 text-bone-faint`}>
                    The wider axis
                  </p>
                ) : null}
                <ul className="space-y-3">
                  {wider.map((q) => (
                    <li key={q} className={t.practice.arriving ? T.body : T.read}>
                      {q}
                    </li>
                  ))}
                </ul>
              </Block>
            </>
          ) : null}

          {/* ── Crossing ──────────────────────────────────────────────── */}
          {/*
              Conditional twice over: the tab only exists when the chart has a
              square to the axis, and this only renders when that tab is the
              one showing.

              One Block per body, and no synthesis across them. Two bodies
              square the axis for different reasons and ask for different
              things; the page's flag names them precisely so a reader can tell
              them apart here, and inventing a combined demand would undo that.
          */}
          {tab === "crossing" && t.crossing ? (
            <>
              <Block
                title="What cuts across"
                aside={`${t.crossing.bodies.length === 1 ? "one body" : `${t.crossing.bodies.length} bodies`} · square`}
              >
                <div className="space-y-3">
                  {t.crossing.bodies.map((c) => (
                    <Placement
                      key={c.body}
                      body={c.body}
                      sign={c.sign}
                      degree={c.degree}
                      house={c.house}
                    />
                  ))}
                </div>
                <p className={`mt-4 ${T.body}`}>
                  Ninety degrees from both ends of the axis at once. Neither the
                  competence being left nor the direction being taken resolves
                  it on its own, which is what separates a crossing from the
                  ordinary pull back toward the old strategy.
                </p>
              </Block>

              {t.crossing.bodies.map((c) => (
                <Block
                  key={c.body}
                  title={c.body}
                  aside={c.interpretation.demand}
                >
                  <p className={T.read}>{c.interpretation.conflict}</p>

                  <p className={`${T.tiny} mt-6 text-bone-faint`}>
                    How it interrupts
                  </p>
                  <p className={`mt-2 ${T.body}`}>
                    {c.interpretation.interruption}
                    {/* The house layer. Without it Mars in the twelfth reads
                        exactly like Mars in the second — the body names the
                        demand, and only the house says where it surfaces. */}
                    {c.arena ? ` It tends to surface ${c.arena.showsUpAs}.` : ""}
                  </p>

                  <p className={`${T.tiny} mt-6 text-patina`}>Integration</p>
                  <p className={`mt-2 ${T.body} text-bone`}>
                    {c.interpretation.integration}
                    {c.arena ? ` ${c.arena.integrationArena}` : ""}
                  </p>
                </Block>
              ))}
            </>
          ) : null}

          {/* ── Conversion ────────────────────────────────────────────── */}
          {tab === "conversion" ? (
            <>
              <Block title="What the ground actually is" aside={`house ${t.from.house}`}>
                <p className={T.body}>{t.groundReading}</p>
              </Block>
              {t.deep.length ? (
                <Block
                  title="Embedded in the territory"
                  aside={`${t.deep.length} ${t.deep.length === 1 ? "body" : "bodies"}`}
                >
                  <div className="space-y-5">
                    {t.deep.map((d) => (
                      <div key={d.body}>
                        <Placement
                          body={d.body}
                          sign={d.sign}
                          degree={d.degree}
                          house={d.house}
                        />
                        <p className={`mt-2 ${T.micro} text-bone-faint`}>
                          {d.side === "departing"
                            ? "ground being left"
                            : "ground being entered"}{" "}
                          · {d.verbs.join(" · ")}
                        </p>
                        <p className={`mt-2 ${T.body}`}>{d.charge}.</p>
                      </div>
                    ))}
                  </div>
                </Block>
              ) : null}
              <Block title="Feedstock, not fault" aside={`${t.conversions.length} in full`}>
                <div className="space-y-5">
                  {t.conversions.map((c) => (
                    <div key={c.from}>
                      {/* The mode pair leads here too. The page shows three of
                          these and the drawer shows all of them, so a reader
                          arriving from a row has to find the same row. */}
                      <p className={`${T.tiny} flex flex-wrap items-baseline gap-x-2 text-bone-faint`}>
                        <span>{c.fromMode}</span>
                        <span className="glyph text-patina">→</span>
                        <span className="text-patina">{c.intoMode}</span>
                        {c.from_body ? (
                          <span style={{ color: bodyColor(c.from_body) }}>
                            {c.from_body}
                          </span>
                        ) : null}
                      </p>
                      <p className={`mt-1.5 ${T.read}`}>
                        {c.from}
                      </p>
                      <p className={`mt-1 ${T.body}`}>
                        <span className="glyph mr-2 text-patina">→</span>
                        {c.into}
                      </p>
                    </div>
                  ))}
                </div>
              </Block>
            </>
          ) : null}

          {/* ── Resistance ────────────────────────────────────────────── */}
          {tab === "resistance" ? (
            <>
              <Block title="The pull back" aside={t.from.sign}>
                <p className={T.read}>{t.resistance.pullback}</p>
                <p className={`mt-4 ${T.body}`}>{t.resistanceTurn}</p>
              </Block>
              <Block title="How it shows up" aside="the tells">
                <ul className="space-y-2.5">
                  {t.resistance.tells.map((tell) => (
                    <li key={tell} className={T.read}>
                      {tell}
                    </li>
                  ))}
                </ul>
              </Block>
              <Block title="Its mechanism">
                {t.resistance.ruler ? (
                  <>
                    <p className={`${T.micro} mb-2 text-bone-faint`}>
                      the old way answers to
                    </p>
                    <Placement
                      body={t.resistance.ruler.body}
                      sign={t.resistance.ruler.sign}
                      degree={t.resistance.ruler.degree}
                      house={t.resistance.ruler.house}
                    />
                  </>
                ) : null}
                {t.resistance.anchored.length ? (
                  <p className={`mt-4 ${T.body}`}>
                    <span className={`${T.micro} mr-2 text-bone-faint`}>
                      fused to the old way
                    </span>
                    {t.resistance.anchored.join(", ")} — on the South Node itself,
                    so a whole part of the psyche is invested in staying.
                  </p>
                ) : null}
                {(t.crossing?.bodies.length ?? 0) ? (
                  <p className={`mt-4 ${T.body}`}>
                    <span className={`${T.micro} mr-2 text-ember`}>unavoidable</span>
                    {(t.crossing?.bodies ?? []).map((c) => c.body).join(", ")} — square to both ends at
                    once, so no version of the move goes around it. This is the
                    only resistance that genuinely sits mid-journey.
                  </p>
                ) : (
                  <p className={`mt-4 ${T.note}`}>
                    Nothing stands square to the axis, so there is no obstacle met
                    partway. The pull is the origin&rsquo;s own gravity — which is
                    easier to interrupt, and easier not to notice.
                  </p>
                )}
              </Block>
              <Block title="Before and after" aside={t.to.sign}>
                <p className={`${T.micro} text-bone-faint`}>Less</p>
                <p className={`mt-2 ${T.read} text-bone-soft`}>{t.movement.expression.oldPole}</p>
                <div className="my-5 h-px w-10 bg-patina-dim" />
                <p className={`${T.micro} text-patina`}>More</p>
                <p className={`mt-2 ${T.read}`}>{t.movement.expression.developedPole}</p>
              </Block>
            </>
          ) : null}

          {/* ── Tailwinds ─────────────────────────────────────────────── */}
          {tab === "tailwinds" ? (
            <Block
              title="With a stake in the direction"
              aside={`${t.tailwinds.length} placements`}
            >
              <div className="space-y-6">
                {t.tailwinds.map((w) => (
                  <div key={w.body}>
                    <Placement
                      body={w.body}
                      sign={w.sign}
                      degree={w.degree}
                      house={w.house}
                    />
                    <p className={`mt-2 ${T.micro} text-patina`}>{w.label}</p>
                    <p className={`mt-2 ${T.body}`}>{w.detail}</p>
                  </div>
                ))}
              </div>
              <p className={`mt-7 ${T.note}`}>
                The node&rsquo;s ruler and Jupiter are in every chart, so this
                list is never empty and its length measures nothing. Only{" "}
                <span className="text-patina">Supports</span> — a soft aspect to
                the axis — is evidence that the move is easier. The others are
                relevance: a route, a shared arena, or a body fused with the
                destination. Read which kinds are here, not how many.
              </p>
            </Block>
          ) : null}
        </div>

        <div className="mt-auto shrink-0 border-t border-rule px-8 py-5">
          <button
            type="button"
            onClick={() => onAsk(ASKS[tab])}
            className={`${T.micro} w-full border border-patina-dim px-4 py-3 text-patina transition-colors hover:border-patina hover:bg-patina-deep`}
          >
            Ask about {active.label.toLowerCase()} →
          </button>
        </div>
      </div>
    </>
  );
}
