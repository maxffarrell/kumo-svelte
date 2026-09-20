---
title: "Tag Input"
description: "A creatable multi-value input for values that do not come from a predefined option list."
sourceFile: "components/tag-input"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentSection><ComponentExample demo="TagInputDemo" /></ComponentSection>

<ComponentSection>

## Installation

```svelte
import { TagInput } from 'kumo-svelte';
```

## Usage

Use `bind:value` for controlled tags or `defaultValue` for uncontrolled usage. Press Enter, comma, or Tab to create a tag. Blur also commits the current value, and pasted comma- or newline-separated text creates each value synchronously. Duplicate values are ignored.

```svelte
<TagInput label="Labels" bind:value={tags} placeholder="Add a label" />
```

### Maximum values

<ComponentExample demo="TagInputLimitedDemo" />

## Localization

Use `labels` to translate the fallback input name, tag removal action, invalid-value feedback, and maximum-value feedback.

## API Reference

<PropsTable component="TagInput" />

</ComponentSection>
