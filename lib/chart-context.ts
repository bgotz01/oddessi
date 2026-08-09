import type { Chart } from "@/lib/charts";

/**
 * The chart under study, rendered as a system-prompt block for the council.
 *
 * Deliberately not the same builder as `/api/chat`'s `buildChartContext`. That
 * one is a whole persona — "answer as though speaking directly to this person"
 * — because the Interface has no voice of its own. Each council seat already
 * has a persona, so this block is data and nothing else: measurements, framed
 * the same way page references and memory are, and left for the seats to read.
 */
export function buildChartBlock(chart: Chart): string {
  const lines: string[] = [
    "─── THE CHART UNDER STUDY ──────────────────────────────────────────────────",
    `These are the measurements for ${chart.name}. Every question in this session is`,
    "about this chart. Cite placements exactly — body, sign, degree, house, orb —",
    "and never answer with generic astrology when the chart itself can be read.",
    "",
    `Born: ${chart.birth.date} at ${chart.birth.time} (${chart.birth.timezone})`,
    `Location: ${chart.birth.location} (${chart.birth.latitude.toFixed(4)}°, ${chart.birth.longitude.toFixed(4)}°)`,
    "",
    `Sun: ${chart.big3.sun}  ·  Moon: ${chart.big3.moon}  ·  Rising: ${chart.big3.rising}`,
    "",
  ];

  if (chart.placements.length > 0) {
    lines.push("Placements:");
    for (const p of chart.placements) {
      lines.push(
        `  ${p.body}: ${p.sign} ${p.degree} — House ${p.house}${p.retrograde ? " ℞" : ""}`,
      );
    }
    lines.push("");
  }

  if (chart.houses.length > 0) {
    lines.push("House cusps:");
    for (const h of chart.houses) {
      lines.push(`  ${h.roman}: ${h.sign} ${h.degree}`);
    }
    lines.push("");
  }

  if (chart.aspects.length > 0) {
    lines.push("Aspects:");
    for (const a of chart.aspects) {
      lines.push(`  ${a.planet1} ${a.type} ${a.planet2} (orb ${a.orb.toFixed(2)}°)`);
    }
    lines.push("");
  }

  lines.push(
    "─── END OF CHART ───────────────────────────────────────────────────────────",
  );

  return lines.join("\n");
}
