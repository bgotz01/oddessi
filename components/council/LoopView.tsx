'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MODELS } from '@/lib/models';
import ModelSelect from '@/components/ModelSelect';
import { AGENT_LABELS, type AgentConfig, type CascadeTurn, formatSpend } from './types';

interface Props {
    turns: CascadeTurn[];
    loading: { round: number; agentIdx: number } | null;
    currentRound: number;
    rounds: number;
    agentConfigs: AgentConfig[];
    anyLoading: boolean;
    bottomRef: React.RefObject<HTMLDivElement | null>;
    onModelChange: (idx: number, model: string) => void;
    onRoundsChange: (n: number) => void;
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export default function LoopView({
    turns, loading, currentRound, rounds, agentConfigs,
    anyLoading, bottomRef, onModelChange, onRoundsChange, onScroll,
}: Props) {
    // Group flat turn list by round number
    const roundGroups: CascadeTurn[][] = [];
    turns.forEach((turn) => {
        const r = (turn.round ?? 1) - 1;
        if (!roundGroups[r]) roundGroups[r] = [];
        roundGroups[r].push(turn);
    });

    return (
        <div className="flex flex-1 overflow-hidden border-x border-gold-muted/10">
            {/* conversation thread */}
            <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-none" onScroll={onScroll}>
                {turns.length === 0 && loading === null && (
                    <div className="flex h-full items-center justify-center">
                        <p className="font-cormorant text-base italic text-muted/40 text-center">
                            Pose a question. The council will discuss it across {rounds} {rounds === 1 ? 'round' : 'rounds'}.
                        </p>
                    </div>
                )}

                {roundGroups.map((roundTurns, roundIdx) => (
                    <div key={roundIdx} className="mb-10">
                        {/* Round divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-gold-muted/10" />
                            <span className="font-plex text-[9px] uppercase tracking-[0.5em] text-gold-muted/40">
                                Round {roundIdx + 1}
                                {currentRound > 0 && roundIdx + 1 === currentRound && (
                                    <span className="ml-2 text-gold-accent/60">· running</span>
                                )}
                                {currentRound === 0 && turns.length > 0 && roundIdx + 1 === Math.max(...turns.map((t) => t.round ?? 1)) && (
                                    <span className="ml-2 text-muted/40">· complete</span>
                                )}
                            </span>
                            <div className="flex-1 h-px bg-gold-muted/10" />
                        </div>

                        {/* Question — only on first round */}
                        {roundIdx === 0 && roundTurns[0] && (
                            <div className="mb-6 border-l-2 border-gold-accent/40 bg-surface-alt px-5 py-3 rounded-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-plex text-[8px] uppercase tracking-[0.5em] text-gold-accent/70">◈</span>
                                    <span className="font-plex text-[8px] uppercase tracking-[0.45em] text-gold-accent/80">You</span>
                                </div>
                                <div className="font-cormorant text-base leading-7 text-parchment whitespace-pre-wrap">
                                    {roundTurns[0].question}
                                </div>
                            </div>
                        )}

                        {/* Responses */}
                        <div className="space-y-6">
                            {roundTurns.flatMap((turn) => turn.responses).map((r, ri, arr) => (
                                <div key={ri} className="flex gap-5">
                                    <div className="shrink-0 pt-1 w-6 text-right">
                                        <div className="font-cinzel text-[10px] tracking-[0.3em] text-gold-dim">
                                            {AGENT_LABELS[r.agentIdx]}
                                        </div>
                                        {r.usage && (
                                            <div
                                                className="mt-1 font-plex text-[7px] tracking-[0.05em] text-muted/50"
                                                title={`${r.usage.model} · ${r.usage.promptTokens.toLocaleString()} prompt + ${r.usage.completionTokens.toLocaleString()} completion tokens`}
                                            >
                                                {formatSpend(r.usage.cost)}
                                            </div>
                                        )}
                                    </div>
                                    <div className={`flex-1 font-cormorant text-base leading-7 text-parchment-3 ${ri < arr.length - 1 ? 'pb-6 border-b border-gold-muted/10' : ''}`}>
                                        {r.content
                                            ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{r.content}</ReactMarkdown>
                                            : (
                                                <div className="flex items-center gap-1.5 pt-2">
                                                    <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                                                    <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '200ms' }} />
                                                    <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '400ms' }} />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ))}

                            {/* Loading indicator for next agent */}
                            {loading !== null && loading.round === roundIdx + 1 &&
                                !roundTurns.flatMap((t) => t.responses).some((r) => r.agentIdx === loading.agentIdx && r.content === '') && (
                                    <div className="flex gap-5">
                                        <div className="shrink-0 pt-1 font-cinzel text-[10px] tracking-[0.3em] text-gold-dim w-6 text-right">
                                            {AGENT_LABELS[loading.agentIdx]}
                                        </div>
                                        <div className="flex items-center gap-1.5 pt-2">
                                            <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                                            <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '200ms' }} />
                                            <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '400ms' }} />
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                ))}

                <div ref={bottomRef} />
            </div>

            {/* right strip — rounds + agents */}
            <div className="shrink-0 w-44 border-l border-gold-muted/10 bg-surface flex flex-col">
                {/* rounds picker */}
                <div className="shrink-0 border-b border-gold-muted/15 px-4 py-3">
                    <div className="font-plex text-[8px] uppercase tracking-[0.45em] text-muted mb-2">Rounds</div>
                    <div className="flex items-center gap-1 flex-wrap">
                        {[1, 2, 3, 5, 10].map((n) => (
                            <button
                                key={n}
                                onClick={() => onRoundsChange(n)}
                                disabled={anyLoading}
                                className={`px-2 py-1 font-plex text-[9px] tracking-[0.1em] border transition-colors disabled:opacity-40 ${rounds === n
                                    ? 'border-gold-muted/60 text-gold-accent bg-surface-alt'
                                    : 'border-gold-muted/20 text-muted hover:border-gold-muted/40 hover:text-gold-dim'
                                    }`}
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                    {currentRound > 0 && (
                        <div className="mt-2 font-plex text-[8px] tracking-[0.2em] text-gold-accent/60">
                            {currentRound} / {rounds}
                        </div>
                    )}
                </div>

                {/* agents */}
                <div className="shrink-0 border-b border-gold-muted/15 px-4 py-2">
                    <span className="font-plex text-[8px] uppercase tracking-[0.45em] text-muted">Agents</span>
                </div>
                <div className="flex-1 divide-y divide-gold-muted/10 overflow-auto scrollbar-none">
                    {agentConfigs.map((cfg, i) => {
                        const modelMeta = MODELS.find((m) => m.id === cfg.model);
                        return (
                            <div key={i} className="px-4 py-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-cinzel text-[10px] tracking-[0.25em] text-muted">{AGENT_LABELS[i]}</span>
                                    {loading?.agentIdx === i && (
                                        <span className="flex gap-0.5">
                                            <span className="h-1 w-1 rounded-full bg-gold/50 animate-pulse" style={{ animationDelay: '0ms' }} />
                                            <span className="h-1 w-1 rounded-full bg-gold/50 animate-pulse" style={{ animationDelay: '150ms' }} />
                                            <span className="h-1 w-1 rounded-full bg-gold/50 animate-pulse" style={{ animationDelay: '300ms' }} />
                                        </span>
                                    )}
                                </div>
                                <ModelSelect
                                    value={cfg.model}
                                    onChange={(model) => onModelChange(i, model)}
                                    disabled={anyLoading}
                                    ariaLabel={`Agent ${AGENT_LABELS[i]} model`}
                                    showCost={false}
                                    className="w-full appearance-none bg-transparent font-plex text-[8px] uppercase tracking-[0.15em] text-gold-accent hover:text-[#8fd0ba] outline-none cursor-pointer disabled:opacity-40 transition-colors truncate"
                                />
                                {modelMeta && (
                                    <div className="font-plex text-[7px] tracking-[0.1em] text-patina-dim mt-0.5">{modelMeta.cost}</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
