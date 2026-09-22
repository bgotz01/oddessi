//components/western/compatibility/activation-panel.tsx
"use client";

import { bodyGlyph } from "@/lib/symbols";
import type { Activation, Direction } from "@/lib/synastry";
import Points from "./points";
import { AMPLITUDE, T } from "./compatibility-ui";
import PanelHeading from "./panel-heading";

/**
 * What each one switches on in the other — the only asymmetric thing here.
 *
 * Every aspect on this page is symmetric: a square is a square from both ends,
 * so the seven areas score identically for both people. Houses are where the
 * two accounts come apart. A's bodies land in some region of B's chart and B's
 * land in some region of A's, and there is no reason for those regions to
 * match. If they do not, the two are in different relationships with each
 * other, which is ordinary and worth saying out loud.
 *
 * The two columns are drawn to the same scale but they are not a comparison.
 * Neither direction is the correct one.
 */

function Column({ direction }: { direction: Direction }) {
  if (!direction.available) {
    return (
      <div className="border-l-2 border-ember-dim pl-5">
        <p className={`${T.micro} text-bone-faint`}>
          {direction.fromName} → {direction.toName}
        </p>
        <p className={`${T.read} mt-4 text-ember`}>Cannot be read</p>
        <Points
          className="mt-3"
          tone="note"
          color="var(--color-ember)"
          items={[
            `${direction.toName} has no house cusps`,
            "Saved without a birth time — houses cannot be derived without one",
            "Nothing has been approximated in its place",
            "A guessed birth time looks identical on screen and is wrong by whole houses",
          ]}
        />
      </div>
    );
  }

  const top = direction.fields.slice(0, 4);
  const largest = top[0]?.share ?? 1;

  return (
    <div className="border-l-2 border-patina-dim pl-5">
      <p className={`${T.micro} text-bone-faint`}>
        {direction.fromName} → {direction.toName}
      </p>
      <p className="inscription mt-3 text-[1.25rem] tracking-[0.08em] text-bone">
        {direction.phrase ?? "Nothing concentrated"}
      </p>
      <p className={`${T.note} mt-2`}>
        {direction.fromName}&rsquo;s bodies, in {direction.toName}&rsquo;s houses
      </p>

      <dl className="mt-5">
        {top.map((field) => (
          <div key={field.house} className="border-t border-rule-faint py-3">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[1.0625rem] text-bone">{field.name}</dt>
              <span className={`${T.tiny} shrink-0 text-bone-faint`}>
                {field.share}% · house {field.house}
              </span>
            </div>
            <span className="mt-2.5 block h-[3px] w-full bg-rule-faint">
              <span
                className="block h-full"
                style={{
                  width: `${largest > 0 ? (field.share / largest) * 100 : 0}%`,
                  backgroundColor: AMPLITUDE,
                }}
              />
            </span>
            <dd className={`${T.note} mt-2.5`}>
              <span className="glyph mr-2 text-bone-soft" aria-hidden>
                {field.visitors.map((v) => bodyGlyph(v.body)).join(" ")}
              </span>
              {field.visitors.map((v) => v.body).join(", ")} — {field.gloss}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function ActivationPanel({
  activation,
  onAsk,
}: {
  activation: Activation;
  onAsk: () => void;
}) {
  const { aIntoB, bIntoA } = activation;
  const different =
    aIntoB.available &&
    bIntoA.available &&
    aIntoB.phrase !== null &&
    aIntoB.phrase !== bIntoA.phrase;

  return (
    <section>
      <PanelHeading
        aside={
          <span className="datum text-[0.6875rem] text-bone-faint">
            Asymmetric by construction
          </span>
        }
      >
        What Each Brings Out
      </PanelHeading>

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <Column direction={aIntoB} />
        <Column direction={bIntoA} />
      </div>

      {different ? (
        <div className="mt-7 border-l-2 border-ember-dim py-1 pl-5">
          <Points
            tone="read"
            color="var(--color-ember)"
            items={[
              "Not the same relationship for both of them",
              "Neither column corrects the other",
            ]}
          />
        </div>
      ) : null}

      {aIntoB.available || bIntoA.available ? (
        <button
          type="button"
          onClick={onAsk}
          className={`${T.micro} mt-6 cursor-pointer border border-rule px-4 py-2.5 text-bone-faint transition-colors hover:border-patina-dim hover:text-patina`}
        >
          Ask about the two directions ›
        </button>
      ) : null}
    </section>
  );
}
