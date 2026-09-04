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
filter card. Use `Toolbar.Button`, `Toolbar.Link`, `Toolbar.Input`, and `Toolbar.InputGroup` to
opt supported controls into toolbar sizing, button styling, borders, and radii.
Compose Select and Combobox triggers with those controls through Svelte child
snippets.

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

- Every `Toolbar.*` control uses the `base` size by default.
- The Toolbar `size` prop remains available for compatibility but is deprecated; omit it for the base size.
- `Toolbar.Button` always renders with quiet toolbar button styling.
- `Toolbar.Link` renders a `LinkButton` with quiet toolbar styling and participates in arrow-key navigation.
- `Toolbar.InputGroup` passes props directly to `InputGroup` with the toolbar `size`.
- Render `Toolbar.Button` from Select's `trigger` snippet to compose a select trigger.
- Render `Toolbar.Input` from `Combobox.TriggerInput`'s `child` snippet for an editable combobox.
- Select and Combobox keep their popup, filtering, and value behavior while joining toolbar arrow-key navigation.
- Adjacent toolbar items share borders and only the outer corners are rounded.
- Direct `Toolbar` children that are not one of the supported toolbar item components do not receive toolbar overrides.

</ComponentSection>

<ComponentSection>

## Examples

### Select

Select keeps its regular root props. Its `trigger` snippet receives the Bits UI
trigger props and current display value, so rendering `Toolbar.Button` makes the
trigger a toolbar item without replacing Select behavior.

<ComponentExample demo="ToolbarSelectDemo" />

### Combobox

Compose an editable Combobox trigger with `Toolbar.Input`. For a non-editable
value trigger, render `Toolbar.Button` from `Combobox.TriggerValue`'s `child`
snippet. While a popup is open, arrow keys continue to navigate its options.

<ComponentExample demo="ToolbarComboboxDemo" />

### Input Shorthand

Use `Toolbar.Input` for simple text inputs that do not need addons.

<ComponentExample demo="ToolbarMixedControlsDemo" />

### Input Group

Use `Toolbar.InputGroup` when one toolbar item needs its own inline addon or
suffix.

<ComponentExample demo="ToolbarInputGroupDemo" />

### Deprecated Sizing

The `size` prop still supports `xs`, `sm`, `base`, and `lg` for compatibility,
but it is deprecated. Omit it to use the default `base` size.

<ComponentExample demo="ToolbarSizesDemo" />

### Button Actions

Toolbar buttons use quiet styling so grouped actions remain visually quiet and
consistent.

<ComponentExample demo="ToolbarActionsDemo" />

### Links

Use `Toolbar.Link` for navigation actions. It accepts LinkButton props except
for `size` and `variant`, which are controlled by the Toolbar.

<ComponentExample demo="ToolbarLinksDemo" />

### Accessible Labels

Use `aria-label` or `aria-labelledby` for compact toolbar controls that do not
have visible labels. Editable inputs move toolbar focus only when the caret is
already at the relevant text boundary.

<ComponentExample demo="ToolbarLabelsDemo" />

</ComponentSection>

<ComponentSection>

## API Reference

### Toolbar

<PropsTable component="Toolbar" />

### Toolbar.Button

<PropsTable component="Toolbar.Button" />

### Toolbar.Link

<PropsTable component="Toolbar.Link" />

### Toolbar.Input

<PropsTable component="Toolbar.Input" />

### Toolbar.InputGroup

<PropsTable component="Toolbar.InputGroup" />

</ComponentSection>
