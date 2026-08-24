"use client";

import { copyScoring } from "@/lib/scoring";
import type { Rulership } from "@/lib/rulership";
import { useScoring } from "@/components/scoring-context";
import { T } from "@/components/growth-ui";

/**
 * The one setting this page actually reads, as two words in the title row.
 *
 * What stood here before was the five-preset switcher inside an expandable
 * panel, and it was a lie of omission twice over. Four of the five presets are
 * modern-rulership variations of tenancy and ease coefficients — none of which
 * this page touches — so switching between them moved nothing and made the
 * page look broken. And the panel spent a bordered block above the fold
 * advertising a control whose only live axis was a binary.
 *
 * Rulership itself has to stay reachable, because a chart read traditionally is
 * a different chart: Scorpio answers to Mars, Aquarius to Saturn, Pisces to
 * Jupiter, so a nodal ruler can change, and with it the guide in Tailwinds and
 * where the resistance mechanism lives. Hiding that would leave the page
 * quietly claiming a reading it had not made.
 *
 * The full editor is deliberately not reachable from here. Every other field in
 * it — weights, ease shares, malefic tempering — is inert on this page, and an
 * "Adjust" link that opens sixty controls of which zero apply is worse than no
 * link. It stays on Houses and Flow/Grind, where those numbers mean something.
 */

/**
 * Baseline and Traditional are the same convention twice, differing only in
 * rulership, so flicking between them is a preset swap rather than an edit.
 * Anywhere else — a hand-tuned config, or one of the ease presets — the
 * rulership is changed in place, because silently dropping someone's tenancy
 * weights to satisfy a toggle on this page would be a theft from every other.
 */
const PAIRED: Record<Rulership, string> = {
  modern: "tenancy",
  traditional: "traditional",
};

const OPTIONS: { value: Rulership; label: string }[] = [
  { value: "modern", label: "Modern" },
  { value: "traditional", label: "Traditional" },
];

export default function GrowthRulership() {
  const { config, edited, applyPreset, update } = useScoring();

  const choose = (next: Rulership) => {
    if (config.rulership === next) return;
    if (!edited && (config.id === PAIRED.modern || config.id === PAIRED.traditional)) {
      applyPreset(PAIRED[next]);
      return;
    }
    update({ ...copyScoring(config), rulership: next });
  };

  return (
    <div className="flex items-baseline gap-3">
      <span className={`${T.tiny} text-bone-faint`} aria-hidden>
        Rulership
      </span>
      <div role="group" aria-label="Rulership" className="flex items-baseline gap-2">
        {OPTIONS.map((o) => {
          const active = config.rulership === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => choose(o.value)}
              aria-pressed={active}
              className={`${T.tiny} border-b pb-0.5 transition-colors ${
                active
                  ? "border-patina text-patina"
                  : "border-transparent text-bone-faint hover:text-bone-soft"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
