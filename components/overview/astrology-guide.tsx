// components/overview/astrology-guide.tsx

"use client";

import { SectionHeading } from "@/components/primitives";
import ZodiacFramework from "@/components/zodiac-framework";
import PlanetArchetypes from "@/components/western/macro/planet-archetypes";
import HouseArchetypes from "@/components/western/cycles/house-archetypes";
import HouseCusps from "@/components/overview/house-cusps";

/**
 * The Western vocabulary on one page: what each sign, planet and house means
 * before any chart is read against it. A planet is *what* acts, a sign is
 * *how* it acts, a house is *where* in a life it lands.
 *
 * Nothing here is written fresh — each section is the same component or table
 * its own page reads (signs from Framework, planets from Macro and Cycles,
 * houses from Cycles, cusps from the house drawer), so the meanings cannot
 * drift between the guide and the pages that use them.
 */
export default function AstrologyGuide() {
  return (
    <>
      <section className="mb-16">
        <SectionHeading>Planets</SectionHeading>
        <p className="mb-5 max-w-3xl text-[0.9375rem] leading-relaxed text-bone-faint">
          What is acting. The personal five move fast and describe the person;
          the outer five move slowly and describe the times.
        </p>
        <PlanetArchetypes bodies="all" />
      </section>

      <section className="mb-16">
        <SectionHeading>Signs</SectionHeading>
        <p className="mb-5 max-w-3xl text-[0.9375rem] leading-relaxed text-bone-faint">
          How it acts. The twelve signs, grouped by element.
        </p>
        <ZodiacFramework layout="columns" />
      </section>

      <section className="mb-16">
        <SectionHeading>Houses</SectionHeading>
        <p className="mb-5 max-w-3xl text-[0.9375rem] leading-relaxed text-bone-faint">
          Where in a life it lands.
        </p>
        <HouseArchetypes />
      </section>

      <section className="mb-16">
        <SectionHeading>House Cusps</SectionHeading>
        <p className="mb-5 max-w-3xl text-[0.9375rem] leading-relaxed text-bone-faint">
          The sign on a house&rsquo;s cusp sets the manner that area of life is
          run in. Each sign brings the same manner to whichever house it opens.
        </p>
        <HouseCusps />
      </section>
    </>
  );
}
