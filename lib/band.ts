/**
 * A band is one row on a timeline.
 *
 * The distinction that matters: `start`/`end` are the *envelope* — the whole
 * span from first contact to final release — while `segments` are the stretches
 * the influence is actually in effect. A planet that stations retrograde leaves
 * and comes back, so the envelope has holes in it. Drawing only the envelope
 * would overstate the transit; drawing only the segments would hide its shape.
 * Both get drawn.
 */

export type BandStatus = "completed" | "active" | "upcoming";

export interface Segment {
  start: string;
  end: string;
}

export interface Band {
  id: string;
  glyph: string;
  title: string;
  subtitle: string;
  /** Envelope start — first contact. */
  start: string;
  /** Envelope end — final release. */
  end: string;
  /** Exactitude, where the source provides it. */
  peak?: string;
  /** In-effect stretches. One entry means no retrograde. */
  segments: Segment[];
  significance?: string;
  href?: string;
  /** Planet identity colour (hex). Falls back to patina when absent. */
  color?: string;
  /**
   * Which system the band belongs to, for charts that carry more than one.
   *
   * Set only on the Overview, where the whole point is that three vocabularies
   * are sharing an axis and a reader needs to know which one a row is speaking.
   * The single-system charts leave it undefined and get no banners.
   */
  group?: string;
}

export function statusOfBand(band: Band, now: Date): BandStatus {
  const t = now.getTime();
  if (t < Date.parse(band.start)) return "upcoming";
  if (t > Date.parse(band.end)) return "completed";
  return "active";
}

/** True when the planet has stationed and re-entered at least once. */
export function hasRetrograde(band: Band): boolean {
  return band.segments.length > 1;
}
