// western/framework/page.tsx
"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { PageTitle } from "@/components/primitives";
import OuterPlanetFramework from "@/components/outer-planet-framework";
import HouseCusps from "@/components/framework/house-cusps";
import ZodiacGrid from "@/components/framework/zodiac-grid";
import SignAxes from "@/components/framework/sign-axes";
import PlanetGroups from "@/components/framework/planet-groups";
import HouseSystems from "@/components/framework/house-systems";
import RulershipChain from "@/components/framework/rulership-chain";
import RulershipConventions from "@/components/framework/rulership-conventions";
import DignityTable from "@/components/framework/dignity-table";
import {
  AspectPatterns,
  MajorAspects,
  MinorAspects,
  ReadingAspects,
} from "@/components/framework/aspects-guide";
import { BodySpeeds, CycleShape, TimingTechniques } from "@/components/framework/cycles-guide";
import HouseArchetypes from "@/components/western/cycles/house-archetypes";
import { PartTabs, SectionTabs } from "@/components/framework/framework-tabs";
import { useChat } from "@/components/chat-provider";
import { PATTERNS_IN_APP } from "@/lib/astrology/aspect-guide";
import { OUTER_PLANETS, frameworkContext } from "@/lib/astrology/framework-context";

/**
 * How astrology works, one layer at a time: planet (what acts), sign (how),
 * house (where), rulership (which areas connect), aspect (how planets meet),
 * and cycle (when). Overview is the other half — what happened, and when.
 *
 * One section and one part are open at a time, kept in the URL hash
 * (`#houses/cusps`) so a link or a reload lands on the same view. The page
 * shows names and principles only; the fuller layer goes to the chat.
 */

interface Part {
  id: string;
  label: string;
  /** One or two sentences above the part. */
  intro: string;
  content: ReactNode;
}

interface Section {
  id: string;
  label: string;
  /** What the layer answers — shown on its tab. */
  question: string;
  lede: string;
  parts: Part[];
}

const SECTIONS: Section[] = [
  {
    id: "zodiac",
    label: "Zodiac",
    question: "How it acts",
    lede: "Twelve signs, each one element worked in one way. A sign never acts on its own — it is the manner a planet takes on.",
    parts: [
      {
        id: "grid",
        label: "Elements & Modalities",
        intro: "The element is the material; the modality is what the sign does with it — start, hold or adapt. Select a sign for its ruler and opposite.",
        content: <ZodiacGrid />,
      },
      {
        id: "oppositions",
        label: "Oppositions",
        intro: "Six pairs across the wheel. Each pair is one theme seen from its two ends.",
        content: <SignAxes />,
      },
    ],
  },
  {
    id: "planets",
    label: "Planets",
    question: "What acts",
    lede: "Ten planets and three points. Each planet is one principle with one function — the verb keeps them apart where keywords overlap.",
    parts: [
      {
        id: "groups",
        label: "Planets",
        intro: "Grouped by speed: the faster a planet, the more personal its sign. Select one for the signs it rules and its natural house.",
        content: <PlanetGroups />,
      },
    ],
  },
  {
    id: "houses",
    label: "Houses",
    question: "Where it lands",
    lede: "Twelve areas of experience. Signs describe qualities; houses describe where in a life they are lived.",
    parts: [
      {
        id: "meanings",
        label: "Meanings",
        intro: "Every house lands twice — in the outer world of people, money and places, and inwardly, as the need those things stand for.",
        content: <HouseArchetypes />,
      },
      {
        id: "cusps",
        label: "Cusps",
        intro: "A cusp is where a house begins. The sign on it describes how that area of life is approached; its ruling planet connects the house to another part of the chart. Change any layer to see the link move.",
        content: (
          <>
            <RulershipChain />
            <p className="mt-12 mb-5 max-w-3xl text-[0.9375rem] leading-relaxed text-bone-faint">
              Each sign brings the same approach to whichever house it opens.
            </p>
            <HouseCusps />
          </>
        ),
      },
      {
        id: "systems",
        label: "Angles & Systems",
        intro: "The horizon and meridian give four fixed points. Systems differ in how they divide the space between them — which can move a planet near a cusp into the next house, and change a house's ruler.",
        content: <HouseSystems />,
      },
    ],
  },
  {
    id: "rulerships",
    label: "Rulerships",
    question: "How areas connect",
    lede: "Every sign has a ruling planet, so every house has one too — and following rulers from house to house links the chart into chains and loops.",
    parts: [
      {
        id: "conventions",
        label: "Terms & Conventions",
        intro: "The vocabulary of rulership, and the three signs where modern and traditional astrology name different rulers.",
        content: <RulershipConventions />,
      },
      {
        id: "dignity",
        label: "Dignity",
        intro: "A planet's condition by sign. In the signs it rules or is exalted in it works in its own register; opposite them it has to work in someone else's.",
        content: <DignityTable />,
      },
    ],
  },
  {
    id: "aspects",
    label: "Aspects",
    question: "How planets meet",
    lede: "An aspect is an angle between two planets. The angle says whether their principles cooperate, negotiate or merge.",
    parts: [
      {
        id: "major",
        label: "Major",
        intro: "Five angles carry most of the structure in a chart. Green aspects let two planets cooperate; red ones make them negotiate.",
        content: <MajorAspects />,
      },
      {
        id: "minor",
        label: "Minor",
        intro: "Narrow orbs, read as colouring rather than structure.",
        content: <MinorAspects />,
      },
      {
        id: "reading",
        label: "Reading an Aspect",
        intro: "What makes one aspect stronger than another, and which of those this app measures.",
        content: <ReadingAspects />,
      },
      {
        id: "patterns",
        label: "Patterns",
        intro: `Several aspects locking into one shape. ${PATTERNS_IN_APP}`,
        content: <AspectPatterns />,
      },
    ],
  },
  {
    id: "cycles",
    label: "Cycles",
    question: "When it moves",
    lede: "The natal chart is fixed. These are the ways astrology sets it moving — when a placement becomes active, and how its meaning develops.",
    parts: [
      {
        id: "techniques",
        label: "Techniques",
        intro: "Each way of timing a chart, and whether this app computes it.",
        content: <TimingTechniques />,
      },
      {
        id: "phases",
        label: "Phases",
        intro: "Every cycle — a planet returning to its natal place, or two planets meeting again — passes the same four turning points. Ages are from mean orbits; real dates shift with retrogrades.",
        content: <CycleShape />,
      },
      {
        id: "speeds",
        label: "Speeds",
        intro: "Speed decides what a body can time. The fast ones colour days and weeks; the slow ones mark the seasons of a life.",
        content: <BodySpeeds />,
      },
      {
        id: "outer",
        label: "Outer Planets",
        intro: "How Uranus, Neptune and Pluto each operate through the twelve signs. The historical eras they are matched with live under Macro.",
        content: <OuterPlanetFramework planets={OUTER_PLANETS} title="Outer Planets" />,
      },
    ],
  },
];

/** `#houses/cusps` → a valid section and part, falling back to the first of each. */
function parseHash(hash: string): { section: Section; part: Part } {
  const [sid, pid] = hash.replace(/^#/, "").split("/");
  const section = SECTIONS.find((s) => s.id === sid) ?? SECTIONS[0];
  const part = section.parts.find((p) => p.id === pid) ?? section.parts[0];
  return { section, part };
}

export default function FrameworkPage() {
  const { setPageContext } = useChat();
  const [view, setView] = useState(() => parseHash(""));
  const panelRef = useRef<HTMLDivElement>(null);

  // The hash is only readable after mount; reading it in the initialiser would
  // make the server and client renders disagree.
  useEffect(() => {
    const sync = () => setView(parseHash(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const open = useCallback((sectionId: string, partId?: string) => {
    const next = parseHash(`${sectionId}/${partId ?? ""}`);
    setView(next);
    window.history.replaceState(null, "", `#${next.section.id}/${next.part.id}`);
    // If the reader has scrolled past the top of the panel, bring it back
    // under the sticky tabs rather than leaving them mid-way down new content.
    const top = panelRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) panelRef.current?.scrollIntoView({ block: "start" });
  }, []);

  const viewing = `${view.section.id}/${view.part.id}`;
  useEffect(() => {
    setPageContext(frameworkContext(viewing));
    return () => setPageContext(null);
  }, [setPageContext, viewing]);

  const { section, part } = view;

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow="Guide"
        title="Framework"
        compact
        lede="How astrology works. A planet is what acts, a sign is how it acts, a house is where it lands — and rulerships, aspects and cycles say how the pieces connect and when they move."
      />

      <SectionTabs
        sections={SECTIONS}
        active={section.id}
        onSelect={(id) => open(id)}
      />

      <div
        ref={panelRef}
        role="tabpanel"
        id={`panel-${section.id}`}
        aria-labelledby={`tab-${section.id}`}
        className="scroll-mt-32"
      >
        <header className="mb-8">
          <h2 className="inscription text-[1.5rem] leading-tight tracking-[0.08em] text-bone">
            {section.label}
          </h2>
          <p className="mt-3 max-w-3xl text-[1.0625rem] leading-relaxed text-bone-soft">
            {section.lede}
          </p>
        </header>

        <PartTabs
          parts={section.parts}
          active={part.id}
          onSelect={(id) => open(section.id, id)}
        />

        <p className="mb-6 max-w-3xl text-[0.9375rem] leading-relaxed text-bone-faint">
          {part.intro}
        </p>
        {part.content}
      </div>
    </div>
  );
}
