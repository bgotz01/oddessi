'use client';

import { useState, useEffect, useRef } from 'react';
import { modelTier, TIER_LABELS } from '@/lib/models';

// ─── types ────────────────────────────────────────────────────────────────────

export interface CustomModel {
    id: string;
    label: string;
    cost: string;
    inputCost: number;
    outputCost: number;
}

interface OpenRouterModel {
    id: string;
    name: string;
    pricing: { prompt: string; completion: string };
}

const LS_CUSTOM_MODELS_KEY = 'panteon_custom_models_v1';

// ─── storage helpers ──────────────────────────────────────────────────────────

export function loadCustomModels(): CustomModel[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(LS_CUSTOM_MODELS_KEY);
        return raw ? (JSON.parse(raw) as CustomModel[]) : [];
    } catch { return []; }
}

export function saveCustomModels(models: CustomModel[]) {
    localStorage.setItem(LS_CUSTOM_MODELS_KEY, JSON.stringify(models));
}

// ─── component ────────────────────────────────────────────────────────────────

interface Props {
    open: boolean;
    onClose: () => void;
    onAdd: (model: CustomModel) => void;
    existing: CustomModel[];
}

export default function CustomModelModal({ open, onClose, onAdd, existing }: Props) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<OpenRouterModel[]>([]);
    const [fetching, setFetching] = useState(false);
    const [fetchError, setFetchError] = useState('');

    // manual entry
    const [manualId, setManualId] = useState('');
    const [manualLabel, setManualLabel] = useState('');
    const [manualInput, setManualInput] = useState('');
    const [manualOutput, setManualOutput] = useState('');
    const [manualTab, setManualTab] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // focus search on open
    useEffect(() => {
        if (open) {
            setQuery('');
            setResults([]);
            setFetchError('');
            setManualId('');
            setManualLabel('');
            setManualInput('');
            setManualOutput('');
            setManualTab(false);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    // keyboard close
    useEffect(() => {
        if (!open) return;
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [open, onClose]);

    // debounced search against OpenRouter API
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!query.trim() || manualTab) { setResults([]); return; }
        debounceRef.current = setTimeout(async () => {
            setFetching(true);
            setFetchError('');
            try {
                const res = await fetch('https://openrouter.ai/api/v1/models');
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json() as { data: OpenRouterModel[] };
                const q = query.toLowerCase();
                const filtered = data.data
                    .filter((m) => m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q))
                    .slice(0, 20);
                setResults(filtered);
            } catch (err) {
                setFetchError(err instanceof Error ? err.message : 'Failed to fetch');
                setResults([]);
            } finally {
                setFetching(false);
            }
        }, 350);
    }, [query, manualTab]);

    function formatCost(prompt: string, completion: string): { cost: string; inputCost: number; outputCost: number } {
        // OpenRouter returns cost per token; multiply by 1M for display
        const inp = parseFloat(prompt) * 1_000_000;
        const out = parseFloat(completion) * 1_000_000;
        const fmt = (n: number) => n === 0 ? 'Free' : `$${n.toFixed(2)}`;
        const cost = inp === 0 && out === 0 ? 'Free' : `${fmt(inp)} / ${fmt(out)}`;
        return { cost, inputCost: inp, outputCost: out };
    }

    function handlePickResult(m: OpenRouterModel) {
        const { cost, inputCost, outputCost } = formatCost(m.pricing.prompt, m.pricing.completion);
        onAdd({ id: m.id, label: m.name, cost, inputCost, outputCost });
        onClose();
    }

    function handleManualAdd() {
        const id = manualId.trim();
        const label = manualLabel.trim() || id;
        const inputCost = parseFloat(manualInput) || 0;
        const outputCost = parseFloat(manualOutput) || 0;
        if (!id) return;
        const fmt = (n: number) => n === 0 ? 'Free' : `$${n.toFixed(2)}`;
        const cost = inputCost === 0 && outputCost === 0 ? 'Free' : `${fmt(inputCost)} / ${fmt(outputCost)}`;
        onAdd({ id, label, cost, inputCost, outputCost });
        onClose();
    }

    if (!open) return null;

    const alreadyAdded = (id: string) => existing.some((m) => m.id === id);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="relative w-full max-w-lg bg-surface border border-gold-muted/30 shadow-2xl mx-4">

                {/* header */}
                <div className="border-b border-gold-muted/20 px-6 py-4 flex items-center justify-between">
                    <h2 className="font-cinzel text-sm tracking-[0.12em] text-parchment-4">
                        Add Custom Model
                    </h2>
                    <button
                        onClick={onClose}
                        className="font-plex text-[10px] uppercase tracking-[0.4em] text-muted hover:text-gold-accent transition-colors"
                    >
                        Close
                    </button>
                </div>

                {/* tabs */}
                <div className="flex border-b border-gold-muted/15">
                    {(['search', 'manual'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setManualTab(tab === 'manual')}
                            className={`flex-1 py-2.5 font-plex text-[9px] uppercase tracking-[0.4em] transition-colors ${(tab === 'manual') === manualTab
                                ? 'text-gold-accent border-b-2 border-gold-muted/60 -mb-px'
                                : 'text-muted hover:text-gold-dim'
                                }`}
                        >
                            {tab === 'search' ? 'Search OpenRouter' : 'Enter Manually'}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    {!manualTab ? (
                        /* ── search tab ── */
                        <div className="space-y-4">
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by name or ID…"
                                className="w-full bg-transparent border-b border-gold-muted/30 font-cormorant text-base text-parchment placeholder-muted/50 outline-none pb-2 focus:border-gold-muted/60 transition-colors"
                            />

                            <div className="min-h-[200px] max-h-[280px] overflow-y-auto scrollbar-none space-y-px">
                                {fetching && (
                                    <div className="flex items-center gap-2 py-4 justify-center">
                                        <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                                        <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '200ms' }} />
                                        <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '400ms' }} />
                                    </div>
                                )}
                                {fetchError && (
                                    <p className="font-plex text-[9px] text-gold-dim py-4 text-center">{fetchError}</p>
                                )}
                                {!fetching && !fetchError && query && results.length === 0 && (
                                    <p className="font-plex text-[9px] uppercase tracking-[0.3em] text-muted/50 py-4 text-center">No results</p>
                                )}
                                {!query && (
                                    <p className="font-plex text-[9px] uppercase tracking-[0.3em] text-muted/40 py-4 text-center">Type to search</p>
                                )}
                                {results.map((m) => {
                                    const { cost, inputCost, outputCost } = formatCost(m.pricing.prompt, m.pricing.completion);
                                    const tier = modelTier({ outputCost });
                                    const tierColors: Record<string, string> = {
                                        low: 'text-patina',
                                        mid: 'text-gold-accent',
                                        high: 'text-ember',
                                    };
                                    const added = alreadyAdded(m.id);
                                    return (
                                        <button
                                            key={m.id}
                                            onClick={() => !added && handlePickResult(m)}
                                            disabled={added}
                                            className={`w-full text-left px-3 py-2.5 transition-colors group ${added ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-alt'}`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="font-cormorant text-sm text-gold-accent leading-5 truncate">{m.name}</p>
                                                    <p className="font-plex text-[8px] tracking-[0.1em] text-muted truncate">{m.id}</p>
                                                </div>
                                                <div className="shrink-0 text-right">
                                                    <p className={`font-plex text-[8px] tracking-[0.1em] ${tierColors[tier]}`}>{cost}</p>
                                                    <p className="font-plex text-[7px] tracking-[0.1em] text-muted/50 mt-0.5">{TIER_LABELS[tier].split('·')[0].trim()}</p>
                                                </div>
                                            </div>
                                            {added && (
                                                <p className="font-plex text-[7px] tracking-[0.2em] uppercase text-muted/50 mt-0.5">already added</p>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        /* ── manual tab ── */
                        <div className="space-y-5">
                            <div>
                                <label className="block font-plex text-[8px] uppercase tracking-[0.4em] text-muted mb-2">
                                    Model ID <span className="text-gold-dim">*</span>
                                </label>
                                <input
                                    ref={inputRef}
                                    value={manualId}
                                    onChange={(e) => setManualId(e.target.value)}
                                    placeholder="e.g. anthropic/claude-sonnet-5"
                                    className="w-full bg-transparent border-b border-gold-muted/30 font-plex text-sm text-parchment placeholder-muted/40 outline-none pb-2 focus:border-gold-muted/60 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block font-plex text-[8px] uppercase tracking-[0.4em] text-muted mb-2">
                                    Display Name
                                </label>
                                <input
                                    value={manualLabel}
                                    onChange={(e) => setManualLabel(e.target.value)}
                                    placeholder="Defaults to model ID"
                                    className="w-full bg-transparent border-b border-gold-muted/30 font-plex text-sm text-parchment placeholder-muted/40 outline-none pb-2 focus:border-gold-muted/60 transition-colors"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block font-plex text-[8px] uppercase tracking-[0.4em] text-muted mb-2">
                                        Input $/M
                                    </label>
                                    <input
                                        value={manualInput}
                                        onChange={(e) => setManualInput(e.target.value)}
                                        placeholder="0.00"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="w-full bg-transparent border-b border-gold-muted/30 font-plex text-sm text-parchment placeholder-muted/40 outline-none pb-2 focus:border-gold-muted/60 transition-colors"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-plex text-[8px] uppercase tracking-[0.4em] text-muted mb-2">
                                        Output $/M
                                    </label>
                                    <input
                                        value={manualOutput}
                                        onChange={(e) => setManualOutput(e.target.value)}
                                        placeholder="0.00"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="w-full bg-transparent border-b border-gold-muted/30 font-plex text-sm text-parchment placeholder-muted/40 outline-none pb-2 focus:border-gold-muted/60 transition-colors"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleManualAdd}
                                disabled={!manualId.trim()}
                                className="mt-2 w-full border border-gold-muted/40 py-2.5 font-plex text-[9px] uppercase tracking-[0.4em] text-gold-accent hover:border-gold-muted/70 hover:text-parchment-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Add Model
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
