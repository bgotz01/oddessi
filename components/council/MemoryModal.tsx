'use client';

import { useEffect, useState } from 'react';
import type { MemoryCategory, MemoryRoute } from './db';

interface Props {
    categories: MemoryCategory[];
    selected: string[];               // categories attached to the current chat
    routes: MemoryRoute[] | null;     // distilled lessons, folded into the drafts on arrival
    summarizing: boolean;
    error?: string | null;
    canSummarize: boolean;
    // Unsaved edits per category. Held by the parent so they survive closing the modal.
    drafts: Record<string, string>;
    setDrafts: (fn: (prev: Record<string, string>) => Record<string, string>) => void;
    onClose: () => void;
    onToggleSelected: (category: string) => void;
    onSaveCategory: (category: string, content: string) => void;
    onCreateCategory: (name: string) => void;
    onRenameCategory: (from: string, to: string) => void;
    onDeleteCategory: (category: string) => void;
    onSummarize: () => void;
    onDismissRoutes: () => void;   // called once the distilled lessons have been folded into the drafts
}

function Check({ on }: { on: boolean }) {
    return (
        <span className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors ${on ? 'border-gold-muted/70 text-gold-accent' : 'border-muted/30 text-transparent'}`}>
            <svg width="7" height="7" viewBox="0 0 8 8" fill="none" aria-hidden="true"><path d="M1 4L3 6.5L7 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
    );
}

export default function MemoryModal({
    categories, selected, routes, summarizing, error, canSummarize, drafts, setDrafts,
    onClose, onToggleSelected, onSaveCategory, onCreateCategory, onRenameCategory, onDeleteCategory,
    onSummarize, onDismissRoutes,
}: Props) {
    const [newCat, setNewCat] = useState('');
    const [saved, setSaved] = useState(false);
    // In-progress category renames, keyed by the current name
    const [nameDrafts, setNameDrafts] = useState<Record<string, string>>({});

    const storedFor = (cat: string) => categories.find((c) => c.category === cat)?.content ?? '';
    const valueFor = (cat: string) => drafts[cat] ?? storedFor(cat);
    const isDirty = (cat: string) => drafts[cat] !== undefined && drafts[cat] !== storedFor(cat);

    // Every category is shown at once: the stored ones, plus any the distiller
    // proposed that don't exist yet.
    const allCats = [
        ...categories.map((c) => c.category),
        ...Object.keys(drafts).filter((k) => !categories.some((c) => c.category === k)),
    ];
    const dirtyCats = allCats.filter(isDirty);

    useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [onClose]);

    // Fold distilled lessons straight into the drafts — they land as editable text
    // in the documents below, not in a separate list to triage.
    useEffect(() => {
        if (!routes || routes.length === 0) return;
        setDrafts((prev) => {
            const next = { ...prev };
            for (const r of routes) {
                const base = (next[r.category] ?? storedFor(r.category)).trim();
                const additions = r.lessons.map((l) => `- ${l}`).join('\n');
                next[r.category] = base ? `${base}\n${additions}\n` : `${additions}\n`;
            }
            return next;
        });
        onDismissRoutes(); // consumed — don't fold the same lessons in twice
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routes]);

    function handleSaveAll() {
        for (const cat of dirtyCats) onSaveCategory(cat, valueFor(cat));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    function handleAddCategory() {
        const name = newCat.trim();
        if (!name || allCats.includes(name)) return;
        onCreateCategory(name);
        setNewCat('');
    }

    function commitRename(cat: string) {
        const next = (nameDrafts[cat] ?? cat).trim();
        setNameDrafts((p) => { const c = { ...p }; delete c[cat]; return c; });
        if (!next || next === cat || allCats.includes(next)) return;
        // carry any unsaved edits over to the new name
        setDrafts((prev) => {
            if (prev[cat] === undefined) return prev;
            const c = { ...prev };
            c[next] = c[cat];
            delete c[cat];
            return c;
        });
        onRenameCategory(cat, next);
    }

    return (
        <>
            <div className="fixed inset-0 z-40 bg-void/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Council Memory"
                className="fixed left-1/2 top-1/2 z-50 flex max-h-[86vh] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col border border-gold-muted/30 bg-surface shadow-2xl"
            >
                {/* header */}
                <div className="flex shrink-0 items-center justify-between border-b border-gold-muted/20 px-6 py-4">
                    <div>
                        <div className="font-plex text-[9px] uppercase tracking-[0.5em] text-muted">Council</div>
                        <h2 className="mt-0.5 font-cinzel text-base tracking-[0.06em] text-gold">Memory</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onSummarize}
                            disabled={!canSummarize || summarizing}
                            className={`flex items-center gap-1.5 font-plex text-[9px] uppercase tracking-[0.35em] transition-colors ${summarizing
                                ? 'animate-pulse text-ember'
                                : 'text-gold-accent hover:text-parchment-2 disabled:opacity-40'}`}
                        >
                            {summarizing && <span className="h-1.5 w-1.5 animate-ping rounded-full bg-ember" />}
                            {summarizing ? 'Distilling…' : 'Summarize chat'}
                        </button>
                        <button onClick={onClose} className="font-plex text-[9px] uppercase tracking-[0.4em] text-muted hover:text-gold-dim transition-colors">
                            Done
                        </button>
                    </div>
                </div>

                <div className="shrink-0 px-6 pt-3 pb-2 font-cormorant text-sm leading-6 text-muted/70">
                    Lessons distilled from past sessions, grouped by topic. Distilling a chat writes straight into
                    these documents — edit any of them, then save. Checked topics are attached to the current chat.
                </div>

                {error && (
                    <div className="mx-6 mb-2 shrink-0 border border-ember-dim/40 bg-[#150f0d] px-4 py-3 font-cormorant text-sm text-[#d67f63]">
                        {error}
                    </div>
                )}

                {/* one section: every topic's document, all editable */}
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto scrollbar-none px-6 pb-2">
                    {allCats.length === 0 && (
                        <div className="py-10 text-center font-cormorant text-sm text-muted/50">
                            No topics yet. Add one below, or distil a chat.
                        </div>
                    )}
                    {allCats.map((cat) => (
                        <div key={cat} className={`border transition-colors ${isDirty(cat) ? 'border-gold-muted/45' : 'border-gold-muted/15'}`}>
                            <div className="flex items-center gap-2 border-b border-gold-muted/10 bg-surface-alt px-3 py-2">
                                <button onClick={() => onToggleSelected(cat)} aria-label={selected.includes(cat) ? `Detach ${cat}` : `Attach ${cat}`} className="shrink-0">
                                    <Check on={selected.includes(cat)} />
                                </button>
                                <input
                                    value={nameDrafts[cat] ?? cat}
                                    onChange={(e) => setNameDrafts((p) => ({ ...p, [cat]: e.target.value }))}
                                    onBlur={() => commitRename(cat)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                                        else if (e.key === 'Escape') setNameDrafts((p) => { const c = { ...p }; delete c[cat]; return c; });
                                    }}
                                    aria-label={`Rename ${cat}`}
                                    className="min-w-0 flex-1 border-b border-transparent bg-transparent px-1 py-0.5 font-cormorant text-base text-gold-accent outline-none transition-colors hover:border-gold-muted/20 focus:border-gold-muted/50"
                                />
                                {isDirty(cat) && (
                                    <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-ember" title="Unsaved changes" aria-label="Unsaved changes" />
                                )}
                                <button
                                    onClick={() => { if (confirm(`Delete memory topic “${cat}”?`)) onDeleteCategory(cat); }}
                                    className="shrink-0 font-plex text-[8px] uppercase tracking-[0.3em] text-muted/60 transition-colors hover:text-gold-dim"
                                >
                                    Delete
                                </button>
                            </div>
                            <textarea
                                value={valueFor(cat)}
                                onChange={(e) => setDrafts((p) => ({ ...p, [cat]: e.target.value }))}
                                placeholder="No lessons yet. Distil them from a chat, or write your own…"
                                spellCheck={false}
                                rows={Math.min(14, Math.max(3, valueFor(cat).split('\n').length))}
                                className="w-full resize-y bg-surface px-4 py-3 font-cormorant text-base leading-7 text-parchment placeholder-muted/40 outline-none scrollbar-none"
                            />
                        </div>
                    ))}
                </div>

                {/* footer: add a topic, save everything */}
                <div className="flex shrink-0 items-center gap-3 border-t border-gold-muted/15 px-6 py-3">
                    <input
                        value={newCat}
                        onChange={(e) => setNewCat(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddCategory(); }}
                        placeholder="New topic…"
                        className="w-44 border-b border-gold-muted/20 bg-transparent px-1 py-1 font-cormorant text-sm text-parchment placeholder-muted/40 outline-none focus:border-gold-muted/50"
                    />
                    <button onClick={handleAddCategory} disabled={!newCat.trim()} className="font-plex text-[8px] uppercase tracking-[0.3em] text-gold-accent transition-colors hover:text-parchment-2 disabled:opacity-30">Add</button>

                    <div className="ml-auto flex items-center gap-4">
                        {saved && <span className="font-plex text-[8px] uppercase tracking-[0.35em] text-gold-accent/70">Saved</span>}
                        <button
                            onClick={handleSaveAll}
                            disabled={dirtyCats.length === 0}
                            className="border border-gold-muted/40 bg-surface-alt px-4 py-1.5 font-plex text-[9px] uppercase tracking-[0.4em] text-gold transition-colors hover:border-gold-muted/70 hover:text-parchment-2 disabled:opacity-30"
                        >
                            {dirtyCats.length > 1 ? `Save ${dirtyCats.length}` : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
