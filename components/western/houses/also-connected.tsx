import { keyword } from "@/lib/astrology/circuit-interpretations";

/**
 * The houses whose ruler chains end in a circuit or a self-ruled house, by
 * name. Which path each one takes stays with the chat.
 */
export function AlsoConnected({ houses }: { houses: number[] }) {
  if (houses.length === 0) return null;
  return (
    <p className="text-[0.8125rem] text-bone-faint">
      Also connected:{" "}
      <span className="text-bone-soft">
        {houses.map((h) => `${keyword(h)} (${h})`).join(" · ")}
      </span>
    </p>
  );
}
