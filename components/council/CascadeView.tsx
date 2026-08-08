'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MODELS } from '@/lib/models';
import ModelSelect from '@/components/ModelSelect';
import { AGENT_LABELS, formatUsage, sumUsage, type AgentState, type CascadeTurn } from './types';

interface Props {
    turns: CascadeTurn[];
    loading: number | null; // agent index currently loading
    agents: AgentState[];
    anyLoading: boolean;
    bottomRef: React.RefObject<HTMLDivElement | null>;
    onModelChange: (idx: number, model: string) => void;
    selectedAgentIdxs: Set<number>;
    onToggleAgent: (idx: number) => void;
    onOpenPrompt: (idx: number) => void;
    onNudgeAgent: (idx: number) => void;
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export default function CascadeView({
    turns, loading, agents, anyLoading, bottomRef,
    onModelChange, selectedAgentIdxs, onToggleAgent, onOpenPrompt, onNudgeAgent, onScroll,
}: Props) {
    const activeCount = selectedAgentIdxs.size;
    const hasConversation = turns.length > 0;
    const [copied, setCopied] = useState(false);

    function buildTranscript(): string {
        return turns.map((turn) => {
            const lines: string[] = [];
            lines.push(`◈ User\n${turn.question}`);
            turn.responses.forEach((r) => {
                lines.push(`◆ Agent ${AGENT_LABELS[r.agentIdx]}\n${r.content}`);
            });
            return lines.join('\n\n');
        }).join('\n\n---\n\n');
    }

    function handleCopy() {
        navigator.clipboard.writeText(buildTranscript()).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <div className="flex flex-1 overflow-hidden border-x border-gold-muted/10">
            {/* conversation thread */}
            <div className="relative flex-1 overflow-y-auto px-8 py-6 space-y-10 scrollbar-none" onScroll={onScroll}>
                {hasConversation && (
                    <button
                        onClick={handleCopy}
                        title="Copy full transcript"
                        className="absolute top-4 right-4 z-10 flex items-center gap-1.5 font-plex text-[7px] uppercase tracking-[0.35em] text-muted/40 hover:text-gold-accent transition-colors"
                    >
                        {copied ? (
                            <>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                                    <path d="M2 5.5L4.5 8L9 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Copied</span>
                            </>
                        ) : (
                            <>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                                    <rect x="1" y="3.5" width="6.5" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
                                    <path d="M3.5 3.5V2A0.5 0.5 0 0 1 4 1.5H9.5A0.5 0.5 0 0 1 10 2V8A0.5 0.5 0 0 1 9.5 8.5H8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                                </svg>
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                )}
                {turns.length === 0 && loading === null && (
                    <div className="flex h-full items-center justify-center">
                        <p className="font-cormorant text-base italic text-muted/40 text-center">
                            {activeCount === 0
                                ? 'Select at least one agent to respond.'
                                : activeCount === 3
                                    ? 'Pose a question. Each voice will respond in turn.'
                                    : `Agent${activeCount > 1 ? 's' : ''} ${[0, 1, 2].filter(i => selectedAgentIdxs.has(i)).map(i => AGENT_LABELS[i]).join(' & ')} ${activeCount > 1 ? 'are' : 'is'} listening.`}
                        </p>
                    </div>
                )}

                {turns.map((turn, ti) => (
                    <div key={ti} className="space-y-6">

                        {/* ── user question ── */}
                        <div className="border-l-2 border-gold-accent/40 bg-surface-alt px-5 py-3 rounded-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-plex text-[8px] uppercase tracking-[0.5em] text-gold-accent/70">◈</span>
                                <span className="font-plex text-[8px] uppercase tracking-[0.45em] text-gold-accent/80">You</span>
                            </div>
                            <div className="font-cormorant text-base leading-7 text-parchment whitespace-pre-wrap">
                                {turn.question}
                            </div>
                        </div>

                        {/* ── agent responses ── */}
                        {turn.responses.map((r, ri) => (
                            <div key={ri} className={ri < turn.responses.length - 1 ? 'pb-6 border-b border-gold-muted/10' : ''}>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-plex text-[8px] text-gold-dim/60">◆</span>
                                    <span className="font-cinzel text-[10px] tracking-[0.3em] text-gold-dim">
                                        Agent {AGENT_LABELS[r.agentIdx]}
                                    </span>
                                    <span className="flex-1 h-px bg-gold-muted/10" />
                                    {r.usage && (
                                        <span
                                            className="shrink-0 font-plex text-[7px] tracking-[0.15em] text-muted/50"
                                            title={`${r.usage.model} · ${r.usage.promptTokens.toLocaleString()} prompt + ${r.usage.completionTokens.toLocaleString()} completion tokens`}
                                        >
                                            {formatUsage(r.usage)}
                                        </span>
                                    )}
                                </div>
                                <div className="pl-5 prose-council font-cormorant text-base leading-7 text-parchment-3">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{r.content}</ReactMarkdown>
                                </div>
                            </div>
                        ))}

                        {ti === turns.length - 1 && loading !== null && (
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-plex text-[8px] text-gold-dim/60">◆</span>
                                    <span className="font-cinzel text-[10px] tracking-[0.3em] text-gold-dim">
                                        Agent {AGENT_LABELS[loading]}
                                    </span>
                                    <span className="flex-1 h-px bg-gold-muted/10" />
                                </div>
                                <div className="pl-5 flex items-center gap-1.5 pt-1">
                                    <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                                    <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '200ms' }} />
                                    <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '400ms' }} />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                <div ref={bottomRef} />
            </div>

            {/* agent strip — right side */}
            <div className="shrink-0 w-44 border-l border-gold-muted/10 bg-surface flex flex-col">
                <div className="shrink-0 border-b border-gold-muted/15 px-4 py-3">
                    <span className="font-plex text-[8px] uppercase tracking-[0.45em] text-muted">Agents</span>
                </div>

                <div className="flex-1 divide-y divide-gold-muted/10 overflow-auto scrollbar-none">
                    {agents.map((agent, i) => {
                        const modelMeta = MODELS.find((m) => m.id === agent.model);
                        const isActive = selectedAgentIdxs.has(i);
                        return (
                            <div
                                key={i}
                                onClick={() => { if (!anyLoading) onToggleAgent(i); }}
                                className={`px-4 py-3 transition-all cursor-pointer select-none ${isActive
                                    ? 'bg-surface-alt'
                                    : 'opacity-35 hover:opacity-55'
                                    } ${anyLoading ? 'cursor-not-allowed' : ''}`}
                                title={isActive ? `Deselect Agent ${AGENT_LABELS[i]}` : `Select Agent ${AGENT_LABELS[i]}`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    {/* checkbox indicator */}
                                    <span className={`shrink-0 w-2.5 h-2.5 border transition-colors flex items-center justify-center ${isActive
                                        ? 'border-gold-accent bg-gold-accent/20'
                                        : 'border-muted/40'
                                        }`} aria-hidden="true">
                                        {isActive && (
                                            <svg width="6" height="5" viewBox="0 0 6 5" fill="none">
                                                <path d="M1 2.5L2.5 4L5 1" stroke="var(--color-gold-accent)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </span>
                                    <span className={`font-cinzel text-[10px] tracking-[0.25em] ${isActive ? 'text-gold-accent' : 'text-muted'}`}>
                                        {AGENT_LABELS[i]}
                                    </span>
                                    {loading === i && (
                                        <span className="flex gap-0.5 ml-auto">
                                            <span className="h-1 w-1 rounded-full bg-gold/50 animate-pulse" style={{ animationDelay: '0ms' }} />
                                            <span className="h-1 w-1 rounded-full bg-gold/50 animate-pulse" style={{ animationDelay: '150ms' }} />
                                            <span className="h-1 w-1 rounded-full bg-gold/50 animate-pulse" style={{ animationDelay: '300ms' }} />
                                        </span>
                                    )}
                                </div>
                                <ModelSelect
                                    value={agent.model}
                                    onChange={(model) => onModelChange(i, model)}
                                    disabled={anyLoading}
                                    ariaLabel={`Agent ${AGENT_LABELS[i]} model`}
                                    showCost={false}
                                    className="w-full appearance-none bg-transparent font-plex text-[8px] uppercase tracking-[0.15em] text-gold-accent hover:text-[#8fd0ba] outline-none cursor-pointer disabled:opacity-40 transition-colors truncate"
                                />
                                {modelMeta && (
                                    <div className="font-plex text-[7px] tracking-[0.1em] text-patina-dim mt-0.5">{modelMeta.cost}</div>
                                )}
                                {(() => {
                                    const used = sumUsage(turns.flatMap((t) => t.responses.filter((r) => r.agentIdx === i).map((r) => r.usage)));
                                    return used ? (
                                        <div className="mt-1 font-plex text-[7px] tracking-[0.1em] text-muted/50">
                                            {formatUsage(used)}
                                        </div>
                                    ) : null;
                                })()}
                                <button
                                    onClick={(e) => { e.stopPropagation(); onOpenPrompt(i); }}
                                    disabled={anyLoading}
                                    className="mt-2 font-plex text-[7px] uppercase tracking-[0.3em] text-muted/50 hover:text-gold-accent transition-colors disabled:opacity-30"
                                >
                                    prompt
                                </button>
                                {hasConversation && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onNudgeAgent(i); }}
                                        disabled={anyLoading}
                                        className="mt-3 w-full flex items-center justify-center gap-1.5 border border-gold-muted/30 bg-surface-alt py-1.5 font-plex text-[8px] uppercase tracking-[0.3em] text-gold-accent hover:border-gold-muted/60 hover:bg-[#171b23] hover:text-[#8fd0ba] transition-all disabled:opacity-25 disabled:cursor-not-allowed"
                                        title={`Ask Agent ${AGENT_LABELS[i]} to read the conversation and respond`}
                                    >
                                        <svg width="9" height="9" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                            <path d="M7 1L7 13M7 1L2 6M7 1L12 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        respond
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* status hint */}
                <div className="shrink-0 border-t border-gold-muted/10 px-4 py-3">
                    <p className="font-plex text-[7px] uppercase tracking-[0.2em] text-muted/40 leading-4">
                        {activeCount === 0
                            ? 'No agents selected'
                            : activeCount === 3
                                ? 'All respond in sequence'
                                : `${activeCount} of 3 respond`}
                    </p>
                </div>
            </div>
        </div>
    );
}
