---
title: "Loader"
description: "A loading spinner to indicate loading state."
sourceFile: "components/loader"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="LoaderBasicDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Loader } from 'kumo-svelte';
```

### Granular

```typescript
import { Loader } from 'kumo-svelte/components/loader';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Loader } from 'kumo-svelte';
</script>

<Loader />
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Default Size

<ComponentExample demo="LoaderBasicDemo" />

### Custom Size

<ComponentExample demo="LoaderCustomSizeDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  <PropsTable component="Loader" />
</ComponentSection>
