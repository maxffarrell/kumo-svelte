---
"kumo-svelte": patch
---

Fix Tabs indicator (segmented pill and underline) growing from 0x0 on initial mount. The indicator stays hidden until the active tab is measured, then pops in at the correct size and position via the existing scale/opacity transition instead of animating its size up from zero.
