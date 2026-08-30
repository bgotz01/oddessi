// components/western/career/career-signature-axes.tsx

"use client";

import { T } from "@/components/western/growth/growth-ui";

/**
 * Three structural tendencies in the natal career architecture.
 *
 * Values are normalized internally from -1 → +1.
 *
 * These are not percentages and should not be displayed as such.
 */
export interface CareerSignature {
    /** Behind the scenes → Public-facing */
    visibility: number;

    /** Analytical → Creative */
    approach: number;

    /** People → Systems */
    orientation: number;

    /** The strongest chart-specific contributors to each coordinate. */
    reasons: Record<CareerSignatureAxis, string[]>;

    /** Context that is displayed beside, but never included in, the scores. */
    flags: CareerSignatureFlag[];
}

type CareerSignatureAxis = "visibility" | "approach" | "orientation";

interface CareerSignatureFlag {
    id: "northNodeTenth";
    label: string;
    text: string;
}

interface AxisDefinition {
    key: CareerSignatureAxis;
    title: string;
    left: string;
    right: string;
    leftMeaning: string;
    rightMeaning: string;
}

const AXES: AxisDefinition[] = [
    {
        key: "visibility",
        title: "Visibility",
        left: "Behind the scenes",
        right: "Public-facing",
        leftMeaning: "private contribution",
        rightMeaning: "public role",
    },
    {
        key: "approach",
        title: "Approach",
        left: "Analytical",
        right: "Creative",
        leftMeaning: "logic · precision",
        rightMeaning: "imagination · expression",
    },
    {
        key: "orientation",
        title: "Orientation",
        left: "People",
        right: "Systems",
        leftMeaning: "relationships · clients",
        rightMeaning: "structures · processes",
    },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function clamp(value: number) {
    return Math.max(-1, Math.min(1, value));
}

function position(value: number) {
    return ((clamp(value) + 1) / 2) * 100;
}

function tendency(
    value: number,
    left: string,
    right: string,
) {
    const v = clamp(value);
    const magnitude = Math.abs(v);

    if (magnitude < 0.16) {
        return "Balanced";
    }

    const side = v < 0 ? left : right;

    if (magnitude >= 0.72) {
        return `Strongly ${side.toLowerCase()}`;
    }

    if (magnitude >= 0.42) {
        return side;
    }

    return `Leaning ${side.toLowerCase()}`;
}

/* -------------------------------------------------------------------------- */
/*  Axis                                                                      */
/* -------------------------------------------------------------------------- */

function SignatureAxis({
    axis,
    value,
    reasons,
    flags,
}: {
    axis: AxisDefinition;
    value: number;
    reasons: string[];
    flags: CareerSignatureFlag[];
}) {
    const v = clamp(value);
    const x = position(v);

    const reading = tendency(v, axis.left, axis.right);

    const isLeft = v < 0;
    const isBalanced = Math.abs(v) < 0.16;

    return (
        <div className="border-t border-rule/65 py-3.5 first:border-t-0">
            {/* Title */}
            <h3 className="inscription text-center text-[1.1rem] leading-none text-bone">
                {axis.title}
            </h3>

            {/* Polarity labels */}
            <div className="mt-2.5 flex items-end justify-between gap-8">
                <p className={`${T.tiny} text-bone-soft`}>
                    {axis.left}
                </p>

                <p className={`${T.tiny} text-right text-bone-soft`}>
                    {axis.right}
                </p>
            </div>

            {/* Scale */}
            <div className="relative mt-1.5 h-3 overflow-visible">
                {/* Neutral track */}
                <div className="absolute inset-0 bg-bone-faint/[0.055]" />

                {/*
         * Directional fields.
         *
         * Each side becomes more saturated as it moves away from
         * the neutral center.
         */}
                <div
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1/2"
                    style={{
                        background:
                            "linear-gradient(to left, transparent 0%, color-mix(in srgb, var(--color-patina) 18%, transparent) 55%, color-mix(in srgb, var(--color-patina) 42%, transparent) 100%)",
                    }}
                />

                <div
                    aria-hidden
                    className="absolute inset-y-0 right-0 w-1/2"
                    style={{
                        background:
                            "linear-gradient(to right, transparent 0%, color-mix(in srgb, var(--color-ember) 18%, transparent) 55%, color-mix(in srgb, var(--color-ember) 42%, transparent) 100%)",
                    }}
                />

                {/* Quiet the background fields */}
                <div className="absolute inset-0 bg-background/45" />

                {/* Active deviation from center */}
                {!isBalanced && (
                    <div
                        aria-hidden
                        className="absolute inset-y-0"
                        style={
                            isLeft
                                ? {
                                    left: `${x}%`,
                                    right: "50%",
                                    background:
                                        "linear-gradient(to left, color-mix(in srgb, var(--color-patina) 30%, transparent), var(--color-patina))",
                                }
                                : {
                                    left: "50%",
                                    right: `${100 - x}%`,
                                    background:
                                        "linear-gradient(to right, color-mix(in srgb, var(--color-ember) 30%, transparent), var(--color-ember))",
                                }
                        }
                    />
                )}

                {/* Quarter marks */}
                <span
                    aria-hidden
                    className="absolute inset-y-0 left-1/4 w-px bg-background/45"
                />

                <span
                    aria-hidden
                    className="absolute inset-y-0 left-3/4 w-px bg-background/45"
                />

                {/* Neutral center */}
                <span
                    aria-hidden
                    className="absolute -top-0.5 -bottom-0.5 left-1/2 w-px -translate-x-1/2 bg-bone-soft/55"
                />

                {/* Exact position */}
                <span
                    aria-hidden
                    className={`
            absolute -top-0.5 -bottom-0.5
            w-[2px]
            -translate-x-1/2
            ${isBalanced
                            ? "bg-bone-soft"
                            : isLeft
                                ? "bg-patina"
                                : "bg-ember"
                        }
          `}
                    style={{ left: `${x}%` }}
                />

                {/* Endpoint */}
                <span
                    aria-hidden
                    className={`
            absolute top-1/2
            h-2 w-2
            -translate-x-1/2 -translate-y-1/2
            border bg-background
            ${isBalanced
                            ? "border-bone-soft"
                            : isLeft
                                ? "border-patina"
                                : "border-ember"
                        }
          `}
                    style={{ left: `${x}%` }}
                />
            </div>

            {/* Pole meanings */}
            <div className="mt-1 flex justify-between gap-8">
                <p className={`${T.micro} text-bone-faint/40`}>
                    {axis.leftMeaning}
                </p>

                <p className={`${T.micro} text-right text-bone-faint/40`}>
                    {axis.rightMeaning}
                </p>
            </div>

            {/* Interpretation */}
            <p
                className={`
          ${T.tiny}
          mt-1.5 text-center
          ${isBalanced
                        ? "text-bone-faint"
                        : isLeft
                            ? "text-patina"
                            : "text-ember"
                    }
        `}
            >
                {reading}
            </p>

            <details className="group mx-auto mt-3 max-w-xl border-t border-rule/50 pt-2.5">
                <summary
                    className={`${T.micro} flex cursor-pointer list-none items-center justify-center gap-2 text-bone-faint transition-colors hover:text-bone-soft [&::-webkit-details-marker]:hidden`}
                >
                    <span>Why this ranking</span>
                    <span
                        aria-hidden
                        className="text-[0.85rem] leading-none transition-transform group-open:rotate-45"
                    >
                        +
                    </span>
                </summary>

                <ul className={`${T.tiny} mt-3 list-disc space-y-1.5 pl-5 text-bone-faint marker:text-bone-faint/50`}>
                    {reasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                    ))}
                </ul>
            </details>

            {flags.length > 0 ? (
                <div className="mx-auto mt-3 max-w-xl border-t border-rule/50 pt-3">
                    {flags.map((flag) => (
                        <div key={flag.id} className="flex gap-3">
                            <span aria-hidden className="text-patina">
                                ↗
                            </span>

                            <div>
                                <p className={`${T.micro} text-patina`}>
                                    {flag.label}
                                </p>

                                <p className={`${T.tiny} mt-1 text-bone-faint`}>
                                    {flag.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function CareerSignatureAxes({
    signature,
}: {
    signature: CareerSignature;
}) {
    return (
        <section>
            <header className="flex items-end justify-between gap-8 border-b border-rule pb-3">
                <div>
                    <p className={`${T.tiny} text-bone-faint`}>
                        Career orientation
                    </p>

                    <h2 className="inscription mt-1 text-[1.5rem] leading-none text-bone">
                        Three tendencies
                    </h2>
                </div>

                <p
                    className={`${T.tiny} hidden max-w-[19rem] text-right text-bone-faint/50 md:block`}
                >
                    Three structural tendencies in the natal career pattern
                </p>
            </header>

            <div className="mt-0.5">
                {AXES.map((axis) => (
                    <SignatureAxis
                        key={axis.key}
                        axis={axis}
                        value={signature[axis.key]}
                        reasons={signature.reasons[axis.key]}
                        flags={axis.key === "visibility" ? signature.flags : []}
                    />
                ))}
            </div>
        </section>
    );
}
