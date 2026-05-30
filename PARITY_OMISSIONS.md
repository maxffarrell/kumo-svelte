# Kumo Svelte Parity Omissions

Last audited against `cloudflare/kumo` on 2026-05-30 for upstream commits on or after 2026-05-25.

## Feature Omissions

### TimeseriesChart native tooltip parity

Upstream added a native tooltip model in `18f5e42` and docs fixes in `1eac3aa`. The Svelte `TimeseriesChart` still uses ECharts HTML tooltip formatting and does not expose the upstream `tooltipMode`, `tooltipMaxItems`, `tooltipBoundary`, or `tooltipFollowCursor` props. The Svelte docs also omit the upstream Tooltip Cursor Tracking and Tooltip Boundary demos.

### Sidebar modernization

Upstream `3db8294` substantially modernized Sidebar with contained provider behavior, peeking state, sliding view APIs, keyboard resize affordances, and updated demos. The Svelte Sidebar remains the older compact implementation and its docs still describe outdated concepts such as `GroupContent` and `Sidebar.Input`.

### Status token docs and Badge color demo

Upstream `9d4a2ff` refreshed semantic status token docs, added a `StatusBannerDemo`, added a semantic text contrast note, and removed the green badge from the color demo. The Svelte token values used by components have been updated where directly needed, but the colors page and badge demo still need the full docs/demo parity pass.

### Clickable cursor scoping

Upstream `351fac9` added base clickable affordances scoped to elements with Kumo-owned `data-kumo-component` or `data-kumo-part` attributes. The Svelte components do not currently emit that data-attribute contract, so the cursor rule was not ported yet.

## Non-Applicable Upstream Changes

### Opencode lockfile

Upstream changed `.opencode/package-lock.json` as part of the Bonk/opencode bump. This repo does not have an `.opencode/` setup, so there is no local file to update unless that setup is adopted.

### Upstream package versions and changelogs

Upstream changelogs record `@cloudflare/kumo` `2.4.0` / `2.4.1` and docs `1.5.5` / `1.5.6`. `kumo-svelte` is independently versioned, so those version entries should not be copied directly.

### Temporary backport workflows

Upstream added and removed temporary backport release dispatch workflows on 2026-05-29. There is no net workflow parity target for this repo.
