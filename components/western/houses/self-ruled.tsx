//components/western/houses/self-ruled.tsx
"use client";

import { readSelfRuled } from "@/lib/astrology/circuit-interpretations";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import type { RulerLink, SelfRuled } from "@/lib/dominance";
import { useScoring } from "@/components/scoring-context";
import { bodyGlyph } from "@/lib/symbols";
import { AlsoConnected } from "@/components/western/houses/also-connected";

/**
 * A house whose ruler sits inside it. Nothing travels, so there is no arrow to
 * draw — the house carries its ruler on its own ring instead. The reading is
 * the theme and one line; whether the ruler is in its own sign goes to the
 * chat, and the houses that lead here show only when there are some.
 */
export function SelfRuledCard({
  self,
  links,
}: {
  self: SelfRuled;
  links: RulerLink[];
}) {
  const { config } = useScoring();
  const { link } = self;
  const reading = readSelfRuled(self, links, config);
  return (
    <div className="flex gap-6 border border-rule bg-surface p-6">
      <HouseWithRuler house={link.house} ruler={link.ruler} />

      <div className="min-w-0 flex-1">
        <h3 className="text-[1.25rem] leading-snug font-light text-bone">
          {reading.theme}
        </h3>
        <p className="mt-2 text-[1rem] leading-relaxed text-bone-soft">
          {reading.dynamic}
        </p>
        {/* The evidence: which sign picks the ruler, and where it is. */}
        <p className="datum mt-3 text-[0.625rem] tracking-[0.12em] text-bone-faint uppercase">
          {link.cuspSign} on the cusp · {link.ruler} {link.rulerDegree}{" "}
          {link.rulerSign}
        </p>
        {self.feeders.length ? (
          <div className="mt-2">
            <AlsoConnected houses={self.feeders} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** The house node from the circuits, with its ruler set into the ring. */
function HouseWithRuler({ house, ruler }: { house: number; ruler: string }) {
  return (
    <div className="flex w-24 shrink-0 flex-col items-center gap-2">
      <div className="relative">
        <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-[1.5px] border-patina bg-surface-alt">
          <span className="inscription text-[2rem] leading-none text-patina">
            {house}
          </span>
        </div>
        <span
          className="glyph absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-bone-faint bg-surface text-[1rem] text-bone"
          title={`${ruler}, ruler of house ${house}, sits in it`}
        >
          {bodyGlyph(ruler)}
        </span>
      </div>
      {/* Broken at the "&", as the circuit diagrams break it. */}
      <span className="datum flex flex-col items-center text-[0.5625rem] leading-snug tracking-[0.14em] text-bone-soft uppercase">
        {getHouseTitle(house as House)
          .split(/ (?=&)/)
          .map((line) => (
            <span key={line}>{line}</span>
          ))}
      </span>
    </div>
  );
}
