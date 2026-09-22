/**
 * lib/synastry — two charts read against each other.
 *
 * The whole reading is one pure function of two charts. Nothing here fetches,
 * caches or writes: the charts are already in the layout's `ChartProvider`, and
 * cross-chart aspects are cheap enough to compute in a `useMemo` on every
 * render rather than adding an API route and a loading state for arithmetic.
 *
 * The order below is the argument of the page, and it only runs one way:
 *
 *   contacts    where the two charts touch          contacts.ts
 *   activation  which region of each the other hits activation.ts
 *   areas       seven readings of those contacts    dimensions.ts
 *   tension     the hard ones, cut by function      tension.ts
 *   signature   all of it, once, as a single cell   signature.ts
 *
 * A LENS (`lenses.ts`) sits across the middle of that: it decides which areas
 * are read and how the council is told to frame the whole thing. It does not
 * touch the contacts, the baselines or the signature's two numbers — see the
 * note at the top of `lenses.ts` for why that separation has to hold.
 *
 * `areas` takes `activation` because houses feed chemistry; `signature` takes
 * everything because it summarises. Nothing reads backwards, so there is no
 * cycle and each stage can be tested against fixed contacts.
 *
 * WHAT THIS MEASURES, WHICH IS LESS THAN IT LOOKS LIKE
 * Contact between two birth charts. Not compatibility, not the quality of a
 * relationship, not its future, and not whether two people should be together.
 * Nothing in these files has access to how either person was raised, what they
 * want, how they behave, or whether they are kind to each other, and those
 * decide the question this page will be asked to answer. Every `ask` in the
 * module says so, because the surface is asked that question anyway.
 */

import type { Chart } from "@/lib/charts";
import { crossContacts, counted, excluded, readable, type Contact } from "./contacts";
import { activation, type Activation } from "./activation";
import {
  contactsFor,
  dimensions,
  type Dimension,
  type DimensionId,
} from "./dimensions";
import { tensionMap, type TensionMap } from "./tension";
import { lensScores, signature, type LensScore, type Signature } from "./signature";
import { DEFAULT_LENS, LENSES, type Lens, type LensId } from "./lenses";

export interface Synastry {
  a: Chart;
  b: Chart;
  /** Which question was asked of these contacts. Never changes the contacts. */
  lens: Lens;
  /** Every contact found, including the ones held out of the scoring. */
  contacts: Contact[];
  /** The ones that scored. */
  counted: Contact[];
  /** The ones excluded, with their reason, for the section that shows its working. */
  excluded: Contact[];
  activation: Activation;
  areas: Dimension[];
  tension: TensionMap;
  signature: Signature;
  /**
   * All four lenses scored over their own contacts, for comparing them.
   *
   * Computed whatever the selected lens, because the question "which of these
   * do these two charts best supply" cannot be answered from one of them.
   */
  lensScores: LensScore[];
}

/** Both charts carry enough to be read against each other at all. */
export function comparable(a: Chart, b: Chart): boolean {
  return a.id !== b.id && readable(a) && readable(b);
}

export function synastry(
  a: Chart,
  b: Chart,
  lens: LensId = DEFAULT_LENS,
): Synastry {
  const contacts = crossContacts(a, b);
  const fields = activation(a, b);
  const areas = dimensions(contacts, fields, a.name, b.name, LENSES[lens].areas);
  const tension = tensionMap(contacts, a.name, b.name);

  // The headline reads exactly the contacts the shown areas are built from, so
  // it can never summarise evidence the page is not displaying.
  const forAreas = (areaIds: readonly DimensionId[]) =>
    contactsFor(contacts, areaIds);
  const mine = forAreas(LENSES[lens].areas);

  return {
    a,
    b,
    lens: LENSES[lens],
    contacts,
    counted: counted(contacts),
    excluded: excluded(contacts),
    activation: fields,
    areas,
    tension,
    signature: signature(mine, areas, tension, fields, a, b, LENSES[lens]),
    lensScores: lensScores(forAreas),
  };
}

export {
  BODY_CLASS,
  BODY_WEIGHT,
  SYNASTRY_BODIES,
  housed,
  readable,
  type AspectType,
  type Contact,
  type Exclusion,
} from "./contacts";
export {
  FIELDS,
  type ActivatedField,
  type Activation,
  type Direction,
  type Field,
  type Visitor,
} from "./activation";
export {
  DIMENSION_IDS,
  EASE_BAND_GLOSS,
  EASE_BAND_LABEL,
  SIGNATURE_WORD,
  type Dimension,
  type DimensionId,
  type EaseBand,
} from "./dimensions";
export { type Strain, type StrainSide, type TensionMap } from "./tension";
export {
  CELL,
  EASE_BAND as SIGNATURE_EASE_BAND,
  HIGH_CHEMISTRY,
  type Cell,
  type LensScore,
  type Signature,
} from "./signature";
export {
  DEFAULT_LENS,
  LENSES,
  LENS_IDS,
  type Lens,
  type LensId,
} from "./lenses";
