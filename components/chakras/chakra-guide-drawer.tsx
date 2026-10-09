//components/chakras/chakra-guide-drawer.tsx
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CHAKRAS, type Chakra } from "@/lib/chakras";
import {
  GUIDE_DISCLAIMER,
  SIGN_KINDS,
  type ChakraGuide,
  type GuideFood,
  type GuidePractice,
  type SignKind,
} from "@/lib/chakra-guides";

type Step = "signs" | "foods" | "practices";

const STEPS: { key: Step; label: string }[] = [
  { key: "signs", label: "Signs" },
  { key: "foods", label: "Foods" },
  { key: "practices", label: "Practices" },
];

/**
 * Signs → remedies, for one chakra, as three steps: recognise the signs,
 * then the foods, then the practices. A tab bar under the header shows where
 * the reader is; each step ends by pointing to the next.
 *
 * Marking signs does one thing: the practices step brings forward the
 * practices suited to the kinds of sign marked. Nothing is counted or scored
 * — a tally would turn the checklist into a test — and a match is offered as
 * a suggestion, never as a treatment. Marks clear when the drawer closes.
 *
 * The drawer moves between chakras on its own — a strip of all seven under
 * the header, which the arrow keys also step while it has focus — and keeps
 * the current step as it does, so
 * the same step can be compared across centres. Marks are kept per sign, so
 * each chakra's survive a visit to another.
 */
export default function ChakraGuideDrawer({
  chakra,
  guide,
  onClose,
  onNavigate,
}: {
  chakra: Chakra;
  guide: ChakraGuide;
  onClose: () => void;
  /** Moves the drawer to another chakra, by number. */
  onNavigate: (n: number) => void;
}) {
  const [step, setStep] = useState<Step>("signs");
  const [marked, setMarked] = useState<Set<string>>(() => new Set());
  const hue = chakra.hue;
  // The kinds of sign marked — all the practices step needs to know.
  const markedKinds = SIGN_KINDS.map((k) => k.key).filter((k) =>
    guide.signs[k].some((sign) => marked.has(sign)),
  );

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const toggle = (sign: string) =>
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(sign)) next.delete(sign);
      else next.add(sign);
      return next;
    });

  const index = STEPS.findIndex((s) => s.key === step);
  const next = STEPS[index + 1];

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-void/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${chakra.name} chakra — signs and remedies`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-2xl flex-col border-l border-rule bg-surface shadow-2xl"
      >
        {/* Header */}
        <header className="shrink-0 px-6 pt-6 sm:px-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-baseline gap-4">
              <span
                className="inscription text-[2.25rem] leading-none"
                style={{ color: hue }}
              >
                {String(chakra.number).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[1.625rem] leading-tight text-bone">
                  {chakra.theme}
                </p>
                <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                  <span className="inscription text-[0.875rem] text-bone-soft">
                    {chakra.name} Chakra
                  </span>
                  <span className="text-bone-faint">·</span>
                  <span className="text-[1rem] text-bone-soft italic">
                    {chakra.sanskrit}
                  </span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 text-[0.75rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>

          {/* All seven, root to crown: the drawer's own way between them. */}
          <ChakraStrip current={chakra.number} onNavigate={onNavigate} />

          {/* Steps */}
          <nav
            role="tablist"
            aria-label="Guide sections"
            className="mt-4 grid grid-cols-3 border-b border-rule"
          >
            {STEPS.map((s, i) => {
              const on = s.key === step;
              return (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setStep(s.key)}
                  className={`-mb-px flex items-baseline gap-2.5 border-b-2 py-3 text-left transition-colors ${
                    on ? "" : "border-transparent hover:border-rule"
                  }`}
                  style={on ? { borderColor: hue } : undefined}
                >
                  <span
                    className="datum text-[0.6875rem]"
                    style={{ color: on ? hue : "var(--color-bone-faint)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`datum text-[0.6875rem] tracking-[0.18em] uppercase ${
                      on ? "text-bone" : "text-bone-faint"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
          {step === "signs" ? (
            <>
              <StepHeading title="Signs to recognise">
                Patterns associated with an imbalanced {chakra.name} chakra.
                Mark any that resonate, and the practices step will bring
                forward those suited to them.
              </StepHeading>

              <div className="border-t border-rule">
                {SIGN_KINDS.map((kind) => (
                  <div key={kind.key} className="border-b border-rule-faint py-4">
                    <p className="flex items-baseline gap-3">
                      <span className="eyebrow">{kind.label}</span>
                      <span className="text-[0.875rem] text-bone-faint italic">
                        {kind.gloss}
                      </span>
                    </p>
                    <ul className="mt-2">
                      {guide.signs[kind.key].map((sign) => (
                        <li key={sign}>
                          <SignToggle
                            label={sign}
                            on={marked.has(sign)}
                            hue={hue}
                            onToggle={() => toggle(sign)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Note>{GUIDE_DISCLAIMER}</Note>
            </>
          ) : step === "foods" ? (
            <>
              <StepHeading title={`Foods to support ${guide.focus}`}>
                Foods traditionally associated with the {chakra.name} chakra,
                by colour and element.
              </StepHeading>

              <div className="grid gap-4 sm:grid-cols-3">
                {guide.foods.map((f) => (
                  <FoodCard key={f.group} food={f} hue={hue} />
                ))}
              </div>

              <Note>
                Traditional colour and element correspondences, not dietary
                advice.
              </Note>
            </>
          ) : (
            <Practices
              chakra={chakra}
              guide={guide}
              markedKinds={markedKinds}
              onBackToSigns={() => setStep("signs")}
            />
          )}

          {/* Onward to the next step */}
          <div className="mt-10 flex justify-end">
            {next ? (
              <button
                type="button"
                onClick={() => setStep(next.key)}
                className="datum text-[0.6875rem] tracking-[0.18em] uppercase transition-opacity hover:opacity-100"
                style={{ color: hue, opacity: 0.85 }}
              >
                Next · {next.label} →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep("signs")}
                className="datum text-[0.6875rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
              >
                ← Back to signs
              </button>
            )}
          </div>
        </div>

        <div
          className="h-[3px] w-full shrink-0 opacity-60"
          style={{ background: hue }}
        />
      </div>
    </>
  );
}

/** Title and a short lede — the same for each step. */
function StepHeading({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="text-[1.5rem] leading-tight text-bone">{title}</h3>
        {aside ? (
          <span className="datum shrink-0 text-[0.6875rem] text-bone-faint">
            {aside}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-[1rem] text-bone-soft">{children}</p>
    </div>
  );
}

/**
 * One sign as a bullet. Clicking marks it: the bullet takes the chakra's
 * colour and the text brightens — the text itself stays bone, since some
 * hues read poorly as body copy — and the practices step reads the mark.
 */
function SignToggle({
  label,
  on,
  hue,
  onToggle,
}: {
  label: string;
  on: boolean;
  hue: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className="group flex w-full items-baseline gap-3 py-1 text-left"
    >
      <span
        aria-hidden
        className="w-2 shrink-0 text-[1.125rem] leading-none transition-colors"
        style={{ color: on ? hue : "var(--color-bone-faint)" }}
      >
        •
      </span>
      <span
        className={`text-[1.0625rem] leading-snug transition-colors ${
          on ? "text-bone" : "text-bone-soft group-hover:text-bone"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 border-l-2 border-rule py-1 pl-4">
      <p className="eyebrow mb-1">Note</p>
      <p className="text-[0.9375rem] leading-relaxed text-bone-faint italic">
        {children}
      </p>
    </div>
  );
}

const KIND_LABEL: Record<SignKind, string> = Object.fromEntries(
  SIGN_KINDS.map((k) => [k.key, k.label]),
) as Record<SignKind, string>;

/**
 * The practices, ordered by what the reader marked. With nothing marked they
 * are listed as they come. Otherwise the ones suited to a marked kind lead,
 * each saying which kind it suits, and the rest follow as also associated.
 */
function Practices({
  chakra,
  guide,
  markedKinds,
  onBackToSigns,
}: {
  chakra: Chakra;
  guide: ChakraGuide;
  markedKinds: SignKind[];
  onBackToSigns: () => void;
}) {
  const suited = (p: GuidePractice) =>
    p.suits.filter((k) => markedKinds.includes(k));
  const lead = guide.practices.filter((p) => suited(p).length > 0);
  const rest = guide.practices.filter((p) => suited(p).length === 0);
  const hue = chakra.hue;

  return (
    <>
      <StepHeading title={`Practices to strengthen ${guide.focus}`}>
        {markedKinds.length === 0 ? (
          <>
            Ordinary, low-intensity practices associated with the{" "}
            {chakra.name} chakra.{" "}
            <button
              type="button"
              onClick={onBackToSigns}
              className="underline decoration-rule underline-offset-4 transition-colors hover:text-bone"
            >
              Mark signs
            </button>{" "}
            to bring forward the ones suited to them.
          </>
        ) : (
          <>
            Brought forward for the{" "}
            {markedKinds.map((k) => KIND_LABEL[k].toLowerCase()).join(" and ")}{" "}
            patterns you marked.
          </>
        )}
      </StepHeading>

      {lead.length > 0 ? (
        <>
          <p className="eyebrow mb-2" style={{ color: hue }}>
            Suggested for what you marked
          </p>
          <PracticeList practices={lead} hue={hue} suited={suited} lit />
          {rest.length > 0 ? (
            <p className="eyebrow mt-8 mb-2">Also associated</p>
          ) : null}
        </>
      ) : null}
      {rest.length > 0 ? (
        <PracticeList practices={rest} hue={hue} suited={suited} />
      ) : null}

      <Note>
        Suggestions associated with the chakra, not treatments for any sign.
      </Note>
    </>
  );
}

function PracticeList({
  practices,
  hue,
  suited,
  lit = false,
}: {
  practices: GuidePractice[];
  hue: string;
  suited: (p: GuidePractice) => SignKind[];
  lit?: boolean;
}) {
  return (
    <ol className="border-t border-rule">
      {practices.map((p) => (
        <li
          key={p.name}
          className="border-b border-rule-faint py-4 pl-4"
          style={{
            borderLeft: `2px solid ${lit ? hue : "transparent"}`,
          }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-[1.0625rem] text-bone">{p.name}</p>
            <p className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
              <span style={{ color: hue }}>{p.duration}</span>
              <span className="mx-2 text-patina-dim">·</span>
              {p.category}
            </p>
          </div>
          <p className="mt-1 text-[1rem] leading-relaxed text-bone-soft">
            {p.detail}
          </p>
          {lit ? (
            <p className="datum mt-2 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
              For {suited(p).map((k) => KIND_LABEL[k].toLowerCase()).join(" · ")} patterns
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/** A food group as a card: group and examples, under a rule in the chakra's colour. */
function FoodCard({ food, hue }: { food: GuideFood; hue: string }) {
  return (
    <div
      className="border border-t-2 border-rule-faint bg-surface-alt px-4 py-4"
      style={{ borderTopColor: hue }}
    >
      <p className="text-[1.0625rem] leading-snug text-bone">{food.group}</p>
      <p className="mt-1 text-[0.9375rem] leading-snug text-bone-soft">
        {food.examples}
      </p>
    </div>
  );
}

/**
 * The seven as a row of small symbols, root to crown. The current one is
 * filled and named; the rest name themselves on hover. Each wears its own
 * colour, as the symbols on the page do.
 *
 * Left and right step between chakras only while focus is inside the strip,
 * so arrow keys elsewhere in the drawer keep their ordinary meaning. Focus
 * follows to the newly current symbol.
 */
function ChakraStrip({
  current,
  onNavigate,
}: {
  current: number;
  onNavigate: (n: number) => void;
}) {
  const prev = current > 1 ? current - 1 : null;
  const next = current < 7 ? current + 1 : null;
  const arrow =
    "datum px-1 text-[0.875rem] text-bone-faint transition-colors hover:text-bone disabled:opacity-30 disabled:hover:text-bone-faint";

  return (
    <div
      role="group"
      aria-label="Chakras"
      className="mt-6 flex items-center gap-2 border-t border-rule-faint pt-4"
      onKeyDown={(e) => {
        const to =
          e.key === "ArrowLeft" ? prev : e.key === "ArrowRight" ? next : null;
        if (!to) return;
        e.preventDefault();
        onNavigate(to);
        // All seven buttons are always rendered, so focus can move now.
        e.currentTarget
          .querySelector<HTMLButtonElement>(`[data-chakra="${to}"]`)
          ?.focus();
      }}
    >
      <button
        type="button"
        onClick={() => prev && onNavigate(prev)}
        disabled={!prev}
        aria-label="Previous chakra"
        className={arrow}
      >
        ←
      </button>

      <ol className="flex flex-1 items-center justify-between">
        {CHAKRAS.map((c) => {
          const on = c.number === current;
          return (
            <li key={c.number}>
              <button
                type="button"
                onClick={() => onNavigate(c.number)}
                data-chakra={c.number}
                aria-current={on ? "true" : undefined}
                aria-label={`${c.name} chakra`}
                title={c.name}
                className="group flex flex-col items-center gap-1.5"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full border transition-opacity"
                  style={{
                    borderColor: c.hue,
                    color: c.hue,
                    background: on
                      ? `color-mix(in srgb, ${c.hue} 22%, transparent)`
                      : "transparent",
                    opacity: on ? 1 : 0.55,
                  }}
                >
                  {c.bija ? (
                    <span className="glyph text-[0.875rem]">{c.bija.glyph}</span>
                  ) : (
                    <span
                      className="block h-1 w-1 rounded-full"
                      style={{ background: c.hue }}
                    />
                  )}
                </span>
                <span
                  className={`datum hidden text-[0.5625rem] tracking-[0.14em] uppercase sm:block ${
                    on ? "text-bone" : "text-bone-faint group-hover:text-bone-soft"
                  }`}
                >
                  {c.name}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        onClick={() => next && onNavigate(next)}
        disabled={!next}
        aria-label="Next chakra"
        className={arrow}
      >
        →
      </button>
    </div>
  );
}
