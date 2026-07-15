/**
 * Shared types for the visual-regression (VRT) gallery.
 *
 * A "gallery" renders a component in a set of static base scenarios. Each base
 * scenario is wrapped in a `[data-vr-scenario="<id>"]` element so the Playwright
 * runner can locate and screenshot it deterministically.
 *
 * Pseudo-state and overlay scenarios (hover/focus/active/open) are derived at
 * capture time by the runner via real interactions; see
 * `ci/visual-regression/state-matrix.ts`.
 */

export type VrtMode = 'light' | 'dark';

/** A single static render case shown in a component gallery. */
export interface VrtScenario {
  /** Stable id, used in screenshot filenames. Keep kebab-case. */
  id: string;
  /** Short human label rendered above the case in the gallery. */
  label?: string;
}
