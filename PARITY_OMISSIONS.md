# Kumo Svelte Parity Audit

Last audited: 2026-05-30

Compared against `cloudflare/kumo` at `/private/tmp/cloudflare-kumo-current` for upstream changes on or after 2026-05-25. The local implementation baseline for this audit is commit `e9b87d8` on `codex/may-30`.

## Current Parity Status

### TimeseriesChart

Status: mostly ported, with one positioning caveat.

Ported:

- Native tooltip rendering now replaces ECharts HTML tooltip content.
- `tooltipMode`, `tooltipMaxItems`, `tooltipBoundary`, and `tooltipFollowCursor` are exposed on `TimeseriesChart`.
- Tooltip rows are derived from nearest timestamp values, sorted by value, and support single-series mode.
- Time range brush cursor cleanup is handled when the selection effect is torn down.
- Docs now include Tooltip Cursor Tracking and Tooltip Boundary examples.
- Props metadata includes the new tooltip props.

Remaining omission:

- Upstream uses Base UI positioning for `tooltipBoundary`, including actual `Element` / `Element[]` boundaries and portal-style collision behavior. The Svelte port clamps to the chart container when a boundary is provided, so element-specific boundary semantics are approximate.

### Sidebar

Status: modern API surface ported, advanced behavior still incomplete.

Ported:

- Compound exports now include `Provider`, `Header`, `Content`, `Footer`, `Group`, `GroupLabel`, `Menu`, `MenuItem`, `MenuButton`, `MenuBadge`, `MenuSub`, `MenuSubItem`, `MenuSubButton`, `Separator`, `Trigger`, `Rail`, `ResizeHandle`, `MenuChevron`, `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`, `SlidingViews`, and `SlidingView`.
- Provider supports contained layouts, peeking, animation duration, resizable widths, side, variant, and collapsible mode props.
- Root Sidebar supports collapsed/icon rail width, peeking width, variants, side, and provider state data attributes.
- Resize handle supports pointer drag and keyboard resizing.
- Docs now describe the current compound API instead of stale `Sidebar.Input` / `GroupContent` concepts.
- Docs now include peeking and sliding views demos.
- Registry output includes the expanded Sidebar component surface.

Remaining omissions:

- Mobile sheet/dialog behavior from upstream is not implemented. The Svelte Sidebar currently renders the desktop aside path at all breakpoints.
- `collapsible="none"` still needs a stricter non-collapsible path that ignores collapsed width calculations.
- Footer content is still inside the peek hover/focus zone instead of being separated from the peeking content area.
- Collapsible content should keep inactive content mounted and add stronger `aria-controls`, `role="region"`, `aria-hidden`, and `inert` semantics.
- Sliding views should preserve inactive panels with inert/aria-hidden state instead of rendering only the active panel.
- Menu button auto-wrapping should avoid nested list markup when consumers explicitly use `Sidebar.MenuItem` or `Sidebar.MenuSubItem`.
- Collapsed menu tooltips currently use the native `title` attribute rather than the upstream tooltip component behavior.

### Status Token Docs And Badge Demo

Status: ported.

Ported:

- Colors docs now include the rendered status banner example.
- Status token copy now calls out paired semantic status text and tinted backgrounds.
- `StatusBannerDemo` exists in the Svelte docs snippets.
- The green badge has been removed from the color variant demo to match upstream.

No known remaining omissions for the upstream 2026-05-25 status docs and badge demo changes.

### Clickable Cursor Scoping

Status: base behavior ported, coverage still partial.

Ported:

- `styles.css` now scopes pointer cursors to Kumo-owned interactive elements with `data-kumo-component` or `data-kumo-part`, excluding disabled states.
- High-priority interactive components now emit Kumo ownership data attributes, including Button, Link, Select trigger/options, AutocompleteItem, ComboboxItem, CollapsibleTrigger, PopoverTrigger fallback button, Toast close button, and new Sidebar controls.

Remaining omission:

- A full component-by-component data attribute rollout remains incomplete. Components that should still be audited include checkbox, radio, switch, dropdown/menu items, pagination controls, date picker internals, and any other owned interactive controls relying only on local cursor utility classes.

## Non-Applicable Upstream Changes

### Opencode Lockfile

Upstream changed `.opencode/package-lock.json` as part of the Bonk/opencode bump. This repo does not have an `.opencode/` setup, so there is no local file to update unless that setup is adopted.

### Upstream Package Versions And Changelogs

Upstream changelogs record `@cloudflare/kumo` `2.4.0` / `2.4.1` and docs `1.5.5` / `1.5.6`. `kumo-svelte` is independently versioned, so those version entries should not be copied directly.

### Temporary Backport Workflows

Upstream added and removed temporary backport release dispatch workflows on 2026-05-29. There is no net workflow parity target for this repo.

## Verification

After the implementation commit:

- `pnpm --filter kumo-svelte check` passed with 0 errors and 0 warnings.
- `pnpm --filter kumo-svelte build` passed.
