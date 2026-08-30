//components/western/career/career-strip.tsx
"use client";

import {
  careerWindowLabel,
  type CareerWindow,
  type CareerWindowGrade,
} from "@/lib/career";
import { T } from "@/components/western/growth/growth-ui";
import { BAR, CAREER_GRADE_TINT, TICK } from "@/components/western/career/career-ui";
import CareerTooltip, {
  useTip,
  type CareerTipContent,
} from "@/components/western/career/career-tooltip";

const W = 1000;
const PAD = { left: 36, right: 12 };

function scale(viewFrom: number, viewTo: number) {
  const span = W - PAD.left - PAD.right;
  const at = (age: number) =>
    ((PAD.left + ((age - viewFrom) / (viewTo - viewFrom)) * span) / W) * 100;
  return {
    x: (age: number) => `${at(age).toFixed(2)}%`,
    width: (from: number, to: number) => `${Math.max(at(to) - at(from), 0.3).toFixed(2)}%`,
  };
}

export default function CareerStrip({
  windows,
  age,
  viewFrom,
  viewTo,
  selected,
  onSelect,
}: {
  windows: CareerWindow[];
  age: number;
  viewFrom: number;
  viewTo: number;
  selected: CareerWindow | null;
  onSelect: (window: CareerWindow) => void;
}) {
  const { frame, tip, show, clear } = useTip<CareerTipContent>();
  const { x, width } = scale(viewFrom, viewTo);
  const drawn = windows
    .map((window) => ({
      window,
      from: Math.max(window.ageStart, viewFrom),
      to: Math.min(window.ageEnd, viewTo),
    }))
    .filter((item) => item.to > item.from);
  /**
   * Which windows get an age printed under them — chosen by ACTIVATION, not by
   * grade.
   *
   * Labelling only the top grade created a hierarchy the model does not hold.
   * Grade and magnitude are independent axes here, which is the argument the
   * key underneath makes in as many words: a long, dense convergence can
   * implicate a career more than a narrowly-defined turning point, and printing
   * dates under one and not the other says the categorical grade outranks
   * everything else. It does not. The strip should say THESE ARE THE PERIODS
   * WORTH NOTICING, and the index is what knows that.
   *
   * The label is still tinted by grade, so configuration survives as colour
   * where it belongs — beside the magnitude rather than instead of it.
   *
   * Strongest first so the six that survive are the six worth naming, then
   * back into chronological order — and then thinned, because two labels
   * closer together than a fourteenth of the view collide into "35-3638-40",
   * which reads as one four-digit number and names neither window.
   */
  const labelled = drawn
    .filter((item) => item.to - item.from >= 1)
    .sort((a, b) => b.window.activation - a.window.activation)
    .slice(0, 6)
    .sort((a, b) => a.from - b.from)
    .reduce<typeof drawn>((kept, item) => {
      const gap = (viewTo - viewFrom) / 14;
      const previous = kept[kept.length - 1];
      const centre = (item.from + item.to) / 2;
      if (!previous || centre - (previous.from + previous.to) / 2 >= gap) {
        kept.push(item);
      }
      return kept;
    }, []);

  return (
    // The tooltip is absolutely positioned inside this frame and opens
    // UPWARD, over the lower part of the curve. Nothing here may gain an
    // `overflow` rule without giving it somewhere else to go.
    <div
      className="relative mt-2"
      ref={frame}
      onMouseLeave={clear}
      onBlur={clear}
    >
      <div className="relative" style={{ height: BAR + TICK + 2 }}>
        {drawn.map(({ window, from, to }) => {
          const active = selected?.id === window.id;
          return (
            <button
              key={window.id}
              type="button"
              onClick={() => onSelect(window)}
              onMouseEnter={show({ kind: "window", window })}
              onFocus={show({ kind: "window", window })}
              aria-label={`${careerWindowLabel(window.grade)}, ${window.start} to ${window.end}`}
              aria-pressed={active}
              className="absolute transition-opacity hover:opacity-80"
              style={{
                left: x(from),
                width: width(from, to),
                top: TICK + 2,
                height: BAR,
                background: CAREER_GRADE_TINT[window.grade],
                opacity: window.status === "completed" && !active ? 0.45 : 1,
                outline: active ? "1px solid var(--color-bone)" : undefined,
                outlineOffset: 1,
                // The turning-point mark. Drawn as a rule sitting above the
                // bar rather than as extra height, so the row stays one
                // thickness.
                borderTop: window.grade === "turningPoint"
                  ? `${TICK}px solid var(--color-ember)`
                  : undefined,
                boxSizing: "content-box",
              }}
            />
          );
        })}
        {age >= viewFrom && age <= viewTo ? (
          <span className="absolute -top-2 bottom-0 w-[2px] bg-signal/90" style={{ left: x(age) }} />
        ) : null}
      </div>

      <div className="relative h-7">
        {labelled.map(({ window, from, to }) => (
          <button
            key={window.id}
            type="button"
            onClick={() => onSelect(window)}
            className={`${T.tiny} absolute top-0 -translate-x-1/2 whitespace-nowrap`}
            style={{ left: x((from + to) / 2), color: CAREER_GRADE_TINT[window.grade] }}
          >
            {Math.round(window.ageStart)}–{Math.round(window.ageEnd)}
          </button>
        ))}
      </div>

      <ul className={`${T.tiny} mt-3 flex list-none flex-wrap gap-x-8 gap-y-2 text-bone-faint`}>
        {(["active", "convergence", "turningPoint"] as CareerWindowGrade[]).map((grade) => (
          <li key={grade}>
            <button
              type="button"
              onMouseEnter={show({ kind: "grade", grade })}
              onFocus={show({ kind: "grade", grade })}
              className="inline-flex items-center gap-2 transition-colors hover:text-bone"
            >
              <span
                className="inline-block w-4"
                style={{
                  height: 6,
                  background: CAREER_GRADE_TINT[grade],
                  borderTop: grade === "turningPoint"
                    ? "2px solid var(--color-ember)"
                    : undefined,
                }}
              />
              {careerWindowLabel(grade)}
            </button>
          </li>
        ))}
        <li className="text-bone-faint/70">Configuration, not size</li>
      </ul>

      {tip ? <CareerTooltip tip={tip} /> : null}
    </div>
  );
}
