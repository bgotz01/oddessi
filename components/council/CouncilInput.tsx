'use client';

import { useEffect, useRef } from 'react';

interface Props {
    input: string;
    mode: 'parallel' | 'cascade' | 'loop';
    anyLoading: boolean;
    sidebarOpen: boolean;
    loopCurrentRound: number;
    loopRounds: number;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function CouncilInput({
    input, mode, anyLoading, sidebarOpen,
    loopCurrentRound, loopRounds,
    onChange, onSubmit,
}: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }, [input]);

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e as unknown as React.FormEvent);
        }
    }

    return (
        <div className="relative z-10 shrink-0 border-t border-gold-muted/20 bg-void">
            <div className="flex">
                {/* spacer keeps the composer aligned with the thread, past the rail */}
                <div className={`shrink-0 border-r border-rule transition-all duration-300 ${sidebarOpen ? 'w-52' : 'w-10'}`} />
                <form onSubmit={onSubmit} className="flex-1 py-5 px-6">
                    {mode === 'loop' && loopCurrentRound > 0 && (
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex-1 h-px bg-gold-muted/15 relative overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 bg-gold-muted/40 transition-all duration-500"
                                    style={{ width: `${(loopCurrentRound / loopRounds) * 100}%` }}
                                />
                            </div>
                            <span className="shrink-0 font-plex text-[8px] uppercase tracking-[0.4em] text-gold-accent/50">
                                Round {loopCurrentRound} / {loopRounds}
                            </span>
                        </div>
                    )}
                    <div className="flex items-end gap-4">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => onChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={mode === 'loop'
                                ? `Pose a question — the council will loop ${loopRounds} ${loopRounds === 1 ? 'round' : 'rounds'}…`
                                : 'Pose a question to the council…'}
                            rows={1}
                            disabled={anyLoading}
                            className="min-h-[40px] max-h-[140px] flex-1 resize-none bg-transparent font-cormorant text-lg leading-7 text-parchment placeholder-muted/50 outline-none disabled:opacity-40"
                        />
                        <button
                            type="submit"
                            disabled={anyLoading || !input.trim()}
                            aria-label="Submit to council"
                            className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-gold-muted/40 bg-surface-alt text-gold transition-colors hover:border-gold-muted/70 hover:text-parchment-2 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M7 1L7 13M7 1L2 6M7 1L12 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
