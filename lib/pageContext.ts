// ─── Page context registry ────────────────────────────────────────────────────
// Registers all AI-accessible references for the council.
//
// Two sources feed it:
//   1. Markdown under context/ — hand-written notes. Add a .md file to a folder
//      that refsFromFolder() scans and it becomes a reference with no edit here.
//   2. Source files under lib/ and app/ — the app's own definitions and pages,
//      injected as fenced code blocks so the council can reason about what the
//      instrument actually computes rather than about astrology in general.
//
// Only bounded files belong in (2). The vendored interpretation tables under
// lib/astrology/interpretations/ and lib/astrology/houses/ run to hundreds of
// kilobytes each and would blow any context window — they stay out.

import fs from 'fs';
import path from 'path';

const CONTEXT_ROOT = path.join(process.cwd(), 'context');
const APP_ROOT = path.join(process.cwd(), 'app');
const LIB_ROOT = path.join(process.cwd(), 'lib');

function readMd(relativePath: string): string {
    try {
        return fs.readFileSync(path.join(CONTEXT_ROOT, relativePath), 'utf-8').trim();
    } catch {
        return `[Content unavailable: ${relativePath}]`;
    }
}

/** Reads a source file and returns it as a labeled, fenced code block. */
function readSource(root: string, prefix: string, relativePath: string): string {
    try {
        const src = fs.readFileSync(path.join(root, relativePath), 'utf-8').trim();
        const ext = path.extname(relativePath).slice(1) || 'ts';
        return `Source of \`${prefix}/${relativePath}\`:\n\n\`\`\`${ext}\n${src}\n\`\`\``;
    } catch {
        return `[Source unavailable: ${prefix}/${relativePath}]`;
    }
}

const readAppSource = (rel: string) => readSource(APP_ROOT, 'app', rel);
const readLibSource = (rel: string) => readSource(LIB_ROOT, 'lib', rel);

export interface PageRef {
    id: string;        // short key used internally
    label: string;     // display name shown in the UI
    group: string;     // grouping label
    subgroup?: string; // optional sub-grouping within a group
    category?: string; // optional category within a subgroup
    path?: string;     // app route this page lives at (e.g. '/birth-chart')
    tag?: string;      // optional badge shown next to the group header (e.g. 'Project')
    content: string;   // the text to inject
}

/**
 * Auto-generates one PageRef per .md file found directly inside `relativeDir`
 * (relative to CONTEXT_ROOT). Subdirectories are ignored.
 *
 * Label is derived from the filename: "saturn-return.md" → "Saturn Return"
 * The group label prefix (e.g. "Notes · ") is prepended automatically.
 */
function refsFromFolder(
    relativeDir: string,
    group: string,
    opts: { labelPrefix?: string; path?: string; tag?: string; subgroup?: string; category?: string } = {},
): PageRef[] {
    const dir = path.join(CONTEXT_ROOT, relativeDir);
    let files: string[];
    try {
        files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
    } catch {
        return [];
    }
    return files.map((file) => {
        const stem = file.replace(/\.md$/, '');
        const title = stem
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
        const prefix = opts.labelPrefix ?? `${group} · `;
        return {
            id: `${relativeDir}/${stem}`,
            label: `${prefix}${title}`,
            group,
            subgroup: opts.subgroup,
            category: opts.category,
            path: opts.path,
            tag: opts.tag,
            content: readMd(`${relativeDir}/${file}`),
        };
    });
}

export const PAGE_REFS: PageRef[] = [

    // ── Method ────────────────────────────────────────────────────────────────
    // What the instrument computes, and by which conventions.
    {
        id: 'method/definitions',
        label: 'Standard Definitions',
        group: 'Method',
        content: readLibSource('astrology/standard-definitions.ts'),
    },
    {
        id: 'method/rulership',
        label: 'Rulership',
        group: 'Method',
        content: readLibSource('rulership.ts'),
    },
    {
        id: 'method/dominance',
        label: 'Dominance',
        group: 'Method',
        content: readLibSource('dominance.ts'),
    },
    {
        id: 'method/interpretation',
        label: 'Interpretation',
        group: 'Method',
        content: readLibSource('interpretation.ts'),
    },
    {
        id: 'method/balance',
        label: 'Element Balance',
        group: 'Method',
        content: readLibSource('balance.ts'),
    },
    {
        // Carries the standing rule about the two element scales. Worth having
        // in reach even when the council is not on /compare, because the
        // question ("my Earth is high in one and low in the other") arrives
        // from the Four Pillars page just as often.
        id: 'method/comparison',
        label: 'Comparison',
        group: 'Method',
        content: readLibSource('comparison.ts'),
    },
    {
        id: 'method/symbols',
        label: 'Symbols',
        group: 'Method',
        content: readLibSource('symbols.ts'),
    },
    {
        id: 'method/cycles',
        label: 'Cycles',
        group: 'Method',
        content: readLibSource('cycles.ts'),
    },
    {
        id: 'method/astro-cycles',
        label: 'Cycle Catalogue',
        group: 'Method',
        content: readLibSource('astro-cycles.ts'),
    },
    {
        id: 'method/planetary-returns',
        label: 'Planetary Returns',
        group: 'Method',
        content: readLibSource('astrology/interpretations/planetary-returns.ts'),
    },
    {
        id: 'method/aspect-cycles',
        label: 'Aspect Cycles',
        group: 'Method',
        content: readLibSource('astrology/interpretations/aspect-cycles.ts'),
    },

    // ── Pages ─────────────────────────────────────────────────────────────────
    // `path` makes each one the auto-attached reference when the council is
    // opened from that route.
    {
        id: 'pages/birth-chart',
        label: 'Birth Chart',
        group: 'Pages',
        path: '/birth-chart',
        content: readAppSource('birth-chart/page.tsx'),
    },
    {
        id: 'pages/transits',
        label: 'Transits',
        group: 'Pages',
        path: '/transits',
        content: readAppSource('transits/page.tsx'),
    },
    {
        id: 'pages/astro-planets',
        label: 'Astro · Planets',
        group: 'Pages',
        path: '/astro/planets',
        content: readAppSource('astro/planets/page.tsx'),
    },
    {
        id: 'pages/astro-houses',
        label: 'Astro · Houses',
        group: 'Pages',
        path: '/astro/houses',
        content: readAppSource('astro/houses/page.tsx'),
    },
    {
        id: 'pages/astro-cycles',
        label: 'Astro · Cycles',
        group: 'Pages',
        path: '/astro/cycles',
        content: readAppSource('astro/cycles/page.tsx'),
    },
    {
        id: 'pages/compare',
        label: 'Comparison',
        group: 'Pages',
        path: '/compare',
        content: readAppSource('compare/page.tsx'),
    },
    {
        // Deliberately no `path`. It would auto-attach on /council itself, which
        // is where the council always runs — every message would carry this
        // file's own source (~12k tokens) for no benefit. Attach it by hand on
        // the rare occasion the council is asked about its own surface.
        id: 'pages/council',
        label: 'Council',
        group: 'Pages',
        content: readAppSource('council/page.tsx'),
    },

    // ── Notes ─────────────────────────────────────────────────────────────────
    // Drop a .md file into context/notes/ and it appears here on next request.
    ...refsFromFolder('notes', 'Notes'),

];

// Group them for the UI
export const PAGE_REF_GROUPS = Array.from(
    new Set(PAGE_REFS.map((r) => r.group))
);

/** Find a ref whose path matches the given pathname (exact or prefix). */
export function refForPath(pathname: string): PageRef | undefined {
    return PAGE_REFS.find((r) => r.path && (r.path === pathname || pathname.startsWith(r.path + '/')));
}

/** Wrap the selected persistent-memory categories as a labeled system-prompt block. */
export function buildMemoryBlock(categories: { category: string; content: string }[]): string {
    const filled = categories.filter((c) => c.content.trim());
    if (filled.length === 0) return '';
    return [
        '─── YOUR MEMORY ────────────────────────────────────────────────────────────',
        'The following are durable lessons distilled from your past sessions, grouped by topic.',
        'Treat them as persistent context you have learned. Apply them where relevant; do not recite them verbatim.',
        'Anything filed under "Readings That Failed" has already been tried against the record and did not survive:',
        'do not offer it again, and do not offer a lightly reworded version of it. Treat each entry as ruled out',
        'along with the whole shape of reading it belongs to.',
        '',
        ...filled.map((c) => `## ${c.category}\n${c.content.trim()}`),
        '─── END OF MEMORY ──────────────────────────────────────────────────────────',
    ].join('\n');
}

export function buildContextBlock(refs: PageRef[]): string {
    if (refs.length === 0) return '';
    const pageList = refs.map((r) => `"${r.label}"`).join(', ');
    return [
        '─── REFERENCED PAGES ───────────────────────────────────────────────────────',
        `The following ${refs.length === 1 ? 'page has' : 'pages have'} been attached as context for this conversation: ${pageList}.`,
        'If asked which pages you can see or what context you have, name them explicitly.',
        '',
        ...refs.map((r) => `### ${r.label}\n\n${r.content}`),
        '─── END OF REFERENCED PAGES ────────────────────────────────────────────────',
    ].join('\n');
}
