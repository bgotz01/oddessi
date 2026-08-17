/**
 * Symbol glyph registry.
 *
 * Each glyph is a React SVG component drawn on a 100×100 viewBox,
 * stroke-based, using currentColor. The parent controls color and size.
 *
 * All paths use:
 *   strokeWidth="2"          — consistent weight at any scale
 *   strokeLinecap="round"    — soft terminations, not mechanical
 *   strokeLinejoin="round"   — smooth corners throughout
 *   fill="none"              — pure stroke drawing
 *
 * The registry maps symbol IDs (matching lib/symbols/data.ts) to components.
 * The page looks up by ID and falls back to null when no glyph exists yet.
 */

import type { SVGProps } from "react";

type GlyphProps = SVGProps<SVGSVGElement> & { className?: string };

const BASE: GlyphProps = {
  viewBox: "0 0 100 100",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// ── Greek ───────────────────────────────────────────────────────────────────

export function GlyphMeander({ className }: GlyphProps) {
  // Classic Greek key / meander running left-to-right, single motif tiled ×3
  // The unit cell steps: right → down → left → down → right → up → right
  return (
    <svg {...BASE} className={className}>
      {/* Three meander units centred on the canvas */}
      <path d="
        M 10 45
        h 10 v 10 h -10 v -20 h 20 v 30 h -30 v -40 h 40
        v 10
        h 10 v 10 h -10 v -20 h 20 v 30 h -30 v -40 h 40
        v 10
        h 10 v 10 h -10 v -20 h 20 v 30
      " />
    </svg>
  );
}

export function GlyphLabyrinth({ className }: GlyphProps) {
  // Classical 7-circuit Cretan labyrinth (seed pattern constructed)
  // Built from concentric arcs on alternating poles
  const cx = 50;
  const cy = 50;
  return (
    <svg {...BASE} className={className}>
      {/* Seed cross and corners */}
      <line x1={cx} y1={cy - 4} x2={cx} y2={cy - 8} />
      <line x1={cx + 4} y1={cy} x2={cx + 8} y2={cy} />
      <line x1={cx} y1={cy + 4} x2={cx} y2={cy + 8} />
      <line x1={cx - 4} y1={cy} x2={cx - 8} y2={cy} />
      {/* Corner dots → become arc endpoints */}
      {/* Arcs: each pair of adjacent endpoints connected with a semicircle */}
      {/* Circuit 1 — radius 6 */}
      <path d={`M ${cx} ${cy - 4} A 4 4 0 0 1 ${cx + 4} ${cy}`} />
      {/* Circuit 2 — joins top-right corner to bottom of right arm */}
      <path d={`M ${cx + 4} ${cy - 8} A 10 10 0 0 1 ${cx + 8} ${cy + 4}`} />
      {/* Build remaining circuits as semicircular arcs of increasing radii */}
      <path d={`M ${cx - 4} ${cy - 8} A 14 14 0 0 0 ${cx + 8} ${cy - 4}`} />
      <path d={`M ${cx - 8} ${cy - 4} A 18 18 0 0 1 ${cx + 8} ${cy + 8}`} />
      <path d={`M ${cx - 8} ${cy + 4} A 22 22 0 0 0 ${cx + 4} ${cy + 8}`} />
      <path d={`M ${cx - 8} ${cy + 8} A 26 26 0 0 1 ${cx + 8} ${cy + 16}`} />
      <path d={`M ${cx} ${cy - 26} A 28 28 0 0 1 ${cx + 26} ${cy}`} />
      <path d={`M ${cx} ${cy - 34} A 36 36 0 0 1 ${cx + 36} ${cy}`} />
      <path d={`M ${cx - 34} ${cy} A 38 38 0 0 0 ${cx} ${cy + 38}`} />
      <path d={`M ${cx - 42} ${cy} A 44 44 0 0 1 ${cx} ${cy - 44}`} />
      <path d={`M ${cx} ${cy + 44} A 44 44 0 0 1 ${cx + 44} ${cy}`} />
    </svg>
  );
}

export function GlyphPentagram({ className }: GlyphProps) {
  // Five-pointed star — vertices at 72° intervals, starting from top
  const R = 40;
  const cx = 50;
  const cy = 50;
  const pts = Array.from({ length: 5 }, (_, i) => {
    const a = (i * 72 - 90) * (Math.PI / 180);
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  });
  // Connect in {5/2} star polygon: 0→2→4→1→3→0
  const order = [0, 2, 4, 1, 3, 0];
  const d = order
    .map((i, j) => `${j === 0 ? "M" : "L"} ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)}`)
    .join(" ") + " Z";
  return (
    <svg {...BASE} className={className}>
      <path d={d} />
    </svg>
  );
}

export function GlyphThunderbolt({ className }: GlyphProps) {
  // Classic winged lightning bolt — central zigzag with two swept wings
  return (
    <svg {...BASE} className={className}>
      {/* Main bolt */}
      <path d="M 54 12 L 38 50 L 52 50 L 46 88 L 62 50 L 48 50 Z" />
      {/* Left wing */}
      <path d="M 38 38 C 24 34 16 28 14 18" strokeWidth="1.5" />
      <path d="M 38 46 C 22 46 14 42 10 34" strokeWidth="1.5" />
      {/* Right wing */}
      <path d="M 62 54 C 76 54 84 58 88 66" strokeWidth="1.5" />
      <path d="M 62 62 C 74 66 80 74 78 82" strokeWidth="1.5" />
    </svg>
  );
}

export function GlyphTrident({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Shaft */}
      <line x1="50" y1="88" x2="50" y2="30" />
      {/* Centre tine */}
      <line x1="50" y1="30" x2="50" y2="12" />
      {/* Left tine */}
      <path d="M 32 30 C 32 22 36 14 38 12" />
      <line x1="32" y1="38" x2="32" y2="30" />
      {/* Right tine */}
      <path d="M 68 30 C 68 22 64 14 62 12" />
      <line x1="68" y1="38" x2="68" y2="30" />
      {/* Cross-bar */}
      <line x1="32" y1="38" x2="68" y2="38" />
    </svg>
  );
}

export function GlyphCaduceus({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Staff */}
      <line x1="50" y1="90" x2="50" y2="14" />
      {/* Wings */}
      <path d="M 50 22 C 38 16 26 18 22 26" strokeWidth="1.5" />
      <path d="M 50 22 C 62 16 74 18 78 26" strokeWidth="1.5" />
      {/* Left serpent — winds up the staff */}
      <path d="M 50 82 C 34 74 34 62 50 56 C 66 50 66 38 50 32 C 38 28 36 22 50 22"
        strokeWidth="1.5" fill="none" />
      {/* Right serpent */}
      <path d="M 50 82 C 66 74 66 62 50 56 C 34 50 34 38 50 32 C 62 28 64 22 50 22"
        strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function GlyphRodOfAsclepius({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Staff — slightly rough, asymmetric top for a natural branch */}
      <path d="M 50 90 L 50 16 C 50 14 52 12 54 12" />
      {/* Single serpent coiling up */}
      <path d="M 50 80 C 36 72 36 60 50 54 C 64 48 64 36 50 30 C 38 25 36 18 46 14"
        strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function GlyphLyre({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Body — rounded base */}
      <path d="M 32 70 C 28 56 28 44 32 34 C 36 24 44 18 50 18 C 56 18 64 24 68 34 C 72 44 72 56 68 70 Z" />
      {/* Cross-bar */}
      <line x1="32" y1="44" x2="68" y2="44" />
      {/* Strings — 5, from crossbar to base */}
      <line x1="38" y1="44" x2="38" y2="70" strokeWidth="1" />
      <line x1="43" y1="44" x2="43" y2="70" strokeWidth="1" />
      <line x1="50" y1="44" x2="50" y2="70" strokeWidth="1" />
      <line x1="57" y1="44" x2="57" y2="70" strokeWidth="1" />
      <line x1="62" y1="44" x2="62" y2="70" strokeWidth="1" />
    </svg>
  );
}

export function GlyphLaurel({ className }: GlyphProps) {
  // Laurel wreath — two mirrored arcing branches
  return (
    <svg {...BASE} className={className}>
      {/* Left branch — arc of leaves */}
      <path d="M 50 80 C 44 72 30 64 22 50 C 16 38 18 24 28 18" strokeWidth="1.5" />
      <path d="M 42 76 C 36 66 26 56 22 44" strokeWidth="1" />
      <path d="M 38 68 C 30 60 24 50 22 38" strokeWidth="1" />
      {/* Left leaf pairs */}
      <path d="M 32 62 C 26 58 22 52 26 46 C 30 50 32 56 32 62 Z" strokeWidth="1" />
      <path d="M 28 46 C 22 40 22 32 28 28 C 30 34 30 40 28 46 Z" strokeWidth="1" />
      {/* Right branch */}
      <path d="M 50 80 C 56 72 70 64 78 50 C 84 38 82 24 72 18" strokeWidth="1.5" />
      <path d="M 58 76 C 64 66 74 56 78 44" strokeWidth="1" />
      <path d="M 62 68 C 70 60 76 50 78 38" strokeWidth="1" />
      {/* Right leaf pairs */}
      <path d="M 68 62 C 74 58 78 52 74 46 C 70 50 68 56 68 62 Z" strokeWidth="1" />
      <path d="M 72 46 C 78 40 78 32 72 28 C 70 34 70 40 72 46 Z" strokeWidth="1" />
      {/* Tie at base */}
      <path d="M 44 82 C 46 86 54 86 56 82" strokeWidth="1.5" />
    </svg>
  );
}

// ── Egyptian ─────────────────────────────────────────────────────────────────

export function GlyphAnkh({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Loop */}
      <ellipse cx="50" cy="34" rx="14" ry="18" />
      {/* Vertical bar below loop */}
      <line x1="50" y1="52" x2="50" y2="86" />
      {/* Horizontal bar */}
      <line x1="28" y1="62" x2="72" y2="62" />
    </svg>
  );
}

export function GlyphDjed({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Base */}
      <path d="M 34 84 L 66 84" />
      {/* Lower shaft */}
      <path d="M 40 84 L 38 68 L 62 68 L 60 84" />
      {/* Four horizontal bands */}
      <line x1="36" y1="68" x2="64" y2="68" />
      <line x1="34" y1="60" x2="66" y2="60" />
      <line x1="34" y1="52" x2="66" y2="52" />
      <line x1="36" y1="44" x2="64" y2="44" />
      {/* Neck narrowing above bands */}
      <path d="M 38 68 L 36 60 L 34 52 L 36 44 L 40 38" />
      <path d="M 62 68 L 64 60 L 66 52 L 64 44 L 60 38" />
      {/* Capital */}
      <path d="M 40 38 C 40 28 60 28 60 38" />
      {/* Top finial */}
      <line x1="44" y1="28" x2="56" y2="28" />
      <line x1="46" y1="22" x2="54" y2="22" />
      <line x1="50" y1="22" x2="50" y2="16" />
    </svg>
  );
}

export function GlyphShen({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Circle of rope */}
      <circle cx="50" cy="46" r="24" />
      {/* Horizontal bar below — the knotted base */}
      <line x1="26" y1="70" x2="74" y2="70" />
      {/* Two vertical ties connecting circle to bar */}
      <line x1="26" y1="70" x2="26" y2="62" />
      <line x1="74" y1="70" x2="74" y2="62" />
    </svg>
  );
}

export function GlyphTyet({ className }: GlyphProps) {
  // Like an ankh but with drooping arms
  return (
    <svg {...BASE} className={className}>
      {/* Loop — same as ankh */}
      <ellipse cx="50" cy="28" rx="12" ry="14" />
      {/* Vertical shaft */}
      <line x1="50" y1="42" x2="50" y2="86" />
      {/* Drooping left arm */}
      <path d="M 38 50 C 34 50 30 54 30 60" />
      <line x1="38" y1="42" x2="38" y2="50" />
      {/* Drooping right arm */}
      <path d="M 62 50 C 66 50 70 54 70 60" />
      <line x1="62" y1="42" x2="62" y2="50" />
      {/* Crossbar */}
      <line x1="38" y1="42" x2="62" y2="42" />
    </svg>
  );
}

export function GlyphCrookAndFlail({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Crook — left, hooked staff */}
      <path d="M 36 84 L 36 36 C 36 24 44 18 50 20 C 56 22 58 30 54 36" />
      {/* Flail — right, three-stranded */}
      <line x1="64" y1="84" x2="64" y2="44" />
      {/* Flail handle cap */}
      <line x1="58" y1="44" x2="70" y2="44" />
      {/* Three strands hanging from cap */}
      <path d="M 60 44 L 56 56 L 60 62" strokeWidth="1.5" />
      <path d="M 64 44 L 64 60 L 60 66" strokeWidth="1.5" />
      <path d="M 68 44 L 72 56 L 68 62" strokeWidth="1.5" />
    </svg>
  );
}

export function GlyphFeatherOfMaat({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Quill / shaft */}
      <line x1="50" y1="88" x2="50" y2="18" />
      {/* Left vane */}
      <path d="M 50 18 C 42 24 30 36 32 56 C 34 66 42 74 50 76" strokeWidth="1.5" />
      {/* Right vane */}
      <path d="M 50 18 C 58 24 70 36 68 56 C 66 66 58 74 50 76" strokeWidth="1.5" />
      {/* Barbs — left */}
      <line x1="50" y1="34" x2="38" y2="42" strokeWidth="1" />
      <line x1="50" y1="44" x2="36" y2="52" strokeWidth="1" />
      <line x1="50" y1="54" x2="38" y2="60" strokeWidth="1" />
      <line x1="50" y1="64" x2="42" y2="68" strokeWidth="1" />
      {/* Barbs — right */}
      <line x1="50" y1="34" x2="62" y2="42" strokeWidth="1" />
      <line x1="50" y1="44" x2="64" y2="52" strokeWidth="1" />
      <line x1="50" y1="54" x2="62" y2="60" strokeWidth="1" />
      <line x1="50" y1="64" x2="58" y2="68" strokeWidth="1" />
    </svg>
  );
}

export function GlyphWasSceptre({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Forked base */}
      <path d="M 50 88 L 42 78" />
      <path d="M 50 88 L 58 78" />
      {/* Shaft */}
      <line x1="50" y1="78" x2="50" y2="26" />
      {/* Set-animal head — abstract angular form */}
      <path d="M 50 26 L 42 18 L 38 22 L 44 28" />
      <path d="M 50 26 L 58 18 L 62 22 L 56 28" />
      <path d="M 44 28 L 56 28" />
    </svg>
  );
}

export function GlyphOuroboros({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Body circle — gap at bottom-right for the mouth */}
      <path d="M 50 16 A 34 34 0 1 1 74 74" strokeWidth="2.5" />
      {/* Tail tip entering the mouth at bottom-right */}
      <path d="M 74 74 L 68 80" strokeWidth="1.5" />
      {/* Head — simplified triangular snout */}
      <path d="M 50 16 C 60 12 70 16 74 24 L 78 22 L 74 32 L 66 28 C 68 24 62 18 50 16 Z" />
      {/* Eye */}
      <circle cx="72" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GlyphScarab({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Solar disk above */}
      <circle cx="50" cy="20" r="8" />
      {/* Body — oval */}
      <ellipse cx="50" cy="58" rx="22" ry="28" />
      {/* Head */}
      <ellipse cx="50" cy="34" rx="10" ry="8" />
      {/* Centre line */}
      <line x1="50" y1="34" x2="50" y2="86" strokeWidth="1" />
      {/* Wing division */}
      <path d="M 28 50 C 34 46 46 44 50 44 C 54 44 66 46 72 50" strokeWidth="1" />
      {/* Left legs */}
      <line x1="36" y1="52" x2="22" y2="46" strokeWidth="1.5" />
      <line x1="33" y1="60" x2="18" y2="58" strokeWidth="1.5" />
      <line x1="34" y1="70" x2="20" y2="72" strokeWidth="1.5" />
      {/* Right legs */}
      <line x1="64" y1="52" x2="78" y2="46" strokeWidth="1.5" />
      <line x1="67" y1="60" x2="82" y2="58" strokeWidth="1.5" />
      <line x1="66" y1="70" x2="80" y2="72" strokeWidth="1.5" />
    </svg>
  );
}

// ── Cross-traditional & Norse ────────────────────────────────────────────────

export function GlyphValknut({ className }: GlyphProps) {
  // Three interlocked triangles (unicursal variant for SVG simplicity)
  return (
    <svg {...BASE} className={className}>
      {/* Triangle 1 — pointing up, centre */}
      <polygon points="50,18 66,46 34,46" />
      {/* Triangle 2 — pointing up, lower-left */}
      <polygon points="35,52 51,80 19,80" />
      {/* Triangle 3 — pointing up, lower-right */}
      <polygon points="65,52 81,80 49,80" />
    </svg>
  );
}

export function GlyphTriquetra({ className }: GlyphProps) {
  // Three-vesica interlaced form
  return (
    <svg {...BASE} className={className}>
      <path d="
        M 50 24
        C 64 24 76 34 76 50
        C 76 62 68 72 56 74
        L 50 82
        L 44 74
        C 32 72 24 62 24 50
        C 24 34 36 24 50 24 Z
      " />
      {/* Inner trefoil arcs */}
      <path d="M 50 24 C 46 36 38 46 38 56" strokeWidth="1.5" />
      <path d="M 50 24 C 54 36 62 46 62 56" strokeWidth="1.5" />
      <path d="M 38 56 C 42 64 50 68 50 82" strokeWidth="1.5" />
      <path d="M 62 56 C 58 64 50 68 50 82" strokeWidth="1.5" />
      <path d="M 38 56 C 38 52 44 48 50 48 C 56 48 62 52 62 56" strokeWidth="1.5" />
    </svg>
  );
}

export function GlyphStarOfIshtar({ className }: GlyphProps) {
  // Eight-pointed star (two overlapping squares rotated 45°)
  const R = 38;
  const r = 16;
  const cx = 50;
  const cy = 50;
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const aOuter = (i * 45 - 90) * (Math.PI / 180);
    const aInner = ((i * 45 + 22.5) - 90) * (Math.PI / 180);
    pts.push(`${(cx + R * Math.cos(aOuter)).toFixed(2)},${(cy + R * Math.sin(aOuter)).toFixed(2)}`);
    pts.push(`${(cx + r * Math.cos(aInner)).toFixed(2)},${(cy + r * Math.sin(aInner)).toFixed(2)}`);
  }
  return (
    <svg {...BASE} className={className}>
      <polygon points={pts.join(" ")} />
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={R + 4} strokeWidth="1" />
    </svg>
  );
}

export function GlyphRodAndRing({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Rod — vertical, tapered */}
      <line x1="35" y1="20" x2="35" y2="84" strokeWidth="2.5" />
      <line x1="30" y1="20" x2="40" y2="20" />
      <line x1="30" y1="84" x2="40" y2="84" />
      {/* Ring — coiled rope circle */}
      <circle cx="65" cy="52" r="20" />
      {/* Rope texture — inner concentric */}
      <circle cx="65" cy="52" r="14" strokeWidth="1" />
      {/* Connecting cord */}
      <line x1="35" y1="44" x2="45" y2="44" />
      <line x1="35" y1="60" x2="45" y2="60" />
    </svg>
  );
}

export function GlyphScales({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Central post */}
      <line x1="50" y1="84" x2="50" y2="18" />
      {/* Beam */}
      <line x1="18" y1="34" x2="82" y2="34" />
      {/* Pivot mark */}
      <circle cx="50" cy="34" r="2.5" fill="currentColor" stroke="none" />
      {/* Left chain */}
      <line x1="22" y1="34" x2="22" y2="54" strokeWidth="1.5" />
      {/* Left pan */}
      <path d="M 10 54 Q 22 62 34 54" strokeWidth="1.5" />
      {/* Right chain */}
      <line x1="78" y1="34" x2="78" y2="54" strokeWidth="1.5" />
      {/* Right pan */}
      <path d="M 66 54 Q 78 62 90 54" strokeWidth="1.5" />
      {/* Base */}
      <line x1="40" y1="84" x2="60" y2="84" />
    </svg>
  );
}

export function GlyphThyrsus({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Fennel staff */}
      <line x1="50" y1="86" x2="50" y2="32" />
      {/* Staff segments — fennel has nodes */}
      <line x1="46" y1="64" x2="54" y2="64" strokeWidth="1" />
      <line x1="46" y1="50" x2="54" y2="50" strokeWidth="1" />
      {/* Pine cone — stacked scales */}
      <ellipse cx="50" cy="24" rx="8" ry="10" />
      <path d="M 42 28 C 44 22 56 22 58 28" strokeWidth="1" />
      <path d="M 43 24 C 45 18 55 18 57 24" strokeWidth="1" />
      <path d="M 44 20 C 46 15 54 15 56 20" strokeWidth="1" />
      {/* Ivy leaves at base of cone */}
      <path d="M 50 34 C 42 36 38 42 42 46 C 46 42 50 36 50 34" strokeWidth="1" />
      <path d="M 50 34 C 58 36 62 42 58 46 C 54 42 50 36 50 34" strokeWidth="1" />
    </svg>
  );
}

export function GlyphRosette({ className }: GlyphProps) {
  // Six-petal rosette — six equal circles arranged around a centre
  const cx = 50;
  const cy = 50;
  const R = 18; // distance from centre to petal centre
  const r = 18; // petal circle radius (same = tangent)
  return (
    <svg {...BASE} className={className}>
      {/* Outer containing circle */}
      <circle cx={cx} cy={cy} r={R + r} strokeWidth="1" />
      {/* Centre circle */}
      <circle cx={cx} cy={cy} r={r} />
      {/* Six petals */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * 60) * (Math.PI / 180);
        const px = (cx + R * Math.cos(a)).toFixed(2);
        const py = (cy + R * Math.sin(a)).toFixed(2);
        return <circle key={i} cx={px} cy={py} r={r} />;
      })}
    </svg>
  );
}

export function GlyphWingedSun({ className }: GlyphProps) {
  return (
    <svg {...BASE} className={className}>
      {/* Sun disk */}
      <circle cx="50" cy="50" r="12" />
      {/* Left wing — primary feather arc */}
      <path d="M 38 50 C 30 44 18 42 10 46" />
      <path d="M 38 50 C 28 50 16 50 10 46" />
      <path d="M 38 50 C 28 56 16 58 10 54" />
      {/* Left feather lines */}
      <line x1="32" y1="46" x2="28" y2="54" strokeWidth="1" />
      <line x1="24" y1="44" x2="20" y2="52" strokeWidth="1" />
      <line x1="16" y1="45" x2="12" y2="51" strokeWidth="1" />
      {/* Right wing — mirrored */}
      <path d="M 62 50 C 70 44 82 42 90 46" />
      <path d="M 62 50 C 72 50 84 50 90 46" />
      <path d="M 62 50 C 72 56 84 58 90 54" />
      {/* Right feather lines */}
      <line x1="68" y1="46" x2="72" y2="54" strokeWidth="1" />
      <line x1="76" y1="44" x2="80" y2="52" strokeWidth="1" />
      <line x1="84" y1="45" x2="88" y2="51" strokeWidth="1" />
      {/* Uraeus serpents hanging below disk — simplified */}
      <path d="M 44 60 C 40 66 42 74 46 76" strokeWidth="1.5" />
      <path d="M 56 60 C 60 66 58 74 54 76" strokeWidth="1.5" />
    </svg>
  );
}

// ── Registry ─────────────────────────────────────────────────────────────────

export type GlyphComponent = (props: GlyphProps) => React.ReactElement;

export const GLYPH_REGISTRY: Record<string, GlyphComponent> = {
  // Greek
  meander: GlyphMeander,
  labyrinth: GlyphLabyrinth,
  pentagram: GlyphPentagram,
  thunderbolt: GlyphThunderbolt,
  trident: GlyphTrident,
  caduceus: GlyphCaduceus,
  "rod-of-asclepius": GlyphRodOfAsclepius,
  lyre: GlyphLyre,
  laurel: GlyphLaurel,
  // Egyptian
  ankh: GlyphAnkh,
  djed: GlyphDjed,
  shen: GlyphShen,
  tyet: GlyphTyet,
  "crook-and-flail": GlyphCrookAndFlail,
  "feather-of-maat": GlyphFeatherOfMaat,
  "was-sceptre": GlyphWasSceptre,
  ouroboros: GlyphOuroboros,
  scarab: GlyphScarab,
  // Norse / cross-traditional
  valknut: GlyphValknut,
  triquetra: GlyphTriquetra,
  // Mesopotamian
  "star-of-ishtar": GlyphStarOfIshtar,
  "rod-and-ring": GlyphRodAndRing,
  rosette: GlyphRosette,
  "winged-sun": GlyphWingedSun,
  // Cross-traditional
  scales: GlyphScales,
  // Greek objects
  thyrsus: GlyphThyrsus,
};
