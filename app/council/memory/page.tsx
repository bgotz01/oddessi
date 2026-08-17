'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useChart } from '@/components/chart-context';
import {
    dbLoadMemory, dbSaveMemoryCategory, dbCreateMemoryCategory,
    dbRenameMemoryCategory, dbDeleteMemoryCategory,
    type MemoryCategory,
} from '@/components/council/db';
import type { Chart } from '@/lib/charts';

// ─── types ─────────────────────────────────────────────────────────────────────

/**
 * A "bucket" is one chart's memory (or the Shared pool).
 * chartId = null → Shared.
 */
interface Bucket {
    chartId: string | null;
    label: string;
    /** The chart's name or "Shared". Used as the tab label. */
}

// ─── category section ──────────────────────────────────────────────────────────

interface CategorySectionProps {
    cat: MemoryCategory;
    draft: string;
    onDraftChange: (value: string) => void;
    onSave: () => void;
    onRename: (to: string) => void;
    onDelete: () => void;
}

function CategorySection({ cat, draft, onDraftChange, onSave, onRename, onDelete }: CategorySectionProps) {
    const [nameDraft, setNameDraft] = useState(cat.category);
    const isDirty = draft !== cat.content;

    // Keep name draft in sync if the category was renamed externally
    useEffect(() => { setNameDraft(cat.category); }, [cat.category]);

    function commitRename() {
        const next = nameDraft.trim();
        if (!next || next === cat.category) { setNameDraft(cat.category); return; }
        onRename(next);
    }

    return (
        <div className={`border transition-colors ${isDirty ? 'border-gold-muted/50' : 'border-gold-muted/15'}`}>
            {/* header */}
            <div className="flex items-center gap-2 border-b border-gold-muted/10 bg-surface-alt px-3 py-2">
                <input
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                    onBlur={commitRename}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                        if (e.key === 'Escape') setNameDraft(cat.category);
                    }}
                    aria-label={`Rename ${cat.category}`}
                    className="min-w-0 flex-1 border-b border-transparent bg-transparent px-1 py-0.5 font-cormorant text-base text-gold-accent outline-none transition-colors hover:border-gold-muted/20 focus:border-gold-muted/50"
                />
                {isDirty && (
                    <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember"
                        title="Unsaved changes"
                        aria-label="Unsaved changes"
                    />
                )}
                <button
                    onClick={onSave}
                    disabled={!isDirty}
                    className="shrink-0 font-plex text-[8px] uppercase tracking-[0.3em] text-gold-accent transition-colors hover:text-parchment-2 disabled:opacity-25"
                >
                    Save
                </button>
                <button
                    onClick={() => { if (confirm(`Delete memory topic "${cat.category}"?`)) onDelete(); }}
                    className="shrink-0 font-plex text-[8px] uppercase tracking-[0.3em] text-muted/60 transition-colors hover:text-ember"
                >
                    Delete
                </button>
            </div>

            {/* body */}
            <textarea
                value={draft}
                onChange={(e) => onDraftChange(e.target.value)}
                placeholder="No lessons yet. Write your own, or distil them from a council session."
                spellCheck={false}
                rows={Math.min(16, Math.max(3, draft.split('\n').length + 1))}
                className="w-full resize-y bg-surface px-4 py-3 font-cormorant text-base leading-7 text-parchment placeholder-muted/40 outline-none scrollbar-none"
            />
        </div>
    );
}

// ─── bucket view ───────────────────────────────────────────────────────────────

interface BucketViewProps {
    chartId: string | null;
    label: string;
}

function BucketView({ chartId, label }: BucketViewProps) {
    const [categories, setCategories] = useState<MemoryCategory[]>([]);
    const [drafts, setDrafts] = useState<Record<string, string>>({});
    const [newCatName, setNewCatName] = useState('');
    const [savedFlash, setSavedFlash] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const cats = await dbLoadMemory(chartId);
            setCategories(cats);
            // Initialise drafts to stored content; don't overwrite in-progress edits.
            setDrafts((prev) => {
                const next = { ...prev };
                for (const c of cats) {
                    if (next[c.category] === undefined) next[c.category] = c.content;
                }
                return next;
            });
        } finally {
            setLoading(false);
        }
    }, [chartId]);

    useEffect(() => {
        setCategories([]);
        setDrafts({});
        setLoading(true);
        load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartId]);

    function storedContent(category: string) {
        return categories.find((c) => c.category === category)?.content ?? '';
    }

    async function handleSave(category: string) {
        const content = drafts[category] ?? storedContent(category);
        setCategories((prev) => prev.map((c) => c.category === category ? { ...c, content } : c));
        await dbSaveMemoryCategory(category, content, chartId);
        setSavedFlash(category);
        setTimeout(() => setSavedFlash((f) => f === category ? null : f), 1800);
    }

    async function handleRename(from: string, to: string) {
        setDrafts((prev) => {
            const next = { ...prev };
            if (next[from] !== undefined) { next[to] = next[from]; delete next[from]; }
            return next;
        });
        await dbRenameMemoryCategory(from, to, chartId);
        await load();
    }

    async function handleDelete(category: string) {
        setCategories((prev) => prev.filter((c) => c.category !== category));
        setDrafts((prev) => { const next = { ...prev }; delete next[category]; return next; });
        await dbDeleteMemoryCategory(category, chartId);
    }

    async function handleAddCategory() {
        const name = newCatName.trim();
        if (!name) return;
        if (categories.some((c) => c.category === name)) return;
        setNewCatName('');
        await dbCreateMemoryCategory(name, chartId);
        await load();
    }

    const allCategories = [
        ...categories.map((c) => c.category),
        ...Object.keys(drafts).filter((k) => !categories.some((c) => c.category === k)),
    ];

    const dirtyCount = allCategories.filter((cat) => {
        const d = drafts[cat];
        return d !== undefined && d !== storedContent(cat);
    }).length;

    async function handleSaveAll() {
        for (const cat of allCategories) {
            const d = drafts[cat];
            if (d !== undefined && d !== storedContent(cat)) await handleSave(cat);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <span className="animate-pulse font-plex text-[9px] uppercase tracking-[0.4em] text-muted">
                    Loading…
                </span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {/* section description */}
            <p className="font-cormorant text-sm leading-6 text-muted/70">
                {chartId === null
                    ? 'Memory shared across all charts — general notes, working instructions, and anything that applies to every reading.'
                    : `Memory scoped to ${label}. Topics here are injected when the council reads this chart.`}
            </p>

            {/* category list */}
            {allCategories.length === 0 && (
                <div className="py-12 text-center font-cormorant text-sm text-muted/40">
                    No topics yet. Add one below.
                </div>
            )}
            {allCategories.map((cat) => (
                <CategorySection
                    key={cat}
                    cat={{ category: cat, content: storedContent(cat) }}
                    draft={drafts[cat] ?? storedContent(cat)}
                    onDraftChange={(val) => setDrafts((prev) => ({ ...prev, [cat]: val }))}
                    onSave={() => handleSave(cat)}
                    onRename={(to) => handleRename(cat, to)}
                    onDelete={() => handleDelete(cat)}
                />
            ))}

            {/* footer controls */}
            <div className="flex items-center gap-3 border-t border-gold-muted/15 pt-4">
                <input
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddCategory(); }}
                    placeholder="New topic…"
                    className="w-44 border-b border-gold-muted/20 bg-transparent px-1 py-1 font-cormorant text-sm text-parchment placeholder-muted/40 outline-none focus:border-gold-muted/50"
                />
                <button
                    onClick={handleAddCategory}
                    disabled={!newCatName.trim()}
                    className="font-plex text-[8px] uppercase tracking-[0.3em] text-gold-accent transition-colors hover:text-parchment-2 disabled:opacity-30"
                >
                    Add
                </button>

                <div className="ml-auto flex items-center gap-4">
                    {savedFlash && (
                        <span className="font-plex text-[8px] uppercase tracking-[0.35em] text-gold-accent/70">
                            Saved
                        </span>
                    )}
                    {dirtyCount > 0 && (
                        <button
                            onClick={handleSaveAll}
                            className="border border-gold-muted/40 bg-surface-alt px-4 py-1.5 font-plex text-[9px] uppercase tracking-[0.4em] text-gold transition-colors hover:border-gold-muted/70 hover:text-parchment-2"
                        >
                            Save {dirtyCount > 1 ? `all ${dirtyCount}` : 'changes'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── page ──────────────────────────────────────────────────────────────────────

export default function CouncilMemoryPage() {
    const { chart, charts } = useChart();

    // The selected bucket: null = Shared, otherwise the chart's id.
    // Default to the active chart if one exists, otherwise Shared.
    const [selectedChartId, setSelectedChartId] = useState<string | null>(
        () => chart?.id ?? null,
    );

    // Keep the default in sync if the app-level chart changes and the user
    // hasn't manually picked a tab yet.
    const [userPicked, setUserPicked] = useState(false);
    useEffect(() => {
        if (!userPicked) setSelectedChartId(chart?.id ?? null);
    }, [chart?.id, userPicked]);

    function selectBucket(id: string | null) {
        setSelectedChartId(id);
        setUserPicked(true);
    }

    // Build the tab list: one per chart, plus Shared at the end.
    const buckets: Bucket[] = [
        ...charts.map((c: Chart) => ({ chartId: c.id, label: c.name })),
        { chartId: null, label: 'Shared' },
    ];

    const activeLabel = buckets.find((b) => b.chartId === selectedChartId)?.label ?? 'Shared';

    return (
        <main className="flex h-full flex-col overflow-hidden bg-void text-parchment">
            {/* subtle background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(107,175,154,0.08),transparent_40%)]" />
                <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,var(--color-rule)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-rule)_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>

            <div className="relative z-10 flex flex-1 min-h-0">
                {/* sidebar */}
                <aside className="shrink-0 w-44 border-r border-rule bg-surface flex flex-col">
                    <div className="shrink-0 border-b border-gold-muted/15 px-4 py-3">
                        <div className="font-plex text-[8px] uppercase tracking-[0.45em] text-muted">Council</div>
                    </div>

                    <nav className="flex-1 overflow-y-auto scrollbar-none py-2">
                        {/* Chart buckets */}
                        {charts.map((c: Chart) => {
                            const active = selectedChartId === c.id;
                            return (
                                <button
                                    key={c.id}
                                    onClick={() => selectBucket(c.id)}
                                    className={`datum flex w-full items-center border-l-2 px-4 py-2.5 text-left text-[0.6rem] uppercase tracking-[0.22em] transition-colors ${
                                        active
                                            ? 'border-gold-muted/60 bg-surface-alt text-gold-accent'
                                            : 'border-transparent text-muted hover:bg-surface-alt hover:text-gold-dim'
                                    }`}
                                >
                                    <span className="truncate">{c.name}</span>
                                </button>
                            );
                        })}

                        {/* Shared bucket */}
                        {(() => {
                            const active = selectedChartId === null;
                            return (
                                <button
                                    onClick={() => selectBucket(null)}
                                    className={`datum flex w-full items-center border-l-2 px-4 py-2.5 text-left text-[0.6rem] uppercase tracking-[0.22em] transition-colors ${
                                        active
                                            ? 'border-gold-muted/60 bg-surface-alt text-gold-accent'
                                            : 'border-transparent text-muted hover:bg-surface-alt hover:text-gold-dim'
                                    }`}
                                >
                                    Shared
                                </button>
                            );
                        })()}
                    </nav>

                    {/* nav footer */}
                    <div className="shrink-0 border-t border-rule divide-y divide-rule">
                        <Link
                            href="/council"
                            className="datum flex w-full items-center px-4 py-3 text-[0.5625rem] uppercase tracking-[0.22em] text-bone-faint transition-colors hover:text-bone"
                        >
                            ← Council
                        </Link>
                    </div>
                </aside>

                {/* main content */}
                <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
                    {/* header */}
                    <header className="shrink-0 border-b border-gold-muted/20 px-8 pt-6 pb-4">
                        <div className="font-plex text-[9px] uppercase tracking-[0.5em] text-muted">Council</div>
                        <h1 className="mt-0.5 font-cinzel text-xl tracking-[0.06em] text-parchment-4">
                            Memory
                        </h1>
                        <p className="mt-1.5 font-cormorant text-sm text-muted/60">
                            {activeLabel === 'Shared'
                                ? 'Shared across all charts'
                                : activeLabel}
                        </p>
                    </header>

                    {/* scrollable body */}
                    <div className="flex-1 overflow-y-auto scrollbar-none px-8 py-6">
                        <BucketView
                            key={selectedChartId ?? '__shared__'}
                            chartId={selectedChartId}
                            label={activeLabel}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
