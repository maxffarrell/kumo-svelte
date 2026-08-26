---
"kumo-svelte": patch
---

Prevent layered LayerCard roots from briefly rendering with surface styling on first paint. Match upstream behavior by only treating direct LayerCard section children as layered content.
