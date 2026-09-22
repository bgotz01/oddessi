//components/western/compatibility/tension-panel.tsx
"use client";

import { useState } from "react";
import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import type { Strain, StrainSide, TensionMap } from "@/lib/synastry";
import ContactRow from "./contact-row";
import Drawer from "./drawer";
import PanelHeading from "./panel-heading";
import Points from "./points";
import { GRIND, ROW_LABEL, T } from "./compatibility-ui";

/**
 * Where the friction is, filed by what is rubbing against what.
 *
 * Not an eighth area — every contact here has already lowered the ease of
 * whichever areas it belongs to, and scoring it twice would report one
 * measurement as two findings. This is the same evidence cut a different way,
 * because "hard aspects" is not a category anyone can act on and "Security
 * against Freedom" is.
 *
 * WHY FIVE, AND WHY THEY SAY SOMETHING
 * It was fourteen rows carrying a name and a bar each, which is a list rather
 * than a reading: the rows ranked the friction against itself and left the
 * reader to click every one to find out what any of it meant. Two changes fix
 * that. Only the heaviest few are shown, because a dozen axes is past the point
 * where ranking helps and well past the point where anyone reads to the bottom.
 * And each one now carries its own reading on the surface — the two halves of
 * what is actually colliding — so a row is worth something without being opened.
 *
 * The rest are named in a line underneath rather than hidden, and every one of
 * them still opens a drawer with its contacts and the caveats.
 */

/** How many axes are opened on the surface. The rest are named. */
const SHOWN = 5;

/**
 * One person's half of a collision, named.
 *
 * WHY THE NAME TAKES ITS BODY'S COLOUR. The obvious move is to give each
 * person an accent, and the obvious accents are the only two the system has —
 * patina and ember. Both are already spoken for on this page: ember IS
 * friction, so an ember name in the tension section says that person is the
 * problem, which is a claim the engine never makes and could not support.
 *
 * `lib/bodies.ts` is the way out. It carries an identity colour for every body
 * and says explicitly that it "sits alongside the app palette rather than
 * inside it", with patina and ember unused. So the name is coloured by the
 * body doing the acting, which is both inside the existing vocabulary and
 * actually informative — the glyph beside it anchors the colour to a planet
 * rather than to a verdict.
 */
/**
 * The one thing the two named rows cannot say for themselves.
 *
 * When both sides are the same body they print the same sentence twice, which
 * looks like a bug and is actually the finding — both want the identical thing
 * and there is one of it. The unattributed reading used to carry that as its
 * second line and lost it when the rows became people.
 */
function note(strain: Strain): string | null {
  if (strain.sides[0].body === strain.sides[1].body) {
    return "The same position, and only one of it is available.";
  }
  return strain.mutual ? "Runs both ways — each does both." : null;
}

function Side({ side }: { side: StrainSide }) {
  const color = bodyColor(side.body);
  return (
    <span className="flex items-baseline gap-2">
      <span className="glyph shrink-0 text-[0.8125rem]" style={{ color }} aria-hidden>
        {bodyGlyph(side.body)}
      </span>
      <span className={T.body}>
        <span style={{ color }}>{side.name}</span>{" "}
        <span className="text-bone-faint">{side.body}</span> {side.does}
      </span>
    </span>
  );
}

function StrainRow({
  strain,
  largest,
  onOpen,
}: {
  strain: Strain;
  largest: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full border-t border-rule py-4 text-left transition-colors hover:bg-surface-alt"
    >
      <span className="flex items-baseline justify-between gap-6">
        <span
          className={`${ROW_LABEL} transition-colors group-hover:text-bone`}
          style={{ color: GRIND }}
        >
          {strain.pair}
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="h-[3px] w-20 bg-rule sm:w-28">
            <span
              className="block h-full"
              style={{
                width: `${largest > 0 ? (strain.weight / largest) * 100 : 0}%`,
                minWidth: "3px",
                backgroundColor: GRIND,
              }}
            />
          </span>
          <span className={`${T.tiny} w-10 text-right text-bone-faint`}>
            {strain.contacts.length}
            {strain.contacts.length === 1 ? " hit" : " hits"}
          </span>
        </span>
      </span>

      {/* One line per person, named. This is the whole reason the row exists
          rather than being a label on a bar. */}
      <span className="mt-2.5 block space-y-1">
        {strain.sides.map((side) => (
          <Side key={side.side} side={side} />
        ))}
      </span>

      {note(strain) ? (
        <span className={`${T.note} mt-1.5 block`}>{note(strain)}</span>
      ) : null}
    </button>
  );
}

function StrainDrawer({
  strain,
  aName,
  bName,
  onAsk,
  onClose,
}: {
  strain: Strain;
  aName: string;
  bName: string;
  onAsk: () => void;
  onClose: () => void;
}) {
  return (
    <Drawer eyebrow="Tension" title={strain.pair} onClose={onClose}>
      <div className="mt-7 space-y-2">
        {strain.sides.map((side) => (
          <Side key={side.side} side={side} />
        ))}
      </div>
      {note(strain) ? (
        <Points className="mt-3" tone="note" items={[note(strain)!]} />
      ) : null}
      <Points className="mt-4" tone="note" items={[strain.geometry]} />

      <div className="mt-10 border-t border-rule pt-6">
        <p className={`${T.micro} text-patina`}>What it is built from</p>
        <div className="mt-4">
          {strain.contacts.map((contact) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              aName={aName}
              bName={bName}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-rule pt-6">
        <Points
          tone="note"
          items={[
            "Friction is not a fault, and this is not a count against anyone",
            "Two functions pressing on each other is what the relationship asks for",
            "Not a reason to be in it, or to leave it",
          ]}
        />
      </div>

      <button
        type="button"
        onClick={onAsk}
        className={`${T.micro} mt-10 cursor-pointer border border-rule px-4 py-2.5 text-bone-faint transition-colors hover:border-patina-dim hover:text-patina`}
      >
        Ask about this tension ›
      </button>
    </Drawer>
  );
}

export default function TensionPanel({
  tension,
  aName,
  bName,
  onAsk,
}: {
  tension: TensionMap;
  aName: string;
  bName: string;
  onAsk: (strain: Strain | null) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = tension.strains.find((s) => s.id === openId) ?? null;
  const largest = tension.strains[0]?.weight ?? 1;
  const shown = tension.strains.slice(0, SHOWN);
  const rest = tension.strains.slice(SHOWN);

  return (
    <section>
      <PanelHeading
        aside={
          <span className="datum text-[0.6875rem] text-bone-faint">
            {tension.none
              ? "Nothing crossed the threshold"
              : rest.length
                ? `Heaviest ${shown.length} of ${tension.strains.length}`
                : `${tension.strains.length} in all`}
          </span>
        }
      >
        Tensions
      </PanelHeading>

      {tension.none ? (
        <div className="border-t border-rule pt-5">
          <Points
            items={[
              "No contact here is hard enough to register",
              "A statement about cross-chart geometry and nothing else",
            ]}
          />
          <button
            type="button"
            onClick={() => onAsk(null)}
            className={`${T.micro} mt-6 cursor-pointer border border-rule px-4 py-2.5 text-bone-faint transition-colors hover:border-patina-dim hover:text-patina`}
          >
            Ask about the absence ›
          </button>
        </div>
      ) : (
        <>
          <div className="border-b border-rule">
            {shown.map((strain) => (
              <StrainRow
                key={strain.id}
                strain={strain}
                largest={largest}
                onOpen={() => setOpenId(strain.id)}
              />
            ))}
          </div>

          {rest.length ? (
            <Points
              className="mt-5 max-w-3xl"
              tone="note"
              items={[
                `Also catching, more lightly: ${rest.map((s) => s.pair).join(" · ")}`,
              ]}
            />
          ) : null}
        </>
      )}

      {open ? (
        <StrainDrawer
          strain={open}
          aName={aName}
          bName={bName}
          onAsk={() => {
            onAsk(open);
            setOpenId(null);
          }}
          onClose={() => setOpenId(null)}
        />
      ) : null}
    </section>
  );
}
