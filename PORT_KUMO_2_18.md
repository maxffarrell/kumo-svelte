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
