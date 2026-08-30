"use client";

import { useEffect, useState } from "react";
import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import {
  ADDRESS,
  CAREER_MODEL,
  CAREER_WINDOW_MODEL,
  GEOMETRY,
  PROCESS,
  careerWindowLabel,
  careerWindowMeaning,
  type CareerCoverage,
  type CareerParts,
  type CareerTargetKind,
  type CareerWindowGrade,
  type Geometry,
} from "@/lib/career";
import { CAREER_GRADE_TINT } from "@/components/western/career/career-ui";
import { T } from "@/components/western/growth/growth-ui";

/**
 * Every number the index is made of, and what this chart can actually reach.
 *
 * The model file has always documented itself — the weights, the saturation
 * points, the deferred candidates and the reasoning for each — and none of it
 * was readable without opening the source. That is the worse half of both
 * options: an instrument precise enough to invite the argument, with no way to
 * inspect the terms it is arguing from.
 *
 * Four tabs, because a reader arrives with one of four questions:
 *
 *   THE INDEX   what the number measures and what it refuses to claim
 *   WEIGHTS     every constant, printed from the model rather than retyped
 *   WINDOWS     the other axis — configuration, which has no size
 *   THIS CHART  which layers of the architecture can light up at all, which
 *               is where the honest limits of a particular reading live
 *
 * Nothing here is written out by hand where the model already holds it. A
 * reference that describes weights the code stopped using is worse than no
 * reference, so every figure below is read from CAREER_MODEL at render.
 */

const TABS = [
  { id: "index", label: "The index" },
  { id: "weights", label: "Weights" },
  { id: "windows", label: "Windows" },
  { id: "vocabulary", label: "Vocabulary" },
  { id: "chart", label: "This chart" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const PART_LABEL: Record<keyof CareerParts, string> = {
  strongestContact: "Strongest contact",
  convergence: "Convergence",
  coverage: "Architecture coverage",
  persistence: "Persistence",
  multiplicity: "Contacts at once",
};

const PART_GLOSS: Record<keyof CareerParts, string> = {
  strongestContact:
    "The single closest contact, as target relevance × aspect relevance × exactness. It carries the majority on purpose: one exact contact on the Midheaven is a louder statement about a career than four distant ones on its machinery.",
  convergence:
    "How many INDEPENDENT bodies are in contact. Multiplied by the strongest contact, so convergence on nothing scores nothing — three planets in loose contact with the outer edges of the architecture is not a convergence on a career.",
  coverage:
    "How many distinct layers of the architecture are lit at once. Normalised against the layers this chart can reach rather than a fixed number, so it means the same thing on two different charts.",
  persistence:
    "Retrograde returns. A planet that stations and crosses the same contact three times is asking three times, and that is a different event from a single pass.",
  multiplicity:
    "The raw count of simultaneous contacts. Small on purpose — it rises with convergence nearly always, and paying both fully would charge twice for one fact.",
};

const TARGET_GLOSS = {
  midheaven:
    "The MC–IC axis. The most defensible career address in a chart, and the only target carrying full relevance. The IC is the far end of the same axis, so it is not counted twice.",
  tenthRuler:
    "Whoever rules the sign on the 10th cusp. Slightly under the axis itself because it answers FOR the house rather than being it.",
  tenthTenant:
    "Any planet sitting in the 10th. Real career machinery, further from the axis than its ruler.",
  tenthHouse:
    "A slow planet transiting through the 10th. The weakest target and the longest: Neptune spends fourteen years there, so it colours a period rather than marking an event.",
} as const;

export default function CareerMethod({
  feed,
  coverage,
}: {
  /** The cached span, which is the honest bound on everything here. */
  feed: { start: string; end: string };
  coverage: CareerCoverage;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabId>("index");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const parts = Object.keys(CAREER_MODEL.parts) as (keyof CareerParts)[];
  const total = parts.reduce((sum, key) => sum + CAREER_MODEL.parts[key], 0);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${T.tiny} shrink-0 border border-rule px-3.5 py-2 text-bone-soft transition-colors hover:border-bone-faint hover:bg-surface-alt hover:text-bone`}
      >
        Index scoring
        {coverage.darkPoints.length ? (
          <span className="ml-2 text-ember">
            {coverage.darkPoints.length} dark
          </span>
        ) : null}
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
                    {x.id === "chart" && coverage.darkPoints.length ? (
                      <span className="ml-1.5 text-ember">•</span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-0 grow overflow-y-auto px-10 pt-1 pb-9">
              {tab === "index" ? (
                <>
                  <Section label="What the number is">
                    A constructed index, 0–100, of how densely your natal
                    vocational architecture is being contacted at a moment. Not
                    a probability, not a percentage of anything, and not a
                    measure of success, income, satisfaction or the chance of a
                    promotion.
                  </Section>

                  <Section label="Opportunity counts as activation">
                    Jupiter moves the number as much as Pluto does. The index
                    asks how much is addressing the architecture, not how hard
                    it presses — a period that opens doors is as activated as
                    one that closes them, and the difference between the two is
                    the process named on the window, never the height of the
                    line.
                  </Section>

                  <Section label="What a low reading means">
                    That little is contacting the architecture then. Nothing
                    more. A career is not less real in a quiet decade, and most
                    working lives are mostly quiet decades — which is what makes
                    the loud stretches worth finding at all.
                  </Section>

                  <Section label="Read against itself, not against anyone else">
                    Charts do not have the same number of career addresses, and
                    the cached feed cannot reach all of them on every chart. The
                    coverage term is normalised for that, but the ceiling still
                    differs. Compare your forties with your twenties; do not
                    compare your 62 with someone else&rsquo;s 71.
                  </Section>

                  <div className="mt-8">
                    <p className={`${T.micro} text-bone-faint`}>The bands</p>
                    <ul className="mt-3 space-y-3">
                      {CAREER_MODEL.bands.map((band) => (
                        <li key={band.label}>
                          <p className="flex items-baseline gap-3">
                            <span className="datum shrink-0 text-[0.6875rem] text-bone-faint">
                              {band.from}+
                            </span>
                            <span className="text-[1.0625rem] font-light text-bone">
                              {band.label}
                            </span>
                          </p>
                          <p className={`${T.note} mt-1`}>{band.meaning}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Section label="How precise it is">
                    Transits come from the cached ephemeris, which covers{" "}
                    {feed.start.slice(0, 4)}–{feed.end.slice(0, 4)}. There is
                    nothing outside those years whatever the sky is doing, so a
                    quiet stretch at either edge is the data ending rather than
                    your life. The curve is smoothed over{" "}
                    {CAREER_MODEL.smoothingRadiusSamples * 2 + 1} samples of{" "}
                    {CAREER_MODEL.sampleStepYears * 12} months, so read it as
                    seasons and never as dates.
                  </Section>

                  <Section label="The Midheaven leans on the birth time">
                    It moves about a degree every four minutes. A chart saved
                    with a rounded or remembered time carries an axis wrong by
                    degrees and dates here wrong by months, while still looking
                    exact — nothing downstream can detect it, because a wrong
                    angle produces a perfectly well-formed transit.
                  </Section>

                  <Section label={`Before age ${CAREER_MODEL.vocationalFloorAge}`}>
                    The line is drawn from birth because the architecture is
                    genuinely contacted from birth. Nothing below age{" "}
                    {CAREER_MODEL.vocationalFloorAge} is labelled as a peak or
                    listed as a window: the transits are real, the noun is not.
                  </Section>
                </>
              ) : null}

              {tab === "weights" ? (
                <>
                  <Section label="The formula">
                    Every contact scores target relevance × aspect relevance ×
                    exactness. A moment then combines five facts about the
                    contacts running at it, each capped at a saturation point so
                    that many weak contacts cannot quietly outweigh one exact
                    contact on the axis.
                  </Section>

                  <Table
                    caption={`The five parts · ${total} in total, capped at 100`}
                    rows={parts.map((key) => ({
                      key,
                      name: PART_LABEL[key],
                      value: `up to ${CAREER_MODEL.parts[key]}`,
                      gloss: PART_GLOSS[key],
                    }))}
                  />

                  <Table
                    caption="Target relevance · which address is being hit"
                    rows={(
                      Object.keys(CAREER_MODEL.targets) as (keyof typeof CAREER_MODEL.targets)[]
                    ).map((key) => ({
                      key,
                      name: {
                        midheaven: "MC–IC axis",
                        tenthRuler: "Ruler of the 10th",
                        tenthTenant: "Planet in the 10th",
                        tenthHouse: "Transit through the 10th",
                      }[key],
                      value: CAREER_MODEL.targets[key].toFixed(2),
                      gloss: TARGET_GLOSS[key],
                    }))}
                  />

                  <Table
                    caption="Aspect relevance · how it is being hit"
                    rows={(
                      Object.keys(CAREER_MODEL.aspects) as (keyof typeof CAREER_MODEL.aspects)[]
                    ).map((key) => ({
                      key,
                      name: key,
                      value: CAREER_MODEL.aspects[key].toFixed(2),
                      gloss:
                        key === "Trine" || key === "Sextile"
                          ? coverage.minorAspects
                            ? "Soft contact — reached, and rarely marking an event on its own."
                            : "Weighted, but the cached feed computes major aspects only. This scores nothing on this chart."
                          : undefined,
                      muted:
                        (key === "Trine" || key === "Sextile") &&
                        !coverage.minorAspects,
                    }))}
                  />

                  <Table
                    caption="Saturation · where more stops counting"
                    rows={[
                      {
                        key: "independentPlanets",
                        name: "Independent bodies",
                        value: String(CAREER_MODEL.saturation.independentPlanets),
                        gloss:
                          "Convergence maxes out here. A fourth planet adds nothing, because by three the claim is already made.",
                      },
                      {
                        key: "targetLayers",
                        name: "Architecture layers",
                        value: `${CAREER_MODEL.saturation.targetLayers} — ${coverage.layerSaturation} on this chart`,
                        gloss:
                          "Lowered to the layers this chart can actually reach, so a chart with two live layers is not capped below one with four for a reason that has nothing to do with its sky.",
                      },
                      {
                        key: "retrogradeReturns",
                        name: "Retrograde returns",
                        value: String(CAREER_MODEL.saturation.retrogradeReturns),
                        gloss: "Persistence maxes out at three re-crossings.",
                      },
                      {
                        key: "simultaneousContacts",
                        name: "Simultaneous contacts",
                        value: String(CAREER_MODEL.saturation.simultaneousContacts),
                        gloss: "Multiplicity maxes out at four at once.",
                      },
                      {
                        key: "exactnessFloor",
                        name: "Exactness floor",
                        value: CAREER_MODEL.exactnessFloor.toFixed(2),
                        gloss:
                          "The strength a contact keeps at the far edge of its orb. It never falls to zero while in effect — a transit that is still in orb is still in effect. House transits have no exact moment, so they hold full exactness throughout.",
                      },
                    ]}
                  />

                  <Table
                    caption="Peaks · which maxima get a label"
                    rows={[
                      {
                        key: "floor",
                        name: "Minimum value",
                        value: String(CAREER_MODEL.peak.floor),
                        gloss: "Below this a local maximum is not worth naming.",
                      },
                      {
                        key: "spacing",
                        name: "Minimum spacing",
                        value: `${CAREER_MODEL.peak.spacingYears} years`,
                        gloss:
                          "Two labels closer than this describe one event twice; the lower is dropped.",
                      },
                      {
                        key: "max",
                        name: "Maximum labels",
                        value: String(CAREER_MODEL.peak.maximumLabels),
                        gloss: "Across the whole life.",
                      },
                      {
                        key: "floorAge",
                        name: "Vocational floor",
                        value: `age ${CAREER_MODEL.vocationalFloorAge}`,
                        gloss:
                          "No peak or window below it. The transits are real; a career is not yet the right noun for them.",
                      },
                    ]}
                  />

                  <div className="mt-8">
                    <p className={`${T.micro} text-bone-faint`}>
                      What counts as a transiting body
                    </p>
                    <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      {CAREER_MODEL.planets.map((planet) => (
                        <span key={planet} className="flex items-baseline gap-2">
                          <span
                            className="glyph text-[1.125rem]"
                            style={{ color: bodyColor(planet) }}
                          >
                            {bodyGlyph(planet)}
                          </span>
                          <span className={`${T.note} text-bone-soft`}>
                            {planet}
                          </span>
                        </span>
                      ))}
                    </p>
                    <p className={`${T.note} mt-3`}>
                      The slow bodies only. Everything faster crosses the
                      architecture several times a year and cannot tell a loud
                      decade from a quiet one.
                    </p>
                  </div>

                  <div className="mt-8">
                    <p className={`${T.micro} text-bone-faint`}>
                      Deliberately excluded
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {(
                        Object.keys(CAREER_MODEL.deferred) as (keyof typeof CAREER_MODEL.deferred)[]
                      ).map((key) => (
                        <li key={key} className={`${T.note}`}>
                          <span className="text-bone-soft">
                            {{
                              sixthRuler: "Ruler of the 6th",
                              secondRuler: "Ruler of the 2nd",
                              genericSaturn: "Saturn as such",
                              genericSun: "The Sun as such",
                              fastPlanets: "The fast planets",
                              minorAspects: "Trine and sextile",
                            }[key]}
                          </span>{" "}
                          — {CAREER_MODEL.deferred[key]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Section label="Why these numbers">
                    They are judgements, not measurements. They follow one
                    argument: what separates a career being reorganised from one
                    merely being busy is a close contact on a central address
                    and several independent bodies arriving at once — so those
                    two carry three quarters of the total between them, and
                    everything else is a modifier.
                  </Section>

                  <Section label="Why no planet is weighted">
                    The obvious formula — Pluto 30, Saturn 20, Jupiter 10 — is a
                    number nobody can justify, and it would turn this into a
                    ranking of planetary power rather than a reading of a
                    career. Which planet it is decides what KIND of period this
                    is, not how large. Planet identity enters the number in one
                    place only, as independence rather than importance:
                    convergence counts distinct bodies, so Saturn and Pluto
                    together score where Saturn making two contacts does not.
                  </Section>
                </>
              ) : null}

              {tab === "windows" ? (
                <>
                  <Section label="A different question from the index">
                    The index says how MUCH is contacting the architecture. A
                    window says WHAT ARRANGEMENT exists, which has no size and
                    no scale. Neither ranks the other, and no score promotes a
                    window — the grades are structural, so a turning-point
                    configuration can sit at an unremarkable index value and a
                    high index can be one very exact contact and nothing else.
                    The dates printed under the strip are chosen by the index
                    for that reason: they mark the periods worth noticing, not
                    the ones carrying the top grade.
                  </Section>

                  <ul className="mt-6 space-y-5">
                    {(["turningPoint", "convergence", "active"] as CareerWindowGrade[]).map(
                      (grade) => (
                        <li key={grade} className="flex gap-4">
                          <span
                            className="mt-2 h-2 w-4 shrink-0"
                            style={{ background: CAREER_GRADE_TINT[grade] }}
                          />
                          <span>
                            <span
                              className="text-[1.125rem] font-light"
                              style={{ color: CAREER_GRADE_TINT[grade] }}
                            >
                              {careerWindowLabel(grade)}
                            </span>
                            <p className={`${T.body} mt-1.5`}>
                              {careerWindowMeaning(grade)}
                            </p>
                          </span>
                        </li>
                      ),
                    )}
                  </ul>

                  <Section label="Five processes">
                    What each body does to a career, in ordinary English. The
                    process is the claim; the planet is the evidence for it.
                    None of them is bigger than another.
                  </Section>

                  <ul className="mt-5 space-y-3">
                    {(
                      Object.keys(CAREER_WINDOW_MODEL.processes) as (keyof typeof CAREER_WINDOW_MODEL.processes)[]
                    ).map((planet) => (
                      <li key={planet} className="flex flex-wrap items-baseline gap-x-3">
                        <span
                          className="glyph text-[1.125rem]"
                          style={{ color: bodyColor(planet) }}
                        >
                          {bodyGlyph(planet)}
                        </span>
                        <span className="text-[1.0625rem] font-light text-bone">
                          {CAREER_WINDOW_MODEL.processes[planet]}
                        </span>
                        <span className={`${T.micro} text-bone-faint`}>
                          {planet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Section label="Why a window ends">
                    A run ends when the SET of bodies in contact changes, not
                    only when the grade does. Without that, one fourteen-year
                    Neptune transit through the 10th would thread unrelated
                    Saturn and Jupiter contacts into a single career window
                    spanning most of a working life.
                  </Section>
                </>
              ) : null}

              {tab === "vocabulary" ? (
                <>
                  <Section label="Every word the page uses, defined once">
                    A reading is three independent facts joined: WHAT KIND of
                    change is happening, WHICH PART of the career structure it
                    is happening to, and WHAT SHAPE the contact takes. Five
                    processes, four addresses and four geometries — eighty
                    readings out of thirteen entries, none of them written out
                    in advance. Everything below is generated from those
                    tables, so a definition describing vocabulary the code no
                    longer uses is not possible.
                  </Section>

                  <div className="mt-8">
                    <p className={`${T.micro} text-bone-faint`}>
                      Five processes · what the body does
                    </p>
                    <ul className="mt-4 space-y-5">
                      {CAREER_MODEL.planets.map((planet) => {
                        const fn = PROCESS[planet];
                        if (!fn) return null;
                        return (
                          <li key={planet}>
                            <p className="flex flex-wrap items-baseline gap-x-3">
                              <span
                                className="glyph text-[1.125rem]"
                                style={{ color: bodyColor(planet) }}
                              >
                                {bodyGlyph(planet)}
                              </span>
                              <span className="text-[1.125rem] font-light text-bone">
                                {fn.label}
                              </span>
                              <span className={`${T.micro} text-bone-faint`}>
                                {planet} · {fn.role.toLowerCase()}
                              </span>
                            </p>
                            <p className={`${T.body} mt-1.5`}>
                              {planet} {fn.gloss}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                    <p className={`${T.note} mt-4`}>
                      Not a ranking. Pluto is not a stronger Saturn — it is a
                      different verb, and that difference is the entire
                      reading.
                    </p>
                  </div>

                  <div className="mt-8">
                    <p className={`${T.micro} text-bone-faint`}>
                      Four addresses · what is being worked on
                    </p>
                    <ul className="mt-4 space-y-5">
                      {(Object.keys(ADDRESS) as CareerTargetKind[]).map((kind) => (
                        <li key={kind}>
                          <p className="flex flex-wrap items-baseline gap-x-3">
                            <span className="text-[1.125rem] font-light text-bone">
                              {ADDRESS[kind].label}
                            </span>
                            <span className={`${T.micro} text-bone-faint`}>
                              {ADDRESS[kind].short}
                            </span>
                          </p>
                          <p className={`${T.body} mt-1.5`}>
                            {ADDRESS[kind].activated}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <p className={`${T.micro} text-bone-faint`}>
                      Four geometries · what shape the contact takes
                    </p>
                    <ul className="mt-4 space-y-4">
                      {(Object.keys(GEOMETRY) as Geometry[]).map((g) => (
                        <li key={g}>
                          <p className="flex flex-wrap items-baseline gap-x-3">
                            <span className="text-[1.0625rem] font-light text-bone">
                              {GEOMETRY[g].label}
                            </span>
                            <span className={`${T.micro} text-bone-faint`}>
                              {GEOMETRY[g].shape}
                            </span>
                          </p>
                          <p className={`${T.body} mt-1.5`}>
                            {GEOMETRY[g].asks
                              .charAt(0)
                              .toUpperCase() + GEOMETRY[g].asks.slice(1)}
                            .
                          </p>
                        </li>
                      ))}
                    </ul>
                    <p className={`${T.note} mt-4`}>
                      Trine and sextile share one entry. They differ by degree
                      and not by anything a reader can act on differently, so
                      writing two paragraphs for them would be writing to fill
                      a table.
                    </p>
                  </div>
                </>
              ) : null}

              {tab === "chart" ? (
                <>
                  <Section label="Which layers can light up">
                    The index can only report what the cached feed computes. A
                    layer that is present in the chart but unreachable in the
                    feed scores zero forever — and looks exactly like a layer
                    that is simply quiet. That difference is stated here rather
                    than left for the reader to infer from a flat line.
                  </Section>

                  <ul className="mt-6 space-y-5">
                    {coverage.targets.map((target) => {
                      const state = !target.present
                        ? { text: "Not in this chart", tone: "text-bone-faint/70" }
                        : !target.reachable
                          ? { text: "Unreachable in the feed", tone: "text-ember" }
                          : target.darkPoints.length
                            ? { text: "Partly reachable", tone: "text-ember" }
                            : target.observed
                              ? { text: "Contacted", tone: "text-patina" }
                              : { text: "Reachable, never contacted", tone: "text-bone-faint" };
                      return (
                        <li key={target.kind}>
                          <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <span className="text-[1.0625rem] font-light text-bone">
                              {target.label}
                            </span>
                            <span className={`${T.micro} shrink-0 ${state.tone}`}>
                              {state.text}
                            </span>
                          </p>
                          <p className={`${T.note} mt-1`}>
                            <span className="datum text-bone-faint">
                              relevance {target.relevance.toFixed(2)}
                            </span>
                            {target.points.length ? (
                              <> · {target.points.join(", ")}</>
                            ) : null}
                          </p>
                          {target.present && target.darkPoints.length ? (
                            <p className={`${T.note} mt-1.5 border-l-2 border-ember pl-3`}>
                              The cached feed computes aspect contacts against
                              the personal planets, the north node and the two
                              angles only.{" "}
                              {target.darkPoints.join(" and ")}{" "}
                              {target.darkPoints.length > 1 ? "are" : "is"} not
                              among them, so{" "}
                              {target.reachable
                                ? "that part of this layer contributes"
                                : "this layer contributes"}{" "}
                              nothing to the curve on this chart. Re-run the
                              cycle cache with{" "}
                              {target.darkPoints.length > 1 ? "them" : "it"} as
                              natal targets to close the gap.
                            </p>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>

                  <Table
                    caption="What that does to the scoring"
                    rows={[
                      {
                        key: "reachable",
                        name: "Reachable layers",
                        value: `${coverage.reachableLayers} of ${coverage.targets.length}`,
                        gloss:
                          "How many layers of the architecture can produce a contact at all on this chart.",
                      },
                      {
                        key: "dark",
                        name: "Unreachable addresses",
                        value: coverage.darkPoints.length
                          ? coverage.darkPoints.join(", ")
                          : "none",
                        gloss: coverage.darkPoints.length
                          ? "These natal points score zero on every date on this page, however close a transit comes to them."
                          : "Every address in this chart's architecture can be contacted by the feed.",
                        muted: coverage.darkPoints.length === 0,
                      },
                      {
                        key: "saturation",
                        name: "Coverage normalised to",
                        value: String(coverage.layerSaturation),
                        gloss:
                          "The coverage part reaches its full 10 at this many simultaneous layers, rather than at a fixed 3.",
                      },
                      {
                        key: "minor",
                        name: "Minor aspects in feed",
                        value: coverage.minorAspects ? "yes" : "no",
                        gloss: coverage.minorAspects
                          ? "Trine and sextile contacts are present and scoring."
                          : "Trine and sextile are weighted in the model but absent from this cache, so only conjunction, opposition and square score here.",
                        muted: !coverage.minorAspects,
                      },
                      {
                        key: "feed",
                        name: "Ephemeris covers",
                        value: `${feed.start.slice(0, 4)}–${feed.end.slice(0, 4)}`,
                        gloss:
                          "Everything outside these years reads as quiet because there is no data, not because the sky is still.",
                      },
                    ]}
                  />
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

/**
 * A caption and a set of name / value / gloss rows.
 *
 * Every constant in the model renders through this, which is what keeps five
 * tables of very different content reading as one instrument rather than as
 * five people's ideas of a table.
 */
function Table({
  caption,
  rows,
}: {
  caption: string;
  rows: {
    key: string;
    name: string;
    value: string;
    gloss?: string;
    muted?: boolean;
  }[];
}) {
  return (
    <div className="mt-8">
      <p className={`${T.micro} text-bone-faint`}>{caption}</p>
      <ul className="mt-3 space-y-3.5">
        {rows.map((row) => (
          <li key={row.key} className={row.muted ? "opacity-55" : undefined}>
            <p className="flex items-baseline justify-between gap-4">
              <span className="text-[1.0625rem] font-light text-bone">
                {row.name}
              </span>
              <span className="datum shrink-0 text-[0.6875rem] text-bone-soft">
                {row.value}
              </span>
            </p>
            {row.gloss ? (
              <p className={`${T.note} mt-1`}>{row.gloss}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
