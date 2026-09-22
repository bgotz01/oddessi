//components/western/compatibility/signature-panel.tsx
"use client";

import { CELL, type Lens, type Signature } from "@/lib/synastry";
import RelationshipField from "./relationship-field";
import Points from "./points";
import { T } from "./compatibility-ui";
import PanelHeading from "./panel-heading";

/**
 * Where these two charts sit on the two axes. Nothing here moves.
 *
 * It reads the contacts the lens's areas are built from, and nothing else.
 * That is a correction rather than a refinement: the headline used to average
 * every counted contact while the page showed only the ones belonging to the
 * lens, and on Brandon × Ana that put a Cordial cell in the dead centre of the
 * plot above five areas reading charged. Half the contacts it averaged were
 * never on screen, and the invisible half skewed soft on every pairing.
 * `contactsFor` in dimensions.ts carries the whole account.
 *
 * So the cell moves when the lens moves now, and the aside says which lens it
 * belongs to. An earlier version of this file argued the opposite at some
 * length — that a question cannot change how much two charts touch. True of the
 * total, and beside the point: what matters is how much they touch in the areas
 * the question is about, and that is exactly what a lens selects.
 *
 * What is left is the plot and the cell that names the point on it. The `ask`
 * still carries the lens, because the council should know which question was
 * being asked even when nothing on screen reports it.
 */
export default function SignaturePanel({
  signature,
  lens,
  onAsk,
}: {
  signature: Signature;
  lens: Lens;
  onAsk: () => void;
}) {
  const cell = CELL[signature.cell];

  return (
    <section>
      <PanelHeading
        aside={
          <span className="datum text-[0.6875rem] text-bone-faint">
            {lens.label} contacts only
          </span>
        }
      >
        Matrix
      </PanelHeading>

      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[1.45fr_0.55fr] lg:items-center">
        <RelationshipField signature={signature} />

        <div>
          {/* Not a heading — `PanelHeading` above already is this section's,
              and the cell name is a value the plot resolves to rather than a
              second title for the same block. */}
          <p className="inscription text-[1.5rem] leading-tight text-bone">
            {cell.label}
          </p>
          <p className={`${T.micro} mt-2.5 text-patina`}>{cell.coords}</p>

          <Points className="mt-5" tone="note" items={cell.points} />

          {signature.caveats.length ? (
            <div className="mt-5 border-l-2 border-ember pl-4">
              <Points
                color="var(--color-ember)"
                tone="note"
                items={signature.caveats}
              />
            </div>
          ) : null}

          <button
            type="button"
            onClick={onAsk}
            aria-label={`Ask about the matrix, read as ${lens.label}`}
            className={`${T.micro} mt-6 cursor-pointer border border-rule px-4 py-2.5 text-bone-faint transition-colors hover:border-patina-dim hover:text-patina`}
          >
            Ask about the matrix ›
          </button>
        </div>
      </div>
    </section>
  );
}
