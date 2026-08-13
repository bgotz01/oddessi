"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Chart } from "@/lib/charts";

interface Props {
  charts: Chart[];
  onClose: () => void;
  /** Called with the new ordered list so the sidebar reflects it immediately. */
  onReorder: (ordered: Chart[]) => void;
}

export default function ChartManageModal({ charts, onClose, onReorder }: Props) {
  const router = useRouter();
  const [items, setItems] = useState<Chart[]>(charts);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // id of the chart pending delete confirmation, null otherwise
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ── drag state ──────────────────────────────────────────────────────────────
  const dragIndex = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  function onDragStart(index: number) {
    dragIndex.current = index;
  }

  function onDragEnter(index: number) {
    if (dragIndex.current === null || dragIndex.current === index) return;
    setDragOver(index);
  }

  function onDrop(targetIndex: number) {
    if (dragIndex.current === null || dragIndex.current === targetIndex) {
      dragIndex.current = null;
      setDragOver(null);
      return;
    }
    const next = [...items];
    const [moved] = next.splice(dragIndex.current, 1);
    next.splice(targetIndex, 0, moved);
    dragIndex.current = null;
    setDragOver(null);
    setItems(next);
  }

  function onDragEnd() {
    dragIndex.current = null;
    setDragOver(null);
  }

  // ── up / down buttons ───────────────────────────────────────────────────────
  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  }

  // ── delete ──────────────────────────────────────────────────────────────────
  async function handleDelete(chartId: string) {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch("/api/birth-chart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chartId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Deletion failed");
      }
      const next = items.filter((c) => c.id !== chartId);
      setItems(next);
      onReorder(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete chart.");
    } finally {
      setDeleting(false);
      setConfirmDeleteId(null);
    }
  }

  // ── save order ──────────────────────────────────────────────────────────────
  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/birth-chart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: items.map((c) => c.id) }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Save failed");
      }
      onReorder(items);
      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save order.");
    } finally {
      setSaving(false);
    }
  }

  const dirty =
    items.length !== charts.length ||
    items.some((c, i) => c.id !== charts[i].id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-void/80 px-4 pt-24 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md border border-rule bg-void shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-rule px-8 py-5">
          <h2 className="inscription text-[1rem] text-bone">Manage Charts</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-bone-faint transition-colors hover:text-bone"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto px-8 py-6">
          <p className="datum mb-5 text-[0.6875rem] leading-relaxed text-bone-faint">
            Drag rows or use the arrows to reorder. The order here is reflected
            in the sidebar dropdown.
          </p>

          <ul className="space-y-1.5">
            {items.map((chart, index) => {
              const isDraggingOver = dragOver === index;
              const isConfirming = confirmDeleteId === chart.id;

              return (
                <li key={chart.id} className="flex flex-col">
                  {/* Main row */}
                  <div
                    draggable={!isConfirming}
                    onDragStart={() => onDragStart(index)}
                    onDragEnter={() => onDragEnter(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onDrop(index)}
                    onDragEnd={onDragEnd}
                    className={`flex items-center gap-3 border px-3 py-2.5 transition-colors ${isDraggingOver
                        ? "border-patina bg-surface-alt"
                        : isConfirming
                          ? "border-ember/40 bg-surface"
                          : "border-rule bg-surface"
                      }`}
                  >
                    {/* Drag handle */}
                    <span
                      aria-hidden="true"
                      className="cursor-grab select-none text-bone-faint active:cursor-grabbing"
                    >
                      <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                        <circle cx="3" cy="2.5" r="1" fill="currentColor" />
                        <circle cx="7" cy="2.5" r="1" fill="currentColor" />
                        <circle cx="3" cy="7" r="1" fill="currentColor" />
                        <circle cx="7" cy="7" r="1" fill="currentColor" />
                        <circle cx="3" cy="11.5" r="1" fill="currentColor" />
                        <circle cx="7" cy="11.5" r="1" fill="currentColor" />
                      </svg>
                    </span>

                    {/* Position number */}
                    <span className="datum w-4 shrink-0 text-right text-[0.625rem] text-bone-faint">
                      {index + 1}
                    </span>

                    {/* Chart name */}
                    <span className="datum min-w-0 flex-1 truncate text-[0.8125rem] text-bone">
                      {chart.name}
                    </span>

                    {/* Big 3 */}
                    <span className="datum hidden shrink-0 text-[0.625rem] text-bone-faint sm:block">
                      ☉{chart.big3.sun.slice(0, 3)} ☽{chart.big3.moon.slice(0, 3)} ↑
                      {chart.big3.rising.slice(0, 3)}
                    </span>

                    {/* Up / Down */}
                    <div className="flex shrink-0 flex-col gap-0.5">
                      <button
                        type="button"
                        onClick={() => move(index, -1)}
                        disabled={index === 0 || isConfirming}
                        aria-label={`Move ${chart.name} up`}
                        className="flex h-4 w-4 items-center justify-center text-bone-faint transition-colors hover:text-bone disabled:opacity-20"
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                          <path
                            d="M1 5.5l3-3 3 3"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => move(index, 1)}
                        disabled={index === items.length - 1 || isConfirming}
                        aria-label={`Move ${chart.name} down`}
                        className="flex h-4 w-4 items-center justify-center text-bone-faint transition-colors hover:text-bone disabled:opacity-20"
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                          <path
                            d="M1 2.5l3 3 3-3"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() =>
                        setConfirmDeleteId(isConfirming ? null : chart.id)
                      }
                      disabled={deleting}
                      aria-label={`Delete ${chart.name}`}
                      className={`ml-1 flex h-5 w-5 shrink-0 items-center justify-center transition-colors disabled:opacity-30 ${isConfirming
                          ? "text-ember"
                          : "text-bone-faint hover:text-ember"
                        }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path
                          d="M1.5 3h9M4.5 3V2a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1m1 0l-.5 7a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5L3 3"
                          stroke="currentColor"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Inline confirm row */}
                  {isConfirming && (
                    <div className="flex items-center justify-between border border-t-0 border-ember/40 bg-surface px-3 py-2">
                      <span className="datum text-[0.625rem] text-ember">
                        Delete &ldquo;{chart.name}&rdquo;?
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          disabled={deleting}
                          className="datum rounded border border-rule px-2.5 py-1 text-[0.5625rem] tracking-[0.15em] text-bone-faint uppercase transition-colors hover:text-bone disabled:opacity-40"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(chart.id)}
                          disabled={deleting}
                          className="datum rounded border border-ember px-2.5 py-1 text-[0.5625rem] tracking-[0.15em] text-ember uppercase transition-colors hover:bg-ember hover:text-void disabled:opacity-40"
                        >
                          {deleting ? "Deleting…" : "Confirm"}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {error && (
            <p className="datum mt-4 text-[0.6875rem] text-ember">{error}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-rule px-8 py-5">
          <button
            type="button"
            onClick={onClose}
            className="datum rounded border border-rule px-4 py-2 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:border-rule-faint hover:text-bone"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !dirty}
            className="datum rounded border border-patina-dim px-4 py-2 text-[0.625rem] tracking-[0.18em] text-patina uppercase transition-colors hover:bg-patina-deep disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
