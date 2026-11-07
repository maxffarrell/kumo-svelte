# Kumo 2.16 and 2.17 port

Base: `origin/main` at `56552e71`. Source: `@cloudflare/kumo@2.15.0..@cloudflare/kumo@2.17.0`. Latest tagged release at audit time: 2.17.0.

| Upstream | Disposition |
| --- | --- |
| `6a093a54` | Ported: disabled Input uses the defined inactive text token. |
| `fedc8a77` | Ported: readOnly, paste insertion into draft selection, accepted-tag form values and conditional native required validation. |
| `e16f41f8` | Ported: string page drafts validate whole digits and restore invalid input; boundary buttons use >=. Empty totals already have one page in Svelte. |
| `947065ad` | Ported: stream marker timestamp extents and skip marker work when no markers exist; tested with 300,000 lazy timestamps. |
| `810d820a` | Ported: reactive xAxisHideLabelOverlap defaults true and is forwarded to the time axis. |
| `99b17fb6` | Ported: fallback pre/code resets override global backgrounds, borders, padding and corner radius. |
| `814f1b04` | Upstream release metadata: 2.16 audit complete. Svelte release is combined into the explicitly requested 0.17.0 target. |
| `c2b2fc4d` | Ported: masked ClipboardText with localized reveal/hide controls and original-value copying. |
| `890a6abd` | Ported: LayerDialog.Separator and named/type exports render a native full-width separator. |
| `3aa0d59a` | Ported: native scrollbars hidden in LayerDialog and Sidebar viewports while scrolling remains enabled. |
| `595463b6` | Upstream-only: React primitive/theme generators format their own generated files with Oxfmt. Svelte generators remain authoritative and are regenerated during validation. |
| `06726b02` | Ported: Field omits empty labels but retains optional/help-only labels. TagInput already omits absent labels. |
| `4185bb15` | Ported: only the default disabled Tooltip trigger leaves the tab sequence; custom triggers retain their own behavior. |
| `7d1c776a` | Ported: token-based calendar, semantic range markers/bands, grid spacing, ghost navigation, padding ownership, RTL and reduced-motion animations; retains native Svelte calendar and visible selects. |
| `40eaa255` | Ported: duplicate adds preserve content/entrance, refresh timeout, alternate stable surface bump animations without remounting, and explicit updates clear implicit bump intent. |
| `a39b1a29` | Upstream release metadata: Kumo 2.17 parity port complete; Svelte package explicitly targets 0.17.0 (skipping 0.16), with release notes queued for Version Packages. |

## Release parity and validation

- Latest tagged upstream release confirmed via GitHub: `@cloudflare/kumo@2.17.0` (2026-11-02). All 16 commits since 2.15 are represented above, in upstream order. Unreleased `upstream/main` is outside this release port.
- The runtime changes are ported. React-only generators and React component customization are adapted to this package's Svelte generators, snippets, native calendar, and Bits UI primitives. Native calendar selects remain visible; disabled navigation uses native `disabled` selectors rather than React DayPicker's `aria-disabled` selectors.
- Full regression/a11y CI suite passed (478 tests, three environment-specific skips); the final release PR reruns the complete suite. Native type checking: zero errors/warnings.
- Generated 54-component registry; package/declarations, standalone CSS, CLI and production docs builds passed. Extracted `kumo-svelte-0.17.0.tgz` consumer passed type checking and Vite production build with root/deep imports and new APIs.
- Lint, deployment/runtime contract tests (37), changeset validation and diff whitespace checks passed.
- Added `/vrt/release-217` plus masked clipboard, read-only tag and dialog-separator gallery scenarios. Interactive browser verification is pending: local browser access is disabled in Work settings and the Mac is locked. This is a validation limitation, not evidence of pixel parity.
- Existing tooling notices: SvelteKit `config.alias` deprecation and Vitest's nonfatal shutdown timeout. All invoked test/build commands returned success after repairs.
- Package target is explicitly **0.17.0**. The final Version Packages PR must retain that target while consuming the release/security changesets, rather than automatically advancing the manually-set version to 0.18.0.

Release follow-up: PR #76 merged after all checks passed; Node mitigation PR #75 merged after its current checks passed. Completed API tables for masked ClipboardText/localized labels, TagInput form/read-only props and chart overlap. Version Packages consumes both changesets at exactly 0.17.0.
