# Kumo 2.18 port

Base: `origin/main` at `ca03358e`. Source: `@cloudflare/kumo@2.17.0..@cloudflare/kumo@2.18.0`. The minor changeset queues `kumo-svelte@0.18.0`.

| Upstream | Svelte disposition |
| --- | --- |
| `6e93b127` | The equivalent CI jobs already use Ubuntu 24.04 ARM; there is no separate upstream-style visual-contract job to repin. |
| `39d33de6` | Preserve keyboard outlines in forced colors on corresponding Svelte controls. |
| `33bdabd8` | Bound Dialog to the dynamic viewport, allow internal scrolling, and keep child sections from shrinking. |
| `cbb7fe80` | React Server Component lazy elements have no Svelte equivalent. |
| `12cd0fa1` | The React JSON-render catalog, visibility evaluator, and schema generator are not shipped here. |
| `69892d5e` | The removed upstream Bonk reviewer configuration differs from this fork's independent workflows. |
| `9d8b6e53` | Add the sketch SkeletonLine variant, exports, and docs example. |
| `085332b2` | Render Banner.Action as a link when passed `href`; keep button behavior otherwise. |
| `a813d019` | Forward explicit accessible names and descriptions without spreading unset attributes to the Bits UI primitives. |
| `d8a668ee` | Apply snug line height and pretty wrapping to card descriptions. |
| `1c85bb3c` | Reset native calendar day buttons and weekday backgrounds. |
| `34509176` | Accept a Svelte snippet or string as the Combobox.TriggerValue placeholder. |
| `99e73d6b` | Align button labels using whole-pixel line boxes; retain icon padding. |
| `fee11482` | Queue the Svelte minor release through Changesets. |

The docs fixes are separate from the upstream release commits:

- The LayerDialog viewport ignores pointer input while its content still accepts it. The closed demo had been covering the homepage and sidebar. The Select demo has an accessible name and no stray optional indicator.
- Combobox uses Bits UI's Combobox anchor width and available space, matching Kumo's popup sizing rules.
- Missing routes render the upstream 404 layout through SvelteKit with HTTP 404. Cloudflare no longer intercepts those routes with the adapter's plain-text asset fallback.
- Maps use public-domain Natural Earth country outlines rather than country bounding boxes. Search uses the same Match Sorter thresholds as upstream and reads a compact index from the Svelte registry, with explicit chart anchors. BubbleMap is searchable on Maps and no longer appears as an extra card under Available Charts.
- The general Colors guide still points to upstream. The local Chart Colors guide renders the semantic, categorical, and sequential demos directly; its Color Palette entry is in the same place as upstream.

To run the production browser checks, install Chromium and WebKit with `pnpm exec playwright install chromium webkit`, then run `pnpm test:docs`. Set `DOCS_TEST_URL` to test an existing preview instead of starting one.
