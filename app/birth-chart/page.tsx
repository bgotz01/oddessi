"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionHeading } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import NewChartForm from "@/components/new-chart-form";
import ChartManageModal from "@/components/ChartManageModal";
import { BODY_GLYPH, signGlyph } from "@/lib/symbols";

// ── inline editable field ─────────────────────────────────────────────────────

function EditableField({
  label,
  value,
  inputType = "text",
  onSave,
  saving,
}: {
  label: string;
  value: string;
  inputType?: "text" | "date" | "time";
  onSave: (next: string) => Promise<void>;
  saving: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep draft in sync when chart refreshes
  useEffect(() => { if (!editing) setDraft(value); }, [value, editing]);

  function startEdit() {
    setDraft(value);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  async function commit() {
    setEditing(false);
    if (draft !== value) await onSave(draft);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); commit(); }
    if (e.key === "Escape") { setEditing(false); setDraft(value); }
  }

  return (
    <div className="flex flex-col gap-1 py-4">
      <span className="eyebrow">{label}</span>
      {editing ? (
        <input
          ref={inputRef}
          type={inputType}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={onKeyDown}
          disabled={saving}
          className="datum w-full border-b border-patina bg-transparent pb-0.5 text-[0.8125rem] text-bone outline-none disabled:opacity-50"
        />
      ) : (
        <button
          type="button"
          onClick={startEdit}
          className="datum group flex items-center gap-1.5 text-left text-[0.8125rem] text-bone"
        >
          <span>{value || <span className="text-bone-faint">—</span>}</span>
          <svg
            width="10" height="10" viewBox="0 0 10 10" fill="none"
            aria-hidden="true"
            className="shrink-0 text-bone-faint opacity-0 transition-opacity group-hover:opacity-100"
          >
            <path d="M1 7.5L6.5 2 8 3.5 2.5 9H1V7.5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────

export default function BirthChartPage() {
  const { chart, charts, selectChart, reorderCharts } = useChart();
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [recalculating, setRecalculating] = useState(false);
  const [recalcDone, setRecalcDone] = useState(false);
  const [showNewChart, setShowNewChart] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [saving, setSaving] = useState(false);

  async function patch(fields: Record<string, string | null>) {
    if (!chart) return;
    setSaving(true);
    try {
      const res = await fetch("/api/birth-chart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chartId: chart.id, ...fields }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Update failed");
      }
      router.refresh();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleRecalculate() {
    if (!chart) return;
    setRecalculating(true);
    setRecalcDone(false);
    try {
      const res = await fetch("/api/birth-chart/recache", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chartId: chart.id }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Recalculation failed");
      }
      setRecalcDone(true);
      setTimeout(() => setRecalcDone(false), 4000);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Recalculation failed");
    } finally {
      setRecalculating(false);
    }
  }

  async function handleDelete() {
    if (!chart) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/birth-chart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chartId: chart.id }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Deletion failed");
      }
      const remaining = charts.filter((c) => c.id !== chart.id);
      if (remaining.length > 0) selectChart(remaining[0].id);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Deletion failed");
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  if (!chart) {
    return (
      <div className="mx-auto w-full max-w-6xl px-8">
        <div className="flex items-start justify-between pt-16 pb-12">
          <div>
            <p className="eyebrow mb-4">Birth Chart</p>
            <h1 className="inscription text-[2rem] leading-tight text-bone">No chart selected</h1>
          </div>
          <div className="mt-1 flex items-center gap-2">
            {charts.length > 1 && (
              <button onClick={() => setShowManage(true)} className="datum rounded border border-rule px-4 py-2 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:border-rule-faint hover:text-bone">
                Manage Charts
              </button>
            )}
            <button onClick={() => setShowNewChart(true)} className="datum rounded border border-patina-dim px-4 py-2 text-[0.625rem] tracking-[0.18em] text-patina uppercase transition-colors hover:bg-patina-deep">
              Add New Chart
            </button>
          </div>
        </div>
        {showNewChart && <NewChartModal onClose={() => setShowNewChart(false)} />}
        {showManage && <ChartManageModal charts={charts} onClose={() => setShowManage(false)} onReorder={reorderCharts} />}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      {/* Header */}
      <div className="flex items-start justify-between pt-16 pb-12">
        <div>
          <p className="eyebrow mb-4">Birth Chart</p>
          <h1 className="inscription text-[2rem] leading-tight text-bone">{chart.name}</h1>
          <div className="mt-6 h-px w-full bg-patina-dim" />
        </div>
        <div className="mt-1 flex items-center gap-2">
          {charts.length > 1 && (
            <button onClick={() => setShowManage(true)} className="datum rounded border border-rule px-4 py-2 text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:border-rule-faint hover:text-bone">
              Manage Charts
            </button>
          )}
          <button onClick={() => setShowNewChart(true)} className="datum rounded border border-patina-dim px-4 py-2 text-[0.625rem] tracking-[0.18em] text-patina uppercase transition-colors hover:bg-patina-deep">
            Add New Chart
          </button>
        </div>
      </div>

      {/* The Moment */}
      <section className="mb-16">
        <SectionHeading>The Moment</SectionHeading>

        {/* Single row of fields separated by dividers */}
        <div className="flex flex-wrap items-start divide-x divide-rule border-t border-b border-rule">
          <div className="min-w-[8rem] flex-1 px-6">
            <EditableField
              label="Name"
              value={chart.name}
              onSave={(v) => patch({ name: v })}
              saving={saving}
            />
          </div>
          <div className="min-w-[9rem] flex-1 px-6">
            <EditableField
              label="Date"
              value={chart.birth.date}
              inputType="date"
              onSave={(v) => patch({ birthDate: v })}
              saving={saving}
            />
          </div>
          <div className="min-w-[7rem] flex-1 px-6">
            <EditableField
              label="Time"
              value={chart.birth.time}
              inputType="time"
              onSave={(v) => patch({ birthTime: v })}
              saving={saving}
            />
          </div>
          <div className="min-w-[9rem] flex-1 px-6">
            <EditableField
              label="City"
              value={chart.birth.city}
              onSave={(v) => patch({ birthCity: v })}
              saving={saving}
            />
          </div>
          <div className="min-w-[10rem] flex-1 px-6">
            <EditableField
              label="Timezone"
              value={chart.birth.timezone}
              onSave={(v) => patch({ birthTimezone: v })}
              saving={saving}
            />
          </div>
          <div className="min-w-[8rem] flex-1 px-6 py-4">
            <span className="eyebrow mb-1 block">Gender</span>
            <select
              value={chart.gender ?? ""}
              disabled={saving}
              onChange={(e) => patch({ gender: e.target.value || null })}
              className="datum w-full border-b border-rule bg-transparent pb-0.5 text-[0.8125rem] text-bone outline-none transition-colors hover:border-rule-faint focus:border-patina disabled:opacity-50"
            >
              <option value="">—</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Coordinates + actions row */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="datum text-[0.625rem] text-bone-faint">
              {chart.birth.latitude.toFixed(4)}, {chart.birth.longitude.toFixed(4)}
            </p>
            {chart.birth.city &&
              chart.birth.location !== chart.birth.city &&
              !chart.birth.location.startsWith(chart.birth.city) && (
                <p className="datum text-[0.625rem] text-bone-faint opacity-60">{chart.birth.location}</p>
              )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRecalculate}
              disabled={recalculating || deleting}
              className="datum rounded border border-rule px-3 py-1 text-[0.625rem] text-bone-faint transition-colors hover:border-rule-faint hover:text-bone disabled:opacity-50"
            >
              {recalculating ? "Recalculating…" : recalcDone ? "Done ✓" : "Recalculate cycles"}
            </button>
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="datum text-[0.625rem] text-ember">Delete &ldquo;{chart.name}&rdquo;?</span>
                <button onClick={handleDelete} disabled={deleting} className="datum rounded border border-ember px-3 py-1 text-[0.625rem] text-ember transition-colors hover:bg-ember hover:text-void disabled:opacity-50">
                  {deleting ? "Deleting…" : "Confirm"}
                </button>
                <button onClick={() => setConfirmDelete(false)} disabled={deleting} className="datum rounded border border-rule px-3 py-1 text-[0.625rem] text-bone-faint transition-colors hover:border-rule-faint hover:text-bone disabled:opacity-50">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setConfirmDelete(true)} disabled={recalculating} className="datum rounded border border-rule px-3 py-1 text-[0.625rem] text-bone-faint transition-colors hover:border-ember hover:text-ember disabled:opacity-50">
                Delete chart
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Placements */}
      <section className="mb-16">
        <SectionHeading aside={`${chart.placements.length} placements`}>Placements</SectionHeading>
        <div className="border-t border-rule">
          {chart.placements.map((p) => (
            <div
              key={p.body}
              className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-4 border-b border-rule-faint py-3 md:grid-cols-[2rem_10rem_1fr_6rem_4rem]"
            >
              <span className={`glyph text-lg ${p.isAngle ? "text-ember" : "text-patina"}`}>
                {BODY_GLYPH[p.body] ?? "·"}
              </span>
              <span className="inscription text-[0.6875rem] text-bone">{p.body}</span>
              <span className="hidden md:block">
                <span className="glyph mr-2 text-bone-faint">{signGlyph(p.sign)}</span>
                <span className="text-[0.9375rem] font-light italic text-bone-soft">{p.sign}</span>
              </span>
              <span className="datum text-[0.75rem] text-bone-faint md:text-right">{p.degree}</span>
              <span className="datum hidden text-[0.75rem] text-bone-faint md:block md:text-right">{p.house}</span>
            </div>
          ))}
        </div>
      </section>

      {showNewChart && <NewChartModal onClose={() => setShowNewChart(false)} />}
      {showManage && <ChartManageModal charts={charts} onClose={() => setShowManage(false)} onReorder={reorderCharts} />}
    </div>
  );
}

function NewChartModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-void/80 px-4 pt-24 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl border border-rule bg-void shadow-2xl">
        <div className="flex items-center justify-between border-b border-rule px-8 py-5">
          <h2 className="inscription text-[1rem] text-bone">New Chart</h2>
          <button onClick={onClose} aria-label="Close" className="text-bone-faint transition-colors hover:text-bone">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-8 py-8">
          <NewChartForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}
