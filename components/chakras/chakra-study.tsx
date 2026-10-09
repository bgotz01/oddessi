//components/chakras/chakra-study.tsx
"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/primitives";
import ChakraColumn from "@/components/chakras/chakra-column";
import ChakraChapters from "@/components/chakras/chakra-chapters";
import ChakraArchetypes from "@/components/chakras/chakra-archetypes";
import ChakraPairs from "@/components/chakras/chakra-pairs";

/**
 * The column and the chapters as one view. The column is the overview — the
 * seven on one axis — and the chapters are the reading. They share a single
 * selection: choosing a centre on the column opens its signs-and-remedies
 * drawer and its chapter; opening a chapter lights its node on the column.
 */
export default function ChakraStudy() {
  const [open, setOpen] = useState<number | null>(null);
  const [guide, setGuide] = useState<number | null>(null);

  // The column opens the drawer straight away, and opens the chapter behind
  // it so the page is in step when the drawer closes.
  const fromColumn = (n: number) => {
    setOpen(n);
    setGuide(n);
  };

  return (
    <>
      <section className="mb-16">
        <SectionHeading aside="root to crown · petals drawn to count">
          The Seven
        </SectionHeading>
        <ChakraColumn selected={open} onSelect={fromColumn} />
      </section>

      <section className="mb-16">
        <SectionHeading aside="one open at a time">Chapters</SectionHeading>
        <ChakraChapters
          open={open}
          onOpenChange={setOpen}
          guide={guide}
          onGuideChange={setGuide}
        />
      </section>

      <section className="mb-16">
        <SectionHeading aside="three axes around the heart">Pairs</SectionHeading>
        <ChakraPairs />
      </section>

      <section className="mb-16">
        <SectionHeading aside="one centre strong, another weak">
          Archetypes
        </SectionHeading>
        <ChakraArchetypes />
      </section>
    </>
  );
}
