//components/western/compatibility/relationship-field.tsx
"use client";

import {
  CELL,
  HIGH_CHEMISTRY,
  SIGNATURE_EASE_BAND as EASE_BAND,
  type Signature,
} from "@/lib/synastry";
import { FLOW, GRIND } from "./compatibility-ui";

/**
 * Chemistry against ease, with this pair standing somewhere on the two.
 *
 * THE AXES ARE BUILT THE WAY `components/western/houses/house-matrix.tsx`
 * BUILDS ITS OWN, which is the app's standing answer to this problem and was
 * ignored here at first. That plot names its measure in the middle of its own
 * axis, gives both ends a direction word AND the value that end represents, and
 * states underneath what the measure is and where its boundary line falls. This
 * one had "less contact" and "more contact" written along the bottom, no name
 * for the measure, no numbers, no account of the dashed line running down the
 * middle, and a caption that called the same axis "chemistry" — one measurement
 * under two names on one screen, which is how a reader ends up asking what the
 * axis is.
 *
 * Everything outside the frame is labelling, and the frame holds only the plot:
 * six regions, two boundary lines and the marker. The definition list this file
 * once ended with — the house matrix's own closing device — has gone to the
 * "How to read this" drawer. It was six lines of prose under a figure whose
 * axes had by then been rebuilt to name and explain themselves, so it was
 * answering a question the labels no longer left open, in the one block the
 * page is actually read from. The foot now carries the two values and stops.
 *
 * The marker is `--color-signal`, which `globals.css` reserves for the reader's
 * own position and nothing else. Every other mark here describes something;
 * this one only points.
 */

const W = 440;
const H = 250;
const PAD = 1;

const PLOT_W = W - PAD * 2;
const PLOT_H = H - PAD * 2;

/**
 * The ease domain the plot draws, which is not the domain ease can occupy.
 *
 * A signature ease sits between roughly −30 and +30 across every stored pair,
 * so a frame drawn to the full ±100 would put every marker in a band down the
 * middle and waste four fifths of the height. ±60 is wide enough that nothing
 * observed clips and tight enough that the marker moves. The axis prints this
 * number rather than ±100, so the frame never claims a range it is not drawing.
 */
const EASE_LIMIT = 60;

const x = (chemistry: number) => PAD + (chemistry / 100) * PLOT_W;
const y = (ease: number) => {
  const clipped = Math.max(-EASE_LIMIT, Math.min(EASE_LIMIT, ease));
  return PAD + ((EASE_LIMIT - clipped) / (2 * EASE_LIMIT)) * PLOT_H;
};

const REGIONS = [
  { label: "Easy", left: true, band: "flow" },
  { label: "Bonded", left: false, band: "flow" },
  { label: "Cordial", left: true, band: "mid" },
  { label: "Entangled", left: false, band: "mid" },
  { label: "Distant", left: true, band: "grind" },
  { label: "Volatile", left: false, band: "grind" },
] as const;

function regionBox(left: boolean, band: "flow" | "mid" | "grind") {
  const x0 = left ? PAD : x(HIGH_CHEMISTRY);
  const x1 = left ? x(HIGH_CHEMISTRY) : PAD + PLOT_W;
  const y0 = band === "flow" ? PAD : band === "mid" ? y(EASE_BAND) : y(-EASE_BAND);
  const y1 =
    band === "flow" ? y(EASE_BAND) : band === "mid" ? y(-EASE_BAND) : PAD + PLOT_H;
  return { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
}

const END = "datum text-[0.5625rem] tracking-[0.14em] uppercase";
const MEASURE = "datum text-[0.6875rem] tracking-[0.18em] text-bone uppercase";
const FOOT = "datum text-[0.5625rem] tracking-[0.14em] text-bone-faint uppercase";

export default function RelationshipField({
  signature,
}: {
  signature: Signature;
}) {
  const unread = signature.cell === "unread";
  const here = CELL[signature.cell].label;
  const pointX = x(signature.chemistry);
  const pointY = y(signature.ease ?? 0);

  return (
    <figure className="w-full">
      <div className="border border-rule bg-void/50 p-4 sm:p-5">
        <div className="flex items-stretch gap-4 sm:gap-5">
          {/* The vertical axis, laid out horizontally beside the frame: the
              measure in the middle with its two ends above and below it. */}
          <div className="flex w-14 shrink-0 flex-col justify-between py-0.5 text-right sm:w-16">
            <span className="flex flex-col gap-0.5">
              <span className={END} style={{ color: FLOW }}>
                ↑ Flow
              </span>
              <span className={`${END} text-bone-faint`}>+{EASE_LIMIT}</span>
            </span>

            <span className={MEASURE}>Ease</span>

            <span className="flex flex-col gap-0.5">
              <span className={`${END} text-bone-faint`}>−{EASE_LIMIT}</span>
              <span className={END} style={{ color: GRIND }}>
                ↓ Friction
              </span>
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              role="img"
              aria-label={`Chemistry ${signature.chemistry}, ease ${signature.ease ?? "unresolved"} — ${here}`}
              className="block w-full"
            >
              {REGIONS.map((region) => {
                const box = regionBox(region.left, region.band);
                const active = !unread && region.label === here;
                const color =
                  region.band === "flow"
                    ? FLOW
                    : region.band === "grind"
                      ? GRIND
                      : "var(--color-bone)";
                return (
                  <g key={region.label}>
                    <rect
                      {...box}
                      fill={color}
                      fillOpacity={active ? 0.12 : 0.025}
                      stroke={active ? color : "none"}
                      strokeOpacity={active ? 0.3 : 0}
                      strokeWidth="1"
                    />
                    <text
                      x={box.x + box.width / 2}
                      y={box.y + box.height / 2 + 3}
                      textAnchor="middle"
                      fill={active ? "var(--color-bone)" : "var(--color-bone-faint)"}
                      fillOpacity={active ? 1 : 0.55}
                      fontSize="10"
                      letterSpacing="1.4"
                      className="uppercase"
                    >
                      {region.label}
                    </text>
                  </g>
                );
              })}

              {/* The three boundaries the region names are decided on. */}
              {[y(EASE_BAND), y(-EASE_BAND)].map((at) => (
                <line
                  key={at}
                  x1={PAD}
                  y1={at}
                  x2={PAD + PLOT_W}
                  y2={at}
                  stroke="var(--color-rule)"
                  strokeDasharray="2 5"
                />
              ))}
              <line
                x1={x(HIGH_CHEMISTRY)}
                y1={PAD}
                x2={x(HIGH_CHEMISTRY)}
                y2={PAD + PLOT_H}
                stroke="var(--color-rule)"
                strokeDasharray="2 5"
              />

              <rect
                x={PAD}
                y={PAD}
                width={PLOT_W}
                height={PLOT_H}
                fill="none"
                stroke="var(--color-bone-faint)"
                strokeOpacity="0.35"
              />

              {unread ? null : (
                <>
                  <line
                    x1={PAD}
                    y1={pointY}
                    x2={pointX}
                    y2={pointY}
                    stroke="var(--color-signal)"
                    strokeOpacity="0.4"
                    strokeDasharray="3 4"
                  />
                  <line
                    x1={pointX}
                    y1={PAD + PLOT_H}
                    x2={pointX}
                    y2={pointY}
                    stroke="var(--color-signal)"
                    strokeOpacity="0.4"
                    strokeDasharray="3 4"
                  />
                  <rect
                    x={pointX - 5}
                    y={pointY - 5}
                    width={10}
                    height={10}
                    fill="var(--color-signal)"
                    stroke="var(--color-void)"
                    strokeWidth="2"
                    transform={`rotate(45 ${pointX} ${pointY})`}
                  />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* The horizontal axis, named the same way as the vertical one and
            indented past the gutter so it measures the plot, not the panel. */}
        <div className="pl-[4.5rem] sm:pl-[5.25rem]">
          <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-rule pt-2">
            <span className={`${END} text-bone-soft`}>← Slight · 1</span>
            <span className={MEASURE}>Chemistry</span>
            <span className={`${END} text-bone-soft`}>Dense · 99 →</span>
          </div>
          <p className={`${FOOT} mt-1 text-center`}>
            how much the two charts touch · 50 = an unrelated pairing · line at{" "}
            {HIGH_CHEMISTRY}
          </p>
        </div>
      </div>

      {/* The two definitions that used to sit here have moved to the "How to
          read this" drawer, where the rest of the page's reasoning lives. They
          were six lines of prose under a figure whose axes now name and explain
          themselves, and this block is the one the page is read from. */}
      <figcaption className={`${FOOT} mt-3 text-bone-soft`}>
        {unread
          ? "Too little contact to place"
          : `Chemistry ${signature.chemistry} · Ease ${
              signature.ease === null
                ? "unresolved"
                : `${signature.ease > 0 ? "+" : ""}${signature.ease}`
            }`}
      </figcaption>
    </figure>
  );
}
