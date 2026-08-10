"use client";

import { useCallback, useEffect, useState } from "react";
import { useChat } from "@/components/chat-provider";
import { DEFAULT_INTERFACE_PROMPT } from "@/lib/interface-prefs";

/**
 * The system prompt editor, as its own modal.
 *
 * It used to be the second half of a Chat/Prompt tab switcher inside the chat
 * modal, which cost a permanent two-position control in the header to reach
 * something edited once in a while — and made "Chat" a button you pressed to
 * get back to the thing you were already doing. It is a separate surface now,
 * opened from the row of controls that decide how a reply gets made.
 *
 * Stacked above the chat modal rather than replacing it: the prompt is written
 * against a conversation, and being able to see the conversation behind it is
 * worth more than the extra layer costs.
 */
export function PromptModal({ onClose }: { onClose: () => void }) {
  const { systemPrompt, setSystemPrompt, savePrefs, saving } = useChat();

  const [draft, setDraft] = useState(systemPrompt);
  const [saved, setSaved] = useState(false);

  // Escape closes this, not the chat modal underneath. Capture phase plus
  // stopPropagation is what keeps the two from both firing on one keypress.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  const save = useCallback(async () => {
    setSystemPrompt(draft);
    await savePrefs();
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  }, [draft, setSystemPrompt, savePrefs]);

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-void/70"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-[70] m-auto flex h-[min(34rem,calc(100dvh-10rem))] w-[min(720px,calc(100vw-3rem))] flex-col border border-rule bg-surface"
        role="dialog"
        aria-label="System prompt"
        aria-modal="true"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-rule px-6 py-3">
          <div>
            <span className="inscription block text-[0.8125rem] leading-tight text-bone">
              System Prompt
            </span>
            <span className="datum block text-[0.5rem] uppercase tracking-[0.18em] text-bone-faint">
              sent before every message
            </span>
          </div>
          <button
            onClick={onClose}
            className="datum text-[1rem] leading-none text-bone-faint transition-colors hover:text-bone"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 px-8 py-6">
          <p className="text-[0.875rem] font-light leading-relaxed text-bone-faint">
            The chart data, the four pillars, the current page and the chart&apos;s
            memory are all appended automatically — write the character and the
            focus here, not the facts.
          </p>

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="flex-1 resize-none border border-rule bg-surface-alt px-4 py-3 text-[0.9375rem] font-light leading-relaxed text-bone placeholder:text-bone-faint focus:border-patina focus:outline-none"
            spellCheck={false}
            aria-label="System prompt"
          />

          <div className="flex shrink-0 items-center justify-between">
            <button
              onClick={() => setDraft(DEFAULT_INTERFACE_PROMPT)}
              className="datum text-[0.625rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-bone"
            >
              reset to default
            </button>

            <div className="flex items-center gap-4">
              {saved && (
                <span className="datum text-[0.625rem] uppercase tracking-[0.18em] text-patina">
                  saved
                </span>
              )}
              <button
                onClick={save}
                disabled={saving}
                className="datum border border-rule px-4 py-2 text-[0.625rem] uppercase tracking-[0.2em] text-bone-soft transition-colors hover:border-patina hover:text-patina disabled:opacity-30"
              >
                {saving ? "saving…" : "save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
