---
title: "Button Group"
description: "Joins a primary action and a related trigger into a single split button."
sourceFile: "components/button-group"
---
<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentSection><ComponentExample demo="ButtonGroupDemo" /></ComponentSection>
<ComponentSection>

## When to use

`ButtonGroup` joins a small set of tightly coupled buttons into one control, most commonly a split button. Children retain their own variant, size, and shape. Use `Toolbar` for multiple independent controls that need toolbar keyboard semantics.

## Installation

```svelte
import { ButtonGroup } from 'kumo-svelte';
```

## API Reference

<PropsTable component="ButtonGroup" />
</ComponentSection>
