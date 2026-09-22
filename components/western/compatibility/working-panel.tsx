//components/western/compatibility/working-panel.tsx
"use client";

import { useState } from "react";
import type { Contact } from "@/lib/synastry";
import ContactRow from "./contact-row";
import Points from "./points";
import { T } from "./compatibility-ui";
import PanelHeading from "./panel-heading";

/**
 * Every contact found, including the ones held out of the scoring.
 *
 * The excluded list is the reason this section exists. The cohort rule in
 * `lib/synastry/contacts.ts` throws away slow-to-slow contacts because they are
 * facts about an age gap rather than about two people — and a reader who knows
 * their charts will look for their Pluto trine, not find it anywhere on the
 * page, and reasonably conclude the instrument is broken. Showing what was
 * dropped and why is cheaper than being disbelieved.
 *
 * Collapsed by default. It is the working, not the reading.
 */
export default function WorkingPanel({
  counted,
  excluded,
  aName,
  bName,
}: {
  counted: Contact[];
  excluded: Contact[];
  aName: string;
  bName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <PanelHeading
        open={open}
        onToggle={() => setOpen((v) => !v)}
        aside={
          <span className="datum text-[0.6875rem] text-bone-faint">
            {counted.length} counted · {excluded.length} held back
          </span>
        }
      >
        The Working
      </PanelHeading>

      {open ? (
        <>
        {/* How the reading was made. This used to sit under the signature at
            the top of the page, where it was the third thing a reader met and
            answered a question nobody had asked yet. It belongs with the
            working. */}
        <Points
          className="mb-10 max-w-3xl"
          tone="note"
          items={[
            `The whole reading rests on ${counted.length} counted contact${counted.length === 1 ? "" : "s"}`,
            "Chemistry and ease are separate questions",
            "The cell at the top is where they cross, not an average",
            "Both axes are percentiles against unrelated pairings of these same charts — 50 is typical",
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className={`${T.micro} text-patina`}>Counted</p>
            <Points
              className="mt-3 mb-5"
              tone="note"
              items={[
                "Every cross-chart aspect inside orb, heaviest first",
                "Orbs are this page's own, tighter than the natal ones stored with each chart",
                "The two lists must not be compared by orb",
              ]}
            />
            <div className="border-b border-rule-faint">
              {counted.map((contact) => (
                <ContactRow
                  key={contact.id}
                  contact={contact}
                  aName={aName}
                  bName={bName}
                />
              ))}
            </div>
          </div>

          <div>
            <p className={`${T.micro} text-ember`}>Held back</p>
            <Points
              className="mt-3 mb-5"
              tone="note"
              color="var(--color-ember)"
              items={[
                "Contacts between two slow bodies",
                "Jupiter outward moves slowly enough that these are decided by the gap between two birthdays",
                "Shared with everyone born around the same time",
                "Computed, shown, and kept out of every score",
              ]}
            />
            {excluded.length ? (
              <div className="border-b border-rule-faint">
                {excluded.map((contact) => (
                  <ContactRow
                    key={contact.id}
                    contact={contact}
                    aName={aName}
                    bName={bName}
                    faded
                  />
                ))}
              </div>
            ) : (
              <Points tone="note" items={["Nothing was held back"]} />
            )}
          </div>
        </div>
        </>
      ) : null}
    </section>
  );
}
