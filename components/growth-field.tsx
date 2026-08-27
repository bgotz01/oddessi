//components/growth-field.tsx

"use client";

import type { ReactNode } from "react";

import { bodyColor } from "@/lib/bodies";
import { bodyGlyph, signGlyph } from "@/lib/symbols";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import { T, prime } from "@/components/growth-ui";

/**
 * The furniture Resistance and Resources are both built from.
 *
 * ─── Why it exists ──────────────────────────────────────────────────────────
 *
 * The two sections had grown their own headers, their own band headings and
 * their own idea of how big a placement is, and between them they were using
 * nine type sizes — 24, 22, 20, 17, 16, 15, 11, 10, and a 1rem glyph that
 * matched none of the text it sat beside. Every one of them was defensible on
 * its own and the result was structureless: nothing about the size of a piece
 * of text told you what KIND of thing it was.
 *
 * So there are five roles here and no other sizes:
 *
 *     TITLE     the section name                      inscription, 24px
 *     VALUE     the thing itself — a tell, a
 *               placement                             22px  (T.phrase)
 *     SENTENCE  the one line a section is allowed     17px  (T.lead)
 *     READING   what a row's value means              15px  (T.body)
 *     LABEL     everything else: band names, row
 *               names, asides, degrees, houses        10px  (T.tiny)
 *
 * READING is the newest and the one worth justifying, since the list was four
 * for a while. A row's reading is a sentence and cannot be a tracked 10px
 * label; it is also not the one line the section is answering, so it is not
 * SENTENCE either. `T.body` is the scale's existing step for a supporting
 * sentence and this is exactly that — no new size, a step these two sections
 * simply were not using.
 *
 * A reader can now tell what they are looking at from its size alone, and the
 * two sections read as one system because they are literally made of the same
 * parts.
 *
 * ─── The row ────────────────────────────────────────────────────────────────
 *
 * Both sections turned out to be answering the same three-part question about
 * every entry they have, so both use one row:
 *
 *     LABEL          VALUE                            READING
 *     Ruler          ♀ Venus ♊ Gemini 23°46′ h11      The old way is reached
 *                                                     through the collective
 *     Supports       ♅ Uranus ♑ Capricorn 04°22′ h6   Disruption is available
 *                                                     to the move
 *
 * What kind of fact it is, the fact, and what it means. The label stays a
 * plain category name — "Ruler", "Conjunct the node", "Supports" — because
 * the reader is scanning that column for a kind of fact, not reading it.
 *
 * ─── Which column the placement sits in ─────────────────────────────────────
 *
 * It sat in the reading column for a while, with the reading promoted to
 * VALUE, on the argument that "Venus in Gemini, house 11" is not an answer to
 * why the pull is strong — it is the citation for one. That argument was
 * answering a real complaint, but it was answering it in the wrong place: what
 * was actually wrong was that the right-hand column held a generic three-word
 * gloss keyed by kind, identical on every chart. Now that it holds a derived
 * reading, the placement can be the thing on the page it always was — this is
 * an astrology app, the placement is what the reader came for, and the reading
 * is what it means. Both columns carry their own weight, so neither has to
 * borrow the other's slot.
 */

/* ─── Section header ──────────────────────────────────────────────────────── */

export function SectionHead({
  index,
  name,
  title,
  aside,
  detail,
  onOpen,
}: {
  index: string;
  name: string;
  title: string;
  /** The header's own datum — the sign and house, or a count. */
  aside: string;
  /** A second line under it, quieter. Optional. */
  detail?: ReactNode;
  onOpen: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 @2xl:flex-row @2xl:items-baseline @2xl:justify-between @2xl:gap-8">
      <button type="button" onClick={onOpen} className="group block text-left">
        <p className={`${T.tiny} text-patina-dim`}>
          {index} · {name}
        </p>
        <p className="inscription mt-4 text-[1.5rem] leading-tight text-bone transition-colors group-hover:text-patina">
          {title}
        </p>
      </button>

      <p className={`${T.tiny} text-bone-faint @2xl:text-right`}>
        {aside}
        {detail ? <span className="mt-1 block">{detail}</span> : null}
      </p>
    </div>
  );
}

/* ─── Band ────────────────────────────────────────────────────────────────── */

/**
 * A labelled group of rows.
 *
 * The Conversion's heading grammar — tracked label left, provenance right, a
 * hairline under both — carried across the page so a heading means the same
 * thing in every section.
 */
export function Band({
  label,
  aside,
  accent = "patina",
  children,
}: {
  label: string;
  aside?: string;
  /** Ember marks the one band that is a different kind of fact from its neighbours. */
  accent?: "patina" | "ember";
  children: ReactNode;
}) {
  return (
    <div className="mt-14">
      <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-2">
        <p
          className={`${T.tiny} ${accent === "ember" ? "text-ember" : "text-patina-dim"}`}
        >
          {label}
        </p>
        {aside ? <p className={`${T.tiny} text-bone-faint`}>{aside}</p> : null}
      </div>
      {children}
    </div>
  );
}

/* ─── Row ─────────────────────────────────────────────────────────────────── */

/**
 * One entry: what it is, the thing itself, what it amounts to.
 *
 * A field, not a grid of cards. Boxing a dozen placements would rebuild exactly
 * the dashboard this page spent its whole life escaping, so the structure is
 * carried by three aligned columns and a hairline.
 */
export function Row({
  label,
  reading,
  accent = "quiet",
  children,
}: {
  label: string;
  /** The right-hand column: what this row's value means for the move. */
  reading?: ReactNode;
  /** Patina marks a row the section is claiming something stronger about. */
  accent?: "quiet" | "patina";
  children: ReactNode;
}) {
  // 11rem, not 9: the widest label in either section is "In the departing
  // house", and at 9rem it wrapped to two lines while every row around it
  // stayed on one — which reads as a broken row rather than a long label. The
  // value and the reading then split what is left evenly, so the third column
  // has room to be read rather than squeezed to its content.
  return (
    <li className="grid gap-x-8 gap-y-2 border-b border-rule-faint py-5 @2xl:grid-cols-[11rem_1fr_1fr] @2xl:items-baseline">
      <p
        className={`${T.tiny} ${accent === "patina" ? "text-patina" : "text-bone-faint"}`}
      >
        {label}
      </p>

      <div className="flex flex-col gap-2">{children}</div>

      {/* Left-aligned in its own column, not right-aligned against the edge:
          it is a sentence now, and a ragged-left sentence is measurably harder
          to read than a ragged-right one. */}
      {reading ? <div className={T.body}>{reading}</div> : null}
    </li>
  );
}

/* ─── Placement ───────────────────────────────────────────────────────────── */

/**
 * One placement, at value size.
 *
 * It used to carry five sizes on its own — a 20px glyph, a 20px body name, a
 * 16px sign glyph, an 11px degree and a 10px house — which made a single line
 * of it look like four different pieces of information glued together. It is
 * two now: the placement is the value, so body and sign are set at value size
 * and the glyphs are set to match them; the degree and house are measurements,
 * so they are labels like every other measurement on the page.
 *
 * ─── The two sizes ──────────────────────────────────────────────────────────
 *
 * On the page a placement is a value, so it is set at value size in both
 * sections. There was briefly a third, `cite`, which shrank it to label size
 * for Resistance on the argument that the placement was evidence there rather
 * than the finding; the row carries a real derived reading in its own column
 * now, so the placement no longer has to give up its slot to make room for the
 * meaning. Deleted rather than left unused.
 *
 * The second is the drawer's. The panel had grown its own copy of this
 * component — four sizes of its own, a 20px glyph over 17px text over a 12px
 * degree over a 15px house title — so the same placement looked like two
 * different objects depending on whether you had opened the panel. It is the
 * same component now, one density quieter than the page and obeying the same
 * two-role rule: the placement is the value, the measurements are labels. The
 * house TITLE only appears here, because a panel has room to name the arena
 * and a row on the page does not.
 *
 * `sign` is nullable for the one case with no placement to print — a
 * conjunction reaching across a house cusp, where the model knows the body and
 * not where it stands.
 */
export function Placement({
  body,
  sign,
  degree,
  house,
  size = "value",
}: {
  body: string;
  sign: string | null;
  degree?: string;
  house: number | null;
  size?: "value" | "panel";
}) {
  const panel = size === "panel";
  const type = panel ? "text-[1.0625rem]" : "text-[1.375rem]";

  return (
    <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
      <span className={`glyph ${type}`} style={{ color: bodyColor(body) }}>
        {bodyGlyph(body)}
      </span>
      <span className={`${type} font-light leading-snug text-bone`}>{body}</span>

      {sign ? (
        <>
          <span className={`glyph ${type} text-bone-soft`}>
            {signGlyph(sign)}
          </span>
          <span className={`${type} font-light leading-snug text-bone-soft`}>
            {sign}
          </span>
        </>
      ) : null}

      {degree ? (
        <span className={`${T.tiny} text-bone-faint`}>{prime(degree)}</span>
      ) : null}

      {house ? (
        <span className={`${T.tiny} text-bone-faint`}>
          house {house}
          {panel ? ` · ${getHouseTitle(house as House)}` : ""}
        </span>
      ) : null}
    </span>
  );
}

/* ─── Expand ──────────────────────────────────────────────────────────────── */

/**
 * The control that opens the drawer, at the foot of a section.
 *
 * Every section had written its own, and each one had been written as a
 * sentence about what was behind it: "Why the old strategy still wins", "How
 * to lean on each of these", "+ 1 more conversion", "Full arc". Four different
 * promises for one control, none of which a reader can act on differently —
 * they all open the same panel on the tab they are already looking at. The
 * variety was doing no work and cost the page a consistent exit.
 *
 * Centred at the foot rather than set in the top right. The top right of every
 * section is already occupied and by something a reader needs more: the
 * departing pole in Resistance, the arriving pole in Resources, "What it
 * becomes" over the Conversion road, "North Node · The direction" over the
 * Arc's. Putting a control there would displace the one piece of provenance
 * each section header carries. The Arc has closed on a centred link at its
 * foot since it was written, so this is that pattern made general rather than
 * a new one.
 *
 * The hairline is what makes a single centred word read as a control rather
 * than as a stray caption, and it closes each section, which the page wanted
 * anyway — before this, one section ran into the next on whitespace alone.
 */
export function Expand({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${T.tiny} mt-12 block w-full border-t border-rule pt-5 text-center text-bone-faint transition-colors hover:text-patina`}
    >
      Expand
    </button>
  );
}
