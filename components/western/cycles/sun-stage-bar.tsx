import type {
  SunPhase,
  SunStage,
  StageName,
} from "@/lib/cycles/sun-progression";

/**
 * Dawn → noon → dusk across a sign. Four stops so each stage runs from its
 * own colour into the next one's, and the bar reads as one continuous
 * evolution rather than three flat blocks.
 */
const STOPS = ["#f4dc94", "#e8b832", "#e3922f", "#cf5f2e"];

/** The colour a stage is named in — its midpoint on the bar. */
export const STAGE_COLOR: Record<StageName, string> = {
  early: "#efcd63",
  middle: "#e6a531",
  late: "#da792f",
};

const STAGE_INDEX: Record<StageName, number> = { early: 0, middle: 1, late: 2 };

/** Whole percent, so the server's clock and the browser's draw the same bar. */
const pct = (x: number) => Math.round(Math.min(1, Math.max(0, x)) * 100);

/**
 * The sign in force, in thirds: each stage a segment sized by the years it
 * covers, filled as far as the Sun has come, with a marker for today.
 */
export default function SunStageBar({
  phase,
  stages,
  age,
}: {
  phase: SunPhase;
  stages: SunStage[];
  age: number;
}) {
  const span = phase.exitAge - phase.entryAge;

  return (
    <div aria-hidden className="mt-3.5 flex gap-[3px]">
      {stages.map((st) => {
        const k = STAGE_INDEX[st.phase];
        const fill = pct((age - st.entryAge) / (st.exitAge - st.entryAge));
        const now = st.state === "current";
        const gradient = `linear-gradient(to right, ${STOPS[k]}, ${STOPS[k + 1]})`;
        return (
          <div
            key={st.phase}
            style={{ flex: `${(st.exitAge - st.entryAge) / span} 1 0` }}
          >
            <div className="relative h-[6px]">
              {/* Track: the same colours, faint, so what is ahead is still legible. */}
              <div
                className="absolute inset-0"
                style={{ background: gradient, opacity: 0.32 }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: gradient,
                  clipPath: `inset(0 ${100 - fill}% 0 0)`,
                }}
              />
              {now ? (
                <div
                  className="absolute -top-[4px] h-[14px] w-[2px] bg-bone"
                  style={{
                    left: `calc(${fill}% - 1px)`,
                    boxShadow: `0 0 8px ${STAGE_COLOR[st.phase]}`,
                  }}
                />
              ) : null}
            </div>

            {/* Tick + label at the stage's start. */}
            <div className="mt-1.5 flex items-baseline gap-2 border-l border-rule pl-1.5">
              <span
                className="datum text-[0.625rem] tracking-[0.18em] uppercase"
                style={{
                  color: now
                    ? STAGE_COLOR[st.phase]
                    : "var(--color-bone-faint)",
                }}
              >
                {st.phase}
              </span>
              <span
                className="datum text-[0.625rem] text-bone-faint"
                style={{ opacity: 0.7 }}
              >
                {st.entryAge === 0 ? "Born" : Math.round(st.entryAge)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
