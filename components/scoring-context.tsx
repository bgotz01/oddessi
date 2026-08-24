//components/scoring-context.tsx
"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  DEFAULT_SCORING,
  PRESETS,
  copyScoring,
  matchesPreset,
  presetById,
  type ScoringConfig,
} from "@/lib/scoring";

/**
 * The active scoring convention.
 *
 * The house scores are the only numbers in the app that are argued for rather
 * than read off an ephemeris, and the arguments are live — whether a malefic
 * sitting in a house should count at all was an open question until a reading
 * settled it. Keeping the constants editable at runtime means a disagreement
 * can be tested against a chart in seconds instead of being settled by whoever
 * last edited the file.
 *
 * The database is the source of truth, so a convention settled on one machine
 * is the one every machine reads by. localStorage is kept purely as an
 * instant-paint cache: without it the first render of a page uses the shipped
 * defaults and every score visibly jumps when the fetch lands.
 *
 * A module-level store rather than a context: the config is genuinely global,
 * every reader wants the same object, and `useSyncExternalStore` gives the
 * server a stable snapshot without hydrating mid-render.
 */

const KEY = "oddessi.scoring";
const SAVE_DEBOUNCE_MS = 700;

let cache: ScoringConfig | null = null;
let loaded = false;
let saveTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<() => void>();

/**
 * Rebuild a stored config over the preset it names, so anything persisted
 * before a component existed comes back whole rather than scoring zero for it.
 */
function reconcile(stored: Partial<ScoringConfig>): ScoringConfig {
  const base = presetById(stored.id ?? "") ?? DEFAULT_SCORING;
  return {
    ...copyScoring(base),
    ...stored,
    weight: { ...base.weight, ...(stored.weight ?? {}) },
    ease: { ...base.ease, ...(stored.ease ?? {}) },
  };
}

/** Read once, then serve the same object so snapshots stay identity-stable. */
function snapshot(): ScoringConfig {
  if (cache) return cache;
  cache = DEFAULT_SCORING;
  if (typeof window === "undefined") return cache;

  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) cache = reconcile(JSON.parse(raw) as Partial<ScoringConfig>);
  } catch {
    // A corrupt entry is not worth failing the page over.
  }
  return cache;
}

/** The server has no storage, and must not guess at what the browser holds. */
function serverSnapshot(): ScoringConfig {
  return DEFAULT_SCORING;
}

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  listeners.forEach((fn) => fn());
}

function cacheLocally(config: ScoringConfig) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(config));
  } catch {
    // Private browsing, quota, or no storage at all — the session still works.
  }
}

/**
 * Pull the stored convention once per page load.
 *
 * A failure here is deliberately silent and leaves whatever is cached in place:
 * the app is fully usable on the shipped defaults, and blocking a chart on a
 * preferences fetch would be the wrong trade.
 */
async function load() {
  if (loaded) return;
  loaded = true;
  try {
    const res = await fetch("/api/scoring");
    if (!res.ok) return;
    const config = reconcile((await res.json()) as Partial<ScoringConfig>);
    if (JSON.stringify(config) === JSON.stringify(snapshot())) return;
    cache = config;
    cacheLocally(config);
    emit();
  } catch {
    // Offline or the route is unreachable — the cached copy still stands.
  }
}

/**
 * Optimistic: the UI moves immediately and the write follows.
 *
 * Debounced because the editor holds sixty-odd number fields and fires on every
 * keystroke; a PUT per character would be a lot of writes for one decision.
 */
function write(next: ScoringConfig) {
  cache = next;
  cacheLocally(next);
  emit();

  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveTimer = null;
    void fetch("/api/scoring", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    }).catch(() => {
      // Kept locally regardless; the next successful save carries it up.
    });
  }, SAVE_DEBOUNCE_MS);
}

export interface ScoringStore {
  config: ScoringConfig;
  /** The preset it started from, whether or not it still matches. */
  preset: ScoringConfig | undefined;
  /** True when values have been hand-edited away from that preset. */
  edited: boolean;
  applyPreset: (id: string) => void;
  /** Replace the whole config — the editor hands back a mutated copy. */
  update: (next: ScoringConfig) => void;
  reset: () => void;
}

export function useScoring(): ScoringStore {
  const config = useSyncExternalStore(subscribe, snapshot, serverSnapshot);

  // Not setState — this updates the external store, which is what an effect is
  // for. Guarded by `loaded`, so the fetch happens once however many components
  // read the config.
  useEffect(() => {
    void load();
  }, []);

  return {
    config,
    preset: presetById(config.id),
    edited: !matchesPreset(config),
    applyPreset: (id) => {
      const preset = presetById(id);
      if (preset) write(copyScoring(preset));
    },
    update: write,
    reset: () => write(copyScoring(presetById(config.id) ?? DEFAULT_SCORING)),
  };
}

export { PRESETS };
