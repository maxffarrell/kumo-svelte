---
title: "Collapsible"
description: "A composable disclosure component for showing and hiding content."
sourceFile: "components/collapsible"
baseUIComponent: "collapsible"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="CollapsibleHeroDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Collapsible } from 'kumo-svelte';
```

### Granular

```typescript
import { Collapsible } from 'kumo-svelte/components/collapsible';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

Collapsible uses a compound component pattern for full composition control.

### With Default Styling

Use `Collapsible.DefaultTrigger` and `Collapsible.DefaultPanel` for the classic Kumo style:

```svelte
<script lang="ts">
  import {
    Collapsible
  } from 'kumo-svelte';

  let open = $state(false);
</script>

<Collapsible.Root bind:open>
  <Collapsible.DefaultTrigger>Show details</Collapsible.DefaultTrigger>
  <Collapsible.DefaultPanel>
    Content with border-left accent styling.
  </Collapsible.DefaultPanel>
</Collapsible.Root>
```

### Custom Trigger

Use `Collapsible.Trigger` for full control over the trigger element:

```svelte
<script lang="ts">
  import { Collapsible } from 'kumo-svelte';

  let open = $state(false);
</script>

<Collapsible.Root bind:open>
  <Collapsible.Trigger class="rounded-lg bg-kumo-base px-3 py-2 text-sm ring ring-kumo-line">
    {open ? 'Hide' : 'Show'} details
  </Collapsible.Trigger>
  <Collapsible.Panel class="mt-2 rounded-lg bg-kumo-tint p-4">
    Custom styled panel content.
  </Collapsible.Panel>
</Collapsible.Root>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic

<ComponentExample demo="CollapsibleBasicDemo" />

### Multiple Items

<ComponentExample demo="CollapsibleMultipleDemo" />

### Custom Trigger

Use `Collapsible.Trigger` for full control:

<ComponentExample demo="CollapsibleCustomTriggerDemo" />

### Accordion Pattern

Control which item is open to create an accordion where only one item can be expanded at a time:

<ComponentExample demo="CollapsibleAccordionDemo" />

</ComponentSection>

<!-- Sub-components -->

<ComponentSection>

## Sub-components

| Component | Description |
|-----------|-------------|
| `Collapsible.Root` | Manages open state. Pass `open` and `onOpenChange` for controlled mode. |
| `Collapsible.Trigger` | Button that toggles visibility. |
| `Collapsible.Panel` | Container for collapsible content. |
| `Collapsible.DefaultTrigger` | Pre-styled trigger with text label and animated caret icon. |
| `Collapsible.DefaultPanel` | Pre-styled panel with border-left accent and standard spacing. |

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

### Collapsible

Convenience component that renders the default trigger and panel composition.

<PropsTable component="Collapsible" />

### Collapsible.Root

<PropsTable component="Collapsible.Root" />

### Collapsible.Trigger

<PropsTable component="Collapsible.Trigger" />

### Collapsible.Panel

<PropsTable component="Collapsible.Panel" />

### Collapsible.DefaultTrigger

<PropsTable component="Collapsible.DefaultTrigger" />

### Collapsible.DefaultPanel

Accepts all `Collapsible.Panel` props in addition to the ones listed below.

<PropsTable component="Collapsible.DefaultPanel" />

</ComponentSection>
