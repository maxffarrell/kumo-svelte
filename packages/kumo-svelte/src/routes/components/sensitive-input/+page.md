---
title: "Sensitive Input"
description: "A masked input for sensitive values like API keys and passwords. Click to reveal."
sourceFile: "components/sensitive-input"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="SensitiveInputDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { SensitiveInput } from 'kumo-svelte';
```

### Granular

```typescript
import { SensitiveInput } from 'kumo-svelte/components/sensitive-input';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
  import { SensitiveInput } from 'kumo-svelte';
</script>

<SensitiveInput label="Secret" defaultValue="my-secret-key" />
```

</ComponentSection>

<!-- Sizes -->

<ComponentSection>

## Sizes


SensitiveInput supports multiple sizes to fit different contexts.

  <ComponentExample demo="SensitiveInputSizesDemo" />
</ComponentSection>

<!-- Controlled -->

<ComponentSection>

## Controlled


Use controlled mode for full control over the input value.

  <ComponentExample demo="SensitiveInputControlledDemo" />
</ComponentSection>

<!-- States -->

<ComponentSection>

## States


Various input states including error, disabled, read-only, and with
    description.

  <ComponentExample demo="SensitiveInputStatesDemo" />
</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  <PropsTable component="SensitiveInput" />
</ComponentSection>
