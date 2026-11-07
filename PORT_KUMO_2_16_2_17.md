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
