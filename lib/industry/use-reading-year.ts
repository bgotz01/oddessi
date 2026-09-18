"use client";

import { useSyncExternalStore } from "react";

/**
 * The reading's clock, taken once when the bundle loads.
 *
 * Read during render it would be one value on the server and another in the
 * browser, and anything positioned off it — which era is running, which is
 * still ahead — would flip between the two renders. A constant plus a null
 * server snapshot gets the hydration-safe behaviour for free: the first render
 * knows of no reader position at all, and the year swaps in once it is the
 * browser's to give.
 *
 * Year-granular, because that is the granularity the era tables are written
 * at. The dual-cycle chart keeps its own fractional-year clock: it positions a
 * mark in pixels on an 84-year axis, where January and December are visibly
 * different places, and this hook would snap that mark to the year boundary.
 */
const CLIENT_YEAR = new Date().getFullYear();
const SERVER_SNAPSHOT = () => null;
const CLIENT_SNAPSHOT = () => CLIENT_YEAR;
/** Nothing to subscribe to: the value is fixed for the life of the page. */
const NEVER_CHANGES = () => () => {};

export function useReadingYear(): number | null {
  return useSyncExternalStore(NEVER_CHANGES, CLIENT_SNAPSHOT, SERVER_SNAPSHOT);
}
