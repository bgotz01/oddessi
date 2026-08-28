//components/activation-shares.tsx

"use client";

import { useSyncExternalStore } from "react";
import { SHARE_PRESETS, SHARES, type Ingredient, type Shares } from "@/lib/growth";

/**
 * The ingredient weights, editable at runtime.
 *
 * The six shares are the only numbers in the activation model that are argued
 * for rather than derived — directness thirty-five and multiplicity five is a
 * judgement about what makes a period consequential, not a fact about a sky —
 * and the argument is live. Keeping them editable means a disagreement about
 * whether convergence is overweighted can be tested against a real chart in
 * seconds, rather than settled by whoever last edited the constant.
 *
 * The same shape as `scoring-context`: a module-level store read through
 * `useSyncExternalStore`, so every consumer sees one object and the server
 * gets a stable snapshot. Local only, unlike the scoring convention — these
 * are a tuning knob rather than a house convention, and a weight set that
 * followed a user between machines would be a preference the model has no
 * opinion about. If they ever become a shipped convention, they belong beside
 * the scoring presets with a route behind them.
 */

const KEY = "oddessi.activation-shares";

let cache: Shares | null = null;
const listeners = new Set<() => void>();

/** The shipped weights, as a fresh object nothing can mutate in place. */
export function defaultShares(): Shares {
  return { ...SHARES };
}

function valid(stored: Partial<Shares>): Shares {
  const out = defaultShares();
  for (const k of Object.keys(out) as Ingredient[]) {
    const v = stored[k];
    // A stored file older than an ingredient, or corrupted, falls back to the
    // shipped weight for that one rather than scoring it zero.
    if (typeof v === "number" && Number.isFinite(v) && v >= 0) out[k] = v;
  }
  return out;
}

function snapshot(): Shares {
  if (cache) return cache;
  cache = defaultShares();
  if (typeof window === "undefined") return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) cache = valid(JSON.parse(raw) as Partial<Shares>);
  } catch {
    // A corrupt entry is not worth failing the page over.
  }
  return cache;
}

/** The server has no storage and must not guess at what the browser holds. */
function serverSnapshot(): Shares {
  return SHARES;
}

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function write(next: Shares) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private browsing or no storage at all — the session still works.
  }
  listeners.forEach((fn) => fn());
}

export interface SharesStore {
  shares: Shares;
  /** True when the weights have been moved off the shipped set. */
  edited: boolean;
  /** Sum of the six. Shown, because it need not be a hundred. */
  total: number;
  /**
   * Which preset these weights ARE, if any.
   *
   * Matched by value rather than remembered by name, so a set arrived at with
   * the sliders is recognised as the preset it happens to equal, and nudging
   * one slider off a preset drops the label immediately. A remembered id would
   * keep claiming "Rhythm-led" over weights that no longer are.
   */
  presetId: string | null;
  set: (key: Ingredient, value: number) => void;
  apply: (shares: Shares) => void;
  reset: () => void;
}

function same(a: Shares, b: Shares): boolean {
  return (Object.keys(a) as Ingredient[]).every((k) => a[k] === b[k]);
}

export function useActivationShares(): SharesStore {
  const shares = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const keys = Object.keys(SHARES) as Ingredient[];

  return {
    shares,
    edited: keys.some((k) => shares[k] !== SHARES[k]),
    total: keys.reduce((sum, k) => sum + shares[k], 0),
    presetId: SHARE_PRESETS.find((p) => same(p.shares, shares))?.id ?? null,
    set: (key, value) =>
      write({ ...shares, [key]: Math.max(0, Math.round(value)) }),
    apply: (next) => write({ ...next }),
    reset: () => write(defaultShares()),
  };
}
