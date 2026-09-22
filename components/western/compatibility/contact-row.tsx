//components/western/compatibility/contact-row.tsx
"use client";

import { bodyGlyph } from "@/lib/symbols";
import type { Contact } from "@/lib/synastry";
import { GRIND, FLOW, T } from "./compatibility-ui";

/**
 * One cross-chart contact, written out.
 *
 * The two names are always printed, never abbreviated to initials or implied by
 * column order. A synastry list is the one place in the app where the same body
 * appears twice meaning two different people, and "Venus square Mars" without
 * the names is genuinely ambiguous about who is whose.
 *
 * Aspects are spelled rather than given glyphs. The app has real glyphs for
 * bodies and signs and none for aspects, and inventing a set here would put
 * symbols on the page that appear nowhere else in it.
 */
export default function ContactRow({
  contact,
  aName,
  bName,
  faded = false,
}: {
  contact: Contact;
  aName: string;
  bName: string;
  faded?: boolean;
}) {
  const color =
    contact.valence <= -0.4 ? GRIND : contact.valence >= 0.4 ? FLOW : "var(--color-bone)";

  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-rule-faint py-2.5">
      <p className={`${faded ? "text-bone-faint" : "text-bone"} text-[0.9375rem] leading-snug`}>
        <span className="glyph mr-1.5" style={{ color: faded ? undefined : color }} aria-hidden>
          {bodyGlyph(contact.aBody)}
        </span>
        <span className={T.tiny + " text-bone-faint"}>{aName}&rsquo;s </span>
        {contact.aBody}
        <span className="text-bone-faint"> {contact.type} </span>
        <span className={T.tiny + " text-bone-faint"}>{bName}&rsquo;s </span>
        {contact.bBody}
        <span className="glyph ml-1.5" style={{ color: faded ? undefined : color }} aria-hidden>
          {bodyGlyph(contact.bBody)}
        </span>
      </p>
      <span className={`${T.tiny} shrink-0 text-bone-faint`}>
        {contact.orb.toFixed(1)}° of {contact.orbLimit}°
      </span>
    </div>
  );
}
