"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "@/components/chat-provider";
import { useChart } from "@/components/chart-context";
import type { MemoryScope } from "@/lib/memory-scope";

/**
 * Pin a highlighted passage straight from a reply.
 *
 * The alternative was a modal you paste into, and the reason this won is that
 * the decision to keep a paragraph happens *while reading it*. Anything that
 * makes you break off, copy, open a window and paste will mostly not get done,
 * and the passages worth keeping are exactly the ones you notice mid-sentence.
 *
 * Three buttons rather than a pin-then-choose-scope dropdown: the scope is a
 * one-click choice out of three, so a menu would add a step to save a step. The
 * position matching the West/East switch is marked, because that is the right
 * answer nearly every time.
 */

const SCOPES: Array<{ scope: MemoryScope; label: string; title: string }> = [
  { scope: "West", label: "West", title: "Pin to Western Notes — read in West and Both" },
  { scope: "East", label: "East", title: "Pin to Eastern Notes — read in East and Both" },
  { scope: "Shared", label: "Both", title: "Pin to Notes — read in every conversation" },
];

/** Where the floating bar sits, in coordinates relative to the transcript. */
interface Anchor {
  top: number;
  left: number;
  text: string;
}

export function PinPassage({
  scrollerRef,
  containerRef,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { systems } = useChat();
  const { chart } = useChart();
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [saved, setSaved] = useState<MemoryScope | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  /** The scope the switch implies — marked, and what most pins should use. */
  const suggested: MemoryScope =
    systems === "western" ? "West" : systems === "chinese" ? "East" : "Shared";

  const readSelection = useCallback(() => {
    const selection = document.getSelection();
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!selection || selection.isCollapsed || !container || !scroller) {
      setAnchor(null);
      return;
    }

    const text = selection.toString().trim();
    // A stray click registers as a one- or two-character selection often
    // enough to be annoying; nothing that short is worth pinning anyway.
    if (text.length < 12) {
      setAnchor(null);
      return;
    }

    // Only inside a reply. Pinning your own question back into memory would
    // record the instrument's prompt as though it were its finding.
    const node = selection.anchorNode;
    const el = node instanceof Element ? node : node?.parentElement;
    if (!el?.closest(".prose-chat")) {
      setAnchor(null);
      return;
    }

    const rect = selection.getRangeAt(0).getBoundingClientRect();
    const base = container.getBoundingClientRect();

    // Centred over the selection, then pulled back inside the transcript.
    // `Math.max(8, …)` is applied last on purpose: when the container has no
    // width yet — during layout, or in a pane that has not been measured — the
    // upper clamp alone would produce a negative offset and park the bar off
    // the left edge of the modal.
    const BAR = 188;
    const wanted = rect.left - base.left + rect.width / 2 - BAR / 2;
    const rightLimit = Math.max(8, base.width - BAR);

    setAnchor({
      // Above the selection, or pinned to the top when it starts flush with the
      // top of the visible transcript and there is no room above it.
      top: Math.max(4, rect.top - base.top - 34),
      left: Math.max(8, Math.min(wanted, rightLimit)),
      text,
    });
    setSaved(null);
  }, [containerRef, scrollerRef]);

  useEffect(() => {
    const onUp = (e: MouseEvent) => {
      // A click on the bar itself must not re-read the selection it is acting on.
      if (barRef.current?.contains(e.target as Node)) return;
      // After the browser has settled the selection.
      setTimeout(readSelection, 0);
    };
    document.addEventListener("mouseup", onUp);
    return () => document.removeEventListener("mouseup", onUp);
  }, [readSelection]);

  /**
   * Follow the text when the transcript scrolls, rather than dismissing.
   *
   * Dismissing was the first version and it was subtly broken: a smooth scroll
   * from the auto-follow is still emitting events for a while after it looks
   * finished, so selecting a passage just after a reply arrived would raise the
   * bar and then have it vanish a beat later, for no reason the reader could
   * see. Re-reading the selection rect is both more robust and the behaviour
   * you would expect — the bar belongs to the text, so it goes where the text
   * goes, and only leaves when the selection does.
   */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !anchor) return;
    const onScroll = () => readSelection();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [anchor, scrollerRef, readSelection]);

  // `chartName` rather than `chart` in the dependencies: the callback only ever
  // needs the name, and depending on the whole object would rebuild it every
  // time anything else about the chart changed.
  const chartName = chart?.name;

  const pin = useCallback(
    async (scope: MemoryScope) => {
      if (!anchor || !chartName) return;
      try {
        await fetch("/api/chat/memory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chartName, scope, text: anchor.text }),
        });
        setSaved(scope);
        // Long enough to register as confirmation, short enough not to sit in
        // the way of the next thing you want to read.
        setTimeout(() => {
          setAnchor(null);
          document.getSelection()?.removeAllRanges();
        }, 900);
      } catch {
        setAnchor(null);
      }
    },
    [anchor, chartName],
  );

  if (!anchor || !chart) return null;

  return (
    <div
      ref={barRef}
      style={{ top: anchor.top, left: anchor.left }}
      className="absolute z-20 flex items-center gap-2 border border-rule bg-surface-alt px-2 py-1 shadow-xl"
    >
      {saved ? (
        <span className="datum flex items-center gap-1.5 px-1 text-[0.5625rem] uppercase tracking-[0.16em] text-patina">
          <span aria-hidden>✓</span> pinned
        </span>
      ) : (
        <>
          <span className="datum px-1 text-[0.5625rem] uppercase tracking-[0.16em] text-bone-faint">
            pin to
          </span>
          {SCOPES.map((s) => (
            <button
              key={s.scope}
              type="button"
              onClick={() => pin(s.scope)}
              title={s.title}
              className={`datum border px-1.5 py-0.5 text-[0.5625rem] uppercase tracking-[0.16em] transition-colors ${
                s.scope === suggested
                  ? "border-patina-dim text-patina hover:border-patina"
                  : "border-rule text-bone-faint hover:text-bone"
              }`}
            >
              {s.label}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
