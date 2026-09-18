//components/western/love/love-window-panel.tsx
"use client";

import {
  LOVE_LAYER_LABEL,
  LOVE_MODE_LABEL,
  LOVE_STRENGTH_MEANING,
  interpretLoveWindow,
  type LoveWindow,
} from "@/lib/love";
import { StatusMark } from "@/components/primitives";
import { T } from "@/components/western/growth/growth-ui";
import { LOVE_MODE_TINT } from "@/components/western/love/love-ui";

/**
 * One window, opened.
 *
 * The drivers are the last block rather than the first, and that ordering is
 * the page's whole position on how much astrology to show. A reader arrives
 * wanting to know what a period is; "Saturn ☍ Ascendant" answers a question
 * they have not asked yet. It is printed in full, on the same screen, because
 * a reading whose evidence is hidden is an assertion — but it is printed after
 * the claim it supports, not instead of it.
 *
 * Every contact carries its own span, which is not the window's span. A window
 * is the union of what is inside it, so the dates differ, and showing only the
 * outer dates would suggest four layers were all running for all of it.
 */
export default function LoveWindowPanel({
  window,
  onClose,
}: {
  window: LoveWindow;
  onClose: () => void;
}) {
  const reading = interpretLoveWindow(window);

  return (
    <section className="mt-10 border-l-2 pl-6" style={{ borderColor: LOVE_MODE_TINT[window.mode] }}>
      <div className="flex items-baseline justify-between gap-6">
        <div>
          <p className={`${T.micro} flex items-center gap-3 text-bone-faint`}>
            {LOVE_MODE_LABEL[window.mode]}
            <StatusMark status={window.status} />
          </p>
          <h3 className="inscription mt-3 text-[1.375rem] tracking-[0.08em] text-bone">
            {reading.title}
          </h3>
          <p className={`${T.note} mt-2`}>
            {reading.dates} · {reading.duration}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className={`${T.tiny} shrink-0 text-bone-faint transition-colors hover:text-bone`}
        >
          Close
        </button>
      </div>

      <dl className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-[auto_1fr]">
        <dt className={`${T.micro} pt-1 text-bone-faint`}>Theme</dt>
        <dd className={T.read}>{reading.theme}</dd>

        <dt className={`${T.micro} pt-1 text-bone-faint`}>Development</dt>
        <dd className={`${T.body} max-w-2xl`}>{reading.development}</dd>

        <dt className={`${T.micro} pt-1 text-bone-faint`}>Strength</dt>
        <dd className={`${T.body} max-w-2xl`}>
          {LOVE_STRENGTH_MEANING[window.strength]}
        </dd>
      </dl>

      <div className="mt-10">
        <p className={`${T.micro} text-bone-faint`}>
          Drivers · {window.layers.map((layer) => LOVE_LAYER_LABEL[layer]).join(" · ")}
        </p>
        <ul className="mt-4 list-none space-y-2.5">
          {window.contacts.map((contact) => (
            <li
              key={contact.id}
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
            >
              <span className={`${T.read} ${contact.core ? "text-bone" : "text-bone-soft"}`}>
                {contact.label}
              </span>
              <span className={`${T.note} text-bone-faint`}>
                {contact.address} · {contact.start} → {contact.end}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className={`${T.note} mt-8 max-w-2xl`}>{reading.meaning}</p>
    </section>
  );
}
