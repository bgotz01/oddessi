// components/industry/pluto-era-drawer.tsx
"use client";

import { useEffect } from "react";
import { ELEMENT_COLOR, signGlyph, signMeta } from "@/lib/symbols";
import {
  PLUTO_DIMENSIONS,
  PLUTO_ELEMENT_FUNCTION,
  PLUTO_MUSIC_ERAS,
  plutoEraLabel,
  plutoEraState,
  type PlutoEra,
} from "@/lib/industry/pluto-music-eras-data";
import { ERA_STATUS_LABEL, eraStatus, eraYears } from "@/lib/industry/era-years";
import { useReadingYear } from "@/lib/industry/use-reading-year";

/**
 * One Pluto era, at reading length.
 *
 * Built to the same pattern as the Uranus and Neptune drawers — overlay, right
 * aside, Escape to close, neighbours in the footer — because a reader moving
 * between the three music pages should not have to learn the interaction three
 * times.
 *
 * The body is the seven dimensions and nothing else. Uranus's drawer earns its
 * five sections because a disruption has a before, an after, a toolchain and a
 * consequence; a power reading is one question answered seven ways, and
 * dressing that up as five headed sections would be five headings over one
 * table.
 */
export default function PlutoEraDrawer({
  era,
  onNavigate,
  onClose,
}: {
  era: PlutoEra;
  onNavigate: (sign: string) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const index = PLUTO_MUSIC_ERAS.findIndex((e) => e.sign === era.sign);
  const previous = index > 0 ? PLUTO_MUSIC_ERAS[index - 1] : null;
  const next = index < PLUTO_MUSIC_ERAS.length - 1 ? PLUTO_MUSIC_ERAS[index + 1] : null;

  const meta = signMeta(era.sign);
  const color = meta ? ELEMENT_COLOR[meta.element] : "var(--color-patina)";
  const elementFunction = meta ? PLUTO_ELEMENT_FUNCTION[meta.element] : null;

  const year = useReadingYear();
  const status = year === null ? null : eraStatus(era.dates, year);
  const reading = era.reading;
  const state = plutoEraState(era);
  const title = era.model ?? "To be identified";

  return (
    <>
      <div className="fixed inset-0 z-40 bg-void/50" onClick={onClose} aria-hidden="true" />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Pluto in ${era.sign} — Music`}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-rule bg-surface"
      >
        <header className="shrink-0 border-b border-rule px-7 py-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                <span
                  className="datum text-[0.6875rem] tracking-[0.2em] uppercase"
                  style={{ color }}
                >
                  Pluto in {era.sign}
                </span>
                {status && (
                  <>
                    <span className="h-3 w-px bg-rule" />
                    <span className="datum text-[0.6875rem] tracking-[0.18em] text-bone-faint uppercase">
                      {ERA_STATUS_LABEL[status]}
                    </span>
                  </>
                )}
                <span className="h-3 w-px bg-rule" />
                <span className="datum text-[0.6875rem] tracking-[0.18em] text-bone-faint uppercase">
                  {plutoEraLabel(era)}
                </span>
              </div>

              {era.verb && (
                <p
                  className="datum mb-2 text-[0.625rem] uppercase tracking-[0.18em]"
                  style={{ color }}
                >
                  {era.verb}
                </p>
              )}

              <div className="flex items-center gap-3">
                <span className="glyph text-[2rem] leading-none" style={{ color }}>
                  {signGlyph(era.sign)}
                </span>
                <h2 className="inscription text-[1.375rem] leading-tight text-bone">
                  {title}
                </h2>
              </div>



              <p className="datum mt-2.5 text-[0.75rem] text-bone-faint">
                {era.dates}
                {era.holder && <span> · {era.holder}</span>}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="datum mt-1 shrink-0 cursor-pointer text-[0.6875rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-bone"
            >
              Close
            </button>
          </div>

          <div className="mt-5 border-l-[3px] py-1 pl-4" style={{ borderColor: color }}>
            <p className="text-[1.0625rem] leading-relaxed text-bone-soft italic">
              {era.principle}
            </p>
          </div>
        </header>

        <div className="space-y-7 px-7 py-7">
          {era.distinctiveDescription && (
            <p className="text-[1.125rem] leading-relaxed text-bone-soft">
              {era.distinctiveDescription}
            </p>
          )}

          {era.shift && (
            <section>
              <p className="eyebrow mb-1 text-[0.6875rem]">The structural shift</p>
              <p className="mb-3 text-[0.9375rem] leading-relaxed text-bone-faint">
                The falsifiable part. If the &ldquo;from&rdquo; was already true
                before {era.dates.split("–")[0]}, the era did not do this.
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-[1.0625rem] leading-snug text-bone-faint">
                  {era.shift.from}
                </p>
                <p aria-hidden="true" className="text-[0.875rem] leading-none" style={{ color }}>
                  ↓
                </p>
                <p className="text-[1.125rem] leading-snug text-bone">
                  {era.shift.to}
                </p>
              </div>
            </section>
          )}

          {era.marketExpression && (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-2 text-[0.6875rem]">Market expression</p>
              <p className="text-[1.125rem] leading-snug" style={{ color }}>
                {era.marketExpression.name}
              </p>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-bone-soft">
                {era.marketExpression.detail}
              </p>
            </section>
          )}

          {era.principle && (
            <p className="datum text-[0.75rem] leading-relaxed text-bone-faint">
              Sign principle · {era.principle}
            </p>
          )}

          {(era.bottleneck || era.question) && (
            <section>
              <p className="eyebrow mb-1 text-[0.6875rem]">Where power concentrates</p>
              <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-faint">
                Three rungs, which move at different rates. The scarce function,
                the position it confers, and whoever occupied that position.
              </p>

              <dl className="border-t border-rule-faint">
                {[
                  { label: "Bottleneck", value: era.bottleneck, lead: true },
                  { label: "Leverage", value: era.holder, lead: false },
                  { label: "Institution", value: era.institution, lead: false },
                ].map(({ label, value, lead }) => (
                  <div
                    key={label}
                    className="grid grid-cols-[110px_1fr] gap-4 border-b border-rule-faint py-3"
                  >
                    <dt className="datum text-[0.6875rem] leading-relaxed uppercase tracking-[0.1em] text-bone-faint">
                      {label}
                    </dt>
                    <dd
                      className={`text-[1rem] leading-snug ${value === null ? "italic text-bone-faint" : lead ? "text-bone" : "text-bone-soft"}`}
                    >
                      {value ?? "Not yet identified"}
                    </dd>
                  </div>
                ))}
              </dl>

              {era.question && (
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-bone-soft italic">
                  {era.question}
                </p>
              )}
              <p className="datum mt-3 text-[0.6875rem] leading-relaxed text-bone-faint">
                A Pluto era moves the scarce function. The institution holding it
                need not change — across Libra and Scorpio it did not.
              </p>
            </section>
          )}

          {meta && elementFunction && (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-2 text-[0.6875rem]">Elemental pattern</p>
              <p className="text-[1.125rem] leading-snug">
                <span style={{ color }}>{meta.element}</span>
                <span className="mx-2 text-bone-faint" aria-hidden="true">→</span>
                <span className="text-bone">{elementFunction}</span>
              </p>
              <p className="datum mt-3 text-[0.6875rem] leading-relaxed text-bone-faint">
                Under test, not established. Earth builds, Air selects, Water
                concentrates, Fire scales — about one and a quarter turns of the
                cycle so far, which is not enough to call it.
              </p>
            </section>
          )}

          {era.technologies.length > 0 && (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-1 text-[0.6875rem]">What made it possible</p>
              <p className="mb-3 text-[0.9375rem] leading-relaxed text-bone-faint">
                Listed for what they did to the bottleneck, not for what they did
                to music — that story belongs to the Uranus clock.
              </p>
              <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
                {era.technologies.join(" · ")}
              </p>
            </section>
          )}

          {era.points.length > 0 && (
            <ul className="space-y-2">
              {era.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] h-[3px] w-[3px] shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[1.0625rem] leading-snug text-bone-soft">{point}</span>
                </li>
              ))}
            </ul>
          )}

          {era.artistStructure && (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-2 text-[0.6875rem]">Artist structure</p>
              <p className="text-[1.125rem] leading-snug text-bone">
                {era.artistStructure}
              </p>
            </section>
          )}

          {era.contrast && (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-1 text-[0.6875rem]">Not the same as the era before</p>
              {era.contrast.summary && (
                <p className="mb-2 text-[1.25rem] leading-snug font-semibold" style={{ color }}>
                  {era.contrast.summary}
                </p>
              )}
              {era.contrast.detail && (
                <p className="mb-4 text-[1.0625rem] leading-relaxed text-bone-soft">
                  {era.contrast.detail}
                </p>
              )}
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="w-[110px] pr-4 pb-2" />
                    <th className="pr-4 pb-2">
                      <span className="datum text-[0.5625rem] uppercase tracking-[0.12em] text-bone-faint">
                        {era.contrast.beforeLabel}
                      </span>
                    </th>
                    <th className="pb-2">
                      <span className="datum text-[0.5625rem] uppercase tracking-[0.12em]" style={{ color }}>
                        {era.contrast.afterLabel}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {era.contrast.rows.map((row, i) => (
                    <tr key={row.axis} className={i % 2 === 0 ? "bg-surface-alt/40" : ""}>
                      <td className="py-2 pr-4 align-top">
                        <span className="datum text-[0.6875rem] uppercase leading-relaxed tracking-[0.1em] text-bone-faint">
                          {row.axis}
                        </span>
                      </td>
                      <td className="py-2 pr-4 align-top">
                        <span className="text-[0.9375rem] leading-snug text-bone-soft">{row.before}</span>
                      </td>
                      <td className="py-2 align-top">
                        <span className="text-[0.9375rem] leading-snug text-bone">{row.after}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {era.earlySignal && (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-2 text-[0.6875rem]">Early signal</p>
              <p className="text-[1.125rem] leading-snug" style={{ color }}>
                {era.earlySignal.name}
                <span className="datum ml-2 text-[0.75rem] text-bone-faint">
                  {era.earlySignal.year}
                </span>
              </p>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-bone-soft">
                {era.earlySignal.note}
              </p>
            </section>
          )}

          {era.artists.some((a) => a.note) && (
            <section className="border-t border-rule-faint pt-6">
              <p className="eyebrow mb-1 text-[0.6875rem]">Reading the artists</p>
              <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-faint">
                The names are on the card. These are the ones that are evidence
                rather than illustration.
              </p>
              <ul className="space-y-2.5">
                {era.artists.filter((a) => a.note).map((artist) => (
                  <li key={artist.name}>
                    <p className="text-[1.0625rem] leading-snug text-bone">{artist.name}</p>
                    {artist.note && (
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-bone-faint">
                        {artist.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {era.challenge && (
            <section className="border-l-[3px] border-rule py-1 pl-4">
              <p className="eyebrow mb-2 text-[0.6875rem]">What it still has to prove</p>
              <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
                {era.challenge}
              </p>
            </section>
          )}

          {state === "open" ? (
            <section>
              <p className="text-[1.0625rem] leading-relaxed text-bone-soft">
                {status === "active"
                  ? `Pluto is in ${era.sign} until ${eraYears(era.dates).endYear}. What the power shift is has not been identified yet — it is the open question this clock is being built to answer.`
                  : `Pluto enters ${era.sign} in ${eraYears(era.dates).startYear}. The power shift has not been identified yet.`}
              </p>
            </section>
          ) : (
            <section>
              <p className="eyebrow mb-1 text-[0.6875rem]">Where power sits</p>
              <p className="mb-4 text-[0.9375rem] leading-relaxed text-bone-faint">
                {reading
                  ? "The shift tested against all seven dimensions."
                  : "The shift is named but not yet tested. These are the seven dimensions it has to answer."}
              </p>
              <dl className="border-t border-rule-faint">
                {PLUTO_DIMENSIONS.map(({ key, label }) => {
                  // The tension is the era's engine, not a seventh attribute of
                  // it, so it is given the era's colour rather than another row
                  // of the same grey.
                  const isTension = key === "coreTension";
                  const value = reading?.[key] ?? null;
                  return (
                    <div
                      key={key}
                      className="grid grid-cols-[130px_1fr] gap-4 border-b border-rule-faint py-3"
                    >
                      <dt className="datum text-[0.6875rem] leading-relaxed uppercase tracking-[0.1em] text-bone-faint">
                        {label}
                      </dt>
                      <dd
                        className={`text-[1rem] leading-snug ${
                          value === null
                            ? "italic text-bone-faint"
                            : isTension
                              ? "font-semibold"
                              : "text-bone-soft"
                        }`}
                        style={value !== null && isTension ? { color } : undefined}
                      >
                        {value ?? "Not yet answered"}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          )}
        </div>

        <footer className="mt-auto flex shrink-0 items-center justify-between gap-4 border-t border-rule px-7 py-5">
          {previous ? (
            <button
              type="button"
              onClick={() => onNavigate(previous.sign)}
              className="datum cursor-pointer text-[0.6875rem] tracking-[0.16em] text-bone-faint uppercase transition-colors hover:text-patina"
            >
              ← {previous.sign}
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button
              type="button"
              onClick={() => onNavigate(next.sign)}
              className="datum cursor-pointer text-[0.6875rem] tracking-[0.16em] text-bone-faint uppercase transition-colors hover:text-patina"
            >
              {next.sign} →
            </button>
          ) : (
            <span />
          )}
        </footer>

        <div className="h-[3px] w-full shrink-0" style={{ backgroundColor: color }} />
      </aside>
    </>
  );
}
