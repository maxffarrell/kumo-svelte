# Kumo Svelte Parity Audit

Last audited: 2026-05-31

Compared against `cloudflare/kumo` at `/private/tmp/cloudflare-kumo-current` for upstream changes on or after 2026-05-25. This audit reflects the current `codex/may-30` worktree after the second parity pass and the follow-up docs/test parity gap cleanup.

## Current Parity Status

### TimeseriesChart

Status: ported as closely as Svelte/bits-ui allows.

Ported:

- Native tooltip rendering replaces ECharts HTML tooltip content.
- `tooltipMode`, `tooltipMaxItems`, `tooltipBoundary`, and `tooltipFollowCursor` are exposed on `TimeseriesChart`.
- Tooltip rows are derived from nearest timestamp values, sorted by value, and support single-series mode.
- Time range brush cursor cleanup is handled when the selection effect is torn down.
- Tooltip placement now uses `bits-ui` floating tooltip positioning with `customAnchor`, collision handling, fixed strategy, and `updatePositionStrategy="always"`.
- `Element` and `Element[]` tooltip boundaries are passed through as collision boundaries; the upstream `"clipping-ancestors"` value maps to bits-ui default clipping behavior.
- The Tooltip Boundary demo now passes an actual bound wrapper element.
- Docs and props metadata include the new tooltip props and examples.

Known Svelte difference:

- Upstream uses Base UI; the Svelte port uses bits-ui. The public behavior is aligned, but internals and exact collision edge cases may differ by floating-positioning implementation.

### Sidebar

Status: ported as closely as Svelte/bits-ui allows.

Ported:

- Compound exports include the modern Sidebar surface: `Provider`, `Header`, `Content`, `Footer`, `Group`, `GroupLabel`, `Menu`, `MenuItem`, `MenuButton`, `MenuBadge`, `MenuSub`, `MenuSubItem`, `MenuSubButton`, `Separator`, `Trigger`, `Rail`, `ResizeHandle`, `MenuChevron`, `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`, `SlidingViews`, and `SlidingView`.
- Provider supports contained layouts, peeking, animation duration, resizable widths, side, variant, collapsible mode, mobile state, mobile open state, and resize state.
- Root Sidebar supports collapsed/icon rail width, peeking width, side-aware mobile sheet rendering, variants, and provider state data attributes.
- `collapsible="none"` now remains visually expanded instead of using collapsed width calculations.
- Peeking is scoped to content instead of wrapping all sidebar children, so footer content no longer starts peeking.
- Collapsible content remains mounted and now uses `aria-controls`, `role="region"`, `aria-hidden`, `inert`, and grid-row animation.
- Sliding views remain mounted and inactive views are marked `aria-hidden` / `inert`.
- Menu button and menu sub-button auto-wrapping now avoids nested `<li>` markup when consumers explicitly use `Sidebar.MenuItem` or `Sidebar.MenuSubItem`.
- Collapsed `Sidebar.MenuButton` tooltips use the local Tooltip component and only expose tooltip content when the sidebar is collapsed and not peekable.
- Mobile sidebar rendering now uses a dialog portal/overlay/content path for focus-trap, escape, modal, and portal semantics.
- Resize handle tracks resizing state during pointer drag and supports keyboard resizing.
- Docs now describe the current compound API and include peeking and sliding views demos.

Known Svelte differences:

- Mobile behavior uses bits-ui Dialog primitives rather than upstream Base UI Dialog primitives.
- Sliding views preserve mounted inactive panels and inert state, but they use Svelte-friendly per-panel transforms instead of upstream's indexed React child transform model.

### Status Token Docs And Badge Demo

Status: ported.

Ported:

- Colors docs include the rendered status banner example.
- Status token copy calls out paired semantic status text and tinted backgrounds.
- `StatusBannerDemo` exists in the Svelte docs snippets.
- The green badge has been removed from the color variant demo to match upstream.

No known remaining omissions for the upstream 2026-05-25 status docs and badge demo changes.

### Clickable Cursor Scoping

Status: ported.

Ported:

- `styles.css` scopes pointer cursors to Kumo-owned interactive elements with `data-kumo-component` or `data-kumo-part`, excluding disabled states.
- Data ownership attributes now cover the previously identified core components: Button, Link, Select trigger/options, AutocompleteItem, Combobox item/trigger/clear/chip controls, CollapsibleTrigger, PopoverTrigger fallback button, Toast close button, Sidebar controls, Checkbox, Radio, Switch, DropdownMenu items, Dialog triggers, Tabs triggers, MenuBar options, Breadcrumb links, TableOfContents items, and SensitiveInput masked/toggle/copy controls.
- Date picker internals use the same `.rdp-*` cursor styling approach as upstream.
- Pagination controls are covered by Kumo Button data attributes; native selects keep browser-native cursor behavior.

Known Svelte difference:

- Pagination page-size and page-number native selects do not use upstream's React Select composition. This is a Svelte implementation difference rather than a cursor-scoping omission.

### Docs Demo Coverage And Import Validation

Status: follow-up gaps partially closed.

Ported:

- CodeHighlighted docs now include language variant and alias demos in addition to the existing TypeScript and copy-button examples.
- Link docs now include a `plain` variant demo alongside inline/current/external examples.
- Import validation now includes a deep import test for representative built component paths: `code-highlighted`, `link`, `select`, and `tooltip`.
- Contributing docs now point at local `kumo-svelte` paths instead of upstream React package and docs-site paths.

Remaining bounded follow-up:

- Select and Tooltip have broad demo coverage, including grouped, disabled, long-list, label-tooltip, delay, multiple, follow-cursor, and boundary demos. No new edge demos were added in this pass because the straightforward high-value cases already existed.
- No browser-test infrastructure was added. The existing Vitest import test layer covers the requested deep import validation without introducing new dependencies.

## Non-Applicable Upstream Changes

### Opencode Lockfile

Upstream changed `.opencode/package-lock.json` as part of the Bonk/opencode bump. This repo does not have an `.opencode/` setup, so there is no local file to update unless that setup is adopted.

### Upstream Package Versions And Changelogs

Upstream changelogs record `@cloudflare/kumo` `2.4.0` / `2.4.1` and docs `1.5.5` / `1.5.6`. `kumo-svelte` is independently versioned, so those version entries should not be copied directly.

### Temporary Backport Workflows

Upstream added and removed temporary backport release dispatch workflows on 2026-05-29. There is no net workflow parity target for this repo.

## Verification

After this parity pass:

- `git -C /private/tmp/cloudflare-kumo-current fetch origin main` passed on 2026-05-31; `HEAD`, `origin/main`, and `FETCH_HEAD` are all `5ceace9`.
- No upstream `main` commits exist after the previous 2026-05-30 audit. The newer Wizard work is only on `origin/feat/wizard-component`, not `main`.
- `pnpm --filter kumo-svelte test` passed with 23 tests.
- `pnpm --filter kumo-svelte check` passed with 0 errors and 0 warnings.
- `pnpm --filter kumo-svelte build` passed.
