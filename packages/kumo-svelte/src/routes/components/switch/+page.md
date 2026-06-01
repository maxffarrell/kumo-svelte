---
title: "Switch"
description: "A two-state button that can be either on or off."
sourceFile: "components/switch"
baseUIComponent: "switch"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="SwitchBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Switch, SwitchGroup, SwitchItem, SwitchLegend } from 'kumo-svelte';
```

### Granular

```typescript
import { Switch, SwitchGroup, SwitchItem, SwitchLegend } from 'kumo-svelte/components/switch';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Switch } from 'kumo-svelte';

  let checked = $state(false);
</script>

<Switch bind:checked />
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Off State

<ComponentExample demo="SwitchOffDemo" />

### On State

<ComponentExample demo="SwitchOnDemo" />

### Disabled

<ComponentExample demo="SwitchDisabledDemo" />

### Variants


The Switch supports two variants: `default` (blue when on) and `neutral`
  (monochrome). Both use a squircle shape.

<ComponentExample demo="SwitchVariantsDemo" />

### Neutral Variant


The neutral variant uses monochrome colors and a squircle shape, ideal for
  subtle, less prominent toggles.

<ComponentExample demo="SwitchNeutralDemo" />

### Neutral States

<ComponentExample demo="SwitchNeutralStatesDemo" />

### Sizes


Three sizes available: `sm`, `base` (default), and `lg`.

<ComponentExample demo="SwitchSizesDemo" />

### Custom ID


When a custom `id` is provided, clicking the label still toggles the switch.
  The `id` is forwarded to Base UI so the label's `htmlFor` stays in sync.

<ComponentExample demo="SwitchCustomIdDemo" />

### Switch Group


Group related switches with `Switch.Group`. Provides a shared legend,
  description, and error message for the group.

<ComponentExample demo="SwitchGroupDemo" />

### Visually Hidden Legend


Use `Switch.Legend` with `class="sr-only"` to keep the legend accessible
  to screen readers while hiding it visually. This is useful when the group is
  already labeled by a parent `Field` or heading, and showing the legend would
  create a redundant label.

<ComponentExample demo="SwitchLegendSrOnlyDemo" />

### Custom Legend Styling


`Switch.Legend` accepts `class` for full control over legend presentation.
  Use it instead of the `legend` string prop when you need custom typography,
  colors, or layout.

<ComponentExample demo="SwitchLegendCustomDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Switch


Individual switch toggle with built-in label.

<PropsTable component="Switch" />

### Switch.Group


Container for multiple switches with legend, description, and error support.

<PropsTable component="Switch.Group" />

### Switch.Legend


Composable legend sub-component for Switch.Group. Accepts `class` for full
  styling control (e.g. `class="sr-only"` to visually hide). Use instead of
  the `legend` string prop when you need custom legend styling.

<PropsTable component="Switch.Legend" />

### Switch.Item


Individual switch within Switch.Group.

<PropsTable component="Switch.Item" />

</ComponentSection>
