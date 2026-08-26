"use client";

import { useState } from "react";
import { PRESETS, useScoring } from "@/components/scoring-context";
import { OpenMark } from "@/components/study-panel";

/**
 * The five reading conventions, as a row you can flick through.
 *
 * Collapsed, it names only the convention in play — the comparison this
 * exists for happens once expanded, where every tile sits in reach and
 * switching between them costs one click each rather than two plus a dialog.
 */
export default function ChartPresets({
  onEdit,
}: {
  /** Opens the full editor, for anything the five tiles cannot say. */
  onEdit?: () => void;
}) {
  const { config, edited, applyPreset } = useScoring();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group flex items-baseline gap-1.5 text-left"
        >
          <span className="datum text-[0.5625rem] tracking-[0.2em] text-bone-faint uppercase transition-colors group-hover:text-bone-soft">
            Reading by{" "}
            <span className="text-patina">
              {config.label}
              {edited ? " · modified" : ""}
            </span>
          </span>
          <OpenMark open={open} />
        </button>
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

      {open ? (
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
      ) : null}
    </div>
  );
}
