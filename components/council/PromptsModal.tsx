'use client';

import { useEffect } from 'react';
import { AGENT_LABELS, DEFAULT_SYSTEM_PROMPT, type AgentState } from './types';

interface Props {
    agents: AgentState[];
    syncPrompts: boolean;
    promptTab: number;
    promptSaved: boolean;
    onClose: () => void;
    onTabChange: (i: number) => void;
    onPromptChange: (idx: number, value: string) => void;
    onSyncToggle: (next: boolean) => void;
    onSave: () => void;
}

export default function PromptsModal({
    agents, syncPrompts, promptTab, promptSaved,
    onClose, onTabChange, onPromptChange, onSyncToggle, onSave,
}: Props) {
    useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [onClose]);

    return (
        <>
            <div className="fixed inset-0 z-40 bg-void/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="System Prompts"
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 border border-gold-muted/30 bg-surface shadow-2xl"
            >
                {/* header */}
                <div className="flex items-center justify-between border-b border-gold-muted/20 px-6 py-4">
                    <div>
                        <div className="font-plex text-[9px] uppercase tracking-[0.5em] text-muted">Council</div>
                        <h2 className="mt-0.5 font-cinzel text-base tracking-[0.06em] text-gold">System Prompts</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <span className="font-plex text-[8px] uppercase tracking-[0.35em] text-muted">Same for all</span>
                            <div
                                role="switch"
                                aria-checked={syncPrompts}
                                onClick={() => onSyncToggle(!syncPrompts)}
                                className={`relative h-4 w-7 rounded-full transition-colors cursor-pointer ${syncPrompts ? 'bg-patina' : 'bg-muted/20'}`}
                            >
                                <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-parchment transition-transform duration-150 ${syncPrompts ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                            </div>
                        </label>
                        <button onClick={onClose} className="font-plex text-[9px] uppercase tracking-[0.4em] text-muted hover:text-gold-dim transition-colors">
                            Close
                        </button>
                    </div>
                </div>

                {/* tabs */}
                <div className="flex border-b border-gold-muted/15">
                    {AGENT_LABELS.map((label, i) => (
                        <button
                            key={i}
                            onClick={() => onTabChange(i)}
                            className={`px-6 py-2.5 font-cinzel text-[11px] tracking-[0.2em] transition-colors ${promptTab === i
                                ? 'border-b border-gold-muted/60 text-gold-accent'
                                : 'text-muted/50 hover:text-muted'
                                }`}
                        >
                            {label}
                            {!syncPrompts && agents[i].systemPrompt !== agents[0].systemPrompt && i > 0 && (
                                <span className="ml-1.5 text-[7px] text-gold-dim">•</span>
                            )}
                        </button>
                    ))}
                </div>

                {/* editor */}
                <div className="px-6 py-5">
                    <textarea
                        key={promptTab}
                        value={agents[promptTab].systemPrompt}
                        onChange={(e) => onPromptChange(promptTab, e.target.value)}
                        rows={12}
                        className="w-full resize-none bg-void border border-gold-muted/20 px-4 py-3 font-cormorant text-base leading-7 text-parchment-3 placeholder-muted/40 outline-none focus:border-gold-muted/40 transition-colors"
                        placeholder="Enter system prompt…"
                    />
                    <div className="mt-2 flex items-center justify-between">
                        <button
                            onClick={() => onPromptChange(promptTab, DEFAULT_SYSTEM_PROMPT)}
                            className="font-plex text-[8px] uppercase tracking-[0.35em] text-muted/40 hover:text-muted transition-colors"
                        >
                            Reset to default
                        </button>
                        <div className="flex items-center gap-4">
                            <span className="font-plex text-[8px] tracking-[0.2em] text-muted/30">
                                {syncPrompts ? 'Applied to all agents' : `Agent ${AGENT_LABELS[promptTab]} only`}
                            </span>
                            <button
                                onClick={onSave}
                                className="border border-gold-muted/30 px-4 py-1.5 font-plex text-[9px] uppercase tracking-[0.35em] transition-colors hover:border-gold-muted/60 text-gold-accent hover:text-[#8fd0ba]"
                            >
                                {promptSaved ? '✓ Saved' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
