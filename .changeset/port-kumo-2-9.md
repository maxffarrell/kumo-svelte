---
"kumo-svelte": minor
---

Port the user-facing changes from Cloudflare Kumo 2.9 into the Svelte package with Svelte-native APIs and matching accessibility behavior.

- **Banner:** add compact `size="sm"` styling, inline compact content layout, updated informational/warning/error/secondary tokens, contextual action styling, and the compound `Banner.Action` API.
- **Button and LinkButton:** preserve disabled links as native disabled buttons, support `title` tooltips for disabled controls, and use `title` as the accessible name fallback for icon-only buttons.
- **Charts:** preserve the timeseries brush across option updates, keep tooltips constrained to the chart, mute chart chrome to match Kumo tokens, and expose loading states for charts and legends with accessible status semantics.
- **Tokens and typography:** update purple badge fallbacks, semantic tint/color tokens, warning colors, and base/large text line heights to the Kumo 2.9 values.
- **Clipboard and input groups:** add the copy-feedback bump animation with reduced-motion support and move the input-group shadow from the root container to the button control.
- **Sidebar:** add `Sidebar.Loading` and `Sidebar.Close`, support full-screen mobile navigation, and preserve mobile backdrop and border behavior for the new mode.
- **Tabs:** add accessible horizontal overflow controls with scroll-bound state while retaining the existing drag and fade behavior.
- **Table of contents:** add the Svelte `useTableOfContentsActiveId` scroll-tracking hook with active-section updates, optional hash synchronization, configurable root/offset handling, and click pinning while scrolling settles.
- **Package metadata:** refresh the generated component registry and add regression coverage for the new public behavior.
