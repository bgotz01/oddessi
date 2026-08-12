"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useChart } from "@/components/chart-context";

interface Place {
  label: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

const FIELD =
  "w-full border border-rule bg-surface px-3 py-2.5 text-[0.875rem] text-bone outline-none transition-colors focus:border-patina";

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      {children}
      {hint ? (
        <span className="datum mt-1.5 block text-[0.625rem] text-bone-faint">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export default function NewChartForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const router = useRouter();
  const { selectChart } = useChart();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [query, setQuery] = useState("");
  const [place, setPlace] = useState<Place | null>(null);
  const [results, setResults] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  // Debounced location search. All state updates happen inside async callbacks,
  // never synchronously in the effect body.
  useEffect(() => {
    if (query.trim().length < 3 || place?.label === query) return;

    const controller = new AbortController();
    let fetchStarted = false;

    const timer = setTimeout(() => {
      fetchStarted = true;
      setSearching(true);
      fetch(`/api/geocode?q=${encodeURIComponent(query)}`, {
        signal: controller.signal,
      })
        .then((r) => (r.ok ? r.json() : { results: [] }))
        .then((json: { results?: Place[] }) => setResults(json.results ?? []))
        .catch(() => { })
        .finally(() => setSearching(false));
    }, 400);

    return () => {
      clearTimeout(timer);
      if (fetchStarted) controller.abort();
    };
  }, [query, place]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setDone(null);

    if (!date || !time || !place) {
      setError("Date, time and birthplace are all required.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/birth-chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          birthData: {
            date,
            time,
            timezone: place.timezone,
            latitude: place.latitude,
            longitude: place.longitude,
            city: place.city,
            location: place.label,
          },
        }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        setError(json.error ?? "Could not create the chart.");
        return;
      }

      setDone(
        `${json.name} — ☉ ${json.summary.sunSign} · ☽ ${json.summary.moonSign} · ↑ ${json.summary.risingSign}` +
        (json.cyclesCached ? "" : " (cycles could not be cached)"),
      );

      // Make the new chart the one under study, then re-read the server layout
      // so it appears in the rail.
      selectChart(json.chartId);
      setName("");
      setDate("");
      setTime("");
      setQuery("");
      setPlace(null);
      setResults([]);
      router.refresh();
      onSuccess?.();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="border border-rule p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name">
          <input
            className={FIELD}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Whose chart is this?"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Date">
            <input
              type="date"
              className={FIELD}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Field>
          <Field label="Time" hint="Local time at birth">
            <input
              type="time"
              className={FIELD}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </Field>
        </div>
      </div>

      <div className="mt-6">
        <Field
          label="Birthplace"
          hint={
            place
              ? `${place.latitude.toFixed(4)}, ${place.longitude.toFixed(4)} · ${place.timezone}`
              : searching
                ? "Searching…"
                : "Type at least three characters"
          }
        >
          <input
            className={FIELD}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPlace(null);
            }}
            placeholder="City, country"
          />
        </Field>

        {results.length > 0 && !place ? (
          <ul className="mt-2 max-h-56 overflow-y-auto border border-rule bg-surface">
            {results.map((r) => (
              <li key={`${r.latitude},${r.longitude}`}>
                <button
                  type="button"
                  onClick={() => {
                    setPlace(r);
                    setQuery(r.label);
                    setResults([]);
                  }}
                  className="w-full border-l-2 border-transparent px-3 py-2.5 text-left text-[0.8125rem] text-bone-soft transition-colors hover:border-patina hover:bg-surface-alt hover:text-bone"
                >
                  {r.label}
                  <span className="datum ml-2 text-[0.625rem] text-bone-faint">
                    {r.timezone}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={submitting}
          className="datum border border-patina-dim px-6 py-3 text-[0.6875rem] tracking-[0.22em] text-patina uppercase transition-colors hover:bg-patina-deep disabled:opacity-40"
        >
          {submitting ? "Calculating…" : "Cast chart"}
        </button>

        {submitting ? (
          <span className="datum text-[0.6875rem] text-bone-faint">
            Swiss Ephemeris, then cycles — this takes a few seconds.
          </span>
        ) : null}
        {error ? (
          <span className="datum text-[0.6875rem] text-ember">{error}</span>
        ) : null}
        {done ? (
          <span className="datum text-[0.6875rem] text-patina">{done}</span>
        ) : null}
      </div>
    </form>
  );
}
