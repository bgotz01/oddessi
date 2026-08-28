"use client";

import { useEffect, useState, type ReactNode } from "react";
import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import { RELATION_NOTE, type Trajectory } from "@/lib/growth";
import { resistanceAnchors, resourceReadings } from "@/components/western/growth/growth-readings";
import { Placement, Row } from "@/components/western/growth/growth-field";
import { T, groundNote, tabsFor, type ChapterKey } from "@/components/western/growth/growth-ui";

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
  accent = "patina",
  children,
}: {
  title: string;
  /**
   * A ReactNode rather than a string because the Questions block hangs its
   * disclosure control here — the same place study-panel's Block puts the
   * weight explainer. A second control inside the body would read as a
   * heading under a heading.
   */
  aside?: ReactNode;
  /**
   * Patina is the drawer's default accent — every other tab's territory. The
   * Crossing tab passes "ember" instead, the same colour as the flag on the
   * page: it is a different kind of fact from the other three tabs (a square
   * to the axis, not the axis itself), and sharing patina would have it read
   * as another ordinary section rather than the thing the page flagged.
   */
  accent?: "patina" | "ember";
  children: ReactNode;
}) {
  return (
    <section className="border-b border-rule px-8 py-6">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h4 className={`${T.micro} ${accent === "ember" ? "text-ember" : "text-patina"}`}>
          {title}
        </h4>
        {aside ? (
          typeof aside === "string" ? (
            <span className={`${T.micro} text-bone-faint`}>{aside}</span>
          ) : (
            aside
          )
        ) : null}
      </div>
      {children}
    </section>
  );
}

/**
 * One group of relations.
 *
 * `Row` is the page's, and using it here is the point. This block and the
 * Resistance placements are the same object — a labelled placement with a line
 * saying what it does for the move — and the page unified them behind one
 * component while the drawer kept two hand-rolled copies that disagreed about
 * everything: label at 11px here and 11px there, reading at 15px here and 17px
 * there, placement first here and last there. Two designs for one thing is how
 * a panel ends up looking like it has more sizes than its scale has steps.
 *
 * The reading is `resourceReadings`, not the model's `detail`. `detail` is
 * composed per KIND, so a chart with two soft contacts to the axis printed the
 * same sentence under Venus and under Pluto; the page replaced it with a
 * reading taken from the body's own noun and the house's territory, and the
 * drawer went on rendering the sentence the page had already retired. What
 * `detail` knew that the reading does not is the caveat about the kind, and
 * that is now printed once per kind rather than once per row.
 */
function Relations({ rows }: { rows: ReturnType<typeof resourceReadings> }) {
  return (
    <ul>
      {rows.map((w) => (
        <Row
          key={w.body}
          label={w.label}
          accent={w.assists ? "patina" : "quiet"}
          reading={w.reading}
        >
          <Placement
            size="panel"
            body={w.body}
            sign={w.sign}
            degree={w.degree}
            house={w.house}
          />
        </Row>
      ))}
    </ul>
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

  /**
   * The Arc's questions, closed by default — the same default the page's own
   * Arc uses for the same set.
   *
   * They are not evidence for the move; they are what a reader does with it
   * once they accept it. Left open they were up to seven items of interaction
   * layer sitting between the reading and the tab bar, and the tab is the
   * longest of the five.
   */
  const [questionsOpen, setQuestionsOpen] = useState(false);

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

  const anchors = resistanceAnchors(t);
  const resources = resourceReadings(t);
  const helps = resources.filter((w) => w.assists);
  const relations = resources.filter((w) => !w.assists);

  /**
   * The kinds this chart actually has, in the order the rows run, each with
   * the label its rows carry. What every relation of that kind does and does
   * not claim is a fact about the kind, so it is stated once here instead of
   * repeated under every placement that happens to be one.
   */
  const kinds = t.tailwinds.reduce<{ kind: keyof typeof RELATION_NOTE; label: string }[]>(
    (out, w) =>
      out.some((x) => x.kind === w.kind)
        ? out
        : [...out, { kind: w.kind, label: w.label }],
    [],
  );

  const ASKS: Record<ChapterKey, string> = {
    arc: `${context}Oddessi compresses this to "${t.arc.from} → ${t.arc.into}". The direction is "${t.movement.quality}", practised in house ${t.to.house} — ${t.arena?.territory}. Write the developmental story that compression stands for, specific to these placements, and say what developing that quality actually requires of someone already good at ${t.from.sign}. Oddessi's instruction for the arriving pole is "${t.practice.arriving?.move ?? t.arena?.directive ?? t.movement.movement}" — read that as the move being asked for, and say what it costs someone practised at ${t.from.sign}. Then take the two or three of these questions that bite hardest for THIS chart and say why: ${[...(t.practice.arriving?.questions ?? []), ...t.questions].join(" / ")}. The old competence is FEEDSTOCK, never fault.`,
    crossing: `${context}${(t.crossing?.bodies ?? []).map((c) => `${c.body} in ${c.sign} house ${c.house} squares the nodal axis, and Oddessi reads that as "${c.interpretation.demand}" — ${c.interpretation.conflict}`).join(" ")} A square to the axis is not the South Node's gravity: it stands ninety degrees from BOTH ends, so neither the old competence nor the new direction resolves it and it cannot be waited out. Say what this actually looks like in a life — where the interruption keeps surfacing, and what taking the demand INTO the movement would mean rather than getting around it. Never write it up as an obstacle to be removed.`,
    conversion: `${context}The conversion is "${t.conversionArc.from} → ${t.conversionArc.into}". ${t.groundReading} Write this out properly: what this person is genuinely good at, and how each ability becomes raw material for the ${t.to.sign} direction. The conversions Oddessi derives are ${t.conversions.map((c) => `${c.fromMode} → ${c.intoMode}${c.from_body ? ` (only because ${c.from_body} stands in the departing ground)` : ""}`).join("; ")} — take those pairs as the spine and say what each one actually costs and produces. ${t.deep.length ? `Pay particular attention to ${t.deep.map((d) => d.body).join(" and ")} in the nodal territory — that is what makes this chart's old ground non-generic.` : ""} Be concrete.`,
    resistance: `${context}Describe the loop that returns this person to the old strategy under pressure — as a working mechanism, not a criticism. ${t.resistanceTurn} Then describe what living the new direction actually looks like: the before-and-after of a real situation in this person's idiom, not generic sign advice.`,
    tailwinds: `${context}These placements already point the way this person is being asked to go: ${t.tailwinds.map((w) => `${w.body} in ${w.sign} house ${w.house} (${w.label} — ${w.detail})`).join("; ")}. Say concretely how each could be used in service of the move from ${t.from.sign} to ${t.to.sign} — what leaning on it looks like in practice. Be honest that soft contacts and Jupiter are offers rather than guarantees: they go unused for whole lives unless someone reaches for them. No scores.`,
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
                className={`${T.tiny} flex-1 border-b-2 px-2 py-3 transition-colors ${on
                  ? x.key === "crossing"
                    ? "border-ember bg-surface text-ember"
                    : "border-patina bg-surface text-patina"
                  : "border-transparent bg-void text-bone-faint hover:text-bone-soft"
                  }`}
              >
                {x.label}
              </button>
            );
          })}
        </div>

        <div className="@container flex-1 overflow-y-auto">
          {/* ── Trajectory ────────────────────────────────────────────── */}
          {tab === "arc" ? (
            <>
              {/*
                  The move, stated before the three readings that produce it.
                  Movement is the sign, Arena is the house, and the starting
                  ground is what the reader is leaving — all correct, and all
                  leaving the synthesis to be performed by the reader.

                  Nothing is composed here. `practice.arriving.move` is the
                  144-entry table — this sign IN THIS HOUSE — and it was
                  already travelling verbatim to the chat in ASKS.arc as the
                  instruction for the arriving pole. The panel was sending the
                  reader's own thesis to the model and never showing it to the
                  reader.

                  The pair is new move first, where Resistance's Response block
                  puts the old one first. The jobs are opposite: that block is
                  what to say instead of a reflex, so the reflex has to be named
                  before the replacement; this block is where the axis points,
                  and the old move is the contrast under it.

                  Only rendered when the table has an entry. A chart stored
                  without an ascendant has no house, so no entry — and the
                  sign-level fallback is `movement.movement`, which is the very
                  next block. A synthesis that restates the block beneath it is
                  not a synthesis.
              */}
              {t.practice.arriving ? (
                <Block
                  title="The move"
                  aside={`${t.to.sign}${t.to.house ? ` · house ${t.to.house}` : ""}`}
                >
                  <p className={`${T.tiny} text-patina`}>The new move · open it</p>
                  <p className={`mt-2 ${T.phrase}`}>{t.practice.arriving.move}</p>
                  {t.practice.departing ? (
                    <>
                      <div className="my-5 h-px w-10 bg-patina-dim" />
                      <p className={`${T.tiny} text-bone-faint`}>
                        The old move · catch it
                      </p>
                      <p className={`mt-2 ${T.read} text-bone-soft`}>
                        {t.practice.departing.move}
                      </p>
                    </>
                  ) : null}
                </Block>
              ) : null}
              <Block title="Movement" aside={`${t.to.sign} · the sign`}>
                <p className={T.read}>{t.movement.movement}</p>
                {/* `asks` and `asking` are the same claim. Every entry in the
                    table is written "{Sign} asks {stem}: {a}, {b}, and {c}",
                    so what stood here as a five-line paragraph was a stem and
                    three items with commas between them — three things to do,
                    set as one thing to read. The paragraph still goes to the
                    chat, which is the surface a paragraph is right for. */}
                <p className={`mt-3 ${T.body}`}>{t.movement.asking.stem}</p>
                <ul className="mt-3 space-y-2.5">
                  {t.movement.asking.items.map((item) => (
                    <li key={item} className={`border-l border-rule pl-4 ${T.read}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Block>
              {t.arena ? (
                <Block title="Arena" aside={`house ${t.to.house}`}>
                  <p className={T.read}>{t.arena.directive}</p>
                  <p className={`mt-3 ${T.body}`}>{t.arena.contains}</p>
                </Block>
              ) : null}
              {/* Named "Against what you already know" until the line three
                  rows down — competence, not fault — was read against its own
                  heading. "Against" is opposition; the block's whole claim is
                  that this is the material the move is made from, which is
                  also what hands it to Conversion. */}
              <Block title="Starting ground" aside="south node">
                <Placement
                  size="panel"
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
                aside={
                  <button
                    type="button"
                    onClick={() => setQuestionsOpen((v) => !v)}
                    aria-expanded={questionsOpen}
                    className={`group ${T.micro} flex items-baseline gap-2.5 text-bone-faint transition-colors hover:text-bone-soft`}
                  >
                    <span
                      aria-hidden
                      className="glyph inline-block shrink-0 text-[0.625rem] text-patina-dim transition-transform group-hover:text-patina"
                      style={
                        questionsOpen ? { transform: "rotate(90deg)" } : undefined
                      }
                    >
                      ▸
                    </span>
                    {questionsOpen
                      ? "hide"
                      : `${wider.length + (t.practice.arriving?.questions.length ?? 0)} in full`}
                  </button>
                }
              >
                {!questionsOpen ? null : (
                  <>
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
                  </>
                )}
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
                accent="ember"
              >
                {/* The meaning, then the bodies, then the geometry. It ran the
                    other way and opened on degrees — which is the mechanism
                    that produces the fact rather than the fact, and a reader
                    who stops after one paragraph should stop holding the
                    claim, not the arithmetic behind it. */}
                <p className={T.phrase}>
                  A demand the axis itself cannot answer.
                </p>
                <div className="mt-5 space-y-3">
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

              {t.crossing.bodies.map((c, i) => {
                /**
                 * The arena is keyed by HOUSE, not by body, so a stellium
                 * squaring the axis printed the same two sentences under every
                 * one of its bodies — three identical "it tends to surface in
                 * how you come across" on a chart with Sun, Mercury and the
                 * Ascendant together in the first. Shown against the first body
                 * to stand in a given house and suppressed thereafter: the fact
                 * is true of the house, and saying it once is saying it.
                 */
                const firstInHouse =
                  c.house !== null &&
                  t.crossing!.bodies.findIndex((x) => x.house === c.house) === i;

                return (
                  <Block
                    key={c.body}
                    title={c.body}
                    aside={c.interpretation.demand}
                    accent="ember"
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
                      {c.arena && firstInHouse
                        ? ` It tends to surface ${c.arena.showsUpAs}.`
                        : ""}
                    </p>

                    <p className={`${T.tiny} mt-6 text-patina`}>Integration</p>
                    <p className={`mt-2 ${T.body} text-bone`}>
                      {c.interpretation.integration}
                      {c.arena && firstInHouse ? ` ${c.arena.integrationArena}` : ""}
                    </p>
                  </Block>
                );
              })}
            </>
          ) : null}

          {/* ── Conversion ────────────────────────────────────────────── */}
          {tab === "conversion" ? (
            <>
              {/*
                  What `groundReading` says, said as the thing it is.

                  The sentence read: "The ground you are leaving is not generic
                  mind and exchange. Pluto stands in house 3, and this ground is
                  dug at until it gives way. Growth does not ask you to stop —
                  it asks you to make investigation produce self-directed
                  conviction." Three claims, and only the first is this block's:
                  the ground is not the textbook version of its house. The
                  second is the block below, which prints every embedded body's
                  charge. The third is the conversion arc, which is the block
                  below that and every row in it.

                  So this is the correction alone — EXCHANGE → INVESTIGATION,
                  and which body caused it. `genericFrom` and `from` are both
                  already on the arc for exactly this comparison; the page makes
                  it too, in a tooltip. The paragraph still travels to the chat,
                  where a sentence is the right unit.
              */}
              <Block
                title="The ground"
                aside={t.from.house ? `house ${t.from.house}` : t.from.sign}
              >
                {/* One noun and no arrow, deliberately. An arrow in this
                    system means "converts into" — it is what the page's
                    ATTACHMENT → ACCOUNT hero says and what every row below
                    says. Setting the correction as `perspective → attachment`
                    put the same word on the opposite side of the same mark,
                    which reads as the conversion running backwards. The
                    correction is not a conversion; it is what this ground is
                    called before any conversion starts. */}
                <p className={`${T.phrase} uppercase`}>
                  {t.conversionArc.from}
                </p>
                {/* The correction only. The charge this returns alongside it
                    is what "Embedded in the territory" prints directly below,
                    which is why the page takes both and this takes one. */}
                <p className={`mt-4 ${T.note}`}>{groundNote(t).correction}</p>
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
                          size="panel"
                          body={d.body}
                          sign={d.sign}
                          degree={d.degree}
                          house={d.house}
                        />
                        <p className={`mt-2 ${T.tiny} text-bone-faint`}>
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
              {/*
                  Titled "Feedstock, not fault" until it was pointed out that
                  this names the principle rather than the contents — a reader
                  looking for the conversions had to already agree with an
                  argument to find them. The principle is not lost: the Arc says
                  it in words that need no gloss ("competence, not fault"), and
                  the block above now says it structurally.

                  Two columns and an arrow, matching the page. Stacked, each row
                  was a label, a sentence, and an arrowed sentence — three lines
                  that had to be read in order to see one transformation. The
                  arrow is its own column so it lands on the same axis in every
                  row, and the whole thing reads down as a column of
                  transformations. The breakpoint is the panel's width, not the
                  window's: at 512px there is room, on a phone there is not.
              */}
              <Block title="Conversions" aside={`${t.conversions.length} in full`}>
                <ul>
                  {t.conversions.map((c) => (
                    <li
                      key={c.from}
                      className="grid items-baseline gap-x-5 gap-y-1 border-b border-rule-faint py-4 first:pt-0 last:border-0 last:pb-0 @sm:grid-cols-[1fr_auto_1fr]"
                    >
                      <div>
                        {/* The mode pair leads here too. The page shows three
                            of these and the drawer shows all of them, so a
                            reader arriving from a row has to find the same
                            row. */}
                        <p className={`${T.tiny} text-bone-faint`}>
                          {c.fromMode}
                          {c.from_body ? (
                            <span
                              className="glyph ml-2 text-[0.8125rem]"
                              style={{ color: bodyColor(c.from_body) }}
                              title={`${c.from_body} put this row here`}
                            >
                              {bodyGlyph(c.from_body)}
                            </span>
                          ) : null}
                        </p>
                        <p className={`mt-1.5 ${T.body}`}>{c.from}</p>
                      </div>

                      <span
                        aria-hidden
                        className="glyph hidden text-[0.875rem] text-patina @sm:block"
                      >
                        →
                      </span>

                      <div>
                        <p className={`${T.tiny} text-patina`}>{c.intoMode}</p>
                        <p className={`mt-1.5 ${T.read}`}>{c.into}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Block>
            </>
          ) : null}

          {/* ── Resistance ────────────────────────────────────────────── */}
          {tab === "resistance" ? (
            <>
              {/*
                  Behaviours first, which is the order the page settled on and
                  the drawer never followed. The page's own note calls these
                  its hero — things you can catch yourself doing, four or five
                  words each — and drops the mechanism prose entirely.

                  The drawer opened on that prose instead: two paragraphs
                  explaining the loop, above the three lines that let a reader
                  recognise it. Recognition happens at a glance or it does not
                  happen, and nobody arrives at this tab wanting the theory
                  first. The paragraphs stay — the panel is where the long form
                  belongs, and it is the argument for the bullets rather than a
                  restatement of them — they just stop being the doorway.
              */}
              {/* Named for the page's band, not for itself. A reader who
                  clicked "Behaviours" and arrived at "How it shows up" has to
                  work out that they are the same thing before they can read
                  it. */}
              {/* At phrase size, matching the page: each tell IS the finding
                  rather than a description of one, and this tab leads on them
                  the way Arc leads on the move and Crossing on the demand. Set
                  at reading size they were the only tab lead in the panel that
                  looked like body copy. */}
              <Block title="Behaviours" aside={`${t.from.sign} — going back`}>
                <ul className="space-y-3">
                  {t.resistance.tells.map((tell) => (
                    <li key={tell} className={`border-l border-rule pl-4 ${T.phrase}`}>
                      {tell}
                    </li>
                  ))}
                </ul>
              </Block>
              {/* The gravity sentence used to sit four blocks down, in the
                  empty branch of a block about squares to the axis. It is not
                  about squares — it names what this whole tab is, and it is
                  the only place the word for it appears. It has to be here,
                  because on a chart with no crossing there is no Crossing tab
                  to move it to. */}
              <Block title="The pull back" aside={t.from.sign}>
                <p className={T.read}>{t.resistance.pullback}</p>
                <p className={`mt-4 ${T.body}`}>{t.resistanceTurn}</p>
                {(t.crossing?.bodies.length ?? 0) ? null : (
                  <p className={`mt-4 ${T.note}`}>
                    Nothing stands square to the axis, so there is no obstacle
                    met partway. This is the origin&rsquo;s own gravity — which
                    is easier to interrupt, and easier not to notice.
                  </p>
                )}
              </Block>
              {/* The same anchors the page shows, from the same composer, in
                  the same order. This block used to hand-write its own gloss
                  for the conjunct bodies and leave the departing house's
                  tenants out entirely, so the panel was both saying something
                  different from the page and knowing less than it. */}
              {anchors.length ? (
                <Block title="Placements" aside="why the pull is this strong">
                  <ul>
                    {anchors.map((anchor) => (
                      <Row
                        key={`${anchor.label}-${anchor.body}`}
                        label={anchor.label}
                        reading={anchor.reading}
                      >
                        <Placement
                          size="panel"
                          body={anchor.body}
                          sign={anchor.sign}
                          degree={anchor.degree}
                          house={anchor.house}
                        />
                      </Row>
                    ))}
                  </ul>
                </Block>
              ) : null}
              {/* Where a whole Block explaining the crossing used to be.
                  Making Crossing a tab was the decision that a square is not
                  resistance — it cuts sideways rather than pulling back — and
                  then re-explaining it inside Resistance spent that decision
                  as fast as it was made. What is owed here is that the reader
                  not mistake the pull for the only thing in their way, which
                  is a pointer, not a reading. */}
              {(t.crossing?.bodies.length ?? 0) ? (
                <div className="border-b border-rule px-8 py-5">
                  <button
                    type="button"
                    onClick={() => setTab("crossing")}
                    className={`${T.micro} text-ember transition-colors hover:text-bone`}
                  >
                    Separate from this:{" "}
                    {(t.crossing?.bodies ?? []).map((c) => c.body).join(", ")}{" "}
                    {(t.crossing?.bodies.length ?? 0) === 1 ? "cuts" : "cut"}{" "}
                    across the axis →
                  </button>
                </div>
              ) : null}
              {/* Old reflex / New move, matching the page. These were Less and
                  More, which is the pair the page dropped: the axis is not a
                  dial with less of one end and more of the other, it is one
                  move replacing another. */}
              <Block title="Response" aside="what to say instead">
                <p className={`${T.tiny} text-bone-faint`}>Old reflex</p>
                <p className={`mt-2 ${T.read} text-bone-soft`}>{t.movement.expression.oldPole}</p>
                <div className="my-5 h-px w-10 bg-patina-dim" />
                <p className={`${T.tiny} text-patina`}>New move</p>
                <p className={`mt-2 ${T.read}`}>{t.movement.expression.developedPole}</p>
              </Block>
            </>
          ) : null}

          {/* ── Tailwinds ─────────────────────────────────────────────── */}
          {/* Split the way the page splits it. One flat list with the caveat
              underneath was the older design, and it put the single most
              important thing about this layer — that four of the five kinds
              are not help — in a paragraph the reader met only after they had
              already read five entries as though they were.

              The `detail` sentences stay. They are the long form the page
              deliberately dropped, and a panel is what a reader opens to get
              it. */}
          {tab === "tailwinds" ? (
            <>
              <Block
                title="Support"
                aside="soft contact with the axis"
              >
                {helps.length ? (
                  <Relations rows={helps} />
                ) : (
                  <p className={T.body}>
                    Nothing holds a trine or a sextile to the axis, so nothing
                    here is evidence that the move is easier. What follows is
                    relevance: a route, a shared arena, or a body fused with the
                    destination.
                  </p>
                )}
              </Block>

              {relations.length ? (
                <Block
                  title="Relations"
                  aside="route, alignment, shared ground"
                >
                  <Relations rows={relations} />
                </Block>
              ) : null}

              {/* The kinds, and what each one does not claim.
                  Every sentence here used to be appended to every row of its
                  kind — so a chart with two soft contacts said "available to
                  the move, and easily left unused for a whole life" twice, once
                  under each placement, which reads as padding and crowds out
                  the half that actually varies. They are facts about the kind,
                  so they are stated once per kind, and only for the kinds this
                  chart has. */}
              <Block title="How to read these" aside={`${kinds.length} kinds`}>
                <p className={T.note}>
                  The node&rsquo;s ruler and Jupiter are in every chart, so this
                  list is never empty and its length measures nothing. Read
                  which kinds are here, not how many.
                </p>
                <ul className="mt-6 space-y-4">
                  {kinds.map((k) => (
                    <li key={k.kind}>
                      <p
                        className={`${T.tiny} ${k.kind === "support" ? "text-patina" : "text-bone-faint"
                          }`}
                      >
                        {k.label}
                      </p>
                      <p className={`mt-1.5 ${T.note}`}>
                        {RELATION_NOTE[k.kind]}
                      </p>
                    </li>
                  ))}
                </ul>
              </Block>
            </>
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
