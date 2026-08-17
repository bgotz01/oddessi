"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_MODEL } from "@/lib/models";
import { DEFAULT_INTERFACE_PROMPT } from "@/lib/interface-prefs";
import { useChart } from "@/components/chart-context";
import {
  SYSTEMS,
  parseSystems,
  type ActiveSystems,
  type System,
} from "@/lib/memory-scope";

/**
 * Re-exported so the modal and the pin control have one import for the switch.
 * The definition lives with the memory scopes because that is what it decides.
 */
export type { ActiveSystems, System } from "@/lib/memory-scope";

/** A past conversation, as the session dropdown needs it. No transcript — the
 *  messages are fetched only when one is actually opened. */
export interface ChatSessionSummary {
  id: string;
  title: string | null;
  updatedAt: string;
  messageCount: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

interface ChatContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
  /** Selected model id. */
  model: string;
  setModel: (id: string) => void;
  /** Editable system prompt. */
  systemPrompt: string;
  setSystemPrompt: (p: string) => void;
  /** Persist current model + prompt to the DB. */
  savePrefs: () => Promise<void>;
  /** True while savePrefs is in flight. */
  saving: boolean;
  messages: ChatMessage[];
  send: (text: string, pathname?: string) => void;
  busy: boolean;
  /** Clear the conversation, distilling it into memory first. */
  clear: () => void;
  /** True while the post-clear summarization is running. */
  summarizing: boolean;
  /**
   * Whether the active chart's distilled memory travels with each message.
   * Only ever this chart's — see the scoping in `/api/chat`.
   */
  memoryEnabled: boolean;
  setMemoryEnabled: (v: boolean) => void;
  /** Which system(s) the model may read from. */
  systems: ActiveSystems;
  setSystems: (v: ActiveSystems) => void;
  /**
   * Distil the current conversation into memory without ending it. `clear`
   * does this too, on the way out; this is the same thing on its own.
   */
  distil: () => void;
  /**
   * True when the conversation as it currently stands has already been
   * distilled. Goes false again the moment another message lands, because then
   * there is new material to add.
   */
  distilled: boolean;
  /**
   * True when that distillation wrote nothing — the distiller read the
   * transcript and found no lesson in it worth keeping.
   *
   * This is a routine outcome, not a failure: the distiller is deliberately
   * strict, and a question with one answer that nobody confirmed or argued
   * with is the commonest chat there is. It needs saying out loud all the same.
   * Reporting it as "added to memory" sends people to the memory panel to look
   * for something that was never written, and the only conclusion available
   * there is that the app lost it.
   */
  distilledNothing: boolean;
  /** Past conversations for the active chart, newest first. */
  sessions: ChatSessionSummary[];
  /** The session currently on screen, or null for an unsaved new chat. */
  sessionId: string | null;
  /** Open a past conversation, or pass null to start a fresh one. */
  loadSession: (id: string | null) => void;
  /**
   * Delete the conversation on screen — from the database too, if it was ever
   * saved — and leave an empty chat behind. Irreversible; the caller is
   * responsible for confirming first.
   */
  deleteSession: () => void;
  /**
   * Pages can call this to register the data currently visible on screen.
   * It is serialized into the system message so the model can reason about
   * what the user is actually looking at, not just the route name.
   *
   * Pass `null` to clear (e.g. on unmount).
   */
  setPageContext: (ctx: Record<string, unknown> | null) => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

// ─── chart-memory toggle ──────────────────────────────────────────────────────
/**
 * Whether the active chart's distilled memory is attached to each message.
 *
 * Kept in localStorage rather than component state. The council's equivalent is
 * a plain `useState(true)` and forgets on every visit, which it can afford —
 * the council is one long sitting. This modal is opened and closed a dozen
 * times an hour, and a memory switch that silently flips back on is worse than
 * no switch at all.
 *
 * Same `useSyncExternalStore` shape as the chart selection in
 * `components/chart-context.tsx`, and for the same reason: it reads the client
 * value on hydration without a setState-in-an-effect, and keeps other tabs in
 * step. The server snapshot is `true` because on is the default.
 */
const MEMORY_KEY = "oddessi:chartMemory";

let memoryListeners: Array<() => void> = [];

const memorySetting = {
  subscribe(onChange: () => void) {
    memoryListeners.push(onChange);
    window.addEventListener("storage", onChange);
    return () => {
      memoryListeners = memoryListeners.filter((l) => l !== onChange);
      window.removeEventListener("storage", onChange);
    };
  },
  get(): boolean {
    return window.localStorage.getItem(MEMORY_KEY) !== "off";
  },
  getOnServer(): boolean {
    return true;
  },
  set(value: boolean) {
    window.localStorage.setItem(MEMORY_KEY, value ? "on" : "off");
    memoryListeners.forEach((l) => l());
  },
};

// ─── systems toggle ───────────────────────────────────────────────────────────
/**
 * Which system(s) the Interface may read from.
 *
 * Narrowing is not only about tokens. With more than one attached the model
 * will reach across them unprompted — the Western elements and the Chinese
 * phases share three names outright — so "Western only" is the way to get a
 * reading that stays inside one tradition and can be judged on its own terms.
 * All three is the default because it is what the app is for.
 *
 * Same localStorage store as the memory toggle above. The stored value is a
 * comma-joined list; the three legacy strings are still read, which is why
 * `parseSystems` and not a bare split.
 */
const SYSTEMS_KEY = "oddessi:systems";

let systemsListeners: Array<() => void> = [];

/**
 * `useSyncExternalStore` compares snapshots by identity, so `get` must not
 * return a fresh array each call or React re-renders forever. The parsed value
 * is cached against the raw string it came from and only rebuilt when that
 * changes.
 */
let cachedRaw: string | null = null;
let cachedSystems: ActiveSystems = SYSTEMS;

/**
 * The stored string, read as a set.
 *
 * Three cases that are easy to collapse and must not be: never set (null) is
 * the default of everything; the empty string is a deliberate "nothing
 * attached"; and a lone token that is not a system name is one of the three
 * values the old enum wrote, which `parseSystems` translates.
 */
function readStored(raw: string | null): ActiveSystems {
  if (raw === null) return SYSTEMS;
  if (raw === "") return [];
  const parts = raw.split(",");
  if (parts.length === 1 && !SYSTEMS.includes(parts[0] as System)) {
    return parseSystems(parts[0]);
  }
  return parseSystems(parts);
}

const systemsSetting = {
  subscribe(onChange: () => void) {
    systemsListeners.push(onChange);
    window.addEventListener("storage", onChange);
    return () => {
      systemsListeners = systemsListeners.filter((l) => l !== onChange);
      window.removeEventListener("storage", onChange);
    };
  },
  get(): ActiveSystems {
    const raw = window.localStorage.getItem(SYSTEMS_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedSystems = readStored(raw);
    }
    return cachedSystems;
  },
  getOnServer(): ActiveSystems {
    return SYSTEMS;
  },
  set(value: ActiveSystems) {
    window.localStorage.setItem(SYSTEMS_KEY, value.join(","));
    systemsListeners.forEach((l) => l());
  },
};

// ─── helpers ──────────────────────────────────────────────────────────────────

function buildTranscript(msgs: ChatMessage[]): string {
  return msgs
    .filter((m) => m.content.trim())
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content.trim()}`)
    .join("\n\n");
}

// ─── provider ─────────────────────────────────────────────────────────────────

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState(false);
  const [model, setModelState] = useState(DEFAULT_MODEL);
  const [systemPrompt, setSystemPromptState] = useState(DEFAULT_INTERFACE_PROMPT);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [pageContext, setPageContextState] = useState<Record<string, unknown> | null>(null);

  const memoryEnabled = useSyncExternalStore(
    memorySetting.subscribe,
    memorySetting.get,
    memorySetting.getOnServer,
  );
  const setMemoryEnabled = useCallback((v: boolean) => memorySetting.set(v), []);

  const systems = useSyncExternalStore(
    systemsSetting.subscribe,
    systemsSetting.get,
    systemsSetting.getOnServer,
  );
  const setSystems = useCallback((v: ActiveSystems) => systemsSetting.set(v), []);
  // Read by `distilFrom`, which must not be re-created every time the switch
  // moves — same reason `chartRef` exists.
  const systemsRef = useRef(systems);
  useEffect(() => { systemsRef.current = systems; }, [systems]);

  const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
  // Mirrors sessionIdRef so the session dropdown re-renders when the current
  // conversation changes. The ref stays because the async paths in send() and
  // clear() need the value without re-creating those callbacks.
  const [sessionId, setSessionIdState] = useState<string | null>(null);
  /** Message count at the last distillation. 0 means "not distilled". */
  const [distilledCount, setDistilledCount] = useState(0);
  /**
   * How many categories that distillation actually wrote. `null` until the
   * server has answered.
   *
   * Only ever read alongside `distilledCount`, which is why it needs no reset
   * of its own: every path that abandons a distillation zeroes the count, and
   * a zeroed count makes this value unreachable.
   */
  const [distilledCategories, setDistilledCategories] = useState<number | null>(null);

  // Current DB session id — created lazily on first message, reset on clear or chart change.
  const sessionIdRef = useRef<string | null>(null);
  // Monotonically-increasing order counter for messages within the session.
  const orderRef = useRef(0);

  const abortRef = useRef<AbortController | null>(null);

  const { chart } = useChart();
  // Keep a ref so callbacks always see the latest chart without needing it in
  // their dep arrays (avoids stale-closure issues in ensureSession / clear).
  const chartRef = useRef(chart);
  useEffect(() => { chartRef.current = chart; }, [chart]);

  // ── Load prefs once ──────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/interface-prefs")
      .then((r) => r.json())
      .then((data: { model: string; systemPrompt: string }) => {
        if (data.model) setModelState(data.model);
        if (data.systemPrompt) setSystemPromptState(data.systemPrompt);
      })
      .catch(() => {/* silently ignore */ });
  }, []);

  /** Set both the ref the async paths read and the state the dropdown renders. */
  const setSessionId = useCallback((id: string | null) => {
    sessionIdRef.current = id;
    setSessionIdState(id);
  }, []);

  // ── List past conversations for the active chart ────────────────────────────
  /**
   * The list only. Nothing is loaded into the transcript.
   *
   * This used to restore the most recent session on mount, which meant opening
   * the modal dropped you into whatever you last said — usually the middle of a
   * conversation you had finished with. A chat surface that reopens mid-thought
   * is worse than one that forgets, because you have to notice and clear it
   * before you can start. Past sessions are now something you go and get.
   *
   * Note this is per chart: the endpoint takes chartId, and no chart means the
   * chartless sessions rather than everyone's.
   */
  const refreshSessions = useCallback((chartId: string | null) => {
    const url = chartId
      ? `/api/chat/sessions?chartId=${encodeURIComponent(chartId)}`
      : "/api/chat/sessions";

    // Promise callbacks rather than async/await on purpose: the setState then
    // lands in a continuation instead of running synchronously inside whatever
    // effect called this. Same shape as the prefs load above.
    fetch(url)
      .then((r) => r.json())
      .then((rows: Array<{
        id: string;
        title: string | null;
        updatedAt: string;
        messages: unknown[];
      }>) => {
        setSessions(
          rows
            .filter((r) => r.messages.length > 0)
            .map((r) => ({
              id: r.id,
              title: r.title,
              updatedAt: r.updatedAt,
              messageCount: r.messages.length,
            })),
        );
      })
      .catch(() => {/* the dropdown simply stays as it was */ });
  }, []);

  /**
   * A fresh transcript whenever the chart changes.
   *
   * Adjusted during render rather than in an effect. React re-runs the render
   * before committing, so there is never a frame showing the previous person's
   * conversation under the new person's name — and no cascading render, which
   * is what doing this in an effect would cost.
   */
  const [lastChartId, setLastChartId] = useState<string | null>(chart?.id ?? null);
  if ((chart?.id ?? null) !== lastChartId) {
    setLastChartId(chart?.id ?? null);
    setMessages([]);
    setSessionIdState(null);
    setDistilledCount(0);
  }

  // The parts that are not state: cancel the old stream, reset the counters,
  // and fetch the new chart's list.
  useEffect(() => {
    abortRef.current?.abort();
    sessionIdRef.current = null;
    orderRef.current = 0;
    refreshSessions(chart?.id ?? null);
  }, [chart?.id, refreshSessions]);

  // ── Open a past conversation ────────────────────────────────────────────────
  const loadSession = useCallback(
    async (id: string | null) => {
      abortRef.current?.abort();

      if (!id) {
        setMessages([]);
        setSessionId(null);
        setDistilledCount(0);
        orderRef.current = 0;
        return;
      }

      try {
        const res = await fetch(`/api/chat/sessions/${encodeURIComponent(id)}`);
        if (!res.ok) return;
        const session = (await res.json()) as {
          messages: Array<{ id: string; role: string; content: string }>;
        };
        setMessages(
          session.messages.map((m) => ({
            id: m.id,
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        );
        setSessionId(id);
        setDistilledCount(0);
        // Anything sent from here appends after what is already stored.
        orderRef.current = session.messages.length;
      } catch {
        /* leave the current transcript alone */
      }
    },
    [setSessionId],
  );

  // ── Delete the conversation on screen ───────────────────────────────────────
  /**
   * Both halves, because a half-deleted chat is worse than either: the DB row
   * goes (cascading to its messages) and the transcript is emptied. An unsaved
   * chat has no row yet, so it is only the emptying.
   *
   * Nothing is distilled on the way out. Delete means the conversation was not
   * worth keeping, and quietly writing it into permanent memory first would be
   * the opposite of what was asked.
   */
  const deleteSession = useCallback(() => {
    abortRef.current?.abort();
    const id = sessionIdRef.current;

    setMessages([]);
    setSessionId(null);
    setDistilledCount(0);
    orderRef.current = 0;

    if (!id) return;
    fetch(`/api/chat/sessions/${encodeURIComponent(id)}`, { method: "DELETE" })
      .catch(() => {/* the row survives; the dropdown will still show it */ })
      .finally(() => refreshSessions(chartRef.current?.id ?? null));
  }, [setSessionId, refreshSessions]);

  // ── Ensure a DB session exists, creating it if needed ───────────────────────
  const ensureSession = useCallback(async (firstMessage: string): Promise<string> => {
    if (sessionIdRef.current) return sessionIdRef.current;

    const c = chartRef.current;
    const res = await fetch("/api/chat/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: firstMessage.slice(0, 80),
        chartId: c?.id ?? null,
        chartName: c?.name ?? null,
      }),
    });
    const { id } = await res.json() as { id: string };
    setSessionId(id);
    orderRef.current = 0;
    // The new conversation should appear in the dropdown without a reload.
    refreshSessions(c?.id ?? null);
    return id;
  }, [setSessionId, refreshSessions]);

  const setOpen = useCallback((v: boolean) => setOpenState(v), []);
  const toggle = useCallback(() => setOpenState((p) => !p), []);
  const setModel = useCallback((id: string) => setModelState(id), []);
  const setSystemPrompt = useCallback((p: string) => setSystemPromptState(p), []);

  const savePrefs = useCallback(async () => {
    setSaving(true);
    try {
      await fetch("/api/interface-prefs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, systemPrompt }),
      });
    } finally {
      setSaving(false);
    }
  }, [model, systemPrompt]);

  // ── distil: transcript → memory, leaving the conversation alone ─────────────
  /**
   * Split out of `clear` so saving what a session taught you is no longer
   * welded to destroying it. Clearing still distils on the way out — that
   * behaviour was right, it was just the *only* way to reach it, which meant
   * closing the modal or switching charts quietly threw the lessons away.
   *
   * Needs two messages and a saved session: there is nothing to distil from a
   * question with no answer, and an unsaved chat has no transcript on the
   * server to reconcile against.
   */
  const distilFrom = useCallback(
    (snapshot: ChatMessage[], sid: string | null) => {
      if (snapshot.length < 2 || !sid) return;

      setSummarizing(true);
      // Recorded up front, not on success: the distillation has been asked for,
      // and pressing again while it is in flight would only send the same
      // transcript twice. A failure clears it again below.
      setDistilledCount(snapshot.length);
      setDistilledCategories(null);
      fetch("/api/chat/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: buildTranscript(snapshot),
          model,
          // What the conversation could see decides what it may write: a
          // West-only chat must not produce lessons about the four pillars.
          systems: systemsRef.current,
          // chartId is the canonical storage key; chartName is passed only so
          // the prompt reads "Chart: Boris Gotzev" rather than a UUID.
          ...(chartRef.current?.id && { chartId: chartRef.current.id }),
          ...(chartRef.current?.name && { chartName: chartRef.current.name }),
        }),
      })
        .then(async (res) => {
          // A rejected distillation must not leave the button claiming the
          // conversation is saved when it is not.
          if (!res.ok) {
            setDistilledCount(0);
            return;
          }
          // Nor may a successful one. "Nothing worth keeping" comes back as a
          // 200 with an empty list — the request worked, it just wrote nothing
          // — so the count, not the status, is what the label has to follow.
          const body = (await res.json().catch(() => null)) as
            | { categoriesUpdated?: unknown }
            | null;
          setDistilledCategories(
            Array.isArray(body?.categoriesUpdated)
              ? body.categoriesUpdated.length
              : null,
          );
        })
        .catch(() => setDistilledCount(0))
        .finally(() => setSummarizing(false));
    },
    [model],
  );

  const distil = useCallback(() => {
    distilFrom(messages.filter((m) => m.content.trim()), sessionIdRef.current);
  }, [messages, distilFrom]);

  /**
   * Compared against the live message count rather than stored as a flag, so it
   * un-sets itself the moment the conversation moves on — one more exchange and
   * there is something new to add, so the button offers itself again.
   */
  const distilled =
    distilledCount > 0 &&
    distilledCount === messages.filter((m) => m.content.trim()).length;

  /**
   * Nothing was written. `null` — a reply we could not read — is deliberately
   * not counted as nothing: the safe guess when the answer is unreadable is
   * that the write happened, since the server had already reported success.
   */
  const distilledNothing = distilled && distilledCategories === 0;

  // ── clear: summarize → wipe UI → reset session ──────────────────────────────
  const clear = useCallback(() => {
    abortRef.current?.abort();

    const snapshot = messages.filter((m) => m.content.trim());
    const sid = sessionIdRef.current;

    setMessages([]);
    setSessionId(null);
    setDistilledCount(0);
    orderRef.current = 0;
    // The conversation being cleared stays in the DB — it belongs in the
    // dropdown now, which is the only way back to it.
    refreshSessions(chartRef.current?.id ?? null);

    distilFrom(snapshot, sid);
  }, [messages, distilFrom, setSessionId, refreshSessions]);

  const setPageContext = useCallback((ctx: Record<string, unknown> | null) => {
    setPageContextState(ctx);
  }, []);

  // ── send ────────────────────────────────────────────────────────────────────
  const send = useCallback(
    async (text: string, pathname?: string) => {
      if (busy || !text.trim()) return;

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text.trim(),
      };

      const assistantId = crypto.randomUUID();
      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: "assistant", content: "", streaming: true },
      ]);
      setBusy(true);

      let sid: string | null = null;
      let msgOrder = 0;
      try {
        sid = await ensureSession(text.trim());
        msgOrder = orderRef.current;
        orderRef.current += 2; // user + assistant
      } catch {
        /* non-fatal — chat continues without persistence */
      }

      const history = [...messages, userMsg].map(({ role, content }) => ({ role, content }));

      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
          body: JSON.stringify({
            messages: history,
            model,
            chart,
            pathname,
            pageContext,
            includeMemory: memoryEnabled,
            systems,
            ...(sid && {
              sessionId: sid,
              userMessage: text.trim(),
              messageOrder: msgOrder,
            }),
          }),
        });

        if (!res.ok || !res.body) {
          const err = await res.text();
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: `Error: ${err}`, streaming: false } : m,
            ),
          );
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") break;
            try {
              const parsed = JSON.parse(payload);
              const delta: string = parsed?.choices?.[0]?.delta?.content ?? "";
              if (!delta) continue;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: m.content + delta } : m,
                ),
              );
            } catch {
              // malformed chunk — skip
            }
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: "Request failed.", streaming: false }
                : m,
            ),
          );
        }
      } finally {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, streaming: false } : m)),
        );
        setBusy(false);
      }
    },
    [busy, messages, model, chart, pageContext, memoryEnabled, systems, ensureSession],
  );

  return (
    <ChatContext.Provider
      value={{
        open, setOpen, toggle,
        model, setModel,
        systemPrompt, setSystemPrompt,
        savePrefs, saving,
        messages, send, busy, clear, summarizing,
        memoryEnabled, setMemoryEnabled,
        systems, setSystems, distil, distilled, distilledNothing,
        sessions, sessionId, loadSession, deleteSession,
        setPageContext,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside <ChatProvider>");
  return ctx;
}
