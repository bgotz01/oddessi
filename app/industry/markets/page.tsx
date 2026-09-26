import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/primitives";
import styles from "./markets.module.css";

export const metadata: Metadata = {
  title: "Markets & Macro Cycles | Oddessi",
  description:
    "Explore market macro cycles through capital’s aspiration, disruption, and organization: Neptune, Uranus, and Pluto.",
};

const LENSES = [
  {
    planet: "Neptune",
    glyph: "♆",
    fn: "Aspiration",
    lead: "what capital",
    emphasis: "is seeking.",
  },
  {
    planet: "Uranus",
    glyph: "♅",
    fn: "Disruption",
    lead: "what changes how",
    emphasis: "capital operates.",
  },
  {
    planet: "Pluto",
    glyph: "♇",
    fn: "Organization",
    lead: "how capital is",
    emphasis: "organized into power.",
  },
] as const;

export default function MarketsIndustryPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8">
      <div className="pt-12">
        <PageTitle
          eyebrow="Industry · Markets"
          title="Markets & Macro Cycles"
          lede="Three planetary lenses for studying the long cycles of capital: what it seeks, what changes how it operates, and how it is organized into power."
        />
      </div>

      <section
        aria-label="The three lenses of capital"
        className="my-10 grid gap-4 lg:grid-cols-3"
      >
        {LENSES.map((lens, index) => (
          <article key={lens.planet} className={styles.card}>
            <div className={styles.orbit} aria-hidden="true" />
            <div className={styles.symbol} aria-hidden="true">{lens.glyph}</div>
            <span className={styles.number}>0{index + 1} · {lens.fn}</span>
            <h2 className={styles.statement}>
              <span className={styles.planet}><Link href={`/industry/markets/${lens.planet.toLowerCase()}`} className={styles.cardLink}>{lens.planet}</Link> <span className={styles.equals}>=</span></span>{" "}
              <span className={styles.lead}>{lens.lead}</span>{" "}
              <span className={styles.emphasis}>{lens.emphasis}</span>
            </h2>
          </article>
        ))}
      </section>

    </div>
  );
}
