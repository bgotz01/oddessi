// western/framework/page.tsx
"use client";

import { PageTitle, SectionHeading } from "@/components/primitives";
import ZodiacFramework from "@/components/zodiac-framework";
import OuterPlanetFramework from "@/components/outer-planet-framework";
import HouseCusps from "@/components/overview/house-cusps";
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
        <SectionHeading>House Cusps</SectionHeading>
        <p className="mb-5 max-w-3xl text-[0.9375rem] leading-relaxed text-bone-faint">
          The sign on a house&rsquo;s cusp sets the manner that area of life is
          run in. Each sign brings the same manner to whichever house it opens.
        </p>
        <HouseCusps />
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
    </div>
  );
}
