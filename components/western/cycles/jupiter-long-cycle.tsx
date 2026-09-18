// components/western/cycles/jupiter-long-cycle.tsx
"use client";

import LongCycle from "@/components/western/cycles/long-cycle";
import { JUPITER_LONG_CYCLE } from "@/lib/cycles/long-cycles";

/** Jupiter's twelve-year growth cycle. The strip itself is `long-cycle.tsx`. */
export default function JupiterLongCycle() {
  return <LongCycle spec={JUPITER_LONG_CYCLE} />;
}
