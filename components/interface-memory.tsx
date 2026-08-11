"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "@/components/chat-provider";
import { useChart } from "@/components/chart-context";
import { isPinned, type MemoryScope } from "@/lib/memory-scope";

/**
 * The memory control for the Interface: one button that owns everything to do
 * with memory, instead of the three separate affordances this replaced.
 *
 * Before, the header carried a Chart Memory toggle, a Distil button and a Clear
 * button, and there was still no way to see what any of it had saved — the only
 * viewer was the council's memory modal, on another page. Attaching memory,
 * writing memory and reading memory are one subject and now sit behind one
 * control.
 *
 * The panel is deliberately read-only. Editing a lesson is a slower, more
 * deliberate job than anything else in this modal, and the council's memory
 * panel already does it properly; duplicating that here would mean two editors
 * over one table.
 */

interface MemoryCategory {
  category: string;
  scope: MemoryScope;
  legacy: boolean;
  content: string;
  lessons: string[];
}

/**
 * The heading colour carries the scope, because the name already carries it in
 * words — "Eastern Chart" does not also need an EAST tag beside it. Patina for
 * Western and ember for Chinese matches the two column rules on the Comparison
 * page, so the pairing is already learned. Shared categories stay bone: they
 * belong to the person rather than to either system.
 */
const SCOPE_COLOR: Record<MemoryScope, string> = {
  West: "text-patina",
  East: "text-ember",
  Shared: "text-bone",
};

export function MemoryControl() {
  const { memoryEnabled, setMemoryEnabled, summarizing } = useChat();
  const { chart } = useChart();

  const [open, setOpen] = useState(false);
  // `null` is "not read yet" — the distinction from `[]` is what tells the
  // panel to say "Reading…" rather than "nothing saved". Carrying it in the
  // same value as the data avoids a second state that has to be set
  // synchronously inside an effect just to show a spinner.
  const [categories, setCategories] = useState<MemoryCategory[] | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const load = useCallback(() => {
    const name = chart?.name;
    if (!name) return;
    fetch(`/api/chat/memory?chartName=${encodeURIComponent(name)}`)
      .then((r) => r.json())
      .then((rows: MemoryCategory[]) => setCategories(rows))
      .catch(() => setCategories([]));
  }, [chart?.name]);

  // Fetch when the panel opens, not on mount — most sessions never open it.
  useEffect(() => {
    if (open) load();
  }, [open, load]);

  // A distil that has just finished is the one moment the contents are known to
  // be stale, so re-read as `summarizing` falls back to false.
  const wasSummarizing = useRef(summarizing);
  useEffect(() => {
    if (wasSummarizing.current && !summarizing && open) load();
    wasSummarizing.current = summarizing;
  }, [summarizing, open, load]);

  // Dismiss on outside click and on Escape, the way the modal itself does.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  // The name alone, so the callback is not rebuilt whenever anything else about
  // the chart changes.
  const chartName = chart?.name;

  const unpin = useCallback(
    (category: string, index: number) => {
      if (!chartName) return;
      const q = new URLSearchParams({
        chartName,
        category,
        index: String(index),
      });
      fetch(`/api/chat/memory?${q}`, { method: "DELETE" })
        .then(() => load())
        .catch(() => {/* the row stays; the panel will re-read next open */ });
    },
    [chartName, load],
  );

  const attached = memoryEnabled && !!chart;

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        title={
          chart
            ? `Memory for ${chart.name} — ${attached ? "attached to each message" : "not attached"}`
            : "Select a chart to see its memory"
        }
        className={`datum flex items-center gap-2 whitespace-nowrap border px-2 py-1 text-[0.625rem] uppercase tracking-[0.14em] transition-colors ${
          open ? "border-patina text-patina" : "border-rule text-bone-faint hover:text-bone"
        }`}
      >
        Memory
        {/* The same ring the council uses, so the attached state is legible
            without opening anything. */}
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <circle
            cx="5"
            cy="5"
            r="4"
            stroke="currentColor"
            strokeWidth="1"
            className={attached ? "text-patina" : "text-bone-faint"}
          />
          {attached && <circle cx="5" cy="5" r="2" fill="var(--color-patina)" />}
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 max-h-[26rem] w-[24rem] overflow-y-auto border border-rule bg-surface-alt shadow-xl">
          {/* Attach switch */}
          <button
            type="button"
            onClick={() => setMemoryEnabled(!memoryEnabled)}
            disabled={!chart}
            aria-pressed={attached}
            className="flex w-full items-center justify-between border-b border-rule px-4 py-3 text-left transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="datum text-[0.625rem] uppercase tracking-[0.18em] text-bone">
              Attach to messages
            </span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <circle
                cx="5"
                cy="5"
                r="4"
                stroke="currentColor"
                strokeWidth="1"
                className={attached ? "text-patina" : "text-bone-faint"}
              />
              {attached && <circle cx="5" cy="5" r="2" fill="var(--color-patina)" />}
            </svg>
          </button>

          {/* What is saved */}
          <div className="px-4 py-3">
            {!chart ? (
              <p className="datum text-[0.625rem] text-bone-faint">No chart selected.</p>
            ) : categories === null ? (
              <p className="datum text-[0.625rem] text-bone-faint">Reading…</p>
            ) : categories.length === 0 ? (
              <p className="text-[0.9375rem] leading-relaxed text-bone-faint">
                Nothing distilled for {chart.name} yet. Have a conversation worth
                keeping, then distil it below.
              </p>
            ) : (
              <div className="space-y-4">
                {categories.map((cat) => (
                  <section key={`${cat.scope}-${cat.category}`}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3 border-b border-rule-faint pb-1">
                      <h4
                        className={`eyebrow ${SCOPE_COLOR[cat.scope]}`}
                        title={
                          cat.scope === "Shared"
                            ? "About the person rather than either system — read in every conversation"
                            : `Only read when ${cat.scope === "West" ? "West" : "East"} or Both is selected`
                        }
                      >
                        {cat.category}
                      </h4>
                      <span className="flex items-baseline gap-3">
                        {/* Rows distilled before the split. Flagged rather than
                            hidden: they hold real content, they are just filed
                            under a name that does not say which system it came
                            from, so they are read in every conversation. */}
                        {cat.legacy && (
                          <span
                            title="Distilled before East and West were separated — may mix both systems"
                            className="datum text-[0.5625rem] uppercase tracking-[0.16em] text-bone-faint"
                          >
                            unsorted
                          </span>
                        )}
                        <span className="datum text-[0.5625rem] text-bone-faint">
                          {cat.lessons.length}
                        </span>
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {cat.lessons.map((lesson, i) => (
                        <li key={i} className="group flex gap-2">
                          <span className="datum text-[0.5625rem] leading-5 text-patina-dim">
                            {isPinned(cat.category) ? "❝" : "—"}
                          </span>
                          <span className="flex-1 text-[0.9375rem] leading-snug text-bone-soft">
                            {lesson}
                          </span>
                          {/* Only pinned passages get a remove control. A
                              distilled lesson is the distiller's to reconcile,
                              and a second editor over the same row would put
                              the two out of step. */}
                          {isPinned(cat.category) && (
                            <button
                              type="button"
                              onClick={() => unpin(cat.category, i)}
                              title="Remove this pinned passage"
                              aria-label="Remove this pinned passage"
                              className="datum shrink-0 text-[0.75rem] leading-5 text-bone-faint opacity-0 transition-opacity hover:text-ember group-hover:opacity-100"
                            >
                              ×
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </div>

          {/* Distilling lives under the composer now, not here — it is an act
              on the conversation, and nobody thought to look for it inside a
              panel. This panel shows what memory holds and whether it is
              attached; writing to it happens where the writing happened. */}
          <div className="flex items-center justify-between gap-3 border-t border-rule px-4 py-2">
            <span className="datum text-[0.5625rem] uppercase tracking-[0.18em] text-bone-faint">
              distil below the composer
            </span>
            <a
              href="/council"
              className="datum shrink-0 text-[0.5625rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-patina"
            >
              edit ›
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
