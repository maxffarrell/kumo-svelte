---
"kumo-svelte": minor
---

Port the `@cloudflare/kumo@2.8.0` → `@cloudflare/kumo@2.9.0` release delta into Svelte. The entries below intentionally follow Kumo's 2.9 changelog structure; React-only and build-system-only changes are called out where Svelte has a different equivalent.

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
