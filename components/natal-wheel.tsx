"use client";

/**
 * NatalWheel — SVG natal chart wheel.
 *
 * Hover a sign or house sector → floating tooltip with a summary.
 * Click a sign or house sector → right-side drawer with full detail.
 */

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import type { Chart, Placement, HouseCusp, Aspect } from "@/lib/charts";
import { bodyColor } from "@/lib/bodies";
import { BODY_GLYPH, SIGN_GLYPH } from "@/lib/symbols";
import { houseInfo, signOnCusp } from "@/lib/interpretation";
import type { HouseInfo, SignHouseInterpretation } from "@/lib/interpretation";

// ─── Geometry helpers ────────────────────────────────────────────────────────

const DEG = Math.PI / 180;

function r4(n: number): number {
  return Math.round(n * 10000) / 10000;
}

function polar(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const a = -angleDeg * DEG;
  return [r4(cx + r * Math.cos(a)), r4(cy + r * Math.sin(a))];
}

/** Open arc path (for fills and spoke helpers). */
function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const [x1, y1] = polar(cx, cy, r, startDeg);
  const [x2, y2] = polar(cx, cy, r, endDeg);
  const sweep = ((endDeg - startDeg + 360) % 360 > 180) ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${sweep} 0 ${x2} ${y2}`;
}

/** Closed annular sector — one continuous subpath so evenodd punches the hole correctly. */
function annularSector(
  cx: number, cy: number,
  rOuter: number, rInner: number,
  startDeg: number, endDeg: number,
): string {
  const [ox1, oy1] = polar(cx, cy, rOuter, startDeg);
  const [ox2, oy2] = polar(cx, cy, rOuter, endDeg);
  const [ix2, iy2] = polar(cx, cy, rInner, endDeg);
  const [ix1, iy1] = polar(cx, cy, rInner, startDeg);
  const sweep = ((endDeg - startDeg + 360) % 360 > 180) ? 1 : 0;
  return [
    `M ${ox1} ${oy1}`,
    `A ${rOuter} ${rOuter} 0 ${sweep} 0 ${ox2} ${oy2}`,
    `L ${ix2} ${iy2}`,
    `A ${rInner} ${rInner} 0 ${sweep} 1 ${ix1} ${iy1}`,
    "Z",
  ].join(" ");
}

// ─── Dimension constants ─────────────────────────────────────────────────────

const SIZE = 540;
const CX = SIZE / 2;
const CY = SIZE / 2;

const R_OUTER = 248;
const R_ZODIAC = 222;
const R_HOUSE = 188;
const R_PLANET = 162;
const R_ASPECT = 100;
const R_CENTER = 60;

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

// ─── Colours ────────────────────────────────────────────────────────────────

const SIGN_COLOR: Record<string, string> = {
  Aries: "#c47a7a", Taurus: "#96ad72", Gemini: "#b0b072", Cancer: "#7aa0c8",
  Leo: "#c89050", Virgo: "#82a882", Libra: "#b09870", Scorpio: "#9a60a8",
  Sagittarius: "#c89660", Capricorn: "#8898b0", Aquarius: "#60a0cc", Pisces: "#7882c8",
};

const SIGN_ELEMENT: Record<string, string> = {
  Aries: "Fire", Leo: "Fire", Sagittarius: "Fire",
  Taurus: "Earth", Virgo: "Earth", Capricorn: "Earth",
  Gemini: "Air", Libra: "Air", Aquarius: "Air",
  Cancer: "Water", Scorpio: "Water", Pisces: "Water",
};

const SIGN_MODALITY: Record<string, string> = {
  Aries: "Cardinal", Cancer: "Cardinal", Libra: "Cardinal", Capricorn: "Cardinal",
  Taurus: "Fixed", Leo: "Fixed", Scorpio: "Fixed", Aquarius: "Fixed",
  Gemini: "Mutable", Virgo: "Mutable", Sagittarius: "Mutable", Pisces: "Mutable",
};

const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const ASPECT_COLOR: Record<string, string> = {
  Conjunction: "#6baf9a", Opposition: "#c2664b", Trine: "#6baf9a", Square: "#c2664b",
  Sextile: "#8dc4ad", Quincunx: "#9da4b8", Semisextile: "#9da4b8",
  Semisquare: "#9da4b8", Sesquisquare: "#9da4b8",
};

// ─── Drawer state type ───────────────────────────────────────────────────────

type DrawerContent =
  | {
    kind: "house";
    houseNum: number;
    info: HouseInfo;
    cusp: HouseCusp;           // the user's actual cusp — sign, degree, longitude
    interp: SignHouseInterpretation | null;
    tenants: Placement[];      // planets sitting in this house
  }
  | {
    kind: "sign";
    sign: string;
    tenants: Placement[];      // planets the user has in this sign
  };

// ─── Tooltip state type ──────────────────────────────────────────────────────

interface TooltipState {
  x: number;
  y: number;
  content: {
    title: string;
    subtitle?: string;
    body?: string;
    tags?: string[];
  };
}

// ─── Planet collision resolver ───────────────────────────────────────────────

const MIN_GAP = 8;

function resolveCollisions(
  items: Array<{ lon: number; body: string }>,
): Array<{ lon: number; displayLon: number; body: string }> {
  if (items.length === 0) return [];
  const sorted = [...items].sort((a, b) => a.lon - b.lon);
  const clusters: typeof sorted[] = [];
  let current: typeof sorted = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].lon - current[current.length - 1].lon < MIN_GAP) {
      current.push(sorted[i]);
    } else {
      clusters.push(current);
      current = [sorted[i]];
    }
  }
  clusters.push(current);
  return clusters.flatMap((cluster) => {
    if (cluster.length === 1) return [{ ...cluster[0], displayLon: cluster[0].lon }];
    const centroid = cluster.reduce((s, p) => s + p.lon, 0) / cluster.length;
    const start = centroid - ((cluster.length - 1) * MIN_GAP) / 2;
    return cluster.map((p, i) => ({ ...p, displayLon: start + i * MIN_GAP }));
  });
}

// ─── Floating tooltip ────────────────────────────────────────────────────────

function Tooltip({ tip }: { tip: TooltipState | null }) {
  if (!tip) return null;
  return (
    <div
      className="pointer-events-none fixed z-50 max-w-[240px] rounded border border-rule bg-surface-alt px-3 py-2.5 shadow-lg"
      style={{ left: tip.x + 14, top: tip.y - 8 }}
    >
      <p className="inscription text-[0.6875rem] text-bone">{tip.content.title}</p>
      {tip.content.subtitle && (
        <p className="datum mt-0.5 text-[0.625rem] text-patina">{tip.content.subtitle}</p>
      )}
      {tip.content.body && (
        <p className="mt-1.5 text-[0.75rem] font-light leading-snug text-bone-soft">
          {tip.content.body}
        </p>
      )}
      {tip.content.tags && tip.content.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tip.content.tags.slice(0, 5).map((t) => (
            <span key={t} className="datum rounded border border-rule px-1.5 py-0.5 text-[0.5625rem] text-bone-faint">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Right drawer ────────────────────────────────────────────────────────────

function DrawerSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-rule pt-5">
      <p className="eyebrow mb-3 text-bone-faint">{label}</p>
      {children}
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span key={t} className="datum rounded border border-rule px-2 py-1 text-[0.5625rem] text-bone-soft">
          {t}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items, tone = "normal" }: { items: string[]; tone?: "normal" | "ember" }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className={`flex gap-2 text-[0.8125rem] font-light leading-snug ${tone === "ember" ? "text-ember" : "text-bone-soft"}`}>
          <span className="mt-[0.3em] h-1 w-1 shrink-0 rounded-full bg-current opacity-50" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function WheelDrawer({
  content,
  onClose,
}: {
  content: DrawerContent | null;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    if (!content) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [content, onClose]);

  const open = content !== null;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-void/60"
          onClick={onClose}
          aria-hidden
        />
      )}

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chart detail"
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm overflow-y-auto border-l border-rule bg-surface shadow-xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {content && (
          <div className="flex flex-col gap-6 p-6 pb-16">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                {content.kind === "house" ? (
                  <>
                    <p className="datum text-[0.625rem] tracking-[0.15em] text-bone-faint uppercase">
                      {content.info.element} · {content.info.modality}
                    </p>
                    <h2 className="inscription mt-1 text-[1.25rem] text-bone">
                      House {ROMAN[content.houseNum - 1]}
                    </h2>
                    <p className="mt-0.5 text-[0.9375rem] font-light text-patina">
                      {content.info.name}
                    </p>
                    {/* The user's actual cusp */}
                    <p className="mt-1 flex items-center gap-1.5">
                      <span className="glyph text-[1.1rem]" style={{ color: SIGN_COLOR[content.cusp.sign] }}>
                        {SIGN_GLYPH[content.cusp.sign]}
                      </span>
                      <span className="text-[0.875rem] font-light text-bone-soft">
                        {content.cusp.sign}
                      </span>
                      <span className="datum text-[0.6875rem] text-bone-faint">
                        {content.cusp.degree}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="datum text-[0.625rem] tracking-[0.15em] text-bone-faint uppercase">
                      {SIGN_ELEMENT[content.sign]} · {SIGN_MODALITY[content.sign]}
                    </p>
                    <h2 className="inscription mt-1 flex items-center gap-3 text-[1.25rem] text-bone">
                      <span className="glyph text-[1.75rem]" style={{ color: SIGN_COLOR[content.sign] }}>
                        {SIGN_GLYPH[content.sign]}
                      </span>
                      {content.sign}
                    </h2>
                    {content.tenants.length > 0 && (
                      <p className="mt-1 text-[0.75rem] font-light text-bone-faint">
                        {content.tenants.map((t) => t.body).join(", ")} here
                      </p>
                    )}
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="mt-1 text-bone-faint transition-colors hover:text-bone"
              >
                ✕
              </button>
            </div>

            {/* House drawer body */}
            {content.kind === "house" && (
              <>
                <DrawerSection label="About this house">
                  <p className="text-[0.875rem] font-light leading-relaxed text-bone-soft">
                    {content.info.description}
                  </p>
                </DrawerSection>

                <DrawerSection label="Life areas">
                  <TagList items={content.info.lifeAreas} />
                </DrawerSection>

                {/* Planets in this house */}
                <DrawerSection label={content.tenants.length === 0 ? "Tenants · empty" : `Tenants · ${content.tenants.length}`}>
                  {content.tenants.length === 0 ? (
                    <p className="text-[0.8125rem] font-light text-bone-faint">
                      No planets occupy this house. It runs through its cusp sign and its ruler's position.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {content.tenants.map((t) => (
                        <div key={t.body} className="flex items-baseline gap-2">
                          <span className="glyph text-[1.1rem]" style={{ color: bodyColor(t.body) }}>
                            {BODY_GLYPH[t.body] ?? "·"}
                          </span>
                          <span className="text-[0.875rem] font-light text-bone">{t.body}</span>
                          <span className="text-[0.8125rem] font-light text-bone-soft">
                            <span className="glyph mr-1" style={{ color: SIGN_COLOR[t.sign] }}>{SIGN_GLYPH[t.sign]}</span>
                            {t.sign}
                          </span>
                          <span className="datum text-[0.6875rem] text-bone-faint">{t.degree}</span>
                          {t.retrograde && <span className="datum text-[0.625rem] text-ember">℞</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </DrawerSection>

                {content.interp && (
                  <>
                    <DrawerSection label={content.interp.combination}>
                      <p className="inscription mb-2 text-[0.8125rem] text-patina">
                        {content.interp.essence}
                      </p>
                      <p className="text-[0.875rem] font-light leading-relaxed text-bone-soft">
                        {content.interp.description}
                      </p>
                    </DrawerSection>

                    <DrawerSection label="Your approach">
                      <p className="border-l border-patina-dim pl-3 text-[0.875rem] font-light italic leading-relaxed text-bone-soft">
                        {content.interp.approach}
                      </p>
                    </DrawerSection>

                    <DrawerSection label="Strengths">
                      <BulletList items={content.interp.strengths} />
                    </DrawerSection>

                    <DrawerSection label="Challenges">
                      <BulletList items={content.interp.challenges} tone="ember" />
                    </DrawerSection>

                    <DrawerSection label="In daily life">
                      <p className="text-[0.875rem] font-light leading-relaxed text-bone-soft">
                        {content.interp.lifeExpression}
                      </p>
                    </DrawerSection>

                    <DrawerSection label="Keywords">
                      <TagList items={content.interp.keywords} />
                    </DrawerSection>
                  </>
                )}
              </>
            )}

            {/* Sign drawer body */}
            {content.kind === "sign" && (
              <>
                <DrawerSection label="Element & Modality">
                  <div className="grid grid-cols-2 gap-px bg-rule">
                    {[
                      ["Element", SIGN_ELEMENT[content.sign]],
                      ["Modality", SIGN_MODALITY[content.sign]],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-void px-3 py-2.5">
                        <p className="eyebrow text-bone-faint">{label}</p>
                        <p className="datum mt-1 text-[0.9375rem] text-bone">{value}</p>
                      </div>
                    ))}
                  </div>
                </DrawerSection>

                <DrawerSection label={content.tenants.length === 0 ? "Your planets here · none" : `Your planets here · ${content.tenants.length}`}>
                  {content.tenants.length === 0 ? (
                    <p className="text-[0.8125rem] font-light text-bone-faint">
                      No planets fall in {content.sign} in your chart.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {content.tenants.map((t) => (
                        <div key={t.body} className="border-l-2 pl-3" style={{ borderColor: bodyColor(t.body) }}>
                          <div className="flex items-baseline gap-2">
                            <span className="glyph text-[1.1rem]" style={{ color: bodyColor(t.body) }}>
                              {BODY_GLYPH[t.body] ?? "·"}
                            </span>
                            <span className="text-[0.875rem] font-light text-bone">{t.body}</span>
                            <span className="datum text-[0.6875rem] text-bone-faint">{t.degree}</span>
                            {t.houseNumber && (
                              <span className="datum text-[0.6875rem] text-bone-faint">
                                House {ROMAN[t.houseNumber - 1]}
                              </span>
                            )}
                            {t.retrograde && <span className="datum text-[0.625rem] text-ember">℞</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </DrawerSection>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ─── SVG sub-components ──────────────────────────────────────────────────────

function ZodiacRing({ rotation }: { rotation: number }) {
  return (
    <g style={{ pointerEvents: "none" }}>
      <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke="#3a4255" strokeWidth={1} />
      <circle cx={CX} cy={CY} r={R_ZODIAC} fill="none" stroke="#3a4255" strokeWidth={0.75} />
      {SIGNS.map((sign, i) => {
        const startLon = i * 30 + rotation;
        const endLon = startLon + 30;
        const midLon = startLon + 15;
        const [gx, gy] = polar(CX, CY, (R_OUTER + R_ZODIAC) / 2, midLon);
        const [tx1, ty1] = polar(CX, CY, R_ZODIAC, startLon);
        const [tx2, ty2] = polar(CX, CY, R_OUTER, startLon);
        const color = SIGN_COLOR[sign] ?? "#a8afbd";
        return (
          <g key={sign}>
            <path
              d={`M ${CX} ${CY} ${arcPath(CX, CY, R_OUTER, startLon, endLon).slice(1)} Z`}
              fill={color} fillOpacity={0.12}
            />
            <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#3a4255" strokeWidth={0.75} />
            <text x={gx} y={gy} textAnchor="middle" dominantBaseline="central"
              fontSize={14} fill={color} style={{ fontFamily: "serif" }}>
              {SIGN_GLYPH[sign] ?? sign[0]}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function HouseRing({
  cusps,
  rotation,
  onHover,
  onLeave,
  onClick,
}: {
  cusps: HouseCusp[];
  rotation: number;
  onHover: (houseNum: number, sign: string, e: React.MouseEvent) => void;
  onLeave: () => void;
  onClick: (houseNum: number, sign: string) => void;
}) {
  if (cusps.length !== 12) return null;
  return (
    <g>
      <circle cx={CX} cy={CY} r={R_HOUSE} fill="none" stroke="#3a4255" strokeWidth={0.75} />
      {cusps.map((cusp, i) => {
        const nextCusp = cusps[(i + 1) % 12];
        const startLon = cusp.longitude + rotation;
        const endLon = nextCusp.longitude + rotation;
        const span = ((nextCusp.longitude - cusp.longitude) + 360) % 360;
        const midLon = startLon + span / 2;
        const isAngular = [0, 3, 6, 9].includes(i);
        const [lx1, ly1] = polar(CX, CY, R_HOUSE, startLon);
        const [lx2, ly2] = polar(CX, CY, R_ZODIAC, startLon);
        const [tx, ty] = polar(CX, CY, (R_HOUSE + R_ZODIAC) / 2 - 2, midLon);
        const hitPath = annularSector(CX, CY, R_ZODIAC, R_HOUSE, startLon, endLon);
        return (
          <g key={i}>
            <line x1={lx1} y1={ly1} x2={lx2} y2={ly2}
              stroke={isAngular ? "#6baf9a" : "#3a4255"}
              strokeWidth={isAngular ? 1.25 : 0.75}
              style={{ pointerEvents: "none" }} />
            <text x={tx} y={ty} textAnchor="middle" dominantBaseline="central"
              fontSize={9} fill={isAngular ? "#6baf9a" : "#a8afbd"} letterSpacing="0.04em"
              style={{ fontFamily: "var(--font-plex-mono, monospace)", pointerEvents: "none" }}>
              {ROMAN[i]}
            </text>
            <path d={hitPath} fill="white" fillOpacity={0} fillRule="evenodd" stroke="none" className="cursor-pointer"
              onMouseEnter={(e) => onHover(cusp.number, cusp.sign, e)}
              onMouseLeave={onLeave}
              onClick={() => onClick(cusp.number, cusp.sign)}
            />
          </g>
        );
      })}
    </g>
  );
}

function Planets({ placements, rotation }: { placements: Placement[]; rotation: number }) {
  const withLon = placements.filter((p) => p.longitude !== null) as Array<Placement & { longitude: number }>;
  const resolved = useMemo(() => {
    const items = withLon.map((p) => ({ lon: p.longitude + rotation, body: p.body }));
    return resolveCollisions(items);
  }, [withLon, rotation]);
  const placementByBody = useMemo(() => {
    const map: Record<string, Placement> = {};
    for (const p of placements) map[p.body] = p;
    return map;
  }, [placements]);
  return (
    <g>
      <circle cx={CX} cy={CY} r={R_PLANET} fill="none" stroke="#2a3040" strokeWidth={0.5} />
      {resolved.map(({ body, lon, displayLon }) => {
        const color = bodyColor(body);
        const glyph = BODY_GLYPH[body] ?? "·";
        const p = placementByBody[body];
        const [gx, gy] = polar(CX, CY, R_PLANET, displayLon);
        const [tx1, ty1] = polar(CX, CY, R_HOUSE - 2, lon);
        const [tx2, ty2] = polar(CX, CY, R_PLANET + 11, displayLon);
        const tooltipParts = [body];
        if (p) {
          tooltipParts.push(`${p.sign} ${p.degree}`);
          if (p.houseNumber) tooltipParts.push(`House ${ROMAN[p.houseNumber - 1]}`);
          if (p.retrograde) tooltipParts.push("℞ Retrograde");
        }
        return (
          <g key={body}>
            <line x1={tx1} y1={ty1} x2={tx2} y2={ty2}
              stroke={color} strokeWidth={0.75} strokeOpacity={0.5} style={{ pointerEvents: "none" }} />
            <g>
              <title>{tooltipParts.join(" · ")}</title>
              <circle cx={gx} cy={gy} r={10} fill="transparent" stroke="none" />
              <text x={gx} y={gy} textAnchor="middle" dominantBaseline="central"
                fontSize={14} fill={color} style={{ fontFamily: "serif", pointerEvents: "none" }}>
                {glyph}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
}

function AspectWeb({ aspects, placements, rotation }: { aspects: Aspect[]; placements: Placement[]; rotation: number }) {
  const lonByBody = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of placements) {
      if (p.longitude !== null) map[p.body] = p.longitude + rotation;
    }
    return map;
  }, [placements, rotation]);
  return (
    <g>
      {aspects.map((asp, i) => {
        const lon1 = lonByBody[asp.planet1];
        const lon2 = lonByBody[asp.planet2];
        if (lon1 === undefined || lon2 === undefined) return null;
        const [x1, y1] = polar(CX, CY, R_ASPECT, lon1);
        const [x2, y2] = polar(CX, CY, R_ASPECT, lon2);
        const color = ASPECT_COLOR[asp.type] ?? "#9da4b8";
        const opacity = Math.max(0.15, 0.65 - asp.orb * 0.07);
        const orbStr = asp.orb < 1 ? `${Math.round(asp.orb * 60)}′` : `${asp.orb.toFixed(1)}°`;
        return (
          <g key={i}>
            <title>{`${asp.planet1} ${asp.type} ${asp.planet2} · orb ${orbStr}`}</title>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="transparent" strokeWidth={6} />
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={0.85}
              strokeOpacity={opacity} style={{ pointerEvents: "none" }} />
          </g>
        );
      })}
    </g>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function NatalWheel({ chart }: { chart: Chart }) {
  const [showAspects, setShowAspects] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [drawer, setDrawer] = useState<DrawerContent | null>(null);
  const closeDrawer = useCallback(() => setDrawer(null), []);

  const ascLon = chart.angles.ascendant ?? 0;
  const rotation = 180 - ascLon;

  // Build a lookup: houseNumber → placements in that house
  const byHouse = useMemo(() => {
    const map: Record<number, Placement[]> = {};
    for (const p of chart.placements) {
      if (!p.isAngle && p.houseNumber !== null) {
        if (!map[p.houseNumber]) map[p.houseNumber] = [];
        map[p.houseNumber].push(p);
      }
    }
    return map;
  }, [chart.placements]);

  // Build a cusp lookup by house number
  const cuspByHouse = useMemo(() => {
    const map: Record<number, HouseCusp> = {};
    for (const c of chart.houses) map[c.number] = c;
    return map;
  }, [chart.houses]);

  // ── House hover / click ──────────────────────────────────────────────────

  const handleHouseHover = useCallback((houseNum: number, sign: string, e: React.MouseEvent) => {
    const info = houseInfo(houseNum);
    const interp = signOnCusp(sign, houseNum);
    const cusp = cuspByHouse[houseNum];
    const tenants = byHouse[houseNum] ?? [];
    setTooltip({
      x: e.clientX,
      y: e.clientY,
      content: {
        title: `House ${ROMAN[houseNum - 1]} · ${info?.name ?? ""}`,
        subtitle: cusp ? `${sign} ${cusp.degree}${interp ? ` · ${interp.essence}` : ""}` : undefined,
        body: tenants.length
          ? `${tenants.map((t) => t.body).join(", ")} in this house.`
          : "No planets occupy this house.",
        tags: info?.keywords.slice(0, 5),
      },
    });
  }, [byHouse, cuspByHouse]);

  const handleHouseClick = useCallback((houseNum: number, sign: string) => {
    const info = houseInfo(houseNum);
    if (!info) return;
    const cusp = cuspByHouse[houseNum];
    if (!cusp) return;
    const interp = signOnCusp(sign, houseNum);
    setTooltip(null);
    setDrawer({ kind: "house", houseNum, info, cusp, interp, tenants: byHouse[houseNum] ?? [] });
  }, [byHouse, cuspByHouse]);

  const handleLeave = useCallback(() => setTooltip(null), []);

  // Track mouse for tooltip position update while hovering
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width="100%"
          style={{ maxWidth: 540, display: "block" }}
          aria-label="Natal chart wheel"
          onMouseMove={handleMouseMove}
        >
          <circle cx={CX} cy={CY} r={R_OUTER} fill="#0c0e13" />

          <ZodiacRing rotation={rotation} />
          <HouseRing cusps={chart.houses} rotation={rotation} onHover={handleHouseHover} onLeave={handleLeave} onClick={handleHouseClick} />

          <circle cx={CX} cy={CY} r={R_HOUSE} fill="#0c0e13" />

          {showAspects && chart.aspects.length > 0 && (
            <AspectWeb aspects={chart.aspects} placements={chart.placements} rotation={rotation} />
          )}

          <circle cx={CX} cy={CY} r={R_CENTER} fill="#0c0e13" />
          <circle cx={CX} cy={CY} r={R_CENTER} fill="none" stroke="#3a4255" strokeWidth={0.75} />

          {chart.angles.ascendant !== null && (
            <line
              x1={CX - R_HOUSE} y1={CY} x2={CX + R_HOUSE} y2={CY}
              stroke="#6baf9a" strokeWidth={0.75} strokeOpacity={0.4}
              transform={`rotate(${-rotation} ${CX} ${CY})`}
              style={{ pointerEvents: "none" }}
            />
          )}

          <Planets placements={chart.placements} rotation={rotation} />
        </svg>

        {chart.aspects.length > 0 && (
          <button
            type="button"
            onClick={() => setShowAspects((v) => !v)}
            className="datum text-[0.625rem] tracking-[0.15em] uppercase text-bone-faint transition-colors hover:text-bone-soft"
          >
            {showAspects ? "Hide aspects" : "Show aspects"}
          </button>
        )}
      </div>

      {/* Floating tooltip — rendered in document, not inside SVG */}
      <Tooltip tip={tooltip} />

      {/* Right drawer */}
      <WheelDrawer content={drawer} onClose={closeDrawer} />
    </>
  );
}
