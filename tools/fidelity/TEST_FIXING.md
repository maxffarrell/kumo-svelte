# Test-suite repair recipe

Goal: make `pnpm exec vitest run src/lib/components/<comp>` pass for assigned
components, keeping tests meaningful. The environment is happy-dom.

## Known patterns and how to fix them

### 1. Bits UI overlays do NOT mount in happy-dom
Components: popover, tooltip, select, dropdown-menu, menu-bar, combobox,
autocomplete, command-palette, dialog, date-range-picker.

happy-dom cannot render Bits' portaled/floating content (no real layout / Web
Animations). So in UNIT tests:
- DO test: trigger renders with correct data attributes/classes; closed-state
  DOM; variant/size classes via the exported `*Variants` helpers or by rendering
  the trigger; clicking the trigger flips the trigger's `aria-expanded` /
  `data-state` (Bits updates these synchronously) OR fires the `onOpenChange`
  callback; keyboard focus lands on the trigger.
- DO NOT assert on portaled content: `findByRole('dialog'|'tooltip'|'listbox'|
  'menu')`, content CSS classes, focus-trap, Escape-close of content. These are
  covered visually by the VRT Playwright galleries (open scenarios with
  `capture="page"`). Remove/convert these assertions — do NOT leave them failing
  and do NOT blanket `it.skip` whole behaviors; convert to trigger/state/callback
  assertions where possible.
- Note in a comment that open-state behavior is covered by VRT.

If the trigger's `data-kumo-component` is `Button` (because the trigger renders a
Kumo Button), assert that instead of the overlay name, or assert `data-kumo-part`.

### 2. a11y (axe) — use the shared helper
`import { expectNoA11yViolations } from '<rel>/tests/a11y'` already disables
`color-contrast` and `svg-img-alt` (decorative Phosphor icons). For violations
that are faithful to upstream Kumo's DOM, disable that rule per-call WITH a
comment, e.g.:
- sensitive-input: `expectNoA11yViolations(container, ['nested-interactive'])`
  (clickable masked container wraps a toggle button — upstream structure).
- meter: `aria-meter-name` — prefer adding an accessible name; if the component
  has no label API, `expectNoA11yViolations(container, ['aria-meter-name'])`.

### 3. clipboard mocking
`navigator.clipboard` is getter-only in happy-dom. Replace any
`navigator.clipboard = ...` with:
`import { mockClipboard } from '<rel>/tests/clipboard'; const writeText = mockClipboard();`
then assert `expect(writeText).toHaveBeenCalledWith('...')`.

### 4. text snippets
`children: () => 'text'` is NOT a valid Snippet. Use
`import { textSnippet } from '<rel>/tests/snippet'` → `children: textSnippet('text')`.

### 5. testing-library option collisions
`render(Component, { target: '_blank' })` — `target` is a testing-library RENDER
option (mount node). Pass component props via the explicit form:
`render(Component, { props: { target: '_blank', ... } })`.

### 6. selector/structure bugs
Read the actual component to find which element carries a class. E.g. a banner's
`bg-kumo-banner-*` lives on an inner element, not the root. Trim `textContent`
before equality.

## Rules
- Edit ONLY the assigned `*.test.ts` files. If a genuine component a11y fix is
  needed (e.g. add `aria-label`), keep Tailwind classes identical so
  `pnpm fidelity --component <comp>` stays 0 missing.
- Verify ONLY with `pnpm exec vitest run src/lib/components/<comp>` (scoped).
  Do NOT run `pnpm check`, `pnpm vrt`, `vite dev`, or the full `pnpm test`.
- The `<rel>` import depth from a component test is `../../../../tests/...`.
