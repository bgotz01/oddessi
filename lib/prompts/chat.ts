// ─── Generic chat prompt ─────────────────────────────────────────────────────
// The fallback system prompt for the plain chat route, used when the client
// sends no system prompt of its own. Deliberately minimal — and deliberately
// NOT plain-language-constrained, since it is a general assistant voice, not one
// of the analytical engines.

export const CHAT_DEFAULT_SYSTEM = `You are a helpful assistant. Be direct, clear, and useful.`;
