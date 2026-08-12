export function formatCost(inputCost: number, outputCost: number): string {
    return `$${inputCost.toFixed(2)} / $${outputCost.toFixed(2)}`;
}

// The catalogue. `cost` is NOT stored here — it is derived from inputCost /
// outputCost below, so the display string can never drift from the numbers
// (as it once had for GLM 5.2). Prices are the OpenRouter defaults; the Models
// page can override any of them, persisted to Postgres (see /api/models).
const RAW_MODELS = [
    { id: 'deepseek/deepseek-v4-flash', label: 'DeepSeek V4 Flash', inputCost: 0.09, outputCost: 0.18, context: '1M', speed: '21 t/s', speedNum: 21, latency: '870ms', latencyMs: 870, maxTokens: 8000 },
    { id: 'deepseek/deepseek-v4-flash-0731', label: 'DeepSeek V4 Flash 0731', inputCost: 0.09, outputCost: 0.18, context: '1M', speed: '21 t/s', speedNum: 21, latency: '870ms', latencyMs: 870, maxTokens: 8000 },
    { id: 'minimax/minimax-m3', label: 'MiniMax M3', inputCost: 0.30, outputCost: 1.20, context: '1M', speed: '44 t/s', speedNum: 44, latency: '2202ms', latencyMs: 2202, maxTokens: 8000 },
    { id: 'xiaomi/mimo-v2.5', label: 'Xiaomi MiMo-V2.5', inputCost: 0.14, outputCost: 0.28, context: '1M', speed: '38 t/s', speedNum: 38, latency: '2128ms', latencyMs: 2128, maxTokens: 8000 },
    { id: 'deepseek/deepseek-v4-pro', label: 'DeepSeek V4 Pro', inputCost: 0.44, outputCost: 0.87, context: '1M', speed: '66 t/s', speedNum: 66, latency: '1256ms', latencyMs: 1256, maxTokens: 8000 },
    { id: 'anthropic/claude-sonnet-5', label: 'Claude Sonnet 5', inputCost: 2.00, outputCost: 10.00, context: '1M', speed: '44 t/s', speedNum: 44, latency: '2046ms', latencyMs: 2046, maxTokens: 8000 },
    { id: 'anthropic/claude-opus-4.8', label: 'Claude Opus 4.8', inputCost: 5.00, outputCost: 25.00, context: '1M', speed: '43 t/s', speedNum: 43, latency: '1398ms', latencyMs: 1398, maxTokens: 8000 },
    { id: 'deepseek/deepseek-v3.2', label: 'DeepSeek V3.2', inputCost: 0.23, outputCost: 0.34, context: '131K', speed: '25 t/s', speedNum: 25, latency: '1549ms', latencyMs: 1549, maxTokens: 8000 },
    { id: 'google/gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash Lite', inputCost: 0.25, outputCost: 1.50, context: '1M', speed: '97 t/s', speedNum: 97, latency: '1074ms', latencyMs: 1074, maxTokens: 8000 },
    { id: 'google/gemini-3.5-flash', label: 'Gemini 3.5 Flash', inputCost: 1.50, outputCost: 9.00, context: '1M', speed: '141 t/s', speedNum: 141, latency: '1731ms', latencyMs: 1731, maxTokens: 8000 },
    { id: 'google/gemini-2.5-flash', label: 'Gemini 2.5 Flash', inputCost: 0.30, outputCost: 2.50, context: '1M', speed: '120 t/s', speedNum: 120, latency: '950ms', latencyMs: 950, maxTokens: 8000 },
    { id: 'google/gemma-4-26b-a4b-it', label: 'Gemma 4 26B A4B', inputCost: 0.06, outputCost: 0.33, context: '262K', speed: '12 t/s', speedNum: 12, latency: '1616ms', latencyMs: 1616, maxTokens: 8000 },
    { id: 'z-ai/glm-5.2', label: 'Z.ai GLM 5.2', inputCost: 0.42, outputCost: 1.40, context: '1M', speed: '42 t/s', speedNum: 42, latency: '1236ms', latencyMs: 1236, maxTokens: 4000 },
    { id: 'qwen/qwen3.7-plus', label: 'Qwen3.7 Plus', inputCost: 0.32, outputCost: 1.28, context: '1M', speed: '11 t/s', speedNum: 11, latency: '1190ms', latencyMs: 1190, maxTokens: 8000 },
    { id: 'qwen/qwen3.7-max', label: 'Qwen3.7 Max', inputCost: 1.25, outputCost: 3.75, context: '1M', speed: '50 t/s', speedNum: 50, latency: '1260ms', latencyMs: 1260, maxTokens: 8000 },
    { id: 'moonshotai/kimi-k3', label: 'Kimi K3', inputCost: 3.00, outputCost: 15.00, context: '1M', speed: '44 t/s', speedNum: 44, latency: '1400ms', latencyMs: 1400, maxTokens: 8000 },

    { id: 'openai/gpt-5.6-luna', label: 'GPT-5.6 Luna', inputCost: 0.10, outputCost: 0.60, context: '400K', speed: '80 t/s', speedNum: 80, latency: '1200ms', latencyMs: 1200, maxTokens: 8000 },

] as const;

export interface Model {
    id: string;
    label: string;
    inputCost: number;
    outputCost: number;
    cost: string;
    context: string;
    speed: string;
    speedNum: number;
    latency: string;
    latencyMs: number;
    maxTokens: number;
}

export const MODELS: Model[] = RAW_MODELS.map((m) => ({ ...m, cost: formatCost(m.inputCost, m.outputCost) }));

export const DEFAULT_MODEL = 'google/gemini-3.1-flash-lite';

// ─── price overrides ──────────────────────────────────────────────────────────
// Prices drift, so the Models page lets the user edit input/output and persists
// the change to Postgres (see /api/models). These helpers merge those overrides
// onto the code defaults and keep the `cost` string in step with the numbers.

export type PriceOverride = { inputCost: number; outputCost: number };
export type PriceOverrides = Record<string, PriceOverride>;

/** Returns the model with any override applied and `cost` recomputed. */
export function withOverride<T extends Model>(model: T, overrides?: PriceOverrides): T {
    const o = overrides?.[model.id];
    if (!o) return model;
    return { ...model, inputCost: o.inputCost, outputCost: o.outputCost, cost: formatCost(o.inputCost, o.outputCost) };
}

/** The catalogue with overrides applied. `hidden` ids are soft-removed and
 *  dropped from the result — pass them so pickers never list a removed model. */
export function modelsWithOverrides(overrides?: PriceOverrides, hidden?: Iterable<string>): Model[] {
    const hide = hidden ? new Set(hidden) : null;
    return MODELS
        .filter((m) => !hide?.has(m.id))
        .map((m) => withOverride(m, overrides));
}

// ─── council default models (one per agent) ───────────────────────────────────
export const COUNCIL_DEFAULT_MODELS = [
    'qwen/qwen3.7-max',
    'z-ai/glm-5.2',
    'google/gemini-3.1-flash-lite',
] as const;

// ─── global utility model ─────────────────────────────────────────────────────
// Used for work that isn't a council agent speaking — currently memory distillation.
// Set independently of the three agents so swapping an agent never changes it.
export const GLOBAL_DEFAULT_MODEL = 'google/gemini-3.5-flash';

// ─── paradigm engine default model ────────────────────────────────────────────
// The whole reconstruction pipeline runs on one head; it defaults to the cheapest
// fast model so exploratory runs stay cheap. Chosen independently of the others.
export const PARADIGM_DEFAULT_MODEL = 'google/gemini-3.1-flash-lite';

// The critic runs a separate, stronger model than generation — it is judging the
// generated content, so reasoning quality matters more than speed or cost.
export const CRITIC_DEFAULT_MODEL = 'openai/gpt-5.6-luna';

// ─── tier classification (by output cost per 1M tokens) ──────────────────────
// Low:  < $3   Mid:  $3–$10   High:  > $10

export type ModelTier = 'low' | 'mid' | 'high';

export function modelTier(m: { outputCost: number }): ModelTier {
    if (m.outputCost >= 10) return 'high';
    if (m.outputCost >= 3) return 'mid';
    return 'low';
}

export const TIER_LABELS: Record<ModelTier, string> = {
    low: 'Low Tier  ·  under $3',
    mid: 'Mid Tier  ·  $3 – $10',
    high: 'High Tier  ·  $10+',
};

export const TIER_ORDER: ModelTier[] = ['low', 'mid', 'high'];

/** Returns models sorted within each tier by outputCost ascending. Pass price
 *  overrides to tier by the edited prices rather than the code defaults. */
export function modelsByTier(overrides?: PriceOverrides, hidden?: Iterable<string>): Record<ModelTier, Model[]> {
    const groups: Record<ModelTier, Model[]> = { low: [], mid: [], high: [] };
    for (const m of modelsWithOverrides(overrides, hidden)) {
        groups[modelTier(m)].push(m);
    }
    for (const tier of TIER_ORDER) {
        groups[tier].sort((a, b) => a.outputCost - b.outputCost);
    }
    return groups;
}

// ─── cost helpers ─────────────────────────────────────────────────────────────

export function blendedCost(m: { inputCost: number; outputCost: number }): number {
    return (m.inputCost + m.outputCost) / 2;
}

export const MAX_BLENDED_COST = Math.max(...MODELS.map(blendedCost));

/** Cost % relative to the most expensive model in `among` (defaults to the
 *  code catalogue). Pass an override-applied list so edits reshape the scale. */
export function costPct(
    m: { inputCost: number; outputCost: number },
    among?: { inputCost: number; outputCost: number }[],
): number {
    const max = among ? Math.max(...among.map(blendedCost)) : MAX_BLENDED_COST;
    if (max === 0) return 0;
    return Math.round((blendedCost(m) / max) * 100);
}
