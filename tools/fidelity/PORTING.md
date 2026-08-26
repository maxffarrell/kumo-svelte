# Component fidelity porting contract

This is the contract for elevating one Svelte component to pixel-fidelity with
upstream Cloudflare Kumo. The `button` component is the canonical reference.

## Source of truth

- Upstream React Kumo (v2.5.2): `../kumo-upstream-ref/packages/kumo/src/components/<comp>/<comp>.tsx`
- Theme tokens are already faithful (`src/lib/styles.css`). Do not edit theme CSS.
- Svelte port lives in `packages/kumo-svelte/src/lib/components/<comp>/`.

## Rules

1. Copy Kumo's Tailwind class strings and `KUMO_*_VARIANTS` objects VERBATIM
   (byte-for-byte, including every `hover:`, `not-disabled:hover:`,
   `disabled:`, `data-[state=...]`, `/opacity`, and `!important` token).
   Class ORDER does not matter; presence does.
2. Restore any dropped interacted-state classes (hover/focus/open/expanded).
3. Bridge Bits UI parts where the DOM differs from Base UI, but keep the exact
   Kumo classes on the matching parts. Replicate `data-[state]` animations.
4. Never rename Kumo tokens (e.g. keep `kumo-line`, not `kumo-hairline`).
5. Keep the framework-agnostic helpers (`cn`, variant objects) identical.

## The fidelity gate (must pass)

```
pnpm fidelity --component <comp>
```

Must report `MISSING in svelte (0)` for the component (hard requirement).
"extra in svelte" entries are usually false positives (import names, kumo-*
helper classes, bits-ui attribute values) — review them but they don't block.

## VRT gallery (required)

Create `src/lib/vrt/galleries/<comp>.svelte`. Use the `Scenario` wrapper:

```svelte
<script lang="ts">
  import { Thing } from '$lib/components/<comp>';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<!-- static states -->
<Scenario id="default" label="default"><Thing /></Scenario>
<Scenario id="variant-x" label="x"><Thing variant="x" /></Scenario>

<!-- pseudo-state: the runner applies the interaction before capturing -->
<Scenario id="hover" label="hover" interact={[{ type: 'hover' }]}><Thing /></Scenario>
<Scenario id="focus" label="focus" interact={[{ type: 'focus' }]}><Thing /></Scenario>

<!-- OPEN overlay (dialog/popover/select/dropdown/menubar/combobox/tooltip/
     command-palette/date-picker): click the trigger, capture the full page
     because Bits UI portals the content to <body>. -->
<Scenario id="open" label="open" interact={[{ type: 'click' }]} capture="page">
  <Thing>...</Thing>
</Scenario>
```

Cover: every variant, size, shape; disabled/loading; checked/unchecked or
on/off; and the open/expanded state for overlays (this is REQUIRED — the user
specifically wants interacted/opened states captured).

`interact` actions: `{ type: 'hover' | 'focus' | 'click' | 'press', key?, selector? }`.
Default target is the first interactive element inside the scenario; override
with `selector`. Use `capture="page"` for portaled overlays.

## Tests (required)

Add/extend `src/lib/components/<comp>/<comp>.test.ts` mirroring
`button.test.ts`:
- logic: variant/size/state classes present (assert key Kumo classes, and
  assert any previously-drifted token is gone, e.g. `not.toContain('kumo-hairline')`).
- interaction: open/close, keyboard nav, selection, focus, disabled — via
  `@testing-library/svelte` + `@testing-library/user-event`.
- a11y: `expectNoA11yViolations(container)` from `tests/a11y.ts` for the key
  states (closed and, where practical, open).

## Verify (do ONLY this — do NOT run vite dev, `pnpm check`, or `pnpm vrt`)

Those touch the shared `.svelte-kit` dir / dev-server ports and will collide
with other agents working in parallel. The orchestrator runs check + tests +
VRT baseline generation centrally afterward.

```
pnpm fidelity --component <comp>     # must be 0 missing
```

Report: the files you changed, the final fidelity result, and any intentional
Bits-UI deviations (note them for PARITY docs).
