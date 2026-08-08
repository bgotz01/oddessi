// ─── DB helpers + streaming for the Council feature ──────────────────────────

import { type AgentMessage, type AgentState, type CascadeTurn, type SavedSession, type Usage } from './types';

// ─── sessions ─────────────────────────────────────────────────────────────────

export async function dbCreateSession(mode: string, agentModels: string[]): Promise<string> {
    const res = await fetch('/api/council/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, agentModels }),
    });
    const { id } = await res.json() as { id: string };
    return id;
}

export async function dbSaveTurn(
    sessionId: string,
    order: number,
    question: string,
    responses: { agentIndex: number; model: string; content: string; usage?: Usage }[],
) {
    await fetch('/api/council/turns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, question, order, responses }),
    });
}

export async function dbRenameSession(id: string, title: string): Promise<void> {
    await fetch(`/api/council/sessions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
    });
}

export async function dbDeleteSession(id: string) {
    await fetch(`/api/council/sessions/${id}`, { method: 'DELETE' });
}

export async function dbLoadSessions(): Promise<SavedSession[]> {
    const res = await fetch('/api/council/sessions');
    const rows = await res.json() as {
        id: string;
        mode: string;
        agentModels: string[];
        title: string | null;
        createdAt: string;
        updatedAt: string;
        turns: {
            id: string;
            question: string;
            order: number;
            responses: {
                agentIndex: number; model: string; content: string;
                promptTokens?: number | null; completionTokens?: number | null; cost?: number | null;
            }[];
        }[];
    }[];

    // Rows carry usage as flat nullable columns; the UI wants a Usage object.
    // The fields are absent (not just null) on rows written before usage
    // accounting, so both cases must read as "no usage" — otherwise every old
    // response reports a real-looking zero and dilutes the totals.
    const toUsage = (r: {
        model: string; promptTokens?: number | null; completionTokens?: number | null; cost?: number | null;
    }): Usage | undefined => {
        if (typeof r.promptTokens !== 'number' && typeof r.completionTokens !== 'number') return undefined;
        const promptTokens = r.promptTokens ?? 0;
        const completionTokens = r.completionTokens ?? 0;
        return {
            promptTokens,
            completionTokens,
            totalTokens: promptTokens + completionTokens,
            cost: r.cost ?? 0,
            model: r.model,
        };
    };

    return rows.map((row) => {
        const firstQuestion = row.turns[0]?.question ?? 'Untitled';
        const agents: AgentState[] = row.agentModels.map((model) => ({
            model,
            systemPrompt: '',
            messages: [],
            loading: false,
            error: false,
        }));

        // Rebuild cascade/loop turns
        const cascadeTurns: CascadeTurn[] = row.turns.map((turn) => ({
            question: turn.question,
            responses: turn.responses.map((r) => ({
                agentIdx: r.agentIndex, content: r.content, usage: toUsage(r),
            })),
        }));

        // For parallel mode: replay turns into per-agent message histories
        if (row.mode === 'parallel') {
            row.turns.forEach((turn) => {
                agents.forEach((agent, i) => {
                    agent.messages.push({ role: 'user', content: turn.question });
                    const resp = turn.responses.find((r) => r.agentIndex === i);
                    if (resp) {
                        agent.messages.push({ role: 'assistant', content: resp.content, usage: toUsage(resp) });
                    }
                });
            });
        }

        return {
            dbId: row.id,
            savedAt: new Date(row.updatedAt),
            firstQuestion,
            title: row.title ?? null,
            agents,
            mode: row.mode as SavedSession['mode'],
            turnCount: row.turns.length,
            cascadeTurns,
        };
    });
}

// ─── preferences ──────────────────────────────────────────────────────────────

export interface CouncilPrefs {
    agentModels: string[];
    agentPrompts: string[];
    globalModel?: string;
}

export async function dbLoadPreferences(): Promise<CouncilPrefs> {
    const res = await fetch('/api/council/preferences');
    const data = await res.json() as CouncilPrefs;
    return data;
}

export async function dbSavePreferences(prefs: Partial<CouncilPrefs>): Promise<void> {
    await fetch('/api/council/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs),
    });
}

// ─── memory ───────────────────────────────────────────────────────────────────

export interface MemoryCategory {
    category: string;
    content: string;
}

export interface MemoryRoute {
    category: string;
    lessons: string[];
}

export async function dbLoadMemory(): Promise<MemoryCategory[]> {
    const res = await fetch('/api/council/memory');
    const data = await res.json() as MemoryCategory[];
    return Array.isArray(data) ? data : [];
}

export async function dbSaveMemoryCategory(category: string, content: string): Promise<void> {
    await fetch('/api/council/memory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, content }),
    });
}

export async function dbCreateMemoryCategory(category: string): Promise<void> {
    await fetch('/api/council/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
    });
}

export async function dbRenameMemoryCategory(from: string, to: string): Promise<void> {
    await fetch('/api/council/memory', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to }),
    });
}

export async function dbDeleteMemoryCategory(category: string): Promise<void> {
    await fetch(`/api/council/memory?category=${encodeURIComponent(category)}`, { method: 'DELETE' });
}

/** Distill new lessons from a transcript, routed into categories (empty if none). */
export async function dbSummarizeMemory(
    transcript: string,
    categories: MemoryCategory[],
    projects: string[] = [],
    model?: string,
): Promise<MemoryRoute[]> {
    const res = await fetch('/api/council/memory/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, categories, projects, model }),
    });
    const data = await res.json().catch(() => ({})) as { routes?: MemoryRoute[]; error?: string };
    if (!res.ok) throw new Error(data.error || 'Distillation failed. Try again.');
    return data.routes ?? [];
}

// ─── streaming ────────────────────────────────────────────────────────────────

export interface StreamResult {
    content: string;
    /** Null when the provider returned no usage on the final chunk. */
    usage: Usage | null;
}

export async function streamChat(
    payload: { messages: AgentMessage[]; model: string; systemPrompt: string; refIds?: string[]; includeMemory?: boolean; memoryCategories?: string[] },
    onDelta: (delta: string) => void,
): Promise<StreamResult> {
    const res = await fetch('/api/council/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok || !res.body) throw new Error('Stream failed');

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let full = '';
    let buffer = '';
    let usage: Usage | null = null;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const raw = line.slice(6).trim();
            if (raw === '[DONE]') return { content: full, usage };
            try {
                const parsed = JSON.parse(raw) as { delta?: string; usage?: Usage };
                if (parsed.usage) usage = parsed.usage;
                if (parsed.delta) { full += parsed.delta; onDelta(full); }
            } catch { /* skip malformed */ }
        }
    }
    return { content: full, usage };
}
