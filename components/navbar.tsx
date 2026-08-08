"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useChat } from "@/components/chat-provider";

const NAV = [
  { href: "/council", label: "Council" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { open, toggle } = useChat();

  return (
    <header className="flex shrink-0 items-baseline justify-between border-b border-rule px-6 py-4">
      <Link
        href="/"
        className="inscription text-[0.9375rem] text-bone transition-colors hover:text-patina"
      >
        Oddessi
        <span className="datum ml-2 text-[0.5625rem] uppercase tracking-[0.25em] text-bone-faint">
          journey home
        </span>
      </Link>

      <nav className="flex items-baseline gap-6">
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`datum text-[0.6875rem] uppercase tracking-[0.22em] transition-colors ${active ? "text-patina" : "text-bone-soft hover:text-bone"
                }`}
            >
              {item.label}
            </Link>
          );
        })}

        <button
          onClick={toggle}
          aria-pressed={open}
          className={`datum text-[0.6875rem] uppercase tracking-[0.22em] transition-colors ${open ? "text-patina" : "text-bone-soft hover:text-bone"
            }`}
        >
          Interface
        </button>
      </nav>
    </header>
  );
}
