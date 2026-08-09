'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import {
    AGENT_LABELS, DEFAULT_MODELS,
    emptyMsgState, formatSpend, formatTokens, turnsFromParallel, usageForAgent,
    type AgentConfig, type AgentState, type AgentMessage, type AgentResponse,
    type MsgState, type CascadeTurn, type SavedSession, type Usage,
} from '@/components/council/types';
import { dbCreateSession, dbSaveTurn, dbDeleteSession, dbLoadSessions, dbRenameSession, streamChat, dbLoadPreferences, dbSavePreferences, dbLoadMemory, dbSaveMemoryCategory, dbCreateMemoryCategory, dbRenameMemoryCategory, dbDeleteMemoryCategory, dbSummarizeMemory, dbReadChart, type MemoryCategory, type MemoryRoute } from '@/components/council/db';
import { GLOBAL_DEFAULT_MODEL } from '@/lib/models';
import { useChart } from '@/components/chart-context';
import SessionsSidebar from '@/components/council/SessionsSidebar';
import ParallelView from '@/components/council/ParallelView';
import CascadeView from '@/components/council/CascadeView';
import LoopView from '@/components/council/LoopView';
import ChartReadModal from '@/components/council/ChartReadModal'; import SessionControlsRow from '@/components/council/SessionControlsRow';
import CouncilInput from '@/components/council/CouncilInput';
import CouncilModals from '@/components/council/CouncilModals';

// Lightweight ref type — no content, just metadata for the UI
export interface PageRefMeta {
    id: string;
    label: string;
    group: string;
    subgroup?: string;
    category?: string;
    path?: string;
    tag?: string;
}

export default function CouncilPage() {
    const pathname = usePathname();
    // The chart under study, shared with the rest of the app — picking one here
    // picks it everywhere. `chartAttached` only decides whether it is sent, so a
    // general question can still be asked without it.
    const { chart, charts, selectChart } = useChart();
    const [chartAttached, setChartAttached] = useState(true);

    // ── ui state ──────────────────────────────────────────────────────────────
    const [mode, setMode] = useState<'parallel' | 'cascade' | 'loop'>('cascade');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [promptModalOpen, setPromptModalOpen] = useState(false);
    const [refsOpen, setRefsOpen] = useState(false);
    const [usageOpen, setUsageOpen] = useState(false);
    const [promptTab, setPromptTab] = useState(0);
    const [promptSaved, setPromptSaved] = useState(false);
    const [syncPrompts, setSyncPrompts] = useState(true);
    const [availableRefs, setAvailableRefs] = useState<PageRefMeta[]>([]);
    const [attachedRefs, setAttachedRefs] = useState<PageRefMeta[]>([]);
    const [autoRef, setAutoRef] = useState<PageRefMeta | undefined>(undefined);
    // Persistent memory: separate from page references (which are static app content)
    const [memoryOpen, setMemoryOpen] = useState(false);
    const [memoryCategories, setMemoryCategories] = useState<MemoryCategory[]>([]);
    const [memoryEnabled, setMemoryEnabled] = useState(true); // global on/off; off = clean chat
    const [selectedMemoryCats, setSelectedMemoryCats] = useState<string[]>([]); // subset attached this chat
    const [memoryRoutes, setMemoryRoutes] = useState<MemoryRoute[] | null>(null); // distilled candidates
    const [memorySummarizing, setMemorySummarizing] = useState(false);
    const [memoryError, setMemoryError] = useState<string | null>(null);
    // Unsaved memory edits, per category — kept here so closing the modal never drops distilled work
    const [memoryDrafts, setMemoryDrafts] = useState<Record<string, string>>({});

    // ── chart reading ─────────────────────────────────────────────────────────
    const [chartReadOpen, setChartReadOpen] = useState(false);
    const [chartReadText, setChartReadText] = useState('');
    const [chartReading, setChartReading] = useState(false);
    const [chartReadError, setChartReadError] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [sessions, setSessions] = useState<SavedSession[]>([]);

    // ── selected agents (cascade mode — checked agents respond in sequence) ────
    const [selectedAgentIdxs, setSelectedAgentIdxs] = useState<Set<number>>(new Set([0]));

    // ── loop state ────────────────────────────────────────────────────────────
    const [loopRounds, setLoopRounds] = useState(3);
    const [loopCurrentRound, setLoopCurrentRound] = useState(0);

    // ── agent config ──────────────────────────────────────────────────────────
    const [agentConfigs, setAgentConfigs] = useState<AgentConfig[]>(() =>
        DEFAULT_MODELS.map((m) => ({ model: m, systemPrompt: '' }))
    );

    // Global model — utility work (memory distillation), independent of the three agents
    const [globalModel, setGlobalModel] = useState<string>(GLOBAL_DEFAULT_MODEL);

    // ── per-mode message state ────────────────────────────────────────────────
    const [parallelMsgs, setParallelMsgs] = useState<MsgState[]>(() => [0, 1, 2].map(emptyMsgState));
    const [parallelSessionId, setParallelSessionId] = useState<string | null>(null);
    const parallelTurnOrder = useRef(0);

    const [cascadeMsgs, setCascadeMsgs] = useState<MsgState[]>(() => [0, 1, 2].map(emptyMsgState));
    const [cascadeTurns, setCascadeTurns] = useState<CascadeTurn[]>([]);
    const [cascadeLoading, setCascadeLoading] = useState<number | null>(null);
    const [cascadeSessionId, setCascadeSessionId] = useState<string | null>(null);
    const cascadeTurnOrder = useRef(0);
    const cascadeBottomRef = useRef<HTMLDivElement | null>(null);

    const [loopTurns, setLoopTurns] = useState<CascadeTurn[]>([]);
    const [loopLoading, setLoopLoading] = useState<{ round: number; agentIdx: number } | null>(null);
    const [loopSessionId, setLoopSessionId] = useState<string | null>(null);
    const loopTurnOrder = useRef(0);
    const loopBottomRef = useRef<HTMLDivElement | null>(null);

    // ── derived ───────────────────────────────────────────────────────────────
    const modeMessages = mode === 'parallel' ? parallelMsgs : cascadeMsgs;
    const setModeMessages = mode === 'parallel' ? setParallelMsgs : setCascadeMsgs;
    const agents: AgentState[] = agentConfigs.map((cfg, i) => ({
        ...cfg,
        messages: modeMessages[i].messages,
        loading: modeMessages[i].loading,
        error: modeMessages[i].error,
    }));
    const activeSessionId = mode === 'parallel' ? parallelSessionId : mode === 'cascade' ? cascadeSessionId : loopSessionId;
    const setActiveSessionId = mode === 'parallel' ? setParallelSessionId : mode === 'cascade' ? setCascadeSessionId : setLoopSessionId;
    const turnOrderRef = mode === 'parallel' ? parallelTurnOrder : mode === 'cascade' ? cascadeTurnOrder : loopTurnOrder;

    const anyLoading = mode === 'parallel'
        ? agents.some((a) => a.loading)
        : mode === 'loop' ? loopLoading !== null : cascadeLoading !== null;
    const hasMessages = mode === 'parallel'
        ? agents.some((a) => a.messages.length > 0)
        : mode === 'loop' ? loopTurns.length > 0 : cascadeTurns.length > 0;

    // Parallel keeps per-agent threads rather than shared turns; folding them
    // into turn shape lets one set of helpers report on every mode.
    const usageTurns = mode === 'parallel'
        ? turnsFromParallel(agents)
        : mode === 'loop' ? loopTurns : cascadeTurns;
    const sessionUsage = usageForAgent(usageTurns);

    const bottomRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
    const userScrolledRef = useRef(false);

    // ── effects ───────────────────────────────────────────────────────────────
    useEffect(() => {
        dbLoadPreferences()
            .then(({ agentModels, agentPrompts, globalModel }) => {
                setAgentConfigs(agentModels.map((m, i) => ({ model: m, systemPrompt: agentPrompts[i] ?? '' })));
                if (globalModel) setGlobalModel(globalModel);
            })
            .catch(() => { /* keep hardcoded defaults on error */ });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetch lightweight ref metadata from server — content stays server-side
    useEffect(() => {
        fetch('/api/context')
            .then((r) => r.json())
            .then((refs: PageRefMeta[]) => {
                setAvailableRefs(refs);
                const auto = refs.find((r) => r.path && (r.path === pathname || pathname.startsWith(r.path + '/')));
                setAutoRef(auto);
            })
            .catch(() => { });
    }, [pathname]);

    useEffect(() => {
        dbLoadSessions().then(setSessions).catch(() => { });
    }, []);

    useEffect(() => {
        dbLoadMemory().then((cats) => {
            setMemoryCategories(cats);
            setSelectedMemoryCats(cats.map((c) => c.category)); // attach all by default
        }).catch(() => { });
    }, []);

    async function refreshMemory(): Promise<MemoryCategory[]> {
        const cats = await dbLoadMemory();
        setMemoryCategories(cats);
        // keep any still-existing selections; newly added categories join the selection
        setSelectedMemoryCats((prev) => {
            const names = cats.map((c) => c.category);
            const kept = prev.filter((p) => names.includes(p));
            const added = names.filter((n) => !prev.includes(n));
            return [...kept, ...added];
        });
        return cats;
    }

    // Persist preferences to DB whenever they change (debounced 600 ms)
    useEffect(() => {
        const t = setTimeout(() => {
            dbSavePreferences({
                agentModels: agentConfigs.map((a) => a.model),
                agentPrompts: agentConfigs.map((a) => a.systemPrompt),
                globalModel,
            }).catch(() => { });
        }, 600);
        return () => clearTimeout(t);
    }, [agentConfigs, globalModel]);

    // Only auto-scroll when the user hasn't scrolled up manually.
    // We detect "near bottom" as within 80px, and reset userScrolled when they scroll back down.
    function scrollToBottomIfNeeded(ref: HTMLDivElement | null) {
        if (!ref) return;
        if (!userScrolledRef.current) {
            ref.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        bottomRefs.current.forEach((ref) => scrollToBottomIfNeeded(ref));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parallelMsgs, cascadeMsgs]);

    useEffect(() => {
        scrollToBottomIfNeeded(cascadeBottomRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cascadeTurns, cascadeLoading]);

    useEffect(() => {
        scrollToBottomIfNeeded(loopBottomRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loopTurns, loopLoading]);

    function handleScrollContainerScroll(e: React.UIEvent<HTMLDivElement>) {
        const el = e.currentTarget;
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        // If the user scrolled up more than 80px, pause auto-scroll
        userScrolledRef.current = distanceFromBottom > 80;
    }

    // ── handlers ──────────────────────────────────────────────────────────────
    function setAgentModel(idx: number, model: string) {
        setAgentConfigs((prev) => prev.map((a, i) => i === idx ? { ...a, model } : a));
    }

    function setAgentPrompt(idx: number, prompt: string) {
        if (syncPrompts) {
            setAgentConfigs((prev) => prev.map((a) => ({ ...a, systemPrompt: prompt })));
        } else {
            setAgentConfigs((prev) => prev.map((a, i) => i === idx ? { ...a, systemPrompt: prompt } : a));
        }
    }

    function handleSyncToggle(next: boolean) {
        setSyncPrompts(next);
        if (next) {
            const base = agentConfigs[promptTab].systemPrompt;
            setAgentConfigs((prev) => prev.map((a) => ({ ...a, systemPrompt: base })));
        }
    }

    function toggleRef(ref: PageRefMeta) {
        setAttachedRefs((prev) =>
            prev.some((r) => r.id === ref.id)
                ? prev.filter((r) => r.id !== ref.id)
                : [...prev, ref]
        );
    }

    function saveAndNew() {
        if (mode === 'cascade') {
            setCascadeMsgs([0, 1, 2].map(emptyMsgState));
            setCascadeTurns([]);
            setCascadeSessionId(null);
            cascadeTurnOrder.current = 0;
        } else if (mode === 'loop') {
            setLoopTurns([]);
            setLoopSessionId(null);
            setLoopCurrentRound(0);
            loopTurnOrder.current = 0;
        } else {
            setParallelMsgs([0, 1, 2].map(emptyMsgState));
            setParallelSessionId(null);
            parallelTurnOrder.current = 0;
        }
        setInput('');
        setChartAttached(true); // and back to reading the chart
        setMemoryEnabled(true); // clean chats default back to using memory
        setSelectedMemoryCats(memoryCategories.map((c) => c.category)); // re-attach all categories
        dbLoadSessions().then(setSessions).catch(() => { });
    }

    function restoreSession(session: SavedSession) {
        setMode(session.mode === 'loop' ? 'loop' : session.mode === 'cascade' ? 'cascade' : 'parallel');
        setAgentConfigs(session.agents.map((a) => ({ model: a.model, systemPrompt: a.systemPrompt })));
        if (session.mode === 'cascade') {
            setCascadeMsgs(session.agents.map((a) => ({ messages: a.messages, loading: false, error: false })));
            setCascadeTurns(session.cascadeTurns);
            setCascadeSessionId(session.dbId);
            cascadeTurnOrder.current = session.turnCount;
        } else if (session.mode === 'loop') {
            setLoopTurns(session.cascadeTurns);
            setLoopSessionId(session.dbId);
            setLoopCurrentRound(0);
            loopTurnOrder.current = session.turnCount;
        } else {
            setParallelMsgs(session.agents.map((a) => ({ messages: a.messages, loading: false, error: false })));
            setParallelSessionId(session.dbId);
            parallelTurnOrder.current = session.turnCount;
        }
        setInput('');
    }

    function deleteSession(dbId: string) {
        setSessions((prev) => prev.filter((s) => s.dbId !== dbId));
        dbDeleteSession(dbId).catch(() => { });
    }

    function renameSession(dbId: string, title: string) {
        setSessions((prev) => prev.map((s) => s.dbId === dbId ? { ...s, title: title || null } : s));
        dbRenameSession(dbId, title).catch(() => { });
    }

    // ── session helper ────────────────────────────────────────────────────────
    async function ensureSession(): Promise<string> {
        if (activeSessionId) return activeSessionId;
        const id = await dbCreateSession(mode, agents.map((a) => a.model));
        setActiveSessionId(id);
        return id;
    }

    // ── submit handlers ───────────────────────────────────────────────────────
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || submitting) return;
        if (mode === 'cascade') await handleCascadeSubmit(trimmed);
        else if (mode === 'loop') await handleLoopSubmit(trimmed);
        else await handleParallelSubmit(trimmed);
    }

    function allRefs() {
        return autoRef && !attachedRefs.some((r) => r.id === autoRef.id)
            ? [autoRef, ...attachedRefs]
            : attachedRefs;
    }

    function allRefIds(): string[] {
        return allRefs().map((r) => r.id);
    }

    /** The chart to send with this call, or null when it has been detached. */
    function activeChart() {
        return chartAttached ? chart : null;
    }

    const memoryUnsavedCount = Object.entries(memoryDrafts).filter(
        ([cat, val]) => val !== (memoryCategories.find((c) => c.category === cat)?.content ?? '')
    ).length;

    // Which project we're working inside, read off the attached references.
    // A Project-tagged ref means this chat belongs to that work.
    function activeProjects(): string[] {
        return Array.from(new Set(allRefs().filter((r) => r.tag === 'Project').map((r) => r.group)));
    }

    // ── memory ──────────────────────────────────────────────────────────────────
    // Serialize the active mode's conversation into plain text for distillation.
    function buildTranscript(): string {
        const lines: string[] = [];
        if (mode === 'parallel') {
            const rounds = Math.max(...agents.map((a) => a.messages.length), 0);
            for (let i = 0; i < rounds; i++) {
                agents.forEach((a, ai) => {
                    const m = a.messages[i];
                    if (!m) return;
                    if (m.role === 'user' && ai === 0) lines.push(`User: ${m.content}`);
                    if (m.role === 'assistant') lines.push(`Agent ${AGENT_LABELS[ai]}: ${m.content}`);
                });
            }
        } else if (mode === 'cascade') {
            cascadeTurns.forEach((t) => {
                lines.push(`User: ${t.question}`);
                t.responses.forEach((r) => lines.push(`Agent ${AGENT_LABELS[r.agentIdx]}: ${r.content}`));
            });
        } else {
            loopTurns.forEach((t) => {
                lines.push(`[Round ${t.round ?? '?'}] User: ${t.question}`);
                t.responses.forEach((r) => lines.push(`Agent ${AGENT_LABELS[r.agentIdx]}: ${r.content}`));
            });
        }
        return lines.join('\n');
    }

    async function handleSummarize() {
        if (memorySummarizing) return;
        const transcript = buildTranscript().trim();
        if (!transcript) return;
        setMemoryOpen(true);
        setMemorySummarizing(true);
        setMemoryError(null);
        try {
            // Distil with the global utility model, not any council agent.
            const routes = await dbSummarizeMemory(transcript, memoryCategories, activeProjects(), globalModel);
            setMemoryRoutes(routes);
        } catch (err) {
            setMemoryRoutes([]);
            setMemoryError(err instanceof Error ? err.message : 'Distillation failed. Try again.');
        } finally {
            setMemorySummarizing(false);
        }
    }

    async function handleReadChart() {
        if (chartReading || !chart) return;
        setChartReadOpen(true);
        setChartReadText('');
        setChartReadError(null);
        setChartReading(true);
        try {
            await dbReadChart(chart, globalModel, (partial) => setChartReadText(partial));
        } catch (err) {
            setChartReadError(err instanceof Error ? err.message : 'Reading failed. Try again.');
        } finally {
            setChartReading(false);
        }
    }

    async function handleSaveCategory(category: string, content: string) {
        // A distilled project category may not exist yet — add it rather than dropping the save.
        setMemoryCategories((prev) => prev.some((c) => c.category === category)
            ? prev.map((c) => c.category === category ? { ...c, content } : c)
            : [...prev, { category, content }].sort((a, b) => a.category.localeCompare(b.category)));
        setSelectedMemoryCats((prev) => prev.includes(category) ? prev : [...prev, category]);
        try { await dbSaveMemoryCategory(category, content); } catch { /* non-fatal */ }
    }

    async function handleCreateCategory(name: string) {
        try { await dbCreateMemoryCategory(name); await refreshMemory(); } catch { /* non-fatal */ }
    }

    async function handleRenameCategory(from: string, to: string) {
        setSelectedMemoryCats((prev) => prev.map((c) => c === from ? to : c));
        try { await dbRenameMemoryCategory(from, to); await refreshMemory(); } catch { /* non-fatal */ }
    }

    async function handleDeleteCategory(category: string) {
        try { await dbDeleteMemoryCategory(category); await refreshMemory(); } catch { /* non-fatal */ }
    }

    function toggleMemoryCat(category: string) {
        setSelectedMemoryCats((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    }

    async function handleParallelSubmit(trimmed: string) {
        setInput('');
        setSubmitting(true);
        userScrolledRef.current = false;
        const userMsg: AgentMessage = { role: 'user', content: trimmed };
        const snapshot = agents;
        const refIds = allRefIds();

        setModeMessages((prev) => prev.map((m) => ({
            ...m,
            messages: [...m.messages, userMsg, { role: 'assistant' as const, content: '' }],
            loading: true, error: false,
        })));

        const results = await Promise.allSettled(
            snapshot.map((agent, i) => {
                const payload = {
                    messages: [...agent.messages, userMsg],
                    model: agent.model,
                    systemPrompt: agent.systemPrompt,
                    refIds,
                    chart: activeChart(),
                    includeMemory: memoryEnabled, memoryCategories: selectedMemoryCats,
                };
                return streamChat(payload, (partial) => {
                    setModeMessages((prev) => prev.map((m, j) => {
                        if (j !== i) return m;
                        const msgs = [...m.messages];
                        msgs[msgs.length - 1] = { role: 'assistant', content: partial };
                        return { ...m, messages: msgs };
                    }));
                }).then(({ content: full, usage }) => {
                    setModeMessages((prev) => prev.map((m, j) => {
                        if (j !== i) return m;
                        const msgs = [...m.messages];
                        msgs[msgs.length - 1] = { role: 'assistant', content: full, usage: usage ?? undefined };
                        return { ...m, messages: msgs, loading: false, error: false };
                    }));
                    return { agentIndex: i, model: agent.model, content: full, usage: usage ?? undefined };
                }).catch(() => {
                    const fallback = 'The instrument is silent. The signal did not return.';
                    setModeMessages((prev) => prev.map((m, j) => {
                        if (j !== i) return m;
                        const msgs = [...m.messages];
                        msgs[msgs.length - 1] = { role: 'assistant', content: fallback };
                        return { ...m, messages: msgs, loading: false, error: true };
                    }));
                    return { agentIndex: i, model: agent.model, content: fallback, usage: undefined };
                });
            })
        );

        try {
            const sessionId = await ensureSession();
            const order = turnOrderRef.current++;
            const responses = results
                .filter((r): r is PromiseFulfilledResult<{ agentIndex: number; model: string; content: string; usage?: Usage }> => r.status === 'fulfilled')
                .map((r) => r.value);
            await dbSaveTurn(sessionId, order, trimmed, responses);
        } catch { /* non-fatal */ }

        setSubmitting(false);
    }

    // ── nudge: fire a single agent without a user message ────────────────────
    async function handleAgentNudge(agentIdx: number) {
        if (anyLoading || cascadeTurns.length === 0) return;
        setSubmitting(true);
        const refIds = allRefIds();

        const systemPromptBase = (agent: AgentState, idx: number) => {
            const identity = `You are Agent ${AGENT_LABELS[idx]} in this council. Respond only as yourself — in first person, from your own perspective only. Do not open your response by announcing who you are.`;
            return `${agent.systemPrompt}\n\n${identity}`;
        };

        // Append this response to the last existing turn
        const turnIdx = cascadeTurns.length - 1;
        setCascadeLoading(agentIdx);

        const messages: AgentMessage[] = [];
        const priorLines: string[] = [];
        cascadeTurns.forEach((t) => {
            priorLines.push(`User: ${t.question}`);
            t.responses.forEach((r) => {
                const label = r.agentIdx === agentIdx
                    ? `You (Agent ${AGENT_LABELS[r.agentIdx]})`
                    : `Agent ${AGENT_LABELS[r.agentIdx]}`;
                priorLines.push(`${label}: ${r.content}`);
            });
        });
        messages.push({ role: 'assistant', content: `[Conversation so far]\n${priorLines.join('\n')}` });
        messages.push({
            role: 'user',
            content: `Read the conversation above and give your response as Agent ${AGENT_LABELS[agentIdx]}. Do not summarise what others said — contribute your own perspective.`,
        });

        // Optimistic placeholder
        setCascadeTurns((prev) => prev.map((t, idx) =>
            idx === turnIdx ? { ...t, responses: [...t.responses, { agentIdx: agentIdx, content: '' }] } : t
        ));

        let content = 'The instrument is silent. The signal did not return.';
        let usage: Usage | null = null;
        try {
            const result = await streamChat(
                { messages, model: agents[agentIdx].model, systemPrompt: systemPromptBase(agents[agentIdx], agentIdx), refIds, chart: activeChart(), includeMemory: memoryEnabled, memoryCategories: selectedMemoryCats },
                (partial) => {
                    setCascadeTurns((prev) => prev.map((t, idx) => {
                        if (idx !== turnIdx) return t;
                        const responses = [...t.responses];
                        responses[responses.length - 1] = { agentIdx: agentIdx, content: partial };
                        return { ...t, responses };
                    }));
                }
            );
            content = result.content;
            usage = result.usage;
        } catch { /* keep fallback */ }

        setCascadeTurns((prev) => prev.map((t, idx) => {
            if (idx !== turnIdx) return t;
            const responses = [...t.responses];
            responses[responses.length - 1] = { agentIdx: agentIdx, content, usage: usage ?? undefined };
            return { ...t, responses };
        }));

        setCascadeLoading(null);
        try {
            const sessionId = await ensureSession();
            const order = turnOrderRef.current++;
            await dbSaveTurn(sessionId, order, `[Agent ${AGENT_LABELS[agentIdx]} nudge]`, [
                { agentIndex: agentIdx, model: agents[agentIdx].model, content, usage: usage ?? undefined },
            ]);
        } catch { /* non-fatal */ }

        setSubmitting(false);
    }

    async function handleCascadeSubmit(trimmed: string) {
        setInput('');
        setSubmitting(true);
        userScrolledRef.current = false;
        const refIds = allRefIds();

        const systemPromptBase = (agent: AgentState, agentIdx: number) => {
            const identity = `You are Agent ${AGENT_LABELS[agentIdx]} in this council. Respond only as yourself — in first person, from your own perspective only. Do not open your response by announcing who you are.

IMPORTANT: The user may address multiple agents in a single message. Only respond to what is directed at you or to the general question. Do not speak on behalf of other agents.`;
            return `${agent.systemPrompt}\n\n${identity}`;
        };

        // Determine which agents should respond this turn (in order)
        const respondingAgentIndices = [0, 1, 2].filter((i) => selectedAgentIdxs.has(i));

        const turnIdx = cascadeTurns.length;
        setCascadeTurns((prev) => [...prev, { question: trimmed, responses: [] }]);
        const responses: AgentResponse[] = [];

        for (const i of respondingAgentIndices) {
            setCascadeLoading(i);
            const messages: AgentMessage[] = [];

            if (cascadeTurns.length > 0) {
                const priorLines: string[] = [];
                cascadeTurns.forEach((t) => {
                    priorLines.push(`User: ${t.question}`);
                    t.responses.forEach((r) => {
                        const label = r.agentIdx === i ? `You (Agent ${AGENT_LABELS[r.agentIdx]})` : `Agent ${AGENT_LABELS[r.agentIdx]}`;
                        priorLines.push(`${label}: ${r.content}`);
                    });
                });
                messages.push({ role: 'assistant', content: `[Prior conversation]\n${priorLines.join('\n')}` });
            }

            messages.push({ role: 'user', content: trimmed });

            if (responses.length > 0) {
                const precedingText = responses.map((r) => {
                    const label = r.agentIdx === i ? `You (Agent ${AGENT_LABELS[r.agentIdx]})` : `Agent ${AGENT_LABELS[r.agentIdx]}`;
                    return `${label} said:\n${r.content}`;
                }).join('\n\n');
                messages.push({
                    role: 'user',
                    content: `The following agents have already responded. You may build upon, challenge, or extend their perspectives — but respond only as yourself (Agent ${AGENT_LABELS[i]}).\n\n${precedingText}\n\nNow give your own response.`,
                });
            }

            setCascadeTurns((prev) => prev.map((t, idx) =>
                idx === turnIdx ? { ...t, responses: [...responses, { agentIdx: i, content: '' }] } : t
            ));

            let content = 'The instrument is silent. The signal did not return.';
            let usage: Usage | null = null;
            try {
                const result = await streamChat(
                    { messages, model: agents[i].model, systemPrompt: systemPromptBase(agents[i], i), refIds, chart: activeChart(), includeMemory: memoryEnabled, memoryCategories: selectedMemoryCats },
                    (partial) => {
                        setCascadeTurns((prev) => prev.map((t, idx) => {
                            if (idx !== turnIdx) return t;
                            return { ...t, responses: [...responses, { agentIdx: i, content: partial }] };
                        }));
                    }
                );
                content = result.content;
                usage = result.usage;
            } catch { /* keep fallback */ }

            responses.push({ agentIdx: i, content, usage: usage ?? undefined });
            setCascadeTurns((prev) => prev.map((t, idx) =>
                idx === turnIdx ? { ...t, responses: [...responses] } : t
            ));
        }

        setCascadeLoading(null);
        try {
            const sessionId = await ensureSession();
            const order = turnOrderRef.current++;
            await dbSaveTurn(sessionId, order, trimmed,
                responses.map((r) => ({ agentIndex: r.agentIdx, model: agents[r.agentIdx].model, content: r.content, usage: r.usage }))
            );
        } catch { /* non-fatal */ }

        setSubmitting(false);
    }

    async function handleLoopSubmit(trimmed: string) {
        setInput('');
        setSubmitting(true);
        userScrolledRef.current = false;
        const refIds = allRefIds();
        const agentSnapshot = agentConfigs.map((cfg) => ({ ...cfg }));

        const systemPromptForAgent = (agent: AgentConfig, agentIdx: number) => {
            const identity = `You are Agent ${AGENT_LABELS[agentIdx]} in a council loop discussion. Respond only as yourself. Each round builds on prior rounds — push the thinking further. Do not open your response by announcing who you are.`;
            return `${agent.systemPrompt}\n\n${identity}`;
        };

        const allNewTurns: { question: string; round: number; responses: AgentResponse[] }[] = [];

        for (let round = 1; round <= loopRounds; round++) {
            setLoopCurrentRound(round);
            const turnIdx = loopTurns.length + allNewTurns.length;
            setLoopTurns((prev) => [...prev, { question: trimmed, round, responses: [] }]);
            const responses: AgentResponse[] = [];

            for (let i = 0; i < agentSnapshot.length; i++) {
                setLoopLoading({ round, agentIdx: i });
                const messages: AgentMessage[] = [];

                const allPriorTurns = [...loopTurns, ...allNewTurns];
                if (allPriorTurns.length > 0) {
                    const priorLines = [`Original question: ${trimmed}`, ''];
                    allPriorTurns.forEach((t) => {
                        priorLines.push(`--- Round ${t.round ?? '?'} ---`);
                        t.responses.forEach((r) => {
                            const label = r.agentIdx === i ? `You (Agent ${AGENT_LABELS[r.agentIdx]})` : `Agent ${AGENT_LABELS[r.agentIdx]}`;
                            priorLines.push(`${label}: ${r.content}`);
                        });
                    });
                    messages.push({ role: 'assistant', content: `[Prior rounds]\n${priorLines.join('\n')}` });
                }

                const roundPrompt = round === 1
                    ? trimmed
                    : `Round ${round} of ${loopRounds}. Continue the discussion on: "${trimmed}". Build upon or challenge what was said in prior rounds.`;
                messages.push({ role: 'user', content: roundPrompt });

                if (responses.length > 0) {
                    const precedingText = responses.map((r) => {
                        const label = r.agentIdx === i ? `You (Agent ${AGENT_LABELS[r.agentIdx]})` : `Agent ${AGENT_LABELS[r.agentIdx]}`;
                        return `${label} said:\n${r.content}`;
                    }).join('\n\n');
                    messages.push({
                        role: 'user',
                        content: `Others have responded this round. Respond only as yourself (Agent ${AGENT_LABELS[i]}).\n\n${precedingText}\n\nNow give your own response.`,
                    });
                }

                setLoopTurns((prev) => prev.map((t, idx) =>
                    idx === turnIdx ? { ...t, responses: [...responses, { agentIdx: i, content: '' }] } : t
                ));

                let content = 'The instrument is silent. The signal did not return.';
                let usage: Usage | null = null;
                try {
                    const result = await streamChat(
                        { messages, model: agentSnapshot[i].model, systemPrompt: systemPromptForAgent(agentSnapshot[i], i), refIds, chart: activeChart(), includeMemory: memoryEnabled, memoryCategories: selectedMemoryCats },
                        (partial) => {
                            setLoopTurns((prev) => prev.map((t, idx) =>
                                idx !== turnIdx ? t : { ...t, responses: [...responses, { agentIdx: i, content: partial }] }
                            ));
                        }
                    );
                    content = result.content;
                    usage = result.usage;
                } catch { /* keep fallback */ }

                responses.push({ agentIdx: i, content, usage: usage ?? undefined });
                setLoopTurns((prev) => prev.map((t, idx) =>
                    idx === turnIdx ? { ...t, responses: [...responses] } : t
                ));
            }

            allNewTurns.push({ question: trimmed, round, responses });
        }

        setLoopLoading(null);
        setLoopCurrentRound(0);

        try {
            let sessionId = loopSessionId;
            if (!sessionId) {
                sessionId = await dbCreateSession('loop', agentSnapshot.map((a) => a.model));
                setLoopSessionId(sessionId);
            }
            for (const turn of allNewTurns) {
                const order = loopTurnOrder.current++;
                await dbSaveTurn(sessionId, order, `[Round ${turn.round}] ${turn.question}`,
                    turn.responses.map((r) => ({ agentIndex: r.agentIdx, model: agentSnapshot[r.agentIdx].model, content: r.content, usage: r.usage }))
                );
            }
            dbLoadSessions().then(setSessions).catch(() => { });
        } catch { /* non-fatal */ }

        setSubmitting(false);
    }

    // ── render ────────────────────────────────────────────────────────────────
    return (
        <main className="flex h-full flex-col overflow-hidden bg-void text-parchment">

            {/* background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(107,175,154,0.10),transparent_40%)]" />
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,var(--color-rule)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-rule)_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>

            {/* header */}
            <header className="relative z-10 shrink-0 border-b border-gold-muted/20 px-6 pt-5 pb-3">
                <div className="relative flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <span className="font-plex text-[11px] uppercase tracking-[0.5em] text-gold-muted/50">◈</span>
                        <h1 className="font-cinzel text-xl tracking-[0.06em] text-parchment-4">The Council</h1>
                    </div>
                    {/* mode toggle */}
                    <div className="absolute right-0 flex items-center border border-gold-muted/20 overflow-hidden">
                        {(['parallel', 'cascade', 'loop'] as const).map((m, mi) => (
                            <div key={m} className="flex items-center">
                                {mi > 0 && <div className="w-px h-3 bg-gold-muted/20" />}
                                <button
                                    onClick={() => setMode(m)}
                                    className={`px-3 py-1.5 font-plex text-[11px] uppercase tracking-[0.35em] transition-colors ${mode === m ? 'bg-surface-alt text-gold-accent' : 'text-muted hover:text-gold-dim'}`}
                                >
                                    {m.charAt(0).toUpperCase() + m.slice(1)}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* session controls row */}
                <SessionControlsRow
                    chart={chart}
                    charts={charts}
                    chartAttached={chartAttached}
                    chartReading={chartReading}
                    onSelectChart={selectChart}
                    onToggleChartAttached={() => setChartAttached((v) => !v)}
                    onReadChart={handleReadChart}
                    promptModalOpen={promptModalOpen}
                    refsOpen={refsOpen}
                    memoryOpen={memoryOpen}
                    usageOpen={usageOpen}
                    attachedRefsCount={attachedRefs.length}
                    autoRef={!!autoRef}
                    memoryEnabled={memoryEnabled}
                    memoryCategories={memoryCategories}
                    selectedMemoryCats={selectedMemoryCats}
                    memoryUnsavedCount={memoryUnsavedCount}
                    memorySummarizing={memorySummarizing}
                    hasMessages={hasMessages}
                    anyLoading={anyLoading}
                    sessionUsage={sessionUsage ?? null}
                    formatTokens={formatTokens}
                    formatSpend={formatSpend}
                    globalModel={globalModel}
                    onGlobalModelChange={setGlobalModel}
                    onOpenPrompts={() => setPromptModalOpen(true)}
                    onOpenRefs={() => setRefsOpen(true)}
                    onOpenMemory={() => setMemoryOpen(true)}
                    onToggleMemoryEnabled={() => setMemoryEnabled((v) => !v)}
                    onSummarize={handleSummarize}
                    onSaveAndNew={saveAndNew}
                    onOpenUsage={() => setUsageOpen(true)}
                />
            </header>

            {/* body */}
            <div className="relative z-10 flex flex-1 overflow-hidden">
                <SessionsSidebar
                    sessions={sessions}
                    open={sidebarOpen}
                    hasMessages={hasMessages}
                    anyLoading={anyLoading}
                    onToggle={() => setSidebarOpen((v) => !v)}
                    onSaveNew={saveAndNew}
                    onRestore={restoreSession}
                    onDelete={deleteSession}
                    onRename={renameSession}
                />

                {mode === 'parallel' && (
                    <ParallelView
                        agents={agents}
                        anyLoading={anyLoading}
                        onModelChange={setAgentModel}
                        bottomRefs={bottomRefs}
                    />
                )}
                {mode === 'cascade' && (
                    <CascadeView
                        turns={cascadeTurns}
                        loading={cascadeLoading}
                        agents={agents}
                        anyLoading={anyLoading}
                        bottomRef={cascadeBottomRef}
                        onModelChange={setAgentModel}
                        selectedAgentIdxs={selectedAgentIdxs}
                        onToggleAgent={(i) => setSelectedAgentIdxs((prev) => {
                            const next = new Set(prev);
                            if (next.has(i)) next.delete(i); else next.add(i);
                            return next;
                        })}
                        onOpenPrompt={(i) => { setPromptTab(i); setPromptModalOpen(true); }}
                        onNudgeAgent={handleAgentNudge}
                        onScroll={handleScrollContainerScroll}
                    />
                )}
                {mode === 'loop' && (
                    <LoopView
                        turns={loopTurns}
                        loading={loopLoading}
                        currentRound={loopCurrentRound}
                        rounds={loopRounds}
                        agentConfigs={agentConfigs}
                        anyLoading={anyLoading}
                        bottomRef={loopBottomRef}
                        onModelChange={setAgentModel}
                        onRoundsChange={setLoopRounds}
                        onScroll={handleScrollContainerScroll}
                    />
                )}
            </div>

            {/* input */}
            <CouncilInput
                input={input}
                mode={mode}
                anyLoading={anyLoading}
                sidebarOpen={sidebarOpen}
                loopCurrentRound={loopCurrentRound}
                loopRounds={loopRounds}
                onChange={setInput}
                onSubmit={handleSubmit}
            />

            {/* modals */}
            <CouncilModals
                refsOpen={refsOpen}
                availableRefs={availableRefs}
                attachedRefs={attachedRefs}
                autoRef={autoRef}
                onCloseRefs={() => setRefsOpen(false)}
                onToggleRef={toggleRef}
                onSetRefs={setAttachedRefs}
                onClearRefs={() => setAttachedRefs([])}
                memoryOpen={memoryOpen}
                memoryCategories={memoryCategories}
                selectedMemoryCats={selectedMemoryCats}
                memoryRoutes={memoryRoutes}
                memorySummarizing={memorySummarizing}
                memoryError={memoryError}
                memoryDrafts={memoryDrafts}
                hasMessages={hasMessages}
                setMemoryDrafts={setMemoryDrafts}
                onCloseMemory={() => { setMemoryOpen(false); setMemoryRoutes(null); }}
                onToggleMemoryCat={toggleMemoryCat}
                onSaveCategory={handleSaveCategory}
                onCreateCategory={handleCreateCategory}
                onRenameCategory={handleRenameCategory}
                onDeleteCategory={handleDeleteCategory}
                onSummarize={handleSummarize}
                onDismissRoutes={() => setMemoryRoutes(null)}
                usageOpen={usageOpen}
                usageTurns={usageTurns}
                sessions={sessions}
                onCloseUsage={() => setUsageOpen(false)}
                promptModalOpen={promptModalOpen}
                agents={agents}
                syncPrompts={syncPrompts}
                promptTab={promptTab}
                promptSaved={promptSaved}
                onClosePrompts={() => setPromptModalOpen(false)}
                onPromptTabChange={setPromptTab}
                onPromptChange={setAgentPrompt}
                onSyncToggle={handleSyncToggle}
                onPromptSave={() => { setPromptSaved(true); setTimeout(() => setPromptSaved(false), 2000); }}
                chartReadOpen={chartReadOpen}
                chart={chart}
                chartReadText={chartReadText}
                chartReading={chartReading}
                chartReadError={chartReadError}
                onCloseChartRead={() => setChartReadOpen(false)}
                onReread={handleReadChart}
            />
        </main>
    );
}
