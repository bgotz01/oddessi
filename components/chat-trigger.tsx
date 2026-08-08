"use client";

import { useChat } from "@/components/chat-provider";

/**
 * The floating button that opens and closes the chat modal.
 * Lives outside the sidebar/main layout so it's always visible.
 */
export default function ChatTrigger() {
  const { open, toggle } = useChat();

  return (
    <button
      onClick={toggle}
      aria-label={open ? "Close chat" : "Open chat"}
      className={`
        fixed bottom-6 right-6 z-50
        flex h-11 w-11 items-center justify-center
        border transition-colors
        datum text-lg
        ${open
          ? "border-patina bg-surface text-patina hover:bg-surface-alt"
          : "border-rule bg-surface text-bone-soft hover:border-patina hover:text-patina"
        }
      `}
    >
      {open ? "×" : "✦"}
    </button>
  );
}
