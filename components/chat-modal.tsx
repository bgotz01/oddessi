"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "@/components/chat-provider";
import { useChart } from "@/components/chart-context";
import { MODELS } from "@/lib/models";
import { DEFAULT_INTERFACE_PROMPT } from "@/lib/interface-prefs";

type Panel = "chat" | "prompt";

export default function ChatModal() {
  const {
    open, setOpen,
    model, setModel,
    systemPrompt, setSystemPrompt,
    savePrefs, saving,
    messages, send, busy, clear,
  } = useChat();
  const { chart } = useChart();
  const pathname = usePathname();

  const [panel, setPanel] = useState<Panel>("chat");
  const [draft, setDraft] = useState("");
  const [promptDraft, setPromptDraft] = useState(systemPrompt);
  const [saved, setSaved] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Keep promptDraft in sync when prefs load from DB.
  useEffect(() => {
    setPromptDraft(systemPrompt);
  }, [systemPrompt]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && panel === "chat") {
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [open, panel]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  function submit() {
    const text = draft.trim();
    if (!text || busy) return;
    send(text, pathname);
    setDraft("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit();
  }

  async function handleSavePrompt() {
    setSystemPrompt(promptDraft);
    await savePrefs();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-void/70"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed inset-0 z-50 m-auto flex flex-col border border-rule bg-surface w-[min(860px,calc(100vw-2rem))]"
        style={{ height: "calc(100dvh - 8rem)" }}
        role="dialog"
        aria-label="Chat"
        aria-modal="true"
      >
        {/* ── Header ── */}
        <div className="flex shrink-0 items-center justify-between border-b border-rule px-6 py-3">
          {/* Left: title + context labels */}
          <div className="flex items-baseline gap-4">
            <span className="inscription text-[0.8125rem] text-bone">Interface</span>
            {chart ? (
              <span className="datum text-[0.625rem] text-patina-dim uppercase tracking-[0.2em]">
                {chart.name}
              </span>
            ) : (
              <span className="datum text-[0.625rem] text-bone-faint uppercase tracking-[0.2em]">
                no chart
              </span>
            )}
            <span className="datum text-[0.625rem] text-bone-faint uppercase tracking-[0.2em]">
              {pathname === "/" ? "home" : pathname}
            </span>
          </div>

          {/* Right: tab switcher + controls */}
          <div className="flex items-center gap-4">
            {/* Tab toggle */}
            <div className="flex items-center border border-rule">
              <button
                onClick={() => setPanel("chat")}
                className={`datum text-[0.6rem] uppercase tracking-[0.18em] px-3 py-1.5 transition-colors ${panel === "chat"
                  ? "bg-surface-alt text-bone"
                  : "text-bone-faint hover:text-bone"
                  }`}
              >
                Chat
              </button>
              <div className="w-px self-stretch bg-rule" />
              <button
                onClick={() => setPanel("prompt")}
                className={`datum text-[0.6rem] uppercase tracking-[0.18em] px-3 py-1.5 transition-colors ${panel === "prompt"
                  ? "bg-surface-alt text-bone"
                  : "text-bone-faint hover:text-bone"
                  }`}
              >
                Prompt
              </button>
            </div>

            {/* Model selector (always visible) */}
            <select
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                // Persist immediately — no need to visit the Prompt panel.
                fetch("/api/interface-prefs", {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ model: e.target.value }),
                }).catch(() => {/* silently ignore — in-memory state is still updated */ });
              }}
              className="datum bg-void border border-rule text-[0.625rem] text-bone-faint uppercase tracking-[0.14em] px-2 py-1 focus:border-patina focus:outline-none"
              aria-label="Model"
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>

            {panel === "chat" && messages.length > 0 && (
              <button
                onClick={clear}
                className="datum text-[0.625rem] uppercase tracking-[0.18em] text-bone-faint hover:text-bone transition-colors"
                aria-label="Clear conversation"
              >
                clear
              </button>
            )}

            <button
              onClick={() => setOpen(false)}
              className="datum text-[1rem] text-bone-faint hover:text-bone transition-colors leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* ── Chat panel ── */}
        {panel === "chat" && (
          <>
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 min-h-0">
              {messages.length === 0 && (
                <p className="text-[1.0625rem] font-light italic text-bone-faint leading-relaxed">
                  {chart
                    ? `Ask anything about ${chart.name}'s chart — placements, cycles, transits.`
                    : "No chart selected. Ask general astrology questions, or select a chart from the sidebar."}
                </p>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-1.5 ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <span className="eyebrow text-[0.5rem]">
                    {msg.role === "user" ? "you" : "interface"}
                  </span>
                  {msg.role === "user" ? (
                    <p className="max-w-[80%] text-[1.0625rem] font-light leading-relaxed text-bone">
                      {msg.content}
                    </p>
                  ) : (
                    <div
                      className={`prose-chat max-w-[80%] ${msg.streaming
                        ? "after:content-['▋'] after:animate-pulse after:text-patina after:ml-0.5"
                        : ""
                        }`}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content || (msg.streaming ? " " : "—")}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              ))}

              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="shrink-0 border-t border-rule px-8 py-4 flex gap-4 items-end"
            >
              <textarea
                ref={textareaRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask…"
                disabled={busy}
                className="flex-1 resize-none bg-transparent text-[1.0625rem] font-light text-bone placeholder:text-bone-faint focus:outline-none disabled:opacity-40 leading-relaxed max-h-40 overflow-y-auto"
                style={{ height: "auto", minHeight: "1.7rem" }}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = `${el.scrollHeight}px`;
                }}
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                className="shrink-0 datum text-[0.625rem] uppercase tracking-[0.2em] border border-rule px-4 py-2 text-bone-soft hover:border-patina hover:text-patina disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {busy ? "…" : "send"}
              </button>
            </form>
          </>
        )}

        {/* ── Prompt editor panel ── */}
        {panel === "prompt" && (
          <div className="flex flex-1 flex-col min-h-0 px-8 py-6 gap-4">
            <div>
              <p className="eyebrow mb-3">System Prompt</p>
              <p className="text-[0.875rem] font-light text-bone-faint leading-relaxed">
                This is sent to the model before every conversation. The chart data and current
                page are always appended automatically — write the character and focus here.
              </p>
            </div>

            <textarea
              value={promptDraft}
              onChange={(e) => setPromptDraft(e.target.value)}
              className="flex-1 resize-none bg-surface-alt border border-rule text-[0.9375rem] font-light text-bone leading-relaxed px-4 py-3 focus:border-patina focus:outline-none placeholder:text-bone-faint"
              spellCheck={false}
              aria-label="System prompt"
            />

            <div className="flex shrink-0 items-center justify-between">
              <button
                onClick={() => setPromptDraft(DEFAULT_INTERFACE_PROMPT)}
                className="datum text-[0.625rem] uppercase tracking-[0.18em] text-bone-faint hover:text-bone transition-colors"
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
                  onClick={handleSavePrompt}
                  disabled={saving}
                  className="datum text-[0.625rem] uppercase tracking-[0.2em] border border-rule px-4 py-2 text-bone-soft hover:border-patina hover:text-patina disabled:opacity-30 transition-colors"
                >
                  {saving ? "saving…" : "save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
