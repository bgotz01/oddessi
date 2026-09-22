"use client";

import { MUSIC_TECHNOLOGIES, type MusicTechnology } from "@/lib/industry/music-technologies-data";
import { POP_ERAS } from "@/lib/industry/pop-timeline-data";

// Carry the 1950s–60s effects entry into the first displayed decade; retain
// its original era in the tooltip rather than implying a 1960 invention.
const decades = POP_ERAS.map(({ decade }) => ({
  decade,
  technologies: MUSIC_TECHNOLOGIES.filter((technology) =>
    technology.startYear >= (decade === 1960 ? 1955 : decade) && technology.startYear < decade + 10,
  ),
}));

export default function MusicTechnologyRow({ active, pinned, onPreview, onLeave, onSelect }: {
  active: MusicTechnology | null;
  pinned: MusicTechnology | null;
  onPreview: (technology: MusicTechnology, target: HTMLElement) => void;
  onLeave: () => void;
  onSelect: (technology: MusicTechnology, target: HTMLElement) => void;
}) {
  return (
    <div>
      <div className="flex items-center">
        <span className="datum w-[88px] shrink-0 text-[0.625rem] uppercase leading-relaxed tracking-[0.1em] text-bone-faint">Tech<br />influences</span>
        <div className="grid flex-1 grid-cols-7 border-y border-rule-faint">
          {decades.map(({ decade, technologies }) => (
            <div key={decade} className="border-l border-rule-faint bg-surface/50 px-2 py-2">
              {technologies.map((technology) => (
                <button key={technology.name} type="button"
                  aria-label={`${technology.name}, ${technology.era}. Show technology influence.`}
                  aria-pressed={pinned?.name === technology.name}
                  aria-describedby={active?.name === technology.name ? "pop-timeline-tooltip" : undefined}
                  onMouseEnter={(event) => onPreview(technology, event.currentTarget)}
                  onFocus={(event) => onPreview(technology, event.currentTarget)}
                  onBlur={onLeave}
                  onClick={(event) => onSelect(technology, event.currentTarget)}
                  className={`block w-full cursor-pointer border-l-2 px-1.5 py-1 text-left text-[0.875rem] leading-snug transition-colors ${technology.emerging ? "border-dashed" : ""} ${active?.name === technology.name ? "border-patina bg-patina-deep/30 text-patina" : "border-transparent text-bone-soft hover:text-patina"}`}>
                  {technology.shortLabel ?? technology.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="datum ml-[88px] mt-1 text-[0.5625rem] text-bone-faint">Approximate emergence, grouped by decade · influences continue beyond their introduction</p>
    </div>
  );
}
