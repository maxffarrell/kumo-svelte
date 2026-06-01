---
title: "Meter"
description: "A progress/percentage meter component for displaying numeric values within a known range."
sourceFile: "components/meter"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="MeterBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Meter } from 'kumo-svelte';
```

### Granular

```typescript
import { Meter } from 'kumo-svelte/components/meter';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Meter } from 'kumo-svelte';
</script>

<Meter label="Storage used" value={65} />
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic Meter


The default meter displays a label and percentage value.

<ComponentExample demo="MeterBasicDemo" />

### Custom Value Display


Use `customValue` to show a custom string instead of the percentage.

<ComponentExample demo="MeterCustomValueDemo" />

### Hidden Value


Set `showValue={false}` to hide the value display.

<ComponentExample demo="MeterHiddenValueDemo" />

### Full Meter


A meter at 100% capacity.

<ComponentExample demo="MeterFullDemo" />

### Low Value


A meter with a low value.

<ComponentExample demo="MeterLowDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  <PropsTable component="Meter" />
</ComponentSection>
