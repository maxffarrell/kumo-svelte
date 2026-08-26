---
"kumo-svelte": patch
---

Fix the Tabs indicator (segmented pill and underline) in two interacting ways:

1. **Measurement**: the indicator was measured with `getBoundingClientRect()`, which reflects ancestor CSS transforms (e.g. a Dialog's open `scale(0.9)` animation). Since `ResizeObserver` does not fire when only a transform changes, the indicator could stay stuck at 90% of the tab's size. It is now measured from layout-space values (`offsetLeft`/`offsetTop`/`offsetWidth`/`offsetHeight`), which ignore ancestor transforms.

2. **Pop-in origin**: the indicator was positioned with `transform: translate(...)` and animated with the CSS `scale` property. Those share a transform-origin and compound such that the scale pivot drifts to `origin + translate / (1 - scale)`, making the pill slide sideways while it grows for any tab other than the first. It is now positioned with layout `left`/`top`, so the pop-in `scale` grows from the pill's own center regardless of which tab is active.
