# kumo-svelte

## 0.8.0

### Minor Changes

- efd6423: Restore the upstream Flow layout rewrite with dedicated layout utilities and regression coverage.
- ac37ec9: Add auto-resizing support to `InputArea`.
- 10bd6ed: Add reference markers to `TimeseriesChart`.
- ac37ec9: Add horizontal threshold lines to `TimeseriesChart`.

### Patch Changes

- ac37ec9: Include chart components exported from the shared chart barrel in the generated component registry.
- e2118cb: Split the docs deployment build from the npm package build to reduce Cloudflare build time.
- ac37ec9: Add `target` support to `Sidebar.MenuSubButton` links.
- ac37ec9: Keep the mobile Sidebar open when focus moves to portaled interactive content.
- 10bd6ed: Disable sidebar menu button tooltips while the sidebar is expanded.

## 0.7.0

### Minor Changes

- 3e1233d: Port upstream Kumo map, vertical Flow, Dropdown, Button, and class-merging updates after June 25, 2026.
- 0fda577: feat(chart): add `BubbleMap` chart component

  New `BubbleMap` component renders proportional bubbles over a registered
  geographic map using ECharts' scatter series. Includes value-based radius
  scaling, a `mapColors` palette addition to `ChartPalette`, and supporting
  types. Also extracts `escapeHtml` / `defaultValueFormat` tooltip helpers into a
  shared `tooltip-utils` module reused by `SankeyChart`.

### Patch Changes

- 0fda577: Keep primary and destructive button active/focus rings matched to their variant color.
- 149ce8d: Fix toolbar input-group active highlights and align the homepage toolbar demo actions.
- d057d73: Use the Button component for Toast close controls and match the hover tint to the toast variant.
- 0fda577: Fix Dialog `size` prop to set a fixed width instead of only a minimum width. Previously, dialog content could stretch the dialog beyond its intended size.
- 7887f9d: Align Kumo 2.6 prop documentation metadata for chart, radio, and toolbar APIs.
- da2d933: Remove the duplicate InputGroup outline from toolbar input group focus states.
- 6a7e7e0: Stabilize dialog variant exports so fixed-width dialog sizing can be tested without mounting dialog overlays.

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
