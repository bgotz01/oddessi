'use client';

import type { Chart } from '@/lib/charts';
import type { MemoryCategory } from './db';
import type { Usage } from './types';
import ModelSelect from '@/components/ModelSelect';

// Re-exported from types so callers don't need a separate import
export type { Usage };

interface Props {
    // chart
    chart: Chart | null;
    charts: { id: string; name: string }[];
    chartAttached: boolean;
    chartReading: boolean;
    onSelectChart: (id: string) => void;
    onToggleChartAttached: () => void;
    onReadChart: () => void;

    // modals — open state drives the active colour
    promptModalOpen: boolean;
    refsOpen: boolean;
    memoryOpen: boolean;
    usageOpen: boolean;

    // refs
    attachedRefsCount: number;
    autoRef: boolean;

    // memory
    memoryEnabled: boolean;
    memoryCategories: MemoryCategory[];
    selectedMemoryCats: string[];
    memoryUnsavedCount: number;
    memorySummarizing: boolean;

    // session state
    hasMessages: boolean;
    anyLoading: boolean;

    // usage
    sessionUsage: { totalTokens: number; cost: number } | null;
    formatTokens: (n: number) => string;
    formatSpend: (n: number) => string;

    // global model
    globalModel: string;
    onGlobalModelChange: (m: string) => void;

    // callbacks
    onOpenPrompts: () => void;
    onOpenRefs: () => void;
    onOpenMemory: () => void;
    onToggleMemoryEnabled: () => void;
    onSummarize: () => void;
    onSaveAndNew: () => void;
    onOpenUsage: () => void;
}

const SEP = <span className="w-px h-3 bg-gold-muted/15 shrink-0" />;

export default function SessionControlsRow({
    chart, charts, chartAttached, chartReading,
    onSelectChart, onToggleChartAttached, onReadChart,
    promptModalOpen, refsOpen, memoryOpen, usageOpen,
    attachedRefsCount, autoRef,
    memoryEnabled, memoryCategories, selectedMemoryCats, memoryUnsavedCount, memorySummarizing,
    hasMessages, anyLoading,
    sessionUsage, formatTokens, formatSpend,
    globalModel, onGlobalModelChange,
    onOpenPrompts, onOpenRefs, onOpenMemory, onToggleMemoryEnabled,
    onSummarize, onSaveAndNew, onOpenUsage,
}: Props) {
    return (
        <div className="mt-3 flex items-center justify-center gap-6 border-t border-gold-muted/10 pt-3">

            {/* ── chart selector + attach dot ─────────────────────────────── */}
            <div className="flex items-center gap-2">
                {chart ? (
                    <select
                        value={chart.id}
                        onChange={(e) => onSelectChart(e.target.value)}
                        disabled={charts.length <= 1}
                        aria-label="Chart under study"
                        className={`appearance-none bg-transparent font-plex text-[10px] uppercase tracking-[0.3em] outline-none cursor-pointer transition-colors disabled:cursor-default ${chartAttached ? 'text-gold-accent hover:text-[#8fd0ba]' : 'text-muted'}`}
                    >
                        {charts.map((c) => (
                            <option key={c.id} value={c.id} className="bg-surface-alt normal-case tracking-normal text-sm text-gold-accent">
                                {c.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span className="font-plex text-[10px] uppercase tracking-[0.4em] text-muted">No chart</span>
                )}
                <button
                    onClick={onToggleChartAttached}
                    disabled={!chart}
                    aria-label={chartAttached ? 'Chart attached — click to ask without it' : 'Chart detached — click to attach it'}
                    title={chartAttached
                        ? 'Chart attached to every message — click to ask without it'
                        : 'Chart detached — the council is answering about astrology in general'}
                    className={`transition-colors disabled:opacity-30 ${chart && chartAttached ? 'text-gold-accent hover:text-gold-dim' : 'text-muted/40 hover:text-muted'}`}
                >
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" />
                        {chart && chartAttached && <circle cx="5" cy="5" r="2" fill="currentColor" />}
                    </svg>
                </button>
            </div>

            {SEP}

            {/* ── read chart ──────────────────────────────────────────────── */}
            <button
                onClick={onReadChart}
                disabled={!chart || chartReading}
                title="Extract the structural character and uniqueness of the attached chart"
                className={`flex items-center gap-1.5 font-plex text-[10px] uppercase tracking-[0.4em] transition-colors ${chartReading
                    ? 'animate-pulse text-ember'
                    : 'text-muted hover:text-gold-dim disabled:opacity-30'}`}
            >
                {chartReading && <span className="h-1.5 w-1.5 animate-ping rounded-full bg-ember" />}
                {chartReading ? 'Reading…' : 'Read chart'}
            </button>

            {SEP}

            {/* ── prompts ─────────────────────────────────────────────────── */}
            <button
                onClick={onOpenPrompts}
                className={`font-plex text-[10px] uppercase tracking-[0.4em] transition-colors ${promptModalOpen ? 'text-gold-accent' : 'text-muted hover:text-gold-dim'}`}
            >
                Prompts
            </button>

            {SEP}

            {/* ── references ──────────────────────────────────────────────── */}
            <button
                onClick={onOpenRefs}
                className={`font-plex text-[10px] uppercase tracking-[0.4em] transition-colors ${attachedRefsCount > 0 || autoRef ? 'text-gold-accent' : 'text-muted hover:text-gold-dim'}`}
            >
                References{attachedRefsCount > 0 ? ` (${attachedRefsCount})` : autoRef ? ' (auto)' : ''}
            </button>

            {SEP}

            {/* ── memory ──────────────────────────────────────────────────── */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onOpenMemory}
                    className={`font-plex text-[10px] uppercase tracking-[0.4em] transition-colors ${memoryOpen ? 'text-gold-accent' : 'text-muted hover:text-gold-dim'}`}
                >
                    Memory{memoryEnabled && memoryCategories.length > 0 && selectedMemoryCats.length < memoryCategories.length
                        ? ` (${selectedMemoryCats.length}/${memoryCategories.length})`
                        : ''}
                </button>
                {memoryUnsavedCount > 0 && (
                    <span
                        className="h-1.5 w-1.5 rounded-full bg-ember"
                        title={`${memoryUnsavedCount} memory ${memoryUnsavedCount === 1 ? 'category has' : 'categories have'} unsaved changes`}
                    />
                )}
                <button
                    onClick={onToggleMemoryEnabled}
                    aria-label={memoryEnabled ? 'Memory on — click for a clean chat' : 'Memory off — click to enable'}
                    title={memoryEnabled ? 'Memory on — click for a clean chat' : 'Memory off — click to enable'}
                    className={`transition-colors ${memoryEnabled ? 'text-gold-accent hover:text-gold-dim' : 'text-muted/40 hover:text-muted'}`}
                >
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" />
                        {memoryEnabled && <circle cx="5" cy="5" r="2" fill="currentColor" />}
                    </svg>
                </button>
            </div>

            {/* ── summarize + save & new (only when there are messages) ───── */}
            {hasMessages && (
                <>
                    {SEP}
                    <button
                        onClick={onSummarize}
                        disabled={anyLoading || memorySummarizing}
                        className={`flex items-center gap-1.5 font-plex text-[10px] uppercase tracking-[0.4em] transition-colors ${memorySummarizing
                            ? 'text-ember'
                            : 'text-muted hover:text-gold-dim disabled:opacity-30'}`}
                    >
                        {memorySummarizing && <span className="h-1.5 w-1.5 animate-ping rounded-full bg-ember" />}
                        {memorySummarizing ? 'Distilling…' : 'Summarize'}
                    </button>
                    {SEP}
                    <button
                        onClick={onSaveAndNew}
                        disabled={anyLoading}
                        className="font-plex text-[10px] uppercase tracking-[0.4em] text-muted hover:text-gold-dim transition-colors disabled:opacity-30"
                    >
                        Save &amp; New
                    </button>
                </>
            )}

            {SEP}

            {/* ── usage ───────────────────────────────────────────────────── */}
            <button
                onClick={onOpenUsage}
                title="Open the full accounting"
                className={`flex items-center gap-2 font-plex text-[10px] uppercase tracking-[0.4em] transition-colors ${usageOpen ? 'text-gold-accent' : 'text-muted hover:text-gold-dim'}`}
            >
                Usage
                {sessionUsage && (
                    <span className="font-plex text-[9px] tracking-[0.15em] text-muted/60">
                        {formatTokens(sessionUsage.totalTokens)} ·{' '}
                        <span className="text-gold-accent/80">{formatSpend(sessionUsage.cost)}</span>
                    </span>
                )}
            </button>

            {SEP}

            {/* ── global model ─────────────────────────────────────────────── */}
            <div className="flex items-center gap-2" title="Model used for utility work — memory distillation. Separate from the three agents.">
                <span className="font-plex text-[10px] uppercase tracking-[0.4em] text-muted/60">Global</span>
                <ModelSelect
                    value={globalModel}
                    onChange={onGlobalModelChange}
                    ariaLabel="Global utility model"
                    showCost={false}
                    className="appearance-none bg-transparent font-plex text-[10px] uppercase tracking-[0.2em] text-gold-accent hover:text-[#8fd0ba] outline-none cursor-pointer transition-colors"
                />
            </div>

        </div>
    );
}
