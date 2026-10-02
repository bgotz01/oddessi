"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/primitives";
import { useModelSettings, type ModelRole } from "@/components/model-settings";
import { MARKETS_PLUTO_ERAS } from "@/lib/industry/markets-pluto-eras-data";
import {
  COLUMN_LABELS,
  INVERSION_COLUMNS,
  type InversionColumn,
  type InversionCritique,
  type InversionResult,
  type InversionRow,
} from "@/lib/industry/markets-pluto-inversion";

type Stage = "invert" | "critique";
// A critique plus the columns whose modification has been applied to its row.
type Flag = InversionCritique & { applied: InversionColumn[] };

const FROM = MARKETS_PLUTO_ERAS.find((e) => e.sign === "Capricorn")!;
const TO = MARKETS_PLUTO_ERAS.find((e) => e.sign === "Aquarius")!;

const LABEL = "datum text-[0.625rem] uppercase tracking-[0.16em]";
async function post<T>(body: { stage: Stage; model: string; rows?: InversionRow[] }, signal: AbortSignal): Promise<T> {
  const res = await fetch("/api/industry/pluto-inversion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? `Request failed (${res.status})`);
  return data as T;
}

const pendingColumns = (flag: Flag) =>
  INVERSION_COLUMNS.filter((col) => flag.modification[col] && !flag.applied.includes(col));

// A strong row with nothing to change is not flagged at all.
const isFlagged = (flag: Flag | undefined): flag is Flag =>
  !!flag && (flag.verdict !== "strong" || Object.keys(flag.modification).length > 0);

function FlagIcon({ filled }: { filled: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M5 21V4m0 0h11l-2 4 2 4H5" />
    </svg>
  );
}

function CritiqueModal({ flag, row, index, onApply, onClose }: {
  flag: Flag; row: InversionRow; index: number;
  onApply: (col: InversionColumn) => void; onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const columns = INVERSION_COLUMNS.filter((col) => flag.modification[col]);

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-void/70" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="critique-modal-title"
        className="fixed inset-0 z-[70] m-auto flex h-fit max-h-[calc(100dvh-6rem)] w-[min(720px,calc(100vw-2rem))] flex-col border border-rule bg-surface"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-rule px-6 py-4">
          <div>
            <p className={`${LABEL} text-ember`}>Critique · Row {index + 1} · {flag.verdict}</p>
            <h3 id="critique-modal-title" className="mt-1.5 text-xl leading-snug text-bone">{flag.objection}</h3>
          </div>
          <button onClick={onClose} className="datum text-[1rem] leading-none text-bone-faint transition-colors hover:text-bone" aria-label="Close">×</button>
        </div>

        <div className="min-h-0 overflow-y-auto px-6 py-5">
          {flag.explanation && <p className="text-[1.0625rem] leading-relaxed text-bone-soft">{flag.explanation}</p>}

          {columns.length === 0 ? (
            <p className="mt-5 text-[0.9375rem] text-bone-faint">No modification proposed.</p>
          ) : (
            <ul className="mt-5 space-y-3">
              {columns.map((col) => {
                const applied = flag.applied.includes(col);
                return (
                  <li key={col} className="border border-rule bg-surface-alt/40 px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className={`${LABEL} text-bone-faint`}>{COLUMN_LABELS[col]}</span>
                      <button
                        type="button"
                        onClick={() => onApply(col)}
                        disabled={applied}
                        className={`${LABEL} border px-2.5 py-1 transition-colors ${applied ? "border-rule text-bone-faint" : "border-patina text-patina hover:bg-patina/10"}`}
                      >
                        {applied ? "Applied" : "Apply"}
                      </button>
                    </div>
                    {/* After applying, the row already holds the new text; the old is gone. */}
                    {!applied && (
                      <div className="mt-2">
                        <p className={`${LABEL} text-bone-faint`}>Current</p>
                        <p className="mt-0.5 text-[1.0625rem] leading-snug text-bone-soft">{row[col]}</p>
                      </div>
                    )}
                    <div className="mt-2">
                      <p className={`${LABEL} text-patina`}>{applied ? "Now" : "Proposed"}</p>
                      <p className="mt-0.5 text-[1.0625rem] leading-snug text-bone">{flag.modification[col]}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default function MarketsPlutoInversion() {
  // Chosen from the gear in the navbar.
  const { models } = useModelSettings();
  const [rows, setRows] = useState<InversionRow[]>([]);
  const [predictions, setPredictions] = useState<string[]>([]);
  const [flags, setFlags] = useState<Record<number, Flag>>({});
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [busy, setBusy] = useState<Stage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function run<T>(stage: Stage, current?: InversionRow[]): Promise<T | null> {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setBusy(stage);
    setError(null);
    try {
      const role: ModelRole = stage === "invert" ? "generate" : "critique";
      return await post<T>({ stage, model: models[role], rows: current }, controller.signal);
    } catch (err) {
      if (!(err instanceof Error && err.name === "AbortError")) {
        setError(`${stage === "invert" ? "Inversion" : "Critique"} failed: ${err instanceof Error ? err.message : "request failed"}`);
      }
      return null;
    } finally {
      if (abortRef.current === controller) setBusy(null);
    }
  }

  async function critique(current: InversionRow[]) {
    setFlags({});
    const result = await run<{ critiques: InversionCritique[] }>("critique", current);
    if (!result) return;
    setFlags(Object.fromEntries(result.critiques.map((c) => [c.row, { ...c, applied: [] }])));
  }

  // The critique is its own step, run on demand against the rows as they
  // stand, including any modifications already applied.
  async function invert() {
    setFlags({});
    setOpenRow(null);
    const result = await run<InversionResult>("invert");
    if (!result) return;
    setRows(result.rows);
    setPredictions(result.predictions);
  }

  function apply(index: number, col: InversionColumn) {
    const flag = flags[index];
    const text = flag?.modification[col];
    if (!text) return;
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [col]: text } : row)));
    setFlags((prev) => ({ ...prev, [index]: { ...flag, applied: [...flag.applied, col] } }));
  }

  const open = openRow !== null && isFlagged(flags[openRow]) ? flags[openRow] : null;

  return (
    <section aria-labelledby="pluto-inversion" className="mt-16">
      <SectionHeading>
        <span id="pluto-inversion">The Pluto Inversion</span>
      </SectionHeading>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-[1.0625rem] leading-snug text-bone-soft">
          <span style={{ color: FROM.color }}><span className="glyph" aria-hidden="true">{FROM.symbol}</span> {FROM.archetype}</span>
          <span className="mx-2 text-bone-faint" aria-hidden="true">→</span>
          <span style={{ color: TO.color }}><span className="glyph" aria-hidden="true">{TO.symbol}</span> {TO.archetype}</span>
          <span className="ml-3 text-bone-faint">Capricorn’s defining traits, turned over into Aquarius</span>
        </p>
        <div className="flex items-center gap-2">
          {busy && (
            <span className={`${LABEL} flex items-center gap-2 ${busy === "invert" ? "text-patina" : "text-ember"}`} aria-live="polite">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" aria-hidden="true" />
              {busy === "invert" ? "Inverting…" : "Critiquing…"}
            </span>
          )}
          <button
            type="button"
            onClick={invert}
            disabled={busy !== null}
            className={`${LABEL} border border-patina px-3 py-1.5 text-patina transition-colors hover:bg-patina/10 disabled:opacity-40`}
          >
            {rows.length ? "Invert again" : "Invert"}
          </button>
          <button
            type="button"
            onClick={() => critique(rows)}
            disabled={busy !== null || rows.length === 0}
            className={`${LABEL} border border-ember-dim px-3 py-1.5 text-ember transition-colors hover:bg-ember/10 disabled:opacity-40`}
          >
            Critique
          </button>
        </div>
      </div>

      {error && <p className="mt-4 text-[0.9375rem] text-ember">{error}</p>}

      <div className="mt-6 border-t-2 border-patina bg-surface-alt/40 px-5 py-5">
        <p className={`${LABEL} text-patina`}>Inversion · Hypothesis</p>
        {rows.length === 0 ? (
          <p className="mt-4 text-[0.9375rem] text-bone-faint">
            {busy === "invert" ? "…" : "Run the inversion to generate Capricorn → Aquarius pairs, then critique it on a separate model."}
          </p>
        ) : (
          <>
            <div role="region" aria-label="Capricorn to Aquarius inversion" tabIndex={0} className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr>
                    {INVERSION_COLUMNS.map((col) => (
                      <th key={col} scope="col" className={`${LABEL} border-b border-rule pb-2 pr-4 font-normal text-bone-faint`}>{COLUMN_LABELS[col]}</th>
                    ))}
                    <th scope="col" className="w-10 border-b border-rule pb-2"><span className="sr-only">Critique</span></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => {
                    const flag = flags[i];
                    const flagged = isFlagged(flag);
                    const resolved = flagged && pendingColumns(flag).length === 0 && flag.applied.length > 0;
                    return (
                      <tr key={i} className="border-b border-rule-faint align-baseline">
                        <td className="py-3 pr-4 text-[1.0625rem] leading-snug" style={{ color: FROM.color }}>{row.capricorn}</td>
                        <td className="py-3 pr-4 text-[1.0625rem] leading-snug text-bone">{row.aquarius}</td>
                        <td className="py-3 pr-4 text-[0.9375rem] leading-snug text-bone-soft">{row.why}</td>
                        <td className="py-3 text-right">
                          {flagged && (
                            <button
                              type="button"
                              onClick={() => setOpenRow(i)}
                              aria-haspopup="dialog"
                              aria-label={`Critique of row ${i + 1}: ${flag.verdict}${resolved ? ", modifications applied" : ""}`}
                              title={flag.objection}
                              className={`inline-grid h-7 w-7 place-items-center transition-colors ${resolved ? "text-bone-faint hover:text-bone" : "text-ember hover:bg-ember/10"}`}
                            >
                              <FlagIcon filled={!resolved && flag.verdict === "unconvincing"} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {predictions.length > 0 && (
              <div className="mt-6">
                <p className={`${LABEL} text-bone-faint`}>What the inversion predicts</p>
                <ul className="mt-2 space-y-1.5 text-[1.0625rem] leading-snug text-bone-soft">
                  {predictions.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 bg-patina" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      {open && openRow !== null && (
        <CritiqueModal
          flag={open}
          row={rows[openRow]}
          index={openRow}
          onApply={(col) => apply(openRow, col)}
          onClose={() => setOpenRow(null)}
        />
      )}
    </section>
  );
}
