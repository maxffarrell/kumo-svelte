# Kumo 2.15 port

Source: `@cloudflare/kumo@2.14.0..@cloudflare/kumo@2.15.0`. Base: `origin/main` at `6cde7613`.

Each row records an upstream commit in chronological order and its Svelte disposition.

| Upstream | Change / disposition |
| --- | --- |
| `7d917210` | Preserve outer trigger corners when overlays mount non-control siblings. |
| `a8c946a1` | Mark Badge ownership and match direct Badge link focus rings to the pill shape. |
| `88850d58` | Add reactive tooltipTimestampFormat for series and marker timestamps; retain browser locale/time zone defaults. |
| `b3352cab` | Polish homepage grid sizing and add CloudflareLogo/LayerDialog previews. Upstream screenshot-worker/React CI changes are infrastructure-specific; fork retains its existing VRT pipeline. |
| `f7d6829d` | Use opacity-only legacy popup transitions and keep the arrow outside the scrolling popup in the Bits UI positioning wrapper. |
| `81b0ef43` | Expose Portal, Positioner, Popup, Arrow, Backdrop and Viewport alongside deprecated Content. Translate positioning/focus to Bits UI and document Viewport limits. |
| `462516f9` | Remove runtime deprecated heading warnings while retaining types and compatibility. |
| `2f9b17fc` | Add LayerDialog.Action with a related-actions menu snippet, native form props, and deprecated Primary compatibility. Document the single-action footer contract. |
| `dae9cdd6` | Share race-safe copy feedback with timer restart and unmount invalidation across code, breadcrumbs, inline/clipboard/sensitive text, delete-resource and docs copy controls. |
| `6701f404` | Complete collapsible transitions against effective visibility, including desktop collapse and mobile drawer changes. |
| `09a9dae3` | Accept an iconSnippet with sizing/spacing props so custom icon classes survive Svelte rendering. |
| `c3b02946` | Replace cnfast with upstream cn 0.4.0 and refresh the dependency lockfile. |
| `b909c7fd` | Not applicable: upstream ask-bonk version change; fork maintains its own review workflow. |
| `8a8535b0` | Not applicable: upstream ask-bonk main tracking; no library behavior changes. |
| `3fd5b648` | Keep sidebar demo footer triggers aligned with the collapsed rail. |
| `49317c6c` | Join Radio card groups with shared borders, two-column dividers, and checked-aware hover backgrounds. |
| `3d933128` | Add Checkbox.Group card appearance and orientation with joined cells, rich labels, descriptions and selection tint. |
| `03aa5aee` | Tabs has no upstream motion entrance variants to remove; retain Bits UI tab indicator behavior. |
| `85afbd08` | Add scalar/range Slider using Bits UI, size variants, value formatting, accessible thumb names, docs, navigation and VRT gallery. |
| `72b3346a` | Not applicable to the CSS-layout Svelte Flow: nodes remain in flex layout and connectors use measured rectangles; no unpositioned absolute-layout phase. |
| `10b7f667` | Fill Slider indicator to contained thumb edges and center grips, with track padding outside the measured Bits control. |
| `1cb4773c` | Add reactive nested KumoLocaleProvider defaults for Label generated text and LayerDialog dismissal, with explicit optionalLabel/tooltipAriaLabel overrides. |
| `86af1a15` | Pad the LayerDialog viewport top to keep control rings visible. Svelte body has no top mask fallback to correct. |
| `aef723cc` | Hide outside-month dates by default in multi-month calendars; expose showOutsideDays override. |
| `52827100` | Add group-only segmented Radio appearance with horizontal keyboard navigation, accessible hidden controls and checked/error/disabled styling. |
| `828866ab` | Remove negative Select separator margins to avoid horizontal overflow. |
| `543dc8a0` | Use contrast/inverse tokens for Slider value badges and disabled colors. |
| `2c53422b` | Use bg-kumo-tint for highlighted Autocomplete items to match Combobox/Select. |
| `5ee4a033` | Leave Enter, Tab and comma untouched during IME composition, including Safari keyCode 229. |
| `df14b5dd` | Not applicable: React Base UI 1.9.0 dependency update; Svelte uses Bits UI 2.19.0. |
| `f46e8bc9` | Update Cloudflare orange/yellow brand asset colors, including SVG generation. |
| `dc7c513f` | Safely decode table-of-contents fragments and retain raw malformed hashes for matching. |
| `d97d751d` | Already preserved: Actions.Primary remains the same component as LayerDialog.Action and retains its deprecated prop type alias. |
| `17d094ec` | Render the MenuSub guide as an aria-hidden list item to preserve valid list structure. |
| `cdb7e0fd` | Lift Button/LinkButton text and balance leading icon padding across sizes, preserving square/circle shapes. |
| `18467591` | Unify dropdown rows, preserve custom snippet icons, auto-inset iconless siblings, expose Portal/Positioner/Popup, and resolve submenu offsets against collision side with Bits UI. |
