//app/chakras/page.tsx
import type { Metadata } from "next";
import { PageTitle } from "@/components/primitives";
import ChakraStudy from "@/components/chakras/chakra-study";

export const metadata: Metadata = {
  title: "Chakras — Oddessi",
  description: "The seven chakras, root to crown.",
};

export default function ChakrasPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <PageTitle
        eyebrow="Subtle body"
        title="Chakras"
        lede="Seven centres along the spine, from the ground of the body to the crown of the head."
      />

      <ChakraStudy />
    </div>
  );
}
