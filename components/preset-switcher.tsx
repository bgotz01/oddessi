"use client";

import { PRESETS, useScoring } from "@/components/scoring-context";

/**
 * The five reading conventions, as a row you can flick through.
 *
 * These belong above the chart rather than buried in a modal. The whole reason
 * for having presets is to watch a chart you know well move between them —
 * whether tenancy improved the reading, whether traditional rulership puts the
 * weight somewhere truer — and that comparison is impossible if switching costs
 * two clicks and a dialog each way.
 */
export default function PresetSwitcher({
  onEdit,
}: {
  /** Opens the full editor, for anything the five tiles cannot say. */
  onEdit?: () => void;
}) {
  const { config, edited, applyPreset } = useScoring();

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="datum text-[0.5625rem] tracking-[0.2em] text-bone-faint uppercase">
          Reading by
        </span>
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="datum text-[0.5625rem] tracking-[0.16em] text-bone-faint uppercase transition-colors hover:text-patina"
          >
            {edited ? "Edited · adjust" : "Adjust"}
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-3 lg:grid-cols-5">
        {PRESETS.map((p) => {
          const active = config.id === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p.id)}
              aria-pressed={active}
              title={p.note}
              className={`flex flex-col gap-1 px-4 py-3 text-left transition-colors ${active
                ? "bg-surface-alt"
                : "bg-void hover:bg-surface"
                }`}
            >
              <span
                className={`datum text-[0.625rem] leading-tight tracking-[0.14em] uppercase ${active ? "text-patina" : "text-bone-soft"
                  }`}
              >
                {p.label}
              </span>
              <span className="datum text-[0.5625rem] leading-tight tracking-[0.1em] text-bone-faint uppercase">
                {active && edited ? "modified" : p.summary}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
