//components/chakras/chakra-archetypes.tsx
import { CHAKRAS, type Chakra } from "@/lib/chakras";
import {
  ARCHETYPE_NOTE,
  CHAKRA_ARCHETYPES,
  type ChakraArchetype,
} from "@/lib/chakra-archetypes";

/**
 * Archetypes of imbalance between chakras, as a grid of cards.
 *
 * Each card carries its name and pattern, then a small figure of all seven
 * centres root to crown: the strong ones filled in their colour, the weak
 * ones hollow and broken, the rest a faint point. The figure is read from
 * the archetype's numbers alone, so the picture always matches the words.
 */
export default function ChakraArchetypes() {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <Legend kind="strong" label="Strong" />
        <Legend kind="weak" label="Weak" />
        <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
          Root → Crown
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CHAKRA_ARCHETYPES.map((a) => (
          <ArchetypeCard key={a.name} archetype={a} />
        ))}
      </div>

      <p className="mt-6 text-[0.9375rem] text-bone-faint italic">
        {ARCHETYPE_NOTE}
      </p>
    </div>
  );
}

const byNumber = (n: number) => CHAKRAS[n - 1];

function ArchetypeCard({ archetype }: { archetype: ChakraArchetype }) {
  const strong = archetype.strong.map(byNumber);
  const weak = archetype.weak.map(byNumber);

  return (
    <article className="flex flex-col border border-rule bg-surface px-5 pt-5 pb-4">
      <h3 className="inscription text-[1rem] leading-tight text-bone">
        {archetype.name}
      </h3>
      <p className="mt-1 text-[1.0625rem] text-bone-soft italic">
        {archetype.pattern}
      </p>

      <Figure strong={archetype.strong} weak={archetype.weak} />

      <p className="datum text-[0.625rem] tracking-[0.14em] uppercase">
        <Names chakras={strong} />
        <span className="text-bone-faint"> strong</span>
        <span className="mx-2 text-patina-dim">·</span>
        <Names chakras={weak} />
        <span className="text-bone-faint"> weak</span>
      </p>

      <p className="mt-3 border-t border-rule-faint pt-3 text-[1rem] leading-snug text-bone">
        {archetype.dynamic}
      </p>
    </article>
  );
}

/** Chakra names, each in its own colour, joined with an ampersand. */
function Names({ chakras }: { chakras: Chakra[] }) {
  return (
    <>
      {chakras.map((c, i) => (
        <span key={c.number}>
          {i > 0 ? <span className="text-bone-faint"> &amp; </span> : null}
          <span style={{ color: c.hue }}>{c.name}</span>
        </span>
      ))}
    </>
  );
}

const W = 210;
const H = 26;
const PAD = 12;

/** The seven centres in a row, root to crown, marked strong or weak. */
function Figure({ strong, weak }: { strong: number[]; weak: number[] }) {
  const x = (n: number) => PAD + ((n - 1) * (W - PAD * 2)) / 6;
  const y = H / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="my-4 block h-[26px] w-full max-w-[15rem]"
      role="img"
      aria-label={`Strong: ${strong.map((n) => byNumber(n).name).join(", ")}. Weak: ${weak
        .map((n) => byNumber(n).name)
        .join(", ")}.`}
    >
      <line
        x1={PAD}
        x2={W - PAD}
        y1={y}
        y2={y}
        stroke="var(--color-rule)"
        strokeWidth={1}
      />
      {CHAKRAS.map((c) => {
        const cx = x(c.number);
        if (strong.includes(c.number)) {
          return <circle key={c.number} cx={cx} cy={y} r={7} fill={c.hue} />;
        }
        if (weak.includes(c.number)) {
          return (
            <circle
              key={c.number}
              cx={cx}
              cy={y}
              r={6.5}
              fill="var(--color-surface)"
              stroke={c.hue}
              strokeWidth={1.25}
              strokeDasharray="2 2.2"
            />
          );
        }
        return (
          <circle
            key={c.number}
            cx={cx}
            cy={y}
            r={2.5}
            fill="var(--color-bone-faint)"
            fillOpacity={0.5}
          />
        );
      })}
    </svg>
  );
}

function Legend({ kind, label }: { kind: "strong" | "weak"; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
        {kind === "strong" ? (
          <circle cx={8} cy={8} r={6} fill="var(--color-bone-soft)" />
        ) : (
          <circle
            cx={8}
            cy={8}
            r={5.5}
            fill="none"
            stroke="var(--color-bone-soft)"
            strokeWidth={1.25}
            strokeDasharray="2 2.2"
          />
        )}
      </svg>
      <span className="datum text-[0.625rem] tracking-[0.18em] text-bone-soft uppercase">
        {label}
      </span>
    </span>
  );
}
