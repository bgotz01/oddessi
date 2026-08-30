//components/western/career/career-snapshot.tsx

"use client";

import { useMemo } from "react";

import {
  careerSnapshotArchitecture,
  type CareerBullet,
  type CareerCard,
  type CareerSnapshotArchitecture,
  type CareerSnapshotForce,
  type CareerSnapshotRole,
  type CareerSnapshot,
} from "@/lib/career";

import { T } from "@/components/western/growth/growth-ui";

/**
 * CASE, and which layer gets it.
 *
 * `.inscription` uppercases at 0.18em of tracking, which is right for what it
 * was drawn for — a nav item, a section name, three or four words that are a
 * NAME rather than a statement. It was carrying the force headlines, which are
 * sentences: "BE RECOGNIZED FOR RELIABILITY" set in Cinzel caps across a
 * 270px column wraps to three lines and has to be spelled out rather than
 * read.
 *
 * So the section splits on what a piece of text IS. Labels — the eyebrows, the
 * office names, the section kickers — stay in the tracked mono caps, because
 * that is the system's word for "this names the thing below it". Anything that
 * is a proposition or a proper noun is set mixed-case in the display face,
 * which is what the thesis statement was already doing and the reason it was
 * the most readable thing on the page.
 */
const DISPLAY = { fontFamily: "var(--font-display)" } as const;

/**
 * COLOUR, and what it is allowed to mean here.
 *
 * The system permits two accents. This section spends each on exactly one
 * distinction:
 *
 *   PATINA  the signature — the standing structure the page is describing.
 *           The thesis, the forces, the evidence behind them.
 *   EMBER   what is particular to THIS chart rather than to the model. A
 *           doubled office, a retrograde ruler, a dynamic worth naming, a
 *           factor the data cannot read.
 *
 * The four forces are peers, so all four eyebrows are patina at full. The one
 * distinction between them is carried by the rule above each: Direction and
 * Engine are the two forces the thesis is composed FROM, so their rule is the
 * accent at full and twice as long, and Earning and Arena take a short rule at
 * a third. That is a fact about the sentence above the columns rather than a
 * ranking of the forces, and it is drawn quietly for that reason — an eyebrow
 * greyed out would have said these two matter less, which is not the claim.
 *
 * `antique-gold` used to appear here, on the dynamics block. There is no such
 * token — not in `@theme`, not anywhere else in the app — so those classes
 * emitted nothing and the labels fell back to inherited colour. It was also a
 * third accent, which the palette's own note rules out.
 */
const THESIS_ROLES: readonly CareerSnapshotRole[] = ["direction", "engine"];

interface CareerForceCopy {
  eyebrow: string;
  question: string;
}

const ROLE_COPY: Record<CareerSnapshotRole, CareerForceCopy> = {
  direction: { eyebrow: "Direction", question: "Where you're headed" },
  engine: { eyebrow: "Engine", question: "How you work" },
  earning: { eyebrow: "Earning", question: "What gets paid" },
  arena: { eyebrow: "Arena", question: "Where you're seen" },
};

/**
 * "Venus in Gemini 23°46′ · 11th house", set so the degree reads as a
 * measurement and the house as a suffix.
 *
 * Three things changed. The face is mixed-case display rather than
 * `.inscription`, so a placement reads as the proper noun it is. The degree
 * and the house suffix are `.datum` — the system's face for anything measured
 * — where they were `font-sans`, which resolves to whatever UI font the OS
 * supplies and is the one typeface not in this design. And the suffix cannot
 * break: it was wrapping mid-phrase and dropping "house" onto a line of its
 * own at half size.
 *
 * The space before the degree is load-bearing rather than decorative. Without
 * it the accessible name of the heading this sits inside is "Taurus12°44′".
 */
function PlacementTitle({ placement }: { placement: string }) {
  const match = placement.match(/^(.*?)(\d{1,2}°(?:\d{1,2}′)?)(.*)$/);
  const face =
    "text-[1.3rem] font-medium leading-tight tracking-[0.02em] text-bone xl:text-[1.15rem]";

  if (!match) {
    return (
      <span className={face} style={DISPLAY}>
        {placement}
      </span>
    );
  }

  const [, before, degree, after] = match;

  return (
    <span className={face} style={DISPLAY}>
      {before.trim()}{" "}
      <span className="datum relative -top-[0.5em] text-[0.42em] font-normal tracking-[0.06em] text-bone-faint/80">
        {degree}
      </span>
      {after.trim() ? (
        <>
          {" "}
          <span className="datum whitespace-nowrap text-[0.5em] font-normal text-bone-faint/70">
            {after.trim()}
          </span>
        </>
      ) : null}
    </span>
  );
}

function CareerThesis({ thesis }: Pick<CareerSnapshotArchitecture, "thesis">) {
  if (!thesis) return null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 text-center md:px-14 md:py-12 lg:px-20">
      <p className={`${T.micro} text-patina`}>Career thesis</p>

      {/*
        Two explicit rows rather than `items-center`.

        Centring each half as a block meant that whenever one concept wrapped
        and the other did not — which is most widths between 768 and 1100 — the
        two eyebrows sat at different heights. They are a pair; a formula whose
        two labels are eleven pixels out of line reads as two unrelated things
        that happen to be adjacent.
      */}
      <div className="mx-auto mt-6 grid max-w-2xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] grid-rows-[auto_auto] items-start gap-x-4 gap-y-1.5 border-y border-rule/70 py-5 text-left">
        <p className={`${T.tiny} col-start-1 row-start-1 text-right text-patina/75`}>
          {thesis.direction.source} · Direction
        </p>
        <p
          className="col-start-1 row-start-2 text-right text-[1rem] leading-snug text-bone-soft md:text-[1.1rem]"
          style={DISPLAY}
        >
          {thesis.direction.concept}
        </p>

        <div className="col-start-2 row-span-2 row-start-1 flex h-full items-center border-x border-rule/50 px-4">
          <span className="datum text-[0.95rem] text-patina/60" aria-hidden>
            ×
          </span>
        </div>

        <p className={`${T.tiny} col-start-3 row-start-1 text-patina/75`}>
          {thesis.engine.source} · Engine
        </p>
        <p
          className="col-start-3 row-start-2 text-[1rem] leading-snug text-bone-soft md:text-[1.1rem]"
          style={DISPLAY}
        >
          {thesis.engine.concept}
        </p>
      </div>

      {/*
        A sentence, not a section name — so it is a paragraph. It was the
        section's only `<h2>`, which put the heading outline in the odd
        position of naming the section after its own conclusion, and left the
        four force headings dangling under nothing at all on any chart whose
        thesis could not be composed.
      */}
      <p
        className="mx-auto mt-7 max-w-3xl text-[1.5rem] font-medium leading-[1.35] tracking-[0.035em] text-bone md:text-[1.85rem]"
        style={DISPLAY}
      >
        {thesis.statement}
      </p>
    </div>
  );
}

/**
 * One force, laid out so the four of them line up.
 *
 * The placement footer used to sit in normal flow, which put its rule at four
 * different heights across four adjacent columns — 254, 332, 268 and 254 pixels
 * down — in a grid whose entire visual language is aligned hairlines. Two
 * mechanisms fix it, one per breakpoint. Below `xl` the article is a flex
 * column and the footer takes `mt-auto`, so the footers meet at the bottom of
 * the tallest column in their row. At `xl`, where all four sit in one row, the
 * article becomes a subgrid of the parent's six rows: header, headline, body,
 * office label, placement and examples each get a shared height, so the
 * columns agree at every layer rather than only at the last one.
 *
 * The horizontal padding is per-column-position rather than per-child. The old
 * `xl:first:pl-0 xl:last:pr-0` only flushed the outer edges at `xl`; at the
 * two-column breakpoint items 1 and 3 are the left column and 2 and 4 the
 * right, so `first`/`last` reached the wrong two and the grid sat 28px right of
 * the section rule above it.
 */
function CareerForceColumn({
  force,
  inThesis,
}: {
  force: CareerSnapshotForce;
  inThesis: boolean;
}) {
  const copy = ROLE_COPY[force.role];

  return (
    <article
      className={[
        "flex flex-col bg-void px-0 py-7",
        "md:px-7 md:[&:nth-child(odd)]:pl-0 md:[&:nth-child(even)]:pr-0",
        "xl:grid xl:row-span-6 xl:grid-rows-subgrid",
        "xl:[&:nth-child(odd)]:pl-7 xl:[&:nth-child(even)]:pr-7",
        "xl:first:pl-0 xl:last:pr-0",
      ].join(" ")}
    >
      <header>
        <span
          aria-hidden
          className={`block h-[2px] ${inThesis ? "w-8 bg-patina" : "w-4 bg-patina/30"}`}
        />
        <p className={`${T.micro} mt-3.5 text-patina`}>{copy.eyebrow}</p>
        <p className="mt-1 text-[0.9375rem] leading-snug text-bone-faint/75">
          {copy.question}
        </p>
      </header>

      <h3
        className="mt-5 max-w-md text-[1.3rem] font-medium leading-snug tracking-[0.02em] text-bone xl:text-[1.2rem]"
        style={DISPLAY}
      >
        {force.headline}
      </h3>

      <p className={`${T.read} mt-3 max-w-md text-bone-soft`}>
        {force.interpretation}
      </p>

      {/*
        The office label and the placement are two subgrid rows, not one block.

        Aligning the footer as a unit was not enough: "Midheaven" is one line
        and "In the 10th · Ruler of the 2nd" is two, so the placements beneath
        them still sat fourteen pixels apart — and the placement is the thing a
        reader scans this row for. Splitting it means the four rules meet, and
        so do the four placements, whatever the labels above them do.
      */}
      <div className="mt-auto pt-6 xl:row-span-2 xl:mt-0 xl:grid xl:grid-rows-subgrid xl:pt-0">
        <p className={`${T.micro} border-t border-rule/70 pt-3 text-bone-faint`}>
          {force.card.labels.join(" · ")}
        </p>
        <div className="mt-1.5">
          <PlacementTitle placement={force.card.placement} />
          {force.sharedWith.length ? (
            <p className={`${T.note} mt-2.5 text-ember/85`}>
              Same placement also supplies{" "}
              {force.sharedWith.map((role) => ROLE_COPY[role].eyebrow).join(" and ")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 border-t border-rule/40 pt-3 xl:mt-0">
        {force.examples.length ? (
          <>
            <p className="datum text-[0.75rem] tracking-[0.14em] text-patina/85 uppercase">
              Possible expressions
            </p>
            <ul className="mt-2 flex flex-wrap gap-y-1 text-[0.875rem] leading-relaxed text-bone-soft">
              {force.examples.map((example, index) => (
                <li key={example} className="flex">
                  <span>{example}</span>
                  {index < force.examples.length - 1 ? (
                    <span aria-hidden className="mx-2 text-patina/35">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </article>
  );
}

/**
 * One shape for one to six findings.
 *
 * This was two layouts: an accented list below three items, a numbered table
 * at three and above. Most charts raise one or two dynamics, so the table was
 * the branch nobody saw — and when it did run, the `01` index column and the
 * full-width table rules were scaffolding for a list long enough to lose your
 * place in, which six short findings are not. The accented list is the one that
 * was already right; it scales to six in two columns without changing what it
 * looks like at one.
 */
function CareerDynamics({ items }: { items: CareerSnapshot["emphasis"] }) {
  if (!items.length) return null;

  return (
    <section className="mt-14" aria-labelledby="career-dynamics-title">
      <h3 id="career-dynamics-title" className={`${T.micro} text-ember`}>
        Career dynamics
      </h3>
      <div
        className={`mt-5 grid gap-x-10 gap-y-7 ${items.length > 1 ? "md:grid-cols-2" : ""}`}
      >
        {items.map((item) => (
          <article
            key={item.key}
            className="border-l-2 border-ember/40 pl-5"
          >
            <p
              className="text-[1.05rem] font-medium leading-snug tracking-[0.02em] text-bone"
              style={DISPLAY}
            >
              {item.key}
            </p>
            <p className={`${T.read} mt-1.5 max-w-xl text-bone-soft`}>
              {item.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Finding({ item }: { item: CareerBullet }) {
  return (
    <div>
      <dt className={`${T.tiny} text-bone-faint/60`}>{item.key}</dt>
      <dd className={`${T.read} mt-1 text-bone-soft`}>{item.value}</dd>
    </div>
  );
}

function CareerEvidence({ cards }: { cards: CareerCard[] }) {
  if (!cards.length) return null;

  return (
    <details className="group mt-12 border-y border-rule py-5">
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-6">
          <span
            className={`${T.micro} text-bone transition-colors group-hover:text-patina`}
          >
            Why this reading
          </span>
          <span
            aria-hidden
            className="text-bone-faint transition-all group-hover:text-patina group-open:rotate-45"
          >
            +
          </span>
        </span>

        {/*
          Hairline dividers rather than a bullet.

          The cards were joined with "•" while each card's own offices are
          joined with "·". At 10px those are the same mark, so six placements
          and their offices arrived as one undifferentiated string.
        */}
        <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {cards.map((card) => (
            <span
              key={card.id}
              className={`${T.tiny} border-l border-rule pl-4 text-bone-faint/65 first:border-l-0 first:pl-0`}
            >
              {card.labels.join(" · ")}
            </span>
          ))}
        </span>
      </summary>

      <div className="mt-7 grid items-start gap-x-10 gap-y-9 border-t border-rule pt-7 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article key={card.id}>
            <p className={`${T.micro} text-patina`}>{card.labels.join(" · ")}</p>
            {/*
              The visible heading is the placement, which out of context is a
              sign and a degree — "Sagittarius 07°16′ · 4th house" names no
              body, so a reader moving by heading learns nothing about which
              card they landed on. The offices are already printed directly
              above it; the heading repeats them where only the outline looks.
            */}
            <h3 className="mt-2">
              <span className="sr-only">{card.labels.join(" · ")}: </span>
              <PlacementTitle placement={card.placement} />
            </h3>
            <p className={`${T.tiny} mt-2 leading-relaxed text-bone-faint/65`}>
              {card.represents}
              {card.retrograde ? (
                <span className="text-ember"> · retrograde</span>
              ) : null}
            </p>
            <dl className="mt-4 space-y-3.5">
              {card.bullets.map((item) => (
                <Finding key={`${item.key}-${item.value}`} item={item} />
              ))}
            </dl>
          </article>
        ))}
      </div>
    </details>
  );
}

function ReadingScope({ caveat }: { caveat: string }) {
  if (!caveat) return null;

  return (
    <aside className="mt-6 max-w-4xl border-l-2 border-patina/70 py-1 pl-5">
      <p className={`${T.micro} text-patina`}>Reading scope</p>
      <p className={`${T.read} mt-2 text-bone-soft`}>{caveat}</p>
    </aside>
  );
}

function UnreadableNotes({ snapshot }: { snapshot: CareerSnapshot }) {
  if (!snapshot.unreadable.length) return null;

  return (
    <div className="mt-12 border-t border-rule pt-5">
      <p className={`${T.note} max-w-3xl border-l-2 border-ember/70 pl-5`}>
        <span className="text-ember">Not readable: </span>
        {snapshot.unreadable.join(", ")}. Rulers and angles require houses,
        and houses require a birth time.
      </p>
    </div>
  );
}

/**
 * Named for what it is rather than for its own type.
 *
 * The component and `CareerSnapshot` the type shared a name. It compiled —
 * values and types are separate namespaces — but `snapshot: CareerSnapshot`
 * inside `function CareerSnapshot` is a double-take every time. The default
 * export is unaffected, so no caller changes.
 */
export default function CareerSnapshotSection({
  snapshot,
}: {
  snapshot: CareerSnapshot;
}) {
  const architecture = useMemo(
    () => careerSnapshotArchitecture(snapshot),
    [snapshot],
  );

  const hasThesis = Boolean(architecture.thesis);

  return (
    <section aria-labelledby="career-reading-title">
      <div className="border-b border-rule pb-3">
        <h2 id="career-reading-title" className={`${T.micro} text-bone`}>
          Career reading
        </h2>
      </div>

      <CareerThesis thesis={architecture.thesis} />

      {architecture.forces.length ? (
        <div
          className={`${hasThesis ? "" : "mt-10"} grid gap-px border-y border-rule bg-rule md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[auto_auto_1fr_auto_auto_auto]`}
        >
          {architecture.forces.map((force) => (
            <CareerForceColumn
              key={force.role}
              force={force}
              inThesis={hasThesis && THESIS_ROLES.includes(force.role)}
            />
          ))}
        </div>
      ) : null}

      <CareerDynamics items={architecture.dynamics} />
      <CareerEvidence cards={architecture.evidence} />
      <UnreadableNotes snapshot={snapshot} />
      <ReadingScope caveat={snapshot.caveat} />
    </section>
  );
}
