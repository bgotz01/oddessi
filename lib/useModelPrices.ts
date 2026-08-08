'use client';

import { useSyncExternalStore } from 'react';
import type { PriceOverrides } from '@/lib/models';

// A tiny shared store for persisted model state — price overrides and the set
// of soft-removed (hidden) models — fetched once from Postgres (/api/models)
// and cached for the lifetime of the page. Every surface that shows a price or
// lists models subscribes here, so an edit on the Models page — which calls
// setModelPrice() / setModelHidden() — is reflected everywhere without another
// round-trip.

let overrides: PriceOverrides = {};
let hidden: Set<string> = new Set();
let loaded = false;
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function emit() {
    for (const l of listeners) l();
}

type ModelState = { prices?: PriceOverrides; hidden?: string[] };

function ensureFetched() {
    if (loaded || inflight) return;
    inflight = fetch('/api/models')
        .then((r) => (r.ok ? r.json() : {}))
        .then((data: ModelState) => {
            overrides = data?.prices ?? {};
            hidden = new Set(data?.hidden ?? []);
        })
        .catch(() => { /* fall back to code defaults */ })
        .finally(() => { loaded = true; inflight = null; emit(); });
}

/** Merge one model's edited price into the shared cache (call after a save). */
export function setModelPrice(id: string, inputCost: number, outputCost: number) {
    overrides = { ...overrides, [id]: { inputCost, outputCost } };
    emit();
}

/** Flip one model's hidden state in the shared cache (call after a save). */
export function setModelHidden(id: string, isHidden: boolean) {
    const next = new Set(hidden);
    if (isHidden) next.add(id); else next.delete(id);
    hidden = next;
    emit();
}

function subscribe(cb: () => void) {
    listeners.add(cb);
    ensureFetched();
    return () => listeners.delete(cb);
}

function getPrices() {
    return overrides;
}

function getHidden() {
    return hidden;
}

const EMPTY_PRICES: PriceOverrides = {};
const EMPTY_HIDDEN: Set<string> = new Set();

/** Subscribe to the shared price overrides. Empty on the server and until the
 *  first fetch resolves, so callers always fall back to the code defaults. */
export function useModelPrices(): PriceOverrides {
    return useSyncExternalStore(subscribe, getPrices, () => EMPTY_PRICES);
}

/** Subscribe to the shared set of soft-removed model ids. Empty on the server
 *  and until the first fetch resolves. */
export function useHiddenModels(): Set<string> {
    return useSyncExternalStore(subscribe, getHidden, () => EMPTY_HIDDEN);
}
