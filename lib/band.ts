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
  /**
   * What the band IS, carried structurally rather than spelled into `subtitle`.
   *
   * `subtitle` is display text — "House 9", "□ Square Saturn" — and reading a
   * band's identity back out of it means parsing a string that exists to be
   * looked at. Fine for the explorer's kind filter, which only has to tell
   * three shapes apart; not fine for anything that has to ask "is this a
   * transit through house 9 specifically", because the answer then depends on
   * how the label happens to be punctuated.
   *
   * Optional because the fields are populated only where the source row has
   * them: a return has no house and no natal target, a house transit has no
   * aspect. Absent means the question does not apply to this kind of band.
   */
  kind?: "house-transit" | "aspect-cycle" | "planetary-return";
  houseNumber?: number;
  natalPlanet?: string;
  aspectType?: string;
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
