"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageTitle, SectionHeading } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import NewChartForm from "@/components/new-chart-form";
import { formatBirth } from "@/lib/charts";
import { BODY_GLYPH, signGlyph } from "@/lib/symbols";

export default function BirthChartPage() {
  const { chart, charts, selectChart } = useChart();
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [recalculating, setRecalculating] = useState(false);
  const [recalcDone, setRecalcDone] = useState(false);
  const [showNewChart, setShowNewChart] = useState(false);

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
            <h1 className="inscription text-[2rem] leading-tight text-bone">
              No chart selected
            </h1>
          </div>
          <button
            onClick={() => setShowNewChart(true)}
            className="datum mt-1 rounded border border-patina-dim px-4 py-2 text-[0.625rem] tracking-[0.18em] text-patina uppercase transition-colors hover:bg-patina-deep"
          >
            Add New Chart
          </button>
        </div>
        {showNewChart && (
          <NewChartModal onClose={() => setShowNewChart(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      {/* Page header with chart name + Add New Chart */}
      <div className="flex items-start justify-between pt-16 pb-12">
        <div>
          <p className="eyebrow mb-4">Birth Chart</p>
          <h1 className="inscription text-[2rem] leading-tight text-bone">
            {chart.name}
          </h1>
          <div className="mt-6 h-px w-full bg-patina-dim" />
        </div>
        <button
          onClick={() => setShowNewChart(true)}
          className="datum mt-1 rounded border border-patina-dim px-4 py-2 text-[0.625rem] tracking-[0.18em] text-patina uppercase transition-colors hover:bg-patina-deep"
        >
          Add New Chart
        </button>
      </div>

      <section className="mb-16">
        <SectionHeading>The Moment</SectionHeading>
        <dl className="grid gap-px bg-rule sm:grid-cols-3">
          {[
            { label: "Born", value: formatBirth(chart.birth) },
            { label: "City", value: chart.birth.city },
            { label: "Zone", value: chart.birth.timezone },
          ].map((f) => (
            <div key={f.label} className="bg-void p-6">
              <dt className="eyebrow">{f.label}</dt>
              <dd className="datum mt-2 text-[0.8125rem] text-bone">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="datum text-[0.625rem] text-bone-faint">
              {chart.birth.latitude.toFixed(4)}, {chart.birth.longitude.toFixed(4)}
            </p>
            {chart.birth.city &&
              chart.birth.location !== chart.birth.city &&
              !chart.birth.location.startsWith(chart.birth.city) && (
                <p className="datum text-[0.625rem] text-bone-faint opacity-60">
                  {chart.birth.location}
                </p>
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
                <span className="datum text-[0.625rem] text-ember">
                  Delete &ldquo;{chart.name}&rdquo;?
                </span>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="datum rounded border border-ember px-3 py-1 text-[0.625rem] text-ember transition-colors hover:bg-ember hover:text-void disabled:opacity-50"
                >
                  {deleting ? "Deleting…" : "Confirm"}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  disabled={deleting}
                  className="datum rounded border border-rule px-3 py-1 text-[0.625rem] text-bone-faint transition-colors hover:border-rule-faint hover:text-bone disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                disabled={recalculating}
                className="datum rounded border border-rule px-3 py-1 text-[0.625rem] text-bone-faint transition-colors hover:border-ember hover:text-ember disabled:opacity-50"
              >
                Delete chart
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mb-16">
        <SectionHeading aside={`${chart.placements.length} placements`}>
          Placements
        </SectionHeading>
        <div className="border-t border-rule">
          {chart.placements.map((p) => (
            <div
              key={p.body}
              className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-4 border-b border-rule-faint py-3 md:grid-cols-[2rem_10rem_1fr_6rem_4rem]"
            >
              <span
                className={`glyph text-lg ${p.isAngle ? "text-ember" : "text-patina"}`}
              >
                {BODY_GLYPH[p.body] ?? "·"}
              </span>
              <span className="inscription text-[0.6875rem] text-bone">
                {p.body}
              </span>
              <span className="hidden md:block">
                <span className="glyph mr-2 text-bone-faint">
                  {signGlyph(p.sign)}
                </span>
                <span className="text-[0.9375rem] font-light italic text-bone-soft">
                  {p.sign}
                </span>
              </span>
              <span className="datum text-[0.75rem] text-bone-faint md:text-right">
                {p.degree}
              </span>
              <span className="datum hidden text-[0.75rem] text-bone-faint md:block md:text-right">
                {p.house}
              </span>
            </div>
          ))}
        </div>
      </section>

      {showNewChart && (
        <NewChartModal onClose={() => setShowNewChart(false)} />
      )}
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
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-rule px-8 py-5">
          <h2 className="inscription text-[1rem] text-bone">New Chart</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-bone-faint transition-colors hover:text-bone"
          >
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
