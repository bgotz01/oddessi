// lib/industry/uranus-gemini-data.ts

export type GeminiPrincipleRow = {
  principle: string;
  manifestation: string;
};

export const GEMINI_PRINCIPLES: GeminiPrincipleRow[] = [
  { principle: "Multiplicity",   manifestation: "One artist operates across many sounds, formats, identities" },
  { principle: "Exchange",       manifestation: "Music moves rapidly between creators, audiences and platforms" },
  { principle: "Communication",  manifestation: "Music becomes more conversational / participatory" },
  { principle: "Connection",     manifestation: "Collaboration becomes increasingly networked" },
  { principle: "Adaptability",   manifestation: "Songs change form depending on context / platform" },
  { principle: "Fragmentation",  manifestation: "Albums / genres give way to smaller, fluid musical units" },
  { principle: "Duality",        manifestation: "Artist ↔ creator, song ↔ content, musician ↔ personality" },
  { principle: "Translation",    manifestation: "Music crosses languages, cultures and formats more easily" },
];
