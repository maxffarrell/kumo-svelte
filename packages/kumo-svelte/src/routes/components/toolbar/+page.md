---
title: "Toolbar"
description: "Compose explicit toolbar controls into one clean grouped card."
sourceFile: "components/toolbar"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentSection>
  <ComponentExample demo="ToolbarDemo" />
</ComponentSection>

<ComponentSection>

## Installation

### Barrel

```typescript
import { Toolbar } from "kumo-svelte";
```

### Granular

```typescript
import { Toolbar } from "kumo-svelte/components/toolbar";
```

</ComponentSection>

<ComponentSection>

## Usage

Use `Toolbar` when multiple controls should read as one compact toolbar or
filter card. Use `Toolbar.Button`, `Toolbar.Input`, and `Toolbar.InputGroup` to
opt supported controls into toolbar sizing, button styling, borders, and radii.

```svelte
<script lang="ts">
  import { FunnelSimple, MagnifyingGlass } from 'phosphor-svelte';
  import { InputGroup, Toolbar } from 'kumo-svelte';
</script>

<Toolbar>
  <Toolbar.InputGroup aria-label="Search DNS records">
    <InputGroup.Addon>
      <MagnifyingGlass />
    </InputGroup.Addon>
    <InputGroup.Input placeholder="Search DNS records" />
  </Toolbar.InputGroup>
  <Toolbar.Button icon={FunnelSimple} aria-label="Filter" />
</Toolbar>
```

</ComponentSection>

<ComponentSection>

## Behavior

- `Toolbar.Button`, `Toolbar.Input`, and `Toolbar.InputGroup` inherit the toolbar `size`.
- `Toolbar.Button` always renders with quiet toolbar button styling.
- `Toolbar.InputGroup` passes props directly to `InputGroup` with the toolbar `size`.
- Adjacent toolbar items share borders and only the outer corners are rounded.
- Direct `Toolbar` children that are not one of the supported toolbar item components do not receive toolbar overrides.

</ComponentSection>

<ComponentSection>

## Examples

### Input Shorthand

Use `Toolbar.Input` for simple text inputs that do not need addons.

<ComponentExample demo="ToolbarMixedControlsDemo" />

### Input Group

Use `Toolbar.InputGroup` when one toolbar item needs its own inline addon or
suffix.

<ComponentExample demo="ToolbarInputGroupDemo" />

### Sizes

The `size` prop supports `xs`, `sm`, `base`, and `lg`. Every supported toolbar
item is locked to the same size.

<ComponentExample demo="ToolbarSizesDemo" />

### Button Actions

Toolbar buttons use quiet styling so grouped actions remain visually quiet and
consistent.

<ComponentExample demo="ToolbarActionsDemo" />

### Accessible Labels

Use `aria-label` for compact toolbar controls that do not have visible labels.

<ComponentExample demo="ToolbarLabelsDemo" />

</ComponentSection>

<ComponentSection>

## API Reference

### Toolbar

<PropsTable component="Toolbar" />

### Toolbar.Button

<PropsTable component="Toolbar.Button" />

### Toolbar.Input

<PropsTable component="Toolbar.Input" />

### Toolbar.InputGroup

<PropsTable component="Toolbar.InputGroup" />

</ComponentSection>
