'use client';

import type { Chart } from '@/lib/charts';
import type { AgentState, CascadeTurn, SavedSession } from './types';
import type { MemoryCategory, MemoryRoute } from './db';
import type { PageRefMeta } from '@/app/council/page';
import RefsModal from './RefsModal';
import MemoryModal from './MemoryModal';
import UsageModal from './UsageModal';
import PromptsModal from './PromptsModal';
import ChartReadModal from './ChartReadModal';

interface Props {
    // refs modal
    refsOpen: boolean;
    availableRefs: PageRefMeta[];
    attachedRefs: PageRefMeta[];
    autoRef: PageRefMeta | undefined;
    onCloseRefs: () => void;
    onToggleRef: (ref: PageRefMeta) => void;
    onSetRefs: (refs: PageRefMeta[]) => void;
    onClearRefs: () => void;

    // memory modal
    memoryOpen: boolean;
    memoryCategories: MemoryCategory[];
    selectedMemoryCats: string[];
    memoryRoutes: MemoryRoute[] | null;
    memorySummarizing: boolean;
    memoryError: string | null;
    memoryDrafts: Record<string, string>;
    /** Chart whose topics sort first, when the Interface sent the user here. */
    memoryFocus: string | null;
    hasMessages: boolean;
    setMemoryDrafts: (fn: (prev: Record<string, string>) => Record<string, string>) => void;
    onCloseMemory: () => void;
    onToggleMemoryCat: (cat: string) => void;
    onSaveCategory: (cat: string, content: string) => void;
    onCreateCategory: (name: string) => void;
    onRenameCategory: (from: string, to: string) => void;
    onDeleteCategory: (cat: string) => void;
    onSummarize: () => void;
    onDismissRoutes: () => void;

    // usage modal
    usageOpen: boolean;
    usageTurns: CascadeTurn[];
    sessions: SavedSession[];
    onCloseUsage: () => void;

    // prompts modal
    promptModalOpen: boolean;
    agents: AgentState[];
    syncPrompts: boolean;
    promptTab: number;
    promptSaved: boolean;
    onClosePrompts: () => void;
    onPromptTabChange: (i: number) => void;
    onPromptChange: (i: number, prompt: string) => void;
    onSyncToggle: (next: boolean) => void;
    onPromptSave: () => void;

    // chart read modal
    chartReadOpen: boolean;
    chart: Chart | null;
    chartReadText: string;
    chartReading: boolean;
    chartReadError: string | null;
    onCloseChartRead: () => void;
    onReread: () => void;
}

export default function CouncilModals({
    refsOpen, availableRefs, attachedRefs, autoRef,
    onCloseRefs, onToggleRef, onSetRefs, onClearRefs,
    memoryOpen, memoryCategories, selectedMemoryCats, memoryRoutes,
    memorySummarizing, memoryError, memoryDrafts, memoryFocus, hasMessages,
    setMemoryDrafts, onCloseMemory, onToggleMemoryCat,
    onSaveCategory, onCreateCategory, onRenameCategory, onDeleteCategory,
    onSummarize, onDismissRoutes,
    usageOpen, usageTurns, sessions, onCloseUsage,
    promptModalOpen, agents, syncPrompts, promptTab, promptSaved,
    onClosePrompts, onPromptTabChange, onPromptChange, onSyncToggle, onPromptSave,
    chartReadOpen, chart, chartReadText, chartReading, chartReadError,
    onCloseChartRead, onReread,
}: Props) {
    return (
        <>
            {refsOpen && (
                <RefsModal
                    availableRefs={availableRefs}
                    attachedRefs={attachedRefs}
                    autoRef={autoRef}
                    onClose={onCloseRefs}
                    onToggle={onToggleRef}
                    onSetRefs={onSetRefs}
                    onClearAll={onClearRefs}
                />
            )}
            {memoryOpen && (
                <MemoryModal
                    categories={memoryCategories}
                    selected={selectedMemoryCats}
                    routes={memoryRoutes}
                    summarizing={memorySummarizing}
                    error={memoryError}
                    drafts={memoryDrafts}
                    setDrafts={setMemoryDrafts}
                    focus={memoryFocus}
                    canSummarize={hasMessages}
                    onClose={onCloseMemory}
                    onToggleSelected={onToggleMemoryCat}
                    onSaveCategory={onSaveCategory}
                    onCreateCategory={onCreateCategory}
                    onRenameCategory={onRenameCategory}
                    onDeleteCategory={onDeleteCategory}
                    onSummarize={onSummarize}
                    onDismissRoutes={onDismissRoutes}
                />
            )}
            {usageOpen && (
                <UsageModal turns={usageTurns} sessions={sessions} onClose={onCloseUsage} />
            )}
            {promptModalOpen && (
                <PromptsModal
                    agents={agents}
                    syncPrompts={syncPrompts}
                    promptTab={promptTab}
                    promptSaved={promptSaved}
                    onClose={onClosePrompts}
                    onTabChange={onPromptTabChange}
                    onPromptChange={onPromptChange}
                    onSyncToggle={onSyncToggle}
                    onSave={onPromptSave}
                />
            )}
            {chartReadOpen && chart && (
                <ChartReadModal
                    chartName={chart.name}
                    text={chartReadText}
                    loading={chartReading}
                    error={chartReadError}
                    onClose={onCloseChartRead}
                    onReread={onReread}
                />
            )}
        </>
    );
}
