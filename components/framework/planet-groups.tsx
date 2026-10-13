// components/framework/planet-groups.tsx

"use client";

import { useState } from "react";
import { BODY, BODY_GROUPS, PRINCIPLES, type BodyGroup } from "@/lib/bodies";
import { planetArchetype } from "@/lib/astrology/planet-archetypes-data";
import { MODERN_RULER, SIGNS, TRADITIONAL_RULER } from "@/lib/rulership";

/**
 * The ten planets and three points, grouped by reach: personal, social,
 * transpersonal, then the points that are not planets at all. Each card is a
 * principle and a function — the verb is what keeps two "change" planets
 * apart, where shared keywords would blur them.
 *
 * Glyph and colour from `BODY`, principle and function from `PRINCIPLES`,
 * the longer description from the planet archetypes, rulerships from the
 * ruler tables — nothing on it is written here.
 */

const GROUP_ORDER: BodyGroup[] = ["personal", "social", "transpersonal", "point"];

const BODIES_BY_GROUP = GROUP_ORDER.map((group) => ({
  group,
  bodies: Object.keys(PRINCIPLES).filter((b) => PRINCIPLES[b].group === group),
}));

/** Signs a body rules: modern, plus any it held only traditionally. */
function signsRuled(body: string) {
  const modern = SIGNS.filter((s) => MODERN_RULER[s] === body);
  const traditionalOnly = SIGNS.filter(
    (s) => TRADITIONAL_RULER[s] === body && MODERN_RULER[s] !== body,
  );
  return { modern, traditionalOnly };
}

function Detail({ body }: { body: string }) {
  const meta = BODY[body];
  const p = PRINCIPLES[body];
  const archetype = planetArchetype(body);
  const { modern, traditionalOnly } = signsRuled(body);
  const color = meta.color;

  return (
    <div className="mt-3 border-y border-rule-faint px-4 py-6">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        {meta.glyph ? (
          <span className="glyph text-[2rem] leading-none" style={{ color }} aria-hidden>
            {meta.glyph}
          </span>
        ) : null}
        <span className="inscription text-[1.25rem] tracking-[0.1em]" style={{ color }}>
          {body}
        </span>
        <span className="text-[1.0625rem] text-bone">
          {p.principle} <span className="text-bone-soft italic">— {p.function.toLowerCase()}</span>
        </span>
      </div>

      <p className="mt-3 max-w-3xl text-[1rem] leading-relaxed text-bone-soft">
        {archetype?.tagline ?? p.nature}
      </p>

      {archetype ? (
        <dl className="mt-5 grid gap-x-8 gap-y-4 text-[0.9375rem] sm:grid-cols-2">
          <div>
            <dt className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
              Rules
            </dt>
            <dd className="mt-1 text-bone">
              {modern.length > 0 ? modern.join(", ") : "—"}
              {traditionalOnly.length > 0 ? (
                <span className="text-bone-soft">
                  {" "}
                  · {traditionalOnly.join(", ")} traditionally
                </span>
              ) : null}
            </dd>
          </div>
          <div>
            <dt className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase">
              Natural house
            </dt>
            <dd className="mt-1 text-bone">
              {archetype.house}
              <span className="text-bone-soft"> — {archetype.houseDesc}</span>
            </dd>
          </div>
        </dl>
      ) : null}
    </div>
  );
}

export default function PlanetGroups() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div className="border-y border-rule">
        {BODIES_BY_GROUP.map(({ group, bodies }) => (
          <div
            key={group}
            className="grid gap-4 border-b border-rule-faint py-5 last:border-b-0 md:grid-cols-[12rem_minmax(0,1fr)]"
          >
            <div className="px-2">
              <p className="datum text-[0.625rem] tracking-[0.2em] text-bone uppercase">
                {BODY_GROUPS[group].label}
              </p>
              <p className="mt-1.5 text-[0.875rem] leading-snug text-bone-faint">
                {BODY_GROUPS[group].gloss}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {bodies.map((body) => {
                const meta = BODY[body];
                const p = PRINCIPLES[body];
                const active = selected === body;
                return (
                  <button
                    key={body}
                    type="button"
                    onClick={() => setSelected((v) => (v === body ? null : body))}
                    aria-expanded={active}
                    className="flex flex-col items-start border-t-2 bg-surface px-3 pt-3 pb-4 text-left transition-colors hover:bg-surface-alt"
                    style={{
                      borderTopColor: meta.color,
                      backgroundColor: active ? `${meta.color}1f` : undefined,
                    }}
                  >
                    <span className="flex items-baseline gap-2">
                      <span
                        className="glyph w-4 text-[1.125rem] leading-none"
                        style={{ color: meta.color }}
                        aria-hidden
                      >
                        {meta.glyph ?? "·"}
                      </span>
                      <span className="datum text-[0.625rem] tracking-[0.16em] text-bone-faint uppercase">
                        {body}
                      </span>
                    </span>
                    <span className="mt-2 text-[1rem] leading-snug text-bone">{p.principle}</span>
                    <span className="text-[0.875rem] text-bone-soft italic">{p.function}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selected ? <Detail body={selected} /> : null}
    </div>
  );
}
