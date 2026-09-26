import { SectionHeading } from "@/components/primitives";
import { MARKETS_DECADES, halfLabel } from "@/lib/industry/markets-timeline-data";

const columns = MARKETS_DECADES.flatMap((decade) => decade.halves.map((half) => ({ half, color: decade.color })));
const rowLabel = "sticky left-0 z-10 w-[110px] border-r border-rule bg-void px-3 py-4 align-middle datum text-[0.625rem] font-normal uppercase tracking-[0.08em] text-bone-faint";
const cell = "border-l border-t border-rule-faint px-3 py-4 align-top";

export default function MarketsThemeTable() {
  return (
    <section>
      <SectionHeading aside={`${columns.length} half-decades`}><span>The themes</span><span className="mx-1 h-px w-8 self-center bg-patina-dim" /><span className="text-patina">At a glance</span></SectionHeading>
      <p className="mb-5 text-bone-soft">What led, what lagged, and the event that defined each stretch.</p>
      <div role="region" aria-label="Investment themes by half-decade" tabIndex={0} className="overflow-x-auto border-y border-rule">
        <table className="w-full min-w-[1600px] table-fixed border-separate border-spacing-0 text-center">
          <caption className="sr-only">Investment themes by half-decade, 1970 to 2030: theme, leaders, laggards, and defining event.</caption>
          <thead>
            <tr>
              <th scope="col" rowSpan={2} className={rowLabel}>Markets</th>
              {MARKETS_DECADES.map((decade) => (
                <th scope="colgroup" colSpan={2} key={decade.decade} className="border-l border-t-[3px] border-l-rule-faint px-3 pt-4 pb-2 font-normal" style={{ borderTopColor: decade.color, backgroundColor: `${decade.color}12` }}>
                  <span className="inscription text-base" style={{ color: decade.color }}>{decade.decade}s</span>
                  <span className="mt-1 block text-base leading-snug text-bone-soft">{decade.title}</span>
                </th>
              ))}
            </tr>
            <tr>
              {columns.map(({ half, color }) => (
                <th scope="col" key={half.start} className="border-l border-t border-rule-faint px-3 py-3 font-normal" style={{ backgroundColor: `${color}0c` }}>
                  <span className="datum block text-[0.625rem] text-bone-faint">{halfLabel(half)}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-snug" style={{ color }}>{half.short}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className={rowLabel}>Theme</th>
              {columns.map(({ half, color }) => <td key={half.start} className={`${cell} text-[0.9375rem] leading-snug text-bone-soft`} style={{ backgroundColor: `${color}09` }}>{half.theme}</td>)}
            </tr>
            <tr>
              <th scope="row" className={rowLabel}>Led</th>
              {columns.map(({ half, color }) => (
                <td key={half.start} className={cell} style={{ backgroundColor: `${color}09` }}>
                  <ul className="space-y-2 text-[0.9375rem] leading-snug text-bone">{half.leaders.map((item) => <li key={item}>{item}</li>)}</ul>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className={rowLabel}>Lagged</th>
              {columns.map(({ half, color }) => (
                <td key={half.start} className={cell} style={{ backgroundColor: `${color}09` }}>
                  <ul className="space-y-2 text-[0.9375rem] leading-snug text-bone-faint">{half.lagged.map((item) => <li key={item}>{item}</li>)}</ul>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className={rowLabel}>Defining event</th>
              {columns.map(({ half, color }) => <td key={half.start} className={`${cell} text-[0.9375rem] leading-snug`} style={{ color, backgroundColor: `${color}09` }}>{half.event}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
