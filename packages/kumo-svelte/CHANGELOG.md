# kumo-svelte

## 0.3.0

### Minor Changes

- 1d9c207: Port Kumo 2.6 updates, including Toolbar, chart legend interactions, button token styling, sidebar overflow fixes, and typed radio values.

### Patch Changes

- 33173c8: Fix documentation GitHub source links so they point to files under the package directory.
- 652e979: Update dependencies under the three-day minimum release age policy and refresh security overrides for transitive advisories.

## 0.2.0

### Minor Changes

- bf75ecf: Port upstream Kumo 2.5.0 parity updates for sidebar mobile drawers, collapsible auto-scroll, proportional tab fades, transparent chart backgrounds, Flow connector rendering, and the docs LLM index.

## 0.1.8

### Patch Changes

- f15ae02: Port recent upstream Kumo banner, filtering, token, workflow, and peer dependency parity updates.
- f15ae02: Port recent upstream parity updates for TimeseriesChart tooltips, Sidebar modernization, status color docs, and scoped clickable cursor affordances.
- f15ae02: Add Svelte Vitest infrastructure and close Sidebar parity gaps for collapsed tooltips and mobile dialog behavior.

## 0.1.7

### Patch Changes

- 61c539e: Port May 15+ upstream Kumo updates including Badge dot appearance, broader code language aliases, tooltip viewport width constraints, and form error ring parity.

## 0.1.6

### Patch Changes

- Expand generated component registry coverage, changelog pagination, and Svelte docs demos for command palette, popover, sidebar, and table surfaces.

## 0.1.5

### Patch Changes

- Align component API reference props and missing Svelte component prop support with upstream Kumo.

## 0.1.4

### Patch Changes

- Align the Svelte CLI command behavior and block installer output with upstream Kumo.

## 0.1.3

### Patch Changes

- Restore the horizontal tabs overflow fade and hidden scrollbar styling used by Kumo.

## 0.1.2

### Patch Changes

- Re-port block docs, demos, and Svelte block implementations for PageHeader, ResourceListPage, and DeleteResource from upstream Kumo.

## 0.1.0

### Patch Changes

- 0132379: Initial `0.1.0-beta.0` beta release of `kumo-svelte`.

  This release ports Cloudflare's Kumo UI library to Svelte 5, including the core component set, chart components, blocks, shared primitives, package exports, styles, and Svelte-native examples. It also includes the documentation site with component API tables, demos, code highlighting, search/navigation, installation guidance, chart docs, block docs, and generated Svelte snippets.

  The package ships with CLI support, registry and AI metadata assets, npm packaging configuration, release/versioning scripts, lint and CI tooling, and Cloudflare Workers deployment configuration for the docs site.
