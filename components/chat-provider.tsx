"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_MODEL } from "@/lib/models";
import { DEFAULT_INTERFACE_PROMPT } from "@/lib/interface-prefs";
import { useChart } from "@/components/chart-context";

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
  clear: () => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState(false);
  const [model, setModelState] = useState(DEFAULT_MODEL);
  const [systemPrompt, setSystemPromptState] = useState(DEFAULT_INTERFACE_PROMPT);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const { chart } = useChart();

  // Load persisted prefs once on mount.
  useEffect(() => {
    fetch("/api/interface-prefs")
      .then((r) => r.json())
      .then((data: { model: string; systemPrompt: string }) => {
        if (data.model) setModelState(data.model);
        if (data.systemPrompt) setSystemPromptState(data.systemPrompt);
      })
      .catch(() => {/* silently ignore — defaults are fine */ });
  }, []);

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

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
  }, []);

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

      const history = [...messages, userMsg].map(({ role, content }) => ({ role, content }));

      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
          body: JSON.stringify({ messages: history, model, chart, pathname }),
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
              m.id === assistantId ? { ...m, content: "Request failed.", streaming: false } : m,
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
    [busy, messages, model, chart],
  );

  return (
    <ChatContext.Provider
      value={{
        open, setOpen, toggle,
        model, setModel,
        systemPrompt, setSystemPrompt,
        savePrefs, saving,
        messages, send, busy, clear,
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
