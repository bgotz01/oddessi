declare module "tz-lookup" {
  /** Resolve an IANA timezone name from coordinates. Throws if out of range. */
  export default function tzLookup(latitude: number, longitude: number): string;
}
