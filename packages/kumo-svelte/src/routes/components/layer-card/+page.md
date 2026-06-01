---
title: "Layer Card"
description: "A card component with a layered visual effect, perfect for navigation or feature highlights."
sourceFile: "components/layer-card"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="LayerCardDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { LayerCard } from 'kumo-svelte';
```

### Granular

```typescript
import { LayerCard } from 'kumo-svelte/components/layer-card';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
import { LayerCard } from "kumo-svelte";
</script>

    <LayerCard class="w-[250px]">
      <LayerCard.Secondary>Documentation</LayerCard.Secondary>
      <LayerCard.Primary>Learn how to use Kumo components</LayerCard.Primary>
    </LayerCard>
```


<code>LayerCard</code> also supports a simple surface-style mode for cases
  where you do not need a secondary header row. In those cases, render content
  directly inside <code>LayerCard</code> instead of wrapping it in
  <code>LayerCard.Primary</code>.


```svelte
<script lang="ts">
import { LayerCard } from "kumo-svelte";
</script>

    <LayerCard class="w-[250px] p-4">
      Learn how to use Kumo components
    </LayerCard>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic Card

<ComponentExample demo="LayerCardBasicDemo" />

### Surface-style Card


For simple card containers, render content directly inside <code>LayerCard</code>
  without <code>LayerCard.Primary</code>.

<ComponentExample demo="LayerCardSurfaceDemo" />

### Multiple Cards

<ComponentExample demo="LayerCardMultipleDemo" />

### Filter Toolbar with Small Tabs


Combine <code>Tabs size="sm"</code> with <code>Input size="sm"</code> inside a
  LayerCard for compact filter toolbars. Both share the same <code>h-6.5</code> (26px) height.


<ComponentExample demo="LayerCardFilterSubrequestsDemo" />

### Test IDs


<code>LayerCard.Primary</code> and <code>LayerCard.Secondary</code> accept all
  standard HTML attributes, including <code>data-testid</code> for testing.


<ComponentExample demo="LayerCardTestIdDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  <PropsTable component="LayerCard" />
</ComponentSection>
