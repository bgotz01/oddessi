//components/chakras/chakra-column.tsx
"use client";

import { CHAKRAS, type Chakra } from "@/lib/chakras";

/** Crown at the top, root at the bottom, as the body stands. */
const ASCENDING = [...CHAKRAS].reverse();

/** The axis carries the spectrum, root to crown, faintly. */
const AXIS = `linear-gradient(to top, ${CHAKRAS.map((c) => c.hue).join(", ")})`;

/**
 * The seven centres strung on one axis, the way the body carries them.
 *
 * Each node is a dial: its petals are drawn as radial hairlines, so the count
 * reads at a glance — four at the root, a fringe at the crown. Each centre
 * wears its own colour as an accent. That breaks the app's two-accent rule on
 * purpose and on this page only: here the colour is part of the subject, not
 * a grade laid over it, so it stays confined to the centre it names.
 *
 * The two sides mirror each other — a name and its gloss on the left, a theme
 * and its question on the right, the same two lines in the same type — so the
 * column stands on its axis.
 *
 * It is the page's overview and holds no reading of its own: selecting a
 * centre opens its chapter below.
 */
export default function ChakraColumn({
  selected,
  onSelect,
}: {
  selected: number | null;
  onSelect: (n: number) => void;
}) {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* The axis the centres hang on — runs node to node, not edge to edge. */}
      <span
        aria-hidden
        className="absolute top-11 bottom-11 left-1/2 w-px -translate-x-1/2 opacity-50"
        style={{ background: AXIS }}
      />

      <ol>
        {ASCENDING.map((c) => (
          <li key={c.number}>
            <ChakraRow
              chakra={c}
              selected={selected === c.number}
              onSelect={() => onSelect(c.number)}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

function ChakraRow({
  chakra,
  selected,
  onSelect,
}: {
  chakra: Chakra;
  selected: boolean;
  onSelect: () => void;
}) {
  const head = "inscription block text-[0.8125rem] transition-colors sm:text-[1rem]";
  const gloss = "mt-1 block text-[0.9375rem] font-light text-bone-soft italic sm:text-[1rem]";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${chakra.name} chakra, ${chakra.sanskrit}`}
      className="group grid w-full cursor-pointer grid-cols-[1fr_auto_1fr] items-center gap-4 py-1.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-patina)] sm:gap-8"
      style={{ ["--hue" as string]: chakra.hue }}
    >
      <span className="text-right">
        <span
          className={`${head} ${selected ? "text-[color:var(--hue)]" : "text-bone group-hover:text-[color:var(--hue)]"}`}
        >
          {chakra.name}
        </span>
        <span className={gloss}>{chakra.sanskrit}</span>
      </span>

      <ChakraNode chakra={chakra} selected={selected} />

      <span className="text-left">
        <span className={`${head} text-bone-soft`}>{chakra.theme}</span>
        <span className={gloss}>{chakra.question}</span>
      </span>
    </button>
  );
}

/** Server and browser trig disagree in the last digit, which breaks hydration. */
const round = (n: number) => Math.round(n * 100) / 100;

/** Petal ticks are capped so the crown's thousand read as a fringe, not a disc. */
const MAX_TICKS = 72;

function ChakraNode({ chakra, selected }: { chakra: Chakra; selected: boolean }) {
  const ticks = Math.min(chakra.petals, MAX_TICKS);
  const fringe = chakra.petals > MAX_TICKS;

  return (
    <span className="relative block h-[4.5rem] w-[4.5rem]">
      <svg
        viewBox="-36 -36 72 72"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* Masks the axis behind the node. */}
        <circle r={22} fill="var(--color-void)" />
        <g
          stroke={chakra.hue}
          className={`transition-opacity ${selected ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
        >
          {Array.from({ length: ticks }, (_, i) => {
            // Offset half a step so no petal hides behind the axis, and the
            // third eye's two sit left and right, as they are drawn.
            const a = ((i + 0.5) / ticks) * Math.PI * 2 - Math.PI / 2;
            const inner = 24;
            const outer = fringe ? 29 : 33;
            return (
              <line
                key={i}
                x1={round(Math.cos(a) * inner)}
                y1={round(Math.sin(a) * inner)}
                x2={round(Math.cos(a) * outer)}
                y2={round(Math.sin(a) * outer)}
                strokeWidth={fringe ? 0.6 : 1.2}
              />
            );
          })}
        </g>
        <circle
          r={22}
          fill={selected ? `color-mix(in srgb, ${chakra.hue} 18%, transparent)` : "none"}
          stroke={chakra.hue}
          strokeWidth={1}
          className={`transition-opacity ${selected ? "opacity-100" : "opacity-40 group-hover:opacity-80"}`}
        />
        {/* The crown has no seed syllable; a point stands in for it. */}
        {chakra.bija ? null : <circle r={2.5} fill={chakra.hue} />}
      </svg>
      {chakra.bija ? (
        <span
          className="glyph absolute inset-0 flex items-center justify-center text-[1.25rem]"
          style={{ color: chakra.hue }}
        >
          {chakra.bija.glyph}
        </span>
      ) : null}
    </span>
  );
}
