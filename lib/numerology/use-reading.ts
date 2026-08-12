"use client";

import { useMemo, useState } from "react";
import { UNTITLED_CHART, type Chart } from "@/lib/charts";
import {
  birthDateFromISO,
  computeReading,
  type NumerologyReading,
} from "@/lib/numerology/numbers";

/**
 * The reading for the selected chart, computed in the browser.
 *
 * Every other system here goes through an API route, and for good reason: the
 * Western pages need the ephemeris and the cache, and the four pillars need the
 * solar terms. Numerology needs neither. It is addition over two fields the
 * chart context is already holding, so a route would add a round trip, a
 * loading state and a second copy of the input parsing in exchange for nothing.
 *
 * Two guards worth knowing about:
 *
 * `UNTITLED_CHART` is treated as no name at all. It is two ordinary words and
 * would otherwise reduce like any other, producing an Expression, a Soul Urge
 * and a Personality for a chart whose name nobody ever entered.
 *
 * `now` is pinned on mount rather than read at render. Which personal year is
 * running and which pinnacle is in force are not going to change while the page
 * is open, and a pure render has no business asking the clock twice.
 */
export function useNumerologyReading(
  chart: Chart | null,
): NumerologyReading | null {
  const [now] = useState(() => new Date());

  return useMemo(() => {
    if (!chart) return null;
    const birth = birthDateFromISO(chart.birth.date);
    if (!birth) return null;

    return computeReading(
      { name: chart.name === UNTITLED_CHART ? "" : chart.name, birth },
      now,
    );
  }, [chart, now]);
}
