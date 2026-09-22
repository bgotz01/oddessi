//components/western/compatibility/drawer.tsx
"use client";

import { useEffect, type ReactNode } from "react";
import { T } from "./compatibility-ui";

/**
 * The shared drawer shell.
 *
 * Three things on this page open one — an area, a friction axis, and the page's
 * own explanation — and the page is built on the rule that the surface carries
 * names and numbers while everything that explains them lives one click away.
 * That rule only works if opening one is free, so the shell is shared rather
 * than copied: one Escape handler, one overlay, one set of margins.
 */
export default function Drawer({
  eyebrow,
  title,
  onClose,
  children,
}: {
  eyebrow: string;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-void/80"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute top-0 right-0 h-full w-full max-w-xl overflow-y-auto border-l border-rule bg-surface px-8 py-9 sm:px-10"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className={`${T.micro} text-patina`}>{eyebrow}</p>
            <h3 className="inscription mt-3 text-[1.625rem] tracking-[0.07em] text-bone">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`${T.micro} shrink-0 text-bone-faint transition-colors hover:text-bone`}
          >
            Close ✕
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
}
