import { PAGE_REFS } from '@/lib/pageContext';
import { NextResponse } from 'next/server';

// Returns ref metadata only (no content) — safe to expose to the client.
export async function GET() {
    const refs = PAGE_REFS.map(({ id, label, group, subgroup, category, path, tag }) => ({ id, label, group, subgroup, category, path, tag }));
    return NextResponse.json(refs);
}
