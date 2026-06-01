---
title: "Empty"
description: "A component to display when there's no content or data to show, with optional command line and actions."
sourceFile: "components/empty"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="EmptyDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Empty } from 'kumo-svelte';
```

### Granular

```typescript
import { Empty } from 'kumo-svelte/components/empty';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
import { Empty } from "kumo-svelte";
import { Package } from "phosphor-svelte";
</script>

<Empty
  title="No packages found"
  description="Get started by installing your first package."
  commandLine="npm install @kumo/ui"
>
  {#snippet icon()}
    <Package size={48} />
  {/snippet}
</Empty>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Basic

<ComponentExample demo="EmptyBasicDemo" />

</ComponentSection>

<!-- Sizes -->

<ComponentSection>

## Sizes


Empty states come in three sizes to fit different container contexts.

  <ComponentExample demo="EmptySizesDemo" />
</ComponentSection>

<!-- With Command Line -->

<ComponentSection>

## With Command Line


Include a copyable command to help users get started.

  <ComponentExample demo="EmptyWithCommandDemo" />
</ComponentSection>

<!-- With Actions -->

<ComponentSection>

## With Actions


Add custom action buttons using child content.

  <ComponentExample demo="EmptyWithActionsDemo" />
</ComponentSection>

<!-- Minimal -->

<ComponentSection>

## Minimal


At minimum, only a title is required.

  <ComponentExample demo="EmptyMinimalDemo" />
</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  <PropsTable component="Empty" />
</ComponentSection>
