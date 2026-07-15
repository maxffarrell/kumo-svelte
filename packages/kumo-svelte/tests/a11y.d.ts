/**
 * Runs axe-core against a container and asserts no violations.
 *
 * Disabled by default:
 * - `color-contrast`: happy-dom cannot compute layout/colors; contrast is
 *   validated visually in the VRT layer instead.
 * - `svg-img-alt`: Phosphor icons render `<svg role="img">`; in Kumo they are
 *   decorative accompaniments to text labels, so per-icon alt text would be
 *   noise. Icon-only controls still get accessible names from `aria-label`.
 *
 * Pass extra rule ids to disable per call (e.g. structural rules that are
 * faithful to upstream Kumo's DOM).
 */
export declare function expectNoA11yViolations(container: HTMLElement, disabledRules?: string[]): Promise<void>;
