// components/framework/rulership-conventions.tsx

import { BODY } from "@/lib/bodies";
import { MODERN_RULER, SIGNS, TRADITIONAL_RULER } from "@/lib/rulership";

/**
 * The vocabulary of rulership in four lines, then the three signs where the
 * two conventions disagree — derived from the ruler tables, so a change there
 * shows up here.
 */

const TERMS = [
  { term: "Sign rulership", def: "Each sign has a planet that governs it — Aries belongs to Mars, Taurus to Venus." },
  { term: "House rulership", def: "A house is ruled by the ruler of the sign on its cusp." },
  { term: "Dispositor", def: "A planet answers to the ruler of the sign it stands in — Venus in Aries is disposed by Mars." },
  { term: "Circuit", def: "Follow ruler to house to ruler, and houses link into chains and loops." },
];

const DISPUTED = SIGNS.filter((s) => MODERN_RULER[s] !== TRADITIONAL_RULER[s]);

export default function RulershipConventions() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <dl className="space-y-4">
        {TERMS.map((t) => (
          <div key={t.term}>
            <dt className="datum text-[0.625rem] tracking-[0.2em] text-bone uppercase">{t.term}</dt>
            <dd className="mt-1 text-[0.9375rem] leading-snug text-bone-soft">{t.def}</dd>
          </div>
        ))}
      </dl>

      <div>
        <div className="border-y border-rule">
          <div className="grid grid-cols-3 border-b border-rule px-4 py-3">
            {["Sign", "Modern", "Traditional"].map((h) => (
              <span key={h} className="datum text-[0.625rem] tracking-[0.2em] text-bone-faint uppercase">
                {h}
              </span>
            ))}
          </div>
          {DISPUTED.map((s) => (
            <div key={s} className="grid grid-cols-3 border-b border-rule-faint px-4 py-3 last:border-b-0">
              <span className="text-[0.9375rem] text-bone">{s}</span>
              <span className="text-[0.9375rem]" style={{ color: BODY[MODERN_RULER[s]].color }}>
                {MODERN_RULER[s]}
              </span>
              <span className="text-[0.9375rem]" style={{ color: BODY[TRADITIONAL_RULER[s]].color }}>
                {TRADITIONAL_RULER[s]}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[0.875rem] leading-relaxed text-bone-faint">
          Charts here take house rulers from the modern table by default; the Traditional scoring
          preset switches them. Dignity is judged on its own table: the seven classical planets
          keep both their signs — Mars still rules Scorpio — and the outer planets carry their
          modern sign and exaltation alongside.
        </p>
      </div>
    </div>
  );
}
