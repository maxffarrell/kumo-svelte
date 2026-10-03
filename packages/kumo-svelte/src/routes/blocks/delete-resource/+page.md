---
title: "Delete Resource"
description: "A confirmation dialog for safely deleting resources, requiring users to type the resource name to confirm."
sourceFile: "blocks/delete-resource"
---

<script>
  import Callout from '#lib/docs/Callout.svelte';
  import ComponentExample from '#lib/docs/ComponentExample.svelte';
  import ComponentSection from '#lib/docs/ComponentSection.svelte';
  import PropsTable from '#lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>

<ComponentExample demo="DeleteResourceBasicDemo" />

</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

DeleteResource is a <strong>block</strong> - a CLI-installed component that you own and can customize. Unlike regular components, blocks are copied into your project so you have full control over the code.

**1. Initialize Kumo config (first time only)**

```bash
npx kumo-svelte init
```

**2. Install the block**

```bash
npx kumo-svelte add DeleteResource
```

**3. Import from your local path**

```svelte
<script lang="ts">
  import { DeleteResource } from './components/kumo/delete-resource/delete-resource';
</script>
```

<Callout type="info">
  <strong>Why blocks?</strong> Blocks give you full ownership of the code, allowing you to customize deletion flows to fit your specific needs. They're ideal for critical actions that often need project-specific modifications.
</Callout>

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { Button } from 'kumo-svelte';
  import { DeleteResource } from './components/kumo/delete-resource/delete-resource';

  let open = $state(false);
  let isDeleting = $state(false);

  async function handleDelete() {
    isDeleting = true;
    try {
      await deleteZone('example.com');
      open = false;
    } finally {
      isDeleting = false;
    }
  }
</script>

<Button variant="destructive" onclick={() => (open = true)}>
  Delete Zone
</Button>

<DeleteResource
  bind:open
  onOpenChange={(nextOpen) => (open = nextOpen)}
  resourceType="Zone"
  resourceName="example.com"
  onDelete={handleDelete}
  isDeleting={isDeleting}
/>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Worker Deletion

Works with any resource type - just change the resourceType and resourceName props.

<ComponentExample demo="DeleteResourceWorkerDemo" />

### Error State

Use the errorMessage prop to show an error message.

<ComponentExample demo="DeleteResourceErrorDemo" />

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

<PropsTable component="DeleteResource" />

</ComponentSection>
