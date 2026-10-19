---
title: Slider
description: Pick a number or range by dragging a thumb along a horizontal track.
---

<script>
import ComponentExample from '#lib/docs/ComponentExample.svelte';
</script>

# Slider

Import `Slider` from `kumo-svelte`. Pass `value` with `bind:value` for controlled input, or `defaultValue` for an initial value. An array creates a range slider. Use `min`, `max`, and `step` to constrain values and `disabled` to disable interaction.

<ComponentExample demo="SliderBasicDemo" />

Both `size="sm"` and `size="base"` are supported. `format` and `locale` use `Intl.NumberFormat` for value badges and accessible value text. Provide `label` or `getAriaLabel(index)` so every thumb has a name. `onValueChange` runs during interaction and `onValueCommitted` runs when the interaction finishes. The layout supports horizontal orientation only. `thumbAlignment="edge"` maps to Bits UI contained thumbs; `"center"` maps to exact positioning.
