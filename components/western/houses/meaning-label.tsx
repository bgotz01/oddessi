/**
 * The External / Internal vocabulary for houses, shared by the houses wall,
 * the House Archetypes panel and both drawers so a reading is labelled and
 * listed the same way everywhere.
 */

/**
 * Names one of a house's two readings, External or Internal: a small
 * inscription between hairlines. Shared by the houses wall and the House
 * Archetypes panel so the two label a reading the same way.
 */
export default function MeaningLabel({ tone, children }: { tone: string; children: string }) {
  return (
    <span className={`flex items-center gap-2 ${tone}`}>
      <span aria-hidden className="h-px w-3 bg-current opacity-40" />
      <span className="inscription text-[0.5625rem] tracking-[0.14em]">{children}</span>
      <span aria-hidden className="h-px w-3 bg-current opacity-40" />
    </span>
  );
}

/** One side of a house's themes: the shared label, then a dashed list. */
export function ThemeColumn({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "patina" | "ember";
}) {
  return (
    <div>
      <MeaningLabel tone={tone === "patina" ? "text-patina" : "text-ember"}>{label}</MeaningLabel>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              className={`datum text-[0.625rem] leading-7 ${
                tone === "patina" ? "text-patina-dim" : "text-ember-dim"
              }`}
            >
              —
            </span>
            <span
              className={`text-[1.0625rem] leading-relaxed ${
                tone === "patina" ? "text-bone" : "text-bone-soft italic"
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A house's five keywords — the general layer that spans both readings. Set
 * like the theme row at the head of the Cycles drawer: tracked caps divided
 * by dots, in one colour.
 */
export function HouseTags({ tags, color }: { tags: string[]; color: string }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1.5">
      {tags.map((t, i) => (
        <div key={t} className="flex items-center gap-3">
          <span className="datum text-[0.75rem] tracking-[0.2em] uppercase" style={{ color }}>
            {t}
          </span>
          {i < tags.length - 1 && (
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: color, opacity: 0.5 }} />
          )}
        </div>
      ))}
    </div>
  );
}
