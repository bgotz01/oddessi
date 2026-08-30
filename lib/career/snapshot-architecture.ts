//lib/career/snapshot-architecture.ts

import {
  careerCards,
  type CareerBullet,
  type CareerCard,
  type CareerSnapshot,
} from "./snapshot";
import type { CareerFactorKind } from "./natal";
import {
  careerRoleInterpretation,
  careerSynthesisFragment,
  type CareerSynthesisFragment,
} from "./career-interpretations";
import { careerThesisInterpretation } from "./career-theses";

/** Meaningful roles used by the natal snapshot, not scoring tiers. */
export type CareerSnapshotRole = "direction" | "engine" | "earning" | "arena";

/** Reading order is part of the domain model, not a renderer decision. */
export const CAREER_SNAPSHOT_ROLES: readonly CareerSnapshotRole[] = [
  "direction",
  "engine",
  "earning",
  "arena",
];

export interface CareerSnapshotForce {
  role: CareerSnapshotRole;
  card: CareerCard;
  source: string;
  headline: string;
  interpretation: string;
  examples: string[];
  /** Concept and grammatical clause used by the thesis derivation. */
  synthesis: CareerSynthesisFragment | null;
  /** Other semantic roles answered by this same natal placement. */
  sharedWith: CareerSnapshotRole[];
}

export interface CareerSnapshotThesisPart {
  source: string;
  concept: string;
}

export interface CareerSnapshotThesis {
  direction: CareerSnapshotThesisPart;
  engine: CareerSnapshotThesisPart;
  statement: string;
}

export interface CareerSnapshotArchitecture {
  /** The central career move: Direction composed with Engine. */
  thesis: CareerSnapshotThesis | null;
  forces: CareerSnapshotForce[];
  dynamics: CareerBullet[];
  evidence: CareerCard[];
}

/**
 * Primary signal by semantic role.
 * Earlier factors outrank later ones when multiple signals are readable.
 */
const ROLE_PRIORITY: Record<CareerSnapshotRole, CareerFactorKind[]> = {
  direction: ["midheaven", "jupiter"],
  engine: ["tenthRuler", "sixthRuler", "saturn"],
  earning: ["secondRuler"],
  arena: ["sun", "tenthTenant"],
};

function factorForRole(
  snapshot: CareerSnapshot,
  role: CareerSnapshotRole,
): CareerSnapshot["factors"][number] | null {
  for (const kind of ROLE_PRIORITY[role]) {
    const factor = snapshot.factors.find(
      (candidate) => candidate.kind === kind,
    );
    if (factor) return factor;
  }

  // A missing semantic signal must stay missing. Relabelling an unrelated
  // placement would make the UI sound more certain than the chart permits.
  return null;
}

function sourceForRole(
  factor: CareerSnapshot["factors"][number],
  role: CareerSnapshotRole,
): string {
  return role === "direction" || role === "arena"
    ? factor.sign ?? factor.label
    : factor.body ?? factor.label;
}

function careerSnapshotSynthesis(
  forces: CareerSnapshotForce[],
): CareerSnapshotArchitecture["thesis"] {
  const byRole = new Map(forces.map((force) => [force.role, force]));
  const direction = byRole.get("direction");
  const engine = byRole.get("engine");

  if (!direction?.synthesis || !engine?.synthesis) return null;

  const interpretation = careerThesisInterpretation(
    direction.source,
    engine.source,
  );
  if (!interpretation) return null;

  return {
    direction: {
      source: direction.source,
      concept: direction.synthesis.concept,
    },
    engine: {
      source: engine.source,
      concept: engine.synthesis.concept,
    },
    statement: interpretation.statement,
  };
}

export function careerSnapshotArchitecture(
  snapshot: CareerSnapshot,
): CareerSnapshotArchitecture {
  const evidence = careerCards(snapshot);
  const forces: CareerSnapshotForce[] = [];

  for (const role of CAREER_SNAPSHOT_ROLES) {
    const factor = factorForRole(snapshot, role);
    if (!factor) continue;

    const card = evidence.find((candidate) =>
      candidate.kinds.includes(factor.kind),
    );
    const interpretation = careerRoleInterpretation(factor, role);
    const synthesis = careerSynthesisFragment(factor, role);
    if (!card || !interpretation) continue;

    forces.push({
      role,
      card,
      source: sourceForRole(factor, role),
      headline: interpretation.headline,
      interpretation: interpretation.body,
      examples: interpretation.examples,
      synthesis,
      sharedWith: [],
    });
  }

  for (const force of forces) {
    force.sharedWith = forces
      .filter((candidate) => candidate !== force && candidate.card === force.card)
      .map((candidate) => candidate.role);
  }

  const thesis = careerSnapshotSynthesis(forces);

  return {
    thesis,
    forces,
    dynamics: snapshot.emphasis,
    evidence,
  };
}
