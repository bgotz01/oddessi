'use client';

import { Fragment, useEffect, useState } from 'react';
import type { PageRefMeta } from '@/app/council/page';

interface Props {
    availableRefs: PageRefMeta[];
    attachedRefs: PageRefMeta[];
    autoRef: PageRefMeta | undefined;
    onClose: () => void;
    onToggle: (ref: PageRefMeta) => void;
    onSetRefs: (refs: PageRefMeta[]) => void;
    onClearAll: () => void;
}

function ChevronIcon({ open }: { open: boolean }) {
    return (
        <svg
            width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true"
            className={`transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
        >
            <path d="M2 1.5L5.5 4L2 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function selectionState(refs: PageRefMeta[], attached: PageRefMeta[]): 'none' | 'some' | 'all' {
    const n = refs.filter((r) => attached.some((a) => a.id === r.id)).length;
    if (n === 0) return 'none';
    if (n === refs.length) return 'all';
    return 'some';
}

function CheckBox({ state }: { state: 'none' | 'some' | 'all' }) {
    return (
        <span className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors shrink-0 ${state === 'all' ? 'border-gold-muted/70 text-gold-accent' : state === 'some' ? 'border-gold-muted/50 text-gold-accent/60' : 'border-muted/30 text-transparent'}`}>
            {state === 'some'
                ? <span className="w-1.5 h-px bg-current block" />
                : <svg width="7" height="7" viewBox="0 0 8 8" fill="none" aria-hidden="true"><path d="M1 4L3 6.5L7 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            }
        </span>
    );
}

export default function RefsModal({ availableRefs, attachedRefs, autoRef, onClose, onToggle, onSetRefs, onClearAll }: Props) {
    const [coreOpen, setCoreOpen] = useState(false);
    const [casesOpen, setCasesOpen] = useState(false);
    // Track open state per category key
    const [categoryOpen, setCategoryOpen] = useState<Record<string, boolean>>({});
    // Track open state per project group
    const [projectOpen, setProjectOpen] = useState<Record<string, boolean>>({});
    // Track open state per flat/leaf group (e.g. 'Laws', 'Archives')
    const [groupOpen, setGroupOpen] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [onClose]);

    const groups = Array.from(new Set(availableRefs.map((r) => r.group)));
    // Groups whose refs are tagged as projects — collected under a single "Projects" category
    const projectGroups = groups.filter((g) =>
        availableRefs.some((r) => r.group === g && r.tag === 'Project'),
    );
    const nonProjectGroups = groups.filter((g) => !projectGroups.includes(g));

    function toggleSubset(refs: PageRefMeta[]) {
        const state = selectionState(refs, attachedRefs);
        if (state === 'all') {
            const ids = new Set(refs.map((r) => r.id));
            onSetRefs(attachedRefs.filter((r) => !ids.has(r.id)));
        } else {
            const missing = refs.filter((r) => !attachedRefs.some((a) => a.id === r.id));
            onSetRefs([...attachedRefs, ...missing]);
        }
    }

    function toggleCategory(key: string) {
        setCategoryOpen((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    function renderItemRow(ref: PageRefMeta, indent = false) {
        const active = attachedRefs.some((r) => r.id === ref.id);
        return (
            <button
                key={ref.id}
                onClick={() => onToggle(ref)}
                className={`w-full flex items-center justify-between ${indent ? 'pl-8 pr-4' : 'px-4'} py-3 text-left transition-colors ${active ? 'bg-surface-alt' : 'bg-surface hover:bg-surface-alt'}`}
            >
                <span className={`font-cormorant text-base leading-5 ${active ? 'text-gold-accent' : 'text-bone-soft'}`}>
                    {ref.label}
                </span>
                <span className={`shrink-0 ml-4 w-4 h-4 border flex items-center justify-center transition-colors ${active ? 'border-gold-muted/70 text-gold-accent' : 'border-muted/30 text-transparent'}`}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                        <path d="M1 4L3 6.5L7 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>
        );
    }

    // Collapsible subsection (used for "Poesis Core" and "Cases")
    function renderSubSection(
        label: string,
        refs: PageRefMeta[],
        isOpen: boolean,
        onToggleOpen: () => void,
        children?: React.ReactNode,
    ) {
        const state = selectionState(refs, attachedRefs);
        return (
            <div className="border border-gold-muted/15">
                <div className={`flex items-center justify-between px-4 py-3 transition-colors ${state !== 'none' ? 'bg-surface-alt' : 'bg-surface'}`}>
                    <button onClick={onToggleOpen} className="flex items-center gap-2.5 flex-1 text-left">
                        <span className="text-muted/50"><ChevronIcon open={isOpen} /></span>
                        <span className={`font-cormorant text-base leading-5 ${state !== 'none' ? 'text-gold-accent' : 'text-bone-soft'}`}>
                            {label}
                        </span>
                    </button>
                    <button
                        onClick={() => toggleSubset(refs)}
                        aria-label={state === 'all' ? `Deselect all ${label}` : `Select all ${label}`}
                        className={`flex items-center gap-1.5 font-plex text-[8px] uppercase tracking-[0.35em] transition-colors ${state !== 'none' ? 'text-gold-accent hover:text-gold-dim' : 'text-muted/40 hover:text-muted'}`}
                    >
                        <CheckBox state={state} />
                        All
                    </button>
                </div>
                {isOpen && (
                    <div className="border-t border-gold-muted/10">
                        {children ?? (
                            <div className="space-y-px">
                                {refs.map((ref) => renderItemRow(ref, true))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // Collapsible category row inside Cases (e.g. "Civilizations", "Technology")
    function renderCategorySection(catLabel: string, refs: PageRefMeta[], groupKey: string) {
        const isOpen = !!categoryOpen[groupKey];
        const state = selectionState(refs, attachedRefs);
        return (
            <div key={groupKey} className="border-b border-gold-muted/10 last:border-b-0">
                <div className={`flex items-center justify-between pl-6 pr-4 py-2.5 transition-colors ${state !== 'none' ? 'bg-[#0f1219]' : 'bg-surface'}`}>
                    <button onClick={() => toggleCategory(groupKey)} className="flex items-center gap-2 flex-1 text-left">
                        <span className="text-muted/40"><ChevronIcon open={isOpen} /></span>
                        <span className={`font-plex text-[9px] uppercase tracking-[0.4em] ${state !== 'none' ? 'text-gold-dim' : 'text-muted/60'}`}>
                            {catLabel}
                        </span>
                    </button>
                    <button
                        onClick={() => toggleSubset(refs)}
                        aria-label={state === 'all' ? `Deselect all ${catLabel}` : `Select all ${catLabel}`}
                        className={`flex items-center gap-1.5 font-plex text-[8px] uppercase tracking-[0.35em] transition-colors ${state !== 'none' ? 'text-gold-accent hover:text-gold-dim' : 'text-muted/40 hover:text-muted'}`}
                    >
                        <CheckBox state={state} />
                        All
                    </button>
                </div>
                {isOpen && (
                    <div className="space-y-px border-t border-gold-muted/10">
                        {refs.map((ref) => renderItemRow(ref, true))}
                    </div>
                )}
            </div>
        );
    }

    function renderGroup(group: string) {
        const allGroupRefs = availableRefs.filter((r) => r.group === group);
        const coreRefs = allGroupRefs.filter((r) => !r.subgroup);
        const caseRefs = allGroupRefs.filter((r) => r.subgroup === 'Cases');
        const hasCases = caseRefs.length > 0;

        // Leaf group (no case subsections) → render as a single top-level folder box,
        // matching the look of the Poesis/Projects sub-sections.
        if (!hasCases) {
            return (
                <div key={group} className="mt-5">
                    {renderSubSection(
                        group,
                        allGroupRefs,
                        !!groupOpen[group],
                        () => setGroupOpen((p) => ({ ...p, [group]: !p[group] })),
                    )}
                </div>
            );
        }

        const groupState = selectionState(allGroupRefs, attachedRefs);

        // Build category buckets — uncategorised cases fall into a plain list
        const categories = Array.from(new Set(caseRefs.map((r) => r.category).filter(Boolean))) as string[];
        const uncategorisedCases = caseRefs.filter((r) => !r.category);

        return (
            <div key={group} className="mt-5">
                {/* group header */}
                <div className="flex items-center justify-between mb-2">
                    <div className="font-plex text-[8px] uppercase tracking-[0.5em] text-muted/50">{group}</div>
                    <button
                        onClick={() => toggleSubset(allGroupRefs)}
                        aria-label={groupState === 'all' ? `Deselect all ${group}` : `Select all ${group}`}
                        className={`flex items-center gap-1.5 font-plex text-[8px] uppercase tracking-[0.35em] transition-colors ${groupState !== 'none' ? 'text-gold-accent hover:text-gold-dim' : 'text-muted/40 hover:text-muted'}`}
                    >
                        <CheckBox state={groupState} />
                        All
                    </button>
                </div>

                <div className="space-y-2">
                    {/* Core subsection */}
                    {coreRefs.length > 0 && renderSubSection(
                        'Poesis Core',
                        coreRefs,
                        coreOpen,
                        () => setCoreOpen((p) => !p),
                    )}

                    {/* Cases subsection with categories inside */}
                    {renderSubSection(
                        'Cases',
                        caseRefs,
                        casesOpen,
                        () => setCasesOpen((p) => !p),
                        <>
                            {categories.map((cat) =>
                                renderCategorySection(
                                    cat,
                                    caseRefs.filter((r) => r.category === cat),
                                    `${group}::${cat}`,
                                )
                            )}
                            {uncategorisedCases.map((ref) => renderItemRow(ref, true))}
                        </>,
                    )}
                </div>
            </div>
        );
    }

    // "Projects" category — each project group is an expandable sub-section inside it
    function renderProjects() {
        if (projectGroups.length === 0) return null;
        const allProjectRefs = availableRefs.filter((r) => projectGroups.includes(r.group));
        const state = selectionState(allProjectRefs, attachedRefs);
        return (
            <div className="mt-5">
                {/* category header */}
                <div className="flex items-center justify-between mb-2">
                    <div className="font-plex text-[8px] uppercase tracking-[0.5em] text-muted/50">Projects</div>
                    <button
                        onClick={() => toggleSubset(allProjectRefs)}
                        aria-label={state === 'all' ? 'Deselect all Projects' : 'Select all Projects'}
                        className={`flex items-center gap-1.5 font-plex text-[8px] uppercase tracking-[0.35em] transition-colors ${state !== 'none' ? 'text-gold-accent hover:text-gold-dim' : 'text-muted/40 hover:text-muted'}`}
                    >
                        <CheckBox state={state} />
                        All
                    </button>
                </div>
                <div className="space-y-2">
                    {projectGroups.map((pg) => (
                        <Fragment key={pg}>
                            {renderSubSection(
                                pg,
                                availableRefs.filter((r) => r.group === pg),
                                !!projectOpen[pg],
                                () => setProjectOpen((p) => ({ ...p, [pg]: !p[pg] })),
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="fixed inset-0 z-40 bg-void/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Page References"
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 border border-gold-muted/30 bg-surface shadow-2xl"
            >
                {/* header */}
                <div className="flex items-center justify-between border-b border-gold-muted/20 px-6 py-4">
                    <div>
                        <div className="font-plex text-[9px] uppercase tracking-[0.5em] text-muted">Council</div>
                        <h2 className="mt-0.5 font-cinzel text-base tracking-[0.06em] text-gold">Page References</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        {attachedRefs.length > 0 && (
                            <button onClick={onClearAll} className="font-plex text-[8px] uppercase tracking-[0.35em] text-muted/50 hover:text-muted transition-colors">
                                Clear all
                            </button>
                        )}
                        <button onClick={onClose} className="font-plex text-[9px] uppercase tracking-[0.4em] text-muted hover:text-gold-dim transition-colors">
                            Done
                        </button>
                    </div>
                </div>

                <div className="px-6 pt-4 pb-2 font-cormorant text-sm leading-6 text-muted/70">
                    Attach pages as persistent context — every message in this session will include the selected content.
                </div>

                {autoRef && (
                    <div className="mx-6 mb-2 flex items-center gap-3 border border-gold-muted/20 bg-surface-alt px-4 py-2.5">
                        <span className="font-plex text-[7px] uppercase tracking-[0.4em] text-gold-dim">Auto</span>
                        <span className="font-cormorant text-sm text-gold-accent">{autoRef.label}</span>
                        <span className="ml-auto font-plex text-[7px] tracking-[0.2em] text-muted/50">current page</span>
                    </div>
                )}

                <div className="max-h-[60vh] overflow-y-auto scrollbar-none px-6 pb-6">
                    {(() => {
                        // Distribute the top-level blocks across two stable columns.
                        const blocks: React.ReactNode[] = nonProjectGroups.map((group) => (
                            <Fragment key={group}>{renderGroup(group)}</Fragment>
                        ));
                        const projects = renderProjects();
                        if (projects) blocks.push(<Fragment key="__projects">{projects}</Fragment>);
                        const left = blocks.filter((_, i) => i % 2 === 0);
                        const right = blocks.filter((_, i) => i % 2 === 1);
                        return (
                            <div className="grid grid-cols-2 gap-x-5">
                                <div>{left}</div>
                                <div>{right}</div>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </>
    );
}
