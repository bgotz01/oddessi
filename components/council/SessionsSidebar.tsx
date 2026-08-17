'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { type SavedSession } from './types';

interface Props {
    sessions: SavedSession[];
    open: boolean;
    hasMessages: boolean;
    anyLoading: boolean;
    onToggle: () => void;
    onSaveNew: () => void;
    onRestore: (s: SavedSession) => void;
    onDelete: (dbId: string) => void;
    onRename: (dbId: string, title: string) => void;
}

export default function SessionsSidebar({
    sessions, open, hasMessages, anyLoading,
    onToggle, onSaveNew, onRestore, onDelete, onRename,
}: Props) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState('');
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    function startEdit(s: SavedSession, e: React.MouseEvent) {
        e.stopPropagation();
        setEditingId(s.dbId);
        setEditingValue(s.title ?? s.firstQuestion);
        setTimeout(() => inputRef.current?.select(), 0);
    }

    function commitEdit(id: string) {
        const trimmed = editingValue.trim();
        setEditingId(null);
        onRename(id, trimmed);
    }

    function cancelEdit() {
        setEditingId(null);
    }

    return (
        // The rail on /council — the app's own stands down (see
        // components/sidebar.tsx). Saved sessions and nothing else: the chart is
        // switched from the header, and the one link out is at the foot.
        <aside className={`shrink-0 border-r border-rule bg-surface flex flex-col overflow-hidden transition-all duration-300 ${open ? 'w-52' : 'w-10'}`}>

            {/* collapsed rail */}
            {!open && (
                <button
                    onClick={onToggle}
                    aria-label="Expand sessions sidebar"
                    className="flex flex-col items-center gap-3 pt-4 w-full text-muted hover:text-gold-dim transition-colors"
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {sessions.length > 0 && (
                        <span className="font-plex text-[8px] tracking-[0.1em] text-muted/60">
                            {sessions.length}
                        </span>
                    )}
                </button>
            )}

            {/* expanded content */}
            {open && (
                <>
                    <div className="shrink-0 border-b border-gold-muted/15 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onToggle}
                                aria-label="Collapse sessions sidebar"
                                className="text-muted hover:text-gold-dim transition-colors"
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                    <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <span className="font-plex text-[8px] uppercase tracking-[0.45em] text-muted">
                                Sessions
                            </span>
                        </div>
                        <button
                            onClick={onSaveNew}
                            disabled={!hasMessages || anyLoading}
                            className="font-plex text-[8px] uppercase tracking-[0.35em] text-gold-dim hover:text-gold transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                        >
                            + Save
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-none">
                        {sessions.length === 0 ? (
                            <div className="px-4 py-6 font-cormorant text-sm italic text-muted/40 text-center leading-6">
                                No saved sessions yet.
                            </div>
                        ) : (
                            <div className="divide-y divide-gold-muted/10">
                                {sessions.map((s) => (
                                    <div key={s.dbId} className={`group relative px-3 py-2 hover:bg-surface-alt transition-colors ${confirmDeleteId === s.dbId ? 'bg-surface-alt' : ''}`}>

                                        {/* trash / confirm-delete — top-right */}
                                        {confirmDeleteId === s.dbId ? (
                                            <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-100">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(null); onDelete(s.dbId); }}
                                                    className="font-plex text-[8px] tracking-[0.2em] text-ember hover:text-[#d67f63] transition-colors"
                                                >
                                                    yes
                                                </button>
                                                <span className="text-muted/30 text-[8px]">/</span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(null); }}
                                                    className="font-plex text-[8px] tracking-[0.2em] text-muted hover:text-gold-dim transition-colors"
                                                >
                                                    no
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(s.dbId); }}
                                                aria-label="Delete session"
                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity text-muted hover:text-ember"
                                            >
                                                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                                    <path d="M2 3h8M5 3V2h2v1M4.5 3v6.5M7.5 3v6.5M3 3l.5 7h5L9 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        )}

                                        {/* title / inline edit */}
                                        {editingId === s.dbId ? (
                                            <input
                                                ref={inputRef}
                                                value={editingValue}
                                                onChange={(e) => setEditingValue(e.target.value)}
                                                onBlur={() => commitEdit(s.dbId)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') { e.preventDefault(); commitEdit(s.dbId); }
                                                    if (e.key === 'Escape') { e.preventDefault(); cancelEdit(); }
                                                }}
                                                className="w-full bg-transparent border-b border-gold-muted/40 font-cormorant text-[13px] text-gold-accent outline-none pb-0.5 pr-5"
                                            />
                                        ) : (
                                            <button onClick={() => onRestore(s)} className="w-full text-left pr-5">
                                                <p className="font-cormorant text-[13px] leading-5 text-gold-accent line-clamp-2">
                                                    {s.title ?? s.firstQuestion}
                                                </p>
                                            </button>
                                        )}

                                        {/* meta row: time + rename */}
                                        {editingId !== s.dbId && (
                                            <div className="mt-0.5 flex items-center justify-between">
                                                <span className="font-plex text-[8px] tracking-[0.2em] text-muted/40">
                                                    {s.savedAt.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                                </span>
                                                <button
                                                    onClick={(e) => startEdit(s, e)}
                                                    className="opacity-0 group-hover:opacity-60 hover:!opacity-100 font-plex text-[8px] tracking-[0.2em] text-muted hover:text-gold-accent transition-opacity"
                                                >
                                                    rename
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* The way out. This rail replaces the app's, so without it
                        the council is a dead end but for the logo. */}
                    <div className="shrink-0 border-t border-rule divide-y divide-rule">
                        <Link
                            href="/council/memory"
                            className="datum flex w-full border-l-2 border-transparent px-4 py-3 text-[0.5625rem] uppercase tracking-[0.22em] text-bone-faint transition-colors hover:border-gold-muted/40 hover:bg-surface-alt hover:text-gold-dim"
                        >
                            Memory
                        </Link>
                        <Link
                            href="/"
                            className="datum flex w-full px-4 py-3 text-[0.5625rem] uppercase tracking-[0.22em] text-bone-faint transition-colors hover:text-bone"
                        >
                            ← Oddessi
                        </Link>
                    </div>
                </>
            )}
        </aside>
    );
}
