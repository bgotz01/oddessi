'use client';

import { useEffect, useState } from 'react';
import { MODELS } from '@/lib/models';
import {
    AGENT_LABELS,
    callsForAgent,
    formatSpend,
    formatTokens,
    sumUsage,
    turnsFromParallel,
    usageForAgent,
    type CascadeTurn,
    type SavedSession,
    type Usage,
} from './types';

interface Props {
    /** The open session, already folded into turn shape. */
    turns: CascadeTurn[];
    sessions: SavedSession[];
    onClose: () => void;
}

type Scope = 'session' | 'archive';

function modelLabel(id: string): string {
    return MODELS.find((m) => m.id === id)?.label ?? id;
}

function ShareBar({ fraction }: { fraction: number }) {
    return (
        <span aria-hidden className="block h-px w-full bg-gold-muted/15">
            <span
                className="block h-px bg-gold-muted/70 transition-all duration-500"
                style={{ width: `${Math.round(fraction * 100)}%` }}
            />
        </span>
    );
}

function Totals({ usage, label }: { usage: Usage | null; label: string }) {
    const cells: [string, string][] = [
        ['Prompt', usage ? usage.promptTokens.toLocaleString() : '—'],
        ['Completion', usage ? usage.completionTokens.toLocaleString() : '—'],
        ['Total', usage ? usage.totalTokens.toLocaleString() : '—'],
        ['Charged', usage ? formatSpend(usage.cost) : '—'],
    ];
    return (
        <section>
            <h3 className="font-plex text-[8px] uppercase tracking-[0.45em] text-muted">{label}</h3>
            <dl className="mt-3 grid grid-cols-2 gap-px border border-gold-muted/20 bg-gold-muted/20 sm:grid-cols-4">
                {cells.map(([k, v], i) => (
                    <div key={k} className="bg-void px-4 py-3">
                        <dt className="font-plex text-[7px] uppercase tracking-[0.35em] text-muted">{k}</dt>
                        <dd
                            className={`mt-1.5 font-plex text-sm tracking-[0.05em] ${
                                i === cells.length - 1 ? 'text-gold-accent' : 'text-parchment-3'
                            }`}
                        >
                            {v}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}

/** The full accounting for a council session — what each agent consumed and
 *  what OpenRouter charged for it. */
export default function UsageModal({ turns, sessions, onClose }: Props) {
    const [scope, setScope] = useState<Scope>('session');

    useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [onClose]);

    // Saved parallel sessions keep per-agent threads; fold them into turn shape
    // so one set of helpers reports on every mode.
    const archiveTurns = sessions.flatMap((s) =>
        s.mode === 'parallel' ? turnsFromParallel(s.agents) : s.cascadeTurns,
    );
    const scoped = scope === 'session' ? turns : archiveTurns;

    const total = usageForAgent(scoped);
    const perAgent = AGENT_LABELS.map((_, i) => usageForAgent(scoped, i));
    const untracked = scoped.some((t) => t.responses.some((r) => !r.usage));

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 px-6 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Usage"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-[85vh] w-full max-w-4xl flex-col border border-gold-muted/30 bg-surface"
            >
                <header className="flex shrink-0 items-center justify-between border-b border-gold-muted/20 px-6 py-4">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="font-plex text-[10px] uppercase tracking-[0.5em] text-gold-muted/50">◈</span>
                            <h2 className="font-cinzel text-lg tracking-[0.06em] text-parchment-4">Usage</h2>
                        </div>
                        <div className="flex items-center border border-gold-muted/20 overflow-hidden">
                            {(['session', 'archive'] as const).map((s, i) => (
                                <div key={s} className="flex items-center">
                                    {i > 0 && <div className="w-px h-3 bg-gold-muted/20" />}
                                    <button
                                        onClick={() => setScope(s)}
                                        className={`px-3 py-1.5 font-plex text-[9px] uppercase tracking-[0.3em] transition-colors ${
                                            scope === s ? 'bg-surface-alt text-gold-accent' : 'text-muted hover:text-gold-dim'
                                        }`}
                                    >
                                        {s === 'session' ? 'This session' : `Archive (${sessions.length})`}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="font-plex text-[9px] uppercase tracking-[0.4em] text-muted hover:text-gold-dim transition-colors"
                    >
                        Close
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
                    {!total ? (
                        <p className="py-10 text-center font-cormorant text-base italic text-muted/40">
                            Nothing measured yet.
                        </p>
                    ) : (
                        <>
                            <Totals
                                usage={total}
                                label={scope === 'session' ? 'This session' : 'All saved sessions'}
                            />

                            <section>
                                <h3 className="font-plex text-[8px] uppercase tracking-[0.45em] text-muted">By agent</h3>
                                <div className="mt-3 overflow-x-auto">
                                    <table className="w-full border-collapse font-plex text-[10px] tracking-[0.05em]">
                                        <thead>
                                            <tr className="border-b border-gold-muted/20 text-left text-[7px] uppercase tracking-[0.3em] text-muted">
                                                <th className="py-2 pr-4 font-normal">Agent</th>
                                                <th className="py-2 pr-4 font-normal">Model</th>
                                                <th className="py-2 pr-4 text-right font-normal">Calls</th>
                                                <th className="py-2 pr-4 text-right font-normal">In</th>
                                                <th className="py-2 pr-4 text-right font-normal">Out</th>
                                                <th className="py-2 pr-4 text-right font-normal">Total</th>
                                                <th className="py-2 pr-4 text-right font-normal">Charged</th>
                                                <th className="w-24 py-2 font-normal">Share</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {perAgent.map((u, i) => (
                                                <tr key={i} className="border-b border-gold-muted/10">
                                                    <td className="py-2.5 pr-4 font-cinzel text-[10px] tracking-[0.25em] text-gold-dim">
                                                        {AGENT_LABELS[i]}
                                                    </td>
                                                    <td className="py-2.5 pr-4 text-muted">
                                                        {u ? (u.model === 'mixed' ? 'mixed' : modelLabel(u.model)) : '—'}
                                                    </td>
                                                    <td className="py-2.5 pr-4 text-right text-parchment-3">
                                                        {callsForAgent(scoped, i) || '—'}
                                                    </td>
                                                    <td className="py-2.5 pr-4 text-right text-parchment-3">
                                                        {u ? u.promptTokens.toLocaleString() : '—'}
                                                    </td>
                                                    <td className="py-2.5 pr-4 text-right text-parchment-3">
                                                        {u ? u.completionTokens.toLocaleString() : '—'}
                                                    </td>
                                                    <td className="py-2.5 pr-4 text-right text-parchment-4">
                                                        {u ? u.totalTokens.toLocaleString() : '—'}
                                                    </td>
                                                    <td className="py-2.5 pr-4 text-right text-gold-accent">
                                                        {u ? formatSpend(u.cost) : '—'}
                                                    </td>
                                                    <td className="py-2.5 align-middle">
                                                        <ShareBar fraction={u && total.cost > 0 ? u.cost / total.cost : 0} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* per turn — open session only; the archive view would be a wall */}
                            {scope === 'session' && (
                                <section>
                                    <h3 className="font-plex text-[8px] uppercase tracking-[0.45em] text-muted">By turn</h3>
                                    <div className="mt-3 overflow-x-auto">
                                        <table className="w-full border-collapse font-plex text-[10px] tracking-[0.05em]">
                                            <thead>
                                                <tr className="border-b border-gold-muted/20 text-left text-[7px] uppercase tracking-[0.3em] text-muted">
                                                    <th className="py-2 pr-4 font-normal">#</th>
                                                    <th className="py-2 pr-4 font-normal">Question</th>
                                                    <th className="py-2 pr-4 text-right font-normal">Tokens</th>
                                                    <th className="py-2 text-right font-normal">Charged</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {turns.map((t, ti) => {
                                                    const u = sumUsage(t.responses.map((r) => r.usage));
                                                    return (
                                                        <tr key={ti} className="border-b border-gold-muted/10">
                                                            <td className="py-2.5 pr-4 text-muted">
                                                                {t.round ? `R${t.round}` : ti + 1}
                                                            </td>
                                                            <td className="max-w-md truncate py-2.5 pr-4 font-cormorant text-sm text-parchment-3">
                                                                {t.question}
                                                            </td>
                                                            <td className="py-2.5 pr-4 text-right text-parchment-3">
                                                                {u ? formatTokens(u.totalTokens) : '—'}
                                                            </td>
                                                            <td className="py-2.5 text-right text-gold-accent">
                                                                {u ? formatSpend(u.cost) : '—'}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </div>

                <footer className="shrink-0 border-t border-gold-muted/20 px-6 py-3">
                    <p className="font-plex text-[7px] uppercase tracking-[0.3em] text-muted/60">
                        {untracked
                            ? 'Charged as reported by OpenRouter · some responses predate usage accounting'
                            : 'Charged as reported by OpenRouter, not estimated from list prices'}
                    </p>
                </footer>
            </div>
        </div>
    );
}
