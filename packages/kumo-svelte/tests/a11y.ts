import axe from 'axe-core';
import { expect } from 'vitest';

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
export async function expectNoA11yViolations(
  container: HTMLElement,
  disabledRules: string[] = [],
): Promise<void> {
  const rules: Record<string, { enabled: boolean }> = {
    'color-contrast': { enabled: false },
    'svg-img-alt': { enabled: false },
  };
  for (const id of disabledRules) rules[id] = { enabled: false };

  const results = await axe.run(container, { rules });

  if (results.violations.length > 0) {
    const summary = results.violations
      .map((v) => `  - [${v.id}] ${v.help} (${v.nodes.length} node(s))`)
      .join('\n');
    throw new Error(`axe found ${results.violations.length} a11y violation(s):\n${summary}`);
  }

  expect(results.violations).toHaveLength(0);
}
