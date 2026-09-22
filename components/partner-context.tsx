"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useChart } from "@/components/chart-context";
import type { Chart } from "@/lib/charts";

/**
 * The second chart — the only thing in the app that needs one.
 *
 * Every other page reads "the chart under study" out of `ChartProvider` and
 * that is the whole of its state. Compatibility needs a second selection, and
 * it deliberately does NOT extend the chart context to hold a pair: the rail's
 * selector means "the person this app is about" on twenty other pages, and
 * making it sometimes mean "the first of two" would change what the control
 * does depending on where the reader happens to be standing.
 *
 * So this is a separate, page-local selection, stored under its own key with
 * the same `useSyncExternalStore` pattern the chart selection uses — which
 * keeps it out of React's render cycle, survives a reload, and stays in step
 * across tabs. The subject is always whatever the rail has selected; only the
 * partner lives here.
 */

const STORAGE_KEY = "oddessi:partnerChartId";

let listeners: Array<() => void> = [];

const selection = {
  subscribe(onChange: () => void) {
    listeners.push(onChange);
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

interface PartnerContextValue {
  /** The second chart. Null until one is chosen, or when only one chart exists. */
  partner: Chart | null;
  /** Every chart that could be the partner — all of them but the subject. */
  candidates: Chart[];
  selectPartner: (id: string) => void;
}

const PartnerContext = createContext<PartnerContextValue | undefined>(undefined);

export function PartnerProvider({ children }: { children: ReactNode }) {
  const { chart, charts } = useChart();
  const savedId = useSyncExternalStore(
    selection.subscribe,
    selection.get,
    selection.getOnServer,
  );

  const candidates = charts.filter((c) => c.id !== chart?.id);

  /**
   * No fallback to "the first other chart". A compatibility reading that
   * silently picks somebody is worse than one that asks: the reader would have
   * to notice the name at the top before realising the page is about a pairing
   * they did not choose, and the numbers look exactly as authoritative either
   * way. Null until asked.
   */
  const partner = candidates.find((c) => c.id === savedId) ?? null;

  const selectPartner = useCallback((id: string) => selection.set(id), []);

  return (
    <PartnerContext.Provider value={{ partner, candidates, selectPartner }}>
      {children}
    </PartnerContext.Provider>
  );
}

export function usePartner(): PartnerContextValue {
  const ctx = useContext(PartnerContext);
  if (!ctx) throw new Error("usePartner must be used inside <PartnerProvider>");
  return ctx;
}
