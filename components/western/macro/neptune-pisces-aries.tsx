// components/western/macro/neptune-pisces-aries.tsx
"use client";

const PISCES_COLOR = "#7899d4"; // water / Pisces blue
const ARIES_COLOR = "#e07a50"; // fire / Aries orange

// ── Data ─────────────────────────────────────────────────────────────────────

const PISCES_SATURATION = [
  "Successful formats are copied",
  "Algorithms reinforce what already works",
  "Creators converge on the same aesthetics",
  "Genres increasingly blur into each other",
  "Global platforms distribute the same culture everywhere",
  "AI trains on accumulated culture — and produces more of it",
];

const SATURATION_EFFECTS = [
  "Shared moods become indistinguishable",
  "Aesthetics converge toward the mean",
  "Trends cycle faster and last shorter",
  "Convergence becomes sameness",
];

const SHIFT = [
  {
    pisces: "Convergence",
    piscesLabel: "produces sameness",
    aries: "Origination",
    ariesLabel: "becomes scarce",
  },
];

const IDEAL_CONTRAST = {
  pisces: {
    mantra: '"Converge on the shared field."',
    focus: "Convergence",
    domain: "Unity",
    summary: "Belonging to a shared culture of moods, aesthetics, and experiences.",
    mechanism: "Shared field",
    question: "How do I become part of what everyone is experiencing?",
    color: PISCES_COLOR,
    glyph: "♓",
    note: "Culture flows toward shared moods, aesthetics, formats, sounds, and trends. One creator originates; millions consume; thousands reproduce; algorithms amplify; platforms distribute; brands adopt. Everyone occupies the same cultural field.",
  },
  aries: {
    mantra: '"Begin what doesn\'t exist yet."',
    focus: "Origination",
    domain: "Initiation",
    summary: "Beginning a new direction, rather than joining an established one.",
    mechanism: "Initiative",
    question: "What can I begin?",
    color: ARIES_COLOR,
    glyph: "♈",
    note: "The Pioneer breaks away from what has converged. Cultural value shifts from occupying the shared field to initiating a direction the field hasn't yet discovered.",
  },
};

const AI_NOTES = [
  {
    heading: "The final convergence engine",
    body: "Generative AI trains on the accumulated culture of the Pisces era — every image, track, video, and aesthetic that converged — and produces more of it, faster. It completes the Piscean ideal: creation becomes universally accessible.",
  },
  {
    heading: "Scarcity migrates",
    body: "When AI can reproduce any style, format, or aesthetic on demand, the shared field becomes infinite. Convergence reaches its endpoint. What becomes scarce is the thing AI cannot supply: the decision to originate something the field doesn't already contain.",
  },
  {
    heading: "The Pioneer advantage",
    body: "The Neptune-in-Aries artist gains cultural value not by occupying the shared field more effectively, but by breaking away from it — initiating a direction that has no existing template to converge toward.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function NeptunePiscesAries() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {(["pisces", "aries"] as const).map((key) => {
          const era = IDEAL_CONTRAST[key];
          return (
            <div
              key={key}
              className="border-l-[3px] bg-surface-alt px-6 py-5"
              style={{ borderColor: era.color }}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="glyph text-[1.25rem] leading-none" style={{ color: era.color }} aria-hidden="true">
                  {era.glyph}
                </span>
                <h3 className="inscription text-[1.0625rem] text-bone">
                  {key === "pisces" ? "Pisces" : "Aries"}
                </h3>
                <span className="datum text-[0.625rem] text-bone-faint">
                  {key === "pisces" ? "2012–26" : "2026–39"}
                </span>
              </div>
              <p className="datum mt-4 text-[0.625rem] uppercase tracking-[0.14em]" style={{ color: era.color }}>
                The dream of {era.domain}
              </p>
              <p className="inscription mt-1 text-[1.375rem] leading-snug text-bone">
                {era.focus}
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-bone-soft">
                {era.summary}
              </p>
            </div>
          );
        })}
      </div>

      <p className="max-w-3xl text-[1rem] leading-relaxed text-bone-soft">
        The proposed shift is from sharing a cultural world to starting something
        new. As familiar formats become easier to reproduce, the ideal moves
        toward people who initiate a direction others can follow.
      </p>

      <details className="group border-y border-rule">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-bone-soft transition-colors hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-patina [&::-webkit-details-marker]:hidden">
          <span className="datum text-[0.6875rem] uppercase tracking-[0.14em]">
            Explore the transition
          </span>
          <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-45">+</span>
        </summary>
        <div className="space-y-12 border-t border-rule-faint py-8">
          {/* ── 1. The Two Ideals ────────────────────────────────────────────── */}
          <section>
            <div className="grid gap-4 md:grid-cols-2">
              {(["pisces", "aries"] as const).map((key) => {
                const era = IDEAL_CONTRAST[key];
                return (
                  <div
                    key={key}
                    className="space-y-5 border-l-[3px] bg-surface-alt px-6 py-6"
                    style={{ borderColor: era.color }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className="glyph text-[1.75rem] leading-none"
                        style={{ color: era.color }}
                      >
                        {era.glyph}
                      </span>
                      <span
                        className="inscription text-[1.25rem] tracking-[0.02em]"
                        style={{ color: era.color }}
                      >
                        Neptune in {key === "pisces" ? "Pisces" : "Aries"}
                      </span>
                      <span className="datum text-[0.625rem] uppercase tracking-[0.2em] text-bone-faint">
                        {key === "pisces" ? "2012–26" : "2026–39"}
                      </span>
                    </div>

                    <p
                      className="inscription text-[1.375rem] leading-tight"
                      style={{ color: era.color }}
                    >
                      {era.mantra}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="eyebrow mb-1 text-[0.5625rem]">Ideal</p>
                        <p className="text-[1rem] leading-snug text-bone">
                          {era.focus}
                        </p>
                      </div>
                      <div>
                        <p className="eyebrow mb-1 text-[0.5625rem]">Through</p>
                        <p className="text-[1rem] leading-snug text-bone">
                          {era.mechanism}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="eyebrow mb-1.5 text-[0.5625rem]">Central question</p>
                      <p className="text-[1rem] italic leading-snug text-bone-soft">
                        {era.question}
                      </p>
                    </div>

                    <p className="text-[0.9375rem] leading-relaxed text-bone-faint">
                      {era.note}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── 2. Pisces Saturation → Aries Emergence ──────────────────────── */}
          <section>
            <div className="mb-8">
              <p className="eyebrow mb-2 text-[0.6875rem]">The Transition</p>
              <h2 className="inscription text-[1.375rem] leading-tight text-bone">
                Convergence produces sameness. Aries answers sameness with origination.
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-bone-soft">
                Neptune idealizes Unity. The cultural mechanism that produces is
                Convergence — shared moods, aesthetics, formats, trends. When
                Convergence saturates, it collapses into sameness, and the Aries
                inversion becomes compelling.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[1fr_2px_1fr_2px_1fr]">

              {/* Pisces column */}
              <div>
                <div
                  className="mb-4 flex items-center gap-2.5 border-b pb-3"
                  style={{ borderColor: PISCES_COLOR }}
                >
                  <span
                    className="glyph text-[1.125rem] leading-none"
                    style={{ color: PISCES_COLOR }}
                  >
                    ♓
                  </span>
                  <span
                    className="datum text-[0.6875rem] uppercase tracking-[0.2em]"
                    style={{ color: PISCES_COLOR }}
                  >
                    Pisces · Convergence
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {PISCES_SATURATION.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[0.9375rem] leading-snug text-bone-soft"
                    >
                      <span
                        className="mt-[0.6em] h-[3px] w-[3px] shrink-0 rounded-full"
                        style={{ backgroundColor: PISCES_COLOR }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="hidden bg-rule-faint md:block" />

              {/* Saturation column */}
              <div>
                <div className="mb-4 flex items-center gap-2.5 border-b border-rule pb-3">
                  <span className="datum text-[0.6875rem] uppercase tracking-[0.2em] text-bone-faint">
                    Convergence → Sameness
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {SATURATION_EFFECTS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[0.9375rem] leading-snug text-bone-faint"
                    >
                      <span className="mt-[0.6em] h-[3px] w-[3px] shrink-0 rounded-full bg-bone-faint" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-2.5">
                  {SHIFT.map(({ pisces, piscesLabel, aries, ariesLabel }) => (
                    <div key={pisces} className="space-y-1.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[0.9375rem] text-bone-soft line-through decoration-rule">
                          {pisces}
                        </span>
                        <span className="datum text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint">
                          {piscesLabel}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-[0.9375rem]"
                          style={{ color: ARIES_COLOR }}
                        >
                          {aries}
                        </span>
                        <span
                          className="datum text-[0.625rem] uppercase tracking-[0.16em]"
                          style={{ color: ARIES_COLOR }}
                        >
                          {ariesLabel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden bg-rule-faint md:block" />

              {/* Aries column */}
              <div>
                <div
                  className="mb-4 flex items-center gap-2.5 border-b pb-3"
                  style={{ borderColor: ARIES_COLOR }}
                >
                  <span
                    className="glyph text-[1.125rem] leading-none"
                    style={{ color: ARIES_COLOR }}
                  >
                    ♈
                  </span>
                  <span
                    className="datum text-[0.6875rem] uppercase tracking-[0.2em]"
                    style={{ color: ARIES_COLOR }}
                  >
                    Aries · The Pioneer
                  </span>
                </div>
                <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-soft">
                  When everything converges toward the same sounds, aesthetics, and
                  formats, occupying the shared field stops conferring distinction.
                  The scarce thing is no longer convergence — it&apos;s breaking away
                  from it.
                </p>
                <div
                  className="border-l-[3px] py-1 pl-4"
                  style={{ borderColor: ARIES_COLOR }}
                >
                  <p
                    className="inscription text-[1.125rem] leading-snug"
                    style={{ color: ARIES_COLOR }}
                  >
                    The Pioneer
                  </p>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-bone-faint">
                    Cultural value shifts to origination. &ldquo;What can I
                    begin?&rdquo; replaces &ldquo;How do I join what everyone is
                    already experiencing?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 3. AI & the Acceleration ────────────────────────────────────── */}
          <section>
            <div className="mb-8">
              <p className="eyebrow mb-2 text-[0.6875rem]">Why now</p>
              <h2 className="inscription text-[1.375rem] leading-tight text-bone">
                AI completes the Pisces ideal — and triggers the Aries response
              </h2>
              <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-bone-soft">
                Generative AI is the final convergence engine. It trains on the
                entire accumulated culture of the Pisces era and produces infinite
                variations. Creation becomes universally accessible — the Piscean
                ideal fulfilled. And that fulfillment is what makes origination scarce.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {AI_NOTES.map(({ heading, body }) => (
                <div
                  key={heading}
                  className="border border-rule bg-surface-alt px-5 py-5"
                >
                  <p className="eyebrow mb-3 text-[0.5625rem]">{heading}</p>
                  <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
                    {body}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-8 border-l-[3px] py-2 pl-6"
              style={{ borderColor: ARIES_COLOR }}
            >
              <p className="text-[1.125rem] leading-relaxed text-bone">
                Pisces idealizes what we share. Aries idealizes what hasn&apos;t existed before.
              </p>
            </div>
          </section>

          {/* ── 4. Pisces & Aries Compared ──────────────────────────────────── */}
          <section>
            <div className="mb-6">
              <p className="eyebrow mb-2 text-[0.6875rem]">Neptune in Pisces & Aries · Compared</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-[0.9375rem]">
                <thead>
                  <tr className="border-b border-rule">
                    <th className="datum w-1/3 py-3 pr-4 text-left text-[0.5625rem] uppercase tracking-[0.2em] text-bone-faint" />
                    <th
                      className="datum w-1/3 py-3 pr-4 text-left text-[0.5625rem] uppercase tracking-[0.2em]"
                      style={{ color: PISCES_COLOR }}
                    >
                      ♓ Pisces
                    </th>
                    <th
                      className="datum w-1/3 py-3 text-left text-[0.5625rem] uppercase tracking-[0.2em]"
                      style={{ color: ARIES_COLOR }}
                    >
                      ♈ Aries
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Domain",
                      pisces: "Unity",
                      aries: "Initiation",
                    },
                    {
                      label: "Mechanism",
                      pisces: "Convergence",
                      aries: "Pioneering",
                    },
                    {
                      label: "Ideal",
                      pisces: "Shared field · collective experience",
                      aries: "Origination · individual initiative",
                    },
                    {
                      label: "Archetype",
                      pisces: "The Influencer",
                      aries: "The Pioneer",
                    },
                    {
                      label: "Role of the archetype",
                      pisces: "A node around which culture converges",
                      aries: "A point from which new directions diverge",
                    },
                    {
                      label: "What it romanticizes",
                      pisces: "Merging with the shared cultural field",
                      aries: "Starting · originating · founding",
                    },
                    {
                      label: "Value source",
                      pisces: "Reach within the shared field",
                      aries: "Initiative beyond the shared field",
                    },
                    {
                      label: "Saturation signal",
                      pisces: "Everything sounds, looks, feels the same",
                      aries: "Sameness makes originality scarce",
                    },
                    {
                      label: "Central question",
                      pisces: "How do I become part of what everyone is experiencing?",
                      aries: "What can I begin?",
                    },
                  ].map(({ label, pisces, aries }, i) => (
                    <tr
                      key={label}
                      className={`border-b border-rule-faint ${i % 2 === 0 ? "" : "bg-surface-alt/40"}`}
                    >
                      <td className="datum py-3 pr-4 text-[0.625rem] uppercase tracking-[0.16em] text-bone-faint align-top">
                        {label}
                      </td>
                      <td className="py-3 pr-4 leading-snug text-bone-soft align-top">
                        {pisces}
                      </td>
                      <td className="py-3 leading-snug text-bone-soft align-top">
                        {aries}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </details>
    </div>
  );
}
