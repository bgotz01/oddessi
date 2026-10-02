"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import ModelSelect from "@/components/ModelSelect";
import { PARADIGM_DEFAULT_MODEL, CRITIC_DEFAULT_MODEL } from "@/lib/models";

/**
 * Site-wide model choice for page-level LLM work, set from the gear in the
 * navbar. Two roles, chosen separately: "generate" produces content, "critique"
 * judges it — a different model, so the critic is not grading its own work.
 *
 * The Interface chat and the council keep their own model pickers; this is for
 * generation/critique pipelines embedded in pages (e.g. the Pluto Inversion).
 */

export type ModelRole = "generate" | "critique";
type Models = Record<ModelRole, string>;

const ROLE_LABELS: Record<ModelRole, string> = {
  generate: "Generation model",
  critique: "Critique model",
};

// Per-viewer convenience, so localStorage rather than a preferences row.
const STORAGE_KEY = "oddessi:model-settings";
const DEFAULTS: Models = { generate: PARADIGM_DEFAULT_MODEL, critique: CRITIC_DEFAULT_MODEL };

function load(): Models {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

const ModelSettingsContext = createContext<{
  models: Models;
  setModel: (role: ModelRole, id: string) => void;
} | null>(null);

export function ModelSettingsProvider({ children }: { children: ReactNode }) {
  // Read lazily: the models only render inside the popover, which is closed on
  // the server render, so the stored choice cannot cause a hydration mismatch.
  const [models, setModels] = useState<Models>(load);

  const setModel = useCallback((role: ModelRole, id: string) => {
    setModels((prev) => {
      const next = { ...prev, [role]: id };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable — the in-memory choice still applies
      }
      return next;
    });
  }, []);

  return <ModelSettingsContext.Provider value={{ models, setModel }}>{children}</ModelSettingsContext.Provider>;
}

export function useModelSettings() {
  const ctx = useContext(ModelSettingsContext);
  if (!ctx) throw new Error("useModelSettings must be used inside ModelSettingsProvider");
  return ctx;
}

function GearIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

/** Gear button + popover for the navbar. */
export function ModelSettingsButton() {
  const { models, setModel } = useModelSettings();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative self-center">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Model settings"
        aria-expanded={open}
        title="Choose the generation and critique models"
        className={`grid h-7 w-7 place-items-center transition-colors ${open ? "text-patina" : "text-bone-soft hover:text-bone"}`}
      >
        <GearIcon />
      </button>
      {open && (
        <div role="dialog" aria-label="Model settings" className="absolute right-0 top-9 z-50 w-72 border border-rule bg-surface p-4 shadow-xl">
          {(["generate", "critique"] as const).map((role) => (
            <label key={role} className="block [&:not(:first-child)]:mt-4">
              <span className={`datum block text-[0.625rem] uppercase tracking-[0.16em] ${role === "generate" ? "text-patina" : "text-ember"}`}>
                {ROLE_LABELS[role]}
              </span>
              <ModelSelect
                value={models[role]}
                onChange={(id) => setModel(role, id)}
                ariaLabel={ROLE_LABELS[role]}
                showCost={false}
                className="mt-1.5 w-full border border-rule bg-void px-2 py-1.5 text-sm text-bone focus:border-patina focus:outline-none"
              />
            </label>
          ))}
          <p className="mt-4 text-xs leading-snug text-bone-faint">Used by every page that generates and critiques. Separate models, so the critic isn’t grading its own work.</p>
        </div>
      )}
    </div>
  );
}
