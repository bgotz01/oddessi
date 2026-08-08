// ─── shared types & constants for the Council feature ────────────────────────

import { COUNCIL_DEFAULT_MODELS } from '@/lib/models';
import { AGENT_PERSONA_DEFAULT } from '@/lib/prompts/council';

/** What a single call cost. Reported by OpenRouter on the last chunk of the
 *  stream — `cost` is what it charged, not an estimate from lib/models.ts, so
 *  it stays right when a provider's rate moves. */
export interface Usage {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cost: number; // USD
    model: string;
}

export interface AgentMessage {
    role: 'user' | 'assistant';
    content: string;
    /** Assistant messages only. Absent on sessions predating usage accounting. */
    usage?: Usage;
}

export interface AgentState {
    model: string;
    systemPrompt: string;
    messages: AgentMessage[];
    loading: boolean;
    error: boolean;
}

export interface AgentConfig {
    model: string;
    systemPrompt: string;
}

export interface MsgState {
    messages: AgentMessage[];
    loading: boolean;
    error: boolean;
}

export interface AgentResponse {
    agentIdx: number;
    content: string;
    /** Absent while streaming, and on turns saved before usage accounting. */
    usage?: Usage;
}

export interface CascadeTurn {
    question: string;
    round?: number; // Loop mode: which round this is (1-indexed)
    responses: AgentResponse[];
}

export interface SavedSession {
    dbId: string;
    savedAt: Date;
    firstQuestion: string;
    title: string | null;
    agents: AgentState[];
    mode: 'parallel' | 'cascade' | 'solo' | 'loop';
    turnCount: number;
    cascadeTurns: CascadeTurn[];
}

// ─── constants ────────────────────────────────────────────────────────────────

export const AGENT_LABELS = ['I', 'II', 'III'] as const;

export const DEFAULT_MODELS = COUNCIL_DEFAULT_MODELS;

export const LS_MODELS_KEY = 'council_agent_models_v3';
export const LS_PROMPTS_KEY = 'council_agent_prompts_v2';
export const LS_SYNC_KEY = 'council_sync_prompts_v2';

/** Seed the Prompts modal offers under "Reset to default". Defined once in
 *  lib/prompts/council.ts so every prompt in the app is auditable in one place. */
export const DEFAULT_SYSTEM_PROMPT = AGENT_PERSONA_DEFAULT;

// ─── helpers ──────────────────────────────────────────────────────────────────

export function ls<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch { return fallback; }
}

export function loadStoredModels(): string[] {
    const v = ls<string[]>(LS_MODELS_KEY, [...DEFAULT_MODELS]);
    return Array.isArray(v) && v.length === 3 ? v : [...DEFAULT_MODELS];
}

export function loadStoredPrompts(): string[] {
    const def = ['', '', ''];
    const v = ls<string[]>(LS_PROMPTS_KEY, def);
    return Array.isArray(v) && v.length === 3 ? v : def;
}

export function formatTime(d: Date) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function emptyMsgState(): MsgState {
    return { messages: [], loading: false, error: false };
}

// ─── usage ────────────────────────────────────────────────────────────────────

export function sumUsage(entries: (Usage | undefined)[]): Usage | null {
    const present = entries.filter((u): u is Usage => Boolean(u));
    if (present.length === 0) return null;
    return present.reduce<Usage>(
        (acc, u) => ({
            promptTokens: acc.promptTokens + u.promptTokens,
            completionTokens: acc.completionTokens + u.completionTokens,
            totalTokens: acc.totalTokens + u.totalTokens,
            cost: acc.cost + u.cost,
            model: acc.model === u.model ? acc.model : 'mixed',
        }),
        { ...present[0], promptTokens: 0, completionTokens: 0, totalTokens: 0, cost: 0 },
    );
}

/** Every response in a set of turns, optionally narrowed to one agent. */
export function usageForAgent(turns: CascadeTurn[], agentIdx?: number): Usage | null {
    return sumUsage(
        turns.flatMap((t) =>
            t.responses
                .filter((r) => agentIdx === undefined || r.agentIdx === agentIdx)
                .map((r) => r.usage),
        ),
    );
}

/** How many calls an agent made — one per response carrying usage. */
export function callsForAgent(turns: CascadeTurn[], agentIdx: number): number {
    return turns.reduce(
        (n, t) => n + t.responses.filter((r) => r.agentIdx === agentIdx && r.usage).length,
        0,
    );
}

/** Parallel mode keeps a thread per agent rather than shared turns. This folds
 *  those threads into turn shape so usage reporting has one input format. */
export function turnsFromParallel(threads: { messages: AgentMessage[] }[]): CascadeTurn[] {
    const longest = Math.max(0, ...threads.map((t) => t.messages.length));
    const turns: CascadeTurn[] = [];
    // Threads alternate user, assistant — every pair is one turn.
    for (let i = 0; i + 1 < longest; i += 2) {
        const question = threads.find((t) => t.messages[i]?.role === 'user')?.messages[i]?.content ?? '';
        const responses: AgentResponse[] = [];
        threads.forEach((t, agentIdx) => {
            const reply = t.messages[i + 1];
            if (reply?.role === 'assistant') {
                responses.push({ agentIdx, content: reply.content, usage: reply.usage });
            }
        });
        turns.push({ question, responses });
    }
    return turns;
}

export function formatTokens(n: number): string {
    if (n < 1000) return String(n);
    if (n < 100_000) return `${(n / 1000).toFixed(1)}k`;
    return `${Math.round(n / 1000)}k`;
}

export function formatSpend(usd: number): string {
    if (usd === 0) return '$0';
    if (usd < 0.0001) return '<$0.0001';
    if (usd < 1) return `$${usd.toFixed(4)}`;
    return `$${usd.toFixed(2)}`;
}

/** "1.2k in · 863 out · $0.0042" — the one-line readout used throughout. */
export function formatUsage(u: Usage): string {
    return `${formatTokens(u.promptTokens)} in · ${formatTokens(u.completionTokens)} out · ${formatSpend(u.cost)}`;
}
