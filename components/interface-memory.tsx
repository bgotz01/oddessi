"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "@/components/chat-provider";
import { useChart } from "@/components/chart-context";

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
  content: string;
  lessons: string[];
}

export function MemoryControl() {
  const { memoryEnabled, setMemoryEnabled, distil, summarizing, messages, busy } =
    useChat();
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

  const attached = memoryEnabled && !!chart;
  const canDistil = messages.filter((m) => m.content.trim()).length >= 2;

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
                  <section key={cat.category}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3 border-b border-rule-faint pb-1">
                      <h4 className="eyebrow">{cat.category}</h4>
                      <span className="datum text-[0.5625rem] text-bone-faint">
                        {cat.lessons.length}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {cat.lessons.map((lesson, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="datum text-[0.5625rem] leading-5 text-patina-dim">
                            —
                          </span>
                          <span className="text-[0.9375rem] leading-snug text-bone-soft">
                            {lesson}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </div>

          {/* Write to it */}
          <div className="flex items-center justify-between gap-3 border-t border-rule px-4 py-3">
            <button
              type="button"
              onClick={distil}
              disabled={!canDistil || summarizing || busy || !chart}
              title={
                canDistil
                  ? "Distil this conversation into memory and carry on"
                  : "Needs a question and an answer first"
              }
              className="datum text-[0.625rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-patina disabled:cursor-not-allowed disabled:opacity-30"
            >
              {summarizing ? "distilling…" : "distil this conversation"}
            </button>
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
