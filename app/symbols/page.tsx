"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  UNIQUE_SYMBOLS,
  TRADITIONS,
  TYPES,
  MEANINGS,
  type Tradition,
  type SymbolType,
  type Meaning,
  type OddessiSymbol,
} from "@/lib/symbols/data";
import { GLYPH_REGISTRY } from "@/components/symbols/glyphs";

// ── Static image map ────────────────────────────────────────────────────────
// Maps symbol IDs to their /public/symbols/ filename stem.
// Filename convention: symbol-{stem}.png
// Add an entry here whenever a new image lands in public/symbols/.

const IMAGE_MAP: Record<string, string> = {
  caduceus: "caduceus",
  cornucopia: "cornucopia",
  gorgoneion: "gorgoneion",
  kantharos: "kantharos",
  labyrinth: "labyrinth",
  meander: "meander",
  omphalos: "omphalos",
  "rod-of-asclepius": "rod-asclepius",
  thyrsus: "thyrsus",
};

// ── Filter state ────────────────────────────────────────────────────────────

type FilterKey = "tradition" | "type" | "meaning";

function useFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const tradition = (params.get("tradition") ?? "All") as Tradition | "All";
  const type = (params.get("type") ?? "All") as SymbolType | "All";
  const meaning = (params.get("meaning") ?? "All") as Meaning | "All";

  const set = useCallback(
    (key: FilterKey, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value === "All") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      router.replace(`?${next.toString()}`, { scroll: false });
    },
    [params, router],
  );

  const clear = useCallback(() => {
    router.replace("?", { scroll: false });
  }, [router]);

  const activeCount = [tradition, type, meaning].filter(
    (v) => v !== "All",
  ).length;

  return { tradition, type, meaning, set, clear, activeCount };
}

// ── Page ────────────────────────────────────────────────────────────────────

function SymbolsContent() {
  const { tradition, type, meaning, set, clear, activeCount } = useFilters();

  const filtered = useMemo(
    () =>
      UNIQUE_SYMBOLS.filter((s) => {
        if (tradition !== "All" && !s.traditions.includes(tradition))
          return false;
        if (type !== "All" && s.type !== type) return false;
        if (meaning !== "All" && !s.meanings.includes(meaning)) return false;
        return true;
      }),
    [tradition, type, meaning],
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      {/* ── Header ── */}
      <div className="pt-16 pb-10">
        <p className="eyebrow mb-4">Symbols &amp; Iconography</p>
        <h1 className="inscription text-[2rem] leading-tight text-bone">
          Symbol Reference
        </h1>
        <div className="mt-6 h-px w-full bg-patina-dim" />
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-bone-faint">
          Attested marks, attributes, and emblems across mythology, alchemy, and
          the ancient world. Each entry distinguishes historical use from
          symbolic interpretation.
        </p>
      </div>

      {/* ── Filters ── */}
      <div className="mb-10 space-y-3 border-b border-rule pb-8">
        <TabRow
          label="Tradition"
          options={["All", ...TRADITIONS]}
          active={tradition}
          onSelect={(v) => set("tradition", v)}
        />
        <TabRow
          label="Type"
          options={["All", ...TYPES]}
          active={type}
          onSelect={(v) => set("type", v)}
        />
        <TabRow
          label="Meaning"
          options={["All", ...MEANINGS]}
          active={meaning}
          onSelect={(v) => set("meaning", v)}
        />
      </div>

      {/* ── Result count + clear ── */}
      <div className="mb-8 flex items-baseline gap-5">
        <span className="datum text-[0.625rem] tracking-[0.22em] text-bone-faint uppercase">
          {filtered.length} {filtered.length === 1 ? "symbol" : "symbols"}
        </span>
        {activeCount > 0 && (
          <button
            onClick={clear}
            className="datum text-[0.5625rem] tracking-[0.18em] text-bone-faint/60 uppercase transition-colors hover:text-patina"
          >
            Clear all
          </button>
        )}
      </div>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <p className="text-[1rem] text-bone-faint italic">
          No symbols match the current filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-px bg-rule sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((symbol) => (
            <SymbolCard key={symbol.id} symbol={symbol} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SymbolsPage() {
  return (
    <Suspense>
      <SymbolsContent />
    </Suspense>
  );
}

// ── Tab filter row ──────────────────────────────────────────────────────────

function TabRow({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: readonly string[];
  active: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-0 gap-y-1">
      {/* Dimension label */}
      <span className="datum mr-6 w-20 shrink-0 text-[0.5625rem] tracking-[0.28em] text-bone-faint/50 uppercase">
        {label}
      </span>

      {/* Tab options */}
      {options.map((opt) => {
        const isActive = opt === active;
        return (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={[
              "datum mr-5 pb-0.5 text-[0.625rem] tracking-[0.16em] uppercase transition-colors",
              "border-b",
              isActive
                ? "border-patina text-patina"
                : "border-transparent text-bone-faint hover:text-bone-soft",
            ].join(" ")}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ── Symbol card ─────────────────────────────────────────────────────────────

function SymbolCard({ symbol }: { symbol: OddessiSymbol }) {
  const [histOpen, setHistOpen] = useState(false);

  return (
    <article className="group flex flex-col bg-surface">
      {/* ── Image zone ── */}
      <div className="relative flex aspect-[4/3] items-center justify-center border-b border-rule bg-void">
        {(() => {
          const imageStem = IMAGE_MAP[symbol.id];
          if (imageStem) {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/symbols/symbol-${imageStem}.png`}
                alt={symbol.name}
                className="h-4/5 w-4/5 object-contain"
                style={{ filter: "brightness(0.9) contrast(1.05)" }}
              />
            );
          }
          const Glyph = GLYPH_REGISTRY[symbol.id];
          if (Glyph) {
            return (
              <Glyph className="h-3/5 w-3/5 text-patina-dim transition-colors group-hover:text-patina" />
            );
          }
          if (symbol.glyph) {
            return (
              <span
                aria-hidden
                className="glyph select-none text-[3.5rem] leading-none text-patina-dim transition-colors group-hover:text-patina"
              >
                {symbol.glyph}
              </span>
            );
          }
          return (
            <span
              aria-hidden
              className="inscription select-none text-[3rem] leading-none text-rule transition-colors group-hover:text-patina-dim"
            >
              {symbol.name[0]}
            </span>
          );
        })()}

        {/* Tradition badges — top-right */}
        <span className="absolute top-3 right-3 flex flex-wrap justify-end gap-1">
          {symbol.traditions.map((t) => (
            <span
              key={t}
              className="datum bg-void px-1.5 py-0.5 text-[0.5625rem] tracking-[0.18em] text-bone-faint/60 uppercase"
            >
              {t}
            </span>
          ))}
        </span>
      </div>

      {/* ── Text zone ── */}
      <div className="flex flex-1 flex-col px-4 py-4">
        {/* Name + type */}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="inscription text-[0.9375rem] leading-tight text-bone">
            {symbol.name}
          </h3>
          <span className="datum shrink-0 text-[0.5625rem] tracking-[0.18em] text-bone-faint/50 uppercase">
            {symbol.type}
          </span>
        </div>

        {/* Meaning tags */}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
          {symbol.meanings.map((m) => (
            <span
              key={m}
              className="datum text-[0.625rem] tracking-[0.16em] text-patina-dim uppercase"
            >
              {m}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="my-3 h-px bg-rule-faint" />

        {/* Meaning — primary, fully visible */}
        <p className="text-[0.875rem] leading-relaxed text-bone">
          {symbol.meaning}
        </p>

        {/* Historical — collapsible */}
        <div className="mt-3 border-t border-rule-faint pt-3">
          <button
            type="button"
            onClick={() => setHistOpen((o) => !o)}
            className="flex w-full items-center justify-between gap-2 transition-colors hover:text-bone"
          >
            <span className="eyebrow">Historical</span>
            <span
              aria-hidden
              className={`datum text-[0.625rem] text-bone-faint transition-transform duration-200 ${histOpen ? "rotate-90 text-patina" : ""
                }`}
            >
              ›
            </span>
          </button>

          {histOpen && (
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-bone-faint">
              {symbol.historical}
              {symbol.also ? (
                <span className="mt-1.5 block italic text-bone-faint/70">
                  {symbol.also}
                </span>
              ) : null}
            </p>
          )}
        </div>

        {/* Aliases */}
        {symbol.aliases && symbol.aliases.length > 0 ? (
          <p className="mt-3 datum text-[0.5625rem] tracking-[0.14em] text-bone-faint/40 uppercase">
            {symbol.aliases.join(" · ")}
          </p>
        ) : null}
      </div>
    </article>
  );
}
