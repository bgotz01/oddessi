//components/chakras/chakra-chapters.tsx
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useChat } from "@/components/chat-provider";
import ChakraGuideDrawer from "@/components/chakras/chakra-guide-drawer";
import { CHAKRA_GUIDES, GUIDE_DISCLAIMER, guideFor } from "@/lib/chakra-guides";
import { ARCHETYPE_NOTE, CHAKRA_ARCHETYPES } from "@/lib/chakra-archetypes";
import { CHAKRA_CENTRE, CHAKRA_PAIRS } from "@/lib/chakra-pairs";
import {
  CHAKRAS,
  CHAKRA_PROVENANCE,
  isElemental,
  type Chakra,
} from "@/lib/chakras";

/**
 * The seven centres as seven chapters of one system, rather than a diagram of
 * a body: one row each, root first, and one row open at a time.
 *
 * The theme leads each row — security & grounding → desire & pleasure → … →
 * meaning & transcendence — with the Sanskrit name as secondary detail. The
 * question opens the chapter when it is expanded.
 *
 * Everything lives in the open row — question, function, description, the three
 * expressions, and the tradition's particulars on a single closing line — so
 * there is no drawer. Colour is spent once per row, on the centre's symbol,
 * and once more to mark balance in the open row.
 */
export default function ChakraChapters({
  initialOpen = null,
  open: openProp,
  onOpenChange,
  guide: guideProp,
  onGuideChange,
}: {
  /** Number of the chakra open on first render, if any (uncontrolled). */
  initialOpen?: number | null;
  /** Controlled: the open chapter, for a page that drives it from elsewhere. */
  open?: number | null;
  onOpenChange?: (n: number | null) => void;
  /** Controlled: the chakra whose guide drawer is open. */
  guide?: number | null;
  onGuideChange?: (n: number | null) => void;
}) {
  const [inner, setInner] = useState<number | null>(initialOpen);
  const open = openProp !== undefined ? openProp : inner;
  const setOpen = onOpenChange ?? setInner;
  // The deficiency guide, for one chakra at a time.
  /**
   * Where the clicked row sat on screen before its chapter toggled. Opening
   * one chapter closes another, and when the closing one is above, everything
   * below it jumps up by its height — often taking the clicked row out of
   * view. The layout effect below puts the row back where the reader's eye
   * was, then reveals as much of the opened chapter as fits.
   */
  const anchor = useRef<{ n: number; top: number } | null>(null);
  const toggle = (n: number) => {
    const li = document.getElementById(`chakra-${n}`);
    if (li) anchor.current = { n, top: li.getBoundingClientRect().top };
    setOpen(open === n ? null : n);
  };

  const [innerGuide, setInnerGuide] = useState<number | null>(null);
  const guide = guideProp !== undefined ? guideProp : innerGuide;
  const setGuide = onGuideChange ?? setInnerGuide;
  const guideChakra = guide === null ? null : CHAKRAS[guide - 1];
  const guideData = guide === null ? undefined : guideFor(guide);
  const { setPageContext } = useChat();
  const opened = open === null ? null : CHAKRAS[open - 1];

  useEffect(() => {
    setPageContext({
      _description: "Chakras — the seven centres of the modern Western system",
      _note:
        "Keep the traditional, modern and interpretive layers apart when answering. " +
        CHAKRA_PROVENANCE +
        " Other traditions count and place the centres differently, and no " +
        "physiological structure corresponds to them — do not map them onto " +
        "organs or health. The interpretation is a vertical model of experience, " +
        "one function per centre, read upward through the questions: I exist " +
        "safely → I want → I act → I connect → I express → I understand → I " +
        "transcend. `deficient` and `excessive` are the same function out of " +
        "proportion, not a blocked or open centre; never say a chakra is " +
        "'blocked'. They are interpretive categories, not measurements — never " +
        "score or rate them. Keep neighbours distinct by function: root is " +
        "safety, solar plexus is agency; sacral is wanting, heart is bonding; " +
        "third eye is understanding, crown is transcendence. `element` for the " +
        "third eye and crown is an interpretive principle, not one of the five " +
        "elements. Present it as an interpretive framework, not as findings.",
      chakras: CHAKRAS,
      openOnPage: opened?.name ?? null,
      // The deficiency → remedies guides shown in the drawer. Practice, not
      // medicine: answer within the disclaimer, never diagnose, and send
      // persistent physical or emotional symptoms to a professional.
      guides: { disclaimer: GUIDE_DISCLAIMER, byChakra: CHAKRA_GUIDES },
      guideOpenFor: guideChakra?.name ?? null,
      // Archetypes of imbalance shown further down the page: one centre strong,
      // another weak, by chakra number. Interpretive patterns, never a type
      // to assign someone — offer them as lenses, and name more than one.
      archetypes: { note: ARCHETYPE_NOTE, list: CHAKRA_ARCHETYPES },
      // The three pairs folded around the Heart, by chakra number, each with
      // two readings of its axis [lower end, upper end]; the Heart integrates.
      pairs: { list: CHAKRA_PAIRS, centre: CHAKRA_CENTRE },
    });
    return () => setPageContext(null);
  }, [opened, guideChakra, setPageContext]);

  useLayoutEffect(() => {
    const a = anchor.current;
    anchor.current = null;
    if (!a) return;
    const li = document.getElementById(`chakra-${a.n}`);
    const scroller = li && scrollParent(li);
    if (!li || !scroller) return;

    // Hold the clicked row still, instantly, before the frame paints.
    scroller.scrollTop += li.getBoundingClientRect().top - a.top;

    // Then, if the chapter opened past the bottom of the view, bring it up —
    // but never so far that its own row leaves the top.
    if (open !== a.n) return;
    const view = scroller.getBoundingClientRect();
    const rect = li.getBoundingClientRect();
    const margin = 24;
    const overflow = rect.bottom - (view.bottom - margin);
    if (overflow <= 0) return;
    const room = rect.top - (view.top + margin);
    scroller.scrollBy({ top: Math.min(overflow, room), behavior: "smooth" });
  }, [open]);

  return (
    <>
      <ol className="border-t border-rule">
        {CHAKRAS.map((c) => (
          <li
            key={c.number}
            id={`chakra-${c.number}`}
            className="scroll-mt-6 border-b border-rule-faint"
          >
            <ChapterRow
              chakra={c}
              open={open === c.number}
              onToggle={() => toggle(c.number)}
            />
            {open === c.number ? (
              <ChapterBody chakra={c} onGuide={() => setGuide(c.number)} />
            ) : null}
          </li>
        ))}
      </ol>

      <p className="datum mt-6 max-w-2xl text-[0.6875rem] leading-relaxed text-bone-faint">
        {CHAKRA_PROVENANCE}
      </p>

      {guideChakra && guideData ? (
        <ChakraGuideDrawer
          chakra={guideChakra}
          guide={guideData}
          onClose={() => setGuide(null)}
          onNavigate={setGuide}
        />
      ) : null}
    </>
  );
}

function ChapterRow({
  chakra,
  open,
  onToggle,
}: {
  chakra: Chakra;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="group flex w-full cursor-pointer items-center gap-4 px-2 py-4 text-left transition-colors hover:bg-surface-alt focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-patina)] sm:gap-6 sm:px-3"
    >
      <span className="datum w-4 shrink-0 text-[0.75rem] text-bone-faint">
        {chakra.number}
      </span>

      <Symbol chakra={chakra} open={open} />

      {/* Name, then the theme — the line that carries the progression. */}
      <span className="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-5">
        <span
          className={`inscription block shrink-0 text-[0.9375rem] transition-colors sm:w-[9.5rem] sm:text-[1rem] ${
            open ? "text-bone" : "text-bone-soft group-hover:text-bone"
          }`}
        >
          {chakra.name}
        </span>
        <span
          className={`mt-0.5 block text-[1.125rem] transition-colors sm:mt-0 sm:text-[1.25rem] ${
            open ? "text-bone" : "text-bone-soft group-hover:text-bone"
          }`}
        >
          {chakra.theme}
        </span>
      </span>

      {/* Secondary: the Sanskrit name. */}
      <span className="hidden shrink-0 text-[0.9375rem] font-light text-bone-faint italic md:block">
        {chakra.sanskrit}
      </span>

      <span
        aria-hidden
        className="glyph shrink-0 text-[0.75rem] text-bone-faint transition-transform group-hover:text-bone"
        style={open ? { transform: "rotate(90deg)" } : undefined}
      >
        ▸
      </span>
    </button>
  );
}

/** The one place a row spends its colour. */
function Symbol({ chakra, open }: { chakra: Chakra; open: boolean }) {
  return (
    <span
      aria-hidden
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors"
      style={{
        borderColor: chakra.hue,
        background: open
          ? `color-mix(in srgb, ${chakra.hue} 18%, transparent)`
          : "transparent",
        color: chakra.hue,
      }}
    >
      {chakra.bija ? (
        <span className="glyph text-[1.0625rem]">{chakra.bija.glyph}</span>
      ) : (
        <span
          className="block h-1.5 w-1.5 rounded-full"
          style={{ background: chakra.hue }}
        />
      )}
    </span>
  );
}

function ChapterBody({
  chakra,
  onGuide,
}: {
  chakra: Chakra;
  /** Opens the deficiency → remedies guide. */
  onGuide: () => void;
}) {
  const petals = `${chakra.petals.toLocaleString("en-GB")} petals`;

  return (
    // Indented to the name, past the number and the symbol.
    <div className="pt-2 pb-10 pl-2 sm:pl-[6.75rem] sm:pr-6">
      {/* The Sanskrit name moves here when the row has no room for it. */}
      <p className="mb-3 text-[0.9375rem] font-light text-bone-faint italic md:hidden">
        {chakra.sanskrit}
      </p>

      <div className="max-w-3xl">
        <p className="text-[1.75rem] leading-tight text-bone">{chakra.question}</p>
        <p className="mt-2 text-[1.1875rem] leading-snug text-bone-soft">
          {chakra.function}
        </p>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-bone-soft">
          {chakra.description}
        </p>

        <ExpressionScale chakra={chakra} />
      </div>

      <div className="mt-10 flex max-w-3xl flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <p className="datum text-[0.6875rem] text-bone-faint">
          {chakra.location}
          <span className="mx-2.5 text-patina-dim">·</span>
          {chakra.element}
          {isElemental(chakra) ? "" : " (principle)"}
          <span className="mx-2.5 text-patina-dim">·</span>
          {petals}
        </p>
        <button
          type="button"
          onClick={onGuide}
          className="datum border px-3 py-2 text-[0.6875rem] tracking-[0.18em] uppercase transition-colors hover:text-bone"
          style={{
            color: chakra.hue,
            borderColor: `color-mix(in srgb, ${chakra.hue} 50%, transparent)`,
          }}
        >
          Signs &amp; remedies →
        </button>
      </div>
    </div>
  );
}

type State = "deficient" | "balanced" | "excessive";

const STATES: { key: State; label: string; gloss: string }[] = [
  { key: "deficient", label: "Deficient", gloss: "Too little" },
  { key: "balanced", label: "Balanced", gloss: "In harmony" },
  { key: "excessive", label: "Excessive", gloss: "Too much" },
];

/**
 * Deficient ← balanced → excessive. These are interpretive categories, not
 * readings, so nothing here is drawn as a gauge; the type carries it.
 *
 * Each state is named twice — a micro label, then a large italic gloss (too
 * little, in harmony, too much). Any one of the three can be lit by clicking
 * it: a hairline in the chakra's colour above, a wash fading downward, and
 * the gloss in that colour. Balance is lit to begin with, and keeps its
 * coloured hairline whichever is lit, so the ideal stays marked. The unlit
 * states stay fully legible — quieter, never faint. Small arrows on the
 * edges of balance point outward: the extremes are departures from it.
 */
function ExpressionScale({ chakra }: { chakra: Chakra }) {
  const [lit, setLit] = useState<State>("balanced");
  const hue = chakra.hue;
  const fade = (c: string) => `linear-gradient(to bottom, ${c}, transparent)`;
  const tint = (pct: number) => `color-mix(in srgb, ${hue} ${pct}%, transparent)`;

  return (
    <div className="mt-9 grid grid-cols-[1fr_1.15fr_1fr]" role="group" aria-label="Expression">
      {STATES.map((st) => {
        const balanced = st.key === "balanced";
        const on = lit === st.key;
        return (
          <button
            key={st.key}
            type="button"
            onClick={() => setLit(st.key)}
            aria-pressed={on}
            className={`group relative block cursor-pointer px-2 pt-5 pb-7 text-center transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-patina)] sm:px-5 ${
              on ? "" : "hover:bg-surface-alt"
            }`}
            style={{
              borderTop: `1px solid ${on || balanced ? hue : "var(--color-rule)"}`,
              background: on ? fade(tint(11)) : undefined,
            }}
          >
            {/* Hairlines either side of the lit state, fading down. */}
            {on
              ? (["left-0", "right-0"] as const).map((side) => (
                  <span
                    key={side}
                    aria-hidden
                    className={`absolute top-0 bottom-0 w-px ${side}`}
                    style={{ background: fade(tint(45)) }}
                  />
                ))
              : null}

            {balanced ? (
              <>
                <span
                  aria-hidden
                  className="datum absolute top-[1.15rem] left-0 z-10 -translate-x-1/2 bg-void px-1 text-[0.75rem] leading-none"
                  style={{ color: hue }}
                >
                  ←
                </span>
                <span
                  aria-hidden
                  className="datum absolute top-[1.15rem] right-0 z-10 translate-x-1/2 bg-void px-1 text-[0.75rem] leading-none"
                  style={{ color: hue }}
                >
                  →
                </span>
              </>
            ) : null}

            <span
              className="eyebrow block"
              style={{ color: on ? hue : "var(--color-bone-soft)" }}
            >
              {st.label}
            </span>
            <span
              className={`mt-2 block text-[1.25rem] leading-none italic transition-colors sm:text-[1.625rem] ${
                on ? "" : "text-bone-soft group-hover:text-bone"
              }`}
              style={on ? { color: hue } : undefined}
            >
              {st.gloss}
            </span>

            <span
              aria-hidden
              className="mx-auto mt-4 mb-4 block h-px w-8"
              style={{ background: on ? tint(60) : "var(--color-rule)" }}
            />

            <span className="block space-y-2">
              {chakra[st.key].map((item) => (
                <span
                  key={item}
                  className={`block text-[0.9375rem] leading-snug sm:text-[1.0625rem] ${
                    on ? "text-bone" : "text-bone-soft"
                  }`}
                >
                  {item}
                </span>
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** The nearest ancestor that scrolls — the page's <main>, in this layout. */
function scrollParent(el: HTMLElement): HTMLElement | null {
  for (let p = el.parentElement; p; p = p.parentElement) {
    const { overflowY } = getComputedStyle(p);
    if ((overflowY === "auto" || overflowY === "scroll") && p.scrollHeight > p.clientHeight) {
      return p;
    }
  }
  return (document.scrollingElement as HTMLElement | null) ?? null;
}
