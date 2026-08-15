---
"kumo-svelte": patch
---

Port the upstream SkeletonLine fix: move the `.skeleton-line` styles into `@layer base` so Tailwind utility classes (e.g. `h-6`) can override the default `0.5rem` height.
