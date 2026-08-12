"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Block, ListColumn, Pair, Prose, Terms } from "@/components/study-panel";
import {
  ANIMALS,
  BRANCHES,
  CONTROLS,
  GENERATES,
  HIDDEN_STEMS,
  PILLAR_ROLE,
  STEMS,
  generatedBy,
  type BranchIndex,
  type Element,
  type StemIndex,
} from "@/lib/chinese/almanac";
import { ELEMENT_STYLE, elementColor } from "@/lib/chinese/palette";
import {
  GOD_FAMILIES,
  godOf,
  type GodFamily,
} from "@/lib/chinese/ten-gods";
import {
  combinationInPosition,
  dayMasterNarrative,
  pillarCombination,
  stemArchetype,
} from "@/lib/chinese/reading";
import {
  CONCEPTS,
  ELEMENT_NOTES,
  PILLAR_NOTES,
  STEM_NOTES,
  type ConceptKey,
} from "@/lib/chinese/lexicon";

/**
 * The reading drawer for the Chinese section.
 *
 * The Western pages open their passages *in place* — a row expands and pushes
 * the list down, because there you are working through a list one item at a
 * time. This section is not a list: it is one dense object where any of eight
 * characters, five bars and four headings might be the thing you did not
 * recognise. So the explanation comes in from the side and leaves the chart
 * where it was, which is the only way to read a character and still see the
 * pillar it was standing in.
 *
 * Everything explainable goes through `useExplain`. Nothing on these pages is
 * allowed to be a dead end.
 */

export type Explainable =
  | {
    kind: "pillar";
    role: "year" | "month" | "day" | "hour";
    stem: StemIndex;
    branch: BranchIndex;
    dayMaster: StemIndex;
  }
  | { kind: "stem"; stem: StemIndex; asDayMaster?: boolean }
  | { kind: "branch"; branch: BranchIndex }
  | { kind: "element"; element: Element; share?: number }
  | { kind: "god"; family: GodFamily; share?: number }
  | { kind: "luck"; stem: StemIndex; branch: BranchIndex; startAge: number; endAge: number; startDate: string; endDate: string }
  | { kind: "concept"; concept: ConceptKey };

const ExplainContext = createContext<((subject: Explainable) => void) | null>(null);

export function useExplain(): (subject: Explainable) => void {
  const explain = useContext(ExplainContext);
  if (!explain) {
    throw new Error("useExplain must be used inside <ExplainProvider>");
  }
  return explain;
}

export function ExplainProvider({ children }: { children: ReactNode }) {
  const [subject, setSubject] = useState<Explainable | null>(null);
  const explain = useCallback((next: Explainable) => setSubject(next), []);
  const close = useCallback(() => setSubject(null), []);

  useEffect(() => {
    if (!subject) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [subject, close]);

  return (
    <ExplainContext.Provider value={explain}>
      {children}
      {subject ? <Drawer subject={subject} onClose={close} /> : null}
    </ExplainContext.Provider>
  );
}

/**
 * A button that looks like whatever it wraps until you hover it, when the
 * hairline under it lights. Used for anything on the page that can be opened —
 * a pillar, a bar, a row — so the affordance is uniform without anything
 * turning into a card.
 */
export function Explains({
  subject,
  children,
  className = "",
  style,
  label,
}: {
  subject: Explainable;
  children: ReactNode;
  className?: string;
  /** For the element colours, which Tailwind cannot see at build time. */
  style?: CSSProperties;
  label: string;
}) {
  const explain = useExplain();
  return (
    <button
      type="button"
      onClick={() => explain(subject)}
      aria-label={`Explain ${label}`}
      style={style}
      className={`cursor-pointer text-left transition-colors hover:bg-surface-alt ${className}`}
    >
      {children}
    </button>
  );
}

/** The micro-label form, for a heading that needs a footnote rather than a body. */
export function ExplainMark({
  subject,
  label = "What is this",
}: {
  subject: Explainable;
  label?: string;
}) {
  const explain = useExplain();
  return (
    <button
      type="button"
      onClick={() => explain(subject)}
      className="datum cursor-pointer text-[0.625rem] tracking-[0.2em] text-patina-dim uppercase transition-colors hover:text-patina"
    >
      {label}
    </button>
  );
}

function Drawer({
  subject,
  onClose,
}: {
  subject: Explainable;
  onClose: () => void;
}) {
  const head = headingOf(subject);

  return (
    <>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 z-40 cursor-default bg-void/70"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={head.title}
        className="fixed inset-y-0 right-0 z-50 flex w-[min(30rem,calc(100vw-3rem))] flex-col border-l border-rule bg-surface"
      >
        <header className="flex items-start justify-between gap-6 border-b border-rule px-8 py-6">
          <div className="min-w-0">
            <p className="eyebrow mb-2">{head.eyebrow}</p>
            <div className="flex items-baseline gap-4">
              {head.han ? (
                <span className="han text-[1.25rem]">
                  {head.han.map((part, index) => (
                    <span key={index} style={{ color: part.color }}>
                      {part.char}
                    </span>
                  ))}
                </span>
              ) : null}
              <h2
                className="inscription text-[1.125rem] leading-tight"
                style={head.tint ? { color: head.tint } : undefined}
              >
                {head.title}
              </h2>
            </div>
            {head.subtitle ? (
              <p className="datum mt-2 text-[0.75rem] text-bone-faint">
                {head.subtitle}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="datum shrink-0 cursor-pointer text-[0.75rem] text-bone-faint transition-colors hover:text-bone"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 space-y-8 overflow-y-auto px-8 py-8">
          <Body subject={subject} />
        </div>
      </aside>
    </>
  );
}

/**
 * The drawer's header. `han` comes back per character so a pillar can be drawn
 * in two colours — the stem's element above, the branch's below — the same way
 * it is on the page it was opened from.
 */
function headingOf(subject: Explainable): {
  eyebrow: string;
  title: string;
  subtitle?: string;
  han?: { char: string; color: string }[];
  /** Colour for the title, where the subject is an element or made of one. */
  tint?: string;
} {
  const stemPart = (index: StemIndex) => ({
    char: STEMS[index].han,
    color: elementColor(STEMS[index].element),
  });
  const branchPart = (index: BranchIndex) => ({
    char: BRANCHES[index].han,
    color: elementColor(BRANCHES[index].element),
  });

  switch (subject.kind) {
    case "pillar": {
      const s = STEMS[subject.stem];
      const b = BRANCHES[subject.branch];
      return {
        eyebrow: `${PILLAR_ROLE[subject.role].title} pillar`,
        title: `${s.polarity} ${s.element} ${b.animal}`,
        subtitle: `${s.pinyin} ${b.pinyin} · ${s.element} over ${b.element}`,
        han: [stemPart(subject.stem), branchPart(subject.branch)],
        tint: elementColor(s.element),
      };
    }
    case "stem": {
      const s = STEMS[subject.stem];
      return {
        eyebrow: subject.asDayMaster ? "Day Master" : "Heavenly Stem",
        title: `${s.polarity} ${s.element}`,
        subtitle: `${s.pinyin} — ${s.image}`,
        han: [stemPart(subject.stem)],
        tint: elementColor(s.element),
      };
    }
    case "branch": {
      const b = BRANCHES[subject.branch];
      return {
        eyebrow: "Earthly Branch",
        title: b.animal,
        subtitle: `${b.pinyin} · ${b.polarity} ${b.element} · ${b.season} · ${b.hours}`,
        han: [branchPart(subject.branch)],
        tint: elementColor(b.element),
      };
    }
    case "element":
      return {
        eyebrow: `Element · ${ELEMENT_STYLE[subject.element].gloss}`,
        title: subject.element,
        subtitle:
          subject.share === undefined
            ? undefined
            : `${subject.share}% of this chart`,
        tint: elementColor(subject.element),
      };
    case "luck": {
      const startYear = new Date(subject.startDate).getUTCFullYear();
      const endYear = new Date(subject.endDate).getUTCFullYear();
      return {
        eyebrow: `Luck pillar · ages ${Math.floor(subject.startAge)}–${Math.floor(subject.endAge)} · ${startYear}–${endYear}`,
        title: `${STEMS[subject.stem].polarity} ${STEMS[subject.stem].element} ${BRANCHES[subject.branch].animal}`,
        subtitle: `${STEMS[subject.stem].pinyin} ${BRANCHES[subject.branch].pinyin}`,
        han: [stemPart(subject.stem), branchPart(subject.branch)],
        tint: elementColor(STEMS[subject.stem].element),
      };
    }
    case "god":
      return {
        eyebrow: `Ten Gods · ${GOD_FAMILIES[subject.family].han}`,
        title: subject.family,
        subtitle:
          subject.share === undefined
            ? undefined
            : `${subject.share}% of this chart`,
      };
    case "concept":
      return { eyebrow: "Reading", title: CONCEPTS[subject.concept].title };
  }
}

function Body({ subject }: { subject: Explainable }) {
  switch (subject.kind) {
    case "pillar":
      return <PillarBody {...subject} />;
    case "stem":
      return <StemBody stem={subject.stem} asDayMaster={subject.asDayMaster} />;
    case "branch":
      return <BranchBody branch={subject.branch} />;
    case "element":
      return <ElementBody element={subject.element} share={subject.share} />;
    case "luck":
      return <LuckBody {...subject} />;
    case "god":
      return <GodBody family={subject.family} share={subject.share} />;
    case "concept":
      return <ConceptBody concept={subject.concept} />;
  }
}

/**
 * A relation, and both of the forms it takes. The pair is shown together
 * because the difference between them is the whole reason there are ten gods
 * rather than five — and because a reader looking at "Authority" needs to know
 * which of the two they are living under.
 */
function GodBody({ family, share }: { family: GodFamily; share?: number }) {
  const group = GOD_FAMILIES[family];

  return (
    <>
      <Block
        title="The relation"
        aside={share === undefined ? group.han : `${share}% here`}
      >
        <Prose>{group.note}</Prose>
        <div className="mt-4">
          <Terms terms={group.terms} />
        </div>
      </Block>

      <Block
        title={group.opposed.name}
        aside={`${group.opposed.han} ${group.opposed.pinyin}`}
      >
        <Prose>{group.opposed.note}</Prose>
        <p className="datum mt-3 text-[0.75rem] leading-relaxed text-bone-faint">
          Opposite polarity to the Day Master — which is what makes it the
          orderly one of the pair.
        </p>
      </Block>

      <Block
        title={group.alike.name}
        aside={`${group.alike.han} ${group.alike.pinyin}`}
      >
        <Prose>{group.alike.note}</Prose>
        <p className="datum mt-3 text-[0.75rem] leading-relaxed text-bone-faint">
          Same polarity as the Day Master: the same force, off the leash.
        </p>
      </Block>

      <SeeAlso concepts={["ten-gods", "day-master", "strength"]} />
    </>
  );
}

function PillarBody({
  role,
  stem,
  branch,
  dayMaster,
}: {
  role: "year" | "month" | "day" | "hour";
  stem: StemIndex;
  branch: BranchIndex;
  dayMaster: StemIndex;
}) {
  const s = STEMS[stem];
  const b = BRANCHES[branch];
  const god = stem === dayMaster ? null : godOf(dayMaster, stem);
  // The reading for this exact pair, if the table has it — sixty of these
  // exist, so the passage is about 庚申 rather than about Metal and Monkeys.
  const combination = pillarCombination(stem, branch);

  return (
    <>
      {combination ? (
        <>
          <Block title="This pillar" aside={combination.chineseName}>
            <Prose>{combination.essence}</Prose>
            <div className="mt-4">
              <Terms terms={[combination.lifeTheme]} />
            </div>
          </Block>

          <Block title={`In the ${PILLAR_ROLE[role].title.toLowerCase()} position`}>
            <Prose>{combinationInPosition(combination, role)}</Prose>
          </Block>

          <Block title="How the two meet">
            <Prose>{combination.howItWorks}</Prose>
          </Block>

          <Block title="What it gives and costs">
            <Pair>
              <ListColumn label="Strengths" items={combination.strengths} />
              <ListColumn
                label="Costs"
                items={combination.challenges}
                tone="ember"
              />
            </Pair>
          </Block>
        </>
      ) : null}

      <Block title={`The ${PILLAR_ROLE[role].title.toLowerCase()} pillar`}>
        <Prose>{PILLAR_NOTES[role].note}</Prose>
        <div className="mt-4">
          <Terms terms={PILLAR_NOTES[role].terms ?? []} />
        </div>
      </Block>

      <Block title="The stem above" aside={`${s.han} ${s.pinyin}`}>
        <Prose>{STEM_NOTES[stem].note}</Prose>
        {god ? (
          <p className="datum mt-3 text-[0.75rem] leading-relaxed text-bone-faint">
            To the Day Master it is {god.name} ({god.han}) —{" "}
            {GOD_FAMILIES[god.family].note.split(":")[0].toLowerCase()}.
          </p>
        ) : null}
      </Block>

      <Block title="The branch below" aside={`${b.han} ${b.pinyin}`}>
        <Prose>{ANIMALS[b.animal].note}</Prose>
        <p className="datum mt-4 text-[0.75rem] leading-relaxed text-bone-faint">
          {b.polarity} {b.element} · {b.season} · the {b.hours} watch.
        </p>
      </Block>

      <HiddenBlock branch={branch} />
      <SeeAlso concepts={["stems-and-branches", "eight-characters"]} />
    </>
  );
}

function StemBody({
  stem,
  asDayMaster,
}: {
  stem: StemIndex;
  asDayMaster?: boolean;
}) {
  const s = STEMS[stem];
  const passage = STEM_NOTES[stem];
  const archetype = stemArchetype(stem);
  const narrative = dayMasterNarrative(stem);

  return (
    <>
      <Block title="The character" aside={`${s.polarity} ${s.element}`}>
        <Prose>{passage.note}</Prose>
        <p className="datum mt-4 text-[0.75rem] leading-relaxed text-bone-faint">
          {archetype.essence}. &ldquo;{archetype.voice}.&rdquo;
        </p>
        <div className="mt-4">
          <Terms terms={passage.terms ?? []} />
        </div>
      </Block>

      {asDayMaster ? (
        <>
          <Block title="As Day Master">
            <Prose>{CONCEPTS["day-master"].note}</Prose>
          </Block>

          <Block title="What it gives and costs" aside={narrative.lifeTheme}>
            <Pair>
              <ListColumn label="Strengths" items={narrative.strengths} />
              <ListColumn
                label="Costs"
                items={narrative.challenges}
                tone="ember"
              />
            </Pair>
          </Block>

          <Block title="Needs, and grows by">
            <Prose>
              {narrative.coreNeed}. {narrative.growthPath}.
            </Prose>
          </Block>
        </>
      ) : null}

      <Block title="Its relations">
        <Relations element={s.element} />
      </Block>

      <SeeAlso concepts={asDayMaster ? ["strength", "elements"] : ["stems-and-branches", "elements"]} />
    </>
  );
}

function BranchBody({ branch }: { branch: BranchIndex }) {
  const b = BRANCHES[branch];
  const animal = ANIMALS[b.animal];

  return (
    <>
      <Block title="The animal" aside={`${b.han} ${b.pinyin}`}>
        <Prose>{animal.note}</Prose>
        <div className="mt-4">
          <Terms terms={animal.traits} />
        </div>
      </Block>

      <Block title="What it is made of">
        <p className="datum text-[0.75rem] leading-relaxed text-bone-soft">
          {b.polarity} {b.element} on the surface · {b.season} · the {b.hours}{" "}
          watch, and the {b.season.toLowerCase()} month it names.
        </p>
      </Block>

      <HiddenBlock branch={branch} />
      <SeeAlso concepts={["stems-and-branches", "hidden-stems"]} />
    </>
  );
}

function ElementBody({ element, share }: { element: Element; share?: number }) {
  const passage = ELEMENT_NOTES[element];

  return (
    <>
      <Block
        title="The phase"
        aside={share === undefined ? undefined : `${share}% here`}
      >
        <Prose>{passage.note}</Prose>
        <div className="mt-4">
          <Terms terms={passage.terms ?? []} />
        </div>
      </Block>

      <Block title="Too much">
        <Prose>{passage.excess}</Prose>
      </Block>

      <Block title="Too little">
        <Prose>{passage.absence}</Prose>
      </Block>

      <Block title="Its relations">
        <Relations element={element} />
      </Block>

      <SeeAlso concepts={["elements", "hidden-stems"]} />
    </>
  );
}

function LuckBody({
  stem,
  branch,
  startAge,
  endAge,
  startDate,
  endDate,
}: {
  stem: StemIndex;
  branch: BranchIndex;
  startAge: number;
  endAge: number;
  startDate: string;
  endDate: string;
}) {
  const s = STEMS[stem];
  const b = BRANCHES[branch];
  const startYear = new Date(startDate).getUTCFullYear();
  const endYear = new Date(endDate).getUTCFullYear();

  return (
    <>
      <Block
        title="This decade"
        aside={
          <span>
            <span className="text-bone-soft">
              Ages {Math.floor(startAge)}–{Math.floor(endAge)}
            </span>
            <span className="text-bone-faint"> · </span>
            <span>
              {startYear}–{endYear}
            </span>
          </span>
        }
      >
        <Prose>
          For ten years the chart is read with {s.polarity} {s.element} added
          above and {b.animal} below — a pair that is not in the birth chart,
          borrowed from the cycle and handed back at the end of the decade.
          Whether that is welcome depends entirely on what the Day Master was
          already short of or already drowning in.
        </Prose>
      </Block>

      <Block title="The stem" aside={`${s.han} ${s.pinyin}`}>
        <Prose>{STEM_NOTES[stem].note}</Prose>
      </Block>

      <Block title="The branch" aside={`${b.han} ${b.pinyin}`}>
        <Prose>{ANIMALS[b.animal].note}</Prose>
      </Block>

      <SeeAlso concepts={["luck-pillars", "strength"]} />
    </>
  );
}

function ConceptBody({ concept }: { concept: ConceptKey }) {
  const passage = CONCEPTS[concept];
  return (
    <>
      <Block title="In short">
        <Prose>{passage.note}</Prose>
        <div className="mt-4">
          <Terms terms={passage.terms ?? []} />
        </div>
      </Block>
      <SeeAlso
        concepts={(Object.keys(CONCEPTS) as ConceptKey[])
          .filter((key) => key !== concept)
          .slice(0, 3)}
      />
    </>
  );
}

/** The stems buried in a branch, with the weight tradition gives each. */
function HiddenBlock({ branch }: { branch: BranchIndex }) {
  return (
    <Block title="Hidden stems" aside="藏干">
      <ul className="space-y-1.5">
        {HIDDEN_STEMS[branch].map((hidden) => {
          const s = STEMS[hidden.stem];
          return (
            <li key={hidden.stem} className="flex items-baseline gap-3">
              <span
                className="han text-[1rem]"
                style={{ color: elementColor(s.element) }}
              >
                {s.han}
              </span>
              <span
                className="datum text-[0.75rem]"
                style={{ color: elementColor(s.element) }}
              >
                {s.polarity} {s.element}
              </span>
              <span className="datum ml-auto text-[0.6875rem] text-bone-faint">
                {hidden.weight}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="datum mt-4 text-[0.75rem] leading-relaxed text-bone-faint">
        {CONCEPTS["hidden-stems"].note.split(". ")[0]}.
      </p>
    </Block>
  );
}

/** The four things an element is to the other four. */
function Relations({ element }: { element: Element }) {
  const rows = [
    { label: "Generated by", value: generatedBy(element) },
    { label: "Generates", value: GENERATES[element] },
    { label: "Controlled by", value: controlledBy(element) },
    { label: "Controls", value: CONTROLS[element] },
  ];

  return (
    <ul className="space-y-2">
      {rows.map((row) => (
        <li
          key={row.label}
          className="flex items-baseline justify-between border-b border-rule-faint pb-2"
        >
          <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
            {row.label}
          </span>
          <span
            className="datum text-[0.75rem]"
            style={{ color: elementColor(row.value) }}
          >
            {row.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

function controlledBy(element: Element): Element {
  return (Object.keys(CONTROLS) as Element[]).find(
    (candidate) => CONTROLS[candidate] === element,
  )!;
}

/** Keeps the drawer from being a dead end: every passage offers the next one. */
function SeeAlso({ concepts }: { concepts: ConceptKey[] }) {
  const explain = useExplain();
  return (
    <section className="border-t border-rule pt-6">
      <p className="eyebrow mb-3">Read next</p>
      <ul className="space-y-2">
        {concepts.map((key) => (
          <li key={key}>
            <button
              type="button"
              onClick={() => explain({ kind: "concept", concept: key })}
              className="datum cursor-pointer text-[0.6875rem] tracking-[0.14em] text-bone-soft uppercase transition-colors hover:text-patina"
            >
              {CONCEPTS[key].title} →
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
