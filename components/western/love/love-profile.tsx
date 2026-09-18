//components/western/love/love-profile.tsx
"use client";

import { SectionHeading } from "@/components/primitives";
import type { LoveProfile, LoveSection, LoveSource } from "@/lib/love";
import { T } from "@/components/western/growth/growth-ui";

/**
 * The natal half: five questions, answered from the birth chart alone.
 *
 * SELF-CONTAINED ON PURPOSE
 * This renders its own heading and its own spacing, so the page places it with
 * one line and can move it above or below the timeline without carrying any of
 * its layout along. Nothing about the profile leaks into `page.tsx`.
 *
 * TWO COLUMNS, AND WHY THE ARITHMETIC MATTERS
 * Five arenas in one column left the right half of the page empty and the
 * section four screens long. Five arenas plus the caveat is six cells, which
 * is exactly a 2×3 grid — so the caveat stops being a footnote hanging off the
 * bottom and becomes the sixth panel, which is both better use of the space and
 * a truer placement for it. It is a statement about all five, not an
 * afterthought to the last one.
 *
 * Reading order survives the grid: left to right, top to bottom is Attraction,
 * Romance, Partnership, Intimacy, Commitment — the same narrative order the
 * four timeline kinds run in, which is the reason the order exists.
 *
 * SOURCES ARE ALWAYS VISIBLE
 * They used to sit behind a "Why?" disclosure. That was the wrong default in a
 * way worth stating: a reading whose evidence takes a click is a reading most
 * people never audit, and this page's whole claim on being an instrument
 * rather than a horoscope is that its evidence is right there. The placements
 * now sit in every panel, quiet and at the bottom, where they can be ignored
 * by someone who does not care and found instantly by someone who does.
 *
 * WHY THE KEY SITS ABOVE THE VALUE
 * A two-column definition list wants a 176-pixel key column — "MEETS PEOPLE
 * THROUGH" is not short — and inside a half-width panel that leaves the
 * reading itself about three hundred pixels to live in, which is narrower than
 * it was before the redesign. Stacked, the value gets the whole panel.
 */

/**
 * Roles whose label is already the first word of their placement.
 *
 * "Venus — Venus in Gemini · 11th house" reads as a stutter. "Ruler of the 5th
 * — Jupiter in Pisces · 8th house" does not, because the office and the body
 * are different facts. Switched on the ROLE rather than by testing whether one
 * string starts with the other: the role is structural and the prefix match is
 * a coincidence that would hold until a label was reworded.
 */
const SELF_NAMING = new Set(["venus", "mars", "moon", "saturn"]);

function Source({ source }: { source: LoveSource }) {
  if (SELF_NAMING.has(source.role)) {
    return <li className={`${T.note} text-bone-soft`}>{source.placement}</li>;
  }
  return (
    <li className={`${T.note} text-bone-soft`}>
      <span className="text-bone-faint">{source.label}</span> · {source.placement}
    </li>
  );
}

function Arena({ section, index }: { section: LoveSection; index: number }) {
  return (
    <article className="flex h-full flex-col border-t border-rule pt-6">
      <header className="flex items-baseline justify-between gap-4">
        <h3 className="inscription text-[1.25rem] tracking-[0.1em] text-bone">
          {section.label}
        </h3>
        <span className={`${T.tiny} shrink-0 text-bone-faint/50`}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </header>
      <p className={`${T.note} mt-2`}>{section.question}</p>

      <dl className="mt-7 space-y-5">
        {section.bullets.map((bullet) => (
          <div key={bullet.key}>
            <dt className={`${T.micro} text-bone-faint`}>{bullet.key}</dt>
            <dd className={`${T.read} mt-1.5`}>{bullet.value}</dd>
          </div>
        ))}
      </dl>

      {/* Wholly unreadable and partly unreadable are different failures and
          get different sentences. "Part of this section is missing" printed
          above nothing at all reads as a bug. */}
      {section.unreadable.length && section.bullets.length === 0 ? (
        <p className={`${T.note} mt-6 border-l-2 border-ember pl-4`}>
          Nothing to read here. This section is built from{" "}
          {section.unreadable.join(" and ")}, which this chart does not carry —
          almost always a birth time that was never recorded.
        </p>
      ) : section.unreadable.length ? (
        <p className={`${T.note} mt-6 border-l-2 border-ember-dim pl-4`}>
          Read without {section.unreadable.join(" and ")} — the chart does not
          carry {section.unreadable.length > 1 ? "those" : "that"}, so part of
          this panel is missing rather than quiet.
        </p>
      ) : null}

      {/* `mt-auto` rather than a fixed margin: grid rows stretch to the tallest
          panel in them, and without this the evidence block floats at whatever
          height its own content happened to end, which makes two panels side by
          side look misaligned when they are not. */}
      {section.sources.length ? (
        <div className="mt-auto pt-8">
          <p className={`${T.tiny} text-bone-faint/60`}>Read from</p>
          <ul className="mt-2 list-none space-y-1">
            {section.sources.map((source) => (
              <Source key={source.role} source={source} />
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export default function LoveProfile({ profile }: { profile: LoveProfile }) {
  return (
    <section className="mt-28">
      <SectionHeading aside="the birth chart alone">Profile</SectionHeading>

      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
        {profile.sections.map((section, index) => (
          <Arena key={section.arena} section={section} index={index} />
        ))}

        {/* The sixth cell. Deliberately not shaped like an arena — no number,
            no question — so it is not read as a shorter answer to a question
            nobody asked. */}
        <aside className="flex h-full flex-col border-t border-rule pt-6">
          <h3 className={`${T.micro} text-bone-faint`}>What this is not</h3>
          <p className={`${T.body} mt-4 max-w-md`}>{profile.caveat}</p>
        </aside>
      </div>
    </section>
  );
}
