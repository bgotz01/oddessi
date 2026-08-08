'use client';

import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MODELS } from '@/lib/models';
import ModelSelect from '@/components/ModelSelect';
import { AGENT_LABELS, formatUsage, sumUsage, type AgentState } from './types';

interface Props {
    agents: AgentState[];
    anyLoading: boolean;
    onModelChange: (idx: number, model: string) => void;
    bottomRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export default function ParallelView({ agents, anyLoading, onModelChange, bottomRefs }: Props) {
    return (
        <div className="flex flex-1 overflow-hidden divide-x divide-gold-muted/10 border-x border-gold-muted/10">
            {agents.map((agent, i) => {
                const modelMeta = MODELS.find((m) => m.id === agent.model);
                const used = sumUsage(agent.messages.map((m) => m.usage));
                return (
                    <div key={i} className="flex flex-1 flex-col overflow-hidden min-w-0">

                        {/* column header */}
                        <div className="shrink-0 border-b border-gold-muted/15 bg-surface px-4 py-3 flex items-center gap-2">
                            <span className="font-cinzel text-[10px] tracking-[0.25em] text-muted shrink-0">
                                {AGENT_LABELS[i]}
                            </span>
                            <div className="flex-1 min-w-0">
                                <ModelSelect
                                    value={agent.model}
                                    onChange={(model) => onModelChange(i, model)}
                                    disabled={anyLoading}
                                    ariaLabel={`Agent ${AGENT_LABELS[i]} model`}
                                    className="w-full appearance-none bg-transparent font-plex text-[9px] uppercase tracking-[0.25em] text-gold-accent hover:text-[#8fd0ba] outline-none cursor-pointer disabled:opacity-40 transition-colors truncate"
                                />
                                <div className="flex items-baseline justify-between gap-2 font-plex text-[7px] tracking-[0.15em]">
                                    {modelMeta && <span className="text-patina-dim">{modelMeta.cost}</span>}
                                    {used && <span className="truncate text-muted/50">{formatUsage(used)}</span>}
                                </div>
                            </div>
                        </div>

                        {/* messages */}
                        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 scrollbar-none">
                            {agent.messages.length === 0 && !agent.loading && (
                                <div className="flex h-full items-center justify-center">
                                    <p className="font-cormorant text-base italic text-muted/40 text-center">
                                        Waiting
                                    </p>
                                </div>
                            )}

                            {agent.messages.map((msg, j) => (
                                <div key={j}>
                                    {msg.role === 'user' ? (
                                        <div className="flex justify-end">
                                            <div className="inline-block max-w-[85%] border border-gold-muted/20 bg-surface-alt px-4 py-2.5 font-cormorant text-base leading-7 text-parchment-4">
                                                {msg.content}
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="mb-1.5 font-plex text-[8px] uppercase tracking-[0.45em] text-gold-dim">
                                                {AGENT_LABELS[i]}
                                            </div>
                                            <div className="prose-council font-cormorant text-base leading-7 text-parchment-3">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {agent.loading && agent.messages[agent.messages.length - 1]?.content === '' && (
                                <div>
                                    <div className="mb-1.5 font-plex text-[8px] uppercase tracking-[0.45em] text-gold-dim">
                                        {AGENT_LABELS[i]}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                                        <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '200ms' }} />
                                        <span className="h-1 w-1 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '400ms' }} />
                                    </div>
                                </div>
                            )}

                            <div ref={(el) => { bottomRefs.current[i] = el; }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
