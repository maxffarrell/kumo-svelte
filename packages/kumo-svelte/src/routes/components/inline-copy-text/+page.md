---
title: "Inline Copy Text"
description: "A compact, borderless copy control for short inline values."
sourceFile: "components/inline-copy-text"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentSection>
  <ComponentExample demo="InlineCopyTextDemo" />
</ComponentSection>

<ComponentSection>

## Installation

```svelte
import { InlineCopyText } from 'kumo-svelte';
// or: import { InlineCopyText } from 'kumo-svelte/components/inline-copy-text';
```

</ComponentSection>

<ComponentSection>

## Usage

Use `InlineCopyText` for short identifiers and values in dense interfaces such as table cells. Use [ClipboardText](/components/clipboard-text) when the value should appear in a read-only, input-like field with an always-visible copy button.

```svelte
<InlineCopyText
  value="f86b3f10-32e9-4db7-ae95-84a1b2c3d4e5"
  labels={{ copyAction: 'Copy database ID', copied: 'Database ID copied' }}
>
  f86b3f10-32e9-4db7-ae95-84a1b2c3d4e5
</InlineCopyText>
```

</ComponentSection>

<ComponentSection>

## API Reference

<PropsTable component="InlineCopyText" />

</ComponentSection>
