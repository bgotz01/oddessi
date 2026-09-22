// western/macro/framework/page.tsx
"use client";

import Link from "next/link";
import { PageTitle, SectionHeading } from "@/components/primitives";
import ZodiacFramework from "@/components/zodiac-framework";
import OuterPlanetFramework from "@/components/outer-planet-framework";
import { URANUS_FRAMEWORK, NEPTUNE_FRAMEWORK, PLUTO_FRAMEWORK } from "@/lib/astrology/macro/zodiac-framework-data";

const OUTER_PLANETS = [URANUS_FRAMEWORK, NEPTUNE_FRAMEWORK, PLUTO_FRAMEWORK];

export default function FrameworkPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow="Collective"
        title="Framework"
        lede=""
      />

      <section className="mb-16">
        <SectionHeading>Zodiac Framework</SectionHeading>
        <p className="mb-5 max-w-3xl text-[0.9375rem] leading-relaxed text-bone-faint">
          The twelve signs arranged by element — the structural vocabulary that
          underlies every planetary reading on this site.
        </p>
        <ZodiacFramework layout="columns" />
      </section>

      <section className="mb-16">
        <SectionHeading>Outer Planet Framework</SectionHeading>
        <p className="mb-5 max-w-3xl text-[0.9375rem] leading-relaxed text-bone-faint">
          How Uranus, Neptune, and Pluto each operate through the twelve signs.
          Toggle between planets to compare their distinct modes of collective
          transformation.
        </p>
        <OuterPlanetFramework planets={OUTER_PLANETS} title="Outer Planets" />
      </section>

      <div className="mt-16 grid gap-3 border-t border-rule pt-12 md:grid-cols-2">
        <Link
          href="/western/macro"
          className="inscription block border border-patina-dim px-8 py-7 text-center text-[1rem] leading-none text-patina transition-colors hover:border-patina hover:bg-patina-deep"
        >
          ← Macro Overview
        </Link>
        <Link
          href="/western/macro/uranus"
          className="inscription block border border-rule px-8 py-7 text-center text-[1rem] leading-none text-bone-soft transition-colors hover:border-patina-dim hover:bg-surface-alt hover:text-patina"
        >
          Uranus — The Shock Sequence →
        </Link>
        <Link
          href="/western/macro/neptune"
          className="inscription block border border-rule px-8 py-7 text-center text-[1rem] leading-none text-bone-soft transition-colors hover:border-patina-dim hover:bg-surface-alt hover:text-patina"
        >
          Neptune — The Era Sequence →
        </Link>
        <Link
          href="/western/macro/pluto"
          className="inscription block border border-rule px-8 py-7 text-center text-[1rem] leading-none text-bone-soft transition-colors hover:border-patina-dim hover:bg-surface-alt hover:text-patina"
        >
          Pluto — The Power Sequence →
        </Link>
      </div>
    </div>
  );
}
