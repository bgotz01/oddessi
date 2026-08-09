"use client";

import { useEffect, useState } from "react";

export type Async<T> =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; data: T };

/**
 * Fetch JSON for a url, with the result tagged by the url it came from.
 *
 * Three deliberate details:
 *
 * 1. No `setState` runs synchronously in the effect body — only inside the
 *    promise callbacks. That avoids the cascading re-render that
 *    `react-hooks/set-state-in-effect` warns about, without needing a disable.
 * 2. "Loading" is *derived* by comparing the url the state was fetched for
 *    against the url being asked for now, rather than being set imperatively.
 *    Changing url therefore reads as loading on the very same render, with no
 *    flash of the previous chart's data.
 * 3. Cleanup stops *listening* rather than aborting the request. These are
 *    small read-only GETs, so letting an obsolete one finish and be discarded
 *    costs nothing — and no AbortError is created, which is what the dev
 *    overlay kept surfacing on every remount and navigation.
 */
export function useJson<T>(url: string | null): Async<T> {
  const [state, setState] = useState<{ url: string; value: Async<T> } | null>(
    null,
  );

  useEffect(() => {
    if (!url) return;
    let live = true;

    // Anything that arrives after cleanup belongs to a url nobody is asking
    // for any more, so it is dropped rather than reported.
    const settle = (value: Async<T>) => {
      if (live) setState({ url, value });
    };

    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          settle({
            status: "error",
            error: `Request failed (${response.status}).`,
          });
          return;
        }
        settle({ status: "ready", data: (await response.json()) as T });
      })
      .catch(() => settle({ status: "error", error: "Network error." }));

    return () => {
      live = false;
    };
  }, [url]);

  if (!url || state?.url !== url) return { status: "loading" };
  return state.value;
}
