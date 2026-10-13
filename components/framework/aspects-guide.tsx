// components/framework/aspects-guide.tsx

import {
  ASPECT_CONCEPTS,
  MAJOR_ASPECTS,
  MINOR_ASPECTS,
  ORB_MODIFIERS,
  PATTERNS,
  type AspectQuality,
} from "@/lib/astrology/aspect-guide";
import { BODY } from "@/lib/bodies";

/**
 * Aspects in four parts — the five major angles, the narrow minor ones, how
 * orbs are measured here, and the patterns several aspects make together —
 * each its own export so the Framework page can tab between them.
 *
 * Colour carries one meaning only — patina for aspects that let two planets
 * cooperate, ember for those that make them negotiate, bone for fusion — so
 * the wheels and the names agree without a legend.
 */

const TONE: Record<AspectQuality, string> = {
  fusion: "text-bone",
  flowing: "text-patina",
  friction: "text-ember",
};

/** A small wheel: points on a circle, chords between the given pairs. */
function Wheel({
  points,
  edges,
  quality,
  size = 64,
}: {
  points: number[];
  edges: [number, number][];
  quality: AspectQuality;
  size?: number;
}) {
  const c = size / 2;
  const r = c - 6;
  const xy = (deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [c + r * Math.cos(a), c + r * Math.sin(a)] as const;
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`shrink-0 ${TONE[quality]}`}
      aria-hidden
    >
      <circle cx={c} cy={c} r={r} fill="none" stroke="currentColor" strokeOpacity={0.2} />
      {edges.map(([i, j]) => {
        const [x1, y1] = xy(points[i]);
        const [x2, y2] = xy(points[j]);
        return (
          <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity={0.7} />
        );
      })}
      {points.map((p, i) => {
        const [x, y] = xy(p);
        return <circle key={i} cx={x} cy={y} r={3} fill="currentColor" />;
      })}
    </svg>
  );
}

/** The five major angles, one card each. */
export function MajorAspects() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-5">
        {MAJOR_ASPECTS.map((a) => (
          <div key={a.type} className="flex flex-col bg-surface px-4 pt-4 pb-5">
            <Wheel
              points={a.angle === 0 ? [-8, 8] : [0, a.angle]}
              edges={a.angle === 0 ? [] : [[0, 1]]}
              quality={a.quality}
            />
            <p className="mt-3 flex items-baseline gap-2">
              <span className={`glyph text-[1rem] ${TONE[a.quality]}`} aria-hidden>
                {a.symbol}
              </span>
              <span className={`text-[1rem] ${TONE[a.quality]}`}>{a.name}</span>
              <span className="datum text-[0.6875rem] text-bone-faint">{a.angle}°</span>
            </p>
            <p className="mt-1 text-[0.9375rem] text-bone italic">{a.principle}</p>
            <p className="mt-2 flex-1 text-[0.875rem] leading-snug text-bone-soft">{a.line}</p>
            <p className="datum mt-3 text-[0.625rem] tracking-[0.16em] text-bone-faint uppercase">
              Orb {a.orb}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The narrow-orb aspects, as a compact list. */
export function MinorAspects() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 border-y border-rule py-5 sm:grid-cols-2">
        {MINOR_ASPECTS.map((a) => (
          <div key={a.type} className="flex gap-3 px-2">
            <span className={`glyph w-5 text-[1rem] ${TONE[a.quality]}`} aria-hidden>
              {a.symbol}
            </span>
            <div>
              <p className="flex items-baseline gap-2">
                <span className={`text-[0.9375rem] ${TONE[a.quality]}`}>{a.name}</span>
                <span className="datum text-[0.6875rem] text-bone-faint">
                  {a.angle}° · orb {a.orb}°
                </span>
              </p>
              <p className="mt-1 text-[0.875rem] leading-snug text-bone-soft">{a.line}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** How orbs are measured here, and what else an aspect is read by. */
export function ReadingAspects() {
  return (
    <div>
      <p className="mb-6 max-w-3xl text-[0.9375rem] leading-relaxed text-bone-soft">
        An aspect&rsquo;s orb here is its base orb times the average of the two bodies&rsquo;
        multipliers — luminaries widest, outer planets and points narrowest. A Sun–Moon square
        allows 9.6°; a Mercury–Pluto square, 5.6°.
      </p>
      <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2">
        {ORB_MODIFIERS.map(({ body, modifier }) => (
          <span key={body} className="flex items-baseline gap-1.5">
            <span className="glyph text-[0.9375rem]" style={{ color: BODY[body]?.color }} aria-hidden>
              {BODY[body]?.glyph ?? "·"}
            </span>
            <span className="datum text-[0.625rem] tracking-[0.14em] text-bone-faint uppercase">
              {body}
            </span>
            <span className="datum text-[0.75rem] text-bone">×{modifier}</span>
          </span>
        ))}
      </div>
      <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
        {ASPECT_CONCEPTS.map((c) => (
          <div key={c.term}>
            <dt className="datum text-[0.625rem] tracking-[0.2em] text-bone uppercase">{c.term}</dt>
            <dd className="mt-1 text-[0.9375rem] leading-snug text-bone-soft">{c.def}</dd>
            <dd className="datum mt-1.5 text-[0.6875rem] text-bone-faint">{c.inApp}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Several aspects locking into one shape. */
export function AspectPatterns() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-5">
        {PATTERNS.map((p) => (
          <div key={p.name} className="flex flex-col bg-surface px-4 pt-4 pb-5">
            <Wheel points={p.points} edges={p.edges} quality={p.quality} />
            <p className={`mt-3 text-[1rem] ${TONE[p.quality]}`}>{p.name}</p>
            <p className="mt-1 text-[0.9375rem] text-bone italic">{p.principle}</p>
            <p className="mt-2 text-[0.875rem] leading-snug text-bone-soft">{p.line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
