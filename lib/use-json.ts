"use client";

import { useEffect, useState } from "react";

export type Async<T> =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; data: T };

/**
 * Fetch JSON for a url, with the result tagged by the url it came from.
 *
 * Two deliberate details:
 *
 * 1. No `setState` runs synchronously in the effect body — only inside the
 *    promise callbacks. That avoids the cascading re-render that
 *    `react-hooks/set-state-in-effect` warns about, without needing a disable.
 * 2. "Loading" is *derived* by comparing the url the state was fetched for
 *    against the url being asked for now, rather than being set imperatively.
 *    Changing url therefore reads as loading on the very same render, with no
 *    flash of the previous chart's data.
 */
export function useJson<T>(url: string | null): Async<T> {
  const [state, setState] = useState<{ url: string; value: Async<T> } | null>(
    null,
  );

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          setState({
            url,
            value: { status: "error", error: `Request failed (${response.status}).` },
          });
          return;
        }
        setState({ url, value: { status: "ready", data: (await response.json()) as T } });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setState({ url, value: { status: "error", error: "Network error." } });
      }
    })();

    return () => controller.abort();
  }, [url]);

  if (!url || state?.url !== url) return { status: "loading" };
  return state.value;
}
