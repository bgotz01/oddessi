"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  useChat,
  type ChatSessionSummary,
  type Systems,
} from "@/components/chat-provider";
import { useChart } from "@/components/chart-context";
import { MemoryControl } from "@/components/interface-memory";
import { PromptModal } from "@/components/prompt-modal";
import { PinPassage } from "@/components/pin-passage";
import { systemsForPath } from "@/lib/memory-scope";
import { MODELS } from "@/lib/models";

/** The three positions of the systems control, in the order they read. */
const SYSTEM_OPTIONS: Array<{ value: Systems; label: string; title: string }> = [
  {
    value: "western",
    label: "West",
    title: "Western only — placements, houses and aspects. The four pillars are withheld.",
  },
  {
    value: "chinese",
    label: "East",
    title: "Chinese only — the four pillars, Day Master and luck pillars. The Western chart is withheld.",
  },
  {
    value: "both",
    label: "Both",
    title: "Both systems, each in its own vocabulary and never translated into the other.",
  },
];

/**
 * How a past conversation reads in the dropdown: the date first, then what you
 * opened it with. The date leads because it is fixed width, so the titles below
 * it line up into a column instead of starting at a different place on every
 * row — and because "which day was that" is how you actually look for one.
 *
 * The stored title is the first message trimmed to 80 characters, which is far
 * too long for a select, so it is cut again here.
 */
function sessionLabel(session: ChatSessionSummary): string {
  const date = new Date(session.updatedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
  const title = session.title?.trim() || "Untitled";
  const trimmed = title.length > 44 ? `${title.slice(0, 43)}…` : title;
  return `${date} · ${trimmed}`;
}

export default function ChatModal() {
  const {
    open, setOpen,
    model, setModel,
    messages, send, busy,
    systems, setSystems,
    sessions, sessionId, loadSession, deleteSession,
    distil, distilled, summarizing,
  } = useChat();
  // Attaching and reading memory still lives in MemoryControl, and the system
  // prompt in PromptModal. Only `distil` comes back here, because it acts on
  // the conversation rather than on the memory.
  const { chart } = useChart();
  const pathname = usePathname();

  const [draft, setDraft] = useState("");
  const [promptOpen, setPromptOpen] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  /** The server's floor too: nothing to learn from a question with no answer. */
  const canDistil = messages.filter((m) => m.content.trim()).length >= 2;

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  /**
   * Whether the transcript is parked at the bottom.
   *
   * The whole point of tracking this: auto-scroll used to run on every
   * `messages` change, which during a stream is every token. Scrolling up to
   * read the beginning of a long answer yanked you straight back down again, so
   * a reply could not be read until it had finished. Now the follow only
   * happens while you are already at the bottom — scroll up and it lets go;
   * come back down and it picks up again.
   */
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    if (!pinned) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pinned]);

  /** 40px of slack so a hair of overscroll or a rounding error still counts. */
  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    setPinned(distance < 40);
  }, []);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setPinned(true);
  }, []);

  useEffect(() => {
    if (open && !promptOpen) {
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [open, promptOpen]);

  /**
   * Set the switch from the route each time the modal opens.
   *
   * On open rather than on every navigation: changing it under someone
   * mid-conversation would be worse than leaving it stale. Opening the modal is
   * the moment you are choosing what to talk about, so it is the moment the
   * page gets to have an opinion — and you can still override it afterwards.
   */
  useEffect(() => {
    if (!open) return;
    const suggested = systemsForPath(pathname);
    if (suggested) setSystems(suggested);
    // Only when the modal opens, and only for the route it opened on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
          {/* Left: title + context labels. `min-w-0` + truncation rather than
              wrapping — the header is a single band and a chart called
              "Simeon Gotzev 2" must not push it to two lines. */}
          <div className="flex min-w-0 items-baseline gap-4">
            {/* The route sits under the title, small — it is what the Interface
                can currently see, so it belongs to the title rather than to the
                controls. The wrapper's baseline is the title's, so the chart
                name beside it still lines up. */}
            <div className="shrink-0">
              <span className="inscription block text-[0.8125rem] leading-tight text-bone">
                Interface
              </span>
              <span className="datum block text-[0.5rem] uppercase tracking-[0.18em] text-bone-faint">
                {pathname === "/" ? "home" : pathname}
              </span>
            </div>
            {chart ? (
              <span className="datum truncate text-[0.625rem] text-patina-dim uppercase tracking-[0.2em]">
                {chart.name}
              </span>
            ) : (
              <span className="datum shrink-0 text-[0.625rem] text-bone-faint uppercase tracking-[0.2em]">
                no chart
              </span>
            )}
          </div>

          {/* Right: which tradition, and the close. Never compressed — the left
              side gives way first, because a truncated chart name is legible and
              a two-line control row is not.

              Systems sits up here rather than with the model and prompt below:
              it decides what the Interface *is* for this conversation, which is
              closer to the chart's identity on the left than to the machinery
              that generates a reply. */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex items-center border border-rule">
              {SYSTEM_OPTIONS.map((option, i) => (
                <div key={option.value} className="flex items-stretch">
                  {i > 0 && <div className="w-px self-stretch bg-rule" />}
                  <button
                    type="button"
                    onClick={() => setSystems(option.value)}
                    aria-pressed={systems === option.value}
                    title={option.title}
                    className={`datum px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.18em] transition-colors ${
                      systems === option.value
                        ? "bg-surface-alt text-patina"
                        : "text-bone-faint hover:text-bone"
                    }`}
                  >
                    {option.label}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setOpen(false)}
              className="datum text-[1rem] text-bone-faint hover:text-bone transition-colors leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* ── Second row: which conversation, and how the reply gets made ──
            Session on the left; prompt, model and memory on the right. The
            three on the right are the machinery — what the model is told, which
            model is told it, and what it remembers. */}
        {(
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-rule px-6 py-2">
            <div className="flex min-w-0 items-center gap-3">
              <select
                value={sessionId ?? ""}
                onChange={(e) => loadSession(e.target.value || null)}
                className="datum max-w-[22rem] truncate border border-rule bg-void px-2 py-1 text-[0.625rem] uppercase tracking-[0.14em] text-bone-faint focus:border-patina focus:outline-none"
                aria-label="Conversation"
              >
                <option value="">
                  {sessionId ? "＋ New chat" : "New chat"}
                </option>
                {sessions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {sessionLabel(s)}
                  </option>
                ))}
              </select>

            </div>

            <div className="flex shrink-0 items-center gap-3">
              {/* Next to the model on purpose: the prompt and the model are the
                  two halves of one question — what gets said, and by whom. */}
              <button
                type="button"
                onClick={() => setPromptOpen(true)}
                title="Edit the system prompt sent before every message"
                className={`datum whitespace-nowrap border px-2 py-1 text-[0.625rem] uppercase tracking-[0.14em] transition-colors ${
                  promptOpen
                    ? "border-patina text-patina"
                    : "border-rule text-bone-faint hover:text-bone"
                }`}
              >
                Prompt
              </button>

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
                className="datum shrink-0 border border-rule bg-void px-2 py-1 text-[0.625rem] uppercase tracking-[0.14em] text-bone-faint focus:border-patina focus:outline-none"
                aria-label="Model"
              >
                {MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>

              <MemoryControl />
            </div>
          </div>
        )}

        {/* ── Chat ──
            No longer behind a tab: the chat is the whole modal now, and the
            system prompt has its own surface. */}
        <>
            {/* `relative` so the jump-down control and the pin bar can sit
                against the transcript rather than the foot of the modal. */}
            <div ref={transcriptRef} className="relative flex min-h-0 flex-1 flex-col">
            <div
              ref={scrollerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-8 py-6 space-y-6 min-h-0"
            >
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
                  {/* The label shares the message's column so it sits over the
                      first word rather than out at the modal's edge. */}
                  <span
                    className={`eyebrow text-[0.5rem] ${msg.role === "user" ? "w-1/2" : ""}`}
                  >
                    {msg.role === "user" ? "you" : "interface"}
                  </span>
                  {msg.role === "user" ? (
                    // Right-hand half of the modal, but the text inside it reads
                    // left to right like everything else. Ragged-left text was
                    // the previous attempt at marking a message as yours and it
                    // read as broken — every line starting at a different place
                    // is something you have to work at rather than read.
                    //
                    // `w-1/2` and not `max-w-1/2`: a fixed column means a short
                    // question begins at the same place a long one does, so the
                    // eye finds the start of every message you sent in the same
                    // spot down the transcript.
                    //
                    // `whitespace-pre-wrap` so a message you took the trouble to
                    // lay out — blank lines between thoughts, a list of
                    // questions — comes back looking the way you typed it.
                    // `break-words` keeps a long unbroken string from widening
                    // the column.
                    <p className="w-1/2 whitespace-pre-wrap break-words text-[1.0625rem] font-light leading-relaxed text-bone">
                      {msg.content}
                    </p>
                  ) : (
                    // Full width, unlike the user's message. The 80 % cap is what
                    // marks a message as *yours* — a right-aligned block that stops
                    // short. Applying it to the reply too just threw away a fifth
                    // of the modal and made every list wrap early for no gain.
                    <div
                      className={`prose-chat w-full ${msg.streaming
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

              {/* Jump to the foot of the transcript. Only while you are away
                  from it — a permanent button would be a permanent nag, and
                  when you are already at the bottom it does nothing. Marked
                  while a reply is still coming in, because then the thing you
                  are scrolled away from is still moving. */}
              <PinPassage scrollerRef={scrollerRef} containerRef={transcriptRef} />

              {!pinned && (
                <button
                  type="button"
                  onClick={scrollToBottom}
                  aria-label="Scroll to the latest message"
                  className="absolute bottom-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center border border-rule bg-surface-alt text-bone-faint shadow-lg transition-colors hover:border-patina hover:text-patina"
                >
                  <span aria-hidden className="datum text-[0.75rem] leading-none">
                    ↓
                  </span>
                  {busy && (
                    <span
                      aria-hidden
                      className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-patina"
                    />
                  )}
                </button>
              )}
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

            {/* ── Session actions ──
                Below the composer rather than up in the header: these act on
                the conversation you have just had, so they belong at the end of
                it. Hidden until there is one — an empty chat has nothing to
                distil and nothing to delete. */}
            {messages.length > 0 && (
              <div className="flex shrink-0 items-center justify-between border-t border-rule-faint px-8 py-2">
                {/* Three states, and the settled one is deliberately not a
                    button: once this conversation is in memory there is nothing
                    useful a second press could do, and a live-looking control
                    invites one. It becomes a button again by itself as soon as
                    another exchange gives it something new to add. */}
                {distilled && !summarizing ? (
                  <span
                    title="This conversation is in the chart's memory. Ask something more and it can be distilled again."
                    className="datum flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.18em] text-patina"
                  >
                    <span aria-hidden>✓</span>
                    added to memory
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={distil}
                    disabled={!canDistil || summarizing || busy}
                    title={
                      canDistil
                        ? "Distil this conversation into the chart's memory and carry on"
                        : "Needs a question and an answer first"
                    }
                    className="datum text-[0.625rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-patina disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    {summarizing ? "distilling…" : "distil to memory"}
                  </button>
                )}

                {/* Two-step rather than a modal. A confirm dialog for this
                    would be a second overlay on top of two others, and the
                    question is small enough to ask in place. Reverts on blur so
                    a half-pressed delete cannot sit there armed. */}
                {confirmingDelete ? (
                  <span className="flex items-center gap-4">
                    <span className="datum text-[0.625rem] uppercase tracking-[0.18em] text-ember">
                      delete permanently?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        deleteSession();
                        setConfirmingDelete(false);
                      }}
                      className="datum text-[0.625rem] uppercase tracking-[0.18em] text-ember transition-colors hover:text-bone"
                    >
                      yes
                    </button>
                    <button
                      type="button"
                      autoFocus
                      onBlur={() => setConfirmingDelete(false)}
                      onClick={() => setConfirmingDelete(false)}
                      className="datum text-[0.625rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-bone"
                    >
                      cancel
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmingDelete(true)}
                    disabled={busy || summarizing}
                    title="Delete this conversation and its stored transcript"
                    className="datum text-[0.625rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-ember disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    delete chat
                  </button>
                )}
              </div>
            )}
          </>

        {promptOpen && <PromptModal onClose={() => setPromptOpen(false)} />}
      </div>
    </>
  );
}
