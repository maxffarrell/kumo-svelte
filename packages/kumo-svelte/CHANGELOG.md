# kumo-svelte

## 0.10.0

### Minor Changes

- a710b36: Add the `Text` `heading` variant with a 16px semibold default and a 20px `size="lg"` option. Deprecate the numbered `heading1`, `heading2`, and `heading3` variants.
- a710b36: Compose Select and Combobox triggers with Toolbar controls while preserving popup behavior and caret-aware keyboard navigation.
- a710b36: Add icon support to filled Badge variants, add linked-badge hover styles, and use the base surface background for outline badges.

### Patch Changes

- a710b36: Allow users to select and copy LinkButton text while preserving Button text selection behavior.
- a710b36: Add the Design skill docs link and redirect Design skill, Figma Resources, and Colors to their canonical Kumo UI pages.
- a710b36: `Collapsible.DefaultTrigger` now uses `text-kumo-default` with `font-medium` instead of the blue `text-kumo-link` color.
- a710b36: Deprecate `MenuBar` in favor of segmented `Tabs`. Runtime behavior is unchanged for existing consumers, while the MenuBar documentation and demos are removed.
- a878bbf: Render documentation examples and table-of-contents navigation during SSR instead of waiting for client initialization.
- ad1c7c4: Expand component interaction, accessibility, fidelity, and visual-regression test coverage, and fix the implementation gaps those tests exposed.
- a710b36: Fix Toast background clipping its ring outline by matching the inner background radius to the root radius.
- a710b36: Expose all Bits UI floating-position and portal props on Combobox.Content.
- a710b36: Preserve collapsed-sidebar peeking when sliding views move focus while the pointer remains over the peek zone.
- a710b36: Port the Kumo 2.9.2 Tabs fixes: flatten overflow carets, limit overflow controls to segmented Tabs, and focus the caret target.
- 87d8852: Prevent layered LayerCard roots from briefly rendering with surface styling on first paint. Match upstream behavior by only treating direct LayerCard section children as layered content.
- a710b36: Match Kumo's Tooltip spacing, CodeHighlighted controls and line numbers, and Banner compact alignment.
- a710b36: Normalize shadows and outlines on Popover, Tooltip, ClipboardText, and chart overlays, and rename the arrow edge and stroke color tokens to match their purpose.
- 01a9193: Update runtime and development dependencies to their latest compatible releases.
- a710b36: Add `scrollToItem(id, options?)` to `useSidebar()` for imperatively scrolling a tagged nav item into the sidebar viewport. Tag items with the new `itemId` prop on `Sidebar.MenuButton` or `Sidebar.MenuItem`.
- 8cf5467: Port the upstream SkeletonLine fix: move the `.skeleton-line` styles into `@layer base` so Tailwind utility classes (e.g. `h-6`) can override the default `0.5rem` height.
- 080b72b: Use Svelte-generated IDs and stabilize randomized component values during SSR hydration with an optional request-scoped random sequence.
- a710b36: Update Table rows to use borderless, alternating background styling.
- 66d3b88: Fix Tabs indicator (segmented pill and underline) growing from 0x0 on initial mount. The indicator stays hidden until the active tab is measured, then pops in at the correct size and position via the existing scale/opacity transition instead of animating its size up from zero.
- a0b5666: Fix the Tabs indicator (segmented pill and underline) in two interacting ways:

  1. **Measurement**: the indicator was measured with `getBoundingClientRect()`, which reflects ancestor CSS transforms (e.g. a Dialog's open `scale(0.9)` animation). Since `ResizeObserver` does not fire when only a transform changes, the indicator could stay stuck at 90% of the tab's size. It is now measured from layout-space values (`offsetLeft`/`offsetTop`/`offsetWidth`/`offsetHeight`), which ignore ancestor transforms.

  2. **Pop-in origin**: the indicator was positioned with `transform: translate(...)` and animated with the CSS `scale` property. Those share a transform-origin and compound such that the scale pivot drifts to `origin + translate / (1 - scale)`, making the pill slide sideways while it grows for any tab other than the first. It is now positioned with layout `left`/`top`, so the pop-in `scale` grows from the pill's own center regardless of which tab is active.

- a710b36: Fix the docs theme dropdown trigger and ensure dropdown radio indicators only display for the selected item.
- cb3324b: Improve Combobox and Autocomplete parity with Bits UI primitives, including keyboard navigation, disabled state, multi-value handling, and updated prop documentation. Contributed by Teddy (@uhteddy).

## 0.9.1

### Patch Changes

- e52f165: Port the applicable `@cloudflare/kumo@2.9.1` fixes: dark-mode favicon support, the updated collapsible default panel structure and styling, and transparent Tabs overflow scrims.

## 0.9.0

### Minor Changes

- 23132a2: Port the `@cloudflare/kumo@2.8.0` → `@cloudflare/kumo@2.9.0` release delta into Svelte. The entries below intentionally follow Kumo's 2.9 changelog structure; React-only and build-system-only changes are called out where Svelte has a different equivalent.

  ## Minor Changes
  - **ff8ad54 — Banner contrast, status tokens, compact sizing, and actions:** port the updated semantic status tokens and apply them across Banner, Badge, Toasty, and Command Palette highlighting. Add `Banner.Action` with primary, secondary, and ghost accent variants, `Banner`'s `size="base" | "sm"` API, compact layout behavior, and inherited CTA sizing.
  - **f919182 — Chart loading states:** replace the animated wave loader with a static reduced-motion-aware TimeseriesChart skeleton that matches line and bar chart types. Add loading placeholders to the Svelte `ChartLegend` API for both its compact and large variants.
  - **535d579 — Disabled LinkButton:** add `disabled` support that renders a real disabled button, removes anchor-only behavior, suppresses activation handlers, and supports explanatory title tooltips.
  - **aae94f1 — LinkButton title tooltip:** wrap titled enabled LinkButtons in the same styled Tooltip behavior used by Button instead of relying only on the native title attribute.
  - **9e083d2 — Full-screen mobile Sidebar:** add `fullScreenOnMobile`, suppress the backdrop and divider when enabled, add `Sidebar.Close`, and fix `Breadcrumbs.Link` so ancestor crumbs keep their width while only the current crumb truncates.
  - **51aa44c — Sidebar.Loading:** add grouped, collapse-aware navigation skeleton rows built from `SkeletonLine`, with `role="status"` and a configurable accessible label.
  - **86ee08c — Table-of-contents scroll tracking:** add the SSR-safe `useTableOfContentsActiveId` hook with IntersectionObserver tracking, fixed-header offsets, custom roots, hash deep links, click pinning, scroll settling, and reactive section-id updates.
  - **87d1ebc — Published output:** the Svelte package already uses `svelte-package` and ships readable generated output without the React/Vite dist layout, so no React-specific dist or declaration-map change was copied.

  ## Patch Changes
  - **fc5e222 — Button accessible-name fallback:** use a string or numeric Button `title` as the accessible label when the button has no text children.
  - **8e71b38 — Prettier update:** no runtime port was required; the Svelte workspace retains its existing formatting toolchain.
  - **2a463f7 — Timeseries tooltip boundary:** prevent tooltips from remaining visible outside the chart after browser context-menu interactions, with the Svelte fallback closing on outside pointer movement.
  - **0f0c44d — ClipboardText feedback:** keep the check icon until the final copy settles, reuse the anchored copied feedback instead of stacking it, and bump the open feedback on repeated clicks with reduced-motion support.
  - **b171c71 — Compact Banner Link actions:** render Kumo Link actions inline with compact Banner text while keeping CTA button actions trailing; the Svelte implementation detects the rendered Kumo Link and preserves the action snippet API.
  - **4f0ed75 — Purple Badge fallbacks:** use the corrected purple OKLCH fallback colors in the Svelte theme.
  - **5efe6dd — Flow.Node render lint rule:** Svelte `Flow.Node` uses snippet children rather than React's `render` prop; its existing rest-prop forwarding is the Svelte equivalent, so no JSX-specific lint rule is added.
  - **32b2168 — Timeseries brush persistence:** restore the brush-to-zoom cursor after ECharts options are replaced.
  - **b0870e1 — Flat InputGroup controls:** remove `shadow-xs` from both `InputGroup` and nested `InputGroup.Button` so grouped controls match standalone inputs.
  - **34e1672 — Library bundling:** the Svelte package's `svelte-package` build already owns entry generation and declaration output; no Vite/tsdown-specific React bundler change applies.
  - **2575f9c — Muted Timeseries chrome:** apply Kumo-muted colors to Timeseries axes, labels, names, and horizontal gridlines.
  - **7c33107 — Repository formatting:** no functional Svelte change; formatting remains governed by the existing Svelte workspace pipeline.
  - **ee6e569 — Typography line heights:** set default `text-base` and `text-lg` line heights to `1.5`.
  - **927d19f — Inert utility classes:** remove redundant bare ring/outline utilities from the Svelte equivalents while retaining their explicit width and color utilities.
  - **924f07a — Base UI chunking:** no direct Svelte equivalent; Svelte consumers use the package's existing bits-ui dependency graph rather than Kumo's React vendor chunk.
  - **7ef8c46 — Tabs overflow rails:** add accessible start/end scroll buttons with customizable labels, scroll-bound visibility, gradient edge affordances, and smooth scrolling for both tab variants.
  - **86afc2b — Disabled/loading Button tooltips:** show title tooltips through an enabled wrapper when the actual Button cannot receive pointer events.
  - **5516c22 — Command Palette highlight contrast:** use the stronger warning highlight background and default text contrast for matched ranges.
  - **24149b9 — Tailwind class sorting:** no runtime Svelte behavior changes; the workspace's existing formatter/linter remains the source of truth.
  - **8de0551 — Vite+ toolchain migration:** not copied because the Svelte port has its own Vite/SvelteKit build and test pipeline.
  - **60f5bfa — Full type checking:** the Svelte package already runs full `svelte-check-native` validation in its package build; no React CLI entrypoint change applies.

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
