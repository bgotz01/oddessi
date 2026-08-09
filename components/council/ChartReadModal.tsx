'use client';

import { useEffect } from 'react';

interface Props {
    chartName: string;
    text: string;
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onReread: () => void;
}

export default function ChartReadModal({ chartName, text, loading, error, onClose, onReread }: Props) {
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
                aria-label={`Chart reading — ${chartName}`}
                className="fixed left-1/2 top-1/2 z-50 flex max-h-[82vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col border border-gold-muted/30 bg-surface shadow-2xl"
            >
                {/* header */}
                <div className="flex shrink-0 items-center justify-between border-b border-gold-muted/20 px-6 py-4">
                    <div>
                        <div className="font-plex text-[9px] uppercase tracking-[0.5em] text-muted">Council</div>
                        <h2 className="mt-0.5 font-cinzel text-base tracking-[0.06em] text-gold">
                            {chartName}
                        </h2>
                    </div>
                    <div className="flex items-center gap-5">
                        {!loading && (text || error) && (
                            <button
                                onClick={onReread}
                                className="font-plex text-[9px] uppercase tracking-[0.4em] text-muted/50 transition-colors hover:text-muted"
                            >
                                Re-read
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="font-plex text-[9px] uppercase tracking-[0.4em] text-muted transition-colors hover:text-gold-dim"
                        >
                            Done
                        </button>
                    </div>
                </div>

                {/* body */}
                <div className="flex-1 overflow-y-auto scrollbar-none px-6 py-5">
                    {/* loading pulse */}
                    {loading && !text && (
                        <div className="flex items-center gap-3 text-muted/50">
                            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-ember" />
                            <span className="font-plex text-[9px] uppercase tracking-[0.4em]">Reading the chart…</span>
                        </div>
                    )}

                    {/* streamed text — rendered as plain prose, respecting newlines */}
                    {text && (
                        <div className="font-cormorant text-base leading-7 text-parchment-2 whitespace-pre-wrap">
                            {text}
                            {loading && (
                                <span className="ml-1 inline-block h-[1em] w-px animate-pulse bg-gold-accent/60 align-middle" />
                            )}
                        </div>
                    )}

                    {/* error */}
                    {error && !loading && (
                        <p className="font-plex text-[10px] uppercase tracking-[0.3em] text-ember/80">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
