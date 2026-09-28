"use client";

import { useEffect, useState } from "react";

import { bodyColor } from "@/lib/bodies";
import { signGlyph } from "@/lib/symbols";
import { SIGNS } from "@/lib/rulership";
import { getHouseTitle, type House } from "@/lib/astrology/house-categories";
import { archetypeFor, archetypeGlossFor } from "@/lib/growth/archetypes";
import { ARCHETYPE_QUESTIONS } from "@/lib/growth/archetype-questions";
import type { Trajectory } from "@/lib/growth";

import ArchetypeGloss from "@/components/western/growth/archetype-gloss";
import { T } from "@/components/western/growth/growth-ui";

/**
 * Every sign × house archetype, one at a time.
 *
 * The Arc only ever shows the chart's two poles, and the table behind them has
 * 144. This is the way into the other 142: pick a sign and a house and read
 * the role the same way the Arc reads it — what each word means, what it looks
 * like in practice — then the move and its questions.
 *
 * Opens on the chart's North Node, and the two node chips jump back to either
 * pole, so the natural use — "what would this look like in another house?" —
 * starts from something the reader already knows.
 *
 * The `why` is deliberately absent, as it is on the Arc: it argues for the
 * name and belongs to the chat, which the Ask button hands the combination to.
 */
export default function ArchetypeBrowser({
  t,
  onClose,
  onAsk,
}: {
  t: Trajectory;
  onClose: () => void;
  onAsk: (text: string) => void;
}) {
  const [sign, setSign] = useState<string>(t.to.sign);
  const [house, setHouse] = useState<number>(t.to.house ?? 1);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const role = archetypeFor(sign, house);
  const gloss = archetypeGlossFor(sign, house);
  const practice = ARCHETYPE_QUESTIONS[`${sign}/${house}`] ?? null;

  const north = bodyColor("North Node");
  const poles = [
    { label: "South Node", pole: t.from, color: undefined },
    { label: "North Node", pole: t.to, color: north },
  ].filter((p) => p.pole.house !== null);

  const which = poles.find(
    (p) => p.pole.sign === sign && p.pole.house === house,
  );

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-void/70"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Archetypes"
        className="fixed inset-x-4 top-[5vh] bottom-[5vh] z-50 mx-auto flex max-w-3xl flex-col rounded-sm border border-rule bg-surface"
      >
        {/* ── Pickers ──────────────────────────────────────────────────── */}
        <div className="shrink-0 border-b border-rule px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-6">
            <p className={`${T.micro} text-patina`}>Archetypes</p>
            <button
              type="button"
              onClick={onClose}
              className={`${T.micro} text-bone-faint transition-colors hover:text-bone`}
            >
              Close
            </button>
          </div>

          <p className={`${T.tiny} mt-5 text-bone-faint`}>Sign</p>
          <div className="mt-2 grid grid-cols-6 gap-1.5 sm:grid-cols-12">
            {SIGNS.map((s) => {
              const on = s === sign;
              return (
                <button
                  key={s}
                  type="button"
                  title={s}
                  aria-label={s}
                  aria-pressed={on}
                  onClick={() => setSign(s)}
                  className={`glyph rounded-sm border py-2 text-[1.125rem] leading-none transition-colors ${on
                    ? "border-patina bg-patina-deep text-bone"
                    : "border-rule text-bone-soft hover:border-patina-dim hover:text-bone"
                    }`}
                >
                  {signGlyph(s)}
                </button>
              );
            })}
          </div>

          <p className={`${T.tiny} mt-4 text-bone-faint`}>House</p>
          <div className="mt-2 grid grid-cols-6 gap-1.5 sm:grid-cols-12">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => {
              const on = h === house;
              return (
                <button
                  key={h}
                  type="button"
                  title={getHouseTitle(h as House)}
                  aria-pressed={on}
                  onClick={() => setHouse(h)}
                  className={`datum rounded-sm border py-2 text-[0.8125rem] leading-none transition-colors ${on
                    ? "border-patina bg-patina-deep text-bone"
                    : "border-rule text-bone-soft hover:border-patina-dim hover:text-bone"
                    }`}
                >
                  {h}
                </button>
              );
            })}
          </div>

          {poles.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {poles.map(({ label, pole, color }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setSign(pole.sign);
                    setHouse(pole.house!);
                  }}
                  className={`${T.tiny} rounded-sm border border-rule px-3 py-1.5 text-bone-soft transition-colors hover:border-patina-dim hover:text-bone`}
                  style={color ? { color } : undefined}
                >
                  Your {label} · {pole.sign} {pole.house}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* ── The archetype ────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-8">
          <p className={`flex flex-wrap items-baseline gap-x-2.5 ${T.tiny} text-bone-soft`}>
            <span className="glyph text-[0.9375rem]">{signGlyph(sign)}</span>
            <span>
              {sign} · house {house} · {getHouseTitle(house as House)}
            </span>
            {which ? (
              <span style={which.color ? { color: which.color } : undefined}>
                · your {which.label}
              </span>
            ) : null}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[1.875rem] leading-tight text-bone sm:text-[2.25rem]">
            {role}
          </h2>

          {gloss ? (
            <div className="mt-7 border-t border-rule pt-7">
              <ArchetypeGloss gloss={gloss} />
            </div>
          ) : null}

          {practice ? (
            <div className="mt-7 rounded-sm border border-patina-dim bg-patina-deep/25 p-6">
              <p className={`${T.micro} text-patina`}>The move</p>
              <p className={`mt-3 ${T.phrase}`}>{practice.move}</p>
              <ul className="mt-5 space-y-3 border-l border-patina-dim pl-5">
                {practice.questions.map((q) => (
                  <li key={q} className={T.body}>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() =>
              onAsk(
                `Explain the ${role} archetype — ${sign} in house ${house} (${getHouseTitle(house as House)}). ` +
                `Say what each role in the name means for someone with this placement, what it looks like ` +
                `in ordinary life, and how it differs from ${sign} in neighbouring houses. ` +
                (which
                  ? `This is my ${which.label}, so read it in that light. `
                  : `My own nodes are South Node ${t.from.sign} house ${t.from.house} → North Node ${t.to.sign} house ${t.to.house}; say briefly how this combination relates to them, if at all. `) +
                `Concrete behaviours, not generic sign descriptions.`,
              )
            }
            className={`${T.micro} mt-7 rounded-sm border border-patina-dim px-4 py-2.5 text-patina transition-colors hover:border-patina hover:bg-patina-deep`}
          >
            Ask about this archetype →
          </button>
        </div>
      </div>
    </>
  );
}
