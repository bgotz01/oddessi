//components/western/romance/relationship-compass.tsx
"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/primitives";
import type {
  CompassAxis,
  CompassAxisId,
  CompassContext,
  CompassEvidence,
  RelationshipCompass as RelationshipCompassData,
} from "@/lib/love";
import { ROMANCE_T as T } from "./romance-ui";

const CX = 240;
const CY = 180;
const AXIS_RADIUS = 120;
const MARKER_RADIUS = 92;
const LEFT_COLOR = "var(--color-ember)";
const RIGHT_COLOR = "var(--color-patina)";

function markerColor(position: number): string {
  if (position < -25) return LEFT_COLOR;
  if (position > 25) return RIGHT_COLOR;
  return "var(--color-bone)";
}

function weightLabel(evidence: CompassEvidence): string {
  if (evidence.weight === 3) return "Structural";
  if (evidence.weight === 2) return "Modifier";
  return "Supporting";
}

interface QuadrantNames {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
}

type EvidenceState = "strong" | "normal" | "limited" | "dual" | "uncertain";

const HALO: Record<
  EvidenceState,
  { radius: number; blur: number; opacity: number; ringOpacity: number }
> = {
  strong: { radius: 18, blur: 2.5, opacity: 0.24, ringOpacity: 0.7 },
  normal: { radius: 22, blur: 4, opacity: 0.18, ringOpacity: 0.55 },
  limited: { radius: 28, blur: 7, opacity: 0.1, ringOpacity: 0.35 },
  dual: { radius: 24, blur: 4.5, opacity: 0.16, ringOpacity: 0.62 },
  uncertain: { radius: 32, blur: 9, opacity: 0.07, ringOpacity: 0.22 },
};

function evidenceState(vertical: CompassAxis, horizontal: CompassAxis): EvidenceState {
  if (vertical.centerState === "uncertain" || horizontal.centerState === "uncertain") {
    return "uncertain";
  }
  if (vertical.centerState === "dual" || horizontal.centerState === "dual") {
    return "dual";
  }

  const weakerAxis = Math.min(vertical.evidence, horizontal.evidence);
  if (weakerAxis >= 8) return "strong";
  if (weakerAxis < 4) return "limited";
  return "normal";
}

function Diamond({
  title,
  vertical,
  horizontal,
  selected,
  quadrants,
}: {
  title: string;
  vertical: CompassAxis;
  horizontal: CompassAxis;
  selected: CompassAxisId | null;
  quadrants: QuadrantNames;
}) {
  const pointX = CX + (horizontal.position / 100) * MARKER_RADIUS;
  const pointY = CY - (vertical.position / 100) * MARKER_RADIUS;
  const verticalActive = vertical.id === selected;
  const horizontalActive = horizontal.id === selected;
  const active = verticalActive || horizontalActive;
  const state = evidenceState(vertical, horizontal);
  const halo = HALO[state];
  const activeQuadrant =
    vertical.positionBand === "center" || horizontal.positionBand === "center"
      ? null
      : vertical.position > 0
        ? horizontal.position < 0
          ? "topLeft"
          : "topRight"
        : horizontal.position < 0
          ? "bottomLeft"
          : "bottomRight";
  const mixedColor = `color-mix(in srgb, ${LEFT_COLOR} 50%, ${RIGHT_COLOR})`;
  const outerDiamond = `${CX},${CY - AXIS_RADIUS} ${CX + AXIS_RADIUS},${CY} ${CX},${CY + AXIS_RADIUS} ${CX - AXIS_RADIUS},${CY}`;
  const quadrantData = [
    {
      id: "topLeft" as const,
      points: `${CX},${CY} ${CX},${CY - AXIS_RADIUS} ${CX - AXIS_RADIUS},${CY}`,
      x: 50,
      y: 94,
      anchor: "start" as const,
      color: mixedColor,
      label: quadrants.topLeft,
    },
    {
      id: "topRight" as const,
      points: `${CX},${CY} ${CX},${CY - AXIS_RADIUS} ${CX + AXIS_RADIUS},${CY}`,
      x: 430,
      y: 94,
      anchor: "end" as const,
      color: RIGHT_COLOR,
      label: quadrants.topRight,
    },
    {
      id: "bottomLeft" as const,
      points: `${CX},${CY} ${CX},${CY + AXIS_RADIUS} ${CX - AXIS_RADIUS},${CY}`,
      x: 50,
      y: 280,
      anchor: "start" as const,
      color: LEFT_COLOR,
      label: quadrants.bottomLeft,
    },
    {
      id: "bottomRight" as const,
      points: `${CX},${CY} ${CX},${CY + AXIS_RADIUS} ${CX + AXIS_RADIUS},${CY}`,
      x: 430,
      y: 280,
      anchor: "end" as const,
      color: mixedColor,
      label: quadrants.bottomRight,
    },
  ];
  return (
    <figure>
      <p className={`${T.micro} text-center text-bone-faint`}>{title}</p>
      <svg
        viewBox="0 0 480 360"
        role="img"
        aria-label={`${vertical.left} to ${vertical.right} and ${horizontal.left} to ${horizontal.right}`}
        className="mx-auto mt-1 block w-full max-w-[440px]"
      >
        <defs>
          <linearGradient
            id={`diamond-vertical-${vertical.id}`}
            gradientUnits="userSpaceOnUse"
            x1={CX}
            y1={CY + AXIS_RADIUS}
            x2={CX}
            y2={CY - AXIS_RADIUS}
          >
            <stop offset="0%" stopColor={LEFT_COLOR} />
            <stop offset="50%" stopColor="var(--color-rule)" />
            <stop offset="100%" stopColor={RIGHT_COLOR} />
          </linearGradient>
          <linearGradient
            id={`diamond-horizontal-${horizontal.id}`}
            gradientUnits="userSpaceOnUse"
            x1={CX - AXIS_RADIUS}
            y1={CY}
            x2={CX + AXIS_RADIUS}
            y2={CY}
          >
            <stop offset="0%" stopColor={LEFT_COLOR} />
            <stop offset="50%" stopColor="var(--color-rule)" />
            <stop offset="100%" stopColor={RIGHT_COLOR} />
          </linearGradient>
          <filter
            id={`diamond-halo-${vertical.id}`}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation={halo.blur} />
          </filter>
        </defs>

        {quadrantData.map((quadrant) => (
          <polygon
            key={quadrant.id}
            points={quadrant.points}
            fill={quadrant.color}
            fillOpacity={activeQuadrant === quadrant.id ? 0.12 : 0.025}
            stroke={activeQuadrant === quadrant.id ? quadrant.color : "none"}
            strokeOpacity={activeQuadrant === quadrant.id ? 0.28 : 0}
            strokeWidth="1"
          />
        ))}

        <polygon
          points={outerDiamond}
          fill="none"
          stroke="var(--color-bone-faint)"
          strokeOpacity="0.55"
          strokeWidth="1.25"
        />
        <polygon
          points={`${CX},${CY - AXIS_RADIUS / 2} ${CX + AXIS_RADIUS / 2},${CY} ${CX},${CY + AXIS_RADIUS / 2} ${CX - AXIS_RADIUS / 2},${CY}`}
          fill="none"
          stroke="var(--color-rule)"
          strokeDasharray="2 5"
        />

        {quadrantData.map((quadrant) => (
          <text
            key={quadrant.id}
            x={quadrant.x}
            y={quadrant.y}
            textAnchor={quadrant.anchor}
            fill={activeQuadrant === quadrant.id ? "var(--color-bone)" : "var(--color-bone-soft)"}
            fillOpacity={activeQuadrant === quadrant.id ? 1 : 0.9}
            fontSize="10"
            letterSpacing="1.1"
            className="uppercase"
          >
            {quadrant.label}
          </text>
        ))}

        <line
          x1={CX}
          y1={CY + AXIS_RADIUS}
          x2={CX}
          y2={CY - AXIS_RADIUS}
          stroke={`url(#diamond-vertical-${vertical.id})`}
          strokeWidth={verticalActive ? 2.25 : 1.5}
        />
        <line
          x1={CX - AXIS_RADIUS}
          y1={CY}
          x2={CX + AXIS_RADIUS}
          y2={CY}
          stroke={`url(#diamond-horizontal-${horizontal.id})`}
          strokeWidth={horizontalActive ? 2.25 : 1.5}
        />

        <line
          x1={CX}
          y1={pointY}
          x2={pointX}
          y2={pointY}
          stroke={markerColor(horizontal.position)}
          strokeWidth="1"
          strokeOpacity="0.72"
          strokeDasharray="3 4"
        />
        <line
          x1={pointX}
          y1={CY}
          x2={pointX}
          y2={pointY}
          stroke={markerColor(vertical.position)}
          strokeWidth="1"
          strokeOpacity="0.72"
          strokeDasharray="3 4"
        />

        <circle
          cx={pointX}
          cy={pointY}
          r={halo.radius}
          fill="var(--color-signal)"
          fillOpacity={halo.opacity}
          filter={`url(#diamond-halo-${vertical.id})`}
        />
        <circle
          cx={pointX}
          cy={pointY}
          r={12}
          fill="none"
          stroke="var(--color-bone-soft)"
          strokeOpacity={halo.ringOpacity}
          strokeWidth="0.75"
          strokeDasharray={state === "dual" ? "3 3" : state === "uncertain" ? "1 4" : undefined}
        />

        <rect
          x={pointX - (active ? 5 : 4)}
          y={pointY - (active ? 5 : 4)}
          width={active ? 10 : 8}
          height={active ? 10 : 8}
          rx="0.75"
          fill="var(--color-bone)"
          fillOpacity={state === "uncertain" ? 0.6 : 1}
          stroke={active ? "var(--color-signal)" : "var(--color-void)"}
          strokeWidth={active ? 2.5 : 2}
          transform={`rotate(45 ${pointX} ${pointY})`}
        />

        {([
          { text: vertical.right, x: CX, y: 22, anchor: "middle", color: RIGHT_COLOR },
          { text: horizontal.right, x: CX + AXIS_RADIUS + 32, y: CY + 4, anchor: "start", color: RIGHT_COLOR },
          { text: vertical.left, x: CX, y: 348, anchor: "middle", color: LEFT_COLOR },
          { text: horizontal.left, x: CX - AXIS_RADIUS - 32, y: CY + 4, anchor: "end", color: LEFT_COLOR },
        ] as const).map((label) => (
          <text
            key={label.text}
            x={label.x}
            y={label.y}
            textAnchor={label.anchor}
            fill={label.color}
            fontSize="11"
            letterSpacing="1.2"
            className="uppercase"
          >
            {label.text}
          </text>
        ))}
      </svg>
    </figure>
  );
}

function AxisControl({
  axis,
  active,
  onSelect,
}: {
  axis: CompassAxis;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`Open ${axis.left} to ${axis.right} explanation`}
      className={`w-full border-t px-1 py-5 text-left transition-colors ${
        active ? "border-bone-faint" : "border-rule-faint hover:border-rule"
      }`}
    >
      <span className="flex justify-between gap-5 text-[0.8125rem] tracking-[0.08em] uppercase">
        <span className="text-ember">{axis.left}</span>
        <span className="text-patina">{axis.right}</span>
      </span>
      <span
        className="relative mt-4 block h-0.5"
        style={{ background: `linear-gradient(90deg, ${LEFT_COLOR}, var(--color-rule) 50%, ${RIGHT_COLOR})` }}
      >
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 block h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-bone-faint"
        />
        <span
          className="absolute top-1/2 block h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-void"
          style={{
            left: `${(axis.position + 100) / 2}%`,
            backgroundColor: markerColor(axis.position),
            boxShadow: active ? "0 0 0 1px var(--color-signal)" : undefined,
          }}
        />
      </span>
    </button>
  );
}

function CompassDrawer({
  axis,
  context,
  onClose,
}: {
  axis: CompassAxis;
  context: CompassContext[];
  onClose: () => void;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close compass explanation"
        onClick={onClose}
        className="absolute inset-0 bg-void/80"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={`compass-${axis.id}-title`}
        className="absolute top-0 right-0 h-full w-full max-w-xl overflow-y-auto border-l border-rule bg-surface px-8 py-9 shadow-2xl sm:px-10"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className={`${T.micro} text-patina`}>Relationship compass</p>
            <h3
              id={`compass-${axis.id}-title`}
              className="inscription mt-3 text-[1.625rem] tracking-[0.07em] text-bone"
            >
              {axis.left} ↔ {axis.right}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`${T.micro} shrink-0 text-bone-faint transition-colors hover:text-bone`}
          >
            Close ✕
          </button>
        </div>

        <p className={`${T.note} mt-7 text-bone-faint`}>{axis.question}</p>
        <p className="mt-3 text-[1.375rem] leading-snug text-bone">{axis.reading}</p>
        {axis.counterReading ? (
          <p className={`${T.body} mt-3`}>{axis.counterReading}</p>
        ) : null}

        <div className="mt-10 border-t border-rule pt-6">
          <p className={`${T.micro} text-patina`}>What moved the marker</p>
          {axis.contributors.length ? (
            <ul className="mt-5 list-none space-y-5">
              {axis.contributors.map((evidence) => (
                <li key={evidence.id} className="border-t border-rule-faint pt-4">
                  <div className="flex items-baseline justify-between gap-5">
                    <p className="text-[1rem] leading-snug text-bone">{evidence.label}</p>
                    <span className={`${T.tiny} shrink-0 text-bone-faint`}>
                      {weightLabel(evidence)}
                    </span>
                  </div>
                  {evidence.placements.map((placement) => (
                    <p key={placement} className={`${T.note} mt-2`}>{placement}</p>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <p className={`${T.note} mt-4`}>No direct evidence in the available chart.</p>
          )}
        </div>

        <div className="mt-12 border-t border-rule pt-6">
          <div className="flex items-baseline justify-between gap-5">
            <p className={`${T.micro} text-patina`}>House context</p>
            <span className={`${T.tiny} text-bone-faint`}>Does not move the marker</span>
          </div>
          <dl className="mt-5 space-y-4">
            {context.map((item) => (
              <div key={item.id} className="grid grid-cols-[8rem_1fr] gap-5 border-t border-rule-faint pt-4">
                <dt className={`${T.micro} text-bone-faint`}>{item.label}</dt>
                <dd>
                  <p className={T.body}>{item.placement}</p>
                  <p className={`${T.note} mt-1`}>{item.note}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>
    </div>
  );
}

export default function RelationshipCompass({
  compass,
}: {
  compass: RelationshipCompassData;
}) {
  const [selectedId, setSelectedId] = useState<CompassAxisId | null>(null);
  const selected = compass.axes.find((axis) => axis.id === selectedId) ?? null;
  const freedomBonding = compass.axes.find((axis) => axis.id === "freedom-bonding");
  const playSeriousness = compass.axes.find((axis) => axis.id === "play-seriousness");
  const mentalEmotional = compass.axes.find((axis) => axis.id === "mental-emotional");
  const receptiveExpressive = compass.axes.find((axis) => axis.id === "receptive-expressive");

  if (!freedomBonding || !playSeriousness || !mentalEmotional || !receptiveExpressive) {
    return null;
  }

  return (
    <section>
      <SectionHeading compact>Relationship compass</SectionHeading>
      <div className="grid gap-5 sm:grid-cols-2 lg:gap-10">
        <Diamond
          title="Relationship orientation"
          vertical={freedomBonding}
          horizontal={playSeriousness}
          selected={selectedId}
          quadrants={{
            topLeft: "Romantic",
            topRight: "Devoted",
            bottomLeft: "Exploratory",
            bottomRight: "Self-directed",
          }}
        />
        <Diamond
          title="Connection style"
          vertical={mentalEmotional}
          horizontal={receptiveExpressive}
          selected={selectedId}
          quadrants={{
            topLeft: "Attuned",
            topRight: "Demonstrative",
            bottomLeft: "Observant",
            bottomRight: "Articulate",
          }}
        />
      </div>

      <div className="mt-6 grid gap-x-12 sm:grid-cols-2">
        {compass.axes.map((axis) => (
          <AxisControl
            key={axis.id}
            axis={axis}
            active={axis.id === selectedId}
            onSelect={() => setSelectedId(axis.id)}
          />
        ))}
      </div>

      {selected ? (
        <CompassDrawer
          axis={selected}
          context={compass.context}
          onClose={() => setSelectedId(null)}
        />
      ) : null}
    </section>
  );
}
