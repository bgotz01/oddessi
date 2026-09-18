// components/western/cycles/saturn-long-cycle.tsx
"use client";

import LongCycle from "@/components/western/cycles/long-cycle";
import { SATURN_LONG_CYCLE } from "@/lib/cycles/long-cycles";

/** Saturn's thirty-year maturation cycle. The strip itself is `long-cycle.tsx`. */
export default function SaturnLongCycle() {
  return <LongCycle spec={SATURN_LONG_CYCLE} />;
}
