//western/compatibility/page.tsx
"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { PageTitle } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { PartnerProvider, usePartner } from "@/components/partner-context";
import {
  AboutDrawer,
  ActivationPanel,
  AreasPanel,
  LensToggle,
  PanelHeading,
  PartnerPicker,
  Points,
  SignaturePanel,
  TensionPanel,
  WorkingPanel,
  useCompatibilityContext,
} from "@/components/western/compatibility";
import {
  DEFAULT_LENS,
  LENSES,
  comparable,
  synastry,
  type LensId,
  type Synastry,
} from "@/lib/synastry";
import type { Chart } from "@/lib/charts";

/**
 * Two charts, read against each other.
 *
 * THE ARGUMENT OF THE PAGE, which is the reason it is shaped like this:
 * compatibility is not one quantity. Every attempt to make it one has to
 * average how strongly two charts activate each other against how comfortably,
 * and those are different questions with different answers — a Venus–Mars
 * square is enormous pull and real friction, and a single score that resolves
 * it to 55 has thrown away both halves of what it knew. So nothing on this page
 * is a compatibility score. There are two axes, they are never combined, and
 * the top of the page is where they cross rather than what they sum to.
 *
 * The three levels run from the crudest reading to the most specific, and the
 * last one is the point. The signature is one cell of a six-cell grid. The
 * seven areas are the same evidence in more detail. And the activation section
 * is the only part that can be asymmetric — because aspects are symmetric and
 * houses are not, so it is the only place the instrument can say that a
 * relationship is not the same relationship for the two people in it.
 *
 * Nothing here is computed on a server. The charts are already in the layout's
 * provider and the whole reading is arithmetic over two arrays of longitudes,
 * which is cheaper than the round trip would be.
 */

function Reading({
  a,
  b,
  reading,
  about,
  onCloseAbout,
}: {
  a: Chart;
  b: Chart;
  /**
   * Computed by the parent rather than here, because the lens control now sits
   * at the top of the page with the chart selection — it governs the Matrix as
   * well as the Metrics, so it cannot live inside either — and that control
   * needs the four lens scores, which come out of this same reading.
   */
  reading: Synastry;
  about: boolean;
  onCloseAbout: () => void;
}) {
  const { send, setOpen } = useChat();
  const pathname = usePathname();

  useCompatibilityContext(reading);

  const ask = (question: string) => {
    setOpen(true);
    send(question, pathname);
  };

  return (
    <>
      <div className="mt-12">
        <SignaturePanel
          signature={reading.signature}
          lens={reading.lens}
          onAsk={() => ask(reading.signature.ask)}
        />
      </div>

      <div className="mt-14">
        <AreasPanel
          areas={reading.areas}
          lens={reading.lens}
          total={
            reading.lensScores.find((l) => l.id === reading.lens.id) ??
            reading.lensScores[0]
          }
          aName={a.name}
          bName={b.name}
          onAsk={(area) => ask(area.ask)}
        />
      </div>

      <div className="mt-14">
        <ActivationPanel
          activation={reading.activation}
          onAsk={() =>
            ask(
              `On the compatibility page: ${reading.activation.aIntoB.available ? `${a.name}'s bodies fall mostly in ${b.name}'s ${reading.activation.aIntoB.phrase} field` : `${b.name} has no birth time, so that direction cannot be read`}, and ${reading.activation.bIntoA.available ? `${b.name}'s fall mostly in ${a.name}'s ${reading.activation.bIntoA.phrase}` : `${a.name} has no birth time, so that direction cannot be read`}. Houses are the only asymmetric part of a synastry — the aspects score identically for both people — so this is where the two accounts of the same relationship come apart. Read each direction on its own terms and do not resolve them into one. Describe what it is like to meet someone in a particular area of your life; do not describe what either person is like.`,
            )
          }
        />
      </div>

      <div className="mt-14">
        <TensionPanel
          tension={reading.tension}
          aName={a.name}
          bName={b.name}
          onAsk={(strain) => ask(strain ? strain.ask : reading.tension.ask)}
        />
      </div>

      <div className="mt-14">
        <WorkingPanel
          counted={reading.counted}
          excluded={reading.excluded}
          aName={a.name}
          bName={b.name}
        />
      </div>

      {about ? (
        <AboutDrawer signature={reading.signature} onClose={onCloseAbout} />
      ) : null}
    </>
  );
}

function Compatibility({ chart }: { chart: Chart }) {
  const { partner } = usePartner();
  // Page state rather than storage. A lens is which question is being asked
  // right now, not a standing preference about the reader, and a remembered one
  // would quietly reframe the next pairing they opened.
  const [lens, setLens] = useState<LensId>(DEFAULT_LENS);
  const [about, setAbout] = useState(false);

  // Computed here rather than inside <Reading> so the lens control above the
  // Matrix can show the four scores. Null until a partner is chosen, which
  // keeps the hook unconditional.
  const reading = useMemo(
    () =>
      partner && comparable(chart, partner)
        ? synastry(chart, partner, lens)
        : null,
    [chart, partner, lens],
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow={partner ? `${chart.name} ↔ ${partner.name}` : chart.name}
        title="Compatibility"
        compact
        aside={
          partner ? (
            <button
              type="button"
              onClick={() => setAbout(true)}
              className="datum shrink-0 cursor-pointer text-[0.625rem] uppercase tracking-[0.14em] text-bone-faint transition-colors hover:text-patina"
            >
              How to read this ›
            </button>
          ) : null
        }
      />

      <section className="mt-2">
        <PanelHeading
          aside={
            <span className="datum text-[0.6875rem] text-bone-faint">
              The second is chosen, never assumed
            </span>
          }
        >
          The Charts
        </PanelHeading>
        <PartnerPicker subject={chart.name} />

        {reading ? (
          <div className="mt-8">
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <p className="eyebrow">Relationship type</p>
              <span className="datum text-[0.625rem] tracking-[0.14em] text-bone-faint uppercase">
                Each scored over its own areas
              </span>
            </div>
            <LensToggle
              lens={LENSES[lens]}
              scores={reading?.lensScores ?? []}
              onChange={setLens}
            />
          </div>
        ) : null}
      </section>

      {!partner ? (
        <Points
          className="mt-14 max-w-2xl"
          tone="read"
          items={[
            "Choose a second chart above",
            "Nothing is computed until there are two",
            "No second chart is picked on your behalf",
            "A reading assembled around somebody you did not choose looks exactly as authoritative as one you did",
          ]}
        />
      ) : !comparable(chart, partner) ? (
        <div className="mt-14 max-w-2xl border-l-2 border-ember pl-5">
          <Points
            tone="read"
            color="var(--color-ember)"
            items={[
              "These two charts cannot be read against each other",
              "One has no stored planetary positions",
              "Nothing to measure",
            ]}
          />
        </div>
      ) : (
        <Reading
          a={chart}
          b={partner}
          reading={reading!}
          about={about}
          onCloseAbout={() => setAbout(false)}
        />
      )}
    </div>
  );
}

export default function CompatibilityPage() {
  const { chart } = useChart();

  if (!chart) {
    return (
      <div className="mx-auto w-full max-w-4xl px-8">
        <PageTitle eyebrow="No chart" title="Compatibility" compact />
        <Points
          className="max-w-2xl"
          tone="read"
          items={["No chart selected", "Add birth data to begin the study"]}
        />
      </div>
    );
  }

  return (
    <PartnerProvider>
      <Compatibility chart={chart} />
    </PartnerProvider>
  );
}
