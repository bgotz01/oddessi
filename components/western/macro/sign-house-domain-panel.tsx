const SIGN_HOUSE_DOMAINS = [
  { sign: "Aries", house: "1st", domain: "Self, action" },
  {
    sign: "Taurus",
    house: "2nd",
    domain: "Money, possessions, material value",
  },
  { sign: "Gemini", house: "3rd", domain: "Information, communication" },
  { sign: "Cancer", house: "4th", domain: "Home, family, roots" },
  {
    sign: "Leo",
    house: "5th",
    domain: "Creativity, performance, self-expression",
  },
  { sign: "Virgo", house: "6th", domain: "Work, systems, health" },
  { sign: "Libra", house: "7th", domain: "Relationships, contracts" },
  {
    sign: "Scorpio",
    house: "8th",
    domain: "Shared resources, debt, leverage, hidden power, death/rebirth",
  },
  {
    sign: "Sagittarius",
    house: "9th",
    domain: "Belief, education, travel, worldview",
  },
  {
    sign: "Capricorn",
    house: "10th",
    domain: "Institutions, hierarchy, authority",
  },
  {
    sign: "Aquarius",
    house: "11th",
    domain: "Networks, groups, collective organization",
  },
  {
    sign: "Pisces",
    house: "12th",
    domain: "Dissolution, hidden/collective realm",
  },
] as const;

export default function SignHouseDomainPanel() {
  return (
    <section className="border border-rule bg-surface">
      <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule px-6 py-4">
        <h2 className="inscription text-[1.0625rem] tracking-[0.12em] text-bone">
          Signs, Houses &amp; Core Domains
        </h2>
        <p className="datum text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">
          Sign · natural house · domain
        </p>
      </header>

      <div className="overflow-x-auto">
        <div className="flex min-w-max divide-x divide-rule-faint">
          {SIGN_HOUSE_DOMAINS.map((item) => (
            <article
              key={item.sign}
              className="grid w-48 shrink-0 grid-rows-[1.5rem_1.25rem_5.5rem] gap-1 px-4 py-5 text-center"
            >
              <h3 className="inscription text-[0.9375rem] text-bone">
                {item.sign}
              </h3>
              <p className="datum text-[0.6875rem] uppercase tracking-[0.14em] text-bone-faint">
                {item.house} house
              </p>
              <p className="flex items-start justify-center text-[0.9375rem] leading-relaxed text-bone-soft">
                {item.domain}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
