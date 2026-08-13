"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Chart } from "@/lib/charts";

/**
 * Layout-level context for the chart currently under study.
 *
 * Charts are fetched by the server layout and handed down, so there is no
 * client-side loading state. The only client-owned value is *which* chart is
 * selected, which lives in localStorage and is read through
 * `useSyncExternalStore` — the idiomatic way to subscribe to something outside
 * React, and it avoids the cascading render of a load-in-an-effect.
 *
 * The server snapshot is deliberately null so SSR renders the default chart;
 * React then re-reads the client snapshot on hydration.
 */

const STORAGE_KEY = "oddessi:selectedChartId";

let listeners: Array<() => void> = [];

const selection = {
  subscribe(onChange: () => void) {
    listeners.push(onChange);
    // Keep other tabs in step.
    window.addEventListener("storage", onChange);
    return () => {
      listeners = listeners.filter((l) => l !== onChange);
      window.removeEventListener("storage", onChange);
    };
  },
  get(): string | null {
    return window.localStorage.getItem(STORAGE_KEY);
  },
  getOnServer(): string | null {
    return null;
  },
  set(id: string) {
    window.localStorage.setItem(STORAGE_KEY, id);
    listeners.forEach((l) => l());
  },
};

interface ChartContextValue {
  /** The chart currently under study. Null only when no charts exist at all. */
  chart: Chart | null;
  charts: Chart[];
  selectChart: (id: string) => void;
  /** Optimistically reorder charts (e.g. after saving a new sort order). */
  reorderCharts: (ordered: Chart[]) => void;
}

const ChartContext = createContext<ChartContextValue | undefined>(undefined);

export function ChartProvider({
  charts: initialCharts,
  children,
}: {
  charts: Chart[];
  children: ReactNode;
}) {
  const [charts, setCharts] = useState<Chart[]>(initialCharts);

  const savedId = useSyncExternalStore(
    selection.subscribe,
    selection.get,
    selection.getOnServer,
  );

  // Saved selection, else the chart marked default, else the first one.
  const chart =
    charts.find((c) => c.id === savedId) ??
    charts.find((c) => c.isDefault) ??
    charts[0] ??
    null;

  const selectChart = useCallback((id: string) => selection.set(id), []);
  const reorderCharts = useCallback((ordered: Chart[]) => setCharts(ordered), []);

  return (
    <ChartContext.Provider value={{ chart, charts, selectChart, reorderCharts }}>
      {children}
    </ChartContext.Provider>
  );
}

export function useChart(): ChartContextValue {
  const ctx = useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used inside <ChartProvider>");
  return ctx;
}
